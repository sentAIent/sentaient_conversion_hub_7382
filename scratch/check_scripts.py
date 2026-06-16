with open('public/mindwave.html', 'r', errors='ignore') as f:
    html_content = f.read()

with open('public/mindwave-beta.html', 'r', errors='ignore') as f:
    beta_content = f.read()

print(f"mindwave.html: {len(html_content)} chars, {len(html_content.splitlines())} lines")
print(f"mindwave-beta.html: {len(beta_content)} chars, {len(beta_content.splitlines())} lines")

import re
print("\n=== Script tags in mindwave.html ===")
for m in re.finditer(r'<script.*?>([\s\S]*?)</script>', html_content):
    tag = m.group(0)
    # Print the tag structure, if it has a src print that, otherwise print first 80 chars
    src = re.search(r'src=["\'](.*?)["\']', tag)
    if src:
        print(f"External: {src.group(1)} (attr: {re.search(r'<script(.*?)(?:src=)', tag).group(1).strip()})")
    else:
        print(f"Inline: {tag[:120].replace(chr(10), ' ')}...")

print("\n=== Script tags in mindwave-beta.html ===")
for m in re.finditer(r'<script.*?>([\s\S]*?)</script>', beta_content):
    tag = m.group(0)
    src = re.search(r'src=["\'](.*?)["\']', tag)
    if src:
        print(f"External: {src.group(1)}")
    else:
        print(f"Inline: {tag[:120].replace(chr(10), ' ')}...")
