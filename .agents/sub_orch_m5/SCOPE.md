# Scope: M5 Database Persistence, Security & GDPR Compliance

## Architecture
PostgreSQL / Supabase 8-table schema (`profiles`, `kyc_profiles`, `financial_statements`, `drawings`, `strategies`, `marketplace_subscriptions`, `portfolios`, `trades`) with Row Level Security (RLS) policies, Express security middleware (`server/security.js`: Helmet headers, rate limiting, query depth protection), and transaction-safe GDPR data purge/anonymization pipeline (`server/gdpr.js`). Integrated into `server/index.js` or `server/server.js`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 11 | Supabase PostgreSQL Persistence & RLS | PostgreSQL schema storing user profiles, KYC states, drawings, trades, strategies, and subscriptions with RLS policies. | M5 | R5 |
| 12 | Security Hardening & GDPR Purge Pipeline | Rate limiting, Helmet security headers, query depth boundaries, and GDPR data purge/anonymization pipeline. | M5 | R5 |

## Milestones / Subtasks
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M5.1 | Database Schema & RLS | `db/01_contango_quant_schema.sql`: 8 tables + RLS rules + indexes + triggers | none | IN_PROGRESS |
| M5.2 | Express Security Middleware | `server/security.js`: Helmet, rate limiting, query depth limit | none | IN_PROGRESS |
| M5.3 | GDPR Purge Pipeline | `server/gdpr.js`: Transactional account deletion & trade anonymization | M5.1 | IN_PROGRESS |
| M5.4 | Express Integration | `server/index.js` / `server/server.js`: Wiring middleware & GDPR endpoint | M5.1, M5.2, M5.3 | IN_PROGRESS |

## Interface Contracts
### Security Middleware (`server/security.js`)
- Express middleware exports: `securityMiddleware`, `rateLimiter`, `queryDepthLimit`.
- Applied globally to `/api/*` endpoints.

### GDPR API (`server/gdpr.js`)
- `DELETE /api/user/purge`: Purges user account data (`profiles`, `kyc_profiles`, `drawings`, `financial_statements`, `strategies`, `marketplace_subscriptions`, `portfolios`) and anonymizes `trades` (retains trade records with anonymized user reference for aggregate analytics).

### Supabase Schema (`db/01_contango_quant_schema.sql`)
- Tables: `profiles`, `kyc_profiles`, `financial_statements`, `drawings`, `strategies`, `marketplace_subscriptions`, `portfolios`, `trades`.
- RLS enabled on all 8 tables with proper policy checks (`auth.uid() = user_id`).
