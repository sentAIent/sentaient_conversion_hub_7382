import os
from bs4 import BeautifulSoup

file_path = "public/index.html"
if os.path.exists(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # 1. Nuke the old mobileBottomNav nav element
    nav = soup.find("nav", id="mobileBottomNav")
    if nav:
        print("Found mobileBottomNav - NUKING")
        nav.decompose()
    
    # 2. Nuke any unifiedBottomDock footer element
    footer = soup.find(id="unifiedBottomDock")
    if footer:
        print("Found unifiedBottomDock - NUKING")
        footer.decompose()

    # 3. Ensure the floatingMenuBtn is present for the new system
    # It might be in the body already, but let's be sure.
    if not soup.find(id="floatingMenuBtn"):
        print("Restoring floatingMenuBtn to body")
        btn_html = '''
        <button id="floatingMenuBtn" class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-teal-600 text-[var(--bg-main)] shadow-[0_0_30px_rgba(45,212,191,0.4)] flex items-center justify-center z-[250] active:scale-95 transition-all border border-white/20 group overflow-hidden">
            <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>
        '''
        btn_soup = BeautifulSoup(btn_html, 'html.parser')
        soup.body.append(btn_soup)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(str(soup))
    print("SUCCESS: index.html structural update complete.")
else:
    print("ERROR: index.html not found.")
