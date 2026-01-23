import base64
import os

# Absolute path to the uploaded artifact
src_path = "/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1768956849684.png"
# Output file in the public directory
out_path = "/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/real_logo_b64.txt"

print(f"Reading {src_path}...")
try:
    with open(src_path, "rb") as img_file:
        b64_string = base64.b64encode(img_file.read()).decode('utf-8')
    
    with open(out_path, "w") as out_file:
        out_file.write(b64_string)
        
    print(f"Success! Base64 string (len: {len(b64_string)}) written to {out_path}")
except Exception as e:
    print(f"Error: {str(e)}")
