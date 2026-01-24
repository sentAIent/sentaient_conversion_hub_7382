import { state, els } from '../state.js';
import * as THREE from '../vendor/three.module.js';

export class Visualizer3D {
    constructor(canvas) {
        this.canvas = canvas;
        this.mode = 'particles'; // Default to Flow
        try {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            this.renderer.autoClear = false; // Prevent black flash on frame drops
            this.renderer.setClearColor(0x000000, 0); // Transparent background
            this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance

            this.sphereGroup = new THREE.Group();
            this.particleGroup = new THREE.Group();
            this.lavaGroup = new THREE.Group();
            this.fireplaceGroup = new THREE.Group();
            this.rainforestGroup = new THREE.Group();
            this.zenGardenGroup = new THREE.Group();
            this.oceanGroup = new THREE.Group();
            this.scene.add(this.sphereGroup);
            this.scene.add(this.particleGroup);
            this.scene.add(this.lavaGroup);
            this.scene.add(this.fireplaceGroup);
            this.scene.add(this.rainforestGroup);
            this.scene.add(this.zenGardenGroup);
            this.scene.add(this.oceanGroup);

            this.matrixGroup = new THREE.Group();
            this.scene.add(this.matrixGroup);

            this.initSphere();
            this.initParticles();
            this.initWaves();
            this.initLava();
            this.initFireplace();
            this.initRainforest();
            this.initZenGarden();
            this.initOcean();
            this.initMatrix();
            this.camera.position.z = 5;
            window.addEventListener('resize', () => this.resize());
            this.resize();
            this.speedMultiplier = 1.0;

            // Time Simulation
            this.lastTime = performance.now() * 0.001;
            this.simTime = 0; // Accumulated simulation time

            this.initialized = true;
        } catch (e) {
            console.error("Three.js Init Failed:", e);
            this.initialized = false;
        }
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    initSphere() {
        // ... (unchanged)
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
    }

    initParticles() {
        // ... (unchanged)
        const count = 1000;
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
        this.particleGroup.visible = true;
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
        // BONFIRE: Animated flames with particle embers + 3D LOGS
        this.flameParticles = [];
        const flameCount = 1500; // Increased 4x for intensity

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const velocities = [];
        const lifetimes = [];
        const sizes = []; // Individual particle sizes

        for (let i = 0; i < flameCount; i++) {
            // Cone distribution for bonfire shape
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 2.5;

            positions.push(Math.cos(angle) * radius); // x
            positions.push(-4 + Math.random() * 0.5); // y (base)
            positions.push(Math.sin(angle) * radius); // z

            velocities.push((Math.random() - 0.5) * 0.05); // drift x
            velocities.push(0.05 + Math.random() * 0.15);  // fast rise y
            velocities.push((Math.random() - 0.5) * 0.05); // drift z

            lifetimes.push(Math.random());
            sizes.push(0.2 + Math.random() * 0.4);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        this.flameVelocities = new Float32Array(velocities);
        this.flameLifetimes = new Float32Array(lifetimes);
        this.flameBaseSizes = new Float32Array(sizes);

        // Custom shader-like coloring done in render loop via vertex colors if needed, 
        // but for compatibility we'll use a warm texture tint
        const material = new THREE.PointsMaterial({
            color: 0xffaa00, // Orange base
            size: 0.4,
            map: this.createCircleTexture(),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexColors: false
        });

        this.flames = new THREE.Points(geometry, material);
        this.fireplaceGroup.add(this.flames);

        // --- 3D LOGS (The Bonfire Stack) ---
        const logGroup = new THREE.Group();
        const logMat = new THREE.MeshStandardMaterial({
            color: 0x3d2817,
            roughness: 0.9,
            metalness: 0.1
        });
        const logEndMat = new THREE.MeshStandardMaterial({
            color: 0x1a1109, // Darker ends
            roughness: 1.0
        });

        // Helper to make a log
        const createLog = (x, y, z, rotX, rotY, rotZ, scale = 1) => {
            const geo = new THREE.CylinderGeometry(0.4 * scale, 0.45 * scale, 5 * scale, 8);
            const mesh = new THREE.Mesh(geo, [logMat, logEndMat, logEndMat]); // multimaterial for ends
            mesh.position.set(x, y, z);
            mesh.rotation.set(rotX, rotY, rotZ);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            return mesh;
        };

        // Teepee / Star arrangement
        logGroup.add(createLog(0, -3.5, 0, Math.PI / 2, 0, Math.PI / 4));
        logGroup.add(createLog(0, -3.5, 0, Math.PI / 2, 0, -Math.PI / 4));
        logGroup.add(createLog(0, -3.5, 0, Math.PI / 2, Math.PI / 2, 0));

        // Embers/Ash bed
        const bedGeo = new THREE.CircleGeometry(4, 32);
        const bedMat = new THREE.MeshBasicMaterial({
            color: 0xff3300,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        const bed = new THREE.Mesh(bedGeo, bedMat);
        bed.rotation.x = -Math.PI / 2;
        bed.position.y = -4;
        logGroup.add(bed);

        this.fireplaceGroup.add(logGroup);

        // --- DYNAMIC LIGHTING ---
        this.fireLight = new THREE.PointLight(0xff6600, 1, 20);
        this.fireLight.position.set(0, -2, 0);
        this.fireplaceGroup.add(this.fireLight);

        this.fireplaceGroup.visible = false;
        console.log('[Visualizer] Bonfire initialized');
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

        // Green foliage backdrop
        const foliageGeo = new THREE.PlaneGeometry(40, 30);
        const foliageMat = new THREE.MeshBasicMaterial({
            color: 0x1a7a3a,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide
        });
        this.foliage = new THREE.Mesh(foliageGeo, foliageMat);
        this.foliage.position.z = -10;
        this.rainforestGroup.add(this.foliage);

        this.rainforestGroup.visible = false;
        console.log('[Visualizer] Rainforest initialized');
    }

    initZenGarden() {
        // Zen Garden: Floating cherry blossom petals and ripples
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

        // Calm water surface with ripples
        const waterGeo = new THREE.PlaneGeometry(30, 30, 32, 32);
        const waterMat = new THREE.MeshBasicMaterial({
            color: 0x4488aa,
            transparent: true,
            opacity: 0.12,
            wireframe: true,
            side: THREE.DoubleSide
        });
        // this.zenWater = new THREE.Mesh(waterGeo, waterMat);
        // this.zenWater.rotation.x = -Math.PI / 2;
        // this.zenWater.position.y = -5;
        // this.zenGardenGroup.add(this.zenWater);

        this.zenGardenGroup.visible = false;
        console.log('[Visualizer] Zen Garden initialized');
    }

    initOcean() {
        // Ocean: Wave geometry + foam particles
        const waveGeo = new THREE.PlaneGeometry(40, 40, 64, 64);
        const waveMat = new THREE.MeshBasicMaterial({
            color: 0x00aaff,
            wireframe: true,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        // this.oceanWave = new THREE.Mesh(waveGeo, waveMat);
        // this.oceanWave.rotation.x = -Math.PI / 3;
        // this.oceanWave.position.y = -2;
        // this.oceanGroup.add(this.oceanWave);

        // Foam particles
        const foamCount = 300;
        const foamGeo = new THREE.BufferGeometry();
        const foamPositions = [];

        for (let i = 0; i < foamCount; i++) {
            foamPositions.push((Math.random() - 0.5) * 30);
            foamPositions.push(-3 + Math.random() * 2);
            foamPositions.push((Math.random() - 0.5) * 20);
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
        console.log('[Visualizer] Ocean initialized');
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

        // Glyphs: CHINESE CHARACTERS as requested (Kanji/Hanzi)
        const charPool = '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐0123456789';

        // CRT GLOW EFFECT
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#4bff4b'; // Phosphor green glow

        // Use a font stack that definitely includes Chinese glyphs
        ctx.font = 'bold 44px "Hiragino Sans GB", "Microsoft YaHei", "Heiti SC", "Hiragino Kaku Gothic Pro", sans-serif';
        ctx.fillStyle = '#ccffcc'; // Brighter center
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const cols = 8;
        const rows = 8;
        const cellW = size / cols;
        const cellH = size / rows;

        for (let i = 0; i < 64; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = col * cellW + cellW / 2;
            const y = row * cellH + cellH / 2;

            // Pick char
            const char = charPool[Math.floor(Math.random() * charPool.length)];

            // Randomly flip some characters horizontally (matrix mirroring effect)
            if (Math.random() > 0.6) {
                ctx.save();
                ctx.translate(x, y);
                ctx.scale(-1, 1);
                ctx.fillText(char, 0, 0);
                ctx.restore();
            } else {
                ctx.fillText(char, x, y);
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        return texture;
    }

    createMatrixShader(texture) {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: texture },
                uColor: { value: new THREE.Color(0x00FF41) }, // Authentic Matrix Green
                uHeadColor: { value: new THREE.Color(0xF0FFF0) } // White-ish green
            },
            vertexShader: `
                attribute float aCharIndex;
                attribute float aBrightness;
                varying float vBrightness;
                varying float vCharIndex;
                
                void main() {
                    vBrightness = aBrightness;
                    vCharIndex = aCharIndex;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Small size for dense, sharp characters
                    // 160.0 constant makes them ~25px on screen
                    gl_PointSize = 160.0 / -mvPosition.z; 
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform vec3 uColor;
                uniform vec3 uHeadColor;
                
                varying float vBrightness;
                varying float vCharIndex;
                
                void main() {
                    // UV Calc
                    float col = mod(vCharIndex, 8.0);
                    float row = floor(vCharIndex / 8.0);
                    row = 7.0 - row; 
                    vec2 uv = gl_PointCoord;
                    vec2 atlasUV = (uv + vec2(col, row)) / 8.0;
                    
                    vec4 texColor = texture2D(uTexture, atlasUV);
                    
                    if (texColor.a < 0.1) discard;
                    
                    // Color Mixing
                    vec3 finalColor;
                    float alpha = texColor.a;
                    
                    if (vBrightness >= 0.95) {
                        finalColor = uHeadColor;
                        alpha *= 1.0; 
                    } else {
                        finalColor = uColor;
                        alpha *= vBrightness; // Fade alpha based on brightness trail
                    }
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
    }

    initMatrix() {
        // "Matrix Rain" Logic: 
        // Sparse columns, not a solid wall
        // High particle count to allow long trails, but fewer active columns

        const colCount = 60;  // Reduced for better spacing (Digital Rain style)
        const rowCount = 60;  // Tall columns
        this.rowCount = rowCount;

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const charIndices = [];
        const brightness = [];

        // Grid setup
        const viewWidth = 60; // Spread out wider 
        const viewHeight = 45;

        const colWidth = viewWidth / colCount;
        const rowHeight = viewHeight / rowCount;

        this.matrixColumns = [];

        for (let c = 0; c < colCount; c++) {
            // Random x offset within column for "Digital Rain" feel (less rigid grid)
            const x = (c * colWidth) - (viewWidth / 2) + ((Math.random() * 0.8) * colWidth);

            // Depth Layering for 3D Rain effect
            // 3 Layers: Front (0), Mid (-5), Back (-10)
            const depthLayer = Math.floor(Math.random() * 3);
            const z = -(depthLayer * 5) - (Math.random() * 2); // 0 to -12 roughly

            // Speed parallax: closer = faster
            const depthScale = 1.0 - (Math.abs(z) / 25.0);

            // Column State
            this.matrixColumns.push({
                x: x,
                z: z, // Store Z
                headY: 20 + Math.random() * 30,
                speed: (4.0 + Math.random() * 4.0) * depthScale,
                trailLength: 8 + Math.random() * 12,
                nextSpawnTime: Math.random() * 2.0 // Random start times
            });

            for (let r = 0; r < rowCount; r++) {
                // Strict Y alignment
                const y = (viewHeight / 2) - (r * rowHeight);

                // Apply Z to position
                positions.push(x, y, z);

                charIndices.push(Math.floor(Math.random() * 64));
                brightness.push(0.0);
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('aCharIndex', new THREE.Float32BufferAttribute(charIndices, 1));
        geometry.setAttribute('aBrightness', new THREE.Float32BufferAttribute(brightness, 1));

        const texture = this.createMatrixTexture();
        this.matrixMaterial = this.createMatrixShader(texture);

        this.matrixRain = new THREE.Points(geometry, this.matrixMaterial);

        this.matrixGroup.add(this.matrixRain);
        this.matrixGroup.visible = false;
        console.log('[Visualizer] Matrix (Authentic Rain Mode) initialized');
    }


    setMode(mode) {
        this.mode = mode;
        this.sphereGroup.visible = (mode === 'sphere');
        this.particleGroup.visible = (mode === 'particles');
        if (this.wavesGroup) this.wavesGroup.visible = (mode === 'waves');
        if (this.lavaGroup) this.lavaGroup.visible = (mode === 'lava');
        if (this.fireplaceGroup) this.fireplaceGroup.visible = (mode === 'fireplace');
        if (this.rainforestGroup) this.rainforestGroup.visible = (mode === 'rainforest');
        if (this.zenGardenGroup) this.zenGardenGroup.visible = (mode === 'zengarden');
        if (this.zenGardenGroup) this.zenGardenGroup.visible = (mode === 'zengarden');
        if (this.oceanGroup) this.oceanGroup.visible = (mode === 'ocean');
        if (this.matrixGroup) this.matrixGroup.visible = (mode === 'matrix');

        const label = document.getElementById('visualLabel');
        if (label) {
            if (mode === 'sphere') label.textContent = "BIO-RESONANCE";
            else if (mode === 'particles') label.textContent = "NEURAL FLOW";
            else if (mode === 'waves') label.textContent = "FREQUENCY WAVES";
            else if (mode === 'lava') label.textContent = "LAVA LAMP";
            else if (mode === 'fireplace') label.textContent = "FIREPLACE";
            else if (mode === 'rainforest') label.textContent = "RAINFOREST";
            else if (mode === 'zengarden') label.textContent = "ZEN GARDEN";
            else if (mode === 'zengarden') label.textContent = "ZEN GARDEN";
            else if (mode === 'ocean') label.textContent = "OCEAN WAVES";
            else if (mode === 'matrix') label.textContent = "THE MATRIX";
        }
    }

    initWaves() {
        // ... (unchanged)
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
        this.wavesGroup.visible = false;
        this.scene.add(this.wavesGroup);
    }

    setSpeed(speed) {
        console.log("Visual Speed Set:", speed);
        this.speedMultiplier = speed;
    }

    setColor(hex) {
        this.customColor = new THREE.Color(hex);

        if (this.particles && this.particles.material) {
            this.particles.material.color.set(hex);
        }
        if (this.sphere && this.sphere.material) {
            this.sphere.material.color.set(hex);
            this.core.material.color.set(hex);
        }
        if (this.wavesMesh && this.wavesMesh.material) {
            this.wavesMesh.material.color.set(hex);
        }
        if (this.lavaBlobs) {
            this.lavaBlobs.forEach(blob => {
                blob.material.color.set(hex);
            });
        }
        if (this.lavaGlow && this.lavaGlow.material) {
            this.lavaGlow.material.color.set(hex);
        }
        if (this.lavaBaseGlow && this.lavaBaseGlow.material) {
            this.lavaBaseGlow.material.color.set(hex);
        }

        // New visual modes color support
        if (this.flames && this.flames.material) {
            this.flames.material.color.set(hex);
        }
        if (this.fireBase && this.fireBase.material) {
            this.fireBase.material.color.set(hex);
        }
        if (this.raindrops && this.raindrops.material) {
            this.raindrops.material.color.set(hex);
        }
        if (this.foliage && this.foliage.material) {
            this.foliage.material.color.set(hex);
        }
        if (this.petals && this.petals.material) {
            this.petals.material.color.set(hex);
        }
        if (this.zenWater && this.zenWater.material) {
            this.zenWater.material.color.set(hex);
        }
        if (this.oceanWave && this.oceanWave.material) {
            this.oceanWave.material.color.set(hex);
        }
        if (this.oceanFoam && this.oceanFoam.material) {
            this.oceanFoam.material.color.set(hex);
        }
        if (this.matrixRain && this.matrixRain.material) {
            // ShaderMaterial uses uniforms, not .color property
            if (this.matrixRain.material.uniforms && this.matrixRain.material.uniforms.uColor) {
                this.matrixRain.material.uniforms.uColor.value.set(hex);
            }
        }

        // Render a single frame to show the color change even when paused
        this.renderSingleFrame();
    }

    // Render a single frame without starting the animation loop
    // Used to show color changes when visuals are paused
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
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    render(analyserL, analyserR) {
        if (!analyserL && state.analyserLeft) analyserL = state.analyserLeft;

        // Audio Data Processing
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

        // TIME MANAGEMENT
        const now = performance.now() * 0.001;
        if (!this.lastTime) this.lastTime = now;
        const dt = now - this.lastTime;
        this.lastTime = now;

        // Animation Logic
        if (this.mode === 'sphere') {
            // Sphere uses real-time + simple multiplier
            const scale = 1 + (normBass * 0.4);
            this.sphere.scale.setScalar(scale);
            this.core.scale.setScalar(scale * 0.9);

            this.sphere.rotation.y += (0.016 * multiplier) + (normMids * 0.01);
            this.sphere.rotation.z += (0.008 * multiplier);

            const r = 45 / 255 + (normHighs * 0.5);
            const g = 212 / 255 - (normHighs * 0.2);
            const b = 191 / 255 + (normMids * 0.2);

            if (this.customColor) {
                this.sphere.material.color.copy(this.customColor);
                this.core.material.color.copy(this.customColor);
            } else {
                this.sphere.material.color.setRGB(r, g, b);
                this.core.material.color.setRGB(r, g, b);
            }

        } else if (this.mode === 'particles') { // Flow
            const bassKick = normBass || 0;
            const scaledMultiplier = Math.pow(multiplier, 1.2);
            const flowSpeed = (0.015 * scaledMultiplier) + (bassKick * 0.1);

            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 2; i < positions.length; i += 3) {
                positions[i] += flowSpeed;
                if (positions[i] > 10) positions[i] = -10;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
            this.particleGroup.rotation.z += (0.001 * scaledMultiplier) + (normMids * 0.005);

        } else if (this.mode === 'lava' && this.lavaBlobs) {
            // Updated Lava Animation: EASE-OUT, INCHING & 2-7s IDLE TIMING

            // 1. Calculate Global Speed Factor (Motion, Physics rate)
            // 1. Calculate Global Speed Factor (Motion, Physics rate)
            // Updated: Direct scaling without floor for better sync sensitivity
            const speedFactor = this.speedMultiplier * 0.04;

            // 2. Accumulate Simulation Time
            this.simTime += dt * speedFactor * 15.0;

            this.lavaBlobs.forEach((blob) => {
                const ud = blob.userData;

                // STATE MACHINE
                if (ud.state === 'heating') {
                    // Resting Steps: 2-7s duration relative to speedMultiplier
                    // New formula: Rate * SpeedMultiplier * DeltaTime
                    ud.temperature += ud.heatRate * this.speedMultiplier * dt;

                    // Inch forward effect: bob with noise
                    const shimmer = Math.sin(this.simTime * 0.5 + ud.driftPhase) * 0.1;
                    blob.position.y = ud.floatMin + shimmer;

                    if (ud.temperature >= 1.0) {
                        ud.temperature = 1.0;
                        ud.state = 'rising';
                    }

                } else if (ud.state === 'rising') {
                    // Smooth Rise with Ease-Out
                    const distToTop = ud.floatMax - blob.position.y;
                    const ease = Math.max(0.2, Math.min(1.0, distToTop * 0.3));

                    blob.position.y += ud.riseSpeed * speedFactor * 4.0 * ease;

                    if (blob.position.y >= ud.floatMax) {
                        blob.position.y = ud.floatMax;
                        ud.state = 'cooling';
                    }

                } else if (ud.state === 'cooling') {
                    // Resting Steps: 2-7s duration relative to speedMultiplier
                    ud.temperature -= ud.coolRate * this.speedMultiplier * dt;

                    // INCHING EFFECT using simTime
                    const sag = Math.abs(Math.sin(this.simTime * 0.3 + ud.driftPhase)) * (1.0 - ud.temperature) * 0.5;
                    blob.position.y = ud.floatMax - sag;

                    if (ud.temperature <= 0.0) {
                        ud.temperature = 0.0;
                        ud.state = 'falling';
                    }

                } else if (ud.state === 'falling') {
                    // Smooth Fall with Ease-Out
                    const distToBottom = blob.position.y - ud.floatMin;
                    const ease = Math.max(0.2, Math.min(1.0, distToBottom * 0.3));

                    blob.position.y -= ud.fallSpeed * speedFactor * 4.0 * ease;

                    if (blob.position.y <= ud.floatMin) {
                        blob.position.y = ud.floatMin;
                        ud.state = 'heating';
                    }
                }

                // VISUALS
                const bassKick = normBass * 0.1;

                // Scale Dynamics using simTime
                const tempScale = 0.8 + (ud.temperature * 0.4);
                const blobScale = tempScale + bassKick + (Math.sin(this.simTime * 0.2 + ud.wobblePhase) * 0.05);

                // STRETCH DYANMICS
                let stretchY = 1.0;

                // Heating/Rising
                if (ud.state === 'heating') stretchY = 1.0 + (ud.temperature * 0.1);
                if (ud.state === 'rising') stretchY = 1.15;

                // Cooling: SAG effect 
                if (ud.state === 'cooling') {
                    stretchY = 1.0 + ((1.0 - ud.temperature) * 0.2);
                }

                // Falling
                if (ud.state === 'falling') stretchY = 1.1;

                // Apply Stretch
                const stretchXZ = 1.0 / Math.sqrt(stretchY);
                blob.scale.set(blobScale * stretchXZ, blobScale * stretchY, blobScale * stretchXZ);

                // Opacity
                const baseOpacity = 0.3 + (ud.temperature * 0.5);
                blob.material.opacity = baseOpacity + (normMids * 0.15);

                // Drift
                ud.driftPhase += ud.driftSpeed * speedFactor * 0.1;
                blob.position.x += Math.sin(ud.driftPhase) * 0.02 * speedFactor;
                blob.position.z += Math.cos(ud.driftPhase * 1.3) * 0.02 * speedFactor;

                // Constrain X
                if (blob.position.x > 8) blob.position.x -= 0.05;
                if (blob.position.x < -8) blob.position.x += 0.05;
            });

            // Container rotation using simTime
            this.lavaGroup.rotation.y += 0.0002 * speedFactor;

            if (this.lavaGlow) {
                this.lavaGlow.material.opacity = 0.05 + (normBass * 0.05);
            }

        } else if (this.mode === 'waves' && this.wavesMesh) {
            // ... (unchanged)
            const wavePositions = this.wavesMesh.geometry.attributes.position.array;

            for (let i = 0; i < wavePositions.length; i += 3) {
                const x = wavePositions[i];
                const y = wavePositions[i + 1];
                let amp = 0.5 + (normBass * 2);

                let audioOffset = 0;
                if (dataL && dataL.length > 0) {
                    const bin = Math.floor(Math.abs(x) * 5) % dataL.length;
                    audioOffset = dataL[bin] / 255;
                }

                wavePositions[i + 2] = Math.sin(x * 0.5 + now * multiplier) * Math.cos(y * 0.5 + now * multiplier) * (1 + audioOffset) + (audioOffset * 2);
            }
            this.wavesMesh.geometry.attributes.position.needsUpdate = true;
            this.wavesMesh.rotation.z += 0.001 * multiplier;

        } else if (this.mode === 'fireplace' && this.flames) {
            // BONFIRE PHYSICS
            const positions = this.flames.geometry.attributes.position.array;
            const speedFactor = this.speedMultiplier * 0.8;

            // Pulse light with bass
            if (this.fireLight) {
                this.fireLight.intensity = 1.0 + (normBass * 2.0) + (Math.random() * 0.5);
                this.fireLight.distance = 20 + (normMids * 5);
            }

            for (let i = 0; i < positions.length; i += 3) {
                // Update position
                positions[i] += this.flameVelocities[i] * speedFactor;
                positions[i + 1] += this.flameVelocities[i + 1] * speedFactor; // Rise
                positions[i + 2] += this.flameVelocities[i + 2] * speedFactor;

                // Turbulent wind/wobble as they rise
                positions[i] += Math.sin(now * 5 + positions[i + 1]) * 0.01 * speedFactor;

                // Lifetime management
                const idx = i / 3;
                this.flameLifetimes[idx] -= 0.015 * speedFactor; // Faster decay for snap

                // Reset if dead or too high
                if (this.flameLifetimes[idx] <= 0 || positions[i + 1] > 4) {
                    // Respawn at base (cone shape)
                    const angle = Math.random() * Math.PI * 2;
                    const r = Math.random() * 1.5; // Tighter spawn radius

                    positions[i] = Math.cos(angle) * r;
                    positions[i + 1] = -4 + (Math.random() * 0.5);
                    positions[i + 2] = Math.sin(angle) * r;

                    this.flameLifetimes[idx] = 1.0;

                    // Reset velocity (variation)
                    // Stronger updraft in center
                    const centerBias = 1.0 - (r / 2.0);
                    this.flameVelocities[i + 1] = (0.05 + Math.random() * 0.1) * (1 + centerBias);
                }
            }
            this.flames.geometry.attributes.position.needsUpdate = true;

            // Color shift: Core white/yellow -> Tips red/smoke
            // We simulate this by changing opacity/color globally but ideally per particle shader
            // For now, high intensity flicker
            this.flames.material.opacity = 0.8 + (Math.random() * 0.2);
            this.flames.material.color.setHSL(0.08 + (normBass * 0.05), 1.0, 0.6); // Gold/Orange shift

        } else if (this.mode === 'rainforest' && this.raindrops) {
            // Rainforest animation: Falling rain
            const positions = this.raindrops.geometry.attributes.position.array;
            const speedFactor = this.speedMultiplier * 0.8;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= this.rainVelocities[i / 3] * speedFactor;

                // Loop back to top
                if (positions[i + 1] < -10) {
                    positions[i + 1] = 10;
                    positions[i] = (Math.random() - 0.5) * 20;
                    positions[i + 2] = (Math.random() - 0.5) * 15;
                }
            }
            this.raindrops.geometry.attributes.position.needsUpdate = true;
            this.raindrops.material.opacity = 0.5 + (normMids * 0.2);

        } else if (this.mode === 'zengarden' && this.petals) {
            // Zen Garden animation: Floating petals
            const positions = this.petals.geometry.attributes.position.array;
            const speedFactor = this.speedMultiplier * 0.3;

            for (let i = 0; i < positions.length; i += 3) {
                // Gentle drift
                this.petalDrifts[i / 3] += 0.01 * speedFactor;
                positions[i] += Math.sin(this.petalDrifts[i / 3]) * 0.02 * speedFactor;
                positions[i + 1] -= 0.02 * speedFactor;
                positions[i + 2] += Math.cos(this.petalDrifts[i / 3] * 0.7) * 0.015 * speedFactor;

                // Loop
                if (positions[i + 1] < -6) {
                    positions[i + 1] = 6;
                    positions[i] = (Math.random() - 0.5) * 15;
                }
            }
            this.petals.geometry.attributes.position.needsUpdate = true;

            // Animated ripples
            if (this.zenWater) {
                const waterPositions = this.zenWater.geometry.attributes.position.array;
                for (let i = 0; i < waterPositions.length; i += 3) {
                    const x = waterPositions[i];
                    const y = waterPositions[i + 1];
                    waterPositions[i + 2] = Math.sin(x * 0.3 + now * multiplier * 0.5) * Math.cos(y * 0.3 + now * multiplier * 0.5) * 0.3;
                }
                this.zenWater.geometry.attributes.position.needsUpdate = true;
            }

        } else if (this.mode === 'ocean' && this.oceanWave) {
            // Ocean animation: Waves
            const wavePositions = this.oceanWave.geometry.attributes.position.array;
            const speedFactor = this.speedMultiplier;

            for (let i = 0; i < wavePositions.length; i += 3) {
                const x = wavePositions[i];
                const y = wavePositions[i + 1];
                const distFromCenter = Math.sqrt(x * x + y * y);
                const amp = 1.5 + (normBass * 3);
                wavePositions[i + 2] = Math.sin(distFromCenter * 0.2 - now * speedFactor * 0.8) * amp +
                    Math.cos(x * 0.15 + now * speedFactor * 0.6) * (amp * 0.5);
            }
            this.oceanWave.geometry.attributes.position.needsUpdate = true;

            // Foam movement
            if (this.oceanFoam) {
                const foamPositions = this.oceanFoam.geometry.attributes.position.array;
                for (let i = 0; i < foamPositions.length; i += 3) {
                    foamPositions[i] += Math.sin(now * 2 + i) * 0.02 * speedFactor;
                    foamPositions[i + 2] += Math.cos(now * 1.5 + i) * 0.02 * speedFactor;

                    // Wrap foam
                    if (foamPositions[i] > 15) foamPositions[i] = -15;
                    if (foamPositions[i] < -15) foamPositions[i] = 15;
                    if (foamPositions[i + 2] > 10) foamPositions[i + 2] = -10;
                    if (foamPositions[i + 2] < -10) foamPositions[i + 2] = 10;
                }
                this.oceanFoam.geometry.attributes.position.needsUpdate = true;
                this.oceanFoam.material.opacity = 0.4 + (normMids * 0.3);
            }

        } else if (this.mode === 'matrix' && this.matrixRain) {
            // AUTHENTIC MATRIX ANIMATION (RAIN LOOK)

            const brightness = this.matrixRain.geometry.attributes.aBrightness.array;
            const positions = this.matrixRain.geometry.attributes.position.array;
            const charIndices = this.matrixRain.geometry.attributes.aCharIndex.array;

            // Audio react
            const speedMult = this.speedMultiplier * (0.8 + normBass * 0.4);

            const rowCount = this.rowCount;
            if (!this.matrixColumns) return;

            this.matrixColumns.forEach((col, cIdx) => {
                // SPAWN DELAY
                if (col.nextSpawnTime > now) {
                    return;
                }

                // Update Head Position
                col.headY -= col.speed * dt * speedMult;

                // Wrap Head / Respawn Logic
                if (col.headY < -20) {
                    // If fell off screen, wait before respawning
                    // Random delay 0-3 seconds
                    col.nextSpawnTime = now + (Math.random() * 3.0);

                    // Reset position above screen
                    col.headY = 20 + Math.random() * 5;
                    col.speed = 3.5 + Math.random() * 5.0;
                    col.trailLength = 6.0 + Math.random() * 15.0;
                }

                // Update particles in this column
                const startIdx = cIdx * rowCount;

                for (let r = 0; r < rowCount; r++) {
                    const idx = startIdx + r;
                    const y = positions[idx * 3 + 1];

                    if (y <= col.headY && y > col.headY - 1.0) {
                        // The Head (bottom of stream)
                        brightness[idx] = 1.0;

                        // Head characters change super fast
                        if (Math.random() < 0.4) {
                            charIndices[idx] = Math.floor(Math.random() * 64);
                        }

                    } else if (y > col.headY) {
                        // The Trail
                        const trailDist = y - col.headY;
                        if (trailDist < col.trailLength) {

                            // Fade logic
                            brightness[idx] = 1.0 - (trailDist / col.trailLength);

                            // The "Glitch" - reduced frequency
                            if (Math.random() < 0.01) {
                                charIndices[idx] = Math.floor(Math.random() * 64);
                                brightness[idx] = Math.min(1.0, brightness[idx] * 1.5);
                            }
                        } else {
                            // Invisible
                            brightness[idx] = 0.0;
                        }
                    } else {
                        // Below the head
                        brightness[idx] = 0.0;
                    }
                }
            });

            this.matrixRain.geometry.attributes.aBrightness.needsUpdate = true;
            this.matrixRain.geometry.attributes.aCharIndex.needsUpdate = true;
        }


        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        state.animationId = requestAnimationFrame(() => this.render(analyserL, analyserR));
    }
}


let viz3D;

export function initVisualizer() {
    if (!viz3D && els.canvas) {
        viz3D = new Visualizer3D(els.canvas);
        // Auto-start visuals on load for immediate feedback
        resumeVisuals();
    }
}

export function getVisualizer() {
    return viz3D;
}

// Visual pause state - starts playing on load for immediate feedback
let visualsPaused = false;

export function pauseVisuals() {
    // Always mark as paused for button sync
    visualsPaused = true;

    // Cancel animation if running
    if (viz3D && state.animationId) {
        cancelAnimationFrame(state.animationId);
        state.animationId = null;

        // Render one final frame WITHOUT clearing to freeze the current state
        if (viz3D.renderer && viz3D.scene && viz3D.camera) {
            viz3D.renderer.render(viz3D.scene, viz3D.camera);
        }

        console.log('[Visualizer] Visuals paused (frozen on last frame)');
    }
}

export function resumeVisuals() {
    if (viz3D && !state.animationId) {
        viz3D.render(state.analyserLeft, state.analyserRight);
        visualsPaused = false;
        console.log('[Visualizer] Visuals resumed');
    }
}

export function isVisualsPaused() {
    return visualsPaused;
}
