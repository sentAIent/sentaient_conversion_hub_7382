# Project: Contango Quant

## Architecture
Contango Quant is built as a hybrid Logical Information Machines (LIM) and TradingView-style quantitative & fundamental analysis platform:
- **Frontend Terminal**: React (Vite) single-page trading and analytics portal featuring Lightweight-Charts candlestick canvas, 21-period timeframe resampling, overlay HUD (SMA, EMA, Bollinger Bands, RSI, MACD), persistent trendline drawing tools, synced split-screen view with locked time scales, interactive KYC wizard, financial statement file scanner (PDF/CSV parser producing allocation vectors and investment thesis), social ROI leaderboard, P2P strategy marketplace with mock checkout modal, and order execution panel.
- **Go Execution Engine (`lim_clone/backend_go`)**: Order Management System (OMS) featuring Alpaca Paper Trading API v3 client with automatic fallback to simulated mock broker ($100k account, latency/slippage simulation), HTTP trading REST API, and WebSocket tick broadcasting.
- **Python Quant & NLP Analytics Engine (`lim_clone/backend_python`)**: FastAPI service computing Black-Scholes options greeks (Delta, Gamma, Theta, Vega, Rho), quantitative performance metrics (Sharpe, Sortino, Alpha, Beta, Max Drawdown), natural language query translation (`/ask`), and financial statement analysis.
- **Database & Security Layer**: PostgreSQL / Supabase schema (tables: `profiles`, `kyc_profiles`, `financial_statements`, `drawings`, `strategies`, `marketplace_subscriptions`, `portfolios`, `trades`) with Row Level Security (RLS) policies, Express security middleware (Helmet headers, rate limiting, query depth protection), and transaction-safe GDPR data purge/anonymization pipeline.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | 21-Timeframe Resampling & Canvas Charting | Interactive candlestick chart supporting 21 periods: Intraday (1m, 5m, 15m, 30m, 60m), Hourly (1h, 2h, 4h, 6h, 8h, 12h, 24h), Daily/Weekly (1d, 5d, 7d, 1w, 2w, 4w), and Monthly (1mo, 2mo, 3mo, 4mo, 6mo, 12mo). | M1 | R1 |
| 2 | Technical Indicators Overlay & HUD | Technical indicator overlays (SMA, EMA, Bollinger Bands) and price signals HUD (RSI, MACD). | M1 | R1 |
| 3 | Trendline Canvas & Drawing Persistence | Interactive trendline drawing canvas with persistent storage in localStorage and Supabase `drawings` store. | M1 | R1 |
| 4 | Synced Side-by-Side Split View | Comparative side-by-side split-screen view with locked panning/zooming visible horizontal time scales. | M1 | R1 |
| 5 | KYC Risk & Investor Profile Wizard | Onboarding wizard with qualitative and quantitative KYC questions regarding risk tolerance, investment timeline, and objectives, storing vector in Supabase. | M2 | R2 |
| 6 | Financial Statement Scanner & Allocation Generator | File upload scanner for parsed financial statement analytics, auto-generating a customized portfolio allocation model and investment thesis. | M2 | R2 |
| 7 | Social Leaderboard & ROI Engine | Social leaderboard sorting users by ROI calculated from paper/live trade records with risk-adjusted performance metrics. | M3 | R3 |
| 8 | Strategy Marketplace & Mock Checkout | Peer-to-peer strategy marketplace where high-ROI users list verified strategies for custom subscription fees with mock checkout panels. | M3 | R3 |
| 9 | Trade Execution Engine & Alpaca/Mock Broker | Backend order manager integrated with Alpaca Paper Trading API, fallback mock broker accounts for market/limit orders. | M4 | R4 |
| 10 | WebSocket Tick Streamer | Real-time WebSocket tick broadcasts and order fill notification stream. | M4 | R4 |
| 11 | Supabase PostgreSQL Persistence & RLS | PostgreSQL schema storing user profiles, KYC states, drawings, trades, strategies, and subscriptions with RLS policies. | M5 | R5 |
| 12 | Security Hardening & GDPR Purge Pipeline | Rate limiting, Helmet security headers, query depth boundaries, and GDPR data purge/anonymization pipeline. | M5 | R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Dynamic Charting & Analytical Gateway | 21 timeframes resampling, SMA/EMA/Bollinger overlays, RSI/MACD HUD, persistent trendline drawing, synced split-screen view | none | IN_PROGRESS |
| M2 | KYC Profile & Financial Statement Analyzer | KYC onboarding wizard, financial profile vectors, statement file upload scanner, portfolio allocation & thesis generator | M5 | PLANNED |
| M3 | Leaderboard & P2P Strategy Marketplace | ROI calculation engine, social leaderboard, strategy listings, custom subscription fees & mock checkout | M4, M5 | PLANNED |
| M4 | Automated Trade Execution Engine & Tick Streamer | Alpaca API integration, fallback mock broker, order routing & portfolio updates, WebSocket tick streamer | M5 | PLANNED |
| M5 | Database Persistence, Security & GDPR Compliance | PostgreSQL/Supabase 8-table schema + RLS, Helmet, rate limiting, query depth protection, GDPR purge transaction | none | IN_PROGRESS |
| M6 | Final E2E Test Suite Pass & Adversarial Hardening | Pass 100% of E2E test suite (Tiers 1-4) and Tier 5 Adversarial Coverage Hardening | M1, M2, M3, M4, M5 | PLANNED |

## Interface Contracts
### Frontend (React) ↔ Go Execution Engine (`lim_clone/backend_go`)
- `POST /api/trade`: Order request `{ symbol, qty, side, type }` -> `{ status, order_id, filled_price, filled_at }`
- `GET /api/account`: Account summary `{ cash, equity, buying_power, paper_mode }`
- `WS /ws/ticks`: Live ticks broadcasting `{ symbol, price, timestamp, volume }`

### Frontend (React) ↔ Python Analytics Engine (`lim_clone/backend_python`)
- `POST /api/parse-statement`: Multi-part PDF/CSV upload -> `{ ratios, financial_health_score, recommended_allocation, investment_thesis }`
- `POST /greeks`: Options contract params -> `{ delta, gamma, theta, vega, rho }`
- `POST /ask`: Quantitative natural language query -> `{ strategy_config, backtest_params }`

### Frontend / Express ↔ Supabase Database
- `drawings`: `{ id, user_id, symbol, timeframe, points, style, updated_at }`
- `kyc_profiles`: `{ id, user_id, profile_vector, risk_score, investment_horizon, allocation_model, updated_at }`
- `strategies`: `{ id, user_id, title, description, price_monthly, roi_pct, verified, created_at }`
- `trades`: `{ id, user_id, symbol, qty, side, price, realized_pnl, executed_at }`

## Code Layout
- Frontend Components:
  - `src/components/charting/`: `ContangoChart.jsx`, `SplitChartView.jsx`, `TrendlineOverlay.jsx`, `PriceSignalsHUD.jsx`, `ResamplingEngine.js`, `IndicatorEngine.js`
  - `src/components/kyc/`: `KycWizard.jsx`, `FinancialStatementScanner.jsx`, `PortfolioAllocationView.jsx`
  - `src/components/marketplace/`: `LeaderboardView.jsx`, `StrategyMarketplace.jsx`, `MockCheckoutModal.jsx`
  - `src/components/trading/`: `OrderExecutionPanel.jsx`, `PortfolioSummary.jsx`, `TickStreamWidget.jsx`
- Backend Modules:
  - `server/`: `server.js`, `security.js`, `gdpr.js` (Express middleware for rate limiting, Helmet, query depth, GDPR purge)
  - `lim_clone/backend_go/`: `main.go`, `alpaca.go`, `oms.go`, `ws.go`
  - `lim_clone/backend_python/`: `main.py`, `quant_engine.py`, `test_analytics.py`, `statement_parser.py`
- Database & Test Suites:
  - `db/`: `01_contango_quant_schema.sql` (Supabase DDL & RLS rules)
  - `tests/`: `e2e_contango_quant.spec.js` (Playwright E2E test suite Tiers 1-4)
