# Execution Plan — Sub-Orchestrator M5

## Objective
Execute Milestone M5: Database Persistence, Security & GDPR Compliance for Contango Quant.

## Target Deliverables
1. `db/01_contango_quant_schema.sql`: 8-table Supabase/PostgreSQL schema (`profiles`, `kyc_profiles`, `financial_statements`, `drawings`, `strategies`, `marketplace_subscriptions`, `portfolios`, `trades`) with Row Level Security (RLS) policies, indexes, foreign keys, and triggers.
2. `server/security.js`: Express security middleware (Helmet HTTP security headers, rate limiting with IP/token window, query depth boundary limits for payload nesting).
3. `server/gdpr.js`: Transaction-safe GDPR data purge endpoint handler (`DELETE /api/user/purge`) deleting user data across tables and anonymizing trade logs.
4. `server/index.js` or `server/server.js`: Integration of security middleware and GDPR router into main Express server.
5. Unit/Integration verification tests ensuring builds pass, RLS is valid, security middleware works, and GDPR transaction pipeline executes properly.

## Iteration Loop (Iteration 1)
- Phase 1: Explorer Exploration (3 teamwork_preview_explorer subagents)
- Phase 2: Implementation & Build/Test Execution (1 teamwork_preview_worker subagent)
- Phase 3: Peer Code & Security Review (2 teamwork_preview_reviewer subagents)
- Phase 4: Adversarial Stress Testing (2 teamwork_preview_challenger subagents)
- Phase 5: Forensic Integrity Audit (1 teamwork_preview_auditor subagent)
- Phase 6: Gate Verdict Synthesis (`GATE_STATUS.md`)
- Phase 7: Milestone Completion (`PROJECT.md` & `handoff.md`)
