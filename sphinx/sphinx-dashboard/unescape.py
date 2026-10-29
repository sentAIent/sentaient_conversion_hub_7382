with open("src/components/SphinxMap.tsx", "r") as f:
    content = f.read()

content = content.replace(r"\`", "`")
content = content.replace(r"\$", "$")

with open("src/components/SphinxMap.tsx", "w") as f:
    f.write(content)

