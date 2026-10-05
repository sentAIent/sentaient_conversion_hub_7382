export class Physics {
    constructor(engine) {
        this.engine = engine;
    }

    update() {
        this.engine.checkAndGenerateSectors();
        this.updatePlayerShip();
        this.updateProjectiles();
        this.updateDamageParticles();
        this.updateMinerals();
        this.updatePowerUps();
        this.updateHazards();
        this.updateSpaceBase();
        this.updateEnemyShips();
        this.updateEnemyBullets();
        this.updateBoss();
    }

    updatePlayerShip() {
        const ship = this.engine.playerShip;
        const keys = this.engine.keysPressed;

        // DISABLE ALL CONTROLS during major hazard effects (not missile hits)
        if (this.engine.hazardEffect && this.engine.hazardEffect.type !== 'missile_hit') {
            this.engine.camera.x = -ship.x * this.engine.camera.zoom;
            this.engine.camera.y = -ship.y * this.engine.camera.zoom;
            return;
        }

        // Rotation (Yaw - left/right)
        if (keys['a'] || keys['arrowleft']) ship.rotation -= ship.rotationSpeed;
        if (keys['d'] || keys['arrowright']) ship.rotation += ship.rotationSpeed;

        // Joystick Yaw
        if (this.engine.joyInputX) {
            ship.rotation += this.engine.joyInputX * ship.rotationSpeed;
        }

        // Mouse Steering (Right-Click Drag)
        if (this.engine.mouseRightDown && this.engine.mouseLastX !== undefined) {
            const deltaX = this.engine.mouseX - this.engine.mouseLastX;
            const deltaY = this.engine.mouseY - this.engine.mouseLastY;
            ship.rotation += deltaX * 0.005;
            ship.pitch += deltaY * 0.005;
            ship.pitch = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, ship.pitch));
            this.engine.mouseLastX = this.engine.mouseX;
            this.engine.mouseLastY = this.engine.mouseY;
        }

        // 3D Pitch rotation
        if (keys['r']) ship.pitch = Math.min(Math.PI / 3, ship.pitch + 0.02);
        if (keys['f']) ship.pitch = Math.max(-Math.PI / 3, ship.pitch - 0.02);

        // 3D Roll rotation
        if (keys['z']) ship.roll = Math.min(Math.PI / 2, ship.roll + 0.03);
        if (keys['x']) ship.roll = Math.max(-Math.PI / 2, ship.roll - 0.03);

        // Acceleration
        const cos = Math.cos(ship.rotation);
        const sin = Math.sin(ship.rotation);

        // Viper Boost & Apex Overclock Multiplier
        let abilityAccelMult = 1.0;

        // Apex Overclock Timeout Logic
        if (ship.overclockActive && Date.now() - (ship.overclockStartTime || 0) > 5000) {
            ship.overclockActive = false;
            this.engine.showToast('Overclock Disengaged.');
        }

        if (ship.type === 'viper' && ship.boostActive) {
            abilityAccelMult = 2.0;
        } else if (ship.type === 'apex' && ship.overclockActive) {
            abilityAccelMult = 2.0;
        }

        const enginesActive = !ship.enginesDisabled;
        let currentThrust = 0;

        if ((keys['w'] || keys['arrowup']) && enginesActive) {
            ship.vx += cos * ship.acceleration * abilityAccelMult;
            ship.vy += sin * ship.acceleration * abilityAccelMult;
            currentThrust += ship.acceleration * abilityAccelMult;
        }
        if ((keys['s'] || keys['arrowdown']) && enginesActive) {
            ship.vx -= cos * ship.acceleration * 0.5 * abilityAccelMult;
            ship.vy -= sin * ship.acceleration * 0.5 * abilityAccelMult;
            currentThrust += ship.acceleration * 0.5 * abilityAccelMult;
        }

        // Joystick Thrust
        if (this.engine.joyInputY && Math.abs(this.engine.joyInputY) > 0.1) {
            const thrust = -this.engine.joyInputY * ship.acceleration;
            ship.vx += cos * thrust;
            ship.vy += sin * thrust;
            currentThrust += Math.abs(thrust);
        }

        ship.currentThrust = currentThrust;

        // 3D movement (Q/E)
        if (keys['q']) ship.vz += ship.acceleration;
        if (keys['e']) ship.vz -= ship.acceleration;

        // --- PHYSICS & SPEED CLAMPING ---
        let effectiveMaxSpeed = ship.maxSpeed;

        // Shift = manual speed boost (increases effective max speed, not position multiplier)
        if (keys['shift']) {
            effectiveMaxSpeed *= 1.8;
        }

        // Skill: Viper Boost (Ship Specific)
        if (ship.type === 'viper' && ship.boostActive) {
            effectiveMaxSpeed *= 2.0;
        } 
        // Skill: Apex Overclock (Ship Specific)
        else if (ship.type === 'apex' && ship.overclockActive) {
            effectiveMaxSpeed *= 1.5;
        }

        // Skill: Global Afterburner (raises the speed cap)
        if (this.engine.globalAbilityActive && this.engine.globalAbilityActive.afterburner) {
            effectiveMaxSpeed *= 3.0 + (this.engine.playerSkills.afterburner * 0.5);
        }

        // Power-Up: Speed Boost
        if (ship.speedBoost && Date.now() < ship.speedBoost) {
            effectiveMaxSpeed *= 1.5;
        }

        // Penalty: Towing base reduces max speed
        if (this.engine.spaceBase && this.engine.spaceBase.isTowing) {
            effectiveMaxSpeed *= 0.5;
        }

        ship.x += ship.vx;
        ship.y += ship.vy;
        ship.z += ship.vz;

        ship.speed = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy + ship.vz * ship.vz);

        // Safety: Prevent NaN if speed is zero or malformed
        if (ship.speed > effectiveMaxSpeed && ship.speed > 0) {
            const ratio = effectiveMaxSpeed / ship.speed;
            ship.vx *= ratio;
            ship.vy *= ratio;
            ship.vz *= ratio;
            ship.speed = effectiveMaxSpeed;
        }

        const friction = 0.998;
        ship.vx *= friction;
        ship.vy *= friction;
        ship.vz *= friction;

        // Speed Lines Generation
        if (ship.speed > 5 && Math.random() < 0.3) {
            const lineCount = Math.floor(ship.speed / 15) + 1;
            for (let i = 0; i < lineCount; i++) {
                this.engine.speedLines.push({
                    x: ship.x + (Math.random() - 0.5) * 600,
                    y: ship.y + (Math.random() - 0.5) * 600,
                    z: ship.z + (Math.random() - 0.5) * 600,
                    vx: -ship.vx * 0.4,
                    vy: -ship.vy * 0.4,
                    life: 0.8 + Math.random() * 0.4,
                    decay: 0.04 + Math.random() * 0.04
                });
            }
        }

        // Engine Exhaust Particles
        this.engine.engineParticles = this.engine.engineParticles || [];
        if (currentThrust > 0 && Math.random() < 0.6 + currentThrust/2) {
            const spread = Math.random() * 0.4 - 0.2;
            const exAngle = ship.rotation + Math.PI + spread;
            const exSpeed = 2 + currentThrust * 2 + Math.random() * 2;
            this.engine.engineParticles.push({
                x: ship.x - Math.cos(ship.rotation) * 20,
                y: ship.y - Math.sin(ship.rotation) * 20,
                vx: Math.cos(exAngle) * exSpeed + ship.vx * 0.2,
                vy: Math.sin(exAngle) * exSpeed + ship.vy * 0.2,
                life: 1.0,
                color: ship.type === 'viper' ? 'rgba(0, 255, 255, ' : 'rgba(255, 100, 0, ',
                size: 3 + Math.random() * 3 + currentThrust
            });
        }
        
        for (let i = this.engine.engineParticles.length - 1; i >= 0; i--) {
            const p = this.engine.engineParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.size *= 0.95;
            p.life -= 0.03;
            if (p.life <= 0 || p.size < 0.1) {
                this.engine.engineParticles.splice(i, 1);
            }
        }

        // Speed Lines Update
        this.engine.speedLines.forEach(line => {
            line.x += line.vx;
            line.y += line.vy;
            line.life -= (line.decay || 0.05);

            if (ship.type === 'hauler') {
                const dx = ship.x - line.x;
                const dy = ship.y - line.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 400 && dist > 1) {
                    const pull = 1.2 * (1 - dist / 400);
                    line.vx += (dx / Math.max(0.1, dist)) * pull;
                    line.vy += (dy / Math.max(0.1, dist)) * pull;
                }
            }
        });
        this.engine.speedLines = this.engine.speedLines.filter(line => line.life > 0);

        // Sanity Check for NaN - Recovery Mechanism
        if (isNaN(ship.x) || isNaN(ship.y) || isNaN(ship.z)) {
            console.warn("⚠️ CRITICAL: Ship coordinates corrupt (NaN). Emergency reset invoked.");
            ship.x = 0; ship.y = 0; ship.z = 0;
            ship.vx = 0; ship.vy = 0; ship.vz = 0;
        }

        // Camera follow
        this.engine.camera.x = -ship.x * this.engine.camera.zoom;
        this.engine.camera.y = -ship.y * this.engine.camera.zoom;

        this.engine.checkAndGenerateSectors();

        // Muzzle Flash Decay
        if (ship.muzzleFlash > 0) {
            ship.muzzleFlash -= 0.1;
        }

        // Weapon Firing (Spacebar)
        if (keys[' ']) {
            this.engine.shoot();
        }
    }

    updateProjectiles() {
        // Iterate backwards to allow removal
        for (let i = this.engine.projectiles.length - 1; i >= 0; i--) {
            const p = this.engine.projectiles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            if (p.life <= 0) {
                this.engine.projectiles.splice(i, 1);
                continue;
            }

            // check collisions with Space Mines
            let hit = false;
            for (let j = this.engine.spaceMines.length - 1; j >= 0; j--) {
                const mine = this.engine.spaceMines[j];
                const dx = p.x - mine.x;
                const dy = p.y - mine.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const hitRadius = mine.radius || mine.size || 20;

                if (dist < hitRadius + (p.width || 4)) {
                    // HIT!
                    this.engine.createExplosion(p.x, p.y, 'hit');
                    if (mine.health === undefined) mine.health = 50; // Default health
                    mine.health -= (p.damage || 25); // Use projectile damage
                    hit = true;

                    if (mine.health <= 0) {
                        this.engine.destroySpaceMine(j);
                    }
                    break; // One hit per projectile
                }
            }

            if (hit) {
                this.engine.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Missile Bases
            for (let k = this.engine.missileBases.length - 1; k >= 0; k--) {
                const base = this.engine.missileBases[k];
                const dx = p.x - base.x;
                const dy = p.y - base.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < base.size * 1.5 + p.width) { // Base hitbox is generous
                    // HIT!
                    this.engine.createExplosion(p.x, p.y, 'hit');
                    base.health -= (p.damage || 25);
                    hit = true;

                    // Flash base red
                    base.hitFlash = 10;

                    if (base.health <= 0) {
                        this.engine.destroyMissileBase(k);
                    }
                    break;
                }
            }

            if (hit) {
                this.engine.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Enemy Missiles
            for (let m = this.engine.enemyMissiles.length - 1; m >= 0; m--) {
                const missile = this.engine.enemyMissiles[m];
                const dx = p.x - missile.x;
                const dy = p.y - missile.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < missile.size * 3 + p.width + 10) { // Generous leeway for hitting fast-moving missiles
                    // HIT!
                    this.engine.createExplosion(p.x, p.y, 'hit');
                    missile.health -= (p.damage || 25);
                    hit = true;

                    if (missile.health <= 0) {
                        this.engine.createExplosion(missile.x, missile.y, 'destruction');
                        this.engine.enemyMissiles.splice(m, 1);
                        
                        // Small reward for shooting down a missile
                        this.engine.playerGems += 2;
                        localStorage.setItem('playerGems', this.engine.playerGems);
                        this.engine.showToast(`💥 Missile Intercepted! +2 Gems`, 1000);
                    }
                    break;
                }
            }

            if (hit) {
                this.engine.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Enemy Ships
            for (let e = this.engine.enemyShips.length - 1; e >= 0; e--) {
                const enemy = this.engine.enemyShips[e];
                const typeDef = InterstellarEngine.ENEMY_TYPES[enemy.type];
                const dx = p.x - enemy.x;
                const dy = p.y - enemy.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < typeDef.size + p.width) {
                    this.engine.createExplosion(p.x, p.y, 'hit');
                    enemy.health -= (p.damage || 25);
                    enemy.hitFlash = 10;
                    hit = true;
                    this.engine.playerStats.shotsHit++;

                    // Faction Wars: Reputation Adjustments
                    if (enemy.faction) {
                        this.engine.factionRep[enemy.faction] = Math.max(-100, (this.engine.factionRep[enemy.faction] || 0) - 2);
                        // Friendly boost to rivals
                        Object.keys(this.engine.factionRep).forEach(f => {
                            if (f !== enemy.faction) this.engine.factionRep[f] = Math.min(100, (this.engine.factionRep[f] || 0) + 1);
                        });
                        localStorage.setItem('factionRep', JSON.stringify(this.engine.factionRep));
                    }

                    if (enemy.health <= 0) {
                        this.engine.destroyEnemyShip(e);
                    }
                    break;
                }
            }

            if (hit) {
                this.engine.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Background Spacecraft
            if (this.engine.activeStyles.has('alien') && this.engine.spacecraft && this.engine.spacecraft.length > 0) {
                const bgZoom = Math.pow(this.engine.camera.zoom, 0.4);

                const pScreenX = this.engine.canvas.width / 2 + (p.x - this.engine.playerShip.x) * this.engine.camera.zoom;
                const pScreenY = this.engine.canvas.height / 2 + (p.y - this.engine.playerShip.y) * this.engine.camera.zoom;

                for (let sIdx = this.engine.spacecraft.length - 1; sIdx >= 0; sIdx--) {
                    const sc = this.engine.spacecraft[sIdx];
                    if (sc.flownOut) continue;

                    const para = sc.parallax || 0.4;
                    const scScreenX = this.engine.canvas.width / 2 + (sc.x - this.engine.playerShip.x * para) * bgZoom;
                    const scScreenY = this.engine.canvas.height / 2 + (sc.y - this.engine.playerShip.y * para) * bgZoom;

                    const dx = pScreenX - scScreenX;
                    const dy = pScreenY - scScreenY;
                    const dist = Math.hypot(dx, dy);

                    const scRadius = (sc.size || 20) * 1.5 * bgZoom;

                    if (dist < scRadius + 5) {
                        const hitWorldX = this.engine.playerShip.x + (pScreenX - this.engine.canvas.width / 2) / this.engine.camera.zoom;
                        const hitWorldY = this.engine.playerShip.y + (pScreenY - this.engine.canvas.height / 2) / this.engine.camera.zoom;

                        this.engine.createExplosion(hitWorldX, hitWorldY, 'hit');
                        
                        if (sc.health === undefined) {
                            sc.health = sc.shipClass === 'mothership' ? 250 : (sc.shipClass === 'destroyer' ? 120 : (sc.shipClass === 'cruiser' ? 80 : 40));
                            sc.maxHealth = sc.health;
                        }

                        sc.health -= (p.damage || 25);
                        hit = true;

                        if (sc.health <= 0) {
                            this.engine.createExplosion(hitWorldX, hitWorldY, 'destruction');
                            this.engine.spacecraft.splice(sIdx, 1);
                            this.engine.respawnSpacecraftBackground();
                        }
                        break;
                    }
                }
            }

            if (hit) {
                this.engine.projectiles.splice(i, 1);
                continue;
            }

            // Check collision with Boss
            if (this.engine.activeBoss) {
                const boss = this.engine.activeBoss;
                const bTypeDef = InterstellarEngine.BOSS_TYPES[boss.type];
                const dx = p.x - boss.x;
                const dy = p.y - boss.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < bTypeDef.size + p.width) {
                    this.engine.createExplosion(p.x, p.y, 'hit');
                    this.engine.damageBoss(25);
                    hit = true;
                }
            }

            if (hit) {
                this.engine.projectiles.splice(i, 1);
                continue;
            }

            // CHECK COLLISIONS WITH BLACK HOLES (Sucked in)
            for (let b = 0; b < this.engine.hazardBlackHoles.length; b++) {
                const bh = this.engine.hazardBlackHoles[b];
                const dx = p.x - bh.x;
                const dy = p.y - bh.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // If projectile enters the black hole horizon region, it vanishes
                if (dist < bh.size * 1.8) {
                    this.engine.projectiles.splice(i, 1);
                    hit = true;
                    break;
                }
            }

            if (hit) continue;
        }
    }

    updateEnemyShips() {
        if (!this.engine.flightMode || !this.engine.playerShip) return;

        const ship = this.engine.playerShip;
        const now = Date.now();
        const isPlayerCloaked = ship.isCloaked || ship.type === 'spectre';

        for (const enemy of this.engine.enemyShips) {
            const typeDef = InterstellarEngine.ENEMY_TYPES[enemy.type];

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
            const ecmFactor = 1 - (this.engine.playerShip.ecmStrength || 0) * 0.1;
            const effectiveAggroRange = typeDef.aggroRange * ecmFactor;
            const isHostileToPlayer = (this.engine.factionRep[enemy.faction] || 0) < 0;

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
            for (const other of this.engine.enemyShips) {
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

                    // Check if player is invulnerable (grace period on spawn)
                    const isTargetInvulnerable = targetShip === this.engine.playerShip && this.engine.playerShip.invulnerableUntil && performance.now() < this.engine.playerShip.invulnerableUntil;

                    // Fire weapons
                    if (!isTargetInvulnerable) {
                        if (enemy.burstRemaining > 0) {
                            if (now - enemy.burstTimer > (typeDef.burstDelay || 0)) {
                                this.engine.fireEnemyBullet(enemy, typeDef, targetShip);
                                enemy.burstRemaining--;
                                enemy.burstTimer = now;
                            }
                        } else if (now - enemy.lastFireTime > typeDef.fireRate) {
                            if (typeDef.burstCount) {
                                enemy.burstRemaining = typeDef.burstCount;
                                enemy.burstTimer = now;
                            } else {
                                this.engine.fireEnemyBullet(enemy, typeDef, targetShip);
                            }
                            enemy.lastFireTime = now;
                        }
                    }
                    break;

                case 'flee':
                    targetAngle = angleToTarget + Math.PI; // Run away
                    thrust = typeDef.maxSpeed;
                    break;
            }

            // Smooth rotation toward target angle
            let angleDiff = targetAngle - enemy.rotation;
            angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
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
        this.engine.spawnEnemyShips();
    }

    fireEnemyBullet(enemy, typeDef, targetShip) {
        // targetShip defaults to player if not provided
        const target = targetShip || this.engine.playerShip;
        this.engine.audio.playEnemyLaser();

        // Lead the target's movement for smarter aiming
        const dist = Math.hypot(target.x - enemy.x, target.y - enemy.y);
        const timeToHit = dist / typeDef.bulletSpeed;
        const leadX = target.x + (target.vx || 0) * timeToHit * 0.3;
        const leadY = target.y + (target.vy || 0) * timeToHit * 0.3;
        const leadAngle = Math.atan2(leadY - enemy.y, leadX - enemy.x);

        // Add slight inaccuracy
        const spread = (Math.random() - 0.5) * 0.15;

        const dmgMult = enemy.diffMultiplier || 1.0;
        this.engine.enemyBullets.push({
            x: enemy.x + Math.cos(leadAngle) * (typeDef.size + 5),
            y: enemy.y + Math.sin(leadAngle) * (typeDef.size + 5),
            vx: Math.cos(leadAngle + spread) * typeDef.bulletSpeed,
            vy: Math.sin(leadAngle + spread) * typeDef.bulletSpeed,
            rotation: leadAngle + spread,
            damage: typeDef.bulletDamage * dmgMult,
            life: 80, // ~1.3 seconds
            color: typeDef.color,
            faction: enemy.faction, // Track which faction fired this bullet
            width: 3,
            length: 25
        });
    }

    updateEnemyBullets() {
        if (!this.engine.flightMode || !this.engine.playerShip) return;

        const ship = this.engine.playerShip;

        for (let i = this.engine.enemyBullets.length - 1; i >= 0; i--) {
            const b = this.engine.enemyBullets[i];
            b.x += b.vx;
            b.y += b.vy;
            b.life--;

            if (b.life <= 0) {
                this.engine.enemyBullets.splice(i, 1);
                continue;
            }

            let bulletDestroyed = false;

            // Bullets from FRIENDLY factions should not damage the player (rep > 0)
            // Only damage player if the faction is hostile (rep < 0) or has no faction tag
            const bulletFactionRep = b.faction ? (this.engine.factionRep[b.faction] || 0) : -1;
            if (bulletFactionRep < 0) {
                const dist = Math.hypot(b.x - ship.x, b.y - ship.y);
                if (dist < 30) {
                    this.engine.createExplosion(b.x, b.y, 'hit');
                    this.engine.damagePlayer(b.damage);
                    this.engine.enemyBullets.splice(i, 1);
                    bulletDestroyed = true;
                    continue;
                }
            }

            // Check collision with other factions (Enemies)
            for (let j = this.engine.enemyShips.length - 1; j >= 0; j--) {
                const enemy = this.engine.enemyShips[j];
                // Faction check: Terran bullets hit non-terran, Enemy bullets hit different factions
                if (b.faction && enemy.faction && b.faction !== enemy.faction) {
                    const eDef = InterstellarEngine.ENEMY_TYPES[enemy.type];
                    const distEnemy = Math.hypot(b.x - enemy.x, b.y - enemy.y);
                    if (distEnemy < (eDef.size || 20) + 5) {
                        this.engine.createExplosion(b.x, b.y, 'hit');
                        enemy.health -= b.damage;
                        if (enemy.health <= 0) {
                            this.engine.destroyEnemyShip(j);
                        } else {
                            enemy.hitFlash = 10;
                        }
                        this.engine.enemyBullets.splice(i, 1);
                        bulletDestroyed = true;
                        break;
                    }
                }
            }

            if (bulletDestroyed) continue;

            // Check collision with Boss
            if (this.engine.activeBoss && b.faction === 'terran') {
                const boss = this.engine.activeBoss;
                const bDef = InterstellarEngine.BOSS_TYPES[boss.type];
                const distBoss = Math.hypot(b.x - boss.x, b.y - boss.y);
                if (distBoss < bDef.size + 10) {
                    this.engine.createExplosion(b.x, b.y, 'hit');
                    boss.health -= b.damage;
                    boss.hitFlash = 15;
                    this.engine.enemyBullets.splice(i, 1);
                    bulletDestroyed = true;
                    // Check boss death is handled in updateBoss()
                }
            }
        }
    }

    destroyEnemyShip(index) {
        const enemy = this.engine.enemyShips[index];
        const typeDef = InterstellarEngine.ENEMY_TYPES[enemy.type];

        // Big explosion
        this.engine.createExplosion(enemy.x, enemy.y, 'destruction');

        // Award gems (Buffed for mid-to-high tier)
        const gemMult = typeDef.rarity === 'boss' ? 1.5 : (typeDef.rank >= 2 ? 1.2 : 1.0);
        this.engine.playerGems += Math.ceil(typeDef.gemDrop * gemMult);
        localStorage.setItem('playerGems', this.engine.playerGems);

        // Increment kill counter
        this.engine.enemyKills++;
        this.engine.playerStats.kills++;
        this.engine.saveStats();

        // Track mission progress
        if (this.engine.activeMission) {
            if (this.engine.activeMission.type === 'kill' && this.engine.activeMission.targetType === enemy.type) {
                this.engine.activeMission.progress++;
                this.engine.updateMissionHUD();
                this.engine.checkMissionComplete();
            } else if (this.engine.activeMission.type === 'kill_any') {
                this.engine.activeMission.progress++;
                this.engine.updateMissionHUD();
                this.engine.checkMissionComplete();
            }
        }

        // Drop mineral loot
        const lootTypes = ['diamond', 'ruby', 'sapphire', 'gold', 'platinum'];
        const lootType = lootTypes[Math.floor(Math.random() * lootTypes.length)];
        this.engine.spawnLoot(enemy.x, enemy.y, lootType, Math.ceil(typeDef.gemDrop / 3));

        // Drop power-up (15% chance, guaranteed for boss)
        if (Math.random() < 0.15 || typeDef.rarity === 'boss') {
            const puTypes = ['shield_boost', 'hull_repair', 'weapon_overdrive', 'speed_boost'];
            const puType = puTypes[Math.floor(Math.random() * puTypes.length)];
            this.engine.powerUps.push({
                x: enemy.x,
                y: enemy.y,
                type: puType,
                phase: Math.random() * Math.PI * 2,
                size: 20
            });
        }

        this.engine.showToast(`💥 ${typeDef.name} destroyed! +${typeDef.gemDrop} Gems`, 2000);

        this.engine.enemyShips.splice(index, 1);
    }

    // === BOSS FIGHT SYSTEM ===

    static BOSS_TYPES = {
        dreadnought: {
            name: 'Dreadnought',
            health: 500,
            size: 50,
            speed: 1.2,
            acceleration: 0.02,
            fireRate: 1500,
            bulletSpeed: 6,
            bulletDamage: 20,
            gemReward: 100,
            color: '#ff2222',
            glowColor: 'rgba(255, 34, 34, 0.7)',
            mechanic: 'shield_arc' // Frontal shield, attack from behind
        },
        hivequeen: {
            name: 'Hive Queen',
            health: 400,
            size: 45,
            speed: 1.0,
            acceleration: 0.015,
            fireRate: 2500,
            bulletSpeed: 5,
            bulletDamage: 15,
            gemReward: 150,
            color: '#44ff44',
            glowColor: 'rgba(68, 255, 68, 0.7)',
            mechanic: 'spawn_swarm' // Spawns scouts every 5s
        },
        voidreaper: {
            name: 'Void Reaper',
            health: 600,
            size: 55,
            speed: 2.0,
            acceleration: 0.04,
            fireRate: 2000,
            bulletSpeed: 5,
            bulletDamage: 30,
            gemReward: 200,
            color: '#9944ff',
            glowColor: 'rgba(153, 68, 255, 0.7)',
            mechanic: 'teleport' // Teleports when hit, fires homing bolts
        }
    };

    spawnBoss(bossType) {
        if (this.engine.activeBoss) return; // Only one boss at a time

        const typeDef = InterstellarEngine.BOSS_TYPES[bossType];
        if (!typeDef) return;

        const ship = this.engine.playerShip;
        const angle = Math.random() * Math.PI * 2;
        const dist = 1200;

        this.engine.activeBoss = {
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

        this.engine.showToast(`⚠️ BOSS INCOMING: ${typeDef.name}! ⚠️`, 4000);
        this.engine.audio.playBossAlert();
    }

    updateBoss() {
        if (!this.engine.activeBoss || !this.engine.flightMode || !this.engine.playerShip) return;

        const boss = this.engine.activeBoss;
        const ship = this.engine.playerShip;
        const typeDef = InterstellarEngine.BOSS_TYPES[boss.type];
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
                    aDiff = Math.atan2(Math.sin(aDiff), Math.cos(aDiff));
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
                        const scoutDef = InterstellarEngine.ENEMY_TYPES.scout;
                        this.engine.enemyShips.push({
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

                    this.engine.showToast('🐛 Hive Queen spawned reinforcements!', 1500);
                }
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    aDiff = Math.atan2(Math.sin(aDiff), Math.cos(aDiff));
                    boss.rotation += aDiff * 0.02;
                }
                break;

            case 'voidreaper':
                // Teleport handled in damageBoss()
                if (!isPlayerCloaked) {
                    let aDiff = angleToPlayer - boss.rotation;
                    aDiff = Math.atan2(Math.sin(aDiff), Math.cos(aDiff));
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
            this.engine.fireBossBullet(boss, typeDef);
            boss.lastFireTime = now;
        }

        // Boss-player collision
        if (distToPlayer < typeDef.size + 30) {
            this.engine.damagePlayer(30);
        }

        // Decay hit flash
        if (boss.hitFlash > 0) boss.hitFlash--;
        if (boss.teleportCooldown > 0) boss.teleportCooldown--;
    }

    fireBossBullet(boss, typeDef) {
        const ship = this.engine.playerShip;
        const angleToPlayer = Math.atan2(ship.y - boss.y, ship.x - boss.x);

        // Boss fires 2-3 bullets in a spread
        const bulletCount = boss.phase === 2 ? 3 : 2;
        const spreadAngle = 0.2;

        for (let i = 0; i < bulletCount; i++) {
            const offset = (i - (bulletCount - 1) / 2) * spreadAngle;
            const angle = angleToPlayer + offset;

            this.engine.enemyBullets.push({
                x: boss.x + Math.cos(angle) * (typeDef.size + 10),
                y: boss.y + Math.sin(angle) * (typeDef.size + 10),
                vx: Math.cos(angle) * typeDef.bulletSpeed,
                vy: Math.sin(angle) * typeDef.bulletSpeed,
                rotation: angle,
                damage: typeDef.bulletDamage,
                life: 100,
                color: typeDef.color,
                width: 4,
                length: 30
            });
        }
    }

    damageBoss(amount) {
        if (!this.engine.activeBoss) return;

        const boss = this.engine.activeBoss;
        const typeDef = InterstellarEngine.BOSS_TYPES[boss.type];

        // Dreadnought shield check — blocks frontal damage
        if (boss.type === 'dreadnought') {
            const hitAngle = Math.atan2(this.engine.playerShip.y - boss.y, this.engine.playerShip.x - boss.x);
            let shieldDiff = hitAngle - boss.rotation;
            shieldDiff = Math.atan2(Math.sin(shieldDiff), Math.cos(shieldDiff));
            // Shield covers front 120 degrees
            if (Math.abs(shieldDiff) < Math.PI / 3) {
                this.engine.showToast('🛡️ Shield blocked!', 1000);
                return;
            }
        }

        // Void Reaper teleport on hit
        if (boss.type === 'voidreaper' && boss.teleportCooldown <= 0) {
            const tAngle = Math.random() * Math.PI * 2;
            boss.x += Math.cos(tAngle) * 300;
            boss.y += Math.sin(tAngle) * 300;
            boss.teleportCooldown = 60; // ~1 second cooldown
        }

        boss.health -= amount;
        boss.hitFlash = 10;

        if (boss.health <= 0) {
            this.engine.destroyBoss();
        }
    }

    destroyBoss() {
        if (!this.engine.activeBoss) return;

        const boss = this.engine.activeBoss;
        const typeDef = InterstellarEngine.BOSS_TYPES[boss.type];

        // Massive explosion
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                if (this.engine.activeBoss === null && i > 0) return;
                this.engine.createExplosion(
                    boss.x + (Math.random() - 0.5) * typeDef.size * 2,
                    boss.y + (Math.random() - 0.5) * typeDef.size * 2,
                    'destruction'
                );
            }, i * 200);
        }

        // Award gems
        this.engine.playerGems += typeDef.gemReward;
        localStorage.setItem('playerGems', this.engine.playerGems);

        // Track boss kills
        this.engine.bossesDefeated++;
        localStorage.setItem('bossesDefeated', this.engine.bossesDefeated);

        // Rich loot drop
        const rareLoots = ['antimatter', 'darkmatter', 'neodymium', 'lanthanum'];
        const lootType = rareLoots[Math.floor(Math.random() * rareLoots.length)];
        this.engine.spawnLoot(boss.x, boss.y, lootType, 20);

        this.engine.showToast(`🏆 BOSS DEFEATED: ${typeDef.name}! +${typeDef.gemReward} Gems! 🏆`, 5000);

        // Track mission
        if (this.engine.activeMission && this.engine.activeMission.type === 'boss') {
            this.engine.activeMission.progress++;
            this.engine.updateMissionHUD();
            this.engine.checkMissionComplete();
        }

        this.engine.activeBoss = null;
    }

    // === MISSION SYSTEM ===

    static MISSION_TEMPLATES = [
        // TIER 1: BASICS — Teach the player how to exist in the game
        {
            type: 'collect', name: 'First Steps', tier: 1,
            desc: 'Fly into {goal} glowing gems floating nearby',
            briefing: 'See those colorful crystals floating around you? Those are gems! Just fly your ship into them to pick them up — no buttons needed, just touch them. Use W to go forward, A/D to turn, SHIFT to go faster.',
            hint: '💡 Just fly INTO the gems • W = forward • A/D = turn • SHIFT = fast',
            goal: 5, reward: 500
        },
        {
            type: 'collect', name: 'Resource Expedition', tier: 1,
            desc: 'Pick up {goal} gems — fly further out for rarer ones',
            briefing: 'Gems come in different types: common ones are dull, rare ones glow brighter and are worth more. Fly away from where you started to find better gems. Check your Radar (circle in top-left) to see gem dots nearby.',
            hint: '💡 Fly further from start = better gems • Radar shows nearby gems',
            goal: 15, reward: 750
        },
        {
            type: 'survive', name: 'Stay Alive', tier: 1,
            desc: 'Fly around for {goal} seconds without dying',
            briefing: 'Your ship can be destroyed! Red triangles on your radar are space mines — avoid them. If you see red dots moving toward you, those are enemies — fly away for now. Your health bar is in the Ship Status window. Timer starts when you accept this mission.',
            hint: '🛡️ Red triangles = mines (avoid!) • Red dots = enemies • SHIFT = escape fast',
            goal: 30, reward: 600
        },

        // TIER 2: COMBAT — Teach the player how to fight
        {
            type: 'kill', name: 'Weapons Training', tier: 2, targetType: 'scout',
            desc: 'Press SPACE to shoot and destroy {goal} Scout ships',
            briefing: 'Your ship has guns! Hold SPACE to fire lasers. When you accept this mission, Scout ships will spawn nearby — look for red dots on your radar. Fly toward them and hold SPACE to shoot. Scouts are weak and die in a few hits.',
            hint: '⚔️ Hold SPACE to shoot! • Red dots on radar = enemies • Fly toward them',
            goal: 3, reward: 1500
        },
        {
            type: 'kill', name: 'Fighter Patrol', tier: 2, targetType: 'fighter',
            desc: 'Destroy {goal} Fighters — they shoot back!',
            briefing: 'Fighters are tougher than Scouts and will fire at you! Keep your ship moving while shooting (hold W + SPACE together). If your health drops low, fly away with SHIFT to boost. Destroyed enemies drop bonus gems!',
            hint: '⚔️ W + SPACE = fly and shoot • SHIFT = escape if low health',
            goal: 3, reward: 2000
        },
        {
            type: 'kill_any', name: 'Space Cleaner', tier: 2,
            desc: 'Destroy {goal} enemies of any kind (SPACE to fire)',
            briefing: 'Kill any enemies you find — Scouts, Fighters, anything counts. Enemies appear as red dots on your radar. After killing enemies, spend your gems on upgrades! Click the 🛠️ UPGRADES button in the menu bar to make your ship stronger.',
            hint: '⚔️ Any enemy counts • SPACE = fire • 🛠️ UPGRADES button = power up your ship',
            goal: 8, reward: 2500
        },
        {
            type: 'sabotage', name: 'Operation: Sabotage', tier: 2,
            desc: 'Clear {goal} Space Mines from the sector',
            briefing: 'Space mines (red triangles) are drifting everywhere. Use your lasers (SPACE) to detonate them from a safe distance. This clears the way for our freighters. Be careful: their explosion radius is large!',
            hint: '💣 Shoot red triangles • Stay back! • Large explosion radius',
            goal: 10, reward: 1800
        },

        // TIER 3: ADVANCED — Challenge the player
        {
            type: 'collect', name: 'Deep Mining', tier: 3,
            desc: 'Collect {goal} gems — explore far from spawn',
            briefing: 'You need a lot of gems for this one. Press M to open your Galaxy Map and see the full universe. Fly far from center to find richer gem fields. Pro tip: the Hauler ship (in Hangar 🚀) has a Tractor Beam that magnetically pulls gems toward you!',
            hint: '💎 M = Galaxy Map • Hauler ship = magnet for gems • Fly far out',
            goal: 30, reward: 5000
        },
        {
            type: 'survive', name: 'Endurance Run', tier: 3,
            desc: 'Stay alive for {goal} seconds — things get dangerous',
            briefing: 'The further you fly from where you started, the more dangerous space gets — more mines, turrets, and enemies appear. For this mission, just survive! You can dodge with R/F (pitch up/down) and Z/X (barrel roll). Timer runs from when you accept.',
            hint: '🛡️ R/F = pitch • Z/X = barrel roll • Fly away from danger • Stay alive!',
            goal: 60, reward: 6000
        },
        {
            type: 'siege', name: 'Operation: Fortress Siege', tier: 3,
            desc: 'Destroy {goal} Missile Launch Bases',
            briefing: 'Standard enemy patrols are one thing, but their stationary Missile Bases are the real threat. They fire long-range heat-seeking missiles. Destroy the bases to weaken their hold on this sector. Use SHIFT to outrun the missiles!',
            hint: '🛡️ Destroy red circular bases • Outrun missiles with SHIFT • High reward',
            goal: 2, reward: 8000
        },
        {
            type: 'defense', name: 'Operation: Citadel Guard', tier: 3,
            desc: 'Protect your Planetary Base from Mauler Siege Fleet',
            briefing: 'Enemy forces have located your base! A squadron of armored Maulers is moving in to dismantle your structures. Return to your base coordinates immediately and hold the line. Use your base turrets for support!',
            hint: '🛡️ Defend your Base • Maulers are slow but tough • Look for base icon on radar',
            goal: 4, reward: 7500
        },

        // TIER 4: BOSS FIGHTS — The ultimate challenge
        {
            type: 'boss', name: 'Boss: Dreadnought', tier: 4, bossType: 'dreadnought',
            desc: 'A massive warship spawns — destroy it! (SPACE to fire)',
            briefing: 'When you accept, a Dreadnought boss will spawn near you. It has front shields — fly BEHIND it to deal damage! Hold SPACE to fire. Use SHIFT to boost past its missiles. This is a real fight — make sure your ship is upgraded first!',
            hint: '👑 Fly BEHIND it! • Front shields block shots • SHIFT dodges missiles',
            goal: 1, reward: 18000
        },
        {
            type: 'boss', name: 'Boss: Hive Queen', tier: 4, bossType: 'hivequeen',
            desc: 'A giant alien queen spawns — destroy it!',
            briefing: 'The Hive Queen spawns swarms of small drones. Kill the drones first (SPACE to fire), then focus on the Queen. She moves unpredictably so be patient. Reward: 150 gems — the biggest payout yet!',
            hint: '👑 Kill drones first • Then focus the Queen • Be patient!',
            goal: 1, reward: 22000
        },
        {
            type: 'boss', name: 'Boss: Void Reaper', tier: 4, bossType: 'voidreaper',
            desc: 'The deadliest boss in the game — can you beat it?',
            briefing: 'The Void Reaper teleports and fires devastating energy beams. Keep your distance and only attack during its cooldown windows. This is the hardest fight in the game. Reward: 200 gems!',
            hint: '👑 It teleports! • Attack during cooldowns only • Hardest boss!',
            goal: 1, reward: 30000
        },
        {
            type: 'kill_any', name: 'Legendary Rampage', tier: 4,
            desc: 'Destroy {goal} enemies — try different ships from the Hangar!',
            briefing: 'All-out war. Destroy everything. Each ship in the Hangar (🚀 SHIP button) has a unique special ability — try them all! The Viper has speed boost, the Titan has armor, the Flux can phase through damage. Pick your favorite and dominate!',
            hint: '⚔️ 🚀 SHIP button = switch ships • Each ship has a unique ability!',
            goal: 15, reward: 15000
        }
    ];

    generateMissionBoard() {
        // Progressive mission board: show one from each available tier
        // Tier unlocking: Tier 1 always, Tier 2 after 2 missions, Tier 3 after 5, Tier 4 after 8
        const completed = this.engine.missionsCompleted || 0;
        const templates = InterstellarEngine.MISSION_TEMPLATES;

        let maxTier = 1;
        if (completed >= 2) maxTier = 2;
        if (completed >= 5) maxTier = 3;
        if (completed >= 8) maxTier = 4;

        // Group by tier
        const available = templates.filter(t => t.tier <= maxTier);
        const shuffled = [...available].sort(() => Math.random() - 0.5);

        // Pick 3, trying to get variety across tiers
        const picked = [];
        const usedTiers = new Set();
        for (const m of shuffled) {
            if (picked.length >= 3) break;
            if (!usedTiers.has(m.tier) || picked.length < 3) {
                picked.push(m);
                usedTiers.add(m.tier);
            }
        }
        return picked.slice(0, 3);
    }

    acceptMission(missionTemplate) {
        if (this.engine.activeMission) {
            this.engine.showToast('⚠️ Complete or abandon current mission first!', 2000);
            return;
        }

        this.engine.activeMission = {
            ...missionTemplate,
            progress: 0,
            startTime: Date.now(),
            desc: missionTemplate.desc.replace('{goal}', missionTemplate.goal)
        };

        this.engine.showToast(`📋 Mission Accepted: ${this.engine.activeMission.name}`, 3000);

        // Spawn boss for boss missions
        if (missionTemplate.type === 'boss' && missionTemplate.bossType) {
            setTimeout(() => this.engine.spawnBoss(missionTemplate.bossType), 2000);
        }

        // Spawn mission targets dynamically so the player doesn't wander blindly
        if (missionTemplate.type === 'kill') {
            const spawnCount = missionTemplate.goal + 2; // Extra to be safe
            for (let i = 0; i < spawnCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.sqrt(Math.random() * (25000000 - 4000000) + 4000000); // 2k to 5k range
                this.engine.enemyShips.push({
                    x: this.engine.playerShip.x + Math.cos(angle) * dist,
                    y: this.engine.playerShip.y + Math.sin(angle) * dist,
                    vx: 0,
                    vy: 0,
                    type: missionTemplate.targetType,
                    health: InterstellarEngine.ENEMY_TYPES[missionTemplate.targetType]?.maxHealth || 100,
                    lastFire: 0
                });
            }
            this.engine.showToast('⚠️ Mission Targets detected on radar!', 5000);
        } else if (missionTemplate.type === 'mine') {
            for (let i = 0; i < missionTemplate.goal + 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.sqrt(Math.random() * (12250000 - 2250000) + 2250000);
                this.engine.minerals.push({
                    x: this.engine.playerShip.x + Math.cos(angle) * dist,
                    y: this.engine.playerShip.y + Math.sin(angle) * dist,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    type: 'diamond',
                    color: '#00ffff',
                    value: 50,
                    size: 8
                });
            }
            this.engine.showToast('📡 Mineral clusters marked on radar!', 5000);
        } else if (missionTemplate.type === 'defense') {
            // Defense mission spawns targets near the player's BASE
            const baseX = this.engine.spaceBase?.x || 0;
            const baseY = this.engine.spaceBase?.y || 0;
            const spawnCount = missionTemplate.goal;
            for (let i = 0; i < spawnCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.sqrt(Math.random() * (1000000 - 360000) + 360000); // Close range for siege
                this.engine.enemyShips.push({
                    x: baseX + Math.cos(angle) * dist,
                    y: baseY + Math.sin(angle) * dist,
                    vx: 0,
                    vy: 0,
                    rotation: 0,
                    patrolAngle: 0,
                    type: 'hauler', // Using hauler as a 'Mauler' reference for mission
                    health: 200,
                    maxHealth: 200,
                    lastFire: 0,
                    faction: 'mauler',
                    state: 'chase' // Make them aggressive
                });
            }
            this.engine.showToast('🚨 BASE UNDER ATTACK! Strategic defenses required.', 5000);
        }

        this.engine.hideMissionBoardUI();

        // If the player is in the hangar, seamlessly enter flight mode!
        if (!this.engine.flightMode) {
            if (typeof this.engine.hideShipModal === 'function') this.engine.hideShipModal();
            this.engine.flightMode = true; // Force ON safely
            if (this.engine.playerShip) {
                this.engine.playerShip.invulnerableUntil = performance.now() + 3000;
            }
            const hud = document.getElementById('flightHUD');
            const floatingLeaders = document.getElementById('floatingLeaders');
            if (hud) hud.classList.remove('hidden');
            if (floatingLeaders) floatingLeaders.classList.remove('hidden');
        }
        this.engine.updateMissionHUD();
    }

    abandonMission() {
        if (!this.engine.activeMission) return;
        this.engine.showToast(`❌ Mission abandoned: ${this.engine.activeMission.name}`, 2000);
        if (this.engine.activeBoss && this.engine.activeMission.type === 'boss') {
            this.engine.activeBoss = null; // Remove boss
        }
        this.engine.activeMission = null;
        this.engine.updateMissionHUD();
    }

    checkMissionComplete() {
        if (!this.engine.activeMission) return;

        const m = this.engine.activeMission;

        // Check survival timer
        if (m.type === 'survive') {
            const elapsed = (Date.now() - m.startTime) / 1000;
            m.progress = Math.floor(elapsed);
        }

        if (m.progress >= m.goal) {
            // Mission complete!
            this.engine.playerGems += m.reward;
            localStorage.setItem('playerGems', this.engine.playerGems);
            this.engine.missionsCompleted++;
            localStorage.setItem('missionsCompleted', this.engine.missionsCompleted);
            if (this.engine.updateGemsUI) this.engine.updateGemsUI();

            // Launch the cinematic achievement overlay
            this.engine.showMissionCompleteOverlay(m);
            this.engine.audio.playMissionComplete();
            this.engine.activeMission = null;
            this.engine.updateMissionHUD();
        }
    }

    showMissionCompleteOverlay(mission) {
        // Remove any existing overlay
        const existing = document.getElementById('missionCompleteOverlay');
        if (existing) existing.remove();

        // Determine performance rank
        const elapsed = (Date.now() - mission.startTime) / 1000;
        let rank, rankColor, rankGlow;
        if (elapsed < 30) { rank = 'S'; rankColor = '#ffd700'; rankGlow = 'rgba(255,215,0,0.8)'; }
        else if (elapsed < 60) { rank = 'A'; rankColor = '#00ff88'; rankGlow = 'rgba(0,255,136,0.6)'; }
        else if (elapsed < 120) { rank = 'B'; rankColor = '#00ccff'; rankGlow = 'rgba(0,204,255,0.5)'; }
        else { rank = 'C'; rankColor = '#aaaaaa'; rankGlow = 'rgba(170,170,170,0.4)'; }

        // Build the overlay
        const overlay = document.createElement('div');
        overlay.id = 'missionCompleteOverlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 99999; pointer-events: none;
            display: flex; align-items: center; justify-content: center;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%);
            animation: mco-fadein 0.3s ease-out;
        `;

        // Particle canvas for celebration effects
        const particleCanvas = document.createElement('canvas');
        particleCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
        overlay.appendChild(particleCanvas);

        // Central achievement card
        const card = document.createElement('div');
        card.style.cssText = `
            position: relative; z-index: 2;
            background: linear-gradient(145deg, rgba(10,20,40,0.95), rgba(5,10,25,0.98));
            border: 2px solid ${rankColor};
            border-radius: 16px; padding: 40px 60px;
            text-align: center; font-family: 'Orbitron', 'Exo 2', monospace;
            box-shadow: 0 0 60px ${rankGlow}, 0 0 120px ${rankGlow}, inset 0 0 40px rgba(0,0,0,0.5);
            animation: mco-card-enter 0.6s cubic-bezier(0.2,0.8,0.2,1.2);
            max-width: 480px; min-width: 360px;
        `;

        // Mission type icon
        let typeIcon = '🎯';
        if (mission.type === 'kill' || mission.type === 'kill_any') typeIcon = '⚔️';
        else if (mission.type === 'boss') typeIcon = '👑';
        else if (mission.type === 'collect') typeIcon = '💎';
        else if (mission.type === 'survive') typeIcon = '🛡️';

        card.innerHTML = `
            <div style="font-size: 12px; color: #555; letter-spacing: 6px; margin-bottom: 8px; text-transform: uppercase;">Mission Complete</div>
            <div style="font-size: 48px; margin-bottom: 4px; filter: drop-shadow(0 0 10px ${rankGlow});">${typeIcon}</div>
            <div style="font-size: 22px; color: #fff; font-weight: 900; letter-spacing: 2px; margin-bottom: 4px;
                text-shadow: 0 0 20px rgba(255,255,255,0.3);">${mission.name}</div>
            <div style="font-size: 13px; color: #aaa; margin-bottom: 20px; font-style: italic;">${mission.desc}</div>

            <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px;">
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">RANK</div>
                    <div id="mco-rank" style="font-size: 42px; font-weight: 900; color: ${rankColor};
                        text-shadow: 0 0 30px ${rankGlow}, 0 0 60px ${rankGlow};
                        animation: mco-rank-pulse 1s ease-in-out infinite alternate;
                        opacity: 0; transform: scale(3);">${rank}</div>
                </div>
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">REWARD</div>
                    <div style="font-size: 32px; color: #ffd700; font-weight: bold;
                        text-shadow: 0 0 20px rgba(255,215,0,0.5);">
                        💎 <span id="mco-gem-counter">0</span>
                    </div>
                </div>
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">TIME</div>
                    <div style="font-size: 22px; color: #8af; font-weight: bold;">${elapsed.toFixed(1)}s</div>
                </div>
            </div>

            <div style="height: 3px; background: linear-gradient(90deg, transparent, ${rankColor}, transparent);
                margin: 15px auto; width: 80%; border-radius: 2px;"></div>

            <div style="font-size: 11px; color: #667; letter-spacing: 2px; margin-top: 8px;">
                TOTAL MISSIONS: ${this.engine.missionsCompleted}
            </div>
        `;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Inject keyframe animations
        if (!document.getElementById('mco-styles')) {
            const style = document.createElement('style');
            style.id = 'mco-styles';
            style.textContent = `
                @keyframes mco-fadein { from { opacity: 0; } to { opacity: 1; } }
                @keyframes mco-fadeout { from { opacity: 1; } to { opacity: 0; } }
                @keyframes mco-card-enter {
                    0% { opacity: 0; transform: scale(0.5) translateY(40px); }
                    60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
                    100% { transform: scale(1) translateY(0); }
                }
                @keyframes mco-rank-pulse {
                    from { text-shadow: 0 0 20px currentColor; }
                    to { text-shadow: 0 0 40px currentColor, 0 0 80px currentColor; }
                }
                @keyframes mco-rank-slam {
                    0% { opacity: 0; transform: scale(3); }
                    50% { opacity: 1; transform: scale(0.8); }
                    70% { transform: scale(1.15); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        // Animate rank letter slam-in after 0.5s
        setTimeout(() => {
            const rankEl = document.getElementById('mco-rank');
            if (rankEl) {
                rankEl.style.animation = 'mco-rank-slam 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards, mco-rank-pulse 1s ease-in-out infinite alternate 0.5s';
            }
        }, 500);

        // Animate gem counter tick-up
        const gemTarget = mission.reward;
        let gemCurrent = 0;
        const gemInterval = setInterval(() => {
            gemCurrent += Math.ceil(gemTarget / 30);
            if (gemCurrent >= gemTarget) {
                gemCurrent = gemTarget;
                clearInterval(gemInterval);
            }
            const counter = document.getElementById('mco-gem-counter');
            if (counter) counter.textContent = gemCurrent;
        }, 40);

        // Particle celebration system on canvas
        const resizeCanvas = () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        };
        resizeCanvas();

        const particles = [];
        const pCtx = particleCanvas.getContext('2d');
        const sparkColors = ['#ffd700', '#ff6b9d', '#00ff88', '#00ccff', '#ff44ff', '#ffaa00'];

        // Burst particles from center
        for (let i = 0; i < 120; i++) {
            const angle = (Math.PI * 2 * i) / 120 + (Math.random() - 0.5) * 0.5;
            const speed = 3 + Math.random() * 8;
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
                life: 1.0,
                decay: 0.008 + Math.random() * 0.012,
                gravity: 0.05 + Math.random() * 0.05,
                type: Math.random() > 0.5 ? 'spark' : 'star'
            });
        }

        // Side confetti streams
        for (let i = 0; i < 60; i++) {
            const side = Math.random() > 0.5 ? 0 : window.innerWidth;
            particles.push({
                x: side,
                y: window.innerHeight * Math.random() * 0.6,
                vx: (side === 0 ? 1 : -1) * (2 + Math.random() * 4),
                vy: -1 + Math.random() * 3,
                size: 3 + Math.random() * 5,
                color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
                life: 1.0,
                decay: 0.006 + Math.random() * 0.008,
                gravity: 0.08,
                type: 'confetti',
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.3
            });
        }

        let animFrame;
        const animateParticles = () => {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.vy += p.gravity;
                p.y += p.vy;
                p.life -= p.decay;
                if (p.rotation !== undefined) p.rotation += p.rotSpeed;

                if (p.life <= 0) { particles.splice(i, 1); continue; }

                pCtx.globalAlpha = p.life;

                if (p.type === 'spark') {
                    pCtx.beginPath();
                    pCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    pCtx.fillStyle = p.color;
                    pCtx.shadowBlur = 15;
                    pCtx.shadowColor = p.color;
                    pCtx.fill();
                    pCtx.shadowBlur = 0;
                } else if (p.type === 'star') {
                    pCtx.save();
                    pCtx.translate(p.x, p.y);
                    pCtx.fillStyle = p.color;
                    pCtx.shadowBlur = 10;
                    pCtx.shadowColor = p.color;
                    pCtx.font = `${p.size * 3}px serif`;
                    pCtx.fillText('✦', 0, 0);
                    pCtx.restore();
                    pCtx.shadowBlur = 0;
                } else if (p.type === 'confetti') {
                    pCtx.save();
                    pCtx.translate(p.x, p.y);
                    pCtx.rotate(p.rotation);
                    pCtx.fillStyle = p.color;
                    pCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                    pCtx.restore();
                }
            }
            pCtx.globalAlpha = 1;

            if (particles.length > 0) {
                animFrame = requestAnimationFrame(animateParticles);
            }
        };
        animateParticles();

        // Auto-dismiss after 5 seconds with fade-out
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.animation = 'mco-fadeout 0.8s ease-in forwards';
                setTimeout(() => {
                    cancelAnimationFrame(animFrame);
                    overlay.remove();
                }, 800);
            }
        }, 5000);
    }

    updateMissionHUD() {
        const section = document.getElementById('sectionMission');
        const content = document.getElementById('missionContent');
        if (!section || !content) return;

        if (this.engine.activeMission && this.engine.flightMode) {
            section.style.display = 'flex';
            // Make mission window VERY prominent with pulsing glow
            section.style.border = '2px solid #00ffcc';
            section.style.boxShadow = '0 0 20px rgba(0,255,204,0.5), 0 0 40px rgba(0,255,204,0.2), inset 0 0 15px rgba(0,255,204,0.1)';
            section.style.animation = 'missionPulse 2s ease-in-out infinite';
            section.style.zIndex = '50';
            // Inject keyframe if not present
            if (!document.getElementById('missionPulseStyle')) {
                const style = document.createElement('style');
                style.id = 'missionPulseStyle';
                style.textContent = `
                    @keyframes missionPulse {
                        0%, 100% { box-shadow: 0 0 20px rgba(0,255,204,0.5), 0 0 40px rgba(0,255,204,0.2); border-color: #00ffcc; }
                        50% { box-shadow: 0 0 30px rgba(0,255,204,0.8), 0 0 60px rgba(0,255,204,0.4); border-color: #66ffdd; }
                    }
                `;
                document.head.appendChild(style);
            }
            const m = this.engine.activeMission;
            const pct = Math.min(100, Math.round((m.progress / m.goal) * 100));
            
            // Use the mission-specific hint if available, fall back to generic
            let tip = '';
            if (m.hint) {
                tip = `<div style="color: #00eaff; font-size: 11px; margin-top: 8px; font-style: italic; font-weight: bold; line-height: 1.4; background: rgba(0,234,255,0.08); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #00eaff;">${m.hint}</div>`;
            } else if (m.type === 'kill' || m.type === 'kill_any' || m.type === 'boss') {
                tip = '<div style="color: #ff6b6b; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(255,50,50,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #ff6b6b;">🎯 Hold [SPACE] to Fire Weapons</div>';
            } else if (m.type === 'collect') {
                tip = '<div style="color: #f17eff; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(241,126,255,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #f17eff;">💎 Fly over glowing gems to collect</div>';
            } else if (m.type === 'survive') {
                tip = '<div style="color: #ffaa00; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(255,170,0,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #ffaa00;">⚠️ Dodge hazards — stay alive!</div>';
            }
            
            content.innerHTML = `
                <div style="color: #00ffcc; font-weight: bold; font-size: 14px; margin-bottom: 4px; text-shadow: 0 0 8px rgba(0,255,204,0.4);">${m.name}</div>
                <div style="color: #ddd; margin-bottom: 8px; font-size: 12px; line-height: 1.4;">${m.desc}</div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 6px; padding: 8px; margin-bottom: 4px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #aaa; margin-bottom: 4px;">
                        <span>PROGRESS</span>
                        <span style="color: #00ff88; font-weight: bold;">${m.progress} / ${m.goal}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); border-radius: 3px; height: 8px; overflow: hidden;">
                        <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #00ff88, #00ffcc); border-radius: 3px; transition: width 0.3s ease; box-shadow: 0 0 8px rgba(0,255,136,0.5);"></div>
                    </div>
                </div>
                ${tip}
            `;
        } else {
            section.style.display = 'none';
            section.style.border = '';
            section.style.boxShadow = '';
            section.style.animation = '';
        }
    }

    toggleMissionBoard() {
        this.engine.missionBoardOpen = !this.engine.missionBoardOpen;
        if (this.engine.missionBoardOpen) {
            this.engine.showMissionBoardUI();
            if (this.engine.flightMode) this.engine.gamePaused = true;
        } else {
            this.engine.hideMissionBoardUI();
            if (this.engine.flightMode) this.engine.gamePaused = false;
        }
    }

    showMissionBoardUI() {
        // Remove existing
        let overlay = document.getElementById('missionBoardOverlay');
        if (overlay) overlay.remove();

        const missions = this.engine.generateMissionBoard();

        overlay = document.createElement('div');
        overlay.id = 'missionBoardOverlay';
        overlay.className = 'modal-overlay';
        // Add active in next frame for transition
        setTimeout(() => overlay.classList.add('active'), 10);

        this.engine.gamePaused = true;

        let html = `
        <div class="modal" style="width: 500px; max-width: 95vw;">
            <div class="modal-close-corner">
                <button class="btn-secondary" onclick="window.game.hideMissionBoardUI()">EXIT MISSIONS</button>
            </div>
            <h2 style="color: #00ffcc; text-shadow: 0 0 10px rgba(0, 255, 204, 0.5); font-family: 'Cinzel', serif; margin-top: 0; text-align: center;">MISSION BOARD</h2>
            <p style="color: #888; font-size: 11px; text-align: center; margin: 0 0 20px;">Missions Completed: ${this.engine.missionsCompleted} | Bosses Defeated: ${this.engine.bossesDefeated}</p>
            <div style="overflow-y: auto; max-height: 400px; padding-right: 10px;">
        `;

        if (this.engine.activeMission) {
            html += `<div style="background: rgba(255,170,0,0.15); border: 1px solid #ffaa00; border-radius: 8px; padding: 15px; margin-bottom: 10px;">`;
            html += `<div style="color: #ffaa00; font-size: 14px; font-weight: bold; margin-bottom: 5px;">ACTIVE: ${this.engine.activeMission.name}</div>`;
            html += `<div style="color: #ccc; font-size: 12px; margin: 4px 0;">${this.engine.activeMission.desc}</div>`;
            if (this.engine.activeMission.hint) {
                html += `<div style="color: #00eaff; font-size: 10px; margin: 8px 0; font-style: italic;">${this.engine.activeMission.hint}</div>`;
            }
            html += `<div style="color: #00ff88; font-size: 12px; margin-top: 10px; font-weight: bold;">Progress: ${this.engine.activeMission.progress}/${this.engine.activeMission.goal}</div>`;
            html += `<button onclick="window.game.abandonMission(); window.game.hideMissionBoardUI();" class="btn-small" style="
                margin-top: 12px; width: 100%; background: rgba(255,50,50,0.2); color: #ff4444; border-color: #ff4444;
            ">ABANDON MISSION</button></div>`;
        } else {
            const tierColors = { 1: '#00ff88', 2: '#ffaa00', 3: '#ff6b9d', 4: '#ff44ff' };
            const tierLabels = { 1: 'BASICS', 2: 'COMBAT', 3: 'ADVANCED', 4: 'ELITE' };
            missions.forEach((m, i) => {
                const desc = m.desc.replace('{goal}', m.goal);
                const tierCol = tierColors[m.tier] || '#00ffcc';
                const tierLabel = tierLabels[m.tier] || 'MISSION';
                html += `<div style="background: rgba(0,255,204,0.05); border: 1px solid rgba(0,255,204,0.2); border-radius: 8px; padding: 15px; margin-bottom: 10px; transition: all 0.2s ease;">`;
                html += `<div style="display: flex; justify-content: space-between; align-items: flex-start;">`;
                html += `<div style="flex:1; padding-right: 15px;"><div style="display:flex; align-items:center; gap:8px; margin-bottom: 6px;"><span style="font-size:9px; color:${tierCol}; background:rgba(0,0,0,0.5); padding:3px 8px; border-radius:4px; border:1px solid ${tierCol}; letter-spacing:1px; font-weight: bold;">${tierLabel}</span><span style="color: #00ffcc; font-size: 14px; font-weight: bold;">${m.name}</span></div>`;
                html += `<div style="color: #aaa; font-size: 12px; margin-top: 5px;">${desc}</div>`;
                if (m.briefing) {
                    html += `<div style="color: #7ab; font-size: 11px; margin-top: 8px; line-height: 1.5; border-left: 2px solid rgba(0,255,204,0.3); padding-left: 10px;">${m.briefing}</div>`;
                }
                html += `</div>`;
                html += `<div style="text-align: right; min-width: 90px;"><div style="font-size: 10px; color: #667; letter-spacing: 1px; margin-bottom: 4px;">REWARD</div><div style="color: #ffd700; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(255,215,0,0.5);">💎 ${m.reward}</div>`;
                html += `<button onclick="window.game.acceptMission(window.game._boardMissions[${i}])" class="btn-small" style="
                    margin-top: 10px; width: 100%; border-color: #00ffcc; color: #00ffcc;
                ">ACCEPT</button></div></div></div>`;
            });
        }

        html += `</div></div>`; // Close overflow div and modal

        overlay.innerHTML = html;
        document.body.appendChild(overlay);

        // Store missions for button callbacks
        this.engine._boardMissions = missions;
    }

    hideMissionBoardUI() {
        const overlay = document.getElementById('missionBoardOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
        this.engine.missionBoardOpen = false;
        this.engine.gamePaused = false;
    }

    spawnLoot(x, y, type, amount) {
        this.engine.playerInventory[type] = (this.engine.playerInventory[type] || 0) + amount;
        // Use the same {text, color, time} shape as renderCollectionNotifications expects
        this.engine.collectionNotifications.push({
            text: `+${amount} ${type.toUpperCase()}`,
            color: '#ffd700',
            time: Date.now()
        });
    }

    renderProjectiles(ctx) {
        this.engine.projectiles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);

            // Draw Laser Bolt (Glowing)
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ffffff'; // Core

            ctx.beginPath();
            ctx.rect(-p.length / 2, -p.width / 2, p.length, p.width);
            ctx.fill();

            // Outer glow
            ctx.shadowBlur = 0;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.rect(-p.length / 2 - 2, -p.width / 2 - 2, p.length + 4, p.width + 4);
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.restore();
        });
    }

    updateDamageParticles() {
        // Spawn particles based on health
        const ship = this.engine.playerShip;
        if (!ship) return;

        const healthRatio = ship.hullHealth / ship.maxHull;

        // Thresholds
        // < 0.7: Light Smoke (White/Gray)
        // < 0.4: Dark Smoke (Gray/Black)
        // < 0.2: Fire/Sparks (Orange/Red)

        if (healthRatio < 0.7) {
            // Spawn Rate increases as health drops
            // 0.7 -> 1% chance
            // 0.1 -> 20% chance
            const spawnChance = 0.05 + (0.7 - healthRatio) * 0.5;

            if (Math.random() < spawnChance) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 20;

                let type = 'smoke_light';
                let color = '#cccccc';
                let life = 60 + Math.random() * 60;
                let size = 5 + Math.random() * 10;
                let vx = (Math.random() - 0.5) * 1;
                let vy = (Math.random() - 0.5) * 1;

                if (healthRatio < 0.4 && Math.random() < 0.6) {
                    type = 'smoke_dark';
                    color = '#666666';
                    size = 10 + Math.random() * 15;
                }

                if (healthRatio < 0.2 && Math.random() < 0.4) {
                    type = 'spark';
                    color = Math.random() > 0.5 ? '#ffaa00' : '#ff4400';
                    life = 20 + Math.random() * 20;
                    size = 2 + Math.random() * 3;
                    vx = (Math.random() - 0.5) * 4;
                    vy = (Math.random() - 0.5) * 4;
                }

                this.engine.damageParticles.push({
                    x: ship.x + Math.cos(angle) * dist,
                    y: ship.y + Math.sin(angle) * dist,
                    vx: ship.vx * 0.8 + vx, // Inherit some ship velocity
                    vy: ship.vy * 0.8 + vy,
                    size: size,
                    life: life,
                    maxLife: life,
                    color: color,
                    type: type
                });
            }
        }

        // Update
        this.engine.damageParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            p.size += 0.05; // Expands

            if (p.type.includes('smoke')) {
                p.vx *= 0.95;
                p.vy *= 0.95;
            }
        });

        this.engine.damageParticles = this.engine.damageParticles.filter(p => p.life > 0);
    }

    renderDamageEffects(ctx) {
        if (this.engine.damageParticles.length === 0) return;

        this.engine.damageParticles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);

            const alpha = p.life / p.maxLife;
            ctx.globalAlpha = alpha * 0.6;
            ctx.fillStyle = p.color;

            ctx.beginPath();
            ctx.arc(0, 0, p.size / this.engine.camera.zoom, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });
    }

    // Inventory Management
    showGemGuide() {
        const modal = document.getElementById('gemGuideModal');
        if (modal) {
            modal.classList.add('active');
            if (this.engine.flightMode) this.engine.gamePaused = true;
        }
    }

    hideGemGuide() {
        const modal = document.getElementById('gemGuideModal');
        if (modal) {
            modal.classList.remove('active');
            if (this.engine.flightMode) this.engine.gamePaused = false;
        }
    }

    loadInventory() {
        try {
            const saved = localStorage.getItem('playerInventory');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }


    saveInventory() {
        try {
            localStorage.setItem('playerInventory', JSON.stringify(this.engine.playerInventory));
        } catch (e) {
            console.error('Failed to save inventory:', e);
        }
    }
    
    loadPlanetBases() {
        try {
            return JSON.parse(localStorage.getItem('planetBases')) || {};
        } catch (e) {
            return {};
        }
    }
    
    savePlanetBases() {
        try {
            localStorage.setItem('planetBases', JSON.stringify(this.engine.planetBases));
            // Optional: this.engine.syncBaseWithCloud() if needed
        } catch(e) {
            console.error('Failed to save planet bases:', e);
        }
    }
    
    calculateTotalAssets() {
        let total = this.engine.credits || 0;
        
        // Add inventory value
        for (const [type, count] of Object.entries(this.engine.playerInventory || {})) {
            const info = this.engine.mineralTypes[type];
            if (info && info.value) {
                total += info.value * count;
            }
        }
        
        // Add ships value
        if (this.engine.playerShip && this.engine.playerShip.purchased) {
            this.engine.playerShip.purchased.forEach(shipId => {
                const shipDef = window.hangarShips && window.hangarShips[shipId];
                if (shipDef && shipDef.cost) {
                    total += shipDef.cost;
                }
            });
        }
        
        // Add bases value
        const costMap = {
            hab: 1000,
            mine: 2000,
            def: 1500
        };
        for (const base of Object.values(this.engine.planetBases)) {
            for (const key of Object.keys(base)) {
                if (key !== 'planetName' && key !== 'isForSale' && key !== 'salePrice') {
                    const type = base[key];
                    if (costMap[type]) total += costMap[type];
                }
            }
        }
        
        return total;
    }
    
    getMaxBases() {
        const assets = this.engine.calculateTotalAssets();
        if (assets >= 500000) return 5;
        if (assets >= 150000) return 4;
        if (assets >= 50000) return 3;
        if (assets >= 10000) return 2;
        return 1;
    }

    loadCredits() {
        return parseInt(localStorage.getItem('playerCredits')) || 0;
    }

    saveCredits() {
        localStorage.setItem('playerCredits', this.engine.credits);
        // Sync with React bridge if it's a purchase/spend
        this.engine.syncWithCloud();
    }

    loadFactionRep() {
        try {
            const saved = localStorage.getItem('factionRep');
            return saved ? JSON.parse(saved) : { xenon: -20, mauler: -20, terran: 0 };
        } catch (e) {
            console.error('[Storage] FactionRep parse failed, resetting.', e);
            return { xenon: -20, mauler: -20, terran: 0 };
        }
    }

    saveFactionRep() {
        localStorage.setItem('factionRep', JSON.stringify(this.engine.factionRep));
    }

    repairHull() {
        const cost = 2000;
        if (this.engine.credits < cost) {
            this.engine.showToast("❌ Insufficient credits for repair!");
            return;
        }

        this.engine.credits -= cost;
        this.engine.playerShip.hullHealth = this.engine.playerShip.maxHull; // Full restore
        this.engine.saveCredits();
        this.engine.updateShipStatus();
        this.engine.showToast("🔧 HULL REPAIRED! Systems back online.");

        // Play a sound effect if available
        console.log('[Repair] Hull restored for 2000 credits');
    }

    loadUpgrades() {
        try {
            return JSON.parse(localStorage.getItem('playerUpgrades')) || { speed: 0, armor: 0, weapons: 0, shield: 0, cargo: 0, radar: 0, tractor: 0, ecm: 0, flares: 0 };
        } catch (e) {
            return { speed: 0, armor: 0, weapons: 0, shield: 0, cargo: 0, radar: 0, tractor: 0, ecm: 0, flares: 0 };
        }
    }

    saveUpgrades() {
        localStorage.setItem('playerUpgrades', JSON.stringify(this.engine.playerShip.upgrades));
        this.engine.syncWithCloud();
    }

    saveGems() {
        localStorage.setItem('playerGems', this.engine.playerGems);
        this.engine.updateGemsUI();
    }

    loadStats() {
        try {
            return JSON.parse(localStorage.getItem('playerStats')) || {
                kills: 0,
                deaths: 0,
                shotsFired: 0,
                shotsHit: 0
            };
        } catch (e) {
            return {
                kills: 0,
                deaths: 0,
                shotsFired: 0,
                shotsHit: 0
            };
        }
    }

    saveStats() {
        localStorage.setItem('playerStats', JSON.stringify(this.engine.playerStats));
        this.engine.syncWithCloud();
    }

    // === SPACE BASE RESOURCE SYSTEM ===
    loadCarriedResources() {
        try {
            return JSON.parse(localStorage.getItem('carriedResources')) || {};
        } catch (e) {
            return {};
        }
    }

    saveCarriedResources() {
        localStorage.setItem('carriedResources', JSON.stringify(this.engine.carriedResources));
        this.engine.syncBaseWithCloud();
    }

    loadSpaceBase() {
        try {
            return JSON.parse(localStorage.getItem('spaceBase')) || null;
        } catch (e) {
            return null;
        }
    }

    saveSpaceBase() {
        localStorage.setItem('spaceBase', JSON.stringify(this.engine.spaceBase));
        this.engine.syncBaseWithCloud();
    }

    syncBaseWithCloud() {
        window.parent.postMessage({
            type: 'SAVE_GAME_DATA',
            data: {
                carriedResources: this.engine.carriedResources,
                spaceBase: this.engine.spaceBase
            }
        }, '*');
    }

    // Apply 25% death penalty to carried resources
    applyDeathPenalty() {
        let lostResources = {};
        let totalLost = 0;

        for (const [type, qty] of Object.entries(this.engine.carriedResources)) {
            if (qty > 0) {
                const loss = Math.floor(qty * 0.25);
                if (loss > 0) {
                    this.engine.carriedResources[type] -= loss;
                    lostResources[type] = loss;
                    totalLost += loss;
                }
            }
        }

        if (totalLost > 0) {
            this.engine.saveCarriedResources();
            // Build loss message
            const lostNames = Object.entries(lostResources)
                .map(([type, qty]) => `${qty} ${this.engine.mineralTypes[type]?.name || type}`)
                .join(', ');
            this.engine.showToast(`💀 Lost 25% cargo: ${lostNames}`);
            console.log('[Death Penalty] Lost resources:', lostResources);
        }

        return lostResources;
    }

    // Deposit resources from ship to base vault
    depositResources(resourceType, amount) {
        if (!this.engine.spaceBase.isDeployed) {
            this.engine.showToast('⚠️ Deploy your base first!');
            return false;
        }

        const available = this.engine.carriedResources[resourceType] || 0;
        const toDeposit = Math.min(amount, available);

        if (toDeposit <= 0) {
            this.engine.showToast('⚠️ No resources to deposit!');
            return false;
        }

        this.engine.carriedResources[resourceType] -= toDeposit;
        this.engine.spaceBase.resources[resourceType] = (this.engine.spaceBase.resources[resourceType] || 0) + toDeposit;

        this.engine.saveCarriedResources();
        this.engine.saveSpaceBase();

        this.engine.showToast(`📦 Deposited ${toDeposit} ${this.engine.mineralTypes[resourceType]?.name || resourceType}`);
        return true;
    }

    // Withdraw resources from base to ship
    withdrawResources(resourceType, amount) {
        if (!this.engine.spaceBase.isDeployed) {
            this.engine.showToast('⚠️ Deploy your base first!');
            return false;
        }

        const available = this.engine.spaceBase.resources[resourceType] || 0;
        const toWithdraw = Math.min(amount, available);

        if (toWithdraw <= 0) {
            this.engine.showToast('⚠️ No resources in vault!');
            return false;
        }

        this.engine.spaceBase.resources[resourceType] -= toWithdraw;
        this.engine.carriedResources[resourceType] = (this.engine.carriedResources[resourceType] || 0) + toWithdraw;

        this.engine.saveCarriedResources();
        this.engine.saveSpaceBase();

        this.engine.showToast(`📤 Withdrew ${toWithdraw} ${this.engine.mineralTypes[resourceType]?.name || resourceType}`);
        return true;
    }

    // === SPACE BASE DEPLOYMENT & MODULES ===

    // Deploy base at current location
    deployBase() {
        if (this.engine.spaceBase.isDeployed) {
            this.engine.showToast('⚠️ Base already deployed! Toggle towing to move it.');
            return false;
        }

        // Need command center first
        if (!this.engine.hasModule('command')) {
            // Build command center automatically on first deployment
            if (this.engine.credits >= 1000) {
                this.engine.credits -= 1000;
                this.engine.saveCredits();
                this.engine.spaceBase.modules.push({ type: 'command', level: 1, builtAt: Date.now() });
                this.engine.showToast('🏛️ Command Center built!');
            } else {
                this.engine.showToast('⚠️ Need 1,000 credits to build Command Center!');
                return false;
            }
        }

        this.engine.spaceBase.x = this.engine.playerShip.x;
        this.engine.spaceBase.y = this.engine.playerShip.y;
        this.engine.spaceBase.isDeployed = true;
        this.engine.spaceBase.isTowing = false;
        this.engine.saveSpaceBase();

        this.engine.showToast('🏠 Base deployed at current location!');
        return true;
    }

    // Toggle towing mode (pick up base to move it)
    toggleTowing() {
        if (!this.engine.spaceBase.isDeployed) {
            this.engine.showToast('⚠️ No base deployed yet!');
            return false;
        }

        // Must be near base to pick it up
        if (!this.engine.spaceBase.isTowing) {
            const dist = Math.hypot(
                this.engine.playerShip.x - this.engine.spaceBase.x,
                this.engine.playerShip.y - this.engine.spaceBase.y
            );
            if (dist > 500) {
                this.engine.showToast('⚠️ Too far from base! Get closer to tow.');
                return false;
            }
        }

        this.engine.spaceBase.isTowing = !this.engine.spaceBase.isTowing;
        this.engine.saveSpaceBase();

        if (this.engine.spaceBase.isTowing) {
            this.engine.showToast('🔗 Towing base! Speed reduced 50%.');
        } else {
            this.engine.spaceBase.x = this.engine.playerShip.x;
            this.engine.spaceBase.y = this.engine.playerShip.y;
            this.engine.showToast('📍 Base anchored at new location!');
        }
        return true;
    }

    // Check if player has a specific module
    hasModule(moduleType) {
        return this.engine.spaceBase.modules.some(m => m.type === moduleType);
    }

    // Build a new module
    buildModule(moduleType) {
        const moduleDef = this.engine.baseModules[moduleType];
        if (!moduleDef) {
            this.engine.showToast('⚠️ Unknown module type!');
            return false;
        }

        if (!this.engine.spaceBase.isDeployed) {
            this.engine.showToast('⚠️ Deploy your base first!');
            return false;
        }

        // Check prerequisite
        if (moduleDef.required && !this.engine.hasModule(moduleDef.required)) {
            this.engine.showToast(`⚠️ Requires ${this.engine.baseModules[moduleDef.required].name} first!`);
            return false;
        }

        // Check credits
        if (this.engine.credits < moduleDef.cost) {
            this.engine.showToast(`⚠️ Need ${moduleDef.cost} credits!`);
            return false;
        }

        // Check resource costs
        if (moduleDef.resourceCost) {
            for (const [res, amount] of Object.entries(moduleDef.resourceCost)) {
                const available = (this.engine.spaceBase.resources[res] || 0) + (this.engine.carriedResources[res] || 0);
                if (available < amount) {
                    this.engine.showToast(`⚠️ Need ${amount} ${this.engine.mineralTypes[res]?.name || res}!`);
                    return false;
                }
            }

            // Deduct resources (from carried first, then vault)
            for (const [res, amount] of Object.entries(moduleDef.resourceCost)) {
                let remaining = amount;
                if (this.engine.carriedResources[res]) {
                    const fromCarried = Math.min(this.engine.carriedResources[res], remaining);
                    this.engine.carriedResources[res] -= fromCarried;
                    remaining -= fromCarried;
                }
                if (remaining > 0 && this.engine.spaceBase.resources[res]) {
                    this.engine.spaceBase.resources[res] -= remaining;
                }
            }
            this.engine.saveCarriedResources();
        }

        // Deduct credits
        this.engine.credits -= moduleDef.cost;
        this.engine.saveCredits();

        // Build module
        this.engine.spaceBase.modules.push({ type: moduleType, level: 1, builtAt: Date.now() });
        this.engine.saveSpaceBase();

        this.engine.showToast(`${moduleDef.icon} ${moduleDef.name} built!`);
        return true;
    }

    // Check if player is near base (for docking)
    isNearBase() {
        if (!this.engine.spaceBase.isDeployed || this.engine.spaceBase.isTowing) return false;
        const dist = Math.hypot(
            this.engine.playerShip.x - this.engine.spaceBase.x,
            this.engine.playerShip.y - this.engine.spaceBase.y
        );
        return dist < 300;
    }

    // Get base status summary
    getBaseStatus() {
        return {
            isDeployed: this.engine.spaceBase.isDeployed,
            isTowing: this.engine.spaceBase.isTowing,
            moduleCount: this.engine.spaceBase.modules.length,
            modules: this.engine.spaceBase.modules.map(m => ({
                type: m.type,
                name: this.engine.baseModules[m.type]?.name || m.type,
                icon: this.engine.baseModules[m.type]?.icon || '?',
                level: m.level
            })),
            vaultResources: { ...this.engine.spaceBase.resources }
        };
    }

    // Toggle base management panel
    toggleBasePanel() {
        const panel = document.getElementById('basePanelPopup');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            if (panel.style.display === 'block') {
                this.engine.updateBasePanelUI();
                if (this.engine.flightMode) this.engine.gamePaused = true;
            } else {
                if (this.engine.flightMode) this.engine.gamePaused = false;
            }
        } else {
            this.engine.showToast('🏠 Base Menu: ' + this.engine.spaceBase.modules.length + ' modules built');
            // Log available modules for debugging
            console.log('[Base] Status:', this.engine.getBaseStatus());
        }
    }

    // Update base panel UI (if HTML panel exists)
    updateBasePanelUI() {
        const moduleList = document.getElementById('baseModuleList');
        if (moduleList) {
            const modules = this.engine.spaceBase.modules;
            moduleList.innerHTML = modules.map(m => {
                const def = this.engine.baseModules[m.type];
                return `<div class="base-module">${def?.icon || '?'} ${def?.name || m.type} (Lv.${m.level})</div>`;
            }).join('') || '<div class="base-module-empty">No modules built</div>';
        }

        const vaultList = document.getElementById('baseVaultList');
        if (vaultList) {
            const resources = Object.entries(this.engine.spaceBase.resources)
                .filter(([_, qty]) => qty > 0);
            vaultList.innerHTML = resources.map(([type, qty]) => {
                const def = this.engine.mineralTypes[type];
                return `<div class="vault-item" style="color:${def?.color || '#fff'}">
                    ${def?.name || type}: ${qty}
                </div>`;
            }).join('') || '<div class="vault-empty">Vault empty</div>';
        }
    }

    // Deposit all carried resources to base vault
    depositAllResources() {
        if (!this.engine.spaceBase.isDeployed) {
            this.engine.showToast('⚠️ Deploy base first!');
            return false;
        }

        if (!this.engine.isNearBase()) {
            this.engine.showToast('⚠️ Get closer to base!');
            return false;
        }

        let totalDeposited = 0;
        const deposited = [];

        for (const [type, qty] of Object.entries(this.engine.carriedResources)) {
            if (qty > 0) {
                this.engine.spaceBase.resources[type] = (this.engine.spaceBase.resources[type] || 0) + qty;
                deposited.push(`${qty} ${this.engine.mineralTypes[type]?.name || type}`);
                totalDeposited += qty;
                this.engine.carriedResources[type] = 0;
            }
        }

        if (totalDeposited > 0) {
            this.engine.playerShip.cargoCount = 0; // Reset total count
            this.engine.saveCarriedResources();
            this.engine.saveSpaceBase();
            this.engine.showToast(`📦 Deposited: ${deposited.slice(0, 3).join(', ')}${deposited.length > 3 ? '...' : ''}`);
            console.log('[Base] Deposited all:', deposited);

            // Recharge Flares on deposit
            if (this.engine.playerShip && this.engine.playerShip.maxFlares > 0) {
                this.engine.playerShip.flares = this.engine.playerShip.maxFlares;
                this.engine.showToast('🔥 Flares Recharged!');
            }
        } else {
            this.engine.showToast('⚠️ No resources to deposit!');
        }

        return totalDeposited > 0;
    }

    // --- Bridge SDK Implementation ---
    requestLoadData() {
        console.log('[Bridge] Requesting data from cloud...');
        window.parent.postMessage({ type: 'REQUEST_LOAD_DATA' }, '*');
    }

    syncWithCloud() {
        console.log('[Bridge] Syncing credits/upgrades to cloud...');
        window.parent.postMessage({
            type: 'SAVE_GAME_DATA',
            data: {
                aetherCredits: this.engine.credits,
                upgrades: this.engine.playerShip.upgrades
            }
        }, '*');
    }

    handleBridgeMessage(event) {
        const { type, data } = event.data;
        if (type === 'LOAD_GAME_DATA') {
            console.log('[Bridge] Received cloud data:', data);
            if (data.aetherCredits !== undefined) {
                this.engine.credits = data.aetherCredits;
                this.engine.saveCredits(); // Update local as fallback
            }
            if (data.upgrades) {
                this.engine.playerShip.upgrades = data.upgrades;
                // Re-calculate ship stats based on new upgrades
                this.engine.playerShip.maxSpeed = 50 * (1 + (data.upgrades.speed || 0) * 0.2);
                this.engine.playerShip.acceleration = 0.5 * (1 + (data.upgrades.speed || 0) * 0.1);
                this.engine.playerShip.maxHull = 100 * (1 + (data.upgrades.armor || 0) * 0.2);
                this.engine.playerShip.maxShield = 50 * (1 + (data.upgrades.shield || 0) * 0.2);
                this.engine.playerShip.radarRange = 2000 * (1 + (data.upgrades.radar || 0) * 0.3);
                this.engine.playerShip.tractorRadius = 25 * (1 + (data.upgrades.tractor || 0) * 0.5);
                this.engine.saveUpgrades(); // Update local as fallback
            }
            if (data.subscription) {
                this.engine.subscription = data.subscription;
                this.engine.isPro = !!data.subscription.isProPilot;
                console.log('[Bridge] Subscription status updated. Pro Pilot:', this.engine.isPro);
                if (this.engine.isPro) {
                    this.engine.showToast("🚀 Nirvana Pilot Active - 20% Bonus gems enabled!", 5000);
                }
            }
        }
    }

    sellAllGems() {
        console.log('[Sell All] Button clicked!');
        let totalValue = 0;
        let count = 0;
        for (const [type, qty] of Object.entries(this.engine.playerInventory)) {
            if (qty > 0) {
                const val = this.engine.mineralTypes[type].value;
                totalValue += val * qty;
                count += qty;
                this.engine.playerInventory[type] = 0;
            }
        }

        if (totalValue > 0) {
            // Apply Pro Pilot Bonus (20%)
            if (this.engine.isPro) {
                const bonus = Math.floor(totalValue * 0.2);
                totalValue += bonus;
                console.log('[Pro Bonus] Applied +', bonus, 'credits');
            }

            this.engine.credits += totalValue;

            // Also award permanent gems (1 gem per 10 credit value = 10%)
            const gemsAwarded = Math.floor(totalValue / 10);
            this.engine.playerGems += gemsAwarded;
            localStorage.setItem('playerGems', this.engine.playerGems);

            this.engine.saveCredits();
            this.engine.saveInventory();
            this.engine.showToast(`Sold ${count} ores for $${totalValue.toLocaleString()} and earned ${gemsAwarded} Gems!`);
            console.log('[Sell All] Success:', count, 'gems for $', totalValue, 'Gems:', gemsAwarded);

            // Update UI immediately
            this.engine.updateWalletUI();
            this.engine.updateInventoryUI();
            if (this.engine.updateGemsUI) this.engine.updateGemsUI();
        } else {
            this.engine.showToast('No ores to sell');
            console.log('[Sell All] No gems in inventory');
        }
    }

    updateGemsUI() {
        // Update the Hangar Gem counter if it exists
        const hangarGemsEl = document.getElementById('hangarGemBalance');
        if (hangarGemsEl) {
            hangarGemsEl.textContent = this.engine.playerGems.toLocaleString();
        }
        
        // Update the HUD Gem counter
        const hudGemsEl = document.getElementById('hudGemsValue');
        if (hudGemsEl) {
            hudGemsEl.textContent = '💎' + this.engine.playerGems.toLocaleString();
        }

        // Update Top Bar Cargo Display
        const cargoEl = document.getElementById('cargoStatus');
        if (cargoEl && this.engine.playerShip) {
            const count = this.engine.playerShip.cargoCount || 0;
            const max = Math.round(this.engine.playerShip.maxCargo || 1000);
            cargoEl.textContent = `📦 ${count}/${max}`;
            if (count >= max) {
                cargoEl.style.color = '#ff3300';
                cargoEl.style.fontWeight = 'bold';
            } else {
                cargoEl.style.color = '#00ff88';
                cargoEl.style.fontWeight = 'normal';
            }
        }
    }

    updateWalletUI() {
        const creditsEl = document.getElementById('walletValue');
        if (creditsEl && !creditsEl.querySelector('input')) {
            creditsEl.textContent = '$' + this.engine.credits.toLocaleString();
        }
        const shopCreditsEl = document.getElementById('walletValueShop');
        if (shopCreditsEl && !shopCreditsEl.querySelector('input')) {
            shopCreditsEl.textContent = '$' + this.engine.credits.toLocaleString();
        }
        const creditsDisplay = document.getElementById('creditsDisplay'); // Legacy support
        if (creditsDisplay && !creditsDisplay.querySelector('input')) {
            creditsDisplay.textContent = '$' + this.engine.credits.toLocaleString();
        }
    }

    updateInventoryUI() {
        const gemsGrid = document.getElementById('gemsGrid');
        const gemsTotalEl = document.getElementById('gemsTotal');

        if (!gemsGrid) return;

        let totalValue = 0;
        let html = '';

        // Calculate total value
        Object.entries(this.engine.playerInventory || {}).forEach(([type, count]) => {
            const info = this.engine.mineralTypes[type];
            if (info) totalValue += count * info.value;
        });

        // Display ALL types
        Object.keys(this.engine.mineralTypes).forEach(type => {
            const info = this.engine.mineralTypes[type];
            const count = (this.engine.playerInventory && this.engine.playerInventory[type]) || 0;

            const itemValue = count * info.value;
            const valueDisplay = this.engine.showGemValues ? `<span style="color:${info.color}; font-weight:bold; margin-left:6px;">$${Math.round(itemValue).toLocaleString()}</span>` : '';

            const opacity = count > 0 ? 1 : 0.5;
            const bgAlpha = count > 0 ? 0.6 : 0.2;

            html += `
                        <div class="gem-item" style="border:1px solid ${info.color}44; background: rgba(0,0,0,${bgAlpha}); opacity: ${opacity};">
                            <div style="${this.engine.styleGem(type)}"></div>
                            <span style="color:${info.color}">${info.name}</span>
                            <span class="gem-count">×${count}</span>
                            ${valueDisplay}
                        </div>
                    `;
        });

        gemsGrid.innerHTML = html;

        if (gemsTotalEl) {
            gemsTotalEl.textContent = `$${totalValue.toLocaleString()}`;
        }
    }

    upgradeShip(type) {
        const upgradeCosts = [1000, 2500, 5000, 10000, 25000]; // Function of level maybe?
        const currentLevel = this.engine.playerShip.upgrades[type] || 0;

        if (currentLevel >= 5) {
            this.engine.showToast('Max level reached!');
            return;
        }

        const cost = upgradeCosts[currentLevel];
        if (this.engine.credits >= cost) {
            this.engine.credits -= cost;
            this.engine.playerShip.upgrades[type]++;
            this.engine.saveCredits();
            this.engine.saveUpgrades();

            // Apply effects immediately
            const lvl = this.engine.playerShip.upgrades[type];
            if (type === 'speed') {
                this.engine.playerShip.maxSpeed = 50 * (1 + lvl * 0.2);
                this.engine.playerShip.acceleration = 0.5 * (1 + lvl * 0.1);
            } else if (type === 'armor') {
                this.engine.playerShip.maxHull = 100 * (1 + lvl * 0.2);
                this.engine.playerShip.hullHealth = this.engine.playerShip.maxHull; // Repair on upgrade
            } else if (type === 'shield') {
                this.engine.playerShip.maxShield = 50 * (1 + lvl * 0.2);
                this.engine.playerShip.shield = this.engine.playerShip.maxShield;
            } else if (type === 'radar') {
                this.engine.playerShip.radarRange = 2000 * (1 + lvl * 0.3);
            } else if (type === 'tractor') {
                this.engine.playerShip.tractorRadius = 25 * (1 + lvl * 0.5);
            } else if (type === 'ecm') {
                this.engine.playerShip.ecmStrength = lvl; // 0-5
            } else if (type === 'flares') {
                this.engine.playerShip.maxFlares = lvl * 2;
                this.engine.playerShip.flares = this.engine.playerShip.maxFlares;
            } else if (type === 'cargo') {
                this.engine.playerShip.maxCargo = 1000 * (1 + lvl * 1.0);
            } else if (type === 'weapons') {
                // No immediate ship stat change, used in shoot() and updateProjectiles()
                console.log(`[Upgrades] Photon Cannons upgraded to level ${lvl}`);
            }

            this.engine.showToast(`${type.toUpperCase()} Upgraded to Level ${lvl + 1} !`);
            this.engine.updateUpgradeUI(); // Assuming we'll create this method
        } else {
            this.engine.showToast(`Not enough credits! Need $${cost.toLocaleString()} `);
        }
    }

    updateMinerals() {
        if (!this.engine.flightMode) return;

        // Apply active ship abilities (Magnet, Gravity, etc)
        this.engine.applyShipAbilities();

        // Check for collections
        for (const mineral of [...this.engine.minerals]) {
            this.engine.collectMineral(mineral);
        }

        // Spawn new minerals
        this.engine.spawnMinerals();

        // Lotus respawn: max 5 at a time, spawn them frequently to ensure they are found
        const lotusCount = this.engine.minerals.filter(m => m.type === 'lotus').length;
        const now = Date.now();
        if (lotusCount < 5) {
            if (!this.engine.lastLotusRespawn || now - this.engine.lastLotusRespawn > 5000) {
                this.engine.lastLotusRespawn = now;
                // Spawn just enough to bring count up to 5
                const toSpawn = 5 - lotusCount;
                for (let i = 0; i < toSpawn; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.sqrt(Math.random() * (1210000 - 90000) + 90000); // Spawn much closer so player sees them
                    this.engine.minerals.push({
                        id: 'lotus-' + now + '-' + i,
                        x: this.engine.playerShip.x + Math.cos(angle) * dist,
                        y: this.engine.playerShip.y + Math.sin(angle) * dist,
                        z: this.engine.playerShip.z || 0,
                        type: 'lotus',
                        name: 'Mindwave Lotus',
                        size: 25,
                        color: '#ff69b4',
                        value: 1000,
                        phase: Math.random() * Math.PI * 2
                    });
                }
            }
        }

        // Update notifications (fade out after 2 seconds)
        this.engine.collectionNotifications = this.engine.collectionNotifications.filter(n => now - n.time < 2000);

        // Update Mauler Debris
        this.updateMaulerDebris();
    }

    updatePowerUps() {
        if (!this.engine.flightMode) return;

        const ship = this.engine.playerShip;
        if (!ship) return;

        for (let i = this.engine.powerUps.length - 1; i >= 0; i--) {
            const pu = this.engine.powerUps[i];
            const dx = pu.x - ship.x;
            const dy = pu.y - ship.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Pickup radius for powerups
            if (dist < ship.pickupRadius || dist < 60) {
                this.engine.collectPowerUp(pu);
                this.engine.powerUps.splice(i, 1);
            }
        }
    }

    updateMaulerDebris() {
        if (!this.engine.maulerDebris) return;
        const ship = this.engine.playerShip;
        const speed = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy * (ship.vz || 0)); // Approx 2D speed for now

        // Threshold to detach debris
        const detachSpeed = 20;
        const isFast = ship.speed > detachSpeed;

        this.engine.maulerDebris.forEach(p => {
            if (!p.detached) {
                if (isFast) {
                    // Detach!
                    p.detached = true;
                    // Fling it opposite to ship direction slightly
                    p.vx = -ship.vx * 0.5 + (Math.random() - 0.5) * 5;
                    p.vy = -ship.vy * 0.5 + (Math.random() - 0.5) * 5;
                } else {
                    // Stay attached - hover around ship
                    // Move towards target offset
                    const targetX = ship.x + p.offsetX;
                    const targetY = ship.y + p.offsetY;

                    // Smooth follow
                    p.x += (targetX - p.x) * 0.1;
                    p.y += (targetY - p.y) * 0.1;

                    // Rotate with ship (optional, simpler to just offset)
                    // Apply slight rotation to offsets
                    const rot = 0.02;
                    const oldOx = p.offsetX;
                    p.offsetX = p.offsetX * Math.cos(rot) - p.offsetY * Math.sin(rot);
                    p.offsetY = oldOx * Math.sin(rot) + p.offsetY * Math.cos(rot);
                }
            } else {
                // Detached physics - drift away
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02; // Fade out
            }
        });

        // Remove dead particles
        this.engine.maulerDebris = this.engine.maulerDebris.filter(p => !p.detached || p.life > 0);
    }

    updateHazards() {
        if (!this.engine.flightMode) return;

        // If an effect is active, skip collision checks
        if (this.engine.hazardEffect) {
            return;
        }

        // Give 3 seconds of invincibility after respawn to prevent immediate re-death loops
        if (this.engine.playerShip.invulnerableUntil && performance.now() < this.engine.playerShip.invulnerableUntil) {
            return;
        }

        // --- TRAINING TRACK PROGRESSION ---
        if (this.engine.trainingActive) {
            this.engine.updateTraining();
        }
        // Legacy tutorial hook (kept for backward compat)
        if (this.engine.tutorialActive) {
            this.engine.updateTutorial();
        }

        const ship = this.engine.playerShip;
        const collisionRadius = 30;

        // Distress Beacons Generation & Logic
        if (!this.engine.distressBeacons) this.engine.distressBeacons = [];
        // Spawn chance based on time (about once every few minutes)
        if (Math.random() < 0.0002 && this.engine.distressBeacons.length < 2) {
            this.engine.distressBeacons.push({
                x: ship.x + (Math.random() - 0.5) * 8000,
                y: ship.y + (Math.random() - 0.5) * 8000,
                active: true,
                id: Date.now()
            });
            this.engine.showToast('📡 DISTRESS BEACON DETECTED ON RADAR', 3000);
        }

        for (let i = this.engine.distressBeacons.length - 1; i >= 0; i--) {
            const beacon = this.engine.distressBeacons[i];
            const dist = Math.hypot(beacon.x - ship.x, beacon.y - ship.y);
            if (dist < 150 && beacon.active) {
                beacon.active = false;
                this.engine.distressBeacons.splice(i, 1);
                // Reward player
                this.engine.credits = (this.engine.credits || 0) + 1500;
                localStorage.setItem('playerCredits', this.engine.credits);
                this.engine.showToast('✅ CIVILIAN RESCUED: +$1500!', 3000);
                if (this.engine.audio && this.engine.audio.playCollect) this.engine.audio.playCollect();
            }
        }

        // Check mine collisions
        for (const mine of this.engine.spaceMines) {
            const dist = Math.hypot(mine.x - ship.x, mine.y - ship.y);
            if (dist < mine.size + collisionRadius) {
                this.engine.triggerSupernovaEffect(mine);
                this.engine.spaceMines = this.engine.spaceMines.filter(m => m !== mine);
                return;
            }
        }

        // Check Sun (Galaxy) collisions (Vaporization and Heat)
        if (this.engine.galaxies) {
            for (const sun of this.engine.galaxies) {
                const zoom = this.engine.camera.zoom;
                const wrapRadius = Math.max(15000, 60000 / Math.max(1, Math.pow(zoom, 0.6)));
                let gdx = sun.x - ship.x;
                let gdy = sun.y - ship.y;
                if (!this.engine.bgWarpMode) {
                    while (gdx > wrapRadius) gdx -= wrapRadius * 2;
                    while (gdx < -wrapRadius) gdx += wrapRadius * 2;
                    while (gdy > wrapRadius) gdy -= wrapRadius * 2;
                    while (gdy < -wrapRadius) gdy += wrapRadius * 2;
                }

                const para = (sun.z || 0) * 0.0005;
                const depthScale = 1 - para;
                const cx = ship.x + gdx * depthScale;
                const cy = ship.y + gdy * depthScale;
                
                const dx = ship.x - cx;
                const dy = ship.y - cy;
                const dist = Math.hypot(dx, dy);

                const scale = (sun.size / 42) * depthScale;
                const innerRadius = 15 * scale; // Instant death zone (solid core)
                
                // State-of-the-art ray tracing collision for the 16-point starburst
                let shipAngle = Math.atan2(dy, dx);
                let relAngle = shipAngle - (sun.angle || 0);
                
                // Normalize to -PI to PI
                while (relAngle <= -Math.PI) relAngle += Math.PI * 2;
                while (relAngle > Math.PI) relAngle -= Math.PI * 2;
                
                // The pattern repeats every Math.PI / 4 (45 degrees).
                let localAngle = relAngle % (Math.PI / 4);
                if (localAngle < 0) localAngle += Math.PI / 4;
                
                // Shift so 0 is the long ray, and +/- 22.5 is the short ray
                if (localAngle > Math.PI / 8) {
                    localAngle -= Math.PI / 4;
                }
                const absAngle = Math.abs(localAngle); // 0 to 22.5 deg
                
                let effectiveRadius = 15;
                
                // Long ray (peaks at 0, length 42, angular width ~0.26 rad)
                if (absAngle < 0.26) {
                    const rLong = 42 - (27 * (absAngle / 0.26));
                    effectiveRadius = Math.max(effectiveRadius, rLong);
                }
                
                // Short ray (peaks at PI/8, length 32, angular width ~0.13 rad)
                const distToShort = Math.abs(absAngle - (Math.PI / 8));
                if (distToShort < 0.13) {
                    const rShort = 32 - (17 * (distToShort / 0.13));
                    effectiveRadius = Math.max(effectiveRadius, rShort);
                }
                
                const heatRadius = effectiveRadius * scale;
                
                if (dist < innerRadius + collisionRadius) {
                    this.engine.showToast('☀️ VAPORIZED BY THE SUN!');
                    
                    // Vaporize instantly
                    this.engine.damagePlayer(Infinity, true, false); 
                    
                    // Override the hazard effect for a cinematic whiteout vaporization
                    if (this.engine.hazardEffect) {
                        this.engine.hazardEffect.type = 'supernova'; // Massive whiteout
                        this.engine.hazardEffect.duration = 4000;
                    }
                    return;
                } else if (dist < heatRadius + collisionRadius) {
                    // Ship loses shield first, then health
                    this.engine.damagePlayer(0.5, false, Math.random() > 0.05); // Silent 95% of the time to avoid audio spam
                    
                    // Melting particles
                    if (Math.random() < 0.4 && this.engine.damageParticles) {
                        this.engine.damageParticles.push({
                            x: ship.x + (Math.random() - 0.5) * 30,
                            y: ship.y + (Math.random() - 0.5) * 30,
                            vx: ship.vx * 0.8 + (Math.random() - 0.5) * 4,
                            vy: ship.vy * 0.8 + (Math.random() - 0.5) * 4,
                            life: 30 + Math.random() * 20,
                            color: Math.random() < 0.5 ? '#ff4400' : '#ffaa00',
                            size: 4 + Math.random() * 6
                        });
                    }

                    if (Math.random() < 0.02) {
                        this.engine.showToast('🔥 SHIELDS MELTING! TOUCHING SOLAR FLARES!', 1000);
                    }
                }
            }
        }

        // Check black hole collisions
        for (const bh of this.engine.hazardBlackHoles) {
            const dist = Math.hypot(bh.x - ship.x, bh.y - ship.y);
            
            // True Gravity Well
            const gravityRadius = bh.size * 5;
            if (dist < gravityRadius && dist > 1) {
                const pullStrength = (1 - (dist / gravityRadius)) * 0.5;
                ship.vx += ((bh.x - ship.x) / Math.max(0.1, dist)) * pullStrength;
                ship.vy += ((bh.y - ship.y) / Math.max(0.1, dist)) * pullStrength;
            }

            if (dist < bh.size * 0.5 + collisionRadius) {
                this.engine.triggerBlackHoleEffect(bh);
                this.engine.hazardBlackHoles = this.engine.hazardBlackHoles.filter(b => b !== bh);
                return;
            }
        }

        // Check missile base collisions (ramming the base)
        for (const base of this.engine.missileBases) {
            const dist = Math.hypot(base.x - ship.x, base.y - ship.y);
            if (dist < base.size * 1.5 + collisionRadius) {
                this.engine.triggerMissileBaseDestructionEffect(base);
                this.engine.missileBases = this.engine.missileBases.filter(b => b !== base);
                return;
            }
        }

        // Check planet collisions (deep space background planets)
        // Only check if deep space style is active and planets exist
        if (this.engine.planets && this.engine.planets.length > 0) {
            for (const planet of this.engine.planets) {
                const para = (planet.z || 0) * 0.0005;
                const depthScale = 1 - para;
                const dx = planet.x - ship.x;
                const dy = planet.y - ship.y;
                
                const visualX = ship.x + dx * depthScale;
                const visualY = ship.y + dy * depthScale;
                
                // Effective visual distance between ship and parallaxed planet
                const dist = Math.hypot(visualX - ship.x, visualY - ship.y);
                const effectiveRadius = planet.radius * depthScale;

                if (dist < effectiveRadius + collisionRadius) {
                    this.engine.triggerPlanetImpactEffect(planet);
                    return; // Crash into planet
                }
            }
        }

        // === UPDATE MISSILE BASES ===
        const now = Date.now();
        for (const base of this.engine.missileBases) {
            const distToPlayer = Math.hypot(base.x - ship.x, base.y - ship.y);

            // Update turret angle to track player
            const angleToPlayer = Math.atan2(ship.y - base.y, ship.x - base.x);

            // Smooth turret rotation
            let angleDiff = angleToPlayer - base.turretAngle;
            angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
            base.turretAngle += angleDiff * 0.05;

            // Update alert level based on player proximity
            // SPECTRE: Cloak - Enemies ignore you if cloaked (passive for Spectre)
            // ECM: Reduce effective detection range (10% per level)
            const ecmFactor = 1 - (this.engine.playerShip.ecmStrength || 0) * 0.1;
            const effectiveDetectionRange = base.detectionRange * ecmFactor;
            
            const isSpectre = ship.type === 'spectre';
            if (distToPlayer < effectiveDetectionRange && !ship.isCloaked && !isSpectre) {
                // AGGRESSIVE ALERT: Scales faster
                base.alertLevel = Math.min(1, base.alertLevel + 0.05);

                // Fire missile if ready and player in range
                if (now - base.lastFireTime > base.fireRate && base.alertLevel > 0.4) {
                    this.engine.fireMissile(base);
                    base.lastFireTime = now;
                }
            } else {
                // PERSISTENT ALERT: Slow decay (takes ~16s to drop from 1 to 0 at 60fps)
                base.alertLevel = Math.max(0, base.alertLevel - 0.001);
            }
        }

        // === UPDATE HEAT-SEEKING MISSILES ===
        for (const missile of this.engine.enemyMissiles) {
            const isSpectre = ship.type === 'spectre';
            
            // TARGET ACQUISITION: Check for flare distraction first
            let targetX = ship.x;
            let targetY = ship.y;
            let isDistracted = false;

            if (this.engine.decoyFlares.length > 0) {
                // Find closest flare within distraction radius
                let closestFlare = null;
                let minDist = 800; // Flare attraction radius
                for (const flare of this.engine.decoyFlares) {
                    const d = Math.hypot(flare.x - missile.x, flare.y - missile.y);
                    if (d < minDist) {
                        minDist = d;
                        closestFlare = flare;
                    }
                }
                if (closestFlare) {
                    targetX = closestFlare.x;
                    targetY = closestFlare.y;
                    isDistracted = true;
                }
            }

            if ((!ship.isCloaked && !isSpectre) || isDistracted) {
                // Calculate angle to target (player or flare)
                const angleToTarget = Math.atan2(targetY - missile.y, targetX - missile.x);

                // Smooth turning (heat-seeking behavior)
                let angleDiff = angleToTarget - missile.angle;
                angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

                // Turn rate decreases over time (fuel running out)
                const turnRate = 0.12 * (missile.life / missile.maxLife);
                missile.angle += angleDiff * turnRate;
            }

            // Accelerate missile
            // AGGRESSIVE MISSILES: Faster base speed and better acceleration
            const speed = missile.speed * (1.2 + 0.6 * (missile.life / missile.maxLife));
            missile.vx = Math.cos(missile.angle) * speed;
            missile.vy = Math.sin(missile.angle) * speed;
            missile.x += missile.vx;
            missile.y += missile.vy;

            // Decrease life
            // AGGRESSIVE MISSILES: Longer lived (less decay per frame)
            missile.life -= 10; // ~60 fps (lasts ~8 seconds instead of 5)

            // Add trail particle
            if (Math.random() < 0.5) {
                missile.trail.push({
                    x: missile.x - missile.vx * 0.5,
                    y: missile.y - missile.vy * 0.5,
                    life: 20,
                    size: 3 + Math.random() * 4
                });
            }

            // Update trail particles
            missile.trail = missile.trail.filter(p => {
                p.life -= 1;
                p.size *= 0.95;
                return p.life > 0;
            });

            // Check collision with player
            const distToPlayer = Math.hypot(missile.x - ship.x, missile.y - ship.y);
            if (distToPlayer < 35) {
                // Missile hit! Trigger explosion effect
                this.engine.triggerMissileHitEffect(missile);
                missile.life = 0;
            }
        }

        // Remove dead missiles (from life running out OR EMP kill)
        this.engine.enemyMissiles = this.engine.enemyMissiles.filter(m => m.life > 0 && !m.dead);

        // === UPDATE DECOY FLARES ===
        for (let i = this.engine.decoyFlares.length - 1; i >= 0; i--) {
            const flare = this.engine.decoyFlares[i];
            flare.x += flare.vx;
            flare.y += flare.vy;
            flare.vx *= 0.95; // Drag
            flare.vy *= 0.95;
            flare.life--;
            if (flare.life <= 0) {
                this.engine.decoyFlares.splice(i, 1);
            }
        }

        // Spawn new hazards
        this.engine.spawnHazards();
    }

    updateHazardEffect() {
        if (!this.engine.hazardEffect) return;

        try {
            const now = performance.now();
            let elapsed = now - this.engine.hazardEffect.startTime;
            const duration = Math.max(1, this.engine.hazardEffect.duration || 8000);

            // CRITICAL FIX: If the effect hasn't rendered at least one frame yet
            // but elapsed time already exceeds duration (e.g., due to alert() pausing JS),
            // reset the startTime to NOW so the animation plays from the beginning.
            if (!this.engine.hazardEffect._hasRenderedFrame && elapsed > duration * 0.5) {
                console.log('[Hazard] Resetting startTime - elapsed', elapsed.toFixed(0), 'ms before first render frame');
                this.engine.hazardEffect.startTime = now;
                elapsed = 0;
            }

            const progress = Math.max(0, Math.min(1.0, elapsed / duration));

            if (isNaN(progress)) {
                console.error('[Hazard] Progress is NaN! Force-clearing effect.');
                this.engine.hazardEffect = null;
                return;
            }

            // BLACK HOLE: Teleport during white phase (80%) - not at end
            // This prevents the glitch where old universe shows before new one loads
            if (this.engine.hazardEffect.type === 'blackhole' && progress >= 0.8 && !this.engine.hazardEffect.hasTeleported) {
                // Teleport player to destination while screen is still white
                this.engine.playerShip.x = this.engine.hazardEffect.destX;
                this.engine.playerShip.y = this.engine.hazardEffect.destY;
                this.engine.hazardEffect.hasTeleported = true;

                // Clear old minerals/hazards so new ones spawn at new location
                this.engine.minerals = this.engine.minerals.filter(m => {
                    const dx = m.x - this.engine.playerShip.x;
                    const dy = m.y - this.engine.playerShip.y;
                    return Math.hypot(dx, dy) < 3000; // Keep only close ones
                });

                console.log('[Hazard] Teleported during white phase to:', this.engine.hazardEffect.destX, this.engine.hazardEffect.destY);
                console.log('[Debug] Ship type after black hole:', this.engine.playerShip.type);
            }

            // Update effect-specific logic BEFORE completion check
            if (this.engine.hazardEffect.type === 'supernova' || this.engine.hazardEffect.type === 'missile_base_destruction') {
                this.engine.updateSupernovaEffect(progress);
            } else if (this.engine.hazardEffect.type === 'blackhole') {
                this.engine.updateBlackHoleEffectState(progress);
            } else if (this.engine.hazardEffect.type === 'planet_impact') {
                this.engine.updatePlanetImpactEffect(progress);
            } else if (this.engine.hazardEffect.type === 'player_death') {
                this.engine.updatePlayerDeathEffect(progress);
            }

            // Effect complete - now safe to restore controls
            // Check for completion AFTER state has been updated to final frame
            if (progress >= 1 || (this.engine.hazardEffect.deathTimestamp && now > this.engine.hazardEffect.deathTimestamp)) {
                // Clear the hazard effect FIRST to allow controls through
                if (this.engine.hazardEffect.type === 'boost') {
                    this.engine.playerShip.boostActive = false;
                }
                
                // UNIVERSAL RESPAWN FAILSAFE: Ensure health/shield are always restored after any death-causing hazard
                const finishedHazardType = this.engine.hazardEffect.type;
                if (this.engine.playerShip.hullHealth <= 0) {
                    this.engine.playerShip.shield = this.engine.playerShip.maxShield;
                    this.engine.playerShip.hullHealth = this.engine.playerShip.maxHull;
                    this.engine.playerShip.invulnerableUntil = performance.now() + 3000;

                    // RESTORE ENGINE AUDIO AFTER RESPAWN
                    if (this.engine.audio) this.engine.audio.startEngineHum();

                    // Universal respawn means the player stays exactly where they died.
                    // (Teleportation code removed for all hazard types per user request)
                    this.engine.showToast('🚀 Systems restored after critical impact.');
                }

                this.engine.hazardEffect = null;

                // Reset camera to prevent permanent drift (Missing Ship bug)
                this.engine.camera.shakeX = 0;
                this.engine.camera.shakeY = 0;

                // Reset ALL input states to clean slate
                this.engine.keysPressed = {};
                this.engine.joyInputX = 0;
                this.engine.joyInputY = 0;
                this.engine.joystickActive = false;

                // Reset mouse states that might block input
                this.engine.mouseRightDown = false;
                this.engine.mouseLastX = undefined;
                this.engine.mouseLastY = undefined;

                // Ensure velocity is completely zeroed out after any hazard/death sequence
                this.engine.playerShip.vx = 0;
                this.engine.playerShip.vy = 0;
                this.engine.playerShip.vz = 0;
                this.engine.shipSpeed = 0;
                this.engine.targetShipSpeed = 0;
                if (this.engine.flightControls) {
                    this.engine.flightControls.targetSpeed = 0;
                    this.engine.flightControls.currentSpeed = 0;
                }

                // Focus canvas to ensure keyboard events are captured
                if (this.engine.canvas) {
                    this.engine.canvas.focus();
                }

                // Show toast so user knows they can move again
                this.engine.showToast('Controls restored!');

                console.log('[Hazard] Effect complete - ALL CONTROLS RE-ENABLED');
                return;
            }

        } catch (e) {
            console.error('[Hazard] Critical error during effect update:', e);
            this.engine.hazardEffect = null; // Kill the effect to prevent permanent lock
        }
    }

    // ====================================================================
    // --- FLIGHT ACADEMY: TRAINING TRACK SYSTEM (7-Lesson Progressive Course) ---
    // ====================================================================

    // Lesson definitions — each lesson teaches a specific flight skill
    getTrainingLessons() {
        return [
            {
                id: 'throttle',
                name: 'Throttle Up',
                icon: '🚀',
                subtitle: 'Learn to fly forward and brake',
                briefing: 'Use W to accelerate forward.\nUse S to brake and slow down.\nFly through each gate to proceed.',
                keys: [{ key: 'W', action: 'Accelerate' }, { key: 'S', action: 'Brake' }],
                gates: (() => {
                    // 3 gates in a straight line ahead
                    const g = [];
                    for (let i = 0; i < 3; i++) {
                        g.push({ x: (i + 1) * 800, y: 0, size: 200, reached: false });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 8, silver: 14, bronze: 22 },
                reward: { gold: 1200, silver: 800, bronze: 500 }
            },
            {
                id: 'steering',
                name: 'Steering',
                icon: '🔄',
                subtitle: 'Master turning and curved flight paths',
                briefing: 'Use A to turn left, D to turn right.\nCombine with W to fly curves.\nNavigate the slalom course!',
                keys: [{ key: 'A', action: 'Turn Left' }, { key: 'D', action: 'Turn Right' }, { key: 'W', action: 'Accelerate' }],
                gates: (() => {
                    // 5 gates in an S-curve
                    const g = [];
                    for (let i = 0; i < 5; i++) {
                        const angle = (i * Math.PI) / 4;
                        g.push({
                            x: Math.cos(angle) * (600 + i * 400) + i * 300,
                            y: Math.sin(angle) * (600 + i * 300),
                            size: 180 - i * 10,
                            reached: false
                        });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 15, silver: 25, bronze: 40 },
                reward: { gold: 1800, silver: 1200, bronze: 800 }
            },
            {
                id: 'boost',
                name: 'Boost Control',
                icon: '⚡',
                subtitle: 'Use afterburners for maximum speed',
                briefing: 'Hold SHIFT while flying to boost (2× speed).\nReach the distant gates before time runs out!\nRelease SHIFT to regain control for turns.',
                keys: [{ key: 'SHIFT', action: 'Boost (2×)' }, { key: 'W', action: 'Accelerate' }],
                gates: (() => {
                    // 3 very distant gates — need boost to reach in time
                    return [
                        { x: 2000, y: 0, size: 250, reached: false },
                        { x: 4500, y: -800, size: 220, reached: false },
                        { x: 7000, y: 400, size: 200, reached: false }
                    ];
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 12, silver: 20, bronze: 35 },
                reward: { gold: 2200, silver: 1500, bronze: 1000 }
            },
            {
                id: 'precision',
                name: 'Precision Flying',
                icon: '🎯',
                subtitle: 'Tight maneuvers through small gates',
                briefing: 'Combine all controls for precision flight.\nGates are smaller — aim carefully!\nControl your speed for tight turns.',
                keys: [{ key: 'W/S', action: 'Speed' }, { key: 'A/D', action: 'Steer' }],
                gates: (() => {
                    // 5 small gates in a zigzag
                    const g = [];
                    for (let i = 0; i < 5; i++) {
                        g.push({
                            x: (i + 1) * 600,
                            y: (i % 2 === 0 ? 1 : -1) * (300 + i * 80),
                            size: 120 - i * 8,
                            reached: false
                        });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 18, silver: 30, bronze: 45 },
                reward: { gold: 3000, silver: 2000, bronze: 1200 }
            },
            {
                id: 'collection',
                name: 'Gem Collection',
                icon: '💎',
                subtitle: 'Learn to collect resources while flying',
                briefing: 'Fly near gems to auto-collect them!\nCollect all 8 gems in the training zone.\nYour ship pulls gems in on contact.',
                keys: [{ key: 'FLY', action: 'Near gems to collect' }],
                gates: [
                    { x: 0, y: 0, size: 120, reached: true }, // Start marker (pre-reached)
                    { x: 3000, y: 0, size: 200, reached: false }  // Finish gate
                ],
                gems: (() => {
                    // 8 gems scattered in a path
                    const g = [];
                    const types = ['iron', 'copper', 'gold', 'silver', 'titanium', 'ruby', 'emerald', 'diamond'];
                    for (let i = 0; i < 8; i++) {
                        g.push({
                            x: 300 + i * 330,
                            y: Math.sin(i * 0.8) * 200,
                            type: types[i],
                            collected: false
                        });
                    }
                    return g;
                })(),
                showArrow: false,
                collectTarget: 8,
                medals: { gold: 20, silver: 35, bronze: 50 },
                reward: { gold: 4000, silver: 2500, bronze: 1500 }
            },
            {
                id: 'radar',
                name: 'Radar Navigation',
                icon: '📡',
                subtitle: 'Navigate using instruments only',
                briefing: 'No HUD arrow this time!\nUse the RADAR and MAP panels to find the waypoint.\nThe destination is far away — trust your instruments.',
                keys: [{ key: 'RADAR', action: 'Check bearing' }, { key: 'MAP', action: 'See position' }],
                gates: (() => {
                    // Single far waypoint — player must navigate by radar
                    const angle = Math.random() * Math.PI * 2;
                    return [
                        { x: Math.cos(angle) * 6000, y: Math.sin(angle) * 6000, size: 300, reached: false }
                    ];
                })(),
                gems: [],
                showArrow: false, // No HUD arrow — must use radar!
                medals: { gold: 25, silver: 40, bronze: 60 },
                reward: { gold: 5000, silver: 3500, bronze: 2000 }
            },
            {
                id: 'final',
                name: 'Final Exam',
                icon: '🏆',
                subtitle: 'Full course — prove your skills',
                briefing: 'The ultimate test!\n8 gates with varying sizes and distances.\nCollect gems along the way for bonus time.\nUse everything you\'ve learned!',
                keys: [{ key: 'ALL', action: 'Use every skill' }],
                gates: (() => {
                    // 8-gate course with mixed challenges
                    const g = [];
                    let cx = 0, cy = 0;
                    const angles = [0.2, -0.6, 0.9, -0.3, 1.2, -0.8, 0.5, -0.4];
                    const dists = [1000, 1200, 800, 1500, 900, 2000, 1100, 1400];
                    const sizes = [200, 160, 140, 180, 120, 250, 130, 200];
                    let heading = 0;
                    for (let i = 0; i < 8; i++) {
                        heading += angles[i];
                        cx += Math.cos(heading) * dists[i];
                        cy += Math.sin(heading) * dists[i];
                        g.push({ x: cx, y: cy, size: sizes[i], reached: false });
                    }
                    return g;
                })(),
                gems: (() => {
                    // 5 bonus gems along the course
                    const g = [];
                    const types = ['gold', 'diamond', 'ruby', 'emerald', 'platinum'];
                    let cx = 0, cy = 0;
                    const angles = [0.2, -0.6, 0.9, -0.3, 1.2];
                    const dists = [1000, 1200, 800, 1500, 900];
                    let heading = 0;
                    for (let i = 0; i < 5; i++) {
                        heading += angles[i];
                        cx += Math.cos(heading) * dists[i];
                        cy += Math.sin(heading) * dists[i];
                        g.push({
                            x: cx + (Math.random() - 0.5) * 300,
                            y: cy + (Math.random() - 0.5) * 300,
                            type: types[i],
                            collected: false
                        });
                    }
                    return g;
                })(),
                showArrow: true,
                medals: { gold: 30, silver: 50, bronze: 75 },
                reward: { gold: 8000, silver: 5000, bronze: 2500 }
            },
            {
                id: 'weaponry',
                name: 'Weapon Systems',
                icon: '⚔️',
                subtitle: 'Learn to use your ship lasers',
                briefing: 'Hold SPACE to fire your primary lasers.\nDestroy the target mines to clear a path!\nGates will only open when the nearby mine is destroyed.',
                keys: [{ key: 'SPACE', action: 'Fire Lasers' }, { key: 'W/A/D', action: 'Flight' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 4; i++) {
                        g.push({ x: (i + 1) * 800, y: 0, size: 200, reached: false, targetDestroyed: false });
                    }
                    return g;
                })(),
                targets: (() => {
                    const t = [];
                    for (let i = 0; i < 4; i++) {
                        t.push({ x: (i + 1) * 800, y: (Math.random() - 0.5) * 100, type: 'training_mine', id: i });
                    }
                    return t;
                })(),
                showArrow: true,
                medals: { gold: 15, silver: 25, bronze: 40 },
                reward: { gold: 6000, silver: 4000, bronze: 2000 }
            },
            {
                id: 'shielding',
                name: 'Defense & Shields',
                icon: '🛡️',
                subtitle: 'Learn to manage your ship integrity',
                briefing: 'Your blue bar is your SHIELD. It absorbs damage first.\nThe red bar is your HULL. If it reaches zero, you die!\nFly through the damage zone and watch your shield deplete.',
                keys: [{ key: 'W/A/D', action: 'Maneuver' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 3; i++) {
                        g.push({ x: (i + 1) * 1000, y: Math.sin(i) * 300, size: 250, reached: false });
                    }
                    return g;
                })(),
                hazardZone: { x: 1500, y: 0, radius: 1000, damage: 0.2 },
                showArrow: true,
                medals: { gold: 20, silver: 35, bronze: 55 },
                reward: { gold: 6500, silver: 4500, bronze: 2500 }
            },
            {
                id: 'hazards',
                name: 'Hazard Navigation',
                icon: '🌀',
                subtitle: 'Evasive maneuvers near anomalies',
                briefing: 'Black Holes pull you in! Stay away from the event horizon.\nSpace Mines have a large blast radius.\nNavigate the hazard-filled course safely.',
                keys: [{ key: 'SHIFT', action: 'Boost to escape pull' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 4; i++) {
                        g.push({ x: (i + 1) * 1200, y: (i % 2 === 0 ? 400 : -400), size: 180, reached: false });
                    }
                    return g;
                })(),
                hazards: [
                    { x: 1200, y: 0, type: 'blackhole', radius: 400 },
                    { x: 2400, y: 0, type: 'mine', radius: 150 },
                    { x: 3600, y: 0, type: 'blackhole', radius: 500 }
                ],
                showArrow: true,
                medals: { gold: 25, silver: 45, bronze: 70 },
                reward: { gold: 7500, silver: 5000, bronze: 3000 }
            }
        ];
    }

    // Load/save training progress
    loadTrainingProgress() {
        try {
            return JSON.parse(localStorage.getItem('trainingProgress')) || {};
        } catch (e) { return {}; }
    }
    saveTrainingProgress() {
        try {
            localStorage.setItem('trainingProgress', JSON.stringify(this.engine.trainingProgress));
        } catch (e) { }
    }

    // Start a specific training lesson
    startTraining(lessonIndex) {
        if (this.engine.hazardEffect) {
            this.engine.showToast('⚠️ Wait for the current event to finish!');
            return;
        }

        // Ensure flight mode is active
        if (!this.engine.flightMode) {
            this.engine.uiManager.toggleFlightMode();
        }

        const lessons = this.engine.getTrainingLessons();
        if (lessonIndex < 0 || lessonIndex >= lessons.length) return;

        const lesson = lessons[lessonIndex];

        // Deep-clone gates and gems so re-running a lesson regenerates them
        this.engine.trainingLesson = JSON.parse(JSON.stringify(lesson));
        // Re-generate gates for lessons with random elements
        if (lesson.id === 'radar') {
            const freshLessons = this.engine.getTrainingLessons();
            this.engine.trainingLesson.gates = JSON.parse(JSON.stringify(freshLessons[lessonIndex].gates));
        }
        this.engine.trainingLessonIndex = lessonIndex;
        this.engine.trainingActive = true;
        this.engine.trainingGateIndex = lesson.id === 'collection' ? 1 : 0; // Skip pre-reached gate for collection
        this.engine.trainingGemsCollected = 0;
        this.engine.trainingTimer = 0;
        this.engine.trainingStartTime = 0; // Set when briefing ends
        this.engine.trainingBriefing = true;
        this.engine.trainingBriefingStart = performance.now();
        this.engine.trainingComplete = false;
        this.engine.trainingMedal = null;

        // Reset ship position and velocity
        this.engine.playerShip.x = 0;
        this.engine.playerShip.y = 0;
        this.engine.playerShip.z = 0;
        this.engine.playerShip.vx = 0;
        this.engine.playerShip.vy = 0;
        this.engine.playerShip.vz = 0;
        this.engine.playerShip.rotation = 0;

        // Stop old tutorial if running
        this.engine.tutorialActive = false;

        console.log(`[Training] Starting lesson ${lessonIndex + 1}: ${lesson.name}`);
    }

    // Dismiss briefing and start timer
    dismissTrainingBriefing() {
        this.engine.trainingBriefing = false;
        this.engine.trainingStartTime = performance.now();
    }

    // Per-frame training update
    updateTraining() {
        if (!this.engine.trainingActive || !this.engine.trainingLesson) return;

        // During briefing, check for any key press to dismiss
        if (this.engine.trainingBriefing) {
            const timeSinceBriefing = performance.now() - this.engine.trainingBriefingStart;
            if (timeSinceBriefing > 1500) { // Minimum 1.5s display
                // Check if any movement key is pressed
                const keys = this.engine.keysPressed;
                if (keys['w'] || keys['a'] || keys['s'] || keys['d'] || keys[' '] || keys['enter']) {
                    this.engine.dismissTrainingBriefing();
                }
            }
            return; // Don't update game logic during briefing
        }

        // Update timer
        this.engine.trainingTimer = (performance.now() - this.engine.trainingStartTime) / 1000;

        const lesson = this.engine.trainingLesson;
        const ship = this.engine.playerShip;

        // --- Check gem collection for lessons with gems ---
        if (lesson.gems && lesson.gems.length > 0) {
            for (const gem of lesson.gems) {
                if (gem.collected) continue;
                const dx = ship.x - gem.x;
                const dy = ship.y - gem.y;
                const dist = Math.hypot(dx, dy);
                if (dist < ship.size + 20) {
                    gem.collected = true;
                    this.engine.trainingGemsCollected++;
                    // Add to actual inventory
                    if (!this.engine.playerInventory[gem.type]) this.engine.playerInventory[gem.type] = 0;
                    this.engine.playerInventory[gem.type]++;
                    this.engine.saveInventory();
                    this.engine.collectionNotifications.push({
                        text: `+ ${this.engine.mineralTypes[gem.type]?.name || gem.type}`,
                        color: this.engine.mineralTypes[gem.type]?.color || '#fff',
                        time: Date.now()
                    });
                }
            }
        }

        // --- Check weaponry targets ---
        if (lesson.id === 'weaponry' && lesson.targets) {
            this.engine.bullets.forEach(bullet => {
                lesson.targets.forEach(target => {
                    if (target.destroyed) return;
                    const dx = bullet.x - target.x;
                    const dy = bullet.y - target.y;
                    if (Math.hypot(dx, dy) < 40) {
                        target.destroyed = true;
                        bullet.life = 0;
                        this.engine.showToast('💥 Target Destroyed!');
                        // Mark associated gate as targetDestroyed
                        if (lesson.gates[target.id]) {
                            lesson.gates[target.id].targetDestroyed = true;
                        }
                    }
                });
            });
        }

        // --- Check shielding hazard zone ---
        if (lesson.id === 'shielding' && lesson.hazardZone) {
            const hz = lesson.hazardZone;
            const dist = Math.hypot(ship.x - hz.x, ship.y - hz.y);
            if (dist < hz.radius) {
                // Apply damage using standard damage system
                const dmg = hz.damage || 0.1;
                this.engine.damagePlayer(dmg);
            }
        }

        // --- Check hazard navigation ---
        if (lesson.id === 'hazards' && lesson.hazards) {
            lesson.hazards.forEach(h => {
                const dist = Math.hypot(ship.x - h.x, ship.y - h.y);
                if (h.type === 'blackhole' && dist < h.radius) {
                    const pull = (1 - dist / h.radius) * 1.5;
                    const angle = Math.atan2(h.y - ship.y, h.x - ship.x);
                    ship.vx += Math.cos(angle) * pull;
                    ship.vy += Math.sin(angle) * pull;
                    if (dist < 50) {
                        this.engine.showToast('🌀 Sucked into the void! Restarting...');
                        this.engine.startTraining(this.engine.trainingLessonIndex);
                    }
                } else if (h.type === 'mine' && dist < h.radius) {
                    this.engine.showToast('💣 MINE DETONATED!');
                    this.engine.damagePlayer(20);
                    h.x = -99999; // Move away
                }
            });
        }

        // --- Check gate progression ---
        if (lesson.id === 'collection') {
            // Collection lesson: need all gems first, then fly to finish gate
            if (this.engine.trainingGemsCollected >= (lesson.collectTarget || lesson.gems.length)) {
                const finishGate = lesson.gates[lesson.gates.length - 1];
                const dx = ship.x - finishGate.x;
                const dy = ship.y - finishGate.y;
                if (Math.hypot(dx, dy) < finishGate.size * 1.2) {
                    finishGate.reached = true;
                    this.engine.completeTrainingLesson();
                }
            }
        } else {
            // Standard gate progression
            const gate = lesson.gates[this.engine.trainingGateIndex];
            if (gate) {
                // For weaponry, must destroy target first
                if (lesson.id === 'weaponry' && !gate.targetDestroyed) {
                    // Do nothing, wait for target
                } else {
                    const dx = ship.x - gate.x;
                    const dy = ship.y - gate.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < gate.size * 1.2) {
                        gate.reached = true;
                        this.engine.trainingGateIndex++;
                        if (this.engine.trainingGateIndex >= lesson.gates.length) {
                            this.engine.completeTrainingLesson();
                        } else {
                            const total = lesson.gates.length;
                            const current = this.engine.trainingGateIndex;
                            this.engine.showToast(`✅ Gate ${current}/${total} — Keep going!`);
                        }
                    }
                }
            }
        }
    }
}
