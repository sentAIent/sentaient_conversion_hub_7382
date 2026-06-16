import re

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js = f.read()

fs_matches = re.findall(r'fragmentShader:\s*`([^`]+)`', js)

for i, m in enumerate(fs_matches):
    with open(f'fs_{i}.glsl', 'w') as f:
        f.write(m)

print(f"Extracted {len(fs_matches)} fragment shaders.")
