// SUPER DEFENSIVE ATOMIC REGISTRATION (PHASE 25 MAJESTIC)
(function() {
    var ProceduralManager = class {
        constructor(game) {
            this.game = game;
            this.lastUpdateX = -999999;
            this.lastUpdateY = -999999;
            this.lastUpdateSector = "";
            console.log('[Procedural] Manager Instantiated (Legacy Sync Mode)');
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

        generateSingleStyle(style) {
            console.log(`[Procedural] Generating Background Style: ${style}`);
            if (style === 'deep-space') return this.generateDeepSpaceStyle();
            if (style.startsWith('nebula')) return this.generateNebulaStyle();
            if (style === 'alien') return this.generateAlienStyle();
            if (style === 'cyber') return this.generateCyberStyle();
            return [];
        }

        generateDeepSpaceStyle() {
            if (!this.game) return [];
            
            // Clear existing Deep Space artifacts
            if (this.game.backgroundStars) {
                this.game.backgroundStars = this.game.backgroundStars.filter(s => s.style !== 'deep-space');
            } else {
                this.game.backgroundStars = [];
            }
            this.game.galaxies = [];
            this.game.blackHoles = [];
            const zRange = 3000;
            const starCount = 800;
            for (let i = 0; i < starCount; i++) {
                const tier = Math.random();
                let dist, size;
                if (tier < 0.2) { dist = Math.random() * 400; size = 0.5 + Math.random() * 1.0; }
                else if (tier < 0.5) { dist = 400 + Math.random() * 1600; size = 1.0 + Math.random() * 1.5; }
                else { dist = 2000 + Math.random() * 6000; size = 1.5 + Math.random() * 2.0; }
                const angle = Math.random() * Math.PI * 2;
                this.game.backgroundStars.push({
                    style: 'deep-space',
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    z: (Math.random() * zRange) - zRange / 2,
                    r: size,
                    alpha: 0.15 + Math.random() * 0.5
                });
            }

            for (let i = 0; i < 12; i++) {
                this.game.galaxies.push({
                    x: (Math.random() - 0.5) * 20000,
                    y: (Math.random() - 0.5) * 20000,
                    z: 4000 + Math.random() * 6000,
                    size: 300 + Math.random() * 800,
                    rotation: Math.random() * Math.PI * 2,
                    color: `hsl(${Math.random() * 360}, 80%, 70%)`,
                    type: Math.random() > 0.5 ? 'spiral' : 'elliptical',
                    density: 0.5 + Math.random() * 0.5
                });
            }

            for (let i = 0; i < 4; i++) {
                this.game.blackHoles.push({
                    x: (Math.random() - 0.5) * 15000,
                    y: (Math.random() - 0.5) * 15000,
                    z: 3000 + Math.random() * 3000,
                    size: 180 + Math.random() * 250,
                    swirl: Math.random() * 0.5 + 0.5,
                    energy: Math.random()
                });
            }

            return this.game.backgroundStars;
        }

        generateNebulaStyle() {
            if (!this.game) return [];
            if (this.game.backgroundStars) {
                this.game.backgroundStars = this.game.backgroundStars.filter(s => s.style !== 'nebula');
            } else {
                this.game.backgroundStars = [];
            }
            this.game.nebulae = [];
            const zRange = 3000;
            const starCount = 1200;
            for (let i = 0; i < starCount; i++) {
                const tier = Math.random();
                let dist, size;
                if (tier < 0.2) { dist = Math.random() * 500; size = 0.5 + Math.random() * 1.0; }
                else if (tier < 0.5) { dist = 500 + Math.random() * 2000; size = 1.0 + Math.random() * 1.5; }
                else { dist = 2500 + Math.random() * 5000; size = 1.5 + Math.random() * 2.5; }
                const angle = Math.random() * Math.PI * 2;
                this.game.backgroundStars.push({
                    style: 'nebula',
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    z: (Math.random() * zRange) - zRange / 2,
                    r: size,
                    alpha: 0.2 + Math.random() * 0.5
                });
            }

            const nebulaColors = ['#aa00ff', '#00aaff', '#ff00aa', '#00ffaa', '#ffaa00'];
            for (let i = 0; i < 25; i++) {
                const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
                this.game.nebulae.push({
                    x: (Math.random() - 0.5) * 18000,
                    y: (Math.random() - 0.5) * 18000,
                    z: 1000 + Math.random() * 4000,
                    r: 1000 + Math.random() * 2000,
                    color: color,
                    swirl: Math.random() * Math.PI * 2,
                    density: 0.3 + Math.random() * 0.7,
                    pulseSpeed: 0.0005 + Math.random() * 0.001
                });
            }
            return this.game.backgroundStars;
        }

        generateAlienStyle() {
            if (!this.game) return [];
            if (this.game.backgroundStars) {
                this.game.backgroundStars = this.game.backgroundStars.filter(s => s.style !== 'alien');
            } else {
                this.game.backgroundStars = [];
            }
            this.game.spacecraft = [];
            this.game.alienArtifacts = [];
            const zRange = 3000;
            const theme = Math.random();
            let color1, color2;
            if (theme < 0.33) { color1 = '#00ff00'; color2 = '#ccff00'; }
            else if (theme < 0.66) { color1 = '#aa00ff'; color2 = '#ff00aa'; }
            else { color1 = '#00ffff'; color2 = '#0000ff'; }

            const starCount = 2000;
            for (let i = 0; i < starCount; i++) {
                const tier = Math.random();
                let dist, size;
                if (tier < 0.2) { dist = Math.random() * 500; size = 0.3 + Math.random() * 0.6; }
                else if (tier < 0.5) { dist = 500 + Math.random() * 2500; size = 0.5 + Math.random() * 0.8; }
                else { dist = 3000 + Math.random() * 5000; size = 0.7 + Math.random() * 1.2; }
                const angle = Math.random() * Math.PI * 2;
                this.game.backgroundStars.push({
                    style: 'alien',
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    z: (Math.random() * zRange) - zRange / 2,
                    r: size,
                    alpha: 0.1 + Math.random() * 0.4,
                    color: Math.random() > 0.5 ? color1 : color2,
                    isDiamond: Math.random() < 0.2
                });
            }

            for (let i = 0; i < 35; i++) {
                this.game.spacecraft.push({
                    x: (Math.random() - 0.5) * 20000,
                    y: (Math.random() - 0.5) * 20000,
                    z: 2000 + Math.random() * 5000,
                    size: 10 + Math.random() * 30,
                    color: color1,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    type: Math.random() > 0.5 ? 'organic' : 'scout'
                });
            }

            for (let i = 0; i < 15; i++) {
                this.game.alienArtifacts.push({
                    x: (Math.random() - 0.5) * 15000,
                    y: (Math.random() - 0.5) * 15000,
                    z: 1000 + Math.random() * 3000,
                    size: 40 + Math.random() * 100,
                    color: color2,
                    rotation: Math.random() * Math.PI * 2,
                    pulse: Math.random() * Math.PI * 2
                });
            }
            return this.game.backgroundStars;
        }

        generateCyberStyle() {
            if (!this.game) return [];
            this.game.matrixStreams = [];
            this.game.cyberNodes = [];
            const fontSize = 16;
            const columns = Math.ceil((this.game.canvas ? this.game.canvas.width : 1600) / fontSize);
            const themes = [
                { name: 'System Green', color: '#00ff41', family: 'green' },
                { name: 'System Yellow', color: '#FFFF00', family: 'yellow' },
                { name: 'Neon Pink', color: '#FF1493', family: 'pink' },
                { name: 'Cyan Future', color: '#00FFFF', family: 'blue' }
            ];
            const theme = themes[Math.floor(Math.random() * themes.length)];
            this.game.matrixTheme = theme;

            for (let i = 0; i < columns; i++) {
                const depth = 0.1 + Math.random() * 0.9;
                const len = 400 + Math.floor(Math.random() * 1200);
                const chars = [];
                for (let j = 0; j < len; j++) chars.push(String.fromCharCode(0x30A0 + Math.random() * 96));

                this.game.matrixStreams.push({
                    x: i * fontSize,
                    y: Math.random() * (this.game.canvas ? this.game.canvas.height : 900),
                    z: depth * 5000,
                    size: fontSize * (0.5 + depth * 0.5),
                    baseSpeed: (1 + depth * 10),
                    chars: chars,
                    color: theme.color,
                    opacity: 0.3 + depth * 0.6
                });
            }

            for (let i = 0; i < 20; i++) {
                this.game.cyberNodes.push({
                    x: (Math.random() - 0.5) * 12000,
                    y: (Math.random() - 0.5) * 12000,
                    z: 500 + Math.random() * 4000,
                    size: 50 + Math.random() * 150,
                    connections: [Math.floor(Math.random() * 20)],
                    pulse: Math.random() * Math.PI * 2,
                    color: theme.color
                });
            }
            return this.game.matrixStreams;
        }

        generateStaticStars() {
            if (!this.game) return;
            this.game.staticStars = [];
            const count = this.game.bgWarpMode ? 600 : 400;
            const c1 = document.getElementById('starColor1')?.value || '#ffffff';
            const c2 = document.getElementById('starColor2')?.value || '#aaddff';
            const c3 = document.getElementById('starColor3')?.value || '#ffddaa';
            const activeColors = [c1, c2, c3];
            this.game.starColors = activeColors;

            const w = this.game.canvas ? this.game.canvas.width : 1600;
            const h = this.game.canvas ? this.game.canvas.height : 900;
            const centerX = w / 2;
            const centerY = h / 2;
            const spreadX = w * 20;
            const spreadY = h * 20;

            for (let i = 0; i < count; i++) {
                let x, y, vx = 0, vy = 0;
                if (this.game.bgWarpMode) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.random() * Math.max(w, h) * 0.8;
                    x = centerX + Math.cos(angle) * dist;
                    y = centerY + Math.sin(angle) * dist;
                    const speed = 4 + Math.random() * 16;
                    vx = Math.cos(angle) * speed;
                    vy = Math.sin(angle) * speed;
                } else {
                    x = Math.random() * spreadX - spreadX / 2 + centerX;
                    y = Math.random() * spreadY - spreadY / 2 + centerY;
                    if (this.game.bgDriftMode) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 0.1 + Math.random() * 0.3;
                        vx = Math.cos(angle) * speed;
                        vy = Math.sin(angle) * speed;
                    }
                }

                let r = 255, g = 255, b = 255;
                const starColor = activeColors[Math.floor(Math.random() * activeColors.length)];
                if (starColor && starColor.startsWith('#')) {
                    const hex = starColor.slice(1);
                    r = parseInt(hex.substr(0, 2), 16) || 255;
                    g = parseInt(hex.substr(2, 2), 16) || 255;
                    b = parseInt(hex.substr(4, 2), 16) || 255;
                }

                const depthLayer = 0.2 + Math.random() * 0.8;
                this.game.staticStars.push({
                    x: x, y: y, vx: vx, vy: vy,
                    name: this.generateStarName(i * 999),
                    size: (Math.random() * 1.5 + 0.5) * depthLayer,
                    alpha: Math.random() * 0.5 + 0.1,
                    baseAlpha: Math.random() * 0.5 + 0.1,
                    color: starColor,
                    red: r, green: g, blue: b,
                    depth: depthLayer
                });
            }
        }

        generateStarName(seed) {
            const prefixes = ['Alpha', 'Procyon', 'Sirius', 'Vega', 'Altair', 'Deneb', 'Algol', 'Zuben', 'Kaph', 'Sarin', 'Nirvana', 'Xenon', 'Caelum', 'Lyra'];
            const suffixes = ['Prime', 'Minor', 'Major', 'X', 'Cetus', 'IX', 'Theta', 'Gamma', 'V', 'Nirvana', 'Omega', 'Flux', 'Core'];
            const p = prefixes[Math.floor(this.seededRandom(seed) * prefixes.length)];
            const s = suffixes[Math.floor(this.seededRandom(seed + 1) * suffixes.length)];
            const n = Math.floor(this.seededRandom(seed + 2) * 99);
            return `${p} ${s}-${n}`;
        }

        generateResourceDeposits() {
            if (!this.game) return;
            this.game.resourceDeposits = [];
            for (let i = 0; i < 15; i++) {
                const angle = (i / 15) * Math.PI * 2 + Math.random() * 0.2;
                const dist = 2000 + Math.random() * 8000;
                this.game.resourceDeposits.push({
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    zone: dist < 4000 ? 'industrial' : (dist < 7000 ? 'precious' : 'crystal'),
                    richness: 1.0 + Math.random() * 2.0,
                    tier: Math.floor(dist / 2000) + 1,
                    name: `Resource Field ${i + 1}`
                });
            }
        }

        generateMissionBoard() {
            if (typeof MISSION_TEMPLATES === 'undefined') return [];
            const shuffled = [...MISSION_TEMPLATES].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, 3);
        }

        generateBlackHoleRings() { return []; }
        generateSupernovaParticles() { return []; }
        generateTunnelParticles() { return []; }

        seededRandom(seed) {
            let x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        }

        getSectorSeed(sectorX, sectorY) {
            const h1 = this.seededRandom(sectorX * 1234.5);
            const h2 = this.seededRandom(sectorY * 6789.1);
            return h1 * 0.5 + h2 * 0.5;
        }

        getSectorCoords(worldX, worldY) {
            const safeX = isFinite(worldX) ? worldX : 0;
            const safeY = isFinite(worldY) ? worldY : 0;
            const size = this.game.sectorSize || 10000;
            return { x: Math.floor(safeX / size), y: Math.floor(safeY / size) };
        }

        generateSector(sx, sy) {
            const key = `${sx},${sy}`;
            if (this.game.loadedSectors && this.game.loadedSectors.has(key)) return;

            const seed = this.getSectorSeed(sx, sy);
            const sectorData = { 
                x: sx, y: sy, 
                minerals: [], deposits: [], structures: [], 
                stars: [], planets: [], nebulae: [], galaxies: [],
                hazards: { mines: [], turrets: [], blackHoles: [], nebula: null } 
            };

            const sectorSize = this.game.sectorSize || 10000;
            const minX = sx * sectorSize;
            const minY = sy * sectorSize;

            // 1. Minerals (Gems)
            const mineralCount = Math.floor(15 + this.seededRandom(seed + 1) * 25);
            for (let i = 0; i < mineralCount; i++) {
                const s = seed + i * 1000;
                const x = minX + this.seededRandom(s) * sectorSize;
                const y = minY + this.seededRandom(s + 1) * sectorSize;
                const dist = Math.hypot(x, y);
                let type = 'iron';
                if (dist < 1500) type = ['iron', 'copper', 'coal'][Math.floor(this.seededRandom(s + 2) * 3)];
                else if (dist < 4000) type = ['silver', 'gold'][Math.floor(this.seededRandom(s + 2) * 2)];
                else if (dist < 8000) type = ['quartz', 'diamond'][Math.floor(this.seededRandom(s + 2) * 2)];
                else type = 'antimatter';

                const info = (typeof MINERAL_TYPES !== 'undefined') ? MINERAL_TYPES[type] : { color: '#fff', size: 10, value: 10 };
                const mineral = { x, y, type, color: info.color, size: info.size, value: info.value };
                if (this.game.minerals) this.game.minerals.push(mineral);
                sectorData.minerals.push(mineral);
            }

            // 2. Hazards
            if (this.seededRandom(seed + 50) < 0.2) {
                const mCount = Math.floor(1 + this.seededRandom(seed + 51) * 5);
                for (let i = 0; i < mCount; i++) {
                    const mine = {
                        x: minX + this.seededRandom(seed + 52 + i) * sectorSize,
                        y: minY + this.seededRandom(seed + 53 + i) * sectorSize,
                        radius: 45, active: true
                    };
                    if (this.game.spaceMines) this.game.spaceMines.push(mine);
                    sectorData.hazards.mines.push(mine);
                }
            }

            // 3. Stars & Planets
            const starCount = Math.floor(20 + this.seededRandom(seed + 8) * 30);
            for (let i = 0; i < starCount; i++) {
                const s = seed + i * 123;
                const star = {
                    id: `star_${sx}_${sy}_${i}`,
                    name: this.generateStarName(s),
                    x: minX + this.seededRandom(s) * sectorSize,
                    y: minY + this.seededRandom(s + 1) * sectorSize,
                    size: 1 + this.seededRandom(s + 2) * 3,
                    color: '#ffffff',
                    brightness: 0.4 + this.seededRandom(s + 3) * 0.6
                };
                if (this.game.stars) this.game.stars.push(star);
                sectorData.stars.push(star);
            }

            if (this.seededRandom(seed + 9) < 0.15) {
                const planet = {
                    name: `Planet ${sx}${sy}`,
                    type: 'terrestrial',
                    x: minX + this.seededRandom(seed + 10) * sectorSize,
                    y: minY + this.seededRandom(seed + 11) * sectorSize,
                    radius: 60 + this.seededRandom(seed + 12) * 80
                };
                if (this.game.planets) this.game.planets.push(planet);
                sectorData.planets.push(planet);
            }

            if (this.game.loadedSectors) this.game.loadedSectors.set(key, sectorData);
            return sectorData;
        }

        updateUniverse() {
            if (!this.game || !this.game.flightMode || !this.game.playerShip) return;
            const playerX = this.game.playerShip.x;
            const playerY = this.game.playerShip.y;
            const sector = this.getSectorCoords(playerX, playerY);
            const sectorKey = `${sector.x},${sector.y}`;

            const distMoved = Math.hypot(playerX - this.lastUpdateX, playerY - this.lastUpdateY);
            if (distMoved < 500 && sectorKey === this.lastUpdateSector) return;

            this.lastUpdateX = playerX;
            this.lastUpdateY = playerY;
            this.lastUpdateSector = sectorKey;
            this.game.currentSector = sector;

            const loadRadius = 3;
            for (let dx = -loadRadius; dx <= loadRadius; dx++) {
                for (let dy = -loadRadius; dy <= loadRadius; dy++) {
                    const sx = sector.x + dx;
                    const sy = sector.y + dy;
                    this.generateSector(sx, sy);
                }
            }
            
            // Basic cleanup (optional but recommended for long sessions)
            if (this.game.loadedSectors && this.game.loadedSectors.size > 100) {
                for (const [key] of this.game.loadedSectors.entries()) {
                    const parts = key.split(',');
                    const kx = parseInt(parts[0]);
                    const ky = parseInt(parts[1]);
                    if (Math.abs(kx - sector.x) > 6 || Math.abs(ky - sector.y) > 6) {
                        this.game.loadedSectors.delete(key);
                    }
                }
            }
        }

        spawnTrainingField() {
            if (!this.game || !this.game.playerShip) return;
            const ship = this.game.playerShip;
            const gates = [];
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                gates.push({
                    x: ship.x + Math.cos(angle) * 1500,
                    y: ship.y + Math.sin(angle) * 1500,
                    size: 150, reached: false
                });
            }
            this.game.trainingGates = gates;
            this.game.trainingGateIndex = 0;
            this.game.trainingBriefing = true;
            this.game.trainingBriefingStart = performance.now();
        }
    };

    window.ProceduralManager = ProceduralManager;
    console.log('[Procedural] Majestic Legacy Sync Active.');
})();
