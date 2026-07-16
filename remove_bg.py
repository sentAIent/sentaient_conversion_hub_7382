import sys
from rembg import remove
from PIL import Image

input_path = sys.argv[1]
output_path = sys.argv[2]
favicon_path = sys.argv[3]

with open(input_path, 'rb') as i:
    input_data = i.read()
    output_data = remove(input_data)
    with open(output_path, 'wb') as o:
        o.write(output_data)

img = Image.open(output_path)
icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
img.save(favicon_path, format='ICO', sizes=icon_sizes)
print("Done!")
