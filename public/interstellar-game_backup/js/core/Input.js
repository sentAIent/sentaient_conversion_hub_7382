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

        this.initKeyboard();
        this.initPointer();
        this.initJoystick();
    }

    initKeyboard() {
        window.addEventListener('keydown', e => {
            const key = e.key.toLowerCase();
            this.game.keysPressed[key] = true;

            // Undo shortcut
            if ((e.ctrlKey || e.metaKey) && key === 'z') {
                e.preventDefault();
                this.game.undo();
                return;
            }

            // Flight mode specific controls
            if (this.game.flightMode) {
                if (key === 'u') {
                    this.game.toggleUpgradePanel();
                } else if (key === 'b') {
                    if (!this.game.spaceBase.isDeployed) {
                        this.game.deployBase();
                    } else {
                        this.game.toggleBasePanel();
                    }
                } else if (key === 't') {
                    this.game.toggleTowing();
                } else if (key === 'z') {
                    if (this.game.isNearBase()) {
                        this.game.depositAllResources();
                    } else {
                        this.game.showToast('⚠️ Get closer to base to deposit!');
                    }
                } else if (key === 'k') {
                    this.game.toggleSkillTree();
                } else if (key === 'v') {
                    this.game.triggerViperBoost();
                } else if (key === 'c') {
                    this.game.toggleSpectreCloak();
                } else if (key === 'p') {
                    this.game.triggerPulsePing();
                } else if (key === 'o') {
                    this.game.triggerApexOverclock();
                } else if (key === 'g') {
                    this.game.fireDecoyFlare();
                } else if (key === '1') {
                    this.game.triggerGlobalEMP();
                } else if (key === '2') {
                    this.game.triggerGlobalAfterburner();
                } else if (key === '3') {
                    this.game.triggerGlobalQuantumJump();
                }
                e.preventDefault();
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
        this.game.canvas.addEventListener('pointerdown', e => this.game.onPointerDown(e));
        window.addEventListener('pointermove', e => this.game.onPointerMove(e));
        window.addEventListener('pointerup', e => this.game.onPointerUp(e));
        this.game.canvas.addEventListener('wheel', e => {
            console.log('[Zoom Event] Wheel event fired');
            this.game.onWheel(e);
        }, { passive: false });
        this.game.canvas.addEventListener('contextmenu', e => this.game.onRightClick(e)); // Right-click deletion
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
window.InputManager = InputManager;
