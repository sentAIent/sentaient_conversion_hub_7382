from PIL import Image
import sys

img_path = "/Users/ute/.gemini/antigravity/brain/7e3c9dc7-680f-46b9-a3b1-cc84f97ac5a0/autopilot_logo_idea_3_1783152007100.jpg"
out_path = "public/autopilot-logo.png"

img = Image.open(img_path).convert("RGBA")
data = img.getdata()

new_data = []
for item in data:
    # item is (R, G, B, A)
    # Background is dark grey/blueish. We can use luminance to determine alpha.
    # To keep the green and silver opaque, we can boost the alpha based on the max color channel.
    max_val = max(item[0], item[1], item[2])
    
    # If it's a very dark pixel, make it mostly transparent.
    # We will map max_val 0-255 to alpha, but with a curve.
    # Thresholding:
    if max_val < 30:
        alpha = 0
    else:
        # Scale remaining 30-255 to 0-255
        alpha = int((max_val - 30) * (255 / 225.0))
        # Boost alpha so it doesn't look too ghosty
        alpha = min(255, int(alpha * 1.5))
    
    new_data.append((item[0], item[1], item[2], alpha))

img.putdata(new_data)

# Let's also crop it slightly to remove any weird edges, or just save it
img.save(out_path, "PNG")
print("Saved to", out_path)
