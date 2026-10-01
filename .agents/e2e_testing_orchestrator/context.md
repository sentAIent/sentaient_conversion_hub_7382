# Context Memory — E2E Testing Track Orchestrator

## Overview
Contango Quant requires a complete, production-grade Playwright E2E test suite covering user requirements R1-R5 across 4 Tiers:
- Tier 1: Feature Coverage (>=5 test cases per feature for R1, R2, R3, R4, R5 -> >=25 total)
- Tier 2: Boundary & Corner Cases (>=5 test cases per feature for R1, R2, R3, R4, R5 -> >=25 total)
- Tier 3: Cross-Feature Combinations (Pairwise interactions -> >=10 total)
- Tier 4: Real-World Application Scenarios (>=5 total)

Total Target: >=65 test cases.

## Key Paths & Metadata
- Project root: /Users/ute/Dev/sentaient_conversion_hub_7382-Website
- Working directory: /Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/e2e_testing_orchestrator
- ORIGINAL_REQUEST.md: /Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/ORIGINAL_REQUEST.md
- PROJECT.md: /Users/ute/Dev/sentaient_conversion_hub_7382-Website/PROJECT.md
- TEST_INFRA.md: /Users/ute/Dev/sentaient_conversion_hub_7382-Website/TEST_INFRA.md
- TEST_READY.md: /Users/ute/Dev/sentaient_conversion_hub_7382-Website/TEST_READY.md
- Test directory: /Users/ute/Dev/sentaient_conversion_hub_7382-Website/tests

## Execution Strategy
1. Dispatch `teamwork_preview_test_writer` or `teamwork_preview_worker` to write the E2E test suite files in `tests/`.
2. Dispatch `teamwork_preview_reviewer` to inspect test completeness, assertions, coverage targets, and opaque-box design.
3. Dispatch `teamwork_preview_challenger` to run the test suite and verify execution pass/fail behavior.
4. Dispatch `teamwork_preview_auditor` for forensic integrity verification.
5. Publish `TEST_READY.md` upon gate approval.
