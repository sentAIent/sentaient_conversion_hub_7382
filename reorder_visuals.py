import re

with open("mindwave.html", "r") as f:
    content = f.read()

dock_start_match = re.search(r'<div[^>]*id="visualDock"[^>]*>', content)
if not dock_start_match:
    print("Could not find visualDock")
    exit(1)
start_idx = dock_start_match.end()

end_idx = content.find('</div>\n<!-- SECTION: Optics -->', start_idx)
if end_idx == -1:
    print("Could not find end of visualDock")
    exit(1)

dock_content = content[start_idx:end_idx]

style_match = re.search(r'<style>.*?</style>', dock_content, re.DOTALL)
style_block = style_match.group(0) if style_match else ""

# Extract all buttons. Look for <button ... id="...Btn"> ... </button>
# including preceding comments
button_blocks = {}
button_pattern = r'((?:<!--.*?-->\s*)*<button[^>]*id="([^"]+)"[^>]*>.*?</button>)'
matches = re.finditer(button_pattern, dock_content, re.DOTALL)

for m in matches:
    full_text = m.group(1)
    btn_id = m.group(2)
    
    name = ""
    if btn_id == "cyberBtn": name = "Cyber"
    elif btn_id == "matrixBtn": name = "Matrix"
    elif btn_id == "snowflakeBtn": name = "Snow"
    elif btn_id == "oceanBtn": name = "Ocean"
    elif btn_id == "dragonBtn": name = "Dragon"
    elif btn_id == "galaxyBtn": name = "Galaxy"
    elif btn_id == "flowBtn": name = "Flow"
    elif btn_id == "rainBtn": name = "Rain"
    elif btn_id == "zenBtn": name = "Zen"
    elif btn_id == "mandalaBtn": name = "Mandala"
    elif btn_id == "cubeBtn": name = "Cube"
    elif btn_id == "sphereBtn": name = "Sphere"
    elif btn_id == "lavaBtn": name = "Lava"
    elif btn_id == "fireplaceBtn": name = "Fire"
    elif btn_id == "lightspeedBtn": name = "Warp"
    
    if name:
        button_blocks[name] = full_text
    else:
        print(f"Unknown button ID: {btn_id}")

order = [
    "Cyber", "Matrix",
    "Snow", "Ocean",
    "Dragon", "Galaxy",
    "Flow", "Rain",
    "Zen", "Mandala",
    "Cube", "Sphere",
    "Lava", "Fire",
    "Warp"
]

new_dock_content = "\n" + style_block + "\n"
for name in order:
    if name in button_blocks:
        new_dock_content += button_blocks[name] + "\n"
    else:
        print(f"Warning: {name} button not found!")

# Verify we got all buttons
if len(button_blocks) != len(order):
    print("Mismatch in button count!")
    for name in order:
        if name not in button_blocks: print(f"Missing: {name}")

new_full_content = content[:start_idx] + new_dock_content + content[end_idx:]

with open("mindwave.html", "w") as f:
    f.write(new_full_content)

print("Visuals reordered successfully.")
