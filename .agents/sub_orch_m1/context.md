# Context & Environment Briefing: Milestone M1

## Workspace Info
- Workspace root: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website`
- Sub-Orchestrator working directory: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/sub_orch_m1`
- Parent conversation ID: `f7d895fe-56f2-4466-845f-24e28a11c118`

## Scope Summary
Milestone M1 includes:
- `ContangoChart.jsx`: Main Lightweight-Charts wrapper
- `ResamplingEngine.js`: OHLCV resampling engine supporting 21 timeframes (1m..60m, 1h..24h, 1d..4w, 1mo..12mo)
- `IndicatorEngine.js`: Calculations for SMA, EMA, Bollinger Bands, RSI, MACD
- `PriceSignalsHUD.jsx`: Overlay HUD component rendering RSI, MACD signals & alerts
- `TrendlineOverlay.jsx`: Drawing canvas supporting trendlines with persistent sync to localStorage and Supabase `drawings` store
- `SplitChartView.jsx`: Dual chart split view with locked horizontal time scales synchronized on scroll/pan/zoom

## Reference Documents
- `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/ORIGINAL_REQUEST.md`
- `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/PROJECT.md`
