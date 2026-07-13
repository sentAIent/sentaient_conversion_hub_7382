from PIL import Image

def process_logo():
    in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
    out_path = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_transparent.png"
    
    img = Image.open(in_path).convert("RGBA")
    width, height = img.size
    
    # Increase contrast/threshold to get rid of JPEG artifacts
    new_data = []
    
    # We assume the background is white or near white, and the logo is darker
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            
            # Simple threshold - if all channels are > 230, it's background
            if r > 210 and g > 210 and b > 210:
                new_data.append((255, 255, 255, 0))
            elif r > 180 and g > 180 and b > 180:
                # Anti-aliasing fringe - partially transparent
                alpha = int(255 * (210 - max(r,g,b)) / 30.0)
                if alpha < 0: alpha = 0
                new_data.append((r, g, b, alpha))
            else:
                new_data.append((r, g, b, 255))
                
    img.putdata(new_data)
    img.save(out_path, "PNG")

process_logo()
