# Context — Sub-Orchestrator M5

## Workspace
Project root: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website`
Agent working directory: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/sub_orch_m5`

## References
- `ORIGINAL_REQUEST.md`: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/ORIGINAL_REQUEST.md`
- `PROJECT.md`: `/Users/ute/Dev/sentaient_conversion_hub_7382-Website/PROJECT.md`

## Milestone Requirements
- 8-table Supabase/PostgreSQL schema: `profiles`, `kyc_profiles`, `financial_statements`, `drawings`, `strategies`, `marketplace_subscriptions`, `portfolios`, `trades`.
- RLS policies enforcing `auth.uid() = user_id`.
- Express security middleware (`server/security.js`): Helmet, rate limiting, query depth protection.
- GDPR purge pipeline (`server/gdpr.js`): Account purging + trade log anonymization.
- Express server integration (`server/index.js` or `server/server.js`).
