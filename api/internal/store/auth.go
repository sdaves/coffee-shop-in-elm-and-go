package store

import (
	"database/sql"
	"errors"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type authRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"full_name"`
	Country  string `json:"country"`
}

type authResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

// dummyPasswordHash is compared against for unknown emails to keep login timing
// comparable regardless of whether the account exists.
var dummyPasswordHash = mustHash("this-is-not-a-real-password")

func mustHash(password string) []byte {
	h, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	return h
}

func (s *Store) Register(mux *http.ServeMux) {
	mux.HandleFunc("POST /auth/register", s.handleRegister)
	mux.HandleFunc("POST /auth/login", s.handleLogin)
	mux.HandleFunc("GET /auth/me", s.handleMe)

	mux.HandleFunc("GET /my/orders", s.handleMyOrders)
	mux.HandleFunc("POST /my/orders", s.handlePlaceOrder)

	mux.HandleFunc("GET /admin/products", s.handleAdminListProducts)
	mux.HandleFunc("POST /admin/products", s.handleAdminCreateProduct)
	mux.HandleFunc("PUT /admin/products/{sku}", s.handleAdminUpdateProduct)
	mux.HandleFunc("DELETE /admin/products/{sku}", s.handleAdminDeleteProduct)
	mux.HandleFunc("GET /admin/orders", s.handleAdminListOrders)
	mux.HandleFunc("PUT /admin/orders/{id}", s.handleAdminUpdateOrder)
	mux.HandleFunc("GET /admin/customers", s.handleAdminListCustomers)
	mux.HandleFunc("PUT /admin/customers/{id}", s.handleAdminUpdateCustomer)
	mux.HandleFunc("DELETE /admin/customers/{id}", s.handleAdminDeleteCustomer)
	mux.HandleFunc("GET /admin/revenue", s.handleAdminRevenue)
	mux.HandleFunc("GET /admin/signups", s.handleAdminSignups)
	mux.HandleFunc("POST /admin/uploads", s.handleAdminUpload)
}

func (s *Store) handleRegister(w http.ResponseWriter, r *http.Request) {
	if !s.registerLimiter.allow(clientIP(r)) {
		writeError(w, http.StatusTooManyRequests, "too many attempts; try again later")
		return
	}
	var req authRequest
	if err := decodeBody(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	email := strings.ToLower(strings.TrimSpace(req.Email))
	name := strings.TrimSpace(req.Name)
	country := strings.TrimSpace(req.Country)
	if country == "" {
		country = "US"
	}
	if !strings.Contains(email, "@") {
		writeError(w, http.StatusBadRequest, "a valid email is required")
		return
	}
	if len(req.Password) < 8 {
		writeError(w, http.StatusBadRequest, "password must be at least 8 characters")
		return
	}
	if name == "" {
		writeError(w, http.StatusBadRequest, "full name is required")
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		writeServerError(w, err)
		return
	}

	res, err := s.db.Exec(
		`INSERT INTO CUSTOMERS (EMAIL, FULL_NAME, COUNTRY, PASSWORD_HASH, ROLE) VALUES (?, ?, ?, ?, 'customer')`,
		email, name, country, string(hash))
	if err != nil {
		if strings.Contains(strings.ToLower(err.Error()), "unique") {
			writeError(w, http.StatusConflict, "an account with that email already exists")
			return
		}
		writeServerError(w, err)
		return
	}
	id, _ := res.LastInsertId()
	s.respondWithToken(w, http.StatusCreated, id)
}

func (s *Store) handleLogin(w http.ResponseWriter, r *http.Request) {
	if !s.loginLimiter.allow(clientIP(r)) {
		writeError(w, http.StatusTooManyRequests, "too many attempts; try again later")
		return
	}
	var req authRequest
	if err := decodeBody(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	email := strings.ToLower(strings.TrimSpace(req.Email))

	var (
		u    User
		hash string
	)
	err := s.db.QueryRow(
		`SELECT CUSTOMER_ID, EMAIL, FULL_NAME, COUNTRY, ROLE, PASSWORD_HASH FROM CUSTOMERS WHERE EMAIL = ?`,
		email).Scan(&u.ID, &u.Email, &u.Name, &u.Country, &u.Role, &hash)
	if errors.Is(err, sql.ErrNoRows) {
		// Burn a comparable bcrypt compare so unknown emails are not
		// distinguishable from wrong passwords by timing.
		_ = bcrypt.CompareHashAndPassword(dummyPasswordHash, []byte(req.Password))
		writeError(w, http.StatusUnauthorized, "invalid email or password")
		return
	}
	if err != nil {
		writeServerError(w, err)
		return
	}
	if hash == "" || bcrypt.CompareHashAndPassword([]byte(hash), []byte(req.Password)) != nil {
		writeError(w, http.StatusUnauthorized, "invalid email or password")
		return
	}
	s.respondWithTokenForUser(w, http.StatusOK, u)
}

func (s *Store) handleMe(w http.ResponseWriter, r *http.Request) {
	u, err := s.currentUser(r)
	if err != nil {
		writeError(w, http.StatusUnauthorized, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, u)
}

func (s *Store) respondWithToken(w http.ResponseWriter, status int, id int64) {
	u, err := s.userByID(id)
	if err != nil {
		writeServerError(w, err)
		return
	}
	s.respondWithTokenForUser(w, status, u)
}

func (s *Store) respondWithTokenForUser(w http.ResponseWriter, status int, u User) {
	token, err := s.Sign(Claims{Sub: u.ID, Email: u.Email, Role: u.Role})
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, status, authResponse{Token: token, User: u})
}

func (s *Store) userByID(id int64) (User, error) {
	var u User
	err := s.db.QueryRow(
		`SELECT CUSTOMER_ID, EMAIL, FULL_NAME, COUNTRY, ROLE FROM CUSTOMERS WHERE CUSTOMER_ID = ?`,
		id).Scan(&u.ID, &u.Email, &u.Name, &u.Country, &u.Role)
	return u, err
}
