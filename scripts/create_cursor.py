from PIL import Image
import os

input_path = "/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave-logo.png"
output_path = "/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/binaural-assets/cursors/mindwave.png"

try:
    img = Image.open(input_path)
    img = img.resize((32, 32), Image.Resampling.LANCZOS)
    img.save(output_path)
    print(f"Successfully created cursor at {output_path}")
except Exception as e:
    print(f"Error: {e}")
