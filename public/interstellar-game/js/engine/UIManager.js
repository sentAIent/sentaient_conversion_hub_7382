export class UIManager {
    constructor(engine) {
        this.engine = engine;
        this.topZIndex = 1000;
        this.savedWindowPositions = {};
        this.resizeListenerAdded = false;
    }

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

                    const rect = win.getBoundingClientRect();
                    let currentLeft = rect.left / zoom;
                    let currentTop = rect.top / zoom;

                    if (getComputedStyle(win).position !== 'fixed' || win.style.right !== 'auto' || win.style.bottom !== 'auto') {
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
    }

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
    }

    setMode(newMode) {
        this.engine.mode = newMode;
        document.getElementById('drawModeBtn').classList.remove('active');
        document.getElementById('selectModeBtn').classList.remove('active');

        if (newMode === 'draw') {
            document.getElementById('drawModeBtn').classList.add('active');
            this.engine.canvas.style.cursor = 'crosshair';
        } else if (newMode === 'select') {
            document.getElementById('selectModeBtn').classList.add('active');
            this.engine.canvas.style.cursor = 'pointer';
        }
    }

    setFixedColor(hexColor) {
        this.engine.activeColor = hexColor;
        this.engine.colorMode = 'fixed';
        this.engine.updateColorModeUI();
        this.engine.showToast(`Active color set to ${hexColor} `);
    }

    setRainbowMode() {
        this.engine.colorMode = 'rainbow';
        this.engine.updateColorModeUI();
        this.engine.showToast("Active color set to Rainbow Mode 🌈");
    }

    toggleRotationPanel() {
        const panel = document.getElementById('rotationPanel');
        if (panel) {
            const isHidden = panel.classList.toggle('hidden');
            if (this.engine.flightMode) this.engine.gamePaused = !isHidden;
        }
    }

    toggleTemplatePanel() {
        const panel = document.getElementById('templatePanel');
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
            if (this.engine.flightMode) this.engine.gamePaused = false;
        } else {
            panel.style.display = 'block';
            if (this.engine.flightMode) this.engine.gamePaused = true;
        }
    }

    toggleFlightMode() {
        if (this.engine.hazardEffect && (this.engine.hazardEffect.type === 'player_death' || this.engine.hazardEffect.type === 'blackhole' || this.engine.hazardEffect.type === 'planet_impact')) return;
        this.engine.flightMode = !this.engine.flightMode;
        this.engine.mode = this.engine.flightMode ? 'flight' : 'draw'; 

        if (this.engine.flightMode) {
            this.engine.checkAndGenerateSectors();
        }

        if (!this.engine.playerShip) {
            this.engine.playerShip = { 
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
        if (isNaN(this.engine.playerShip.x)) this.engine.playerShip.x = 0;
        if (isNaN(this.engine.playerShip.y)) this.engine.playerShip.y = 0;
        if (isNaN(this.engine.playerShip.vx)) this.engine.playerShip.vx = 0;
        if (isNaN(this.engine.playerShip.vy)) this.engine.playerShip.vy = 0;

        this.engine.calculateShipStats();

        if (this.engine.hazardEffect && this.engine.hazardEffect.type !== 'supernova') {
            this.engine.hazardEffect = null;
        }
        this.engine.camera.shakeX = 0;
        this.engine.camera.shakeY = 0;

        const hud = document.getElementById('flightHUD');
        const floatingLeaders = document.getElementById('floatingLeaders');

        if (this.engine.flightMode) {
            if (hud) hud.classList.remove('hidden');
            if (floatingLeaders) floatingLeaders.classList.remove('hidden');
            this.engine.updateFloatingLeaderboard();
            this.engine.showToast('Flight Mode: ON');
            this.engine.updateMissionHUD(); 
            this.engine.updateFactionHUD(); 
            if (this.engine.audio) {
                this.engine.audio.startEngineHum();
                this.engine.audio.startAmbientMusic();
            }
        } else {
            if (hud) hud.classList.add('hidden');
            if (floatingLeaders) floatingLeaders.classList.add('hidden');
            this.engine.updateFactionHUD(); 
            if (this.engine.audio) {
                this.engine.audio.stopEngineHum();
                this.engine.audio.stopAmbientMusic();
            }
        }

        if (this.engine.flightMode && this.engine.activeStyles.size === 0) {
            this.engine.toggleBgStyle('deep-space');
        }

        this.engine.showToast(this.engine.flightMode ? 'Flight Mode: ON' : 'Flight Mode: OFF');

        this.engine.keysPressed = {};

        if (this.engine.flightMode && typeof this.engine.initGemsSectionResize === 'function') {
            this.engine.initGemsSectionResize();
        }

        const shipBtn = document.getElementById('selectShipBtn');
        const dockBtn = document.getElementById('dockBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const layoutPresets = document.getElementById('layoutPresets');

        if (shipBtn) {
            shipBtn.style.setProperty('display', this.engine.flightMode ? 'inline-flex' : 'none', 'important');
        }
        if (dockBtn) {
            dockBtn.style.setProperty('display', this.engine.flightMode ? 'inline-flex' : 'none', 'important');
        }
        if (pauseBtn) {
            pauseBtn.style.setProperty('display', this.engine.flightMode ? 'inline-flex' : 'none', 'important');
            if (!this.engine.flightMode && this.engine.gamePaused) this.engine.togglePause(); 
        }

        const vitalsEl = document.getElementById('sectionVitals');
        if (vitalsEl) vitalsEl.style.setProperty('display', 'block', 'important');

        const shipStatusEl = document.getElementById('sectionShipStatus');
        if (shipStatusEl) shipStatusEl.style.setProperty('display', 'flex', 'important');

        const shipDesignEl = document.getElementById('sectionShipDesign');
        if (shipDesignEl) shipDesignEl.style.setProperty('display', this.engine.flightMode ? 'flex' : 'none', 'important');
        if (layoutPresets) {
            layoutPresets.style.setProperty('display', this.engine.flightMode ? 'flex' : 'none', 'important');
        }

        if (this.engine.flightMode) {
            this.setLayout(localStorage.getItem('hudLayout') || 'horizontal');
        }

        this.engine.draw();
    }

    setLayout(type) {
        localStorage.setItem('hudLayout', type);

        const W = window.innerWidth;
        const H = window.innerHeight;

        const widthScale = W / 1600;
        const heightScale = H / 1060;
        const scale = Math.min(1.0, Math.max(0.40, Math.min(widthScale, heightScale))); 
        document.documentElement.style.setProperty('--hud-scale', scale);

        if (type !== 'horizontal' && type !== 'vertical') {
            type = 'horizontal';
        }

        const hud = document.getElementById('flightHUD');
        if (hud) {
            hud.className = `flight-hud layout-${type}` + (this.engine.flightMode ? '' : ' hidden');
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
    }

    toggleCockpitSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        if (section.classList.contains('minimized-to-taskbar')) {
            this.restoreFromTaskbar(sectionId);
        } else {
            this.minimizeToTaskbar(sectionId);
        }
    }

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
    }

    toggleControlsExpanded() {
        const modal = document.getElementById('expandedControlsModal');
        if (modal) {
            const isActive = modal.classList.toggle('active');
            if (this.engine.flightMode) this.engine.gamePaused = isActive;
        }
    }

    hideControlsExpanded() {
        const modal = document.getElementById('expandedControlsModal');
        if (modal) {
            modal.classList.remove('active');
            if (this.engine.flightMode) this.engine.gamePaused = false;
        }
    }

    minimizeToTaskbar(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;

        if (!this.savedWindowPositions) this.savedWindowPositions = {};
        this.savedWindowPositions[windowId] = {
            left: win.style.left,
            top: win.style.top,
            width: win.style.width,
            height: win.style.height,
            display: win.style.display
        };

        win.classList.add('minimized-to-taskbar');
        win.style.display = 'none';

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
    }

    restoreFromTaskbar(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;

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

        win.classList.remove('minimized-to-taskbar');
        win.style.display = 'block';

        const taskbarItem = document.getElementById('taskbar-' + windowId);
        if (taskbarItem) taskbarItem.remove();

        const taskbar = document.getElementById('windowTaskbar');
        if (taskbar && taskbar.children.length === 0) {
            taskbar.style.display = 'none';
        }
    }

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
        this.engine.showToast('Layout ' + slot + ' saved!');
    }

    loadLayout(slot) {
        const layoutStr = localStorage.getItem('windowLayout' + slot);
        if (!layoutStr) {
            this.engine.showToast('No layout saved in slot ' + slot);
            return;
        }

        try {
            const layout = JSON.parse(layoutStr);

            Object.entries(layout).forEach(([id, pos]) => {
                const win = document.getElementById(id);
                if (!win) return;

                if (win.classList.contains('minimized-to-taskbar')) {
                    this.restoreFromTaskbar(id);
                }

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

                if (pos.minimized) {
                    this.minimizeToTaskbar(id);
                } else if (!pos.visible) {
                    win.style.display = 'none';
                } else {
                    win.style.display = 'block';
                    win.classList.remove('hidden');
                }
            });

            ['1', '2', '3'].forEach(s => {
                document.getElementById('layout' + s + 'Btn')?.classList.toggle('active', s === String(slot));
            });

            this.engine.showToast('Layout ' + slot + ' loaded!');
        } catch (e) {
            console.error('Error loading layout:', e);
        }
    }

    toggleGemValues() {
        this.engine.showGemValues = !this.engine.showGemValues;
        this.engine.updateFlightHUD(); 

        const btn = document.getElementById('btnToggleGemValues');
        const gemsSection = document.getElementById('sectionGems');
        const gemsGrid = document.getElementById('gemsGrid');

        if (btn) {
            btn.style.background = this.engine.showGemValues ? 'rgba(255,215,0,0.3)' : '';
        }

        if (gemsSection) {
            if (this.engine.showGemValues) {
                if (!this._originalGemsHeight) {
                    this._originalGemsHeight = gemsSection.offsetHeight;
                }
                if (!this._originalGemsLeft) {
                    this._originalGemsLeft = gemsSection.style.left || '590px';
                }

                const expandedHeight = Math.max(320, this._originalGemsHeight + 120);
                gemsSection.style.height = expandedHeight + 'px';
                gemsSection.style.left = '300px';

                if (gemsGrid) {
                    gemsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
                }
            } else {
                if (this._originalGemsHeight) {
                    gemsSection.style.height = this._originalGemsHeight + 'px';
                }
                if (this._originalGemsLeft) {
                    gemsSection.style.left = this._originalGemsLeft;
                }
                if (gemsGrid) {
                    gemsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(110px, 1fr))';
                }
            }
        }
    }

    makeResizable(elementId) {
        // Handled centrally
    }

    toggleFloatingWindow(windowId) {
        const win = document.getElementById(windowId);
        if (win) win.classList.toggle('collapsed');
    }
}
