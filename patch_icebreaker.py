import re

with open('src/pages/demo3d/worlds/WorldIcebreaker.jsx', 'r') as f:
    content = f.read()

# Change startZ from 1000 to 1550
content = content.replace("const startZ = 1000;", "const startZ = 1550;")

with open('src/pages/demo3d/worlds/WorldIcebreaker.jsx', 'w') as f:
    f.write(content)

print("Icebreaker patched.")
