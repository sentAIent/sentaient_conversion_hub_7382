import re

with open('src/components/dfs/DFSDashboard.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines[155:175]):
    print(f"{i+156}: {line}", end='')
