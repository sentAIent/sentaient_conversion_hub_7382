/**
 * Drones.js
 * Automated resource harvesters for the Galactic Empire expansion (Phase 16).
 */
class DroneManager {
    constructor(game) {
        this.game = game;
        this.drones = [];
        this.platforms = [];
        this.lastUpdateTime = Date.now();
    }

    spawnDrone(base) {
        const drone = new Drone(this.game, base);
        this.drones.push(drone);
        return drone;
    }

    spawnPlatform(base) {
        const platform = new DefensePlatform(this.game, base);
        this.platforms.push(platform);
        return platform;
    }

    spawnRivalDrone(outpost) {
        const drone = new Drone(this.game, outpost);
        drone.alignment = 'rival';
        drone.color = outpost.color;
        this.drones.push(drone);
        return drone;
    }

    update(dt) {
        this.drones.forEach(drone => drone.update(dt));
        this.platforms.forEach(platform => platform.update(dt));
        
        // Automated Spawning (Sync with bases)
        if (this.game.frameCounter % 300 === 0) {
            this.syncWithBases();
        }
    }

    syncWithBases() {
        if (!this.game.spaceBases) return;

        this.game.spaceBases.forEach(base => {
            if (!base.isDeployed) return;

            // Count modules
            let hangarCount = 0;
            let defCount = 0;
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    if (base[`cell_${x}_${y}`] === 'hangar') hangarCount++;
                    if (base[`cell_${x}_${y}`] === 'def') defCount++;
                }
            }

            // Maintain 2 drones per hangar
            const targetDrones = hangarCount * 2;
            const currentDrones = this.drones.filter(d => d.homeBase === base).length;
            if (currentDrones < targetDrones) {
                this.spawnDrone(base);
                console.log(`[Empire] Spawned mining drone at ${base.planetName}`);
            }

            // Maintain 1 defense platform per def module
            const targetPlatforms = defCount;
            const currentPlatforms = this.platforms.filter(p => p.homeBase === base).length;
            if (currentPlatforms < targetPlatforms) {
                this.spawnPlatform(base);
                console.log(`[Empire] Deployed orbital platform at ${base.planetName}`);
            }
        });
    }
}

class Drone {
    constructor(game, homeBase) {
        this.game = game;
        this.homeBase = homeBase;
        this.x = homeBase.x + (Math.random() - 0.5) * 200;
        this.y = homeBase.y + (Math.random() - 0.5) * 200;
        this.vx = 0;
        this.vy = 0;
        this.rotation = Math.random() * Math.PI * 2;
        this.state = 'IDLE'; // IDLE, HUNTING, GATHERING, RETURNING
        this.targetGem = null;
        this.cargo = null;
        this.speed = 4.0;
        this.alignment = 'player'; // 'player' or 'rival'
        this.color = '#00ffaa';
        this.acceleration = 0.15;
        this.scanRange = 3000;
    }

    update(dt) {
        switch (this.state) {
            case 'IDLE':
                this.checkLogisticsDuty() || this.findNearestGem();
                break;
            case 'HUNTING':
                this.moveToTarget(this.targetGem, dt);
                this.collectResource();
                break;
            case 'RETURNING':
                this.moveToTarget(this.homeBase, dt);
                this.depositResource();
                break;
            case 'TRANSPORTING': // New state for inter-base logistics
                this.moveToTarget(this.targetBase, dt);
                this.deliverCargo();
                break;
            case 'CONVOY': // Long-range trade route
                this.handleConvoy(dt);
                break;
        }

        // Apply physics
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        
        // Drag
        const friction = Math.pow(0.95, dt);
        this.vx *= friction;
        this.vy *= friction;
    }

    checkLogisticsDuty() {
        // If this base has a logistics module, it can dispatch cargo drones to remote outposts
        const hasLogistics = Object.values(this.homeBase).some(val => val === 'log');
        if (!hasLogistics) return false;

        // Look for other bases with surplus gems
        const surplusBase = this.game.spaceBases.find(b => {
            if (b === this.homeBase) return false;
            // A base has surplus if it has gems but NO logistics module of its own to process them
            const bHasLog = Object.values(b).some(val => val === 'log');
            if (bHasLog) return false;
            
            return b.inventory && Object.values(b.inventory).some(count => count > 5);
        });

        if (surplusBase) {
            this.targetBase = surplusBase;
            this.state = 'TRANSPORTING';
            return true;
        }
        
        // Phase 17-3: Trade Convoy Opportunity
        if (Math.random() < 0.01 && this.game.spaceBases.length > 1) {
            const dest = this.game.spaceBases.find(b => b !== this.homeBase);
            if (dest) {
                this.targetBase = dest;
                this.state = 'CONVOY';
                return true;
            }
        }
        return false;
    }

    handleConvoy(dt) {
        this.moveToTarget(this.targetBase, dt);
        const dist = Math.hypot(this.x - this.targetBase.x, this.y - this.targetBase.y);
        if (dist < 200) {
            // Arrival! Award trade bonus
            this.game.credits += 1000;
            if (this.game.hudManager) this.game.hudManager.showToast(`TRADE CONVOY ARRIVED: +$1,000`, 2000, 'success');
            this.state = 'RETURNING'; // Head home
            this.targetBase = this.homeBase;
        }
    }

    findNearestGem() {
        let nearest = null;
        let minDist = this.scanRange;

        // Clean up: Ensure we're targeting game.minerals or game.gems
        const targets = this.game.minerals || this.game.gems || [];
        targets.forEach(gem => {
            const d = Math.hypot(gem.x - this.x, gem.y - this.y);
            if (d < minDist) {
                minDist = d;
                nearest = gem;
            }
        });

        if (nearest) {
            this.targetGem = nearest;
            this.state = 'HUNTING';
        } else {
            this.moveToTarget(this.homeBase, 0.2);
        }
    }

    moveToTarget(target, dt) {
        if (!target) return;
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);

        // Slow down when close to homeBase to avoid overshooting
        const arrivalDist = 100;
        const maxSpeed = (this.state === 'TRANSPORTING' ? (this.speed * 2 * (this.game.cargoTransferMultiplier || 1)) : (this.speed * (this.game.droneSpeedMultiplier || 1)));
        
        const targetSpeed = dist < arrivalDist ? (dist / arrivalDist) * maxSpeed : maxSpeed;
        const angle = Math.atan2(dy, dx);
        
        // Steering
        this.vx += Math.cos(angle) * this.acceleration;
        this.vy += Math.sin(angle) * this.acceleration;
        
        // Cap speed
        const currentSpeed = Math.hypot(this.vx, this.vy);
        if (currentSpeed > targetSpeed) {
            this.vx = (this.vx / currentSpeed) * targetSpeed;
            this.vy = (this.vy / currentSpeed) * targetSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.rotation = angle;
    }

    collectResource() {
        if (!this.targetGem) return;
        const dist = Math.hypot(this.targetGem.x - this.x, this.targetGem.y - this.y);
        
        if (dist < 50) {
            this.cargo = { ...this.targetGem };
            // Remove from world
            const list = this.game.minerals || this.game.gems || [];
            const idx = list.indexOf(this.targetGem);
            if (idx > -1) list.splice(idx, 1);
            
            this.targetGem = null;
            this.state = 'RETURNING';
        }
    }

    depositResource() {
        const dist = Math.hypot(this.homeBase.x - this.x, this.homeBase.y - this.y);
        if (dist < 100) {
            if (this.cargo) {
                const type = this.cargo.type || 'emerald';
                if (!this.homeBase.inventory) this.homeBase.inventory = {};
                this.homeBase.inventory[type] = (this.homeBase.inventory[type] || 0) + 1;
                this.cargo = null;
                this.game.baseBuilder.saveSpaceBases();
            }
            this.state = 'IDLE';
        }
    }

    deliverCargo() {
        const dist = Math.hypot(this.targetBase.x - this.x, this.targetBase.y - this.y);
        
        // Arrived at target base to pick up surplus
        if (dist < 100 && !this.cargo) {
            const inv = this.targetBase.inventory;
            if (inv) {
                const resType = Object.keys(inv).find(k => inv[k] > 0);
                if (resType) {
                    inv[resType]--;
                    this.cargo = { type: resType };
                    this.state = 'RETURNING'; // Bring it back to the hub
                    return;
                }
            }
            this.state = 'IDLE';
        }
    }
}

class DefensePlatform {
    constructor(game, homeBase) {
        this.game = game;
        this.homeBase = homeBase;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitRadius = 400 + Math.random() * 200;
        this.orbitSpeed = 0.002 + Math.random() * 0.002;
        this.x = homeBase.x + Math.cos(this.angle) * this.orbitRadius;
        this.y = homeBase.y + Math.sin(this.angle) * this.orbitRadius;
        this.size = 20;
        this.color = '#00ffaa';
        this.lastFireTime = 0;
        this.fireRate = 1000; // 1 second
        this.target = null;
    }

    update(dt) {
        // Orbital movement
        this.angle += this.orbitSpeed * dt;
        this.x = this.homeBase.x + Math.cos(this.angle) * this.orbitRadius;
        this.y = this.homeBase.y + Math.sin(this.angle) * this.orbitRadius;

        // Combat logic
        this.findTarget();
        if (this.target) {
            this.engageTarget();
        }
    }

    findTarget() {
        // Target hazards: Mines, Missile Bases, or enemy missiles near the base
        let nearest = null;
        let minDist = 1500;

        const hazards = [
            ...(this.game.spaceMines || []),
            ...(this.game.missileBases || []),
            ...(this.game.enemyMissiles || [])
        ];

        hazards.forEach(h => {
            const d = Math.hypot(h.x - this.x, h.y - this.y);
            if (d < minDist) {
                minDist = d;
                nearest = h;
            }
        });

        this.target = nearest;
    }

    engageTarget() {
        const now = Date.now();
        if (now - this.lastFireTime > this.fireRate) {
            // Fire defensive beam
            if (this.game.effectManager) {
                this.game.effectManager.spawnImpactIndustrial(this.x, this.y, this.target.x, this.target.y, '#00ffaa');
            }

            // Damage target
            if (this.target.health !== undefined) {
                this.target.health -= 25;
                if (this.target.health <= 0) {
                    // Force removal in their managers if possible, or mark as dead
                    this.target.dead = true; 
                    this.target.life = 0;
                }
            } else {
                // Instantly vaporize small hazards (mines/missiles)
                this.target.dead = true;
                this.target.life = 0;
            }

            this.lastFireTime = now;
            if (window.gameAudio) window.gameAudio.playLaserShoot();
        }
    }
}

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.DroneManager = DroneManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DroneManager;
}
