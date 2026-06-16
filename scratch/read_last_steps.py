with open('/Users/infinitealpha/.gemini/antigravity/brain/c5e1ae3d-cdf6-490f-8a67-ec4ae66e3a97/.system_generated/logs/overview.txt', 'r', errors='ignore') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
# Find lines with keywords like quota, failed, error, rate limit, etc.
for i, line in enumerate(lines):
    if any(k in line.lower() for k in ['quota', 'rate limit', 'limit reached', 'context limit', 'max tokens']):
        print(f"[{i}]: {line[:300]}")
