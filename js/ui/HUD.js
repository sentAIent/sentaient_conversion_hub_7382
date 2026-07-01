class HUDManager {
    constructor(game) {
        this.game = game;
        this.activeLayout = localStorage.getItem('hudLayout') || 'compact';
        this.initGlobalListeners();
    }

    initGlobalListeners() {
        // MAJESTIC UX: Click-outside-to-close for all fullscreen modals
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('fullscreen-modal')) {
                e.target.style.display = 'none';
                console.log(`[HUD] Majestic Dismiss: Closed modal ${e.target.id}`);
            }
        });
    }

    setLayout(type) {
        localStorage.setItem('hudLayout', type);
        this.activeLayout = type;
        
        const container = document.body;
        if (!container) return;

        // Reset all layout classes
        container.classList.remove('layout-compact', 'layout-expanded', 'layout-minimal', 'layout-cinematic');
        container.classList.add(`layout-${type}`);

        // Positioning logic for specific elements based on layout
        this.applyLayoutPositioning(type);
    }

    applyLayoutPositioning(type) {
        const setCoords = (id, coords) => {
            const el = document.getElementById(id);
            if (!el) return;
            Object.entries(coords).forEach(([k, v]) => el.style[k] = v);
        };

        const sections = ['sectionVitals', 'sectionMission', 'sectionRadar', 'sectionFactions', 'walletValue', 'joystick-container'];
        const setVisibility = (s, visible) => {
            const el = document.getElementById(s);
            if (el) el.style.opacity = visible ? '1' : '0';
        };

        if (type === 'cinematic') {
            sections.forEach(s => setVisibility(s, false));
            // Add Letterbox Bars if not present
            let bars = document.getElementById('cinematicBars');
            if (!bars) {
                bars = document.createElement('div');
                bars.id = 'cinematicBars';
                bars.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:999; display:flex; flex-direction:column; justify-content:space-between; animation: barsIn 1s forwards;';
                bars.innerHTML = `
                    <div style="height: 10%; background: #000;"></div>
                    <div style="height: 10%; background: #000;"></div>
                `;
                document.body.appendChild(bars);
                
                if (!document.getElementById('cinematicStyles')) {
                    const style = document.createElement('style');
                    style.id = 'cinematicStyles';
                    style.innerHTML = '@keyframes barsIn { from { height: 0; } to { height: 100%; } }';
                    document.head.appendChild(style);
                }
            }
            bars.style.display = 'flex';
            bars.style.opacity = '1';
        } else {
            sections.forEach(s => setVisibility(s, true));
            const bars = document.getElementById('cinematicBars');
            if (bars) {
                bars.style.opacity = '0';
                setTimeout(() => { if (this.activeLayout !== 'cinematic') bars.style.display = 'none'; }, 1000);
            }

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;

            if (type === 'compact') {
                // Positional logic moved to CSS Grid (styles.css)
                // console.log('[HUD] Layout set to compact');
            } else if (type === 'expanded') {
                // console.log('[HUD] Layout set to expanded');
            }
        }
    }

    styleGem(type) {
        const info = MINERAL_TYPES[type] || { color: '#fff' };
        return `
            width: 12px;
            height: 12px;
            background: ${info.color};
            border-radius: 2px;
            box-shadow: 0 0 8px ${info.color};
            display: inline-block;
            margin-right: 8px;
        `;
    }

    stylePlanet(type) {
        const colors = {
            'terrestrial': '#44aaff',
            'gas_giant': '#ffaa44',
            'ice_giant': '#88ffff',
            'lava': '#ff4400',
            'toxic': '#55ff55'
        };
        return colors[type] || '#ffffff';
    }

    updateSurfaceUI() {
        if (!this.game.surfaceMode) return;
        const planet = this.game.surfaceManager.activeSurface;
        if (!planet) return;

        let surfaceOverlay = document.getElementById('surfaceOverlay');
        if (!surfaceOverlay) {
            surfaceOverlay = document.createElement('div');
            surfaceOverlay.id = 'surfaceOverlay';
            surfaceOverlay.style.cssText = `
                position: fixed; top: 120px; left: 20px;
                padding: 15px; background: rgba(0, 10, 20, 0.85);
                border-left: 4px solid #00ffaa; border-radius: 0 10px 10px 0;
                color: #fff; font-family: Orbitron, sans-serif;
                z-index: 1000; display: flex; flex-direction: column; gap: 8px;
                backdrop-filter: blur(5px); animation: slideIn 0.5s forwards;
            `;
            document.body.appendChild(surfaceOverlay);
            
            if (!document.getElementById('surfaceOverlayStyles')) {
                const style = document.createElement('style');
                style.id = 'surfaceOverlayStyles';
                style.textContent = `@keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }`;
                document.head.appendChild(style);
            }
        }

        surfaceOverlay.style.display = 'flex';
        surfaceOverlay.innerHTML = `
            <div style="font-size: 10px; color: #00ffaa; letter-spacing: 2px;">📍 SURFACE TELEMETRY</div>
            <div style="font-size: 16px; font-weight: bold;">${planet.name.toUpperCase()}</div>
            <div style="font-size: 11px; color: #aaa;">Atmosphere: ${planet.type.replace('_', ' ')}</div>
            <div style="margin-top: 10px; display: flex; gap: 10px;">
                <button class="btn-small" onclick="window.game.baseBuilder.openBaseBuilder(window.game.surfaceManager.activeSurface)" style="border-color: #00ffaa; color: #00ffaa;">🏗️ CONSTRUCTION BRIDGE</button>
                <button class="btn-small" onclick="window.game.surfaceManager.takeOff()" style="border-color: #ffaa00; color: #ffaa00;">🚀 TAKE OFF</button>
            </div>
        `;
    }

    toggleBgStyle(style) {
        // Source of truth logic is in script.js (InterstellarEngine)
        if (this.game && this.game.toggleBgStyle) {
            this.game.toggleBgStyle(style);
        } else {
            // Fallback for standalone HUD usage or late-init
            if (!this.game.activeStyles) return;
            if (this.game.activeStyles.has(style)) this.game.activeStyles.delete(style);
            else this.game.activeStyles.add(style);
            this.updateBgUI();
        }
    }

    updateBgUI() {
        const container = document.getElementById('bgStylesList');
        if (!container) return;

        const styles = ['deep-space', 'nebula-blue', 'nebula-purple', 'star-cluster'];
        container.innerHTML = styles.map(s => `
            <div onclick="window.game.hudManager.toggleBgStyle('${s}')" 
                 style="padding:5px; margin:2px; border:1px solid ${this.game.activeStyles.has(s) ? '#00ffcc' : '#444'}; 
                        background:${this.game.activeStyles.has(s) ? 'rgba(0,255,204,0.2)' : 'transparent'}; cursor:pointer; font-size:10px;">
                ${s.replace('-', ' ').toUpperCase()}
            </div>
        `).join('');
    }


    updateWalletUI() {
        const creditsEl = document.getElementById('walletValue');
        if (creditsEl) {
            creditsEl.textContent = this.game.credits.toLocaleString();
        }
        const creditsDisplay = document.getElementById('creditsDisplay'); // Legacy support
        if (creditsDisplay) {
            creditsDisplay.textContent = this.game.credits.toLocaleString();
        }
    }

    showEmpireOverview() {
        try {
            // Create Empire Overview Modal
            let modal = document.getElementById('empireModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'empireModal';
                modal.className = 'fullscreen-modal';
                document.body.appendChild(modal);
            }

            modal.style.display = 'flex';
            
            const bases = this.game.spaceBases || [];
            const baseHTML = bases.map(base => {
                const hasShield = Object.values(base).some(v => v === 'shield' || v === 'shield_gen');
                const hasLogistics = Object.values(base).some(v => v === 'log');
                const defCount = Object.values(base).filter(v => v === 'def').length;
                const stabilityColor = (base.stability || 100) > 70 ? '#00ffaa' : ((base.stability || 100) > 30 ? '#ffaa00' : '#ff4444');
                const isCapital = base.planetName === this.game.baseBuilder?.capitalBaseName;
                
                // Calculate Rates for Phase 12/16 UI
                let creditRate = 0;
                let rpRate = 0;
                Object.values(base).forEach(v => {
                    if (v === 'mine' || v === 'extractor') creditRate += (v === 'mine' ? 10 : 25);
                    if (v === 'research' || v === 'research_lab') rpRate += (v === 'research' ? 1 : 2);
                });

                return `
                <div style="background: ${isCapital ? 'rgba(255,215,0,0.15)' : 'rgba(0,255,170,0.1)'}; border: 1px solid ${isCapital ? '#ffd700' : '#00ffaa'}; padding: 20px; border-radius: 10px; display:flex; flex-direction:column; gap:10px; transition: transform 0.3s; position:relative;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                    ${isCapital ? '<div style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:#ffd700; color:#000; font-size:8px; padding:2px 8px; border-radius:10px; font-weight:bold; letter-spacing:1px; box-shadow:0 0 10px #ffd700;">IMPERIAL CAPITAL</div>' : ''}
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <h3 style="color: ${isCapital ? '#ffd700' : '#fff'}; margin: 0; font-family:Orbitron; letter-spacing:1px;">${base.planetName}</h3>
                        <span style="font-size:9px; color:${isCapital ? '#ffd700' : '#00ffaa'}; background:rgba(0,255,170,0.1); padding:2px 6px; border-radius:10px;">${isCapital ? 'CORE HUB' : 'FRONTIER OUTPOST'}</span>
                    </div>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                        <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:5px; text-align:center;">
                            <div style="font-size:8px; color:#888;">PASSIVE INCOME</div>
                            <div style="color:#ffd700; font-weight:bold;">$${creditRate}/min</div>
                        </div>
                        <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:5px; text-align:center;">
                            <div style="font-size:8px; color:#888;">RESEARCH RATE</div>
                            <div style="color:#00f3ff; font-weight:bold;">+${rpRate} RP/min</div>
                        </div>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:8px; border-radius:5px; font-size:10px;">
                        <span style="color:${hasShield ? '#00ffaa' : '#ff4444'}">${hasShield ? '🛡️ SHIELDED' : '⚠️ NO SHIELD'}</span>
                        <span style="color:${hasLogistics ? '#00ccff' : '#666'}">${hasLogistics ? '📦 CONNECTED' : '⚒️ ISOLATED'}</span>
                        <span style="color:${stabilityColor}">❤️ ${base.stability || 100}%</span>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <button class="btn-small" onclick="window.game.jumpToCoordinates(${base.x}, ${base.y}); document.getElementById('empireModal').style.display='none';" style="flex:1; border-color:#00ffaa; color:#00ffaa;">JUMP TO BRIDGE</button>
                        ${!isCapital ? `<button class="btn-small" onclick="window.game.baseBuilder.setAsCapital('${base.planetName}'); window.game.hudManager.showEmpireOverview();" style="flex:1; border-color:#ffd700; color:#ffd700;">★ SET CAPITAL</button>` : ''}
                    </div>
                </div>`;
            }).join('');

            modal.innerHTML = `
                <div class="modal-content" style="background: rgba(10,20,30,0.98); border: 2px solid #00ffaa; padding: 40px; border-radius: 15px; width: 90%; max-width: 1200px; max-height: 90vh; overflow-y: auto; position:relative; box-shadow: 0 0 50px rgba(0,255,170,0.2);">
                    <button onclick="document.getElementById('empireModal').style.display='none'" 
                            id="empireModalCloseBtn"
                            style="position:absolute; top:25px; right:30px; background:rgba(0,255,170,0.1); border:1px solid #00ffaa; color:#00ffaa; font-family:Orbitron; padding:8px 15px; font-size:12px; cursor:pointer; font-weight:bold; letter-spacing:2px; z-index:10001; transition: all 0.2s;">
                        ✕ CLOSE
                    </button>
                    
                    <h1 style="color: #00ffaa; text-align: center; font-family: Orbitron; margin-bottom:10px; letter-spacing:4px; text-transform:uppercase;">Hegemon Core Bridge</h1>
                    
                    <!-- === SOVEREIGNTY STATUS & RANK === -->
                    <div style="display:flex; justify-content:center; align-items:center; gap:40px; margin-bottom:40px; background:rgba(0,255,170,0.05); padding:25px; border-radius:15px; border:1px solid rgba(0,255,170,0.2); box-shadow: inset 0 0 20px rgba(0,255,170,0.05);">
                        ${(() => {
                            const cm = this.game.colonyManager;
                            const rank = (cm && cm.getEmpireRank) ? cm.getEmpireRank() : { name: 'VANGUARD', color: '#888888', level: 1 };
                            const popCount = (this.game.spaceBases || []).reduce((s, b) => s + (b.population || 0), 0);
                            const energyMultiplier = (typeof this.game.energyMultiplier === 'number' && !isNaN(this.game.energyMultiplier)) ? this.game.energyMultiplier : 1;
                            const energySurplus = Math.round(energyMultiplier * 100);
                            const tax = (typeof this.game.lastImperialTax === 'number' && !isNaN(this.game.lastImperialTax)) ? this.game.lastImperialTax : 0;
                            
                            // Majestic Rank Badge SVG
                            const bColor = rank.color || '#888888';
                            const bGlow = bColor.length === 4 ? bColor + bColor.substring(1) + '66' : bColor + '66';
                            const badgeSVG = `
                                <svg width="80" height="80" viewBox="0 0 100 100" style="filter: drop-shadow(0 0 10px ${bGlow});">
                                    <defs>
                                        <linearGradient id="rankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color:#fff; stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:${bColor}; stop-opacity:1" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="rgba(0,0,0,0.6)" stroke="${bColor}" stroke-width="2" />
                                    <circle cx="50" cy="50" r="30" fill="url(#rankGrad)" opacity="0.1" />
                                    <text x="50" y="58" font-family="Orbitron" font-size="25" text-anchor="middle" fill="${bColor}" font-weight="bold">${rank.level || 1}</text>
                                    ${rank.level >= 3 ? '<path d="M30 15 L50 5 L70 15" fill="none" stroke="#ffd700" stroke-width="2" />' : ''}
                                    ${rank.level >= 4 ? '<circle cx="50" cy="5" r="3" fill="#ffd700" />' : ''}
                                </svg>
                            `;

                        return `
                            <div style="display:flex; align-items:center; gap:20px;">
                                ${badgeSVG}
                                <div style="text-align:left;">
                                    <div style="font-size:9px; color:#aaa; letter-spacing:3px;">IMPERIAL STATUS</div>
                                    <div style="font-size:24px; color:${rank.color}; font-weight:bold; font-family:Orbitron; letter-spacing:2px; text-shadow: 0 0 10px ${rank.color}88;">${rank.name}</div>
                                    <div style="font-size:10px; color:#666; margin-top:4px;">Phase 18 Sovereignty Protocol Active</div>
                                </div>
                            </div>
                            
                            <div style="width:2px; height:60px; background:linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);"></div>
                            
                            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:40px;">
                                <div style="text-align:center;">
                                    <div style="font-size:9px; color:#5c7a8a; letter-spacing:1px; margin-bottom:5px;">DAILY REVENUE</div>
                                    <div style="color:#ffd700; font-size:18px; font-weight:bold; font-family:monospace;">+$${tax.toLocaleString()}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:9px; color:#5c7a8a; letter-spacing:1px; margin-bottom:5px;">POPULATION</div>
                                    <div style="color:#00ffaa; font-size:18px; font-weight:bold; font-family:monospace;">${popCount.toLocaleString()}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:9px; color:#5c7a8a; letter-spacing:1px; margin-bottom:5px;">ENERGY NODE</div>
                                    <div style="color:#00f3ff; font-size:18px; font-weight:bold; font-family:monospace;">${energySurplus}%</div>
                                </div>
                            </div>
                        `;
                    })()}
                </div>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                    <!-- LEFT COLUMN: Bases & Projects -->
                    <div>
                        <h2 style="color:#00ffaa; font-size:14px; border-bottom:1px solid rgba(0,255,170,0.3); padding-bottom:10px;">🪐 ESTABLISHED OUTPOSTS</h2>
                        <div style="display:grid; grid-template-columns:1fr; gap:15px; margin-top:15px;">
                            ${baseHTML || '<div style="color:#666; font-size:11px; text-align:center;">No terrestrial outposts claimed yet.</div>'}
                        </div>
                        
                        <h2 style="color:#FFD700; font-size:14px; border-bottom:1px solid rgba(255,215,0,0.3); padding-bottom:10px; margin-top:40px;">🏗️ STELLAR ENGINEERING</h2>
                        <div style="display:grid; gap:10px; margin-top:15px;">
                            ${this.renderMegaProjectOptions()}
                        </div>
                    </div>
                    
                    <!-- RIGHT COLUMN: Legacy & Relations -->
                    <div>
                        <h2 style="color:#ffd700; font-size:14px; border-bottom:1px solid rgba(255,215,0,0.3); padding-bottom:10px;">✨ ETERNAL LEGACY</h2>
                        <div style="margin-top:15px;">
                            ${this.renderLegacyStats()}
                        </div>

                        <h2 style="color:#00ffaa; font-size:14px; border-bottom:1px solid rgba(0,255,170,0.3); padding-bottom:10px; margin-top:40px;">🏆 MILESTONES</h2>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:15px;">
                            ${this.renderMilestones()}
                        </div>

                        <h2 style="color:#FF4500; font-size:14px; border-bottom:1px solid rgba(255,100,0,0.3); padding-bottom:10px; margin-top:40px;">🌐 DIPLOMATIC RELATIONS</h2>
                        <div style="display:grid; gap:10px; margin-top:15px;">
                            ${this.renderDiplomacyStats()}
                        </div>
                </div>
            </div>
        `;
        } catch (e) {
            console.error('CRITICAL UI ERROR: Failed to render Empire Overview:', e);
            if (this.showToast) this.showToast("Imperial Communication Error: Systems offline.", 4000, "error");
        }
    }

    renderMilestones() {
        if (!this.game) return '';
        const bases = this.game.spaceBases || [];
        const gems = this.game.playerInventory || {};
        const rank = this.game.colonyManager?.getEmpireRank?.() || { level: 1 };
        
        return [
            { title: 'Sovereign', req: 'Established Hub', completed: bases.length > 0, icon: '👑' },
            { title: 'Industrialist', req: '5 Space Bases', completed: bases.length >= 5, icon: '🏭' },
            { title: 'Gilded', req: '$250k Credits', completed: this.game.credits >= 250000, icon: '💰' },
            { title: 'Majestic', req: 'Rank Level 3+', completed: rank.level >= 3, icon: '🛡️' }
        ].map(m => this.renderMilestoneCard(m.title, m.req, m.completed, m.icon)).join('');
    }

    renderMilestoneCard(title, req, completed, icon) {
        const opacity = completed ? 1 : 0.3;
        const color = completed ? '#00ffaa' : '#555';
        return `
        <div style="background:rgba(0,0,0,0.4); border:1px solid ${color}; padding:10px; border-radius:8px; text-align:center; opacity:${opacity}; transition:all 0.5s;">
            <div style="font-size:20px; margin-bottom:5px;">${icon}</div>
            <div style="font-size:10px; color:#fff; font-weight:bold;">${title.toUpperCase()}</div>
            <div style="font-size:8px; color:#888;">${req}</div>
            ${completed ? '<div style="font-size:8px; color:#00ffaa; margin-top:5px;">COMPLETED</div>' : ''}
        </div>
        `;
    }

    showVictoryOverlay(awardedNexusCredits = 0) {
        const overlay = document.createElement('div');
        overlay.id = 'victoryOverlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.95); z-index: 100000;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            color: #fff; font-family: Orbitron, sans-serif; text-align: center;
            animation: victoryFadeIn 2s ease-out;
        `;

        const totalPop = this.game.spaceBases.reduce((sum, b) => sum + (b.population || 0), 0);

        overlay.innerHTML = `
            <h1 style="font-size: 60px; color: #00ffaa; text-shadow: 0 0 30px #00ffaa; margin-bottom: 10px;">GALACTIC ASCENSION</h1>
            <p style="font-size: 18px; color: #8ba; margin-bottom: 40px;">Your empire has reached the ultimate stage of evolution.</p>
            
            <div style="background: rgba(0,255,170,0.1); border: 2px solid #00ffaa; padding: 30px; border-radius: 20px; width: 450px; backdrop-filter:blur(10px);">
                <h3 style="margin-bottom: 20px; letter-spacing:3px;">EMPIRE LEGACY</h3>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; color:#aaa;"><span>Bases Established:</span> <span>${this.game.spaceBases.length}</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; color:#aaa;"><span>Total Population:</span> <span>${totalPop}</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; color:#aaa;"><span>Credits Earned:</span> <span>$${Math.floor(this.game.credits || 0).toLocaleString()}</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:20px; color:#aaa;"><span>Final Rank:</span> <span style="color:#00ffaa; font-weight:bold;">HEGEMON</span></div>
                
                <div style="border-top:1px solid rgba(0,255,170,0.3); padding-top:20px; margin-top:20px; margin-bottom:30px;">
                    <div style="font-size:12px; color:#00ffaa; margin-bottom:5px;">NEXUS CREDITS AWARDED</div>
                    <div style="font-size:32px; font-weight:bold; color:#fff;">🌀 ${awardedNexusCredits.toLocaleString()}</div>
                    <div style="font-size:10px; color:#777; margin-top:5px;">Permanent currency for the next cosmic cycle.</div>
                </div>

                <button class="btn-main" onclick="window.interstellarEngine.commenceNewCycle()" style="width: 100%; height: 50px; font-size: 18px;">COMMENCE NEW CYCLE</button>
            </div>
            
            <style>
                @keyframes victoryFadeIn { from { opacity: 0; transform: scale(1.1); } to { opacity: 1; transform: scale(1); } }
            </style>
        `;

        document.body.appendChild(overlay);
    }

    updateInventoryUI() {
        const gemsGrid = document.getElementById('gemsGrid');
        const gemsTotalEl = document.getElementById('gemsTotal');

        if (!gemsGrid) return;

        let totalValue = 0;
        let html = '';

        // Calculate total value
        Object.entries(this.game.playerInventory || {}).forEach(([type, count]) => {
            const info = MINERAL_TYPES[type];
            if (info) totalValue += count * info.value;
        });

        // Display ALL types
        Object.keys(MINERAL_TYPES).forEach(type => {
            const info = MINERAL_TYPES[type];
            const count = (this.game.playerInventory && this.game.playerInventory[type]) || 0;
            const marketData = this.game.marketplaceManager?.priceIndex[type] || { currentPrice: info.value };

            const itemValue = count * marketData.currentPrice;
            const priceTrend = marketData.currentPrice > info.value ? 
                `<span style="color:#00ff88; font-size:9px;">▲</span>` : 
                (marketData.currentPrice < info.value ? `<span style="color:#ff4444; font-size:9px;">▼</span>` : '');
            
            const valueDisplay = this.game.showGemValues ? `<span style="color:${info.color}; font-weight:bold; margin-left:6px;">$${Math.round(itemValue).toLocaleString()} ${priceTrend}</span>` : '';

            const opacity = count > 0 ? 1 : 0.5;
            const bgAlpha = count > 0 ? 0.6 : 0.2;

            const isLuxury = ['diamond', 'sapphire', 'platinum', 'emerald', 'ruby', 'exotic', 'antimatter'].includes(type);
            const luxuryStyle = isLuxury ? `border: 2px solid ${info.color}; box-shadow: 0 0 15px ${info.color}88; background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);` : `border:1px solid ${info.color}44; background: rgba(0,0,0,${bgAlpha});`;

            html += `
                        <div class="gem-item" style="${luxuryStyle} opacity: ${opacity}; border-radius: 6px; padding: 10px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden;">
                            ${isLuxury ? `<div style="position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent); animation: shimmer 2s infinite;"></div>` : ''}
                            <div style="display: flex; align-items: center;">
                                <div style="${this.styleGem(type)}"></div>
                                <span style="color:${info.color}; font-weight: ${isLuxury ? 'bold' : 'normal'}; letter-spacing: 1px;">${info.name.toUpperCase()}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span class="gem-count" style="font-family: monospace; color: #fff; font-size: 14px;">×${count}</span>
                                ${valueDisplay}
                            </div>
                        </div>
                    `;

        });

        gemsGrid.innerHTML = html;

        if (gemsTotalEl) {
            gemsTotalEl.textContent = `$${totalValue.toLocaleString()}`;
        }
    }

    updateShipStatus() {

        const ship = this.game.playerShip;
        if (!ship) return;

        // Update shield bar
        const shieldBar = document.getElementById('shieldBar');
        const shieldText = document.getElementById('shieldText');

        if (shieldBar && shieldText) {
            const shieldPercent = (ship.shield / ship.maxShield) * 100;
            shieldBar.style.width = shieldPercent + '%';
            shieldText.textContent = `${Math.round(ship.shield)} / ${Math.round(ship.maxShield)}`;

            // Change color based on shield level
            if (shieldPercent < 25) {
                shieldBar.style.background = 'linear-gradient(90deg, #ff3333, #ff6666)';
                shieldBar.style.boxShadow = '0 0 15px rgba(255, 50, 50, 0.8)';
            } else if (shieldPercent < 50) {
                shieldBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
                shieldBar.style.boxShadow = '0 0 10px rgba(255, 170, 0, 0.6)';
            } else {
                shieldBar.style.background = 'linear-gradient(90deg, #00aaff, #00ffff)';
                shieldBar.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
            }
        }

        // Update health bar (reflects actual hull health)
        const hullBar = document.getElementById('hullBar');
        const hullText = document.getElementById('hullText');

        if (hullBar && hullText) {
            const hullPercent = Math.max(0, Math.min(100, (this.game.playerShip.hullHealth / this.game.playerShip.maxHull) * 100));
            hullBar.style.width = `${hullPercent}%`;
            hullText.textContent = `${Math.round(hullPercent)}%`;

            // Color feedback based on health
            if (hullPercent <= 25) {
                hullBar.style.background = 'linear-gradient(90deg, #ff3333, #ff6666)';
                hullBar.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.8)';
            } else if (hullPercent <= 50) {
                hullBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
                hullBar.style.boxShadow = '0 0 10px rgba(255, 170, 0, 0.6)';
            } else {
                hullBar.style.background = 'linear-gradient(90deg, #00cc55, #00ff88)';
                hullBar.style.boxShadow = '0 0 10px rgba(0, 255, 100, 0.5)';
            }
        }

        // Show/hide damage warning
        const damageWarning = document.getElementById('damageWarning');
        if (damageWarning) {
            const isTakingDamage = this.game.hazardEffect && (this.game.hazardEffect.type === 'missile_hit' || this.game.hazardEffect.type === 'planet_impact');
            damageWarning.style.display = isTakingDamage ? 'block' : 'none';
        }

        // Quick Repair Button visibility (Monetization Hook)
        const repairBtn = document.getElementById('quickRepairBtn');
        if (repairBtn) {
            const hullPercent = (this.game.playerShip.hullHealth / this.game.playerShip.maxHull) * 100;
            // Show if hull is < 30% and player has enough credits
            if (hullPercent < 30 && this.game.credits >= 2000) {
                repairBtn.style.display = 'block';
            } else {
                repairBtn.style.display = 'none';
            }
        }
        
        this.updateNebulaHUD(ship);
    }

    updateNebulaHUD(ship) {
        let warningEl = document.getElementById('nebulaWarning');
        if (!warningEl && this.game.inNebulaHazard) {
            warningEl = document.createElement('div');
            warningEl.id = 'nebulaWarning';
            warningEl.style.cssText = `
                position: fixed; top: 120px; left: 50%; transform: translateX(-50%);
                padding: 10px 30px; background: rgba(0,0,0,0.8); border: 2px solid #ff3366;
                color: #ff3366; font-family: Orbitron; font-size: 14px; letter-spacing: 2px;
                z-index: 1000; display: flex; align-items: center; gap: 15px;
                box-shadow: 0 0 20px rgba(255, 51, 102, 0.3); border-radius: 5px;
                animation: WarningPulse 1.5s infinite alternate;
            `;
            document.body.appendChild(warningEl);
            
            // Add global CSS for the pulse if not exists
            if (!document.getElementById('nebulaStyles')) {
                const style = document.createElement('style');
                style.id = 'nebulaStyles';
                style.textContent = `
                    @keyframes WarningPulse { from { opacity: 0.6; } to { opacity: 1; } }
                    @keyframes HUDGlitch { 
                        0% { transform: translate(0,0); }
                        10% { transform: translate(-2px, 1px); filter: hue-rotate(10deg); }
                        20% { transform: translate(2px, -1px); }
                        30% { transform: translate(-1px, 2px); filter: hue-rotate(-10deg); }
                        40% { transform: translate(0,0); }
                    }
                `;
                document.head.appendChild(style);
            }
        }

        if (warningEl) {
            if (this.game.inNebulaHazard) {
                const type = (this.game.nebulaHazardType || 'UNKNOWN').toUpperCase();
                warningEl.style.display = 'flex';
                warningEl.innerHTML = `<span style="font-size: 20px;">⚠️</span> <span>NEBULA INTERFERENCE: ${type} ATMO</span>`;
                
                // Apply glitch to HUD container
                const hud = document.getElementById('hud');
                if (hud && this.game.nebulaHazardType === 'static') {
                    const intensity = this.game.uiStaticIntensity || 0;
                    if (Math.random() < intensity) {
                        hud.style.animation = 'HUDGlitch 0.1s steps(2)';
                    } else {
                        hud.style.animation = 'none';
                    }
                }
            } else {
                warningEl.style.display = 'none';
                const hud = document.getElementById('hud');
                if (hud) hud.style.animation = 'none';
            }
        }
    }

    updateMissionHUD() {
        const section = document.getElementById('sectionMission');
        const content = document.getElementById('missionContent');
        if (!section || !content) return;

        if (this.game.activeMission && this.game.flightMode) {
            section.style.display = 'flex';
            // Make mission window VERY prominent with pulsing glow
            section.style.border = '2px solid #00ffcc';
            section.style.boxShadow = '0 0 20px rgba(0,255,204,0.5), 0 0 40px rgba(0,255,204,0.2), inset 0 0 15px rgba(0,255,204,0.1)';
            section.style.animation = 'missionPulse 2s ease-in-out infinite';
            section.style.zIndex = '50';
            // Inject keyframe if not present
            if (!document.getElementById('missionPulseStyle')) {
                const style = document.createElement('style');
                style.id = 'missionPulseStyle';
                style.textContent = `
                    @keyframes missionPulse {
                        0%, 100% { box-shadow: 0 0 20px rgba(0,255,204,0.5), 0 0 40px rgba(0,255,204,0.2); border-color: #00ffcc; }
                        50% { box-shadow: 0 0 30px rgba(0,255,204,0.8), 0 0 60px rgba(0,255,204,0.4); border-color: #66ffdd; }
                    }
                `;
                document.head.appendChild(style);
            }
            const m = this.game.activeMission;
            const pct = Math.min(100, Math.round((m.progress / m.goal) * 100));
            
            // Use the mission-specific hint if available, fall back to generic
            let tip = '';
            if (m.hint) {
                tip = `<div style="color: #00eaff; font-size: 11px; margin-top: 8px; font-style: italic; font-weight: bold; line-height: 1.4; background: rgba(0,234,255,0.08); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #00eaff;">${m.hint}</div>`;
            } else if (m.type === 'kill' || m.type === 'kill_any' || m.type === 'boss') {
                tip = '<div style="color: #ff6b6b; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(255,50,50,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #ff6b6b;">🎯 Hold [SPACE] to Fire Weapons</div>';
            } else if (m.type === 'collect') {
                tip = '<div style="color: #f17eff; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(241,126,255,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #f17eff;">💎 Fly over glowing gems to collect</div>';
            } else if (m.type === 'survive') {
                tip = '<div style="color: #ffaa00; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(255,170,0,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #ffaa00;">⚠️ Dodge hazards — stay alive!</div>';
            }
            
            content.innerHTML = `
                <div style="color: #00ffcc; font-weight: bold; font-size: 14px; margin-bottom: 4px; text-shadow: 0 0 8px rgba(0,255,204,0.4);">${m.name}</div>
                <div style="color: #ddd; margin-bottom: 8px; font-size: 12px; line-height: 1.4;">${m.desc}</div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 6px; padding: 8px; margin-bottom: 4px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #aaa; margin-bottom: 4px;">
                        <span>PROGRESS</span>
                        <span style="color: #00ff88; font-weight: bold;">${m.progress} / ${m.goal}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); border-radius: 3px; height: 8px; overflow: hidden;">
                        <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #00ff88, #00ffcc); border-radius: 3px; transition: width 0.3s ease; box-shadow: 0 0 8px rgba(0,255,136,0.5);"></div>
                    </div>
                </div>
                ${tip}
            `;
        } else {
            section.style.display = 'none';
            section.style.border = '';
            section.style.boxShadow = '';
        }

        // --- PHASE 8: Dynamic Territorial Overlay ---
        if (this.game.sectorManager && this.game.sectorManager.currentSector) {
            const sectorKey = `${this.game.sectorManager.currentSector.x},${this.game.sectorManager.currentSector.y}`;
            const sector = this.game.sectorManager.sectors.get(sectorKey);
            
            if (sector) {
                const faction = sector.faction || 'neutral';
                const influence = Math.round(sector.influence || 0);
                
                // Defensive lookup for faction color
                let factionColor = '#888';
                if (this.game.aiManager && this.game.aiManager.factions) {
                    const fData = this.game.aiManager.factions[faction] || this.game.aiManager.factions[faction.toUpperCase()];
                    if (fData) factionColor = fData.color;
                }

                content.innerHTML = `
                    <div style="margin-bottom:20px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.4); border-radius:8px; overflow:hidden;">
                        <div style="background:rgba(255,255,255,0.05); padding:8px; border-bottom:1px solid rgba(255,255,255,0.1); font-size:10px; color:#aaa; letter-spacing:1px; text-transform:uppercase;">Sector Territory</div>
                        <div style="padding:12px; text-align:center;">
                            <div style="font-size:16px; font-weight:bold; color:${factionColor}; text-shadow:0 0 10px ${factionColor}; margin-bottom:5px;">${faction.toUpperCase()}</div>
                            <div style="background:rgba(255,255,255,0.1); height:6px; border-radius:3px; overflow:hidden; margin:10px 0;">
                                <div style="width:${influence}%; height:100%; background:${factionColor}; box-shadow:0 0 15px ${factionColor}; transition:width 1s cubic-bezier(0.4, 0, 0.2, 1);"></div>
                            </div>
                            <div style="font-size:9px; color:#666;">INFLUENCE: ${influence}%</div>
                        </div>
                    </div>
                    <div style="padding-top:10px; border-top:1px solid rgba(255,255,255,0.1); font-size:9px; color:#444; margin-bottom:10px; letter-spacing:1px;">GLOBAL FACTION STANDING</div>
                ` + content.innerHTML;
            }
        }
    }

    updateFlightHUD() {
        const ship = this.game.playerShip;
        if (!ship) return;

        const velEl = document.getElementById('velocityValue');
        if (velEl) velEl.textContent = Math.round(ship.speed || 0).toLocaleString();

        const xEl = document.getElementById('coordX');
        const yEl = document.getElementById('coordY');
        if (xEl) xEl.textContent = Math.round(ship.x || 0).toLocaleString();
        if (yEl) yEl.textContent = Math.round(ship.y || 0).toLocaleString();

        const sectorEl = document.getElementById('sectorInfo');
        if (sectorEl) sectorEl.textContent = `SECTOR [${this.game.currentSector.x}, ${this.game.currentSector.y}]`;

        // Update ability recharge displays if present
        for (let i = 1; i <= 3; i++) {
            const refill = document.getElementById(`ability-refill-${i}`);
            if (refill) {
                // Simplified recharge logic for HUD visibility
                refill.style.height = '100%';
            }
        }

        // Phase 14: Gravity Well (Key 4)
        if (this.game.playerSkills && this.game.playerSkills.blackHole) {
            const bar4 = document.getElementById('ability4Bar');
            const txt4 = document.getElementById('ability4Text');
            if (bar4 && txt4) {
                const now = Date.now();
                const timePassed = now - (this.game.lastBlackHoleTime || 0);
                const cd = this.game.blackHoleCooldown || 30000;
                if (timePassed < cd) {
                    const pct = (timePassed / cd) * 100;
                    bar4.style.width = pct + '%';
                    bar4.style.background = 'linear-gradient(90deg, #660066, #990099)';
                    txt4.textContent = Math.ceil((cd - timePassed)/1000) + 's';
                    txt4.style.color = '#ff66ff';
                } else {
                    bar4.style.width = '100%';
                    bar4.style.background = 'linear-gradient(90deg, #aa00ff, #ff00ff)';
                    txt4.textContent = 'READY';
                    txt4.style.color = '#fff';
                }
            }
        } else {
            const bar4 = document.getElementById('ability4Bar');
            const txt4 = document.getElementById('ability4Text');
            if (bar4) bar4.style.width = '0%';
            if (txt4) {
                txt4.textContent = 'LOCKED';
                txt4.style.color = '#555';
            }
        }

        // Phase 14: Chrono-Shift (Key 5)
        if (this.game.playerSkills && this.game.playerSkills.chronoShift) {
            const bar5 = document.getElementById('ability5Bar');
            const txt5 = document.getElementById('ability5Text');
            if (bar5 && txt5) {
                const now = Date.now();
                const timePassed = now - (this.game.lastChronoTime || 0);
                const cd = this.game.chronoCooldown || 45000;
                if (timePassed < cd) {
                    const pct = (timePassed / cd) * 100;
                    bar5.style.width = pct + '%';
                    bar5.style.background = 'linear-gradient(90deg, #005577, #0088aa)';
                    txt5.textContent = Math.ceil((cd - timePassed)/1000) + 's';
                    txt5.style.color = '#00ffff';
                } else {
                    bar5.style.width = '100%';
                    bar5.style.background = 'linear-gradient(90deg, #00aaff, #00ffff)';
                    txt5.textContent = 'READY';
                    txt5.style.color = '#fff';
                }
            }
        } else {
            const bar5 = document.getElementById('ability5Bar');
            const txt5 = document.getElementById('ability5Text');
            if (bar5) bar5.style.width = '0%';
            if (txt5) {
                txt5.textContent = 'LOCKED';
                txt5.style.color = '#555';
            }
        }
        
        this.updateShipStatus();
    }

    updateFleetHUD() {
        let panel = document.getElementById('fleetStatusPanel');
        const fleetManager = this.game.fleetManager;
        if (!fleetManager) return;
        
        const escorts = fleetManager.escorts;
        const activeCommand = fleetManager.activeCommand;

        if (!this.game.flightMode || (escorts.length === 0 && !this.game.hudHidden)) {
            if (panel) panel.style.display = 'none';
            return;
        }

        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'fleetStatusPanel';
            panel.style.cssText = `
                position: fixed; bottom: 110px; left: 16px;
                background: rgba(5, 10, 20, 0.85);
                border: 1px solid rgba(0, 243, 255, 0.3);
                border-radius: 10px; padding: 10px 12px;
                font-family: Orbitron, sans-serif;
                color: #fff; z-index: 1000; min-width: 180px;
                backdrop-filter: blur(8px);
                box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
            `;
            document.body.appendChild(panel);
        }

        if (this.game.hudHidden) { panel.style.display = 'none'; return; }
        panel.style.display = 'block';

        const classIcons = { 'scout': '🚤', 'interceptor': '⚡', 'defender': '🛡️', 'support': '🛠️' };
        const cmdColors = { attack: '#ff4444', defend: '#00aaff', patrol: '#ffaa00', retreat: '#ff00ff' };

        const escortHTML = escorts.map(e => {
            const hpPct = (e.health / e.maxHealth) * 100;
            const hpColor = hpPct > 60 ? '#00ff88' : hpPct > 30 ? '#ffaa00' : '#ff4444';
            return `
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <span style="font-size:12px;">${classIcons[e.type] || '✦'}</span>
                <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; font-size:7px; color:#aaa; margin-bottom:2px;">
                        <span>${e.type.toUpperCase()}</span>
                        <span>${Math.round(hpPct)}%</span>
                    </div>
                    <div style="background:rgba(255,255,255,0.1); height:3px; border-radius:2px; overflow:hidden;">
                        <div style="width:${hpPct}%; height:100%; background:${hpColor};"></div>
                    </div>
                </div>
            </div>`;
        }).join('');

        const nextPayroll = Math.max(0, Math.ceil(fleetManager.payrollTimer / 1000));

        panel.innerHTML = `
            <div style="font-size:8px; color:rgba(0, 243, 255, 0.6); letter-spacing:2px; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>ACTIVE FLEET</span>
                <span style="color:${cmdColors[activeCommand]}; animation: blink 1s infinite;">▶ ${activeCommand.toUpperCase()}</span>
            </div>
            ${escortHTML}
            <div style="border-top:1px solid rgba(255,255,255,0.1); margin-top:8px; padding-top:6px; font-size:7px; color:#555;">
                <div style="display:flex; justify-content:space-between;">
                    <span>NEXT PAYROLL:</span>
                    <span style="color:${nextPayroll < 10 ? '#ff4444' : '#888'}">${nextPayroll}s</span>
                </div>
                <div style="margin-top:4px;">[F1-F4] TACTICAL COMMANDS</div>
            </div>
        `;
    }

    renderLogBook() {
        let modal = document.getElementById('logBookModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'logBookModal';
            modal.className = 'fullscreen-modal';
            modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,5,10,0.95); z-index:2000; align-items:center; justify-content:center; backdrop-filter:blur(10px);';
            document.body.appendChild(modal);
        }

        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
            return;
        }

        modal.style.display = 'flex';
        const logs = this.game.logManager?.entries || [];

        modal.innerHTML = `
            <div style="width:700px; height:80vh; background:rgba(10,20,30,0.8); border:2px solid #00f3ff; border-radius:15px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 0 40px rgba(0,243,255,0.2);">
                <div style="padding:20px; border-bottom:1px solid rgba(0,243,255,0.3); display:flex; justify-content:space-between; align-items:center; background:rgba(0,243,255,0.05);">
                    <h2 style="margin:0; font-family:Orbitron; color:#00f3ff; letter-spacing:4px; font-size:18px;">📜 GALACTIC CHRONICLE</h2>
                    <button onclick="document.getElementById('logBookModal').style.display='none'" style="background:none; border:none; color:#00f3ff; font-size:24px; cursor:pointer;">✕</button>
                </div>
                <div style="flex:1; overflow-y:auto; padding:20px; font-family: monospace;">
                    ${logs.map(l => `
                        <div style="margin-bottom:12px; padding:10px; border-left:3px solid ${this.getLogColor(l.status)}; background:rgba(255,255,255,0.02);">
                            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:10px; color:#666;">
                                <span style="color:#00f3ff">[ ${l.category} ]</span>
                                <span>${l.timestamp}</span>
                            </div>
                            <div style="font-size:13px; color:#ddd;">${l.text}</div>
                        </div>
                    `).join('') || '<div style="color:#666; text-align:center; padding-top:40px;">No entries recorded in current logs.</div>'}
                </div>
                <div style="padding:15px; border-top:1px solid rgba(0,243,255,0.1); display:flex; justify-content:flex-end;">
                    <button class="btn-small" onclick="window.game.logManager.clearLogs(); window.game.hudManager.renderLogBook();" style="border-color:#ff4444; color:#ff4444;">CLEAR CHRONICLE</button>
                </div>
            </div>
        `;
    }

    getLogColor(status) {
        switch(status) {
            case 'success': return '#00ff88';
            case 'warning': return '#ffaa00';
            case 'error': return '#ff4444';
            default: return '#00f3ff';
        }
    }

    pulseLogIndicator() {
        const btn = document.getElementById('logBookToggle');
        if (btn) btn.classList.add('pulse');
        setTimeout(() => btn?.classList.remove('pulse'), 1000);
    }

    updateFloatingLeaderboard() {
        const list = document.getElementById('leaderboardList');
        if (!list) return;

        const players = [
            { name: 'YOU (Aether)', score: this.game.credits, me: true },
            { name: 'Xenon Overlord', score: 500000 },
            { name: 'Terran Admiral', score: 250000 },
            { name: 'Void Stalker', score: 100000 },
            { name: 'Mauler King', score: 75000 }
        ].sort((a, b) => b.score - a.score);

        list.innerHTML = players.map((p, i) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; ${p.me ? 'color:#00ffcc; font-weight:bold;' : 'color:#aaa;'}">
                <span>${i + 1}. ${p.name}</span>
                <span>$${p.score.toLocaleString()}</span>
            </div>
        `).join('');
    }

    showToast(msg, duration = 3500, type = 'info') {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%);
                background: rgba(10, 20, 30, 0.9); color: white;
                padding: 12px 24px; border-radius: 6px; z-index: 99999;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                font-family: Orbitron, monospace; font-size: 13px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.05);
                letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; gap: 10px;
            `;
            document.body.appendChild(toast);
        }
        
        const colors = {
            success: '#00ffaa',
            error: '#ff4444',
            info: '#00eaff',
            warning: '#ffcc00'
        };
        const icons = {
            success: '✅',
            error: '🛑',
            info: '📡',
            warning: '⚠️'
        };
        
        const accent = colors[type] || colors.info;
        const icon = icons[type] || icons.info;
        
        toast.style.borderColor = accent;
        toast.style.borderWidth = '1px';
        toast.style.borderStyle = 'solid';
        toast.style.color = '#fff';
        toast.style.boxShadow = `0 4px 20px rgba(0,0,0,0.5), 0 0 15px ${accent}44`;
        
        toast.innerHTML = `<span style="font-size:16px;">${icon}</span> <span>${msg}</span>`;
        toast.style.opacity = '1';
        toast.style.bottom = '100px';
        
        clearTimeout(this.game._toastTimeout);
        this.game._toastTimeout = setTimeout(() => { 
            if(toast) {
                toast.style.opacity = '0';
                toast.style.bottom = '85px';
            }
        }, duration);
    }

    showMissionComplete(mission, reward) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.85); z-index: 100000;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            font-family: Orbitron, sans-serif; pointer-events: none;
            animation: missionOverlayIn 0.8s forwards;
            backdrop-filter: blur(8px);
        `;
        
        overlay.innerHTML = `
            <div style="text-align:center; transform: scale(0.8); animation: missionTextPop 0.5s 0.3s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                <div style="color: #00ffcc; font-size: 14px; letter-spacing: 4px; margin-bottom: 10px; opacity: 0.8;">MISSION ACCOMPLISHED</div>
                <h1 style="color: #fff; font-size: 48px; margin: 0; text-shadow: 0 0 20px #00ffcc; letter-spacing: 2px;">${mission.name.toUpperCase()}</h1>
                
                <div style="margin-top: 40px; display: flex; gap: 20px; justify-content: center;">
                    <div style="background: rgba(255,255,255,0.05); padding: 15px 30px; border-radius: 10px; border: 1px solid #00ffcc44;">
                        <div style="font-size: 10px; color: #aaa; margin-bottom: 5px;">CREDITS</div>
                        <div style="font-size: 24px; color: #fff;">$${reward.credits.toLocaleString()}</div>
                    </div>
                </div>
                
                <div style="margin-top: 30px; color: #00ffcc; font-size: 12px; letter-spacing: 2px; animation: blink 1s infinite;">HUB SYNCHRONIZING...</div>
            </div>
            
            <style>
                @keyframes missionOverlayIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes missionTextPop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
            </style>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.transition = 'opacity 1s';
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 1000);
        }, 4000);
    }

    showPreciousToast(msg, gemType) {
        console.log('[Precious Toast]', msg);
        const pToast = document.createElement('div');
        pToast.style.cssText = `
            position: fixed; top: 15%; left: 50%; transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(20,20,20,0.95), rgba(40,40,40,0.95));
            border: 2px solid #ffd700; color: #ffd700;
            padding: 20px 40px; border-radius: 12px; z-index: 100000;
            font-family: Orbitron; text-align: center;
            box-shadow: 0 0 30px #ffd70066, inset 0 0 15px #ffd70022;
            animation: preciousToastIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                       shimmer 2s infinite;
            letter-spacing: 2px; font-weight: bold;
        `;
        
        const colors = {
            diamond: '#ffffff', sapphire: '#00ccff', emerald: '#00ff88', ruby: '#ff4444'
        };
        const color = colors[gemType] || '#ffd700';
        pToast.style.borderColor = color;
        pToast.style.color = color;
        pToast.style.boxShadow = `0 0 30px ${color}66, inset 0 0 15px ${color}22`;

        pToast.innerHTML = `
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 5px;">PRECIOUS COLLECTION ACQUIRED</div>
            <div style="font-size: 18px;">${msg}</div>
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden;">
                <div style="position: absolute; width: 200%; height: 100%; top: 0; left: -100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transform: skewX(-20deg); animation: shimmerSlide 3s infinite;"></div>
            </div>
        `;

        if (!document.getElementById('preciousStyles')) {
            const style = document.createElement('style');
            style.id = 'preciousStyles';
            style.textContent = `
                @keyframes preciousToastIn { from { opacity: 0; transform: translateX(-50%) scale(0.8) translateY(-20px); } }
                @keyframes shimmerSlide { from { left: -100%; } to { left: 100%; } }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(pToast);
        
        setTimeout(() => {
            pToast.style.transition = 'all 0.5s ease-out';
            pToast.style.opacity = '0';
            pToast.style.transform = 'translateX(-50%) translateY(-50px) scale(0.9)';
            setTimeout(() => pToast.remove(), 500);
        }, 4000);
    }

    // === NEXUS TERMINAL (Phase 17-1) ===
    showNexusTerminal() {
        let modal = document.getElementById('nexusModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'nexusModal';
            modal.className = 'modal';
            modal.style.cssText = `
                position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);
                width:600px; max-height:80vh; background:rgba(10, 0, 20, 0.95);
                border:2px solid #ff00ff; border-radius:15px; padding:30px;
                color:white; font-family:Orbitron, sans-serif; z-index:10001;
                overflow-y:auto; box-shadow:0 0 50px rgba(255, 0, 255, 0.3);
                display:flex; flex-direction:column;
            `;
            document.body.appendChild(modal);
        }

        modal.style.display = 'flex';
        this.renderNexusTerminal();
    }

    renderNexusTerminal() {
        const modal = document.getElementById('nexusModal');
        const credits = this.game.nexusCredits || 0;
        const upgrades = this.game.nexusUpgrades || {};

        const upgradeOptions = [
            { id: 'ancient_alloy', name: 'Ancient Alloy', desc: 'Permanent +10% Base Hull Strength', cost: 10, icon: '🛡️' },
            { id: 'nexus_drill', name: 'Nexus Drill', desc: 'Permanent +15% Mining Drone Speed', cost: 15, icon: '⛏️' },
            { id: 'void_reactor', name: 'Void Reactor', desc: 'Permanent +5% Energy Efficiency', cost: 20, icon: '🔋' }
        ];

        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #ff00ff; padding-bottom:10px;">
                <h1 style="color:#ff00ff; margin:0; font-size:24px;">THE NEXUS TERMINAL</h1>
                <button onclick="document.getElementById('nexusModal').style.display='none'" style="background:none; border:none; color:#ff00ff; font-size:20px; cursor:pointer;">✕</button>
            </div>

            <div style="background:rgba(255,0,255,0.1); padding:15px; border-radius:10px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
                <span style="color:#ff00ff; font-size:12px;">AVAILABLE NEXUS CREDITS</span>
                <span style="font-size:24px; font-weight:bold;">🌀 ${credits.toLocaleString()}</span>
            </div>

            <div style="display:grid; gap:15px;">
                ${upgradeOptions.map(u => {
                    const level = upgrades[u.id] || 0;
                    const nextCost = u.cost * (level + 1);
                    const canAfford = credits >= nextCost;
                    return `
                        <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,0,255,0.3); padding:15px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; align-items:center; gap:15px;">
                                <div style="font-size:24px;">${u.icon}</div>
                                <div>
                                    <div style="font-weight:bold; color:#fff;">${u.name.toUpperCase()} (Lvl ${level})</div>
                                    <div style="font-size:10px; color:#aaa;">${u.desc}</div>
                                </div>
                            </div>
                            <button onclick="window.game.hudManager.buyNexusUpgrade('${u.id}', ${nextCost})" 
                                    style="padding:8px 15px; background:${canAfford ? '#ff00ff' : '#333'}; color:white; border:none; border-radius:5px; cursor:${canAfford ? 'pointer' : 'not-allowed'}; font-size:12px;"
                                    ${canAfford ? '' : 'disabled'}>
                                BUY [🌀 ${nextCost}]
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>

            <p style="font-size:10px; color:#666; margin-top:30px; line-height:1.4;">
                Nexus upgrades are permanent and persist through all cosmic cycles. 
                Earn Nexus Credits by reaching Galactic Ascension.
            </p>
        `;
    }

    buyNexusUpgrade(id, cost) {
        if (this.game.nexusCredits >= cost) {
            this.game.nexusCredits -= cost;
            this.game.nexusUpgrades[id] = (this.game.nexusUpgrades[id] || 0) + 1;
            
            localStorage.setItem('nexusCredits', this.game.nexusCredits);
            localStorage.setItem('nexusUpgrades', JSON.stringify(this.game.nexusUpgrades));
            
            this.game.applyNexusUpgrades();
            this.renderNexusTerminal();
            this.showToast(`Nexus Link Established: ${id.replace('_', ' ')} upgraded!`, 3000, 'success');
            
            if (window.gameAudio) window.gameAudio.playMenuSelect();
        }
    }

    // === WARP GATE INTERFACE (Phase 17-1) ===
    updateWarpUI() {
        const activeGate = this.game.warpGateManager?.activeGate;
        const warpBox = document.getElementById('warpInteractionBox');
        
        if (activeGate) {
            if (!warpBox) {
                const box = document.createElement('div');
                box.id = 'warpInteractionBox';
                box.style.cssText = `
                    position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);
                    background:rgba(5, 10, 20, 0.95); border:2px solid #00f3ff;
                    padding:30px; border-radius:20px; color:white; font-family:Orbitron;
                    z-index:9000; text-align:center; box-shadow:0 0 40px rgba(0, 243, 255, 0.4);
                    backdrop-filter: blur(10px); width: 450px;
                `;
                document.body.appendChild(box);
                
                if (activeGate.structType === 'outpost') {
                    this.renderOutpostInteraction(box, activeGate);
                } else {
                    this.renderSectorMap(box);
                }
            }
        } else if (warpBox) {
            warpBox.remove();
        }
    }

    renderOutpostInteraction(container, outpost) {
        container.innerHTML = `
            <div style="color:#00f3ff; font-size:14px; margin-bottom:5px; letter-spacing:3px; font-weight:bold;">${outpost.name.toUpperCase()}</div>
            <div style="font-size:10px; color:#666; margin-bottom:20px; text-transform:uppercase;">Deep Space Logistics & Trade Node Established</div>
            
            <div style="background:rgba(0,243,255,0.05); border:1px solid rgba(0,243,255,0.2); padding:20px; border-radius:15px; margin-bottom:25px;">
                <div style="font-size:11px; color:#fff; margin-bottom:10px;">MARKET STATUS: <span style="color:#00ff88;">OPERATIONAL</span></div>
                <p style="font-size:9px; color:#888; line-height:1.5;">Docking permits confirmed. Connect to the local grid to liquidate cargo for credits and acquire advanced ship modules.</p>
            </div>

            <button class="btn-main" onclick="window.game.hudManager.showTradeTerminal(); document.getElementById('warpInteractionBox').remove();" style="width:100%; padding:15px; font-size:14px; letter-spacing:2px;">ENTER MARKET TERMINAL</button>
            <button onclick="document.getElementById('warpInteractionBox').remove()" style="margin-top:15px; background:none; border:none; color:#555; cursor:pointer; font-size:10px; font-family:Orbitron;">DISMISS</button>
        `;
    }

    renderSectorMap(container) {
        if (!this.game.sectorManager) return;

        const current = this.game.sectorManager.currentSector;
        const grid = [];
        
        // Generate 3x3 grid around current sector
        for (let y = current.y - 1; y <= current.y + 1; y++) {
            for (let x = current.x - 1; x <= current.x + 1; x++) {
                grid.push({ x, y });
            }
        }

        container.innerHTML = `
            <div style="color:#00f3ff; font-size:14px; margin-bottom:5px; letter-spacing:3px; font-weight:bold;">GALACTIC NAVIGATION MESH</div>
            <div style="font-size:10px; color:#666; margin-bottom:20px; text-transform:uppercase;">Select Sector Coordinates to Synchronize Warp</div>
            
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:25px;">
                ${grid.map(s => {
                    const isCurrent = s.x === current.x && s.y === current.y;
                    const data = this.game.sectorManager.getSectorData(s.x, s.y);
                    const diff = data.difficulty.toFixed(1);
                    const color = isCurrent ? '#00f3ff' : '#444';
                    const bg = isCurrent ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)';
                    
                    return `
                        <div onclick="${isCurrent ? '' : `window.game.warpGateManager.jumpTo(${s.x}, ${s.y}); this.parentElement.parentElement.remove();`}" 
                             style="padding:15px 10px; background:${bg}; border:1px solid ${color}; border-radius:8px; 
                                    cursor:${isCurrent ? 'default' : 'pointer'}; transition:all 0.2s; position:relative; overflow:hidden;">
                            ${isCurrent ? '<div style="position:absolute; top:5px; right:5px; font-size:8px; color:#00f3ff;">LOCAL</div>' : ''}
                            <div style="font-size:12px; font-weight:bold; color:${isCurrent ? '#fff' : '#aaa'};">[${s.x}, ${s.y}]</div>
                            <div style="font-size:8px; color:#666; margin-top:5px;">DIFF: ${diff}x</div>
                            <div style="font-size:7px; color:${data.style.includes('nebula') ? '#a0f' : '#0f0'}; margin-top:2px;">${data.style.toUpperCase().replace('-', ' ')}</div>
                            ${!isCurrent ? `<div class="hover-tip" style="position:absolute; bottom:0; left:0; width:100%; height:2px; background:#00f3ff; transform:scaleX(0); transition:transform 0.2s;"></div>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            
            <button onclick="this.parentElement.remove()" 
                    style="background:rgba(255,255,255,0.05); border:1px solid #333; color:#888; padding:8px 20px; border-radius:5px; cursor:pointer; font-size:10px; font-family:Orbitron; width:100%;">
                CANCEL SYNCHRONIZATION
            </button>

            <style>
                #warpInteractionBox div:hover .hover-tip { transform: scaleX(1) !important; }
                #warpInteractionBox div:hover { background: rgba(0, 243, 255, 0.08) !important; border-color: #00f3ff !important; }
            </style>
        `;
    }
    // === STELLAR ENGINEERING (Phase 17-2) ===
    renderMegaProjectOptions() {
        const ship = this.game.playerShip;
        if (!ship) return '<div style="font-size:10px; color:#666;">Waiting for ship telemetry...</div>';

        const structures = this.game.warpGateManager?.gates || [];
        
        // Scan for nearby Stars
        const nearbyStars = (this.game.stars || []).filter(s => {
            const dist = Math.hypot(s.x - ship.x, s.y - ship.y);
            return dist < 3000 && !structures.some(st => st.x === s.x && st.y === s.y);
        });

        // Scan for nearby Planets
        const nearbyPlanets = (this.game.planets || []).filter(p => {
            const dist = Math.hypot(p.x - ship.x, p.y - ship.y);
            return dist < 3000 && !structures.some(st => st.x === p.x && st.y === p.y);
        });

        const starHTML = nearbyStars.map(s => `
            <div style="background:rgba(255,215,0,0.05); border:1px solid rgba(255,215,0,0.3); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-size:10px; color:#FFD700; font-weight:bold;">DYSON SWARM [${s.name.toUpperCase()}]</div>
                    <div style="font-size:8px; color:#aaa;">+500% GLOBAL ENERGY | +$5,000 PER MIN</div>
                </div>
                <button onclick="window.game.hudManager.buildMegaStructure('dyson', '${s.name}', ${s.x}, ${s.y})" 
                        style="padding:5px 10px; background:#FFD700; color:black; border:none; border-radius:4px; font-size:9px; font-weight:bold; cursor:pointer;"
                        ${this.game.credits < 50000 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                    BUILD ($50k)
                </button>
            </div>
        `).join('');

        const planetHTML = nearbyPlanets.map(p => `
            <div style="background:rgba(0,255,127,0.05); border:1px solid rgba(0,255,127,0.3); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-size:10px; color:#00FF7F; font-weight:bold;">RING WORLD [${p.name.toUpperCase()}]</div>
                    <div style="font-size:8px; color:#aaa;">+5,000 MAX POPULATION CAP</div>
                </div>
                <button onclick="window.game.hudManager.buildMegaStructure('ring', '${p.name}', ${p.x}, ${p.y})" 
                        style="padding:5px 10px; background:#00FF7F; color:black; border:none; border-radius:4px; font-size:9px; font-weight:bold; cursor:pointer;"
                        ${this.game.credits < 50000 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                    BUILD ($50k)
                </button>
            </div>
        `).join('');

        return (starHTML + planetHTML) || '<div style="font-size:10px; color:#666; text-align:center; padding:10px;">MOVE NEAR A STAR OR PLANET TO INITIATE MEGA-PROJECTS</div>';
    }

    buildMegaStructure(type, targetName, x, y) {
        const cost = 50000;
        if (this.game.credits >= cost) {
            this.game.credits -= cost;
            this.updateWalletUI();

            if (type === 'dyson') {
                this.game.warpGateManager.addDysonSwarm(targetName, x, y);
                this.showToast(`Dyson Swarm Construction Sequence Initiated around ${targetName}!`, 5000, 'success');
            } else if (type === 'ring') {
                this.game.warpGateManager.addRingWorld(targetName, x, y);
                this.showToast(`Ring World Anchor established around ${targetName}!`, 5000, 'success');
            }

            if (window.gameAudio) window.gameAudio.playEMP(); 
            this.showEmpireOverview(); // Refresh modal content
        } else {
            this.showToast("Insufficient treasury for Mega-Project!", 3000, "error");
        }
    }
    // === DIPLOMACY & AI (Phase 17-3) ===
    renderDiplomacyStats() {
        if (!this.game.aiManager) return '<div style="font-size:10px; color:#666;">No external signatures detected...</div>';

        const factions = this.game.aiManager.factions;
        return Object.keys(factions).map(key => {
            const f = factions[key];
            const stanceColor = f.stance === 'HOSTILE' ? '#ff3333' : (f.stance === 'FRIENDLY' ? '#33ff33' : '#aaaaaa');
            
            return `
            <div style="background:rgba(255,255,255,0.05); border:1px solid ${f.color}; padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-size:10px; color:${f.color}; font-weight:bold;">${f.name.toUpperCase()}</div>
                    <div style="font-size:8px; color:${stanceColor};">${f.stance} [Rating: ${f.rating}]</div>
                </div>
                <div style="display:flex; gap:5px;">
                    <button onclick="window.game.hudManager.offerTribute('${key}')" 
                            style="padding:5px 10px; background:transparent; border:1px solid ${f.color}; color:${f.color}; border-radius:4px; font-size:9px; cursor:pointer;"
                            ${this.game.credits < 5000 ? 'disabled style="opacity:0.5; pointer-events:none;"' : ''}>
                        OFFER TRIBUTE ($5k)
                    </button>
                    ${f.stance === 'HOSTILE' ? '<span style="color:#ff3333; font-size:14px; animation: pulse 1s infinite;">⚠️</span>' : ''}
                </div>
            </div>
            `;
        }).join('');
    }

    renderEmpireBridge() {
        this.showEmpireOverview();
    }

    offerTribute(factionKey) {
        if (this.game.credits >= 5000) {
            this.game.credits -= 5000;
            this.game.aiManager.modifyRelation(factionKey, 10);
            this.updateWalletUI();
            this.renderEmpireBridge(); // Refresh modal
            
            if (window.gameAudio) window.gameAudio.playEMP();
            this.showToast(`Diplomatic mission successful with ${this.game.aiManager.factions[factionKey].name}`, 3000, 'success');
        }
    }

    // === ETERNAL LEGACY (Phase 18) ===
    renderLegacyStats() {
        const legacy = this.game.legacyData || { legacyPoints: 0, ascensions: 0, trophies: [] };
        return `
            <div style="display:flex; justify-content:space-between; gap:20px;">
                <div style="flex:1; background:rgba(0,0,0,0.4); border:1px solid rgba(255,215,0,0.3); padding:15px; border-radius:8px;">
                    <div style="font-size:10px; color:#aaa; margin-bottom:5px;">TOTAL LEGACY POINTS</div>
                    <div style="font-size:24px; color:#ffd700; font-weight:bold;">🏆 ${legacy.legacyPoints.toLocaleString()}</div>
                </div>
                <div style="flex:1; background:rgba(0,0,0,0.4); border:1px solid rgba(255,215,0,0.3); padding:15px; border-radius:8px;">
                    <div style="font-size:10px; color:#aaa; margin-bottom:5px;">COSMIC ASCENSIONS</div>
                    <div style="font-size:24px; color:#00f3ff; font-weight:bold;">🌀 ${legacy.ascensions}</div>
                </div>
            </div>
            
            <div style="margin-top:15px; display:grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap:10px;">
                ${legacy.trophies.length > 0 ? legacy.trophies.map(t => `
                    <div style="background:rgba(255,255,255,0.05); border:1px solid #ffd700; padding:10px; border-radius:8px; text-align:center;">
                        <div style="font-size:20px; margin-bottom:5px;">${t.icon}</div>
                        <div style="font-size:8px; color:#ffd700; font-weight:bold;">${t.name.toUpperCase()}</div>
                    </div>
                `).join('') : '<div style="font-size:10px; color:#666; font-style:italic;">No eternal trophies found. Ascend to begin your legacy.</div>'}
            </div>
        `;
    }

    // === MILESTONES (Phase 16-3) ===
    renderMilestones() {
        const milestones = this.game.milestones || {};
        return `
            ${this.renderMilestoneCard('Empire Founder', 'Claim 1st Base', milestones.EMPIRE_FOUNDER, '🏆')}
            ${this.renderMilestoneCard('Logistics Mogul', '3 Connected Hubs', milestones.LOGISTICS_MOGUL, '📦')}
            ${this.renderMilestoneCard('Planet Guard', '5 Defense Platforms', milestones.PLANETARY_DEFENDER, '🛡️')}
            ${this.renderMilestoneCard('Void Walker', '10 Cosmic Jumps', milestones.VOID_WALKER, '🌀')}
        `;
    }

    // === TRADE TERMINAL (Phase 5) ===
    showTradeTerminal(outpost) {
        let modal = document.getElementById('tradeModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'tradeModal';
            modal.className = 'fullscreen-modal';
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(2, 2, 5, 0.9); z-index: 10000;
                display: flex; align-items: center; justify-content: center;
                backdrop-filter: blur(20px) saturate(180%);
            `;
            document.body.appendChild(modal);
        }

        modal.style.display = 'flex';
        this.renderTradeUI(outpost);
    }

    renderTradeUI(outpost) {
        const modal = document.getElementById('tradeModal');
        if (!modal) return;

        const credits = this.game.credits || 0;
        const ship = this.game.playerShip;
        if (!ship) return;

        // --- LEFT COLUMN: CARGO LIQUIDATION ---
        const inv = this.game.playerInventory || {};
        const sector = this.game.sectorManager?.getCurrentSectorData();
        const market = sector?.market || { industrial: 1.0, precious: 1.0, crystal: 1.0, nuclear: 1.0, exotic: 1.0 };
        
        let totalCargoValue = 0;
        const cargoHTML = Object.entries(inv).map(([type, count]) => {
            if (count <= 0) return '';
            const info = MINERAL_TYPES[type];
            const marketData = this.game.marketplaceManager?.priceIndex[type] || { currentPrice: info.value, volHistory: [100], dailyVol: 100 };
            
            const multiplier = market[info.zone || 'industrial'] || 1.0;
            const price = marketData.currentPrice * multiplier;
            
            // Slippage Preview
            const mav = marketData.volHistory.reduce((a, b) => a + b, 0) / marketData.volHistory.length;
            const volThreshold = mav * 0.2;
            let slippage = 0;
            if (count > volThreshold) {
                const excess = count - volThreshold;
                slippage = Math.min(0.5, excess / (mav * 2));
            }
            const effectivePrice = price * (1 - slippage);
            const val = effectivePrice * count;
            totalCargoValue += val;

            const trendIcon = marketData.currentPrice > info.value ? '▲' : (marketData.currentPrice < info.value ? '▼' : '•');
            const trendColor = marketData.currentPrice > info.value ? '#00ff88' : (marketData.currentPrice < info.value ? '#ff4444' : '#888');
            const vix = Math.round((marketData.dailyVol / mav) * 100);

            return `
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); padding:12px; border-radius:10px; margin-bottom:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:12px; height:12px; background:${info.color}; border-radius:2px; box-shadow:0 0 10px ${info.color}66;"></div>
                        <span style="color:#fff; font-size:12px; font-weight:bold;">${info.name.toUpperCase()} (x${count})</span>
                    </div>
                    <span style="color:${trendColor}; font-size:11px;">${trendIcon} $${Math.round(price).toLocaleString()}</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:8px; color:#666;">
                    <span>MAV: ${Math.round(mav)}</span>
                    <span>VIX (VOL): ${vix}%</span>
                    <span style="${slippage > 0 ? 'color:#ffaa00;' : ''}">SLIPPAGE: -${Math.round(slippage * 100)}%</span>
                </div>
                <div style="text-align:right; margin-top:5px; color:#fff; font-family:monospace; font-size:13px;">$${Math.round(val).toLocaleString()}</div>
            </div>`;
        }).join('');

        modal.innerHTML = `
            <div class="hud-panel" style="width: 800px; max-height: 85vh; padding: 40px; border-top: 2px solid #00f3ff; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; position:relative; overflow-y:auto;">
                <button onclick="document.getElementById('tradeModal').style.display='none'" style="position:absolute; top:20px; right:20px; background:none; border:none; color:#00f3ff; font-size:24px; cursor:pointer;">✕</button>
                
                <!-- LEFT: CARGO -->
                <div>
                    <h2 style="color:#00f3ff; font-family:Orbitron; letter-spacing:3px; margin-bottom:20px;">📦 SHIP CARGO</h2>
                    <div style="overflow-y:auto; max-height:300px; margin-bottom:20px; padding-right:10px;">
                        ${cargoHTML || '<div style="color:#444; font-size:12px; text-align:center; padding:40px;">CARGO BAY EMPTY</div>'}
                    </div>
                    <div style="border-top:1px solid rgba(0,243,255,0.2); padding-top:20px; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <div style="font-size:10px; color:#5c7a8a;">GROSS VALUATION</div>
                            <div style="font-size:24px; color:#fff; font-family:monospace;">$${totalCargoValue.toLocaleString()}</div>
                        </div>
                        <button class="btn-main" onclick="window.game.hudManager.sellAllCargo()" ${totalCargoValue <= 0 ? 'disabled' : ''} style="padding:15px 30px;">LIQUIDATE CARGO</button>
                    </div>

                    <h2 style="color:#00f3ff; font-family:Orbitron; letter-spacing:3px; margin-top:40px; margin-bottom:20px;">📦 LOGISTICS & SUPPLIES</h2>
                    <div style="display:grid; gap:8px;">
                        ${Object.keys(SUPPLY_TYPES).map(type => this.renderSupplyOption(type)).join('')}
                    </div>
                </div>

                <!-- RIGHT: SERVICES & UPGRADES -->
                <div>
                    <h2 style="color:#00f3ff; font-family:Orbitron; letter-spacing:3px; margin-bottom:20px;">🛠️ HUB SERVICES</h2>
                    
                    <div style="background:rgba(0,243,255,0.05); border:1px solid rgba(0,243,255,0.2); padding:15px; border-radius:12px; margin-bottom:20px;">
                        <h3 style="color:#fff; font-size:11px; margin-bottom:10px;">HULL REPAIR STATION</h3>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                            <span style="color:#888; font-size:10px;">Condition: ${Math.round(ship.hullHealth)}%</span>
                            <span style="color:#00ff88; font-family:monospace;">COST: $${Math.round((ship.maxHull - ship.hullHealth) * 75)}</span>
                        </div>
                        <button class="btn-small" onclick="window.game.hudManager.repairHull()" style="width:100%;" ${ship.hullHealth >= ship.maxHull - 1 ? 'disabled' : ''}>PERFORM MAINTENANCE</button>
                    </div>

                    <h3 style="color:#fff; font-size:11px; margin-bottom:10px;">TACTICAL MODULES</h3>
                    <div style="display:grid; gap:8px; overflow-y:auto; max-height:150px; margin-bottom:20px; padding-right:5px;">
                        ${this.game.marketplaceManager ? Object.keys(this.game.marketplaceManager.MODULE_CATALOG).map(id => this.renderModuleOption(id)).join('') : ''}
                    </div>

                    <h3 style="color:#fff; font-size:11px; margin-bottom:10px;">SQUADRON RECRUITMENT</h3>
                    <div style="display:grid; gap:8px;">
                        ${this.renderWingmanHireOption('scout', 'Scout Drone', 'Basic recon & light support', 1000)}
                        ${this.renderWingmanHireOption('interceptor', 'Interceptor', 'High-speed attack craft', 5000)}
                        ${this.renderWingmanHireOption('defender', 'Bulwark Defender', 'Heavy shields & defensive AI', 12000)}
                    </div>
                    
                    <div style="margin-top:20px; text-align:right; border-top:1px solid rgba(0,243,255,0.2); padding-top:15px;">
                        <span style="color:#5c7a8a; font-size:10px;">WALLET BALANCE: </span>
                        <span style="color:#00f3ff; font-size:20px; font-weight:bold;">$${credits.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderSupplyOption(type) {
        const supply = SUPPLY_TYPES[type];
        const canAfford = this.game.credits >= supply.cost;
        const count = (this.game.playerSupplies ? this.game.playerSupplies[type] : 0) || 0;

        return `
        <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border:1px solid rgba(255,255,255,0.1);">
            <div style="display:flex; align-items:center; gap:10px;">
                <div style="font-size:18px;">${supply.icon}</div>
                <div>
                    <div style="color:#fff; font-size:10px; font-weight:bold;">${supply.name.toUpperCase()} (x${count})</div>
                    <div style="color:#5c7a8a; font-size:8px;">${supply.desc}</div>
                </div>
            </div>
            <button class="btn-small" onclick="window.game.marketplaceManager.buySupply('${type}'); window.game.hudManager.renderTradeUI();" ${!canAfford ? 'disabled' : ''} style="font-size:9px;">HIRE ($${supply.cost})</button>
        </div>`;
    }

    renderWingmanHireOption(type, name, desc, cost) {
        const canAfford = this.game.credits >= cost;
        const fleetManager = this.game.fleetManager;
        const currentFleetSize = fleetManager ? fleetManager.escorts.length : 0;
        const maxSlots = fleetManager ? fleetManager.getMaxSlots() : 1;
        const isFleetFull = currentFleetSize >= maxSlots;
        
        return `
        <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border:1px solid rgba(255,255,255,0.1);">
            <div>
                <div style="color:#fff; font-size:10px; font-weight:bold;">${name.toUpperCase()}</div>
                <div style="color:#5c7a8a; font-size:8px;">${desc}</div>
            </div>
            <button class="btn-small" onclick="window.game.fleetManager.hireEscort('${type}'); window.game.hudManager.renderTradeUI();" ${!canAfford || isFleetFull ? 'disabled' : ''} style="font-size:9px; border-color:${!canAfford || isFleetFull ? '#444' : '#00ff88'}">
                ${isFleetFull ? 'CAPACITY FULL' : `HIRE ($${cost.toLocaleString()})`}
            </button>
        </div>`;
    }

    renderModuleOption(id) {
        const module = this.game.marketplaceManager.MODULE_CATALOG[id];
        const isInstalled = this.game.marketplaceManager.installedModules.has(id);
        const canAfford = this.game.credits >= module.cost;
        
        return `
        <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border:1px solid ${isInstalled ? module.color : 'rgba(255,255,255,0.1)'}; opacity:${isInstalled ? 0.8 : 1};">
            <div style="display:flex; align-items:center; gap:10px;">
                <div style="font-size:18px;">${module.icon}</div>
                <div>
                    <div style="color:${isInstalled ? module.color : '#fff'}; font-size:10px; font-weight:bold;">${module.name.toUpperCase()}</div>
                    <div style="color:#5c7a8a; font-size:8px;">${module.desc}</div>
                </div>
            </div>
            ${isInstalled ? 
                `<span style="color:${module.color}; font-size:10px; font-weight:bold;">INSTALLED</span>` :
                `<button class="btn-small" onclick="window.game.buyModule('${id}')" ${!canAfford ? 'disabled' : ''} style="font-size:9px;">$${module.cost.toLocaleString()}</button>`
            }
        </div>`;
    }

    buyWingman(type, cost) {
        if (this.game.credits >= cost) {
            const currentFleetSize = (this.game.playerWingmen || []).length;
            if (currentFleetSize >= 3) {
                this.showToast("SQUADRON CAPACITY REACHED (MAX 3)", 3000, 'error');
                return;
            }

            this.game.credits -= cost;
            if (this.game.hireWingman) {
                this.game.hireWingman(type);
            }
            this.showToast(`RECRUITED ${type.toUpperCase()} TO SQUADRON`, 3000, 'success');
            this.updateWalletUI();
            this.renderTradeUI(); // Refresh modal
        } else {
            this.showToast("INSUFFICIENT CREDITS FOR RECRUITMENT", 3000, 'error');
        }
    }

    sellAllCargo() {
        let totalValue = 0;
        const inv = this.game.playerInventory || {};
        const sector = this.game.sectorManager?.getCurrentSectorData();
        const market = sector?.market || { industrial: 1.0, precious: 1.0, crystal: 1.0, nuclear: 1.0, exotic: 1.0 };

        Object.entries(inv).forEach(([type, count]) => {
            const info = MINERAL_TYPES[type];
            if (info && count > 0) {
                const multiplier = market[info.zone || 'industrial'] || 1.0;
                totalValue += (info.value * multiplier) * count;
                inv[type] = 0;
            }
        });

        if (totalValue > 0) {
            this.game.credits += totalValue;
            this.game.logManager?.addEntry('ECONOMY', `Liquidated cargo for $${Math.floor(totalValue).toLocaleString()}`, 'success');
            this.showToast(`CARGO LIQUIDATED: +$${totalValue.toLocaleString()}`, 3000, 'success');
            if (window.gameAudio) window.gameAudio.playCreditEarn();
            this.updateWalletUI();
            this.renderTradeUI(); // Refresh modal
        }
    }

    repairHull() {
        const cost = Math.round((100 - this.game.playerShip.hullHealth) * 75);
        if (this.game.credits >= cost) {
            this.game.credits -= cost;
            this.game.playerShip.hullHealth = 100;
            this.showToast("HULL INTEGRITY RESTORED TO 100%", 3000, 'success');
            this.updateWalletUI();
            this.renderTradeUI();
        } else {
            this.showToast("INSUFFICIENT CREDITS FOR REPAIRS", 3000, 'error');
        }
    }

    buyUpgrade(id, cost) {
        if (this.game.credits >= cost) {
            this.game.credits -= cost;
            const ship = this.game.playerShip;
            if (id === 'hull') ship.maxHull = (ship.maxHull || 100) * 1.2;
            if (id === 'shield') ship.maxShield = (ship.maxShield || 50) * 1.15;
            if (id === 'speed') ship.maxSpeed = (ship.maxSpeed || 5) * 1.1;
            
            this.showToast(`SHIP ENHANCEMENT APPLIED: ${id.toUpperCase()}`, 3000, 'success');
            this.updateWalletUI();
            this.renderTradeUI();
        }
    }
}
window.HUDManager = HUDManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.HUDManager = HUDManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HUDManager;
}
