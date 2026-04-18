import re

with open("index.html", "r") as f:
    content = f.read()

# We want to replace the contents inside id="visualDock"
# from exactly <!-- Re-injected visual buttons --> ... till just before "<!-- NEW: Active Visual Settings Area (Moved from Config) -->"

start_marker = '<!-- Re-injected visual buttons -->\n<div class="flex flex-wrap justify-center items-center gap-2 overflow-visible tooltip-container max-w-full" id="visualDock">\n'
end_marker = '\n    <!-- NEW: Active Visual Settings Area (Moved from Config) -->'

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Start marker not found")
    # let's try a softer find
    match = re.search(r'<div[^>]*id="visualDock"[^>]*>', content)
    if match:
        start_idx = match.end()
        start_marker = match.group(0)
    else:
        exit(1)
else:
    start_idx += len(start_marker)

end_idx = content.find(end_marker)
if end_idx == -1:
    print("End marker not found")
    exit(1)

new_content = """                    
    <!-- PREMIUM VISUAL SELECTOR CARDS -->
    <div class="w-full flex overflow-x-auto gap-3 pb-2 pt-1 px-1 custom-scrollbar snap-x no-scrollbar" style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
        
        <!-- SPHERE -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="sphereBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="sphere" type="color" value="#60a9ff"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">SPHERE</span>
                <span class="text-[9px] text-[var(--accent)]">Geometry Mode</span>
            </div>
        </button>

        <!-- CUBE -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="cubeBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="cube" type="color" value="#60a9ff"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">CUBE</span>
                <span class="text-[9px] text-[var(--accent)]">Structure Mode</span>
            </div>
        </button>

        <!-- DRAGON -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="dragonBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="dragon" type="color" value="#60a9ff"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5z"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">DRAGON</span>
                <span class="text-[9px] text-[var(--accent)]">Fractal Mode</span>
            </div>
        </button>

        <!-- GALAXY -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="galaxyBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="galaxy" type="color" value="#60a9ff"/>
            <!-- Settings controls -->
            <div class="absolute top-2 right-2 flex gap-1 z-20">
                <div class="w-5 h-5 rounded hover:bg-white/20 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-white/20" id="galaxySunToggle" onclick="event.stopPropagation(); toggleGalaxySun();" title="Toggle Sun">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" class="text-amber-400"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/></svg>
                </div>
                <div class="w-5 h-5 rounded hover:bg-white/20 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-white/20" id="galaxySettingsToggle" onclick="event.stopPropagation(); toggleGalaxySettings(this);" title="Settings">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
            </div>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">GALAXY</span>
                <span class="text-[9px] text-[var(--accent)]">Cosmos Mode</span>
            </div>
        </button>

        <!-- MANDALA -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="mandalaBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="mandala" type="color" value="#60a9ff"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">MANDALA</span>
                <span class="text-[9px] text-[var(--accent)]">Symmetry Mode</span>
            </div>
        </button>

        <!-- FLOW -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="flowBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="particles" type="color" value="#60a9ff"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">FLOW</span>
                <span class="text-[9px] text-[var(--accent)]">Particle Mode</span>
            </div>
        </button>

        <!-- WARP -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="lightspeedBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="lightspeed" type="color" value="#60a9ff"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">WARP</span>
                <span class="text-[9px] text-[var(--accent)]">Speed Mode</span>
            </div>
        </button>
        
        <!-- LAVA -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="lavaBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="lava" type="color" value="#ed8936"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[#ed8936] group-hover:shadow-[0_0_10px_rgba(237,137,54,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2c0-1.1.9-2 2-2h1.66"/><path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1c0-1.1.9-2 2-2h1.66"/><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">LAVA</span>
                <span class="text-[9px] text-[#ed8936]">Plasma Mode</span>
            </div>
        </button>

        <!-- FIRE -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="fireplaceBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="fireplace" type="color" value="#ed8936"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[#ed8936] group-hover:shadow-[0_0_10px_rgba(237,137,54,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">FIRE</span>
                <span class="text-[9px] text-[#ed8936]">Embers Mode</span>
            </div>
        </button>

        <!-- RAIN -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="rainBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="rainforest" type="color" value="#4ade80"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[#4ade80] group-hover:shadow-[0_0_10px_rgba(74,222,128,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><path d="M20 16.2A6.5 6.5 0 0 1 9.3 14a5.5 5.5 0 0 0 5.8-10.6 8 8 0 0 1 12 8A6.5 6.5 0 0 1 20 16.2Z"/><path d="m8 19 2 2"/><path d="m14 19 2 2"/><path d="m11 20 2 2"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">RAIN</span>
                <span class="text-[9px] text-[#4ade80]">Precipitation</span>
            </div>
        </button>

        <!-- ZEN -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="zenBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="zengarden" type="color" value="#f472b6"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[#f472b6] group-hover:shadow-[0_0_10px_rgba(244,114,182,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><path d="m12 14-4-4 4-4"/><path d="M8 10h12"/><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">ZEN</span>
                <span class="text-[9px] text-[#f472b6]">Nature Mode</span>
            </div>
        </button>

        <!-- OCEAN -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="oceanBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="ocean" type="color" value="#38bdf8"/>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[#38bdf8] group-hover:shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><path d="M2 12h20"/><path d="M2 18h20"/><path d="M2 6h20"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">OCEAN</span>
                <span class="text-[9px] text-[#38bdf8]">Aquatic Mode</span>
            </div>
        </button>

        <!-- CYBER -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="cyberBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="cyber" type="color" value="#00FF41"/>
            <div class="absolute top-2 right-2 z-20">
                <div class="w-5 h-5 rounded hover:bg-white/20 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-white/20" id="cyberSettingsToggle" onclick="event.stopPropagation(); toggleCyberSettings(this);" title="Settings">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[#00FF41]"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
            </div>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[#00FF41] group-hover:shadow-[0_0_10px_rgba(0,255,65,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">CYBER</span>
                <span class="text-[9px] text-[#00FF41]">Neon Mode</span>
            </div>
        </button>

        <!-- MATRIX -->
        <button class="visual-btn snap-center premium-glass-card rounded-2xl group relative flex flex-col items-start justify-between min-w-[120px] h-28 p-3 hover:scale-[1.02] active:scale-95 shrink-0" id="matrixBtn">
            <input class="absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" data-visual-color="matrix" type="color" value="#00FF41"/>
            <div class="absolute top-2 right-2 z-20">
                <div class="w-5 h-5 rounded hover:bg-white/20 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-white/20" id="matrixSettingsToggle" onclick="event.stopPropagation(); toggleMatrixSettings(this);" title="Settings">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[#00FF41]"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
            </div>
            <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[#00FF41] group-hover:shadow-[0_0_10px_rgba(0,255,65,0.5)] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white/70 group-hover:text-white transition-colors"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            </div>
            <div class="flex flex-col text-left w-full mt-2">
                <span class="text-xs font-bold text-white tracking-wide">MATRIX</span>
                <span class="text-[9px] text-[#00FF41]">Code Mode</span>
            </div>
        </button>
    </div>
"""

content = content[:start_idx] + new_content + content[end_idx:]

with open("index.html", "w") as f:
    f.write(content)

