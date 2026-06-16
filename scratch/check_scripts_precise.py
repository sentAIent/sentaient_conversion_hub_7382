with open('public/mindwave.html', 'r', errors='ignore') as f:
    html_lines = f.readlines()

with open('public/mindwave-beta.html', 'r', errors='ignore') as f:
    beta_lines = f.readlines()

print("=== Script lines in mindwave.html ===")
for i, line in enumerate(html_lines):
    if '<script' in line or '.js' in line:
        if i > 2500 or any(kw in line for kw in ['main_', 'controls', 'persistence', 'visualizer']):
            print(f"{i+1}: {line.strip()}")

print("\n=== Script lines in mindwave-beta.html ===")
for i, line in enumerate(beta_lines):
    if '<script' in line or '.js' in line:
        if i > 2000 or any(kw in line for kw in ['main_', 'controls', 'persistence', 'visualizer']):
            print(f"{i+1}: {line.strip()}")
