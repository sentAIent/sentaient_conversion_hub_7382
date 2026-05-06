import re

with open('mindwave.html', 'r') as f:
    html = f.read()

# 1. Standardize ALL py-4 relative / py-4 glass-pill buttons to use h-[50px]
# First, the glass-btn ones
html = re.sub(
    r'class="glass-btn flex flex-col items-center justify-center py-4 relative"',
    r'class="preset-btn flex flex-col items-center justify-center glass-pill border border-white/5 hover:bg-white/10 hover:border-[var(--accent)] transition-all group relative h-[50px]"',
    html
)

# Next, the preset-btn ones that have py-4
html = re.sub(
    r'class="preset-btn (.*?) py-4"',
    r'class="preset-btn \1 h-[50px]"',
    html
)

# 2. Fix Ambience Combos emojis: move them inline
# We look for <span class="text-sm">EMOJI</span> and move it inside the title.
def fix_ambience_combo(match):
    full_match = match.group(0)
    # Extract the emoji
    emoji_match = re.search(r'<span class="text-sm">(.*?)</span>\s*<span([^>]+)>(.*?)</span>', full_match, re.DOTALL)
    if emoji_match:
        emoji = emoji_match.group(1).strip()
        span_attrs = emoji_match.group(2)
        title = emoji_match.group(3).strip()
        
        # Replace the multi-line block with a single line
        replacement = f'<span{span_attrs}><span class="mr-1">{emoji}</span>{title}</span>'
        return re.sub(r'<span class="text-sm">.*?</span>\s*<span[^>]+>.*?</span>', replacement, full_match, flags=re.DOTALL)
    return full_match

# We can target the Ambience Combos section by replacing within the grid
start_idx = html.find('<!-- Ambience Combos - 2 Column Grid -->')
if start_idx != -1:
    end_idx = html.find('</div>', start_idx)
    end_idx = html.find('</div>', end_idx + 1)
    
    section = html[start_idx:end_idx]
    
    # We will use re.sub with a custom function on the button blocks
    new_section = re.sub(r'<button.*?</button>', fix_ambience_combo, section, flags=re.DOTALL)
    
    html = html[:start_idx] + new_section + html[end_idx:]

with open('mindwave.html', 'w') as f:
    f.write(html)
