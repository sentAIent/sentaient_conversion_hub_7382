import re

with open('src/pages/demo3d/TimelineManager.jsx', 'r') as f:
    content = f.read()

# Update SCROLL_TIMELINE
new_timeline = """
  // Legal Eagle (Center at Z=-10550)
  { p: 0.46, x: 0, y: -3980, z: -8750, rx: 0, ry: 0 }, 
  { p: 0.48, x: 0, y: -3980, z: -10550, rx: 0, ry: 0 }, // Arrive Legal Eagle
  { p: 0.51, x: 0, y: -3980, z: -10550, rx: 0, ry: 0 }, // PAUSE Legal Eagle
  { p: 0.53, x: 0, y: -3980, z: -11550, rx: 0, ry: 0 }, // Exit Legal Eagle
  
  // Autopilot Wormhole
  { p: 0.55, x: 0, y: -3980, z: -12550, rx: 0, ry: 0 }, 
  
  // Autopilot (Center at Z=-13550)
  { p: 0.57, x: 0, y: -3980, z: -13550, rx: 0, ry: 0 }, // Arrive Autopilot
  { p: 0.60, x: 0, y: -3980, z: -13550, rx: 0, ry: 0 }, // PAUSE Autopilot
  { p: 0.62, x: 0, y: -3980, z: -14550, rx: 0, ry: 0 }, // Exit Autopilot

  // CloveH2O Wormhole
  { p: 0.64, x: 0, y: -3980, z: -15550, rx: 0, ry: 0 }, 

  // CloveH2O (Center at Z=-16550)
  { p: 0.66, x: 0, y: -4000, z: -16550, rx: 0, ry: 0 }, // Arrive CloveH2O
  { p: 0.72, x: 0, y: -4000, z: -16550, rx: 0, ry: 0 }, // PAUSE CloveH2O
"""
content = re.sub(r'  // Legal Eagle \(Center at Z=-10250\).*?// PAUSE CloveH2O', new_timeline.strip(), content, flags=re.DOTALL)

# Update window.autopilotLocked
lock_code = """
    } else if (window.interstellarLocked) {
      progress = 0.42; // Hard clamp for Interstellar pause
    } else if (window.autopilotLocked) {
      progress = 0.585; // Hard clamp for Autopilot pause
    } else if (window.contangoLocked) {
"""
content = content.replace("    } else if (window.interstellarLocked) {\n      progress = 0.42; // Hard clamp for Interstellar pause\n    } else if (window.contangoLocked) {", lock_code.strip('\n'))

# Update newZones
new_zones = """
    const newZones = {
      intro: p < 0.08,
      mindwave: p > 0.04 && p < 0.18,
      wormhole_ice: p > 0.10 && p < 0.25,
      icebreaker: p > 0.18 && p < 0.35, 
      wormhole_sound: p > 0.28 && p < 0.42,
      interstellar: p > 0.28 && p < 0.48, 
      w_legal: p > 0.43 && p < 0.54,
      legal: p > 0.46 && p < 0.55,
      w_autopilot: p > 0.52 && p < 0.59,
      autopilot: p > 0.55 && p < 0.63,
      w_clove: p > 0.61 && p < 0.67,
      clove: p > 0.64 && p < 0.76,
      w_fantasy: p > 0.71 && p < 0.83,
      fantasy: p > 0.73 && p < 0.88,
      w_contango: p > 0.84 && p < 0.91,
      contango: p > 0.89 && p < 0.96,
      sentaient: p > 0.94,
    };
"""
content = re.sub(r'    const newZones = \{.*?\};', new_zones.strip('\n'), content, flags=re.DOTALL)

# Re-insert Autopilot into JSX
jsx = """
      <LegalEagle position={[0, -4000, -10550]} rotation={[0, 0, 0]} visible={activeZones.legal} />

      <WormholeGeneric position={[0, -4000, -12050]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#00ffff" speed={40.0} visible={activeZones.w_autopilot} />

      <WorldAutopilot position={[0, -4000, -13550]} rotation={[0, 0, 0]} visible={activeZones.autopilot} />

      <WormholeGeneric position={[0, -4000, -15050]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#ff00ff" speed={40.0} visible={activeZones.w_clove} />

      <WorldCloveH2O position={[0, -4000, -16550]} rotation={[0, 0, 0]} visible={activeZones.clove} />
"""
content = re.sub(r'      <LegalEagle position=\{\[0, -4000, -10550\]\} rotation=\{\[0, 0, 0\]\} visible=\{activeZones\.legal\} />.*?<WorldCloveH2O position=\{\[0, -4000, -16550\]\} rotation=\{\[0, 0, 0\]\} visible=\{activeZones\.clove\} />', jsx.strip('\n'), content, flags=re.DOTALL)

# Add import for WorldAutopilot if missing
if 'WorldAutopilot' not in content[:content.find('export const')]:
    content = content.replace("import WorldIcebreaker from './worlds/WorldIcebreaker';", "import WorldIcebreaker from './worlds/WorldIcebreaker';\nimport WorldAutopilot from './worlds/WorldAutopilot';")


with open('src/pages/demo3d/TimelineManager.jsx', 'w') as f:
    f.write(content)

print("Timeline patched.")
