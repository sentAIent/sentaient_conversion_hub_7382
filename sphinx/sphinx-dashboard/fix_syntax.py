with open("src/components/SphinxMap.tsx", "r") as f:
    content = f.read()

bad_str = r"style={{ transform: \`scale(\${legendScale})\`, transformOrigin: 'top left', width: isLegendCollapsed ? '130px' : '380px', transition: 'width 0.3s ease-in-out' }}"

if bad_str in content:
    content = content.replace(bad_str, "style={{ width: isLegendCollapsed ? 'clamp(100px, 8vw, 130px)' : 'clamp(280px, 25vw, 380px)', fontSize: 'clamp(10px, 1vw, 14px)', transition: 'width 0.3s ease-in-out' }}")
else:
    print("Could not find exact string. Attempting fallback replace...")
    import re
    content = re.sub(r'style=\{\{ transform: \\`scale\(\\\$\{legendScale\}\)\\`,[^}]+\}\}', "style={{ width: isLegendCollapsed ? 'clamp(100px, 8vw, 130px)' : 'clamp(280px, 25vw, 380px)', fontSize: 'clamp(10px, 1vw, 14px)', transition: 'width 0.3s ease-in-out' }}", content)

with open("src/components/SphinxMap.tsx", "w") as f:
    f.write(content)

print("Done")
