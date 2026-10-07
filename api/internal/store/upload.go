package store

import (
	"bytes"
	"crypto/rand"
	"encoding/hex"
	"encoding/xml"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

const maxUploadBytes = 5 << 20 // 5 MB

// handleAdminUpload accepts a multipart image from an admin, writes it to the
// uploads directory under a random name, and returns that name.
func (s *Store) handleAdminUpload(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.admin(w, r); !ok {
		return
	}
	if s.uploadDir == "" {
		writeError(w, http.StatusInternalServerError, "uploads are not configured")
		return
	}
	if !s.uploadLimiter.allow(clientIP(r)) {
		writeError(w, http.StatusTooManyRequests, "too many uploads; try again later")
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, maxUploadBytes+1024)
	if err := r.ParseMultipartForm(1 << 20); err != nil {
		writeError(w, http.StatusRequestEntityTooLarge, "image must be 5 MB or smaller")
		return
	}
	defer r.MultipartForm.RemoveAll()

	file, _, err := r.FormFile("file")
	if err != nil {
		writeError(w, http.StatusBadRequest, "no file provided")
		return
	}
	defer file.Close()

	data, err := io.ReadAll(io.LimitReader(file, maxUploadBytes+1))
	if err != nil {
		writeServerError(w, err)
		return
	}
	if len(data) > maxUploadBytes {
		writeError(w, http.StatusRequestEntityTooLarge, "image must be 5 MB or smaller")
		return
	}

	ext := imageExtension(data)
	if ext == "" {
		writeError(w, http.StatusBadRequest, "unsupported image type")
		return
	}

	name, err := randomName()
	if err != nil {
		writeServerError(w, err)
		return
	}
	name += ext

	if err := os.MkdirAll(s.uploadDir, 0o755); err != nil {
		writeServerError(w, err)
		return
	}
	if err := os.WriteFile(filepath.Join(s.uploadDir, name), data, 0o644); err != nil {
		writeServerError(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, map[string]string{"image": name})
}

// imageExtension sniffs the content (never the client-supplied name) and
// returns the extension to store it under, or "" if it is not an allowed image.
func imageExtension(data []byte) string {
	if _, format, err := image.DecodeConfig(bytes.NewReader(data)); err == nil {
		switch format {
		case "png":
			return ".png"
		case "jpeg":
			return ".jpg"
		case "gif":
			return ".gif"
		}
	}
	if http.DetectContentType(data) == "image/webp" {
		return ".webp"
	}
	if isSVG(data) {
		return ".svg"
	}
	return ""
}

// isSVG reports whether the first XML element is <svg>.
func isSVG(data []byte) bool {
	dec := xml.NewDecoder(bytes.NewReader(data))
	for {
		tok, err := dec.Token()
		if err != nil {
			return false
		}
		if start, ok := tok.(xml.StartElement); ok {
			return start.Name.Local == "svg"
		}
	}
}

func randomName() (string, error) {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return "up-" + hex.EncodeToString(b), nil
}
