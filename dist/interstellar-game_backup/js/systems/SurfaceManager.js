/**
 * SurfaceManager.js
 * Handles planetary landing, surface exploration, and base-building operations.
 * Phase 11: Surface Operations Foundation
 */

class SurfaceManager {
    constructor(game) {
        this.game = game;
        this.activeSurface = null; // The planet currently landed on
        this.buildings = []; // Player-constructed buildings
        this.isLanding = false;
        
        // Building Types for Phase 12: Imperial Infrastructure
        this.BUILDING_TYPES = {
            'outpost': { name: 'Command Outpost', cost: 5000, population: 50, powerReq: 5, icon: '🏠', desc: 'Base of operations. Provides initial housing.' },
            'extractor': { name: 'Industrial Extractor', cost: 12000, genRate: 25, powerReq: 10, icon: '⛏️', desc: 'Mines minerals and generates passive credits.' },
            'shield_gen': { name: 'Atmospheric Shield', cost: 25000, powerReq: 20, icon: '🛡️', desc: 'Protects the surface from cosmic hazards.' },
            'solar_array': { name: 'Solar Relay', cost: 8000, powerGen: 50, icon: '⚡', desc: 'Generates power for colony systems.' },
            'research_lab': { name: 'Science Bay', cost: 15000, rpRate: 0.5, powerReq: 15, icon: '🧪', desc: 'Generates Research Points (RP) per minute.' }
        };
        
        this.lastProductionTick = Date.now();
    }

    init() {
        console.log("🌍 [Surface] Surface Operations Initialized.");
        this.loadSurfaceData();
    }

    update() {
        const now = Date.now();
        
        if (this.game.surfaceMode && this.activeSurface) {
            // Constant Oxygen Drain on Planet Surface
            if (!this.lastOxygenDrain || now - this.lastOxygenDrain > 10000) { // Every 10s on surface
                const scrubberBonus = this.calculateBuildingBonus('scrubbing');
                const drainRate = 0.1 * (1 - scrubberBonus);
                
                if (this.game.playerInventory.oxygen > 0) {
                    this.game.playerInventory.oxygen -= Math.max(0.01, drainRate);
                    this.game.hudManager.updateInventoryUI();
                    this.lastOxygenDrain = now;
                } else {
                    this.game.damagePlayer(1);
                    if (Math.random() < 0.1) this.game.hudManager.showToast("🛑 LIFE SUPPORT OFFLINE", 2000, 'error');
                }
            }
        }

        // Global Production Tick (Every 60 seconds, even if not on surface)
        if (now - this.lastProductionTick > 60000) {
            this.processResourceTick();
            this.lastProductionTick = now;
        }
    }

    processResourceTick() {
        if (!this.buildings || this.buildings.length === 0) return;
        
        let totalCredits = 0;
        let totalRP = 0;
        
        this.buildings.forEach(b => {
            const type = this.BUILDING_TYPES[b.type];
            if (!type) return;
            
            // Apply planetary efficiency multipliers
            const efficiency = this.getPlanetaryEfficiency(b.planet, b.type);
            
            if (type.genRate) totalCredits += type.genRate * efficiency;
            if (type.rpRate) totalRP += type.rpRate * efficiency;
        });

        if (totalCredits > 0) {
            this.game.credits += Math.floor(totalCredits);
            this.game.hudManager.updateWalletUI();
        }
        
        if (totalRP > 0 && this.game.colonyManager) {
            this.game.colonyManager.colony.researchPoints += totalRP;
            if (this.game.hudManager.updateColonyUI) this.game.hudManager.updateColonyUI();
        }

        if (totalCredits > 0 || totalRP > 0) {
            console.log(`🏗️ [Imperial Export] Collected $${Math.floor(totalCredits)} and ${totalRP.toFixed(1)} RP from colonies.`);
        }
    }

    getPlanetaryEfficiency(planetName, buildingType) {
        // High-level abstraction for Phase 12 modifiers
        const planet = this.game.planets?.find(p => p.name === planetName);
        if (!planet) return 1.0;

        let multiplier = 1.0;
        
        // Solar efficiency on Lava/Solar planets
        if (buildingType === 'solar_array') {
            if (planet.type === 'lava' || planet.type === 'solar') multiplier *= 1.5;
            if (planet.type === 'ice_giant') multiplier *= 0.5;
        }
        
        // Extraction efficiency on Metallic/Terrestrial
        if (buildingType === 'extractor') {
            if (planet.type === 'terrestrial') multiplier *= 1.2;
            if (planet.type === 'gas_giant') multiplier *= 0.2; // Harder to extract from gas
        }

        return multiplier;
    }

    calculateBuildingBonus(bonusType) {
        // Reserved for future scaling (e.g., tech tree integration)
        return 0;
    }

    /**
     * Initiates the landing sequence on a nearby planet.
     */
    initiateLanding() {
        const planet = this.findNearbyPlanet();
        if (!planet) {
            this.game.hudManager.showToast("🛑 NO PLANET IN RANGE", 3000, 'error');
            return;
        }

        if (this.game.playerShip.speed > 10) {
            this.hudManager.showToast("⚠️ REDUCE SPEED TO LAND", 3000, 'warning');
            return;
        }

        this.isLanding = true;
        this.game.hudManager.showToast(`🛰️ LANDING SEQUENCE INITIATED: ${planet.name}`, 4000, 'info');
        
        // Cinematic Landing Transition
        setTimeout(() => {
            this.completeLanding(planet);
        }, 3000);
    }

    findNearbyPlanet() {
        if (!this.game.planets) return null;
        return this.game.planets.find(p => {
            const dx = p.x - this.game.playerShip.x;
            const dy = p.y - this.game.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            return dist < 400 + (p.radius || 100);
        });
    }

    completeLanding(planet) {
        this.activeSurface = planet;
        this.isLanding = false;
        this.game.surfaceMode = true;
        this.game.flightMode = false;
        
        this.game.logManager?.addEntry('SYSTEM', `Landed on ${planet.name}. Oxygen consumption active.`, 'success');
        this.game.hudManager.showToast(`📍 TOUCHDOWN: ${planet.name.toUpperCase()}`, 5000, 'success');
        
        // Trigger UI Refresh
        if (this.game.hudManager) {
            if (this.game.hudManager.updateSurfaceUI) this.game.hudManager.updateSurfaceUI();
            if (this.game.hudManager.updateMissionHUD) this.game.hudManager.updateMissionHUD();
        }
    }

    takeOff() {
        if (!this.game.surfaceMode) return;
        
        this.game.surfaceMode = false;
        this.game.flightMode = true;
        this.activeSurface = null;
        
        const overlay = document.getElementById('surfaceOverlay');
        if (overlay) overlay.style.display = 'none';

        this.game.hudManager.showToast("🚀 ASCENDING TO ORBIT", 3000, 'info');
    }

    placeBuilding(type, x, y) {
        const bType = this.BUILDING_TYPES[type];
        if (!bType) return;

        if (this.game.credits >= bType.cost) {
            this.game.removeCredits(bType.cost);
            const building = {
                id: `build_${Date.now()}`,
                type: type,
                x: x, y: y,
                planet: this.activeSurface ? this.activeSurface.name : 'unknown'
            };
            this.buildings.push(building);
            
            // Update Colony Stats
            if (this.game.colonyManager) {
                const cm = this.game.colonyManager.colony;
                if (bType.population) cm.population += bType.population;
                if (bType.powerGen) cm.powerGenerated += bType.powerGen;
                if (bType.powerReq) cm.powerConsumed += bType.powerReq;
                this.game.colonyManager.checkMilestones();
            }

            this.saveSurfaceData();
            this.game.logManager?.addEntry('EMPIRE', `Constructed ${bType.name} on ${building.planet}`);
            
            if (this.game.hudManager && this.game.hudManager.updateMissionHUD) {
                this.game.hudManager.updateMissionHUD();
            }
            return true;
        } else {
            this.game.hudManager?.showToast(`Insufficient Credits: $${bType.cost} required.`, 3000, 'error');
        }
        return false;
    }

    saveSurfaceData() {
        localStorage.setItem('surface_buildings', JSON.stringify(this.buildings));
    }

    loadSurfaceData() {
        try {
            const saved = localStorage.getItem('surface_buildings');
            if (saved) this.buildings = JSON.parse(saved);
        } catch (e) { console.error("Surface Load Error", e); }
    }
}

window.SurfaceManager = SurfaceManager;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SurfaceManager;
}
