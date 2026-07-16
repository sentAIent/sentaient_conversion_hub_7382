package main

import (
	"context"
	"fmt"
	"time"

	"github.com/ClickHouse/clickhouse-go/v2"
	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
)

// MarketData represents a single historical bar
type MarketData struct {
	Symbol    string
	Timestamp time.Time
	Open      float64
	High      float64
	Low       float64
	Close     float64
	Volume    uint64
}

// ConnectDB establishes a connection to the ClickHouse database
func ConnectDB() (driver.Conn, error) {
	conn, err := clickhouse.Open(&clickhouse.Options{
		Addr: []string{"127.0.0.1:9000"},
		Auth: clickhouse.Auth{
			Database: "lim_db",
			Username: "default",
			Password: "",
		},
		Debug: false,
	})
	if err != nil {
		return nil, err
	}
	if err := conn.Ping(context.Background()); err != nil {
		return nil, err
	}
	return conn, nil
}

// FetchData retrieves historical data from the Historis unified view for a specific symbol
func FetchData(conn driver.Conn, symbol string, start, end time.Time) ([]MarketData, error) {
	if conn == nil {
		return nil, fmt.Errorf("database connection is nil")
	}

	query := `
		SELECT symbol, timestamp, open, high, low, close, volume 
		FROM market_data_1m 
		WHERE symbol = $1 AND timestamp >= $2 AND timestamp <= $3
		ORDER BY timestamp ASC
	`
	rows, err := conn.Query(context.Background(), query, symbol, start, end)
	if err != nil {
		return nil, fmt.Errorf("query failed: %v", err)
	}
	defer rows.Close()

	var data []MarketData
	for rows.Next() {
		var row MarketData
		if err := rows.Scan(
			&row.Symbol, &row.Timestamp, &row.Open, &row.High,
			&row.Low, &row.Close, &row.Volume,
		); err != nil {
			return nil, err
		}
		data = append(data, row)
	}
	return data, nil
}
