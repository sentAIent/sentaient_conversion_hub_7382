
import os
import sys

# Dark Mode Logo
SOURCE = '/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1_1768973516095.png'
DEST = 'mindwave-logo.png' 
LOG_FILE = 'recovery_log.txt'

def log(msg):
    with open(LOG_FILE, 'a') as f:
        f.write(msg + '\n')
    print(msg)

def recover():
    if not os.path.exists(SOURCE):
        log(f"FAILURE: Source missing at {SOURCE}")
        return

    try:
        log(f"Reading source: {SOURCE}")
        with open(SOURCE, 'rb') as f_in:
            data = f_in.read()
            
        log(f"Read {len(data)} bytes. Writing to {DEST}...")
        
        with open(DEST, 'wb') as f_out:
            f_out.write(data)
            
        if os.path.exists(DEST):
            size = os.path.getsize(DEST)
            log(f"SUCCESS: {DEST} created, size {size} bytes.")
        else:
            log(f"FAILURE: {DEST} not found after write.")

    except Exception as e:
        log(f"EXCEPTION: {e}")

if __name__ == "__main__":
    recover()
