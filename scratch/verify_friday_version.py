import os
import re

friday_path = "mindwave-friday.html"
if not os.path.exists(friday_path):
    print("Error: mindwave-friday.html does not exist!")
    exit(1)

with open(friday_path, 'r', errors='ignore') as f:
    content = f.read()

print(f"=== Auditing {friday_path} ===")
print(f"File size: {len(content)} bytes")

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

# Check themes
theme_gallery = "Theme Gallery" in content
print(f"Theme gallery: {theme_gallery}")
