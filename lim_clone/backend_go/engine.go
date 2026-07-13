package main

import (
	"sync"
)

// BacktestParams represents the conditions for a simulation
// This replicates the logic that XMIM would generate
type BacktestParams struct {
	Symbol       string
	EntryDropPct float64 // e.g., enter if price drops by X%
	HoldDays     int     // how long to hold the position
}

// TradeResult represents the outcome of a single simulated trade
type TradeResult struct {
	EntryDate  string  `json:"entry_date"`
	EntryPrice float64 `json:"entry_price"`
	ExitDate   string  `json:"exit_date"`
	ExitPrice  float64 `json:"exit_price"`
	ReturnPct  float64 `json:"return_pct"`
}

// BacktestSummary summarizes the total run
type BacktestSummary struct {
	Symbol       string        `json:"symbol"`
	TotalTrades  int           `json:"total_trades"`
	WinRate      float64       `json:"win_rate"`
	AvgReturnPct float64       `json:"avg_return_pct"`
	Trades       []TradeResult `json:"trades"`
}

// RunSimulation runs the backtest engine concurrently
func RunSimulation(data []MarketData, params BacktestParams) BacktestSummary {
	var trades []TradeResult
	var mu sync.Mutex // To protect the trades slice if we run parallel chunks
	var wg sync.WaitGroup

	// For highly parallel execution, we can chunk the data array.
	// In this simplified version, we iterate to find entry signals.
	// A full implementation would use goroutines per chunk of time.
	
	// Simplified goroutine execution wrapper to demonstrate concurrency structure
	wg.Add(1)
	go func() {
		defer wg.Done()
		for i := 1; i < len(data)-params.HoldDays; i++ {
			prevClose := data[i-1].Close
			currentClose := data[i].Close
			
			drop := (prevClose - currentClose) / prevClose

			// Condition: did it drop by the specified percentage?
			if drop >= params.EntryDropPct {
				entry := data[i]
				exit := data[i+params.HoldDays]
				
				ret := (exit.Close - entry.Close) / entry.Close

				mu.Lock()
				trades = append(trades, TradeResult{
					EntryDate:  entry.Timestamp.Format("2006-01-02"),
					EntryPrice: entry.Close,
					ExitDate:   exit.Timestamp.Format("2006-01-02"),
					ExitPrice:  exit.Close,
					ReturnPct:  ret * 100, // convert to percentage
				})
				mu.Unlock()
			}
		}
	}()
	
	wg.Wait()

	// Calculate summary stats
	wins := 0
	totalReturn := 0.0
	for _, t := range trades {
		totalReturn += t.ReturnPct
		if t.ReturnPct > 0 {
			wins++
		}
	}

	avgReturn := 0.0
	winRate := 0.0
	if len(trades) > 0 {
		avgReturn = totalReturn / float64(len(trades))
		winRate = float64(wins) / float64(len(trades)) * 100
	}

	return BacktestSummary{
		Symbol:       params.Symbol,
		TotalTrades:  len(trades),
		WinRate:      winRate,
		AvgReturnPct: avgReturn,
		Trades:       trades,
	}
}
