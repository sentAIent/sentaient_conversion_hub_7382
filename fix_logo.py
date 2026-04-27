
import os

# The verified Base64 string extracted from the browser
LOGO_DATA = "data:image/png;base64,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"

HTML_FILE = 'public/mindwave.html'

def fix_logo():
    try:
        with open(HTML_FILE, 'r') as f:
            content = f.read()
        
        # We will replace the existing broken img tag with the correct one.
        # We assume the anchor tag around it is correct or we can just replace the img part.
        # Searching for the broken part 'binaural-assets/img/logo.png' 
        # or just rebuilding the anchor entirely to be safe.
        
        start_marker = '<!-- UNIFIED COMMAND CENTER (Moved to root for z-index) -->'
        end_marker = '<!-- Loading Screen -->'
        
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        if start_idx == -1 or end_idx == -1:
            print("Error: Could not find markers")
            return

        new_block = f"""<!-- UNIFIED COMMAND CENTER (Moved to root for z-index) -->
    <a href="#" onclick="window.location.reload()"
        class="fixed top-6 left-6 z-[100000] pointer-events-auto hover:opacity-80 transition-opacity"
        style="z-index: 100000 !important; position: fixed !important; display: block !important;">
        <img src="{LOGO_DATA}"
            alt="MindWave Logo"
            class="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.3)] rounded-xl">
    </a>
"""
        
        # We replace the content between markers (and the first marker itself to keep it clean)
        # Actually, let's keep the markers in the replacement.
        
        # Extract the chunk to replace
        old_chunk = content[start_idx:end_idx]
        
        # Perform replacement
        new_content = content.replace(old_chunk, new_block.strip() + "\n\n    ")
        
        with open(HTML_FILE, 'w') as f:
            f.write(new_content)
            
        print("Success: Logo replaced.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_logo()
