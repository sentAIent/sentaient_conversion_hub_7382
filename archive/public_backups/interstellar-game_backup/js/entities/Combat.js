class CombatManager {
    constructor(game) {
        this.game = game;
    }


    spawnEnemyShips() {
        if (!this.game.flightMode || !this.game.playerShip) return;

        const ship = this.game.playerShip;
        const spawnRadius = 2000;
        const minSpawnDist = 800;
        const targetCount = 4; // Max active enemies

        // Remove enemies too far away
        this.game.enemyShips = this.game.enemyShips.filter(e => {
            const dist = Math.hypot(e.x - ship.x, e.y - ship.y);
            return dist < spawnRadius * 2;
        });

        // Remove distant enemy bullets
        this.game.enemyBullets = this.game.enemyBullets.filter(b => {
            const dist = Math.hypot(b.x - ship.x, b.y - ship.y);
            return dist < spawnRadius * 2 && b.life > 0;
        });

        // Spawn new enemies
        while (this.game.enemyShips.length < targetCount) {
            const angle = Math.random() * Math.PI * 2;
            const dist = minSpawnDist + Math.random() * (spawnRadius - minSpawnDist);

            // Random type weighted: 50% scout, 35% fighter, 15% cruiser
            const roll = Math.random();
            let type = 'scout';
            if (roll > 0.85) type = 'cruiser';
            else if (roll > 0.5) type = 'fighter';

            const typeDef = ENEMY_TYPES[type];

            // Assign Faction dynamically
            const factions = ['xenon', 'mauler', 'terran'];
            let chosenFaction = factions[Math.floor(Math.random() * factions.length)];
            // Bias spawn to hostile factions (rep < -10)
            if (Math.random() > 0.4) {
                const hostiles = factions.filter(f => (this.game.factionRep[f] || 0) < -10);
                if (hostiles.length > 0) chosenFaction = hostiles[Math.floor(Math.random() * hostiles.length)];
            }

            this.game.enemyShips.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                vx: 0,
                vy: 0,
                rotation: Math.random() * Math.PI * 2,
                type: type,
                faction: chosenFaction, // Faction integration
                health: typeDef.health,
                maxHealth: typeDef.health,
                state: 'patrol', // patrol, chase, attack, flee
                patrolAngle: Math.random() * Math.PI * 2,
                patrolTimer: 0,
                lastFireTime: 0,
                burstRemaining: 0,
                burstTimer: 0,
                hitFlash: 0,
                isStalking: false, // New stalking state
                spawnTime: Date.now()
            });
        }
    }



    updateEnemyShips() {
        if (!this.game.flightMode || !this.game.playerShip) return;

        const ship = this.game.playerShip;
        const now = Date.now();
        const isPlayerCloaked = ship.isCloaked || ship.type === 'spectre';

        for (const enemy of this.game.enemyShips) {
            const typeDef = ENEMY_TYPES[enemy.type];

            // EMP FREEZE CHECK: Skip all AI logic while disabled
            if (enemy.disabled) {
                if (now >= enemy.disabledUntil) {
                    enemy.disabled = false; // Auto-unfreeze when timer expires
                } else {
                    // Apply friction to gradually stop the ship while frozen
                    enemy.vx *= 0.9;
                    enemy.vy *= 0.9;
                    enemy.x += enemy.vx;
                    enemy.y += enemy.vy;
                    continue; // Skip remaining AI logic
                }
            }

            // Default patrol target is in front of current patrol angle (not player)
            let targetX = enemy.x + Math.cos(enemy.patrolAngle || 0) * 500;
            let targetY = enemy.y + Math.sin(enemy.patrolAngle || 0) * 500;
            let targetShip = ship;
            let distToTarget = Infinity;
            let isTargetingPlayer = false;

            // 1. Check player as target only when faction is hostile
            const ecmFactor = 1 - (this.game.playerShip.ecmStrength || 0) * 0.1;
            const effectiveAggroRange = typeDef.aggroRange * ecmFactor;
            const isHostileToPlayer = (this.game.factionRep[enemy.faction] || 0) < 0;

            if (isHostileToPlayer && !isPlayerCloaked) {
                const dToPlayer = Math.hypot(enemy.x - ship.x, enemy.y - ship.y);
                if (dToPlayer < effectiveAggroRange) {
                    distToTarget = dToPlayer;
                    targetX = ship.x;
                    targetY = ship.y;
                    targetShip = ship;
                    isTargetingPlayer = true;
                }
            }

            // 2. Evaluate rival factions as targets (only if closer than current)
            for (const other of this.game.enemyShips) {
                if (!other.faction || other.faction === enemy.faction || other === enemy) continue;
                const d = Math.hypot(enemy.x - other.x, enemy.y - other.y);
                if (d < distToTarget) {
                    distToTarget = d;
                    targetX = other.x;
                    targetY = other.y;
                    targetShip = other;
                    isTargetingPlayer = false;
                }
            }

            const angleToTarget = (distToTarget < Infinity)
                ? Math.atan2(targetY - enemy.y, targetX - enemy.x)
                : (enemy.patrolAngle || 0);

            // STALKING HYSTERESIS: Once aggroed, stay aggroed until target is far away
            const stalkStopDist = effectiveAggroRange * 3.0;
            if (distToTarget < effectiveAggroRange && distToTarget < Infinity) {
                enemy.isStalking = true;
            } else if (distToTarget > stalkStopDist || distToTarget === Infinity) {
                enemy.isStalking = false;
            }

            // Determine AI state
            if (enemy.health < typeDef.health * 0.2) {
                enemy.state = 'flee';
            } else if (distToTarget === Infinity) {
                enemy.state = 'patrol';
            } else if (distToTarget < typeDef.attackRange) {
                enemy.state = 'attack';
            } else if (enemy.isStalking) {
                enemy.state = 'chase';
            } else {
                enemy.state = 'patrol';
            }

            // Execute state behavior
            let targetAngle = enemy.patrolAngle;
            let thrust = 0;

            switch (enemy.state) {
                case 'patrol':
                    enemy.patrolTimer++;
                    if (enemy.patrolTimer > 180 + Math.random() * 120) {
                        enemy.patrolAngle += (Math.random() - 0.5) * Math.PI;
                        enemy.patrolTimer = 0;
                    }
                    targetAngle = enemy.patrolAngle;
                    thrust = typeDef.maxSpeed * 0.4;
                    break;

                case 'chase':
                    targetAngle = angleToTarget;
                    thrust = typeDef.maxSpeed;
                    break;

                case 'attack':
                    targetAngle = angleToTarget;
                    // Stop thrusting if already within close range to prevent perpetual orbit
                    thrust = distToTarget > typeDef.attackRange * 0.5
                        ? typeDef.maxSpeed * 0.3
                        : 0; // Hover in place and shoot, don't spiral

                    // Fire weapons
                    if (enemy.burstRemaining > 0) {
                        if (now - enemy.burstTimer > (typeDef.burstDelay || 0)) {
                            this.game.fireEnemyBullet(enemy, typeDef, targetShip);
                            enemy.burstRemaining--;
                            enemy.burstTimer = now;
                        }
                    } else if (now - enemy.lastFireTime > typeDef.fireRate) {
                        if (typeDef.burstCount) {
                            enemy.burstRemaining = typeDef.burstCount;
                            enemy.burstTimer = now;
                        } else {
                            this.game.fireEnemyBullet(enemy, typeDef, targetShip);
                        }
                        enemy.lastFireTime = now;
                    }
                    break;

                case 'flee':
                    targetAngle = angleToTarget + Math.PI; // Run away
                    thrust = typeDef.maxSpeed;
                    break;
            }

            // Smooth rotation toward target angle
            let angleDiff = targetAngle - enemy.rotation;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            enemy.rotation += angleDiff * 0.06;

            // Apply thrust
            enemy.vx += Math.cos(enemy.rotation) * typeDef.acceleration;
            enemy.vy += Math.sin(enemy.rotation) * typeDef.acceleration;

            // Clamp speed
            const speed = Math.hypot(enemy.vx, enemy.vy);
            if (speed > thrust) {
                const scale = thrust / speed;
                enemy.vx *= scale;
                enemy.vy *= scale;
            }

            // Apply friction
            enemy.vx *= 0.98;
            enemy.vy *= 0.98;

            // Move
            enemy.x += enemy.vx;
            enemy.y += enemy.vy;

            // Decay hit flash
            if (enemy.hitFlash > 0) enemy.hitFlash--;
        }

        // Spawn new enemies
        this.spawnEnemyShips();
    }


    updateEnemyBullets() {
        if (!this.game.flightMode || !this.game.playerShip) return;

        const ship = this.game.playerShip;

        for (let i = this.game.enemyBullets.length - 1; i >= 0; i--) {
            const b = this.game.enemyBullets[i];
            b.x += b.vx;
            b.y += b.vy;
            b.life--;

            if (b.life <= 0) {
                this.game.enemyBullets.splice(i, 1);
                continue;
            }

            let bulletDestroyed = false;

            // Bullets from FRIENDLY factions should not damage the player (rep > 0)
            // Only damage player if the faction is hostile (rep < 0) or has no faction tag
            const bulletFactionRep = b.faction ? (this.game.factionRep[b.faction] || 0) : -1;
            if (bulletFactionRep < 0) {
                const dist = Math.hypot(b.x - ship.x, b.y - ship.y);
                if (dist < 30) {
                    this.game.createExplosion(b.x, b.y, 'hit');
                    this.game.damagePlayer(b.damage);
                    this.game.enemyBullets.splice(i, 1);
                    bulletDestroyed = true;
                    continue;
                }
            }

            // Check collision with other factions (Enemies)
            for (let j = this.game.enemyShips.length - 1; j >= 0; j--) {
                const enemy = this.game.enemyShips[j];
                // Faction check: Terran bullets hit non-terran, Enemy bullets hit different factions
                if (b.faction && enemy.faction && b.faction !== enemy.faction) {
                    const eDef = ENEMY_TYPES[enemy.type];
                    const distEnemy = Math.hypot(b.x - enemy.x, b.y - enemy.y);
                    if (distEnemy < (eDef.size || 20) + 5) {
                        this.game.createExplosion(b.x, b.y, 'hit');
                        enemy.health -= b.damage;
                        if (enemy.health <= 0) {
                            this.game.destroyEnemyShip(j);
                        } else {
                            enemy.hitFlash = 10;
                        }
                        this.game.enemyBullets.splice(i, 1);
                        bulletDestroyed = true;
                        break;
                    }
                }
            }

            if (bulletDestroyed) continue;

            // Check collision with Boss
            if (this.game.activeBoss && b.faction === 'terran') {
                const boss = this.game.activeBoss;
                const bDef = BOSS_TYPES[boss.type];
                const distBoss = Math.hypot(b.x - boss.x, b.y - boss.y);
                if (distBoss < bDef.size + 10) {
                    this.game.createExplosion(b.x, b.y, 'hit');
                    boss.health -= b.damage;
                    boss.hitFlash = 15;
                    this.game.enemyBullets.splice(i, 1);
                    bulletDestroyed = true;
                    // Check boss death is handled in updateBoss()
                }
            }
        }
    }


    spawnBoss(bossType) {
        if (this.game.activeBoss) return; // Only one boss at a time

        const typeDef = BOSS_TYPES[bossType];
        if (!typeDef) return;

        const ship = this.game.playerShip;
        const angle = Math.random() * Math.PI * 2;
        const dist = 1200;

        this.game.activeBoss = {
            x: ship.x + Math.cos(angle) * dist,
            y: ship.y + Math.sin(angle) * dist,
            vx: 0,
            vy: 0,
            rotation: Math.atan2(ship.y - (ship.y + Math.sin(angle) * dist), ship.x - (ship.x + Math.cos(angle) * dist)),
            type: bossType,
            health: typeDef.health,
            maxHealth: typeDef.health,
            lastFireTime: 0,
            lastSpawnTime: 0,
            hitFlash: 0,
            shieldAngle: 0,
            teleportCooldown: 0,
            phase: 1 // 1 = full power, 2 = enraged at 50% HP
        };

        this.game.hudManager.showToast(`⚠️ BOSS INCOMING: ${typeDef.name}! ⚠️`, 4000);
        gameAudio.playBossAlert();
    }



    updateBoss() {
        if (!this.game.activeBoss || !this.game.flightMode || !this.game.playerShip) return;

        const boss = this.game.activeBoss;
        const ship = this.game.playerShip;
        const typeDef = BOSS_TYPES[boss.type];
        const now = Date.now();
        const distToPlayer = Math.hypot(boss.x - ship.x, boss.y - ship.y);
        const angleToPlayer = Math.atan2(ship.y - boss.y, ship.x - boss.x);

        // Enrage at 50% HP
        if (boss.health < typeDef.health * 0.5) boss.phase = 2;
        const enraged = boss.phase === 2;
        const speedMult = enraged ? 1.5 : 1.0;
        const fireRateMult = enraged ? 0.7 : 1.0;

        // Check if player is cloaked
        const isPlayerCloaked = ship.isCloaked || ship.type === 'spectre';

        // === BOSS-SPECIFIC MECHANICS ===
        switch (boss.type) {
            case 'dreadnought':
                // Rotating shield - blocks frontal shots
                boss.shieldAngle += 0.02;
                // Chase player
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    while (aDiff > Math.PI) aDiff -= Math.PI * 2;
                    while (aDiff < -Math.PI) aDiff += Math.PI * 2;
                    boss.rotation += aDiff * 0.03;
                }
                break;

            case 'hivequeen':
                // Spawn scout swarm every 5 seconds (3s if enraged)
                const spawnInterval = enraged ? 3000 : 5000;
                if (now - boss.lastSpawnTime > spawnInterval && !isPlayerCloaked) {
                    const spawnCount = enraged ? 3 : 2;
                    for (let i = 0; i < spawnCount; i++) {
                        const sAngle = boss.rotation + (Math.random() - 0.5) * Math.PI;
                        const sDist = typeDef.size * 2;
                        const scoutDef = ENEMY_TYPES.scout;
                        this.game.enemyShips.push({
                            x: boss.x + Math.cos(sAngle) * sDist,
                            y: boss.y + Math.sin(sAngle) * sDist,
                            vx: 0, vy: 0,
                            rotation: sAngle,
                            type: 'scout',
                            faction: 'xenon', // Boss scouts are Xenon — always hostile to player
                            health: scoutDef.health,
                            maxHealth: scoutDef.health,
                            state: 'chase',
                            patrolAngle: sAngle,
                            patrolTimer: 0,
                            lastFireTime: 0,
                            burstRemaining: 0,
                            burstTimer: 0,
                            hitFlash: 0,
                            isStalking: true, // Immediately aggressive — skip patrol phase
                            spawnTime: now
                        });
                    }
                    boss.lastSpawnTime = now;

                    this.game.hudManager.showToast('🐛 Hive Queen spawned reinforcements!', 1500);
                }
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    while (aDiff > Math.PI) aDiff -= Math.PI * 2;
                    while (aDiff < -Math.PI) aDiff += Math.PI * 2;
                    boss.rotation += aDiff * 0.02;
                }
                break;

            case 'voidreaper':
                // Teleport handled in damageBoss()
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    while (aDiff > Math.PI) aDiff -= Math.PI * 2;
                    while (aDiff < -Math.PI) aDiff += Math.PI * 2;
                    boss.rotation += aDiff * 0.04;
                }
                break;
        }

        // Movement — chase player
        if (!isPlayerCloaked && distToPlayer > 300) {
            boss.vx += Math.cos(angleToPlayer) * typeDef.acceleration * speedMult;
            boss.vy += Math.sin(angleToPlayer) * typeDef.acceleration * speedMult;
        } else if (distToPlayer < 200) {
            // Back away if too close
            boss.vx -= Math.cos(angleToPlayer) * typeDef.acceleration * 0.5;
            boss.vy -= Math.sin(angleToPlayer) * typeDef.acceleration * 0.5;
        }

        const speed = Math.hypot(boss.vx, boss.vy);
        const maxSpeed = typeDef.speed * speedMult;
        if (speed > maxSpeed) {
            boss.vx *= maxSpeed / speed;
            boss.vy *= maxSpeed / speed;
        }
        boss.vx *= 0.98;
        boss.vy *= 0.98;
        boss.x += boss.vx;
        boss.y += boss.vy;

        // Fire weapons
        if (!isPlayerCloaked && distToPlayer < 800 && now - boss.lastFireTime > typeDef.fireRate * fireRateMult) {
            this.game.fireBossBullet(boss, typeDef);
            boss.lastFireTime = now;
        }

        // Boss-player collision
        if (distToPlayer < typeDef.size + 30) {
            this.game.damagePlayer(30);
        }

        // Decay hit flash
        if (boss.hitFlash > 0) boss.hitFlash--;
        if (boss.teleportCooldown > 0) boss.teleportCooldown--;
    }

}
window.CombatManager = CombatManager;
