import re

with open('sphinx/sphinx-dashboard/src/components/SphinxMap.tsx', 'r') as f:
    content = f.read()

# 1. Remove the useEffect that sets legendScale
content = re.sub(r'const \[legendScale, setLegendScale\].*?\}, \[\]\);\n', '', content, flags=re.DOTALL)

# 2. Fix the inline style for the HUD container
content = content.replace(
    "style={{ width: isLegendCollapsed ? '8vw' : '22vw', transition: 'width 0.3s ease-in-out', transform: `scale(${legendScale})`, transformOrigin: 'top left' }}",
    "style={{ width: isLegendCollapsed ? 'clamp(64px, 8vw, 120px)' : 'clamp(240px, 22vw, 400px)', transition: 'width 0.3s ease-in-out' }}"
)

# 3. Replace all remaining `vw` classes in the HUD area with responsive tailwind or clamp.
# But it's easier to just do a smart regex over the whole file since `vw` is probably only used in the HUD and similar Overlays.
# Or just replace specific patterns:
# text-[1.2vw] -> text-[clamp(14px,1.2vw,24px)]
def replace_vw(match):
    val = float(match.group(1))
    # map vw to reasonable min/max pixels
    min_px = max(8, int(val * 10)) # e.g. 1vw -> 10px, 0.5vw -> 8px
    max_px = int(val * 24) # 1vw -> 24px
    return f"[clamp({min_px}px,{val}vw,{max_px}px)]"

# We only want to replace \[val vw\] inside className strings.
content = re.sub(r'\[([0-9\.]+)vw\]', replace_vw, content)

with open('sphinx/sphinx-dashboard/src/components/SphinxMap.tsx', 'w') as f:
    f.write(content)

