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
        this.galaxySunStyle = initialState.galaxySunStyle || 'sun';
        
        // Cymatics State
        this.currentCymaticData = { name: "Fundamental Zenith", n: 1, m: 1, energy: 0.2 };
        this.cymaticsHistory = [];
        this.cymaticsHistoryIndex = -1;
        this._cymaticDriftOffset = Math.random() * 1000;
        
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
        if (this.overlayCanvas) {
            this.resizeOverlayCanvas();
            window.addEventListener('resize', () => this.resizeOverlayCanvas());
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


        // Core Visualization Groups - Pre-initialized BEFORE WebGL setup to prevent boot-level TypeErrors
        this.sphereGroup = new THREE.Group();
        this.particleGroup = new THREE.Group();
        this.lightspeedGroup = new THREE.Group();
        this.lavaGroup = new THREE.Group();
        this.fireplaceGroup = new THREE.Group();
        this.rainforestGroup = new THREE.Group();
        this.zenGardenGroup = new THREE.Group();
        this.oceanGroup = new THREE.Group();
        this.wavesGroup = this.oceanGroup; // Unified naming parity
        this.cyberGroup = new THREE.Group();
        this.boxGroup = new THREE.Group();
        this.dragonGroup = new THREE.Group();
        this.galaxyGroup = new THREE.Group();
        this.mandalaGroup = new THREE.Group();
        this.cymaticsGroup = new THREE.Group();
        this.snowflakeGroup = new THREE.Group();
        this._snowData = null; // {positions, phases, speeds, drifts, rotations}

        try {
            this.scene = new THREE.Scene();
            // Add groups to scene
            const groups = [
                this.sphereGroup, this.particleGroup, this.lightspeedGroup, this.lavaGroup, 
                this.fireplaceGroup, this.rainforestGroup, this.zenGardenGroup, this.oceanGroup,
                this.cyberGroup, this.boxGroup, this.dragonGroup, this.galaxyGroup, 
                this.mandalaGroup, this.cymaticsGroup, this.snowflakeGroup
            ];
            groups.forEach(g => this.scene.add(g));

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
            
            this.textures = {};
            this._freqDataArray = null;
            this.initEnvironment();
            // REMOVED: Exhaustive initialization calls here to fix 5s loading delay.
            // Modes are now initialized lazily in updateVisibility().

            this.camera.position.z = 5;

            // Dynamic Layout Handling
            this.handleLayoutChange = this.handleLayoutChange.bind(this);
            window.addEventListener('resize', () => {
                this.resize();
                this.handleLayoutChange();
            });
            window.addEventListener('mindwave:layout-change', this.handleLayoutChange);

            // Memory Guard: Safe Mode listener
            window.addEventListener('mindwave:safe-mode-start', () => {
                if (this.currentLodLevel !== 'low') {
                    console.log("[Visualizer] Safe Mode: Dropping LOD to 'low'.");
                    this.degradeLOD();
                    this.degradeLOD();
                }
            });

            // Page Visibility API - Battery Saver
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    console.log('[Visualizer] Tab hidden, pausing render loop to save battery.');
                } else {
                    console.log('[Visualizer] Tab visible, resuming render loop.');
                    this.lastTime = performance.now() * 0.001; // Prevent time-jump glitches
                    if (this.active !== false && this.initialized) {
                        this.render(state.analyserLeft, state.analyserRight);
                    }
                }
            });

            // WebGL Context Loss Recovery — avoids permanent black screen on GPU crash
            canvas.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                console.warn('[Visualizer] WebGL context LOST. Halting render loop.');
                this.active = false;
                if (state.animationId) { cancelAnimationFrame(state.animationId); state.animationId = null; }
            });
            canvas.addEventListener('webglcontextrestored', () => {
                console.log('[Visualizer] WebGL context RESTORED. Reinitializing...');
                try {
                    this.initialized = false;
                    this._freqDataArray = null;
                    this.initEnvironment();
                    this.updateVisibility();
                    this.initialized = true;
                    this.active = true;
                    this.lastTime = performance.now() * 0.001;
                    this.render(state.analyserLeft, state.analyserRight);
                } catch (err) {
                    console.error('[Visualizer] Failed to recover from context loss:', err);
                }
            });

            // Initial sizing
            this.resize();
            setTimeout(this.handleLayoutChange, 100); // Delay slightly for DOM to settle

            // Theme Tracking for Adaptive Logo
            window.addEventListener('themeChanged', (e) => {
                if (e.detail && e.detail.type) {
                    const newType = e.detail.type;
                    if (this.themeType !== newType) {
                        this.themeType = newType;
                        console.log(`[Visualizer] Theme type changed to: ${newType}. Updating logo texture.`);
                        this.updateLogoTexture();
                    }
                }
            });

            this.speedMultiplier = 1.0;
            this.brightnessMultiplier = 1.0;

            // Time Simulation
            this.lastTime = performance.now() * 0.001;
            this.simTime = 0; // Accumulated simulation time

            this.targetFPS = 60;
            this.lastFrameRenderTime = 0;
            this.active = true;

            // Apply initial visibility based on activeModes defaults
            this.updateVisibility();

            this.initialized = true;

            // IMMEDIATE: Load logo first so it's visible while other assets load
            this.initOverlayLogo();
            
            // Global Fallback for UI Controls (controls_v3.js / main_vGOLD_SYNC.js)
            window.viz3D = this;
            console.log('[Viz] Visualizer3D Hard-Linked to Global Scope.');
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

        console.log(`[Visualizer] Layout update: Centered background mode (Full Window)`);
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
        if (this.galaxyStars && this.galaxyStars.geometry) {
            const hsl = {};
            color.getHSL(hsl);
            const compHue = (hsl.h + 0.5) % 1.0;
            const colorAttr = this.galaxyStars.geometry.getAttribute('color');
            if (colorAttr) {
                const count = colorAttr.count;
                const tc = this._tempColor;
                for (let i = 0; i < count; i++) {
                    const t = i / count;
                    // Vary lightness per star position (inner brighter, outer dimmer)
                    const l = t < 0.2 ? 0.8 : (t < 0.5 ? 0.6 : 0.4 + Math.random() * 0.15);
                    const s = 0.6 + Math.random() * 0.3;
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
        // Remove existing sun if any
        if (this.galaxySunMesh) {
            this.galaxyGroup.remove(this.galaxySunMesh);
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
        } else if (style === 'sun3') {
            // ── SUN 3: Volumetric Plasma Core (Premium Upgrade) ──
            const uniforms = {
                uTime: { value: 0 },
                uColor: { value: sunMaterial.color },
                uBassIntt: { value: 0.0 }
            };
            this.galaxySunUniforms = uniforms; // Store to update in render loop
            
            const vShader = `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewPosition = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `;
            // Advanced 3D Simplex noise based Plasma Shader
            const fShader = `
                uniform float uTime;
                uniform vec3 uColor;
                uniform float uBassIntt;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                
                vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
                vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
                float snoise(vec3 v){ 
                  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                  vec3 i  = floor(v + dot(v, C.yyy) );
                  vec3 x0 = v - i + dot(i, C.xxx) ;
                  vec3 g = step(x0.yzx, x0.xyz);
                  vec3 l = 1.0 - g;
                  vec3 i1 = min( g.xyz, l.zxy );
                  vec3 i2 = max( g.xyz, l.zxy );
                  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
                  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
                  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
                  i = mod(i, 289.0 ); 
                  vec4 p = permute( permute( permute( 
                             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                  float n_ = 1.0/7.0;
                  vec3  ns = n_ * D.wyz - D.xzx;
                  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
                  vec4 x_ = floor(j * ns.z);
                  vec4 y_ = floor(j - 7.0 * x_ );
                  vec4 x = x_ *ns.x + ns.yyyy;
                  vec4 y = y_ *ns.x + ns.yyyy;
                  vec4 h = 1.0 - abs(x) - abs(y);
                  vec4 b0 = vec4( x.xy, y.xy );
                  vec4 b1 = vec4( x.zw, y.zw );
                  vec4 s0 = floor(b0)*2.0 + 1.0;
                  vec4 s1 = floor(b1)*2.0 + 1.0;
                  vec4 sh = -step(h, vec4(0.0));
                  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                  vec3 p0 = vec3(a0.xy,h.x);
                  vec3 p1 = vec3(a0.zw,h.y);
                  vec3 p2 = vec3(a1.xy,h.z);
                  vec3 p3 = vec3(a1.zw,h.w);
                  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                  p0 *= norm.x;
                  p1 *= norm.y;
                  p2 *= norm.z;
                  p3 *= norm.w;
                  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                  m = m * m;
                  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
                }

                void main() {
                    vec3 normal = normalize(vNormal);
                    vec3 viewDir = normalize(vViewPosition);

                    // Multi-octave 3D sphere noise
                    vec3 spherePos = vec3(vUv * 5.0, uTime * 0.3);
                    float n = snoise(spherePos);
                    n += 0.5 * snoise(spherePos * 2.0 - vec3(0.0, 0.0, uTime * 0.5));
                    n += 0.25 * snoise(spherePos * 4.0 + vec3(uBassIntt));
                    
                    n = smoothstep(0.0, 1.0, (n * 0.5 + 0.5) + uBassIntt * 0.6);

                    // Edge Rim
                    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
                    rim = smoothstep(0.5 - uBassIntt * 0.2, 1.0, rim);

                    float corona = pow(rim, 2.5);

                    vec3 coreColor = mix(vec3(1.0, 1.0, 1.0), uColor, clamp(n, 0.0, 1.0));
                    vec3 finalColor = coreColor + uColor * corona * 2.5;

                    float alpha = min(max(n * 1.5, rim * 1.2), 1.0);
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `;
            const coreMat = new THREE.ShaderMaterial({
                vertexShader: vShader,
                fragmentShader: fShader,
                uniforms: uniforms,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.DoubleSide
            });

            // The main photosphere
            const geo = new THREE.SphereGeometry(2.0, 64, 64);
            const coreMesh = new THREE.Mesh(geo, coreMat);
            sunGeometryGroup.add(coreMesh);

            // A larger, softer halo for the "Bloom"
            const haloMat = new THREE.MeshBasicMaterial({
                color: sunMaterial.color,
                transparent: true,
                opacity: 0.15,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.BackSide
            });
            const haloGeo = new THREE.SphereGeometry(3.0, 32, 32);
            sunGeometryGroup.add(new THREE.Mesh(haloGeo, haloMat));

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
        if (style !== 'sun' && style !== 'sun2' && style !== 'sun3') return;
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

    // ─────────────────────────────────────────────────────────
    //  REAL SNOWFALL — 6-pointed crystal particles with drift
    // ─────────────────────────────────────────────────────────
    createSnowflakeTexture() {
        if (this.textures.snowflake) return this.textures.snowflake;
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        const cx = size / 2, cy = size / 2;

        ctx.clearRect(0, 0, size, size);

        // Soft radial glow halo behind the crystal
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.5);
        glow.addColorStop(0, 'rgba(200,230,255,0.5)');
        glow.addColorStop(0.4, 'rgba(180,220,255,0.15)');
        glow.addColorStop(1, 'rgba(150,200,255,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, size, size);

        // Draw 6 arms of the snowflake crystal
        ctx.strokeStyle = 'rgba(220,240,255,1.0)';
        ctx.lineCap = 'round';

        for (let arm = 0; arm < 6; arm++) {
            const angle = (arm / 6) * Math.PI * 2;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);

            // Main arm
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -52);
            ctx.stroke();

            // 3 pairs of branches along the arm
            const branchDefs = [
                { d: 18, len: 14, angle: Math.PI / 4 },
                { d: 32, len: 20, angle: Math.PI / 4 },
                { d: 46, len: 10, angle: Math.PI / 5 },
            ];
            ctx.lineWidth = 1.5;
            branchDefs.forEach(({ d, len, angle: ba }) => {
                [1, -1].forEach(side => {
                    ctx.beginPath();
                    ctx.moveTo(0, -d);
                    ctx.lineTo(side * len * Math.cos(Math.PI / 2 - ba), -d - len * Math.sin(Math.PI / 2 - ba));
                    ctx.stroke();
                });
            });

            ctx.restore();
        }

        // Bright center hexagon
        ctx.beginPath();
        for (let h = 0; h < 6; h++) {
            const ha = (h / 6) * Math.PI * 2 - Math.PI / 6;
            const hx = cx + Math.cos(ha) * 4;
            const hy = cy + Math.sin(ha) * 4;
            h === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        this.textures.snowflake = new THREE.CanvasTexture(canvas);
        return this.textures.snowflake;
    }

    initSnowflake() {
        // Clear group
        while (this.snowflakeGroup.children.length > 0) {
            const c = this.snowflakeGroup.children[0];
            this.snowflakeGroup.remove(c);
            if (c.geometry) c.geometry.dispose();
            if (c.material) c.material.dispose();
        }
        this._snowData = null;

        const count = 700;
        const positions  = new Float32Array(count * 3);
        const sizes      = new Float32Array(count);
        const opacities  = new Float32Array(count);
        const phases     = new Float32Array(count);
        const speeds     = new Float32Array(count);
        const drifts     = new Float32Array(count);
        const driftFreqs = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Scatter across a wide area, full depth range for parallax
            positions[i3]     = (Math.random() - 0.5) * 70;
            positions[i3 + 1] = (Math.random() - 0.5) * 44;   // start anywhere vertically
            positions[i3 + 2] = -20 + Math.random() * 30;      // deep to near (z parallax)

            // Snowflakes further back are smaller and dimmer
            const depth = (positions[i3 + 2] + 20) / 30; // 0=far, 1=near
            sizes[i]    = 2 + depth * 10;                  // 2..12
            opacities[i] = 0.25 + depth * 0.65;           // 0.25..0.9

            phases[i]     = Math.random() * Math.PI * 2;
            speeds[i]     = 0.012 + Math.random() * 0.035 + depth * 0.02; // near=faster
            drifts[i]     = 0.008 + Math.random() * 0.016;
            driftFreqs[i] = 0.3 + Math.random() * 0.7;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

        const sfTex = this.createSnowflakeTexture();

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTexture:        { value: sfTex },
                uColor:          { value: new THREE.Color(0xa5f3eb) }, // Default icy cyan
                uIntensity:      { value: 0 },
                uSizeMultiplier: { value: 1.0 },
                uGlowAmount:     { value: 0.5 },
            },
            vertexShader: `
                attribute float aSize;
                attribute float aOpacity;
                uniform float uSizeMultiplier;
                varying float vOpacity;
                void main() {
                    vOpacity = aOpacity;
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = aSize * uSizeMultiplier * (300.0 / -mv.z);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform vec3 uColor;
                uniform float uIntensity;
                uniform float uGlowAmount;
                varying float vOpacity;
                void main() {
                    vec4 tex = texture2D(uTexture, gl_PointCoord);
                    if (tex.a < 0.02) discard;
                    // Dynamically tinted base color
                    vec3 baseCol = mix(uColor, vec3(1.0), uIntensity * 1.5);
                    float glowAlpha = tex.a * vOpacity * (0.5 + uGlowAmount * 1.2);
                    vec3 finalCol = baseCol * (1.0 + uGlowAmount * uIntensity * 1.2);
                    gl_FragColor = vec4(finalCol, clamp(glowAlpha, 0.0, 1.0));
                }
            `,
            transparent: true,
            depthWrite:  false,
            blending:    THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geo, mat);
        this.snowflakeGroup.add(points);

        // Store animation data for the render loop
        this._snowData = {
            count, positions, phases, speeds, drifts, driftFreqs,
            points, material: mat,
            spinMeshes: [], spinSpeeds: []
        };

        // ADD 5 HERO SNOWFLAKES (Large, spinning center crystals)
        for (let i = 0; i < 5; i++) {
            const heroTex = this.createSnowflakeTexture();
            const heroMat = new THREE.MeshBasicMaterial({
                map: heroTex,
                transparent: true,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                opacity: 0.6
            });
            const heroGeo = new THREE.PlaneGeometry(12 + i * 4, 12 + i * 4);
            const heroMesh = new THREE.Mesh(heroGeo, heroMat);
            heroMesh.renderOrder = 10;
            heroMesh.position.set(0, 0, -10 + i * 2);
            heroMesh.rotation.z = Math.random() * Math.PI;
            this.snowflakeGroup.add(heroMesh);
            this._snowData.spinMeshes.push(heroMesh);
            this._snowData.spinSpeeds.push(0.002 * (i % 2 === 0 ? 1 : -1));
        }

        console.log('[Viz] ❄️ Real snowfall initialized —', count, 'crystals + 5 HEROES');
    }

    setSnowSize(mult) {
        if (this._snowData?.material) {
            this._snowData.material.uniforms.uSizeMultiplier.value = Math.max(0.2, Math.min(4.0, mult));
            console.log('[Viz] Snow Size Override:', mult);
        }
    }

    setSnowGlow(amount) {
        if (this._snowData?.material) {
            this._snowData.material.uniforms.uGlowAmount.value = Math.max(0.0, Math.min(1.0, amount));
            console.log('[Viz] Snow Glow Override:', amount);
        }
    }


    static get CYMATIC_PATTERNS() {
        return [
            { name: "Fundamental Zenith", n: 1, m: 1, cat:'sacred' },
            { name: "Dual Horizon", n: 1, m: 2, cat:'sacred' },
            { name: "Triple Axis", n: 1, m: 3, cat:'sacred' },
            { name: "Quad Core", n: 1, m: 4, cat:'sacred' },
            { name: "Penta Wave", n: 1, m: 5, cat:'sacred' },
            { name: "Square Harmony", n: 2, m: 2, cat:'geometry' },
            { name: "Lotus Flow", n: 2, m: 3, cat:'sacred' },
            { name: "Cresent Node", n: 2, m: 4, cat:'radial' },
            { name: "Orchid Ring", n: 2, m: 5, cat:'sacred' },
            { name: "Cross Pulse", n: 3, m: 3, cat:'complex' },
            { name: "Nodal Ribbon", n: 3, m: 1, cat:'radial' },
            { name: "Radial Seed", n: 3, m: 5, cat:'sacred' },
            { name: "Diamond Lattice", n: 4, m: 4, cat:'geometry' },
            { name: "Solar Grate", n: 4, m: 2, cat:'radial' },
            { name: "Cellular Grid", n: 5, m: 5, cat:'geometry' },
            { name: "Star Resonance", n: 6, m: 2, cat:'sacred' },
            { name: "Hexa Flux", n: 6, m: 6, cat:'geometry' },
            { name: "Solar Mandala", n: 7, m: 3, cat:'sacred' },
            { name: "Graphene Matrix", n: 8, m: 4, cat:'complex' },
            { name: "Hyper Lobe", n: 8, m: 8, cat:'complex' },
            { name: "Atomic Shell", n: 9, m: 2, cat:'complex' },
            { name: "Omega Sphere", n: 9, m: 9, cat:'sacred' },
            { name: "Fibonacci Spiral", n: 1, m: 8, cat:'sacred' },
            { name: "Fractal Lace", n: 10, m: 4, cat:'fractal' },
            { name: "Cosmic Gear", n: 11, m: 3, cat:'complex' },
            { name: "Interstellar Mesh", n: 12, m: 12, cat:'complex' },
            { name: "Quantum Foam", n: 5, m: 13, cat:'complex' },
            { name: "Singularity", n: 20, m: 2, cat:'complex' },
            { name: "Prime Prime", n: 13, m: 17, cat:'complex' },
            { name: "Metatron's Grid", n: 6, m: 12, cat:'sacred' }
        ];
    }

    initCymatics() {
        try {
            if (!this.cymaticsGroup) return;
            
            // CLEANUP: If children exist, remove them first
            while(this.cymaticsGroup.children.length > 0) {
                const child = this.cymaticsGroup.children[0];
                this.cymaticsGroup.remove(child);
                if(child.geometry) child.geometry.dispose();
                if(child.material) {
                    if(child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            }

            // HIGH-RESOLUTION geometry for detailed vertex displacement
            const geometry = new THREE.PlaneGeometry(45, 45, 128, 128);
            this.cymaticMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uN: { value: (this.currentCymaticData ? this.currentCymaticData.n : 1.0) },
                    uM: { value: (this.currentCymaticData ? this.currentCymaticData.m : 3.0) },
                    uBassN: { value: 1.0 },
                    uBassM: { value: 1.0 },
                    uHighN: { value: 5.0 },
                    uHighM: { value: 5.0 },
                    uType: { value: 0 },
                    uEnergy: { value: 0.5 },
                    uTime: { value: 0 },
                    uIntensity: { value: 0.5 },
                    uHarmonics: { value: 0.0 }, 
                    uBeatFreq: { value: 0 },
                    uColor: { value: new THREE.Color(state.visualColors.sphere || '#60a9ff') },
                    uSecondaryColor: { value: new THREE.Color(0xffffff) },
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uNormMids: { value: 0 },
                    uNormHighs: { value: 0 },
                    uMedium: { value: state.cymaticMedium || 0.0 },
                    uShiver: { value: 0.0 },
                    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                    uMouseActive: { value: 0.0 },
                    uResonance: { value: (state.cymaticResonance ?? 1.0) },
                    uEntropy: { value: (state.cymaticEntropy ?? 1.0) },
                    uFlowSpeed: { value: (state.cymaticFlow ?? 1.0) }
                },
                vertexShader: `
                    varying vec2 vUv;
                    varying float vDisplace;
                    uniform float uTime, uN, uM, uIntensity, uEnergy, uShiver;
                    
                    #define PI 3.14159265359

                    float chladniBase(vec2 p, float n, float m) {
                        return cos(n * PI * p.x) * cos(m * PI * p.y) - cos(m * PI * p.x) * cos(n * PI * p.y);
                    }

                    void main() {
                        vUv = uv;
                        vec2 p = (uv - 0.5) * 2.0;
                        
                        // Calculate basic displacement for vertex shading
                        float f = chladniBase(p, uN, uM);
                        f = abs(f) * (uIntensity + uShiver);
                        
                        vDisplace = f;
                        
                        vec3 pos = position;
                        // Physical displacement: create 3D peaks and valleys
                        pos.z += f * 5.0 * (1.0 + 0.3 * sin(uTime * 3.0)); 
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,
                fragmentShader: `
                    varying vec2 vUv;
                    varying float vDisplace;
                    uniform float uN, uM, uBassN, uBassM, uHighN, uHighM;
                    uniform float uBeatFreq, uTime, uIntensity, uType, uEnergy, uHarmonics, uShiver;
                    uniform float uNormMids, uNormHighs, uMedium; 
                    uniform vec3 uColor, uSecondaryColor;
                    uniform vec2 uResolution;
                    uniform vec2 uMouse;
                    uniform float uMouseActive, uResonance, uEntropy, uFlowSpeed;

                    #define PI 3.14159265359

                    float hash(vec2 p) {
                        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
                    }

                    float noise(vec2 p) {
                        vec2 i = floor(p);
                        vec2 f = fract(p);
                        f = f * f * (3.0 - 2.0 * f);
                        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
                    }

                    // --- ADVANCED FRACTAL ORGANICS ---
                    // Fractional Brownian Motion for tree bark / neural web textures
                    float fbm(vec2 p) {
                        float f = 0.0;
                        f += 0.5 * noise(p);
                        p *= 2.02;
                        f += 0.25 * noise(p);
                        return f;
                    }

                    float chladniBase(vec2 p, float n, float m) {
                        return cos(n * PI * p.x) * cos(m * PI * p.y) - cos(m * PI * p.x) * cos(n * PI * p.y);
                    }

                    // Kaleidoscopic Apollonian Gasket Folds
                    vec2 apollonianFold(vec2 p, float s) {
                        for(int i=0; i<3; i++) {
                            p = -1.0 + 2.0 * fract(p * 0.5 + 0.5);
                            float r2 = dot(p,p);
                            p = p / max(r2, s); // Inversion
                        }
                        return p;
                    }

                    // DOMAIN WARPING: Constant Ambient Fluid Flow
                    vec2 flowWarp(vec2 p, float t) {
                        float n1 = noise(p + t * 0.2);
                        float n2 = noise(p * 2.1 - t * 0.15);
                        float n3 = fbm(p * 3.0 + t * 0.1);
                        return p + (0.1 + uShiver * 0.1) * vec2(cos(n1 * PI + n3), sin(n2 * PI - n1));
                    }

                    void main() {
                        vec2 uv = (vUv - 0.5) * 2.0;
                        float aspect = uResolution.x / uResolution.y;
                        uv.x *= aspect;

                        float t = uTime * uFlowSpeed;
                        // Ambient Flow Field mapping (Constant organic motion even when silent)
                        vec2 p = flowWarp(uv, t * 0.5 * uEntropy);

                        // Audio Transient Shiver
                        vec2 distort = vec2(noise(vUv * 15.0 + t), noise(vUv * 15.0 - t)) * uShiver * 0.04;
                        p += distort;

                        float f = 0.0;
                        float n_eff = uN * uResonance;
                        float m_eff = uM * uResonance;
                        
                        // Interactive Ripple Disruption (The Cursors)
                        float distToMouse = distance(vUv, uMouse);
                        float ripple = sin(distToMouse * 30.0 - t * 15.0) * exp(-distToMouse * 4.0) * uMouseActive * 0.5;
                        f += ripple;
                        
                        // [ TOPOLOGICAL CATEGORIES (Radical Mathematical Divergence) ]
                        if (uType < 0.5) { 
                            // 0.0: SACRED (Nested Bessel Rings & Node Interference - Image 2/5)
                            float r = length(p);
                            float bessel = cos(r * n_eff * 10.0 + t) * exp(-r * 0.2);
                            float angular = cos(atan(p.y, p.x) * m_eff);
                            f = bessel * angular;
                            if (uHarmonics > 0.01) f += uHarmonics * chladniBase(p * 1.5, n_eff * 0.5, m_eff * 0.5);
                        } 
                        else if (uType < 1.5) { 
                            // 1.0: SPIROGRAPH & TORUS VORTEX (3D Toroidal Projection - Image 3)
                            float a = atan(p.y, p.x);
                            float r = length(p);
                            // Toroidal twist math
                            float twist = sin(r * 10.0 - a * n_eff + t);
                            float s1 = sin(a * n_eff + t);
                            float s2 = sin(a * m_eff - t * 0.5);
                            f = sin(r * 50.0 + twist * 15.0 * uEntropy) * (s1 * s2);
                        }
                        else if (uType < 2.5) { 
                            // 2.0: PLANETARY / PHYLLOTAXIS (Seed-Mapping & Dense Orbital Clusters - Image 1)
                            float r = length(p) * (15.0 + n_eff * 0.5);
                            float a = atan(p.y, p.x);
                            // Golden angle approximation for orbital clustering
                            float phyll = sin(r - a * m_eff) * cos(r * 0.1 + a * 2.0);
                            f = phyll * (1.0 - smoothstep(1.5, 2.0, length(p)));
                        }
                        else { 
                            // 3.0: COMPLEX / DOMAIN WARP (Deep Fluid Organic Convection - Image 4)
                            vec2 q = p + vec2(cos(t * 0.1), sin(t * 0.15)) * 0.5;
                            float n1 = noise(q * (n_eff * 0.1) + t * 0.2);
                            float n2 = noise(q * (m_eff * 0.1) - t * 0.1);
                            vec2 warp = p + vec2(cos(n1 * PI * uEntropy), sin(n2 * PI * uEntropy)) * 0.8;
                            f = sin(length(warp) * 15.0 + n1 * 8.0);
                        }

                        // TRUE RESONANCE PRESERVATION (Audio Transients & Reactivity)
                        // Physics deformation is layered on top, physically shivering the geometry
                        float bassDistort = chladniBase(p, uBassN * 0.2, uBassM * 0.2) * 0.3 * uIntensity;
                        f += bassDistort;
                        
                        // Micro-ripples added on extreme high transient crashes
                        float highRipples = sin(length(p) * uHighN * 3.0 - t * 8.0) * 0.08 * uNormHighs;
                        f += highRipples;
                        
                        // Interactive Ripple Disruption (Phase 3)
                        float distToMouse = distance(uv, uMouse);
                        float ripple = sin(distToMouse * 30.0 - t * 15.0) * exp(-distToMouse * 6.0) * uMouseActive * 0.4;
                        f += ripple;
                        
                        float rawF = f;
                        f = abs(f);

                        float threshold = 0.07 + uIntensity * 0.09;
                        
                        // MEDIUM LOGIC (Edge Mask)
                        float edge;
                        if (uMedium < 0.5) { // WATER
                             edge = smoothstep(threshold + 0.2, threshold - 0.03, f);
                        } else if (uMedium < 1.5) { // SAND
                             float grain = noise(vUv * 950.0 + t * 2.0) * 0.14;
                             edge = step(threshold + grain, f);
                        } else if (uMedium < 2.5) { // ETHER
                             edge = pow(smoothstep(threshold + 0.4, threshold - 0.1, f), 2.5);
                        } else { // ICE
                             edge = smoothstep(threshold + 0.05, threshold + 0.01, f);
                             edge *= (0.8 + 0.2 * noise(vUv * 1200.0));
                        }

                        // CINEMATIC LIGHTING (Matcap Approximation)
                        vec3 dx = dFdx(vec3(p, rawF));
                        vec3 dy = dFdy(vec3(p, rawF));
                        vec3 norm = normalize(cross(dx, dy));
                        norm.z = mix(0.6, 0.2, uIntensity); // Prevent flattening into a literal mirror at 100% intensity 
                        norm = normalize(norm);

                        vec3 lightDir = normalize(vec3(sin(t * 0.4), cos(t * 0.2), 1.2));
                        vec3 viewDir = vec3(0, 0, 1);
                        vec3 reflectDir = reflect(-lightDir, norm);
                        
                        float diff = max(dot(norm, lightDir), 0.0);
                        float spec = pow(max(dot(reflectDir, viewDir), 0.0), 128.0); 

                        // Environment Reflection Layer
                        float env = noise(reflectDir.xy * 2.5 + t * 0.15) * 0.4;
                        
                        vec3 baseCol = mix(uColor, uSecondaryColor, f);
                        
                        // Medium Specific Refinement
                        if (uMedium < 0.5) { // WATER
                             baseCol = mix(baseCol, vec3(0.01, 0.05, 0.15), 0.5);
                             baseCol += 0.35 * vec3(0.1, 0.7, 1.0) * vDisplace;
                        } else if (uMedium < 1.5) { // SAND
                             baseCol = mix(baseCol, vec3(1.0, 0.9, 0.5), 0.7);
                        } else if (uMedium < 2.5) { // ETHER
                             baseCol += 0.6 * vec3(0.8, 0.4, 1.0) * (0.5 + 0.5 * cos(t * 1.8 + f * 12.0));
                        } else { // ICE
                             baseCol = mix(vec3(0.8, 0.95, 1.0), uColor, 0.3);
                             baseCol += spec * 0.5 + env * 0.4;
                        }

                        vec3 col = baseCol * (0.3 + 0.7 * diff);
                        col += spec * vec3(1.0, 0.99, 0.95) * (0.15 + uNormHighs * 0.15); // SEVERE REDUCTION to prevent screen flooding
                        col += uShiver * vec3(1.0, 0.3, 0.4) * 0.4;

                        float vig = smoothstep(2.5, 0.7, length(uv));
                        gl_FragColor = vec4(col * edge * vig, edge * (0.8 + 0.2 * uEnergy));
                    }
                `,
                transparent: true,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(geometry, this.cymaticMaterial);
            mesh.position.z = -5; // Foreground depth within scene
            this.cymaticsGroup.add(mesh);

            // ── INTERACTIVE POINTER BINDING (Cursors) ──
            this.setupCymaticsInteractions();

            // ── QUANTUM GRANULAR ENTRAINMENT (SAND PHYSICS) ──
            const particleCount = this.batterySaver ? 15000 : 40000;
            const pGeo = new THREE.BufferGeometry();
            const pPos = new Float32Array(particleCount * 3);
            const pPhase = new Float32Array(particleCount);
            
            for(let i=0; i<particleCount; i++) {
                pPos[i*3] = (Math.random() - 0.5) * 45; // x (match plane width)
                pPos[i*3+1] = (Math.random() - 0.5) * 45; // y (match plane height)
                pPos[i*3+2] = 0.0; // z local
                pPhase[i] = Math.random() * Math.PI * 2;
            }
            pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
            pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1));

            this.cymaticParticlesMaterial = new THREE.ShaderMaterial({
                uniforms: this.cymaticMaterial.uniforms, // Share exact liquid uniforms
                vertexShader: `
                    uniform float uTime, uN, uM, uIntensity, uShiver, uEnergy, uMouseActive;
                    uniform vec2 uMouse;
                    attribute float aPhase;
                    varying float vVal;
                    
                    #define PI 3.14159265359

                    float chladniBase(vec2 p, float n, float m) {
                        return cos(n * PI * p.x) * cos(m * PI * p.y) - cos(m * PI * p.x) * cos(n * PI * p.y);
                    }

                    void main() {
                        vec2 p = position.xy / 22.5; 
                        float val = chladniBase(p, uN, uM);
                        
                        // Particle Physical Displacement Disruption
                        vec2 normalizedP = (p * 0.5) + 0.5; 
                        float distToMouse = distance(normalizedP, uMouse);
                        float ripple = sin(distToMouse * 30.0 - uTime * 15.0) * exp(-distToMouse * 6.0) * uMouseActive * 0.4;
                        val += ripple * 2.0;

                        vVal = abs(val);
                        
                        // Gradient for entrainment (push toward zero)
                        vec2 eps = vec2(0.01, 0.0);
                        float dx = chladniBase(p + eps.xy, uN, uM) - chladniBase(p - eps.xy, uN, uM);
                        float dy = chladniBase(p + eps.yx, uN, uM) - chladniBase(p - eps.yx, uN, uM);
                        
                        // Force vector: pushes away from high vibration |val|
                        vec2 grad = vec2(dx, dy);
                        float force = clamp(1.0 - vVal, 0.0, 1.0); // Stronger pull near nodes
                        vec2 push = -grad * val * (0.5 + uIntensity * 1.5) * force;
                        
                        // Jitter bouncing at anti-nodes (high displacement)
                        float jitterZ = vVal * sin(uTime * 30.0 + aPhase * 2.0) * (0.5 + uShiver * 5.0 + uIntensity);
                        
                        vec3 finalPos = position;
                        finalPos.xy += push * 15.0; // Gather effect
                        finalPos.z += jitterZ * 2.0;

                        vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                        
                        // Size based on Z bounce
                        gl_PointSize = (1.5 + max(0.0, jitterZ)) * (100.0 / -mvPosition.z) * (0.5 + uEnergy * 0.5);
                    }
                `,
                fragmentShader: `
                    uniform vec3 uColor;
                    uniform vec3 uSecondaryColor;
                    uniform float uMedium;
                    uniform float uEnergy;
                    varying float vVal;
                    void main() {
                        vec2 coord = gl_PointCoord - vec2(0.5);
                        if(length(coord) > 0.5) discard;
                        
                        // Node particles gracefully inherit primary colors rather than blasting pure white
                        vec3 sandColor = mix(vec3(0.9, 0.7, 0.4), mix(vec3(0.7, 0.8, 1.0), uColor, 0.5), uMedium / 3.0); 
                        vec3 color = mix(sandColor, uColor, vVal * 1.5);
                        
                        // Extreme opacity reduction to survive AdditiveBlending of 80,000 tight particles
                        float baseAlpha = mix(0.04, 0.08, uEnergy);
                        float alpha = baseAlpha * (1.0 - clamp(vVal * 1.5, 0.0, 1.0)); 
                        
                        // Dim emission directly
                        color *= 0.4;
                        
                        gl_FragColor = vec4(color, alpha);
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            const particles = new THREE.Points(pGeo, this.cymaticParticlesMaterial);
            particles.position.z = -4.95; // Just above the liquid mesh
            this.cymaticsGroup.add(particles);
            this.cymaticParticles = particles;

            // History check
            if (this.cymaticsHistory.length === 0) {
                this.nextCymatic();
            }
            console.log("[Cymatics] Kinematic Liquefaction Engine Initialized");
        } catch (e) {
            console.error("[Cymatics] Init Failed:", e);
        }
    }

    static CYMATIC_PATTERNS = [
        { name: "Sri Yantra", n: 9, m: 3, energy: 0.8, cat: "sacred" },
        { name: "Flower Life", n: 6, m: 6, energy: 0.9, cat: "sacred" },
        { name: "Metatron", n: 13, m: 13, energy: 1.0, cat: "sacred" },
        { name: "Vector Eq", n: 2, m: 2, energy: 0.4, cat: "geometry" },
        { name: "Fibonacci", n: 1, m: 8, energy: 0.7, cat: "radial" },
        { name: "Torus Vortex", n: 15, m: 5, energy: 0.8, cat: "geometry" },
        { name: "Mandelbrot", n: 8, m: 4, energy: 0.8, cat: "geometry" },
        { name: "Julia Loop", n: 5, m: 5, energy: 0.7, cat: "geometry" },
        { name: "Recursive", n: 10, m: 4, energy: 0.9, cat: "geometry" },
        { name: "Polygon", n: 4, m: 4, energy: 0.6, cat: "geometry" },
        { name: "Lattice", n: 6, m: 2, energy: 0.6, cat: "geometry" },
        { name: "Star Gate", n: 7, m: 3, energy: 1.0, cat: "sacred" },
        { name: "Neural Flow", n: 12, m: 12, energy: 1.1, cat: "complex" },
        { name: "Quantum", n: 5, m: 13, energy: 1.2, cat: "complex" },
        { name: "Golden Rat", n: 11, m: 3, energy: 0.9, cat: "radial" },
        { name: "Celestial", n: 9, m: 9, energy: 1.0, cat: "sacred" },
        { name: "Void Geo", n: 20, m: 2, energy: 1.2, cat: "complex" },
        { name: "Infinite", n: 13, m: 17, energy: 1.3, cat: "complex" },
        { name: "Prism Mirror", n: 3, m: 3, energy: 0.5, cat: "geometry" },
        { name: "Cosmic Knot", n: 7, m: 14, energy: 1.1, cat: "complex" },
        { name: "Matrix Core", n: 21, m: 3, energy: 1.4, cat: "complex" },
        { name: "Omega Sphere", n: 2, m: 8, energy: 0.9, cat: "sacred" },
        { name: "Fractal Lace", n: 1, m: 10, energy: 0.8, cat: "geometry" },
        { name: "Torus Core", n: 33, m: 15, energy: 0.9, cat: "geometry" },
        { name: "Fractal Sun", n: 11, m: 88, energy: 1.0, cat: "complex" },
        { name: "Spiral Net", n: 8, m: 120, energy: 0.6, cat: "geometry" },
        { name: "Fluid Whorl", n: 50, m: 14, energy: 1.2, cat: "complex" },
        { name: "Synchro", n: 121, m: 12, energy: 1.1, cat: "sacred" },
        { name: "Unified", n: 77, m: 7, energy: 0.9, cat: "sacred" },
        { name: "Omega", n: 13, m: 133, energy: 1.4, cat: "complex" },
        { name: "Source", n: 1, m: 1, energy: 1.5, cat: "sacred" },
        { name: "Sun Tone", n: 420, m: 42, energy: 1.2, cat: "radial" },
        { name: "Sirius", n: 64, m: 250, energy: 1.1, cat: "radial" },
        { name: "Earth", n: 240, m: 36, energy: 0.9, cat: "radial" },
        { name: "Moon", n: 45, m: 450, energy: 1.4, cat: "complex" },
        { name: "Mercury", n: 800, m: 50, energy: 1.3, cat: "radial" },
        { name: "Venus", n: 120, m: 720, energy: 1.0, cat: "geometry" },
        { name: "Mars", n: 333, m: 33, energy: 1.1, cat: "complex" },
        { name: "Jupiter", n: 900, m: 30, energy: 1.0, cat: "radial" },
        { name: "Saturn", n: 1200, m: 60, energy: 1.5, cat: "complex" },
        { name: "Gold Ratio", n: 144, m: 89, energy: 0.8, cat: "radial" }
    ];

    nextCymatic() {
        if (window.state && window.state.aiVisualsLocked) {
            window.state.aiVisualsLocked = false;
            const aiBtn = document.getElementById('cymaticAiBtn');
            if (aiBtn) aiBtn.style.borderColor = 'rgba(34, 211, 238, 0.2)'; 
        }

        const patterns = Visualizer3D.CYMATIC_PATTERNS;
        let idx = 0;
        if (this.currentCymaticData) {
             idx = patterns.findIndex(p => p.name === this.currentCymaticData.name);
             if (idx === -1) idx = 0;
        }
        
        let nextIdx = (idx + 1) % patterns.length;
        this.cymaticsHistory.push(patterns[nextIdx]);
        if (this.cymaticsHistory.length > 50) this.cymaticsHistory.shift();
        this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
        this.applyCymatic(patterns[nextIdx]);
        this.lastCymaticRotation = performance.now();
    }

    prevCymatic() {
        if (window.state && window.state.aiVisualsLocked) {
            window.state.aiVisualsLocked = false;
            const aiBtn = document.getElementById('cymaticAiBtn');
            if (aiBtn) aiBtn.style.borderColor = 'rgba(34, 211, 238, 0.2)'; 
        }

        const patterns = Visualizer3D.CYMATIC_PATTERNS;
        let idx = 0;
        if (this.currentCymaticData) {
             idx = patterns.findIndex(p => p.name === this.currentCymaticData.name);
             if (idx === -1) idx = 0;
        }
        
        let prevIdx = (idx - 1 + patterns.length) % patterns.length;
        this.cymaticsHistory.push(patterns[prevIdx]);
        if (this.cymaticsHistory.length > 50) this.cymaticsHistory.shift();
        this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
        this.applyCymatic(patterns[prevIdx]);
        this.lastCymaticRotation = performance.now();
    }

    setupCymaticsInteractions() {
        if (!this.renderer || !this.renderer.domElement) return;
        const canvas = this.renderer.domElement;

        const updateMouse = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip y for GLSL
            
            if (this.cymaticMaterial) {
                this.cymaticMaterial.uniforms.uMouse.value.set(x, y);
            }
        };

        canvas.addEventListener('pointerdown', (e) => {
            if (this.cymaticMaterial) this.cymaticMaterial.uniforms.uMouseActive.value = 1.0;
            updateMouse(e);
        });

        canvas.addEventListener('pointermove', (e) => {
            updateMouse(e);
        });

        const stopMouse = () => {
            if (this.cymaticMaterial) this.cymaticMaterial.uniforms.uMouseActive.value = 0.0;
        };

        canvas.addEventListener('pointerup', stopMouse);
        canvas.addEventListener('pointerleave', stopMouse);
    }

    applyCymatic(data) {
        if (!data || !this.cymaticMaterial) return;
        this.currentCymaticData = data;
        const u = this.cymaticMaterial.uniforms;
        u.uN.value = data.n;
        u.uM.value = data.m;
        
        // Map category to pattern type
        if (data.cat === 'sacred') u.uType.value = 0.0;
        else if (data.cat === 'geometry') u.uType.value = 1.0;
        else if (data.cat === 'radial') u.uType.value = 2.0;
        else u.uType.value = 3.0; // complex

        u.uEnergy.value = data.energy || 0.5;
        
        // Update UI Label
        const label = document.getElementById('cymaticPatternLabel');
        if (label && data.name) {
            label.textContent = data.name;
            label.style.textShadow = '0 0 15px rgba(180, 120, 255, 1)';
            setTimeout(() => {
                label.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.3)';
            }, 300);
        }
        // Clear all previous backgrounds and border states
        document.querySelectorAll('.cymatics-pattern-btn').forEach((btn) => {
            btn.classList.remove('cymatics-pattern-active');
            btn.style.backgroundColor = '';
            btn.style.borderColor = '';
            
            const clickAttr = btn.getAttribute('onclick');
            if (clickAttr) {
                const match = clickAttr.match(/\d+/);
                if (match) {
                    const idx = parseInt(match[0]);
                    const p = Visualizer3D.CYMATIC_PATTERNS[idx];
                    if (p && data && p.name === data.name) {
                        btn.classList.add('cymatics-pattern-active');
                        btn.style.backgroundColor = 'rgba(168, 85, 247, 0.35)'; // Failsafe explicit style
                        btn.style.borderColor = 'rgba(168, 85, 247, 0.9)';
                    }
                }
            }
        });
    }

    setVisualColor(hex, mode = null) {
        const col = new THREE.Color(hex);
        if (!mode || mode === 'all') {
            this.customColor = col;
            // Inject into all active materials for global override
            if (this.cymaticMaterial) this.cymaticMaterial.uniforms.uColor.value.copy(col);
            if (this._snowData?.material) this._snowData.material.uniforms.uColor.value.copy(col);
            return;
        }

        // Store per-mode color
        this.customColors[mode] = col;
        
        // Instant update if system is active
        if (mode === 'cymatics' && this.cymaticMaterial) this.cymaticMaterial.uniforms.uColor.value.copy(col);
        if (mode === 'snowflake' && this._snowData?.material) this._snowData.material.uniforms.uColor.value.copy(col);
        if (mode === 'ocean' && this.waveMaterial) this.waveMaterial.uniforms.uColor.value.copy(col);
    }

    setCymaticPatternByIndex(idx) {
        console.log(`[Cymatics] Setting pattern by index: ${idx}`);
        
        // CRITICAL: Unlock AI-Sync engine so manual triggers persist without being overwritten on the next animation frame.
        if (window.state && window.state.aiVisualsLocked) {
            window.state.aiVisualsLocked = false;
            const aiBtn = document.getElementById('cymaticAiBtn');
            if (aiBtn) aiBtn.style.borderColor = 'rgba(34, 211, 238, 0.2)'; // Dim the UI border instantly
        }

        const p = Visualizer3D.CYMATIC_PATTERNS[idx];
        if (p) {
            this.cymaticsHistory.push(p);
            this.cymaticsHistoryIndex = this.cymaticsHistory.length - 1;
            this.applyCymatic(p);
            this.lastCymaticRotation = performance.now();
        } else {
            console.warn(`[Cymatics] Pattern at index ${idx} not found.`);
        }
    }

    setCymaticColor(hex) {
        this.currentCymaticColor = hex;
        if (this.cymaticMaterial)
            this.cymaticMaterial.uniforms.uColor.value.set(hex);
    }

    setCymaticFreq(hz) {
        if (this.cymaticMaterial)
            this.cymaticMaterial.uniforms.uFreq.value = Math.max(0, Math.min(80, hz));
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
        this.lavaBlobs = [];
        const blobCount = 16;
        this.lavaUniforms = {
            uBlobs: { value: [] },
            uColor: { value: new THREE.Color(state.visualColors?.lava || 0xff6600) },
            uSecondaryColor: { value: new THREE.Color(0xffaa00) },
            uTime: { value: 0 },
            uIntensity: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        };

        for (let i = 0; i < blobCount; i++) {
            this.lavaUniforms.uBlobs.value.push(new THREE.Vector4(0, -100, 0, 0));
        }

        const material = new THREE.ShaderMaterial({
            uniforms: this.lavaUniforms,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform vec4 uBlobs[16];
                uniform vec3 uColor;
                uniform vec3 uSecondaryColor;
                uniform float uTime;
                uniform float uIntensity;

                void main() {
                    // Center UV coordinates (-1 to 1) and extend bounds
                    // The plane is large, so vUv spans the entire background.
                    vec2 uv = (vUv - 0.5) * 50.0; // scale up to coordinate space of physics (-25 to +25)

                    float sum = 0.0;
                    vec2 grad = vec2(0.0);

                    // Compute Metaball density and gradient (pseudo-normals)
                    for(int i = 0; i < 16; i++) {
                        vec2 pos = uBlobs[i].xy;
                        float radius = uBlobs[i].w * 1.5; // Scale up impact
                        if(radius < 0.1) continue;

                        vec2 d = uv - pos;
                        float distSq = dot(d, d) + 0.1; // avoid divide by zero
                        float density = (radius * radius) / distSq;
                        sum += density;
                        
                        // Accumulate gradient for fake 3D normal
                        grad -= d * (2.0 * density / distSq);
                    }

                    // Threshold and smoothing
                    float threshold = 1.0;
                    // Outer glow / smoothing band
                    float f = smoothstep(threshold - 0.4, threshold + 0.1, sum);
                    
                    if (f <= 0.0) {
                        gl_FragColor = vec4(0.0);
                        return;
                    }

                    // Fake 3D Normal from gradient
                    vec3 normal = normalize(vec3(grad * 1.5, 1.0));
                    
                    // Height-based temperature mapping
                    float yNorm = clamp((uv.y + 15.0) / 30.0, 0.0, 1.0);
                    vec3 baseCol = mix(uSecondaryColor, uColor, yNorm);

                    // Lighting
                    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
                    vec3 viewDir = vec3(0.0, 0.0, 1.0);
                    vec3 halfDir = normalize(lightDir + viewDir);

                    float diff = max(dot(normal, lightDir), 0.0);
                    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
                    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);

                    // Color combination
                    vec3 col = baseCol * (0.3 + 0.7 * diff);
                    col += vec3(1.0) * spec * (0.5 + uIntensity);
                    col += baseCol * fresnel * 2.0;

                    gl_FragColor = vec4(col, f * 0.95);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        // A large screen-aligned plane to host the Raymarching shader
        const geometry = new THREE.PlaneGeometry(100, 100);
        const lavaPlane = new THREE.Mesh(geometry, material);
        lavaPlane.position.z = -5; // Foreground depth within scene
        
        // Logical Blobs for Physics Loop
        const sizeCategories = [
            { count: 5, minSize: 1.0, maxSize: 1.5 },   // Small
            { count: 7, minSize: 1.5, maxSize: 2.2 },   // Medium
            { count: 4, minSize: 2.2, maxSize: 3.5 }    // Large
        ];

        sizeCategories.forEach(category => {
            for (let i = 0; i < category.count; i++) {
                const size = category.minSize + Math.random() * (category.maxSize - category.minSize);
                const states = ['heating', 'rising', 'cooling', 'falling'];
                const startState = states[Math.floor(Math.random() * states.length)];

                const floatMin = -18 + (Math.random() * 4); // Bottom pile
                const floatMax = 18 + (Math.random() * 4);  // Top pile

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

                this.lavaBlobs.push({
                    position: new THREE.Vector3((Math.random() - 0.5) * 12, startY, (Math.random() - 0.5) * 6),
                    material: { uniforms: { uTemp: {value:0}, uIntensity: {value:0}, uTime: {value:0} } }, // Mock mesh properties for render loop compatibility
                    userData: {
                        baseSize: size,
                        state: startState,
                        temperature: startTemp,
                        floatMin: floatMin,
                        floatMax: floatMax,
                        heatRate: 0.15 + Math.random() * 0.3,
                        coolRate: 0.15 + Math.random() * 0.3,
                        riseSpeed: (0.04 + Math.random() * 0.05) / (size * 0.5),
                        fallSpeed: (0.05 + Math.random() * 0.05) / (size * 0.5),
                        driftPhase: Math.random() * Math.PI * 2,
                        driftSpeed: 0.01 + Math.random() * 0.02
                    }
                });
            }
        });

        this.lavaGroup.add(lavaPlane);
        this.lavaGroup.visible = false;
        console.log('[Visualizer] Thermal Fluid Dynamics (Lava V2) globally initialized.');
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
        if (mode === 'snowflake' && this.snowflakeGroup && this.snowflakeGroup.children.length === 0) this.initSnowflake();
        if (mode === 'cymatics' && this.cymaticsGroup && this.cymaticsGroup.children.length === 0) this.initCymatics();
        if (mode === 'waves' && this.wavesGroup && this.wavesGroup.children.length === 0) this.initWaves();
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
        const mapping = {
            'cube': 'box',
            'flow': 'particles',
            'zen': 'zengarden',
            'rain': 'rainforest',
            'interstellar': 'matrix',
            'ocean': 'waves'
        };
        return mapping[mode] || mode;
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
            // --- NON-DESTRUCTIVE EXCLUSIVITY ---
            if (target === 'cymatics') {
                console.log('[Engine] Cymatics engaged');
                // We keep Snowflake if both are wanted, but usually Cymatics covers the screen
            } else if (this.activeModes.has('cymatics') && target !== 'snowflake') {
                 // Only clear cymatics if entering a fundamental base mode like galaxy/dragon
                 this.activeModes.delete('cymatics');
            }
            this.activeModes.add(target);
        }
        
        this.active = (this.activeModes.size > 0);
        this.updateVisibility();
        this.updateLabel(target);

        // Ensure dependents are initialized
        this.activeModes.forEach(m => this.ensureInitialized(m));

        // BRUTE FORCE LOOP RESTART
        if (this.initialized && this.active) {
            if (state.animationId) cancelAnimationFrame(state.animationId);
            state.animationId = null;
            this.render();
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
        
        // Notify UI to update button states
        window.dispatchEvent(new CustomEvent('mindwave:visual-mode-sync', { 
            detail: { activeModes: Array.from(this.activeModes) } 
        }));

        // Ensure strings are regenerated if mode changed
        if (this.updateCyberStrings) this.updateCyberStrings();
    }

    toggleGalaxySunStyle() {
        const nextStyle = this.galaxySunStyle === 'sun' ? 'sun2' : (this.galaxySunStyle === 'sun2' ? 'sun3' : 'sun');
        console.log(`[Visualizer] Toggling Galaxy Sun: ${this.galaxySunStyle} -> ${nextStyle}`);
        this.setGalaxySunStyle(nextStyle);
        return nextStyle;
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
        if (this.boxGroup) this.boxGroup.visible = this.activeModes.has('box');
        if (this.dragonGroup) this.dragonGroup.visible = this.activeModes.has('dragon');
        if (this.galaxyGroup) this.galaxyGroup.visible = this.activeModes.has('galaxy');
        if (this.mandalaGroup) this.mandalaGroup.visible = this.activeModes.has('mandala');
        if (this.cymaticsGroup) this.cymaticsGroup.visible = this.activeModes.has('cymatics');
        
        // Snowflake Layering Logic: Show snow particles explicitly or when layered with ICE medium
        if (this.snowflakeGroup) {
            const isIceMedium = this.cymaticMaterial && Math.abs(this.cymaticMaterial.uniforms.uMedium.value - 3.0) < 0.1;
            this.snowflakeGroup.visible = this.activeModes.has('snowflake') || (this.activeModes.has('cymatics') && isIceMedium);
        }

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
        if (this.cymaticsGroup) {
            this.cymaticsGroup.visible = this.activeModes.has('cymatics');
            this.cymaticsGroup.position.z = 2.0; // Bring closer to camera for dominance
        }
        if (this.snowflakeGroup) this.snowflakeGroup.visible = this.activeModes.has('snowflake');

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
            else if (mode === 'waves') label.textContent = "WAVES";
            else if (mode === 'lava') label.textContent = "LAVA LAMP";
            else if (mode === 'fireplace') label.textContent = "FIREPLACE";
            else if (mode === 'rainforest') label.textContent = "RAINFOREST";
            else if (mode === 'zengarden') label.textContent = "ZEN GARDEN";
            else if (mode === 'ocean') label.textContent = "OCEAN";
            else if (mode === 'cymatics') label.textContent = "CYMATICS";
            else if (mode === 'cyber') label.textContent = "CYBER";
            else if (mode === 'matrix') label.textContent = "MATRIX";
            else if (mode === 'snowflake') label.textContent = "SNOWFALL";
            else if (mode === 'multi') label.textContent = "MULTI-SENSORY";
            else label.textContent = "";
        }
    }

    initWaves() {
        if (!this.wavesGroup) {
            this.wavesGroup = new THREE.Group();
            this.scene.add(this.wavesGroup);
        }
        // Clear any existing children
        while (this.wavesGroup.children.length > 0) {
            const child = this.wavesGroup.children[0];
            this.wavesGroup.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
        }

        // High-precision ocean plane for 'Kinematic Bioluminescence'
        const geometry = new THREE.PlaneGeometry(80, 80, 160, 160);
        this.wavesMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: this.customColor ? new THREE.Color(this.customColor) : new THREE.Color(0x0066FF) },
                uSecondaryColor: { value: new THREE.Color(0x00F2FF) },
                uIntensity: { value: 1.0 },
                uNormBass: { value: 0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vElevation;
                varying vec3 vNormal;
                uniform float uTime, uNormBass;
                
                float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
                float noise(vec2 p) {
                    vec2 i = floor(p); vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
                }

                // Gerstner Wave implementation for sharp crests
                vec3 gWave(vec2 p, float t, float a, float s, float w, vec2 d) {
                    float f = w * dot(d, p) + t * s;
                    return vec3(d.x * a * cos(f), d.y * a * cos(f), a * sin(f));
                }

                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Layer 1: Fundamental Tides
                    pos += gWave(pos.xy, uTime * 1.2, 1.2, 1.5, 0.25, vec2(1, 0));
                    pos += gWave(pos.xy, uTime * 0.8, 1.0, 1.2, 0.18, vec2(0, 1));
                    
                    // Layer 2: Audio-Reactive Ripples
                    float audioDisp = noise(pos.xy * 0.4 + uTime) * (1.5 + uNormBass * 3.5);
                    pos.z += audioDisp;

                    vElevation = pos.z;
                    // Approximate normal for lighting
                    vNormal = normalize(vec3(-dFdx(pos.z), -dFdy(pos.z), 1.0));
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying float vElevation;
                varying vec3 vNormal;
                uniform vec3 uColor, uSecondaryColor;
                uniform float uNormBass, uTime;

                void main() {
                    // Deep sea gradient
                    float depth = smoothstep(-2.0, 4.0, vElevation);
                    vec3 deepCol = mix(uColor * 0.2, uColor, depth);
                    vec3 shallowCol = mix(uSecondaryColor, vec3(1.0), uNormBass * 0.4);
                    
                    vec3 col = mix(deepCol, shallowCol, depth);
                    
                    // Specular Highlights (Bioluminescent cresting)
                    float spec = pow(max(vNormal.z, 0.0), 32.0);
                    col += spec * (0.4 + uNormBass * 0.8) * uSecondaryColor;
                    
                    // Dynamic Foam / Bioluminescence
                    float foam = smoothstep(2.5, 4.5, vElevation + uNormBass * 2.0);
                    col = mix(col, vec3(0.8, 1.0, 1.0), foam);
                    
                    // Cinematic Vignette
                    float vig = 1.0 - length(vUv - 0.5) * 1.2;

                    gl_FragColor = vec4(col * vig, 0.75 + uNormBass * 0.2);
                }
            `,
            transparent: true,
            wireframe: false,
            side: THREE.DoubleSide
        });

        this.wavesMesh = new THREE.Mesh(geometry, this.wavesMaterial);
        this.wavesMesh.rotation.x = -Math.PI / 2.8;
        this.wavesMesh.position.y = -8;
        this.wavesMesh.position.z = -15;
        this.wavesGroup.add(this.wavesMesh);
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

        try {
            const setMatColor = (mat) => {
                if (!mat) return;
                if (mat.color && typeof mat.color.set === 'function') {
                    mat.color.set(hex);
                } else if (mat.uniforms && mat.uniforms.uColor) {
                    mat.uniforms.uColor.value.set(hex);
                }
            };

            if (this.particles && this.particles.material) setMatColor(this.particles.material);
            if (this.lightspeed && this.lightspeed.material) setMatColor(this.lightspeed.material);
            if (this.sphere && this.sphere.material) {
                setMatColor(this.sphere.material);
                if (this.core && this.core.material) setMatColor(this.core.material);
            }
            if (mode === 'box' || !mode || mode === 'all') {
                if (this.boxOuter) this.boxOuter.children.forEach(c => setMatColor(c.material));
                if (this.boxInner) this.boxInner.children.forEach(c => setMatColor(c.material));
                if (this.boxEdges && this.boxEdges.material) setMatColor(this.boxEdges.material);
            }
            if (mode === 'mandala') {
                if (this.mandalaRings) this.mandalaRings.forEach(r => setMatColor(r.material));
                if (this.mandalaCenter && this.mandalaCenter.material) setMatColor(this.mandalaCenter.material);
            }
            
            if (this.wavesMesh && this.wavesMesh.material) setMatColor(this.wavesMesh.material);
            if (this.lavaBlobs) this.lavaBlobs.forEach(blob => setMatColor(blob.material));
            if (this.lavaGlow && this.lavaGlow.material) setMatColor(this.lavaGlow.material);
            if (this.flames && this.flames.material) setMatColor(this.flames.material);
            if (this.raindrops && this.raindrops.material) setMatColor(this.raindrops.material);
            if (this.petals && this.petals.material) setMatColor(this.petals.material);
            if (this.zenWater && this.zenWater.material) setMatColor(this.zenWater.material);
            if (this.oceanWave && this.oceanWave.material) setMatColor(this.oceanWave.material);
            if (this.oceanFoam && this.oceanFoam.material) setMatColor(this.oceanFoam.material);
            
            if (this.cyberRain && this.cyberRain.material) {
                if (this.cyberRain.material.uniforms && this.cyberRain.material.uniforms.uColor) {
                    this.cyberRain.material.uniforms.uColor.value.set(hex);
                }
            }
            if (this.logoMesh && this.originalLogoImg) {
                this.updateLogoTexture();
            }
            if (this.dragonGroup && this.updateDragonColor) {
                this.updateDragonColor(new THREE.Color(hex));
            }
            if (this.galaxyStars || this.galaxySunMesh) {
                this.updateGalaxyColor(new THREE.Color(hex));
            }
            if (this.cymaticMaterial && this.cymaticMaterial.uniforms?.uColor) {
                this.cymaticMaterial.uniforms.uColor.value.set(hex);
            }
            if (this._snowData?.material?.uniforms?.uColor) {
                this._snowData.material.uniforms.uColor.value.set(hex);
            }
        } catch (err) {
            console.warn("[Visualizer] setColor encountered a safe-skip error:", err);
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
        if (!this.initialized || !this.renderer || document.hidden) return;

        try {
            if (!analyserL && state.analyserLeft) analyserL = state.analyserLeft;

            let normBass = 0, normMids = 0, normHighs = 0;
            if (analyserL) {
                const binCount = analyserL.frequencyBinCount;
                if (!this._freqDataArray || this._freqDataArray.length !== binCount) {
                    this._freqDataArray = new Uint8Array(binCount);
                }
                analyserL.getByteFrequencyData(this._freqDataArray);
                let bass = 0; for (let i = 0; i < 15; i++) bass += this._freqDataArray[i];
                normBass = Math.pow((bass / 15) / 255, 0.8); // Apply power curve for better sensitivity
                let mids = 0; for (let i = 10; i < 100; i++) mids += this._freqDataArray[i];
                normMids = (mids / 90) / 255;
                let highs = 0; for (let i = 100; i < 300; i++) highs += this._freqDataArray[i];
                normHighs = (highs / 200) / 255;
            }

            const multiplier = this.speedMultiplier || 1.0;
            const now = performance.now() * 0.001;
            if (!this.lastTime) this.lastTime = now;
            const dt = Math.min(0.1, now - this.lastTime);
            this.lastTime = now;
            
            const visualBeatFreq = state.visualSpeedAuto ? (state.beatFrequency || 10) : (multiplier * 10);
            const beatPulse = (Math.sin(now * Math.PI * 2 * visualBeatFreq) * 0.5) + 0.5;
            const vFactor = this.vibrationEnabled ? 1.0 : 0.0;
            const vBeatPulse = beatPulse * vFactor;
            const vNormBass = normBass * vFactor;

            // ── Update Logic for all active modes ──────────────────────────
            if (this.activeModes.has('galaxy') && this.galaxyGroup) {
                const baseRotY = this.sunRotationSpeedY || 0.002;
                const baseRotZ = this.sunRotationSpeedZ || 0.0005;

                if (this.galaxyStars) {
                    this.galaxyStars.rotation.y += baseRotY * multiplier * 0.5;
                    this.galaxyStars.rotation.z += baseRotZ * multiplier * 0.5;
                }
                
                if (this.galaxySunMesh) {
                    this.galaxySunMesh.rotation.z -= baseRotZ * multiplier * 1.5;
                    this.galaxySunMesh.rotation.y += baseRotY * multiplier * 2.0;

                    const scaleBoost = 1.0 + (vNormBass * 0.15 * (this.galaxySunStyle === 'sun3' ? 2.5 : 1.0));
                    this.galaxySunMesh.scale.setScalar(scaleBoost);
                }
                
                if (this.galaxySunUniforms) {
                    this.galaxySunUniforms.uTime.value = now * multiplier;
                    this.galaxySunUniforms.uBassIntt.value = vNormBass;
                    if (this._cymaticV2 && this._cymaticV2.shiver > 0.5) {
                        this.galaxySunUniforms.uTime.value += this._cymaticV2.shiver * 0.05;
                    }
                }
            }

            if (this.activeModes.has('sphere') && this.sphere) {
                this.sphere.scale.setScalar(1.0 + (vNormBass * 0.15));
                this.sphere.rotation.y += 0.005 * multiplier;
            }
            if (this.activeModes.has('particles') && this.particles) {
                const flowSpeed = (0.015 * multiplier) + (vNormBass * 0.08);
                const pos = this.particles.geometry.attributes.position.array;
                for (let i = 2; i < pos.length; i += 3) {
                    pos[i] += flowSpeed * 10;
                    if (pos[i] > 40) pos[i] = -40;
                }
                this.particles.geometry.attributes.position.needsUpdate = true;
            }
            if (this.activeModes.has('waves') && this.wavesMaterial) {
                this.wavesMaterial.uniforms.uTime.value = now * multiplier * 0.5;
                this.wavesMaterial.uniforms.uNormBass.value = vNormBass;
            }
            if (this.activeModes.has('cymatics') && this.cymaticMaterial) {
                // Phase 3: Interactive Raycast Initialization
                if (!this.cymaticRaycaster) {
                    this.cymaticRaycaster = new THREE.Raycaster();
                    this.cymaticPointer = new THREE.Vector2(-1, -1);
                    this.targetMouseUV = new THREE.Vector2(0.5, 0.5);
                    this.smoothedMouseUV = new THREE.Vector2(0.5, 0.5);
                    this.mouseActiveTimer = 0.0;
                    
                    const handlePointer = (e) => {
                        let cx = e.clientX; let cy = e.clientY;
                        if (e.touches && e.touches.length > 0) { cx = e.touches[0].clientX; cy = e.touches[0].clientY; }
                        this.cymaticPointer.x = (cx / window.innerWidth) * 2 - 1;
                        this.cymaticPointer.y = -(cy / window.innerHeight) * 2 + 1;
                        this.mouseActiveTimer = 1.0;
                    };
                    window.addEventListener('mousemove', handlePointer);
                    window.addEventListener('touchmove', handlePointer, {passive: true});
                }

                // Initialize live tracking if missing
                if (!this._cymaticLive) {
                    this._cymaticLive = { 
                        n: this.currentCymaticData.n, 
                        m: this.currentCymaticData.m,
                        energy: this.currentCymaticData.energy || 0.5
                    };
                }

                // Phase 3: Raycast Intersection Loop
                if (this.cymaticPointer && this.cymaticsGroup) {
                    const planeMesh = this.cymaticsGroup.children.find(c => c.geometry && c.geometry.type === 'PlaneGeometry');
                    if (planeMesh && this.mouseActiveTimer > 0) {
                        this.cymaticRaycaster.setFromCamera(this.cymaticPointer, this.camera);
                        const intersects = this.cymaticRaycaster.intersectObject(planeMesh);
                        if (intersects.length > 0) {
                            this.targetMouseUV.copy(intersects[0].uv);
                        }
                    }
                    this.mouseActiveTimer = Math.max(0.0, this.mouseActiveTimer - (dt * 2.5));
                    this.smoothedMouseUV.lerp(this.targetMouseUV, 0.15);
                    
                    this.cymaticMaterial.uniforms.uMouse.value.copy(this.smoothedMouseUV);
                    this.cymaticMaterial.uniforms.uMouseActive.value = this.mouseActiveTimer > 0.05 ? 1.0 : (this.mouseActiveTimer * 20.0);
                }

                // ── AI SYNC & AUTO ROTATE ── 
                if (state.aiVisualsLocked && state.baseFrequency) {
                    // AI SYNC: Instantly tie fractal math to audio frequency
                    this.currentCymaticData.n = Math.max(1, Math.floor(state.baseFrequency / 80));
                    this.currentCymaticData.m = Math.max(1, Math.floor((state.baseFrequency % 100) / 6) + 3);
                } else {
                    // AUTO ROTATE: Only cycle if AI Sync is off and timer is > 0
                    const timer = this.cymaticsTimer !== undefined ? this.cymaticsTimer : 30;
                    if (timer > 0) {
                        if (!this.lastCymaticRotation) this.lastCymaticRotation = performance.now();
                        if ((performance.now() - this.lastCymaticRotation) > timer * 1000) {
                            this.nextCymatic();
                            if (this._cymaticV2) this._cymaticV2.shiver = 1.0; 
                        }
                    }
                }

                // SMOOTH MORPHING: Lerp values toward targets (Ultra-smooth float logic)
                // Lowered generic array interpolation speed to establish a buttery gradient rather than rapid snapping
                const lerpSpd = 0.015;
                this._cymaticLive.n += (this.currentCymaticData.n - this._cymaticLive.n) * lerpSpd;
                this._cymaticLive.m += (this.currentCymaticData.m - this._cymaticLive.m) * lerpSpd;
                
                const targetEnergy = (this.currentCymaticData.energy || 0.4) + (normHighs * 0.6);
                this._cymaticLive.energy += (targetEnergy - this._cymaticLive.energy) * (lerpSpd * 2.0);

                // MULTI-DIMENSIONAL INTERFERENCE (Bass vs. Highs)
                if (!this._cymaticV2) {
                    this._cymaticV2 = { bassN: 1, bassM: 1, highN: 5, highM: 5, shiver: 0 };
                }

                // REPAIRED: Prevented destructive integer-snapping on fast-moving audio arrays
                // Using true floating point math here creates liquid geometry that smoothly curves rather than violently teleporting
                const targetBassN = 1.0 + Math.pow(vNormBass, 1.5) * 3.0;
                const targetBassM = 1.0 + Math.pow(vNormBass, 1.5) * 5.0;
                const targetHighN = 5.0 + Math.pow(normHighs, 2.0) * 10.0;
                const targetHighM = 5.0 + Math.pow(normHighs, 2.0) * 15.0;

                this._cymaticV2.bassN += (targetBassN - this._cymaticV2.bassN) * 0.05;
                this._cymaticV2.bassM += (targetBassM - this._cymaticV2.bassM) * 0.05;
                this._cymaticV2.highN += (targetHighN - this._cymaticV2.highN) * 0.12;
                this._cymaticV2.highM += (targetHighM - this._cymaticV2.highM) * 0.12;

                const peak = Math.max(0, vNormBass - 0.85) * 5.0;
                this._cymaticV2.shiver += (peak - this._cymaticV2.shiver) * 0.2;
                if (this._cymaticV2.shiver < 0.01) this._cymaticV2.shiver = 0;

                // Softened the phase shifting so heavy hits pulse cleanly rather than glitching the mask rendering
                if (this._cymaticV2.shiver > 0.8 && performance.now() % 100 > 90) {
                     this._cymaticLive.energy += 0.05; // Safely blend into the smoothing structure instead of a hard uniform overwrite
                }

                this.cymaticMaterial.uniforms.uTime.value = now * multiplier;
                this.cymaticMaterial.uniforms.uIntensity.value = (this._cymaticIntensityOverride !== undefined && this._cymaticIntensityOverride !== null) 
                    ? this._cymaticIntensityOverride 
                    : (0.5 + vNormBass * 0.5);
                this.cymaticMaterial.uniforms.uHarmonics.value = state.harmonicsLevel || 0.0;
                this.cymaticMaterial.uniforms.uBeatFreq.value = visualBeatFreq;
                this.cymaticMaterial.uniforms.uNormMids.value = normMids;
                this.cymaticMaterial.uniforms.uNormHighs.value = normHighs;
                this.cymaticMaterial.uniforms.uMedium.value = state.cymaticMedium || 0.0;
                this.cymaticMaterial.uniforms.uShiver.value = this._cymaticV2.shiver;

                this.cymaticMaterial.uniforms.uN.value = this._cymaticLive.n;
                this.cymaticMaterial.uniforms.uM.value = this._cymaticLive.m;
                this.cymaticMaterial.uniforms.uEnergy.value = this._cymaticLive.energy;
                
                this.cymaticMaterial.uniforms.uBassN.value = this._cymaticV2.bassN;
                this.cymaticMaterial.uniforms.uBassM.value = this._cymaticV2.bassM;
                this.cymaticMaterial.uniforms.uHighN.value = this._cymaticV2.highN;
                this.cymaticMaterial.uniforms.uHighM.value = this._cymaticV2.highM;
            }

            // ── Lotus / Logo ──────────────────────────────────────────────
            if (this.logoMesh) {
                const lotusMode = state.lotusState || 'auto';
                let lotusAlpha = 0.8;
                if (lotusMode === 'faded') lotusAlpha = 0.15;
                else if (lotusMode === 'full') lotusAlpha = 1.0;
                else if (lotusMode === 'heartbeat') lotusAlpha = 0.2 + 0.8 * beatPulse;
                else lotusAlpha = 0.4 + (vNormBass * 0.6);

                if (this._lotusCurrentOpacity === undefined) this._lotusCurrentOpacity = 0.8;
                this._lotusCurrentOpacity += (lotusAlpha - this._lotusCurrentOpacity) * 0.1;
                this.logoMesh.material.opacity = this._lotusCurrentOpacity;
                this.logoMesh.scale.setScalar(1.0 + vNormBass * (0.05 + this._cymaticV2?.shiver * 0.1) + vBeatPulse * 0.02);
            }

            // ── LAVA BLOBS / THERMAL FLUIDS ──────────────────────────────
            if (this.activeModes.has('lava') && this.lavaBlobs && this.lavaUniforms) {
                this.lavaUniforms.uTime.value = now * multiplier;
                this.lavaUniforms.uIntensity.value = vNormBass;

                this.lavaBlobs.forEach((blob, i) => {
                    const d = blob.userData;
                    const spdMult = multiplier * (1.0 + vNormBass * 0.8);
                    
                    if (d.state === 'heating') {
                        d.temperature += d.heatRate * dt * spdMult;
                        if (d.temperature >= 1.0) { d.temperature = 1.0; d.state = 'rising'; }
                    } else if (d.state === 'rising') {
                        blob.position.y += d.riseSpeed * spdMult;
                        if (blob.position.y >= d.floatMax) d.state = 'cooling';
                    } else if (d.state === 'cooling') {
                        d.temperature -= d.coolRate * dt * spdMult;
                        if (d.temperature <= 0.0) { d.temperature = 0.0; d.state = 'falling'; }
                    } else if (d.state === 'falling') {
                        blob.position.y -= d.fallSpeed * spdMult;
                        if (blob.position.y <= d.floatMin) d.state = 'heating';
                    }
                    
                    // Horizontal Thermal Drift
                    blob.position.x += Math.sin(now * d.driftSpeed + d.driftPhase) * 0.02 * spdMult;

                    // Push unified shader vector (x, y, z, size*temp)
                    if (this.lavaUniforms.uBlobs.value[i]) {
                        const effectiveRadius = d.baseSize * (0.8 + 0.5 * d.temperature);
                        this.lavaUniforms.uBlobs.value[i].set(blob.position.x, blob.position.y, blob.position.z, effectiveRadius);
                    }
                });
            }

            // ── SNOWFALL / CRYSTAL DRIFT ──────────────────────────────────
            if (this.snowflakeGroup && this.snowflakeGroup.visible && this._snowData) {
                const s = this._snowData;
                const pos = s.points.geometry.attributes.position.array;
                const spdMult = multiplier * 2.0;

                for (let i = 0; i < s.count; i++) {
                    const i3 = i * 3;
                    
                    // Vertical Fall
                    pos[i3 + 1] -= s.speeds[i] * spdMult;

                    // Horizontal Drift (Sinusoidal)
                    let dx = Math.sin(now * s.driftFreqs[i] + s.phases[i]) * s.drifts[i] * spdMult;
                    pos[i3] += dx;

                    // Wrap positions
                    if (pos[i3 + 1] < -22) pos[i3 + 1] = 22;
                    if (pos[i3] > 35) pos[i3] = -35;
                    if (pos[i3] < -35) pos[i3] = 35;
                }
                s.points.geometry.attributes.position.needsUpdate = true;

                // Animate Hero Snowflakes
                if (s.spinMeshes) {
                    s.spinMeshes.forEach((mesh, idx) => {
                        mesh.rotation.z += s.spinSpeeds[idx] * spdMult;
                        mesh.position.y -= (s.spinSpeeds[idx] * 0.1) * spdMult;
                        if (mesh.position.y < -25) mesh.position.y = 25;
                    });
                }
                
                // Sync Intensity with Audio
                if (s.material.uniforms.uIntensity) {
                    s.material.uniforms.uIntensity.value = 0.2 + vNormBass * 0.8;
                }
            }

            // ── FIREPLACE / RADIANT ENERGY ───────────────────────────────
            if (this.activeModes.has('fireplace') && this.fireMesh) {
                const flicker = 0.8 + 0.2 * Math.sin(now * 15.0) * Math.sin(now * 7.0);
                this.fireMesh.material.uniforms.uTime.value = now * 1.5 * multiplier;
                this.fireMesh.material.uniforms.uIntensity.value = flicker + vNormBass * 0.5;
                if (this.fireLight) {
                    this.fireLight.intensity = (2.0 + vNormBass * 5.0) * flicker;
                }
            }

            // ── Frame Limiter & Renderer ──────────────────────────────────
            const targetFrameInterval = 1000 / (this.targetFPS || 60);
            if (performance.now() - this.lastFrameRenderTime >= targetFrameInterval) {
                this.renderer.autoClear = !this.activeModes.has('lightspeed');
                if (this.renderer.autoClear) this.renderer.clear();
                
                // Draw 3D Scene
                this.renderer.render(this.scene, this.camera);

                // DRAW 2D OVERLAYS
                if (this.activeModes.has('cyber')) {
                    this.renderCyberCyber();
                }

                this.lastFrameRenderTime = performance.now();
            }

        } catch (err) {
            console.error("[Visualizer] Render Loop Error:", err);
        }

        // Always queue next frame
        if (this.active !== false && !document.hidden) {
            state.animationId = requestAnimationFrame(() => this.render(analyserL, analyserR));
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
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
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
            this.wavesGroup, this.cymaticsGroup, this.snowflakeGroup
        ];

        // Release ring buffer and scratch objects
        this._fpsRingBuffer = null;
        this._tempColor = null;
        this._logoRenderCanvas = null;
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

export function preloadVisualizer() {
    if (viz3D) return Promise.resolve(viz3D);
    return new Promise((resolve) => {
        initVisualizer();
        setTimeout(() => resolve(viz3D), 10);
    });
}

export function initVisualizer() {
    if (!viz3D && els.canvas && els.canvas.activeVisualizer && els.canvas.activeVisualizer.isVisualizer3D) {
        viz3D = els.canvas.activeVisualizer;
    }
    if (els.canvas && els.canvas.activeVisualizer) {
        if (viz3D && els.canvas.activeVisualizer === viz3D) return viz3D;
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
        setTimeout(() => {
            if (viz3D) {
                viz3D.updateVisibility();
                resumeVisuals();
            }
        }, 0);
    }
    return viz3D;
}

export function getVisualizer() { return viz3D; }

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
    if (viz3D && !state.animationId) {
        viz3D.active = true;
        viz3D.render(state.analyserLeft, state.analyserRight);
        visualsPaused = false;
    }
}

export function isVisualsPaused() { return visualsPaused; }
export function toggleVisual(mode) { if (viz3D) viz3D.toggleMode(mode); }
export function setVisualSpeed(speed) { if (viz3D) { viz3D.setGlobalSpeed(speed); if (viz3D.setCyberSpeed) viz3D.setCyberSpeed(speed); } }
export function setVisualColor(hex, mode = null) { if (viz3D) { viz3D.setVisualColor(hex, mode); if (viz3D.setCyberColor && (!mode || mode == "cyber")) viz3D.setCyberColor(hex); } }
export function setVisualBrightness(brightness) { if (viz3D && viz3D.setGlobalBrightness) viz3D.setGlobalBrightness(brightness); }
export function setVisualLogoOpacity(opacity) { if (viz3D) viz3D.setLogoOpacity(opacity); }

// EXPOSED GLOBAL HELPERS FOR HTML CLICK EVENTS
window.toggleGalaxySun = function() {
    if (viz3D) return viz3D.toggleGalaxySunStyle();
    return null;
};

// Visualizer initialization helpers are exported as part of the module
