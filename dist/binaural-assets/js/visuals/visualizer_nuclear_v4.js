import { state, els, THEMES } from '../state.js';
import * as THREE from '../vendor/three.module.js';

let viz3D = null;

export class Visualizer3D {
    constructor(canvas, initialState = {}) {
        this.canvas = canvas;
        this.activeModes = initialState.activeModes || new Set(['particles', 'matrix']); // Default to Flow + Matrix
        this.mode = initialState.mode || 'matrix'; // Legacy support

        // Default settings - MUST be set before init methods
        this.mindWaveMode = initialState.mindWaveMode !== undefined ? initialState.mindWaveMode : true;
        this.matrixLogicMode = initialState.matrixLogicMode || 'mindwave';
        this.matrixCustomText = initialState.matrixCustomText || "Welcome";
        this.currentMatrixAngle = initialState.currentMatrixAngle || 0;
        this.matrixSpeedMultiplier = initialState.matrixSpeedMultiplier || 1.0;
        this.initialized = false;
        this._rainbowEnabled = initialState.rainbowEnabled || false;
        this.isVisualizer3D = true;

        // Logo Opacity State (Start bright to match active UI)
        this.currentLogoOpacity = 0.8;
        this.targetLogoOpacity = 0.8;
        viz3D = this; // Ensure module-level viz3D is set immediately
        // Detect initial theme type from document if available, fallback to dark
        this.themeType = document.body.dataset.themeType || 'dark';

        // Mobile / Battery Saver Defaults
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
        this.batterySaver = initialState.batterySaver !== undefined ? initialState.batterySaver : isMobile;
        this.lastFrameRenderTime = 0;
        this.targetFPS = this.batterySaver ? 30 : 60;
        this.vibrationEnabled = initialState.visualVibration !== undefined ? initialState.visualVibration : true;

        // Adaptive Level of Detail (LOD) Tracking
        this.fpsFrameStats = [];
        this.lastLodDegradation = 0;
        this.currentLodLevel = 'high'; // 'high', 'medium', 'low'


        try {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            this.renderer.autoClear = false; // Prevent black flash on frame drops
            this.renderer.setClearColor(0x000000, 0); // Transparent background
            this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

            // Performance optimization: Cap pixel ratio based on battery saver
            const maxPixelRatio = this.batterySaver ? 1.0 : 2.0;
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));

            this.sphereGroup = new THREE.Group();
            this.scene.add(this.sphereGroup);

            this.particleGroup = new THREE.Group();
            this.scene.add(this.particleGroup);

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

            this.matrixGroup = new THREE.Group();
            this.scene.add(this.matrixGroup);

            this.boxGroup = new THREE.Group();
            this.scene.add(this.boxGroup);

            this.dragonGroup = new THREE.Group();
            this.scene.add(this.dragonGroup);

            this.galaxyGroup = new THREE.Group();
            this.scene.add(this.galaxyGroup);

            this.mandalaGroup = new THREE.Group();
            this.scene.add(this.mandalaGroup);

            this.textures = {};

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

        console.log(`[Visualizer] Layout update: Centered background mode (Full Window)`);
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

        if (this.customColor) {
            this.sphere.material.color.copy(this.customColor);
            this.core.material.color.copy(this.customColor);
        }
    }

    initParticles() {
        // Flow mode: streaming particles through space
        const count = this.batterySaver ? 400 : 1200;
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

        if (this.customColor) {
            this.particles.material.color.copy(this.customColor);
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

        if (this.customColor) {
            this.boxOuter.children.forEach(c => c.material.color.copy(this.customColor));
            this.boxInner.children.forEach(c => c.material.color.copy(this.customColor));
            if (this.boxEdges && this.boxEdges.material) this.boxEdges.material.color.copy(this.customColor);
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

        if (this.customColor) {
            this.updateDragonColor(this.customColor);
        }
    }

    updateDragonColor(color) {
        if (!this.dragonBodyInstanced) return;
        this.dragonBodyInstanced.material.color.copy(color);
        this.dragonHead.material.color.copy(color);
        // We typically leave the core glow / pearl as its contrasting color, or tint them slightly.
    }

    initGalaxy() {
        // Swirling galaxy with star-shaped particles and central sun
        const count = this.batterySaver ? 600 : 2000;
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

        // True 3D Tribal Sun Geometry
        this.galaxySunMesh = new THREE.Group();

        // The tribal sun material: bright cyan-blue, additive blending to glow
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0x4aa6ff, // Bright tribal blue
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const sunGeometryGroup = new THREE.Group();

        // 1. The Ring
        const ringGeo = new THREE.TorusGeometry(1.5, 0.25, 16, 64); // Adjusted tube to 0.25 (matching stroke-width 5 on r=15)
        const ringMesh = new THREE.Mesh(ringGeo, sunMaterial);
        sunGeometryGroup.add(ringMesh);

        // 2. The Spikes (8 large, 8 small, alternating)
        const numSpikes = 8;

        // Large Spike Geometry (scaled from SVG 46,35 54,35 50,8: length 27, radius 4)
        const largeSpikeLength = 2.7;
        const largeSpikeRadius = 0.4;
        const largeSpikeGeo = new THREE.ConeGeometry(largeSpikeRadius, largeSpikeLength, 4);
        largeSpikeGeo.translate(0, largeSpikeLength / 2, 0); // Base at y=0

        // Small Spike Geometry (scaled from SVG 48,35 52,35 50,18: length 17, radius 2)
        const smallSpikeLength = 1.7;
        const smallSpikeRadius = 0.2;
        const smallSpikeGeo = new THREE.ConeGeometry(smallSpikeRadius, smallSpikeLength, 4);
        smallSpikeGeo.translate(0, smallSpikeLength / 2, 0); // Base at y=0

        for (let i = 0; i < numSpikes; i++) {
            // --- Large Spike (0, 45, 90, 135... degrees) ---
            const angleLarge = (i / numSpikes) * Math.PI * 2;
            const largeMesh = new THREE.Mesh(largeSpikeGeo, sunMaterial);
            largeMesh.rotation.z = -angleLarge;
            // Place base exactly at ring edge
            largeMesh.position.x = Math.sin(angleLarge) * 1.5;
            largeMesh.position.y = Math.cos(angleLarge) * 1.5;
            sunGeometryGroup.add(largeMesh);

            // --- Small Spike (22.5, 67.5, 112.5... degrees) ---
            const angleSmall = angleLarge + (Math.PI / numSpikes);
            const smallMesh = new THREE.Mesh(smallSpikeGeo, sunMaterial);
            smallMesh.rotation.z = -angleSmall;
            // Place base exactly at ring edge
            smallMesh.position.x = Math.sin(angleSmall) * 1.5;
            smallMesh.position.y = Math.cos(angleSmall) * 1.5;
            sunGeometryGroup.add(smallMesh);
        }

        this.galaxySunMesh.add(sunGeometryGroup);
        this.galaxySunMesh.position.set(0, 0, 0.1);
        this.galaxyGroup.add(this.galaxySunMesh);

        this.galaxyGroup.visible = false;
    }

    createStarTexture() {
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

        return new THREE.CanvasTexture(canvas);
    }

    initMandala() {
        // Sacred geometry: concentric rotating rings
        this.mandalaRings = [];
        const ringColors = [0xf59e0b, 0xfbbf24, 0xf97316, 0xfb923c, 0xef4444];

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
            color: 0xfbbf24,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        this.mandalaCenter = new THREE.Mesh(dotGeo, dotMat);
        this.mandalaGroup.add(this.mandalaCenter);
        this.mandalaGroup.visible = false;

        if (this.customColor) {
            this.mandalaRings.forEach(r => r.material.color.copy(this.customColor));
            this.mandalaCenter.material.color.copy(this.customColor);
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

        if (this.customColor) {
            this.raindrops.material.color.copy(this.customColor);
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

        if (this.customColor) {
            this.petals.material.color.copy(this.customColor);
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

        if (this.customColor) {
            if (this.oceanWave) this.oceanWave.material.color.copy(this.customColor);
            if (this.oceanFoam) this.oceanFoam.material.color.copy(this.customColor);
        }
        console.log('[Visualizer] Original Ocean (Wireframe) restored');
    }




    createMatrixTexture() {
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

        ctx.font = 'bold 100px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const cols = 8;
        const rows = 8;
        const cellW = size / cols;
        const cellH = size / rows;

        let textToSpell = "MINDWAVE";
        if (this.matrixLogicMode === 'custom' && this.matrixCustomText && this.matrixCustomText.length > 0) {
            textToSpell = this.matrixCustomText;
        } else if (this.matrixLogicMode === 'random') {
            textToSpell = "";
        }

        // Place LOGO first, before the active word string
        const manualSequence = [
            "LOGO",
            ...textToSpell.split('')
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

            if (i < specialCount) {
                const item = manualSequence[i];
                if (item === "LOGO") {
                    isLogo = true;
                } else {
                    char = item;
                }
            } else {
                const mix = katakana + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                char = mix.charAt(Math.floor(Math.random() * mix.length));

                if (Math.random() > 0.5) {
                    ctx.save();
                    ctx.scale(-1, 1);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 100px monospace';
                    ctx.fillText(char, 0, 0);
                    ctx.restore();
                    char = '';
                }
            }

            if (char || isLogo) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 100px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowBlur = 16;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';

                if (isLogo) {
                    if (this.logoImage) {
                        // Base size 100 (Increased for better 128px cell fill)
                        const charBaseSize = 100;
                        const logoRenderSize = 125; // Maintaining 25% larger ratio

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
                                if (this.matrixMaterial) {
                                    const newTexture = this.createMatrixTexture();
                                    this.matrixMaterial.uniforms.uTexture.value = newTexture;
                                }
                            }, undefined, (err) => {
                                this.logoFailed = true;
                                this.logoLoading = false;
                            });
                        }
                        ctx.fillText("MW", 0, 0);
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

    createMatrixShader(texture) {
        return new THREE.ShaderMaterial({
            uniformParams: {
                uTexture: { value: texture },
                uColor: { value: new THREE.Color(0x00FF41) },
                uHeadColor: { value: new THREE.Color(0xF0FFF0) },
                uTime: { value: 0 },
                uSpeed: { value: 1.0 },
                uTailLength: { value: 1.0 },
                uRainbow: { value: this._rainbowEnabled ? 1.0 : 0.0 },
                uBrightness: { value: this.brightnessMultiplier }
            },
            get uniforms() { return this.uniformParams; }, // Compatibility getter
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
                    float dist = columnHeadY - position.y;
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
                    gl_PointSize = 480.0 / -mvPosition.z;
                    if (abs(aCharIndex - 0.0) < 0.1) gl_PointSize *= 1.6;
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

        // Ensure Matrix renders behind other visuals by rendering it first
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
        if (mode === 'sphere' && this.sphereGroup.children.length === 0) this.initSphere();
        if (mode === 'particles' && this.particleGroup.children.length === 0) this.initParticles();
        if (mode === 'waves' && this.wavesGroup && this.wavesGroup.children.length === 0) this.initWaves();
        if (mode === 'lava' && this.lavaGroup.children.length === 0) this.initLava();
        if (mode === 'fireplace' && this.fireplaceGroup.children.length === 0) this.initFireplace();
        if (mode === 'rainforest' && this.rainforestGroup.children.length === 0) this.initRainforest();
        if (mode === 'zengarden' && this.zenGardenGroup.children.length === 0) this.initZenGarden();
        if (mode === 'ocean' && this.oceanGroup.children.length === 0) this.initOcean();
        if (mode === 'matrix' && this.matrixGroup.children.length === 0) this.initMatrix();
        if (mode === 'box' && this.boxGroup.children.length === 0) this.initBox();
        if (mode === 'dragon' && this.dragonGroup.children.length === 0) this.initDragon();
        if (mode === 'galaxy' && this.galaxyGroup.children.length === 0) this.initGalaxy();
        if (mode === 'mandala' && this.mandalaGroup.children.length === 0) this.initMandala();
        console.timeEnd(tLabel);
    }

    initMatrix() {
        while (this.matrixGroup.children.length > 0) {
            const child = this.matrixGroup.children[0];
            this.matrixGroup.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
            if (child.children) {
                child.traverse((c) => {
                    if (c.geometry) c.geometry.dispose();
                    if (c.material) c.material.dispose();
                });
            }
        }
        this.matrixRotationGroup = null;
        this.matrixPoints = null;

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

            const isSpecial = (this.matrixLogicMode === 'mindwave' || this.matrixLogicMode === 'custom');
            const specialText = (this.matrixLogicMode === 'custom' && this.matrixCustomText) ? this.matrixCustomText : "MINDWAVE";
            const specialLen = specialText.length;

            for (let r = 0; r < rowCount; r++) {
                const y = (viewHeight / 2) - (r * rowHeight);
                const spawnTime = Math.random() * 100.0;
                positions.push(x, y, z);
                if (isSpecial) {
                    charIndices.push((r + c) % (specialLen + 1));
                } else {
                    charIndices.push(9 + Math.floor(Math.random() * 55));
                }
                spawnTimes.push(spawnTime);
                speeds.push(speed);
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('aCharIndex', new THREE.Float32BufferAttribute(charIndices, 1));
        geometry.setAttribute('aSpawnTime', new THREE.Float32BufferAttribute(spawnTimes, 1));
        geometry.setAttribute('aSpeed', new THREE.Float32BufferAttribute(speeds, 1));

        this.matrixGeometry = geometry;
        const texture = this.createMatrixTexture();
        this.matrixMaterial = this.createMatrixShader(texture);
        this.matrixRain = new THREE.Points(geometry, this.matrixMaterial);
        this.matrixRain.frustumCulled = false;

        // CRITICAL FOR EPIC FOCUS COMBO: 
        // Ensure Matrix renders behind ocean and zen particles to prevent AdditiveBlending washout
        this.matrixRain.renderOrder = -1;

        this.matrixRotationGroup = new THREE.Group();
        this.matrixRotationGroup.add(this.matrixRain);
        this.matrixGroup.add(this.matrixRotationGroup);

        if (this.currentMatrixAngle !== undefined) {
            this.matrixRotationGroup.rotation.z = THREE.MathUtils.degToRad(-this.currentMatrixAngle);
        }
        this.matrixGroup.visible = true;
        this.updateVisibility();
    }

    setMatrixMode(enabled) {
        if (this.mindWaveMode === enabled) return;
        this.mindWaveMode = enabled;
        this.matrixLogicMode = enabled ? 'mindwave' : 'classic';
        if (enabled && this.matrixMaterial) {
            const newTexture = this.createMatrixTexture();
            this.matrixMaterial.uniforms.uTexture.value = newTexture;
            this.matrixMaterial.needsUpdate = true;
        }
        this.initMatrix();
    }

    setMode(mode) {
        this.activeModes.clear();
        this.activeModes.add(mode);
        this.mode = mode;
        this.updateVisibility();
        this.updateLabel(mode);
    }

    toggleMode(mode) {
        if (this.activeModes.has(mode)) {
            this.activeModes.delete(mode);
        } else {
            this.activeModes.add(mode);
        }
        this.mode = mode;
        this.updateVisibility();
        if (this.activeModes.size === 1) {
            this.updateLabel(Array.from(this.activeModes)[0]);
        } else if (this.activeModes.size > 1) {
            this.updateLabel('multi');
        } else {
            this.updateLabel('none');
        }
    }

    updateVisibility() {
        this.activeModes.forEach(mode => this.ensureInitialized(mode));

        if (this.sphereGroup) this.sphereGroup.visible = this.activeModes.has('sphere');
        if (this.particleGroup) this.particleGroup.visible = this.activeModes.has('particles');
        if (this.wavesGroup) this.wavesGroup.visible = this.activeModes.has('waves');
        if (this.lavaGroup) this.lavaGroup.visible = this.activeModes.has('lava');
        if (this.fireplaceGroup) this.fireplaceGroup.visible = this.activeModes.has('fireplace');
        if (this.rainforestGroup) this.rainforestGroup.visible = this.activeModes.has('rainforest');
        if (this.zenGardenGroup) this.zenGardenGroup.visible = this.activeModes.has('zengarden');
        if (this.oceanGroup) this.oceanGroup.visible = this.activeModes.has('ocean');
        if (this.matrixGroup) this.matrixGroup.visible = this.activeModes.has('matrix');
        if (this.boxGroup) this.boxGroup.visible = this.activeModes.has('box');
        if (this.dragonGroup) this.dragonGroup.visible = this.activeModes.has('dragon');
        if (this.galaxyGroup) this.galaxyGroup.visible = this.activeModes.has('galaxy');
        if (this.mandalaGroup) this.mandalaGroup.visible = this.activeModes.has('mandala');
    }

    updateLabel(mode) {
        const label = document.getElementById('visualLabel');
        if (label) {
            if (mode === 'sphere') label.textContent = "BIO-RESONANCE";
            else if (mode === 'particles') label.textContent = "NEURAL FLOW";
            else if (mode === 'waves') label.textContent = "FREQUENCY WAVES";
            else if (mode === 'lava') label.textContent = "LAVA LAMP";
            else if (mode === 'fireplace') label.textContent = "FIREPLACE";
            else if (mode === 'rainforest') label.textContent = "RAINFOREST";
            else if (mode === 'zengarden') label.textContent = "ZEN GARDEN";
            else if (mode === 'ocean') label.textContent = "WAVES";
            else if (mode === 'matrix') label.textContent = "THE MATRIX";
            else if (mode === 'multi') label.textContent = "MULTI-SENSORY";
            else label.textContent = "";
        }
    }

    initWaves() {
        this.wavesGroup = new THREE.Group();
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
        this.scene.add(this.wavesGroup);

        if (this.customColor && this.wavesMesh) {
            this.wavesMesh.material.color.copy(this.customColor);
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
            if (this.matrixMaterial && this.matrixMaterial.uniforms && this.matrixMaterial.uniforms.uTailLength) {
                this.matrixMaterial.uniforms.uHeadColor.value.setHex(0xffffff);
                this.matrixMaterial.uniforms.uTailLength.value = 0.4; // Short, fast tails
            }
        } else {
            // Normal (Alpha, Beta)
            if (this.particles && this.particles.material) {
                this.particles.material.size = 0.15;
                this.particles.material.opacity = 0.8;
            }
            if (this.matrixMaterial && this.matrixMaterial.uniforms && this.matrixMaterial.uniforms.uTailLength) {
                this.matrixMaterial.uniforms.uHeadColor.value.setHex(0xF0FFF0);
                this.matrixMaterial.uniforms.uTailLength.value = 1.0;
            }
        }
        this.renderSingleFrame();
    }

    setColor(hex) {
        this.customColor = new THREE.Color(hex);
        if (this.particles && this.particles.material) this.particles.material.color.set(hex);
        if (this.sphere && this.sphere.material) {
            this.sphere.material.color.set(hex);
            this.core.material.color.set(hex);
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
        if (this.matrixRain && this.matrixRain.material) {
            if (this.matrixRain.material.uniforms && this.matrixRain.material.uniforms.uColor) {
                this.matrixRain.material.uniforms.uColor.value.set(hex);
            }
        }
        if (this.logoMesh && this.originalLogoImg) {
            // Re-burn new colors into the texture instead of uniform tint
            this.updateLogoTexture();
        }
        if (this.dragonGroup && this.updateDragonColor) {
            this.updateDragonColor(this.customColor);
        }
        this.renderSingleFrame();
    }

    renderSingleFrame() {
        if (!this.renderer || !this.scene || !this.camera) return;
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }

    createCircleTexture() {
        const size = 32;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        return new THREE.CanvasTexture(canvas);
    }

    render(analyserL, analyserR) {
        if (!this.initialized || !this.renderer) return;

        if (!analyserL && state.analyserLeft) analyserL = state.analyserLeft;

        let normBass = 0, normMids = 0, normHighs = 0;
        let dataL = null;

        if (analyserL) {
            dataL = new Uint8Array(analyserL.frequencyBinCount);
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
            const r = 45 / 255 + (normHighs * 0.3);
            const g = 212 / 255 - (normHighs * 0.1);
            const b = 191 / 255 + (normMids * 0.2);

            if (this.customColor) {
                this.sphere.material.color.copy(this.customColor);
                this.core.material.color.copy(this.customColor);
            } else {
                this.sphere.material.color.setRGB(r, g, b);
                this.core.material.color.setRGB(r, g, b);
            }
        }

        if (this.activeModes.has('particles') && this.particles) {
            // Flow speed surges on the beat
            const flowSpeed = (0.015 * multiplier) + (normBass * 0.08) + (beatPulse * 0.05);
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 2; i < positions.length; i += 3) {
                positions[i] += flowSpeed;
                if (positions[i] > 40) positions[i] = -40;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
            this.particleGroup.rotation.z += (0.001 * multiplier) + (normMids * 0.005);
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
                blob.scale.x += wobble * (normBass * 0.2);
                blob.scale.z += wobble * (normBass * 0.2);

                // Drift X slightly based on phase
                blob.position.x += Math.sin(now * 0.2 + config.driftPhase) * 0.005 * multiplier;
            });
            this.lavaGroup.rotation.y += 0.0001 * multiplier;
            if (this.lavaGlow) this.lavaGlow.material.opacity = (0.05 + (vNormBass * 0.05) + (vBeatPulse * 0.1)) * this.brightnessMultiplier;
        }

        if (this.activeModes.has('ocean') && this.oceanWave) {
            const positions = this.oceanWave.geometry.attributes.position.array;
            const time = now * multiplier;
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                const distFromCenter = Math.sqrt(x * x + y * y);
                // Complex interference pattern for organic wave motion
                const amp = 1.0 + (normBass * 2.5) + (vBeatPulse * 0.8);
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
                this.oceanFoam.material.opacity = (0.4 + (normMids * 0.3) + (vBeatPulse * 0.2)) * this.brightnessMultiplier;
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
                wavePositions[i + 2] = baseWave * (0.8 + normBass * 0.2) + gentleAudio;
            }
            this.wavesMesh.geometry.attributes.position.needsUpdate = true;
            this.wavesMesh.rotation.z += 0.001 * multiplier;
        }

        if (this.activeModes.has('fireplace') && this.fireMaterial) {
            this.fireMaterial.uniforms.uTime.value += dt * multiplier;
            this.fireMaterial.uniforms.uSpeed.value = multiplier * (1.0 + normBass * 0.5 + beatPulse * 0.2);
            if (this.embers) {
                const positions = this.embers.geometry.attributes.position.array;
                const speedFactor = multiplier * 2.0 * (1.0 + beatPulse * 0.5);
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
                this.emberMat.opacity = (0.4 + (beatPulse * 0.4)) * this.brightnessMultiplier;
            }
            if (this.fireLight) {
                this.fireLight.intensity = 1.0 + (normBass * 1.5) + (beatPulse * 1.0) + (Math.sin(now * 10) + Math.cos(now * 23)) * 0.3;
                this.fireLight.distance = 20 + (normMids * 5) + (beatPulse * 5);
            }
        }

        if (this.activeModes.has('rainforest') && this.raindrops) {
            const positions = this.raindrops.geometry.attributes.position.array;
            const speedFactor = multiplier * 0.8 * (1.0 + beatPulse * 0.3);
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= this.rainVelocities[i / 3] * speedFactor;
                if (positions[i + 1] < -10) {
                    positions[i + 1] = 10;
                    positions[i] = (Math.random() - 0.5) * 20;
                    positions[i + 2] = (Math.random() - 0.5) * 15;
                }
            }
            this.raindrops.geometry.attributes.position.needsUpdate = true;
            this.raindrops.material.opacity = (0.5 + (normMids * 0.2) + (beatPulse * 0.2)) * this.brightnessMultiplier;
        }

        if (this.activeModes.has('zengarden') && this.petals) {
            const positions = this.petals.geometry.attributes.position.array;
            const speedFactor = multiplier * 0.3 * (1.0 + beatPulse * 0.5);
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
            if (this.zenWater) this.zenWater.material.opacity = (0.3 + (beatPulse * 0.2)) * this.brightnessMultiplier;
        }

        // BOX (Cube)
        if (this.activeModes.has('box') && this.boxOuter) {
            this.boxOuter.rotation.x += 0.008 * multiplier + normBass * 0.02;
            this.boxOuter.rotation.y += 0.012 * multiplier;
            this.boxInner.rotation.x -= 0.015 * multiplier;
            this.boxInner.rotation.y -= 0.01 * multiplier;
            this.boxEdges.rotation.copy(this.boxOuter.rotation);
            const cubeScale = 1 + vNormBass * 0.2;
            this.boxOuter.scale.setScalar(cubeScale);
            this.boxEdges.scale.setScalar(cubeScale);
            this.boxInner.scale.setScalar(cubeScale * 0.95);
            if (!this.customColor) {
                const b = 0.48 + normHighs * 0.3;
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
                const breath = 1.0 + Math.sin(phase * 4) * 0.15 * (0.5 + normBass);
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

            // Color pulsing
            if (!this.customColor) {
                // Flash body Crimson/Gold based on audio
                this.dragonBodyInstanced.material.color.setRGB(0.9 + normBass * 0.1, 0.2 + normMids * 0.1, 0.1);
                // Flash pearl Cyan/White
                const pw = 0.5 + normHighs * 0.5;
                this.dragonPearl.material.color.setRGB(pw * 0.5, pw, 1.0);
            }
        }

        // GALAXY
        if (this.activeModes.has('galaxy') && this.galaxyStars) {
            this.galaxyGroup.rotation.y += 0.002 * multiplier + normBass * 0.003;
            this.galaxyGroup.rotation.x = Math.sin(now * 0.08) * 0.25; // gentle tilt
            this.galaxyStars.material.size = 0.2 + normBass * 0.1 + beatPulse * 0.08;

            // Tribal sun - slow steady 3D rotation, no pulsing
            if (this.galaxySunMesh) {
                this.galaxySunMesh.rotation.y += 0.005 * multiplier; // Spins like a coin
                this.galaxySunMesh.rotation.z += 0.003 * multiplier; // Rotates like a wheel
                this.galaxySunMesh.rotation.x = Math.sin(now * 0.1) * 0.2; // Gentle tilt
            }
        }

        // MANDALA
        if (this.activeModes.has('mandala') && this.mandalaRings) {
            this.mandalaRings.forEach((ring, i) => {
                ring.rotation.z += ring.userData.speed * multiplier + normBass * 0.005;
                const pulse = 1 + vBeatPulse * 0.1 * (i + 1) * 0.3;
                ring.scale.setScalar(pulse);
                if (!this.customColor) {
                    ring.material.opacity = (0.35 - i * 0.04) + normMids * 0.2;
                }
            });
            if (this.mandalaCenter) {
                this.mandalaCenter.material.opacity = 0.4 + beatPulse * 0.3;
                const cScale = 1 + vNormBass * 0.3;
                this.mandalaCenter.scale.setScalar(cScale);
            }
        }

        if (this.activeModes.has('matrix') && this.matrixMaterial) {
            // FIXED: Only apply multipliers once here; uTime in shader handles the rest.
            this.matrixMaterial.uniforms.uTime.value += dt * multiplier * (this.matrixSpeedMultiplier || 1.0);
            // Normalize beat pulse influence separately
            this.matrixMaterial.uniforms.uSpeed.value = 1.0 + beatPulse * 0.2;
        }

        // Frame Skipping / Battery Saver Logic
        const frameInterval = 1000 / this.targetFPS;
        const timeSinceLastFrame = performance.now() - this.lastFrameRenderTime;

        // Adaptive LOD FPS Measurement
        if (dt > 0) {
            const currentFps = 1 / dt;
            this.fpsFrameStats.push(currentFps);
            if (this.fpsFrameStats.length > 60) this.fpsFrameStats.shift();

            // Evaluate LOD downgrade every 5 seconds if running below target
            if (now - this.lastLodDegradation > 5.0 && this.fpsFrameStats.length === 60) {
                const avgFps = this.fpsFrameStats.reduce((a, b) => a + b) / 60;
                // If dropping 25% below target consistently
                if (avgFps < (this.targetFPS * 0.75)) {
                    this.degradeLOD();
                    this.lastLodDegradation = now;
                    this.fpsFrameStats = []; // Reset after degrading
                }
            }
        }

        // Create a property to track current opacity for smoothing
        if (this.currentLogoOpacity === undefined) this.currentLogoOpacity = 0.1;

        if (this.targetLogoOpacity !== undefined) {
            const diff = this.targetLogoOpacity - this.currentLogoOpacity;
            if (Math.abs(diff) > 0.001) {
                this.currentLogoOpacity += diff * 0.05;
            } else {
                this.currentLogoOpacity = this.targetLogoOpacity;
            }

            // Apply to single mesh material
            if (this.logoMesh && this.logoMesh.material) {
                this.logoMesh.material.opacity = this.currentLogoOpacity;
                this.logoMesh.material.transparent = true;
                this.logoMesh.material.needsUpdate = true;
            }
        }

        // Heartbeat animation for the MindWave lotus logo
        // Dual-pulse "lub-dub" pattern: two quick beats then a rest
        if (this.logoMesh) {
            const heartRate = 1.2; // ~72 BPM natural resting heart rate
            const cycle = (now * heartRate) % 1.0; // 0-1 cycle phase

            let heartScale = 1.0;
            // First beat (lub) at 0.0-0.12
            if (cycle < 0.12) {
                heartScale = 1.0 + 0.08 * Math.sin(cycle / 0.12 * Math.PI);
            }
            // Second beat (dub) at 0.18-0.28
            else if (cycle > 0.18 && cycle < 0.28) {
                heartScale = 1.0 + 0.05 * Math.sin((cycle - 0.18) / 0.10 * Math.PI);
            }
            // Rest phase - smoothly settle back to 1.0
            else {
                heartScale = 1.0;
            }

            this.logoMesh.scale.setScalar(heartScale);
        }

        if (timeSinceLastFrame >= frameInterval) {
            this.renderer.render(this.scene, this.camera);
            this.lastFrameRenderTime = performance.now();
        }

        if (this.active !== false && !document.hidden) {
            state.animationId = requestAnimationFrame(() => this.render(analyserL, analyserR));
        }
    }

    setMatrixColor(hexColor) {
        if (this.matrixMaterial && this.matrixMaterial.uniforms.uColor) {
            this.matrixMaterial.uniforms.uColor.value.set(hexColor);
            const color = new THREE.Color(hexColor);
            color.lerp(new THREE.Color(0xffffff), 0.8);
            this.matrixMaterial.uniforms.uHeadColor.value.copy(color);
        }
    }

    getAverageFrequency(startIndex, endIndex) {
        let analyser = state.analyserLeft || state.analyserRight;
        if (!analyser) return 0;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        if (startIndex === undefined) startIndex = 0;
        if (endIndex === undefined) endIndex = dataArray.length;
        let sum = 0, count = 0;
        for (let i = startIndex; i < endIndex && i < dataArray.length; i++) { sum += dataArray[i]; count++; }
        return count > 0 ? sum / count : 0;
    }

    setGlobalSpeed(speed) {
        this.speedMultiplier = speed;
        if (this.matrixMaterial && this.matrixMaterial.uniforms && this.matrixMaterial.uniforms.uSpeed)
            this.matrixMaterial.uniforms.uSpeed.value = 1.0 + (speed - 1.0) * 0.5; // Scale gently
    }

    setGlobalBrightness(brightness) {
        this.brightnessMultiplier = brightness;
        if (this.matrixMaterial && this.matrixMaterial.uniforms && this.matrixMaterial.uniforms.uBrightness)
            this.matrixMaterial.uniforms.uBrightness.value = brightness;
    }

    setMatrixSpeed(speed) { this.matrixSpeedMultiplier = speed; }
    setMatrixLength(length) { if (this.matrixMaterial && this.matrixMaterial.uniforms.uTailLength) this.matrixMaterial.uniforms.uTailLength.value = length; }
    setMatrixRainbow(isRainbow) {
        this._rainbowEnabled = isRainbow;
        if (this.matrixMaterial && this.matrixMaterial.uniforms && this.matrixMaterial.uniforms.uRainbow) this.matrixMaterial.uniforms.uRainbow.value = isRainbow ? 1.0 : 0.0;
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

    setMatrixLogicMode(mode, text) {
        this.matrixLogicMode = mode;
        if (text !== undefined) this.matrixCustomText = text;
        const newTexture = this.createMatrixTexture();
        if (this.matrixMaterial) { this.matrixMaterial.uniforms.uTexture.value = newTexture; this.matrixMaterial.needsUpdate = true; }
        this.initMatrix();
    }

    setMatrixAngle(degrees) {
        this.currentMatrixAngle = degrees;
        if (this.matrixRotationGroup) this.matrixRotationGroup.rotation.z = THREE.MathUtils.degToRad(-degrees);
    }

    setVibrationEnabled(enabled) {
        this.vibrationEnabled = enabled;
    }

    updateLogoTexture() {
        if (!this.originalLogoImg) return;
        const renderSize = 512;
        const canvas = document.createElement("canvas");
        canvas.width = renderSize;
        canvas.height = renderSize;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(this.originalLogoImg, 0, 0, renderSize, renderSize);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const themeName = document.body.dataset.theme || 'default';
        const currentTheme = THEMES[themeName] || THEMES.default;
        const secondaryHex = currentTheme.secondary || currentTheme.accent || '#ffffff';

        const accentHex = this.customColor ? this.customColor.getHex() : parseInt(currentTheme.accent.replace('#', ''), 16);
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
        if (this.renderer) { this.renderer.dispose(); this.renderer = null; }
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
            matrixLogicMode: els.canvas.activeVisualizer.matrixLogicMode,
            matrixCustomText: els.canvas.activeVisualizer.matrixCustomText,
            currentMatrixAngle: els.canvas.activeVisualizer.currentMatrixAngle,
            matrixSpeedMultiplier: els.canvas.activeVisualizer.matrixSpeedMultiplier,
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
        viz3D.render(state.analyserLeft, state.analyserRight);
        visualsPaused = false;
    }
}

export function isVisualsPaused() { return visualsPaused; }
export function toggleVisual(mode) { if (viz3D) viz3D.toggleMode(mode); }
export function setVisualSpeed(speed) { if (viz3D) { viz3D.setGlobalSpeed(speed); if (viz3D.setMatrixSpeed) viz3D.setMatrixSpeed(speed); } }
export function setVisualColor(hex) { if (viz3D) { viz3D.setColor(hex); if (viz3D.setMatrixColor) viz3D.setMatrixColor(hex); } }
export function setVisualBrightness(brightness) { if (viz3D && viz3D.setGlobalBrightness) viz3D.setGlobalBrightness(brightness); }
export function setVisualLogoOpacity(opacity) { if (viz3D) viz3D.setLogoOpacity(opacity); }
