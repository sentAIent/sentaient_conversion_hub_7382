# Original User Request

## Initial Request — 2026-08-10T00:21:55Z

Contango Quant: A hybrid Logical Information Machines and TradingView platform for quantitative and fundamental analysis, autonomous strategy execution, user KYC profiling, social leaderboards, and a peer-to-peer strategy marketplace.

Working directory: ~/teamwork_projects/contango_quant
Integrity mode: development

## Requirements

### R1. Dynamic Charting & Analytical Gateway
- Implement interactive candlestick charts supporting 21 periods: Intraday (1m, 5m, 15m, 30m, 60m), Hourly (1h, 2h, 4h, 6h, 8h, 12h, 24h), Daily/Weekly (1d, 5d, 7d, 1w, 2w, 4w), and Monthly (1mo, 2mo, 3mo, 4mo, 6mo, 12mo).
- Support technical indicator overlays (SMA, EMA, Bollinger Bands) and price signals HUD (RSI, MACD).
- Include trendline drawing tools and synced side-by-side split screen view with synchronized horizontal time scales.

### R2. KYC Profile & Financial Statement Analyzer
- Implement an onboarding wizard with qualitative and quantitative KYC questions regarding risk tolerance, investment timeline, and objectives.
- Provide a file upload scanner for parsed financial statement analytics, auto-generating a customized portfolio allocation model and investment thesis.

### R3. Leaderboard & P2P Strategy Marketplace
- Build a social leaderboard sorting users by ROI (calculated from paper/live trade records).
- Create a peer-to-peer marketplace where high-ROI users can list their verified strategies for custom subscription fees, utilizing mock checkout panels.

### R4. Automated Trade Execution Engine
- Implement a backend order manager integrated with Alpaca Paper Trading API, fallback mock broker accounts, and real-time WebSocket tick broadcasts.

### R5. Database Persistence & Security Hardening
- Store user profiles, KYC states, drawings, and trade entries in a secure Supabase/PostgreSQL schema.
- Implement rate limiting, Helmet security headers, and query depth boundaries.

## Acceptance Criteria

### Charting & UI
- [ ] Changing symbols or resolutions immediately fetches, resamples, and updates the canvas data.
- [ ] Trendlines drawn on the chart persist locally and save to the drawings store.
- [ ] Split-view toggles comparative tickers with locked panning/zooming visible ranges.

### Compliance & Onboarding
- [ ] KYC wizard stores complete financial profile vectors in Supabase.
- [ ] GDPR data purge deletes accounts and anonymizes trade logs.

### Strategy Execution
- [ ] Market orders filled via mock broker when Alpaca keys are empty, updating simulated portfolio balances.
