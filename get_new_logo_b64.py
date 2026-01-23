import base64
import sys

src_path = "/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1768962584660.png"

try:
    with open(src_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    out_path = "/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/logo_final.txt"
    with open(out_path, "w") as out_file:
        out_file.write(encoded_string)
    print(f"Success: Wrote to {out_path}")
except Exception as e:
    with open("/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/error_log.txt", "w") as err:
        err.write(str(e))
    print(f"Error: {e}")
