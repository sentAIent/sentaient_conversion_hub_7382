# Plan — E2E Testing Track Orchestrator

## Objective
Build a comprehensive, requirement-driven, opaque-box Playwright E2E test suite for Contango Quant covering Tiers 1-4.

## Milestones & Decomposition

### Milestone TM1: Tier 1 Feature Coverage (R1 - R5)
- Target: >=5 tests per requirement feature (25+ tests total)
- R1 (Charting & Resampling): timeframe switching (21 periods), indicator overlays (SMA, EMA, Bollinger), HUD (RSI, MACD), trendline drawing persistence, split-view syncing.
- R2 (KYC & Financial Statement): questionnaire onboarding wizard, risk profile vector generation, statement PDF/CSV file scanner, portfolio allocation generator, investment thesis output.
- R3 (Leaderboard & Strategy Marketplace): ROI ranking leaderboard, strategy listing details, subscription purchase flow, mock checkout modal, user ROI calculation verification.
- R4 (Execution Engine & Broker): order entry (market/limit orders), mock broker fallback execution, account balance update, portfolio position update, WebSocket tick stream reception.
- R5 (Database & Security/GDPR): user profile persistence, drawings persistence, security header verification (Helmet/rate limiting), GDPR account purge, trade log anonymization.

### Milestone TM2: Tier 2 Boundary & Corner Cases (R1 - R5)
- Target: >=5 boundary/corner tests per requirement feature (25+ tests total)
- R1: Extreme resolution switching, fast zooming/panning, missing candle data handling, trendline drawing outside canvas bounds, invalid ticker symbols.
- R2: Empty KYC responses, extreme risk tolerance scores, corrupted/empty financial statement file upload, invalid CSV format handling, boundary investment horizon values.
- R3: Zero ROI / negative ROI sorting, unverified strategy subscription attempt, empty marketplace search, duplicate subscription prevention, extreme subscription pricing.
- R4: Zero/negative order quantity, invalid symbol submission, order execution with zero funds, rapid order submission under rate limits, WebSocket disconnect & reconnect resilience.
- R5: RLS access violation attempts (unauthenticated user access), invalid query depth payload rejection, rapid API spamming triggering rate limiting, partial GDPR purge safety check, SQL injection payload inputs.

### Milestone TM3: Tier 3 Cross-Feature Combinations (Pairwise R1 - R5)
- Target: Pairwise feature interaction tests (10+ tests total)
- Combinations:
  1. Charting + Execution (R1 x R4): Drawing trendlines while receiving live tick updates and placing market orders directly from chart view.
  2. KYC + Allocation + Execution (R2 x R4): Completing KYC wizard to generate allocation model, then executing automated rebalancing trades.
  3. Leaderboard + Marketplace + Execution (R3 x R4): Selecting top ROI strategy from leaderboard, subscribing via mock checkout, and auto-copying trades to order execution engine.
  4. Financial Statement Scanner + Database Persistence (R2 x R5): Uploading financial statement, saving generated thesis to Supabase, verifying RLS protection.
  5. Execution + GDPR Data Purge (R4 x R5): Executing live/paper trades, executing GDPR account purge request, verifying trade logs are anonymized while preserving aggregate stats.
  6. Split-Screen Charting + Market Order Stream (R1 x R4): Comparative split view on two tickers while active WebSocket ticks update prices on both panes simultaneously.
  7. KYC Vector + Strategy Marketplace Recommendation (R2 x R3): KYC risk score filtering strategy marketplace recommendations by risk profile matching.
  8. Security Boundaries + Order Manager API (R5 x R4): Exceeding rate limits during rapid order submissions, ensuring order manager gracefully rejects with HTTP 429.
  9. Drawings Persistence + Database Sync (R1 x R5): Saving complex multi-point trendline drawings, refreshing page, and verifying Supabase RLS allows authorized retrieval.
  10. P2P Strategy Listing + Portfolio Performance ROI (R3 x R4): Creating a strategy listing after executing winning trades, ensuring ROI auto-populates from trade records.

### Milestone TM4: Tier 4 Real-World Application Scenarios
- Target: Realistic end-to-end user workflows (5+ scenarios total)
- Scenario 1: New Quantitative Trader Onboarding & Strategy Execution Workflow
- Scenario 2: Fundamental Analyst Statement Scanning & Allocation Rebalancing Workflow
- Scenario 3: Social Trader Leaderboard Exploration, Strategy Subscription & Auto-Copy Workflow
- Scenario 4: Multi-Timeframe Technical Analysis & Synced Multi-Asset Execution Workflow
- Scenario 5: Full Account Lifecycle & GDPR Compliance Data Deletion Workflow
