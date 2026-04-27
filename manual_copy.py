
import os

SOURCE = '/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1768962584660.png'
DEST = 'mindwave-logo.png' # In current dir (public)

if not os.path.exists(SOURCE):
    print(f"CRITICAL: Source file does not exist at {SOURCE}")
    exit(1)

try:
    print(f"Reading source: {SOURCE}")
    with open(SOURCE, 'rb') as f_in:
        data = f_in.read()
        print(f"Read {len(data)} bytes.")
        
    print(f"Writing dest: {DEST}")
    with open(DEST, 'wb') as f_out:
        f_out.write(data)
        
    print("Write complete.")
    if os.path.exists(DEST):
        print(f"CONFIRMED: {DEST} exists, size {os.path.getsize(DEST)}")
    else:
        print(f"FAILURE: {DEST} does not exist after write.")
        
except Exception as e:
    print(f"EXCEPTION: {e}")
