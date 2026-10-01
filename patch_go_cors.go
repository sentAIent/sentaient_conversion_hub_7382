package main

import (
	"os"
	"strings"
)

func main() {
	b, err := os.ReadFile("lim_clone/backend_go/main.go")
	if err != nil { panic(err) }
	
	s := string(b)
	
	replacement := `func enableCors(w *http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")
	if origin == "http://localhost:3050" || origin == "http://127.0.0.1:3050" {
		(*w).Header().Set("Access-Control-Allow-Origin", origin)
	} else {
		(*w).Header().Set("Access-Control-Allow-Origin", "*")
	}
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}`

	// find func enableCors
	start := strings.Index(s, "func enableCors(w *http.ResponseWriter) {")
	if start != -1 {
		end := start + strings.Index(s[start:], "}") + 1
		s = s[:start] + replacement + s[end:]
	}
	
	os.WriteFile("lim_clone/backend_go/main.go", []byte(s), 0644)
}
