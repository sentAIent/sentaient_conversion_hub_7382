# Contango Quant — Production Cloud Deployment Guide

This guide covers deploying the full Contango Quant ecosystem across major cloud hosting providers.

---

## 1. Architecture Summary

| Service | Technology | Port | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | React / Vite / PWA | `3050` / `443` | TradingView charts, Quant Studio, KYC, Marketplace, Leaderboard |
| **Python Backend** | FastAPI / Uvicorn | `8000` | Quant analytics audits, FinBERT NLP, AES-256 Broker Vault, Webhooks |
| **Go Engine** | Go 1.22 / Gorilla | `8080` | High-speed data resampling, OMS execution, WebSocket price stream |

---

## 2. Option A: Railway / Render (Fastest Zero-DevOps Cloud)

1. **Frontend**:
   - Connect GitHub repo, select `/lim_clone/frontend` subfolder.
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
2. **Python Backend**:
   - Select `/lim_clone/backend_python` subfolder.
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Env Variables: `CONTANGO_VAULT_KEY`, `GEMINI_API_KEY`
3. **Go Backend**:
   - Select `/lim_clone/backend_go` subfolder.
   - Build Command: `go build -o server .`
   - Start Command: `./server`

---

## 3. Option B: AWS ECS / Google Cloud Run (Enterprise Scaling)

Deploy using the automated production compose file:
```bash
docker compose -f docker-compose.prod.yml up --build -d
```

### Environment Variables
```env
CONTANGO_VAULT_KEY=your_master_aes256_encryption_key
GEMINI_API_KEY=your_gemini_api_key
ALPACA_API_KEY=your_alpaca_key
ALPACA_API_SECRET=your_alpaca_secret
```

---

## 4. Option C: iOS & Android Native Mobile Store Packaging

1. Install Capacitor dependencies in `lim_clone/frontend`:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
   ```
2. Build web assets and sync:
   ```bash
   npm run build
   npx cap add ios
   npx cap add android
   npx cap sync
   ```
3. Open in Xcode / Android Studio:
   ```bash
   npx cap open ios
   npx cap open android
   ```
4. Archive and publish directly to **App Store Connect** and **Google Play Console**.
