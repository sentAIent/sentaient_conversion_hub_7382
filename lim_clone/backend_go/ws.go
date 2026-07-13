package main

import (
	"context"
	"log"
	"math/rand"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/alpacahq/alpaca-trade-api-go/v3/marketdata/stream"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for the demo
	},
}

type WsClient struct {
	conn *websocket.Conn
	send chan ChartData
}

var (
	clients   = make(map[*WsClient]bool)
	clientsMu sync.Mutex
)

// ChartData matches the JSON expected by lightweight-charts, plus the Symbol for filtering
type ChartData struct {
	Symbol string  `json:"symbol"`
	Time   int64   `json:"time"`
	Open   float64 `json:"open"`
	High   float64 `json:"high"`
	Low    float64 `json:"low"`
	Close  float64 `json:"close"`
}

// Broadcasts data to all connected websocket clients
func broadcast(data ChartData) {
	clientsMu.Lock()
	defer clientsMu.Unlock()
	for client := range clients {
		select {
		case client.send <- data:
		default:
			close(client.send)
			delete(clients, client)
		}
	}
}

// handleWebSocket manages incoming WS connections from React
func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket Upgrade error:", err)
		return
	}

	client := &WsClient{
		conn: ws,
		send: make(chan ChartData, 256),
	}

	clientsMu.Lock()
	clients[client] = true
	clientsMu.Unlock()

	// Writer goroutine
	go func() {
		defer func() {
			clientsMu.Lock()
			delete(clients, client)
			clientsMu.Unlock()
			client.conn.Close()
		}()
		for data := range client.send {
			if err := client.conn.WriteJSON(data); err != nil {
				break
			}
		}
	}()

	// Reader goroutine (to keep connection alive and detect disconnects)
	for {
		_, _, err := ws.ReadMessage()
		if err != nil {
			break
		}
	}
}

// StartMarketDataStream connects to Alpaca. If it fails (e.g. invalid keys), it falls back to simulated live data.
func StartMarketDataStream() {
	key := os.Getenv("APCA_API_KEY_ID")
	secret := os.Getenv("APCA_API_SECRET_KEY")

	if key == "" || secret == "" {
		log.Println("Alpaca keys missing. Starting simulated market data stream...")
		go simulateMarketData()
		return
	}

	// Connect to Alpaca stream
	c := stream.NewStocksClient(
		"iex",
		stream.WithCredentials(key, secret),
	)

	err := c.Connect(context.Background())
	if err != nil {
		log.Printf("Failed to connect to Alpaca stream: %v. Falling back to simulated stream.", err)
		go simulateMarketData()
		return
	}
	log.Println("Successfully connected to Alpaca Live Market Data Stream.")

	// Subscribe to minute bars
	err = c.SubscribeToBars(func(b stream.Bar) {
		// Convert Alpaca Bar to lightweight-charts format
		data := ChartData{
			Symbol: b.Symbol,
			Time:   b.Timestamp.Unix(),
			Open:   b.Open,
			High:   b.High,
			Low:    b.Low,
			Close:  b.Close,
		}
		broadcast(data)
	}, "AAPL", "SPY", "QQQ")

	if err != nil {
		log.Printf("Failed to subscribe to bars: %v", err)
	}
}

// simulateMarketData generates fake live ticks for the chart if Alpaca stream isn't available
func simulateMarketData() {
	currentPrice := 150.0
	for {
		time.Sleep(2 * time.Second)
		now := time.Now().Unix()
		
		change := (rand.Float64() - 0.5) * 0.5
		open := currentPrice
		close := currentPrice + change
		high := max(open, close) + rand.Float64()*0.2
		low := min(open, close) - rand.Float64()*0.2
		
		data := ChartData{
			Symbol: "AAPL",
			Time:   now,
			Open:   open,
			High:   high,
			Low:    low,
			Close:  close,
		}
		
		currentPrice = close
		broadcast(data)
		
		// Simulate SPY ticking as well
		dataSpy := ChartData{
			Symbol: "SPY",
			Time:   now,
			Open:   450.0 + change,
			High:   450.0 + high - open,
			Low:    450.0 + low - open,
			Close:  450.0 + close - open,
		}
		broadcast(dataSpy)

		// Simulate QQQ ticking as well
		dataQqq := ChartData{
			Symbol: "QQQ",
			Time:   now,
			Open:   400.0 + change,
			High:   400.0 + high - open,
			Low:    400.0 + low - open,
			Close:  400.0 + close - open,
		}
		broadcast(dataQqq)
	}
}

func max(a, b float64) float64 {
	if a > b {
		return a
	}
	return b
}

func min(a, b float64) float64 {
	if a < b {
		return a
	}
	return b
}
