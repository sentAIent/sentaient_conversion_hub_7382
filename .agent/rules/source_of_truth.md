# Mindwave Project: Source of Truth

This document defines the "Right Version" of the Mindwave application to prevent AI confusion between the full app and standalone stats components.

## 🎯 Primary App Entry Points (The Trinity)
All feature development and UI changes MUST be applied to these three files:
1.  **`public/mindwave.html`** (Primary Development / Latest Version)
2.  **`public/mindwave-beta.html`**
3.  **`public/mindwave-official.html`**

## 🧩 Core Logic
-   **UI Logic**: `public/binaural-assets/js/ui/controls_v3.js`
-   **Main Entry JS**: `public/binaural-assets/js/main_vFINAL.js`

## 📊 Differentiating Stats from the App
To avoid acting like the "stats popup" is the entire app:
-   **STANDALONE PAGE**: `public/analytics-dashboard.html` is a data dashboard only. It is **NOT** the Mindwave app.
-   **POPUP MODAL**: `id="statsModal"` (inside the Trinity files) is a UI component for user statistics. It is **NOT** the entire app.

## 🤖 AI Instruction
When the USER says "Mindwave" or "start working on the app", **ALWAYS** pull up `public/mindwave.html` and `public/binaural-assets/js/ui/controls_v3.js` immediately. Do not focus on `analytics-dashboard.html` unless explicitly asked.
