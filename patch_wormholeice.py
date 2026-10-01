import re

with open('src/pages/demo3d/wormholes/WormholeIce.jsx', 'r') as f:
    content = f.read()

# Change radius to 120
content = content.replace("args={[60, 400, length + 200, 32, 64, true]}", "args={[120, 120, length + 200, 32, 64, true]}")

with open('src/pages/demo3d/wormholes/WormholeIce.jsx', 'w') as f:
    f.write(content)

print("WormholeIce patched.")
