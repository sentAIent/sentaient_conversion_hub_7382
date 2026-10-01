# Matrix DevSecOps 55-Point Security & Production Readiness Checklist

This document serves as the cognitive knowledge base for the Matrix software creation agent. When instructed to generate, scaffold, or review a software project, Matrix must cross-reference the requested architecture against these 55 items.

## Evaluation Protocol
1. **Assess Stack:** Determine if the target app includes Web, Mobile (Capacitor/React Native/Swift/Kotlin), Backend (Node, Python), or Database (Supabase/Postgres, Firebase/Firestore).
2. **Filter Constraints:** Apply only the relevant items based on the stack.
3. **Execute Design:** Inject the appropriate security and production readiness code templates to satisfy the constraints.
4. **Audit:** Verify that the generated code passes the checklist verification rules.

---

## 1. Network Security, Proxies, & Rate Limiting
- **[Item 1] API Key Proxying:** Never expose private API keys in client-side code. Always route third-party API calls (e.g., OpenAI, Stripe) through an edge function or proxy.
- **[Item 2] Route Rate Limiting:** Implement token bucket or sliding window rate limiting (e.g., using Upstash Redis) on all sensitive backend endpoints.
- **[Item 3] Auth Endpoint Protection:** Implement stricter rate limiting (e.g., 5 attempts per minute) on login, signup, and password reset routes to prevent brute-force attacks.
- **[Item 4] Bot & DDoS Protection (WAF):** Configure WAF rules or utilize Supabase Edge/Cloudflare rate limiting.
- **[Item 5] Mobile Certificate Pinning:** (If Mobile) Enforce SSL pinning in `capacitor.config.json` or native code to prevent Man-in-the-Middle (MitM) attacks.
- **[Item 6] App Check:** Enforce Firebase App Check with reCAPTCHA Enterprise (Web) and DeviceCheck/Play Integrity (Mobile).
- **[Item 7] Strict CSP:** Implement a Strict Content Security Policy (CSP) blocking `unsafe-inline` and `unsafe-eval` unless strictly necessary, defining allowed `connect-src` and `script-src`.
- **[Item 8] CSP Violation Reporting:** Configure `report-uri` in the CSP to log violations to an edge function or analytics endpoint.
- **[Item 9] CORS Origin Locking:** Ensure `Access-Control-Allow-Origin` strictly matches the deployed domains; never use `*` in production for state-modifying endpoints.

## 2. Authentication & Session Management
- **[Item 10] HttpOnly Cookies:** Avoid storing sensitive JWTs in `localStorage`. Use `HttpOnly`, `Secure`, `SameSite=Strict` cookies to neutralize XSS theft.
- **[Item 11] CSRF Tokens:** If using cookie-based auth, enforce anti-CSRF tokens on all state-changing mutations (`POST`, `PUT`, `DELETE`).
- **[Item 12] Admin Panel MFA:** Enforce Multi-Factor Authentication on any administrative dashboard routes.

## 3. Input Validation, Integrity, & Moderation
- **[Item 13] Input Sanitization:** Use libraries like `DOMPurify` to sanitize user inputs before rendering them as HTML.
- **[Item 14] Payload Validation:** Use schema validation (e.g., `Zod`, `Joi`) on all incoming API requests before processing them.
- **[Item 15] Environment Variable Validation:** Validate required environment variables at boot time to prevent crashes due to missing configuration.
- **[Item 16] Content Moderation:** Run user-submitted text and images through a moderation API (e.g., Gemini Safety Settings, Perspective API) before saving to the DB.
- **[Item 17] Subresource Integrity (SRI):** Generate SRI hashes for CDN scripts to prevent execution if compromised.
- **[Item 18] PII Redaction Pipeline (DLP):** Redact sensitive info (SSNs, phone numbers, emails) using regex or NLP before sending data to external LLM providers.

## 4. Database Resilience, Migrations, & Pooling
- **[Item 19] Row Level Security (RLS):** Ensure database tables have strict RLS policies enabled. Default to deny-all.
- **[Item 20] Connection Pooling:** Configure database connection pooling (e.g., Supavisor, PgBouncer) for serverless backend environments.
- **[Item 21] Automated Backups:** Provide a script or configure automated daily backups for databases.
- **[Item 22] Zero-Downtime Migrations:** Provide up/down schema migration scripts.
- **[Item 23] SQL Injection Scanner:** Enforce the use of parameterized queries or ORMs; explicitly block raw string concatenation in SQL queries.

## 5. Telemetry, Costs, & Autonomous Monitoring
- **[Item 24] Spend Caps:** Implement daily API request limits/spend caps for paid 3rd party APIs.
- **[Item 25] Error Tracking:** Integrate tools like Sentry, PostHog, or Datadog to capture global exceptions.
- **[Item 26] Session Telemetry:** Implement Web Vitals (`FCP`, `LCP`, `CLS`) and API latency tracking.
- **[Item 27] Key Health Autopilot:** Provide a `/health` endpoint checking DB connectivity and external API health.
- **[Item 28] OOM Prevention:** Monitor process memory (Node.js) and implement graceful restarts on memory leaks.
- **[Item 29] AI-Powered RCA:** Stream logs to an analysis agent for Root Cause Analysis when errors spike.

## 6. CI/CD, Dependency Management, & E2E Testing
- **[Item 30] Vulnerability Scanning:** Add `npm audit` or `snyk` scanning to the CI/CD pipeline.
- **[Item 31] Lockfile Strictness:** Use `npm ci` or `pnpm install --frozen-lockfile` in CI pipelines.
- **[Item 32] Secret Scanning:** Configure Git hooks (e.g., `trufflehog` or `git-secrets`) to prevent committing API keys.
- **[Item 33] Pre-commit Formatting:** Enforce ESLint, Prettier, and Type-checking before allowing commits.
- **[Item 34] Playwright E2E Testing:** Add a foundational Playwright pipeline testing the critical authentication flow.
- **[Item 35] OWASP Top 10 Scanners:** Recommend or integrate dynamic application security testing (DAST).
- **[Item 36] Desktop/Mobile Testing:** Ensure responsiveness is tested using browser emulation.

## 7. Local Storage & Mobile Identity
- **[Item 37] Encrypted Local Storage:** (If Mobile) Use `Capacitor Preferences` or `SecureStorage` instead of standard `localStorage`.
- **[Item 38] Biometric Authentication:** (If Mobile) Implement FaceID/TouchID requirements for opening sensitive app views.
- **[Item 39] Biometric Auth Timeout:** Lock the app and require biometrics again if backgrounded for more than X minutes.
- **[Item 40] Root/Jailbreak Detection:** (If Mobile) Integrate detection libraries to block execution on compromised devices.

## 8. Web Performance, PWA, Compliance, & SEO
- **[Item 41] Caching & SWR Headers:** Set up robust HTTP caching (`Cache-Control: public, max-age=31536000, immutable`) for static assets.
- **[Item 42] PWA Offline Fallback:** Implement a Service Worker to provide an offline fallback page.
- **[Item 43] SEO & Sitemaps:** Generate a `robots.txt`, dynamic `sitemap.xml`, and valid metadata for all public pages.
- **[Item 44] OpenGraph Share Images:** Add dynamic or static OG share images (`<meta property="og:image">`).
- **[Item 45] Accessibility (a11y) Compliance:** Ensure `aria-labels`, contrast ratios, and keyboard navigation support are included in all UI components.
- **[Item 46] Privacy Policy & TOS:** Scaffold legal routes (`/privacy`, `/terms`).
- **[Item 47] Subdomain Emails:** Advise on configuring DKIM/SPF/DMARC for transactional emails.
- **[Item 48] Data Deletion API (GDPR):** Implement a recursive deletion API that allows users to fully delete their account and associated PII.

## 9. Proposed Additions
- **[Item 49] Invisible Honeypots:** Add hidden form fields to registration/contact forms to silently trap and drop bot submissions.
- **[Item 50] Data Retention Policies (TTL):** Implement TTL (Time-to-Live) settings on logging or ephemeral database tables to auto-purge stale data.
