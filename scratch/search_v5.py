with open('public/binaural-assets/js/visuals/visualizer_nuclear_v5.js', 'r', errors='ignore') as f:
    content = f.read()

lines = content.split('\n')
print("Total lines in v5:", len(lines))

import re
matches = [i for i, line in enumerate(lines) if 'cymatics' in line.lower() or 'cymatic' in line.lower()]
print("Matching lines count in v5:", len(matches))
for idx in matches[:50]:
    print(f"{idx+1}: {lines[idx].strip()}")
