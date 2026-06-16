import re

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    html = f.read()

# Get 12 unique images from the available high quality ones
unique_images = [
    "cymatic_astral_lotus.png",
    "cymatic_biolum_abyssal.png",
    "cymatic_bioluminescent_shroom.png",
    "cymatic_celestial_mandala.png",
    "cymatic_cybernetic_lotus.png",
    "cymatic_diamond_lattice.png",
    "cymatic_emerald_cyber_matrix.png",
    "cymatic_ethereal_nexus.png",
    "cymatic_golden_ratio_spiral.png",
    "cymatic_liquid_mercury_crimson.png",
    "cymatic_lunar_tides.png",
    "cymatic_neon_labyrinth.png"
]

def replace_images(match):
    block = match.group(0)
    
    # We will only do this for Class XX and XXI
    if "Class XX:" not in block and "Class XXI:" not in block:
        return block
    
    # Find all image tags in this block
    img_pattern = re.compile(r'<img src="binaural-assets/images/cymatics/[^"]+"')
    
    # We use a mutable index to grab the next unique image
    def img_repl(img_match):
        if not unique_images:
            return img_match.group(0) # Fallback if we run out
        next_img = unique_images.pop(0)
        return f'<img src="binaural-assets/images/cymatics/{next_img}"'
        
    new_block = img_pattern.sub(img_repl, block)
    return new_block

# Apply the regex substitution to each cymatics-class-container
new_html = re.sub(r'<div class="cymatics-class-container.*?(?=<div class="cymatics-class-container|<div id="tab-controls)', replace_images, html, flags=re.DOTALL)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(new_html)

print("Duplicates replaced.")
