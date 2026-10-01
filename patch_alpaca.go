package main

import (
	"os"
	"strings"
)

func main() {
	b, err := os.ReadFile("lim_clone/backend_go/alpaca.go")
	if err != nil { panic(err) }
	
	s := string(b)
	
	// Remove handleAccount mock
	s = strings.ReplaceAll(s, `if alpacaClient == nil {
		account := map[string]interface{}{
			"ID":             "MOCK-ACCOUNT-12345",
			"Status":         "ACTIVE",
			"Currency":       "USD",
			"Cash":           "100000.00",
			"PortfolioValue": "150000.00",
			"Equity":         "150000.00",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(account)
		return
	}`, `if alpacaClient == nil {
		http.Error(w, "Alpaca API credentials missing", http.StatusServiceUnavailable)
		return
	}`)

	// Remove handleTrade mock
	s = strings.ReplaceAll(s, `if alpacaClient == nil {
		mockOrder := map[string]interface{}{
			"id":             fmt.Sprintf("mock-order-%d", rand.Intn(1000000)),
			"client_order_id": req.ClientOrderID,
			"symbol":         req.Symbol,
			"qty":            req.Qty,
			"side":           req.Side,
			"type":           req.Type,
			"time_in_force":  req.TimeInForce,
			"status":         "accepted",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(mockOrder)
		return
	}`, `if alpacaClient == nil {
		http.Error(w, "Alpaca API credentials missing", http.StatusServiceUnavailable)
		return
	}`)
	
	// Remove handleSearchAsset mock
	s = strings.ReplaceAll(s, `if alpacaClient == nil {
		// Mock Mode
		mockAsset := map[string]interface{}{
			"symbol":   symbol,
			"name":     symbol + " Inc. (Mock)",
			"exchange": "NASDAQ",
			"class":    "us_equity",
			"status":   "active",
			"tradable": true,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(mockAsset)
		return
	}`, `if alpacaClient == nil {
		http.Error(w, "Alpaca API credentials missing", http.StatusServiceUnavailable)
		return
	}`)

	// Replace the quotes mock - this one is longer, let's use regex or split
	
	os.WriteFile("lim_clone/backend_go/alpaca.go", []byte(s), 0644)
}
