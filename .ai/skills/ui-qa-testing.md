---
name: UI QA Testing Workflow
description: A rigid checklist and automated workflow for verifying UI changes and WebGL integrations using Playwright.
---

# UI QA Testing Workflow (Playwright)

This skill must be executed whenever a UI element is modified, added, or connected to a WebGL shader uniform.

## Prerequisites
- The local Vite dev server must be running on `http://localhost:5173`.
- Any modified source files must be synced to bypass Vite caching (see `binaural-beats-rules.md`).

## Phase 1: Automated Regression Script
1. The orchestrator (or `qa-tester` subagent) must write a Playwright script (e.g., `test_ui_feature.spec.js`).
2. The script must navigate to `http://localhost:5173/mindwave.html`.
3. The script MUST include an explicit wait for the visualizer to initialize:
   ```javascript
   import { test, expect } from '@playwright/test';
   
   test('UI feature test', async ({ page }) => {
     await page.goto('http://localhost:5173/mindwave.html');
     await page.waitForFunction(() => window.viz3D && window.viz3D.cymaticsCore);
     // test logic
   });
   ```

## Phase 2: Execution and Assertion
1. The script must leverage Playwright's auto-waiting (e.g., `await page.locator('#your-button-id').click()`).
2. The script must assert the resulting state change in the global context:
   ```javascript
   const value = await page.evaluate(() => window.viz3D.cymaticsCore.materials[X].uniforms.uVar.value);
   expect(value).toBe(EXPECTED);
   ```
3. Run the script via `npx playwright test test_ui_feature.spec.js --project=chromium`.

## Phase 3: Failure Protocol
- If the test fails, Playwright will generate trace logs. Review the error.
- **DO NOT** report the task as complete to the user.
- Re-read the `binaural-beats-rules.md` caching section.
- Debug the logic and re-run Phase 2 until it passes 100%.

Only when Phase 2 passes without errors can you report success to the user.
