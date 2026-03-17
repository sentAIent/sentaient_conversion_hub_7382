# Protection Manifest (Ground Truth)

This file tracks the "Unbreakable" features of Mindwave. Every task must leave these in a functional state.

## Core UI IDs & Locations

- [x] **Galaxy Sun Rotation**
    - `id="galaxySettingsPanel"` 
    - Inputs: `galaxySunRX`, `galaxySunRY`, `galaxySunRZ`
- [x] **Matrix INT Mode**
    - `id="cyberModeInterstellar"` (Label: INT)
- [x] **AI Experience Layout**
    - `id="aiGenerateBtn"` (Must be full-width, beneath `aiGoalInput`)
- [x] **Visual Dock Parity**
    - `id="dragonBtn"`
    - `id="galaxyBtn"`
    - `id="cubeBtn"`
    - `id="mandalaBtn"`
- [x] **Version Parity**
    - All entry points must match the same version tag (e.g., `NUCLEAR_FIX_V41`).

## Checkpoint Status
- **Last Verified Build**: V41
- **Verification Date**: 2026-03-14
- **Auditor**: Antigravity
