import os
from PIL import Image

def screen_to_alpha(image_path, out_path):
    print(f"Processing {image_path} -> {out_path}")
    img = Image.open(image_path).convert("RGB")
    pixels = img.load()
    width, height = img.size
    
    out_img = Image.new("RGBA", img.size)
    out_pixels = out_img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            a = max(r, g, b)
            if a == 0:
                out_pixels[x, y] = (0, 0, 0, 0)
            else:
                out_pixels[x, y] = (min(255, r * 255 // a), 
                                    min(255, g * 255 // a), 
                                    min(255, b * 255 // a), 
                                    a)
                
    out_img.save(out_path, "PNG")
    print(f"Saved {out_path}")

public_dir = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public"
artifacts_dir = "/Users/ute/.gemini/antigravity/brain/7e3c9dc7-680f-46b9-a3b1-cc84f97ac5a0"

images = [
    (f"{artifacts_dir}/legal_eagle_scales_1783139425722.jpg", f"{public_dir}/legal_eagle_logo.png"),
    (f"{artifacts_dir}/interstellar_spaceship_angled_1783139435102.jpg", f"{public_dir}/interstellar_logo.png"),
]

for in_path, out_path in images:
    if os.path.exists(in_path):
        screen_to_alpha(in_path, out_path)
    else:
        print(f"Missing {in_path}")
