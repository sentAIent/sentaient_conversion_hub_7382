import sys

with open('public/mindwave-beta.html', 'r', encoding='utf-8') as f:
    beta_html = f.read()

with open('public/mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find matrixSettingsPanel in beta
beta_idx = beta_html.find('id="matrixSettingsPanel"')
if beta_idx == -1:
    print("Could not find matrixSettingsPanel in beta.")
    sys.exit(1)

start_idx = beta_html.rfind('<div', 0, beta_idx)
end_str = '<!-- RIGHT: Recording & Mixer Toggle -->'
end_idx = beta_html.find(end_str, start_idx)

if start_idx == -1 or end_idx == -1:
    print("Could not find boundaries in mindwave-beta.html")
    sys.exit(1)

matrix_panel_html = beta_html[start_idx:end_idx]

# Find matrixSettingsPanel in mindwave.html
h_idx = html.find('id="matrixSettingsPanel"')
if h_idx == -1:
    print("Could not find matrixSettingsPanel in mindwave.html.")
    sys.exit(1)

h_start = html.rfind('<div', 0, h_idx)
h_end = html.find(end_str, h_start)

if h_start == -1 or h_end == -1:
    print("Could not find boundaries in mindwave.html")
    sys.exit(1)

# Replace
# Strip whitespace from end of matrix_panel_html to ensure clean insertion
while matrix_panel_html.endswith(' ') or matrix_panel_html.endswith('\n'):
    matrix_panel_html = matrix_panel_html[:-1]

# We need to maintain the indentation before <!-- RIGHT... so let's add some spaces before it
html = html[:h_start] + matrix_panel_html + '\n\n            ' + html[h_end:]

with open('public/mindwave.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Synced matrixSettingsPanel perfectly.")
