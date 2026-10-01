# Execution Plan: Milestone M1 — Dynamic Charting & Analytical Gateway

## Objective
Deliver a production-ready, fully-tested frontend charting subsystem for Contango Quant supporting 21 timeframe resamplings, SMA/EMA/Bollinger overlay indicators, RSI/MACD signals HUD, persistent trendline drawing overlay (localStorage & Supabase sync), and synchronized split-screen view with locked time scales.

## Iteration 1 Execution Sequence
1. **Exploration Phase**:
   - Spawn `explorer_1`: Focus on `ResamplingEngine.js` (21 periods resampling from base OHLCV candles: 1m, 5m, 15m, 30m, 60m, 1h, 2h, 4h, 6h, 8h, 12h, 24h, 1d, 5d, 7d, 1w, 2w, 4w, 1mo, 2mo, 3mo, 4mo, 6mo, 12mo) and Lightweight-Charts integration pattern.
   - Spawn `explorer_2`: Focus on `IndicatorEngine.js` (SMA, EMA, Bollinger Bands, RSI, MACD formulas, precision, edge cases) and `PriceSignalsHUD.jsx`.
   - Spawn `explorer_3`: Focus on `TrendlineOverlay.jsx` canvas/drawing state, localStorage/Supabase sync, and `SplitChartView.jsx` sync mechanism (locking visible range time scale across split panels).

2. **Implementation Phase**:
   - Synthesize exploration findings into `m1_spec.md`.
   - Spawn `worker_1` (`teamwork_preview_worker`) armed with `m1_spec.md` and domain skill instructions to implement `ResamplingEngine.js`, `IndicatorEngine.js`, `PriceSignalsHUD.jsx`, `TrendlineOverlay.jsx`, `SplitChartView.jsx`, `ContangoChart.jsx` and unit/integration tests, executing build and test commands.

3. **Verification & Audit Phase**:
   - Spawn `reviewer_1` & `reviewer_2` (`teamwork_preview_reviewer`) to evaluate correctness, code quality, and performance.
   - Spawn `challenger_1` & `challenger_2` (`teamwork_preview_challenger`) to stress-test 21-period resampling math accuracy and split-view scale locking synchronization under pan/zoom.
   - Spawn `auditor_1` (`teamwork_preview_auditor`) for binary forensic integrity verification.

4. **Gate Evaluation & Finalization**:
   - Record verdicts in `GATE_STATUS.md`.
   - Update `PROJECT.md` M1 status to DONE.
   - Write `handoff.md`.
