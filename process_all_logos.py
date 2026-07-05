from PIL import Image
import sys
import os

input_img_path = "/Users/ute/.gemini/antigravity/brain/08cdac68-f477-4548-a9b0-a443eb6493f8/media__1783211258151.png"

def process_base_logo(input_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    # Make near-white transparent
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    return img

def resize_and_save(img, size, out_path, format="PNG"):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    # create a square transparent background if we want to maintain aspect ratio, but let's just resize it directly for now since it is square-ish
    # Actually, crop bounding box might make it non-square. Let's make a square canvas.
    max_dim = max(img.size)
    square_img = Image.new("RGBA", (max_dim, max_dim), (255, 255, 255, 0))
    offset = ((max_dim - img.size[0]) // 2, (max_dim - img.size[1]) // 2)
    square_img.paste(img, offset)
    
    img_resized = square_img.resize(size, Image.Resampling.LANCZOS)
    img_resized.save(out_path, format=format)
    print(f"Saved {out_path}")

base_img = process_base_logo(input_img_path)

# 1. Main Website Logo
resize_and_save(base_img, (512, 512), "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/icebreaker_logo.png")

# 2. B2B Portal
b2b_pub = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/icebreaker/b2b-portal/public"
resize_and_save(base_img, (512, 512), f"{b2b_pub}/logo.png")
resize_and_save(base_img, (32, 32), f"{b2b_pub}/favicon.ico", format="ICO")

# 3. Mobile (Expo)
mob_img = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/icebreaker/mobile/assets/images"
resize_and_save(base_img, (1024, 1024), f"{mob_img}/icon.png")
resize_and_save(base_img, (1024, 1024), f"{mob_img}/adaptive-icon.png")
resize_and_save(base_img, (32, 32), f"{mob_img}/favicon.png")
resize_and_save(base_img, (1024, 1024), f"{mob_img}/splash.png")

print("All done!")
