
import shutil
import os

SOURCE = '/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1768962584660.png'
DEST = 'public/mindwave-logo.png'

def deploy_logo():
    if not os.path.exists(SOURCE):
        print(f"Error: Source not found at {SOURCE}")
        return

    try:
        shutil.copy2(SOURCE, DEST)
        print(f"Success: Copied to {DEST}")
        
        # Verify
        if os.path.exists(DEST):
            size = os.path.getsize(DEST)
            print(f"Destination file size: {size} bytes")
        else:
            print("Error: Destination file validation failed.")
            
    except Exception as e:
        print(f"Error copying file: {e}")

if __name__ == "__main__":
    deploy_logo()
