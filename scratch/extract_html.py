import re

with open('scratch/old_mindwave.html', 'r') as f:
    content = f.read()

def get_block(start_marker, end_marker):
    start_idx = content.find(start_marker)
    if start_idx == -1: return ""
    end_idx = content.find(end_marker, start_idx)
    return content[start_idx:end_idx + len(end_marker)]

visual_btns = get_block('<!-- SPHERE -->', '<!-- CYMATICS 〜 Sacred geometry engine -->\n                    <button id="cymaticsBtn"')
# Need to get the full cymatics button
cymatics_end = content.find('</button>', content.find('id="cymaticsBtn"')) + 9
visual_btns = content[content.find('<!-- SPHERE -->'):cymatics_end]

brain_waves = content[content.find('<!-- 2-Column Grid for Brain Waves -->'):content.find('<!-- Healing Group - 2 Column Grid -->')]
healing = content[content.find('<!-- Healing Group - 2 Column Grid -->'):content.find('<!-- Ambience Combos - 2 Column Grid -->')]
ambience = content[content.find('<!-- Ambience Combos - 2 Column Grid -->'):content.find('<!-- Saved Mixes Link -->')]
journeys = content[content.find('class="grid grid-cols-2 gap-2"'):content.find('<button id="stopSweepBtn"')]
# wait journeys had `<div class="grid grid-cols-2 gap-2">`

with open('scratch/extracted.html', 'w') as f:
    f.write(f"=== VISUAL BTNS ===\n{visual_btns}\n\n=== BRAIN WAVES ===\n{brain_waves}\n\n=== HEALING ===\n{healing}\n\n=== AMBIENCE ===\n{ambience}\n\n=== JOURNEYS ===\n{journeys}")
