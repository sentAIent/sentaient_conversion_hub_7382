import re

with open('public/mindwave.html', 'r', errors='ignore') as f:
    html = f.read()

with open('public/mindwave-beta.html', 'r', errors='ignore') as f:
    beta = f.read()

def find_sections(content, label):
    print(f"=== {label} Panels ===")
    # Find all divs containing class "tab-panel" or similar panel classes
    panels = re.findall(r'<div[^>]*?id=["\'](tab-[a-zA-Z0-9_-]+|panel-[a-zA-Z0-9_-]+|studio-[a-zA-Z0-9_-]+|cymatics-[a-zA-Z0-9_-]+|neural-[a-zA-Z0-9_-]+)["\'][^>]*?>', content)
    for p in set(panels):
        print(f"  - {p}")
        
find_sections(html, "mindwave.html")
find_sections(beta, "mindwave-beta.html")
