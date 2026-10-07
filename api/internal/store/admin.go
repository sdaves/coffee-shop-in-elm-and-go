package store

import (
	"database/sql"
	"errors"
	"log"
	"net/http"
	"strconv"
	"strings"
)

var orderStatuses = []string{"pending", "paid", "shipped", "cancelled"}

type productInput struct {
	SKU          string `json:"sku"`
	Name         string `json:"name"`
	Category     string `json:"category"`
	PriceCents   int64  `json:"price_cents"`
	Stock        int64  `json:"stock"`
	ReorderLevel int64  `json:"reorder_level"`
	Active       *int64 `json:"active"`
	Image        string `json:"image"`
	Description  string `json:"description"`
}

type orderStatusInput struct {
	Status string `json:"status"`
}

type customerInput struct {
	FullName string `json:"full_name"`
	Country  string `json:"country"`
	Role     string `json:"role"`
}

func (s *Store) admin(w http.ResponseWriter, r *http.Request) (User, bool) {
	u, err := s.currentUser(r, "admin")
	if err != nil {
		writeError(w, http.StatusUnauthorized, err.Error())
		return User{}, false
	}
	return u, true
}

func (s *Store) handleAdminListProducts(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	products, err := s.allProducts()
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, products)
}

func (s *Store) handleAdminCreateProduct(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	var in productInput
	if err := decodeBody(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	if strings.TrimSpace(in.SKU) == "" || strings.TrimSpace(in.Name) == "" || strings.TrimSpace(in.Category) == "" {
		writeError(w, http.StatusBadRequest, "sku, name and category are required")
		return
	}
	if in.PriceCents < 0 || in.Stock < 0 || in.ReorderLevel < 0 {
		writeError(w, http.StatusBadRequest, "price, stock and reorder level cannot be negative")
		return
	}
	active := int64(1)
	if in.Active != nil {
		active = *in.Active
	}
	if _, err := s.db.Exec(
		`INSERT INTO PRODUCTS (SKU, NAME, CATEGORY, PRICE_CENTS, STOCK, REORDER_LEVEL, ACTIVE, IMAGE, DESCRIPTION) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		in.SKU, in.Name, in.Category, in.PriceCents, in.Stock, in.ReorderLevel, active, in.Image, in.Description); err != nil {
		if strings.Contains(strings.ToLower(err.Error()), "unique") {
			writeError(w, http.StatusConflict, "a product with that SKU already exists")
			return
		}
		writeServerError(w, err)
		return
	}
	p, err := s.productBySKU(in.SKU)
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, p)
}

func (s *Store) handleAdminUpdateProduct(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	sku := r.PathValue("sku")
	var in productInput
	if err := decodeBody(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	if strings.TrimSpace(in.Name) == "" || strings.TrimSpace(in.Category) == "" {
		writeError(w, http.StatusBadRequest, "name and category are required")
		return
	}
	if in.PriceCents < 0 || in.Stock < 0 || in.ReorderLevel < 0 {
		writeError(w, http.StatusBadRequest, "price, stock and reorder level cannot be negative")
		return
	}
	active := int64(1)
	if in.Active != nil {
		active = *in.Active
	}
	res, err := s.db.Exec(
		`UPDATE PRODUCTS SET NAME = ?, CATEGORY = ?, PRICE_CENTS = ?, STOCK = ?, REORDER_LEVEL = ?, ACTIVE = ?, IMAGE = ?, DESCRIPTION = ? WHERE SKU = ?`,
		in.Name, in.Category, in.PriceCents, in.Stock, in.ReorderLevel, active, in.Image, in.Description, sku)
	if err != nil {
		writeServerError(w, err)
		return
	}
	if n, _ := res.RowsAffected(); n == 0 {
		writeError(w, http.StatusNotFound, "no product with that SKU")
		return
	}
	p, err := s.productBySKU(sku)
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, p)
}

func (s *Store) handleAdminDeleteProduct(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	sku := r.PathValue("sku")
	res, err := s.db.Exec(`DELETE FROM PRODUCTS WHERE SKU = ?`, sku)
	if err != nil {
		log.Printf("ERROR: delete product %s: %v", sku, err)
		writeError(w, http.StatusConflict, "product could not be deleted")
		return
	}
	if n, _ := res.RowsAffected(); n == 0 {
		writeError(w, http.StatusNotFound, "no product with that SKU")
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"deleted": sku})
}

func (s *Store) handleAdminListOrders(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	orders, err := s.allOrders()
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, orders)
}

func (s *Store) handleAdminUpdateOrder(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid order id")
		return
	}
	var in orderStatusInput
	if err := decodeBody(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	if !contains(orderStatuses, in.Status) {
		writeError(w, http.StatusBadRequest, "status must be one of "+strings.Join(orderStatuses, ", "))
		return
	}
	res, err := s.db.Exec(`UPDATE ORDERS SET STATUS = ? WHERE ORDER_ID = ?`, in.Status, id)
	if err != nil {
		writeServerError(w, err)
		return
	}
	if n, _ := res.RowsAffected(); n == 0 {
		writeError(w, http.StatusNotFound, "no order with that id")
		return
	}
	order, err := s.orderByID(id)
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, order)
}

func (s *Store) handleAdminListCustomers(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	customers, err := s.allCustomers()
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, customers)
}

func (s *Store) handleAdminUpdateCustomer(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid customer id")
		return
	}
	var in customerInput
	if err := decodeBody(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	if strings.TrimSpace(in.FullName) == "" {
		writeError(w, http.StatusBadRequest, "full name is required")
		return
	}
	if in.Role != "customer" && in.Role != "admin" {
		writeError(w, http.StatusBadRequest, "role must be customer or admin")
		return
	}
	country := strings.TrimSpace(in.Country)
	if country == "" {
		country = "US"
	}
	existing, err := s.customerByID(id)
	if errors.Is(err, sql.ErrNoRows) {
		writeError(w, http.StatusNotFound, "no customer with that id")
		return
	}
	if err != nil {
		writeServerError(w, err)
		return
	}
	if existing.Role == "admin" && in.Role != "admin" {
		others, err := s.otherAdminsExist(id)
		if err != nil {
			writeServerError(w, err)
			return
		}
		if !others {
			writeError(w, http.StatusBadRequest, "cannot demote the last admin")
			return
		}
	}
	res, err := s.db.Exec(
		`UPDATE CUSTOMERS SET FULL_NAME = ?, COUNTRY = ?, ROLE = ? WHERE CUSTOMER_ID = ?`,
		in.FullName, country, in.Role, id)
	if err != nil {
		writeServerError(w, err)
		return
	}
	if n, _ := res.RowsAffected(); n == 0 {
		writeError(w, http.StatusNotFound, "no customer with that id")
		return
	}
	c, err := s.customerByID(id)
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, c)
}

func (s *Store) handleAdminDeleteCustomer(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid customer id")
		return
	}
	existing, err := s.customerByID(id)
	if errors.Is(err, sql.ErrNoRows) {
		writeError(w, http.StatusNotFound, "no customer with that id")
		return
	}
	if err != nil {
		writeServerError(w, err)
		return
	}
	if existing.Role == "admin" {
		others, err := s.otherAdminsExist(id)
		if err != nil {
			writeServerError(w, err)
			return
		}
		if !others {
			writeError(w, http.StatusBadRequest, "cannot delete the last admin")
			return
		}
	}
	tx, err := s.db.Begin()
	if err != nil {
		writeServerError(w, err)
		return
	}
	defer tx.Rollback()
	for _, stmt := range []string{
		`DELETE FROM ORDER_ITEMS WHERE ORDER_ID IN (SELECT ORDER_ID FROM ORDERS WHERE CUSTOMER_ID = ?)`,
		`DELETE FROM ORDERS WHERE CUSTOMER_ID = ?`,
		`DELETE FROM CUSTOMERS WHERE CUSTOMER_ID = ?`,
	} {
		if _, err := tx.Exec(stmt, id); err != nil {
			writeServerError(w, err)
			return
		}
	}
	if err := tx.Commit(); err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]int64{"deleted": id})
}

func (s *Store) handleAdminRevenue(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	rows, err := s.db.Query(
		`SELECT p.CATEGORY, COUNT(DISTINCT o.ORDER_ID), COALESCE(SUM(oi.QUANTITY), 0), COALESCE(SUM(oi.QUANTITY * oi.UNIT_PRICE_CENTS), 0)
		 FROM ORDER_ITEMS oi
		 JOIN ORDERS o ON o.ORDER_ID = oi.ORDER_ID
		 JOIN PRODUCTS p ON p.SKU = oi.SKU
		 GROUP BY p.CATEGORY
		 ORDER BY 4 DESC`)
	if err != nil {
		writeServerError(w, err)
		return
	}
	defer rows.Close()
	out := []RevenueRow{}
	for rows.Next() {
		var row RevenueRow
		if err := rows.Scan(&row.Category, &row.Orders, &row.Units, &row.RevenueCents); err != nil {
			writeServerError(w, err)
			return
		}
		out = append(out, row)
	}
	if err := rows.Err(); err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, out)
}

func (s *Store) handleAdminSignups(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	var report SignupReport
	err := s.db.QueryRow(
		`SELECT
		   COALESCE(SUM(CASE WHEN CREATED_AT >= datetime('now', 'start of day') THEN 1 ELSE 0 END), 0),
		   COALESCE(SUM(CASE WHEN CREATED_AT >= datetime('now', '-7 days') THEN 1 ELSE 0 END), 0),
		   COALESCE(SUM(CASE WHEN CREATED_AT >= datetime('now', '-30 days') THEN 1 ELSE 0 END), 0),
		   COALESCE(SUM(CASE WHEN CREATED_AT >= datetime('now', '-90 days') THEN 1 ELSE 0 END), 0)
		 FROM CUSTOMERS`).
		Scan(&report.Today, &report.Last7Days, &report.Last30Days, &report.Last90Days)
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, report)
}

func (s *Store) allProducts() ([]Product, error) {
	rows, err := s.db.Query(
		`SELECT SKU, NAME, CATEGORY, PRICE_CENTS, STOCK, REORDER_LEVEL, ACTIVE, IMAGE, DESCRIPTION FROM PRODUCTS ORDER BY NAME`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []Product{}
	for rows.Next() {
		var p Product
		if err := rows.Scan(&p.SKU, &p.Name, &p.Category, &p.PriceCents, &p.Stock, &p.ReorderLevel, &p.Active, &p.Image, &p.Description); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}

func (s *Store) productBySKU(sku string) (Product, error) {
	var p Product
	err := s.db.QueryRow(
		`SELECT SKU, NAME, CATEGORY, PRICE_CENTS, STOCK, REORDER_LEVEL, ACTIVE, IMAGE, DESCRIPTION FROM PRODUCTS WHERE SKU = ?`,
		sku).Scan(&p.SKU, &p.Name, &p.Category, &p.PriceCents, &p.Stock, &p.ReorderLevel, &p.Active, &p.Image, &p.Description)
	return p, err
}

func (s *Store) allOrders() ([]Order, error) {
	rows, err := s.db.Query(
		`SELECT o.ORDER_ID, o.CUSTOMER_ID, c.EMAIL, c.FULL_NAME, o.STATUS, o.PLACED_AT
		 FROM ORDERS o JOIN CUSTOMERS c ON c.CUSTOMER_ID = o.CUSTOMER_ID
		 ORDER BY o.ORDER_ID DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	orders := []Order{}
	for rows.Next() {
		var o Order
		if err := rows.Scan(&o.ID, &o.CustomerID, &o.CustomerEmail, &o.CustomerName, &o.Status, &o.PlacedAt); err != nil {
			return nil, err
		}
		orders = append(orders, o)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	for i := range orders {
		if err := s.fillOrderItems(&orders[i]); err != nil {
			return nil, err
		}
	}
	return orders, nil
}

func (s *Store) allCustomers() ([]Customer, error) {
	rows, err := s.db.Query(
		`SELECT CUSTOMER_ID, EMAIL, FULL_NAME, COUNTRY, ROLE, CREATED_AT FROM CUSTOMERS ORDER BY FULL_NAME`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []Customer{}
	for rows.Next() {
		var c Customer
		if err := rows.Scan(&c.ID, &c.Email, &c.FullName, &c.Country, &c.Role, &c.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}

func (s *Store) otherAdminsExist(excludeID int64) (bool, error) {
	var n int
	err := s.db.QueryRow(
		`SELECT COUNT(*) FROM CUSTOMERS WHERE ROLE = 'admin' AND CUSTOMER_ID <> ?`,
		excludeID).Scan(&n)
	return n > 0, err
}

func (s *Store) customerByID(id int64) (Customer, error) {
	var c Customer
	err := s.db.QueryRow(
		`SELECT CUSTOMER_ID, EMAIL, FULL_NAME, COUNTRY, ROLE, CREATED_AT FROM CUSTOMERS WHERE CUSTOMER_ID = ?`,
		id).Scan(&c.ID, &c.Email, &c.FullName, &c.Country, &c.Role, &c.CreatedAt)
	return c, err
}
