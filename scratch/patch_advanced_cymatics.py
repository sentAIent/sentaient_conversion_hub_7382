import re

with open('mindwave.html', 'r') as f:
    content = f.read()

advanced_html = """
        <!-- Advanced Cymatics (Classes 19-24) -->
        <div class="cymatics-class-container mb-6 border-t border-white/10 pt-6">
            <h4 class="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse"></span>
                Advanced Cymatics (Hyper-Resonance)
            </h4>
            <div class="grid grid-cols-2 gap-2">
                <button class="cymatics-pattern-btn p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-fuchsia-300 hover:border-fuchsia-400 transition-all" onclick="window.setCymaticPattern(19, 0)">Void Matrix</button>
                <button class="cymatics-pattern-btn p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-fuchsia-300 hover:border-fuchsia-400 transition-all" onclick="window.setCymaticPattern(20, 0)">Chronos Weave</button>
                <button class="cymatics-pattern-btn p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-fuchsia-300 hover:border-fuchsia-400 transition-all" onclick="window.setCymaticPattern(21, 0)">Plasma Bloom</button>
                <button class="cymatics-pattern-btn p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-fuchsia-300 hover:border-fuchsia-400 transition-all" onclick="window.setCymaticPattern(22, 0)">Heart Cymatics</button>
                <button class="cymatics-pattern-btn p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-fuchsia-300 hover:border-fuchsia-400 transition-all" onclick="window.setCymaticPattern(23, 0)">Sacred Sun</button>
                <button class="cymatics-pattern-btn p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-fuchsia-300 hover:border-fuchsia-400 transition-all" onclick="window.setCymaticPattern(24, 0)">Constellations</button>
            </div>
        </div>
"""

# Replace just before <!-- TAB: STUDIO -->
parts = content.split('<!-- TAB: STUDIO -->')
if len(parts) == 2:
    new_content = parts[0] + advanced_html + '\n            <!-- TAB: STUDIO -->' + parts[1]
    with open('mindwave.html', 'w') as f:
        f.write(new_content)
    print("Injected Advanced Cymatics successfully.")
else:
    print("Error: Could not split at TAB: STUDIO")

