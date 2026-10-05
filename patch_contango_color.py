import re

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'r') as f:
    content = f.read()

old_hud = """
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -2, 0]} fontSize={6} color="#ffffff" anchorX="center" outlineWidth={0.05} outlineColor="#000000">
          CONTANGO QUANT
        </Text>
        
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -9, 0]} fontSize={3} color="#00ffff" anchorX="center" opacity={0.9} transparent>
          Quant Trading Systems
        </Text>
"""

new_hud = """
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -2, 0]} fontSize={6} color="#ffffff" anchorX="center" outlineWidth={0.05} outlineColor="#000000">
          CONTANGO QUANT
        </Text>
        
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -9, 0]} fontSize={3} color="#ffffff" anchorX="center" opacity={0.9} transparent>
          Quant Trading Systems
        </Text>
"""

content = content.replace(old_hud.strip('\n'), new_hud.strip('\n'))

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'w') as f:
    f.write(content)

print("Text Color Patched.")
