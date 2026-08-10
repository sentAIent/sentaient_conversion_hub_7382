from PIL import Image
img_path = "/Users/infinitealpha/.gemini/antigravity/brain/eeaebfcf-4ac5-4d67-893e-e04d1dcfb1a5/autopilot_logo_metallic_green_1786255081890.jpg"
out_path = "/Users/infinitealpha/.gemini/antigravity/brain/eeaebfcf-4ac5-4d67-893e-e04d1dcfb1a5/autopilot_logo_final_transparent.png"
img = Image.open(img_path).convert("RGBA")
data = img.getdata()
new_data = []
for item in data:
    max_val = max(item[0], item[1], item[2])
    if max_val < 25:
        alpha = 0
    else:
        alpha = int((max_val - 25) * (255 / 230.0))
        alpha = min(255, int(alpha * 1.5))
    new_data.append((item[0], item[1], item[2], alpha))
img.putdata(new_data)
img.save(out_path, "PNG")
