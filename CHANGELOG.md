# MindWave Version History & Changelog

## [v1.0.1-beta] - 2026-07-03 (Current Checkpoint)

### Added
- **Terms of Service & EULA:** Created dedicated `terms.html` page separating the EULA and Medical Disclaimer from the Privacy Policy.
- **Lotus Cursor:** Swapped the legacy brain emoji cursor in the color picker UI to the official MindWave lotus image (`mindwave-cursor.png`).
- **Initial Visual Mode Synchronization:** Visualizer now dispatches a `mindwave:visual-mode-sync` event upon initialization to ensure UI buttons accurately highlight the active modes on page load without requiring user interaction.

### Changed
- **Default Visuals:** Updated `visualizer_v4.js` to automatically activate the `cyber`, `snowflake`, `waves`, `particles`, and `cymatics` visual modes upon launch.
- **Heartbeat Cymatic:** Renamed Cymatic Class 22 Variation 0 from "Fundamental Zenith" to "Heartbeat" per design requirements.

### Fixed
- **Light Theme Gallery:** Fixed an issue where text and cards inside the theme gallery modal were invisible when a Light Theme was engaged. Injected specific CSS overrides targeting `[data-theme-type="light"]` for modal components.
- **Cursor Color Stutter:** Resolved an issue where continuous dragging in the cursor color picker would cause DOM-update stuttering by implementing a conditional check to prevent redundant element class modifications during the `input` event.

---

## [v1.0.0-beta] - Previous Checkpoint
- Initial web application UI restored and unified (`main_vFINAL.js`, `controls_v3.js`).
- Firebase authentication flows, Firestore layout, and Stripe basics staged.
- Core 3D visualizer implemented (`visualizer_v4.js`) utilizing Three.js and custom shaders.
