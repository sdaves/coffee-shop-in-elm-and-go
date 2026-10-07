# AGENTS.md

Project rules for the `os` workspace (Go API + Elm frontend for the Acme Coffee Store).

## Layout

- `api/` — Go module `acme/storeapi`. Wraps the vendored `internal/gosqlapi`
  engine, serves the REST API **and** the frontend from one process.
- `api/internal/store/` — custom auth (bcrypt + HMAC token), customer and admin
  HTTP handlers. This is the app's own layer; edit here, not in `gosqlapi`.
- `api/guard.go` — package `main`; request hardening for the gosqlapi
  `/store/*` surface (param validation, `page_size` cap, `5xx` sanitizing).
  Keep such fixes here, not in the vendored engine.
- `api/internal/gosqlapi/` — vendored copy of the engine. Mirrors upstream except
  for the documented `filter` table option (see README); keep any other changes
  out of here.
- `frontend/` — Elm 0.19.3 single-page app (`src/`, built to `elm.js`).
- `frontend/review/` — `elm-review` configuration (lint rules). `make review`
  runs it via `bun`; vendored `frontend/vendor/` is excluded.
- `gosqlapi/` — upstream library, kept as its own git repo; do not edit its
  internals for app work.
- `api/gosqlapi.json` — runtime config (databases, tables, scripts, tokens).

## Rules

1. **One origin.** The Go server serves `index.html` at `/` and the API under
   `/store/...`. The frontend must call the API on the same origin: keep
   `baseUrl` in `frontend/src/Api.elm` as `""` (relative paths). Never hardcode
   `http://127.0.0.1:8080` or any absolute host in frontend code.
2. **Rebuild the frontend after editing Elm.** `elm.js` is what the Go server
   serves. Run `make frontend` (uses the proot recipe below); do not hand-edit
   `elm.js`.
3. **Elm on Termux needs proot.** The stock aarch64 binary cannot resolve DNS or
   find a CA bundle. `make frontend` and `make test-frontend` handle this. Do
   not "fix" it by installing a different Elm.
4. **Frontend tests run with `elm-test` (elm-test-rs).** `make test` runs both
   `make test-go` and `make test-frontend`. Tests live in `frontend/tests/` and
   use `elm-explorations/test` and `avh4/elm-program-test` (registered in
   `frontend/elm.json` `test-dependencies`). elm-test needs a JS runtime: this
   environment has no `node`, so `~/bin/elm-test` is elm-test-rs and
   `~/bin/node` is a shim that execs `bun`. Do not reinstall stock `elm-test`
   from npm.
5. **Backend E2E is in `api/e2e_test.go`.** It boots the real mux with
   `httptest.NewServer` against a database seeded from `scripts/init.sql`, so
   the seeded logins and the full customer/admin HTTP flow are covered by
   `make test-go`. Keep it in sync with `main.go`/`buildMux`.
6. **Binaries are never committed.** `api/storeapi`, `gosqlapi/gosqlapi`, and
   other build outputs are covered by `.gitignore`. Build locally instead.
7. **Run via Make.** Use `make run` to serve API + frontend on
   `127.0.0.1:8080`; `make build` for both artifacts; `make clean` for binaries.
8. **Commit after verification.** Do not commit unverified or partial work.
   Once changes are verified (tests pass, checks in "Verifying changes"
   succeed), commit them as described in rule 11.
9. **No comments in code** unless the user asks for them.
10. **Run `make test`** after changing Go or Elm code, and **`make review`**
    after changing Elm code (`make check` runs both).
11. **After verifying tests, commit.** Inspect `git status`/`git diff`, stage
    only the intended files (never binaries or secrets), and write a concise
    commit message that matches the repo style.
12. **Frontend features need data-contract and logic tests by default.** Elm
    JSON decoders run at **runtime**, so Elm cannot catch a wrong field/type at
    compile time — tests are the compile-time equivalent. Every endpoint the
    frontend consumes must have a decoder test in `frontend/tests/ApiTest.elm`
    that decodes a representative payload, and every feature's `update` logic
    must have tests in `frontend/tests/MainTest.elm`. A frontend feature is not
    done until `make test` covers its data contract and update logic.
13. **Response shapes are pinned by `api/contract_test.go`.** When it fails, a
    Go response changed: update the Elm decoders and the `ApiTest.elm` payloads
    together so the two layers stay in lockstep.
14. **Lint Elm with `elm-review`.** `make review` must report no errors after
    Elm changes. The config is `frontend/review/` (starter template
    `jfmengels/elm-review-config/application`, with `review/elm.json` pinned to
    elm 0.19.3). It runs through `bun` (no node/npm): the recipe uses
    `bun install --backend=copyfile` (the default symlink backend breaks
    resolution on this platform) and excludes vendored `frontend/vendor/`. Fix
    findings rather than suppressing them.

## Common commands

```sh
make build        # build api/storeapi and frontend/elm.js
make run          # serve API + frontend on 127.0.0.1:8080
make db-init      # create + seed the SQLite schema (first run)
make frontend     # rebuild elm.js only (proot recipe)
make test         # run test-go and test-frontend
make test-go      # go test ./... in api/
make test-frontend # elm-test in frontend/ (proot recipe)
make review       # elm-review in frontend/ (bun + proot recipe)
make check        # run test and review
make secrets      # scan for accidentally committed tokens
make clean        # remove compiled binaries
```

## Verifying changes

- API + FE: `curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8080/`
  (expect `200`).
- Same-origin check: `curl -s http://127.0.0.1:8080/elm.js | grep baseUrl`
  (expect `baseUrl = ''`).
- Data: `curl -s http://127.0.0.1:8080/store/products`.
- Tests: `make test` (expect Go tests to pass and elm-test `TEST RUN PASSED`).

## Security

See `SECURITY.md` for the review and status. House rules:

- **Never commit secrets** (tokens, signing keys). `make secrets` scans for the
  previously leaked token. The hardcoded session signing secret is a documented
  **accepted risk** — do not build tasks on it, but also do not add more.
- **Config is trusted input.** `filter` (raw SQL) and `filterable_columns` in
  `api/gosqlapi.json` come from the operator, never from users. Never
  interpolate request data into them; use bound placeholders everywhere else.
- **No token, no privileged `gosqlapi` access.** The `tokens` block is empty;
  only `public_read` tables are reachable, and `init` is local-only
  (`storeapi -seed`, via `make db-init`) instead of an HTTP endpoint.
- **Harden the `/store/*` surface in `api/guard.go`, not the engine.** The guard
  validates `.page_size`/`.offset`/`.order_by`, caps `page_size`, and replaces
  engine `5xx` bodies with a generic error.
- **Validate sessions server-side.** The frontend re-checks `/auth/me` on load
  and trusts the server's role, not `localStorage`.
- Static assets are served with a strict CSP and no-cache headers; keep the
  frontend free of inline scripts (`frontend/app.js` holds the bootstrap).
