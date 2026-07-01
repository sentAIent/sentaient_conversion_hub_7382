/**
 * MarketplaceManager.js
 * Handles the economic systems, trade outposts, and equippable ship modules.
 * Phase 6: Trade & Economy
 */

class MarketplaceManager {
    constructor(game) {
        this.game = game;
        this.installedModules = new Set();
        
        // Modules defined with unique stats and costs
        this.MODULE_CATALOG = {
            'shield_booster': { name: 'Hyper-Flux Shield', desc: 'Permanent +25 Max Shield', cost: 5000, color: '#00ccff', icon: '🛡️', stat: 'maxShield', bonus: 25 },
            'hull_plating': { name: 'Titanium Shell', desc: 'Permanent +50 Max Hull', cost: 8000, color: '#888', icon: '🧱', stat: 'maxHull', bonus: 50 },
            'rapid_fire': { name: 'Overclocked Cores', desc: 'Permanent -100ms Fire Rate', cost: 12000, color: '#ff4444', icon: '🔫', stat: 'fireRate', bonus: -100 },
            'nano_regen': { name: 'Nano-Repair Swarm', desc: 'Passive Hull Regeneration (0.1/s)', cost: 15000, color: '#00ff88', icon: '🔧', stat: 'hullRegen', bonus: 0.1 },
            'void_scanner': { name: 'Void Eye Scanner', desc: 'Double Gem Detection Range', cost: 10000, color: '#ff00ff', icon: '👁️', stat: 'scanRange', bonus: 2.0 },
            'afterburner': { name: 'Vortex Injectors', desc: 'Permanent +20% Acceleration', cost: 9000, color: '#ffaa00', icon: '🔥', stat: 'acceleration', bonus: 0.2 },
            'stealth_coating': { name: 'Abyssal Paint', desc: 'Reduces Enemy Aggro Range by 30%', cost: 7000, color: '#1a0033', icon: '👤', stat: 'aggroRange', bonus: 0.7 },
            'targeting_chip': { name: 'Smart-Link AI', desc: 'Slightly higher projectile speed', cost: 6000, color: '#ffff00', icon: '🎯', stat: 'bulletSpeed', bonus: 2 },
            'heavy_ordinance': { name: 'Heavy Munitions', desc: 'Permanent +5 Bullet Damage', cost: 11000, color: '#ff8800', icon: '💣', stat: 'bulletDamage', bonus: 5 },
            'reactor_core': { name: 'Singularity Core', desc: 'All Subsystems +5% Efficiency', cost: 25000, color: '#ffffff', icon: '⚛️', stat: 'all', bonus: 1.05 }
        };

        // Phase 13: Financial Engine Data
        this.marketDayDuration = 300000; // 5 real minutes = 1 Market Day
        this.lastMarketDayReset = Date.now();
        this.priceIndex = {}; // { type: { currentPrice, volHistory: [], dailyVol: 0 } }
        
        this.loadMarketData();
        this.loadModules();
    }

    init() {
        console.log("🪙 [Economy] Marketplace Manager Initialized.");
    }

    /**
     * Sells all gems in the player's inventory based on collective market rates.
     * Incorporates Slippage: massive trades receive less favorable rates.
     */
    sellAllGems() {
        const inventory = this.game.playerInventory;
        if (!inventory || Object.keys(inventory).length === 0) {
            if (this.game.hudManager) this.game.hudManager.showToast("INVENTORY EMPTY", 3000, 'warning');
            return;
        }

        const market = this.game.sectorManager ? this.game.sectorManager.getCurrentSectorData().market : null;
        let totalGain = 0;
        let itemsSoldCount = 0;

        for (const [type, count] of Object.entries(inventory)) {
            if (count <= 0) continue;
            
            const marketData = this.priceIndex[type];
            if (!marketData) continue;

            const basePrice = marketData.currentPrice;
            const sectorMultiplier = market ? (market[MINERAL_TYPES[type]?.zone] || 1.0) : 1.0;
            
            // Calculate 30-Day Moving Average Volume (MAV) for slippage
            const mav = marketData.volHistory.reduce((a, b) => a + b, 0) / marketData.volHistory.length;
            
            // SLIPPAGE LOGIC:
            // If selling more than 20% of MAV in one go, apply a penalty curve
            const volumeThreshold = mav * 0.2;
            let effectivePrice = basePrice * sectorMultiplier;
            
            if (count > volumeThreshold) {
                const excess = count - volumeThreshold;
                const penalty = Math.min(0.5, excess / (mav * 2)); // Max 50% slippage penalty
                effectivePrice *= (1 - penalty);
            }

            totalGain += effectivePrice * count;
            itemsSoldCount += count;
            
            // Update live market volume (Collective Impact)
            marketData.dailyVol += count;
            
            inventory[type] = 0;
        }

        if (totalGain > 0) {
            const gain = Math.floor(totalGain);
            this.game.addCredits(gain);
            
            // Log entry for financial transparency
            this.game.logManager?.addEntry('MARKET', `Sold ${itemsSoldCount} assets for $${gain.toLocaleString()}. (Slippage applied to surplus volume)`, 'success');

            if (this.game.hudManager) {
                this.game.hudManager.showToast(`EXCHANGE COMPLETE: +$${gain.toLocaleString()}`, 5000, 'success');
                this.game.hudManager.updateHUD(); 
            }
            this.saveMarketData();
            this.saveModules(); 
        }
    }

    buyModule(moduleId) {
        const module = this.MODULE_CATALOG[moduleId];
        if (!module) return;

        if (this.installedModules.has(moduleId)) {
            if (this.game.hudManager) this.game.hudManager.showToast("MODULE ALREADY INSTALLED", 3000, 'warning');
            return;
        }

        if (this.game.credits >= module.cost) {
            this.game.removeCredits(module.cost);
            this.installedModules.add(moduleId);
            
            this.applyModuleEffect(moduleId);
            this.saveModules();
            
            if (this.game.hudManager) {
                this.game.hudManager.showToast(`PURCHASED: ${module.name.toUpperCase()}`, 5000, 'info');
                this.game.hudManager.updateHUD();
            }
        } else {
            if (this.game.hudManager) this.game.hudManager.showToast("INSUFFICIENT CREDITS", 3000, 'error');
        }
    }

    buySupply(type) {
        const supply = SUPPLY_TYPES[type];
        if (!supply) return;

        if (this.game.credits >= supply.cost) {
            this.game.removeCredits(supply.cost);
            
            // Add to player supplies (new inventory category)
            if (!this.game.playerSupplies) this.game.playerSupplies = {};
            this.game.playerSupplies[type] = (this.game.playerSupplies[type] || 0) + 1;
            
            // Log transaction
            this.game.logManager?.addEntry('ECONOMY', `Purchased ${supply.name}: -$${supply.cost}`, 'success');
            
            if (this.game.hudManager) {
                this.game.hudManager.showToast(`BOUGHT: ${supply.name.toUpperCase()} ${supply.icon}`, 3000, 'success');
                this.game.hudManager.updateHUD();
            }
            
            // Special effect for repairs: Apply instantly if possible
            if (type === 'repairs' && this.game.playerShip) {
                const ship = this.game.playerShip;
                if (ship.hullHealth < ship.maxHull) {
                    ship.hullHealth = Math.min(ship.maxHull, ship.hullHealth + 25);
                    this.game.playerSupplies[type]--; // Consume immediately
                    this.game.hudManager.showToast("REPAIR KIT APPLIED: +25 HULL", 4000, 'success');
                }
            }
        } else {
            this.game.hudManager?.showToast("INSUFFICIENT CREDITS", 3000, 'error');
        }
    }

    applyModuleEffect(moduleId) {
        const module = this.MODULE_CATALOG[moduleId];
        if (!module || !this.game.playerShip) return;

        const ship = this.game.playerShip;
        const bonus = module.bonus;

        switch (module.stat) {
            case 'maxShield':
                ship.maxShield += bonus;
                ship.shield += bonus;
                break;
            case 'maxHull':
                ship.maxHull += bonus;
                ship.hullHealth += bonus;
                break;
            case 'fireRate':
                // Careful: fireRate is delay, so lower is better
                this.game.playerFireRate = (this.game.playerFireRate || 600) + bonus;
                break;
            case 'acceleration':
                ship.acceleration *= (1 + bonus);
                break;
            case 'bulletDamage':
                this.game.playerBulletDamage = (this.game.playerBulletDamage || 20) + bonus;
                break;
            case 'bulletSpeed':
                this.game.playerBulletSpeed = (this.game.playerBulletSpeed || 15) + bonus;
                break;
            // Additional stats will be hooked into the update loops
        }
    }

    // Passive regeneration and market cycle logic
    update(dt) {
        if (!this.game.playerShip || this.game.playerShip.hullHealth <= 0) return;

        const now = Date.now();
        
        // 1. Module Effects
        if (this.installedModules.has('nano_regen')) {
            const regen = this.MODULE_CATALOG['nano_regen'].bonus;
            this.game.playerShip.hullHealth = Math.min(this.game.playerShip.maxHull, this.game.playerShip.hullHealth + regen * dt);
        }

        // 2. Financial Cycle: Market Day Rotation
        if (now - this.lastMarketDayReset >= this.marketDayDuration) {
            this.rotateMarketDay();
            this.lastMarketDayReset = now;
        }
    }

    rotateMarketDay() {
        console.log("📈 [Market] Rotating Market Day. Calculating 30-Day Moving Averages...");
        
        let totalNPCTradeVolumeValue = 0;
        const currentSector = this.game.sectorManager?.getCurrentSectorData();
        const influence = currentSector?.influence || 0;
        const isPlayerTerritory = influence > 80 || currentSector?.faction === 'player';

        Object.keys(MINERAL_TYPES).forEach(type => {
            const data = this.priceIndex[type];
            if (!data) return;

            // Tracking Volume for Imperial Tax
            const npcVolume = data.dailyVol - (this.game.lastPlayerTradeVol || 0); // Simplified calculation
            totalNPCTradeVolumeValue += Math.max(0, npcVolume) * data.currentPrice;

            // Shift Daily Volume into History
            data.volHistory.push(data.dailyVol);
            if (data.volHistory.length > 30) data.volHistory.shift();

            // Calculate 30-Day MAV (Moving Average Volume)
            const mav = data.volHistory.reduce((a, b) => a + b, 0) / data.volHistory.length;
            
            // Collect Price Elasticity Logic (Task 13.3)
            // If current daily volume was high, crash the price for next day
            // If low, allow it to stabilize towards base value
            const elasticity = 0.05; // 5% shift per deviation
            const threshold = 1.25; // 25% over MAV triggers crash
            
            if (data.dailyVol > mav * threshold) {
                // Supply Overload -> Crash price
                data.currentPrice *= (1 - elasticity);
                console.log(`📉 ${type.toUpperCase()} Price Drop: High supply volume detected.`);
            } else if (data.dailyVol < mav * 0.75) {
                // Low Supply -> Price Recovery
                data.currentPrice = Math.min(MINERAL_TYPES[type].value * 2.0, data.currentPrice * (1 + elasticity));
            }

            // Reset for new day
            // We simulate collective NPC volume as a baseline (simulated active market)
            const baseNPCVol = Math.floor(Math.random() * 50) + 10;
            data.dailyVol = baseNPCVol;
        });

        // PHASE 18: Imperial Tax Collection
        if (isPlayerTerritory && totalNPCTradeVolumeValue > 0) {
            const taxRate = 0.01; // 1% tax on all NPC trade
            const taxCollected = Math.floor(totalNPCTradeVolumeValue * taxRate);
            this.game.credits += taxCollected;
            this.game.hudManager?.showToast(`🏛️ IMPERIAL TAX COLLECTED: +$${taxCollected.toLocaleString()} from ${currentSector.name}`, 6000, 'success');
            this.game.logManager?.addEntry('ECONOMY', `Imperial Tax collected from ${currentSector.name}: $${taxCollected.toLocaleString()}`, 'success');
        }

        this.saveMarketData();
        if (this.game.hudManager) this.game.hudManager.showToast("📈 Market Data Synchronized", 3000, 'info');
    }

    saveModules() {
        localStorage.setItem('interstellar_modules', JSON.stringify(Array.from(this.installedModules)));
    }

    loadModules() {
        try {
            const saved = localStorage.getItem('interstellar_modules');
            if (saved) {
                const arr = JSON.parse(saved);
                arr.forEach(mid => {
                    this.installedModules.add(mid);
                    // Effects will be re-applied after ship is initialized in script.js
                });
            }
        } catch (e) { console.error("Failed to load modules", e); }
    }

    saveMarketData() {
        localStorage.setItem('interstellar_market_index', JSON.stringify(this.priceIndex));
    }

    loadMarketData() {
        try {
            const saved = localStorage.getItem('interstellar_market_index');
            if (saved) {
                this.priceIndex = JSON.parse(saved);
            } else {
                // Initialize default index based on game-config.js
                Object.keys(MINERAL_TYPES).forEach(type => {
                    this.priceIndex[type] = {
                        currentPrice: MINERAL_TYPES[type].value,
                        volHistory: Array(30).fill(100), // Start with healthy baseline NPC volume
                        dailyVol: 100
                    };
                });
                this.saveMarketData();
            }
        } catch (e) { 
            console.error("Failed to load market data", e); 
        }
    }

    reapplyAllModules() {
        this.installedModules.forEach(mid => this.applyModuleEffect(mid));
    }
}

window.MarketplaceManager = MarketplaceManager;
