/**
 * Input Manager for Interstellar Engine
 * Handles keyboard, mouse, touch, and joystick inputs.
 * Modifies the global window.game instance keysPressed state directly.
 */
class InputManager {
    constructor(game) {
        this.game = game;
        this.joystickActive = false;
        this.joyInputX = 0;
        this.joyInputY = 0;

        // Ensure keysPressed is initialized
        if (!this.game.keysPressed) {
            this.game.keysPressed = {};
        }

        this.initKeyboard();
        this.initPointer();
        this.initJoystick();
    }

    initKeyboard() {
        window.addEventListener('keydown', e => {
            const key = e.key.toLowerCase();
            this.game.keysPressed[key] = true;

            // 1. System Shortcuts (Passthrough)
            if ((e.ctrlKey || e.metaKey) && key !== 'z') return; 
            
            // 2. Multi-browser Undo
            if ((e.ctrlKey || e.metaKey) && key === 'z') {
                e.preventDefault();
                this.game.undo();
                return;
            }

            // 3. Game Controls (Only act if ready and in flight mode)
            if (this.game.ready && this.game.flightMode) {
                const gameKeys = ['w', 'a', 's', 'd', ' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'u', 'b', 't', 'z', 'k', 'v', 'c', 'p', 'o', 'f', 'g', 'h', '1', '2', '3', '4', '5', '6', 'f1', 'f2', 'f3', 'f10', 'escape'];
                
                if (gameKeys.includes(key)) {
                    e.preventDefault(); // Block browser defaults ONLY for game controls
                }

                if (key === 'escape') {
                    if (this.game.isAnyModalOpen()) {
                        this.game.closeAllModals();
                    } else if (this.game.engineCore) {
                        this.game.engineCore.toggleFlightMode();
                    }
                } else if (key === 'u') {
                    this.game.toggleUpgradePanel();
                } else if (key === 'b') {
                    if (!this.game.spaceBase?.isDeployed) {
                        this.game.deployBase();
                    } else {
                        this.game.toggleBasePanel();
                    }
                } else if (key === 't') {
                    this.game.toggleSlowMo();
                } else if (key === 'z') {
                    if (this.game.isNearBase()) {
                        this.game.depositAllResources();
                    } else {
                        this.game.showToast('⚠️ Get closer to base to deposit!');
                    }
                } else if (key === 'k') {
                    this.game.toggleHUD();
                } else if (key === 'f10') {
                    if (this.game.toggleCinematicMode) this.game.toggleCinematicMode();
                } else if (key === 'v') {
                    this.game.triggerViperBoost();
                } else if (key === 'c') {
                    this.game.toggleSpectreCloak();
                } else if (key === 'p') {
                    this.game.triggerPulsePing();
                } else if (key === 'o') {
                    this.game.triggerApexOverclock();
                } else if (key === 'f') {
                    this.game.fireDecoyFlare();
                } else if (key === 'g') {
                    this.game.dockPlayer();
                } else if (key === '1') {
                    this.game.triggerGlobalEMP();
                } else if (key === '2') {
                    this.game.triggerGlobalAfterburner();
                } else if (key === '3') {
                    this.game.triggerGlobalQuantumJump();
                } else if (key === '4') {
                    this.game.activateBlackHole();
                } else if (key === '5') {
                    this.game.activateChronoShift();
                } else if (key === 'h') {
                    if (this.game.isPlayerAtBase && this.game.isPlayerAtBase()) {
                        this.game.hireWingman();
                    } else {
                        this.game.showToast('⚠️ You must be near the Space Base to hire a wingman!');
                    }
                } else if (key === '6') {
                    if (this.game.capitalShipManager && this.game.playerShip) {
                        this.game.capitalShipManager.spawnCapitalShip(
                            'void_dreadnought', 
                            this.game.playerShip.x + 1000 + Math.random() * 500, 
                            this.game.playerShip.y + 1000 + Math.random() * 500
                        );
                    }
                } else if (this.game.combatManager) {
                    const cm = this.game.combatManager;
                    if (key === '7' || key === 'f1') cm.commandFleet('attack');
                    if (key === '8' || key === 'f2') cm.commandFleet('defend');
                    if (key === '9' || key === 'f3') cm.commandFleet('guard');
                    if (key === '0') cm.commandFleet('scatter');
                    
                    if (key === 'v') cm.setFormation('v-shape');
                    if (key === 'o') cm.setFormation('diamond');
                    if (key === 'p') cm.setFormation('circle');
                } else if (key === 'l') {
                    // Contextual prioritized L: Landing > Formation > LogBook
                    const planet = this.game.surfaceManager?.findNearbyPlanet();
                    if (planet && this.game.playerShip && this.game.playerShip.speed <= 10) {
                        this.game.surfaceManager.initiateLanding();
                    } else if (this.game.combatManager && this.game.playerShip && this.game.playerShip.inCombat) {
                        this.game.combatManager.setFormation('line');
                    } else {
                        if (this.game.hudManager) this.game.hudManager.renderLogBook();
                    }
                }
            }
        });

        window.addEventListener('keyup', e => {
            const key = e.key.toLowerCase();
            this.game.keysPressed[key] = false;

            // CLEAR ENGINE DISABLE on key release (Requires re-press to re-engage)
            if (key === 'w' || key === 's' || key === 'arrowup' || key === 'arrowdown') {
                if (this.game.playerShip) this.game.playerShip.enginesDisabled = false;
            }
        });
    }

    initPointer() {
        this.game.canvas.addEventListener('pointerdown', e => this.onPointerDown(e));
        window.addEventListener('pointermove', e => this.onPointerMove(e));
        window.addEventListener('pointerup', e => this.onPointerUp(e));
        this.game.canvas.addEventListener('wheel', e => {
            this.onWheel(e);
        }, { passive: false });
        this.game.canvas.addEventListener('contextmenu', e => this.onRightClick(e));
    }

    onPointerDown(e) {
        if (!this.game.ready) return;
        const rect = this.game.canvas.getBoundingClientRect();
        const centerX = this.game.canvas.width / 2;
        const centerY = this.game.canvas.height / 2;
        const x = (e.clientX - rect.left - centerX - (this.game.camera.x || 0)) / (this.game.camera.zoom || 1);
        const y = (e.clientY - rect.top - centerY - (this.game.camera.y || 0)) / (this.game.camera.zoom || 1);

        if (this.game.mode === 'draw') {
            const star = {
                id: Date.now(),
                x, y, z: 0,
                color: this.game.colorMode === 'rainbow' ? this.game.getRainbowHex() : this.game.activeColor,
                phase: Math.random() * Math.PI * 2
            };
            this.game.stars.push(star);
            if (this.game.renderManager) this.game.renderManager.draw();
        } else if (this.game.mode === 'select') {
            const threshold = 20 / this.game.camera.zoom;
            this.game.selectedStar = this.game.stars.find(s => Math.hypot(s.x - x, s.y - y) < threshold);
            if (this.game.selectedStar) {
                this.game.isDragging = true;
                this.game.dragOffset = { x: this.game.selectedStar.x - x, y: this.game.selectedStar.y - y };
            }
        }
    }

    onPointerMove(e) {
        if (!this.game.ready) return;
        if (this.game.mode === 'select' && this.game.isDragging && this.game.selectedStar) {
            const rect = this.game.canvas.getBoundingClientRect();
            const centerX = this.game.canvas.width / 2;
            const centerY = this.game.canvas.height / 2;
            const x = (e.clientX - rect.left - centerX - (this.game.camera.x || 0)) / (this.game.camera.zoom || 1);
            const y = (e.clientY - rect.top - centerY - (this.game.camera.y || 0)) / (this.game.camera.zoom || 1);
            this.game.selectedStar.x = x + (this.game.dragOffset.x || 0);
            this.game.selectedStar.y = y + (this.game.dragOffset.y || 0);
            if (this.game.renderManager) this.game.renderManager.draw();
        }
    }

    onPointerUp() {
        this.game.isDragging = false;
        this.game.selectedStar = null;
    }

    onWheel(e) {
        e.preventDefault();
        const delta = -e.deltaY;
        const factor = Math.pow(1.1, delta / 100);
        
        // Update target zoom
        this.game.camera.targetZoom = Math.min(10, Math.max(0.1, (this.game.camera.targetZoom || this.game.camera.zoom) * factor));
    }

    onRightClick(e) {
        e.preventDefault();
        const rect = this.game.canvas.getBoundingClientRect();
        const centerX = this.game.canvas.width / 2;
        const centerY = this.game.canvas.height / 2;
        const x = (e.clientX - rect.left - centerX - (this.game.camera.x || 0)) / (this.game.camera.zoom || 1);
        const y = (e.clientY - rect.top - centerY - (this.game.camera.y || 0)) / (this.game.camera.zoom || 1);
        
        const threshold = 20 / (this.game.camera.zoom || 1);
        const index = this.game.stars.findIndex(s => Math.hypot(s.x - x, s.y - y) < threshold);
        if (index !== -1) {
            this.game.stars.splice(index, 1);
            if (this.game.renderManager) this.game.renderManager.draw();
        }
    }

    initJoystick() {
        const base = document.getElementById('joystick-base');
        const stick = document.getElementById('joystick-stick');
        const container = document.getElementById('joystick-container');

        // Show joystick on init if likely mobile
        if (window.innerWidth <= 768 && container) {
            container.style.display = 'block';
            this.joystickActive = true;
        }

        if (!base || !stick) return;

        let startX = 0, startY = 0;
        const maxDist = 35; // Max movement radius

        const handleStart = (e) => {
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            startX = touch.clientX;
            startY = touch.clientY;
            this.joystickActive = true;
        };

        const handleMove = (e) => {
            if (!this.joystickActive) return;
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;

            let dx = touch.clientX - startX;
            let dy = touch.clientY - startY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > maxDist) {
                dx = (dx / dist) * maxDist;
                dy = (dy / dist) * maxDist;
            }

            stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

            // Normalize -1 to 1
            this.joyInputX = dx / maxDist;
            this.joyInputY = dy / maxDist;
            
            // Sync with game state
            this.game.joyInputX = this.joyInputX;
            this.game.joyInputY = this.joyInputY;
            this.game.joystickActive = this.joystickActive;
        };

        const handleEnd = (e) => {
            e.preventDefault();
            this.joystickActive = false;
            this.joyInputX = 0;
            this.joyInputY = 0;
            stick.style.transform = `translate(-50%, -50%)`;
            
            // Sync with game state
            this.game.joyInputX = 0;
            this.game.joyInputY = 0;
            this.game.joystickActive = false;
        };

        base.addEventListener('touchstart', handleStart, { passive: false });
        base.addEventListener('touchmove', handleMove, { passive: false });
        base.addEventListener('touchend', handleEnd, { passive: false });

        // Also mouse for testing
        base.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
    }
}

// Make accessible globally
if (typeof window !== 'undefined') {
    window.InputManager = InputManager;
}

// Support for other environments if necessary
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InputManager;
}
