import os

files_to_wipe = ["public/index.html", "public/mindwave.html", "public/mindwave-beta.html"]

for fpath in files_to_wipe:
    if os.path.exists(fpath):
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Hard-delete the unifiedBottomDock structurally
        if 'id="unifiedBottomDock"' in content:
            print(f"Hard-stripping unifiedBottomDock from {fpath}")
            import re
            content = re.sub(r'<footer[^>]*id="unifiedBottomDock"[^>]*>.*?</footer>', '', content, flags=re.DOTALL)
            
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
        else:
            print(f"No dock found in {fpath}")

