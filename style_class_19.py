import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    html = f.read()

# Fix Class 19 buttons in the Visuals tab
# They have the old font class: text-[10px] text-white font-bold tracking-wider
old_font = 'text-[10px] text-white font-bold tracking-wider'
new_font = 'text-[9px] text-white font-black tracking-widest uppercase'

# Find the block for Class 19
c19_pattern = re.compile(r'<h4 class="text-\[12px\] text-purple-400 uppercase tracking-widest mb-3 border-b border-purple-500/30 pb-1 font-bold">Premium 3D Environments</h4>\s*<div class="grid grid-cols-3 gap-3">(.*?)</div>\s*</div>', re.DOTALL)

match = c19_pattern.search(html)
if match:
    block = match.group(1)
    
    # Replace the fonts
    block = block.replace(old_font, new_font)
    
    # We should also update the images to ensure they use high quality images if they are just standard c16_0.png etc.
    # Actually, c16_0, c17_0, c18_0 might be fine, but I can replace them with some of the remaining cymatic_*.png if needed.
    # Let's just fix the font for now, as that's the glaring UI discrepancy.
    
    new_html = html[:match.start(1)] + block + html[match.end(1):]
    
    # And let's update the header to be tracking-[0.2em] font-extrabold to match the cymatics tab perfectly
    new_html = new_html.replace(
        '<h4 class="text-[12px] text-purple-400 uppercase tracking-widest mb-3 border-b border-purple-500/30 pb-1 font-bold">Premium 3D Environments</h4>',
        '<h4 class="text-[12px] text-purple-400 uppercase tracking-[0.2em] mb-3 border-b border-purple-500/30 pb-1 font-extrabold">Premium 3D Environments</h4>'
    )
    
    with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
        f.write(new_html)
    print("Class 19 styled.")
else:
    print("Could not find Class 19 block")
