# Handoff Report: Contango Quant Baseline Survey (R1 & R4)

**From**: Explorer 2 (`explorer_survey_2`)  
**To**: Orchestrator (`parent`)  
**Date**: 2026-08-09  
**Working Directory**: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/explorer_survey_2`  

---

## 1. Observation

1. **Repository Structure**:
   - Project Root: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website`
   - Frontend: Vite + React 18, React Router DOM 6.0.2 (`src/Routes.jsx`), Tailwind CSS, Framer Motion (`package.json`, lines 48-84).
   - Database / Backend Clients: `@supabase/supabase-js` v2.112.2 (`src/config/supabase.js`), Firebase SDK v12.8.0 (`src/config/firebase.js`).
   - Server: Express 4 server located at `server/index.js`, running on port 3000, currently containing only Google Gemini AI endpoints (`/api/finance`, `/api/news`, `/api/music`, `/api/analyze-map`).

2. **Existing Charting & Indicators Code**:
   - `src/pages/IcebreakerAdmin.jsx` (line 11) imports basic `LineChart`, `XAxis`, `YAxis` from `recharts`.
   - `src/pages/free-ai-assessment-portal/components/AssessmentResults.jsx` (line 4) imports `BarChart`, `RadarChart` from `recharts`.
   - No candlestick charting engine exists.
   - No 21-timeframe resampling module exists.
   - No technical indicator calculation functions (SMA, EMA, Bollinger Bands, RSI, MACD) exist in `src/` or `server/`.
   - No trendline drawing tools or interactive canvas overlay components exist.
   - No split-screen synchronized chart components exist.

3. **Existing Trade Execution & WebSocket Code**:
   - Search for `alpaca` in `src/` yielded 0 results (`grep_search` query `alpaca`).
   - Search for `WebSocket` in `src/` yielded 0 results (`grep_search` query `WebSocket`).
   - Search for trade execution logic in `src/` yielded 1 marketing copy string in `src/pages/about-our-approach-intelligence-center/components/TeamExpertiseSection.jsx` (line 25: `"Developed quant trading platform to analyze market conditions algorithmically and place trades autonomously"`).
   - No Alpaca API client, no mock broker fallback engine, and no WebSocket server for tick streaming exist in `server/` or `src/`.

4. **Database Schemas**:
   - `fantasy-quant/database.sql` contains a basic `user_settings` table schema.
   - `firestore.rules` contains security rules for waitlists, Stripe customers, public gallery, and user audio libraries.
   - No tables for chart drawings (`drawings`), paper trading accounts (`paper_accounts`), paper positions (`paper_positions`), or paper orders (`paper_orders`) currently exist.

---

## 2. Logic Chain

1. **Observation 1 & 2** -> The repository is set up with Vite, React, Express, Supabase, and basic Recharts UI components, but lacks custom high-performance candlestick charting components. Recharts is suitable for basic static dashboard charts, but lacks native support for candlestick OHLC rendering, interactive trendline drawing canvas, domain-synchronized dual-viewports, or 21-timeframe OHLCV resampling.
2. **Observation 2 & Requirement R1** -> Implementing R1 requires creating a modular charting package (`ContangoChart.jsx`, `SplitChartView.jsx`) integrated with a standalone `ResamplingEngine.js` (capable of converting base tick/1m data into 21 timeframes), an `IndicatorEngine.js` (SMA, EMA, Bollinger Bands, RSI, MACD calculations), an interactive SVG/Canvas `TrendlineOverlay.jsx`, and a dual-tier storage sync manager targeting Supabase `drawings` table and `localStorage`.
3. **Observation 3 & Requirement R4** -> Implementing R4 requires establishing a `BrokerAdapter` backend strategy. When `VITE_ALPACA_API_KEY` / `ALPACA_API_KEY` is present, `AlpacaBroker` will handle orders via `https://paper-api.alpaca.markets/v2`. When key environment variables are empty or API calls fail, `MockBroker` will handle instant simulated market fills and track account balances. Real-time tick updates and order execution notifications require adding a Node.js WebSocket server (`ws` module) mounted on Express.
4. **Observation 4 & Requirements R1/R4** -> Database tables for `drawings`, `paper_accounts`, `paper_positions`, and `paper_orders` must be added via a Supabase SQL migration script with Row Level Security (RLS) policies.

---

## 3. Caveats

1. **Market Data Source**: Alpaca paper trading API provides market data for US equities. If crypto or non-US tickers are requested, a mock tick generator or secondary free market data feed (e.g. CoinGecko, Binance, or Yahoo Finance proxy) should be integrated into the WebSocket tick engine.
2. **Read-Only Scope**: This report is produced under a read-only investigation constraint. No source code files in `src/` or `server/` were modified during this phase.

---

## 4. Conclusion

The codebase is ready for the implementation of R1 and R4. The implementation plan should proceed as follows:
- **Phase 1**: Install `lightweight-charts` and `ws` dependencies. Add Supabase migration for `drawings`, `paper_accounts`, `paper_positions`, and `paper_orders`.
- **Phase 2 (R1)**: Implement `ResamplingEngine.js`, `IndicatorEngine.js`, `ContangoChart.jsx`, `TrendlineOverlay.jsx`, `PriceSignalsHUD.jsx`, and `SplitChartView.jsx`.
- **Phase 3 (R4)**: Implement `server/broker/BrokerAdapter.js`, `AlpacaBroker.js`, `MockBroker.js`, `server/routes/trading.js`, `server/websocket.js`, and frontend `OrderExecutionPanel.jsx`.

Full architectural design and schema definitions are detailed in `.agents/explorer_survey_2/analysis.md`.

---

## 5. Verification Method

1. **File Inspection**:
   - Inspect `.agents/explorer_survey_2/analysis.md` to review complete architecture, data structures, and SQL migration schemas.
   - View `package.json` to verify missing dependencies (`lightweight-charts`, `ws`).
2. **Verification Commands**:
   - `npm test` or `npx vitest` / `npx jest` (once tests are added for resampling engine, indicator math, and broker fallback logic).
   - Execute `node -e "console.log(require('./package.json').dependencies)"` to check package configuration.
3. **Invalidation Conditions**:
   - If Alpaca API key is provided but `AlpacaBroker` fails to initialize.
   - If `MockBroker` fails to execute market orders when Alpaca keys are missing.
   - If timeframe resampling fails to aggregate OHLCV bars correctly for any of the 21 periods.
