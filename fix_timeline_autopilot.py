import re

with open('src/pages/demo3d/TimelineManager.jsx', 'r') as f:
    content = f.read()

# I want to insert Autopilot after Legal Eagle
# Current jump is from 0.55 (Exit Legal Eagle, z=-11250) to 0.705 (Arrive CloveH2O, z=-16150)
# We can put Autopilot at z=-13550 (p: 0.62)

import_str = "import WorldAutopilot from './worlds/WorldAutopilot';\nimport WormholeGeneric from './wormholes/WormholeGeneric';\n"
content = re.sub(r"(import WorldIcebreaker from '\./worlds/WorldIcebreaker';)", import_str + r"\1", content)

timeline_insert = """  // Autopilot (Center at Z=-13550)
  { p: 0.60, x: 0, y: -4000, z: -13150, rx: 0, ry: 0 }, // Arrive Autopilot
  { p: 0.62, x: 0, y: -4000, z: -13150, rx: 0, ry: 0 }, // PAUSE Autopilot
  { p: 0.65, x: 0, y: -4000, z: -14550, rx: 0, ry: 0 }, // Exit Autopilot

"""

content = re.sub(r"(  \{ p: 0\.55, x: 0, y: -3980, z: -11250, rx: 0, ry: 0 \}, // Exit Legal Eagle\n  \n)", r"\1" + timeline_insert, content)

component_insert = """      <WormholeGeneric position={[0, -4000, -12350]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#ff00ff" speed={40.0} visible={activeZones.w_clove} />
      <WorldAutopilot position={[0, -4000, -13550]} rotation={[0, 0, 0]} visible={true} />
"""
content = re.sub(r"(      <LegalEagle position=\{\[0, -4000, -10550\]\} rotation=\{\[0, 0, 0\]\} visible=\{activeZones\.legal\} />\n\n)", r"\1" + component_insert, content)

with open('src/pages/demo3d/TimelineManager.jsx', 'w') as f:
    f.write(content)
