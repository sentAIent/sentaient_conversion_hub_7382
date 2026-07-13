package main

import (
	"fmt"
	"log"
	"time"
)

// OrderType represents whether it's a Buy or Sell
type OrderType string

const (
	Buy  OrderType = "BUY"
	Sell OrderType = "SELL"
)

// Order status
const (
	StatusPending  = "PENDING"
	StatusFilled   = "FILLED"
	StatusRejected = "REJECTED"
)

// Order structure
type Order struct {
	ID        string
	Symbol    string
	Type      OrderType
	Quantity  int
	Price     float64
	Status    string
	Timestamp time.Time
}

// PaperTradingAccount simulates user balances, margin, and positions
type PaperTradingAccount struct {
	Balance       float64
	MarginUsed    float64
	Positions     map[string]int
	LatencySim    time.Duration // Simulate network/exchange latency
	SlippagePct   float64       // Simulate price slippage in paper trading
}

// OrderManagementSystem (OMS) routes orders to live brokers or paper accounts
type OrderManagementSystem struct {
	PaperAccount *PaperTradingAccount
	IsLive       bool // If true, route to live broker API. If false, paper trade.
}

func NewOMS(isLive bool) *OrderManagementSystem {
	return &OrderManagementSystem{
		IsLive: isLive,
		PaperAccount: &PaperTradingAccount{
			Balance:     100000.00, // $100k starting paper balance
			Positions:   make(map[string]int),
			LatencySim:  250 * time.Millisecond,
			SlippagePct: 0.0005, // 0.05% slippage
		},
	}
}

// SubmitOrder acts as the entry point for both live and paper trades
func (oms *OrderManagementSystem) SubmitOrder(order Order) (Order, error) {
	log.Printf("OMS received order: %s %d %s @ %.2f", order.Type, order.Quantity, order.Symbol, order.Price)

	if oms.IsLive {
		return oms.routeToBroker(order)
	}
	return oms.executePaperTrade(order)
}

// routeToBroker handles actual API connections to exchanges (e.g., Alpaca, IBKR)
func (oms *OrderManagementSystem) routeToBroker(order Order) (Order, error) {
	// TODO: Integrate actual Alpaca/Interactive Brokers SDK here
	log.Println("Routing order to live exchange via broker API...")
	
	// Mocking a network call to exchange
	time.Sleep(100 * time.Millisecond)
	order.Status = StatusFilled
	order.ID = fmt.Sprintf("LIVE_EXCH_%d", time.Now().UnixNano())
	
	return order, nil
}

// executePaperTrade simulates real-world execution conditions
func (oms *OrderManagementSystem) executePaperTrade(order Order) (Order, error) {
	log.Println("Executing against Paper Trading Engine...")
	
	// Simulate exchange latency
	time.Sleep(oms.PaperAccount.LatencySim)

	// Simulate Slippage
	slippage := order.Price * oms.PaperAccount.SlippagePct
	executionPrice := order.Price
	if order.Type == Buy {
		executionPrice += slippage // Buying costs slightly more
	} else {
		executionPrice -= slippage // Selling yields slightly less
	}

	cost := float64(order.Quantity) * executionPrice

	// Very basic execution logic
	if order.Type == Buy {
		if oms.PaperAccount.Balance >= cost {
			oms.PaperAccount.Balance -= cost
			oms.PaperAccount.Positions[order.Symbol] += order.Quantity
			order.Status = StatusFilled
		} else {
			order.Status = StatusRejected
			return order, fmt.Errorf("insufficient paper funds")
		}
	} else if order.Type == Sell {
		if oms.PaperAccount.Positions[order.Symbol] >= order.Quantity {
			oms.PaperAccount.Balance += cost
			oms.PaperAccount.Positions[order.Symbol] -= order.Quantity
			order.Status = StatusFilled
		} else {
			order.Status = StatusRejected
			return order, fmt.Errorf("insufficient position to sell")
		}
	}

	order.Price = executionPrice // Update with slippage-adjusted price
	order.ID = fmt.Sprintf("PAPER_%d", time.Now().UnixNano())
	
	log.Printf("Paper trade executed. New Balance: $%.2f", oms.PaperAccount.Balance)
	return order, nil
}
