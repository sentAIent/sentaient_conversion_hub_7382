import re
import os
import random

# Get all high-res images
img_dir = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/images/cymatics'
high_res_images = []
for f in os.listdir(img_dir):
    if f.endswith('.png'):
        path = os.path.join(img_dir, f)
        if os.path.getsize(path) > 300000: # greater than 300KB
            high_res_images.append(f)

# Sort them to be deterministic
high_res_images.sort()

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
    html = f.read()

# We only want to replace images inside cymatics-pattern-btn
btn_pattern = re.compile(r'(<button class="cymatics-pattern-btn[^>]+>.*?<img src="binaural-assets/images/cymatics/)([^"]+)(".*?)</button>', re.DOTALL)

img_index = 0

def replace_img(match):
    global img_index
    prefix = match.group(1)
    old_img = match.group(2)
    suffix = match.group(3)
    
    # Check if the old image is already one of our high res images
    # If it is, maybe leave it? Actually, no, let's distribute uniformly to avoid duplicates locally.
    
    new_img = high_res_images[img_index % len(high_res_images)]
    img_index += 1
    
    return f"{prefix}{new_img}{suffix}"

html = btn_pattern.sub(replace_img, html)

with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'w') as f:
    f.write(html)

print(f"Replaced {img_index} images with high-res versions.")
