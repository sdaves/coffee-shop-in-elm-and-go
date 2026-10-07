package main

import (
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"acme/storeapi/internal/gosqlapi"
	"acme/storeapi/internal/store"
)

func main() {
	confPath := flag.String("c", "gosqlapi.json", "gosqlapi configuration file")
	webDir := flag.String("web", "../frontend", "directory containing the Elm frontend assets")
	seed := flag.Bool("seed", false, "create/seed the database from -seed-sql and exit")
	seedSQL := flag.String("seed-sql", "scripts/init.sql", "SQL file used by -seed")
	flag.Parse()

	confBytes, err := os.ReadFile(*confPath)
	if err != nil {
		log.Fatalf("read config: %v", err)
	}

	app, err := gosqlapi.NewApp(confBytes)
	if err != nil {
		log.Fatalf("parse config: %v", err)
	}

	var cfg struct {
		Databases map[string]struct {
			URL string `json:"url"`
		} `json:"databases"`
		Auth struct {
			Secret        string `json:"secret"`
			TokenTTLHours int    `json:"token_ttl_hours"`
		} `json:"auth"`
	}
	if err := json.Unmarshal(confBytes, &cfg); err != nil {
		log.Fatalf("parse auth config: %v", err)
	}
	dbURL := cfg.Databases["store"].URL
	if dbURL == "" {
		dbURL = "./store.db"
	}
	if cfg.Auth.Secret == "" {
		log.Printf("WARNING: no auth.secret configured; using an insecure development secret")
		cfg.Auth.Secret = "insecure-dev-secret"
	}
	ttl := time.Duration(cfg.Auth.TokenTTLHours) * time.Hour
	st, err := store.Open(dbURL, cfg.Auth.Secret, ttl)
	if err != nil {
		log.Fatalf("open store database: %v", err)
	}
	defer st.Close()

	if *seed {
		if err := st.ExecFile(*seedSQL); err != nil {
			log.Fatalf("seed: %v", err)
		}
		log.Printf("seeded database from %s", *seedSQL)
		return
	}

	uploadDir := filepath.Join(filepath.Dir(dbURL), "uploads")
	st.SetUploadDir(uploadDir)
	mux := buildMux(app, st, *webDir, uploadDir)

	addr := "127.0.0.1:8080"
	if app.Web != nil && app.Web.HttpAddr != "" {
		addr = app.Web.HttpAddr
	}

	if app.Web != nil && app.Web.HttpsAddr != "" && app.Web.CertFile != "" && app.Web.KeyFile != "" {
		log.Printf("serving API + frontend on https://%s/ (frontend: %s)", app.Web.HttpsAddr, *webDir)
		if err := http.ListenAndServeTLS(app.Web.HttpsAddr, app.Web.CertFile, app.Web.KeyFile, mux); err != nil {
			log.Fatal(err)
		}
		return
	}

	log.Printf("serving API + frontend on http://%s/ (frontend: %s)", addr, *webDir)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}

// buildMux wires the custom auth/customer/admin routes, the gosqlapi routes,
// and the static frontend onto one mux. Extracted so tests can boot the same
// server the binary runs.
func buildMux(app *gosqlapi.App, st *store.Store, webDir string, uploadDir string) http.Handler {
	mux := http.NewServeMux()

	// Auth, customer and admin routes.
	st.Register(mux)

	// API routes: /{database}/{object}[/{key}]
	app.Register(mux)

	// Uploaded product images. A one-segment pattern is more specific than
	// gosqlapi's /{db}/{obj}, so the two do not conflict.
	mux.HandleFunc("/uploads/{file}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("file")
		if name == "" || strings.Contains(name, "..") || strings.ContainsAny(name, `/\`) {
			http.NotFound(w, r)
			return
		}
		// nosniff plus a sandboxed CSP so an uploaded SVG cannot run scripts
		// if opened directly, while still rendering inside <img>.
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox")
		http.ServeFile(w, r, filepath.Join(uploadDir, name))
	})

	// Frontend: everything else (/, /index.html, /elm.js, ...)
	mux.Handle("/", noCache(http.FileServer(http.Dir(webDir))))

	return securityHeaders(storeAPIGuard(mux))
}

// noCache stops browsers from serving stale frontend assets during development.
func noCache(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "no-referrer")
		w.Header().Set("Content-Security-Policy",
			"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'")
		next.ServeHTTP(w, r)
	})
}
