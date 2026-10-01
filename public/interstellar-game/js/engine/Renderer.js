export class Renderer {
    constructor(engine) {
        this.engine = engine;
    }

    initWebGL() {
        if (!window.THREE) {
            console.warn("Three.js not loaded! WebGL disabled.");
            return;
        }
        console.log("🌌 Initializing WebGL / Three.js Engine...");
        
        // 1. Create WebGL Renderer underneath 2D Canvas
        this.engine.glCanvas = document.createElement('canvas');
        this.engine.glCanvas.id = 'glcanvas';
        this.engine.glCanvas.style.position = 'absolute';
        this.engine.glCanvas.style.top = '0';
        this.engine.glCanvas.style.left = '0';
        this.engine.glCanvas.style.width = '100vw';
        this.engine.glCanvas.style.height = '100vh';
        this.engine.glCanvas.style.zIndex = '0'; // Behind 2D canvas which has z-index 1
        
        // Setup existing 2D canvas to be transparent
        this.engine.canvas.style.position = 'absolute';
        this.engine.canvas.style.zIndex = '1';
        this.engine.canvas.style.backgroundColor = 'transparent';
        
        document.body.insertBefore(this.engine.glCanvas, this.engine.canvas);
        
        this.engine.glRenderer = new THREE.WebGLRenderer({ canvas: this.engine.glCanvas, alpha: true, antialias: true });
        this.engine.glRenderer.setSize(window.innerWidth, window.innerHeight);
        this.engine.glRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
        
        // 2. Setup Scene & Camera
        this.engine.glScene = new THREE.Scene();
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.engine.glCamera = new THREE.OrthographicCamera(
            -width / 2, width / 2, 
            -height / 2, height / 2, 
            0.1, 1000
        );
        this.engine.glCamera.position.z = 100;
        
        // 3. Initialize 3D Objects
        this.init3DObjects();
        
        // Handle window resize for WebGL
        window.addEventListener('resize', () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (this.engine.glRenderer) {
                this.engine.glRenderer.setSize(w, h);
                this.engine.glCamera.left = -w / 2;
                this.engine.glCamera.right = w / 2;
                this.engine.glCamera.top = -h / 2;
                this.engine.glCamera.bottom = h / 2;
                this.engine.glCamera.updateProjectionMatrix();
            }
        });
        
        this.engine.webglReady = true;
    }

    init3DObjects() {
        if (!window.THREE) return;

        this.engine.glPlayerShip = new THREE.Group();

        const bodyGeo = new THREE.ConeGeometry( 15, 45, 4 );
        bodyGeo.rotateZ(-Math.PI / 2); 

        const shipColorStr = (this.engine.playerShip && this.engine.playerShip.color) ? this.engine.playerShip.color : '#00f3ff';
        const shipColor = new THREE.Color(shipColorStr);

        const bodyMat = new THREE.MeshPhongMaterial({ 
            color: shipColor,
            shininess: 100,
            emissive: shipColor,
            emissiveIntensity: 0.2
        });
        const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);

        const wingGeo = new THREE.BoxGeometry(20, 40, 5);
        wingGeo.translate(-10, 0, 0); 
        const wingMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const wingMesh = new THREE.Mesh(wingGeo, wingMat);

        this.engine.glPlayerShip.add(bodyMesh);
        this.engine.glPlayerShip.add(wingMesh);

        const shipLight = new THREE.PointLight(shipColor, 2, 300);
        shipLight.position.set(0, 0, 20); 
        this.engine.glPlayerShip.add(shipLight);

        this.engine.glScene.add(this.engine.glPlayerShip);

        const ambientLight = new THREE.AmbientLight(0x404040); 
        this.engine.glScene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(0, 0, 100);
        this.engine.glScene.add(dirLight);
    }

    renderWebGL(time) {
        if (!this.engine.webglReady) return;

        const zoom = (this.engine.camera && this.engine.camera.zoom) ? this.engine.camera.zoom : 1.0;

        if (this.engine.playerShip && this.engine.camera) {
            if (this.engine.glPlayerShip) {
                this.engine.glPlayerShip.position.set(this.engine.playerShip.x, this.engine.playerShip.y, 0);
                this.engine.glPlayerShip.rotation.z = this.engine.playerShip.rotation;
                this.engine.glPlayerShip.scale.set(1 / zoom, 1 / zoom, 1 / zoom);
            }

            this.engine.glCamera.position.x = this.engine.camera.x;
            this.engine.glCamera.position.y = this.engine.camera.y;
            this.engine.glCamera.zoom = zoom;
            this.engine.glCamera.updateProjectionMatrix();
        }

        this.engine.glRenderer.render(this.engine.glScene, this.engine.glCamera);
    }

    generateStaticBackground() {
        const bgStars = [];
        const count = 300; 
        for (let i = 0; i < count; i++) {
            bgStars.push({
                x: Math.random() * this.engine.canvas.width,
                y: Math.random() * this.engine.canvas.height,
                size: Math.random() * 0.5 + 0.1,
                alpha: Math.random() * 0.5 + 0.2,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                depth: 0.3 + Math.random() * 0.7
            });
        }
        return bgStars;
    }

    drawCyberGrid(ctx, canvas, time) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); 

        const horizon = canvas.height * 0.55;
        const centerX = canvas.width / 2;
        const maxRadius = canvas.width * 1.5;

        ctx.fillStyle = '#050011';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.translate(centerX, horizon);
        ctx.scale(1, 0.3); 

        let color1 = this.engine.cyberColor1;
        let color2 = this.engine.cyberColor2;

        if (this.engine.cyberRainbowMode) {
            const hue1 = (time * 0.05) % 360;
            const hue2 = (time * 0.05 + 180) % 360; 
            color1 = `hsl(${hue1}, 100%, 50%)`;
            color2 = `hsl(${hue2}, 100%, 50%)`;
        }

        ctx.beginPath();
        ctx.arc(0, 0, 80, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.shadowBlur = 100;
        ctx.shadowColor = color1;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.lineWidth = 2.0;

        const numRings = 20;
        const scalePhase = 1 - ((time * 0.0005) % 1);

        ctx.beginPath();
        ctx.strokeStyle = color1;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color1;

        for (let i = 1; i <= numRings; i++) {
            const ratio = (i - 1 + scalePhase) / numRings;
            if (ratio < 0.05) continue; 

            const r = Math.pow(ratio, 2) * maxRadius;
            ctx.moveTo(r, 0);
            ctx.arc(0, 0, r, 0, Math.PI * 2);
        }
        ctx.stroke();

        const numSpokes = 36;
        const rotationBase = time * 0.0002;

        ctx.beginPath();
        ctx.strokeStyle = color2;
        ctx.shadowColor = color2;

        for (let i = 0; i < numSpokes; i++) {
            const angle = (i / numSpokes) * Math.PI * 2;

            const startRadius = 80;
            ctx.moveTo(Math.cos(angle + rotationBase) * startRadius, Math.sin(angle + rotationBase) * startRadius);

            const cpRadius = maxRadius * 0.4;
            const cpAngle = angle + rotationBase + 1.5; 
            const cpX = Math.cos(cpAngle) * cpRadius;
            const cpY = Math.sin(cpAngle) * cpRadius;

            const endAngle = angle + rotationBase + 3.0;
            const endX = Math.cos(endAngle) * maxRadius;
            const endY = Math.sin(endAngle) * maxRadius;

            ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        }
        ctx.stroke();

        ctx.restore();
    }

    generateSingleStyle(style) {
        switch (style) {
            case 'deep-space':
                this.engine.generateDeepSpaceStyle();
                break;
            case 'nebula':
                this.engine.generateNebulaStyle();
                break;
            case 'alien':
                this.engine.generateAlienStyle();
                break;
            case 'matrix':
                this.engine.generateMatrixStyle();
                break;
            case 'cyber':
                this.engine.generateCyberStyle();
                break;
        }
    }

    clearStyleData(style) {
        switch (style) {
            case 'deep-space':
                this.engine.galaxies = [];
                this.engine.blackHoles = [];
                this.engine.planets = [];
                this.engine.nebulae = []; 
                this.engine.backgroundStars = []; 
                if (this.engine.activeStyles.has('nebula')) {
                    this.generateSingleStyle('nebula'); 
                }
                break;
            case 'nebula':
                this.engine.nebulae = [];
                if (this.engine.activeStyles.has('deep-space')) {
                    this.engine.galaxies = [];
                    this.engine.blackHoles = [];
                    this.engine.planets = [];
                    this.generateSingleStyle('deep-space');
                }
                break;
            case 'alien':
                this.engine.spacecraft = [];
                break;
            case 'matrix':
                this.engine.matrixStreams = [];
                break;
            case 'cyber':
                this.engine.cyberGrid = null; 
                break;
        }
    }

    updateBgUI() {
        document.querySelectorAll('.bg-toggle').forEach(btn => {
            const style = btn.getAttribute('data-style');
            if (this.engine.activeStyles.has(style)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const matrixPanel = document.getElementById('matrixPanel');
        if (matrixPanel) {
            if (this.engine.activeStyles.has('matrix')) {
                matrixPanel.classList.remove('hidden');
            } else {
                matrixPanel.classList.add('hidden');
            }
        }

        const cyberPanel = document.getElementById('cyberPanel');
        if (cyberPanel) {
            if (this.engine.activeStyles.has('cyber')) {
                cyberPanel.classList.remove('hidden');
            } else {
                cyberPanel.classList.add('hidden');
            }
        }

        const battleBtn = document.getElementById('battleToggleBtn');
        if (battleBtn) {
            if (this.engine.activeStyles.has('alien')) {
                battleBtn.style.display = 'inline-block';
                if (this.engine.settings && this.engine.settings.bgBattles) {
                    battleBtn.style.backgroundColor = '#ff5555';
                    battleBtn.style.color = '#000';
                } else {
                    battleBtn.style.backgroundColor = 'transparent';
                    battleBtn.style.color = '#ff5555';
                }
            } else {
                battleBtn.style.display = 'none';
            }
        }
    }

    toggleBgBattles() {
        if (!this.engine.settings) return;
        this.engine.settings.bgBattles = !this.engine.settings.bgBattles;

        const cb = document.getElementById('settingBgBattles');
        if (cb) cb.checked = this.engine.settings.bgBattles;

        this.updateBgUI();
        localStorage.setItem('gameSettings', JSON.stringify(this.engine.settings));
        this.engine.showToast(this.engine.settings.bgBattles ? 'Background Battles Enabled' : 'Background Battles Disabled');
    }

    preloadEffects() {
        console.log('[Aether] Preloading effects to prevent stutter...');
        const dummy = this.engine.generateSupernovaParticles(10);

        const ctx = this.engine.ctx;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.createRadialGradient(0, 0, 1, 0, 0, 10);
            ctx.restore();
        }
        console.log('[Aether] Effects preloaded.');
    }
}
