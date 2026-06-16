import re

with open('mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the dead cymaticsFloatingPanel (it's between <div id="cymaticsFloatingPanel" and its closing tag)
# The panel starts at <div id="cymaticsFloatingPanel" and ends at </div> <!-- Close center panel -->
# We need to be careful with regex, let's just find the start and end indices.
start_idx = html.find('<div id="cymaticsFloatingPanel"')
end_idx = html.find('</div> <!-- Close center panel -->')
if start_idx != -1 and end_idx != -1:
    html = html[:start_idx] + html[end_idx:]

# 2. Polish the Cymatics headers
# Premium 3D Environments -> Masterwork 3D Architecture
html = html.replace('>Premium 3D Environments<', '>Masterwork 3D Architecture<')
html = html.replace('>Class XXII: Image-Driven Cymatics<', '>Masterwork Resonance Portraits<')
html = html.replace('>Class XXI: 3D Raymarched Prototypes<', '>Quantum Raymarched Architectures<')
html = html.replace('>Class XX: Mathematical Prototypes<', '>Sacred Geometry Mathematics<')

# For the rest of the classes (I to XIX), remove the "Class X: " prefix to make it elegant.
def clean_class_names(match):
    full_text = match.group(0)
    # Extracts the descriptive name, e.g., "Fractal Interference" from "Class I: Fractal Interference"
    new_text = re.sub(r'Class [IVX]+: ', '', full_text)
    return new_text

html = re.sub(r'>Class [IVX]+: [^<]+<', clean_class_names, html)

with open('mindwave.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Cymatics UI polished.")
