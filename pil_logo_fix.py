from PIL import Image, ImageDraw

def process():
    in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
    out_path = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v6.png"
    
    img = Image.open(in_path).convert("RGBA")
    width, height = img.size
    
    # Use floodfill to remove background
    # We must do it on a mask to set alpha
    # But wait, floodfill in PIL sets the color. We can just set it to (0,0,0,0)!
    
    # PIL's floodfill replaces a color with another, with a tolerance.
    # It replaces connected pixels.
    ImageDraw.floodfill(img, (0,0), (0,0,0,0), thresh=20)
    ImageDraw.floodfill(img, (width-1,0), (0,0,0,0), thresh=20)
    ImageDraw.floodfill(img, (0,height-1), (0,0,0,0), thresh=20)
    ImageDraw.floodfill(img, (width-1,height-1), (0,0,0,0), thresh=20)
    
    img.save(out_path, "PNG")

process()
