// Interstellar Game Engine
// Restored Mindwave Lotus Features
(function() {
    const banner = document.createElement('div');
    banner.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);background:rgba(255,100,200,0.8);color:white;padding:10px 20px;border-radius:20px;z-index:10000;font-weight:bold;font-family:Orbitron, sans-serif;pointer-events:none;transition:opacity 2s;box-shadow:0 0 20px rgba(255,100,200,0.5);';
    banner.innerText = '🌸 MINDWAVE LOTUS ENGINE V3.1 ACTIVE 🌸';
    document.body.appendChild(banner);
    setTimeout(() => { if(banner) banner.style.opacity = '0'; }, 3000);
    setTimeout(() => { if(banner) banner.remove(); }, 5000);
})();

console.log("🚀 INTERSTELLAR ENGINE V3.1 - Mindwave Lotus Restoration Active");
console.log("🌸 Lotus Rendering: Tribal Sun + Petals enabled.");

/**
 * InterstellarEngine - Core Game Class
v5.0 - Pre-Placement Color Model
 */


// === AUDIO ENGINE ===
// Moved to audio-engine.js (Phase 8 modularization)
// gameAudio instance available globally via window.gameAudio

class InterstellarEngine {
    constructor() {
        console.log("🚀 InterstellarEngine: Initializing...");
        console.log("InterstellarEngine Loaded - Quantum v5.1");
        this.canvas = document.getElementById('canvas');
        if (!this.canvas) {
            console.error("❌ CRITICAL: Canvas element NOT found!");
            return;
        }
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        console.log("✅ Canvas context initialized");
        document.title = "INTERSTELLAR v3.1 - Mindwave Lotus Restoration";
        
        // Load Mindwave Lotus image
        this.lotusImage = new Image();
        this.lotusImage.src = '../mindwave-cursor.png';

        // Configuration
        this.config = {
            maxConnectDist: 180,
            starBaseRad: 3.5,
            minGroupSize: 3,
            bgColor: '#020205',
            showBackground: true,
        };

        // World size for background generation (covers full canvas at min zoom 0.1x)
        this.worldSize = 12000;

        // Procedural Universe Generation System
        this.sectorSize = 10000; // Each sector is 10k x 10k units
        this.loadedSectors = new Map(); // Map of "x,y" -> sector data
        this.currentSector = { x: 0, y: 0 }; // Player's current sector
        this.generationBoundary = 3000; // Generate new sectors when within this distance of edge

        // State
        this.stars = [];
        this.resetCamera();
        this.history = [];
        this.mode = 'draw'; // 'draw' or 'select'

        // NEW COLOR STATE
        this.activeColor = '#00f3ff';
        this.colorMode = 'fixed'; // 'fixed' or 'rainbow'
        this.activeStyles = new Set(); // Start with no backgrounds active
        this.matrixSpeedMultiplier = 1.0; // User-adjustable cyber speed
        this.matrixLengthMultiplier = 1.0; // User-adjustable cyber stream length
        this.matrixColor = '#00ff00'; // User-adjustable matrix stream color
        this.matrixRainbowMode = false; // Rainbow color cycling for matrix
        this.matrixAngle = 0; // Angle in degrees for stream direction

        // Generic Background Mode Options
        this.starColors = ['#ffffff', '#aaddff', '#ffddaa']; // 3 customizable star colors
        this.bgDriftMode = false; // Star drift movement enabled  
        this.bgWarpMode = false; // Warp speed effect enabled
        this.warpSpeed = 0; // Current warp animation speed (for ramping)
        this.warpSpeedMultiplier = 1; // User-controlled warp intensity (0.5 to 5)
        this.warpStartTime = 0; // When warp mode started
        this.shootingStarsActive = []; // Active shooting stars in normal mode
        this.lastShootingStarTime = 0; // Last time a shooting star was spawned

        // Flight game state
        this.flightMode = false;
        this.keysPressed = {};
        // 5. Load Persistent State (PRIORITIZE: Load before ship init to ensure cargoCount check works)
        this.credits = this.loadCredits();
        this.playerGems = parseInt(localStorage.getItem('playerGems')) || 0;
        this.playerInventory = this.loadInventory();
        this.carriedResources = this.loadCarriedResources();
        const savedUpgrades = this.loadUpgrades();

        try {
            this.unlockedShips = JSON.parse(localStorage.getItem('unlockedShips')) || ['interceptor', 'hauler', 'orion', 'draco', 'phoenix'];
        } catch (e) {
            this.unlockedShips = ['interceptor', 'hauler', 'orion', 'draco', 'phoenix'];
        }

        const savedShipType = localStorage.getItem('playerShipType') || 'interceptor';
        this.playerShip = {
            type: savedShipType,
            x: 0, y: 0, z: 0,
            vx: 0, vy: 0, vz: 0,
            rotation: 0,
            pitch: 0, // 3D pitch rotation (up/down)
            roll: 0,  // 3D roll rotation (barrel roll)
            speed: 0,
            maxSpeed: 50 * (1 + (savedUpgrades.speed || 0) * 0.2),
            acceleration: 0.5 * (1 + (savedUpgrades.speed || 0) * 0.1),
            rotationSpeed: 0.08,
            size: 45,
            color: localStorage.getItem('playerShipColor') || '#00f3ff', // Customizable color
            hullHealth: 100 * (1 + (savedUpgrades.armor || 0) * 0.2),
            maxHull: 100 * (1 + (savedUpgrades.armor || 0) * 0.2),
            shield: 50 * (1 + (savedUpgrades.shield || 0) * 0.2),
            maxShield: 50 * (1 + (savedUpgrades.shield || 0) * 0.2),
            radarRange: 2000 * (1 + (savedUpgrades.radar || 0) * 0.3),
            tractorRadius: 25 * (1 + (savedUpgrades.tractor || 0) * 0.5),
            maxCargo: 1000 * (1 + (savedUpgrades.cargo || 0) * 1.0), // Scale cargo with upgrade
            cargoCount: Object.values(this.carriedResources || {}).reduce((a, b) => a + (Number(b) || 0), 0),
            upgrades: savedUpgrades,
            // Ability State
            lastDamageTime: 0,
            boostActive: false,
            boostStartTime: 0,
            isCloaked: false,
            lastPulseTime: 0
        };


        // Space Base - player's permanent base
        this.spaceBase = this.loadSpaceBase() || {
            x: 0, y: 0,
            isDeployed: false,
            isTowing: false,
            modules: [],
            resources: {}, // Safe storage (not lost on death)
        };

        // Base modules available
        this.baseModules = {
            command: { name: 'Command Center', cost: 1000, icon: '🏛️', required: null },
            storage: { name: 'Storage Vault', cost: 500, icon: '📦', required: 'command' },
            research: { name: 'R&D Lab', cost: 2000, icon: '🔬', required: 'command', resourceCost: { quartz: 50 } },
            engineering: { name: 'Engineering Bay', cost: 1500, icon: '🔧', required: 'command', resourceCost: { titanium: 30 } },
            manufacturing: { name: 'Manufacturing', cost: 2500, icon: '🏭', required: 'engineering', resourceCost: { iron: 100 } },
            hydroponics: { name: 'Hydroponics', cost: 1000, icon: '🌱', required: 'command', resourceCost: { silicon: 20 } },
            refinery: { name: 'Refinery', cost: 2000, icon: '⚗️', required: 'manufacturing', resourceCost: { coal: 50 } },
            defense: { name: 'Defense Turret', cost: 1500, icon: '🔫', required: 'command', resourceCost: { copper: 25 } },
            shield: { name: 'Shield Generator', cost: 3000, icon: '🛡️', required: 'engineering', resourceCost: { ruby: 10 } },
            teleport: { name: 'Teleport Pad', cost: 10000, icon: '🌀', required: 'research', resourceCost: { darkmatter: 5 } },
            hangar: { name: 'Hangar Bay', cost: 5000, icon: '🛸', required: 'command', resourceCost: { titanium: 50 } },
            trading: { name: 'Trading Post', cost: 3000, icon: '💱', required: 'command', resourceCost: { gold: 20 } },
        };

        this.tutorialSuccessCount = 0;

        // --- TRAINING TRACK SYSTEM ---
        this.trainingActive = false;
        this.trainingLesson = null;
        this.trainingLessonIndex = -1;
        this.trainingGates = [];
        this.trainingGems = [];
        this.trainingGateIndex = 0;
        this.trainingGemsCollected = 0;
        this.trainingTimer = 0;
        this.trainingStartTime = 0;
        this.trainingBriefing = false;
        this.trainingBriefingStart = 0;
        this.trainingComplete = false;
        this.trainingMedal = null;
        this.trainingProgress = this.loadTrainingProgress();

        // --- MISSION & FACTION STATS (Initialized for HUD stability) ---
        this.missionsCompleted = Number(localStorage.getItem('missionsCompleted')) || 0;
        this.bossesDefeated = Number(localStorage.getItem('bossesDefeated')) || 0;
        this.factionRep = this.loadFactionRep();

        // --- 8. Persistent State Network (Bridge) ---
        this.requestLoadData();
        window.addEventListener('message', (e) => this.handleBridgeMessage(e));

        // Mineral system
        this.minerals = [];

        // Resource deposits - persistent locations with finite resources
        this.resourceDeposits = [];

        // Defense entities
        this.sentinels = [];     // AI patrol drones
        this.forcefields = [];   // Energy barriers
        this.turrets = [];       // Stationary guns
        this.guardians = [];     // Boss-level protectors
        this.projectiles = [];   // Active projectiles
        this.damageParticles = []; // Smoke and sparks from damage
        this.playerInventory = this.loadInventory();
        this.collectionNotifications = [];

        // All arrays required by the flight loop — must be initialized before any game loop call
        this.enemyShips = [];
        this.enemyBullets = [];
        this.spaceMines = [];
        this.missileBases = [];
        this.hazardBlackHoles = [];
        this.maulerDebris = [];
        this.enemyMissiles = [];   // Heat-seeking missiles from bases
        this.decoyFlares = [];     // Player-deployed flare countermeasures
        this.bullets = [];         // Legacy bullet array (used in render pass)
        this.speedLines = [];      // Warp/speed visual trails — MUST exist before updatePlayerShip runs
        this.glowSprites = {};     // Glow sprite cache — populated by initGlowSprites() on init

        try {
            this.playerSkills = JSON.parse(localStorage.getItem('playerSkills')) || { emp: 0, afterburner: 0, quantum: 0 };
        } catch(e) {
            this.playerSkills = { emp: 0, afterburner: 0, quantum: 0 };
        }

        this.globalAbilityActive = null;
        this.activeBoss = null;
        this.activeMission = null;
        this.hazardEffect = null;
        this.tutorialActive = false;
        this.frameCounter = 0;

        // Initialize Matrix theme history (must exist before toggleBgStyle/generateCyberStyle is called)
        try {
            const savedHistory = localStorage.getItem('matrixThemeHistory');
            this.themeHistory = savedHistory ? JSON.parse(savedHistory) : [];
            this.lastMatrixFamily = localStorage.getItem('matrixLastFamily') || '';
        } catch (e) {
            this.themeHistory = [];
            this.lastMatrixFamily = '';
        }

        // Initialize background arrays (must exist before toggleBgStyle is called)
        this.staticStars = [];
        this.galaxies = [];
        this.blackHoles = [];
        this.shootingStars = [];
        this.backgroundStars = [];
        this.nebulae = [];
        this.spacecraft = [];
        this.matrixStreams = [];
        this.planets = [];

        // 3D Rotation State (degrees)
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;

        // Interaction State
        this.pointer = { x: 0, y: 0, startX: 0, startY: 0, isDown: false, dragging: false, lastWorldX: 0, lastWorldY: 0 };
        this.hoveredStar = null;
        this.draggedStar = null;
        this.draggedClusterId = null; // Used only for dragging entire clusters
        this.frameCounter = 0;

        // Generators
        this.initNameGenerators();
        this.initTemplates();
        this.proceduralManager.generateResourceDeposits();

        // Hangar State
        this.currentHangarBay = 0;
        this.hangarShips = [
            { id: 'interceptor', name: 'INTERCEPTOR', model: 'Scout Mark IV', speed: 90, armor: 'Light', power: 'Nimble Dash', desc: 'Standard issue Aether Fleet scout. High visibility, extreme agility.', premium: false },
            { id: 'orion', name: 'ORION', model: 'Cosmos Custom', speed: 100, armor: 'Medium', power: 'Constellation Sync', desc: 'A custom frame built from raw stardust. Adapts to your drawings.', premium: false },
            { id: 'hauler', name: 'MAULER', model: 'Juggernaut-9', speed: 70, armor: 'Heavy+', power: 'Gravity Well', desc: 'Massive armored hull capable of towing stars. Industrial powerhouse.', premium: false },
            { id: 'draco', name: 'DRACO', model: 'Dragon-Wing', speed: 130, armor: 'Light', power: 'Hyper-Cruise', desc: 'Built for pure velocity. The fastest non-pro vessel in the sector.', premium: false },
            { id: 'phoenix', name: 'PHOENIX', model: 'S-77 Firebird', speed: 95, armor: 'Renewable', power: 'Solar Siphon', desc: 'Advanced hull that regenerates from cosmic radiation.', premium: false },
            { id: 'saucer', name: 'SAUCER', model: 'Ancient Disk', speed: 110, armor: 'Shielded', power: 'Inertia Nullifier', desc: 'Mysterious tech from the inner rings. Defies standard physics.', premium: true },
            { id: 'harvester', name: 'STARFIGHTER', model: 'Mk. Infinity', speed: 140, armor: 'Aegis+', power: 'Final Strike', desc: 'The ultimate combat vessel. Apex of Aether engineering.', premium: true },
            { id: 'viper', name: 'VIPER', model: 'V-12 Strike', speed: 120, armor: 'Medium', power: 'Speed Surge', desc: 'Elite interceptor with extreme burst acceleration modules.', premium: true },
            { id: 'bulwark', name: 'BULWARK', model: 'Titan Ward', speed: 60, armor: 'Fortress', power: 'Shield Regen', desc: 'The ultimate defensive platform. Near-impenetrable armor plating.', premium: true },
            { id: 'prospector', name: 'PROSPECTOR', model: 'Mining Rig', speed: 80, armor: 'Reinforced', power: 'Gem Magnet', desc: 'Optimized for resource extraction with powerful magnetic fields.', premium: true },
            { id: 'spectre', name: 'SPECTRE', model: 'Ghost Frame', speed: 105, armor: 'Phase', power: 'Cloak', desc: 'Stealth-first design. Vanish from radar at the touch of a key.', premium: true },
            { id: 'nova', name: 'NOVA', model: 'Supernova S-1', speed: 100, armor: 'Volatile', power: 'Volatile Core', desc: 'Experimental engine that releases energy on structural failure.', premium: true },
            { id: 'siphon', name: 'SIPHON', model: 'Leech V1', speed: 85, armor: 'Energy', power: 'Energy Leech', desc: 'Drains energy from local anomalies to power its specialized systems.', premium: true },
            { id: 'titan', name: 'TITAN', model: 'Colossus', speed: 50, armor: 'Undeath', power: 'Hardened Hull', desc: 'A literal flying mountain. Slow, but effectively indestructible.', premium: true },
            { id: 'pulse', name: 'PULSE', model: 'Radar-Class', speed: 130, armor: 'Sensors', power: 'Pulse Ping', desc: 'Tactical specialist with long-range environmental mapping.', premium: true },
            { id: 'flux', name: 'FLUX', model: 'Phase-Shift', speed: 115, armor: 'Quantum', power: 'Phase Shift', desc: 'Blinks in and out of existence to bypass physical obstacles.', premium: true },
            { id: 'apex', name: 'APEX', model: 'Overclocker', speed: 100, armor: 'Cyber', power: 'Overclock', desc: 'Pushing boundaries of digital integration for peak performance.', premium: true }
        ];
        this._hangarLoopRunning = false;

        // Performance
        this.init();
    }

    async initTemplates() {
        try {
            // Use fetch for JSON loading to avoid MIME type issues
            const [zodiac, animals, mythology] = await Promise.all([
                fetch('./templates/zodiac.json').then(res => res.json()),
                fetch('./templates/animals.json?bust=1').then(res => res.json()),
                fetch('./templates/mythology.json').then(res => res.json())
            ]);

            this.templates = { zodiac, animals, mythology };

            // Render Buttons
            const createBtn = (category, key, containerId) => {
                const btn = document.createElement('button');
                btn.className = 'btn-small';
                btn.style.margin = '2px';
                btn.style.textTransform = 'capitalize';
                btn.innerText = key;
                btn.onclick = () => this.loadTemplate(category, key);
                document.getElementById(containerId).appendChild(btn);
            };

            // Only render if data loaded
            if (this.templates.zodiac) Object.keys(this.templates.zodiac).forEach(k => createBtn('zodiac', k, 'zodiacTemplates'));
            if (this.templates.animals) Object.keys(this.templates.animals).forEach(k => createBtn('animals', k, 'animalTemplates'));
            if (this.templates.mythology) Object.keys(this.templates.mythology).forEach(k => createBtn('mythology', k, 'mythTemplates'));

        } catch (e) {
            console.error("Template loading failed:", e);
            this.hudManager.showToast("Failed to load templates");
        }
    }

    // Camera Management Methods
    resetCamera() {
        this.setCamera(0, 0, 1, 1);
    }

    setCamera(x, y, zoom, targetZoom) {
        this.camera = {
            x: x || 0,
            y: y || 0,
            zoom: zoom || 1,
            targetZoom: targetZoom || zoom || 1
        };
    }

    loadTemplate(category, key) {
        const points = this.templates[category][key];
        if (!points) return;

        this.saveState(); // Save before clearing

        // Center Calculation: Find centroid of the template points
        let totalX = 0, totalY = 0, totalZ = 0;
        points.forEach(p => {
            totalX += p[0];
            totalY += p[1];
            totalZ += (p[2] || 0);
        });
        const count = points.length;
        const centroidX = totalX / count;
        const centroidY = totalY / count;
        const centroidZ = totalZ / count;

        // Reset Camera via safe method
        this.resetCamera();

        // Center Position
        const cx = 0;
        const cy = 0;
        const scale = 3;

        // Offset calculation happens inside mapping (p[0] - centroidX)

        // Check Rainbow Mode
        const isRainbow = document.getElementById('templateRainbowMode')?.checked;
        const templateColor = document.getElementById('templateColorPicker')?.value || '#00ffff';

        // Generate Creative Name
        const baseName = key.charAt(0).toUpperCase() + key.slice(1);
        let creativeName = baseName;

        try {
            if (!this.prefixes) this.initNameGenerators();
            if (this.prefixes && this.prefixes.length > 0) {
                if (Math.random() > 0.5) {
                    const prefix = this.prefixes[Math.floor(Math.random() * this.prefixes.length)];
                    creativeName = `${prefix} ${baseName} `;
                } else {
                    const suffix = this.suffixes[Math.floor(Math.random() * this.suffixes.length)];
                    creativeName = `${baseName} ${suffix} `;
                }
            }
        } catch (e) { console.warn("Name gen failed", e); }

        // Create stars with 3D Depth
        const newStars = points.map((p, i) => {
            let zDepth = 0;
            let xPos = p[0] - centroidX;
            let yPos = p[1] - centroidY;
            let pZ = (p[2] || 0) - centroidZ;

            if (p.length >= 3) {
                // Explicit Z from template data
                zDepth = pZ * scale;
            } else {
                // Implicit 3D: Map 2D constellations onto a gentle celestial curve
                // Calculate distance from center (which is now 0,0 locally)
                const dist = Math.sqrt(xPos * xPos + yPos * yPos);
                // Curve edges away
                zDepth = -(dist * dist) * 0.05 * scale;
            }

            return {
                id: Date.now() + i,
                x: cx + xPos * scale,
                y: cy + yPos * scale,
                z: zDepth,
                color: isRainbow ? this.getRainbowHex() : templateColor,
                phase: Math.random() * Math.PI * 2,
                clusterId: creativeName
            };
        });

        this.stars = newStars;

        // Close panel
        document.getElementById('templatePanel').style.display = 'none';
        this.hudManager.showToast(`Loaded ${key} template`);
        this.renderManager.draw();
    }

    initNameGenerators() {
        this.prefixes = ["Alpha", "Beta", "Gamma", "Delta", "Neo", "Proto", "Hyper", "Cyber", "Dark", "Lost", "Royal", "Azure", "Crimson", "Void", "Solar", "Lunar", "Emerald", "Obsidian"];
        this.roots = ["Orion", "Cygnus", "Draco", "Lyra", "Vela", "Hydra", "Cetus", "Lupus", "Pavo", "Volans", "Aries", "Leo", "Gemini", "Ursa", "Vortex", "Helix", "Prism", "Shard", "Echo", "Serpens", "Phoenix"];
        this.suffixes = ["Major", "Minor", "Prime", "Zero", "Cluster", "Nebula", "Expanse", "Quadrant", "Sector", "Knot", "Web", "Crown", "Trident", "Gate", "Symphony", "Paradox"];
    }

    init() {
        window.game = this; // Expose for debugging
        window.addEventListener('resize', () => this.resize());

        // Load Pro State
        this.isPro = localStorage.getItem('isPro') === 'true';
        this.initAdminPanel();

        // Initial mode setup
        this.setMode('draw');
        // Initial color state setup
        this.updateColorModeUI();

        // Cyber speed slider
        this.matrixColorCustomized = false;

        // UI Events
        this.initDraggableWindows();

        // Make all panels resizable with 2D support
        this.makeResizable('floatingMap');
        this.makeResizable('floatingLeaders');
        this.makeResizable('sectionControls');
        this.makeResizable('sectionRadar');
        this.makeResizable('sectionVelocity');
        this.makeResizable('sectionMission');

        // Apply saved HUD layout 
        setTimeout(() => this.setLayout(localStorage.getItem('hudLayout') || 'horizontal'), 500);

        // Initialize kbd tooltips for flight controls
        this.initKbdTooltips();
        this.makeResizable('sectionMap');
        this.makeResizable('sectionGems');

        document.querySelectorAll('.popup-panel').forEach(panel => {
            if (panel.id) this.makeResizable(panel.id);
        });

        // Matrix (previously Cyber) speed slider
        const matrixSpeedSlider = document.getElementById('matrixSpeedSlider');
        if (matrixSpeedSlider) {
            matrixSpeedSlider.addEventListener('input', (e) => {
                this.matrixSpeedMultiplier = parseFloat(e.target.value);
                document.getElementById('matrixSpeedValue').textContent = this.matrixSpeedMultiplier.toFixed(1) + 'x';
            });
        }

        // Matrix length slider
        const matrixLengthSlider = document.getElementById('matrixLengthSlider');
        if (matrixLengthSlider) {
            matrixLengthSlider.addEventListener('input', (e) => {
                this.matrixLengthMultiplier = parseFloat(e.target.value);
                document.getElementById('matrixLengthValue').textContent = this.matrixLengthMultiplier.toFixed(1) + 'x';
            });
        }

        // Matrix angle slider
        const matrixAngleSlider = document.getElementById('matrixAngleSlider');
        if (matrixAngleSlider) {
            matrixAngleSlider.addEventListener('input', (e) => {
                this.matrixAngle = parseFloat(e.target.value);
                document.getElementById('matrixAngleValue').textContent = this.matrixAngle + '°';
            });
        }

        // Ship color picker
        const shipColorPicker = document.getElementById('shipColorPicker');
        if (shipColorPicker) {
            shipColorPicker.value = this.playerShip.color;
            shipColorPicker.addEventListener('input', (e) => {
                this.setShipColor(e.target.value);
            });
        }

        // Initialize Camera picker
        const matrixColorPicker = document.getElementById('matrixColorPicker');
        const matrixColorHex = document.getElementById('matrixColorHex');
        if (matrixColorPicker) {
            matrixColorPicker.addEventListener('input', (e) => {
                this.matrixColor = e.target.value;
                this.matrixColorCustomized = true;
                if (matrixColorHex) matrixColorHex.value = e.target.value;
                if (this.matrixStreams) this.matrixStreams.forEach(s => s.color = this.matrixColor);
            });
        }
        if (matrixColorHex) {
            matrixColorHex.addEventListener('input', (e) => {
                let val = e.target.value;
                if (val.match(/^#[0-9A-Fa-f]{6}$/)) {
                    this.matrixColor = val;
                    this.matrixColorCustomized = true;
                    if (matrixColorPicker) matrixColorPicker.value = val;
                    if (this.matrixStreams) this.matrixStreams.forEach(s => s.color = this.matrixColor);
                }
            });
        }

        // 3D Rotation sliders
        const rotXSlider = document.getElementById('rotXSlider');
        const rotYSlider = document.getElementById('rotYSlider');
        const rotZSlider = document.getElementById('rotZSlider');

        if (rotXSlider) {
            rotXSlider.addEventListener('input', (e) => {
                this.rotationX = parseFloat(e.target.value);
                document.getElementById('rotXValue').textContent = this.rotationX + '°';
            });
        }
        if (rotYSlider) {
            rotYSlider.addEventListener('input', (e) => {
                this.rotationY = parseFloat(e.target.value);
                document.getElementById('rotYValue').textContent = this.rotationY + '°';
            });
        }
        if (rotZSlider) {
            rotZSlider.addEventListener('input', (e) => {
                this.rotationZ = parseFloat(e.target.value);
                document.getElementById('rotZValue').textContent = this.rotationZ + '°';
            });
        }

        // Init Mobile Controls
        this.inputManager = new window.InputManager(this);
        this.combatManager = new window.CombatManager(this);
        this.proceduralManager = new window.ProceduralManager(this);
        this.physicsManager = new window.PhysicsManager(this);
        this.renderManager = new window.RenderManager(this);
        this.playerManager = new window.PlayerManager(this);
        this.missionManager = new window.MissionManager(this);
        this.hazardManager = new window.HazardManager(this);
        this.hudManager = new window.HUDManager(this);

        // Trigger initial background generation
        this.resize();

        // Initial UI population
        this.hudManager.updateWalletUI();
        this.hudManager.updateInventoryUI();
        if (this.updateGemsUI) this.updateGemsUI();
        this.hudManager.updateShipStatus();
        this.missionManager.updateMap();

        // First-login tracking & onboarding
        this.checkFirstLogin();

        this.initGlowSprites(); // Pre-build glow sprite cache before first render frame
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    // Mobile Controls
    toggleMobileControls() {
        const joy = document.getElementById('joystick-container');
        if (joy) {
            joy.style.display = joy.style.display === 'none' ? 'block' : 'none';
        }
    }


    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Regenerate screen-space background (static stars) to ensure coverage
        this.staticStars = [];
        this.proceduralManager.generateStaticStars();

        this.renderManager.draw();

        // Update 3D Hangar scaling if active
        if (this.resizeHangar) {
            this.resizeHangar();
        }
    }

    resizeHangar() {
        // With the new responsive CSS, we don't need the manual scale() transform.
        // However, we should ensure the track position is updated if needed.
        this.updateHangarUI();
    }

    /**
     * FIX: Added the missing function to generate static background stars.
     * This method is now positioned explicitly before other methods that rely on it
     * (like resize) to ensure availability in sensitive execution environments.
     */


    initDraggableWindows() {
        // Reusable drag function
        const makeDraggable = (elementId) => {
            const element = document.getElementById(elementId);
            if (!element) return;

            // Find the header - it could be .window-header or .cockpit-header
            const header = element.querySelector('.window-header, .cockpit-header');
            if (!header) return;

            let isDragging = false;
            let startX, startY, initialX, initialY;

            header.style.cursor = 'grab';

            header.addEventListener('mousedown', (e) => {
                isDragging = true;
                header.style.cursor = 'grabbing';
                element.style.zIndex = '1000'; // Bring to front

                // Lock dimensions to current size so removing right/bottom doesn't collapse it
                const rect = element.getBoundingClientRect();
                element.style.width = rect.width + 'px';
                element.style.height = rect.height + 'px';

                // Ensure element is position:fixed for proper dragging
                if (getComputedStyle(element).position !== 'fixed') {
                    element.style.position = 'fixed';
                }

                element.style.left = rect.left + 'px';
                element.style.top = rect.top + 'px';

                startX = e.clientX;
                startY = e.clientY;

                initialX = rect.left;
                initialY = rect.top;

                e.preventDefault();
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                // Calculate new position
                let newX = initialX + dx;
                let newY = initialY + dy;

                // Bounds checking - keep at least 50px visible
                const minVisible = 50;
                const elemWidth = element.offsetWidth;
                const elemHeight = element.offsetHeight;

                // Keep within viewport bounds
                newX = Math.max(-elemWidth + minVisible, Math.min(window.innerWidth - minVisible, newX));
                newY = Math.max(0, Math.min(window.innerHeight - minVisible, newY));

                element.style.left = newX + 'px';
                element.style.top = newY + 'px';
                element.style.bottom = 'auto'; // Remove bottom positioning
                element.style.right = 'auto'; // Remove right positioning
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
                header.style.cursor = 'grab';
            });
        };

        // Make all windows draggable
        makeDraggable('floatingMap');
        makeDraggable('floatingLeaders');
        makeDraggable('sectionControls');
        makeDraggable('sectionRadar');
        makeDraggable('sectionVelocity');
        makeDraggable('sectionMap');
        makeDraggable('sectionGems');
        makeDraggable('sectionShipStatus');
    }

    setMode(newMode) {
        this.mode = newMode;
        document.getElementById('drawModeBtn').classList.remove('active');
        document.getElementById('selectModeBtn').classList.remove('active');

        if (newMode === 'draw') {
            document.getElementById('drawModeBtn').classList.add('active');
            this.canvas.style.cursor = 'crosshair';
        } else if (newMode === 'select') {
            document.getElementById('selectModeBtn').classList.add('active');
            this.canvas.style.cursor = 'pointer';
        }
    }

    /* --- NEW COLOR CONTROLS --- */

    adjustColor(color, amount) {
        if (!color) return '#ffffff';
        let usePound = false;
        if (color[0] === "#") {
            color = color.slice(1);
            usePound = true;
        }
        let num = parseInt(color, 16);
        let r = (num >> 16) + amount;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amount;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        let g = (num & 0x0000FF) + amount;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
    }

    getRainbowHex() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    setFixedColor(hexColor) {
        this.activeColor = hexColor;
        this.colorMode = 'fixed';
        this.updateColorModeUI();
        this.hudManager.showToast(`Active color set to ${hexColor} `);
    }

    setRainbowMode() {
        this.colorMode = 'rainbow';
        this.updateColorModeUI();
        this.hudManager.showToast("Active color set to Rainbow Mode 🌈");
    }

    // ===== PROCEDURAL UNIVERSE GENERATION =====

    seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    getSectorCoords(worldX, worldY) {
        return {
            x: Math.floor(worldX / this.sectorSize),
            y: Math.floor(worldY / this.sectorSize)
        };
    }

    getSectorSeed(sectorX, sectorY) {
        return sectorX * 73856093 ^ sectorY * 19349663;
    }

    checkAndGenerateSectors() {
        if (!this.flightMode) return;

        const sector = this.getSectorCoords(this.playerShip.x, this.playerShip.y);
        this.currentSector = sector;

        // Load 7x7 grid of sectors around player (increased from 3x3)
        const loadRadius = 3;
        for (let dx = -loadRadius; dx <= loadRadius; dx++) {
            for (let dy = -loadRadius; dy <= loadRadius; dy++) {
                const sx = sector.x + dx;
                const sy = sector.y + dy;
                const key = `${sx},${sy} `;
                if (!this.loadedSectors.has(key)) {
                    this.proceduralManager.generateSector(sx, sy);
                }
            }
        }

        // Cleanup sectors that are too far away (increased from 2 to 5)
        const cleanupRadius = 5;
        for (const [key] of this.loadedSectors.entries()) {
            const [sx, sy] = key.split(',').map(Number);
            const dist = Math.max(Math.abs(sx - sector.x), Math.abs(sy - sector.y));
            if (dist > cleanupRadius) {
                const sectorData = this.loadedSectors.get(key);
                if (sectorData) {
                    this.minerals = this.minerals.filter(m => !sectorData.minerals.includes(m));
                    this.resourceDeposits = this.resourceDeposits.filter(d => !sectorData.deposits.includes(d));

                    // Cleanup procedural hazards
                    if (sectorData.hazards) {
                        this.spaceMines = this.spaceMines.filter(m => !sectorData.hazards.mines.includes(m));
                        this.missileBases = this.missileBases.filter(t => !sectorData.hazards.turrets.includes(t));
                        this.hazardBlackHoles = this.hazardBlackHoles.filter(bh => !sectorData.hazards.blackHoles.includes(bh));
                    }
                }
                this.loadedSectors.delete(key);
            }
        }
    }


    toggleBgStyle(style) {
        console.log(`[BG Toggle] ${style}, currently active: `, this.activeStyles.has(style));
        if (this.activeStyles.has(style)) {
            // Deselecting - just remove from active, don't regenerate others
            this.activeStyles.delete(style);
            // Clear only this style's data
            this.clearStyleData(style);
        } else {
            // Enabling - only generate this specific style
            this.activeStyles.add(style);
            this.proceduralManager.generateSingleStyle(style);
        }

        this.updateBgUI();
        this.proceduralManager.generateStaticStars(); // Refresh static stars for color mix
    }

    // Generate only a single style's data


    // Clear only a specific style's data
    clearStyleData(style) {
        switch (style) {
            case 'deep-space':
                // Deep space uses: galaxies, blackHoles, planets, and contributes to nebulae/backgroundStars
                this.galaxies = [];
                this.blackHoles = [];
                this.planets = [];
                break;
            case 'nebula':
                // Clear nebula clouds
                this.nebulae = [];
                break;
            case 'alien':
                this.spacecraft = [];
                break;
            case 'cyber':
                this.matrixStreams = [];
                break;
        }
    }

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

        // Show/hide matrix panel when cyber style is active
        const matrixPanel = document.getElementById('matrixPanel');
        if (matrixPanel) {
            if (this.activeStyles.has('cyber')) {
                matrixPanel.classList.remove('hidden');
            } else {
                matrixPanel.classList.add('hidden');
            }
        }
    }

    // Warm up the particle generators to prevent JIT lag on first explosion
    preloadEffects() {
        console.log('[Aether] Preloading effects to prevent stutter...');
        // Generate a small batch of particles to force JIT compilation
        const dummy = this.proceduralManager.generateSupernovaParticles(10);

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

    // Toggle functions for popup panels
    toggleRotationPanel() {
        const panel = document.getElementById('rotationPanel');
        if (panel) panel.classList.toggle('hidden');
    }

    toggleTemplatePanel() {
        const panel = document.getElementById('templatePanel');
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    }

    toggleFlightMode() {
        this.flightMode = !this.flightMode;
        this.mode = this.flightMode ? 'flight' : 'draw'; // Sync game mode to allow correct rendering

        // Initial sector generation so the player doesn't fly into a void
        if (this.flightMode) {
            this.checkAndGenerateSectors();
        }

        // Ensure ship is at valid coordinates (Fix NaN or undefined)
        if (!this.playerShip) {
            this.playerShip = this.initPlayerShip(); // Should be initialized by now, but just in case
        }
        if (isNaN(this.playerShip.x)) this.playerShip.x = 0;
        if (isNaN(this.playerShip.y)) this.playerShip.y = 0;
        if (isNaN(this.playerShip.vx)) this.playerShip.vx = 0;
        if (isNaN(this.playerShip.vy)) this.playerShip.vy = 0;

        // Safety: Clear any active hazard effects when entering/exiting flight mode
        // EXCEPT nuclear explosions which should play out fully
        if (this.hazardEffect && this.hazardEffect.type !== 'supernova') {
            this.hazardEffect = null;
        }
        this.camera.shakeX = 0;
        this.camera.shakeY = 0;

        // Toggle HUD overlay
        const hud = document.getElementById('flightHUD');
        const floatingLeaders = document.getElementById('floatingLeaders');
        const missionSection = document.getElementById('sectionMission');

        if (this.flightMode) {
            if (hud) hud.classList.remove('hidden');
            if (floatingLeaders) floatingLeaders.classList.remove('hidden');
            this.updateFloatingLeaderboard();
            this.hudManager.showToast('Flight Mode: ON - Use WASD/QE/Shift');
            this.hudManager.updateMissionHUD(); // Call the new mission HUD update
            this.hudManager.updateFactionHUD(); // Boot Faction HUD
            // Audio: start engine hum + ambient music
            gameAudio.startEngineHum();
            gameAudio.startAmbientMusic();
        } else {
            if (hud) hud.classList.add('hidden');
            if (floatingLeaders) floatingLeaders.classList.add('hidden');
            this.hudManager.updateFactionHUD(); // Hide HUD
            // Audio: stop engine + music
            gameAudio.stopEngineHum();
            gameAudio.stopAmbientMusic();
        }

        // Ensure a background is active
        if (this.flightMode && this.activeStyles.size === 0) {
            this.toggleBgStyle('deep-space');
        }

        this.hudManager.showToast(this.flightMode ? 'Flight Mode: ON - Use WASD/QE/Shift' : 'Flight Mode: OFF');

        // Reset keys to prevent runaway ship
        this.keysPressed = {};

        // Initialize resize handle for gems section ONCE when entering flight mode
        if (this.flightMode && this.initGemsSectionResize) {
            this.initGemsSectionResize();
        }

        // Toggle ship button, dock button, and layout presets visibility
        const shipBtn = document.getElementById('selectShipBtn');
        const dockBtn = document.getElementById('dockBtn');
        const layoutPresets = document.getElementById('layoutPresets');
        
        console.log(`[HUD] toggleFlightMode: flightMode=${this.flightMode}, shipBtn=${!!shipBtn}, dockBtn=${!!dockBtn}`);
        
        if (shipBtn) {
            shipBtn.style.setProperty('display', this.flightMode ? 'inline-flex' : 'none', 'important');
        }
        if (dockBtn) {
            dockBtn.style.setProperty('display', this.flightMode ? 'inline-flex' : 'none', 'important');
        }

        // Toggle Vitals HUD
        const vitalsEl = document.getElementById('sectionVitals');
        if (vitalsEl) {
            vitalsEl.style.setProperty('display', this.flightMode ? 'block' : 'none', 'important');
        }
        if (layoutPresets) {
            layoutPresets.style.setProperty('display', this.flightMode ? 'flex' : 'none', 'important');
        }

        this.renderManager.draw();
    }

    setLayout(type) {
        localStorage.setItem('hudLayout', type);

        const W = window.innerWidth;
        const H = window.innerHeight;
        
        // Calculate optimal scale factor to prevent overlap on small screens
        // Horizontally, we need ~1600px of safe space. Vertically we need ~1060px for the towering arrays.
        const widthScale = W / 1600;
        const heightScale = H / 1060;
        const scale = Math.min(1.0, Math.max(0.40, Math.min(widthScale, heightScale))); 
        
        const setCoords = (id, cssMap, origin = 'top left') => {
            const el = document.getElementById(id);
            if (el) {
                // Clear any manual sizing locks
                el.style.top = 'auto';
                el.style.bottom = 'auto';
                el.style.left = 'auto';
                el.style.right = 'auto';

                for (const prop in cssMap) {
                    el.style[prop] = cssMap[prop];
                }
                
                el.style.transform = `scale(${scale})`;
                el.style.transformOrigin = origin;
                
                if (el.classList.contains('minimized-to-taskbar')) {
                    this.restoreFromTaskbar(id);
                }
            }
        };

        const topY = 72;
        const gemsH = 180;
        const gap = 8 * scale; // Tight, scaled positioning gap

        if (type === 'horizontal') {
            // THE NATIVE LOAD LAYOUT (Single Massive Top Row)
            let currentX = 15;
            setCoords('sectionMap', { top: `${topY}px`, left: `${currentX}px` });
            currentX += (220 * scale) + gap;

            setCoords('sectionRadar', { top: `${topY}px`, left: `${currentX}px` });
            currentX += (180 * scale) + gap;

            setCoords('sectionVelocity', { top: `${topY}px`, left: `${currentX}px`, display: 'flex' });
            currentX += (220 * scale) + gap;

            setCoords('sectionShipStatus', { top: `${topY}px`, left: `${currentX}px` });
            currentX += (230 * scale) + gap;
            
            setCoords('sectionControls', { top: `${topY}px`, left: `${currentX}px` });
            currentX += (210 * scale) + gap;

            setCoords('sectionShipDesign', { top: `${topY}px`, left: `${currentX}px` });
            currentX += (230 * scale) + gap;
            
            setCoords('floatingLeaders', { top: `${topY}px`, left: `${currentX}px` });
            currentX += (260 * scale) + gap;
            
            // Second row left (Below Map natively)
            setCoords('sectionMission', { top: `${topY + (220 * scale)}px`, left: '15px' });

            // BOTTOM EDGE
            setCoords('sectionGems', { bottom: '15px', left: '15px', right: '15px', minWidth: '800px', height: `${gemsH}px` }, 'bottom center');

        } else if (type === 'vertical') {
            // LEFT COLUMN (Dynamically Stacking Heights to prevent any overlap)
            let leftY = topY;
            setCoords('sectionMap', { top: `${leftY}px`, left: '15px' });
            leftY += (200 * scale) + gap;

            setCoords('sectionRadar', { top: `${leftY}px`, left: '15px' });
            leftY += (180 * scale) + gap;

            // Moved Velocity squarely under Radar precisely as requested!
            setCoords('sectionVelocity', { top: `${leftY}px`, left: '15px', display: 'flex' });
            leftY += (200 * scale) + gap;

            setCoords('sectionControls', { top: `${leftY}px`, left: '15px' });

            // RIGHT COLUMN (Dynamically Stacking Heights)
            let rightY = topY;
            setCoords('floatingLeaders', { top: `${rightY}px`, right: '15px' }, 'top right');
            rightY += (260 * scale) + gap;

            setCoords('sectionShipStatus', { top: `${rightY}px`, right: '15px' }, 'top right');
            rightY += (160 * scale) + gap;

            // Moved Ship Design directly below Ship Status
            setCoords('sectionShipDesign', { top: `${rightY}px`, right: '15px' }, 'top right');
            rightY += (230 * scale) + gap; // Uses original Ship Design height geometry
            
            // Mission Tracker trails below Design
            setCoords('sectionMission', { top: `${rightY}px`, right: '15px' }, 'top right');

            // BOTTOM EDGE (Gems span uniformly like Wide HUD)
            setCoords('sectionGems', { bottom: '15px', left: '15px', right: '15px', minWidth: '800px', height: `${gemsH}px` }, 'bottom center');
        }

        // Attach resize listener dynamically to enforce strictly on resize limits
        if (!this.resizeListenerAdded) {
            window.addEventListener('resize', () => {
                if (localStorage.getItem('hudLayout')) {
                    this.setLayout(localStorage.getItem('hudLayout'));
                }
            });
            this.resizeListenerAdded = true;
        }
    }

    // Toggle cockpit section - now minimizes to taskbar
    toggleCockpitSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        if (section.classList.contains('minimized-to-taskbar')) {
            // Restore from taskbar
            this.restoreFromTaskbar(sectionId);
        } else {
            // Minimize to taskbar
            this.minimizeToTaskbar(sectionId);
        }
    }

    // Window names for taskbar display
    getWindowName(id) {
        const names = {
            'sectionRadar': '📡 Radar',
            'sectionControls': '🎮 Controls',
            'sectionGems': '💎 Gems',
            'sectionVelocity': '🚀 Engines',
            'sectionShipStatus': '🛡️ Shield',
            'sectionShipDesign': '🎨 Ship Design',
            'floatingMap': '🗺️ Map',
            'floatingLeaders': '🏆 Leaders'
        };
        return names[id] || id;
    }

    // Toggle expanded controls modal
    toggleControlsExpanded() {
        const modal = document.getElementById('expandedControlsModal');
        if (modal) {
            modal.classList.toggle('active');
        }
    }

    hideControlsExpanded() {
        const modal = document.getElementById('expandedControlsModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Initialize kbd tooltips for flight controls
    initKbdTooltips() {
        const tooltip = document.getElementById('kbdTooltip');
        if (!tooltip) return;

        const kbdElements = document.querySelectorAll('.controls-grid kbd[data-key]');

        kbdElements.forEach(kbd => {
            kbd.addEventListener('mouseenter', (e) => {
                const key = kbd.dataset.key;
                const cmd = kbd.dataset.cmd;
                const desc = kbd.dataset.desc;

                tooltip.innerHTML = `
                    <span class="tooltip-key">${key}</span>
                    <span class="tooltip-cmd">— ${cmd}</span>
                    <span class="tooltip-desc">${desc}</span>
                `;

                // Position tooltip above kbd element
                const rect = kbd.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - 80 + 'px';
                tooltip.style.top = rect.top - 50 + 'px';
                tooltip.classList.add('visible');
            });

            kbd.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });
        });
    }

    // Minimize window to taskbar
    minimizeToTaskbar(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;

        // Save current position before hiding
        if (!this.savedWindowPositions) this.savedWindowPositions = {};
        this.savedWindowPositions[windowId] = {
            left: win.style.left,
            top: win.style.top,
            width: win.style.width,
            height: win.style.height,
            display: win.style.display
        };

        // Hide window
        win.classList.add('minimized-to-taskbar');
        win.style.display = 'none';

        // Add to taskbar
        const taskbar = document.getElementById('windowTaskbar');
        if (taskbar) {
            const item = document.createElement('div');
            item.className = 'taskbar-item';
            item.id = 'taskbar-' + windowId;
            item.textContent = this.getWindowName(windowId);
            item.onclick = () => this.restoreFromTaskbar(windowId);
            taskbar.appendChild(item);
            taskbar.style.display = 'flex';
        }
    }

    // Restore window from taskbar
    restoreFromTaskbar(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;

        // Restore position
        if (this.savedWindowPositions && this.savedWindowPositions[windowId]) {
            const pos = this.savedWindowPositions[windowId];
            if (pos.left) win.style.left = pos.left;
            if (pos.top) win.style.top = pos.top;
            if (pos.width) win.style.width = pos.width;
            if (pos.height) win.style.height = pos.height;
        }

        // Show window
        win.classList.remove('minimized-to-taskbar');
        win.style.display = 'block';

        // Remove from taskbar
        const taskbarItem = document.getElementById('taskbar-' + windowId);
        if (taskbarItem) taskbarItem.remove();

        // Hide taskbar if empty
        const taskbar = document.getElementById('windowTaskbar');
        if (taskbar && taskbar.children.length === 0) {
            taskbar.style.display = 'none';
        }
    }

    // Save current layout to a slot
    saveLayout() {
        const slot = prompt('Save to layout slot (1, 2, or 3):', '1');
        if (!slot || !['1', '2', '3'].includes(slot)) return;

        const windows = ['sectionRadar', 'sectionControls', 'sectionGems', 'sectionVelocity', 'floatingMap', 'floatingLeaders', 'sectionMap', 'sectionShipDesign', 'sectionShipStatus'];
        const layout = {};

        windows.forEach(id => {
            const win = document.getElementById(id);
            if (win) {
                layout[id] = {
                    left: win.style.left || win.offsetLeft + 'px',
                    top: win.style.top || win.offsetTop + 'px',
                    width: win.style.width,
                    height: win.style.height,
                    minimized: win.classList.contains('minimized-to-taskbar'),
                    visible: win.style.display !== 'none' && !win.classList.contains('hidden')
                };
            }
        });

        localStorage.setItem('windowLayout' + slot, JSON.stringify(layout));
        document.getElementById('layout' + slot + 'Btn')?.classList.add('active');
        this.hudManager.showToast('Layout ' + slot + ' saved!');
    }

    // Load layout from a slot
    loadLayout(slot) {
        const layoutStr = localStorage.getItem('windowLayout' + slot);
        if (!layoutStr) {
            this.hudManager.showToast('No layout saved in slot ' + slot);
            return;
        }

        try {
            const layout = JSON.parse(layoutStr);

            Object.entries(layout).forEach(([id, pos]) => {
                const win = document.getElementById(id);
                if (!win) return;

                // Restore from taskbar first if minimized
                if (win.classList.contains('minimized-to-taskbar')) {
                    this.restoreFromTaskbar(id);
                }

                // Apply position
                if (pos.left) win.style.left = pos.left;
                if (pos.top) win.style.top = pos.top;
                if (pos.width) win.style.width = pos.width;
                if (pos.height) win.style.height = pos.height;

                // Handle minimized state
                if (pos.minimized) {
                    this.minimizeToTaskbar(id);
                } else if (!pos.visible) {
                    win.style.display = 'none';
                } else {
                    win.style.display = 'block';
                    win.classList.remove('hidden');
                }
            });

            // Update active button
            ['1', '2', '3'].forEach(s => {
                document.getElementById('layout' + s + 'Btn')?.classList.toggle('active', s === String(slot));
            });

            this.hudManager.showToast('Layout ' + slot + ' loaded!');
        } catch (e) {
            console.error('Error loading layout:', e);
        }
    }

    toggleGemValues() {
        this.showGemValues = !this.showGemValues;
        this.updateFlightHUD(); // Refresh display

        const btn = document.getElementById('btnToggleGemValues');
        const gemsSection = document.getElementById('sectionGems');
        const gemsGrid = document.getElementById('gemsGrid');

        if (btn) {
            btn.style.background = this.showGemValues ? 'rgba(255,215,0,0.3)' : '';
        }

        // Auto-expand and shift left when showing values, restore when hiding
        if (gemsSection) {
            if (this.showGemValues) {
                // Store original values if not already stored
                if (!this._originalGemsHeight) {
                    this._originalGemsHeight = gemsSection.offsetHeight;
                }
                if (!this._originalGemsLeft) {
                    this._originalGemsLeft = gemsSection.style.left || '590px';
                }

                // Expand height to show all values
                const expandedHeight = Math.max(320, this._originalGemsHeight + 120);
                gemsSection.style.height = expandedHeight + 'px';

                // Shift window left to accommodate wider content with $ values
                gemsSection.style.left = '300px';

                // Widen grid columns to fit value text
                if (gemsGrid) {
                    gemsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
                }
            } else {
                // Restore original height
                if (this._originalGemsHeight) {
                    gemsSection.style.height = this._originalGemsHeight + 'px';
                }
                // Restore original left position
                if (this._originalGemsLeft) {
                    gemsSection.style.left = this._originalGemsLeft;
                }
                // Restore original grid column width
                if (gemsGrid) {
                    gemsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(110px, 1fr))';
                }
            }
        }
    }

    // Universal resize system for ALL panels
    makeResizable(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Add resize handle if it doesn't exist
        let resizeHandle = element.querySelector('.resize-handle');
        if (!resizeHandle) {
            resizeHandle = document.createElement('div');
            resizeHandle.className = 'resize-handle';
            resizeHandle.style.cssText = 'position:absolute; right:0; bottom:0; width:16px; height:16px; cursor:nwse-resize; background: linear-gradient(135deg, transparent 50%, rgba(0,243,255,0.5) 50%); z-index:10;';
            element.appendChild(resizeHandle);
        }

        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = element.offsetWidth;
            startHeight = element.offsetHeight;
            e.preventDefault();
            e.stopPropagation();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newWidth = Math.max(150, Math.min(1200, startWidth + deltaX));
            const newHeight = Math.max(100, Math.min(800, startHeight + deltaY));

            element.style.width = newWidth + 'px';
            element.style.height = newHeight + 'px';
        });

        window.addEventListener('mouseup', () => {
            isResizing = false;
        });
    }

    // Toggle floating window collapse
    toggleFloatingWindow(windowId) {
        const win = document.getElementById(windowId);
        if (win) win.classList.toggle('collapsed');
    }

    // Spacecraft color customization
    setShipColor(color) {
        this.playerShip.color = color;
        localStorage.setItem('playerShipColor', color); // Fixed Key
    }

    resetShipColor() {
        const defaultColor = '#00f3ff';
        this.playerShip.color = defaultColor;
        localStorage.setItem('playerShipColor', defaultColor); // Fixed Key
        document.getElementById('shipColorPicker').value = defaultColor;
        this.hudManager.showToast('Ship color reset to default');
    }

    // 3D Rotation controls
    setShipRotation(axis, value) {
        const degrees = parseInt(value);
        const radians = degrees * Math.PI / 180;

        if (axis === 'yaw') {
            this.playerShip.rotation = radians;
            document.getElementById('yawValue').textContent = degrees + '°';
        } else if (axis === 'pitch') {
            this.playerShip.pitch = radians;
            document.getElementById('pitchValue').textContent = degrees + '°';
        } else if (axis === 'roll') {
            this.playerShip.roll = radians;
            document.getElementById('rollValue').textContent = degrees + '°';
        }

        // Save rotation to localStorage
        localStorage.setItem('shipRotation', JSON.stringify({
            yaw: this.playerShip.rotation,
            pitch: this.playerShip.pitch,
            roll: this.playerShip.roll
        }));
    }

    resetShipRotation() {
        this.playerShip.rotation = 0;
        this.playerShip.pitch = 0;
        this.playerShip.roll = 0;

        // Reset sliders
        document.getElementById('yawSlider').value = 0;
        document.getElementById('pitchSlider').value = 0;
        document.getElementById('rollSlider').value = 0;

        // Reset labels
        document.getElementById('yawValue').textContent = '0°';
        document.getElementById('pitchValue').textContent = '0°';
        document.getElementById('rollValue').textContent = '0°';

        localStorage.removeItem('shipRotation');
        this.hudManager.showToast('Ship rotation reset');
    }

    // adjustColor defined at line ~781 (removed duplicate)

    // Gem emoji mapping
    getGemEmoji(type) {
        const emojis = {
            // Industrial
            iron: '⚙️',
            copper: '🟠',
            coal: '⬛',
            titanium: '🔩',
            silicon: '🔲',
            // Precious
            silver: '⚪',
            gold: '🥇',
            platinum: '💿',
            palladium: '🪙',
            // Crystal
            quartz: '🔮',
            diamond: '💎',
            emerald: '💚',
            ruby: '❤️',
            sapphire: '💙',
            // Nuclear
            uranium: '☢️',
            plutonium: '⚛️',
            helium3: '💨',
            // Exotic
            neodymium: '💖',
            lanthanum: '💜',
            darkmatter: '🌑',
            antimatter: '✨'
        };
        // No longer used, replaced by CSS icons
        return '';
    }

    styleGem(type) {
        const info = MINERAL_TYPES[type];
        if (!info) return '';
        // Create a glowing orb effect matching in-game rendering
        return `background: radial-gradient(circle at 30% 30%, #fff 10%, ${info.color} 60%);
                box-shadow: 0 0 4px ${info.color};
                border-radius: 50%;
                width: 12px;
                height: 12px;
                display: inline-block;`;
    }

    updateFlightHUD() {
        if (!this.flightMode) return;


        // Every 6 frames (~10 FPS)
        if (this.frameCounter % 6 === 0) {
            // Update speed number
            const speedNumEl = document.getElementById('speedNumber');
            const zoomEl = document.getElementById('zoomDisplay');
            if (speedNumEl) speedNumEl.textContent = Math.round(this.playerShip.speed);
            if (zoomEl) zoomEl.textContent = this.camera.zoom.toFixed(1) + 'x';

            // Update radar coordinates
            const coordsEl = document.getElementById('radarCoords');
            if (coordsEl) {
                coordsEl.textContent = `X: ${Math.round(this.playerShip.x)} Y: ${Math.round(this.playerShip.y)} `;
            }

            // Update gems grid with proper emojis
            this.hudManager.updateWalletUI();
            this.hudManager.updateInventoryUI();

            // Update ship status (shield/hull bars)
            this.hudManager.updateShipStatus();
        }

        // Every 3 frames (~20 FPS)
        if (this.frameCounter % 3 === 0) {
            this.missionManager.updateRadar();
        }

        // Every 12 frames (~5 FPS)
        if (this.frameCounter % 12 === 0) {
            this.missionManager.updateMap();
            this.hudManager.updateFactionHUD();
        }
    }



    /* --- EXPANDED MAP --- */
    openExpandedMap() {
        console.log('[Expand Map] Button clicked!');
        const modal = document.getElementById('expandedMapModal');
        console.log('[Expand Map] Modal element:', modal);

        if (modal) {
            modal.classList.remove('hidden');
            this.expandedMapOpen = true;
            this.expandedMapZoom = this.expandedMapZoom || 1.0;
            this.expandedMapOffset = this.expandedMapOffset || { x: 0, y: 0 };

            // Center on player initially
            this.expandedMapOffset.x = -this.playerShip.x;
            this.expandedMapOffset.y = -this.playerShip.y;

            console.log('[Expand Map] Starting animation, zoom:', this.expandedMapZoom);
            this.renderManager.animateExpandedMap();

            // Add wheel listener for zoom
            if (!this.mapWheelListener) {
                this.mapWheelListener = (e) => {
                    e.preventDefault();
                    const zoomSpeed = 0.1;
                    const newZoom = Math.max(0.2, Math.min(10.0, this.expandedMapZoom - Math.sign(e.deltaY) * zoomSpeed));
                    this.expandedMapZoom = newZoom;
                    document.getElementById('mapZoomLevel').textContent = `Zoom: ${this.expandedMapZoom.toFixed(1)} x`;
                };
                const canvas = document.getElementById('fullscreenMapCanvas');
                canvas.addEventListener('wheel', this.mapWheelListener);

                // Dragging Logic
                this.isDraggingMap = false;
                this.lastMapMouse = { x: 0, y: 0 };

                canvas.addEventListener('mousedown', (e) => {
                    this.isDraggingMap = true;
                    this.lastMapMouse = { x: e.clientX, y: e.clientY };
                    canvas.style.cursor = 'grabbing';
                });

                window.addEventListener('mousemove', (e) => {
                    if (!this.isDraggingMap) return;
                    const dx = e.clientX - this.lastMapMouse.x;
                    const dy = e.clientY - this.lastMapMouse.y;
                    this.lastMapMouse = { x: e.clientX, y: e.clientY };

                    // Adjust offset (pan)
                    this.expandedMapOffset.x += dx / this.expandedMapZoom;
                    this.expandedMapOffset.y += dy / this.expandedMapZoom;
                });

                window.addEventListener('mouseup', () => {
                    this.isDraggingMap = false;
                    canvas.style.cursor = 'grab';
                });
            }
        }
    }

    closeExpandedMap() {
        const modal = document.getElementById('expandedMapModal');
        if (modal) {
            modal.classList.add('hidden');
            this.expandedMapOpen = false;
        }
    }


    // Helper for infinite starfield in map
    renderMapStars(ctx, opacity, parallax, spacing, modX, color) {
        let zoom = this.expandedMapZoom || 1;
        // Stop the loop from running 300,000 times when zoomed out!
        let effectiveSpacing = spacing;
        if (zoom < 0.5) effectiveSpacing = spacing * (0.5 / zoom);

        const worldCx = -this.expandedMapOffset.x * parallax;
        const worldCy = -this.expandedMapOffset.y * parallax;
        const w = ctx.canvas.width / zoom;
        const h = ctx.canvas.height / zoom;

        // Simple deterministic "hash" for visuals without storing millions of stars
        // We assume stars are on a grid with jitter
        const startX = Math.floor((worldCx - w) / effectiveSpacing);
        const endX = Math.floor((worldCx + w) / effectiveSpacing);
        const startY = Math.floor((worldCy - h) / effectiveSpacing);
        const endY = Math.floor((worldCy + h) / effectiveSpacing);

        ctx.fillStyle = color;

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                // Deterministic random
                const seed = x * 34234 + y * 23123;
                const rx = Math.sin(seed) * effectiveSpacing;
                const ry = Math.cos(seed * 0.5) * effectiveSpacing;
                
                // If severely zoomed out, skip smaller/dimmer stars to improve performance
                if (zoom < 0.2 && Math.sin(seed * 2) < 0.5) continue;

                const size = (Math.sin(seed * 1.5) + 1.5) * (effectiveSpacing / spacing);

                ctx.globalAlpha = opacity * (0.5 + Math.sin(seed * 0.1) * 0.5);
                ctx.fillRect(x * effectiveSpacing + rx - size, y * effectiveSpacing + ry - size, size * 2, size * 2);
            }
        }
        ctx.globalAlpha = 1.0;
    }

    updateFloatingLeaderboard() {
        const listEl = document.getElementById('floatingLeadersList');
        if (!listEl) return;

        // Mock leaderboard with fluctuating wealth
        const mockPlayers = [
            { name: 'StarPilot99', wealth: 125000 + Math.floor(Math.random() * 10000) },
            { name: 'NebulaHunter', wealth: 98000 + Math.floor(Math.random() * 8000) },
            { name: 'AstroMiner', wealth: 76000 + Math.floor(Math.random() * 5000) },
            { name: 'You', wealth: this.calculateTotalWealth() }
        ];

        mockPlayers.sort((a, b) => b.wealth - a.wealth);

        let html = '';
        mockPlayers.forEach((player, i) => {
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
            const isYou = player.name === 'You';
            html += `<div class="leader-row${isYou ? ' you' : ''}">
                        <span class="leader-rank">${medal || (i + 1)}</span>
                        <span class="leader-name">${player.name}</span>
                        <span class="leader-wealth">$${player.wealth.toLocaleString()}</span>
                    </div>`;
        });
        listEl.innerHTML = html;
    }

    updateLeaderboard() {
        // Legacy method - now using updateFloatingLeaderboard
        this.updateFloatingLeaderboard();
    }

    calculateTotalWealth() {
        let total = 0;
        for (const [type, count] of Object.entries(this.playerInventory)) {
            const mineralInfo = MINERAL_TYPES[type];
            if (mineralInfo) total += mineralInfo.value * count;
        }
        return total;
    }

    drawEngineFlame(ctx, x, y, size, color, time) {
        const pulse = 0.8 + Math.sin(time * 0.02) * 0.2;
        const flicker = 0.8 + Math.random() * 0.2;

        ctx.save();
        ctx.translate(x, y);

        // Find the closest cached sprite. If none matches exactly, fallback to fire.
        let sprite = this.glowSprites.fire;
        const colorStr = (color || '').toLowerCase();

        if (colorStr.includes('00ff') || colorStr.includes('cyan')) sprite = this.glowSprites.cyan;
        else if (colorStr.includes('ff0000') || colorStr === 'red') sprite = this.glowSprites.red;
        else if (colorStr.includes('ff88') || colorStr === 'orange') sprite = this.glowSprites.orange;
        else if (colorStr.includes('ffd7') || colorStr === 'gold') sprite = this.glowSprites.yellow;
        else if (colorStr.includes('7700') || colorStr === 'purple') sprite = this.glowSprites.purple;
        else if (colorStr.includes('aa00') || colorStr === 'magenta') sprite = this.glowSprites.magenta;
        else if (colorStr.includes('00ff66') || colorStr === 'green') sprite = this.glowSprites.green;
        else if (colorStr.includes('00cc') || colorStr === 'blue') sprite = this.glowSprites.blue;

        // Shape and size
        const flameLength = size * 2.5 * pulse * flicker;
        const flameWidth = size * 0.8 * pulse;

        // Draw elongated glowing thrust using composite operation stretching the circular sprite
        ctx.globalCompositeOperation = 'screen';

        // Draw main body of flame (stretched backwards)
        ctx.drawImage(sprite, -flameLength, -flameWidth, flameLength, flameWidth * 2);

        // Draw intense core
        ctx.drawImage(this.glowSprites.white, -size * 0.5 * pulse, -size * 0.5 * pulse, size * pulse, size * pulse);

        ctx.restore();
    }

    drawMuzzleFlash(ctx, x, y, size, color, intensity) {
        if (intensity <= 0) return;

        ctx.save();
        ctx.translate(x, y);

        const flashSize = size * intensity;

        // Inner white core
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = color;
        ctx.shadowBlur = 20 * intensity;
        ctx.beginPath();
        ctx.arc(0, 0, flashSize * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Outer spikes/flare
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8 * intensity;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const len = (i % 2 === 0 ? flashSize * 1.5 : flashSize * 0.8);
            const wx = Math.cos(angle) * len;
            const wy = Math.sin(angle) * len;
            if (i === 0) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }


    createExplosion(x, y, type) {
        // Audio: explosion
        if (type === 'hit') gameAudio.playExplosionSmall();
        else gameAudio.playExplosionBig();

        // Simple particle explosion
        const count = type === 'hit' ? 5 : 20;
        const color = type === 'hit' ? '#ffff00' : '#ffaa00';
        const speed = type === 'hit' ? 2 : 5;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const vel = Math.random() * speed;
            this.damageParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * vel,
                vy: Math.sin(angle) * vel,
                size: Math.random() * 5 + 2,
                life: 30 + Math.random() * 20,
                maxLife: 50,
                color: color,
                type: 'spark'
            });
        }
    }

    destroySpaceMine(index) {
        const mine = this.spaceMines[index];
        this.createExplosion(mine.x, mine.y, 'destruction');

        // Award gems
        const reward = 10;
        this.playerGems += reward;
        localStorage.setItem('playerGems', this.playerGems);
        this.hudManager.showToast(`💥 Space Mine destroyed! +${reward} Gems`, 2000);

        // TRACK MISSION PROGRESS (ONLY ON WEAPON DESTRUCTION)
        if (this.activeMission && this.activeMission.type === 'sabotage') {
            this.activeMission.progress++;
            this.hudManager.updateMissionHUD();
            this.checkMissionComplete();
        }

        // Loot
        this.spawnLoot(mine.x, mine.y, 'uranium', 5);

        this.spaceMines.splice(index, 1);
    }

    destroyMissileBase(index) {
        const base = this.missileBases[index];
        this.createExplosion(base.x, base.y, 'destruction');

        // Award gems
        const reward = 25;
        this.playerGems += reward;
        localStorage.setItem('playerGems', this.playerGems);
        this.hudManager.showToast(`💥 Missile Base destroyed! +${reward} Gems`, 2000);

        // Loot
        this.spawnLoot(base.x, base.y, 'plutonium', 10);

        this.missileBases.splice(index, 1);
    }

    // === ENEMY SHIP COMBAT SYSTEM ===

    // ENEMY_TYPES moved to game-config.js (Phase 8)


    fireEnemyBullet(enemy, typeDef, targetShip) {
        // targetShip defaults to player if not provided
        const target = targetShip || this.playerShip;
        gameAudio.playEnemyLaser();

        // Lead the target's movement for smarter aiming
        const dist = Math.hypot(target.x - enemy.x, target.y - enemy.y);
        const timeToHit = dist / typeDef.bulletSpeed;
        const leadX = target.x + (target.vx || 0) * timeToHit * 0.3;
        const leadY = target.y + (target.vy || 0) * timeToHit * 0.3;
        const leadAngle = Math.atan2(leadY - enemy.y, leadX - enemy.x);

        // Add slight inaccuracy
        const spread = (Math.random() - 0.5) * 0.15;

        this.enemyBullets.push({
            x: enemy.x + Math.cos(leadAngle) * (typeDef.size + 5),
            y: enemy.y + Math.sin(leadAngle) * (typeDef.size + 5),
            vx: Math.cos(leadAngle + spread) * typeDef.bulletSpeed,
            vy: Math.sin(leadAngle + spread) * typeDef.bulletSpeed,
            rotation: leadAngle + spread,
            damage: typeDef.bulletDamage,
            life: 80, // ~1.3 seconds
            color: typeDef.color,
            faction: enemy.faction, // Track which faction fired this bullet
            width: 3,
            length: 25
        });
    }


    destroyEnemyShip(index) {
        const enemy = this.enemyShips[index];
        const typeDef = ENEMY_TYPES[enemy.type];

        // Big explosion
        this.createExplosion(enemy.x, enemy.y, 'destruction');

        // Award gems (Buffed for mid-to-high tier)
        const gemMult = typeDef.rarity === 'boss' ? 1.5 : (typeDef.rank >= 2 ? 1.2 : 1.0);
        this.playerGems += Math.ceil(typeDef.gemDrop * gemMult);
        localStorage.setItem('playerGems', this.playerGems);

        // Increment kill counter
        this.enemyKills++;

        // Track mission progress
        if (this.activeMission) {
            if (this.activeMission.type === 'kill' && this.activeMission.targetType === enemy.type) {
                this.activeMission.progress++;
                this.hudManager.updateMissionHUD();
                this.checkMissionComplete();
            } else if (this.activeMission.type === 'kill_any') {
                this.activeMission.progress++;
                this.hudManager.updateMissionHUD();
                this.checkMissionComplete();
            }
        }

        // Drop mineral loot
        const lootTypes = ['diamond', 'ruby', 'sapphire', 'gold', 'platinum'];
        const lootType = lootTypes[Math.floor(Math.random() * lootTypes.length)];
        this.spawnLoot(enemy.x, enemy.y, lootType, Math.ceil(typeDef.gemDrop / 3));

        this.hudManager.showToast(`💥 ${typeDef.name} destroyed! +${typeDef.gemDrop} Gems`, 2000);

        this.enemyShips.splice(index, 1);
    }

    // === BOSS FIGHT SYSTEM ===

    // BOSS_TYPES moved to game-config.js (Phase 8)


    fireBossBullet(boss, typeDef) {
        const ship = this.playerShip;
        const angleToPlayer = Math.atan2(ship.y - boss.y, ship.x - boss.x);

        // Boss fires 2-3 bullets in a spread
        const bulletCount = boss.phase === 2 ? 3 : 2;
        const spreadAngle = 0.2;

        for (let i = 0; i < bulletCount; i++) {
            const offset = (i - (bulletCount - 1) / 2) * spreadAngle;
            const angle = angleToPlayer + offset;

            this.enemyBullets.push({
                x: boss.x + Math.cos(angle) * (typeDef.size + 10),
                y: boss.y + Math.sin(angle) * (typeDef.size + 10),
                vx: Math.cos(angle) * typeDef.bulletSpeed,
                vy: Math.sin(angle) * typeDef.bulletSpeed,
                rotation: angle,
                damage: typeDef.bulletDamage,
                life: 100,
                color: typeDef.color,
                width: 4,
                length: 30
            });
        }
    }

    damageBoss(amount) {
        if (!this.activeBoss) return;

        const boss = this.activeBoss;
        const typeDef = BOSS_TYPES[boss.type];

        // Dreadnought shield check — blocks frontal damage
        if (boss.type === 'dreadnought') {
            const hitAngle = Math.atan2(this.playerShip.y - boss.y, this.playerShip.x - boss.x);
            let shieldDiff = hitAngle - boss.rotation;
            while (shieldDiff > Math.PI) shieldDiff -= Math.PI * 2;
            while (shieldDiff < -Math.PI) shieldDiff += Math.PI * 2;
            // Shield covers front 120 degrees
            if (Math.abs(shieldDiff) < Math.PI / 3) {
                this.hudManager.showToast('🛡️ Shield blocked!', 1000);
                return;
            }
        }

        // Void Reaper teleport on hit
        if (boss.type === 'voidreaper' && boss.teleportCooldown <= 0) {
            const tAngle = Math.random() * Math.PI * 2;
            boss.x += Math.cos(tAngle) * 300;
            boss.y += Math.sin(tAngle) * 300;
            boss.teleportCooldown = 60; // ~1 second cooldown
        }

        boss.health -= amount;
        boss.hitFlash = 10;

        if (boss.health <= 0) {
            this.destroyBoss();
        }
    }

    destroyBoss() {
        if (!this.activeBoss) return;

        const boss = this.activeBoss;
        const typeDef = BOSS_TYPES[boss.type];

        // Massive explosion
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                if (this.activeBoss === null && i > 0) return;
                this.createExplosion(
                    boss.x + (Math.random() - 0.5) * typeDef.size * 2,
                    boss.y + (Math.random() - 0.5) * typeDef.size * 2,
                    'destruction'
                );
            }, i * 200);
        }

        // Award gems
        this.playerGems += typeDef.gemReward;
        localStorage.setItem('playerGems', this.playerGems);

        // Track boss kills
        this.bossesDefeated++;
        localStorage.setItem('bossesDefeated', this.bossesDefeated);

        // Rich loot drop
        const rareLoots = ['antimatter', 'darkmatter', 'neodymium', 'lanthanum'];
        const lootType = rareLoots[Math.floor(Math.random() * rareLoots.length)];
        this.spawnLoot(boss.x, boss.y, lootType, 20);

        this.hudManager.showToast(`🏆 BOSS DEFEATED: ${typeDef.name}! +${typeDef.gemReward} Gems! 🏆`, 5000);

        // Track mission
        if (this.activeMission && this.activeMission.type === 'boss') {
            this.activeMission.progress++;
            this.hudManager.updateMissionHUD();
            this.checkMissionComplete();
        }

        this.activeBoss = null;
    }

    // === MISSION SYSTEM ===

    // MISSION_TEMPLATES moved to game-config.js (Phase 8)


    acceptMission(missionTemplate) {
        if (this.activeMission) {
            this.hudManager.showToast('⚠️ Complete or abandon current mission first!', 2000);
            return;
        }

        this.activeMission = {
            ...missionTemplate,
            progress: 0,
            startTime: Date.now(),
            desc: missionTemplate.desc.replace('{goal}', missionTemplate.goal)
        };

        this.hudManager.showToast(`📋 Mission Accepted: ${this.activeMission.name}`, 3000);

        // Spawn boss for boss missions
        if (missionTemplate.type === 'boss' && missionTemplate.bossType) {
            setTimeout(() => this.combatManager.spawnBoss(missionTemplate.bossType), 2000);
        }

        // Spawn mission targets dynamically so the player doesn't wander blindly
        if (missionTemplate.type === 'kill') {
            const spawnCount = missionTemplate.goal + 2; // Extra to be safe
            for (let i = 0; i < spawnCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 2000 + Math.random() * 3000; // 2k to 5k range
                this.enemyShips.push({
                    x: this.playerShip.x + Math.cos(angle) * dist,
                    y: this.playerShip.y + Math.sin(angle) * dist,
                    vx: 0,
                    vy: 0,
                    type: missionTemplate.targetType,
                    health: ENEMY_TYPES[missionTemplate.targetType]?.maxHealth || 100,
                    lastFire: 0
                });
            }
            this.hudManager.showToast('⚠️ Mission Targets detected on radar!', 5000);
        } else if (missionTemplate.type === 'mine') {
            for (let i = 0; i < missionTemplate.goal + 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 1500 + Math.random() * 2000;
                this.minerals.push({
                    x: this.playerShip.x + Math.cos(angle) * dist,
                    y: this.playerShip.y + Math.sin(angle) * dist,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    type: 'diamond',
                    color: '#00ffff',
                    value: 50,
                    size: 8
                });
            }
            this.hudManager.showToast('📡 Mineral clusters marked on radar!', 5000);
        } else if (missionTemplate.type === 'defense') {
            // Defense mission spawns targets near the player's BASE
            const baseX = this.spaceBase?.x || 0;
            const baseY = this.spaceBase?.y || 0;
            const spawnCount = missionTemplate.goal;
            for (let i = 0; i < spawnCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 600 + Math.random() * 400; // Close range for siege
                this.enemyShips.push({
                    x: baseX + Math.cos(angle) * dist,
                    y: baseY + Math.sin(angle) * dist,
                    vx: 0,
                    vy: 0,
                    type: 'hauler', // Using hauler as a 'Mauler' reference for mission
                    health: 200,
                    maxHealth: 200,
                    lastFire: 0,
                    faction: 'mauler',
                    state: 'chase' // Make them aggressive
                });
            }
            this.hudManager.showToast('🚨 BASE UNDER ATTACK! Strategic defenses required.', 5000);
        }

        this.hideMissionBoardUI();

        // If the player is in the hangar, seamlessly enter flight mode!
        if (!this.flightMode) {
            if (typeof this.hideShipModal === 'function') this.hideShipModal();
            this.flightMode = true; // Force ON safely
            const hud = document.getElementById('flightHUD');
            const floatingLeaders = document.getElementById('floatingLeaders');
            if (hud) hud.classList.remove('hidden');
            if (floatingLeaders) floatingLeaders.classList.remove('hidden');
        }
        this.hudManager.updateMissionHUD();
    }

    abandonMission() {
        if (!this.activeMission) return;
        this.hudManager.showToast(`❌ Mission abandoned: ${this.activeMission.name}`, 2000);
        if (this.activeBoss && this.activeMission.type === 'boss') {
            this.activeBoss = null; // Remove boss
        }
        this.activeMission = null;
        this.hudManager.updateMissionHUD();
    }

    checkMissionComplete() {
        if (!this.activeMission) return;

        const m = this.activeMission;

        // Check survival timer
        if (m.type === 'survive') {
            const elapsed = (Date.now() - m.startTime) / 1000;
            m.progress = Math.floor(elapsed);
        }

        if (m.progress >= m.goal) {
            // Mission complete!
            this.playerGems += m.reward;
            localStorage.setItem('playerGems', this.playerGems);
            this.missionsCompleted++;
            localStorage.setItem('missionsCompleted', this.missionsCompleted);
            if (this.updateGemsUI) this.updateGemsUI();

            // Launch the cinematic achievement overlay
            this.missionManager.showMissionCompleteOverlay(m);
            gameAudio.playMissionComplete();
            this.activeMission = null;
            this.hudManager.updateMissionHUD();
        }
    }



    toggleMissionBoard() {
        this.missionBoardOpen = !this.missionBoardOpen;
        if (this.missionBoardOpen) {
            this.showMissionBoardUI();
        } else {
            this.hideMissionBoardUI();
        }
    }

    showMissionBoardUI() {
        // Remove existing
        let overlay = document.getElementById('missionBoardOverlay');
        if (overlay) overlay.remove();

        const missions = this.proceduralManager.generateMissionBoard();

        overlay = document.createElement('div');
        overlay.id = 'missionBoardOverlay';
        overlay.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: rgba(10, 15, 30, 0.95); border: 2px solid #00ffcc;
            border-radius: 12px; padding: 30px; z-index: 10000;
            min-width: 400px; max-width: 500px; color: #e0e0e0;
            box-shadow: 0 0 40px rgba(0, 255, 204, 0.3);
            font-family: 'Orbitron', monospace;
        `;

        let html = `<h2 style="color: #00ffcc; margin: 0 0 5px; font-size: 18px; text-align: center;">📋 MISSION BOARD</h2>`;
        html += `<p style="color: #888; font-size: 11px; text-align: center; margin: 0 0 15px;">Missions Completed: ${this.missionsCompleted} | Bosses Defeated: ${this.bossesDefeated}</p>`;

        if (this.activeMission) {
            html += `<div style="background: rgba(255,170,0,0.15); border: 1px solid #ffaa00; border-radius: 8px; padding: 12px; margin-bottom: 10px;">`;
            html += `<div style="color: #ffaa00; font-size: 14px; font-weight: bold;">ACTIVE: ${this.activeMission.name}</div>`;
            html += `<div style="color: #ccc; font-size: 12px; margin: 4px 0;">${this.activeMission.desc}</div>`;
            if (this.activeMission.hint) {
                html += `<div style="color: #00eaff; font-size: 10px; margin: 4px 0; font-style: italic;">${this.activeMission.hint}</div>`;
            }
            html += `<div style="color: #00ff88; font-size: 12px;">Progress: ${this.activeMission.progress}/${this.activeMission.goal}</div>`;
            html += `<button onclick="window.game.abandonMission(); window.game.hideMissionBoardUI();" style="
                margin-top: 8px; padding: 6px 16px; background: rgba(255,50,50,0.3); color: #ff4444;
                border: 1px solid #ff4444; border-radius: 6px; cursor: pointer; font-size: 11px;
            ">ABANDON</button></div>`;
        } else {
            const tierColors = { 1: '#00ff88', 2: '#ffaa00', 3: '#ff6b9d', 4: '#ff44ff' };
            const tierLabels = { 1: 'BASICS', 2: 'COMBAT', 3: 'ADVANCED', 4: 'ELITE' };
            missions.forEach((m, i) => {
                const desc = m.desc.replace('{goal}', m.goal);
                const tierCol = tierColors[m.tier] || '#00ffcc';
                const tierLabel = tierLabels[m.tier] || 'MISSION';
                html += `<div style="background: rgba(0,255,204,0.08); border: 1px solid rgba(0,255,204,0.3); border-radius: 8px; padding: 12px; margin-bottom: 8px;">`;
                html += `<div style="display: flex; justify-content: space-between; align-items: flex-start;">`;
                html += `<div style="flex:1;"><div style="display:flex; align-items:center; gap:6px;"><span style="font-size:9px; color:${tierCol}; background:rgba(0,0,0,0.4); padding:2px 6px; border-radius:3px; border:1px solid ${tierCol}; letter-spacing:1px;">${tierLabel}</span><span style="color: #00ffcc; font-size: 13px; font-weight: bold;">${m.name}</span></div>`;
                html += `<div style="color: #aaa; font-size: 11px; margin-top: 3px;">${desc}</div>`;
                if (m.briefing) {
                    html += `<div style="color: #7ab; font-size: 10px; margin-top: 6px; line-height: 1.4; border-left: 2px solid rgba(0,255,204,0.3); padding-left: 8px;">${m.briefing}</div>`;
                }
                html += `</div>`;
                html += `<div style="text-align: right; min-width: 80px;"><div style="font-size: 9px; color: #667; letter-spacing: 1px; margin-bottom: 2px;">REWARD</div><div style="color: #ffd700; font-size: 16px; font-weight: bold; text-shadow: 0 0 8px rgba(255,215,0,0.4);">💎 ${m.reward}</div>`;
                html += `<button onclick="window.game.acceptMission(window.game._boardMissions[${i}])" style="
                    margin-top: 4px; padding: 4px 12px; background: rgba(0,255,204,0.2); color: #00ffcc;
                    border: 1px solid #00ffcc; border-radius: 6px; cursor: pointer; font-size: 11px;
                ">ACCEPT</button></div></div></div>`;
            });
        }

        html += `<button onclick="window.game.hideMissionBoardUI()" style="
            width: 100%; margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.1);
            color: #888; border: 1px solid #555; border-radius: 6px; cursor: pointer; font-size: 12px;
        ">CLOSE</button>`;

        overlay.innerHTML = html;
        document.body.appendChild(overlay);

        // Store missions for button callbacks
        this._boardMissions = missions;
    }

    hideMissionBoardUI() {
        const overlay = document.getElementById('missionBoardOverlay');
        if (overlay) overlay.remove();
        this.missionBoardOpen = false;
    }

    spawnLoot(x, y, type, amount) {
        this.playerInventory[type] = (this.playerInventory[type] || 0) + amount;
        // Use the same {text, color, time} shape as renderCollectionNotifications expects
        this.collectionNotifications.push({
            text: `+${amount} ${type.toUpperCase()}`,
            color: '#ffd700',
            time: Date.now()
        });
    }

    renderProjectiles(ctx) {
        this.projectiles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);

            // Draw Laser Bolt (Glowing)
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ffffff'; // Core

            ctx.beginPath();
            ctx.rect(-p.length / 2, -p.width / 2, p.length, p.width);
            ctx.fill();

            // Outer glow
            ctx.shadowBlur = 0;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.rect(-p.length / 2 - 2, -p.width / 2 - 2, p.length + 4, p.width + 4);
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.restore();
        });
    }

    updateDamageParticles() {
        // Spawn particles based on health
        const ship = this.playerShip;
        if (!ship) return;

        const healthRatio = ship.hullHealth / ship.maxHull;

        // Thresholds
        // < 0.7: Light Smoke (White/Gray)
        // < 0.4: Dark Smoke (Gray/Black)
        // < 0.2: Fire/Sparks (Orange/Red)

        if (healthRatio < 0.7) {
            // Spawn Rate increases as health drops
            // 0.7 -> 1% chance
            // 0.1 -> 20% chance
            const spawnChance = 0.05 + (0.7 - healthRatio) * 0.5;

            if (Math.random() < spawnChance) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 20;

                let type = 'smoke_light';
                let color = '#cccccc';
                let life = 60 + Math.random() * 60;
                let size = 5 + Math.random() * 10;
                let vx = (Math.random() - 0.5) * 1;
                let vy = (Math.random() - 0.5) * 1;

                if (healthRatio < 0.4 && Math.random() < 0.6) {
                    type = 'smoke_dark';
                    color = '#666666';
                    size = 10 + Math.random() * 15;
                }

                if (healthRatio < 0.2 && Math.random() < 0.4) {
                    type = 'spark';
                    color = Math.random() > 0.5 ? '#ffaa00' : '#ff4400';
                    life = 20 + Math.random() * 20;
                    size = 2 + Math.random() * 3;
                    vx = (Math.random() - 0.5) * 4;
                    vy = (Math.random() - 0.5) * 4;
                }

                this.damageParticles.push({
                    x: ship.x + Math.cos(angle) * dist,
                    y: ship.y + Math.sin(angle) * dist,
                    vx: ship.vx * 0.8 + vx, // Inherit some ship velocity
                    vy: ship.vy * 0.8 + vy,
                    size: size,
                    life: life,
                    maxLife: life,
                    color: color,
                    type: type
                });
            }
        }

        // Update
        this.damageParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            p.size += 0.05; // Expands

            if (p.type.includes('smoke')) {
                p.vx *= 0.95;
                p.vy *= 0.95;
            }
        });

        this.damageParticles = this.damageParticles.filter(p => p.life > 0);
    }

    renderDamageEffects(ctx) {
        if (this.damageParticles.length === 0) return;

        this.damageParticles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);

            const alpha = p.life / p.maxLife;
            ctx.globalAlpha = alpha * 0.6;
            ctx.fillStyle = p.color;

            ctx.beginPath();
            ctx.arc(0, 0, p.size / this.camera.zoom, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });
    }

    // Inventory Management
    showGemGuide() {
        const modal = document.getElementById('gemGuideModal');
        if (modal) modal.classList.add('active');
    }

    hideGemGuide() {
        const modal = document.getElementById('gemGuideModal');
        if (modal) modal.classList.remove('active');
    }

    loadInventory() {
        try {
            const saved = localStorage.getItem('playerInventory');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }


    saveInventory() {
        try {
            localStorage.setItem('playerInventory', JSON.stringify(this.playerInventory));
        } catch (e) {
            console.error('Failed to save inventory:', e);
        }
    }

    loadCredits() {
        return parseInt(localStorage.getItem('playerCredits')) || 0;
    }

    saveCredits() {
        localStorage.setItem('playerCredits', this.credits);
        // Sync with React bridge if it's a purchase/spend
        this.syncWithCloud();
    }

    loadFactionRep() {
        try {
            const saved = localStorage.getItem('factionRep');
            return saved ? JSON.parse(saved) : { xenon: 0, mauler: 0, terran: 0 };
        } catch (e) {
            console.error('[Storage] FactionRep parse failed, resetting.', e);
            return { xenon: 0, mauler: 0, terran: 0 };
        }
    }

    saveFactionRep() {
        localStorage.setItem('factionRep', JSON.stringify(this.factionRep));
    }

    repairHull() {
        const cost = 2000;
        if (this.credits < cost) {
            this.hudManager.showToast("❌ Insufficient credits for repair!");
            return;
        }

        this.credits -= cost;
        this.playerShip.hullHealth = this.playerShip.maxHull; // Full restore
        this.saveCredits();
        this.hudManager.updateShipStatus();
        this.hudManager.showToast("🔧 HULL REPAIRED! Systems back online.");

        // Play a sound effect if available
        console.log('[Repair] Hull restored for 2000 credits');
    }

    loadUpgrades() {
        try {
            return JSON.parse(localStorage.getItem('playerUpgrades')) || { speed: 0, armor: 0, weapons: 0, shield: 0, cargo: 0, radar: 0, tractor: 0, ecm: 0, flares: 0 };
        } catch (e) {
            return { speed: 0, armor: 0, weapons: 0, shield: 0, cargo: 0, radar: 0, tractor: 0, ecm: 0, flares: 0 };
        }
    }

    saveUpgrades() {
        localStorage.setItem('playerUpgrades', JSON.stringify(this.playerShip.upgrades));
        this.syncWithCloud();
    }

    // === SPACE BASE RESOURCE SYSTEM ===
    loadCarriedResources() {
        try {
            return JSON.parse(localStorage.getItem('carriedResources')) || {};
        } catch (e) {
            return {};
        }
    }

    saveCarriedResources() {
        localStorage.setItem('carriedResources', JSON.stringify(this.carriedResources));
        this.syncBaseWithCloud();
    }

    loadSpaceBase() {
        try {
            return JSON.parse(localStorage.getItem('spaceBase')) || null;
        } catch (e) {
            return null;
        }
    }

    saveSpaceBase() {
        localStorage.setItem('spaceBase', JSON.stringify(this.spaceBase));
        this.syncBaseWithCloud();
    }

    syncBaseWithCloud() {
        window.parent.postMessage({
            type: 'SAVE_GAME_DATA',
            data: {
                carriedResources: this.carriedResources,
                spaceBase: this.spaceBase
            }
        }, '*');
    }

    // Apply 25% death penalty to carried resources
    applyDeathPenalty() {
        let lostResources = {};
        let totalLost = 0;

        for (const [type, qty] of Object.entries(this.carriedResources)) {
            if (qty > 0) {
                const loss = Math.floor(qty * 0.25);
                if (loss > 0) {
                    this.carriedResources[type] -= loss;
                    lostResources[type] = loss;
                    totalLost += loss;
                }
            }
        }

        if (totalLost > 0) {
            this.saveCarriedResources();
            // Build loss message
            const lostNames = Object.entries(lostResources)
                .map(([type, qty]) => `${qty} ${MINERAL_TYPES[type]?.name || type}`)
                .join(', ');
            this.hudManager.showToast(`💀 Lost 25% cargo: ${lostNames}`);
            console.log('[Death Penalty] Lost resources:', lostResources);
        }

        return lostResources;
    }

    // Deposit resources from ship to base vault
    depositResources(resourceType, amount) {
        if (!this.spaceBase.isDeployed) {
            this.hudManager.showToast('⚠️ Deploy your base first!');
            return false;
        }

        const available = this.carriedResources[resourceType] || 0;
        const toDeposit = Math.min(amount, available);

        if (toDeposit <= 0) {
            this.hudManager.showToast('⚠️ No resources to deposit!');
            return false;
        }

        this.carriedResources[resourceType] -= toDeposit;
        this.spaceBase.resources[resourceType] = (this.spaceBase.resources[resourceType] || 0) + toDeposit;

        this.saveCarriedResources();
        this.saveSpaceBase();

        this.hudManager.showToast(`📦 Deposited ${toDeposit} ${MINERAL_TYPES[resourceType]?.name || resourceType}`);
        return true;
    }

    // Withdraw resources from base to ship
    withdrawResources(resourceType, amount) {
        if (!this.spaceBase.isDeployed) {
            this.hudManager.showToast('⚠️ Deploy your base first!');
            return false;
        }

        const available = this.spaceBase.resources[resourceType] || 0;
        const toWithdraw = Math.min(amount, available);

        if (toWithdraw <= 0) {
            this.hudManager.showToast('⚠️ No resources in vault!');
            return false;
        }

        this.spaceBase.resources[resourceType] -= toWithdraw;
        this.carriedResources[resourceType] = (this.carriedResources[resourceType] || 0) + toWithdraw;

        this.saveCarriedResources();
        this.saveSpaceBase();

        this.hudManager.showToast(`📤 Withdrew ${toWithdraw} ${MINERAL_TYPES[resourceType]?.name || resourceType}`);
        return true;
    }

    // === SPACE BASE DEPLOYMENT & MODULES ===

    // Deploy base at current location
    deployBase() {
        if (this.spaceBase.isDeployed) {
            this.hudManager.showToast('⚠️ Base already deployed! Toggle towing to move it.');
            return false;
        }

        // Need command center first
        if (!this.hasModule('command')) {
            // Build command center automatically on first deployment
            if (this.credits >= 1000) {
                this.credits -= 1000;
                this.saveCredits();
                this.spaceBase.modules.push({ type: 'command', level: 1, builtAt: Date.now() });
                this.hudManager.showToast('🏛️ Command Center built!');
            } else {
                this.hudManager.showToast('⚠️ Need 1,000 credits to build Command Center!');
                return false;
            }
        }

        this.spaceBase.x = this.playerShip.x;
        this.spaceBase.y = this.playerShip.y;
        this.spaceBase.isDeployed = true;
        this.spaceBase.isTowing = false;
        this.saveSpaceBase();

        this.hudManager.showToast('🏠 Base deployed at current location!');
        return true;
    }

    // Toggle towing mode (pick up base to move it)
    toggleTowing() {
        if (!this.spaceBase.isDeployed) {
            this.hudManager.showToast('⚠️ No base deployed yet!');
            return false;
        }

        // Must be near base to pick it up
        if (!this.spaceBase.isTowing) {
            const dist = Math.hypot(
                this.playerShip.x - this.spaceBase.x,
                this.playerShip.y - this.spaceBase.y
            );
            if (dist > 500) {
                this.hudManager.showToast('⚠️ Too far from base! Get closer to tow.');
                return false;
            }
        }

        this.spaceBase.isTowing = !this.spaceBase.isTowing;
        this.saveSpaceBase();

        if (this.spaceBase.isTowing) {
            this.hudManager.showToast('🔗 Towing base! Speed reduced 50%.');
        } else {
            this.spaceBase.x = this.playerShip.x;
            this.spaceBase.y = this.playerShip.y;
            this.hudManager.showToast('📍 Base anchored at new location!');
        }
        return true;
    }

    // Check if player has a specific module
    hasModule(moduleType) {
        return this.spaceBase.modules.some(m => m.type === moduleType);
    }

    // Build a new module
    buildModule(moduleType) {
        const moduleDef = this.baseModules[moduleType];
        if (!moduleDef) {
            this.hudManager.showToast('⚠️ Unknown module type!');
            return false;
        }

        if (!this.spaceBase.isDeployed) {
            this.hudManager.showToast('⚠️ Deploy your base first!');
            return false;
        }

        // Check prerequisite
        if (moduleDef.required && !this.hasModule(moduleDef.required)) {
            this.hudManager.showToast(`⚠️ Requires ${this.baseModules[moduleDef.required].name} first!`);
            return false;
        }

        // Check credits
        if (this.credits < moduleDef.cost) {
            this.hudManager.showToast(`⚠️ Need ${moduleDef.cost} credits!`);
            return false;
        }

        // Check resource costs
        if (moduleDef.resourceCost) {
            for (const [res, amount] of Object.entries(moduleDef.resourceCost)) {
                const available = (this.spaceBase.resources[res] || 0) + (this.carriedResources[res] || 0);
                if (available < amount) {
                    this.hudManager.showToast(`⚠️ Need ${amount} ${MINERAL_TYPES[res]?.name || res}!`);
                    return false;
                }
            }

            // Deduct resources (from carried first, then vault)
            for (const [res, amount] of Object.entries(moduleDef.resourceCost)) {
                let remaining = amount;
                if (this.carriedResources[res]) {
                    const fromCarried = Math.min(this.carriedResources[res], remaining);
                    this.carriedResources[res] -= fromCarried;
                    remaining -= fromCarried;
                }
                if (remaining > 0 && this.spaceBase.resources[res]) {
                    this.spaceBase.resources[res] -= remaining;
                }
            }
            this.saveCarriedResources();
        }

        // Deduct credits
        this.credits -= moduleDef.cost;
        this.saveCredits();

        // Build module
        this.spaceBase.modules.push({ type: moduleType, level: 1, builtAt: Date.now() });
        this.saveSpaceBase();

        this.hudManager.showToast(`${moduleDef.icon} ${moduleDef.name} built!`);
        return true;
    }

    // Check if player is near base (for docking)
    isNearBase() {
        if (!this.spaceBase.isDeployed || this.spaceBase.isTowing) return false;
        const dist = Math.hypot(
            this.playerShip.x - this.spaceBase.x,
            this.playerShip.y - this.spaceBase.y
        );
        return dist < 300;
    }

    // Get base status summary
    getBaseStatus() {
        return {
            isDeployed: this.spaceBase.isDeployed,
            isTowing: this.spaceBase.isTowing,
            moduleCount: this.spaceBase.modules.length,
            modules: this.spaceBase.modules.map(m => ({
                type: m.type,
                name: this.baseModules[m.type]?.name || m.type,
                icon: this.baseModules[m.type]?.icon || '?',
                level: m.level
            })),
            vaultResources: { ...this.spaceBase.resources }
        };
    }

    // Toggle base management panel
    toggleBasePanel() {
        const panel = document.getElementById('basePanelPopup');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            if (panel.style.display === 'block') {
                this.updateBasePanelUI();
            }
        } else {
            this.hudManager.showToast('🏠 Base Menu: ' + this.spaceBase.modules.length + ' modules built');
            // Log available modules for debugging
            console.log('[Base] Status:', this.getBaseStatus());
        }
    }

    // Update base panel UI (if HTML panel exists)
    updateBasePanelUI() {
        const moduleList = document.getElementById('baseModuleList');
        if (moduleList) {
            const modules = this.spaceBase.modules;
            moduleList.innerHTML = modules.map(m => {
                const def = this.baseModules[m.type];
                return `<div class="base-module">${def?.icon || '?'} ${def?.name || m.type} (Lv.${m.level})</div>`;
            }).join('') || '<div class="base-module-empty">No modules built</div>';
        }

        const vaultList = document.getElementById('baseVaultList');
        if (vaultList) {
            const resources = Object.entries(this.spaceBase.resources)
                .filter(([_, qty]) => qty > 0);
            vaultList.innerHTML = resources.map(([type, qty]) => {
                const def = MINERAL_TYPES[type];
                return `<div class="vault-item" style="color:${def?.color || '#fff'}">
                    ${def?.name || type}: ${qty}
                </div>`;
            }).join('') || '<div class="vault-empty">Vault empty</div>';
        }
    }

    // Deposit all carried resources to base vault
    depositAllResources() {
        if (!this.spaceBase.isDeployed) {
            this.hudManager.showToast('⚠️ Deploy base first!');
            return false;
        }

        if (!this.isNearBase()) {
            this.hudManager.showToast('⚠️ Get closer to base!');
            return false;
        }

        let totalDeposited = 0;
        const deposited = [];

        for (const [type, qty] of Object.entries(this.carriedResources)) {
            if (qty > 0) {
                this.spaceBase.resources[type] = (this.spaceBase.resources[type] || 0) + qty;
                deposited.push(`${qty} ${MINERAL_TYPES[type]?.name || type}`);
                totalDeposited += qty;
                this.carriedResources[type] = 0;
            }
        }

        if (totalDeposited > 0) {
            this.playerShip.cargoCount = 0; // Reset total count
            this.saveCarriedResources();
            this.saveSpaceBase();
            this.hudManager.showToast(`📦 Deposited: ${deposited.slice(0, 3).join(', ')}${deposited.length > 3 ? '...' : ''}`);
            console.log('[Base] Deposited all:', deposited);

            // Recharge Flares on deposit
            if (this.playerShip && this.playerShip.maxFlares > 0) {
                this.playerShip.flares = this.playerShip.maxFlares;
                this.hudManager.showToast('🔥 Flares Recharged!');
            }
        } else {
            this.hudManager.showToast('⚠️ No resources to deposit!');
        }

        return totalDeposited > 0;
    }

    // --- Bridge SDK Implementation ---
    requestLoadData() {
        console.log('[Bridge] Requesting data from cloud...');
        window.parent.postMessage({ type: 'REQUEST_LOAD_DATA' }, '*');
    }

    syncWithCloud() {
        console.log('[Bridge] Syncing credits/upgrades to cloud...');
        window.parent.postMessage({
            type: 'SAVE_GAME_DATA',
            data: {
                aetherCredits: this.credits,
                upgrades: this.playerShip.upgrades
            }
        }, '*');
    }

    handleBridgeMessage(event) {
        const { type, data } = event.data;
        if (type === 'LOAD_GAME_DATA') {
            console.log('[Bridge] Received cloud data:', data);
            if (data.aetherCredits !== undefined) {
                this.credits = data.aetherCredits;
                this.saveCredits(); // Update local as fallback
            }
            if (data.upgrades) {
                this.playerShip.upgrades = data.upgrades;
                // Re-calculate ship stats based on new upgrades
                this.playerShip.maxSpeed = 50 * (1 + (data.upgrades.speed || 0) * 0.2);
                this.playerShip.acceleration = 0.5 * (1 + (data.upgrades.speed || 0) * 0.1);
                this.playerShip.maxHull = 100 * (1 + (data.upgrades.armor || 0) * 0.2);
                this.playerShip.maxShield = 50 * (1 + (data.upgrades.shield || 0) * 0.2);
                this.playerShip.radarRange = 2000 * (1 + (data.upgrades.radar || 0) * 0.3);
                this.playerShip.tractorRadius = 25 * (1 + (data.upgrades.tractor || 0) * 0.5);
                this.saveUpgrades(); // Update local as fallback
            }
            if (data.subscription) {
                this.subscription = data.subscription;
                this.isPro = !!data.subscription.isProPilot;
                console.log('[Bridge] Subscription status updated. Pro Pilot:', this.isPro);
                if (this.isPro) {
                    this.hudManager.showToast("🚀 Nirvana Pilot Active - 20% Bonus gems enabled!", 5000);
                }
            }
        }
    }

    sellAllGems() {
        console.log('[Sell All] Button clicked!');
        let totalValue = 0;
        let count = 0;
        for (const [type, qty] of Object.entries(this.playerInventory)) {
            if (qty > 0) {
                const val = MINERAL_TYPES[type].value;
                totalValue += val * qty;
                count += qty;
                this.playerInventory[type] = 0;
            }
        }

        if (totalValue > 0) {
            // Apply Pro Pilot Bonus (20%)
            if (this.isPro) {
                const bonus = Math.floor(totalValue * 0.2);
                totalValue += bonus;
                console.log('[Pro Bonus] Applied +', bonus, 'credits');
            }

            this.credits += totalValue;

            // Also award permanent gems (1 gem per 10 credit value = 10%)
            const gemsAwarded = Math.floor(totalValue / 10);
            this.playerGems += gemsAwarded;
            localStorage.setItem('playerGems', this.playerGems);

            this.saveCredits();
            this.saveInventory();
            this.hudManager.showToast(`Sold ${count} ores for $${totalValue.toLocaleString()} and earned ${gemsAwarded} Gems!`);
            console.log('[Sell All] Success:', count, 'gems for $', totalValue, 'Gems:', gemsAwarded);

            // Update UI immediately
            this.hudManager.updateWalletUI();
            this.hudManager.updateInventoryUI();
            if (this.updateGemsUI) this.updateGemsUI();
        } else {
            this.hudManager.showToast('No ores to sell');
            console.log('[Sell All] No gems in inventory');
        }
    }

    updateGemsUI() {
        // Update the Hangar Gem counter if it exists
        const hangarGemsEl = document.getElementById('hangarGemBalance');
        if (hangarGemsEl) {
            hangarGemsEl.textContent = this.playerGems.toLocaleString();
        }

        // Update Top Bar Cargo Display
        const cargoEl = document.getElementById('cargoStatus');
        if (cargoEl && this.playerShip) {
            const count = this.playerShip.cargoCount || 0;
            const max = Math.round(this.playerShip.maxCargo || 1000);
            cargoEl.textContent = `📦 ${count}/${max}`;
            if (count >= max) {
                cargoEl.style.color = '#ff3300';
                cargoEl.style.fontWeight = 'bold';
            } else {
                cargoEl.style.color = '#00ff88';
                cargoEl.style.fontWeight = 'normal';
            }
        }
    }


    upgradeShip(type) {
        const upgradeCosts = [1000, 2500, 5000, 10000, 25000]; // Function of level maybe?
        const currentLevel = this.playerShip.upgrades[type] || 0;

        if (currentLevel >= 5) {
            this.hudManager.showToast('Max level reached!');
            return;
        }

        const cost = upgradeCosts[currentLevel];
        if (this.credits >= cost) {
            this.credits -= cost;
            this.playerShip.upgrades[type]++;
            this.saveCredits();
            this.saveUpgrades();

            // Apply effects immediately
            const lvl = this.playerShip.upgrades[type];
            if (type === 'speed') {
                this.playerShip.maxSpeed = 50 * (1 + lvl * 0.2);
                this.playerShip.acceleration = 0.5 * (1 + lvl * 0.1);
            } else if (type === 'armor') {
                this.playerShip.maxHull = 100 * (1 + lvl * 0.2);
                this.playerShip.hullHealth = this.playerShip.maxHull; // Repair on upgrade
            } else if (type === 'shield') {
                this.playerShip.maxShield = 50 * (1 + lvl * 0.2);
                this.playerShip.shield = this.playerShip.maxShield;
            } else if (type === 'radar') {
                this.playerShip.radarRange = 2000 * (1 + lvl * 0.3);
            } else if (type === 'tractor') {
                this.playerShip.tractorRadius = 25 * (1 + lvl * 0.5);
            } else if (type === 'ecm') {
                this.playerShip.ecmStrength = lvl; // 0-5
            } else if (type === 'flares') {
                this.playerShip.maxFlares = lvl * 2;
                this.playerShip.flares = this.playerShip.maxFlares;
            } else if (type === 'cargo') {
                this.playerShip.maxCargo = 1000 * (1 + lvl * 1.0);
            } else if (type === 'weapons') {
                // No immediate ship stat change, used in shoot() and updateProjectiles()
                console.log(`[Upgrades] Photon Cannons upgraded to level ${lvl}`);
            }

            this.hudManager.showToast(`${type.toUpperCase()} Upgraded to Level ${lvl + 1} !`);
            this.updateUpgradeUI(); // Assuming we'll create this method
        } else {
            this.hudManager.showToast(`Not enough credits! Need $${cost.toLocaleString()} `);
        }
    }

    // Spawn minerals around the player - ADDICTIVE GAMEPLAY DESIGN
    spawnMinerals() {
        const ship = this.playerShip;
        
        // Dynamically compute spawn radius to cover the ENTIRE zoomed out screen!
        const canvasW = this.canvas ? this.canvas.width : 1600;
        const canvasH = this.canvas ? this.canvas.height : 900;
        const curZoom = this.camera ? Math.max(0.05, this.camera.zoom) : 1;
        const worldViewportRadius = Math.hypot(canvasW / 2, canvasH / 2) / curZoom;
        
        const spawnRadius = Math.max(1500, worldViewportRadius + 200);
        
        // Scale density dynamically (but cap at 3000 to prevent crashing the canvas)
        const densityMultiplier = spawnRadius / 1500;
        let targetDensity = Math.min(3000, 200 * densityMultiplier);
        
        // Check hotspot proximity for MASSIVE density boost
        let hotspotBonus = 1.0;
        let activeHotspot = null;
        let inHotspot = false;

        for (const dep of this.resourceDeposits) {
            const dx = ship.x - dep.x;
            const dy = ship.y - dep.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < dep.radius) {
                hotspotBonus = 3.0; // 3x rarity multiplier
                targetDensity = 500; // Massive gem field
                activeHotspot = dep;
                inHotspot = true;
                break;
            }
        }

        // Calculate player's zone
        const playerDistFromOrigin = Math.sqrt(ship.x * ship.x + ship.y * ship.y);

        // Optimization: Cache ship coords to avoid redundant lookups in loop
        const shipX = ship.x;
        const shipY = ship.y;
        const shipZ = ship.z;

        // Remove only VERY far minerals for performance
        this.minerals = this.minerals.filter(m => {
            const dx = m.x - shipX;
            const dy = m.y - shipY;
            const dz = m.z - shipZ;
            return Math.sqrt(dx * dx + dy * dy + dz * dz) < spawnRadius * 3;
        });

        // INSTANT RESPAWN: Always maintain target density
        while (this.minerals.length < targetDensity) {
            const currentZone = this.getZoneAtDistance(playerDistFromOrigin);
            const mineralKey = this.selectElementForZone(currentZone, playerDistFromOrigin, hotspotBonus);
            const type = MINERAL_TYPES[mineralKey];
            if (!type) continue;

            // Dense, even distribution around player
            const angle = Math.random() * Math.PI * 2;
            const distance = spawnRadius * Math.sqrt(Math.random()); // Uniform distribution
            const zOffset = (Math.random() - 0.5) * 400;

            // Hotspot clustering: bias toward hotspot center
            let spawnX, spawnY;
            if (inHotspot && Math.random() < 0.6) {
                // 60% of gems cluster around hotspot center
                const hotAngle = Math.random() * Math.PI * 2;
                const hotDist = activeHotspot.radius * Math.sqrt(Math.random()) * 0.7;
                spawnX = activeHotspot.x + Math.cos(hotAngle) * hotDist;
                spawnY = activeHotspot.y + Math.sin(hotAngle) * hotDist;
            } else {
                // Normal spawn around player
                spawnX = ship.x + Math.cos(angle) * distance;
                spawnY = ship.y + Math.sin(angle) * distance;
            }

            const spawnZ = ship.z + zOffset;

            this.minerals.push({
                id: Date.now() + Math.random(),
                type: mineralKey,
                ...type,
                x: spawnX,
                y: spawnY,
                z: spawnZ,
                phase: Math.random() * Math.PI * 2,
                defended: type.rarity === 'epic' || type.rarity === 'legendary' || type.rarity === 'mythic'
            });
        }
    }

    // Get the zone type at a given distance from origin
    getZoneAtDistance(distance) {
        for (const [zoneKey, zone] of Object.entries(GALAXY_ZONES)) {
            if (distance >= zone.distanceRange.min && distance < zone.distanceRange.max) {
                return zoneKey;
            }
        }
        // Beyond all zones = exotic
        if (distance >= 5000) return 'exotic';
        // Default to industrial for very close
        return 'industrial';
    }

    // Select an element to spawn based on current zone and probability
    // ADDICTIVE DESIGN: Clear risk/reward progression
    selectElementForZone(currentZone, distance, bonusMultiplier = 1) {
        const zones = GALAXY_ZONES;
        const allElements = Object.keys(MINERAL_TYPES);

        // Build probability weights with ZONE-BASED PROGRESSION
        const weights = [];
        let totalWeight = 0;

        for (const elementKey of allElements) {
            const element = MINERAL_TYPES[elementKey];
            let weight = 1;

            // ADDICTIVE RARITY DISTRIBUTION BY ZONE
            // Inner Core (0-1500): Safe, abundant commons
            if (distance < 1500) {
                switch (element.rarity) {
                    case 'common': weight = 70; break;      // 70%
                    case 'uncommon': weight = 25; break;    // 25%
                    case 'rare': weight = 5; break;         // 5%
                    default: weight = 0; break;             // No epic+
                }
            }
            // Radiation Belt (1500-3000): Medium risk, good rewards
            else if (distance < 3000) {
                switch (element.rarity) {
                    case 'common': weight = 40; break;      // 40%
                    case 'uncommon': weight = 40; break;    // 40%
                    case 'rare': weight = 15; break;        // 15%
                    case 'epic': weight = 5; break;         // 5%
                    default: weight = 0; break;
                }
            }
            // Outer Expanse (3000-5000): High risk, great rewards
            else if (distance < 5000) {
                switch (element.rarity) {
                    case 'common': weight = 0; break;       // No commons
                    case 'uncommon': weight = 25; break;    // 25%
                    case 'rare': weight = 35; break;        // 35%
                    case 'epic': weight = 30; break;        // 30%
                    case 'legendary': weight = 10; break;   // 10%
                    default: weight = 0; break;
                }
            }
            // Deep Void (5000+): Extreme risk, legendary rewards
            else {
                switch (element.rarity) {
                    case 'common': weight = 0; break;
                    case 'uncommon': weight = 0; break;
                    case 'rare': weight = 20; break;        // 20%
                    case 'epic': weight = 40; break;        // 40%
                    case 'legendary': weight = 30; break;   // 30%
                    case 'mythic': weight = 10; break;      // 10%
                }
            }

            // Hotspot bonus multiplier
            if (bonusMultiplier > 1) {
                // Increase rarity in hotspots
                if (element.rarity !== 'common') {
                    weight *= bonusMultiplier;
                }
            }

            // Zone affinity: elements spawn more in their home zone
            if (zones[element.zone] && zones[element.zone].elements.includes(elementKey)) {
                if (element.zone === currentZone) {
                    weight *= 1.5; // 50% bonus in home zone
                }
            }

            weights.push({ key: elementKey, weight });
            totalWeight += weight;
        }

        // Weighted random selection
        let random = Math.random() * totalWeight;
        for (const { key, weight } of weights) {
            random -= weight;
            if (random <= 0) {
                return key;
            }
        }

        // Fallback to iron
        return 'iron';
    }

    // Check for mineral collection


    spawnMindwaveLotuses() {
        console.log("🌸 Spawning Mindwave Lotuses...");
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 500 + Math.random() * 2000;
            this.minerals.push({
                id: 'lotus-' + Date.now() + '-' + i,
                x: this.playerShip.x + Math.cos(angle) * dist,
                y: this.playerShip.y + Math.sin(angle) * dist,
                z: this.playerShip.z || 0, // Always spawn at player's Z so 3D distance check doesn't break collection
                type: 'lotus',
                name: 'Mindwave Lotus', // ADDED: Critical for collection name
                size: 25,
                color: '#ff69b4', // ADDED: Critical for notification color
                value: 1000,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    renderLotus(ctx, lotus) {
        ctx.save();
        ctx.translate(lotus.x, lotus.y);
        const glowPhase = (Date.now() * 0.002 + lotus.phase) % (Math.PI * 2);
        const glow = 0.5 + Math.sin(glowPhase) * 0.5;

        // Outer Glow (Keeping existing glow for presence)
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, lotus.size * 2);
        grad.addColorStop(0, `rgba(255, 105, 180, ${0.4 * glow})`);
        grad.addColorStop(1, 'rgba(255, 105, 180, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, lotus.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw Mindwave Lotus Image
        if (this.lotusImage.complete) {
            const drawSize = lotus.size * 2.5; // Slightly larger for visual clarity
            ctx.drawImage(this.lotusImage, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        } else {
            // Fallback: Inner Core Glow if image not loaded yet
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffb6c1';
            ctx.beginPath();
            ctx.arc(0, 0, lotus.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    // Update minerals (check collection, spawn new ones)
    updateMinerals() {
        if (!this.flightMode) return;

        // Apply active ship abilities (Magnet, Gravity, etc)
        this.applyShipAbilities();

        // Check for collections
        for (const mineral of [...this.minerals]) {
            this.playerManager.collectMineral(mineral);
        }

        // Spawn new minerals
        this.spawnMinerals();

        // Lotus respawn: max 5 at a time, with a 20s cooldown to avoid burst-spawning
        const lotusCount = this.minerals.filter(m => m.type === 'lotus').length;
        const now = Date.now();
        if (lotusCount < 5) {
            if (!this.lastLotusRespawn || now - this.lastLotusRespawn > 20000) {
                this.lastLotusRespawn = now;
                // Spawn just enough to bring count up to 5
                const toSpawn = 5 - lotusCount;
                for (let i = 0; i < toSpawn; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 600 + Math.random() * 1800;
                    this.minerals.push({
                        id: 'lotus-' + now + '-' + i,
                        x: this.playerShip.x + Math.cos(angle) * dist,
                        y: this.playerShip.y + Math.sin(angle) * dist,
                        z: this.playerShip.z || 0,
                        type: 'lotus',
                        name: 'Mindwave Lotus',
                        size: 25,
                        color: '#ff69b4',
                        value: 1000,
                        phase: Math.random() * Math.PI * 2
                    });
                }
            }
        }

        // Update notifications (fade out after 2 seconds)
        this.collectionNotifications = this.collectionNotifications.filter(n => now - n.time < 2000);

        // Update Mauler Debris
        this.updateMaulerDebris();
    }

    updateMaulerDebris() {
        if (!this.maulerDebris) return;
        const ship = this.playerShip;
        const speed = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy * (ship.vz || 0)); // Approx 2D speed for now

        // Threshold to detach debris
        const detachSpeed = 20;
        const isFast = ship.speed > detachSpeed;

        this.maulerDebris.forEach(p => {
            if (!p.detached) {
                if (isFast) {
                    // Detach!
                    p.detached = true;
                    // Fling it opposite to ship direction slightly
                    p.vx = -ship.vx * 0.5 + (Math.random() - 0.5) * 5;
                    p.vy = -ship.vy * 0.5 + (Math.random() - 0.5) * 5;
                } else {
                    // Stay attached - hover around ship
                    // Move towards target offset
                    const targetX = ship.x + p.offsetX;
                    const targetY = ship.y + p.offsetY;

                    // Smooth follow
                    p.x += (targetX - p.x) * 0.1;
                    p.y += (targetY - p.y) * 0.1;

                    // Rotate with ship (optional, simpler to just offset)
                    // Apply slight rotation to offsets
                    const rot = 0.02;
                    const oldOx = p.offsetX;
                    p.offsetX = p.offsetX * Math.cos(rot) - p.offsetY * Math.sin(rot);
                    p.offsetY = oldOx * Math.sin(rot) + p.offsetY * Math.cos(rot);
                }
            } else {
                // Detached physics - drift away
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02; // Fade out
            }
        });

        // Remove dead particles
        this.maulerDebris = this.maulerDebris.filter(p => !p.detached || p.life > 0);
    }

    // --- SHIP ABILITY SYSTEM ---
    applyShipAbilities() {
        if (!this.playerShip) return;

        // 1. MAULER (HAULER): 25px Gravitational Pull
        // Fixed 25px radius as requested by user, ignoring upgrade bonus for this specific check if needed, 
        // but sticking to code that allows upgrades to expand it IF the base is 25.
        // User asked for "25px gravitational pull restored", meaning the base should be reliable.
        if (this.playerShip.type === 'hauler') {
            // Increased radius so it pulls BEFORE collection (Range 35)
            // Visual pull needs to happen before instant collection
            const collectionRange = 35;
            const tractorRadius = collectionRange + 25 * (1 + (this.playerShip.upgrades?.tractor || 0) * 0.5);
            const maxPullVelocity = 40;

            for (const mineral of this.minerals) {
                if (mineral.type === 'coal' || mineral.type === 'darkmatter') continue;

                const dx = this.playerShip.x - mineral.x;
                const dy = this.playerShip.y - mineral.y;
                const dz = (this.playerShip.z || 0) - (mineral.z || 0);
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                // Hard 25px check or scaling radius
                if (dist < tractorRadius && dist > 5) {
                    const pullIntensity = 1 - (dist / tractorRadius);
                    const pullVelocity = maxPullVelocity * pullIntensity;

                    const dirX = dx / dist;
                    const dirY = dy / dist;
                    const dirZ = dz / dist;

                    mineral.x += dirX * pullVelocity;
                    mineral.y += dirY * pullVelocity;
                    mineral.z += dirZ * pullVelocity;

                    // Spiral
                    const spiralAngle = Math.atan2(dy, dx) + 0.15;
                    mineral.x += Math.cos(spiralAngle) * pullVelocity * 0.1;
                    mineral.y += Math.sin(spiralAngle) * pullVelocity * 0.1;
                }
            }
        }

        // 2. PROSPECTOR: Gem Magnet (Passive wider collection range)
        if (this.playerShip.type === 'prospector') {
            const magnetRadius = 160;
            const maxMagnetPull = 12;

            for (const mineral of this.minerals) {
                const dx = this.playerShip.x - mineral.x;
                const dy = this.playerShip.y - mineral.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < magnetRadius && dist > 10) {
                    const intensity = 1 - (dist / magnetRadius);
                    const pull = maxMagnetPull * intensity;
                    mineral.x += (dx / dist) * pull;
                    mineral.y += (dy / dist) * pull;
                }
            }
        }

        // 3. BULWARK: Shield Regen
        if (this.playerShip.type === 'bulwark') {
            const now = Date.now();
            const lastDamage = this.playerShip.lastDamageTime || 0;
            const regenDelay = 5000; // 5 seconds of safety

            if (now - lastDamage > regenDelay) {
                // Regenerate 2% shield every second (60 frames)
                if (this.frameCounter % 60 === 0 && this.playerShip.shield < this.playerShip.maxShield) {
                    const regenAmount = this.playerShip.maxShield * 0.02;
                    this.playerShip.shield = Math.min(this.playerShip.shield + regenAmount, this.playerShip.maxShield);
                    this.hudManager.updateShipStatus();
                }
            }
        }

        // 4. SIPHON: Energy Leech (Restore shield on gem collect) -> Handled in collectMineral hook

        // 5. GHOST: Cloak (Passive) -> Handled in enemy detection logic (sentinels/turrets)

        // 6. VIPER: Speed Surge (Passive) -> Handled in maxSpeed calc

        // 7. NOVA: Volatile Core -> Handled in player death logic

        // 8. TITAN: Hardened Hull -> Handled in damage logic

        // 9. FLUX: Phase Shift -> Handled in damage logic (chance to ignore)

        // 10. PULSE: Radar Ping -> Handled in Radar render
    }

    // Update hazards (mines and black holes)


    // =====================================================
    // HAZARD SYSTEM - Space Mines & Black Holes
    // =====================================================

    // Spawn hazards around the player


    // Generate accretion disk particles for black hole


    // Update hazards - check collisions and spawn new ones



    // Fire a heat-seeking missile from a base
    fireMissile(base) {
        const speed = 4 + Math.random() * 2;
        this.enemyMissiles.push({
            x: base.x,
            y: base.y,
            angle: base.turretAngle,
            vx: Math.cos(base.turretAngle) * speed,
            vy: Math.sin(base.turretAngle) * speed,
            speed: speed,
            life: 5000, // 5 seconds lifetime
            maxLife: 5000,
            size: 8,
            trail: [],
            fromBase: base
        });
    }

    // Unified damage method for tracking and ship abilities
    damagePlayer(amount, ignoreShield = false) {
        if (!this.playerShip || this.playerShip.hullHealth <= 0) return;

        // ZEN BUFFER: Invulnerability after Lotus collection
        if (this.playerShip.zenBuffer && Date.now() < this.playerShip.zenBuffer) {
            // Pulse the shield or ship visually? (Optional)
            return; // No damage during Zen Buffer
        }

        // 9. FLUX: Phase Shift (20% dodge chance)
        if (this.playerShip.type === 'flux' && Math.random() < 0.2) {
            this.hudManager.showToast('✨ Phase Shift Evaded Attack!', 1500);
            return; // Completely dodge
        }

        // APEX: Overclock (50% damage reduction when active)
        if (this.playerShip.type === 'apex' && this.playerShip.overclockActive) {
            amount *= 0.5;
        }

        // 8. TITAN: Hardened Hull (30% damage reduction)
        if (this.playerShip.type === 'titan') {
            amount *= 0.7;
        }

        this.playerShip.lastDamageTime = Date.now();

        if (this.playerShip.shield > 0 && !ignoreShield) {
            const shieldDamage = Math.min(this.playerShip.shield, amount);
            this.playerShip.shield -= shieldDamage;
            gameAudio.playShieldHit();
            const remainingDamage = amount - shieldDamage;
            if (remainingDamage > 0) {
                this.playerShip.hullHealth = Math.max(0, this.playerShip.hullHealth - remainingDamage);
                gameAudio.playHullHit();
            }
        } else {
            this.playerShip.hullHealth = Math.max(0, this.playerShip.hullHealth - amount);
            gameAudio.playHullHit();
        }

        this.hudManager.updateShipStatus();

        if (this.playerShip.hullHealth <= 0) {
            this.handlePlayerDeath();
        }
    }

    // Trigger effect when missile hits player
    triggerMissileHitEffect(missile) {
        // Flash the screen red and shake it
        this.hazardEffect = {
            type: 'missile_hit',
            startTime: performance.now(),
            duration: 500,
            x: missile.x,
            y: missile.y,
            flashIntensity: 1.0
        };

        // ENGINE CUT: Require re-press of W/S to re-engage
        if (this.playerShip) {
            this.playerShip.enginesDisabled = true;
            this.hudManager.showToast('⚠️ ENGINE FAILURE: RE-ENGAGE THRUSTERS (W/S)', 3000);
        }

        this.damagePlayer(25);
    }

    // --- GLOBAL SKILL ABILITIES ---
    toggleSkillTree() {
        let modal = document.getElementById('skillTreeModal');
        if (modal) {
            modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        } else {
            this.hudManager.showToast('🚀 Skill Tree Interface Loading...', 2000);
            this._injectSkillTreeUI();
        }
    }

    _injectSkillTreeUI() {
        const modal = document.createElement('div');
        modal.id = 'skillTreeModal';
        modal.className = 'modal-overlay hangar-overlay';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="hangar-container" style="max-width: 600px;">
                <h2 style="color: #ffd700; text-align: center; margin-bottom: 20px;">⚡ PILOT NEURAL LINK (Skill Tree)</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                    <!-- EMP -->
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border: 1px solid #00f3ff; border-radius: 8px; text-align: center;">
                        <h3 style="color: #00f3ff; font-size: 16px;">EMP Burst</h3>
                        <div style="font-size: 10px; color: #aaa; height: 40px;">Disables enemy fleet and destroys missiles in wide radius.</div>
                        <div style="color: #fff; margin: 10px 0;">Level: <span id="skillLvl_emp">${this.playerSkills.emp}/3</span></div>
                        <button class="btn-small" style="width: 100%; border-color:#00f3ff;" onclick="app.upgradeSkill('emp', 200)">Upgrade 💎200</button>
                    </div>
                    <!-- Afterburner -->
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border: 1px solid #ff5500; border-radius: 8px; text-align: center;">
                        <h3 style="color: #ff5500; font-size: 16px;">Afterburner</h3>
                        <div style="font-size: 10px; color: #aaa; height: 40px;">Bypasses engine limits for extreme velocity.</div>
                        <div style="color: #fff; margin: 10px 0;">Level: <span id="skillLvl_afterburner">${this.playerSkills.afterburner}/3</span></div>
                        <button class="btn-small" style="width: 100%; border-color:#ff5500;" onclick="app.upgradeSkill('afterburner', 150)">Upgrade 💎150</button>
                    </div>
                    <!-- Quantum Jump -->
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border: 1px solid #ff00ff; border-radius: 8px; text-align: center;">
                        <h3 style="color: #ff00ff; font-size: 16px;">Quantum Dash</h3>
                        <div style="font-size: 10px; color: #aaa; height: 40px;">Instant spacetime translation forward.</div>
                        <div style="color: #fff; margin: 10px 0;">Level: <span id="skillLvl_quantum">${this.playerSkills.quantum}/3</span></div>
                        <button class="btn-small" style="width: 100%; border-color:#ff00ff;" onclick="app.upgradeSkill('quantum', 300)">Upgrade 💎300</button>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <div style="color: #00ffaa; font-weight: bold; margin-bottom: 10px;">Available Gems: 💎<span id="skillGems">${this.playerGems}</span></div>
                    <button class="btn-secondary" onclick="document.getElementById('skillTreeModal').style.display='none'">Close Terminal</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    upgradeSkill(skillKey, cost) {
        if (this.playerSkills[skillKey] >= 3) {
            return this.hudManager.showToast('📈 Skill already at Max Level!');
        }
        if (this.playerGems >= cost) {
            this.playerGems -= cost;
            this.playerSkills[skillKey] += 1;
            localStorage.setItem('playerGems', this.playerGems);
            localStorage.setItem('playerSkills', JSON.stringify(this.playerSkills));
            
            // Update UI
            document.getElementById('skillGems').innerText = this.playerGems;
            document.getElementById(`skillLvl_${skillKey}`).innerText = `${this.playerSkills[skillKey]}/3`;
            this.hudManager.showToast(`✨ Skill Upgraded! Level ${this.playerSkills[skillKey]}`);
            if (window.gameAudio) window.gameAudio.playCollect();
        } else {
            this.hudManager.showToast('⚠️ Insufficient Gems for Upgrade.');
        }
    }

    triggerGlobalEMP() {
        const lvl = this.playerSkills.emp;
        if (lvl === 0) return this.hudManager.showToast('🔒 EMP Locked. Upgrade in Skill Tree (K).', 2000);
        const now = Date.now();
        const cooldown = 30000 - (lvl * 5000); // 30s base, faster with levels
        if (now - this.skillCooldowns.emp < cooldown) return this.hudManager.showToast('⏳ EMP Recharging...', 1000);

        this.skillCooldowns.emp = now;
        this.hudManager.showToast('⚡ SYSTEM: EMP BURST DEPLOYED!', 2000);
        
        if (window.gameAudio) window.gameAudio.playExplosionBig();
        this.hazardEffect = { type: 'emp', startTime: now, duration: 1500 };

        const radius = 500 + (lvl * 250);
        const pX = this.playerShip.x; const pY = this.playerShip.y;
        this.enemyShips.forEach(e => {
            if (Math.hypot(e.x - pX, e.y - pY) < radius) {
                e.disabled = true;
                e.disabledUntil = now + 4000 + (lvl * 1500); // 5.5 to 8.5 seconds freeze
            }
        });
        this.enemyMissiles.forEach(m => {
            if (Math.hypot(m.x - pX, m.y - pY) < radius) m.dead = true;
        });
    }

    triggerGlobalAfterburner() {
        const lvl = this.playerSkills.afterburner;
        if (lvl === 0) return this.hudManager.showToast('🔒 Afterburner Locked. Upgrade in Skill Tree (K).', 2000);
        const now = Date.now();
        const cooldown = 20000 - (lvl * 3000); 
        if (now - this.skillCooldowns.afterburner < cooldown) return this.hudManager.showToast('⏳ Afterburner Recharging...', 1000);

        this.skillCooldowns.afterburner = now;
        this.globalAbilityActive.afterburner = true;
        this.hudManager.showToast('🔥 SYSTEM: AFTERBURNER ENGAGED!', 2000);
        if (window.gameAudio) window.gameAudio.playShieldHit();
        
        // Push ship slightly instantly
        this.playerShip.vx += Math.cos(this.playerShip.rotation) * 20;
        this.playerShip.vy += Math.sin(this.playerShip.rotation) * 20;

        setTimeout(() => {
            this.globalAbilityActive.afterburner = false;
        }, 3000 + (lvl * 1000)); // 4-6s duration
    }

    triggerGlobalQuantumJump() {
        const lvl = this.playerSkills.quantum;
        if (lvl === 0) return this.hudManager.showToast('🔒 Quantum Dash Locked. Upgrade in Skill Tree (K).', 2000);
        const now = Date.now();
        const cooldown = 45000 - (lvl * 5000); 
        if (now - this.skillCooldowns.quantum < cooldown) return this.hudManager.showToast('⏳ Quantum Drive Spooling...', 1000);

        this.skillCooldowns.quantum = now;
        this.hudManager.showToast('🌌 SYSTEM: QUANTUM JUMP SUCCESSFUL', 2000);
        if (window.gameAudio) window.gameAudio.playBossAlert();

        const jumpDist = 1200 + (lvl * 400); // 1600 - 2400 units
        this.playerShip.x += Math.cos(this.playerShip.rotation) * jumpDist;
        this.playerShip.y += Math.sin(this.playerShip.rotation) * jumpDist;

        this.hazardEffect = { type: 'quantum', startTime: now, duration: 800 };
    }

    // --- ACTIVE SHIP ABILITIES ---

    triggerViperBoost() {
        if (this.playerShip.type !== 'viper' && this.playerShip.type !== 'interceptor') return;

        const now = Date.now();
        const cooldown = 10000; // 10s cooldown
        if (now - (this.playerShip.lastBoostTime || 0) < cooldown) {
            this.hudManager.showToast('⚠️ Boost Recharging...');
            return;
        }

        this.playerShip.boostActive = true;
        this.playerShip.boostStartTime = now;
        this.playerShip.lastBoostTime = now;
        this.hudManager.showToast('🚀 VIPER BOOST INITIALIZED!');

        // Visual effect
        this.hazardEffect = {
            type: 'boost',
            startTime: performance.now(),
            duration: 4000
        };
    }

    triggerApexOverclock() {
        if (this.playerShip.type !== 'apex') return;

        const now = Date.now();
        const cooldown = 15000; // 15s cooldown
        if (now - (this.playerShip.lastOverclockTime || 0) < cooldown) {
            this.hudManager.showToast('⚠️ Overclock Cooling Down...');
            return;
        }

        this.playerShip.overclockActive = true;
        this.playerShip.overclockStartTime = now;
        this.playerShip.lastOverclockTime = now;
        this.hudManager.showToast('🔥 OVERCLOCK ENGAGED!');
    }

    toggleSpectreCloak() {
        if (this.playerShip.type !== 'spectre') return;

        this.playerShip.isCloaked = !this.playerShip.isCloaked;
        this.hudManager.showToast(this.playerShip.isCloaked ? '👻 CLOAK ENABLED' : '👻 CLOAK DISABLED');

        if (this.playerShip.isCloaked) {
            // Visual ripple
            this.hazardEffect = {
                type: 'cloak_on',
                startTime: performance.now(),
                duration: 1000
            };
        }
    }

    triggerPulsePing() {
        if (this.playerShip.type !== 'pulse' && this.playerShip.type !== 'orion') return;

        const now = Date.now();
        const cooldown = 5000; // 5s cooldown
        if (now - (this.playerShip.lastPulseTime || 0) < cooldown) return;

        this.playerShip.lastPulseTime = now;
        this.hudManager.showToast('📡 RADAR PULSE SENT');

        // Trigger a visual expanding ring effect
        this.activePulsePing = {
            startTime: now,
            duration: 2000,
            maxRadius: 3000
        };
    }

    // Handle player death - trigger dramatic explosion sequence
    handlePlayerDeath() {
        // Prevent overwriting critical cinematic hazards
        if (this.hazardEffect && (this.hazardEffect.type === 'player_death' || this.hazardEffect.type === 'planet_impact')) return;

        // Reset health/shield immediately so HUD reflects death
        this.playerShip.shield = 0;
        this.playerShip.hullHealth = 0;

        // Apply 25% carried resource penalty
        this.applyDeathPenalty();

        // Show death message
        this.hudManager.showToast('💀 Critical Failure! Ejecting...');

        // Clean up boss on death (prevents ghost boss after respawn)
        // EXCEPT if we are on a boss mission, in which case we want the boss to persist
        if (this.activeBoss && (!this.activeMission || this.activeMission.type !== 'boss')) {
            this.activeBoss = null;
        }

        // Stop engine hum during death sequence
        gameAudio.stopEngineHum();

        // NOVA: Volatile Core (AoE explosion on death)
        if (this.playerShip.type === 'nova') {
            this.hudManager.showToast('⚠️ VOLATILE CORE DETONATED', 3000);
            const explosionRadius = 800;

            // Destroy nearby space mines
            this.spaceMines = this.spaceMines.filter(m => {
                if (Math.hypot(m.x - this.playerShip.x, m.y - this.playerShip.y) <= explosionRadius) {
                    this.triggerSupernovaEffect(m);
                    return false;
                }
                return true;
            });

            // Destroy nearby missile bases
            this.missileBases = this.missileBases.filter(b => {
                if (Math.hypot(b.x - this.playerShip.x, b.y - this.playerShip.y) <= explosionRadius) {
                    this.triggerMissileBaseDestructionEffect(b);
                    return false;
                }
                return true;
            });
        }

        // Trigger the death hazard effect
        this.hazardEffect = {
            type: 'player_death',
            startTime: performance.now(),
            duration: 5000, // 5 second dramatic sequence
            phase: 'venting', // venting -> critical -> explosion -> whiteout -> reset
            ventingPoints: [],
            hullCracks: [],
            flashIntensity: 0,
            x: this.playerShip.x,
            y: this.playerShip.y
        };

        // Initialize some random hull venting points
        for (let i = 0; i < 5; i++) {
            this.hazardEffect.ventingPoints.push({
                offsetX: (Math.random() - 0.5) * 40,
                offsetY: (Math.random() - 0.5) * 40,
                startTime: 500 + Math.random() * 2000,
                duration: 1000,
                size: 10 + Math.random() * 20
            });
        }

        // Stop ship movement
        this.playerShip.vx *= 0.1;
        this.playerShip.vy *= 0.1;

        console.log('[Death] Started dramatic death sequence');
    }

    // Trigger missile base destruction effect when player rams the base
    // Unified Nuclear Event Trigger (Mines and Missile Bases)
    triggerNuclearEvent(x, y, type) {

        const isBase = type === 'missile_base_destruction';
        const isMine = type === 'supernova'; // Nuclear Mine type
        const duration = isBase ? 2500 : (isMine ? 5000 : 8000);
        const now = performance.now();

        // Death Mechanics: Zero health and trigger respawn
        this.handlePlayerDeath();

        this.hazardEffect = {
            type: type,
            startTime: now,
            deathTimestamp: now + duration + 1000,
            duration: duration,
            x: x,
            y: y,
            phase: isBase ? 'fire' : (isMine ? 'singularity' : 'flash'),
            progress: 0,

            // Shared Nuclear State
            particles: [],
            debris: [], // Fixed: Initialize to prevent crash
            debrisRocks: [],
            chaoticMissiles: [],
            lightSpears: [],
            explosions: [],
            hasGeneratedParticles: false,
            flashIntensity: 0,
            cameraShake: 0,
            chromaticIntensity: 0, // Triple-A RGB Split
            flareElements: [], // Multi-element lens flare

            // Quantum Mine Properties (SOTA)
            implosionProgress: 0,
            fusionBounce: 0,
            quantumSpikes: [],
            gravitationalWarp: 0,
            lensPulse: 1.0,
            lensPulseTarget: 1.0,

            // Base Specific (Cinematic Destruction Redux)
            fires: [], // Tactical fires breaking out
            sludge: [], // Green spewing sludge
            shards: [], // Final fragmentation
            meltdownRed: 0, // 0 to 1 red pulse
            baseSize: 70
        };

        console.log('[Hazard] Nuclear event triggered:', type);

        // Initialize Glow Sprites if needed
        this.initGlowSprites();


        // Initialize State for Base Destruction
        if (isBase) {
            const effectObj = this.hazardEffect;
            // Optimization: Reduce shard count for missile bases to 10
            const shardCount = 10;
            for (let i = 0; i < shardCount; i++) {
                const vertices = [];
                const vCount = 3 + Math.floor(Math.random() * 4);
                const avgSize = 10 + Math.random() * 25;
                for (let v = 0; v < vCount; v++) {
                    const ang = (v / vCount) * Math.PI * 2;
                    const r = avgSize * (0.6 + Math.random() * 0.8);
                    vertices.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
                }

                effectObj.shards.push({
                    offsetX: (Math.random() - 0.5) * 40,
                    offsetY: (Math.random() - 0.5) * 40,
                    vertices: vertices,
                    rot: Math.random() * Math.PI * 2,
                    rv: (Math.random() - 0.5) * 0.1,
                    vx: (Math.random() - 0.5) * 20, // INCREASED SPEED
                    vy: (Math.random() - 0.5) * 20, // INCREASED SPEED
                    alpha: 1.0,
                    color: i % 2 === 0 ? '#444' : '#666' // LIGHTER for visibility
                });
            }

            // Init Sludge (Green chemical fire)
            for (let i = 0; i < 20; i++) {
                effectObj.sludge.push({
                    x: x + (Math.random() - 0.5) * 50,
                    y: y + (Math.random() - 0.5) * 50,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    size: 5 + Math.random() * 15,
                    life: 1.0,
                    decay: 0.01 + Math.random() * 0.02
                });
            }
        }

        // Initialize Lens Flare Elements
        for (let i = 0; i < 6; i++) {
            this.hazardEffect.flareElements.push({
                dist: 0.2 + i * 0.4,
                size: 10 + i * 40,
                color: `hsla(${200 + i * 30}, 80%, 80%, 0.3)`,
                type: i % 2 === 0 ? 'circle' : 'hex'
            });
        }

        // Stop ship movement
        this.playerShip.vx = 0;
        this.playerShip.vy = 0;

    }

    triggerSupernovaEffect(mine) {
        // Award reward
        if (this.flightMode) {
            this.playerGems += 5;
            localStorage.setItem('playerGems', this.playerGems);
            if (this.updateGemsUI) this.updateGemsUI();
            this.hudManager.showToast('💥 Mine Defused! +5 Gems', 1500);

            // REMOVED: Mission progress increment (Only weapons count now)
        }
        this.triggerNuclearEvent(mine.x, mine.y, 'supernova');
    }

    triggerMissileBaseDestructionEffect(base) {
        // Award reward
        if (this.flightMode) {
            this.playerGems += 25; // More for a base!
            localStorage.setItem('playerGems', this.playerGems);
            if (this.updateGemsUI) this.updateGemsUI();
            this.hudManager.showToast('💥 Missile Base Destroyed! +25 Gems', 2000);

            // Track mission progress
            if (this.activeMission && this.activeMission.type === 'siege') {
                this.activeMission.progress++;
                this.hudManager.updateMissionHUD();
                this.checkMissionComplete();
            }
        }
        this.triggerNuclearEvent(base.x, base.y, 'missile_base_destruction');
    }

    // Trigger planet impact effect - LOCALIZED PLUME AND FLASH
    triggerPlanetImpactEffect(planet) {
        const duration = 2500; // Faster, snappier effect
        const ship = this.playerShip;

        // Calculate impact angle (away from planet)
        const impactAngle = Math.atan2(ship.y - planet.y, ship.x - planet.x);
        const impactSpeed = ship.speed;

        // Generate directional plume - smoke/dust shooting "up" from surface
        const dustParticles = [];
        const dustCount = 80 + Math.floor(Math.random() * 40);
        for (let i = 0; i < dustCount; i++) {
            // Tighter cone for the plume
            const particleAngle = impactAngle + (Math.random() - 0.5) * Math.PI * 0.4;
            const speed = 2 + Math.random() * 12 + impactSpeed * 0.5;
            const size = 2 + Math.random() * 12;

            const hue = Math.random() * 30 + 15; // Dusty brown
            const saturation = 10 + Math.random() * 20;
            const lightness = 20 + Math.random() * 20;

            dustParticles.push({
                x: ship.x,
                y: ship.y,
                vx: Math.cos(particleAngle) * speed * 1.5, // FASTER
                vy: Math.sin(particleAngle) * speed * 1.5, // FASTER
                size: size * 1.5, // BIGGER
                life: 1.0,
                decay: 0.01 + Math.random() * 0.02,
                color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
            });
        }

        // Debris shards from the ship/planet crust
        const debrisRocks = [];
        for (let i = 0; i < 20; i++) {
            const angle = impactAngle + (Math.random() - 0.5) * Math.PI;
            const speed = 4 + Math.random() * 15;
            debrisRocks.push({
                x: ship.x,
                y: ship.y,
                vx: Math.cos(angle) * speed * 2.0, // FASTER
                vy: Math.sin(angle) * speed * 2.0, // FASTER
                size: 6 + Math.random() * 10, // BIGGER
                life: 1.0,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                color: '#666' // LIGHTER
            });
        }

        // Snap ship to a safe distance outside the planet's collision zone immediately
        // This prevents re-triggering the impact on the next frame or after the effect ends
        const zFactor = 1 / (1 + Math.abs(planet.z) * 0.0005);
        const effectiveRadius = planet.radius * zFactor;
        const collisionRadius = 30;
        const safeDist = effectiveRadius + collisionRadius + 15; // 15 unit buffer

        ship.x = planet.x + Math.cos(impactAngle) * safeDist;
        ship.y = planet.y + Math.sin(impactAngle) * safeDist;

        this.hazardEffect = {
            type: 'planet_impact',
            startTime: performance.now(),
            duration: duration,
            x: ship.x, // Use the new snapped position for particles too
            y: ship.y,
            planetColor: planet.baseColor,
            impactAngle: impactAngle,
            dustParticles: dustParticles,
            debrisRocks: debrisRocks,
            cameraShake: 45,
            flashIntensity: 1.0, // Contact flash
            phase: 'impact'
        };

        // Rebound ship strongly
        const reboundForce = 15;
        ship.vx = Math.cos(impactAngle) * reboundForce;
        ship.vy = Math.sin(impactAngle) * reboundForce;

        // Death Mechanics: Zero health and trigger respawn logic
        // NOTE: We do NOT call handlePlayerDeath() here because it overwrites the hazardEffect
        // with 'player_death'. We want the 'planet_impact' to play first.
        this.damagePlayer(Infinity);
        this.hudManager.showToast('💀 CRITICAL IMPACT! HULL INTEGRITY LOST...');

        console.log('[Hazard] Ship crashed into planet - impact sequence initiated!');
    }

    // Structural Nuclear Mushroom Generation


    // Trigger black hole teleportation effect (15-20 seconds)
    triggerBlackHoleEffect(blackhole) {
        const duration = 12000; // 12 seconds (shorter for better pacing)

        // Calculate teleport destination (random distant location)
        const teleportDist = 5000 + Math.random() * 10000;
        const teleportAngle = Math.random() * Math.PI * 2;

        // Death Mechanics: Zero health and trigger respawn
        // User requested death on black hole impact
        this.handlePlayerDeath();

        this.hazardEffect = {
            type: 'blackhole',
            startTime: performance.now(),
            duration: duration,
            x: blackhole.x,
            y: blackhole.y,
            destX: this.playerShip.x + Math.cos(teleportAngle) * teleportDist,
            destY: this.playerShip.y + Math.sin(teleportAngle) * teleportDist,
            tunnelParticles: this.proceduralManager.generateTunnelParticles(150),
            distortionStrength: 0,
            tunnelDepth: 0,
            phase: 'pull' // pull, tunnel, collapse, emerge
        };

        // Stop ship movement during effect
        this.playerShip.vx = 0;
        this.playerShip.vy = 0;

        console.log('[Hazard] Black hole entered!');
    }

    // Generate wormhole tunnel particles


    // Update active hazard effect


    // ====================================================================
    // --- FLIGHT ACADEMY: TRAINING TRACK SYSTEM (7-Lesson Progressive Course) ---
    // ====================================================================

    // Lesson definitions — each lesson teaches a specific flight skill


    // Load/save training progress
    loadTrainingProgress() {
        try {
            return JSON.parse(localStorage.getItem('trainingProgress')) || {};
        } catch (e) { return {}; }
    }
    saveTrainingProgress() {
        try {
            localStorage.setItem('trainingProgress', JSON.stringify(this.trainingProgress));
        } catch (e) { }
    }

    // Start a specific training lesson
    startTraining(lessonIndex) {
        if (this.hazardEffect) {
            this.hudManager.showToast('⚠️ Wait for the current event to finish!');
            return;
        }

        // Ensure flight mode is active
        if (!this.flightMode) {
            this.toggleFlightMode();
        }

        const lessons = this.missionManager.getTrainingLessons();
        if (lessonIndex < 0 || lessonIndex >= lessons.length) return;

        const lesson = lessons[lessonIndex];

        // Deep-clone gates and gems so re-running a lesson regenerates them
        this.trainingLesson = JSON.parse(JSON.stringify(lesson));
        // Re-generate gates for lessons with random elements
        if (lesson.id === 'radar') {
            const freshLessons = this.missionManager.getTrainingLessons();
            this.trainingLesson.gates = JSON.parse(JSON.stringify(freshLessons[lessonIndex].gates));
        }
        this.trainingLessonIndex = lessonIndex;
        this.trainingActive = true;
        this.trainingGateIndex = lesson.id === 'collection' ? 1 : 0; // Skip pre-reached gate for collection
        this.trainingGemsCollected = 0;
        this.trainingTimer = 0;
        this.trainingStartTime = 0; // Set when briefing ends
        this.trainingBriefing = true;
        this.trainingBriefingStart = performance.now();
        this.trainingComplete = false;
        this.trainingMedal = null;

        // Reset ship position and velocity
        this.playerShip.x = 0;
        this.playerShip.y = 0;
        this.playerShip.z = 0;
        this.playerShip.vx = 0;
        this.playerShip.vy = 0;
        this.playerShip.vz = 0;
        this.playerShip.rotation = 0;

        // Stop old tutorial if running
        this.tutorialActive = false;

        console.log(`[Training] Starting lesson ${lessonIndex + 1}: ${lesson.name}`);
    }

    // Dismiss briefing and start timer
    dismissTrainingBriefing() {
        this.trainingBriefing = false;
        this.trainingStartTime = performance.now();
    }

    // Per-frame training update


    // Complete a training lesson — score and reward
    completeTrainingLesson() {
        const lesson = this.trainingLesson;
        const time = this.trainingTimer;

        // Determine medal
        let medal = null;
        if (time <= lesson.medals.gold) medal = 'gold';
        else if (time <= lesson.medals.silver) medal = 'silver';
        else if (time <= lesson.medals.bronze) medal = 'bronze';

        this.trainingMedal = medal;
        this.trainingComplete = true;
        this.trainingActive = false; // Stop updates

        // Credit reward
        const reward = medal ? lesson.reward[medal] : 50;
        this.credits += reward;
        this.saveCredits();

        // --- Precious Element Rewards per lesson ---
        const lessonGemRewards = {
            throttle: { gems: { iron: 10, copper: 5 }, bonus: { gold: { silver: 4 }, silver: { titanium: 2 }, bronze: {} } },
            steering: { gems: { copper: 10, titanium: 4 }, bonus: { gold: { silicon: 6 }, silver: { copper: 4 }, bronze: {} } },
            boost: { gems: { titanium: 6, silicon: 6 }, bonus: { gold: { silver: 4 }, silver: { titanium: 4 }, bronze: {} } },
            precision: { gems: { silver: 6, gold: 2 }, bonus: { gold: { platinum: 2 }, silver: { gold: 2 }, bronze: {} } },
            collection: { gems: { gold: 4, platinum: 2 }, bonus: { gold: { palladium: 2 }, silver: { platinum: 2 }, bronze: {} } },
            radar: { gems: { platinum: 4, palladium: 2 }, bonus: { gold: { quartz: 2 }, silver: { palladium: 2 }, bronze: {} } },
            final: { gems: { gold: 6, platinum: 4, diamond: 2 }, bonus: { gold: { emerald: 2, ruby: 2 }, silver: { diamond: 2 }, bronze: { quartz: 2 } } },
            weaponry: { gems: { titanium: 10, gold: 4 }, bonus: { gold: { platinum: 2 }, silver: { gold: 2 }, bronze: {} } },
            shielding: { gems: { iron: 20, copper: 20 }, bonus: { gold: { titanium: 6 }, silver: { copper: 10 }, bronze: {} } },
            hazards: { gems: { palladium: 6, quartz: 4 }, bonus: { gold: { emerald: 2 }, silver: { quartz: 2 }, bronze: {} } }
        };

        const gemReward = lessonGemRewards[lesson.id];
        const gemSummary = [];
        if (gemReward) {
            // Base gems (always awarded)
            for (const [type, qty] of Object.entries(gemReward.gems)) {
                this.playerInventory[type] = (this.playerInventory[type] || 0) + qty;
                const name = MINERAL_TYPES[type]?.name || type;
                gemSummary.push(`+${qty} ${name}`);
            }
            // Medal bonus gems
            if (medal && gemReward.bonus[medal]) {
                for (const [type, qty] of Object.entries(gemReward.bonus[medal])) {
                    this.playerInventory[type] = (this.playerInventory[type] || 0) + qty;
                    const name = MINERAL_TYPES[type]?.name || type;
                    gemSummary.push(`+${qty} ${name} ⭐`);
                }
            }
            this.saveInventory();
            this.hudManager.updateInventoryUI();
        }

        // Store gem summary for the completion overlay
        this.trainingGemSummary = gemSummary;

        // Save progress
        const existing = this.trainingProgress[lesson.id];
        if (!existing || time < existing.bestTime) {
            this.trainingProgress[lesson.id] = {
                completed: true,
                bestTime: time,
                medal: medal
            };
        } else if (existing && medal) {
            // Upgrade medal if better
            const medalRank = { gold: 3, silver: 2, bronze: 1 };
            if (medalRank[medal] > (medalRank[existing.medal] || 0)) {
                existing.medal = medal;
            }
        }
        this.saveTrainingProgress();

        // Check if all lessons are now complete for first-time bonus
        this.checkAllLessonsComplete();

        const medalEmoji = medal === 'gold' ? '🥇' : medal === 'silver' ? '🥈' : medal === 'bronze' ? '🥉' : '✅';
        const gemText = gemSummary.length > 0 ? ` | ${gemSummary.join(', ')}` : '';
        this.hudManager.showToast(`${medalEmoji} ${lesson.name} Complete! Time: ${time.toFixed(1)}s — $${reward}${gemText}`);
        console.log(`[Training] Lesson "${lesson.name}" completed in ${time.toFixed(1)}s — Medal: ${medal || 'none'} — Gems: ${gemSummary.join(', ')}`);
    }

    // Cancel / exit training
    cancelTraining() {
        this.trainingActive = false;
        this.trainingBriefing = false;
        this.trainingComplete = false;
        this.trainingLesson = null;
        this.hudManager.showToast('Training cancelled.');
    }

    // --- FIRST-LOGIN TRACKING & ONBOARDING ---
    checkFirstLogin() {
        const loginData = this.loadLoginData();
        const now = Date.now();

        if (!loginData.firstLogin) {
            // Brand new user!
            loginData.firstLogin = now;
            loginData.lastLogin = now;
            loginData.loginCount = 1;
            loginData.academyPrompted = false;
            this.saveLoginData(loginData);

            // Show welcome overlay after a short delay to let game load
            setTimeout(() => {
                this.showWelcomeOverlay = true;
                this.welcomeOverlayStart = performance.now();
                console.log('[Onboarding] First-time user detected — showing Flight Academy prompt.');
            }, 2000);
        } else {
            // Returning user
            loginData.lastLogin = now;
            loginData.loginCount = (loginData.loginCount || 0) + 1;
            this.saveLoginData(loginData);

            // If they haven't completed any lessons, gently remind them
            const progress = this.trainingProgress || {};
            const completedCount = Object.values(progress).filter(p => p && p.completed).length;
            if (completedCount === 0 && !loginData.academyPrompted) {
                setTimeout(() => {
                    this.hudManager.showToast('🎓 Tip: Try the Flight Academy to earn credits and precious elements!');
                }, 3000);
            }

            console.log(`[Login] Returning user — visit #${loginData.loginCount}`);
        }
    }

    loadLoginData() {
        try {
            return JSON.parse(localStorage.getItem('loginData')) || {};
        } catch (e) { return {}; }
    }
    saveLoginData(data) {
        try {
            localStorage.setItem('loginData', JSON.stringify(data));
        } catch (e) { }
    }

    // Welcome overlay for new users — rendered on canvas


    dismissWelcomeOverlay(startAcademy) {
        this.showWelcomeOverlay = false;
        this.keysPressed['enter'] = false;
        this.keysPressed['escape'] = false;
        this.keysPressed['w'] = false;
        this.keysPressed[' '] = false;

        // Mark as prompted
        const loginData = this.loadLoginData();
        loginData.academyPrompted = true;
        this.saveLoginData(loginData);

        if (startAcademy) {
            setTimeout(() => this.openFlightAcademy(), 300);
        } else {
            this.hudManager.showToast('🎓 You can access Flight Academy anytime from the Flight Control panel!');
        }
    }

    // Check if all 10 lessons are complete — award graduation bonus
    checkAllLessonsComplete() {
        const lessons = this.missionManager.getTrainingLessons();
        const progress = this.trainingProgress || {};
        const allComplete = lessons.every(l => progress[l.id] && progress[l.id].completed);

        if (allComplete && !progress._graduationBonusAwarded) {
            // Graduation bonus!
            this.credits += 2000;
            this.playerInventory['sapphire'] = (this.playerInventory['sapphire'] || 0) + 1;
            this.playerInventory['uranium'] = (this.playerInventory['uranium'] || 0) + 1;
            this.saveCredits();
            this.saveInventory();
            this.hudManager.updateInventoryUI();

            // Mark as awarded
            progress._graduationBonusAwarded = true;
            this.saveTrainingProgress();

            this.hudManager.showToast('🎓🏆 FLIGHT ACADEMY GRADUATED! +$2,000 +1 Sapphire +1 Uranium!');
            console.log('[Training] All 10 lessons complete — graduation bonus awarded!');
        }
    }

    // Open the Flight Academy selector UI
    openFlightAcademy() {
        if (!this.flightMode) {
            this.toggleFlightMode();
        }

        const lessons = this.missionManager.getTrainingLessons();
        const progress = this.trainingProgress;

        let html = `
            <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center;" id="flightAcademyModal">
                <div style="background:linear-gradient(145deg, #0a1628, #162040); border:2px solid rgba(0,243,255,0.4); border-radius:16px; padding:30px; max-width:600px; width:90%; max-height:80vh; overflow-y:auto; box-shadow: 0 0 40px rgba(0,243,255,0.15);">
                    <div style="text-align:center; margin-bottom:20px;">
                        <div style="font-size:28px; font-weight:bold; color:#00f3ff; text-shadow:0 0 20px rgba(0,243,255,0.5); letter-spacing:3px;">🎓 FLIGHT ACADEMY</div>
                        <div style="font-size:12px; color:#8ba; margin-top:6px;">Master the art of interstellar flight</div>
                    </div>
                    <div style="display:grid; gap:10px;">
        `;

        lessons.forEach((lesson, i) => {
            const p = progress[lesson.id];
            const completed = p && p.completed;
            const medal = p ? p.medal : null;
            const bestTime = p ? p.bestTime : null;
            const medalEmoji = medal === 'gold' ? '🥇' : medal === 'silver' ? '🥈' : medal === 'bronze' ? '🥉' : '';
            const borderColor = completed ? (medal === 'gold' ? 'rgba(255,215,0,0.5)' : 'rgba(0,255,100,0.4)') : 'rgba(0,243,255,0.2)';
            const bgColor = completed ? 'rgba(0,255,100,0.05)' : 'rgba(255,255,255,0.03)';

            html += `
                <div style="background:${bgColor}; border:1px solid ${borderColor}; border-radius:10px; padding:14px 16px; cursor:pointer; transition:all 0.2s;"
                     onmouseenter="this.style.background='rgba(0,243,255,0.1)'; this.style.transform='translateX(4px)';"
                     onmouseleave="this.style.background='${bgColor}'; this.style.transform='none';"
                     onclick="document.getElementById('flightAcademyModal').remove(); app.startTraining(${i});">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <span style="font-size:18px; margin-right:8px;">${lesson.icon}</span>
                            <span style="font-weight:bold; color:#e0faff; font-size:14px;">Lesson ${i + 1}: ${lesson.name}</span>
                            ${medalEmoji ? `<span style="margin-left:8px;">${medalEmoji}</span>` : ''}
                        </div>
                        <div style="font-size:11px; color:${completed ? '#00ff66' : '#667'}">
                            ${completed ? `Best: ${bestTime.toFixed(1)}s` : 'Not completed'}
                        </div>
                    </div>
                    <div style="font-size:11px; color:#8ba; margin-top:4px; margin-left:30px;">${lesson.subtitle}</div>
                </div>
            `;
        });

        html += `
                    </div>
                    <div style="text-align:center; margin-top:20px;">
                        <button onclick="document.getElementById('flightAcademyModal').remove();"
                                style="background:rgba(255,50,50,0.2); border:1px solid rgba(255,50,50,0.4); color:#ff6666; padding:10px 30px; border-radius:8px; cursor:pointer; font-size:13px; letter-spacing:1px;">
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Remove any existing modal first
        const existing = document.getElementById('flightAcademyModal');
        if (existing) existing.remove();

        document.body.insertAdjacentHTML('beforeend', html);
    }

    // --- TRAINING RENDERERS ---



    // Legacy tutorial methods (kept for backward compatibility)
    startTutorial() {
        this.openFlightAcademy();
    }
    updateTutorial() { } // No-op, replaced by updateTraining
    renderTutorialWaypoints(ctx) {
        this.renderManager.renderTrainingGates(ctx);
    }
    renderTutorialHUDIndicator(ctx) {
        this.renderManager.renderTrainingHUD(ctx);
    }

    // Update supernova effect state
    // Unified update for all nuclear events
    updateSupernovaEffect(progress) {
        const effect = this.hazardEffect;
        if (!effect) return;

        const isBase = effect.type === 'missile_base_destruction';
        const now = performance.now();
        effect.progress = progress; // Ensure progress is tracked for the renderer


        // 1. PHASE MANAGEMENT (REDUX)
        if (isBase) {
            // Missile Base Sequence: Fire -> Explosion -> Reset (Scrapped "Eruption")
            if (progress < 0.10) effect.phase = 'fire';
            else if (progress < 0.60) effect.phase = 'explosion'; // Extended explosion
            else effect.phase = 'reset';
        } else {
            // Nuclear Mine Sequence: Singularity -> Mushroom (Growth) -> Ignition (Flash) -> Quantum Dispersal -> Reset
            if (progress < 0.15) effect.phase = 'singularity';
            else if (progress < 0.40) effect.phase = 'mushroom'; // Growth phase
            else if (progress < 0.60) effect.phase = 'explosion'; // Sudden burst
            else if (progress < 0.92) effect.phase = 'dispersal'; // The cinematic second half
            else effect.phase = 'reset';
        }


        // 2. PHASE-SPECIFIC LOGIC
        switch (effect.phase) {
            case 'fire': // Missile Base Step 1: CATCH ON FIRE
                const fireP = progress / 0.10;
                effect.cameraShake = fireP * 35; // More intense vibration
                effect.lensPulse = 1.0 + Math.sin(now * 0.05) * 0.05;
                effect.meltdownRed = fireP * 0.8; // Red glow during meltdown

                // Generate tactical fires
                if (Math.random() > 0.8 && effect.fires.length < 30) {
                    const ang = Math.random() * Math.PI * 2;
                    effect.fires.push({
                        offsetX: (Math.random() - 0.5) * 60,
                        offsetY: (Math.random() - 0.5) * 60,
                        vx: Math.cos(ang) * 2,
                        vy: Math.sin(ang) * 2,
                        life: 1.0,
                        decay: 0.01 + Math.random() * 0.02
                    });
                }
                break;

            case 'singularity': // Nuclear Mine Step 0: IMPLOSION
                const singP = progress / 0.20;
                effect.cameraShake = singP * 15;
                effect.gravitationalWarp = singP; // Max warp at end of phase
                effect.lensPulse = 1.0 - singP * 0.6; // Shrink before boom

                // Pulse lensing
                effect.lensPulseTarget = 0.4 + Math.sin(now * 0.02) * 0.1;

                // Pull in debris
                if (!effect.hasGeneratedDebris) {
                    effect.hasGeneratedDebris = true;
                    for (let i = 0; i < 40; i++) {
                        const ang = Math.random() * Math.PI * 2;
                        const dist = 300 + Math.random() * 500;
                        effect.debris.push({
                            x: Math.cos(ang) * dist,
                            y: Math.sin(ang) * dist,
                            vx: 0, vy: 0,
                            rotSpd: (Math.random() - 0.5) * 0.2,
                            rotation: Math.random() * Math.PI * 2,
                            life: 1.0, size: 4 + Math.random() * 8
                        });
                    }
                }
                break;

            case 'explosion': // Shared Explosion Phase (Mine or Base)
                // Explosion peak is now the blinding part
                const phaseStart = isBase ? 0.10 : 0.40;
                const phaseLen = isBase ? 0.15 : 0.20;
                const expP = Math.max(0, (progress - phaseStart) / phaseLen);
                if (!effect.hasDetonated) {
                    effect.hasDetonated = true;
                    effect.flashIntensity = isBase ? 3.0 : 8.0; // BLINDING PEAK
                    effect.cameraShake = isBase ? 250 : 600;
                    effect.gravitationalWarp = 0; // Release warp

                    // Trigger shockwave
                    effect.hasShockwave = true;
                    effect.shockwaveStart = progress;

                    // GENERATE MUSHROOM PARTICLES NOW at detonation point
                    if (!effect.hasGeneratedParticles) {
                        effect.hasGeneratedParticles = true;
                        // Performance: Significant reduction to prevent freeze
                        effect.particles = this.proceduralManager.generateSupernovaParticles(isBase ? 200 : 400);
                    }

                    if (isBase) {
                        // Shards are now initialized in triggerNuclearEvent for custom geometry
                        // This loop is redundant and was causing clumping issues
                    }
                    else {
                        // Initialize light streaks for mine explosion - Optimization: reduce spear count
                        for (let i = 0; i < 50; i++) {
                            effect.lightSpears.push({
                                angle: Math.random() * Math.PI * 2,
                                len: 2500 + Math.random() * 2000,
                                life: 1.0,
                                v: 100 + Math.random() * 100
                            });
                        }
                    }

                }

                // Blinding peak persistence
                if (!isBase) {
                    // Start decay earlier and faster to prevent "stuck" whiteout
                    if (expP < 0.1) {
                        effect.flashIntensity = Math.min(12.0, effect.flashIntensity + 4.0);
                    } else {
                        effect.flashIntensity = Math.max(0.5, effect.flashIntensity * 0.94); // Faster decay
                    }
                } else {
                    effect.flashIntensity *= 0.65; // Base stays fast but feels massier
                }

                effect.chromaticIntensity = expP * 15.0;
                effect.lensPulse = 0.4 + expP * 8.0;
                break;

            case 'mushroom': // Nuclear Mine Step 2: MUSHROOM CLOUD
                // Trigger early particle generation if we haven't yet (Mushroom before flash)
                if (!isBase && !effect.hasGeneratedParticles) {
                    effect.hasGeneratedParticles = true;
                    effect.particles = this.proceduralManager.generateSupernovaParticles(400);
                    effect.cameraShake = 150;
                }

                // Initial growth phase flash intensity
                if (progress < 0.40) {
                    effect.flashIntensity = 0.2 + Math.sin(now * 0.01) * 0.1;
                }
                effect.cameraShake = isBase ? 100 : 180;
                effect.chromaticIntensity = 0.3 + Math.sin(now * 0.01) * 0.5;
                break;

            case 'dispersal': // NEW: Cinematic Second Half
                // Slower flash decay for a lasting afterglow
                effect.flashIntensity = Math.max(0.01, effect.flashIntensity * 0.94);
                effect.cameraShake = 50 + Math.sin(now * 0.005) * 30;
                effect.chromaticIntensity = 5.0 * (1 - (progress - 0.6) / 0.32);

                // Add secondary "quantum cracks" mid-dispersal - Branching Spears
                if (Math.random() > 0.92 && effect.lightSpears.length < 120) {
                    const ang = Math.random() * Math.PI * 2;
                    effect.lightSpears.push({
                        angle: ang,
                        len: 300 + Math.random() * 800,
                        life: 1.0,
                        v: 40 + Math.random() * 40,
                        isBranch: true,
                        parentAngle: ang + (Math.random() - 0.5) * 0.5
                    });
                }
                break;

            case 'eruption': // Missile Base Step 3: MUSHROOM CLOUD
                // Flash intensity should be low here to show particles
                effect.flashIntensity = Math.max(0.1, effect.flashIntensity * 0.90);
                effect.cameraShake = 100;
                effect.chromaticIntensity = 0.3 + Math.sin(now * 0.01) * 0.3;
                break;

            case 'reset': // Final fade out
                const resetOff = 0.90;
                const resetP = (progress - resetOff) / (1.0 - resetOff);
                effect.flashIntensity = Math.max(0, effect.flashIntensity - 0.1); // More aggressive reset
                effect.cameraShake = 0;
                effect.lensPulse = 1.0; // Reset scale to normal
                effect.gravitationalWarp = 0; // Reset warp
                effect.chromaticIntensity = 0; // Reset chromatic aberration
                break;
        }

        // 3. CONTINUOUS UPDATES (Physics for all active elements)
        // Shards
        for (const shard of (effect.shards || [])) {
            // Updated to support 'fire' phase for initial vibration/meltdown
            if (effect.phase === 'fire' || effect.phase === 'explosion' || effect.phase === 'eruption') {
                shard.offsetX += shard.vx;
                shard.offsetY += shard.vy;
                shard.rot += shard.rv;
                shard.alpha *= 0.985;
            }
        }

        // Sludge
        for (let i = effect.sludge.length - 1; i >= 0; i--) {
            const s = effect.sludge[i];
            s.x += s.vx; s.y += s.vy;
            s.life -= s.decay;
            if (s.life <= 0) effect.sludge.splice(i, 1);
        }

        // Fires
        for (let i = effect.fires.length - 1; i >= 0; i--) {
            const f = effect.fires[i];
            f.life -= f.decay;
            if (f.life <= 0) effect.fires.splice(i, 1);
        }

        // 4. CINEMATIC PARTICLE UPDATES (Toroidal Vortex Physics)
        const flashStart = isBase ? 0.50 : 0.20; // Detonation starts at mushroom phase (mine) or explosion phase (base)
        const expProgress = progress > flashStart ? (progress - flashStart) / (1.0 - flashStart) : 0;

        for (const p of effect.particles) {
            // 4a. RADIAL PUSH (Only during ignition peak)
            if (effect.phase === 'explosion' && !p.hasBeenPushed) {
                const dist = Math.hypot(p.x, p.y, p.z);
                const pushMag = (isBase ? 15 : 45) / (1 + dist * 0.01);
                const ang = Math.atan2(p.y, p.x);
                p.vx += Math.cos(ang) * pushMag;
                p.vy += Math.sin(ang) * pushMag;
                p.hasBeenPushed = true;
            }

            // Apply Velocity
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Apply Drag/Friction - Lower drag during dispersal for "swirl"
            const drag = effect.phase === 'dispersal' ? 0.994 : (p.type === 'plasma' ? 0.96 : 0.985);
            p.vx *= drag;
            p.vy *= drag;
            p.vz *= drag;

            // 4b. QUANTUM SWIRL & JITTER (During dispersal phase)
            if (effect.phase === 'dispersal') {
                const swirlForce = 0.035;
                const dist = Math.hypot(p.x, p.y);
                const ang = Math.atan2(p.y, p.x) + Math.PI / 2; // Tangent

                // Centripetal component to keep it tight
                const pullIn = 0.005 * dist;

                p.vx += Math.cos(ang) * swirlForce * (150 / (dist + 10)) - (p.x / dist) * pullIn;
                p.vy += Math.sin(ang) * swirlForce * (150 / (dist + 10)) - (p.y / dist) * pullIn;

                // Quantum Jitter
                if (Math.random() > 0.8) {
                    p.vx += (Math.random() - 0.5) * 1.5;
                    p.vy += (Math.random() - 0.5) * 1.5;
                }
            }

            // 4c. ADVANCED MUSHROOM PHYSICS
            if (p.type === 'torus') {
                p.vy -= 4.0 * p.temp;
                p.rollAngle += p.rollSpeed;
                const rollRadius = p.size * 0.3;
                const rollX = Math.cos(p.torusAngle) * Math.sin(p.rollAngle) * rollRadius;
                const rollY = Math.cos(p.rollAngle) * rollRadius;

                p.x += rollX * 0.4;
                p.y += rollY * 0.4;
                p.vx += Math.cos(p.torusAngle) * 1.2;

                // Add life and temp decay for torus (mushroom cap)
                p.life -= (p.decay || 0.001) * 0.5;
                p.temp = Math.max(0, p.temp - (p.decay || 0.001) * 0.3);
                p.size *= (1 + (p.decay || 0.001) * 0.8);
            } else if (p.type === 'stem') {
                p.vy -= 2.5 * p.temp;
                p.vx += (Math.random() - 0.5) * 2.0;
                p.life -= (p.decay || 0.01) * 0.35;
                p.temp = Math.max(0, p.temp - (p.decay || 0.01) * 0.25);
                p.size *= (1 + (p.decay || 0.01) * 1.8);
            } else if (p.type === 'plasma') {
                // Add life/temp decay for plasma (shockwave)
                p.life -= (p.decay || 0.005) * 0.6;
                p.temp = Math.max(0, p.temp - (p.decay || 0.005) * 0.4);
                p.size *= (1 + (p.decay || 0.005) * 0.5);
            }
        }


        // 5. MISSILE AND DEBRIS UPDATES (Moved outside particle loop for performance and correctness)
        for (const m of effect.chaoticMissiles) {
            m.x += m.vx;
            m.y += m.vy;
            m.vx += Math.cos(m.angle) * 0.5; // Erratic propulsion
            m.vy += Math.sin(m.angle) * 0.5;
            m.angle += m.angularVelocity;
            m.life -= 0.015;

            // Add to trail
            if (Math.random() < 0.5) {
                m.trail.push({ x: m.x, y: m.y, life: 1.0 });
            }
            m.trail = m.trail.filter(t => (t.life -= 0.05) > 0);

            if (m.life < 0 && !m.exploded) {
                m.exploded = true;
                // Add tiny debris bits
                for (let i = 0; i < 3; i++) {
                    const dAngle = Math.random() * Math.PI * 2;
                    const dSpeed = 2 + Math.random() * 3;
                    effect.debris.push({
                        x: m.x, y: m.y,
                        vx: Math.cos(dAngle) * dSpeed,
                        vy: Math.sin(dAngle) * dSpeed,
                        rotation: Math.random() * Math.PI * 2,
                        life: 1.0, size: 2 + Math.random() * 3
                    });
                }
            }
        }

        // 6. DEBRIS PHYSICS
        for (const d of effect.debris) {
            d.x += d.vx; d.y += d.vy;
            d.vx *= 0.98; d.vy *= 0.98;
            d.rotation += (d.rotSpd || 0.1);
            d.life -= 0.01;

            if (effect.phase === 'singularity') {
                const dist = Math.hypot(d.x, d.y);
                if (dist > 10) {
                    d.vx -= (d.x / dist) * 2;
                    d.vy -= (d.y / dist) * 2;
                }
            }
        }

        // 7. LIGHT SPEAR UPDATES
        for (const s of effect.lightSpears) {
            // Growth and Decay
            if (effect.phase === 'explosion') {
                s.len += s.v * 0.5;
            } else if (effect.phase === 'dispersal') {
                s.len += s.v * 0.2;
                s.life -= 0.015;
            } else {
                s.life -= 0.05;
            }
        }

        // Filter dead objects - Fixed: Ensured regular filtering to prevent bloat
        if (Math.random() < 0.15) {
            effect.particles = effect.particles.filter(p => p.life > 0.05);
            effect.chaoticMissiles = effect.chaoticMissiles.filter(m => m.life > 0);
            effect.debris = effect.debris.filter(d => d.life > 0);
            effect.lightSpears = effect.lightSpears.filter(s => s.life > 0);
        }
    }

    // Helper to create optimized glow sprites
    initGlowSprites() {
        if (this.glowSprites.fire) return;

        const createGlow = (r, g, b, size = 128) => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
            grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, size, size);
            return canvas;
        };

        // Cache common colors used by engine flames and glowing elements
        this.glowSprites = {
            white: createGlow(255, 255, 255),
            fire: createGlow(255, 120, 0),        // Default thrust (orange/red)
            cyan: createGlow(0, 255, 255),        // Interceptor, Viper, Orion
            red: createGlow(255, 0, 0),           // Titan
            orange: createGlow(255, 136, 0),      // Bulwark
            yellow: createGlow(255, 215, 0),      // Prospector
            purple: createGlow(119, 0, 255),      // Spectre
            magenta: createGlow(170, 0, 255),     // Siphon
            green: createGlow(0, 255, 102),       // Flux
            blue: createGlow(0, 150, 255),        // Pulse
            quantum: createGlow(100, 200, 255),
            cool: createGlow(50, 60, 220)
        };
    }


    // Update black hole effect state
    updateBlackHoleEffectState(progress) {
        const effect = this.hazardEffect;

        // Phase transitions
        if (progress < 0.15) {
            effect.phase = 'pull';
            effect.distortionStrength = (progress / 0.15) * 1.0;
        } else if (progress < 0.55) {
            effect.phase = 'tunnel';
            effect.tunnelDepth = ((progress - 0.15) / 0.4);
            effect.distortionStrength = 1.0;
        } else if (progress < 0.85) {
            effect.phase = 'collapse';
            effect.distortionStrength = 1.0 - ((progress - 0.55) / 0.3) * 0.5;
        } else {
            effect.phase = 'emerge';
            effect.distortionStrength = 0.5 * (1 - (progress - 0.85) / 0.15);
        }

        // Update tunnel particles (spiral motion)
        for (const p of effect.tunnelParticles) {
            p.z -= p.speed;
            p.angle += 0.02 + (1000 - p.z) * 0.00005;
            if (p.z < -500) {
                p.z = 1000;
                p.angle = Math.random() * Math.PI * 2;
            }
        }
    }

    // Update missile base destruction effect state
    updateMissileBaseDestructionEffect(progress) {
        this.updateSupernovaEffect(progress);
    }

    // Update planet impact effect state - DUST CLOUD AND EMBEDDING
    updatePlanetImpactEffect(progress) {
        const effect = this.hazardEffect;

        // Phase transitions based on progress
        // 0-30%: Impact - dust cloud expands
        // 30-70%: Settling - dust settles, crater forms
        // 70-100%: Respawn - fadeout and respawn

        if (progress < 0.3) {
            effect.phase = 'impact';
            effect.cameraShake = 45 * (1 - progress / 0.3);
        } else {
            effect.cameraShake = 5 * (1 - progress);
        }

        // Update dust particles
        for (const dust of (effect.dustParticles || [])) {
            dust.x += dust.vx;
            dust.y += dust.vy;
            dust.vx *= 0.97;
            dust.vy *= 0.97;
            dust.life -= dust.decay;
        }

        // Update debris rocks
        for (const rock of (effect.debrisRocks || [])) {
            rock.x += rock.vx;
            rock.y += rock.vy;
            rock.vx *= 0.98;
            rock.vy *= 0.98;
            rock.life -= 0.015;
        }
    }

    // Update player death effect state
    updatePlayerDeathEffect(progress) {
        const effect = this.hazardEffect;
        const now = performance.now();

        // Phase transitions
        if (progress < 0.2) {
            effect.phase = 'venting';
            effect.cameraShake = 10 + Math.sin(now * 0.02) * 5;
        } else if (progress < 0.5) {
            effect.phase = 'critical';
            effect.cameraShake = 20 + Math.sin(now * 0.03) * 10;
            effect.flashIntensity = Math.sin((progress - 0.2) / 0.3 * Math.PI) * 0.5; // Pulsing red
        } else if (progress < 0.7) {
            effect.phase = 'explosion';
            effect.cameraShake = 100 * (1 - (progress - 0.5) / 0.2);
            effect.flashIntensity = 1.0; // Brief white flash
        } else if (progress < 0.9) {
            effect.phase = 'whiteout';
            effect.flashIntensity = 1.0 - (progress - 0.7) / 0.2; // Fade out white
            effect.cameraShake = 0;
        } else {
            effect.phase = 'reset';
            effect.flashIntensity = 0;
        }

        // Update venting points
        effect.ventingPoints = effect.ventingPoints.filter(p => {
            const pElapsed = now - (effect.startTime + p.startTime);
            if (pElapsed < 0) return true; // Not started yet

            const pProgress = pElapsed / p.duration;
            if (pProgress >= 1) return false; // Expired

            // Simulate gas/smoke venting
            p.size *= 1.05;
            p.alpha = 1 - pProgress;
            return true;
        });

        // Generate hull cracks during critical phase
        if (effect.phase === 'critical' && Math.random() < 0.1 && effect.hullCracks.length < 10) {
            effect.hullCracks.push({
                x: (Math.random() - 0.5) * 60,
                y: (Math.random() - 0.5) * 60,
                length: 10 + Math.random() * 30,
                angle: Math.random() * Math.PI * 2,
                life: 1.0
            });
        }
        effect.hullCracks = effect.hullCracks.filter(c => (c.life -= 0.01) > 0);

        // Respawn logic (after whiteout)
        if (effect.phase === 'reset' && !effect.hasRespawned) {
            this.playerShip.shield = this.playerShip.maxShield;
            this.playerShip.hullHealth = this.playerShip.maxHull;

            // Reset ship pitch/roll to prevent oval glitch
            this.shipPitch = 0;
            this.shipRoll = 0;

            // Teleport to a safe location (away from hazards)
            const teleportDist = 2000 + Math.random() * 3000;
            const teleportAngle = Math.random() * Math.PI * 2;
            this.playerShip.x += Math.cos(teleportAngle) * teleportDist;
            this.playerShip.y += Math.sin(teleportAngle) * teleportDist;
            this.playerShip.vx = 0;
            this.playerShip.vy = 0;

            this.hudManager.showToast('🚀 Respawned! Shields restored.');
            effect.hasRespawned = true;

            // BOSS PERSISTENCE: If in a boss mission, ensure boss is near the new location
            if (this.activeMission && this.activeMission.type === 'boss') {
                if (this.activeBoss) {
                    console.log('[Boss Debug] Teleporting existing mission boss near player');
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 1200;
                    this.activeBoss.x = this.playerShip.x + Math.cos(angle) * dist;
                    this.activeBoss.y = this.playerShip.y + Math.sin(angle) * dist;
                    // Reset boss health slightly (e.g. 20% heal) to prevent easy cheese? 
                    // No, let's keep it as is for now for difficulty.
                } else {
                    console.log('[Boss Debug] Respawning mission boss after player death');
                    setTimeout(() => this.combatManager.spawnBoss(this.activeMission.bossType), 2000);
                }
            }

            // REFILL FLARES ON RESPAWN
            if (this.playerShip && this.playerShip.maxFlares > 0) {
                this.playerShip.flares = this.playerShip.maxFlares;
            }
        }
    }

    toggleMatrixRainbow() {
        this.matrixRainbowMode = !this.matrixRainbowMode;
        const btn = document.getElementById('matrixRainbowBtn');
        if (btn) btn.classList.toggle('active', this.matrixRainbowMode);
    }

    // Update star colors from the 3 color pickers
    updateStarColors() {
        try {
            const c1 = document.getElementById('starColor1')?.value || '#ffffff';
            const c2 = document.getElementById('starColor2')?.value || '#aaddff';
            const c3 = document.getElementById('starColor3')?.value || '#ffddaa';
            this.starColors = [c1, c2, c3];
            this.proceduralManager.generateStaticStars();
            this.hudManager.showToast('Star colors updated');
        } catch (e) {
            console.error('[BG Error] updateStarColors failed:', e);
        }
    }

    // Toggle slow star drift mode
    toggleBgDrift() {
        try {
            // Mutex: Turn off warp first if it's on
            if (this.bgWarpMode) {
                this.bgWarpMode = false;
                const warpBtn = document.getElementById('bgWarpBtn');
                if (warpBtn) warpBtn.classList.remove('active');
            }

            this.bgDriftMode = !this.bgDriftMode;
            const btn = document.getElementById('bgDriftBtn');
            if (btn) btn.classList.toggle('active', this.bgDriftMode);

            // Regenerate stars with proper velocities
            this.proceduralManager.generateStaticStars();
            this.hudManager.showToast(this.bgDriftMode ? 'Star Drift ON' : 'Star Drift OFF');
        } catch (e) {
            console.error('[BG Error] toggleBgDrift failed:', e);
            this.bgDriftMode = false;
            this.hudManager.showToast('Drift mode error - please try again');
        }
    }

    toggleUpgradePanel() {
        console.log("[HUD] Toggle Upgrade Panel triggered");
        const panel = document.getElementById('upgradePanel');
        if (panel) {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                this.updateUpgradeUI();
            }
        } else {
            console.error("[HUD] upgradePanel NOT found in DOM!");
        }
    }

    updateUpgradeUI() {
        const list = document.getElementById('upgradeList');
        const credits = document.getElementById('dockCredits');
        if (!list || !credits) return;

        credits.textContent = '$' + this.credits.toLocaleString();

        const upgrades = [
            { id: 'speed', name: 'Engine Overclock', desc: 'Increases max speed & acceleration' },
            { id: 'armor', name: 'Nanocarbon Hull', desc: 'Increases hull integrity' },
            { id: 'weapons', name: 'Photon Cannons', desc: 'Increases damage output (Coming Soon)' },
            { id: 'shield', name: 'Energy Shield', desc: 'Increases shield capacity' },
            { id: 'cargo', name: 'Quantum Hold', desc: 'Increases gem capacity (Coming Soon)' },
            { id: 'radar', name: 'Deep Scan Radar', desc: 'Increases detection range' },
            { id: 'tractor', name: 'Tractor Beam', desc: 'Increases gem pull radius (Mauler)' },
            { id: 'ecm', name: 'ECM Scrambler', desc: 'Reduces enemy aggro range & breaks stalking' },
            { id: 'flares', name: 'Decoy Flares', desc: 'Distracts heat-seeking missiles (Press G)' }
        ];

        const costs = [1000, 2500, 5000, 10000, 25000];

        let html = '';
        upgrades.forEach(u => {
            const level = this.playerShip.upgrades[u.id] || 0;
            const cost = costs[level];
            const isMax = level >= 5;
            const canAfford = this.credits >= cost;

            let bars = '';
            for (let i = 0; i < 5; i++) {
                bars += `<div style="flex:1; height:4px; background:${i < level ? '#00f3ff' : 'rgba(255,255,255,0.1)'}; margin:0 1px;"></div>`;
            }

            html += `
                <div style="background:rgba(255,255,255,0.05); border:1px solid ${canAfford ? 'rgba(0,243,255,0.3)' : 'rgba(255,50,50,0.3)'}; padding:8px; border-radius:6px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="font-weight:bold; color:#e0faff; font-size:11px;">${u.name}</span>
                        <span style="font-size:10px; color:${isMax ? '#00f3ff' : '#ffd700'}">${isMax ? 'MAX' : '$' + cost.toLocaleString()}</span>
                    </div>
                    <div style="font-size:9px; color:#8ba; margin-bottom:6px;">${u.desc}</div>
                    <div style="display:flex; margin-bottom:6px;">${bars}</div>
                    ${!isMax ? `<button class="btn-small" onclick="app.upgradeShip('${u.id}')" style="width:100%; font-size:10px; padding:4px; ${canAfford ? 'cursor:pointer' : 'opacity:0.5; cursor:not-allowed;'}">UPGRADE</button>` : ''}
                </div>
            `;
        });

        list.innerHTML = html;
    }

    // Toggle warp speed mode
    toggleBgWarp() {
        try {
            // Mutex: Turn off drift first if it's on
            if (this.bgDriftMode) {
                this.bgDriftMode = false;
                const driftBtn = document.getElementById('bgDriftBtn');
                if (driftBtn) driftBtn.classList.remove('active');
            }

            const btn = document.getElementById('bgWarpBtn');

            // If currently disengaging, ignore button presses
            if (this.warpDisengaging) {
                this.hudManager.showToast('Warp still decelerating...');
                return;
            }

            // DISENGAGE path: When warp is ON, start the disengage animation
            if (this.bgWarpMode) {
                this.warpDisengaging = true;
                this.disengageStartTime = performance.now(); // Track when disengage started
                this.disengageDuration = 4500; // 4.5 seconds total animation
                if (btn) btn.classList.remove('active');
                this.hudManager.showToast('Warp Disengaged - Decelerating...');

                // Cancel any existing engage animation
                if (this.warpSliderAnimation) {
                    cancelAnimationFrame(this.warpSliderAnimation);
                    this.warpSliderAnimation = null;
                }

                const slider = document.getElementById('warpSpeedSlider');
                if (slider) {
                    const startValue = parseFloat(slider.value) || 100;
                    const startTime = performance.now();

                    // MIRRORED timing from acceleration: 
                    // Accel was: 3s slow (1→50), then 1.5s fast (50→100)
                    // Decel is: 1.5s fast (100→50), then 3s slow (50→1)
                    const fastSlowdownDuration = 1500;  // Fast initial decel
                    const gradualSlowdownDuration = 3000; // Slow final approach
                    const totalDuration = fastSlowdownDuration + gradualSlowdownDuration;

                    // Animate slider backward (inverse of acceleration)
                    const animateSliderBackward = (currentTime) => {
                        if (!this.warpDisengaging) return;

                        const elapsed = currentTime - startTime;
                        let value;

                        if (elapsed < fastSlowdownDuration) {
                            // Fast phase: 100 to 50 in 1.5s
                            const progress = elapsed / fastSlowdownDuration;
                            const eased = 1 - Math.pow(1 - progress, 2); // ease-out
                            value = startValue - (startValue * 0.5 * eased);
                        } else if (elapsed < totalDuration) {
                            // Slow phase: 50 to 0 in 3s (mirrors the 3s 0→50)
                            const gradualElapsed = elapsed - fastSlowdownDuration;
                            const progress = gradualElapsed / gradualSlowdownDuration;
                            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                            value = (startValue * 0.5) - ((startValue * 0.5) * eased);
                        } else {
                            // Complete - turn off warp mode
                            value = 0;
                            this.warpDisengaging = false;
                            this.bgWarpMode = false;

                            // Finalize objects at their current positions and clean up
                            const finalizePositions = (arr) => {
                                if (arr) arr.forEach(obj => {
                                    // Snap objects to their final positions - REMOVED to prevent jump
                                    // if (obj.finalX !== undefined) {
                                    //    obj.x = obj.finalX;
                                    //    obj.y = obj.finalY;
                                    // }
                                    // Clear all warp-related data
                                    obj.flownOut = false;
                                    obj.wasFlownOut = false;
                                    obj.disengageInit = false;
                                    obj.returning = false;
                                    obj.arrivalAngle = undefined;
                                    obj.warpScale = undefined;
                                    obj.warpAlpha = undefined;
                                    obj.startWarpSpeed = undefined;
                                    obj.startScreenX = undefined;
                                    obj.startScreenY = undefined;
                                    obj.finalX = undefined;
                                    obj.finalY = undefined;
                                    obj.disengageFinalX = undefined;
                                    obj.disengageFinalY = undefined;
                                    obj.targetX = undefined;
                                    obj.targetY = undefined;
                                    obj.origX = undefined;
                                    obj.origY = undefined;
                                    obj.typeIndex = undefined;
                                });
                            };
                            finalizePositions(this.planets);
                            finalizePositions(this.galaxies);
                            finalizePositions(this.blackHoles);
                            finalizePositions(this.nebulae);
                            finalizePositions(this.spacecraft);
                            finalizePositions(this.stars);

                            slider.value = 0;
                            this.setWarpSpeedMultiplier(0);

                            this.hudManager.showToast('Arrived at new destination');
                            return;
                        }

                        slider.value = Math.max(0, value);
                        this.setWarpSpeedMultiplier(Math.max(0, value), false);

                        this.warpSliderAnimation = requestAnimationFrame(animateSliderBackward);
                    };

                    this.warpSliderAnimation = requestAnimationFrame(animateSliderBackward);
                }
                return; // Exit after starting disengage
            }

            // ENGAGE path: Turn on warp mode
            this.bgWarpMode = true;
            this.warpDisengaging = false;
            if (btn) btn.classList.add('active');

            // Reset warp speed for smooth ramp-up
            this.warpSpeed = 0;

            this.hudManager.showToast('WARP ENGAGED!');

            // Store original positions for all objects
            const storeOriginalPosition = (obj) => {
                if (!obj) return;
                obj.origX = obj.x;
                obj.origY = obj.y;
                obj.flownOut = false;
                obj.returning = false;
            };
            if (this.planets) this.planets.forEach(storeOriginalPosition);
            if (this.galaxies) this.galaxies.forEach(storeOriginalPosition);
            if (this.blackHoles) this.blackHoles.forEach(storeOriginalPosition);
            if (this.nebulae) this.nebulae.forEach(storeOriginalPosition);
            if (this.spacecraft) this.spacecraft.forEach(storeOriginalPosition);
            if (this.stars) this.stars.forEach(storeOriginalPosition);

            // Auto-animate slider from min to max
            const slider = document.getElementById('warpSpeedSlider');
            if (slider) {
                if (this.warpSliderAnimation) {
                    cancelAnimationFrame(this.warpSliderAnimation);
                    this.warpSliderAnimation = null;
                }

                this.warpManualControl = false;

                const stopAutoAnimation = () => {
                    this.warpManualControl = true;
                    if (this.warpSliderAnimation) {
                        cancelAnimationFrame(this.warpSliderAnimation);
                        this.warpSliderAnimation = null;
                    }
                };

                slider.removeEventListener('mousedown', stopAutoAnimation);
                slider.removeEventListener('touchstart', stopAutoAnimation);
                slider.removeEventListener('pointerdown', stopAutoAnimation);
                slider.addEventListener('mousedown', stopAutoAnimation);
                slider.addEventListener('touchstart', stopAutoAnimation);
                slider.addEventListener('pointerdown', stopAutoAnimation);

                slider.value = 1;
                this.setWarpSpeedMultiplier(1);

                const startTime = performance.now();
                const firstHalfDuration = 3000;
                const secondHalfDuration = 1500;
                const totalDuration = firstHalfDuration + secondHalfDuration;

                const animateSlider = (currentTime) => {
                    if (!this.bgWarpMode || this.warpManualControl || this.warpDisengaging) return;

                    const elapsed = currentTime - startTime;
                    let value;

                    if (elapsed < firstHalfDuration) {
                        const firstProgress = elapsed / firstHalfDuration;
                        value = 1 + firstProgress * 49.5;
                    } else if (elapsed < totalDuration) {
                        const secondElapsed = elapsed - firstHalfDuration;
                        const secondProgress = Math.min(1, secondElapsed / secondHalfDuration);
                        value = 50.5 + secondProgress * 49.5;
                    } else {
                        const maintainTime = (elapsed - totalDuration) / 1000;
                        const wave1 = Math.sin(maintainTime * 0.8) * 5;
                        const wave2 = Math.sin(maintainTime * 2.3) * 3;
                        const wave3 = Math.sin(maintainTime * 5.7) * 2;
                        const surge = Math.sin(maintainTime * 0.3) * Math.sin(maintainTime * 1.1) * 4;
                        const turbulence = wave1 + wave2 + wave3 + surge;
                        value = 92 + turbulence;
                        value = Math.max(85, Math.min(100, value));
                    }

                    slider.value = value;
                    this.setWarpSpeedMultiplier(value);
                    this.warpSliderAnimation = requestAnimationFrame(animateSlider);
                };
                this.warpSliderAnimation = requestAnimationFrame(animateSlider);
            }
        } catch (e) {
            console.error('[BG Error] toggleBgWarp failed:', e);
            this.bgWarpMode = false;
            this.warpDisengaging = false;
            this.hudManager.showToast('Warp mode error - please try again');
        }
    }

    // Set warp speed multiplier from slider
    // EXPONENTIAL acceleration: slow start, ramps up to lightspeed at midpoint
    setWarpSpeedMultiplier(value, updateState = true) {
        const rawValue = parseFloat(value) || 0;

        if (updateState) {
            // Handling for "Slow Move" / Traverse vs Warp
            if (rawValue > 0.5) {
                // Moving: Enable warp mode (traverse)
                if (!this.bgWarpMode) this.bgWarpMode = true;
                this.warpDisengaging = false;

                const btn = document.getElementById('bgWarpBtn');
                if (btn) btn.classList.add('active');
            } else {
                // Stopped/Arrived (Slider ~0)
                if (rawValue === 0) {
                    // FULL STOP: Ensure everything is off
                    this.bgWarpMode = false;
                    this.warpDisengaging = false;
                    this.warpSpeed = 0; // Force speed to 0 immediately
                    const btn = document.getElementById('bgWarpBtn');
                    if (btn) btn.classList.remove('active');
                    this.hudManager.showToast('Engines Stopped');
                } else if (this.bgWarpMode && !this.warpDisengaging) {
                    // Slowing down but not 0: Trigger disengage visual (stars fading)
                    this.warpDisengaging = true;
                }
            }
        }

        // Normalize to 0-1 range (slider is 0-100)
        const normalized = rawValue / 100;

        // Curve: Speed 0 = 0. Speed 1 = Slow. Speed 100 = Fast.
        // Using power curve to give fine control at low speeds
        const curved = Math.pow(normalized, 3);

        // Scale to final range: 0 to ~840
        this.warpSpeedMultiplier = curved * 840;

        // Store raw slider for UI consistency
        this.warpSliderRaw = rawValue;
    }

    updateColorModeUI() {
        const fixedIndicator = document.getElementById('fixedModeIndicator');
        const rainbowBtn = document.getElementById('rainbowBtn');
        const colorText = document.getElementById('currentColorModeText');
        const colorInput = document.getElementById('colorInput');

        // Guard clauses to prevent crashes if elements don't exist
        if (colorInput) colorInput.value = this.activeColor;

        if (this.colorMode === 'fixed') {
            if (fixedIndicator) {
                fixedIndicator.classList.add('active');
                fixedIndicator.style.background = this.activeColor;
            }
            if (rainbowBtn) rainbowBtn.classList.remove('active');
            if (colorText) colorText.innerText = `Color Mode: Fixed(${this.activeColor})`;
        } else {
            if (fixedIndicator) fixedIndicator.classList.remove('active');
            if (rainbowBtn) rainbowBtn.classList.add('active');
            if (colorText) colorText.innerText = "Color Mode: Rainbow (Random per star)";
        }
    }

    /* --- Input Handling --- */

    getWorldPos(e) {
        return {
            x: (e.clientX - this.canvas.width / 2 - this.camera.x) / this.camera.zoom,
            y: (e.clientY - this.canvas.height / 2 - this.camera.y) / this.camera.zoom
        };
    }

    onPointerDown(e) {
        // Track which button was pressed (0=left, 1=middle, 2=right)
        this.pointer.button = e.button;

        if (this.showWelcomeOverlay) {
            const w = this.canvas.width;
            const h = this.canvas.height;
            const cy = h / 2;
            const btnW = 220;
            const btnH = 42;
            const btnX = w / 2 - btnW / 2;
            const rewardY = cy + 120 + 4 * 26 + 15;
            const btnY = rewardY + 30;

            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (mouseX >= btnX && mouseX <= btnX + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH) {
                this.dismissWelcomeOverlay(true);
            }
            return; // Block background interactions
        }

        // Only track canvas interactions
        this.pointer.onCanvas = (e.target === this.canvas);
        this.pointer.isDown = true;
        this.pointer.startX = e.clientX;
        this.pointer.startY = e.clientY;
        this.pointer.camStartX = this.camera.x;
        this.pointer.camStartY = this.camera.y;
        this.pointer.rotStartX = this.rotationX;
        this.pointer.rotStartY = this.rotationY;

        // Middle mouse button OR Alt+Left = Orbit mode (Blender style)
        // Shift+Left = Pan mode
        this.pointer.orbitMode = (e.button === 1) || (e.button === 0 && e.altKey);
        this.pointer.panMode = (e.button === 0 && e.shiftKey);

        // If orbiting or panning, skip star interactions
        if (this.pointer.orbitMode || this.pointer.panMode) {
            return;
        }

        const world = this.getWorldPos(e);
        const hitDist = (this.config.starBaseRad * 4) / this.camera.zoom;
        const starHit = this.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

        // Refresh cluster assignments if we hit a star, in case we drag a group
        if (starHit) {
            this.refreshClusterAssignments();

            // In select mode, clicking a star initiates a cluster drag
            if (this.mode === 'select' && starHit.clusterId) {
                // Determine the cluster ID to drag (it's either the cluster name string or the star's ID string)
                this.draggedClusterId = String(starHit.clusterId);
                this.pointer.lastWorldX = world.x;
                this.pointer.lastWorldY = world.y;
                this.saveState();
                return;
            }

            // If not in select mode, allow single star drag
            if (this.mode === 'draw') {
                this.draggedStar = starHit;
                this.saveState();
            }
        }
    }

    onPointerMove(e) {
        if (this.showWelcomeOverlay) {
            const w = this.canvas.width;
            const h = this.canvas.height;
            const cy = h / 2;
            const btnW = 220;
            const btnH = 42;
            const btnX = w / 2 - btnW / 2;
            const rewardY = cy + 120 + 4 * 26 + 15;
            const btnY = rewardY + 30;

            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (mouseX >= btnX && mouseX <= btnX + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH) {
                this.canvas.style.cursor = 'pointer';
            } else {
                this.canvas.style.cursor = 'default';
            }
            return; // Block background interactions
        }

        const world = this.getWorldPos(e);

        // Hover Logic
        const hitDist = (this.config.starBaseRad * 4) / this.camera.zoom;
        this.hoveredStar = this.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

        // Cursor Feedback based on mode
        let newCursor = 'default';
        if (this.pointer.orbitMode && this.pointer.isDown) {
            newCursor = 'grab';
        } else if (this.pointer.panMode && this.pointer.isDown) {
            newCursor = 'move';
        } else if (this.draggedStar || this.draggedClusterId || this.pointer.dragging) {
            newCursor = 'grabbing';
        } else if (this.hoveredStar) {
            newCursor = 'move';
        } else if (this.mode === 'draw') {
            newCursor = 'crosshair';
        }
        this.canvas.style.cursor = newCursor;


        if (!this.pointer.isDown) return;

        const dx = e.clientX - this.pointer.startX;
        const dy = e.clientY - this.pointer.startY;
        const distMoved = Math.hypot(dx, dy);

        if (distMoved > 5) {
            this.pointer.dragging = true;
        }

        // PRIORITY 1: Orbit mode (Middle mouse or Alt+Left) - ALWAYS rotates in 3D
        if (this.pointer.orbitMode) {
            this.rotationY = this.pointer.rotStartY + dx * 0.5;
            this.rotationX = this.pointer.rotStartX + dy * 0.5;
            this.renderManager.draw();
            // Update UI sliders
            const rotXSliderEl = document.getElementById('rotXSlider');
            const rotYSliderEl = document.getElementById('rotYSlider');
            if (rotXSliderEl) {
                rotXSliderEl.value = this.rotationX % 360;
                document.getElementById('rotXValue').textContent = Math.round(this.rotationX % 360) + '°';
            }
            if (rotYSliderEl) {
                rotYSliderEl.value = this.rotationY % 360;
                document.getElementById('rotYValue').textContent = Math.round(this.rotationY % 360) + '°';
            }
            return;
        }

        // PRIORITY 2: Pan mode (Shift + Left drag) - ALWAYS pans
        if (this.pointer.panMode) {
            this.camera.x = this.pointer.camStartX + dx;
            this.camera.y = this.pointer.camStartY + dy;
            return;
        }

        // PRIORITY 3: Cluster dragging (in select mode)
        if (this.draggedClusterId) {
            // Calculate world delta since last move
            const deltaWorldX = world.x - this.pointer.lastWorldX;
            const deltaWorldY = world.y - this.pointer.lastWorldY;

            const draggedIdString = this.draggedClusterId;
            // Move all stars in the cluster
            this.stars.forEach(s => {
                // Use strict comparison on the clusterId string
                if (String(s.clusterId) === draggedIdString) {
                    s.x += deltaWorldX;
                    s.y += deltaWorldY;
                }
            });

            // Update last position
            this.pointer.lastWorldX = world.x;
            this.pointer.lastWorldY = world.y;
            return;
        }

        // PRIORITY 4: Single star dragging
        if (this.draggedStar) {
            this.draggedStar.x = world.x;
            this.draggedStar.y = world.y;
            return;
        }

        // PRIORITY 5: Empty space drag = rotate by default (Blender-style)
        if (this.pointer.dragging) {
            this.rotationY = this.pointer.rotStartY + dx * 0.5;
            this.rotationX = this.pointer.rotStartX + dy * 0.5;
            this.renderManager.draw();
            // Update UI sliders if they exist
            const rotXSliderEl = document.getElementById('rotXSlider');
            const rotYSliderEl = document.getElementById('rotYSlider');
            if (rotXSliderEl) {
                rotXSliderEl.value = this.rotationX % 360;
                document.getElementById('rotXValue').textContent = Math.round(this.rotationX % 360) + '°';
            }
            if (rotYSliderEl) {
                rotYSliderEl.value = this.rotationY % 360;
                document.getElementById('rotYValue').textContent = Math.round(this.rotationY % 360) + '°';
            }
        }
    }

    onPointerUp(e) {
        // Skip star creation if we were orbiting or panning
        const wasNavigating = this.pointer.orbitMode || this.pointer.panMode;

        // Only process star creation if pointer started on canvas and not navigating
        if (this.pointer.onCanvas && !wasNavigating) {
            const world = this.getWorldPos(e);
            const hitDist = (this.config.starBaseRad * 4) / this.camera.zoom;
            const clickedStar = this.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

            if (!this.pointer.dragging && !clickedStar) {
                // Empty Space Clicked - Create Star (ONLY in draw mode)
                if (this.mode === 'draw') {
                    this.saveState(); // Save BEFORE action

                    // Get current rotation center BEFORE adding star
                    // This ensures consistency with how rotate3D renders existing stars
                    const center = this.getConstellationCenter();

                    // Cache the center for rendering stability after star is added
                    // This prevents the visual "jump" when constellation center shifts
                    this._cachedRotationCenter = { x: center.x, y: center.y, z: center.z };

                    // Inverse rotate using the same center that rendering uses
                    const pos3D = this.physicsManager.inverseRotate3D(world.x, world.y, center.x, center.y);

                    this.createStar(pos3D.x, pos3D.y, pos3D.z);

                    // Clear cached center after a brief delay to allow smooth transition
                    setTimeout(() => { this._cachedRotationCenter = null; }, 100);
                }
            }
        }

        // Reset interaction state
        this.pointer.isDown = false;
        this.pointer.dragging = false;
        this.pointer.onCanvas = false;
        this.pointer.orbitMode = false;
        this.pointer.panMode = false;
        this.pointer.button = 0;
        this.draggedStar = null;
        this.draggedClusterId = null;
    }

    onRightClick(e) {
        e.preventDefault(); // Prevent context menu
        const world = this.getWorldPos(e);
        const hitDist = (this.config.starBaseRad * 4) / this.camera.zoom;

        // Check if clicking on a star
        const clickedStarIndex = this.stars.findIndex(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

        if (clickedStarIndex !== -1) {
            // Delete the star
            this.saveState(); // Save for undo
            this.stars.splice(clickedStarIndex, 1);
            this.hudManager.showToast(`Deleted star`);
            this.renderManager.draw();
            return;
        }

        // Check if clicking on a connection line
        const lineHitDist = 5 / this.camera.zoom; // 5 pixel tolerance
        for (let i = 0; i < this.stars.length; i++) {
            const s1 = this.stars[i];
            for (let j = i + 1; j < this.stars.length; j++) {
                const s2 = this.stars[j];

                // Only check connected stars
                if (Math.hypot(s1.x - s2.x, s1.y - s2.y) > this.config.maxConnectDist) continue;

                // Point-to-line distance formula
                const lineLen = Math.hypot(s2.x - s1.x, s2.y - s1.y);
                if (lineLen === 0) continue;

                const t = Math.max(0, Math.min(1, ((world.x - s1.x) * (s2.x - s1.x) + (world.y - s1.y) * (s2.y - s1.y)) / (lineLen * lineLen)));
                const projX = s1.x + t * (s2.x - s1.x);
                const projY = s1.y + t * (s2.y - s1.y);
                const dist = Math.hypot(world.x - projX, world.y - projY);

                if (dist < lineHitDist) {
                    // Delete both stars that make up this connection
                    this.saveState(); // Save for undo
                    const indices = [i, j].sort((a, b) => b - a); // Remove in reverse order
                    this.stars.splice(indices[0], 1);
                    this.stars.splice(indices[1], 1);
                    this.hudManager.showToast(`Deleted connection`);
                    this.renderManager.draw();
                    return;
                }
            }
        }
    }

    onWheel(e) {
        e.preventDefault();

        // Multiplicative/Exponential zoom for smoothness
        const zoomFactor = 1.05;
        if (e.deltaY < 0) {
            // Zoom IN
            this.camera.zoom *= zoomFactor;
        } else {
            // Zoom OUT
            this.camera.zoom /= zoomFactor;
        }

        // Clamp zoom
        this.camera.zoom = Math.max(0.1, Math.min(6, this.camera.zoom));
    }

    /* --- Star Creation --- */

    createStar(x, y, z = 0) {
        let starColor = this.activeColor;
        if (this.colorMode === 'rainbow') {
            starColor = this.getRainbowHex();
        }

        this.stars.push({
            x, y,
            z: z, // Store Z coordinate
            id: Math.floor(Date.now() + Math.random() * 1000).toString(),
            phase: Math.random() * Math.PI * 2,
            color: starColor,
            clusterId: null, // Will be calculated in refreshClusterAssignments()
        });
        this.renderManager.draw();
    }

    /**
     * Re-calculates connections and assigns cluster names/IDs to all star objects.
     * Guarantees that s.clusterId is always a string (either the constellation name or the star's unique string ID).
     */
    refreshClusterAssignments() {
        const { lines, clusters } = this.physicsManager.calculateGeometry();

        // Map to hold assignments: { starId: clusterName/starId }
        const assignmentMap = new Map();

        // 1. Assign deterministic name (string) to all members of large clusters (>= minGroupSize)
        clusters.forEach(c => {
            if (c.length >= this.config.minGroupSize) {
                const name = this.getConstellationName(c);
                c.forEach(star => {
                    assignmentMap.set(star.id, name);
                });
            }
        });

        // 2. Apply assignments back to the main stars array
        this.stars.forEach(s => {
            // If a star is part of a large cluster, use the mapped string name. 
            // Otherwise, preserve its existing name IF it's a real string (e.g. from template), else fallback to ID.
            const assigned = assignmentMap.get(s.id);
            if (assigned) {
                s.clusterId = assigned;
            } else if (s.clusterId && isNaN(parseFloat(s.clusterId))) {
                // Keep existing custom name if it's not just a number
                // This preserves "Wolf Major" even if connectivity logic doesn't group it yet
            } else {
                s.clusterId = s.id;
            }
        });

        return { lines, clusters };
    }

    /* --- Utility Methods --- */

    getStarColor(s) {
        const c = s && s.color;
        // Validate it looks like a hex color
        if (c && typeof c === 'string' && /^#?[0-9a-f]{3,6}$/i.test(c)) {
            return c.startsWith('#') ? c : '#' + c;
        }
        return '#e0faff'; // Fallback to default
    }

    hexToRgb(hex) {
        // Defensive: ensure hex is a valid string
        if (!hex || typeof hex !== 'string') return [224, 240, 255];
        hex = hex.trim();
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            const r = parseInt(result[1], 16);
            const g = parseInt(result[2], 16);
            const b = parseInt(result[3], 16);
            // Final NaN guard
            return [isNaN(r) ? 224 : r, isNaN(g) ? 240 : g, isNaN(b) ? 255 : b];
        }
        return [224, 240, 255]; // Default blue/white
    }


    /* --- Core Logic (State Management) --- */

    saveState() {
        // Save a deep copy of the stars array before an action that changes it
        const newState = JSON.stringify(this.stars.map(s => ({
            x: s.x,
            y: s.y,
            id: String(s.id),
            phase: s.phase,
            color: s.color,
        })));
        if (this.history.length > 25) this.history.shift();
        this.history.push(newState);
        console.log('[UNDO] saveState called, history length:', this.history.length);
    }

    undo() {
        console.log('[UNDO] undo() called, history length:', this.history.length);
        if (this.history.length === 0) {
            this.hudManager.showToast("Nothing to undo");
            return;
        }
        // Pop the last saved state and restore it
        const prevState = this.history.pop();
        if (prevState) {
            this.stars = JSON.parse(prevState);
            console.log('[UNDO] Restored state with', this.stars.length, 'stars');
        } else {
            this.stars = [];
        }

        this.renderManager.draw();
        this.hudManager.showToast(`Undone(${this.history.length} remaining)`);
    }

    requestClear() {
        document.getElementById('clearModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('clearModal').classList.remove('active');
    }

    confirmClear() {
        this.saveState();
        this.stars = [];
        this.resetCamera();
        this.closeModal();
        this.renderManager.draw();
        this.hudManager.showToast("Universe Imploded");
    }

    resetView() {
        this.resetCamera();
    }

    adjustZoom(delta) {
        this.camera.zoom = Math.max(0.1, Math.min(6, this.camera.zoom + delta));
        // Re-center camera on ship in flight mode to prevent drift
        // Re-center camera on ship in flight mode to prevent drift
        if (this.flightMode && this.playerShip) {
            this.camera.x = -this.playerShip.x * this.camera.zoom;
            this.camera.y = -this.playerShip.y * this.camera.zoom;
        }
    }

    getConstellationName(group) {
        // Priority: Check if any star already has a assigned name (e.g. from a Template or previous session)
        // We assume a real name is a string that isn't just a number/ID.
        const existing = group.find(s => s.clusterId && isNaN(parseFloat(s.clusterId)));
        if (existing) return existing.clusterId;

        const sortedIds = group.map(s => String(s.id)).sort((a, b) => a.localeCompare(b));
        let seed = 0;
        sortedIds.forEach((id, i) => {
            for (let j = 0; j < id.length; j++) {
                seed += id.charCodeAt(j) * (j + 1) * (i + 1);
            }
        });
        seed = Math.floor(seed);

        const pre = this.prefixes[seed % this.prefixes.length];
        const root = this.roots[(seed * 13) % this.roots.length];
        const suf = this.suffixes[(seed * 7) % this.suffixes.length];

        const type = seed % 3;
        if (type === 0) return `${pre} ${root} `;
        if (type === 1) return `${root} ${suf} `;
        return `The ${pre} ${root} ${suf} `;
    }

    // Duplicate setBgStyle removed

    // ... (updateColorModeUI omitted)


    // Helper: Get hue from hex color
    getHueFromHex(hex) {
        const rgb = this.hexToRgb(hex);
        const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0;
        if (max !== min) {
            const d = max - min;
            if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            else if (max === g) h = ((b - r) / d + 2) / 6;
            else h = ((r - g) / d + 4) / 6;
        }
        return Math.round(h * 360);
    }

    // Helper: HSL to Hex
    hslToHex(h, s, l) {
        s /= 100; l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
        return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))} `;
    }


    /* --- Rendering --- */

    animate(time) {
        this.frameCounter++;

        // Update flight game physics (ALWAYS 60 FPS)
        if (this.flightMode) {
            try {
                // Safety Check: Avoid crashes if critical objects are missing
                if (!this.playerShip || !this.camera) return;

                this.checkAndGenerateSectors();
                this.playerManager.updatePlayerShip();
                this.playerManager.updateProjectiles();
                this.updateDamageParticles();
                this.updateMinerals();
                this.hazardManager.updateHazards();
                this.updateSpaceBase();
                this.combatManager.updateEnemyShips();
                this.combatManager.updateEnemyBullets();
                this.combatManager.updateBoss();

                // Update engine hum pitch based on ship speed
                const shipSpeed = Math.hypot(this.playerShip.vx || 0, this.playerShip.vy || 0);
                gameAudio.updateEngineHum(shipSpeed);

                if (this.activeMission && this.activeMission.type === 'survive') this.checkMissionComplete();
                if (this.activeMission && this.activeMission.type === 'collect') {
                    if (this.activeMission.baselineInventory === undefined) {
                        this.activeMission.baselineInventory = Object.values(this.playerInventory).reduce((a, b) => a + b, 0);
                    }
                    const totalNow = Object.values(this.playerInventory).reduce((a, b) => a + b, 0);
                    const delta = totalNow - this.activeMission.baselineInventory;
                    if (this.activeMission.progress !== delta) {
                        this.activeMission.progress = Math.max(0, delta);
                        this.hudManager.updateMissionHUD();
                        this.checkMissionComplete();
                    }
                }

                this.updateFlightHUD();

                // CAMERA FOLLOW: Ensure camera is centered on player ship
                this.camera.x = -this.playerShip.x * this.camera.zoom;
                this.camera.y = -this.playerShip.y * this.camera.zoom;

                // PASSIVE FLARE RECHARGE: 1 flare every 30 seconds
                const now = Date.now();
                if (this.playerShip.maxFlares > 0 && this.playerShip.flares < this.playerShip.maxFlares) {
                    if (!this.playerShip.lastFlareRefill) this.playerShip.lastFlareRefill = now;
                    if (now - this.playerShip.lastFlareRefill > 30000) {
                        this.playerShip.flares++;
                        this.playerShip.lastFlareRefill = now;
                        this.hudManager.showToast('🔥 Flare Recharged (Passive)');
                    }
                }
            } catch (e) {
                console.error('[Engine] Flight loop error:', e.message);
            }
        }

        // Update spacecraft positions
        if (this.spacecraft && this.spacecraft.length > 0) {
            const range = this.worldSize;
            const half = range / 2;
            this.spacecraft.forEach(s => {
                s.x += s.vx;
                s.y += s.vy;
                // Wrap around world bounds
                if (s.x > half) s.x = -half;
                if (s.x < -half) s.x = half;
                if (s.y > half) s.y = -half;
                if (s.y < -half) s.y = half;
            });
        }

        // Update shooting/moving stars positions
        if (this.shootingStars && this.shootingStars.length > 0) {
            const range = this.worldSize;
            const half = range / 2;
            this.shootingStars.forEach(s => {
                s.x += s.vx;
                s.y += s.vy;
                // Wrap around world bounds
                if (s.x > half) s.x = -half;
                if (s.x < -half) s.x = half;
                if (s.y > half) s.y = -half;
                if (s.y < -half) s.y = half;
            });
        }

        // Update static stars for Drift/Warp modes (with error handling)
        try {
            if ((this.bgDriftMode || this.bgWarpMode) && this.staticStars && this.staticStars.length > 0) {
                const w = this.canvas.width;
                const h = this.canvas.height;
                const centerX = w / 2;
                const centerY = h / 2;

                // Ramp warp speed - works during both engage (bgWarpMode) and disengage (warpDisengaging)
                if (this.bgWarpMode || this.warpDisengaging) {
                    // warpSpeedMultiplier is now linear (0.1 to 840)
                    const linearSlider = this.warpSpeedMultiplier || 1;
                    // Normalize to warp range (0 to 25.2) - TRIPLED max speed
                    const targetWarp = Math.min(25.2, linearSlider / 33);

                    const rampSpeed = 0.02; // Slightly faster ramp for responsiveness
                    this.warpSpeed = this.warpSpeed || 0;
                    this.warpSpeed += (targetWarp - this.warpSpeed) * rampSpeed;
                    // Cap to prevent runaway - TRIPLED max
                    this.warpSpeed = Math.min(this.warpSpeed, 25.2);
                    // Also cap minimum during disengage
                    if (this.warpSpeed < 0.01) this.warpSpeed = 0;
                }

                this.staticStars.forEach(s => {
                    // Safety: Ensure velocity properties exist
                    if (typeof s.vx !== 'number') s.vx = 0;
                    if (typeof s.vy !== 'number') s.vy = 0;
                    if (typeof s.baseAlpha !== 'number') s.baseAlpha = s.alpha || 0.5;

                    // Store original position if not yet stored (for warp start)
                    if (typeof s.origX !== 'number') s.origX = s.x;
                    if (typeof s.origY !== 'number') s.origY = s.y;

                    // Stars move during BOTH engage and disengage
                    if ((this.bgWarpMode || this.warpDisengaging) && !this.bgDriftMode) {
                        // LIGHTSPEED: Stars fly OUTWARD from center, accelerating
                        const dx = s.x - centerX;
                        const dy = s.y - centerY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // If exactly at center, give random direction
                        if (dist < 5) {
                            const angle = Math.random() * Math.PI * 2;
                            s.x = centerX + Math.cos(angle) * 20;
                            s.y = centerY + Math.sin(angle) * 20;
                            return;
                        }

                        // Direction outward from center with slight jitter at high speeds
                        const warpIntensity = (this.warpSpeed || 0);
                        // Add subtle angular wobble at high speeds for organic look
                        const jitterAmount = Math.min(0.08, warpIntensity * 0.003);
                        const jitterAngle = (Math.random() - 0.5) * jitterAmount;
                        const baseDirX = dist > 1 ? dx / dist : 0;
                        const baseDirY = dist > 1 ? dy / dist : 0;
                        // Apply rotation for jitter
                        const cosJ = Math.cos(jitterAngle);
                        const sinJ = Math.sin(jitterAngle);
                        const dirX = baseDirX * cosJ - baseDirY * sinJ;
                        const dirY = baseDirX * sinJ + baseDirY * cosJ;

                        // Speed varies by depth layer - creates parallax/3D feel
                        const depthFactor = s.depth || 0.5;
                        const perspectiveAccel = 1 + (dist / Math.max(w, h)) * 1.2;
                        // Deeper stars move faster, creates sense of passing through field
                        const speed = warpIntensity * perspectiveAccel * 10.5 * depthFactor;

                        // Move star outward
                        s.x += dirX * speed;
                        s.y += dirY * speed;

                        // Respawn from center when star goes off screen
                        const maxDist = Math.max(w, h) * 0.9;
                        if (dist > maxDist || s.x < -50 || s.x > w + 50 || s.y < -50 || s.y > h + 50) {
                            // Respawn with wider random distance spread
                            const angle = Math.random() * Math.PI * 2;
                            // More variation in spawn distance for staggered arrivals
                            const startDist = 3 + Math.random() * Math.random() * 80;
                            s.x = centerX + Math.cos(angle) * startDist;
                            s.y = centerY + Math.sin(angle) * startDist;
                            s.alpha = 0.05; // Start very faint
                            // Randomize depth on respawn for variety
                            s.depth = 0.3 + Math.random() * 0.7;
                            s.size = (Math.random() * 1.5 + 0.5) * s.depth;
                        } else {
                            // Fade in as star moves outward, faster fade for deeper stars
                            const fadeRate = 0.6 + depthFactor * 0.4;
                            s.alpha = Math.min(1, 0.15 + (dist / maxDist) * 0.85 * fadeRate);
                        }
                    } else if (this.bgDriftMode && !this.bgWarpMode) {
                        // Drift: Subtle but noticeable movement
                        s.x += s.vx * 0.03;
                        s.y += s.vy * 0.03;

                        // Wrap around screen
                        if (s.x < -w * 5) s.x += w * 10;
                        if (s.x > w * 5) s.x -= w * 10;
                        if (s.y < -h * 5) s.y += h * 10;
                        if (s.y > h * 5) s.y -= h * 10;
                    }
                });
            }
        } catch (e) {
            console.error('[BG Error] Static star animation failed:', e);
            // Fail silently to prevent crash loop
        }

        // === WARP FLYOUT/FLYIN: Move background objects ===
        // IMPORTANT: Objects use WORLD coordinates with (0,0) at world center
        // Camera transform places world (0,0) at screen center
        if (this.bgWarpMode || this.warpDisengaging) {
            try {
                const w = this.canvas.width;
                const h = this.canvas.height;
                // SCREEN CENTER in WORLD coordinates - this is where light rays emanate from
                // Safety: ensure camera exists
                const camera = this.camera || { x: 0, y: 0, zoom: 1 };
                const zoom = camera.zoom || 1;
                const screenCenterWorldX = -(camera.x || 0) / zoom;
                const screenCenterWorldY = -(camera.y || 0) / zoom;
                // Max distance before object is "off screen" in world coords
                const maxWorldDist = this.worldSize * 2;
                // Use the SAME warpIntensity as static stars for synchronized motion
                const warpIntensity = this.warpSpeed || 0;
                const isDisengaging = this.warpDisengaging;

                // Helper to fly an object using WORLD coordinates
                const flyObject = (obj, speedMultiplier = 1, maxSpread = 2000) => {
                    if (!obj) return;

                    if (isDisengaging) {
                        // === DISENGAGE: Objects appear at random positions and gradually decelerate ===
                        // Matches light ray deceleration - gradual slowdown as we exit lightspeed

                        // CRITICAL: Reset flownOut so object renders during disengage
                        obj.flownOut = false;

                        // Initialize on first frame of disengage
                        if (!obj.disengageInit) {
                            // Assign random final position around screen
                            // Some close (fly by), some in distance
                            const angle = Math.random() * Math.PI * 2;
                            const distance = 200 + Math.random() * maxSpread;
                            const depth = 0.3 + Math.random() * 1.4; // 0.3 to 1.7 depth factor

                            obj.finalX = screenCenterWorldX + Math.cos(angle) * distance;
                            obj.finalY = screenCenterWorldY + Math.sin(angle) * distance;
                            obj.depth = depth; // Closer objects move faster

                            // Start position: exact center (simulating vanishing point)
                            // This creates the effect of objects spawning from a single point
                            obj.startX = screenCenterWorldX;
                            obj.startY = screenCenterWorldY;

                            // Reset scale/alpha for emergence
                            obj.warpScale = 0.01;
                            obj.warpAlpha = 0;

                            obj.disengageInit = true;
                        }

                        // Use SAME progress calculation as light ray deceleration (warpSpeed-based)
                        // This synchronizes object movement with light ray shortening
                        const maxWarp = 25;
                        const currentWarp = warpIntensity || 0;
                        // Progress: 0 = full warp, 1 = stopped
                        const progress = 1 - Math.min(1, currentWarp / maxWarp);

                        // Position: LINEAR interpolation synced with warp
                        // Objects move at same rate as stars slow down
                        obj.x = obj.startX + (obj.finalX - obj.startX) * progress;
                        obj.y = obj.startY + (obj.finalY - obj.startY) * progress;

                        // Scale: EXPONENTIAL (Perspective-like)
                        // Objects stay small in distance, then loom large on arrival
                        // Cubic easing (t*t*t) simulates Z-axis approach better than linear
                        const ease = progress * progress * progress;
                        obj.warpScale = 0.01 + ease * 0.99; // Target 1.0 strictly (Depth handled by size)
                        obj.warpScale = Math.min(1, Math.max(0.01, obj.warpScale));

                        // Alpha: Stay INVISIBLE behind light for first 35% of animation
                        // Then fade in gradually, reaching full opacity when warp stops
                        const alphaDelay = 0.35; // 35% - stay behind light longer
                        const alphaProgress = Math.max(0, (progress - alphaDelay) / (1 - alphaDelay));
                        obj.warpAlpha = alphaProgress; // Linear fade to 1.0 (draw loop handles base alpha)

                        return; // Don't continue to engage logic

                    } else {
                        // === ENGAGE: Fly RADIALLY OUTWARD from SCREEN center ===
                        // Account for zoom level - objects at higher zoom should fly faster
                        if (obj.flownOut) return;

                        // Direction is from SCREEN CENTER outward (not world center)
                        const dx = obj.x - screenCenterWorldX;
                        const dy = obj.y - screenCenterWorldY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // If exactly at center, give random direction
                        if (dist < 5) {
                            const angle = Math.random() * Math.PI * 2;
                            obj.x += Math.cos(angle) * 20;
                            obj.y += Math.sin(angle) * 20;
                            return;
                        }

                        // Normalize for radial outward direction
                        const dirX = dx / dist;
                        const dirY = dy / dist;

                        // ZOOM COMPENSATION: Objects at higher zoom need to move faster
                        // to appear to leave the screen at the same visual rate
                        const zoomFactor = 1 / (this.camera.zoom || 1);

                        const perspectiveAccel = 1 + (dist / this.worldSize) * 1.2;
                        const depth = obj.depth || 0.5;
                        const engageSpeedFactor = 4.0;
                        const speed = warpIntensity * perspectiveAccel * 10.5 * depth * speedMultiplier * engageSpeedFactor * zoomFactor;

                        // Move radially outward from world center
                        obj.x += dirX * speed;
                        obj.y += dirY * speed;

                        // Mark as flown out when far from world center
                        // ONLY trigger this if we are actually at warp (lights-peed)
                        // This prevents objects from disappearing during normal slow flight
                        if (dist > maxWorldDist && this.bgWarpMode) {
                            obj.flownOut = true;
                            obj.wasFlownOut = true; // Track for disengage reset
                        }
                    }
                };

                // Apply to all object types - different depths create parallax
                // Assign typeIndex for golden ratio distribution (avoids ring patterns)
                let globalIndex = 0;
                if (this.planets) this.planets.forEach((p, i) => {
                    p.depth = p.depth || 0.6;
                    p.typeIndex = globalIndex++;
                    flyObject(p, 0.8, 3000);
                });
                if (this.galaxies) this.galaxies.forEach((g, i) => {
                    g.depth = g.depth || 0.4;
                    g.typeIndex = globalIndex++;
                    flyObject(g, 0.5, 5000);
                });
                if (this.blackHoles) this.blackHoles.forEach((bh, i) => {
                    bh.depth = bh.depth || 0.3;
                    bh.typeIndex = globalIndex++;
                    flyObject(bh, 0.4, 4000);
                });
                if (this.nebulae) this.nebulae.forEach((n, i) => {
                    n.depth = n.depth || 0.5;
                    n.typeIndex = globalIndex++;
                    flyObject(n, 0.6, 4000);
                });
                if (this.spacecraft) this.spacecraft.forEach((s, i) => {
                    s.depth = s.depth || 0.8;
                    s.typeIndex = globalIndex++;
                    flyObject(s, 1.2, 2000);
                });
                // User-placed stars
                if (this.stars && this.stars.length > 0) {
                    this.stars.forEach((star, i) => {
                        star.depth = star.depth || 0.7;
                        star.typeIndex = globalIndex++;
                        flyObject(star, 0.9, 2500);
                    });
                }
            } catch (e) {
                console.error('[WARP] Animation error:', e);
            }
        }

        try {
            this.renderManager.draw(time);
        } catch (e) {
            console.error('FATAL RENDER ERROR:', e);
            if (this.showToast) this.hudManager.showToast("⚠️ FATAL ENGINE ERROR: " + e.message, 10000);
            if (this.ctx && this.canvas) {
                this.ctx.save();
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
                this.ctx.fillRect(0, 0, this.canvas.width, 50);
                this.ctx.fillStyle = 'white';
                this.ctx.font = '16px monospace';
                this.ctx.fillText("CRASH LOG: " + e.message, 20, 30);
                this.ctx.restore();
            }
        }
        requestAnimationFrame(this.animate);
    }


    renderSpeedLines(ctx) {
        this.speedLines.forEach(line => {
            ctx.save();
            ctx.translate(line.x, line.y);

            ctx.globalAlpha = line.life * 0.5;
            ctx.strokeStyle = '#88ccff';
            ctx.lineWidth = 2 / this.camera.zoom;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-line.vx * 3, -line.vy * 3);
            ctx.stroke();

            ctx.globalAlpha = 1;
            ctx.restore();
        });
    }

    renderPlayerShip(ctx, time) {
        const ship = this.playerShip;
        if (!ship) return;

        // Hide ship during intense hazard effects
        if (this.hazardEffect) {
            const h = this.hazardEffect;
            if (h.flashIntensity > 0.15 && h.type !== 'missile_hit') return;
            if (h.type === 'player_death' && h.phase === 'whiteout') return;
            if (h.type === 'supernova' && h.phase !== 'reset') return;
            if (h.type === 'missile_base_destruction' && ['explosion', 'eruption', 'whiteout'].includes(h.phase)) return;
            if (h.type === 'planet_impact' && h.progress < 0.3) return;
        }

        const safeZoom = Math.max(0.01, this.camera.zoom || 1);
        const size = 45 / safeZoom; // Base ship size (un-scales with zoom for visibility)
        const shipType = ship.type || 'interceptor';
        const shipColor = ship.color || '#00f3ff';
        const pitch = ship.pitch || 0;
        const pitchScale = Math.cos(pitch);

        ctx.save();

        // SPECTRE CLOAK: Transparent ship
        if (ship.isCloaked && ship.type === 'spectre') {
            ctx.globalAlpha = 0.3;
        }

        // World position translation
        ctx.translate(ship.x, ship.y);

        // Base rotation (yaw)
        ctx.rotate(ship.rotation);

        // 3D roll rotation (barrel roll)
        const roll = ship.roll || 0;
        ctx.rotate(roll);

        switch (shipType) {
            case 'saucer':
                this.drawSaucer(ctx, size, shipColor, pitchScale, time);
                break;
            case 'hauler':
                this.drawHauler(ctx, size, shipColor, pitchScale, time);
                break;
            case 'orion':
                this.drawOrion(ctx, size * 0.8, shipColor, pitch, pitchScale); // Orion model fix: slight scaling for detail
                break;
            case 'draco':
                this.drawDraco(ctx, size, shipColor, pitchScale, time);
                break;
            case 'phoenix':
                this.drawPhoenix(ctx, size, shipColor, pitchScale, time);
                break;
            case 'harvester':
                this.drawHarvester(ctx, size, shipColor, pitchScale, time);
                break;
            case 'interceptor':
                this.drawInterceptor(ctx, size, shipColor, pitchScale);
                break;
            case 'viper': this.drawViper(ctx, size, shipColor, pitchScale, time); break;
            case 'bulwark': this.drawBulwark(ctx, size, shipColor, pitchScale, time); break;
            case 'prospector': this.drawProspector(ctx, size, shipColor, pitchScale, time); break;
            case 'spectre': this.drawSpectre(ctx, size, shipColor, pitchScale, time); break;
            case 'nova': this.drawNova(ctx, size, shipColor, pitchScale, time); break;
            case 'siphon': this.drawSiphon(ctx, size, shipColor, pitchScale, time); break;
            case 'titan': this.drawTitan(ctx, size, shipColor, pitchScale, time); break;
            case 'pulse': this.drawPulse(ctx, size, shipColor, pitchScale, time); break;
            case 'flux': this.drawFlux(ctx, size, shipColor, pitchScale, time); break;
            case 'apex': this.drawApex(ctx, size, shipColor, pitchScale, time); break;
            default:
                this.drawInterceptor(ctx, size, shipColor, pitchScale);
                break;
        }

        ctx.restore();
    }

    drawSaucer(ctx, size, shipColor, pitchScale, time) {
        // Classic flying saucer
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        ctx.rotate(Math.PI / 2); // Rotate 90 degrees to face sideways like other ships

        // Base
        ctx.strokeStyle = this.adjustColor(shipColor, -30);
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
        ctx.fillStyle = shipColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Dome
        ctx.fillStyle = this.adjustColor(shipColor, 50); // Lighter for dome
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.15, size * 0.5, size * 0.35, 0, Math.PI, 0);
        ctx.fill();

        // Lights around edge
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + (time || Date.now()) * 0.005;
            ctx.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.3, size * 0.08, 0, Math.PI * 2);
            ctx.fill();
        }

        // Muzzle Flash (Front/Right edge) - adjusted target since ship is rotated
        if (this.playerShip && this.playerShip.muzzleFlash) {
            this.drawMuzzleFlash(ctx, 0, size * 0.8, size * 0.6, '#00ff00', this.playerShip.muzzleFlash);
        }
        ctx.restore();
    }

    drawHauler(ctx, size, shipColor, pitchScale, time) {
        // MAULER - Death Star inspired battle station
        ctx.save();
        ctx.scale(1, pitchScale || 1);

        const maulerSize = size * 1.4;

        // Draw Debris Trails (Underneath ship) - only in game
        if (this.playerShip && this.maulerDebris && this.maulerDebris.length > 0) {
            this.maulerDebris.forEach(p => {
                ctx.save();
                const dx = p.x - this.playerShip.x;
                const dy = p.y - this.playerShip.y;

                ctx.globalAlpha = p.detached ? p.life : 0.8;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(dx, dy, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        // Main sphere body with gradient
        const sphereGrad = ctx.createRadialGradient(
            -maulerSize * 0.3, -maulerSize * 0.3, 0,
            0, 0, maulerSize
        );
        sphereGrad.addColorStop(0, this.adjustColor(shipColor, 40));
        sphereGrad.addColorStop(0.5, shipColor);
        sphereGrad.addColorStop(0.8, this.adjustColor(shipColor, -40));
        sphereGrad.addColorStop(1, this.adjustColor(shipColor, -80));

        ctx.fillStyle = sphereGrad;
        ctx.strokeStyle = this.adjustColor(shipColor, -60);
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.arc(0, 0, maulerSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Superlaser dish (concave depression) - top right
        const dishX = maulerSize * 0.4;
        const dishY = -maulerSize * 0.3;
        const dishRadius = maulerSize * 0.35;

        // Dish shadow/depth
        const dishGrad = ctx.createRadialGradient(
            dishX, dishY, 0,
            dishX, dishY, dishRadius
        );
        dishGrad.addColorStop(0, this.adjustColor(shipColor, -100));
        dishGrad.addColorStop(0.6, this.adjustColor(shipColor, -60));
        dishGrad.addColorStop(1, this.adjustColor(shipColor, -30));
        ctx.fillStyle = dishGrad;
        ctx.beginPath();
        ctx.arc(dishX, dishY, dishRadius, 0, Math.PI * 2);
        ctx.fill();

        // Dish ring detail
        ctx.strokeStyle = this.adjustColor(shipColor, -40);
        ctx.lineWidth = 1.5 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.arc(dishX, dishY, dishRadius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(dishX, dishY, dishRadius * 0.4, 0, Math.PI * 2);
        ctx.stroke();

        // Superlaser core - pulsing green/red energy
        const laserPulse = 0.5 + Math.sin((time || Date.now()) * 0.006) * 0.5;
        // Flash override
        const flash = (this.playerShip && this.playerShip.muzzleFlash) || 0;

        ctx.fillStyle = flash > 0 ? '#ccffcc' : `rgba(0, 255, 100, ${laserPulse})`;
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 15 + flash * 20;
        ctx.beginPath();
        ctx.arc(dishX, dishY, dishRadius * 0.15 + flash * dishRadius * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Muzzle Flash Effect (Superlaser beam start)
        if (flash > 0) {
            this.drawMuzzleFlash(ctx, dishX, dishY, maulerSize * 0.6, '#00ff00', flash);
        }

        // Equatorial trench
        ctx.strokeStyle = this.adjustColor(shipColor, -50);
        ctx.lineWidth = 3 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.ellipse(0, 0, maulerSize, maulerSize * 0.15, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Rear Engines
        this.drawEngineFlame(ctx, -maulerSize * 0.9, -maulerSize * 0.4, maulerSize * 0.15, '#ff4400', (time || Date.now()));
        this.drawEngineFlame(ctx, -maulerSize * 0.9, maulerSize * 0.4, maulerSize * 0.15, '#ff4400', (time || Date.now()));
        ctx.restore();
    }

    drawOrion(ctx, size, shipColor, pitch, pitchScale) {
        // Check for Custom Constellation Structure
        if (this.playerShip && this.playerShip.customStructure && this.playerShip.customStructure.stars) {
            const struct = this.playerShip.customStructure;
            const stars = struct.stars;
            const lines = struct.lines;

            // Pitch is handled by projecting Y/Z
            const cosX = Math.cos(pitch);
            const sinX = Math.sin(pitch);

            // Project Points
            const projected = stars.map(s => {
                // Rotate around X (Pitch)
                let y = s.y * cosX - s.z * sinX;
                let z = s.y * sinX + s.z * cosX;
                let x = s.x;

                // Simple perspective projection
                const fov = 300;
                const scale = fov / (fov + z); // Perspective scale

                return {
                    x: x * scale,
                    y: y * scale,
                    visible: z < 200 // Clip behind
                };
            });

            // Draw Lines
            ctx.beginPath();
            ctx.strokeStyle = this.adjustColor(shipColor, 20);
            ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
            if (lines) {
                lines.forEach(l => {
                    const p1 = projected[l.fromIndex];
                    const p2 = projected[l.toIndex];
                    if (p1 && p2 && p1.visible && p2.visible) {
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                    }
                });
            }
            ctx.stroke();

            // Draw Stars
            projected.forEach((p, i) => {
                if (!p.visible) return;
                ctx.fillStyle = stars[i].color || shipColor;
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(1, size * 0.15), 0, Math.PI * 2);
                ctx.fill();
            });

        } else {
            // Default Fallback (Star Shape)
            ctx.save();
            ctx.scale(1, pitchScale || 1);
            ctx.fillStyle = shipColor;
            ctx.strokeStyle = '#aaddff';
            ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
            // Main star shape
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const outerAngle = (i * Math.PI * 2 / 5) - Math.PI / 2;
                const innerAngle = outerAngle + Math.PI / 5;
                const outerX = Math.cos(outerAngle) * size;
                const outerY = Math.sin(outerAngle) * size;
                const innerX = Math.cos(innerAngle) * size * 0.4;
                const innerY = Math.sin(innerAngle) * size * 0.4;
                if (i === 0) ctx.moveTo(outerX, outerY);
                else ctx.lineTo(outerX, outerY);
                ctx.lineTo(innerX, innerY);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Glowing core
            ctx.fillStyle = '#00ccff';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
            ctx.fill();

            // Tail Engine
            this.drawEngineFlame(ctx, -size * 0.8, 0, size * 0.2, '#00ccff', Date.now());

            // Muzzle Flash (Center)
            if (this.playerShip && this.playerShip.muzzleFlash) {
                this.drawMuzzleFlash(ctx, 0, 0, size * 0.8, '#00ccff', this.playerShip.muzzleFlash);
            }
            ctx.restore();
        }
    }

    drawDraco(ctx, size, shipColor, pitchScale, time) {
        // DRACO - Swept-wing aerodynamic chassis with glowing energy veins
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.003;

        // Shadow/Underbelly
        ctx.fillStyle = this.adjustColor(shipColor, -70);
        ctx.beginPath();
        ctx.moveTo(size * 0.8, 0);
        ctx.bezierCurveTo(size * 0.2, -size * 0.4, -size * 0.4, -size * 0.7, -size * 0.8, -size * 0.2);
        ctx.bezierCurveTo(-size * 0.5, 0, -size * 0.5, 0, -size * 0.8, size * 0.2);
        ctx.bezierCurveTo(-size * 0.4, size * 0.7, size * 0.2, size * 0.4, size * 0.8, 0);
        ctx.fill();

        // Main Hull (Top plates)
        ctx.fillStyle = shipColor;
        ctx.strokeStyle = this.adjustColor(shipColor, 40);
        ctx.lineWidth = 1.5 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.moveTo(size * 1.1, 0);
        ctx.bezierCurveTo(size * 0.3, -size * 0.3, -size * 0.2, -size * 0.6, -size * 0.6, -size * 0.8);
        ctx.bezierCurveTo(-size * 0.3, -size * 0.2, -size * 0.3, size * 0.2, -size * 0.6, size * 0.8);
        ctx.bezierCurveTo(-size * 0.2, size * 0.6, size * 0.3, size * 0.3, size * 1.1, 0);
        ctx.fill();
        ctx.stroke();

        // Energy Veins
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2.5 / (this.camera ? this.camera.zoom : 1);
        ctx.globalAlpha = 0.6 + Math.sin(t * 2) * 0.4;
        ctx.beginPath();
        ctx.moveTo(size * 0.5, 0);
        ctx.quadraticCurveTo(0, -size * 0.2, -size * 0.4, -size * 0.5);
        ctx.moveTo(size * 0.5, 0);
        ctx.quadraticCurveTo(0, size * 0.2, -size * 0.4, size * 0.5);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Engines
        this.drawEngineFlame(ctx, -size * 0.6, -size * 0.3, size * 0.4, '#00ffcc', time);
        this.drawEngineFlame(ctx, -size * 0.6, size * 0.3, size * 0.4, '#00ffcc', time);

        // Muzzle Flash
        if (this.playerShip && this.playerShip.muzzleFlash) {
            this.drawMuzzleFlash(ctx, size * 1.1, 0, size * 0.8, '#00ffcc', this.playerShip.muzzleFlash);
        }
        ctx.restore();
    }

    drawPhoenix(ctx, size, shipColor, pitchScale, time) {
        // PHOENIX - Majestic fiery bird spacecraft
        ctx.save();
        ctx.scale(1, pitchScale || 1);

        // Flame trail effect behind ship
        const flamePulse = 0.5 + Math.sin((time || Date.now()) * 0.008) * 0.3;
        const flameGrad = ctx.createLinearGradient(-size * 1.5, 0, -size * 0.5, 0);
        flameGrad.addColorStop(0, 'transparent');
        flameGrad.addColorStop(0.3, `rgba(255, 100, 0, ${flamePulse * 0.3})`);
        flameGrad.addColorStop(0.7, `rgba(255, 200, 0, ${flamePulse * 0.6})`);
        flameGrad.addColorStop(1, this.adjustColor(shipColor, 40));
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(-size * 0.5, 0);
        ctx.quadraticCurveTo(-size * 1.2, size * 0.2, -size * 1.6, size * 0.1);
        ctx.quadraticCurveTo(-size * 1.3, 0, -size * 1.6, -size * 0.1);
        ctx.quadraticCurveTo(-size * 1.2, -size * 0.2, -size * 0.5, 0);
        ctx.fill();

        // Main body - sleek elongated fuselage
        ctx.fillStyle = shipColor;
        ctx.strokeStyle = this.adjustColor(shipColor, 40);
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.moveTo(size * 0.9, 0);
        ctx.quadraticCurveTo(size * 0.7, -size * 0.15, size * 0.3, -size * 0.12);
        ctx.lineTo(-size * 0.4, -size * 0.1);
        ctx.quadraticCurveTo(-size * 0.6, 0, -size * 0.4, size * 0.1);
        ctx.lineTo(size * 0.3, size * 0.12);
        ctx.quadraticCurveTo(size * 0.7, size * 0.15, size * 0.9, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // [Wings and other details simplified for length in this description]
        // Upper wing
        ctx.fillStyle = this.adjustColor(shipColor, -20);
        ctx.beginPath();
        ctx.moveTo(size * 0.1, -size * 0.1);
        ctx.quadraticCurveTo(size * 0.3, -size * 0.5, -size * 0.1, -size * 0.85);
        ctx.lineTo(-size * 0.3, -size * 0.7);
        ctx.quadraticCurveTo(-size * 0.1, -size * 0.4, -size * 0.3, -size * 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Lower wing
        ctx.beginPath();
        ctx.moveTo(size * 0.1, size * 0.1);
        ctx.quadraticCurveTo(size * 0.3, size * 0.5, -size * 0.1, size * 0.85);
        ctx.lineTo(-size * 0.3, size * 0.7);
        ctx.quadraticCurveTo(-size * 0.1, size * 0.4, -size * 0.3, size * 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cockpit dome
        const cockpitGrad = ctx.createRadialGradient(size * 0.35, 0, 0, size * 0.35, 0, size * 0.15);
        cockpitGrad.addColorStop(0, '#ffffff');
        cockpitGrad.addColorStop(0.4, this.adjustColor(shipColor, 80));
        cockpitGrad.addColorStop(1, this.adjustColor(shipColor, 30));
        ctx.fillStyle = cockpitGrad;
        ctx.beginPath();
        ctx.ellipse(size * 0.35, 0, size * 0.12, size * 0.08, 0, 0, Math.PI * 2);
        ctx.fill();

        // Muzzle Flash (Nose tip)
        if (this.playerShip && this.playerShip.muzzleFlash) {
            this.drawMuzzleFlash(ctx, size * 0.95, 0, size * 0.7, '#ffaa00', this.playerShip.muzzleFlash);
        }
        ctx.restore();
    }

    drawHarvester(ctx, size, shipColor, pitchScale, time) {
        // STARFIGHTER - Tie-fighter inspired design
        ctx.save();
        ctx.rotate(Math.PI / 2);
        ctx.scale(1, pitchScale || 1);

        // Left hexagonal panel
        ctx.fillStyle = shipColor;
        ctx.strokeStyle = this.adjustColor(shipColor, -40);
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = -size * 1.2 + Math.cos(angle) * size * 0.4;
            const y = Math.sin(angle) * size * 0.6;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right hexagonal panel
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = size * 1.2 + Math.cos(angle) * size * 0.4;
            const y = Math.sin(angle) * size * 0.6;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Central cockpit pod
        ctx.fillStyle = this.adjustColor(shipColor, -60);
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.3, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Muzzle Flash
        if (this.playerShip && this.playerShip.muzzleFlash) {
            this.drawMuzzleFlash(ctx, size * 0.6, size * 0.4, size * 0.4, '#ff0000', this.playerShip.muzzleFlash);
            this.drawMuzzleFlash(ctx, size * 0.6, -size * 0.4, size * 0.4, '#ff0000', this.playerShip.muzzleFlash);
        }

        // Connecting struts
        ctx.strokeStyle = this.adjustColor(shipColor, -80);
        ctx.lineWidth = 3 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.moveTo(-size * 0.3, 0);
        ctx.lineTo(-size * 0.8, 0);
        ctx.moveTo(size * 0.3, 0);
        ctx.lineTo(size * 0.8, 0);
        ctx.stroke();

        // Engine glow
        const hPulse = 0.3 + Math.sin((time || Date.now()) * 0.005) * 0.2;
        ctx.fillStyle = `rgba(255, 150, 50, ${hPulse})`;
        ctx.beginPath();
        ctx.arc(-size * 1.2, 0, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(size * 1.2, 0, size * 0.15, 0, Math.PI * 2);
        ctx.fill();

        this.drawEngineFlame(ctx, -size * 0.3, 0, size * 0.2, '#00ffcc', (time || Date.now()));
        ctx.restore();
    }

    drawInterceptor(ctx, size, shipColor, pitchScale) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        ctx.fillStyle = shipColor;
        ctx.strokeStyle = this.adjustColor(shipColor, -40);
        ctx.lineWidth = 3 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.moveTo(size, 0);
        ctx.lineTo(-size * 0.6, -size * 0.6);
        ctx.lineTo(-size * 0.4, 0);
        ctx.lineTo(-size * 0.6, size * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        this.drawEngineFlame(ctx, -size * 0.5, 0, size * 0.3, '#ff6600', Date.now());

        if (this.playerShip && this.playerShip.muzzleFlash) {
            this.drawMuzzleFlash(ctx, size, 0, size * 0.8, '#00ffff', this.playerShip.muzzleFlash);
        }
        ctx.restore();
    }

    drawViper(ctx, size, shipColor, pitchScale, time) {
        // VIPER - Aggressive, forward-swept segmented wings
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.005;

        // Core Fuselage
        ctx.fillStyle = this.adjustColor(shipColor, -50);
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        ctx.moveTo(size * 1.4, 0); // Sharp needle nose
        ctx.lineTo(size * 0.4, -size * 0.15);
        ctx.lineTo(-size * 0.5, -size * 0.2);
        ctx.lineTo(-size * 0.5, size * 0.2);
        ctx.lineTo(size * 0.4, size * 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Forward-swept segmented wings
        ctx.fillStyle = shipColor;
        // Left Wing
        ctx.beginPath();
        ctx.moveTo(size * 0.2, -size * 0.15);
        ctx.lineTo(size * 0.5, -size * 0.8);
        ctx.lineTo(-size * 0.2, -size * 0.9);
        ctx.lineTo(-size * 0.4, -size * 0.2);
        ctx.fill();
        ctx.stroke();
        // Right Wing
        ctx.beginPath();
        ctx.moveTo(size * 0.2, size * 0.15);
        ctx.lineTo(size * 0.5, size * 0.8);
        ctx.lineTo(-size * 0.2, size * 0.9);
        ctx.lineTo(-size * 0.4, size * 0.2);
        ctx.fill();
        ctx.stroke();

        // Glowing Thruster Ports built into fuselage
        ctx.fillStyle = '#00ffff';
        ctx.globalAlpha = 0.7 + Math.sin(t * 3) * 0.3;
        ctx.beginPath(); ctx.ellipse(-size * 0.2, -size * 0.3, size * 0.2, size * 0.05, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-size * 0.2, size * 0.3, size * 0.2, size * 0.05, 0, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1.0;

        // Main Engines
        this.drawEngineFlame(ctx, -size * 0.5, -size * 0.1, size * 0.5, '#00f3ff', time);
        this.drawEngineFlame(ctx, -size * 0.5, size * 0.1, size * 0.5, '#00f3ff', time);
        ctx.restore();
    }

    drawBulwark(ctx, size, shipColor, pitchScale, time) {
        // BULWARK - Flying Fortress, hexagonal plates, orbiting shield struts
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.002;

        // Base heavy chassis
        ctx.fillStyle = this.adjustColor(shipColor, -60);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);

        // Draw interlocking hexagons
        const drawHex = (cx, cy, r) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = i * Math.PI / 3;
                if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
                else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
            }
            ctx.closePath();
            ctx.fill(); ctx.stroke();
        };

        drawHex(0, 0, size * 0.8);
        drawHex(size * 0.4, 0, size * 0.6);
        drawHex(-size * 0.3, -size * 0.4, size * 0.5);
        drawHex(-size * 0.3, size * 0.4, size * 0.5);

        // Core Energy
        ctx.fillStyle = '#ff8800';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff8800';
        ctx.beginPath(); ctx.arc(size * 0.2, 0, size * 0.2, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Orbiting Shield Struts
        ctx.strokeStyle = '#ffbb00';
        ctx.lineWidth = 3 / (this.camera ? this.camera.zoom : 1);
        for (let i = 0; i < 3; i++) {
            const angle = t + (i * Math.PI * 2 / 3);
            const r = size * 1.1;
            const sx = Math.cos(angle) * r;
            const sy = Math.sin(angle) * r;
            ctx.beginPath();
            ctx.arc(sx, sy, size * 0.1, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = shipColor;
            ctx.fill();
            // Connect to core
            ctx.globalAlpha = 0.3;
            ctx.beginPath(); ctx.moveTo(size * 0.2, 0); ctx.lineTo(sx, sy); ctx.stroke();
            ctx.globalAlpha = 1.0;
        }

        this.drawEngineFlame(ctx, -size * 0.8, 0, size * 0.7, '#ff8800', time);
        ctx.restore();
    }

    drawProspector(ctx, size, shipColor, pitchScale, time) {
        // PROSPECTOR - Industrial, utility arms, glowing hoppers
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.005;

        // Main blocky chassis
        ctx.fillStyle = this.adjustColor(shipColor, -40);
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 3 / (this.camera ? this.camera.zoom : 1);
        ctx.fillRect(-size * 0.6, -size * 0.5, size * 1.0, size * 1.0);
        ctx.strokeRect(-size * 0.6, -size * 0.5, size * 1.0, size * 1.0);

        // Cockpit canopy (front off-center)
        ctx.fillStyle = '#111111';
        ctx.fillRect(size * 0.4, -size * 0.2, size * 0.3, size * 0.4);

        // Glowing Hoppers (Cargo)
        const cargoGlow = 0.5 + Math.sin(t) * 0.5;
        ctx.fillStyle = `rgba(255, 215, 0, ${cargoGlow})`;
        ctx.fillRect(-size * 0.3, -size * 0.4, size * 0.4, size * 0.3);
        ctx.fillRect(-size * 0.3, size * 0.1, size * 0.4, size * 0.3);

        ctx.strokeStyle = shipColor;
        ctx.strokeRect(-size * 0.3, -size * 0.4, size * 0.4, size * 0.3);
        ctx.strokeRect(-size * 0.3, size * 0.1, size * 0.4, size * 0.3);

        // Utility Arms (extending forward)
        ctx.strokeStyle = this.adjustColor(shipColor, -20);
        ctx.lineWidth = 6 / (this.camera ? this.camera.zoom : 1);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Arm 1
        ctx.beginPath();
        ctx.moveTo(size * 0.2, -size * 0.6);
        ctx.lineTo(size * 0.8, -size * 0.8);
        ctx.lineTo(size * 1.2, -size * 0.4);
        ctx.stroke();
        // Claw 1
        ctx.fillStyle = shipColor;
        ctx.beginPath(); ctx.arc(size * 1.2, -size * 0.4, size * 0.15, 0, Math.PI * 2); ctx.fill();

        // Arm 2
        ctx.beginPath();
        ctx.moveTo(size * 0.2, size * 0.6);
        ctx.lineTo(size * 0.8, size * 0.8);
        ctx.lineTo(size * 1.2, size * 0.4);
        ctx.stroke();
        // Claw 2
        ctx.beginPath(); ctx.arc(size * 1.2, size * 0.4, size * 0.15, 0, Math.PI * 2); ctx.fill();

        // Main Engines (heavy industrial)
        this.drawEngineFlame(ctx, -size * 0.7, -size * 0.3, size * 0.4, '#ffd700', time);
        this.drawEngineFlame(ctx, -size * 0.7, size * 0.3, size * 0.4, '#ffd700', time);
        ctx.restore();
    }

    drawSpectre(ctx, size, shipColor, pitchScale, time) {
        // SPECTRE - Faceted stealth geometry, neon edges
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.004;

        // Stealth Cloak Effect (opacity pulses)
        ctx.globalAlpha = 0.8 + Math.sin(t) * 0.2;

        // Dark, radar-absorbing hull
        ctx.fillStyle = '#0a0a0c';
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 1.5 / (this.camera ? this.camera.zoom : 1);
        ctx.shadowBlur = 10;
        ctx.shadowColor = shipColor;

        // Faceted Central Body
        ctx.beginPath();
        ctx.moveTo(size * 1.2, 0); // Sharp nose
        ctx.lineTo(size * 0.4, -size * 0.2);
        ctx.lineTo(-size * 0.5, -size * 0.3);
        ctx.lineTo(-size * 0.3, 0); // Inner V
        ctx.lineTo(-size * 0.5, size * 0.3);
        ctx.lineTo(size * 0.4, size * 0.2);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // Faceted Wings (Outer)
        ctx.beginPath();
        ctx.moveTo(size * 0.2, -size * 0.15);
        ctx.lineTo(-size * 0.4, -size * 0.9);
        ctx.lineTo(-size * 0.8, -size * 0.9);
        ctx.lineTo(-size * 0.5, -size * 0.3);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(size * 0.2, size * 0.15);
        ctx.lineTo(-size * 0.4, size * 0.9);
        ctx.lineTo(-size * 0.8, size * 0.9);
        ctx.lineTo(-size * 0.5, size * 0.3);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.shadowBlur = 0; // Reset
        ctx.globalAlpha = 1.0;

        // Hidden Engines (slit thrusters)
        this.drawEngineFlame(ctx, -size * 0.4, -size * 0.1, size * 0.3, '#7700ff', time);
        this.drawEngineFlame(ctx, -size * 0.4, size * 0.1, size * 0.3, '#7700ff', time);
        ctx.restore();
    }

    drawNova(ctx, size, shipColor, pitchScale, time) {
        // NOVA - Floating rotating core and rings
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.002;

        // Super-dense Glowing Core
        const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8);
        coreGlow.addColorStop(0, '#ffffff');
        coreGlow.addColorStop(0.3, shipColor);
        coreGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = coreGlow;
        ctx.beginPath(); ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2); ctx.fill();

        // Solid Inner Sphere
        ctx.fillStyle = shipColor;
        ctx.shadowBlur = 20;
        ctx.shadowColor = shipColor;
        ctx.beginPath(); ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Floating Rotating Rings
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);

        // Ring 1 (X-Axis dominant rotation)
        ctx.save();
        ctx.rotate(t);
        ctx.beginPath();
        for (let i = 0; i < Math.PI * 2; i += 0.2) {
            ctx.lineTo(Math.cos(i) * size * 1.0, Math.sin(i) * size * 0.3);
        }
        ctx.closePath(); ctx.stroke();
        ctx.restore();

        // Ring 2 (Y-Axis dominant rotation, reverse)
        ctx.save();
        ctx.rotate(-t * 1.5 + Math.PI / 4);
        ctx.beginPath();
        for (let i = 0; i < Math.PI * 2; i += 0.2) {
            ctx.lineTo(Math.cos(i) * size * 0.2, Math.sin(i) * size * 1.2);
        }
        ctx.closePath(); ctx.stroke();
        ctx.restore();

        // Emitted Particles
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 6; i++) {
            const pt = t * 3 + (i * Math.PI / 3);
            const r = size * 0.6 + Math.sin(t * 5 + i) * size * 0.2;
            ctx.beginPath(); ctx.arc(Math.cos(pt) * r, Math.sin(pt) * r, size * 0.08, 0, Math.PI * 2); ctx.fill();
        }

        // Engine Trail (central exhaust)
        this.drawEngineFlame(ctx, -size * 0.5, 0, size * 0.8, shipColor, time);
        ctx.restore();
    }

    drawSiphon(ctx, size, shipColor, pitchScale, time) {
        ctx.save(); ctx.scale(1, pitchScale || 1); ctx.fillStyle = shipColor; ctx.strokeStyle = this.adjustColor(shipColor, 50); ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath(); ctx.moveTo(-size * 0.5, 0); ctx.lineTo(-size * 0.2, -size * 0.8); ctx.lineTo(size * 1.1, -size * 0.3); ctx.lineTo(size * 0.2, -size * 0.2); ctx.lineTo(size * 0.6, 0);
        ctx.lineTo(size * 0.2, size * 0.2); ctx.lineTo(size * 1.1, size * 0.3); ctx.lineTo(-size * 0.2, size * 0.8); ctx.closePath();
        ctx.fill(); ctx.stroke();
        this.drawEngineFlame(ctx, -size * 0.4, 0, size * 0.3, '#aa00ff', time || Date.now());
        ctx.restore();
    }

    drawTitan(ctx, size, shipColor, pitchScale, time) {
        ctx.save(); ctx.scale(1, pitchScale || 1); ctx.fillStyle = shipColor; ctx.strokeStyle = '#222'; ctx.lineWidth = 4 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath(); ctx.moveTo(size * 1.2, 0); ctx.lineTo(0, -size * 1.0); ctx.lineTo(-size * 1.2, 0); ctx.lineTo(0, size * 1.0); ctx.closePath();
        ctx.fill(); ctx.stroke();
        this.drawEngineFlame(ctx, -size * 1.1, 0, size * 0.8, '#ff0000', time || Date.now());
        ctx.restore();
    }

    drawPulse(ctx, size, shipColor, pitchScale, time) {
        // PULSE - Asymmetric sensor dish arrays, scanning waves
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.003;

        // Long asymmetric central boom
        ctx.fillStyle = this.adjustColor(shipColor, -50);
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);

        ctx.beginPath();
        ctx.moveTo(size * 1.2, 0); // Nose sensor
        ctx.lineTo(-size * 0.8, -size * 0.1);
        ctx.lineTo(-size * 0.8, size * 0.1);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // Right Wing (Large Sensor Dish)
        ctx.beginPath();
        ctx.moveTo(0, size * 0.1);
        ctx.lineTo(-size * 0.2, size * 0.8);
        ctx.lineTo(-size * 0.5, size * 0.8);
        ctx.lineTo(-size * 0.6, size * 0.1);
        ctx.fill(); ctx.stroke();

        // The Dish Parabola
        ctx.beginPath();
        ctx.arc(-size * 0.35, size * 0.8, size * 0.3, Math.PI, Math.PI * 2);
        ctx.stroke();

        // Left Wing (Counterweight/Comms)
        ctx.beginPath();
        ctx.moveTo(size * 0.2, -size * 0.08);
        ctx.lineTo(size * 0.1, -size * 0.5);
        ctx.lineTo(-size * 0.3, -size * 0.5);
        ctx.lineTo(-size * 0.5, -size * 0.1);
        ctx.fill(); ctx.stroke();
        // Antenna
        ctx.beginPath(); ctx.moveTo(-size * 0.1, -size * 0.5); ctx.lineTo(-size * 0.1, -size * 1.0); ctx.stroke();
        ctx.fillStyle = '#ff0000';
        if (Math.sin(t * 10) > 0) { ctx.beginPath(); ctx.arc(-size * 0.1, -size * 1.0, size * 0.08, 0, Math.PI * 2); ctx.fill(); }

        // Scanning Wave Animation (expanding rings from dish)
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        for (let i = 0; i < 3; i++) {
            const wave = (t * 2 + i) % 3; // 0 to 3 scale
            ctx.globalAlpha = 1.0 - (wave / 3);
            ctx.beginPath();
            ctx.arc(-size * 0.35, size * 0.8, size * 0.2 + (wave * size * 0.5), Math.PI * 0.1, Math.PI * 0.9);
            ctx.stroke();
        }
        ctx.globalAlpha = 1.0;

        // Engine
        this.drawEngineFlame(ctx, -size * 0.8, 0, size * 0.4, '#00f3ff', time);
        ctx.restore();
    }

    drawFlux(ctx, size, shipColor, pitchScale, time) {
        // FLUX - Disconnected floating shards, energy tethers
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.005;

        // Setup for floating shards
        ctx.fillStyle = shipColor;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5 / (this.camera ? this.camera.zoom : 1);

        // Core/Cockpit Shard (Center-Forward)
        const coreOffY = Math.sin(t) * size * 0.1;
        const corePts = [{ x: size, y: 0 }, { x: 0, y: -size * 0.3 }, { x: -size * 0.2, y: 0 }, { x: 0, y: size * 0.3 }];

        ctx.shadowBlur = 10; ctx.shadowColor = shipColor;
        ctx.beginPath();
        ctx.moveTo(corePts[0].x, corePts[0].y + coreOffY);
        for (let i = 1; i < corePts.length; i++) ctx.lineTo(corePts[i].x, corePts[i].y + coreOffY);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        // Left Wing Shard
        const lwX = Math.cos(t * 1.2) * size * 0.1;
        const lwY = Math.sin(t * 1.5) * size * 0.1;
        const lwPts = [{ x: -size * 0.1, y: -size * 0.4 }, { x: -size * 0.8, y: -size * 0.8 }, { x: -size * 0.6, y: -size * 0.2 }];

        ctx.beginPath();
        ctx.moveTo(lwPts[0].x + lwX, lwPts[0].y + lwY);
        for (let i = 1; i < lwPts.length; i++) ctx.lineTo(lwPts[i].x + lwX, lwPts[i].y + lwY);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        // Right Wing Shard
        const rwX = Math.cos(t * 1.1 + Math.PI) * size * 0.1;
        const rwY = Math.sin(t * 1.4 + Math.PI) * size * 0.1;
        const rwPts = [{ x: -size * 0.1, y: size * 0.4 }, { x: -size * 0.8, y: size * 0.8 }, { x: -size * 0.6, y: size * 0.2 }];

        ctx.beginPath();
        ctx.moveTo(rwPts[0].x + rwX, rwPts[0].y + rwY);
        for (let i = 1; i < rwPts.length; i++) ctx.lineTo(rwPts[i].x + rwX, rwPts[i].y + rwY);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        // Tail Drive Shard
        const tdX = Math.sin(t * 2) * size * 0.05;
        const tdPts = [{ x: -size * 0.5, y: -size * 0.1 }, { x: -size * 0.5, y: size * 0.1 }, { x: -size * 0.9, y: 0 }];

        ctx.beginPath();
        ctx.moveTo(tdPts[0].x + tdX, tdPts[0].y);
        for (let i = 1; i < tdPts.length; i++) ctx.lineTo(tdPts[i].x + tdX, tdPts[i].y);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        ctx.shadowBlur = 0; // reset

        // Energy Tethers (crackling lightning connecting the pieces)
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath();
        // Core to Left Wing
        if (Math.random() > 0.2) { ctx.moveTo(-size * 0.1, coreOffY); ctx.lineTo(-size * 0.1 + lwX, -size * 0.4 + lwY); }
        // Core to Right Wing
        if (Math.random() > 0.2) { ctx.moveTo(-size * 0.1, coreOffY); ctx.lineTo(-size * 0.1 + rwX, size * 0.4 + rwY); }
        // Core to Tail
        if (Math.random() > 0.2) { ctx.moveTo(-size * 0.2, coreOffY); ctx.lineTo(-size * 0.5 + tdX, 0); }
        ctx.stroke();

        // Main Engine from Tail Shard
        this.drawEngineFlame(ctx, -size * 0.9 + tdX, 0, size * 0.4, '#00ffff', time);
        ctx.restore();
    }

    drawApex(ctx, size, shipColor, pitchScale, time) {
        ctx.save(); ctx.scale(1, pitchScale || 1); ctx.fillStyle = shipColor; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath(); ctx.moveTo(size * 1.4, -size * 0.1); ctx.lineTo(-size * 0.6, -size * 0.4); ctx.lineTo(-size * 0.2, -size * 0.1); ctx.lineTo(size * 0.2, -size * 0.1); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(size * 1.4, size * 0.1); ctx.lineTo(-size * 0.6, size * 0.4); ctx.lineTo(-size * 0.2, size * 0.1); ctx.lineTo(size * 0.2, size * 0.1); ctx.fill(); ctx.stroke();
        this.drawEngineFlame(ctx, -size * 0.6, -size * 0.25, size * 0.5, '#00ff66', time || Date.now());
        this.drawEngineFlame(ctx, -size * 0.6, size * 0.25, size * 0.5, '#00ff66', time || Date.now());
        ctx.restore();
    }

    renderMinerals(ctx, time) {
        this.minerals.forEach(mineral => {
            // Special: Mindwave Lotus Rendering
            if (mineral.type === 'lotus') {
                this.renderLotus(ctx, mineral);
                return;
            }

            // Viewport Culling Optimization!
            const safeZoom = Math.max(0.01, this.camera ? this.camera.zoom : 1);
            const viewHalfW = (this.canvas.width / safeZoom) / 2 + 100; // 100px pad
            const viewHalfH = (this.canvas.height / safeZoom) / 2 + 100;
            // The camera center in world space is the negative offset divided by zoom
            const camX = (this.camera && typeof this.camera.x === 'number') ? (-this.camera.x / safeZoom) : this.playerShip.x;
            const camY = (this.camera && typeof this.camera.y === 'number') ? (-this.camera.y / safeZoom) : this.playerShip.y;
            
            if (Math.abs(mineral.x - camX) > viewHalfW || Math.abs(mineral.y - camY) > viewHalfH) return;

            ctx.save();
            // Use world coordinates (ctx already transformed)
            ctx.translate(mineral.x, mineral.y);

            // Pulsing glow animation
            const pulse = Math.sin(time * 0.003 + mineral.phase) * 0.3 + 0.7;
            const size = mineral.size * pulse / safeZoom;

            // Ensure size is valid
            if (!isFinite(size) || size <= 0) {
                ctx.restore();
                return;
            }

            // Tractor beam pull lines removed - radius is 25px (upgradeable)

            // Glow effect
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
            gradient.addColorStop(0, mineral.color);
            gradient.addColorStop(0.5, mineral.color + '88');
            gradient.addColorStop(1, mineral.color + '00');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = mineral.color;
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();

            // Bright center
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.restore();
        });
    }

    // =====================================================
    // HAZARD RENDERING - Visual effects for mines & holes
    // =====================================================


    // Helper to draw a missile base structure


    // Render hazard effect overlay (full screen)


    // Render dramatic player death sequence
    // --- ACTIVE ABILITY EFFECTS ---

    renderEMPEffect(ctx, time) {
        if (!this.hazardEffect || this.hazardEffect.type !== 'emp') return;
        const h = this.hazardEffect;
        let progress = (Date.now() - h.startTime) / h.duration;
        if (progress > 1) progress = 1;

        ctx.save();
        ctx.translate(this.playerShip.x, this.playerShip.y);

        // Core EMP blast
        const lvl = this.playerSkills.emp;
        const maxRadius = 500 + (lvl * 250);
        const currentRadius = maxRadius * Math.pow(progress, 0.5); // Pop fast, slow down

        const alpha = 1 - Math.pow(progress, 2);
        
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(0, 0, currentRadius * 0.8, 0, 0, currentRadius);
        grad.addColorStop(0, `rgba(0, 243, 255, 0)`);
        grad.addColorStop(0.8, `rgba(0, 243, 255, ${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.lineWidth = 4 * alpha;
        ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
        ctx.stroke();
        
        // Glitch lines inside
        for(let i=0; i<10; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * currentRadius * 0.8, 0);
            ctx.lineTo((Math.random() * currentRadius) + 20, 0);
            ctx.rotate(Math.random() * Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.lineWidth = Math.random() * 3 + 1;
            ctx.stroke();
        }

        ctx.restore();
    }

    renderQuantumEffect(ctx, time) {
        if (!this.hazardEffect || this.hazardEffect.type !== 'quantum') return;
        const h = this.hazardEffect;
        let progress = (Date.now() - h.startTime) / h.duration;
        if (progress > 1) return;

        ctx.save();
        ctx.translate(this.playerShip.x, this.playerShip.y);

        // Implosion / Explosion warp effect
        const alpha = 1 - progress;
        
        // Draw expanding geometric tunnels
        const maxRadius = 400;
        const currentRadius = maxRadius * (1 - Math.pow(1 - progress, 3)); 

        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, currentRadius + (i * 20), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 0, 255, ${(alpha * 0.5) / (i + 1)})`;
            ctx.lineWidth = 10;
            ctx.stroke();
        }

        // Draw blinding core flash
        ctx.beginPath();
        ctx.arc(0, 0, 150 * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        ctx.restore();
    }

    renderPlayerDeathEffect(ctx, time) {
        const effect = this.hazardEffect;
        if (!effect) return;

        const canvas = this.canvas;
        const progress = effect.progress || 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // 1. Screen Shake (Internal ship rumbling)
        if (effect.cameraShake > 0) {
            this.camera.shakeX = (Math.random() - 0.5) * effect.cameraShake;
            this.camera.shakeY = (Math.random() - 0.5) * effect.cameraShake;
        }

        // 2. Hull Venting / Fire Sparks
        if (effect.phase === 'venting' || effect.phase === 'critical') {
            effect.ventingPoints.forEach(p => {
                const now = performance.now();
                const pElapsed = now - (effect.startTime + p.startTime);
                if (pElapsed < 0) return;

                const pProgress = pElapsed / p.duration;
                if (pProgress >= 1) return;

                const vx = centerX + p.offsetX;
                const vy = centerY + p.offsetY;
                const alpha = (p.alpha !== undefined) ? p.alpha : (1 - pProgress);

                // Glowing plasma/fire venting from hull
                const grad = ctx.createRadialGradient(vx, vy, 0, vx, vy, p.size);
                grad.addColorStop(0, `rgba(255, 200, 50, ${alpha})`);
                grad.addColorStop(0.5, `rgba(255, 100, 0, ${alpha * 0.5})`);
                grad.addColorStop(1, 'transparent');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(vx, vy, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // 3. Hull Cracks (Energy bleeding through)
        if (effect.phase === 'critical' || effect.phase === 'explosion') {
            ctx.strokeStyle = '#ff6600';
            ctx.lineWidth = 2;
            effect.hullCracks.forEach(c => {
                const x1 = centerX + c.x;
                const y1 = centerY + c.y;
                const x2 = x1 + Math.cos(c.angle) * c.length;
                const y2 = y1 + Math.sin(c.angle) * c.length;

                ctx.globalAlpha = c.life;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            });
            ctx.globalAlpha = 1.0;
        }

        // 4. Final Supernova-style Eruption
        if (effect.phase === 'explosion') {
            const expProgress = (progress - 0.5) / 0.2;
            const expSize = expProgress * canvas.width * 1.5;

            const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, expSize);
            grad.addColorStop(0, '#fff');
            grad.addColorStop(0.2, '#ff0');
            grad.addColorStop(0.5, '#f60');
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, expSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // 5. Full-screen Whiteout / Red Flash
        if (effect.flashIntensity > 0) {
            const color = effect.phase === 'critical' ? '255, 0, 0' : '255, 255, 255';
            ctx.fillStyle = `rgba(${color}, ${effect.flashIntensity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }


        ctx.restore();
    }

    // Render missile hit effect - red flash and screen shake
    renderMissileHitEffect(ctx, time) {
        const effect = this.hazardEffect;
        if (!effect) return;

        const now = performance.now();
        const elapsed = now - effect.startTime;
        const progress = Math.min(1, elapsed / effect.duration);
        const canvas = this.canvas;
        const zoom = this.camera.zoom;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const screenX = centerX + (effect.x - this.playerShip.x) * zoom;
        const screenY = centerY + (effect.y - this.playerShip.y) * zoom;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // A. Full-screen Red Flash
        const flashIntensity = (1 - progress) * effect.flashIntensity * 0.6;
        ctx.fillStyle = `rgba(255, 0, 0, ${Math.min(1, flashIntensity)})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // B. Localized Impact Flare (Zoom-aware)
        if (progress < 0.6) {
            const flareSize = Math.max(0.1, (100 * (1 - progress)) * zoom);
            const grad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, flareSize);
            grad.addColorStop(0, `rgba(255, 255, 255, ${1 - progress})`);
            grad.addColorStop(0.3, `rgba(255, 100, 0, ${0.5 * (1 - progress)})`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(screenX, screenY, flareSize, 0, Math.PI * 2); ctx.fill();
        }

        // C. Screen Shake
        if (progress < 0.5) {
            const shakeIntensity = (1 - progress * 2) * 10;
            this.camera.shakeX = (Math.random() - 0.5) * shakeIntensity;
            this.camera.shakeY = (Math.random() - 0.5) * shakeIntensity;
        } else {
            this.camera.shakeX = 0;
            this.camera.shakeY = 0;
        }

        // Warning text flash
        if (progress < 0.3) {
            ctx.font = 'bold 24px monospace';
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - progress * 3})`;
            ctx.textAlign = 'center';
            ctx.fillText('⚠ MISSILE IMPACT ⚠', canvas.width / 2, canvas.height / 2);
        }

        ctx.restore();

        // End effect
        if (progress >= 1) {
            this.hazardEffect = null;
            this.camera.shakeX = 0;
            this.camera.shakeY = 0;
        }
    }

    // Render planet impact effect - LOCALIZED PLUME AND FLASH
    renderPlanetImpactEffect(ctx, time) {
        const effect = this.hazardEffect;
        if (!effect) return;

        if (!effect._renderDebugLogged) {
            console.log('[Refactored] renderPlanetImpactEffect running!');
            console.log('DebrisRocks:', effect.debrisRocks ? effect.debrisRocks.length : 'none');
            console.log('DustParticles:', effect.dustParticles ? effect.dustParticles.length : 'none');
            effect._renderDebugLogged = true;
        }

        const progress = effect.progress || 0;
        const canvas = this.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Calculate screen position of impact
        const zoom = Math.max(0.01, this.camera.zoom || 1);
        const impactScreenX = centerX + (effect.x - this.playerShip.x) * zoom;
        const impactScreenY = centerY + (effect.y - this.playerShip.y) * zoom;

        // ============================================
        // 0. NUCLEAR WHITEOUT (0-10%)
        // ============================================
        if (progress < 0.1) {
            const whiteoutAlpha = 1.0 - (progress / 0.1);
            ctx.fillStyle = `rgba(255, 255, 255, ${whiteoutAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // ============================================
        // 1. CONTACT FLASH (Initial impact)
        // ============================================
        if (progress < 0.25) {
            const flashAlpha = 1.0 - (progress / 0.25);
            const flashSize = 500 * zoom * flashAlpha;

            const flashGrad = ctx.createRadialGradient(
                impactScreenX, impactScreenY, 0,
                impactScreenX, impactScreenY, flashSize
            );
            flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
            flashGrad.addColorStop(0.2, `rgba(255, 250, 150, ${flashAlpha * 0.9})`);
            flashGrad.addColorStop(0.5, `rgba(255, 100, 0, ${flashAlpha * 0.6})`);
            flashGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = flashGrad;
            ctx.beginPath();
            ctx.arc(impactScreenX, impactScreenY, flashSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // ============================================
        // 1.5. VOLUMETRIC DUST SHOCKWAVE (The "Cloud")
        // ============================================
        if (progress > 0.05 && progress < 0.8) {
            const shockP = (progress - 0.05) / 0.75;
            const shockRadius = shockP * 400 * zoom;
            const shockAlpha = (1 - shockP) * 0.6;

            // Outer Ring
            ctx.beginPath();
            ctx.arc(impactScreenX, impactScreenY, shockRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(200, 180, 160, ${shockAlpha})`;
            ctx.lineWidth = 40 * zoom * (1 - shockP);
            ctx.stroke();

            // Inner "Cloud" fill
            const cloudGrad = ctx.createRadialGradient(
                impactScreenX, impactScreenY, shockRadius * 0.5,
                impactScreenX, impactScreenY, shockRadius
            );
            cloudGrad.addColorStop(0, `rgba(255, 240, 220, 0)`);
            cloudGrad.addColorStop(0.8, `rgba(200, 180, 160, ${shockAlpha * 0.5})`);
            cloudGrad.addColorStop(1, `rgba(150, 130, 110, 0)`);

            ctx.fillStyle = cloudGrad;
            ctx.beginPath();
            ctx.arc(impactScreenX, impactScreenY, shockRadius, 0, Math.PI * 2);
            ctx.fill();
        }

        // ============================================
        // 2. DUST PLUME & DEBRIS
        // ============================================
        // Render debris shards
        for (const rock of (effect.debrisRocks || [])) {
            // Position is already updated by vx in updatePlanetImpactEffect
            const rx = impactScreenX + (rock.x - effect.x) * zoom;
            const ry = impactScreenY + (rock.y - effect.y) * zoom;

            ctx.save();
            ctx.translate(rx, ry);
            ctx.rotate(rock.rotation + rock.rotationSpeed * progress * 10);

            ctx.fillStyle = '#444';
            ctx.globalAlpha = (rock.life || 1.0) * (1 - progress);

            ctx.beginPath();
            ctx.arc(0, 0, rock.size * zoom, 0, Math.PI * 2);
            ctx.fill();

            // Add slight glowing edge for atmosphere entry look
            if (progress < 0.5) {
                ctx.strokeStyle = `rgba(255, 150, 50, ${1 - progress / 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();
        }

        // Render localized dust plume
        for (const p of (effect.dustParticles || [])) {
            // Position is already updated by vx
            const px = impactScreenX + (p.x - effect.x) * zoom;
            const py = impactScreenY + (p.y - effect.y) * zoom;

            const pAlpha = (p.life || 1.0) * (1 - progress);
            const color = p.color || 'rgba(100, 80, 60, 1)';
            ctx.fillStyle = color.includes('rgba') ? color.replace(/[\d\.]+\)$/, `${pAlpha})`) : color.replace(')', `, ${pAlpha})`);

            ctx.beginPath();
            ctx.arc(px, py, p.size * (1 + progress * 2) * zoom, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();

        // Camera shake - significantly intensified for planet impact
        if (effect.cameraShake > 0) {
            const shakeDecay = 1 - progress;
            const intensity = effect.cameraShake * 1.5; // 50% more intense
            this.camera.shakeX = (Math.random() - 0.5) * intensity * shakeDecay;
            this.camera.shakeY = (Math.random() - 0.5) * intensity * shakeDecay;
        }

        // End effect
        if (progress >= 1) {
            this.hazardEffect = null;
            this.camera.shakeX = 0;
            this.camera.shakeY = 0;
        }
    }

    // ============================================================
    // NUCLEAR EXPLOSION - ULTRA VOLUMETRIC CINEMATIC VERSION
    // ============================================================


    renderMissileBaseDestructionEffect(ctx, time) {
        const effect = this.hazardEffect;
        if (!effect) return;

        // DEBUG: Confirm this is running
        if (!effect._renderDebugLogged) {
            console.log('[Refactored] renderMissileBaseDestructionEffect running!');
            console.log('Shards:', effect.shards ? effect.shards.length : 'none');
            console.log('Sludge:', effect.sludge ? effect.sludge.length : 'none');
            effect._renderDebugLogged = true;
        }

        const progress = effect.progress || 0;
        const canvas = this.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const t = time * 0.001;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Calculate screen position
        const zoom = Math.max(0.01, this.camera.zoom || 1);
        const sx = centerX + (effect.x - this.playerShip.x) * zoom;
        const sy = centerY + (effect.y - this.playerShip.y) * zoom;

        // 1. CHROMA GLITCH (Technical failure feel)
        if (progress < 0.3) {
            const glitch = Math.sin(t * 50) * 10 * (1 - progress / 0.3);
            ctx.translate(glitch, 0);
        }

        // 1.5. INITIAL WHITEOUT FLASH (New)
        if (progress < 0.15) {
            const whiteAlpha = 1.0 - (progress / 0.15);
            ctx.fillStyle = `rgba(255, 255, 255, ${whiteAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Full screen flash
        }

        // 1.8. RADIOACTIVE SHOCKWAVE (New)
        if (progress > 0.05 && progress < 0.5) {
            const sp = (progress - 0.05) / 0.45;
            const sr = sp * 800 * zoom;
            const sa = (1 - sp) * 0.8;

            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(100, 255, 100, ${sa})`;
            ctx.lineWidth = 20 * zoom * (1 - sp);
            ctx.stroke();
        }

        // 2. PRIMARY EXPLOSION (More jagged/electric than supernova)
        if (progress < 0.6) {
            const ep = progress / 0.6;
            const size = (100 + ep * 400) * zoom;
            const alpha = 1 - ep;

            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, size);
            grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            grad.addColorStop(0.2, `rgba(200, 255, 100, ${alpha * 0.9})`); // Radioactive Yellow
            grad.addColorStop(0.5, `rgba(50, 255, 50, ${alpha * 0.7})`); // Toxic Green
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(sx, sy, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // 2.5 RADIOACTIVE SHOCKWAVE (New)
        if (progress > 0.05 && progress < 0.5) {
            const sp = (progress - 0.05) / 0.45;
            const sr = sp * 800 * zoom;
            const sa = (1 - sp) * 0.8;

            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(100, 255, 100, ${sa})`;
            ctx.lineWidth = 20 * zoom * (1 - sp);
            ctx.stroke();
        }

        // 3. MECHANICAL SHARDS (The actual base breaking apart)
        for (const shard of (effect.shards || [])) {
            const rx = sx + shard.offsetX * zoom;
            const ry = sy + shard.offsetY * zoom;

            ctx.save();
            ctx.translate(rx, ry);

            // Fast rotation for violent destruction
            ctx.rotate(shard.rot + shard.rv * progress * 20);

            // Flickering glitch effect on shards
            const flicker = Math.random() > 0.1 ? 1 : 0.5;
            ctx.globalAlpha = shard.alpha * (1 - progress) * flicker;

            ctx.fillStyle = shard.color || '#444';
            ctx.beginPath();
            if (shard.vertices) {
                ctx.moveTo(shard.vertices[0].x * zoom, shard.vertices[0].y * zoom);
                for (let j = 1; j < shard.vertices.length; j++) {
                    ctx.lineTo(shard.vertices[j].x * zoom, shard.vertices[j].y * zoom);
                }
            } else {
                ctx.rect(-5 * zoom, -5 * zoom, 10 * zoom, 10 * zoom);
            }
            ctx.closePath();
            ctx.fill();

            // Glowing hot edges
            ctx.strokeStyle = `rgba(100, 255, 100, ${1 - progress})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        }


        // 4. CHEMICAL SLUDGE (Green spewing fluid)
        for (const s of (effect.sludge || [])) {
            const px = sx + (s.x - effect.x) * zoom;
            const py = sy + (s.y - effect.y) * zoom;

            ctx.fillStyle = `rgba(50, 255, 0, ${s.life * 0.5})`;
            ctx.beginPath();
            ctx.arc(px, py, s.size * zoom, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();

        // Screen shake
        if (progress < 0.5) {
            this.camera.shakeX = (Math.random() - 0.5) * 30 * (1 - progress / 0.5);
            this.camera.shakeY = (Math.random() - 0.5) * 30 * (1 - progress / 0.5);
        }
    }

    // Render black hole wormhole effect - SPIRAL → IMPLODE → WHITE → FADE
    // Render black hole wormhole effect - WITH ANIMATED LIGHT RAYS AND WHITE OBFUSCATION


    renderCollectionNotifications(ctx) {
        const canvas = this.canvas;
        const now = Date.now();

        this.collectionNotifications.forEach(notification => {
            const age = now - notification.time;
            const opacity = Math.max(0, 1 - age / 2000);
            const yOffset = age * 0.05;

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            ctx.globalAlpha = opacity;
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = notification.color;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';

            const x = canvas.width / 2;
            const y = canvas.height / 2 - 100 - yOffset;

            ctx.strokeText(notification.text, x, y);
            ctx.fillText(notification.text, x, y);
            ctx.globalAlpha = 1;

            ctx.restore();
        });
    }


    // Helper method for drawing Saturn-style planet rings (half at a time)


    // Get the center point of all stars (constellation center)
    getConstellationCenter() {
        if (this.stars.length === 0) {
            return { x: this.canvas.width / 2, y: this.canvas.height / 2, z: 0 };
        }
        let sumX = 0, sumY = 0, sumZ = 0;
        this.stars.forEach(s => {
            sumX += s.x;
            sumY += s.y;
            sumZ += (s.z || 0);
        });
        return {
            x: sumX / this.stars.length,
            y: sumY / this.stars.length,
            z: sumZ / this.stars.length
        };
    }

    // 3D Rotation: Rotate a point around a given center


    // Inverse 3D Rotation: Project screen point back to 3D world (at Z=0 plane relative to rotation)


    // Reset rotation sliders and values



    // Ship Selection Methods
    showShipModal() {
        const modal = document.getElementById('shipModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('active'); 
            this.initHangar(); // Generate bays
            this.updateHangarUI(); // Set initial position
            if (this.resizeHangar) this.resizeHangar(); // Apply responsive sizing

            // Start render loop for previews (with guard)
            this._hangarActive = true;
            if (!this._hangarLoopRunning) {
                this._hangarLoopRunning = true;
                this.renderHangarPreviews();
            }

            // Update gem balance
            const gemEl = document.getElementById('hangarGemBalance');
            if (gemEl) gemEl.textContent = this.playerGems ? this.playerGems.toLocaleString() : '0';
        }
    }

    hideShipModal() {
        const modal = document.getElementById('shipModal');
        if (modal) {
            modal.classList.remove('active');
            this._hangarActive = false;
            // Delay hidding display to allow transition
            setTimeout(() => {
                if (!modal.classList.contains('active')) {
                    modal.style.display = 'none';
                }
            }, 500);
        }
    }

    hideShipModal() {
        const modal = document.getElementById('shipModal');
        if (modal) {
            modal.classList.remove('active');
            this._hangarActive = false;
        }
    }

    initHangar() {
        const track = document.getElementById('hangarTrack');
        if (!track) return;

        track.innerHTML = ''; // Clear old bays

        // Premium prices
        const shipPrices = {
            saucer: 500,
            viper: 600,
            orion: 700,
            draco: 800,
            hauler: 900,
            interceptor: 1000,
            bulwark: 1200,
            prospector: 1500,
            spectre: 2000,
            siphon: 2500,
            titan: 3500,
            nova: 4000,
            flux: 4500,
            pulses: 5000,
            apex: 6000,
            harvester: 7500,
            phoenix: 10000
        };

        this.hangarShips.forEach((ship, index) => {
            const bay = document.createElement('div');
            bay.className = 'docking-bay';
            bay.id = `bay-${ship.id}`;

            const isLocked = ship.premium && !this.unlockedShips.includes(ship.id);
            const price = shipPrices[ship.id] || 1000;
            const lockHtml = isLocked ? `<div class="lock-overlay">⭐ ${price} GEMS</div>` : '';

            let btnAction = `window.game.selectShip('${ship.id}')`;
            let btnText = (this.playerShip && this.playerShip.type === ship.id) ? 'SELECTED' : 'SELECT SHIP';
            let btnClass = (this.playerShip && this.playerShip.type === ship.id) ? 'select-ship-btn active' : 'select-ship-btn';

            if (isLocked) {
                if (this.playerGems >= price) {
                    btnAction = `window.game.unlockShip('${ship.id}', ${price})`;
                    btnText = `UNLOCK (${price} GEMS)`;
                    btnClass += ' unlock-btn available';
                } else {
                    btnAction = `window.game.showToast('Not enough gems!', 2000)`;
                    btnText = `${price} GEMS REQUIRED`;
                    btnClass += ' unlock-btn locked';
                }
            }

            bay.innerHTML = `
           <div class="bay-floor"></div>
           <div class="bay-walls">
               <div class="wall wall-back">
                   <div class="ship-specs">
                       <div class="bay-num">DOCKING UNIT 0${index + 1}</div>
                       <h3>MODEL: ${ship.name}</h3>
                       <div class="spec-line"><span class="label">CONFIG:</span> <span class="val">${ship.model}</span></div>
                       <div class="spec-line"><span class="label">SPEED:</span> <span class="val">${ship.speed} LY/S</span></div>
                       <div class="spec-line"><span class="label">ARMOR:</span> <span class="val">${ship.armor}</span></div>
                       <div class="spec-line"><span class="label">POWER:</span> <span class="val">${ship.power}</span></div>
                       <p class="spec-desc">${ship.desc}</p>
                   </div>
               </div>
               <div class="wall wall-side left"></div>
               <div class="wall wall-side right"></div>
           </div>
           <div class="ship-hologram">
               <canvas id="preview-${ship.id}" width="400" height="400"></canvas>
           </div>
           ${lockHtml}
           <button class="${btnClass}" onclick="${btnAction}">
               ${btnText}
           </button>
       `;
            track.appendChild(bay);
        });
    }

    updateHangarUI() {
        const track = document.getElementById('hangarTrack');
        const indicator = document.getElementById('bayIndicator');
        if (track) {
            track.style.transform = `translateX(${-this.currentHangarBay * 100}%)`;
        }
        if (indicator) {
            indicator.textContent = `BAY ${this.currentHangarBay + 1} / ${this.hangarShips.length}`;
        }
    }

    nextHangarBay() {
        this.currentHangarBay = (this.currentHangarBay + 1) % this.hangarShips.length;
        this.updateHangarUI();
    }

    prevHangarBay() {
        this.currentHangarBay = (this.currentHangarBay - 1 + this.hangarShips.length) % this.hangarShips.length;
        this.updateHangarUI();
    }

    renderHangarPreviews() {
        if (!this._hangarActive) {
            this._hangarLoopRunning = false;
            return;
        }

        // Only render the current one and neighbors for performance (with loop wrap-around)
        const total = this.hangarShips.length;
        const current = this.currentHangarBay;
        const toRender = [
            current,
            (current - 1 + total) % total,
            (current + 1) % total
        ];

        toRender.forEach(idx => {
            if (this.hangarShips[idx]) {
                this.renderShipPreview(this.hangarShips[idx].id);
            }
        });

        requestAnimationFrame(() => this.renderHangarPreviews());
    }


    renderShipPreview(type) {
        const canvas = document.getElementById(`preview-${type}`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const size = w * 0.25; // Scale relative to canvas

        // Clear
        ctx.clearRect(0, 0, w, h);

        // Add Background Glow
        const gradient = ctx.createRadialGradient(w / 2, h / 2, size * 0.5, w / 2, h / 2, size * 2.5);
        gradient.addColorStop(0, 'rgba(0, 243, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // Center
        ctx.save();
        ctx.translate(w / 2, h / 2);

        // Face up
        ctx.rotate(-Math.PI / 2);

        // Draw Ship Logic (Simplified version of drawPlayer)
        // We use a temporary ship object to use helper methods if needed, 
        // but for now we'll inline the specific drawing commands for the preview
        // to avoid side effects or dependency on instance state.

        // Use user-selected color or default
        const shipColor = this.playerShip.color || '#00f3ff';

        // High visibility settings
        ctx.fillStyle = shipColor;
        // Restore original drawing style (don't force colors)
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        switch (type) {
            case 'saucer':
                this.drawSaucer(ctx, size, shipColor, 1.0, Date.now());
                break;
            case 'hauler':
                this.drawHauler(ctx, size * 0.7, shipColor, 1.0, Date.now());
                break;
            case 'orion':
                this.drawOrion(ctx, size, shipColor, 0, 1.0);
                break;
            case 'draco':
                this.drawDraco(ctx, size, shipColor, 1.0, Date.now());
                break;
            case 'phoenix':
                this.drawPhoenix(ctx, size, shipColor, 1.0, Date.now());
                break;
            case 'harvester':
                this.drawHarvester(ctx, size, shipColor, 1.0, Date.now());
                break;
            case 'interceptor':
                this.drawInterceptor(ctx, size, shipColor, 1.0);
                break;
            case 'viper': this.drawViper(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'bulwark': this.drawBulwark(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'prospector': this.drawProspector(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'spectre': this.drawSpectre(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'nova': this.drawNova(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'siphon': this.drawSiphon(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'titan': this.drawTitan(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'pulse': this.drawPulse(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'flux': this.drawFlux(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'apex': this.drawApex(ctx, size, shipColor, 1.0, Date.now()); break;
            default:
                this.drawInterceptor(ctx, size, shipColor, 1.0);
                break;
        }
        ctx.restore();
    }




    captureConstellation() {
        if (this.stars.length < 3) {
            this.hudManager.showToast("Draw at least 3 stars first!");
            return;
        }

        // 1. Calculate Centroid
        let sumX = 0, sumY = 0, sumZ = 0;
        this.stars.forEach(s => {
            sumX += s.x;
            sumY += s.y;
            sumZ += (s.z || 0);
        });
        const centerX = sumX / this.stars.length;
        const centerY = sumY / this.stars.length;
        const centerZ = sumZ / this.stars.length;

        // 2. Normalize Stars (Center at 0,0,0) and Scale down
        const scale = 0.5; // Scale down for ship size
        const validStars = this.stars.map(s => ({
            x: (s.x - centerX) * scale,
            y: (s.y - centerY) * scale,
            z: ((s.z || 0) - centerZ) * scale,
            color: s.color
        }));

        // 3. Capture Connections (Lines)
        // We need to map original IDs to indices or new IDs
        const starIdToIndex = {};
        this.stars.forEach((s, i) => starIdToIndex[s.id] = i);

        const validLines = [];
        const lines = this.physicsManager.calculateGeometry().lines; // Get current lines
        lines.forEach(l => {
            const idx1 = starIdToIndex[l.from];
            const idx2 = starIdToIndex[l.to];
            if (idx1 !== undefined && idx2 !== undefined) {
                validLines.push({ fromIndex: idx1, toIndex: idx2 });
            }
        });

        // 4. Save to PlayerShip
        this.playerShip.customStructure = {
            stars: validStars,
            lines: validLines
        };

        // Save to LocalStorage
        localStorage.setItem('customShipStructure', JSON.stringify(this.playerShip.customStructure));

        // Auto-select "Orion" type (which we'll use for custom)
        this.playerShip.type = 'orion';
        localStorage.setItem('playerShipType', 'orion');

        this.hudManager.showToast("Constellation SAVED as Spacecraft!");
    }

    selectShip(shipType) {
        const ships = {
            interceptor: { name: 'Interceptor', maxSpeed: 90, acceleration: 0.8, premium: false },
            saucer: { name: 'Saucer', maxSpeed: 110, acceleration: 1.0, premium: true },
            hauler: { name: 'Mauler', maxSpeed: 70, acceleration: 0.6, premium: false },
            orion: { name: 'Orion', maxSpeed: 100, acceleration: 0.9, premium: false },
            draco: { name: 'Draco', maxSpeed: 130, acceleration: 0.7, premium: false },
            phoenix: { name: 'Phoenix', maxSpeed: 95, acceleration: 1.2, premium: false },
            harvester: { name: 'Starfighter', maxSpeed: 140, acceleration: 1.3, premium: true },
            // NEW PREMIUM SHIPS
            viper: { name: 'Viper', maxSpeed: 120, acceleration: 1.1, premium: true, ability: 'Speed Surge' },
            bulwark: { name: 'Bulwark', maxSpeed: 60, acceleration: 0.4, premium: true, ability: 'Shield Regen' },
            prospector: { name: 'Prospector', maxSpeed: 80, acceleration: 0.7, premium: true, ability: 'Gem Magnet' },
            spectre: { name: 'Spectre', maxSpeed: 105, acceleration: 0.9, premium: true, ability: 'Cloak' },
            nova: { name: 'Nova', maxSpeed: 100, acceleration: 1.0, premium: true, ability: 'Volatile Core' },
            siphon: { name: 'Siphon', maxSpeed: 85, acceleration: 0.6, premium: true, ability: 'Energy Leech' },
            titan: { name: 'Titan', maxSpeed: 50, acceleration: 0.3, premium: true, ability: 'Hardened Hull' },
            pulse: { name: 'Pulse', maxSpeed: 130, acceleration: 1.0, premium: true, ability: 'Radar Ping' },
            flux: { name: 'Flux', maxSpeed: 115, acceleration: 1.2, premium: true, ability: 'Phase Shift' },
            apex: { name: 'Apex', maxSpeed: 100, acceleration: 1.0, premium: true, ability: 'Overclock' }
        };
        const ship = ships[shipType];

        // Ensure player owns the ship before selecting
        if (ship && ship.premium && !this.unlockedShips.includes(shipType)) {
            this.hudManager.showToast(`🔒 ${ship.name} requires unlocking!`, 3000);
            return;
        }

        if (ship && this.playerShip) {
            this.playerShip.type = shipType;
            this.playerShip.maxSpeed = ship.maxSpeed;
            this.playerShip.acceleration = ship.acceleration;

            // Save ship type to localStorage for persistence
            localStorage.setItem('playerShipType', shipType);
            console.log(`[Hangar] Selected ${shipType}`);

            this.hudManager.showToast(`SYSTEMS ONLINE: ${ship.name.toUpperCase()} CLASS`, 2000);

            // Force camera to recenter on ship to prevent disappearing off screen
            if (this.flightMode && this.camera) {
                this.camera.x = -this.playerShip.x * this.camera.zoom;
                this.camera.y = -this.playerShip.y * this.camera.zoom;
            }

        }
        this.hideShipModal();
    }

    unlockShip(shipId, cost) {
        if (this.playerGems >= cost) {
            // Deduct gems and unlock
            this.playerGems -= cost;
            this.unlockedShips.push(shipId);

            // Save state
            localStorage.setItem('playerGems', this.playerGems);
            localStorage.setItem('unlockedShips', JSON.stringify(this.unlockedShips));

            this.hudManager.showToast(`✨ UNLOCKED ${shipId.toUpperCase()}! ✨`, 3000);

            // Refresh Hangar UI to reflect the unlocked state
            this.initHangar();

            // Automatically select the newly unlocked ship
            this.selectShip(shipId);
            if (this.updateGemsUI) this.updateGemsUI();
        } else {
            this.hudManager.showToast("Insufficient Gems!", 2000);
        }
    }

    toggleAutopilot() {
        this.autopilot = !this.autopilot;
        const btn = document.querySelector('button[onclick="app.toggleAutopilot()"]');
        if (btn) {
            btn.classList.toggle('active', this.autopilot);
            btn.style.color = this.autopilot ? '#00f3ff' : '#5c7a8a';
        }
        this.hudManager.showToast(this.autopilot ? "Autopilot ENGAGED" : "Autopilot DISENGAGED");
    }

    // Legacy support for gems resize if needed
    initGemsResize() {
        if (this.initGemsSectionResize) {
            this.initGemsSectionResize();
        }
    }

    flightZoom(amount) {
        // Simple zoom for flight mode buttons
        const newZoom = Math.max(0.1, Math.min(6.0, this.camera.zoom + amount));
        this.camera.zoom = newZoom;

        // Update display if it exists
        const zoomDisplay = document.getElementById('zoomDisplay');
        if (zoomDisplay) {
            zoomDisplay.textContent = this.camera.zoom.toFixed(1) + 'x';
        }

        // If in expanded map mode, also update that
        if (this.expandedMapMode) {
            this.expandedMapZoom = Math.max(0.2, Math.min(10.0, this.expandedMapZoom + amount));
        }
    }

    downloadSVG() {
        if (this.stars.length === 0) {
            this.hudManager.showToast("Universe is empty!");
            return;
        }

        // Ensure cluster IDs are assigned for naming in SVG
        this.refreshClusterAssignments();

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        this.stars.forEach(s => {
            minX = Math.min(minX, s.x); minY = Math.min(minY, s.y);
            maxX = Math.max(maxX, s.x); maxY = Math.max(maxY, s.y);
        });

        const pad = 100;
        const w = (maxX - minX) + pad * 2;
        const h = (maxY - minY) + pad * 2;
        const vbX = minX - pad;
        const vbY = minY - pad;

        const { lines, clusters } = this.physicsManager.calculateGeometry();

        let svg = `< svg xmlns = "http://www.w3.org/2000/svg" viewBox = "${vbX} ${vbY} ${w} ${h}" style = "background:#020205" >
            <rect x="${vbX}" y="${vbY}" width="${w}" height="${h}" fill="#020205" />`;

        // Lines
        lines.forEach(l => {
            const op = (1 - (l.dist / this.config.maxConnectDist)).toFixed(2);
            const [r, g, b] = this.hexToRgb(this.getStarColor(l.s1));
            svg += `< line x1 = "${l.s1.x}" y1 = "${l.s1.y}" x2 = "${l.s2.x}" y2 = "${l.s2.y}" stroke = "rgb(${r}, ${g}, ${b})" stroke - width="1.5" stroke - linecap="round" opacity = "${op * 0.8}" /> `;
        });

        // Labels
        clusters.forEach(c => {
            const name = String(c[0].clusterId);
            if (c.length < this.config.minGroupSize || name === String(c[0].id)) return;

            let cx = 0, cy = 0; c.forEach(s => { cx += s.x; cy += s.y }); cx /= c.length; cy /= c.length;
            const color = this.getStarColor(c[0]);
            svg += `< text x = "${cx}" y = "${cy + 30}" font - family="sans-serif" font - size="14" fill = "${color}" text - anchor="middle" font - weight="600" > ${name}</text > `;
        });

        // Stars
        this.stars.forEach(s => {
            const color = this.getStarColor(s);
            const r = this.config.starBaseRad * 1.5;

            // Star Shape
            const pr = r * 0.5;
            const pathData = `M${s.x} ${s.y - r} L${s.x + pr} ${s.y - pr} L${s.x + r} ${s.y} L${s.x + pr} ${s.y + pr} L${s.x} ${s.y + r} L${s.x - pr} ${s.y + pr} L${s.x - r} ${s.y} L${s.x - pr} ${s.y - pr} Z`;
            svg += `< path d = "${pathData}" fill = "${color}" opacity = "0.8" /> `;

            // Core dot
            svg += `< circle cx = "${s.x}" cy = "${s.y}" r = "1.5" fill = "white" /> `;
        });

        svg += `</svg > `;

        // FileSaver-style download for Chrome compatibility
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const filename = `AetherMap - ${Date.now()}.svg`;

        // Try using msSaveBlob for IE/Edge compatibility
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, filename);
            this.hudManager.showToast("Map Exported");
            return;
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        // Dispatch a real click event instead of calling click()
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        link.dispatchEvent(event);

        // Clean up after a delay
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 1000);

        this.hudManager.showToast("Map Exported");
    }

    // Download canvas as PNG image
    downloadPNG() {
        const filename = `Interstellar - ${Date.now()}.png`;
        const link = document.createElement('a');
        link.download = filename;
        link.href = this.canvas.toDataURL('image/png');

        // Dispatch a real click event for Chrome compatibility
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        link.dispatchEvent(event);

        this.hudManager.showToast("Image saved as " + filename);
    }

    // Trigger the hidden file input for loading SVG
    triggerLoadSVG() {
        document.getElementById('svgFileInput').click();
    }

    // Load and parse an SVG file to restore stars
    loadSVG(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const svgContent = e.target.result;
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgContent, 'image/svg+xml');

                // Find all path elements (stars)
                const pathElements = doc.querySelectorAll('path[fill][opacity]');

                if (pathElements.length === 0) {
                    this.hudManager.showToast("No stars found in SVG");
                    return;
                }

                // Clear current stars and history
                this.stars = [];
                this.history = [];

                // Parse each path to extract star data
                pathElements.forEach((path, index) => {
                    const d = path.getAttribute('d');
                    const fill = path.getAttribute('fill');

                    // Parse path: M{x} {y-r} L...
                    const match = d.match(/M([-\d.]+)\s+([-\d.]+)/);
                    if (match) {
                        const topX = parseFloat(match[1]);
                        const topY = parseFloat(match[2]);
                        const r = this.config.starBaseRad * 1.5;
                        const y = topY + r;

                        this.stars.push({
                            id: Date.now() + index,
                            x: topX,
                            y: y,
                            color: fill,
                            phase: Math.random() * Math.PI * 2,
                            clusterId: null
                        });
                    }
                });

                event.target.value = '';
                this.hudManager.showToast(`Loaded ${this.stars.length} stars`);
                this.renderManager.draw();
            } catch (err) {
                console.error('Error parsing SVG:', err);
                this.hudManager.showToast("Error loading SVG file");
            }
        };
        reader.readAsText(file);
    }

    // Export canvas animation as video
    exportVideo() {
        if (this._isRecording) {
            this.hudManager.showToast("Already recording...");
            return;
        }

        // Get selected duration
        const durationSelect = document.getElementById('videoDuration');
        const duration = durationSelect ? parseInt(durationSelect.value) : 5000;
        const durationSec = duration / 1000;

        this._isRecording = true;
        const btn = document.getElementById('exportVideoBtn');
        if (btn) btn.classList.add('active');

        this.hudManager.showToast(`Recording ${durationSec} seconds...`);

        const stream = this.canvas.captureStream(30);
        const chunks = [];

        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9'
            : 'video/webm';

        const recorder = new MediaRecorder(stream, { mimeType });

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
            this._isRecording = false;
            if (btn) btn.classList.remove('active');

            const blob = new Blob(chunks, { type: mimeType });
            const filename = `Interstellar - ${Date.now()}.webm`;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;

            // Dispatch a real click event for Chrome compatibility
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            link.dispatchEvent(event);

            // Clean up after a delay
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);

            this.hudManager.showToast("Video exported!");
        };

        recorder.onerror = (e) => {
            this._isRecording = false;
            if (btn) btn.classList.remove('active');
            console.error('Recording error:', e);
            this.hudManager.showToast("Recording failed");
        };

        recorder.start();

        setTimeout(() => {
            if (recorder.state === 'recording') {
                recorder.stop();
            }
        }, duration);
    }

    // === ADMIN PANEL FUNCTIONS ===
    toggleAdminPanel() {
        const panel = document.getElementById('adminPanel');
        if (panel) {
            panel.classList.toggle('hidden');
            this.updateAdminDebugInfo();
        }
    }

    initAdminPanel() {
        // Premium Toggle
        const premiumToggle = document.getElementById('adminPremiumToggle');
        if (premiumToggle) {
            premiumToggle.checked = this.isPro;
            premiumToggle.addEventListener('change', (e) => {
                this.isPro = e.target.checked;
                localStorage.setItem('isPro', this.isPro);
                this.hudManager.showToast(this.isPro ? "PREMIUM MODE ENABLED" : "PREMIUM MODE DISABLED");
                this.updateAdminDebugInfo();
            });
        }

        // Add Credits
        document.getElementById('adminAddCreditsBtn')?.addEventListener('click', () => {
            this.credits += 10000;
            this.hudManager.updateWalletUI();
            this.hudManager.showToast("ADDED $10,000 CREDITS");
        });

        // Add Minerals
        document.getElementById('adminAddMineralsBtn')?.addEventListener('click', () => {
            this.playerGems += 5000;
            localStorage.setItem('playerGems', this.playerGems);
            if (this.updateGemsUI) this.updateGemsUI();
            this.hudManager.showToast(`ADDED 5000 GEMS (Total: ${this.playerGems})`);
        });

        // Unlock Ships
        document.getElementById('adminUnlockShipsBtn')?.addEventListener('click', () => {
            const allPremium = ['saucer', 'harvester', 'viper', 'bulwark', 'prospector', 'spectre', 'nova', 'siphon', 'titan', 'pulse', 'flux', 'apex'];
            allPremium.forEach(id => {
                if (!this.unlockedShips.includes(id)) {
                    this.unlockedShips.push(id);
                }
            });
            localStorage.setItem('unlockedShips', JSON.stringify(this.unlockedShips));
            this.isPro = true;
            localStorage.setItem('isPro', 'true');
            if (premiumToggle) premiumToggle.checked = true;
            this.hudManager.showToast("ALL SHIPS UNLOCKED!");
        });

        // Close Button
        document.getElementById('adminCloseBtn')?.addEventListener('click', () => {
            document.getElementById('adminPanel').classList.add('hidden');
        });

        // Debug Info Updater
        if (this._adminInterval) clearInterval(this._adminInterval);
        this._adminInterval = setInterval(() => {
            const panel = document.getElementById('adminPanel');
            if (panel && !panel.classList.contains('hidden')) {
                this.updateAdminDebugInfo();
            }
        }, 1000);
    }

    updateAdminDebugInfo() {
        const debugEl = document.getElementById('adminDebugInfo');
        if (debugEl) {
            debugEl.innerHTML = `
                FPS: ${Math.round(1000 / (this.deltaTime || 16))}<br>
                Entities: ${this.stars.length + this.minerals.length}<br>
                Pos: ${Math.round(this.playerShip.x)}, ${Math.round(this.playerShip.y)}<br>
                Premium: ${this.isPro}
            `;
        }
    }

    setHangarColor(color) {
        this.playerShip.color = color;
        localStorage.setItem('playerShipColor', color);

        // Update UI state
        document.querySelectorAll('.color-option').forEach(el => {
            el.classList.toggle('active', el.getAttribute('data-color') === color);
        });

        const picker = document.getElementById('hangarColorPicker');
        if (picker && picker.value !== color) picker.value = color;

        // THEME UPDATE: Update GLOBAL CSS Variables
        // This ensures ALL UI elements (buttons, borders, text, shadows) update instantly
        const root = document.documentElement;
        const rgb = this.hexToRgbString(color);

        root.style.setProperty('--accent', color);
        root.style.setProperty('--accent-glow', `rgba(${rgb}, 0.5)`);
        root.style.setProperty('--glass-border', `rgba(${rgb}, 0.3)`);

        // Force re-render of current ship
        if (this.hangarShipIndex !== undefined) {
            this.renderHangarPreviews();
        }
    }

    // Helper for RGBA CSS string conversion (returns "r, g, b" string for CSS)
    hexToRgbString(hex) {
        if (!hex || typeof hex !== 'string') return '0, 243, 255';
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 243, 255';
    }

    // === PLANETARY LANDING & BASE BUILDING ===
    openBaseBuilder(planet) {
        if (!planet || planet.type !== 'terrestrial') return;
        this.flightMode = false;
        
        // Safety lock out game engine
        if (this.animationId) cancelAnimationFrame(this.animationId);
        
        const modal = document.getElementById('baseBuilderModal');
        if (modal) modal.style.display = 'flex';
        
        this.activeBasePlanet = planet;
        this.baseTool = 'hab';

        // Load or initialize base map (8x8 grid)
        this.spaceBase = JSON.parse(localStorage.getItem('spaceBase')) || {};
        
        this.drawBaseGrid();
        
        gameAudio.playMenuHover();
    }

    closeBaseBuilder() {
        const modal = document.getElementById('baseBuilderModal');
        if (modal) modal.style.display = 'none';
        
        this.activeBasePlanet = null;
        
        // Bounce player out of orbit so they don't immediately trigger it again
        if (this.playerShip) {
            this.playerShip.x -= 200;
            this.playerShip.vx = 0;
            this.playerShip.vy = 0;
        }

        // Restart loop
        this.toggleFlightMode();
        this.gameLoop();
        gameAudio.playMenuSelect();
    }

    selectBaseTool(tool) {
        this.baseTool = tool;
        ['hab', 'mine', 'def', 'erase'].forEach(t => {
            const el = document.getElementById('baseTool_' + t);
            if (el) el.classList.toggle('selected', t === tool);
        });
        gameAudio.playMenuHover();
    }

    // =====================================================
    // BASE PHASE 2: Collector + Defense Turret Mechanics
    // =====================================================
    updateSpaceBase() {
        if (!this.spaceBase || !this.spaceBase.isDeployed || this.spaceBase.isTowing) return;

        const now = Date.now();

        // --- COLLECTOR (⛏️ 'mine' tiles): Passive credit generation ---
        // Safer way to count tiles only from the 8x8 grid
        let collectorCount = 0;
        let turretCount = 0;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const type = this.spaceBase[`cell_${x}_${y}`];
                if (type === 'mine') collectorCount++;
                if (type === 'def') turretCount++;
            }
        }

        if (collectorCount > 0) {
            if (!this.spaceBase.lastCollectorTick) this.spaceBase.lastCollectorTick = now;
            const collectorInterval = 30000; // 30 seconds per tick
            if (now - this.spaceBase.lastCollectorTick >= collectorInterval) {
                const earned = collectorCount * 50; // 50 credits per collector per tick
                this.credits += earned;
                this.hudManager.updateWalletUI();
                this.collectionNotifications.push({
                    text: `⛏️ Base Collectors: +${earned} Credits`,
                    color: '#ffd700',
                    time: now
                });
                this.spaceBase.lastCollectorTick = now;
            }
        }

        // --- DEFENSE TURRET (🔫 'def' tiles): Auto-shoot nearby hostile ships ---
        // (turretCount is already calculated in the shared loop above)

        if (turretCount > 0 && this.enemyShips.length > 0) {
            if (!this.spaceBase.lastTurretFire) this.spaceBase.lastTurretFire = now;
            const turretFireRate = Math.max(500, 2000 / turretCount); // More turrets = faster fire

            if (now - this.spaceBase.lastTurretFire >= turretFireRate) {
                const baseX = this.spaceBase.x;
                const baseY = this.spaceBase.y;
                const turretRange = 800 + (turretCount * 100);

                // Find closest hostile enemy within range
                let closestEnemy = null;
                let closestDist = Infinity;
                for (const enemy of this.enemyShips) {
                    const isHostile = (this.factionRep[enemy.faction] || 0) < 0;
                    if (!isHostile) continue;
                    const d = Math.hypot(enemy.x - baseX, enemy.y - baseY);
                    if (d < turretRange && d < closestDist) {
                        closestDist = d;
                        closestEnemy = enemy;
                    }
                }

                if (closestEnemy) {
                    // Fire a turret bullet toward the enemy
                    const angle = Math.atan2(closestEnemy.y - baseY, closestEnemy.x - baseX);
                    const bulletSpeed = 10;
                    this.enemyBullets.push({
                        // Turret bullets use enemyBullets array but faction = 'terran' (friendly to player)
                        // They hit enemies via the existing faction cross-fire check
                        x: baseX + Math.cos(angle) * 30,
                        y: baseY + Math.sin(angle) * 30,
                        vx: Math.cos(angle) * bulletSpeed,
                        vy: Math.sin(angle) * bulletSpeed,
                        rotation: angle,
                        damage: 15 * turretCount,
                        life: Math.ceil(turretRange / bulletSpeed) + 5,
                        color: '#00ff88',
                        faction: 'terran', // Terran-friendly bullets won't damage player
                        width: 3,
                        length: 18,
                        fromTurret: true // Tag for rendering distinction
                    });
                    this.spaceBase.lastTurretFire = now;

                    // Visual flash on base
                    this.collectionNotifications.push({
                        text: `🔫 Base Turret fired!`,
                        color: '#00ff88',
                        time: now
                    });
                }
            }
        }
    }

    drawBaseGrid() {
        const grid = document.getElementById('baseGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const cellId = `cell_${x}_${y}`;
                const blockType = this.spaceBase[cellId];
                
                const cell = document.createElement('div');
                cell.className = 'base-cell';
                cell.style.cssText = `
                    width: 100%; height: 100%;
                    border: 1px dashed rgba(34,139,34,0.3);
                    background: ${blockType ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.2)'};
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    font-size: 18px; transition: all 0.2s;
                `;
                
                if (blockType === 'hab') cell.innerHTML = '🏠';
                else if (blockType === 'mine') cell.innerHTML = '⛏️';
                else if (blockType === 'def') cell.innerHTML = '🔫';
                
                cell.onmouseover = () => { cell.style.background = 'rgba(34,139,34,0.5)'; };
                cell.onmouseout = () => { cell.style.background = blockType ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.2)'; };
                cell.onclick = () => this.buildBaseBlock(cellId);
                
                grid.appendChild(cell);
            }
        }
    }

    buildBaseBlock(cellId) {
        const current = this.spaceBase[cellId];
        
        if (this.baseTool === 'erase') {
            if (current) {
                delete this.spaceBase[cellId];
                this.saveSpaceBase();
                this.hudManager.showToast("Structure demolished.");
                gameAudio.playMenuSelect();
            }
        } else {
            // Mapping for costs based on baseModules configuration
            const costMap = {
                hab: this.baseModules.hydroponics?.cost || 1000,
                mine: this.baseModules.refinery?.cost || 2000,
                def: this.baseModules.defense?.cost || 1500
            };
            
            const cost = costMap[this.baseTool] || 500;
            
            // Check costs (Standardize to this.credits)
            if (this.credits < cost) {
                this.hudManager.showToast(`Cannot Afford! Need ${cost.toLocaleString()} Credits.`, 2000, true);
                return;
            }
            
            this.credits -= cost;
            this.saveCredits();
            this.saveSpaceBase();
            this.hudManager.updateWalletUI();
            
            this.spaceBase[cellId] = this.baseTool;
            this.hudManager.showToast(`${this.baseTool.toUpperCase()} constructed ($${cost})`);
            gameAudio.playUpgrade();
        }
        
        this.drawBaseGrid(); 
    }

    // --- SAVE DATA SYSTEM ---
    exportSaveData() {
        const data = {};
        for(let i = 0; i < localStorage.length; i++){
            const k = localStorage.key(i);
            // Export game-relevant variables only
            if (['audioMuted', 'audioVolume', 'playerGems', 'unlockedShips', 'playerShipType', 
                 'playerShipColor', 'missionsCompleted', 'bossesDefeated', 'isPro', 'hudLayout',
                 'shipRotation', 'playerInventory', 'playerCredits', 'playerUpgrades', 
                 'carriedResources', 'spaceBase', 'trainingProgress', 'loginData', 'playerSkills', 'factionRep'].includes(k) || k.startsWith('windowLayout')) {
                 data[k] = localStorage.getItem(k);
            }
        }
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `interstellar_save_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (this.showToast) this.hudManager.showToast("🚀 Save Data Exported");
    }

    triggerImportSaveData() {
        let input = document.getElementById('saveDataInput');
        if (!input) {
            input = document.createElement('input');
            input.type = 'file';
            input.id = 'saveDataInput';
            input.accept = '.json';
            input.style.display = 'none';
            input.addEventListener('change', (e) => this.importDataFromFile(e));
            document.body.appendChild(input);
        }
        input.click();
    }

    importDataFromFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                Object.keys(data).forEach(k => {
                    localStorage.setItem(k, data[k]);
                });
                if (this.showToast) this.hudManager.showToast("✅ Save Imported! Reloading...");
                setTimeout(() => location.reload(), 1500);
            } catch (err) {
                console.error("Failed to import save data", err);
                if (this.showToast) this.hudManager.showToast("❌ Error: Invalid save file.");
            }
        };
        reader.readAsText(file);
    }
}


window.game = new InterstellarEngine();
window.app = window.game; // Bridge for HTML handlers
