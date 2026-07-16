package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"

	"github.com/alpacahq/alpaca-trade-api-go/v3/alpaca"
	"github.com/alpacahq/alpaca-trade-api-go/v3/marketdata"
	"github.com/shopspring/decimal"
)

// AlpacaClient holds the initialized client instance
var alpacaClient *alpaca.Client

// InitAlpaca initializes the Alpaca API client using environment variables
// Expects APCA_API_KEY_ID, APCA_API_SECRET_KEY, and APCA_API_BASE_URL to be set
func InitAlpaca() {
	// The client automatically picks up the APCA_ environment variables
	alpacaClient = alpaca.NewClient(alpaca.ClientOpts{})

	// Test the connection by getting the account
	account, err := alpacaClient.GetAccount()
	if err != nil {
		log.Printf("Alpaca initialization warning (keys might not be set yet): %v", err)
		alpacaClient = nil
		return
	}
	log.Printf("Successfully connected to Alpaca! Paper account ID: %s, Buying Power: %s", account.ID, account.BuyingPower)
}

// AccountData represents the account info to send to the frontend
type AccountData struct {
	ID             string  `json:"id"`
	Status         string  `json:"status"`
	Equity         float64 `json:"equity"`
	BuyingPower    float64 `json:"buying_power"`
	Cash           float64 `json:"cash"`
	Currency       string  `json:"currency"`
	IsPaperTrading bool    `json:"is_paper_trading"`
}

// handleAccount fetches the live Alpaca account balance
func handleAccount(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}

	if alpacaClient == nil {
		http.Error(w, "Alpaca client not initialized", http.StatusInternalServerError)
		return
	}

	acct, err := alpacaClient.GetAccount()
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get account: %v", err), http.StatusInternalServerError)
		return
	}

	// Convert decimals to floats for JSON
	equity, _ := acct.Equity.Float64()
	bp, _ := acct.BuyingPower.Float64()
	cash, _ := acct.Cash.Float64()

	resp := AccountData{
		ID:             acct.ID,
		Status:         acct.Status,
		Equity:         equity,
		BuyingPower:    bp,
		Cash:           cash,
		Currency:       acct.Currency,
		IsPaperTrading: true, // Assuming true because we requested the Paper API
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// TradeRequest represents an incoming trade order from the frontend
type TradeRequest struct {
	Symbol string `json:"symbol"`
	Side   string `json:"side"` // "BUY" or "SELL"
	Qty    string `json:"qty"`  // String for precision
}

// handleTrade processes a live order to Alpaca
func handleTrade(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if alpacaClient == nil {
		http.Error(w, "Alpaca client not initialized", http.StatusInternalServerError)
		return
	}

	var req TradeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	qty, err := decimal.NewFromString(req.Qty)
	if err != nil {
		http.Error(w, "Invalid quantity", http.StatusBadRequest)
		return
	}

	var side alpaca.Side
	if req.Side == "BUY" {
		side = alpaca.Buy
	} else if req.Side == "SELL" {
		side = alpaca.Sell
	} else {
		http.Error(w, "Side must be BUY or SELL", http.StatusBadRequest)
		return
	}

	// Place a market order
	orderReq := alpaca.PlaceOrderRequest{
		Symbol:      req.Symbol,
		Qty:         &qty,
		Side:        side,
		Type:        alpaca.Market,
		TimeInForce: alpaca.GTC,
	}

	order, err := alpacaClient.PlaceOrder(orderReq)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to place order: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(order)
}

// handleSearchAsset performs an exact ticker lookup via Alpaca API
func handleSearchAsset(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}
	symbol := r.URL.Query().Get("q")
	if symbol == "" {
		http.Error(w, "Query parameter 'q' is required", http.StatusBadRequest)
		return
	}

	symbol = strings.ToUpper(strings.TrimSpace(symbol))

	if alpacaClient == nil {
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
	}

	asset, err := alpacaClient.GetAsset(symbol)
	if err != nil {
		http.Error(w, fmt.Sprintf("Asset not found: %v", err), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(asset)
}

type QuoteData struct {
	Symbol    string    `json:"symbol"`
	Price     float64   `json:"price"`
	Change    float64   `json:"change"`
	ChangePct float64   `json:"changePct"`
	Volume    int64     `json:"volume"`
	History   []float64 `json:"history"` // For sparkline
}

// handleQuotes fetches the latest snapshot for the ticker tape
func handleQuotes(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}
	symbolsParam := r.URL.Query().Get("symbols")
	if symbolsParam == "" {
		http.Error(w, "Query parameter 'symbols' is required", http.StatusBadRequest)
		return
	}

	symbols := strings.Split(symbolsParam, ",")
	for i := range symbols {
		symbols[i] = strings.ToUpper(strings.TrimSpace(symbols[i]))
	}

	var quotes []QuoteData

	if alpacaClient == nil {
		// Mock Data
		for _, sym := range symbols {
			basePrice := 100.0 + float64(len(sym)*10)
			if sym == "SPY" { basePrice = 450.0 }
			if sym == "QQQ" { basePrice = 400.0 }
			if sym == "AAPL" { basePrice = 150.0 }

			chg := (rand.Float64() - 0.5) * (basePrice * 0.05) // Up to 5% change
			
			// Generate mock history for sparkline
			history := make([]float64, 20)
			histPrice := basePrice - chg
			for j := 0; j < 20; j++ {
				history[j] = histPrice
				histPrice += (rand.Float64() - 0.5) * (basePrice * 0.01)
			}
			history[19] = basePrice + chg

			quotes = append(quotes, QuoteData{
				Symbol:    sym,
				Price:     basePrice + chg,
				Change:    chg,
				ChangePct: (chg / basePrice) * 100,
				Volume:    int64(rand.Intn(50000000) + 1000000),
				History:   history,
			})
		}
	} else {
		// Real Data via Alpaca Market Data API
		key := os.Getenv("APCA_API_KEY_ID")
		secret := os.Getenv("APCA_API_SECRET_KEY")
		mdClient := marketdata.NewClient(marketdata.ClientOpts{
			APIKey:    key,
			APISecret: secret,
		})

		// GetSnapshots for v3
		snapshots, err := mdClient.GetSnapshots(symbols, marketdata.GetSnapshotRequest{})
		if err != nil {
			log.Printf("Failed to fetch snapshots: %v", err)
			http.Error(w, "Failed to fetch market data", http.StatusInternalServerError)
			return
		}

		for sym, snap := range snapshots {
			var price, chg, chgPct float64
			var vol int64

			if snap.LatestTrade != nil {
				price = snap.LatestTrade.Price
			} else if snap.DailyBar != nil {
				price = snap.DailyBar.Close
			}

			if snap.PrevDailyBar != nil && snap.PrevDailyBar.Close > 0 {
				prevClose := snap.PrevDailyBar.Close
				chg = price - prevClose
				chgPct = (chg / prevClose) * 100
			}

			if snap.DailyBar != nil {
				vol = int64(snap.DailyBar.Volume)
			}

			quotes = append(quotes, QuoteData{
				Symbol:    sym,
				Price:     price,
				Change:    chg,
				ChangePct: chgPct,
				Volume:    vol,
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quotes)
}

// PortfolioPosition matches the frontend's expected mock structure but populated from Alpaca
type PortfolioPosition struct {
	Symbol       string  `json:"symbol"`
	Qty          float64 `json:"qty"`
	AvgPrice     float64 `json:"avgPrice"`
	CurrentPrice float64 `json:"currentPrice"`
	Pnl          float64 `json:"pnl"`
}

// handlePortfolioPositions fetches live open positions from Alpaca
func handlePortfolioPositions(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}

	if alpacaClient == nil {
		// Mock Data fallback if not connected
		mockPositions := []PortfolioPosition{
			{Symbol: "AAPL", Qty: 150, AvgPrice: 165.20, CurrentPrice: 172.50, Pnl: 1095.00},
			{Symbol: "MSFT", Qty: 100, AvgPrice: 320.10, CurrentPrice: 335.20, Pnl: 1510.00},
			{Symbol: "TSLA", Qty: 50, AvgPrice: 240.00, CurrentPrice: 225.50, Pnl: -725.00},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(mockPositions)
		return
	}

	positions, err := alpacaClient.GetPositions()
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get positions: %v", err), http.StatusInternalServerError)
		return
	}

	var result []PortfolioPosition
	for _, pos := range positions {
		qty, _ := pos.Qty.Float64()
		avgPrice, _ := pos.AvgEntryPrice.Float64()
		currentPrice, _ := pos.CurrentPrice.Float64()
		pnl, _ := pos.UnrealizedPL.Float64()

		result = append(result, PortfolioPosition{
			Symbol:       pos.Symbol,
			Qty:          qty,
			AvgPrice:     avgPrice,
			CurrentPrice: currentPrice,
			Pnl:          pnl,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

type PortfolioHistoryPoint struct {
	Date  string  `json:"date"`
	Value float64 `json:"value"`
}

// handlePortfolioHistory fetches the history of the account value
func handlePortfolioHistory(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}

	period := r.URL.Query().Get("period")
	if period == "" {
		period = "1M" // default
	}

	if alpacaClient == nil {
		// Mock Performance fallback
		mockPerf := []PortfolioHistoryPoint{
			{Date: "2023-01", Value: 100000},
			{Date: "2023-02", Value: 102500},
			{Date: "2023-03", Value: 101200},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(mockPerf)
		return
	}

	req := alpaca.GetPortfolioHistoryRequest{
		Period: period,
	}

	history, err := alpacaClient.GetPortfolioHistory(req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get portfolio history: %v", err), http.StatusInternalServerError)
		return
	}

	var result []PortfolioHistoryPoint
	for i, timestamp := range history.Timestamp {
		// Just returning Unix timestamps as strings or formatted dates
		// For simplicity, we'll format timestamp as YYYY-MM-DD
		// Alpaca returns Unix timestamps in seconds
		// The historical equity is in history.Equity[i]
		if i < len(history.Equity) {
			eqFloat, _ := history.Equity[i].Float64()
			result = append(result, PortfolioHistoryPoint{
				Date:  fmt.Sprintf("%d", timestamp), // Will format in JS
				Value: eqFloat,
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
