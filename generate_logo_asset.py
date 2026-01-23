import base64
import os
import shutil

# Configuration
src_path = "/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1768962584660.png"
dest_dir = "/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public"
dest_img_name = "mindwave-logo-res.png"
dest_img_path = os.path.join(dest_dir, dest_img_name)
dest_b64_path = os.path.join(dest_dir, "logo_res_b64.txt")

print(f"--- Starting Asset Generation ---")
print(f"Source: {src_path}")
print(f"Dest Dir: {dest_dir}")

# Check source
if not os.path.exists(src_path):
    print(f"CRITICAL ERROR: Source file not found at {src_path}")
    exit(1)

print(f"Source file exists. Size: {os.path.getsize(src_path)} bytes")

# 1. Try to Copy Image
try:
    shutil.copy2(src_path, dest_img_path)
    print(f"Copy Success: {dest_img_path}")
except Exception as e:
    print(f"Copy Failed: {e}")

# 2. Generate Base64 (Backup)
try:
    with open(src_path, "rb") as f:
        data = f.read()
        b64 = base64.b64encode(data).decode('utf-8')
        with open(dest_b64_path, "w") as out:
            out.write(b64)
        print(f"Base64 Success: {dest_b64_path} (Len: {len(b64)})")
except Exception as e:
    print(f"Base64 Failed: {e}")

print("--- Done ---")
