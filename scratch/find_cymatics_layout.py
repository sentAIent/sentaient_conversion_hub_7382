with open('public/binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r', errors='ignore') as f:
    content = f.read()

import re
patterns = re.findall(r"\{ name:.*\}", content)
print("Found patterns in gold sync:")
for p in patterns:
    print(p)
