import { state, els, THEMES } from '../state.js';
import * as THREE from '../vendor/three.module.js';

let viz3D = null;

export class Visualizer3D {
    constructor(canvas, initialState = {}) {
        this.canvas = canvas;
        this.activeModes = initialState.activeModes || new Set(); // Start empty to match UI
        this.mode = initialState.mode || 'none'; // Legacy support

        // Default settings - MUST be set before init methods
        this.mindWaveMode = initialState.mindWaveMode !== undefined ? initialState.mindWaveMode : true;
        
        // Cyber (2D Overlay) Configuration
        this.cyberConfig = {
            logicMode: initialState.cyberLogicMode || 'matrix', // Default to Japanese characters
            customText: initialState.cyberCustomText || "WELCOME",
            angle: initialState.cyberAngle || 0,
            speed: initialState.cyberSpeedMultiplier || 1.0,
            length: 1.0,
            color: '#00FF41',
            rainbow: true
        };

        // Matrix (3D Portal) Configuration
        this.matrixConfig = {
            logicMode: initialState.matrixLogicMode || 'interstellar', // Default to Interstellar style
            customText: initialState.matrixCustomText || "MINDWAVE",
            angle: 0,
            speed: 1.0,
            length: 1.0,
            color: '#00FF41',
            rainbow: false
        };

        this.initialized = false;
        this._rainbowEnabled = initialState.rainbowEnabled || false;
        this.isVisualizer3D = true;

        // Cyber 2D Overlay State (Cyber Mode)
        this.overlayCanvas = document.getElementById('cyberCanvas');
        this.overlayCtx = this.overlayCanvas ? this.overlayCanvas.getContext('2d', { alpha: true }) : null;

        // Store bound handlers so dispose() can remove them and prevent listener stacking
        this._onResizeOverlay = () => this.resizeOverlayCanvas();
        this._onVisibilityChange = () => {
            if (document.hidden) {
                // render() already returns early on document.hidden — nothing to do
            } else {
                this.lastTime = performance.now() * 0.001;
                if (this.active !== false && this.initialized) {
                    import('../visuals/visualizer_lazy.js?v=2').then(m => m.resumeVisuals());
                }
            }
        };
        this._onSafeMode = () => {
            if (this.currentLodLevel !== 'low') {
                console.log("[Visualizer] Safe Mode: Dropping LOD to 'low'.");
                this.degradeLOD();
                this.degradeLOD();
            }
        };
        this._onThemeChanged = (e) => {
            if (e.detail && e.detail.type) {
                const newType = e.detail.type;
                if (this.themeType !== newType) {
                    this.themeType = newType;
                    this.updateLogoTexture();
                }
            }
        };

        // WebGL Context Loss Handlers
        this._onContextLost = (e) => {
            e.preventDefault();
            console.warn('[Visualizer] WebGL context LOST. Halting render loop.');
            this.active = false;
            if (state.animationId) { cancelAnimationFrame(state.animationId); state.animationId = null; }
        };
        this._onContextRestored = () => {
            console.log('[Visualizer] WebGL context RESTORED. Reinitializing...');
            try {
                this.initialized = false;
                this._freqDataArray = null;
                this.initEnvironment();
                this.updateVisibility();
                this.initialized = true;
                this.active = true;
                this.lastTime = performance.now() * 0.001;
                import('../visuals/visualizer_lazy.js?v=2').then(m => m.resumeVisuals());
            } catch (err) {
                console.error('[Visualizer] Error reinitializing after context restore:', err);
            }
        };

        if (this.overlayCanvas) {
            this.resizeOverlayCanvas();
            window.addEventListener('resize', this._onResizeOverlay);
        }

        this.matrixCyberStreams = [];
        this.currentCyberAngle = initialState.cyberAngle !== undefined ? initialState.cyberAngle : 0;
        this.cyberColorCustomized = false;

        try {
            const savedHistory = localStorage.getItem('cyberThemeHistory');
            this.themeHistory = savedHistory ? JSON.parse(savedHistory) : [];
            this.lastCyberFamily = localStorage.getItem('cyberLastFamily') || '';
        } catch (e) {
            this.themeHistory = [];
            this.lastCyberFamily = '';
        }

        // Logo Opacity State (Start bright to match active UI)
        this.currentLogoOpacity = 0.8;
        this.targetLogoOpacity = 0.8;
        viz3D = this; // Ensure module-level viz3D is set immediately
        // Detect initial theme type from document if available, fallback to dark
        this.themeType = document.body.dataset.themeType || 'dark';

        // Mobile / Battery Saver Defaults
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
        this.batterySaver = initialState.batterySaver !== undefined ? initialState.batterySaver : isMobile;
        this.isLowPower = this.batterySaver ||
            localStorage.getItem('mindwave_battery_saver') === 'true' ||
            document.body.classList.contains('system-stability-mode');

        this.lastFrameRenderTime = 0;
        this.targetFPS = this.isLowPower ? 30 : 60;
        this.vibrationEnabled = (typeof state !== 'undefined' && state.visualVibration !== undefined) ? state.visualVibration : (initialState.visualVibration !== undefined ? initialState.visualVibration : false);

        // Adaptive Level of Detail (LOD) Tracking — Ring Buffer (avoids push/shift deopt)
        this._fpsRingBuffer = new Float64Array(60);
        this._fpsRingIndex = 0;
        this._fpsRingCount = 0;
        this.lastLodDegradation = 0;
        this.currentLodLevel = 'high'; // 'high', 'medium', 'low'

        // Reusable scratch objects to avoid per-frame/per-call allocations
        this._tempColor = new THREE.Color();
        this._logoRenderCanvas = null; // Lazily created, reused


        try {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ 
                canvas: canvas, 
                alpha: true, 
                antialias: true,
                preserveDrawingBuffer: true
            });
            this.renderer.autoClear = false; // Prevent black flash on frame drops
            this.renderer.setClearColor(0x000000, 0); // Transparent background
            this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

            // Performance optimization: Cap pixel ratio based on stability mode
            const maxPixelRatio = this.isLowPower ? 1.0 : 2.0;
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));

            this.sphereGroup = new THREE.Group();
            this.scene.add(this.sphereGroup);

            this.particleGroup = new THREE.Group();
            this.scene.add(this.particleGroup);

            this.lightspeedGroup = new THREE.Group();
            this.scene.add(this.lightspeedGroup);

            this.lavaGroup = new THREE.Group();
            this.scene.add(this.lavaGroup);

            this.fireplaceGroup = new THREE.Group();
            this.scene.add(this.fireplaceGroup);

            this.rainforestGroup = new THREE.Group();
            this.scene.add(this.rainforestGroup);

            this.zenGardenGroup = new THREE.Group();
            this.scene.add(this.zenGardenGroup);

            this.oceanGroup = new THREE.Group();
            this.scene.add(this.oceanGroup);

            this.cyberGroup = new THREE.Group();
            this.scene.add(this.cyberGroup);

            this.boxGroup = new THREE.Group();
            this.scene.add(this.boxGroup);

            this.dragonGroup = new THREE.Group();
            this.scene.add(this.dragonGroup);

            this.galaxyGroup = new THREE.Group();
            this.scene.add(this.galaxyGroup);

            // Sun Rotation Speeds (Blender-style X, Y, Z controls)
            this.sunRotationSpeedX = 0;
            this.sunRotationSpeedY = 0.005; // Default spinning like a coin
            this.sunRotationSpeedZ = 0.003; // Default rotating like a wheel
            this.sunRotationTiltX = 0;     // Oscillating tilt base

            this.mandalaGroup = new THREE.Group();
            this.scene.add(this.mandalaGroup);

            this.cymaticsGroup = new THREE.Group();
            this.scene.add(this.cymaticsGroup);
            this.cymaticsGroup.visible = false;

            // Cymatics Engine State
            this.cymaticsHistory = [];
            this.cymaticsHistoryIndex = -1;
            this.cymaticsTimer = 60; // default 60s
            this.lastCymaticRotation = performance.now();
            this.currentCymaticData = { n: 2, m: 3 }; 

            this.textures = {};

            // Cached frequency data buffer — avoids allocating new Uint8Array every frame
            this._freqDataArray = null;

            this.initEnvironment();
            // REMOVED: Exhaustive initialization calls here to fix 5s loading delay.
            // Modes are now initialized lazily in updateVisibility().

            this.camera.position.z = 5;

            // Dynamic Layout Handling
            this.handleLayoutChange = this.handleLayoutChange.bind(this);
            this._onResize = () => {
                this.resize();
                this.handleLayoutChange();
            };
            window.addEventListener('resize', this._onResize);
            window.addEventListener('mindwave:layout-change', this.handleLayoutChange);

            // Memory Guard: Safe Mode listener (using pre-bound handler)
            window.addEventListener('mindwave:safe-mode-start', this._onSafeMode);

            // Page Visibility API - Battery Saver & Loop Guard
            document.addEventListener('visibilitychange', this._onVisibilityChange);

            // WebGL Context Loss Recovery — avoids permanent black screen on GPU crash
            canvas.addEventListener('webglcontextlost', this._onContextLost);
            canvas.addEventListener('webglcontextrestored', this._onContextRestored);
                } catch (err) {
                    console.error('[Visualizer] Failed to recover from context loss:', err);
                }
            });

            // Initial sizing
            this.resize();
            setTimeout(this.handleLayoutChange, 100); // Delay slightly for DOM to settle

            // Theme Tracking for Adaptive Logo (using pre-bound handler)
            window.addEventListener('themeChanged', this._onThemeChanged);

            this.speedMultiplier = 1.0;
            this.brightnessMultiplier = 1.0;

            // Time Simulation
            this.lastTime = performance.now() * 0.001;
            this.simTime = 0; // Accumulated simulation time

            // Apply initial visibility based on activeModes defaults
            // REMOVED: Defer to initVisualizer to unblock main thread
            // this.updateVisibility();

            this.initialized = true;

            // IMMEDIATE: Load logo first so it's visible while other assets load
            this.initOverlayLogo();
        } catch (e) {
            console.error("Three.js Init Failed:", e);
            this.initialized = false;
        }


    }

    resize() {
        if (!this.renderer || !this.canvas || !this.camera) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        // Ensure layout is updated after standard resize
        this.handleLayoutChange();
    }

    handleLayoutChange() {
        if (!this.renderer || !this.camera) return;

        // Reset to full-window center (Backdrop mode)
        // This ensures visuals stay behind menus instead of "squeezing" into the gap.
        this.camera.clearViewOffset();
        // NOTE: console.log removed — was firing on every resize causing GC chatter
    }

    resizeOverlayCanvas() {
        if (!this.overlayCanvas) return;
        this.overlayCanvas.width = window.innerWidth;
        this.overlayCanvas.height = window.innerHeight;
    }

    generateCyberStyle() {
        const canvas = this.overlayCanvas;
        const ctx = this.overlayCtx;
        if (!canvas || !ctx) return;

        // CRUCIAL: Empty out the stream array so we don't infinitely leak memory 
        // every time we re-trigger Cyber style (which was causing massive Chrome lock-ups).
        this.matrixCyberStreams = [];

        // Dynamic density based on screen size - reduced by ~20% per user request
        const fontSize = Math.max(11, Math.min(21, Math.floor(canvas.width / 50)));
        this.isLowPower = localStorage.getItem('mindwave_battery_saver') === 'true' ||
            document.body.classList.contains('system-stability-mode');

        let columns = Math.ceil(canvas.width / fontSize);
        if (!this.isLowPower) {
            columns *= 1.5; // Only boost density if system is stable/powerful
        }

        // Sync local settings with theme
        let currentTheme = window.getCurrentTheme ? window.getCurrentTheme() : { color: '#2dd4bf' };

        this.resizeOverlayCanvas();
        this.cyberColorCustomized = false;

        const themes = [
            { name: 'System Yellow', color: '#FFFF00', family: 'yellow' },
            { name: 'Neon Pink', color: '#FF1493', family: 'pink' },
            { name: 'Chrome Static', color: '#C0C0C0', family: 'mono' },
            { name: 'Royal Data', color: '#4169E1', family: 'blue' },
            { name: 'White Noise', color: '#FFFFFF', family: 'mono' },
            { name: 'Cyan Future', color: '#00FFFF', family: 'blue' },
            { name: 'Lime Access', color: '#32CD32', family: 'green' },
            { name: 'Purple Haze', color: '#800080', family: 'purple' },
            { name: 'Emerald Link', color: '#50C878', family: 'green' },
            { name: 'Ice Blue', color: '#A5F2F3', family: 'blue' },
            { name: 'sentAIent Blue', color: '#60A9FF', family: 'blue' },
            { name: 'Rainbow Surge', color: 'rainbow', family: 'rainbow' }
        ];

        const lastFamily = this.lastCyberFamily || '';
        let availableThemes = themes.filter(t => !this.themeHistory.includes(t.name));
        const familyFiltered = availableThemes.filter(t => t.family !== lastFamily);
        if (familyFiltered.length > 0) availableThemes = familyFiltered;

        let pool = availableThemes;
        if (pool.length === 0) {
            const lastTheme = this.themeHistory[this.themeHistory.length - 1];
            pool = themes.filter(t => t.name !== lastTheme);
        }

        const theme = pool[Math.floor(Math.random() * pool.length)];

        this.themeHistory.push(theme.name);
        if (this.themeHistory.length > 5) this.themeHistory.shift();
        this.lastCyberFamily = theme.family;

        try {
            localStorage.setItem('cyberThemeHistory', JSON.stringify(this.themeHistory));
            localStorage.setItem('cyberLastFamily', this.lastCyberFamily);
        } catch (e) {
            console.warn('LocalStorage failed', e);
        }

        // Ensure base multipliers exist but do not overwrite user settings
        if (this.cyberSpeedMultiplier === undefined) this.cyberSpeedMultiplier = 0.2;
        if (this.cyberLengthMultiplier === undefined) this.cyberLengthMultiplier = 0.7;

        // Sync Rainbow UI ONLY if it hasn't been manually set or if we really need to force a default
        // But crucially, don't override if the user has a preference set.
        const rainbowToggle = document.getElementById('cyberRainbowToggle');
        if (rainbowToggle) {
            // Only sync if the toggle doesn't match the theme AND we aren't in a custom state
            // Actually, simpler: just don't touch this.cyberRainbowMode here if it's already defined
            if (this.cyberRainbowMode === undefined) {
                this.cyberRainbowMode = true;
                this.cyberConfig.rainbow = true;
                rainbowToggle.checked = true;
            }
        }

        // Set color if NOT in rainbow mode
        if (!this.cyberRainbowMode && currentTheme.color !== 'rainbow') {
            this.cyberColor = currentTheme.color;
            const colorPicker = document.getElementById('cyberColorPicker');
            if (colorPicker) colorPicker.value = this.cyberColor;
        }

        for (let i = 0; i < columns; i++) {
            const depth = Math.random();
            // NORMALLY 10-24px. 20% reduction target is 8-19px.
            const size = Math.floor(8 + depth * 11); 
            const speed = (2 + depth * 8 + Math.random() * 2) * this.cyberSpeedMultiplier;

            this.matrixCyberStreams.push({
                x: i * fontSize,
                // Make streams span completely across the visible view perfectly so they appear genuinely instantly!
                y: (Math.random() * this.overlayCanvas.height * 1.5) - (this.overlayCanvas.height * 0.5),
                baseSpeed: speed,
                opacity: 0.2 + depth * 0.8,
                size: size,
                chars: [], // Will be populated by updateCyberStrings
                color: currentTheme.color !== 'rainbow' ? currentTheme.color : '#FFFFFF'
            });
        }

        // Generate the correctly spaced and sequenced strings
        this.updateCyberStrings();

        // PERFORMANCE (macOS): Sort exactly by size ascending to group font sizes.
        // This allows us to set `ctx.font` exponentially fewer times per frame.
        this.matrixCyberStreams.sort((a, b) => a.size - b.size);
    }

    renderCyberCyber() {
        // Guard: render 2D overlay for cyber mode
        const shouldRender = this.activeModes.has('cyber');
        if (!this.overlayCtx || !this.matrixCyberStreams || !shouldRender) return;

        const ctx = this.overlayCtx;
        const canvas = this.overlayCanvas;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // DYNAMIC BACKGROUND: Dim more if alone, less if layering
        const isLayered = this.activeModes.size > 1;
        ctx.fillStyle = isLayered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.textAlign = 'center';

        const config = this.cyberConfig;
        const speedMult = config.speed || 1.0;
        const lengthMult = config.length || 1.0;

        if (config.angle !== 0) {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((config.angle * Math.PI) / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        const baseVisibleLength = 20;
        const rainbowHueOffset = Date.now() * 0.1;

        // macOS optimization: cache font setting
        ctx.textBaseline = 'middle';
        let lastSize = -1;

        this.matrixCyberStreams.forEach((stream, streamIndex) => {
            stream.y += stream.baseSpeed * speedMult;
            let visibleLength = Math.max(3, Math.floor(baseVisibleLength * lengthMult));
            if (this.isLowPower) visibleLength = Math.floor(visibleLength * 0.6); // Reduce vertical draw calls

            if (stream.y - (visibleLength * stream.size) > canvas.height * 1.5) {
                // Fix major glitch gap: wrap perfectly so the head spawns exactly at the top of the canvas
                stream.y = 0;
            }

            const alphanumericPool = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            // Only trigger expensive context state change if size physically changes
            if (stream.size !== lastSize) {
                ctx.font = `${stream.size}px monospace`;
                lastSize = stream.size;
            }

            for (let i = 0; i < visibleLength && i < stream.chars.length; i++) {
                // FLICKER EFFECT: make random characters change to feel alive like the real Cyber!
                if (!stream.isTextMode && Math.random() < 0.02) {
                    stream.chars[i] = alphanumericPool.charAt(Math.floor(Math.random() * alphanumericPool.length));
                }

                const char = stream.chars[i];
                const charY = stream.y - (i * stream.size);
                if (charY < -stream.size * 2 || charY > canvas.height * 1.5) continue;

                const relativePos = 1 - (i / visibleLength);
                // Increased base alpha for better visibility
                const alpha = Math.pow(relativePos, 0.4) * (stream.opacity * 1.2);

                ctx.globalAlpha = Math.min(1.0, alpha);

                if (this.cyberRainbowMode) {
                    const hue = (rainbowHueOffset + streamIndex * 15 + i * 5) % 360;
                    ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
                } else {
                    ctx.fillStyle = stream.color || this.cyberColor;
                }

                // PERFORMANCE: Disable shadows for stability on macOS
                // if (!this.batterySaver) {
                //    ctx.shadowBlur = 4;
                //    ctx.shadowColor = ctx.fillStyle;
                // }

                ctx.fillText(char, stream.x, charY);
            }
        });

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
        ctx.restore();
    }

    initSphere() {
        const geometry = new THREE.IcosahedronGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x60a9ff, // Accent color
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        this.sphere = new THREE.Mesh(geometry, material);

        // Inner glow
        const coreGeo = new THREE.IcosahedronGeometry(1.8, 1);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x60a9ff,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending
        });
        this.core = new THREE.Mesh(coreGeo, coreMat);

        this.sphereGroup.add(this.sphere);
        this.sphereGroup.add(this.core);
        this.sphereGroup.visible = false;

        const sphInitCol = this.customColors?.["sphere"] || this.customColor;
        if (sphInitCol) {
            this.sphere.material.color.copy(sphInitCol);
            this.core.material.color.copy(sphInitCol);
        }
    }

    initLightspeed() {
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for(let i=0; i<particleCount*3; i++) {
            positions[i] = (Math.random() - 0.5) * 80;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x2dd4bf,
            size: 0.15,
            transparent: true,
            opacity: 0.8,
            map: this.createCircleTexture()
        });
        this.lightspeed = new THREE.Points(geometry, material);
        this.lightspeedGroup.add(this.lightspeed);
    }

    initParticles() {
        // Flow mode: streaming particles through space
        // OPTIMIZATION: Reduce particle count for stability
        const count = this.batterySaver ? 300 : 800;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        for (let i = 0; i < count; i++) {
            positions.push((Math.random() - 0.5) * 60); // x
            positions.push((Math.random() - 0.5) * 60); // y
            positions.push((Math.random() - 0.5) * 80); // z - deeper

            // Vary colors: cyan, blue, purple, white
            const t = Math.random();
            if (t < 0.3) {
                colors.push(0.4, 0.7, 1.0); // blue
            } else if (t < 0.6) {
                colors.push(0.3, 0.9, 0.95); // cyan
            } else if (t < 0.85) {
                colors.push(0.6, 0.4, 1.0); // purple
            } else {
                colors.push(0.9, 0.9, 1.0); // white
            }
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.4,
            vertexColors: true,
            map: this.createCircleTexture(),
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.particleGroup.add(this.particles);
        this.particleGroup.visible = false;

        const parColor = this.customColors?.["particles"] || this.customColor;
        if (parColor) {
            this.particles.material.color.copy(parColor);
        }
    }

    initBox() {
        // Rotating glowing wireframe cube with thick lines
        this.boxOuter = new THREE.Group();

        const outerGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(3, 3, 3));
        const outerMatCore = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
        const outerMatGlow = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });

        this.boxOuter.add(new THREE.LineSegments(outerGeo, outerMatCore));

        // Simulating thickness with slightly scaled outer layers
        for (let i = 1; i <= 3; i++) {
            const glowMesh = new THREE.LineSegments(outerGeo, outerMatGlow);
            glowMesh.scale.setScalar(1 + (i * 0.012));
            this.boxOuter.add(glowMesh);
        }

        const innerGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2));
        const innerMatCore = new THREE.LineBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const innerMatGlow = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });

        this.boxInner = new THREE.Group();
        this.boxInner.add(new THREE.LineSegments(innerGeo, innerMatCore));

        for (let i = 1; i <= 2; i++) {
            const glowMesh = new THREE.LineSegments(innerGeo, innerMatGlow);
            glowMesh.scale.setScalar(1 + (i * 0.015));
            this.boxInner.add(glowMesh);
        }

        // Edge glow
        const edgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.05, 3.05, 3.05));
        const edgesMat = new THREE.LineBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        this.boxEdges = new THREE.LineSegments(edgesGeo, edgesMat);

        this.boxGroup.add(this.boxOuter);
        this.boxGroup.add(this.boxInner);
        this.boxGroup.add(this.boxEdges);
        this.boxGroup.visible = false;

        const boxInitCol = this.customColors?.["box"] || this.customColor;
        if (boxInitCol) {
            this.boxOuter.children.forEach(c => c.material.color.copy(boxInitCol));
            this.boxInner.children.forEach(c => c.material.color.copy(boxInitCol));
            if (this.boxEdges && this.boxEdges.material) this.boxEdges.material.color.copy(boxInitCol);
        }
    }

    initDragon() {
        // High-Quality Chinese Dragon Visual using InstancedMesh for segmented body
        this.dragonDummy = new THREE.Object3D();
        this.dragonLength = 80; // Number of body segments

        // 1. Dragon Body Segments (InstancedMesh)
        // Icosahedron shape looks like crystalline or sharp scales 
        const segmentGeo = new THREE.IcosahedronGeometry(0.8, 1);
        const segmentMat = new THREE.MeshBasicMaterial({
            color: 0xef4444, // Crimson Red
            wireframe: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Inner golden glow for each segment
        const innerGeo = new THREE.IcosahedronGeometry(0.5, 1);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b, // Gold
            wireframe: false,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.dragonBodyInstanced = new THREE.InstancedMesh(segmentGeo, segmentMat, this.dragonLength);
        this.dragonGlowInstanced = new THREE.InstancedMesh(innerGeo, innerMat, this.dragonLength);

        // 2. Dragon Head
        const headGeo = new THREE.ConeGeometry(1.5, 3.5, 5);
        headGeo.rotateX(Math.PI / 2); // Point forward along Z
        const headMat = new THREE.MeshBasicMaterial({
            color: 0xfde047, // Bright Gold
            wireframe: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });
        this.dragonHead = new THREE.Mesh(headGeo, headMat);

        // 3. Orbiting Pearl (Dragon's Pearl)
        this.dragonPearlGroup = new THREE.Group();
        const pearlGeo = new THREE.SphereGeometry(1.0, 16, 16);
        const pearlMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: false, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
        const pearlGlowGeo = new THREE.SphereGeometry(1.3, 16, 16);
        const pearlGlowMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc, wireframe: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });

        this.dragonPearl = new THREE.Mesh(pearlGeo, pearlMat);
        this.dragonPearlHalo = new THREE.Mesh(pearlGlowGeo, pearlGlowMat);
        this.dragonPearlGroup.add(this.dragonPearl);
        this.dragonPearlGroup.add(this.dragonPearlHalo);

        this.dragonGroup.add(this.dragonBodyInstanced);
        this.dragonGroup.add(this.dragonGlowInstanced);
        this.dragonGroup.add(this.dragonHead);
        this.dragonGroup.add(this.dragonPearlGroup);

        this.dragonGroup.visible = false;

        const dragInitCol = this.customColors?.["dragon"] || this.customColor;
        if (dragInitCol) {
            this.updateDragonColor(dragInitCol);
        }
    }

    updateGalaxyColor(color) {
        // Sun = picked color
        if (this.galaxySunMesh) {
            this.galaxySunMesh.traverse(child => {
                if (child.isMesh && child.material) {
                    child.material.color.copy(color);
                }
            });
        }
        // Stars = complementary color (180° hue shift)
        // PERF FIX: Math.random() inside a 1500-iteration loop was called every render frame.
        // Now we only recompute star colors when the color actually changes (call-time, not per-frame).
        if (this.galaxyStars && this.galaxyStars.geometry) {
            const hsl = {};
            color.getHSL(hsl);
            const compHue = (hsl.h + 0.5) % 1.0;
            const colorAttr = this.galaxyStars.geometry.getAttribute('color');
            if (colorAttr) {
                const count = colorAttr.count;
                const tc = this._tempColor;
                // Build a stable per-star variation based on index (no Math.random per frame)
                for (let i = 0; i < count; i++) {
                    const t = i / count;
                    // Deterministic lightness/saturation derived from vertex index
                    const lBase = t < 0.2 ? 0.8 : (t < 0.5 ? 0.6 : 0.4);
                    const lVariation = ((i * 2654435761) & 0xFFFF) / 0xFFFF * 0.15; // fast hash
                    const l = lBase + (t >= 0.5 ? lVariation : 0);
                    const s = 0.6 + ((i * 1013904223) & 0xFFFF) / 0xFFFF * 0.3;
                    tc.setHSL(compHue, s, l);
                    colorAttr.setXYZ(i, tc.r, tc.g, tc.b);
                }
                colorAttr.needsUpdate = true;
            }
        }
    }

    updateDragonColor(color) {
        if (!this.dragonBodyInstanced) return;
        this.dragonBodyInstanced.material.color.copy(color);
        this.dragonHead.material.color.copy(color);

        // Inner glow = perfect complementary color (180° hue shift)
        const hsl = {};
        color.getHSL(hsl);
        const complementHue = (hsl.h + 0.5) % 1.0; // Rotate hue 180°
        const complementColor = new THREE.Color().setHSL(complementHue, hsl.s, hsl.l);
        this.dragonGlowInstanced.material.color.copy(complementColor);
    }

    initGalaxy() {
        // Swirling galaxy with star-shaped particles and central sun
        // OPTIMIZATION: Reduce galaxy particle count
        const count = this.batterySaver ? 500 : 1500;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 10; // tighter spiral arms
            const radius = 2.5 + (i / count) * 20 + Math.random() * 2;
            const armOffset = (i % 4) * (Math.PI * 2 / 4); // 4 spiral arms
            const scatter = Math.max(0.5, (i / count) * 4); // more scatter at edges
            const x = Math.cos(angle + armOffset) * radius + (Math.random() - 0.5) * scatter;
            const y = (Math.random() - 0.5) * 1.5; // thin disk
            const z = Math.sin(angle + armOffset) * radius + (Math.random() - 0.5) * scatter;
            positions.push(x, y, z);

            // Color: warm white in center → blue/purple at edges
            const t = i / count;
            if (t < 0.2) {
                // Inner: warm golden-white stars
                colors.push(1.0, 0.95, 0.7);
            } else if (t < 0.5) {
                // Mid: blue-white stars
                colors.push(0.7 + Math.random() * 0.3, 0.8, 1.0);
            } else {
                // Outer: blue/purple stars
                colors.push(0.4 + Math.random() * 0.2, 0.3 + Math.random() * 0.3, 0.8 + Math.random() * 0.2);
            }

            // Varying star sizes - some bright, most dim
            sizes.push(Math.random() < 0.05 ? 0.4 + Math.random() * 0.3 : 0.08 + Math.random() * 0.15);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const starTexture = this.createStarTexture();
        const material = new THREE.PointsMaterial({
            size: 0.25,
            vertexColors: true,
            map: starTexture,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });

        this.galaxyStars = new THREE.Points(geometry, material);
        this.galaxyGroup.add(this.galaxyStars);

        // Galaxy Sun — switchable between 'sun' (flat geometric) and 'sun2' (chunky tribal cones)
        this.galaxySunStyle = this.galaxySunStyle || 'sun'; // Default to clean geometric
        this.createGalaxySun(this.galaxySunStyle);

        this.galaxyGroup.visible = false;

        // Apply custom color if already set
        // This block is removed as color updates are now handled in the render loop
        // if (this.customColor) {
        //     this.updateGalaxyColor(this.customColor);
        // }
    }

    createGalaxySun(style) {
        // Remove and DISPOSE existing sun to prevent GPU geometry leak
        if (this.galaxySunMesh) {
            this.galaxyGroup.remove(this.galaxySunMesh);
            this.galaxySunMesh.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            });
            this.galaxySunMesh = null;
        }

        this.galaxySunMesh = new THREE.Group();

        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0x4aa6ff,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const sunGeometryGroup = new THREE.Group();

        if (style === 'sun2') {
            // ── SUN 2: Chunky cone-based tribal sun (original) ──
            const coneMaterial = sunMaterial.clone();
            coneMaterial.side = THREE.FrontSide; // Cones don't need double-sided

            const ringGeo = new THREE.TorusGeometry(1.5, 0.25, 16, 64);
            sunGeometryGroup.add(new THREE.Mesh(ringGeo, coneMaterial));

            const numSpikes = 8;
            const largeSpikeGeo = new THREE.ConeGeometry(0.4, 2.7, 4);
            largeSpikeGeo.translate(0, 2.7 / 2, 0);
            const smallSpikeGeo = new THREE.ConeGeometry(0.2, 1.7, 4);
            smallSpikeGeo.translate(0, 1.7 / 2, 0);

            for (let i = 0; i < numSpikes; i++) {
                const angleLarge = (i / numSpikes) * Math.PI * 2;
                const large = new THREE.Mesh(largeSpikeGeo, coneMaterial);
                large.rotation.z = -angleLarge;
                large.position.set(Math.sin(angleLarge) * 1.5, Math.cos(angleLarge) * 1.5, 0);
                sunGeometryGroup.add(large);

                const angleSmall = angleLarge + (Math.PI / numSpikes);
                const small = new THREE.Mesh(smallSpikeGeo, coneMaterial);
                small.rotation.z = -angleSmall;
                small.position.set(Math.sin(angleSmall) * 1.5, Math.cos(angleSmall) * 1.5, 0);
                sunGeometryGroup.add(small);
            }
        } else {
            // ── SUN 1: Clean flat geometric sun (SVG cursor style) ──
            // Thin ring (torus with small tube = outline look)
            const ringGeo = new THREE.TorusGeometry(1.5, 0.12, 8, 64);
            sunGeometryGroup.add(new THREE.Mesh(ringGeo, sunMaterial));

            const numSpikes = 8;

            // Large spikes: flat triangles (base 0.8, length 2.7)
            for (let i = 0; i < numSpikes; i++) {
                const angle = (i / numSpikes) * Math.PI * 2;

                // Large spike — flat triangle shape
                const largeShape = new THREE.Shape();
                largeShape.moveTo(-0.4, 0);   // left base
                largeShape.lineTo(0.4, 0);    // right base
                largeShape.lineTo(0, 2.7);    // tip
                largeShape.lineTo(-0.4, 0);
                const largeGeo = new THREE.ShapeGeometry(largeShape);
                const largeMesh = new THREE.Mesh(largeGeo, sunMaterial);
                largeMesh.rotation.z = -angle;
                largeMesh.position.set(Math.sin(angle) * 1.5, Math.cos(angle) * 1.5, 0);
                sunGeometryGroup.add(largeMesh);

                // Small spike — narrow flat triangle
                const angleSmall = angle + (Math.PI / numSpikes);
                const smallShape = new THREE.Shape();
                smallShape.moveTo(-0.2, 0);
                smallShape.lineTo(0.2, 0);
                smallShape.lineTo(0, 1.7);
                smallShape.lineTo(-0.2, 0);
                const smallGeo = new THREE.ShapeGeometry(smallShape);
                const smallMesh = new THREE.Mesh(smallGeo, sunMaterial);
                smallMesh.rotation.z = -angleSmall;
                smallMesh.position.set(Math.sin(angleSmall) * 1.5, Math.cos(angleSmall) * 1.5, 0);
                sunGeometryGroup.add(smallMesh);
            }
        }

        this.galaxySunMesh.add(sunGeometryGroup);
        this.galaxySunMesh.position.set(0, 0, 0.1);
        this.galaxyGroup.add(this.galaxySunMesh);
    }

    setGalaxySunStyle(style) {
        if (style !== 'sun' && style !== 'sun2') return;
        this.galaxySunStyle = style;
        // Recreate if galaxy is already initialized
        if (this.galaxyGroup && this.galaxyGroup.children.length > 0) {
            this.createGalaxySun(style);
        }
    }

    setGalaxySunRotation(axis, speed) {
        if (axis === 'x') this.sunRotationSpeedX = parseFloat(speed);
        if (axis === 'y') this.sunRotationSpeedY = parseFloat(speed);
        if (axis === 'z') this.sunRotationSpeedZ = parseFloat(speed);
    }

    createStarTexture() {
        // Cache: star texture never changes, reuse GPU upload
        if (this.textures.star) return this.textures.star;

        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const cx = size / 2;
        const cy = size / 2;

        // Draw a 4-point star shape with glow
        ctx.clearRect(0, 0, size, size);

        // Outer glow
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(0.1, 'rgba(255, 255, 240, 0.8)');
        gradient.addColorStop(0.25, 'rgba(255, 255, 200, 0.3)');
        gradient.addColorStop(0.5, 'rgba(200, 200, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Horizontal spike
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.moveTo(0, cy - 1);
        ctx.lineTo(cx, cy - 0.5);
        ctx.lineTo(size, cy - 1);
        ctx.lineTo(size, cy + 1);
        ctx.lineTo(cx, cy + 0.5);
        ctx.lineTo(0, cy + 1);
        ctx.closePath();
        ctx.fill();

        // Vertical spike
        ctx.beginPath();
        ctx.moveTo(cx - 1, 0);
        ctx.lineTo(cx - 0.5, cy);
        ctx.lineTo(cx - 1, size);
        ctx.lineTo(cx + 1, size);
        ctx.lineTo(cx + 0.5, cy);
        ctx.lineTo(cx + 1, 0);
        ctx.closePath();
        ctx.fill();

        // Bright center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
        ctx.fill();

        this.textures.star = new THREE.CanvasTexture(canvas);
        return this.textures.star;
    }

    initMandala() {
        // Sacred geometry: concentric rotating rings
        this.mandalaRings = [];
        const ringColors = [0x2563eb, 0xea580c, 0x3b82f6, 0xf97316, 0xbfdbfe];

        for (let i = 0; i < 5; i++) {
            const radius = 1.2 + i * 0.8;
            const segments = 6 + i * 6; // More segments for outer rings
            const ringGeo = new THREE.RingGeometry(radius - 0.05, radius + 0.05, segments);
            const ringMat = new THREE.MeshBasicMaterial({
                color: ringColors[i],
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.4 - i * 0.05,
                blending: THREE.AdditiveBlending
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.userData = { speed: (0.01 + i * 0.005) * (i % 2 === 0 ? 1 : -1), segments };
            this.mandalaRings.push(ring);
            this.mandalaGroup.add(ring);
        }

        // Center dot
        const dotGeo = new THREE.CircleGeometry(0.3, 32);
        const dotMat = new THREE.MeshBasicMaterial({
            color: 0xf97316,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        this.mandalaCenter = new THREE.Mesh(dotGeo, dotMat);
        this.mandalaGroup.add(this.mandalaCenter);
        this.mandalaGroup.visible = false;

        const manInitCol = this.customColors?.["mandala"];
        if (manInitCol) {
            this.mandalaRings.forEach(r => r.material.color.copy(manInitCol));
            this.mandalaCenter.material.color.copy(manInitCol);
        }
    }

    initCymatics() {
        console.log('[Visualizer] initCymatics CALLED - Initializing Kinematic Liquefaction Engine...');
        
        // CLEANUP: If a direct-scene mesh already exists, remove it first
        if (this.cymaticMesh) {
            console.log('[Visualizer] Removing stale cymaticMesh');
            this.scene.remove(this.cymaticMesh);
            if(this.cymaticMesh.geometry) this.cymaticMesh.geometry.dispose();
            if(this.cymaticMesh.material) this.cymaticMesh.material.dispose();
            this.cymaticMesh = null;
        }

        if (this.cymaticsGroup) {
            while(this.cymaticsGroup.children.length > 0) {
                const child = this.cymaticsGroup.children[0];
                this.cymaticsGroup.remove(child);
                if(child.geometry) child.geometry.dispose();
                if(child.material) {
                    if(child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            }
        }

        // High-definition geometry plane for the liquid surface
        const geometry = new THREE.PlaneGeometry(50, 50, 2, 2);
        this.cymaticMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uN: { value: 2.0 },
                uM: { value: 3.0 },
                uTime: { value: 0 },
                uIntensity: { value: 0.5 },
                uBeatFreq: { value: 10.0 },
                uColor: { value: this.customColor ? new THREE.Color(this.customColor) : new THREE.Color(0x60A9FF) },
                uSecondaryColor: { value: new THREE.Color(0xB478FF) }, // Purple accent from beta UI
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform float uN, uM, uBeatFreq, uTime, uIntensity;
                uniform vec3 uColor, uSecondaryColor;
                uniform vec2 uResolution;

                // High-performance hash for deterministic randomness
                float hash(vec2 p) {
                    p = fract(p * vec2(123.34, 456.21));
                    p += dot(p, p + 45.32);
                    return fract(p.x * p.y);
                }

                // Smooth Noise for domain warping
                float noise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    float a = hash(i);
                    float b = hash(i + vec2(1.0, 0.0));
                    float c = hash(i + vec2(0.0, 1.0));
                    float d = hash(i + vec2(1.0, 1.0));
                    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                }

                // Chladni Resonance Pattern (Traditional Physics)
                float chladni(vec2 p, float n, float m) {
                    float pi = 3.1415926535;
                    return cos(n * pi * p.x) * cos(m * pi * p.y) - 
                           cos(m * pi * p.x) * cos(n * pi * p.y);
                }

                // KINEMATIC LIQUEFACTION: Domain Warped Fractal Resonance
                float liquefaction(vec2 uv, float n, float m) {
                    float t = uTime * 0.15;
                    float beat = uBeatFreq * 0.005;
                    vec2 p = uv;

                    // Octave 1: Fluid Distortion
                    float n1 = noise(p * 2.0 + t);
                    p += vec2(cos(n1 * 6.28 + t), sin(n1 * 6.28 + t)) * (0.05 + beat);

                    // Octave 2: Resonant Topology
                    float val = chladni(p, n, m);
                    
                    // Domain Warping using the pattern itself
                    p += vec2(val) * 0.08 * sin(t * 2.0);
                    float val2 = chladni(p * 1.5, n * 1.3, m * 1.3);
                    
                    // Convergence of patterns
                    float result = mix(abs(val), abs(val2), 0.4 + 0.2 * sin(t));
                    
                    // Add micro-vibrations based on intensity
                    result += noise(uv * 100.0) * 0.02 * uIntensity;
                    
                    return result;
                }

                void main() {
                    vec2 uv = (vUv - 0.5) * 2.0;
                    float aspect = uResolution.x / uResolution.y;
                    uv.x *= aspect;

                    // Liquefaction Field
                    float f = liquefaction(uv * 1.5, uN, uM);
                    
                    // Liquid Geometry Isolation
                    float threshold = 0.02 + uIntensity * 0.15;
                    float edge = smoothstep(threshold + 0.1, threshold - 0.05, f);
                    
                    // Liquid Surface (Glossy highlights)
                    float spec = pow(1.0 - f, 12.0) * (0.5 + 0.5 * uIntensity);
                    
                    // Color Synthesis
                    vec3 baseCol = mix(uColor, uSecondaryColor, 0.5 + 0.5 * sin(uTime * 0.3 + f * 5.0));
                    vec3 liquidCol = baseCol * (0.8 + 0.4 * f);
                    
                    // Ambient Glow
                    vec3 glow = baseCol * smoothstep(0.4, 0.0, f) * 0.4;
                    
                    // Final Composition
                    vec3 col = mix(vec3(0.005, 0.005, 0.015), liquidCol, edge);
                    col += spec * vec3(1.0, 1.0, 0.9); // Glossy coat
                    col += glow;
                    
                    // Vignette to pull focus to the center pattern
                    float vig = smoothstep(1.5, 0.5, length(uv));
                    col *= vig;

                    gl_FragColor = vec4(col, 1.0);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.cymaticMesh = new THREE.Mesh(geometry, this.cymaticMaterial);
        this.cymaticMesh.position.z = -5; // Foreground depth
        this.scene.add(this.cymaticMesh);

        // SACRED GEOMETRY AURA (Backplane)
        const auraGeo = new THREE.PlaneGeometry(100, 100);
        const auraMat = new THREE.MeshBasicMaterial({
            color: this.cymaticMaterial.uniforms.uColor.value,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.cymaticAura = new THREE.Mesh(auraGeo, auraMat);
        this.cymaticAura.position.z = -15;
        this.cymaticsGroup.add(this.cymaticAura);

        // Initial pattern
        if (this.cymaticsHistory.length === 0) {
            this.nextCymatic();
        }
    }

    nextCymatic() {
        const patterns = [
            { name: "Fundamental Zenith", n: 1, m: 1, energy: 0.2 },
            { name: "Dual Horizon", n: 1, m: 2, energy: 0.3 },
            { name: "Triple Axis", n: 1, m: 3, energy: 0.4 },
            { name: "Quad Core", n: 1, m: 4, energy: 0.5 },
            { name: "Penta Wave", n: 1, m: 5, energy: 0.6 },
            { name: "Square Harmony", n: 2, m: 2, energy: 0.3 },
            { name: "Lotus Flow", n: 2, m: 3, energy: 0.4 },
            { name: "Cresent Node", n: 2, m: 4, energy: 0.5 },
            { name: "Orchid Ring", n: 2, m: 5, energy: 0.6 },
            { name: "Cross Pulse", n: 3, m: 3, energy: 0.5 },
            { name: "Nodal Ribbon", n: 3, m: 1, energy: 0.4 },
            { name: "Radial Seed", n: 3, m: 5, energy: 0.7 },
            { name: "Diamond Lattice", n: 4, m: 4, energy: 0.6 },
            { name: "Solar Grate", n: 4, m: 2, energy: 0.5 },
            { name: "Cellular Grid", n: 5, m: 5, energy: 0.7 },
            { name: "Star Resonance", n: 6, m: 2, energy: 0.6 },
            { name: "Hexa Flux", n: 6, m: 6, energy: 0.8 },
            { name: "Solar Mandala", n: 7, m: 3, energy: 0.7 },
            { name: "Graphene Matrix", n: 8, m: 4, energy: 0.8 },
            { name: "Hyper Lobe", n: 8, m: 8, energy: 0.9 },
            { name: "Atomic Shell", n: 9, m: 2, energy: 0.8 },
            { name: "Omega Sphere", n: 9, m: 9, energy: 1.0 },
            { name: "Fibonacci Spiral", n: 1, m: 8, energy: 0.8 },
            { name: "Fractal Lace", n: 10, m: 4, energy: 0.9 },
            { name: "Cosmic Gear", n: 11, m: 3, energy: 0.9 },
            { name: "Interstellar Mesh", n: 12, m: 12, energy: 1.0 },
            { name: "Quantum Foam", n: 5, m: 13, energy: 1.0 },
            { name: "Singularity", n: 20, m: 2, energy: 1.0 },
            // NEW PATTERNS (Boil the Ocean Expansion)
            { name: "Prime Prime", n: 13, m: 17, energy: 1.1 },
            { name: "Metatron's Grid", n: 6, m: 12, energy: 0.9 },
            { name: "Flower of Life", n: 19, m: 19, energy: 1.2 },
            { name: "Golden Ratio Pulsar", n: 1, m: 1.618, energy: 0.7 },
            { name: "Vesica Piscis", n: 2, m: 1, energy: 0.4 },
            { name: "Tesseract Slice", n: 4, m: 8, energy: 1.0 },
            { name: "Hyperboria", n: 7, m: 14, energy: 1.1 },
            { name: "Etheric Loom", n: 21, m: 3, energy: 1.3 },
            { name: "DNA Twist", n: 1, m: 10, energy: 0.8 },
            { name: "Aural Ripple", n: 13, m: 2, energy: 0.9 },
            { name: "Event Horizon", n: 40, m: 40, energy: 1.5 },
            { name: "Supernova Nucleus", n: 33, m: 3, energy: 1.4 },
            { name: "Ouroboros", n: 11, m: 11, energy: 1.2 },
            { name: "Zenith Pulse", n: 9, m: 1, energy: 0.7 },
            { name: "Nautilus Shell", n: 5, m: 8, energy: 0.8 }
        ];

        // Move history pointer
        if (this.cymaticsHistoryIndex < this.cymaticsHistory.length - 1) {
            this.cymaticsHistoryIndex++;
            this.applyCymatic(this.cymaticsHistory[this.cymaticsHistoryIndex]);
        } else {
            // Generate new
            const current = this.currentCymaticData;
            let next;
            do {
                next = patterns[Math.floor(Math.random() * patterns.length)];
            } while (next && (next.n === current.n && next.m === current.m));

            this.cymaticsHistory.push(next);
            if (this.cymaticsHistory.length > 20) this.cymaticsHistory.shift();
            this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
            this.applyCymatic(next);
        }
        this.lastCymaticRotation = performance.now();
    }

    prevCymatic() {
        if (this.cymaticsHistoryIndex > 0) {
            this.cymaticsHistoryIndex--;
            this.applyCymatic(this.cymaticsHistory[this.cymaticsHistoryIndex]);
            this.lastCymaticRotation = performance.now();
        }
    }

    applyCymatic(data) {
        if (!data) return;
        this.currentCymaticData = data;
        if (this.cymaticMaterial) {
            this.cymaticMaterial.uniforms.uN.value = data.n;
            this.cymaticMaterial.uniforms.uM.value = data.m;
        }
        
        // Update UI Label
        const label = document.getElementById('cymaticPatternLabel');
        if (label && data.name) {
            label.textContent = data.name;
            // Immediate feedback animation (glow surge)
            label.style.textShadow = '0 0 15px rgba(180, 120, 255, 1)';
            setTimeout(() => {
                label.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.3)';
            }, 300);
        }
    }

    setCymaticTimer(seconds) {
        this.cymaticsTimer = seconds;
        const label = document.getElementById('cymaticTimerLabel');
        if (label) {
            if (seconds > 300) label.textContent = "INFINITE";
            else if (seconds === 0) label.textContent = "OFF";
            else label.textContent = seconds + "s";
        }
    }

    initLava() {
        // Redesigned: Cleaner, smoother, fewer but larger blobs
        this.lavaBlobs = [];
        // blobCount increased to ensure dense "pile up" look
        const blobCount = 16;

        // More consistent sizes, Scaled down ~40% for better fit
        const sizeCategories = [
            { count: 5, minSize: 0.5, maxSize: 0.8 },   // Small
            { count: 7, minSize: 0.9, maxSize: 1.2 },   // Medium
            { count: 4, minSize: 1.3, maxSize: 1.6 }    // Large
        ];

        let blobIndex = 0;
        sizeCategories.forEach(category => {
            for (let i = 0; i < category.count; i++) {
                const size = category.minSize + Math.random() * (category.maxSize - category.minSize);

                const geometry = new THREE.SphereGeometry(size, 24, 24);
                const material = new THREE.MeshBasicMaterial({
                    color: 0x60a9ff,
                    transparent: true,
                    opacity: 0.6,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                });

                const blob = new THREE.Mesh(geometry, material);

                // Initialize randomly within the cycle
                // States: 'heating', 'rising', 'cooling', 'falling'
                const states = ['heating', 'rising', 'cooling', 'falling'];
                const startState = states[Math.floor(Math.random() * states.length)];

                // BOUNDS: Expanded to +/- 15 to cover larger vertical screens
                const floatMin = -15 + (Math.random() * 2); // Bottom pile
                const floatMax = 15 + (Math.random() * 2);  // Top pile

                let startY = 0;
                let startTemp = 0.5;

                if (startState === 'heating') {
                    startY = floatMin;
                    startTemp = Math.random() * 0.5;
                } else if (startState === 'rising') {
                    startY = floatMin + Math.random() * (floatMax - floatMin);
                    startTemp = 0.8 + Math.random() * 0.2;
                } else if (startState === 'cooling') {
                    startY = floatMax;
                    startTemp = 1.0 - (Math.random() * 0.3);
                } else if (startState === 'falling') {
                    startY = floatMax - Math.random() * (floatMax - floatMin);
                    startTemp = 0.2 + Math.random() * 0.3;
                }

                blob.position.set(
                    (Math.random() - 0.5) * 8, // Keep central
                    startY,
                    (Math.random() - 0.5) * 4
                );

                blob.userData = {
                    baseSize: size,
                    state: startState,
                    temperature: startTemp, // 0.0 (Cold) to 1.0 (Hot)

                    // Config
                    floatMin: floatMin,
                    floatMax: floatMax,

                    // Speeds - UPDATED for 2-7s idle duration (0.14 to 0.5 units per second)
                    heatRate: 0.14 + Math.random() * 0.36,
                    coolRate: 0.14 + Math.random() * 0.36,

                    riseSpeed: (0.02 + Math.random() * 0.03) / (size * 0.5),
                    fallSpeed: (0.03 + Math.random() * 0.03) / (size * 0.5),

                    // Wobble
                    driftPhase: Math.random() * Math.PI * 2,
                    driftSpeed: 0.01 + Math.random() * 0.02,
                    wobblePhase: Math.random() * Math.PI * 2,
                    wobbleSpeed: 0.1
                };

                this.lavaBlobs.push(blob);
                this.lavaGroup.add(blob);
                blobIndex++;
            }
        });

        // Soft uniform glow
        const glowGeometry = new THREE.PlaneGeometry(30, 40);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x60a9ff,
            transparent: true,
            opacity: 0.05,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        // this.lavaGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        // this.lavaGlow.position.z = -5;
        // this.lavaGroup.add(this.lavaGlow);

        this.lavaGroup.visible = false;
        console.log('[Visualizer] Physics-Enabled Lava Lamp v7 initialized');
    }

    initFireplace() {
        // Hyper-Realistic Luxurious Fireplace - REDESIGNED
        // A true full-screen atmospheric backdrop without firewood

        // 1. Fire Shader (Volumetric look) - FULL SCREEN ATMOSPHERIC REDESIGN
        const fireWidth = 100; // Giant backdrop
        const fireHeight = 80;
        const fireGeo = new THREE.PlaneGeometry(fireWidth, fireHeight);

        this.fireMaterial = this.createFireShader();
        this.fireMesh = new THREE.Mesh(fireGeo, this.fireMaterial);
        this.fireMesh.position.set(0, 0, -15); // Slightly forward to clear rainforest foliage
        this.fireMesh.renderOrder = 10;

        // 2. Atmosphere (No Firewood)
        // Firewood removed as per user request.
        this.fireplaceGroup.add(this.fireMesh);

        // 3. Dynamic Lighting (Atmospheric Glow)
        this.fireLight = new THREE.PointLight(0xff6600, 5, 200);
        this.fireLight.position.set(0, 0, 30);
        this.fireplaceGroup.add(this.fireLight);

        // 4. Embers (Shader-based particles)
        // Re-use simple particles for embers rising
        const emberCount = 650; // Denser atmospheric embers
        const emberGeo = new THREE.BufferGeometry();
        const emberPos = [];
        for (let i = 0; i < emberCount; i++) {
            // Centering Z around -15 to mix with fireMesh (z=-15)
            emberPos.push((Math.random() - 0.5) * 100, -20 + Math.random() * 40, -15 + (Math.random() - 0.5) * 20);
        }
        emberGeo.setAttribute('position', new THREE.Float32BufferAttribute(emberPos, 3));
        this.emberMat = new THREE.PointsMaterial({
            color: 0xffcc00,
            size: 0.15,
            map: this.createCircleTexture(), // Ensure circular embers
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false // Allow embers to blend smoothly without sharp cutoffs
        });
        this.embers = new THREE.Points(emberGeo, this.emberMat);
        this.fireplaceGroup.add(this.embers);
        // Initialize velocities array
        this.emberVelocities = new Float32Array(emberCount);
        for (let i = 0; i < emberCount; i++) {
            this.emberVelocities[i] = 0.02 + Math.random() * 0.05;
        }

        this.fireplaceGroup.position.set(0, 0, 0); // Reset for backdrop
        this.fireplaceGroup.visible = false;
        console.log('[Visualizer] Real Fireplace initialized');
    }

    createFireShader() {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(0xff4400) }, // Base fire
                uSpeed: { value: 1.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uColor;
                varying vec2 vUv;

                // Simplex Noise 2D (Standard GLSL noise)
                vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
                float snoise(vec2 v){
                    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                    vec2 i  = floor(v + dot(v, C.yy) );
                    vec2 x0 = v - i + dot(i, C.xx);
                    vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    i = mod(i, 289.0);
                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m*m ;
                    m = m*m ;
                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5;
                    vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox;
                    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                    vec3 g;
                    g.x  = a0.x  * x0.x  + h.x  * x0.y;
                    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }

                void main() {
                    vec2 uv = vUv;
                    
                    // ORGANIC FLOW NOISE - INCREASED DENSITY
                    float n1 = snoise(uv * 2.5 - vec2(0, uTime * 1.5));
                    float n2 = snoise(uv * 5.5 - vec2(0, uTime * 2.8));
                    
                    // Atmospheric Heat (Lower focus)
                    float shape = 1.2 - uv.y; 
                    shape = pow(shape, 1.4); 
                    
                    float fire = n1 * 0.7 + n2 * 0.5;
                    
                    // Denser thresholds
                    float alpha = smoothstep(-0.2, 0.6, fire + shape * 0.7);
                    float core = smoothstep(0.0, 0.8, fire + shape * 0.5);
                    
                    // Brighter, more intense colors
                    vec3 red = vec3(1.0, 0.1, 0.0);
                    vec3 yellow = vec3(1.0, 0.9, 0.0);
                    vec3 white = vec3(1.0, 1.0, 0.9);
                    
                    vec3 finalColor = mix(red, yellow, core);
                    finalColor = mix(finalColor, white, core * 0.4);
                    
                    // Edge fade removed - Fill edges edge-to-edge
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
    }

    initRainforest() {
        // Rainforest: Falling raindrops
        const dropCount = 800;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const velocities = [];

        for (let i = 0; i < dropCount; i++) {
            positions.push((Math.random() - 0.5) * 80);
            positions.push(-20 + Math.random() * 40);
            positions.push((Math.random() - 0.5) * 40);

            velocities.push(0.08 + Math.random() * 0.12);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        this.rainVelocities = new Float32Array(velocities);

        const material = new THREE.PointsMaterial({
            color: 0x88ccff,
            size: 0.08,
            transparent: true,
            opacity: 0.6,
            depthWrite: false
        });

        this.raindrops = new THREE.Points(geometry, material);
        this.rainforestGroup.add(this.raindrops);
        this.rainforestGroup.visible = false;

        const rainCol = this.customColors?.["rain"] || this.customColor;
        if (rainCol) {
            this.raindrops.material.color.copy(rainCol);
        }
        console.log('[Visualizer] Rainforest initialized');
    }

    initZenGarden() {
        const petalCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const drifts = [];

        for (let i = 0; i < petalCount; i++) {
            positions.push((Math.random() - 0.5) * 80);
            positions.push(-20 + Math.random() * 40);
            positions.push((Math.random() - 0.5) * 40);

            drifts.push(Math.random() * Math.PI * 2);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        this.petalDrifts = new Float32Array(drifts);

        const material = new THREE.PointsMaterial({
            color: 0xffb3d9,
            size: 0.2,
            map: this.createCircleTexture(),
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.petals = new THREE.Points(geometry, material);
        this.zenGardenGroup.add(this.petals);
        this.zenGardenGroup.visible = false;

        const sakuraCol = this.customColors?.["sakura"] || this.customColor;
        if (sakuraCol) {
            this.petals.material.color.copy(sakuraCol);
        }
        console.log('[Visualizer] Zen Garden initialized');
    }

    initOcean() {
        // Ocean: High-density wireframe grid for "Infinite" digital waves
        const waveGeo = new THREE.PlaneGeometry(300, 100, 128, 64);
        const waveMat = new THREE.MeshBasicMaterial({
            color: 0x00aaff,
            wireframe: true,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        this.oceanWave = new THREE.Mesh(waveGeo, waveMat);
        this.oceanWave.rotation.x = -Math.PI / 3;
        this.oceanWave.position.y = -2;
        this.oceanGroup.add(this.oceanWave);

        // Minimalist foam particles
        const foamCount = 300;
        const foamGeo = new THREE.BufferGeometry();
        const foamPositions = [];
        for (let i = 0; i < foamCount; i++) {
            foamPositions.push((Math.random() - 0.5) * 50);
            foamPositions.push(-2.5 + Math.random() * 0.5);
            foamPositions.push((Math.random() - 0.5) * 40);
        }
        foamGeo.setAttribute('position', new THREE.Float32BufferAttribute(foamPositions, 3));
        const foamMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.15,
            map: this.createCircleTexture(),
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.oceanFoam = new THREE.Points(foamGeo, foamMat);
        this.oceanGroup.add(this.oceanFoam);

        this.oceanGroup.visible = false;

        const oceanCol = this.customColors?.["ocean"] || this.customColor;
        if (oceanCol) {
            if (this.oceanWave) this.oceanWave.material.color.copy(oceanCol);
            if (this.oceanFoam) this.oceanFoam.material.color.copy(oceanCol);
        }
        console.log('[Visualizer] Original Ocean (Wireframe) restored');
    }




    createCyberTexture(config = this.matrixConfig) {
        const size = 1024; // Doubled for HD crispness
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Background - Transparent
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, size, size);

        const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
        const charPool = "MINDWAVE";
        const special = ":・.\"=*+<>";

        ctx.shadowBlur = 12; // Adjusted for 1024
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';

        ctx.font = 'bold 80px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const cols = 8;
        const rows = 8;
        const cellW = size / cols;
        const cellH = size / rows;

        let textToSpell = "🪷MINDWAVE";
        const logicMode = config.logicMode;
        const customText = config.customText;

        if ((logicMode === 'custom' || logicMode === 'txt')) {
            textToSpell = "🪷" + (customText && customText.length > 0 ? customText : "WELCOME TO MINDWAVE");
        } else if (logicMode === 'random' || logicMode === 'rnd' || logicMode === 'matrix' || logicMode === 'int' || logicMode === 'interstellar') {
            textToSpell = "";
        }
        
        // 3D Matrix Style: Mixture of Logo/Text and Random Rain
        const manualSequence = (logicMode === 'matrix' || logicMode === 'int' || logicMode === 'interstellar') ? [] : [
            "LOGO",
            ...([...textToSpell])
        ];
        const specialCount = manualSequence.length;

        for (let i = 0; i < 64; i++) {
            const col = i % 8;
            const row = Math.floor(i / 8);

            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fillRect(col * cellW, row * cellH, cellW, cellH);

            ctx.save();
            ctx.translate(col * cellW + cellW / 2, row * cellH + cellH / 2);

            let char = '';
            let isLogo = false;

            // In Cyber (3D) mode, we want a 'rain' effect.
            // We use the first few indices for our special word/logo,
            // and the rest for random Cyber characters.
            if (i < specialCount) {
                const item = manualSequence[i];
                if (item === "LOGO") {
                    isLogo = true;
                } else {
                    char = item;
                }
            } else {
                // Random Cyber Characters (Katakana mix)
                const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
                const mix = katakana + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                char = mix.charAt(Math.floor(Math.random() * mix.length));

                // Add some flipped characters for authenticity
                if (Math.random() > 0.5) {
                    ctx.save();
                    ctx.scale(-1, 1);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 80px monospace';
                    ctx.fillText(char, 0, 0);
                    ctx.restore();
                    char = '';
                }
            }

            if (char || isLogo) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 80px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowBlur = 16;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';

                if (isLogo) {
                    if (this.logoImage) {
                        // Base size 80 (Reduced 20% to avoid overflow and match scaling)
                        const charBaseSize = 80;
                        const logoRenderSize = 100; // Maintaining 25% larger ratio relative to 80px baseline

                        const offset = -logoRenderSize / 2;

                        // Create a temporary canvas to tint the logo
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = logoRenderSize;
                        tempCanvas.height = logoRenderSize;
                        const tCtx = tempCanvas.getContext('2d');

                        // Draw logo with high quality scaling
                        tCtx.imageSmoothingEnabled = true;
                        tCtx.imageSmoothingQuality = 'high';
                        tCtx.drawImage(this.logoImage, 0, 0, logoRenderSize, logoRenderSize);

                        // Preserving internal detail (M/W) by using a high-contrast brightness-to-white conversion
                        const imageData = tCtx.getImageData(0, 0, logoRenderSize, logoRenderSize);
                        const data = imageData.data;
                        for (let j = 0; j < data.length; j += 4) {
                            const avg = (data[j] + data[j + 1] + data[j + 2]) / 3;
                            // Push everything to bright white while keeping relative contrast for M/W (the darker shapes)
                            const bright = 180 + (avg / 255) * 75;
                            data[j] = bright;
                            data[j + 1] = bright;
                            data[j + 2] = bright;
                            // Alpha remains unchanged from source
                        }
                        tCtx.putImageData(imageData, 0, 0);

                        // Final crispness pass: high-quality draw onto main canvas
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';

                        ctx.drawImage(tempCanvas, offset, offset, logoRenderSize, logoRenderSize);
                    } else {
                        if (!this.logoLoading && !this.logoFailed) {
                            this.logoLoading = true;
                            const loader = new THREE.ImageLoader();
                            loader.load('./mindwave-logo-icon.png', (image) => {
                                this.logoImage = image;
                                this.logoLoading = false;
                                if (this.cyberMaterial) {
                                    const newTexture = this.createCyberTexture();
                                    this.cyberMaterial.uniforms.uTexture.value = newTexture;
                                }
                            }, undefined, (err) => {
                                this.logoFailed = true;
                                this.logoLoading = false;
                            });
                        }
                        ctx.font = 'bold 80px monospace'; // Adjusted size
                        ctx.fillStyle = '#2dd4bf'; // teal-400
                        ctx.fillText('🪷', 0, 0); // Replaced weird giant H with Lotus
                    }
                } else {
                    ctx.fillText(char, 0, 0);
                }
            }
            ctx.restore();
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        return texture;
    }

    createCyberShader(texture, config = this.matrixConfig) {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: texture },
                uColor: { value: new THREE.Color(config.color || 0x00FF41) },
                uHeadColor: { value: new THREE.Color(0xF0FFF0) },
                uTime: { value: 0 },
                uSpeed: { value: config.speed || 1.0 },
                uTailLength: { value: config.length || 1.0 },
                uRainbow: { value: config.rainbow ? 1.0 : 0.0 },
                uBrightness: { value: this.brightnessMultiplier || 1.0 }
            },
            vertexShader: `
                attribute float aCharIndex;
                attribute float aSpawnTime;
                attribute float aSpeed;
                uniform float uTime;
                uniform float uSpeed;
                uniform float uTailLength;
                varying float vBrightness;
                varying float vCharIndex;
                varying float vAlpha;
                varying vec3 vPos;
                
                void main() {
                    vCharIndex = aCharIndex;
                    vPos = position;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    // FIXED: uTime already includes multipliers, avoid squaring speed in shader
                    float columnHeadY = 80.0 - mod(uTime * 5.0 * aSpeed + aSpawnTime, 160.0);
                    // FIXED: The trail is ABOVE the head (higher Y value). So position.y > columnHeadY.
                    // To get a positive distance for the trail, we need position.y - columnHeadY.
                    float dist = position.y - columnHeadY;
                    float trailLen = 160.0 * uTailLength;
                    if (dist >= 0.0 && dist < trailLen) {
                         vAlpha = 1.0 - (dist / trailLen);
                         vBrightness = 1.0 - (dist / trailLen);
                    } else {
                         vAlpha = 0.0;
                         vBrightness = 0.0;
                    }
                    gl_Position = projectionMatrix * mvPosition;
                    gl_Position.z -= 0.01; // Avoid flickering
                    gl_PointSize = 384.0 / -mvPosition.z; // Reduced from 480.0 to match 20% shrink
                }

            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform vec3 uColor;
                uniform vec3 uHeadColor;
                uniform float uRainbow;
                uniform float uBrightness;
                uniform float uTime;
                varying float vAlpha;
                varying float vCharIndex;
                varying float vBrightness;
                varying vec3 vPos;
                float hue2rgb(float p, float q, float t) {
                    if(t < 0.0) t += 1.0;
                    if(t > 1.0) t -= 1.0;
                    if(t < 1.0/6.0) return p + (q - p) * 6.0 * t;
                    if(t < 1.0/2.0) return q;
                    if(t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
                    return p;
                }
                vec3 hslToRgb(float h, float s, float l) {
                    float r, g, b;
                    if(s == 0.0) { r = g = b = l; } else {
                        float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
                        float p = 2.0 * l - q;
                        r = hue2rgb(p, q, h + 1.0/3.0); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1.0/3.0);
                    }
                    return vec3(r, g, b);
                }
                void main() {
                    float rawIndex = floor(vCharIndex + 0.5);
                    if (rawIndex > 8.5) {
                        float timeStep = floor(uTime * 0.5); 
                        rawIndex = 9.0 + mod((rawIndex - 9.0) + timeStep, 55.0);
                    }
                    float index = floor(rawIndex + 0.5);
                    float col = mod(index, 8.0);
                    float row = 7.0 - floor(index / 8.0);
                    vec2 uv = gl_PointCoord;
                    uv.y = 1.0 - uv.y;
                    vec2 atlasUV = (uv + vec2(col, row)) / 8.0;
                    vec4 texColor = texture2D(uTexture, atlasUV);
                    if (texColor.a < 0.1) discard;
                    if (vAlpha < 0.05) discard;
                    vec3 finalColor;
                    if (uRainbow > 0.5) {
                        float hue = fract(vPos.x * 0.05 + uTime * 0.1);
                        finalColor = hslToRgb(hue, 1.0, 0.6);
                        if (vBrightness >= 0.95) finalColor = mix(finalColor, vec3(1.0), 0.5);
                    } else {
                        finalColor = (vBrightness >= 0.95) ? uHeadColor : uColor;
                    }
                    // Apply global brightness multiplier
                    gl_FragColor = vec4(finalColor * uBrightness, vAlpha * texColor.a * uBrightness);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        // Ensure Cyber renders behind other visuals by rendering it first
        material.sceneRenderOrder = -1; // Custom property handled by mesh later
        return material;
    }

    initEnvironment() {
        // Essential lighting for 3D visibility, keeping background transparent as per original design
        this.sunLight = new THREE.DirectionalLight(0xfff5e1, 1.2);
        this.sunLight.position.set(50, 100, 50);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(this.ambientLight);
    }


    ensureInitialized(mode) {
        // Profiling to find the 5s bottleneck
        const tLabel = `[VizInit] ${mode}`;
        console.time(tLabel);
        if (mode === 'sphere' && this.sphereGroup && this.sphereGroup.children.length === 0) this.initSphere();
        if (mode === 'particles' && this.particleGroup && this.particleGroup.children.length === 0) this.initParticles();
        if (mode === 'lightspeed' && this.lightspeedGroup && this.lightspeedGroup.children.length === 0) this.initLightspeed();
        if (mode === 'waves' && this.wavesGroup && this.wavesGroup.children.length === 0) this.initWaves();
        if (mode === 'lava' && this.lavaGroup && this.lavaGroup.children.length === 0) this.initLava();
        if (mode === 'fireplace' && this.fireplaceGroup && this.fireplaceGroup.children.length === 0) this.initFireplace();
        if (mode === 'rainforest' && this.rainforestGroup && this.rainforestGroup.children.length === 0) this.initRainforest();
        if (mode === 'zengarden' && this.zenGardenGroup && this.zenGardenGroup.children.length === 0) this.initZenGarden();
        if (mode === 'ocean' && this.oceanGroup && this.oceanGroup.children.length === 0) this.initOcean();
        if ((mode === 'cyber' || mode === 'matrix') && this.cyberGroup && this.cyberGroup.children.length === 0) this.initCyber();
        if (mode === 'box' && this.boxGroup && this.boxGroup.children.length === 0) this.initBox();
        if (mode === 'dragon' && this.dragonGroup && this.dragonGroup.children.length === 0) this.initDragon();
        if (mode === 'galaxy' && this.galaxyGroup && this.galaxyGroup.children.length === 0) this.initGalaxy();
        if (mode === 'mandala' && this.mandalaGroup && this.mandalaGroup.children.length === 0) this.initMandala();
        if (mode === 'cymatics' && this.cymaticsGroup && this.cymaticsGroup.children.length === 0) this.initCymatics();
        console.timeEnd(tLabel);
    }

    initCyber() {
        while (this.cyberGroup.children.length > 0) {
            const child = this.cyberGroup.children[0];
            this.cyberGroup.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
            if (child.children) {
                child.traverse((c) => {
                    if (c.geometry) c.geometry.dispose();
                    if (c.material) c.material.dispose();
                });
            }
        }
        this.cyberRotationGroup = null;
        this.cyberPoints = null;

        const depthLayer = 4;
        const colCount = 80;
        const rowCount = 120;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const charIndices = [];
        const spawnTimes = [];
        const speeds = [];

        const viewWidth = 240;
        const viewHeight = 160;
        const colWidth = viewWidth / colCount;
        const rowHeight = viewHeight / rowCount;

        for (let c = 0; c < colCount; c++) {
            const x = (c * colWidth) - (viewWidth / 2) + ((Math.random() * 0.8) * colWidth);
            const z = -(depthLayer * 5) - (Math.random() * 2);
            const speed = 0.5 + Math.random() * 0.5;

            const config = this.matrixConfig;
            const isSpecial = (config.logicMode === 'mindwave' || config.logicMode === 'mw' || config.logicMode === 'custom' || config.logicMode === 'txt');
            const isCyber = (config.logicMode === 'matrix' || config.logicMode === 'int' || config.logicMode === 'interstellar');
            const specialText = ((config.logicMode === 'custom' || config.logicMode === 'txt') && config.customText) ? "🪷" + config.customText : "MINDWAVE";
            const specialLen = specialText.length;
            // In matrix mode, streams are less uniform
            const streamOffset = isCyber ? Math.random() * 100 : 0;
            const matrixSpeedMult = isCyber ? (0.5 + Math.random() * 1.5) : 1.0;
            const streamSpawnTime = Math.random() * 100.0 + streamOffset;

            for (let r = 0; r < rowCount; r++) {
                const y = (viewHeight / 2) - (r * rowHeight);
                positions.push(x, y, z);

                if (isSpecial) {
                    // Repeat the text characters throughout the ENTIRE stream
                    // Indices 0 = LOGO, 1-specialLen = text characters
                    // This ensures MW/TXT text is visible in ALL chars of the falling stream
                    // (shader keeps indices <= 8 static, so text won't animate away)
                    charIndices.push(r % (specialLen + 1));
                } else if (isCyber) {
                    // Cyber uses full character map randomly
                    charIndices.push(Math.floor(Math.random() * 64));
                } else {
                    // Legacy random mode
                    charIndices.push(9 + Math.floor(Math.random() * 55));
                }
                spawnTimes.push(streamSpawnTime);
                speeds.push(speed * matrixSpeedMult);
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('aCharIndex', new THREE.Float32BufferAttribute(charIndices, 1));
        geometry.setAttribute('aSpawnTime', new THREE.Float32BufferAttribute(spawnTimes, 1));
        geometry.setAttribute('aSpeed', new THREE.Float32BufferAttribute(speeds, 1));

        this.cyberGeometry = geometry;
        const texture = this.createCyberTexture(this.matrixConfig);
        this.cyberMaterial = this.createCyberShader(texture, this.matrixConfig);
        this.cyberRain = new THREE.Points(geometry, this.cyberMaterial);
        this.cyberRain.frustumCulled = false;

        // CRITICAL FOR EPIC FOCUS COMBO: 
        // Ensure Cyber renders behind ocean and zen particles to prevent AdditiveBlending washout
        this.cyberRain.renderOrder = -1;

        this.cyberRotationGroup = new THREE.Group();
        this.cyberRotationGroup.add(this.cyberRain);
        this.cyberGroup.add(this.cyberRotationGroup);

        if (this.currentCyberAngle !== undefined) {
            this.cyberRotationGroup.rotation.z = THREE.MathUtils.degToRad(-this.currentCyberAngle);
        }
    }

    setCyberMode(enabled) {
        if (this.mindWaveMode === enabled) return;
        this.mindWaveMode = enabled;
        this.cyberLogicMode = enabled ? 'mindwave' : 'classic';
        if (enabled && this.cyberMaterial) {
            // Dispose old texture before creating new one to prevent GPU leak
            const oldTex = this.cyberMaterial.uniforms.uTexture.value;
            const newTexture = this.createCyberTexture();
            this.cyberMaterial.uniforms.uTexture.value = newTexture;
            this.cyberMaterial.needsUpdate = true;
            if (oldTex) oldTex.dispose();
        }
        this.initCyber();
    }

    setMode(mode) {
        const target = this.mapMode(mode);
        this.activeModes.clear();
        this.activeModes.add(target);
        this.mode = target;
        this.updateVisibility();
        this.updateLabel(target);
    }

    mapMode(mode) {
        if (mode === 'interstellar') return 'matrix'; // UI "Matrix" -> Internal 3D Matrix
        if (mode === 'cube') return 'box';
        return mode;
    }

    toggleMode(mode) {
        const target = this.mapMode(mode);
        
        // If activating Matrix (3D), ensure it starts in interstellar mode if not set
        if (target === 'matrix' && !this.activeModes.has('matrix')) {
            if (!this.matrixConfig.logicMode) this.matrixConfig.logicMode = 'interstellar';
        }
        // If activating Cyber (2D), ensure it starts in matrix logic if not set
        if (target === 'cyber' && !this.activeModes.has('cyber')) {
            if (!this.cyberConfig.logicMode) this.cyberConfig.logicMode = 'matrix';
        }

        const showCyber2D = this.activeModes.has('cyber'); // Check before modifying activeModes

        if (this.activeModes.has(target)) {
            this.activeModes.delete(target);
        } else {
            this.activeModes.add(target);
        }

        this.mode = target;
        this.updateVisibility();
        
        if (this.activeModes.size === 0 && !showCyber2D) {
            this.active = false;
            // IMMEDIATELY CLEAR BUFFER to remove any frozen trailing effects from Warp/Lightspeed modes
            if (this.renderer) {
                this.renderer.autoClearColor = true;
                this.renderer.clear();
                this.renderer.render(this.scene, this.camera);
            }
        }
        
        if (this.activeModes.size === 1) {
            this.updateLabel(Array.from(this.activeModes)[0]);
        } else if (this.activeModes.size > 1) {
            this.updateLabel('multi');
        } else {
            this.updateLabel('none');
        }
        
        // Ensure strings are regenerated if mode changed
        if (this.updateCyberStrings) this.updateCyberStrings();
    }

    updateVisibility() {
        this.activeModes.forEach(mode => this.ensureInitialized(mode));

        if (this.sphereGroup) this.sphereGroup.visible = this.activeModes.has('sphere');
        if (this.particleGroup) this.particleGroup.visible = this.activeModes.has('particles');
        if (this.lightspeedGroup) this.lightspeedGroup.visible = this.activeModes.has('lightspeed');
        if (this.wavesGroup) this.wavesGroup.visible = this.activeModes.has('waves');
        if (this.lavaGroup) this.lavaGroup.visible = this.activeModes.has('lava');
        if (this.fireplaceGroup) this.fireplaceGroup.visible = this.activeModes.has('fireplace');
        if (this.rainforestGroup) this.rainforestGroup.visible = this.activeModes.has('rainforest');
        if (this.zenGardenGroup) this.zenGardenGroup.visible = this.activeModes.has('zengarden');
        if (this.oceanGroup) this.oceanGroup.visible = this.activeModes.has('ocean');

        // Independently show 3D Matrix (Portal)
        if (this.cyberGroup) {
            this.cyberGroup.visible = this.activeModes.has('matrix');
        }

        // Independently show 2D Cyber (Overlay)
        if (this.overlayCanvas) {
            if (this.activeModes.has('cyber')) {
                this.overlayCanvas.classList.remove('hidden');
                // Dim 3D scene significantly to let Cyber shine, UNLESS Matrix is active
                if (this.activeModes.has('matrix')) {
                    window.dispatchEvent(new CustomEvent('mindwave:set-dimmer', { detail: { value: 0.0 } }));
                    this.wasAutoDimmed = false;
                } else if (this.activeModes.size > 1) {
                    window.dispatchEvent(new CustomEvent('mindwave:set-dimmer', { detail: { value: 0.7 } })); // 70% dim = 30% visibility
                    this.wasAutoDimmed = true;
                } else {
                    window.dispatchEvent(new CustomEvent('mindwave:set-dimmer', { detail: { value: 0.0 } }));
                    this.wasAutoDimmed = false;
                }
                if (!this.matrixCyberStreams || this.matrixCyberStreams.length === 0) {
                    this.generateCyberStyle();
                }
            } else {
                this.overlayCanvas.classList.add('hidden');
                // Automatically restore full illumination when Cyber overlay closes
                // only if it was forcefully dimmed by the engine.
                if (this.wasAutoDimmed) {
                    window.dispatchEvent(new CustomEvent('mindwave:set-dimmer', { detail: { value: 0.0 } }));
                    this.wasAutoDimmed = false;
                }
            }
        }

        if (this.boxGroup) this.boxGroup.visible = this.activeModes.has('box');
        if (this.dragonGroup) this.dragonGroup.visible = this.activeModes.has('dragon');
        if (this.galaxyGroup) this.galaxyGroup.visible = this.activeModes.has('galaxy');
        if (this.mandalaGroup) this.mandalaGroup.visible = this.activeModes.has('mandala');
        if (this.cymaticsGroup) this.cymaticsGroup.visible = this.activeModes.has('cymatics'); // Mapping to Cymatics engine

        this.updateUIPanels();
    }

    // New helper to update Sidebar VISUALS tab
    updateUIPanels() {
        const panels = ['galaxyPanel', 'matrixPanel', 'cymaticsPanel'];
        panels.forEach(p => {
            const el = document.getElementById(p);
            if (el) el.classList.add('hidden');
        });

        if (this.activeModes.has('galaxy')) document.getElementById('galaxyPanel')?.classList.remove('hidden');
        if (this.activeModes.has('interstellar') || this.activeModes.has('matrix')) document.getElementById('matrixPanel')?.classList.remove('hidden');
        if (this.activeModes.has('cymatics')) document.getElementById('cymaticsPanel')?.classList.remove('hidden');
    }

    updateLabel(mode) {
        const label = document.getElementById('visualLabel');
        if (label) {
            if (mode === 'sphere') label.textContent = "BIO-RESONANCE";
            else if (mode === 'particles') label.textContent = "NEURAL FLOW";
            else if (mode === 'lightspeed') label.textContent = "WARP";
            else if (mode === 'waves') label.textContent = "FREQUENCY WAVES";
            else if (mode === 'lava') label.textContent = "LAVA LAMP";
            else if (mode === 'fireplace') label.textContent = "FIREPLACE";
            else if (mode === 'rainforest') label.textContent = "RAINFOREST";
            else if (mode === 'zengarden') label.textContent = "ZEN GARDEN";
            else if (mode === 'ocean') label.textContent = "WAVES";
            else if (mode === 'cyber') label.textContent = "CYBER";
            else if (mode === 'matrix') label.textContent = "MATRIX";
            else if (mode === 'multi') label.textContent = "MULTI-SENSORY";
            else label.textContent = "";
        }
    }

    initWaves() {
        // FIX: Use the pre-created wavesGroup from constructor instead of creating
        // a new group. Previous code leaked groups into the scene on every init.
        if (!this.wavesGroup) {
            this.wavesGroup = new THREE.Group();
            this.scene.add(this.wavesGroup);
        }
        // Clear any existing children first
        while (this.wavesGroup.children.length > 0) {
            const child = this.wavesGroup.children[0];
            this.wavesGroup.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
        }
        const geometry = new THREE.PlaneGeometry(30, 30, 64, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0x60a9ff,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        this.wavesMesh = new THREE.Mesh(geometry, material);
        this.wavesMesh.rotation.x = -Math.PI / 2;
        this.wavesGroup.add(this.wavesMesh);

        const warpCol = this.customColors?.["warp"] || this.customColor;
        if (warpCol && this.wavesMesh) {
            this.wavesMesh.material.color.copy(warpCol);
        }
    }

    setSpeed(speed) {
        this.speedMultiplier = speed;
    }

    setIntent(intent) {
        this.currentIntent = intent;
        if (intent === 'delta' || intent === 'theta') {
            // Calm, slow, gentle. Increase particle size for a soft focus effect.
            if (this.particles && this.particles.material) {
                this.particles.material.size = 0.3;
                this.particles.material.opacity = 0.5;
            }
        } else if (intent === 'gamma' || intent === 'hyper-gamma') {
            // Sharp, fast, intense. Decrease size for sharp focus.
            if (this.particles && this.particles.material) {
                this.particles.material.size = 0.08;
                this.particles.material.opacity = 0.9;
            }
            if (this.cyberMaterial && this.cyberMaterial.uniforms && this.cyberMaterial.uniforms.uTailLength) {
                this.cyberMaterial.uniforms.uHeadColor.value.setHex(0xffffff);
                this.cyberMaterial.uniforms.uTailLength.value = 0.4; // Short, fast tails
            }
        } else {
            // Normal (Alpha, Beta)
            if (this.particles && this.particles.material) {
                this.particles.material.size = 0.15;
                this.particles.material.opacity = 0.8;
            }
            if (this.cyberMaterial && this.cyberMaterial.uniforms && this.cyberMaterial.uniforms.uTailLength) {
                this.cyberMaterial.uniforms.uHeadColor.value.setHex(0xF0FFF0);
                this.cyberMaterial.uniforms.uTailLength.value = 1.0;
            }
        }
        this.renderSingleFrame();
    }

    setColor(hex, mode = null) {
        if (!this.customColors) this.customColors = {};
        if (!mode || mode === "all") {
            this.customColors = {};
            this.customColor = new THREE.Color(hex);
        } else {
            this.customColors[mode] = new THREE.Color(hex);
        }
        
        if (this.particles && this.particles.material) this.particles.material.color.set(hex);
        if (this.lightspeed && this.lightspeed.material) this.lightspeed.material.color.set(hex);
        if (this.sphere && this.sphere.material) {
            this.sphere.material.color.set(hex);
            this.core.material.color.set(hex);
        }
        if (mode === 'box' || !mode || mode === 'all') {
            if (this.boxOuter) this.boxOuter.children.forEach(c => c.material.color.set(hex));
            if (this.boxInner) this.boxInner.children.forEach(c => c.material.color.set(hex));
            if (this.boxEdges && this.boxEdges.material) this.boxEdges.material.color.set(hex);
        }
        if (mode === 'mandala') {
            if (this.mandalaRings) this.mandalaRings.forEach(r => r.material.color.set(hex));
            if (this.mandalaCenter && this.mandalaCenter.material) this.mandalaCenter.material.color.set(hex);
        }
        if (this.wavesMesh && this.wavesMesh.material) this.wavesMesh.material.color.set(hex);
        if (this.lavaBlobs) this.lavaBlobs.forEach(blob => blob.material.color.set(hex));
        if (this.lavaGlow && this.lavaGlow.material) this.lavaGlow.material.color.set(hex);
        if (this.flames && this.flames.material) this.flames.material.color.set(hex);
        if (this.raindrops && this.raindrops.material) this.raindrops.material.color.set(hex);
        if (this.petals && this.petals.material) this.petals.material.color.set(hex);
        if (this.zenWater && this.zenWater.material) this.zenWater.material.color.set(hex);
        if (this.oceanWave && this.oceanWave.material) this.oceanWave.material.color.set(hex);
        if (this.oceanFoam && this.oceanFoam.material) this.oceanFoam.material.color.set(hex);
        if (this.cyberRain && this.cyberRain.material) {
            if (this.cyberRain.material.uniforms && this.cyberRain.material.uniforms.uColor) {
                this.cyberRain.material.uniforms.uColor.value.set(hex);
            }
        }
        if (this.logoMesh && this.originalLogoImg) {
            // Re-burn new colors into the texture instead of uniform tint
            this.updateLogoTexture();
        }
        if (this.dragonGroup && this.updateDragonColor) {
            this.updateDragonColor(new THREE.Color(hex));
        }
        // Galaxy: sun = picked color, stars = complementary
        if (this.galaxyStars || this.galaxySunMesh) {
            this.updateGalaxyColor(new THREE.Color(hex));
        }
        this.renderSingleFrame();
    }

    renderSingleFrame() {
        if (!this.renderer || !this.scene || !this.camera) return;
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }

    createCircleTexture() {
        // Cache: circle texture never changes, reuse GPU upload
        if (this.textures.circle) return this.textures.circle;

        const size = 32;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        this.textures.circle = new THREE.CanvasTexture(canvas);
        return this.textures.circle;
    }

    render(analyserL, analyserR) {
        try {
            if (!this.initialized || !this.renderer || document.hidden) return;

            if (!analyserL && state.analyserLeft) analyserL = state.analyserLeft;

            let normBass = 0, normMids = 0, normHighs = 0;
            let dataL = null;

            if (analyserL) {
                // Reuse cached buffer to avoid per-frame allocation
                const binCount = analyserL.frequencyBinCount;
                if (!this._freqDataArray || this._freqDataArray.length !== binCount) {
                    this._freqDataArray = new Uint8Array(binCount);
                }
                dataL = this._freqDataArray;
                analyserL.getByteFrequencyData(dataL);
                let bass = 0; for (let i = 0; i < 10; i++) bass += dataL[i];
                normBass = (bass / 10) / 255;
                let mids = 0; for (let i = 10; i < 100; i++) mids += dataL[i];
                normMids = (mids / 90) / 255;
                let highs = 0; for (let i = 100; i < 300; i++) highs += dataL[i];
                normHighs = (highs / 200) / 255;
            }

            const multiplier = this.speedMultiplier || 1.0;
            const now = performance.now() * 0.001;
            if (!this.lastTime) this.lastTime = now;
            const dt = now - this.lastTime;
            this.lastTime = now;

            // Calculate Synesthetic Beat Pulse (0 to 1)
            // If auto speed is ON, use the actual binaural beat frequency.
            // If auto speed is OFF, use the manual speed slider (scaled so 1x approx 10Hz)
            const visualBeatFreq = state.visualSpeedAuto ? (state.beatFrequency || 10) : (multiplier * 10);
            const beatPulse = (Math.sin(now * Math.PI * 2 * visualBeatFreq) * 0.5) + 0.5;
            const beatIntensity = beatPulse * (normBass * 0.5 + 0.5); // Scaled by volume

            // Vibration Factor (Toggled by user)
            const vFactor = this.vibrationEnabled ? 1.0 : 0.0;
            const vBeatPulse = beatPulse * vFactor;
            const vNormBass = normBass * vFactor;
            const vNormMids = normMids * vFactor;
            const vNormHighs = normHighs * vFactor;

            // ═══════════════════════════════════════════════════
            // UNIVERSAL VIBRATION SHAKE — applies to ALL visuals
            // ═══════════════════════════════════════════════════
            // When vibration is ON: rapid position jitter driven by bass
            // When vibration is OFF: everything stays perfectly still
            const shakeIntensity = vFactor * (0.03 + normBass * 0.15 + beatPulse * 0.08);
            const shakeX = (Math.sin(now * 47.3) * Math.cos(now * 31.7)) * shakeIntensity;
            const shakeY = (Math.cos(now * 53.1) * Math.sin(now * 29.3)) * shakeIntensity;
            const shakeZ = (Math.sin(now * 37.9) * Math.cos(now * 43.1)) * shakeIntensity;

            // Apply shake to all visual groups/meshes
            const shakeTargets = [
                this.sphereGroup, this.particleGroup, this.lavaGroup,
                this.wavesGroup, this.flames, this.raindrops,
                this.petals, this.boxOuter, this.dragonGroup,
                this.galaxyGroup, this.mandalaGroup, this.cyberGroup
            ];
            for (const target of shakeTargets) {
                if (target) {
                    target.position.x = shakeX;
                    target.position.y = shakeY;
                    target.position.z = shakeZ;
                }
            }

            if (this.activeModes.has('sphere')) {
                // Smooth natural scale with bass response (Controlled by vFactor)
                const scale = 1 + (vNormBass * 0.15);
                this.sphere.scale.setScalar(scale);
                this.core.scale.setScalar(scale * 0.9);

                // Multi-axis rotation for the sphere (Spins in different directions)
                // Sphere Animation (Bio-Resonance)
                this.sphere.rotation.y += (0.005 * multiplier);
                this.sphere.rotation.z += (0.006 * multiplier);

                // Independent counter-rotation for the core
                this.core.rotation.y -= (0.015 * multiplier);
                this.core.rotation.x -= (0.010 * multiplier);

                // Clean color transitions without beat pulsing
                const r = 45 / 255 + (vNormHighs * 0.3);
                const g = 212 / 255 - (vNormHighs * 0.1);
                const b = 191 / 255 + (vNormMids * 0.2);

                const sphColor = (this.customColors && this.customColors['sphere']) ? this.customColors['sphere'] : this.customColor;
                if (sphColor) {
                    this.sphere.material.color.copy(sphColor);
                    this.core.material.color.copy(sphColor);
                } else {
                    this.sphere.material.color.setRGB(r, g, b);
                    this.core.material.color.setRGB(r, g, b);
                }
            }

            if (this.activeModes.has('particles') && this.particles) {
                // Flow speed surges on the beat
                const flowSpeed = (0.015 * multiplier) + (vNormBass * 0.08) + (vBeatPulse * 0.05);
                const positions = this.particles.geometry.attributes.position.array;
                for (let i = 2; i < positions.length; i += 3) {
                    positions[i] += flowSpeed;
                    if (positions[i] > 40) positions[i] = -40;
                }
                this.particles.geometry.attributes.position.needsUpdate = true;
                this.particleGroup.rotation.z += (0.001 * multiplier) + (vNormMids * 0.005);
            }

            if (this.activeModes.has('lightspeed') && this.lightspeed) {
                const pos = this.lightspeed.geometry.attributes.position.array;
                for (let i = 2; i < pos.length; i += 3) {
                    pos[i] += 0.02 * multiplier;
                    if (pos[i] > 40) pos[i] = -40;
                }
                this.lightspeed.geometry.attributes.position.needsUpdate = true;
            }

            if (this.activeModes.has('lava') && this.lavaBlobs) {
                this.lavaBlobs.forEach((blob, index) => {
                    const config = blob.userData;
                    const dt_scaled = dt * multiplier;

                    // Heat up slightly on the beat pulses
                    if (config.state === 'heating') {
                        config.temperature += vBeatPulse * 0.01;
                    }

                    // ... physics logic ...
                    if (config.state === 'heating') {
                        // Stay at bottom, increase temperature
                        blob.position.y = config.floatMin;
                        config.temperature += config.heatRate * 0.15 * dt_scaled;
                        if (config.temperature >= 1.0) {
                            config.temperature = 1.0;
                            config.state = 'rising';
                        }
                    } else if (config.state === 'rising') {
                        // Buoyancy proportional to temperature
                        const riseVel = config.riseSpeed * config.temperature * dt_scaled * 5.0;
                        blob.position.y += riseVel;

                        // Vertical Stretch (Teardrop effect)
                        const stretch = 1.0 + (riseVel / dt_scaled) * 2.0;
                        blob.scale.set(config.baseSize, config.baseSize * Math.min(stretch, 1.5), config.baseSize);

                        if (blob.position.y >= config.floatMax) {
                            blob.position.y = config.floatMax;
                            config.state = 'cooling';
                        }
                    } else if (config.state === 'cooling') {
                        // Stay at top, decrease temperature
                        blob.position.y = config.floatMax;
                        config.temperature -= config.coolRate * 0.15 * dt_scaled;
                        if (config.temperature <= 0.0) {
                            config.temperature = 0.0;
                            config.state = 'falling';
                        }
                    } else if (config.state === 'falling') {
                        // Gravity proportional to density (1 - temp)
                        const fallVel = config.fallSpeed * (1.1 - config.temperature) * dt_scaled * 5.0;
                        blob.position.y -= fallVel;

                        // Vertical Stretch (Drip effect)
                        const stretch = 1.0 + (fallVel / dt_scaled) * 2.0;
                        blob.scale.set(config.baseSize, config.baseSize * Math.min(stretch, 1.5), config.baseSize);

                        if (blob.position.y <= config.floatMin) {
                            blob.position.y = config.floatMin;
                            config.state = 'heating';
                        }
                    }

                    // 2. THERMAL EXPANSION (Volume changes based on temperature)
                    // Heating makes it expand (~20%), Cooling makes it contract to base.
                    if (config.state === 'heating' || config.state === 'cooling') {
                        const expansionFactor = 1.0 + (config.temperature * 0.2);
                        blob.scale.setScalar(config.baseSize * expansionFactor);
                    }

                    // 3. MINIMAL WOBBLE & DRIFT (Keep it mostly vertical)
                    const wobble = Math.sin(now * 1.5 + index) * 0.05;
                    blob.scale.x += wobble * (vNormBass * 0.2);
                    blob.scale.z += wobble * (vNormBass * 0.2);

                    // Drift X slightly based on phase
                    blob.position.x += Math.sin(now * 0.2 + config.driftPhase) * 0.005 * multiplier;
                });
                this.lavaGroup.rotation.y += 0.0001 * multiplier;
                if (this.lavaGlow) this.lavaGlow.material.opacity = (0.05 + (vNormBass * 0.05) + (vBeatPulse * 0.1)) * this.brightnessMultiplier;
            }

            if (this.activeModes.has('ocean') && this.oceanWave) {
                const positions = this.oceanWave.geometry.attributes.position.array;
                const time = now * multiplier;
                // PERF FIX: Cache vertex distances to avoid Math.sqrt on 8192 vertices every frame
                if (!this._oceanDistCache || this._oceanDistCache.length !== positions.length / 3) {
                    this._oceanDistCache = new Float32Array(positions.length / 3);
                    for (let i = 0; i < positions.length; i += 3) {
                        const x = positions[i], y = positions[i + 1];
                        this._oceanDistCache[i / 3] = Math.sqrt(x * x + y * y);
                    }
                }
                const amp = 1.0 + (vNormBass * 2.5) + (vBeatPulse * 0.8);
                for (let i = 0; i < positions.length; i += 3) {
                    const distFromCenter = this._oceanDistCache[i / 3];
                    const x = positions[i];
                    positions[i + 2] = Math.sin(distFromCenter * 0.2 - time * 0.8) * amp +
                        Math.cos(x * 0.15 + time * 0.6) * (amp * 0.5);
                }
                this.oceanWave.geometry.attributes.position.needsUpdate = true;

                if (this.oceanFoam) {
                    const foamPos = this.oceanFoam.geometry.attributes.position.array;
                    for (let i = 2; i < foamPos.length; i += 3) {
                        foamPos[i] = -2.5 + Math.sin(now * 2.0 + i) * 0.1; // bobbing foam
                    }
                    this.oceanFoam.geometry.attributes.position.needsUpdate = true;
                    this.oceanFoam.material.opacity = (0.4 + (vNormMids * 0.3) + (vBeatPulse * 0.2)) * this.brightnessMultiplier;
                }
            }

            if (this.activeModes.has('waves') && this.wavesMesh) {
                const wavePositions = this.wavesMesh.geometry.attributes.position.array;
                for (let i = 0; i < wavePositions.length; i += 3) {
                    const x = wavePositions[i], y = wavePositions[i + 1];
                    let audioOffset = (dataL && dataL.length > 0) ? dataL[Math.floor(Math.abs(x) * 5) % dataL.length] / 255 : 0;
                    // Ultra-smooth, peaceful rolling waves
                    // Much lower frequency for wide, slow swells
                    let baseWave = Math.sin(x * 0.15 + now * 0.3 * multiplier) + Math.cos(y * 0.15 + now * 0.25 * multiplier);
                    // Gentle audio reactivity that swells instead of bounces
                    let gentleAudio = audioOffset * 0.4 * (1.0 + vBeatPulse * 0.3);
                    wavePositions[i + 2] = baseWave * (0.8 + vNormBass * 0.2) + gentleAudio;
                }
                this.wavesMesh.geometry.attributes.position.needsUpdate = true;
                this.wavesMesh.rotation.z += 0.001 * multiplier;
            }

            if (this.activeModes.has('fireplace') && this.fireMaterial) {
                this.fireMaterial.uniforms.uTime.value += dt * multiplier;
                this.fireMaterial.uniforms.uSpeed.value = multiplier * (1.0 + vNormBass * 0.5 + vBeatPulse * 0.2);
                if (this.embers) {
                    const positions = this.embers.geometry.attributes.position.array;
                    const speedFactor = multiplier * 2.0 * (1.0 + vBeatPulse * 0.5);
                    for (let i = 0; i < positions.length; i += 3) {
                        const idx = i / 3;
                        positions[i + 1] += this.emberVelocities[idx] * speedFactor;
                        positions[i] += Math.sin(now * 2.0 + positions[i + 1]) * 0.01 * speedFactor;
                        positions[i + 2] += Math.cos(now * 1.5 + positions[i + 1]) * 0.01 * speedFactor;
                        if (positions[i + 1] > 4.0) {
                            positions[i + 1] = -3.0;
                            positions[i] = (Math.random() - 0.5) * 50.0;
                            positions[i + 2] = -15 + (Math.random() - 0.5) * 20.0;
                        }
                    }
                    this.embers.geometry.attributes.position.needsUpdate = true;
                    this.emberMat.opacity = (0.4 + (vBeatPulse * 0.4)) * this.brightnessMultiplier;
                }
                if (this.fireLight) {
                    this.fireLight.intensity = 1.0 + (vNormBass * 1.5) + (vBeatPulse * 1.0) + (Math.sin(now * 10) + Math.cos(now * 23)) * 0.3;
                    this.fireLight.distance = 20 + (vNormMids * 5) + (vBeatPulse * 5);
                }
            }

            if (this.activeModes.has('rainforest') && this.raindrops) {
                const positions = this.raindrops.geometry.attributes.position.array;
                const speedFactor = multiplier * 0.8 * (1.0 + vBeatPulse * 0.3);
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] -= this.rainVelocities[i / 3] * speedFactor;
                    if (positions[i + 1] < -10) {
                        positions[i + 1] = 10;
                        positions[i] = (Math.random() - 0.5) * 20;
                        positions[i + 2] = (Math.random() - 0.5) * 15;
                    }
                }
                this.raindrops.geometry.attributes.position.needsUpdate = true;
                this.raindrops.material.opacity = (0.5 + (vNormMids * 0.2) + (vBeatPulse * 0.2)) * this.brightnessMultiplier;
            }

            if (this.activeModes.has('zengarden') && this.petals) {
                const positions = this.petals.geometry.attributes.position.array;
                const speedFactor = multiplier * 0.3 * (1.0 + vBeatPulse * 0.5);
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] -= 0.01 * speedFactor;
                    positions[i] += Math.sin(now + positions[i + 1]) * 0.01 * speedFactor;
                    positions[i + 2] += Math.cos(now + positions[i + 1]) * 0.01 * speedFactor;
                    if (positions[i + 1] < -5) {
                        positions[i + 1] = 5;
                        positions[i] = (Math.random() - 0.5) * 20;
                        positions[i + 2] = (Math.random() - 0.5) * 20;
                    }
                }
                this.petals.geometry.attributes.position.needsUpdate = true;
                if (this.zenWater) this.zenWater.material.opacity = (0.3 + (vBeatPulse * 0.2)) * this.brightnessMultiplier;
            }

            // BOX (Cube)
            if (this.activeModes.has('box') && this.boxOuter) {
                this.boxOuter.rotation.x += 0.008 * multiplier + vNormBass * 0.02;
                this.boxOuter.rotation.y += 0.012 * multiplier;
                this.boxInner.rotation.x -= 0.015 * multiplier;
                this.boxInner.rotation.y -= 0.01 * multiplier;
                this.boxEdges.rotation.copy(this.boxOuter.rotation);
                const cubeScale = 1 + vNormBass * 0.2;
                this.boxOuter.scale.setScalar(cubeScale);
                this.boxEdges.scale.setScalar(cubeScale);
                this.boxInner.scale.setScalar(cubeScale * 0.95);

                const boxColor = (this.customColors && this.customColors['box']) ? this.customColors['box'] : this.customColor;
                if (boxColor) {
                    this.boxOuter.children.forEach(c => c.material.color.copy(boxColor));
                    this.boxInner.children.forEach(c => c.material.color.copy(boxColor));
                    if (this.boxEdges && this.boxEdges.material) this.boxEdges.material.color.copy(boxColor);
                } else {
                    const b = 0.48 + vNormHighs * 0.3;
                    this.boxOuter.children.forEach(c => c.material.color.setRGB(0.23, 0.51, b));
                }
            }

            // DRAGON
            if (this.activeModes.has('dragon') && this.dragonBodyInstanced) {
                // Serpentine global rotation
                this.dragonGroup.rotation.y += 0.005 * multiplier;

                // Dynamically update the segmented body traversing a curve in 3D
                const time = now * multiplier * 2.0;
                const globalScale = 1 + vNormBass * 0.2; // Bass pulse

                for (let i = 0; i < this.dragonLength; i++) {
                    // Phase determines position along the winding path (i=0 is head)
                    const phase = time - i * 0.12;

                    // Advanced 3D Lissajous curve for highly organic serpentine flight
                    const x = Math.sin(phase) * 8;
                    const y = Math.cos(phase * 1.5) * 4 + Math.sin(phase * 0.5) * 3;
                    const z = Math.cos(phase * 0.8) * 8;

                    this.dragonDummy.position.set(x, y, z);

                    // Look ahead to calculate rotation for segment
                    const nextPhase = phase + 0.1;
                    const nx = Math.sin(nextPhase) * 8;
                    const ny = Math.cos(nextPhase * 1.5) * 4 + Math.sin(nextPhase * 0.5) * 3;
                    const nz = Math.cos(nextPhase * 0.8) * 8;
                    this.dragonDummy.lookAt(nx, ny, nz);

                    // Scale decays to a point towards the tail (i -> dragonLength)
                    const taper = 1.0 - (i / this.dragonLength) * 0.8;
                    // Add a flowing "breathing" or "muscle" ripple down the body
                    const breath = 1.0 + Math.sin(phase * 4) * 0.15 * (0.5 + vNormBass);
                    this.dragonDummy.scale.setScalar(taper * breath * globalScale);

                    this.dragonDummy.updateMatrix();

                    this.dragonBodyInstanced.setMatrixAt(i, this.dragonDummy.matrix);
                    this.dragonGlowInstanced.setMatrixAt(i, this.dragonDummy.matrix);

                    // Match the distinct head mesh to the lead index (i=0)
                    if (i === 0) {
                        this.dragonHead.position.copy(this.dragonDummy.position);
                        this.dragonHead.quaternion.copy(this.dragonDummy.quaternion);
                        // Make the head slightly larger
                        this.dragonHead.scale.copy(this.dragonDummy.scale).multiplyScalar(1.4);
                    }
                }

                this.dragonBodyInstanced.instanceMatrix.needsUpdate = true;
                this.dragonGlowInstanced.instanceMatrix.needsUpdate = true;

                // Orbiting Dragon Pearl (Chased by the dragon head)
                // Position it slightly ahead of the phase zero
                const pearlPhase = time + 0.5;
                this.dragonPearlGroup.position.x = Math.sin(pearlPhase) * 9;
                this.dragonPearlGroup.position.y = Math.cos(pearlPhase * 1.5) * 5 + Math.sin(pearlPhase * 0.5) * 4;
                this.dragonPearlGroup.position.z = Math.cos(pearlPhase * 0.8) * 9;

                // Rapid rotation for the pearl
                this.dragonPearlGroup.rotation.x += 0.08 * multiplier;
                this.dragonPearlGroup.rotation.y += 0.12 * multiplier;

                const dragColor = (this.customColors && this.customColors['dragon']) ? this.customColors['dragon'] : this.customColor;
                if (dragColor) {
                    this.updateDragonColor(dragColor);
                } else {
                    // Flash body Crimson/Gold based on audio
                    this.dragonBodyInstanced.material.color.setRGB(0.9 + vNormBass * 0.1, 0.2 + vNormMids * 0.1, 0.1);
                    // Flash pearl Cyan/White
                    const pw = 0.5 + vNormHighs * 0.5;
                    this.dragonPearl.material.color.setRGB(pw * 0.5, pw, 1.0);
                }
            }

            // GALAXY
            if (this.activeModes.has('galaxy') && this.galaxyStars) {
                this.galaxyGroup.rotation.y += 0.002 * multiplier + vNormBass * 0.003;
                // REMOVED gentle tilt for absolute control
                this.galaxyStars.material.size = 0.2 + vNormBass * 0.1 + vBeatPulse * 0.08;

                // Tribal sun - absolute 3D rotation controlled by sliders
                if (this.galaxySunMesh) {
                    this.galaxySunMesh.rotation.x += this.sunRotationSpeedX;
                    this.galaxySunMesh.rotation.y += this.sunRotationSpeedY;
                    this.galaxySunMesh.rotation.z += this.sunRotationSpeedZ;
                }
            }

            // MANDALA
            if (this.activeModes.has('mandala') && this.mandalaRings) {
                this.mandalaRings.forEach((ring, i) => {
                    ring.rotation.z += ring.userData.speed * multiplier + vNormBass * 0.005;
                    const pulse = 1 + vBeatPulse * 0.1 * (i + 1) * 0.3;
                    ring.scale.setScalar(pulse);
                    if (!this.customColor) {
                        ring.material.opacity = (0.35 - i * 0.04) + vNormMids * 0.2;
                    }
                });
                if (this.mandalaCenter) {
                    this.mandalaCenter.material.opacity = 0.4 + vBeatPulse * 0.3;
                    const cScale = 1 + vNormBass * 0.3;
                    this.mandalaCenter.scale.setScalar(cScale);
                }
            }

            // CYMATICS (Kinematic Liquefaction Engine)
            if (this.activeModes.has('cymatics') && this.cymaticMaterial) {
                // Uniform Updates
                this.cymaticMaterial.uniforms.uTime.value = now * multiplier;
                this.cymaticMaterial.uniforms.uIntensity.value = 0.2 + vNormBass * 0.8 + vBeatPulse * 1.5; 
                this.cymaticMaterial.uniforms.uBeatFreq.value = state.beatFrequency || 10.0;
                this.cymaticMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
                
                // Color Sync
                const baseCol = (this.customColors && this.customColors['cymatics']) ? this.customColors['cymatics'] : (this.customColor || new THREE.Color(0x60A9FF));
                this.cymaticMaterial.uniforms.uColor.value.copy(baseCol);

                // Rotation (Elastic Surging)
                if (this.cymaticMesh) {
                    this.cymaticMesh.visible = true;
                    // Pattern rotates slowly, surges on bass
                    const surge = vNormBass * 0.05 + vBeatPulse * 0.02;
                    this.cymaticMesh.rotation.z += (0.001 * multiplier) + surge;
                    
                    // Subtle scale breathing
                    const bScale = 1.0 + (vNormBass * 0.05);
                    this.cymaticMesh.scale.setScalar(bScale);
                }
                
                if (this.cymaticAura) {
                    this.cymaticAura.material.opacity = (0.1 + vNormBass * 0.2) * this.brightnessMultiplier;
                }
            } else if (this.cymaticMesh) {
                this.cymaticMesh.visible = false;
            }

                // Auto-rotation timer logic
                if (this.cymaticsTimer > 0 && this.cymaticsTimer <= 300) {
                    const elapsed = (performance.now() - this.lastCymaticRotation) / 1000;
                    if (elapsed > this.cymaticsTimer) {
                        this.nextCymatic();
                    }
                }
            }

            if (this.activeModes.has('cyber')) {
                this.renderCyberCyber();
            }

            if (this.activeModes.has('matrix')) {
                if (this.cyberMaterial) {
                    const config = this.matrixConfig;
                    // Multiply dt by config.speed to drive shader animation
                    this.cyberMaterial.uniforms.uTime.value += dt * multiplier * (config.speed || 1.0);
                    // Modulate base speed uniform with beat pulse for reactive rain
                    this.cyberMaterial.uniforms.uSpeed.value = (config.speed || 1.0) * (1.0 + vBeatPulse * 0.2);
                }
            }

            // Frame Skipping / Battery Saver Logic
            const frameInterval = 1000 / this.targetFPS;
            const timeSinceLastFrame = performance.now() - this.lastFrameRenderTime;

            // Adaptive LOD FPS Measurement (Ring Buffer — no push/shift GC pressure)
            if (dt > 0) {
                const currentFps = 1 / dt;
                this._fpsRingBuffer[this._fpsRingIndex] = currentFps;
                this._fpsRingIndex = (this._fpsRingIndex + 1) % 60;
                if (this._fpsRingCount < 60) this._fpsRingCount++;

                // Memory Guard: Feed FPS info to state monitor if available
                if (typeof state !== 'undefined' && state.performanceMonitor) {
                    const monitor = state.performanceMonitor;
                    if (currentFps < monitor.fpsThreshold) {
                        monitor.lowPerformanceCount++;
                        if (monitor.lowPerformanceCount >= monitor.lowPerformanceLimit) {
                            monitor.triggerSafeMode();
                        }
                    } else {
                        // Slowly recovery counter if performance is stable
                        if (monitor.lowPerformanceCount > 0) monitor.lowPerformanceCount -= 0.5;
                    }
                }

                // Evaluate LOD downgrade if running poorly
                if (now - this.lastLodDegradation > 5.0 && this._fpsRingCount === 60) {
                    let fpsSum = 0;
                    for (let fi = 0; fi < 60; fi++) fpsSum += this._fpsRingBuffer[fi];
                    const avgFps = fpsSum / 60;
                    // If dropping 25% below target consistently
                    if (avgFps < (this.targetFPS * 0.75)) {
                        this.degradeLOD();
                        this.lastLodDegradation = now;
                        this._fpsRingCount = 0; // Reset after degrading
                    }
                }
            }

            // STABILITY: If we are in system-stability-mode, ensure LOD is low
            if (document.body.classList.contains('system-stability-mode') && this.currentLodLevel !== 'low') {
                this.degradeLOD();
                this.degradeLOD(); // Double drop to 'low'
            }

            // Create a property to track current opacity for smoothing
            if (this.currentLogoOpacity === undefined) this.currentLogoOpacity = 0.1;

            // Legacy opacity smoothing — only runs when glow system is not active
            // The lotus glow mode system below handles opacity for all active modes
            if (this.targetLogoOpacity !== undefined && !state.lotusState) {
                const diff = this.targetLogoOpacity - this.currentLogoOpacity;
                if (Math.abs(diff) > 0.001) {
                    this.currentLogoOpacity += diff * 0.05;
                } else {
                    this.currentLogoOpacity = this.targetLogoOpacity;
                }

                // Apply to single mesh material
                if (this.logoMesh && this.logoMesh.material) {
                    this.logoMesh.material.opacity = this.currentLogoOpacity;
                }
            }

            // ═══════════════════════════════════════════════════════
            // LOTUS GLOW MODE SYSTEM (Auto / Dim / Full / Heartbeat)
            // ═══════════════════════════════════════════════════════
            if (this.logoMesh) {
                const lotusMode = state.lotusState || 'auto';
                let lotusTargetOpacity = 0.8; // default
                let doScaleHeartbeat = false;

                switch (lotusMode) {
                    case 'faded': // DIM mode
                        lotusTargetOpacity = 0.15;
                        break;

                    case 'full': // FULL mode
                        lotusTargetOpacity = 1.0;
                        break;

                    case 'heartbeat': {
                        // Smooth sinusoidal fade: full→dim→full at 20 BPM (3s cycle)
                        // 20 BPM = 20/60 = 0.333 Hz
                        const heartbeatFreq = 20 / 60; // 0.333 Hz
                        const fade = (Math.sin(now * Math.PI * 2 * heartbeatFreq) + 1) / 2; // 0→1
                        lotusTargetOpacity = 0.15 + 0.85 * fade; // 0.15→1.0
                        doScaleHeartbeat = true;

                        // Sync cyber brightness with lotus heartbeat
                        if (this.activeModes.has('cyber') && this.cyberMaterial) {
                            if (this.cyberMaterial.uniforms && this.cyberMaterial.uniforms.uBrightness) {
                                this.cyberMaterial.uniforms.uBrightness.value = 0.3 + 0.7 * fade;
                            }
                        }
                        break;
                    }

                    case 'auto':
                    default: {
                        // Dynamic: lotus opacity reacts to audio energy
                        const audioEnergy = vNormBass * 0.5 + vNormMids * 0.3 + vNormHighs * 0.2;
                        lotusTargetOpacity = 0.25 + audioEnergy * 0.75; // 0.25→1.0
                        // Occasional beat sync: brighter on beat peaks
                        lotusTargetOpacity = Math.min(1.0, lotusTargetOpacity + beatPulse * 0.15);
                        doScaleHeartbeat = true; // Gentle scale pulse in auto

                        // Sync cyber with lotus in auto mode
                        if (this.activeModes.has('cyber') && this.cyberMaterial) {
                            if (this.cyberMaterial.uniforms && this.cyberMaterial.uniforms.uBrightness) {
                                // Cyber syncs with lotus but with slight delay/smoothing
                                const cyberSync = 0.4 + audioEnergy * 0.6 + beatPulse * 0.2;
                                this.cyberMaterial.uniforms.uBrightness.value = Math.min(1.0, cyberSync);
                            }
                        }
                        break;
                    }
                }

                // Smooth opacity transition (lerp towards target)
                if (this._lotusCurrentOpacity === undefined) this._lotusCurrentOpacity = 0.8;
                this._lotusCurrentOpacity += (lotusTargetOpacity - this._lotusCurrentOpacity) * 0.08;
                this.logoMesh.material.opacity = this._lotusCurrentOpacity;

                // Scale heartbeat (lub-dub) - runs in heartbeat + auto modes
                if (doScaleHeartbeat) {
                    const heartRate = 1.2; // ~72 BPM natural resting heart rate
                    const cycle = (now * heartRate) % 1.0;
                    let heartScale = 1.0;
                    if (cycle < 0.12) {
                        heartScale = 1.0 + 0.08 * Math.sin(cycle / 0.12 * Math.PI);
                    } else if (cycle > 0.18 && cycle < 0.28) {
                        heartScale = 1.0 + 0.05 * Math.sin((cycle - 0.18) / 0.10 * Math.PI);
                    }
                    this.logoMesh.scale.setScalar(heartScale);
                } else {
                    this.logoMesh.scale.setScalar(1.0); // Reset scale in DIM/FULL
                }
            }

            if (timeSinceLastFrame >= frameInterval) {
                // If Warp is the ONLY active mode, it leaves trails. We need a fade plane to gradually clear them.
                if (this.activeModes.has('lightspeed') && this.activeModes.size === 1) {
                    if (!this.fadePlane) {
                        this.fadePlane = new THREE.Mesh(
                            new THREE.PlaneGeometry(200, 200),
                            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.05, depthWrite: false })
                        );
                        this.fadePlane.position.z = this.camera.position.z - 2;
                        this.scene.add(this.fadePlane);
                    }
                    this.fadePlane.visible = true;
                    this.renderer.autoClear = false;
                } else {
                    if (this.fadePlane) this.fadePlane.visible = false;
                    this.renderer.autoClear = !this.activeModes.has('lightspeed');
                    if (!this.activeModes.has('lightspeed')) this.renderer.clear();
                }
                
                this.renderer.render(this.scene, this.camera);
                this.lastFrameRenderTime = performance.now();
            }

            if (this.active !== false && !document.hidden) {
                if (state.animationId) cancelAnimationFrame(state.animationId);
                state.animationId = requestAnimationFrame(() => this.render(analyserL, analyserR));
            }
        } catch (err) {
            console.error('[Visualizer] Render error caught (animation continues):', err);
            // Ensure the loop keeps going even after an error
            if (this.active !== false && !document.hidden) {
                if (state.animationId) cancelAnimationFrame(state.animationId);
                state.animationId = requestAnimationFrame(() => this.render(analyserL, analyserR));
            }
        }
    }

    setCyberColor(hexColor) {
        this.cyberConfig.color = hexColor;
        this.cyberConfig.rainbow = false;
        this.cyberColorCustomized = true;
        if (this.matrixCyberStreams) {
            this.matrixCyberStreams.forEach(stream => { stream.color = hexColor; });
        }
    }

    setMatrixColor(hexColor) {
        this.matrixConfig.color = hexColor;
        this.matrixConfig.rainbow = false;
        if (this.cyberMaterial && this.cyberMaterial.uniforms.uColor) {
            this.cyberMaterial.uniforms.uColor.value.set(hexColor);
            this._tempColor.set(hexColor);
            this._tempColor.r += (1 - this._tempColor.r) * 0.8;
            this._tempColor.g += (1 - this._tempColor.g) * 0.8;
            this._tempColor.b += (1 - this._tempColor.b) * 0.8;
            this.cyberMaterial.uniforms.uHeadColor.value.copy(this._tempColor);
            if (this.cyberMaterial.uniforms.uRainbow) this.cyberMaterial.uniforms.uRainbow.value = 0.0;
        }
    }

    getAverageFrequency(startIndex, endIndex) {
        let analyser = state.analyserLeft || state.analyserRight;
        if (!analyser) return 0;
        // Reuse cached buffer instead of allocating new Uint8Array every call
        const binCount = analyser.frequencyBinCount;
        if (!this._freqDataArray || this._freqDataArray.length !== binCount) {
            this._freqDataArray = new Uint8Array(binCount);
        }
        const dataArray = this._freqDataArray;
        analyser.getByteFrequencyData(dataArray);
        if (startIndex === undefined) startIndex = 0;
        if (endIndex === undefined) endIndex = dataArray.length;
        let sum = 0, count = 0;
        for (let i = startIndex; i < endIndex && i < dataArray.length; i++) { sum += dataArray[i]; count++; }
        return count > 0 ? sum / count : 0;
    }

    setGlobalSpeed(speed) {
        this.speedMultiplier = speed;
        if (this.cyberMaterial && this.cyberMaterial.uniforms && this.cyberMaterial.uniforms.uSpeed) {
            this.cyberMaterial.uniforms.uSpeed.value = 1.0 + (speed - 1.0) * 0.5;
        }
    }

    setGlobalBrightness(brightness) {
        this.brightnessMultiplier = brightness;
        if (this.cyberMaterial && this.cyberMaterial.uniforms && this.cyberMaterial.uniforms.uBrightness) {
            this.cyberMaterial.uniforms.uBrightness.value = brightness;
        }
    }

    setCyberBrightness(brightness) {
        this.cyberConfig.brightness = brightness;
    }

    setMatrixBrightness(brightness) {
        this.matrixConfig.brightness = brightness;
        if (this.cyberMaterial && this.cyberMaterial.uniforms.uBrightness) {
            this.cyberMaterial.uniforms.uBrightness.value = brightness;
        }
    }

    // --- CYBER (UI) -> Internal Cyber (2D Overlay) ---
    setCyberSpeed(speed) {
        this.cyberConfig.speed = speed;
    }
    setCyberLength(length) {
        this.cyberConfig.length = length;
    }

    // --- MATRIX (UI) -> Internal Matrix (3D Rain) ---
    setMatrixSpeed(speed) {
        this.matrixConfig.speed = speed;
        if (this.cyberMaterial && this.cyberMaterial.uniforms.uSpeed) {
            this.cyberMaterial.uniforms.uSpeed.value = speed;
        }
    }
    setMatrixLength(length) {
        this.matrixConfig.length = length;
        if (this.cyberMaterial && this.cyberMaterial.uniforms.uTailLength) {
            this.cyberMaterial.uniforms.uTailLength.value = length;
        }
    }
    setCyberRainbow(isRainbow) {
        this.cyberConfig.rainbow = isRainbow;
        this.cyberRainbowMode = isRainbow;
        if (!isRainbow) {
            const hex = this.cyberConfig.color || this.cyberColor || '#00FF41';
            if (this.matrixCyberStreams) {
                this.matrixCyberStreams.forEach(stream => { stream.color = hex; });
            }
        }
    }
    setMatrixRainbow(isRainbow) {
        this.matrixConfig.rainbow = isRainbow;
        if (this.cyberMaterial && this.cyberMaterial.uniforms.uRainbow) {
            this.cyberMaterial.uniforms.uRainbow.value = isRainbow ? 1.0 : 0.0;
        }
    }

    setBatterySaver(enabled) {
        this.batterySaver = enabled;
        this.targetFPS = enabled ? 30 : 60;
        const maxPixelRatio = enabled ? 1.0 : 2.0;
        if (this.renderer) {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
            this.resize(); // Trigger resize to apply new pixel ratio
        }
        console.log(`[Visualizer] Battery Saver ${enabled ? 'ENABLED (30fps/1x)' : 'DISABLED (60fps/2x)'}`);
    }

    degradeLOD() {
        if (!this.renderer) return;

        if (this.currentLodLevel === 'high') {
            console.log('[Visualizer] FPS dropping. Degrading LOD to Medium (Pixel Ratio: 1.0)');
            this.renderer.setPixelRatio(1.0);
            this.currentLodLevel = 'medium';
            this.resize();
        } else if (this.currentLodLevel === 'medium') {
            console.log('[Visualizer] FPS dropping. Degrading LOD to Low (Pixel Ratio: 0.75)');
            this.renderer.setPixelRatio(0.75); // Extreme cut for weak GPUs
            this.currentLodLevel = 'low';
            this.resize();
        }
    }

    updateCyberStrings() {
        if (!this.matrixCyberStreams) return;

        let isTextMode = false;
        let textToSpell = "MINDWAVE🪷";
        const config = this.cyberConfig;

        if (config.logicMode === 'custom' || config.logicMode === 'txt') {
            isTextMode = true;
            textToSpell = "🪷" + (config.customText || "WELCOME TO MINDWAVE");
        } else if (config.logicMode === 'mindwave' || config.logicMode === 'mw') {
            isTextMode = true;
            textToSpell = "MINDWAVE🪷";
        }

        const cyberStrict = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
        const alphaNumericMix = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const matrixDataMix = "0123456789·:.-+x[]<>/\\∆ΣΩ∞";

        // Generate a huge enough buffer so even the longest UI slider settings never clip!
        const MAX_BUFFER = 100;

        // Clear chars and replace without disrupting their position
        this.matrixCyberStreams.forEach(stream => {
            stream.chars = []; // Explicitly reset buffer
            stream.isTextMode = isTextMode; // Used for render-time flicker logic

            if (isTextMode && textToSpell.length > 0) {
                // To spell Normal (Top-to-Bottom) where chars[0] leads at the bottom:
                const wordChars = [...textToSpell].reverse();
                for (let c = 0; c < MAX_BUFFER; c++) {
                    stream.chars.push(wordChars[c % wordChars.length]);
                }
            } else if (config.logicMode === 'matrix' || config.logicMode === 'interstellar' || config.logicMode === 'int') {
                for (let c = 0; c < MAX_BUFFER; c++) {
                    stream.chars.push(matrixDataMix.charAt(Math.floor(Math.random() * matrixDataMix.length)));
                }
            } else { // RND / Random -> Cyber style
                for (let c = 0; c < MAX_BUFFER; c++) {
                    stream.chars.push(cyberStrict.charAt(Math.floor(Math.random() * cyberStrict.length)));
                }
            }
        });
    }

    setCyberLogicMode(mode, text) {
        console.log(`[Visualizer] setCyberLogicMode(mode="${mode}", text="${text}")`);
        this.cyberConfig.logicMode = mode;
        if (text !== undefined) this.cyberConfig.customText = text;
        this.updateCyberStrings(); // Needs to update based on cyberConfig
    }

    setMatrixLogicMode(mode, text) {
        console.log(`[Visualizer] setMatrixLogicMode(mode="${mode}", text="${text}") -> 3D config`);
        this.matrixConfig.logicMode = mode;
        if (text !== undefined) this.matrixConfig.customText = text;

        if (this.cyberMaterial && this.cyberMaterial.uniforms && this.cyberMaterial.uniforms.uTexture) {
            const oldTex = this.cyberMaterial.uniforms.uTexture.value;
            const newTexture = this.createCyberTexture(this.matrixConfig);
            this.cyberMaterial.uniforms.uTexture.value = newTexture;
            this.cyberMaterial.needsUpdate = true;
            if (oldTex) oldTex.dispose();
        }
        this.initCyber();
    }

    setCyberColor(hex) {
        this.cyberConfig.color = hex;
        // 2D Overlay update logic
        if (this.matrixCyberStreams) {
            this.matrixCyberStreams.forEach(stream => { stream.color = hex; });
        }
    }

    setMatrixColor(hex) {
        this.matrixConfig.color = hex;
        if (this.cyberMaterial && this.cyberMaterial.uniforms && this.cyberMaterial.uniforms.uColor) {
            this.cyberMaterial.uniforms.uColor.value.set(hex);
        }
    }

    setCyberAngle(degrees) {
        this.cyberConfig.angle = degrees;
        // 2D Rotation handled in render loop
    }

    setMatrixAngle(degrees) {
        this.matrixConfig.angle = degrees;
        this.currentCyberAngle = degrees; // Persistence for initCyber
        if (this.cyberRotationGroup) {
            this.cyberRotationGroup.rotation.z = THREE.MathUtils.degToRad(-degrees);
        }
    }

    setVibrationEnabled(enabled) {
        this.vibrationEnabled = enabled;
    }

    updateLogoTexture() {
        if (!this.originalLogoImg) return;
        const renderSize = 512;
        // Reuse offscreen canvas instead of creating a new one each time
        if (!this._logoRenderCanvas) {
            this._logoRenderCanvas = document.createElement("canvas");
            this._logoRenderCanvas.width = renderSize;
            this._logoRenderCanvas.height = renderSize;
        }
        const canvas = this._logoRenderCanvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, renderSize, renderSize);

        ctx.drawImage(this.originalLogoImg, 0, 0, renderSize, renderSize);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const themeName = document.body.dataset.theme || 'default';
        const currentTheme = THEMES[themeName] || THEMES.default;
        const secondaryHex = currentTheme.secondary || currentTheme.accent || '#ffffff';

        const manColor = (this.customColors && this.customColors['mandala']) ? this.customColors['mandala'] : this.customColor;
        const accentHex = manColor ? manColor.getHex() : parseInt(currentTheme.accent.replace('#', ''), 16);
        const secondaryInt = parseInt(secondaryHex.replace('#', ''), 16);

        const accentR = (accentHex >> 16) & 255;
        const accentG = (accentHex >> 8) & 255;
        const accentB = accentHex & 255;

        const secondaryR = (secondaryInt >> 16) & 255;
        const secondaryG = (secondaryInt >> 8) & 255;
        const secondaryB = secondaryInt & 255;

        this.themeType = document.body.dataset.themeType || "dark";
        const isLight = (this.themeType === "light");

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a < 10) continue;

            // Detect M and W (brightest parts of original logo)
            if (r > 200 && g > 200 && b > 200) {
                // PRIMARY ACCENT for M/W
                data[i] = accentR;
                data[i + 1] = accentG;
                data[i + 2] = accentB;
                data[i + 3] = 255;
            } else {
                // CURATED SECONDARY for petals/outlines
                data[i] = secondaryR;
                data[i + 1] = secondaryG;
                data[i + 2] = secondaryB;
                // Maintain internal logo detail via texture alpha
                data[i + 3] = Math.min(255, a * 1.5);
            }
        }
        ctx.putImageData(imageData, 0, 0);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        if (this.renderer) {
            texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        }

        if (!this.logoMesh) {
            const geometry = new THREE.PlaneGeometry(5.625, 4.78);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.8,
                color: 0xffffff,
                depthTest: false,
                depthWrite: false
            });

            this.logoMesh = new THREE.Mesh(geometry, material);
            this.logoMesh.position.set(0, 0, -10);
            this.logoMesh.renderOrder = -1;
            this.scene.add(this.logoMesh);
        } else {
            const oldMap = this.logoMesh.material.map;
            this.logoMesh.material.map = texture;
            this.logoMesh.material.needsUpdate = true;
            if (oldMap) oldMap.dispose();
        }
    }
    initOverlayLogo() {
        if (this.logoMesh) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = './mindwave-logo-icon.png';
        img.onload = () => {
            this.originalLogoImg = img;
            this.updateLogoTexture();

            // Apply pending opacity if any
            if (this.targetLogoOpacity !== undefined) {
                this.setLogoOpacity(this.targetLogoOpacity);
            } else {
                this.setLogoOpacity(0.8);
            }
        };
        img.onerror = (err) => {
            console.warn('[Visualizer] Failed to load logo:', err);
        };
    }

    setLogoOpacity(targetOpacity) {
        this.targetLogoOpacity = targetOpacity;

        // Update 3D Logo Mesh
        if (this.logoMesh && this.logoMesh.material) {
            this.logoMesh.material.opacity = targetOpacity * this.brightnessMultiplier;
        } else if (!this.logoMesh && targetOpacity > 0) {
            this.initOverlayLogo();
        }
    }

    dispose() {
        this.active = false;
        if (state.animationId) { cancelAnimationFrame(state.animationId); state.animationId = null; }

        // Dispose all Three.js resources to prevent GPU memory leaks
        const disposeGroup = (group) => {
            if (!group) return;
            while (group.children.length > 0) {
                const child = group.children[0];
                group.remove(child);
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
                if (child.children && child.children.length) {
                    child.traverse((c) => {
                        if (c.geometry) c.geometry.dispose();
                        if (c.material) {
                            if (c.material.map) c.material.map.dispose();
                            c.material.dispose();
                        }
                    });
                }
            }
        };

        const groups = [
            this.sphereGroup, this.particleGroup, this.lightspeedGroup, this.lavaGroup,
            this.fireplaceGroup, this.rainforestGroup, this.zenGardenGroup,
            this.oceanGroup, this.cyberGroup, this.boxGroup,
            this.dragonGroup, this.galaxyGroup, this.mandalaGroup,
            this.cymaticsGroup, this.wavesGroup
        ];

        // Release ring buffer, scratch objects, and cached distance arrays
        this._fpsRingBuffer = null;
        this._tempColor = null;
        this._logoRenderCanvas = null;
        this._oceanDistCache = null;

        // Remove all window/document event listeners to prevent stale closure leaks
        if (this._onResizeOverlay) window.removeEventListener('resize', this._onResizeOverlay);
        if (this._onResize) window.removeEventListener('resize', this._onResize);
        if (this.handleLayoutChange) window.removeEventListener('mindwave:layout-change', this.handleLayoutChange);
        if (this._onSafeMode) window.removeEventListener('mindwave:safe-mode-start', this._onSafeMode);
        if (this._onVisibilityChange) document.removeEventListener('visibilitychange', this._onVisibilityChange);
        if (this._onThemeChanged) window.removeEventListener('themeChanged', this._onThemeChanged);

        // Remove canvas listeners
        const canvas = document.getElementById('visualizer');
        if (canvas) {
            if (this._onContextLost) canvas.removeEventListener('webglcontextlost', this._onContextLost);
            if (this._onContextRestored) canvas.removeEventListener('webglcontextrestored', this._onContextRestored);
        }

        groups.forEach(disposeGroup);

        // Dispose standalone materials / textures
        if (this.cyberMaterial) { this.cyberMaterial.dispose(); this.cyberMaterial = null; }
        if (this.fireMaterial) { this.fireMaterial.dispose(); this.fireMaterial = null; }
        if (this.logoMesh) {
            if (this.logoMesh.material) {
                if (this.logoMesh.material.map) this.logoMesh.material.map.dispose();
                this.logoMesh.material.dispose();
            }
            if (this.logoMesh.geometry) this.logoMesh.geometry.dispose();
            if (this.scene) this.scene.remove(this.logoMesh);
            this.logoMesh = null;
        }

        // Dispose Galaxy Sun Mesh (separate from galaxy group usually)
        if (this.galaxySunMesh) {
            if (this.galaxySunMesh.geometry) this.galaxySunMesh.geometry.dispose();
            if (this.galaxySunMesh.material) {
                if (Array.isArray(this.galaxySunMesh.material)) {
                    this.galaxySunMesh.material.forEach(m => {
                        if (m.map) m.map.dispose();
                        m.dispose();
                    });
                } else {
                    if (this.galaxySunMesh.material.map) this.galaxySunMesh.material.map.dispose();
                    this.galaxySunMesh.material.dispose();
                }
            }
            if (this.scene) this.scene.remove(this.galaxySunMesh);
            this.galaxySunMesh = null;
        }

        for (const key in this.textures) {
            if (this.textures[key] && this.textures[key].dispose) this.textures[key].dispose();
        }
        this.textures = {};

        // Free cached buffers
        this._freqDataArray = null;

        if (this.renderer) { this.renderer.dispose(); this.renderer = null; }
        console.log('[Visualizer] Disposed all GPU resources.');
    }
}

// viz3D is declared at the top now

export function initVisualizer() {
    if (!viz3D && els.canvas && els.canvas.activeVisualizer && els.canvas.activeVisualizer.isVisualizer3D) {
        viz3D = els.canvas.activeVisualizer;
    }

    if (els.canvas && els.canvas.activeVisualizer) {
        if (viz3D && els.canvas.activeVisualizer === viz3D) return;
        els.canvas.activeVisualizer.dispose();
        els.canvas.activeVisualizer = null;
        viz3D = null;
    }

    if (state.animationId) { cancelAnimationFrame(state.animationId); state.animationId = null; }

    if (!viz3D && els.canvas) {
        const prevState = (els.canvas.activeVisualizer && els.canvas.activeVisualizer.isVisualizer3D) ? {
            activeModes: els.canvas.activeVisualizer.activeModes,
            mode: els.canvas.activeVisualizer.mode,
            mindWaveMode: els.canvas.activeVisualizer.mindWaveMode,
            cyberLogicMode: els.canvas.activeVisualizer.cyberLogicMode,
            cyberCustomText: els.canvas.activeVisualizer.cyberCustomText,
            currentCyberAngle: els.canvas.activeVisualizer.currentCyberAngle,
            cyberSpeedMultiplier: els.canvas.activeVisualizer.cyberSpeedMultiplier,
            rainbowEnabled: els.canvas.activeVisualizer._rainbowEnabled
        } : {};
        viz3D = new Visualizer3D(els.canvas, prevState);
        els.canvas.activeVisualizer = viz3D;

        // OPTIMIZATION: Initialize heavy geometries in next tick to unblock UI
        setTimeout(() => {
            if (viz3D) {
                viz3D.updateVisibility();
                // Resume ONLY after heavy assets are ready to avoid undefined errors
                resumeVisuals();
            }
        }, 0);
    }
}

export function getVisualizer() {
    return viz3D;
}
let visualsPaused = false;
export function pauseVisuals() {
    visualsPaused = true;
    if (viz3D && state.animationId) {
        cancelAnimationFrame(state.animationId);
        state.animationId = null;
        if (viz3D.renderer && viz3D.scene && viz3D.camera) viz3D.renderer.render(viz3D.scene, viz3D.camera);
    }
}

export function resumeVisuals() {
    console.log('[Visualizer] resumeVisuals CALLED. viz3D:', !!viz3D, 'animId:', state.animationId);
    if (viz3D && !state.animationId) {
        viz3D.active = true;
        viz3D.render(state.analyserLeft, state.analyserRight);
        visualsPaused = false;
    }
}

export function isVisualsPaused() { return visualsPaused; }
export function toggleVisual(mode) { if (viz3D) viz3D.toggleMode(mode); }
export function setVisualSpeed(speed) { if (viz3D) { viz3D.setGlobalSpeed(speed); if (viz3D.setCyberSpeed) viz3D.setCyberSpeed(speed); } }
export function setVisualColor(hex, mode = null) { if (viz3D) { viz3D.setColor(hex, mode); if (viz3D.setCyberColor && (!mode || mode == "cyber")) viz3D.setCyberColor(hex); } }
export function setVisualBrightness(brightness) { if (viz3D && viz3D.setGlobalBrightness) viz3D.setGlobalBrightness(brightness); }
export function setVisualLogoOpacity(opacity) { if (viz3D) viz3D.setLogoOpacity(opacity); }
