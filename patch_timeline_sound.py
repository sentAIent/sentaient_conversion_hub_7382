import re

with open('src/pages/demo3d/TimelineManager.jsx', 'r') as f:
    content = f.read()

# Insert the missing wormhole between Icebreaker and Interstellar
wormhole = """
      {/* Icebreaker Cavern */}
      <WorldIcebreaker position={[0, -4000, -2550]} visible={activeZones.icebreaker} />
      
      <WormholeGeneric position={[0, -4000, -5050]} rotation={[Math.PI/2, 0, 0]} length={3500} color="#ff00ff" speed={20.0} visible={activeZones.wormhole_sound} />

      {/* Interstellar */}
"""
content = content.replace("      {/* Icebreaker Cavern */}\n      <WorldIcebreaker position={[0, -4000, -2550]} visible={activeZones.icebreaker} />\n      \n      {/* Interstellar */}", wormhole.strip('\n'))

with open('src/pages/demo3d/TimelineManager.jsx', 'w') as f:
    f.write(content)

print("Timeline patched with wormhole_sound.")
