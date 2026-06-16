import re

with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/visuals/CymaticsCore_v4.js', 'r') as f:
    content = f.read()

# Find all blocks like `if (i === X) { ... }` or `case X:` depending on how the shaders are built.
# Actually, looking at the previous grep, it was `if (i === 1) { ... FragmentShader = `...` ... }`
matches = re.finditer(r'if\s*\(i\s*===\s*(\d+)\)\s*\{([^}]+?FragmentShader[\s\S]+?)break;', content)
classes = {}

for match in matches:
    class_id = match.group(1)
    block = match.group(2)
    uniforms = re.findall(r'uniform\s+\w+\s+(u\w+);', block)
    classes[class_id] = list(set(uniforms))

if not classes:
    # Maybe the blocks don't end in `break;`? Let's try splitting by `if (i ===`
    blocks = content.split('if (i === ')
    for block in blocks[1:]:
        match = re.match(r'^(\d+)\)\s*\{([\s\S]+?)FragmentShader', block)
        if match:
            class_id = match.group(1)
            # Find the end of the FragmentShader string
            # We just search for uniforms in the first 2000 chars of the shader
            uniforms = re.findall(r'uniform\s+\w+\s+(u\w+);', block[:3000])
            classes[class_id] = list(set(uniforms))

for class_id, uniforms in sorted(classes.items(), key=lambda x: int(x[0])):
    print(f"Class {class_id}: {', '.join(uniforms)}")
