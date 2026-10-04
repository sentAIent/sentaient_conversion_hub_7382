# Integrate, Don't Isolate (Leverage Existing Architecture)

**Extracted:** 2026-09-19
**Context:** When planning major new features (like adding a multi-track sequencer to an app that already handles ambient audio).

## Problem
AI planning often defaults to building completely new, decoupled UI components and backend systems for new feature requests. This overlooks the existing app architecture, leading to UI bloat, duplicate logic, and a disjointed user experience. (e.g., Proposing a brand new "Sequencer Grid" when the app already had a multi-channel `AmbientAudioEngine` with volume sliders).

## Solution
1. **Audit Existing Paradigms First:** Before proposing a new UI or engine, check if the app already has a system doing something similar.
2. **Extend, Don't Isolate:** Instead of a separate screen, seamlessly inject the new feature into the existing UI (e.g., adding "Custom AI Slots" to the existing atmosphere control panel).
3. **Respect the Current State:** Reuse existing state managers, audio/video routers, and visual paradigms. If the app mixes 4 audio tracks already, pass the 5th track through the exact same pipe.

## When to Use
Trigger this skill whenever you are about to propose a "brand new dashboard", "new grid", or "separate tool". Stop and ask: "Can this be integrated seamlessly into the main interface the user already interacts with?"
