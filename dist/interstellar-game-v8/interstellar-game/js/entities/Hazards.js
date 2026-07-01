class HazardManager {
    constructor(game) {
        this.game = game;
    }

    spawnHazards() {
        // Never spawn hazards during training - mines would kill students mid-lesson!
        if (!this.game.flightMode || this.game.hazardEffect || this.game.trainingActive) return;

        const ship = this.game.playerShip;
        const spawnRadius = 3000;
        const minSpawnDist = 1800; // INCREASED: Must be well outside visual detection range

        // Target density: fewer hazards than minerals for balance
        const targetMines = 3;
        const targetBlackHoles = 1;

        // Remove distant hazards
        this.game.spaceMines = this.game.spaceMines.filter(m => {
            const dist = Math.hypot(m.x - ship.x, m.y - ship.y);
            return dist < spawnRadius * 2;
        });
        this.game.hazardBlackHoles = this.game.hazardBlackHoles.filter(bh => {
            const dist = Math.hypot(bh.x - ship.x, bh.y - ship.y);
            return dist < spawnRadius * 2;
        });

        // Helper: pick a safe spawn angle that avoids the player's current heading
        // Avoids 60° cone directly ahead so hazards never spawn where you're flying
        const safeAngle = () => {
            const heading = Math.atan2(ship.vy || 0, ship.vx || 0);
            let angle;
            let attempts = 0;
            do {
                angle = Math.random() * Math.PI * 2;
                const diff = Math.abs(((angle - heading) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
                attempts++;
                if (diff > Math.PI / 3) break; // Outside 60° cone ahead
            } while (attempts < 10);
            return angle;
        };

        // Spawn new mines — min 1800 units away so player has time to react
        while (this.game.spaceMines.length < targetMines) {
            const angle = safeAngle();
            const dist = minSpawnDist + Math.random() * (spawnRadius - minSpawnDist);
            this.game.spaceMines.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                size: 25 + Math.random() * 15,
                pulsePhase: Math.random() * Math.PI * 2,
                color: '#ff4400',
                glowColor: 'rgba(255, 100, 0, 0.8)',
                health: 30 // One or two shots
            });
        }

        // Spawn new black holes (rarer) — extra far, they're inescapable
        while (this.game.hazardBlackHoles.length < targetBlackHoles) {
            const angle = safeAngle();
            const dist = minSpawnDist * 1.5 + Math.random() * (spawnRadius - minSpawnDist);
            this.game.hazardBlackHoles.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                size: 60 + Math.random() * 40,
                rotationPhase: Math.random() * Math.PI * 2,
                particleRings: this.game.proceduralManager.generateBlackHoleRings()
            });
        }

        // === MISSILE BASES ===
        const targetBases = 2; // Number of missile bases to maintain

        // Remove distant missile bases
        this.game.missileBases = this.game.missileBases.filter(base => {
            const dist = Math.hypot(base.x - ship.x, base.y - ship.y);
            return dist < spawnRadius * 2;
        });

        // Remove distant missiles
        this.game.enemyMissiles = this.game.enemyMissiles.filter(missile => {
            const dist = Math.hypot(missile.x - ship.x, missile.y - ship.y);
            return dist < spawnRadius * 2 && missile.life > 0;
        });

        // Spawn new missile bases — min 2000 units, detection range is 1200-1800 so player must cross 200+ units before being targeted
        const missileBaseMinDist = 2000;
        while (this.game.missileBases.length < targetBases) {
            const angle = safeAngle();
            const dist = missileBaseMinDist + Math.random() * (spawnRadius - missileBaseMinDist);
            this.game.missileBases.push({
                x: ship.x + Math.cos(angle) * dist,
                y: ship.y + Math.sin(angle) * dist,
                size: 40 + Math.random() * 20,
                rotationPhase: Math.random() * Math.PI * 2,
                health: 100,
                lastFireTime: 0,
                fireRate: 800 + Math.random() * 800, // Faster firing (1-1.6s)
                detectionRange: 1200 + Math.random() * 600, // Much wider detection
                turretAngle: 0, // Current aim angle
                alertLevel: 0, // 0-1, increases when player is detected
                color: '#4488ff'
            });
        }
    }

    updateHazards() {
        if (!this.game.flightMode) return;

        // If an effect is active, update it and skip collision checks
        if (this.game.hazardEffect) {
            this.updateHazardEffect();
            return;
        }

        // --- TRAINING TRACK PROGRESSION ---
        if (this.game.trainingActive) {
            this.game.missionManager.updateTraining();
        }
        // Legacy tutorial hook (kept for backward compat)
        if (this.game.tutorialActive) {
            this.game.updateTutorial();
        }

        const ship = this.game.playerShip;
        const collisionRadius = 30;

        // If a hazard effect is already active, don't process new collisions
        if (this.game.hazardEffect) return;

        // Check mine collisions
        for (const mine of this.game.spaceMines) {
            const dist = Math.hypot(mine.x - ship.x, mine.y - ship.y);
            if (dist < mine.size + collisionRadius) {
                this.game.triggerSupernovaEffect(mine);
                this.game.spaceMines = this.game.spaceMines.filter(m => m !== mine);
                return;
            }
        }

        // Check black hole collisions
        for (const bh of this.game.hazardBlackHoles) {
            const dist = Math.hypot(bh.x - ship.x, bh.y - ship.y);
            if (dist < bh.size * 0.5 + collisionRadius) {
                this.game.triggerBlackHoleEffect(bh);
                this.game.hazardBlackHoles = this.game.hazardBlackHoles.filter(b => b !== bh);
                return;
            }
        }

        // Check missile base collisions (ramming the base)
        for (const base of this.game.missileBases) {
            const dist = Math.hypot(base.x - ship.x, base.y - ship.y);
            if (dist < base.size * 1.5 + collisionRadius) {
                this.game.triggerMissileBaseDestructionEffect(base);
                this.game.missileBases = this.game.missileBases.filter(b => b !== base);
                return;
            }
        }

        // Check planet collisions (deep space background planets)
        // Only check if deep space style is active and planets exist
        if (this.game.planets && this.game.planets.length > 0) {
            for (const planet of this.game.planets) {
                // Account for z-depth scaling (planets further away appear smaller)
                const zFactor = 1 / (1 + Math.abs(planet.z) * 0.0005);
                const effectiveRadius = planet.radius * zFactor;

                // Only collide with planets that are "close enough" in z-space (not too far away)
                if (Math.abs(planet.z) > 800) continue; // Skip very distant planets

                const dist = Math.hypot(planet.x - ship.x, planet.y - ship.y);
                if (dist < effectiveRadius + collisionRadius) {
                    const speed = Math.hypot(ship.vx, ship.vy);
                    if (planet.type === 'terrestrial' && speed < 5) {
                        // Planetary Landing Sequence - zero out playerShip velocity
                        this.game.playerShip.vx = 0;
                        this.game.playerShip.vy = 0;
                        this.game.openBaseBuilder(planet);
                        return;
                    } else {
                        this.game.triggerPlanetImpactEffect(planet);
                        return; // High speed crash into planet
                    }
                }
            }
        }

        // === UPDATE MISSILE BASES ===
        const now = Date.now();
        for (const base of this.game.missileBases) {
            const distToPlayer = Math.hypot(base.x - ship.x, base.y - ship.y);

            // Update turret angle to track player
            const angleToPlayer = Math.atan2(ship.y - base.y, ship.x - base.x);

            // Smooth turret rotation
            let angleDiff = angleToPlayer - base.turretAngle;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            base.turretAngle += angleDiff * 0.05;

            // Update alert level based on player proximity
            // SPECTRE: Cloak - Enemies ignore you if cloaked (passive for Spectre)
            // ECM: Reduce effective detection range (10% per level)
            const ecmFactor = 1 - (this.game.playerShip.ecmStrength || 0) * 0.1;
            const effectiveDetectionRange = base.detectionRange * ecmFactor;
            
            const isSpectre = ship.type === 'spectre';
            if (distToPlayer < effectiveDetectionRange && !ship.isCloaked && !isSpectre) {
                // AGGRESSIVE ALERT: Scales faster
                base.alertLevel = Math.min(1, base.alertLevel + 0.05);

                // Fire missile if ready and player in range
                if (now - base.lastFireTime > base.fireRate && base.alertLevel > 0.4) {
                    this.game.fireMissile(base);
                    base.lastFireTime = now;
                }
            } else {
                // PERSISTENT ALERT: Slow decay (takes ~16s to drop from 1 to 0 at 60fps)
                base.alertLevel = Math.max(0, base.alertLevel - 0.001);
            }
        }

        // === UPDATE HEAT-SEEKING MISSILES ===
        for (const missile of this.game.enemyMissiles) {
            const isSpectre = ship.type === 'spectre';
            
            // TARGET ACQUISITION: Check for flare distraction first
            let targetX = ship.x;
            let targetY = ship.y;
            let isDistracted = false;

            if (this.game.decoyFlares.length > 0) {
                // Find closest flare within distraction radius
                let closestFlare = null;
                let minDist = 800; // Flare attraction radius
                for (const flare of this.game.decoyFlares) {
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
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

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
                this.game.triggerMissileHitEffect(missile);
                missile.life = 0;
            }
        }

        // Remove dead missiles (from life running out OR EMP kill)
        this.game.enemyMissiles = this.game.enemyMissiles.filter(m => m.life > 0 && !m.dead);

        // === UPDATE DECOY FLARES ===
        for (let i = this.game.decoyFlares.length - 1; i >= 0; i--) {
            const flare = this.game.decoyFlares[i];
            flare.x += flare.vx;
            flare.y += flare.vy;
            flare.vx *= 0.95; // Drag
            flare.vy *= 0.95;
            flare.life--;
            if (flare.life <= 0) {
                this.game.decoyFlares.splice(i, 1);
            }
        }

        // Spawn new hazards
        this.spawnHazards();
    }

    updateHazardEffect() {
        if (!this.game.hazardEffect) return;

        try {
            const now = performance.now();
            let elapsed = now - this.game.hazardEffect.startTime;
            const duration = Math.max(1, this.game.hazardEffect.duration || 8000);

            // CRITICAL FIX: If the effect hasn't rendered at least one frame yet
            // but elapsed time already exceeds duration (e.g., due to alert() pausing JS),
            // reset the startTime to NOW so the animation plays from the beginning.
            if (!this.game.hazardEffect._hasRenderedFrame && elapsed > duration * 0.5) {
                console.log('[Hazard] Resetting startTime - elapsed', elapsed.toFixed(0), 'ms before first render frame');
                this.game.hazardEffect.startTime = now;
                elapsed = 0;
            }

            const progress = Math.max(0, Math.min(1.0, elapsed / duration));

            if (isNaN(progress)) {
                console.error('[Hazard] Progress is NaN! Force-clearing effect.');
                this.game.hazardEffect = null;
                return;
            }

            // BLACK HOLE: Teleport during white phase (80%) - not at end
            // This prevents the glitch where old universe shows before new one loads
            if (this.game.hazardEffect.type === 'blackhole' && progress >= 0.8 && !this.game.hazardEffect.hasTeleported) {
                // Teleport player to destination while screen is still white
                this.game.playerShip.x = this.game.hazardEffect.destX;
                this.game.playerShip.y = this.game.hazardEffect.destY;
                this.game.hazardEffect.hasTeleported = true;

                // Clear old minerals/hazards so new ones spawn at new location
                this.game.minerals = this.game.minerals.filter(m => {
                    const dx = m.x - this.game.playerShip.x;
                    const dy = m.y - this.game.playerShip.y;
                    return Math.hypot(dx, dy) < 3000; // Keep only close ones
                });

                console.log('[Hazard] Teleported during white phase to:', this.game.hazardEffect.destX, this.game.hazardEffect.destY);
                console.log('[Debug] Ship type after black hole:', this.game.playerShip.type);
            }

            // Update effect-specific logic BEFORE completion check
            if (this.game.hazardEffect.type === 'supernova' || this.game.hazardEffect.type === 'missile_base_destruction') {
                this.game.updateSupernovaEffect(progress);
            } else if (this.game.hazardEffect.type === 'blackhole') {
                this.game.updateBlackHoleEffectState(progress);
            } else if (this.game.hazardEffect.type === 'planet_impact') {
                this.game.updatePlanetImpactEffect(progress);
            } else if (this.game.hazardEffect.type === 'player_death') {
                this.game.updatePlayerDeathEffect(progress);
            }

            // Effect complete - now safe to restore controls
            // Check for completion AFTER state has been updated to final frame
            if (progress >= 1 || (this.game.hazardEffect.deathTimestamp && now > this.game.hazardEffect.deathTimestamp)) {
                // Clear the hazard effect FIRST to allow controls through
                if (this.game.hazardEffect.type === 'boost') {
                    this.game.playerShip.boostActive = false;
                }
                
                // UNIVERSAL RESPAWN FAILSAFE: Ensure health/shield are always restored after any death-causing hazard
                const finishedHazardType = this.game.hazardEffect.type;
                if (this.game.playerShip.hullHealth <= 0) {
                    this.game.playerShip.shield = this.game.playerShip.maxShield;
                    this.game.playerShip.hullHealth = this.game.playerShip.maxHull;

                    // RESTORE ENGINE AUDIO AFTER RESPAWN
                    if (window.gameAudio) window.gameAudio.startEngineHum();

                    // If it wasn't a player_death or blackhole (which handle their own spatial relocation), safely teleport them
                    if (finishedHazardType !== 'player_death' && finishedHazardType !== 'blackhole') {
                        const teleportDist = 2000 + Math.random() * 3000;
                        const teleportAngle = Math.random() * Math.PI * 2;
                        this.game.playerShip.x += Math.cos(teleportAngle) * teleportDist;
                        this.game.playerShip.y += Math.sin(teleportAngle) * teleportDist;
                        this.game.hudManager.showToast('🚀 Systems restored after critical impact.');
                    }
                }

                this.game.hazardEffect = null;

                // Reset camera to prevent permanent drift (Missing Ship bug)
                this.game.camera.shakeX = 0;
                this.game.camera.shakeY = 0;

                // Reset ALL input states to clean slate
                this.game.keysPressed = {};
                this.game.joyInputX = 0;
                this.game.joyInputY = 0;
                this.game.joystickActive = false;

                // Reset mouse states that might block input
                this.game.mouseRightDown = false;
                this.game.mouseLastX = undefined;
                this.game.mouseLastY = undefined;

                // Ensure ship can move again (velocities were set to 0 when effect started)
                this.game.playerShip.vx = 0;
                this.game.playerShip.vy = 0;
                this.game.playerShip.vz = 0;

                // Focus canvas to ensure keyboard events are captured
                if (this.game.canvas) {
                    this.game.canvas.focus();
                }

                // Show toast so user knows they can move again
                this.game.hudManager.showToast('Controls restored - use WASD to move!');

                console.log('[Hazard] Effect complete - ALL CONTROLS RE-ENABLED');
                return;
            }

        } catch (e) {
            console.error('[Hazard] Critical error during effect update:', e);
            this.game.hazardEffect = null; // Kill the effect to prevent permanent lock
        }
    }

    renderHazardEffect(ctx, rawTime) {
        if (!this.game.hazardEffect) return;

        // CRITICAL: Reset canvas transform to ensure we draw in screen space
        // Without this, previous draw calls leave transforms that make the effect invisible
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';

        // Mark that the effect has been rendered at least once
        this.game.hazardEffect._hasRenderedFrame = true;

        try {
            const now = performance.now();
            const time = typeof rawTime === 'number' ? rawTime : now;
            const progress = Math.max(0, Math.min(1.0, (now - this.game.hazardEffect.startTime) / (this.game.hazardEffect.duration || 8000)));

            if (isNaN(progress)) return;
            this.game.hazardEffect.progress = progress; // Update shared progress

            if (this.game.hazardEffect.type === 'supernova') {
                this.game.renderManager.renderSupernovaEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'blackhole') {
                this.game.renderManager.renderBlackHoleEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'missile_base_destruction') {
                this.game.renderMissileBaseDestructionEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'planet_impact') {
                this.game.renderPlanetImpactEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'missile_hit') {
                this.game.renderMissileHitEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'player_death') {
                this.game.renderPlayerDeathEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'emp') {
                this.game.renderEMPEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'quantum') {
                this.game.renderQuantumEffect(ctx, time);
            }
        } catch (e) {
            console.error('[Hazard] Critical error during effect rendering:', e);
            // Don't null the effect here if possible, but if it keeps failing, the next update will kill it
        }
    }

}
window.HazardManager = HazardManager;
