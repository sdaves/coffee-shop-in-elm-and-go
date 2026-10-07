package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
	"time"

	"acme/storeapi/internal/gosqlapi"
	"acme/storeapi/internal/store"
)

func bootServer(t *testing.T) (string, string, string) {
	t.Helper()
	raw, err := os.ReadFile("gosqlapi.json")
	if err != nil {
		t.Fatalf("read config: %v", err)
	}
	dbPath := filepath.Join(t.TempDir(), "contract.db")
	conf := configWithDB(t, raw, dbPath)
	seedDB(t, dbPath, "scripts/init.sql")

	app, err := gosqlapi.NewApp(conf)
	if err != nil {
		t.Fatalf("new app: %v", err)
	}
	st, err := store.Open(dbPath, "test-secret", time.Hour)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { st.Close() })

	uploadDir := t.TempDir()
	st.SetUploadDir(uploadDir)
	srv := httptest.NewServer(buildMux(app, st, "../frontend", uploadDir))
	t.Cleanup(srv.Close)

	status, adminToken, _ := login(t, srv.URL, "admin@acme.test", "admin123")
	if status != http.StatusOK {
		t.Fatalf("admin login: %d", status)
	}
	return srv.URL, adminToken, uploadDir
}

func objectKeys(t *testing.T, label string, raw []byte) map[string]bool {
	t.Helper()
	var obj map[string]json.RawMessage
	if err := json.Unmarshal(raw, &obj); err != nil {
		t.Fatalf("%s: not a JSON object: %v (%s)", label, err, raw)
	}
	keys := map[string]bool{}
	for k := range obj {
		keys[k] = true
	}
	return keys
}

// assertKeys checks the object has exactly the expected keys. Exact matching
// means adding/removing/renaming a field fails this test so the Elm decoders
// (frontend/tests/ApiTest.elm) get updated in lockstep.
func assertKeys(t *testing.T, label string, raw []byte, want ...string) {
	t.Helper()
	got := objectKeys(t, label, raw)
	for _, k := range want {
		if !got[k] {
			t.Errorf("%s: missing key %q (have %v)", label, k, keysOf(got))
		}
	}
	if len(got) != len(want) {
		t.Errorf("%s: expected exactly %v, got %v", label, want, keysOf(got))
	}
}

func keysOf(m map[string]bool) []string {
	out := make([]string, 0, len(m))
	for k := range m {
		out = append(out, k)
	}
	return out
}

func assertArrayKeys(t *testing.T, label string, raw []byte, want ...string) {
	t.Helper()
	var items []json.RawMessage
	if err := json.Unmarshal(raw, &items); err != nil {
		t.Fatalf("%s: not a JSON array: %v (%s)", label, err, raw)
	}
	if len(items) == 0 {
		t.Fatalf("%s: expected at least one element to check the contract", label)
	}
	assertKeys(t, label+"[0]", items[0], want...)
}

func TestResponseContracts(t *testing.T) {
	base, adminToken, _ := bootServer(t)

	_, body := request(t, base, http.MethodPost, "/auth/login", "", map[string]string{
		"email": "admin@acme.test", "password": "admin123",
	})
	assertKeys(t, "POST /auth/login", body, "token", "user")
	var envelope struct {
		User json.RawMessage `json:"user"`
	}
	if err := json.Unmarshal(body, &envelope); err != nil {
		t.Fatal(err)
	}
	assertKeys(t, "POST /auth/login user", envelope.User, "id", "email", "name", "country", "role")

	_, body = request(t, base, http.MethodGet, "/auth/me", adminToken, nil)
	assertKeys(t, "GET /auth/me", body, "id", "email", "name", "country", "role")

	_, customerToken, _ := login(t, base, "ada@example.com", "customer123")

	_, body = request(t, base, http.MethodGet, "/my/orders", customerToken, nil)
	assertArrayKeys(t, "GET /my/orders", body, "order_id", "customer_id", "customer_email", "customer_name", "status", "placed_at", "total_cents", "items")
	var orders []struct {
		Items []json.RawMessage `json:"items"`
	}
	if err := json.Unmarshal(body, &orders); err != nil {
		t.Fatal(err)
	}
	if len(orders) == 0 || len(orders[0].Items) == 0 {
		t.Fatal("expected a seeded order with items")
	}
	assertKeys(t, "order item", orders[0].Items[0], "sku", "name", "quantity", "unit_price_cents")

	_, body = request(t, base, http.MethodGet, "/admin/products", adminToken, nil)
	assertArrayKeys(t, "GET /admin/products", body, "sku", "name", "category", "price_cents", "stock", "reorder_level", "active", "image", "description")

	_, body = request(t, base, http.MethodGet, "/admin/orders", adminToken, nil)
	assertArrayKeys(t, "GET /admin/orders", body, "order_id", "customer_id", "customer_email", "customer_name", "status", "placed_at", "total_cents", "items")

	_, body = request(t, base, http.MethodGet, "/admin/customers", adminToken, nil)
	assertArrayKeys(t, "GET /admin/customers", body, "customer_id", "email", "full_name", "country", "role", "created_at")

	_, body = request(t, base, http.MethodGet, "/admin/revenue", adminToken, nil)
	assertArrayKeys(t, "GET /admin/revenue", body, "category", "orders", "units", "revenue_cents")

	_, body = request(t, base, http.MethodGet, "/admin/signups", adminToken, nil)
	assertKeys(t, "GET /admin/signups", body, "today", "last_7_days", "last_30_days", "last_90_days")
}
