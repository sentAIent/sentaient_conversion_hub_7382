# MindWave — Clinical Neuro-Acoustic Workstation & Psychoacoustic Engine

[![Automated Tests](https://img.shields.io/badge/tests-14%2F14%20passing-brightgreen)](tests/)
[![StoreKit 2](https://img.shields.io/badge/StoreKit%202-RevenueCat%20v13-blue)](ios/)
[![Android 16](https://img.shields.io/badge/targetSdk-36-green)](android/)
[![Compliance](https://img.shields.io/badge/GDPR%20%7C%20HIPAA-Data%20Portability-orange)](account-deletion.html)

MindWave is an evidence-informed psychoacoustic sound therapy and cognitive entrainment workstation engineered for native iOS, Android, and high-performance Web environments.

---

## 1. Core Architecture

- **Precision Audio Synthesis**: Web Audio API continuous phase-locked loop (PLL) crystal clocking, sub-millisecond isochronic pulsing, and dynamic pink/brownian noise synthesis.
- **Biometric Biofeedback**: Real-time integration with Muse 2 / Muse S EEG headbands (TP9, AF7, AF8, TP10 channels) and Apple HealthKit / Google Health Connect heart-rate variability (HRV) sync.
- **Local-First Persistence**: ACID transaction-safe IndexedDB database (`mw_offline_data`) with graceful zero-latency `localStorage` fallback.
- **Tiered AI Neurologist Router**: Dual-tier LLM architecture routing quick intent to Fast models (Gemini 1.5 Flash) and complex clinical entrainment protocols to Frontier models (Claude 3.5 Sonnet / GPT-4o), backed by an in-memory cosine cache (0.90 threshold) and zero-cost local WebGPU inference.
- **Hybrid Neuro RAG**: Sparse BM25 + dense vector cosine ranking over peer-reviewed entrainment literature (Oster 1973, Chaieb 2015, Lane 1998, Tononi 2014).

---

## 2. Store Submission Compliance (2026 Mandates)

### Apple App Store
- **Required Reason API Manifest**: [`ios/App/App/PrivacyInfo.xcprivacy`](ios/App/App/PrivacyInfo.xcprivacy) declaring `C617.1` (file timestamps) and `35F4.1` (boot time).
- **Export Compliance**: `<key>ITSAppUsesNonExemptEncryption</key><false/>` in `Info.plist`.
- **Sign in with Apple (Guideline 4.8)**: Full parity button `#appleSignInBtn` in auth dialog.
- **In-App Account Deletion (Guideline 5.1.1(v))**: 2-step verification modal with immediate data purge and public web portal at `/account-deletion.html`.
- **AI Transparency (Guideline 5.1.2(i) & 1.2)**: Prior explicit consent modal and content reporting flow.
- **StoreKit 2**: RevenueCat Capacitor SDK integration in `iap-service.js`.
- **Reviewer Documentation**: Detailed credentials and demo instructions in [`APP_STORE_REVIEW_NOTES.md`](APP_STORE_REVIEW_NOTES.md).

### Google Play Console
- **Target SDK 36 (Android 16)**: Configured in `android/variables.gradle` and `android/app/build.gradle`.
- **16 KB Memory Page Alignment**: Verified with `useLegacyPackaging = false`.
- **R8 / ProGuard Minification**: Release minification enabled with keep rules in `android/app/proguard-rules.pro`.
- **Data Safety Manifest**: Form and policy documentation in [`PLAY_STORE_DATA_SAFETY.md`](PLAY_STORE_DATA_SAFETY.md).
- **Verified App Links**: Digital Asset Links configured in `public/.well-known/assetlinks.json`.

---

## 3. Automated Verification & Testing

Run all unit, integration, and security tests locally:

```bash
npm test
```

Or invoke Node's test runner directly:

```bash
node --test tests/production_readiness.spec.js tests/social_card_and_email.spec.js tests/mindwave_clinical_enterprise.spec.js
```

---

## 4. Local Development & Deployment

```bash
# Start local dev server
npm run dev

# Preview build
npm run serve

# Build production bundle
npm run build
```
