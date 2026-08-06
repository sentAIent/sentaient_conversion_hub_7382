# Deployment Checklist for sentaient.com/legaleagle/

## 1. Environment Preparation
- [ ] Ensure `VITE_GEMINI_API_KEY` is set in production environment variables.
- [ ] Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set to production values.
- [ ] Ensure `SUPABASE_SERVICE_ROLE_KEY` is securely stored for edge functions.

## 2. Supabase Infrastructure
- [ ] Apply all SQL migrations (history, storage, system_logs, etc.) to the production Supabase database.
- [ ] Enable `pg_cron` and `pg_net` extensions on the production database.
- [ ] Run `system_logs_setup.sql` to initialize the cron ping for `keepalive-ping`.
- [ ] Deploy Edge Functions to Supabase Production (`create-checkout-session` and `keepalive-ping`):
  ```bash
  supabase functions deploy create-checkout-session
  supabase functions deploy keepalive-ping
  ```

## 3. Node Backend (Docker Manager)
- [ ] Deploy the `docker-manager` folder to a persistent Node server (e.g., Render, Railway, AWS EC2).
- [ ] Install python requirements (`pip install -r requirements.txt`) including `ddgs`, `gemini-api`, `networkx`, `beautifulsoup4`.
- [ ] Ensure the server has Chrome installed for Playwright (if used by agents).

## 4. Frontend Build & Deploy (Web)
- [ ] Run `npm run build` locally or in CI/CD pipeline.
- [ ] Verify `dist/` directory outputs correctly.
- [ ] Deploy the frontend to Vercel/Netlify or target domain (`sentaient.com/legaleagle/`).
- [ ] Set routing rules (e.g., rewrite rules on Vercel) so `/graph`, `/research`, etc. map back to `index.html`.

## 5. Mobile Build & Store Deployment (iOS & Android)
- [ ] Configure `capacitor.config.ts` with your official Bundle ID (`appId`) and `appName`.
- [ ] Run `npx cap sync` to copy web assets to the native `ios` and `android` projects.
- [ ] Open Xcode (`npx cap open ios`) and Android Studio (`npx cap open android`) to build the native binaries.
- [ ] Setup RevenueCat in the Apple App Store Connect and Google Play Console:
  - Add native products (e.g. `premium_monthly`, `premium_annual`, `enterprise_monthly`).
  - Map these product IDs in the RevenueCat dashboard.
  - Insert the RevenueCat public API keys into your `.env` file (for `@revenuecat/purchases-capacitor`).
- [ ] Submit App Privacy Details regarding User Data, EULA, and Account Deletion to Apple/Google during the review process.

## 6. Third-Party Integrations
- [ ] Stripe: Configure webhook endpoints pointing to the production Supabase edge functions (for web billing).
- [ ] RevenueCat: Ensure Entitlements and Offerings match production settings (for mobile billing).

## 7. Final Smoke Test
- [ ] Create a test account.
- [ ] Run a Deep Research query.
- [ ] Run a Knowledge Graph query.
- [ ] Trigger an "Export to PDF" to ensure no CORS or cross-origin canvas errors.
- [ ] Check Admin Dashboard to ensure keepalive logs are recording.
