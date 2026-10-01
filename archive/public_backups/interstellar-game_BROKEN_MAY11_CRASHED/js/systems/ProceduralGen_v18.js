class ProceduralManager {
    constructor(game) {
        this.game = game;
        this.lastUpdateX = -999999;
        this.lastUpdateY = -999999;
        this.lastUpdateSector = "";
        console.log('[Procedural] Manager Instantiated successfully with Throttled Universe [Phase 26].');
    }


    generateBackground() {
        const bgStars = [];
        const count = 300; // number of background stars
        for (let i = 0; i < count; i++) {
            bgStars.push({
                x: Math.random() * (this.game.canvas ? this.game.canvas.width : 1600),
                y: Math.random() * (this.game.canvas ? this.game.canvas.height : 900),
                size: Math.random() * 0.5 + 0.1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
        return bgStars;
    }


    // --- PHASE 19: Spectral Restoration ---
    // (Stubs removed to allow full procedural methods defined below)



    // Seeding logic for reproducible procedural generation
    seededRandom(seed) {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    getSectorSeed(sectorX, sectorY) {
        // Multi-level hashing for unique local seeds
        const h1 = this.seededRandom(sectorX * 1234.5);
        const h2 = this.seededRandom(sectorY * 6789.1);
        return h1 * 0.5 + h2 * 0.5;
    }

    getSectorCoords(worldX, worldY) {
        const safeX = isFinite(worldX) ? worldX : 0;
        const safeY = isFinite(worldY) ? worldY : 0;
        return {
            x: Math.floor(safeX / (this.game.sectorSize || 10000)),
            y: Math.floor(safeY / (this.game.sectorSize || 10000))
        };
    }

    updateUniverse() {
        if (!this.game.flightMode || !this.game.playerShip) return;

        const playerX = this.game.playerShip.x;
        const playerY = this.game.playerShip.y;
        const sector = this.getSectorCoords(playerX, playerY);
        const sectorKey = `${sector.x},${sector.y}`;

        // THRESHOLD: Only update if moved more than 500 units OR changed sectors
        const distMoved = Math.hypot(playerX - this.lastUpdateX, playerY - this.lastUpdateY);
        if (distMoved < 500 && sectorKey === this.lastUpdateSector) return;

        this.lastUpdateX = playerX;
        this.lastUpdateY = playerY;
        this.lastUpdateSector = sectorKey;
        this.game.currentSector = sector;

        // Load 7x7 grid of sectors around player
        const loadRadius = 3;
        for (let dx = -loadRadius; dx <= loadRadius; dx++) {
            for (let dy = -loadRadius; dy <= loadRadius; dy++) {
                const sx = sector.x + dx;
                const sy = sector.y + dy;
                const key = `${sx},${sy}`;
                if (!this.game.loadedSectors.has(key)) {
                    this.generateSector(sx, sy);
                }
            }
        }

        // Cleanup sectors that are too far away (increased from 2 to 5)
        const cleanupRadius = 5;
        const sectorsToRemove = [];
        for (const [key] of this.game.loadedSectors.entries()) {
            const parts = key.split(',');
            if (parts.length !== 2) continue;
            const sx = parseInt(parts[0]);
            const sy = parseInt(parts[1]);
            const dist = Math.max(Math.abs(sx - sector.x), Math.abs(sy - sector.y));
            if (dist > cleanupRadius) {
                sectorsToRemove.push(key);
            }
        }

        if (sectorsToRemove.length > 0) {
            // Collect all entities from all sectors being removed into Sets for O(1) lookup
            const mineralsToRemove = new Set();
            const depositsToRemove = new Set();
            const minesToRemove = new Set();
            const turretsToRemove = new Set();
            const blackHolesToRemove = new Set();
            const starsToRemove = new Set();
            const planetsToRemove = new Set();
            const nebulaeToRemove = new Set();
            const galaxiesToRemove = new Set();

            sectorsToRemove.forEach(key => {
                const sectorData = this.game.loadedSectors.get(key);
                if (sectorData) {
                    if (sectorData.minerals) sectorData.minerals.forEach(m => mineralsToRemove.add(m));
                    if (sectorData.deposits) sectorData.deposits.forEach(d => depositsToRemove.add(d));
                    if (sectorData.hazards) {
                        if (sectorData.hazards.mines) sectorData.hazards.mines.forEach(m => minesToRemove.add(m));
                        if (sectorData.hazards.turrets) sectorData.hazards.turrets.forEach(t => turretsToRemove.add(t));
                        if (sectorData.hazards.blackHoles) sectorData.hazards.blackHoles.forEach(b => blackHolesToRemove.add(b));
                    }
                    if (sectorData.stars) sectorData.stars.forEach(s => starsToRemove.add(s));
                    if (sectorData.planets) sectorData.planets.forEach(p => planetsToRemove.add(p));
                    if (sectorData.nebulae) sectorData.nebulae.forEach(n => nebulaeToRemove.add(n));
                    if (sectorData.galaxies) sectorData.galaxies.forEach(g => galaxiesToRemove.add(g));
                    
                    this.game.loadedSectors.delete(key);
                }
            });

            // Batch cleanup: Only one filter pass per global array
            if (mineralsToRemove.size > 0) this.game.minerals = this.game.minerals.filter(m => !mineralsToRemove.has(m));
            if (depositsToRemove.size > 0) this.game.resourceDeposits = this.game.resourceDeposits.filter(d => !depositsToRemove.has(d));
            if (minesToRemove.size > 0) this.game.spaceMines = this.game.spaceMines.filter(m => !minesToRemove.has(m));
            if (turretsToRemove.size > 0) this.game.missileBases = this.game.missileBases.filter(t => !turretsToRemove.has(t));
            if (blackHolesToRemove.size > 0) this.game.hazardBlackHoles = this.game.hazardBlackHoles.filter(b => !blackHolesToRemove.has(b));
            if (starsToRemove.size > 0) this.game.stars = this.game.stars.filter(s => !starsToRemove.has(s));
            if (planetsToRemove.size > 0) this.game.planets = this.game.planets.filter(p => !planetsToRemove.has(p));
            if (nebulaeToRemove.size > 0) this.game.nebulae = this.game.nebulae.filter(n => !nebulaeToRemove.has(n));
            if (galaxiesToRemove.size > 0) this.game.galaxies = this.game.galaxies.filter(g => !galaxiesToRemove.has(g));
        }

        // --- PHASE 2: NEBULA HAZARD MECHANICS ---
        this.handleNebulaHazards();
    }

    handleNebulaHazards() {
        const player = this.game.playerShip;
        if (!player) return;

        let inNebula = false;
        let nebulaType = null;

        for (const sector of this.game.loadedSectors.values()) {
            if (sector.hazards && sector.hazards.nebula) {
                const neb = sector.hazards.nebula;
                const dist = Math.hypot(player.x - neb.x, player.y - neb.y);
                if (dist < neb.radius) {
                    inNebula = true;
                    nebulaType = neb.type;
                    
                    // Apply environmental pressure
                    if (neb.type === 'toxic') {
                        // Slowly drain shields, then hull
                        if (player.shield > 0) player.shield -= 0.05;
                        else player.health -= 0.02;
                    } else if (neb.type === 'static') {
                        // Apply UI glitchness (handled in Renderer)
                        this.game.uiStaticIntensity = (this.game.uiStaticIntensity || 0) * 0.9 + 0.1;
                    }
                    break; 
                }
            }
        }

        // --- PHASE 15: TRANSIENT WORMHOLE DECAY ---
        const now = Date.now();
        if (this.game.wormholes) {
            for (let i = this.game.wormholes.length - 1; i >= 0; i--) {
                const w = this.game.wormholes[i];
                if (now > w.expireTime) {
                    console.log(`[Universe] Wormhole at ${w.x}, ${w.y} collapsed.`);
                    this.game.createExplosion?.(w.x, w.y, 'nebula_hit');
                    this.game.wormholes.splice(i, 1);
                }
            }
        }

        if (!inNebula) {
            this.game.uiStaticIntensity = (this.game.uiStaticIntensity || 0) * 0.95;
        }
        this.game.inNebulaHazard = inNebula;
        this.game.nebulaHazardType = nebulaType;
    }


    generateSector(sectorX, sectorY) {
        const key = `${sectorX},${sectorY}`;
        if (this.game.loadedSectors.has(key)) return;

        console.log(`[Universe] Generating sector(${sectorX}, ${sectorY})`);

        const seed = this.getSectorSeed(sectorX, sectorY);
        const sectorData = { 
            x: sectorX, y: sectorY, 
            minerals: [], deposits: [], 
            structures: [], 
            hazards: { mines: [], turrets: [], blackHoles: [], nebula: null } 
        };

        const minX = sectorX * this.game.sectorSize;
        const maxX = (sectorX + 1) * this.game.sectorSize;
        const minY = sectorY * this.game.sectorSize;
        const maxY = (sectorY + 1) * this.game.sectorSize;

        const sectorInfo = this.game.sectorManager ? this.game.sectorManager.getCurrentSectorData() : { difficulty: 1.0 };
        let difficultyScale = sectorInfo.difficulty || 1.0;
        if (!isFinite(difficultyScale) || isNaN(difficultyScale)) difficultyScale = 1.0;


        const mineralCount = Math.floor((15 + this.seededRandom(seed + 1) * 25) * (0.8 + difficultyScale * 0.2));
        for (let i = 0; i < mineralCount; i++) {
            const s = seed + i * 1000;
            const x = minX + this.seededRandom(s) * this.game.sectorSize;
            const y = minY + this.seededRandom(s + 1) * this.game.sectorSize;
            const dist = Math.hypot(x, y);

            let type = 'iron';
            const r = this.seededRandom(s + 2);
            
            // Influence mineral rarity by distance AND sector difficulty
            const effectiveDist = dist * difficultyScale;

            if (effectiveDist < 1500) type = ['iron', 'copper', 'coal', 'titanium', 'silicon'][Math.floor(r * 5)];
            else if (effectiveDist < 4000) type = ['silver', 'gold', 'platinum', 'palladium'][Math.floor(r * 4)];
            else if (effectiveDist < 8000) type = ['quartz', 'diamond', 'emerald', 'ruby', 'sapphire'][Math.floor(r * 5)];
            else if (effectiveDist < 15000) type = ['uranium', 'plutonium', 'helium3'][Math.floor(r * 3)];
            else type = ['neodymium', 'lanthanum', 'darkmatter', 'antimatter'][Math.floor(r * 4)];

            const info = MINERAL_TYPES[type];
            if (!info) continue;

            const mineral = { x, y, type, color: info.color, size: info.size, value: info.value };
            this.game.minerals.push(mineral);
            sectorData.minerals.push(mineral);
        }

        // --- RARE MEGA-STRUCTURES (Phase 2) ---
        const structSeed = seed + 7777;
        const structX = minX + 2000 + this.seededRandom(structSeed) * (this.game.sectorSize - 4000);
        const structY = minY + 2000 + this.seededRandom(structSeed + 1) * (this.game.sectorSize - 4000);

        if (this.game.warpGateManager) {
            if (this.seededRandom(structSeed + 2) < 0.015) { // 1.5% chance for Gateway
                const gateway = this.game.warpGateManager.addGateway(`Ancient Node ${sectorX}:${sectorY}`, structX, structY);
                sectorData.structures.push(gateway);
            } else if (this.seededRandom(structSeed + 3) < 0.04) { // 4% chance for Outpost
                const outpost = this.game.warpGateManager.addOutpost(`Frontier Hub ${sectorX}${sectorY}`, structX, structY);
                sectorData.structures.push(outpost);
            } else if (this.seededRandom(structSeed + 20) < 0.03) { // 3% chance for Wormhole
                const lifetime = 120000 + this.seededRandom(structSeed + 21) * 480000; // 2 to 10 minutes
                const wormhole = {
                    id: `wormhole_${sectorX}_${sectorY}_${Date.now()}`,
                    x: structX, y: structY,
                    targetX: (this.seededRandom(structSeed + 22) - 0.5) * 100000,
                    targetY: (this.seededRandom(structSeed + 23) - 0.5) * 100000,
                    expireTime: Date.now() + lifetime,
                    pulseRate: 1.0
                };
                if (!this.game.wormholes) this.game.wormholes = [];
                this.game.wormholes.push(wormhole);
                sectorData.wormholes = sectorData.wormholes || [];
                sectorData.wormholes.push(wormhole);
            } else if (this.seededRandom(structSeed + 30) < 0.02) { // 2% chance for Ancient Relic
                const relicType = ['nano_nanites', 'warp_core', 'relic_data'][Math.floor(this.seededRandom(structSeed + 31) * 3)];
                const relic = {
                    id: `relic_${sectorX}_${sectorY}_${Date.now()}`,
                    x: structX, y: structY,
                    type: relicType,
                    name: `ANCIENT ${relicType.toUpperCase()}`,
                    collected: false
                };
                if (!this.game.ancientRelics) this.game.ancientRelics = [];
                this.game.ancientRelics.push(relic);
                sectorData.relics = sectorData.relics || [];
                sectorData.relics.push(relic);
            }
        }

        // --- NEBULA HAZARDS (NUCLEAR FILTER: DISABLED) ---
        /*
        if (this.seededRandom(structSeed + 4) < 0.06) {
            sectorData.hazards.nebula = {
                id: `nebula_${sectorX}_${sectorY}`,
                x: minX + this.game.sectorSize * 0.5,
                y: minY + this.game.sectorSize * 0.5,
                radius: this.game.sectorSize * 0.45,
                type: this.seededRandom(structSeed + 5) < 0.5 ? 'toxic' : 'static',
                intensity: 0.2 + this.seededRandom(structSeed + 6) * 0.8
            };
        }
        */


        // --- PROCEDURAL HAZARDS ---
        const hazardSeed = seed + 1000000;
        const localDist = Math.hypot(sectorX * this.game.sectorSize, sectorY * this.game.sectorSize);
        
        // Hazard scaling via Sector Difficulty
        const hazardProbMult = 0.5 + difficultyScale * 0.5;

        // 1. Mines (abundant in high-diff zones)
        let mineProb = 0.05 * hazardProbMult;
        if (localDist >= 5000 || difficultyScale > 1.5) mineProb = 0.2 * hazardProbMult;
        if (this.seededRandom(hazardSeed) < mineProb) {
            const mCount = Math.floor(1 + this.seededRandom(hazardSeed + 1) * 5);
            for (let i = 0; i < mCount; i++) {
                const s = hazardSeed + 2 + i * 500;
                const mine = {
                    x: minX + this.seededRandom(s) * this.game.sectorSize,
                    y: minY + this.seededRandom(s + 1) * this.game.sectorSize,
                    radius: 45 + this.seededRandom(s + 2) * 20,
                    active: true,
                    pulseOffset: this.seededRandom(s + 3) * Math.PI * 2,
                    rotation: this.seededRandom(s + 4) * Math.PI * 2
                };
                this.game.spaceMines.push(mine); // Workspace uses spaceMines array
                sectorData.hazards.mines.push(mine);
            }
        }

        // 2. Turrets (protecting precious/exotic areas)
        let turretProb = 0.05;
        const dist = localDist || Math.hypot(sectorX * this.game.sectorSize, sectorY * this.game.sectorSize);
        if (dist >= 2500) turretProb = 0.15;
        if (this.seededRandom(hazardSeed + 100) < turretProb) {
            const turret = {
                x: minX + this.seededRandom(hazardSeed + 101) * this.game.sectorSize,
                y: minY + this.seededRandom(hazardSeed + 102) * this.game.sectorSize,
                rotation: this.seededRandom(hazardSeed + 103) * Math.PI * 2,
                turretAngle: 0,
                cooldown: 0,
                hp: 100,
                active: true,
                pulseOffset: this.seededRandom(hazardSeed + 104) * Math.PI * 2,
                recoil: 0
            };
            this.game.missileBases.push(turret); // Workspace uses missileBases array
            sectorData.hazards.turrets.push(turret);
        }

        // 3. Black Holes (Rare, mostly in the Deep Void)
        let bhProb = 0.01;
        if (dist >= 8000) bhProb = 0.05;
        if (this.seededRandom(hazardSeed + 200) < bhProb) {
            const bh = {
                x: minX + this.seededRandom(hazardSeed + 201) * this.game.sectorSize,
                y: minY + this.seededRandom(hazardSeed + 202) * this.game.sectorSize,
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

            this.game.hazardBlackHoles.push(bh); // Workspace uses hazardBlackHoles
            sectorData.hazards.blackHoles.push(bh);
        }

        const depositCount = Math.floor(3 + this.seededRandom(seed + 500000) * 5);
        for (let i = 0; i < depositCount; i++) {
            const s = seed + 500000 + i * 2000;
            const x = minX + this.seededRandom(s) * this.game.sectorSize;
            const y = minY + this.seededRandom(s + 1) * this.game.sectorSize;
            const dist = Math.hypot(x, y);

            let zone = 'industrial';
            if (dist >= 8000) zone = 'exotic';
            else if (dist >= 5000) zone = 'nuclear';
            else if (dist >= 2500) zone = 'crystal';
            else if (dist >= 1000) zone = 'precious';

            const richness = 0.3 + this.seededRandom(s + 2) * 0.7;
            const deposit = {
                x, y, zone,
                name: `${GALAXY_ZONES[zone]?.name || zone} Deposit`,
                richness,
                tier: Math.floor(richness * 3) + 1
            };

            this.game.resourceDeposits.push(deposit);
            sectorData.deposits.push(deposit);
        }

        // --- INFINITE ENTITIES (Phase 18) ---
        sectorData.stars = [];
        sectorData.planets = [];
        sectorData.nebulae = [];
        sectorData.galaxies = [];

        // 1. Local Sector Stars (Background)
        const starCount = Math.floor(20 + this.seededRandom(seed + 8) * 30);
        for (let i = 0; i < starCount; i++) {
            const s = seed + 8 + i * 100;
            const star = {
                id: `star_${sectorX}_${sectorY}_${i}`,
                x: minX + this.seededRandom(s) * this.game.sectorSize,
                y: minY + this.seededRandom(s + 1) * this.game.sectorSize,
                size: 1 + this.seededRandom(s + 2) * 4,
                color: '#ffffff',
                brightness: 0.5 + this.seededRandom(s + 3) * 0.5
            };
            this.game.stars.push(star);
            sectorData.stars.push(star);
        }

        // 2. Rare Sector Planets
        if (this.seededRandom(seed + 9) < 0.15) { // 15% chance per sector
            const pCount = Math.floor(1 + this.seededRandom(seed + 10) * 3);
            const planetTypes = ['gas-giant', 'ice-giant', 'terrestrial', 'desert', 'volcanic', 'ocean'];
            for (let i = 0; i < pCount; i++) {
                const s = seed + 11 + i * 1000;
                const type = planetTypes[Math.floor(this.seededRandom(s) * planetTypes.length)];
                const planet = {
                    name: `Planet ${sectorX}${sectorY}-${i}`,
                    type: type,
                    x: minX + this.seededRandom(s + 1) * this.game.sectorSize,
                    y: minY + this.seededRandom(s + 2) * this.game.sectorSize,
                    z: (this.seededRandom(s + 3) - 0.5) * 1000,
                    radius: 40 + this.seededRandom(s + 4) * 100,
                    color: '#fff', // Actual colors handled by planet logic
                    hasAtmosphere: this.seededRandom(s + 5) < 0.7
                };
                this.game.planets.push(planet);
                sectorData.planets.push(planet);
            }
        }

        // 3. Deep Space Anomalies (Phase 18 Legacy Feature)
        const distFromOrigin = Math.hypot(sectorX, sectorY);
        if (distFromOrigin > 10 && this.seededRandom(seed + 12) < 0.1) {
            // High-value anomaly cluster
            const anomaly = {
                x: minX + 0.5 * this.game.sectorSize,
                y: minY + 0.5 * this.game.sectorSize,
                type: 'ANOMALY',
                name: `VOID SIGNAL ${sectorX}-${sectorY}`,
                value: 50000 * Math.floor(distFromOrigin / 5)
            };
            this.game.resourceDeposits.push(anomaly);
            sectorData.deposits.push(anomaly);
        }

        // --- DYNAMIC CELESTIAL EVENTS (Phase 2) ---
        this.spawnCelestialEvent(sectorX, sectorY, seed, sectorData);

        this.game.loadedSectors.set(key, sectorData);
        console.log(`[Universe] Sector(${sectorX}, ${sectorY}): ${mineralCount} minerals, ${depositCount} deposits`);
    }

    spawnCelestialEvent(sx, sy, seed, sectorData) {
        const eventSeed = seed + 999;
        const r = this.seededRandom(eventSeed);
        const minX = sx * this.game.sectorSize;
        const minY = sy * this.game.sectorSize;
        
        let event = null;

        // 1. NEBULA STORM (NUCLEAR FILTER: DISABLED)
        /*
        if (r < 0.05) {
            event = {
                id: `storm_${sx}_${sy}`,
                type: 'storm',
                x: minX + this.game.sectorSize * 0.5,
                y: minY + this.game.sectorSize * 0.5,
                radius: this.game.sectorSize * 0.8,
                intensity: 0.5 + this.seededRandom(eventSeed + 1) * 1.5,
                color: this.seededRandom(eventSeed + 2) < 0.5 ? '#ff00ff' : '#00f3ff',
                startTime: Date.now(),
                duration: 60000 + this.seededRandom(eventSeed + 3) * 180000 // 1-4 mins
            };
        }
        */

        // 2. TRADE CONVOY (3% chance)
        else if (r < 0.08) {
            event = {
                id: `convoy_${sx}_${sy}`,
                type: 'convoy',
                x: minX + this.game.sectorSize * 0.2,
                y: minY + this.game.sectorSize * 0.2,
                targetX: minX + this.game.sectorSize * 0.8,
                targetY: minY + this.game.sectorSize * 0.8,
                cargoValue: 5000 + Math.floor(this.seededRandom(eventSeed + 4) * 25000),
                spawned: false // Will be handled by CapitalShipManager
            };
        }
        // 3. SUPERNOVA FLASH (0.5% chance)
        else if (r < 0.085) {
            event = {
                id: `supernova_${sx}_${sy}`,
                type: 'supernova',
                triggerTime: Date.now() + 5000 + this.seededRandom(eventSeed + 5) * 30000,
                duration: 4000,
                color: this.seededRandom(eventSeed + 6) < 0.5 ? '#ffffff' : '#4488ff'
            };
        }
        // 4. SINGULARITY GUARDIAN BOSS (Phase 7)
        // 1.5% chance in deep space (dist > 10,000)
        else if (r < 0.10 && Math.hypot(sx * this.game.sectorSize, sy * this.game.sectorSize) > 8000) {
            const bx = minX + this.game.sectorSize * (0.2 + this.seededRandom(eventSeed + 7) * 0.6);
            const by = minY + this.game.sectorSize * (0.2 + this.seededRandom(eventSeed + 8) * 0.6);
            
            // Register as a background event first
            event = {
                id: `boss_${sx}_${sy}`,
                type: 'boss_guardian',
                x: bx,
                y: by,
                spawned: false
            };
            
            // Immediate trigger if player is nearby or deferred to update universe
            if (this.game.bossManager) {
                this.game.bossManager.spawnBoss(bx, by);
                event.spawned = true;
            }
        }

        if (event) {
            this.game.activeEvents.push(event);
            sectorData.event = event;
        }
    }

    generateSingleStyle(style) {
        // Essential: Clear appropriate arrays before generating new style to prevent stacking
        switch (style) {
            case 'deep-space':
                this.game.backgroundStars = [];
                this.game.galaxies = [];
                this.game.blackHoles = [];
                this.game.planets = [];
                this.generateDeepSpaceStyle();
                break;
            case 'nebula':
                this.game.nebulae = [];
                this.generateNebulaStyle();
                break;
            case 'alien':
                this.game.spacecraft = [];
                this.generateAlienStyle();
                break;
            case 'cyber':
                this.game.matrixStreams = [];
                this.generateCyberStyle();
                break;
        }
    }


    generateResourceDeposits() {
        this.game.resourceDeposits = [];

        // TIER 1: Starting ring (30s-1min travel)
        // Distance: 2000-4000 units (expanded outward)
        // 12 clusters evenly distributed
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.2;
            const dist = 2000 + Math.random() * 2000;
            this.game.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 400,
                zone: 'industrial',
                radius: 70,
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
            const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.3;
            const dist = 5000 + Math.random() * 3000;
            const zone = Math.random() < 0.5 ? 'precious' : 'crystal';
            this.game.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 600,
                zone: zone,
                radius: 80,
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
            const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.4;
            const dist = 10000 + Math.random() * 5000;
            const zone = Math.random() < 0.5 ? 'nuclear' : 'crystal';
            this.game.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 800,
                zone: zone,
                radius: 90,
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
            const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
            const dist = 18000 + Math.random() * 7000;
            this.game.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 1000,
                zone: 'nuclear',
                radius: 100,
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
            const angle = (i / 4) * Math.PI * 2 + Math.random() * 0.6;
            const dist = 28000 + Math.random() * 10000;
            this.game.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 1500,
                zone: 'exotic',
                radius: 110,
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
            const angle = (i / 3) * Math.PI * 2 + Math.random() * 0.8;
            const dist = 42000 + Math.random() * 8000;
            this.game.resourceDeposits.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 2000,
                zone: 'exotic',
                radius: 120,
                richness: 8.0, // 8x rarity - INSANE!
                tier: 6,
                value: 'ultra-mythic',
                name: `Galaxy Core ${i + 1} `
            });
        }

        console.log(`[Universe] Generated ${this.game.resourceDeposits.length} gem clusters across 50,000 units`);
    }


    generateMissionBoard() {
        // Progressive mission board: show one from each available tier
        // Tier unlocking: Tier 1 always, Tier 2 after 2 missions, Tier 3 after 5, Tier 4 after 8
        const completed = this.game.missionsCompleted || 0;
        const templates = MISSION_TEMPLATES;

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

    generateSupernovaParticles(count) {
        const particles = [];
        const isMine = this.game.hazardEffect && this.game.hazardEffect.type === 'supernova';

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

    generateTunnelParticles(count) {
        const particles = [];
        const safeCount = isFinite(count) ? Math.min(Math.max(0, count), 1000) : 100;
        for (let i = 0; i < safeCount; i++) {
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






    generateStaticStars() {
        // CLEAR existing stars first so color changes take effect
        this.game.staticStars = [];

        // Use more stars for warp mode for a denser hyperspace field
        const count = this.game.bgWarpMode ? 600 : 400;

        // --- SPECTRAL MIXING (PHASE 19) ---
        // Pull colors from the Spectral Analyzer DOM or fallback to Sector Style
        const c1 = document.getElementById('starColor1')?.value || '#ffffff'; // PRIMARY (White/Blue)
        const c2 = document.getElementById('starColor2')?.value || '#00f3ff'; // SHIFT (Cyan/Blue)
        const c3 = document.getElementById('starColor3')?.value || '#bd00ff'; // VOID (Violet)
        
        // Influence chance: 30% for shift, 10% for void unless in specific sectors
        const influence = this.game.sectorManager?.getCurrentSectorData()?.visuals || 'standard';
        
        const activeColors = [c1, c2, c3];
        this.game.starColors = activeColors;

        // Generate stars across a much wider area using uniform distribution
        const w = this.game.canvas.width;
        const h = this.game.canvas.height;
        const centerX = w / 2;
        const centerY = h / 2;
        const spreadX = w * 20;
        const spreadY = h * 20;

        for (let i = 0; i < count; i++) {
            let x, y, vx = 0, vy = 0;

            if (this.game.bgWarpMode) {
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

                if (this.game.bgDriftMode) {
                    // Slow gentle drift in random direction
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 0.1 + Math.random() * 0.3;
                    vx = Math.cos(angle) * speed;
                    vy = Math.sin(angle) * speed;
                }
            }

            // Pre-calculate RGB for performance
            let r = 255, g = 255, b = 255;
            const starColor = activeColors[Math.floor(Math.random() * activeColors.length)];
            if (starColor.startsWith('#')) {
                const hex = starColor.slice(1);
                r = parseInt(hex.substr(0, 2), 16) || 255;
                g = parseInt(hex.substr(2, 2), 16) || 255;
                b = parseInt(hex.substr(4, 2), 16) || 255;
            }

            const depthLayer = 0.2 + Math.random() * 0.8;
            this.game.staticStars.push({
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                size: (Math.random() * 1.5 + 0.5) * depthLayer, // Farther = smaller
                alpha: Math.random() * 0.5 + 0.1,
                baseAlpha: Math.random() * 0.5 + 0.1,
                color: starColor,
                r: r, g: g, b: b,
                depth: depthLayer // Used for speed variation
            });

        }
    }


    generateDeepSpaceStyle() {
        const range = this.game.worldSize;
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
            this.game.backgroundStars.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                r: size,
                alpha: 0.15 + Math.random() * 0.5
            });
        }

        // 2. Galaxies (RESTORED)
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 3000 + Math.random() * 5000;
            this.game.galaxies.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 4000,
                size: 200 + Math.random() * 400,
                rotation: Math.random() * Math.PI * 2,
                color: Math.random() > 0.5 ? '#9300ff' : '#00f3ff'
            });
        }

        // 3. Black Holes (RESTORED - Visual Only)
        this.game.blackHoles.push({
            x: (Math.random() - 0.5) * 8000,
            y: (Math.random() - 0.5) * 8000,
            z: (Math.random() - 0.5) * 2000,
            size: 150 + Math.random() * 100
        });

        // 4. Nebulae (RESTORED)
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 2000 + Math.random() * 4000;
            this.game.nebulae.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 3000,
                size: 600 + Math.random() * 800,
                color: Math.random() > 0.5 ? '#ff00ff' : '#00ffff',
                opacity: 0.1 + Math.random() * 0.1
            });
        }

        // 5. Planets (RESTORED - Distant)
        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 4000 + Math.random() * 4000;
            this.game.planets.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 2000,
                size: 40 + Math.random() * 60,
                type: 'terrestrial'
            });
        }

        // 6. Shooting Stars (RESTORED)
        this.game.shootingStars = [];
    }

    generateNebulaStyle() {
        const zRange = 3000;

        // Nebulae (RESTORED)
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 1000 + Math.random() * 5000;
            this.game.nebulae.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 4000,
                size: 800 + Math.random() * 1200,
                color: i % 3 === 0 ? '#ff00aa' : (i % 3 === 1 ? '#00f3ff' : '#00ffaa'),
                opacity: 0.05 + Math.random() * 0.1
            });
        }

        // Background stars distributed across tiers (1000 total, +25%)
        const starCount = 1000;
        for (let i = 0; i < starCount; i++) {
            const tier = Math.random();
            let dist, size;
            if (tier < 0.2) {
                dist = Math.random() * 500;
                size = 0.5 + Math.random() * 1.0;
            } else if (tier < 0.5) {
                dist = 500 + Math.random() * 2000;
                size = 1.0 + Math.random() * 1.5;
            } else {
                dist = 2500 + Math.random() * 3500;
                size = 1.5 + Math.random() * 2.5;
            }
            const angle = Math.random() * Math.PI * 2;
            this.game.backgroundStars.push({
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
                dist = Math.random() * 500;
                size = 0.3 + Math.random() * 0.6;
            } else if (tier < 0.5) {
                dist = 500 + Math.random() * 2000;
                size = 0.5 + Math.random() * 0.8;
            } else {
                dist = 2500 + Math.random() * 3500;
                size = 0.7 + Math.random() * 1.2;
            }
            const angle = Math.random() * Math.PI * 2;
            this.game.backgroundStars.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                r: size,
                alpha: 0.1 + Math.random() * 0.4,
                color: Math.random() > 0.5 ? color1 : color2
            });
        }

        // Alien Artifacts (RESTORED)
        this.game.alienArtifacts = [];
        for (let i = 0; i < 6; i++) {
            this.game.alienArtifacts.push({
                x: (Math.random() - 0.5) * 6000,
                y: (Math.random() - 0.5) * 6000,
                z: (Math.random() - 0.5) * 2000,
                size: 40 + Math.random() * 60,
                rotation: Math.random() * Math.PI * 2,
                pulseSpeed: 0.001 + Math.random() * 0.002,
                color: color1
            });
        }

        // Alien Fleets (RESTORED)
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 500 + Math.random() * 4000;
            this.game.spacecraft.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() - 0.5) * 2000,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: 15 + Math.random() * 15,
                color: theme < 0.5 ? '#00ff00' : '#aa00ff',
                type: Math.random() > 0.7 ? 'organic' : 'scout'
            });
        }
    }



    generateCyberStyle() {
        // Reset custom color flag so new generation allows random themes again
        this.game.matrixColorCustomized = false;

        // Matrix Rain Setup (Screen Space)
        this.game.matrixStreams = [];
        const fontSize = 14;
        const columns = Math.ceil(this.game.canvas.width / fontSize);

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
        const lastFamily = this.game.lastMatrixFamily || '';

        let availableThemes = themes.filter(t => !this.game.themeHistory.includes(t.name));

        // Try to filter by family too, but ensure we don't empty the pool
        const familyFiltered = availableThemes.filter(t => t.family !== lastFamily);
        if (familyFiltered.length > 0) {
            availableThemes = familyFiltered;
        }

        // Fallback: If we ran out of themes (unlikely), just avoid the very last one
        let pool = availableThemes;
        if (pool.length === 0) {
            const lastTheme = this.game.themeHistory[this.game.themeHistory.length - 1];
            pool = themes.filter(t => t.name !== lastTheme);
        }

        const themeIndex = Math.floor(Math.random() * pool.length);
        const theme = pool[themeIndex];

        // Update History
        this.game.themeHistory.push(theme.name);
        if (this.game.themeHistory.length > 5) {
            this.game.themeHistory.shift(); // Keep only last 5
        }
        this.game.lastMatrixFamily = theme.family; // Track family

        // Persist to LocalStorage
        try {
            localStorage.setItem('matrixThemeHistory', JSON.stringify(this.game.themeHistory));
            localStorage.setItem('matrixLastFamily', this.game.lastMatrixFamily);
        } catch (e) {
            console.warn('LocalStorage failed', e);
        }

        console.log(`[Matrix] Selected: ${theme.name} (${theme.family}), History: ${JSON.stringify(this.game.themeHistory)}, Pool Size: ${pool.length} `);

        this.game.matrixTheme = theme;

        // Discrete Speed Levels: Crawl, Slow, Normal, Fast, Hyper, Ludicrous
        const speedLevels = [
            { name: 'Crawl', value: 0.2 },
            { name: 'Slow', value: 0.5 },
            { name: 'Normal', value: 1.0 },
            { name: 'Fast', value: 2.0 },
            { name: 'Hyper', value: 4.0 },
            { name: 'Ludicrous', value: 8.0 }
        ];
        const selectedSpeed = speedLevels[Math.floor(Math.random() * speedLevels.length)];
        this.game.matrixSpeedMultiplier = selectedSpeed.value;

        this.game.hudManager.showToast(`Cyber Theme: ${theme.name} (Speed: ${selectedSpeed.name}) [v14]`);

        // Update UI Display
        const displayEl = document.getElementById('matrixThemeDisplay');
        if (displayEl) {
            displayEl.innerText = `Theme: ${theme.name} | Family: ${theme.family.charAt(0).toUpperCase() + theme.family.slice(1)} `;
        }

        // Sync speed slider with current value
        const slider = document.getElementById('matrixSpeedSlider');
        const sliderValue = document.getElementById('matrixSpeedValue');
        if (slider) slider.value = this.game.matrixSpeedMultiplier;
        if (sliderValue) sliderValue.textContent = this.game.matrixSpeedMultiplier.toFixed(1) + 'x';

        for (let i = 0; i < columns; i++) {
            const depth = Math.random(); // 0 to 1
            const size = Math.floor(10 + depth * 14); // 10px to 24px
            // Apply speed multiplier with per-stream variance
            const speed = (2 + depth * 8 + Math.random() * 2) * this.game.matrixSpeedMultiplier;

            // Optimized buffer size: 100 characters is plenty for smooth cycling
            const len = 100 + Math.floor(Math.random() * 100);
            const chars = [];
            for (let j = 0; j < len; j++) {
                chars.push(String.fromCharCode(0x30A0 + Math.random() * 96));
            }

            // Handle Rainbow Theme
            let streamColor = theme.color;
            if (this.game.matrixColorCustomized) {
                streamColor = this.game.matrixColor;
            } else if (theme.name === 'Rainbow Surge') {
                // Calculate hue based on column index (i) to cycle through the spectrum
                const hue = (i * 360 / columns) % 360;
                streamColor = `hsl(${hue}, 100 %, 50 %)`; // Full saturation, mid lightness
            }

            this.game.matrixStreams.push({
                x: i * fontSize, // Fixed columns
                y: Math.random() * this.game.canvas.height, // Start FULLY VISIBLE across entire screen
                size: fontSize,
                baseSpeed: (2 + depth * 8 + Math.random() * 2) * (Math.random() * 0.5 + 0.75), // Vary speed
                chars: chars,
                color: streamColor,
                opacity: 0.9
            });
        }

        console.log(`[Matrix] Generated ${this.game.matrixStreams.length} streams, columns: ${columns}, theme: ${theme.name} `);

        // Cyber Nodes (RESTORED)
        this.game.cyberNodes = [];
        for (let i = 0; i < 20; i++) {
            this.game.cyberNodes.push({
                x: Math.random() * this.game.canvas.width,
                y: Math.random() * this.game.canvas.height,
                z: Math.random() * 2000,
                size: 8 + Math.random() * 12,
                color: theme.color === 'rainbow' ? '#00f3ff' : theme.color,
                connections: [],
                pulse: Math.random() * Math.PI * 2
            });
        }
        // Create random links between nodes
        for (let i = 0; i < 15; i++) {
            const n1 = Math.floor(Math.random() * this.game.cyberNodes.length);
            const n2 = Math.floor(Math.random() * this.game.cyberNodes.length);
            if (n1 !== n2 && !this.game.cyberNodes[n1].connections.includes(n2)) {
                this.game.cyberNodes[n1].connections.push(n2);
            }
        }
    }

}

window.ProceduralManager = ProceduralManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.ProceduralManager = ProceduralManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProceduralManager;
}
