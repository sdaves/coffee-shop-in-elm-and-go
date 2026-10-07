# Security Review

Findings from a read-only review of the `os` workspace. Fixes are checklist
items (`[x]` = fixed) unless noted as accepted risks.

Audit scope: live HTTP testing of the running server (`127.0.0.1:8080`) plus
source review, at commit `023ae1d`. No code was changed during the audit.

## Known accepted risks

Documented for awareness. Accepted by design; **no remediation tasks** here or
for issues that exist only because of them.

- **Hardcoded session signing secret (JWT/HMAC).**
  - Location: `api/gosqlapi.json` (`auth.secret`), fallback `api/main.go`.
  - Consequence: tokens are `base64url(payload) + "." + HMAC-SHA256(secret,
    payload)`, so anyone with the repo can mint a token for any `sub`/`role`.
    Server-side role checks are correct — they trust a signature we can all
    compute.
  - Also accepted: sessions are stateless and unrevocable until their (72h)
    expiry.
  - Verified nuance: the token's `role` claim is **not** trusted for
    authorization (the DB role is re-read on every request), so forging the
    secret grants impersonation of any `sub` — including the admin `sub` — but
    not escalation by editing the `role` field alone. Exposure is identity
    forgery, not claim tampering.
  - Also accepted: CSRF is not applicable. The API is authenticated with an
    `Authorization: Bearer` header (never cookies) and `web.cors` is `false`.
- **Account enumeration on registration.**
  - `POST /auth/register` returns `409 "an account with that email already
    exists"` when the email is taken, while login is constant-time.
  - Accepted: registration logs the user in immediately, so a non-revealing
    response would require an email-verification flow that is out of scope for
    this app.
- **Rate limiter is in-memory and per-process.**
  - `api/internal/store/ratelimit.go` keeps hit windows in memory: they reset
    on restart, are not shared across replicas, and the key is `RemoteAddr`
    (one shared bucket behind NAT/proxies).
  - Accepted: the app runs as a single local process; a distributed limiter is
    out of scope. `X-Forwarded-For` is intentionally not trusted.
- **Uploaded images are permanent and public.**
  - Uploads are written under `api/uploads/` with random names and served
    world-readable at `/uploads/{file}`; deleting or re-imaging a product
    leaves the old file behind (no cleanup or quota).
  - Accepted: only admins can upload, names are unguessable, and the files are
    product images meant to be public. A reaper/quota is out of scope.

## Secrets management

- [x] **Remove the committed `gosqlapi` bearer token.** The `tokens` block and
  the destructive `init` script were removed from `api/gosqlapi.json`; the token
  is gone from `Makefile`. Only `public_read` tables remain reachable.
- [x] **Purge the `gosqlapi` token from git history.** Rewritten with
  `git filter-repo --replace-text` (the token replaced by `***REMOVED***` across
  all 55 commits), then `reflog expire` + `gc --prune=now`. Verified absent from
  `git log -S`, all reachable blobs, and the reflog; the temporary pre-rewrite
  backup bundle was deleted after verification.
- [x] **Prevent recurrence.** `make secrets` scans for the removed token; keep
  tokens out of tracked config.

## Authentication

- [x] **Rate limiting and lockout** on `POST /auth/login` (10/min/IP) and
  `POST /auth/register` (5/min/IP) — `api/internal/store/ratelimit.go`. Returns
  `429`.
- [x] **Constant-time login.** Unknown emails now burn a bcrypt compare against
  a dummy hash before returning.
- [x] **Stronger password policy.** Minimum raised to 8 characters.
- [x] **Rate-limit key is not spoofable.** Limits key on `RemoteAddr`;
  `X-Forwarded-For` is ignored, so the header cannot be used to reset a bucket
  (verified: `X-Forwarded-For: 9.9.9.9` did not bypass).

## Session management

- [x] **Validate the session on startup.** `Main.elm` calls `/auth/me` when a
  stored session is restored and takes the server's `role`; a failure signs the
  user out and clears storage.

## Authorization

- [x] **Lock down the destructive `init` script.** It is no longer an HTTP
  endpoint; seeding is `storeapi -seed` (`make db-init`), a local-only action.
- [x] **Prevent admin lockout.** Demoting or deleting the last admin is rejected
  (`cannot demote/delete the last admin`).
- [x] **Restrict the column-filter oracle.** Tables may set
  `filterable_columns`; the catalog only allows `SKU`, `NAME`, `CATEGORY`.
  Non-allowlisted params (e.g. `?stock=3`) are silently dropped.
- [x] **Role claim is not trusted.** `currentUser` re-reads the role from the
  DB, so a token whose `role` claim says `admin` but whose `sub` is a customer
  is still rejected (`401`); only a real admin `sub` is authorized.
- [x] **Self-registration cannot set a role.** `role` in the register body is
  ignored; the row is always inserted as `customer`.
- [x] **gosqlapi surfaces stay closed.** `/store/customers`, `/store/orders`,
  `/store/order_items` and `/store/revenue_by_category` return `401`, and
  `POST/PUT/DELETE /store/products` return `401` even with the app admin token
  (the `tokens` block is empty). Only `public_read` products and the
  `public_exec` `low_stock` script are reachable.

## Network, transport, and CORS

- [x] **Tighten CORS.** `web.cors` is now `false` (same-origin app); the
  wildcard token origin is gone with the token.
- [x] **TLS support.** `main.go` serves HTTPS when `web.https_addr` and
  `cert_file`/`key_file` are configured.
- [x] **No CORS exposure.** No `Access-Control-Allow-Origin` on normal or
  preflight requests (`web.cors: false`), verified with a foreign `Origin`.
- [x] **No static path traversal / listing.** `/..%2f..%2fapi/gosqlapi.json`,
  `/.git/config`, `/uploads/` and `/uploads` all return `404`; upload traversal
  redirects then `404`s; no directory listing.

## Input validation and injection

- [x] **Validate product updates.** Negative price/stock/reorder values are
  rejected, matching create.
- [x] **`filter` / `filterable_columns` are trusted config.** Documented in
  `AGENTS.md`; never interpolate user input there. Custom SQL uses bound
  placeholders (no injection found). Verified: `category=coffee' OR '1'='1`
  and a `UNION SELECT EMAIL,PASSWORD_HASH…` both return `0` rows, and
  `order_by=NAME;DROP TABLE PRODUCTS--` is rejected before SQL.
- [x] **Cap pagination on gosqlapi list endpoints.** `page_size <= 0` falls back
  to the table default (not unlimited), but a large positive value (e.g.
  `999999999`) was unbounded. `storeAPIGuard` (`api/guard.go`) clamps
  `.page_size` to 100 for both query and JSON-body params before the engine
  runs, without touching the vendored engine.
- [x] **Return `400`, not `500`, for bad query params.** `storeAPIGuard`
  validates `.page_size`, `.offset` and `.order_by` (query and JSON body) and
  rejects malformed values with `400` before the engine runs.

## Information disclosure

- [x] **Stop returning raw internal errors.** 5xx responses now log internally
  and return `internal server error`. This covers the custom `store` handlers.
- [x] **Stop leaking engine internals / reflected input from `/store/*`.** Bad
  params are rejected as `400` before the engine runs (see above), and
  `storeAPIGuard` buffers `/store/*` responses so any `5xx` is replaced with
  `{"error":"internal server error"}`. (Log injection was already mitigated —
  the engine `%q`-escapes the message.)
- [x] **Add `X-Content-Type-Options: nosniff` and `Referrer-Policy` to all
  responses.** `securityHeaders` (`api/guard.go`) sets them globally, so the
  API JSON responses carry them too. (The HTML/asset CSP is unchanged.)

## Client-side

- [x] **Reduce token exposure.** A strict `Content-Security-Policy`
  (`script-src 'self'`), `X-Content-Type-Options`, and `Referrer-Policy` are set
  on static assets, and the inline bootstrap moved to `app.js`. The token stays
  in `localStorage` (required for cross-refresh persistence) and is now backed
  by server-side session validation.
- [x] **Cart key trust.** The cart key uses the server-validated user id, and an
  invalid session is cleared.
- [x] **No DOM-injection sinks.** `frontend/app.js` uses no `innerHTML`/`eval`
  and wraps `localStorage` access in try/catch; user data is rendered as text
  through Elm.

## Operational

- [x] Security section added to `AGENTS.md`.
- [x] `make secrets` secret scan for the removed token; run it in CI.
- [x] **Upload controls verified.** Admin-only; content-sniffed extension;
  random 128-bit name; 5 MB cap; non-images `400`; SVG served with
  `default-src 'none'; … sandbox`.


