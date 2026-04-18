import os
from bs4 import BeautifulSoup
import re

def refactor_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the major components to extract and remove
    top_bar = soup.find(id='topControlBar')
    left_panel = soup.find(id='leftPanel')
    bottom_bar = soup.find(id='bottomControlBar')

    # Visual buttons inside topBar
    visual_dock = soup.find(id='visualDock')
    visual_buttons_html = ""
    if visual_dock:
        visual_buttons_html = "".join([str(child) for child in visual_dock.children])
        # Just in case `style` is in there
        visual_buttons_html = re.sub(r'<style>.*?</style>', '', visual_buttons_html, flags=re.DOTALL)

    # Config components inside bottomBar
    matrix_panel = soup.find(id='matrixSettingsPanel')
    cyber_panel = soup.find(id='cyberSettingsPanel')
    galaxy_panel = soup.find(id='galaxySettingsPanel')

    matrix_html = str(matrix_panel) if matrix_panel else ""
    cyber_html = str(cyber_panel) if cyber_panel else ""
    galaxy_html = str(galaxy_panel) if galaxy_panel else ""

    preset_list_html = ""
    if left_panel:
        playlists = left_panel.find(id='playlists')
        if playlists:
            preset_list_html = "".join([str(c) for c in playlists.children])

    # Clean up absolute positioning from panels
    for panel in [matrix_html, cyber_html, galaxy_html]:
        if panel:
            panel = re.sub(r'fixed bottom-[0-9]+.*?z-\[[0-9]+\]', 'relative w-full', panel)
            panel = re.sub(r'<button onclick="document\.getElementById\(.*?\)\.classList\.add\(\'hidden\'\)".*?>.*?Back\s*</button>', '', panel, flags=re.DOTALL)
            panel = panel.replace('hidden', '') # show them all inside the tab
            panel = panel.replace('absolute', 'relative')
            if "matrixSettingsPanel" in panel: matrix_html = panel
            if "cyberSettingsPanel" in panel: cyber_html = panel
            if "galaxySettingsPanel" in panel: galaxy_html = panel

    unified_dock_html = f"""
    <!-- UNIFIED BOTTOM DOCK -->
    <footer id="unifiedBottomDock"
        class="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 z-[100] bg-black/80 backdrop-blur-xl border-t sm:border border-white/10 w-full sm:w-[95%] sm:max-w-xl transition-transform duration-500 ui-fade-target sm:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto">
        
        <!-- Tab Navigation Header -->
        <div class="flex overflow-x-auto no-scrollbar border-b border-white/10 px-2 py-3 gap-1 sm:gap-2 justify-start sm:justify-center w-full" id="dockTabs">
            <button data-tab="sessionsTab" class="dock-tab-btn active px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/10 text-white transition-all shadow-inner shrink-0">Sessions</button>
            <button data-tab="audioTab" class="dock-tab-btn px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 hover:bg-white/5 hover:text-white/80 transition-all shrink-0">Audio</button>
            <button data-tab="visualsTab" class="dock-tab-btn px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 hover:bg-white/5 hover:text-white/80 transition-all shrink-0">Visuals</button>
            <button data-tab="colorsTab" class="dock-tab-btn px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 hover:bg-white/5 hover:text-white/80 transition-all shrink-0">Colors</button>
            <button data-tab="configTab" id="configTabBtn" class="dock-tab-btn hidden px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 transition-all shadow-[0_0_10px_rgba(45,212,191,0.2)] shrink-0">Config</button>
        </div>

        <!-- Tab Content Area -->
        <div class="relative w-full flex-1 max-h-[50vh] overflow-y-auto px-4 sm:px-6 py-4" id="dockPanes">
            
            <!-- SESSIONS TAB -->
            <div id="sessionsTab" class="dock-pane flex flex-col gap-6 animate-fade-in-up">
                <!-- Session Timer -->
                <div class="flex flex-col items-center gap-1 justify-center w-full">
                    <div id="sessionTimer" class="font-mono text-3xl font-light tracking-wider text-white select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-colors duration-300">
                        <span id="timeRemaining">15:00</span>
                    </div>
                    <button id="timerSettingsBtn" class="premium-label hover:text-white transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        SESSION TIMER
                    </button>
                </div>
                <!-- Play Button -->
                <div class="flex justify-center w-full pb-2">
                    <button id="playBtn" class="w-16 h-16 rounded-full glass-lux border !border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:border-white/40 active:scale-95 transition-all group overflow-hidden relative" title="Play / Pause">
                        <div class="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
                        <svg id="playIcon" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="none" class="relative z-10 translate-x-0.5 transition-transform group-hover:scale-105">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <svg id="pauseIcon" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="none" class="hidden relative z-10 transition-transform group-hover:scale-105">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                    </button>
                </div>
                
                <!-- Presets (pulled from leftPanel) -->
                <div class="w-full flex flex-col gap-2">
                    <div class="flex justify-between items-center px-1 mb-2">
                        <span class="premium-label text-[10px] text-[var(--accent)] tracking-widest uppercase">Presets</span>
                        <button id="savePresetBtn" class="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all">Save Preset</button>
                    </div>
                    <div id="playlists" class="flex flex-col gap-2 max-h-40 overflow-y-auto no-scrollbar pb-4 w-full">
                        {preset_list_html}
                    </div>
                </div>
            </div>

            <!-- AUDIO TAB -->
            <div id="audioTab" class="dock-pane hidden flex flex-col gap-6 animate-fade-in-up">
                <div class="w-full flex flex-col items-center gap-4 py-2">
                    
                    <button id="rightToggle" class="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all flex flex-col items-center gap-2" title="Mixer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 20v-6M6 20V10M18 20V4" />
                        </svg>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Open Full Mixer</span>
                    </button>
                    <!-- Mode Toggles - Theme Aware -->
                    <div id="modeToggle" class="flex justify-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 shrink-0 w-full">
                        <button data-mode="binaural" class="mode-btn px-4 py-2 w-full rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 bg-white/10">
                            Binaural
                        </button>
                        <button data-mode="sonic" class="mode-btn px-4 py-2 w-full rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 opacity-50">
                            Sonic
                        </button>
                    </div>

                    <div class="w-full flex items-center justify-center gap-4 mt-2">
                        <button id="videoToggleBtn" class="glass-pill px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all text-[var(--text-muted)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                            <span class="text-[10px] font-bold uppercase">Video</span>
                        </button>
                        <button id="recordBtn" class="glass-pill px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/20 hover:text-red-400 transition-colors text-white">
                            <div class="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                            <span class="text-[10px] font-bold uppercase">Record</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- VISUALS TAB -->
            <div id="visualsTab" class="dock-pane hidden flex flex-col gap-4 animate-fade-in-up pb-4">
                <div class="flex items-center justify-between px-1 pb-2 border-b border-white/5">
                    <span class="premium-label text-[10px] text-[var(--accent)] tracking-widest uppercase">Select Visual Engine</span>
                </div>
                <!-- Re-injected visual buttons -->
                <div id="visualDock" class="flex flex-wrap justify-center items-center gap-2 overflow-visible tooltip-container max-w-full">
                    {visual_buttons_html}
                </div>
            </div>

            <!-- COLORS TAB -->
            <div id="colorsTab" class="dock-pane hidden flex flex-col gap-6 animate-fade-in-up w-full">
                
                <div class="flex justify-center gap-4 items-center w-full">
                    <!-- Color Picker -->
                    <div class="flex flex-col items-center gap-2">
                        <div class="relative group cursor-pointer" title="Particle Color">
                            <div id="colorPreview" class="w-12 h-12 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform active:scale-95" style="background-color: #60a9ff;"></div>
                            <input type="color" id="visualColorPicker" value="#60a9ff" class="absolute inset-0 opacity-0 w-full h-full cursor-pointer">
                        </div>
                        <span class="premium-label text-[8px] uppercase">Base</span>
                    </div>

                    <div class="flex flex-col gap-2 flex-1 max-w-[150px]">
                        <button id="randomColorBtn" class="glass-pill px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all text-white w-full border border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
                            <span class="text-[10px] font-bold uppercase tracking-wider">Random</span>
                        </button>
                        
                        <button id="vibrationToggleBtn" class="glass-pill px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all text-[var(--accent)] w-full border border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h3l2 8 4-16 4 16 2-8h3"></path></svg>
                            <span class="text-[10px] font-bold uppercase tracking-wider">Vibrate</span>
                        </button>
                    </div>
                </div>

                <div class="w-full h-px bg-white/5"></div>

                <!-- Dimmer Controls -->
                <div class="w-full flex flex-col gap-2 items-center px-2">
                    <div class="flex justify-between items-center w-full px-1">
                        <label class="premium-label text-[10px] text-[var(--text-muted)] tracking-widest">BACKGROUND DIMMER</label>
                        <span id="dimmerValue" class="premium-value text-[10px]">0%</span>
                    </div>
                    <input type="range" id="globalDimmerSlider" min="0" max="1" step="0.01" value="0" class="premium-slider w-full h-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] bg-white/10 rounded-full appearance-none">
                </div>
            </div>

            <!-- CONFIG TAB (Contextual) -->
            <div id="configTab" class="dock-pane hidden flex-col gap-6 animate-fade-in-up w-full">
                <!-- Wrapper for injected Panels. They will be toggled by JS classes -->
                <div class="w-full flex flex-col gap-4">
                    {matrix_html}
                    {cyber_html}
                    {galaxy_html}
                </div>
            </div>

        </div>
    </footer>
    """

    # We need to remove the top_bar, left_panel, and bottom_bar DOM nodes
    if top_bar: top_bar.decompose()
    if left_panel: left_panel.decompose()
    
    # Replace bottom_bar with the new dock
    dock_soup = BeautifulSoup(unified_dock_html, 'html.parser')
    if bottom_bar:
        bottom_bar.replace_with(dock_soup)
    else:
        # If it doesn't exist, append it to body
        soup.body.append(dock_soup)

    # Clean up empty headers/wrappers if they are now empty
    header = soup.find('header')
    if header and not header.contents:
        header.decompose()

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
    print("UI BeautifulSoup Refactoring Complete")

if __name__ == '__main__':
    refactor_html()
