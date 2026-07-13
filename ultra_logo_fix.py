from PIL import Image

def process():
    in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
    out_path = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v3.png"
    
    img = Image.open(in_path).convert("RGBA")
    width, height = img.size
    
    bg_color = img.getpixel((0, 0)) # Sample top-left pixel as background
    new_data = []
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            # Distance from background color
            dist = abs(r - bg_color[0]) + abs(g - bg_color[1]) + abs(b - bg_color[2])
            
            if dist < 60: # Within threshold of background color
                new_data.append((255, 255, 255, 0))
            elif dist < 120: # Anti-alias edge
                alpha = int(255 * (dist - 60) / 60.0)
                new_data.append((r, g, b, alpha))
            else:
                new_data.append((r, g, b, 255))
                
    img.putdata(new_data)
    img.save(out_path, "PNG")

process()
