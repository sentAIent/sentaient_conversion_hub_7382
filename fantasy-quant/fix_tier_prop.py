import re

with open('src/components/dfs/DFSDashboard.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r'(<PlayerRow[^>]+layout={layout})(\s*/>)',
    r'\1\n                  tier={tier}\2',
    content
)

with open('src/components/dfs/DFSDashboard.tsx', 'w') as f:
    f.write(content)
print("Updated PlayerRow props")
