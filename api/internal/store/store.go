package store

import (
	"crypto/hmac"
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	_ "modernc.org/sqlite"
)

const maxBodySize = 1 * 1024 * 1024

type Store struct {
	db              *sql.DB
	secret          []byte
	ttl             time.Duration
	loginLimiter    *rateLimiter
	registerLimiter *rateLimiter
	uploadLimiter   *rateLimiter
	uploadDir       string
}

type User struct {
	ID      int64  `json:"id"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	Country string `json:"country"`
	Role    string `json:"role"`
}

type Customer struct {
	ID        int64  `json:"customer_id"`
	Email     string `json:"email"`
	FullName  string `json:"full_name"`
	Country   string `json:"country"`
	Role      string `json:"role"`
	CreatedAt string `json:"created_at"`
}

type Product struct {
	SKU          string `json:"sku"`
	Name         string `json:"name"`
	Category     string `json:"category"`
	PriceCents   int64  `json:"price_cents"`
	Stock        int64  `json:"stock"`
	ReorderLevel int64  `json:"reorder_level"`
	Active       int64  `json:"active"`
	Image        string `json:"image"`
	Description  string `json:"description"`
}

type OrderItem struct {
	SKU            string `json:"sku"`
	Name           string `json:"name"`
	Quantity       int64  `json:"quantity"`
	UnitPriceCents int64  `json:"unit_price_cents"`
}

type Order struct {
	ID            int64       `json:"order_id"`
	CustomerID    int64       `json:"customer_id"`
	CustomerEmail string      `json:"customer_email"`
	CustomerName  string      `json:"customer_name"`
	Status        string      `json:"status"`
	PlacedAt      string      `json:"placed_at"`
	TotalCents    int64       `json:"total_cents"`
	Items         []OrderItem `json:"items"`
}

type RevenueRow struct {
	Category     string `json:"category"`
	Orders       int64  `json:"orders"`
	Units        int64  `json:"units"`
	RevenueCents int64  `json:"revenue_cents"`
}

type SignupReport struct {
	Today      int64 `json:"today"`
	Last7Days  int64 `json:"last_7_days"`
	Last30Days int64 `json:"last_30_days"`
	Last90Days int64 `json:"last_90_days"`
}

type Claims struct {
	Sub   int64  `json:"sub"`
	Email string `json:"email"`
	Role  string `json:"role"`
	Exp   int64  `json:"exp"`
}

func Open(dbURL, secret string, ttl time.Duration) (*Store, error) {
	db, err := sql.Open("sqlite", dbURL)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(1)
	for _, pragma := range []string{
		"PRAGMA busy_timeout=5000",
		"PRAGMA journal_mode=WAL",
		"PRAGMA foreign_keys=ON",
	} {
		if _, err := db.Exec(pragma); err != nil {
			db.Close()
			return nil, err
		}
	}
	if err := db.Ping(); err != nil {
		db.Close()
		return nil, err
	}
	if ttl <= 0 {
		ttl = 72 * time.Hour
	}
	return &Store{
		db:              db,
		secret:          []byte(secret),
		ttl:             ttl,
		loginLimiter:    newRateLimiter(10, time.Minute),
		registerLimiter: newRateLimiter(5, time.Minute),
		uploadLimiter:   newRateLimiter(30, time.Minute),
	}, nil
}

// SetUploadDir configures where uploaded product images are written.
func (s *Store) SetUploadDir(dir string) {
	s.uploadDir = dir
}

func (s *Store) Close() error {
	return s.db.Close()
}

func (s *Store) Sign(c Claims) (string, error) {
	if c.Exp == 0 {
		c.Exp = time.Now().Add(s.ttl).Unix()
	}
	payload, err := json.Marshal(c)
	if err != nil {
		return "", err
	}
	encoded := base64.RawURLEncoding.EncodeToString(payload)
	return encoded + "." + s.sign(encoded), nil
}

func (s *Store) Verify(token string) (Claims, error) {
	parts := strings.SplitN(token, ".", 2)
	if len(parts) != 2 {
		return Claims{}, errors.New("malformed token")
	}
	if !hmac.Equal([]byte(s.sign(parts[0])), []byte(parts[1])) {
		return Claims{}, errors.New("bad token signature")
	}
	payload, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return Claims{}, errors.New("malformed token")
	}
	var c Claims
	if err := json.Unmarshal(payload, &c); err != nil {
		return Claims{}, errors.New("malformed token")
	}
	if c.Exp < time.Now().Unix() {
		return Claims{}, errors.New("token expired")
	}
	return c, nil
}

func (s *Store) sign(payload string) string {
	mac := hmac.New(sha256.New, s.secret)
	mac.Write([]byte(payload))
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

// writeServerError logs the underlying error and returns a generic message so
// internal/schema details are not exposed to clients.
func writeServerError(w http.ResponseWriter, err error) {
	log.Printf("ERROR: %v", err)
	writeError(w, http.StatusInternalServerError, "internal server error")
}

func decodeBody(r *http.Request, v any) error {
	defer r.Body.Close()
	return json.NewDecoder(io.LimitReader(r.Body, maxBodySize)).Decode(v)
}

func (s *Store) bearer(r *http.Request) string {
	h := r.Header.Get("Authorization")
	if strings.HasPrefix(strings.ToLower(h), "bearer ") {
		return strings.TrimSpace(h[7:])
	}
	return strings.TrimSpace(h)
}

func (s *Store) currentUser(r *http.Request, roles ...string) (User, error) {
	token := s.bearer(r)
	if token == "" {
		return User{}, errors.New("missing bearer token")
	}
	claims, err := s.Verify(token)
	if err != nil {
		return User{}, err
	}
	u, err := s.userByID(claims.Sub)
	if err != nil {
		return User{}, err
	}
	if len(roles) > 0 && !contains(roles, u.Role) {
		return User{}, errors.New("insufficient role")
	}
	return u, nil
}

func contains(s []string, v string) bool {
	for _, x := range s {
		if x == v {
			return true
		}
	}
	return false
}
