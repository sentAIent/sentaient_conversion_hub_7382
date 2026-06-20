// Interstellar Game Engine
// Restored Mindwave Lotus Features
(function() {
    const resumeAudio = () => {
        if (window.gameAudio && window.gameAudio.ctx && window.gameAudio.ctx.state === 'suspended') {
            window.gameAudio.ctx.resume();
        }
    };
    document.addEventListener('click', resumeAudio, { capture: true, passive: true });
    document.addEventListener('keydown', resumeAudio, { capture: true, passive: true });
})();
console.log("🚀 INTERSTELLAR ENGINE V3.1 - Mindwave Lotus Restoration Active");
console.log("🌸 Lotus Rendering: Tribal Sun + Petals enabled.");

/**
 * InterstellarEngine - Core Game Class
v5.0 - Pre-Placement Color Model
 */

// === PROCEDURAL AUDIO ENGINE ===
import { AudioEngine } from './audio.js?v=ray_fix_v35';
import * as Utils from './utils.js';

window.gameAudio = new AudioEngine();

// Track user interaction to prevent navigator.vibrate intervention warnings
window.hasUserInteracted = false;
window.addEventListener('mousedown', () => window.hasUserInteracted = true, { once: true });
window.addEventListener('keydown', () => window.hasUserInteracted = true, { once: true });
window.addEventListener('touchstart', () => window.hasUserInteracted = true, { once: true });

// --- HAPTIC FEEDBACK UTILITY ---
window.hapticFeedback = function(pattern) {
    if (!window.hasUserInteracted) return; // Prevent browser intervention warnings
    if (window.game && window.game.settings && !window.game.settings.haptics) return;
    if (navigator.vibrate) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            console.log('Haptics not supported or blocked');
        }
    }
};

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
        this.lotusImage.src = '../mindwave-logo-icon.png';
        
        // Load Sun images
        this.tribalSunImage = new Image();
        this.tribalSunImage.src = 'tribal-sun.png';
        this.svgSunImage = new Image();
        this.svgSunImage.src = 'svg-sun.svg';

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
        this.matrixSpeedMultiplier = 0.1; // User-adjustable cyber speed
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
        this.topZIndex = 1000;
        this.credits = this.loadCredits();
        this.playerGems = parseInt(localStorage.getItem('playerGems')) || 0;
        this.playerInventory = this.loadInventory();
        this.carriedResources = this.loadCarriedResources();
        // Ship Upgrades
        this.upgrades = { health: 1, speed: 1, weapons: 1, cargo: 1, radar: 1 };
        const savedUpgrades = this.loadUpgrades();
        if (savedUpgrades) {
            this.upgrades = { ...this.upgrades, ...savedUpgrades };
        }

        // Pilot Statistics
        this.playerStats = this.loadStats();

        // Modular Equipment Database
        this.equipmentDB = {
            weapons: {
                basic_laser: { name: "Basic Laser", type: "weapon", damage: 10, speed: 20, cooldown: 10, color: "#00f3ff", cost: 0, description: "Standard plasma emitter." },
                plasma_cannon: { name: "Plasma Cannon", type: "weapon", damage: 25, speed: 15, cooldown: 20, color: "#ff00ff", cost: 500, description: "High-damage, slow-firing plasma burst." },
                rapid_blaster: { name: "Rapid Blaster", type: "weapon", damage: 5, speed: 25, cooldown: 5, color: "#ffff00", cost: 1000, description: "High rate of fire, low damage." },
                missile_pod: { name: "Missile Pod", type: "weapon", damage: 40, speed: 10, cooldown: 60, color: "#ff5500", cost: 2500, description: "Fires seeking missiles." }
            },
            engine: {
                basic_engine: { name: "Basic Engine", type: "engine", maxSpeedBonus: 0, accelBonus: 0, cost: 0, description: "Standard propulsion system." },
                ion_thruster: { name: "Ion Thruster", type: "engine", maxSpeedBonus: 20, accelBonus: 0.2, cost: 1500, description: "Increases top speed and acceleration." },
                warp_drive: { name: "Warp Drive", type: "engine", maxSpeedBonus: 50, accelBonus: 0.5, cost: 5000, description: "State of the art propulsion." }
            },
            shield: {
                basic_shield: { name: "Basic Shield", type: "shield", capacity: 100, rechargeRate: 0.1, cost: 0, description: "Standard deflector shield." },
                advanced_shield: { name: "Advanced Shield", type: "shield", capacity: 250, rechargeRate: 0.2, cost: 2000, description: "High-capacity energy shield." },
                fortress_shield: { name: "Fortress Shield", type: "shield", capacity: 500, rechargeRate: 0.5, cost: 8000, description: "Military-grade deflection barrier." }
            },
            wings: {
                basic_wings: { name: "Standard Wings", type: "wings", rotationBonus: 0, cost: 0, description: "Standard aerodynamic wings." },
                delta_wings: { name: "Delta Wings", type: "wings", rotationBonus: 0.05, cost: 1200, description: "Increases turn speed significantly." },
                x_wings: { name: "X-Wings", type: "wings", rotationBonus: 0.1, cost: 3000, description: "Superior maneuverability." }
            },
            radar: {
                basic_radar: { name: "Basic Radar", type: "radar", range: 1500, mapVisibility: false, cost: 0, description: "Standard proximity radar." },
                advanced_radar: { name: "Advanced Radar", type: "radar", range: 3000, mapVisibility: true, cost: 1000, description: "Extended range, shows enemies on Map." },
                deep_space_radar: { name: "Deep Space Radar", type: "radar", range: 6000, mapVisibility: true, cost: 4000, description: "Massive range, full Map awareness." }
            }
        };

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
            equipment: {
                weapons: ['basic_laser', null, null, null, null],
                engine: 'basic_engine',
                shield: 'basic_shield',
                wings: ['basic_wings', 'basic_wings'],
                radar: 'basic_radar'
            },
            // Ability State
            lastDamageTime: 0,
            boostActive: false,
            boostStartTime: 0,
            isCloaked: false,
            lastPulseTime: 0
        };

        this.calculateShipStats();

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
        this.powerUps = []; // Added for Power-Ups & Consumables
        this.mineralTypes = {
            // ============ INDUSTRIAL ZONE (50% spawn rate in industrial galaxies) ============
            iron: { name: 'Iron', value: 10, color: '#8B8680', rarity: 'common', size: 15, zone: 'industrial', use: 'Basic construction' },
            copper: { name: 'Copper', value: 25, color: '#B87333', rarity: 'common', size: 15, zone: 'industrial', use: 'Wiring, conductors' },
            coal: { name: 'Coal', value: 15, color: '#36454F', rarity: 'common', size: 12, zone: 'industrial', use: 'Fuel source' },
            titanium: { name: 'Titanium', value: 80, color: '#878681', rarity: 'common', size: 16, zone: 'industrial', use: 'Armor plating' },
            silicon: { name: 'Silicon', value: 45, color: '#A0A0A0', rarity: 'common', size: 14, zone: 'industrial', use: 'Electronics, circuits' },

            // ============ PRECIOUS ZONE (25% spawn rate in precious galaxies) ============
            silver: { name: 'Silver', value: 150, color: '#C0C0C0', rarity: 'uncommon', size: 18, zone: 'precious', use: 'Currency, conductors' },
            gold: { name: 'Gold', value: 400, color: '#FFD700', rarity: 'uncommon', size: 20, zone: 'precious', use: 'Electronics, currency' },
            platinum: { name: 'Platinum', value: 500, color: '#E5E4E2', rarity: 'uncommon', size: 20, zone: 'precious', use: 'Catalysts, jewelry' },
            palladium: { name: 'Palladium', value: 600, color: '#CED0DD', rarity: 'uncommon', size: 19, zone: 'precious', use: 'Fuel cells, catalysts' },

            // ============ CRYSTAL ZONE (15% spawn rate in crystal galaxies) ============
            quartz: { name: 'Quartz', value: 800, color: '#F5F5F5', rarity: 'rare', size: 22, zone: 'crystal', use: 'Optics, sensors' },
            diamond: { name: 'Diamond', value: 2500, color: '#B9F2FF', rarity: 'rare', size: 25, zone: 'crystal', use: 'Cutting tools, lasers' },
            emerald: { name: 'Emerald', value: 3000, color: '#50C878', rarity: 'rare', size: 25, zone: 'crystal', use: 'Energy focusing' },
            ruby: { name: 'Ruby', value: 2800, color: '#E0115F', rarity: 'rare', size: 25, zone: 'crystal', use: 'Laser amplification' },
            sapphire: { name: 'Sapphire', value: 3200, color: '#0F52BA', rarity: 'rare', size: 25, zone: 'crystal', use: 'Shield technology' },

            // ============ NUCLEAR ZONE (7% spawn rate near black holes) ============
            uranium: { name: 'Uranium', value: 8000, color: '#4AFF00', rarity: 'epic', size: 28, zone: 'nuclear', use: 'Nuclear reactors' },
            plutonium: { name: 'Plutonium', value: 12000, color: '#00FF7F', rarity: 'epic', size: 28, zone: 'nuclear', use: 'Advanced power' },
            helium3: { name: 'Helium-3', value: 15000, color: '#87CEEB', rarity: 'epic', size: 26, zone: 'nuclear', use: 'Fusion reactors' },

            // ============ EXOTIC ZONE (3% spawn rate - edge of space) ============
            neodymium: { name: 'Neodymium', value: 25000, color: '#FF6EC7', rarity: 'legendary', size: 30, zone: 'exotic', use: 'Magnet tech' },
            lanthanum: { name: 'Lanthanum', value: 30000, color: '#9D00FF', rarity: 'legendary', size: 32, zone: 'exotic', use: 'Hybrid engines' },
            darkmatter: { name: 'Dark Matter', value: 100000, color: '#1a0033', rarity: 'mythic', size: 35, zone: 'exotic', use: 'Warp drives' },
            antimatter: { name: 'Antimatter', value: 150000, color: '#FF00FF', rarity: 'mythic', size: 35, zone: 'exotic', use: 'Annihilation power' },
            lotus: { name: 'Mindwave Lotus', value: 500000, color: '#ff69b4', rarity: 'transcendental', size: 40, zone: 'all', use: 'Ultimate Enlightenment' }
        };

        // Galaxy zone configuration - determines element distribution
        this.galaxyZones = {
            industrial: {
                name: 'Industrial Sector',
                color: '#8B8680',
                glowColor: 'rgba(139, 134, 128, 0.3)',
                elements: ['iron', 'copper', 'coal', 'titanium', 'silicon'],
                concentrationBonus: 3.0,
                defenseLevel: 1,
                distanceRange: { min: 100, max: 800 }
            },
            precious: {
                name: 'Precious Nebula',
                color: '#FFD700',
                glowColor: 'rgba(255, 215, 0, 0.3)',
                elements: ['silver', 'gold', 'platinum', 'palladium'],
                concentrationBonus: 2.5,
                defenseLevel: 2,
                distanceRange: { min: 800, max: 2000 }
            },
            crystal: {
                name: 'Crystal Fields',
                color: '#50C878',
                glowColor: 'rgba(80, 200, 120, 0.3)',
                elements: ['quartz', 'diamond', 'emerald', 'ruby', 'sapphire'],
                concentrationBonus: 2.0,
                defenseLevel: 3,
                distanceRange: { min: 2000, max: 4000 }
            },
            nuclear: {
                name: 'Radiation Belt',
                color: '#4AFF00',
                glowColor: 'rgba(74, 255, 0, 0.4)',
                elements: ['uranium', 'plutonium', 'helium3'],
                concentrationBonus: 1.5,
                defenseLevel: 4,
                distanceRange: { min: 3500, max: 5000 }
            },
            exotic: {
                name: 'Dark Frontier',
                color: '#9D00FF',
                glowColor: 'rgba(157, 0, 255, 0.4)',
                elements: ['neodymium', 'lanthanum', 'darkmatter', 'antimatter'],
                concentrationBonus: 1.0,
                defenseLevel: 5,
                distanceRange: { min: 5000, max: 8000 }
            }
        };

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
        this.generateResourceDeposits();

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
            { id: 'apex', name: 'APEX', model: 'Overclocker', speed: 100, armor: 'Cyber', power: 'Overclock', desc: 'Pushing boundaries of digital integration for peak performance.', premium: true },
            { id: 'valkyrie', name: 'VALKYRIE', model: 'Strike Fighter', speed: 135, armor: 'Aero', power: 'Ion Trail', desc: 'Swept-wing fighter with twin trailing ion engines. Extremely fast.', premium: true },
            { id: 'leviathan', name: 'LEVIATHAN', model: 'Dreadnought', speed: 45, armor: 'Titanium+', power: 'Broadside', desc: 'A massive, blocky heavy cruiser with glowing side-thrusters.', premium: true },
            { id: 'wraith', name: 'WRAITH', model: 'Stealth Bomber', speed: 110, armor: 'Radar-Absorbent', power: 'Invisibility', desc: 'Pitch-black angular stealth craft with glowing red micro-thrusters.', premium: true },
            { id: 'pulsar', name: 'PULSAR', model: 'Energy Frigate', speed: 100, armor: 'Plasma', power: 'EMP Blast', desc: 'A central glowing energy ring flanked by stabilizing nacelles.', premium: true },
            { id: 'nomad', name: 'NOMAD', model: 'Deep Explorer', speed: 90, armor: 'Medium', power: 'Sensor Sweep', desc: 'Modular-looking vessel with distinct command bridge and rotating dishes.', premium: true },
            { id: 'eclipse', name: 'ECLIPSE', model: 'Prototype', speed: 125, armor: 'Nano-Carbon', power: 'Dark Energy', desc: 'Highly curved saucer-like stealth ship with flowing neon light strips.', premium: true },
            { id: 'hyperion', name: 'HYPERION', model: 'Assault Carrier', speed: 75, armor: 'Heavy', power: 'Drone Swarm', desc: 'Wide-bodied aggressive carrier with visible launch bays.', premium: true },
            { id: 'archangel', name: 'ARCHANGEL', model: 'Apex Fighter', speed: 140, armor: 'Hard-Light', power: 'Holy Fire', desc: 'Pure white and gold vessel with sweeping angelic hard-light wings.', premium: true }
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
            this.showToast("Failed to load templates");
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
        this.showToast(`Loaded ${key} template`);
        this.draw();
    }

    initNameGenerators() {
        this.prefixes = ["Alpha", "Beta", "Gamma", "Delta", "Neo", "Proto", "Hyper", "Cyber", "Dark", "Lost", "Royal", "Azure", "Crimson", "Void", "Solar", "Lunar", "Emerald", "Obsidian"];
        this.roots = ["Orion", "Cygnus", "Draco", "Lyra", "Vela", "Hydra", "Cetus", "Lupus", "Pavo", "Volans", "Aries", "Leo", "Gemini", "Ursa", "Vortex", "Helix", "Prism", "Shard", "Echo", "Serpens", "Phoenix"];
        this.suffixes = ["Major", "Minor", "Prime", "Zero", "Cluster", "Nebula", "Expanse", "Quadrant", "Sector", "Knot", "Web", "Crown", "Trident", "Gate", "Symphony", "Paradox"];
    }

    init() {
        window.game = this; // Expose for debugging
        window.addEventListener('resize', () => this.resize());
        
        if (window.logGameEvent) window.logGameEvent('game_start');
        
        this.checkDailyLogin();
        this.checkOfflineProgression();
        this.requestNotificationPermission();
        
        // Track last active time & check achievements
        setInterval(() => {
            localStorage.setItem('lastActiveTime', Date.now().toString());
            this.checkAchievements();
        }, 10000);

        // App Store Polish: Handle App Backgrounding
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause game if in flight mode and not already paused
                if (this.flightMode && !this.gamePaused) {
                    this.togglePause();
                }
                // Suspend audio context to save battery and mute audio
                if (window.gameAudio && window.gameAudio.ctx) {
                    window.gameAudio.ctx.suspend().catch(e => console.warn(e));
                }
                
                // Schedule local push notification for offline earnings reminder
                if ('Notification' in window && Notification.permission === 'granted') {
                    // Note: True background push requires a Service Worker. We simulate with a timeout if the browser keeps the tab alive, otherwise this serves as a foundation for a SW later.
                    if (this.spaceBase && this.spaceBase.isDeployed) {
                        this._notificationTimeout = setTimeout(() => {
                            new Notification('Interstellar Base Report', {
                                body: 'Your Space Base has collected Offline Gems! Come back and claim them.',
                                icon: '/icon-192x192.png' // Adjust path if needed
                            });
                        }, 1000 * 60 * 60); // 1 hour
                    }
                }
            } else {
                // Resume audio context
                if (window.gameAudio && window.gameAudio.ctx) {
                    window.gameAudio.ctx.resume().catch(e => console.warn(e));
                }
            }
        });


        // Load Pro State
        this.isPro = localStorage.getItem('isPro') === 'true';
        this.loadSettings();
        this.initAdminPanel();
        this.initMusicUI();

        // Pointer Events (CORRECT - these functions exist!)
        this.canvas.addEventListener('pointerdown', e => this.onPointerDown(e));
        window.addEventListener('pointermove', e => this.onPointerMove(e));
        window.addEventListener('pointerup', e => this.onPointerUp(e));
        this.canvas.addEventListener('wheel', e => {
            console.log('[Zoom Event] Wheel event fired');
            this.onWheel(e);
        }, { passive: false });
        this.canvas.addEventListener('contextmenu', e => this.onRightClick(e)); // Right-click deletion
        
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.style.setProperty('display', 'none', 'important');
            }
        });


        window.addEventListener('keydown', e => {
            const activeTag = document.activeElement && document.activeElement.tagName ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag === 'input' || activeTag === 'textarea') return;
            
            const key = e.key.toLowerCase();
            this.keysPressed[key] = true;

            // Undo shortcut
            if ((e.ctrlKey || e.metaKey) && key === 'z') {
                e.preventDefault();
                this.undo();
                return;
            }

            if (key === 'escape' || key === 'p') {
                this.togglePause();
                e.preventDefault();
                return;
            } else if (key === 'x') {
                this.toggleFlightMode();
                e.preventDefault();
                return;
            }

            // Flight mode specific controls
            if (this.flightMode) {
                if (key === 'u') {
                    this.toggleUpgradePanel();
                } else if (key === 'i') {
                    this.toggleStatusWindow();
                } else if (key === 'b') {
                    if (!this.spaceBase.isDeployed) {
                        this.deployBase();
                    } else {
                        this.toggleBasePanel();
                    }
                } else if (key === 't') {
                    this.toggleTowing();
                } else if (key === 'z') {
                    if (this.isNearBase()) {
                        this.depositAllResources();
                    } else {
                        this.showToast('⚠️ Get closer to base to deposit!');
                    }
                } else if (key === 'k') {
                    this.toggleSkillTree();
                } else if (key === 'v') {
                    this.triggerViperBoost();
                } else if (key === 'c') {
                    this.toggleSpectreCloak();
                } else if (key === 'p') {
                    this.triggerPulsePing();
                } else if (key === 'o') {
                    this.triggerApexOverclock();
                } else if (key === 'g') {
                    this.fireDecoyFlare();
                } else if (key === '1') {
                    this.triggerGlobalEMP();
                } else if (key === '2') {
                    this.triggerGlobalAfterburner();
                } else if (key === '3') {
                    this.triggerGlobalQuantumJump();
                }
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', e => {
            const activeTag = document.activeElement && document.activeElement.tagName ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag === 'input' || activeTag === 'textarea') return;
            
            const key = e.key.toLowerCase();
            this.keysPressed[key] = false;

            // CLEAR ENGINE DISABLE on key release (Requires re-press to re-engage)
            if (key === 'w' || key === 's' || key === 'arrowup' || key === 'arrowdown') {
                if (this.playerShip) this.playerShip.enginesDisabled = false;
            }
        });
        // Initial mode setup
        this.setMode('draw');
        // Initial color state setup
        this.updateColorModeUI();

        // Cyber speed slider
        this.matrixColorCustomized = false;

        // UI Events
        this.initWindowSystem();

        // Apply saved HUD layout 
        setTimeout(() => this.setLayout(localStorage.getItem('hudLayout') || 'horizontal'), 500);

        // Initialize kbd tooltips for flight controls
        this.initKbdTooltips();

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
        this.initJoystick();

        // Trigger initial background generation
        this.resize();

        // Initial UI population
        this.updateWalletUI();
        this.updateInventoryUI();
        if (this.updateGemsUI) this.updateGemsUI();
        this.updateShipStatus();
        this.updateMap();

        // First-login tracking & onboarding
        this.checkFirstLogin();

        this.initGlowSprites(); // Pre-build glow sprite cache before first render frame
        this.animate = this.animate.bind(this);
        
        // --- HIDE MAJESTIC SPLASH LOADER ---
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            const loadingProgressBar = document.getElementById('loadingProgressBar');
            const loadingLog = document.getElementById('loadingLog');
            const loadingPrompt = document.getElementById('loadingPrompt');

            if (loadingProgressBar) loadingProgressBar.style.width = '100%';
            if (loadingLog) loadingLog.textContent = "SYSTEMS ONLINE";
            if (loadingPrompt) {
                loadingPrompt.style.opacity = '1';
                // Add click handler to start the game
                loadingPrompt.onclick = () => {
                    if (window.gameAudio && window.gameAudio.init) {
                        window.gameAudio.init(); // Initialize Audio Context on user interaction synchronously
                    }
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 1500);
                };
            } else {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1500);
            }
        }

        requestAnimationFrame(this.animate);
    }

    togglePause() {
        if (!this.flightMode) {
            this.gamePaused = false;
            const pb = document.getElementById('pauseBtn');
            if (pb) pb.innerHTML = '⏸️ <span class="hide-mobile">PAUSE</span>';
            return;
        }
        this.gamePaused = !this.gamePaused;
        const pb = document.getElementById('pauseBtn');
        if (this.gamePaused) {
            this.showToast('⏸️ Game Paused');
            this.pauseStartTime = Date.now();
            if (pb) pb.innerHTML = '▶️ <span class="hide-mobile">RESUME</span>';
            if (window.gameAudio) window.gameAudio.stopEngineHum();
        } else {
            this.showToast('▶️ Game Resumed');
            if (this.pauseStartTime) {
                const delta = Date.now() - this.pauseStartTime;
                if (this.hazardEffect && this.hazardEffect.startTime) this.hazardEffect.startTime += delta;
                if (this.playerShip && this.playerShip.lastFlareRefill) this.playerShip.lastFlareRefill += delta;
                if (this.empActive && this.empStartTime) this.empStartTime += delta;
                if (this.quantumJump && this.quantumJump.startTime) this.quantumJump.startTime += delta;
            }
            if (pb) pb.innerHTML = '⏸️ <span class="hide-mobile">PAUSE</span>';
            if (window.gameAudio && !window.gameAudio.engineHumMuted) window.gameAudio.startEngineHum();
        }
    }

    // Mobile Controls
    toggleMobileControls() {
        const joy = document.getElementById('joystick-container');
        if (joy) {
            joy.style.display = joy.style.display === 'none' ? 'block' : 'none';
        }
    }

    initJoystick() {
        const base = document.getElementById('joystick-base');
        const stick = document.getElementById('joystick-stick');
        const container = document.getElementById('joystick-container');

        // Show joystick on init if likely mobile
        // We default to hidden in CSS, but check here
        if (window.innerWidth <= 768 && container) {
            container.style.display = 'block';
            this.joystickActive = true;
        }

        if (!base || !stick) return;

        let startX = 0, startY = 0;
        let moveX = 0, moveY = 0;
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
                dx = (dx / Math.max(0.1, dist)) * maxDist;
                dy = (dy / Math.max(0.1, dist)) * maxDist;
            }

            stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

            // Normalize -1 to 1
            this.joyInputX = dx / maxDist;
            this.joyInputY = dy / maxDist;
        };

        const handleEnd = (e) => {
            e.preventDefault();
            this.joystickActive = false;
            this.joyInputX = 0;
            this.joyInputY = 0;
            stick.style.transform = `translate(-50%, -50%)`;
        };

        base.addEventListener('touchstart', handleStart, { passive: false });
        base.addEventListener('touchmove', handleMove, { passive: false });
        base.addEventListener('touchend', handleEnd, { passive: false });

        // Also mouse for testing
        base.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Regenerate screen-space background (static stars) to ensure coverage
        this.staticStars = [];
        this.generateStaticStars();

        this.draw();

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
    }

    initWindowSystem() {
        const windows = document.querySelectorAll('.cockpit-section, .floating-window, .popup-panel');
        
        windows.forEach(win => {
            if (!win.id) return;
            
            // 1. Restore state
            localStorage.removeItem('windowState_' + win.id);
            const savedState = null;
            if (savedState) {
                try {
                    const state = JSON.parse(savedState);
                    win.style.position = 'fixed';
                    if (state.left !== undefined) win.style.left = state.left;
                    if (state.top !== undefined) win.style.top = state.top;
                    if (state.width !== undefined) win.style.width = state.width;
                    if (state.height !== undefined) win.style.height = state.height;
                    win.style.bottom = 'auto';
                    win.style.right = 'auto';
                    if (state.zIndex) {
                        win.style.zIndex = state.zIndex;
                        if (parseInt(state.zIndex) > this.topZIndex) this.topZIndex = parseInt(state.zIndex);
                    }
                } catch(e) {}
            }

            // Bring to front on click anywhere in window
            win.addEventListener('mousedown', () => {
                this.topZIndex++;
                win.style.zIndex = this.topZIndex;
                this.saveWindowState(win);
            }, true); // use capture to fire early

            // 2. Setup Draggable Header
            const header = win.querySelector('.window-header, .cockpit-header');
            if (header) {
                header.style.cursor = 'grab';
                let isDragging = false;
                let startX, startY, initialLeft, initialTop;

                header.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    header.style.cursor = 'grabbing';
                    
                    const rect = win.getBoundingClientRect();
                    win.style.position = 'fixed';
                    win.style.left = rect.left + 'px';
                    win.style.top = rect.top + 'px';
                    win.style.bottom = 'auto';
                    win.style.right = 'auto';

                    startX = e.clientX;
                    startY = e.clientY;
                    initialLeft = parseInt(win.style.left) || win.getBoundingClientRect().left;
                    initialTop = parseInt(win.style.top) || win.getBoundingClientRect().top;
                    
                    e.preventDefault(); 
                });

                window.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    const zoom = parseFloat(getComputedStyle(win).zoom || 1);
                    let newLeft = initialLeft + (e.clientX - startX) / zoom;
                    let newTop = initialTop + (e.clientY - startY) / zoom;
                    
                    const minVisible = 50;
                    newLeft = Math.max(-win.offsetWidth + minVisible, Math.min(window.innerWidth / zoom - minVisible, newLeft));
                    newTop = Math.max(0, Math.min(window.innerHeight / zoom - minVisible, newTop));
                    
                    win.style.left = newLeft + 'px';
                    win.style.top = newTop + 'px';
                });

                window.addEventListener('mouseup', () => {
                    if (isDragging) {
                        isDragging = false;
                        header.style.cursor = 'grab';
                        this.saveWindowState(win);
                    }
                });
                
                header.addEventListener('dblclick', () => {
                    win.classList.toggle('collapsed');
                });
            }

            // 3. Setup 8-Directional Resize Handles
            const handleDirs = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
            
            handleDirs.forEach(dir => {
                let handle = win.querySelector('.resize-' + dir);
                if (!handle) {
                    handle = document.createElement('div');
                    handle.className = 'resize-' + dir;
                    win.appendChild(handle);
                }

                let isResizing = false;
                let startRx, startRy, startWidth, startHeight, startLeft, startTop;

                handle.addEventListener('mousedown', (e) => {
                    isResizing = true;
                    startRx = e.clientX;
                    startRy = e.clientY;
                    
                    const flightHud = document.getElementById('flightHUD');
                    const zoom = flightHud ? parseFloat(getComputedStyle(flightHud).zoom || 1) : 1;

                    // Let browser compute exact screen positions
                    const rect = win.getBoundingClientRect();
                    let currentLeft = rect.left / zoom;
                    let currentTop = rect.top / zoom;
                    
                    if (getComputedStyle(win).position !== 'fixed' || win.style.right !== 'auto' || win.style.bottom !== 'auto') {
                        // Create placeholder for static elements
                        if (getComputedStyle(win).position !== 'fixed' && win.parentNode && win.parentNode.classList && 
                           (win.parentNode.classList.contains('left-column') || win.parentNode.classList.contains('right-column') || 
                            win.parentNode.classList.contains('bottom-left') || win.parentNode.classList.contains('bottom-right'))) {
                            const placeholder = document.createElement('div');
                            placeholder.style.width = win.offsetWidth + 'px';
                            placeholder.style.height = win.offsetHeight + 'px';
                            placeholder.style.flex = getComputedStyle(win).flex;
                            placeholder.classList.add('drag-placeholder');
                            win.parentNode.insertBefore(placeholder, win);
                        }

                        win.style.position = 'fixed';
                        win.style.left = currentLeft + 'px';
                        win.style.top = currentTop + 'px';
                        win.style.bottom = 'auto';
                        win.style.right = 'auto';
                        win.style.margin = '0';
                    }

                    // Use offset properties which correctly map to the CSS values
                    startWidth = win.offsetWidth;
                    startHeight = win.offsetHeight;
                    startLeft = win.offsetLeft;
                    startTop = win.offsetTop;

                    e.preventDefault();
                    e.stopPropagation();
                });

                window.addEventListener('mousemove', (e) => {
                    if (!isResizing) return;
                    
                    const flightHud = document.getElementById('flightHUD');
                    let zoom = 1;
                    if (flightHud) {
                        zoom = parseFloat(getComputedStyle(flightHud).zoom || 1);
                    }

                    const dx = (e.clientX - startRx) / zoom;
                    const dy = (e.clientY - startRy) / zoom;

                    let newWidth = startWidth;
                    let newHeight = startHeight;
                    let newLeft = startLeft;
                    let newTop = startTop;

                    const minWidth = Math.max(150, parseFloat(getComputedStyle(win).minWidth) || 150);
                    const minHeight = Math.max(100, parseFloat(getComputedStyle(win).minHeight) || 100);

                    if (dir.includes('e')) {
                        newWidth = Math.max(minWidth, startWidth + dx);
                    }
                    if (dir.includes('s')) {
                        newHeight = Math.max(minHeight, startHeight + dy);
                    }
                    if (dir.includes('w')) {
                        const maxDx = startWidth - minWidth;
                        const actualDx = Math.min(dx, maxDx);
                        newWidth = startWidth - actualDx;
                        newLeft = startLeft + actualDx;
                    }
                    if (dir.includes('n')) {
                        const maxDy = startHeight - minHeight;
                        const actualDy = Math.min(dy, maxDy);
                        newHeight = startHeight - actualDy;
                        newTop = startTop + actualDy;
                    }

                    // Bounds checking
                    newWidth = Math.min(window.innerWidth / zoom - 20, newWidth);
                    newHeight = Math.min(window.innerHeight / zoom - 20, newHeight);
                    newLeft = Math.max(0, newLeft);
                    newTop = Math.max(0, newTop);

                    win.style.setProperty('width', newWidth + 'px', 'important');
                    win.style.setProperty('height', newHeight + 'px', 'important');
                    win.style.setProperty('max-width', 'none', 'important');
                    win.style.setProperty('max-height', 'none', 'important');
                    win.style.left = newLeft + 'px';
                    win.style.top = newTop + 'px';
                });

                window.addEventListener('mouseup', () => {
                    if (isResizing) {
                        isResizing = false;
                        this.saveWindowState(win);
                    }
                });
            });
});
    }

    saveWindowState(win) {
        if (!win.id) return;
        const state = {
            left: win.style.left,
            top: win.style.top,
            width: win.style.width,
            height: win.style.height,
            zIndex: win.style.zIndex
        };
        localStorage.setItem('windowState_' + win.id, JSON.stringify(state));
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
    // Utilities moved to utils.js

    setFixedColor(hexColor) {
        this.activeColor = hexColor;
        this.colorMode = 'fixed';
        this.updateColorModeUI();
        this.showToast(`Active color set to ${hexColor} `);
    }

    setRainbowMode() {
        this.colorMode = 'rainbow';
        this.updateColorModeUI();
        this.showToast("Active color set to Rainbow Mode 🌈");
    }

    // ===== PROCEDURAL UNIVERSE GENERATION =====

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
                    this.generateSector(sx, sy);
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

    generateSector(sectorX, sectorY) {
        const key = `${sectorX},${sectorY} `;
        if (this.loadedSectors.has(key)) return;

        // console.log(`[Universe] Generating sector(${sectorX}, ${sectorY})`);

        const seed = this.getSectorSeed(sectorX, sectorY);
        const sectorData = { x: sectorX, y: sectorY, minerals: [], deposits: [] };

        const minX = sectorX * this.sectorSize;
        const maxX = (sectorX + 1) * this.sectorSize;
        const minY = sectorY * this.sectorSize;
        const maxY = (sectorY + 1) * this.sectorSize;

        const mineralCount = Math.floor(100 + this.seededRandom(seed + 1) * 200);
        for (let i = 0; i < mineralCount; i++) {
            const s = seed + i * 1000;
            const x = minX + this.seededRandom(s) * this.sectorSize;
            const y = minY + this.seededRandom(s + 1) * this.sectorSize;
            const dist = Math.hypot(x, y);

            let type = 'iron';
            const r = this.seededRandom(s + 2);
            if (dist < 1000) type = ['iron', 'copper', 'coal', 'titanium', 'silicon'][Math.floor(r * 5)];
            else if (dist < 3000) type = ['silver', 'gold', 'platinum', 'palladium'][Math.floor(r * 4)];
            else if (dist < 6000) type = ['quartz', 'diamond', 'emerald', 'ruby', 'sapphire'][Math.floor(r * 5)];
            else if (dist < 10000) type = ['uranium', 'plutonium', 'helium3'][Math.floor(r * 3)];
            else type = ['neodymium', 'lanthanum', 'darkmatter', 'antimatter'][Math.floor(r * 4)];

            const info = this.mineralTypes[type];
            if (!info) continue;

            const mineral = { x, y, type, color: info.color, size: info.size, value: info.value };
            this.minerals.push(mineral);
            sectorData.minerals.push(mineral);
        }

        // --- PROCEDURAL HAZARDS ---
        sectorData.hazards = { mines: [], turrets: [], blackHoles: [] };
        const hazardSeed = seed + 1000000;
        const dist = Math.hypot(sectorX * this.sectorSize, sectorY * this.sectorSize);

        // 1. Mines (abundant in Nuclear zones)
        let mineProb = 0.1;
        if (dist >= 5000) mineProb = 0.4;
        if (this.seededRandom(hazardSeed) < mineProb) {
            const mCount = Math.floor(1 + this.seededRandom(hazardSeed + 1) * 5);
            for (let i = 0; i < mCount; i++) {
                const s = hazardSeed + 2 + i * 500;
                const mine = {
                    x: minX + this.seededRandom(s) * this.sectorSize,
                    y: minY + this.seededRandom(s + 1) * this.sectorSize,
                    radius: 45 + this.seededRandom(s + 2) * 20,
                    active: true,
                    pulseOffset: this.seededRandom(s + 3) * Math.PI * 2,
                    rotation: this.seededRandom(s + 4) * Math.PI * 2
                };
                this.spaceMines.push(mine); // Workspace uses spaceMines array
                sectorData.hazards.mines.push(mine);
            }
        }

        // 2. Turrets (protecting precious/exotic areas)
        let turretProb = 0.05;
        if (dist >= 2500) turretProb = 0.15;
        if (this.seededRandom(hazardSeed + 100) < turretProb) {
            const turret = {
                x: minX + this.seededRandom(hazardSeed + 101) * this.sectorSize,
                y: minY + this.seededRandom(hazardSeed + 102) * this.sectorSize,
                rotation: this.seededRandom(hazardSeed + 103) * Math.PI * 2,
                turretAngle: 0,
                cooldown: 0,
                hp: 100,
                active: true,
                pulseOffset: this.seededRandom(hazardSeed + 104) * Math.PI * 2,
                recoil: 0
            };
            this.missileBases.push(turret); // Workspace uses missileBases array
            sectorData.hazards.turrets.push(turret);
        }

        // 3. Black Holes (Rare, mostly in the Deep Void)
        let bhProb = 0.01;
        if (dist >= 8000) bhProb = 0.05;
        if (this.seededRandom(hazardSeed + 200) < bhProb) {
            const bh = {
                x: minX + this.seededRandom(hazardSeed + 201) * this.sectorSize,
                y: minY + this.seededRandom(hazardSeed + 202) * this.sectorSize,
                size: 80 + this.seededRandom(hazardSeed + 203) * 100,
                active: true,
                pulseOffset: this.seededRandom(hazardSeed + 204) * Math.PI * 2,
                particleRings: []
            };

            // Initialize particles for the accretion disk
            for (let i = 0; i < 30; i++) {
                bh.particleRings.push({
                    angle: this.seededRandom(hazardSeed + 300 + i) * Math.PI * 2,
                    radius: 1.2 + this.seededRandom(hazardSeed + 400 + i) * 0.8,
                    size: 1 + this.seededRandom(hazardSeed + 500 + i) * 2,
                    speed: 0.005 + this.seededRandom(hazardSeed + 600 + i) * 0.01,
                    hue: 200 + this.seededRandom(hazardSeed + 700 + i) * 60,
                    brightness: 0.5 + this.seededRandom(hazardSeed + 800 + i) * 0.5
                });
            }

            this.hazardBlackHoles.push(bh); // Workspace uses hazardBlackHoles
            sectorData.hazards.blackHoles.push(bh);
        }

        const depositCount = Math.floor(3 + this.seededRandom(seed + 500000) * 5);
        for (let i = 0; i < depositCount; i++) {
            const s = seed + 500000 + i * 2000;
            const x = minX + this.seededRandom(s) * this.sectorSize;
            const y = minY + this.seededRandom(s + 1) * this.sectorSize;
            const dist = Math.hypot(x, y);

            let zone = 'industrial';
            if (dist >= 8000) zone = 'exotic';
            else if (dist >= 5000) zone = 'nuclear';
            else if (dist >= 2500) zone = 'crystal';
            else if (dist >= 1000) zone = 'precious';

            const richness = 0.3 + this.seededRandom(s + 2) * 0.7;
            const deposit = {
                x, y, zone,
                name: `${this.galaxyZones[zone]?.name || zone} Deposit`,
                richness,
                tier: Math.floor(richness * 3) + 1
            };

            this.resourceDeposits.push(deposit);
            sectorData.deposits.push(deposit);
        }

        this.loadedSectors.set(key, sectorData);
        // console.log(`[Universe] Sector(${sectorX}, ${sectorY}): ${mineralCount} minerals, ${depositCount} deposits`);
    }

        toggleBgStyle(style) {
        console.log(`[BG Toggle] ${style}, currently active: `, this.activeStyles.has(style));
        
        const arraysToManage = [
            'staticStars', 'galaxies', 'blackHoles', 'planets', 
            'shootingStars', 'backgroundStars', 'nebulae', 'spacecraft', 'matrixStreams'
        ];

        if (this.activeStyles.has(style)) {
            // Deselecting: Remove elements belonging to this style
            this.activeStyles.delete(style);
            arraysToManage.forEach(arrName => {
                if (this[arrName]) {
                    this[arrName] = this[arrName].filter(item => item.sourceStyle !== style);
                }
            });
        } else {
            // Enabling: Generate elements just for this style and tag them
            this.activeStyles.add(style);
            
            const preLengths = {};
            arraysToManage.forEach(arrName => {
                this[arrName] = this[arrName] || [];
                preLengths[arrName] = this[arrName].length;
            });
            
            try {
                this.generateSingleStyle(style);
            } catch (e) {
                console.error(`[BG Error] generateSingleStyle(${style}) failed:`, e);
            }
            
            // Tag newly added elements with their source style
            arraysToManage.forEach(arrName => {
                for (let i = preLengths[arrName]; i < this[arrName].length; i++) {
                    this[arrName][i].sourceStyle = style;
                }
            });
        }

        this.updateBgUI();
    }

    // Generate only a single style's data
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
            case 'cyber':
                this.generateCyberStyle();
                break;
        }
    }

    // Clear only a specific style's data
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

    // Toggle functions for popup panels
    toggleRotationPanel() {
        const panel = document.getElementById('rotationPanel');
        if (panel) {
            const isHidden = panel.classList.toggle('hidden');
            if (this.flightMode) this.gamePaused = !isHidden;
        }
    }

    toggleTemplatePanel() {
        const panel = document.getElementById('templatePanel');
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
            if (this.flightMode) this.gamePaused = false;
        } else {
            panel.style.display = 'block';
            if (this.flightMode) this.gamePaused = true;
        }
    }

    calculateShipStats() {
        if (!this.playerShip || !this.playerShip.equipment) return;

        // Base stats
        let maxSpeed = 50;
        let acceleration = 0.5;
        let rotationSpeed = 0.08;
        let maxShield = 100;
        let shieldRecharge = 0.1;
        let radarRange = 1500;
        let mapVisibility = false;

        const eq = this.playerShip.equipment;

        // Apply Engine
        if (eq.engine && this.equipmentDB.engine[eq.engine]) {
            const engine = this.equipmentDB.engine[eq.engine];
            maxSpeed += engine.maxSpeedBonus || 0;
            acceleration += engine.accelBonus || 0;
        }

        // Apply Shield
        if (eq.shield && this.equipmentDB.shield[eq.shield]) {
            const shield = this.equipmentDB.shield[eq.shield];
            maxShield = shield.capacity || maxShield;
            shieldRecharge = shield.rechargeRate || shieldRecharge;
        }

        // Apply Wings
        if (Array.isArray(eq.wings)) {
            eq.wings.forEach(wingId => {
                if (wingId && this.equipmentDB.wings[wingId]) {
                    rotationSpeed += this.equipmentDB.wings[wingId].rotationBonus || 0;
                }
            });
        }

        // Apply Radar
        if (eq.radar && this.equipmentDB.radar[eq.radar]) {
            const radar = this.equipmentDB.radar[eq.radar];
            radarRange = radar.range || radarRange;
            mapVisibility = radar.mapVisibility || false;
        }

        // Apply basic generic upgrades on top (for backward compatibility during migration)
        if (this.playerShip.upgrades) {
            maxSpeed *= (1 + (this.playerShip.upgrades.speed || 0) * 0.2);
            acceleration *= (1 + (this.playerShip.upgrades.speed || 0) * 0.1);
        }

        // Assign to playerShip
        this.playerShip.maxSpeed = maxSpeed;
        this.playerShip.acceleration = acceleration;
        this.playerShip.rotationSpeed = rotationSpeed;
        
        this.playerShip.maxShield = maxShield;
        this.playerShip.shieldRechargeRate = shieldRecharge;
        if (this.playerShip.shield > maxShield) this.playerShip.shield = maxShield;

        this.playerShip.radarRange = radarRange;
        this.playerShip.mapVisibility = mapVisibility;
    }

    toggleFlightMode() {
        if (this.hazardEffect && (this.hazardEffect.type === 'player_death' || this.hazardEffect.type === 'blackhole' || this.hazardEffect.type === 'planet_impact')) return;
        this.flightMode = !this.flightMode;
        this.mode = this.flightMode ? 'flight' : 'draw'; // Sync game mode to allow correct rendering

        // Initial sector generation so the player doesn't fly into a void
        if (this.flightMode) {
            this.checkAndGenerateSectors();
        }

        // Ensure ship is at valid coordinates (Fix NaN or undefined)
        if (!this.playerShip) {
            this.playerShip = { 
                type: 'interceptor', 
                x: 0, y: 0, z: 0, 
                vx: 0, vy: 0, vz: 0, 
                rotation: 0, pitch: 0, roll: 0, 
                speed: 0, maxSpeed: 50, acceleration: 0.5, rotationSpeed: 0.08, 
                size: 45, color: '#00f3ff', 
                shield: 100, maxShield: 100, 
                hull: 100, maxHull: 100, 
                cargoCount: 0, cargoCapacity: 100,
                equipment: {
                    weapons: ['basic_laser', null, null, null, null],
                    engine: 'basic_engine',
                    shield: 'basic_shield',
                    wings: ['basic_wings', 'basic_wings'],
                    radar: 'basic_radar'
                }
            };
        }
        if (isNaN(this.playerShip.x)) this.playerShip.x = 0;
        if (isNaN(this.playerShip.y)) this.playerShip.y = 0;
        if (isNaN(this.playerShip.vx)) this.playerShip.vx = 0;
        if (isNaN(this.playerShip.vy)) this.playerShip.vy = 0;

        this.calculateShipStats();

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
            this.showToast('Flight Mode: ON');
            this.updateMissionHUD(); // Call the new mission HUD update
            this.updateFactionHUD(); // Boot Faction HUD
            // Audio: start engine hum + ambient music
            gameAudio.startEngineHum();
            gameAudio.startAmbientMusic();
        } else {
            if (hud) hud.classList.add('hidden');
            if (floatingLeaders) floatingLeaders.classList.add('hidden');
            this.updateFactionHUD(); // Hide HUD
            // Audio: stop engine + music
            gameAudio.stopEngineHum();
            gameAudio.stopAmbientMusic();
        }

        // Ensure a background is active
        if (this.flightMode && this.activeStyles.size === 0) {
            this.toggleBgStyle('deep-space');
        }

        this.showToast(this.flightMode ? 'Flight Mode: ON' : 'Flight Mode: OFF');

        // Reset keys to prevent runaway ship
        this.keysPressed = {};

        // Initialize resize handle for gems section ONCE when entering flight mode
        if (this.flightMode && this.initGemsSectionResize) {
            this.initGemsSectionResize();
        }

        // Toggle ship button, dock button, and layout presets visibility
        const shipBtn = document.getElementById('selectShipBtn');
        const dockBtn = document.getElementById('dockBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const layoutPresets = document.getElementById('layoutPresets');
        
        console.log(`[HUD] toggleFlightMode: flightMode=${this.flightMode}, shipBtn=${!!shipBtn}, dockBtn=${!!dockBtn}`);
        
        if (shipBtn) {
            shipBtn.style.setProperty('display', this.flightMode ? 'inline-flex' : 'none', 'important');
        }
        if (dockBtn) {
            dockBtn.style.setProperty('display', this.flightMode ? 'inline-flex' : 'none', 'important');
        }
        if (pauseBtn) {
            pauseBtn.style.setProperty('display', this.flightMode ? 'inline-flex' : 'none', 'important');
            if (!this.flightMode && this.gamePaused) this.togglePause(); // Reset pause state when exiting
        }

        // Toggle HUD Sections explicitly to ensure they are visible
        const vitalsEl = document.getElementById('sectionVitals');
        if (vitalsEl) vitalsEl.style.setProperty('display', 'block', 'important');
        
        const shipStatusEl = document.getElementById('sectionShipStatus');
        if (shipStatusEl) shipStatusEl.style.setProperty('display', 'flex', 'important');
        
        const shipDesignEl = document.getElementById('sectionShipDesign');
        if (shipDesignEl) shipDesignEl.style.setProperty('display', this.flightMode ? 'flex' : 'none', 'important');
        if (layoutPresets) {
            layoutPresets.style.setProperty('display', this.flightMode ? 'flex' : 'none', 'important');
        }

        if (this.flightMode) {
            this.setLayout(localStorage.getItem('hudLayout') || 'horizontal');
        }

        this.draw();
    }

    setLayout(type) {
        localStorage.setItem('hudLayout', type);

        const W = window.innerWidth;
        const H = window.innerHeight;
        
        // Calculate optimal scale factor 
        const widthScale = W / 1600;
        const heightScale = H / 1060;
        const scale = Math.min(1.0, Math.max(0.40, Math.min(widthScale, heightScale))); 
        document.documentElement.style.setProperty('--hud-scale', scale);

        // Fallback to horizontal if type is unrecognized
        if (type !== 'horizontal' && type !== 'vertical') {
            type = 'horizontal';
        }
        
        const hud = document.getElementById('flightHUD');
        if (hud) {
            hud.className = `flight-hud layout-${type}` + (this.flightMode ? '' : ' hidden');
        }

        const windows = ['sectionVitals', 'sectionRadar', 'sectionControls', 'sectionGems', 'sectionVelocity', 'floatingMap', 'floatingLeaders', 'sectionMap', 'sectionShipDesign', 'sectionShipStatus', 'sectionMission', 'sectionFactions'];

        windows.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.transform = '';
                if (el.classList.contains('minimized-to-taskbar')) {
                    this.restoreFromTaskbar(id);
                } else {
                    const displayType = (id === 'sectionVitals' || id === 'sectionMap' || id === 'sectionRadar') ? 'block' : 'flex';
                    if (!el.classList.contains('hidden')) {
                        el.style.setProperty('display', displayType, 'important');
                    }
                }
            }
        });

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
            const isActive = modal.classList.toggle('active');
            if (this.flightMode) this.gamePaused = isActive;
        }
    }

    hideControlsExpanded() {
        const modal = document.getElementById('expandedControlsModal');
        if (modal) {
            modal.classList.remove('active');
            if (this.flightMode) this.gamePaused = false;
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
            if (pos.left) {
                    win.style.position = 'fixed';
                    win.style.left = pos.left;
                    win.style.right = 'auto';
                }
            if (pos.top) {
                win.style.top = pos.top;
                win.style.bottom = 'auto';
            }
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

        const windows = ['sectionVitals', 'sectionRadar', 'sectionControls', 'sectionGems', 'sectionVelocity', 'floatingMap', 'floatingLeaders', 'sectionMap', 'sectionShipDesign', 'sectionShipStatus', 'sectionMission', 'sectionFactions'];
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
        this.showToast('Layout ' + slot + ' saved!');
    }

    // Load layout from a slot
    loadLayout(slot) {
        const layoutStr = localStorage.getItem('windowLayout' + slot);
        if (!layoutStr) {
            this.showToast('No layout saved in slot ' + slot);
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
                if (pos.left) {
                    win.style.position = 'fixed';
                    win.style.left = pos.left;
                    win.style.right = 'auto';
                }
                if (pos.top) {
                    win.style.top = pos.top;
                    win.style.bottom = 'auto';
                }
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

            this.showToast('Layout ' + slot + ' loaded!');
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
        // Obsolete: Handled centrally by initWindowSystem()
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
        this.showToast('Ship color reset to default');
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
        this.showToast('Ship rotation reset');
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
        const info = this.mineralTypes[type];
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
            this.updateWalletUI();
            this.updateInventoryUI();

            // Update ship status (shield/hull bars)
            this.updateShipStatus();
        }

        // Every 3 frames (~20 FPS)
        if (this.frameCounter % 3 === 0) {
            this.updateRadar();
        }

        // Every 12 frames (~5 FPS)
        if (this.frameCounter % 12 === 0) {
            this.updateMap();
            this.updateFactionHUD();
        }
    }

    updateFactionHUD() {
        const panel = document.getElementById('sectionFactions');
        if (!panel) return;

        if (!this.flightMode) {
            panel.style.display = 'none';
            return;
        }

        panel.style.display = 'block';

        const content = document.getElementById('factionsContent');
        if (!content) return;

        const factions = [
            { key: 'xenon',  label: 'Xenon Hive',      color: '#ff4444' },
            { key: 'mauler', label: 'Mauler Cartel',    color: '#ff9900' },
            { key: 'terran', label: 'Terran Defense',   color: '#44aaff' },
        ];

        content.innerHTML = factions.map(f => {
            const rep = this.factionRep[f.key] || 0;
            const pct = ((rep + 100) / 200) * 100; // -100..100 => 0..100%
            const status = rep > 30 ? 'Friendly' : rep < -30 ? 'Hostile' : 'Neutral';
            const statusColor = rep > 30 ? '#44ff88' : rep < -30 ? '#ff4444' : '#ffdd44';
            return `<div style="margin-bottom:6px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
                    <span style="color:${f.color};font-weight:bold;">${f.label}</span>
                    <span style="color:${statusColor};font-size:10px;">${status}</span>
                </div>
                <div style="background:rgba(255,255,255,0.1);border-radius:3px;height:6px;overflow:hidden;">
                    <div style="width:${pct.toFixed(1)}%;height:100%;background:${f.color};transition:width 0.3s;"></div>
                </div>
                <div style="text-align:right;font-size:9px;color:#888;margin-top:1px;">${rep > 0 ? '+' : ''}${rep}</div>
            </div>`;
        }).join('');
    }

    updateShipStatus() {

        const ship = this.playerShip;
        if (!ship) return;

        // Update shield bar
        const shieldBar = document.getElementById('shieldBar');
        const shieldText = document.getElementById('shieldText');

        if (shieldBar && shieldText) {
            const shieldPercent = (ship.shield / ship.maxShield) * 100;
            shieldBar.style.width = shieldPercent + '%';
            shieldText.textContent = `${Math.round(ship.shield)} / ${Math.round(ship.maxShield)}`;

            // Change color based on shield level
            if (shieldPercent < 25) {
                shieldBar.style.background = 'linear-gradient(90deg, #ff3333, #ff6666)';
                shieldBar.style.boxShadow = '0 0 15px rgba(255, 50, 50, 0.8)';
            } else if (shieldPercent < 50) {
                shieldBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
                shieldBar.style.boxShadow = '0 0 10px rgba(255, 170, 0, 0.6)';
            } else {
                shieldBar.style.background = 'linear-gradient(90deg, #00aaff, #00ffff)';
                shieldBar.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
            }
        }

        // Update health bar (reflects actual hull health)
        const hullBar = document.getElementById('hullBar');
        const hullText = document.getElementById('hullText');

        if (hullBar && hullText) {
            const hullPercent = Math.max(0, Math.min(100, (this.playerShip.hull / this.playerShip.maxHull) * 100));
            hullBar.style.width = `${hullPercent}%`;
            hullText.textContent = `${Math.round(hullPercent)}%`;

            // Color feedback based on health
            if (hullPercent <= 25) {
                hullBar.style.background = 'linear-gradient(90deg, #ff3333, #ff6666)';
                hullBar.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.8)';
            } else if (hullPercent <= 50) {
                hullBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
                hullBar.style.boxShadow = '0 0 10px rgba(255, 170, 0, 0.6)';
            } else {
                hullBar.style.background = 'linear-gradient(90deg, #00cc55, #00ff88)';
                hullBar.style.boxShadow = '0 0 10px rgba(0, 255, 100, 0.5)';
            }
        }

        // Show/hide damage warning
        const damageWarning = document.getElementById('damageWarning');
        if (damageWarning) {
            const isTakingDamage = this.hazardEffect && (this.hazardEffect.type === 'missile_hit' || this.hazardEffect.type === 'planet_impact');
            damageWarning.style.display = isTakingDamage ? 'block' : 'none';
        }

        // Quick Repair Button visibility (Monetization Hook)
        const repairBtn = document.getElementById('quickRepairBtn');
        if (repairBtn) {
            const hullPercent = (this.playerShip.hullHealth / this.playerShip.maxHull) * 100;
            // Show if hull is < 30% and player has enough credits
            if (hullPercent < 30 && this.credits >= 2000) {
                repairBtn.style.display = 'block';
            } else {
                repairBtn.style.display = 'none';
            }
        }
    }

    updateRadar() {
        const canvas = document.getElementById('radarCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        const cx = w / 2, cy = h / 2;

        // Clear
        ctx.clearRect(0, 0, w, h);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(0,255,100,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
        ctx.moveTo(0, cy); ctx.lineTo(w, cy);
        ctx.arc(cx, cy, 20, 0, Math.PI * 2);
        ctx.arc(cx, cy, 35, 0, Math.PI * 2);
        ctx.stroke();

        // Draw player (center)
        ctx.fillStyle = '#0f0';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw Pulse Ping Ring on Radar
        if (this.activePulsePing) {
            const now = Date.now();
            const elapsed = now - this.activePulsePing.startTime;
            if (elapsed < this.activePulsePing.duration) {
                const ringProgress = elapsed / this.activePulsePing.duration;
                ctx.strokeStyle = 'rgba(0, 255, 255, ' + (1 - ringProgress) + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(cx, cy, ringProgress * 35, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Draw distress beacons
        if (this.distressBeacons) {
            this.distressBeacons.forEach(beacon => {
                const dx = beacon.x - this.playerShip.x;
                const dy = beacon.y - this.playerShip.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 10000) { // Beacons have huge radar range
                    // Clamp to radar edge
                    const displayDist = Math.min(dist, 2000); 
                    const rx = cx + (dx / Math.max(0.1, dist)) * (displayDist / 2000) * 35;
                    const ry = cy + (dy / Math.max(0.1, dist)) * (displayDist / 2000) * 35;
                    
                    const pulse = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;
                    ctx.fillStyle = `rgba(255, 200, 0, ${0.4 + pulse * 0.6})`;
                    ctx.beginPath();
                    ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }

        // Draw nearby minerals as dots
        let radarRange = 2000;
        if (this.activePulsePing) {
            const now = Date.now();
            if (now - this.activePulsePing.startTime < this.activePulsePing.duration) {
                radarRange = this.activePulsePing.maxRadius || 3000;
            }
        }
        this.minerals.forEach(m => {
            const dx = m.x - this.playerShip.x;
            const dy = m.y - this.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radarRange) {
                const rx = cx + (dx / radarRange) * 35;
                const ry = cy + (dy / radarRange) * 35;
                ctx.fillStyle = m.color || '#f0f';
                ctx.beginPath();
                ctx.arc(rx, ry, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Draw power-ups
        this.powerUps.forEach(pu => {
            const dx = pu.x - this.playerShip.x;
            const dy = pu.y - this.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radarRange) {
                const rx = cx + (dx / radarRange) * 35;
                const ry = cy + (dy / radarRange) * 35;
                
                let color = '#fff';
                if (pu.type === 'shield_boost') color = '#00ffff';
                if (pu.type === 'hull_repair') color = '#00ff00';
                if (pu.type === 'weapon_overdrive') color = '#ff8800';
                if (pu.type === 'speed_boost') color = '#ffff00';

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Draw space mines (Red triangles)
        this.spaceMines.forEach(m => {
            const dx = m.x - this.playerShip.x;
            const dy = m.y - this.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radarRange) {
                const rx = cx + (dx / radarRange) * 35;
                const ry = cy + (dy / radarRange) * 35;
                ctx.fillStyle = '#ff3333';
                ctx.beginPath();
                ctx.moveTo(rx, ry - 3);
                ctx.lineTo(rx + 3, ry + 3);
                ctx.lineTo(rx - 3, ry + 3);
                ctx.closePath();
                ctx.fill();
            }
        });

        // Draw turrets (Yellow squares)
        this.missileBases.forEach(t => {
            const dx = t.x - this.playerShip.x;
            const dy = t.y - this.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // PULSE: Radar Ping
            const isPulse = this.playerShip.type === 'pulse';
            if (dist < radarRange || isPulse) {
                const displayRange = isPulse ? Math.max(radarRange, 6000) : radarRange;
                let rx = cx + (dx / displayRange) * 35;
                let ry = cy + (dy / displayRange) * 35;

                if (isPulse && dist >= radarRange) {
                    const rdx = rx - cx, rdy = ry - cy;
                    const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                    if (rDist > 33) { // Clamp slightly inside edge
                        rx = cx + (rdx / rDist) * 33;
                        ry = cy + (rdy / rDist) * 33;
                    }
                }

                ctx.fillStyle = '#ffcc00';
                ctx.fillRect(rx - 2, ry - 2, 4, 4);
            }
        });

        // Draw black holes (Purple/Black circles)
        this.hazardBlackHoles.forEach(bh => {
            const dx = bh.x - this.playerShip.x;
            const dy = bh.y - this.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // PULSE: Radar Ping
            const isPulse = this.playerShip.type === 'pulse';
            if (dist < radarRange || isPulse) {
                const displayRange = isPulse ? Math.max(radarRange, 6000) : radarRange;
                let rx = cx + (dx / displayRange) * 35;
                let ry = cy + (dy / displayRange) * 35;

                if (isPulse && dist >= radarRange) {
                    const rdx = rx - cx, rdy = ry - cy;
                    const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                    if (rDist > 33) {
                        rx = cx + (rdx / rDist) * 33;
                        ry = cy + (rdy / rDist) * 33;
                    }
                }

                ctx.strokeStyle = '#aa00ff';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(rx, ry, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Draw Mission Targets (high visibility orange crosshairs)
        if (this.activeMission) {
            const m = this.activeMission;
            const targetColor = '#ff8800';

            let targets = [];
            if (m.type === 'kill' || m.type === 'kill_any') {
                targets = this.enemyShips.filter(e => m.type === 'kill_any' || e.type === m.targetType);
            } else if (m.type === 'mine') {
                targets = this.minerals;
            }

            targets.forEach(t => {
                const dx = t.x - this.playerShip.x;
                const dy = t.y - this.playerShip.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Show mission targets way farther out on radar
                const effectiveRange = Math.max(radarRange, 10000); 
                const rx = cx + (dx / effectiveRange) * 35;
                const ry = cy + (dy / effectiveRange) * 35;
                
                // Clamp to edge of radar
                const rdx = rx - cx, rdy = ry - cy;
                const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                let finalX = rx, finalY = ry;
                if (rDist > 34) {
                    finalX = cx + (rdx / rDist) * 34;
                    finalY = cy + (rdy / rDist) * 34;
                }

                // Pulsing crosshair
                const pulse = 1 + Math.sin(Date.now() * 0.008) * 0.3;
                const sz = 3 * pulse;
                ctx.strokeStyle = targetColor;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(finalX - sz, finalY);
                ctx.lineTo(finalX + sz, finalY);
                ctx.moveTo(finalX, finalY - sz);
                ctx.lineTo(finalX, finalY + sz);
                ctx.stroke();
            });
        }

        // Draw training gates (cyan diamonds) — essential for Lesson 6 radar navigation
        if (this.trainingActive && this.trainingLesson && this.trainingLesson.gates) {
            this.trainingLesson.gates.forEach((gate, i) => {
                if (gate.reached) return;
                const dx = gate.x - this.playerShip.x;
                const dy = gate.y - this.playerShip.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Extended range so far gates still show at edge
                const effectiveRange = Math.max(radarRange, 8000);
                const rx = cx + (dx / effectiveRange) * 35;
                const ry = cy + (dy / effectiveRange) * 35;
                // Clamp to radar circle
                const rdx = rx - cx, rdy = ry - cy;
                const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                let finalX = rx, finalY = ry;
                if (rDist > 34) {
                    finalX = cx + (rdx / rDist) * 34;
                    finalY = cy + (rdy / rDist) * 34;
                }
                // Pulsing cyan diamond
                const pulse = 1 + Math.sin(Date.now() * 0.005 + i) * 0.3;
                const sz = 4 * pulse;
                ctx.fillStyle = '#00f3ff';
                ctx.globalAlpha = 0.9;
                ctx.beginPath();
                ctx.moveTo(finalX, finalY - sz);
                ctx.lineTo(finalX + sz, finalY);
                ctx.lineTo(finalX, finalY + sz);
                ctx.lineTo(finalX - sz, finalY);
                ctx.closePath();
                ctx.fill();
                // Gate number label
                ctx.font = 'bold 7px sans-serif';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';
                ctx.fillText(`G${i + 1}`, finalX, finalY + sz + 8);
                ctx.globalAlpha = 1;
            });
        }
    }

    generateResourceDeposits() {
        this.resourceDeposits = [];

        // TIER 1: Starting ring (30s-1min travel)
        // Distance: 2000-4000 units (expanded outward)
        // 12 clusters evenly distributed
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random() * (16000000 - 4000000) + 4000000);
            this.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 400,
                zone: 'industrial',
                radius: 700,
                richness: 1.5,
                tier: 1,
                value: 'low',
                name: `Common Field ${i + 1} `
            });
        }

        // TIER 2: Inner belt (1-2min travel)
        // Distance: 5000-8000 units (wider spread)
        // 10 clusters
        for (let i = 0; i < 10; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random() * (64000000 - 25000000) + 25000000);
            const zone = Math.random() < 0.5 ? 'precious' : 'crystal';
            this.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 600,
                zone: zone,
                radius: 800,
                richness: 2.0,
                tier: 2,
                value: 'medium',
                name: `Rich Cluster ${i + 1} `
            });
        }

        // TIER 3: Mid expanse (2-4min travel)
        // Distance: 10000-15000 units
        // 8 clusters
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random() * (225000000 - 100000000) + 100000000);
            const zone = Math.random() < 0.5 ? 'nuclear' : 'crystal';
            this.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 800,
                zone: zone,
                radius: 900,
                richness: 3.0,
                tier: 3,
                value: 'high',
                name: `Epic Cache ${i + 1} `
            });
        }

        // TIER 4: Outer frontier (4-6min travel)
        // Distance: 18000-25000 units  
        // 6 clusters - Epic/Legendary
        for (let i = 0; i < 6; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random() * (625000000 - 324000000) + 324000000);
            this.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 1000,
                zone: 'nuclear',
                radius: 1000,
                richness: 4.5,
                tier: 4,
                value: 'legendary',
                name: `Legendary Cache ${i + 1} `
            });
        }

        // TIER 5: Deep void (6-10min travel)
        // Distance: 28000-38000 units
        // 4 clusters - Legendary/Mythic
        for (let i = 0; i < 4; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random() * (1444000000 - 784000000) + 784000000);
            this.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 1500,
                zone: 'exotic',
                radius: 1200,
                richness: 6.0,
                tier: 5,
                value: 'mythic',
                name: `Mythic Treasure ${i + 1} `
            });
        }

        // TIER 6: Distant galaxies (10-15min travel)
        // Distance: 42000-50000 units
        // 3 ultra-rare clusters - Pure mythic
        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random() * (2500000000 - 1764000000) + 1764000000);
            this.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 2000,
                zone: 'exotic',
                radius: 1500,
                richness: 8.0, // 8x rarity - INSANE!
                tier: 6,
                value: 'ultra-mythic',
                name: `Galaxy Core ${i + 1} `
            });
        }

        console.log(`[Universe] Generated ${this.resourceDeposits.length} gem clusters across 50,000 units`);
    }

    updateMap() {
        // Render to both floating map and inline map
        const canvases = [
            document.getElementById('mapCanvas'),
            document.getElementById('inlineMapCanvas')
        ].filter(c => c);

        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            const w = canvas.width, h = canvas.height;
            const cx = w / 2, cy = h / 2;

            const mapRadius = 50000; // Increased to show entire universe
            const scale = (Math.min(w, h) / 2) / mapRadius;

            // Clear
            ctx.fillStyle = 'rgba(0,5,20,0.95)';
            ctx.fillRect(0, 0, w, h);

            // Offset to center on player
            const offsetX = -this.playerShip.x;
            const offsetY = -this.playerShip.y;

            // Draw Zones (centered at origin) - REDUCED OPACITY
            Object.values(this.galaxyZones).forEach(zone => {
                const r = zone.distanceRange.min * scale;
                ctx.beginPath();
                ctx.arc(cx + offsetX * scale, cy + offsetY * scale, r, 0, Math.PI * 2);
                ctx.strokeStyle = zone.color;
                ctx.globalAlpha = 0.08; // Much more subtle
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Draw Minerals (gems) - FILTERED
            // Only draw minerals if zoomed in or if they are high value to reduce noise
            ctx.globalAlpha = 0.5;
            this.minerals.forEach(mineral => {
                const dx = (mineral.x + offsetX) * scale;
                const dy = (mineral.y + offsetY) * scale;

                // Skip if off screen
                if (Math.abs(dx) > w / 2 || Math.abs(dy) > h / 2) return;

                // Skip low value minerals on zoomed out map
                if (scale < 0.0005 && ['quartz', 'iron'].includes(mineral.type)) return;

                ctx.fillStyle = mineral.color;
                ctx.fillRect(cx + dx - 1, cy + dy - 1, 2, 2); // fillRect is 100x faster than arc()
            });
            ctx.globalAlpha = 1;

            // Draw training gates on map (pulsing cyan markers)
            if (this.trainingActive && this.trainingLesson && this.trainingLesson.gates) {
                this.trainingLesson.gates.forEach((gate, i) => {
                    if (gate.reached) return;
                    const dx = (gate.x + offsetX) * scale;
                    const dy = (gate.y + offsetY) * scale;
                    if (Math.abs(dx) > w / 2 || Math.abs(dy) > h / 2) {
                        // Draw edge indicator if off-screen
                        const angle = Math.atan2(dy, dx);
                        const edgeR = Math.min(w, h) / 2 - 6;
                        const ex = cx + Math.cos(angle) * edgeR;
                        const ey = cy + Math.sin(angle) * edgeR;
                        ctx.fillStyle = '#00f3ff';
                        ctx.globalAlpha = 0.6 + Math.sin(Date.now() * 0.004 + i) * 0.3;
                        ctx.beginPath();
                        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        return;
                    }
                    const pulse = 1 + Math.sin(Date.now() * 0.004 + i) * 0.3;
                    // Outer glow
                    ctx.fillStyle = '#00f3ff';
                    ctx.globalAlpha = 0.25;
                    ctx.beginPath();
                    ctx.arc(cx + dx, cy + dy, 6 * pulse, 0, Math.PI * 2);
                    ctx.fill();
                    // Inner marker
                    ctx.globalAlpha = 0.9;
                    ctx.beginPath();
                    ctx.arc(cx + dx, cy + dy, 3, 0, Math.PI * 2);
                    ctx.fill();
                    // Gate label
                    ctx.font = 'bold 8px sans-serif';
                    ctx.fillStyle = '#00f3ff';
                    ctx.textAlign = 'center';
                    ctx.fillText(`G${i + 1}`, cx + dx, cy + dy - 7);
                    ctx.globalAlpha = 1;
                });
            }

            // Draw Deposits LAST - larger, foreground layer (CLUSTERS)
            this.resourceDeposits.forEach(dep => {
                const dx = (dep.x + offsetX) * scale;
                const dy = (dep.y + offsetY) * scale;

                if (Math.abs(dx) > w / 2 || Math.abs(dy) > h / 2) return;

                // Tier-based colors
                let color, glowColor, label, labelText;
                switch (dep.tier) {
                    case 1: color = '#4488ff'; glowColor = '#6699ff'; label = 'C'; labelText = 'Common'; break;
                    case 2: color = '#ff66ff'; glowColor = '#ff88ff'; label = 'R'; labelText = 'Rich'; break;
                    case 3: color = '#ffaa00'; glowColor = '#ffcc44'; label = 'E'; labelText = 'Epic'; break;
                    case 4: color = '#ff4400'; glowColor = '#ff6644'; label = 'L'; labelText = 'Legendary'; break;
                    case 5: color = '#ff00ff'; glowColor = '#ff44ff'; label = 'M'; labelText = 'Mythic'; break;
                    case 6: color = '#00ffff'; glowColor = '#44ffff'; label = 'G'; labelText = 'Galaxy'; break;
                    default: color = '#00f'; glowColor = '#44f'; label = '?'; labelText = 'Unknown'; break;
                }

                // Pulsing glow - Subtle now
                const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.2;

                // Outer glow
                ctx.fillStyle = glowColor;
                ctx.globalAlpha = 0.3;
                ctx.beginPath();
                ctx.arc(cx + dx, cy + dy, (4 + dep.tier) * pulse, 0, Math.PI * 2);
                ctx.fill();

                // Solid Core Icon (Diamond)
                ctx.globalAlpha = 1;
                ctx.fillStyle = color;
                const size = 3 + dep.tier; // Scaled by importance
                ctx.beginPath();
                ctx.moveTo(cx + dx, cy + dy - size);
                ctx.lineTo(cx + dx + size, cy + dy);
                ctx.lineTo(cx + dx, cy + dy + size);
                ctx.lineTo(cx + dx - size, cy + dy);
                ctx.closePath();
                ctx.fill();

                // Label - Only show text if nearby or high tier
                // Simplified logic: show full text only on hover-ish distance or high tier
                // For now, just show single Letter code unless really important
                ctx.fillStyle = '#fff';
                ctx.font = '10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, cx + dx, cy + dy);
            });
            ctx.globalAlpha = 1;

            ctx.globalAlpha = 1;

            // Draw Enemies if within Radar Range and map visibility is enabled
            if (this.playerShip.mapVisibility && this.enemyShips) {
                this.enemyShips.forEach(enemy => {
                    const dx = enemy.x - this.playerShip.x;
                    const dy = enemy.y - this.playerShip.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist <= this.playerShip.radarRange) {
                        const sx = dx * scale;
                        const sy = dy * scale;
                        
                        // Only draw if on screen
                        if (Math.abs(sx) <= w / 2 && Math.abs(sy) <= h / 2) {
                            ctx.fillStyle = '#ff0044'; // Red enemy blip
                            ctx.beginPath();
                            ctx.arc(cx + sx, cy + sy, 3, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                });
            }

            // Draw Player (now always at center) - PROMINENT
            const px = cx;
            const py = cy;

            // Strong Glow for visibility over everything
            ctx.save();
            ctx.translate(px, py);

            // Pulsing outer ring
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 10 + Math.sin(Date.now() * 0.005) * 2, 0, Math.PI * 2);
            ctx.stroke();

            // Player Arrow
            ctx.rotate(this.playerShip.rotation + Math.PI / 2);
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            // Larger size (approx 3x previous size)
            ctx.moveTo(0, -12);
            ctx.lineTo(8, 8);
            ctx.lineTo(0, 4);
            ctx.lineTo(-8, 8);
            ctx.fill();
            ctx.restore();
            ctx.stroke();
        }); // End canvases.forEach
    }

    /* --- EXPANDED MAP --- */
    openExpandedMap() {
        console.log('[Expand Map] Button clicked!');
        const modal = document.getElementById('expandedMapModal');
        console.log('[Expand Map] Modal element:', modal);

        if (modal) {
            modal.classList.remove('hidden');
            // Trigger reflow for transition
            void modal.offsetWidth;
            modal.classList.add('active');
            
            this.expandedMapOpen = true;
            this.gamePaused = true;
            
            this.expandedMapZoom = this.expandedMapZoom || 1.0;
            this.expandedMapOffset = this.expandedMapOffset || { x: 0, y: 0 };

            // Center on player initially
            if (window.game && window.game.playerShip) {
                this.expandedMapOffset.x = -window.game.playerShip.x;
                this.expandedMapOffset.y = -window.game.playerShip.y;
            }

            console.log('[Expand Map] Starting animation, zoom:', this.expandedMapZoom);
            this.animateExpandedMap();

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
            modal.classList.remove('active');
            this.expandedMapOpen = false;
            if (window.game) window.game.gamePaused = false;
            setTimeout(() => { modal.classList.add('hidden'); }, 300);
        }
    }

    animateExpandedMap() {
        if (!this.expandedMapOpen) return;

        const canvas = document.getElementById('fullscreenMapCanvas');
        if (!canvas) {
            console.error('[Map Debug] Canvas not found');
            return;
        }


        // Resize if needed (handle dynamic window resizing)
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const zoom = this.expandedMapZoom;
        const time = Date.now() * 0.001;

        // --- 1. DEEP SPACE BACKGROUND ---
        // Clear with a deep, rich gradient based on player position (subtle shift)
        const bgGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
        bgGradient.addColorStop(0, '#000810');
        bgGradient.addColorStop(0.6, '#000508');
        bgGradient.addColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(zoom, zoom);
        ctx.translate(this.expandedMapOffset.x, this.expandedMapOffset.y);

        // --- 2. PARALLAX STARFIELD (Background Layers) ---
        // We generate pseudo-random stars based on world coordinates to create an infinite field
        // Layer 1: Distant, slow moving
        this.renderMapStars(ctx, 0.5, 0.5, 5000, 15000, '#445566');
        // Layer 2: Mid-distance
        this.renderMapStars(ctx, 0.3, 0.8, 3000, 10000, '#6688aa');

        // --- 3. ZONE ATMOSPHERICS ---
        // Draw large, soft radial glows for each zone to give "territory" feel
        Object.values(this.galaxyZones).forEach(zone => {
            const dist = zone.distanceRange.min;
            // Skip if way off screen
            // Simple cull: check distance from center of screen in world space to zone center (0,0)
            // But zones are concentric rings, so we just draw them.

            ctx.beginPath();
            ctx.arc(0, 0, dist, 0, Math.PI * 2);
            ctx.fillStyle = zone.glowColor || zone.color;
            ctx.globalAlpha = 0.03; // Very subtle atmosphere
            ctx.lineWidth = 100; // Wide soft edge
            ctx.fill();

            // Zone Boundary Ring
            ctx.beginPath();
            ctx.arc(0, 0, dist, 0, Math.PI * 2);
            ctx.strokeStyle = zone.color;
            ctx.lineWidth = 2 / zoom; // Keep thin regardless of zoom
            ctx.globalAlpha = 0.2;
            ctx.setLineDash([20, 40]); // Dashed border
            ctx.stroke();
            ctx.setLineDash([]);

            // Zone Label (Floating in space)
            // Place label at the top of the ring
            ctx.fillStyle = zone.color;
            ctx.font = `bold ${64}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.4;
            ctx.fillText(zone.name.toUpperCase(), 0, -dist + 200);
        });

        // --- 4. DRAW ENEMIES ON RADAR ---
        if (this.playerShip && this.playerShip.mapVisibility && this.enemyShips) {
            this.enemyShips.forEach(enemy => {
                const dx = enemy.x - this.playerShip.x;
                const dy = enemy.y - this.playerShip.y;
                const dist = Math.hypot(dx, dy);

                if (dist <= this.playerShip.radarRange) {
                    ctx.fillStyle = '#ff0044';
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, Math.max(100, 3 / zoom), 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Small pulse for enemies
                    const pulse = 1 + Math.sin(time * 5) * 0.5;
                    ctx.globalAlpha = 0.5;
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, Math.max(100, 3 / zoom) * (1 + pulse), 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });
        }

        // --- 4. HOLO-GRID ---
        // A perspective grid. Since this is 2D top-down, we draw a rectangular grid that pans.
        if (this.settings.background !== false) {
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
        ctx.lineWidth = 1 / zoom;
        const gridSize = 1000;

        // Calculate visible range to optimize rendering
        // Visible world center: -this.expandedMapOffset.x, -this.expandedMapOffset.y
        const worldCx = -this.expandedMapOffset.x;
        const worldCy = -this.expandedMapOffset.y;
        const visibleW = w / zoom;
        const visibleH = h / zoom;

        const startX = Math.floor((worldCx - visibleW) / gridSize) * gridSize;
        const endX = Math.floor((worldCx + visibleW) / gridSize) * gridSize;
        const startY = Math.floor((worldCy - visibleH) / gridSize) * gridSize;
        const endY = Math.floor((worldCy + visibleH) / gridSize) * gridSize;

        ctx.beginPath();
        for (let x = startX; x <= endX; x += gridSize) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }
        ctx.stroke();
        }


        // --- 5. ORBITAL MECHANICS & PLANETS (Cosmetic) ---
        // Procedural planets based on zone
        // We'll use a deterministic random based on index/position
        // (Simplified for now: drawing a few fixed 'planets' per zone would be better but random serves 'world' feel)

        // --- 6. RESOURCE DEPOSITS (Advanced Icons) ---
        this.resourceDeposits.forEach(dep => {
            // Pulsing effect
            const pulse = 1 + Math.sin(time * 3 + dep.x * 0.01) * 0.2;

            // Deposit Glow
            const zoneColor = this.galaxyZones[dep.zone] ? this.galaxyZones[dep.zone].color : '#fff';
            const glowColor = this.galaxyZones[dep.zone] ? (this.galaxyZones[dep.zone].glowColor || zoneColor) : '#fff';

            // Draw outer glow
            const grad = ctx.createRadialGradient(dep.x, dep.y, 5 * pulse, dep.x, dep.y, 30 * pulse);
            grad.addColorStop(0, glowColor);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(dep.x, dep.y, 40 * pulse, 0, Math.PI * 2);
            ctx.fill();

            // Draw core icon (Diamond shape)
            ctx.globalAlpha = 1;
            ctx.fillStyle = zoneColor;
            const size = 12;
            ctx.beginPath();
            ctx.moveTo(dep.x, dep.y - size);
            ctx.lineTo(dep.x + size, dep.y);
            ctx.lineTo(dep.x, dep.y + size);
            ctx.lineTo(dep.x - size, dep.y);
            ctx.closePath();
            ctx.fill();

            // Label
            if (zoom > 0.8) {
                ctx.fillStyle = '#fff';
                ctx.font = '14px "Segoe UI", sans-serif'; // Cleaner font
                ctx.textAlign = 'center';
                ctx.fillText(dep.name, dep.x, dep.y + 40);

                ctx.font = '10px "Segoe UI", sans-serif';
                ctx.fillStyle = '#aaa';
                ctx.fillText(`Richness: ${(dep.richness * 100).toFixed(0)}% `, dep.x, dep.y + 55);
            }
        });

        // --- 6.5. MINERALS/GEMS (Navigation Aid) ---
        // Show minerals on the map with proper color coding
        const viewW = w / zoom;
        const viewH = h / zoom;
        this.minerals.forEach(mineral => {
            // Viewport Cull to ensure map is blazingly fast even with 3000 gems!
            if (Math.abs(mineral.x + this.expandedMapOffset.x) > viewW/2 + 100) return;
            if (Math.abs(mineral.y + this.expandedMapOffset.y) > viewH/2 + 100) return;

            const mineralInfo = this.mineralTypes[mineral.type];
            if (!mineralInfo) return;

            // Glow effect for visibility
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = mineralInfo.color;
            ctx.beginPath();
            ctx.arc(mineral.x, mineral.y, 8 / zoom, 0, Math.PI * 2);
            ctx.fill();

            // Solid marker
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            ctx.arc(mineral.x, mineral.y, 4 / zoom, 0, Math.PI * 2);
            ctx.fill();

            // Show gem type label at higher zoom
            if (zoom > 1.5) {
                ctx.fillStyle = '#fff';
                ctx.font = `${10 / zoom}px Arial`;
                ctx.textAlign = 'center';
                ctx.fillText(mineralInfo.name, mineral.x, mineral.y - 10 / zoom);
            }
        });
        ctx.globalAlpha = 1.0;

        // --- 7. PLAYER SHIP (Detailed HUD Marker) ---
        const shipX = this.playerShip.x;
        const shipY = this.playerShip.y;

        ctx.translate(shipX, shipY);

        // View Cone (Field of View)
        const fovRadius = 400;
        ctx.rotate(this.playerShip.rotation + Math.PI / 2); // Align with ship heading

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, fovRadius, -Math.PI / 6, Math.PI / 6); // 60 degree cone
        ctx.fillStyle = 'rgba(0, 255, 100, 0.1)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 255, 100, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ship Icon (Triangle)
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(14, 14);
        ctx.lineTo(0, 8);
        ctx.lineTo(-14, 14);
        ctx.closePath();
        ctx.fillStyle = '#0f0';
        ctx.shadowColor = '#0f0';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        ctx.restore();

        // --- 8. UI OVERLAYS (Screen Space) ---
        // Coordinates Overlay (Fixed to screen corners)
        ctx.font = '14px Consolas, monospace';
        ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
        ctx.textAlign = 'left';
        ctx.fillText(`SECTOR: [${Math.floor(shipX / 5000)}, ${Math.floor(shipY / 5000)}]`, 20, h - 60);
        ctx.fillText(`COORDS: X ${Math.round(shipX)}  Y ${Math.round(shipY)} `, 20, h - 40);

        // Scale Bar
        const scaleWidth = 200; // pixels
        const scaleDistance = scaleWidth / zoom;
        ctx.beginPath();
        ctx.moveTo(w - 220, h - 40);
        ctx.lineTo(w - 20, h - 40);
        ctx.moveTo(w - 220, h - 45);
        ctx.lineTo(w - 220, h - 35);
        ctx.moveTo(w - 20, h - 45);
        ctx.lineTo(w - 20, h - 35);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(`${Math.round(scaleDistance)} km`, w - 120, h - 50);

        requestAnimationFrame(() => this.animateExpandedMap());
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
            const mineralInfo = this.mineralTypes[type];
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

    updatePlayerShip() {
        const ship = this.playerShip;
        const keys = this.keysPressed;

        // DISABLE ALL CONTROLS during major hazard effects (not missile hits)
        if (this.hazardEffect && this.hazardEffect.type !== 'missile_hit') {
            this.camera.x = -ship.x * this.camera.zoom;
            this.camera.y = -ship.y * this.camera.zoom;
            return;
        }

        // Rotation (Yaw - left/right)
        if (keys['a'] || keys['arrowleft']) ship.rotation -= ship.rotationSpeed;
        if (keys['d'] || keys['arrowright']) ship.rotation += ship.rotationSpeed;

        // Joystick Yaw
        if (this.joyInputX) {
            ship.rotation += this.joyInputX * ship.rotationSpeed;
        }

        // Mouse Steering (Right-Click Drag)
        if (this.mouseRightDown && this.mouseLastX !== undefined) {
            const deltaX = this.mouseX - this.mouseLastX;
            const deltaY = this.mouseY - this.mouseLastY;
            ship.rotation += deltaX * 0.005;
            ship.pitch += deltaY * 0.005;
            ship.pitch = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, ship.pitch));
            this.mouseLastX = this.mouseX;
            this.mouseLastY = this.mouseY;
        }

        // 3D Pitch rotation
        if (keys['r']) ship.pitch = Math.min(Math.PI / 3, ship.pitch + 0.02);
        if (keys['f']) ship.pitch = Math.max(-Math.PI / 3, ship.pitch - 0.02);

        // 3D Roll rotation
        if (keys['z']) ship.roll = Math.min(Math.PI / 2, ship.roll + 0.03);
        if (keys['x']) ship.roll = Math.max(-Math.PI / 2, ship.roll - 0.03);

        // Acceleration
        const cos = Math.cos(ship.rotation);
        const sin = Math.sin(ship.rotation);

        // Viper Boost & Apex Overclock Multiplier
        let abilityAccelMult = 1.0;

        // Apex Overclock Timeout Logic
        if (ship.overclockActive && Date.now() - (ship.overclockStartTime || 0) > 5000) {
            ship.overclockActive = false;
            this.showToast('Overclock Disengaged.');
        }

        if (ship.type === 'viper' && ship.boostActive) {
            abilityAccelMult = 2.0;
        } else if (ship.type === 'apex' && ship.overclockActive) {
            abilityAccelMult = 2.0;
        }

        const enginesActive = !ship.enginesDisabled;
        let currentThrust = 0;

        if ((keys['w'] || keys['arrowup']) && enginesActive) {
            ship.vx += cos * ship.acceleration * abilityAccelMult;
            ship.vy += sin * ship.acceleration * abilityAccelMult;
            currentThrust += ship.acceleration * abilityAccelMult;
        }
        if ((keys['s'] || keys['arrowdown']) && enginesActive) {
            ship.vx -= cos * ship.acceleration * 0.5 * abilityAccelMult;
            ship.vy -= sin * ship.acceleration * 0.5 * abilityAccelMult;
            currentThrust += ship.acceleration * 0.5 * abilityAccelMult;
        }

        // Joystick Thrust
        if (this.joyInputY && Math.abs(this.joyInputY) > 0.1) {
            const thrust = -this.joyInputY * ship.acceleration;
            ship.vx += cos * thrust;
            ship.vy += sin * thrust;
            currentThrust += Math.abs(thrust);
        }

        ship.currentThrust = currentThrust;

        // 3D movement (Q/E)
        if (keys['q']) ship.vz += ship.acceleration;
        if (keys['e']) ship.vz -= ship.acceleration;

        // --- PHYSICS & SPEED CLAMPING ---
        let effectiveMaxSpeed = ship.maxSpeed;

        // Shift = manual speed boost (increases effective max speed, not position multiplier)
        if (keys['shift']) {
            effectiveMaxSpeed *= 1.8;
        }

        // Skill: Viper Boost (Ship Specific)
        if (ship.type === 'viper' && ship.boostActive) {
            effectiveMaxSpeed *= 2.0;
        } 
        // Skill: Apex Overclock (Ship Specific)
        else if (ship.type === 'apex' && ship.overclockActive) {
            effectiveMaxSpeed *= 1.5;
        }

        // Skill: Global Afterburner (raises the speed cap)
        if (this.globalAbilityActive && this.globalAbilityActive.afterburner) {
            effectiveMaxSpeed *= 3.0 + (this.playerSkills.afterburner * 0.5);
        }

        // Power-Up: Speed Boost
        if (ship.speedBoost && Date.now() < ship.speedBoost) {
            effectiveMaxSpeed *= 1.5;
        }

        // Penalty: Towing base reduces max speed
        if (this.spaceBase && this.spaceBase.isTowing) {
            effectiveMaxSpeed *= 0.5;
        }

        ship.x += ship.vx;
        ship.y += ship.vy;
        ship.z += ship.vz;

        ship.speed = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy + ship.vz * ship.vz);

        // Safety: Prevent NaN if speed is zero or malformed
        if (ship.speed > effectiveMaxSpeed && ship.speed > 0) {
            const ratio = effectiveMaxSpeed / ship.speed;
            ship.vx *= ratio;
            ship.vy *= ratio;
            ship.vz *= ratio;
            ship.speed = effectiveMaxSpeed;
        }

        const friction = 0.998;
        ship.vx *= friction;
        ship.vy *= friction;
        ship.vz *= friction;

        // Speed Lines Generation
        if (ship.speed > 5 && Math.random() < 0.3) {
            const lineCount = Math.floor(ship.speed / 15) + 1;
            for (let i = 0; i < lineCount; i++) {
                this.speedLines.push({
                    x: ship.x + (Math.random() - 0.5) * 600,
                    y: ship.y + (Math.random() - 0.5) * 600,
                    z: ship.z + (Math.random() - 0.5) * 600,
                    vx: -ship.vx * 0.4,
                    vy: -ship.vy * 0.4,
                    life: 0.8 + Math.random() * 0.4,
                    decay: 0.04 + Math.random() * 0.04
                });
            }
        }

        // Engine Exhaust Particles
        this.engineParticles = this.engineParticles || [];
        if (currentThrust > 0 && Math.random() < 0.6 + currentThrust/2) {
            const spread = Math.random() * 0.4 - 0.2;
            const exAngle = ship.rotation + Math.PI + spread;
            const exSpeed = 2 + currentThrust * 2 + Math.random() * 2;
            this.engineParticles.push({
                x: ship.x - Math.cos(ship.rotation) * 20,
                y: ship.y - Math.sin(ship.rotation) * 20,
                vx: Math.cos(exAngle) * exSpeed + ship.vx * 0.2,
                vy: Math.sin(exAngle) * exSpeed + ship.vy * 0.2,
                life: 1.0,
                color: ship.type === 'viper' ? 'rgba(0, 255, 255, ' : 'rgba(255, 100, 0, ',
                size: 3 + Math.random() * 3 + currentThrust
            });
        }
        
        for (let i = this.engineParticles.length - 1; i >= 0; i--) {
            const p = this.engineParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.size *= 0.95;
            p.life -= 0.03;
            if (p.life <= 0 || p.size < 0.1) {
                this.engineParticles.splice(i, 1);
            }
        }

        // Speed Lines Update
        this.speedLines.forEach(line => {
            line.x += line.vx;
            line.y += line.vy;
            line.life -= (line.decay || 0.05);

            if (ship.type === 'hauler') {
                const dx = ship.x - line.x;
                const dy = ship.y - line.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 400 && dist > 1) {
                    const pull = 1.2 * (1 - dist / 400);
                    line.vx += (dx / Math.max(0.1, dist)) * pull;
                    line.vy += (dy / Math.max(0.1, dist)) * pull;
                }
            }
        });
        this.speedLines = this.speedLines.filter(line => line.life > 0);

        // Sanity Check for NaN - Recovery Mechanism
        if (isNaN(ship.x) || isNaN(ship.y) || isNaN(ship.z)) {
            console.warn("⚠️ CRITICAL: Ship coordinates corrupt (NaN). Emergency reset invoked.");
            ship.x = 0; ship.y = 0; ship.z = 0;
            ship.vx = 0; ship.vy = 0; ship.vz = 0;
        }

        // Camera follow
        this.camera.x = -ship.x * this.camera.zoom;
        this.camera.y = -ship.y * this.camera.zoom;

        this.checkAndGenerateSectors();

        // Muzzle Flash Decay
        if (ship.muzzleFlash > 0) {
            ship.muzzleFlash -= 0.1;
        }

        // Weapon Firing (Spacebar)
        if (keys[' ']) {
            this.shoot();
        }
    }

    shoot() {
        const now = Date.now();
        const ship = this.playerShip;
        if (!ship || !ship.equipment) return;

        const weaponLevel = ship.upgrades.weapons || 0;
        let firedAny = false;

        const eq = ship.equipment;
        const weapons = eq.weapons || []; // Array of up to 5 weapon IDs

        // Weapon offset angles and distances (slot 0: center, slot 1: left, slot 2: right, slot 3: far left, slot 4: far right)
        const slotOffsets = [
            { x: 40, y: 0 },       // Center Nose
            { x: 10, y: -20 },     // Left Wing
            { x: 10, y: 20 },      // Right Wing
            { x: -10, y: -40 },    // Outer Left
            { x: -10, y: 40 }      // Outer Right
        ];

        if (!ship.lastShots) ship.lastShots = [0, 0, 0, 0, 0];

        weapons.forEach((weaponId, index) => {
            if (!weaponId) return; // Empty slot
            
            const weaponDef = this.equipmentDB.weapons[weaponId];
            if (!weaponDef) return;
            
            // Cooldown in DB is roughly frames, multiply by 20 for ms
            let wCooldown = (weaponDef.cooldown * 20) / (1 + weaponLevel * 0.5);
            if (ship.weaponOverdrive && Date.now() < ship.weaponOverdrive) {
                wCooldown *= 0.5; // Double fire rate
            }
            
            if (now - ship.lastShots[index] < wCooldown) return;
            
            ship.lastShots[index] = now;
            firedAny = true;

            const speed = weaponDef.speed || 25;
            const angle = ship.rotation;
            
            const offset = slotOffsets[index] || { x: 0, y: 0 };
            
            const zoom = this.camera.zoom;
            const rx = (offset.x * Math.cos(angle) - offset.y * Math.sin(angle)) / zoom;
            const ry = (offset.x * Math.sin(angle) + offset.y * Math.cos(angle)) / zoom;

            const startX = ship.x + rx;
            const startY = ship.y + ry;

            const pVx = ship.vx * 0.5 + Math.cos(angle) * speed;
            const pVy = ship.vy * 0.5 + Math.sin(angle) * speed;

            const pWidth = (4 + weaponLevel * 2) / zoom;
            const pLength = (40 + weaponLevel * 20) / zoom;
            
            this.playerStats.shotsFired++;

            this.projectiles.push({
                x: startX,
                y: startY,
                vx: pVx,
                vy: pVy,
                rotation: angle,
                color: weaponDef.color || '#00f3ff', 
                life: 60, // Frames (1 second at 60fps)
                width: pWidth,
                length: pLength,
                damage: (weaponDef.damage || 10) * (1 + weaponLevel * 0.5),
                type: weaponDef.name
            });
        });

        if (firedAny) {
            ship.muzzleFlash = 1.0;
            gameAudio.playLaser();
        }
    }

    updateProjectiles() {
        // Iterate backwards to allow removal
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            if (p.life <= 0) {
                this.projectiles.splice(i, 1);
                continue;
            }

            // check collisions with Space Mines
            let hit = false;
            for (let j = this.spaceMines.length - 1; j >= 0; j--) {
                const mine = this.spaceMines[j];
                const dx = p.x - mine.x;
                const dy = p.y - mine.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const hitRadius = mine.radius || mine.size || 20;

                if (dist < hitRadius + (p.width || 4)) {
                    // HIT!
                    this.createExplosion(p.x, p.y, 'hit');
                    if (mine.health === undefined) mine.health = 50; // Default health
                    mine.health -= (p.damage || 25); // Use projectile damage
                    hit = true;

                    if (mine.health <= 0) {
                        this.destroySpaceMine(j);
                    }
                    break; // One hit per projectile
                }
            }

            if (hit) {
                this.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Missile Bases
            for (let k = this.missileBases.length - 1; k >= 0; k--) {
                const base = this.missileBases[k];
                const dx = p.x - base.x;
                const dy = p.y - base.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < base.size * 1.5 + p.width) { // Base hitbox is generous
                    // HIT!
                    this.createExplosion(p.x, p.y, 'hit');
                    base.health -= (p.damage || 25);
                    hit = true;

                    // Flash base red
                    base.hitFlash = 10;

                    if (base.health <= 0) {
                        this.destroyMissileBase(k);
                    }
                    break;
                }
            }

            if (hit) {
                this.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Enemy Missiles
            for (let m = this.enemyMissiles.length - 1; m >= 0; m--) {
                const missile = this.enemyMissiles[m];
                const dx = p.x - missile.x;
                const dy = p.y - missile.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < missile.size * 3 + p.width + 10) { // Generous leeway for hitting fast-moving missiles
                    // HIT!
                    this.createExplosion(p.x, p.y, 'hit');
                    missile.health -= (p.damage || 25);
                    hit = true;

                    if (missile.health <= 0) {
                        this.createExplosion(missile.x, missile.y, 'destruction');
                        this.enemyMissiles.splice(m, 1);
                        
                        // Small reward for shooting down a missile
                        this.playerGems += 2;
                        localStorage.setItem('playerGems', this.playerGems);
                        this.showToast(`💥 Missile Intercepted! +2 Gems`, 1000);
                    }
                    break;
                }
            }

            if (hit) {
                this.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Enemy Ships
            for (let e = this.enemyShips.length - 1; e >= 0; e--) {
                const enemy = this.enemyShips[e];
                const typeDef = InterstellarEngine.ENEMY_TYPES[enemy.type];
                const dx = p.x - enemy.x;
                const dy = p.y - enemy.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < typeDef.size + p.width) {
                    this.createExplosion(p.x, p.y, 'hit');
                    enemy.health -= (p.damage || 25);
                    enemy.hitFlash = 10;
                    hit = true;
                    this.playerStats.shotsHit++;

                    // Faction Wars: Reputation Adjustments
                    if (enemy.faction) {
                        this.factionRep[enemy.faction] = Math.max(-100, (this.factionRep[enemy.faction] || 0) - 2);
                        // Friendly boost to rivals
                        Object.keys(this.factionRep).forEach(f => {
                            if (f !== enemy.faction) this.factionRep[f] = Math.min(100, (this.factionRep[f] || 0) + 1);
                        });
                        localStorage.setItem('factionRep', JSON.stringify(this.factionRep));
                    }

                    if (enemy.health <= 0) {
                        this.destroyEnemyShip(e);
                    }
                    break;
                }
            }

            if (hit) {
                this.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Background Spacecraft
            if (this.activeStyles.has('alien') && this.spacecraft && this.spacecraft.length > 0) {
                const bgZoom = Math.pow(this.camera.zoom, 0.4);

                const pScreenX = this.canvas.width / 2 + (p.x - this.playerShip.x) * this.camera.zoom;
                const pScreenY = this.canvas.height / 2 + (p.y - this.playerShip.y) * this.camera.zoom;

                for (let sIdx = this.spacecraft.length - 1; sIdx >= 0; sIdx--) {
                    const sc = this.spacecraft[sIdx];
                    if (sc.flownOut) continue;

                    const para = sc.parallax || 0.4;
                    const scScreenX = this.canvas.width / 2 + (sc.x - this.playerShip.x * para) * bgZoom;
                    const scScreenY = this.canvas.height / 2 + (sc.y - this.playerShip.y * para) * bgZoom;

                    const dx = pScreenX - scScreenX;
                    const dy = pScreenY - scScreenY;
                    const dist = Math.hypot(dx, dy);

                    const scRadius = (sc.size || 20) * 1.5 * bgZoom;

                    if (dist < scRadius + 5) {
                        const hitWorldX = this.playerShip.x + (pScreenX - this.canvas.width / 2) / this.camera.zoom;
                        const hitWorldY = this.playerShip.y + (pScreenY - this.canvas.height / 2) / this.camera.zoom;

                        this.createExplosion(hitWorldX, hitWorldY, 'hit');
                        
                        if (sc.health === undefined) {
                            sc.health = sc.shipClass === 'mothership' ? 250 : (sc.shipClass === 'destroyer' ? 120 : (sc.shipClass === 'cruiser' ? 80 : 40));
                            sc.maxHealth = sc.health;
                        }

                        sc.health -= (p.damage || 25);
                        hit = true;

                        if (sc.health <= 0) {
                            this.createExplosion(hitWorldX, hitWorldY, 'destruction');
                            this.spacecraft.splice(sIdx, 1);
                            this.respawnSpacecraftBackground();
                        }
                        break;
                    }
                }
            }

            if (hit) {
                this.projectiles.splice(i, 1);
                continue;
            }

            // Check collision with Boss
            if (this.activeBoss) {
                const boss = this.activeBoss;
                const bTypeDef = InterstellarEngine.BOSS_TYPES[boss.type];
                const dx = p.x - boss.x;
                const dy = p.y - boss.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < bTypeDef.size + p.width) {
                    this.createExplosion(p.x, p.y, 'hit');
                    this.damageBoss(25);
                    hit = true;
                }
            }

            if (hit) {
                this.projectiles.splice(i, 1);
                continue;
            }

            // CHECK COLLISIONS WITH BLACK HOLES (Sucked in)
            for (let b = 0; b < this.hazardBlackHoles.length; b++) {
                const bh = this.hazardBlackHoles[b];
                const dx = p.x - bh.x;
                const dy = p.y - bh.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // If projectile enters the black hole horizon region, it vanishes
                if (dist < bh.size * 1.8) {
                    this.projectiles.splice(i, 1);
                    hit = true;
                    break;
                }
            }

            if (hit) continue;
        }
    }

    createExplosion(x, y, type) {
        // Audio: explosion
        if (type === 'hit') gameAudio.playExplosionSmall();
        else gameAudio.playExplosionBig();

        // Simple particle explosion
        if (this.settings.particles !== false) {
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
    }

    destroySpaceMine(index) {
        const mine = this.spaceMines[index];
        this.createExplosion(mine.x, mine.y, 'destruction');

        // Remove from array so it can't be hit anymore
        this.spaceMines.splice(index, 1);

        // Award gems
        const reward = 10;
        this.playerGems += reward;
        localStorage.setItem('playerGems', this.playerGems);
        this.showToast(`💥 Space Mine destroyed! +${reward} Gems`, 2000);

        // TRACK MISSION PROGRESS (ONLY ON WEAPON DESTRUCTION)
        if (this.activeMission && this.activeMission.type === 'sabotage') {
            this.activeMission.progress++;
            this.updateMissionHUD();
            this.checkMissionComplete();
        }

        // Loot
        this.spawnLoot(mine.x, mine.y, 'uranium', 5);

        // Remove from sector data to prevent respawning
        if (this.sectors) {
            for (const sector of this.sectors.values()) {
                if (sector.hazards && sector.hazards.mines) {
                    const idx = sector.hazards.mines.indexOf(mine);
                    if (idx !== -1) sector.hazards.mines.splice(idx, 1);
                }
            }
        }

        this.spaceMines.splice(index, 1);
    }

    destroyMissileBase(index) {
        const base = this.missileBases[index];
        this.createExplosion(base.x, base.y, 'destruction');

        // Award gems
        const reward = 25;
        this.playerGems += reward;
        localStorage.setItem('playerGems', this.playerGems);
        this.showToast(`💥 Missile Base destroyed! +${reward} Gems`, 2000);

        // Loot
        this.spawnLoot(base.x, base.y, 'plutonium', 10);

        // Remove from sector data to prevent respawning
        if (this.sectors) {
            for (const sector of this.sectors.values()) {
                if (sector.hazards && sector.hazards.turrets) {
                    const idx = sector.hazards.turrets.indexOf(base);
                    if (idx !== -1) sector.hazards.turrets.splice(idx, 1);
                }
            }
        }

        this.missileBases.splice(index, 1);
    }

    // === ENEMY SHIP COMBAT SYSTEM ===

    static ENEMY_TYPES = {
        scout: {
            name: 'Void Stalker',
            health: 50,
            maxSpeed: 3.0,
            acceleration: 0.08,
            fireRate: 1200, // Faster firing
            aggroRange: 600,
            attackRange: 400,
            bulletSpeed: 12, // Faster bullets
            bulletDamage: 10,
            gemDrop: 5,
            color: '#ff4444',
            glowColor: 'rgba(255, 68, 68, 0.6)',
            size: 18
        },
        fighter: {
            name: 'Alien Scythe',
            health: 100,
            maxSpeed: 2.5,
            acceleration: 0.06,
            fireRate: 1000, // Faster firing
            aggroRange: 800,
            attackRange: 500,
            bulletSpeed: 14, // Faster bullets
            bulletDamage: 15,
            gemDrop: 15,
            color: '#ff8800',
            glowColor: 'rgba(255, 136, 0, 0.6)',
            size: 24
        },
        cruiser: {
            name: 'Obsidian Shard',
            health: 200,
            maxSpeed: 1.5,
            acceleration: 0.03,
            fireRate: 2000, // Faster firing
            aggroRange: 1000,
            attackRange: 600,
            bulletSpeed: 10, // Faster bullets
            bulletDamage: 25,
            gemDrop: 40,
            burstCount: 3,
            burstDelay: 200,
            color: '#aa44ff',
            glowColor: 'rgba(170, 68, 255, 0.6)',
            size: 32
        },
        phantom: {
            name: 'Nebula Phantom', 
            health: 180, 
            maxSpeed: 2.2, 
            acceleration: 0.04, 
            fireRate: 1800, 
            aggroRange: 900, 
            attackRange: 600, 
            bulletSpeed: 11, 
            bulletDamage: 22, 
            gemDrop: 35, 
            color: '#6600cc', 
            glowColor: 'rgba(102, 0, 204, 0.4)', 
            size: 30
        },
        stalker: {
            name: 'Void Stalker Alpha',
            health: 40,
            maxSpeed: 3.5,
            acceleration: 0.1,
            fireRate: 1000,
            aggroRange: 700,
            attackRange: 350,
            bulletSpeed: 15,
            bulletDamage: 8,
            gemDrop: 5,
            color: '#ff0000',
            glowColor: 'rgba(255, 0, 0, 0.6)',
            size: 16
        },
        scythe: {
            name: 'Alien Scythe Alpha',
            health: 80,
            maxSpeed: 2.8,
            acceleration: 0.08,
            fireRate: 900,
            aggroRange: 800,
            attackRange: 450,
            bulletSpeed: 16,
            bulletDamage: 12,
            gemDrop: 15,
            color: '#ff8800',
            glowColor: 'rgba(255, 136, 0, 0.6)',
            size: 20
        },
        shard: {
            name: 'Obsidian Shard Alpha',
            health: 150,
            maxSpeed: 1.8,
            acceleration: 0.04,
            fireRate: 1500,
            aggroRange: 1000,
            attackRange: 550,
            bulletSpeed: 12,
            bulletDamage: 20,
            gemDrop: 30,
            burstCount: 2,
            burstDelay: 150,
            color: '#00ffff',
            glowColor: 'rgba(0, 255, 255, 0.6)',
            size: 28
        },
        phantom_legacy: {
            name: 'Nebula Phantom Alpha',
            health: 160,
            maxSpeed: 2.5,
            acceleration: 0.05,
            fireRate: 1600,
            aggroRange: 900,
            attackRange: 600,
            bulletSpeed: 13,
            bulletDamage: 18,
            gemDrop: 35,
            color: '#ffffff',
            glowColor: 'rgba(255, 255, 255, 0.6)',
            size: 26
        }
    };

    spawnEnemyShips() {
        if (!this.flightMode || !this.playerShip) return;

        const ship = this.playerShip;
        const spawnRadius = 1500; // Increase spawn distance so they don't jump the player
        const minSpawnDist = 800; // Keep a generous safe buffer
        const difficulty = window.gameDifficulty || 2;
        const targetCount = Math.max(1, Math.floor(difficulty * 1.0)); // Level 2 = 2 enemies, Level 5 = 5 enemies

        // Remove enemies too far away
        this.enemyShips = this.enemyShips.filter(e => {
            const dist = Math.hypot(e.x - ship.x, e.y - ship.y);
            return dist < spawnRadius * 2.5; // Give them a slightly larger grace area before despawn
        });

        // Remove distant enemy bullets
        this.enemyBullets = this.enemyBullets.filter(b => {
            const dist = Math.hypot(b.x - ship.x, b.y - ship.y);
            return dist < spawnRadius * 2 && b.life > 0;
        });

        // Spawn new enemies
        let enemyAttempts = 0;
        while (this.enemyShips.length < targetCount && enemyAttempts < targetCount * 5) {
            enemyAttempts++;
            const angle = Math.random() * Math.PI * 2;
            const dist = minSpawnDist + Math.sqrt(Math.random()) * (spawnRadius - minSpawnDist);

            const enemyTypes = Object.keys(InterstellarEngine.ENEMY_TYPES);
            const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

            const typeDef = InterstellarEngine.ENEMY_TYPES[type];

            // Assign Faction dynamically
            const factions = ['xenon', 'mauler', 'terran'];
            let chosenFaction = factions[Math.floor(Math.random() * factions.length)];
            // Bias spawn to hostile factions (rep < -10)
            if (Math.random() > 0.4) {
                const hostiles = factions.filter(f => (this.factionRep[f] || 0) < -10);
                if (hostiles.length > 0) chosenFaction = hostiles[Math.floor(Math.random() * hostiles.length)];
            }

            // Scale enemy stats dynamically based on skill level. Level 2 = standard. Level 1 = easier. Level 5 = nightmare.
            const diffMultiplier = 0.6 + (difficulty * 0.2); // Level 1 = 0.8, Level 2 = 1.0, Level 5 = 1.6

            this.enemyShips.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                vx: 0,
                vy: 0,
                rotation: Math.random() * Math.PI * 2,
                type: type,
                faction: chosenFaction, // Faction integration
                health: typeDef.health * diffMultiplier,
                maxHealth: typeDef.health * diffMultiplier,
                state: 'patrol', // patrol, chase, attack, flee
                patrolAngle: Math.random() * Math.PI * 2,
                patrolTimer: 0,
                lastFireTime: 0,
                burstRemaining: 0,
                burstTimer: 0,
                hitFlash: 0,
                isStalking: false, // New stalking state
                spawnTime: Date.now(),
                diffMultiplier: diffMultiplier // Store to scale damage and speed slightly
            });
        }
    }

    updateEnemyShips() {
        if (!this.flightMode || !this.playerShip) return;

        const ship = this.playerShip;
        const now = Date.now();
        const isPlayerCloaked = ship.isCloaked || ship.type === 'spectre';

        for (const enemy of this.enemyShips) {
            const typeDef = InterstellarEngine.ENEMY_TYPES[enemy.type];

            // EMP FREEZE CHECK: Skip all AI logic while disabled
            if (enemy.disabled) {
                if (now >= enemy.disabledUntil) {
                    enemy.disabled = false; // Auto-unfreeze when timer expires
                } else {
                    // Apply friction to gradually stop the ship while frozen
                    enemy.vx *= 0.9;
                    enemy.vy *= 0.9;
                    enemy.x += enemy.vx;
                    enemy.y += enemy.vy;
                    continue; // Skip remaining AI logic
                }
            }

            // Default patrol target is in front of current patrol angle (not player)
            let targetX = enemy.x + Math.cos(enemy.patrolAngle || 0) * 500;
            let targetY = enemy.y + Math.sin(enemy.patrolAngle || 0) * 500;
            let targetShip = ship;
            let distToTarget = Infinity;
            let isTargetingPlayer = false;

            // 1. Check player as target only when faction is hostile
            const ecmFactor = 1 - (this.playerShip.ecmStrength || 0) * 0.1;
            const effectiveAggroRange = typeDef.aggroRange * ecmFactor;
            const isHostileToPlayer = (this.factionRep[enemy.faction] || 0) < 0;

            if (isHostileToPlayer && !isPlayerCloaked) {
                const dToPlayer = Math.hypot(enemy.x - ship.x, enemy.y - ship.y);
                if (dToPlayer < effectiveAggroRange) {
                    distToTarget = dToPlayer;
                    targetX = ship.x;
                    targetY = ship.y;
                    targetShip = ship;
                    isTargetingPlayer = true;
                }
            }

            // 2. Evaluate rival factions as targets (only if closer than current)
            for (const other of this.enemyShips) {
                if (!other.faction || other.faction === enemy.faction || other === enemy) continue;
                const d = Math.hypot(enemy.x - other.x, enemy.y - other.y);
                if (d < distToTarget) {
                    distToTarget = d;
                    targetX = other.x;
                    targetY = other.y;
                    targetShip = other;
                    isTargetingPlayer = false;
                }
            }

            const angleToTarget = (distToTarget < Infinity)
                ? Math.atan2(targetY - enemy.y, targetX - enemy.x)
                : (enemy.patrolAngle || 0);

            // STALKING HYSTERESIS: Once aggroed, stay aggroed until target is far away
            const stalkStopDist = effectiveAggroRange * 3.0;
            if (distToTarget < effectiveAggroRange && distToTarget < Infinity) {
                enemy.isStalking = true;
            } else if (distToTarget > stalkStopDist || distToTarget === Infinity) {
                enemy.isStalking = false;
            }

            // Determine AI state
            if (enemy.health < typeDef.health * 0.2) {
                enemy.state = 'flee';
            } else if (distToTarget === Infinity) {
                enemy.state = 'patrol';
            } else if (distToTarget < typeDef.attackRange) {
                enemy.state = 'attack';
            } else if (enemy.isStalking) {
                enemy.state = 'chase';
            } else {
                enemy.state = 'patrol';
            }

            // Execute state behavior
            let targetAngle = enemy.patrolAngle;
            let thrust = 0;

            switch (enemy.state) {
                case 'patrol':
                    enemy.patrolTimer++;
                    if (enemy.patrolTimer > 180 + Math.random() * 120) {
                        enemy.patrolAngle += (Math.random() - 0.5) * Math.PI;
                        enemy.patrolTimer = 0;
                    }
                    targetAngle = enemy.patrolAngle;
                    thrust = typeDef.maxSpeed * 0.4;
                    break;

                case 'chase':
                    targetAngle = angleToTarget;
                    thrust = typeDef.maxSpeed;
                    break;

                case 'attack':
                    targetAngle = angleToTarget;
                    // Stop thrusting if already within close range to prevent perpetual orbit
                    thrust = distToTarget > typeDef.attackRange * 0.5
                        ? typeDef.maxSpeed * 0.3
                        : 0; // Hover in place and shoot, don't spiral

                    // Check if player is invulnerable (grace period on spawn)
                    const isTargetInvulnerable = targetShip === this.playerShip && this.playerShip.invulnerableUntil && performance.now() < this.playerShip.invulnerableUntil;

                    // Fire weapons
                    if (!isTargetInvulnerable) {
                        if (enemy.burstRemaining > 0) {
                            if (now - enemy.burstTimer > (typeDef.burstDelay || 0)) {
                                this.fireEnemyBullet(enemy, typeDef, targetShip);
                                enemy.burstRemaining--;
                                enemy.burstTimer = now;
                            }
                        } else if (now - enemy.lastFireTime > typeDef.fireRate) {
                            if (typeDef.burstCount) {
                                enemy.burstRemaining = typeDef.burstCount;
                                enemy.burstTimer = now;
                            } else {
                                this.fireEnemyBullet(enemy, typeDef, targetShip);
                            }
                            enemy.lastFireTime = now;
                        }
                    }
                    break;

                case 'flee':
                    targetAngle = angleToTarget + Math.PI; // Run away
                    thrust = typeDef.maxSpeed;
                    break;
            }

            // Smooth rotation toward target angle
            let angleDiff = targetAngle - enemy.rotation;
            angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
            enemy.rotation += angleDiff * 0.06;

            // Apply thrust
            enemy.vx += Math.cos(enemy.rotation) * typeDef.acceleration;
            enemy.vy += Math.sin(enemy.rotation) * typeDef.acceleration;

            // Clamp speed
            const speed = Math.hypot(enemy.vx, enemy.vy);
            if (speed > thrust) {
                const scale = thrust / speed;
                enemy.vx *= scale;
                enemy.vy *= scale;
            }

            // Apply friction
            enemy.vx *= 0.98;
            enemy.vy *= 0.98;

            // Move
            enemy.x += enemy.vx;
            enemy.y += enemy.vy;

            // Decay hit flash
            if (enemy.hitFlash > 0) enemy.hitFlash--;
        }

        // Spawn new enemies
        this.spawnEnemyShips();
    }

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

        const dmgMult = enemy.diffMultiplier || 1.0;
        this.enemyBullets.push({
            x: enemy.x + Math.cos(leadAngle) * (typeDef.size + 5),
            y: enemy.y + Math.sin(leadAngle) * (typeDef.size + 5),
            vx: Math.cos(leadAngle + spread) * typeDef.bulletSpeed,
            vy: Math.sin(leadAngle + spread) * typeDef.bulletSpeed,
            rotation: leadAngle + spread,
            damage: typeDef.bulletDamage * dmgMult,
            life: 80, // ~1.3 seconds
            color: typeDef.color,
            faction: enemy.faction, // Track which faction fired this bullet
            width: 3,
            length: 25
        });
    }

    updateEnemyBullets() {
        if (!this.flightMode || !this.playerShip) return;

        const ship = this.playerShip;

        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            const b = this.enemyBullets[i];
            b.x += b.vx;
            b.y += b.vy;
            b.life--;

            if (b.life <= 0) {
                this.enemyBullets.splice(i, 1);
                continue;
            }

            let bulletDestroyed = false;

            // Bullets from FRIENDLY factions should not damage the player (rep > 0)
            // Only damage player if the faction is hostile (rep < 0) or has no faction tag
            const bulletFactionRep = b.faction ? (this.factionRep[b.faction] || 0) : -1;
            if (bulletFactionRep < 0) {
                const dist = Math.hypot(b.x - ship.x, b.y - ship.y);
                if (dist < 30) {
                    this.createExplosion(b.x, b.y, 'hit');
                    this.damagePlayer(b.damage);
                    this.enemyBullets.splice(i, 1);
                    bulletDestroyed = true;
                    continue;
                }
            }

            // Check collision with other factions (Enemies)
            for (let j = this.enemyShips.length - 1; j >= 0; j--) {
                const enemy = this.enemyShips[j];
                // Faction check: Terran bullets hit non-terran, Enemy bullets hit different factions
                if (b.faction && enemy.faction && b.faction !== enemy.faction) {
                    const eDef = InterstellarEngine.ENEMY_TYPES[enemy.type];
                    const distEnemy = Math.hypot(b.x - enemy.x, b.y - enemy.y);
                    if (distEnemy < (eDef.size || 20) + 5) {
                        this.createExplosion(b.x, b.y, 'hit');
                        enemy.health -= b.damage;
                        if (enemy.health <= 0) {
                            this.destroyEnemyShip(j);
                        } else {
                            enemy.hitFlash = 10;
                        }
                        this.enemyBullets.splice(i, 1);
                        bulletDestroyed = true;
                        break;
                    }
                }
            }

            if (bulletDestroyed) continue;

            // Check collision with Boss
            if (this.activeBoss && b.faction === 'terran') {
                const boss = this.activeBoss;
                const bDef = InterstellarEngine.BOSS_TYPES[boss.type];
                const distBoss = Math.hypot(b.x - boss.x, b.y - boss.y);
                if (distBoss < bDef.size + 10) {
                    this.createExplosion(b.x, b.y, 'hit');
                    boss.health -= b.damage;
                    boss.hitFlash = 15;
                    this.enemyBullets.splice(i, 1);
                    bulletDestroyed = true;
                    // Check boss death is handled in updateBoss()
                }
            }
        }
    }

    destroyEnemyShip(index) {
        const enemy = this.enemyShips[index];
        const typeDef = InterstellarEngine.ENEMY_TYPES[enemy.type];

        // Big explosion
        this.createExplosion(enemy.x, enemy.y, 'destruction');

        // Award gems (Buffed for mid-to-high tier)
        const gemMult = typeDef.rarity === 'boss' ? 1.5 : (typeDef.rank >= 2 ? 1.2 : 1.0);
        this.playerGems += Math.ceil(typeDef.gemDrop * gemMult);
        localStorage.setItem('playerGems', this.playerGems);

        // Increment kill counter
        this.enemyKills++;
        this.playerStats.kills++;
        this.saveStats();

        // Track mission progress
        if (this.activeMission) {
            if (this.activeMission.type === 'kill' && this.activeMission.targetType === enemy.type) {
                this.activeMission.progress++;
                this.updateMissionHUD();
                this.checkMissionComplete();
            } else if (this.activeMission.type === 'kill_any') {
                this.activeMission.progress++;
                this.updateMissionHUD();
                this.checkMissionComplete();
            }
        }

        // Drop mineral loot
        const lootTypes = ['diamond', 'ruby', 'sapphire', 'gold', 'platinum'];
        const lootType = lootTypes[Math.floor(Math.random() * lootTypes.length)];
        this.spawnLoot(enemy.x, enemy.y, lootType, Math.ceil(typeDef.gemDrop / 3));

        // Drop power-up (15% chance, guaranteed for boss)
        if (Math.random() < 0.15 || typeDef.rarity === 'boss') {
            const puTypes = ['shield_boost', 'hull_repair', 'weapon_overdrive', 'speed_boost'];
            const puType = puTypes[Math.floor(Math.random() * puTypes.length)];
            this.powerUps.push({
                x: enemy.x,
                y: enemy.y,
                type: puType,
                phase: Math.random() * Math.PI * 2,
                size: 20
            });
        }

        this.showToast(`💥 ${typeDef.name} destroyed! +${typeDef.gemDrop} Gems`, 2000);

        this.enemyShips.splice(index, 1);
    }

    // === BOSS FIGHT SYSTEM ===

    static BOSS_TYPES = {
        dreadnought: {
            name: 'Dreadnought',
            health: 500,
            size: 50,
            speed: 1.2,
            acceleration: 0.02,
            fireRate: 1500,
            bulletSpeed: 6,
            bulletDamage: 20,
            gemReward: 100,
            color: '#ff2222',
            glowColor: 'rgba(255, 34, 34, 0.7)',
            mechanic: 'shield_arc' // Frontal shield, attack from behind
        },
        hivequeen: {
            name: 'Hive Queen',
            health: 400,
            size: 45,
            speed: 1.0,
            acceleration: 0.015,
            fireRate: 2500,
            bulletSpeed: 5,
            bulletDamage: 15,
            gemReward: 150,
            color: '#44ff44',
            glowColor: 'rgba(68, 255, 68, 0.7)',
            mechanic: 'spawn_swarm' // Spawns scouts every 5s
        },
        voidreaper: {
            name: 'Void Reaper',
            health: 600,
            size: 55,
            speed: 2.0,
            acceleration: 0.04,
            fireRate: 2000,
            bulletSpeed: 5,
            bulletDamage: 30,
            gemReward: 200,
            color: '#9944ff',
            glowColor: 'rgba(153, 68, 255, 0.7)',
            mechanic: 'teleport' // Teleports when hit, fires homing bolts
        }
    };

    spawnBoss(bossType) {
        if (this.activeBoss) return; // Only one boss at a time

        const typeDef = InterstellarEngine.BOSS_TYPES[bossType];
        if (!typeDef) return;

        const ship = this.playerShip;
        const angle = Math.random() * Math.PI * 2;
        const dist = 1200;

        this.activeBoss = {
            x: ship.x + Math.cos(angle) * dist,
            y: ship.y + Math.sin(angle) * dist,
            vx: 0,
            vy: 0,
            rotation: Math.atan2(ship.y - (ship.y + Math.sin(angle) * dist), ship.x - (ship.x + Math.cos(angle) * dist)),
            type: bossType,
            health: typeDef.health,
            maxHealth: typeDef.health,
            lastFireTime: 0,
            lastSpawnTime: 0,
            hitFlash: 0,
            shieldAngle: 0,
            teleportCooldown: 0,
            phase: 1 // 1 = full power, 2 = enraged at 50% HP
        };

        this.showToast(`⚠️ BOSS INCOMING: ${typeDef.name}! ⚠️`, 4000);
        gameAudio.playBossAlert();
    }

    updateBoss() {
        if (!this.activeBoss || !this.flightMode || !this.playerShip) return;

        const boss = this.activeBoss;
        const ship = this.playerShip;
        const typeDef = InterstellarEngine.BOSS_TYPES[boss.type];
        const now = Date.now();
        const distToPlayer = Math.hypot(boss.x - ship.x, boss.y - ship.y);
        const angleToPlayer = Math.atan2(ship.y - boss.y, ship.x - boss.x);

        // Enrage at 50% HP
        if (boss.health < typeDef.health * 0.5) boss.phase = 2;
        const enraged = boss.phase === 2;
        const speedMult = enraged ? 1.5 : 1.0;
        const fireRateMult = enraged ? 0.7 : 1.0;

        // Check if player is cloaked
        const isPlayerCloaked = ship.isCloaked || ship.type === 'spectre';

        // === BOSS-SPECIFIC MECHANICS ===
        switch (boss.type) {
            case 'dreadnought':
                // Rotating shield - blocks frontal shots
                boss.shieldAngle += 0.02;
                // Chase player
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    aDiff = Math.atan2(Math.sin(aDiff), Math.cos(aDiff));
                    boss.rotation += aDiff * 0.03;
                }
                break;

            case 'hivequeen':
                // Spawn scout swarm every 5 seconds (3s if enraged)
                const spawnInterval = enraged ? 3000 : 5000;
                if (now - boss.lastSpawnTime > spawnInterval && !isPlayerCloaked) {
                    const spawnCount = enraged ? 3 : 2;
                    for (let i = 0; i < spawnCount; i++) {
                        const sAngle = boss.rotation + (Math.random() - 0.5) * Math.PI;
                        const sDist = typeDef.size * 2;
                        const scoutDef = InterstellarEngine.ENEMY_TYPES.scout;
                        this.enemyShips.push({
                            x: boss.x + Math.cos(sAngle) * sDist,
                            y: boss.y + Math.sin(sAngle) * sDist,
                            vx: 0, vy: 0,
                            rotation: sAngle,
                            type: 'scout',
                            faction: 'xenon', // Boss scouts are Xenon — always hostile to player
                            health: scoutDef.health,
                            maxHealth: scoutDef.health,
                            state: 'chase',
                            patrolAngle: sAngle,
                            patrolTimer: 0,
                            lastFireTime: 0,
                            burstRemaining: 0,
                            burstTimer: 0,
                            hitFlash: 0,
                            isStalking: true, // Immediately aggressive — skip patrol phase
                            spawnTime: now
                        });
                    }
                    boss.lastSpawnTime = now;

                    this.showToast('🐛 Hive Queen spawned reinforcements!', 1500);
                }
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    aDiff = Math.atan2(Math.sin(aDiff), Math.cos(aDiff));
                    boss.rotation += aDiff * 0.02;
                }
                break;

            case 'voidreaper':
                // Teleport handled in damageBoss()
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    aDiff = Math.atan2(Math.sin(aDiff), Math.cos(aDiff));
                    boss.rotation += aDiff * 0.04;
                }
                break;
        }

        // Movement — chase player
        if (!isPlayerCloaked && distToPlayer > 300) {
            boss.vx += Math.cos(angleToPlayer) * typeDef.acceleration * speedMult;
            boss.vy += Math.sin(angleToPlayer) * typeDef.acceleration * speedMult;
        } else if (distToPlayer < 200) {
            // Back away if too close
            boss.vx -= Math.cos(angleToPlayer) * typeDef.acceleration * 0.5;
            boss.vy -= Math.sin(angleToPlayer) * typeDef.acceleration * 0.5;
        }

        const speed = Math.hypot(boss.vx, boss.vy);
        const maxSpeed = typeDef.speed * speedMult;
        if (speed > maxSpeed) {
            boss.vx *= maxSpeed / speed;
            boss.vy *= maxSpeed / speed;
        }
        boss.vx *= 0.98;
        boss.vy *= 0.98;
        boss.x += boss.vx;
        boss.y += boss.vy;

        // Fire weapons
        if (!isPlayerCloaked && distToPlayer < 800 && now - boss.lastFireTime > typeDef.fireRate * fireRateMult) {
            this.fireBossBullet(boss, typeDef);
            boss.lastFireTime = now;
        }

        // Boss-player collision
        if (distToPlayer < typeDef.size + 30) {
            this.damagePlayer(30);
        }

        // Decay hit flash
        if (boss.hitFlash > 0) boss.hitFlash--;
        if (boss.teleportCooldown > 0) boss.teleportCooldown--;
    }

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
        const typeDef = InterstellarEngine.BOSS_TYPES[boss.type];

        // Dreadnought shield check — blocks frontal damage
        if (boss.type === 'dreadnought') {
            const hitAngle = Math.atan2(this.playerShip.y - boss.y, this.playerShip.x - boss.x);
            let shieldDiff = hitAngle - boss.rotation;
            shieldDiff = Math.atan2(Math.sin(shieldDiff), Math.cos(shieldDiff));
            // Shield covers front 120 degrees
            if (Math.abs(shieldDiff) < Math.PI / 3) {
                this.showToast('🛡️ Shield blocked!', 1000);
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
        const typeDef = InterstellarEngine.BOSS_TYPES[boss.type];

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

        this.showToast(`🏆 BOSS DEFEATED: ${typeDef.name}! +${typeDef.gemReward} Gems! 🏆`, 5000);

        // Track mission
        if (this.activeMission && this.activeMission.type === 'boss') {
            this.activeMission.progress++;
            this.updateMissionHUD();
            this.checkMissionComplete();
        }

        this.activeBoss = null;
    }

    // === MISSION SYSTEM ===

    static MISSION_TEMPLATES = [
        // TIER 1: BASICS — Teach the player how to exist in the game
        {
            type: 'collect', name: 'First Steps', tier: 1,
            desc: 'Fly into {goal} glowing gems floating nearby',
            briefing: 'See those colorful crystals floating around you? Those are gems! Just fly your ship into them to pick them up — no buttons needed, just touch them. Use W to go forward, A/D to turn, SHIFT to go faster.',
            hint: '💡 Just fly INTO the gems • W = forward • A/D = turn • SHIFT = fast',
            goal: 5, reward: 500
        },
        {
            type: 'collect', name: 'Resource Expedition', tier: 1,
            desc: 'Pick up {goal} gems — fly further out for rarer ones',
            briefing: 'Gems come in different types: common ones are dull, rare ones glow brighter and are worth more. Fly away from where you started to find better gems. Check your Radar (circle in top-left) to see gem dots nearby.',
            hint: '💡 Fly further from start = better gems • Radar shows nearby gems',
            goal: 15, reward: 750
        },
        {
            type: 'survive', name: 'Stay Alive', tier: 1,
            desc: 'Fly around for {goal} seconds without dying',
            briefing: 'Your ship can be destroyed! Red triangles on your radar are space mines — avoid them. If you see red dots moving toward you, those are enemies — fly away for now. Your health bar is in the Ship Status window. Timer starts when you accept this mission.',
            hint: '🛡️ Red triangles = mines (avoid!) • Red dots = enemies • SHIFT = escape fast',
            goal: 30, reward: 600
        },

        // TIER 2: COMBAT — Teach the player how to fight
        {
            type: 'kill', name: 'Weapons Training', tier: 2, targetType: 'scout',
            desc: 'Press SPACE to shoot and destroy {goal} Scout ships',
            briefing: 'Your ship has guns! Hold SPACE to fire lasers. When you accept this mission, Scout ships will spawn nearby — look for red dots on your radar. Fly toward them and hold SPACE to shoot. Scouts are weak and die in a few hits.',
            hint: '⚔️ Hold SPACE to shoot! • Red dots on radar = enemies • Fly toward them',
            goal: 3, reward: 1500
        },
        {
            type: 'kill', name: 'Fighter Patrol', tier: 2, targetType: 'fighter',
            desc: 'Destroy {goal} Fighters — they shoot back!',
            briefing: 'Fighters are tougher than Scouts and will fire at you! Keep your ship moving while shooting (hold W + SPACE together). If your health drops low, fly away with SHIFT to boost. Destroyed enemies drop bonus gems!',
            hint: '⚔️ W + SPACE = fly and shoot • SHIFT = escape if low health',
            goal: 3, reward: 2000
        },
        {
            type: 'kill_any', name: 'Space Cleaner', tier: 2,
            desc: 'Destroy {goal} enemies of any kind (SPACE to fire)',
            briefing: 'Kill any enemies you find — Scouts, Fighters, anything counts. Enemies appear as red dots on your radar. After killing enemies, spend your gems on upgrades! Click the 🛠️ UPGRADES button in the menu bar to make your ship stronger.',
            hint: '⚔️ Any enemy counts • SPACE = fire • 🛠️ UPGRADES button = power up your ship',
            goal: 8, reward: 2500
        },
        {
            type: 'sabotage', name: 'Operation: Sabotage', tier: 2,
            desc: 'Clear {goal} Space Mines from the sector',
            briefing: 'Space mines (red triangles) are drifting everywhere. Use your lasers (SPACE) to detonate them from a safe distance. This clears the way for our freighters. Be careful: their explosion radius is large!',
            hint: '💣 Shoot red triangles • Stay back! • Large explosion radius',
            goal: 10, reward: 1800
        },

        // TIER 3: ADVANCED — Challenge the player
        {
            type: 'collect', name: 'Deep Mining', tier: 3,
            desc: 'Collect {goal} gems — explore far from spawn',
            briefing: 'You need a lot of gems for this one. Press M to open your Galaxy Map and see the full universe. Fly far from center to find richer gem fields. Pro tip: the Hauler ship (in Hangar 🚀) has a Tractor Beam that magnetically pulls gems toward you!',
            hint: '💎 M = Galaxy Map • Hauler ship = magnet for gems • Fly far out',
            goal: 30, reward: 5000
        },
        {
            type: 'survive', name: 'Endurance Run', tier: 3,
            desc: 'Stay alive for {goal} seconds — things get dangerous',
            briefing: 'The further you fly from where you started, the more dangerous space gets — more mines, turrets, and enemies appear. For this mission, just survive! You can dodge with R/F (pitch up/down) and Z/X (barrel roll). Timer runs from when you accept.',
            hint: '🛡️ R/F = pitch • Z/X = barrel roll • Fly away from danger • Stay alive!',
            goal: 60, reward: 6000
        },
        {
            type: 'siege', name: 'Operation: Fortress Siege', tier: 3,
            desc: 'Destroy {goal} Missile Launch Bases',
            briefing: 'Standard enemy patrols are one thing, but their stationary Missile Bases are the real threat. They fire long-range heat-seeking missiles. Destroy the bases to weaken their hold on this sector. Use SHIFT to outrun the missiles!',
            hint: '🛡️ Destroy red circular bases • Outrun missiles with SHIFT • High reward',
            goal: 2, reward: 8000
        },
        {
            type: 'defense', name: 'Operation: Citadel Guard', tier: 3,
            desc: 'Protect your Planetary Base from Mauler Siege Fleet',
            briefing: 'Enemy forces have located your base! A squadron of armored Maulers is moving in to dismantle your structures. Return to your base coordinates immediately and hold the line. Use your base turrets for support!',
            hint: '🛡️ Defend your Base • Maulers are slow but tough • Look for base icon on radar',
            goal: 4, reward: 7500
        },

        // TIER 4: BOSS FIGHTS — The ultimate challenge
        {
            type: 'boss', name: 'Boss: Dreadnought', tier: 4, bossType: 'dreadnought',
            desc: 'A massive warship spawns — destroy it! (SPACE to fire)',
            briefing: 'When you accept, a Dreadnought boss will spawn near you. It has front shields — fly BEHIND it to deal damage! Hold SPACE to fire. Use SHIFT to boost past its missiles. This is a real fight — make sure your ship is upgraded first!',
            hint: '👑 Fly BEHIND it! • Front shields block shots • SHIFT dodges missiles',
            goal: 1, reward: 18000
        },
        {
            type: 'boss', name: 'Boss: Hive Queen', tier: 4, bossType: 'hivequeen',
            desc: 'A giant alien queen spawns — destroy it!',
            briefing: 'The Hive Queen spawns swarms of small drones. Kill the drones first (SPACE to fire), then focus on the Queen. She moves unpredictably so be patient. Reward: 150 gems — the biggest payout yet!',
            hint: '👑 Kill drones first • Then focus the Queen • Be patient!',
            goal: 1, reward: 22000
        },
        {
            type: 'boss', name: 'Boss: Void Reaper', tier: 4, bossType: 'voidreaper',
            desc: 'The deadliest boss in the game — can you beat it?',
            briefing: 'The Void Reaper teleports and fires devastating energy beams. Keep your distance and only attack during its cooldown windows. This is the hardest fight in the game. Reward: 200 gems!',
            hint: '👑 It teleports! • Attack during cooldowns only • Hardest boss!',
            goal: 1, reward: 30000
        },
        {
            type: 'kill_any', name: 'Legendary Rampage', tier: 4,
            desc: 'Destroy {goal} enemies — try different ships from the Hangar!',
            briefing: 'All-out war. Destroy everything. Each ship in the Hangar (🚀 SHIP button) has a unique special ability — try them all! The Viper has speed boost, the Titan has armor, the Flux can phase through damage. Pick your favorite and dominate!',
            hint: '⚔️ 🚀 SHIP button = switch ships • Each ship has a unique ability!',
            goal: 15, reward: 15000
        }
    ];

    generateMissionBoard() {
        // Progressive mission board: show one from each available tier
        // Tier unlocking: Tier 1 always, Tier 2 after 2 missions, Tier 3 after 5, Tier 4 after 8
        const completed = this.missionsCompleted || 0;
        const templates = InterstellarEngine.MISSION_TEMPLATES;

        let maxTier = 1;
        if (completed >= 2) maxTier = 2;
        if (completed >= 5) maxTier = 3;
        if (completed >= 8) maxTier = 4;

        // Group by tier
        const available = templates.filter(t => t.tier <= maxTier);
        const shuffled = [...available].sort(() => Math.random() - 0.5);

        // Pick 3, trying to get variety across tiers
        const picked = [];
        const usedTiers = new Set();
        for (const m of shuffled) {
            if (picked.length >= 3) break;
            if (!usedTiers.has(m.tier) || picked.length < 3) {
                picked.push(m);
                usedTiers.add(m.tier);
            }
        }
        return picked.slice(0, 3);
    }

    acceptMission(missionTemplate) {
        if (this.activeMission) {
            this.showToast('⚠️ Complete or abandon current mission first!', 2000);
            return;
        }

        this.activeMission = {
            ...missionTemplate,
            progress: 0,
            startTime: Date.now(),
            desc: missionTemplate.desc.replace('{goal}', missionTemplate.goal)
        };

        this.showToast(`📋 Mission Accepted: ${this.activeMission.name}`, 3000);

        // Spawn boss for boss missions
        if (missionTemplate.type === 'boss' && missionTemplate.bossType) {
            setTimeout(() => this.spawnBoss(missionTemplate.bossType), 2000);
        }

        // Spawn mission targets dynamically so the player doesn't wander blindly
        if (missionTemplate.type === 'kill') {
            const spawnCount = missionTemplate.goal + 2; // Extra to be safe
            for (let i = 0; i < spawnCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.sqrt(Math.random() * (25000000 - 4000000) + 4000000); // 2k to 5k range
                this.enemyShips.push({
                    x: this.playerShip.x + Math.cos(angle) * dist,
                    y: this.playerShip.y + Math.sin(angle) * dist,
                    vx: 0,
                    vy: 0,
                    type: missionTemplate.targetType,
                    health: InterstellarEngine.ENEMY_TYPES[missionTemplate.targetType]?.maxHealth || 100,
                    lastFire: 0
                });
            }
            this.showToast('⚠️ Mission Targets detected on radar!', 5000);
        } else if (missionTemplate.type === 'mine') {
            for (let i = 0; i < missionTemplate.goal + 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.sqrt(Math.random() * (12250000 - 2250000) + 2250000);
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
            this.showToast('📡 Mineral clusters marked on radar!', 5000);
        } else if (missionTemplate.type === 'defense') {
            // Defense mission spawns targets near the player's BASE
            const baseX = this.spaceBase?.x || 0;
            const baseY = this.spaceBase?.y || 0;
            const spawnCount = missionTemplate.goal;
            for (let i = 0; i < spawnCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.sqrt(Math.random() * (1000000 - 360000) + 360000); // Close range for siege
                this.enemyShips.push({
                    x: baseX + Math.cos(angle) * dist,
                    y: baseY + Math.sin(angle) * dist,
                    vx: 0,
                    vy: 0,
                    rotation: 0,
                    patrolAngle: 0,
                    type: 'hauler', // Using hauler as a 'Mauler' reference for mission
                    health: 200,
                    maxHealth: 200,
                    lastFire: 0,
                    faction: 'mauler',
                    state: 'chase' // Make them aggressive
                });
            }
            this.showToast('🚨 BASE UNDER ATTACK! Strategic defenses required.', 5000);
        }

        this.hideMissionBoardUI();

        // If the player is in the hangar, seamlessly enter flight mode!
        if (!this.flightMode) {
            if (typeof this.hideShipModal === 'function') this.hideShipModal();
            this.flightMode = true; // Force ON safely
            if (this.playerShip) {
                this.playerShip.invulnerableUntil = performance.now() + 3000;
            }
            const hud = document.getElementById('flightHUD');
            const floatingLeaders = document.getElementById('floatingLeaders');
            if (hud) hud.classList.remove('hidden');
            if (floatingLeaders) floatingLeaders.classList.remove('hidden');
        }
        this.updateMissionHUD();
    }

    abandonMission() {
        if (!this.activeMission) return;
        this.showToast(`❌ Mission abandoned: ${this.activeMission.name}`, 2000);
        if (this.activeBoss && this.activeMission.type === 'boss') {
            this.activeBoss = null; // Remove boss
        }
        this.activeMission = null;
        this.updateMissionHUD();
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
            this.showMissionCompleteOverlay(m);
            gameAudio.playMissionComplete();
            this.activeMission = null;
            this.updateMissionHUD();
        }
    }

    showMissionCompleteOverlay(mission) {
        // Remove any existing overlay
        const existing = document.getElementById('missionCompleteOverlay');
        if (existing) existing.remove();

        // Determine performance rank
        const elapsed = (Date.now() - mission.startTime) / 1000;
        let rank, rankColor, rankGlow;
        if (elapsed < 30) { rank = 'S'; rankColor = '#ffd700'; rankGlow = 'rgba(255,215,0,0.8)'; }
        else if (elapsed < 60) { rank = 'A'; rankColor = '#00ff88'; rankGlow = 'rgba(0,255,136,0.6)'; }
        else if (elapsed < 120) { rank = 'B'; rankColor = '#00ccff'; rankGlow = 'rgba(0,204,255,0.5)'; }
        else { rank = 'C'; rankColor = '#aaaaaa'; rankGlow = 'rgba(170,170,170,0.4)'; }

        // Build the overlay
        const overlay = document.createElement('div');
        overlay.id = 'missionCompleteOverlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 99999; pointer-events: none;
            display: flex; align-items: center; justify-content: center;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%);
            animation: mco-fadein 0.3s ease-out;
        `;

        // Particle canvas for celebration effects
        const particleCanvas = document.createElement('canvas');
        particleCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
        overlay.appendChild(particleCanvas);

        // Central achievement card
        const card = document.createElement('div');
        card.style.cssText = `
            position: relative; z-index: 2;
            background: linear-gradient(145deg, rgba(10,20,40,0.95), rgba(5,10,25,0.98));
            border: 2px solid ${rankColor};
            border-radius: 16px; padding: 40px 60px;
            text-align: center; font-family: 'Orbitron', 'Exo 2', monospace;
            box-shadow: 0 0 60px ${rankGlow}, 0 0 120px ${rankGlow}, inset 0 0 40px rgba(0,0,0,0.5);
            animation: mco-card-enter 0.6s cubic-bezier(0.2,0.8,0.2,1.2);
            max-width: 480px; min-width: 360px;
        `;

        // Mission type icon
        let typeIcon = '🎯';
        if (mission.type === 'kill' || mission.type === 'kill_any') typeIcon = '⚔️';
        else if (mission.type === 'boss') typeIcon = '👑';
        else if (mission.type === 'collect') typeIcon = '💎';
        else if (mission.type === 'survive') typeIcon = '🛡️';

        card.innerHTML = `
            <div style="font-size: 12px; color: #555; letter-spacing: 6px; margin-bottom: 8px; text-transform: uppercase;">Mission Complete</div>
            <div style="font-size: 48px; margin-bottom: 4px; filter: drop-shadow(0 0 10px ${rankGlow});">${typeIcon}</div>
            <div style="font-size: 22px; color: #fff; font-weight: 900; letter-spacing: 2px; margin-bottom: 4px;
                text-shadow: 0 0 20px rgba(255,255,255,0.3);">${mission.name}</div>
            <div style="font-size: 13px; color: #aaa; margin-bottom: 20px; font-style: italic;">${mission.desc}</div>

            <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px;">
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">RANK</div>
                    <div id="mco-rank" style="font-size: 42px; font-weight: 900; color: ${rankColor};
                        text-shadow: 0 0 30px ${rankGlow}, 0 0 60px ${rankGlow};
                        animation: mco-rank-pulse 1s ease-in-out infinite alternate;
                        opacity: 0; transform: scale(3);">${rank}</div>
                </div>
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">REWARD</div>
                    <div style="font-size: 32px; color: #ffd700; font-weight: bold;
                        text-shadow: 0 0 20px rgba(255,215,0,0.5);">
                        💎 <span id="mco-gem-counter">0</span>
                    </div>
                </div>
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">TIME</div>
                    <div style="font-size: 22px; color: #8af; font-weight: bold;">${elapsed.toFixed(1)}s</div>
                </div>
            </div>

            <div style="height: 3px; background: linear-gradient(90deg, transparent, ${rankColor}, transparent);
                margin: 15px auto; width: 80%; border-radius: 2px;"></div>

            <div style="font-size: 11px; color: #667; letter-spacing: 2px; margin-top: 8px;">
                TOTAL MISSIONS: ${this.missionsCompleted}
            </div>
        `;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Inject keyframe animations
        if (!document.getElementById('mco-styles')) {
            const style = document.createElement('style');
            style.id = 'mco-styles';
            style.textContent = `
                @keyframes mco-fadein { from { opacity: 0; } to { opacity: 1; } }
                @keyframes mco-fadeout { from { opacity: 1; } to { opacity: 0; } }
                @keyframes mco-card-enter {
                    0% { opacity: 0; transform: scale(0.5) translateY(40px); }
                    60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
                    100% { transform: scale(1) translateY(0); }
                }
                @keyframes mco-rank-pulse {
                    from { text-shadow: 0 0 20px currentColor; }
                    to { text-shadow: 0 0 40px currentColor, 0 0 80px currentColor; }
                }
                @keyframes mco-rank-slam {
                    0% { opacity: 0; transform: scale(3); }
                    50% { opacity: 1; transform: scale(0.8); }
                    70% { transform: scale(1.15); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        // Animate rank letter slam-in after 0.5s
        setTimeout(() => {
            const rankEl = document.getElementById('mco-rank');
            if (rankEl) {
                rankEl.style.animation = 'mco-rank-slam 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards, mco-rank-pulse 1s ease-in-out infinite alternate 0.5s';
            }
        }, 500);

        // Animate gem counter tick-up
        const gemTarget = mission.reward;
        let gemCurrent = 0;
        const gemInterval = setInterval(() => {
            gemCurrent += Math.ceil(gemTarget / 30);
            if (gemCurrent >= gemTarget) {
                gemCurrent = gemTarget;
                clearInterval(gemInterval);
            }
            const counter = document.getElementById('mco-gem-counter');
            if (counter) counter.textContent = gemCurrent;
        }, 40);

        // Particle celebration system on canvas
        const resizeCanvas = () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        };
        resizeCanvas();

        const particles = [];
        const pCtx = particleCanvas.getContext('2d');
        const sparkColors = ['#ffd700', '#ff6b9d', '#00ff88', '#00ccff', '#ff44ff', '#ffaa00'];

        // Burst particles from center
        for (let i = 0; i < 120; i++) {
            const angle = (Math.PI * 2 * i) / 120 + (Math.random() - 0.5) * 0.5;
            const speed = 3 + Math.random() * 8;
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
                life: 1.0,
                decay: 0.008 + Math.random() * 0.012,
                gravity: 0.05 + Math.random() * 0.05,
                type: Math.random() > 0.5 ? 'spark' : 'star'
            });
        }

        // Side confetti streams
        for (let i = 0; i < 60; i++) {
            const side = Math.random() > 0.5 ? 0 : window.innerWidth;
            particles.push({
                x: side,
                y: window.innerHeight * Math.random() * 0.6,
                vx: (side === 0 ? 1 : -1) * (2 + Math.random() * 4),
                vy: -1 + Math.random() * 3,
                size: 3 + Math.random() * 5,
                color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
                life: 1.0,
                decay: 0.006 + Math.random() * 0.008,
                gravity: 0.08,
                type: 'confetti',
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.3
            });
        }

        let animFrame;
        const animateParticles = () => {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.vy += p.gravity;
                p.y += p.vy;
                p.life -= p.decay;
                if (p.rotation !== undefined) p.rotation += p.rotSpeed;

                if (p.life <= 0) { particles.splice(i, 1); continue; }

                pCtx.globalAlpha = p.life;

                if (p.type === 'spark') {
                    pCtx.beginPath();
                    pCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    pCtx.fillStyle = p.color;
                    pCtx.shadowBlur = 15;
                    pCtx.shadowColor = p.color;
                    pCtx.fill();
                    pCtx.shadowBlur = 0;
                } else if (p.type === 'star') {
                    pCtx.save();
                    pCtx.translate(p.x, p.y);
                    pCtx.fillStyle = p.color;
                    pCtx.shadowBlur = 10;
                    pCtx.shadowColor = p.color;
                    pCtx.font = `${p.size * 3}px serif`;
                    pCtx.fillText('✦', 0, 0);
                    pCtx.restore();
                    pCtx.shadowBlur = 0;
                } else if (p.type === 'confetti') {
                    pCtx.save();
                    pCtx.translate(p.x, p.y);
                    pCtx.rotate(p.rotation);
                    pCtx.fillStyle = p.color;
                    pCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                    pCtx.restore();
                }
            }
            pCtx.globalAlpha = 1;

            if (particles.length > 0) {
                animFrame = requestAnimationFrame(animateParticles);
            }
        };
        animateParticles();

        // Auto-dismiss after 5 seconds with fade-out
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.animation = 'mco-fadeout 0.8s ease-in forwards';
                setTimeout(() => {
                    cancelAnimationFrame(animFrame);
                    overlay.remove();
                }, 800);
            }
        }, 5000);
    }

    updateMissionHUD() {
        const section = document.getElementById('sectionMission');
        const content = document.getElementById('missionContent');
        if (!section || !content) return;

        if (this.activeMission && this.flightMode) {
            section.style.display = 'flex';
            // Make mission window VERY prominent with pulsing glow
            section.style.border = '2px solid #00ffcc';
            section.style.boxShadow = '0 0 20px rgba(0,255,204,0.5), 0 0 40px rgba(0,255,204,0.2), inset 0 0 15px rgba(0,255,204,0.1)';
            section.style.animation = 'missionPulse 2s ease-in-out infinite';
            section.style.zIndex = '50';
            // Inject keyframe if not present
            if (!document.getElementById('missionPulseStyle')) {
                const style = document.createElement('style');
                style.id = 'missionPulseStyle';
                style.textContent = `
                    @keyframes missionPulse {
                        0%, 100% { box-shadow: 0 0 20px rgba(0,255,204,0.5), 0 0 40px rgba(0,255,204,0.2); border-color: #00ffcc; }
                        50% { box-shadow: 0 0 30px rgba(0,255,204,0.8), 0 0 60px rgba(0,255,204,0.4); border-color: #66ffdd; }
                    }
                `;
                document.head.appendChild(style);
            }
            const m = this.activeMission;
            const pct = Math.min(100, Math.round((m.progress / m.goal) * 100));
            
            // Use the mission-specific hint if available, fall back to generic
            let tip = '';
            if (m.hint) {
                tip = `<div style="color: #00eaff; font-size: 11px; margin-top: 8px; font-style: italic; font-weight: bold; line-height: 1.4; background: rgba(0,234,255,0.08); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #00eaff;">${m.hint}</div>`;
            } else if (m.type === 'kill' || m.type === 'kill_any' || m.type === 'boss') {
                tip = '<div style="color: #ff6b6b; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(255,50,50,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #ff6b6b;">🎯 Hold [SPACE] to Fire Weapons</div>';
            } else if (m.type === 'collect') {
                tip = '<div style="color: #f17eff; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(241,126,255,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #f17eff;">💎 Fly over glowing gems to collect</div>';
            } else if (m.type === 'survive') {
                tip = '<div style="color: #ffaa00; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(255,170,0,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #ffaa00;">⚠️ Dodge hazards — stay alive!</div>';
            }
            
            content.innerHTML = `
                <div style="color: #00ffcc; font-weight: bold; font-size: 14px; margin-bottom: 4px; text-shadow: 0 0 8px rgba(0,255,204,0.4);">${m.name}</div>
                <div style="color: #ddd; margin-bottom: 8px; font-size: 12px; line-height: 1.4;">${m.desc}</div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 6px; padding: 8px; margin-bottom: 4px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #aaa; margin-bottom: 4px;">
                        <span>PROGRESS</span>
                        <span style="color: #00ff88; font-weight: bold;">${m.progress} / ${m.goal}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); border-radius: 3px; height: 8px; overflow: hidden;">
                        <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #00ff88, #00ffcc); border-radius: 3px; transition: width 0.3s ease; box-shadow: 0 0 8px rgba(0,255,136,0.5);"></div>
                    </div>
                </div>
                ${tip}
            `;
        } else {
            section.style.display = 'none';
            section.style.border = '';
            section.style.boxShadow = '';
            section.style.animation = '';
        }
    }

    toggleMissionBoard() {
        this.missionBoardOpen = !this.missionBoardOpen;
        if (this.missionBoardOpen) {
            this.showMissionBoardUI();
            if (this.flightMode) this.gamePaused = true;
        } else {
            this.hideMissionBoardUI();
            if (this.flightMode) this.gamePaused = false;
        }
    }

    showMissionBoardUI() {
        // Remove existing
        let overlay = document.getElementById('missionBoardOverlay');
        if (overlay) overlay.remove();

        const missions = this.generateMissionBoard();

        overlay = document.createElement('div');
        overlay.id = 'missionBoardOverlay';
        overlay.className = 'modal-overlay hidden';
        // Add active in next frame for transition
        setTimeout(() => overlay.classList.add('active'), 10);

        this.gamePaused = true;

        let html = `
        <div class="modal" style="width: 500px; max-width: 95vw;">
            <div class="modal-close-corner">
                <button class="btn-secondary" onclick="window.game.hideMissionBoardUI()">EXIT MISSIONS</button>
            </div>
            <h2 style="color: #00ffcc; text-shadow: 0 0 10px rgba(0, 255, 204, 0.5); font-family: 'Cinzel', serif; margin-top: 0; text-align: center;">MISSION BOARD</h2>
            <p style="color: #888; font-size: 11px; text-align: center; margin: 0 0 20px;">Missions Completed: ${this.missionsCompleted} | Bosses Defeated: ${this.bossesDefeated}</p>
            <div style="overflow-y: auto; max-height: 400px; padding-right: 10px;">
        `;

        if (this.activeMission) {
            html += `<div style="background: rgba(255,170,0,0.15); border: 1px solid #ffaa00; border-radius: 8px; padding: 15px; margin-bottom: 10px;">`;
            html += `<div style="color: #ffaa00; font-size: 14px; font-weight: bold; margin-bottom: 5px;">ACTIVE: ${this.activeMission.name}</div>`;
            html += `<div style="color: #ccc; font-size: 12px; margin: 4px 0;">${this.activeMission.desc}</div>`;
            if (this.activeMission.hint) {
                html += `<div style="color: #00eaff; font-size: 10px; margin: 8px 0; font-style: italic;">${this.activeMission.hint}</div>`;
            }
            html += `<div style="color: #00ff88; font-size: 12px; margin-top: 10px; font-weight: bold;">Progress: ${this.activeMission.progress}/${this.activeMission.goal}</div>`;
            html += `<button onclick="window.game.abandonMission(); window.game.hideMissionBoardUI();" class="btn-small" style="
                margin-top: 12px; width: 100%; background: rgba(255,50,50,0.2); color: #ff4444; border-color: #ff4444;
            ">ABANDON MISSION</button></div>`;
        } else {
            const tierColors = { 1: '#00ff88', 2: '#ffaa00', 3: '#ff6b9d', 4: '#ff44ff' };
            const tierLabels = { 1: 'BASICS', 2: 'COMBAT', 3: 'ADVANCED', 4: 'ELITE' };
            missions.forEach((m, i) => {
                const desc = m.desc.replace('{goal}', m.goal);
                const tierCol = tierColors[m.tier] || '#00ffcc';
                const tierLabel = tierLabels[m.tier] || 'MISSION';
                html += `<div style="background: rgba(0,255,204,0.05); border: 1px solid rgba(0,255,204,0.2); border-radius: 8px; padding: 15px; margin-bottom: 10px; transition: all 0.2s ease;">`;
                html += `<div style="display: flex; justify-content: space-between; align-items: flex-start;">`;
                html += `<div style="flex:1; padding-right: 15px;"><div style="display:flex; align-items:center; gap:8px; margin-bottom: 6px;"><span style="font-size:9px; color:${tierCol}; background:rgba(0,0,0,0.5); padding:3px 8px; border-radius:4px; border:1px solid ${tierCol}; letter-spacing:1px; font-weight: bold;">${tierLabel}</span><span style="color: #00ffcc; font-size: 14px; font-weight: bold;">${m.name}</span></div>`;
                html += `<div style="color: #aaa; font-size: 12px; margin-top: 5px;">${desc}</div>`;
                if (m.briefing) {
                    html += `<div style="color: #7ab; font-size: 11px; margin-top: 8px; line-height: 1.5; border-left: 2px solid rgba(0,255,204,0.3); padding-left: 10px;">${m.briefing}</div>`;
                }
                html += `</div>`;
                html += `<div style="text-align: right; min-width: 90px;"><div style="font-size: 10px; color: #667; letter-spacing: 1px; margin-bottom: 4px;">REWARD</div><div style="color: #ffd700; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(255,215,0,0.5);">💎 ${m.reward}</div>`;
                html += `<button onclick="window.game.acceptMission(window.game._boardMissions[${i}])" class="btn-small" style="
                    margin-top: 10px; width: 100%; border-color: #00ffcc; color: #00ffcc;
                ">ACCEPT</button></div></div></div>`;
            });
        }

        html += `</div></div>`; // Close overflow div and modal

        overlay.innerHTML = html;
        document.body.appendChild(overlay);

        // Store missions for button callbacks
        this._boardMissions = missions;
    }

    hideMissionBoardUI() {
        const overlay = document.getElementById('missionBoardOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
        this.missionBoardOpen = false;
        this.gamePaused = false;
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
        if (modal) {
            modal.classList.add('active');
            if (this.flightMode) this.gamePaused = true;
        }
    }

    hideGemGuide() {
        const modal = document.getElementById('gemGuideModal');
        if (modal) {
            modal.classList.remove('active');
            if (this.flightMode) this.gamePaused = false;
        }
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
            return saved ? JSON.parse(saved) : { xenon: -20, mauler: -20, terran: 0 };
        } catch (e) {
            console.error('[Storage] FactionRep parse failed, resetting.', e);
            return { xenon: -20, mauler: -20, terran: 0 };
        }
    }

    saveFactionRep() {
        localStorage.setItem('factionRep', JSON.stringify(this.factionRep));
    }

    repairHull() {
        const cost = 2000;
        if (this.credits < cost) {
            this.showToast("❌ Insufficient credits for repair!");
            return;
        }

        this.credits -= cost;
        this.playerShip.hullHealth = this.playerShip.maxHull; // Full restore
        this.saveCredits();
        this.updateShipStatus();
        this.showToast("🔧 HULL REPAIRED! Systems back online.");

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

    saveGems() {
        localStorage.setItem('playerGems', this.playerGems);
        this.updateGemsUI();
    }

    loadStats() {
        try {
            return JSON.parse(localStorage.getItem('playerStats')) || {
                kills: 0,
                deaths: 0,
                shotsFired: 0,
                shotsHit: 0
            };
        } catch (e) {
            return {
                kills: 0,
                deaths: 0,
                shotsFired: 0,
                shotsHit: 0
            };
        }
    }

    saveStats() {
        localStorage.setItem('playerStats', JSON.stringify(this.playerStats));
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
                .map(([type, qty]) => `${qty} ${this.mineralTypes[type]?.name || type}`)
                .join(', ');
            this.showToast(`💀 Lost 25% cargo: ${lostNames}`);
            console.log('[Death Penalty] Lost resources:', lostResources);
        }

        return lostResources;
    }

    // Deposit resources from ship to base vault
    depositResources(resourceType, amount) {
        if (!this.spaceBase.isDeployed) {
            this.showToast('⚠️ Deploy your base first!');
            return false;
        }

        const available = this.carriedResources[resourceType] || 0;
        const toDeposit = Math.min(amount, available);

        if (toDeposit <= 0) {
            this.showToast('⚠️ No resources to deposit!');
            return false;
        }

        this.carriedResources[resourceType] -= toDeposit;
        this.spaceBase.resources[resourceType] = (this.spaceBase.resources[resourceType] || 0) + toDeposit;

        this.saveCarriedResources();
        this.saveSpaceBase();

        this.showToast(`📦 Deposited ${toDeposit} ${this.mineralTypes[resourceType]?.name || resourceType}`);
        return true;
    }

    // Withdraw resources from base to ship
    withdrawResources(resourceType, amount) {
        if (!this.spaceBase.isDeployed) {
            this.showToast('⚠️ Deploy your base first!');
            return false;
        }

        const available = this.spaceBase.resources[resourceType] || 0;
        const toWithdraw = Math.min(amount, available);

        if (toWithdraw <= 0) {
            this.showToast('⚠️ No resources in vault!');
            return false;
        }

        this.spaceBase.resources[resourceType] -= toWithdraw;
        this.carriedResources[resourceType] = (this.carriedResources[resourceType] || 0) + toWithdraw;

        this.saveCarriedResources();
        this.saveSpaceBase();

        this.showToast(`📤 Withdrew ${toWithdraw} ${this.mineralTypes[resourceType]?.name || resourceType}`);
        return true;
    }

    // === SPACE BASE DEPLOYMENT & MODULES ===

    // Deploy base at current location
    deployBase() {
        if (this.spaceBase.isDeployed) {
            this.showToast('⚠️ Base already deployed! Toggle towing to move it.');
            return false;
        }

        // Need command center first
        if (!this.hasModule('command')) {
            // Build command center automatically on first deployment
            if (this.credits >= 1000) {
                this.credits -= 1000;
                this.saveCredits();
                this.spaceBase.modules.push({ type: 'command', level: 1, builtAt: Date.now() });
                this.showToast('🏛️ Command Center built!');
            } else {
                this.showToast('⚠️ Need 1,000 credits to build Command Center!');
                return false;
            }
        }

        this.spaceBase.x = this.playerShip.x;
        this.spaceBase.y = this.playerShip.y;
        this.spaceBase.isDeployed = true;
        this.spaceBase.isTowing = false;
        this.saveSpaceBase();

        this.showToast('🏠 Base deployed at current location!');
        return true;
    }

    // Toggle towing mode (pick up base to move it)
    toggleTowing() {
        if (!this.spaceBase.isDeployed) {
            this.showToast('⚠️ No base deployed yet!');
            return false;
        }

        // Must be near base to pick it up
        if (!this.spaceBase.isTowing) {
            const dist = Math.hypot(
                this.playerShip.x - this.spaceBase.x,
                this.playerShip.y - this.spaceBase.y
            );
            if (dist > 500) {
                this.showToast('⚠️ Too far from base! Get closer to tow.');
                return false;
            }
        }

        this.spaceBase.isTowing = !this.spaceBase.isTowing;
        this.saveSpaceBase();

        if (this.spaceBase.isTowing) {
            this.showToast('🔗 Towing base! Speed reduced 50%.');
        } else {
            this.spaceBase.x = this.playerShip.x;
            this.spaceBase.y = this.playerShip.y;
            this.showToast('📍 Base anchored at new location!');
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
            this.showToast('⚠️ Unknown module type!');
            return false;
        }

        if (!this.spaceBase.isDeployed) {
            this.showToast('⚠️ Deploy your base first!');
            return false;
        }

        // Check prerequisite
        if (moduleDef.required && !this.hasModule(moduleDef.required)) {
            this.showToast(`⚠️ Requires ${this.baseModules[moduleDef.required].name} first!`);
            return false;
        }

        // Check credits
        if (this.credits < moduleDef.cost) {
            this.showToast(`⚠️ Need ${moduleDef.cost} credits!`);
            return false;
        }

        // Check resource costs
        if (moduleDef.resourceCost) {
            for (const [res, amount] of Object.entries(moduleDef.resourceCost)) {
                const available = (this.spaceBase.resources[res] || 0) + (this.carriedResources[res] || 0);
                if (available < amount) {
                    this.showToast(`⚠️ Need ${amount} ${this.mineralTypes[res]?.name || res}!`);
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

        this.showToast(`${moduleDef.icon} ${moduleDef.name} built!`);
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
                if (this.flightMode) this.gamePaused = true;
            } else {
                if (this.flightMode) this.gamePaused = false;
            }
        } else {
            this.showToast('🏠 Base Menu: ' + this.spaceBase.modules.length + ' modules built');
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
                const def = this.mineralTypes[type];
                return `<div class="vault-item" style="color:${def?.color || '#fff'}">
                    ${def?.name || type}: ${qty}
                </div>`;
            }).join('') || '<div class="vault-empty">Vault empty</div>';
        }
    }

    // Deposit all carried resources to base vault
    depositAllResources() {
        if (!this.spaceBase.isDeployed) {
            this.showToast('⚠️ Deploy base first!');
            return false;
        }

        if (!this.isNearBase()) {
            this.showToast('⚠️ Get closer to base!');
            return false;
        }

        let totalDeposited = 0;
        const deposited = [];

        for (const [type, qty] of Object.entries(this.carriedResources)) {
            if (qty > 0) {
                this.spaceBase.resources[type] = (this.spaceBase.resources[type] || 0) + qty;
                deposited.push(`${qty} ${this.mineralTypes[type]?.name || type}`);
                totalDeposited += qty;
                this.carriedResources[type] = 0;
            }
        }

        if (totalDeposited > 0) {
            this.playerShip.cargoCount = 0; // Reset total count
            this.saveCarriedResources();
            this.saveSpaceBase();
            this.showToast(`📦 Deposited: ${deposited.slice(0, 3).join(', ')}${deposited.length > 3 ? '...' : ''}`);
            console.log('[Base] Deposited all:', deposited);

            // Recharge Flares on deposit
            if (this.playerShip && this.playerShip.maxFlares > 0) {
                this.playerShip.flares = this.playerShip.maxFlares;
                this.showToast('🔥 Flares Recharged!');
            }
        } else {
            this.showToast('⚠️ No resources to deposit!');
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
                    this.showToast("🚀 Nirvana Pilot Active - 20% Bonus gems enabled!", 5000);
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
                const val = this.mineralTypes[type].value;
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
            this.showToast(`Sold ${count} ores for $${totalValue.toLocaleString()} and earned ${gemsAwarded} Gems!`);
            console.log('[Sell All] Success:', count, 'gems for $', totalValue, 'Gems:', gemsAwarded);

            // Update UI immediately
            this.updateWalletUI();
            this.updateInventoryUI();
            if (this.updateGemsUI) this.updateGemsUI();
        } else {
            this.showToast('No ores to sell');
            console.log('[Sell All] No gems in inventory');
        }
    }

    updateGemsUI() {
        // Update the Hangar Gem counter if it exists
        const hangarGemsEl = document.getElementById('hangarGemBalance');
        if (hangarGemsEl) {
            hangarGemsEl.textContent = this.playerGems.toLocaleString();
        }
        
        // Update the HUD Gem counter
        const hudGemsEl = document.getElementById('hudGemsValue');
        if (hudGemsEl) {
            hudGemsEl.textContent = '💎' + this.playerGems.toLocaleString();
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

    updateWalletUI() {
        const creditsEl = document.getElementById('walletValue');
        if (creditsEl && !creditsEl.querySelector('input')) {
            creditsEl.textContent = '$' + this.credits.toLocaleString();
        }
        const shopCreditsEl = document.getElementById('walletValueShop');
        if (shopCreditsEl && !shopCreditsEl.querySelector('input')) {
            shopCreditsEl.textContent = '$' + this.credits.toLocaleString();
        }
        const creditsDisplay = document.getElementById('creditsDisplay'); // Legacy support
        if (creditsDisplay && !creditsDisplay.querySelector('input')) {
            creditsDisplay.textContent = '$' + this.credits.toLocaleString();
        }
    }

    updateInventoryUI() {
        const gemsGrid = document.getElementById('gemsGrid');
        const gemsTotalEl = document.getElementById('gemsTotal');

        if (!gemsGrid) return;

        let totalValue = 0;
        let html = '';

        // Calculate total value
        Object.entries(this.playerInventory || {}).forEach(([type, count]) => {
            const info = this.mineralTypes[type];
            if (info) totalValue += count * info.value;
        });

        // Display ALL types
        Object.keys(this.mineralTypes).forEach(type => {
            const info = this.mineralTypes[type];
            const count = (this.playerInventory && this.playerInventory[type]) || 0;

            const itemValue = count * info.value;
            const valueDisplay = this.showGemValues ? `<span style="color:${info.color}; font-weight:bold; margin-left:6px;">$${Math.round(itemValue).toLocaleString()}</span>` : '';

            const opacity = count > 0 ? 1 : 0.5;
            const bgAlpha = count > 0 ? 0.6 : 0.2;

            html += `
                        <div class="gem-item" style="border:1px solid ${info.color}44; background: rgba(0,0,0,${bgAlpha}); opacity: ${opacity};">
                            <div style="${this.styleGem(type)}"></div>
                            <span style="color:${info.color}">${info.name}</span>
                            <span class="gem-count">×${count}</span>
                            ${valueDisplay}
                        </div>
                    `;
        });

        gemsGrid.innerHTML = html;

        if (gemsTotalEl) {
            gemsTotalEl.textContent = `$${totalValue.toLocaleString()}`;
        }
    }

    upgradeShip(type) {
        const upgradeCosts = [1000, 2500, 5000, 10000, 25000]; // Function of level maybe?
        const currentLevel = this.playerShip.upgrades[type] || 0;

        if (currentLevel >= 5) {
            this.showToast('Max level reached!');
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

            this.showToast(`${type.toUpperCase()} Upgraded to Level ${lvl + 1} !`);
            this.updateUpgradeUI(); // Assuming we'll create this method
        } else {
            this.showToast(`Not enough credits! Need $${cost.toLocaleString()} `);
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
        let mineralAttempts = 0;
        while (this.minerals.length < targetDensity && mineralAttempts < targetDensity * 5) {
            mineralAttempts++;
            const currentZone = this.getZoneAtDistance(playerDistFromOrigin);
            const mineralKey = this.selectElementForZone(currentZone, playerDistFromOrigin, hotspotBonus);
            const type = this.mineralTypes[mineralKey];
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
        for (const [zoneKey, zone] of Object.entries(this.galaxyZones)) {
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
        const zones = this.galaxyZones;
        const allElements = Object.keys(this.mineralTypes);

        // Build probability weights with ZONE-BASED PROGRESSION
        const weights = [];
        let totalWeight = 0;

        for (const elementKey of allElements) {
            const element = this.mineralTypes[elementKey];
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
    collectMineral(mineral) {
        if (!mineral || !this.playerShip) return;

        const dx = this.playerShip.x - mineral.x;
        const dy = this.playerShip.y - mineral.y;
        // For lotus: use 2D only - it lives in screen space, not 3D space
        // For all others: include Z so deep-space gems don't erroneously collect
        let dist;
        if (mineral.type === 'lotus') {
            dist = Math.sqrt(dx * dx + dy * dy);
        } else {
            const dz = (this.playerShip.z || 0) - (mineral.z || 0);
            dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        }

        // Standard collection range is 35 (size + ship size roughly)
        // PROSPECTOR: Gem Magnet - 20% wider pickup range
        let collectionRange = 35;
        if (mineral.type === 'lotus') {
            collectionRange = 100; // Very generous collection area for the giant lotus
        } else if (this.playerShip.type === 'prospector') {
            collectionRange = 45; // +30% Gem Magnet Range
        }

        if (dist < collectionRange) {
            // Check Cargo Capacity (Mindwave Lotus bypasses cargo limits because it's a powerup)
            const currentCargo = this.playerShip.cargoCount || 0;
            const maxCargo = this.playerShip.maxCargo || 1000;
            if (currentCargo >= maxCargo && mineral.type !== 'lotus') {
                if (!this.lastCargoFullToast || Date.now() - this.lastCargoFullToast > 3000) {
                    this.showToast('🛑 CARGO FULL! Deposit at base (Z)');
                    this.lastCargoFullToast = Date.now();
                }
                return;
            }

            // Mindwave Lotus Special Handling: Quantum Restoration
            if (mineral.type === 'lotus') {
                this.playerShip.hullHealth = this.playerShip.maxHull;
                this.playerShip.shield = this.playerShip.maxShield;
                this.playerShip.zenBuffer = Date.now() + 5000; // 5 seconds of peace
                this.updateShipStatus();
                this.showToast('🪷 Mindwave Lotus: INTEGRITY RESTORED / ZEN BUFFER ACTIVE', 3000);
                if (typeof gameAudio !== 'undefined' && gameAudio.playUpgrade) gameAudio.playUpgrade(); // Special sound
                
                // Add value to wallet and register it
                this.credits += (mineral.value || 1000);
                this.updateWalletUI();
                
                // Track for inventory logic, but Lotus does NOT take cargo space!
                if (!this.playerInventory[mineral.type]) this.playerInventory[mineral.type] = 0;
                this.playerInventory[mineral.type]++;
                this.carriedResources[mineral.type] = (this.carriedResources[mineral.type] || 0) + 1;
                this.saveInventory();
                this.saveCarriedResources();
                
                this.collectionNotifications.push({
                    text: `+ 🌸 LOTUS ($${mineral.value || 1000}) | MAX RESTORE`,
                    color: '#ff69b4',
                    time: Date.now()
                });
            } else {
                // Standard Gem: Add value to wallet
                this.credits += (mineral.value || 0);
                this.updateWalletUI();
                
                // Track for inventory logic
                if (!this.playerInventory[mineral.type]) this.playerInventory[mineral.type] = 0;
                this.playerInventory[mineral.type]++;
                this.carriedResources[mineral.type] = (this.carriedResources[mineral.type] || 0) + 1;
                this.playerShip.cargoCount = (this.playerShip.cargoCount || 0) + 1;
                this.saveInventory();
                this.saveCarriedResources();

                // Show standard notification
                this.collectionNotifications.push({
                    text: `+ ${mineral.name} ($${mineral.value})`,
                    color: mineral.color,
                    time: Date.now()
                });
            }

            // Siphon Ability: Restore 1% Shield
            if (this.playerShip.type === 'siphon' && this.playerShip.shield < this.playerShip.maxShield) {
                this.playerShip.shield = Math.min(this.playerShip.shield + (this.playerShip.maxShield * 0.01), this.playerShip.maxShield);
                this.updateShipStatus();
            }

            // Award permanent gems (1 gem per mineral collected)
            if (window.hapticFeedback) window.hapticFeedback(10);
            this.playerGems += 1;
            localStorage.setItem('playerGems', this.playerGems);

            // Pirate Boss Spawn Logic
            this.mineralsMinedCount = (this.mineralsMinedCount || 0) + 1;
            if (this.mineralsMinedCount >= 50 && !this.activeBoss) {
                this.mineralsMinedCount = 0; // Reset counter
                this.showToast('🚨 PIRATE DREADNOUGHT DETECTED! PREPARE FOR COMBAT! 🚨', 5000);
                this.spawnBoss('dreadnought');
            }

            // Audio: collect jingle
            if (typeof gameAudio !== 'undefined' && gameAudio.playCollect) {
                gameAudio.playCollect();
            }

            // Remove mineral
            const index = this.minerals.indexOf(mineral);
            if (index > -1) this.minerals.splice(index, 1);

            // MAULER VISUALS: Spawn debris trail
            if (this.playerShip.type === 'hauler' && mineral.type !== 'lotus') {
                if (!this.maulerDebris) this.maulerDebris = [];
                // Add debris particle
                this.maulerDebris.push({
                    x: this.playerShip.x, // Start at ship center
                    y: this.playerShip.y,
                    offsetX: (Math.random() - 0.5) * 20, // Random offset relative to ship
                    offsetY: (Math.random() - 0.5) * 20,
                    color: mineral.color,
                    size: mineral.size * 0.6,
                    detached: false, // Attached to ship initially
                    vx: 0,
                    vy: 0,
                    life: 1.0 // Fade out when detached
                });

                // Cap debris count
                if (this.maulerDebris.length > 50) this.maulerDebris.shift();
            }
        }
    }

    spawnMindwaveLotuses() {
        console.log("🌸 Spawning Mindwave Lotuses...");
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random() * (6250000 - 250000) + 250000);
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
        
        const safeZoom = Math.max(0.01, this.camera ? this.camera.zoom : 1);
        const effectiveSize = lotus.size / safeZoom;
        
        const glowPhase = (Date.now() * 0.002 + lotus.phase) % (Math.PI * 2);
        const glow = 0.5 + Math.sin(glowPhase) * 0.5;

        // Outer Glow (Keeping existing glow for presence)
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, effectiveSize * 2);
        grad.addColorStop(0, `rgba(255, 105, 180, ${0.4 * glow})`);
        grad.addColorStop(1, 'rgba(255, 105, 180, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, effectiveSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw Mindwave Lotus Image
        if (this.lotusImage.complete && this.lotusImage.naturalWidth > 0) {
            const drawSize = effectiveSize * 2.5; // Slightly larger for visual clarity
            ctx.drawImage(this.lotusImage, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        } else {
            // Fallback: Inner Core Glow if image not loaded yet
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffb6c1';
            ctx.beginPath();
            ctx.arc(0, 0, effectiveSize * 0.4, 0, Math.PI * 2);
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
            this.collectMineral(mineral);
        }

        // Spawn new minerals
        this.spawnMinerals();

        // Lotus respawn: max 5 at a time, spawn them frequently to ensure they are found
        const lotusCount = this.minerals.filter(m => m.type === 'lotus').length;
        const now = Date.now();
        if (lotusCount < 5) {
            if (!this.lastLotusRespawn || now - this.lastLotusRespawn > 5000) {
                this.lastLotusRespawn = now;
                // Spawn just enough to bring count up to 5
                const toSpawn = 5 - lotusCount;
                for (let i = 0; i < toSpawn; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.sqrt(Math.random() * (1210000 - 90000) + 90000); // Spawn much closer so player sees them
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

    updatePowerUps() {
        if (!this.flightMode) return;

        const ship = this.playerShip;
        if (!ship) return;

        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const pu = this.powerUps[i];
            const dx = pu.x - ship.x;
            const dy = pu.y - ship.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Pickup radius for powerups
            if (dist < ship.pickupRadius || dist < 60) {
                this.collectPowerUp(pu);
                this.powerUps.splice(i, 1);
            }
        }
    }

    collectPowerUp(pu) {
        if (pu.type === 'shield_boost') {
            this.playerShip.shield = Math.min(this.playerShip.maxShield, this.playerShip.shield + this.playerShip.maxShield * 0.5);
            this.showToast('🛡️ Shield Boost! (+50%)');
            this.createExplosion(pu.x, pu.y, 'hit');
        } else if (pu.type === 'hull_repair') {
            this.playerShip.hull = Math.min(this.playerShip.maxHull, this.playerShip.hull + this.playerShip.maxHull * 0.2);
            this.showToast('🔧 Hull Repair! (+20%)');
            this.createExplosion(pu.x, pu.y, 'hit');
        } else if (pu.type === 'weapon_overdrive') {
            this.playerShip.weaponOverdrive = Date.now() + 10000; // 10s
            this.showToast('⚔️ Weapon Overdrive! (10s)');
            this.createExplosion(pu.x, pu.y, 'hit');
        } else if (pu.type === 'speed_boost') {
            this.playerShip.speedBoost = Date.now() + 10000; // 10s
            this.showToast('🚀 Speed Boost! (10s)');
            this.createExplosion(pu.x, pu.y, 'hit');
        }
        
        // Ensure UI updates immediately
        if (this.updateShipStatus) this.updateShipStatus();
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
                if (mineral.type === 'coal' || mineral.type === 'darkmatter' || mineral.type === 'lotus') continue;

                const dx = this.playerShip.x - mineral.x;
                const dy = this.playerShip.y - mineral.y;
                const dz = (this.playerShip.z || 0) - (mineral.z || 0);
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                // Hard 25px check or scaling radius
                if (dist < tractorRadius && dist > 5) {
                    const pullIntensity = 1 - (dist / tractorRadius);
                    const pullVelocity = maxPullVelocity * pullIntensity;

                    const dirX = dx / Math.max(0.1, dist);
                    const dirY = dy / Math.max(0.1, dist);
                    const dirZ = dz / Math.max(0.1, dist);

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
                if (mineral.type === 'coal' || mineral.type === 'darkmatter' || mineral.type === 'lotus') continue;
                
                const dx = this.playerShip.x - mineral.x;
                const dy = this.playerShip.y - mineral.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < magnetRadius && dist > 10) {
                    const intensity = 1 - (dist / magnetRadius);
                    const pull = maxMagnetPull * intensity;
                    mineral.x += (dx / Math.max(0.1, dist)) * pull;
                    mineral.y += (dy / Math.max(0.1, dist)) * pull;
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
                    this.updateShipStatus();
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
    spawnHazards() {
        // Never spawn hazards during training - mines would kill students mid-lesson!
        if (!this.flightMode || this.hazardEffect || this.trainingActive) return;

        const ship = this.playerShip;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const maxDimension = Math.max(w, h);
        
        // Spawn objects completely off screen, taking zoom into account
        const minSpawnDist = Math.max(1800, (maxDimension / (2 * this.camera.zoom)) + 1000);
        const spawnRadius = minSpawnDist + 1500;

        // Target density: fewer hazards than minerals for balance
        const targetMines = 3;
        const targetBlackHoles = 1;

        // Remove distant hazards
        this.spaceMines = this.spaceMines.filter(m => {
            const dist = Math.hypot(m.x - ship.x, m.y - ship.y);
            return dist < spawnRadius * 2;
        });
        this.hazardBlackHoles = this.hazardBlackHoles.filter(bh => {
            const dist = Math.hypot(bh.x - ship.x, bh.y - ship.y);
            return dist < spawnRadius * 2;
        });

        // Helper: pick a safe spawn angle that avoids the player's current heading
        // Avoids 60° cone directly ahead so hazards never spawn where you're flying
        const safeAngle = () => {
            const heading = Math.atan2(ship.vy || 0, ship.vx || 0);
            let angle;
            let attempts = 0;
            do {
                angle = Math.random() * Math.PI * 2;
                const diff = Math.abs(((angle - heading) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
                attempts++;
                if (diff > Math.PI / 3) break; // Outside 60° cone ahead
            } while (attempts < 10);
            return angle;
        };

        // Spawn new mines — minSpawnDist away so player has time to react
        let mineAttempts = 0;
        while (this.spaceMines.length < targetMines && mineAttempts < targetMines * 5) {
            mineAttempts++;
            const angle = safeAngle();
            const dist = Math.sqrt(Math.random() * (spawnRadius*spawnRadius - minSpawnDist*minSpawnDist) + minSpawnDist*minSpawnDist);
            this.spaceMines.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                size: 25 + Math.random() * 15,
                pulsePhase: Math.random() * Math.PI * 2,
                color: '#ff4400',
                glowColor: 'rgba(255, 100, 0, 0.8)',
                health: 30 // One or two shots
            });
        }

        // Spawn new black holes (rarer) — extra far, they're inescapable
        let bhAttempts = 0;
        while (this.hazardBlackHoles.length < targetBlackHoles && bhAttempts < targetBlackHoles * 5) {
            bhAttempts++;
            const angle = safeAngle();
            const dist = Math.sqrt(Math.random() * (spawnRadius*spawnRadius - (minSpawnDist*1.5)*(minSpawnDist*1.5)) + (minSpawnDist*1.5)*(minSpawnDist*1.5));
            this.hazardBlackHoles.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                size: 60 + Math.random() * 40,
                rotationPhase: Math.random() * Math.PI * 2,
                particleRings: this.generateBlackHoleRings()
            });
        }

        // === MISSILE BASES ===
        const targetBases = 2; // Number of missile bases to maintain

        // Remove distant missile bases
        this.missileBases = this.missileBases.filter(base => {
            const dist = Math.hypot(base.x - ship.x, base.y - ship.y);
            return dist < spawnRadius * 2;
        });

        // Remove distant missiles
        this.enemyMissiles = this.enemyMissiles.filter(missile => {
            const dist = Math.hypot(missile.x - ship.x, missile.y - ship.y);
            return dist < spawnRadius * 2 && missile.life > 0;
        });

        // Spawn new missile bases
        const missileBaseMinDist = minSpawnDist + 200;
        let mbAttempts = 0;
        while (this.missileBases.length < targetBases && mbAttempts < targetBases * 5) {
            mbAttempts++;
            const angle = safeAngle();
            const dist = Math.sqrt(Math.random() * (spawnRadius*spawnRadius - missileBaseMinDist*missileBaseMinDist) + missileBaseMinDist*missileBaseMinDist);
            this.missileBases.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                size: 40 + Math.random() * 20,
                rotationPhase: Math.random() * Math.PI * 2,
                health: 100,
                lastFireTime: 0,
                fireRate: 800 + Math.random() * 800, // Faster firing (1-1.6s)
                detectionRange: 1200 + Math.random() * 600, // Much wider detection
                turretAngle: 0, // Current aim angle
                alertLevel: 0, // 0-1, increases when player is detected
                color: '#4488ff'
            });
        }
    }

    // Generate accretion disk particles for black hole
    generateBlackHoleRings() {
        const rings = [];
        for (let i = 0; i < 60; i++) {
            rings.push({
                angle: Math.random() * Math.PI * 2,
                radius: 0.8 + Math.random() * 0.7,
                speed: 0.02 + Math.random() * 0.03,
                brightness: 0.3 + Math.random() * 0.7,
                hue: 180 + Math.random() * 60 // Cyan to purple
            });
        }
        return rings;
    }

    // Update hazards - check collisions and spawn new ones
    updateHazards() {
        if (!this.flightMode) return;

        // If an effect is active, skip collision checks
        if (this.hazardEffect) {
            return;
        }

        // Give 3 seconds of invincibility after respawn to prevent immediate re-death loops
        if (this.playerShip.invulnerableUntil && performance.now() < this.playerShip.invulnerableUntil) {
            return;
        }

        // --- TRAINING TRACK PROGRESSION ---
        if (this.trainingActive) {
            this.updateTraining();
        }
        // Legacy tutorial hook (kept for backward compat)
        if (this.tutorialActive) {
            this.updateTutorial();
        }

        const ship = this.playerShip;
        const collisionRadius = 30;

        // Distress Beacons Generation & Logic
        if (!this.distressBeacons) this.distressBeacons = [];
        // Spawn chance based on time (about once every few minutes)
        if (Math.random() < 0.0002 && this.distressBeacons.length < 2) {
            this.distressBeacons.push({
                x: ship.x + (Math.random() - 0.5) * 8000,
                y: ship.y + (Math.random() - 0.5) * 8000,
                active: true,
                id: Date.now()
            });
            this.showToast('📡 DISTRESS BEACON DETECTED ON RADAR', 3000);
        }

        for (let i = this.distressBeacons.length - 1; i >= 0; i--) {
            const beacon = this.distressBeacons[i];
            const dist = Math.hypot(beacon.x - ship.x, beacon.y - ship.y);
            if (dist < 150 && beacon.active) {
                beacon.active = false;
                this.distressBeacons.splice(i, 1);
                // Reward player
                this.credits = (this.credits || 0) + 1500;
                localStorage.setItem('playerCredits', this.credits);
                this.showToast('✅ CIVILIAN RESCUED: +$1500!', 3000);
                if (typeof gameAudio !== 'undefined' && gameAudio.playCollect) gameAudio.playCollect();
            }
        }

        // Check mine collisions
        for (const mine of this.spaceMines) {
            const dist = Math.hypot(mine.x - ship.x, mine.y - ship.y);
            if (dist < mine.size + collisionRadius) {
                this.triggerSupernovaEffect(mine);
                this.spaceMines = this.spaceMines.filter(m => m !== mine);
                return;
            }
        }

        // Check Sun (Galaxy) collisions (Vaporization and Heat)
        if (this.galaxies) {
            for (const sun of this.galaxies) {
                const scale = sun.size / 42;
                const innerRadius = 15 * scale; // Instant death zone (solid core)
                
                const dx = ship.x - sun.x;
                const dy = ship.y - sun.y;
                const dist = Math.hypot(dx, dy);
                
                // State-of-the-art ray tracing collision for the 16-point starburst
                let shipAngle = Math.atan2(dy, dx);
                let relAngle = shipAngle - (sun.angle || 0);
                
                // Normalize to -PI to PI
                while (relAngle <= -Math.PI) relAngle += Math.PI * 2;
                while (relAngle > Math.PI) relAngle -= Math.PI * 2;
                
                // The pattern repeats every Math.PI / 4 (45 degrees).
                let localAngle = relAngle % (Math.PI / 4);
                if (localAngle < 0) localAngle += Math.PI / 4;
                
                // Shift so 0 is the long ray, and +/- 22.5 is the short ray
                if (localAngle > Math.PI / 8) {
                    localAngle -= Math.PI / 4;
                }
                const absAngle = Math.abs(localAngle); // 0 to 22.5 deg
                
                let effectiveRadius = 15;
                
                // Long ray (peaks at 0, length 42, angular width ~0.26 rad)
                if (absAngle < 0.26) {
                    const rLong = 42 - (27 * (absAngle / 0.26));
                    effectiveRadius = Math.max(effectiveRadius, rLong);
                }
                
                // Short ray (peaks at PI/8, length 32, angular width ~0.13 rad)
                const distToShort = Math.abs(absAngle - (Math.PI / 8));
                if (distToShort < 0.13) {
                    const rShort = 32 - (17 * (distToShort / 0.13));
                    effectiveRadius = Math.max(effectiveRadius, rShort);
                }
                
                const heatRadius = effectiveRadius * scale;
                
                if (dist < innerRadius + collisionRadius) {
                    this.showToast('☀️ VAPORIZED BY THE SUN!');
                    
                    // Vaporize instantly
                    this.damagePlayer(Infinity, true, false); 
                    
                    // Override the hazard effect for a cinematic whiteout vaporization
                    if (this.hazardEffect) {
                        this.hazardEffect.type = 'supernova'; // Massive whiteout
                        this.hazardEffect.duration = 4000;
                    }
                    return;
                } else if (dist < heatRadius + collisionRadius) {
                    // Ship loses shield first, then health
                    this.damagePlayer(0.5, false, Math.random() > 0.05); // Silent 95% of the time to avoid audio spam
                    
                    // Melting particles
                    if (Math.random() < 0.4 && this.damageParticles) {
                        this.damageParticles.push({
                            x: ship.x + (Math.random() - 0.5) * 30,
                            y: ship.y + (Math.random() - 0.5) * 30,
                            vx: ship.vx * 0.8 + (Math.random() - 0.5) * 4,
                            vy: ship.vy * 0.8 + (Math.random() - 0.5) * 4,
                            life: 30 + Math.random() * 20,
                            color: Math.random() < 0.5 ? '#ff4400' : '#ffaa00',
                            size: 4 + Math.random() * 6
                        });
                    }

                    if (Math.random() < 0.02) {
                        this.showToast('🔥 SHIELDS MELTING! TOUCHING SOLAR FLARES!', 1000);
                    }
                }
            }
        }

        // Check black hole collisions
        for (const bh of this.hazardBlackHoles) {
            const dist = Math.hypot(bh.x - ship.x, bh.y - ship.y);
            
            // True Gravity Well
            const gravityRadius = bh.size * 5;
            if (dist < gravityRadius && dist > 1) {
                const pullStrength = (1 - (dist / gravityRadius)) * 0.5;
                ship.vx += ((bh.x - ship.x) / Math.max(0.1, dist)) * pullStrength;
                ship.vy += ((bh.y - ship.y) / Math.max(0.1, dist)) * pullStrength;
            }

            if (dist < bh.size * 0.5 + collisionRadius) {
                this.triggerBlackHoleEffect(bh);
                this.hazardBlackHoles = this.hazardBlackHoles.filter(b => b !== bh);
                return;
            }
        }

        // Check missile base collisions (ramming the base)
        for (const base of this.missileBases) {
            const dist = Math.hypot(base.x - ship.x, base.y - ship.y);
            if (dist < base.size * 1.5 + collisionRadius) {
                this.triggerMissileBaseDestructionEffect(base);
                this.missileBases = this.missileBases.filter(b => b !== base);
                return;
            }
        }

        // Check planet collisions (deep space background planets)
        // Only check if deep space style is active and planets exist
        if (this.planets && this.planets.length > 0) {
            for (const planet of this.planets) {
                const effectiveRadius = planet.radius;

                const dist = Math.hypot(planet.x - ship.x, planet.y - ship.y);
                if (dist < effectiveRadius + collisionRadius) {
                    const speed = Math.hypot(ship.vx, ship.vy);
                    if (planet.type === 'terrestrial' && speed < 5) {
                        // Planetary Landing Sequence - zero out playerShip velocity
                        this.playerShip.vx = 0;
                        this.playerShip.vy = 0;
                        this.openBaseBuilder(planet);
                        return;
                    } else {
                        this.triggerPlanetImpactEffect(planet);
                        return; // High speed crash into planet
                    }
                }
            }
        }

        // === UPDATE MISSILE BASES ===
        const now = Date.now();
        for (const base of this.missileBases) {
            const distToPlayer = Math.hypot(base.x - ship.x, base.y - ship.y);

            // Update turret angle to track player
            const angleToPlayer = Math.atan2(ship.y - base.y, ship.x - base.x);

            // Smooth turret rotation
            let angleDiff = angleToPlayer - base.turretAngle;
            angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
            base.turretAngle += angleDiff * 0.05;

            // Update alert level based on player proximity
            // SPECTRE: Cloak - Enemies ignore you if cloaked (passive for Spectre)
            // ECM: Reduce effective detection range (10% per level)
            const ecmFactor = 1 - (this.playerShip.ecmStrength || 0) * 0.1;
            const effectiveDetectionRange = base.detectionRange * ecmFactor;
            
            const isSpectre = ship.type === 'spectre';
            if (distToPlayer < effectiveDetectionRange && !ship.isCloaked && !isSpectre) {
                // AGGRESSIVE ALERT: Scales faster
                base.alertLevel = Math.min(1, base.alertLevel + 0.05);

                // Fire missile if ready and player in range
                if (now - base.lastFireTime > base.fireRate && base.alertLevel > 0.4) {
                    this.fireMissile(base);
                    base.lastFireTime = now;
                }
            } else {
                // PERSISTENT ALERT: Slow decay (takes ~16s to drop from 1 to 0 at 60fps)
                base.alertLevel = Math.max(0, base.alertLevel - 0.001);
            }
        }

        // === UPDATE HEAT-SEEKING MISSILES ===
        for (const missile of this.enemyMissiles) {
            const isSpectre = ship.type === 'spectre';
            
            // TARGET ACQUISITION: Check for flare distraction first
            let targetX = ship.x;
            let targetY = ship.y;
            let isDistracted = false;

            if (this.decoyFlares.length > 0) {
                // Find closest flare within distraction radius
                let closestFlare = null;
                let minDist = 800; // Flare attraction radius
                for (const flare of this.decoyFlares) {
                    const d = Math.hypot(flare.x - missile.x, flare.y - missile.y);
                    if (d < minDist) {
                        minDist = d;
                        closestFlare = flare;
                    }
                }
                if (closestFlare) {
                    targetX = closestFlare.x;
                    targetY = closestFlare.y;
                    isDistracted = true;
                }
            }

            if ((!ship.isCloaked && !isSpectre) || isDistracted) {
                // Calculate angle to target (player or flare)
                const angleToTarget = Math.atan2(targetY - missile.y, targetX - missile.x);

                // Smooth turning (heat-seeking behavior)
                let angleDiff = angleToTarget - missile.angle;
                angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

                // Turn rate decreases over time (fuel running out)
                const turnRate = 0.12 * (missile.life / missile.maxLife);
                missile.angle += angleDiff * turnRate;
            }

            // Accelerate missile
            // AGGRESSIVE MISSILES: Faster base speed and better acceleration
            const speed = missile.speed * (1.2 + 0.6 * (missile.life / missile.maxLife));
            missile.vx = Math.cos(missile.angle) * speed;
            missile.vy = Math.sin(missile.angle) * speed;
            missile.x += missile.vx;
            missile.y += missile.vy;

            // Decrease life
            // AGGRESSIVE MISSILES: Longer lived (less decay per frame)
            missile.life -= 10; // ~60 fps (lasts ~8 seconds instead of 5)

            // Add trail particle
            if (Math.random() < 0.5) {
                missile.trail.push({
                    x: missile.x - missile.vx * 0.5,
                    y: missile.y - missile.vy * 0.5,
                    life: 20,
                    size: 3 + Math.random() * 4
                });
            }

            // Update trail particles
            missile.trail = missile.trail.filter(p => {
                p.life -= 1;
                p.size *= 0.95;
                return p.life > 0;
            });

            // Check collision with player
            const distToPlayer = Math.hypot(missile.x - ship.x, missile.y - ship.y);
            if (distToPlayer < 35) {
                // Missile hit! Trigger explosion effect
                this.triggerMissileHitEffect(missile);
                missile.life = 0;
            }
        }

        // Remove dead missiles (from life running out OR EMP kill)
        this.enemyMissiles = this.enemyMissiles.filter(m => m.life > 0 && !m.dead);

        // === UPDATE DECOY FLARES ===
        for (let i = this.decoyFlares.length - 1; i >= 0; i--) {
            const flare = this.decoyFlares[i];
            flare.x += flare.vx;
            flare.y += flare.vy;
            flare.vx *= 0.95; // Drag
            flare.vy *= 0.95;
            flare.life--;
            if (flare.life <= 0) {
                this.decoyFlares.splice(i, 1);
            }
        }

        // Spawn new hazards
        this.spawnHazards();
    }

    fireDecoyFlare() {
        if (!this.flightMode) return;
        
        const ship = this.playerShip;
        const upgradeLvl = this.playerShip.upgrades.flares || 0;
        if (upgradeLvl === 0) {
            this.showToast('⚠️ Decoy Flares not installed! Upgrade in Dock.');
            return;
        }

        // Initialize flares if needed
        if (ship.flares === undefined) ship.flares = upgradeLvl * 2;

        if (ship.flares <= 0) {
            this.showToast('⚠️ Out of flares! (Recharge at base or wait)');
            return;
        }

        // Fire 2 flares in slightly different directions
        for (let i = 0; i < 2; i++) {
            const angle = ship.angle + Math.PI + (Math.random() - 0.5) * 1.0; // Behind ship
            const speed = 5 + Math.random() * 5;
            this.decoyFlares.push({
                x: ship.x,
                y: ship.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 180, // 3 seconds at 60fps
                color: '#ffaa44'
            });
        }

        ship.flares--;
        this.showToast(`🔥 Flare Deployed! (${ship.flares} left)`);

        // BREAK STALKING: Breaking line of sight/distracting
        for (const enemy of this.enemyShips) {
            const d = Math.hypot(enemy.x - ship.x, enemy.y - ship.y);
            if (d < 1000) {
                enemy.isStalking = false; // Temporarily break stalking
                enemy.stalkCooldown = 180; // 3 second grace period
            }
        }
    }
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
            health: 1, // Missiles should die in one hit
            maxHealth: 1,
            size: 8,
            trail: [],
            fromBase: base
        });
    }

    // Unified damage method for tracking and ship abilities
    damagePlayer(amount, ignoreShield = false, silent = false) {
        if (!this.playerShip || this.playerShip.hullHealth <= 0) return;

        // ZEN BUFFER: Invulnerability after Lotus collection
        if (this.playerShip.zenBuffer && Date.now() < this.playerShip.zenBuffer) {
            // Pulse the shield or ship visually? (Optional)
            return; // No damage during Zen Buffer
        }

        // 9. FLUX: Phase Shift (20% dodge chance)
        if (this.playerShip.type === 'flux' && Math.random() < 0.2) {
            this.showToast('✨ Phase Shift Evaded Attack!', 1500);
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
            if (!silent && typeof gameAudio !== 'undefined' && gameAudio.playShieldHit) gameAudio.playShieldHit();
            const remainingDamage = amount - shieldDamage;
            if (remainingDamage > 0) {
                this.playerShip.hullHealth = Math.max(0, this.playerShip.hullHealth - remainingDamage);
                if (!silent && typeof gameAudio !== 'undefined' && gameAudio.playHullHit) gameAudio.playHullHit();
            }
        } else {
            this.playerShip.hullHealth = Math.max(0, this.playerShip.hullHealth - amount);
            if (!silent && typeof gameAudio !== 'undefined' && gameAudio.playHullHit) gameAudio.playHullHit();
        }

        this.updateShipStatus();

        if (this.playerShip.hullHealth <= 0) {
            if (window.hapticFeedback) window.hapticFeedback([200, 100, 200, 100, 400]);
            this.handlePlayerDeath();
        } else if (!silent) {
            if (window.hapticFeedback) window.hapticFeedback([50, 50, 50]);
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

        // Momentum is preserved when hit by missile (engines are no longer disabled)
        if (this.playerShip) {
            // this.playerShip.enginesDisabled = true; // Intentionally removed
            this.showToast('💥 Missile Hit! Hull damaged!', 2000);
        }

        this.damagePlayer(25);
    }

    // --- GLOBAL SKILL ABILITIES ---
    toggleSkillTree() {
        let modal = document.getElementById('skillTreeModal');
        if (modal) {
            const isVisible = modal.style.display === 'none';
            modal.style.display = isVisible ? 'flex' : 'none';
            if (this.flightMode) this.gamePaused = isVisible;
        } else {
            this.showToast('🚀 Skill Tree Interface Loading...', 2000);
            this._injectSkillTreeUI();
            if (this.flightMode) this.gamePaused = true;
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
                    <button class="btn-secondary" onclick="app.toggleSkillTree()">Close Terminal</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    upgradeSkill(skillKey, cost) {
        if (this.playerSkills[skillKey] >= 3) {
            return this.showToast('📈 Skill already at Max Level!');
        }
        if (this.playerGems >= cost) {
            this.playerGems -= cost;
            this.playerSkills[skillKey] += 1;
            localStorage.setItem('playerGems', this.playerGems);
            localStorage.setItem('playerSkills', JSON.stringify(this.playerSkills));
            
            // Update UI
            document.getElementById('skillGems').innerText = this.playerGems;
            document.getElementById(`skillLvl_${skillKey}`).innerText = `${this.playerSkills[skillKey]}/3`;
            this.showToast(`✨ Skill Upgraded! Level ${this.playerSkills[skillKey]}`);
            if (window.gameAudio) window.gameAudio.playCollect();
        } else {
            this.showToast('⚠️ Insufficient Gems for Upgrade.');
        }
    }

    triggerGlobalEMP() {
        const lvl = this.playerSkills.emp;
        if (lvl === 0) return this.showToast('🔒 EMP Locked. Upgrade in Skill Tree (K).', 2000);
        const now = Date.now();
        const cooldown = 30000 - (lvl * 5000); // 30s base, faster with levels
        if (now - this.skillCooldowns.emp < cooldown) return this.showToast('⏳ EMP Recharging...', 1000);

        this.skillCooldowns.emp = now;
        this.showToast('⚡ SYSTEM: EMP BURST DEPLOYED!', 2000);
        
        if (typeof window.gameAudio !== 'undefined' && window.gameAudio.playEMP) window.gameAudio.playEMP();
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
        if (lvl === 0) return this.showToast('🔒 Afterburner Locked. Upgrade in Skill Tree (K).', 2000);
        const now = Date.now();
        const cooldown = 20000 - (lvl * 3000); 
        if (now - this.skillCooldowns.afterburner < cooldown) return this.showToast('⏳ Afterburner Recharging...', 1000);

        this.skillCooldowns.afterburner = now;
        this.globalAbilityActive.afterburner = true;
        this.showToast('🔥 SYSTEM: AFTERBURNER ENGAGED!', 2000);
        if (typeof window.gameAudio !== 'undefined' && window.gameAudio.playAfterburner) window.gameAudio.playAfterburner();
        
        // Push ship slightly instantly
        this.playerShip.vx += Math.cos(this.playerShip.rotation) * 20;
        this.playerShip.vy += Math.sin(this.playerShip.rotation) * 20;

        setTimeout(() => {
            this.globalAbilityActive.afterburner = false;
        }, 3000 + (lvl * 1000)); // 4-6s duration
    }

    triggerGlobalQuantumJump() {
        const lvl = this.playerSkills.quantum;
        if (lvl === 0) return this.showToast('🔒 Quantum Dash Locked. Upgrade in Skill Tree (K).', 2000);
        const now = Date.now();
        const cooldown = 45000 - (lvl * 5000); 
        if (now - this.skillCooldowns.quantum < cooldown) return this.showToast('⏳ Quantum Drive Spooling...', 1000);

        this.skillCooldowns.quantum = now;
        this.showToast('🌌 SYSTEM: QUANTUM JUMP SUCCESSFUL', 2000);
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
            this.showToast('⚠️ Boost Recharging...');
            return;
        }

        this.playerShip.boostActive = true;
        this.playerShip.boostStartTime = now;
        this.playerShip.lastBoostTime = now;
        this.showToast('🚀 VIPER BOOST INITIALIZED!');

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
            this.showToast('⚠️ Overclock Cooling Down...');
            return;
        }

        this.playerShip.overclockActive = true;
        this.playerShip.overclockStartTime = now;
        this.playerShip.lastOverclockTime = now;
        this.showToast('🔥 OVERCLOCK ENGAGED!');
    }

    toggleSpectreCloak() {
        if (this.playerShip.type !== 'spectre') return;

        this.playerShip.isCloaked = !this.playerShip.isCloaked;
        this.showToast(this.playerShip.isCloaked ? '👻 CLOAK ENABLED' : '👻 CLOAK DISABLED');

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
        this.showToast('📡 RADAR PULSE SENT');

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

        this.playerStats.deaths++;
        this.saveStats();
        
        if (window.logGameEvent) {
            window.logGameEvent('player_death', {
                score: this.score,
                gems: this.playerGems,
                sector: this.level
            });
        }

        // Reset health/shield immediately so HUD reflects death
        this.playerShip.shield = 0;
        this.playerShip.hullHealth = 0;

        // Apply 25% carried resource penalty
        this.applyDeathPenalty();

        // Show death message
        this.showToast('💀 Critical Failure! Ejecting...');

        // Clean up boss on death (prevents ghost boss after respawn)
        // EXCEPT if we are on a boss mission, in which case we want the boss to persist
        if (this.activeBoss && (!this.activeMission || this.activeMission.type !== 'boss')) {
            this.activeBoss = null;
        }

        // Engine hum is now muted later during the actual explosion phase
        if (window.gameAudio) {
            if (window.gameAudio.playPlayerDeath) window.gameAudio.playPlayerDeath();
        }

        // NOVA: Volatile Core (AoE explosion on death)
        if (this.playerShip.type === 'nova') {
            this.showToast('⚠️ VOLATILE CORE DETONATED', 3000);
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
            this.showToast('💥 Mine Defused! +5 Gems', 1500);

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
            this.showToast('💥 Missile Base Destroyed! +25 Gems', 2000);

            // Track mission progress
            if (this.activeMission && this.activeMission.type === 'siege') {
                this.activeMission.progress++;
                this.updateMissionHUD();
                this.checkMissionComplete();
            }
        }
        this.triggerNuclearEvent(base.x, base.y, 'missile_base_destruction');
    }

    // Trigger planet impact effect - LOCALIZED PLUME AND FLASH
    triggerPlanetImpactEffect(planet) {
        const duration = 2500; // Faster, snappier effect
        const ship = this.playerShip;

        this.shakeDuration = 20;
        this.shakeMagnitude = Math.min(20, ship.speed || 10);

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
        const safeDist = effectiveRadius + collisionRadius + 200; // Solid 200 unit buffer so player doesn't instantly die again

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
        this.showToast('💀 CRITICAL IMPACT! HULL INTEGRITY LOST...');

        console.log('[Hazard] Ship crashed into planet - impact sequence initiated!');
    }

    // Structural Nuclear Mushroom Generation
    generateSupernovaParticles(count) {
        const particles = [];
        const isMine = this.hazardEffect && this.hazardEffect.type === 'supernova';

        // Balanced count for performance + density
        const total = isMine ? 1000 : Math.min(count, 1500);

        for (let i = 0; i < total; i++) {
            const rand = Math.random();
            let type, x, y, z, vx, vy, vz, size, decay, rollAngle, rollSpeed, torusAngle;

            const angle = Math.random() * Math.PI * 2;

            if (rand < 0.25) { // 25% COLUMN/STEM
                type = 'stem';
                const r = Math.random() * 8;
                x = Math.cos(angle) * r;
                y = -(Math.random() * 30);
                z = (Math.random() - 0.5) * 40;
                vx = (Math.random() - 0.5) * 1.5;
                vy = -12 - Math.random() * 8;
                vz = (Math.random() - 0.5) * 1.5;
                size = 180 + Math.random() * 300;
                decay = 0.002 + Math.random() * 0.003;
            } else if (rand < 0.75) { // 50% TORUS/CAP
                type = 'torus';
                const r = 40 + Math.random() * 60;
                x = Math.cos(angle) * r;
                y = -(Math.random() * 15);
                z = (Math.random() - 0.5) * 80;
                vx = Math.cos(angle) * (6 + Math.random() * 10);
                vy = -18 - Math.random() * 12;
                vz = (Math.random() - 0.5) * 10;
                size = 400 + Math.random() * 500; // MASSIVE CAP
                decay = 0.001 + Math.random() * 0.002;
                torusAngle = angle;
                rollAngle = Math.random() * Math.PI * 2;
                rollSpeed = 0.12 + Math.random() * 0.15;
            } else { // 25% PLASMA/SHOCK
                type = 'plasma';
                x = Math.cos(angle) * (Math.random() * 120);
                y = (Math.random() - 0.5) * 60;
                z = (Math.random() - 0.5) * 150;
                vx = Math.cos(angle) * (20 + Math.random() * 40);
                vy = Math.sin(angle) * (20 + Math.random() * 40);
                vz = (Math.random() - 0.5) * 50;
                size = 300 + Math.random() * 400;
                decay = 0.005 + Math.random() * 0.01;
            }

            particles.push({
                x, y, z, vx, vy, vz, size, life: 1.0, temp: 1.0,
                decay, type, rollAngle, rollSpeed, torusAngle
            });
        }
        return particles;
    }

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
            tunnelParticles: this.generateTunnelParticles(150),
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
    generateTunnelParticles(count) {
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
                z: Math.random() * 1000,
                speed: 5 + Math.random() * 15,
                radius: 50 + Math.random() * 200,
                hue: 200 + Math.random() * 80, // Cyan to purple
                brightness: 0.5 + Math.random() * 0.5
            });
        }
        return particles;
    }

    // Update active hazard effect
    updateHazardEffect() {
        if (!this.hazardEffect) return;

        try {
            const now = performance.now();
            let elapsed = now - this.hazardEffect.startTime;
            const duration = Math.max(1, this.hazardEffect.duration || 8000);

            // CRITICAL FIX: If the effect hasn't rendered at least one frame yet
            // but elapsed time already exceeds duration (e.g., due to alert() pausing JS),
            // reset the startTime to NOW so the animation plays from the beginning.
            if (!this.hazardEffect._hasRenderedFrame && elapsed > duration * 0.5) {
                console.log('[Hazard] Resetting startTime - elapsed', elapsed.toFixed(0), 'ms before first render frame');
                this.hazardEffect.startTime = now;
                elapsed = 0;
            }

            const progress = Math.max(0, Math.min(1.0, elapsed / duration));

            if (isNaN(progress)) {
                console.error('[Hazard] Progress is NaN! Force-clearing effect.');
                this.hazardEffect = null;
                return;
            }

            // BLACK HOLE: Teleport during white phase (80%) - not at end
            // This prevents the glitch where old universe shows before new one loads
            if (this.hazardEffect.type === 'blackhole' && progress >= 0.8 && !this.hazardEffect.hasTeleported) {
                // Teleport player to destination while screen is still white
                this.playerShip.x = this.hazardEffect.destX;
                this.playerShip.y = this.hazardEffect.destY;
                this.hazardEffect.hasTeleported = true;

                // Clear old minerals/hazards so new ones spawn at new location
                this.minerals = this.minerals.filter(m => {
                    const dx = m.x - this.playerShip.x;
                    const dy = m.y - this.playerShip.y;
                    return Math.hypot(dx, dy) < 3000; // Keep only close ones
                });

                console.log('[Hazard] Teleported during white phase to:', this.hazardEffect.destX, this.hazardEffect.destY);
                console.log('[Debug] Ship type after black hole:', this.playerShip.type);
            }

            // Update effect-specific logic BEFORE completion check
            if (this.hazardEffect.type === 'supernova' || this.hazardEffect.type === 'missile_base_destruction') {
                this.updateSupernovaEffect(progress);
            } else if (this.hazardEffect.type === 'blackhole') {
                this.updateBlackHoleEffectState(progress);
            } else if (this.hazardEffect.type === 'planet_impact') {
                this.updatePlanetImpactEffect(progress);
            } else if (this.hazardEffect.type === 'player_death') {
                this.updatePlayerDeathEffect(progress);
            }

            // Effect complete - now safe to restore controls
            // Check for completion AFTER state has been updated to final frame
            if (progress >= 1 || (this.hazardEffect.deathTimestamp && now > this.hazardEffect.deathTimestamp)) {
                // Clear the hazard effect FIRST to allow controls through
                if (this.hazardEffect.type === 'boost') {
                    this.playerShip.boostActive = false;
                }
                
                // UNIVERSAL RESPAWN FAILSAFE: Ensure health/shield are always restored after any death-causing hazard
                const finishedHazardType = this.hazardEffect.type;
                if (this.playerShip.hullHealth <= 0) {
                    this.playerShip.shield = this.playerShip.maxShield;
                    this.playerShip.hullHealth = this.playerShip.maxHull;
                    this.playerShip.invulnerableUntil = performance.now() + 3000;

                    // RESTORE ENGINE AUDIO AFTER RESPAWN
                    if (window.gameAudio) window.gameAudio.startEngineHum();

                    // Universal respawn means the player stays exactly where they died.
                    // (Teleportation code removed for all hazard types per user request)
                    this.showToast('🚀 Systems restored after critical impact.');
                }

                this.hazardEffect = null;

                // Reset camera to prevent permanent drift (Missing Ship bug)
                this.camera.shakeX = 0;
                this.camera.shakeY = 0;

                // Reset ALL input states to clean slate
                this.keysPressed = {};
                this.joyInputX = 0;
                this.joyInputY = 0;
                this.joystickActive = false;

                // Reset mouse states that might block input
                this.mouseRightDown = false;
                this.mouseLastX = undefined;
                this.mouseLastY = undefined;

                // Ensure velocity is completely zeroed out after any hazard/death sequence
                this.playerShip.vx = 0;
                this.playerShip.vy = 0;
                this.playerShip.vz = 0;
                this.shipSpeed = 0;
                this.targetShipSpeed = 0;
                if (this.flightControls) {
                    this.flightControls.targetSpeed = 0;
                    this.flightControls.currentSpeed = 0;
                }

                // Focus canvas to ensure keyboard events are captured
                if (this.canvas) {
                    this.canvas.focus();
                }

                // Show toast so user knows they can move again
                this.showToast('Controls restored!');

                console.log('[Hazard] Effect complete - ALL CONTROLS RE-ENABLED');
                return;
            }

        } catch (e) {
            console.error('[Hazard] Critical error during effect update:', e);
            this.hazardEffect = null; // Kill the effect to prevent permanent lock
        }
    }

    // ====================================================================
    // --- FLIGHT ACADEMY: TRAINING TRACK SYSTEM (7-Lesson Progressive Course) ---
    // ====================================================================

    // Lesson definitions — each lesson teaches a specific flight skill
    getTrainingLessons() {
        return [
            {
                id: 'throttle',
                name: 'Throttle Up',
                icon: '🚀',
                subtitle: 'Learn to fly forward and brake',
                briefing: 'Use W to accelerate forward.\nUse S to brake and slow down.\nFly through each gate to proceed.',
                keys: [{ key: 'W', action: 'Accelerate' }, { key: 'S', action: 'Brake' }],
                gates: (() => {
                    // 3 gates in a straight line ahead
                    const g = [];
                    for (let i = 0; i < 3; i++) {
                        g.push({ x: (i + 1) * 800, y: 0, size: 200, reached: false });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 8, silver: 14, bronze: 22 },
                reward: { gold: 1200, silver: 800, bronze: 500 }
            },
            {
                id: 'steering',
                name: 'Steering',
                icon: '🔄',
                subtitle: 'Master turning and curved flight paths',
                briefing: 'Use A to turn left, D to turn right.\nCombine with W to fly curves.\nNavigate the slalom course!',
                keys: [{ key: 'A', action: 'Turn Left' }, { key: 'D', action: 'Turn Right' }, { key: 'W', action: 'Accelerate' }],
                gates: (() => {
                    // 5 gates in an S-curve
                    const g = [];
                    for (let i = 0; i < 5; i++) {
                        const angle = (i * Math.PI) / 4;
                        g.push({
                            x: Math.cos(angle) * (600 + i * 400) + i * 300,
                            y: Math.sin(angle) * (600 + i * 300),
                            size: 180 - i * 10,
                            reached: false
                        });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 15, silver: 25, bronze: 40 },
                reward: { gold: 1800, silver: 1200, bronze: 800 }
            },
            {
                id: 'boost',
                name: 'Boost Control',
                icon: '⚡',
                subtitle: 'Use afterburners for maximum speed',
                briefing: 'Hold SHIFT while flying to boost (2× speed).\nReach the distant gates before time runs out!\nRelease SHIFT to regain control for turns.',
                keys: [{ key: 'SHIFT', action: 'Boost (2×)' }, { key: 'W', action: 'Accelerate' }],
                gates: (() => {
                    // 3 very distant gates — need boost to reach in time
                    return [
                        { x: 2000, y: 0, size: 250, reached: false },
                        { x: 4500, y: -800, size: 220, reached: false },
                        { x: 7000, y: 400, size: 200, reached: false }
                    ];
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 12, silver: 20, bronze: 35 },
                reward: { gold: 2200, silver: 1500, bronze: 1000 }
            },
            {
                id: 'precision',
                name: 'Precision Flying',
                icon: '🎯',
                subtitle: 'Tight maneuvers through small gates',
                briefing: 'Combine all controls for precision flight.\nGates are smaller — aim carefully!\nControl your speed for tight turns.',
                keys: [{ key: 'W/S', action: 'Speed' }, { key: 'A/D', action: 'Steer' }],
                gates: (() => {
                    // 5 small gates in a zigzag
                    const g = [];
                    for (let i = 0; i < 5; i++) {
                        g.push({
                            x: (i + 1) * 600,
                            y: (i % 2 === 0 ? 1 : -1) * (300 + i * 80),
                            size: 120 - i * 8,
                            reached: false
                        });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 18, silver: 30, bronze: 45 },
                reward: { gold: 3000, silver: 2000, bronze: 1200 }
            },
            {
                id: 'collection',
                name: 'Gem Collection',
                icon: '💎',
                subtitle: 'Learn to collect resources while flying',
                briefing: 'Fly near gems to auto-collect them!\nCollect all 8 gems in the training zone.\nYour ship pulls gems in on contact.',
                keys: [{ key: 'FLY', action: 'Near gems to collect' }],
                gates: [
                    { x: 0, y: 0, size: 120, reached: true }, // Start marker (pre-reached)
                    { x: 3000, y: 0, size: 200, reached: false }  // Finish gate
                ],
                gems: (() => {
                    // 8 gems scattered in a path
                    const g = [];
                    const types = ['iron', 'copper', 'gold', 'silver', 'titanium', 'ruby', 'emerald', 'diamond'];
                    for (let i = 0; i < 8; i++) {
                        g.push({
                            x: 300 + i * 330,
                            y: Math.sin(i * 0.8) * 200,
                            type: types[i],
                            collected: false
                        });
                    }
                    return g;
                })(),
                showArrow: false,
                collectTarget: 8,
                medals: { gold: 20, silver: 35, bronze: 50 },
                reward: { gold: 4000, silver: 2500, bronze: 1500 }
            },
            {
                id: 'radar',
                name: 'Radar Navigation',
                icon: '📡',
                subtitle: 'Navigate using instruments only',
                briefing: 'No HUD arrow this time!\nUse the RADAR and MAP panels to find the waypoint.\nThe destination is far away — trust your instruments.',
                keys: [{ key: 'RADAR', action: 'Check bearing' }, { key: 'MAP', action: 'See position' }],
                gates: (() => {
                    // Single far waypoint — player must navigate by radar
                    const angle = Math.random() * Math.PI * 2;
                    return [
                        { x: Math.cos(angle) * 6000, y: Math.sin(angle) * 6000, size: 300, reached: false }
                    ];
                })(),
                gems: [],
                showArrow: false, // No HUD arrow — must use radar!
                medals: { gold: 25, silver: 40, bronze: 60 },
                reward: { gold: 5000, silver: 3500, bronze: 2000 }
            },
            {
                id: 'final',
                name: 'Final Exam',
                icon: '🏆',
                subtitle: 'Full course — prove your skills',
                briefing: 'The ultimate test!\n8 gates with varying sizes and distances.\nCollect gems along the way for bonus time.\nUse everything you\'ve learned!',
                keys: [{ key: 'ALL', action: 'Use every skill' }],
                gates: (() => {
                    // 8-gate course with mixed challenges
                    const g = [];
                    let cx = 0, cy = 0;
                    const angles = [0.2, -0.6, 0.9, -0.3, 1.2, -0.8, 0.5, -0.4];
                    const dists = [1000, 1200, 800, 1500, 900, 2000, 1100, 1400];
                    const sizes = [200, 160, 140, 180, 120, 250, 130, 200];
                    let heading = 0;
                    for (let i = 0; i < 8; i++) {
                        heading += angles[i];
                        cx += Math.cos(heading) * dists[i];
                        cy += Math.sin(heading) * dists[i];
                        g.push({ x: cx, y: cy, size: sizes[i], reached: false });
                    }
                    return g;
                })(),
                gems: (() => {
                    // 5 bonus gems along the course
                    const g = [];
                    const types = ['gold', 'diamond', 'ruby', 'emerald', 'platinum'];
                    let cx = 0, cy = 0;
                    const angles = [0.2, -0.6, 0.9, -0.3, 1.2];
                    const dists = [1000, 1200, 800, 1500, 900];
                    let heading = 0;
                    for (let i = 0; i < 5; i++) {
                        heading += angles[i];
                        cx += Math.cos(heading) * dists[i];
                        cy += Math.sin(heading) * dists[i];
                        g.push({
                            x: cx + (Math.random() - 0.5) * 300,
                            y: cy + (Math.random() - 0.5) * 300,
                            type: types[i],
                            collected: false
                        });
                    }
                    return g;
                })(),
                showArrow: true,
                medals: { gold: 30, silver: 50, bronze: 75 },
                reward: { gold: 8000, silver: 5000, bronze: 2500 }
            },
            {
                id: 'weaponry',
                name: 'Weapon Systems',
                icon: '⚔️',
                subtitle: 'Learn to use your ship lasers',
                briefing: 'Hold SPACE to fire your primary lasers.\nDestroy the target mines to clear a path!\nGates will only open when the nearby mine is destroyed.',
                keys: [{ key: 'SPACE', action: 'Fire Lasers' }, { key: 'W/A/D', action: 'Flight' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 4; i++) {
                        g.push({ x: (i + 1) * 800, y: 0, size: 200, reached: false, targetDestroyed: false });
                    }
                    return g;
                })(),
                targets: (() => {
                    const t = [];
                    for (let i = 0; i < 4; i++) {
                        t.push({ x: (i + 1) * 800, y: (Math.random() - 0.5) * 100, type: 'training_mine', id: i });
                    }
                    return t;
                })(),
                showArrow: true,
                medals: { gold: 15, silver: 25, bronze: 40 },
                reward: { gold: 6000, silver: 4000, bronze: 2000 }
            },
            {
                id: 'shielding',
                name: 'Defense & Shields',
                icon: '🛡️',
                subtitle: 'Learn to manage your ship integrity',
                briefing: 'Your blue bar is your SHIELD. It absorbs damage first.\nThe red bar is your HULL. If it reaches zero, you die!\nFly through the damage zone and watch your shield deplete.',
                keys: [{ key: 'W/A/D', action: 'Maneuver' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 3; i++) {
                        g.push({ x: (i + 1) * 1000, y: Math.sin(i) * 300, size: 250, reached: false });
                    }
                    return g;
                })(),
                hazardZone: { x: 1500, y: 0, radius: 1000, damage: 0.2 },
                showArrow: true,
                medals: { gold: 20, silver: 35, bronze: 55 },
                reward: { gold: 6500, silver: 4500, bronze: 2500 }
            },
            {
                id: 'hazards',
                name: 'Hazard Navigation',
                icon: '🌀',
                subtitle: 'Evasive maneuvers near anomalies',
                briefing: 'Black Holes pull you in! Stay away from the event horizon.\nSpace Mines have a large blast radius.\nNavigate the hazard-filled course safely.',
                keys: [{ key: 'SHIFT', action: 'Boost to escape pull' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 4; i++) {
                        g.push({ x: (i + 1) * 1200, y: (i % 2 === 0 ? 400 : -400), size: 180, reached: false });
                    }
                    return g;
                })(),
                hazards: [
                    { x: 1200, y: 0, type: 'blackhole', radius: 400 },
                    { x: 2400, y: 0, type: 'mine', radius: 150 },
                    { x: 3600, y: 0, type: 'blackhole', radius: 500 }
                ],
                showArrow: true,
                medals: { gold: 25, silver: 45, bronze: 70 },
                reward: { gold: 7500, silver: 5000, bronze: 3000 }
            }
        ];
    }

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
            this.showToast('⚠️ Wait for the current event to finish!');
            return;
        }

        // Ensure flight mode is active
        if (!this.flightMode) {
            this.toggleFlightMode();
        }

        const lessons = this.getTrainingLessons();
        if (lessonIndex < 0 || lessonIndex >= lessons.length) return;

        const lesson = lessons[lessonIndex];

        // Deep-clone gates and gems so re-running a lesson regenerates them
        this.trainingLesson = JSON.parse(JSON.stringify(lesson));
        // Re-generate gates for lessons with random elements
        if (lesson.id === 'radar') {
            const freshLessons = this.getTrainingLessons();
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
    updateTraining() {
        if (!this.trainingActive || !this.trainingLesson) return;

        // During briefing, check for any key press to dismiss
        if (this.trainingBriefing) {
            const timeSinceBriefing = performance.now() - this.trainingBriefingStart;
            if (timeSinceBriefing > 1500) { // Minimum 1.5s display
                // Check if any movement key is pressed
                const keys = this.keysPressed;
                if (keys['w'] || keys['a'] || keys['s'] || keys['d'] || keys[' '] || keys['enter']) {
                    this.dismissTrainingBriefing();
                }
            }
            return; // Don't update game logic during briefing
        }

        // Update timer
        this.trainingTimer = (performance.now() - this.trainingStartTime) / 1000;

        const lesson = this.trainingLesson;
        const ship = this.playerShip;

        // --- Check gem collection for lessons with gems ---
        if (lesson.gems && lesson.gems.length > 0) {
            for (const gem of lesson.gems) {
                if (gem.collected) continue;
                const dx = ship.x - gem.x;
                const dy = ship.y - gem.y;
                const dist = Math.hypot(dx, dy);
                if (dist < ship.size + 20) {
                    gem.collected = true;
                    this.trainingGemsCollected++;
                    // Add to actual inventory
                    if (!this.playerInventory[gem.type]) this.playerInventory[gem.type] = 0;
                    this.playerInventory[gem.type]++;
                    this.saveInventory();
                    this.collectionNotifications.push({
                        text: `+ ${this.mineralTypes[gem.type]?.name || gem.type}`,
                        color: this.mineralTypes[gem.type]?.color || '#fff',
                        time: Date.now()
                    });
                }
            }
        }

        // --- Check weaponry targets ---
        if (lesson.id === 'weaponry' && lesson.targets) {
            this.bullets.forEach(bullet => {
                lesson.targets.forEach(target => {
                    if (target.destroyed) return;
                    const dx = bullet.x - target.x;
                    const dy = bullet.y - target.y;
                    if (Math.hypot(dx, dy) < 40) {
                        target.destroyed = true;
                        bullet.life = 0;
                        this.showToast('💥 Target Destroyed!');
                        // Mark associated gate as targetDestroyed
                        if (lesson.gates[target.id]) {
                            lesson.gates[target.id].targetDestroyed = true;
                        }
                    }
                });
            });
        }

        // --- Check shielding hazard zone ---
        if (lesson.id === 'shielding' && lesson.hazardZone) {
            const hz = lesson.hazardZone;
            const dist = Math.hypot(ship.x - hz.x, ship.y - hz.y);
            if (dist < hz.radius) {
                // Apply damage using standard damage system
                const dmg = hz.damage || 0.1;
                this.damagePlayer(dmg);
            }
        }

        // --- Check hazard navigation ---
        if (lesson.id === 'hazards' && lesson.hazards) {
            lesson.hazards.forEach(h => {
                const dist = Math.hypot(ship.x - h.x, ship.y - h.y);
                if (h.type === 'blackhole' && dist < h.radius) {
                    const pull = (1 - dist / h.radius) * 1.5;
                    const angle = Math.atan2(h.y - ship.y, h.x - ship.x);
                    ship.vx += Math.cos(angle) * pull;
                    ship.vy += Math.sin(angle) * pull;
                    if (dist < 50) {
                        this.showToast('🌀 Sucked into the void! Restarting...');
                        this.startTraining(this.trainingLessonIndex);
                    }
                } else if (h.type === 'mine' && dist < h.radius) {
                    this.showToast('💣 MINE DETONATED!');
                    this.damagePlayer(20);
                    h.x = -99999; // Move away
                }
            });
        }

        // --- Check gate progression ---
        if (lesson.id === 'collection') {
            // Collection lesson: need all gems first, then fly to finish gate
            if (this.trainingGemsCollected >= (lesson.collectTarget || lesson.gems.length)) {
                const finishGate = lesson.gates[lesson.gates.length - 1];
                const dx = ship.x - finishGate.x;
                const dy = ship.y - finishGate.y;
                if (Math.hypot(dx, dy) < finishGate.size * 1.2) {
                    finishGate.reached = true;
                    this.completeTrainingLesson();
                }
            }
        } else {
            // Standard gate progression
            const gate = lesson.gates[this.trainingGateIndex];
            if (gate) {
                // For weaponry, must destroy target first
                if (lesson.id === 'weaponry' && !gate.targetDestroyed) {
                    // Do nothing, wait for target
                } else {
                    const dx = ship.x - gate.x;
                    const dy = ship.y - gate.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < gate.size * 1.2) {
                        gate.reached = true;
                        this.trainingGateIndex++;
                        if (this.trainingGateIndex >= lesson.gates.length) {
                            this.completeTrainingLesson();
                        } else {
                            const total = lesson.gates.length;
                            const current = this.trainingGateIndex;
                            this.showToast(`✅ Gate ${current}/${total} — Keep going!`);
                        }
                    }
                }
            }
        }
    }

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
                const name = this.mineralTypes[type]?.name || type;
                gemSummary.push(`+${qty} ${name}`);
            }
            // Medal bonus gems
            if (medal && gemReward.bonus[medal]) {
                for (const [type, qty] of Object.entries(gemReward.bonus[medal])) {
                    this.playerInventory[type] = (this.playerInventory[type] || 0) + qty;
                    const name = this.mineralTypes[type]?.name || type;
                    gemSummary.push(`+${qty} ${name} ⭐`);
                }
            }
            this.saveInventory();
            this.updateInventoryUI();
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
        this.showToast(`${medalEmoji} ${lesson.name} Complete! Time: ${time.toFixed(1)}s — $${reward}${gemText}`);
        console.log(`[Training] Lesson "${lesson.name}" completed in ${time.toFixed(1)}s — Medal: ${medal || 'none'} — Gems: ${gemSummary.join(', ')}`);
    }

    // Cancel / exit training
    cancelTraining() {
        this.trainingActive = false;
        this.trainingBriefing = false;
        this.trainingComplete = false;
        this.trainingLesson = null;
        this.showToast('Training cancelled.');
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
                    this.showToast('🎓 Tip: Try the Flight Academy to earn credits and precious elements!');
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
    renderWelcomeOverlay(ctx) {
        // Version Indicator (Proof of Life)
        ctx.save();
        ctx.fillStyle = 'rgba(255, 105, 180, 0.9)';
        ctx.font = 'bold 14px Orbitron, sans-serif';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff69b4';

        ctx.restore();

        if (!this.showWelcomeOverlay) return;

        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const elapsed = (performance.now() - this.welcomeOverlayStart) / 1000;
        const fadeIn = Math.min(1, elapsed / 0.6);

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Backdrop
        ctx.globalAlpha = fadeIn * 0.8;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        // Card
        ctx.globalAlpha = fadeIn;
        const cardW = Math.min(520, w * 0.85);
        const cardH = 360;
        const cx = (w - cardW) / 2;
        const cy = (h - cardH) / 2;

        // Card background with gradient border
        ctx.fillStyle = 'rgba(5, 15, 30, 0.97)';
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#00f3ff';
        ctx.beginPath();
        ctx.roundRect(cx, cy, cardW, cardH, 16);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Welcome title
        ctx.textAlign = 'center';
        ctx.font = 'bold 36px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#00f3ff';
        ctx.fillText('🚀 Welcome, Pilot!', w / 2, cy + 55);
        ctx.shadowBlur = 0;

        // Subtitle
        ctx.font = '16px "Exo 2", sans-serif';
        ctx.fillStyle = '#8ba';
        ctx.fillText('Your journey through the cosmos begins here', w / 2, cy + 85);

        // Info lines
        ctx.font = '14px "Exo 2", sans-serif';
        ctx.fillStyle = '#d0eeff';
        const infoLines = [
            'Complete Flight Academy lessons to master piloting skills.',
            'Each lesson awards credits 💰 and precious elements 💎',
            'Higher medals earn rarer gems — from Iron to Emeralds!',
            'Complete all 7 lessons for a massive bonus reward.'
        ];
        infoLines.forEach((line, i) => {
            ctx.fillText(line, w / 2, cy + 120 + i * 26);
        });

        // Reward preview
        ctx.font = 'bold 13px "Exo 2", monospace';
        ctx.fillStyle = '#ffd700';
        const rewardY = cy + 120 + infoLines.length * 26 + 15;
        ctx.fillText('🏆 COMPLETION BONUS: $2,000 + Sapphire + Uranium', w / 2, rewardY);

        // Call to action button
        const btnW = 220;
        const btnH = 42;
        const btnX = w / 2 - btnW / 2;
        const btnY = rewardY + 30;
        const pulse = 1 + Math.sin(performance.now() * 0.004) * 0.08;

        ctx.fillStyle = 'rgba(0, 243, 255, 0.15)';
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15 * pulse;
        ctx.shadowColor = '#00f3ff';
        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnW, btnH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.font = 'bold 16px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.fillText('🎓 BEGIN TRAINING', w / 2, btnY + 27);

        // Skip option
        const skipAlpha = elapsed > 2 ? 0.4 + Math.sin(performance.now() * 0.003) * 0.2 : 0;
        ctx.globalAlpha = skipAlpha;
        ctx.font = '12px "Exo 2", sans-serif';
        ctx.fillStyle = '#667788';
        ctx.fillText('Press ESC to skip', w / 2, btnY + btnH + 25);

        ctx.restore();

        // Handle input
        if (elapsed > 1) {
            if (this.keysPressed['enter'] || this.keysPressed['w'] || this.keysPressed[' ']) {
                this.dismissWelcomeOverlay(true);
            } else if (this.keysPressed['escape']) {
                this.dismissWelcomeOverlay(false);
            }
        }
    }

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
            this.showToast('🎓 You can access Flight Academy anytime from the Flight Control panel!');
        }
    }

    // Check if all 10 lessons are complete — award graduation bonus
    checkAllLessonsComplete() {
        const lessons = this.getTrainingLessons();
        const progress = this.trainingProgress || {};
        const allComplete = lessons.every(l => progress[l.id] && progress[l.id].completed);

        if (allComplete && !progress._graduationBonusAwarded) {
            // Graduation bonus!
            this.credits += 2000;
            this.playerInventory['sapphire'] = (this.playerInventory['sapphire'] || 0) + 1;
            this.playerInventory['uranium'] = (this.playerInventory['uranium'] || 0) + 1;
            this.saveCredits();
            this.saveInventory();
            this.updateInventoryUI();

            // Mark as awarded
            progress._graduationBonusAwarded = true;
            this.saveTrainingProgress();

            this.showToast('🎓🏆 FLIGHT ACADEMY GRADUATED! +$2,000 +1 Sapphire +1 Uranium!');
            console.log('[Training] All 10 lessons complete — graduation bonus awarded!');
        }
    }

    // Open the Flight Academy selector UI
    openFlightAcademy() {
        if (!this.flightMode) {
            this.toggleFlightMode();
        }

        const lessons = this.getTrainingLessons();
        const progress = this.trainingProgress;
        
        // Auto pause
        this.gamePaused = true;

        let html = `
            <div id="flightAcademyModal" class="modal-overlay active" style="z-index: 10000; display: flex;">
                <div class="modal" style="width: 600px; max-width: 90vw; padding: 30px;">
                    <div class="modal-close-corner">
                        <button class="btn-secondary" onclick="
                            const m = document.getElementById('flightAcademyModal');
                            m.classList.remove('active');
                            if(window.game) window.game.gamePaused = false;
                            setTimeout(() => m.remove(), 300);
                        ">EXIT ACADEMY</button>
                    </div>
                    <div style="text-align:center; margin-bottom:20px;">
                        <div style="font-size:28px; font-weight:bold; color:#00f3ff; text-shadow:0 0 20px rgba(0,243,255,0.5); letter-spacing:3px; font-family: 'Cinzel', serif;">🎓 FLIGHT ACADEMY</div>
                        <div style="font-size:12px; color:#8ba; margin-top:6px;">Master the art of interstellar flight</div>
                    </div>
                    <div style="display:grid; gap:10px; max-height: 50vh; overflow-y: auto; padding-right: 10px;">
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
                     onclick="
                        const m = document.getElementById('flightAcademyModal');
                        m.classList.remove('active');
                        setTimeout(() => m.remove(), 300);
                        if(window.game) window.game.gamePaused = false;
                        app.startTraining(${i});
                     ">
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

    renderTrainingGates(ctx) {
        if (!this.trainingActive && !this.trainingComplete) return;
        const lesson = this.trainingLesson;
        if (!lesson) return;

        const time = performance.now() * 0.002;

        // Render gates
        lesson.gates.forEach((gate, index) => {
            if (gate.reached && lesson.id !== 'collection') return; // Don't draw reached gates (except finish)

            const isCurrent = index === this.trainingGateIndex;
            const isFinish = lesson.id === 'collection' && index === lesson.gates.length - 1;

            ctx.save();
            ctx.translate(gate.x, gate.y);

            const pulse = isCurrent ? 1.0 + Math.sin(time * 2) * 0.08 : 1.0;
            const size = gate.size * pulse;

            // Gate color scheme
            let color, glowColor, alpha;
            if (gate.reached) {
                color = '#00ff66'; glowColor = 'rgba(0,255,100,0.3)'; alpha = 0.3;
            } else if (isCurrent) {
                color = '#00f3ff'; glowColor = 'rgba(0,243,255,0.4)'; alpha = 0.9;
            } else if (isFinish) {
                color = '#ffd700'; glowColor = 'rgba(255,215,0,0.3)'; alpha = 0.6 + Math.sin(time) * 0.2;
            } else {
                color = '#4466aa'; glowColor = 'rgba(68,102,170,0.2)'; alpha = 0.35;
            }

            ctx.globalAlpha = alpha;

            // Outer glow ring
            ctx.shadowBlur = isCurrent ? 30 : 10;
            ctx.shadowColor = color;

            // Main ring
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = isCurrent ? 8 : 4;
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.stroke();

            // Inner dashed ring (rotating)
            ctx.setLineDash([15, 8]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.globalAlpha = alpha * 0.6;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.75, time * 0.8, time * 0.8 + Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Holographic fill for current gate
            if (isCurrent || isFinish) {
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
                grad.addColorStop(0, isCurrent ? 'rgba(0,243,255,0.08)' : 'rgba(255,215,0,0.06)');
                grad.addColorStop(0.7, isCurrent ? 'rgba(0,243,255,0.03)' : 'rgba(255,215,0,0.02)');
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Directional chevrons on current gate (4 arrows pointing inward)
            if (isCurrent) {
                ctx.globalAlpha = 0.5 + Math.sin(time * 3) * 0.3;
                for (let a = 0; a < 4; a++) {
                    const chevAngle = (a * Math.PI / 2) + time * 0.3;
                    ctx.save();
                    ctx.rotate(chevAngle);
                    ctx.translate(size * 1.15, 0);
                    ctx.rotate(Math.PI); // Point inward
                    ctx.beginPath();
                    ctx.moveTo(12, 0);
                    ctx.lineTo(-6, -8);
                    ctx.lineTo(-6, 8);
                    ctx.closePath();
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.restore();
                }
            }

            // Gate number label
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = 0;
            ctx.font = `bold ${isCurrent ? 16 : 12}px "Exo 2", monospace`;
            ctx.textAlign = 'center';
            ctx.fillStyle = color;
            ctx.fillText(isFinish ? 'FINISH' : `G${index + 1}`, 0, size + 22);

            ctx.restore();
        });

        // Render training gems (collectible)
        if (lesson.gems) {
            lesson.gems.forEach(gem => {
                if (gem.collected) return;
                ctx.save();
                ctx.translate(gem.x, gem.y);

                const gemColor = this.mineralTypes[gem.type]?.color || '#ffffff';
                const gemSize = 14;
                const pulse = 1 + Math.sin(time * 3 + gem.x * 0.01) * 0.15;

                // Gem glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = gemColor;
                ctx.globalAlpha = 0.8;

                // Diamond shape
                ctx.beginPath();
                ctx.moveTo(0, -gemSize * pulse);
                ctx.lineTo(gemSize * 0.7 * pulse, 0);
                ctx.lineTo(0, gemSize * pulse);
                ctx.lineTo(-gemSize * 0.7 * pulse, 0);
                ctx.closePath();
                ctx.fillStyle = gemColor;
                ctx.fill();

                // Sparkle
                ctx.globalAlpha = 0.4 + Math.sin(time * 5 + gem.y * 0.01) * 0.3;
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            });
        }

        // Render training targets
        if (lesson.targets) {
            lesson.targets.forEach(target => {
                if (target.destroyed) return;
                ctx.save();
                ctx.translate(target.x, target.y);
                
                // Orange pulsing training mine
                const targetPulse = 1 + Math.sin(time * 5 + target.id) * 0.1;
                const r = 25 * targetPulse;
                
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ff6600';
                
                // Outer ring
                ctx.beginPath();
                ctx.strokeStyle = '#ff6600';
                ctx.lineWidth = 2;
                ctx.arc(0, 0, r + 10, 0, Math.PI * 2);
                ctx.stroke();
                
                // Inner core
                ctx.beginPath();
                ctx.fillStyle = '#ffaa00';
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.fill();
                
                // Target crosshair
                ctx.beginPath();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.moveTo(-r - 15, 0); ctx.lineTo(r + 15, 0);
                ctx.moveTo(0, -r - 15); ctx.lineTo(0, r + 15);
                ctx.stroke();
                
                ctx.restore();
            });
        }
        
        // Render training hazard zone (Shielding)
        if (lesson.hazardZone) {
            const hz = lesson.hazardZone;
            ctx.save();
            ctx.translate(hz.x, hz.y);
            
            // Pulsing red danger zone
            const zonePulse = 1 + Math.sin(time * 2) * 0.05;
            const r = hz.radius * zonePulse;
            
            ctx.beginPath();
            const grad = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, r);
            grad.addColorStop(0, 'rgba(255, 0, 0, 0.0)');
            grad.addColorStop(0.8, 'rgba(255, 0, 0, 0.2)');
            grad.addColorStop(1, 'rgba(255, 0, 0, 0.5)');
            ctx.fillStyle = grad;
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.fill();
            
            // Warning border
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 50, 50, 0.8)';
            ctx.setLineDash([20, 15]);
            ctx.lineDashOffset = -time * 20;
            ctx.lineWidth = 3;
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // WARNING text rotating around edge
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff0000';
            ctx.font = 'bold 16px "Exo 2", monospace';
            ctx.fillStyle = '#ff5555';
            ctx.textAlign = 'center';
            for (let i = 0; i < 4; i++) {
                ctx.save();
                ctx.rotate(time * 0.5 + i * Math.PI / 2);
                ctx.translate(0, -r - 10);
                ctx.fillText('WARNING: RADIATION ZONE', 0, 0);
                ctx.restore();
            }
            
            ctx.restore();
        }
        
        // Render training hazards (Black holes, mines)
        if (lesson.hazards) {
            lesson.hazards.forEach(h => {
                if (h.x === -99999) return; // Destroyed
                ctx.save();
                ctx.translate(h.x, h.y);
                
                if (h.type === 'blackhole') {
                    // Mini training blackhole
                    ctx.beginPath();
                    ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0,0,0,0.8)';
                    ctx.fill();
                    
                    // Event horizon glow
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#aa00ff';
                    ctx.beginPath();
                    ctx.strokeStyle = '#df80ff';
                    ctx.lineWidth = 4;
                    ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    // Swirl lines
                    ctx.strokeStyle = '#aa00ff';
                    ctx.lineWidth = 2;
                    ctx.globalAlpha = 0.6;
                    for (let i = 0; i < 5; i++) {
                        ctx.beginPath();
                        ctx.arc(0, 0, h.radius * (0.2 + (i/5) + Math.sin(time*2)/10), time + i, time + i + Math.PI);
                        ctx.stroke();
                    }
                } else if (h.type === 'mine') {
                    // Training mine blast radius
                    ctx.beginPath();
                    ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255,0,0,0.1)';
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255,0,0,0.5)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    
                    // Mine core
                    ctx.beginPath();
                    ctx.fillStyle = '#ff0000';
                    ctx.arc(0, 0, 20 + Math.sin(time*8)*5, 0, Math.PI*2);
                    ctx.fill();
                }
                
                ctx.restore();
            });
        }
    }

    renderTrainingHUD(ctx) {
        if (!this.trainingLesson) return;
        if (!this.trainingActive && !this.trainingBriefing && !this.trainingComplete) return;

        const lesson = this.trainingLesson;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Screen space

        // --- BRIEFING OVERLAY ---
        if (this.trainingBriefing) {
            const elapsed = (performance.now() - this.trainingBriefingStart) / 1000;
            const fadeIn = Math.min(1, elapsed / 0.5);

            // Backdrop
            ctx.globalAlpha = fadeIn * 0.75;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            // Briefing card
            ctx.globalAlpha = fadeIn;
            const cardW = Math.min(500, w * 0.8);
            const cardH = 300;
            const cx = (w - cardW) / 2;
            const cy = (h - cardH) / 2;

            // Card background
            ctx.fillStyle = 'rgba(10, 22, 40, 0.95)';
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(cx, cy, cardW, cardH, 12);
            ctx.fill();
            ctx.stroke();

            // Lesson icon + title
            ctx.textAlign = 'center';
            ctx.font = 'bold 32px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00f3ff';
            ctx.fillText(`${lesson.icon} ${lesson.name}`, w / 2, cy + 55);

            // Subtitle
            ctx.shadowBlur = 0;
            ctx.font = '14px "Exo 2", sans-serif';
            ctx.fillStyle = '#8ba';
            ctx.fillText(lesson.subtitle, w / 2, cy + 80);

            // Briefing text
            ctx.font = '15px "Exo 2", sans-serif';
            ctx.fillStyle = '#d0eeff';
            const lines = lesson.briefing.split('\n');
            lines.forEach((line, i) => {
                ctx.fillText(line, w / 2, cy + 120 + i * 24);
            });

            // Key indicators
            const keyY = cy + 120 + lines.length * 24 + 20;
            ctx.font = 'bold 13px "Exo 2", monospace';
            const totalKeysWidth = lesson.keys.length * 100;
            let keyX = w / 2 - totalKeysWidth / 2 + 50;
            lesson.keys.forEach(k => {
                // Key box
                ctx.fillStyle = 'rgba(0,243,255,0.15)';
                ctx.strokeStyle = 'rgba(0,243,255,0.5)';
                ctx.lineWidth = 1.5;
                const boxW = Math.max(40, ctx.measureText(k.key).width + 20);
                ctx.beginPath();
                ctx.roundRect(keyX - boxW / 2, keyY - 12, boxW, 28, 6);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#00f3ff';
                ctx.textAlign = 'center';
                ctx.fillText(k.key, keyX, keyY + 6);

                // Action label
                ctx.font = '11px "Exo 2", sans-serif';
                ctx.fillStyle = '#8ba';
                ctx.fillText(k.action, keyX, keyY + 28);
                ctx.font = 'bold 13px "Exo 2", monospace';

                keyX += 110;
            });

            // "Press any key" hint
            const blinkAlpha = elapsed > 1.5 ? 0.4 + Math.sin(performance.now() * 0.005) * 0.4 : 0;
            ctx.globalAlpha = blinkAlpha;
            ctx.font = '14px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            ctx.textAlign = 'center';
            ctx.fillText('Press W or ENTER to start', w / 2, cy + cardH - 20);

            ctx.restore();
            return; // Don't render other HUD during briefing
        }

        // --- COMPLETION OVERLAY ---
        if (this.trainingComplete) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            ctx.globalAlpha = 1.0;
            const medalEmoji = this.trainingMedal === 'gold' ? '🥇' : this.trainingMedal === 'silver' ? '🥈' : this.trainingMedal === 'bronze' ? '🥉' : '✅';
            const medalColor = this.trainingMedal === 'gold' ? '#ffd700' : this.trainingMedal === 'silver' ? '#c0c0c0' : this.trainingMedal === 'bronze' ? '#cd7f32' : '#00ff66';

            ctx.textAlign = 'center';

            // Medal
            ctx.font = '64px sans-serif';
            ctx.fillText(medalEmoji, w / 2, h / 2 - 60);

            // Title
            ctx.font = 'bold 28px "Exo 2", sans-serif';
            ctx.fillStyle = medalColor;
            ctx.shadowBlur = 20;
            ctx.shadowColor = medalColor;
            ctx.fillText('LESSON COMPLETE!', w / 2, h / 2);

            // Stats
            ctx.shadowBlur = 0;
            ctx.font = '18px "Exo 2", sans-serif';
            ctx.fillStyle = '#d0eeff';
            ctx.fillText(`Time: ${this.trainingTimer.toFixed(1)}s`, w / 2, h / 2 + 35);

            const reward = this.trainingMedal ? lesson.reward[this.trainingMedal] : 50;
            ctx.fillStyle = '#ffd700';
            ctx.fillText(`+$${reward}`, w / 2, h / 2 + 60);

            // Gem rewards display
            if (this.trainingGemSummary && this.trainingGemSummary.length > 0) {
                ctx.font = '13px "Exo 2", sans-serif';
                ctx.fillStyle = '#00f3ff';
                const gemLine = this.trainingGemSummary.join('  •  ');
                ctx.fillText(`💎 ${gemLine}`, w / 2, h / 2 + 82);
            }

            // Medal thresholds
            ctx.font = '13px "Exo 2", sans-serif';
            ctx.fillStyle = '#667';
            ctx.fillText(`🥇 <${lesson.medals.gold}s  🥈 <${lesson.medals.silver}s  🥉 <${lesson.medals.bronze}s`, w / 2, h / 2 + 108);

            // Actions
            ctx.font = '15px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            const blinkAlpha = 0.5 + Math.sin(performance.now() * 0.004) * 0.4;
            ctx.globalAlpha = blinkAlpha;
            ctx.fillText('Press ENTER to continue', w / 2, h / 2 + 135);

            // Check for dismiss
            if (this.keysPressed['enter'] || this.keysPressed[' ']) {
                this.trainingComplete = false;
                this.trainingLesson = null;
                // Open academy to pick next lesson
                setTimeout(() => this.openFlightAcademy(), 300);
            }

            ctx.restore();
            return;
        }

        // --- ACTIVE TRAINING HUD ---
        const time = performance.now() * 0.003;

        // Top-center: Lesson title + timer
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f3ff';
        ctx.globalAlpha = 0.9;
        ctx.fillText(`${lesson.icon} ${lesson.name}`, w / 2, 35);

        // Timer
        ctx.shadowBlur = 0;
        ctx.font = 'bold 22px "Exo 2", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.trainingTimer.toFixed(1) + 's', w / 2, 60);

        // Progress bar
        const totalGates = lesson.gates.filter(g => lesson.id !== 'collection' || !g.reached).length;
        const reachedGates = lesson.gates.filter(g => g.reached).length;
        let progressRatio;
        if (lesson.id === 'collection') {
            progressRatio = this.trainingGemsCollected / (lesson.collectTarget || lesson.gems.length);
        } else {
            progressRatio = reachedGates / lesson.gates.length;
        }
        const barW = 200;
        const barH = 6;
        const barX = w / 2 - barW / 2;
        const barY = 70;

        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#1a2a3a';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(barX, barY, barW * Math.min(1, progressRatio), barH);

        // Gate/gem counter
        ctx.font = '11px "Exo 2", sans-serif';
        ctx.fillStyle = '#8ba';
        ctx.globalAlpha = 0.8;
        if (lesson.id === 'collection') {
            ctx.fillText(`Gems: ${this.trainingGemsCollected}/${lesson.collectTarget || lesson.gems.length}`, w / 2, barY + 20);
        } else {
            ctx.fillText(`Gates: ${reachedGates}/${lesson.gates.length}`, w / 2, barY + 20);
        }

        // --- MISSION OBJECTIVE (always visible) ---
        ctx.globalAlpha = 0.85;
        ctx.font = '13px "Exo 2", sans-serif';
        ctx.fillStyle = '#d0eeff';
        // Show a single-line objective derived from briefing
        const objectiveLines = lesson.briefing.split('\n').filter(l => l.trim());
        const objectiveY = barY + 22;
        objectiveLines.forEach((line, i) => {
            ctx.globalAlpha = Math.max(0.4, 0.85 - i * 0.15);
            ctx.fillText(line, w / 2, objectiveY + 16 + i * 17);
        });

        // Medal thresholds small text
        const medalsY = objectiveY + 16 + objectiveLines.length * 17 + 6;
        ctx.font = '10px "Exo 2", sans-serif';
        ctx.fillStyle = '#445';
        ctx.globalAlpha = 0.6;
        ctx.fillText(`🥇${lesson.medals.gold}s  🥈${lesson.medals.silver}s  🥉${lesson.medals.bronze}s`, w / 2, medalsY);

        // --- Key hints (bottom center) ---
        ctx.globalAlpha = 0.5 + Math.sin(time) * 0.15;
        ctx.font = '12px "Exo 2", monospace';
        ctx.fillStyle = '#00f3ff';
        const hintText = lesson.keys.map(k => `[${k.key}] ${k.action}`).join('   ');
        ctx.fillText(hintText, w / 2, h - 25);

        // --- HUD Arrow to next gate ---
        if (lesson.showArrow && this.trainingGateIndex < lesson.gates.length) {
            const gate = lesson.gates[this.trainingGateIndex];
            const dx = gate.x - this.playerShip.x;
            const dy = gate.y - this.playerShip.y;
            const angle = Math.atan2(dy, dx);
            const dist = Math.hypot(dx, dy);

            const indicatorRadius = Math.min(w, h) * 0.15;
            const ix = w / 2 + Math.cos(angle) * indicatorRadius;
            const iy = h / 2 + Math.sin(angle) * indicatorRadius;

            ctx.save();
            ctx.translate(ix, iy);
            ctx.rotate(angle);

            const pulse = 1 + Math.sin(time * 2) * 0.12;

            // Neon arrow
            ctx.beginPath();
            ctx.moveTo(22 * pulse, 0);
            ctx.lineTo(-10 * pulse, -13 * pulse);
            ctx.lineTo(-10 * pulse, 13 * pulse);
            ctx.closePath();
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 18;
            ctx.shadowColor = '#00f3ff';
            ctx.globalAlpha = 0.7 + Math.sin(time * 2) * 0.25;
            ctx.fill();

            // Distance
            ctx.rotate(-angle);
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'black';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px "Exo 2", sans-serif';
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.9;
            ctx.fillText(`${Math.round(dist)}m`, 0, 30);
            ctx.restore();
        }

        // For collection lesson, show arrow to nearest uncollected gem
        if (lesson.id === 'collection' && this.trainingGemsCollected < (lesson.collectTarget || lesson.gems.length)) {
            let nearestGem = null;
            let nearestDist = Infinity;
            for (const gem of lesson.gems) {
                if (gem.collected) continue;
                const d = Math.hypot(gem.x - this.playerShip.x, gem.y - this.playerShip.y);
                if (d < nearestDist) { nearestDist = d; nearestGem = gem; }
            }
            if (nearestGem) {
                const angle = Math.atan2(nearestGem.y - this.playerShip.y, nearestGem.x - this.playerShip.x);
                const indicatorRadius = Math.min(w, h) * 0.12;
                const ix = w / 2 + Math.cos(angle) * indicatorRadius;
                const iy = h / 2 + Math.sin(angle) * indicatorRadius;

                ctx.save();
                ctx.translate(ix, iy);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(15, 0);
                ctx.lineTo(-7, -9);
                ctx.lineTo(-7, 9);
                ctx.closePath();
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 12;
                ctx.shadowColor = '#ffd700';
                ctx.globalAlpha = 0.6 + Math.sin(time * 3) * 0.3;
                ctx.fill();
                ctx.rotate(-angle);
                ctx.font = '11px "Exo 2", sans-serif';
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#000';
                ctx.textAlign = 'center';
                ctx.fillText(`💎 ${Math.round(nearestDist)}m`, 0, 24);
                ctx.restore();
            }
        }

        // Cancel hint
        ctx.globalAlpha = 0.35;
        ctx.font = '10px "Exo 2", sans-serif';
        ctx.fillStyle = '#ff6666';
        ctx.textAlign = 'right';
        ctx.fillText('ESC to cancel', w - 15, 20);

        ctx.restore();

        // Check ESC to cancel
        if (this.keysPressed['escape']) {
            this.keysPressed['escape'] = false;
            this.cancelTraining();
        }
    }

    // Legacy tutorial methods (kept for backward compatibility)
    startTutorial() {
        this.openFlightAcademy();
    }
    updateTutorial() { } // No-op, replaced by updateTraining
    renderTutorialWaypoints(ctx) {
        this.renderTrainingGates(ctx);
    }
    renderTutorialHUDIndicator(ctx) {
        this.renderTrainingHUD(ctx);
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
                        const dist = Math.sqrt(Math.random() * (640000 - 90000) + 90000);
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
                        effect.particles = this.generateSupernovaParticles(isBase ? 200 : 400);
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
                    effect.particles = this.generateSupernovaParticles(400);
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

                p.vx += Math.cos(ang) * swirlForce * (150 / (dist + 10)) - (p.x / Math.max(0.1, dist)) * pullIn;
                p.vy += Math.sin(ang) * swirlForce * (150 / (dist + 10)) - (p.y / Math.max(0.1, dist)) * pullIn;

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
                    d.vx -= (d.x / Math.max(0.1, dist)) * 2;
                    d.vy -= (d.y / Math.max(0.1, dist)) * 2;
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
            if (effect.phase !== 'explosion') {
                if (window.gameAudio) {
                    if (window.gameAudio.playPlayerExplosion) window.gameAudio.playPlayerExplosion();
                    else window.gameAudio.playExplosionBig();
                    // Mute hum and engines momentarily (2.5 seconds) following the explosion
                    window.gameAudio.muteHumTemporarily(2500); 
                }
                // Massive expanding energy sphere
                this.activePulsePing = {
                    startTime: now,
                    duration: 1500,
                    maxRadius: 2000
                };
            }
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

            // Remain in the same location upon respawn
            // (Teleportation code removed as per user request)
            this.playerShip.vx = 0;
            this.playerShip.vy = 0;
            this.playerShip.ax = 0;
            this.playerShip.ay = 0;
            this.shipSpeed = 0;
            this.targetShipSpeed = 0;
            if (this.flightControls) {
                this.flightControls.targetSpeed = 0;
                this.flightControls.currentSpeed = 0;
            }
            this.showToast('🚀 Respawned! Shields restored.');
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
                    setTimeout(() => this.spawnBoss(this.activeMission.bossType), 2000);
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

    updateStarColors() {
        try {
            const c1 = document.getElementById('starColor1')?.value || '#ffffff';
            const c2 = document.getElementById('starColor2')?.value || '#aaddff';
            const c3 = document.getElementById('starColor3')?.value || '#ffddaa';
            this.starColors = [c1, c2, c3];
            this.generateStaticStars();
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
            this.generateStaticStars();
            this.showToast(this.bgDriftMode ? 'Star Drift ON' : 'Star Drift OFF');
        } catch (e) {
            console.error('[BG Error] toggleBgDrift failed:', e);
            this.bgDriftMode = false;
            this.showToast('Drift mode error - please try again');
        }
    }

    toggleUpgradePanel() {
        console.log("[HUD] Toggle Upgrade Panel triggered");
        const panel = document.getElementById('upgradePanel');
        if (panel) {
            if (panel.classList.contains('active')) {
                // Hide
                panel.classList.remove('active');
                this.gamePaused = false;
                setTimeout(() => { panel.classList.add('hidden'); }, 300);
            } else {
                // Show
                panel.classList.remove('hidden');
                // trigger reflow
                void panel.offsetWidth;
                panel.classList.add('active');
                this.gamePaused = true;
                this.updateUpgradeUI();
            }
        } else {
            console.error("[HUD] upgradePanel NOT found in DOM!");
        }
    }
    toggleStatusWindow() {
        const panel = document.getElementById('statusWindow');
        if (!panel) return;
        
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            this.gamePaused = false;
            setTimeout(() => { panel.classList.add('hidden'); }, 300);
        } else {
            panel.classList.remove('hidden');
            void panel.offsetWidth;
            panel.classList.add('active');
            this.gamePaused = true;
            this.updateStatusWindowUI();
        }
    }

    updateStatusWindowUI() {
        // Pilot Tab
        const pStats = this.playerStats;
        document.getElementById('statKills').textContent = pStats.kills.toLocaleString();
        document.getElementById('statDeaths').textContent = pStats.deaths.toLocaleString();
        
        const kd = pStats.deaths === 0 ? pStats.kills : (pStats.kills / pStats.deaths).toFixed(2);
        document.getElementById('statKD').textContent = kd;
        
        document.getElementById('statShotsFired').textContent = pStats.shotsFired.toLocaleString();
        document.getElementById('statShotsHit').textContent = pStats.shotsHit.toLocaleString();
        
        const accuracy = pStats.shotsFired === 0 ? 0 : Math.round((pStats.shotsHit / pStats.shotsFired) * 100);
        document.getElementById('statAccuracyPercent').textContent = accuracy + '%';
        document.getElementById('statAccuracyBar').style.width = accuracy + '%';

        // Ship Tab
        const ship = this.playerShip;
        if (ship) {
            const hullPct = Math.round((ship.hullHealth / ship.maxHull) * 100) || 0;
            const shieldPct = Math.round((ship.shield / ship.maxShield) * 100) || 0;
            const energyPct = Math.round((ship.energy / ship.maxEnergy) * 100) || 0;
            const maxSpeed = Math.round(ship.maxSpeed || 0);

            document.getElementById('statusHull').textContent = hullPct + '%';
            document.getElementById('statusShields').textContent = shieldPct + '%';
            document.getElementById('statusEnergy').textContent = energyPct + '%';
            document.getElementById('statusSpeed').textContent = maxSpeed + ' m/s';

            const eq = ship.equipment || {};
            const inv = ship.inventory || [];
            document.getElementById('statusCargo').textContent = `${inv.length} / ${ship.cargoCapacity || 10}`;
            document.getElementById('statusCredits').textContent = this.credits.toLocaleString();
            document.getElementById('statusGems').textContent = this.playerGems.toLocaleString();
            
            let weaponCount = 0;
            if (eq.weapons) {
                weaponCount = Array.isArray(eq.weapons) ? eq.weapons.filter(w => w).length : (eq.weapons ? 1 : 0);
            }
            document.getElementById('statusWeapons').textContent = weaponCount;
        }
    }

    updateUpgradeUI() {
        const list = document.getElementById('upgradeList');
        const credits = document.getElementById('dockCredits');
        if (!list || !credits) return;

        credits.textContent = '$' + this.credits.toLocaleString();

        let html = '';
        const eq = this.playerShip.equipment || {};
        const inv = this.playerShip.inventory || [];
        
        // Ensure weapons is an array of 5 slots
        if (!Array.isArray(eq.weapons)) {
            eq.weapons = [eq.weapons, null, null, null, null];
        }

        // Helper to check if player owns an item
        const ownsItem = (id) => inv.includes(id) || eq.engine === id || eq.shield === id || eq.radar === id || eq.wings === id || eq.weapons.includes(id);

        for (const [category, items] of Object.entries(this.equipmentDB)) {
            html += `<div style="margin-top: 10px; font-weight: bold; color: #5c7a8a; border-bottom: 1px solid #5c7a8a; padding-bottom: 2px; text-transform: uppercase;">${category}</div>`;
            
            for (const [id, def] of Object.entries(items)) {
                const isOwned = ownsItem(id);
                let isEquipped = false;
                let equippedSlot = -1;

                if (category === 'weapons') {
                    equippedSlot = eq.weapons.indexOf(id);
                    isEquipped = equippedSlot !== -1;
                } else {
                    isEquipped = eq[category] === id;
                }

                const canAfford = this.credits >= def.cost;
                
                let btnHtml = '';
                if (isEquipped) {
                    if (category === 'weapons') {
                        btnHtml = `<button class="btn-small" onclick="app.unequipItem('${category}', '${id}')" style="width:100%; font-size:10px; padding:4px; background: rgba(255,50,50,0.2); border: 1px solid #ff3333; color: #ff3333;">UNEQUIP (SLOT ${equippedSlot + 1})</button>`;
                    } else {
                        btnHtml = `<button class="btn-small" style="width:100%; font-size:10px; padding:4px; opacity:0.5; cursor:not-allowed;">EQUIPPED</button>`;
                    }
                } else if (isOwned) {
                    btnHtml = `<button class="btn-small" onclick="app.equipItem('${category}', '${id}')" style="width:100%; font-size:10px; padding:4px; border: 1px solid #00f3ff; color: #00f3ff; background: rgba(0,243,255,0.1);">EQUIP</button>`;
                } else {
                    btnHtml = `<button class="btn-small" onclick="app.buyItem('${category}', '${id}')" style="width:100%; font-size:10px; padding:4px; ${canAfford ? 'cursor:pointer' : 'opacity:0.5; cursor:not-allowed;'}">BUY ($${def.cost.toLocaleString()})</button>`;
                }

                // Make specific stat descriptions
                let statText = def.description;
                if (def.damage) statText += ` • Dmg: ${def.damage}`;
                if (def.speedModifier) statText += ` • Spd: +${Math.round(def.speedModifier * 100)}%`;
                if (def.shieldBonus) statText += ` • Shld: +${def.shieldBonus}`;
                if (def.range) statText += ` • Rng: ${def.range}`;

                html += `
                    <div style="background:rgba(255,255,255,0.05); border:1px solid ${isEquipped ? 'rgba(0,243,255,0.6)' : (isOwned ? 'rgba(255,255,255,0.2)' : (canAfford ? 'rgba(0,243,255,0.3)' : 'rgba(255,50,50,0.3)'))}; padding:8px; border-radius:6px; margin-top: 4px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <span style="font-weight:bold; color:${isEquipped ? '#00f3ff' : '#e0faff'}; font-size:11px;">${def.name}</span>
                        </div>
                        <div style="font-size:9px; color:#8ba; margin-bottom:6px;">${statText}</div>
                        ${btnHtml}
                    </div>
                `;
            }
        }

        list.innerHTML = html;
    }

    buyItem(category, id) {
        const def = this.equipmentDB[category][id];
        if (!def) return;
        if (this.credits >= def.cost) {
            this.credits -= def.cost;
            if (!this.playerShip.inventory) this.playerShip.inventory = [];
            this.playerShip.inventory.push(id);
            this.showToast(`Bought ${def.name}!`);
            
            // Auto-equip if we don't have something equipped in that category (or if it's weapons and we have an empty slot)
            this.equipItem(category, id, true);
        } else {
            this.showToast('Not enough credits!');
        }
    }

    equipItem(category, id, isAutoEquip = false) {
        if (!this.playerShip.inventory) this.playerShip.inventory = [];
        const eq = this.playerShip.equipment;
        
        if (category === 'weapons') {
            const emptySlot = eq.weapons.indexOf(null);
            if (emptySlot !== -1) {
                eq.weapons[emptySlot] = id;
                this.showToast(`Equipped ${this.equipmentDB[category][id].name} to slot ${emptySlot + 1}`);
            } else if (!isAutoEquip) {
                // If full, replace slot 1 (index 0) for now
                eq.weapons[0] = id;
                this.showToast(`Replaced Slot 1 with ${this.equipmentDB[category][id].name}`);
            }
        } else {
            eq[category] = id;
            if (!isAutoEquip) this.showToast(`Equipped ${this.equipmentDB[category][id].name}`);
        }
        
        this.playerShip.calculateShipStats();
        this.updateUpgradeUI();
    }

    unequipItem(category, id) {
        const eq = this.playerShip.equipment;
        if (category === 'weapons') {
            const slot = eq.weapons.indexOf(id);
            if (slot !== -1) {
                eq.weapons[slot] = null;
                this.showToast(`Unequipped ${this.equipmentDB[category][id].name}`);
            }
        }
        this.playerShip.calculateShipStats();
        this.updateUpgradeUI();
    }

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
                this.showToast('Warp still decelerating...');
                return;
            }

            // DISENGAGE path: When warp is ON, start the disengage animation
            if (this.bgWarpMode) {
                this.warpDisengaging = true;
                this.disengageStartTime = performance.now(); // Track when disengage started
                this.disengageDuration = 4500; // 4.5 seconds total animation
                if (btn) btn.classList.remove('active');
                this.showToast('Warp Disengaged - Decelerating...');

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

                            this.showToast('Arrived at new destination');
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

            this.showToast('WARP ENGAGED!');

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
            this.showToast('Warp mode error - please try again');
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
                    this.showToast('Engines Stopped');
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
            const cardH = 360;
            const cy = (h - cardH) / 2;
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

        if (this.pointer.onCanvas && document.activeElement && document.activeElement.tagName === 'INPUT') {
            document.activeElement.blur();
            this.pointer.onCanvas = false;
            return;
        }

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
            this.draw();
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
            this.draw();
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
                    const pos3D = this.inverseRotate3D(world.x, world.y, center.x, center.y);

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
            this.showToast(`Deleted star`);
            this.draw();
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
                    this.showToast(`Deleted connection`);
                    this.draw();
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
        if (!this.flightMode) {
            this.draw();
        }
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
        this.draw();
    }

    /**
     * Re-calculates connections and assigns cluster names/IDs to all star objects.
     * Guarantees that s.clusterId is always a string (either the constellation name or the star's unique string ID).
     */
    refreshClusterAssignments() {
        const { lines, clusters } = this.calculateGeometry();

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
            this.showToast("Nothing to undo");
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

        this.draw();
        this.showToast(`Undone(${this.history.length} remaining)`);
    }

    requestClear() {
        const modal = document.getElementById('clearModal');
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.add('active');
        if (window.game) window.game.gamePaused = true;
    }

    closeModal() {
        const modal = document.getElementById('clearModal');
        modal.classList.remove('active');
        if (window.game) window.game.gamePaused = false;
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    confirmClear() {
        this.saveState();
        this.stars = [];
        this.resetCamera();
        this.closeModal();
        this.draw();
        this.showToast("Universe Imploded");
    }

    resetView() {
        this.resetCamera();
    }

    adjustZoom(delta) {
        this.camera.zoom = Math.max(0.1, Math.min(6, this.camera.zoom + delta));
        // Re-center camera on ship in flight mode to prevent drift
        if (this.flightMode && this.playerShip) {
            this.camera.x = -this.playerShip.x * this.camera.zoom;
            this.camera.y = -this.playerShip.y * this.camera.zoom;
        } else {
            this.draw();
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

    generateBackground() {
        try {
            // Allow empty activeStyles for minimal black background with just faint stars
            this.config.showBackground = true;
            this.staticStars = [];
            this.galaxies = [];
            this.blackHoles = [];
            this.planets = []; // Prevent planet accumulation
            this.shootingStars = [];
            this.backgroundStars = [];
            this.nebulae = [];
            this.spacecraft = [];
            this.matrixStreams = [];

            // Load ship settings
            // Load ship settings
            const savedColor = localStorage.getItem('playerShipColor'); // Consistent Key
            if (savedColor) {
                this.playerShip.color = savedColor;
                // Also update the color picker UI to match
                const shipColorPicker = document.getElementById('shipColorPicker');
                if (shipColorPicker) shipColorPicker.value = savedColor;
            }

            // Load saved 3D rotation
            const savedRotation = localStorage.getItem('shipRotation');
            if (savedRotation) {
                try {
                    const rot = JSON.parse(savedRotation);
                    this.playerShip.rotation = rot.yaw || 0;
                    this.playerShip.pitch = rot.pitch || 0;
                    this.playerShip.roll = rot.roll || 0;

                    // Sync sliders
                    const yawDeg = Math.round(this.playerShip.rotation * 180 / Math.PI);
                    const pitchDeg = Math.round(this.playerShip.pitch * 180 / Math.PI);
                    const rollDeg = Math.round(this.playerShip.roll * 180 / Math.PI);

                    const yawSlider = document.getElementById('yawSlider');
                    const pitchSlider = document.getElementById('pitchSlider');
                    const rollSlider = document.getElementById('rollSlider');

                    if (yawSlider) { yawSlider.value = yawDeg; document.getElementById('yawValue').textContent = yawDeg + '°'; }
                    if (pitchSlider) { pitchSlider.value = pitchDeg; document.getElementById('pitchValue').textContent = pitchDeg + '°'; }
                    if (rollSlider) { rollSlider.value = rollDeg; document.getElementById('rollValue').textContent = rollDeg + '°'; }
                } catch (e) { console.warn('Could not load saved rotation:', e); }
            }

            // FORCE UPDATE STATS (to fix "too slow" issue for existing saves)
            // We re-apply base stats from the current type definitions
            const type = this.playerShip.type || 'interceptor';
            const baseStats = {
                interceptor: { maxSpeed: 90, acceleration: 0.8 },
                saucer: { maxSpeed: 110, acceleration: 1.0 },
                hauler: { maxSpeed: 60, acceleration: 0.5 },
                orion: { maxSpeed: 100, acceleration: 0.9 },
                draco: { maxSpeed: 130, acceleration: 0.7 },
                phoenix: { maxSpeed: 95, acceleration: 1.2 },
                harvester: { maxSpeed: 140, acceleration: 1.3 } // Starfighter
            }[type];

            if (baseStats) {
                this.playerShip.maxSpeed = baseStats.maxSpeed;
                this.playerShip.acceleration = baseStats.acceleration;
            }

            const savedStruct = localStorage.getItem('customShipStructure');
            if (savedStruct) {
                try {
                    this.playerShip.customStructure = JSON.parse(savedStruct);
                } catch (e) { console.error("Failed to load ship struct", e); }
            }

            // Load saved type
            const savedType = localStorage.getItem('playerShipType');
            if (savedType) this.playerShip.type = savedType;

            // State handling for Cyber theme history
            try {
                const savedHistory = localStorage.getItem('matrixThemeHistory');
                this.themeHistory = savedHistory ? JSON.parse(savedHistory) : [];
                this.lastMatrixFamily = localStorage.getItem('matrixLastFamily') || '';
            } catch (e) {
                console.warn('[BG] Theme history load failed:', e);
                this.themeHistory = [];
                this.lastMatrixFamily = '';
            }

            // 1. Static Stars (Mixed Palette)
            try {
                this.generateStaticStars();
            } catch (e) {
                console.error('[BG Error] generateStaticStars failed:', e);
                this.staticStars = [];
            }

            // Clear all composited arrays first to prevent accumulation/memory leaks!
            this.backgroundStars = [];
            this.galaxies = [];
            this.blackHoles = [];
            this.planets = [];
            this.nebulae = [];
            this.spacecraft = [];
            this.matrixStreams = [];

            // 2. Compose Layers based on active styles
            // Order matters for layering (Deep Space -> Nebula -> Alien -> Cyber)
            const orderedStyles = ['deep-space', 'nebula', 'alien', 'cyber'];
            const activeSet = new Set(this.activeStyles);
            this.activeStyles.clear();

            orderedStyles.forEach(style => {
                if (activeSet.has(style)) {
                    this.toggleBgStyle(style);
                }
            });
        } catch (e) {
            console.error('[BG Error] generateBackground failed critically:', e);
            this.showToast('Background generation failed - using minimal mode');
            // Ensure arrays exist to prevent cascade failures
            this.staticStars = this.staticStars || [];
            this.galaxies = this.galaxies || [];
            this.blackHoles = this.blackHoles || [];
            this.shootingStars = this.shootingStars || [];
            this.backgroundStars = this.backgroundStars || [];
            this.nebulae = this.nebulae || [];
            this.spacecraft = this.spacecraft || [];
            this.matrixStreams = this.matrixStreams || [];
        }
    }

    generateStaticStars() {
        this.staticStars = [];
        const count = this.bgWarpMode ? 800 : 500;

        const c1 = document.getElementById('starColor1')?.value || '#ffffff';
        const c2 = document.getElementById('starColor2')?.value || '#aaddff';
        const c3 = document.getElementById('starColor3')?.value || '#ffddaa';
        const activeColors = [c1, c2, c3];
        this.starColors = activeColors;

        const w = this.canvas?.width || window.innerWidth || 800;
        const h = this.canvas?.height || window.innerHeight || 600;
        const centerX = w / 2;
        const centerY = h / 2;
        const spreadX = w * 4;
        const spreadY = h * 4;

        for (let i = 0; i < count; i++) {
            let x, y, vx = 0, vy = 0;
            const depthLayer = 0.2 + Math.random() * 1.0;

            if (this.bgWarpMode) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.sqrt(Math.random()) * Math.max(w, h) * 0.8;
                x = centerX + Math.cos(angle) * dist;
                y = centerY + Math.sin(angle) * dist;
                const speed = (6 + Math.random() * 14) * depthLayer;
                vx = Math.cos(angle) * speed;
                vy = Math.sin(angle) * speed;
            } else {
                x = Math.random() * spreadX - spreadX / 2 + centerX;
                y = Math.random() * spreadY - spreadY / 2 + centerY;

                const angle = Math.PI * 0.25;
                const baseSpeed = 0.6 + Math.random() * 1.0;
                vx = Math.cos(angle) * baseSpeed * depthLayer;
                vy = Math.sin(angle) * baseSpeed * depthLayer;
            }

            this.staticStars.push({
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                size: (Math.random() * 1.2 + 0.3) * depthLayer,
                alpha: Math.random() * 0.6 + 0.2,
                baseAlpha: Math.random() * 0.6 + 0.2,
                color: activeColors[Math.floor(Math.random() * activeColors.length)],
                depth: depthLayer,
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.02 + Math.random() * 0.04
            });
        }
    }

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

    generateDeepSpaceStyle() {
        const range = this.worldSize;
        const half = range / 2;
        const zRange = 3000; // Increased Z-axis depth range

        // Define zoom tiers: close, medium, far
        // Close tier: objects within 4000px of center (visible at max zoom)
        // Medium tier: objects 4000-20000px from center (visible at default zoom)
        // Far tier: objects 20000-60000px from center (visible when zoomed out)

        // 1. Background Stars - distributed across all tiers
        const starCount = 3000; // Increased to cover larger area
        for (let i = 0; i < starCount; i++) {
            const tier = Math.random();
            let dist, size;
            if (tier < 0.2) { // Close tier - 20%
                dist = Math.sqrt(Math.random()) * 4000;
                size = 0.5 + Math.random() * 1.0;
            } else if (tier < 0.5) { // Medium tier - 30%
                dist = Math.sqrt(Math.random() * (24000*24000 - 4000*4000) + 4000*4000);
                size = 1.0 + Math.random() * 1.5;
            } else { // Far tier - 50%
                dist = Math.sqrt(Math.random() * (80000*80000 - 20000*20000) + 20000*20000);
                size = 1.5 + Math.random() * 2.0;
            }
            const angle = Math.random() * Math.PI * 2;
            this.backgroundStars.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                r: size,
                alpha: 0.15 + Math.random() * 0.5
            });
        }

        // 2. Galaxies (Suns) - drastically reduced to stop spamming the map with instant-death fake planets
        const galaxyConfigs = [
            { count: 1, minDist: 200, maxDist: 1000, minSize: 100, maxSize: 150 }, // Point-blank
            { count: 4, minDist: 1000, maxDist: 10000, minSize: 80, maxSize: 250 },
            { count: 8, minDist: 10000, maxDist: 40000, minSize: 200, maxSize: 500 },
            { count: 12, minDist: 40000, maxDist: 80000, minSize: 400, maxSize: 1000 }
        ];
        galaxyConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                // Fix radial clustering: uniformly distribute in an annulus
                const dist = Math.sqrt(Math.random() * (cfg.maxDist * cfg.maxDist - cfg.minDist * cfg.minDist) + cfg.minDist * cfg.minDist);
                const angle = Math.random() * Math.PI * 2;
                this.galaxies.push({
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    z: (Math.random() * zRange) - zRange / 2,
                    // Expanded color palette
                    color: ['#ff0055', '#5500ff', '#00aaff', '#ff00aa', '#00ff88', '#ffaa00', '#aa00ff', '#ffffff'][Math.floor(Math.random() * 8)],
                    angle: Math.random() * Math.PI * 2,
                    size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize),
                    useTribal: Math.random() > 0.5
                });
            }
        });

        // 3. Black Holes - spread out, drastically reduced
        const blackHoleConfigs = [
            { count: 5, minDist: 1000, maxDist: 10000, minSize: 30, maxSize: 60 },
            { count: 10, minDist: 10000, maxDist: 30000, minSize: 60, maxSize: 120 },
            { count: 15, minDist: 30000, maxDist: 80000, minSize: 120, maxSize: 250 }
        ];
        blackHoleConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                const dist = Math.sqrt(Math.random() * (cfg.maxDist * cfg.maxDist - cfg.minDist * cfg.minDist) + cfg.minDist * cfg.minDist);
            const angle = Math.random() * Math.PI * 2;
            this.blackHoles.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize)
                });
            }
        });

        // 4. Nebulae - 18 total (+50%), distributed across tiers
        const nebulaConfigs = [
            { count: 30, minDist: 500, maxDist: 5000, minSize: 150, maxSize: 350 },
            { count: 60, minDist: 5000, maxDist: 25000, minSize: 350, maxSize: 700 },
            { count: 110, minDist: 25000, maxDist: 80000, minSize: 600, maxSize: 1200 }
        ];
        nebulaConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                // Place on a 3x3 grid spreading across the 15000 wrap bounds to ensure exact spacing
                const row = Math.floor(i / 3);
                const col = i % 3;
                const cellW = 15000 / 3;
                const x = (col * cellW) + (Math.random() * cellW * 0.5);
                const y = (row * cellW) + (Math.random() * cellW * 0.5);
                
                this.nebulae.push({
                    x: x,
                    y: y,
                    z: (Math.random() * zRange) - zRange / 2,
                    size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize),
                    color: ['#4400cc', '#0033aa', '#cc0066', '#330066', '#003366', '#660033'][Math.floor(Math.random() * 6)],
                    alpha: 0.15 + Math.random() * 0.3
                });
            }
        });

        // 5. Planets - 15 total, distributed across tiers with spacing
        this.planets = [];
        const planetTypes = [
            { name: 'gas-giant', colors: ['#E8C273', '#C17B3A', '#8B5A2B'], hasAtmosphere: true },
            { name: 'ice-giant', colors: ['#87CEEB', '#4682B4', '#5F9EA0'], hasAtmosphere: true },
            { name: 'terrestrial', colors: ['#228B22', '#8B4513', '#2E8B57'], hasAtmosphere: true },
            { name: 'desert', colors: ['#EDC9AF', '#D2691E', '#CD853F'], hasAtmosphere: false },
            { name: 'volcanic', colors: ['#8B0000', '#FF4500', '#DC143C'], hasAtmosphere: true },
            { name: 'ocean', colors: ['#0077BE', '#005A87', '#003F5C'], hasAtmosphere: true }
        ];
        const planetConfigs = [
            { count: 150, minDist: 0, maxDist: 10000, minRadius: 40, maxRadius: 120 },
            { count: 300, minDist: 10000, maxDist: 30000, minRadius: 80, maxRadius: 250 },
            { count: 600, minDist: 30000, maxDist: 80000, minRadius: 150, maxRadius: 400 }
        ];

        // Helper to perturb colors for variety
        const perturbColor = (hex, amount = 30) => {
            if (!hex || !hex.startsWith('#')) return hex;
            let r = parseInt(hex.slice(1, 3), 16);
            let g = parseInt(hex.slice(3, 5), 16);
            let b = parseInt(hex.slice(5, 7), 16);

            r = Math.min(255, Math.max(0, r + (Math.random() - 0.5) * amount * 2));
            g = Math.min(255, Math.max(0, g + (Math.random() - 0.5) * amount * 2));
            b = Math.min(255, Math.max(0, b + (Math.random() - 0.5) * amount * 2));

            return `#${(r | 0).toString(16).padStart(2, '0')}${(g | 0).toString(16).padStart(2, '0')}${(b | 0).toString(16).padStart(2, '0')}`;
        };

        // Helper to check if a new planet overlaps with existing ones
        const checkPlanetSpacing = (x, y, z, radius) => {
            const minSpacing = 800; // Increased spacing for "X, Y" separation (Visual Clutter reduction)
            const minZSpacing = 1000; // Z-axis separation

            for (const existing of this.planets) {
                const dx = x - existing.x;
                const dy = y - existing.y;
                const dz = z - existing.z;

                // 2D Distance Check (Screen Space Prevention)
                const dist2D = Math.sqrt(dx * dx + dy * dy);
                const required2D = radius + existing.radius + minSpacing;

                // 3D Distance Check (Physical Collision)
                const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

                // If they are too close on screen, ensure they are FAR apart in Z
                if (dist2D < required2D) {
                    if (Math.abs(dz) < minZSpacing) return false;
                }
            }
            return true;
        };

        // Planet tier-specific z-depth ranges for visual separation
        const zDepthTiers = [
            { minZ: -1000, maxZ: -400 },  // Close tier: in front
            { minZ: -400, maxZ: 400 },     // Medium tier: middle
            { minZ: 400, maxZ: 1200 }       // Far tier: behind
        ];

        planetConfigs.forEach((cfg, tierIndex) => {
            const zTier = zDepthTiers[tierIndex];
            const count = cfg.count; // Restored count so they actually appear

            for (let i = 0; i < count; i++) {
                const type = planetTypes[Math.floor(Math.random() * planetTypes.length)];
                const hasRings = Math.random() > 0.5;
                let sizeRandom = Math.random();
                let radius = cfg.minRadius + sizeRandom * (cfg.maxRadius - cfg.minRadius);

                if (sizeRandom <= 0.25) {
                    radius *= 3;
                } else if (sizeRandom <= 0.50) {
                    radius *= 2;
                }

                let x, y, z, attempts = 0;
                do {
                    const dist = Math.sqrt(Math.random() * (cfg.maxDist * cfg.maxDist - cfg.minDist * cfg.minDist) + cfg.minDist * cfg.minDist);
                    const angle = Math.random() * Math.PI * 2;
                    x = Math.cos(angle) * dist;
                    y = Math.sin(angle) * dist;
                    z = zTier.minZ + Math.random() * (zTier.maxZ - zTier.minZ);
                    attempts++;
                } while (!checkPlanetSpacing(x, y, z, radius) && attempts < 20);

                this.planets.push({
                    x: x,
                    y: y,
                    z: z, // Use the Z we calculated
                    radius: radius,
                    type: type.name,
                    // Randomize colors slightly for variety
                    baseColor: perturbColor(type.colors[0], 40),
                    secondaryColor: perturbColor(type.colors[1], 40),
                    tertiaryColor: perturbColor(type.colors[2], 40),
                    hasAtmosphere: type.hasAtmosphere,
                    atmosphereColor: type.name === 'ice-giant' ? '#ADD8E6' : (type.name === 'volcanic' ? '#FF6347' : '#87CEEB'),
                    hasRings: hasRings,
                    ringColor: hasRings ? `hsl(${Math.random() * 360}, ${40 + Math.random() * 40} %, ${50 + Math.random() * 30} %)` : null, // Full HSL/RGB variety
                    ringInnerRadius: radius * 1.3,
                    ringOuterRadius: radius * 2.2,
                    textureSeed: Math.random() * 1000,
                    rotation: Math.random() * Math.PI * 2,
                    axialTilt: (Math.random() - 0.5) * 0.6
                });
            }
        });

        // 6. Moving Cosmic Stars (shooting stars / drifting stars)
        this.shootingStars = [];
        const shootingStarCount = 15;
        for (let i = 0; i < shootingStarCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random() * (30250000 - 250000) + 250000);
            this.shootingStars.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: 1 + Math.random() * 2,
                tailLength: 20 + Math.random() * 40,
                color: ['#ffffff', '#ffffaa', '#aaffff', '#ffaaff'][Math.floor(Math.random() * 4)],
                alpha: 0.4 + Math.random() * 0.4
            });
        }
    }

    generateNebulaStyle() {
        const zRange = 3000;

        // Vastly increased counts to fill 80,000 world without modulo wrapping
        // Perfectly spaced grid for modulo wrapping (ensures no overlapping and perfect visibility)
        const nebulaConfigs = [
            { count: 9, maxDist: 10000, minSize: 800, maxSize: 1600 }
        ];
        nebulaConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                // Place on a 3x3 grid spreading across the 15000 wrap bounds to ensure exact spacing
                const row = Math.floor(i / 3);
                const col = i % 3;
                const cellW = 15000 / 3;
                const x = (col * cellW) + (Math.random() * cellW * 0.5);
                const y = (row * cellW) + (Math.random() * cellW * 0.5);
                
                this.nebulae.push({
                    x: x,
                    y: y,
                    z: (Math.random() * zRange) - zRange / 2,
                    size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize),
                    // Use dark, moody colors matching deep space
                    color: ['#4400cc', '#0033aa', '#cc0066', '#330066', '#003366', '#660033'][Math.floor(Math.random() * 6)],
                    alpha: 0.15 + Math.random() * 0.3
                });
            }
        });

        // Background stars distributed across tiers (1000 total, +25%)
        const starCount = 10000;
        for (let i = 0; i < starCount; i++) {
            const tier = Math.random();
            let dist, size;
            if (tier < 0.2) {
                dist = Math.sqrt(Math.random()) * 5000;
                size = 0.5 + Math.random() * 1.0;
            } else if (tier < 0.5) {
                dist = Math.sqrt(Math.random() * (25000*25000 - 5000*5000) + 5000*5000);
                size = 1.0 + Math.random() * 1.5;
            } else {
                dist = Math.sqrt(Math.random() * (80000*80000 - 25000*25000) + 25000*25000);
                size = 1.5 + Math.random() * 2.5;
            }
            const angle = Math.random() * Math.PI * 2;
            this.backgroundStars.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                r: size,
                alpha: 0.2 + Math.random() * 0.5
            });
        }
    }

    generateAlienStyle() {
        const zRange = 3000;

        // Green/Purple Theme (Randomized Mix)
        const theme = Math.random();
        let color1, color2;
        if (theme < 0.33) { color1 = '#00ff00'; color2 = '#ccff00'; }
        else if (theme < 0.66) { color1 = '#aa00ff'; color2 = '#ff00aa'; }
        else { color1 = '#00ffff'; color2 = '#0000ff'; }

        // Background stars distributed across zoom tiers (1800 total, +20%)
        const starCount = 1800;
        for (let i = 0; i < starCount; i++) {
            const tier = Math.random();
            let dist, size;
            if (tier < 0.2) {
                dist = Math.sqrt(Math.random()) * 5000;
                size = 0.3 + Math.random() * 0.6;
            } else if (tier < 0.5) {
                dist = Math.sqrt(Math.random() * (25000*25000 - 5000*5000) + 5000*5000);
                size = 0.5 + Math.random() * 0.8;
            } else {
                dist = Math.sqrt(Math.random() * (80000*80000 - 25000*25000) + 25000*25000);
                size = 0.7 + Math.random() * 1.2;
            }
            const angle = Math.random() * Math.PI * 2;
            this.backgroundStars.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                r: size,
                alpha: 0.1 + Math.random() * 0.4,
                color: Math.random() > 0.5 ? color1 : color2
            });
        }

        // Alien Spacecraft Fleet - distributed across zoom tiers (30 total, +50%)
        const shipClasses = [
            { name: 'scout', baseSize: 40, weight: 4 },
            { name: 'fighter', baseSize: 60, weight: 4 },
            { name: 'cruiser', baseSize: 100, weight: 2 }
        ];

        // Build weighted selection pool
        const pool = [];
        shipClasses.forEach(sc => {
            for (let w = 0; w < sc.weight; w++) pool.push(sc);
        });

        // Spacecraft configs per tier
        const craftConfigs = [
            { count: 6, minDist: 50, maxDist: 500, sizeScale: 0.4 },    // Close - small ships
            { count: 10, minDist: 500, maxDist: 2500, sizeScale: 0.7 }, // Medium
            { count: 14, minDist: 2500, maxDist: 6000, sizeScale: 1.2 } // Far - larger ships
        ];

        craftConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                const shipClass = pool[Math.floor(Math.random() * pool.length)];
                const hue = Math.random() * 360;
                const size = shipClass.baseSize * cfg.sizeScale * (0.7 + Math.random() * 0.6);
                const isScout = shipClass.name === 'scout';
                const dist = Math.sqrt(Math.random() * (cfg.maxDist * cfg.maxDist - cfg.minDist * cfg.minDist) + cfg.minDist * cfg.minDist);
                const angle = Math.random() * Math.PI * 2;

                this.spacecraft.push({
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    z: (Math.random() * zRange) - zRange / 2,
                    vx: (Math.random() - 0.5) * (isScout ? 4 : 2),
                    vy: (Math.random() - 0.5) * (isScout ? 4 : 2),
                    size: size,
                    shipClass: shipClass.name,
                    hullColor: `hsl(${hue}, ${isScout ? '30%' : '50%'}, 50%)`,
                    engineColor: `hsl(${(hue + 180) % 360}, 100%, 60%)`,
                    engineGlow: `hsl(${(hue + 180) % 360}, 100%, 85%)`,
                    shieldColor: `rgba(${Math.random()*255},${Math.random()*255},255,0.4)`,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    rotation: Math.random() * Math.PI * 2
                });
            }
        });
    }

    generateCyberStyle() {
        // Reset custom color flag so new generation allows random themes again
        this.matrixColorCustomized = false;

        // Matrix Rain Setup (Screen Space)
        this.matrixStreams = [];
        const fontSize = 14;
        const columns = Math.ceil(this.canvas.width / fontSize);

        // Base Themes
        // Top 20 Curated Cyber Colors + Rainbow Surge
        const themes = [
            { name: 'System Yellow', color: '#FFFF00', family: 'yellow' },
            { name: 'Neon Pink', color: '#FF1493', family: 'pink' },
            { name: 'Chrome Static', color: '#C0C0C0', family: 'mono' }, // Silver
            { name: 'Royal Data', color: '#4169E1', family: 'blue' }, // Royal Blue
            { name: 'Navy Blue', color: '#000080', family: 'blue' },
            { name: 'White Noise', color: '#FFFFFF', family: 'mono' },
            { name: 'Golden Key', color: '#FFD700', family: 'yellow' }, // Gold
            { name: 'Firewall Orange', color: '#FF4500', family: 'pink' },
            { name: 'Cyan Future', color: '#00FFFF', family: 'blue' },
            { name: 'Lime Access', color: '#32CD32', family: 'green' },
            { name: 'Purple Haze', color: '#800080', family: 'purple' },
            { name: 'Crimson Error', color: '#DC143C', family: 'pink' },
            { name: 'Teal Glitch', color: '#008080', family: 'green' },
            { name: 'Magenta Core', color: '#FF00FF', family: 'pink' },
            { name: 'Violet Mainframe', color: '#EE82EE', family: 'purple' },
            { name: 'Emerald Link', color: '#50C878', family: 'green' },
            { name: 'Sapphire Stream', color: '#0F52BA', family: 'blue' },
            { name: 'Ruby Firewall', color: '#E0115F', family: 'pink' },
            { name: 'Amber Alert', color: '#FFBF00', family: 'yellow' },
            { name: 'Ice Blue', color: '#A5F2F3', family: 'blue' },
            { name: 'sentAIent Blue', color: '#60A9FF', family: 'blue' },
            { name: 'Rainbow Surge', color: 'rainbow', family: 'rainbow' }
        ];

        // History Buffer Logic (Last 5 themes) + Family Check
        // Filter out ANY theme that is in the history buffer OR matches the last family
        const lastFamily = this.lastMatrixFamily || '';

        let availableThemes = themes.filter(t => !this.themeHistory.includes(t.name));

        // Try to filter by family too, but ensure we don't empty the pool
        const familyFiltered = availableThemes.filter(t => t.family !== lastFamily);
        if (familyFiltered.length > 0) {
            availableThemes = familyFiltered;
        }

        // Fallback: If we ran out of themes (unlikely), just avoid the very last one
        let pool = availableThemes;
        if (pool.length === 0) {
            const lastTheme = this.themeHistory[this.themeHistory.length - 1];
            pool = themes.filter(t => t.name !== lastTheme);
        }

        const themeIndex = Math.floor(Math.random() * pool.length);
        const theme = pool[themeIndex];

        // Update History
        this.themeHistory.push(theme.name);
        if (this.themeHistory.length > 5) {
            this.themeHistory.shift(); // Keep only last 5
        }
        this.lastMatrixFamily = theme.family; // Track family

        // Persist to LocalStorage
        try {
            localStorage.setItem('matrixThemeHistory', JSON.stringify(this.themeHistory));
            localStorage.setItem('matrixLastFamily', this.lastMatrixFamily);
        } catch (e) {
            console.warn('LocalStorage failed', e);
        }

        console.log(`[Matrix] Selected: ${theme.name} (${theme.family}), History: ${JSON.stringify(this.themeHistory)}, Pool Size: ${pool.length} `);

        this.matrixTheme = theme;

        // Discrete Speed Levels: Crawl, Slow, Normal, Fast, Hyper, Ludicrous
        const speedLevels = [
            { name: 'Slow', value: 0.1 },
            { name: 'Normal', value: 1.0 },
            { name: 'Fast', value: 2.0 },
            { name: 'Hyper', value: 4.0 },
            { name: 'Ludicrous', value: 8.0 }
        ];
        // Ensure matrix starts at a slow speed
        const selectedSpeed = speedLevels[0];
        this.matrixSpeedMultiplier = selectedSpeed.value;

        this.showToast(`Cyber Theme: ${theme.name} (Speed: ${selectedSpeed.name}) [v14]`);

        // Update UI Display
        const displayEl = document.getElementById('matrixThemeDisplay');
        if (displayEl) {
            displayEl.innerText = `Theme: ${theme.name} | Family: ${theme.family.charAt(0).toUpperCase() + theme.family.slice(1)} `;
        }

        // Sync speed slider with current value
        const slider = document.getElementById('matrixSpeedSlider');
        const sliderValue = document.getElementById('matrixSpeedValue');
        if (slider) slider.value = this.matrixSpeedMultiplier;
        if (sliderValue) sliderValue.textContent = this.matrixSpeedMultiplier.toFixed(1) + 'x';

        for (let i = 0; i < columns; i++) {
            const depth = Math.random(); // 0 to 1
            const size = Math.floor(10 + depth * 14); // 10px to 24px
            // Apply speed multiplier with per-stream variance
            const speed = (2 + depth * 8 + Math.random() * 2) * this.matrixSpeedMultiplier;

            // Massive Trails: 600 to 1500 characters (3x longer)
            const len = 600 + Math.floor(Math.random() * 9000);
            const chars = [];
            for (let j = 0; j < len; j++) {
                chars.push(String.fromCharCode(0x30A0 + Math.random() * 96));
            }

            // Handle Rainbow Theme
            let streamColor = theme.color;
            if (this.matrixColorCustomized) {
                streamColor = this.matrixColor;
            } else if (theme.name === 'Rainbow Surge') {
                // Calculate hue based on column index (i) to cycle through the spectrum
                const hue = (i * 360 / columns) % 360;
                streamColor = `hsl(${hue}, 100 %, 50 %)`; // Full saturation, mid lightness
            }

            this.matrixStreams.push({
                x: i * fontSize, // Fixed columns
                y: Math.random() * this.canvas.height, // Start FULLY VISIBLE across entire screen
                size: fontSize,
                baseSpeed: (2 + depth * 8 + Math.random() * 2) * (Math.random() * 0.5 + 0.75), // Vary speed
                chars: chars,
                color: streamColor,
                opacity: 0.9
            });
        }

        console.log(`[Matrix] Generated ${this.matrixStreams.length} streams, columns: ${columns}, theme: ${theme.name} `);
    }

    /* --- Rendering --- */

    animate(time) {
        this.frameCounter++;

        // Always update active hazard effects (like supernova) even out of flight mode
        if (this.hazardEffect) {
            this.updateHazardEffect();
        }

        // Update flight game physics (ALWAYS 60 FPS)
        if (this.flightMode) {
            try {
                // Safety Check: Avoid crashes if critical objects are missing
                if (!this.playerShip || !this.camera) return;

                // Check if any popup is open to automatically pause the physics loop
                const isPopupOpen = Array.from(document.querySelectorAll('.modal-overlay, .fullscreen-modal')).some(el => {
                    const style = window.getComputedStyle(el);
                    return style.display !== 'none' && style.pointerEvents !== 'none' && parseFloat(style.opacity) > 0;
                });

                if (!this.gamePaused && !isPopupOpen) {
                    this.checkAndGenerateSectors();
                    this.updatePlayerShip();
                    this.updateProjectiles();
                    this.updateDamageParticles();
                    this.updateMinerals();
                    this.updatePowerUps();
                    this.updateHazards();
                    this.updateSpaceBase();
                    this.updateEnemyShips();
                    this.updateEnemyBullets();
                    this.updateBoss();
                }

                // Update engine hum pitch based on both actual speed and active thrust (acceleration/RPM feel)
                const isDead = this.playerShip.hullHealth <= 0 || (this.hazardEffect && ['player_death', 'planet_impact', 'supernova', 'missile_base_destruction'].includes(this.hazardEffect.type));
                
                if (isDead) {
                    gameAudio.stopEngineHum();
                } else {
                    gameAudio.startEngineHum();
                    const actualSpeed = Math.sqrt(this.playerShip.vx*this.playerShip.vx + this.playerShip.vy*this.playerShip.vy);
                    const thrustInput = this.playerShip.currentThrust || 0;
                    gameAudio.updateEngineHum(actualSpeed, thrustInput);
                }

                if (this.activeMission && this.activeMission.type === 'survive') this.checkMissionComplete();
                if (this.activeMission && this.activeMission.type === 'collect') {
                    if (this.activeMission.baselineInventory === undefined) {
                        this.activeMission.baselineInventory = Object.values(this.playerInventory).reduce((a, b) => a + b, 0);
                    }
                    const totalNow = Object.values(this.playerInventory).reduce((a, b) => a + b, 0);
                    const delta = totalNow - this.activeMission.baselineInventory;
                    if (this.activeMission.progress !== delta) {
                        this.activeMission.progress = Math.max(0, delta);
                        this.updateMissionHUD();
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
                        this.showToast('🔥 Flare Recharged (Passive)');
                    }
                }
            } catch (e) {
                console.error('[Engine] Flight loop error:', e.message);
            }
        }

        // Update spacecraft positions & behaviors (Combat participation)
        if (this.spacecraft && this.spacecraft.length > 0) {
            const range = this.worldSize;
            const half = range / 2;
            
            const time = performance.now() / 1000;
            const driftX = Math.sin(time / 5000) * 20;
            const driftY = Math.cos(time / 7000) * 20;
            
            const backgroundParallax = 0.98;
            const zoomParallax = 0.3;
            const pZoom = 1 + (this.camera.zoom - 1) * zoomParallax;

            this.spacecraft.forEach(s => {
                s.x += s.vx;
                s.y += s.vy;
                // Wrap around world bounds
                if (s.x > half) s.x = -half;
                if (s.x < -half) s.x = half;
                if (s.y > half) s.y = -half;
                if (s.y < -half) s.y = half;

                // Firing/Combat behavior
                if (this.flightMode && !this.gamePaused && !s.flownOut) {
                    if (s.health === undefined) {
                        s.health = s.shipClass === 'mothership' ? 250 : (s.shipClass === 'destroyer' ? 120 : (s.shipClass === 'cruiser' ? 80 : 40));
                        s.maxHealth = s.health;
                        s.fireTimer = Math.random() * 200;
                    }

                    const scScreenX = this.canvas.width / 2 + (s.x - this.playerShip.x * backgroundParallax - driftX) * pZoom;
                    const scScreenY = this.canvas.height / 2 + (s.y - this.playerShip.y * backgroundParallax - driftY) * pZoom;

                    if (scScreenX >= -100 && scScreenX <= this.canvas.width + 100 &&
                        scScreenY >= -100 && scScreenY <= this.canvas.height + 100) {
                        
                        s.fireTimer++;
                        const fireInterval = s.shipClass === 'mothership' ? 180 : (s.shipClass === 'scout' ? 90 : 120);
                        if (s.fireTimer >= fireInterval) {
                            s.fireTimer = 0;

                            const worldX = this.playerShip.x + (scScreenX - this.canvas.width / 2) / this.camera.zoom;
                            const worldY = this.playerShip.y + (scScreenY - this.canvas.height / 2) / this.camera.zoom;

                            const angle = Math.atan2(this.playerShip.y - worldY, this.playerShip.x - worldX);
                            const bulletSpeed = 5 + Math.random() * 3;
                            
                            this.enemyBullets.push({
                                x: worldX + Math.cos(angle) * (s.size * 0.5),
                                y: worldY + Math.sin(angle) * (s.size * 0.5),
                                vx: Math.cos(angle) * bulletSpeed,
                                vy: Math.sin(angle) * bulletSpeed,
                                rotation: angle,
                                damage: s.shipClass === 'mothership' ? 12 : 5,
                                life: 120,
                                color: s.engineColor || '#00ff88',
                                width: 3,
                                length: 20
                            });
                            gameAudio.playEnemyLaser();
                        }
                    }
                }
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
                    if (typeof s.vx !== 'number') s.vx = (Math.random() - 0.5) * 1.5;
                    if (typeof s.vy !== 'number') s.vy = (Math.random() - 0.5) * 1.5;
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
                        // Drift: Multi-layered parallax drift speed (visible & smooth)
                        const playerVx = this.playerShip ? (this.playerShip.vx || 0) : 0;
                        const playerVy = this.playerShip ? (this.playerShip.vy || 0) : 0;
                        
                        const parallaxFactor = 0.01 * (s.depth || 0.5);
                        
                        s.x += s.vx - playerVx * parallaxFactor;
                        s.y += s.vy - playerVy * parallaxFactor;

                        s.twinklePhase = (s.twinklePhase || 0) + (s.twinkleSpeed || 0.03);

                        // Wrap around screen
                        if (s.x < -w) s.x += w * 2;
                        if (s.x > w * 3) s.x -= w * 2;
                        if (s.y < -h) s.y += h * 2;
                        if (s.y > h * 3) s.y -= h * 2;
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
                        const dirX = dx / Math.max(0.1, dist);
                        const dirY = dy / Math.max(0.1, dist);

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
            this.draw(time);
        } catch (e) {
            console.error('FATAL RENDER ERROR:', e);
            if (this.showToast) this.showToast("⚠️ FATAL ENGINE ERROR: " + e.message, 10000);
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

    draw(rawTime) {
        const { ctx, canvas } = this;
        // Safety: Ensure time is ALWAYS a valid number to prevent NaN in sin/cos calculations
        const time = typeof rawTime === 'number' ? rawTime : performance.now();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        if (this.shakeDuration > 0) {
            const magnitude = this.shakeMagnitude || 5;
            const dx = (Math.random() - 0.5) * magnitude;
            const dy = (Math.random() - 0.5) * magnitude;
            ctx.translate(dx, dy);
            this.shakeDuration--;
        }

        ctx.fillStyle = this.config.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Static Background Stars (Screen Space)
        if (this.config.showBackground) {
            const paraX = this.camera.x * 0.05;
            const paraY = this.camera.y * 0.05;

            try {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
                const time = performance.now() / 1000;

                // STAR WARS HYPERTUNNEL GLOW (Swirling neon blue rings removed for realism)

                this.staticStars.forEach(s => {
                    // Safety check for required properties
                    if (typeof s.x !== 'number' || typeof s.y !== 'number') return;

                    // Ensure we have valid values
                    const parallaxDepth = s.depth || 1;
                    let sx = (s.x + paraX * parallaxDepth) % canvas.width;
                    let sy = (s.y + paraY * parallaxDepth) % canvas.height;
                    if (sx < 0) sx += canvas.width;
                    if (sy < 0) sy += canvas.height;

                    // Ensure we have valid values
                    const vx = typeof s.vx === 'number' ? s.vx : 0;
                    const vy = typeof s.vy === 'number' ? s.vy : 0;
                    const size = s.r || s.size || 1; // Use 'r' if available (matches generation)
                    const starColor = s.color || '#ffffff';

                    if (this.bgWarpMode && !this.bgDriftMode) {
                        // ====== STAR WARS LIGHTSPEED JUMP STREAKS ======
                        const dx = sx - centerX;
                        const dy = sy - centerY;
                        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

                        if (distFromCenter < 3) return;

                        const warpIntensity = this.warpSpeed || 0;
                        const sliderValue = this.warpSpeedMultiplier || 1;

                        const perspFactor = distFromCenter / maxDist;
                        const depthFactor = s.depth || 0.5;
                        
                        const lengthFactor = Math.sqrt(sliderValue) * 16 * depthFactor;
                        const streakLength = 5 + lengthFactor * (2 + perspFactor * 24) * (warpIntensity / 8);
                        
                        // CRITICAL FIX: NEVER let the tail cross the black hole at the center (10px radius)
                        const cappedStreak = Math.min(streakLength, distFromCenter - 10);

                        const dirOutX = dx / Math.max(0.1, distFromCenter);
                        const dirOutY = dy / Math.max(0.1, distFromCenter);

                        const headX = sx;
                        const headY = sy;
                        const tailX = sx - dirOutX * cappedStreak;
                        const tailY = sy - dirOutY * cappedStreak;

                        const baseAlpha = s.alpha || 0.2;
                        const intensityBoost = Math.min(0.5, warpIntensity * 0.2);
                        const alpha = Math.min(0.85, baseAlpha + intensityBoost);
                        ctx.globalAlpha = alpha;

                        if (cappedStreak > 2) {
                            try {
                                const baseWidth = Math.max(0.5, size * 0.4 + warpIntensity * 0.02);

                                // Extract RGB from hex to create dynamic glowing tails
                                let r = 255, g = 255, b = 255;
                                if (starColor.startsWith('#')) {
                                    const hex = starColor.replace('#', '');
                                    if (hex.length === 6) {
                                        r = parseInt(hex.substring(0, 2), 16);
                                        g = parseInt(hex.substring(2, 4), 16);
                                        b = parseInt(hex.substring(4, 6), 16);
                                    }
                                }

                                const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
                                // Faded tail at the black hole
                                grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
                                // Brightest at the head
                                const brightR = Math.min(255, r + 80);
                                const brightG = Math.min(255, g + 80);
                                const brightB = Math.min(255, b + 80);
                                grad.addColorStop(1, `rgba(${brightR}, ${brightG}, ${brightB}, 0.9)`);

                                ctx.strokeStyle = grad;
                                ctx.lineWidth = baseWidth * (1 + perspFactor * 0.5);
                                ctx.lineCap = "round";
                                ctx.beginPath();
                                ctx.moveTo(tailX, tailY);
                                ctx.lineTo(headX, headY);
                                ctx.stroke();

                                if (cappedStreak > 15) {
                                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
                                    ctx.lineWidth = baseWidth * 0.4;
                                    ctx.beginPath();
                                    ctx.moveTo(tailX, tailY);
                                    ctx.lineTo(headX, headY);
                                    ctx.stroke();
                                }
                            } catch (e) {
                                ctx.strokeStyle = 'rgba(200, 240, 255, 0.8)';
                                ctx.lineWidth = size;
                                ctx.beginPath();
                                ctx.moveTo(tailX, tailY);
                                ctx.lineTo(headX, headY);
                                ctx.stroke();
                            }
                        }
                    } else {
                        // Twinkle effect for normal and drift modes
                        s.twinklePhase = (s.twinklePhase || 0) + (s.twinkleSpeed || 0.03);
                        const twinkle = Math.sin(s.twinklePhase) * 0.15;
                        const finalAlpha = Math.min(1.0, Math.max(0.1, (s.baseAlpha || s.alpha || 0.5) + twinkle));
                        const finalSize = Math.max(0.2, size + twinkle * 0.4);

                        ctx.globalAlpha = finalAlpha;
                        ctx.fillStyle = starColor;
                        ctx.beginPath();
                        ctx.arc(sx, sy, finalSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            } catch (renderError) {
                console.error('[BG Error] Star rendering failed:', renderError);
            }

            // Draw a tiny black circle at the vanishing point to represent a black hole or point of origin
            if (this.bgWarpMode && !this.bgDriftMode) {
                ctx.globalAlpha = 1.0;
                ctx.fillStyle = '#000000';
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
                ctx.fill();
            }

            // ====== SHOOTING STARS (Normal mode only) ======
            if (!this.bgWarpMode && !this.bgDriftMode) {
                const now = performance.now();

                // Spawn new shooting star every 2-6 seconds
                if (now - this.lastShootingStarTime > 2000 + Math.random() * 4000) {
                    this.lastShootingStarTime = now;
                    const colors = this.starColors || ['#ffffff', '#aaddff', '#ffddaa'];

                    // Start from random edge
                    const edge = Math.floor(Math.random() * 4);
                    let startX, startY, angle;

                    if (edge === 0) { // Top
                        startX = Math.random() * canvas.width;
                        startY = -10;
                        angle = Math.PI * 0.25 + Math.random() * Math.PI * 0.5;
                    } else if (edge === 1) { // Right
                        startX = canvas.width + 10;
                        startY = Math.random() * canvas.height;
                        angle = Math.PI * 0.75 + Math.random() * Math.PI * 0.5;
                    } else if (edge === 2) { // Bottom
                        startX = Math.random() * canvas.width;
                        startY = canvas.height + 10;
                        angle = -Math.PI * 0.25 - Math.random() * Math.PI * 0.5;
                    } else { // Left
                        startX = -10;
                        startY = Math.random() * canvas.height;
                        angle = -Math.PI * 0.25 + Math.random() * Math.PI * 0.5;
                    }

                    this.shootingStarsActive.push({
                        x: startX,
                        y: startY,
                        vx: Math.cos(angle) * (8 + Math.random() * 12),
                        vy: Math.sin(angle) * (8 + Math.random() * 12),
                        size: 1.5 + Math.random() * 1.5,
                        tailLength: 30 + Math.random() * 50,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        life: 1.0
                    });
                }

                // Update and draw shooting stars
                this.shootingStarsActive = this.shootingStarsActive.filter(star => {
                    star.x += star.vx;
                    star.y += star.vy;
                    star.life -= 0.01;

                    if (star.life <= 0 || star.x < -100 || star.x > canvas.width + 100 ||
                        star.y < -100 || star.y > canvas.height + 100) {
                        return false; // Remove
                    }

                    // Draw shooting star with cool gradient streak
                    const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
                    const dirX = -star.vx / speed;
                    const dirY = -star.vy / speed;
                    const tailX = star.x + dirX * star.tailLength;
                    const tailY = star.y + dirY * star.tailLength;

                    const grad = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
                    grad.addColorStop(0, '#ffffff');
                    grad.addColorStop(0.2, star.color);
                    grad.addColorStop(1, 'transparent');

                    ctx.globalAlpha = star.life;
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = star.size * 0.5;
                    ctx.lineCap = 'butt';
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY);
                    ctx.lineTo(star.x, star.y);
                    ctx.stroke();

                    return true; // Keep
                });
            }

            ctx.globalAlpha = 1.0;


        }

        // 0. Draw Background Layers with Parallax (DECOUPLED FROM WORLD TRANSFORM)
        // Backgrounds (galaxies, nebulae, faint stars) should move slower than the player
        // and zoom less intensely to create a sense of vast distance.
        const backgroundParallax = 0.98; // 0.98 means moves at 2% of player speed (near static)
        const zoomParallax = 0.3; // 1.0 = full zoom, 0.0 = no zoom effect on backgrounds
        const pZoom = 1 + (this.camera.zoom - 1) * zoomParallax;
        // Always draw background stars and nebulae if they exist
        // (Must be drawn BEFORE any context translation, as drawBackgroundElements calculates its own parallax)
        this.drawBackgroundElements();

        ctx.save();
        // Background Field Centering: Always relative to screen center
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(pZoom, pZoom);

        // Apply parallax translation based on SHIP position
        // backgroundParallax (0.98) means it moves at 98% of world speed.
        const driftX = Math.sin(time / 5000) * 20;
        const driftY = Math.cos(time / 7000) * 20;
        ctx.translate(
            -(this.playerShip.x * backgroundParallax + driftX),
            -(this.playerShip.y * backgroundParallax + driftY)
        );

        ctx.restore();

        // World Transform (For interactive game objects)
        ctx.save();
        ctx.translate(canvas.width / 2 + this.camera.x, canvas.height / 2 + this.camera.y);
        ctx.scale(this.camera.zoom, this.camera.zoom);

        // Draw deep space specific elements (galaxies, black holes, planets) in world space
        if (this.activeStyles.has('deep-space')) this.drawDeepSpaceSpecific();

        // Calculations & Cluster ID Assignment
        const { lines, clusters } = this.refreshClusterAssignments();

        // 1. Draw Grid Lines (Glow Pass + Core Pass) with 3D rotation
        if (lines.length > 0) {
            ctx.lineCap = 'round';
            ctx.shadowBlur = 10;

            // Rotation center - use cached if available (during star placement)
            const center = this._cachedRotationCenter || this.getConstellationCenter();
            const rotCenterX = center.x;
            const rotCenterY = center.y;
            const rotCenterZ = center.z || 0;

            lines.forEach(l => {
                const alpha = Math.max(0, 1 - (l.dist / this.config.maxConnectDist));
                const starColor = this.getStarColor(l.s1);
                const [r, g, b] = this.hexToRgb(starColor);

                // Apply 3D rotation
                const s1z = l.s1.z || 0;
                const s2z = l.s2.z || 0;
                const p1 = this.rotate3D(l.s1.x, l.s1.y, s1z, rotCenterX, rotCenterY);
                const p2 = this.rotate3D(l.s2.x, l.s2.y, s2z, rotCenterX, rotCenterY);

                ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
                ctx.lineWidth = 3 / this.camera.zoom;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            });
            ctx.shadowBlur = 0;

            lines.forEach(l => {
                const alpha = Math.max(0, 1 - (l.dist / this.config.maxConnectDist));
                const starColor = this.getStarColor(l.s1);

                // Apply 3D rotation
                const s1z = l.s1.z || 0;
                const s2z = l.s2.z || 0;
                const p1 = this.rotate3D(l.s1.x, l.s1.y, s1z, rotCenterX, rotCenterY);
                const p2 = this.rotate3D(l.s2.x, l.s2.y, s2z, rotCenterX, rotCenterY);

                ctx.strokeStyle = starColor;
                ctx.globalAlpha = alpha * 0.8;
                ctx.lineWidth = 1 / this.camera.zoom;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            });
            ctx.globalAlpha = 1.0;
        }

        // 6. Draw Text Labels
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 ${14 / this.camera.zoom}px 'Exo 2'`;

        clusters.forEach(c => {
            // Only draw names for clusters that meet the minimum size threshold AND have a generated name
            const name = String(c[0].clusterId);
            if (c.length < this.config.minGroupSize || name === String(c[0].id)) return;

            // Centroid Calculation
            let cx = 0, cy = 0;
            c.forEach(s => { cx += s.x; cy += s.y; });
            cx /= c.length; cy /= c.length;

            const avgColor = this.getStarColor(c[0]);

            // Draw Text Label
            ctx.fillStyle = avgColor;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 4;
            ctx.fillText(name, cx, cy + (30 / this.camera.zoom));
            ctx.shadowBlur = 0;
        });

        // 7. Draw Stars with 3D rotation
        const timeNow = performance.now();
        // Use cached rotation center if available (during star placement), otherwise calculate
        const center = this._cachedRotationCenter || this.getConstellationCenter();
        const rotCenterX = center.x;
        const rotCenterY = center.y;
        // Note: we just pass centerX/Y as pivot, Z pivot is implicitly handled by rotate3D logic relative to 0? 
        // Wait, rotate3D logic (let pz = z) rotates AROUND (centerX, centerY, 0).
        // If the constellation center has Z != 0, we should translate Z too?
        // Ideally: let pz = z - (center.z || 0);
        // Let's rely on the definition where we pass Z.

        this.stars.forEach(s => {
            if (s.flownOut) return; // Skip if flown out during warp

            ctx.save();

            // Apply disengage warp values
            let wScale = 1.0;
            let wAlpha = 1.0;
            if (this.warpDisengaging && s.warpScale !== undefined) {
                wScale = s.warpScale;
                wAlpha = s.warpAlpha !== undefined ? s.warpAlpha : 1.0;
            }

            const isHover = (s === this.hoveredStar);

            // Apply 3D rotation
            const sz = s.z || 0;
            const rotated = this.rotate3D(s.x, s.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            const twinkle = Math.sin(timeNow * 0.003 + s.phase) * 0.2 + 0.8;
            const scale = isHover ? 1.5 : 1.0;
            const radius = this.config.starBaseRad * twinkle * scale * rScale * wScale / this.camera.zoom;
            const starColor = this.getStarColor(s);
            const [r, g, b] = this.hexToRgb(starColor);

            // Apply transparency
            ctx.globalAlpha = wAlpha;

            // Draw Glow
            const glowRad = Math.max(0.1, radius * 6); // Ensure positive radius
            const grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, glowRad);
            grad.addColorStop(0, `rgba(255, 255, 255, ${isHover ? 0.9 : 0.6})`);
            grad.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.3)`);
            grad.addColorStop(1, "rgba(0,0,0,0)");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(rx, ry, glowRad, 0, Math.PI * 2);
            ctx.fill();

            // Draw Core (Star Shape)
            ctx.fillStyle = starColor;
            this.drawStarShape(ctx, rx, ry, radius);

            ctx.restore();
        });

        // Update HUD
        const statEl = document.getElementById('stats');
        const constellationCount = clusters.filter(c => c.length >= this.config.minGroupSize).length;
        if (statEl) statEl.innerText = `Mode: ${this.mode.charAt(0).toUpperCase() + this.mode.slice(1)} | Stars: ${this.stars.length} | Constellations: ${constellationCount} | Zoom: ${this.camera.zoom.toFixed(2)} x`;

        // Draw player ship if in flight mode
        // Draw player ship if in flight mode
        if (this.flightMode && this.playerShip) {
            // console.log('[Spacecraft Debug] Rendering player ship at', this.playerShip.x, this.playerShip.y);
            this.renderSpeedLines(ctx);
            this.renderMinerals(ctx, time);
            this.renderTutorialWaypoints(ctx); // Render tutorial waypoints in world space
            this.renderHazards(ctx, time);  // Space mines and black holes
            this.renderProjectiles(ctx);
            // Render Engine Exhaust
            if (this.engineParticles && this.engineParticles.length > 0) {
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                for (const p of this.engineParticles) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color + p.life + ')';
                    ctx.fill();
                }
                ctx.restore();
            }

            // Damage Effects (Under ship? Or over? Over looks better for smoke)
            this.renderPlayerShip(ctx, time);
            this.renderDamageEffects(ctx);
            this.renderCollectionNotifications(ctx);

            // HUD Overlays (Absolute Screen Space)
            this.renderTutorialHUDIndicator(ctx);
        }

        ctx.restore(); // Close World Transform (Started at 8918)

        if (this.gamePaused) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = (this.playerShip && this.playerShip.color) ? this.playerShip.color : '#ffcc00';
            ctx.font = 'bold 48px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
            ctx.restore();
        }

        // Welcome overlay renders on top of everything, regardless of flight mode
        this.renderWelcomeOverlay(ctx);

        // HAZARD EFFECTS RENDER OUTSIDE FLIGHT MODE CHECK
        // This ensures nuclear explosions, black holes etc. always display
        // even when player state changes during the effect

        // --- MOVED: Cyber Matrix Rain (Screen Space Overlay) ---
        // Rendered HERE to ensure it overlays all 3D elements and backgrounds
        if (this.activeStyles.has('cyber') && this.matrixStreams) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Force screen space

            ctx.textAlign = 'center';
            const speedMult = this.matrixSpeedMultiplier || 1.0;
            const lengthMult = this.matrixLengthMultiplier || 1.0;

            // Apply angle transform
            if (this.matrixAngle !== 0) {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((this.matrixAngle * Math.PI) / 180);
                ctx.translate(-canvas.width / 2, -canvas.height / 2);
            }

            // Base visible length: 20 chars at 1x, slider scales from ~4 to ~60 chars
            const baseVisibleLength = 20;
            const rainbowHueOffset = Date.now() * 0.1; // Animate rainbow hue

            this.matrixStreams.forEach((stream, streamIndex) => {
                // Update with real-time speed multiplier
                stream.y += stream.baseSpeed * speedMult;

                // Calculate visible length based on slider (independent of array size)
                const visibleLength = Math.max(3, Math.floor(baseVisibleLength * lengthMult));

                if (stream.y - (visibleLength * stream.size) > canvas.height * 1.5) {
                    stream.y = -stream.size * visibleLength; // Reset
                }

                // Draw
                ctx.font = `${stream.size}px monospace, 'Courier New', monospace`;
                ctx.textBaseline = 'middle';

                // Only draw visible characters based on length multiplier
                for (let i = 0; i < visibleLength && i < stream.chars.length; i++) {
                    const char = stream.chars[i];
                    const charY = stream.y - (i * stream.size);
                    if (charY < -stream.size * 2 || charY > canvas.height * 1.5) continue;

                    // Improved visibility: Fade out only near the end of the tail
                    const relativePos = 1 - (i / visibleLength);
                    const alpha = Math.pow(relativePos, 0.5) * stream.opacity;

                    ctx.globalAlpha = alpha;

                    // Rainbow mode: cycle through HSL colors
                    if (this.matrixRainbowMode) {
                        const hue = (rainbowHueOffset + streamIndex * 15 + i * 5) % 360;
                        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
                    } else {
                        ctx.fillStyle = stream.color;
                    }
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = stream.color;

                    ctx.fillText(char, stream.x, charY);
                }
            });

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1.0;
            ctx.restore();
        }
        this.renderHazardEffect(ctx, time);

        // --- RENDER PULSE PING (Expanding Ring in World) ---
        if (this.activePulsePing) {
            const now = Date.now();
            const elapsed = now - this.activePulsePing.startTime;
            if (elapsed < this.activePulsePing.duration) {
                const progress = elapsed / this.activePulsePing.duration;
                const radius = progress * (this.activePulsePing.maxRadius || 3000);

                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.translate(canvas.width / 2, canvas.height / 2);

                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - progress})`;
                ctx.lineWidth = 5 * (1 - progress);
                ctx.beginPath();
                ctx.arc(0, 0, radius * this.camera.zoom, 0, Math.PI * 2);
                ctx.stroke();

                // Outer glow
                ctx.lineWidth = 15 * (1 - progress);
                ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - progress) * 0.3})`;
                ctx.stroke();

                ctx.restore();
            } else {
                this.activePulsePing = null;
            }
        }
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
            case 'valkyrie': this.drawValkyrie(ctx, size, shipColor, pitchScale, time); break;
            case 'leviathan': this.drawLeviathan(ctx, size, shipColor, pitchScale, time); break;
            case 'wraith': this.drawWraith(ctx, size, shipColor, pitchScale, time); break;
            case 'pulsar': this.drawPulsar(ctx, size, shipColor, pitchScale, time); break;
            case 'nomad': this.drawNomad(ctx, size, shipColor, pitchScale, time); break;
            case 'eclipse': this.drawEclipse(ctx, size, shipColor, pitchScale, time); break;
            case 'hyperion': this.drawHyperion(ctx, size, shipColor, pitchScale, time); break;
            case 'archangel': this.drawArchangel(ctx, size, shipColor, pitchScale, time); break;
            default:
                this.drawInterceptor(ctx, size, shipColor, pitchScale);
                break;
        }

        ctx.restore();
    }

    drawInterceptor(ctx, size, shipColor, pitchScale, time = performance.now()) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        
        const pulse = Math.sin(time * 0.008) * 0.3 + 0.7;
        
        // Sleek manta-ray wings
        ctx.fillStyle = '#181822';
        ctx.strokeStyle = '#334';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(size * 1.8, 0); // nose
        ctx.quadraticCurveTo(size * 0.2, size * 0.8, -size * 0.5, size * 1.5); // wingtip
        ctx.quadraticCurveTo(-size * 0.2, size * 0.4, -size * 0.8, 0); // tail indent
        ctx.quadraticCurveTo(-size * 0.2, -size * 0.4, -size * 0.5, -size * 1.5);
        ctx.quadraticCurveTo(size * 0.2, -size * 0.8, size * 1.8, 0);
        ctx.fill();
        ctx.stroke();

        // Internal glowing veins
        ctx.shadowColor = shipColor;
        ctx.shadowBlur = 10 * pulse;
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-size * 0.6, 0);
        ctx.lineTo(size * 0.8, 0);
        ctx.moveTo(-size * 0.2, 0);
        ctx.quadraticCurveTo(0, size * 0.5, -size * 0.3, size * 1.2);
        ctx.moveTo(-size * 0.2, 0);
        ctx.quadraticCurveTo(0, -size * 0.5, -size * 0.3, -size * 1.2);
        ctx.stroke();

        // Cockpit/Sensor eye
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 20 * pulse;
        ctx.beginPath();
        ctx.ellipse(size * 1.0, 0, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Muzzle Flash
        if (this.playerShip && this.playerShip.muzzleFlash) {
            this.drawMuzzleFlash(ctx, 0, size * 0.8, size * 0.6, '#00ff00', this.playerShip.muzzleFlash);
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
    drawViper(ctx, size, shipColor, pitchScale, time = performance.now()) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const pulse = Math.sin(time * 0.005) * 0.5 + 0.5;

        // Heavy Carapace
        ctx.fillStyle = '#221111';
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(size * 1.2, size * 0.3); // right mandible
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.lineTo(-size * 0.8, size * 1.2); // wing
        ctx.lineTo(-size * 1.2, size * 0.8);
        ctx.lineTo(-size * 0.8, 0); // rear
        ctx.lineTo(-size * 1.2, -size * 0.8);
        ctx.lineTo(-size * 0.8, -size * 1.2);
        ctx.lineTo(size * 0.4, -size * 0.4);
        ctx.lineTo(size * 1.2, -size * 0.3); // left mandible
        ctx.lineTo(size * 0.6, 0); // inner mouth
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Core Energy
        ctx.fillStyle = shipColor;
        ctx.shadowColor = shipColor;
        ctx.shadowBlur = 15;
        ctx.globalAlpha = 0.8 + 0.2 * pulse;
        ctx.beginPath();
        ctx.arc(-size * 0.2, 0, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Armor plating lines
        ctx.strokeStyle = '#442222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-size * 0.8, 0);
        ctx.lineTo(size * 0.6, 0);
        ctx.moveTo(-size * 0.4, size * 0.6);
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.moveTo(-size * 0.4, -size * 0.6);
        ctx.lineTo(size * 0.4, -size * 0.4);
        ctx.stroke();

        // Muzzle Flash
        if (this.playerShip && this.playerShip.muzzleFlash) {
            this.drawMuzzleFlash(ctx, 0, size * 0.8, size * 0.6, '#00ff00', this.playerShip.muzzleFlash);
        }
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

    drawValkyrie(ctx, size, shipColor, pitchScale, time) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        
        // Base Hull Gradient
        const grad = ctx.createLinearGradient(-size, 0, size * 1.5, 0);
        grad.addColorStop(0, this.adjustColor(shipColor, -50));
        grad.addColorStop(0.5, shipColor);
        grad.addColorStop(1, '#ffffff');

        // Main Body
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(size * 1.8, 0);
        ctx.lineTo(size * 0.5, -size * 0.4);
        ctx.lineTo(-size * 1.2, -size * 0.8);
        ctx.lineTo(-size * 0.8, -size * 0.2);
        ctx.lineTo(-size * 1.2, 0);
        ctx.lineTo(-size * 0.8, size * 0.2);
        ctx.lineTo(-size * 1.2, size * 0.8);
        ctx.lineTo(size * 0.5, size * 0.4);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.moveTo(size * 0.8, 0);
        ctx.lineTo(size * 0.2, -size * 0.15);
        ctx.lineTo(size * 0.2, size * 0.15);
        ctx.closePath();
        ctx.fill();

        // Engines
        this.drawEngineFlame(ctx, -size * 1.0, -size * 0.4, size * 0.6, '#00ffff', time || Date.now());
        this.drawEngineFlame(ctx, -size * 1.0, size * 0.4, size * 0.6, '#00ffff', time || Date.now());

        ctx.restore();
    }

    drawLeviathan(ctx, size, shipColor, pitchScale, time) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        ctx.fillStyle = this.adjustColor(shipColor, -20);
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 2;

        // Blocky Hull
        ctx.beginPath();
        ctx.rect(-size * 1.5, -size * 0.8, size * 2.8, size * 1.6);
        ctx.fill();
        ctx.stroke();

        // Forward Armor Plating
        ctx.fillStyle = '#444';
        ctx.beginPath();
        ctx.moveTo(size * 1.3, -size * 0.6);
        ctx.lineTo(size * 1.8, -size * 0.3);
        ctx.lineTo(size * 1.8, size * 0.3);
        ctx.lineTo(size * 1.3, size * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Engines
        this.drawEngineFlame(ctx, -size * 1.5, -size * 0.5, size * 0.8, '#ff3300', time || Date.now());
        this.drawEngineFlame(ctx, -size * 1.5, size * 0.5, size * 0.8, '#ff3300', time || Date.now());

        ctx.restore();
    }

    drawWraith(ctx, size, shipColor, pitchScale, time) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);

        ctx.fillStyle = '#111';
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 1;
        ctx.shadowColor = shipColor;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(size * 1.5, 0);
        ctx.lineTo(-size, -size);
        ctx.lineTo(-size * 0.5, 0);
        ctx.lineTo(-size, size);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Red micro thrusters
        this.drawEngineFlame(ctx, -size * 0.8, -size * 0.8, size * 0.4, '#ff0000', time || Date.now());
        this.drawEngineFlame(ctx, -size * 0.8, size * 0.8, size * 0.4, '#ff0000', time || Date.now());

        ctx.restore();
    }

    drawPulsar(ctx, size, shipColor, pitchScale, time) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);

        // Energy Ring
        const ringGlow = Math.sin((time || Date.now()) * 0.005) * 5 + 10;
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 4;
        ctx.shadowColor = shipColor;
        ctx.shadowBlur = ringGlow;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Nacelles
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.rect(-size * 1.2, -size * 1.2, size * 2.4, size * 0.4);
        ctx.rect(-size * 1.2, size * 0.8, size * 2.4, size * 0.4);
        ctx.fill();

        // Engines
        this.drawEngineFlame(ctx, -size * 1.2, -size * 1.0, size * 0.5, shipColor, time || Date.now());
        this.drawEngineFlame(ctx, -size * 1.2, size * 1.0, size * 0.5, shipColor, time || Date.now());

        ctx.restore();
    }

    drawNomad(ctx, size, shipColor, pitchScale, time) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        ctx.fillStyle = shipColor;

        // Central Pod
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Outriggers
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.5);
        ctx.lineTo(0, -size * 1.2);
        ctx.moveTo(0, size * 0.5);
        ctx.lineTo(0, size * 1.2);
        ctx.stroke();

        ctx.fillStyle = '#666';
        ctx.beginPath();
        ctx.arc(0, -size * 1.2, size * 0.3, 0, Math.PI * 2);
        ctx.arc(0, size * 1.2, size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Engine
        this.drawEngineFlame(ctx, -size, 0, size * 0.6, '#00aaff', time || Date.now());
        ctx.restore();
    }

    drawEclipse(ctx, size, shipColor, pitchScale, time) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.2);
        grad.addColorStop(0, '#222');
        grad.addColorStop(1, shipColor);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.2, Math.PI * 0.2, Math.PI * 1.8);
        ctx.quadraticCurveTo(-size, 0, 0, size * 1.2);
        ctx.fill();

        // Neon Strips
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.8, Math.PI * 0.3, Math.PI * 1.7);
        ctx.stroke();
        ctx.shadowBlur = 0;

        this.drawEngineFlame(ctx, -size * 0.5, 0, size * 0.7, '#00ffff', time || Date.now());
        ctx.restore();
    }

    drawHyperion(ctx, size, shipColor, pitchScale, time) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        ctx.fillStyle = this.adjustColor(shipColor, -30);
        
        ctx.beginPath();
        ctx.moveTo(size * 1.5, 0);
        ctx.lineTo(size * 0.8, -size * 1.2);
        ctx.lineTo(-size * 1.2, -size * 1.2);
        ctx.lineTo(-size * 0.5, -size * 0.5);
        ctx.lineTo(-size * 1.2, 0);
        ctx.lineTo(-size * 0.5, size * 0.5);
        ctx.lineTo(-size * 1.2, size * 1.2);
        ctx.lineTo(size * 0.8, size * 1.2);
        ctx.closePath();
        ctx.fill();

        // Launch Bays
        ctx.fillStyle = '#000';
        ctx.fillRect(-size * 0.2, -size * 0.8, size * 0.8, size * 0.3);
        ctx.fillRect(-size * 0.2, size * 0.5, size * 0.8, size * 0.3);

        this.drawEngineFlame(ctx, -size * 1.2, -size * 0.9, size * 0.5, '#ffaa00', time || Date.now());
        this.drawEngineFlame(ctx, -size * 1.2, size * 0.9, size * 0.5, '#ffaa00', time || Date.now());
        this.drawEngineFlame(ctx, -size * 1.2, 0, size * 0.6, '#ffaa00', time || Date.now());

        ctx.restore();
    }

    drawArchangel(ctx, size, shipColor, pitchScale, time) {
        ctx.save();
        ctx.scale(1, pitchScale || 1);

        // Base hull
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(size * 1.8, 0);
        ctx.lineTo(-size * 0.5, -size * 0.3);
        ctx.lineTo(-size * 0.5, size * 0.3);
        ctx.closePath();
        ctx.fill();

        // Hard-light wings
        const wingGlow = 10 + Math.sin((time || Date.now()) * 0.005) * 5;
        ctx.strokeStyle = shipColor;
        ctx.lineWidth = 4;
        ctx.shadowColor = shipColor;
        ctx.shadowBlur = wingGlow;
        ctx.beginPath();
        ctx.moveTo(size * 0.5, 0);
        ctx.quadraticCurveTo(-size * 0.5, -size * 2, -size * 1.5, -size * 1.5);
        ctx.moveTo(size * 0.5, 0);
        ctx.quadraticCurveTo(-size * 0.5, size * 2, -size * 1.5, size * 1.5);
        ctx.stroke();
        ctx.shadowBlur = 0;

        this.drawEngineFlame(ctx, -size * 0.5, 0, size * 0.8, shipColor, time || Date.now());
        ctx.restore();
    }

    // === ALIEN SHIPS ===


    drawAlienScythe(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        ctx.fillStyle = '#111'; ctx.strokeStyle = glowColor; ctx.lineWidth = 2;
        ctx.shadowColor = glowColor; ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(size * 1.5, 0);
        ctx.quadraticCurveTo(size * 0.5, size * 0.8, -size * 1.2, size * 1.5);
        ctx.lineTo(-size * 0.8, 0);
        ctx.lineTo(-size * 1.2, -size * 1.5);
        ctx.quadraticCurveTo(size * 0.5, -size * 0.8, size * 1.5, 0);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = glowColor; ctx.beginPath();
        ctx.arc(size * 0.2, 0, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    drawObsidianShard(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        ctx.fillStyle = '#050505'; ctx.strokeStyle = glowColor; ctx.lineWidth = 1.5;
        const pulse = Math.sin(time * 0.01) * 0.2 + 0.8;
        ctx.shadowColor = glowColor; ctx.shadowBlur = 15 * pulse;
        ctx.beginPath(); ctx.moveTo(size * 1.8, 0); ctx.lineTo(0, size * 0.6);
        ctx.lineTo(-size * 1.2, 0); ctx.lineTo(0, -size * 0.6); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = glowColor; ctx.beginPath(); ctx.moveTo(size * 0.8, 0);
        ctx.lineTo(0, size * 0.2); ctx.lineTo(-size * 0.5, 0); ctx.lineTo(0, -size * 0.2);
        ctx.closePath(); ctx.fill();
        ctx.restore();
    }

    drawVoidStalker(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        ctx.fillStyle = 'rgba(10, 10, 10, 0.8)'; ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(size * 1.6, 0); ctx.lineTo(-size * 1.2, size * 0.4);
        ctx.lineTo(-size * 0.8, 0); ctx.lineTo(-size * 1.2, -size * 0.4); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ff0000'; ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 15;
        const blink = Math.random() > 0.95 ? 0.2 : 1; ctx.globalAlpha = blink;
        ctx.beginPath(); ctx.arc(size * 0.8, 0, size * 0.15, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    drawNebulaPhantom(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        const grad = ctx.createLinearGradient(size, 0, -size, 0);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); grad.addColorStop(0.5, glowColor); grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad; ctx.shadowColor = glowColor; ctx.shadowBlur = 25;
        const wave = Math.sin(time * 0.005) * size * 0.2;
        ctx.beginPath(); ctx.moveTo(size * 1.5, 0);
        ctx.bezierCurveTo(size * 0.5, size + wave, -size * 0.5, size * 0.5 - wave, -size * 1.5, size * 0.8);
        ctx.quadraticCurveTo(-size, 0, -size * 1.5, -size * 0.8);
        ctx.bezierCurveTo(-size * 0.5, -size * 0.5 + wave, size * 0.5, -size - wave, size * 1.5, 0);
        ctx.fill();
        ctx.restore();
    }

    drawNewScout(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        const pulse = Math.sin(time * 0.008) * 0.3 + 0.7;
        
        // Sleek manta-ray wings
        ctx.fillStyle = '#181822';
        ctx.strokeStyle = '#334';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(size * 1.8, 0); // nose
        ctx.quadraticCurveTo(size * 0.2, size * 0.8, -size * 0.5, size * 1.5); // wingtip
        ctx.quadraticCurveTo(-size * 0.2, size * 0.4, -size * 0.8, 0); // tail indent
        ctx.quadraticCurveTo(-size * 0.2, -size * 0.4, -size * 0.5, -size * 1.5);
        ctx.quadraticCurveTo(size * 0.2, -size * 0.8, size * 1.8, 0);
        ctx.fill();
        ctx.stroke();

        // Internal glowing veins
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10 * pulse;
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-size * 0.6, 0);
        ctx.lineTo(size * 0.8, 0);
        ctx.moveTo(-size * 0.2, 0);
        ctx.quadraticCurveTo(0, size * 0.5, -size * 0.3, size * 1.2);
        ctx.moveTo(-size * 0.2, 0);
        ctx.quadraticCurveTo(0, -size * 0.5, -size * 0.3, -size * 1.2);
        ctx.stroke();

        // Cockpit/Sensor eye
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 20 * pulse;
        ctx.beginPath();
        ctx.ellipse(size * 1.0, 0, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawNewFighter(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        const pulse = Math.sin(time * 0.005) * 0.5 + 0.5;

        // Heavy Carapace
        ctx.fillStyle = '#221111';
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(size * 1.2, size * 0.3); // right mandible
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.lineTo(-size * 0.8, size * 1.2); // wing
        ctx.lineTo(-size * 1.2, size * 0.8);
        ctx.lineTo(-size * 0.8, 0); // rear
        ctx.lineTo(-size * 1.2, -size * 0.8);
        ctx.lineTo(-size * 0.8, -size * 1.2);
        ctx.lineTo(size * 0.4, -size * 0.4);
        ctx.lineTo(size * 1.2, -size * 0.3); // left mandible
        ctx.lineTo(size * 0.6, 0); // inner mouth
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Core Energy
        ctx.fillStyle = glowColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 15;
        ctx.globalAlpha = 0.8 + 0.2 * pulse;
        ctx.beginPath();
        ctx.arc(-size * 0.2, 0, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Armor plating lines
        ctx.strokeStyle = '#442222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-size * 0.8, 0);
        ctx.lineTo(size * 0.6, 0);
        ctx.moveTo(-size * 0.4, size * 0.6);
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.moveTo(-size * 0.4, -size * 0.6);
        ctx.lineTo(size * 0.4, -size * 0.4);
        ctx.stroke();

        ctx.restore();
    }

    drawNewCruiser(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        
        // Central Monolith Core
        ctx.fillStyle = '#0a0a0a';
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(size * 1.6, 0);
        ctx.lineTo(size * 0.8, size * 0.6);
        ctx.lineTo(-size * 1.4, size * 0.6);
        ctx.lineTo(-size * 1.4, -size * 0.6);
        ctx.lineTo(size * 0.8, -size * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Floating Ring / Field Generators
        ctx.save();
        ctx.rotate(time * 0.002);
        ctx.strokeStyle = `rgba(0, 255, 255, 0.4)`;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.4, 0, Math.PI * 2);
        ctx.stroke();
        
        // Nodes on the ring
        for(let i=0; i<3; i++) {
            let angle = (i/3) * Math.PI * 2;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * size * 1.4, Math.sin(angle) * size * 1.4, size * 0.15, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Side Pontoons/Engines
        ctx.fillStyle = '#111';
        ctx.fillRect(-size * 1.2, size * 0.7, size * 1.8, size * 0.4);
        ctx.fillRect(-size * 1.2, -size * 1.1, size * 1.8, size * 0.4);
        
        ctx.strokeStyle = '#333';
        ctx.strokeRect(-size * 1.2, size * 0.7, size * 1.8, size * 0.4);
        ctx.strokeRect(-size * 1.2, -size * 1.1, size * 1.8, size * 0.4);

        // Energy ports
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 15;
        ctx.fillRect(-size * 1.0, size * 0.8, size * 0.4, size * 0.2);
        ctx.fillRect(-size * 1.0, -size * 1.0, size * 0.4, size * 0.2);

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

        // --- 6.6. POWER-UPS ---
        const safeZoomPU = Math.max(0.01, this.camera ? this.camera.zoom : 1);
        const viewHalfW_PU = (this.canvas.width / safeZoomPU) / 2 + 100;
        const viewHalfH_PU = (this.canvas.height / safeZoomPU) / 2 + 100;
        const camX_PU = (this.camera && typeof this.camera.x === 'number') ? (-this.camera.x / safeZoomPU) : this.playerShip.x;
        const camY_PU = (this.camera && typeof this.camera.y === 'number') ? (-this.camera.y / safeZoomPU) : this.playerShip.y;
            
        this.powerUps.forEach(pu => {
            if (Math.abs(pu.x - camX_PU) > viewHalfW_PU || Math.abs(pu.y - camY_PU) > viewHalfH_PU) return;

            ctx.save();
            ctx.translate(pu.x, pu.y);

            const pulse = Math.sin(time * 0.005 + pu.phase) * 0.2 + 0.8;
            const size = pu.size * pulse / safeZoomPU;

            let color = '#fff';
            let icon = '?';
            if (pu.type === 'shield_boost') { color = '#00ffff'; icon = '🛡️'; }
            if (pu.type === 'hull_repair') { color = '#00ff00'; icon = '🔧'; }
            if (pu.type === 'weapon_overdrive') { color = '#ff8800'; icon = '⚔️'; }
            if (pu.type === 'speed_boost') { color = '#ffff00'; icon = '🚀'; }

            // Glow effect
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
            gradient.addColorStop(0, color);
            gradient.addColorStop(0.5, color + '88');
            gradient.addColorStop(1, color + '00');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.font = `${15/safeZoomPU}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(icon, 0, 0);
            
            ctx.restore();
        });
    }

    // =====================================================
    // HAZARD RENDERING - Visual effects for mines & holes
    // =====================================================

    renderHazards(ctx, time) {
        const center = this._cachedRotationCenter || this.getConstellationCenter();
        const rotCenterX = center.x;
        const rotCenterY = center.y;

        // Render Asteroids removed
        // Render distress beacons
        if (this.distressBeacons) {
            this.distressBeacons.forEach(beacon => {
                if (!beacon.active) return;
                const rotated = this.rotate3D(beacon.x, beacon.y, 0, rotCenterX, rotCenterY);
                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                const safeZoom = Math.max(0.01, this.camera.zoom || 1);
                const size = 25 * rotated.scale / safeZoom;
                
                // Pulsing yellow beacon
                const pulse = Math.sin(time * 0.005) * 0.5 + 0.5;
                ctx.fillStyle = `rgba(255, 200, 0, ${0.4 + pulse * 0.6})`;
                ctx.shadowColor = '#ffcc00';
                ctx.shadowBlur = 15;
                
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();
                
                // Inner core
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            });
        }

        // Render space mines - OMINOUS ADVANCED TECHNOLOGY DESIGN
        this.spaceMines.forEach(mine => {
            if (mine.flownOut) return;

            // Hit Flash Logic
            if (mine.hitFlash > 0) {
                mine.hitFlash--;
                const sz = mine.z || 0;
                const rotated = this.rotate3D(mine.x, mine.y, sz, rotCenterX, rotCenterY);

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                const safeZoom = Math.max(0.01, this.camera.zoom || 1);
                const size = (mine.size || mine.radius || 30) * rotated.scale / safeZoom;

                if (size > 0) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 20;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
                return;
            }

            const sz = mine.z || 0;
            const rotated = this.rotate3D(mine.x, mine.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            ctx.save();
            ctx.translate(rx, ry);

            const safeZoom = Math.max(0.01, this.camera.zoom || 1);
            const pulse = Math.sin(time * 0.003 + (mine.pulsePhase || mine.pulseOffset || 0)) * 0.15 + 0.85;
            const size = (mine.size || mine.radius || 30) * pulse * rScale / safeZoom;

            if (size <= 0) {
                ctx.restore();
                return;
            }

            // OUTER ELECTROMAGNETIC FIELD (pulsing energy barrier)
            const emPulse = (Math.sin(time * 0.006) + 1) * 0.5;
            for (let ring = 0; ring < 3; ring++) {
                const ringRadius = size * (3.5 + ring * 0.8);
                const ringAlpha = (0.3 - ring * 0.08) * emPulse;
                const ringPhase = time * 0.002 + ring * Math.PI / 3;

                ctx.strokeStyle = `rgba(255, 50, 20, ${ringAlpha})`;
                ctx.lineWidth = (4 - ring) / safeZoom;
                ctx.setLineDash([(10 + ring * 5), (5 + ring * 3)]);
                ctx.lineDashOffset = -time * 0.1 * (ring + 1);
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, ringPhase, ringPhase + Math.PI * 1.8);
                ctx.stroke();
            }
            ctx.setLineDash([]);

            // DANGER AURA (deep red-orange warning glow)
            const dangerPulse = Math.sin(time * 0.008) * 0.4 + 0.6;
            const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 4.5);
            auraGrad.addColorStop(0, `rgba(255, 60, 0, ${0.9 * dangerPulse})`);
            auraGrad.addColorStop(0.2, `rgba(200, 30, 0, ${0.6 * dangerPulse})`);
            auraGrad.addColorStop(0.4, `rgba(150, 0, 0, ${0.3 * dangerPulse})`);
            auraGrad.addColorStop(0.7, `rgba(80, 0, 20, ${0.15 * dangerPulse})`);
            auraGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = auraGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 4.5, 0, Math.PI * 2);
            ctx.fill();

            // ADVANCED TECH OUTER SHELL (hexagonal with rotating segments)
            ctx.save();
            ctx.rotate(time * 0.0008 + (mine.rotation || 0));

            // Outer hexagonal casing
            ctx.fillStyle = '#1a0a0a';
            ctx.strokeStyle = '#660000';
            ctx.lineWidth = 3 / safeZoom;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * size * 1.8;
                const y = Math.sin(angle) * size * 1.8;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Inner rotating triangular segments (tech panels)
            for (let i = 0; i < 6; i++) {
                const segAngle = (i / 6) * Math.PI * 2 + time * 0.001;
                const segPulse = Math.sin(time * 0.01 + i) * 0.2 + 0.8;

                ctx.fillStyle = `rgba(80, 20, 10, ${segPulse})`;
                ctx.beginPath();
                const innerR = size * 0.9;
                const outerR = size * 1.5;
                ctx.moveTo(Math.cos(segAngle) * innerR, Math.sin(segAngle) * innerR);
                ctx.lineTo(Math.cos(segAngle + 0.3) * outerR, Math.sin(segAngle + 0.3) * outerR);
                ctx.lineTo(Math.cos(segAngle + 0.52) * innerR, Math.sin(segAngle + 0.52) * innerR);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();

            // ENERGY SPIKES (radiating outward, threatening appearance)
            const spikeCount = 12;
            for (let i = 0; i < spikeCount; i++) {
                const spikeAngle = (i / spikeCount) * Math.PI * 2 + time * 0.0005;
                const spikePulse = Math.sin(time * 0.008 + i * 0.5) * 0.4 + 0.8;
                const spikeLen = size * (1.2 + spikePulse * 0.8);

                const grad = ctx.createLinearGradient(
                    Math.cos(spikeAngle) * size * 0.6,
                    Math.sin(spikeAngle) * size * 0.6,
                    Math.cos(spikeAngle) * spikeLen,
                    Math.sin(spikeAngle) * spikeLen
                );
                grad.addColorStop(0, 'rgba(255, 150, 50, 0.9)');
                grad.addColorStop(0.5, 'rgba(255, 80, 0, 0.7)');
                grad.addColorStop(1, 'rgba(255, 30, 0, 0.2)');

                ctx.strokeStyle = grad;
                ctx.lineWidth = (4 - i % 2 * 2) / safeZoom;
                ctx.beginPath();
                ctx.moveTo(Math.cos(spikeAngle) * size * 0.6, Math.sin(spikeAngle) * size * 0.6);
                ctx.lineTo(Math.cos(spikeAngle) * spikeLen, Math.sin(spikeAngle) * spikeLen);
                ctx.stroke();
            }

            // REACTOR CORE (pulsing plasma center)
            const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8);
            coreGrad.addColorStop(0, '#ffffff');
            coreGrad.addColorStop(0.15, '#ffffaa');
            coreGrad.addColorStop(0.3, '#ffcc00');
            coreGrad.addColorStop(0.5, '#ff6600');
            coreGrad.addColorStop(0.75, '#cc2200');
            coreGrad.addColorStop(1, '#440000');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
            ctx.fill();

            // INNER PLASMA SWIRL (nuclear reaction visual)
            ctx.save();
            ctx.rotate(-time * 0.003);
            ctx.globalCompositeOperation = 'screen';
            for (let arm = 0; arm < 3; arm++) {
                const armAngle = (arm / 3) * Math.PI * 2;
                const armGrad = ctx.createRadialGradient(
                    Math.cos(armAngle) * size * 0.2,
                    Math.sin(armAngle) * size * 0.2,
                    0,
                    0, 0, size * 0.5
                );
                armGrad.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
                armGrad.addColorStop(0.5, 'rgba(255, 200, 50, 0.4)');
                armGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = armGrad;
                ctx.beginPath();
                ctx.arc(Math.cos(armAngle) * size * 0.2, Math.sin(armAngle) * size * 0.2, size * 0.4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();

            // RADIATION WARNING SYMBOL (trilateral hazard indicator)
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3 / safeZoom;
            ctx.fillStyle = '#ffcc00';

            // Draw 3 radiation sectors
            for (let i = 0; i < 3; i++) {
                const sectAngle = (i / 3) * Math.PI * 2 - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, size * 0.35, sectAngle - 0.4, sectAngle + 0.4);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            // Center dot
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
            ctx.fill();

            // TECH DESIGNATION TEXT (military/sci-fi look)
            ctx.font = `bold ${Math.max(8, 12 / safeZoom)}px monospace`;
            ctx.fillStyle = 'rgba(255, 100, 50, 0.8)';
            ctx.textAlign = 'center';
            ctx.fillText('⚠ XN-7', 0, -size * 2.2);

            ctx.restore();
        });

        // Render hazard black holes - DYNAMIC CENTER WITH FOLDING LIGHT
        this.hazardBlackHoles.forEach(bh => {
            if (bh.flownOut) return;

            const sz = bh.z || 0;
            const rotated = this.rotate3D(bh.x, bh.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            ctx.save();
            ctx.translate(rx, ry);

            const safeZoom = Math.max(0.01, this.camera.zoom || 1);
            const size = (bh.size || 100) * rScale / safeZoom;

            if (size <= 0) {
                ctx.restore();
                return;
            }

            // OUTER GRAVITATIONAL DISTORTION (light being warped)
            const distortGrad = ctx.createRadialGradient(0, 0, size * 0.3, 0, 0, size * 2);
            distortGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
            distortGrad.addColorStop(0.3, 'rgba(20, 0, 40, 0.7)');
            distortGrad.addColorStop(0.6, 'rgba(40, 10, 80, 0.3)');
            distortGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = distortGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
            ctx.fill();

            // LIGHT TENDRILS BEING PULLED IN (dynamic folding effect)
            ctx.globalCompositeOperation = 'screen';
            for (let tendril = 0; tendril < 16; tendril++) {
                const baseAngle = (tendril / 16) * Math.PI * 2;
                // Spiral effect - light curves inward
                const spiralOffset = Math.sin(time * 0.003 + tendril * 0.5) * 0.5;
                const startAngle = baseAngle + spiralOffset;
                const endAngle = baseAngle + Math.PI * 0.3 + spiralOffset * 2;

                const outerR = size * (1.0 + Math.sin(time * 0.004 + tendril) * 0.2);
                const innerR = size * 0.35;

                const tendrilAlpha = 0.4 + Math.sin(time * 0.005 + tendril * 0.8) * 0.2;
                const hue = 200 + Math.sin(time * 0.002 + tendril) * 40;

                // Draw curved light being pulled toward center
                ctx.beginPath();
                ctx.moveTo(Math.cos(startAngle) * outerR, Math.sin(startAngle) * outerR);

                // Bezier curve simulating gravitational bending
                const ctrl1X = Math.cos(startAngle + 0.2) * outerR * 0.7;
                const ctrl1Y = Math.sin(startAngle + 0.2) * outerR * 0.7;
                const ctrl2X = Math.cos(endAngle - 0.3) * innerR * 1.5;
                const ctrl2Y = Math.sin(endAngle - 0.3) * innerR * 1.5;

                ctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y,
                    Math.cos(endAngle) * innerR, Math.sin(endAngle) * innerR);

                const lineGrad = ctx.createLinearGradient(
                    Math.cos(startAngle) * outerR, Math.sin(startAngle) * outerR,
                    Math.cos(endAngle) * innerR, Math.sin(endAngle) * innerR
                );
                lineGrad.addColorStop(0, `hsla(${hue}, 80%, 70%, ${tendrilAlpha * 0.3})`);
                lineGrad.addColorStop(0.5, `hsla(${hue + 20}, 90%, 60%, ${tendrilAlpha})`);
                lineGrad.addColorStop(1, `hsla(${hue + 40}, 100%, 80%, ${tendrilAlpha * 0.8})`);

                ctx.strokeStyle = lineGrad;
                ctx.lineWidth = (3 + Math.sin(time * 0.008 + tendril) * 2) / safeZoom;
                ctx.stroke();
            }
            ctx.globalCompositeOperation = 'source-over';

            // ACCRETION DISK (enhanced spinning particles)
            ctx.globalCompositeOperation = 'screen';
            bh.particleRings.forEach(p => {
                // Particles accelerate as they get closer (Keplerian motion)
                const accelFactor = 1 + (1 - p.radius) * 2;
                p.angle += p.speed * accelFactor;
                const r = size * p.radius;
                const x = Math.cos(p.angle) * r;
                const y = Math.sin(p.angle) * r * 0.3; // Elliptical orbit

                // Doppler shifting - particles approaching are bluer, receding are redder
                const dopplerShift = Math.cos(p.angle) * 30;
                const particleHue = p.hue + dopplerShift;

                ctx.fillStyle = `hsla(${particleHue}, 100%, ${55 + p.brightness * 25}%, ${p.brightness * 0.9})`;
                ctx.beginPath();
                ctx.arc(x, y, (4 + p.brightness * 2) / safeZoom, 0, Math.PI * 2);
                ctx.fill();

                // Particle trail
                const trailLen = 3 + p.brightness * 2;
                for (let trail = 1; trail <= trailLen; trail++) {
                    const trailAngle = p.angle - trail * p.speed * 3;
                    const trailX = Math.cos(trailAngle) * r;
                    const trailY = Math.sin(trailAngle) * r * 0.3;
                    const trailAlpha = p.brightness * (1 - trail / trailLen) * 0.5;

                    ctx.fillStyle = `hsla(${particleHue}, 100%, 60%, ${trailAlpha})`;
                    ctx.beginPath();
                    ctx.arc(trailX, trailY, (2 + p.brightness) / safeZoom, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            ctx.globalCompositeOperation = 'source-over';

            // EVENT HORIZON (absolute black center)
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.38, 0, Math.PI * 2);
            ctx.fill();

            // DYNAMIC FOLDING CENTER LIGHT (the key improvement)
            ctx.globalCompositeOperation = 'screen';

            // Pulsating core glow that contracts rhythmically
            const corePulse = 0.7 + Math.sin(time * 0.006) * 0.15 + Math.sin(time * 0.011) * 0.1;
            const coreSize = size * 0.32 * corePulse;

            // Spiraling light rays being sucked inward
            for (let ray = 0; ray < 12; ray++) {
                const rayAngle = (ray / 12) * Math.PI * 2 + time * 0.004;
                const raySpeed = time * 0.008 + ray * 0.3;

                // Light folds in on itself - oscillating inward motion
                const foldPhase = (Math.sin(raySpeed) + 1) * 0.5;
                const rayOuterR = coreSize * (0.8 + foldPhase * 0.4);
                const rayInnerR = coreSize * (0.2 + (1 - foldPhase) * 0.3);

                const rayAlpha = 0.5 + Math.sin(time * 0.007 + ray) * 0.3;
                const rayHue = 180 + ray * 5 + Math.sin(time * 0.003) * 20;

                const rayGrad = ctx.createLinearGradient(
                    Math.cos(rayAngle) * rayOuterR, Math.sin(rayAngle) * rayOuterR,
                    Math.cos(rayAngle) * rayInnerR, Math.sin(rayAngle) * rayInnerR
                );
                rayGrad.addColorStop(0, `hsla(${rayHue}, 70%, 80%, ${rayAlpha * 0.2})`);
                rayGrad.addColorStop(0.4, `hsla(${rayHue + 30}, 80%, 70%, ${rayAlpha})`);
                rayGrad.addColorStop(1, `hsla(${rayHue + 60}, 100%, 95%, ${rayAlpha * 1.2})`);

                ctx.strokeStyle = rayGrad;
                ctx.lineWidth = (2 + Math.sin(time * 0.01 + ray * 0.5) * 1.5) / safeZoom;
                ctx.beginPath();
                ctx.moveTo(Math.cos(rayAngle) * rayOuterR, Math.sin(rayAngle) * rayOuterR);
                ctx.lineTo(Math.cos(rayAngle) * rayInnerR, Math.sin(rayAngle) * rayInnerR);
                ctx.stroke();
            }

            // Central pulsing singularity glow
            const singularityPulse = 0.6 + Math.sin(time * 0.008) * 0.2 + Math.cos(time * 0.013) * 0.15;
            const singularityGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreSize * 0.5);
            singularityGrad.addColorStop(0, `rgba(255, 255, 255, ${singularityPulse})`);
            singularityGrad.addColorStop(0.3, `rgba(180, 220, 255, ${singularityPulse * 0.7})`);
            singularityGrad.addColorStop(0.6, `rgba(100, 150, 255, ${singularityPulse * 0.4})`);
            singularityGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = singularityGrad;
            ctx.beginPath();
            ctx.arc(0, 0, coreSize * 0.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalCompositeOperation = 'source-over';

            // Gravitational lensing ring (photon sphere)
            const lensAlpha = 0.4 + Math.sin(time * 0.005) * 0.15;
            ctx.strokeStyle = `rgba(150, 200, 255, ${lensAlpha})`;
            ctx.lineWidth = 3 / safeZoom;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.52, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();
        });

        // === RENDER MISSILE BASES ===
        this.missileBases.forEach(base => {
            if (base.flownOut) return;
            const sz = base.z || 0;
            const rotated = this.rotate3D(base.x, base.y, sz, rotCenterX, rotCenterY);

            this.drawMissileBase(ctx, base, time, false, 0, rotated.x, rotated.y, rotated.scale);
        });

        // === RENDER HEAT-SEEKING MISSILES ===
        this.enemyMissiles.forEach(missile => {
            if (missile.flownOut) return;

            const sz = missile.z || 0;
            const rotated = this.rotate3D(missile.x, missile.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            ctx.save();

            const safeZoom = Math.max(0.01, this.camera.zoom || 1);

            // Render trail first (behind missile)
            if (missile.trail) {
                missile.trail.forEach(p => {
                    const trailSZ = p.z || 0;
                    const trailRot = this.rotate3D(p.x, p.y, trailSZ, rotCenterX, rotCenterY);
                    const trailAlpha = (p.life / 20) * 0.8;
                    const trailSize = p.size * trailRot.scale / safeZoom;
                    
                    if (!Number.isFinite(trailRot.x) || !Number.isFinite(trailRot.y) || !Number.isFinite(trailSize) || trailSize <= 0) return;

                    const trailGrad = ctx.createRadialGradient(trailRot.x, trailRot.y, 0, trailRot.x, trailRot.y, trailSize);
                    trailGrad.addColorStop(0, `rgba(255, 150, 50, ${trailAlpha})`);
                    trailGrad.addColorStop(0.5, `rgba(255, 80, 0, ${trailAlpha * 0.5})`);
                    trailGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = trailGrad;
                    ctx.beginPath();
                    ctx.arc(trailRot.x, trailRot.y, trailSize, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            ctx.translate(rx, ry);
            ctx.rotate(missile.angle);

            const size = (missile.size || 5) * rScale / safeZoom;
            if (size <= 0) {
                ctx.restore();
                return;
            }
            const lifeRatio = missile.life / missile.maxLife;

            // Missile body
            ctx.fillStyle = '#888899';
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(-size, -size * 0.4);
            ctx.lineTo(-size * 0.5, 0);
            ctx.lineTo(-size, size * 0.4);
            ctx.closePath();
            ctx.fill();

            // Red tip (heat-seeking sensor)
            ctx.fillStyle = '#ff3333';
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(size, -size * 0.25);
            ctx.lineTo(size, size * 0.25);
            ctx.closePath();
            ctx.fill();

            // Fins
            ctx.fillStyle = '#666677';
            // Top fin
            ctx.beginPath();
            ctx.moveTo(-size * 0.8, -size * 0.4);
            ctx.lineTo(-size * 1.2, -size * 0.8);
            ctx.lineTo(-size * 0.3, -size * 0.4);
            ctx.closePath();
            ctx.fill();
            // Bottom fin
            ctx.beginPath();
            ctx.moveTo(-size * 0.8, size * 0.4);
            ctx.lineTo(-size * 1.2, size * 0.8);
            ctx.lineTo(-size * 0.3, size * 0.4);
            ctx.closePath();
            ctx.fill();

            // Engine flame
            const flameFlicker = 0.7 + Math.random() * 0.3;
            const flameGrad = ctx.createLinearGradient(-size, 0, -size * 2.5 * flameFlicker, 0);
            flameGrad.addColorStop(0, `rgba(255, 255, 200, ${lifeRatio})`);
            flameGrad.addColorStop(0.3, `rgba(255, 150, 50, ${lifeRatio * 0.8})`);
            flameGrad.addColorStop(0.6, `rgba(255, 50, 0, ${lifeRatio * 0.5})`);
            flameGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = flameGrad;
            ctx.beginPath();
            ctx.moveTo(-size * 0.5, 0);
            ctx.lineTo(-size, -size * 0.3 * flameFlicker);
            ctx.lineTo(-size * 2.5 * flameFlicker, 0);
            ctx.lineTo(-size, size * 0.3 * flameFlicker);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        });

        // === RENDER DECOY FLARES ===
        this.decoyFlares.forEach(flare => {
            const sz = flare.z || 0;
            const rotated = this.rotate3D(flare.x, flare.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            const safeZoom = Math.max(0.01, this.camera.zoom || 1);
            const size = (8 + Math.random() * 4) * rScale / safeZoom;
            
            if (size <= 0) return;
            const alpha = Math.min(1, flare.life / 30);

            if (!Number.isFinite(rx) || !Number.isFinite(ry) || !Number.isFinite(size) || size <= 0) return;

            // Inner core
            ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
            ctx.beginPath();
            ctx.arc(rx, ry, size * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Outer glow
            const glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, size * 2);
            glow.addColorStop(0, `rgba(255, 150, 50, ${alpha * 0.8})`);
            glow.addColorStop(0.5, `rgba(255, 80, 0, ${alpha * 0.4})`);
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(rx, ry, size * 2, 0, Math.PI * 2);
            ctx.fill();
        });

        // === RENDER ENEMY SHIPS ===
        this.enemyShips.forEach(enemy => {
            const typeDef = InterstellarEngine.ENEMY_TYPES[enemy.type];
            const sz = enemy.z || 0;
            const rotated = this.rotate3D(enemy.x, enemy.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            if (!Number.isFinite(rx) || !Number.isFinite(ry) || !Number.isFinite(rScale) || rScale <= 0) return; ctx.save();
            const safeZoom = Math.max(0.01, this.camera.zoom || 1);
            const size = typeDef.size * rScale / safeZoom;

            if (size <= 0) {
                ctx.restore();
                return;
            }

            ctx.translate(rx, ry);
            ctx.rotate(enemy.rotation);

            // === Faction Visuals ===
            const factionTypes = {
                xenon: { color: '#ff0000', glowColor: 'rgba(255, 0, 0, 0.6)' },
                mauler: { color: '#ffaa00', glowColor: 'rgba(255, 170, 0, 0.6)' },
                terran: { color: '#0088ff', glowColor: 'rgba(0, 136, 255, 0.6)' }
            };
            const activeColor = (enemy.faction && factionTypes[enemy.faction]) ? factionTypes[enemy.faction].color : typeDef.color;
            const activeGlow = (enemy.faction && factionTypes[enemy.faction]) ? factionTypes[enemy.faction].glowColor : typeDef.glowColor;

            // Hit flash effect
            const baseColor = enemy.hitFlash > 0 ? '#ffffff' : activeColor;

            // Engine glow
            const glowSize = size * 1.5;
            if (!Number.isFinite(glowSize) || glowSize <= 0) {
                ctx.restore();
                return;
            }
            const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
            glow.addColorStop(0, activeGlow);
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
            ctx.fill();

            switch (enemy.type) {
                case 'scout': this.drawNewScout(ctx, size, baseColor, activeGlow, Date.now()); break;
                case 'fighter': this.drawNewFighter(ctx, size, baseColor, activeGlow, Date.now()); break;
                case 'cruiser': this.drawNewCruiser(ctx, size, baseColor, activeGlow, Date.now()); break;
                case 'phantom': this.drawNewScout(ctx, size * 1.5, baseColor, activeGlow, Date.now()); break;
                case 'scythe': this.drawAlienScythe(ctx, size, baseColor, activeGlow, Date.now()); break;
                case 'shard': this.drawObsidianShard(ctx, size, baseColor, activeGlow, Date.now()); break;
                case 'stalker': this.drawVoidStalker(ctx, size, baseColor, activeGlow, Date.now()); break;
                case 'phantom_legacy': this.drawNebulaPhantom(ctx, size, baseColor, activeGlow, Date.now()); break;
                default:
                    // Ship body — aggressive triangle
                    ctx.fillStyle = baseColor;
                    ctx.shadowColor = activeColor;
                    ctx.shadowBlur = 15;
                    ctx.beginPath();
                    ctx.moveTo(size * 1.5, 0);           // Nose
                    ctx.lineTo(-size, -size * 0.8);       // Top wing
                    ctx.lineTo(-size * 0.4, 0);           // Indent
                    ctx.lineTo(-size, size * 0.8);        // Bottom wing
                    ctx.closePath();
                    ctx.fill();
                    ctx.shadowBlur = 0;

                    // Cockpit stripe
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.beginPath();
                    ctx.moveTo(size * 0.8, 0);
                    ctx.lineTo(size * 0.2, -size * 0.15);
                    ctx.lineTo(size * 0.2, size * 0.15);
                    ctx.closePath();
                    ctx.fill();

                    // Engine flame
                    const flameLen = (0.5 + Math.random() * 0.4) * size;
                    ctx.fillStyle = `rgba(255, 150, 50, 0.8)`;
                    ctx.beginPath();
                    ctx.moveTo(-size * 0.4, -size * 0.15);
                    ctx.lineTo(-size * 0.4 - flameLen, 0);
                    ctx.lineTo(-size * 0.4, size * 0.15);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }

            ctx.restore();

            // Health bar (above ship, not rotated with ship)
            if (enemy.health < enemy.maxHealth) {
                const barWidth = size * 3;
                const barHeight = 4 / safeZoom;
                const barX = rx - barWidth / 2;
                const barY = ry - size * 2.5;
                const healthRatio = enemy.health / enemy.maxHealth;

                // Background
                ctx.fillStyle = 'rgba(0,0,0,0.6)';
                ctx.fillRect(barX, barY, barWidth, barHeight);
                // Health fill
                const barColor = healthRatio > 0.5 ? '#00ff44' : healthRatio > 0.25 ? '#ffaa00' : '#ff2222';
                ctx.fillStyle = barColor;
                ctx.fillRect(barX, barY, barWidth * healthRatio, barHeight);
                // Border
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.strokeRect(barX, barY, barWidth, barHeight);
            }

            // State indicator (tiny dot above health bar)
            const indicatorY = ry - size * 3;
            ctx.fillStyle = enemy.state === 'attack' ? '#ff0000' :
                enemy.state === 'chase' ? '#ffaa00' :
                    enemy.state === 'flee' ? '#00ffff' : '#44ff44';
            ctx.beginPath();
            ctx.arc(rx, indicatorY, 3 / safeZoom, 0, Math.PI * 2);
            ctx.fill();
        });

        // === RENDER ENEMY BULLETS ===
        this.enemyBullets.forEach(b => {
            const sz = b.z || 0;
            const rotated = this.rotate3D(b.x, b.y, sz, rotCenterX, rotCenterY);
            const rScale = rotated.scale;
            if (!Number.isFinite(rotated.x) || !Number.isFinite(rotated.y) || !Number.isFinite(rScale) || rScale <= 0) return;
            const safeZoom = Math.max(0.01, this.camera.zoom || 1);

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            ctx.rotate(b.rotation);

            const len = b.length * rotated.scale / safeZoom;
            const w = b.width * rotated.scale / safeZoom;

            // Glow
            ctx.shadowColor = b.color;
            ctx.shadowBlur = 10;
            // Bolt
            ctx.strokeStyle = b.color;
            ctx.lineWidth = w;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(-len / 2, 0);
            ctx.lineTo(len / 2, 0);
            ctx.stroke();
            // Core
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = w * 0.4;
            ctx.beginPath();
            ctx.moveTo(-len / 2, 0);
            ctx.lineTo(len / 2, 0);
            ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.restore();
        });

        // === RENDER BOSS ===
        if (this.activeBoss) {
            const boss = this.activeBoss;
            const typeDef = InterstellarEngine.BOSS_TYPES[boss.type];
            const sz = boss.z || 0;
            const rotated = this.rotate3D(boss.x, boss.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            if (!Number.isFinite(rx) || !Number.isFinite(ry) || !Number.isFinite(rScale) || rScale <= 0) return; ctx.save();
            const safeZoom = Math.max(0.01, this.camera.zoom || 1);
            const size = typeDef.size * rScale / safeZoom;
            
            if (size <= 0) {
                ctx.restore();
                return;
            }
            const baseColor = boss.hitFlash > 0 ? '#ffffff' : typeDef.color;

            ctx.translate(rx, ry);
            ctx.rotate(boss.rotation);

            // Boss aura / glow
            const auraSize = size * 2.5;
            const aura = ctx.createRadialGradient(0, 0, size * 0.5, 0, 0, auraSize);
            aura.addColorStop(0, typeDef.glowColor);
            aura.addColorStop(0.5, typeDef.glowColor.replace('0.7', '0.2'));
            aura.addColorStop(1, 'transparent');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(0, 0, auraSize, 0, Math.PI * 2);
            ctx.fill();

            // Boss body — larger, more angular
            ctx.fillStyle = baseColor;
            ctx.shadowColor = typeDef.color;
            ctx.shadowBlur = 25;
            ctx.beginPath();
            ctx.moveTo(size * 2, 0);                // Nose
            ctx.lineTo(size * 0.5, -size * 0.6);    // Upper hull
            ctx.lineTo(-size * 1.2, -size * 1.2);   // Top wing tip
            ctx.lineTo(-size * 0.6, -size * 0.3);   // Wing joint
            ctx.lineTo(-size * 0.8, 0);             // Rear indent
            ctx.lineTo(-size * 0.6, size * 0.3);    // Wing joint
            ctx.lineTo(-size * 1.2, size * 1.2);    // Bottom wing tip
            ctx.lineTo(size * 0.5, size * 0.6);     // Lower hull
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;

            // Engine flames (twin)
            const fLen = (0.6 + Math.random() * 0.4) * size;
            ctx.fillStyle = 'rgba(255, 100, 50, 0.8)';
            ctx.beginPath();
            ctx.moveTo(-size * 0.7, -size * 0.2);
            ctx.lineTo(-size * 0.7 - fLen, 0);
            ctx.lineTo(-size * 0.7, size * 0.2);
            ctx.closePath();
            ctx.fill();

            // Dreadnought shield arc
            if (boss.type === 'dreadnought') {
                ctx.strokeStyle = boss.phase === 2 ? 'rgba(255,100,100,0.6)' : 'rgba(100,200,255,0.6)';
                ctx.lineWidth = 4 / safeZoom;
                ctx.beginPath();
                ctx.arc(0, 0, size * 2, -Math.PI / 3, Math.PI / 3);
                ctx.stroke();
                // Shield shimmer
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 2 / safeZoom;
                ctx.beginPath();
                ctx.arc(0, 0, size * 2 + 2, -Math.PI / 4, Math.PI / 4);
                ctx.stroke();
            }

            // Hive Queen pulsing organic glow
            if (boss.type === 'hivequeen') {
                const pulse = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
                ctx.fillStyle = `rgba(68, 255, 68, ${pulse * 0.3})`;
                ctx.beginPath();
                ctx.arc(0, 0, size * 1.8, 0, Math.PI * 2);
                ctx.fill();
            }

            // Void Reaper dark energy tendrils
            if (boss.type === 'voidreaper') {
                const time = Date.now() * 0.003;
                ctx.strokeStyle = 'rgba(153, 68, 255, 0.4)';
                ctx.lineWidth = 2 / safeZoom;
                for (let i = 0; i < 4; i++) {
                    const tAngle = time + (i * Math.PI / 2);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.quadraticCurveTo(
                        Math.cos(tAngle) * size * 1.5,
                        Math.sin(tAngle) * size * 1.5,
                        Math.cos(tAngle + 0.5) * size * 2.5,
                        Math.sin(tAngle + 0.5) * size * 2.5
                    );
                    ctx.stroke();
                }
            }

            ctx.restore();

            // === BOSS HEALTH BAR (top of screen) ===
            const barWidth = 400;
            const barHeight = 14;
            const barX = (ctx.canvas.width - barWidth) / 2;
            const barY = 20;
            const hpRatio = boss.health / boss.maxHealth;

            // Background
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
            // Health fill
            const hpColor = hpRatio > 0.5 ? typeDef.color : '#ff4400';
            ctx.fillStyle = hpColor;
            ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);
            // Border
            ctx.strokeStyle = typeDef.color;
            ctx.lineWidth = 1;
            ctx.strokeRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
            // Name
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Orbitron, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`⚠ ${typeDef.name.toUpperCase()} ${boss.phase === 2 ? '(ENRAGED)' : ''}`, ctx.canvas.width / 2, barY - 6);
            // HP text
            ctx.fillStyle = '#cccccc';
            ctx.font = '10px Orbitron, monospace';
            ctx.fillText(`${boss.health} / ${boss.maxHealth}`, ctx.canvas.width / 2, barY + barHeight + 14);
            ctx.textAlign = 'left';
        }

        // Mission tracking is now handled via HTML floating window updateMissionHUD()

    }

    // Helper to draw a missile base structure
    drawMissileBase(ctx, base, time, damaged = false, meltdowns = 0, rx = null, ry = null, rScale = 1.0) {
        ctx.save();

        // Use provided rotated coordinates or fallback to base (which would be non-rotated)
        const finalX = rx !== null ? rx : base.x;
        const finalY = ry !== null ? ry : base.y;

        ctx.translate(finalX, finalY);

        const safeZoom = Math.max(0.01, this.camera.zoom || 1);
        const size = (base.size || 40) * rScale / safeZoom;
        
        if (size <= 0) {
            ctx.restore();
            return;
        }
        
        const alertPulse = base.alertLevel > 0 ? Math.sin(time * 0.01) * 0.3 + 0.7 : 0.5;

        // Hit Flash Logic
        if (base.hitFlash > 0) {
            base.hitFlash--;
            ctx.globalCompositeOperation = 'source-over';

            // White flash override
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(0, 0, size * 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
            return; // Skip normal drawing if flashing
        }

        // 1. DANGER AURA GLOW (pulsing perimeter)
        const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.8);
        let alertColor;
        if (meltdowns > 0) {
            alertColor = `rgba(150, 255, 50, ${0.4 * meltdowns})`; // Nuclear Green
        } else {
            alertColor = base.alertLevel > 0.5 ? `rgba(255, 0, 0, ${0.3 * alertPulse})` : 'rgba(80, 100, 200, 0.15)';
        }

        auraGrad.addColorStop(0, alertColor);
        auraGrad.addColorStop(0.5, meltdowns > 0 ? 'rgba(50, 150, 50, 0.15)' : 'rgba(40, 40, 120, 0.1)');
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(0, 0, size * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // 2. SCANNING LASER (Atmospheric scifi effect)
        if (base.active && !damaged) {
            ctx.save();
            ctx.rotate(base.turretAngle || 0);
            const scanAngle = Math.sin(time * 0.002) * 0.2;
            const scanLen = size * 6;
            const scanGrad = ctx.createLinearGradient(0, 0, scanLen, 0);
            scanGrad.addColorStop(0, `rgba(255, 0, 0, ${0.4 * alertPulse})`);
            scanGrad.addColorStop(1, 'transparent');
            ctx.strokeStyle = scanGrad;
            ctx.lineWidth = 1 / safeZoom;
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(Math.cos(scanAngle) * scanLen, Math.sin(scanAngle) * scanLen);
            ctx.stroke();
            ctx.restore();
        }

        // Base platform (octagonal military structure)
        ctx.save();
        ctx.rotate(base.rotationPhase);

        // Outer ring
        ctx.fillStyle = damaged ? '#2a1a2e' : '#1a1a2e';
        ctx.strokeStyle = meltdowns > 0 ? '#00ff00' : (base.alertLevel > 0.5 ? '#ff3333' : '#4466aa');
        ctx.lineWidth = 3 / safeZoom;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * size * 1.2;
            const y = Math.sin(angle) * size * 1.2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner platform
        ctx.fillStyle = damaged ? '#352545' : '#252545';
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
            const x = Math.cos(angle) * size * 0.8;
            const y = Math.sin(angle) * size * 0.8;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Rotating turret (aims at player)
        ctx.save();
        ctx.rotate(base.turretAngle);

        // Turret base
        ctx.fillStyle = damaged ? '#443355' : '#333355';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // 5. RAILGUN BARREL ASSEMBLY
        const barrelLength = size * (damaged ? (1.6 - meltdowns * 0.3) : 1.8);
        const barrelWidth = size * 0.35;
        const recoil = base.recoil || 0;

        // Left and Right Rail Rails
        ctx.fillStyle = meltdowns > 0 ? '#448844' : '#555566';
        ctx.fillRect(-size * 0.2 - recoil, -barrelWidth / 2, barrelLength, barrelWidth * 0.3);
        ctx.fillRect(-size * 0.3 - recoil, barrelWidth / 2 - barrelWidth * 0.3, barrelLength, barrelWidth * 0.3);

        // Barrel core energy glow (charged look)
        const chargeAlpha = 0.3 + (base.alertLevel > 0.8 ? 0.4 : 0);
        const chargeGrad = ctx.createLinearGradient(0, 0, barrelLength, 0);
        chargeGrad.addColorStop(0, meltdowns > 0 ? '#22ff44' : '#44aaff');
        chargeGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = chargeGrad;
        ctx.globalAlpha = chargeAlpha;
        ctx.fillRect(0 - recoil, -barrelWidth * 0.1, barrelLength, barrelWidth * 0.2);
        ctx.globalAlpha = 1.0;

        // Muzzle Brake / Energy Gates
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = '#222';
            ctx.fillRect(size * 0.5 + i * size * 0.4 - recoil, -barrelWidth * 0.6, size * 0.15, barrelWidth * 1.2);
            // Gate glow
            if (base.alertLevel > 0.6) {
                ctx.fillStyle = `rgba(255, 50, 50, ${alertPulse * 0.8})`;
                ctx.fillRect(size * 0.5 + i * size * 0.4 - recoil + size * 0.05, -barrelWidth * 0.5, size * 0.05, barrelWidth * 1.0);
            }
        }

        ctx.restore();
        ctx.restore();

        // Mutant green viscous sludge layer (rendered on top of the base during meltdown)
        if (meltdowns > 0) {
            ctx.save();
            ctx.translate(base.x, base.y);
            ctx.globalAlpha = 0.6 + Math.sin(time * 0.01) * 0.2;
            ctx.fillStyle = '#22ff44'; // Neon Green Sludge

            // Draw various viscous blobs dripping/coating the base
            for (let i = 0; i < 6; i++) {
                const blobAngle = (i / 6) * Math.PI * 2 + time * 0.002;
                const blobDist = size * (0.6 + Math.sin(time * 0.005 + i) * 0.4);
                const blobSize = size * (0.3 + Math.cos(time * 0.008 + i) * 0.2) * meltdowns;

                const bx = Math.cos(blobAngle) * blobDist;
                const by = Math.sin(blobAngle) * blobDist;

                ctx.beginPath();
                ctx.arc(bx, by, blobSize, 0, Math.PI * 2);
                ctx.fill();

                // Add highlight to blob for "viscous" look
                ctx.fillStyle = '#88ff88';
                ctx.beginPath();
                ctx.arc(bx - blobSize * 0.3, by - blobSize * 0.3, blobSize * 0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#22ff44';
            }

            // Central sludge buildup
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.5 * meltdowns, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    // Render hazard effect overlay (full screen)
    renderHazardEffect(ctx, rawTime) {
        if (!this.hazardEffect) return;

        // CRITICAL: Reset canvas transform to ensure we draw in screen space
        // Without this, previous draw calls leave transforms that make the effect invisible
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';

        // Mark that the effect has been rendered at least once
        this.hazardEffect._hasRenderedFrame = true;

        try {
            const now = performance.now();
            const time = typeof rawTime === 'number' ? rawTime : now;
            const progress = Math.max(0, Math.min(1.0, (now - this.hazardEffect.startTime) / (this.hazardEffect.duration || 8000)));

            if (isNaN(progress)) return;
            this.hazardEffect.progress = progress; // Update shared progress

            if (this.hazardEffect.type === 'supernova') {
                this.renderSupernovaEffect(ctx, time);
            } else if (this.hazardEffect.type === 'blackhole') {
                this.renderBlackHoleEffect(ctx, time);
            } else if (this.hazardEffect.type === 'missile_base_destruction') {
                this.renderMissileBaseDestructionEffect(ctx, time);
            } else if (this.hazardEffect.type === 'planet_impact') {
                this.renderPlanetImpactEffect(ctx, time);
            } else if (this.hazardEffect.type === 'missile_hit') {
                this.renderMissileHitEffect(ctx, time);
            } else if (this.hazardEffect.type === 'player_death') {
                this.renderPlayerDeathEffect(ctx, time);
            } else if (this.hazardEffect.type === 'emp') {
                this.renderEMPEffect(ctx, time);
            } else if (this.hazardEffect.type === 'quantum') {
                this.renderQuantumEffect(ctx, time);
            }
        } catch (e) {
            console.error('[Hazard] Critical error during effect rendering:', e);
            // Don't null the effect here if possible, but if it keeps failing, the next update will kill it
        }
    }

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
        // 0. DUST SHOCKWAVE (Instead of Nuclear Whiteout)
        // ============================================
        if (progress < 0.2) {
            const shockAlpha = 1.0 - (progress / 0.2);
            ctx.beginPath();
            ctx.arc(impactScreenX, impactScreenY, progress * 2000 * zoom, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(100, 100, 100, ${shockAlpha})`;
            ctx.lineWidth = 20 * zoom;
            ctx.stroke();
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
    renderSupernovaEffect(ctx, time) {
        const effect = this.hazardEffect;
        if (!effect) return;

        // Debug confirmation
        if (!effect._logged) {
            console.log("[Aether] Triggering High-Intensity Red Supernova Effect");
            effect._logged = true;
        }

        const canvas = this.canvas;
        const progress = effect.progress || 0;
        const W = canvas.width;
        const H = canvas.height;
        const cx = W / 2;
        const cy = H / 2;
        const t = time * 0.001;
        const scale = Math.min(W, H) / 800;

        ctx.save();

        // ============ CAMERA SHAKE ============
        if (progress < 0.65) {
            const ramp = Math.min(1, progress / 0.015);
            const decay = 1 - progress / 0.65;
            const intensity = 25 * ramp * decay * scale;
            this.camera.shakeX = (Math.sin(t * 47) + Math.sin(t * 23) * 0.5) * intensity;
            this.camera.shakeY = (Math.cos(t * 53) + Math.cos(t * 31) * 0.5) * intensity;
        } else {
            this.camera.shakeX *= 0.88;
            this.camera.shakeY *= 0.88;
        }

        // ============ 1. BLINDING FLASH (0-18%) ============
        if (progress < 0.18) {
            const f = progress < 0.025 ? Math.min(1, progress / 0.025) : Math.max(0, 1 - (progress - 0.025) / 0.155);
            ctx.fillStyle = 'rgba(255,255,255,' + f + ')';
            ctx.fillRect(0, 0, W, H);
            if (f > 0.2) {
                const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 600 * scale);
                cg.addColorStop(0, 'rgba(255,255,255,' + f + ')');
                cg.addColorStop(0.2, 'rgba(255,200,200,' + (f * 0.9) + ')');
                cg.addColorStop(0.5, 'rgba(255,40,40,' + (f * 0.7) + ')');
                cg.addColorStop(0.8, 'rgba(220,0,0,' + (f * 0.4) + ')');
                cg.addColorStop(1, 'rgba(120,0,0,0)');
                ctx.fillStyle = cg;
                ctx.fillRect(0, 0, W, H);
            }
        }

        // ============ 2. SHOCKWAVE + CONDENSATION RING (1-55%) ============
        if (progress > 0.01 && progress < 0.55) {
            const sp = (progress - 0.01) / 0.54;
            const sr = sp * 1100 * scale;
            const sa = Math.max(0, (1 - sp) * 0.95);
            const sw = Math.max(3, (1 - sp) * 40 * scale);
            ctx.strokeStyle = 'rgba(255,200,200,' + sa + ')';
            ctx.lineWidth = sw;
            ctx.beginPath();
            ctx.arc(cx, cy, Math.max(1, sr), 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(255,255,255,' + (sa * 0.9) + ')';
            ctx.lineWidth = Math.max(1, sw * 0.3);
            ctx.beginPath();
            ctx.arc(cx, cy, Math.max(1, sr * 0.94), 0, Math.PI * 2);
            ctx.stroke();
            if (sp > 0.05 && sp < 0.7) {
                const wP = (sp - 0.05) / 0.65;
                const wR = wP * 900 * scale;
                const wA = Math.max(0, (1 - wP) * 0.15);
                const wW = Math.max(30, (1 - wP) * 120) * scale;
                ctx.strokeStyle = 'rgba(200,220,255,' + wA + ')';
                ctx.lineWidth = wW;
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, wR), 0, Math.PI * 2);
                ctx.stroke();
            }
            if (sp > 0.12) {
                const s2p = (sp - 0.12) / 0.88;
                ctx.strokeStyle = 'rgba(255,80,80,' + (sa * 0.4) + ')';
                ctx.lineWidth = Math.max(2, sw * 0.4);
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, s2p * 800 * scale), 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // ============ 3. FIREBALL (2-50%) ============
        if (progress > 0.02 && progress < 0.50) {
            const fp = (progress - 0.02) / 0.48;
            const fr = (120 + fp * 400) * scale;
            const fa = Math.max(0, 1 - fp * 1.3);
            for (let layer = 0; layer < 3; layer++) {
                const lr = fr * (1 - layer * 0.25);
                const la = fa * (1 - layer * 0.15);
                const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, lr));
                if (layer === 0) {
                    fg.addColorStop(0, 'rgba(255,255,255,' + la + ')');
                    fg.addColorStop(0.2, 'rgba(255,180,180,' + (la * 0.95) + ')');
                    fg.addColorStop(0.45, 'rgba(255,20,20,' + (la * 0.8) + ')');
                    fg.addColorStop(0.7, 'rgba(200,0,0,' + (la * 0.6) + ')');
                    fg.addColorStop(1, 'rgba(120,0,0,0)');
                } else if (layer === 1) {
                    fg.addColorStop(0, 'rgba(255,150,150,' + (la * 0.7) + ')');
                    fg.addColorStop(0.5, 'rgba(255,0,0,' + (la * 0.55) + ')');
                    fg.addColorStop(1, 'rgba(100,0,0,0)');
                } else {
                    fg.addColorStop(0, 'rgba(255,50,0,' + (la * 0.4) + ')');
                    fg.addColorStop(1, 'rgba(80,0,0,0)');
                }
                ctx.fillStyle = fg;
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, lr), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ============ 4. MEGA VOLUMETRIC MUSHROOM CLOUD (10-96%) ============
        if (progress > 0.10 && progress < 0.96) {
            const cp = Math.min(1, (progress - 0.10) / 0.45);
            const riseP = Math.max(0, Math.min(1, (progress - 0.25) / 0.55));
            const fadeP = Math.max(0, (progress - 0.72) / 0.24);
            const alpha = Math.max(0, 1 - fadeP);
            const hotness = Math.max(0, 1 - cp * 1.2);
            const rise = riseP * 250 * scale;
            const baseY = cy + 50 * scale;

            ctx.save();
            ctx.translate(cx, baseY - rise);

            // ---- FIRE COLUMN inside stem ----
            if (hotness > 0.1) {
                for (let i = 0; i < 25; i++) {
                    const frac = i / 24;
                    const fy = -frac * (280 + cp * 150) * scale;
                    const fw = (35 + frac * frac * 50 + Math.sin(t * 8 + frac * 10) * 10) * scale * Math.min(1, cp * 3);
                    const ffa = alpha * hotness * (0.7 - frac * 0.3);
                    if (ffa < 0.01) continue;
                    const fcg = ctx.createRadialGradient(0, fy, 0, 0, fy, Math.max(1, fw));
                    fcg.addColorStop(0, 'rgba(255,240,240,' + (ffa * 0.98) + ')');
                    fcg.addColorStop(0.3, 'rgba(255,100,100,' + (ffa * 0.85) + ')');
                    fcg.addColorStop(0.6, 'rgba(255,0,0,' + (ffa * 0.6) + ')');
                    fcg.addColorStop(1, 'rgba(100,0,0,0)');
                    ctx.fillStyle = fcg;
                    ctx.beginPath();
                    ctx.arc(Math.sin(t * 6 + frac * 8) * 6 * scale, fy, Math.max(1, fw), 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ---- STEM: Dense layered smoke column ----
            const stemH = (320 + cp * 180) * scale;
            for (let i = 0; i < 22; i++) {
                const frac = i / 21;
                const sy = -frac * stemH;
                const sw = (60 + frac * frac * 110 + Math.sin(t * 1.8 + frac * 6) * 10) * scale * Math.min(1, cp * 2.5);
                const depth = 0.5 + frac * 0.35;
                let r, g, b;
                if (hotness > 0.3) { r = 255; g = 10 + frac * 40; b = 15; }
                else { r = 70 - frac * 30; g = 15; b = 20; }
                const wobX = Math.sin(t * 1.2 + frac * 4) * 8 * scale;
                const sg = ctx.createRadialGradient(wobX, sy, 0, wobX, sy, Math.max(1, sw * 1.3));
                sg.addColorStop(0, 'rgba(' + (r + 60) + ',' + (g + 20) + ',' + (b + 10) + ',' + (alpha * depth * 0.95) + ')');
                sg.addColorStop(0.5, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * depth * 0.8) + ')');
                sg.addColorStop(1, 'rgba(' + Math.round(r * 0.4) + ',0,0,0)');
                ctx.fillStyle = sg;
                ctx.beginPath();
                ctx.arc(wobX, sy, Math.max(1, sw * 1.3), 0, Math.PI * 2);
                ctx.fill();
            }

            // ---- CAP: Multi-layer volumetric dome ----
            const capY = -stemH;
            const capGrow = Math.max(0, Math.min(1, (cp - 0.1) / 0.45));
            if (capGrow > 0) {
                const capR = (280 + capGrow * 320) * scale;
                const capH = (140 + capGrow * 120) * scale;

                // BACK LAYER - dark depth billows
                for (let i = 0; i < 14; i++) {
                    const angle = (i / 14) * Math.PI * 2 + t * 0.15;
                    const bx = Math.cos(angle) * capR * 0.6;
                    const by = capY + Math.sin(angle * 1.3 + t * 0.2) * capH * 0.4;
                    const br = capR * (0.55 + Math.sin(t * 0.8 + i * 0.5) * 0.1);
                    let r = hotness > 0.2 ? 140 : 40, g = hotness > 0.2 ? 20 : 15, b = hotness > 0.2 ? 20 : 25;
                    const bg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    bg.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.65 * capGrow) + ')');
                    bg.addColorStop(0.6, 'rgba(' + Math.round(r * 0.6) + ',' + Math.round(g * 0.4) + ',' + Math.round(b * 0.4) + ',' + (alpha * 0.4 * capGrow) + ')');
                    bg.addColorStop(1, 'rgba(' + Math.round(r * 0.2) + ',' + Math.round(g * 0.1) + ',' + Math.round(b * 0.1) + ',0)');
                    ctx.fillStyle = bg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // MID LAYER - main body
                for (let i = 0; i < 18; i++) {
                    const angle = (i / 18) * Math.PI * 2 + Math.PI / 18 + t * 0.22;
                    const bx = Math.cos(angle) * capR * 0.48 + Math.sin(t * 0.7 + i) * 15 * scale;
                    const by = capY + Math.sin(angle * 0.8 + t * 0.3) * capH * 0.32;
                    const br = capR * (0.48 + Math.sin(t * 1.1 + i * 0.8) * 0.07);
                    let r, g, b;
                    if (hotness > 0.4) { r = 255; g = 10; b = 15; }
                    else if (hotness > 0.15) { r = 180; g = 5; b = 10; }
                    else { r = 100; g = 5; b = 8; }
                    const mg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    mg.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.75 * capGrow) + ')');
                    mg.addColorStop(0.4, 'rgba(' + Math.round(r * 0.8) + ',' + Math.round(g * 0.7) + ',' + Math.round(b * 0.75) + ',' + (alpha * 0.5 * capGrow) + ')');
                    mg.addColorStop(0.8, 'rgba(' + Math.round(r * 0.5) + ',' + Math.round(g * 0.3) + ',' + Math.round(b * 0.35) + ',' + (alpha * 0.2 * capGrow) + ')');
                    mg.addColorStop(1, 'rgba(' + Math.round(r * 0.2) + ',' + Math.round(g * 0.1) + ',' + Math.round(b * 0.1) + ',0)');
                    ctx.fillStyle = mg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // FRONT LAYER - bright highlights
                for (let i = 0; i < 12; i++) {
                    const angle = (i / 12) * Math.PI * 2 + t * 0.28;
                    const bx = Math.cos(angle) * capR * 0.35 + Math.sin(t + i * 1.3) * 10 * scale;
                    const by = capY + Math.sin(angle * 1.5 + t * 0.35) * capH * 0.25;
                    const br = capR * (0.3 + Math.sin(t * 1.5 + i) * 0.06);
                    let r, g, b;
                    if (hotness > 0.3) { r = 255; g = 180; b = 180; } else { r = 255; g = 120; b = 120; }
                    const fg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    fg.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.6 * capGrow) + ')');
                    fg.addColorStop(0.5, 'rgba(' + Math.round(r * 0.95) + ',' + Math.round(g * 0.8) + ',' + Math.round(b * 0.8) + ',' + (alpha * 0.35 * capGrow) + ')');
                    fg.addColorStop(1, 'rgba(' + Math.round(r * 0.6) + ',' + Math.round(g * 0.2) + ',' + Math.round(b * 0.2) + ',0)');
                    ctx.fillStyle = fg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // BRIGHT CORE
                const ccR = capR * 0.5;
                const ccg2 = ctx.createRadialGradient(0, capY, 0, 0, capY, Math.max(1, ccR));
                if (hotness > 0.2) {
                    ccg2.addColorStop(0, 'rgba(255,240,240,' + (alpha * 0.95 * capGrow) + ')');
                    ccg2.addColorStop(0.3, 'rgba(255,80,80,' + (alpha * 0.7 * capGrow) + ')');
                    ccg2.addColorStop(0.7, 'rgba(255,0,0,' + (alpha * 0.4 * capGrow) + ')');
                    ccg2.addColorStop(1, 'rgba(120,0,0,0)');
                } else {
                    ccg2.addColorStop(0, 'rgba(255,200,200,' + (alpha * 0.7 * capGrow) + ')');
                    ccg2.addColorStop(0.5, 'rgba(200,0,0,' + (alpha * 0.5 * capGrow) + ')');
                    ccg2.addColorStop(1, 'rgba(100,0,0,0)');
                }
                ctx.fillStyle = ccg2;
                ctx.beginPath();
                ctx.arc(0, capY, Math.max(1, ccR), 0, Math.PI * 2);
                ctx.fill();

                // UNDERGLOW from fireball
                if (hotness > 0.05) {
                    const ugR = capR * 0.7;
                    const ugY = capY + capH * 0.4;
                    const ugA = alpha * hotness * 0.5 * capGrow;
                    const ugg = ctx.createRadialGradient(0, ugY, 0, 0, ugY, Math.max(1, ugR));
                    ugg.addColorStop(0, 'rgba(255,255,255,' + ugA + ')');
                    ugg.addColorStop(0.5, 'rgba(255,50,50,' + (ugA * 0.6) + ')');
                    ugg.addColorStop(1, 'rgba(180,0,0,0)');
                    ctx.fillStyle = ugg;
                    ctx.beginPath();
                    ctx.arc(0, ugY, Math.max(1, ugR), 0, Math.PI * 2);
                    ctx.fill();
                }

                // TOROIDAL RING at cap base
                ctx.strokeStyle = 'rgba(255,150,150,' + (alpha * 0.4 * capGrow) + ')';
                ctx.lineWidth = Math.max(2, capH * 0.22);
                ctx.beginPath();
                ctx.ellipse(0, capY + capH * 0.25, Math.max(1, capR * 0.65), Math.max(1, capH * 0.11), 0, 0, Math.PI * 2);
                ctx.stroke();

                // SMOKE TENDRILS from cap edges
                for (let i = 0; i < 8; i++) {
                    const tA = (i / 8) * Math.PI * 2 + t * 0.1;
                    const tLen = (60 + Math.sin(t + i * 2) * 20) * scale * capGrow;
                    const tx = Math.cos(tA) * capR * 0.75;
                    const ty = capY + Math.sin(tA) * capH * 0.3;
                    const tex = tx + Math.cos(tA + 0.5) * tLen;
                    const tey = ty + Math.sin(tA * 0.5 + t * 0.3) * tLen * 0.6 - tLen * 0.3;
                    ctx.strokeStyle = 'rgba(200,100,100,' + (alpha * 0.25 * capGrow) + ')';
                    ctx.lineWidth = Math.max(1, 6 * scale * (1 - progress * 0.5));
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.quadraticCurveTo(tx + (tex - tx) * 0.5, ty - 30 * scale, tex, tey);
                    ctx.stroke();
                }

                // RISING VAPOR above cap
                for (let v = 0; v < 10; v++) {
                    const vy = capY - (60 + v * 40) * scale;
                    const vr = Math.max(1, (35 + v * 15 + Math.sin(t * 2.5 + v * 0.9) * 10) * scale * capGrow);
                    const vx = Math.sin(t * 1.1 + v * 1.7) * 30 * scale;
                    const va = alpha * Math.max(0, 0.35 - v * 0.03) * capGrow;
                    const vg = ctx.createRadialGradient(vx, vy, 0, vx, vy, vr);
                    vg.addColorStop(0, 'rgba(255,245,245,' + va + ')');
                    vg.addColorStop(0.6, 'rgba(220,180,180,' + (va * 0.6) + ')');
                    vg.addColorStop(1, 'rgba(150,140,140,0)');
                    ctx.fillStyle = vg;
                    ctx.beginPath();
                    ctx.arc(vx, vy, vr, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ---- EMBER PARTICLES ----
            if (!effect._embers) {
                effect._embers = [];
                for (let i = 0; i < 60; i++) {
                    const a = Math.random() * Math.PI * 2;
                    const spd = 1 + Math.random() * 4;
                    effect._embers.push({
                        x: 0, y: 0, vx: Math.cos(a) * spd, vy: -2 - Math.random() * 5,
                        size: 1 + Math.random() * 3, life: 0.1 + Math.random() * 0.7, hue: (Math.random() < 0.2 ? 0 : 350 + Math.random() * 10)
                    });
                }
            }
            for (let i = 0; i < effect._embers.length; i++) {
                const e = effect._embers[i];
                if (progress < e.life || progress > e.life + 0.3) continue;
                const ep = (progress - e.life) / 0.3;
                const ex = e.vx * ep * 300 * scale;
                const ey = e.vy * ep * 300 * scale - stemH * 0.5;
                const ea = Math.max(0, (1 - ep) * alpha * 0.9);
                const es = e.size * scale * (1 + ep);
                ctx.fillStyle = 'hsla(' + e.hue + ', 100%, ' + Math.round(60 + (1 - ep) * 30) + '%, ' + ea + ')';
                ctx.beginPath();
                ctx.arc(ex, ey, Math.max(0.5, es), 0, Math.PI * 2);
                ctx.fill();
            }

            // ---- GROUND DEBRIS RING ----
            if (progress < 0.60) {
                const dp = Math.min(1, progress / 0.20);
                const dr = dp * 500 * scale;
                const da = alpha * Math.max(0, 1 - dp) * 0.45;
                const dg = ctx.createRadialGradient(0, 30 * scale, 0, 0, 30 * scale, Math.max(1, dr));
                dg.addColorStop(0, 'rgba(180,30,30,' + da + ')');
                dg.addColorStop(0.4, 'rgba(120,20,20,' + (da * 0.7) + ')');
                dg.addColorStop(0.8, 'rgba(60,10,10,' + (da * 0.3) + ')');
                dg.addColorStop(1, 'rgba(30,0,0,0)');
                ctx.fillStyle = dg;
                ctx.beginPath();
                ctx.arc(0, 30 * scale, Math.max(1, dr), 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        // ============ 5. AMBIENT GLOW ============
        if (progress > 0.02 && progress < 0.88) {
            const ga = Math.max(0, (1 - progress) * 0.3);
            const gg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 800 * scale);
            gg.addColorStop(0, 'rgba(255,100,100,' + ga + ')');
            gg.addColorStop(0.4, 'rgba(255,40,40,' + (ga * 0.7) + ')');
            gg.addColorStop(0.8, 'rgba(180,0,0,' + (ga * 0.3) + ')');
            gg.addColorStop(1, 'rgba(100,0,0,0)');
            ctx.fillStyle = gg;
            ctx.fillRect(0, 0, W, H);
        }

        // ============ 6. SCREEN TINT ============
        if (progress > 0.05 && progress < 0.70) {
            const tintA = Math.max(0, 0.08 * (1 - progress / 0.70));
            ctx.fillStyle = 'rgba(255,50,50,' + tintA + ')';
            ctx.fillRect(0, 0, W, H);
        }

        ctx.restore();

        if (progress >= 0.95) {
            this.camera.shakeX = 0;
            this.camera.shakeY = 0;
        }
    }

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
    renderBlackHoleEffect(ctx, time) {
        const effect = this.hazardEffect;
        if (!effect) return;

        const progress = effect.progress || 0;
        const canvas = this.canvas;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxDim = Math.max(canvas.width, canvas.height);

        // ==========================================
        // CONTINUOUS ZOOM EFFECT
        // Zoom increases throughout pull-in and subatomic phases
        // ==========================================
        let zoomScale = 1;
        if (progress < 0.45) {
            // Phase 1: Progressive zoom into the central atom (1x → 5x)
            const p = progress / 0.45;
            zoomScale = 1 + Math.pow(p, 2) * 4; // Quad curve for smoother start, fast finish
        } else if (progress < 0.6) {
            // Phase 2: Deep zoom into the subatomic nucleus (5x → 12x)
            const p = (progress - 0.45) / 0.15;
            zoomScale = 5 + Math.pow(p, 0.8) * 7;
        } else if (progress < 0.88) {
            // Phase 2.5: Zoom peaks during implosion (12x → 20x)
            const p = (progress - 0.6) / 0.28;
            zoomScale = 12 + p * 8;
        } else {
            // Phase 3-4: Zoom holds then slowly resets
            const p = (progress - 0.88) / 0.12;
            zoomScale = 20 - p * 19; // Returns to 1x
        }

        // Apply zoom by scaling from center
        ctx.translate(centerX, centerY);
        ctx.scale(zoomScale, zoomScale);
        ctx.translate(-centerX, -centerY);

        // ==========================================
        // PHASE 1: BEING SUCKED INTO THE BLACK HOLE (0-45%)
        // Creates immersive feeling of moving toward the black hole
        // ==========================================
        if (progress < 0.45) {
            const p = progress / 0.45;

            // Acceleration curve - starts slow, gets exponentially faster
            const acceleration = Math.pow(p, 1.5);

            // Dark space background with intensifying vignette (tunnel vision effect)
            const tunnelBg = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxDim);
            const vignetteIntensity = 0.3 + p * 0.7; // Gets darker at edges as you're pulled in
            tunnelBg.addColorStop(0, 'rgba(0, 0, 0, 1)');
            tunnelBg.addColorStop(0.1 + (1 - p) * 0.2, 'rgba(5, 0, 15, 0.98)');
            tunnelBg.addColorStop(0.4, `rgba(15, 5, 35, ${vignetteIntensity})`);
            tunnelBg.addColorStop(0.7, `rgba(10, 0, 25, ${vignetteIntensity})`);
            tunnelBg.addColorStop(1, 'rgba(0, 0, 0, 1)');
            ctx.fillStyle = tunnelBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // STARS RUSHING PAST (being sucked in with you)
            // Creates the feeling of forward motion
            // ============================================
            const starSpeed = 3 + acceleration * 15; // Accelerates dramatically
            for (let star = 0; star < 200; star++) {
                // Stars originate from edges and rush toward center
                const baseAngle = (star / 200) * Math.PI * 2 + (star * 0.618);
                const starAngle = baseAngle + Math.sin(time * 0.001 + star) * 0.1;

                // Distance cycles inward - creates flowing motion toward center
                const cycleSpeed = (4 + (star % 6) * 1.5) * starSpeed * 0.003;
                const distanceCycle = ((time * cycleSpeed + star * 47) % 100) / 100;
                const starDist = maxDim * (0.1 + distanceCycle * 0.9); // From edges to near center

                // Stars stretch as they accelerate inward (relativistic effect)
                const stretchFactor = 1 + acceleration * 3 * (1 - distanceCycle);
                const trailLength = 10 + stretchFactor * 40 * distanceCycle;

                const x = centerX + Math.cos(starAngle) * starDist;
                const y = centerY + Math.sin(starAngle) * starDist * 0.6; // Elliptical for depth

                // Stars get brighter as they pass by
                const brightness = 0.3 + (1 - distanceCycle) * 0.7;
                const hue = 200 + (star % 60); // Blue-purple spectrum

                // Draw star with motion trail toward center
                const trailEndX = centerX + Math.cos(starAngle) * (starDist - trailLength);
                const trailEndY = centerY + Math.sin(starAngle) * (starDist - trailLength) * 0.6;

                const starGrad = ctx.createLinearGradient(x, y, trailEndX, trailEndY);
                starGrad.addColorStop(0, `hsla(${hue}, 80%, 80%, ${brightness * 0.1})`);
                starGrad.addColorStop(0.3, `hsla(${hue}, 90%, 90%, ${brightness * 0.8})`);
                starGrad.addColorStop(1, `hsla(${hue}, 100%, 100%, ${brightness})`);

                ctx.strokeStyle = starGrad;
                ctx.lineWidth = 1 + (star % 3) * 0.5;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(trailEndX, trailEndY);
                ctx.stroke();
            }

            // ============================================
            // LIGHT RAYS BENDING INWARD (gravitational lensing)
            // Light curves toward the black hole
            // ============================================
            for (let ray = 0; ray < 24; ray++) {
                const rayAngle = (ray / 24) * Math.PI * 2 + time * 0.0008;
                const rayPulse = 0.6 + Math.sin(time * 0.004 + ray * 0.4) * 0.4;

                // Rays curve inward more as animation progresses
                const curveFactor = p * 0.4;
                const rayStartDist = maxDim * 0.95;
                const rayEndDist = maxDim * (0.3 - p * 0.25); // Gets pulled closer to center

                const startX = centerX + Math.cos(rayAngle) * rayStartDist;
                const startY = centerY + Math.sin(rayAngle) * rayStartDist * 0.5;
                const endX = centerX + Math.cos(rayAngle) * rayEndDist;
                const endY = centerY + Math.sin(rayAngle) * rayEndDist * 0.5;

                // Control point for curve (bends toward center)
                const controlDist = (rayStartDist + rayEndDist) / 2 * (1 - curveFactor);
                const controlX = centerX + Math.cos(rayAngle) * controlDist;
                const controlY = centerY + Math.sin(rayAngle) * controlDist * 0.5;

                const rayGrad = ctx.createLinearGradient(startX, startY, endX, endY);
                rayGrad.addColorStop(0, 'transparent');
                rayGrad.addColorStop(0.3, `rgba(180, 200, 255, ${0.15 * rayPulse})`);
                rayGrad.addColorStop(0.6, `rgba(220, 230, 255, ${0.3 * rayPulse * p})`);
                rayGrad.addColorStop(1, `rgba(255, 255, 255, ${0.5 * rayPulse * acceleration})`);

                ctx.strokeStyle = rayGrad;
                ctx.lineWidth = 8 + ray % 5;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.quadraticCurveTo(controlX, controlY, endX, endY);
                ctx.stroke();
            }

            // ============================================
            // DEBRIS/MATTER BEING PULLED IN
            // Chunks of matter streaming toward the void
            // ============================================
            for (let debris = 0; debris < 80; debris++) {
                const debrisAngle = (debris / 80) * Math.PI * 2 + debris * 1.3;
                const debrisSpeed = (3 + debris % 5) * starSpeed * 0.004;
                const debrisCycle = ((time * debrisSpeed + debris * 73) % 100) / 100;
                const debrisDist = maxDim * (0.05 + debrisCycle * 0.85);

                const x = centerX + Math.cos(debrisAngle) * debrisDist;
                const y = centerY + Math.sin(debrisAngle) * debrisDist * 0.55;

                // Debris glows hot as it's compressed
                const heat = 0.4 + (1 - debrisCycle) * 0.6;
                const size = 2 + (debris % 4) + acceleration * 3 * (1 - debrisCycle);

                // Hot orange-red debris
                const debrisGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
                debrisGrad.addColorStop(0, `rgba(255, 200, 100, ${heat})`);
                debrisGrad.addColorStop(0.4, `rgba(255, 120, 50, ${heat * 0.6})`);
                debrisGrad.addColorStop(1, 'transparent');

                ctx.fillStyle = debrisGrad;
                ctx.beginPath();
                ctx.arc(x, y, size * 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // ============================================
            // ACCRETION DISK (spiraling matter around black hole)
            // ============================================
            for (let ring = 0; ring < 15; ring++) {
                const ringRadius = 50 + ring * 25 * (1 - p * 0.3);
                const ringRotation = time * (0.003 - ring * 0.0002) + ring * 0.5;
                const ringAlpha = (0.5 - ring * 0.025) * Math.min(1, p * 2);

                // Draw multiple arcs for spiral effect
                for (let arc = 0; arc < 3; arc++) {
                    const arcStart = ringRotation + arc * (Math.PI * 2 / 3);
                    const arcEnd = arcStart + Math.PI * 0.8;

                    const arcGrad = ctx.createRadialGradient(centerX, centerY, ringRadius * 0.8, centerX, centerY, ringRadius * 1.2);
                    arcGrad.addColorStop(0, `rgba(255, 150, 50, ${ringAlpha})`);
                    arcGrad.addColorStop(0.5, `rgba(255, 100, 30, ${ringAlpha * 0.8})`);
                    arcGrad.addColorStop(1, 'transparent');

                    ctx.strokeStyle = arcGrad;
                    ctx.lineWidth = 12 - ring * 0.5;
                    ctx.beginPath();
                    ctx.ellipse(centerX, centerY, ringRadius, ringRadius * 0.35, 0, arcStart, arcEnd);
                    ctx.stroke();
                }
            }

            // (Central void removed per user request)

            // ============================================
            // TUNNEL PARTICLES (additional depth) - transitioning to subatomic
            // ============================================
            if (effect.tunnelParticles) {
                for (const particle of effect.tunnelParticles) {
                    // Move particles toward center over time
                    particle.z -= starSpeed * 2;
                    if (particle.z < -500) particle.z = 1500;

                    const perspectiveScale = 550 / (550 + particle.z);
                    const x = centerX + Math.cos(particle.angle) * particle.radius * perspectiveScale;
                    const y = centerY + Math.sin(particle.angle) * particle.radius * perspectiveScale * 0.55;
                    const size = 6 * perspectiveScale * particle.brightness;

                    if (size < 1) continue;

                    // Blue-cyan particles only
                    const particleHue = 180 + (particle.hue % 50);
                    const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 1.8);
                    grad.addColorStop(0, `hsla(${particleHue}, 100%, 85%, ${particle.brightness * perspectiveScale})`);
                    grad.addColorStop(0.6, `hsla(${particleHue + 15}, 100%, 60%, ${particle.brightness * perspectiveScale * 0.4})`);
                    grad.addColorStop(1, 'transparent');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(x, y, size * 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ============================================
            // CENTRALLY PEERING ATOM (Visible from distance)
            // ============================================
            const atomAlpha = Math.pow(p, 2.5); // Emerges as we approach the event horizon
            const atomSize = 40 + p * 10; // Grows to match Phase 2 starting size (50)

            ctx.save();
            ctx.globalAlpha = atomAlpha;
            const atomGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, atomSize);
            atomGrad.addColorStop(0, '#fff');
            atomGrad.addColorStop(0.3, '#b4e6ff');
            atomGrad.addColorStop(0.6, 'rgba(0, 150, 255, 0.3)');
            atomGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = atomGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, atomSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 2: SUBATOMIC STRUCTURE (45-60%)
        // Seamless transition from being sucked in to penetrating subatomic level
        // Feels like falling into the quantum structure of the black hole
        // ==========================================
        if (progress >= 0.45 && progress < 0.6) {
            const p = (progress - 0.45) / 0.15;
            const atomicSpeed = 1 + p * 2;

            // Deep black void background - we're inside now
            const subatomicBg = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxDim);
            subatomicBg.addColorStop(0, 'rgba(0, 0, 0, 1)');
            subatomicBg.addColorStop(0.4, 'rgba(0, 5, 15, 0.98)');
            subatomicBg.addColorStop(0.8, 'rgba(0, 0, 5, 1)');
            subatomicBg.addColorStop(1, 'rgba(0, 0, 0, 1)');
            ctx.fillStyle = subatomicBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // ELECTRON ORBITAL SHELLS (rushing toward us)
            // Like atoms zooming past at subatomic scale
            // ============================================
            for (let shell = 0; shell < 30; shell++) {
                const shellSpeed = (3 + shell * 0.2) * atomicSpeed;
                const shellZ = ((time * shellSpeed * 0.004 + shell * 60) % 900);
                const perspective = 500 / (500 + shellZ);

                if (perspective < 0.08) continue;

                const orbitalRadius = (100 + shell * 15) * perspective;
                const shellAlpha = (0.5 + Math.sin(time * 0.006 + shell * 0.4) * 0.3) * perspective;

                // Blue-cyan electron shells
                ctx.strokeStyle = `hsla(${190 + shell % 30}, 100%, 70%, ${shellAlpha * 0.5})`;
                ctx.lineWidth = 1.5 + perspective * 3;
                ctx.beginPath();

                // Tilted orbital - more 3D feeling
                const tilt = 0.3 + Math.sin(shell * 0.5) * 0.2;
                ctx.ellipse(
                    centerX + Math.sin(time * 0.001 + shell) * 5 * perspective,
                    centerY,
                    orbitalRadius,
                    orbitalRadius * tilt,
                    time * 0.0005 + shell * 0.2,
                    0, Math.PI * 2
                );
                ctx.stroke();

                // Electrons orbiting on the shell
                const numElectrons = 2 + (shell % 4);
                for (let e = 0; e < numElectrons; e++) {
                    const electronAngle = time * 0.008 * atomicSpeed + (e / numElectrons) * Math.PI * 2 + shell;
                    const ex = centerX + Math.cos(electronAngle) * orbitalRadius;
                    const ey = centerY + Math.sin(electronAngle) * orbitalRadius * tilt;
                    const eSize = 3 + perspective * 4;

                    const eGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, eSize * 2);
                    eGrad.addColorStop(0, `hsla(200, 100%, 90%, ${shellAlpha})`);
                    eGrad.addColorStop(0.5, `hsla(210, 100%, 70%, ${shellAlpha * 0.6})`);
                    eGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = eGrad;
                    ctx.beginPath();
                    ctx.arc(ex, ey, eSize * 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ============================================
            // ENERGY BONDS (connecting structures)
            // Like chemical bonds between atoms
            // ============================================
            for (let bond = 0; bond < 60; bond++) {
                const bondAngle = (bond / 60) * Math.PI * 2 + time * 0.002;
                const bondSpeed = (4 + bond % 6) * atomicSpeed;
                const bondZ = ((time * bondSpeed * 0.006 + bond * 31) % 700);
                const perspective = 450 / (450 + bondZ);

                if (perspective < 0.12) continue;

                const bondRadius = 80 + (bond % 12) * 25;
                const x1 = centerX + Math.cos(bondAngle) * bondRadius * perspective;
                const y1 = centerY + Math.sin(bondAngle) * bondRadius * perspective * 0.5;
                const x2 = centerX + Math.cos(bondAngle + 0.3) * bondRadius * perspective * 0.6;
                const y2 = centerY + Math.sin(bondAngle + 0.3) * bondRadius * perspective * 0.5 * 0.6;

                const bondAlpha = perspective * (0.4 + Math.sin(time * 0.008 + bond) * 0.2);

                const bondGrad = ctx.createLinearGradient(x1, y1, x2, y2);
                bondGrad.addColorStop(0, `hsla(200, 100%, 80%, ${bondAlpha * 0.3})`);
                bondGrad.addColorStop(0.5, `hsla(190, 100%, 90%, ${bondAlpha * 0.8})`);
                bondGrad.addColorStop(1, `hsla(180, 100%, 85%, ${bondAlpha * 0.4})`);

                ctx.strokeStyle = bondGrad;
                ctx.lineWidth = 1 + perspective * 1.5;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // ============================================
            // CENTRAL NUCLEUS (pulsating core)
            // The heart of the subatomic structure
            // ============================================
            const nucleusSize = 50 + p * 30 + Math.sin(time * 0.01) * 10;
            const nucleusPulse = 0.7 + Math.sin(time * 0.012) * 0.3;

            // Inner glow
            const nucleusGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, nucleusSize);
            nucleusGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * nucleusPulse})`);
            nucleusGrad.addColorStop(0.3, `rgba(200, 230, 255, ${0.7 * nucleusPulse})`);
            nucleusGrad.addColorStop(0.6, `rgba(100, 180, 255, ${0.4 * nucleusPulse})`);
            nucleusGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = nucleusGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, nucleusSize, 0, Math.PI * 2);
            ctx.fill();

            // Time dilation text effect (Legacy touch)
            if (Math.floor(time / 2000) % 2 === 0) {
                ctx.fillStyle = `rgba(150, 200, 255, ${0.4 * (1 - p)})`;
                ctx.font = "italic 18px monospace";
                ctx.textAlign = "center";
                ctx.fillText("TRAVERSING SINGULARITY", centerX, centerY - nucleusSize - 40);
                ctx.fillText("TIME DILATION IN EFFECT", centerX, centerY + nucleusSize + 40);
            }

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 2.5: IMPLOSION (60-75%)
        // Everything collapses violently to a singularity
        // ==========================================
        if (progress >= 0.6 && progress < 0.88) {
            const p = (progress - 0.6) / 0.28;
            const implosionIntensity = Math.pow(p, 0.7);

            // Darkening void as everything compresses
            ctx.fillStyle = `rgba(0, 0, 0, ${0.85 + p * 0.15})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // COLLAPSING MATTER SHELL
            // Everything rushing toward center
            // ============================================
            for (let shell = 0; shell < 25; shell++) {
                const collapseProgress = Math.min(1, p * 1.5 + shell * 0.02);
                const shellRadius = maxDim * 0.8 * (1 - Math.pow(collapseProgress, 0.6));

                if (shellRadius < 20) continue;

                const shellAlpha = (1 - collapseProgress) * 0.6;

                // Blue-white collapsing shells
                ctx.strokeStyle = `rgba(180, 220, 255, ${shellAlpha})`;
                ctx.lineWidth = 3 * (1 - collapseProgress * 0.7);
                ctx.beginPath();
                ctx.arc(centerX, centerY, shellRadius, 0, Math.PI * 2);
                ctx.stroke();
            }

            // ============================================
            // STREAKING MATTER (being pulled to center)
            // ============================================
            for (let streak = 0; streak < 80; streak++) {
                const streakAngle = (streak / 80) * Math.PI * 2 + streak * 0.37;
                const collapseP = Math.min(1, p * 1.2);
                const streakDist = maxDim * (1 - collapseP) * (0.2 + (streak % 10) * 0.08);

                if (streakDist < 30) continue;

                const x = centerX + Math.cos(streakAngle) * streakDist;
                const y = centerY + Math.sin(streakAngle) * streakDist * 0.5;
                const trailLength = 40 + implosionIntensity * 80;
                const endX = centerX + Math.cos(streakAngle) * (streakDist - trailLength);
                const endY = centerY + Math.sin(streakAngle) * (streakDist - trailLength) * 0.5;

                const streakAlpha = (1 - p * 0.6) * (0.4 + (streak % 5) * 0.1);

                const streakGrad = ctx.createLinearGradient(x, y, endX, endY);
                streakGrad.addColorStop(0, `rgba(150, 200, 255, ${streakAlpha * 0.2})`);
                streakGrad.addColorStop(0.5, `rgba(200, 230, 255, ${streakAlpha * 0.7})`);
                streakGrad.addColorStop(1, `rgba(255, 255, 255, ${streakAlpha})`);

                ctx.strokeStyle = streakGrad;
                ctx.lineWidth = 2 + (streak % 3);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            // ============================================
            // SINGULARITY CORE (building up to explosion)
            // ============================================
            const coreSize = 30 + implosionIntensity * 100;
            const coreIntensity = 0.5 + implosionIntensity * 0.5;

            // Intensifying central point
            const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
            coreGrad.addColorStop(0, `rgba(255, 255, 255, ${coreIntensity})`);
            coreGrad.addColorStop(0.3, `rgba(220, 240, 255, ${coreIntensity * 0.8})`);
            coreGrad.addColorStop(0.6, `rgba(150, 200, 255, ${coreIntensity * 0.4})`);
            coreGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 3: WHITE FLASH (88-92%)
        // Violent release of energy - complete white (Now very quick)
        // ==========================================
        if (progress >= 0.88 && progress < 0.92) {
            const p = (progress - 0.88) / 0.04;

            // Sharp ramp to full white
            const whiteIntensity = p < 0.2 ? Math.pow(p / 0.2, 0.5) : 1.0;

            // Complete solid white
            ctx.fillStyle = `rgba(255, 255, 255, ${whiteIntensity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ensure complete obfuscation
            if (whiteIntensity >= 0.8) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 4: WHITE FADES TO REVEAL NEW LOCATION (92-100%)
        // ==========================================
        if (progress >= 0.92) {
            const p = (progress - 0.92) / 0.08;
            const fadeAlpha = Math.pow(1 - p, 1.2);

            // White overlay fading away to reveal the universe
            ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Residual glow at center as transition completes
            if (fadeAlpha > 0.1) {
                const glowSize = maxDim * 0.3 * fadeAlpha;
                const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
                glowGrad.addColorStop(0, `rgba(255, 255, 255, ${fadeAlpha})`);
                glowGrad.addColorStop(0.5, `rgba(200, 220, 255, ${fadeAlpha * 0.5})`);
                glowGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }

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

    drawBackgroundElements() {
        if (!this.config.showBackground) return;

        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx_offset = w / 2;
        const cy_offset = h / 2;

        // 1. Background Stars (from all active styles)
        if (this.backgroundStars && this.backgroundStars.length > 0) {
            const zoom = this.camera.zoom;
            this.backgroundStars.forEach(s => {
                const para = s.parallax || 0.1;
                
                const bgZoom = Math.pow(this.camera.zoom, 0.4);
                
                // Using + this.camera.x to match other backgrounds
                let sx = cx_offset + (s.x - this.playerShip.x * para) * bgZoom;
                let sy = cy_offset + (s.y - this.playerShip.y * para) * bgZoom;

                const screenRadius = s.r * zoom;
                if (screenRadius < 0.1) return; // Cull if too small to see
                
                if (sx + screenRadius < 0 || sx - screenRadius > w ||
                    sy + screenRadius < 0 || sy - screenRadius > h) return;

                ctx.fillStyle = s.color || "white";
                ctx.globalAlpha = s.alpha;
                ctx.beginPath();
                ctx.arc(sx, sy, screenRadius, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }

        // 2. Nebulae (from nebula + deep-space styles)
        if (this.nebulae && this.nebulae.length > 0) {
            ctx.globalCompositeOperation = 'screen';
            this.nebulae.forEach(n => {
                if (n.flownOut) return;

                let scale = 1.0;
                let alpha = 1.0;
                if (this.warpDisengaging && n.warpScale !== undefined) {
                    scale = n.warpScale || 0.01;
                    alpha = n.warpAlpha || 0;
                }

                const para = n.parallax || 0.2;
                // Wrapping bounds: ensure they seamlessly tile around the screen
                
                
                // Base background scaling (less aggressive than physical zoom)
                const bgZoom = Math.pow(this.camera.zoom, 0.4);
                
                // Screen coordinates (wrapping modulo to fill screen infinitely)
                // Wrap bounds perfectly spaced for the 9 grid items generated
                const wrapSize = 15000;
                let screenX = (n.x - this.playerShip.x * para) * bgZoom;
                let screenY = (n.y - this.playerShip.y * para) * bgZoom;
                
                // Modulo wrap to infinite tiling
                screenX = ((screenX % wrapSize) + wrapSize) % wrapSize;
                screenY = ((screenY % wrapSize) + wrapSize) % wrapSize;
                
                // Shift to center around screen
                const cx = screenX - wrapSize/2 + cx_offset;
                const cy = screenY - wrapSize/2 + cy_offset;

                const scaledSize = Math.max(0.1, n.size * scale);
                const scaledAlpha = n.alpha * alpha;

                if (cx < -scaledSize || cx > w + scaledSize || cy < -scaledSize || cy > h + scaledSize) return;

                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, scaledSize);
                grad.addColorStop(0, n.color);
                grad.addColorStop(1, 'transparent');

                ctx.globalAlpha = scaledAlpha;
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(cx, cy, scaledSize, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
        }

        // 2.5 Moving Cosmic Stars (shooting stars with tails)
        if (this.activeStyles.has('deep-space') && this.shootingStars && this.shootingStars.length > 0) {
            this.shootingStars.forEach(s => {
                const para = s.parallax || 0.5;
                
                const bgZoom = Math.pow(this.camera.zoom, 0.4);
                
                const cx = cx_offset + (s.x - this.playerShip.x * para) * bgZoom;
                const cy = cy_offset + (s.y - this.playerShip.y * para) * bgZoom;

                if (cx < -100 || cx > w + 100 || cy < -100 || cy > h + 100) return;

                ctx.save();
                const tailX = cx - s.vx * s.tailLength;
                const tailY = cy - s.vy * s.tailLength;

                const tailGrad = ctx.createLinearGradient(tailX, tailY, cx, cy);
                tailGrad.addColorStop(0, 'transparent');
                tailGrad.addColorStop(0.7, s.color + '40');
                tailGrad.addColorStop(1, s.color);

                ctx.strokeStyle = tailGrad;
                ctx.lineWidth = s.size * 0.8;
                ctx.lineCap = 'round';
                ctx.globalAlpha = s.alpha;

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(cx, cy);
                ctx.stroke();

                // Bright head streak
                const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy) || 1;
                const dirX = -s.vx / speed;
                const dirY = -s.vy / speed;
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = s.size * 1.5;
                ctx.globalAlpha = s.alpha + 0.3;
                ctx.beginPath();
                ctx.moveTo(cx + dirX * (s.size * 2), cy + dirY * (s.size * 2));
                ctx.lineTo(cx, cy);
                ctx.stroke();
                
                ctx.restore();
            });
            ctx.globalAlpha = 1;
        }

        // 3. Spacecraft (from alien style) - ENHANCED RENDERING
        if (this.activeStyles.has('alien') && this.spacecraft && this.spacecraft.length > 0) {
            const time = performance.now() * 0.001;
            this.spacecraft.forEach(s => {
                if (s.flownOut) return;

                const para = s.parallax || 0.4;
                
                const bgZoom = Math.pow(this.camera.zoom, 0.4);
                
                const cx = cx_offset + (s.x - this.playerShip.x * para) * bgZoom;
                const cy = cy_offset + (s.y - this.playerShip.y * para) * bgZoom;

                if (cx < -200 || cx > w + 200 || cy < -200 || cy > h + 200) return;

                ctx.save();
                ctx.translate(cx, cy);

                if (this.warpDisengaging && s.warpScale !== undefined) {
                    ctx.scale(s.warpScale, s.warpScale);
                    ctx.globalAlpha = s.warpAlpha || 0;
                }

                if (s.rotationSpeed) s.rotation += s.rotationSpeed;

                const size = s.size;
                const zoom = this.camera.zoom;
                const angle = Math.atan2(s.vy, s.vx);


                const baseColor = s.hullColor || '#00f3ff';
                const activeGlow = s.engineGlow || '#00f3ff';
                const timeStr = performance.now();

                switch(s.shipClass) {
                    case 'fighter':
                        this.drawNewFighter(ctx, size * 1.5, baseColor, activeGlow, timeStr);
                        break;
                    case 'cruiser':
                        this.drawNewCruiser(ctx, size * 1.5, baseColor, activeGlow, timeStr);
                        break;
                    case 'scout':
                    default:
                        this.drawNewScout(ctx, size * 1.5, baseColor, activeGlow, timeStr);
                        break;
                }

                ctx.restore();
            });
        }
    }
    drawMindwaveSun(ctx, color, radius, isBlackHole = false) {
        ctx.save();
        const scale = radius / 42;
        ctx.scale(scale, scale);

        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = color;
        ctx.shadowBlur = isBlackHole ? 30 : 60; // Stronger Bloom

        ctx.fillStyle = color;
        
        for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.rotate(i * Math.PI / 4);
            ctx.beginPath();
            ctx.moveTo(-4, -15);
            ctx.lineTo(4, -15);
            ctx.lineTo(0, -42);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.rotate(i * Math.PI / 4 + Math.PI / 8);
            ctx.beginPath();
            ctx.moveTo(-2, -15);
            ctx.lineTo(2, -15);
            ctx.lineTo(0, -32);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        ctx.beginPath();
        if (isBlackHole) {
            ctx.fillStyle = 'black';
            ctx.arc(0, 0, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = 'purple';
            ctx.shadowBlur = 10;
        } else {
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    drawDeepSpaceSpecific() {
        if (!this.config.showBackground) return;

        const ctx = this.ctx;
        const time = performance.now() * 0.0005;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const zoom = this.camera.zoom;

        // 1. Galaxies
        if (this.galaxies && this.galaxies.length > 0) {
            ctx.globalCompositeOperation = 'screen';
            this.galaxies.forEach(g => {
                if (g.flownOut) return;

                // Infinite wrapping so suns never run out
                const wrapRadius = 60000;
                let dx = g.x - this.playerShip.x;
                let dy = g.y - this.playerShip.y;
                if (!this.bgWarpMode) { // Only wrap if not in warp mode, otherwise they snap back during warp
                    while (dx > wrapRadius) dx -= wrapRadius * 2;
                    while (dx < -wrapRadius) dx += wrapRadius * 2;
                    while (dy > wrapRadius) dy -= wrapRadius * 2;
                    while (dy < -wrapRadius) dy += wrapRadius * 2;
                }
                
                const cx = this.playerShip.x + dx;
                const cy = this.playerShip.y + dy;

                // Simple culling
                const distToCamX = cx - (-this.camera.x / zoom);
                const distToCamY = cy - (-this.camera.y / zoom);
                const buffer = Math.max(g.size * 5, 4000 / zoom);
                if (Math.abs(distToCamX) > buffer || Math.abs(distToCamY) > buffer) return;

                ctx.save();
                ctx.translate(cx, cy);

                if (this.warpDisengaging && g.warpScale !== undefined) {
                    ctx.scale(g.warpScale, g.warpScale);
                    ctx.globalAlpha = g.warpAlpha || 0;
                }

                ctx.rotate(g.angle); // Static rotation only

                if (g.useTribal) {
                    // Original Mindwave Starburst Sun
                    this.drawMindwaveSun(ctx, g.color, g.size, false);
                } else {
                    // SVG Sun
                    if (this.svgSunImage && this.svgSunImage.complete && this.svgSunImage.naturalWidth !== 0) {
                        ctx.drawImage(this.svgSunImage, -g.size, -g.size, g.size * 2, g.size * 2);
                    } else {
                        // Fallback gradient
                        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.size);
                        grad.addColorStop(0, '#ffffff');
                        grad.addColorStop(0.2, g.color);
                        grad.addColorStop(1, 'transparent');
                        ctx.fillStyle = grad;
                        ctx.beginPath();
                        ctx.arc(0, 0, g.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                
                ctx.restore();
            });
            ctx.globalCompositeOperation = 'source-over';
        }

        // 2. Black Holes
        if (this.blackHoles && this.blackHoles.length > 0) {
            this.blackHoles.forEach(bh => {
                if (bh.flownOut) return;

                const para = 0.0;
                const cx = bh.x + this.playerShip.x * para;
                const cy = bh.y + this.playerShip.y * para;

                const screenX = w/2 + this.camera.x + cx * zoom;
                const screenY = h/2 + this.camera.y + cy * zoom;
                const screenRadius = bh.size * zoom;
                const buffer = Math.max(screenRadius * 5, 4000);
                if (screenX < -buffer || screenX > w + buffer || screenY < -buffer || screenY > h + buffer) return;

                ctx.save();
                
                // Reset transform to native screen resolution to prevent blurry radial gradients
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.translate(screenX, screenY);
                
                const oldSize = bh.size;
                bh.size *= zoom;

                if (this.warpDisengaging && bh.warpScale !== undefined) {
                    ctx.scale(bh.warpScale, bh.warpScale);
                    ctx.globalAlpha = bh.warpAlpha || 0;
                }

                // Performant black hole (Accretion disk + event horizon)
                const bhGrad = ctx.createRadialGradient(0, 0, bh.size * 0.3, 0, 0, bh.size * 1.5);
                bhGrad.addColorStop(0, 'transparent');
                bhGrad.addColorStop(0.2, '#ffaa00');
                bhGrad.addColorStop(0.5, '#5500ff');
                bhGrad.addColorStop(1, 'transparent');
                
                ctx.fillStyle = bhGrad;
                ctx.beginPath();
                ctx.ellipse(0, 0, bh.size * 1.5, bh.size * 0.5, time, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#000000';
                ctx.beginPath();
                ctx.arc(0, 0, bh.size * 0.4, 0, Math.PI * 2);
                ctx.fill();

                bh.size = oldSize;
                ctx.restore();
            });
        }

        // 3. Planets (with zoom-based detail and proper Saturn-style rings)
        if (this.planets && this.planets.length > 0) {
            this.planets.forEach(p => {
                if (p.flownOut) return;

                // Planets are interactive so they must NOT have parallax
                const cx = p.x;
                const cy = p.y;
                
                const screenRadius = p.radius * zoom;
                // Simple culling using world coords
                const distToCamX = cx - (-this.camera.x / zoom);
                const distToCamY = cy - (-this.camera.y / zoom);
                // Buffer accounts for rings which can be up to 3x radius
                const buffer = Math.max(p.radius * 4, 4000 / zoom);
                if (Math.abs(distToCamX) > buffer || Math.abs(distToCamY) > buffer) return;

                ctx.save();
                ctx.translate(cx, cy);

                if (this.warpDisengaging && p.warpScale !== undefined) {
                    ctx.scale(p.warpScale, p.warpScale);
                    ctx.globalAlpha = p.warpAlpha || 0;
                }

                const detailLevel = Math.min(3, Math.floor(screenRadius / 30));

                ctx.save();
                ctx.rotate(p.axialTilt); // Static axial tilt for rings and body texture

                if (p.hasRings) {
                    this.drawPlanetRingsHalf(ctx, p, 'back');
                }

                if (p.hasAtmosphere) {
                    const atmosGrad = ctx.createRadialGradient(0, 0, p.radius * 0.95, 0, 0, p.radius * 1.15);
                    const timeStr = performance.now() * 0.0005;
                    const atmosAlpha = (0.5 + Math.sin(timeStr * 2 + p.textureSeed) * 0.1).toFixed(2);
                    atmosGrad.addColorStop(0, 'transparent');
                    atmosGrad.addColorStop(0.5, p.atmosphereColor + Math.floor(atmosAlpha * 64).toString(16).padStart(2, '0'));
                    atmosGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = atmosGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, p.radius * 1.15, 0, Math.PI * 2);
                    ctx.fill();
                }

                const bodyGrad = ctx.createRadialGradient(
                    -p.radius * 0.3, -p.radius * 0.3, 0,
                    0, 0, p.radius
                );
                bodyGrad.addColorStop(0, p.secondaryColor);
                bodyGrad.addColorStop(0.4, p.baseColor);
                bodyGrad.addColorStop(0.8, p.tertiaryColor);
                bodyGrad.addColorStop(1, '#000000');

                ctx.fillStyle = bodyGrad;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.fill();

                if (detailLevel >= 1) {
                    ctx.globalAlpha = 0.3;
                    ctx.strokeStyle = p.tertiaryColor;
                    ctx.lineWidth = Math.max(1, 2 / zoom);

                    if (p.type === 'gas-giant' || p.type === 'ice-giant') {
                        for (let i = -4; i <= 4; i++) {
                            const bandY = p.radius * (i * 0.15);
                            const bandWidth = Math.sqrt(p.radius * p.radius - bandY * bandY);
                            if (bandWidth > 0) {
                                ctx.beginPath();
                                ctx.ellipse(0, bandY, bandWidth, 3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                        }
                    }

                    if ((p.type === 'terrestrial' || p.type === 'ocean') && detailLevel >= 2) {
                        ctx.fillStyle = p.type === 'ocean' ? p.baseColor : p.secondaryColor;
                        const seed = p.textureSeed;
                        for (let j = 0; j < 5; j++) {
                            const scx = Math.cos(seed + j * 1.2) * p.radius * 0.5;
                            const scy = Math.sin(seed * 0.7 + j) * p.radius * 0.4;
                            const cr = p.radius * (0.15 + Math.sin(seed + j) * 0.1);
                            ctx.beginPath();
                            ctx.arc(scx, scy, cr, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    ctx.globalAlpha = 1;
                }
                
                ctx.restore(); // Restore axial tilt so shadow is unrotated

                // Unrotated shadow (always opposite light source)
                const shadowGrad = ctx.createLinearGradient(-p.radius, 0, p.radius, 0);
                shadowGrad.addColorStop(0, 'transparent');
                shadowGrad.addColorStop(0.5, 'transparent');
                shadowGrad.addColorStop(1, 'rgba(0,0,0,0.8)');
                ctx.fillStyle = shadowGrad;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.rotate(p.axialTilt); // Reapply tilt for front rings
                if (p.hasRings) {
                    this.drawPlanetRingsHalf(ctx, p, 'front');
                }
                ctx.restore();

                ctx.restore();
            });
        }
    }
    drawPlanetRingsHalf(ctx, planet, half) {
        const p = planet;
        ctx.save();

        // Create clipping region for front or back half
        ctx.beginPath();
        if (half === 'back') {
            // Back half: top portion of ellipse (behind planet)
            ctx.rect(-p.ringOuterRadius * 1.5, -p.ringOuterRadius * 1.5, p.ringOuterRadius * 3, p.ringOuterRadius * 1.5);
        } else {
            // Front half: bottom portion of ellipse (in front of planet)
            ctx.rect(-p.ringOuterRadius * 1.5, 0, p.ringOuterRadius * 3, p.ringOuterRadius * 1.5);
        }
        ctx.clip();

        ctx.globalAlpha = half === 'back' ? 0.4 : 0.7; // Back rings dimmer

        // Multiple ring bands with gradient colors
        for (let i = 0; i < 5; i++) {
            const ringR = p.ringInnerRadius + (p.ringOuterRadius - p.ringInnerRadius) * (i / 5 + 0.1);
            const ringThickness = (p.ringOuterRadius - p.ringInnerRadius) * 0.12;

            ctx.strokeStyle = p.ringColor;
            ctx.lineWidth = ringThickness;

            ctx.beginPath();
            ctx.ellipse(0, 0, ringR, ringR * 0.25, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }

    drawStarShape(ctx, x, y, r) {
        ctx.beginPath();
        const pr = r * 0.5;
        ctx.moveTo(x, y - r);
        ctx.lineTo(x + pr, y - pr);
        ctx.lineTo(x + r, y);
        ctx.lineTo(x + pr, y + pr);
        ctx.lineTo(x, y + r);
        ctx.lineTo(x - pr, y + pr);
        ctx.lineTo(x - r, y);
        ctx.lineTo(x - pr, y - pr);
        ctx.closePath();
        ctx.fill();
    }

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
    rotate3D(x, y, z, centerX, centerY) {
        // Convert degrees to radians
        const radX = this.rotationX * Math.PI / 180;
        const radY = this.rotationY * Math.PI / 180;
        const radZ = this.rotationZ * Math.PI / 180;

        // Translate to origin (center of view)
        let px = x - centerX;
        let py = y - centerY;
        let pz = z;

        // Rotation around X axis
        let y1 = py * Math.cos(radX) - pz * Math.sin(radX);
        let z1 = py * Math.sin(radX) + pz * Math.cos(radX);
        py = y1;
        pz = z1;

        // Rotation around Y axis
        let x1 = px * Math.cos(radY) + pz * Math.sin(radY);
        z1 = -px * Math.sin(radY) + pz * Math.cos(radY);
        px = x1;
        pz = z1;

        // Rotation around Z axis
        x1 = px * Math.cos(radZ) - py * Math.sin(radZ);
        y1 = px * Math.sin(radZ) + py * Math.cos(radZ);
        px = x1;
        py = y1;

        // Simple perspective projection (optional depth effect)
        const fov = 800;
        const den = fov + pz;
        const scale = (Math.abs(den) < 0.001) ? 1000 : fov / den;

        // Translate back
        return {
            x: px * scale + centerX,
            y: py * scale + centerY,
            scale: scale
        };
    }

    // Inverse 3D Rotation: Project screen point back to 3D world (at Z=0 plane relative to rotation)
    inverseRotate3D(x, y, centerX, centerY) {
        // Negate angles for inverse rotation
        const radX = -this.rotationX * Math.PI / 180;
        const radY = -this.rotationY * Math.PI / 180;
        const radZ = -this.rotationZ * Math.PI / 180;

        // Translate to origin
        let px = x - centerX;
        let py = y - centerY;
        let pz = 0; // Assume we are clicking on the plane passing through center

        // Inverse Order: X^-1( Y^-1( Z^-1( P ) ) )
        // Note: Forward was RotZ(RotY(RotX(P))). Inverse is RotXinv(RotYinv(RotZinv(P))).

        // 1. Inverse Z Rotation
        let x1 = px * Math.cos(radZ) - py * Math.sin(radZ);
        let y1 = px * Math.sin(radZ) + py * Math.cos(radZ);
        px = x1;
        py = y1;

        // 2. Inverse Y Rotation
        x1 = px * Math.cos(radY) + pz * Math.sin(radY);
        let z1 = -px * Math.sin(radY) + pz * Math.cos(radY);
        px = x1;
        pz = z1;

        // 3. Inverse X Rotation
        y1 = py * Math.cos(radX) - pz * Math.sin(radX);
        z1 = py * Math.sin(radX) + pz * Math.cos(radX);
        py = y1;
        pz = z1;

        // Translate back
        return {
            x: px + centerX,
            y: py + centerY,
            z: pz
        };
    }

    // Reset rotation sliders and values
    resetRotation() {
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;

        const xSlider = document.getElementById('rotXSlider');
        const ySlider = document.getElementById('rotYSlider');
        const zSlider = document.getElementById('rotZSlider');

        if (xSlider) { xSlider.value = 0; document.getElementById('rotXValue').textContent = '0°'; }
        if (ySlider) { ySlider.value = 0; document.getElementById('rotYValue').textContent = '0°'; }
        if (zSlider) { zSlider.value = 0; document.getElementById('rotZValue').textContent = '0°'; }
    }

    calculateGeometry() {
        const lines = [];
        const adj = {};
        // Performance fix: use Map for O(1) star lookups
        const starMap = new Map();
        this.stars.forEach(s => {
            adj[s.id] = [];
            starMap.set(s.id, s);
        });

        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const s1 = this.stars[i];
                const s2 = this.stars[j];
                const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);

                if (dist < this.config.maxConnectDist) {
                    lines.push({ s1, s2, dist });
                    adj[s1.id].push(s2.id);
                    adj[s2.id].push(s1.id);
                }
            }
        }

        // BFS for clusters
        const clusters = [];
        const visited = new Set();
        this.stars.forEach(star => {
            if (!visited.has(star.id)) {
                const cluster = [];
                const queue = [star.id];
                visited.add(star.id);
                while (queue.length) {
                    const id = queue.shift();
                    const s = starMap.get(id); // O(1) lookup
                    if (s) cluster.push(s);
                    adj[id].forEach(nid => {
                        if (!visited.has(nid)) {
                            visited.add(nid);
                            queue.push(nid);
                        }
                    });
                }
                if (cluster.length > 0) clusters.push(cluster);
            }
        });

        return { lines, clusters };
    }

    shareScore() {
        if (window.logGameEvent) window.logGameEvent('share_score_clicked');
        if (navigator.share) {
            navigator.share({
                title: 'Interstellar Game',
                text: `I've reached Sector ${this.level} and collected ${this.playerStats.totalGemsCollected} Gems in Interstellar! Can you beat my score?`,
                url: window.location.href,
            }).then(() => {
                if (window.logGameEvent) window.logGameEvent('share_score_success');
                this.showToast('Thanks for sharing!');
            }).catch(console.error);
        } else {
            // Fallback for desktop
            navigator.clipboard.writeText(`I've reached Sector ${this.level} and collected ${this.playerStats.totalGemsCollected} Gems in Interstellar! Can you beat my score? Play at: ${window.location.href}`);
            this.showToast('Score copied to clipboard!');
        }
    }

    loadSettings() {
        try {
            this.settings = JSON.parse(localStorage.getItem('gameSettings')) || {
                particles: true,
                background: true,
                haptics: true
            };
        } catch(e) {
            this.settings = { particles: true, background: true, haptics: true };
        }
        
        // Sync UI
        const pCheck = document.getElementById('settingParticles');
        if (pCheck) pCheck.checked = this.settings.particles;
        const bCheck = document.getElementById('settingBackground');
        if (bCheck) bCheck.checked = this.settings.background;
        const hCheck = document.getElementById('settingHaptics');
        if (hCheck) hCheck.checked = this.settings.haptics;
    }

    updateSettings() {
        const pCheck = document.getElementById('settingParticles');
        const bCheck = document.getElementById('settingBackground');
        const hCheck = document.getElementById('settingHaptics');
        
        this.settings = {
            particles: pCheck ? pCheck.checked : true,
            background: bCheck ? bCheck.checked : true,
            haptics: hCheck ? hCheck.checked : true
        };
        
        localStorage.setItem('gameSettings', JSON.stringify(this.settings));
        this.showToast('Settings saved!');
    }

    checkDailyLogin() {
        const lastLogin = localStorage.getItem('lastDailyLogin');
        const today = new Date().toDateString();

        if (lastLogin !== today) {
            // First login today!
            this.playerGems += 500;
            this.saveGems();
            localStorage.setItem('lastDailyLogin', today);
            
            // Wait a moment for UI to initialize
            setTimeout(() => {
                this.showToast('🎁 Daily Login Reward: +500 Gems!');
                if (window.hapticFeedback) window.hapticFeedback([50, 50, 50]); // Success haptic
                if (window.logGameEvent) window.logGameEvent('daily_reward_claimed', { amount: 500 });
            }, 2000);
        }
    }

    checkOfflineProgression() {
        const lastActiveStr = localStorage.getItem('lastActiveTime');
        if (!lastActiveStr) return; // First time playing
        
        const lastActive = parseInt(lastActiveStr, 10);
        const now = Date.now();
        const elapsedMs = now - lastActive;
        const elapsedHours = elapsedMs / (1000 * 60 * 60);

        // If away for more than 1 hour and has a space base deployed
        if (elapsedHours >= 1 && this.spaceBase && this.spaceBase.isDeployed) {
            // Cap offline progression to 24 hours
            const hoursToReward = Math.min(elapsedHours, 24);
            const gemsPerHour = 50 + (this.level * 10); // Reward scales with sector level
            const offlineGems = Math.floor(hoursToReward * gemsPerHour);
            
            this.playerGems += offlineGems;
            this.saveGems();
            
            setTimeout(() => {
                this.showToast(`💤 Offline Earnings: +${offlineGems} Gems from your Base!`);
                if (window.hapticFeedback) window.hapticFeedback([30, 80, 30]);
                if (window.logGameEvent) window.logGameEvent('offline_progression_claimed', { amount: offlineGems, hours: hoursToReward });
            }, 4000);
        }
    }

    // --- PUSH NOTIFICATIONS ---
    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            // Only ask after tutorial is completed or on subsequent launches
            setTimeout(() => {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        if (window.logGameEvent) window.logGameEvent('notifications_enabled');
                        this.showToast('Notifications Enabled! We will remind you about offline earnings.');
                    }
                });
            }, 5000);
        }
    }

    // --- ACHIEVEMENTS SYSTEM ---
    get achievementsConfig() {
        return [
            { id: 'first_blood', name: 'First Blood', desc: 'Destroy your first enemy ship.', condition: () => this.playerStats && this.playerStats.enemiesDefeated >= 1, reward: 100 },
            { id: 'veteran_pilot', name: 'Veteran Pilot', desc: 'Destroy 50 enemies.', condition: () => this.playerStats && this.playerStats.enemiesDefeated >= 50, reward: 500 },
            { id: 'deep_space', name: 'Deep Space', desc: 'Reach Sector 10.', condition: () => this.level >= 10, reward: 1000 },
            { id: 'gem_hoarder', name: 'Gem Hoarder', desc: 'Accumulate 10,000 gems.', condition: () => this.playerStats && this.playerStats.totalGemsCollected >= 10000, reward: 2000 },
            { id: 'base_commander', name: 'Base Commander', desc: 'Deploy your space base.', condition: () => this.spaceBase && this.spaceBase.isDeployed, reward: 500 }
        ];
    }

    checkAchievements() {
        if (!this.playerStats) return;
        if (!this.playerStats.unlockedAchievements) {
            this.playerStats.unlockedAchievements = [];
        }
        
        let newUnlock = false;
        this.achievementsConfig.forEach(ach => {
            if (!this.playerStats.unlockedAchievements.includes(ach.id)) {
                try {
                    if (ach.condition()) {
                        this.playerStats.unlockedAchievements.push(ach.id);
                        this.playerGems += ach.reward;
                        newUnlock = true;
                        
                        setTimeout(() => {
                            this.showToast(`🏅 Achievement Unlocked: ${ach.name}! (+${ach.reward} Gems)`);
                            if (window.hapticFeedback) window.hapticFeedback([50, 100, 50, 100]);
                            if (window.logGameEvent) window.logGameEvent('achievement_unlocked', { id: ach.id });
                        }, 500);
                    }
                } catch (e) {
                    // Ignore errors in condition checks
                }
            }
        });
        
        if (newUnlock) {
            this.saveGems();
            this.saveStats();
        }
    }

    populateAchievements() {
        const container = document.getElementById('achievementsList');
        if (!container) return;
        
        if (!this.playerStats || !this.playerStats.unlockedAchievements) {
            if (this.playerStats) this.playerStats.unlockedAchievements = [];
        }
        
        container.innerHTML = '';
        const unlockedCount = this.playerStats && this.playerStats.unlockedAchievements ? this.playerStats.unlockedAchievements.length : 0;
        const totalCount = this.achievementsConfig.length;
        
        const header = document.createElement('div');
        header.style.cssText = 'text-align:center; color:#888; font-size:12px; margin-bottom:10px;';
        header.textContent = `${unlockedCount} / ${totalCount} Unlocked`;
        container.appendChild(header);

        this.achievementsConfig.forEach(ach => {
            const isUnlocked = this.playerStats && this.playerStats.unlockedAchievements && this.playerStats.unlockedAchievements.includes(ach.id);
            const item = document.createElement('div');
            item.style.cssText = `
                padding: 10px;
                background: ${isUnlocked ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
                border: 1px solid ${isUnlocked ? 'rgba(0, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                opacity: ${isUnlocked ? '1' : '0.5'};
            `;
            
            item.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <strong style="color:${isUnlocked ? '#00ffff' : '#fff'}">${ach.name}</strong>
                    <span style="font-size:10px; color:#ffd700;">💎 ${ach.reward}</span>
                </div>
                <div style="font-size:12px; color:#ccc;">${ach.desc}</div>
                <div style="font-size:10px; margin-top:4px; color:${isUnlocked ? '#00ff88' : '#888'}">
                    ${isUnlocked ? '✓ Unlocked' : 'Locked'}
                </div>
            `;
            container.appendChild(item);
        });
    }

    showToast(msg) {
        console.log('[Toast]', msg);
        if (window.hapticFeedback) window.hapticFeedback(15);
        // Create a toast element if needed
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:8px;z-index:9999;transition:opacity 0.3s';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(this._toastTimeout);
        this._toastTimeout = setTimeout(() => { toast.style.opacity = '0'; }, 2000);
    }

    // Ship Selection Methods
    showShipModal() {
        const modal = document.getElementById('shipModal');
        if (modal) {
            if (window.logGameEvent) window.logGameEvent('hangar_opened');
            modal.style.display = 'flex';
            modal.classList.add('active'); 
            this.gamePaused = true; // Auto-pause game while in hangar
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
            this.gamePaused = false; // Unpause when exiting hangar
            // Delay hidding display to allow transition
            setTimeout(() => {
                if (!modal.classList.contains('active')) {
                    modal.style.display = 'none';
                }
            }, 500);
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
            case 'valkyrie': this.drawValkyrie(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'leviathan': this.drawLeviathan(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'wraith': this.drawWraith(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'pulsar': this.drawPulsar(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'nomad': this.drawNomad(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'eclipse': this.drawEclipse(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'hyperion': this.drawHyperion(ctx, size, shipColor, 1.0, Date.now()); break;
            case 'archangel': this.drawArchangel(ctx, size, shipColor, 1.0, Date.now()); break;
            default:
                this.drawInterceptor(ctx, size, shipColor, 1.0);
                break;
        }
        ctx.restore();
    }




    captureConstellation() {
        if (this.stars.length < 3) {
            this.showToast("Draw at least 3 stars first!");
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
        const lines = this.calculateGeometry().lines; // Get current lines
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

        this.showToast("Constellation SAVED as Spacecraft!");
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
            this.showToast(`🔒 ${ship.name} requires unlocking!`, 3000);
            return;
        }

        if (ship && this.playerShip) {
            this.playerShip.type = shipType;
            this.playerShip.maxSpeed = ship.maxSpeed;
            this.playerShip.acceleration = ship.acceleration;

            // Save ship type to localStorage for persistence
            localStorage.setItem('playerShipType', shipType);
            console.log(`[Hangar] Selected ${shipType}`);

            this.showToast(`SYSTEMS ONLINE: ${ship.name.toUpperCase()} CLASS`, 2000);

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

            this.showToast(`✨ UNLOCKED ${shipId.toUpperCase()}! ✨`, 3000);

            // Refresh Hangar UI to reflect the unlocked state
            this.initHangar();

            // Automatically select the newly unlocked ship
            this.selectShip(shipId);
            if (this.updateGemsUI) this.updateGemsUI();
        } else {
            this.showToast("Insufficient Gems!", 2000);
        }
    }

    toggleAutopilot() {
        this.autopilot = !this.autopilot;
        const btn = document.querySelector('button[onclick="app.toggleAutopilot()"]');
        if (btn) {
            btn.classList.toggle('active', this.autopilot);
            btn.style.color = this.autopilot ? '#00f3ff' : '#5c7a8a';
        }
        this.showToast(this.autopilot ? "Autopilot ENGAGED" : "Autopilot DISENGAGED");
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
            this.showToast("Universe is empty!");
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

        const { lines, clusters } = this.calculateGeometry();

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
            this.showToast("Map Exported");
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

        this.showToast("Map Exported");
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

        this.showToast("Image saved as " + filename);
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
                    this.showToast("No stars found in SVG");
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
                this.showToast(`Loaded ${this.stars.length} stars`);
                this.draw();
            } catch (err) {
                console.error('Error parsing SVG:', err);
                this.showToast("Error loading SVG file");
            }
        };
        reader.readAsText(file);
    }

    // Export canvas animation as video
    exportVideo() {
        if (this._isRecording) {
            this.showToast("Already recording...");
            return;
        }

        // Get selected duration
        const durationSelect = document.getElementById('videoDuration');
        const duration = durationSelect ? parseInt(durationSelect.value) : 5000;
        const durationSec = duration / 1000;

        this._isRecording = true;
        const btn = document.getElementById('exportVideoBtn');
        if (btn) btn.classList.add('active');

        this.showToast(`Recording ${durationSec} seconds...`);

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

            this.showToast("Video exported!");
        };

        recorder.onerror = (e) => {
            this._isRecording = false;
            if (btn) btn.classList.remove('active');
            console.error('Recording error:', e);
            this.showToast("Recording failed");
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
            const isHidden = panel.classList.toggle('hidden');
            if (this.flightMode) this.gamePaused = !isHidden;
            this.updateAdminDebugInfo();
        }
    }

    // --- MUSIC SETTINGS UI ---

    updateBinauralFrequencies() {
        const baseSlider = document.getElementById('binauralBaseValue');
        const beatSlider = document.getElementById('binauralBeatValue');
        if (baseSlider && beatSlider && window.gameAudio) {
            const base = parseFloat(baseSlider.value);
            const beat = parseFloat(beatSlider.value);
            console.log("[Music UI] Updating Binaural Frequencies:", base, beat);
            window.gameAudio.updateBinauralFrequencies(base, beat);
            
            // Update labels
            const baseLabel = document.getElementById('baseFreqDisplay');
            const beatLabel = document.getElementById('beatFreqDisplay');
            if (baseLabel) baseLabel.innerText = base + ' Hz';
            if (beatLabel) beatLabel.innerText = beat + ' Hz';
        }
    }

    openMusicSettings() {
        console.log("[Music UI] Opening Music Settings Modal");
        const modal = document.getElementById('musicSettingsModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            // Trigger reflow
            void modal.offsetWidth;
            modal.classList.add('active');
            if (window.game) {
                this._wasPausedBeforeMusic = window.game.gamePaused;
                if (!window.game.gamePaused) {
                    window.game.gamePaused = true;
                    // Intentionally NOT stopping the engine hum here to keep audio running smoothly
                }
            }

            // Sync sliders & buttons with audio state
            if (window.gameAudio) {
                const masterSlider = document.getElementById('masterVolumeSlider');
                if (masterSlider) masterSlider.value = window.gameAudio.volume;
                const masterBtn = document.getElementById('masterMuteToggleBtn');
                if (masterBtn) masterBtn.textContent = `Mute: ${window.gameAudio.masterMuted ? 'ON' : 'OFF'}`;

                const musicSlider = document.getElementById('musicVolumeSlider');
                if (musicSlider) musicSlider.value = window.gameAudio.musicVolume;
                const musicBtn = document.getElementById('muteToggleBtn');
                if (musicBtn) musicBtn.textContent = `Mute: ${window.gameAudio.muted ? 'ON' : 'OFF'}`;

                const engineSlider = document.getElementById('engineVolumeSlider');
                if (engineSlider) engineSlider.value = window.gameAudio.engineVolume;
                const engineBtn = document.getElementById('engineMuteBtn');
                if (engineBtn) engineBtn.textContent = `Mute: ${window.gameAudio.engineHumMuted ? 'ON' : 'OFF'}`;
            }
        } else {
            console.error("[Music UI] Error: musicSettingsModal not found in DOM");
        }
    }

    closeMusicSettings() {
        console.log("[Music UI] Closing Music Settings Modal");
        const modal = document.getElementById('musicSettingsModal');
        if (modal) {
            modal.classList.remove('active');
            if (window.game && !this._wasPausedBeforeMusic && window.game.gamePaused) {
                window.game.gamePaused = false;
                if (window.gameAudio && !window.gameAudio.engineHumMuted) {
                    window.gameAudio.startEngineHum();
                }
            }
            
            setTimeout(() => { 
                modal.classList.add('hidden'); 
                modal.style.display = 'none';
            }, 300);
        }
    }

    switchMusicTab(tab) {
        const tabs = ['binaural', 'classical', 'jazz', 'ai'];
        tabs.forEach(t => {
            const btn = document.getElementById(`musicTabBtn_${t}`);
            const content = document.getElementById(`musicTab_${t}`);
            if (btn) {
                btn.classList.remove('active');
                btn.style.background = 'rgba(255,255,255,0.05)';
                btn.style.borderColor = 'rgba(255,255,255,0.3)';
                btn.style.boxShadow = 'none';
            }
            if (content) content.style.display = 'none';
        });

        const activeBtn = document.getElementById(`musicTabBtn_${tab}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.style.background = 'rgba(0,243,255,0.3)';
            activeBtn.style.borderColor = '#00f3ff';
            activeBtn.style.boxShadow = '0 0 15px rgba(0,243,255,0.5)';
        }
        const activeContent = document.getElementById(`musicTab_${tab}`);
        if (activeContent) activeContent.style.display = 'block';
    }

    setMusicVolume(vol) {
        const parsed = parseFloat(vol);
        window.gameAudio.setMusicVolume(parsed);
        localStorage.setItem('audioMusicVolume', parsed);
    }

    setMasterVolume(vol) {
        const parsed = parseFloat(vol);
        window.gameAudio.setMasterVolume(parsed);
    }

    setEngineVolume(vol) {
        const parsed = parseFloat(vol);
        window.gameAudio.setEngineVolume(parsed);
    }

    toggleMasterMute() {
        const isMuted = window.gameAudio.toggleMasterMute();
        const btn = document.getElementById('masterMuteToggleBtn');
        if (btn) btn.textContent = `Mute: ${isMuted ? 'ON' : 'OFF'}`;
    }

    toggleMute() {
        const isMuted = window.gameAudio.toggleMute();
        const btn1 = document.getElementById('muteToggleBtn');
        if (btn1) btn1.textContent = `Mute: ${isMuted ? 'ON' : 'OFF'}`;
        const btn2 = document.getElementById('audioMuteBtn');
        if (btn2) btn2.textContent = isMuted ? '🔇 MUSIC MUTED' : '🔊 MUSIC ON';
    }

    toggleEngineHum() {
        const isHumMuted = window.gameAudio.toggleEngineHum();
        const btn = document.getElementById('engineHumBtn');
        if (btn) btn.innerHTML = isHumMuted ? '🚀 <span class="hide-mobile">HUM: OFF</span>' : '🚀 <span class="hide-mobile">HUM: ON</span>';
        const muteBtn = document.getElementById('engineMuteBtn');
        if (muteBtn) muteBtn.textContent = `Mute: ${isHumMuted ? 'ON' : 'OFF'}`;
        if (!isHumMuted) {
            window.gameAudio.startEngineHum();
        }
    }

    toggleSfx() {
        const isSfxMuted = window.gameAudio.toggleSfx();
        const btn = document.getElementById('sfxMuteBtn');
        if (btn) btn.innerHTML = isSfxMuted ? '💥 <span class="hide-mobile">SFX: OFF</span>' : '💥 <span class="hide-mobile">SFX: ON</span>';
    }


    stopAllMusic() {
        window.gameAudio.stopAllMusic();
        this._highlightMusicButton(null);
    }

    setBinauralPreset(beatFreq, baseFreq, btn) {
        if (btn) this._highlightMusicButton(btn);
        document.getElementById('binauralBaseSlider').value = baseFreq;
        document.getElementById('binauralBaseValue').textContent = baseFreq + 'Hz';
        document.getElementById('binauralBeatSlider').value = beatFreq;
        document.getElementById('binauralBeatValue').textContent = beatFreq + 'Hz';
        window.gameAudio.playBinauralLoop(baseFreq, beatFreq);
        if (this.showToast) this.showToast(`Binaural Beats: ${beatFreq}Hz`, 2000);
    }

    updateBinauralCustom() {
        const base = parseFloat(document.getElementById('binauralBaseSlider').value);
        const beat = parseFloat(document.getElementById('binauralBeatSlider').value);
        document.getElementById('binauralBaseValue').textContent = base + 'Hz';
        document.getElementById('binauralBeatValue').textContent = beat + 'Hz';
        
        // Debounce audio node creation to prevent AudioContext crash while dragging
        if (this.binauralDebounceTimer) clearTimeout(this.binauralDebounceTimer);
        this.binauralDebounceTimer = setTimeout(() => {
            window.gameAudio.updateBinauralFrequencies(base, beat);
        }, 300);
    }

    initMusicUI() {
        // Load settings and forcibly fix old broken defaults (<= 0.15)
        let savedMusicVol = localStorage.getItem('audioMusicVolume');
        if (savedMusicVol && parseFloat(savedMusicVol) <= 0.15) {
            savedMusicVol = "1.0"; // Force reset the volume if they were stuck on the old inaudible default
            localStorage.setItem('audioMusicVolume', "1.0");
        }
        
        if (savedMusicVol) {
            const slider = document.getElementById('musicVolumeSlider');
            if (slider) slider.value = savedMusicVol;
            window.gameAudio.setMusicVolume(savedMusicVol);
        } else {
            const slider = document.getElementById('musicVolumeSlider');
            if (slider) window.gameAudio.setMusicVolume(slider.value);
        }

        // Init Master Volume
        let savedMasterVol = localStorage.getItem('audioVolume');
        const masterSlider = document.getElementById('masterVolumeSlider');
        if (savedMasterVol) {
            if (masterSlider) masterSlider.value = savedMasterVol;
            window.gameAudio.setMasterVolume(savedMasterVol);
        } else if (masterSlider) {
            window.gameAudio.setMasterVolume(masterSlider.value);
        }

        // Init Engine Volume
        let savedEngineVol = localStorage.getItem('audioEngineVolume');
        const engineSlider = document.getElementById('engineVolumeSlider');
        if (savedEngineVol) {
            if (engineSlider) engineSlider.value = savedEngineVol;
            window.gameAudio.setEngineVolume(savedEngineVol);
        } else if (engineSlider) {
            window.gameAudio.setEngineVolume(engineSlider.value);
        }
        
        // Init Engine Mute UI
        const isHumMuted = window.gameAudio.engineHumMuted;
        const engineMuteBtn = document.getElementById('engineMuteBtn');
        if (engineMuteBtn) engineMuteBtn.textContent = `Mute: ${isHumMuted ? 'ON' : 'OFF'}`;

        // Global Playlists (Using guaranteed direct .mp3 links for Mac/Safari compatibility)
        this.playlists = {
            classical: [
                {name: "Mozart - Violin Concerto No. 3", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1775%20Mozart%20%2C%20Violin%20Concerto%20No.%203%20in%20G%2C%201st%20movement.mp3"},
                {name: "Beethoven - Moonlight Sonata", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1801%20Beethoven-%20%27Moonlight%27%20Sonata%2C%201st%20movement.mp3"},
                {name: "Chopin - Polonaise in A, Military", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1838%20Chopin%20-%20Polonaise%20in%20A%2C%20Op.40%20No.3%2C%20%27Military%27.mp3"},
                {name: "Bach - Toccata in D minor", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1709%20Bach%20%2C%20Toccata%20in%20D%20minor.mp3"},
                {name: "Vivaldi - Spring (The Four Seasons)", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1725%20Vivaldi%20%2C%20The%20Four%20Seasons%20-%20Spring.mp3"},
                {name: "Beethoven - Symphony No. 5", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1808%20Beethoven-%20Symphony%20No.%205%2C%201st%20movement.mp3"},
                {name: "Mozart - Symphony No. 40", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1788%20Mozart-%20Symphony%20No.%2040%2C%201st%20movement.mp3"},
                {name: "Albinoni - Adagio", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1730%20Albinoni%20%2C%20Adagio.mp3"},
                {name: "Purcell - Trumpet Tune and Air", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1685%20Purcell%20%2C%20Trumpet%20Tune%20and%20Air.mp3"},
                {name: "Pachelbel - Canon in D", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1698%20Pachelbel%20%2C%20Canon%20in%20D.mp3"},
                {name: "Handel - Water Music, Suite No. 2", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1717%20Handel%20%2C%20Water%20Music%2C%20Suite%20No.%202%20in%20D.mp3"},
                {name: "Bach - Brandenburg Concerto No. 3", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1721%20Bach%20%2C%20Brandenburg%20Concerto%20No.%203%2C%201st%20movement.mp3"},
                {name: "Bach - Minuet and Badinerie", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1721%20Bach%20%2C%20Minuet%20and%20Badinerie%20%28from%20Orchestral%20Suite%20No.%202%20inB%20Minor%29.mp3"},
                {name: "Bach - Air (from Orchestral Suite No. 3)", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1727%20Bach%20%2C%20Air%20%28from%20Orchestral%20Suite%20No.%203%20in%20D%29.mp3"},
                {name: "Vivaldi - Mandoline Concerto in C", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1729%20Vivaldi%20%2C%20Mandoline%20Concerto%20in%20C%2C%20RV%20425.mp3"},
                {name: "Bach - Oboe Concerto in D minor", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1731%20Bach%20%2C%20Oboe%20Concerto%20in%20D%20minor%2C%202nd%20movement.mp3"},
                {name: "Vivaldi - Flute Concerto 'La Notte'", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1731%20Vivaldi%20%2C%20Flute%20Concerto%20in%20G%20minor%20%27La%20Notte%27%2C%20VI.%20Allegro.mp3"},
                {name: "Handel - Largo (from 'Xerxes')", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1734%20Handel%20%2C%20Largo%20%28from%20%27Xerxes%27%29.mp3"},
                {name: "Handel - 'Hallelujah' (from 'Messiah')", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1742%20Handel%20%2C%20%27Hallelujah%27%20%28from%20%27Messiah%27%29.mp3"},
                {name: "Handel - Arrival of the Queen of Sheba", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1749%20Handel%20%2C%20Arrival%20of%20the%20Queen%20of%20Sheba%20%28from%20%27Solomon%27%29.mp3"},
                {name: "Gluck - Dance of the Blessed Spirits", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1762%20Gluck%20%2C%20Dance%20of%20the%20Blessed%20Spirtis%20%28from%20%27Orpheus%20and%20Eurydice%27%29.mp3"},
                {name: "Mozart - Violin Concerto No. 5", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1775%20Mozart%20%2C%20Violin%20Concerto%20No.%205%20in%20A%2C%202nd%20Movement.mp3"},
                {name: "Mozart - Clarinet Concerto", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1791%20Mozart-%20Clarinet%20Concerto%20in%20A%2C%202nd%20movement.mp3"},
                {name: "Mozart - The Magic Flute Overture", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1791%20Mozart-%20The%20Magic%20Flute%20-%20Overture.mp3"},
                {name: "Beethoven - Minuet in G", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1796%20Beethoven-%20Minuet%20in%20G.mp3"},
                {name: "Beethoven - Fur Elise", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1810%20Beethoven-%20Fur%20Elise.mp3"},
                {name: "Tchaikovsky - Piano Concerto No. 1", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1875%20Tchaikovsky-%20Piano%20Concerto%20No.%201%20in%20B%20flat%20minor%2C%201st%20movement%20%28excerpt%29.mp3"},
                {name: "Tchaikovsky - Marche Slave", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1876%20Tchaikovsky-%20Marche%20Slave%2C%20Op.%2031.mp3"},
                {name: "Tchaikovsky - Polonaise (Eugene Onegin)", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1878%20Tchaikovsky-%20Polonaise%2C%20from%20%27Eugene%20Onegin%27.mp3"},
                {name: "Tchaikovsky - Sleeping Beauty Introduction", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1889%20Tchaikovsky-%20The%20Sleeping%20Beauty%20-%20Introduction.mp3"},
                {name: "Tchaikovsky - Waltz of the Flowers", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1892%20Tchaikovsky-%20Waltz%20of%20the%20FLowers%2C%20from%20%27The%20Nutcracker%27.mp3"},
                {name: "R. Strauss - Also sprach Zarathustra", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1896%20R.%20Strauss%20-%20Also%20sprach%20Zarathustra%20-%20Fanfare.mp3"},
                {name: "Smetana - The Moldau", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1875%20Smetana-%20The%20Moldau.mp3"},
                {name: "Grieg - Morning (Peer Gynt)", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1876%20Grieg-%20Morning%2C%20from%20%27Peer%20Gynt%27.mp3"},
                {name: "Dvorak - Humoresque", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1894%20Dvorak%20-%20Humoresque.mp3"},
                {name: "J. Strauss II - Emperor Waltz", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1889%20J.%20Strauss%20II-%20Emperor%20Waltz.mp3"},
                {name: "Ravel - Bolero", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1928%20Ravel%20-%20Bolero.mp3"},
                {name: "Sibelius - Valse Triste", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1903%20Sibelius%20-%20Valse%20Triste.mp3"},
                {name: "Bizet - Les Toreadors (Carmen)", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1875%20Bizet-%20Les%20Toreadors%2C%20from%20%27Carmen%27.mp3"},
                {name: "Dvorak - Symphony No. 9 (New World)", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1893%20Dvorak-%20Symphony%20No.%209%2C%20%27From%20the%20New%20World%27%2C%202nd%20Movement.mp3"},
                {name: "Rimsky-Korsakov - Flight of the Bumblebee", url: "https://archive.org/download/100ClassicalMusicMasterpieces/1900%20Rimsky-Korsakov%20-%20Dance%20of%20the%20Bumble%20Bee.mp3"},
                {name: "Tchaikovsky - Swan Lake (Act II Theme)", url: "https://archive.org/download/SwanLakeActIistokowskiNbcSymMembers-rca/SwanLakeActIistokowskiNbcSymMembers-rca_64kb.mp3"}
            ],
            jazz: [
                {name: "Miles Davis & John Coltrane - So What", url: "https://archive.org/download/04-miles-davis-miles-davis-julian-cannonball-adderley-john-coltrane-bill-evans-w/01-Miles%20Davis%3B%20Miles%20Davis%2C%20Julian%20%27Cannonball%27%20Adderley%2C%20John%20Coltrane%2C%20Bill%20Evans%2C%20Wynton%20Kelly%2C%20Paul%20Chambers%2C%20Jimmy%20Cobb-So%20What.mp3"},
                {name: "Miles Davis & John Coltrane - Freddie Freeloader", url: "https://archive.org/download/04-miles-davis-miles-davis-julian-cannonball-adderley-john-coltrane-bill-evans-w/02-Miles%20Davis%3B%20Miles%20Davis%2C%20Julian%20%27Cannonball%27%20Adderley%2C%20John%20Coltrane%2C%20Bill%20Evans%2C%20Wynton%20Kelly%2C%20Paul%20Chambers%2C%20Jimmy%20Cobb-Freddie%20Freeloader.mp3"},
                {name: "Miles Davis & John Coltrane - Blue in Green", url: "https://archive.org/download/04-miles-davis-miles-davis-julian-cannonball-adderley-john-coltrane-bill-evans-w/03-Miles%20Davis%2C%20Bill%20Evans%3B%20Miles%20Davis%2C%20Julian%20%27Cannonball%27%20Adderley%2C%20John%20Coltrane%2C%20Bill%20Evans%2C%20Wynton%20Kelly%2C%20Paul%20Chambers%2C%20Jimmy%20Cobb-Blue%20in%20Green.mp3"},
                {name: "Miles Davis & John Coltrane - All Blues", url: "https://archive.org/download/04-miles-davis-miles-davis-julian-cannonball-adderley-john-coltrane-bill-evans-w/04-Miles%20Davis%3B%20Miles%20Davis%2C%20Julian%20%27Cannonball%27%20Adderley%2C%20John%20Coltrane%2C%20Bill%20Evans%2C%20Wynton%20Kelly%2C%20Paul%20Chambers%2C%20Jimmy%20Cobb-All%20Blues.mp3"},
                {name: "Miles Davis & John Coltrane - Flamenco Sketches", url: "https://archive.org/download/04-miles-davis-miles-davis-julian-cannonball-adderley-john-coltrane-bill-evans-w/05-Bronislau%20Kaper%2C%20Ned%20Washington%3B%20Miles%20Davis%2C%20Julian%20%27Cannonball%27%20Adderley%2C%20John%20Coltrane%2C%20Bill%20Evans%2C%20Wynton%20Kelly%2C%20Paul%20Chambers%2C%20Jimmy%20Cobb-Flamenco%20Sketches.mp3"},
                {name: "Frank Sinatra - Come Fly With Me", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2010/Come%20Fly%20With%20Me.mp3"},
                {name: "Frank Sinatra - Mack the Knife", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2020/Mack%20the%20Knife.mp3"},
                {name: "Frank Sinatra - Fly Me to the Moon", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%208/Fly%20Me%20to%20the%20Moon%20%28In%20Other%20Words%29.mp3"},
                {name: "Frank Sinatra - My Way", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2013/My%20Way.mp3"},
                {name: "Frank Sinatra - Theme From “New York, New York”", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2018/Theme%20From%20%E2%80%9CNew%20York%2C%20New%20York%E2%80%9D.mp3"},
                {name: "Frank Sinatra - Strangers in the Night", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2010/Strangers%20in%20the%20Night.mp3"},
                {name: "Frank Sinatra - That’s Life", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2011/That%E2%80%99s%20Life.mp3"},
                {name: "Frank Sinatra - I’ve Got You Under My Skin", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%206/I%E2%80%99ve%20Got%20You%20Under%20My%20Skin.mp3"},
                {name: "Frank Sinatra - Summer Wind", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2010/Summer%20Wind.mp3"},
                {name: "Frank Sinatra - Witchcraft", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%206/Witchcraft.mp3"},
                {name: "Frank Sinatra - The Way You Look Tonight", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%207/The%20Way%20You%20Look%20Tonight.mp3"},
                {name: "Frank Sinatra - Love and Marriage", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2010/Love%20and%20Marriage.mp3"},
                {name: "Frank Sinatra - I Get a Kick Out of You", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%204/I%20Get%20a%20Kick%20Out%20of%20You.mp3"},
                {name: "Frank Sinatra - Somethin’ Stupid", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2011/Somethin%E2%80%99%20Stupid.mp3"},
                {name: "Frank Sinatra - It Was a Very Good Year", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%209/It%20Was%20a%20Very%20Good%20Year.mp3"},
                {name: "Frank Sinatra - Luck Be a Lady", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%207/Luck%20Be%20a%20Lady.mp3"},
                {name: "Frank Sinatra - Young at Heart", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%206/Young%20at%20Heart.mp3"},
                {name: "Frank Sinatra - Night and Day", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2017/Night%20and%20Day.mp3"},
                {name: "Frank Sinatra - Moon River", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%207/Moon%20River.mp3"},
                {name: "Frank Sinatra - Let’s Face the Music and Dance", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2018/Let%E2%80%99s%20Face%20the%20Music%20and%20Dance.mp3"},
                {name: "Frank Sinatra - All the Way", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%206/All%20the%20Way.mp3"},
                {name: "Frank Sinatra - Just the Way You Are", url: "https://archive.org/download/Frank-Sinatra-Complete-Reprise-Studio-Recordings/Disc%2018/Just%20the%20Way%20You%20Are.mp3"},
                {name: "Sonic Universe (Avant-Garde Jazz Stream)", url: "https://ice1.somafm.com/sonicuniverse-128-mp3"},
                {name: "Illinois Street Lounge (Classic Jazz Stream)", url: "https://ice1.somafm.com/illstreet-128-mp3"},
                {name: "Secret Agent (Lounge Jazz Stream)", url: "https://ice1.somafm.com/secretagent-128-mp3"}
            ],
            ai: [
                {name: "Stellar Void", url: "https://ice1.somafm.com/dronezone-128-mp3"},
                {name: "Beat Blender", url: "https://ice1.somafm.com/beatblender-128-mp3"},
                {name: "Dub Step Ambient", url: "https://ice1.somafm.com/dubstep-128-mp3"},
                {name: "Cosmic Flow", url: "https://ice1.somafm.com/spacestation-128-mp3"},
                {name: "Synphaera Audio", url: "https://ice1.somafm.com/synphaera-128-mp3"},
                {name: "Lush Atmosphere", url: "https://ice1.somafm.com/lush-128-mp3"},
                {name: "Groove Salad", url: "https://ice1.somafm.com/groovesalad-128-mp3"},
                {name: "Dark Zone Ambient", url: "https://ice1.somafm.com/darkzone-128-mp3"},
                {name: "Deep Space One", url: "https://ice1.somafm.com/deepspaceone-128-mp3"},
                {name: "Nebula Drift", url: "https://ice1.somafm.com/fluid-128-mp3"},
                {name: "Galactic Core", url: "https://ice1.somafm.com/missioncontrol-128-mp3"},
                {name: "Event Horizon", url: "https://ice1.somafm.com/thetrip-128-mp3"},
                {name: "Quantum Fluctuations", url: "https://ice1.somafm.com/cliqhop-128-mp3"},
                {name: "Solar Winds", url: "https://ice1.somafm.com/defcon-128-mp3"},
                {name: "Dark Matter Streams", url: "https://ice1.somafm.com/vaporwaves-128-mp3"},
                {name: "Supernova Remnants", url: "https://ice1.somafm.com/suburbsofgoa-128-mp3"},
                {name: "Orbital Resonance", url: "https://ice1.somafm.com/dronezone-128-mp3"},
                {name: "Pulsar Beats", url: "https://ice1.somafm.com/groovesalad-128-mp3"}
            ]
        };

        // Premium Classical Tracks
        const classicalList = document.getElementById('classicalTrackList');
        if (classicalList) {
            let html = '';
            this.playlists.classical.forEach((track, index) => {
                html += `<button class="btn-secondary" data-orig-bg="rgba(212, 175, 55, 0.1)" style="border-color:#d4af37; color: #fff; background: rgba(212, 175, 55, 0.1);" onclick="app.playPlaylist('classical', ${index}, this)">🎻 ${track.name}</button>`;
            });
            classicalList.innerHTML = html;
        }

        // Premium Jazz Tracks
        const jazzList = document.getElementById('jazzTrackList');
        if (jazzList) {
            let html = '';
            this.playlists.jazz.forEach((track, index) => {
                html += `<button class="btn-secondary" data-orig-bg="rgba(181, 101, 29, 0.1)" style="border-color:#b5651d; color: #fff; background: rgba(181, 101, 29, 0.1);" onclick="app.playPlaylist('jazz', ${index}, this)">🎷 ${track.name}</button>`;
            });
            jazzList.innerHTML = html;
        }

        // AI-Created Tracks
        const aiList = document.getElementById('aiTrackList');
        if (aiList) {
            let html = '';
            this.playlists.ai.forEach((track, index) => {
                html += `<button class="btn-secondary" data-orig-bg="rgba(255, 100, 200, 0.1)" style="border-color:#ff64c8; color: #fff; background: rgba(255, 100, 200, 0.1);" onclick="app.playPlaylist('ai', ${index}, this)">✨ ${track.name}</button>`;
            });
            aiList.innerHTML = html;
        }
    }

    playProceduralAudio(btn, index, type) {
        // Deprecated: Kept for backwards compatibility if needed elsewhere
    }

    playPlaylist(category, startIndex, btn) {
        if (btn) this._highlightMusicButton(btn);
        
        const playlist = this.playlists[category];
        if (!playlist || playlist.length === 0) return;
        
        // Extract just the URLs for the audio engine
        const urls = playlist.map(t => t.url);
        
        if (this.showToast) this.showToast(`Loading: ${playlist[startIndex].name}`, 2000);
        
        this.currentPlaylistCategory = category;
        window.gameAudio.playStreamingMusic(urls, startIndex);
        
        this.updateNowPlayingName(startIndex);
    }

    updateNowPlayingName(index) {
        if (!this.currentPlaylistCategory || !this.playlists[this.currentPlaylistCategory]) return;
        const track = this.playlists[this.currentPlaylistCategory][index];
        if (!track) return;

        // Show Now Playing Banner in modal
        const banner = document.getElementById('nowPlayingBanner');
        const trackTitle = document.getElementById('nowPlayingTrackName');
        if (banner && trackTitle) {
            banner.style.display = 'flex';
            trackTitle.textContent = track.name;
        }

        // Show on flight HUD if it exists
        const hudTitle = document.getElementById('hudNowPlayingTitle');
        if (hudTitle) {
            hudTitle.textContent = "🎵 " + track.name;
        }
    }

    togglePlayPause() {
        if (window.gameAudio.isStreamingPlaying) {
            window.gameAudio.pauseStream();
        } else {
            window.gameAudio.resumeStream();
        }
    }

    nextTrack() {
        window.gameAudio.playNextTrack();
    }

    prevTrack() {
        window.gameAudio.playPreviousTrack();
    }

    updateMediaControlsUI(isPlaying) {
        const icon = isPlaying ? '⏸' : '▶';
        document.querySelectorAll('.media-playpause-btn').forEach(btn => {
            btn.textContent = icon;
        });
    }

    seekAudio(offset) {
        if (window.gameAudio) {
            window.gameAudio.seekStream(offset);
        }
    }

    scrubberChanged(val) {
        this.isScrubbing = true;
    }

    scrubberReleased(val) {
        if (window.gameAudio) {
            const pct = parseFloat(val) / 100;
            if (window.gameAudio.currentStreamingAudio && isFinite(window.gameAudio.currentStreamingAudio.duration)) {
                window.gameAudio.setStreamTime(pct * window.gameAudio.currentStreamingAudio.duration);
            }
        }
        this.isScrubbing = false;
    }

    formatTime(seconds) {
        if (!isFinite(seconds) || isNaN(seconds)) return "Live";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    updateScrubber(currentTime, duration) {
        if (this.isScrubbing) return;
        
        const curEl = document.getElementById('audioCurrentTime');
        const durEl = document.getElementById('audioDurationTime');
        const scrubEl = document.getElementById('audioScrubber');
        
        if (curEl) curEl.textContent = this.formatTime(currentTime);
        if (durEl) durEl.textContent = this.formatTime(duration);
        
        if (scrubEl && isFinite(duration) && duration > 0) {
            scrubEl.value = (currentTime / duration) * 100;
        } else if (scrubEl) {
            scrubEl.value = 0;
        }
    }

    _highlightMusicButton(btn) {
        // Remove active class from all music buttons
        document.querySelectorAll('#musicSettingsModal .btn-secondary').forEach(b => {
            if (b.textContent !== 'CLOSE GUIDE') {
                b.classList.remove('active');
                if (b.dataset.origBg) {
                    b.style.background = b.dataset.origBg;
                } else {
                    b.style.background = '';
                }
                // Keep the border color if it was specifically set
            }
        });
        // Add to current
        if (btn) {
            btn.classList.add('active');
            btn.style.background = 'rgba(0,243,255,0.2)';
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
                this.showToast(this.isPro ? "PREMIUM MODE ENABLED" : "PREMIUM MODE DISABLED");
                this.updateAdminDebugInfo();
            });
        }

        // Add Credits
        document.getElementById('adminAddCreditsBtn')?.addEventListener('click', () => {
            this.credits += 10000;
            this.updateWalletUI();
            this.showToast("ADDED $10,000 CREDITS");
        });

        // Add Minerals
        document.getElementById('adminAddMineralsBtn')?.addEventListener('click', () => {
            this.playerGems += 5000;
            localStorage.setItem('playerGems', this.playerGems);
            if (this.updateGemsUI) this.updateGemsUI();
            this.showToast(`ADDED 5000 GEMS (Total: ${this.playerGems})`);
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
            this.showToast("ALL SHIPS UNLOCKED!");
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
        
        this.gamePaused = true;
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
        this.gamePaused = false;
        
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
                this.updateWalletUI();
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
                this.showToast("Structure demolished.");
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
                this.showToast(`Cannot Afford! Need ${cost.toLocaleString()} Credits.`, 2000, true);
                return;
            }
            
            this.credits -= cost;
            this.saveCredits();
            this.saveSpaceBase();
            this.updateWalletUI();
            
            this.spaceBase[cellId] = this.baseTool;
            this.showToast(`${this.baseTool.toUpperCase()} constructed ($${cost})`);
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
        
        if (this.showToast) this.showToast("🚀 Save Data Exported");
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
                if (this.showToast) this.showToast("✅ Save Imported! Reloading...");
                setTimeout(() => location.reload(), 1500);
            } catch (err) {
                console.error("Failed to import save data", err);
                if (this.showToast) this.showToast("❌ Error: Invalid save file.");
            }
        };
        reader.readAsText(file);
    }

    respawnSpacecraftBackground() {
        const zRange = 3000;
        const shipClasses = [
            { name: 'scout', baseSize: 40, weight: 4 },
            { name: 'fighter', baseSize: 60, weight: 4 },
            { name: 'cruiser', baseSize: 100, weight: 2 }
        ];

        const pool = [];
        shipClasses.forEach(sc => {
            for (let w = 0; w < sc.weight; w++) pool.push(sc);
        });

        const shipClass = pool[Math.floor(Math.random() * pool.length)];
        const hue = Math.random() * 360;
        const dist = Math.sqrt(Math.random() * (16000000 - 2250000) + 2250000);
        const angle = Math.random() * Math.PI * 2;
        const isSaucer = shipClass.name === 'saucer';
        const size = shipClass.baseSize * 0.8 * (0.7 + Math.random() * 0.6);

        this.spacecraft.push({
            x: this.playerShip.x + Math.cos(angle) * dist,
            y: this.playerShip.y + Math.sin(angle) * dist,
            z: (Math.random() * zRange) - zRange / 2,
            vx: (Math.random() - 0.5) * (isSaucer ? 2 : 3),
            vy: (Math.random() - 0.5) * (isSaucer ? 2 : 3),
            size: size,
            shipClass: shipClass.name,
            complexity: shipClass.complexity,
            hullColor: isSaucer ? `hsl(${hue}, 10%, 50%)` : `hsl(${hue}, 30%, 40%)`,
            hullHighlight: isSaucer ? `hsl(${hue}, 5%, 85%)` : `hsl(${hue}, 20%, 70%)`,
            hullShadow: isSaucer ? `hsl(${hue}, 15%, 25%)` : `hsl(${hue}, 40%, 20%)`,
            engineColor: `hsl(${(hue + 180) % 360}, 100%, 60%)`,
            engineGlow: `hsl(${(hue + 180) % 360}, 100%, 85%)`,
            lightColor: `hsl(${Math.random() * 60 + 300}, 100%, 55%)`,
            lightColor2: `hsl(${Math.random() * 60}, 100%, 50%)`,
            lightPhase: Math.random() * Math.PI * 2,
            detailSeed: Math.random() * 1000,
            wingAngle: 0.3 + Math.random() * 0.4,
            engineCount: shipClass.name === 'mothership' ? 6 : (shipClass.name === 'destroyer' ? 4 : (shipClass.name === 'cruiser' ? 3 : 2)),
            domeColor: `hsl(${Math.random() * 180 + 160}, 80%, 70%)`,
            beamActive: Math.random() > 0.7,
            beamColor: `hsl(${Math.random() * 60 + 80}, 100%, 70%)`,
            ringCount: isSaucer ? Math.floor(Math.random() * 3) + 2 : 0,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            rotation: Math.random() * Math.PI * 2,
            hasShield: Math.random() > 0.8,
            shieldColor: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
            shieldPhase: Math.random() * Math.PI * 2,
            health: shipClass.name === 'mothership' ? 250 : (shipClass.name === 'destroyer' ? 120 : (shipClass.name === 'cruiser' ? 80 : 40)),
            maxHealth: shipClass.name === 'mothership' ? 250 : (shipClass.name === 'destroyer' ? 120 : (shipClass.name === 'cruiser' ? 80 : 40)),
            fireTimer: 0
        });
    }
}

// Bind utilities to prototype so existing `this.method` calls still work
Object.assign(InterstellarEngine.prototype, Utils);

window.game = new InterstellarEngine();
window.app = window.game; // Bridge for HTML handlers

// --- DASHCAM & ENGINE HARMONICS UI BINDINGS ---
class Dashcam {
    constructor(canvas, audioEngine) {
        this.canvas = canvas;
        this.audioEngine = audioEngine;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.stream = null;
    }

    start() {
        if (this.isRecording) return;
        this.recordedChunks = [];
        
        try {
            const videoStream = this.canvas.captureStream(30);
            const tracks = [...videoStream.getVideoTracks()];

            if (this.audioEngine && this.audioEngine.ctx && this.audioEngine.masterGain) {
                const audioDest = this.audioEngine.ctx.createMediaStreamDestination();
                this.audioEngine.masterGain.connect(audioDest);
                if (audioDest.stream.getAudioTracks().length > 0) {
                    tracks.push(audioDest.stream.getAudioTracks()[0]);
                }
            }

            this.stream = new MediaStream(tracks);
            
            let options = { mimeType: 'video/webm;codecs=vp9,opus' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options = { mimeType: 'video/webm' };
            }

            this.mediaRecorder = new MediaRecorder(this.stream, options);
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) this.recordedChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `interstellar-dashcam-${new Date().getTime()}.webm`;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            if (window.app) window.app.showToast('⏺ Dashcam Recording Started', 2000);
        } catch (e) {
            console.error("Dashcam error:", e);
        }
    }

    stop() {
        if (!this.isRecording || !this.mediaRecorder) return;
        this.mediaRecorder.stop();
        this.isRecording = false;
        if (window.app) window.app.showToast('⏺ Dashcam Stopped. Saving...', 2000);
    }
}

window.dashcam = new Dashcam(document.getElementById('canvas'), window.gameAudio);

const dashcamBtn = document.getElementById('dashcamBtn');
if (dashcamBtn) {
    dashcamBtn.addEventListener('click', () => {
        if (window.dashcam.isRecording) {
            window.dashcam.stop();
            dashcamBtn.style.color = '#ff3333';
            dashcamBtn.innerHTML = '⏺ Dashcam';
        } else {
            window.dashcam.start();
            dashcamBtn.style.color = '#ff0000';
            dashcamBtn.innerHTML = '⏹ Stop Rec';
        }
    });
}

const pitchSlider = document.getElementById('enginePitchSlider');
const harmonicsSlider = document.getElementById('engineHarmonicsSlider');
const pitchLabel = document.getElementById('pitchValueLabel');
const harmonicsLabel = document.getElementById('harmonicsValueLabel');

if (pitchSlider && harmonicsSlider && pitchLabel && harmonicsLabel) {
    pitchSlider.value = window.gameAudio.engineBasePitch || 60;
    harmonicsSlider.value = window.gameAudio.engineHarmonics || 3;
    pitchLabel.innerText = `${pitchSlider.value} Hz`;
    harmonicsLabel.innerText = `${harmonicsSlider.value} Hz`;

    const updateEngineParams = () => {
        const p = parseFloat(pitchSlider.value);
        const h = parseFloat(harmonicsSlider.value);
        pitchLabel.innerText = `${p} Hz`;
        harmonicsLabel.innerText = `${h} Hz`;
        window.gameAudio.setEngineHarmonicsSettings(p, h);
    };

    pitchSlider.addEventListener('input', updateEngineParams);
    harmonicsSlider.addEventListener('input', updateEngineParams);
}
