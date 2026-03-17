# Case Study: Safe Refactoring Protocol (Mindwave)

This protocol is MANDATORY for all Mindwave development to prevent feature regressions.

## Protocol 1: Audit-First Rule
Before any code replacement or deletion:
- Use `grep` to verify the presence of "Restored Features" in the target file.
- **Markers to Protect**:
    - `id="galaxySettingsPanel"` (Galaxy Sun Rotation)
    - `id="cyberModeInterstellar"` (INT Matrix Mode)
    - `id="aiGenerateBtn"` (situated BELOW `id="aiGoalInput"`)
    - Visual Dock Buttons: `dragonBtn`, `galaxyBtn`, `cubeBtn`, `mandalaBtn`.

## Protocol 2: The Trinity Sync
Every UI change MUST be applied simultaneously to:
1. `public/mindwave.html`
2. `public/mindwave-beta.html`
3. `public/mindwave-official.html`

## Protocol 3: The Cache Hammer
For any UI or logic change:
- Increment the `CACHE_NAME` in `public/sw.js`.
- Run `sh scripts/sync_version.sh` to update all HTML entry points to the latest version string (e.g., `NUCLEAR_FIX_V41`).

## Protocol 4: Deployment Verification
After every task:
- Run `sh scripts/audit_features.sh` to confirm all core IDs are still present in the DOM.
- Verify version synchronization across all 3 variants.
