import re

with open('public/mindwave.html', 'r') as f:
    html = f.read()

with open('scratch/old_mindwave.html', 'r') as f:
    old_html = f.read()

# 1. Extract Visuals
visual_btns_match = re.search(r'(<!-- SPHERE -->.*?)<!-- CYMATICS', old_html, re.DOTALL)
if visual_btns_match:
    cymatics_btn = re.search(r'(<button id="cymaticsBtn".*?</button>)', old_html, re.DOTALL).group(1)
    visual_btns = visual_btns_match.group(1) + cymatics_btn
    
    # Replace the existing visuals Tab grid
    old_grid_pattern = r'<div id="visualsTabGrid" class="grid grid-cols-3 gap-2">.*?</div>\n                </section>'
    new_grid = f'<div id="visualsTabGrid" class="grid grid-cols-4 gap-2">\n{visual_btns}\n</div>\n                </section>'
    html = re.sub(old_grid_pattern, new_grid, html, flags=re.DOTALL)

# 2. Extract Brain Waves & Healing
bw_match = re.search(r'(<div class="py-2 flex items-center justify-center shrink-0">\n\s*<div class="h-px w-full bg-white/10"></div>\n\s*<span\n\s*class="px-2 text-\[10px\] font-bold text-\[var\(--accent\)\] tracking-widest bg-\[#0f172a\]/0 whitespace-nowrap">BRAIN\n\s*WAVES</span>.*?<!-- Ambience Combos - 2 Column Grid -->\n\s*<div class="grid grid-cols-2 gap-1\.5 shrink-0">)', old_html, re.DOTALL)

if bw_match:
    # We want everything from Brain waves to the end of Healing
    # Let's be more precise
    bw_start = old_html.find('<div class="py-2 flex items-center justify-center shrink-0">')
    bw_end = old_html.find('<!-- Ambience Combos - 2 Column Grid -->')
    bw_content = old_html[bw_start:bw_end]
    
    # Inject into leftTabFreq
    inject_target = r'(<div id="leftTabFreq" class="p-6 space-y-8 block tab-content">\n\s*<section class="mixer-section">)'
    html = re.sub(inject_target, f'\\1\n{bw_content}\n', html)

# 3. Extract Ambience
ambience_start = old_html.find('<div class="py-2 flex items-center justify-center shrink-0">\n                <div class="h-px w-full bg-white/10"></div>\n                <span\n                    class="px-2 text-[10px] font-bold text-[var(--accent)] tracking-widest bg-[#0f172a]/0">AMBIENCE</span>')
ambience_end = old_html.find('<!-- Saved Mixes Link -->')
ambience_content = old_html[ambience_start:ambience_end]

if ambience_content:
    # Inject into leftTabEnv at the top
    inject_target = r'(<div id="leftTabEnv" class="hidden p-6 space-y-8 tab-content">)'
    html = re.sub(inject_target, f'\\1\n{ambience_content}\n', html)

# 4. Extract Journeys
journeys_start = old_html.find('<section class="mixer-section" data-section="journeys">')
journeys_end = old_html.find('<!-- DJ PADS (Pioneer XDJ-style) -->')
journeys_content = old_html[journeys_start:journeys_end]

if journeys_content:
    # Inject into leftTabFreq at the bottom
    inject_target = r'(</section>\n\s*</div>\n\s*<!-- TAB: BIO \(SOUNDSCAPES & STORIES\) -->)'
    html = re.sub(inject_target, f'</section>\n{journeys_content}\n</div>\n                <!-- TAB: BIO (SOUNDSCAPES & STORIES) -->', html)


with open('public/mindwave.html', 'w') as f:
    f.write(html)
    
print("Patch completed successfully.")
