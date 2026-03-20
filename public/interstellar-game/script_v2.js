/**
 * Interstellar Map Engine v7.1 - Cinematic Stability Patch
 */
console.log('--- SCRIPT_V2.JS LOADING ---');
import { SpatialHash } from './spatial-hash.js';
import { setupAudio, gameAudio } from './audio-engine.js';
import { setupPlayerEngine } from './player-engine.js';
import { MiningDrone } from './drones.js';
import { PlayerTurret } from './turrets.js';
import { WingmanAI, updateFleet, renderWingman, WINGMAN_TYPES } from './fleet.js';
import { ANOMALY_TYPES, generateAnomalies, renderAnomaly } from './anomalies.js';
import { ARTIFACT_TYPES, activateArtifactAbility, updateArtifactEffects, renderArtifactEffects } from './artifacts.js';
import { renderStation, renderTowLine } from './station-renderer.js';
import { FACTIONS, adjustReputation, getRepLevel, isFactionHostile, isFactionFriendly, getActiveBonuses, generateFactionPatrols, renderFactionPatrol, renderFactionHUD } from './factions.js';
import { CAPITAL_SHIPS, trySpawnCapitalShip, renderCapitalShip, updateCapitalShip } from './capital-ships.js';
import { SHIP_MODULES, MODULE_SLOTS, RARITIES, loadEquippedModules, saveEquippedModules, loadModuleInventory, saveModuleInventory, getEquippedBonuses, renderLoadoutUI, closeLoadoutUI } from './ship-loadouts.js';
import { MISSION_TYPES, generateQuest, generateMissionBoard, updateQuestProgress, loadActiveQuests, saveActiveQuests, loadMissionBoard, saveMissionBoard, renderMissionBoardUI, closeMissionBoardUI, renderQuestTracker } from './quests.js';
import { setupUniverse } from './universe.js';
import { setupInput } from './input.js';
import { setupSaveSystem } from './save-system.js';
import { setupHangar } from './hangar.js';
import { setupTraining } from './training.js';
import { setupCrafting } from './crafting.js';
import { setupMissions } from './missions.js';
import { setupCombatEngine } from './combat-engine.js';
import { setupUi } from './ui.js';
import { setupRendering } from './rendering.js';
import { setupExport } from './export.js';
import { BIOMES, generateGalaxyMap, renderSectorMapUI, closeSectorMapUI, executeSectorJump, generateSectorInfrastructure } from './sectors.js';
import { ACHIEVEMENTS, calculatePrestigePoints, getPersistentBonuses, loadAchievements, saveAchievements, loadPrestige, savePrestige, renderAchievementUI, closeAchievementUI, setupAchievements } from './achievements.js';
import { Outpost, renderOutpost, OUTPOST_MODULES } from './outposts.js';
import { setupPhysics } from './physics.js';
import { setupUniverseEngine } from './universe-engine.js';
import { setupUiManager } from './ui-manager.js';
import { setupProcGen } from './proc-gen.js';
import { setupWindowManager } from './window-manager.js';
import { setupAdminPanel } from './admin-panel.js';
import { setupHazardEngine } from './hazard-engine.js';
import { setupBackgroundVisuals } from './background-visuals.js';
import { setupConstellations } from './constellations.js';
// special-effects.js removed — renderCyberEffect & renderPulsePing migrated to vfx-renderer.js
import { setupShipRenderer } from './ship-renderer.js';
import { setupEnvironmentRenderer } from './environment-renderer.js';
import { setupVfxRenderer } from './vfx-renderer.js';
import { setupUiRenderer } from './ui-renderer.js';
import { setupEffectsEngine } from './effects-engine.js';
import { setupAbilityEngine } from './ability-engine.js';
import { setupShipPainter } from './ship-painter.js';
import { DIFFICULTY_SETTINGS, BASE_MODULES, MINERAL_TYPES, GALAXY_ZONES, HANGAR_SHIPS, CORE_ACHIEVEMENTS, CRAFTING_RECIPES, CONSTELLATION_NAMES } from './game-data.js';

// Classes SpatialHash and AudioEngine moved to dedicated modules.
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
        this.camera = { x: 0, y: 0, zoom: 1, targetZoom: 1, shake: 0 };
        this.history = [];
        this.clusterNames = new Map(); // Store names for constellations: Map<starIdListKey, name>
        this.mode = 'draw'; // 'draw', 'select', 'flight'
        this.snapToGrid = false;
        this.activeColor = '#00f3ff';
        this.colorMode = 'fixed'; // 'fixed' or 'rainbow'
        this.activeStyles = new Set(); // Start with no backgrounds active
        this.matrixSpeedMultiplier = 1.0; // User-adjustable cyber speed
        this.matrixLengthMultiplier = 1.0; // User-adjustable cyber stream length
        this.matrixColor = '#00ff00'; // User-adjustable matrix stream color

        // PERFORMANCE DEBUG (Phase 36)
        this.showPerformance = false;
        this.fps = 0;
        this.lastFpsUpdate = 0;
        this.frameCount = 0;
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
        this.difficulty = localStorage.getItem('gameDifficulty') || 'pilot';
        if (!DIFFICULTY_SETTINGS[this.difficulty]) this.difficulty = 'pilot';

        this.credits = this.loadCredits();

        // Economy and Progression Loop
        this.playerGems = parseInt(localStorage.getItem('playerGems')) || 0;
        this.unlockedShips = JSON.parse(localStorage.getItem('unlockedShips')) || ['interceptor', 'hauler', 'orion', 'draco', 'phoenix'];

        // Mindwave Lotus Vitals Tracking
        this.totalLotusHealth = parseFloat(localStorage.getItem('totalLotusHealth')) || 0;
        this.totalLotusShield = parseFloat(localStorage.getItem('totalLotusShield')) || 0;

        // Progression State
        this.playerLevel = parseInt(localStorage.getItem('playerLevel')) || 1;
        this.playerXP = parseInt(localStorage.getItem('playerXP')) || 0;
        this.xpToNextLevel = parseInt(localStorage.getItem('xpToNextLevel')) || 1000;
        this.skillPoints = parseInt(localStorage.getItem('skillPoints')) || 0;
        this.skills = JSON.parse(localStorage.getItem('playerSkills')) || {
            hull: 0,
            engines: 0,
            weapons: 0,
            sensors: 0,
            magnet: 0
        };

        const savedUpgrades = this.loadUpgrades();

        this.playerShip = {
            type: 'default',
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
            upgrades: savedUpgrades,
            // Ability State
            lastDamageTime: 0,
            boostActive: false,
            boostStartTime: 0,
            boostMultiplier: 1.0,
            isCloaked: false,
            lastPulseTime: 0,
            cargoCapacity: 50 * (1 + (savedUpgrades.cargo || 0) * 0.5),
            cargoUsed: 0
        };
        this.maulerDebris = []; // Visual debris trails for Mauler
        this.speedLines = [];  // Visual speed indicators
        this.showGemValues = false; // Toggle for showing gem values
        this.isPro = false;         // Pro Pilot subscription status
        this.subscription = {};     // Full subscription details

        this.hazardGraceTimer = 300; // 5 seconds of safety at game start/sector entry

        this.activeBoss = null;    // Current boss entity
        this.activeMission = null; // Current mission objective
        this.missionsCompleted = parseInt(localStorage.getItem('missionsCompleted')) || 0;
        this.bossesDefeated = parseInt(localStorage.getItem('bossesDefeated')) || 0;
        this.missionBoardOpen = false;
        this.hazardEffect = null;  // Active effect: {type: 'supernova'|'blackhole', startTime, data}
        this.glowSprites = {};     // Cached offscreen canvases for fast rendering

        // Initialize arrays (Consolidated)
        this.spaceMines = [];
        this.missileBases = [];
        this.enemyMissiles = [];
        this.enemyShips = [];
        this.enemyBullets = [];
        this.lootItems = [];
        this.hazardSuns = [];
        this.auroraStations = [];
        this.asteroids = [];
        this.radiationZones = [];
        this.nebulaFogZones = [];
        this.staticStars = [];
        this.galaxies = [];
        this.blackHoles = [];
        this.shootingStars = [];
        this.backgroundStars = [];
        this.nebulae = [];
        this.planets = [];
        this.solarSystems = [];
        this.killFeed = [];
        this.speedLines = [];
        this.maulerDebris = [];
        this.matrixStreams = [];
        this.spacecraft = [];
        this.hazardBlackHoles = [];
        this.engineParticles = [];
        this.projectiles = [];
        this.damageParticles = [];

        this.solarFlare = {
            timer: 0, active: 0, warningTime: 300
        };

        // Pre-initialize glow sprites to prevent first-explosion lag
        setTimeout(() => this.initGlowSprites(), 100);

        // === SPACE BASE SYSTEM ===
        // Carried resources (on ship, at risk if player dies)
        this.carriedResources = this.loadCarriedResources();

        // Space Base - player's permanent base
        this.spaceBase = this.loadSpaceBase() || {
            x: 0, y: 0,
            isDeployed: false,
            isTowing: false,
            modules: [],
            resources: {}, // Safe storage (not lost on death)
        };

        // Base modules available
        this.baseModules = BASE_MODULES;

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

        // --- 8. Persistent State Network (Bridge) ---
        this.requestLoadData();
        window.addEventListener('message', (e) => this.handleBridgeMessage(e));

        // Mineral system
        this.minerals = [];
        this.mineralTypes = MINERAL_TYPES;

        // Galaxy zone configuration - determines element distribution
        this.galaxyZones = GALAXY_ZONES;

        // Resource deposits - persistent locations with finite resources
        this.resourceDeposits = [];

        // Defense entities
        this.sentinels = [];     // AI patrol drones
        this.forcefields = [];   // Energy barriers
        this.turrets = [];       // Stationary guns
        this.guardians = [];     // Boss-level protectors
        
        this.playerDrones = [];
        this.playerTurrets = [];
        this.playerFleet = [];
        this.playerInventory = this.loadInventory();

        // Phase 26: Anomaly & Artifact state
        this.anomalies = [];
        this.discoveredAnomalies = new Set();
        this.artifactInventory = this.loadArtifactInventory();
        this.equippedArtifact = localStorage.getItem('equippedArtifact') || null;
        this.artifactCooldowns = {};
        this.anomalyEncounterActive = false;

        // Phase 28: Faction & Capital Ship state
        this.factionReputation = this.loadFactionReputation();
        this.factionPatrols = [];
        this.capitalShips = [];
        this.lastCapitalCheck = 0;

        // Phase 29: Ship Loadout state
        this.equippedModules = loadEquippedModules();
        this.moduleInventory = loadModuleInventory();
        this.loadoutBonuses = getEquippedBonuses(this.equippedModules);

        // Phase 30: Quest state
        this.activeQuests = loadActiveQuests();

        // Phase 31: Sector Map state
        this.galaxyMap = generateGalaxyMap();
        this.currentSector = { x: 0, y: 0 };
        this.currentBiome = BIOMES.standard;
        this.sectorInfrastructure = []; // Phase 33: Jump Gates, POIs

        // Phase 35: Outpost System
        this.playerOutposts = []; 
        this.unlockedOutpostModules = ['extractor']; 
        this.loadOutposts();

        // Phase 36: Spatial Hashing for performance
        this.spatialHash = new SpatialHash(1000); // 1000px cells

        // Phase 32: Achievement & Prestige state
        this.unlockedAchievements = loadAchievements();
        this.prestigePoints = loadPrestige();
        this.metaStats = { kills: 0, minerals: 0, jumps: 0, anomalies: 0 };
        this.persistentBonuses = getPersistentBonuses(this.unlockedAchievements, this.prestigePoints);

        this.collectionNotifications = [];

        // Interaction State
        this.pointer = { x: 0, y: 0, startX: 0, startY: 0, isDown: false, dragging: false, lastWorldX: 0, lastWorldY: 0 };

        // Load Sun Images for Deep Space
        this.sunImage1 = new Image();
        // Left blank to trigger procedural rendering in rendering.js for suns

        // Load Tribal Sun Image (Branded Sun SVG from cursor.js)
        this.sunImage2 = new Image();
        const sunSVG2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <g>
                <polygon points="46,35 54,35 50,8"  fill="#ff5500" transform="rotate(0,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ff5500" transform="rotate(45,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ff5500" transform="rotate(90,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ff5500" transform="rotate(135,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ff5500" transform="rotate(180,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ff5500" transform="rotate(225,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ff5500" transform="rotate(270,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="#ff5500" transform="rotate(315,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ff5500" transform="rotate(22.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ff5500" transform="rotate(67.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ff5500" transform="rotate(112.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ff5500" transform="rotate(157.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ff5500" transform="rotate(202.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ff5500" transform="rotate(247.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ff5500" transform="rotate(292.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="#ff5500" transform="rotate(337.5,50,50)"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke="#ff5500" stroke-width="5"/>
            </g>
        </svg>`;
        this.sunImage2.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sunSVG2)}`;

        // Load Mindwave Lotus Image
        this.mindwaveImage = new Image();
        this.mindwaveImage.onerror = () => {
            console.warn('[MindwaveImage] Failed to load from:', this.mindwaveImage.src, '— trying fallback');
            if (this.mindwaveImage.src.includes('mindwave-logo-light.png') && !this.mindwaveImage._retried) {
                this.mindwaveImage._retried = true;
                this.mindwaveImage.src = '/mindwave-logo-light.png'; // Try absolute path from server root
            }
        };
        this.mindwaveImage.src = '../mindwave-logo-light.png';

        // 3D Rotation State (degrees)
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;

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
        this.hangarShips = HANGAR_SHIPS;
        this._hangarLoopRunning = false;

        this.highestWave = parseInt(localStorage.getItem('highestWave')) || 0;
        this.achievements = CORE_ACHIEVEMENTS;

        // --- CRAFTING & TRADING ---
        try {
            this.activeBuffs = JSON.parse(localStorage.getItem('activeBuffs')) || [];
            this.craftedPermanents = JSON.parse(localStorage.getItem('craftedPermanents')) || {};
        } catch (e) {
            this.activeBuffs = [];
            this.craftedPermanents = {};
        }
        this.tradingPostOpen = false;
        this.craftingRecipes = CRAFTING_RECIPES;

        // Performance
        this.init();
    }

    async initTemplates() {
        try {
            // Use fetch for JSON loading to avoid MIME type issues
            const [zodiac, animals, mythology] = await Promise.all([
                fetch('/interstellar-game/templates/zodiac.json').then(res => res.json()),
                fetch('/interstellar-game/templates/animals.json?bust=1').then(res => res.json()),
                fetch('/interstellar-game/templates/mythology.json').then(res => res.json())
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

        // Reset Camera to ensure visibility (User request: "put in middle of screen")
        this.camera = { x: 0, y: 0, zoom: 1 };

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
        // Constellation naming data moved to game-data.js
    }

    init() {
        window.game = this; // Expose for debugging
        window.app = this;  // Required for index.html onclick handlers
        window.addEventListener('resize', () => this.resize());

        // Load Pro State
        this.isPro = localStorage.getItem('isPro') === 'true';
        this.initAdminPanel();

        // Pointer Events (CORRECT - these functions exist!)
        this.canvas.addEventListener('pointerdown', e => this.onPointerDown(e));
        window.addEventListener('pointermove', e => this.onPointerMove(e));
        window.addEventListener('pointerup', e => this.onPointerUp(e));
        this.canvas.addEventListener('wheel', e => {
            console.log('[Zoom Event] Wheel event fired');
            this.onWheel(e);
        }, { passive: false });
        this.canvas.addEventListener('contextmenu', e => this.onRightClick(e)); // Right-click deletion

        window.addEventListener('keydown', e => {
            const key = e.key.toLowerCase();
            this.keysPressed[key] = true;
            console.log(`[Input] KeyDown: ${key}`);

            // Undo shortcut
            if ((e.ctrlKey || e.metaKey) && key === 'z') {
                e.preventDefault();
                this.undo();
                return;
            }

            // Flight mode specific controls
            if (this.flightMode) {
                if (key === 'u') {
                    this.toggleUpgradePanel();
                } else if (key === 'b') {
                    if (!this.spaceBase.isDeployed) {
                        this.deployBase();
                    } else if (this.isNearBase()) {
                        this.openBaseManagement();
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
                } else if (key === 'v') {
                    this.triggerViperBoost();
                } else if (key === 'l') {
                    renderLoadoutUI(this); // Phase 29: Ship Loadout
                } else if (key === 'm') {
                    renderMissionBoardUI(this); // Phase 30: Mission Board
                } else if (key === 'f') {
                    this.renderFleetUI(); // Phase 34: Fleet Command
                } else if (key === 'g') {
                    renderSectorMapUI(this); // Phase 31: Galaxy Map
                } else if (key === 'o') {
                    this.renderOutpostUI(); // Phase 35: Outposts
                } else if (key === 'h') {
                    renderAchievementUI(this); // Phase 32: Achievements
                } else if (key === 'c') {
                    this.toggleSpectreCloak();
                } else if (key === 'p') {
                    this.triggerPulsePing();
                } else if (key === 'o') {
                    this.triggerApexOverclock();
                } else if (key === 'q') {
                    this.useAbility();
                } else if (key === 'e') {
                    this.useUltimate();
                } else if (key === '7') {
                    this.deployUnit('mining_drone');
                } else if (key === '8') {
                    this.deployUnit('player_turret');
                } else if (key === '9') {
                    activateArtifactAbility(this);
                } else if (key === '0') {
                    this.teleportToBase();
                } else if (key === 'escape') {
                    this.toggleFlightMode();
                }
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', e => {
            const key = e.key.toLowerCase();
            this.keysPressed[key] = false;
        });
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

        // Initialize kbd tooltips for flight controls
        this.initKbdTooltips();
        this.makeResizable('sectionMap');
        this.makeResizable('sectionGems');
        this.initGemsSectionResize(); // Special handling for gems

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
        this.initJoystick();

        // Trigger initial background generation
        this.resize();

        // Initial UI population
        this.updateWalletUI();
        this.updateInventoryUI();
        if (this.updateGemsUI) this.updateGemsUI();
        this.updateShipStatus();
        this.updateMap();
        this.checkFirstLogin();

        this.animate = this.animate.bind(this);
        if (typeof this.updateBackgroundEntities === 'function') {
            this.updateBackgroundEntities = this.updateBackgroundEntities.bind(this);
        }
        requestAnimationFrame(this.animate);
    }

    animate(time) {
        try {
            this.frameCounter++;

            // ALWAYS update autonomous background entities (if the method exists)
            if (typeof this.updateBackgroundEntities === 'function') {
                this.updateBackgroundEntities(time);
            }

            // Update flight game physics (ALWAYS 60 FPS)
            if (this.flightMode) {
                if (typeof this.updatePlayerShip === 'function') {
                    // console.log('[Engine] Calling updatePlayerShip'); // Too spammy, but useful if needed
                    this.updatePlayerShip();
                }
                if (typeof this.updateProjectiles === 'function') this.updateProjectiles();
                if (typeof this.updateDamageParticles === 'function') this.updateDamageParticles();
                if (typeof this.updateMinerals === 'function') this.updateMinerals();
                if (typeof this.updateHazards === 'function') this.updateHazards();

                // ASTEROID LOGIC
                if (typeof this.updateAsteroids === 'function') this.updateAsteroids();

                // WEATHER SYSTEM
                if (typeof this.updateSectorWeather === 'function') this.updateSectorWeather();

                if (typeof this.updateEnemyShips === 'function') this.updateEnemyShips();
                if (typeof this.updateEnemyBullets === 'function') this.updateEnemyBullets();
                if (typeof this.updateBoss === 'function') this.updateBoss();
                if (typeof this.updateSolarSystems === 'function') this.updateSolarSystems(); // Process sun proximity burns

                // Update engine hum pitch based on ship speed
                if (this.playerShip && window.gameAudio && typeof window.gameAudio.updateEngineHum === 'function') {
                    const shipSpeed = Math.hypot(this.playerShip.vx || 0, this.playerShip.vy || 0);
                    window.gameAudio.updateEngineHum(shipSpeed);
                }

                if (this.activeMission && this.activeMission.type === 'survive') {
                    if (typeof this.checkMissionComplete === 'function') this.checkMissionComplete();
                }
                if (this.activeMission && this.activeMission.type === 'collect') {
                    // Track mineral collection progress
                    const totalMinerals = Object.values(this.playerInventory || {}).reduce((a, b) => a + b, 0);
                    this.activeMission.progress = totalMinerals;
                    if (typeof this.checkMissionComplete === 'function') this.checkMissionComplete();
                }

                if (typeof this.updateFlightHUD === 'function') this.updateFlightHUD();
            }

            // Draw loop handles all rendering using the new rendering engine
            if (typeof this.draw === 'function') {
                this.draw(time);
            }

            requestAnimationFrame(this.animate);
        } catch (e) {
            console.error('[Game] Animate loop error:', e);
            requestAnimationFrame(this.animate); // Keep loop alive
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
                dx = (dx / dist) * maxDist;
                dy = (dy / dist) * maxDist;
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
        if (typeof this.generateStaticStars === 'function') {
            this.generateStaticStars();
        }

        // Standard Redraw
        this.draw();

        // Update Subsystems
        if (this.resizeHangar) this.resizeHangar();
        if (this.updateGemsWindowSize) this.updateGemsWindowSize();
        
        console.log(`[Engine] Resize complete: ${this.canvas.width}x${this.canvas.height}`);
    }

    resizeHangar() {
        const viewport = document.querySelector('.hangar-viewport');
        if (!viewport) return;

        // Base dimensions of the designed 3D scene inner width
        const baseW = 1200;
        const baseH = 800;

        // The container is 90vw width and 85vh height in CSS
        const availW = window.innerWidth * 0.9;
        const availH = window.innerHeight * 0.85;

        // Scale down to fit, but don't scale up past 1x to avoid blurriness
        let scale = Math.min(availW / baseW, availH / baseH);
        scale = Math.max(0.3, Math.min(scale, 1.0));

        // Apply uniform scale transform to the viewport
        viewport.style.transform = `scale(${scale})`;
    }

    /**
     * FIX: Added the missing function to generate static background stars.
     * This method is now positioned explicitly before other methods that rely on it
     * (like resize) to ensure availability in sensitive execution environments.
     */
    generateLegacyStaticBackground() {
        const bgStars = [];
        const count = 300; // number of background stars
        for (let i = 0; i < count; i++) {
            bgStars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 0.5 + 0.1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
        return bgStars;
    }

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

                // Protect against elements styled with `width: auto` collapsing when `right`/`bottom` are removed
                const rect = element.getBoundingClientRect();

                // Do not lock height for sectionGems as it relies on CSS auto row-wrap height
                if (elementId !== 'sectionGems') {
                    element.style.width = rect.width + 'px';
                    element.style.height = rect.height + 'px';
                } else {
                    // Lock width only so it doesn't squish when bottom/left anchors are removed
                    element.style.width = rect.width + 'px';
                }

                const currentPos = getComputedStyle(element).position;
                if (currentPos !== 'fixed' && currentPos !== 'absolute') {
                    element.style.position = 'fixed';
                }

                element.style.left = rect.left + 'px';
                element.style.top = rect.top + 'px';
                element.style.right = 'auto';
                element.style.bottom = 'auto';

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

                // Keep within viewport bounds
                newX = Math.max(-elemWidth + minVisible, Math.min(window.innerWidth - minVisible, newX));
                newY = Math.max(0, Math.min(window.innerHeight - minVisible, newY));

                element.style.left = newX + 'px';
                element.style.top = newY + 'px';
                element.style.right = 'auto';
                element.style.bottom = 'auto';
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
        makeDraggable('sectionShipDesign');
        makeDraggable('section3DRotation');
    }

    setMode(newMode) {
        this.mode = newMode;
        document.getElementById('drawModeBtn').classList.remove('active');
        document.getElementById('selectModeBtn').classList.remove('active');

        if (newMode === 'draw') {
            document.getElementById('drawModeBtn').classList.add('active');
            this.canvas.style.cursor = 'default';
        } else if (newMode === 'select') {
            document.getElementById('selectModeBtn').classList.add('active');
            this.canvas.style.cursor = 'pointer';
        }
    }

    /* --- NEW COLOR CONTROLS --- */

    // adjustColor moved to ship-painter.js


    getRainbowHex() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

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

    // Procedural generation logic moved to proc-gen.js

    // updateBgUI moved to proc-gen.js

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

        if (this.flightMode) {
            this.mode = 'flight'; // Ensure mode reflects flight state
            this.showWelcomeOverlay = false; // Dismiss overlay when flying
            this.flightStartTime = Date.now();
            this.waveLevel = 1;
            this.bossSpawns = 0;
            this.enemyShips = []; // Clear old enemies
            this.lastRespawnTime = Date.now(); // Invincibility on flight start
            this.spawnAnomalies(); // Phase 26: Seed anomalies in deep space
            this.spawnFactionPatrols(); // Phase 28: Populate faction patrol ships
        } else {
            this.mode = 'draw'; // Revert to draw when docking
            // Exiting flight (docking) — sync all progression to cloud
            this.syncWithCloud();
            this.checkAchievements();

            // Restore Draw mode highlight
            const drawBtn = document.getElementById('drawModeBtn');
            if (drawBtn) drawBtn.classList.add('active');
        }

        // Synchronize UI button states
        const flyBtns = document.querySelectorAll('button[onclick*="toggleFlightMode"]');
        const drawBtn = document.getElementById('drawModeBtn');
        const selectBtn = document.getElementById('selectModeBtn');

        if (this.flightMode) {
            // Entering flight: highlight FLY, clear drawing modes
            flyBtns.forEach(btn => btn.classList.add('active'));
            if (drawBtn) drawBtn.classList.remove('active');
            if (selectBtn) selectBtn.classList.remove('active');
        } else {
            // Exiting flight: clear FLY highlight
            flyBtns.forEach(btn => btn.classList.remove('active'));
        }

        // Safety: Clear any active hazard effects when entering/exiting flight mode
        // EXCEPT nuclear explosions which should play out fully
        if (this.hazardEffect && this.hazardEffect.type !== 'supernova') {
            this.hazardEffect = null;
        }
        this.camera.shakeX = 0;
        this.camera.shakeY = 0;

        // Toggle HUD overlay
        const hud = document.getElementById('flightHUD');
        const floatingMap = document.getElementById('floatingMap');
        const floatingLeaders = document.getElementById('floatingLeaders');

        if (this.flightMode) {
            if (hud) hud.classList.remove('hidden');
            if (floatingMap) floatingMap.classList.remove('hidden');
            if (floatingLeaders) floatingLeaders.classList.remove('hidden');
            if (typeof this.updateFloatingLeaderboard === 'function') this.updateFloatingLeaderboard();
            if (typeof this.updateXPUI === 'function') this.updateXPUI(); // Initialize XP bar
            
            // Audio: start engine hum + ambient music
            if (window.gameAudio) {
                window.gameAudio.startEngineHum();
                window.gameAudio.startAmbientMusic();
            }
        } else {
            if (hud) hud.classList.add('hidden');
            if (floatingLeaders) floatingLeaders.classList.add('hidden');
            // Audio: stop engine + music
            if (window.gameAudio) {
                window.gameAudio.stopEngineHum();
                window.gameAudio.stopAmbientMusic();
            }
        }

        // Ensure a background is active
        if (this.flightMode && this.activeStyles && this.activeStyles.size === 0) {
            this.toggleBgStyle('deep-space');
        }

        this.showToast(this.flightMode ? 'Flight Mode: ON - Use WASD/QE/Shift' : 'Flight Mode: OFF');
        
        // Robust UI Toggle via Body Class
        document.title = this.flightMode ? "Interstellar | FLIGHT" : "Aether Map | Pre-Placement Cartographer";
        document.body.classList.toggle('flight-active', this.flightMode);

        // Reset keys to prevent runaway ship
        this.keysPressed = {};

        // Initialize resize handle for gems section ONCE when entering flight mode
        if (this.flightMode && typeof this.initGemsSectionResize === 'function') {
            this.initGemsSectionResize();
        }

        // Toggle ship button, dock button, and layout presets visibility
        const shipBtn = document.getElementById('selectShipBtn');
        const dockBtn = document.getElementById('dockBtn');
        const layoutPresets = document.getElementById('layoutPresets');
        if (shipBtn) shipBtn.style.display = this.flightMode ? 'inline-flex' : 'none';
        if (dockBtn) dockBtn.style.display = this.flightMode ? 'inline-flex' : 'none';
        if (layoutPresets) layoutPresets.style.display = this.flightMode ? 'flex' : 'none';
        const tradeBtn = document.getElementById('tradeBtn');
        if (tradeBtn) tradeBtn.style.display = this.flightMode ? 'inline-flex' : 'none';

        this.draw();
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
    // Window Management methods moved to window-manager.js

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
                // Height and layout are now purely handled by CSS flex-column wrapping!
            } else {
                // Height and layout are now purely handled by CSS flex-column wrapping!
            }
        }
    }

    // resize methods moved to window-manager.js

    // Toggle floating window collapse
    // toggleFloatingWindow moved to window-manager.js

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
            modal.classList.add('hidden');
            this.expandedMapOpen = false;
        }
    }

    animateExpandedMap() {
        if (!this.expandedMapOpen) return;

        const canvas = document.getElementById('fullscreenMapCanvas');
        if (!canvas) {
            console.error('[Map Debug] Canvas not found');
            return;
        }

        console.log('[Map Debug] Rendering expanded map, zoom:', this.expandedMapZoom);

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

        // --- 4. HOLO-GRID ---
        // A perspective grid. Since this is 2D top-down, we draw a rectangular grid that pans.
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
        this.minerals.forEach(mineral => {
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

        ctx.fillStyle = '#ff3333';
        ctx.fillText(`THREAT LEVEL: ${this.waveLevel}`, 20, h - 20);

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
        const worldCx = -this.expandedMapOffset.x * parallax;
        const worldCy = -this.expandedMapOffset.y * parallax;
        const w = ctx.canvas.width / this.expandedMapZoom;
        const h = ctx.canvas.height / this.expandedMapZoom;

        // Simple deterministic "hash" for visuals without storing millions of stars
        // We assume stars are on a grid with jitter
        const startX = Math.floor((worldCx - w) / spacing);
        const endX = Math.floor((worldCx + w) / spacing);
        const startY = Math.floor((worldCy - h) / spacing);
        const endY = Math.floor((worldCy + h) / spacing);

        ctx.fillStyle = color;

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                // Deterministic random
                const seed = x * 34234 + y * 23123;
                const rx = Math.sin(seed) * spacing;
                const ry = Math.cos(seed * 0.5) * spacing;
                const size = (Math.sin(seed * 1.5) + 1.5);

                ctx.globalAlpha = opacity * (0.5 + Math.sin(seed * 0.1) * 0.5);
                ctx.beginPath();
                ctx.arc(x * spacing + rx, y * spacing + ry, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1.0;
    }

    toggleLeaderboardMode() {
        this.leaderboardMode = this.leaderboardMode === 'wealth' ? 'exploration' : 'wealth';
        const titleEl = document.getElementById('leaderboardTitle');
        if (titleEl) {
            titleEl.textContent = this.leaderboardMode === 'wealth' ? '🏆 Leaders' : '🔭 Exploration';
        }
        this.updateFloatingLeaderboard();
        this.showToast(`Switched to ${this.leaderboardMode} ranking`);
    }

    updateFloatingLeaderboard() {
        const listEl = document.getElementById('floatingLeadersList');
        if (!listEl) return;

        let players = [];
        const isExploration = this.leaderboardMode === 'exploration';

        if (isExploration) {
            if (this.explorationData && this.explorationData.length > 0) {
                players = [...this.explorationData];
            } else {
                // Mock Exploration Data
                players = [
                    { name: 'Drifter_X', sectors: 15 },
                    { name: 'VoidWalker', sectors: 12 },
                    { name: 'StarPilot99', sectors: 9 },
                    { name: 'You', sectors: this.getExploredSectorCount(), isMe: true }
                ];
            }
        } else {
            if (this.leaderboardData && this.leaderboardData.length > 0) {
                players = [...this.leaderboardData];
                // Ensure "You" is always present if not in the top list
                const hasMe = players.find(p => p.isMe || p.name === 'You' || p.playerId === this.playerId);
                if (!hasMe) {
                    players.push({ name: 'You', wealth: this.calculateTotalWealth(), isMe: true });
                }
            } else {
                // Fallback to Mock leaderboard if no bridge data
                players = [
                    { name: 'StarPilot99', wealth: 125000 + Math.floor(Math.random() * 10000) },
                    { name: 'NebulaHunter', wealth: 98000 + Math.floor(Math.random() * 8000) },
                    { name: 'AstroMiner', wealth: 76000 + Math.floor(Math.random() * 5000) },
                    { name: 'You', wealth: this.calculateTotalWealth(), isMe: true }
                ];
            }
        }

        // Sort based on mode
        if (isExploration) {
            players.sort((a, b) => (b.sectors || 0) - (a.sectors || 0));
        } else {
            players.sort((a, b) => (b.wealth || 0) - (a.wealth || 0));
        }

        const topPlayers = players.slice(0, 5);

        let html = '';
        topPlayers.forEach((player, i) => {
            const isMe = player.isMe || player.name === 'You' || player.playerId === this.playerId;
            const val = isExploration 
                ? `${(player.sectors || 0)} Sectors` 
                : `${(player.wealth || 0).toLocaleString()}`;
            
            html += `
                <div class="leader-row ${isMe ? 'leader-you' : ''}">
                    <span class="leader-rank">#${i + 1}</span>
                    <span class="leader-name">${player.name}</span>
                    <span class="leader-wealth">${val}</span>
                </div>`;
        });
        listEl.innerHTML = html;
    }

    getExploredSectorCount() {
        if (!this.galaxyMap) return 0;
        return this.galaxyMap.filter(s => s.explored).length;
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

    // drawEngineFlame and drawMuzzleFlash moved to ship-painter.js












    addXP(amount) {
        this.playerXP += amount;

        let leveledUp = false;
        while (this.playerXP >= this.xpToNextLevel) {
            this.playerLevel++;
            this.playerXP -= this.xpToNextLevel;
            // Exponential scaling
            this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
            this.skillPoints++;
            leveledUp = true;
        }

        if (leveledUp) {
            this.showToast(`🎉 LEVEL UP! You are now Level ${this.playerLevel}! (+1 SP) 🎉`, 4000);
            gameAudio.playMissionComplete(); // Use mission sound for level up

            // Visual effect around player
            if (this.playerShip) {
                this.createExplosion(this.playerShip.x, this.playerShip.y, 'hit');
            }
        }

        this.updateXPUI();

        localStorage.setItem('playerXP', this.playerXP);
        localStorage.setItem('playerLevel', this.playerLevel);
        localStorage.setItem('xpToNextLevel', this.xpToNextLevel);
        localStorage.setItem('skillPoints', this.skillPoints);

        // Sync progression to cloud on level up
        if (leveledUp) {
            this.syncWithCloud();
        }

        // Check for new achievements
        this.checkAchievements();
    }

    // === ACHIEVEMENT SYSTEM ===
    // Procedural achievements logic moved to achievements.js


    // === BOSS FIGHT SYSTEM ===



    // === MISSION SYSTEM ===

    static MISSION_TEMPLATES = [
        { type: 'kill', name: 'Scout Sweep', desc: 'Destroy {goal} Scouts', targetType: 'scout', goal: 5, reward: 30 },
        { type: 'kill', name: 'Fighter Patrol', desc: 'Destroy {goal} Fighters', targetType: 'fighter', goal: 3, reward: 50 },
        { type: 'kill_any', name: 'Space Cleaner', desc: 'Destroy {goal} enemy ships', goal: 8, reward: 60 },
        { type: 'boss', name: 'Boss Hunt: Dreadnought', desc: 'Defeat the Dreadnought', bossType: 'dreadnought', goal: 1, reward: 100 },
        { type: 'boss', name: 'Boss Hunt: Hive Queen', desc: 'Defeat the Hive Queen', bossType: 'hivequeen', goal: 1, reward: 150 },
        { type: 'boss', name: 'Boss Hunt: Void Reaper', desc: 'Defeat the Void Reaper', bossType: 'voidreaper', goal: 1, reward: 200 },
        { type: 'survive', name: 'Endurance Trial', desc: 'Survive for {goal}s', goal: 60, reward: 40 },
        { type: 'collect', name: 'Mining Run', desc: 'Collect {goal} minerals', goal: 20, reward: 35 },
        { type: 'transport', name: 'Courier: Alpha Centauri', desc: 'Deliver {goal} Iron to Alpha Centauri Outpost', targetX: 5000, targetY: -2000, target: 'iron', goal: 10, reward: 3200 },
        { type: 'transport', name: 'Fuel Run', desc: 'Deliver {goal} Uranium to Mining Station', targetX: -3000, targetY: 4000, target: 'uranium', goal: 5, reward: 5500 },
        { type: 'transport', name: 'Mineral Run', desc: 'Deliver {goal} Gold to Research Center', targetX: 1000, targetY: 6000, target: 'gold', goal: 15, reward: 8000 }
    ];

    generateMissionBoard() {
        // Return 3 random missions
        const templates = InterstellarEngine.MISSION_TEMPLATES;
        const shuffled = [...templates].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
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

        this.missionBoardOpen = false;
    }

    abandonMission() {
        if (!this.activeMission) return;
        this.showToast(`❌ Mission abandoned: ${this.activeMission.name}`, 2000);
        if (this.activeBoss && this.activeMission.type === 'boss') {
            this.activeBoss = null; // Remove boss
        }
        this.activeMission = null;
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
            this.addXP(m.reward * 10);
            this.missionsCompleted++;
            localStorage.setItem('missionsCompleted', this.missionsCompleted);
            if (this.updateGemsUI) this.updateGemsUI();

            this.showToast(`✅ MISSION COMPLETE: ${m.name}! +${m.reward} Gems! ✅`, 4000);
            gameAudio.playMissionComplete();
            this.activeMission = null;

            // Check achievements after mission complete
            this.checkAchievements();
            this.syncWithCloud();
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

        const missions = this.generateMissionBoard();

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
            html += `<div style="color: #00ff88; font-size: 12px;">Progress: ${this.activeMission.progress}/${this.activeMission.goal}</div>`;
            html += `<button onclick="window.game.abandonMission(); window.game.hideMissionBoardUI();" style="
                margin-top: 8px; padding: 6px 16px; background: rgba(255,50,50,0.3); color: #ff4444;
                border: 1px solid #ff4444; border-radius: 6px; cursor: pointer; font-size: 11px;
            ">ABANDON</button></div>`;
        } else {
            missions.forEach((m, i) => {
                const desc = m.desc.replace('{goal}', m.goal);
                html += `<div style="background: rgba(0,255,204,0.08); border: 1px solid rgba(0,255,204,0.3); border-radius: 8px; padding: 12px; margin-bottom: 8px;">`;
                html += `<div style="display: flex; justify-content: space-between; align-items: center;">`;
                html += `<div><div style="color: #00ffcc; font-size: 13px; font-weight: bold;">${m.name}</div>`;
                html += `<div style="color: #aaa; font-size: 11px; margin-top: 2px;">${desc}</div></div>`;
                html += `<div style="text-align: right;"><div style="color: #ffdd44; font-size: 12px;">💎 ${m.reward}</div>`;
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
        // Create a floating resource gem
        // Reuse existing gem logic if accessible, or create temp visual
        // For now, simpler to just add to inventory with a notification
        this.playerInventory[type] = (this.playerInventory[type] || 0) + amount;
        this.collectionNotifications.push({
            text: `+${amount} ${type.toUpperCase()}`,
            x: x,
            y: y,
            life: 60,
            vy: -1
        });
    }


    // updateDamageParticles has been consolidated into combat-engine.js


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

    // Phase 26: Artifact persistence
    loadArtifactInventory() {
        try {
            const saved = localStorage.getItem('artifactInventory');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }

    saveArtifactInventory() {
        try {
            localStorage.setItem('artifactInventory', JSON.stringify(this.artifactInventory));
            if (this.equippedArtifact) {
                localStorage.setItem('equippedArtifact', this.equippedArtifact);
            }
        } catch (e) {
            console.error('Failed to save artifact inventory:', e);
        }
    }

    // Phase 28: Faction reputation persistence
    loadFactionReputation() {
        try {
            const saved = localStorage.getItem('factionReputation');
            const rep = saved ? JSON.parse(saved) : { solari: 0, void: 0, terraform: 0 };
            
            // Phase 38: Initialize global influence if missing
            if (!rep.globalInfluence) {
                rep.globalInfluence = { solari: 0.33, void: 0.33, terraform: 0.34 };
            }
            return rep;
        } catch (e) {
            return { solari: 0, void: 0, terraform: 0, globalInfluence: { solari: 0.33, void: 0.33, terraform: 0.34 } };
        }
    }

    saveFactionReputation() {
        try {
            localStorage.setItem('factionReputation', JSON.stringify(this.factionReputation));
        } catch (e) {
            console.error('Failed to save faction reputation:', e);
        }
    }

    // Phase 28: Spawn faction patrols when entering flight mode
    spawnFactionPatrols() {
        this.factionPatrols = generateFactionPatrols(this.playerShip);
    }

    // Phase 28: Update faction patrols AI + capital ships
    updateFactionSystems() {
        if (!this.flightMode) return;

        // Phase 30: Update survive mission progress (1 second per 60 frames approx)
        updateQuestProgress(this.activeQuests, 'survive', 1/60);

        // Phase 30: Check for reach missions (faction territory)
        this.activeQuests.forEach(q => {
            if (q.goal.type === 'reach' && q.goal.target === 'faction_territory' && !q.completed) {
                const fac = FACTIONS[q.goal.factionId];
                if (fac && fac.territory) {
                    const t = fac.territory;
                    if (this.playerShip.x >= t.minX && this.playerShip.x <= t.maxX &&
                        this.playerShip.y >= t.minY && this.playerShip.y <= t.maxY) {
                        updateQuestProgress([q], 'reach', 1);
                        if (q.completed) this.showToast(`✨ Reached ${fac.name} territory!`);
                    }
                }
            }
        });

        // Phase 30: Save quest progress periodically (every ~2 seconds)
        if (Math.random() < 0.01) saveActiveQuests(this.activeQuests);

        // Update patrols — hostile ones chase player
        this.factionPatrols.forEach(p => {
            if (!p.active) return;
            const standing = this.factionReputation[p.factionId] || 0;
            if (!isFactionHostile(standing)) return;

            const dx = this.playerShip.x - p.x;
            const dy = this.playerShip.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < p.aggroRange) {
                const angle = Math.atan2(dy, dx);
                p.vx += Math.cos(angle) * 0.03;
                p.vy += Math.sin(angle) * 0.03;
                const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (spd > 2.5) { p.vx = (p.vx / spd) * 2.5; p.vy = (p.vy / spd) * 2.5; }

                // Fire at player
                const now = Date.now();
                if (dist < 500 && now - p.lastFire > p.fireRate) {
                    p.lastFire = now;
                    this.enemyBullets = this.enemyBullets || [];
                    this.enemyBullets.push({
                        x: p.x, y: p.y,
                        vx: Math.cos(angle) * p.bulletSpeed,
                        vy: Math.sin(angle) * p.bulletSpeed,
                        damage: p.bulletDamage,
                        color: p.color, size: 3, lifetime: 120,
                    });
                }
            }
            p.x += p.vx;
            p.y += p.vy;
        });

        // Update capital ships
        this.capitalShips.forEach(cs => updateCapitalShip(cs, this.playerShip, this));

        // Try to spawn capital ship every 60 seconds at wave 10+
        const now = Date.now();
        if (now - this.lastCapitalCheck > 60000) {
            this.lastCapitalCheck = now;
            if (this.capitalShips.filter(c => c.active).length < 2) {
                const cs = trySpawnCapitalShip(this.waveLevel, this.playerShip);
                if (cs) {
                    this.capitalShips.push(cs);
                }
            }
        }
    }

    // Phase 28: Handle killing a faction patrol (reputation shift)
    onFactionPatrolKill(patrol) {
        patrol.active = false;
        // Killing patrols of a faction = -30 rep with that faction
        adjustReputation(this.factionReputation, patrol.factionId, -30);
        this.saveFactionReputation();

        // Rewards
        this.credits += 100;
        this.saveCredits();
        this.showToast(`${FACTIONS[patrol.factionId].icon} Destroyed ${FACTIONS[patrol.factionId].name} patrol! (-30 rep)`);
    }

    // Phase 28: Handle destroying a capital ship
    onCapitalShipKill(capitalShip) {
        capitalShip.active = false;
        const def = CAPITAL_SHIPS[capitalShip.type];

        // Big reputation shift
        adjustReputation(this.factionReputation, def.faction, -80);
        this.saveFactionReputation();

        // Massive rewards
        this.credits += def.creditReward;
        this.saveCredits();
        this.gems = (this.gems || 0) + def.gemReward;
        this.showToast(`💥 CAPITAL SHIP DESTROYED: ${def.name}! +$${def.creditReward} +${def.gemReward} gems`);
        
        // Phase 32: Track capital ship kills for achievements
        this.checkAchievements('capital_kill', 1);
    }

    // Phase 29: Equip a module from inventory
    equipModule(moduleId) {
        const mod = SHIP_MODULES[moduleId];
        if (!mod) return;
        if (!this.moduleInventory[moduleId] || this.moduleInventory[moduleId] < 1) {
            this.showToast('⚠️ You don\'t own this module!');
            return;
        }

        // Unequip existing module in the same slot (return to inventory)
        const prevId = this.equippedModules[mod.slot];
        if (prevId) {
            this.moduleInventory[prevId] = (this.moduleInventory[prevId] || 0) + 1;
        }

        this.equippedModules[mod.slot] = moduleId;
        this.moduleInventory[moduleId] = Math.max(0, (this.moduleInventory[moduleId] || 0) - 1);

        this.loadoutBonuses = getEquippedBonuses(this.equippedModules);
        saveEquippedModules(this.equippedModules);
        saveModuleInventory(this.moduleInventory);
        this.showToast(`${mod.icon} Equipped ${mod.name}!`);

        // Refresh UI
        closeLoadoutUI();
        renderLoadoutUI(this);
    }

    // Phase 29: Unequip a module (return to inventory)
    unequipModule(slot) {
        const modId = this.equippedModules[slot];
        if (!modId) return;

        this.moduleInventory[modId] = (this.moduleInventory[modId] || 0) + 1;
        this.equippedModules[slot] = null;

        this.loadoutBonuses = getEquippedBonuses(this.equippedModules);
        saveEquippedModules(this.equippedModules);
        saveModuleInventory(this.moduleInventory);

        const mod = SHIP_MODULES[modId];
        this.showToast(`${mod.icon} Unequipped ${mod.name}`);

        closeLoadoutUI();
        renderLoadoutUI(this);
    }

    // Phase 29: Close loadout UI
    closeLoadoutUI() {
        closeLoadoutUI();
    }

    // Phase 30: Quest management methods
    acceptQuest(index) {
        const board = loadMissionBoard();
        if (!board) return;
        const quest = board[index];
        if (!quest) return;

        if (this.activeQuests.length >= 3) {
            this.showToast('⚠️ Max 3 active quests! Finish one first.');
            return;
        }

        if (this.activeQuests.some(q => q.id === quest.id)) {
            this.showToast('⚠️ You already accepted this quest!');
            return;
        }

        this.activeQuests.push(quest);
        saveActiveQuests(this.activeQuests);
        this.showToast(`${quest.icon} Accepted: ${quest.name}`);
        
        closeMissionBoardUI();
        renderMissionBoardUI(this);
    }

    claimQuestReward(index) {
        const quest = this.activeQuests[index];
        if (!quest || !quest.completed || quest.claimed) return;

        quest.claimed = true;
        this.credits += quest.rewards.credits;
        this.saveCredits();
        this.gems = (this.gems || 0) + quest.rewards.gems;

        if (quest.rewards.repBonus) {
            adjustReputation(this.factionReputation, quest.rewards.repBonus.factionId, quest.rewards.repBonus.amount);
            this.saveFactionReputation();
        }

        this.showToast(`🎁 Reward: $${quest.rewards.credits} & ${quest.rewards.gems} gems!`);
        
        // Remove from active list
        this.activeQuests.splice(index, 1);
        saveActiveQuests(this.activeQuests);

        closeMissionBoardUI();
        renderMissionBoardUI(this);
    }

    closeMissionBoardUI() {
        closeMissionBoardUI();
    }

    // Phase 31: Sector Map & Jump logic
    jumpToSector(x, y) {
        executeSectorJump(this, x, y);
        // Phase 32: Track jumps
        this.checkAchievements('jump', 1);
    }

    closeSectorMapUI() {
        closeSectorMapUI();
    }

    /**
     * Re-initialize the universe for a new sector/biome.
     */
    initSectorUniverse(biome) {
        this.currentBiome = biome;
        
        // Clear current world state
        this.minerals = [];
        this.resourceDeposits = [];
        this.factionPatrols = [];
        this.capitalShips = [];
        this.anomalies = [];
        this.loadedSectors.clear();

        // Phase 33: Generate Infrastructure (Gates/POIs)
        generateSectorInfrastructure(this);

        // Regenerate core sector around player
        const sx = Math.floor(this.playerShip.x / this.sectorSize);
        const sy = Math.floor(this.playerShip.y / this.sectorSize);
        this.generateSector(sx, sy);
        
        // Update background if applicable
        if (biome.background && typeof this.toggleBgStyle === 'function') {
            // Future-proofing: could switch stars/colors based on biome
        }

        this.showToast(`🌌 Sector Biome: ${biome.name}`);
        this.hazardGraceTimer = 300; // Reset safety grace period on sector jump
    }

    // Phase 32: Achievement & Prestige Methods
    // Event-based achievements logic moved to achievements.js

    confirmPrestige() {
        const points = calculatePrestigePoints(this);
        if (points <= 0) {
            this.showToast('⚠️ Not enough progress for prestige! Keep playing.');
            return;
        }

        if (confirm(`🌀 PRESTIGE ASCENSION\n\nReset your current progress for +${points} Prestige Points?\n\nYou keep Achievements & Prestige bonuses. All credits, gems, and upgrades reset.`)) {
            this.prestigeReset(points);
        }
    }

    prestigeReset(earnedPoints) {
        this.prestigePoints += earnedPoints;
        savePrestige(this.prestigePoints);
        
        // Reset core progress
        this.credits = 1000;
        this.playerGems = 0;
        this.upgrades = {}; // Assuming standard upgrades are here
        this.inventory = {};
        this.playerInventory = {};
        this.activeQuests = [];
        this.saveCredits();
        this.saveInventory();
        saveActiveQuests([]);
        
        // Recalculate persistent bonuses
        this.persistentBonuses = getPersistentBonuses(this.unlockedAchievements, this.prestigePoints);
        
        this.showToast(`✨ ASCENDED! Total Prestige: ${this.prestigePoints}`);
        closeAchievementUI();
        
        // Reload starting sector
        this.initSectorUniverse(BIOMES.standard);
    }

    closeAchievementUI() {
        closeAchievementUI();
    }


    // Phase 33: Check proximity to infrastructure (Jump Gates, POIs)
    checkInfrastructureProximity() {
        if (!this.flightMode || !this.playerShip) return;

        this.sectorInfrastructure.forEach(poi => {
            const dx = this.playerShip.x - poi.x;
            const dy = this.playerShip.y - poi.y;
            const dist = Math.hypot(dx, dy);

            if (dist < poi.interactRange) {
                if (poi.type === 'jump_gate') {
                    this.showToast(`🌌 Press [G] near ${poi.name} to view the Galaxy Map`, 100);
                }
            }
        });

        // Phase 35: Check outpost proximity for collection
        (this.playerOutposts || []).forEach(o => {
            const d = Math.hypot(this.playerShip.x - o.x, this.playerShip.y - o.y);
            if (d < 200) {
                this.showToast(`🧺 Press [O] to manage ${o.name}`, 100);
            }
        });
    }

    renderOutpostUI() {
        if (document.getElementById('outpostOverlay')) {
            this.closeOutpostUI();
            return;
        }

        const nearOutpost = (this.playerOutposts || []).find(o => 
            Math.hypot(this.playerShip.x - o.x, this.playerShip.y - o.y) < 200
        );

        const overlay = document.createElement('div');
        overlay.id = 'outpostOverlay';
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 10000;
            background: rgba(0,0,0,0.92);
            display: flex; flex-direction: column;
            align-items: center; justify-content: flex-start;
            font-family: 'Orbitron', monospace; color: #fff;
            overflow-y: auto; padding: 20px;
        `;

        let activeHtml = '';
        if (nearOutpost) {
            activeHtml = `
                <div style="background: rgba(44, 255, 255, 0.05); border: 1px solid #44ffff; border-radius: 12px; padding: 20px; width: 100%; margin-bottom: 25px;">
                    <div style="font-size: 20px; color: #44ffff; margin-bottom: 10px;">🏘️ ${nearOutpost.name}</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <div style="color: #888; font-size: 10px;">INVENTORY</div>
                            <div style="margin-top: 5px; font-size: 12px;">
                                ${Object.entries(nearOutpost.inventory).map(([m, a]) => `<div>${m}: ${Math.floor(a)}</div>`).join('') || 'Empty'}
                            </div>
                            <button onclick="app.collectOutpostResources('${nearOutpost.id}')" style="margin-top: 15px; background: #44ffff; color: #000; border: none; padding: 8px 15px; border-radius: 4px; font-family: Orbitron; cursor: pointer;">COLLECT ALL</button>
                        </div>
                        <div>
                            <div style="color: #888; font-size: 10px;">MODULES</div>
                            <div style="margin-top: 5px; font-size: 11px; display: flex; flex-wrap: wrap; gap: 5px;">
                                ${nearOutpost.modules.map(m => `<span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${m}</span>`).join('') || 'None'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        const canDeploy = !nearOutpost && this.credits >= 50000;

        overlay.innerHTML = `
            <div style="max-width: 600px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="color: #ffaa00; font-size: 18px; margin: 0;">🏗️ OUTPOST MANAGEMENT</h2>
                    <button onclick="app.closeOutpostUI()" style="background: none; border: 1px solid #555; color: #888; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: Orbitron; font-size: 10px;">✕ CLOSE</button>
                </div>

                ${activeHtml}

                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 12px; color: #888; border-bottom: 1px solid #333; padding-bottom: 5px;">DEPLOY NEW OUTPOST</h3>
                    <div style="padding: 20px; text-align: center; border: 1px dashed #555; border-radius: 12px; margin-top: 10px;">
                        <div style="font-size: 11px; color: #aaa; margin-bottom: 15px;">Cost: <span style="color: #ffaa00;">$50,000</span></div>
                        <button onclick="app.deployOutpost()" ${!canDeploy ? 'disabled' : ''} style="background: ${canDeploy ? '#ffaa00' : '#222'}; color: #000; border: none; padding: 10px 25px; border-radius: 6px; font-family: Orbitron; cursor: pointer; opacity: ${canDeploy ? 1 : 0.4};">
                            ${nearOutpost ? 'TOO CLOSE' : 'DEPLOY HERE'}
                        </button>
                    </div>
                </div>

                <div>
                    <h3 style="font-size: 12px; color: #888; border-bottom: 1px solid #333; padding-bottom: 5px;">GLOBAL OUTPOST REGISTRY</h3>
                    <div style="margin-top: 10px;">
                        ${(this.playerOutposts || []).map(o => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #222;">
                                <div style="font-size: 12px;">${o.icon || '📍'} ${o.name} <span style="color: #666; font-size: 10px;">(${Math.floor(o.x)}, ${Math.floor(o.y)})</span></div>
                                <div style="font-size: 10px; color: #ffaa00;">${Math.floor(Object.values(o.inventory).reduce((a,b)=>a+b,0))} Res</div>
                            </div>
                        `).join('') || '<div style="text-align: center; color: #444; padding: 15px;">No outposts deployed.</div>'}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    deployOutpost() {
        if (this.credits < 50000) return;
        this.credits -= 50000;
        this.saveCredits();

        const outpost = new Outpost(this, this.playerShip.x, this.playerShip.y, {
            modules: ['extractor']
        });
        this.playerOutposts.push(outpost);
        this.showToast(`🏗️ Outpost ${outpost.name} deployed!`);
        this.saveOutposts();
        this.closeOutpostUI();
    }

    saveOutposts() {
        const data = this.playerOutposts.map(o => o.save());
        localStorage.setItem('interstellar_outposts_v1', JSON.stringify(data));
    }

    loadOutposts() {
        try {
            const data = localStorage.getItem('interstellar_outposts_v1');
            if (data) {
                const outposts = JSON.parse(data);
                this.playerOutposts = outposts.map(d => new Outpost(this, d.x, d.y, d));
            }
        } catch (e) {
            console.error('[Outpost] Load error:', e);
            this.playerOutposts = [];
        }
    }

    collectOutpostResources(id) {
        const outpost = this.playerOutposts.find(o => o.id === id);
        if (outpost) {
            outpost.collectResources();
            this.renderOutpostUI(); // Refresh
        }
    }

    closeOutpostUI() {
        const el = document.getElementById('outpostOverlay');
        if (el) el.remove();
    }


    // Phase 34: Fleet Command & AI Wingmen UI
    renderFleetUI() {
        if (document.getElementById('fleetOverlay')) {
            this.closeFleetUI();
            return;
        }

        const isCapital = this.currentBiome?.name === 'Capital Sector';
        const fleet = this.playerFleet || [];
        const maxFleet = 3;

        const overlay = document.createElement('div');
        overlay.id = 'fleetOverlay';
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 10000;
            background: rgba(0,0,0,0.92);
            display: flex; flex-direction: column;
            align-items: center; justify-content: flex-start;
            font-family: 'Orbitron', monospace; color: #fff;
            overflow-y: auto; padding: 20px;
        `;

        let fleetHtml = '';
        fleet.forEach((w, idx) => {
            fleetHtml += `
                <div style="border: 1px solid #44ffff33; border-radius: 8px; padding: 15px; background: rgba(255,255,255,0.02); display: flex; align-items: center; gap: 20px; margin-bottom: 10px;">
                    <div style="font-size: 32px;">${w.icon}</div>
                    <div style="flex: 1;">
                        <div style="color: #44ffff; font-size: 14px;">${w.name}</div>
                        <div style="font-size: 10px; color: #888;">HP: ${Math.floor(w.hp)}/${w.maxHp} | State: ${w.state}</div>
                    </div>
                    <button onclick="app.dismissWingman('${w.id}')" style="background: none; border: 1px solid #ff4444; color: #ff4444; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 10px;">DISMISS</button>
                </div>
            `;
        });

        let recruitHtml = '';
        if (isCapital) {
            Object.keys(WINGMAN_TYPES).forEach(type => {
                const w = WINGMAN_TYPES[type];
                const canAfford = this.credits >= w.cost;
                recruitHtml += `
                    <div style="border: 1px solid #555; border-radius: 8px; padding: 12px; background: rgba(255,255,255,0.01); display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 24px;">${w.icon}</div>
                        <div style="flex: 1;">
                            <div style="color: #fff; font-size: 12px;">${w.name} <span style="color: #ffaa00;">$${w.cost}</span></div>
                            <div style="font-size: 9px; color: #666;">${w.desc}</div>
                        </div>
                        <button onclick="app.recruitWingman('${type}')" ${!canAfford || fleet.length >= maxFleet ? 'disabled' : ''} style="background: ${canAfford ? '#222' : '#111'}; border: 1px solid ${canAfford ? '#44ffff' : '#333'}; color: ${canAfford ? '#44ffff' : '#555'}; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: Orbitron; font-size: 10px;">
                            ${fleet.length >= maxFleet ? 'MAX FLEET' : 'RECRUIT'}
                        </button>
                    </div>
                `;
            });
        } else {
            recruitHtml = `<div style="text-align: center; color: #888; font-size: 10px; padding: 20px; border: 1px dashed #333;">⚠️ Recruitment only available at Faction Capitals.</div>`;
        }

        overlay.innerHTML = `
            <div style="max-width: 600px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="color: #44ffff; font-size: 18px; margin: 0;">🛰️ FLEET COMMAND</h2>
                    <button onclick="app.closeFleetUI()" style="background: none; border: 1px solid #555; color: #888; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: Orbitron; font-size: 10px;">✕ CLOSE</button>
                </div>

                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 12px; color: #888; border-bottom: 1px solid #333; padding-bottom: 5px;">ACTIVE ESCORTS (${fleet.length}/${maxFleet})</h3>
                    ${fleet.length > 0 ? fleetHtml : '<div style="text-align: center; color: #555; font-size: 10px; padding: 20px;">No active wingmen.</div>'}
                </div>

                <div>
                    <h3 style="font-size: 12px; color: #888; border-bottom: 1px solid #333; padding-bottom: 5px;">AVAILABLE RECRUITS</h3>
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                        ${recruitHtml}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    recruitWingman(type) {
        const w = WINGMAN_TYPES[type];
        if (this.credits < w.cost) return;
        if (this.playerFleet.length >= 3) return;

        this.credits -= w.cost;
        this.saveCredits();
        
        const wingman = new WingmanAI(this, type);
        this.playerFleet.push(wingman);
        this.showToast(`✨ ${w.name} joined your fleet!`);
        this.renderFleetUI(); // Refresh
    }

    dismissWingman(id) {
        this.playerFleet = this.playerFleet.filter(w => w.id !== id);
        this.showToast(`📡 Wingman dismissed.`);
        this.renderFleetUI(); // Refresh
    }

    closeFleetUI() {
        const el = document.getElementById('fleetOverlay');
        if (el) el.remove();
    }

    // Phase 26: Spawn anomalies at game start / sector load
    spawnAnomalies() {
        if (this.anomalies.length === 0) {
            this.anomalies = generateAnomalies(6);
            console.log(`[Anomaly] Spawned ${this.anomalies.length} anomalies in deep space`);
        }
    }

    // Phase 26: Check proximity to anomalies each frame
    checkAnomalyProximity() {
        if (this.anomalyEncounterActive) return;

        const ship = this.playerShip;
        for (const anomaly of this.anomalies) {
            if (anomaly.completed) continue;

            const dx = ship.x - anomaly.x;
            const dy = ship.y - anomaly.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const typeDef = ANOMALY_TYPES[anomaly.type];

            // Discovery notification
            if (!anomaly.discovered && dist < typeDef.detectionRadius) {
                anomaly.discovered = true;
                this.discoveredAnomalies.add(anomaly.id);
                this.showToast(`${typeDef.icon} ANOMALY DETECTED: ${typeDef.name}`);
            }

            // Trigger encounter
            if (dist < typeDef.interactRadius) {
                this.startAnomalyEncounter(anomaly);
                return;
            }
        }
    }

    // Phase 26: Start encounter overlay
    startAnomalyEncounter(anomaly) {
        this.anomalyEncounterActive = true;
        const typeDef = ANOMALY_TYPES[anomaly.type];
        const artifactDef = ARTIFACT_TYPES[typeDef.artifactReward];

        // Pause ship movement
        this.playerShip.vx = 0;
        this.playerShip.vy = 0;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'anomalyEncounterOverlay';
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 10000;
            background: rgba(0,0,0,0.85);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            font-family: 'Orbitron', monospace; color: #fff;
            animation: fadeIn 0.5s ease;
        `;

        overlay.innerHTML = `
            <div style="text-align:center; max-width: 500px; padding: 30px;">
                <div style="font-size: 64px; margin-bottom: 20px;">${typeDef.icon}</div>
                <h2 style="color: ${typeDef.color}; font-size: 24px; margin-bottom: 10px;">${typeDef.name}</h2>
                <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">${typeDef.desc}</p>
                <div style="border: 1px solid ${typeDef.color}33; border-radius: 12px; padding: 20px; margin-bottom: 30px; background: rgba(255,255,255,0.03);">
                    <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Artifact Detected</p>
                    <div style="font-size: 36px; margin-bottom: 8px;">${artifactDef.icon}</div>
                    <p style="color: ${artifactDef.color}; font-size: 16px; font-weight: bold;">${artifactDef.name}</p>
                    <p style="color: #aaa; font-size: 12px; margin-top: 5px;">${artifactDef.abilityName}: ${artifactDef.abilityDesc}</p>
                </div>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button id="anomalyExploreBtn" style="
                        background: linear-gradient(135deg, ${typeDef.color}, ${typeDef.color}88);
                        border: none; color: #fff; padding: 12px 30px;
                        font-family: 'Orbitron', monospace; font-size: 14px;
                        border-radius: 8px; cursor: pointer;
                        transition: transform 0.2s, box-shadow 0.2s;
                    ">⚡ EXPLORE</button>
                    <button id="anomalyRetreatBtn" style="
                        background: rgba(255,255,255,0.1);
                        border: 1px solid rgba(255,255,255,0.2); color: #888;
                        padding: 12px 30px; font-family: 'Orbitron', monospace; font-size: 14px;
                        border-radius: 8px; cursor: pointer;
                    ">RETREAT</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Button handlers
        document.getElementById('anomalyExploreBtn').onclick = () => {
            this.completeAnomalyEncounter(anomaly);
        };
        document.getElementById('anomalyRetreatBtn').onclick = () => {
            this.closeAnomalyEncounter();
        };
    }

    // Phase 26: Complete encounter, award artifact
    completeAnomalyEncounter(anomaly) {
        const typeDef = ANOMALY_TYPES[anomaly.type];
        const artifactId = typeDef.artifactReward;
        const artifactDef = ARTIFACT_TYPES[artifactId];

        anomaly.completed = true;
        this.artifactInventory[artifactId] = true;

        // Auto-equip if nothing equipped
        if (!this.equippedArtifact) {
            this.equippedArtifact = artifactId;
        }

        this.saveArtifactInventory();
        this.closeAnomalyEncounter();

        this.showToast(`${artifactDef.icon} ARTIFACT ACQUIRED: ${artifactDef.name}! Press [9] to use ${artifactDef.abilityName}.`);
        if (typeof gameAudio !== 'undefined' && gameAudio.playMissionComplete) {
            gameAudio.playMissionComplete();
        }
    }

    // Phase 26: Close encounter overlay
    closeAnomalyEncounter() {
        this.anomalyEncounterActive = false;
        const overlay = document.getElementById('anomalyEncounterOverlay');
        if (overlay) overlay.remove();
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
            return JSON.parse(localStorage.getItem('playerUpgrades')) || { speed: 0, armor: 0, weapons: 0, shield: 0, cargo: 0, radar: 0, tractor: 0 };
        } catch (e) {
            return { speed: 0, armor: 0, weapons: 0, shield: 0, cargo: 0, radar: 0, tractor: 0 };
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
            this.saveCarriedResources();
            this.saveSpaceBase();
            this.updateCargoUsed(); // Update weight after deposit
            this.showToast(`📦 Deposited: ${deposited.slice(0, 3).join(', ')}${deposited.length > 3 ? '...' : ''}`);
            console.log('[Base] Deposited all:', deposited);
        } else {
            this.showToast('⚠️ No resources to deposit!');
        }

        return totalDeposited > 0;
    }

    // Phase 27: Teleport to base
    teleportToBase() {
        if (!this.spaceBase.isDeployed) {
            this.showToast('⚠️ No base deployed! Press [B] to deploy.');
            return;
        }

        if (!this.hasModule('teleport')) {
            this.showToast('⚠️ Build a Teleport Pad at your base first!');
            return;
        }

        const now = Date.now();
        const cooldown = 60000;
        const lastTeleport = this.lastBaseTeleport || 0;
        const remaining = Math.max(0, cooldown - (now - lastTeleport));

        if (remaining > 0) {
            this.showToast(`⏳ Teleport recharging... ${(remaining / 1000).toFixed(0)}s`);
            return;
        }

        this.lastBaseTeleport = now;
        this.playerShip.x = this.spaceBase.x;
        this.playerShip.y = this.spaceBase.y + 150; // Land near base, not on top
        this.playerShip.vx = 0;
        this.playerShip.vy = 0;
        this.showToast('🌀 TELEPORTED TO BASE!');

        if (typeof gameAudio !== 'undefined' && gameAudio.playUIClick) {
            gameAudio.playUIClick();
        }
    }

    // Phase 27: Update passive income from base modules
    updateBasePassives() {
        if (!this.spaceBase || !this.spaceBase.isDeployed) return;

        const now = Date.now();
        if (!this.lastBasePassiveTick) this.lastBasePassiveTick = now;
        const elapsed = now - this.lastBasePassiveTick;

        // Tick every 10 seconds
        if (elapsed < 10000) return;
        this.lastBasePassiveTick = now;

        const ticks = Math.floor(elapsed / 10000);

        // Hydroponics: +10 credits per tick
        if (this.hasModule('hydroponics')) {
            const income = 10 * ticks;
            this.credits += income;
            this.saveCredits();
        }

        // Refinery: Convert 5 iron → 1 titanium per tick
        if (this.hasModule('refinery')) {
            const ironAvail = this.spaceBase.resources['iron'] || 0;
            if (ironAvail >= 5) {
                const batches = Math.min(Math.floor(ironAvail / 5), ticks);
                this.spaceBase.resources['iron'] -= batches * 5;
                this.spaceBase.resources['titanium'] = (this.spaceBase.resources['titanium'] || 0) + batches;
                this.saveSpaceBase();
            }
        }
    }

    // Phase 27: Full base management UI overlay
    openBaseManagement() {
        if (document.getElementById('baseManagementOverlay')) {
            this.closeBaseManagement();
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'baseManagementOverlay';
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 10000;
            background: rgba(0,0,0,0.9);
            display: flex; flex-direction: column;
            align-items: center; justify-content: flex-start;
            font-family: 'Orbitron', monospace; color: #fff;
            overflow-y: auto; padding: 20px;
        `;

        // Build module cards
        let moduleCardsHtml = '';
        Object.entries(this.baseModules).forEach(([id, mod]) => {
            const isBuilt = this.hasModule(id);
            const prereqMet = !mod.required || this.hasModule(mod.required);
            const canAfford = this.credits >= mod.cost;
            const resOk = !mod.resourceCost || Object.entries(mod.resourceCost).every(([res, amt]) =>
                ((this.spaceBase.resources[res] || 0) + (this.carriedResources[res] || 0)) >= amt
            );

            let statusClass = isBuilt ? 'built' : (prereqMet && canAfford && resOk ? 'available' : 'locked');
            let statusBorder = isBuilt ? '#44ff44' : (statusClass === 'available' ? '#4488ff' : '#555');

            let costHtml = `<span style="color:${canAfford ? '#44ff44' : '#ff4444'}">$${mod.cost.toLocaleString()}</span>`;
            if (mod.resourceCost) {
                Object.entries(mod.resourceCost).forEach(([res, amt]) => {
                    const have = (this.spaceBase.resources[res] || 0) + (this.carriedResources[res] || 0);
                    costHtml += ` <span style="color:${have >= amt ? '#44ff44' : '#ff4444'}">${this.mineralTypes[res]?.name || res}: ${have}/${amt}</span>`;
                });
            }

            moduleCardsHtml += `
                <div style="border: 1px solid ${statusBorder}; border-radius: 8px; padding: 12px; margin: 5px;
                    background: rgba(255,255,255,0.03); min-width: 200px; flex: 1;">
                    <div style="font-size: 24px; text-align: center;">${mod.icon}</div>
                    <div style="font-size: 12px; font-weight: bold; text-align: center; margin: 5px 0; color: ${statusBorder};">${mod.name}</div>
                    ${isBuilt
                        ? '<div style="text-align:center; color:#44ff44; font-size: 10px;">✅ BUILT</div>'
                        : `<div style="text-align:center; font-size: 9px; color: #888;">${costHtml}</div>
                           ${mod.required ? `<div style="text-align:center; font-size: 9px; color: #666;">Requires: ${this.baseModules[mod.required]?.name}</div>` : ''}
                           <button onclick="app.buildModule('${id}'); app.closeBaseManagement(); app.openBaseManagement();"
                               style="display:block; margin: 8px auto 0; padding: 6px 16px; border: none;
                               background: ${statusClass === 'available' ? '#4488ff' : '#333'}; color: #fff;
                               border-radius: 4px; font-family: Orbitron, monospace; font-size: 10px; cursor: pointer;"
                               ${statusClass !== 'available' ? 'disabled' : ''}>BUILD</button>`
                    }
                </div>
            `;
        });

        // Build vault display
        let vaultHtml = '';
        const allResources = { ...this.spaceBase.resources };
        Object.entries(allResources).filter(([_, qty]) => qty > 0).forEach(([type, qty]) => {
            const def = this.mineralTypes[type];
            vaultHtml += `<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="color: ${def?.color || '#aaa'};">${def?.name || type}: ${qty}</span>
                <button onclick="app.withdrawResources('${type}', 10); app.closeBaseManagement(); app.openBaseManagement();"
                    style="padding: 3px 10px; background: #444; border: none; color: #fff; border-radius: 4px; font-size: 9px; cursor: pointer;">
                    WITHDRAW 10
                </button>
            </div>`;
        });
        if (!vaultHtml) vaultHtml = '<div style="text-align:center; color:#666; padding: 20px;">Vault is empty</div>';

        overlay.innerHTML = `
            <div style="max-width: 700px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="color: #4488ff; font-size: 20px; margin: 0;">⚓ BASE MANAGEMENT</h2>
                    <button onclick="app.closeBaseManagement()" style="background: none; border: 1px solid #555; color: #888; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: Orbitron;">✕ CLOSE</button>
                </div>

                <div style="display: flex; gap: 15px; margin-bottom: 20px; font-size: 11px; color: #888;">
                    <span>📍 Location: (${Math.round(this.spaceBase.x)}, ${Math.round(this.spaceBase.y)})</span>
                    <span>🔧 Modules: ${this.spaceBase.modules.length}/${Object.keys(this.baseModules).length}</span>
                    <span>💰 Credits: $${(this.credits || 0).toLocaleString()}</span>
                </div>

                <h3 style="color: #aaa; font-size: 13px; margin: 15px 0 10px;">🔧 MODULES</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                    ${moduleCardsHtml}
                </div>

                <h3 style="color: #aaa; font-size: 13px; margin: 15px 0 10px;">📦 VAULT STORAGE</h3>
                <div style="border: 1px solid #333; border-radius: 8px; overflow: hidden; margin-bottom: 15px;">
                    ${vaultHtml}
                </div>

                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="app.depositAllResources(); app.closeBaseManagement(); app.openBaseManagement();"
                        style="padding: 10px 20px; background: linear-gradient(135deg, #44aa44, #228822); border: none; color: #fff;
                        border-radius: 6px; font-family: Orbitron; font-size: 11px; cursor: pointer;">
                        📦 DEPOSIT ALL CARGO
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    closeBaseManagement() {
        const overlay = document.getElementById('baseManagementOverlay');
        if (overlay) overlay.remove();
    }

    // --- Bridge SDK Implementation ---
    requestLoadData() {
        console.log('[Bridge] Requesting data from cloud...');
        window.parent.postMessage({ type: 'REQUEST_LOAD_DATA' }, '*');
    }

    syncWithCloud() {
        if (this.updateCloudSyncStatus) this.updateCloudSyncStatus('saving');
        console.log('[Bridge] Syncing credits/upgrades to cloud...');
        window.parent.postMessage({
            type: 'SAVE_GAME_DATA',
            data: {
                aetherCredits: this.credits,
                upgrades: this.playerShip.upgrades,
                // --- META SYSTEMS (Phase 2) ---
                progression: {
                    playerLevel: this.playerLevel,
                    playerXP: this.playerXP,
                    xpToNextLevel: this.xpToNextLevel,
                    skillPoints: this.skillPoints,
                    skills: this.skills,
                    unlockedShips: this.unlockedShips,
                    highestWave: this.highestWave || 0,
                    totalBossesDefeated: this.bossesDefeated || 0,
                    totalMissionsCompleted: this.missionsCompleted || 0,
                    unlockedAchievements: this.unlockedAchievements || []
                }
            }
        }, '*');
    }

    sendPositionUpdate() {
        if (!this.flightMode || !this.playerShip) return;
        
        // Throttled update to avoid bridge spam (approx 10Hz)
        if (this.frameCounter % 6 !== 0) return;

        window.parent.postMessage({
            type: 'SYNC_POSITION',
            data: {
                playerId: this.playerId || 'local_pilot',
                x: this.playerShip.x,
                y: this.playerShip.y,
                z: this.playerShip.z || 0,
                rotation: this.playerShip.rotation,
                speed: this.playerShip.speed,
                shipType: this.playerShip.type,
                timestamp: Date.now()
            }
        }, '*');
    }

    handleRemotePlayerSync(data) {
        if (!data || !data.playerId || data.playerId === (this.playerId || 'local_pilot')) return;

        const remote = data;
        remote.lastUpdate = Date.now();
        this.remotePlayers.set(remote.playerId, remote);

        // Auto-cleanup stale players (approx 5s timeout)
        for (const [id, player] of this.remotePlayers.entries()) {
            if (Date.now() - player.lastUpdate > 5000) {
                this.remotePlayers.delete(id);
            }
        }
    }

    handleBridgeMessage(event) {
        const { type, data } = event.data;
        
        if (type === 'REMOTE_PLAYER_SYNC') {
            this.handleRemotePlayerSync(data);
            return;
        }

        if (type === 'GLOBAL_INFLUENCE_UPDATE') {
            console.log('[Bridge] Global Influence Update:', data);
            if (this.factionReputation) {
                this.factionReputation.globalInfluence = data;
            }
            return;
        }

        if (type === 'LEADERBOARD_UPDATE') {
            console.log('[Bridge] Leaderboard Update:', data);
            this.leaderboardData = data;
            this.updateFloatingLeaderboard();
            return;
        }

        if (type === 'DISCOVERY_ALERT') {
            const { pilotName, sectorName } = data;
            this.showToast(`🌌 NEW DISCOVERY: Pilot ${pilotName} reached ${sectorName}!`, 5000);
            return;
        }

        if (type === 'EXPLORATION_STATS') {
            console.log('[Bridge] Exploration Stats Update:', data);
            this.explorationData = data;
            if (this.leaderboardMode === 'exploration') {
                this.updateFloatingLeaderboard();
            }
            return;
        }

        if (type === 'SAVE_ACK') {
            if (this.updateCloudSyncStatus) this.updateCloudSyncStatus('synced');
            return;
        }
        if (type === 'SAVE_ERROR') {
            if (this.updateCloudSyncStatus) this.updateCloudSyncStatus('error');
            return;
        }
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
                    this.showToast("🚀 Pro Pilot Active - 20% Bonus gems enabled!", 5000);
                }
            }
            if (data.progression) {
                console.log('[Bridge] Received progression data.');
                const p = data.progression;
                // Merge cloud data to RAM
                if (p.playerLevel !== undefined) this.playerLevel = p.playerLevel;
                if (p.playerXP !== undefined) this.playerXP = p.playerXP;
                if (p.xpToNextLevel !== undefined) this.xpToNextLevel = p.xpToNextLevel;
                if (p.skillPoints !== undefined) this.skillPoints = p.skillPoints;
                if (p.skills) this.skills = p.skills;
                if (p.unlockedShips) this.unlockedShips = p.unlockedShips;
                if (p.highestWave !== undefined) this.highestWave = p.highestWave;
                if (p.totalBossesDefeated !== undefined) this.bossesDefeated = p.totalBossesDefeated;
                if (p.totalMissionsCompleted !== undefined) this.missionsCompleted = p.totalMissionsCompleted;
                if (p.unlockedAchievements) this.unlockedAchievements = p.unlockedAchievements;

                // Propagate to LocalStorage fallback
                localStorage.setItem('playerLevel', this.playerLevel);
                localStorage.setItem('playerXP', this.playerXP);
                localStorage.setItem('xpToNextLevel', this.xpToNextLevel);
                localStorage.setItem('skillPoints', this.skillPoints);
                localStorage.setItem('playerSkills', JSON.stringify(this.skills));
                localStorage.setItem('unlockedShips', JSON.stringify(this.unlockedShips));
                localStorage.setItem('highestWave', this.highestWave);
                localStorage.setItem('bossesDefeated', this.bossesDefeated);
                localStorage.setItem('missionsCompleted', this.missionsCompleted);
                localStorage.setItem('unlockedAchievements', JSON.stringify(this.unlockedAchievements));

                // Instantly apply static ship parameter changes based on newly merged skills
                this.applySkillsToShip();
                this.updateXPUI();
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
    }

    updateXPUI() {
        const levelEl = document.getElementById('playerLevelText');
        const xpEl = document.getElementById('playerXPText');
        const fillEl = document.getElementById('xpBarFill');

        if (levelEl && xpEl && fillEl) {
            levelEl.textContent = `LEVEL ${this.playerLevel}`;
            xpEl.textContent = `${this.playerXP} / ${this.xpToNextLevel} XP`;
            const pct = Math.min(100, Math.max(0, (this.playerXP / this.xpToNextLevel) * 100));
            fillEl.style.width = `${pct}%`;
        }
    }



    updateGemsWindowSize() {
        const gemsSection = document.getElementById('sectionGems');
        if (!gemsSection) return;

        // Auto height based on rows, keep width fluid
        gemsSection.style.width = 'calc(100% - 30px)';
        gemsSection.style.height = 'auto'; // Native CSS row wrap will expand this
        gemsSection.style.zIndex = '1000'; // Make sure it sits above other windows
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
        const spawnRadius = 1500; // Medium range - always gems visible
        let targetDensity = 200; // Base: Always 200 gems nearby

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

        // Remove only VERY far minerals for performance
        this.minerals = this.minerals.filter(m => {
            const dx = m.x - ship.x;
            const dy = m.y - ship.y;
            const dz = m.z - ship.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz) < spawnRadius * 3;
        });

        // INSTANT RESPAWN: Always maintain target density
        while (this.minerals.length < targetDensity) {
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
                    case 'uncommon': weight = 23; break;    // 23%
                    case 'rare': weight = 5; break;         // 5%
                    case 'mythic': weight = 2; break;       // 2% minimum chance to find lotus early
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
                    case 'uncommon': weight = 20; break;    // 20%
                    case 'rare': weight = 35; break;        // 35%
                    case 'epic': weight = 30; break;        // 30%
                    case 'legendary': weight = 10; break;   // 10%
                    case 'mythic': weight = 5; break;       // 5% (Mindwave Lotus starts appearing early)
                }
            }
            // Deep Void (5000+): Extreme risk, legendary rewards
            else {
                switch (element.rarity) {
                    case 'common': weight = 0; break;
                    case 'uncommon': weight = 0; break;
                    case 'rare': weight = 10; break;
                    case 'epic': weight = 35; break;
                    case 'legendary': weight = 35; break;
                    case 'mythic': weight = 20; break;      // 20% (Increased lotus density)
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
        const dz = (this.playerShip.z || 0) - (mineral.z || 0); // 3D support
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Mindwave Lotus (Mythic) fix: Massive pickup radius (3.5x size) for reliability
        let collectionRange = Math.max(120, (mineral.size || 20) * 3.5);

        // PROSPECTOR: Gem Magnet - 25% wider pickup range passive, huge when active
        if (this.playerShip.type === 'prospector') {
            collectionRange = (this.abilityActive && this.abilityActive.id === 'prospector') ? 250 : collectionRange * 1.5;
        }

        if (dist < collectionRange) {
            // --- AUTOPILOT DIMINISHED RETURNS ---
            // Increased from 0.001 to 0.05 (5%) to feel more rewarding while still encouraging manual play
            const mult = this.autopilot ? 0.05 : 1.0;

            // Add value to wallet
            // Add value to wallet (lotus is 0 value, skipping)
            if (mineral.type !== 'lotus') {
                this.credits += mineral.value * mult;
                this.updateWalletUI();
            } else {
                // MINDWAVE LOTUS: Refill 5% Health and 5% Shield
                const hAmt = this.playerShip.maxHull * 0.05;
                const sAmt = this.playerShip.maxShield * 0.05;

                this.playerShip.hullHealth = Math.min(this.playerShip.hullHealth + hAmt, this.playerShip.maxHull);
                this.playerShip.shield = Math.min(this.playerShip.shield + sAmt, this.playerShip.maxShield);

                // Cumulative tracking
                this.totalLotusHealth += hAmt;
                this.totalLotusShield += sAmt;

                // Permanent Storage
                localStorage.setItem('totalLotusHealth', this.totalLotusHealth);
                localStorage.setItem('totalLotusShield', this.totalLotusShield);

                // Immediate UI Update
                this.updateShipStatus();
            }

            // Siphon Ability: Restore 1% Shield
            if (this.playerShip.type === 'siphon' && this.playerShip.shield < this.playerShip.maxShield) {
                this.playerShip.shield = Math.min(this.playerShip.shield + (this.playerShip.maxShield * 0.01), this.playerShip.maxShield);
                this.updateShipStatus();
            }

            // Track for inventory logic
            if (!this.playerInventory[mineral.type]) {
                this.playerInventory[mineral.type] = 0;
            }
            // For inventory amounts (used for missions etc), we'll add 1. 
            // In a deeper simulation, we'd add `mult`, but assuming physical item count is 1.
            this.playerInventory[mineral.type] += 1;
            this.saveInventory();

            // Phase 30: Update quest progress for mineral collection
            updateQuestProgress(this.activeQuests, 'collect', 1);

            // Phase 32: Track mining for achievements
            this.checkAchievements('collect', 1);

            // Award permanent gems and XP, drastically reduced if autopilot
            // Handle fractional gems using an accumulator so we don't break integer assumptions in UI
            if (!this._gemAccumulator) this._gemAccumulator = 0;
            this._gemAccumulator += mult;

            if (this._gemAccumulator >= 1.0) {
                const wholeGems = Math.floor(this._gemAccumulator);
                this.playerGems += wholeGems;
                this._gemAccumulator -= wholeGems;
                localStorage.setItem('playerGems', this.playerGems);
            }

            this.addXP(Math.max(0.01, 50 * mult)); // Give at least fractional XP
            this.chargeUltimate(1 * mult); // 1% charge per mineral * mult

            // Audio: collect jingle
            gameAudio.playCollect();

            // Show notification
            let notificationText = `+ ${mineral.name} ($${mineral.value})`;
            if (mineral.type === 'lotus') {
                notificationText = `+ ${mineral.name} (Refill +5% Vitals)`;
            }

            this.collectionNotifications.push({
                text: notificationText,
                color: mineral.color,
                time: Date.now()
            });

            // Remove mineral
            const index = this.minerals.indexOf(mineral);
            if (index > -1) this.minerals.splice(index, 1);

            // MAULER VISUALS: Spawn debris trail
            if (this.playerShip.type === 'hauler') {
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

    // Update minerals (check collection, spawn new ones)
    updateMinerals() {
        if (!this.flightMode) return;

        // Rebuild Spatial Hash for collection efficiency
        if (this.spatialHash) {
            this.spatialHash.clear();
            this.minerals.forEach(m => this.spatialHash.insert(m));
        }

        // Apply active ship abilities (Magnet, Gravity, etc)
        this.applyShipAbilities();

        // Check for collections - OPTIMIZED with Spatial Hashing
        const nearbyMinerals = this.spatialHash.query(this.playerShip.x, this.playerShip.y, 250);
        for (const mineral of nearbyMinerals) {
            this.collectMineral(mineral);
        }

        // Spawn new minerals
        this.spawnMinerals();

        // Update notifications (fade out after 2 seconds)
        const now = Date.now();
        this.collectionNotifications = this.collectionNotifications.filter(n => now - n.time < 2000);

        // Update Mauler Debris
        this.updateMaulerDebris();
    }

    updateMaulerDebris() {
        if (!this.maulerDebris) return;
        const ship = this.playerShip;
        const speed = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy + (ship.vz || 0) * (ship.vz || 0));

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
        // 1. HAULER: 25px Gravitational Pull (Passive) + Gravity Well (Active)
        if (this.playerShip.type === 'hauler') {
            const isPulling = this.abilityActive && this.abilityActive.id === 'hauler';
            const collectionRange = 35;
            const tractorBuff = this.getBuffMultiplier('tractorRange');
            let tractorRadius = (collectionRange + 25 * (1 + (this.playerShip.upgrades?.tractor || 0) * 0.5)) * tractorBuff.mult + tractorBuff.flat;
            let maxPullVelocity = 40;
            if (isPulling) {
                tractorRadius = 2000; // Gravity Well range
                maxPullVelocity = 150; // Massively stronger pull
            }

            // Query ONLY nearby minerals for the tractor beam
            const candidateMinerals = this.spatialHash.query(this.playerShip.x, this.playerShip.y, tractorRadius);
            
            for (const mineral of candidateMinerals) {
                if (mineral.type === 'coal' || mineral.type === 'darkmatter') continue;

                const dx = this.playerShip.x - mineral.x;
                const dy = this.playerShip.y - mineral.y;
                const dz = (this.playerShip.z || 0) - (mineral.z || 0);
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

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

                    // Particle trail if active ability pulling fast
                    if (isPulling && Math.random() < 0.1 && typeof this.spawnParticle === 'function') {
                        this.spawnParticle(mineral.x, mineral.y, mineral.color, 1, 0, 0, 500);
                    }
                }
            }
        }

        // 2. PROSPECTOR: Gem Magnet (Passive wider collection range) + Active Ability
        if (this.playerShip.type === 'prospector') {
            const isMagnetActive = this.abilityActive && this.abilityActive.id === 'prospector';
            const magnetRadius = isMagnetActive ? 480 : 160; // 3x range
            const maxMagnetPull = isMagnetActive ? 36 : 12; // 3x strength

            const candidateMinerals = this.spatialHash.query(this.playerShip.x, this.playerShip.y, magnetRadius);
            
            for (const mineral of candidateMinerals) {
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


    // Fire a heat-seeking missile (Phase 22/23 cleanup)
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
    damagePlayer(amount, ignoreShield = false, source = 'unknown') {
        if (!this.playerShip || this.playerShip.hullHealth <= 0) return;

        // --- INVINCIBILITY CHECKS ---
        if (this.playerShip._shieldWallActive ||
            this.playerShip._phaseShift ||
            this.playerShip._barrelRoll ||
            this.playerShip._immovable ||
            this.playerShip._fortressMode) {

            // Show a visual block indicator
            if (Math.random() > 0.5) this.showToast('🛡️ Attack Blocked!', 500);
            return;
        }

        // --- DODGE CHECKS ---
        // 9. FLUX: Phase Shift Passive (20% dodge chance)
        if (this.playerShip.type === 'flux' && Math.random() < 0.2) {
            this.showToast('✨ Phase Shift Evaded Attack!', 1500);
            return; // Completely dodge
        }

        // --- DAMAGE REDUCTION CHECKS ---
        // APEX: Overclock (50% damage reduction when active)
        if (this.playerShip.type === 'apex' && this.playerShip.overclockActive) {
            amount *= 0.5;
        }

        // TITAN: Hardened Hull Passive (30% reduction) + Active (80% reduction)
        if (this.playerShip.type === 'titan') {
            if (this.playerShip._hardenedHull) {
                amount *= 0.2; // Active ability = 80% reduction
            } else {
                amount *= 0.7; // Passive = 30% reduction
            }
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

        // --- VISUAL JUICE (PHASE 22) ---
        this.triggerScreenShake(Math.min(15, amount / 5));
        const vignette = document.getElementById('damageVignette');
        
        // SCORCHED EARTH: Absolute suppression of damage vignette during planet impacts or silent deaths
        const isImpactState = this.hazardEffect && (
            this.hazardEffect.type === 'planet_impact' || 
            this.hazardEffect.type === 'planet' ||
            (this.hazardEffect.type === 'player_death' && this.hazardEffect.silent)
        );

        if (vignette && !isImpactState) {
            vignette.classList.add('active');
            setTimeout(() => vignette.classList.remove('active'), 300);
        }

        this.updateShipStatus();

        if (this.playerShip.hullHealth <= 0) {
            this.handlePlayerDeath(source);
        }
    }

    triggerScreenShake(amount) {
        this.camera.shake = Math.min(25, (this.camera.shake || 0) + amount);
    }

    // triggerMissileHitEffect removed - now in hazard-engine.js

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
        if (window.gameAudio) window.gameAudio.playAbilityPolaris();

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
        if (window.gameAudio) window.gameAudio.playAbilityPolaris();
    }

    toggleSpectreCloak() {
        if (this.playerShip.type !== 'spectre') return;

        this.playerShip.isCloaked = !this.playerShip.isCloaked;
        this.showToast(this.playerShip.isCloaked ? '👻 CLOAK ENABLED' : '👻 CLOAK DISABLED');
        if (window.gameAudio) window.gameAudio.playAbilitySpectre();

        if (this.playerShip.isCloaked) {
            // Visual ripple
            this.hazardEffect = {
                type: 'cloak_on',
                startTime: performance.now(),
                duration: 1000
            };
        }
    }

    // triggerPulsePing has been consolidated into ability-engine.js

    // ====================================================================
    // --- UNIFIED ABILITY SYSTEM (Q key + E for ultimates) ---
    // ====================================================================

    // Unified Ability System moved to ability-engine.js


    // useUltimate, chargeUltimate, and updateAbilityState moved to ability-engine.js



    // handlePlayerDeath has been moved to player-engine.js for centralized state management

    // Trigger missile base destruction effect when player rams the base
    // Unified Nuclear Event Trigger (Mines and Missile Bases)
    triggerNuclearEvent(x, y, type) {

        const isBase = type === 'missile_base_destruction';
        const isMine = type === 'supernova'; // Nuclear Mine type
        const duration = isBase ? 2500 : (isMine ? 8000 : 8000);
        const now = performance.now();

        // Death Mechanics: Deferred until end of animation in effects-engine.js
        // this.handlePlayerDeath(); 

        this.hazardEffect = {
            active: true,
            type: type,
            startTime: now,
            deathTimestamp: now + duration + 1000,
            duration: duration,
            x: x,
            y: y,
            phase: isBase ? 'fire' : (isMine ? 'pre-detonate' : 'flash'),
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
    
    triggerPlanetImpactEffect(planet) {
        // NOTE: We do NOT call handlePlayerDeath() here because it overwrites the hazardEffect
        // with 'player_death'. We want the 'planet_impact' to play first.
        this.damagePlayer(Infinity, false, 'Planet Impact (v2)');
        this.showToast('💀 CRITICAL IMPACT! HULL INTEGRITY LOST...');

        console.log('[Hazard] Ship crashed into planet - impact sequence initiated!');
    }

    // Trigger black hole teleportation effect (15-20 seconds)
    // triggerBlackHoleEffect removed - now in hazard-engine.js

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
                reward: { gold: 300, silver: 200, bronze: 100 }
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
                reward: { gold: 400, silver: 250, bronze: 150 }
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
                reward: { gold: 500, silver: 300, bronze: 200 }
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
                reward: { gold: 600, silver: 400, bronze: 250 }
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
                reward: { gold: 700, silver: 450, bronze: 300 }
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
                reward: { gold: 800, silver: 500, bronze: 350 }
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
                reward: { gold: 1500, silver: 1000, bronze: 500 }
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
            throttle: { gems: { iron: 5, copper: 3 }, bonus: { gold: { silver: 2 }, silver: { titanium: 1 }, bronze: {} } },
            steering: { gems: { copper: 5, titanium: 2 }, bonus: { gold: { silicon: 3 }, silver: { copper: 2 }, bronze: {} } },
            boost: { gems: { titanium: 3, silicon: 3 }, bonus: { gold: { silver: 2 }, silver: { titanium: 2 }, bronze: {} } },
            precision: { gems: { silver: 3, gold: 1 }, bonus: { gold: { platinum: 1 }, silver: { gold: 1 }, bronze: {} } },
            collection: { gems: { gold: 2, platinum: 1 }, bonus: { gold: { palladium: 1 }, silver: { platinum: 1 }, bronze: {} } },
            radar: { gems: { platinum: 2, palladium: 1 }, bonus: { gold: { quartz: 1 }, silver: { palladium: 1 }, bronze: {} } },
            final: { gems: { gold: 3, platinum: 2, diamond: 1 }, bonus: { gold: { emerald: 1, ruby: 1 }, silver: { diamond: 1 }, bronze: { quartz: 1 } } }
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

    // renderWelcomeOverlay has been migrated to ui-renderer.js

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

    // Check if all 7 lessons are complete — award graduation bonus
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
            console.log('[Training] All 7 lessons complete — graduation bonus awarded!');
        }
    }

    // Open the Flight Academy selector UI
    openFlightAcademy() {
        if (!this.flightMode) {
            this.toggleFlightMode();
        }

        const lessons = this.getTrainingLessons();
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
                    <div>
                        <span style="font-size:18px; margin-right:8px;">${lesson.icon}</span>
                        <span style="font-weight:bold; color:#e0faff; font-size:14px;">Lesson ${i + 1}: ${lesson.name}</span>
                        ${medalEmoji ? `<span style="margin-left:8px;">${medalEmoji}</span>` : ''}
                    </div>
                    <div style="font-size:11px; color:${completed ? '#00ff66' : '#667'}">
                        ${completed ? `Best: ${bestTime.toFixed(1)}s` : 'Not completed'}
                    </div>
                    <div style="font-size:11px; color:#8ba; margin-top:4px; margin-left:30px;">${lesson.subtitle}</div>
                </div>
            `;
        });

        html += `
                    </div>
                    <div style="text-align:center; margin-top:20px;">
                        <button onclick="(function(){ const m = document.getElementById('flightAcademyModal'); if(m) m.remove(); })()"
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
    }


    // Legacy tutorial methods (kept for backward compatibility)

    // Update supernova effect state
    // Unified update for all nuclear events
    // ====================================================================

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
            this.generateStaticStars();
            this.showToast('Star colors updated');
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
        const panel = document.getElementById('upgradePanel');
        if (panel) {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                this.updateUpgradeUI();
            }
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
            { id: 'tractor', name: 'Tractor Beam', desc: 'Increases gem pull radius (Mauler)' }
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

    // ====================================================================
    // --- TRADING POST SYSTEM ---
    // ====================================================================

    toggleTradingPost() {
        this.tradingPostOpen = !this.tradingPostOpen;
        let panel = document.getElementById('tradingPostPanel');

        if (!this.tradingPostOpen && panel) {
            panel.remove();
            return;
        }

        if (panel) { panel.remove(); }

        panel = document.createElement('div');
        panel.id = 'tradingPostPanel';
        panel.className = 'trading-post-overlay';
        this.renderTradingPostContent(panel);
        document.body.appendChild(panel);
        gameAudio.playUIClick();
    }

    renderTradingPostContent(panel) {
        const inv = this.playerInventory || {};

        // Build CRAFT cards
        let craftHtml = '';
        Object.values(this.craftingRecipes).forEach(recipe => {
            const canCraft = Object.entries(recipe.materials).every(([m, qty]) => (inv[m] || 0) >= qty);
            const alreadyCrafted = recipe.type === 'permanent' && this.craftedPermanents[recipe.id];

            let matsHtml = '';
            Object.entries(recipe.materials).forEach(([m, qty]) => {
                const have = inv[m] || 0;
                const enough = have >= qty;
                const mInfo = this.mineralTypes[m];
                matsHtml += `<span class="tp-mat ${enough ? 'tp-mat-ok' : 'tp-mat-need'}" style="border-color: ${mInfo?.color || '#888'}">
                    <span class="tp-mat-dot" style="background:${mInfo?.color || '#888'}"></span>
                    ${have}/${qty} ${mInfo?.name || m}
                </span>`;
            });

            craftHtml += `
                <div class="tp-recipe-card ${canCraft && !alreadyCrafted ? 'tp-craftable' : 'tp-locked'}">
                    <div class="tp-recipe-header">
                        <span class="tp-recipe-icon">${recipe.icon}</span>
                        <div class="tp-recipe-info">
                            <div class="tp-recipe-name">${recipe.name}</div>
                            <div class="tp-recipe-desc">${recipe.desc}</div>
                        </div>
                    </div>
                    <div class="tp-mats">${matsHtml}</div>
                    <button class="tp-craft-btn ${canCraft && !alreadyCrafted ? '' : 'tp-btn-disabled'}"
                        onclick="app.craftItem('${recipe.id}')"
                        ${canCraft && !alreadyCrafted ? '' : 'disabled'}>
                        ${alreadyCrafted ? '✅ CRAFTED' : canCraft ? '⚒️ CRAFT' : '🔒 NEED MATERIALS'}
                    </button>
                </div>
            `;
        });

        // Build SELL (Inventory/Gems) section
        let sellHtml = '';
        const sortedInv = Object.entries(inv)
            .filter(([_, qty]) => qty > 0)
            .sort((a, b) => (this.mineralTypes[b[0]]?.value || 0) - (this.mineralTypes[a[0]]?.value || 0));

        if (sortedInv.length === 0) {
            sellHtml = '<div class="tp-empty">No minerals in vault.</div>';
        } else {
            sortedInv.forEach(([type, qty]) => {
                const info = this.mineralTypes[type];
                if (!info) return;
                sellHtml += `
                    <div class="tp-sell-row">
                        <span class="tp-sell-dot" style="background:${info.color}"></span>
                        <span class="tp-sell-name">${info.name}</span>
                        <span class="tp-sell-qty">x${qty}</span>
                        <span class="tp-sell-value">${info.value} 💎 ea</span>
                        <button class="tp-sell-btn" onclick="app.sellMineral('${type}', 1)">SELL 1</button>
                        ${qty >= 5 ? `<button class="tp-sell-btn" onclick="app.sellMineral('${type}', 5)">SELL 5</button>` : ''}
                        <button class="tp-sell-btn tp-sell-all" onclick="app.sellMineral('${type}', ${qty})">ALL</button>
                    </div>
                `;
            });
        }

        // Build CARGO section
        let cargoHtml = '';
        const cargo = this.carriedResources || {};
        const sortedCargo = Object.entries(cargo)
            .filter(([_, qty]) => qty > 0);

        if (sortedCargo.length === 0) {
            cargoHtml = '<div class="tp-empty">Cargo hold is empty.</div>';
        } else {
            cargoHtml += `<div style="margin-bottom: 10px; color: #8ba; font-size: 11px;">Local Market Rates (based on distance from origin)</div>`;
            sortedCargo.forEach(([type, qty]) => {
                const info = this.mineralTypes[type];
                if (!info) return;
                const price = this.getMarketPrice(type, this.playerShip.x, this.playerShip.y);
                cargoHtml += `
                    <div class="tp-sell-row">
                        <span class="tp-sell-dot" style="background:${info.color}"></span>
                        <span class="tp-sell-name">${info.name}</span>
                        <span class="tp-sell-qty">x${qty}</span>
                        <span class="tp-sell-value" style="color:#ffd700">$${price.toLocaleString()} ea</span>
                        <button class="tp-sell-btn tp-sell-all" onclick="app.sellResources()">SELL ALL</button>
                    </div>
                `;
            });
            cargoHtml += `
                <div style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; text-align: center;">
                    <button class="tp-sell-btn tp-sell-all" style="width: 100%; padding: 10px;" onclick="app.sellResources()">💰 SELL ALL CARGO ($${this.calculateCargoValue().toLocaleString()})</button>
                </div>
            `;
        }

        // Active buffs display
        let buffHtml = '';
        this.activeBuffs.forEach(b => {
            const remaining = Math.max(0, Math.ceil((b.expiresAt - Date.now()) / 1000));
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            buffHtml += `<div class="tp-buff-active">⏱️ ${b.name}: ${mins}:${secs.toString().padStart(2, '0')}</div>`;
        });

        // Build FLEET cards
        let fleetHtml = `
            <div class="tp-recipe-card ${this.credits >= 5000 ? 'tp-craftable' : 'tp-locked'}">
                <div class="tp-recipe-header">
                    <span class="tp-recipe-icon">👥</span>
                    <div class="tp-recipe-info">
                        <div class="tp-recipe-name">Hire Wingman</div>
                        <div class="tp-recipe-desc">AI companion that follows and defends you.</div>
                    </div>
                </div>
                <div class="tp-mats">
                    <span class="tp-mat tp-mat-ok" style="border-color: #ffd700">
                        <span class="tp-mat-dot" style="background:#ffd700"></span>
                        $${(this.credits || 0).toLocaleString()} / $5,000 Credits
                    </span>
                </div>
                <button class="tp-craft-btn ${this.credits >= 5000 ? '' : 'tp-btn-disabled'}"
                    onclick="app.hireWingman()"
                    ${this.credits >= 5000 ? '' : 'disabled'}>
                    💰 HIRE WINGMAN
                </button>
            </div>
        `;

        Object.entries(this.craftedPermanents).forEach(([id, data]) => {
            buffHtml += `<div class="tp-buff-perm">⭐ ${data.name}: ${data.desc}</div>`;
        });

        panel.innerHTML = `
            <div class="tp-modal">
                <div class="tp-header">
                    <span class="tp-title">🏪 TRADING POST</span>
                    <span class="tp-gems" style="margin-left:auto; margin-right: 15px;">💰 $${(this.credits || 0).toLocaleString()} | 💎 ${this.playerGems.toLocaleString()}</span>
                    <button class="tp-close" onclick="app.toggleTradingPost()">✕</button>
                </div>
                ${buffHtml ? `<div class="tp-buffs-bar">${buffHtml}</div>` : ''}
                <div class="tp-tabs">
                    <button class="tp-tab tp-tab-active" onclick="app.switchTradingTab('craft')">⚒️ CRAFT</button>
                    <button class="tp-tab" onclick="app.switchTradingTab('sell')">💎 VAULT</button>
                    <button class="tp-tab" onclick="app.switchTradingTab('cargo')">📦 CARGO</button>
                    <button class="tp-tab" onclick="app.switchTradingTab('fleet')">👥 FLEET</button>
                </div>
                <div class="tp-content">
                    <div id="tpCraftTab" class="tp-tab-panel">${craftHtml}</div>
                    <div id="tpSellTab" class="tp-tab-panel" style="display:none">${sellHtml}</div>
                    <div id="tpCargoTab" class="tp-tab-panel" style="display:none">${cargoHtml}</div>
                    <div id="tpFleetTab" class="tp-tab-panel" style="display:none"><div class="tp-grid">${fleetHtml}</div></div>
                </div>
            </div>
        `;
    }

    calculateCargoValue() {
        let total = 0;
        for (const [type, qty] of Object.entries(this.carriedResources || {})) {
            if (qty > 0) {
                total += qty * this.getMarketPrice(type, this.playerShip.x, this.playerShip.y);
            }
        }
        return total;
    }


    switchTradingTab(tab) {
        const craftTab = document.getElementById('tpCraftTab');
        const sellTab = document.getElementById('tpSellTab');
        const cargoTab = document.getElementById('tpCargoTab');
        const fleetTab = document.getElementById('tpFleetTab');
        const tabs = document.querySelectorAll('.tp-tab');

        if (craftTab) craftTab.style.display = tab === 'craft' ? '' : 'none';
        if (sellTab) sellTab.style.display = tab === 'sell' ? '' : 'none';
        if (cargoTab) cargoTab.style.display = tab === 'cargo' ? '' : 'none';
        if (fleetTab) fleetTab.style.display = tab === 'fleet' ? '' : 'none';

        tabs.forEach((t, i) => {
            const isTarget = (tab === 'craft' && i === 0) || (tab === 'sell' && i === 1) || (tab === 'cargo' && i === 2) || (tab === 'fleet' && i === 3);
            t.classList.toggle('tp-tab-active', isTarget);
        });
        gameAudio.playUIClick();
    }


    craftItem(recipeId) {
        const recipe = this.craftingRecipes[recipeId];
        if (!recipe) return;

        const inv = this.playerInventory || {};

        // Check materials
        for (const [mat, qty] of Object.entries(recipe.materials)) {
            if ((inv[mat] || 0) < qty) {
                this.showToast(`⚠️ Need ${qty} ${this.mineralTypes[mat]?.name || mat}!`);
                return;
            }
        }

        // Prevent duplicate permanents
        if (recipe.type === 'permanent' && this.craftedPermanents[recipeId]) {
            this.showToast('Already crafted!');
            return;
        }

        // Consume materials
        for (const [mat, qty] of Object.entries(recipe.materials)) {
            this.playerInventory[mat] -= qty;
        }
        localStorage.setItem('playerInventory', JSON.stringify(this.playerInventory));

        // Apply effect
        if (recipe.type === 'permanent') {
            this.craftedPermanents[recipeId] = { 
                name: recipe.name, 
                desc: recipe.desc, 
                stat: recipe.stat, 
                multiplier: recipe.multiplier,
                flat: recipe.flat
            };
            localStorage.setItem('craftedPermanents', JSON.stringify(this.craftedPermanents));
            this.applyPermanentBuffs();
            this.showToast(`✨ CRAFTED: ${recipe.icon} ${recipe.name}! (Permanent)`);
        } else if (recipe.type === 'timed') {
            this.activeBuffs.push({
                id: recipeId, name: recipe.name, stat: recipe.stat,
                multiplier: recipe.multiplier, expiresAt: Date.now() + recipe.duration
            });
            localStorage.setItem('activeBuffs', JSON.stringify(this.activeBuffs));
            this.showToast(`⏱️ ACTIVATED: ${recipe.icon} ${recipe.name}! (${recipe.duration / 60000} min)`);
        } else if (recipe.type === 'instant') {
            this.executeInstantCraft(recipe);
        } else if (recipe.type === 'deployable') {
            const itemKey = `${recipeId}_unit`;
            this.playerInventory[itemKey] = (this.playerInventory[itemKey] || 0) + 1;
            localStorage.setItem('playerInventory', JSON.stringify(this.playerInventory));
            this.showToast(`🚀 CRAFTED: ${recipe.icon} ${recipe.name}! Use [7/8] to deploy.`);
        }

        gameAudio.playMissionComplete();

        // Refresh the panel
        const panel = document.getElementById('tradingPostPanel');
        if (panel) this.renderTradingPostContent(panel);
    }

    deployUnit(type) {
        const invKey = `${type}_unit`;
        if ((this.playerInventory[invKey] || 0) <= 0) {
            this.showToast(`⚠️ No ${type.replace('_', ' ')}s in cargo!`);
            return;
        }

        this.playerInventory[invKey]--;
        localStorage.setItem('playerInventory', JSON.stringify(this.playerInventory));

        if (type === 'mining_drone') {
            const drone = new MiningDrone(this);
            drone.x = this.playerShip.x;
            drone.y = this.playerShip.y;
            this.playerDrones.push(drone);
            this.showToast('🚀 Mining Drone Deployed!');
        } else if (type === 'player_turret') {
            const turret = new PlayerTurret(this);
            turret.x = this.playerShip.x;
            turret.y = this.playerShip.y;
            this.playerTurrets.push(turret);
            this.showToast('🗼 Defensive Turret Deployed!');
        }
        
        if (gameAudio.playCollect) gameAudio.playCollect();
    }

    hireWingman() {
        if (this.credits < 5000) {
            this.showToast('⚠️ Not enough credits to hire a wingman!');
            return;
        }

        this.credits -= 5000;
        localStorage.setItem('playerCredits', this.credits);
        
        const wingman = new WingmanAI(this);
        this.playerFleet.push(wingman);
        
        this.showToast('👥 Wingman Hired! They will follow and assist you.');
        
        const panel = document.getElementById('tradingPostPanel');
        if (panel) this.renderTradingPostContent(panel);
        
        if (gameAudio.playMissionComplete) gameAudio.playMissionComplete();
    }

    executeInstantCraft(recipe) {
        if (recipe.action === 'fullRepair') {
            this.playerShip.hullHealth = this.playerShip.maxHull;
            this.playerShip.shield = this.playerShip.maxShield;
            this.updateShipStatus();
            this.showToast(`🔧 Hull and shields fully restored!`);
        } else if (recipe.action === 'teleportBase') {
            // Teleport to origin
            this.playerShip.x = 0;
            this.playerShip.y = 0;
            this.playerShip.vx = 0;
            this.playerShip.vy = 0;
            this.showToast(`🌀 Warped back to base!`);
        }
    }

    sellMineral(type, qty) {
        const inv = this.playerInventory || {};
        const have = inv[type] || 0;
        const actualQty = Math.min(qty, have);
        if (actualQty <= 0) return;

        const info = this.mineralTypes[type];
        const totalValue = actualQty * (info?.value || 1);

        this.playerInventory[type] -= actualQty;
        if (this.playerInventory[type] <= 0) delete this.playerInventory[type];
        localStorage.setItem('playerInventory', JSON.stringify(this.playerInventory));

        this.playerGems += totalValue;
        localStorage.setItem('playerGems', this.playerGems);

        this.showToast(`💰 Sold ${actualQty} ${info?.name || type} for ${totalValue.toLocaleString()} gems!`);
        gameAudio.playCollect();

        // Refresh panel
        const panel = document.getElementById('tradingPostPanel');
        if (panel) this.renderTradingPostContent(panel);
    }

    applyPermanentBuffs() {
        // Re-apply all permanent crafted bonuses to ship
        const ship = this.playerShip;
        if (!ship) return;

        // Reset to base + upgrades
        const baseShield = 50 * (1 + (ship.upgrades.shield || 0) * 0.3);
        ship.maxShield = baseShield;
        
        const baseCargo = 50 * (1 + (ship.upgrades.cargo || 0) * 0.5);
        ship.cargoCapacity = baseCargo;

        ship.radarRange = 2000; // Base radar range

        for (const [id, data] of Object.entries(this.craftedPermanents)) {
            if (data.stat === 'maxShield') {
                ship.maxShield = Math.round(ship.maxShield * (data.multiplier || 1));
            } else if (data.stat === 'cargo') {
                ship.cargoCapacity = Math.round(ship.cargoCapacity * (data.multiplier || 1));
                if (data.flat) ship.cargoCapacity += data.flat;
            } else if (data.stat === 'radarRange') {
                if (data.multiplier) ship.radarRange *= data.multiplier;
                if (data.flat) ship.radarRange += data.flat;
            }
        }
    }

    getBuffMultiplier(stat) {
        let mult = 1.0;
        let flat = 0;
        // Timed buffs
        const now = Date.now();
        for (const b of this.activeBuffs) {
            if (b.stat === stat && b.expiresAt > now) {
                mult *= (b.multiplier || 1.0);
                flat += (b.flat || 0);
            }
        }
        // Permanent crafted buffs (some are handled here, others in applyPermanentBuffs)
        for (const [id, data] of Object.entries(this.craftedPermanents)) {
            if (data.stat === stat) {
                mult *= (data.multiplier || 1.0);
                flat += (data.flat || 0);
            }
        }
        return { mult, flat };
    }

    updateActiveBuffs() {
        const now = Date.now();
        const before = this.activeBuffs.length;
        this.activeBuffs = this.activeBuffs.filter(b => b.expiresAt > now);
        if (this.activeBuffs.length !== before) {
            localStorage.setItem('activeBuffs', JSON.stringify(this.activeBuffs));
        }
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
                // Determine the cluster ID to drag (it's either the cluster name string or the star's unique string ID)
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
            newCursor = 'default';
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



    /* --- Utility Methods --- */

    getStarColor(s) {
        return s.color || '#e0faff'; // Fallback to default if somehow color is missing
    }

    updateCargoUsed() {
        if (!this.playerShip) return;
        let total = 0;
        for (const qty of Object.values(this.carriedResources || {})) {
            total += qty;
        }
        this.playerShip.cargoUsed = total;

        // UI Update if available
        const cargoEl = document.getElementById('cargoUsedDisplay');
        if (cargoEl) {
            cargoEl.textContent = `${total} / ${this.playerShip.cargoCapacity}`;
            cargoEl.style.color = total >= this.playerShip.cargoCapacity ? '#ff4444' : '#00f3ff';
        }
    }

    getMarketPrice(mineralType, x, y) {
        const mineral = this.mineralTypes[mineralType];
        if (!mineral) return 0;

        // Base price
        let price = mineral.basePrice || 10;

        // Sector Demand: If the mineral doesn't spawn in this sector's zone, price is higher
        // (x, y) would ideally determine current zone. For now, we'll use a simplified distance-based logic
        // or just random volatility if no coordinates provided.
        const distance = Math.hypot(x || 0, y || 0);
        
        // Find nearest zone to (x, y) - skip for now and use distance as proxy for "rarity"
        // Most minerals are "rarer" further out.
        const rarityMult = 1 + (distance / 5000); // 2x price at 5000 units distance
        
        // Volatility: subtle random shift over time
        const seed = Math.floor(Date.now() / 300000); // changes every 5 mins
        const randomFactor = 1 + (Math.sin(seed + mineralType.length) * (mineral.volatility || 0.1));
        
        return Math.floor(price * rarityMult * randomFactor);
    }

    sellResources() {
        if (!this.isNearBase()) {
            this.showToast('⚠️ Dock at a station to trade!');
            return;
        }

        let totalCredits = 0;
        const soldItems = [];

        for (const [type, qty] of Object.entries(this.carriedResources)) {
            if (qty > 0) {
                const currentPrice = this.getMarketPrice(type, this.playerShip.x, this.playerShip.y);
                const earn = qty * currentPrice;
                totalCredits += earn;
                soldItems.push(`${qty} ${this.mineralTypes[type]?.name || type}`);
                this.carriedResources[type] = 0;
            }
        }

        if (totalCredits > 0) {
            this.credits += totalCredits;
            this.saveCredits();
            this.saveCarriedResources();
            this.updateCargoUsed();
            this.showToast(`💰 Sold cargo for $${totalCredits.toLocaleString()}`);
            if (this.updateGemsUI) this.updateGemsUI();
        } else {
            this.showToast('⚠️ No cargo to sell!');
        }
    }

    hexToRgb(hex) {
        if (!hex || typeof hex !== 'string') return [224, 240, 255]; // Fallback for invalid input
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [224, 240, 255]; // Default blue/white
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
        document.getElementById('clearModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('clearModal').classList.remove('active');
    }

    confirmClear() {
        this.saveState();
        this.stars = [];
        this.camera = { x: 0, y: 0, zoom: 1 };
        this.closeModal();
        this.draw();
        this.showToast("Universe Imploded");
    }

    resetView() {
        this.camera = { x: 0, y: 0, zoom: 1 };
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

    // getConstellationName moved to constellations.js

    // Duplicate setBgStyle removed

    // ... (updateColorModeUI omitted)

    generateBackground() {
        try {
            // Allow empty activeStyles for minimal black background with just faint stars
            this.config.showBackground = true;
            this.staticStars = [];
            this.galaxies = [];
            this.blackHoles = [];
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

            // 2. Compose Layers based on active styles
            // Order matters for layering (Deep Space -> Nebula -> Alien -> Cyber)
            if (this.activeStyles.has('deep-space')) {
                try {
                    this.generateDeepSpaceStyle();
                } catch (e) {
                    console.error('[BG Error] generateDeepSpaceStyle failed:', e);
                }
            }
            if (this.activeStyles.has('nebula')) {
                try {
                    this.generateNebulaStyle();
                } catch (e) {
                    console.error('[BG Error] generateNebulaStyle failed:', e);
                }
            }
            if (this.activeStyles.has('alien')) {
                try {
                    this.generateAlienStyle();
                } catch (e) {
                    console.error('[BG Error] generateAlienStyle failed:', e);
                }
            }
            if (this.activeStyles.has('cyber')) {
                try {
                    this.generateCyberStyle();
                } catch (e) {
                    console.error('[BG Error] generateCyberStyle failed:', e);
                }
            }
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
        // CLEAR existing stars first so color changes take effect
        this.staticStars = [];

        // Use more stars for warp mode for a denser hyperspace field
        const count = this.bgWarpMode ? 600 : 400;

        // ALWAYS read star colors directly from the DOM pickers
        const c1 = document.getElementById('starColor1')?.value || '#ffffff';
        const c2 = document.getElementById('starColor2')?.value || '#aaddff';
        const c3 = document.getElementById('starColor3')?.value || '#ffddaa';
        const activeColors = [c1, c2, c3];
        // Also update the stored starColors array
        this.starColors = activeColors;

        // Generate stars across a much wider area using uniform distribution
        const w = this.canvas.width;
        const h = this.canvas.height;
        console.log(`[Universe] Generating stars for canvas size: ${w}x${h}`);
        if (w === 0 || h === 0) {
            console.warn('[Universe] Canvas dimensions are zero! Star distribution may be broken.');
        }
        const centerX = w / 2;
        const centerY = h / 2;
        const spreadX = w * 20;
        const spreadY = h * 20;

        for (let i = 0; i < count; i++) {
            let x, y, vx = 0, vy = 0;

            if (this.bgWarpMode) {
                // Warp mode: Stars originate from center and move outward radially
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * Math.max(w, h) * 0.8;
                x = centerX + Math.cos(angle) * dist;
                y = centerY + Math.sin(angle) * dist;
                // Faster radial velocity for dramatic hyperspace effect
                const speed = 4 + Math.random() * 16;
                vx = Math.cos(angle) * speed;
                vy = Math.sin(angle) * speed;
            } else {
                // Normal / Drift mode: Uniform distribution
                x = Math.random() * spreadX - spreadX / 2 + centerX;
                y = Math.random() * spreadY - spreadY / 2 + centerY;

                if (this.bgDriftMode) {
                    // Slow gentle drift in random direction
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 0.1 + Math.random() * 0.3;
                    vx = Math.cos(angle) * speed;
                    vy = Math.sin(angle) * speed;
                }
            }

            // Depth layer affects speed - creates parallax at high warp
            const depthLayer = 0.3 + Math.random() * 0.7; // 0.3 to 1.0
            this.staticStars.push({
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                size: (Math.random() * 1.5 + 0.5) * depthLayer, // Farther = smaller
                alpha: Math.random() * 0.5 + 0.1,
                baseAlpha: Math.random() * 0.5 + 0.1,
                color: activeColors[Math.floor(Math.random() * activeColors.length)],
                depth: depthLayer // Used for speed variation
            });
        }
        console.log(`[Universe] Successfully generated ${this.staticStars.length} stars.`);
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
        // Close tier: objects within 400px of center (visible at max zoom ~5x)
        // Medium tier: objects 400-2000px from center (visible at default zoom ~1x)
        // Far tier: objects 2000-6000px from center (visible when zoomed out ~0.1x)

        // 1. Background Stars - distributed across all tiers
        const starCount = 600; // +20%
        for (let i = 0; i < starCount; i++) {
            const tier = Math.random();
            let dist, size;
            if (tier < 0.2) { // Close tier - 20%
                dist = Math.random() * 400;
                size = 0.5 + Math.random() * 1.0;
            } else if (tier < 0.5) { // Medium tier - 30%
                dist = 400 + Math.random() * 1600;
                size = 1.0 + Math.random() * 1.5;
            } else { // Far tier - 50%
                dist = 2000 + Math.random() * 4000;
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

        // 2. Galaxies - distributed across tiers (12 total, +50%)
        const galaxyConfigs = [
            { count: 2, minDist: 100, maxDist: 400, minSize: 60, maxSize: 120 },   // Close
            { count: 4, minDist: 400, maxDist: 2000, minSize: 100, maxSize: 250 }, // Medium
            { count: 6, minDist: 2000, maxDist: 6000, minSize: 200, maxSize: 450 } // Far
        ];
        galaxyConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                const dist = cfg.minDist + Math.random() * (cfg.maxDist - cfg.minDist);
                const angle = Math.random() * Math.PI * 2;
                this.galaxies.push({
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    z: (Math.random() * zRange) - zRange / 2,
                    // Expanded color palette
                    color: ['#ff0055', '#5500ff', '#00aaff', '#ff00aa', '#00ff88', '#ffaa00', '#aa00ff', '#ffffff'][Math.floor(Math.random() * 8)],
                    angle: Math.random() * Math.PI * 2,
                    size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize)
                });
            }
        });

        // 3. Black Holes - 3 total (+50%), one per tier
        const blackHoleConfigs = [
            { minDist: 200, maxDist: 500, minSize: 20, maxSize: 40 },
            { minDist: 800, maxDist: 2000, minSize: 40, maxSize: 80 },
            { minDist: 2500, maxDist: 5000, minSize: 80, maxSize: 150 }
        ];
        blackHoleConfigs.forEach(cfg => {
            const dist = cfg.minDist + Math.random() * (cfg.maxDist - cfg.minDist);
            const angle = Math.random() * Math.PI * 2;
            this.blackHoles.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize)
            });
        });

        // 4. Nebulae - 18 total (+50%), distributed across tiers
        const nebulaConfigs = [
            { count: 4, minDist: 50, maxDist: 500, minSize: 150, maxSize: 350 },
            { count: 6, minDist: 500, maxDist: 2500, minSize: 350, maxSize: 700 },
            { count: 8, minDist: 2500, maxDist: 6000, minSize: 600, maxSize: 1200 }
        ];
        nebulaConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                const dist = cfg.minDist + Math.random() * (cfg.maxDist - cfg.minDist);
                const angle = Math.random() * Math.PI * 2;
                this.nebulae.push({
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
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
            { count: 3, minDist: 100, maxDist: 500, minRadius: 20, maxRadius: 50 },
            { count: 5, minDist: 500, maxDist: 2500, minRadius: 40, maxRadius: 100 },
            { count: 7, minDist: 2500, maxDist: 6000, minRadius: 80, maxRadius: 180 }
        ];

        // Helper to perturb colors for variety
        const perturbColor = (hex, amount = 30) => {
            if (!hex || !hex.startsWith('#')) return hex;
            let r = parseInt(hex.slice(1, 3), 16);
            let g = parseInt(hex.slice(3, 5), 16);
            let b = parseInt(hex.slice(5, 7), 16);
            return `rgb(${r},${g},${b})`;
        };

        // End of generateDeepSpaceStyle
    }

    // Background style generation functions moved to proc-gen.js
    updateBackgroundEntities() {
        if (!this.flightMode) return;
        try {
            const targetWarp = this.bgWarpMode ? (this.warpSpeedMultiplier || 1) * 25.2 / 33 : 0;
            const rampSpeed = 0.05;
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const w = this.canvas.width;
            const h = this.canvas.height;

            this.warpSpeed = this.warpSpeed || 0;

            if (this.bgWarpMode || this.warpDisengaging) {
                this.warpSpeed += (targetWarp - this.warpSpeed) * rampSpeed;
                this.warpSpeed = Math.min(this.warpSpeed, 25.2);
                if (this.warpSpeed < 0.01) this.warpSpeed = 0;
            }

            this.staticStars.forEach(s => {
                if (typeof s.vx !== 'number') s.vx = 0;
                if (typeof s.vy !== 'number') s.vy = 0;
                if (typeof s.baseAlpha !== 'number') s.baseAlpha = s.alpha || 0.5;
                if (typeof s.origX !== 'number') s.origX = s.x;
                if (typeof s.origY !== 'number') s.origY = s.y;

                if ((this.bgWarpMode || this.warpDisengaging) && !this.bgDriftMode) {
                    const dx = s.x - centerX;
                    const dy = s.y - centerY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 5) {
                        const angle = Math.random() * Math.PI * 2;
                        s.x = centerX + Math.cos(angle) * 20;
                        s.y = centerY + Math.sin(angle) * 20;
                        return;
                    }

                    const warpIntensity = (this.warpSpeed || 0);
                    const jitterAmount = Math.min(0.08, warpIntensity * 0.003);
                    const jitterAngle = (Math.random() - 0.5) * jitterAmount;
                    const baseDirX = dist > 1 ? dx / dist : 0;
                    const baseDirY = dist > 1 ? dy / dist : 0;
                    const cosJ = Math.cos(jitterAngle);
                    const sinJ = Math.sin(jitterAngle);
                    const dirX = baseDirX * cosJ - baseDirY * sinJ;
                    const dirY = baseDirX * sinJ + baseDirY * cosJ;

                    const depthFactor = s.depth || 0.5;
                    const perspectiveAccel = 1 + (dist / Math.max(w, h)) * 1.2;
                    const speed = warpIntensity * perspectiveAccel * 10.5 * depthFactor;

                    s.x += dirX * speed;
                    s.y += dirY * speed;

                    const maxDist = Math.max(w, h) * 0.9;
                    if (dist > maxDist || s.x < -50 || s.x > w + 50 || s.y < -50 || s.y > h + 50) {
                        const angle = Math.random() * Math.PI * 2;
                        const startDist = 3 + Math.random() * Math.random() * 80;
                        s.x = centerX + Math.cos(angle) * startDist;
                        s.y = centerY + Math.sin(angle) * startDist;
                        s.alpha = 0.05;
                        s.depth = 0.3 + Math.random() * 0.7;
                        s.size = (Math.random() * 1.5 + 0.5) * s.depth;
                    } else {
                        const fadeRate = 0.6 + depthFactor * 0.4;
                        s.alpha = Math.min(1, 0.15 + (dist / maxDist) * 0.85 * fadeRate);
                    }
                } else if (this.bgDriftMode && !this.bgWarpMode) {
                    s.x += s.vx * 0.03;
                    s.y += s.vy * 0.03;
                    if (s.x < -w * 5) s.x += w * 10;
                    if (s.x > w * 5) s.x -= w * 10;
                    if (s.y < -h * 5) s.y += h * 10;
                    if (s.y > h * 5) s.y -= h * 10;
                }
            });

            if (this.bgWarpMode || this.warpDisengaging) {
                const camera = this.camera || { x: 0, y: 0, zoom: 1 };
                const zoom = camera.zoom || 1;
                const screenCenterWorldX = -(camera.x || 0) / zoom;
                const screenCenterWorldY = -(camera.y || 0) / zoom;
                const warpIntensity = this.warpSpeed || 0;
                
                const flyObject = (obj, speedMultiplier = 1, maxSpread = 2000) => {
                    if (!obj) return;
                    if (this.warpDisengaging) {
                        obj.flownOut = false;
                        if (!obj.disengageInit) {
                            const angle = Math.random() * Math.PI * 2;
                            const distance = 200 + Math.random() * maxSpread;
                            obj.finalX = screenCenterWorldX + Math.cos(angle) * distance;
                            obj.finalY = screenCenterWorldY + Math.sin(angle) * distance;
                            obj.depth = 0.3 + Math.random() * 1.4;
                            obj.startX = screenCenterWorldX;
                            obj.startY = screenCenterWorldY;
                            obj.disengageInit = true;
                        }
                        const progress = 1 - Math.min(1, (warpIntensity || 0) / 25);
                        obj.x = obj.startX + (obj.finalX - obj.startX) * progress;
                        obj.y = obj.startY + (obj.finalY - obj.startY) * progress;
                        obj.warpScale = 0.01 + (progress**3) * 0.99;
                        obj.warpAlpha = Math.max(0, (progress - 0.35) / 0.65);
                    } else {
                        if (obj.flownOut) return;
                        const dx = obj.x - screenCenterWorldX, dy = obj.y - screenCenterWorldY;
                        const dist = Math.sqrt(dx*dx + dy*dy);
                        if (dist < 5) { obj.x += 20; return; }
                        const zoomFactor = 1 / zoom;
                        const speed = warpIntensity * (1 + (dist / this.worldSize) * 1.2) * 10.5 * (obj.depth || 0.5) * speedMultiplier * 4.0 * zoomFactor;
                        obj.x += (dx/dist) * speed; obj.y += (dy/dist) * speed;
                        if (dist > this.worldSize * 2) obj.flownOut = true;
                    }
                };

                [this.planets, this.galaxies, this.blackHoles, this.nebulae, this.spacecraft, this.stars].forEach((list, idx) => {
                    if (list) list.forEach(o => flyObject(o, [0.8, 0.5, 0.4, 0.6, 1.2, 0.9][idx]));
                });
            }
        } catch (e) {
            console.error('[WARP] Animation error:', e);
        }
    }

    draw(rawTime) {
        const { ctx, canvas } = this;
        // Safety: Ensure time is ALWAYS a valid number to prevent NaN in sin/cos calculations
        const time = typeof rawTime === 'number' ? rawTime : performance.now();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = this.config.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.renderBackgroundStars(ctx);
        this.renderShootingStars(ctx);

        const backgroundParallax = 0.98;
        const zoomParallax = 0.3;
        const pZoom = 1 + (this.camera.zoom - 1) * zoomParallax;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(pZoom, pZoom);

        const driftX = Math.sin(time / 5000) * 20;
        const driftY = Math.cos(time / 7000) * 20;
        ctx.translate(
            -(this.playerShip.x * backgroundParallax + driftX),
            -(this.playerShip.y * backgroundParallax + driftY)
        );

        this.drawBackgroundElements();
        ctx.restore();

        ctx.save();
        const shakeX = (Math.random() - 0.5) * (this.camera.shake || 0);
        const shakeY = (Math.random() - 0.5) * (this.camera.shake || 0);
        ctx.translate(canvas.width / 2 + this.camera.x + shakeX, canvas.height / 2 + this.camera.y + shakeY);
        ctx.scale(this.camera.zoom, this.camera.zoom);

        if (this.activeStyles.has('deep-space')) this.drawDeepSpaceSpecific();

        if (this.anomalies && this.anomalies.length > 0) {
            this.anomalies.forEach(a => renderAnomaly(ctx, a, time));
        }

        if (this.spaceBase && this.spaceBase.isDeployed) {
            renderStation(ctx, this.spaceBase, this.baseModules, time, this.isNearBase());
            renderTowLine(ctx, this.playerShip, this.spaceBase, time);
        }

        if (this.factionPatrols && this.factionPatrols.length > 0) {
            this.factionPatrols.forEach(p => {
                if (!p.active) return;
                const standing = this.factionReputation[p.factionId] || 0;
                renderFactionPatrol(ctx, p, time, isFactionHostile(standing));
            });
        }

        if (this.capitalShips && this.capitalShips.length > 0) {
            this.capitalShips.forEach(cs => {
                if (!cs.active) return;
                const standing = this.factionReputation[cs.faction] || 0;
                renderCapitalShip(ctx, cs, time, isFactionHostile(standing));
            });
        }

        if (this.playerOutposts && this.playerOutposts.length > 0) {
            this.playerOutposts.forEach(o => renderOutpost(ctx, o, time));
        }

        if (this.sectorInfrastructure && this.sectorInfrastructure.length > 0) {
            this.renderSectorInfrastructure(ctx, time);
        }

        // Calculations & Cluster ID Assignment
        const { lines, clusters } = this.refreshClusterAssignments();

        this.renderConstellationLines(ctx, lines);
        this.renderConstellationNames(ctx, clusters);

        this.renderFocusedStars(ctx);

        const statEl = document.getElementById('stats');
        if (statEl) {
            const constellationCount = clusters.filter(c => c.length >= (this.config.minGroupSize || 3)).length;
            statEl.innerText = `Mode: ${this.mode.charAt(0).toUpperCase() + this.mode.slice(1)} | Stars: ${this.stars.length} | Constellations: ${constellationCount} | Zoom: ${this.camera.zoom.toFixed(2)} x`;
        }

        if (this.flightMode && this.playerShip) {
            this.renderSpeedLines(ctx);
            this.renderMinerals(ctx, time);
            this.renderTutorialWaypoints(ctx);
            this.renderHazards(ctx, time);  
            this.renderProjectiles(ctx);
            this.renderLootItems(ctx);
            this.renderPlayerShip(ctx, time);
            this.renderRemotePlayers(ctx, time);
            this.renderDamageEffects(ctx);
            this.renderAbilityEffects(ctx, time);
            this.renderSolarFlareOverlay(ctx);
            this.renderCollectionNotifications(ctx);
            this.renderTutorialHUDIndicator(ctx);
            this.renderInfrastructureHUD(ctx);
        }

        ctx.restore(); // Close World Transform
        this.renderWelcomeOverlay(ctx);

        this.renderCyberEffect(ctx);
        this.renderHazardEffect(ctx, time);

        this.renderPulsePing(ctx);
    }




    renderRemotePlayers(ctx, time) {
        if (!this.remotePlayers || this.remotePlayers.size === 0) return;

        ctx.save();
        for (const [id, player] of this.remotePlayers.entries()) {
            ctx.save();
            ctx.translate(player.x, player.y);
            ctx.rotate(player.rotation || 0);

            // Ghostly transparency
            ctx.globalAlpha = 0.4;
            
            const size = 30 / this.camera.zoom;
            // Default to phantom white for remote players
            const shipColor = '#ffffff';
            
            // Draw a simplified ghost ship shape (Phantom Interceptor)
            ctx.fillStyle = shipColor;
            ctx.shadowBlur = 10;
            ctx.shadowColor = shipColor;
            
            ctx.beginPath();
            ctx.moveTo(size, 0);
            ctx.lineTo(-size * 0.8, -size * 0.6);
            ctx.lineTo(-size * 0.5, 0);
            ctx.lineTo(-size * 0.8, size * 0.6);
            ctx.closePath();
            ctx.fill();

            // Name tag / Pilot ID
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Orbitron, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(player.playerId || 'Pilot', 0, -size - 10);

            ctx.restore();
        }
        ctx.restore();
    }





    /* --- Fleet HUD --- */




    // Get the center point of all stars (constellation center)
    // Constellation and 3D utilities moved to constellations.js


    // Ship Selection Methods
    showShipModal() {
        const modal = document.getElementById('shipModal');
        if (modal) {
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
           <div class="ship-hologram" id="hologram-container-${ship.id}">
               <div class="hologram-glow"></div>
               <div class="scanning-beam"></div>
               <canvas id="preview-${ship.id}" width="400" height="400"></canvas>
           </div>
           ${lockHtml}
        `;
            track.appendChild(bay);

            // Add rotation listeners to canvas
            const canvas = bay.querySelector('canvas');
            if (canvas) {
                canvas.addEventListener('mousedown', (e) => {
                    this.isDraggingHologram = true;
                    this.lastMouseX = e.clientX;
                });
                window.addEventListener('mousemove', (e) => {
                    if (this.isDraggingHologram) {
                        const deltaX = e.clientX - this.lastMouseX;
                        this.hologramRotation += deltaX * 0.01;
                        this.lastMouseX = e.clientX;
                    }
                });
                window.addEventListener('mouseup', () => {
                    this.isDraggingHologram = false;
                });
                
                // Touch support
                canvas.addEventListener('touchstart', (e) => {
                    this.isDraggingHologram = true;
                    this.lastMouseX = e.touches[0].clientX;
                }, { passive: true });
                window.addEventListener('touchmove', (e) => {
                    if (this.isDraggingHologram) {
                        const deltaX = e.touches[0].clientX - this.lastMouseX;
                        this.hologramRotation += deltaX * 0.01;
                        this.lastMouseX = e.touches[0].clientX;
                    }
                }, { passive: true });
                window.addEventListener('touchend', () => {
                    this.isDraggingHologram = false;
                });
            }
        });
        this.updateHangarUI();
    }

    updateHangarUI() {
        const track = document.getElementById('hangarTrack');
        const indicator = document.getElementById('bayIndicator');
        const actionBtn = document.getElementById('hangarActionBtn');

        if (track) {
            track.style.transform = `translateX(${-this.currentHangarBay * 100}%)`;
        }
        if (indicator) {
            indicator.textContent = `BAY ${this.currentHangarBay + 1} / ${this.hangarShips.length}`;
        }

        // Update global action button
        if (actionBtn && this.hangarShips[this.currentHangarBay]) {
            const ship = this.hangarShips[this.currentHangarBay];
            const isLocked = ship.premium && !this.unlockedShips.includes(ship.id);
            const shipPrices = {
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
            const price = shipPrices[ship.id] || 1000;

            if (isLocked) {
                if (this.playerGems >= price) {
                    actionBtn.textContent = `UNLOCK (${price} GEMS)`;
                    actionBtn.className = 'select-ship-btn unlock-btn available';
                    actionBtn.onclick = () => this.unlockShip(ship.id, price);
                } else {
                    actionBtn.textContent = `${price} GEMS REQUIRED`;
                    actionBtn.className = 'select-ship-btn unlock-btn locked';
                    actionBtn.onclick = () => this.showToast('Not enough gems!', 2000);
                }
            } else {
                actionBtn.textContent = 'ENGAGE PILOT';
                actionBtn.className = 'select-ship-btn';
                actionBtn.onclick = () => this.selectShip(ship.id);
            }
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

        if (ship) {
            // Save ship type to localStorage for persistence
            localStorage.setItem('playerShipType', shipType);
            console.log(`[Hangar] Selected ${shipType}`);

            if (this.playerShip) {
                this.playerShip.type = shipType;
                this.playerShip.maxSpeed = ship.maxSpeed;
                this.playerShip.acceleration = ship.acceleration;

                this.showToast(`SYSTEMS ONLINE: ${ship.name.toUpperCase()} CLASS`, 2000);

                // Force camera to recenter on ship to prevent disappearing off screen
                if (this.flightMode && this.camera) {
                    this.camera.x = -this.playerShip.x * this.camera.zoom;
                    this.camera.y = -this.playerShip.y * this.camera.zoom;
                }
            } else {
                this.toggleFlightMode();
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

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${w} ${h}" style="background:#020205">
            <rect x="${vbX}" y="${vbY}" width="${w}" height="${h}" fill="#020205" />`;

        // Lines
        lines.forEach(l => {
            const op = (1 - (l.dist / this.config.maxConnectDist)).toFixed(2);
            const [r, g, b] = this.hexToRgb(this.getStarColor(l.s1));
            svg += `<line x1="${l.s1.x}" y1="${l.s1.y}" x2="${l.s2.x}" y2="${l.s2.y}" stroke="rgb(${r}, ${g}, ${b})" stroke-width="1.5" stroke-linecap="round" opacity="${(op * 0.8).toFixed(2)}" />`;
        });

        // Labels
        clusters.forEach(c => {
            const name = String(c[0].clusterId);
            if (c.length < this.config.minGroupSize || name === String(c[0].id)) return;

            let cx = 0, cy = 0; c.forEach(s => { cx += s.x; cy += s.y }); cx /= c.length; cy /= c.length;
            const color = this.getStarColor(c[0]);
            svg += `<text x="${cx}" y="${cy + 30}" font-family="sans-serif" font-size="14" fill="${color}" text-anchor="middle" font-weight="600">${name}</text>`;
        });

        // Stars
        this.stars.forEach(s => {
            const color = this.getStarColor(s);
            const r = this.config.starBaseRad * 1.5;

            // Star Shape
            const pr = r * 0.5;
            const pathData = `M${s.x} ${s.y - r} L${s.x + pr} ${s.y - pr} L${s.x + r} ${s.y} L${s.x + pr} ${s.y + pr} L${s.x} ${s.y + r} L${s.x - pr} ${s.y + pr} L${s.x - r} ${s.y} L${s.x - pr} ${s.y - pr} Z`;
            svg += `<path d="${pathData}" fill="${color}" opacity="0.8" />`;

            // Core dot
            svg += `<circle cx="${s.x}" cy="${s.y}" r="1.5" fill="white" />`;
        });

        svg += `</svg>`;

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

    // Color customization for ship and HUD

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

    // Helper for RGBA conversion
    hexToRgbString(hex) {
        if (!hex || typeof hex !== 'string') return '0, 243, 255'; // Fallback for invalid input
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 243, 255';
    }
}

// Expose static configuration dependencies to modular subsystems via EngineClass
InterstellarEngine.DIFFICULTY_SETTINGS = DIFFICULTY_SETTINGS;
InterstellarEngine.BASE_MODULES = BASE_MODULES;
InterstellarEngine.MINERAL_TYPES = MINERAL_TYPES;
InterstellarEngine.GALAXY_ZONES = GALAXY_ZONES;
InterstellarEngine.HANGAR_SHIPS = HANGAR_SHIPS;
InterstellarEngine.CORE_ACHIEVEMENTS = CORE_ACHIEVEMENTS;
InterstellarEngine.CRAFTING_RECIPES = CRAFTING_RECIPES;
InterstellarEngine.CONSTELLATION_NAMES = CONSTELLATION_NAMES;
InterstellarEngine.FACTIONS = FACTIONS;

// === SUBSYSTEM INTEGRATION ===
setupUniverse(InterstellarEngine);
setupInput(InterstellarEngine);
setupSaveSystem(InterstellarEngine);
setupHangar(InterstellarEngine);
setupAudio(InterstellarEngine);
setupPlayerEngine(InterstellarEngine);
setupTraining(InterstellarEngine);
setupCrafting(InterstellarEngine);
setupMissions(InterstellarEngine);
setupCombatEngine(InterstellarEngine);
setupUiManager(InterstellarEngine);
console.log('[Engine] Starting prototype setup sequence...');
setupUi(InterstellarEngine); console.log('✅ UI setup');
setupRendering(InterstellarEngine); console.log('✅ Rendering setup');
setupShipRenderer(InterstellarEngine); console.log('✅ ShipRenderer setup');
setupEnvironmentRenderer(InterstellarEngine); console.log('✅ EnvRenderer setup');
setupVfxRenderer(InterstellarEngine); console.log('✅ VfxRenderer setup');
setupUiRenderer(InterstellarEngine);
setupPhysics(InterstellarEngine); console.log('✅ Physics setup');
setupUniverseEngine(InterstellarEngine);
setupProcGen(InterstellarEngine);
setupEffectsEngine(InterstellarEngine);
setupExport(InterstellarEngine);
setupWindowManager(InterstellarEngine);
setupAdminPanel(InterstellarEngine);
setupHazardEngine(InterstellarEngine);
setupAbilityEngine(InterstellarEngine);
setupAchievements(InterstellarEngine);
setupBackgroundVisuals(InterstellarEngine);
setupConstellations(InterstellarEngine);
// setupSpecialEffects removed — migrated to vfx-renderer.js
setupShipPainter(InterstellarEngine);

window.game = new InterstellarEngine();
window.app = window.game; // HTML onclick handlers reference 'app'

console.log('>>> SCRIPT_V2.JS FULLY EXECUTED');
