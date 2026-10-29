with open("src/components/SphinxMap.tsx", "r") as f:
    content = f.read()

content = content.replace("</Map>", "</div>\n      </Map>")

with open("src/components/SphinxMap.tsx", "w") as f:
    f.write(content)
