export function applyUIMixin(EngineClass) {
    Object.assign(EngineClass.prototype, {

        initWindowSystem() {
                const windows = document.querySelectorAll('.cockpit-section, .floating-window, .popup-panel');

                windows.forEach(win => {
                    if (!win.id) return;

                    // 1. Restore state
                    localStorage.removeItem('windowState_' + win.id);
                    const savedState = null;
                    if (savedState) {
                        try {
                            const state = JSON.parse(savedState);
                            win.style.position = 'fixed';
                            if (state.left !== undefined) win.style.left = state.left;
                            if (state.top !== undefined) win.style.top = state.top;
                            if (state.width !== undefined) win.style.width = state.width;
                            if (state.height !== undefined) win.style.height = state.height;
                            win.style.bottom = 'auto';
                            win.style.right = 'auto';
                            if (state.zIndex) {
                                win.style.zIndex = state.zIndex;
                                if (parseInt(state.zIndex) > this.topZIndex) this.topZIndex = parseInt(state.zIndex);
                            }
                        } catch(e) {}
                    }

                    // Bring to front on click anywhere in window
                    win.addEventListener('mousedown', () => {
                        this.topZIndex++;
                        win.style.zIndex = this.topZIndex;
                        this.saveWindowState(win);
                    }, true); // use capture to fire early

                    // 2. Setup Draggable Header
                    const header = win.querySelector('.window-header, .cockpit-header');
                    if (header) {
                        header.style.cursor = 'grab';
                        let isDragging = false;
                        let startX, startY, initialLeft, initialTop;

                        header.addEventListener('mousedown', (e) => {
                            isDragging = true;
                            header.style.cursor = 'grabbing';

                            const rect = win.getBoundingClientRect();
                            win.style.position = 'fixed';
                            win.style.left = rect.left + 'px';
                            win.style.top = rect.top + 'px';
                            win.style.bottom = 'auto';
                            win.style.right = 'auto';

                            startX = e.clientX;
                            startY = e.clientY;
                            initialLeft = parseInt(win.style.left) || win.getBoundingClientRect().left;
                            initialTop = parseInt(win.style.top) || win.getBoundingClientRect().top;

                            e.preventDefault(); 
                        });

                        window.addEventListener('mousemove', (e) => {
                            if (!isDragging) return;
                            const zoom = parseFloat(getComputedStyle(win).zoom || 1);
                            let newLeft = initialLeft + (e.clientX - startX) / zoom;
                            let newTop = initialTop + (e.clientY - startY) / zoom;

                            const minVisible = 50;
                            newLeft = Math.max(-win.offsetWidth + minVisible, Math.min(window.innerWidth / zoom - minVisible, newLeft));
                            newTop = Math.max(0, Math.min(window.innerHeight / zoom - minVisible, newTop));

                            win.style.left = newLeft + 'px';
                            win.style.top = newTop + 'px';
                        });

                        window.addEventListener('mouseup', () => {
                            if (isDragging) {
                                isDragging = false;
                                header.style.cursor = 'grab';
                                this.saveWindowState(win);
                            }
                        });

                        header.addEventListener('dblclick', () => {
                            win.classList.toggle('collapsed');
                        });
                    }

                    // 3. Setup 8-Directional Resize Handles
                    const handleDirs = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

                    handleDirs.forEach(dir => {
                        let handle = win.querySelector('.resize-' + dir);
                        if (!handle) {
                            handle = document.createElement('div');
                            handle.className = 'resize-' + dir;
                            win.appendChild(handle);
                        }

                        let isResizing = false;
                        let startRx, startRy, startWidth, startHeight, startLeft, startTop;

                        handle.addEventListener('mousedown', (e) => {
                            isResizing = true;
                            startRx = e.clientX;
                            startRy = e.clientY;

                            const flightHud = document.getElementById('flightHUD');
                            const zoom = flightHud ? parseFloat(getComputedStyle(flightHud).zoom || 1) : 1;

                            // Let browser compute exact screen positions
                            const rect = win.getBoundingClientRect();
                            let currentLeft = rect.left / zoom;
                            let currentTop = rect.top / zoom;

                            if (getComputedStyle(win).position !== 'fixed' || win.style.right !== 'auto' || win.style.bottom !== 'auto') {
                                // Create placeholder for static elements
                                if (getComputedStyle(win).position !== 'fixed' && win.parentNode && win.parentNode.classList && 
                                   (win.parentNode.classList.contains('left-column') || win.parentNode.classList.contains('right-column') || 
                                    win.parentNode.classList.contains('bottom-left') || win.parentNode.classList.contains('bottom-right'))) {
                                    const placeholder = document.createElement('div');
                                    placeholder.style.width = win.offsetWidth + 'px';
                                    placeholder.style.height = win.offsetHeight + 'px';
                                    placeholder.style.flex = getComputedStyle(win).flex;
                                    placeholder.classList.add('drag-placeholder');
                                    win.parentNode.insertBefore(placeholder, win);
                                }

                                win.style.position = 'fixed';
                                win.style.left = currentLeft + 'px';
                                win.style.top = currentTop + 'px';
                                win.style.bottom = 'auto';
                                win.style.right = 'auto';
                                win.style.margin = '0';
                            }

                            // Use offset properties which correctly map to the CSS values
                            startWidth = win.offsetWidth;
                            startHeight = win.offsetHeight;
                            startLeft = win.offsetLeft;
                            startTop = win.offsetTop;

                            e.preventDefault();
                            e.stopPropagation();
                        });

                        window.addEventListener('mousemove', (e) => {
                            if (!isResizing) return;

                            const flightHud = document.getElementById('flightHUD');
                            let zoom = 1;
                            if (flightHud) {
                                zoom = parseFloat(getComputedStyle(flightHud).zoom || 1);
                            }

                            const dx = (e.clientX - startRx) / zoom;
                            const dy = (e.clientY - startRy) / zoom;

                            let newWidth = startWidth;
                            let newHeight = startHeight;
                            let newLeft = startLeft;
                            let newTop = startTop;

                            const minWidth = Math.max(150, parseFloat(getComputedStyle(win).minWidth) || 150);
                            const minHeight = Math.max(100, parseFloat(getComputedStyle(win).minHeight) || 100);

                            if (dir.includes('e')) {
                                newWidth = Math.max(minWidth, startWidth + dx);
                            }
                            if (dir.includes('s')) {
                                newHeight = Math.max(minHeight, startHeight + dy);
                            }
                            if (dir.includes('w')) {
                                const maxDx = startWidth - minWidth;
                                const actualDx = Math.min(dx, maxDx);
                                newWidth = startWidth - actualDx;
                                newLeft = startLeft + actualDx;
                            }
                            if (dir.includes('n')) {
                                const maxDy = startHeight - minHeight;
                                const actualDy = Math.min(dy, maxDy);
                                newHeight = startHeight - actualDy;
                                newTop = startTop + actualDy;
                            }

                            // Bounds checking
                            newWidth = Math.min(window.innerWidth / zoom - 20, newWidth);
                            newHeight = Math.min(window.innerHeight / zoom - 20, newHeight);
                            newLeft = Math.max(0, newLeft);
                            newTop = Math.max(0, newTop);

                            win.style.setProperty('width', newWidth + 'px', 'important');
                            win.style.setProperty('height', newHeight + 'px', 'important');
                            win.style.setProperty('max-width', 'none', 'important');
                            win.style.setProperty('max-height', 'none', 'important');
                            win.style.left = newLeft + 'px';
                            win.style.top = newTop + 'px';
                        });

                        window.addEventListener('mouseup', () => {
                            if (isResizing) {
                                isResizing = false;
                                this.saveWindowState(win);
                            }
                        });
                    });
        });
            },

        saveWindowState(win) {
                if (!win.id) return;
                const state = {
                    left: win.style.left,
                    top: win.style.top,
                    width: win.style.width,
                    height: win.style.height,
                    zIndex: win.style.zIndex
                };
                localStorage.setItem('windowState_' + win.id, JSON.stringify(state));
            },

        setMode(newMode) {
                this.mode = newMode;
                document.getElementById('drawModeBtn').classList.remove('active');
                document.getElementById('selectModeBtn').classList.remove('active');

                if (newMode === 'draw') {
                    document.getElementById('drawModeBtn').classList.add('active');
                    this.canvas.style.cursor = 'crosshair';
                } else if (newMode === 'select') {
                    document.getElementById('selectModeBtn').classList.add('active');
                    this.canvas.style.cursor = 'pointer';
                }
            },

        setFixedColor(hexColor) {
                this.activeColor = hexColor;
                this.colorMode = 'fixed';
                this.updateColorModeUI();
                this.showToast(`Active color set to ${hexColor} `);
            },

        setRainbowMode() {
                this.colorMode = 'rainbow';
                this.updateColorModeUI();
                this.showToast("Active color set to Rainbow Mode 🌈");
            },

        toggleRotationPanel() {
                const panel = document.getElementById('rotationPanel');
                if (panel) {
                    const isHidden = panel.classList.toggle('hidden');
                    if (this.flightMode) this.gamePaused = !isHidden;
                }
            },

        toggleTemplatePanel() {
                const panel = document.getElementById('templatePanel');
                if (panel.style.display === 'block') {
                    panel.style.display = 'none';
                    if (this.flightMode) this.gamePaused = false;
                } else {
                    panel.style.display = 'block';
                    if (this.flightMode) this.gamePaused = true;
                }
            },

        toggleFlightMode() {
                if (this.hazardEffect && (this.hazardEffect.type === 'player_death' || this.hazardEffect.type === 'blackhole' || this.hazardEffect.type === 'planet_impact')) return;
                this.flightMode = !this.flightMode;
                this.mode = this.flightMode ? 'flight' : 'draw'; // Sync game mode to allow correct rendering

                // Initial sector generation so the player doesn't fly into a void
                if (this.flightMode) {
                    this.checkAndGenerateSectors();
                }

                // Ensure ship is at valid coordinates (Fix NaN or undefined)
                if (!this.playerShip) {
                    this.playerShip = { 
                        type: 'interceptor', 
                        x: 0, y: 0, z: 0, 
                        vx: 0, vy: 0, vz: 0, 
                        rotation: 0, pitch: 0, roll: 0, 
                        speed: 0, maxSpeed: 50, acceleration: 0.5, rotationSpeed: 0.08, 
                        size: 45, color: '#00f3ff', 
                        shield: 100, maxShield: 100, 
                        hull: 100, maxHull: 100, 
                        cargoCount: 0, cargoCapacity: 100,
                        equipment: {
                            weapons: ['basic_laser', null, null, null, null],
                            engine: 'basic_engine',
                            shield: 'basic_shield',
                            wings: ['basic_wings', 'basic_wings'],
                            radar: 'basic_radar'
                        }
                    };
                }
                if (isNaN(this.playerShip.x)) this.playerShip.x = 0;
                if (isNaN(this.playerShip.y)) this.playerShip.y = 0;
                if (isNaN(this.playerShip.vx)) this.playerShip.vx = 0;
                if (isNaN(this.playerShip.vy)) this.playerShip.vy = 0;

                this.calculateShipStats();

                // Safety: Clear any active hazard effects when entering/exiting flight mode
                // EXCEPT nuclear explosions which should play out fully
                if (this.hazardEffect && this.hazardEffect.type !== 'supernova') {
                    this.hazardEffect = null;
                }
                this.camera.shakeX = 0;
                this.camera.shakeY = 0;

                // Toggle HUD overlay
                const hud = document.getElementById('flightHUD');
                const floatingLeaders = document.getElementById('floatingLeaders');
                const missionSection = document.getElementById('sectionMission');

                if (this.flightMode) {
                    if (hud) hud.classList.remove('hidden');
                    if (floatingLeaders) floatingLeaders.classList.remove('hidden');
                    this.updateFloatingLeaderboard();
                    this.showToast('Flight Mode: ON');
                    this.updateMissionHUD(); // Call the new mission HUD update
                    this.updateFactionHUD(); // Boot Faction HUD
                    // Audio: start engine hum + ambient music
                    gameAudio.startEngineHum();
                    gameAudio.startAmbientMusic();
                } else {
                    if (hud) hud.classList.add('hidden');
                    if (floatingLeaders) floatingLeaders.classList.add('hidden');
                    this.updateFactionHUD(); // Hide HUD
                    // Audio: stop engine + music
                    gameAudio.stopEngineHum();
                    gameAudio.stopAmbientMusic();
                }

                // Ensure a background is active
                if (this.flightMode && this.activeStyles.size === 0) {
                    this.toggleBgStyle('deep-space');
                }

                this.showToast(this.flightMode ? 'Flight Mode: ON' : 'Flight Mode: OFF');

                // Reset keys to prevent runaway ship
                this.keysPressed = {};

                // Initialize resize handle for gems section ONCE when entering flight mode
                if (this.flightMode && this.initGemsSectionResize) {
                    this.initGemsSectionResize();
                }

                // Toggle ship button, dock button, and layout presets visibility
                const shipBtn = document.getElementById('selectShipBtn');
                const dockBtn = document.getElementById('dockBtn');
                const pauseBtn = document.getElementById('pauseBtn');
                const layoutPresets = document.getElementById('layoutPresets');

                console.log(`[HUD] toggleFlightMode: flightMode=${this.flightMode}, shipBtn=${!!shipBtn}, dockBtn=${!!dockBtn}`);

                if (shipBtn) {
                    shipBtn.style.setProperty('display', this.flightMode ? 'inline-flex' : 'none', 'important');
                }
                if (dockBtn) {
                    dockBtn.style.setProperty('display', this.flightMode ? 'inline-flex' : 'none', 'important');
                }
                if (pauseBtn) {
                    pauseBtn.style.setProperty('display', this.flightMode ? 'inline-flex' : 'none', 'important');
                    if (!this.flightMode && this.gamePaused) this.togglePause(); // Reset pause state when exiting
                }

                // Toggle HUD Sections explicitly to ensure they are visible
                const vitalsEl = document.getElementById('sectionVitals');
                if (vitalsEl) vitalsEl.style.setProperty('display', 'block', 'important');

                const shipStatusEl = document.getElementById('sectionShipStatus');
                if (shipStatusEl) shipStatusEl.style.setProperty('display', 'flex', 'important');

                const shipDesignEl = document.getElementById('sectionShipDesign');
                if (shipDesignEl) shipDesignEl.style.setProperty('display', this.flightMode ? 'flex' : 'none', 'important');
                if (layoutPresets) {
                    layoutPresets.style.setProperty('display', this.flightMode ? 'flex' : 'none', 'important');
                }

                if (this.flightMode) {
                    this.setLayout(localStorage.getItem('hudLayout') || 'horizontal');
                }

                this.draw();
            },

        setLayout(type) {
                localStorage.setItem('hudLayout', type);

                const W = window.innerWidth;
                const H = window.innerHeight;

                // Calculate optimal scale factor 
                const widthScale = W / 1600;
                const heightScale = H / 1060;
                const scale = Math.min(1.0, Math.max(0.40, Math.min(widthScale, heightScale))); 
                document.documentElement.style.setProperty('--hud-scale', scale);

                // Fallback to horizontal if type is unrecognized
                if (type !== 'horizontal' && type !== 'vertical') {
                    type = 'horizontal';
                }

                const hud = document.getElementById('flightHUD');
                if (hud) {
                    hud.className = `flight-hud layout-${type}` + (this.flightMode ? '' : ' hidden');
                }

                const windows = ['sectionVitals', 'sectionRadar', 'sectionControls', 'sectionGems', 'sectionVelocity', 'floatingMap', 'floatingLeaders', 'sectionMap', 'sectionShipDesign', 'sectionShipStatus', 'sectionMission', 'sectionFactions'];

                windows.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.style.transform = '';
                        if (el.classList.contains('minimized-to-taskbar')) {
                            this.restoreFromTaskbar(id);
                        } else {
                            const displayType = (id === 'sectionVitals' || id === 'sectionMap' || id === 'sectionRadar') ? 'block' : 'flex';
                            if (!el.classList.contains('hidden')) {
                                el.style.setProperty('display', displayType, 'important');
                            }
                        }
                    }
                });

                if (!this.resizeListenerAdded) {
                    window.addEventListener('resize', () => {
                        if (localStorage.getItem('hudLayout')) {
                            this.setLayout(localStorage.getItem('hudLayout'));
                        }
                    });
                    this.resizeListenerAdded = true;
                }
            },

        toggleCockpitSection(sectionId) {
                const section = document.getElementById(sectionId);
                if (!section) return;

                if (section.classList.contains('minimized-to-taskbar')) {
                    // Restore from taskbar
                    this.restoreFromTaskbar(sectionId);
                } else {
                    // Minimize to taskbar
                    this.minimizeToTaskbar(sectionId);
                }
            },

        getWindowName(id) {
                const names = {
                    'sectionRadar': '📡 Radar',
                    'sectionControls': '🎮 Controls',
                    'sectionGems': '💎 Gems',
                    'sectionVelocity': '🚀 Engines',
                    'sectionShipStatus': '🛡️ Shield',
                    'sectionShipDesign': '🎨 Ship Design',
                    'floatingMap': '🗺️ Map',
                    'floatingLeaders': '🏆 Leaders'
                };
                return names[id] || id;
            },

        toggleControlsExpanded() {
                const modal = document.getElementById('expandedControlsModal');
                if (modal) {
                    const isActive = modal.classList.toggle('active');
                    if (this.flightMode) this.gamePaused = isActive;
                }
            },

        hideControlsExpanded() {
                const modal = document.getElementById('expandedControlsModal');
                if (modal) {
                    modal.classList.remove('active');
                    if (this.flightMode) this.gamePaused = false;
                }
            },

        minimizeToTaskbar(windowId) {
                const win = document.getElementById(windowId);
                if (!win) return;

                // Save current position before hiding
                if (!this.savedWindowPositions) this.savedWindowPositions = {};
                this.savedWindowPositions[windowId] = {
                    left: win.style.left,
                    top: win.style.top,
                    width: win.style.width,
                    height: win.style.height,
                    display: win.style.display
                };

                // Hide window
                win.classList.add('minimized-to-taskbar');
                win.style.display = 'none';

                // Add to taskbar
                const taskbar = document.getElementById('windowTaskbar');
                if (taskbar) {
                    const item = document.createElement('div');
                    item.className = 'taskbar-item';
                    item.id = 'taskbar-' + windowId;
                    item.textContent = this.getWindowName(windowId);
                    item.onclick = () => this.restoreFromTaskbar(windowId);
                    taskbar.appendChild(item);
                    taskbar.style.display = 'flex';
                }
            },

        restoreFromTaskbar(windowId) {
                const win = document.getElementById(windowId);
                if (!win) return;

                // Restore position
                if (this.savedWindowPositions && this.savedWindowPositions[windowId]) {
                    const pos = this.savedWindowPositions[windowId];
                    if (pos.left) {
                            win.style.position = 'fixed';
                            win.style.left = pos.left;
                            win.style.right = 'auto';
                        }
                    if (pos.top) {
                        win.style.top = pos.top;
                        win.style.bottom = 'auto';
                    }
                    if (pos.width) win.style.width = pos.width;
                    if (pos.height) win.style.height = pos.height;
                }

                // Show window
                win.classList.remove('minimized-to-taskbar');
                win.style.display = 'block';

                // Remove from taskbar
                const taskbarItem = document.getElementById('taskbar-' + windowId);
                if (taskbarItem) taskbarItem.remove();

                // Hide taskbar if empty
                const taskbar = document.getElementById('windowTaskbar');
                if (taskbar && taskbar.children.length === 0) {
                    taskbar.style.display = 'none';
                }
            },

        saveLayout() {
                const slot = prompt('Save to layout slot (1, 2, or 3):', '1');
                if (!slot || !['1', '2', '3'].includes(slot)) return;

                const windows = ['sectionVitals', 'sectionRadar', 'sectionControls', 'sectionGems', 'sectionVelocity', 'floatingMap', 'floatingLeaders', 'sectionMap', 'sectionShipDesign', 'sectionShipStatus', 'sectionMission', 'sectionFactions'];
                const layout = {};

                windows.forEach(id => {
                    const win = document.getElementById(id);
                    if (win) {
                        layout[id] = {
                            left: win.style.left || win.offsetLeft + 'px',
                            top: win.style.top || win.offsetTop + 'px',
                            width: win.style.width,
                            height: win.style.height,
                            minimized: win.classList.contains('minimized-to-taskbar'),
                            visible: win.style.display !== 'none' && !win.classList.contains('hidden')
                        };
                    }
                });

                localStorage.setItem('windowLayout' + slot, JSON.stringify(layout));
                document.getElementById('layout' + slot + 'Btn')?.classList.add('active');
                this.showToast('Layout ' + slot + ' saved!');
            },

        loadLayout(slot) {
                const layoutStr = localStorage.getItem('windowLayout' + slot);
                if (!layoutStr) {
                    this.showToast('No layout saved in slot ' + slot);
                    return;
                }

                try {
                    const layout = JSON.parse(layoutStr);

                    Object.entries(layout).forEach(([id, pos]) => {
                        const win = document.getElementById(id);
                        if (!win) return;

                        // Restore from taskbar first if minimized
                        if (win.classList.contains('minimized-to-taskbar')) {
                            this.restoreFromTaskbar(id);
                        }

                        // Apply position
                        if (pos.left) {
                            win.style.position = 'fixed';
                            win.style.left = pos.left;
                            win.style.right = 'auto';
                        }
                        if (pos.top) {
                            win.style.top = pos.top;
                            win.style.bottom = 'auto';
                        }
                        if (pos.width) win.style.width = pos.width;
                        if (pos.height) win.style.height = pos.height;

                        // Handle minimized state
                        if (pos.minimized) {
                            this.minimizeToTaskbar(id);
                        } else if (!pos.visible) {
                            win.style.display = 'none';
                        } else {
                            win.style.display = 'block';
                            win.classList.remove('hidden');
                        }
                    });

                    // Update active button
                    ['1', '2', '3'].forEach(s => {
                        document.getElementById('layout' + s + 'Btn')?.classList.toggle('active', s === String(slot));
                    });

                    this.showToast('Layout ' + slot + ' loaded!');
                } catch (e) {
                    console.error('Error loading layout:', e);
                }
            },

        toggleGemValues() {
                this.showGemValues = !this.showGemValues;
                this.updateFlightHUD(); // Refresh display

                const btn = document.getElementById('btnToggleGemValues');
                const gemsSection = document.getElementById('sectionGems');
                const gemsGrid = document.getElementById('gemsGrid');

                if (btn) {
                    btn.style.background = this.showGemValues ? 'rgba(255,215,0,0.3)' : '';
                }

                // Auto-expand and shift left when showing values, restore when hiding
                if (gemsSection) {
                    if (this.showGemValues) {
                        // Store original values if not already stored
                        if (!this._originalGemsHeight) {
                            this._originalGemsHeight = gemsSection.offsetHeight;
                        }
                        if (!this._originalGemsLeft) {
                            this._originalGemsLeft = gemsSection.style.left || '590px';
                        }

                        // Expand height to show all values
                        const expandedHeight = Math.max(320, this._originalGemsHeight + 120);
                        gemsSection.style.height = expandedHeight + 'px';

                        // Shift window left to accommodate wider content with $ values
                        gemsSection.style.left = '300px';

                        // Widen grid columns to fit value text
                        if (gemsGrid) {
                            gemsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
                        }
                    } else {
                        // Restore original height
                        if (this._originalGemsHeight) {
                            gemsSection.style.height = this._originalGemsHeight + 'px';
                        }
                        // Restore original left position
                        if (this._originalGemsLeft) {
                            gemsSection.style.left = this._originalGemsLeft;
                        }
                        // Restore original grid column width
                        if (gemsGrid) {
                            gemsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(110px, 1fr))';
                        }
                    }
                }
            },

        makeResizable(elementId) {
                // Obsolete: Handled centrally by initWindowSystem()
            },

        toggleFloatingWindow(windowId) {
                const win = document.getElementById(windowId);
                if (win) win.classList.toggle('collapsed');
            }
    });
}
