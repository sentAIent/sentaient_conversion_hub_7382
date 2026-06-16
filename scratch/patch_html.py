import os

# 1. Read Uploads section
with open('scratch/uploads_section.html', 'r') as f:
    uploads_html = f.read()

# 2. Read Classical section
with open('scratch/classical_section.html', 'r') as f:
    classical_html = f.read()

# 3. Create the clean stories section
stories_html = """<section class="mixer-section mb-6" data-section="stories">
                <div class="flex justify-between items-center mb-4 cursor-pointer section-header"
                    onclick="toggleMixerSection('stories')">
                    <div class="flex items-center gap-4">
                        <svg class="section-arrow transition-transform duration-200" width="12" height="12"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                        <h3 class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Sleep Stories
                        </h3>
                        <button class="ml-2 transition-colors relative" aria-label="Info"
                            onclick="showInfoModal('stories'); event.stopPropagation();"
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
                </div>
                <div class="section-content mt-6 space-y-6">
                    <!-- Story Cards (hardcoded grid list) -->
                    <div class="grid grid-cols-1 gap-4">
                        <!-- Story 1: Cosmic Voyage -->
                        <div class="story-card p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-all flex flex-col gap-3 group relative overflow-hidden">
                            <div class="flex justify-between items-start">
                                <div class="flex flex-col gap-0.5">
                                    <span class="text-xs font-bold text-white group-hover:text-[var(--accent)] transition-colors">Cosmic Voyage</span>
                                    <span class="text-[9px] text-[var(--text-muted)] uppercase font-mono tracking-wider">Deep Space Journey • 15:00</span>
                                </div>
                                <span class="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[8px] uppercase tracking-wider font-mono">Ambient</span>
                            </div>
                            <p class="text-[10px] text-[var(--text-muted)] leading-relaxed">Drift through cosmic nebulae and distant starlight, guided by deep generative space drones and tranquil narration.</p>
                            <div class="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                                <div class="flex items-center gap-2">
                                    <button onclick="playMeditationStory('cosmic-voyage', this)"
                                        class="play-story-btn p-2 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/35 text-[var(--accent)] hover:text-white transition-all flex items-center justify-center"
                                        title="Play Cosmic Voyage">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="story-progress-container flex-1 mx-3 hidden">
                                    <div class="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                                        <div class="story-progress bg-[var(--accent)] h-full w-0 transition-all duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Story 2: Rainforest Healing -->
                        <div class="story-card p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-all flex flex-col gap-3 group relative overflow-hidden">
                            <div class="flex justify-between items-start">
                                <div class="flex flex-col gap-0.5">
                                    <span class="text-xs font-bold text-white group-hover:text-[var(--accent)] transition-colors">Rainforest Healing</span>
                                    <span class="text-[9px] text-[var(--text-muted)] uppercase font-mono tracking-wider">Nature Immersion • 20:00</span>
                                </div>
                                <span class="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] uppercase tracking-wider font-mono">Nature</span>
                            </div>
                            <p class="text-[10px] text-[var(--text-muted)] leading-relaxed">Deep rainforest atmospheric soundscape with healing Solfeggio frequencies and soft rain to soothe hyper-active neural activity.</p>
                            <div class="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                                <div class="flex items-center gap-2">
                                    <button onclick="playMeditationStory('rainforest-healing', this)"
                                        class="play-story-btn p-2 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/35 text-[var(--accent)] hover:text-white transition-all flex items-center justify-center"
                                        title="Play Rainforest Healing">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="story-progress-container flex-1 mx-3 hidden">
                                    <div class="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                                        <div class="story-progress bg-[var(--accent)] h-full w-0 transition-all duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Story 3: Ancient Monasteries -->
                        <div class="story-card p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-all flex flex-col gap-3 group relative overflow-hidden">
                            <div class="flex justify-between items-start">
                                <div class="flex flex-col gap-0.5">
                                    <span class="text-xs font-bold text-white group-hover:text-[var(--accent)] transition-colors">Ancient Monasteries</span>
                                    <span class="text-[9px] text-[var(--text-muted)] uppercase font-mono tracking-wider">Tibetan Zen Chants • 12:00</span>
                                </div>
                                <span class="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[8px] uppercase tracking-wider font-mono">Zen Chants</span>
                            </div>
                            <p class="text-[10px] text-[var(--text-muted)] leading-relaxed">Authentic Tibetan bell resonations and deep throat singing echoes designed for transcendental meditation sessions.</p>
                            <div class="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                                <div class="flex items-center gap-2">
                                    <button onclick="playMeditationStory('ancient-monasteries', this)"
                                        class="play-story-btn p-2 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/35 text-[var(--accent)] hover:text-white transition-all flex items-center justify-center"
                                        title="Play Ancient Monasteries">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="story-progress-container flex-1 mx-3 hidden">
                                    <div class="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                                        <div class="story-progress bg-[var(--accent)] h-full w-0 transition-all duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>"""

# 4. Construct complete replacement block
replacement_block = f"""{stories_html}

            <div class="h-6 border-b border-white/5 mb-6"></div>

            {uploads_html}

            <div class="h-6 border-b border-white/5 mb-6"></div>

            {classical_html}
                </div>
            </div>"""

def patch_file(filepath):
    print(f"Patching {filepath}...")
    with open(filepath, 'r') as f:
        content = f.read()

    start_str = '<section class="mixer-section" data-section="stories">'
    start_pos = content.find(start_str)
    if start_pos == -1:
        print(f"Could not find start_str in {filepath}!")
        return False

    # Find the end of data-section="stories" block
    end_marker = 'id="classicalForwardBtn"'
    end_search = content.find(end_marker, start_pos)
    if end_search == -1:
        print(f"Could not find end_marker in {filepath}!")
        return False

    end_pos = content.find('</div>', end_search) # inside controls row
    end_pos = content.find('</div>', end_pos + 6) # past row
    end_pos = content.find('</div>', end_pos + 6) # past panel
    end_pos = content.find('</div>', end_pos + 6) # past section
    end_pos = content.find('</div>', end_pos + 6) # past sidebar-section
    end_pos = content.find('</div>', end_pos + 6) # past tab-panel (tab-atmosphere)

    original_block = content[start_pos:end_pos+6]
    
    # Do replacement
    new_content = content[:start_pos] + replacement_block + content[end_pos+6:]
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print(f"Successfully patched {filepath}!")
    return True

patch_file('public/mindwave.html')
patch_file('public/index.html')
