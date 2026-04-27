# Mindwave Visualizer Core (GOLD_SYNC Architecture)

## Engine Overview
The **Visualizer3D** engine (v208+) is a high-performance, modular Three.js rendering suite designed for "Binaural Presence." It utilizes a unified `absoluteTime` accumulator to drive shaders at 120Hz vibrational frequency, decoupling visual motion from audio play-state for a persistent ambient experience.

## Mode Definitions
| Mode | Class Group | Shader Characteristics |
| :--- | :--- | :--- |
| **Ocean** | `wavesGroup` | Interference-based wave physics. Dual-channel sync. |
| **Cymatics** | `cymaticsGroup` | Fractal folding. Modal resonance (n, m) with liquid morphing. |
| **Snow** | `snowflakeGroup` | Shader-driven particle system. Dynamic tinting. |
| **Galaxy** | `galaxyGroup` | Procedural volumetric stars. Orthographic projection. |
| **Cyber** | `cyberGroup` | 3D Matrix rain. Direct buffer geometry injection. |

## Inter-System Communications
- **Global Color Picker**: Updates the `customColor` singleton. Render loop performs per-frame "Brute Force" injection into all active materials.
- **Vibrational Jitter**: a 120Hz `sin(time * 120.0)` jitter injected into fragment shaders to ensure the UI feels "alive" even in silence.
- **Heartbeat Guard**: The `toggleMode` logic cancels any existing `requestAnimationFrame` before starting a new recursive loop to prevent "Zombie Stalls."

## Rendering Hierarchy
1. `performance.now()` delta calculation (clamped to 0.1s to avoid jumps).
2. `absoluteTime` increment.
3. Shader Uniform Brute-Force Sync (Color, Time, Intensity).
4. Audio FFT Normalization (Bass, Mids, Highs).
5. Scene Rotation / Mesh Transformation.
6. `renderer.render(scene, camera)`.

## Maintenance Protocol
- All modifications MUST be performed in the `/binaural-assets/` directory.
- All version shifts MUST be accompanied by an increment to the `VXXX` marker in `main_vGOLD_SYNC.js`.
- Always verify that `material.dispose()` is called during mode teardown to prevent GPU memory bloat.
