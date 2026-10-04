# Shredders Clone: Phase 2 Strategy & Architecture

## Analysis of Current State Failures
1. **"Disappearing through the snow" (Tunneling):** The mountain is currently a 2D `trimesh`. At high speeds, the physics engine fails to detect collisions on infinitely thin planes. 
2. **"Ice Skater Twirling":** The player is a generic `RigidBody` locked to the Y-axis. When it hits bumps, physics torque spins the capsule uncontrollably.
3. **Missing Controls/Buttons:** The previous code purge removed the mobile on-screen UI overlay, leaving touch users completely stranded.
4. **No Snowboard:** The `snowboarder.glb` does not contain a board mesh, so the character is just sliding on their boots.

## Fully Baked Strategy

### 1. The Physics: Custom Raycast Suspension
We will abandon standard rigidbodies for the player. Instead, we will build a **Hovercraft/Raycast Suspension Controller**. This fires two invisible lasers (raycasts) from the front and back of the player down to the ground. 
- **Result:** The board perfectly contours to the slope of the mountain without ever tunneling or twirling.

### 2. The Terrain: Rapier Heightfield
We will replace the thin `trimesh` with a Rapier `Heightfield` collider.
- **Result:** Heightfields have infinite downward thickness in physics engines. It is mathematically impossible for the player to fall through the map, and it is 10x faster to compute.

### 3. Unified Input System (Zustand)
We will build a global input store using `zustand` that bridges the gap between Desktop and Mobile.
- **Result:** Pressing 'A' on a keyboard or holding the left side of the virtual D-Pad will update the exact same `steer` variable, perfectly restoring mobile controls.

### 4. Dynamic Asset Assembly
Since the GLB lacks a snowboard, we will programmatically generate a sleek, high-poly snowboard mesh using Three.js primitives (or a separate board asset) and parent the snowboarder's IK root to it.

## Projections & Timeline
- **Immediate (Today):** Fix terrain tunneling (Heightfield) and restore Mobile UI controls.
- **Next Phase:** Implement the Raycast Suspension controller for buttery smooth carving.
- **Final Polish:** Hook up the animation state machine (Idle -> Carve -> Jump -> Trick).
