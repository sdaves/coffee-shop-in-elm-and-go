GO       ?= go
PROOT    ?= proot
BUN      ?= bun
ELM      ?= $(HOME)/bin/elm
ELM_TEST ?= $(HOME)/bin/elm-test
CERT     ?= $(PREFIX)/etc/tls/cert.pem
RESOLV   ?= $(HOME)/etc/resolv.conf

API_DIR      := api
FRONTEND_DIR := frontend
BIN          := $(API_DIR)/storeapi

.PHONY: all build api frontend run db-init test test-go test-frontend review check secrets clean

all: build

build: api frontend

api:
	cd $(API_DIR) && $(GO) build -o storeapi .

frontend:
	printf 'nameserver 8.8.8.8\n' > "$(RESOLV)"
	cd $(FRONTEND_DIR) && $(PROOT) -b "$(RESOLV):/etc/resolv.conf" env SYSTEM_CERTIFICATE_PATH="$(CERT)" SSL_CERT_FILE="$(CERT)" "$(ELM)" make src/Main.elm --output=elm.js

run: api
	cd $(API_DIR) && ./storeapi -c gosqlapi.json -web ../frontend

db-init: api
	cd $(API_DIR) && ./storeapi -seed -seed-sql scripts/init.sql

test: test-go test-frontend

test-go:
	cd $(API_DIR) && $(GO) test ./...

test-frontend:
	printf 'nameserver 8.8.8.8\n' > "$(RESOLV)"
	cd $(FRONTEND_DIR) && $(PROOT) -b "$(RESOLV):/etc/resolv.conf" env PATH="$(HOME)/bin:$$PATH" SYSTEM_CERTIFICATE_PATH="$(CERT)" SSL_CERT_FILE="$(CERT)" "$(ELM_TEST)" --compiler "$(ELM)"

review:
	printf 'nameserver 8.8.8.8\n' > "$(RESOLV)"
	cd $(FRONTEND_DIR) && $(BUN) install --backend=copyfile
	cd $(FRONTEND_DIR) && $(PROOT) -b "$(RESOLV):/etc/resolv.conf" env PATH="$(HOME)/bin:$$PATH" SYSTEM_CERTIFICATE_PATH="$(CERT)" SSL_CERT_FILE="$(CERT)" NODE_EXTRA_CA_CERTS="$(CERT)" "$(BUN)" run elm-review --compiler "$(ELM)" --ignore-dirs vendor/elm-radix-ui/src

check: test review

# Split so the scanner does not match its own pattern.
LEAK_A := 2056286d077bd550185fa272e7fc35b7452320f782f901d5b8078
LEAK_B := 884d60822df

secrets:
	@if grep -rIn "$(LEAK_A)$(LEAK_B)" . --exclude-dir=.git --exclude-dir=elm-stuff --exclude-dir=gosqlapi >/dev/null 2>&1; then \
	  echo "FAIL: committed gosqlapi token found"; exit 1; \
	else echo "ok: no committed gosqlapi token"; fi

clean:
	rm -f $(BIN)
