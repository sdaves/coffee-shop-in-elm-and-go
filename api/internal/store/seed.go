package store

import (
	"os"
	"strings"
)

// ExecFile runs a semicolon-separated SQL script. It exists for local seeding
// (`storeapi -seed`) so schema setup is never an HTTP endpoint.
func (s *Store) ExecFile(path string) error {
	raw, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	for _, stmt := range strings.Split(string(raw), ";") {
		if blankSQL(stmt) {
			continue
		}
		if _, err := s.db.Exec(stmt); err != nil {
			return err
		}
	}
	return nil
}

func blankSQL(stmt string) bool {
	for _, line := range strings.Split(stmt, "\n") {
		line = strings.TrimSpace(line)
		if line != "" && !strings.HasPrefix(line, "--") {
			return false
		}
	}
	return true
}
