import os
import re

for root, dirs, files in os.walk('binaural-assets/js'):
    for file in files:
        if file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if 'classId === 26' in content or 'Class 26' in content or '26:' in content:
                    print(f"Found 26 in {filepath}")
                if 'classId === 27' in content or 'Class 27' in content or '27:' in content:
                    print(f"Found 27 in {filepath}")
