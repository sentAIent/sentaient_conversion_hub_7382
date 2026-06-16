with open('public/binaural-assets/js/visuals/visualizer_nuclear_v4.js', 'r', errors='ignore') as f:
    content = f.read()

import re
matches = re.search(r"static get CYMATIC_PATTERNS\(\)\s*\{([\s\S]*?)\}", content)
if matches:
    print(matches.group(1).strip())
else:
    print("Not found")
