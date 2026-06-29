import re

file_path = "binaural-assets/js/visuals/visualizer_v4.js"
with open(file_path, "r") as f:
    content = f.read()

# Remove the extension directive from the fragment shader
old_str = "            #extension GL_OES_standard_derivatives : enable"
new_str = ""

if old_str in content:
    content = content.replace(old_str, new_str)
    with open(file_path, "w") as f:
        f.write(content)
    print("Patched visualizer_v4.js - removed #extension GL_OES_standard_derivatives")
else:
    print("Could not find the extension directive in visualizer_v4.js")

