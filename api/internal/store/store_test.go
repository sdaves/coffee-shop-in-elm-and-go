package store

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"
	"time"

	"golang.org/x/crypto/bcrypt"
)

const testSchema = `
CREATE TABLE CUSTOMERS (
  CUSTOMER_ID   INTEGER PRIMARY KEY AUTOINCREMENT,
  EMAIL         TEXT NOT NULL UNIQUE,
  FULL_NAME     TEXT NOT NULL,
  COUNTRY       TEXT NOT NULL DEFAULT 'US',
  PASSWORD_HASH TEXT NOT NULL DEFAULT '',
  ROLE          TEXT NOT NULL DEFAULT 'customer',
  CREATED_AT    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE PRODUCTS (
  SKU           TEXT PRIMARY KEY,
  NAME          TEXT NOT NULL,
  CATEGORY      TEXT NOT NULL,
  PRICE_CENTS   INTEGER NOT NULL,
  STOCK         INTEGER NOT NULL DEFAULT 0,
  REORDER_LEVEL INTEGER NOT NULL DEFAULT 10,
  ACTIVE        INTEGER NOT NULL DEFAULT 1,
  IMAGE         TEXT NOT NULL DEFAULT '',
  DESCRIPTION   TEXT NOT NULL DEFAULT ''
);
CREATE TABLE ORDERS (
  ORDER_ID    INTEGER PRIMARY KEY AUTOINCREMENT,
  CUSTOMER_ID INTEGER NOT NULL,
  STATUS      TEXT NOT NULL DEFAULT 'pending',
  PLACED_AT   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE ORDER_ITEMS (
  ORDER_ITEM_ID    INTEGER PRIMARY KEY AUTOINCREMENT,
  ORDER_ID         INTEGER NOT NULL,
  SKU              TEXT NOT NULL,
  QUANTITY         INTEGER NOT NULL,
  UNIT_PRICE_CENTS INTEGER NOT NULL
);
`

func newTestStore(t *testing.T) (*Store, *http.ServeMux) {
	t.Helper()
	st, err := Open(filepath.Join(t.TempDir(), "test.db"), "test-secret", time.Hour)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { st.Close() })
	if _, err := st.db.Exec(testSchema); err != nil {
		t.Fatalf("schema: %v", err)
	}
	mux := http.NewServeMux()
	st.Register(mux)
	return st, mux
}

func do(mux *http.ServeMux, method, path, token string, body any) *httptest.ResponseRecorder {
	var reader *bytes.Reader
	if body != nil {
		raw, _ := json.Marshal(body)
		reader = bytes.NewReader(raw)
	} else {
		reader = bytes.NewReader(nil)
	}
	req := httptest.NewRequest(method, path, reader)
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	rr := httptest.NewRecorder()
	mux.ServeHTTP(rr, req)
	return rr
}

type testSession struct {
	Token string
	ID    int64
	Email string
	Role  string
}

func decodeSession(t *testing.T, rr *httptest.ResponseRecorder) testSession {
	t.Helper()
	var payload struct {
		Token string `json:"token"`
		User  struct {
			ID    int64  `json:"id"`
			Email string `json:"email"`
			Role  string `json:"role"`
		} `json:"user"`
	}
	if err := json.Unmarshal(rr.Body.Bytes(), &payload); err != nil {
		t.Fatalf("decode session: %v (%s)", err, rr.Body.String())
	}
	return testSession{Token: payload.Token, ID: payload.User.ID, Email: payload.User.Email, Role: payload.User.Role}
}

func TestSignAndVerifyToken(t *testing.T) {
	st, _ := newTestStore(t)

	token, err := st.Sign(Claims{Sub: 7, Email: "a@b.com", Role: "customer"})
	if err != nil {
		t.Fatalf("sign: %v", err)
	}
	claims, err := st.Verify(token)
	if err != nil {
		t.Fatalf("verify: %v", err)
	}
	if claims.Sub != 7 || claims.Role != "customer" {
		t.Fatalf("unexpected claims: %+v", claims)
	}

	if _, err := st.Verify(token + "x"); err == nil {
		t.Fatal("expected tampered token to fail verification")
	}

	expired, _ := st.Sign(Claims{Sub: 1, Exp: time.Now().Add(-time.Minute).Unix()})
	if _, err := st.Verify(expired); err == nil {
		t.Fatal("expected expired token to fail verification")
	}
}

func TestRegisterLoginAndOrderFlow(t *testing.T) {
	st, mux := newTestStore(t)

	if _, err := st.db.Exec(
		`INSERT INTO PRODUCTS (SKU, NAME, CATEGORY, PRICE_CENTS, STOCK) VALUES ('SKU1', 'Beans', 'coffee', 1000, 5)`); err != nil {
		t.Fatal(err)
	}

	reg := do(mux, http.MethodPost, "/auth/register", "", map[string]string{
		"email": "buyer@example.com", "password": "secret123", "full_name": "Buyer", "country": "US",
	})
	if reg.Code != http.StatusCreated {
		t.Fatalf("register status %d: %s", reg.Code, reg.Body.String())
	}
	session := decodeSession(t, reg)

	dup := do(mux, http.MethodPost, "/auth/register", "", map[string]string{
		"email": "buyer@example.com", "password": "secret123", "full_name": "Buyer",
	})
	if dup.Code != http.StatusConflict {
		t.Fatalf("duplicate register status %d", dup.Code)
	}

	bad := do(mux, http.MethodPost, "/auth/login", "", map[string]string{"email": "buyer@example.com", "password": "wrong"})
	if bad.Code != http.StatusUnauthorized {
		t.Fatalf("bad login status %d", bad.Code)
	}

	order := do(mux, http.MethodPost, "/my/orders", session.Token, map[string]any{
		"items": []map[string]any{{"sku": "SKU1", "quantity": 2}},
	})
	if order.Code != http.StatusCreated {
		t.Fatalf("place order status %d: %s", order.Code, order.Body.String())
	}
	var placed Order
	if err := json.Unmarshal(order.Body.Bytes(), &placed); err != nil {
		t.Fatal(err)
	}
	if placed.TotalCents != 2000 || len(placed.Items) != 1 {
		t.Fatalf("unexpected order: %+v", placed)
	}

	var stock int
	if err := st.db.QueryRow(`SELECT STOCK FROM PRODUCTS WHERE SKU = 'SKU1'`).Scan(&stock); err != nil {
		t.Fatal(err)
	}
	if stock != 3 {
		t.Fatalf("expected stock 3 after order, got %d", stock)
	}

	mine := do(mux, http.MethodGet, "/my/orders", session.Token, nil)
	if mine.Code != http.StatusOK {
		t.Fatalf("my orders status %d", mine.Code)
	}
	var orders []Order
	if err := json.Unmarshal(mine.Body.Bytes(), &orders); err != nil {
		t.Fatal(err)
	}
	if len(orders) != 1 {
		t.Fatalf("expected 1 order, got %d", len(orders))
	}
}

func TestRoleEnforcement(t *testing.T) {
	st, mux := newTestStore(t)

	custReg := do(mux, http.MethodPost, "/auth/register", "", map[string]string{
		"email": "cust@example.com", "password": "secret123", "full_name": "Cust",
	})
	customer := decodeSession(t, custReg)

	if rr := do(mux, http.MethodGet, "/admin/customers", customer.Token, nil); rr.Code != http.StatusUnauthorized {
		t.Fatalf("customer hitting admin: status %d", rr.Code)
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.MinCost)
	if _, err := st.db.Exec(
		`INSERT INTO CUSTOMERS (EMAIL, FULL_NAME, COUNTRY, PASSWORD_HASH, ROLE) VALUES ('admin@x.com', 'Admin', 'US', ?, 'admin')`,
		string(hash)); err != nil {
		t.Fatal(err)
	}
	adminLogin := do(mux, http.MethodPost, "/auth/login", "", map[string]string{"email": "admin@x.com", "password": "admin123"})
	admin := decodeSession(t, adminLogin)

	if rr := do(mux, http.MethodGet, "/admin/customers", admin.Token, nil); rr.Code != http.StatusOK {
		t.Fatalf("admin listing customers: status %d: %s", rr.Code, rr.Body.String())
	}

	me := do(mux, http.MethodGet, "/auth/me", customer.Token, nil)
	if me.Code != http.StatusOK {
		t.Fatalf("me status %d", me.Code)
	}
}
