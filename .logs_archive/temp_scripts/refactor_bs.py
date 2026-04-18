from bs4 import BeautifulSoup
import copy

with open("public/mindwave.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

dock = soup.find(id="unifiedBottomDock")
right_panel = soup.find(id="rightPanel")

if not dock or not right_panel:
    print("Error: Could not find dock or right_panel")
    exit(1)

# Extract tab contents using copy so we can detach them safely
sessions_tab_children = [copy.copy(c) for c in dock.find(id="sessionsTab").contents]
audio_tab_children = [copy.copy(c) for c in dock.find(id="audioTab").contents]
visuals_tab_children = [copy.copy(c) for c in dock.find(id="visualsTab").contents]
colors_tab_children = [copy.copy(c) for c in dock.find(id="colorsTab").contents]
config_tab_children = [copy.copy(c) for c in dock.find(id="configTab").contents]

right_panel_content = right_panel.find("div", class_="px-6 py-8 pb-32")
old_mixer_children = [copy.copy(c) for c in right_panel_content.contents] if right_panel_content else []

# Modify rightPanel classes
right_panel["class"] = "fixed top-0 right-0 h-full w-full sm:w-[400px] glass-lux border-l border-white/10 transform translate-x-full transition-transform duration-500 z-[200] flex flex-col pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] ui-fade-target"

# Clear right panel completely
right_panel.clear()

# Construct new Right Panel inner HTML
new_inner = BeautifulSoup("""
    <!-- Header -->
    <div class="shrink-0 px-4 pt-10 pb-4 sm:pt-6 border-b border-white/10 bg-black/60 backdrop-blur-xl z-20 shadow-lg">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xs font-bold tracking-[0.3em] text-[var(--accent)] uppercase drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">Mindwave Studio</h2>
            <button id="closeGlobalMenuBtn" class="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-[var(--text-muted)] hover:text-white active:scale-95 shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
        
        <!-- Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1" id="globalMenuTabs">
            <button class="global-tab-btn flex-1 min-w-[70px] py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all bg-[var(--accent)] text-[var(--bg-main)] shadow-[0_0_15px_rgba(45,212,191,0.3)] border border-transparent" data-target="panel-sessions">App</button>
            <button class="global-tab-btn flex-1 min-w-[70px] py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all bg-white/5 border border-white/10 text-[var(--text-muted)] hover:bg-white/10 hover:text-white" data-target="panel-studio">Studio</button>
            <button class="global-tab-btn flex-1 min-w-[70px] py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all bg-white/5 border border-white/10 text-[var(--text-muted)] hover:bg-white/10 hover:text-white" data-target="panel-visuals">Visuals</button>
            <button class="global-tab-btn flex-1 min-w-[70px] py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all bg-white/5 border border-white/10 text-[var(--text-muted)] hover:bg-white/10 hover:text-white" data-target="panel-config">Config</button>
        </div>
    </div>
    
    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar px-4 py-6 relative" id="globalMenuContent">
        <div id="panel-sessions" class="global-panel flex flex-col gap-6"></div>
        <div id="panel-studio" class="global-panel hidden flex flex-col gap-6"></div>
        <div id="panel-visuals" class="global-panel hidden flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
            <!-- Colors First -->
            <div id="visuals-colors-section" class="w-full flex flex-col items-center">
                <span class="premium-label text-[10px] text-[var(--accent)] tracking-widest uppercase mb-2 w-full text-left">Color Palette</span>
            </div>
            
            <div class="w-full h-px bg-white/10 my-1"></div>
            
            <!-- Visual Engine Second -->
            <div id="visuals-options-section" class="w-full"></div>
        </div>
        <div id="panel-config" class="global-panel hidden flex flex-col gap-6"></div>
    </div>
""", "html.parser")

for child in list(new_inner.contents):
    right_panel.append(child)

def process_children(parent, clist, skip_ids=None, skip_classes=None):
    if not skip_ids: skip_ids = []
    if not skip_classes: skip_classes = []
    for c in clist:
        if c.name and c.has_attr("id") and c["id"] in skip_ids:
            continue
        if c.name and c.has_attr("class"):
            classes = c.get("class", [])
            if any(sc in classes for sc in skip_classes): continue
        parent.append(c)

process_children(right_panel.find(id="panel-sessions"), sessions_tab_children)
process_children(right_panel.find(id="panel-studio"), audio_tab_children, skip_ids=["rightToggle"], skip_classes=["sticky-hud"])
process_children(right_panel.find(id="panel-studio"), old_mixer_children)
process_children(right_panel.find(id="visuals-colors-section"), colors_tab_children)
process_children(right_panel.find(id="visuals-options-section"), visuals_tab_children)
process_children(right_panel.find(id="panel-config"), config_tab_children)

# Remove the bottom dock!
dock.extract()

floater = BeautifulSoup("""
<button id="floatingMenuBtn" class="fixed top-6 right-6 lg:top-10 lg:right-10 z-[100] w-14 h-14 rounded-full bg-black/60 shadow-xl backdrop-blur-md border border-[var(--accent)]/30 flex items-center justify-center text-white/80 hover:text-white hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all active:scale-95 group">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="group-hover:text-[var(--accent)] transition-colors"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
</button>
""", "html.parser")
soup.body.append(floater)

# Ensure no parsing issues formatted bad string lengths
html_str = str(soup)

# Let's fix some formatting using regex or simple replacements for some common issues like double newlines
# Actually, str(soup) handles it fine in python.

with open("public/mindwave.html", "w", encoding="utf-8") as f:
    f.write(html_str)

print("Successfully executed HTML refactor!")
