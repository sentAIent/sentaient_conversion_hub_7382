with open('src/pages/demo3d/TimelineManager.jsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "import WormholeGeneric" in line:
        continue
    new_lines.append(line)

# Add one at the top
new_lines.insert(8, "import WormholeGeneric from './wormholes/WormholeGeneric';\n")

with open('src/pages/demo3d/TimelineManager.jsx', 'w') as f:
    f.writelines(new_lines)
