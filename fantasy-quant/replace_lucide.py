import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    if 'lucide-react' in content:
        new_content = content.replace("'lucide-react'", "'@/components/icons'")
        new_content = new_content.replace('"lucide-react"', '"@/components/icons"')
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            replace_in_file(os.path.join(root, file))
