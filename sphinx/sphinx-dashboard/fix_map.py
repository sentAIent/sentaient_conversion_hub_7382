import sys

# I will write a script to take the 232 line file, and expand the HUD to the 17kb version, 
# and add the hollow polygon Mapbox layers back.

with open("src/components/SphinxMap.tsx", "r") as f:
    content = f.read()

hud_start = content.find('<div \n        style={{ \n          width: isLegendCollapsed')
if hud_start == -1:
    print("Cannot find HUD start")
    sys.exit(1)

hud_end = content.find('</Map>', hud_start)
if hud_end == -1:
    print("Cannot find HUD end")
    sys.exit(1)

with open("/Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/collapse_legend.js", "r") as f:
    legend_js = f.read()

# Extract newHud from collapse_legend.js
newhud_start = legend_js.find('const newHud = `') + 16
newhud_end = legend_js.find('`;', newhud_start)
new_hud = legend_js[newhud_start:newhud_end]

# Combine
new_content = content[:hud_start] + new_hud + "\n      " + content[hud_end:]

with open("src/components/SphinxMap.tsx", "w") as f:
    f.write(new_content)
print("Rebuilt HUD.")
