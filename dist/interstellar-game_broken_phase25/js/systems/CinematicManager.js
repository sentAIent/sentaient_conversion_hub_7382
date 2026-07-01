/**
 * CinematicManager for Interstellar Engine
 * Handles scripted camera movements, letterboxing, and visual transitions.
 */
class CinematicManager {
    constructor(game) {
        this.game = game;
        this.active = false;
        this.letterboxAmount = 0;
        this.targetLetterbox = 0;
        this.transitionAlpha = 0;
        this.targetTransitionAlpha = 0;
        this.transitionColor = '#ffffff';

        this.cameraScript = null;
        this.scriptStartTime = 0;

        this.createLetterboxUI();
    }

    createLetterboxUI() {
        if (document.getElementById('cinematic-overlays')) return;

        const container = document.createElement('div');
        container.id = 'cinematic-overlays';
        container.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            pointer-events: none; z-index: 9999; overflow: hidden;
        `;

        const topBar = document.createElement('div');
        topBar.id = 'cinematic-top-bar';
        topBar.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 0;
            background: #000; transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        const bottomBar = document.createElement('div');
        bottomBar.id = 'cinematic-bottom-bar';
        bottomBar.style.cssText = `
            position: absolute; bottom: 0; left: 0; width: 100%; height: 0;
            background: #000; transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        const flashOverlay = document.createElement('div');
        flashOverlay.id = 'cinematic-flash';
        flashOverlay.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: #fff; opacity: 0; pointer-events: none;
        `;

        container.appendChild(topBar);
        container.appendChild(bottomBar);
        container.appendChild(flashOverlay);
        document.body.appendChild(container);
    }

    setLetterbox(active) {
        const height = active ? '12vh' : '0';
        document.getElementById('cinematic-top-bar').style.height = height;
        document.getElementById('cinematic-bottom-bar').style.height = height;
    }

    flash(color = '#ffffff', duration = 1000) {
        const flashEl = document.getElementById('cinematic-flash');
        flashEl.style.backgroundColor = color;
        flashEl.style.transition = 'none';
        flashEl.style.opacity = '1';
        
        // Force reflow
        flashEl.offsetHeight;

        flashEl.style.transition = `opacity ${duration}ms ease-out`;
        flashEl.style.opacity = '0';
    }

    /**
     * Plays a scripted camera move
     * @param {Object} script { duration, targetX, targetY, targetZoom, onComplete }
     */
    playCameraScript(script) {
        this.cameraScript = script;
        this.scriptStartTime = performance.now();
        this.game.cinematicMode = true;
        this.setLetterbox(true);
    }

    update() {
        if (!this.cameraScript) return;

        const elapsed = performance.now() - this.scriptStartTime;
        const p = Math.min(1.0, elapsed / this.cameraScript.duration);
        
        // Ease In Out Cubic
        const t = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        if (this.cameraScript.targetX !== undefined) {
            this.game.camera.x += (this.cameraScript.targetX - this.game.camera.x) * 0.05;
        }
        if (this.cameraScript.targetY !== undefined) {
            this.game.camera.y += (this.cameraScript.targetY - this.game.camera.y) * 0.05;
        }
        if (this.cameraScript.targetZoom !== undefined) {
            this.game.camera.zoom += (this.cameraScript.targetZoom - this.game.camera.zoom) * 0.05;
        }

        if (p >= 1.0) {
            if (this.cameraScript.onComplete) this.cameraScript.onComplete();
            this.cameraScript = null;
            // Don't automatically exit cinematic mode, let the caller decide
        }
    }

    exitCinematic() {
        this.game.cinematicMode = false;
        this.setLetterbox(false);
        this.cameraScript = null;
    }
}

window.CinematicManager = CinematicManager;
