export function applyRenderMixin(EngineClass) {
    Object.assign(EngineClass.prototype, {
        initWebGL() {
            if (!window.THREE) {
                console.warn("Three.js not loaded! WebGL disabled.");
                return;
            }
            console.log("🌌 Initializing WebGL / Three.js Engine...");
            
            // 1. Create WebGL Renderer underneath 2D Canvas
            this.glCanvas = document.createElement('canvas');
            this.glCanvas.id = 'glcanvas';
            this.glCanvas.style.position = 'absolute';
            this.glCanvas.style.top = '0';
            this.glCanvas.style.left = '0';
            this.glCanvas.style.width = '100vw';
            this.glCanvas.style.height = '100vh';
            this.glCanvas.style.zIndex = '0'; // Behind 2D canvas which has z-index 1
            
            // Setup existing 2D canvas to be transparent
            this.canvas.style.position = 'absolute';
            this.canvas.style.zIndex = '1';
            this.canvas.style.backgroundColor = 'transparent';
            
            document.body.insertBefore(this.glCanvas, this.canvas);
            
            this.glRenderer = new THREE.WebGLRenderer({ canvas: this.glCanvas, alpha: true, antialias: true });
            this.glRenderer.setSize(window.innerWidth, window.innerHeight);
            this.glRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
            
            // 2. Setup Scene & Camera
            this.glScene = new THREE.Scene();
            
            // Use an Orthographic Camera to match 2D Canvas pixel coordinates initially
            const width = window.innerWidth;
            const height = window.innerHeight;
            // To match 2D Canvas where (0,0) is top-left and Y goes down, 
            // we can invert the Y-axis of the camera by setting top = -height/2 and bottom = height/2.
            this.glCamera = new THREE.OrthographicCamera(
                -width / 2, width / 2, 
                -height / 2, height / 2, 
                0.1, 1000
            );
            this.glCamera.position.z = 100;
            
            // 3. Initialize 3D Objects
            this.init3DObjects();
            
            // Handle window resize for WebGL
            window.addEventListener('resize', () => {
                const w = window.innerWidth;
                const h = window.innerHeight;
                if (this.glRenderer) {
                    this.glRenderer.setSize(w, h);
                    this.glCamera.left = -w / 2;
                    this.glCamera.right = w / 2;
                    this.glCamera.top = -h / 2;
                    this.glCamera.bottom = h / 2;
                    this.glCamera.updateProjectionMatrix();
                }
            });
            
            this.webglReady = true;
        },

        init3DObjects() {
                if (!window.THREE) return;

                // Player Ship Group
                this.glPlayerShip = new THREE.Group();

                // Sleek triangular ship (Interceptor style)
                const bodyGeo = new THREE.ConeGeometry( 15, 45, 4 );
                // Default Cone points UP (+Y). In 2D game, 0 degrees is facing right (+X).
                // Rotate -90 degrees around Z axis to point it to +X.
                bodyGeo.rotateZ(-Math.PI / 2); 

                const shipColorStr = (this.playerShip && this.playerShip.color) ? this.playerShip.color : '#00f3ff';
                const shipColor = new THREE.Color(shipColorStr);

                const bodyMat = new THREE.MeshPhongMaterial({ 
                    color: shipColor,
                    shininess: 100,
                    emissive: shipColor,
                    emissiveIntensity: 0.2
                });
                const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);

                // Add some wings
                const wingGeo = new THREE.BoxGeometry(20, 40, 5);
                wingGeo.translate(-10, 0, 0); // push back a bit
                const wingMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
                const wingMesh = new THREE.Mesh(wingGeo, wingMat);

                this.glPlayerShip.add(bodyMesh);
                this.glPlayerShip.add(wingMesh);

                // Add a point light to the ship
                const shipLight = new THREE.PointLight(shipColor, 2, 300);
                shipLight.position.set(0, 0, 20); // slightly above
                this.glPlayerShip.add(shipLight);

                this.glScene.add(this.glPlayerShip);

                // Lighting
                const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
                this.glScene.add(ambientLight);

                const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
                dirLight.position.set(0, 0, 100);
                this.glScene.add(dirLight);
            },

        renderWebGL(time) {
                if (!this.webglReady) return;

                const width = window.innerWidth;
                const height = window.innerHeight;

                // 2D game uses this.camera.zoom and this.camera.x / y
                const zoom = (this.camera && this.camera.zoom) ? this.camera.zoom : 1.0;

                if (this.playerShip && this.camera) {
                    // Update 3D ship position and rotation
                    if (this.glPlayerShip) {
                        this.glPlayerShip.position.set(this.playerShip.x, this.playerShip.y, 0);
                        this.glPlayerShip.rotation.z = this.playerShip.rotation;

                        // In 2D, the ship size is 45 / zoom, effectively keeping it constant screen size.
                        // We'll scale the 3D mesh to match this behavior.
                        this.glPlayerShip.scale.set(1 / zoom, 1 / zoom, 1 / zoom);
                    }

                    // Update camera to follow the exact same coordinate as the 2D camera
                    this.glCamera.position.x = this.camera.x;
                    this.glCamera.position.y = this.camera.y;

                    // Apply zoom to the camera
                    this.glCamera.zoom = zoom;
                    this.glCamera.updateProjectionMatrix();
                }

                // Render the WebGL scene
                this.glRenderer.render(this.glScene, this.glCamera);
            },

        generateStaticBackground() {
                const bgStars = [];
                const count = 300; // number of background stars
                for (let i = 0; i < count; i++) {
                    bgStars.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        size: Math.random() * 0.5 + 0.1,
                        alpha: Math.random() * 0.5 + 0.2,
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: (Math.random() - 0.5) * 1.5,
                        depth: 0.3 + Math.random() * 0.7
                    });
                }
                return bgStars;
            },

        drawCyberGrid(ctx, canvas, time) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0); // Force screen space

                const horizon = canvas.height * 0.55;
                const centerX = canvas.width / 2;
                const maxRadius = canvas.width * 1.5;

                // Space Background
                ctx.fillStyle = '#050011';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Move to vanishing point and scale Y to create a horizontal plane perspective
                ctx.translate(centerX, horizon);
                ctx.scale(1, 0.3); // Squash vertically to look like a horizontal plane

                let color1 = this.cyberColor1;
                let color2 = this.cyberColor2;

                if (this.cyberRainbowMode) {
                    const hue1 = (time * 0.05) % 360;
                    const hue2 = (time * 0.05 + 180) % 360; // Offset by 180 degrees
                    color1 = `hsl(${hue1}, 100%, 50%)`;
                    color2 = `hsl(${hue2}, 100%, 50%)`;
                }

                // Singularity core
                ctx.beginPath();
                ctx.arc(0, 0, 80, 0, Math.PI * 2);
                ctx.fillStyle = '#000000';
                ctx.shadowBlur = 100;
                ctx.shadowColor = color1;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Setup Vortex styling
                ctx.lineWidth = 2.0;

                // 1. Concentric rings moving inward (accretion)
                // We reverse the phase to make them suck into the hole
                const numRings = 20;
                const scalePhase = 1 - ((time * 0.0005) % 1);

                ctx.beginPath();
                ctx.strokeStyle = color1;
                ctx.shadowBlur = 20;
                ctx.shadowColor = color1;

                for (let i = 1; i <= numRings; i++) {
                    // Inward sucking effect
                    const ratio = (i - 1 + scalePhase) / numRings;
                    // Prevent drawing inside the black hole event horizon
                    if (ratio < 0.05) continue; 

                    const r = Math.pow(ratio, 2) * maxRadius;
                    ctx.moveTo(r, 0);
                    ctx.arc(0, 0, r, 0, Math.PI * 2);
                }
                ctx.stroke();

                // 2. Swirling radial lines (Polar Grid)
                const numSpokes = 36;
                const rotationBase = time * 0.0002;

                ctx.beginPath();
                ctx.strokeStyle = color2;
                ctx.shadowColor = color2;

                for (let i = 0; i < numSpokes; i++) {
                    const angle = (i / numSpokes) * Math.PI * 2;

                    // Draw a curved line (spiral) sucking into the center
                    const startRadius = 80;
                    ctx.moveTo(Math.cos(angle + rotationBase) * startRadius, Math.sin(angle + rotationBase) * startRadius);

                    // Use quadratic curve to make it spiral
                    const cpRadius = maxRadius * 0.4;
                    const cpAngle = angle + rotationBase + 1.5; // Curve twist
                    const cpX = Math.cos(cpAngle) * cpRadius;
                    const cpY = Math.sin(cpAngle) * cpRadius;

                    const endAngle = angle + rotationBase + 3.0;
                    const endX = Math.cos(endAngle) * maxRadius;
                    const endY = Math.sin(endAngle) * maxRadius;

                    ctx.quadraticCurveTo(cpX, cpY, endX, endY);
                }
                ctx.stroke();

                ctx.restore();
            },

        generateSingleStyle(style) {
                switch (style) {
                    case 'deep-space':
                        this.generateDeepSpaceStyle();
                        break;
                    case 'nebula':
                        this.generateNebulaStyle();
                        break;
                    case 'alien':
                        this.generateAlienStyle();
                        break;
                    case 'matrix':
                        this.generateMatrixStyle();
                        break;
                    case 'cyber':
                        this.generateCyberStyle();
                        break;
                }
            },

        clearStyleData(style) {
                switch (style) {
                    case 'deep-space':
                        // Deep space uses: galaxies, blackHoles, planets, and contributes to nebulae/backgroundStars
                        this.galaxies = [];
                        this.blackHoles = [];
                        this.planets = [];
                        this.nebulae = []; // Clear deep-space nebulae
                        this.backgroundStars = []; // Fix memory leak / freeze
                        if (this.activeStyles.has('nebula')) {
                            this.generateSingleStyle('nebula'); // Restore nebula style if it was active
                        }
                        break;
                    case 'nebula':
                        // Clear nebula clouds
                        this.nebulae = [];
                        if (this.activeStyles.has('deep-space')) {
                            // Deep space also generates some nebulae, restore them
                            this.galaxies = [];
                            this.blackHoles = [];
                            this.planets = [];
                            this.generateSingleStyle('deep-space');
                        }
                        break;
                    case 'alien':
                        this.spacecraft = [];
                        break;
                    case 'matrix':
                        this.matrixStreams = [];
                        break;
                    case 'cyber':
                        this.cyberGrid = null; // Clear synthwave grid
                        break;
                }
            },

        updateBgUI() {
                // Update Buttons
                document.querySelectorAll('.bg-toggle').forEach(btn => {
                    const style = btn.getAttribute('data-style');
                    if (this.activeStyles.has(style)) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

                // Show/hide matrix panel when matrix style is active
                const matrixPanel = document.getElementById('matrixPanel');
                if (matrixPanel) {
                    if (this.activeStyles.has('matrix')) {
                        matrixPanel.classList.remove('hidden');
                    } else {
                        matrixPanel.classList.add('hidden');
                    }
                }

                // Show/hide cyber panel when cyber style is active
                const cyberPanel = document.getElementById('cyberPanel');
                if (cyberPanel) {
                    if (this.activeStyles.has('cyber')) {
                        cyberPanel.classList.remove('hidden');
                    } else {
                        cyberPanel.classList.add('hidden');
                    }
                }

                // Show/hide battle toggle when alien style is active
                const battleBtn = document.getElementById('battleToggleBtn');
                if (battleBtn) {
                    if (this.activeStyles.has('alien')) {
                        battleBtn.style.display = 'inline-block';
                        if (this.settings && this.settings.bgBattles) {
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
            },

        toggleBgBattles() {
                if (!this.settings) return;
                this.settings.bgBattles = !this.settings.bgBattles;

                const cb = document.getElementById('settingBgBattles');
                if (cb) cb.checked = this.settings.bgBattles;

                this.updateBgUI();
                localStorage.setItem('gameSettings', JSON.stringify(this.settings));
                this.showToast(this.settings.bgBattles ? 'Background Battles Enabled' : 'Background Battles Disabled');
            },

        preloadEffects() {
                console.log('[Aether] Preloading effects to prevent stutter...');
                // Generate a small batch of particles to force JIT compilation
                const dummy = this.generateSupernovaParticles(10);

                // Warm up the render paths (dry run)
                const ctx = this.ctx;
                if (ctx) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.createRadialGradient(0, 0, 1, 0, 0, 10);
                    ctx.restore();
                }
                console.log('[Aether] Effects preloaded.');
            }
    });
}
