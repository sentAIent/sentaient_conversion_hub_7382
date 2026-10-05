with open('src/components/icons/index.ts', 'r') as f:
    lines = f.readlines()

unique_lines = []
for line in lines:
    if line not in unique_lines:
        unique_lines.append(line)

with open('src/components/icons/index.ts', 'w') as f:
    f.writelines(unique_lines)
