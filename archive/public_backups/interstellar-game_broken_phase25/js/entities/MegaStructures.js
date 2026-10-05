/**
 * MegaStructures.js
 * Implementation of ancient and player-built structures (Warp Gates, Dyson Swarms).
 * Phase 17-1: The Cosmic Nexus
 */

class WarpGateManager {
    constructor(game) {
        this.game = game;
        this.gates = [];
        this.activeGate = null;
    }

    addGate(name, x, y, type = 'player') {
        const gate = new WarpGate(this.game, name, x, y, type);
        this.gates.push(gate);
        console.log(`[Nexus] Warp Gate Registered: ${name} at ${x}, ${y}`);
        return gate;
    }

    update(dt) {
        this.activeGate = null;
        this.gates.forEach(gate => {
            gate.update(dt);
            if (gate.isPlayerNear) {
                this.activeGate = gate;
            }
        });
    }

    getNetwork() {
        // Return list of all other gates for the jump UI
        return this.gates.map((g, index) => ({
            index,
            name: g.name,
            x: g.x,
            y: g.y,
            type: g.type
        }));
    }

    jumpTo(targetSectorX, targetSectorY) {
        if (this.game.sectorManager) {
            this.game.sectorManager.jumpToSector(targetSectorX, targetSectorY);
        } else {
            console.error("[Nexus] SectorManager not found. Fallback jump failed.");
        }
    }

    saveMegaStructures() {
        const data = this.gates.map(g => ({
            name: g.name, x: g.x, y: g.y, z: g.z || 0, type: g.type, structType: g.structType
        }));
        localStorage.setItem('megaStructures', JSON.stringify(data));
    }

    loadMegaStructures() {
        try {
            const data = JSON.parse(localStorage.getItem('megaStructures')) || [];
            data.forEach(d => {
                if (d.structType === 'dyson') this.addDysonSwarm(d.name, d.x, d.y);
                else if (d.structType === 'ring') this.addRingWorld(d.name, d.x, d.y);
                else if (d.structType === 'beacon') this.addGreatBeacon(d.name, d.x, d.y);
                else if (d.structType === 'gateway') this.addGateway(d.name, d.x, d.y);
                else if (d.structType === 'outpost') this.addOutpost(d.name, d.x, d.y);
                else if (d.structType === 'infinity') this.addInfinityGate(d.name, d.x, d.y);
                else this.addGate(d.name, d.x, d.y, d.type);
            });
        } catch (e) { console.error("Failed to load mega structures", e); }
    }

    addGreatBeacon(name, x, y) {
        const beacon = new GreatBeacon(this.game, name, x, y);
        this.gates.push(beacon);
        this.saveMegaStructures();
        return beacon;
    }

    addDysonSwarm(name, x, y) {
        const swarm = new DysonSwarm(this.game, name, x, y);
        this.gates.push(swarm); // Generic list for tracking
        this.saveMegaStructures();
        return swarm;
    }

    addRingWorld(name, x, y) {
        const ring = new RingWorld(this.game, name, x, y);
        this.gates.push(ring);
        this.saveMegaStructures();
        return ring;
    }

    addGateway(name, x, y) {
        const gateway = new AncientGateway(this.game, name, x, y);
        this.gates.push(gateway);
        this.saveMegaStructures();
        return gateway;
    }

    addOutpost(name, x, y) {
        const outpost = new DeepSpaceOutpost(this.game, name, x, y);
        this.gates.push(outpost);
        this.saveMegaStructures();
        return outpost;
    }

    addInfinityGate(name, x, y) {
        const gate = new InfinityGate(this.game, name, x, y);
        this.gates.push(gate);
        this.saveMegaStructures();
        return gate;
    }

    calculateGlobalGains() {
        let energyMult = 1.0;
        let popBonus = 0;
        
        this.gates.forEach(g => {
            if (g.structType === 'dyson') energyMult += 0.5;
            if (g.structType === 'ring') popBonus += 5000;
        });
        
        return { energyMult, popBonus };
    }
}

class WarpGate {
    constructor(game, name, x, y, type) {
        this.game = game;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.type = type; // 'ancient' or 'player'
        this.structType = 'gate';
        this.isPlayerNear = false;
        this.rotation = 0;
        this.pulse = 0;
    }

    update(dt) {
        const dx = this.game.playerShip.x - this.x;
        const dy = this.game.playerShip.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        this.isPlayerNear = dist < 1200;
        this.rotation += 0.01 * dt;
        this.pulse = (Math.sin(Date.now() * 0.002) + 1) / 2;

        // If Jumping, handle transition
        if (this.isJumping) {
            this.jumpTimer = (this.jumpTimer || 0) + dt;
            const chargeTime = 120; // 2s at 60fps
            const tunnelTime = 300; // 5s at 60fps
            
            // Phase 1: Charging (Screen Shake + Intensity)
            if (this.jumpTimer < chargeTime) {
                const p = this.jumpTimer / chargeTime;
                this.game.warpIntensity = p * 0.2;
                this.game.bgWarpMode = true;
                
                // Use Cinematic Manager for intense camera work
                if (this.game.cinematicManager) {
                    this.game.camera.shakeX = (Math.random()-0.5) * p * 20;
                    this.game.camera.shakeY = (Math.random()-0.5) * p * 20;
                }
            } 
            // Phase 2: Tunnel (Full speed)
            else if (this.jumpTimer < chargeTime + tunnelTime) {
                this.game.warpIntensity = 1.0;
                this.game.bgWarpMode = true;
                
                if (this.jumpTimer > chargeTime + tunnelTime/2 && !this.hasSectorJumped) {
                    this.hasSectorJumped = true;
                    this.executeActualJump();
                    // Flash upon arrival
                    if (this.game.cinematicManager) {
                        this.game.cinematicManager.flash('#ffffff', 1200);
                    }
                }
            } 
            // Phase 3: Exit
            else {
                this.isJumping = false;
                this.game.bgWarpMode = false;
                this.game.warpIntensity = 0;
                if (this.game.cinematicManager) {
                    this.game.cinematicManager.exitCinematic();
                }
            }
        }
    }

    triggerJump(targetX, targetY) {
        if (this.isJumping) return;
        this.isJumping = true;
        this.jumpTimer = 0;
        this.targetSector = { x: targetX, y: targetY };
        this.hasSectorJumped = false;
        
        if (this.game.cinematicManager) {
            this.game.cinematicManager.setLetterbox(true);
        }

        this.game.hudManager.showToast("🚀 NEXUS WARP ENGAGED. PREPARING FOR DIMENSIONAL SHIFT...", 4000, 'warning');
    }

    executeActualJump() {
        if (this.game.sectorManager) {
            this.game.sectorManager.jumpToSector(this.targetSector.x, this.targetSector.y);
            this.game.hudManager.showToast(`✨ ARRIVED AT SECTOR [${this.targetSector.x}, ${this.targetSector.y}]`, 3000, 'success');
        }
    }
}

class DysonSwarm {
    constructor(game, name, x, y) {
        this.game = game;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.structType = 'dyson';
        this.rotation = 0;
        this.panels = [];
        this.radius = 800; // Radius around the star
        
        // Generate panels
        // Generate panels with volumetric data
        for (let i = 0; i < 60; i++) {
            this.panels.push({
                angle: Math.random() * Math.PI * 2,
                orbitSpeed: 0.0005 + Math.random() * 0.001,
                orbitRadius: this.radius * (0.85 + Math.random() * 0.3),
                tilt: (Math.random() - 0.5) * 0.7,
                size: 30 + Math.random() * 40,
                color: Math.random() > 0.5 ? '#ffd700' : '#ffa500',
                zDepth: (Math.random() - 0.5) * 300 // Layered depth
            });
        }
    }

    update(dt) {
        this.rotation += 0.005 * dt;
        this.panels.forEach(p => {
            p.angle += p.orbitSpeed * dt;
        });
        // PHASE 17: Energy output is handled by calculateGlobalGains
    }
}

class RingWorld {
    constructor(game, name, x, y) {
        this.game = game;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.structType = 'ring';
        this.rotation = 0;
        this.radius = 1200; // Radius around the planet
        this.width = 150;
        
        // Ring segments for complex rendering
        this.rings = [];
        for (let i = 0; i < 5; i++) {
            this.rings.push({
                radius: this.radius + (i * 10),
                opacity: 0.2 + (Math.random() * 0.3),
                speed: 0.0001 * (i + 1)
            });
        }
    }

    update(dt) {
        this.rotation += 0.002 * dt;
    }
}

class GreatBeacon {
    constructor(game, name, x, y) {
        this.game = game;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.structType = 'beacon';
        this.rotation = 0;
        this.pulse = 0;
        this.signalRadius = 5000;
        this.isPlayerNear = false;
        this.charge = 0; // 0 to 1.0 for Ascension trigger
    }

    update(dt) {
        const dx = this.game.playerShip.x - this.x;
        const dy = this.game.playerShip.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        this.isPlayerNear = dist < 2000;
        this.rotation += 0.015 * dt;
        this.pulse = (Math.sin(Date.now() * 0.003) + 1) / 2;
        
        if (this.isPlayerNear && this.game.isGreatBeaconConditionMet()) {
            this.charge = Math.min(1.0, this.charge + 0.002 * dt);
            if (this.charge >= 1.0) {
                this.game.initiateEternalAscension();
            }
        } else {
            this.charge = Math.max(0, this.charge - 0.005 * dt);
        }
    }
}

class AncientGateway extends WarpGate {
    constructor(game, name, x, y) {
        super(game, name, x, y, 'ancient');
        this.structType = 'gateway';
    }
    
    executeActualJump() {
        // Ancient Gateways trigger unpredictable long-range jumps
        const rx = (Math.random() - 0.5) * 400; // Expanded range (-200 to 200)
        const ry = (Math.random() - 0.5) * 400;
        if (this.game.sectorManager) {
            this.game.sectorManager.jumpToSector(Math.round(rx), Math.round(ry));
            if (this.game.hudManager) {
                this.game.hudManager.showToast(`⚠️ ANCIENT GATEWAY MALFUNCTION: JUMPED TO DEEP SECTOR [${Math.round(rx)}, ${Math.round(ry)}]`, 6000, 'warning');
            }
        }
    }
}

class DeepSpaceOutpost {
    constructor(game, name, x, y) {
        this.game = game;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.structType = 'outpost';
        this.rotation = 0;
        this.radius = 450;
        this.interactionRange = 1200;
        this.isPlayerNear = false;
        this.isDocked = false;
        this.merchant = {
            id: `merchant_${name.replace(/\s+/g, '_').toLowerCase()}`,
            name: `${name} Trade Hub`,
            inventory: [],
            repRequirement: 0
        };
    }

    update(dt) {
        const dx = this.game.playerShip.x - this.x;
        const dy = this.game.playerShip.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        this.isPlayerNear = dist < this.interactionRange;
        this.rotation += 0.005 * dt;

        // Auto-undock if too far
        if (this.isDocked && dist > this.interactionRange * 1.5) {
            this.isDocked = false;
            if (this.game.hudManager) this.game.hudManager.showToast("DOCKING DISENGAGED (OUT OF RANGE)");
        }
    }
}

class InfinityGate extends AncientGateway {
    constructor(game, name, x, y) {
        super(game, name || "The Infinity Mirror", x, y);
        this.structType = 'infinity';
    }

    triggerJump() {
        if (this.game.isInfinityJumping) return;
        
        const legacyData = this.game.legacyData || { legacyPoints: 0 };
        const legacyPoints = legacyData.legacyPoints || 0;
        
        if (legacyPoints < 10) {
            this.game.hudManager.showToast(`🔒 ACCESS DENIED: Requires 10 Eternal Legacy (Current: ${legacyPoints})`, 5000, 'error');
            return;
        }

        // Trigger the cinematic jump immediately
        this.game.triggerInfinityJump();
    }

    executeActualJump() {
        // Handled directly by triggerJump -> game.triggerInfinityJump
    }
}

window.WarpGateManager = WarpGateManager;
window.MegaStructures = WarpGateManager; // Alias for Phase 18 compatibility
window.WarpGate = WarpGate;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.WarpGateManager = WarpGateManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WarpGateManager;
}
