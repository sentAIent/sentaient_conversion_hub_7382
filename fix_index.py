from bs4 import BeautifulSoup
import sys

# Step 1: Read mindwave.html to get the NEW structure
with open("public/mindwave.html", "r", encoding="utf-8") as f:
    mw_content = f.read()
    mw_soup = BeautifulSoup(mw_content, "html.parser")

new_btn = mw_soup.find(id="floatingMenuBtn")
new_panel = mw_soup.find(id="rightPanel")

if not new_btn or not new_panel:
    print("Error: Could not find new menu elements in mindwave.html")
    sys.exit(1)

# Step 2: Read index.html to update it
with open("public/index.html", "r", encoding="utf-8") as f:
    index_content = f.read()
    index_soup = BeautifulSoup(index_content, "html.parser")

# Find the old right panel to replace
old_panel = index_soup.find(id="rightPanel")
if old_panel:
    print("Replacing old rightPanel in index.html")
    old_panel.replace_with(new_panel)
else:
    print("Could not find rightPanel in index.html, appending to body")
    index_soup.body.append(new_panel)

# Ensure no unifiedBottomDock exists
old_dock = index_soup.find(id="unifiedBottomDock")
if old_dock:
    print("Deleting unifiedBottomDock from index.html")
    old_dock.decompose()

# Add the floating menu button if it doesn't exist
if not index_soup.find(id="floatingMenuBtn"):
    print("Adding floatingMenuBtn to index.html")
    index_soup.body.append(new_btn)

# Write back to index.html
with open("public/index.html", "w", encoding="utf-8") as f:
    f.write(str(index_soup))

print("index.html updated successfully")
