/**
 * SectorManager - Controls the Galactic Map and Environmental Styles
 * Phase 19: The New Frontier
 */

class SectorManager {
    constructor(game) {
        this.game = game;
        this.currentSector = { x: 0, y: 0 }; // Galactic Coordinates
        this.sectors = new Map(); // "x,y" -> Sector Data
        this.visitedSectors = new Set(); // "x,y" -> Visited status
        
        this.loadVisitedSectors();
        
        // Initial setup
        this.init();
    }

    update(dt) {
        // PHASE 18: Territorial Influence Scaling
        const sector = this.getCurrentSectorData();
        if (!sector) return;

        // Calculate Player Presence
        const basesInSector = this.game.spaceBases?.filter(b => b.x === sector.x && b.y === sector.y) || [];
        let moduleCount = 0;
        let totalPop = 0;
        basesInSector.forEach(b => {
            totalPop += (b.population || 0);
            Object.keys(b).forEach(k => { if (k.startsWith('cell_')) moduleCount++; });
        });

        // 1 module = 2 units, 100 pop = 1 unit
        const playerPresence = (moduleCount * 2) + (totalPop / 100);
        
        // Influence shifts towards player presence
        if (playerPresence > 20) {
            const shift = 0.01 * dt; // 1% shift per minute approx
            sector.influence = Math.min(100, (sector.influence || 0) + shift);
            if (sector.influence > 80) sector.faction = 'player';
        }
    }

    init() {
        // Start in the Origin Sector (Nebula)
        const initialSector = this.generateSector(0, 0, {
            name: "Nebula Cradle",
            style: "nebula-blue",
            difficulty: 1.0,
            starDensity: 1.2,
            music: "ambient_nebula"
        });
        
        // Ensure the initial sector is finalized (spawns Warp Gate, etc.)
        this.finalizeJump(initialSector);
    }

    generateSector(x, y, config = null) {
        const key = `${x},${y}`;
        if (this.sectors.has(key)) return this.sectors.get(key);

        const styles = ['deep-space', 'nebula-blue', 'industrial-toxic', 'neutron-pulse', 'void-rift'];
        const style = config?.style || styles[Math.floor(Math.random() * styles.length)];
        const difficulty = config?.difficulty || 1.0 + (Math.abs(x) + Math.abs(y)) * 0.5;

        const sectorData = {
            x, y,
            name: config?.name || `Sector ${x}:${y}`,
            style: style,
            difficulty: difficulty,
            starDensity: config?.starDensity || 0.5 + Math.random() * 1.5,
            hazards: this.getHazardsForDifficulty(difficulty),
            music: config?.music || 'ambient_drift',
            market: this.generateMarketData(style),
            faction: this.getFactionAt(x, y),
            influence: 50 + Math.random() * 50, // 0-100 scale
            megaProject: {
                type: 'none',
                status: 'null',
                progress: 0,
                requiredMinerals: {
                    iron: 500,
                    platinum: 100,
                    uranium: 50
                }
            }
        };

        this.sectors.set(key, sectorData);
        return sectorData;
    }

    generateMarketData(style) {
        // Base multipliers: 1.0 is standard
        const market = {
            industrial: 1.0,
            precious: 1.0,
            crystal: 1.0,
            nuclear: 1.0,
            exotic: 1.0
        };

        // Style-based demand logic
        if (style === 'industrial-toxic') {
            market.precious = 1.5; // High demand for electronics/wealth
            market.industrial = 0.7; // Low value due to abundance
        } else if (style === 'nebula-blue' || style === 'deep-space') {
            market.industrial = 1.3; // High demand for construction mats
        } else if (style === 'neutron-pulse') {
            market.nuclearCount = 0.5; // Abundant nuclear
            market.exotic = 2.0; // High value for tech to survive pulses
        } else if (style === 'void-rift') {
            market.exotic = 0.5; // Abundant exotic
            market.precious = 2.5; // Extremely rare
        }

        return market;
    }

    getFactionAt(x, y) {
        // Deterministic faction assignment based on position
        // Creates "Faction Space" regions
        const factions = ['xenon', 'terran', 'mauler', 'neutral'];
        const seed = Math.abs(Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 10;
        return factions[Math.floor(seed % factions.length)];
    }

    getHazardsForDifficulty(diff) {
        if (diff < 1.5) return ['mine'];
        if (diff < 3.0) return ['mine', 'black_hole'];
        return ['mine', 'black_hole', 'pulsar', 'nebula_toxic'];
    }

    jumpToSector(x, y) {
        console.log(`[SectorManager] Preparing jump to ${x}:${y}`);
        const sector = this.generateSector(x, y);
        this.currentSector = { x, y };

        // 1. Trigger Visual Transition
        if (this.game.effectManager) {
            this.game.effectManager.createSectorJumpEffect(() => {
                this.finalizeJump(sector);
            });
        } else {
            this.finalizeJump(sector);
        }
    }

    finalizeJump(sector) {
        const game = this.game;
        
        // --- 0. Track Visitation ---
        const key = `${sector.x},${sector.y}`;
        if (!this.visitedSectors.has(key)) {
            this.visitedSectors.add(key);
            this.saveVisitedSectors();
            console.log(`[SectorManager] Discovered new sector: ${key}`);
        }
        
        // 1. Update Warp Gate Network for the new sector
        if (game.warpGateManager) {
            game.warpGateManager.gates = [];
            // Only add a central hub gate if we aren't in the starting origin sector
            if (sector.x !== 0 || sector.y !== 0) {
                game.warpGateManager.addGate(`${sector.name} Hub`, 0, 0, 'ancient');
            }
        }

        // 2. Comprehensive World Object Cleanup (Prevent Memory Leaks)
        const entitiesToClear = [
            'stars', 'backgroundStars', 'minerals', 'enemyShips', 'enemyMissiles', 'enemyBullets', 
            'damageParticles', 'decoyFlares', 'hazardBlackHoles', 'shootingStarsActive',
            'resourceDeposits', 'spaceMines', 'missileBases', 'nebulae', 'galaxies', 
            'blackHoles', 'spacecraft', 'matrixStreams', 'decorations', 'asteroids', 
            'comets', 'lootItems', 'activeEvents', 'projectiles', 'planets'
        ];
        
        entitiesToClear.forEach(collection => {
            if (Array.isArray(game[collection])) {
                game[collection] = [];
            }
        });
        
        // 3. Apply Sector Styles & Music (ADDITIVE PHASE 26)
        if (game.activeStyles) {
            // Add the new sector's style to the active set if not already present
            if (sector.style) {
                game.activeStyles.add(sector.style);
            }
            
            // RE-GENERATE all active styles for the new sector
            game.activeStyles.forEach(style => {
                if (game.proceduralManager) {
                    game.proceduralManager.generateSingleStyle(style);
                }
            });
            
            // Sync UI
            if (game.updateBgUI) game.updateBgUI();
        }
        
        // 4. Update HUD & State
        if (game.hudManager && !game.hudManager.__isMock) {
            // Only show entry toast if we are NOT in the starting origin sector
            if (sector.x !== 0 || sector.y !== 0) {
                game.hudManager.showToast(`🌌 ENTERING: ${sector.name.toUpperCase()}`, 5000, 'info');
            }
            game.hudManager.updateMissionHUD();
        }

        // 5. Teleport player to hub
        if (game.playerShip) {
            game.playerShip.x = 0;
            game.playerShip.y = 0;
            game.playerShip.vx = 0;
            game.playerShip.vy = 0;
        }

        // 6. Reset Procedural Engine
        if (game.loadedSectors) {
            game.loadedSectors.clear(); // Flush local slab cache
        }

        
        // Force initial generation around hub
        game.checkAndGenerateSectors(true);
        
        console.log(`[SectorManager] Arrived at ${sector.name} (${sector.style})`);
    }

    getCurrentSectorData() {
        return this.sectors.get(`${this.currentSector.x},${this.currentSector.y}`);
    }

    getPlayerInfluence() {
        const sector = this.getCurrentSectorData();
        if (!sector) return 0;
        // Map 0-100 influence to 0-1 scale for Renderer
        return (sector.faction === 'player') ? (sector.influence / 100) : 0;
    }

    loadVisitedSectors() {
        try {
            const saved = localStorage.getItem('interstellar_visited_sectors');
            if (saved) {
                const arr = JSON.parse(saved);
                this.visitedSectors = new Set(arr);
                console.log(`[SectorManager] Loaded ${this.visitedSectors.size} visited sectors.`);
            }
        } catch (e) { console.error("Failed to load visited sectors", e); }
    }

    saveVisitedSectors() {
        try {
            const arr = Array.from(this.visitedSectors);
            localStorage.setItem('interstellar_visited_sectors', JSON.stringify(arr));
        } catch (e) { console.error("Failed to save visited sectors", e); }
    }

    contributeToMegaProject(mineralType, amount) {
        const sector = this.getCurrentSectorData();
        if (!sector || !sector.megaProject || sector.megaProject.status === 'null') return 0;

        const req = sector.megaProject.requiredMinerals;
        if (req[mineralType] !== undefined) {
            const needed = req[mineralType];
            const toGive = Math.min(amount, needed);
            
            if (toGive > 0) {
                req[mineralType] -= toGive;
                this.updateProjectProgress(sector);
                return toGive;
            }
        }
        return 0;
    }

    updateProjectProgress(sector) {
        const req = sector.megaProject.requiredMinerals;
        const totalRemaining = Object.values(req).reduce((a, b) => a + b, 0);
        const totalInitial = 650; // iron:500 + plat:100 + uran:50
        
        sector.megaProject.progress = Math.min(100, Math.round(((totalInitial - totalRemaining) / totalInitial) * 100));
        
        if (sector.megaProject.progress >= 100) {
            sector.megaProject.status = 'complete';
            if (this.game.hudManager) this.game.hudManager.showToast(`✨ MEGA-PROJECT COMPLETE: ${sector.megaProject.type.toUpperCase()} ONLINE`, 10000, 'success');
        } else {
            if (this.game.hudManager) this.game.hudManager.showToast(`🏗️ Project Progress: ${sector.megaProject.progress}%`, 3000, 'info');
        }
    }

    startProject(type) {
        const sector = this.getCurrentSectorData();
        if (!sector) return;
        
        sector.megaProject.type = type;
        sector.megaProject.status = 'construction';
        sector.megaProject.progress = 0;
        if (this.game.hudManager) this.game.hudManager.showToast(`🚀 Construction Site Established: ${type.toUpperCase()}`, 5000);
    }
}

window.SectorManager = SectorManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.SectorManager = SectorManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SectorManager;
}
