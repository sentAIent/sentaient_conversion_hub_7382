import re

def extract_sections(filepath):
    print(f"=== Sections in {filepath} ===")
    with open(filepath, 'r', errors='ignore') as f:
        content = f.read()
        
    sections = re.findall(r'<section[^>]*?data-section=["\'](.*?)["\'][^>]*?>([\s\S]*?)</section>', content)
    for name, inner in sections:
        print(f"  - Section: {name} ({len(inner)} chars)")
        # Show first few lines
        lines = inner.strip().splitlines()
        for l in lines[:5]:
            print(f"    {l.strip()}")
        print("    ...")

extract_sections('public_html_backup/mindwave-head.html')
