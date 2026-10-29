package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/hibiken/asynq"
)

// Snowboarder's Paradise - Background Task Queue (Asynq)
// Used for high-reliability backend processing like finalizing
// massive 100-player tournaments, validating trick combos,
// and distributing gear rewards.

const (
	TypeTournamentPayout = "tournament:payout"
)

type TournamentPayload struct {
	TournamentID string `json:"tournament_id"`
	WinnerID     string `json:"winner_id"`
	PrizeAmount  int    `json:"prize_amount"`
}

func HandleTournamentPayout(ctx context.Context, t *asynq.Task) error {
	var payload TournamentPayload
	if err := json.Unmarshal(t.Payload(), &payload); err != nil {
		return fmt.Errorf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
	}

	// 1. Connect to RxDB / Supabase
	// 2. Validate the Winner's run
	// 3. Deposit PrizeAmount into WinnerID's account
	log.Printf("🏆 Processing Tournament %s: Awarding %d coins to %s", 
        payload.TournamentID, payload.PrizeAmount, payload.WinnerID)

	return nil
}

func main() {
	redisConnOpt := asynq.RedisClientOpt{Addr: "localhost:6379"}

	srv := asynq.NewServer(
		redisConnOpt,
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
	mux.HandleFunc(TypeTournamentPayout, HandleTournamentPayout)

	log.Println("🏂 Sentaient Asynq Worker Booting Up...")
	if err := srv.Run(mux); err != nil {
		log.Fatalf("could not run server: %v", err)
	}
}
