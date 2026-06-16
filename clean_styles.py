import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    content = f.read()

# Remove all injected style blocks
style_block_regex = r'\s*<style>\s*input\.custom-sync-toggle:checked ~ \.toggle-bg \{ background-color: rgba\(6, 78, 59, 0\.5\); border-color: rgba\(16, 185, 129, 0\.5\); \}\s*input\.custom-sync-toggle:checked ~ \.dot \{ transform: translateX\(100\%\); background-color: #34d399; \}\s*</style>\s*'

content = re.sub(style_block_regex, '\n', content)

# Add exactly one style block right before the Audio Sync Toggle
one_style = '''
        <style>
            input.custom-sync-toggle:checked ~ .toggle-bg { background-color: rgba(6, 78, 59, 0.5); border-color: rgba(16, 185, 129, 0.5); }
            input.custom-sync-toggle:checked ~ .dot { transform: translateX(100%); background-color: #34d399; }
        </style>
'''

content = content.replace('            <label class="flex items-center cursor-pointer gap-2 group">\n                <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO AUDIO</span>', one_style + '            <label class="flex items-center cursor-pointer gap-2 group">\n                <span class="text-[10px] text-emerald-400/80 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">SYNC TO AUDIO</span>')

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(content)

