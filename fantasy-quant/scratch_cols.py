import re

with open('src/components/dfs/DFSDashboard.tsx', 'r') as f:
    lines = f.readlines()

# find start and end of visibleCols includes
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "visibleCols.includes('pos')" in line and start_idx == -1:
        start_idx = i
    if "visibleCols.includes('value')" in line:
        end_idx = i + 4 # up to the closing )} of 'value'

if start_idx != -1 and end_idx != -1:
    cols_block = "".join(lines[start_idx:end_idx])
    
    col_pattern = r"\{visibleCols\.includes\('([^']+)'\)\s*&&\s*\(\s*(<.*?</div>\s*|.*?</span>\s*)\)\}"
    cols = re.findall(col_pattern, cols_block, flags=re.DOTALL)
    
    switch_body = "{visibleCols.map(colId => {\n          switch (colId) {\n"
    for col_id, html_content in cols:
        html_content = html_content.strip()
        html_content = re.sub(r'^<(div|span) ', f'<\\1 key={{colId}} ', html_content)
        # Indent properly
        html_lines = ["              " + l for l in html_content.split('\n')]
        html_formatted = "\n".join(html_lines)
        switch_body += f"            case '{col_id}': return (\n{html_formatted}\n            );\n"
    switch_body += "            default: return null;\n          }\n        })}\n"
    
    new_lines = lines[:start_idx] + [switch_body] + lines[end_idx:]
    with open('src/components/dfs/DFSDashboard.tsx', 'w') as f:
        f.writelines(new_lines)
    print("PlayerRow cols refactored successfully")
else:
    print("Could not find start/end idx")
