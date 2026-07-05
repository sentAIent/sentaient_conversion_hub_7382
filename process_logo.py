from PIL import Image
import sys

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    # Convert white (also shades of near-white) to transparent
    for item in datas:
        # Check if the pixel is very close to white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    # Crop to bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

input_img = "/Users/ute/.gemini/antigravity/brain/08cdac68-f477-4548-a9b0-a443eb6493f8/media__1783211258151.png"
make_transparent(input_img, "icebreaker_raw_logo.png")
