from bs4 import BeautifulSoup
import copy

with open("public/mindwave.html.bak_menu_refactor", "r", encoding="utf-8") as f:
    old_soup = BeautifulSoup(f, "html.parser")

with open("public/mindwave.html", "r", encoding="utf-8") as f:
    new_soup = BeautifulSoup(f, "html.parser")

old_right_panel = old_soup.find(id="rightPanel")

# Find the main content div in the old rightPanel
old_content_div = old_right_panel.find("div", class_=lambda c: c and "custom-scrollbar" in c and "flex-1" in c)

# Extract collapseAllBtn
collapse_btn = old_right_panel.find(id="collapseAllBtn")

# Find panel-studio in new html
panel_studio = new_soup.find(id="panel-studio")

# First, add a collapseAllBtn container at the top of panel_studio
btn_wrapper = new_soup.new_tag("div", attrs={"class": "flex justify-end w-full mb-[-10px] mt-[-10px] relative z-10"})
if collapse_btn:
    btn_wrapper.append(copy.copy(collapse_btn))
    panel_studio.insert(0, btn_wrapper) # insert at top

# Now add all old_content_div children to panel_studio if they don't already exist
if old_content_div:
    for child in list(old_content_div.contents):
        panel_studio.append(copy.copy(child))

with open("public/mindwave.html", "w", encoding="utf-8") as f:
    f.write(str(new_soup))

print("Fixed Studio Tab!")
