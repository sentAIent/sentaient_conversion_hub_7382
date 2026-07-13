from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    
    # We define a threshold for "dark grey background"
    # The logo has a grey background that is very dark, around R=15-30, G=15-30, B=15-30
    # The logo itself is bright white, blue, cyan, green.
    # Shadows might be slightly dark. Let's make everything where R<40, G<40, B<40 transparent.
    
    for item in data:
        r, g, b, a = item
        
        # Check if it's close to grayscale and dark
        # The background in contango_logo.png is quite dark.
        if r < 50 and g < 50 and b < 50 and abs(r-g) < 10 and abs(g-b) < 10:
            new_data.append((r, g, b, 0)) # Make transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

make_transparent(
    "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/assets/images/contango_logo.png",
    "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_transparent.png"
)
print("Done!")
