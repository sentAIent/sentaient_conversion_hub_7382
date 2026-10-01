import re

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'r') as f:
    content = f.read()

# 1. Remove RollercoasterTrack component rendering
content = content.replace('<RollercoasterTrack />', '')

# 2. Remove turbulence from RollercoasterCarAndHUD
content = re.sub(r'      // Add slight turbulence to the car\n.*?rigRef\.current\.position\.z \+= turbulenceZ;', '', content, flags=re.DOTALL)

# 3. Increase candlesticks
content = content.replace('length: 300', 'length: 800')
content = content.replace('z: (Math.random() - 0.5) * 6000', 'z: (Math.random() - 0.5) * 12000')
content = content.replace('if (group.position.z > 1000) group.position.z -= 6000;', 'if (group.position.z > 2000) group.position.z -= 12000;')

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'w') as f:
    f.write(content)

print("Contango patched v2.")
