from PIL import Image
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]
favicon_path = sys.argv[3]

img = Image.open(input_path).convert("RGBA")
datas = img.getdata()

newData = []
for item in datas:
    # Check if the pixel is dark (background is usually dark in these generations)
    if item[0] < 20 and item[1] < 20 and item[2] < 20:
        newData.append((0, 0, 0, 0))
    else:
        newData.append(item)

img.putdata(newData)
img.save(output_path, "PNG")

# Generate favicon
img = Image.open(output_path)
icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
img.save(favicon_path, format='ICO', sizes=icon_sizes)
print("Done!")
