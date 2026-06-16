# Binaural Beats Development Rules

This document outlines the strict architecture and workflow rules that all agents (and subagents) must follow when contributing to the `sentaient_conversion_hub_7382` project.

## 1. Local Dev Server & Caching
Vite caches files aggressively in this environment.
- **Rule:** Whenever modifying `CymaticsCore.js` or any core visualizer logic, you MUST run a script to bypass or clear the Vite cache, or manually copy the files to the `public/` directory if that is the established workflow.
- **Never assume** a UI test failure is solely a logic error if you have not explicitly handled the cache.

## 2. WebGL & CymaticsCore Architecture
- **Rule:** `viz3D` manages a `CymaticsCore` instance.
- **Rule:** `CymaticsCore` initializes materials via a loop in its constructor. All new visualizer class materials (e.g., class 24, class 25) MUST be properly initialized inside this loop to prevent `Cannot read properties of undefined (reading 'uniforms')` errors.
- **Rule:** Race Conditions: Automated tests must explicitly wait for `window.viz3D` and `window.viz3D.cymaticsCore` to populate before attempting to interact with the visualizer context.

## 3. UI/UX Consistency
- **Rule:** Aesthetics are paramount. Do not introduce generic colors or basic HTML buttons without styling. Use the established design system (glassmorphism, tailored HSL colors, modern typography).
- **Rule:** Independent components (like the Lotus Glow) must not have their logic coupled to global dimmers unless explicitly requested.

## 4. Verification Protocol
- **Rule:** No code is to be considered "done" without executing the `.ai/skills/ui-qa-testing.md` checklist.
- **Rule:** Subagents (`qa-tester`) must be utilized to write regression scripts for major UI overhauls.
