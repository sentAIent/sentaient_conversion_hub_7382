import re

with open("/Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/recovered_map.txt", "r") as f:
    orig = f.read()

with open("/Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/collapse_legend.js", "r") as f:
    legend_js = f.read()

newhud_start = legend_js.find('const newHud = `') + 16
newhud_end = legend_js.find('`;', newhud_start)
new_hud = legend_js[newhud_start:newhud_end]

# In orig, find where the HUD starts
hud_start = orig.find('{/* SPHINX OS HUD */}')
# Find where the Map starts
map_start = orig.find('<Map', hud_start)

# The new content should be:
content = orig[:hud_start] + new_hud + "\n" + orig[map_start:]

# Unescape specific backticks
content = content.replace(r"\`", "`")

# Re-apply transform scale patch
content = re.sub(r'style=\{\{ transform: \\`scale\(\\\$\{legendScale\}\)\\`,[^}]+\}\}', 
                 "style={{ width: isLegendCollapsed ? 'clamp(100px, 8vw, 130px)' : 'clamp(280px, 25vw, 380px)', fontSize: 'clamp(10px, 1vw, 14px)', transition: 'width 0.3s ease-in-out' }}", 
                 content)

with open("src/components/SphinxMap.tsx", "w") as f:
    f.write(content)
print("Done fixing map properly.")
