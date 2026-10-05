# Scope: Milestone M1 — Dynamic Charting & Analytical Gateway

## Architecture
React (Vite) frontend charting workspace containing Lightweight-Charts integration, 21-period timeframe resampling engine, SMA/EMA/Bollinger Bands indicator calculations, RSI/MACD signals HUD, persistent trendline drawing overlay with localStorage & Supabase fallback sync, and synchronized dual split-screen view.

## Feature Inventory (Milestone M1 Scope)
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | 21-Timeframe Resampling & Canvas Charting | Interactive candlestick chart supporting 21 periods: Intraday (1m, 5m, 15m, 30m, 60m), Hourly (1h, 2h, 4h, 6h, 8h, 12h, 24h), Daily/Weekly (1d, 5d, 7d, 1w, 2w, 4w), and Monthly (1mo, 2mo, 3mo, 4mo, 6mo, 12mo). | M1 | R1 |
| 2 | Technical Indicators Overlay & HUD | Technical indicator overlays (SMA, EMA, Bollinger Bands) and price signals HUD (RSI, MACD). | M1 | R1 |
| 3 | Trendline Canvas & Drawing Persistence | Interactive trendline drawing canvas with persistent storage in localStorage and Supabase `drawings` store. | M1 | R1 |
| 4 | Synced Side-by-Side Split View | Comparative side-by-side split-screen view with locked panning/zooming visible horizontal time scales. | M1 | R1 |

## Code Layout (M1 Scope)
- `src/components/charting/ContangoChart.jsx`
- `src/components/charting/SplitChartView.jsx`
- `src/components/charting/TrendlineOverlay.jsx`
- `src/components/charting/PriceSignalsHUD.jsx`
- `src/components/charting/ResamplingEngine.js`
- `src/components/charting/IndicatorEngine.js`

## Status
Status: IN_PROGRESS
