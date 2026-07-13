from PIL import Image

in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
img = Image.open(in_path).convert("RGB")
width, height = img.size

# Let's find the bounding box of the bright/colored pixels
# The background is a trading chart, probably dark gray with some lines.
# But the logo itself is probably bright.
x_min, x_max = width, 0
y_min, y_max = height, 0

for y in range(height):
    for x in range(width):
        r, g, b = img.getpixel((x, y))
        # If it's bright and colored enough
        if max(r,g,b) > 100:
            x_min = min(x_min, x)
            x_max = max(x_max, x)
            y_min = min(y_min, y)
            y_max = max(y_max, y)

print(f"Bounding box: {x_min}, {y_min}, {x_max}, {y_max}")
print(f"Center width: {x_max - x_min}, height: {y_max - y_min}")

# Just to be safe, let's crop the image to this bounding box
crop = img.crop((x_min, y_min, x_max, y_max))
crop.save("/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v9.png")
