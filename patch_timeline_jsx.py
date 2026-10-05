import re

with open('src/pages/demo3d/TimelineManager.jsx', 'r') as f:
    content = f.read()

# Remove the components from JSX
content = re.sub(r"<WormholeGeneric position={\[0, -4000, -11750\].*?visible={activeZones\.w_orbital} />\n", "", content)
content = re.sub(r"<WorldOrbitalCommand position={\[0, -4000, -13550\].*?visible={activeZones\.orbital} />\n", "", content)
content = re.sub(r"<WormholeGeneric position={\[2000, -4000, -13550\].*?visible={activeZones\.w_swarm} />\n", "", content)
content = re.sub(r"<WorldDroneSwarm position={\[5000, -4000, -13550\].*?visible={activeZones\.swarm} />\n", "", content)
content = re.sub(r"{\/\* Lateral Wormhole to Autopilot \*\/}\n", "", content)
# We already removed Autopilot JSX in patch_timeline.py! Wait, let's just make sure.
content = re.sub(r"<WorldAutopilot.*?/>\n", "", content)
content = re.sub(r"<WormholeGeneric position={\[5500, -4000, -13550\].*?/>\n", "", content)
content = re.sub(r"{\/\* Diagonal return Wormhole to CloveH2O \*\/}\n", "", content)
content = re.sub(r"<WormholeGeneric position={\[3500, -4000, -14850\].*?/>\n", "", content)


with open('src/pages/demo3d/TimelineManager.jsx', 'w') as f:
    f.write(content)
