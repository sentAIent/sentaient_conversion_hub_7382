import os

brain_dir = "/Users/infinitealpha/.gemini/antigravity/brain/"
term = "setCymaticMedium"
matches = []

for root, dirs, files in os.walk(brain_dir):
    for f in files:
        path = os.path.join(root, f)
        try:
            with open(path, 'r', errors='ignore') as file_obj:
                content = file_obj.read()
            if term in content:
                matches.append((path, len(content)))
        except Exception:
            continue

print(f"Found {len(matches)} files containing '{term}':")
for m, size in matches:
    print(f"  {m} (size={size})")
