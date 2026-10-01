# Technical Findings & Architecture Analysis: Requirements R1 & R4

**Project**: Contango Quant  
**Working Directory**: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/explorer_survey_2`  
**Author**: Explorer 2  
**Date**: 2026-08-09  

---

## 1. Executive Summary

This report presents technical findings, codebase audit, gap analysis, and recommended implementation architecture for **R1 (Dynamic Charting & Analytical Gateway)** and **R4 (Automated Trade Execution Engine)** of the Contango Quant platform.

- **Current Repository Audit**: The repository is a React (Vite) + Express application equipped with `@supabase/supabase-js`, `recharts`, `helmet`, and `framer-motion`. The current codebase handles landing pages, authentication contexts, and auxiliary Gemini AI backend routes. However, there is **zero existing code** for candlestick charting across 21 timeframes, technical indicator overlays (SMA/EMA/Bollinger), price HUD (RSI/MACD), trendline drawing canvas, synchronized split-screen charting, Alpaca Paper Trading API integration, fallback mock broker, or real-time WebSocket tick broadcasts.
- **R1 Architectural Recommendation**: Implement a high-performance modular charting system using `lightweight-charts` (or Canvas/D3 fallback), backed by a Client/Server Resampling Engine for 21 periods, an Indicator Math module, an SVG/Canvas Drawing Layer with dual-tier storage (localStorage + Supabase `drawings`), and synchronized horizontal time-scale viewports for comparative split screens.
- **R4 Architectural Recommendation**: Implement a unified backend Execution Engine utilizing the **Adapter / Strategy Pattern** (`BrokerAdapter`). Route orders to `AlpacaBroker` if valid Alpaca API credentials exist; otherwise, seamlessly fallback to `MockBroker` with simulated execution fills. Implement a WebSocket server (`ws` module) emitting real-time tick feeds and order execution events.

---

## 2. Requirements Specification & Breakdown

### R1. Dynamic Charting & Analytical Gateway

1. **21 Timeframe Support**:
   - **Intraday (5)**: `1m`, `5m`, `15m`, `30m`, `60m`
   - **Hourly (7)**: `1h`, `2h`, `4h`, `6h`, `8h`, `12h`, `24h`
   - **Daily/Weekly (6)**: `1d`, `5d`, `7d`, `1w`, `2w`, `4w`
   - **Monthly (6)**: `1mo`, `2mo`, `3mo`, `4mo`, `6mo`, `12mo`
   - *Resampling Requirement*: Base ticks or 1m OHLCV bars must be dynamically aggregated into higher timeframes via an in-memory/backend resampling pipeline (Open = first open, High = max high, Low = min low, Close = last close, Volume = sum volume).

2. **Technical Indicator Overlays**:
   - **SMA (Simple Moving Average)**: $SMA_n = \frac{1}{n} \sum_{i=0}^{n-1} P_{t-i}$ (Default periods: 20, 50, 200).
   - **EMA (Exponential Moving Average)**: $EMA_t = (P_t \times k) + (EMA_{t-1} \times (1-k))$ where $k = \frac{2}{n+1}$ (Default periods: 12, 26).
   - **Bollinger Bands**: Middle Band = $SMA(20)$, Upper Band = $SMA(20) + (2 \times \sigma)$, Lower Band = $SMA(20) - (2 \times \sigma)$ where $\sigma$ is standard deviation.

3. **Price Signals HUD (Heads-Up Display)**:
   - **RSI (Relative Strength Index)**: 14-period default. $RS = \frac{\text{Average Gain}}{\text{Average Loss}}$, $RSI = 100 - \frac{100}{1 + RS}$. HUD displays real-time value and Overbought (>70) / Oversold (<30) alerts.
   - **MACD (Moving Average Convergence Divergence)**: MACD Line = $EMA(12) - EMA(26)$, Signal Line = $EMA(9)$ of MACD Line, Histogram = $\text{MACD Line} - \text{Signal Line}$. HUD shows line values and Bullish/Bearish Crossover status.

4. **Trendline Drawing Tools**:
   - Interactive drawing canvas overlaying the price chart.
   - Drawing operations: create line segments, rays, edit endpoints, delete, toggle color/width.
   - Dual-tier persistence: immediate save to `localStorage` + async sync to Supabase `drawings` table.

5. **Synced Side-by-Side Split Screen View**:
   - Dual viewport (Panel A: Primary Ticker, Panel B: Comparative Ticker).
   - Synchronized horizontal time domain panning and zooming across both chart panels.
   - Independent vertical price scaling.

---

### R4. Automated Trade Execution Engine

1. **Alpaca Paper Trading API**:
   - REST API Base: `https://paper-api.alpaca.markets/v2`
   - Credentials: `APCA-API-KEY-ID`, `APCA-API-SECRET-KEY`
   - Key operations: Submit order, fetch positions, cancel order, fetch account equity.

2. **Fallback Mock Broker Engine**:
   - Activated automatically when Alpaca API keys are missing/empty or API calls fail.
   - Maintains simulated paper balance ($100,000 default cash).
   - Fills market orders instantly at latest tick price.
   - Tracks portfolio positions, unrealized/realized PnL, cash balance, and execution history.

3. **Real-Time WebSocket Tick Broadcasts**:
   - Node.js WebSocket server streaming live tick data (`symbol`, `price`, `volume`, `timestamp`) to connected React frontend.
   - Subscription channel routing (`subscribe` / `unsubscribe`).
   - Push updates for filled orders (`ORDER_FILLED`) to keep frontend portfolio and HUD synchronized in real time.

---

## 3. Codebase Audit & Gap Analysis

### 3.1 Audit Matrix

| Feature / Module | Current Codebase Status | Missing Dependencies / Components | Impact / Risk |
|---|---|---|---|
| **21-Timeframe Resampling** | Not implemented | `ResamplingEngine.js` module | High - Core UI capability |
| **Candlestick Chart Canvas** | Recharts only (basic line/bar charts) | `lightweight-charts` or Canvas rendering | High - Recharts unsuitable for 21 timeframe candlestick panning/zooming |
| **Indicator Overlays (SMA/EMA/BB)** | Not implemented | `IndicatorEngine.js` technical indicator math | Medium - Standard math calculations required |
| **Price Signals HUD (RSI/MACD)** | Not implemented | `PriceSignalsHUD.jsx` HUD component | Medium - Real-time calculation HUD |
| **Trendline Drawing Canvas** | Not implemented | `TrendlineOverlay.jsx`, Supabase `drawings` table | High - Persistence & canvas interaction needed |
| **Synced Split Screen** | Not implemented | `SplitChartView.jsx` with shared time range state | High - Panning/zooming event sync required |
| **Alpaca Paper Trading Integration** | Not implemented | `AlpacaBroker.js`, environment variables | High - Core execution engine requirement |
| **Fallback Mock Broker** | Not implemented | `MockBroker.js`, in-memory/Supabase state | High - Required for offline/unauthenticated execution |
| **WebSocket Tick Broadcasts** | Express HTTP only in `server/index.js` | `ws` package, `websocket.js` server handler | High - Real-time data streaming requirement |
| **Database Persistence (R1/R4)** | Basic schema in `fantasy-quant/database.sql` | Migration SQL for `drawings`, `paper_accounts`, `paper_orders`, `paper_positions` | High - Schema creation & RLS policies required |

---

## 4. Recommended Implementation Architecture

### 4.1 System Architecture Diagram

```
[ Frontend: React + Vite ]
   ├── ContangoChart / SplitChartView
   │     ├── Lightweight-Charts / Canvas Engine
   │     ├── ResamplingEngine (21 timeframes)
   │     ├── IndicatorEngine (SMA, EMA, Bollinger, RSI, MACD)
   │     └── TrendlineOverlay (Drawings Layer -> localStorage & Supabase)
   ├── PriceSignalsHUD (RSI/MACD Live Status)
   └── OrderExecutionPanel (Market / Limit Orders)
            │
            ▼ (HTTP REST & WS)
[ Backend: Node.js / Express Server ]
   ├── WebSocket Server (ws module) ────> Tick Broadcasts & Order Fills
   ├── API Routes (/api/trade, /api/chart)
   └── Execution Engine (BrokerAdapter)
         ├── AlpacaBroker (Alpaca Paper API v2) [if API keys set]
         └── MockBroker (Simulated Execution) [if API keys empty]
            │
            ▼
[ Database: Supabase / PostgreSQL ]
   ├── drawings (user_id, symbol, timeframe, vectors)
   ├── paper_accounts (user_id, cash_balance, equity)
   ├── paper_positions (user_id, symbol, qty, avg_price)
   └── paper_orders (user_id, symbol, side, qty, status, broker_type)
```

---

### 4.2 Module & Directory Structure Proposal

```
src/
├── components/
│   └── quant/
│       ├── ContangoChart.jsx          # Primary candlestick chart component
│       ├── SplitChartView.jsx         # Synced dual-panel chart view
│       ├── TrendlineOverlay.jsx       # Interactive SVG/Canvas drawing layer
│       ├── PriceSignalsHUD.jsx        # RSI and MACD visual HUD
│       └── OrderExecutionPanel.jsx    # Trade execution controls
├── engine/
│   ├── ResamplingEngine.js            # 21 period candle aggregator
│   ├── IndicatorEngine.js             # SMA, EMA, Bollinger, RSI, MACD math
│   └── DrawingStore.js                # Dual-tier storage manager for drawings
├── hooks/
│   ├── useQuantChart.js               # Chart state & indicators hook
│   ├── useTradeExecution.js           # Order placement & portfolio state hook
│   └── useWebSocketTicks.js           # Real-time tick & fill subscription hook
server/
├── routes/
│   ├── trading.js                     # REST endpoints for orders, account, positions
│   └── chart.js                       # Historical candles & drawings API
├── broker/
│   ├── BrokerAdapter.js               # Factory/Strategy for Alpaca vs Mock
│   ├── AlpacaBroker.js                # Alpaca Paper REST API wrapper
│   └── MockBroker.js                  # Fallback in-memory/DB paper broker
└── websocket.js                       # WS server for real-time tick streaming
```

---

### 4.3 Database Schema (Supabase SQL Migration)

```sql
-- 1. Drawings Persistence Table
CREATE TABLE IF NOT EXISTS public.drawings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    timeframe VARCHAR(10) NOT NULL,
    vector_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.drawings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own drawings" ON public.drawings
    FOR ALL USING (auth.uid() = user_id);

-- 2. Mock / Paper Trading Accounts
CREATE TABLE IF NOT EXISTS public.paper_accounts (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    cash_balance NUMERIC(15, 2) NOT NULL DEFAULT 100000.00,
    portfolio_value NUMERIC(15, 2) NOT NULL DEFAULT 100000.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.paper_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their paper account" ON public.paper_accounts
    FOR ALL USING (auth.uid() = user_id);

-- 3. Paper Positions Table
CREATE TABLE IF NOT EXISTS public.paper_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
    avg_entry_price NUMERIC(15, 4) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_symbol UNIQUE (user_id, symbol)
);

ALTER TABLE public.paper_positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their paper positions" ON public.paper_positions
    FOR ALL USING (auth.uid() = user_id);

-- 4. Paper Orders Table
CREATE TABLE IF NOT EXISTS public.paper_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    side VARCHAR(10) CHECK (side IN ('buy', 'sell')) NOT NULL,
    order_type VARCHAR(10) CHECK (order_type IN ('market', 'limit', 'stop')) NOT NULL,
    qty NUMERIC(15, 4) NOT NULL,
    limit_price NUMERIC(15, 4),
    status VARCHAR(20) CHECK (status IN ('submitted', 'pending', 'filled', 'canceled', 'rejected')) NOT NULL,
    broker_type VARCHAR(20) CHECK (broker_type IN ('alpaca', 'mock')) NOT NULL,
    filled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.paper_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their paper orders" ON public.paper_orders
    FOR ALL USING (auth.uid() = user_id);
```

---

## 5. Verification & Testing Strategy

1. **R1 Resampling & Indicators Verification**:
   - Unit tests for `ResamplingEngine` verifying 1m aggregation into all 21 target timeframes.
   - Unit tests for `IndicatorEngine` verifying mathematical correctness against known benchmark datasets for SMA, EMA, Bollinger Bands, RSI, and MACD.
2. **R1 Charting & Trendline Verification**:
   - Component test verifying trendline state serialization to `localStorage` and Supabase API stub.
   - Split-screen sync verification ensuring scrolling/zooming domain changes in Panel A synchronize Panel B domain within <16ms frame budget.
3. **R4 Trade Execution Engine Verification**:
   - Integration test verifying `BrokerAdapter` returns `AlpacaBroker` when `VITE_ALPACA_API_KEY` is present and `MockBroker` when empty.
   - Mock broker simulation test verifying paper account cash decrement, position increment, and order fill event emitted via WebSocket upon placing a market order.

---
