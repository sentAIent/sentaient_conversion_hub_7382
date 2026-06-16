import re

with open('mindwave.html', 'r') as f:
    html = f.read()

pattern = r"border-([a-z]+)-500/30 text-\[9px\] font-bold uppercase text-white shadow-\[0_0_12px_rgba\(217,70,239,0\.15\)\] hover:shadow-\[0_0_22px_rgba\(217,70,239,0\.5\)\] hover:border-\1-400"

def replacer(match):
    color = match.group(1)
    return f"border-{color}-500/30 text-[9px] font-bold uppercase text-white shadow-lg shadow-{color}-500/20 hover:shadow-xl hover:shadow-{color}-400/50 hover:border-{color}-400"

new_html, count = re.subn(pattern, replacer, html)
print(f"Replaced {count} instances.")

with open('mindwave.html', 'w') as f:
    f.write(new_html)
