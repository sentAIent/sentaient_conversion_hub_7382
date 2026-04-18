from bs4 import BeautifulSoup
import sys

with open("public/mindwave.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

dock = soup.find(id="unifiedBottomDock")
panel = soup.find(id="rightPanel")
tabs = soup.find(id="globalMenuTabs")
float_btn = soup.find(id="floatingMenuBtn")

print(f"Dock Found: {dock is not None}")
print(f"Right Panel Found: {panel is not None}")
print(f"Tabs Found: {tabs is not None}")
print(f"Float Btn Found: {float_btn is not None}")

# Check content area
content = soup.find(id="globalMenuContent")
print(f"Content Area Found: {content is not None}")

if content:
    panels = content.find_all("div", class_="global-panel")
    print(f"Total Panels in Sidebar: {len(panels)}")
    for p in panels:
        print(f" - Panel ID: {p.get('id')}")

