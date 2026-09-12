class CombatManager {
    constructor(game) {
        this.game = game;
        this.activeFormation = 'v-shape'; // v-shape, diamond, circle, line
        this.tacticalCommand = 'defend'; // defend, attack, guard, scatter
        this.activeTarget = null; // Target for Focus Fire
    }

    setFormation(type) {
        this.activeFormation = type;
        if (this.game.hudManager) this.game.hudManager.showToast(`🛡️ FLEET FORMATION: ${type.toUpperCase()}`, 2000, 'info');
        if (window.gameAudio) window.gameAudio.playMenuTick();
    }

    commandFleet(command) {
        this.tacticalCommand = command;
        if (this.game.hudManager) this.game.hudManager.showToast(`📡 FLEET COMMAND: ${command.toUpperCase()}`, 3000, 'warning');
        if (window.gameAudio) window.gameAudio.playMenuSelect();
        
        // Handle target-aware commands
        if (command === 'attack') {
            this.activeTarget = this.findNearestHostile();
        }
    }

    findNearestHostile() {
        if (!this.game.playerShip) return null;
        let nearest = null;
        let minDist = 3000;
        this.game.enemyShips.forEach(e => {
            const d = Math.hypot(e.x - this.game.playerShip.x, e.y - this.game.playerShip.y);
            if (d < minDist) {
                minDist = d;
                nearest = e;
            }
        });
        return nearest;
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
            
            if (this.game.chronoShiftActive) {
                type = 'void_echo';
            } else {
                if (roll > 0.85) type = 'cruiser';
                else if (roll > 0.5) type = 'fighter';
            }

            const typeDef = ENEMY_TYPES[type];

            // Assign Faction dynamically
            const factions = ['xenon', 'mauler', 'terran'];
            let chosenFaction = factions[Math.floor(Math.random() * factions.length)];
            // Bias spawn to hostile factions (rep < -10)
            if (Math.random() > 0.4) {
                const hostiles = factions.filter(f => (this.game.factionRep[f] || 0) < -10);
                if (hostiles.length > 0) chosenFaction = hostiles[Math.floor(Math.random() * hostiles.length)];
            }

            const typeToClassMap = {
                'scout': 'saucer',
                'fighter': 'void-fighter',
                'cruiser': 'star-dreadnought',
                'void_echo': 'void-fighter'
            };

            this.game.enemyShips.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                vx: 0,
                vy: 0,
                rotation: Math.random() * Math.PI * 2,
                type: type,
                shipClass: typeToClassMap[type] || 'interceptor',
                faction: chosenFaction,
                health: typeDef.health,
                maxHealth: typeDef.health,
                state: 'patrol',
                patrolAngle: Math.random() * Math.PI * 2,
                patrolTimer: 0,
                lastFireTime: 0,
                burstRemaining: 0,
                burstTimer: 0,
                hitFlash: 0,
                isStalking: false,
                spawnTime: Date.now()
            });
        }
    }



    updateEnemyShips() {
        if (!this.game.flightMode || !this.game.playerShip) return;

        const globalDt = this.game.timeScale || 1.0;
        const ship = this.game.playerShip;
        const now = Date.now();
        const isPlayerCloaked = ship.isCloaked || ship.type === 'spectre';

        // We use a traditional for loop to safely handle splicing inside (e.g. from black hole)
        for (let i = this.game.enemyShips.length - 1; i >= 0; i--) {
            const enemy = this.game.enemyShips[i];
            const typeDef = ENEMY_TYPES[enemy.type];
            
            // Phase 15: Void Echoes ignore time dilation
            const dt = typeDef.isVoid ? Math.max(1.0, globalDt) : globalDt;

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
                    enemy.patrolTimer += dt;
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

                    // Fire weapons (scale delay logic if needed, but Date.now() handles cooldowns)
                    if (enemy.burstRemaining > 0) {
                        if (now - enemy.burstTimer > (typeDef.burstDelay || 0)) {
                            this.game.fireEnemyBullet(enemy, typeDef, targetShip);
                            enemy.burstRemaining--;
                            enemy.burstTimer = now;
                        }
                    } else if (now - enemy.lastFireTime > (typeDef.fireRate / dt)) { // Scale fire rate for slow mo
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
            
            // Phase 5: ELITE MANEUVERS
            const isElite = typeDef.health > 500 || typeDef.isVoid;
            if (isElite && enemy.state === 'attack' && Math.random() < 0.05 * dt) {
                enemy.maneuverType = Math.random() > 0.5 ? 'barrel_roll' : 'strafe';
                enemy.maneuverTimer = 60;
            }

            if (enemy.maneuverTimer > 0) {
                enemy.maneuverTimer -= dt;
                if (enemy.maneuverType === 'barrel_roll') {
                    enemy.rotation += 0.3 * dt; // Rapid spin
                    enemy.vx += Math.cos(enemy.rotation + Math.PI/2) * 5 * dt;
                    enemy.vy += Math.sin(enemy.rotation + Math.PI/2) * 5 * dt;
                } else if (enemy.maneuverType === 'strafe') {
                    const strafeDir = (enemy.spawnTime % 2 === 0 ? 1 : -1);
                    enemy.vx += Math.cos(enemy.rotation + Math.PI/2 * strafeDir) * 4 * dt;
                    enemy.vy += Math.sin(enemy.rotation + Math.PI/2 * strafeDir) * 4 * dt;
                }
            } else {
                enemy.rotation += angleDiff * 0.06 * dt;
            }

            // Apply thrust
            enemy.vx += Math.cos(enemy.rotation) * typeDef.acceleration * dt;
            enemy.vy += Math.sin(enemy.rotation) * typeDef.acceleration * dt;

            // Clamp speed (thrust is target velocity essentially)
            const speed = Math.hypot(enemy.vx, enemy.vy);
            const currentMaxSpeed = enemy.maneuverTimer > 0 ? thrust * 1.5 : thrust;
            if (speed > currentMaxSpeed) {
                const scale = currentMaxSpeed / speed;
                enemy.vx *= scale;
                enemy.vy *= scale;
            }

            // Apply friction
            enemy.vx *= Math.pow(0.98, dt);
            enemy.vy *= Math.pow(0.98, dt);

            // --- PHASE 7: Advanced damage emitters for enemies ---
            if (this.game.particleManager && enemy.health < enemy.maxHealth * 0.5) {
                const pm = this.game.particleManager;
                const hRatio = enemy.health / enemy.maxHealth;
                
                // SMOKE: Below 50%
                if (this.game.frameCounter % 5 === 0) {
                    pm.spawn({
                        x: enemy.x - Math.cos(enemy.rotation) * 15,
                        y: enemy.y - Math.sin(enemy.rotation) * 15,
                        vx: -enemy.vx * 0.1 + (Math.random() - 0.5) * 1.5,
                        vy: -enemy.vy * 0.1 + (Math.random() - 0.5) * 1.5,
                        size: 6 + Math.random() * 8,
                        life: 30 + Math.random() * 30,
                        color: '#444444',
                        type: 'SMOKE',
                        alpha: 0.5
                    });
                }

                // FIRE: Below 25%
                if (hRatio < 0.25 && this.game.frameCounter % 4 === 0) {
                    pm.spawn({
                        x: enemy.x + (Math.random() - 0.5) * 20,
                        y: enemy.y + (Math.random() - 0.5) * 20,
                        vx: -enemy.vx * 0.3 + (Math.random() - 0.5) * 3,
                        vy: -enemy.vy * 0.3 + (Math.random() - 0.5) * 3,
                        size: 3 + Math.random() * 5,
                        life: 15 + Math.random() * 15,
                        color: '#ff6600',
                        colors: ['#ffcc00', '#ff6600', 'transparent'],
                        type: 'FIRE',
                        alpha: 0.8,
                        bloom: true
                    });
                }
            }

            // Time Dilation / Black Hole Gravity check
            let suckedIn = false;
            for (const bh of this.game.hazardBlackHoles) {
                if (!bh.playerOwned) continue;
                const pullRadius = (bh.radius || 500) * 2;
                const dx = bh.x - enemy.x;
                const dy = bh.y - enemy.y;
                const dist = Math.hypot(dx, dy);
                if (dist < pullRadius) {
                    const maxForce = 12 * (bh.powerScale || 1.0);
                    const force = maxForce * (1 - dist / pullRadius);
                    enemy.vx += (dx / dist) * force * dt;
                    enemy.vy += (dy / dist) * force * dt;
                    
                    if (dist < 40 * (bh.powerScale || 1.0)) {
                        this.game.destroyEnemyShip(i); // i is the correct index from the reverse loop
                        this.game.credits += 500;
                        this.game.hudManager.showToast('🕳️ Enemy consumed by Singularity! +$500');
                        suckedIn = true;
                        break;
                    }
                }
            }

            if (suckedIn) continue;

            // Move
            enemy.x += enemy.vx * dt;
            enemy.y += enemy.vy * dt;

            // Decay hit flash
            if (enemy.hitFlash > 0) enemy.hitFlash -= dt;
        }

        // Spawn new enemies
        this.spawnEnemyShips();
    }


    updateWingmen() {
        if (!this.game.flightMode || !this.game.playerWingmen || this.game.playerWingmen.length === 0) return;

        const ship = this.game.playerShip;
        const dt = this.game.timeScale || 1.0;
        const now = Date.now();

        for (let i = this.game.playerWingmen.length - 1; i >= 0; i--) {
            const wingman = this.game.playerWingmen[i];
            
            // Phase 4: Futuristic Respawn
            if (wingman.health <= 0 && wingman.state !== 'respawning') {
                this.game.createExplosion(wingman.x, wingman.y, 'boss');
                wingman.state = 'respawning';
                wingman.health = 1; // Prevent re-triggering death while respawning
                wingman.respawnTime = now + 45000; // 45 second re-assembly
                this.game.hudManager.showToast(`🦾 ${wingman.class.toUpperCase()} destroyed! Re-assembling at Base...`, 3000, 'error');
                continue;
            }

            if (wingman.state === 'respawning') {
                if (now >= wingman.respawnTime) {
                    // Phase back at base
                    const base = this.game.spaceBase;
                    if (base) {
                        wingman.x = base.x;
                        wingman.y = base.y;
                        wingman.health = wingman.maxHealth;
                        wingman.state = 'follow';
                        this.game.hudManager.showToast(`✔️ ${wingman.class.toUpperCase()} re-integrated and operational.`, 3000, 'success');
                    }
                }
                continue;
            }

            // 1. COMBAT TARGETING (Command/Formation-Aware)
            let target = null;
            let minDist = 3000;
            
            // Prioritize active Focus Fire target from CombatManager
            if (this.activeTarget && this.game.enemyShips.includes(this.activeTarget)) {
                target = this.activeTarget;
                minDist = Math.hypot(wingman.x - target.x, wingman.y - target.y);
            } else {
                // Search for nearest targets
                for (const enemy of this.game.enemyShips) {
                    if (!enemy.faction || (this.game.factionRep[enemy.faction] || 0) >= 0) continue;
                    const d = Math.hypot(wingman.x - enemy.x, wingman.y - enemy.y);
                    
                    const detectionRange = this.tacticalCommand === 'attack' ? 3000 : 1200;
                    if (d < detectionRange && d < minDist) {
                        minDist = d;
                        target = enemy;
                    }
                }
            }

            // 2. AI BEHAVIOR BRANCHING & FORMATION OFFSETS
            let targetX, targetY;
            let thrust = 6;
            const fleetCmd = this.tacticalCommand || 'defend';

            // Calculate Formation Offset (Local to player ship rotation)
            let offsetX = 0;
            let offsetY = 0;
            const dist = 250; // base formation distance
            
            if (this.activeFormation === 'diamond') {
                const angles = [0, Math.PI / 2, -Math.PI / 2, Math.PI];
                offsetX = Math.cos(angles[i % 4]) * dist;
                offsetY = Math.sin(angles[i % 4]) * dist;
            } else if (this.activeFormation === 'circle') {
                const orbitAngle = (now * 0.001) + (i * Math.PI * 2 / 4);
                offsetX = Math.cos(orbitAngle) * (dist * 1.5);
                offsetY = Math.sin(orbitAngle) * (dist * 1.5);
            } else if (this.activeFormation === 'line') {
                offsetX = -(i + 1) * dist;
                offsetY = 0;
            } else { // 'v-shape' (default)
                offsetX = -dist * 0.8;
                offsetY = (i % 2 === 0 ? 1 : -1) * dist * 0.6;
            }

            // Rotate offsets to match ship heading
            const cos = Math.cos(ship.rotation);
            const sin = Math.sin(ship.rotation);
            const worldOffsetX = offsetX * cos - offsetY * sin;
            const worldOffsetY = offsetX * sin + offsetY * cos;

            if (fleetCmd === 'attack' && (target || this.activeTarget)) {
                const currentTarget = target || this.activeTarget;
                wingman.state = 'attack';
                targetX = currentTarget.x + worldOffsetX * 0.5; // Stay in loose formation even when attacking
                targetY = currentTarget.y + worldOffsetY * 0.5;
                thrust = wingman.class === 'striker' ? 8 : 5;
            } 
            else if (fleetCmd === 'guard') {
                wingman.state = 'guard';
                const base = this.game.spaceBase;
                if (base) {
                    const orbitAngle = (now * 0.0008) + (i * Math.PI / 2);
                    targetX = base.x + Math.cos(orbitAngle) * 400;
                    targetY = base.y + Math.sin(orbitAngle) * 400;
                } else {
                    targetX = ship.x + worldOffsetX;
                    targetY = ship.y + worldOffsetY;
                }
            }
            else if (fleetCmd === 'scatter') {
                wingman.state = 'scatter';
                const scatterAngle = (i * Math.PI / 2) + (now * 0.002);
                targetX = ship.x + Math.cos(scatterAngle) * 800;
                targetY = ship.y + Math.sin(scatterAngle) * 800;
                thrust = 10; // High speed evasion
            }
            else { // Default/Defend
                wingman.state = 'follow';
                targetX = ship.x + worldOffsetX;
                targetY = ship.y + worldOffsetY;
                thrust = Math.hypot(ship.vx, ship.vy) + 3;
            }

            // 3. COMBAT ACTION (Class-Specific)
            if (target && minDist < 1000) {
                const fireDelay = wingman.class === 'striker' ? 200 : (wingman.class === 'vanguard' ? 600 : 400);
                if (now - wingman.lastFireTime > fireDelay / dt) {
                    const color = wingman.class === 'striker' ? '#00f3ff' : (wingman.class === 'vanguard' ? '#ffaa00' : '#aaddff');
                    const dmg = wingman.class === 'vanguard' ? 2 : 1;
                    this.game.firePlayerProjectile(wingman.x, wingman.y, wingman.rotation, color, 12, dmg);
                    wingman.lastFireTime = now;
                }
            }

            // Teleport fallback
            const distToPlayer = Math.hypot(wingman.x - ship.x, wingman.y - ship.y);
            if (distToPlayer > 5000 && fleetCmd !== 'guard') {
                wingman.x = targetX;
                wingman.y = targetY;
            }

            // Smooth rotation toward target angle
            const angleToTarget = Math.atan2(targetY - wingman.y, targetX - wingman.x);
            let angleDiff = angleToTarget - wingman.rotation;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            wingman.rotation += angleDiff * 0.1 * dt;

            // Apply thrust
            const speed = thrust * dt;
            const distToDest = Math.hypot(targetX - wingman.x, targetY - wingman.y);
            if (distToDest > 30) {
                wingman.vx = Math.cos(wingman.rotation) * speed;
                wingman.vy = Math.sin(wingman.rotation) * speed;
            } else {
                wingman.vx *= 0.9;
                wingman.vy *= 0.9;
            }

            wingman.x += wingman.vx;
            wingman.y += wingman.vy;
            
            // Fast decay for visual hit flash if we add it
            if (wingman.hitFlash > 0) wingman.hitFlash -= dt;
        }
    }


    updateEnemyBullets() {
        if (!this.game.flightMode || !this.game.playerShip) return;

        const ship = this.game.playerShip;
        const dt = this.game.timeScale || 1.0;

        for (let i = this.game.enemyBullets.length - 1; i >= 0; i--) {
            const b = this.game.enemyBullets[i];
            b.x += b.vx * dt;
            b.y += b.vy * dt;
            b.life -= dt;

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
                    bulletDestroyed = true;
                    this.game.enemyBullets.splice(i, 1);
                } else if (this.game.playerWingmen) {
                    // Check collision with wingmen
                    for (const wingman of this.game.playerWingmen) {
                        if (Math.hypot(b.x - wingman.x, b.y - wingman.y) < 30) {
                            this.game.createExplosion(b.x, b.y, 'hit');
                            wingman.health -= b.damage;
                            wingman.hitFlash = 10;
                            bulletDestroyed = true;
                            this.game.enemyBullets.splice(i, 1);
                            break;
                        }
                    }
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

        const dt = this.game.timeScale || 1.0;
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
                boss.shieldAngle += 0.02 * dt;
                // Chase player
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    while (aDiff > Math.PI) aDiff -= Math.PI * 2;
                    while (aDiff < -Math.PI) aDiff += Math.PI * 2;
                    boss.rotation += aDiff * 0.03 * dt;
                }
                break;

            case 'hivequeen':
                // Spawn scout swarm every 5 seconds (3s if enraged)
                const spawnInterval = (enraged ? 3000 : 5000) / dt;
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
                    boss.rotation += aDiff * 0.02 * dt;
                }
                break;

            case 'voidreaper':
                // Teleport handled in damageBoss()
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    while (aDiff > Math.PI) aDiff -= Math.PI * 2;
                    while (aDiff < -Math.PI) aDiff += Math.PI * 2;
                    boss.rotation += aDiff * 0.04 * dt;
                }
                break;
        }

        // Movement — chase player
        if (!isPlayerCloaked && distToPlayer > 300) {
            boss.vx += Math.cos(angleToPlayer) * typeDef.acceleration * speedMult * dt;
            boss.vy += Math.sin(angleToPlayer) * typeDef.acceleration * speedMult * dt;
        } else if (distToPlayer < 200) {
            // Back away if too close
            boss.vx -= Math.cos(angleToPlayer) * typeDef.acceleration * 0.5 * dt;
            boss.vy -= Math.sin(angleToPlayer) * typeDef.acceleration * 0.5 * dt;
        }

        const speed = Math.hypot(boss.vx, boss.vy);
        const maxSpeed = typeDef.speed * speedMult;
        if (speed > maxSpeed) {
            boss.vx *= maxSpeed / speed;
            boss.vy *= maxSpeed / speed;
        }
        boss.vx *= Math.pow(0.98, dt);
        boss.vy *= Math.pow(0.98, dt);
        boss.x += boss.vx * dt;
        boss.y += boss.vy * dt;

        // Fire weapons
        if (!isPlayerCloaked && distToPlayer < 800 && now - boss.lastFireTime > (typeDef.fireRate * fireRateMult / dt)) {
            this.game.fireBossBullet(boss, typeDef);
            boss.lastFireTime = now;
        }

        // Boss-player collision
        if (distToPlayer < typeDef.size + 30) {
            this.game.damagePlayer(30);
        }

        // Decay hit flash
        if (boss.hitFlash > 0) boss.hitFlash -= dt;
        if (boss.teleportCooldown > 0) boss.teleportCooldown -= dt;
    }

}
window.CombatManager = CombatManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.CombatManager = CombatManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CombatManager;
}
