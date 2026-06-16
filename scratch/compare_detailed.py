import re

def analyze_file(filepath):
    print(f"=== Analyzing {filepath} ===")
    with open(filepath, 'r', errors='ignore') as f:
        content = f.read()
    
    # 1. Scripts
    scripts = re.findall(r'<script.*?(?:src=["\'](.*?)["\'])?.*?>', content)
    print("Scripts:")
    for s in scripts:
        if s:
            print(f"  - {s}")
            
    # 2. Stylesheets
    styles = re.findall(r'<link.*?href=["\'](.*?)["\']', content)
    print("Stylesheets:")
    for st in styles:
        if 'stylesheet' in st or '.css' in st:
            print(f"  - {st}")
            
    # 3. Sidebar Tabs / Sections
    # Let's find IDs of sidebar panels
    ids = re.findall(r'id=["\'](.*?)["\']', content)
    tab_keywords = ['studio', 'cymatics', 'neural', 'preset', 'visual', 'dock', 'rightPanel', 'leftPanel']
    matching_ids = [i for i in ids if any(k in i.lower() for k in tab_keywords)]
    print("Key IDs found:")
    print("  ", list(set(matching_ids))[:30])

    # 4. Buttons and Classes
    buttons = re.findall(r'<button.*?(?:class=["\'](.*?)["\'])?.*?>', content)
    classes = set()
    for b in buttons:
        if b:
            for cls in b.split():
                if 'btn' in cls or 'mw-' in cls or 'lux' in cls or 'glass' in cls:
                    classes.add(cls)
    print("Button class keywords:")
    print("  ", sorted(list(classes)))

analyze_file('public/mindwave.html')
analyze_file('public/mindwave-beta.html')
