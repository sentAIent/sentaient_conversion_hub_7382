console.log("🚀 INTERSTELLAR ENGINE: Phase 30: Celestial Immersion");
console.log("🚀 INTERSTELLAR ENGINE Phase 30 - Eternal Frontier");

/**
 * InterstellarEngine - Core Game Class
v5.0 - Pre-Placement Color Model
 */


// === AUDIO ENGINE ===
// Moved to audio-engine.js (Phase 8 modularization)
// gameAudio instance available globally via window.gameAudio

// === GRADIENT SAFETY PATCH (Phase 25) ===
if (typeof CanvasGradient !== 'undefined' && !CanvasGradient.prototype.safeAddColorStop) {
    CanvasGradient.prototype.safeAddColorStop = function(offset, color) {
        try {
            const safeOffset = isFinite(offset) ? Math.max(0, Math.min(1, offset)) : 0;
            this.addColorStop(safeOffset, color || 'transparent');
        } catch (e) {
            console.warn('[CanvasGradient] safeAddColorStop failed:', e);
        }
    };
}

class InterstellarEngine {
    updatePlayerDeathEffect(progress) {
        if (progress > 0.9 && !this._respawnTriggered) {
             this._respawnTriggered = true;
             this.playerShip.hullHealth = this.playerShip.maxHull;
             this.playerShip.shield = this.playerShip.maxShield;
             this.playerShip.health = this.playerShip.maxHull;
             this.hudManager?.showToast('🚀 EMERGENCY RECONSTRUCTION COMPLETE', 3000, 'success');
             setTimeout(() => { this._respawnTriggered = false; }, 1000);
        }
        if (this.camera) {
            this.camera.shakeX = (Math.random() - 0.5) * (1 - progress) * 20;
            this.camera.shakeY = (Math.random() - 0.5) * (1 - progress) * 20;
        }
    }

    renderPlayerDeathEffect(ctx, time) {
        const progress = this.hazardEffect ? (this.hazardEffect.progress || 0) : 0;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = `rgba(255, 0, 0, ${progress * 0.4})`;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Glitch lines
        if (Math.random() < 0.3) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(0, Math.random() * this.canvas.height, this.canvas.width, 2);
        }
        ctx.restore();
    }


    constructor() {
        console.log("Interstellar Engine v3.5 - Phase 30: Celestial Immersion");
        console.log("🚀 InterstellarEngine: Initializing...");
        console.log("InterstellarEngine Loaded - Quantum v5.1");
        this.canvas = document.getElementById('canvas');
        if (!this.canvas) {
            console.error("❌ CRITICAL: Canvas element NOT found!");
            return;
        }
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        if (this.ctx) {
            console.log("✅ Canvas context initialized");
        } else {
            console.error("❌ FATAL: Failed to get 2D context from canvas.");
        }
        
        // Phase 18: Early window assignment to support circular dependencies
        window.game = this;
        window.app = this;
        this.ready = false; // Guard for renderer
        


        document.title = "INTERSTELLAR v3.5 - Phase 30: Celestial Immersion";
        console.log("📍 Checkpoint: Constructor - Start Managers");
        
        // Load Mindwave Lotus image
        this.lotusImage = new Image();
        this.lotusImage.src = '../mindwave-cursor.png';

        // Configuration
        this.config = {
            maxConnectDist: 180,
            starBaseRad: 3.5,
            minGroupSize: 3,
            bgColor: '#000000',
            showBackground: true,
        };

        // World size for background generation (covers full canvas at min zoom 0.1x)
        this.worldSize = 12000;

        // --- CORE GAME STATE INITIALIZATION ---
        // These MUST be defined before any managers are created
        this.stars = [];
        this.minerals = [];
        this.enemyShips = [];
        this.enemyMissiles = [];
        this.enemyBullets = [];
        this.damageParticles = [];
        this.decoyFlares = [];
        this.hazardBlackHoles = [];
        this.playerWingmen = [];
        this.activeMissions = [];
        this.activeBoss = null;
        this.staticStars = [];
        this.spaceBases = [];
        this.planets = [];
        this.backgroundStars = [];
        this.shootingStars = [];
        this.nebulae = [];
        this.galaxies = [];
        this.blackHoles = [];
        this.alienArtifacts = [];
        this.spacecraft = [];
        this.cyberNodes = [];
        this.matrixStreams = [];
        this.resourceDeposits = [];
        this.spaceMines = [];
        this.missileBases = [];
        this.decorations = [];
        this.asteroids = [];
        this.comets = [];
        this.lootItems = [];
        this.activeEvents = [];
        this.projectiles = [];
        this.bullets = this.projectiles; // Alias for compatibility
        this.speedLines = []; 
        this.collectionNotifications = [];
        this.maulerDebris = [];
        this.wormholes = [];
        this.ancientRelics = [];
        this.enemies = [];
        this.suns = [];
        this.comets = [];
        this.warpGates = [];
        this.keysPressed = {};

        // --- CELESTIAL STATE ---
        this.activeStyles = new Set();
        try {
            const saved = JSON.parse(localStorage.getItem('activeBgStyles') || '["deep-space"]');
            // Sanitize: only allow known base styles to prevent visual corruption
            const VALID_STYLES = new Set([
                'deep-space', 'deep-space-purple', 'deep-space-gold',
                'nebula', 'nebula-pink', 'nebula-green',
                'alien', 'alien-purple', 'alien-teal',
                'matrix', 'matrix-pink', 'matrix-gold'
            ]);
            if (Array.isArray(saved) && saved.length > 0) {
                const cleaned = saved.filter(s => VALID_STYLES.has(s));
                // Max 2 styles to prevent visual overload / color wash
                const limited = cleaned.length > 0 ? cleaned.slice(0, 2) : ['deep-space'];
                limited.forEach(s => this.activeStyles.add(s));
            } else {
                this.activeStyles.add('deep-space');
            }
        } catch (e) {
            this.activeStyles.add('deep-space');
        }
        // Persist sanitized styles back to prevent poisoned localStorage from recurring
        localStorage.setItem('activeBgStyles', JSON.stringify([...this.activeStyles]));

        // Economy & Reputation
        this.credits = 1000;
        this.playerGems = 0;
        this.playerInventory = {};
        this.carriedResources = {};
        this.collectedLotus = 0;
        this.factionRep = { xenon: -50, mauler: -20, terran: 100 };
        this.trainingActive = false;
        this.nexusCredits = 0;
        this.nexusUpgrades = {};
        this.cinematicMode = false;
        this.targetCameraX = 0;
        this.targetCameraY = 0;

        // Player & View State
        this.camera = { x: 0, y: 0, zoom: 1, targetZoom: 1 };
        window.NUCLEAR_FILTER = false; // Restored background for Phase 21 Stabilization

        // 🛡️ SYSTEMIC HEALTH & PHYSICS GUARD: Phase 25 Majestic Baseline
        this.playerShip = {
            x: 0, y: 0, z: 0,
            vx: 0, vy: 0, vz: 0,
            rotation: 0, pitch: 0, roll: 0,
            rotationSpeed: 0.035,
            acceleration: 0.2,
            maxSpeed: 15,
            hullHealth: 100, maxHull: 100,
            shield: 100, maxShield: 100,
            health: 100, // Legacy support
            atomicShield: 0, maxAtomicShield: 500,
            atomicRechargeRate: 0.5,
            type: 'interceptor',
            isCloaked: false,
            upgrades: {} // Initialize upgrades object to prevent reference errors
        };
        
        // --- EMPIRE METRICS (Phase 18) ---
        this.lastImperialTax = 0;
        this.energyMultiplier = 1.0;

        // Ensure all physics variables are numbers and non-NaN
        const ship = this.playerShip;
        ['x', 'y', 'z', 'vx', 'vy', 'vz', 'rotation', 'pitch', 'roll', 'hullHealth', 'shield'].forEach(prop => {
            if (ship[prop] === undefined || isNaN(ship[prop])) {
                ship[prop] = 0;
            }
        });
        
        if (ship.hullHealth === undefined || isNaN(ship.hullHealth)) ship.hullHealth = 100;
        if (ship.shield === undefined || isNaN(ship.shield)) ship.shield = 100;
        
        // Match rotationX to ship rotation for consistency
        this.rotationX = ship.rotation || 0;
        
        console.log("✅ InterstellarEngine: Ship state stabilized.");
        this.rotationY = 0;
        this.rotationZ = 0;
        this.mode = 'draw';
        this.flightMode = false; // Start in Cartographer mode
        
        // Phase 3: Director's Cut State
        this.timeScale = 1.0;
        this.directorMode = false;
        this.hudHidden = false;
        this.cameraSmoothness = 1.0;
        this.muzzleFlashTimer = 0;
        this.fleetCommand = 'defend'; // Phase 4: defend, attack, guard
        this.fleetFormation = 'v-shape';
        this.frameCounter = 0; // Initialized here; incremented by GameLoop

        // Hangar & Ship Designs
        this.hangarShips = [];
        this.currentHangarBay = 0;
        this.unlockedShipDesigns = ['interceptor'];

        // Procedural Universe Generation System
        this.sectorSize = 10000; // Each sector is 10k x 10k units
        this.loadedSectors = new Map(); // Map of "x,y" -> sector data
        this.currentSector = { x: 0, y: 0 }; // Player's current sector
        this.generationBoundary = 3000; // Generate new sectors when within this distance of edge

        window.app = this;
        window.game = this;
        console.log("📍 Early window.game registration complete.");

        // --- PHASE 30: CRITICAL RESIZE SYNC ---
        // Ensure canvas has dimensions BEFORE managers start generating world objects
        this.resize();

        // --- SYSTEMIC BOOT AUDIT & MANAGER INITIALIZATION ---
        try {
            console.log("📍 [Engine] Starting Systemic Boot Audit...");
            const managers = {
                'HUDManager': 'hudManager', // Prioritize HUD for UI stability
                'NotificationManager': 'notificationManager',
                'ParticleManager': 'particleManager',
                'MarketplaceManager': 'marketplaceManager',
                'LogManager': 'logManager',
                'FleetManager': 'fleetManager',
                'NarrativeManager': 'narrativeManager',
                'CinematicManager': 'cinematicManager',
                'InputManager': 'inputManager',
                'CombatManager': 'combatManager',
                'ProceduralManager': 'proceduralManager',
                'PhysicsManager': 'physicsManager',
                'RenderManager': 'renderManager',
                'MissionManager': 'missionManager',
                'HazardManager': 'hazardManager',
                'EffectManager': 'effectManager',
                'EngineCore': 'engineCore',
                'GameLoopManager': 'gameLoop',
                'PersistenceManager': 'persistenceManager',
                'WarpGateManager': 'warpGateManager',
                'AIManager': 'aiManager',
                'BossManager': 'bossManager',
                'AdminManager': 'adminManager',
                'CapitalShipManager': 'capitalShipManager',
                'SectorManager': 'sectorManager',
                'ResourceManager': 'resourceManager',
                'HangarManager': 'hangarManager',
                'ColonyManager': 'colonyManager',
                'AcademyManager': 'academyManager',
                'UIManager': 'uiManager',
                'BaseBuilder': 'baseBuilder',
                'SurfaceManager': 'surfaceManager',
                'LogisticsManager': 'logisticsManager',
                'PlayerManager': 'playerManager',
                'WeaponManager': 'weaponManager'
            };

            console.log("🌌 [Boot] Starting Manager Orchestration...");

            const report = {};
            let criticalMissing = false;

            // Defensive Class - Prevents engine crashes when a manager script fails to load
            class SafeMock {
                constructor(name) { 
                    this.name = name; 
                    this.__isMock = true;
                }
                update() { /* no-op */ }
                render() { /* no-op */ }
                draw() { /* no-op */ } 
                init() { /* no-op */ }
                getTrainingLessons() { return []; } 
                showToast(t) { console.warn(`[Mock HUD] ${t}`); }
                updateWarpUI() { /* no-op */ }
                showEmpireOverview() { window.game.showEmpireOverview(); }
                showPrestigeModal() { window.game.showPrestigeModal(); }


                renderLogBook() { console.warn("[Mock] renderLogBook ignored"); }
                getPlayerInfluence() { return 0; }
                syncWithCloud() { /* no-op */ }
                saveLegacyData() { /* no-op */ }
                reapplyAllModules() { /* no-op */ }
                enqueue() { /* no-op */ }
                updateMap() { /* no-op */ }
                setupDraggables() { /* no-op */ }
                generateBackground() { return []; }
                generateSingleStyle() { return []; }
                generateStaticStars() { return []; }
                updateUniverse() { /* no-op */ }
                generateSector() { return { minerals: [], deposits: [], hazards: {} }; }
                generateMissionBoard() { return []; }
                generateBlackHoleRings() { return []; }
                generateSupernovaParticles() { return []; }
                updateFactionHUD() { /* no-op */ }
                updateFloatingLeaderboard() { /* no-op */ }
                updateWalletUI() { /* no-op */ }
                updateInventoryUI() { /* no-op */ }
                updateShipStatus() { /* no-op */ }
                updateBgUI() { /* no-op */ }
                updateFlightHUD() { /* no-op */ }
                updateMissionHUD() { /* no-op */ }
                renderCollectionOverlay() { /* no-op */ }
                showTradeTerminal() { /* no-op */ }
                closeAllModals() { /* no-op */ }
                setLayout() { /* no-op */ }
                styleGem() { return ''; }
                stylePlanet() { return '#ffffff'; }
            }


            Object.entries(managers).forEach(([globalName, localName]) => {
                if (typeof window[globalName] !== 'function') {
                    console.warn(`⚠️ [Audit] ${globalName} missing from window.`);
                    
                    // Attempt deep recovery
                    let recovered = false;
                    try {
                        const ref = window[globalName] || null;
                        if (typeof ref === 'function') {
                            window[globalName] = ref;
                            recovered = true;
                        }
                    } catch (e) { /* skip */ }

                    if (recovered) {
                        console.log(`✅ [Audit] Recovered ${globalName}.`);
                        report[globalName] = "RECOVERED";
                    } else {
                        console.error(`❌ [Audit] FATAL: ${globalName} is missing.`);
                        report[globalName] = "MISSING - USING MOCK";
                        criticalMissing = true;
                    }
                } else {
                    report[globalName] = "OK";
                }
            });

            console.table(report);
            if (criticalMissing) {
                console.warn("🔔 [Audit] Some managers are missing. Engine will use SafeMocks to prevent crash.");
            }

            // Instantiation Loop
            Object.entries(managers).forEach(([globalName, localName]) => {
                if (typeof window[globalName] === 'function') {
                    console.log(`📍 [BOOT] Instantiating ${globalName}...`);
                    try {
                        this[localName] = new window[globalName](this);
                        console.log(`✅ [BOOT] ${globalName} INSTANTIATED.`);
                    } catch (e) {
                        console.error(`❌ [BOOT] ${globalName} INSTANTIATION FAILED:`, e);
                        this[localName] = new SafeMock(globalName);
                    }
                } else {
                    this[localName] = new SafeMock(globalName);
                }
            });
            console.log("✅ [Boot] Manager Orchestration Loop COMPLETE.");

            // Legacy & Alias Support
            console.log("🚀 [Engine] Core initialization complete.");
            console.log("✅ InterstellarEngine: READY.");
            this.initHubCommunication();
            
            // Phase 30: Initialize UI elements
            if (this.hudManager) {
                this.hudManager.updateBgUI();
            }
        } catch (initError) {
            console.error("❌ FATAL BOOT ERROR:", initError);
            alert("ENGINE BOOT FAILURE: " + initError.message);
        }
    }

    initHubCommunication() {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'REQUEST_EMPIRE_STATS') {
                this.persistenceManager.syncWithCloud();
            }
        });
    }

    // --- PHASE 30: UI DELEGATION (Restoring button functionality from index.html) ---
    showShipModal() { this.hangarManager?.showShipModal(); }
    hideShipModal() { this.hangarManager?.hideShipModal(); }
    selectShip() { this.hangarManager?.selectShip(); }
    prevHangarBay() { this.hangarManager?.prevHangarBay(); }
    nextHangarBay() { this.hangarManager?.nextHangarBay(); }
    setHangarTab(tab) { this.hangarManager?.setHangarTab(tab); }
    setHangarColor(color) { this.hangarManager?.setHangarColor(color); }
    
    toggleMissionBoard() { this.missionManager?.toggleMissionBoard(); }
    hideMissionBoardUI() { this.missionManager?.hideMissionBoardUI(); }
    
    setLayout(layout) { this.hudManager?.setLayout(layout); }
    closeBaseBuilder() { this.baseBuilder?.close(); }

    toggleCinematicMode() {
        this.cinematicMode = !this.cinematicMode;
        if (this.hudManager) {
            this.hudManager.setLayout(this.cinematicMode ? 'cinematic' : 'compact');
            const msg = this.cinematicMode ? '🎥 CINEMATIC MODE ENGAGED' : '🛸 STANDARD HUD RESTORED';
            this.hudManager.showToast(msg, 3000, this.cinematicMode ? 'success' : 'info');
        }
        
        // Visual filter on canvas
        if (this.canvas) {
            this.canvas.style.filter = this.cinematicMode ? 'contrast(1.1) saturate(0.9) brightness(1.05)' : 'none';
        }
    }

    triggerInfinityJump() {
        console.log("🌌 INTERSTELLAR: Triggering Infinity Jump Cinematic...");
        if (this.isInfinityJumping) return;
        this.isInfinityJumping = true;

        // 1. Audio Build-up
        if (window.gameAudio) window.gameAudio.playInfinityJump();

        // 2. Cinematic Orchestration (3 Seconds)
        const startTime = Date.now();
        const duration = 3000;

        const jumpInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const p = Math.min(1.0, elapsed / duration);

            // Phase A: The Collapse (0.0s - 2.5s)
            if (p < 0.83) { // up to 2.5s
                this.collapseFactor = p / 0.83;
                this.camera.zoom = 1.0 + (this.collapseFactor * 0.5); // Zoom into the void
                // Extreme Camera Shake
                const intensity = this.collapseFactor * 40;
                this.camera.shakeX = (Math.random() - 0.5) * intensity;
                this.camera.shakeY = (Math.random() - 0.5) * intensity;
            } 
            // Phase B: The Whiteout (2.5s - 3.0s)
            else {
                this.collapseFactor = 1.0;
                this.flashAlpha = Math.min(1.0, (p - 0.83) / 0.17); // Fast ramp to white
                this.camera.shakeX = (Math.random() - 0.5) * 60; // Final violent shake
                this.camera.shakeY = (Math.random() - 0.5) * 60;
            }

            if (p >= 1.0) {
                clearInterval(jumpInterval);
                this.executeInfinityReset();
            }
        }, 16); // ~60fps logic update
    }

    executeInfinityReset() {
        console.log("✨ INTERSTELLAR: Dimensional Collapse Complete. Resetting Universe...");
        
        // 1. Data Progression (Phase 18 Legacy System)
        if (!this.legacyData) this.legacyData = { legacyPoints: 0, ascensions: 0, trophies: [] };
        this.legacyData.legacyPoints += 1;
        this.legacyData.ascensions = (this.legacyData.ascensions || 0) + 1;
        this.universeDifficulty = (this.universeDifficulty || 1.0) * 1.5;
        
        // 2. State Reset (Universe Cleansing)
        this.stars = [];
        this.planets = [];
        this.minerals = [];
        this.enemyShips = [];
        this.activeMissions = [];
        this.spacecraft = [];
        
        // 3. Narrative Feedback
        this.hudManager.showToast("✨ DIMENSIONAL COLLAPSE COMPLETE. WELCOME TO THE NEXT VERSE.", 8000, 'success');
        
        // 4. Force Persistence Sync
        if (this.persistenceManager) {
            this.persistenceManager.saveLegacyData();
            this.persistenceManager.syncWithCloud();
        }
        
        // 5. Re-init World
        if (this.proceduralManager) this.proceduralManager.generateStaticStars();
        if (this.sectorManager) this.sectorManager.jumpToSector(0, 0); // Reset to Hub
        this.resetCamera();

        // 6. Fade out Flash
        setTimeout(() => {
            const fadeStart = Date.now();
            const fadeDur = 1000;
            const fadeInterval = setInterval(() => {
                const el = Date.now() - fadeStart;
                const fp = Math.min(1.0, el / fadeDur);
                this.flashAlpha = 1.0 - fp;
                this.collapseFactor = 1.0 - fp;
                if (fp >= 1.0) {
                    clearInterval(fadeInterval);
                    this.isInfinityJumping = false;
                }
            }, 16);
        }, 500);
    }

    async initTemplates() {
        const FALLBACK = {
            zodiac: {
                aries: [[0,0,0], [20,10,5], [35,5,10], [40,15,15]],
                taurus: [[0,0,0], [20,-10,5], [40,0,10], [10,20,15], [30,20,15]],
                gemini: [[0,0,0], [0,40,0], [20,40,0], [20,0,0], [10,20,5]],
                leo: [[0,0,0], [10,10,5], [30,10,10], [40,0,10], [20,-30,0], [0,-20,0]],
                scorpio: [[0,0,0], [10,5,5], [20,0,10], [30,-10,15], [30,-30,20], [20,-40,25]]
            },
            animals: {
                bear: [[0,0,0], [20,0,0], [20,15,0], [0,15,0], [40,25,10], [60,25,20], [-5,-15,-10]],
                wolf: [[30,25,0], [45,25,0], [20,20,0], [0,20,0], [-20,15,0], [20,0,10], [20,0,-10]],
                eagle: [[0,0,20], [-20,10,0], [-40,20,-20], [20,10,0], [40,20,-20], [0,-20,10]]
            },
            mythology: {
                dragon: [[0,50,60], [10,40,40], [0,30,20], [-10,40,0], [0,50,-20], [20,50,-40], [0,30,-80]],
                orion: [[-10,50,0], [10,50,0], [0,30,0], [-15,5,20], [15,5,20], [0,25,5], [30,40,-15]],
                phoenix: [[0,0,0], [15,20,20], [35,25,40], [-15,20,20], [-35,25,40], [0,-25,-20]]
            }
        };

        try {
            // Attempt to load from server/local files with robust fallback handling
            const [zodiac, animals, mythology] = await Promise.all([
                fetch('./templates/zodiac.json').then(r => r.ok ? r.json() : FALLBACK.zodiac).catch(() => FALLBACK.zodiac),
                fetch('./templates/animals.json').then(r => r.ok ? r.json() : FALLBACK.animals).catch(() => FALLBACK.animals),
                fetch('./templates/mythology.json').then(r => r.ok ? r.json() : FALLBACK.mythology).catch(() => FALLBACK.mythology)
            ]);

            this.templates = { 
                zodiac: zodiac || FALLBACK.zodiac, 
                animals: animals || FALLBACK.animals, 
                mythology: mythology || FALLBACK.mythology 
            };
        } catch (e) {
            console.warn("Template fetch aborted (CORS/Security). Using Majestic Fallbacks.");
            this.templates = FALLBACK;
        }

        // Render Template Buttons
        const createBtn = (category, key, containerId) => {
            const container = document.getElementById(containerId);
            if (!container) return;
            const btn = document.createElement('button');
            btn.className = 'btn-small';
            btn.style.margin = '2px';
            btn.style.textTransform = 'capitalize';
            btn.innerText = key;
            btn.onclick = () => this.loadTemplate(category, key);
            container.appendChild(btn);
        };

        if (this.templates.zodiac) Object.keys(this.templates.zodiac).forEach(k => createBtn('zodiac', k, 'zodiacTemplates'));
        if (this.templates.animals) Object.keys(this.templates.animals).forEach(k => createBtn('animals', k, 'animalTemplates'));
        if (this.templates.mythology) Object.keys(this.templates.mythology).forEach(k => createBtn('mythology', k, 'mythTemplates'));
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

    async splashTransition() {
        console.log("🌌 splashTransition: Initializing cinematic sequence...");
        const loader = document.getElementById('loadingScreen');
        const bar = document.getElementById('loadingProgressBar');
        const log = document.getElementById('loadingLog');
        const prompt = document.getElementById('loadingPrompt');
        
        if (!loader) return;

        let skipRequested = false;
        const onSkip = () => { skipRequested = true; };
        loader.addEventListener('click', onSkip);

        const setProgress = (p, text) => {
            if (bar) bar.style.width = `${p}%`;
            if (log) log.textContent = text;
            const statusEl = document.getElementById('loadingStatus');
            if (statusEl) statusEl.textContent = text;
        };

        const wait = (ms) => new Promise(r => setTimeout(r, skipRequested ? 0 : ms));

        try {
            // 1. Initial Void & Constellations
            setProgress(15, "CALIBRATING CONSTELLATION NODES...");
            if (this.proceduralManager) {
                this.proceduralManager.generateStaticStars();
                this.proceduralManager.generateBackground();
            }
            await wait(150);

            // 2. State Restoration (Majestic Phase 25 Optimization)
            setProgress(45, "RECONSTRUCTING CELESTIAL LAYERS...");
            this.activeStyles.clear();
            const savedStyles = JSON.parse(localStorage.getItem('activeBgStyles') || '["deep-space"]');
            
            // Swapped Logic: matrix = artifacts, cyber = rain
            if (savedStyles && savedStyles.length > 0) {
                savedStyles.forEach(s => {
                    if (!this.activeStyles.has(s)) {
                        this.activeStyles.add(s);
                        this.proceduralManager?.generateSingleStyle(s);
                    }
                });
            } else {
                // Default majestic set: Deep Space & Nebula
                ['deep-space', 'nebula'].forEach(s => {
                    this.activeStyles.add(s);
                    this.proceduralManager?.generateSingleStyle(s);
                });
            }
            await wait(150);

            // 3. Final Calibration
            setProgress(85, "STABILIZING SECTOR GEOMETRY...");
            this.updateBgUI(); 
            await wait(200);

            // 6. Ready
            setProgress(100, "INTERSTELLAR CORE READY.");
            if (prompt) {
                prompt.style.opacity = '1';
                prompt.classList.add('blink');
            }

            // Clean up skip listener
            loader.removeEventListener('click', onSkip);

            // Wait for user interaction or auto-proceed after 1.5s
            return new Promise(resolve => {
                const proceed = () => {
                    clearTimeout(autoTimer);
                    window.removeEventListener('keydown', proceed);
                    window.removeEventListener('click', proceed);
                    loader.style.opacity = '0';
                    if (window.gameAudio) window.gameAudio.playMenuSelect();
                    setTimeout(() => {
                        loader.style.display = 'none';
                        resolve();
                    }, 1000);
                };
                
                const autoTimer = setTimeout(() => proceed(), skipRequested ? 100 : 1500);
                window.addEventListener('keydown', proceed);
                window.addEventListener('click', proceed);
            });
        } catch (err) {
            console.error("Splash Transition Error:", err);
            loader.style.display = 'none';
        }
    }

    init() {
        console.log("📍 [Engine] Initializing Subsystems...");
        
        if (this.resourceManager) this.resourceManager.init();
        if (this.colonyManager) this.colonyManager.init();
        if (this.logisticsManager) this.logisticsManager.init();
        if (this.academyManager) this.academyManager.init();
        if (this.uiManager) this.uiManager.setupDraggables();
        
        // Phase 9-11 Initializations
        if (this.logManager) this.logManager.init();
        if (this.fleetManager) this.fleetManager.init();
        if (this.surfaceManager) this.surfaceManager.init();
        
        // Load Constellation Templates
        this.initTemplates();

        // Initial mode setup
        this.setMode('draw');
        
        // Apply saved HUD layout 
        setTimeout(() => {
            if (this.hudManager) this.hudManager.setLayout(localStorage.getItem('hudLayout') || 'compact');
        }, 500);

        this.ready = true;
        this.updateBgUI(); // Phase 25: Sync UI buttons on boot
        console.log("✅ [Engine] Subsystems Initialized.");

        /*
        // Phase 5: Initial Narrative Hook (DISABLED: Phase 25 Clean Start)
        if (this.narrativeManager) {
            setTimeout(() => {
                this.narrativeManager.enqueue('vane', 'Rookie, this is Commander Vane. Subsystems are green across the board. The sector is clear... for now. Use the HUD to set fleet formations.', 6000);
            }, 2000);
        }
        */

        // Phase 6: Economy & Modules
        if (this.marketplaceManager) {
            this.marketplaceManager.reapplyAllModules();
        }

        // --- MATRIX & UI RECOVERY ---
        const matrixSpeedSlider = document.getElementById('matrixSpeedSlider');
        if (matrixSpeedSlider) {
            matrixSpeedSlider.addEventListener('input', (e) => {
                this.matrixSpeedMultiplier = parseFloat(e.target.value);
                document.getElementById('matrixSpeedValue').textContent = this.matrixSpeedMultiplier.toFixed(1) + 'x';
            });
        }

        const matrixLengthSlider = document.getElementById('matrixLengthSlider');
        if (matrixLengthSlider) {
            matrixLengthSlider.addEventListener('input', (e) => {
                this.matrixLengthMultiplier = parseFloat(e.target.value);
                document.getElementById('matrixLengthValue').textContent = this.matrixLengthMultiplier.toFixed(1) + 'x';
            });
        }

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
            const shipColor = this.playerShip.color || '#00f3ff';
            if (/^#[0-9A-Fa-f]{6}$/i.test(shipColor)) {
                shipColorPicker.value = shipColor;
            } else {
                shipColorPicker.value = '#00f3ff';
            }
            shipColorPicker.addEventListener('input', (e) => {
                this.setShipColor(e.target.value);
            });
        }

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

        // Trigger initial background generation
        if (this.proceduralManager) {
            this.proceduralManager.generateBackground();
        }
        this.resize();

        // Initial UI population
        this.hudManager.updateWalletUI();
        this.hudManager.updateInventoryUI();
        if (this.updateGemsUI) this.updateGemsUI();
        this.hudManager.updateShipStatus();
        this.missionManager.updateMap();

        // First-login tracking & onboarding
        this.checkFirstLogin();

        // Hangar registry is now managed by HangarManager.js
        if (this.hangarManager) {
             this.hangarShips = this.hangarManager.hangarShips;
        }

        this.initGlowSprites(); // Pre-build glow sprite cache before first render frame
        this.gameLoop.start();
    }

    getStarColor(star) {
        // Rainbow mode for specifically assigned clusters or global override
        if (this.matrixRainbowMode || star.clusterId === 'Rainbow') {
            const time = Date.now() * 0.002;
            const hue = (time + star.x * 0.01 + star.y * 0.01) % 360;
            return `hsl(${hue}, 100%, 75%)`;
        }
        return star.color || '#ffffff';
    }

    hexToRgb(hex) {
        if (hex.startsWith('hsl')) {
            // Simple extraction for HSL strings if needed, though mostly we expect hex
            return [200, 255, 255]; // Placeholder for HSL conversion or specialized handling
        }
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [255, 255, 255];
    }

    // Mobile Controls
    toggleMobileControls() {
        const joy = document.getElementById('joystick-container');
        if (joy) {
            joy.style.display = joy.style.display === 'none' ? 'block' : 'none';
        }
    }


    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Regenerate screen-space background (static stars) to ensure coverage
        if (this.proceduralManager && this.proceduralManager.generateStaticStars) {
            this.staticStars = [];
            this.proceduralManager.generateStaticStars();
        }

        if (this.renderManager && this.renderManager.draw) {
            this.renderManager.draw();
        }

        // Update 3D Hangar scaling if active
        if (this.resizeHangar) {
            this.resizeHangar();
        }
    }

    initGlowSprites() {
        console.log("✨ Pre-building functional glow sprite cache...");
        this.glowSprites = {};
        
        // Extended color palette for engine flames and VFX
        const colorPalette = {
            cyan: '#00f3ff',
            green: '#00ff88',
            yellow: '#ffd700',
            magenta: '#ff00ff',
            red: '#ff3300',
            orange: '#ff8800',
            purple: '#7700ff',
            blue: '#00ccff',
            fire: '#ffaa00',
            white: '#ffffff'
        };
        
        const sizes = [4, 8, 16, 32, 64];

        Object.entries(colorPalette).forEach(([name, color]) => {
            this.glowSprites[color] = {};
            this.glowSprites[name] = null; // Key for quick access (drawEngineFlame)

            sizes.forEach(size => {
                const canvas = document.createElement('canvas');
                canvas.width = size * 2;
                canvas.height = size * 2;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const grad = ctx.createRadialGradient(size, size, 0, size, size, size);
                // Use centralized safety utility
                this.renderManager.safeAddColorStop(grad, 0, color);
                this.renderManager.safeAddColorStop(grad, 0.3, color);
                this.renderManager.safeAddColorStop(grad, 1, 'transparent');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(size, size, size, 0, Math.PI * 2);
                ctx.fill();
                this.glowSprites[color][size] = canvas;
                
                // Map the largest size as the convenience named sprite
                if (size === 64) {
                    this.glowSprites[name] = canvas;
                }
            });
        });
        
        // Final fallback for missing engine keys
        if (!this.glowSprites.fire) this.glowSprites.fire = this.glowSprites['#ffaa00'][64];
        console.log("✅ [Engine] Glow Sprite Cache Loaded.");
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

    // --- INTERACTION HANDLERS (Delegated to InputManager) ---
    // Methods removed in Phase 4 modularization

    // --- VISUAL CONTROLS (Restored Phase 19) ---
    toggleBgDrift() {
        this.bgDriftMode = !this.bgDriftMode;
        const btn = document.getElementById('bgDriftBtn');
        if (btn) btn.classList.toggle('active', this.bgDriftMode);
        this.hudManager.showToast(this.bgDriftMode ? "PARALLAX DRIFT: ENGAGED" : "PARALLAX DRIFT: HALTED");
    }

    toggleBgWarp() {
        this.bgWarpMode = !this.bgWarpMode;
        const btn = document.getElementById('bgWarpBtn');
        if (btn) btn.classList.toggle('active', this.bgWarpMode);
        
        if (!this.bgWarpMode) {
            this.warpDisengaging = true;
            // Clear fly-in flags to ensure animation plays
            [this.planets, this.galaxies, this.blackHoles, this.nebulae, this.spacecraft, this.stars].forEach(arr => {
                if (arr) arr.forEach(obj => {
                    obj.disengageInit = false;
                    obj.flownOut = false;
                });
            });
        }
        
        this.hudManager.showToast(this.bgWarpMode ? "HYPERSPACE DRIVE: SPINNING UP" : "HYPERSPACE DRIVE: DISENGAGED", 3000, this.bgWarpMode ? 'warning' : 'info');
        
        if (this.bgWarpMode) {
             if (window.gameAudio) window.gameAudio.playLuxuryPing();
        }
    }

    firePlayerProjectile(x, y, rotation, color, speed = 15, damage = 1) {
        this.projectiles.push({
            x, y, vx: Math.cos(rotation) * speed, vy: Math.sin(rotation) * speed,
            color, life: 100, damage
        });
        
        // Trigger Muzzle Flash for player
        if (x === this.playerShip.x && y === this.playerShip.y) {
            this.muzzleFlashTimer = 3;
        }

        if (window.gameAudio) window.gameAudio.playLaserFire();
    }

    setWarpSpeedMultiplier(val) {
        this.warpSpeedMultiplier = parseFloat(val);
        const display = document.getElementById('warpSpeedValue');
        if (display) display.textContent = this.warpSpeedMultiplier.toFixed(1) + 'x';
    }

    updateStarColors() {
        const c1 = document.getElementById('starColor1')?.value || '#ffffff';
        const c2 = document.getElementById('starColor2')?.value || '#aaddff';
        const c3 = document.getElementById('starColor3')?.value || '#ffddaa';
        this.starColors = [c1, c2, c3];
        this.proceduralManager.generateStaticStars();
        this.renderManager.draw();
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
        if (this.updateColorModeUI) this.updateColorModeUI();
        this.hudManager.showToast(`Active color set to ${hexColor} `);
    }

    setRainbowMode() {
        this.colorMode = 'rainbow';
        if (this.updateColorModeUI) this.updateColorModeUI();
        this.hudManager.showToast("Active color set to Rainbow Mode 🌈");
    }

    // ===== PROCEDURAL UNIVERSE GENERATION (Delegated to ProceduralManager) =====
    seededRandom(seed) { return this.proceduralManager.seededRandom(seed); }
    getSectorCoords(worldX, worldY) { return this.proceduralManager.getSectorCoords(worldX, worldY); }
    getSectorSeed(sectorX, sectorY) { return this.proceduralManager.getSectorSeed(sectorX, sectorY); }
    checkAndGenerateSectors() { this.proceduralManager.updateUniverse(); }
    generateBackground() { this.proceduralManager.generateBackground(); }

    toggleBgStyle(style) {
        console.log(`[BG Toggle] ${style}`);
        
        if (this.activeStyles.has(style)) {
            // Deactivating
            this.activeStyles.delete(style);
            this.clearStyleData(style);
        } else {
            // Activating
            this.activeStyles.add(style);
            if (this.proceduralManager) {
                this.proceduralManager.generateSingleStyle(style);
            }
        }

        // Persist preference
        localStorage.setItem('activeBgStyles', JSON.stringify(Array.from(this.activeStyles)));

        this.updateBgUI(); 
    }

    applyVariant(style, variantIndex) {
        console.log(`[BG Variant] ${style} -> ${variantIndex}`);
        
        // Map variants to specific style keys for persistence
        const variants = {
            'deep-space': ['deep-space', 'deep-space-purple', 'deep-space-gold'],
            'nebula': ['nebula', 'nebula-pink', 'nebula-green'],
            'alien': ['alien', 'alien-purple', 'alien-teal'],
            'matrix': ['matrix', 'matrix-pink', 'matrix-gold']
        };

        const variantKey = variants[style] ? (variants[style][variantIndex] || style) : style;

        // Clear other variants of this base style
        if (variants[style]) {
            variants[style].forEach(v => {
                this.activeStyles.delete(v);
                this.clearStyleData(v);
            });
        } else {
            this.activeStyles.delete(style);
            this.clearStyleData(style);
        }

        this.activeStyles.add(variantKey);

        if (this.proceduralManager) {
            this.proceduralManager.generateSingleStyle(variantKey, variantIndex);
        }

        this.updateBgUI();
        this.hudManager?.showToast(`Sub-Theme Applied: ${variantKey.toUpperCase()} 🎨`);
    }

    // Generate only a single style's data


    // ===== HANGAR & SHIP MANAGEMENT (Delegated to HangarManager) =====
    // Hangar methods are defined inline in Phase 25 (see end of file)


    // Clear only a specific style's data
    clearStyleData(style) {
        this.backgroundStars = (this.backgroundStars || []).filter(s => s.style !== style);
        this.galaxies = (this.galaxies || []).filter(g => g.style !== style);
        this.nebulae = (this.nebulae || []).filter(n => n.style !== style);
        this.blackHoles = (this.blackHoles || []).filter(bh => bh.style !== style);
        this.planets = (this.planets || []).filter(p => p.style !== style);
        this.alienArtifacts = (this.alienArtifacts || []).filter(a => a.style !== style);
        this.spacecraft = (this.spacecraft || []).filter(s => s.style !== style);
        this.matrixStreams = (this.matrixStreams || []).filter(s => s.style !== style);
        this.cyberNodes = (this.cyberNodes || []).filter(n => n.style !== style);
    }
    updateBgUI() {
        this.hudManager.updateBgUI();
        
        // Show/hide matrix panel when matrix style is active
        const matrixPanel = document.getElementById('matrixPanel');
        if (matrixPanel) {
            const isMatrixActive = Array.from(this.activeStyles).some(s => s.startsWith('matrix'));
            if (isMatrixActive) {
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
    toggleOrdnancePanel() {
        if (this.weaponManager) {
            this.weaponManager.toggleOrdnancePanel();
        }
    }

    toggleTemplatePanel() {
        const panel = document.getElementById('templatePanel');
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    }

    // --- CORE GAME STATE (Delegated to EngineCore) ---
    toggleFlightMode() { this.engineCore.toggleFlightMode(); }
    handlePlayerDeath() {
        this.logManager?.addEntry('SYSTEM', 'CRITICAL: SHIP DESTROYED. Data re-sync initiated.', 'error');
        this.engineCore.handlePlayerDeath();
    }
    updateMinerals() { this.engineCore.updateMinerals(); }
    updateDamageParticles() { this.engineCore.updateDamageParticles(); }
    
    // --- HUD DELEGATION (Delegated to HUDManager) ---
    updateFlightHUD() { this.hudManager.updateFlightHUD(); }
    updateFloatingLeaderboard() { this.hudManager.updateFloatingLeaderboard(); }

    // --- UTILITIES (Delegated) ---
    setLayout(type) { this.hudManager.setLayout(type); }
    styleGem(type) { return this.hudManager.styleGem(type); }
    toggleMatrixRainbow() {
        this.matrixRainbow = !this.matrixRainbow;
        const btn = document.getElementById('matrixRainbowBtn');
        if (btn) btn.classList.toggle('active', this.matrixRainbow);
        this.hudManager?.showToast(this.matrixRainbow ? '🌈 RAINBOW MODE: ON' : '💎 SPECTRAL MODE: ON');
    }

    stylePlanet(type) { return this.hudManager.stylePlanet(type); }
    updateStats() {
        const statsEl = document.getElementById('stats');
        if (!statsEl) return;

        const mode = this.flightMode ? 'Flight' : 'Draw';
        const starCount = (this.stars?.length || 0) + (this.backgroundStars?.length || 0);
        const constellationCount = this.renderManager?.constellation?.clusterCount || 0;
        const zoom = (this.camera?.zoom || 1).toFixed(2);

        statsEl.textContent = `Mode: ${mode} | Total Stars: ${starCount} | Constellations: ${constellationCount} | Zoom: ${zoom}x`;
    }
    
    // --- EFFECTS (Delegated) ---
    createExplosion(x, y, type) { this.effectManager.createExplosion(x, y, type); }
    triggerSupernovaEffect(mine) { this.effectManager.triggerSupernovaEffect(mine); }
    
    // --- STORAGE (Delegated) ---
    loadCredits() { return this.persistenceManager.loadCredits(); }
    saveCredits() { this.persistenceManager.saveCredits(); }
    loadInventory() { return this.persistenceManager.loadInventory(); }
    saveInventory() { this.persistenceManager.saveInventory(); }
    loadUpgrades() { return this.persistenceManager.loadUpgrades(); }
    saveUpgrades() { this.persistenceManager.saveUpgrades(); }
    loadFactionRep() { return this.persistenceManager.loadFactionRep(); }
    saveFactionRep() { this.persistenceManager.saveFactionRep(); }
    loadTrainingProgress() { return this.persistenceManager.loadTrainingProgress(); }
    saveTrainingProgress() { this.persistenceManager.saveTrainingProgress(); }
    loadCarriedResources() { return this.persistenceManager.loadCarriedResources(); }
    saveCarriedResources() { this.persistenceManager.saveCarriedResources(); }
    exportSaveData() { this.persistenceManager.exportSaveData(); }
    triggerImportSaveData() { this.persistenceManager.triggerImportSaveData(); }
    importDataFromFile(e) { this.persistenceManager.importDataFromFile(e); }
    syncWithCloud() { this.persistenceManager.syncWithCloud(); }


    // --- PERSISTENCE & UTILITIES (Restored Phase 19) ---
    undo() {
        if (this.stars.length > 0) {
            this.stars.pop();
            this.renderManager.draw();
        }
    }

    requestClear() {
        if (confirm("CLEAR ALL CONSTELLATIONS?")) {
            this.stars = [];
            this.renderManager.draw();
        }
    }

    downloadSVG() {
        const svg = this.renderManager.generateSVG();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `interstellar_constellation_${Date.now()}.svg`;
        a.click();
    }

    downloadPNG() {
        const url = this.canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `interstellar_capture_${Date.now()}.png`;
        a.click();
    }

    saveState() {
        this.persistenceManager.saveState();
    }
    
    // Toggle Admin Panel
    toggleAdminPanel() { 
        if (!document.getElementById('adminPanel')?.classList.contains('hidden')) {
            document.getElementById('adminPanel')?.classList.add('hidden');
            return;
        }

        if (this.hudManager) this.hudManager.closeAllModals();
        this.adminManager.toggleAdminPanel(); 
    }
    initAdminPanel() { this.adminManager.initAdminPanel(); }
    updateAdminDebugInfo() { this.adminManager.updateAdminDebugInfo(); }

    // --- SVG LOADING (Restored Phase 19) ---
    triggerLoadSVG() {
        const input = document.getElementById('svgInput');
        if (input) input.click();
    }

    loadSVG(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(event.target.result, 'image/svg+xml');
            const circles = xmlDoc.getElementsByTagName('circle');
            
            if (circles.length > 0) {
                this.saveState();
                this.stars = [];
                for (let i = 0; i < circles.length; i++) {
                    const c = circles[i];
                    this.stars.push({
                        id: Date.now() + i,
                        x: parseFloat(c.getAttribute('cx')),
                        y: parseFloat(c.getAttribute('cy')),
                        z: 0,
                        color: c.getAttribute('fill') || '#ffffff',
                        phase: Math.random() * Math.PI * 2
                    });
                }
                this.renderManager.draw();
                this.hudManager.showToast(`Imported ${circles.length} stars from SVG`);
            }
        };
        reader.readAsText(file);
    }

    // --- VIDEO EXPORT (Restored Phase 19) ---
    exportVideo() {
        const stream = this.canvas.captureStream(30);
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        const chunks = [];

        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `interstellar_recording_${Date.now()}.webm`;
            a.click();
        };

        const btn = document.getElementById('exportVideoBtn');
        if (this.isRecording) {
            recorder.stop();
            this.isRecording = false;
            if (btn) btn.innerHTML = '🎥 Record';
            this.hudManager.showToast('Recording stopped. Downloading...');
        } else {
            recorder.start();
            this.isRecording = true;
            if (btn) btn.innerHTML = '⏹ Stop';
            this.hudManager.showToast('Recording started...');
        }
    }

    // Toggle cockpit section - now minimizes to taskbar
    toggleCockpitSection(sectionId) {
        if (this.uiManager) {
            this.uiManager.toggleCockpitSection(sectionId);
        } else {
            const section = document.getElementById(sectionId);
            if (section) section.classList.toggle('hidden');
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

                // Apply position (Disabled to prefer CSS Grid layout)
                // if (pos.left) win.style.left = pos.left;
                // if (pos.top) win.style.top = pos.top;
                // if (pos.width) win.style.width = pos.width;
                // if (pos.height) win.style.height = pos.height;

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

        if (gemsSection) {
            if (this.showGemValues) {
                // Only modify internal grid columns, not section position/height
                if (gemsGrid) {
                    gemsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr))';
                }
            } else {
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
        if (this.hudManager) {
            this.hudManager.closeAllModals();
            this.hudManager.bringToFront('expandedMapModal');
        }
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

    closeExpandedMap() {
        if (this.hudManager) this.hudManager.closeAllModals();
        this.expandedMapOpen = false;
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
        if (!this.glowSprites) return;
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


    // createExplosion moved to EffectManager (Phase 11)

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

        // --- ACADEMY PROGRESS (PHASE 2) ---
        if (this.academyManager && this.academyManager.sessionProgress) {
            this.academyManager.sessionProgress.kills++;
        }

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

        // --- PHASE 8: Faction Influence Shift ---
        if (enemy.faction && enemy.faction !== 'neutral') {
            const sectorKey = `${this.sectorManager.currentSector.x},${this.sectorManager.currentSector.y}`;
            const sector = this.sectorManager.sectors.get(sectorKey);
            if (sector && sector.faction === enemy.faction) {
                // Drop influence in this sector
                sector.influence = Math.max(0, sector.influence - 5);
                if (sector.influence === 0) {
                    sector.faction = 'neutral';
                    this.hudManager.showToast(`📢 Sector Liberated! ${enemy.faction.toUpperCase()} control broken.`);
                }
            }
        }

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

        // --- Phase 10: Supply Requirement Check ---
        if (missionTemplate.requiredSupplies) {
            for (const [supply, qty] of Object.entries(missionTemplate.requiredSupplies)) {
                const current = (this.playerInventory[supply] || 0);
                if (current < qty) {
                    const supplyName = SUPPLY_TYPES[supply]?.name || supply;
                    this.hudManager.showToast(`🚨 MISSION HALTED: Requires ${qty}x ${supplyName}`, 3000, 'error');
                    return;
                }
            }
            // Consume supplies upon acceptance
            for (const [supply, qty] of Object.entries(missionTemplate.requiredSupplies)) {
                this.playerInventory[supply] -= qty;
                this.logManager?.addEntry('ECONOMY', `Provisioned ${qty}x ${supply} for ${missionTemplate.name}.`, 'info');
            }
            this.saveInventory();
            this.hudManager.updateInventoryUI();
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
        } else if (missionTemplate.type === 'delivery' || missionTemplate.type === 'salvage') {
            // Spawn a mission waypoint at a significant distance
            const angle = Math.random() * Math.PI * 2;
            const dist = 4000 + Math.random() * 2000;
            this.missionWaypoint = {
                x: this.playerShip.x + Math.cos(angle) * dist,
                y: this.playerShip.y + Math.sin(angle) * dist,
                type: missionTemplate.type,
                radius: 200
            };
            this.hudManager.showToast('📍 COORDINATES RECEIVED: Head to the orange waypoint.', 5000);
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

        // Check survival/patrol timer
        if (m.type === 'survive' || m.type === 'patrol') {
            const elapsed = (Date.now() - m.startTime) / 1000;
            m.progress = Math.floor(elapsed);

            // Phase 10: Oxygen Consumption during Patrol
            if (m.type === 'patrol') {
                if (!this.lastOxygenDrain || Date.now() - this.lastOxygenDrain > 15000) { // Every 15s
                    if (this.playerInventory.oxygen > 0) {
                        this.playerInventory.oxygen -= 0.1; // Slow drain
                        this.saveInventory();
                        this.hudManager.updateInventoryUI();
                        this.lastOxygenDrain = Date.now();
                    } else {
                        // Out of Oxygen! Apply damage
                        this.damagePlayer(2);
                        if (!this.lastO2Warning || Date.now() - this.lastO2Warning > 5000) {
                            this.hudManager.showToast('⚠️ LOW OXYGEN: HULL INTEGRITY COMPROMISED', 3000, 'error');
                            this.lastO2Warning = Date.now();
                        }
                    }
                }
            }
        }

        // Check Waypoint Proximity (Delivery/Salvage)
        if (this.missionWaypoint && (m.type === 'delivery' || m.type === 'salvage')) {
            const dx = this.missionWaypoint.x - this.playerShip.x;
            const dy = this.missionWaypoint.y - this.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.missionWaypoint.radius) {
                m.progress = m.goal; // Goal reached
                this.missionWaypoint = null;
                this.hudManager.showToast(m.type === 'delivery' ? '📦 DELIVERY SUCCESSFUL' : '📂 DATA RECOVERED', 3000, 'success');
            }
        }

        if (m.progress >= m.goal) {
            // Mission complete!
            this.playerGems += m.reward;
            localStorage.setItem('playerGems', this.playerGems);
            this.missionsCompleted++;
            localStorage.setItem('missionsCompleted', this.missionsCompleted);
            this.logManager?.addEntry('MISSIONS', `Mission Success: ${m.name}. Reward: ${m.reward} gems.`, 'success');
            if (this.updateGemsUI) this.updateGemsUI();

            // Launch the cinematic achievement overlay
            this.missionManager.showMissionCompleteOverlay(m);
            gameAudio.playMissionComplete();
            this.activeMission = null;
            this.missionWaypoint = null;
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
                
                // Phase 10: Show Requirements
                if (m.requiredSupplies) {
                    html += `<div style="margin-top: 5px; font-size: 9px; text-align: right;">`;
                    for (const [s, qty] of Object.entries(m.requiredSupplies)) {
                        const has = (this.playerInventory[s] || 0) >= qty;
                        const icon = SUPPLY_TYPES[s]?.icon || '';
                        html += `<div style="color: ${has ? '#00ff88' : '#ff4444'}; opacity: 0.8;">${icon} Req: ${qty}</div>`;
                    }
                    html += `</div>`;
                }

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
            ctx.globalAlpha = 0.6; // updateDamageParticles moved to EngineCore (Phase 10)
            ctx.beginPath();
            ctx.rect(-p.length / 2 - 2, -p.width / 2 - 2, p.length + 4, p.width + 4);
            ctx.fill();

            ctx.globalAlpha = 1;
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


    // === SPACE BASE RESOURCE SYSTEM ===
    loadSpaceBase() { return this.baseBuilder.loadSpaceBase(); }
    saveSpaceBase() { this.baseBuilder.saveSpaceBase(); }
    syncBaseWithCloud() { this.baseBuilder.syncWithCloud(); }

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
        if (this.credits >= moduleDef.cost) {
            this.credits -= moduleDef.cost;
            this.spaceBase.modules.push({ type: moduleType, level: 1 });
            this.saveSpaceBase();
            this.saveCredits();
            this.hudManager.updateWalletUI();
            this.hudManager.showToast(`✅ Built ${moduleDef.name}!`);
            if (window.gameAudio) window.gameAudio.playMenuSelect();
        } else {
            this.hudManager.showToast('Insufficient Credits!', 2000, 'error');
        }
    }

    collectMegaCredits() {
        if (!this.warpGateManager) return;
        
        const dysonCount = this.warpGateManager.gates.filter(g => g.structType === 'dyson').length;
        
        // Update global bonuses (Phase 17-2)
        this.globalEnergyMultiplier = 1.0 + (dysonCount * 0.5); // Each swarm gives +50% power

        if (dysonCount > 0) {
            const revenue = dysonCount * 5000;
            this.credits += revenue;
            this.saveCredits();
            this.hudManager.updateWalletUI();
            this.hudManager.showToast(`MEGA-PROJECT ENERGY BOOST: +${(dysonCount * 50).toFixed(0)}%`, 2000, 'success');
        }
    }

    syncWarpGates() {
        if (!this.warpGateManager) return;
        this.warpGateManager.gates = [];
        this.spaceBases.forEach(base => {
            const hasGate = Object.values(base).some(v => v === 'gate');
            if (hasGate) {
                this.warpGateManager.addGate(base.planetName, base.x, base.y, 'player');
            }
        });
    }

    checkMilestones() {
        if (!this.milestones) return;
        let changed = false;

        // 1. EMPIRE_FOUNDER
        if (!this.milestones.EMPIRE_FOUNDER && this.spaceBases.length >= 1) {
            this.milestones.EMPIRE_FOUNDER = true;
            this.hudManager.showToast('🏆 Milestone: Empire Founder Unlocked!', 5000, 'success');
            changed = true;
        }

        // 2. LOGISTICS_MOGUL
        if (!this.milestones.LOGISTICS_MOGUL) {
            const connectedBases = this.spaceBases.filter(b => Object.values(b).some(v => v === 'log')).length;
            if (connectedBases >= 3) {
                this.milestones.LOGISTICS_MOGUL = true;
                this.hudManager.showToast('🏆 Milestone: Logistics Mogul Unlocked!', 5000, 'success');
                changed = true;
            }
        }

        // 3. PLANETARY_DEFENDER
        if (!this.milestones.PLANETARY_DEFENDER) {
            const hasPlatforms = (this.droneManager.platforms || []).length >= 5;
            if (hasPlatforms) {
                this.milestones.PLANETARY_DEFENDER = true;
                this.hudManager.showToast('🏆 Milestone: Planetary Defender Unlocked!', 5000, 'success');
                changed = true;
            }
        }

        // 4. GALACTIC_HEGEMON (Total Pop)
        const totalPop = this.spaceBases.reduce((sum, b) => sum + (b.population || 0), 0);
        
        // Ring World Bonus (Phase 17-2)
        let popCap = 1000;
        if (this.warpGateManager) {
            const ringCount = this.warpGateManager.gates.filter(g => g.structType === 'ring').length;
            popCap += ringCount * 5000;
        }

        if (!this.milestones.GALACTIC_HEGEMON && totalPop >= popCap) {
            this.milestones.GALACTIC_HEGEMON = true;
            this.hudManager.showToast('🏆 Milestone: Galactic Hegemon Unlocked!', 5000, 'success');
            changed = true;
        }

        if (changed) {
            localStorage.setItem('empireMilestones', JSON.stringify(this.milestones));
        }
    }

    triggerAscensionEvent() {
        this.milestones.ASCENDED = true;
        localStorage.setItem('empireMilestones', JSON.stringify(this.milestones));

        // Calculate Nexus Rewards (Phase 17-1)
        const totalPop = this.spaceBases.reduce((sum, b) => sum + (b.population || 0), 0);
        const awardedCredits = Math.floor(totalPop / 10) + Math.floor(this.credits / 1000);
        this.nexusCredits += awardedCredits;
        localStorage.setItem('nexusCredits', this.nexusCredits);

        // Visual / Audio Sequence
        if (window.gameAudio) {
            window.gameAudio.stopEngineHum();
            window.gameAudio.playLaserShoot(); 
        }

        if (this.renderManager) {
            this.renderManager.flashWhite(3.0);
        }

        // Show Victory Overlay (Phase 16 Finale / now Nexus Gateway)
        setTimeout(() => {
            this.hudManager.showVictoryOverlay(awardedCredits);
        }, 3000);
    }

    applyNexusUpgrades() {
        // Apply permanent permanent buffs from Nexus Legacy
        // Hull Armor (+10% per tier)
        const hullBonus = 1 + (this.nexusUpgrades.ancient_alloy * 0.1);
        if (this.playerShip) {
            this.playerShip.maxHull *= hullBonus;
            this.playerShip.hullHealth = this.playerShip.maxHull;
        }

        // Mining Speed (+15% per tier)
        this.droneSpeedMultiplier *= (1 + (this.nexusUpgrades.nexus_drill * 0.15));
        
        // Energy Efficiency (-5% consumption per tier)
        this.powerEfficiencyMultiplier = Math.max(0.1, 1 - (this.nexusUpgrades.void_reactor * 0.05));
    }

    commenceNewCycle() {
        // Calculate Ascension Rewards (Phase 3 of Sovereignty Update)
        const totalPop = (this.spaceBases || []).reduce((s, b) => s + (b.population || 0), 0);
        const rankLevel = this.colonyManager?.getEmpireRank()?.level || 1;
        const reward = Math.floor((totalPop / 100) + (rankLevel * 50));
        
        // Award Nexus Credits
        this.nexusCredits = (this.nexusCredits || 0) + reward;
        localStorage.setItem('nexusCredits', this.nexusCredits);
        
        console.log(`✨ [Ascension] Awarded ${reward} Nexus Credits for next cycle.`);

        // Reset volatile data but keep Nexus legacy
        localStorage.removeItem('interstellarBases');
        localStorage.removeItem('playerUpgrades');
        localStorage.removeItem('colonyResearch');
        localStorage.removeItem('playerCredits');
        localStorage.setItem('colonyResearchPoints', '0');
        
        // Keep the milestones unlocked but reset the Ascended flag for the new cycle
        if (this.milestones) {
            this.milestones.ASCENDED = false;
            localStorage.setItem('empireMilestones', JSON.stringify(this.milestones));
        }
        
        location.reload(); // Restart universe
    }

    activateBlackHole() {
        if (!this.playerSkills.blackHole) return;

        const now = Date.now();
        if (now - this.lastBlackHoleTime < this.blackHoleCooldown) {
            const remaining = Math.ceil((this.blackHoleCooldown - (now - this.lastBlackHoleTime)) / 1000);
            this.hudManager.showToast(`Gravity Well Cooling Down: ${remaining}s`, 2000);
            return;
        }

        let consumedResources = 0;
        if (this.playerInventory && this.playerInventory.darkmatter > 0) {
            consumedResources = Math.min(10, this.playerInventory.darkmatter);
            this.playerInventory.darkmatter -= consumedResources;
            this.saveInventory();
            this.hudManager.updateInventoryUI();
            this.hudManager.showToast(`Consumed ${consumedResources} Dark Matter to empower Singularity!`, 3000, 'success');
        }

        const powerScale = 1.0 + (consumedResources * 0.5); // Max scale: 6.0x

        const bh = {
            x: this.playerShip.x + Math.cos(this.playerShip.rotation) * 300,
            y: this.playerShip.y + Math.sin(this.playerShip.rotation) * 300,
            radius: 500 * powerScale,
            powerScale: powerScale,
            life: 10000,
            startTime: now,
            playerOwned: true,
            particleRings: this.proceduralManager.generateBlackHoleRings()
        };

        this.hazardBlackHoles.push(bh);
        this.lastBlackHoleTime = now;
        this.hudManager.showToast(`🌌 GRAVITY WELL GENERATED (PWR: ${powerScale}x)`, 3000, "success");
        if (window.gameAudio) window.gameAudio.playEMP(); 
    }

    activateChronoShift() {
        if (!this.playerSkills.chronoShift) return;

        const now = Date.now();
        if (now - this.lastChronoTime < this.chronoCooldown) {
            const remaining = Math.ceil((this.chronoCooldown - (now - this.lastChronoTime)) / 1000);
            this.hudManager.showToast(`Chrono-Shift Cooling Down: ${remaining}s`, 2000);
            return;
        }

        this.timeScale = 0.05; // Practically frozen time
        this.chronoShiftActive = true;
        this.lastChronoTime = now;
        this.hudManager.showToast("🌀 THE VOID HAS OPENED", 3000, "success");

        setTimeout(() => {
            this.timeScale = 1.0;
            this.chronoShiftActive = false;
            this.hudManager.showToast("Reality Stabilized...", 2000);
        }, this.chronoDuration);

        if (window.gameAudio) window.gameAudio.playPowerup();
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

    // Wingmen Logic
    isPlayerAtBase() {
        if (!this.spaceBase || !this.playerShip) return false;
        const dx = this.playerShip.x - this.spaceBase.x;
        const dy = this.playerShip.y - this.spaceBase.y;
        return Math.hypot(dx, dy) < 800; // Activation radius
    }

    triggerAscendancy() {
        if (!this.playerInventory || (this.playerInventory.darkmatter || 0) < 100) {
            this.hudManager.showToast('⚠️ Void Ascendancy requires 100 Dark Matter!');
            return;
        }
        
        // Remove Dark Matter
        this.playerInventory.darkmatter -= 100;
        this.saveInventory();
        
        this.hudManager.showToast('🌟 ASCENDANCY PRIMED...', 4000, 'success');
        this.ascendancyActive = true;
        this.ascendancyTimer = 0;
        
        // Disable player control while ascending
        this.playerShip.enginesDisabled = true;
        this.playerShip.vx = 0;
        this.playerShip.vy = 0;
        
        if (window.gameAudio) window.gameAudio.playPowerup();
        
        setTimeout(() => {
            this.hudManager.showAscendancyVictoryScreen();
        }, 5000); // Cinematic duration
    }

    hireWingman(type = 'sentinel') {
        const cost = 5000;
        if (this.credits < cost) {
            this.hudManager.showToast(`⚠️ Not enough credits to hire a wingman! Cost: $${cost}`, 3000, 'error');
            return;
        }

        if (this.playerWingmen.length >= 3) {
            this.hudManager.showToast('⚠️ Maximum wingmen (3) already hired!', 3000, 'warning');
            return;
        }

        // --- PHASE 6: SQUADRON RECRUITMENT ---
        const wingmanCount = this.playerWingmen.length;
        const wingmanClass = type;
        
        const offsetAngle = wingmanCount === 0 ? Math.PI / 4 : (wingmanCount === 1 ? -Math.PI / 4 : Math.PI);
        const dist = 100;

        const wingman = {
            id: Date.now(),
            class: wingmanClass,
            type: wingmanClass, // AIManager used 'type'
            x: this.playerShip.x + Math.cos(this.playerShip.rotation + offsetAngle) * dist,
            y: this.playerShip.y + Math.sin(this.playerShip.rotation + offsetAngle) * dist,
            vx: 0,
            vy: 0,
            rotation: this.playerShip.rotation,
            health: wingmanClass === 'vanguard' ? 1200 : (wingmanClass === 'striker' ? 400 : 300),
            maxHealth: wingmanClass === 'vanguard' ? 1200 : (wingmanClass === 'striker' ? 400 : 300),
            formationAngleOffset: Math.PI / 1.1 + (wingmanCount * 0.4),
            formationDist: 150,
            lastFireTime: 0,
            color: wingmanClass === 'vanguard' ? '#ffaa00' : (wingmanClass === 'striker' ? '#00f3ff' : '#00ff88'),
            state: 'follow'
        };

        this.credits -= cost;
        this.playerWingmen.push(wingman);
        this.hudManager.showToast(`🚀 RECRUITED ${wingmanClass.toUpperCase()} SQUADRON`, 3000, 'success');
        
        // Save state immediately
        if (this.persistenceManager) {
            this.persistenceManager.saveCredits();
            this.persistenceManager.saveWingmen();
        }
        
        console.log(`[Fleet] Recruited ${wingmanClass.toUpperCase()}:`, wingman);
    }

    commandFleet(cmd) {
        this.fleetCommand = cmd;
        if (!this.hudManager) return; // FIX: Boot safety
        
        let msg = "";
        let color = "info";
        
        switch(cmd) {
            case 'attack': msg = "🎯 FLEET COMMAND: ENGAGE ENEMY"; color = "error"; break;
            case 'defend': msg = "🛡️ FLEET COMMAND: DEFENSIVE BUBBLE"; color = "info"; break;
            case 'guard': msg = "🏢 FLEET COMMAND: GUARD NEAREST HUB"; color = "warning"; break;
        }
        
        this.hudManager.showToast(msg, 3000, color);
        if (window.gameAudio) window.gameAudio.playCollect();
    }

    // --- PHASE 5: DOCKING & COMMERCE ---
    dockPlayer() {
        if (!this.warpGateManager) return;
        
        // Find proximal outpost
        const outpost = this.warpGateManager.gates.find(g => g.structType === 'outpost' && g.isPlayerNear);
        
        if (outpost) {
            outpost.isDocked = true;
            this.playerShip.vx = 0;
            this.playerShip.vy = 0;
            this.hudManager.showTradeTerminal(outpost);
            this.hudManager.showToast(`⚓ DOCKING SUCCESSFUL: ${outpost.name.toUpperCase()}`, 3000, 'success');
        } else {
            this.hudManager.showToast("⚠️ NO DOCKING HUB DETECTED WITHIN RANGE", 3000, 'error');
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

            // Award permanent gems to the nearest base (Phase 16-1B)
            const gemsAwarded = Math.floor(totalValue / 10);
            if (this.spaceBase) {
                if (!this.spaceBase.inventory) this.spaceBase.inventory = {};
                this.spaceBase.inventory.emerald = (this.spaceBase.inventory.emerald || 0) + gemsAwarded;
            } else {
                this.playerGems += gemsAwarded;
            }
            localStorage.setItem('playerGems', this.playerGems);

            this.saveCredits();
            this.baseBuilder.saveSpaceBases(); // Save updated inventories
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
            const val = this.playerGems || 0;
            hangarGemsEl.textContent = val.toLocaleString();
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
        this.renderManager.safeAddColorStop(grad, 0, `rgba(255, 105, 180, ${0.4 * glow})`);
        this.renderManager.safeAddColorStop(grad, 1, 'rgba(255, 105, 180, 0)');
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
    updateMinerals(dt = 1.0) {
        if (!this.flightMode) return;

        // 1. DRONE SYSTEM: Update drones
        if (this.droneManager) this.droneManager.update(dt);
        if (this.particleManager) this.particleManager.update(dt);
        if (this.marketplaceManager) this.marketplaceManager.update(dt);
        if (this.fleetManager) this.fleetManager.update(dt);
        if (this.trainingActive) this.updateTraining(dt);
        
        // 2. EMITTER SYSTEM: Handle projectiles and effects
        this.updateProjectiles(dt);
        if (this.effectManager && this.effectManager.updateDamageEffects) {
            this.effectManager.updateDamageEffects(dt);
        }

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

        // 11. PLAYER-OWNED BLACK HOLE (Phase 14)
        for (const bh of this.hazardBlackHoles) {
            if (!bh.playerOwned) continue;
            const pullRadius = 1800 * (bh.powerScale || 1.0);
            const maxPull = 30 * (bh.powerScale || 1.0);
            for (const mineral of this.minerals) {
                const dx = bh.x - mineral.x;
                const dy = bh.y - mineral.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < pullRadius && dist > 10) {
                    const force = (1 - dist / pullRadius) * maxPull;
                    mineral.x += (dx / dist) * force;
                    mineral.y += (dy / dist) * force;
                    if (dist < 30) this.minerals = this.minerals.filter(m => m !== mineral);
                }
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
            if (this.shieldDamageFlash <= 0 && this.playerShip.shield < this.playerShip.maxShield * 0.9) {
                this.createExplosion(this.playerShip.x, this.playerShip.y, 'hit', '#55ff00');
                this.shieldDamageFlash = 10;
            }
        }

        this.playerShip.lastDamageTime = Date.now();

        // 1. ATOMIC OVER-SHIELD: First line of defense (High-tier Phase 18 Addition)
        if (this.playerShip.atomicShield > 0 && !ignoreShield) {
            const atomicDamage = Math.min(this.playerShip.atomicShield, amount);
            this.playerShip.atomicShield -= atomicDamage;
            amount -= atomicDamage;
            // Visual feedback: Radioactive pulse
            this.createExplosion(this.playerShip.x, this.playerShip.y, 'hit', '#55ff00');
            if (amount <= 0) {
                this.hudManager.updateShipStatus();
                return;
            }
        }

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
                        <button class="btn-small" style="width: 100%; border-color:#00f3ff;" onclick="app.upgradeSkill('emp', 400)">Upgrade 💎400</button>
                    </div>
                    <!-- Afterburner -->
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border: 1px solid #ff5500; border-radius: 8px; text-align: center;">
                        <h3 style="color: #ff5500; font-size: 16px;">Afterburner</h3>
                        <div style="font-size: 10px; color: #aaa; height: 40px;">Double boost acceleration for 5s.</div>
                        <div style="color: #fff; margin: 10px 0;">Level: <span id="skillLvl_afterburner">${this.playerSkills.afterburner}/3</span></div>
                        <button class="btn-small" style="width: 100%; border-color:#ff5500;" onclick="app.upgradeSkill('afterburner', 250)">Upgrade 💎250</button>
                    </div>
                    <!-- Quantum Jump -->
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border: 1px solid #ff00ff; border-radius: 8px; text-align: center;">
                        <h3 style="color: #ff00ff; font-size: 16px;">Quantum Dash</h3>
                        <div style="font-size: 10px; color: #aaa; height: 40px;">Instant spacetime translation forward.</div>
                        <div style="color: #fff; margin: 10px 0;">Level: <span id="skillLvl_quantum">${this.playerSkills.quantum}/3</span></div>
                        <button class="btn-small" style="width: 100%; border-color:#ff00ff;" onclick="app.upgradeSkill('quantum', 600)">Upgrade 💎600</button>
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

    // Trigger planet impact effect - LOCALIZED PLUME AND FLASH
    triggerPlanetImpactEffect(planet) {
        this.baseBuilder.triggerPlanetImpactEffect(planet);
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

        // Reset ship position and velocity
        if (this.playerShip) {
            this.playerShip.x = 0;
            this.playerShip.y = 0;
            this.playerShip.z = 0;
            this.playerShip.vx = 0;
            this.playerShip.vy = 0;
            this.playerShip.vz = 0;
            this.playerShip.rotation = 0;
        }

        // Stop old tutorial if running
        this.tutorialActive = false;

        console.log(`[Training] Starting lesson ${lessonIndex + 1}: ${lesson.name}`);
        console.log('[Procedural] Volumetric Training Field INITIALIZED.');
    }

    /**
     * Phase 23: Core logic for training progression and gate detection.
     */
    updateTraining(dt) {
        if (!this.trainingActive || !this.playerShip || !this.trainingLesson) return;

        // Skip updates if briefing is showing
        if (this.trainingBriefing) {
            // Briefing auto-closes on movement or after timeout
            const elapsed = (performance.now() - this.trainingBriefingStart) / 1000;
            if (elapsed > 4) this.trainingBriefing = false;
            return;
        }

        this.trainingTimer += dt;
        
        const lesson = this.trainingLesson;
        const gate = lesson.gates[this.trainingGateIndex];
        
        if (gate) {
            const dx = this.playerShip.x - gate.x;
            const dy = this.playerShip.y - gate.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < gate.size) {
                gate.reached = true;
                this.trainingGateIndex++;
                
                if (this.notificationManager) {
                    this.notificationManager.add(`GATE ${this.trainingGateIndex} SECURED`, { type: 'success', tag: 'TRAINING' });
                }
                
                if (this.trainingGateIndex >= lesson.gates.length) {
                    this.completeTrainingLesson();
                }
            }
        }
    }

    // Dismiss briefing and start timer
    dismissTrainingBriefing() {
        this.trainingBriefing = false;
        this.trainingStartTime = performance.now();
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
            throttle: { gems: { iron: 10, copper: 5 }, bonus: { gold: { silver: 4 }, silver: { titanium: 2 }, bronze: {} }, playerGems: { gold: 100, silver: 50, bronze: 25 } },
            steering: { gems: { copper: 10, titanium: 4 }, bonus: { gold: { silicon: 6 }, silver: { copper: 4 }, bronze: {} }, playerGems: { gold: 120, silver: 60, bronze: 30 } },
            boost: { gems: { titanium: 6, silicon: 6 }, bonus: { gold: { silver: 4 }, silver: { titanium: 4 }, bronze: {} }, playerGems: { gold: 150, silver: 75, bronze: 35 } },
            precision: { gems: { silver: 6, gold: 2 }, bonus: { gold: { platinum: 2 }, silver: { gold: 2 }, bronze: {} }, playerGems: { gold: 200, silver: 100, bronze: 50 } },
            collection: { gems: { gold: 4, platinum: 2 }, bonus: { gold: { palladium: 2 }, silver: { platinum: 2 }, bronze: {} }, playerGems: { gold: 250, silver: 125, bronze: 60 } },
            radar: { gems: { platinum: 4, palladium: 2 }, bonus: { gold: { quartz: 2 }, silver: { palladium: 2 }, bronze: {} }, playerGems: { gold: 300, silver: 150, bronze: 75 } },
            final: { gems: { gold: 6, platinum: 4, diamond: 2 }, bonus: { gold: { emerald: 2, ruby: 2 }, silver: { diamond: 2 }, bronze: { quartz: 2 } }, playerGems: { gold: 500, silver: 250, bronze: 125 } },
            weaponry: { gems: { titanium: 10, gold: 4 }, bonus: { gold: { sapphire: 5 }, silver: { gold: 2 }, bronze: {} }, playerGems: { gold: 350, silver: 175, bronze: 80 } },
            shielding: { gems: { iron: 20, copper: 20 }, bonus: { gold: { emerald: 5 }, silver: { copper: 10 }, bronze: {} }, playerGems: { gold: 350, silver: 175, bronze: 80 } },
            hazards: { gems: { palladium: 6, quartz: 4 }, bonus: { gold: { diamond: 3 }, silver: { quartz: 2 }, bronze: {} }, playerGems: { gold: 400, silver: 200, bronze: 100 } }
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

            // Award Player Gems (for ship unlocks)
            if (medal && gemReward.playerGems[medal]) {
                const gemsAwarded = gemReward.playerGems[medal];
                this.playerGems += gemsAwarded;
                localStorage.setItem('playerGems', this.playerGems);
                gemSummary.push(`💎 ${gemsAwarded}`);
                if (this.updateGemsUI) this.updateGemsUI();
            }

            // Log mission completion in Chronicle
            this.logManager?.addEntry('MISSIONS', `Completed ${lesson.name} (${medal.toUpperCase()} Medal). Earned $${reward}.`, 'success');
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
            this.playerGems += 1000;
            this.playerInventory['sapphire'] = (this.playerInventory['sapphire'] || 0) + 1;
            this.playerInventory['uranium'] = (this.playerInventory['uranium'] || 0) + 1;
            this.saveCredits();
            localStorage.setItem('playerGems', this.playerGems);
            this.saveInventory();
            this.hudManager.updateInventoryUI();
            if (this.updateGemsUI) this.updateGemsUI();

            // Mark as awarded
            progress._graduationBonusAwarded = true;
            this.saveTrainingProgress();

            this.hudManager.showToast('🎓🏆 FLIGHT ACADEMY GRADUATED! +$2,000 +💎1,000 +1 Sapphire +1 Uranium!');
            console.log('[Training] All 10 lessons complete — graduation bonus awarded!');
        }
    }

    // Open the Flight Academy selector UI
    openFlightAcademy() {
        if (this.academyManager) {
            this.academyManager.openAcademy();
        } else {
            const modal = document.getElementById('academyModal');
            if (modal) {
                this.closeAllModals();
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
            }
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

    renderSpeedLines(ctx) {
        if (!this.speedLines) return;
        this.speedLines.forEach(line => {
            ctx.save();
            ctx.translate(line.x, line.y);

            ctx.globalAlpha = line.life * 0.5;
            ctx.strokeStyle = '#88ccff';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-line.vx * 3, -line.vy * 3);
            ctx.stroke();

            ctx.globalAlpha = 1;
            ctx.restore();
        });
    }

    renderPlayerShip(ctx, time, overrideShip = null, isGhost = false) {
        if (this.mode !== 'flight' && !overrideShip) return;
        const ship = overrideShip || this.playerShip;
        if (!ship) return;

        // --- MOTION BLUR (Phase 4) ---
        const speed = Math.hypot(ship.vx || 0, ship.vy || 0);
        if (!isGhost && speed > 20) {
            const ghostCount = Math.min(3, Math.floor(speed / 15));
            for (let i = 1; i <= ghostCount; i++) {
                ctx.save();
                // Draw legacy ghosts slightly behind
                const lag = i * 2; 
                ctx.translate(-ship.vx * lag * 0.1, -ship.vy * lag * 0.1);
                ctx.globalAlpha = 0.3 / i;
                this.renderPlayerShip(ctx, time, ship, true);
                ctx.restore();
            }
        }

        // --- MUZZLE FLASH (Phase 5) ---
        if (this.muzzleFlashTimer > 0) {
            this.muzzleFlashTimer--;
            ctx.save();
            ctx.translate(ship.x, ship.y);
            ctx.rotate(ship.rotation);
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00f3ff';
            const isHeavy = ship.type === 'freighter' || ship.type === 'capital';
            const offset = isHeavy ? 20 : 0;
            ctx.beginPath();
            ctx.arc(40, -offset, 8, 0, Math.PI * 2);
            if (isHeavy) ctx.arc(40, offset, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Hide ship during intense hazard effects
        if (this.hazardEffect && !isGhost) {
            const h = this.hazardEffect;
            if (h.flashIntensity > 0.15 && h.type !== 'missile_hit') return;
            if (h.type === 'player_death' && h.phase === 'whiteout') return;
            if (h.type === 'supernova' && h.phase !== 'reset') return;
            if (h.type === 'missile_base_destruction' && ['explosion', 'eruption', 'whiteout'].includes(h.phase)) return;
            if (h.type === 'planet_impact' && h.progress < 0.3) return;
        }

        const safeZoom = Math.max(0.01, this.camera.zoom || 1);
        const size = 45; // Base ship size
        const shipType = ship.type || 'interceptor';
        const shipColor = ship.color || '#00f3ff';
        const pitch = ship.pitch || 0;
        const pitchScale = Math.cos(pitch);

        ctx.save();
        ctx.globalAlpha = 1.0; // Reset alpha for main ship body

        // Ghosts are handled by globalAlpha in Renderer.js, but we can further darken them here
        if (isGhost) {
            ctx.shadowBlur = 0; // No glow for ghosts to prevent light bloom
        }

        // SPECTRE CLOAK: Transparent ship
        if (ship.isCloaked && ship.type === 'spectre' && !isGhost) {
            ctx.globalAlpha *= 0.3;
        }

        // World position translation (Skipped if Renderer already translated)
        if (!overrideShip) {
            ctx.translate(ship.x, ship.y);
        }

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

        // --- ZEN BUFFER AURA (Phase 19-1) ---
        if (ship.zenBuffer && Date.now() < ship.zenBuffer) {
            this.drawZenAura(ctx, ship, size, time);
        }

        ctx.restore();
    }

    drawZenAura(ctx, ship, size, time) {
        ctx.save();
        const pulse = (Math.sin(time * 0.005) + 1) / 2;
        const auraSize = size * (1.5 + pulse * 0.3);
        
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, auraSize);
        this.renderManager.safeAddColorStop(grad, 0, 'rgba(255, 105, 180, 0.4)'); // Lotus Pink
        this.renderManager.safeAddColorStop(grad, 0.6, 'rgba(255, 182, 193, 0.1)');
        this.renderManager.safeAddColorStop(grad, 1, 'transparent');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, auraSize, 0, Math.PI * 2);
        ctx.fill();

        // Prismatic Edge
        ctx.strokeStyle = `hsla(${(time * 0.1) % 360}, 70%, 80%, 0.5)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, auraSize * 0.9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }


    drawSaucer(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawHauler(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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
        sphereGrad.safeAddColorStop(0, this.adjustColor(shipColor, 40));
        sphereGrad.safeAddColorStop(0.5, shipColor);
        sphereGrad.safeAddColorStop(0.8, this.adjustColor(shipColor, -40));
        sphereGrad.safeAddColorStop(1, this.adjustColor(shipColor, -80));

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
        dishGrad.safeAddColorStop(0, this.adjustColor(shipColor, -100));
        dishGrad.safeAddColorStop(0.6, this.adjustColor(shipColor, -60));
        dishGrad.safeAddColorStop(1, this.adjustColor(shipColor, -30));
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

    drawOrion(ctx, size, shipColor = '#00f3ff', pitch, pitchScale) {
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

    drawDraco(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawPhoenix(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
        // PHOENIX - Majestic fiery bird spacecraft
        ctx.save();
        ctx.scale(1, pitchScale || 1);

        // Flame trail effect behind ship
        const flamePulse = 0.5 + Math.sin((time || Date.now()) * 0.008) * 0.3;
        const flameGrad = ctx.createLinearGradient(-size * 1.5, 0, -size * 0.5, 0);
        flameGrad.safeAddColorStop(0, 'transparent');
        flameGrad.safeAddColorStop(0.3, `rgba(255, 100, 0, ${flamePulse * 0.3})`);
        flameGrad.safeAddColorStop(0.7, `rgba(255, 200, 0, ${flamePulse * 0.6})`);
        flameGrad.safeAddColorStop(1, this.adjustColor(shipColor, 40));
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
        cockpitGrad.safeAddColorStop(0, '#ffffff');
        cockpitGrad.safeAddColorStop(0.4, this.adjustColor(shipColor, 80));
        cockpitGrad.safeAddColorStop(1, this.adjustColor(shipColor, 30));
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

    drawHarvester(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawInterceptor(ctx, size, shipColor = '#00f3ff', pitchScale) {
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

    drawViper(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawBulwark(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawProspector(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawSpectre(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawNova(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
        // NOVA - Floating rotating core and rings
        ctx.save();
        ctx.scale(1, pitchScale || 1);
        const t = (time || Date.now()) * 0.002;

        // Super-dense Glowing Core
        const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8);
        coreGlow.safeAddColorStop(0, '#ffffff');
        coreGlow.safeAddColorStop(0.3, shipColor);
        coreGlow.safeAddColorStop(1, 'rgba(0,0,0,0)');

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

    drawSiphon(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
        ctx.save(); ctx.scale(1, pitchScale || 1); ctx.fillStyle = shipColor; ctx.strokeStyle = this.adjustColor(shipColor, 50); ctx.lineWidth = 2 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath(); ctx.moveTo(-size * 0.5, 0); ctx.lineTo(-size * 0.2, -size * 0.8); ctx.lineTo(size * 1.1, -size * 0.3); ctx.lineTo(size * 0.2, -size * 0.2); ctx.lineTo(size * 0.6, 0);
        ctx.lineTo(size * 0.2, size * 0.2); ctx.lineTo(size * 1.1, size * 0.3); ctx.lineTo(-size * 0.2, size * 0.8); ctx.closePath();
        ctx.fill(); ctx.stroke();
        this.drawEngineFlame(ctx, -size * 0.4, 0, size * 0.3, '#aa00ff', time || Date.now());
        ctx.restore();
    }

    drawTitan(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
        ctx.save(); ctx.scale(1, pitchScale || 1); ctx.fillStyle = shipColor; ctx.strokeStyle = '#222'; ctx.lineWidth = 4 / (this.camera ? this.camera.zoom : 1);
        ctx.beginPath(); ctx.moveTo(size * 1.2, 0); ctx.lineTo(0, -size * 1.0); ctx.lineTo(-size * 1.2, 0); ctx.lineTo(0, size * 1.0); ctx.closePath();
        ctx.fill(); ctx.stroke();
        this.drawEngineFlame(ctx, -size * 1.1, 0, size * 0.8, '#ff0000', time || Date.now());
        ctx.restore();
    }

    drawPulse(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawFlux(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

    drawApex(ctx, size, shipColor = '#00f3ff', pitchScale, time) {
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

            // --- LUXURY EFFECTS (Phase 19-1) ---
            const isLuxury = ['diamond', 'sapphire', 'platinum', 'emerald', 'ruby'].includes(mineral.type);
            const isExotic = ['exotic', 'antimatter', 'quantum'].includes(mineral.type);

            if (isLuxury) {
                // Prismatic Sparkles
                for (let i = 0; i < 4; i++) {
                    const sparkAngle = time * 0.005 + (i * Math.PI / 2);
                    const sparkDist = size * (1.2 + Math.sin(time * 0.01 + i) * 0.3);
                    const sx = Math.cos(sparkAngle) * sparkDist;
                    const sy = Math.sin(sparkAngle) * sparkDist;
                    
                    ctx.fillStyle = '#fff';
                    ctx.globalAlpha = 0.8 * pulse;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 2 / safeZoom, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Cross-hair lens flare (Enhanced)
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.lineWidth = 1.5 / safeZoom;
                    ctx.beginPath();
                    ctx.moveTo(sx - 10 / safeZoom, sy); ctx.lineTo(sx + 10 / safeZoom, sy);
                    ctx.moveTo(sx, sy - 10 / safeZoom); ctx.lineTo(sx, sy + 10 / safeZoom);
                    ctx.stroke();
                }
            }

            if (isExotic) {
                // Gravitational Ripples
                ctx.strokeStyle = mineral.color;
                ctx.lineWidth = 1 / safeZoom;
                const rippleSize = size * (2 + Math.sin(time * 0.008) * 0.5);
                ctx.globalAlpha = 0.2;
                ctx.beginPath();
                ctx.arc(0, 0, rippleSize, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Glow effect
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.5);
            gradient.addColorStop(0, mineral.color);
            gradient.addColorStop(0.5, (mineral.color || '#fff') + '88');
            gradient.addColorStop(1, (mineral.color || '#fff') + '00');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, size * 2.5, 0, Math.PI * 2);
            ctx.fill();

            // --- FACETED CORE (CUT GEM LOOK) ---
            const sides = isLuxury ? 8 : (isExotic ? 12 : 6);
            const rotation = time * 0.001 + (mineral.phase || 0);
            
            ctx.save();
            ctx.rotate(rotation);
            
            // Draw Main Shape
            ctx.fillStyle = mineral.color;
            ctx.strokeStyle = '#ffffff44';
            ctx.lineWidth = 1 / safeZoom;
            ctx.beginPath();
            for (let i = 0; i < sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const px = Math.cos(angle) * size;
                const py = Math.sin(angle) * size;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            
            // Shadow / Glow for luxury
            if (isLuxury) {
                ctx.shadowBlur = 20 / safeZoom;
                ctx.shadowColor = mineral.color;
            }
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Internal Facet Lines (Refraction)
            ctx.beginPath();
            ctx.strokeStyle = '#ffffff22';
            for (let i = 0; i < sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const px = Math.cos(angle) * size;
                const py = Math.sin(angle) * size;
                ctx.moveTo(0, 0);
                ctx.lineTo(px, py);
            }
            ctx.stroke();

            // Smaller internal facet ring
            ctx.beginPath();
            ctx.fillStyle = '#ffffff33';
            for (let i = 0; i < sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const px = Math.cos(angle) * size * 0.5;
                const py = Math.sin(angle) * size * 0.5;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();

            // High-shine highlight (Twinkle)
            const shineSize = size * 0.4;
            const shineGrad = ctx.createRadialGradient(-size*0.2, -size*0.2, 0, -size*0.2, -size*0.2, shineSize);
            shineGrad.safeAddColorStop(0, '#ffffffaa');
            shineGrad.safeAddColorStop(1, '#ffffff00');
            ctx.fillStyle = shineGrad;
            ctx.beginPath();
            ctx.arc(-size*0.2, -size*0.2, shineSize, 0, Math.PI*2);
            ctx.fill();

            ctx.restore();
            ctx.restore();

        });
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

    // Get the center point of all stars (constellation center)
    getConstellationCenter() {
        if (!this.stars || this.stars.length === 0) {
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

    // Hangar Delegation (Phase 25 Restoration)
    showShipModal() { if (this.hangarManager) this.hangarManager.showShipModal(); }
    showOrdnance() { if (this.hangarManager) this.hangarManager.showOrdnance(); }
    initHangar() { if (this.hangarManager) this.hangarManager.updateHangarUI(); }

    selectShip() { if (this.hangarManager) this.hangarManager.selectShip(); }
    updateHangarUI() { if (this.hangarManager) this.hangarManager.updateHangarUI(); }
    nextHangarBay() { if (this.hangarManager) this.hangarManager.nextHangarBay(); }
    prevHangarBay() { if (this.hangarManager) this.hangarManager.prevHangarBay(); }
    setHangarColor(c) { if (this.hangarManager) this.hangarManager.setHangarColor(c); }

    updateHangarStats(idx) {
        if (this.hangarManager && this.hangarManager.updateHangarUI) {
            this.hangarManager.updateHangarUI();
        }
    }

    showEmpireOverview() {
        if (this.hudManager) this.hudManager.showEmpireOverview();
    }

    showPrestigeModal() {
        if (this.hudManager) this.hudManager.showPrestigeModal();
    }

    toggleUpgradePanel() {
        // Redirect legacy call to the new Trade Terminal
        if (this.hudManager) this.hudManager.showTradeTerminal();
    }


    setHangarTab(tab) {
        // Toggle Active Class on Buttons
        document.querySelectorAll('.h-tab').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`tab-${tab}`);
        if (activeBtn) activeBtn.classList.add('active');

        // Toggle Content Overlays
        const viewPort = document.querySelector('.hangar-viewport');
        const skins = document.getElementById('skinsPanel');
        const coll = document.getElementById('collectionPanel');
        const nav = document.querySelector('.hangar-nav');

        if (viewPort) viewPort.style.display = tab === 'ships' ? 'block' : 'none';
        if (nav) nav.style.display = tab === 'ships' ? 'flex' : 'none';
        
        if (skins) skins.classList.toggle('hidden', tab !== 'skins');
        if (coll) coll.classList.toggle('hidden', tab !== 'collection');

        if (tab === 'skins') this.renderSkinSelector();
        if (tab === 'collection') this.renderHangarCollection();
    }

    updateHangarStats(idx) {
        const ship = this.hangarShips[idx];
        if (!ship) return;

        // Map internal types to display data if needed, or use directly
        const stats = {
            'interceptor': { speed: 90, armor: 20, shield: 40, ability: 'BLINK DASH', desc: 'A nimble scout designed for high-speed hit-and-run tactics.' },
            'hauler': { speed: 40, armor: 80, shield: 60, ability: 'MAGNETIC FIELD', desc: 'Heavy freighter with advanced mineral tractor beams.' },
            'viper': { speed: 100, armor: 10, shield: 30, ability: 'OVERCHARGE', desc: 'Precision racing vessel. Fastest ship in the sector.' },
            'titan': { speed: 30, armor: 100, shield: 100, ability: 'FORTRESS', desc: 'The frontline of the fleet. Massive hull and heavy plating.' },
            'spectre': { speed: 70, armor: 30, shield: 50, ability: 'CLOAK', desc: 'Stealth ship. Invisible to most radar-guided hazards.' }
        };

        const data = stats[ship.id] || { speed: 50, armor: 50, shield: 50, ability: 'STANDARD', desc: 'Reliable all-purpose vessel.' };

        // Update Text
        const modelEl = document.getElementById('stat-model');
        const abilityEl = document.getElementById('stat-ability');
        const descEl = document.getElementById('stat-desc');
        
        if (modelEl) modelEl.textContent = ship.id.toUpperCase();
        if (abilityEl) abilityEl.textContent = data.ability;
        if (descEl) descEl.textContent = data.desc;

        // Update Bars
        const bSpeed = document.getElementById('bar-speed');
        const bArmor = document.getElementById('bar-armor');
        const bShield = document.getElementById('bar-shield');

        if (bSpeed) bSpeed.style.width = `${data.speed}%`;
        if (bArmor) bArmor.style.width = `${data.armor}%`;
        if (bShield) bShield.style.width = `${data.shield}%`;
    }

    renderSkinSelector() {
        const grid = document.getElementById('skinsGrid');
        if (!grid) return;

        const skins = [
            { id: 'default', name: 'Standard Issue', color: '#00f3ff' },
            { id: 'chrome', name: 'Hyper-Chrome', color: '#ffffff' },
            { id: 'nebula', name: 'Nebula Mist', color: '#aa00ff' },
            { id: 'void', name: 'Void Texture', color: '#111111' },
            { id: 'gold', name: '24K Plating', color: '#ffd700' },
            { id: 'crimson', name: 'Crimson Fury', color: '#ff0055' }
        ];

        grid.innerHTML = skins.map(skin => `
            <div class="skin-card" onclick="window.game.setShipSkin('${skin.id}', '${skin.color}')">
                <div class="skin-swatch" style="background: ${skin.color}"></div>
                <div class="skin-name">${skin.name}</div>
            </div>
        `).join('');
    }

    setShipSkin(id, color) {
        this.setHangarColor(color);
        this.playerShip.activeSkin = id;
        this.hudManager.showToast(`Applied ${id.toUpperCase()} skin`, 2000, 'success');
        console.log(`[Hangar] Skin updated to: ${id}`);
    }

    renderHangarCollection() {
        const container = document.getElementById('collectionGems');
        if (!container) return;

        const gems = this.playerInventory || {};
        const gemTypes = [
            { id: 'diamond', name: 'Diamond', icon: '💎' },
            { id: 'sapphire', name: 'Sapphire', icon: '🔹' },
            { id: 'emerald', name: 'Emerald', icon: '💚' },
            { id: 'ruby', name: 'Ruby', icon: '🔴' },
            { id: 'gold', name: 'Gold', icon: '🟡' },
            { id: 'platinum', name: 'Platinum', icon: '⚪' }
        ];

        container.innerHTML = gemTypes.map(g => {
            const count = gems[g.id] || 0;
            return `
                <div class="gem-item">
                    <div style="font-size: 32px; margin-bottom: 10px;">${g.icon}</div>
                    <span class="count">${count}</span>
                    <span class="name">${g.name}</span>
                </div>
            `;
        }).join('');
    }

    renderHangarPreviews() {
        if (this.hangarManager && this.hangarManager.updateHangarUI) {
            this.hangarManager.updateHangarUI();
        }
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

    refreshClusterAssignments(force = false) {
        if (!this._clusterCache || force || this._clusterCache.count !== this.stars.length) {
            const lines = [];
            const clusterMap = new Map();
            const maxDist = this.config.maxConnectDist || 180;
            
            this.stars.forEach(s => {
                if (s.clusterId) {
                    if (!clusterMap.has(s.clusterId)) {
                        clusterMap.set(s.clusterId, []);
                    }
                    clusterMap.get(s.clusterId).push(s);
                }
            });

            const clusters = Array.from(clusterMap.values());
            
            // Only generate lines between stars in the same cluster to save performance
            clusters.forEach(c => {
                for (let i = 0; i < c.length; i++) {
                    for (let j = i + 1; j < c.length; j++) {
                        const s1 = c[i];
                        const s2 = c[j];
                        const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
                        if (dist < maxDist) {
                            lines.push({ s1, s2, dist });
                        }
                    }
                }
            });

            this._clusterCache = { lines, clusters, count: this.stars.length };
        }
        return this._clusterCache;
    }

    downloadSVG() {
        if (this.stars.length === 0) {
            this.hudManager.showToast("Universe is empty!");
            return;
        }

        // Ensure cluster IDs are assigned for naming in SVG
        this.refreshClusterAssignments(true);

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

    setHangarColor(color) {
        this.playerShip.color = color;
        localStorage.setItem('playerShipColor', color);

        // Update UI state
        document.querySelectorAll('.color-option').forEach(el => {
            el.classList.toggle('active', el.getAttribute('data-color') === color);
        });

        const picker = document.getElementById('hangarColorPicker');
        if (picker && /^#[0-9A-Fa-f]{6}$/i.test(color) && picker.value !== color) {
            picker.value = color;
        }

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

    // === PLANETARY LANDING & BASE BUILDING (Phase 8 Modularization) ===
    openBaseBuilder(planet) { this.baseBuilder.openBaseBuilder(planet); }
    closeBaseBuilder() { this.baseBuilder.closeBaseBuilder(); }
    selectBaseTool(tool) { this.baseBuilder.selectBaseTool(tool); }
    updateSpaceBase() { this.baseBuilder.updateSpaceBase(); }
    drawBaseGrid(ctx) { this.baseBuilder.drawBaseGrid(ctx); }
    buildBaseBlock(cellId) {
        // Legacy bridge for buildBaseBlock if still used by some UI elements
        const parts = cellId.split('_');
        if (parts.length === 3) {
            this.baseBuilder.placeBaseModule(parseInt(parts[1]), parseInt(parts[2]));
        }
    }

    // Phase 16-1B: Empire Resource Logic
    getEmpireGems(type = 'emerald') {
        return this.spaceBases.reduce((total, base) => {
            return total + (base.inventory ? (base.inventory[type] || 0) : 0);
        }, 0);
    }

    transferResources(fromBase, toBase, amount, type) {
        if (!fromBase.inventory || !fromBase.inventory[type] || fromBase.inventory[type] < amount) return false;
        
        if (!toBase.inventory) toBase.inventory = {};
        fromBase.inventory[type] -= amount;
        toBase.inventory[type] = (toBase.inventory[type] || 0) + amount;
        
        this.baseBuilder.saveSpaceBases();
        return true;
    }

    damageBase(base, amount) {
        const hasShield = Object.values(base).some(v => v === 'shield');
        if (hasShield && (base.shieldHealth || 0) > 0) {
            base.shieldHealth = Math.max(0, base.shieldHealth - amount);
            this.hudManager.showToast(`🛡️ Shield active on ${base.planetName} | -${amount} EN`, 2000);
            return;
        }

        // Damage population / stability
        const popLoss = Math.floor(amount / 5);
        base.population = Math.max(0, (base.population || 0) - popLoss);
        base.stability = Math.max(0, (base.stability || 100) - 5);
        this.hudManager.showToast(`⚠️ Warning: ${base.planetName} hit! Population lost: ${popLoss}`, 3000, 'error');
        this.baseBuilder.saveSpaceBases();
    }

    getNearestBase(x, y, maxDist = 5000) {
        let nearest = null;
        let minDist = maxDist;

        this.spaceBases.forEach(base => {
            const d = Math.hypot(base.x - x, base.y - y);
            if (d < minDist) {
                minDist = d;
                nearest = base;
            }
        });
        return nearest;
    }

    jumpToCoordinates(x, y) {
        if (!this.playerShip) return;
        this.playerShip.x = x;
        this.playerShip.y = y;
        this.playerShip.vx = 0;
        this.playerShip.vy = 0;
        this.camera.x = x;
        this.camera.y = y;
        this.hudManager.showToast(`✨ Jump successful | POS: ${Math.floor(x)}, ${Math.floor(y)}`, 3000);
    }

    // --- CELESTIAL VAULT: COLLECTION UI ---

    renderHangarCollection() {
        const container = document.getElementById('collectionGems');
        if (!container) return;

        container.innerHTML = '';
        const inventory = this.playerInventory || {};
        
        // Show all possible luxury/exotic gems, but faded if not found
        Object.keys(MINERAL_TYPES).forEach(type => {
            const def = MINERAL_TYPES[type];
            const count = inventory[type] || 0;
            if (count === 0 && def.rarity === 'common') return; // Hide common if none found

            const card = document.createElement('div');
            card.className = `gem-card ${count === 0 ? 'faded' : ''}`;
            if (count === 0) card.style.opacity = '0.3';

            card.innerHTML = `
                <div class="gem-count">${count}</div>
                <div class="gem-preview">
                    <canvas id="vault-gem-${type}" width="100" height="100"></canvas>
                </div>
                <div class="gem-rarity rarity-${def.rarity}">${def.rarity}</div>
                <div class="gem-name">${def.name}</div>
                <div class="gem-value">$${def.value}</div>
            `;
            container.appendChild(card);
        });

        // Start the preview loop
        this._collectionActive = true;
        this.renderCollectionPreviews();
    }

    renderCollectionPreviews() {
        if (!this._collectionActive || !document.getElementById('collectionPanel') || 
            document.getElementById('collectionPanel').classList.contains('hidden')) {
            this._collectionActive = false;
            return;
        }

        const time = Date.now();
        Object.keys(MINERAL_TYPES).forEach(type => {
            const canvas = document.getElementById(`vault-gem-${type}`);
            if (canvas) {
                this.drawVaultGem(canvas, type, time);
            }
        });

        requestAnimationFrame(() => this.renderCollectionPreviews());
    }

    drawVaultGem(canvas, type, time) {
        const ctx = canvas.getContext('2d');
        const def = MINERAL_TYPES[type];
        const w = canvas.width;
        const h = canvas.height;
        const size = 30; // Base size for UI

        ctx.clearRect(0, 0, w, h);
        
        ctx.save();
        ctx.translate(w / 2, h / 2);

        // Rotation & Hover Pulse
        const rotation = time * 0.0015;
        const pulse = 1.0 + Math.sin(time * 0.003) * 0.05;
        ctx.scale(pulse, pulse);
        ctx.rotate(rotation);

        // Logic from renderMinerals upgraded for high-res preview
        const isLuxury = ['diamond', 'sapphire', 'platinum', 'emerald', 'ruby'].includes(type);
        const isExotic = ['exotic', 'antimatter', 'quantum', 'darkmatter'].includes(type);
        const sides = isLuxury ? 8 : (isExotic ? 12 : 6);

        // Glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.5);
        gradient.addColorStop(0, def.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Shape
        ctx.fillStyle = def.color;
        ctx.strokeStyle = '#ffffff88';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const px = Math.cos(angle) * size;
            const py = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Internal Facets
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff44';
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const px = Math.cos(angle) * size;
            const py = Math.sin(angle) * size;
            ctx.moveTo(0, 0);
            ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Shimmer Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(-size * 0.3, -size * 0.3, size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
    // --- PHASE 3: DIRECTOR'S CUT ---

    toggleHUD() {
        this.hudHidden = !this.hudHidden;
        const hudElements = document.querySelectorAll('.hud, .top-bar, .cockpit-overlay, .indicator-group');
        hudElements.forEach(el => {
            el.style.opacity = this.hudHidden ? '0' : '1';
            el.style.pointerEvents = this.hudHidden ? 'none' : 'auto';
            el.style.transition = 'opacity 0.5s ease-out';
        });
        
        // Toggle Cinematic Smoothing when HUD is hidden
        this.directorMode = this.hudHidden;
        this.cameraSmoothness = this.directorMode ? 0.08 : 1.0;

        this.hudManager.showToast(this.hudHidden ? "CINEMATIC MODE: HUD DISABLED" : "SYSTEMS OVERLAY RESTORED", 3000);
    }

    // === UI NAVIGATION & MODAL MANAGEMENT (Phase 18 Fix) ===

    async start() {
        try {
            console.log("🚀 InterstellarEngine: Starting Core Systems...");
            const startTimestamp = performance.now();
            
            // 1. Initial Setup
            this.resize();
            this.init();
            
            // Force Background before Splash (Sentry Fix)
            if (this.proceduralManager) {
                console.log("🌌 [Boot] Pre-generating celestial baseline...");
                this.proceduralManager.generateSingleStyle('deep-space');
            }

            console.log(`📍 [Boot] Systems initialized in ${Math.round(performance.now() - startTimestamp)}ms`);
            
            // 2. Cinematic Splash Transition (Non-blocking)
            this.ready = true;
            this.splashTransition();
            console.log(`📍 [Boot] Splash sequence triggered at ${Math.round(performance.now() - startTimestamp)}ms`);
            
            // 3. World Generation
            if (this.proceduralManager) {
                console.log("🌌 [Boot] Generating initial sector...");
                this.proceduralManager.generateSector(0, 0);
            }
            
            console.log(`✅ [Boot] ENGINE READY in ${Math.round(performance.now() - startTimestamp)}ms`);
            
            // 4. Start Loops
            if (this.gameLoop && this.gameLoop.start) {
                this.gameLoop.start();
                console.log("📍 GameLoop: STARTED.");
            }

            if (this.hudManager) {
                this.hudManager.showToast('🛸 ENGINE ONLINE: SYSTEM READY', 3000, 'success');
            }
        } catch (e) {
            console.error("❌ CRITICAL: Engine startup failed!", e);
            if (this.hudManager) {
                this.hudManager.showToast('⚠️ STARTUP ERROR: CHECK CONSOLE', 10000, 'error');
            }
            // Emergency fallback
            this.ready = true;
            const loader = document.getElementById('loadingScreen');
            if (loader) loader.style.display = 'none';
        }
    }

    renderDamageEffects(ctx) {
        if (!this.playerShip || this.mode !== 'flight') return;
        const health = this.playerShip.hullHealth || 100;
        if (health > 60) return;

        const time = Date.now();
        const intensity = (60 - health) / 60;
        
        ctx.save();
        ctx.translate(this.playerShip.x, this.playerShip.y);
        ctx.rotate(this.playerShip.rotation);

        if (Math.random() < intensity * 0.4) {
            const ox = -15 + Math.random() * 30;
            const oy = -10 + Math.random() * 20;
            ctx.fillStyle = Math.random() > 0.3 ? '#ffaa00' : '#666';
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#ff3300';
            ctx.beginPath();
            ctx.arc(ox, oy, 1 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    renderCollectionNotifications(ctx) {
        // Safe stub for collection UI in world space
        if (this.hudManager && typeof this.hudManager.renderCollectionOverlay === 'function') {
            this.hudManager.renderCollectionOverlay(ctx);
        }
    }
}

// SINGLETON ENTRY POINT & BOOT FAIL-SAFE
const bootEngine = () => {
    if (window.game) return;
    console.log("⚡ [Boot] Initializing Interstellar Engine...");
    window.game = new InterstellarEngine();
    window.app = window.game;
    window.game.start();
};

window.addEventListener('load', bootEngine);

// Phase 25: Direct-Boot Fail-safe (Starts engine if assets take > 3s)
setTimeout(() => {
    if (!window.game) {
        console.warn("⚠️ [Boot] window.load delayed. Forcing engine initialization...");
        bootEngine();
    }
}, 3000);
