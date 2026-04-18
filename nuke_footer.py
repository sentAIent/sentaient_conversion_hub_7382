import os
from bs4 import BeautifulSoup

file_path = "public/index.html"
if os.path.exists(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # 1. Surgical Strike on every potential footer/nav ID
    ids_to_nuke = ["bottomControlBar", "mobileBottomNav", "unifiedBottomDock"]
    for target_id in ids_to_nuke:
        el = soup.find(id=target_id)
        if el:
            print(f"Surgical Strike: Nuked {target_id}")
            el.decompose()
        
        # Check by tag too
        tag_match = soup.find(lambda tag: tag.name in ["footer", "nav"] and tag.get('id') == target_id)
        if tag_match:
            print(f"Surgical Strike (Tag): Nuked {target_id}")
            tag_match.decompose()

    # 2. Ensure Floating Button is correctly placed for the NEW navigation
    if not soup.find(id="floatingMenuBtn"):
        print("Restoring floatingMenuBtn for the new global system")
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
        soup.body.append(BeautifulSoup(btn_html, 'html.parser'))

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(str(soup))
    print("SUCCESS: index.html bottom bar scrubbed.")
else:
    print("ERROR: index.html not found.")
