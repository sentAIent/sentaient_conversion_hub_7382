import urllib.request
import os
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

# Download model
model_path = "u2net.onnx"
if not os.path.exists(model_path):
    print("Downloading u2net.onnx...")
    urllib.request.urlretrieve("https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx", model_path)

import onnxruntime as ort
import numpy as np
from PIL import Image

print("Loading model...")
session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])

in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
out_path = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v8.png"

img = Image.open(in_path).convert("RGB")
original_size = img.size

print("Preprocessing...")
img_resized = img.resize((320, 320), Image.BILINEAR)
img_array = np.array(img_resized).astype(np.float32) / 255.0

# Normalize
img_array[:, :, 0] = (img_array[:, :, 0] - 0.485) / 0.229
img_array[:, :, 1] = (img_array[:, :, 1] - 0.456) / 0.224
img_array[:, :, 2] = (img_array[:, :, 2] - 0.406) / 0.225

# HWC -> CHW
img_array = np.transpose(img_array, (2, 0, 1))
img_array = np.expand_dims(img_array, axis=0)

print("Inferencing...")
inputs = {session.get_inputs()[0].name: img_array}
outputs = session.run(None, inputs)

# Output is a mask, we take the first output
mask = outputs[0][0, 0, :, :]

# Resize mask back to original
print("Postprocessing...")
# Normalize mask to 0-255
ma = np.max(mask)
mi = np.min(mask)
mask = (mask - mi) / (ma - mi)
mask = (mask * 255).astype(np.uint8)

mask_img = Image.fromarray(mask).resize(original_size, Image.BILINEAR)

# Apply mask
out_img = img.convert("RGBA")
out_img.putalpha(mask_img)
out_img.save(out_path)
print("Done!")
