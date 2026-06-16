# Ultimate Cymatics UI Restoration

The previous UI restoration accidentally rolled back to an older "Gold" layout that only contained 66 flat buttons, completely omitting the 190+ variations and advanced procedural shaders (including the Quantum Double-Slit experiment). 

This plan details the construction of the Ultimate Cymatics UI to elegantly expose all 25 classes and their variations without cluttering the interface.

## Proposed Changes

### 1. `mindwave.html`
We will replace the current static 66-button grid with a dynamic, beautifully styled accordion or categorized tab system.

#### Categories:
- **Image-Based Cymatics (Classes 1-18)**
  - Grouped logically (e.g., Sacred Geometry, Brutalism, Plasma).
  - Each class will have a horizontally scrollable row or an expanding grid of its variations (8+ variations per class).
- **Procedural Masterworks (Classes 19-25)**
  - Dedicated premium sections for Void Matrix, Chronos Weave, Plasma Bloom, Heart Cymatics, Sacred Sun, Constellations, and **Quantum Double-Slit**.
  - Expose all 29+ sub-variations of the True Image-Based Cymatics (Class 22).

#### Design Aesthetics:
- Glassmorphism containers (`bg-black/40 backdrop-blur-md`).
- Premium typography and spacing.
- Hover effects with neon glows and scale transforms to meet the premium aesthetic standards.

### 2. `binaural-assets/js/ui/controls_v4.js`
- Remove the temporary 66-button `selectCymaticPattern` mapping patch.
- Implement a robust event delegation script to handle the new categorized UI buttons.
- Ensure the API `window.setCymaticPattern(classId, variationId)` is called directly with the correct parameters for all 200+ combinations.

## Verification Plan
1. Render the new UI in the browser and visually inspect the layout to ensure it looks premium and not cluttered.
2. Click through a representative sample of buttons across all categories (especially Quantum Double-Slit and the high-number variations) to confirm the visualizer transitions smoothly without console errors.
