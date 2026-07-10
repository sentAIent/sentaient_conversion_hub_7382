export class ShipFactory {
    constructor(engine) {
        this.engine = engine; // Reference to InterstellarEngine
        
        // Current state
        this.currentChassis = 'interceptor'; // Default
        this.equipped = {
            weapons: null,
            shields: null,
            engines: null,
            core: null
        };
        
        this.availableComponents = {
            chassis: [
                { id: 'interceptor', name: 'Interceptor', speed: 90, fire: 30, shield: 50, energy: 100, color: '#00f3ff' },
                { id: 'cruiser', name: 'Cruiser', speed: 60, fire: 70, shield: 120, energy: 150, color: '#ff0055' },
                { id: 'carrier', name: 'Carrier', speed: 40, fire: 50, shield: 200, energy: 300, color: '#ffd700' }
            ],
            weapons: [
                { id: 'w1', name: 'Plasma Repeaters', fire: +20, energy: -10, color: '#ff0055', desc: 'Fast firing plasma bolts' },
                { id: 'w2', name: 'Railgun', fire: +40, energy: -30, color: '#aa00ff', desc: 'High damage, slow fire rate' }
            ],
            shields: [
                { id: 's1', name: 'Deflector Matrix', shield: +50, energy: -20, color: '#00f3ff', desc: 'Standard shielding array' },
                { id: 's2', name: 'Aegis Core', shield: +100, energy: -50, color: '#00ff66', desc: 'Heavy duty impact shielding' }
            ],
            engines: [
                { id: 'e1', name: 'Ion Thrusters', speed: +20, energy: -10, color: '#00f3ff', desc: 'Increases base speed' },
                { id: 'e2', name: 'Warp Drive', speed: +50, energy: -40, color: '#aa00ff', desc: 'Allows short bursts of extreme speed' }
            ],
            core: [
                { id: 'c1', name: 'Fusion Reactor', energy: +100, desc: 'Increases total energy capacity' },
                { id: 'c2', name: 'Antimatter Cell', energy: +250, desc: 'Massive energy reserves for heavy loadouts' }
            ]
        };
    }
    
    getChassisData(id) {
        return this.availableComponents.chassis.find(c => c.id === id);
    }
    
    equipComponent(category, itemId) {
        if (category === 'chassis') {
            this.currentChassis = itemId;
            // Clear equipped if incompatible? For now just keep them.
        } else {
            // Toggle
            if (this.equipped[category] === itemId) {
                this.equipped[category] = null; // Unequip
            } else {
                this.equipped[category] = itemId;
            }
        }
    }
    
    calculateStats() {
        const chassis = this.getChassisData(this.currentChassis);
        if (!chassis) return { speed: 0, fire: 0, shield: 0, energy: 0 };
        
        let stats = {
            speed: chassis.speed,
            fire: chassis.fire,
            shield: chassis.shield,
            energy: chassis.energy
        };
        
        for (const cat in this.equipped) {
            const itemId = this.equipped[cat];
            if (!itemId) continue;
            
            const itemDef = this.availableComponents[cat].find(i => i.id === itemId);
            if (itemDef) {
                if (itemDef.speed) stats.speed += itemDef.speed;
                if (itemDef.fire) stats.fire += itemDef.fire;
                if (itemDef.shield) stats.shield += itemDef.shield;
                if (itemDef.energy) stats.energy += itemDef.energy;
            }
        }
        
        return stats;
    }
}
