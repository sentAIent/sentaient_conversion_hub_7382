import re

with open("public/mindwave.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add floatingMenuBtn right after <body> or <div id="appOverlay">
if 'id="floatingMenuBtn"' not in html:
    btn_html = """
    <!-- Floating Main Menu Trigger -->
    <button id="floatingMenuBtn" class="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all shadow-2xl active:scale-95">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
    """
    html = html.replace('<div id="appOverlay"', btn_html + '\n<div id="appOverlay"')

# 2. Extract contents of tabs via Regex (we just extract the inner HTML roughly, but it's nested). 
# Actually, since bs4 messes up formatting, maybe I can just do string replacements?
