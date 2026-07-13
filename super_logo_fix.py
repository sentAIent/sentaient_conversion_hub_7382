from PIL import Image

def process():
    in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
    out_path = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v5.png"
    
    img = Image.open(in_path).convert("RGBA")
    width, height = img.size
    
    new_data = []
    
    # We found the corners are around (30,30,40) and center is (48,74,99)
    # Let's just remove anything that is dark and lacking color saturation.
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            
            # Simple heuristic: The background is dark gray. 
            # If the pixel is dark AND mostly gray (r,g,b are close to each other), remove it.
            # Max difference between color channels indicates saturation
            saturation = max(r,g,b) - min(r,g,b)
            brightness = max(r,g,b)
            
            if brightness < 60 and saturation < 20:
                new_data.append((255, 255, 255, 0))
            elif brightness < 80 and saturation < 30:
                alpha = int(255 * (brightness - 60) / 20.0)
                new_data.append((r, g, b, alpha))
            else:
                new_data.append((r, g, b, 255))
                
    img.putdata(new_data)
    img.save(out_path, "PNG")

process()
