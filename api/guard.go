package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"strings"
)

const (
	storeAPIPrefix   = "/store/"
	maxStorePageSize = 100
	maxGuardBodySize = 1 << 20
)

func securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "no-referrer")
		next.ServeHTTP(w, r)
	})
}

func storeAPIGuard(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !strings.HasPrefix(r.URL.Path, storeAPIPrefix) {
			next.ServeHTTP(w, r)
			return
		}
		if msg := sanitizeStoreQuery(r); msg != "" {
			writeGuardError(w, http.StatusBadRequest, msg)
			return
		}
		if msg := sanitizeStoreBody(r); msg != "" {
			writeGuardError(w, http.StatusBadRequest, msg)
			return
		}
		rec := &bufferedResponse{ResponseWriter: w}
		next.ServeHTTP(rec, r)
		rec.flush()
	})
}

type bufferedResponse struct {
	http.ResponseWriter
	status int
	body   bytes.Buffer
	wrote  bool
}

func (b *bufferedResponse) WriteHeader(code int) {
	if !b.wrote {
		b.status = code
		b.wrote = true
	}
}

func (b *bufferedResponse) Write(p []byte) (int, error) {
	if !b.wrote {
		b.status = http.StatusOK
		b.wrote = true
	}
	return b.body.Write(p)
}

func (b *bufferedResponse) flush() {
	if b.status == 0 {
		b.status = http.StatusOK
	}
	if b.status >= http.StatusInternalServerError {
		b.ResponseWriter.Header().Set("Content-Type", "application/json; charset=utf-8")
		b.ResponseWriter.WriteHeader(b.status)
		_, _ = io.WriteString(b.ResponseWriter, "{\"error\":\"internal server error\"}\n")
		return
	}
	b.ResponseWriter.WriteHeader(b.status)
	_, _ = b.ResponseWriter.Write(b.body.Bytes())
}

func sanitizeStoreQuery(r *http.Request) string {
	q := r.URL.Query()
	changed := false
	if v := q.Get(".page_size"); v != "" {
		n, err := strconv.Atoi(v)
		if err != nil {
			return "page_size must be an integer"
		}
		if n > maxStorePageSize {
			q.Set(".page_size", strconv.Itoa(maxStorePageSize))
			changed = true
		}
	}
	if v := q.Get(".offset"); v != "" {
		n, err := strconv.Atoi(v)
		if err != nil {
			return "offset must be an integer"
		}
		if n < 0 {
			q.Set(".offset", "0")
			changed = true
		}
	}
	if v := q.Get(".order_by"); v != "" && !validOrderBy(v) {
		return "invalid order_by"
	}
	if changed {
		r.URL.RawQuery = q.Encode()
	}
	return ""
}

func sanitizeStoreBody(r *http.Request) string {
	if r.Body == nil || r.ContentLength == 0 {
		return ""
	}
	raw, err := io.ReadAll(io.LimitReader(r.Body, maxGuardBodySize+1))
	if err != nil {
		return "could not read request body"
	}
	r.Body = io.NopCloser(bytes.NewReader(raw))
	if len(raw) == 0 || len(raw) > maxGuardBodySize {
		return ""
	}
	var body map[string]any
	if err := json.Unmarshal(raw, &body); err != nil {
		return ""
	}
	changed := false
	if v, ok := body[".page_size"]; ok {
		n, ok := guardInt(v)
		if !ok {
			return "page_size must be an integer"
		}
		if n > maxStorePageSize {
			body[".page_size"] = maxStorePageSize
			changed = true
		}
	}
	if v, ok := body[".offset"]; ok {
		n, ok := guardInt(v)
		if !ok {
			return "offset must be an integer"
		}
		if n < 0 {
			body[".offset"] = 0
			changed = true
		}
	}
	if v, ok := body[".order_by"]; ok {
		s, ok := v.(string)
		if !ok || !validOrderBy(s) {
			return "invalid order_by"
		}
	}
	if changed {
		newRaw, err := json.Marshal(body)
		if err != nil {
			return ""
		}
		r.Body = io.NopCloser(bytes.NewReader(newRaw))
		r.ContentLength = int64(len(newRaw))
	}
	return ""
}

func guardInt(v any) (int, bool) {
	switch n := v.(type) {
	case float64:
		return int(n), true
	case string:
		i, err := strconv.Atoi(n)
		if err != nil {
			return 0, false
		}
		return i, true
	}
	return 0, false
}

func validOrderBy(orderBy string) bool {
	for _, part := range strings.Split(orderBy, ",") {
		fields := strings.Fields(strings.TrimSpace(part))
		if len(fields) == 0 || len(fields) > 2 || !validIdentifier(fields[0]) {
			return false
		}
		if len(fields) == 2 {
			direction := strings.ToUpper(fields[1])
			if direction != "ASC" && direction != "DESC" {
				return false
			}
		}
	}
	return true
}

func validIdentifier(s string) bool {
	if s == "" {
		return false
	}
	for _, part := range strings.Split(s, ".") {
		if part == "" {
			return false
		}
		for i, c := range part {
			if c == '_' || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (i > 0 && c >= '0' && c <= '9') {
				continue
			}
			return false
		}
	}
	return true
}

func writeGuardError(w http.ResponseWriter, status int, msg string) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]string{"error": msg})
}
