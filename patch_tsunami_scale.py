import re

file_path = "binaural-assets/js/visuals/visualizer_v4.js"
with open(file_path, "r") as f:
    content = f.read()

# Adjust the tsunami mesh position
old_pos = """        this.tsunamiWave.rotation.x = -Math.PI / 2;
        this.tsunamiWave.position.y = -50; 
        this.tsunamiWave.position.z = -120; 
        this.tsunamiWave.position.x = -70;"""

new_pos = """        this.tsunamiWave.rotation.x = -Math.PI / 2;
        this.tsunamiWave.position.y = -15; 
        this.tsunamiWave.position.z = -120; 
        this.tsunamiWave.position.x = 0;
        this.tsunamiWave.frustumCulled = false;
"""

if old_pos in content:
    content = content.replace(old_pos, new_pos)
    with open(file_path, "w") as f:
        f.write(content)
    print("Patched tsunami scale/position.")
else:
    print("Could not find old_pos.")
