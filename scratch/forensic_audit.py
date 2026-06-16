import os, re

with open("public_html_backup/mindwave-head.html", 'r', errors='ignore') as f:
    gold = f.read()

with open("public/mindwave.html", 'r', errors='ignore') as f:
    current = f.read()

print("=" * 60)
print("FORENSIC AUDIT: Gold Standard vs Current Live")
print("=" * 60)

# 1. Right panel
rp_gold = 'id="rightPanel"' in gold
rp_curr = 'id="rightPanel"' in current
print(f"\n--- RIGHT PANEL ---")
print(f"  Gold has rightPanel: {rp_gold}")
print(f"  Current has rightPanel: {rp_curr}")

# 2. Tab system
print("\n--- TAB SYSTEM ---")
for tab_id in ['tab-active', 'tab-visuals', 'tab-studio', 'tab-atmosphere', 'tab-atmos']:
    needle = f'id="{tab_id}"'
    g = needle in gold
    c = needle in current
    print(f"  {tab_id}: Gold={g}, Current={c}")

print(f"  switchRightTab calls: Gold={gold.count('switchRightTab')}, Current={current.count('switchRightTab')}")
print(f"  switchLeftTab calls: Gold={gold.count('switchLeftTab')}, Current={current.count('switchLeftTab')}")

# 3. Cymatics controls
print("\n--- CYMATICS CONTROLS ---")
controls = {
    'cymaticsColorPicker': 'Color Picker',
    'cymaticsHarmonicsSlider': 'Harmonics Slider',
    'cymaticsIntensitySlider': 'Intensity Slider',
    'cymaticsAutoRotate': 'Auto Rotate',
    'cymaticsResonanceSlider': 'Resonance Slider',
    'cymaticsEntropySlider': 'Entropy Slider',
    'cymaticsFlowSlider': 'Flow Slider',
    'setCymaticMedium': 'Medium Buttons',
    'selectCymaticPattern': 'Pattern Buttons',
}
for ctrl_id, name in controls.items():
    g = gold.count(ctrl_id)
    c = current.count(ctrl_id)
    status = "OK" if c >= g and c > 0 else ("PARTIAL" if c > 0 else "MISSING")
    print(f"  [{status}] {name} ({ctrl_id}): Gold={g}, Current={c}")

# 4. Visual mode panels
print("\n--- VISUAL MODE PANELS ---")
panels = [
    'galaxySettingsPanel', 'cyberSettingsPanel', 'matrixSettingsPanel',
    'snowflakeSettingsPanel', 'flowSettingsSidebar', 'lavaSettingsSidebar',
    'rainSettingsSidebar', 'zenSettingsSidebar', 'oceanSettingsSidebar'
]
for p in panels:
    needle = f'id="{p}"'
    g = needle in gold
    c = needle in current
    status = "OK" if c else ("MISSING" if g else "N/A")
    print(f"  [{status}] {p}: Gold={g}, Current={c}")

# 5. Studio section
print("\n--- STUDIO/DJ SECTION ---")
studio_items = ['sweep-btn', 'dj-pad', 'startSweepPreset', 'triggerDjSound']
for item in studio_items:
    g = gold.count(item)
    c = current.count(item)
    status = "OK" if c >= g and c > 0 else ("PARTIAL" if c > 0 else "MISSING")
    print(f"  [{status}] {item}: Gold={g}, Current={c}")

# 6. Atmosphere section
print("\n--- ATMOSPHERE SECTION ---")
atmos_items = ['storyVolumeSlider', 'classicalVolumeSlider', 'soundscape-btn', 'customAudioSlider']
for item in atmos_items:
    g = gold.count(item)
    c = current.count(item)
    status = "OK" if c >= g and c > 0 else ("PARTIAL" if c > 0 else "MISSING")
    print(f"  [{status}] {item}: Gold={g}, Current={c}")

# 7. Key structural differences
print("\n--- STRUCTURAL ---")
print(f"  toggleMixerSection: Gold={gold.count('toggleMixerSection')}, Current={current.count('toggleMixerSection')}")
print(f"  sidebar-section: Gold={gold.count('sidebar-section')}, Current={current.count('sidebar-section')}")
print(f"  tab-panel: Gold={gold.count('tab-panel')}, Current={current.count('tab-panel')}")
print(f"  tab-pill: Gold={gold.count('tab-pill')}, Current={current.count('tab-pill')}")

# 8. File sizes
print("\n--- FILE SIZES ---")
print(f"  Gold: {len(gold)} bytes, {gold.count(chr(10))} lines")
print(f"  Current: {len(current)} bytes, {current.count(chr(10))} lines")

# 9. Extract gold right panel tabs
print("\n--- GOLD RIGHT PANEL TAB BUTTONS ---")
rp_idx = gold.find('id="rightPanel"')
if rp_idx > -1:
    rp_chunk = gold[rp_idx:rp_idx+5000]
    for m in re.finditer(r'onclick="[^"]*"[^>]*>([^<]+)<', rp_chunk):
        print(f"  Tab button: {m.group(1).strip()}")

print("\n--- CURRENT RIGHT PANEL TAB BUTTONS ---")
rp_idx_c = current.find('id="rightPanel"')
if rp_idx_c > -1:
    rp_chunk_c = current[rp_idx_c:rp_idx_c+5000]
    for m in re.finditer(r'onclick="[^"]*"[^>]*>([^<]+)<', rp_chunk_c):
        print(f"  Tab button: {m.group(1).strip()}")

# 10. Gold vs Current: what sections exist in the right panel
print("\n--- GOLD RIGHT PANEL data-section values ---")
rp_full = gold[rp_idx:rp_idx+30000] if rp_idx > -1 else ""
for m in re.finditer(r'data-section="([^"]+)"', rp_full):
    print(f"  {m.group(1)}")

print("\n--- CURRENT RIGHT PANEL data-section values ---")
rp_full_c = current[rp_idx_c:rp_idx_c+30000] if rp_idx_c > -1 else ""
for m in re.finditer(r'data-section="([^"]+)"', rp_full_c):
    print(f"  {m.group(1)}")

# 11. THE KEY QUESTION: Does the gold standard have TABS or a single scrollable panel?
print("\n--- ARCHITECTURE DIFFERENCE ---")
gold_has_tabs = 'switchRightTab' in gold
current_has_tabs = 'switchRightTab' in current
print(f"  Gold uses tab system: {gold_has_tabs}")
print(f"  Current uses tab system: {current_has_tabs}")
if not gold_has_tabs:
    print("  >>> GOLD STANDARD IS A SINGLE SCROLLABLE PANEL (no tabs)!")
    print("  >>> Current version has tabs that DIDN'T EXIST in the gold version!")
