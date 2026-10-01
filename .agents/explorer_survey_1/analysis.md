# Contango Quant Workspace Survey Analysis

**Survey Date**: 2026-08-09  
**Explorer**: Explorer 1  
**Workspace**: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website`  

---

## 1. Executive Summary

The workspace at `/Users/ute/Dev/sentaient_conversion_hub_7382-Website` is a comprehensive quantitative trading platform codebase combining a React 18 / Vite 5 frontend, a high-performance Go order management & analytics engine (MIM), a Python FastAPI quantitative analysis & NLP engine (`lim_clone/backend_python`), a ClickHouse columnar database setup, and a Next.js / Supabase strategy marketplace stack (`fantasy-quant`).

Existing components directly map to the 5 core project requirements:
- **R1 (Dynamic Charting)**: Lightweight-charts setup in `lim_clone/frontend/src/App.jsx`, real-time ticks via WebSocket (`lim_clone/backend_go/ws.go`), technical indicators & options greeks (`lim_clone/backend_python/main.py`).
- **R2 (KYC & Financial Statement Analyzer)**: Data models & fincept analytics (`lim_clone/backend_python/fincept_analytics/`), user profile schema in `fantasy-quant/supabase/migrations/16_user_profiles.sql`.
- **R3 (Leaderboard & P2P Strategy Marketplace)**: Marketplace UI & mock checkout panels in `lim_clone/frontend/src/components/StrategyMarketplace.jsx`, marketplace schema in `fantasy-quant/supabase/migrations/20260721000017_creator_marketplace.sql`.
- **R4 (Automated Execution Engine)**: Alpaca Paper Trading API integration (`lim_clone/backend_go/alpaca.go`), simulated OMS (`lim_clone/backend_go/oms.go`), real-time WebSocket tick broadcast (`lim_clone/backend_go/ws.go`).
- **R5 (DB Persistence & Security Hardening)**: ClickHouse schema (`lim_clone/db/schema.sql`), Helmet security headers in root `package.json`, Supabase schema for user states & strategies.

---

## 2. Directory Structure & Key Submodules

| Directory / Path | Stack / Role | Key Files |
|------------------|--------------|-----------|
| `/` | Root App (React 18, Vite 5, Tailwind 3) | `package.json`, `vite.config.js`, `playwright.config.js`, `src/Routes.jsx` |
| `lim_clone/backend_go/` | Go 1.x MIM Analytics & Execution Engine | `main.go`, `alpaca.go`, `oms.go`, `ws.go`, `db.go`, `engine.go`, `go.mod` |
| `lim_clone/backend_python/` | Python FastAPI NLP Gateway & Greeks Engine | `main.py`, `quant_engine.py`, `ta_engine.py`, `test_analytics.py`, `requirements.txt` |
| `lim_clone/frontend/` | React 18 / Vite Trading Terminal | `src/App.jsx`, `src/components/StrategyMarketplace.jsx`, `src/components/PortfolioDashboard.jsx`, `src/components/AnalyticsPanel.jsx` |
| `lim_clone/db/` | ClickHouse Database Schemas | `schema.sql`, `docker-compose.yml` |
| `lim_clone/backend_python/fincept_analytics/` | Quant Analytics & Data Source Library | `quantstats_analysis.py`, `derivatives_pricing.py`, `compute_technicals.py`, `yfinance_data.py` |
| `fantasy-quant/` | Next.js 16 & Supabase Marketplace Subproject | `package.json`, `supabase/migrations/*.sql` |

---

## 3. Technology Stack & Dependencies

### Frontend Stack
- **Framework**: React 18.2.0, Vite 5.0.0
- **Routing**: React Router DOM 6.0.2
- **State & Data**: Redux Toolkit (`@reduxjs/toolkit` 2.6.1), Supabase client (`@supabase/supabase-js` 2.112.2)
- **Visualization**: Lightweight Charts (`lightweight-charts`), Recharts 2.15.2, Three.js 0.160.0 (`@react-three/fiber` 8.17.10)
- **Styling**: TailwindCSS 3.4.6, Framer Motion 10.16.4, Lucide React

### Backend Stack
- **Go Engine**: Go 1.x, Gorilla WebSocket 1.5.3, Alpaca Trade API SDK (`github.com/alpacahq/alpaca-trade-api-go/v3`), ClickHouse Driver (`github.com/ClickHouse/clickhouse-go/v2`)
- **Python Engine**: Python 3.10+, FastAPI 0.110+, Uvicorn, Pandas, NumPy, `py_vollib` (Black-Scholes greeks), `quantstats`, `empyrical`, ClickHouse Connect (`clickhouse-connect`)
- **Database**: ClickHouse Server (`clickhouse/clickhouse-server:latest` on port 8123/9000), Supabase PostgreSQL

---

## 4. Requirement Verification & Code Mapping

### R1. Dynamic Charting & Analytical Gateway
- **Existing Implementation**:
  - `lim_clone/frontend/src/App.jsx`: Configured lightweight-charts candlestick canvas with live WebSocket tick updates.
  - `lim_clone/frontend/src/components/AnalyticsPanel.jsx`: Displays Alpha, Beta, Sharpe, Sortino, R-squared, Volatility, SMA, EMA, RSI, Bollinger Bands.
  - `lim_clone/backend_python/main.py`: `/greeks` endpoint calculates Delta, Gamma, Theta, Vega, Rho.
- **Gaps / Action Items**:
  - Extend lightweight-charts period selector to explicitly support all 21 requested periods (Intraday: 1m..60m, Hourly: 1h..24h, Daily/Weekly: 1d..4w, Monthly: 1mo..12mo).
  - Add synced side-by-side split screen view with synchronized horizontal time scales.
  - Add trendline drawing tools overlay with local & store persistence.

### R2. KYC Profile & Financial Statement Analyzer
- **Existing Implementation**:
  - `fantasy-quant/supabase/migrations/16_user_profiles.sql`: Supabase user profile table definition.
  - `lim_clone/backend_python/fincept_analytics/financial_report_generator.py`: PDF/Financial statement analysis tools.
- **Gaps / Action Items**:
  - Onboarding wizard UI for qualitative & quantitative KYC questions.
  - File upload scanner module for parsed financial statement analytics, auto-generating portfolio allocation vector.

### R3. Leaderboard & P2P Strategy Marketplace
- **Existing Implementation**:
  - `lim_clone/frontend/src/components/StrategyMarketplace.jsx`: Fully functional marketplace UI with creator promotion tiers (Silver, Gold, Platinum VIP), strategy listing/purchasing, strategy canvas loading, and mock credit card checkout modal.
  - `fantasy-quant/supabase/migrations/20260721000017_creator_marketplace.sql`: SQL tables for creator strategy sales.
- **Gaps / Action Items**:
  - Social leaderboard UI sorting users by ROI calculated from trade records.
  - Connect marketplace purchases to real or mock backend checkout confirmation.

### R4. Automated Trade Execution Engine
- **Existing Implementation**:
  - `lim_clone/backend_go/alpaca.go`: Connects to Alpaca Paper Trading API (`https://paper-api.alpaca.markets`) with automatic fallback to mock asset quotes/data if API keys are missing.
  - `lim_clone/backend_go/oms.go`: `OrderManagementSystem` with `PaperTradingAccount` ($100,000 initial paper balance, network latency simulation of 250ms, 0.05% price slippage).
  - `lim_clone/backend_go/ws.go`: Live WebSocket streamer for real-time market ticks.
- **Gaps / Action Items**:
  - Verify live order execution pipeline for market/limit orders across symbols.

### R5. Database Persistence & Security Hardening
- **Existing Implementation**:
  - `lim_clone/db/schema.sql`: ClickHouse schema for `market_data_raw`, `market_data_overrides`, `market_data` view, `portfolio_stats_daily`, `options_chain_raw`.
  - `package.json`: Helmet 8.3.0 included for security headers.
- **Gaps / Action Items**:
  - Express/FastAPI rate limiting middleware.
  - Security headers configuration & query depth boundary checks.

---

## 5. Verification Commands & Results

| Target | Command | Result | Notes |
|--------|---------|--------|-------|
| Python Analytics Unit Tests | `python3 -m unittest test_analytics.py` (in `lim_clone/backend_python`) | **PASS** (2 tests in 0.282s) | Tests `test_analytics_empty_data` & `test_analytics_math_precision` |
| Go MIM Engine Build | `go build -o /tmp/lim_engine_test .` (in `lim_clone/backend_go`) | **PASS** (Exit Code 0) | Compiles cleanly into binary |
| Frontend Build | `npm run build` (in `lim_clone/frontend`) | **PASS** (Vite v5.4.21 built dist in 1m 15s) | Output: `dist/assets/index-DTgEcyov.js` |
| Playwright Test Suite | `npx playwright test` (in root) | Requires ES Module fix | 4 test files use `require()` syntax while package.json is `"type": "module"` |
