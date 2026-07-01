/**
 * BaseBuilder.js
 * Handles planetary landing, base construction, and persistent space station mechanics.
 * Phase 8, Step 13: Modularization
 */
class BaseBuilder {
    constructor(game) {
        this.game = game;
        this.activeBasePlanet = null;
        this.baseTool = 'hab';
        
        // Initialize base data from storage (Phase 16: Multi-Base support)
        this.spaceBases = this.loadSpaceBases();
        this.capitalBaseName = localStorage.getItem('interstellarCapital') || (this.spaceBases[0]?.planetName || null);
        
        // Legacy migration if only a single old base exists
        if (this.spaceBases.length === 0) {
            const legacyBase = this.loadSpaceBase();
            if (legacyBase && legacyBase.isDeployed) {
                console.log("Migrating legacy spaceBase to multi-base array...");
                this.spaceBases.push(legacyBase);
                this.saveSpaceBases();
            }
        }
        
        // Ensure game has references
        this.game.spaceBases = this.spaceBases;
        // Always provide a stub so methods can safely check .isDeployed without null checks
        this.game.spaceBase = this.spaceBases[0] || {
            isDeployed: false,
            isTowing: false,
            x: 0, y: 0,
            resources: {},
            modules: [],
            inventory: {}
        };
    }

    loadSpaceBases() {
        try {
            const data = localStorage.getItem('interstellarBases');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to load space bases:", e);
            return [];
        }
    }

    saveSpaceBases() {
        localStorage.setItem('interstellarBases', JSON.stringify(this.spaceBases));
        if (this.capitalBaseName) localStorage.setItem('interstellarCapital', this.capitalBaseName);
        this.syncBaseWithCloud();
    }

    loadSpaceBase() {
        try {
            const data = localStorage.getItem('spaceBase');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Failed to load space base:", e);
            return null;
        }
    }

    saveSpaceBase() {
        this.saveSpaceBases(); // Redirect to the new collection saver
    }

    syncBaseWithCloud() {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'SAVE_GAME_DATA',
                data: {
                    carriedResources: this.game.carriedResources,
                    spaceBase: this.spaceBase
                }
            }, '*');
        }
    }

    // === PLANETARY LANDING & BASE BUILDING UI ===
    openBaseBuilder(planet) {
        if (!planet || planet.type !== 'terrestrial') return;
        
        this.game.flightMode = false;
        
        // Find existing base at this planet or prepare a new one
        let base = this.game.spaceBases.find(b => b.planetName === planet.name);
        
        if (!base) {
            // Option to CLAIM planet (Phase 16)
            base = {
                planetName: planet.name,
                x: planet.x,
                y: planet.y,
                isDeployed: false,
                modules: [],
                resources: {},
                lastCollectorTick: Date.now()
            };
            this.game.spaceBases.push(base);
            this.saveSpaceBases();
        }
        
        this.game.spaceBase = base; // Set as primary focus for UI
        
        // Safety lock out game engine animation
        if (this.game.animationId) cancelAnimationFrame(this.game.animationId);
        
        const modal = document.getElementById('baseBuilderModal');
        if (modal) modal.style.display = 'flex';
        
        this.activeBasePlanet = planet;
        this.baseTool = 'hab';

        this.drawBaseGrid();
        
        if (window.gameAudio) window.gameAudio.playMenuHover();
    }

    closeBaseBuilder() {
        const modal = document.getElementById('baseBuilderModal');
        if (modal) modal.style.display = 'none';
        
        this.activeBasePlanet = null;
        
        // Bounce player out of orbit so they don't immediately trigger it again
        if (this.game.playerShip) {
            this.game.playerShip.x -= 200;
            this.game.playerShip.vx = 0;
            this.game.playerShip.vy = 0;
        }

        // Restart game loop
        this.game.toggleFlightMode();
        this.game.gameLoop();
        
        if (window.gameAudio) window.gameAudio.playMenuSelect();
    }

    selectBaseTool(tool) {
        this.baseTool = tool;
        const tools = ['hab', 'mine', 'def', 'erase'];
        tools.forEach(t => {
            const el = document.getElementById('baseTool_' + t);
            if (el) el.classList.toggle('selected', t === tool);
        });
        
        if (window.gameAudio) window.gameAudio.playMenuHover();
    }

    setAsCapital(baseName) {
        this.capitalBaseName = baseName;
        this.saveSpaceBases();
        this.game.hudManager?.showToast(`🏛️ ${baseName} Designated as IMPERIAL CAPITAL`, 5000, 'success');
        if (window.gameAudio) window.gameAudio.playMenuSelect();
    }

    drawBaseGrid() {
        const icons = {
            hab: "🏠",
            research: "🧪",
            def: "🛡️",
            mine: "⛏️",
            power: "⚡",
            log: "📦",
            shield: "🌐",
            comms: "🛰️",
            hangar: "🦾",
            gate: "🌀",
            turret_sentinel: "🗼",
            drone_hive: "🐝"
        };
        const types = ["hab", "research", "def", "mine", "power", "log", "shield", "comms", "hangar", "gate", "turret_sentinel", "drone_hive"];

        let gridHTML = '';
        const currentBase = this.game.spaceBase;
        if (!currentBase) return;

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const type = currentBase[`cell_${x}_${y}`] || 'empty';
                const icon = type === 'empty' ? '' : (icons[type] || '');
                gridHTML += `<div class="base-cell ${type}" onclick="interstellarEngine.baseBuilder.placeBaseModule(${x}, ${y})" data-x="${x}" data-y="${y}">${icon}</div>`;
            }
        }

        const gridContainer = document.getElementById('baseGridContainer');
        if (gridContainer) gridContainer.innerHTML = gridHTML;
    }

    placeBaseModule(x, y) {
        const type = this.baseTool;
        const currentBase = this.game.spaceBase;
        if (!currentBase) return;
        
        if (type === 'erase') {
            delete currentBase[`cell_${x}_${y}`];
            this.drawBaseGrid();
            this.saveSpaceBases();
            if (window.gameAudio) window.gameAudio.playMenuSelect();
            return;
        }

        const cost = this.getBaseModuleCost(type);
        if (this.game.credits >= cost) {
            this.game.credits -= cost;
            currentBase[`cell_${x}_${y}`] = type;
            currentBase.isDeployed = true;
            
            // Phase 12: Sync with SurfaceManager persistent building manifest
            if (this.game.surfaceManager && (this.game.surfaceMode || this.activeBasePlanet)) {
                const planetName = this.activeBasePlanet ? this.activeBasePlanet.name : currentBase.planetName;
                this.game.surfaceManager.buildings.push({
                    id: `build_${Date.now()}_${x}_${y}`,
                    type: type,
                    x: x, y: y,
                    planet: planetName
                });
                this.game.surfaceManager.saveSurfaceData();
            }

            this.drawBaseGrid();
            this.saveSpaceBases();
            this.game.hudManager.updateWalletUI();
            
            if (this.game.logManager) {
                const loc = this.activeBasePlanet ? this.activeBasePlanet.name : (currentBase.planetName || 'Orbital Station');
                this.game.logManager.addEntry('EMPIRE', `Constructed ${type.toUpperCase()} module at ${loc}.`);
            }

            // Sync Warp Network if a gate was added (Phase 17-1)
            if (type === 'gate' && this.game.syncWarpGates) this.game.syncWarpGates();
            
            if (window.gameAudio) window.gameAudio.playMenuSelect();
        } else {
            this.game.hudManager.showToast("Insufficient Credits for module!", 2000, "error");
        }
    }

    getBaseModuleCost(type) {
        const costs = {
            hab: 500,
            mine: 600,
            def: 750,
            research: 1000,
            power: 1200,
            log: 800,
            shield: 1500,
            comms: 900,
            hangar: 2500,
            gate: 5000,
            turret_sentinel: 8000,
            drone_hive: 15000
        };
        return costs[type] || 500;
    }

    updateColonyStatsForBase(base) {
        let pop = 0;
        let pwrGen = 0;
        let pwrCon = 0;
        let resRate = 0;
        let tradeMod = 0;
        let logisticalCap = 0;

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const type = base[`cell_${x}_${y}`];
                if (!type) continue;

                switch(type) {
                    case 'hab': pop += 10; pwrCon += 2; break;
                    case 'power': pwrGen += 25; break;
                    case 'solar_array': pwrGen += 40; break; // Phase 12 Upgrade
                    case 'research': resRate += 1; pwrCon += 10; pop -= 2; break;
                    case 'research_lab': resRate += 2; pwrCon += 15; pop += 2; break; // Phase 12 Upgrade
                    case 'mine': pwrCon += 5; break;
                    case 'extractor': pwrCon += 12; break; // Phase 12 Upgrade
                    case 'def': pwrCon += 8; break;
                    case 'shield': pwrCon += 15; break;
                    case 'log': tradeMod += 0.2; logisticalCap += 50; pwrCon += 5; break;
                    case 'hangar': pwrCon += 10; logisticalCap += 20; break;
                    case 'gate': pwrCon += 100; break; // Massive power drain for Warp Gates
                    case 'turret_sentinel': pwrCon += 30; break;
                    case 'drone_hive': pwrCon += 55; break;
                }
            }
        }

        base.maxPopulation = pop;
        base.population = base.population || 0;
        
        // --- PHASE 17: MEGA-STRUCTURE INTEGRATION ---
        const megaGains = this.game.warpGateManager?.calculateGlobalGains() || { energyMult: 1.0, popBonus: 0 };
        const energyMult = megaGains.energyMult;
        pwrGen *= energyMult;

        // Apply population capacity bonus to the global cap
        this.game.imperialPopBonus = megaGains.popBonus;

        if (pwrGen >= pwrCon) {
            base.population = Math.min(base.maxPopulation, base.population + 1);
        } else {
            base.population = Math.max(0, base.population - 2);
        }

        base.powerGenerated = pwrGen;
        base.powerConsumed = pwrCon;
        base.researchRate = resRate;
        base.tradeMultiplier = 1.0 + tradeMod + (base.population / 100);
        base.logisticalCapacity = logisticalCap;

        if (base === this.game.spaceBase) {
            this.updateColonyUIForBase(base);
        }
    }

    updateColonyUIForBase(base) {
        const els = {
            pop: document.getElementById('colonyPop'),
            pwr: document.getElementById('colonyPower'),
            res: document.getElementById('colonyResearch')
        };

        if (els.pop) els.pop.innerText = `👥 ${base.population || 0}/${base.maxPopulation || 0}`;
        if (els.pwr) {
            const pwrBalance = (base.powerGenerated || 0) - (base.powerConsumed || 0);
            els.pwr.innerText = `⚡ ${pwrBalance} MW`;
            els.pwr.style.color = pwrBalance >= 0 ? '#00ff88' : '#ff4444';
        }
    }

    updateColonyUI() {
        const colony = this.game.colony;
        const els = {
            pop: document.getElementById('colonyPop'),
            pwr: document.getElementById('colonyPower'),
            res: document.getElementById('colonyResearch')
        };

        if (els.pop) els.pop.innerText = `👥 ${colony.population}/${colony.maxPopulation}`;
        if (els.pwr) {
            const pwrBalance = colony.powerGenerated - colony.powerConsumed;
            els.pwr.innerText = `⚡ ${pwrBalance} MW`;
            els.pwr.style.color = pwrBalance >= 0 ? '#00ff88' : '#ff4444';
        }
        if (els.res) els.res.innerText = `🧪 ${Math.floor(colony.researchPoints)} (+${colony.researchRate}/m)`;
    }

    // === PHASE 4: RAID LOGIC ===

    calculateTotalVaultValue() {
        let total = 0;
        this.game.spaceBases.forEach(base => {
            if (base.inventory) {
                Object.keys(base.inventory).forEach(type => {
                    const count = base.inventory[type];
                    // Base value for minerals (matches trade logic: 100 per unit)
                    total += count * 100;
                });
            }
        });
        return total;
    }

    checkForRaid(base) {
        if (!base.isDeployed || base.isRaidActive) return;

        const totalValue = this.calculateTotalVaultValue();
        const threshold = 10000;
        
        if (totalValue > threshold) {
            // Chance based on value (1% per 5000 over threshold)
            const raidChance = (totalValue - threshold) / 500000;
            if (Math.random() < raidChance || (this.game.frameCounter % 14400 === 0)) { // ~4 min fallback
                this.triggerRaid(base);
            }
        }
    }

    triggerRaid(base) {
        base.isRaidActive = true;
        base.raidStartTime = Date.now();
        
        this.game.hudManager.showToast(`🚨 PIRATE RAID DETECTED: ${base.planetName}! 🚨`, 5000, 'error');
        if (window.gameAudio) window.gameAudio.playBossAlert();

        // Spawn a cluster of pirates near the base
        if (this.game.combatManager) {
            for (let i = 0; i < 4; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 600;
                this.game.enemyShips.push({
                    x: base.x + Math.cos(angle) * dist,
                    y: base.y + Math.sin(angle) * dist,
                    vx: 0, vy: 0,
                    rotation: Math.random() * Math.PI * 2,
                    type: 'fighter',
                    faction: 'mauler',
                    health: 150, maxHealth: 150,
                    state: 'attack',
                    isRaidUnit: true,
                    targetBase: base
                });
            }
        }
    }

    handleSuccessfulRaid(base) {
        // User-Defined Probability Table for Loss %
        // 0% (15%), 10% (35%), 20% (25%), 30% (10%), 50% (8%), 75% (5%), 100% (2%)
        const rolls = [
            { chance: 0.15, loss: 0.00 },
            { chance: 0.35, loss: 0.10 },
            { chance: 0.25, loss: 0.20 },
            { chance: 0.10, loss: 0.30 },
            { chance: 0.08, loss: 0.50 },
            { chance: 0.05, loss: 0.75 },
            { chance: 0.02, loss: 1.00 }
        ];

        let roll = Math.random();
        let cumulative = 0;
        let finalLoss = 0.10; // Default

        for (const r of rolls) {
            cumulative += r.chance;
            if (roll <= cumulative) {
                finalLoss = r.loss;
                break;
            }
        }

        if (finalLoss > 0 && base.inventory) {
            Object.keys(base.inventory).forEach(type => {
                const count = base.inventory[type];
                const lost = Math.floor(count * finalLoss);
                base.inventory[type] -= lost;
            });
            this.game.hudManager.showToast(`💸 RAID FAILURE: Pirates stole ${Math.round(finalLoss * 100)}% of minerals!`, 5000, 'error');
        } else {
            this.game.hudManager.showToast(`🛡️ RAID REPULSED: Defensive systems held the vault!`, 5000, 'success');
        }

        base.isRaidActive = false;
        this.saveSpaceBases();
    }

    // === PHASE 14: DEFENSE LOGIC ===
    updateOrbitalDefenses(base, dt) {
        if (!base.isDeployed) return;

        // Check Power Dependency
        const isPowerOK = (base.powerGenerated || 0) >= (base.powerConsumed || 0);
        if (!isPowerOK) return;

        // Scan for hostiles near the base (Rivals or Maulers)
        const hostiles = this.game.aiManager?.ships.filter(s => 
            (s.alignment === 'rival' || s.alignment === 'hostile' || s.isRaidUnit) && 
            Math.hypot(s.x - base.x, s.y - base.y) < 2000
        );

        if (!hostiles || hostiles.length === 0) return;

        // Count Sentinel Turrets and Drone Hives
        let sentinelCount = 0;
        let hiveCount = 0;
        for (let key in base) {
            if (base[key] === 'turret_sentinel') sentinelCount++;
            if (base[key] === 'drone_hive') hiveCount++;
        }

        // 1. Sentinel Turrets: Heavy single-target beams
        if (sentinelCount > 0) {
            const target = hostiles[0];
            if (!base.lastTurretFire || Date.now() - base.lastTurretFire > 2000 / sentinelCount) {
                const turretSource = { x: base.x, y: base.y, color: '#00ccff', type: 'turret' };
                this.game.aiManager?.fireNeedleBeam(turretSource, 'void', target);
                base.lastTurretFire = Date.now();
            }
        }

        // 2. Drone Hives: Rapid micro-pulses
        if (hiveCount > 0) {
            const target = hostiles[Math.floor(Math.random() * hostiles.length)];
            if (!base.lastHiveFire || Date.now() - base.lastHiveFire > 1000 / hiveCount) {
                const hiveSource = { x: base.x, y: base.y, color: '#00ffaa', type: 'hive' };
                this.game.aiManager?.fireNeedleBeam(hiveSource, 'pulsar', target);
                base.lastHiveFire = Date.now();
            }
        }
    }

    // === SYSTEM LOGIC ===
    updateSpaceBase() {
        if (!this.game.spaceBases || this.game.spaceBases.length === 0) return;

        const now = Date.now();

        this.game.spaceBases.forEach(base => {
            if (!base.isDeployed || base.isTowing) return;

            // 1. STAT RECALCULATION (Periodic)
            if (this.game.frameCounter % 60 === 0) {
                this.updateColonyStatsForBase(base);
                this.checkForRaid(base);
            }

            // 1.5 DEFENSE ENGAGEMENT (Phase 14)
            this.updateOrbitalDefenses(base, 1.0); // dt approx

            // 2. RAID TIMEOUT (If player doesn't defend)
            if (base.isRaidActive) {
                const raidElapsed = now - (base.raidStartTime || 0);
                // Check if any raid units are still near base
                const raidUnits = this.game.enemyShips.filter(e => e.isRaidUnit && e.targetBase === base);
                
                // Check defensive presence (Wingmen in Guard mode)
                const defenders = this.game.playerWingmen.filter(w => w.state === 'guard' && Math.hypot(w.x - base.x, w.y - base.y) < 2000);

                if (raidElapsed > 60000) { // 60 seconds to defend
                    if (raidUnits.length > 0 && defenders.length === 0) {
                        this.handleSuccessfulRaid(base);
                    } else if (raidUnits.length === 0) {
                        base.isRaidActive = false;
                        this.game.hudManager.showToast(`🛡️ RAID DEFEATED at ${base.planetName}!`, 3000, 'success');
                    }
                }
            }

            // 3. TRADE WAVE (Phase 16-1B)
            // Bases with a logistics module automatically "sell" a portion of surplus gems
            const hasLogistics = Object.values(base).some(val => val === 'log');
            if (hasLogistics && base.inventory) {
                const tradeInterval = 30000; // 30 seconds
                if (now - (base.lastTradeTick || 0) >= tradeInterval) {
                    let totalSold = 0;
                    let creditsEarned = 0;
                    
                    Object.keys(base.inventory).forEach(type => {
                        const count = base.inventory[type];
                        if (count > 0) {
                            const toSell = Math.min(count, 5); // Sell up to 5 per type
                            base.inventory[type] -= toSell;
                            totalSold += toSell;
                            // Basic trade value (tuned by trade multiplier)
                            creditsEarned += toSell * 100 * (base.tradeMultiplier || 1);
                        }
                    });

                    if (totalSold > 0) {
                        this.game.credits += Math.floor(creditsEarned);
                        this.game.hudManager.updateWalletUI();
                        this.game.hudManager.showToast(`💰 Trade Hub Profit: $${Math.floor(creditsEarned).toLocaleString()} from ${base.planetName}`, 3000);
                        base.lastTradeTick = now;
                        this.saveSpaceBases();
                    }
                }
            }

            // 4. TRIBUTE CONVOY (Phase 16-1C)
            // Move resources to Capital Base if logistics exist
            if (this.capitalBaseName && base.planetName !== this.capitalBaseName && hasLogistics && base.inventory) {
                const tributeInterval = 120000; // 2 minutes
                if (now - (base.lastTributeTick || 0) >= tributeInterval) {
                    const capital = this.game.spaceBases.find(b => b.planetName === this.capitalBaseName);
                    if (capital) {
                        if (!capital.inventory) capital.inventory = {};
                        let tributeCount = 0;
                        Object.keys(base.inventory).forEach(type => {
                            const count = base.inventory[type];
                            if (count > 10) { // Keep at least 10 for local use
                                const toMove = Math.floor(count * 0.1);
                                base.inventory[type] -= toMove;
                                capital.inventory[type] = (capital.inventory[type] || 0) + toMove;
                                tributeCount += toMove;
                            }
                        });
                        if (tributeCount > 0) {
                            this.game.hudManager?.showToast(`📦 Tribute Received: ${tributeCount} units from ${base.planetName}`, 3000, 'info');
                            base.lastTributeTick = now;
                            this.saveSpaceBases();
                        }
                    }
                }
            }
        });
    }

    triggerPlanetImpactEffect(planet) {
        console.log("Entering orbit of", planet.name);
        
        // Visual impact / landing sequence
        if (this.game.renderer) {
            this.game.renderer.flashWhite(0.5);
        }
        
        // Open the builder
        setTimeout(() => {
            this.openBaseBuilder(planet);
        }, 500);
    }
}

window.BaseBuilder = BaseBuilder;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.BaseBuilder = BaseBuilder;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseBuilder;
}
