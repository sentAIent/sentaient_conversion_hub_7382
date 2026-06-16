import sys

with open('mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace literal \n with actual newlines
if '\\n' in html:
    html = html.replace('\\n', '\n')
    with open('mindwave.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: Fixed literal newlines.")
else:
    print("NO LITERAL NEWLINES FOUND.")
