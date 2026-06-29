import re

file_path = "binaural-assets/js/visuals/visualizer_v4.js"
with open(file_path, "r") as f:
    content = f.read()

# Adjust the tsunami mesh position
old_pos = """        mesh.position.y = -50; // Push it WAY down so the huge wave crest is centered on screen, not towering over us
        mesh.position.z = -120; // pushed back so the camera isn't inside it
        mesh.position.x = 20; // Shift it slightly right so the Kanagawa hook curls perfectly into the center"""
new_pos = """        mesh.position.y = -50; // Push it WAY down so the huge wave crest is centered on screen, not towering over us
        mesh.position.z = -120; // pushed back so the camera isn't inside it
        mesh.position.x = -70; // Shift it left per user request"""

if old_pos in content:
    content = content.replace(old_pos, new_pos)
    with open(file_path, "w") as f:
        f.write(content)
    print("Patched tsunami x position.")
else:
    print("Could not find old_pos.")

