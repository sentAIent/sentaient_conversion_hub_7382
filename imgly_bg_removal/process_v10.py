from PIL import Image

# Open the image
img = Image.open("/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/contango_logo_v10_1783895545997.jpg")
width, height = img.size

# Crop out the bottom text (keep top 680 pixels)
cropped = img.crop((0, 0, width, 700))
cropped.save("cropped_v10.jpg")
