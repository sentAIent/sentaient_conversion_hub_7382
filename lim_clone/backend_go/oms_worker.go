package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/hibiken/asynq"
)

// A list of task types
const (
	TypeExecuteTrade = "trade:execute"
)

// TradePayload holds the data for an execution order
type TradePayload struct {
	Symbol   string  `json:"symbol"`
	Quantity float64 `json:"quantity"`
	Side     string  `json:"side"` // "BUY" or "SELL"
	Price    float64 `json:"price"` // Optional limit price
}

// NewExecuteTradeTask creates a task to execute a trade via Redis queue
func NewExecuteTradeTask(symbol string, quantity float64, side string) (*asynq.Task, error) {
	payload, err := json.Marshal(TradePayload{Symbol: symbol, Quantity: quantity, Side: side})
	if err != nil {
		return nil, err
	}
	// Return a new task with payload
	return asynq.NewTask(TypeExecuteTrade, payload, asynq.MaxRetry(3)), nil
}

// HandleExecuteTradeTask handles the execution logic when a worker picks up the job
func HandleExecuteTradeTask(ctx context.Context, t *asynq.Task) error {
	var p TradePayload
	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		log.Printf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
		return nil // Return nil so it doesn't retry on fatal payload errors
	}

	log.Printf(" [Asynq Worker] Executing Trade Task: %s %v shares of %s", p.Side, p.Quantity, p.Symbol)
	
	// Simulate order routing to CCXT / Alpaca
	// In production, broker API logic goes here.
	
	return nil
}

// StartWorker initializes and runs the Redis-backed Asynq worker
func StartWorker(redisAddr string) {
	srv := asynq.NewServer(
		asynq.RedisClientOpt{Addr: redisAddr},
		asynq.Config{
			Concurrency: 10,
			Queues: map[string]int{
				"critical": 6,
				"default":  3,
				"low":      1,
			},
		},
	)

	mux := asynq.NewServeMux()
	mux.HandleFunc(TypeExecuteTrade, HandleExecuteTradeTask)

	log.Printf("Starting Asynq worker listening to Redis at %s...", redisAddr)
	if err := srv.Run(mux); err != nil {
		log.Fatalf("Could not start worker server: %v", err)
	}
}
