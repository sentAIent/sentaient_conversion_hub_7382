import re

file_path = "binaural-assets/js/visuals/visualizer_v4.js"
with open(file_path, "r") as f:
    content = f.read()

# Adjust the tsunami mesh position
old_pos = """        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -15; // floor level
        mesh.position.z = -120; // pushed back so the camera isn't inside it"""
new_pos = """        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -50; // Push it WAY down so the huge wave crest is centered on screen, not towering over us
        mesh.position.z = -120; // pushed back so the camera isn't inside it
        mesh.position.x = 20; // Shift it slightly right so the Kanagawa hook curls perfectly into the center
"""

if old_pos in content:
    content = content.replace(old_pos, new_pos)
    with open(file_path, "w") as f:
        f.write(content)
    print("Patched tsunami scale/position.")
else:
    print("Could not find old_pos.")

