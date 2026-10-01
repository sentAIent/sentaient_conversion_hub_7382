import os
import re

api_dir = 'src/app/api'

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    
    # 1. Remove imports from mock files
    content = re.sub(r'import\s+\{.*\}\s+from\s+[\'"]@/lib/mock[^\'"]+[\'"];\n?', '', content)

    new_lines = []
    lines = content.split('\n')
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        if '// Fallback to mock data' in line:
            # Skip until we see the closing brace of the function `}` at the start of a line
            j = i
            while j < len(lines):
                if lines[j].startswith('}'):
                    break
                j += 1
            
            i = j - 1 # Next iteration will be the `}`
            new_lines.append('  return NextResponse.json({ error: "Failed to fetch data", success: false }, { status: 500 });')
        else:
            new_lines.append(line)
        i += 1
        
    new_content = '\n'.join(new_lines)
    
    if new_content != original_content:
        print(f"Updated {filepath}")
        with open(filepath, 'w') as f:
            f.write(new_content)

for root, dirs, files in os.walk(api_dir):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print("Done.")
