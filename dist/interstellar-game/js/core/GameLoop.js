class GameLoopManager {
    constructor(game) {
        this.game = game;
        this.animate = this.animate.bind(this);
        this.isRunning = false;
        this.animationId = null;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animationId = requestAnimationFrame(this.animate);
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }

    animate(time) {
        if (!this.isRunning) return;
        const game = this.game;
        game.frameCounter++;

        // Update flight game physics (ALWAYS 60 FPS)
        if (game.flightMode) {
            try {
                // Safety Check: Avoid crashes if critical objects are missing
                if (!game.playerShip || !game.camera) return;

                const dt = game.timeScale || 1.0;

                game.checkAndGenerateSectors();
                if (game.playerManager && game.playerManager.updatePlayerShip) {
                    game.playerManager.updatePlayerShip(dt);
                }
                if (game.playerManager && game.playerManager.updateProjectiles) {
                    game.playerManager.updateProjectiles(dt);
                }
                game.engineCore.updateDamageParticles(dt);

                // ATOMIC OVER-SHIELD RECHARGE (Phase 18)
                if (game.playerShip.atomicShield < game.playerShip.maxAtomicShield) {
                    const now = Date.now();
                    const delay = 5000; // 5s recharge delay
                    if (!game.playerShip.lastDamageTime || now - game.playerShip.lastDamageTime > delay) {
                        game.playerShip.atomicShield = Math.min(game.playerShip.maxAtomicShield, game.playerShip.atomicShield + (game.playerShip.atomicRechargeRate || 0.5) * dt);
                    }
                }

                if (game.engineCore.updateMinerals) game.engineCore.updateMinerals(dt);
                game.hazardManager.updateHazards(dt);
                if (game.baseBuilder) game.baseBuilder.updateSpaceBase(dt);

                game.combatManager.updateEnemyShips(dt);
                game.combatManager.updateWingmen(dt);
                game.combatManager.updateEnemyBullets(dt);
                game.combatManager.updateBoss(dt);
                if (game.bossManager) game.bossManager.update(dt);
                if (game.capitalShipManager) game.capitalShipManager.update(dt);
                if (game.warpGateManager) game.warpGateManager.update(dt);

                // Update AI simulation
                if (game.aiManager && game.aiManager.update) {
                    game.aiManager.update(dt);
                }

                // Update Cinematic system
                if (game.cinematicManager) game.cinematicManager.update();

                // Update Academy/Tutorial Logic (PHASE 2)
                if (game.academyManager) game.academyManager.update(dt);
                if (game.logisticsManager) game.logisticsManager.update(dt);

                // Update engine hum pitch based on ship thrust instead of raw speed
                const thrustInput = (game.playerShip.currentThrust || 0) * 15;
                
                // --- POSITIONAL HAZARD AUDIO ---
                if (window.gameAudio) {
                    window.gameAudio.updateEngineHum(thrustInput);
                    
                    // Nearest Black Hole
                    let nearestBHDist = 10000;
                    let nearestBHRelX = 0;
                    game.hazardBlackHoles.forEach(bh => {
                        const dx = bh.x - game.playerShip.x;
                        const dy = bh.y - game.playerShip.y;
                        const d = Math.sqrt(dx*dx + dy*dy);
                        if (d < nearestBHDist) {
                            nearestBHDist = d;
                            // Calculate relative X for panning (-1 to 1)
                            // We use ship angle to determine if it's left or right
                            const angleToBH = Math.atan2(dy, dx) - (game.playerShip.rotation || 0);
                            nearestBHRelX = Math.sin(angleToBH);
                        }
                    });

                    // Nearest Nebula
                    let nearestNebDist = 10000;
                    for (const sector of game.loadedSectors.values()) {
                        if (sector.hazards && sector.hazards.nebula) {
                            const neb = sector.hazards.nebula;
                            const d = Math.sqrt((game.playerShip.x - neb.x)**2 + (game.playerShip.y - neb.y)**2);
                            if (d < nearestNebDist) nearestNebDist = d;
                        }
                    }

                    window.gameAudio.updateHazardAudio(nearestBHDist, nearestBHRelX, nearestNebDist);
                }

                if (game.activeMission && game.activeMission.type === 'survive') game.missionManager.checkMissionComplete();
                if (game.activeMission && game.activeMission.type === 'collect') {
                    if (game.activeMission.baselineInventory === undefined) {
                        let total = 0;
                        for (const key in game.playerInventory) { total += (game.playerInventory[key] || 0); }
                        game.activeMission.baselineInventory = total;
                    }
                    // Optimized: Use simple loop instead of Object.values().reduce() to reduce garbage
                    let totalNow = 0;
                    for (const key in game.playerInventory) { totalNow += (game.playerInventory[key] || 0); }
                    const delta = totalNow - game.activeMission.baselineInventory;
                    if (game.activeMission.progress !== delta) {
                        game.activeMission.progress = Math.max(0, delta);
                        game.hudManager.updateMissionHUD();
                        game.missionManager.checkMissionComplete();
                    }
                }

                game.hudManager.updateFlightHUD();

                // PASSIVE FLARE RECHARGE: 1 flare every 30 seconds
                const now = Date.now();
                if (game.playerShip.maxFlares > 0 && game.playerShip.flares < game.playerShip.maxFlares) {
                    if (!game.playerShip.lastFlareRefill) game.playerShip.lastFlareRefill = now;
                    if (now - game.playerShip.lastFlareRefill > 30000) {
                        game.playerShip.flares++;
                        game.playerShip.lastFlareRefill = now;
                        game.hudManager.showToast('🔥 Flare Recharged (Passive)');
                    }
                }
            } catch (e) {
                console.error('[Engine) Flight loop error:', e.message);
            }
        }

        // --- GLOBAL CAMERA SMOOTHING & ZOOM LERPING (Phase 26 Restoration) ---
        if (game.camera) {
            if (game.camera.targetZoom === undefined) game.camera.targetZoom = game.camera.zoom || 1;
            
            // Zoom Lerp: Faster in standard, slower in cinematic
            const zoomFactor = game.cinematicMode ? 0.03 : 0.15;
            game.camera.zoom = (game.camera.zoom || 1) + (game.camera.targetZoom - (game.camera.zoom || 1)) * zoomFactor;

            // Position Lerp: Only center on ship in flight mode
            if (game.flightMode && game.playerShip) {
                const targetCamX = -game.playerShip.x * game.camera.zoom;
                const targetCamY = -game.playerShip.y * game.camera.zoom;
                const posFactor = game.cinematicMode ? 0.04 : 0.25;
                
                game.camera.x += (targetCamX - game.camera.x) * posFactor;
                game.camera.y += (targetCamY - game.camera.y) * posFactor;
            }
        }

        // --- PHASE 11: SURFACE OPERATIONS UPDATE ---
        if (game.surfaceMode) {
            if (game.surfaceManager) game.surfaceManager.update();
            if (game.hudManager && game.hudManager.updateFlightHUD) {
                 game.hudManager.updateFlightHUD(); // Consolidate life-support bars
            }
        }

        // Update background object positions (Spacecraft, Stars)
        this.updateBackgroundObjects();

        // Update static stars for Drift/Warp modes
        this.updateBackgroundParallax();

        // Warp Flyout/Flyin: Move world objects
        if (game.bgWarpMode || game.warpDisengaging) {
            this.updateWarpWorldMotion();
        }

        // --- PHASE 28: HUD STATS UPDATE ---
        if (game.updateStats) game.updateStats();

        try {
            game.renderManager.draw(time);

            // Phase 15 - Void Dimension Filter
            if (game.chronoShiftActive) {
                const ctx = game.ctx;
                const canvas = game.canvas;
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                
                // Deep void purple overlay with 'difference' blend
                ctx.globalCompositeOperation = 'difference';
                ctx.fillStyle = 'rgba(40, 0, 60, 1.0)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Glitchy chromatic edge
                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = `rgba(255, 0, 100, ${0.1 + Math.random() * 0.1})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Dark vignette
                ctx.globalCompositeOperation = 'multiply';
                const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.height * 0.2, canvas.width/2, canvas.height/2, canvas.width * 0.8);
                game.renderManager.safeAddColorStop(grad, 0, 'rgba(255, 255, 255, 1)');
                game.renderManager.safeAddColorStop(grad, 1, 'rgba(0, 0, 0, 1)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.restore();
            }

        } catch (e) {
            console.error('FATAL RENDER ERROR:', e);
            if (game.hudManager && game.hudManager.showToast) game.hudManager.showToast("⚠️ FATAL ENGINE ERROR: " + e.message, 10000);
            const ctx = game.ctx;
            const canvas = game.canvas;
            if (ctx && canvas) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
                ctx.fillRect(0, 0, canvas.width, 50);
                ctx.fillStyle = 'white';
                ctx.font = '16px monospace';
                ctx.fillText("CRASH LOG: " + e.message, 20, 30);
                ctx.restore();
            }
        }
        if (this.isRunning) this.animationId = requestAnimationFrame(this.animate);
    }

    updateBackgroundObjects() {
        const game = this.game;
        const range = game.worldSize || 12000;
        const half = range / 2;

        const spacecraft = game.spacecraft;
        if (spacecraft && spacecraft.length > 0) {
            for (let i = 0; i < spacecraft.length; i++) {
                const s = spacecraft[i];
                s.x += s.vx || 0;
                s.y += s.vy || 0;
                if (s.x > half) s.x = -half; else if (s.x < -half) s.x = half;
                if (s.y > half) s.y = -half; else if (s.y < -half) s.y = half;
            }
        }
        
        const shootingStars = game.shootingStars;
        if (shootingStars && shootingStars.length > 0) {
            for (let i = 0; i < shootingStars.length; i++) {
                const s = shootingStars[i];
                s.x += s.vx || 0;
                s.y += s.vy || 0;
                if (s.x > half) s.x = -half; else if (s.x < -half) s.x = half;
                if (s.y > half) s.y = -half; else if (s.y < -half) s.y = half;
            }
        }
    }


    updateBackgroundParallax() {
        const game = this.game;
        if (!game.bgDriftMode && !game.bgWarpMode && !game.warpDisengaging) return;
        if (!game.staticStars || game.staticStars.length === 0) return;

        const w = game.canvas.width;
        const h = game.canvas.height;
        const centerX = w / 2;
        const centerY = h / 2;

        if (game.bgWarpMode || game.warpDisengaging) {
            const linearSlider = game.warpSpeedMultiplier || 1;
            const targetWarp = game.bgWarpMode ? Math.min(25.2, (linearSlider * 3) / 100) : 0;
            const rampSpeed = game.bgWarpMode ? 0.02 : 0.05;
            game.warpSpeed = game.warpSpeed || 0;
            game.warpSpeed += (targetWarp - game.warpSpeed) * rampSpeed;
            game.warpSpeed = Math.max(0, Math.min(game.warpSpeed, 25.2));
            
            if (!game.bgWarpMode && game.warpSpeed < 0.05) {
                game.warpSpeed = 0;
                game.warpDisengaging = false;
            }
        }

        game.warpIntensity = game.warpSpeed || 0;
        const warpIntensity = game.warpIntensity;
        const stars = game.staticStars;
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            
            // NaN and Type Protection
            if (!isFinite(s.x)) s.x = Math.random() * w;
            if (!isFinite(s.y)) s.y = Math.random() * h;
            if (typeof s.vx !== 'number' || isNaN(s.vx)) s.vx = 0;
            if (typeof s.vy !== 'number' || isNaN(s.vy)) s.vy = 0;
            if (typeof s.baseAlpha !== 'number' || isNaN(s.baseAlpha)) s.baseAlpha = s.alpha || 0.5;

            if (typeof s.origX !== 'number') s.origX = s.x;

            if ((game.bgWarpMode || game.warpDisengaging) && !game.bgDriftMode) {
                const dx = s.x - centerX;
                const dy = s.y - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 5) {
                    const angle = Math.random() * Math.PI * 2;
                    s.x = centerX + Math.cos(angle) * 20;
                    s.y = centerY + Math.sin(angle) * 20;
                    continue;
                }

                const jitterAmount = Math.min(0.08, warpIntensity * 0.003);
                const jitterAngle = (Math.random() - 0.5) * jitterAmount;
                const baseDirX = dist > 1 ? dx / dist : 0;
                const baseDirY = dist > 1 ? dy / dist : 0;
                const cosJ = Math.cos(jitterAngle); const sinJ = Math.sin(jitterAngle);
                const dirX = baseDirX * cosJ - baseDirY * sinJ;
                const dirY = baseDirX * sinJ + baseDirY * cosJ;

                const depthFactor = s.depth || 0.5;
                const perspectiveAccel = 1 + (dist / Math.max(w, h)) * 1.2;
                const speed = warpIntensity * perspectiveAccel * 10.5 * depthFactor;
                s.x += dirX * speed; s.y += dirY * speed;

                const maxDist = Math.max(w, h) * 0.9;
                if (dist > maxDist || s.x < -50 || s.x > w + 50 || s.y < -50 || s.y > h + 50) {
                    const angle = Math.random() * Math.PI * 2;
                    const startDist = 3 + Math.random() * Math.random() * 80;
                    s.x = centerX + Math.cos(angle) * startDist;
                    s.y = centerY + Math.sin(angle) * startDist;
                    s.alpha = 0.05; s.depth = 0.3 + Math.random() * 0.7;
                    s.size = (Math.random() * 1.5 + 0.5) * s.depth;
                } else {
                    const fadeRate = 0.6 + depthFactor * 0.4;
                    s.alpha = Math.min(1, 0.15 + (dist / maxDist) * 0.85 * fadeRate);
                }
            } else if (game.bgDriftMode && !game.bgWarpMode) {
                s.x += s.vx * 0.03; s.y += s.vy * 0.03;
                if (s.x < -w * 5) s.x += w * 10; if (s.x > w * 5) s.x -= w * 10;
                if (s.y < -h * 5) s.y += h * 10; if (s.y > h * 5) s.y -= h * 10;
            }
        }
    }


    updateWarpWorldMotion() {
        const game = this.game;
        const camera = game.camera || { x: 0, y: 0, zoom: 1 };
        const zoom = camera.zoom || 1;
        const centerWorldX = -(camera.x || 0) / zoom;
        const centerWorldY = -(camera.y || 0) / zoom;

        if (game.planets) game.planets.forEach(p => this.flyObject(p, centerWorldX, centerWorldY, 0.8, 3000));
        if (game.galaxies) game.galaxies.forEach(g => this.flyObject(g, centerWorldX, centerWorldY, 0.5, 5000));
        if (game.blackHoles) game.blackHoles.forEach(bh => this.flyObject(bh, centerWorldX, centerWorldY, 0.4, 4000));
        if (game.nebulae) game.nebulae.forEach(n => this.flyObject(n, centerWorldX, centerWorldY, 0.6, 4000));
        if (game.spacecraft) game.spacecraft.forEach(s => this.flyObject(s, centerWorldX, centerWorldY, 1.2, 2000));
        if (game.stars) game.stars.forEach(s => this.flyObject(s, centerWorldX, centerWorldY, 0.9, 2500));
    }

    flyObject(obj, screenCenterWorldX, screenCenterWorldY, speedMultiplier = 1, maxSpread = 2000) {
        if (!obj) return;
        const game = this.game;
        const warpIntensity = game.warpSpeed || 0;
        const maxWorldDist = game.worldSize * 2;

        if (game.warpDisengaging) {
            obj.flownOut = false;
            if (!obj.disengageInit) {
                const angle = Math.random() * Math.PI * 2;
                const distance = 200 + Math.random() * maxSpread;
                obj.finalX = screenCenterWorldX + Math.cos(angle) * distance;
                obj.finalY = screenCenterWorldY + Math.sin(angle) * distance;
                obj.depth = 0.3 + Math.random() * 1.4;
                obj.startX = screenCenterWorldX; obj.startY = screenCenterWorldY;
                obj.warpScale = 0.01; obj.warpAlpha = 0;
                obj.disengageInit = true;
            }
            const progress = 1 - Math.min(1, warpIntensity / 25);
            obj.x = obj.startX + (obj.finalX - obj.startX) * progress;
            obj.y = obj.startY + (obj.finalY - obj.startY) * progress;
            const ease = progress * progress * progress;
            obj.warpScale = Math.min(1, Math.max(0.01, 0.01 + ease * 0.99));
            obj.warpAlpha = Math.max(0, (progress - 0.35) / 0.65);
        } else {
            if (obj.flownOut) return;
            const dx = obj.x - screenCenterWorldX;
            const dy = obj.y - screenCenterWorldY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 5) return;
            const dirX = dx / dist; const dirY = dy / dist;
            const zoomFactor = 1 / (game.camera.zoom || 1);
            const perspectiveAccel = 1 + (dist / game.worldSize) * 1.2;
            const depth = obj.depth || 0.5;
            const speed = warpIntensity * perspectiveAccel * 10.5 * depth * speedMultiplier * 4.0 * zoomFactor;
            obj.x += dirX * speed; obj.y += dirY * speed;
            if (dist > maxWorldDist && game.bgWarpMode) {
                obj.flownOut = true;
                obj.wasFlownOut = true;
            }
        }
    }
}

window.GameLoopManager = GameLoopManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.GameLoopManager = GameLoopManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameLoopManager;
}
