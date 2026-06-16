export function initMarketingStudio() {
    const adminBtn = document.getElementById('adminMarketingBtn');
    if (!adminBtn) return;

    adminBtn.addEventListener('click', () => {
        // Hide profile modal
        const profileModal = document.getElementById('profileModal');
        if (profileModal) profileModal.classList.remove('active');
        
        showMarketingModal();
    });
}

function showMarketingModal() {
    let modal = document.getElementById('marketingStudioModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'marketingStudioModal';
        modal.className = 'modal fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4';
        
        modal.innerHTML = `
        <div class="glass-card p-6 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)] max-w-lg w-full flex flex-col gap-6 border border-amber-500/30">
            <!-- Header -->
            <div class="flex justify-between items-center pb-2 border-b border-white/10">
                <div class="flex items-center gap-3">
                    <span class="text-2xl">🎬</span>
                    <div>
                        <h3 class="text-lg font-bold text-amber-500 uppercase tracking-wider">Auto-Market Studio</h3>
                        <div class="text-[10px] text-amber-500/70 font-mono">NIRVANA ADMIN ENGINE</div>
                    </div>
                </div>
                <button id="closeMarketingBtn" class="p-2 rounded-full hover:bg-white/10 transition-colors" style="color: var(--text-muted);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <!-- Configuration Form -->
            <div class="space-y-5">
                
                <!-- Duration -->
                <div>
                    <label class="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2 block">Clip Duration</label>
                    <div class="grid grid-cols-3 gap-3">
                        <button class="duration-btn active py-2 rounded-lg border border-amber-500 bg-amber-500/20 text-amber-400 text-xs font-bold transition-all" data-sec="15">15s (Short)</button>
                        <button class="duration-btn py-2 rounded-lg border border-white/10 bg-white/5 text-[var(--text-muted)] text-xs font-bold transition-all hover:bg-white/10" data-sec="30">30s (Standard)</button>
                        <button class="duration-btn py-2 rounded-lg border border-white/10 bg-white/5 text-[var(--text-muted)] text-xs font-bold transition-all hover:bg-white/10" data-sec="60">60s (Long)</button>
                    </div>
                </div>

                <!-- Title / Hook -->
                <div>
                    <label class="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2 block">Video Title / Hook Text</label>
                    <div class="inline-edit-container group relative">
                        <div id="marketHookDisplay" class="w-full bg-black/20 border border-transparent rounded-lg px-4 py-3 text-sm text-white cursor-text hover:bg-black/40 hover:border-white/10 transition-colors">Focus your mind...</div>
                        <input type="text" id="marketHookInput" value="Focus your mind..." 
                            class="hidden absolute inset-0 w-full bg-black/60 border border-amber-500 rounded-lg px-4 py-3 text-sm text-white outline-none z-10 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    </div>
                </div>

                <!-- Subtitles -->
                <div>
                    <label class="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2 block">Auto-Captions (Comma Separated)</label>
                    <div class="inline-edit-container group relative">
                        <div id="marketCaptionsDisplay" class="w-full bg-black/20 border border-transparent rounded-lg px-4 py-3 text-sm text-white cursor-text hover:bg-black/40 hover:border-white/10 transition-colors min-h-[3rem]">Breathe in..., Breathe out...</div>
                        <textarea id="marketCaptionsInput" rows="2"
                            class="hidden absolute inset-0 w-full bg-black/60 border border-amber-500 rounded-lg px-4 py-3 text-sm text-white outline-none z-10 shadow-[0_0_15px_rgba(245,158,11,0.2)] custom-scrollbar resize-none">Breathe in..., Breathe out...</textarea>
                    </div>
                </div>

                <!-- Creative Options -->
                <div class="grid grid-cols-2 gap-4">
                    <!-- Ad Theme -->
                    <div>
                        <label class="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2 block">Ad Theme</label>
                        <select id="marketTheme" class="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:border-amber-500 outline-none transition-colors appearance-none cursor-pointer">
                            <option value="minimalist">Minimalist / Clean</option>
                            <option value="cyberpunk">Cyberpunk / Neon</option>
                            <option value="ethereal">Ethereal / Spiritual</option>
                            <option value="luxury">Luxury / Premium</option>
                            <option value="urgent">Urgent / Direct Response</option>
                        </select>
                    </div>
                    <!-- Ad Style -->
                    <div>
                        <label class="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2 block">Ad Style</label>
                        <select id="marketStyle" class="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:border-amber-500 outline-none transition-colors appearance-none cursor-pointer">
                            <option value="pov">POV / Relatable</option>
                            <option value="cinematic">Cinematic B-Roll</option>
                            <option value="educational">Educational / Tutorial</option>
                            <option value="testimonial">Testimonial Style</option>
                            <option value="aesthetic">Pure Aesthetic (No Text)</option>
                        </select>
                    </div>
                </div>

                <!-- Color Options -->
                <div>
                    <label class="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2 block">Brand Accent Colors</label>
                    <div class="flex gap-3">
                        <input type="color" id="marketColorPrimary" value="#f59e0b" class="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0 shrink-0">
                        <input type="color" id="marketColorSecondary" value="#a855f7" class="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0 shrink-0">
                        <div class="inline-edit-container group relative flex-1">
                            <div id="marketColorDetailsDisplay" class="w-full h-full bg-black/20 border border-transparent rounded-lg px-3 py-2 text-xs text-white cursor-text hover:bg-black/40 hover:border-white/10 transition-colors flex items-center">Any specific color instructions...</div>
                            <input type="text" id="marketColorDetailsInput" value="Any specific color instructions..." 
                                class="hidden absolute inset-0 w-full h-full bg-black/60 border border-amber-500 rounded-lg px-3 py-2 text-xs text-white outline-none z-10 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        </div>
                    </div>
                </div>

                <!-- Targets -->
                <div>
                    <label class="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2 block">Target Platforms (via n8n)</label>
                    <div class="flex gap-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="market-target accent-amber-500 w-4 h-4" value="tiktok" checked>
                            <span class="text-xs text-white font-bold">TikTok</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="market-target accent-amber-500 w-4 h-4" value="instagram" checked>
                            <span class="text-xs text-white font-bold">Instagram Reels</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="market-target accent-amber-500 w-4 h-4" value="linkedin">
                            <span class="text-xs text-white font-bold">LinkedIn</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Action Area -->
            <div class="mt-2 pt-5 border-t border-white/10 flex flex-col gap-3">
                <button id="startMarketingEngineBtn" class="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm uppercase tracking-wide hover:brightness-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="4" fill="currentColor" class="animate-pulse"/>
                    </svg>
                    Initialize Recording Engine
                </button>
                <div id="marketingEngineStatus" class="text-center text-[10px] font-mono text-amber-500/70 hidden">
                    Processing...
                </div>
            </div>
            
            <!-- Progress Overlay (Hidden initially) -->
            <div id="marketingProgressOverlay" class="absolute inset-0 bg-black/95 z-50 rounded-2xl flex flex-col items-center justify-center hidden p-8">
                <div class="w-20 h-20 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin mb-6"></div>
                <h3 id="marketingProgressTitle" class="text-lg font-bold text-amber-400 mb-2 text-center">Capturing Canvas...</h3>
                <p id="marketingProgressSubtitle" class="text-xs text-[var(--text-muted)] text-center mb-6">Do not change tabs or resize window.</p>
                <div class="w-full bg-white/10 rounded-full h-2 overflow-hidden max-w-xs">
                    <div id="marketingProgressBar" class="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-0 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                </div>
            </div>
        </div>
        `;

        document.body.appendChild(modal);

        // Bind events
        document.getElementById('closeMarketingBtn').onclick = () => {
            modal.classList.add('hidden');
        };

        // Duration Selection Logic
        let selectedDuration = 15;
        const durBtns = modal.querySelectorAll('.duration-btn');
        durBtns.forEach(btn => {
            btn.onclick = () => {
                durBtns.forEach(b => {
                    b.classList.remove('border-amber-500', 'bg-amber-500/20', 'text-amber-400', 'active');
                    b.classList.add('border-white/10', 'bg-white/5', 'text-[var(--text-muted)]');
                });
                btn.classList.add('border-amber-500', 'bg-amber-500/20', 'text-amber-400', 'active');
                btn.classList.remove('border-white/10', 'bg-white/5', 'text-[var(--text-muted)]');
                selectedDuration = parseInt(btn.getAttribute('data-sec'));
            };
        });

        // Inline Edit Logic
        function setupInlineEdit(displayId, inputId) {
            const display = document.getElementById(displayId);
            const input = document.getElementById(inputId);
            
            display.onclick = () => {
                display.classList.add('hidden');
                input.classList.remove('hidden');
                input.focus();
                // Select all text on focus for easy replacement
                input.setSelectionRange(0, input.value.length);
            };

            const commitChange = () => {
                input.classList.add('hidden');
                display.classList.remove('hidden');
                const val = input.value.trim();
                display.textContent = val || input.getAttribute('placeholder') || 'Click to edit...';
            };

            input.addEventListener('blur', commitChange);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    input.blur();
                }
            });
        }

        setupInlineEdit('marketHookDisplay', 'marketHookInput');
        setupInlineEdit('marketCaptionsDisplay', 'marketCaptionsInput');
        setupInlineEdit('marketColorDetailsDisplay', 'marketColorDetailsInput');

        // Start Engine Logic
        document.getElementById('startMarketingEngineBtn').onclick = async () => {
            const hook = document.getElementById('marketHookInput').value.trim();
            const captions = document.getElementById('marketCaptionsInput').value.trim();
            const targets = Array.from(modal.querySelectorAll('.market-target:checked')).map(cb => cb.value);
            
            // Creative Options
            const adTheme = document.getElementById('marketTheme').value;
            const adStyle = document.getElementById('marketStyle').value;
            const colorPrimary = document.getElementById('marketColorPrimary').value;
            const colorSecondary = document.getElementById('marketColorSecondary').value;
            const colorDetails = document.getElementById('marketColorDetailsInput').value.trim();

            if (targets.length === 0) {
                alert("Please select at least one target platform.");
                return;
            }

            // Show progress overlay
            const overlay = document.getElementById('marketingProgressOverlay');
            overlay.classList.remove('hidden');
            
            // Dynamic import the engine to prevent blocking main thread earlier
            try {
                const { runMarketingEngine } = await import('./marketing-recorder.js');
                await runMarketingEngine({
                    duration: selectedDuration,
                    hook: hook,
                    captions: captions,
                    targets: targets,
                    creative: {
                        theme: adTheme,
                        style: adStyle,
                        colorPrimary: colorPrimary,
                        colorSecondary: colorSecondary,
                        details: colorDetails
                    },
                    updateProgress: (title, subtitle, percent) => {
                        document.getElementById('marketingProgressTitle').textContent = title;
                        document.getElementById('marketingProgressSubtitle').textContent = subtitle;
                        document.getElementById('marketingProgressBar').style.width = percent + '%';
                    }
                });
                
                // Hide modal on success
                setTimeout(() => {
                    modal.classList.add('hidden');
                    overlay.classList.add('hidden');
                    document.getElementById('marketingProgressBar').style.width = '0%';
                }, 2000);
            } catch (err) {
                console.error('[Marketing Studio] Engine failed:', err);
                overlay.classList.add('hidden');
                alert("Recording engine failed: " + err.message);
            }
        };
    }
    
    modal.classList.remove('hidden');
}
