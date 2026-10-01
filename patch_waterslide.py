import re

with open('src/pages/demo3d/wormholes/WormholeWaterslide.jsx', 'r') as f:
    content = f.read()

# Let's ensure the canvas texture is extremely blue, and update the material to be vividly blue
content = content.replace("color=\"#00ffff\"", "color=\"#0044ff\"")
content = content.replace("emissive=\"#0088ff\"", "emissive=\"#0044ff\"")
content = content.replace("emissiveIntensity={1.5}", "emissiveIntensity={3.0}")
content = content.replace("opacity={0.15}", "opacity={0.4}") # Make rings more visible

with open('src/pages/demo3d/wormholes/WormholeWaterslide.jsx', 'w') as f:
    f.write(content)

print("Waterslide patched.")
