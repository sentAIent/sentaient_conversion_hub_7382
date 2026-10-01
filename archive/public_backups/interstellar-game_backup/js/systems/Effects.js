class EffectManager {
    constructor(game) {
        this.game = game;
    }

    updateSupernovaEffect(progress) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        const isBase = effect.type === 'missile_base_destruction';
        const now = performance.now();
        effect.progress = progress; // Ensure progress is tracked for the renderer


        // 1. PHASE MANAGEMENT (REDUX)
        if (isBase) {
            // Missile Base Sequence: Fire -> Explosion -> Reset (Scrapped "Eruption")
            if (progress < 0.10) effect.phase = 'fire';
            else if (progress < 0.60) effect.phase = 'explosion'; // Extended explosion
            else effect.phase = 'reset';
        } else {
            // Nuclear Mine Sequence: Singularity -> Mushroom (Growth) -> Ignition (Flash) -> Quantum Dispersal -> Reset
            if (progress < 0.15) effect.phase = 'singularity';
            else if (progress < 0.40) effect.phase = 'mushroom'; // Growth phase
            else if (progress < 0.60) effect.phase = 'explosion'; // Sudden burst
            else if (progress < 0.92) effect.phase = 'dispersal'; // The cinematic second half
            else effect.phase = 'reset';
        }


        // 2. PHASE-SPECIFIC LOGIC
        switch (effect.phase) {
            case 'fire': // Missile Base Step 1: CATCH ON FIRE
                const fireP = progress / 0.10;
                effect.cameraShake = fireP * 35; // More intense vibration
                effect.lensPulse = 1.0 + Math.sin(now * 0.05) * 0.05;
                effect.meltdownRed = fireP * 0.8; // Red glow during meltdown

                // Generate tactical fires
                if (Math.random() > 0.8 && effect.fires.length < 30) {
                    const ang = Math.random() * Math.PI * 2;
                    effect.fires.push({
                        offsetX: (Math.random() - 0.5) * 60,
                        offsetY: (Math.random() - 0.5) * 60,
                        vx: Math.cos(ang) * 2,
                        vy: Math.sin(ang) * 2,
                        life: 1.0,
                        decay: 0.01 + Math.random() * 0.02
                    });
                }
                break;

            case 'singularity': // Nuclear Mine Step 0: IMPLOSION
                const singP = progress / 0.20;
                effect.cameraShake = singP * 15;
                effect.gravitationalWarp = singP; // Max warp at end of phase
                effect.lensPulse = 1.0 - singP * 0.6; // Shrink before boom

                // Pulse lensing
                effect.lensPulseTarget = 0.4 + Math.sin(now * 0.02) * 0.1;

                // Pull in debris
                if (!effect.hasGeneratedDebris) {
                    effect.hasGeneratedDebris = true;
                    for (let i = 0; i < 40; i++) {
                        const ang = Math.random() * Math.PI * 2;
                        const dist = 300 + Math.random() * 500;
                        effect.debris.push({
                            x: Math.cos(ang) * dist,
                            y: Math.sin(ang) * dist,
                            vx: 0, vy: 0,
                            rotSpd: (Math.random() - 0.5) * 0.2,
                            rotation: Math.random() * Math.PI * 2,
                            life: 1.0, size: 4 + Math.random() * 8
                        });
                    }
                }
                break;

            case 'explosion': // Shared Explosion Phase (Mine or Base)
                // Explosion peak is now the blinding part
                const phaseStart = isBase ? 0.10 : 0.40;
                const phaseLen = isBase ? 0.15 : 0.20;
                const expP = Math.max(0, (progress - phaseStart) / phaseLen);
                if (!effect.hasDetonated) {
                    effect.hasDetonated = true;
                    effect.flashIntensity = isBase ? 3.0 : 8.0; // BLINDING PEAK
                    effect.cameraShake = isBase ? 250 : 600;
                    effect.gravitationalWarp = 0; // Release warp

                    // Trigger shockwave
                    effect.hasShockwave = true;
                    effect.shockwaveStart = progress;

                    // GENERATE MUSHROOM PARTICLES NOW at detonation point
                    if (!effect.hasGeneratedParticles) {
                        effect.hasGeneratedParticles = true;
                        // Performance: Significant reduction to prevent freeze
                        effect.particles = this.game.proceduralManager.generateSupernovaParticles(isBase ? 200 : 400);
                    }

                    if (isBase) {
                        // Shards are now initialized in triggerNuclearEvent for custom geometry
                        // This loop is redundant and was causing clumping issues
                    }
                    else {
                        // Initialize light streaks for mine explosion - Optimization: reduce spear count
                        for (let i = 0; i < 50; i++) {
                            effect.lightSpears.push({
                                angle: Math.random() * Math.PI * 2,
                                len: 2500 + Math.random() * 2000,
                                life: 1.0,
                                v: 100 + Math.random() * 100
                            });
                        }
                    }

                }

                // Blinding peak persistence
                if (!isBase) {
                    // Start decay earlier and faster to prevent "stuck" whiteout
                    if (expP < 0.1) {
                        effect.flashIntensity = Math.min(12.0, effect.flashIntensity + 4.0);
                    } else {
                        effect.flashIntensity = Math.max(0.5, effect.flashIntensity * 0.94); // Faster decay
                    }
                } else {
                    effect.flashIntensity *= 0.65; // Base stays fast but feels massier
                }

                effect.chromaticIntensity = expP * 15.0;
                effect.lensPulse = 0.4 + expP * 8.0;
                break;

            case 'mushroom': // Nuclear Mine Step 2: MUSHROOM CLOUD
                // Trigger early particle generation if we haven't yet (Mushroom before flash)
                if (!isBase && !effect.hasGeneratedParticles) {
                    effect.hasGeneratedParticles = true;
                    effect.particles = this.game.proceduralManager.generateSupernovaParticles(400);
                    effect.cameraShake = 150;
                }

                // Initial growth phase flash intensity
                if (progress < 0.40) {
                    effect.flashIntensity = 0.2 + Math.sin(now * 0.01) * 0.1;
                }
                effect.cameraShake = isBase ? 100 : 180;
                effect.chromaticIntensity = 0.3 + Math.sin(now * 0.01) * 0.5;
                break;

            case 'dispersal': // NEW: Cinematic Second Half
                // Slower flash decay for a lasting afterglow
                effect.flashIntensity = Math.max(0.01, effect.flashIntensity * 0.94);
                effect.cameraShake = 50 + Math.sin(now * 0.005) * 30;
                effect.chromaticIntensity = 5.0 * (1 - (progress - 0.6) / 0.32);

                // Add secondary "quantum cracks" mid-dispersal - Branching Spears
                if (Math.random() > 0.92 && effect.lightSpears.length < 120) {
                    const ang = Math.random() * Math.PI * 2;
                    effect.lightSpears.push({
                        angle: ang,
                        len: 300 + Math.random() * 800,
                        life: 1.0,
                        v: 40 + Math.random() * 40,
                        isBranch: true,
                        parentAngle: ang + (Math.random() - 0.5) * 0.5
                    });
                }
                break;

            case 'eruption': // Missile Base Step 3: MUSHROOM CLOUD
                // Flash intensity should be low here to show particles
                effect.flashIntensity = Math.max(0.1, effect.flashIntensity * 0.90);
                effect.cameraShake = 100;
                effect.chromaticIntensity = 0.3 + Math.sin(now * 0.01) * 0.3;
                break;

            case 'reset': // Final fade out
                const resetOff = 0.90;
                const resetP = (progress - resetOff) / (1.0 - resetOff);
                effect.flashIntensity = Math.max(0, effect.flashIntensity - 0.1); // More aggressive reset
                effect.cameraShake = 0;
                effect.lensPulse = 1.0; // Reset scale to normal
                effect.gravitationalWarp = 0; // Reset warp
                effect.chromaticIntensity = 0; // Reset chromatic aberration
                break;
        }

        // 3. CONTINUOUS UPDATES (Physics for all active elements)
        // Shards
        for (const shard of (effect.shards || [])) {
            // Updated to support 'fire' phase for initial vibration/meltdown
            if (effect.phase === 'fire' || effect.phase === 'explosion' || effect.phase === 'eruption') {
                shard.offsetX += shard.vx;
                shard.offsetY += shard.vy;
                shard.rot += shard.rv;
                shard.alpha *= 0.985;
            }
        }

        // Sludge
        for (let i = effect.sludge.length - 1; i >= 0; i--) {
            const s = effect.sludge[i];
            s.x += s.vx; s.y += s.vy;
            s.life -= s.decay;
            if (s.life <= 0) effect.sludge.splice(i, 1);
        }

        // Fires
        for (let i = effect.fires.length - 1; i >= 0; i--) {
            const f = effect.fires[i];
            f.life -= f.decay;
            if (f.life <= 0) effect.fires.splice(i, 1);
        }

        // 4. CINEMATIC PARTICLE UPDATES (Toroidal Vortex Physics)
        const flashStart = isBase ? 0.50 : 0.20; // Detonation starts at mushroom phase (mine) or explosion phase (base)
        const expProgress = progress > flashStart ? (progress - flashStart) / (1.0 - flashStart) : 0;

        for (const p of effect.particles) {
            // 4a. RADIAL PUSH (Only during ignition peak)
            if (effect.phase === 'explosion' && !p.hasBeenPushed) {
                const dist = Math.hypot(p.x, p.y, p.z);
                const pushMag = (isBase ? 15 : 45) / (1 + dist * 0.01);
                const ang = Math.atan2(p.y, p.x);
                p.vx += Math.cos(ang) * pushMag;
                p.vy += Math.sin(ang) * pushMag;
                p.hasBeenPushed = true;
            }

            // Apply Velocity
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Apply Drag/Friction - Lower drag during dispersal for "swirl"
            const drag = effect.phase === 'dispersal' ? 0.994 : (p.type === 'plasma' ? 0.96 : 0.985);
            p.vx *= drag;
            p.vy *= drag;
            p.vz *= drag;

            // 4b. QUANTUM SWIRL & JITTER (During dispersal phase)
            if (effect.phase === 'dispersal') {
                const swirlForce = 0.035;
                const dist = Math.hypot(p.x, p.y);
                const ang = Math.atan2(p.y, p.x) + Math.PI / 2; // Tangent

                // Centripetal component to keep it tight
                const pullIn = 0.005 * dist;

                p.vx += Math.cos(ang) * swirlForce * (150 / (dist + 10)) - (p.x / dist) * pullIn;
                p.vy += Math.sin(ang) * swirlForce * (150 / (dist + 10)) - (p.y / dist) * pullIn;

                // Quantum Jitter
                if (Math.random() > 0.8) {
                    p.vx += (Math.random() - 0.5) * 1.5;
                    p.vy += (Math.random() - 0.5) * 1.5;
                }
            }

            // 4c. ADVANCED MUSHROOM PHYSICS
            if (p.type === 'torus') {
                p.vy -= 4.0 * p.temp;
                p.rollAngle += p.rollSpeed;
                const rollRadius = p.size * 0.3;
                const rollX = Math.cos(p.torusAngle) * Math.sin(p.rollAngle) * rollRadius;
                const rollY = Math.cos(p.rollAngle) * rollRadius;

                p.x += rollX * 0.4;
                p.y += rollY * 0.4;
                p.vx += Math.cos(p.torusAngle) * 1.2;

                // Add life and temp decay for torus (mushroom cap)
                p.life -= (p.decay || 0.001) * 0.5;
                p.temp = Math.max(0, p.temp - (p.decay || 0.001) * 0.3);
                p.size *= (1 + (p.decay || 0.001) * 0.8);
            } else if (p.type === 'stem') {
                p.vy -= 2.5 * p.temp;
                p.vx += (Math.random() - 0.5) * 2.0;
                p.life -= (p.decay || 0.01) * 0.35;
                p.temp = Math.max(0, p.temp - (p.decay || 0.01) * 0.25);
                p.size *= (1 + (p.decay || 0.01) * 1.8);
            } else if (p.type === 'plasma') {
                // Add life/temp decay for plasma (shockwave)
                p.life -= (p.decay || 0.005) * 0.6;
                p.temp = Math.max(0, p.temp - (p.decay || 0.005) * 0.4);
                p.size *= (1 + (p.decay || 0.005) * 0.5);
            }
        }


        // 5. MISSILE AND DEBRIS UPDATES (Moved outside particle loop for performance and correctness)
        for (const m of effect.chaoticMissiles) {
            m.x += m.vx;
            m.y += m.vy;
            m.vx += Math.cos(m.angle) * 0.5; // Erratic propulsion
            m.vy += Math.sin(m.angle) * 0.5;
            m.angle += m.angularVelocity;
            m.life -= 0.015;

            // Add to trail
            if (Math.random() < 0.5) {
                m.trail.push({ x: m.x, y: m.y, life: 1.0 });
            }
            m.trail = m.trail.filter(t => (t.life -= 0.05) > 0);

            if (m.life < 0 && !m.exploded) {
                m.exploded = true;
                // Add tiny debris bits
                for (let i = 0; i < 3; i++) {
                    const dAngle = Math.random() * Math.PI * 2;
                    const dSpeed = 2 + Math.random() * 3;
                    effect.debris.push({
                        x: m.x, y: m.y,
                        vx: Math.cos(dAngle) * dSpeed,
                        vy: Math.sin(dAngle) * dSpeed,
                        rotation: Math.random() * Math.PI * 2,
                        life: 1.0, size: 2 + Math.random() * 3
                    });
                }
            }
        }

        // 6. DEBRIS PHYSICS
        for (const d of effect.debris) {
            d.x += d.vx; d.y += d.vy;
            d.vx *= 0.98; d.vy *= 0.98;
            d.rotation += (d.rotSpd || 0.1);
            d.life -= 0.01;

            if (effect.phase === 'singularity') {
                const dist = Math.hypot(d.x, d.y);
                if (dist > 10) {
                    d.vx -= (d.x / dist) * 2;
                    d.vy -= (d.y / dist) * 2;
                }
            }
        }

        // 7. LIGHT SPEAR UPDATES
        for (const s of effect.lightSpears) {
            // Growth and Decay
            if (effect.phase === 'explosion') {
                s.len += s.v * 0.5;
            } else if (effect.phase === 'dispersal') {
                s.len += s.v * 0.2;
                s.life -= 0.015;
            } else {
                s.life -= 0.05;
            }
        }

        // Filter dead objects - Fixed: Ensured regular filtering to prevent bloat
        if (Math.random() < 0.15) {
            effect.particles = effect.particles.filter(p => p.life > 0.05);
            effect.chaoticMissiles = effect.chaoticMissiles.filter(m => m.life > 0);
            effect.debris = effect.debris.filter(d => d.life > 0);
            effect.lightSpears = effect.lightSpears.filter(s => s.life > 0);
        }
    }

    renderPlanetImpactEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        if (!effect._renderDebugLogged) {
            console.log('[Refactored] renderPlanetImpactEffect running!');
            console.log('DebrisRocks:', effect.debrisRocks ? effect.debrisRocks.length : 'none');
            console.log('DustParticles:', effect.dustParticles ? effect.dustParticles.length : 'none');
            effect._renderDebugLogged = true;
        }

        const progress = effect.progress || 0;
        const canvas = this.game.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Calculate screen position of impact
        const zoom = Math.max(0.01, this.game.camera.zoom || 1);
        const impactScreenX = centerX + (effect.x - this.game.playerShip.x) * zoom;
        const impactScreenY = centerY + (effect.y - this.game.playerShip.y) * zoom;

        // ============================================
        // 0. NUCLEAR WHITEOUT (0-10%)
        // ============================================
        if (progress < 0.1) {
            const whiteoutAlpha = 1.0 - (progress / 0.1);
            ctx.fillStyle = `rgba(255, 255, 255, ${whiteoutAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // ============================================
        // 1. CONTACT FLASH (Initial impact)
        // ============================================
        if (progress < 0.25) {
            const flashAlpha = 1.0 - (progress / 0.25);
            const flashSize = 500 * zoom * flashAlpha;

            const flashGrad = ctx.createRadialGradient(
                impactScreenX, impactScreenY, 0,
                impactScreenX, impactScreenY, flashSize
            );
            flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
            flashGrad.addColorStop(0.2, `rgba(255, 250, 150, ${flashAlpha * 0.9})`);
            flashGrad.addColorStop(0.5, `rgba(255, 100, 0, ${flashAlpha * 0.6})`);
            flashGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = flashGrad;
            ctx.beginPath();
            ctx.arc(impactScreenX, impactScreenY, flashSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // ============================================
        // 1.5. VOLUMETRIC DUST SHOCKWAVE (The "Cloud")
        // ============================================
        if (progress > 0.05 && progress < 0.8) {
            const shockP = (progress - 0.05) / 0.75;
            const shockRadius = shockP * 400 * zoom;
            const shockAlpha = (1 - shockP) * 0.6;

            // Outer Ring
            ctx.beginPath();
            ctx.arc(impactScreenX, impactScreenY, shockRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(200, 180, 160, ${shockAlpha})`;
            ctx.lineWidth = 40 * zoom * (1 - shockP);
            ctx.stroke();

            // Inner "Cloud" fill
            const cloudGrad = ctx.createRadialGradient(
                impactScreenX, impactScreenY, shockRadius * 0.5,
                impactScreenX, impactScreenY, shockRadius
            );
            cloudGrad.addColorStop(0, `rgba(255, 240, 220, 0)`);
            cloudGrad.addColorStop(0.8, `rgba(200, 180, 160, ${shockAlpha * 0.5})`);
            cloudGrad.addColorStop(1, `rgba(150, 130, 110, 0)`);

            ctx.fillStyle = cloudGrad;
            ctx.beginPath();
            ctx.arc(impactScreenX, impactScreenY, shockRadius, 0, Math.PI * 2);
            ctx.fill();
        }

        // ============================================
        // 2. DUST PLUME & DEBRIS
        // ============================================
        // Render debris shards
        for (const rock of (effect.debrisRocks || [])) {
            // Position is already updated by vx in updatePlanetImpactEffect
            const rx = impactScreenX + (rock.x - effect.x) * zoom;
            const ry = impactScreenY + (rock.y - effect.y) * zoom;

            ctx.save();
            ctx.translate(rx, ry);
            ctx.rotate(rock.rotation + rock.rotationSpeed * progress * 10);

            ctx.fillStyle = '#444';
            ctx.globalAlpha = (rock.life || 1.0) * (1 - progress);

            ctx.beginPath();
            ctx.arc(0, 0, rock.size * zoom, 0, Math.PI * 2);
            ctx.fill();

            // Add slight glowing edge for atmosphere entry look
            if (progress < 0.5) {
                ctx.strokeStyle = `rgba(255, 150, 50, ${1 - progress / 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();
        }

        // Render localized dust plume
        for (const p of (effect.dustParticles || [])) {
            // Position is already updated by vx
            const px = impactScreenX + (p.x - effect.x) * zoom;
            const py = impactScreenY + (p.y - effect.y) * zoom;

            const pAlpha = (p.life || 1.0) * (1 - progress);
            const color = p.color || 'rgba(100, 80, 60, 1)';
            ctx.fillStyle = color.includes('rgba') ? color.replace(/[\d\.]+\)$/, `${pAlpha})`) : color.replace(')', `, ${pAlpha})`);

            ctx.beginPath();
            ctx.arc(px, py, p.size * (1 + progress * 2) * zoom, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();

        // Camera shake - significantly intensified for planet impact
        if (effect.cameraShake > 0) {
            const shakeDecay = 1 - progress;
            const intensity = effect.cameraShake * 1.5; // 50% more intense
            this.game.camera.shakeX = (Math.random() - 0.5) * intensity * shakeDecay;
            this.game.camera.shakeY = (Math.random() - 0.5) * intensity * shakeDecay;
        }

        // End effect
        if (progress >= 1) {
            this.game.hazardEffect = null;
            this.game.camera.shakeX = 0;
            this.game.camera.shakeY = 0;
        }
    }

    updatePlanetImpactEffect(progress) {
        const effect = this.game.hazardEffect;

        // Phase transitions based on progress
        // 0-30%: Impact - dust cloud expands
        // 30-70%: Settling - dust settles, crater forms
        // 70-100%: Respawn - fadeout and respawn

        if (progress < 0.3) {
            effect.phase = 'impact';
            effect.cameraShake = 45 * (1 - progress / 0.3);
        } else {
            effect.cameraShake = 5 * (1 - progress);
        }

        // Update dust particles
        for (const dust of (effect.dustParticles || [])) {
            dust.x += dust.vx;
            dust.y += dust.vy;
            dust.vx *= 0.97;
            dust.vy *= 0.97;
            dust.life -= dust.decay;
        }

        // Update debris rocks
        for (const rock of (effect.debrisRocks || [])) {
            rock.x += rock.vx;
            rock.y += rock.vy;
            rock.vx *= 0.98;
            rock.vy *= 0.98;
            rock.life -= 0.015;
        }
    }



    renderMissileBaseDestructionEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        // DEBUG: Confirm this is running
        if (!effect._renderDebugLogged) {
            console.log('[Refactored] renderMissileBaseDestructionEffect running!');
            console.log('Shards:', effect.shards ? effect.shards.length : 'none');
            console.log('Sludge:', effect.sludge ? effect.sludge.length : 'none');
            effect._renderDebugLogged = true;
        }

        const progress = effect.progress || 0;
        const canvas = this.game.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const t = time * 0.001;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Calculate screen position
        const zoom = Math.max(0.01, this.game.camera.zoom || 1);
        const sx = centerX + (effect.x - this.game.playerShip.x) * zoom;
        const sy = centerY + (effect.y - this.game.playerShip.y) * zoom;

        // 1. CHROMA GLITCH (Technical failure feel)
        if (progress < 0.3) {
            const glitch = Math.sin(t * 50) * 10 * (1 - progress / 0.3);
            ctx.translate(glitch, 0);
        }

        // 1.5. INITIAL WHITEOUT FLASH (New)
        if (progress < 0.15) {
            const whiteAlpha = 1.0 - (progress / 0.15);
            ctx.fillStyle = `rgba(255, 255, 255, ${whiteAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Full screen flash
        }

        // 1.8. RADIOACTIVE SHOCKWAVE (New)
        if (progress > 0.05 && progress < 0.5) {
            const sp = (progress - 0.05) / 0.45;
            const sr = sp * 800 * zoom;
            const sa = (1 - sp) * 0.8;

            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(100, 255, 100, ${sa})`;
            ctx.lineWidth = 20 * zoom * (1 - sp);
            ctx.stroke();
        }

        // 2. PRIMARY EXPLOSION (More jagged/electric than supernova)
        if (progress < 0.6) {
            const ep = progress / 0.6;
            const size = (100 + ep * 400) * zoom;
            const alpha = 1 - ep;

            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, size);
            grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            grad.addColorStop(0.2, `rgba(200, 255, 100, ${alpha * 0.9})`); // Radioactive Yellow
            grad.addColorStop(0.5, `rgba(50, 255, 50, ${alpha * 0.7})`); // Toxic Green
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(sx, sy, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // 2.5 RADIOACTIVE SHOCKWAVE (New)
        if (progress > 0.05 && progress < 0.5) {
            const sp = (progress - 0.05) / 0.45;
            const sr = sp * 800 * zoom;
            const sa = (1 - sp) * 0.8;

            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(100, 255, 100, ${sa})`;
            ctx.lineWidth = 20 * zoom * (1 - sp);
            ctx.stroke();
        }

        // 3. MECHANICAL SHARDS (The actual base breaking apart)
        for (const shard of (effect.shards || [])) {
            const rx = sx + shard.offsetX * zoom;
            const ry = sy + shard.offsetY * zoom;

            ctx.save();
            ctx.translate(rx, ry);

            // Fast rotation for violent destruction
            ctx.rotate(shard.rot + shard.rv * progress * 20);

            // Flickering glitch effect on shards
            const flicker = Math.random() > 0.1 ? 1 : 0.5;
            ctx.globalAlpha = shard.alpha * (1 - progress) * flicker;

            ctx.fillStyle = shard.color || '#444';
            ctx.beginPath();
            if (shard.vertices) {
                ctx.moveTo(shard.vertices[0].x * zoom, shard.vertices[0].y * zoom);
                for (let j = 1; j < shard.vertices.length; j++) {
                    ctx.lineTo(shard.vertices[j].x * zoom, shard.vertices[j].y * zoom);
                }
            } else {
                ctx.rect(-5 * zoom, -5 * zoom, 10 * zoom, 10 * zoom);
            }
            ctx.closePath();
            ctx.fill();

            // Glowing hot edges
            ctx.strokeStyle = `rgba(100, 255, 100, ${1 - progress})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        }


        // 4. CHEMICAL SLUDGE (Green spewing fluid)
        for (const s of (effect.sludge || [])) {
            const px = sx + (s.x - effect.x) * zoom;
            const py = sy + (s.y - effect.y) * zoom;

            ctx.fillStyle = `rgba(50, 255, 0, ${s.life * 0.5})`;
            ctx.beginPath();
            ctx.arc(px, py, s.size * zoom, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();

        // Screen shake
        if (progress < 0.5) {
            this.game.camera.shakeX = (Math.random() - 0.5) * 30 * (1 - progress / 0.5);
            this.game.camera.shakeY = (Math.random() - 0.5) * 30 * (1 - progress / 0.5);
        }
    }

    updateMissileBaseDestructionEffect(progress) {
        this.updateSupernovaEffect(progress);
    }

    triggerNuclearEvent(x, y, type) {

        const isBase = type === 'missile_base_destruction';
        const isMine = type === 'supernova'; // Nuclear Mine type
        const duration = isBase ? 2500 : (isMine ? 5000 : 8000);
        const now = performance.now();

        // Death Mechanics: Zero health and trigger respawn
        this.game.handlePlayerDeath();

        this.game.hazardEffect = {
            type: type,
            startTime: now,
            deathTimestamp: now + duration + 1000,
            duration: duration,
            x: x,
            y: y,
            phase: isBase ? 'fire' : (isMine ? 'singularity' : 'flash'),
            progress: 0,

            // Shared Nuclear State
            particles: [],
            debris: [], // Fixed: Initialize to prevent crash
            debrisRocks: [],
            chaoticMissiles: [],
            lightSpears: [],
            explosions: [],
            hasGeneratedParticles: false,
            flashIntensity: 0,
            cameraShake: 0,
            chromaticIntensity: 0, // Triple-A RGB Split
            flareElements: [], // Multi-element lens flare

            // Quantum Mine Properties (SOTA)
            implosionProgress: 0,
            fusionBounce: 0,
            quantumSpikes: [],
            gravitationalWarp: 0,
            lensPulse: 1.0,
            lensPulseTarget: 1.0,

            // Base Specific (Cinematic Destruction Redux)
            fires: [], // Tactical fires breaking out
            sludge: [], // Green spewing sludge
            shards: [], // Final fragmentation
            meltdownRed: 0, // 0 to 1 red pulse
            baseSize: 70
        };

        console.log('[Hazard] Nuclear event triggered:', type);

        // Initialize Glow Sprites if needed
        this.game.initGlowSprites();


        // Initialize State for Base Destruction
        if (isBase) {
            const effectObj = this.game.hazardEffect;
            // Optimization: Reduce shard count for missile bases to 10
            const shardCount = 10;
            for (let i = 0; i < shardCount; i++) {
                const vertices = [];
                const vCount = 3 + Math.floor(Math.random() * 4);
                const avgSize = 10 + Math.random() * 25;
                for (let v = 0; v < vCount; v++) {
                    const ang = (v / vCount) * Math.PI * 2;
                    const r = avgSize * (0.6 + Math.random() * 0.8);
                    vertices.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
                }

                effectObj.shards.push({
                    offsetX: (Math.random() - 0.5) * 40,
                    offsetY: (Math.random() - 0.5) * 40,
                    vertices: vertices,
                    rot: Math.random() * Math.PI * 2,
                    rv: (Math.random() - 0.5) * 0.1,
                    vx: (Math.random() - 0.5) * 20, // INCREASED SPEED
                    vy: (Math.random() - 0.5) * 20, // INCREASED SPEED
                    alpha: 1.0,
                    color: i % 2 === 0 ? '#444' : '#666' // LIGHTER for visibility
                });
            }

            // Init Sludge (Green chemical fire)
            for (let i = 0; i < 20; i++) {
                effectObj.sludge.push({
                    x: x + (Math.random() - 0.5) * 50,
                    y: y + (Math.random() - 0.5) * 50,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    size: 5 + Math.random() * 15,
                    life: 1.0,
                    decay: 0.01 + Math.random() * 0.02
                });
            }
        }

        // Initialize Lens Flare Elements
        for (let i = 0; i < 6; i++) {
            this.game.hazardEffect.flareElements.push({
                dist: 0.2 + i * 0.4,
                size: 10 + i * 40,
                color: `hsla(${200 + i * 30}, 80%, 80%, 0.3)`,
                type: i % 2 === 0 ? 'circle' : 'hex'
            });
        }

        // Stop ship movement
        this.game.playerShip.vx = 0;
        this.game.playerShip.vy = 0;

    }


    renderEMPEffect(ctx, time) {
        if (!this.game.hazardEffect || this.game.hazardEffect.type !== 'emp') return;
        const h = this.game.hazardEffect;
        let progress = (Date.now() - h.startTime) / h.duration;
        if (progress > 1) progress = 1;

        ctx.save();
        ctx.translate(this.game.playerShip.x, this.game.playerShip.y);

        // Core EMP blast
        const lvl = this.game.playerSkills.emp;
        const maxRadius = 500 + (lvl * 250);
        const currentRadius = maxRadius * Math.pow(progress, 0.5); // Pop fast, slow down

        const alpha = 1 - Math.pow(progress, 2);
        
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(0, 0, currentRadius * 0.8, 0, 0, currentRadius);
        grad.addColorStop(0, `rgba(0, 243, 255, 0)`);
        grad.addColorStop(0.8, `rgba(0, 243, 255, ${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.lineWidth = 4 * alpha;
        ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
        ctx.stroke();
        
        // Glitch lines inside
        for(let i=0; i<10; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * currentRadius * 0.8, 0);
            ctx.lineTo((Math.random() * currentRadius) + 20, 0);
            ctx.rotate(Math.random() * Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.lineWidth = Math.random() * 3 + 1;
            ctx.stroke();
        }

        ctx.restore();
    }



    renderQuantumEffect(ctx, time) {
        if (!this.game.hazardEffect || this.game.hazardEffect.type !== 'quantum') return;
        const h = this.game.hazardEffect;
        let progress = (Date.now() - h.startTime) / h.duration;
        if (progress > 1) return;

        ctx.save();
        ctx.translate(this.game.playerShip.x, this.game.playerShip.y);

        // Implosion / Explosion warp effect
        const alpha = 1 - progress;
        
        // Draw expanding geometric tunnels
        const maxRadius = 400;
        const currentRadius = maxRadius * (1 - Math.pow(1 - progress, 3)); 

        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, currentRadius + (i * 20), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 0, 255, ${(alpha * 0.5) / (i + 1)})`;
            ctx.lineWidth = 10;
            ctx.stroke();
        }

        // Draw blinding core flash
        ctx.beginPath();
        ctx.arc(0, 0, 150 * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        ctx.restore();
    }



    renderPlayerDeathEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        const canvas = this.game.canvas;
        const progress = effect.progress || 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // 1. Screen Shake (Internal ship rumbling)
        if (effect.cameraShake > 0) {
            this.game.camera.shakeX = (Math.random() - 0.5) * effect.cameraShake;
            this.game.camera.shakeY = (Math.random() - 0.5) * effect.cameraShake;
        }

        // 2. Hull Venting / Fire Sparks
        if (effect.phase === 'venting' || effect.phase === 'critical') {
            effect.ventingPoints.forEach(p => {
                const now = performance.now();
                const pElapsed = now - (effect.startTime + p.startTime);
                if (pElapsed < 0) return;

                const pProgress = pElapsed / p.duration;
                if (pProgress >= 1) return;

                const vx = centerX + p.offsetX;
                const vy = centerY + p.offsetY;
                const alpha = (p.alpha !== undefined) ? p.alpha : (1 - pProgress);

                // Glowing plasma/fire venting from hull
                const grad = ctx.createRadialGradient(vx, vy, 0, vx, vy, p.size);
                grad.addColorStop(0, `rgba(255, 200, 50, ${alpha})`);
                grad.addColorStop(0.5, `rgba(255, 100, 0, ${alpha * 0.5})`);
                grad.addColorStop(1, 'transparent');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(vx, vy, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // 3. Hull Cracks (Energy bleeding through)
        if (effect.phase === 'critical' || effect.phase === 'explosion') {
            ctx.strokeStyle = '#ff6600';
            ctx.lineWidth = 2;
            effect.hullCracks.forEach(c => {
                const x1 = centerX + c.x;
                const y1 = centerY + c.y;
                const x2 = x1 + Math.cos(c.angle) * c.length;
                const y2 = y1 + Math.sin(c.angle) * c.length;

                ctx.globalAlpha = c.life;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            });
            ctx.globalAlpha = 1.0;
        }

        // 4. Final Supernova-style Eruption
        if (effect.phase === 'explosion') {
            const expProgress = (progress - 0.5) / 0.2;
            const expSize = expProgress * canvas.width * 1.5;

            const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, expSize);
            grad.addColorStop(0, '#fff');
            grad.addColorStop(0.2, '#ff0');
            grad.addColorStop(0.5, '#f60');
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, expSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // 5. Full-screen Whiteout / Red Flash
        if (effect.flashIntensity > 0) {
            const color = effect.phase === 'critical' ? '255, 0, 0' : '255, 255, 255';
            ctx.fillStyle = `rgba(${color}, ${effect.flashIntensity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }


        ctx.restore();
    }

    updatePlayerDeathEffect(progress) {
        const effect = this.game.hazardEffect;
        const now = performance.now();

        // Phase transitions
        if (progress < 0.2) {
            effect.phase = 'venting';
            effect.cameraShake = 10 + Math.sin(now * 0.02) * 5;
        } else if (progress < 0.5) {
            effect.phase = 'critical';
            effect.cameraShake = 20 + Math.sin(now * 0.03) * 10;
            effect.flashIntensity = Math.sin((progress - 0.2) / 0.3 * Math.PI) * 0.5; // Pulsing red
        } else if (progress < 0.7) {
            effect.phase = 'explosion';
            effect.cameraShake = 100 * (1 - (progress - 0.5) / 0.2);
            effect.flashIntensity = 1.0; // Brief white flash
        } else if (progress < 0.9) {
            effect.phase = 'whiteout';
            effect.flashIntensity = 1.0 - (progress - 0.7) / 0.2; // Fade out white
            effect.cameraShake = 0;
        } else {
            effect.phase = 'reset';
            effect.flashIntensity = 0;
        }

        // Update venting points
        effect.ventingPoints = effect.ventingPoints.filter(p => {
            const pElapsed = now - (effect.startTime + p.startTime);
            if (pElapsed < 0) return true; // Not started yet

            const pProgress = pElapsed / p.duration;
            if (pProgress >= 1) return false; // Expired

            // Simulate gas/smoke venting
            p.size *= 1.05;
            p.alpha = 1 - pProgress;
            return true;
        });

        // Generate hull cracks during critical phase
        if (effect.phase === 'critical' && Math.random() < 0.1 && effect.hullCracks.length < 10) {
            effect.hullCracks.push({
                x: (Math.random() - 0.5) * 60,
                y: (Math.random() - 0.5) * 60,
                length: 10 + Math.random() * 30,
                angle: Math.random() * Math.PI * 2,
                life: 1.0
            });
        }
        effect.hullCracks = effect.hullCracks.filter(c => (c.life -= 0.01) > 0);

        // Respawn logic (after whiteout)
        if (effect.phase === 'reset' && !effect.hasRespawned) {
            this.game.playerShip.shield = this.game.playerShip.maxShield;
            this.game.playerShip.hullHealth = this.game.playerShip.maxHull;

            // Reset ship pitch/roll to prevent oval glitch
            this.game.shipPitch = 0;
            this.game.shipRoll = 0;

            // Teleport to a safe location (away from hazards)
            const teleportDist = 2000 + Math.random() * 3000;
            const teleportAngle = Math.random() * Math.PI * 2;
            this.game.playerShip.x += Math.cos(teleportAngle) * teleportDist;
            this.game.playerShip.y += Math.sin(teleportAngle) * teleportDist;
            this.game.playerShip.vx = 0;
            this.game.playerShip.vy = 0;

            this.game.hudManager.showToast('🚀 Respawned! Shields restored.');
            effect.hasRespawned = true;

            // BOSS PERSISTENCE: If in a boss mission, ensure boss is near the new location
            if (this.game.activeMission && this.game.activeMission.type === 'boss') {
                if (this.game.activeBoss) {
                    console.log('[Boss Debug] Teleporting existing mission boss near player');
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 1200;
                    this.game.activeBoss.x = this.game.playerShip.x + Math.cos(angle) * dist;
                    this.game.activeBoss.y = this.game.playerShip.y + Math.sin(angle) * dist;
                    // Reset boss health slightly (e.g. 20% heal) to prevent easy cheese? 
                    // No, let's keep it as is for now for difficulty.
                } else {
                    console.log('[Boss Debug] Respawning mission boss after player death');
                    setTimeout(() => this.game.combatManager.spawnBoss(this.game.activeMission.bossType), 2000);
                }
            }

            // REFILL FLARES ON RESPAWN
            if (this.game.playerShip && this.game.playerShip.maxFlares > 0) {
                this.game.playerShip.flares = this.game.playerShip.maxFlares;
            }
        }
    }

    renderMissileHitEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        const now = performance.now();
        const elapsed = now - effect.startTime;
        const progress = Math.min(1, elapsed / effect.duration);
        const canvas = this.game.canvas;
        const zoom = this.game.camera.zoom;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const screenX = centerX + (effect.x - this.game.playerShip.x) * zoom;
        const screenY = centerY + (effect.y - this.game.playerShip.y) * zoom;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // A. Full-screen Red Flash
        const flashIntensity = (1 - progress) * effect.flashIntensity * 0.6;
        ctx.fillStyle = `rgba(255, 0, 0, ${Math.min(1, flashIntensity)})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // B. Localized Impact Flare (Zoom-aware)
        if (progress < 0.6) {
            const flareSize = Math.max(0.1, (100 * (1 - progress)) * zoom);
            const grad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, flareSize);
            grad.addColorStop(0, `rgba(255, 255, 255, ${1 - progress})`);
            grad.addColorStop(0.3, `rgba(255, 100, 0, ${0.5 * (1 - progress)})`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(screenX, screenY, flareSize, 0, Math.PI * 2); ctx.fill();
        }

        // C. Screen Shake
        if (progress < 0.5) {
            const shakeIntensity = (1 - progress * 2) * 10;
            this.game.camera.shakeX = (Math.random() - 0.5) * shakeIntensity;
            this.game.camera.shakeY = (Math.random() - 0.5) * shakeIntensity;
        } else {
            this.game.camera.shakeX = 0;
            this.game.camera.shakeY = 0;
        }

        // Warning text flash
        if (progress < 0.3) {
            ctx.font = 'bold 24px monospace';
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - progress * 3})`;
            ctx.textAlign = 'center';
            ctx.fillText('⚠ MISSILE IMPACT ⚠', canvas.width / 2, canvas.height / 2);
        }

        ctx.restore();

        // End effect
        if (progress >= 1) {
            this.game.hazardEffect = null;
            this.game.camera.shakeX = 0;
            this.game.camera.shakeY = 0;
        }
    }


    renderDamageEffects(ctx) {
        if (this.game.damageParticles.length === 0) return;

        this.game.damageParticles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);

            const alpha = p.life / p.maxLife;
            ctx.globalAlpha = alpha * 0.6;
            ctx.fillStyle = p.color;

            ctx.beginPath();
            ctx.arc(0, 0, p.size / this.game.camera.zoom, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });
    }

}
window.EffectManager = EffectManager;
