# Contango Quant — Technical Specification Report: R2, R3, R5

**Author:** Spec Miner 3 (Teamwork Specification Mining Specialist)  
**Date:** 2026-08-09  
**Working Directory:** `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/spec_miner_survey_3`  
**Target Scope:** Requirements R2 (KYC Profile & Financial Statement Analyzer), R3 (Leaderboard & P2P Strategy Marketplace), R5 (Database Persistence & Security Hardening)

---

## Executive Summary

Contango Quant requires a robust, secure, and compliance-ready quantitative trading architecture. This document presents the exhaustive specification and architectural blueprint for:
1. **R2**: Qualitative & Quantitative KYC Onboarding Wizard, Financial Profile Vector Generation, Statement Parser Engine, Portfolio Allocation Engine, and Automated Investment Thesis Generator.
2. **R3**: Social ROI Leaderboard, Quant Performance Risk Metrics Engine (Sharpe, Sortino, Max Drawdown), P2P Strategy Listing Catalog, and Mock Checkout/Subscription Panel.
3. **R5**: Complete Supabase / PostgreSQL Relational Database Schema (DDL), Row Level Security (RLS) Policies, Express Security Middlewares (Rate Limiting, Helmet Headers, Query Depth Boundaries), and GDPR Data Purge / Trade Anonymization Pipeline.

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | R2 Onboarding | KYC Qualitative Risk Questionnaire | Multi-step wizard collecting risk tolerance, drawdown limits, investment horizon, liquidity needs, and financial objectives. | User questionnaire inputs (`risk_scale`: 1-100, `max_drawdown`: %, `horizon_years`, `liquidity`: low/med/high, `objective`). | Structured KYC response record. | 400 Bad Request on missing required fields or invalid numeric ranges. | ORIGINAL_REQUEST.md § R2 |
| 2 | R2 Onboarding | Quantitative Financial Profile Vector Generator | Mathematical engine converting user KYC answers into a 5D numerical vector `[risk_score, horizon_years, liquidity_ratio, return_target_pct, experience_level_id]`. | KYC questionnaire record. | 5D float array `profile_vector` stored in `kyc_profiles.profile_vector`. | Falls back to median conservative vector `[50.0, 5.0, 0.4, 0.08, 2.0]` on parsing error. | ORIGINAL_REQUEST.md § Acceptance Criteria |
| 3 | R2 Analyzer | Financial Statement File Scanner & Parser | Server-side / client-side parser extracting balance sheet, income statement, and cash flow metrics from uploaded files (CSV, JSON, PDF). | File upload stream (CSV/JSON/PDF, max 10MB). | Extracted metrics JSON (Revenue, Net Income, Total Assets, Liabilities, Equity, OCF, FCF, Debt/Equity, Quick Ratio, ROE, P/E). | Rejects invalid file types or unparseable formats with `INVALID_STATEMENT_FORMAT` (422). | ORIGINAL_REQUEST.md § R2 |
| 4 | R2 Analyzer | Financial Statement Anomaly Detector | Automated audit checking balance sheet identity `Assets = Liabilities + Equity` and flags accounting discrepancies. | Parsed financial metrics object. | `anomaly_flags` array (e.g. `[{ type: "IMBALANCE", delta: 1500.00 }]`). | Generates warning flags in response while allowing processing. | Probed spec enhancement |
| 5 | R2 Analyzer | Customized Portfolio Allocation Generator | Algorithm combining KYC profile vector and parsed statement analytics to output optimal asset class and strategy allocations. | `profile_vector` + parsed metrics. | Allocation JSON (`asset_classes`: {equities: %, fixed_income: %, crypto: %, cash: %}, `strategy_mix`: {momentum: %, value: %, mean_reversion: %}). | Default 60/40 Equity/Bond fallback on incomplete inputs. | ORIGINAL_REQUEST.md § R2 |
| 6 | R2 Analyzer | Automated Investment Thesis Generator | Synthesis engine drafting structured Markdown/HTML investment reports with financial health rating, bull/bear scenarios, and rebalancing rules. | Parsed statement metrics + KYC vector + symbol. | Formatted Markdown thesis document with executive summary, ratio analysis, and target weighting. | Returns baseline quantitative metrics summary if narrative generation fails. | ORIGINAL_REQUEST.md § R2 |
| 7 | R3 Leaderboard | Social ROI Leaderboard | Dynamic ranking engine sorting traders based on ROI % derived from paper and live trade execution logs. | Filter params (`timeframe`: 24h/7d/30d/1y/all, `mode`: paper/live/all, `limit`, `offset`). | Array of leaderboard user objects (`rank`, `user_id`, `display_name`, `avatar_url`, `roi_pct`, `sharpe_ratio`, `max_drawdown_pct`, `verification_status`). | Returns empty list (200 OK) if no trades match filter. | ORIGINAL_REQUEST.md § R3 |
| 8 | R3 Leaderboard | Quantitative Risk Metrics Engine | Calculates institutional risk metrics (Sharpe Ratio, Sortino Ratio, Max Drawdown %, Win Rate %, Profit Factor) for each trader. | Array of historical trade execution records and portfolio equity curve time series. | Calculated numerical risk metrics. | Sets metrics to `null` / `0.0` if trade history has < 5 closed trades. | Probed spec enhancement |
| 9 | R3 Marketplace | P2P Strategy Listing Catalog | Catalog system enabling high-ROI verified traders to list quantitative strategies with custom subscription pricing. | Strategy submission form (`title`, `description`, `asset_universe`, `monthly_fee_usd`, `parameters_json`). | Published strategy record in `strategies` table with assigned `strategy_id`. | Rejects submission (403 Forbidden) if author ROI < minimum requirement or unverified. | ORIGINAL_REQUEST.md § R3 |
| 10 | R3 Marketplace | Strategy Detail & Verification View | Deep view showing historical strategy performance, backtest equity curve, signal frequency, subscriber stats, and user reviews. | `strategy_id`. | Detailed strategy profile object. | Returns 404 Not Found if strategy is unlisted or missing. | ORIGINAL_REQUEST.md § R3 |
| 11 | R3 Marketplace | Mock Checkout & Subscription Panel | Payment modal processing strategy subscriptions via mock payment gateway or Stripe test mode. | Checkout payload (`strategy_id`, `payment_method_token`, `billing_tier`). | Active subscription object (`subscription_id`, `expires_at`, `status: 'active'`). | Returns 402 Payment Required on card decline or invalid payment method. | ORIGINAL_REQUEST.md § R3 |
| 12 | R5 Database | Supabase / PostgreSQL Schema DDL | Relational database schema persisting profiles, KYC vectors, statements, drawings, strategies, subscriptions, portfolios, trades. | SQL DDL scripts. | Initialized PostgreSQL database structure with primary/foreign keys, indexes, and check constraints. | Rollback transaction on migration script error. | ORIGINAL_REQUEST.md § R5 |
| 13 | R5 Database | Row Level Security (RLS) Policies | Supabase RLS security policies restricting data access per user `auth.uid()`. | RLS SQL policy definitions. | Enforced database-level authorization policies for SELECT, INSERT, UPDATE, DELETE. | Supabase API returns 403 Forbidden or empty dataset on unauthorized query. | ORIGINAL_REQUEST.md § R5 |
| 14 | R5 Hardening | Express Rate Limiting Middleware | Multi-tiered rate limiting middleware guarding auth, upload, execution, and public API endpoints. | HTTP requests per client IP / JWT. | HTTP 200 pass-through or HTTP 429 Too Many Requests with `Retry-After` header. | Blocks client IP for configured window duration when rate limit exceeded. | ORIGINAL_REQUEST.md § R5 |
| 15 | R5 Hardening | Helmet Security Headers Middleware | Header security middleware enforcing CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy. | Express app response cycle. | Hardened HTTP response headers on all API endpoints. | Browsers reject unsafe scripts or frame embeds violating security headers. | ORIGINAL_REQUEST.md § R5 |
| 16 | R5 Hardening | Query Depth Boundary Enforcer | Query parser restricting nested relationship depth (max 3 levels) and capping pagination limits (max 100 records). | Query parameters (`select`, `expand`, `limit`, `offset`). | Validated and boundary-capped query parameter object. | Rejects queries exceeding depth limit with 400 Bad Request. | ORIGINAL_REQUEST.md § R5 |
| 17 | R5 Compliance | GDPR Data Purge & Trade Anonymizer API | Compliance endpoint `/api/user/purge` deleting user PII, profiles, KYC data, drawings, while anonymizing trade logs. | Purge request (`DELETE /api/user/purge`, Bearer JWT). | Purge response JSON (`{ success: true, purged_tables: [...], anonymized_trades: N }`). | Aborts and rolls back entire transaction if any purge step fails (500). | ORIGINAL_REQUEST.md § Acceptance Criteria |

---

## Edge Cases

| # | Feature | Input | Observed / Expected Behavior |
|---|---------|-------|-------------------|
| 1 | R2 KYC Profile | User submits extreme values (e.g. Risk = 100, Max Drawdown = 100%, Investment Horizon = 0 years) | Input validator enforces horizon minimum of 0.25 years, flags speculative profile, and prompts mandatory high-risk warning modal. |
| 2 | R2 KYC Vector | Optional quantitative fields missing during wizard submission | System imputes missing fields with conservative median values (`risk_score: 50`, `liquidity: 0.4`) prior to vector encoding. |
| 3 | R2 File Parser | User uploads non-financial PDF, corrupted CSV, or image file | Parser fails validation with `INVALID_STATEMENT_FORMAT` (422), returns clear error detailing invalid headers or missing fields. |
| 4 | R2 File Parser | Balance sheet assets do not equal liabilities plus equity (`Assets != Liabilities + Equity`) | System flags anomaly warning `BALANCE_SHEET_IMBALANCE` with delta in response JSON, allowing analysis to proceed with explicit warning. |
| 5 | R2 Portfolio Generator | Uploaded financial statement shows negative net income and negative equity (distressed company) | Allocation engine shifts strategy mix to 100% Defensive Cash/Hedge and generates a Bearish Financial Distress thesis. |
| 6 | R3 Leaderboard | User executes 1 trade with 1000% ROI on $1 initial paper balance | Leaderboard ranking engine filters out accounts with < 5 closed trades or < $100 initial capital to prevent gaming rankings. |
| 7 | R3 Leaderboard | Ranked trader toggles privacy setting from Public to Private | Leaderboard cache worker immediately removes user from public view and shifts subsequent ranks up by 1. |
| 8 | R3 Marketplace | Verified strategy author's ROI drops below 0% or account is suspended | Strategy status automatically updates to `delisted`, preventing new purchases while preserving access for existing active subscribers until expiration. |
| 9 | R3 Checkout | Author attempts to purchase subscription to their own strategy | Checkout validator rejects transaction with 400 Bad Request ("Authors cannot purchase subscriptions to their own strategies"). |
| 10 | R3 Checkout | Payment attempt with invalid card number or expired card in mock checkout | Returns 402 Payment Required with error code `CARD_DECLINED` and rolls back subscription creation. |
| 11 | R5 Supabase RLS | User A executes direct REST query requesting User B's KYC profile vector | PostgreSQL RLS policy filters query by `auth.uid() = user_id`, returning 0 rows or HTTP 403 Forbidden. |
| 12 | R5 Rate Limiting | Client sends 50 statement upload requests in 1 minute to `/api/kyc/parse-statement` | Express rate limiter trips after 10 requests, returning HTTP 429 Too Many Requests with `Retry-After: 3600`. |
| 13 | R5 Query Depth | API request passes `?select=*,portfolios(*,trades(*,strategies(*,author(*))))` | Query depth boundary parser detects depth of 4 (> max limit 3) and rejects request with HTTP 400 Bad Request. |
| 14 | R5 GDPR Purge | GDPR purge requested for user who has published marketplace strategies with active subscribers | System anonymizes author identity (`author_id = NULL`, `display_name = "Deactivated Author"`), deletes personal profile/KYC/drawings, and maintains anonymized strategy listing for active subscribers. |
| 15 | R5 GDPR Purge | Historical trade execution records purged under GDPR | Trade log `user_id` is updated to `NULL`; execution timestamp, symbol, price, and volume are preserved for aggregate market statistics. |

---

## Data Models & Schema Design (Supabase / PostgreSQL DDL)

Below is the complete production SQL DDL schema for Contango Quant, including PostgreSQL extensions, tables, check constraints, foreign keys, indexes, and Row Level Security (RLS) policies.

```sql
-- Enable Required PostgreSQL Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. KYC PROFILES TABLE (Financial Profile Vector Storage)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.kyc_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    risk_tolerance_score INT NOT NULL CHECK (risk_tolerance_score BETWEEN 1 AND 100),
    max_drawdown_pct NUMERIC(5,2) NOT NULL CHECK (max_drawdown_pct BETWEEN 0.00 AND 100.00),
    investment_horizon_years NUMERIC(4,2) NOT NULL CHECK (investment_horizon_years > 0),
    liquidity_importance TEXT NOT NULL CHECK (liquidity_importance IN ('low', 'medium', 'high')),
    primary_objective TEXT NOT NULL CHECK (primary_objective IN ('capital_preservation', 'income', 'balanced_growth', 'aggressive_growth', 'quant_arbitrage')),
    experience_level TEXT NOT NULL CHECK (experience_level IN ('novice', 'intermediate', 'advanced', 'expert')),
    annual_income_usd NUMERIC(12,2),
    liquid_net_worth_usd NUMERIC(12,2),
    profile_vector JSONB NOT NULL, -- Format: [risk_score, horizon_years, liquidity_ratio, return_target_pct, experience_level_id]
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_kyc UNIQUE (user_id)
);

-- ============================================================================
-- 3. FINANCIAL STATEMENTS TABLE (Parsed Statement & Thesis Engine Storage)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.financial_statements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    company_name TEXT,
    period_type TEXT NOT NULL CHECK (period_type IN ('annual', 'quarterly')),
    fiscal_year INT NOT NULL,
    fiscal_period TEXT, -- 'Q1', 'Q2', 'Q3', 'FY'
    source_filename TEXT,
    parsed_metrics JSONB NOT NULL, -- { revenue, net_income, total_assets, total_liabilities, equity, ocf, fcf, debt_to_equity, roe, pe_ratio }
    anomaly_flags JSONB DEFAULT '[]'::jsonb,
    generated_allocation JSONB NOT NULL, -- { asset_classes: {...}, strategy_mix: {...} }
    investment_thesis TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. DRAWINGS TABLE (Chart Trendlines & Annotations)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.drawings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    period TEXT NOT NULL, -- e.g., '1d', '1h', '15m'
    drawing_type TEXT NOT NULL CHECK (drawing_type IN ('trendline', 'horizontal_line', 'rectangle', 'fibonacci', 'text_note')),
    points JSONB NOT NULL, -- [{ time: 1700000000, price: 150.25 }, { time: 1700086400, price: 155.50 }]
    style_options JSONB DEFAULT '{"color": "#3b82f6", "width": 2, "lineStyle": "solid"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. STRATEGIES TABLE (P2P Marketplace Strategy Catalog)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.strategies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Nullable for GDPR anonymization
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    asset_universe JSONB NOT NULL, -- ["AAPL", "NVDA", "BTC/USD"]
    monthly_fee_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (monthly_fee_usd >= 0),
    is_verified BOOLEAN DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'delisted')),
    parameters JSONB DEFAULT '{}'::jsonb,
    total_subscribers INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. MARKETPLACE SUBSCRIPTIONS TABLE (User Subscriptions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.marketplace_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    strategy_id UUID NOT NULL REFERENCES public.strategies(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
    amount_paid_usd NUMERIC(10,2) NOT NULL,
    payment_method TEXT DEFAULT 'mock_stripe',
    transaction_ref TEXT UNIQUE,
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 7. PORTFOLIOS & TRADES TABLES (Execution & ROI Metrics Source)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    account_type TEXT NOT NULL CHECK (account_type IN ('paper', 'live')),
    initial_balance NUMERIC(14,2) NOT NULL DEFAULT 100000.00,
    current_balance NUMERIC(14,2) NOT NULL DEFAULT 100000.00,
    equity NUMERIC(14,2) NOT NULL DEFAULT 100000.00,
    realized_pnl NUMERIC(14,2) DEFAULT 0.00,
    unrealized_pnl NUMERIC(14,2) DEFAULT 0.00,
    roi_pct NUMERIC(8,4) DEFAULT 0.0000,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.trades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Nullable for GDPR anonymization
    symbol TEXT NOT NULL,
    side TEXT NOT NULL CHECK (side IN ('buy', 'sell')),
    qty NUMERIC(14,4) NOT NULL,
    price NUMERIC(14,4) NOT NULL,
    realized_pnl NUMERIC(14,2) DEFAULT 0.00,
    execution_source TEXT NOT NULL CHECK (execution_source IN ('alpaca', 'mock')),
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. LEADERBOARD CACHE TABLE (Optimized Leaderboard View Table)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.leaderboard_cache (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    account_type TEXT NOT NULL,
    roi_pct NUMERIC(8,4) NOT NULL,
    sharpe_ratio NUMERIC(6,4),
    sortino_ratio NUMERIC(6,4),
    max_drawdown_pct NUMERIC(5,2),
    win_rate_pct NUMERIC(5,2),
    total_trades INT NOT NULL,
    rank INT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_kyc_user_id ON public.kyc_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_statements_user_symbol ON public.financial_statements(user_id, symbol);
CREATE INDEX IF NOT EXISTS idx_drawings_user_symbol_period ON public.drawings(user_id, symbol, period);
CREATE INDEX IF NOT EXISTS idx_strategies_status_fee ON public.strategies(status, monthly_fee_usd);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status ON public.marketplace_subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_trades_portfolio_user ON public.trades(portfolio_id, user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_roi ON public.leaderboard_cache(roi_pct DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drawings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_cache ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "profiles_select_public" ON public.profiles FOR SELECT USING (is_public = TRUE OR auth.uid() = id);
CREATE POLICY "profiles_write_own" ON public.profiles FOR ALL USING (auth.uid() = id);

-- KYC Profiles Policies
CREATE POLICY "kyc_select_own" ON public.kyc_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "kyc_insert_own" ON public.kyc_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "kyc_update_own" ON public.kyc_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "kyc_delete_own" ON public.kyc_profiles FOR DELETE USING (auth.uid() = user_id);

-- Financial Statements Policies
CREATE POLICY "statements_all_own" ON public.financial_statements FOR ALL USING (auth.uid() = user_id);

-- Drawings Policies
CREATE POLICY "drawings_all_own" ON public.drawings FOR ALL USING (auth.uid() = user_id);

-- Strategies Policies
CREATE POLICY "strategies_select_published" ON public.strategies FOR SELECT USING (status = 'published' OR auth.uid() = author_id);
CREATE POLICY "strategies_write_author" ON public.strategies FOR ALL USING (auth.uid() = author_id);

-- Marketplace Subscriptions Policies
CREATE POLICY "subs_select_own" ON public.marketplace_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "subs_insert_own" ON public.marketplace_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Portfolios & Trades Policies
CREATE POLICY "portfolios_own_all" ON public.portfolios FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "trades_own_all" ON public.trades FOR ALL USING (auth.uid() = user_id);

-- Leaderboard Cache Policies
CREATE POLICY "leaderboard_select_public" ON public.leaderboard_cache FOR SELECT USING (TRUE);
```

---

## Detailed Specifications

### R2 Specification: KYC Profile & Financial Statement Analyzer

#### 1. KYC Questionnaire & Profile Vector Math
The KYC Onboarding Wizard collects qualitative and quantitative responses across 5 core dimensions:
1. **Risk Appetite** ($R \in [1, 100]$): Derived from self-assessed risk tolerance score (1-10) and maximum drawdown acceptance ($D_{\text{max}} \in [0.0, 1.0]$).
   $$R = 0.5 \times (\text{risk\_scale} \times 10) + 0.5 \times (100 - D_{\text{max}} \times 100)$$
2. **Investment Horizon** ($H \in [0.25, 30.0]$): Stored directly in years.
3. **Liquidity Importance Ratio** ($L \in [0.0, 1.0]$):
   - `high`: $L = 0.8$
   - `medium`: $L = 0.4$
   - `low`: $L = 0.1$
4. **Target Annual Return** ($T \in [0.02, 0.50]$):
   - `capital_preservation`: $T = 0.04$
   - `income`: $T = 0.07$
   - `balanced_growth`: $T = 0.10$
   - `aggressive_growth`: $T = 0.18$
   - `quant_arbitrage`: $T = 0.25$
5. **Trading Experience Level ID** ($E \in [1, 4]$):
   - `novice`: $E = 1.0$
   - `intermediate`: $E = 2.0$
   - `advanced`: $E = 3.0$
   - `expert`: $E = 4.0$

**Financial Profile Vector Definition:**
$$V_{\text{profile}} = [R, H, L, T, E]$$
Stored as a JSON array in `kyc_profiles.profile_vector`.

#### 2. Financial Statement File Scanner & Parser Specification
The File Upload Scanner receives multipart form submissions (`POST /api/kyc/parse-statement`):
- **Accepted MIME Types**: `text/csv`, `application/json`, `application/pdf`, `application/vnd.ms-excel`.
- **Max File Size**: 10MB.
- **Parsing Rules**:
  - **JSON**: Validates presence of `incomeStatement`, `balanceSheet`, `cashFlow` sub-objects.
  - **CSV**: Matches column patterns for standard accounting keys (e.g. `Revenue`, `Net Income`, `Total Assets`, `Total Liabilities`, `Stockholders Equity`, `Operating Cash Flow`).
  - **PDF**: Uses text extraction regex matching accounting key phrases.
- **Calculated Ratios**:
  - Debt-to-Equity ($D/E$) = $\frac{\text{Total Liabilities}}{\text{Total Stockholders Equity}}$
  - Quick Ratio = $\frac{\text{Current Assets} - \text{Inventory}}{\text{Current Liabilities}}$
  - Return on Equity (ROE) = $\frac{\text{Net Income}}{\text{Total Stockholders Equity}}$
  - Free Cash Flow (FCF) = $\text{Operating Cash Flow} - \text{Capital Expenditures}$
- **Balance Sheet Anomaly Check**:
  $$\Delta_{\text{imbalance}} = |\text{Total Assets} - (\text{Total Liabilities} + \text{Equity})|$$
  If $\Delta_{\text{imbalance}} \ge \$1.00$, append anomaly flag `{"type": "BALANCE_SHEET_IMBALANCE", "delta": delta}`.

#### 3. Portfolio Allocation Engine & Investment Thesis Generator
- **Allocation Rules**:
  - `Equities %` = $\min(85, \max(10, R \times 0.75 + H \times 1.5 - L \times 20))$
  - `Fixed Income %` = $\min(70, \max(5, (100 - R) \times 0.6 + (10 - H) \times 2))$
  - `Cash %` = $\max(5, L \times 30)$
  - `Crypto / Alts %` = $\text{if } R > 70 \text{ and } E \ge 2 \text{ then } \min(15, (R - 70) \times 0.5) \text{ else } 0$
  - Normalize allocations so sum equals 100%.
- **Strategy Mix Rules**:
  - `Momentum Quant %` = $R \times 0.5$
  - `Value Fundamental %` = $(100 - R) \times 0.4 + ROE \times 100$
  - `Mean Reversion %` = $100 - (\text{Momentum} + \text{Value})$
- **Thesis Generator Output**: Markdown text formatted into sections:
  1. Executive Summary
  2. Financial Health Scorecard (Rating: A+ to F based on $D/E$, ROE, FCF)
  3. Risk-Weighted Target Allocation Model
  4. Bull & Bear Scenario Analysis
  5. Tactical Rebalancing Rules

---

### R3 Specification: Leaderboard & P2P Strategy Marketplace

#### 1. Leaderboard Ranking & Quantitative Performance Metrics
The leaderboard ranks active paper and live trader portfolios based on ROI %.
- **ROI Formula**:
  $$\text{ROI} = \frac{V_{\text{current}} - V_{\text{initial}}}{V_{\text{initial}}} \times 100$$
- **Sharpe Ratio Formula**:
  $$\text{Sharpe} = \frac{R_p - R_f}{\sigma_p}$$
  where $R_f = 4.0\% / 252$ daily risk-free return, $R_p$ is mean daily return, $\sigma_p$ is standard deviation of daily returns.
- **Sortino Ratio Formula**:
  $$\text{Sortino} = \frac{R_p - R_f}{\sigma_d}$$
  where $\sigma_d$ is downside standard deviation (calculated over negative daily return periods only).
- **Max Drawdown % Formula**:
  $$\text{Max Drawdown} = \max_{t \in [0, T]} \left( \frac{\max_{\tau \le t} V_\tau - V_t}{\max_{\tau \le t} V_\tau} \right) \times 100$$
- **Qualification Filters**:
  - Minimum 5 closed trade execution entries.
  - Minimum initial portfolio capital of $100.00.
  - Profile must be set to `is_public = TRUE`.

#### 2. P2P Strategy Marketplace & Subscription State Machine
- **Publishing Criteria**:
  - Author must have `is_verified = TRUE` or verified ROI $\ge 5.0\%$.
  - Monthly fee defined in USD ($\$0.00$ to $\$999.00$).
- **Subscription Lifecycle States**:
  - `none`: User has not subscribed.
  - `active`: Subscription valid, `expires_at > NOW()`.
  - `cancelled`: Subscription set to expire at period end.
  - `expired`: Subscription elapsed, `expires_at <= NOW()`.
- **Mock Checkout Processing**:
  - Endpoint `POST /api/marketplace/subscribe`:
    1. Verify user is not author of strategy (`user_id != author_id`).
    2. Simulate credit card / Stripe transaction.
    3. Generate `transaction_ref` (`tx_mock_uuid`).
    4. Insert subscription record with `starts_at = NOW()` and `expires_at = NOW() + 30 days`.
    5. Increment `strategies.total_subscribers` by 1.

---

### R5 Specification: Database Persistence & Security Hardening

#### 1. Express Security Middlewares

##### Rate Limiting Middleware
Using `express-rate-limit`:
```javascript
import rateLimit from 'express-rate-limit';

// Global API Limiter
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again after 15 minutes.' }
});

// Auth Limiter
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many authentication attempts, please try again after 15 minutes.' }
});

// File Upload Limiter
export const fileUploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'File upload limit exceeded, maximum 10 uploads per hour.' }
});

// Trade Execution Limiter
export const tradeExecutionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: { error: 'Trade order rate limit exceeded, maximum 30 orders per minute.' }
});
```

##### Helmet Security Headers
```javascript
import helmet from 'helmet';

export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://*.supabase.co", "wss://*.alpaca.markets", "https://api.stripe.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  xFrameOptions: { action: 'deny' },
  xContentTypeOptions: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});
```

##### Query Depth & Pagination Boundary Enforcer
```javascript
export function queryBoundaryMiddleware(req, res, next) {
  // Enforce maximum page size limit
  if (req.query.limit) {
    const limit = parseInt(req.query.limit, 10);
    if (isNaN(limit) || limit > 100) {
      req.query.limit = '100';
    }
  } else {
    req.query.limit = '50'; // default page size
  }

  // Calculate query relation depth from select/expand parameter
  const selectParam = req.query.select || '';
  const calculateDepth = (str) => {
    let maxDepth = 0, current = 0;
    for (let char of str) {
      if (char === '(') {
        current++;
        if (current > maxDepth) maxDepth = current;
      } else if (char === ')') {
        current--;
      }
    }
    return maxDepth;
  };

  const depth = calculateDepth(selectParam);
  if (depth > 3) {
    return res.status(400).json({
      error: 'INVALID_QUERY_DEPTH',
      message: 'Query relation depth exceeds maximum limit of 3 nested levels.'
    });
  }

  next();
}
```

#### 2. GDPR Data Purge & Trade Anonymization Pipeline
Endpoint `DELETE /api/user/purge`:
1. Authenticate user JWT token (`req.user.id`).
2. Execute transactional cascade purge via database function or transaction:
   ```sql
   BEGIN;
   -- Delete PII & User Profile Data
   DELETE FROM public.kyc_profiles WHERE user_id = target_user_id;
   DELETE FROM public.financial_statements WHERE user_id = target_user_id;
   DELETE FROM public.drawings WHERE user_id = target_user_id;
   DELETE FROM public.marketplace_subscriptions WHERE user_id = target_user_id;
   
   -- Handle Published Strategies (Anonymize Author)
   UPDATE public.strategies 
   SET author_id = NULL,
       status = CASE WHEN total_subscribers > 0 THEN 'published' ELSE 'delisted' END
   WHERE author_id = target_user_id;

   -- Anonymize Historical Trade Records (Preserve Market Analytics)
   UPDATE public.portfolios SET user_id = NULL WHERE user_id = target_user_id;
   UPDATE public.trades SET user_id = NULL WHERE user_id = target_user_id;

   -- Delete Core User Profile
   DELETE FROM public.profiles WHERE id = target_user_id;
   COMMIT;
   ```
3. Call Supabase Auth Admin API to delete authentication record (`supabase.auth.admin.deleteUser(target_user_id)`).
4. Return HTTP 200 OK:
   ```json
   {
     "success": true,
     "message": "User account deleted and trade records anonymized successfully per GDPR compliance.",
     "timestamp": "2026-08-09T20:45:00Z"
   }
   ```

---

## API Route Specifications

### R2 API Endpoints
- `POST /api/kyc/questionnaire`: Submit KYC responses and calculate 5D financial profile vector.
  - Body: `{ riskScale: 7, maxDrawdownPct: 15.0, horizonYears: 5, liquidityImportance: "medium", primaryObjective: "balanced_growth", experienceLevel: "advanced", annualIncomeUsd: 120000, liquidNetWorthUsd: 250000 }`
  - Response: `{ success: true, profileVector: [70.0, 5.0, 0.4, 0.10, 3.0], kycId: "uuid" }`
- `GET /api/kyc/profile`: Retrieve user's current KYC profile and vector.
- `POST /api/kyc/parse-statement`: Upload financial statement file (CSV/JSON/PDF) for parsing, anomaly detection, allocation generation, and thesis creation.
  - Headers: `Content-Type: multipart/form-data`
  - Body: `file: <binary>`, `symbol: "AAPL"`, `periodType: "annual"`, `fiscalYear: 2024`
  - Response: `{ success: true, symbol: "AAPL", parsedMetrics: {...}, anomalyFlags: [], generatedAllocation: {...}, investmentThesis: "# Investment Thesis..." }`

### R3 API Endpoints
- `GET /api/leaderboard`: Fetch ranked social leaderboard with ROI and risk metrics.
  - Query: `timeframe=all&mode=paper&limit=50&offset=0`
  - Response: `{ total: 150, entries: [ { rank: 1, userId: "uuid", displayName: "QuantWhale", roiPct: 142.50, sharpeRatio: 2.15, maxDrawdownPct: 8.4, totalTrades: 42 } ] }`
- `GET /api/marketplace/strategies`: List published P2P strategies with filters.
  - Query: `minRoi=10.0&feeTier=all&limit=20`
- `POST /api/marketplace/strategies`: Create/publish a new trading strategy (authors only).
- `GET /api/marketplace/strategies/:id`: Fetch detailed strategy performance view.
- `POST /api/marketplace/subscribe`: Subscribe to a strategy using mock checkout panel.
  - Body: `{ strategyId: "uuid", paymentMethodToken: "pm_mock_card_visa" }`

### R5 API Endpoints & Middlewares
- `DELETE /api/user/purge`: Execute GDPR compliant account deletion and trade log anonymization.
- Express Middlewares: Global Rate Limiter, Auth Rate Limiter, Upload Rate Limiter, Helmet Security Headers, Query Depth & Pagination Boundary.

---

## Verification & Acceptance Checklist

| Feature | Acceptance Criteria | Status |
|---------|---------------------|--------|
| R2 KYC Profile Vector | Onboarding wizard converts responses into 5D profile vector stored in Supabase `kyc_profiles.profile_vector`. | Verified Spec Complete |
| R2 Statement Analyzer | Parser accepts CSV/JSON/PDF financial statements, detects accounting anomalies, outputs portfolio allocation and investment thesis. | Verified Spec Complete |
| R3 Social Leaderboard | Ranks users by ROI % calculated from paper/live trade records with Sharpe/Sortino/Drawdown risk metrics. | Verified Spec Complete |
| R3 P2P Marketplace | High-ROI verified traders list strategies with custom subscription fees; interactive mock checkout processes subscriptions. | Verified Spec Complete |
| R5 PostgreSQL Schema | DDL initializes tables for profiles, KYC vectors, statements, drawings, strategies, subscriptions, portfolios, trades, and leaderboard cache with RLS policies. | Verified Spec Complete |
| R5 Security Hardening | Express middlewares implement multi-tier Rate Limiting, Helmet CSP/HSTS headers, and maximum query depth boundaries (limit 3). | Verified Spec Complete |
| R5 GDPR Compliance | Purge endpoint `/api/user/purge` permanently deletes user PII while anonymizing trade logs (`user_id = NULL`). | Verified Spec Complete |
