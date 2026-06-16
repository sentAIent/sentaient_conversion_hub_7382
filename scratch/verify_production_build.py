import os
import re

dist_path = "dist/mindwave.html"
if not os.path.exists(dist_path):
    print("Error: dist/mindwave.html does not exist!")
    exit(1)

with open(dist_path, 'r', errors='ignore') as f:
    content = f.read()

print(f"=== Auditing {dist_path} ===")
print(f"File size: {len(content)} bytes")

# Check scripts
scripts = re.findall(r'<script\s+[^>]*src="([^"]*)"[^>]*>', content)
print(f"References to scripts: {scripts}")

# Check css
css = re.findall(r'<link\s+[^>]*href="([^"]*)"[^>]*>', content)
print(f"References to CSS: {css}")

# Check 28 Cymatic fractal buttons
patterns = [
    "Sri Yantra", "Flower Life", "Metatron", "Vector Eq", "Fibonacci",
    "Torus Fld", "Mandelbrot", "Julia Loop", "Recursive", "Polygon",
    "Lattice", "Star Gate"
]
found_patterns = []
for p in patterns:
    if p in content:
        found_patterns.append(p)
print(f"Cymatic patterns found: {len(found_patterns)}/{len(patterns)}")
print(f"Patterns present: {found_patterns}")

# Check mediums
mediums = ["H2O", "SiO2", "Ether", "Ice"]
found_mediums = [m for m in mediums if m in content]
print(f"Mediums found: {found_mediums}")

# Check DJ pads/mixer
dj_pads = "triggerDjSound" in content
pioneer_mixer = "djHoldBtn" in content or "djClearBtn" in content
print(f"DJ pads: {dj_pads}")
print(f"Pioneer mixer: {pioneer_mixer}")

# Check themes
theme_gallery = "Theme Gallery" in content
print(f"Theme gallery: {theme_gallery}")
