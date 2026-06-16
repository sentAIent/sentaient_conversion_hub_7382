const fs = require('fs');
const filePath = 'mindwave.html';
let html = fs.readFileSync(filePath, 'utf8');

const advancedHtml = `
                        <!-- Advanced Cymatics -->
                        <div class="mt-8 border-t border-white/10 pt-6">
                            <h4 class="text-[10px] text-fuchsia-400 uppercase tracking-widest mb-3 pb-1 border-b border-fuchsia-500/20">Advanced Procedural Geometry (Layer 2)</h4>
                            <div class="grid grid-cols-2 gap-3 mb-6">
                                <button class="cymatics-pattern-btn p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 text-[10px] font-bold uppercase text-purple-200 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all" onclick="window.setCymaticPattern(19, 0)">Void Matrix</button>
                                <button class="cymatics-pattern-btn p-3 rounded-xl bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/30 text-[10px] font-bold uppercase text-indigo-200 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all" onclick="window.setCymaticPattern(20, 0)">Chronos Weave</button>
                                <button class="cymatics-pattern-btn p-3 rounded-xl bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/30 text-[10px] font-bold uppercase text-cyan-200 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all" onclick="window.setCymaticPattern(21, 0)">Plasma Bloom</button>
                                <button class="cymatics-pattern-btn p-3 rounded-xl bg-gradient-to-br from-rose-900/40 to-black border border-rose-500/30 text-[10px] font-bold uppercase text-rose-200 hover:border-rose-400 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all" onclick="window.setCymaticPattern(22, 0)">Heart Cymatics</button>
                                <button class="cymatics-pattern-btn p-3 rounded-xl bg-gradient-to-br from-amber-900/40 to-black border border-amber-500/30 text-[10px] font-bold uppercase text-amber-200 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all" onclick="window.setCymaticPattern(23, 0)">Sacred Sun</button>
                                <button class="cymatics-pattern-btn p-3 rounded-xl bg-gradient-to-br from-sky-900/40 to-black border border-sky-500/30 text-[10px] font-bold uppercase text-sky-200 hover:border-sky-400 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all" onclick="window.setCymaticPattern(24, 0)">Constellations</button>
                            </div>
                            
                            <!-- Constellation Specific UI -->
                            <div id="constellationControls" class="p-4 rounded-xl bg-black/40 border border-sky-500/20">
                                <h5 class="text-[9px] text-sky-300 uppercase tracking-wider mb-3">Spirit Animal Selector</h5>
                                <div class="grid grid-cols-5 gap-2 mb-4">
                                    <button class="p-2 rounded bg-sky-900/30 border border-sky-500/30 text-[9px] uppercase hover:bg-sky-500/20" onclick="window.viz3D.cymaticsCore.activeVariationId=0; window.setCymaticPattern(24, 0)">Bear</button>
                                    <button class="p-2 rounded bg-sky-900/30 border border-sky-500/30 text-[9px] uppercase hover:bg-sky-500/20" onclick="window.viz3D.cymaticsCore.activeVariationId=1; window.setCymaticPattern(24, 1)">Lion</button>
                                    <button class="p-2 rounded bg-sky-900/30 border border-sky-500/30 text-[9px] uppercase hover:bg-sky-500/20" onclick="window.viz3D.cymaticsCore.activeVariationId=2; window.setCymaticPattern(24, 2)">Eagle</button>
                                    <button class="p-2 rounded bg-sky-900/30 border border-sky-500/30 text-[9px] uppercase hover:bg-sky-500/20" onclick="window.viz3D.cymaticsCore.activeVariationId=3; window.setCymaticPattern(24, 3)">Dragon</button>
                                    <button class="p-2 rounded bg-sky-900/30 border border-sky-500/30 text-[9px] uppercase hover:bg-sky-500/20" onclick="window.viz3D.cymaticsCore.activeVariationId=4; window.setCymaticPattern(24, 4)">Tiger</button>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-[9px] text-sky-200/70 uppercase tracking-widest">Connect Stars</span>
                                    <label class="relative inline-flex items-center cursor-pointer group">
                                        <input type="checkbox" id="c24LinesToggle" class="sr-only peer" onchange="window.viz3D.cymaticsCore.setConstellationLinesToggle(this.checked)" checked>
                                        <div class="w-11 h-6 bg-black/50 border border-cyan-500/30 rounded-full peer peer-checked:bg-cyan-500/20 peer-checked:border-cyan-500/50 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-cyan-400 peer-checked:after:border-white"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
`;

// Insert BEFORE the end of cymaticsPanel
const panelEndIndex = html.indexOf('</div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- TAB: STUDIO -->');
if (panelEndIndex !== -1) {
    html = html.substring(0, panelEndIndex) + advancedHtml + '\n' + html.substring(panelEndIndex);
    fs.writeFileSync(filePath, html);
    console.log("Appended Advanced Cymatics block successfully.");
} else {
    // try alternative
    const altIndex = html.indexOf('</div>\n            </div>\n            \n            <!-- TAB: STUDIO -->');
    if (altIndex !== -1) {
        html = html.substring(0, altIndex) + advancedHtml + '\n' + html.substring(altIndex);
        fs.writeFileSync(filePath, html);
        console.log("Appended Advanced Cymatics block successfully (alt).");
    } else {
        console.log("Could not find insertion point.");
    }
}
