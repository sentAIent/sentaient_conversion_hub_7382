import os
import re

lib_dir = 'src/lib'
types_file = 'src/types/models.ts'

os.makedirs('src/types', exist_ok=True)

types_content = ""

for root, _, files in os.walk(lib_dir):
    for file in files:
        if file.startswith('mock') and file.endswith('.ts'):
            with open(os.path.join(root, file), 'r') as f:
                content = f.read()
                # Extract interfaces and types
                interfaces = re.findall(r'(export (?:interface|type) \w+(?:<[^>]+>)?\s*(?:=[^;]+;|{[^}]*}))', content)
                for inter in interfaces:
                    types_content += inter + "\n\n"

with open(types_file, 'w') as f:
    f.write(types_content)

print(f"Extracted types to {types_file}")
