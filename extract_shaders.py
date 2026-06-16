import re

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js = f.read()

vs_match = re.search(r'vertexShader:\s*`([^`]+)`', js)
fs_match = re.search(r'fragmentShader:\s*`([^`]+)`', js)

if vs_match:
    with open('vs.glsl', 'w') as f:
        f.write(vs_match.group(1))

if fs_match:
    with open('fs.glsl', 'w') as f:
        f.write(fs_match.group(1))

print("Shaders extracted.")
