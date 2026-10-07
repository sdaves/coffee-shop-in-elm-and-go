# Acme Coffee Store — Elm frontend

The Elm client for the Go API in `../api`. The Go server also serves this app,
so the frontend talks to the API on the **same origin** (`baseUrl = ""` in
`src/Api.elm`).

## Features

- **Catalog** — public product list with category filter and pagination, plus a
  product detail modal.
- **Auth** — one email + password box for both roles; the HMAC-signed session is
  kept in `localStorage` and restored on refresh.
- **Cart** — customers add products to a cart; it is persisted per user in
  `localStorage` under `acme.cart.<userId>` and restored on refresh/login.
- **My Orders** — a customer's own order history; customers add to a cart and
  place orders.
- **Admin** — manage products, orders and customers; new-users, low-stock and
  revenue-by-category reports.
- **Reports** — new-users, low-stock and revenue-by-category (admin role).

## Prerequisites

- Elm 0.19.3 and elm-test; on Termux these need the proot setup in `../AGENTS.md`
  (the `make` targets handle it).
- The API running — from `../`: `make run` (then `make db-init` on first run).

## Build

From `../`: `make frontend` (rebuilds `elm.js`; handles the Termux proot setup).
Plain:

```sh
elm make src/Main.elm --output=elm.js
```

## Run

Serve via the Go API, which mounts this folder at `/`:

```sh
cd .. && make run
```

Then open <http://127.0.0.1:8080/> and sign in (`admin@acme.test` / `admin123`
or `ada@example.com` / `customer123`).

## Tests

`make test-frontend` (from `../`) runs `elm-test` against `tests/`:
`Tests.elm` (pure helpers), `TimeAgoTest.elm` (`TimeAgo` formatting),
`ApiTest.elm` (JSON decoder contracts) and `MainTest.elm`
(`elm-program-test` views + `update` logic).

## Lint

`make review` (from `../`) runs `elm-review` with the config in `review/` (the
`jfmengels/elm-review-config/application` starter template, with
`review/elm.json` pinned to elm 0.19.3). It runs through `bun` — the recipe
installs with `bun install --backend=copyfile`, since the default symlink
backend breaks module resolution on this platform — and excludes the vendored
`vendor/elm-radix-ui/src`. It must report no errors.

## Layout

```
frontend/
├── elm.json
├── package.json      # elm-review devDependency (installed via bun)
├── bun.lock          # locked bun install
├── review/           # elm-review configuration
├── index.html        # host page + styles, mounts Elm.Main
├── app.js            # bootstrap: localStorage session/cart bridge
├── radix-extra.css   # Radix UI style tweaks (radix-styles.css is the base)
├── vendor/           # elm-radix-ui source (see elm.json source-directories)
├── tests/            # elm-test suites
└── src/
    ├── Types.elm     # domain types + Remote state
    ├── Api.elm       # HTTP calls and JSON decoders
    ├── TimeAgo.elm   # relative-time formatting
    └── Main.elm      # TEA: model, update, view (port module)
```

## Notes on running Elm on aarch64 Termux

The official `elm-0.19.3-linux-arm.gz` binary is statically linked and, on
Android, cannot see a DNS resolver or CA bundle. It was run here via `proot`
binding a resolver into `/etc/resolv.conf` and pointing `SYSTEM_CERTIFICATE_PATH`
at Termux's cert store:

```sh
CERT="$PREFIX/etc/tls/cert.pem"
printf 'nameserver 8.8.8.8\n' > "$HOME/etc/resolv.conf"
proot -b "$HOME/etc/resolv.conf:/etc/resolv.conf" \
  env SYSTEM_CERTIFICATE_PATH="$CERT" SSL_CERT_FILE="$CERT" \
  elm make src/Main.elm --output=elm.js
```
