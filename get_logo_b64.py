import base64
import os

src = "/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1768956849684.png"
dest = "/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/logo_b64_out.txt"

print(f"Reading from {src}")
try:
    with open(src, "rb") as f:
        data = f.read()
        print(f"Read {len(data)} bytes")
        b64 = base64.b64encode(data).decode()
        with open(dest, "w") as out:
            out.write(b64)
            print(f"Wrote to {dest}")
except Exception as e:
    print(f"Error: {e}")
