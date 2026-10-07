package store

import (
	"database/sql"
	"errors"
	"net/http"
)

type placeOrderRequest struct {
	Items []struct {
		SKU      string `json:"sku"`
		Quantity int64  `json:"quantity"`
	} `json:"items"`
}

func (s *Store) handleMyOrders(w http.ResponseWriter, r *http.Request) {
	u, err := s.currentUser(r)
	if err != nil {
		writeError(w, http.StatusUnauthorized, err.Error())
		return
	}
	orders, err := s.ordersForCustomer(u.ID)
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, orders)
}

func (s *Store) handlePlaceOrder(w http.ResponseWriter, r *http.Request) {
	u, err := s.currentUser(r, "customer")
	if err != nil {
		writeError(w, http.StatusUnauthorized, err.Error())
		return
	}
	var req placeOrderRequest
	if err := decodeBody(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	if len(req.Items) == 0 {
		writeError(w, http.StatusBadRequest, "an order needs at least one item")
		return
	}

	tx, err := s.db.Begin()
	if err != nil {
		writeServerError(w, err)
		return
	}
	defer tx.Rollback()

	type line struct {
		sku   string
		name  string
		qty   int64
		price int64
	}
	lines := make([]line, 0, len(req.Items))
	for _, item := range req.Items {
		if item.Quantity <= 0 {
			writeError(w, http.StatusBadRequest, "quantity must be positive")
			return
		}
		var (
			name  string
			price int64
		)
		err := tx.QueryRow(
			`SELECT NAME, PRICE_CENTS FROM PRODUCTS WHERE SKU = ? AND ACTIVE = 1`,
			item.SKU).Scan(&name, &price)
		if errors.Is(err, sql.ErrNoRows) {
			writeError(w, http.StatusBadRequest, "unknown or inactive product: "+item.SKU)
			return
		}
		if err != nil {
			writeServerError(w, err)
			return
		}
		res, err := tx.Exec(
			`UPDATE PRODUCTS SET STOCK = STOCK - ? WHERE SKU = ? AND STOCK >= ?`,
			item.Quantity, item.SKU, item.Quantity)
		if err != nil {
			writeServerError(w, err)
			return
		}
		if n, _ := res.RowsAffected(); n == 0 {
			writeError(w, http.StatusConflict, "not enough stock for "+name)
			return
		}
		lines = append(lines, line{sku: item.SKU, name: name, qty: item.Quantity, price: price})
	}

	res, err := tx.Exec(`INSERT INTO ORDERS (CUSTOMER_ID, STATUS) VALUES (?, 'pending')`, u.ID)
	if err != nil {
		writeServerError(w, err)
		return
	}
	orderID, _ := res.LastInsertId()
	for _, l := range lines {
		if _, err := tx.Exec(
			`INSERT INTO ORDER_ITEMS (ORDER_ID, SKU, QUANTITY, UNIT_PRICE_CENTS) VALUES (?, ?, ?, ?)`,
			orderID, l.sku, l.qty, l.price); err != nil {
			writeServerError(w, err)
			return
		}
	}
	if err := tx.Commit(); err != nil {
		writeServerError(w, err)
		return
	}

	order, err := s.orderByID(orderID)
	if err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, order)
}

func (s *Store) ordersForCustomer(customerID int64) ([]Order, error) {
	rows, err := s.db.Query(
		`SELECT o.ORDER_ID, o.CUSTOMER_ID, c.EMAIL, c.FULL_NAME, o.STATUS, o.PLACED_AT
		 FROM ORDERS o JOIN CUSTOMERS c ON c.CUSTOMER_ID = o.CUSTOMER_ID
		 WHERE o.CUSTOMER_ID = ?
		 ORDER BY o.ORDER_ID DESC`, customerID)
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

func (s *Store) orderByID(id int64) (Order, error) {
	var o Order
	err := s.db.QueryRow(
		`SELECT o.ORDER_ID, o.CUSTOMER_ID, c.EMAIL, c.FULL_NAME, o.STATUS, o.PLACED_AT
		 FROM ORDERS o JOIN CUSTOMERS c ON c.CUSTOMER_ID = o.CUSTOMER_ID
		 WHERE o.ORDER_ID = ?`, id).
		Scan(&o.ID, &o.CustomerID, &o.CustomerEmail, &o.CustomerName, &o.Status, &o.PlacedAt)
	if err != nil {
		return Order{}, err
	}
	if err := s.fillOrderItems(&o); err != nil {
		return Order{}, err
	}
	return o, nil
}

func (s *Store) fillOrderItems(o *Order) error {
	rows, err := s.db.Query(
		`SELECT oi.SKU, COALESCE(p.NAME, oi.SKU), oi.QUANTITY, oi.UNIT_PRICE_CENTS
		 FROM ORDER_ITEMS oi LEFT JOIN PRODUCTS p ON p.SKU = oi.SKU
		 WHERE oi.ORDER_ID = ?
		 ORDER BY oi.ORDER_ITEM_ID`, o.ID)
	if err != nil {
		return err
	}
	defer rows.Close()
	items := []OrderItem{}
	var total int64
	for rows.Next() {
		var it OrderItem
		if err := rows.Scan(&it.SKU, &it.Name, &it.Quantity, &it.UnitPriceCents); err != nil {
			return err
		}
		total += it.Quantity * it.UnitPriceCents
		items = append(items, it)
	}
	if err := rows.Err(); err != nil {
		return err
	}
	o.Items = items
	o.TotalCents = total
	return nil
}
