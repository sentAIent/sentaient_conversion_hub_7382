import re

def list_buttons(filepath):
    with open(filepath, 'r', errors='ignore') as f:
        content = f.read()
    # Find all <button> tags
    buttons = re.findall(r'<button\s+[^>]*id="([^"]*)"[^>]*>', content)
    # Find button texts/labels if no ID
    buttons_with_labels = re.findall(r'<button\s+[^>]*>(.*?)</button>', content, re.DOTALL)
    # Let's clean up labels by stripping tags and spaces
    clean_labels = []
    for label in buttons_with_labels:
        clean = re.sub(r'<[^>]*>', '', label).strip()
        clean = re.sub(r'\s+', ' ', clean)
        if len(clean) > 0:
            clean_labels.append(clean)
    return buttons, clean_labels[:40]

for path in [
    "public_html_backup/mindwave-head.html",
    "public_html_backup/mindwave.html",
    "mindwave-friday.html"
]:
    ids, labels = list_buttons(path)
    print(f"\n=== {path} ===")
    print(f"IDs: {ids}")
    print(f"Labels (first 40): {labels}")
