import re

JS_FILE = 'mindwave.html'

with open(JS_FILE, 'r') as f:
    content = f.read()

replacement = """<section class="mixer-section" data-section="djpads">
    <div class="flex justify-between items-center mb-3 section-header">
        <div class="flex items-center gap-2">
            <button
                class="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--accent)] transition-all text-[var(--text-muted)] hover:text-[var(--accent)]"
                onclick="toggleMixerSection('djpads')" title="Toggle DJ Studio Section">
                <svg class="section-arrow transition-transform duration-200" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9" />
                    <polyline points="6 3 12 9 18 3" />
                </svg>
            </button>
            <h3 class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">DJ Studio</h3>
            <button class="ml-2 transition-colors relative" aria-label="Info"
                onclick="showInfoModal('djpads'); event.stopPropagation();"
                style="background: transparent !important; border: none !important; box-shadow: none !important; color: var(--text-muted) !important;">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            </button>
        </div>
        <div class="flex flex-col gap-0.5" onclick="event.stopPropagation()">
            <div class="flex justify-between items-center px-0.5">
                <label class="premium-label">VOL</label>
                <span id="djMasterValue" class="premium-value">80%</span>
            </div>
            <input type="range" id="djMasterVolume" min="0" max="1" step="0.01" value="0.8"
                class="premium-slider w-20">
        </div>
    </div>
    <div class="section-content">
        <!-- Mode Toggle & Stop All - NOW AT TOP -->
        <div class="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
            <div class="flex items-center gap-3">
                <span class="text-[9px] text-[var(--text-muted)] uppercase">Mode:</span>
                <div class="flex gap-1 bg-black/30 rounded-lg p-0.5">
                    <button id="djModeOneShot"
                        class="dj-mode-btn px-2 py-1 rounded text-[9px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                        One-Shot
                    </button>
                    <button id="djModeLoop"
                        class="dj-mode-btn px-2 py-1 rounded text-[9px] font-bold bg-white/5 text-[var(--text-muted)] border border-white/10 hover:bg-white/10">
                        Loop
                    </button>
                </div>
            </div>
            <button id="djStopAll"
                class="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[var(--text-muted)] text-[9px] font-bold uppercase hover:bg-white/10 transition-all">
                ⏹ Stop All
            </button>
        </div>

        <!-- Category Tabs with Show All Button -->
        <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex gap-1 overflow-x-auto pb-1" id="djCategoryTabs">
                <button data-category="ambient" class="dj-cat-tab px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wide bg-purple-500/20 text-purple-400 border border-purple-500/30 whitespace-nowrap hover:bg-white/10">🎧 Ambient</button>
                <button data-category="pulse" class="dj-cat-tab px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wide bg-red-500/20 text-red-400 border border-red-500/30 whitespace-nowrap hover:bg-white/10">💓 Pulse</button>
                <button data-category="texture" class="dj-cat-tab px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wide bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 whitespace-nowrap hover:bg-white/10">🌌 Texture</button>
                <button data-category="healing" class="dj-cat-tab px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wide bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap hover:bg-white/10">🧘 Healing</button>
                <button data-category="drops" class="dj-cat-tab px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wide bg-blue-500/20 text-blue-400 border border-blue-500/30 whitespace-nowrap hover:bg-white/10">💥 Drops</button>
            </div>
            <button id="djShowAllCategoriesBtn"
                class="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wide bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 whitespace-nowrap hover:bg-cyan-500/30 transition-all flex items-center gap-1 shrink-0"
                title="Show All Categories">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2.5">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
                All
            </button>
        </div>

        <!-- Pads Grid -->
        <div id="djPadsGrid" class="grid grid-cols-3 gap-2">
            <!-- JS will populate pads here -->
        </div>

        <!-- DJ Sound Controls -->
        <div class="mt-4 pt-6 space-y-2">
            <div class="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                Sound Controls</div>

            <!-- Pitch (+/- semitones) -->
            <div class="flex flex-col gap-0.5">
                <div class="flex justify-between items-center px-0.5">
                    <label class="premium-label">PITCH</label>
                    <span id="djSoundPitchVal" class="premium-value">0</span>
                </div>
                <input type="range" id="djSoundPitch" min="-12" max="12" step="1" value="0"
                    class="premium-slider">
            </div>

            <!-- Tone (filter cutoff) -->
            <div class="flex flex-col gap-0.5">
                <div class="flex justify-between items-center px-0.5">
                    <label class="premium-label">TONE</label>
                    <span id="djSoundToneVal" class="premium-value">4k</span>
                </div>
                <input type="range" id="djSoundTone" min="200" max="8000" step="100" value="4000"
                    class="premium-slider">
            </div>

            <!-- Retrigger Speed -->
            <div class="flex flex-col gap-0.5 pb-4">
                <div class="flex justify-between items-center px-0.5">
                    <label class="premium-label">RE-SPEED</label>
                    <span id="djSoundSpeedVal" class="premium-value">1x</span>
                </div>
                <input type="range" id="djSoundSpeed" min="0.5" max="2" step="0.1" value="1"
                    class="premium-slider">
            </div>
        </div>
    </div>
</section>"""

# Using regex to replace the old djpads section
pattern = r'<section class="mixer-section" data-section="djpads">.*?</section>'
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(JS_FILE, 'w') as f:
    f.write(new_content)
print("Updated djpads section in mindwave.html!")
