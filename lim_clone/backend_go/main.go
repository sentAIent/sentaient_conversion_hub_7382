package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
	"github.com/joho/godotenv"
)

var dbConn driver.Conn

func main() {
	// 0. Load .env variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading it. Relying on system environment variables.")
	}

	// 0.5 Initialize Alpaca
	InitAlpaca()

	// 1. Connect to ClickHouse (Historis clone)
	conn, err := ConnectDB()
	if err != nil {
		log.Printf("Failed to connect to ClickHouse: %v (Falling back to Mock Data)", err)
	} else {
		dbConn = conn
		log.Println("Successfully connected to ClickHouse.")
	}

	// 2. Setup fast API endpoints
	http.HandleFunc("/simulate", handleSimulate)
	http.HandleFunc("/api/market-data", handleMarketData)
	http.HandleFunc("/api/portfolio-stats", handlePortfolioStats)
	http.HandleFunc("/api/options-chain", handleOptionsChain)
	http.HandleFunc("/api/account", handleAccount)
	http.HandleFunc("/api/trade", handleTrade)
	http.HandleFunc("/api/search-asset", handleSearchAsset)
	http.HandleFunc("/api/quotes", handleQuotes)
	http.HandleFunc("/api/portfolio/positions", handlePortfolioPositions)
	http.HandleFunc("/api/portfolio/history", handlePortfolioHistory)
	// 2.5 Auth Endpoints
	http.HandleFunc("/api/login", handleLogin)
	http.HandleFunc("/api/register", handleRegister)
	
	// Start Alpaca websocket streamer
	go StartMarketDataStream()
	http.HandleFunc("/ws/market-data", handleWebSocket)
	
	log.Println("Starting MIM Analytics Engine on port 8080...")
	if err := http.ListenAndServe("127.0.0.1:8080", nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

// enableCors adds CORS headers
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3050")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// handleSimulate accepts backtest parameters and returns a summary
func handleSimulate(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var params BacktestParams
	if err := json.NewDecoder(r.Body).Decode(&params); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// For demonstration, fetch last 5 years of data
	end := time.Now()
	start := end.AddDate(-5, 0, 0)

	log.Printf("Fetching data for %s...", params.Symbol)
	data, err := FetchData(dbConn, params.Symbol, start, end)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error fetching data: %v", err), http.StatusInternalServerError)
		return
	}

	log.Printf("Loaded %d rows. Running concurrent backtest...", len(data))
	
	// 3. Run the concurrent engine
	summary := RunSimulation(data, params)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(summary)
}

// handleMarketData serves OHLCV data directly to the frontend chart
func handleMarketData(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		symbol = "AAPL"
	}

	end := time.Now()
	start := end.AddDate(-1, 0, 0) // fetch 1 year for charting

	data, err := FetchData(dbConn, symbol, start, end)
	if err != nil {
		log.Printf("Error fetching data (falling back to mock): %v", err)
	}

	// Format for lightweight-charts: {time: string, open, high, low, close}
	type ChartData struct {
		Time  string  `json:"time"`
		Open  float64 `json:"open"`
		High  float64 `json:"high"`
		Low   float64 `json:"low"`
		Close float64 `json:"close"`
	}

	var responseData []ChartData
	for _, row := range data {
		responseData = append(responseData, ChartData{
			Time:  row.Timestamp.Format("2006-01-02"),
			Open:  row.Open,
			High:  row.High,
			Low:   row.Low,
			Close: row.Close,
		})
	}

	// If no data (e.g. ClickHouse is empty), provide some mock data so the chart doesn't break
	if len(responseData) == 0 {
		basePrice := 145.0
		if symbol == "SPY" {
			basePrice = 450.0
		} else if symbol == "QQQ" {
			basePrice = 400.0
		}
		
		responseData = []ChartData{
			{Time: "2023-01-01", Open: basePrice - 5, High: basePrice, Low: basePrice - 7, Close: basePrice - 1},
			{Time: "2023-01-02", Open: basePrice - 1, High: basePrice + 3, Low: basePrice - 2, Close: basePrice + 2},
			{Time: "2023-01-03", Open: basePrice + 2, High: basePrice + 5, Low: basePrice + 1, Close: basePrice + 3},
			{Time: "2023-01-04", Open: basePrice + 3, High: basePrice + 4, Low: basePrice - 4, Close: basePrice - 3},
			{Time: "2023-01-05", Open: basePrice - 3, High: basePrice + 1, Low: basePrice - 5, Close: basePrice},
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responseData)
}

// PortfolioStats represents quantitative metrics
type PortfolioStats struct {
	Symbol          string  `json:"symbol"`
	BenchmarkSymbol string  `json:"benchmark_symbol"`
	Alpha           float64 `json:"alpha"`
	Beta            float64 `json:"beta"`
	Sharpe          float64 `json:"sharpe"`
	Sortino         float64 `json:"sortino"`
	Omega           float64 `json:"omega"`
	Skewness        float64 `json:"skewness"`
	Kurtosis        float64 `json:"kurtosis"`
	MSquared        float64 `json:"m_squared"`
	RSquared        float64 `json:"r_squared"`
	Correlation     float64 `json:"correlation"`
	UpsideDev       float64 `json:"upside_dev"`
	DownsideDev     float64 `json:"downside_dev"`
}

// handlePortfolioStats serves pre-calculated quantitative metrics
func handlePortfolioStats(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	symbol := r.URL.Query().Get("symbol")
	benchmark := r.URL.Query().Get("benchmark")
	if symbol == "" {
		symbol = "AAPL"
	}
	if benchmark == "" {
		benchmark = "^GSPC" // Default to S&P 500
	}

	query := `
		SELECT symbol, benchmark_symbol, alpha, beta, sharpe, sortino, omega, 
		       skewness, kurtosis, m_squared, r_squared, correlation, upside_dev, downside_dev
		FROM portfolio_stats_daily 
		WHERE symbol = $1 AND benchmark_symbol = $2
		ORDER BY calc_date DESC LIMIT 1
	`
	var stats PortfolioStats
	
	if dbConn != nil {
		row := dbConn.QueryRow(context.Background(), query, symbol, benchmark)
		err := row.Scan(
			&stats.Symbol, &stats.BenchmarkSymbol, &stats.Alpha, &stats.Beta,
			&stats.Sharpe, &stats.Sortino, &stats.Omega, &stats.Skewness,
			&stats.Kurtosis, &stats.MSquared, &stats.RSquared, &stats.Correlation,
			&stats.UpsideDev, &stats.DownsideDev,
		)
		if err == nil {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(stats)
			return
		}
	}

	// Dynamic fallback: Fetch GIPS-verified quantitative analytics from Python audit engine
	client := &http.Client{Timeout: 3 * time.Second}
	resp, err := client.Get(fmt.Sprintf("http://127.0.0.1:8000/api/audit/verify?symbol=%s&benchmark=%s", symbol, benchmark))
	if err == nil && resp.StatusCode == http.StatusOK {
		var auditRes struct {
			MathAudit struct {
				Alpha       float64 `json:"alpha"`
				Beta        float64 `json:"beta"`
				Sharpe      float64 `json:"sharpe"`
				Sortino     float64 `json:"sortino"`
				Omega       float64 `json:"omega"`
				Skewness    float64 `json:"skewness"`
				Kurtosis    float64 `json:"kurtosis"`
				MSquared    float64 `json:"m_squared"`
				RSquared    float64 `json:"r_squared"`
				Correlation float64 `json:"correlation"`
				UpsideDev   float64 `json:"upside_dev"`
				DownsideDev float64 `json:"downside_dev"`
			} `json:"mathematical_audit"`
		}
		if err := json.NewDecoder(resp.Body).Decode(&auditRes); err == nil {
			stats = PortfolioStats{
				Symbol:          symbol,
				BenchmarkSymbol: benchmark,
				Alpha:           auditRes.MathAudit.Alpha,
				Beta:            auditRes.MathAudit.Beta,
				Sharpe:          auditRes.MathAudit.Sharpe,
				Sortino:         auditRes.MathAudit.Sortino,
				Omega:           auditRes.MathAudit.Omega,
				Skewness:        auditRes.MathAudit.Skewness,
				Kurtosis:        auditRes.MathAudit.Kurtosis,
				MSquared:        auditRes.MathAudit.MSquared,
				RSquared:        auditRes.MathAudit.RSquared,
				Correlation:     auditRes.MathAudit.Correlation,
				UpsideDev:       auditRes.MathAudit.UpsideDev,
				DownsideDev:     auditRes.MathAudit.DownsideDev,
			}
			resp.Body.Close()
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(stats)
			return
		}
		resp.Body.Close()
	}

	// Final static fallback if Python is also unreachable
	baseReturn := 0.05
	baseSharpe := 1.2
	if benchmark == "SPY" {
		baseReturn = 0.08
		baseSharpe = 1.5
	} else if benchmark == "QQQ" {
		baseReturn = 0.12
		baseSharpe = 1.8
	}
	stats = PortfolioStats{
		Symbol: symbol, BenchmarkSymbol: benchmark, Alpha: baseReturn, Beta: 1.1,
		Sharpe: baseSharpe, Sortino: baseSharpe * 1.5, Omega: 1.15, Skewness: -0.2, Kurtosis: 3.1,
		MSquared: 0.08, RSquared: 0.85, Correlation: 0.92, UpsideDev: 0.12, DownsideDev: 0.08,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}

// OptionsChain represents a row in the options chain
type OptionsChain struct {
	ContractSymbol string  `json:"contract_symbol"`
	Strike         float64 `json:"strike"`
	OptionType     string  `json:"option_type"`
	LastPrice      float64 `json:"last_price"`
	ImpliedVol     float64 `json:"implied_volatility"`
	Delta          float64 `json:"delta"`
	Gamma          float64 `json:"gamma"`
	Theta          float64 `json:"theta"`
	Vega           float64 `json:"vega"`
	Rho            float64 `json:"rho"`
}

// handleOptionsChain serves raw options chain data
func handleOptionsChain(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		return
	}
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		symbol = "AAPL"
	}

	query := `
		SELECT contract_symbol, strike, option_type, last_price, implied_volatility
		FROM options_chain_raw 
		WHERE underlying_symbol = $1
		ORDER BY strike ASC LIMIT 50
	`
	var chain []OptionsChain
	
	if dbConn != nil {
		rows, err := dbConn.Query(context.Background(), query, symbol)
		if err == nil {
			defer rows.Close()
			for rows.Next() {
				var opt OptionsChain
				if err := rows.Scan(&opt.ContractSymbol, &opt.Strike, &opt.OptionType, &opt.LastPrice, &opt.ImpliedVol); err == nil {
					chain = append(chain, opt)
				}
			}
		}
	}

	if len(chain) == 0 {
		// Mock data if empty
		chain = []OptionsChain{
			{ContractSymbol: symbol + "240119C00150000", Strike: 150.0, OptionType: "call", LastPrice: 5.20, ImpliedVol: 0.25},
			{ContractSymbol: symbol + "240119C00155000", Strike: 155.0, OptionType: "call", LastPrice: 3.10, ImpliedVol: 0.24},
			{ContractSymbol: symbol + "240119P00150000", Strike: 150.0, OptionType: "put", LastPrice: 4.80, ImpliedVol: 0.26},
		}
	}

	// Fetch verified Greeks from Python backend
	type GreekRequest struct {
		OptionType        string  `json:"option_type"`
		SpotPrice         float64 `json:"spot_price"`
		Strike            float64 `json:"strike"`
		TimeToExpiryYears float64 `json:"time_to_expiry_years"`
		RiskFreeRate      float64 `json:"risk_free_rate"`
		ImpliedVol        float64 `json:"implied_vol"`
	}

	for i, opt := range chain {
		reqBody := GreekRequest{
			OptionType:        opt.OptionType,
			SpotPrice:         150.0, // Baseline underlying price
			Strike:            opt.Strike,
			TimeToExpiryYears: 0.12,  // ~45 days to maturity standard
			RiskFreeRate:      0.045, // 4.5% US Treasury Yield
			ImpliedVol:        opt.ImpliedVol,
		}
		
		bodyBytes, _ := json.Marshal(reqBody)
		req, _ := http.NewRequest("POST", "http://localhost:8000/api/quant/options-greeks", bytes.NewBuffer(bodyBytes))
		req.Header.Set("Content-Type", "application/json")
		
		client := &http.Client{Timeout: 2 * time.Second}
		resp, err := client.Do(req)
		
		if err == nil && resp.StatusCode == http.StatusOK {
			var greeks struct {
				Delta float64 `json:"delta"`
				Gamma float64 `json:"gamma"`
				Theta float64 `json:"theta"`
				Vega  float64 `json:"vega"`
				Rho   float64 `json:"rho"`
			}
			if err := json.NewDecoder(resp.Body).Decode(&greeks); err == nil {
				chain[i].Delta = greeks.Delta
				chain[i].Gamma = greeks.Gamma
				chain[i].Theta = greeks.Theta
				chain[i].Vega = greeks.Vega
				chain[i].Rho = greeks.Rho
			}
			resp.Body.Close()
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(chain)
}
