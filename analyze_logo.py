from PIL import Image
import sys

img_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
try:
    img = Image.open(img_path).convert("RGB")
    width, height = img.size
    print(f"Size: {width}x{height}")
    
    # Sample corners and center
    print(f"Top-Left: {img.getpixel((0,0))}")
    print(f"Top-Right: {img.getpixel((width-1,0))}")
    print(f"Bottom-Left: {img.getpixel((0,height-1))}")
    print(f"Bottom-Right: {img.getpixel((width-1,height-1))}")
    print(f"Center: {img.getpixel((width//2, height//2))}")
    
    # Count how many colors there are roughly
    colors = {}
    for y in range(0, height, 10):
        for x in range(0, width, 10):
            c = img.getpixel((x,y))
            colors[c] = colors.get(c, 0) + 1
            
    sorted_colors = sorted(colors.items(), key=lambda x: x[1], reverse=True)
    print("Most common colors (sampled every 10px):")
    for c, count in sorted_colors[:5]:
        print(f"  {c}: {count}")
except Exception as e:
    print(f"Error: {e}")
