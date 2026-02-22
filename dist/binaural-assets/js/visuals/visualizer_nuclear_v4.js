import { state, els } from '../state.js';
import * as THREE from '../vendor/three.module.js';

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

        // Mobile / Battery Saver Defaults
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
        this.batterySaver = initialState.batterySaver !== undefined ? initialState.batterySaver : isMobile;
        this.lastFrameRenderTime = 0;
        this.targetFPS = this.batterySaver ? 30 : 60;
        this.vibrationEnabled = initialState.visualVibration !== undefined ? initialState.visualVibration : true;


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

            // Initial sizing
            this.resize();
            setTimeout(this.handleLayoutChange, 100); // Delay slightly for DOM to settle
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
        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;
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
        // OPTIMIZATION: Reduced particle count for faster init (was 1000)
        const count = this.batterySaver ? 300 : 800;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < count; i++) {
            positions.push((Math.random() - 0.5) * 20); // x
            positions.push((Math.random() - 0.5) * 20); // y
            positions.push((Math.random() - 0.5) * 20); // z
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x60a9ff,
            size: 0.15,
            map: this.createCircleTexture(),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.particleGroup.add(this.particles);
        this.particleGroup.visible = false;

        if (this.customColor) {
            this.particles.material.color.copy(this.customColor);
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

                // BOUNDS: Tightened to +/- 3.5 to keep blobs always visible on screen
                const floatMin = -3.5 + (Math.random() * 0.5); // Bottom pile
                const floatMax = 3.5 + (Math.random() * 0.5);  // Top pile

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
            positions.push((Math.random() - 0.5) * 20);
            positions.push(-5 + Math.random() * 15);
            positions.push((Math.random() - 0.5) * 15);

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
            positions.push((Math.random() - 0.5) * 15);
            positions.push(-5 + Math.random() * 12);
            positions.push((Math.random() - 0.5) * 10);

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
        const size = 512;
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

        ctx.shadowBlur = 4;
        ctx.shadowColor = '#4bff4b';

        ctx.font = 'bold 44px "Courier New", "MS Gothic", "Hiragino Kaku Gothic ProN", monospace';
        ctx.fillStyle = '#ccffcc';
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

        const manualSequence = ["LOGO", ...textToSpell.split('')];
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
                    ctx.fillStyle = '#00FF41';
                    ctx.font = 'bold 44px monospace';
                    ctx.fillText(char, 0, 0);
                    ctx.restore();
                    char = '';
                }
            }

            if (char || isLogo) {
                ctx.fillStyle = '#00FF41';
                ctx.font = 'bold 44px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowBlur = 4;
                ctx.shadowColor = '#00FF41';

                if (isLogo) {
                    if (this.logoImage) {
                        const size = 44;
                        const offset = -size / 2;
                        ctx.drawImage(this.logoImage, offset, offset, size, size);
                    } else {
                        if (!this.logoLoading && !this.logoFailed) {
                            this.logoLoading = true;
                            const loader = new THREE.ImageLoader();
                            loader.load('/mindwave-logo.png', (image) => {
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
                    float columnHeadY = 40.0 - mod(uTime * 5.0 * aSpeed + aSpawnTime, 80.0);
                    float dist = columnHeadY - position.y;
                    float trailLen = 80.0 * uTailLength;
                    if (dist >= 0.0 && dist < trailLen) {
                         vAlpha = 1.0 - (dist / trailLen);
                         vBrightness = 1.0 - (dist / trailLen);
                    } else {
                         vAlpha = 0.0;
                         vBrightness = 0.0;
                    }
                    gl_Position = projectionMatrix * mvPosition;
                    gl_PointSize = 480.0 / -mvPosition.z;
                    if (abs(aCharIndex) < 0.1) gl_PointSize *= 2.0;
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
        const colCount = 40;
        const rowCount = 60;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const charIndices = [];
        const spawnTimes = [];
        const speeds = [];

        const viewWidth = 120;
        const viewHeight = 80;
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
                if (positions[i] > 10) positions[i] = -10;
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
                // Add beat pulse to wave height (Controlled by vFactor)
                wavePositions[i + 2] = Math.sin(x * 0.5 + now * multiplier) * Math.cos(y * 0.5 + now * multiplier) * (1 + audioOffset + vBeatPulse * 0.4) + (audioOffset * 2);
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

        if (this.activeModes.has('matrix') && this.matrixMaterial) {
            // FIXED: Only apply multipliers once here; uTime in shader handles the rest.
            this.matrixMaterial.uniforms.uTime.value += dt * multiplier * (this.matrixSpeedMultiplier || 1.0);
            // Normalize beat pulse influence separately
            this.matrixMaterial.uniforms.uSpeed.value = 1.0 + beatPulse * 0.2;
        }

        // Frame Skipping / Battery Saver Logic
        const frameInterval = 1000 / this.targetFPS;
        const timeSinceLastFrame = performance.now() - this.lastFrameRenderTime;

        // Create a property to track current opacity for smoothing
        if (this.currentLogoOpacity === undefined) this.currentLogoOpacity = 0.1;

        if (this.targetLogoOpacity !== undefined) {
            const diff = this.targetLogoOpacity - this.currentLogoOpacity;
            if (Math.abs(diff) > 0.001) {
                this.currentLogoOpacity += diff * 0.05;
            } else {
                this.currentLogoOpacity = this.targetLogoOpacity;
            }

            // Apply to single mesh
            if (this.logoMesh) this.logoMesh.material.opacity = this.currentLogoOpacity;
        }

        if (timeSinceLastFrame >= frameInterval) {
            this.renderer.render(this.scene, this.camera);
            this.lastFrameRenderTime = performance.now();
        }

        if (this.active !== false) {
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
        const canvas = document.createElement('canvas');
        canvas.width = this.originalLogoImg.width;
        canvas.height = this.originalLogoImg.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.originalLogoImg, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const accentHex = this.customColor ? this.customColor.getHex() : 0x2dd4bf;
        const accentR = (accentHex >> 16) & 255;
        const accentG = (accentHex >> 8) & 255;
        const accentB = accentHex & 255;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a < 10) continue; // Skip transparency

            // If bright white (M/W and text) -> Theme Accent
            if (r > 200 && g > 200 && b > 200) {
                data[i] = accentR;
                data[i + 1] = accentG;
                data[i + 2] = accentB;
                // Boost alpha slightly for vibrant center
                data[i + 3] = Math.min(255, a + 50);
            } else {
                // Outer Lotus Petals -> Distinct White/Muted
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
            }
        }
        ctx.putImageData(imageData, 0, 0);

        const texture = new THREE.CanvasTexture(canvas);
        // Crop out text at bottom
        texture.offset.set(0, 0.15);
        texture.repeat.set(1, 0.85);

        if (!this.logoMesh) {
            const geometry = new THREE.PlaneGeometry(15, 12.75);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.12,
                color: 0xffffff, // White overlay guarantees exact texture colors
                depthTest: false,
                depthWrite: false
            });

            this.logoMesh = new THREE.Mesh(geometry, material);
            this.logoMesh.position.set(0, 0, -10);
            this.logoMesh.renderOrder = -1;
            this.scene.add(this.logoMesh);
            console.log('[Visualizer] Overlay Logo Initialized (Dynamic Canvas)');
        } else {
            const oldMap = this.logoMesh.material.map;
            this.logoMesh.material.map = texture;
            if (oldMap) oldMap.dispose();
            this.logoMesh.material.needsUpdate = true;
        }

        if (this.renderer && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    initOverlayLogo() {
        if (this.logoMesh) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = '/mindwave-logo.png';
        img.onload = () => {
            this.originalLogoImg = img;
            this.updateLogoTexture();

            // Apply pending opacity if any
            if (this.targetLogoOpacity !== undefined) {
                this.setLogoOpacity(this.targetLogoOpacity);
            } else {
                this.setLogoOpacity(0.12);
            }
        };
        img.onerror = (err) => {
            console.warn('[Visualizer] Failed to load logo:', err);
        };
    }

    setLogoOpacity(targetOpacity) {
        this.targetLogoOpacity = targetOpacity;
        if (!this.logoMesh) {
            this.initOverlayLogo();
            return;
        }
    }

    dispose() {
        this.active = false;
        if (this.renderer) { this.renderer.dispose(); this.renderer = null; }
    }
}

let viz3D;

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
