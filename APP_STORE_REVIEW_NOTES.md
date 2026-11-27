# Apple App Store Review Notes (MindWave 2026 Submission)

## 1. Demo & Test Account Credentials
- **Username / Email:** reviewer@sentaient.com
- **Password:** MindWaveReview2026!
- **Subscription Entitlement:** StoreKit 2 Sandbox Pre-configured

## 2. Guideline 2.1 — Hardware Simulation for In-Review Testing
MindWave supports hardware-less simulation mode for Apple Review team testing without requiring physical BLE heart rate straps:
1. Open the application.
2. Tap the heart-rate / biometrics icon (**Biometric HUD**) in the top right control bar.
3. Toggle **"Simulator Mode"** to ON.
4. The live 60 FPS ECG trace will immediately simulate realistic respiratory sinus arrhythmia (68–78 BPM with physiological R-R interval jitter).
5. Switch to **"Bio-Adaptive Entrainment"** to observe the real-time carrier frequency shift dynamically adapting to simulated autonomic stress levels.

## 3. Guideline 3.1.1 — In-App Purchases (StoreKit 2)
- All subscription tiers are configured in `ios/App/MindWave.storekit` with local sandbox testing:
  - Monthly: `com.sentaient.mindwave.pro.monthly` ($9.99/mo, 1-week free trial)
  - Annual: `com.sentaient.mindwave.pro.annual` ($79.99/yr, 2-week free trial)
  - Lifetime Pass: `com.sentaient.mindwave.lifetime` ($149.99 non-consumable)
- Restore Purchases button is accessible under Account Modal > Manage Subscription.

## 4. Guideline 5.1.1(v) — In-App Account Deletion
- Account deletion is available in-app via **Account > Delete Account**, with a 2-step confirmation purging local IndexedDB vaults and cloud profile records.
- Web URL fallback: `https://sentaient.com/account-deletion.html`

## 5. Guideline 5.1.2(i) & 1.2 — Third-Party AI Disclosure & Content Moderation
- MindWave presents an explicit opt-in dialog before user input is processed by third-party AI LLMs (Gemini / OpenAI).
- Every AI response features a "Report / Flag" action with automatic content review logging.

## 6. Non-Medical Wellness Disclaimer
MindWave is designed for wellness, mindfulness, and cognitive focus entrainment. It is not an FDA-cleared medical device and does not diagnose, treat, or cure medical conditions.
