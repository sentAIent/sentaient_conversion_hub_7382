import os
import re

directories = ['src/pages/demo3d/worlds/', 'src/pages/demo3d/wormholes/', 'src/pages/demo3d/']

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith('.jsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                # Simple replacement for any <Text that doesn't have font=
                # This regex looks for <Text optionally followed by spaces, and if it doesn't see font= right away, we insert it.
                # A better approach: just replace `<Text ` with `<Text font="/fonts/Roboto.woff" fallbackFonts={[]} `
                # But we need to make sure we don't duplicate it.
                
                if '<Text ' in content or '<Text\n' in content:
                    # Remove existing font props to avoid duplicates
                    content = re.sub(r'\s+font="[^"]+"', '', content)
                    content = re.sub(r'\s+fallbackFonts={\[.*?\]}', '', content)
                    
                    # Add them back to all <Text
                    content = content.replace('<Text ', '<Text font="/fonts/Roboto.woff" fallbackFonts={[]} ')
                    content = content.replace('<Text\n', '<Text font="/fonts/Roboto.woff" fallbackFonts={[]}\n')
                    
                    with open(path, 'w') as f:
                        f.write(content)
                    print(f"Fixed fonts in {path}")
