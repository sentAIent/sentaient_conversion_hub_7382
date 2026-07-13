-- Create database
CREATE DATABASE IF NOT EXISTS lim_db;

USE lim_db;

-- 1. Raw Market Data Table
-- This table receives the raw ingestion data (e.g., from Yahoo Finance)
CREATE TABLE IF NOT EXISTS market_data_raw (
    symbol String,
    timestamp DateTime,
    open Float64,
    high Float64,
    low Float64,
    close Float64,
    volume UInt64,
    ingestion_time DateTime DEFAULT now()
) ENGINE = ReplacingMergeTree(ingestion_time)
ORDER BY (symbol, timestamp);

-- 2. Manual Overrides Table
-- This table stores manual human corrections. It is protected from automated wipes.
CREATE TABLE IF NOT EXISTS market_data_overrides (
    symbol String,
    timestamp DateTime,
    open Float64,
    high Float64,
    low Float64,
    close Float64,
    volume UInt64,
    override_reason String,
    override_time DateTime DEFAULT now()
) ENGINE = ReplacingMergeTree(override_time)
ORDER BY (symbol, timestamp);

-- 3. Final Unified View (The "Historis" view)
-- This view merges raw data with manual overrides.
-- Overrides take precedence over raw data.
CREATE VIEW IF NOT EXISTS market_data AS
SELECT
    symbol,
    timestamp,
    any(open) AS open,
    any(high) AS high,
    any(low) AS low,
    any(close) AS close,
    any(volume) AS volume
FROM (
    -- Get overrides first
    SELECT symbol, timestamp, open, high, low, close, volume, 2 AS priority
    FROM market_data_overrides
    
    UNION ALL
    
    -- Get raw data
    SELECT symbol, timestamp, open, high, low, close, volume, 1 AS priority
    FROM market_data_raw
)
GROUP BY symbol, timestamp
ORDER BY max(priority) DESC;

-- 4. Portfolio Stats Daily
-- Stores advanced metrics calculated nightly by the quant engine
CREATE TABLE IF NOT EXISTS portfolio_stats_daily (
    symbol String,
    benchmark_symbol String,
    calc_date Date,
    alpha Float64,
    beta Float64,
    sharpe Float64,
    sortino Float64,
    omega Float64,
    skewness Float64,
    kurtosis Float64,
    m_squared Float64,
    r_squared Float64,
    correlation Float64,
    upside_dev Float64,
    downside_dev Float64,
    updated_at DateTime DEFAULT now()
) ENGINE = ReplacingMergeTree(updated_at)
ORDER BY (symbol, benchmark_symbol, calc_date);

-- 5. Options Chain Raw
-- Stores current options chain data from Yahoo Finance
CREATE TABLE IF NOT EXISTS options_chain_raw (
    underlying_symbol String,
    contract_symbol String,
    expiration_date Date,
    strike Float64,
    option_type String, -- 'call' or 'put'
    last_price Float64,
    bid Float64,
    ask Float64,
    volume UInt64,
    open_interest UInt64,
    implied_volatility Float64,
    delta Float64,
    gamma Float64,
    theta Float64,
    vega Float64,
    rho Float64,
    ingestion_time DateTime DEFAULT now()
) ENGINE = ReplacingMergeTree(ingestion_time)
ORDER BY (underlying_symbol, expiration_date, strike, option_type);
