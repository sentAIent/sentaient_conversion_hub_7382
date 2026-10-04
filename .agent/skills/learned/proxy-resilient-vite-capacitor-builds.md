# Proxy-Resilient Vite & Capacitor Builds

**Extracted:** 2026-09-13
**Context:** When developing Capacitor apps behind strict corporate firewalls or proxies that block `npm install` and external CDN fetches.

## Problem
1. Rollup (via Vite) statically analyzes dynamic imports. If an NPM install fails due to a proxy `403 Forbidden`, the build crashes with `Rollup failed to resolve import` because the package is missing.
2. Plugins like `vite-plugin-sri3` crash the build when attempting to fetch external CDNs for hashing if the network blocks the request.

## Solution
1. **Bypass Rollup Static Analysis:** Never use raw static strings for dynamic imports if the package might be missing. Break the string apart so Rollup skips it and evaluates it only at runtime.
2. **Runtime Platform Checks:** Wrap native logic in `window.Capacitor?.isNativePlatform()` to prevent web environments from executing missing native SDKs.
3. **Disable Network-Reliant Build Plugins:** Temporarily comment out `sri()` or similar plugins in `vite.config.js` during local proxy development.

## Example
**❌ Bad (Crashes build if proxy blocked installation):**
```javascript
import { Capacitor } from '@capacitor/core';
if (Capacitor.isNativePlatform()) {
  const { MediaSession } = await import('@capacitor-community/media-session');
}
```

**✅ Good (Resilient to missing NPM packages):**
```javascript
const cap = window.Capacitor;
if (cap && cap.isNativePlatform()) {
  try {
    const pkg = '@capacitor-community/media-session';
    const { MediaSession } = await import(/* @vite-ignore */ pkg);
  } catch (e) {
    console.warn("Capacitor plugin missing or not installed.");
  }
}
```

## When to Use
Trigger this skill whenever a user reports a `403 Forbidden` NPM error, a `Rollup failed to resolve import` error on a known optional package, or `[vite:build-import-analysis] fetch failed` while working on mobile/Capacitor integrations.
