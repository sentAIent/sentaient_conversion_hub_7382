class PlayerManager {
    constructor(game) {
        this.game = game;
    }


    shoot() {
        const now = Date.now();
        const ship = this.game.playerShip;
        if (!ship) return;

        // Cooldown scales with weapon level (e.g., base 200ms, -33% per level)
        const weaponLevel = ship.upgrades.weapons || 0;
        const cooldown = 200 / (1 + weaponLevel * 0.5);
        if (ship.lastShot && now - ship.lastShot < cooldown) return;
        ship.lastShot = now;

        // Audio: player laser
        gameAudio.playLaser();

        // Muzzle Flash
        ship.muzzleFlash = 1.0;

        // Create Projectile
        const speed = 25; // Faster than ship (max 15-20)
        // Direction based on ship rotation and pitch
        const angle = ship.rotation;

        // Offset to match ship nose
        const noseOffset = 40 / this.game.camera.zoom;
        const startX = ship.x + Math.cos(angle) * noseOffset;
        const startY = ship.y + Math.sin(angle) * noseOffset;

        // Add velocity of ship to projectile for conservation of momentum feel
        const pVx = ship.vx * 0.5 + Math.cos(angle) * speed;
        const pVy = ship.vy * 0.5 + Math.sin(angle) * speed;

        // Visual scaling based on weapon level
        const pWidth = (4 + weaponLevel * 2) / this.game.camera.zoom;
        const pLength = (40 + weaponLevel * 20) / this.game.camera.zoom;
        const pColor = weaponLevel >= 3 ? '#ff3300' : (weaponLevel >= 1 ? '#ffff00' : '#00ffcc');

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
            damage: 25 * (1 + weaponLevel * 0.5) // Attach damage to projectile
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


    updatePlayerShip() {
        const ship = this.game.playerShip;
        const keys = this.game.keysPressed;

        // DISABLE ALL CONTROLS during hazard effects
        if (this.game.hazardEffect) {
            this.game.camera.x = -ship.x * this.game.camera.zoom;
            this.game.camera.y = -ship.y * this.game.camera.zoom;
            return;
        }

        // Rotation (Yaw - left/right)
        if (keys['a'] || keys['arrowleft']) ship.rotation -= ship.rotationSpeed;
        if (keys['d'] || keys['arrowright']) ship.rotation += ship.rotationSpeed;

        // Joystick Yaw
        if (this.game.joyInputX) {
            ship.rotation += this.game.joyInputX * ship.rotationSpeed;
        }

        // Mouse Steering (Right-Click Drag)
        if (this.game.mouseRightDown && this.game.mouseLastX !== undefined) {
            const deltaX = this.game.mouseX - this.game.mouseLastX;
            const deltaY = this.game.mouseY - this.game.mouseLastY;
            ship.rotation += deltaX * 0.005;
            ship.pitch += deltaY * 0.005;
            ship.pitch = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, ship.pitch));
            this.game.mouseLastX = this.game.mouseX;
            this.game.mouseLastY = this.game.mouseY;
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
            this.game.hudManager.showToast('Overclock Disengaged.');
        }

        if (ship.type === 'viper' && ship.boostActive) {
            abilityAccelMult = 2.0;
        } else if (ship.type === 'apex' && ship.overclockActive) {
            abilityAccelMult = 2.0;
        }

        const enginesActive = !ship.enginesDisabled;

        if ((keys['w'] || keys['arrowup']) && enginesActive) {
            ship.vx += cos * ship.acceleration * abilityAccelMult;
            ship.vy += sin * ship.acceleration * abilityAccelMult;
        }
        if ((keys['s'] || keys['arrowdown']) && enginesActive) {
            ship.vx -= cos * ship.acceleration * 0.5 * abilityAccelMult;
            ship.vy -= sin * ship.acceleration * 0.5 * abilityAccelMult;
        }

        // Joystick Thrust
        if (this.game.joyInputY && Math.abs(this.game.joyInputY) > 0.1) {
            const thrust = -this.game.joyInputY * ship.acceleration;
            ship.vx += cos * thrust;
            ship.vy += sin * thrust;
        }

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
        if (this.game.globalAbilityActive && this.game.globalAbilityActive.afterburner) {
            effectiveMaxSpeed *= 3.0 + (this.game.playerSkills.afterburner * 0.5);
        }

        // Penalty: Towing base reduces max speed
        if (this.game.spaceBase && this.game.spaceBase.isTowing) {
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
                    const pull = 1.2 * (1 - dist / 400);
                    line.vx += (dx / dist) * pull;
                    line.vy += (dy / dist) * pull;
                }
            }
        });
        this.game.speedLines = this.game.speedLines.filter(line => line.life > 0);

        // Sanity Check for NaN - Recovery Mechanism
        if (isNaN(ship.x) || isNaN(ship.y) || isNaN(ship.z)) {
            console.warn("⚠️ CRITICAL: Ship coordinates corrupt (NaN). Emergency reset invoked.");
            ship.x = 0; ship.y = 0; ship.z = 0;
            ship.vx = 0; ship.vy = 0; ship.vz = 0;
        }

        // Camera follow
        this.game.camera.x = -ship.x * this.game.camera.zoom;
        this.game.camera.y = -ship.y * this.game.camera.zoom;

        this.game.checkAndGenerateSectors();

        // Muzzle Flash Decay
        if (ship.muzzleFlash > 0) {
            ship.muzzleFlash -= 0.1;
        }

        // Weapon Firing (Spacebar)
        if (keys[' ']) {
            this.shoot();
        }
    }




    updateProjectiles() {
        // Iterate backwards to allow removal
        for (let i = this.game.projectiles.length - 1; i >= 0; i--) {
            const p = this.game.projectiles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            if (p.life <= 0) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // check collisions with Space Mines
            let hit = false;
            for (let j = this.game.spaceMines.length - 1; j >= 0; j--) {
                const mine = this.game.spaceMines[j];
                const dx = p.x - mine.x;
                const dy = p.y - mine.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mine.size + p.width) {
                    // HIT!
                    this.game.createExplosion(p.x, p.y, 'hit');
                    mine.health -= (p.damage || 25); // Use projectile damage
                    hit = true;

                    if (mine.health <= 0) {
                        this.game.destroySpaceMine(j);
                    }
                    break; // One hit per projectile
                }
            }

            if (hit) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Missile Bases
            for (let k = this.game.missileBases.length - 1; k >= 0; k--) {
                const base = this.game.missileBases[k];
                const dx = p.x - base.x;
                const dy = p.y - base.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < base.size * 1.5 + p.width) { // Base hitbox is generous
                    // HIT!
                    this.game.createExplosion(p.x, p.y, 'hit');
                    base.health -= (p.damage || 25);
                    hit = true;

                    // Flash base red
                    base.hitFlash = 10;

                    if (base.health <= 0) {
                        this.game.destroyMissileBase(k);
                    }
                    break;
                }
            }

            if (hit) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // Check collisions with Enemy Ships
            for (let e = this.game.enemyShips.length - 1; e >= 0; e--) {
                const enemy = this.game.enemyShips[e];
                const typeDef = ENEMY_TYPES[enemy.type];
                const dx = p.x - enemy.x;
                const dy = p.y - enemy.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < typeDef.size + p.width) {
                    this.game.createExplosion(p.x, p.y, 'hit');
                    enemy.health -= (p.damage || 25);
                    enemy.hitFlash = 10;
                    hit = true;

                    // Faction Wars: Reputation Adjustments
                    if (enemy.faction) {
                        this.game.factionRep[enemy.faction] = Math.max(-100, (this.game.factionRep[enemy.faction] || 0) - 2);
                        // Friendly boost to rivals
                        Object.keys(this.game.factionRep).forEach(f => {
                            if (f !== enemy.faction) this.game.factionRep[f] = Math.min(100, (this.game.factionRep[f] || 0) + 1);
                        });
                        localStorage.setItem('factionRep', JSON.stringify(this.game.factionRep));
                    }

                    if (enemy.health <= 0) {
                        this.game.destroyEnemyShip(e);
                    }
                    break;
                }
            }

            if (hit) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // Check collision with Boss
            if (this.game.activeBoss) {
                const boss = this.game.activeBoss;
                const bTypeDef = BOSS_TYPES[boss.type];
                const dx = p.x - boss.x;
                const dy = p.y - boss.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < bTypeDef.size + p.width) {
                    this.game.createExplosion(p.x, p.y, 'hit');
                    this.game.damageBoss(25);
                    hit = true;
                }
            }

            if (hit) {
                this.game.projectiles.splice(i, 1);
                continue;
            }

            // CHECK COLLISIONS WITH BLACK HOLES (Sucked in)
            for (let b = 0; b < this.game.hazardBlackHoles.length; b++) {
                const bh = this.game.hazardBlackHoles[b];
                const dx = p.x - bh.x;
                const dy = p.y - bh.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // If projectile enters the black hole horizon region, it vanishes
                if (dist < bh.size * 1.8) {
                    this.game.projectiles.splice(i, 1);
                    hit = true;
                    break;
                }
            }

            if (hit) continue;
        }
    }

    collectMineral(mineral) {
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
                this.game.playerShip.hullHealth = this.game.playerShip.maxHull;
                this.game.playerShip.shield = this.game.playerShip.maxShield;
                this.game.playerShip.zenBuffer = Date.now() + 5000; // 5 seconds of peace
                this.game.hudManager.updateShipStatus();
                this.game.hudManager.showToast('🪷 Mindwave Lotus: INTEGRITY RESTORED / ZEN BUFFER ACTIVE', 3000);
                gameAudio.playUpgrade(); // Special sound
            } else {
                // Standard Gem: Add value to wallet
                this.game.credits += (mineral.value || 0);
                this.game.hudManager.updateWalletUI();
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

            // Audio: collect jingle
            if (typeof gameAudio !== 'undefined' && gameAudio.playCollect) {
                gameAudio.playCollect();
            }

            // SPECIAL CASE: Mindwave Lotus - Restoration Power-up
            if (mineral.type === 'lotus') {
                const hpRestore = Math.floor(this.game.playerShip.maxHull * 0.25);
                const shRestore = Math.floor(this.game.playerShip.maxShield * 0.50);
                
                this.game.playerShip.hullHealth = Math.min(this.game.playerShip.hullHealth + hpRestore, this.game.playerShip.maxHull);
                this.game.playerShip.shield = Math.min(this.game.playerShip.shield + shRestore, this.game.playerShip.maxShield);
                
                if (this.game.updateShipStatus) this.game.hudManager.updateShipStatus();
                this.game.hudManager.showToast(`🌸 Mindwave Lotus: +${hpRestore} HP | +${shRestore} Shield!`);
                
                // Notification (No $ amount for lotus)
                this.game.collectionNotifications.push({
                    text: `+ ${hpRestore} HP | + ${shRestore} SHIELD`,
                    color: '#ff69b4',
                    time: Date.now()
                });
            } else {
                // Show standard notification
                this.game.collectionNotifications.push({
                    text: `+ ${mineral.name} ($${mineral.value})`,
                    color: mineral.color,
                    time: Date.now()
                });
            }

            // Remove mineral
            const index = this.game.minerals.indexOf(mineral);
            if (index > -1) this.game.minerals.splice(index, 1);

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
