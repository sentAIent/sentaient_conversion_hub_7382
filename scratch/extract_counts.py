import re

with open('binaural-assets/js/visuals/CymaticsCore_v4.js', 'r') as f:
    code = f.read()

# We look for lines that look like `        [0x..., 0x...],`
class_counts = {}
current_class = None

lines = code.split('\n')
for line in lines:
    m = re.match(r'^\s*(\d+):\s*\[', line)
    if m:
        current_class = int(m.group(1))
        class_counts[current_class] = 0
    elif current_class is not None:
        if line.strip().startswith(']') and line.strip() in [']', '],']:
            pass
        elif re.match(r'^\s*\[0x', line):
            class_counts[current_class] += 1
        elif 'PROCEDURAL_CLASSES' in line:
            break

for cls, count in class_counts.items():
    print(f"Class {cls}: {count} variations")

