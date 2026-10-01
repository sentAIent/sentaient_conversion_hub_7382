# E2E Test Infra: Contango Quant

## Test Philosophy
- Opaque-box, requirement-driven E2E testing based on ORIGINAL_REQUEST.md and PROJECT.md requirements R1-R5.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing.

## Feature Inventory & Test Coverage Requirements

| Requirement ID | Feature Name | Description | Tier 1 Target | Tier 2 Target | Tier 3 Target | Tier 4 Target |
|----------------|--------------|-------------|:-------------:|:-------------:|:-------------:|:-------------:|
| R1 | Dynamic Charting & Analytical Gateway | 21 timeframe resampling, SMA/EMA/Bollinger overlays, RSI/MACD HUD, persistent trendline drawing, synced split-screen view | >=5 | >=5 | Pairwise | Scenario |
| R2 | KYC Profile & Financial Statement Analyzer | Onboarding wizard, financial profile vectors, statement file upload scanner, portfolio allocation & thesis generator | >=5 | >=5 | Pairwise | Scenario |
| R3 | Leaderboard & P2P Strategy Marketplace | ROI ranking leaderboard, strategy listings, subscription fees & mock checkout modal | >=5 | >=5 | Pairwise | Scenario |
| R4 | Automated Trade Execution Engine | Alpaca API integration, fallback mock broker, order routing & portfolio updates, WebSocket tick streamer | >=5 | >=5 | Pairwise | Scenario |
| R5 | Database Persistence & Security Hardening | PostgreSQL/Supabase 8-table schema + RLS, Helmet, rate limiting, query depth protection, GDPR purge transaction | >=5 | >=5 | Pairwise | Scenario |

## Test Architecture
- Framework: Playwright / Node Test Runner
- Test runner invocation: `npx playwright test` or `node --test` / `npm test`
- Environment: Headless browser automation targeting http://localhost:5173 (or Express server / API mocks)
- Directory layout: `tests/` at project root
- Verification channel: DOM assertions, API responses, localStorage state, mock network responses, WebSocket frame messages

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Requirements Exercised | Complexity |
|---|----------|------------------------|------------|
| 1 | New Trader Onboarding & Direct Order Execution | R2, R4, R5 | Medium |
| 2 | Fundamental Analysis, Statement Scanning & Portfolio Rebalance | R1, R2, R4 | High |
| 3 | Social Leaderboard Discovery, Strategy Subscription & Copy-Trading | R3, R4, R5 | High |
| 4 | Multi-Timeframe Charting, Technical Analysis & Split View Execution | R1, R4 | Medium |
| 5 | End-to-End Account Lifecycle & GDPR Compliance Data Anonymization | R2, R4, R5 | High |

## Coverage Thresholds
- Tier 1: ≥5 per feature (Total ≥25 test cases)
- Tier 2: ≥5 per feature (Total ≥25 boundary/corner test cases)
- Tier 3: Pairwise coverage of major feature interactions (Total ≥10 test cases)
- Tier 4: ≥5 realistic application scenarios (Total ≥5 test cases)
- Total E2E Test Count: ≥65 test cases
