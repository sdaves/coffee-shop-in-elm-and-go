package gosqlapi

import "net/http"

// Register mounts the gosqlapi API routes onto the provided mux so they can be
// composed with other handlers (e.g. a static file server for the frontend).
func (this *App) Register(mux *http.ServeMux) {
	mux.HandleFunc("/{db}/{obj}", this.defaultHandler)
	mux.HandleFunc("/{db}/{obj}/", this.defaultHandler)
	mux.HandleFunc("/{db}/{obj}/{key}", this.defaultHandler)
	mux.HandleFunc("/{db}/{obj}/{key}/", this.defaultHandler)
}
