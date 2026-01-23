import base64
import os

src = "/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1768956849684.png"
dest = "/tmp/logo_b64.txt"

try:
    with open(src, "rb") as f:
        data = f.read()
        b64 = base64.b64encode(data).decode()
        with open(dest, "w") as out:
            out.write(b64)
            print("Done")
except Exception as e:
    print(e)
