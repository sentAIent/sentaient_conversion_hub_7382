import os

app_dir = "/Users/infinitealpha/.gemini/antigravity"
results = []
for root, dirs, files in os.walk(app_dir):
    for f in files:
        if "mindwave" in f.lower():
            results.append(os.path.join(root, f))

print(f"Found {len(results)} files:")
for r in results:
    print(r)
