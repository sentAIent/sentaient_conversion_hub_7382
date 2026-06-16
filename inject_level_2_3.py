import sys

with open('mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

level2_names = ["Polygon", "Singularity", "Aura Genesis", "Void Matrix", "Stellar Nexus", "Crystalline Pulse"]
level2_html = ""
for i, name in enumerate(level2_names):
    idx = 6 + i
    level2_html += f'<button class="cymatics-pattern-btn p-1.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold uppercase text-cyan-300/80 hover:border-cyan-400/60 transition-all" onclick="selectCymaticPattern({idx})">{name}</button>\\n                                '

level3_names = ["Quantum Knot", "Quantum Flux", "Aetheric Weaver", "Astral", "Plasma Interference", "Opal Lattice", "Bioluminescent Fold", "Neon Geometria", "Ethereal Web", "Sacred Pulse"]
level3_html = ""
for i, name in enumerate(level3_names):
    idx = 12 + i
    level3_html += f'''<button class="cymatics-pattern-btn p-2.5 rounded-lg bg-white/5 border border-indigo-500/40 text-[9px] font-bold uppercase text-white shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:bg-indigo-500/20 hover:border-indigo-400 transition-all group relative overflow-hidden" onclick="selectCymaticPattern({idx})">
    <div class="absolute inset-0 bg-cover bg-center opacity-35 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" style="background-image: url('binaural-assets/images/prime_prime.png');"></div>
    <span class="relative z-10 group-hover:text-indigo-200 transition-colors tracking-wider">{name}</span>
</button>\\n                                '''

injection = f'''
                        <!-- Level 2 -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-cyan-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                                Level 2: Advanced Cymatics
                            </h4>
                            <div class="grid grid-cols-3 gap-2">
                                {level2_html}</div>
                        </div>

                        <!-- Advanced Cymatics (Level 3 - Quantum) -->
                        <div class="mt-6 border-t border-white/5 pt-4">
                            <h4 class="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
                                Level 3: Quantum Cymatics
                            </h4>
                            <div class="grid grid-cols-2 gap-3">
                                {level3_html}</div>
                        </div>
'''

target_block = '''<button class="cymatics-pattern-btn p-1.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold uppercase text-purple-300/80 hover:border-purple-400/60 transition-all" onclick="selectCymaticPattern(5)">Infinity Loop</button>
                                </div>'''

if target_block in html:
    html = html.replace(target_block, target_block + injection)
    with open('mindwave.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS")
else:
    print("FAILED TO FIND TARGET BLOCK")
