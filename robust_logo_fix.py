
import base64
import os

# Absolute path to the source image provided by the user
SOURCE_IMAGE_PATH = '/Users/infinitealpha/.gemini/antigravity/brain/266b767c-1e59-4b17-adbb-0ebbca931028/uploaded_image_1768962584660.png'
HTML_FILE = 'public/mindwave.html'

def fix_logo_robust():
    if not os.path.exists(SOURCE_IMAGE_PATH):
        print(f"Error: Source image not found at {SOURCE_IMAGE_PATH}")
        return

    try:
        # 1. Read and Encode Image
        with open(SOURCE_IMAGE_PATH, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            
        base64_src = f"data:image/png;base64,{encoded_string}"
        print(f"Successfully encoded image. Length: {len(base64_src)}")

        # 2. Read HTML File
        with open(HTML_FILE, 'r') as f:
            content = f.read()
        
        # 3. Prepare Correct Block
        # We target the anchor block again to be safe
        start_marker = '<!-- UNIFIED COMMAND CENTER (Moved to root for z-index) -->'
        end_marker = '<!-- Loading Screen -->'
        
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        if start_idx == -1 or end_idx == -1:
            print("Error: Could not find HTML markers")
            return

        new_block = f"""<!-- UNIFIED COMMAND CENTER (Moved to root for z-index) -->
    <a href="#" onclick="window.location.reload()"
        class="fixed top-6 left-6 z-[100000] pointer-events-auto hover:opacity-80 transition-opacity"
        style="z-index: 100000 !important; position: fixed !important; display: block !important;">
        <img src="{base64_src}"
            alt="MindWave Logo"
            class="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.3)] rounded-xl">
    </a>
"""
        
        # 4. Replace
        old_chunk = content[start_idx:end_idx]
        new_content = content.replace(old_chunk, new_block.strip() + "\n\n    ")
        
        # 5. Write Back
        with open(HTML_FILE, 'w') as f:
            f.write(new_content)
            
        print("Success: Logo replaced with fresh encoding.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_logo_robust()
