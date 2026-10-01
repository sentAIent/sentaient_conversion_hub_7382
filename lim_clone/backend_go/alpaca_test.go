package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandleAccount_MockMode(t *testing.T) {
	// Ensure client is nil to trigger mock mode
	alpacaClient = nil

	req, err := http.NewRequest("GET", "/api/account", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handleAccount)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	var account AccountData
	if err := json.NewDecoder(rr.Body).Decode(&account); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}

	if account.ID != "MOCK-ACCOUNT-12345" {
		t.Errorf("Expected mock account ID 'MOCK-ACCOUNT-12345', got %v", account.ID)
	}
	if account.Cash != 100000.00 {
		t.Errorf("Expected cash to be 100000.00, got %f", account.Cash)
	}
}

func TestHandleTrade_MockMode(t *testing.T) {
	// Ensure client is nil to trigger mock mode
	alpacaClient = nil

	tradeReq := TradeRequest{
		Symbol: "AAPL",
		Side:   "BUY",
		Qty:    "10",
	}
	body, _ := json.Marshal(tradeReq)

	req, err := http.NewRequest("POST", "/api/trade", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handleTrade)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	var response map[string]interface{}
	if err := json.NewDecoder(rr.Body).Decode(&response); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}

	if response["symbol"] != "AAPL" {
		t.Errorf("Expected symbol to be AAPL, got %v", response["symbol"])
	}
	if response["side"] != "BUY" {
		t.Errorf("Expected side to be BUY, got %v", response["side"])
	}
	if response["qty"] != "10" {
		t.Errorf("Expected qty to be 10, got %v", response["qty"])
	}
	if response["status"] != "filled" {
		t.Errorf("Expected status to be filled, got %v", response["status"])
	}
}
