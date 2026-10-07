package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"image"
	"image/png"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"acme/storeapi/internal/gosqlapi"
	"acme/storeapi/internal/store"

	_ "modernc.org/sqlite"
)

func configWithDB(t *testing.T, raw []byte, dbPath string) []byte {
	t.Helper()
	var conf map[string]any
	if err := json.Unmarshal(raw, &conf); err != nil {
		t.Fatalf("parse config: %v", err)
	}
	databases, _ := conf["databases"].(map[string]any)
	storeDB, _ := databases["store"].(map[string]any)
	storeDB["url"] = dbPath
	out, err := json.Marshal(conf)
	if err != nil {
		t.Fatalf("marshal config: %v", err)
	}
	return out
}

func seedDB(t *testing.T, dbPath, sqlPath string) {
	t.Helper()
	raw, err := os.ReadFile(sqlPath)
	if err != nil {
		t.Fatalf("read %s: %v", sqlPath, err)
	}
	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	defer db.Close()
	for _, stmt := range strings.Split(string(raw), ";") {
		if isBlankSQL(stmt) {
			continue
		}
		if _, err := db.Exec(stmt); err != nil {
			t.Fatalf("exec %q: %v", strings.TrimSpace(stmt), err)
		}
	}
}

func isBlankSQL(stmt string) bool {
	for _, line := range strings.Split(stmt, "\n") {
		line = strings.TrimSpace(line)
		if line != "" && !strings.HasPrefix(line, "--") {
			return false
		}
	}
	return true
}

func request(t *testing.T, base, method, path, token string, body any) (int, []byte) {
	t.Helper()
	var reader io.Reader
	if body != nil {
		raw, err := json.Marshal(body)
		if err != nil {
			t.Fatal(err)
		}
		reader = bytes.NewReader(raw)
	}
	req, err := http.NewRequest(method, base+path, reader)
	if err != nil {
		t.Fatal(err)
	}
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("%s %s: %v", method, path, err)
	}
	defer resp.Body.Close()
	data, _ := io.ReadAll(resp.Body)
	return resp.StatusCode, data
}

func login(t *testing.T, base, email, password string) (int, string, string) {
	t.Helper()
	status, body := request(t, base, http.MethodPost, "/auth/login", "", map[string]string{
		"email": email, "password": password,
	})
	var payload struct {
		Token string `json:"token"`
		User  struct {
			Role string `json:"role"`
		} `json:"user"`
	}
	if err := json.Unmarshal(body, &payload); err != nil && status == http.StatusOK {
		t.Fatalf("decode login: %v (%s)", err, body)
	}
	return status, payload.Token, payload.User.Role
}

// TestE2E boots the real server against a database seeded by scripts/init.sql
// and drives it over HTTP: seeded logins, the customer order flow, and admin
// role enforcement.
func TestE2E(t *testing.T) {
	raw, err := os.ReadFile("gosqlapi.json")
	if err != nil {
		t.Fatalf("read config: %v", err)
	}
	dbPath := filepath.Join(t.TempDir(), "e2e.db")
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
	defer st.Close()

	srv := httptest.NewServer(buildMux(app, st, "../frontend", "uploads"))
	defer srv.Close()
	base := srv.URL

	if code, _ := request(t, base, http.MethodGet, "/", "", nil); code != http.StatusOK {
		t.Fatalf("GET / = %d", code)
	}
	if code, _ := request(t, base, http.MethodGet, "/store/products", "", nil); code != http.StatusOK {
		t.Fatalf("GET /store/products = %d", code)
	}

	status, adminToken, role := login(t, base, "admin@acme.test", "admin123")
	if status != http.StatusOK || role != "admin" {
		t.Fatalf("seeded admin login: status=%d role=%q", status, role)
	}

	status, customerToken, role := login(t, base, "ada@example.com", "customer123")
	if status != http.StatusOK || role != "customer" {
		t.Fatalf("seeded customer login: status=%d role=%q", status, role)
	}

	if status, _, _ := login(t, base, "ada@example.com", "wrong-password"); status != http.StatusUnauthorized {
		t.Fatalf("wrong password: status=%d, want 401", status)
	}
	if status, _, _ := login(t, base, "admin@acme.test", "wrong-password"); status != http.StatusUnauthorized {
		t.Fatalf("wrong admin password: status=%d, want 401", status)
	}

	status, body := request(t, base, http.MethodPost, "/my/orders", customerToken, map[string]any{
		"items": []map[string]any{{"sku": "COF-COL-1KG", "quantity": 2}},
	})
	if status != http.StatusCreated {
		t.Fatalf("place order: status=%d body=%s", status, body)
	}

	status, body = request(t, base, http.MethodGet, "/my/orders", customerToken, nil)
	if status != http.StatusOK {
		t.Fatalf("my orders: status=%d", status)
	}
	var orders []map[string]any
	if err := json.Unmarshal(body, &orders); err != nil {
		t.Fatalf("decode orders: %v", err)
	}
	if len(orders) == 0 {
		t.Fatal("expected the customer to have at least one order")
	}

	if status, _ := request(t, base, http.MethodGet, "/admin/customers", customerToken, nil); status != http.StatusUnauthorized {
		t.Fatalf("customer hitting admin: status=%d, want 401", status)
	}

	if status, body := request(t, base, http.MethodGet, "/admin/customers", adminToken, nil); status != http.StatusOK {
		t.Fatalf("admin customers: status=%d body=%s", status, body)
	}
	if status, body := request(t, base, http.MethodGet, "/admin/revenue", adminToken, nil); status != http.StatusOK {
		t.Fatalf("admin revenue: status=%d body=%s", status, body)
	}
}

// TestCatalogHidesInactive verifies the config `filter` on the products table:
// the public catalog only returns active products, while admin still sees all.
func TestCatalogHidesInactive(t *testing.T) {
	base, adminToken, _ := bootServer(t)

	status, body := request(t, base, http.MethodPost, "/admin/products", adminToken, map[string]any{
		"sku": "HIDDEN-1", "name": "Hidden Beans", "category": "coffee",
		"price_cents": 100, "stock": 1, "reorder_level": 1, "active": 0,
	})
	if status != http.StatusCreated {
		t.Fatalf("create inactive product: status=%d body=%s", status, body)
	}

	status, body = request(t, base, http.MethodGet, "/store/products?.page_size=100", "", nil)
	if status != http.StatusOK {
		t.Fatalf("catalog: status=%d", status)
	}
	if strings.Contains(string(body), "HIDDEN-1") {
		t.Fatalf("catalog should not expose inactive products: %s", body)
	}

	status, body = request(t, base, http.MethodGet, "/admin/products", adminToken, nil)
	if status != http.StatusOK {
		t.Fatalf("admin products: status=%d", status)
	}
	if !strings.Contains(string(body), "HIDDEN-1") {
		t.Fatalf("admin should still see inactive products: %s", body)
	}

	if status, _ := request(t, base, http.MethodGet, "/store/products/HIDDEN-1", "", nil); status != http.StatusNotFound {
		t.Fatalf("inactive product detail: status=%d, want 404", status)
	}
}

func TestStorePageSizeCapped(t *testing.T) {
	base, _, _ := bootServer(t)

	_, body := request(t, base, http.MethodGet, "/store/products?.page_size=1000000", "", nil)
	var page struct {
		PageSize int `json:"page_size"`
	}
	if err := json.Unmarshal(body, &page); err != nil {
		t.Fatalf("decode query page: %v (%s)", err, body)
	}
	if page.PageSize != maxStorePageSize {
		t.Fatalf("query page_size = %d, want %d", page.PageSize, maxStorePageSize)
	}

	_, body = request(t, base, http.MethodGet, "/store/products", "", map[string]any{".page_size": 1000000})
	if err := json.Unmarshal(body, &page); err != nil {
		t.Fatalf("decode body page: %v (%s)", err, body)
	}
	if page.PageSize != maxStorePageSize {
		t.Fatalf("body page_size = %d, want %d", page.PageSize, maxStorePageSize)
	}
}

func TestStoreParamValidation(t *testing.T) {
	base, _, _ := bootServer(t)

	for _, path := range []string{
		"/store/products?.order_by=NAME%3BDROP%20TABLE%20PRODUCTS--",
		"/store/products?.order_by=%28CASE%20WHEN%201%3D1%20THEN%20NAME%20ELSE%20SKU%20END%29",
		"/store/products?.offset=abc",
		"/store/products?.page_size=abc",
	} {
		status, body := request(t, base, http.MethodGet, path, "", nil)
		if status != http.StatusBadRequest {
			t.Fatalf("%s: status=%d body=%s, want 400", path, status, body)
		}
	}

	if status, body := request(t, base, http.MethodGet, "/store/products?.order_by=NAME%20DESC", "", nil); status != http.StatusOK {
		t.Fatalf("valid order_by: status=%d body=%s", status, body)
	}

	status, body := request(t, base, http.MethodGet, "/store/products", "", map[string]any{".order_by": "NAME;DROP TABLE PRODUCTS--"})
	if status != http.StatusBadRequest {
		t.Fatalf("body order_by: status=%d body=%s, want 400", status, body)
	}
}

func TestStoreAPIGuardSanitizesErrors(t *testing.T) {
	leaky := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = io.WriteString(w, `{"error":"strconv.Atoi: parsing \"abc\": invalid syntax"}`)
	})
	guard := storeAPIGuard(leaky)

	rr := httptest.NewRecorder()
	guard.ServeHTTP(rr, httptest.NewRequest(http.MethodGet, "/store/products?.offset=abc", nil))
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("bad param status=%d body=%s, want 400", rr.Code, rr.Body.String())
	}

	rr = httptest.NewRecorder()
	guard.ServeHTTP(rr, httptest.NewRequest(http.MethodGet, "/store/products", nil))
	if rr.Code != http.StatusInternalServerError {
		t.Fatalf("status=%d, want 500", rr.Code)
	}
	if strings.Contains(rr.Body.String(), "strconv") {
		t.Fatalf("error body leaked internals: %s", rr.Body.String())
	}
	if !strings.Contains(rr.Body.String(), "internal server error") {
		t.Fatalf("error body not sanitized: %s", rr.Body.String())
	}
}

func TestSecurityHeaders(t *testing.T) {
	h := securityHeaders(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, httptest.NewRequest(http.MethodGet, "/", nil))
	if got := rr.Header().Get("X-Content-Type-Options"); got != "nosniff" {
		t.Fatalf("X-Content-Type-Options = %q, want nosniff", got)
	}
	if got := rr.Header().Get("Referrer-Policy"); got != "no-referrer" {
		t.Fatalf("Referrer-Policy = %q, want no-referrer", got)
	}
}

func TestLoginRateLimited(t *testing.T) {
	base, _, _ := bootServer(t)
	status := 0
	for i := 0; i < 11; i++ {
		status, _, _ = login(t, base, "nobody@example.com", "wrong-password")
	}
	if status != http.StatusTooManyRequests {
		t.Fatalf("expected 429 after repeated failures, got %d", status)
	}
}

func TestCannotRemoveLastAdmin(t *testing.T) {
	base, adminToken, _ := bootServer(t)

	// The only seeded admin is CUSTOMER_ID 4.
	status, body := request(t, base, http.MethodPut, "/admin/customers/4", adminToken, map[string]any{
		"full_name": "Store Admin", "country": "US", "role": "customer",
	})
	if status != http.StatusBadRequest {
		t.Fatalf("demote last admin: status=%d body=%s", status, body)
	}
	status, body = request(t, base, http.MethodDelete, "/admin/customers/4", adminToken, nil)
	if status != http.StatusBadRequest {
		t.Fatalf("delete last admin: status=%d body=%s", status, body)
	}
}

func TestValidationGuards(t *testing.T) {
	base, adminToken, _ := bootServer(t)

	status, body := request(t, base, http.MethodPut, "/admin/products/COF-COL-1KG", adminToken, map[string]any{
		"name": "Colombia Huila 1kg", "category": "coffee", "price_cents": -1, "stock": 1, "reorder_level": 1,
	})
	if status != http.StatusBadRequest {
		t.Fatalf("negative price: status=%d body=%s", status, body)
	}

	status, body = request(t, base, http.MethodPost, "/auth/register", "", map[string]string{
		"email": "short@example.com", "password": "short", "full_name": "Short",
	})
	if status != http.StatusBadRequest {
		t.Fatalf("short password: status=%d body=%s", status, body)
	}
}

func postUpload(t *testing.T, base, token, filename string, data []byte) (int, []byte) {
	t.Helper()
	var buf bytes.Buffer
	mw := multipart.NewWriter(&buf)
	fw, err := mw.CreateFormFile("file", filename)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := fw.Write(data); err != nil {
		t.Fatal(err)
	}
	if err := mw.Close(); err != nil {
		t.Fatal(err)
	}
	req, err := http.NewRequest(http.MethodPost, base+"/admin/uploads", &buf)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", mw.FormDataContentType())
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	out, _ := io.ReadAll(resp.Body)
	return resp.StatusCode, out
}

func TestUploadImage(t *testing.T) {
	base, adminToken, uploadDir := bootServer(t)

	if status, _ := postUpload(t, base, "", "x.png", []byte("nope")); status != http.StatusUnauthorized {
		t.Fatalf("unauth upload: %d", status)
	}
	if status, _ := postUpload(t, base, adminToken, "notes.txt", []byte("just text")); status != http.StatusBadRequest {
		t.Fatalf("non-image upload: %d", status)
	}

	var pngBuf bytes.Buffer
	if err := png.Encode(&pngBuf, image.NewRGBA(image.Rect(0, 0, 1, 1))); err != nil {
		t.Fatal(err)
	}
	status, body := postUpload(t, base, adminToken, "pic.png", pngBuf.Bytes())
	if status != http.StatusCreated {
		t.Fatalf("png upload: %d %s", status, body)
	}
	var res struct {
		Image string `json:"image"`
	}
	if err := json.Unmarshal(body, &res); err != nil {
		t.Fatal(err)
	}
	if !strings.HasSuffix(res.Image, ".png") {
		t.Fatalf("bad image name %q", res.Image)
	}
	if _, err := os.Stat(filepath.Join(uploadDir, res.Image)); err != nil {
		t.Fatalf("stored file missing: %v", err)
	}

	svg := []byte(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10"/></svg>`)
	status, body = postUpload(t, base, adminToken, "logo.svg", svg)
	if status != http.StatusCreated {
		t.Fatalf("svg upload: %d %s", status, body)
	}
	if err := json.Unmarshal(body, &res); err != nil {
		t.Fatal(err)
	}
	if !strings.HasSuffix(res.Image, ".svg") {
		t.Fatalf("bad svg name %q", res.Image)
	}

	big := bytes.Repeat([]byte{0x89}, (5<<20)+2048)
	if status, _ := postUpload(t, base, adminToken, "big.png", big); status != http.StatusRequestEntityTooLarge {
		t.Fatalf("oversized upload: %d", status)
	}
}
