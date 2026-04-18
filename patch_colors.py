import re

new_content = """    <!-- MAIN COLOR WHEEL AREA -->
    <div class="flex items-center justify-between gap-4 w-full px-2">
        <!-- Wheel Container -->
        <div class="flex-shrink-0 spectrum-wheel-container relative group">
            <div class="spectrum-wheel w-16 h-16 rounded-full cursor-pointer shadow-[0_0_20px_rgba(45,212,191,0.2)] group-hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all"></div>
            <!-- The invisible native input overlaying the wheel perfectly -->
            <input class="absolute inset-0 w-full h-full opacity-0 cursor-pointer p-0 m-0 border-0 z-10" id="visualColorPicker" type="color" value="#60a9ff"/>
            <!-- The center dynamic preview -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#121216] shadow-inner pointer-events-none transition-colors z-0" id="colorPreview" style="background-color: #60a9ff;"></div>
        </div>

        <!-- Controls Side -->
        <div class="flex flex-col gap-2 flex-grow max-w-[200px]">
            <button class="color-module premium-glass-card p-2 rounded-xl flex items-center justify-between hover:bg-white/10 active:scale-95 transition-all text-white border border-white/5 group" id="randomColorBtn">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover:text-white transition-colors">Randomize</span>
                <div class="w-6 h-6 rounded flex items-center justify-center bg-white/5 group-hover:bg-[var(--accent)]/20 transition-colors">
                    <svg fill="none" height="12" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24" width="12" class="text-white/70 group-hover:text-[var(--accent)]"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" x2="21" y1="20" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" x2="21" y1="15" y2="21"></line><line x1="4" x2="9" y1="4" y2="9"></line></svg>
                </div>
            </button>
            <button class="color-module premium-glass-card p-2 rounded-xl flex items-center justify-between hover:bg-white/10 active:scale-95 transition-all text-white border border-white/5 group" id="vibrationToggleBtn">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">Vibration</span>
                <div class="w-6 h-6 rounded flex items-center justify-center bg-white/5 group-hover:bg-[var(--accent)]/20 transition-colors">
                    <svg fill="none" height="12" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24" width="12" class="text-[var(--text-muted)] group-hover:text-[var(--accent)]"><path d="M2 12h3l2 8 4-16 4 16 2-8h3"></path></svg>
                </div>
            </button>
        </div>
    </div>

    <!-- DIMMER CONTROL -->
    <div class="color-module premium-glass-card p-3 rounded-2xl w-full flex flex-col gap-2 border border-white/5">
        <div class="flex justify-between items-center w-full">
            <label class="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                Background Dimmer
            </label>
            <span class="text-[10px] font-mono text-white" id="dimmerValue">0%</span>
        </div>
        <input class="w-full h-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] bg-white/10 rounded-full appearance-none slider-thumb-premium" id="globalDimmerSlider" max="1" min="0" step="0.01" type="range" value="0"/>
    </div>"""

def process(filepath):
    with open(filepath, "r") as f:
        content = f.read()
    
    start_match = re.search(r'<div[^>]*id="colorsTab"[^>]*>', content)
    if not start_match:
        print(f"colorsTab not found in {filepath}")
        return
    
    start_idx = start_match.end()
    
    # find the next top-level div corresponding to configTab
    end_match = re.search(r'<!-- CONFIG TAB \(Contextual \+ Global Settings\) -->', content[start_idx:])
    if not end_match:
        print(f"configTab not found after colorsTab in {filepath}")
        return
        
    end_idx = start_idx + end_match.start()
    
    # We want to keep the closing </div> of the colorsTab, which is exactly right before the ending match/comment
    # Let's find the </div> right before end_idx
    last_div_idx = content.rfind('</div>', start_idx, end_idx)
    if last_div_idx != -1:
        end_idx = last_div_idx
        
    updated = content[:start_idx] + "\n" + new_content + "\n" + content[end_idx:]
    with open(filepath, "w") as f:
        f.write(updated)
    print(f"Patched {filepath}")

process("index.html")
process("public/mindwave.html")
