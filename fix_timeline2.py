import re

with open('src/pages/demo3d/TimelineManager.jsx', 'r') as f:
    content = f.read()

# Remove imports for OrbitalCommand, DroneSwarm, Autopilot
content = re.sub(r"import WorldOrbitalCommand from './worlds/WorldOrbitalCommand';\n", "", content)
content = re.sub(r"import WorldDroneSwarm from './worlds/WorldDroneSwarm';\n", "", content)
content = re.sub(r"import WorldAutopilot from './worlds/WorldAutopilot';\n", "", content)

# Remove the timeline branches
timeline_block = r"""  // Orbital Command \(Center at Z=-13550\)
  \{ p: 0.56, x: 0, y: -4000, z: -11550, rx: 0, ry: 0 \}, 
  \{ p: 0.58, x: 0, y: -4000, z: -13150, rx: 0, ry: 0 \}, // Arrive Orbital Command
  \{ p: 0.60, x: 0, y: -4000, z: -13150, rx: 0, ry: 0 \}, // PAUSE Orbital Command
  
  // Branch out laterally to Drone Swarm
  \{ p: 0.61, x: 0, y: -4000, z: -13550, rx: 0, ry: -Math\.PI / 2 \}, // Turn Right
  \{ p: 0.63, x: 4000, y: -4000, z: -13550, rx: 0, ry: -Math\.PI / 2 \}, // Arrive Drone Swarm
  \{ p: 0.65, x: 4000, y: -4000, z: -13550, rx: 0, ry: -Math\.PI / 2 \}, // PAUSE Drone Swarm

  // Continue laterally to Autopilot
  \{ p: 0.655, x: 4000, y: -4000, z: -13550, rx: 0, ry: -Math\.PI / 2 \}, 
  \{ p: 0.67, x: 7000, y: -4000, z: -13550, rx: 0, ry: -Math\.PI / 2 \}, // Arrive Autopilot
  \{ p: 0.68, x: 7000, y: -4000, z: -13550, rx: 0, ry: -Math\.PI / 2 \}, // PAUSE Autopilot

  // Diagonal return to main timeline \(CloveH2O\)
  \{ p: 0.685, x: 7000, y: -4000, z: -13550, rx: 0, ry: Math\.atan2\(-7000, -2600\) \}, // Turn diagonally towards CloveH2O"""
content = re.sub(timeline_block, "", content)

# Remove the component renders
components_block = r"""      <WormholeGeneric position=\{\[0, -4000, -11750\]\} rotation=\{\[Math\.PI/2, 0, 0\]\} length=\{2000\} color="#00ffcc" visible=\{activeZones\.w_orbital\} />

      <WorldOrbitalCommand position=\{\[0, -4000, -13550\]\} rotation=\{\[0, 0, 0\]\} visible=\{activeZones\.orbital\} />

      \{\/\* Lateral Wormhole to Drone Swarm \*\/\}
      <WormholeGeneric position=\{\[2000, -4000, -13550\]\} rotation=\{\[Math\.PI/2, -Math\.PI/2, 0\]\} length=\{2000\} color="#00ffff" speed=\{40\.0\} visible=\{activeZones\.w_swarm\} />

      <WorldDroneSwarm position=\{\[5000, -4000, -13550\]\} rotation=\{\[0, 0, 0\]\} visible=\{activeZones\.swarm\} />

      \{\/\* Lateral Wormhole to Autopilot \*\/\}
      <WormholeGeneric position=\{\[5500, -4000, -13550\]\} rotation=\{\[Math\.PI/2, -Math\.PI/2, 0\]\} length=\{1500\} color="#ff00ff" speed=\{40\.0\} visible=\{activeZones\.w_autopilot\} />

      <WorldAutopilot position=\{\[7500, -4000, -13550\]\} rotation=\{\[0, -Math\.PI/2, 0\]\} visible=\{activeZones\.autopilot\} />

      \{\/\* Diagonal return Wormhole to CloveH2O \*\/\}
      <WormholeGeneric position=\{\[3500, -4000, -14850\]\} rotation=\{\[Math\.PI/2, Math\.atan2\(7000, -2600\), 0\]\} length=\{3800\} color="#ff00ff" speed=\{40\.0\} visible=\{activeZones\.w_clove\} />"""
content = re.sub(components_block, 
"""      <WormholeGeneric position={[0, -4000, -11750]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#ff00ff" speed={40.0} visible={activeZones.w_clove} />""", content)

# Also fix the progress locks (remove orbitalLocked, swarmLocked, autopilotLocked)
content = re.sub(r"""    \} else if \(window\.orbitalLocked\) \{\n      progress = 0\.60; // Hard clamp for Orbital pause\n    \} else if \(window\.swarmLocked\) \{\n      progress = 0\.65; // Hard clamp for Swarm pause\n    \} else if \(window\.autopilotLocked\) \{\n      progress = 0\.68; // Hard clamp for Autopilot pause\n""", "", content)

# Adjust Legal Eagle framing (from my previous script)
# Wait, I already ran fix_timeline.py, so Legal Eagle should be -9950 now!
# Let me double check if it's applied

with open('src/pages/demo3d/TimelineManager.jsx', 'w') as f:
    f.write(content)
