class ProceduralManager {
    constructor(game) {
        this.game = game;
    }

    generateStaticBackground() {
        const bgStars = [];
        const count = 300; // number of background stars
        for (let i = 0; i < count; i++) {
            bgStars.push({
                x: Math.random() * this.game.canvas.width,
                y: Math.random() * this.game.canvas.height,
                size: Math.random() * 0.5 + 0.1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
        return bgStars;
    }


    generateSector(sectorX, sectorY) {
        const key = `${sectorX},${sectorY} `;
        if (this.game.loadedSectors.has(key)) return;

        console.log(`[Universe] Generating sector(${sectorX}, ${sectorY})`);

        const seed = this.game.getSectorSeed(sectorX, sectorY);
        const sectorData = { x: sectorX, y: sectorY, minerals: [], deposits: [] };

        const minX = sectorX * this.game.sectorSize;
        const maxX = (sectorX + 1) * this.game.sectorSize;
        const minY = sectorY * this.game.sectorSize;
        const maxY = (sectorY + 1) * this.game.sectorSize;

        const mineralCount = Math.floor(100 + this.game.seededRandom(seed + 1) * 200);
        for (let i = 0; i < mineralCount; i++) {
            const s = seed + i * 1000;
            const x = minX + this.game.seededRandom(s) * this.game.sectorSize;
            const y = minY + this.game.seededRandom(s + 1) * this.game.sectorSize;
            const dist = Math.hypot(x, y);

            let type = 'iron';
            const r = this.game.seededRandom(s + 2);
            if (dist < 1000) type = ['iron', 'copper', 'coal', 'titanium', 'silicon'][Math.floor(r * 5)];
            else if (dist < 3000) type = ['silver', 'gold', 'platinum', 'palladium'][Math.floor(r * 4)];
            else if (dist < 6000) type = ['quartz', 'diamond', 'emerald', 'ruby', 'sapphire'][Math.floor(r * 5)];
            else if (dist < 10000) type = ['uranium', 'plutonium', 'helium3'][Math.floor(r * 3)];
            else type = ['neodymium', 'lanthanum', 'darkmatter', 'antimatter'][Math.floor(r * 4)];

            const info = MINERAL_TYPES[type];
            if (!info) continue;

            const mineral = { x, y, type, color: info.color, size: info.size, value: info.value };
            this.game.minerals.push(mineral);
            sectorData.minerals.push(mineral);
        }

        // --- PROCEDURAL HAZARDS ---
        sectorData.hazards = { mines: [], turrets: [], blackHoles: [] };
        const hazardSeed = seed + 1000000;
        const dist = Math.hypot(sectorX * this.game.sectorSize, sectorY * this.game.sectorSize);

        // 1. Mines (abundant in Nuclear zones)
        let mineProb = 0.1;
        if (dist >= 5000) mineProb = 0.4;
        if (this.game.seededRandom(hazardSeed) < mineProb) {
            const mCount = Math.floor(1 + this.game.seededRandom(hazardSeed + 1) * 5);
            for (let i = 0; i < mCount; i++) {
                const s = hazardSeed + 2 + i * 500;
                const mine = {
                    x: minX + this.game.seededRandom(s) * this.game.sectorSize,
                    y: minY + this.game.seededRandom(s + 1) * this.game.sectorSize,
                    radius: 45 + this.game.seededRandom(s + 2) * 20,
                    active: true,
                    pulseOffset: this.game.seededRandom(s + 3) * Math.PI * 2,
                    rotation: this.game.seededRandom(s + 4) * Math.PI * 2
                };
                this.game.spaceMines.push(mine); // Workspace uses spaceMines array
                sectorData.hazards.mines.push(mine);
            }
        }

        // 2. Turrets (protecting precious/exotic areas)
        let turretProb = 0.05;
        if (dist >= 2500) turretProb = 0.15;
        if (this.game.seededRandom(hazardSeed + 100) < turretProb) {
            const turret = {
                x: minX + this.game.seededRandom(hazardSeed + 101) * this.game.sectorSize,
                y: minY + this.game.seededRandom(hazardSeed + 102) * this.game.sectorSize,
                rotation: this.game.seededRandom(hazardSeed + 103) * Math.PI * 2,
                turretAngle: 0,
                cooldown: 0,
                hp: 100,
                active: true,
                pulseOffset: this.game.seededRandom(hazardSeed + 104) * Math.PI * 2,
                recoil: 0
            };
            this.game.missileBases.push(turret); // Workspace uses missileBases array
            sectorData.hazards.turrets.push(turret);
        }

        // 3. Black Holes (Rare, mostly in the Deep Void)
        let bhProb = 0.01;
        if (dist >= 8000) bhProb = 0.05;
        if (this.game.seededRandom(hazardSeed + 200) < bhProb) {
            const bh = {
                x: minX + this.game.seededRandom(hazardSeed + 201) * this.game.sectorSize,
                y: minY + this.game.seededRandom(hazardSeed + 202) * this.game.sectorSize,
                size: 80 + this.game.seededRandom(hazardSeed + 203) * 100,
                active: true,
                pulseOffset: this.game.seededRandom(hazardSeed + 204) * Math.PI * 2,
                particleRings: []
            };

            // Initialize particles for the accretion disk
            for (let i = 0; i < 30; i++) {
                bh.particleRings.push({
                    angle: this.game.seededRandom(hazardSeed + 300 + i) * Math.PI * 2,
                    radius: 1.2 + this.game.seededRandom(hazardSeed + 400 + i) * 0.8,
                    size: 1 + this.game.seededRandom(hazardSeed + 500 + i) * 2,
                    speed: 0.005 + this.game.seededRandom(hazardSeed + 600 + i) * 0.01,
                    hue: 200 + this.game.seededRandom(hazardSeed + 700 + i) * 60,
                    brightness: 0.5 + this.game.seededRandom(hazardSeed + 800 + i) * 0.5
                });
            }

            this.game.hazardBlackHoles.push(bh); // Workspace uses hazardBlackHoles
            sectorData.hazards.blackHoles.push(bh);
        }

        const depositCount = Math.floor(3 + this.game.seededRandom(seed + 500000) * 5);
        for (let i = 0; i < depositCount; i++) {
            const s = seed + 500000 + i * 2000;
            const x = minX + this.game.seededRandom(s) * this.game.sectorSize;
            const y = minY + this.game.seededRandom(s + 1) * this.game.sectorSize;
            const dist = Math.hypot(x, y);

            let zone = 'industrial';
            if (dist >= 8000) zone = 'exotic';
            else if (dist >= 5000) zone = 'nuclear';
            else if (dist >= 2500) zone = 'crystal';
            else if (dist >= 1000) zone = 'precious';

            const richness = 0.3 + this.game.seededRandom(s + 2) * 0.7;
            const deposit = {
                x, y, zone,
                name: `${GALAXY_ZONES[zone]?.name || zone} Deposit`,
                richness,
                tier: Math.floor(richness * 3) + 1
            };

            this.game.resourceDeposits.push(deposit);
            sectorData.deposits.push(deposit);
        }

        this.game.loadedSectors.set(key, sectorData);
        console.log(`[Universe] Sector(${sectorX}, ${sectorY}): ${mineralCount} minerals, ${depositCount} deposits`);
    }

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
            const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.3;
            const dist = 5000 + Math.random() * 3000;
            const zone = Math.random() < 0.5 ? 'precious' : 'crystal';
            this.game.resourceDeposits.push({
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
            const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.4;
            const dist = 10000 + Math.random() * 5000;
            const zone = Math.random() < 0.5 ? 'nuclear' : 'crystal';
            this.game.resourceDeposits.push({
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
            const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
            const dist = 18000 + Math.random() * 7000;
            this.game.resourceDeposits.push({
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
            const angle = (i / 4) * Math.PI * 2 + Math.random() * 0.6;
            const dist = 28000 + Math.random() * 10000;
            this.game.resourceDeposits.push({
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
            const angle = (i / 3) * Math.PI * 2 + Math.random() * 0.8;
            const dist = 42000 + Math.random() * 8000;
            this.game.resourceDeposits.push({
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


    generateBackground() {
        try {
            // Allow empty activeStyles for minimal black background with just faint stars
            this.game.config.showBackground = true;
            this.game.staticStars = [];
            this.game.galaxies = [];
            this.game.blackHoles = [];
            this.game.shootingStars = [];
            this.game.backgroundStars = [];
            this.game.nebulae = [];
            this.game.spacecraft = [];
            this.game.matrixStreams = [];

            // Load ship settings
            // Load ship settings
            const savedColor = localStorage.getItem('playerShipColor'); // Consistent Key
            if (savedColor) {
                this.game.playerShip.color = savedColor;
                // Also update the color picker UI to match
                const shipColorPicker = document.getElementById('shipColorPicker');
                if (shipColorPicker) shipColorPicker.value = savedColor;
            }

            // Load saved 3D rotation
            const savedRotation = localStorage.getItem('shipRotation');
            if (savedRotation) {
                try {
                    const rot = JSON.parse(savedRotation);
                    this.game.playerShip.rotation = rot.yaw || 0;
                    this.game.playerShip.pitch = rot.pitch || 0;
                    this.game.playerShip.roll = rot.roll || 0;

                    // Sync sliders
                    const yawDeg = Math.round(this.game.playerShip.rotation * 180 / Math.PI);
                    const pitchDeg = Math.round(this.game.playerShip.pitch * 180 / Math.PI);
                    const rollDeg = Math.round(this.game.playerShip.roll * 180 / Math.PI);

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
            const type = this.game.playerShip.type || 'interceptor';
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
                this.game.playerShip.maxSpeed = baseStats.maxSpeed;
                this.game.playerShip.acceleration = baseStats.acceleration;
            }

            const savedStruct = localStorage.getItem('customShipStructure');
            if (savedStruct) {
                try {
                    this.game.playerShip.customStructure = JSON.parse(savedStruct);
                } catch (e) { console.error("Failed to load ship struct", e); }
            }

            // Load saved type
            const savedType = localStorage.getItem('playerShipType');
            if (savedType) this.game.playerShip.type = savedType;

            // State handling for Cyber theme history
            try {
                const savedHistory = localStorage.getItem('matrixThemeHistory');
                this.game.themeHistory = savedHistory ? JSON.parse(savedHistory) : [];
                this.game.lastMatrixFamily = localStorage.getItem('matrixLastFamily') || '';
            } catch (e) {
                console.warn('[BG] Theme history load failed:', e);
                this.game.themeHistory = [];
                this.game.lastMatrixFamily = '';
            }

            // 1. Static Stars (Mixed Palette)
            try {
                this.generateStaticStars();
            } catch (e) {
                console.error('[BG Error] generateStaticStars failed:', e);
                this.game.staticStars = [];
            }

            // 2. Compose Layers based on active styles
            // Order matters for layering (Deep Space -> Nebula -> Alien -> Cyber)
            if (this.game.activeStyles.has('deep-space')) {
                try {
                    this.generateDeepSpaceStyle();
                } catch (e) {
                    console.error('[BG Error] generateDeepSpaceStyle failed:', e);
                }
            }
            if (this.game.activeStyles.has('nebula')) {
                try {
                    this.generateNebulaStyle();
                } catch (e) {
                    console.error('[BG Error] generateNebulaStyle failed:', e);
                }
            }
            if (this.game.activeStyles.has('alien')) {
                try {
                    this.generateAlienStyle();
                } catch (e) {
                    console.error('[BG Error] generateAlienStyle failed:', e);
                }
            }
            if (this.game.activeStyles.has('cyber')) {
                try {
                    this.generateCyberStyle();
                } catch (e) {
                    console.error('[BG Error] generateCyberStyle failed:', e);
                }
            }
        } catch (e) {
            console.error('[BG Error] generateBackground failed critically:', e);
            this.game.hudManager.showToast('Background generation failed - using minimal mode');
            // Ensure arrays exist to prevent cascade failures
            this.game.staticStars = this.game.staticStars || [];
            this.game.galaxies = this.game.galaxies || [];
            this.game.blackHoles = this.game.blackHoles || [];
            this.game.shootingStars = this.game.shootingStars || [];
            this.game.backgroundStars = this.game.backgroundStars || [];
            this.game.nebulae = this.game.nebulae || [];
            this.game.spacecraft = this.game.spacecraft || [];
            this.game.matrixStreams = this.game.matrixStreams || [];
        }
    }
    generateStaticStars() {
        // CLEAR existing stars first
        this.game.staticStars = [];
        const count = this.game.bgWarpMode ? 600 : 400;

        const w = this.game.canvas.width;
        const h = this.game.canvas.height;
        const centerX = w / 2;
        const centerY = h / 2;
        const spreadX = w * 2.0; 
        const spreadY = h * 2.0;

        for (let i = 0; i < count; i++) {
            const depthLayer = 0.2 + Math.random() * 0.8;
            this.game.staticStars.push({
                x: Math.random() * spreadX,
                y: Math.random() * spreadY,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: (Math.random() * 1.5 + 0.5) * depthLayer,
                alpha: Math.random() * 0.5 + 0.1,
                color: '#ffffff',
                depth: depthLayer
            });
        }
    }


    generateDeepSpaceStyle() {
        const zRange = 4000;

        // 1. Background Stars - distributed across all tiers
        const starCount = 600;
        for (let i = 0; i < starCount; i++) {
            const tier = Math.random();
            let dist, size;
            if (tier < 0.2) { dist = Math.random() * 400; size = 0.5 + Math.random() * 1.0; }
            else if (tier < 0.5) { dist = 400 + Math.random() * 1600; size = 1.0 + Math.random() * 1.5; }
            else { dist = 2000 + Math.random() * 4000; size = 1.5 + Math.random() * 2.0; }
            
            const angle = Math.random() * Math.PI * 2;
            this.game.backgroundStars.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: (Math.random() * zRange) - zRange / 2,
                r: size,
                alpha: 0.15 + Math.random() * 0.5
            });
        }

        // 2. Galaxies (8 total - v18 standard)
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

        // 3. Black Holes
        this.game.blackHoles.push({
            x: (Math.random() - 0.5) * 8000,
            y: (Math.random() - 0.5) * 8000,
            z: (Math.random() - 0.5) * 2000,
            size: 150 + Math.random() * 100
        });

        // 4. Nebulae
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
        // 4. Nebulae - distributed across tiers
        const nebulaConfigs = [
            { count: 4, minDist: 50, maxDist: 500, minSize: 150, maxSize: 350 },
            { count: 6, minDist: 500, maxDist: 2500, minSize: 350, maxSize: 700 },
            { count: 8, minDist: 2500, maxDist: 6000, minSize: 600, maxSize: 1200 }
        ];
        nebulaConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                const dist = cfg.minDist + Math.random() * (cfg.maxDist - cfg.minDist);
                const angle = Math.random() * Math.PI * 2;
                this.game.nebulae.push({
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    z: (Math.random() * zRange) - zRange / 2,
                    size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize),
                    color: ['#4400cc', '#0033aa', '#cc0066', '#330066', '#003366', '#660033'][Math.floor(Math.random() * 6)],
                    alpha: 0.15 + Math.random() * 0.3
                });
            }
        });

        // 5. Planets
        this.game.planets = [];
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

            r = Math.min(255, Math.max(0, r + (Math.random() - 0.5) * amount * 2));
            g = Math.min(255, Math.max(0, g + (Math.random() - 0.5) * amount * 2));
            b = Math.min(255, Math.max(0, b + (Math.random() - 0.5) * amount * 2));

            return `#${(r | 0).toString(16).padStart(2, '0')}${(g | 0).toString(16).padStart(2, '0')}${(b | 0).toString(16).padStart(2, '0')} `;
        };

        // Helper to check if a new planet overlaps with existing ones
        const checkPlanetSpacing = (x, y, z, radius) => {
            const minSpacing = 800; // Increased spacing for "X, Y" separation (Visual Clutter reduction)
            const minZSpacing = 1000; // Z-axis separation

            for (const existing of this.game.planets) {
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

            for (let i = 0; i < cfg.count; i++) {
                const type = planetTypes[Math.floor(Math.random() * planetTypes.length)];
                const hasRings = Math.random() > 0.5;
                const radius = cfg.minRadius + Math.random() * (cfg.maxRadius - cfg.minRadius);

                // Try to find a non-overlapping position (max 50 attempts)
                let x, y, z, attempts = 0;
                do {
                    const dist = cfg.minDist + Math.random() * (cfg.maxDist - cfg.minDist);
                    const angle = Math.random() * Math.PI * 2;
                    x = Math.cos(angle) * dist;
                    y = Math.sin(angle) * dist;
                    // Assign z-depth based on tier for visual depth separation
                    z = zTier.minZ + Math.random() * (zTier.maxZ - zTier.minZ);
                    attempts++;
                } while (!checkPlanetSpacing(x, y, z, radius) && attempts < 50);

                this.game.planets.push({
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
        this.game.shootingStars = [];
        const shootingStarCount = 15;
        for (let i = 0; i < shootingStarCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 500 + Math.random() * 5000;
            this.game.shootingStars.push({
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

        // Nebulae distributed across zoom tiers (30 total, +50%)
        const nebulaConfigs = [
            { count: 6, minDist: 50, maxDist: 500, minSize: 100, maxSize: 300 },    // Close
            { count: 10, minDist: 500, maxDist: 2500, minSize: 300, maxSize: 800 }, // Medium
            { count: 14, minDist: 2500, maxDist: 6000, minSize: 700, maxSize: 1500 } // Far
        ];
        const colors = ['#ff0055', '#ffaa00', '#00ffaa', '#0055ff', '#ff00ff', '#00ffff', '#ff5500', '#55ff00'];

        nebulaConfigs.forEach(cfg => {
            for (let i = 0; i < cfg.count; i++) {
                const dist = cfg.minDist + Math.random() * (cfg.maxDist - cfg.minDist);
                const angle = Math.random() * Math.PI * 2;
                this.game.nebulae.push({
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    z: (Math.random() * zRange) - zRange / 2,
                    size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 0.25 + Math.random() * 0.35
                });
            }
        });

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

        // Alien Spacecraft Fleet - distributed across zoom tiers (30 total, +50%)
        const shipClasses = [
            { name: 'saucer', baseSize: 50, complexity: 'high', weight: 4 },
            { name: 'star-dreadnought', baseSize: 150, complexity: 'ultra', weight: 1 },
            { name: 'quantum-scout', baseSize: 35, complexity: 'high', weight: 3 },
            { name: 'void-fighter', baseSize: 30, complexity: 'medium', weight: 4 },
            { name: 'nebula-cruiser', baseSize: 100, complexity: 'high', weight: 2 },
            { name: 'monolith', baseSize: 200, complexity: 'ultra', weight: 1 },
            { name: 'spire-fortress', baseSize: 120, complexity: 'ultra', weight: 1 },
            { name: 'swarm-cluster', baseSize: 40, complexity: 'medium', weight: 3 },
            { name: 'crystal-cutter', baseSize: 60, complexity: 'high', weight: 2 },
            { name: 'cyber-sentry', baseSize: 35, complexity: 'high', weight: 3 },
            { name: 'death-sphere', baseSize: 180, complexity: 'ultra', weight: 1 }
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
                const isSaucer = shipClass.name === 'saucer';
                const dist = cfg.minDist + Math.random() * (cfg.maxDist - cfg.minDist);
                const angle = Math.random() * Math.PI * 2;

                this.game.spacecraft.push({
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
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
                    shieldPhase: Math.random() * Math.PI * 2
                });
            }
        });
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

            // Massive Trails: 600 to 1500 characters (3x longer)
            const len = 600 + Math.floor(Math.random() * 9000);
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
                streamColor = `hsl(${hue}, 100%, 50%)`; // Full saturation, mid lightness
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
    }

}
window.ProceduralManager = ProceduralManager;
