import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    content = f.read()

# Fix the double border in Class XXII
# The header looks like: <h4 class="text-[12px] text-emerald-400 uppercase tracking-[0.2em] mb-3 border-b border-emerald-500/30 pb-1 font-extrabold">Class XXII: Image-Driven Cymatics</h4>
# It is inside a div that already has mb-3 border-b border-emerald-500/30 pb-1
content = content.replace(
    '<h4 class="text-[12px] text-emerald-400 uppercase tracking-[0.2em] mb-3 border-b border-emerald-500/30 pb-1 font-extrabold">Class XXII:',
    '<h4 class="text-[12px] text-emerald-400 uppercase tracking-[0.2em] font-extrabold">Class XXII:'
)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(content)

print("Border fixed.")
