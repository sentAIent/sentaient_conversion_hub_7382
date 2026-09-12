class CapitalShipManager {
    constructor(game) {
        this.game = game;
    }

    spawnCapitalShip(type, x, y) {
        if (!this.game.capitalShips) this.game.capitalShips = [];
        
        let ship = {
            id: Date.now(),
            type: type,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            rotation: 0,
            targetRotation: 0,
            state: 'warp_in',
            timer: 0,
            components: []
        };

        if (type === 'void_dreadnought') {
            ship.faction = 'xenon';
            ship.components = [
                { id: 'core', type: 'core', offsetX: 0, offsetY: 0, size: 100, health: 10000, maxHealth: 10000, alive: true, invulnerable: true },
                { id: 'shield_l', type: 'shield_gen', offsetX: -80, offsetY: -50, size: 30, health: 1500, maxHealth: 1500, alive: true, active: true },
                { id: 'shield_r', type: 'shield_gen', offsetX: -80, offsetY: 50, size: 30, health: 1500, maxHealth: 1500, alive: true, active: true },
                { id: 'drive', type: 'thruster', offsetX: -160, offsetY: 0, size: 40, health: 2000, maxHealth: 2000, alive: true }
            ];
            ship.maxSpeed = 1.5;
            ship.turnSpeed = 0.005;
        }

        this.game.capitalShips.push(ship);
        this.game.hudManager.showToast(`⚠️ WARNING: MASSIVE SLIPSPACE ANOMALY DETECTED.`, 5000);
        if (window.gameAudio) window.gameAudio.playBossAlert();
    }

    update() {
        if (!this.game.flightMode || !this.game.capitalShips) return;

        const dt = this.game.timeScale || 1.0;
        const player = this.game.playerShip;
        const now = Date.now();

        for (let i = this.game.capitalShips.length - 1; i >= 0; i--) {
            let ship = this.game.capitalShips[i];

            // AI Logic
            const distToPlayer = Math.hypot(ship.x - player.x, ship.y - player.y);
            const angleToPlayer = Math.atan2(player.y - ship.y, player.x - ship.x);

            if (ship.state === 'warp_in') {
                ship.timer += dt;
                if (ship.timer > 120) { // 2 seconds at 60fps
                    ship.state = 'combat';
                }
            } else if (ship.state === 'combat') {
                // Determine invulnerability of core
                const shieldL = ship.components.find(c => c.id === 'shield_l');
                const shieldR = ship.components.find(c => c.id === 'shield_r');
                const core = ship.components.find(c => c.id === 'core');
                
                if (core) {
                    core.invulnerable = (shieldL && shieldL.alive) || (shieldR && shieldR.alive);
                }

                // Check death
                if (core && !core.alive) {
                    ship.state = 'exploding';
                    ship.timer = 0;
                    this.game.credits += 10000;
                    this.game.hudManager.showToast('✨ CAPITAL SHIP DESTROYED! +$10,000');
                    if (window.gameAudio) window.gameAudio.playBossDeath();
                    continue; // Skip movement, it's dying
                }

                // Movement
                const drive = ship.components.find(c => c.id === 'drive');
                let currentMaxSpeed = drive && drive.alive ? ship.maxSpeed : ship.maxSpeed * 0.2; // Crippled if drive dead
                
                let aDiff = angleToPlayer - ship.rotation;
                while (aDiff > Math.PI) aDiff -= Math.PI * 2;
                while (aDiff < -Math.PI) aDiff += Math.PI * 2;
                
                ship.rotation += Math.sign(aDiff) * Math.min(Math.abs(aDiff), ship.turnSpeed * dt);

                if (distToPlayer > 800) {
                    ship.vx += Math.cos(ship.rotation) * 0.05 * dt;
                    ship.vy += Math.sin(ship.rotation) * 0.05 * dt;
                } else if (distToPlayer < 400) {
                    ship.vx -= Math.cos(ship.rotation) * 0.05 * dt; // Back away slowly
                    ship.vy -= Math.sin(ship.rotation) * 0.05 * dt;
                }

                // Fire Weapons
                if (now % 60 === 0 && distToPlayer < 1500) {
                     // Fire from core
                     this.game.enemyBullets.push({
                         x: ship.x, y: ship.y,
                         vx: Math.cos(ship.rotation) * 8,
                         vy: Math.sin(ship.rotation) * 8,
                         damage: Math.floor(25 + Math.random() * 10),
                         life: 300,
                         faction: ship.faction
                     });
                     
                     // If shields are up, fire dual lasers!
                     if (shieldL && shieldL.alive && shieldR && shieldR.alive && Math.random() > 0.5) {
                         const lx = ship.x + Math.cos(ship.rotation) * shieldL.offsetX - Math.sin(ship.rotation) * shieldL.offsetY;
                         const ly = ship.y + Math.sin(ship.rotation) * shieldL.offsetX + Math.cos(ship.rotation) * shieldL.offsetY;
                         
                         const rx = ship.x + Math.cos(ship.rotation) * shieldR.offsetX - Math.sin(ship.rotation) * shieldR.offsetY;
                         const ry = ship.y + Math.sin(ship.rotation) * shieldR.offsetX + Math.cos(ship.rotation) * shieldR.offsetY;

                         this.game.enemyBullets.push({
                             x: lx, y: ly,
                             vx: Math.cos(angleToPlayer - 0.1) * 12,
                             vy: Math.sin(angleToPlayer - 0.1) * 12,
                             damage: 15,
                             life: 300,
                             faction: ship.faction
                         });
                         this.game.enemyBullets.push({
                             x: rx, y: ry,
                             vx: Math.cos(angleToPlayer + 0.1) * 12,
                             vy: Math.sin(angleToPlayer + 0.1) * 12,
                             damage: 15,
                             life: 300,
                             faction: ship.faction
                         });
                     }
                }
            } else if (ship.state === 'exploding') {
                ship.timer += dt;
                ship.vx *= 0.95;
                ship.vy *= 0.95;
                
                if (Math.random() > 0.7) {
                    const ex = ship.x + (Math.random() - 0.5) * 300;
                    const ey = ship.y + (Math.random() - 0.5) * 200;
                    this.game.createExplosion(ex, ey, 'boss');
                }

                if (ship.timer > 180) { // Explode for 3 seconds
                    this.game.createExplosion(ship.x, ship.y, 'boss');
                    this.game.createExplosion(ship.x+100, ship.y+50, 'boss');
                    this.game.createExplosion(ship.x-100, ship.y-50, 'boss');
                    // Drop loot
                    for(let j=0; j<15; j++) {
                        this.game.minerals.push({
                            id: Date.now() + j,
                            type: 'darkmatter', name: 'Dark Matter', rarity: 'mythic', color: '#8a2be2', value: 250, size: 10,
                            x: ship.x + (Math.random() - 0.5) * 400,
                            y: ship.y + (Math.random() - 0.5) * 400,
                            z: (Math.random()-0.5)*100
                        });
                    }
                    this.game.capitalShips.splice(i, 1);
                    continue;
                }
            }

            // Apply Velocity
            const speed = Math.hypot(ship.vx, ship.vy);
            const currentMaxSpeed = (ship.components.find(c => c.id === 'drive') && ship.components.find(c => c.id === 'drive').alive) ? ship.maxSpeed : ship.maxSpeed * 0.2;
            if (speed > currentMaxSpeed) {
                ship.vx = (ship.vx / speed) * currentMaxSpeed;
                ship.vy = (ship.vy / speed) * currentMaxSpeed;
            }
            ship.x += ship.vx * dt;
            ship.y += ship.vy * dt;
        }
    }
}

window.CapitalShipManager = CapitalShipManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.CapitalShipManager = CapitalShipManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CapitalShipManager;
}
