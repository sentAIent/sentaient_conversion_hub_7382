class PlayerManager {
    constructor(game) {
        this.game = game;
        console.log("🚀 [PlayerManager] Instance Created.");
    }



    shoot() {
        const now = Date.now();
        const ship = this.game.playerShip;
        if (!ship) return;

        // Use WeaponManager for stats
        const weapon = this.game.weaponManager?.getActiveWeapon() || { damage: 25, fireRate: 200, speed: 25, color: '#00ffcc', width: 4, length: 40 };
        
        // Cooldown scales with weapon fireRate and upgrade level (e.g., -10% per level)
        const weaponLevel = ship.upgrades.weapons || 0;
        const cooldown = (weapon.fireRate || 200) * (1 - weaponLevel * 0.1);
        
        if (ship.lastShot && now - ship.lastShot < cooldown) return;
        ship.lastShot = now;

        // Audio: player laser
        if (window.gameAudio) gameAudio.playLaser();

        // Muzzle Flash
        ship.muzzleFlash = 1.0;

        // Create Projectile
        const speed = weapon.speed || 25;
        const angle = ship.rotation;

        // Offset to match ship nose
        const noseOffset = 40 / (this.game.camera.zoom || 1);
        const startX = ship.x + Math.cos(angle) * noseOffset;
        const startY = ship.y + Math.sin(angle) * noseOffset;

        // Add velocity of ship to projectile for conservation of momentum feel
        const pVx = ship.vx * 0.5 + Math.cos(angle) * speed;
        const pVy = ship.vy * 0.5 + Math.sin(angle) * speed;

        // Visual scaling based on weapon level & weapon type
        const pWidth = (weapon.width || 4) * (1 + weaponLevel * 0.2) / (this.game.camera.zoom || 1);
        const pLength = (weapon.length || 40) * (1 + weaponLevel * 0.2) / (this.game.camera.zoom || 1);
        const pColor = weapon.color || '#00ffcc';

        this.game.projectiles.push({
            x: startX,
            y: startY,
            vx: pVx,
            vy: pVy,
            rotation: angle,
            color: pColor, 
            life: 60, // Frames (1 second at 60fps)
            width: pWidth,
            length: pLength,
            damage: (weapon.damage || 25) * (1 + weaponLevel * 0.2)
        });
    }


    fireDecoyFlare() {
        if (!this.game.flightMode) return;
        
        const ship = this.game.playerShip;
        const upgradeLvl = this.game.playerShip.upgrades.flares || 0;
        if (upgradeLvl === 0) {
            this.game.hudManager.showToast('⚠️ Decoy Flares not installed! Upgrade in Dock.');
            return;
        }

        // Initialize flares if needed
        if (ship.flares === undefined) ship.flares = upgradeLvl * 2;

        if (ship.flares <= 0) {
            this.game.hudManager.showToast('⚠️ Out of flares! (Recharge at base or wait)');
            return;
        }

        // Fire 2 flares in slightly different directions
        for (let i = 0; i < 2; i++) {
            const angle = ship.angle + Math.PI + (Math.random() - 0.5) * 1.0; // Behind ship
            const speed = 5 + Math.random() * 5;
            this.game.decoyFlares.push({
                x: ship.x,
                y: ship.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 180, // 3 seconds at 60fps
                color: '#ffaa44'
            });
        }

        ship.flares--;
        this.game.hudManager.showToast(`🔥 Flare Deployed! (${ship.flares} left)`);

        // BREAK STALKING: Breaking line of sight/distracting
        for (const enemy of this.game.enemyShips) {
            const d = Math.hypot(enemy.x - ship.x, enemy.y - ship.y);
            if (d < 1000) {
                enemy.isStalking = false; // Temporarily break stalking
                enemy.stalkCooldown = 180; // 3 second grace period
            }
        }
    }


    updatePlayerShip(dt = 1) {
        const ship = this.game.playerShip;
        if (!ship) return;
        const keys = this.game.keysPressed;

        // --- PHASE 30: PHYSICS SCALING (dt) ---
        // dt comes from GameLoop (incorporating timeScale)

        // --- PHASE 26 STABILIZATION LOGGING ---
        if (this.game.frameCounter % 300 === 0) {
            console.log(`[Player] Update Loop Active. Mode: ${this.game.mode}, Flight: ${this.game.flightMode}, Speed: ${ship.speed?.toFixed(2)}, DT: ${dt.toFixed(3)}`);
        }

        // DEFENSIVE INITIALIZATION: Ensure all physics properties exist to prevent NaN
        if (ship.vx === undefined || !isFinite(ship.vx)) ship.vx = 0;
        if (ship.vy === undefined || !isFinite(ship.vy)) ship.vy = 0;
        if (ship.vz === undefined || !isFinite(ship.vz)) ship.vz = 0;
        if (ship.x === undefined || !isFinite(ship.x)) ship.x = 0;
        if (ship.y === undefined || !isFinite(ship.y)) ship.y = 0;
        if (ship.z === undefined || !isFinite(ship.z)) ship.z = 0;
        if (ship.rotation === undefined || !isFinite(ship.rotation)) ship.rotation = 0;
        if (ship.pitch === undefined || !isFinite(ship.pitch)) ship.pitch = 0;
        if (ship.roll === undefined || !isFinite(ship.roll)) ship.roll = 0;
        
        // Ensure constants
        if (!ship.rotationSpeed || !isFinite(ship.rotationSpeed)) ship.rotationSpeed = 0.035;
        if (!ship.acceleration || !isFinite(ship.acceleration)) ship.acceleration = 0.2;
        if (!ship.maxSpeed || !isFinite(ship.maxSpeed)) ship.maxSpeed = 15;


        // MAJESTIC HAZARD TRACKING: Camera follows ship even when controls are locked
        if (this.game.hazardEffect) {
            this.game.camera.x = -ship.x * (this.game.camera.zoom || 1);
            this.game.camera.y = -ship.y * (this.game.camera.zoom || 1);
            
            // If it's a freezing effect, we might want to return early, but for most effects 
            // we should allow physics to continue so the ship doesn't "snap" or stop moving.
            if (this.game.hazardEffect.freezePhysics) return;
        }


        // Skip Input if hazardEffect is active or UI is open
        const inputAllowed = !this.game.hazardEffect && !this.game.uiOpen;

        // --- PHASE 30: PRE-CALCULATE TRIG FOR ALL BRANCHES ---
        const cos = Math.cos(ship.rotation);
        const sin = Math.sin(ship.rotation);

        if (inputAllowed) {
            // Rotation (Yaw - left/right)

            // Viper Boost & Apex Overclock Multiplier
            let abilityAccelMult = 1.0;

            // Apex Overclock Timeout Logic
            if (ship.overclockActive && Date.now() - (ship.overclockStartTime || 0) > 5000) {
                ship.overclockActive = false;
                this.game.hudManager?.showToast('Overclock Disengaged.');
            }

            if (ship.type === 'viper' && ship.boostActive) {
                abilityAccelMult = 2.0;
            } else if (ship.type === 'apex' && ship.overclockActive) {
                abilityAccelMult = 2.0;
            }

            const enginesActive = !ship.enginesDisabled;

            if ((keys['w'] || keys['arrowup']) && enginesActive) {
                ship.vx += cos * ship.acceleration * abilityAccelMult * dt;
                ship.vy += sin * ship.acceleration * abilityAccelMult * dt;
            }
            if ((keys['s'] || keys['arrowdown']) && enginesActive) {
                ship.vx -= cos * ship.acceleration * 0.5 * abilityAccelMult * dt;
                ship.vy -= sin * ship.acceleration * 0.5 * abilityAccelMult * dt;
            }

            // Joystick Thrust
            if (this.game.joyInputY && Math.abs(this.game.joyInputY) > 0.1) {
                const thrust = -this.game.joyInputY * ship.acceleration;
                ship.vx += cos * thrust * dt;
                ship.vy += sin * thrust * dt;
            }

            // 3D movement (Q/E)
            if (keys['q']) ship.vz += ship.acceleration * dt;
            if (keys['e']) ship.vz -= ship.acceleration * dt;
        }

        // --- PHYSICS & SPEED CLAMPING ---
        let effectiveMaxSpeed = ship.maxSpeed;

        // Shift = manual speed boost
        if (inputAllowed && keys['shift']) {
            effectiveMaxSpeed *= 1.8;
        }

        // Diagnostic: Ensure speed is never zeroed by malformed maxSpeed
        if (effectiveMaxSpeed < 1) effectiveMaxSpeed = 15;


        // Skill: Viper Boost (Ship Specific)
        if (ship.type === 'viper' && ship.boostActive) {
            effectiveMaxSpeed *= 2.0;
        } 
        // Skill: Apex Overclock (Ship Specific)
        else if (ship.type === 'apex' && ship.overclockActive) {
            effectiveMaxSpeed *= 1.5;
        }

        // Skill: Global Afterburner (raises the speed cap)
        if (this.game.globalAbilityActive && this.game.globalAbilityActive.afterburner) {
            effectiveMaxSpeed *= 3.0 + (this.game.playerSkills.afterburner * 0.5);
        }

        // Penalty: Towing base reduces max speed
        if (this.game.spaceBase && this.game.spaceBase.isTowing) {
            effectiveMaxSpeed *= 0.5;
        }

        // Integrate Velocity
        ship.x += ship.vx * dt;
        ship.y += ship.vy * dt;
        ship.z += ship.vz * dt;

        ship.speed = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy + ship.vz * ship.vz);

        // Safety: Prevent NaN if speed is zero or malformed
        if (ship.speed > effectiveMaxSpeed && ship.speed > 0) {
            const ratio = effectiveMaxSpeed / ship.speed;
            ship.vx *= ratio;
            ship.vy *= ratio;
            ship.vz *= ratio;
            ship.speed = effectiveMaxSpeed;
        }

        // Apply Friction (scaled by dt)
        const friction = Math.pow(0.998, dt);
        ship.vx *= friction;
        ship.vy *= friction;
        ship.vz *= friction;

        // Speed Lines Generation
        if (ship.speed > 5 && Math.random() < 0.3) {
            const lineCount = Math.floor(ship.speed / 15) + 1;
            for (let i = 0; i < lineCount; i++) {
                this.game.speedLines.push({
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

        // Speed Lines Update
        this.game.speedLines.forEach(line => {
            line.x += line.vx;
            line.y += line.vy;
            line.life -= (line.decay || 0.05);

            if (ship.type === 'hauler') {
                const dx = ship.x - line.x;
                const dy = ship.y - line.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 400 && dist > 1) {
                    // Hauler specific logic could go here
                }
            }
        });
        
        // Sanity Check for NaN - Recovery Mechanism
        if (isNaN(ship.x) || isNaN(ship.y) || isNaN(ship.z) || isNaN(ship.vx) || isNaN(ship.vy) || isNaN(ship.vz)) {
            console.error("🚨 CRITICAL: NaN detected in ship physics. Forcing stability reset.");
            ship.vx = 0; ship.vy = 0; ship.vz = 0;
            if (isNaN(ship.x)) ship.x = 0;
            if (isNaN(ship.y)) ship.y = 0;
            if (isNaN(ship.z)) ship.z = 0;
        }

        // Camera follow moved to GameLoopManager for consolidation and smoother zoom-sync
        this.game.checkAndGenerateSectors();

        // Muzzle Flash Decay
        if (ship.muzzleFlash > 0) {
            ship.muzzleFlash -= 0.1;
        }

        // Weapon Firing (Spacebar)
        if (keys[' ']) {
            this.shoot();
        }

        // --- PHASE 7: Advanced Damage Emitters ---
        if (ship.hullHealth < ship.maxHull * 0.5 && this.game.particleManager) {
            const pm = this.game.particleManager;
            const healthRatio = ship.hullHealth / ship.maxHull;
            
            // SMOKE: Below 50%
            if (this.game.frameCounter % 3 === 0) {
                pm.spawn({
                    x: ship.x - cos * 20,
                    y: ship.y - sin * 20,
                    vx: -ship.vx * 0.2 + (Math.random() - 0.5) * 2,
                    vy: -ship.vy * 0.2 + (Math.random() - 0.5) * 2,
                    size: 8 + Math.random() * 12,
                    life: 40 + Math.random() * 40,
                    color: '#333333',
                    colors: ['#333333', '#111111', 'transparent'],
                    type: 'SMOKE',
                    alpha: 0.6
                });
            }

            // FIRE: Below 25%
            if (healthRatio < 0.25 && this.game.frameCounter % 2 === 0) {
                pm.spawn({
                    x: ship.x + (Math.random() - 0.5) * 30,
                    y: ship.y + (Math.random() - 0.5) * 30,
                    vx: -ship.vx * 0.5 + (Math.random() - 0.5) * 4,
                    vy: -ship.vy * 0.5 + (Math.random() - 0.5) * 4,
                    size: 4 + Math.random() * 8,
                    life: 20 + Math.random() * 20,
                    color: '#ff4400',
                    colors: ['#ffff00', '#ff4400', '#222222'],
                    type: 'FIRE',
                    alpha: 0.9,
                    bloom: true
                });
            }
        }
    }




    updateProjectiles() {
        const dt = this.game.timeScale || 1.0;
        
        // Iterate backwards to allow removal
        for (let i = this.game.projectiles.length - 1; i >= 0; i--) {
            const p = this.game.projectiles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;

            if (p.life <= 0) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // --- SECTOR-AWARE COLLISION (O(1) search) ---
            const sector = this.game.proceduralManager.getSectorCoords(p.x, p.y);
            let hit = false;

            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const key = `${sector.x + dx},${sector.y + dy}`;
                    const sectorData = this.game.loadedSectors.get(key);
                    if (!sectorData) continue;

                    // 1. Check Space Mines in this sector
                    if (sectorData.hazards && sectorData.hazards.mines) {
                        for (let j = sectorData.hazards.mines.length - 1; j >= 0; j--) {
                            const mine = sectorData.hazards.mines[j];
                            if (!mine.active) continue;
                            const dX = p.x - mine.x;
                            const dY = p.y - mine.y;
                            const dist = Math.sqrt(dX * dX + dY * dY);

                            if (dist < (mine.radius || 30) + p.width) {
                                this.game.createExplosion(p.x, p.y, 'hit');
                                mine.health = (mine.health || 100) - (p.damage || 25);
                                hit = true;
                                if (mine.health <= 0) {
                                    sectorData.hazards.mines.splice(j, 1);
                                    this.game.createExplosion(mine.x, mine.y, 'mine');
                                }
                                break;
                            }
                        }
                    }
                    if (hit) break;

                    // 2. Check Missile Bases in this sector
                    if (sectorData.hazards && sectorData.hazards.turrets) {
                        for (let k = sectorData.hazards.turrets.length - 1; k >= 0; k--) {
                            const base = sectorData.hazards.turrets[k];
                            if (!base.active) continue;
                            const dX = p.x - base.x;
                            const dY = p.y - base.y;
                            const dist = Math.sqrt(dX * dX + dY * dY);

                            if (dist < (base.size || 40) * 1.5 + p.width) {
                                this.game.createExplosion(p.x, p.y, 'hit');
                                base.health = (base.health || 100) - (p.damage || 25);
                                base.hitFlash = 10;
                                hit = true;
                                if (base.health <= 0) {
                                    sectorData.hazards.turrets.splice(k, 1);
                                    this.game.createExplosion(base.x, base.y, 'boss');
                                }
                                break;
                            }
                        }
                    }
                    if (hit) break;

                    // 3. Check Black Holes (Gravitational Capture)
                    if (sectorData.hazards && sectorData.hazards.blackHoles) {
                        for (let b = 0; b < sectorData.hazards.blackHoles.length; b++) {
                            const bh = sectorData.hazards.blackHoles[b];
                            const dX = p.x - bh.x;
                            const dY = p.y - bh.y;
                            const distSq = dX * dX + dY * dY;
                            if (distSq < (bh.size * 1.8) * (bh.size * 1.8)) {
                                hit = true;
                                break;
                            }
                        }
                    }
                    if (hit) break;
                }
                if (hit) break;
            }

            if (hit) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // --- GLOBAL ENTITY COLLISION (Enemies, Boss, AI Ships) ---
            
            // 4. Check collisions with Enemy Ships
            for (let e = this.game.enemyShips.length - 1; e >= 0; e--) {
                const enemy = this.game.enemyShips[e];
                const typeDef = ENEMY_TYPES[enemy.type];
                const dx = p.x - enemy.x;
                const dy = p.y - enemy.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < (typeDef?.size || 30) + p.width) {
                    this.game.createExplosion(p.x, p.y, 'hit');
                    enemy.health -= (p.damage || 25);
                    enemy.hitFlash = 10;
                    hit = true;
                    if (enemy.health <= 0) this.game.destroyEnemyShip(e);
                    break;
                }
            }

            if (hit) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // 5. Check collision with Boss
            if (this.game.activeBoss) {
                const boss = this.game.activeBoss;
                const bTypeDef = BOSS_TYPES[boss.type];
                const dx = p.x - boss.x;
                const dy = p.y - boss.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < (bTypeDef?.size || 100) + p.width) {
                    this.game.createExplosion(p.x, p.y, 'hit');
                    this.game.damageBoss(25);
                    hit = true;
                }
            }

            if (hit) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // 6. Check AI Manager ships
            if (this.game.aiManager && this.game.aiManager.ships) {
                for (let a = this.game.aiManager.ships.length - 1; a >= 0; a--) {
                    const aiShip = this.game.aiManager.ships[a];
                    const dist = Math.hypot(p.x - aiShip.x, p.y - aiShip.y);
                    if (dist < (aiShip.size || 30) + p.width) {
                        aiShip.health -= (p.damage || 25);
                        this.game.createExplosion(p.x, p.y, 'hit');
                        hit = true;
                        break;
                    }
                }
            }

            if (hit) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            if (hit) continue;
        }
    }

    collectMineral(mineral, sectorData) {
        if (!mineral || !this.game.playerShip) return;

        const dx = this.game.playerShip.x - mineral.x;
        const dy = this.game.playerShip.y - mineral.y;
        // For lotus: use 2D only - it lives in screen space, not 3D space
        // For all others: include Z so deep-space gems don't erroneously collect
        let dist;
        if (mineral.type === 'lotus') {
            dist = Math.sqrt(dx * dx + dy * dy);
        } else {
            const dz = (this.game.playerShip.z || 0) - (mineral.z || 0);
            dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        }

        // Standard collection range is 35 (size + ship size roughly)
        // PROSPECTOR: Gem Magnet - 20% wider pickup range
        let collectionRange = 35;
        if (mineral.type === 'lotus') {
            collectionRange = 70; // Lotus is visually very large (size 25 drawn at 2.5x = ~63px), match its footprint
        } else if (this.game.playerShip.type === 'prospector') {
            collectionRange = 45; // +30% Gem Magnet Range
        }

        if (dist < collectionRange) {
            // Check Cargo Capacity
            const currentCargo = this.game.playerShip.cargoCount || 0;
            const maxCargo = this.game.playerShip.maxCargo || 1000;
            if (currentCargo >= maxCargo) {
                if (!this.game.lastCargoFullToast || Date.now() - this.game.lastCargoFullToast > 3000) {
                    this.game.hudManager.showToast('🛑 CARGO FULL! Deposit at base (Z)');
                    this.game.lastCargoFullToast = Date.now();
                }
                return;
            }

            // Mindwave Lotus Special Handling: Quantum Restoration
            if (mineral.type === 'lotus') {
                // Tactical Rework: Additive restoration instead of hard reset
                this.game.playerShip.hullHealth = Math.min(this.game.playerShip.maxHull, this.game.playerShip.hullHealth + this.game.playerShip.maxHull * 0.25);
                this.game.playerShip.shield = Math.min(this.game.playerShip.maxShield, this.game.playerShip.shield + this.game.playerShip.maxShield * 0.5);
                this.game.playerShip.zenBuffer = Date.now() + 5000; // 5 seconds of peace (invulnerability)
                this.game.hudManager.updateShipStatus();
                this.game.hudManager.showToast('🪷 Mindwave Lotus: INTEGRITY RESTORED / ZEN BUFFER ACTIVE', 3000);
                
                // Trigger Life Burst VFX
                if (this.game.effectManager && this.game.effectManager.createLifeBurst) {
                    this.game.effectManager.createLifeBurst(mineral.x, mineral.y);
                }
                
                // Notification (No $ amount for lotus)
                this.game.collectionNotifications.push({
                    text: `+ INTEGRITY RESTORED / ZEN BUFFER`,
                    color: '#ff69b4',
                    time: Date.now()
                });
                
                if (typeof gameAudio !== 'undefined' && gameAudio.playUpgrade) {
                    gameAudio.playUpgrade(); // Special sound
                }
            } else {
                // Standard Gem: Add value to wallet
                this.game.credits += (mineral.value || 0);
                this.game.hudManager.updateWalletUI();
                
                // Show standard notification
                this.game.collectionNotifications.push({
                    text: `+ ${mineral.name} ($${mineral.value})`,
                    color: mineral.color,
                    time: Date.now()
                });

                // Audio: collect jingle
                if (typeof gameAudio !== 'undefined') {
                    const isPremium = ['diamond', 'sapphire', 'platinum', 'emerald', 'ruby', 'darkmatter', 'antimatter'].includes(mineral.type);
                    if (isPremium) {
                        gameAudio.playLuxuryPing();
                    } else {
                        gameAudio.playCollect();
                    }
                }
                
                // Visual Burst
                if (this.game.effectManager) {
                    this.game.effectManager.createExplosion(mineral.x, mineral.y, 'collect', mineral.color);
                }
            }

            // Siphon Ability: Restore 1% Shield
            if (this.game.playerShip.type === 'siphon' && this.game.playerShip.shield < this.game.playerShip.maxShield) {
                this.game.playerShip.shield = Math.min(this.game.playerShip.shield + (this.game.playerShip.maxShield * 0.01), this.game.playerShip.maxShield);
                this.game.hudManager.updateShipStatus();
            }

            // Track for inventory logic
            if (!this.game.playerInventory[mineral.type]) {
                this.game.playerInventory[mineral.type] = 0;
            }
            this.game.playerInventory[mineral.type]++;
            this.game.carriedResources[mineral.type] = (this.game.carriedResources[mineral.type] || 0) + 1;
            this.game.playerShip.cargoCount = (this.game.playerShip.cargoCount || 0) + 1;
            this.game.saveInventory();
            this.game.saveCarriedResources();

            // Award permanent gems (1 gem per mineral collected)
            this.game.playerGems += 1;
            localStorage.setItem('playerGems', this.game.playerGems);

            // --- ACADEMY PROGRESS (PHASE 2) ---
            if (this.game.academyManager && this.game.academyManager.sessionProgress) {
                this.game.academyManager.sessionProgress.mineralsCollected++;
            }

            // Remove mineral from sector storage
            if (sectorData && sectorData.minerals) {
                const idx = sectorData.minerals.indexOf(mineral);
                if (idx > -1) sectorData.minerals.splice(idx, 1);
            }

            // MAULER VISUALS: Spawn debris trail
            if (this.game.playerShip.type === 'hauler') {
                if (!this.game.maulerDebris) this.game.maulerDebris = [];
                // Add debris particle
                this.game.maulerDebris.push({
                    x: this.game.playerShip.x, // Start at ship center
                    y: this.game.playerShip.y,
                    offsetX: (Math.random() - 0.5) * 20, // Random offset relative to ship
                    offsetY: (Math.random() - 0.5) * 20,
                    color: mineral.color,
                    size: mineral.size * 0.6,
                    detached: false, // Attached to ship initially
                    vx: 0,
                    vy: 0,
                    life: 1.0 // Fade out when detached
                });

                // Cap debris count
                if (this.game.maulerDebris.length > 50) this.game.maulerDebris.shift();
            }
        }
    }

}
window.PlayerManager = PlayerManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.PlayerManager = PlayerManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlayerManager;
}
