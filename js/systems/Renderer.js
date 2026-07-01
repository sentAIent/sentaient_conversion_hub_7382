/**
 * Global Safety Patch for Canvas Gradients
 * Prevents "SyntaxError: Index 0: addColorStop: The color provided ('undefinedNaN') could not be parsed as a color."
 */
if (typeof CanvasGradient !== 'undefined' && !CanvasGradient.prototype.safeAddColorStop) {
    CanvasGradient.prototype.safeAddColorStop = function(offset, color) {
        // Ensure offset is a finite number between 0 and 1
        const safeOffset = isFinite(offset) ? Math.max(0, Math.min(1, offset)) : 0;
        
        // Ensure color is a valid string and doesn't contain 'undefined' or 'NaN'
        let safeColor = String(color);
        if (safeColor.includes('undefined') || safeColor.includes('NaN')) {
            console.warn(`[Canvas-Safety] Invalid color blocked: "${safeColor}" at ${safeOffset}. Fallback to transparent.`);
            safeColor = 'transparent';
        }
        
        try {
            this.addColorStop(safeOffset, safeColor);
        } catch (e) {
            console.error(`[Canvas-Safety] Original addColorStop failed:`, e);
        }
    };
}

/**
 * Safety Patch for fillStyle and strokeStyle
 * Intercepts 'rgba(..., NaN)' or 'undefined' assignments
 */
if (typeof CanvasRenderingContext2D !== 'undefined') {
    const patchProperty = (proto, prop) => {
        const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
        if (!descriptor) return;
        const originalSet = descriptor.set;
        Object.defineProperty(proto, prop, {
            set: function(val) {
                if (typeof val === 'string' && (val.includes('NaN') || val.includes('undefined'))) {
                    originalSet.call(this, 'transparent');
                } else {
                    originalSet.call(this, val);
                }
            },
            get: descriptor.get,
            configurable: true
        });
    };
    patchProperty(CanvasRenderingContext2D.prototype, 'fillStyle');
    patchProperty(CanvasRenderingContext2D.prototype, 'strokeStyle');
}

class RenderManager {
    constructor(game) {
        this.game = game;
        this.gradientCache = new Map();
        this.frameId = 0;
        this.flashAlpha = 0;
        this.redAlertIntensity = 0; // Phase 7: Cinematic Boss Intensity (0..1)
        this.ghostTrail = []; // Cinematic: Chrono-Shift Ghost Silhouettes
        this._lastCacheClear = Date.now();
    }

    /**
     * Internal helper to retrieve or create a cached gradient.
     * Quantizes numeric parameters to 1 decimal place to improve cache hit rate.
     */
    getGradient(ctx, type, ...params) {
        const stops = params.pop(); // Last arg is always color stops array [{offset, color}]
        const key = `${type}:${params.map(p => typeof p === 'number' ? p.toFixed(1) : p).join(',')}:${stops.map(s => s.offset.toFixed(2) + s.color).join('|')}`;
        
        if (this.gradientCache.has(key)) return this.gradientCache.get(key);

        let grad;
        if (type === 'radial') {
            const [x0, y0, r0, x1, y1, r1] = params;
            grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        } else {
            const [x0, y0, x1, y1] = params;
            grad = ctx.createLinearGradient(x0, y0, x1, y1);
        }

        stops.forEach(s => this.safeAddColorStop(grad, s.offset, s.color));

        // Periodic cache eviction to prevent memory growth
        if (this.gradientCache.size > 500 || Date.now() - this._lastCacheClear > 30000) {
            this.gradientCache.clear();
            this._lastCacheClear = Date.now();
        }
        
        this.gradientCache.set(key, grad);
        return grad;
    }


    /**
     * Safely adds a color stop to a gradient, validating inputs to prevent
     * SyntaxErrors from malformed strings like 'undefinedNaN'.
     */
    safeAddColorStop(grad, offset, color) {
        if (!grad || typeof grad.addColorStop !== 'function') return;
        
        // Ensure offset is a finite number between 0 and 1
        const safeOffset = isFinite(offset) ? Math.max(0, Math.min(1, offset)) : 0;
        
        // Ensure color is a valid string and doesn't contain 'undefined' or 'NaN'
        let safeColor = String(color);
        if (safeColor.includes('undefined') || safeColor.includes('NaN')) {
            console.warn(`[Renderer] Invalid color detected: "${safeColor}". Fallback to transparent.`);
            safeColor = 'transparent';
        }
        
        try {
            grad.addColorStop(safeOffset, safeColor);
        } catch (e) {
            console.error(`[Renderer] addColorStop failed for "${safeColor}" at ${safeOffset}:`, e);
        }
    }

    lerpColor(a, b, amount) {
        const ah = parseInt(a.replace(/#/g, ''), 16),
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            bh = parseInt(b.replace(/#/g, ''), 16),
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);

        return '#' + ((1 << 24) + (Math.round(rr) << 16) + (Math.round(rg) << 8) + Math.round(rb)).toString(16).slice(1);
    }


    renderHazards(ctx, time) {
        const ship = this.game.playerShip;
        if (!ship) return; // FIX: Prevent boot crash if ship is not yet defined
        
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const rotCenterX = center.x;
        const rotCenterY = center.y;

        // Render space mines - OMINOUS ADVANCED TECHNOLOGY DESIGN
        const viewDist = 5000; // Cull beyond this distance
        
        this.game.spaceMines.forEach(mine => {
            if (mine.flownOut) return;

            // 1. DISTANCE CULLING
            const dx_cull = mine.x - ship.x;
            const dy_cull = mine.y - ship.y;
            const dist_cull = dx_cull * dx_cull + dy_cull * dy_cull;
            if (dist_cull > viewDist * viewDist) return;

            const sz = mine.z || 0;
            const rotated = this.game.physicsManager.rotate3D(mine.x, mine.y, sz, rotCenterX, rotCenterY);
            if (rotated.scale < 0.1) return; // Perspective culling

            // Hit Flash Logic
            if (mine.hitFlash > 0) {
                mine.hitFlash--;
                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
                const size = (mine.size || mine.radius || 30) * rotated.scale / safeZoom;

                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            ctx.save();
            ctx.translate(rx, ry);

            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const pulse = Math.sin(time * 0.003 + (mine.pulsePhase || mine.pulseOffset || 0)) * 0.15 + 0.85;
            const size = (mine.size || mine.radius || 30) * pulse * rScale / safeZoom;

            // LOD: Level of Detail Culling
            // If the object is too small, just draw a glowing core
            if (size < 5) {
                ctx.fillStyle = '#ff3300';
                ctx.beginPath();
                ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            // OUTER ELECTROMAGNETIC FIELD (pulsing energy barrier)
            const emPulse = (Math.sin(time * 0.006) + 1) * 0.5;
            for (let ring = 0; ring < 3; ring++) {
                const ringRadius = size * (1.2 + ring * 0.2);
                const ringAlpha = (0.3 - ring * 0.08) * emPulse;
                const ringPhase = time * 0.002 + ring * Math.PI / 3;

                const safeRingAlpha = isFinite(ringAlpha) ? ringAlpha : 0;
                ctx.strokeStyle = `rgba(255, 50, 20, ${safeRingAlpha})`;
                ctx.lineWidth = (4 - ring) / safeZoom;
                ctx.setLineDash([(10 + ring * 5), (5 + ring * 3)]);
                ctx.lineDashOffset = -time * 0.1 * (ring + 1);
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, ringPhase, ringPhase + Math.PI * 1.8);
                ctx.stroke();
            }
            ctx.setLineDash([]);

            // DANGER AURA
            const safeTime = isFinite(time) ? time : performance.now();
            const dangerPulse = Math.sin(safeTime * 0.008) * 0.4 + 0.6;
            const auraGrad = this.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size * 1.5, [
                { offset: 0, color: `rgba(255, 60, 0, ${isFinite(dangerPulse) ? 0.9 * dangerPulse : 0.5})` },
                { offset: 0.2, color: `rgba(200, 30, 0, ${isFinite(dangerPulse) ? 0.6 * dangerPulse : 0.3})` },
                { offset: 0.7, color: `rgba(80, 0, 20, ${isFinite(dangerPulse) ? 0.15 * dangerPulse : 0.1})` },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = auraGrad;

            ctx.beginPath();
            ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
            ctx.fill();

            // ADVANCED TECH OUTER SHELL
            if (size > 15) { // LOD: Skip complex shell if small
                ctx.save();
                ctx.rotate(time * 0.0008 + (mine.rotation || 0));
                ctx.fillStyle = '#1a0a0a';
                ctx.strokeStyle = '#660000';
                ctx.lineWidth = 3 / safeZoom;
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                    ctx.lineTo(Math.cos(angle) * size * 1.8, Math.sin(angle) * size * 1.8);
                }
                ctx.closePath();
                ctx.fill(); ctx.stroke();
                ctx.restore();
            }

            // REACTOR CORE
            const coreGrad = this.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size * 0.8, [
                { offset: 0, color: '#ffffff' },
                { offset: 0.5, color: '#ff6600' },
                { offset: 1, color: '#440000' }
            ]);
            ctx.fillStyle = coreGrad;

            ctx.beginPath();
            ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });

        // Ensure secondary hazards are rendered
        this.renderNebulaHazards(ctx, time);
    }

    renderLegacyEntities(ctx, time, rotCenterX, rotCenterY, ship, viewDist) {
        // === RENDER AUTOMATED DRONES (Phase 16) ===
        if (this.game.droneManager && this.game.droneManager.drones) {
            this.renderDrones(ctx, time);
        }

        // === RENDER ALL SPACE BASES (Phase 16) ===
        if (this.game.spaceBases) {
            this.renderSpaceBases(ctx, time, rotCenterX, rotCenterY, ship, viewDist);
        }

        // === RENDER MEGA-STRUCTURES (Phase 17) ===
        this.renderMegaStructures(ctx, time);

        // Render hazard black holes - DYNAMIC CENTER WITH FOLDING LIGHT
        this.game.hazardBlackHoles.forEach(bh => {
            if (bh.flownOut) return;

            // 1. DISTANCE CULLING & LOD
            const dx_cull = bh.x - ship.x;
            const dy_cull = bh.y - ship.y;
            const distSq = dx_cull * dx_cull + dy_cull * dy_cull;
            const renderDist = viewDist * 1.8;
            if (distSq > renderDist * renderDist) return;

            const sz = bh.z || 0;
            const rotated = this.game.physicsManager.rotate3D(bh.x, bh.y, sz, rotCenterX, rotCenterY);
            if (rotated.scale < 0.05) return;

            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const radiusOrSize = bh.radius || bh.size || 100;
            const size = radiusOrSize * rScale / safeZoom;

            ctx.save();
            ctx.translate(rx, ry);

            // LOD: Simple black sphere if very distant or small
            if (size < 12) {
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            // 2. PREMIUM CINEMATIC BLACK HOLE
            const isBoss = this.game.bossManager && this.game.bossManager.activeBoss && 
                           this.game.bossManager.activeBoss.x === bh.x && this.game.bossManager.activeBoss.y === bh.y;

            if (isBoss) {
                this.drawSingularityGuardian(ctx, bh, time, rScale, safeZoom);
            } else {
                // 1. GRAVITATIONAL LENSING (Photon Sphere)
                // Creates the distorted light ring effect
                ctx.globalCompositeOperation = 'screen';
                const pulse = Math.sin(time * 0.002) * 0.05 + 1;
                const photonGlow = this.getGradient(ctx, 'radial', 0, 0, size * 0.38, 0, 0, size * 0.65, [
                    { offset: 0, color: 'rgba(255, 255, 255, 0.8)' },
                    { offset: 0.1, color: 'rgba(200, 150, 255, 0.6)' },
                    { offset: 0.4, color: 'rgba(100, 0, 255, 0.3)' },
                    { offset: 1, color: 'transparent' }
                ]);
                ctx.fillStyle = photonGlow;
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.65 * pulse, 0, Math.PI * 2);
                ctx.fill();

                // 2. THE SINGULARITY (Void Core)
                ctx.globalCompositeOperation = 'source-over';
                
                // GRAVITATIONAL LENSING DISTORTION (Cinematic Proxy)
                // We draw a distorted version of the background or just a very high-quality light refraction ring
                const lensingPulse = Math.sin(time * 0.001) * 0.02 + 1;
                const lensingGrad = this.getGradient(ctx, 'radial', 0, 0, size * 0.35, 0, 0, size * 0.55, [
                    { offset: 0, color: 'rgba(0,0,0,1)' },
                    { offset: 0.1, color: 'rgba(20,0,40,0.8)' },
                    { offset: 0.5, color: 'rgba(255,255,255,0.4)' }, // The "Einstein Ring" highlight
                    { offset: 0.8, color: 'rgba(100,0,255,0.1)' },
                    { offset: 1, color: 'transparent' }
                ]);
                ctx.fillStyle = lensingGrad;
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.55 * lensingPulse, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#000';
                ctx.shadowBlur = 40 * rScale;
                ctx.shadowColor = '#4a0080';
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.36, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // 3. VOLUMETRIC ACCRETION DISK
                if (size > 30) {
                    ctx.save();
                    ctx.globalCompositeOperation = 'screen';
                    ctx.rotate(bh.diskRotation || 0);
                    ctx.scale(1.0, 0.22); // High-perspective tilt

                    // Disk Core Heat
                    const diskGrad = this.getGradient(ctx, 'radial', 0, 0, size * 0.4, 0, 0, size * 2.2, [
                        { offset: 0, color: 'rgba(200, 100, 255, 0.4)' },
                        { offset: 0.3, color: 'rgba(100, 0, 255, 0.2)' },
                        { offset: 0.7, color: 'rgba(50, 0, 100, 0.1)' },
                        { offset: 1, color: 'transparent' }
                    ]);
                    ctx.fillStyle = diskGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 2.2, 0, Math.PI * 2);
                    ctx.fill();

                    // Active Streamers (High Fidelity Particles)
                    if (size > 40) {
                        ctx.save();
                        // Add a secondary rotation layer for complexity
                        ctx.rotate(-time * 0.0002);
                        bh.particleRings.forEach((p, idx) => {
                            const accel = 1 + (1 - p.radius) * 3.5;
                            p.angle += p.speed * accel;
                            const r = size * p.radius * 1.8;
                            const px = Math.cos(p.angle) * r;
                            const py = Math.sin(p.angle) * r;
                            
                            const pColor = `hsla(${p.hue}, 100%, 85%, ${p.brightness * 1.0})`;
                            ctx.fillStyle = pColor;
                            
                            // Draw as elongated streaks
                            const streakLen = 4 * p.speed * 1000 * rScale;
                            ctx.save();
                            ctx.translate(px, py);
                            ctx.rotate(p.angle + Math.PI/2);
                            ctx.fillRect(-1/safeZoom, -streakLen/2, 2/safeZoom, streakLen);
                            ctx.restore();
                            
                            // Subtle glow per particle
                            if (p.brightness > 0.8) {
                                ctx.shadowBlur = 8;
                                ctx.shadowColor = pColor;
                                ctx.beginPath();
                                ctx.arc(px, py, 1/safeZoom, 0, Math.PI*2);
                                ctx.fill();
                            }
                        });
                        ctx.restore();
                    }
                    ctx.restore();
                }
            }
            ctx.restore();
        });

        // === PHASE: ADVANCED HAZARD SYSTEMS (Missile Bases, Missiles, Flares) ===

        // === RENDER MISSILE BASES ===
        this.game.missileBases.forEach(base => {
            if (base.flownOut) return;
            const dx = base.x - ship.x;
            const dy = base.y - ship.y;
            if (dx*dx+dy*dy > viewDist * viewDist) return;

            const sz = base.z || 0;
            const rotated = this.game.physicsManager.rotate3D(base.x, base.y, sz, rotCenterX, rotCenterY);
            if (rotated.scale < 0.1) return;

            this.drawMissileBase(ctx, base, time, false, 0, rotated.x, rotated.y, rotated.scale);
        });

        // === RENDER HEAT-SEEKING MISSILES ===
        this.game.enemyMissiles.forEach(missile => {
            if (missile.flownOut) return;

            const sz = missile.z || 0;
            const rotated = this.game.physicsManager.rotate3D(missile.x, missile.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            ctx.save();

            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

            // Render trail first (behind missile)
            if (missile.trail) {
                missile.trail.forEach(p => {
                    const trailSZ = p.z || 0;
                    const trailRot = this.game.physicsManager.rotate3D(p.x, p.y, trailSZ, rotCenterX, rotCenterY);
                    const trailAlpha = (p.life / 20) * 0.8;
                    const trailSize = p.size * trailRot.scale / safeZoom;
                    
                    if (!Number.isFinite(trailRot.x) || !Number.isFinite(trailRot.y) || !Number.isFinite(trailSize) || trailSize <= 0) return;

                    const trailGrad = this.getGradient(ctx, 'radial', trailRot.x, trailRot.y, 0, trailRot.x, trailRot.y, trailSize, [
                        { offset: 0, color: `rgba(255, 150, 50, ${trailAlpha})` },
                        { offset: 0.5, color: `rgba(255, 80, 0, ${trailAlpha * 0.5})` },
                        { offset: 1, color: 'transparent' }
                    ]);
                    ctx.fillStyle = trailGrad;

                    ctx.beginPath();
                    ctx.arc(trailRot.x, trailRot.y, trailSize, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            ctx.translate(rx, ry);
            ctx.rotate(missile.angle);

            const size = (missile.size || 5) * rScale / safeZoom;
            const lifeRatio = missile.life / missile.maxLife;

            // Missile body
            ctx.fillStyle = '#888899';
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(-size, -size * 0.4);
            ctx.lineTo(-size * 0.5, 0);
            ctx.lineTo(-size, size * 0.4);
            ctx.closePath();
            ctx.fill();

            // Red tip (heat-seeking sensor)
            ctx.fillStyle = '#ff3333';
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(size, -size * 0.25);
            ctx.lineTo(size, size * 0.25);
            ctx.closePath();
            ctx.fill();

            // Fins
            ctx.fillStyle = '#666677';
            // Top fin
            ctx.beginPath();
            ctx.moveTo(-size * 0.8, -size * 0.4);
            ctx.lineTo(-size * 1.2, -size * 0.8);
            ctx.lineTo(-size * 0.3, -size * 0.4);
            ctx.closePath();
            ctx.fill();
            // Bottom fin
            ctx.beginPath();
            ctx.moveTo(-size * 0.8, size * 0.4);
            ctx.lineTo(-size * 1.2, size * 0.8);
            ctx.lineTo(-size * 0.3, size * 0.4);
            ctx.closePath();
            ctx.fill();

            // Engine flame
            const flameFlicker = 0.7 + Math.random() * 0.3;
            const flameGrad = this.getGradient(ctx, 'linear', -size, 0, -size * 2.5 * flameFlicker, 0, [
                { offset: 0, color: `rgba(255, 255, 200, ${lifeRatio})` },
                { offset: 0.3, color: `rgba(255, 150, 50, ${lifeRatio * 0.8})` },
                { offset: 0.6, color: `rgba(255, 50, 0, ${lifeRatio * 0.5})` },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = flameGrad;

            ctx.beginPath();
            ctx.moveTo(-size * 0.5, 0);
            ctx.lineTo(-size, -size * 0.3 * flameFlicker);
            ctx.lineTo(-size * 2.5 * flameFlicker, 0);
            ctx.lineTo(-size, size * 0.3 * flameFlicker);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        });

        // === RENDER DECOY FLARES ===
        this.game.decoyFlares.forEach(flare => {
            const sz = flare.z || 0;
            const rotated = this.game.physicsManager.rotate3D(flare.x, flare.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const size = (8 + Math.random() * 4) * rScale / safeZoom;
            const alpha = Math.min(1, flare.life / 30);

            if (!Number.isFinite(rx) || !Number.isFinite(ry) || !Number.isFinite(size) || size <= 0) return;

            // Inner core
            ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
            ctx.beginPath();
            ctx.arc(rx, ry, size * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Outer glow
            const glow = this.getGradient(ctx, 'radial', rx, ry, 0, rx, ry, size * 2, [
                { offset: 0, color: `rgba(255, 150, 50, ${alpha * 0.8})` },
                { offset: 0.5, color: `rgba(255, 80, 0, ${alpha * 0.4})` },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = glow;

            ctx.beginPath();
            ctx.arc(rx, ry, size * 2, 0, Math.PI * 2);
            ctx.fill();
        });

        // === RENDER ENEMY SHIPS ===
        this.game.enemyShips.forEach(enemy => {
            const dx = enemy.x - ship.x;
            const dy = enemy.y - ship.y;
            if (dx*dx+dy*dy > viewDist * viewDist) return;

            const typeDef = ENEMY_TYPES[enemy.type];
            const sz = enemy.z || 0;
            const rotated = this.game.physicsManager.rotate3D(enemy.x, enemy.y, sz, rotCenterX, rotCenterY);
            if (rotated.scale < 0.1) return;

            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            ctx.save();
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const size = typeDef.size * rScale / safeZoom;

            ctx.translate(rx, ry);
            ctx.rotate(enemy.rotation);

            // Body
            ctx.fillStyle = typeDef.color;
            ctx.beginPath();
            ctx.moveTo(size, 0);
            ctx.lineTo(-size, -size * 0.8);
            ctx.lineTo(-size * 0.5, 0);
            ctx.lineTo(-size, size * 0.8);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        });

        // === RENDER WINGMEN ===
        if (this.game.playerWingmen) {
            this.game.playerWingmen.forEach(wingman => {
                const dx = wingman.x - ship.x;
                const dy = wingman.y - ship.y;
                if (dx*dx+dy*dy > viewDist * viewDist) return;
                
                const sz = wingman.z || 0;
                const rotated = this.game.physicsManager.rotate3D(wingman.x, wingman.y, sz, rotCenterX, rotCenterY);
                if (rotated.scale < 0.1) return;

                const rx = rotated.x;
                const ry = rotated.y;
                const rScale = Math.max(0.01, rotated.scale);
                const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
                const baseSize = 14; 
                const size = baseSize * rScale / safeZoom;
                
                ctx.save();
                ctx.translate(rx, ry);
                ctx.rotate(wingman.rotation);
                
                const wClass = wingman.class || 'sentinel';
                const wColor = wingman.hitFlash > 0 ? '#ffffff' : wingman.color;
                
                ctx.shadowColor = wColor;
                ctx.shadowBlur = 14;
                ctx.strokeStyle = wColor;
                ctx.fillStyle = wColor + '33';

                if (wClass === 'vanguard') {
                    // Wide armored hull
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.moveTo(size * 1.8, 0);
                    ctx.lineTo(-size * 0.5, -size * 1.2);
                    ctx.lineTo(-size, -size * 0.5);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size, size * 0.5);
                    ctx.lineTo(-size * 0.5, size * 1.2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    // Armor plate accent
                    ctx.strokeStyle = wColor + '66';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(size * 0.8, 0); ctx.lineTo(-size * 0.3, -size * 0.8);
                    ctx.moveTo(size * 0.8, 0); ctx.lineTo(-size * 0.3,  size * 0.8);
                    ctx.stroke();
                    // Thruster — orange
                    ctx.fillStyle = `rgba(255, 140, 0, ${0.7 + 0.3 * Math.random()})`;
                    ctx.beginPath();
                    ctx.moveTo(-size, -size * 0.4);
                    ctx.lineTo(-size - size * 1.2, 0);
                    ctx.lineTo(-size,  size * 0.4);
                    ctx.fill();

                } else if (wClass === 'striker') {
                    // Razor-thin needle
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(size * 2.2, 0);
                    ctx.lineTo(-size * 0.3, -size * 0.5);
                    ctx.lineTo(-size * 0.8, -size * 0.15);
                    ctx.lineTo(-size * 0.8,  size * 0.15);
                    ctx.lineTo(-size * 0.3,  size * 0.5);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    // Speed lines
                    ctx.strokeStyle = wColor + '55';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(size, -size * 0.3); ctx.lineTo(-size * 0.5, -size * 0.3);
                    ctx.moveTo(size, size * 0.3);  ctx.lineTo(-size * 0.5,  size * 0.3);
                    ctx.stroke();
                    // Twin thrusters — cyan
                    [-size * 0.2, size * 0.2].forEach(oy => {
                        ctx.fillStyle = `rgba(0, 243, 255, ${0.6 + 0.4 * Math.random()})`;
                        ctx.beginPath();
                        ctx.moveTo(-size * 0.8, oy - size * 0.1);
                        ctx.lineTo(-size * 0.8 - size * 0.9, oy);
                        ctx.lineTo(-size * 0.8, oy + size * 0.1);
                        ctx.fill();
                    });

                } else {
                    // Sentinel — balanced delta with shield ring
                    ctx.lineWidth = 1.8;
                    ctx.beginPath();
                    ctx.moveTo(size * 1.5, 0);
                    ctx.lineTo(-size, -size);
                    ctx.lineTo(-size * 0.5, 0);
                    ctx.lineTo(-size, size);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    // Shield ring
                    ctx.strokeStyle = wColor + '44';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 1.3, 0, Math.PI * 2);
                    ctx.stroke();
                    // Thruster — green
                    ctx.fillStyle = `rgba(0, 255, 136, ${0.5 + 0.5 * Math.random()})`;
                    ctx.beginPath();
                    ctx.moveTo(-size, -size * 0.25);
                    ctx.lineTo(-size - size * 1.0, 0);
                    ctx.lineTo(-size,  size * 0.25);
                    ctx.fill();
                }
                
                ctx.shadowBlur = 0;
                ctx.restore();
            });
        }

        // === RENDER CAPITAL SHIPS ===
        if (this.game.capitalShips) {
            this.game.capitalShips.forEach(cap => {
                const dx = cap.x - ship.x;
                const dy = cap.y - ship.y;
                if (dx*dx+dy*dy > viewDist * viewDist * 4) return; // further view dist
                
                const sz = cap.z || 0;
                const rotated = this.game.physicsManager.rotate3D(cap.x, cap.y, sz, rotCenterX, rotCenterY);
                if (rotated.scale < 0.1) return;

                const rx = rotated.x;
                const ry = rotated.y;
                const rScale = Math.max(0.01, rotated.scale);
                const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
                
                ctx.save();
                ctx.translate(rx, ry);
                ctx.rotate(cap.rotation);
                ctx.scale(rScale / safeZoom, rScale / safeZoom);
                
                // Base hull
                ctx.fillStyle = cap.state === 'exploding' ? (Math.random() > 0.5 ? '#fff' : '#444') : '#222';
                ctx.strokeStyle = cap.faction === 'xenon' ? '#ff3333' : '#33ff33';
                ctx.lineWidth = 3;
                
                // Central core geometry
                ctx.beginPath();
                ctx.moveTo(120, 0);
                ctx.lineTo(-100, -60);
                ctx.lineTo(-160, 0);
                ctx.lineTo(-100, 60);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Draw Components
                cap.components.forEach(comp => {
                    ctx.save();
                    ctx.translate(comp.offsetX, comp.offsetY);
                    
                    if (!comp.alive) {
                        // Destroyed effect
                        ctx.fillStyle = '#111';
                        ctx.beginPath();
                        ctx.arc(0, 0, comp.size, 0, Math.PI * 2);
                        ctx.fill();
                        if (Math.random() > 0.5) {
                            ctx.fillStyle = 'orange';
                            ctx.beginPath();
                            ctx.arc((Math.random()-0.5)*comp.size, (Math.random()-0.5)*comp.size, Math.random()*15, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    } else {
                        if (comp.type === 'shield_gen') {
                            ctx.fillStyle = '#444';
                            ctx.strokeStyle = '#00ffff';
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.arc(0, 0, comp.size, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.stroke();
                            
                            // Pulse effect
                            ctx.fillStyle = `rgba(0, 255, 255, ${0.5 + 0.5 * Math.sin(Date.now() / 150)})`;
                            ctx.beginPath();
                            ctx.arc(0, 0, comp.size * 0.5, 0, Math.PI * 2);
                            ctx.fill();
                        } else if (comp.type === 'thruster') {
                            ctx.fillStyle = '#333';
                            ctx.fillRect(-comp.size, -comp.size, comp.size*2, comp.size*2);
                            
                            // Flame
                            const speed = Math.hypot(cap.vx, cap.vy);
                            ctx.fillStyle = cap.faction === 'xenon' ? 'rgba(255, 50, 0, 0.8)' : 'rgba(0, 255, 255, 0.8)';
                            ctx.beginPath();
                            ctx.moveTo(-comp.size, -comp.size*0.8);
                            ctx.lineTo(-comp.size - speed * 40 - Math.random() * 20, 0);
                            ctx.lineTo(-comp.size, comp.size*0.8);
                            ctx.fill();
                        } else if (comp.type === 'core') {
                            if (comp.invulnerable) {
                                // Massive Shield
                                ctx.shadowColor = '#00ffff';
                                ctx.shadowBlur = 20;
                                ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 + 0.3 * Math.sin(Date.now() / 300)})`;
                                ctx.lineWidth = 10;
                                ctx.beginPath();
                                ctx.arc(0, 0, comp.size + 40, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.shadowBlur = 0;
                            }
                            
                            // Core
                            ctx.fillStyle = comp.invulnerable ? '#00aaaa' : '#aa0000';
                            ctx.beginPath();
                            ctx.arc(0, 0, comp.size * 0.4, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    
                    // Health bar
                    if (comp.health < comp.maxHealth && comp.alive && comp.type !== 'core') {
                        ctx.fillStyle = 'red';
                        ctx.fillRect(-comp.size, comp.size + 10, comp.size*2, 6);
                        ctx.fillStyle = '#0f0';
                        ctx.fillRect(-comp.size, comp.size + 10, (comp.size*2) * (comp.health / comp.maxHealth), 6);
                    }
                    ctx.restore();
                });
                
                ctx.restore();
            });
        }

        // === RENDER AI MANAGER FLEET (Phase 5) ===
        if (this.game.aiManager && this.game.aiManager.ships.length > 0) {
            const now = Date.now();
            this.game.aiManager.ships.forEach(aiShip => {
                const dx = aiShip.x - ship.x;
                const dy = aiShip.y - ship.y;
                if (dx * dx + dy * dy > viewDist * viewDist * 4) return;

                const rotated = this.game.physicsManager.rotate3D(aiShip.x, aiShip.y, 0, rotCenterX, rotCenterY);
                if (rotated.scale < 0.05) return;

                const rx = rotated.x;
                const ry = rotated.y;
                const rScale = Math.max(0.01, rotated.scale);
                const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
                const baseSize = aiShip.size || 25;
                const s = baseSize * rScale / safeZoom;

                ctx.save();
                ctx.translate(rx, ry);
                ctx.rotate(aiShip.rotation || 0);

                if (aiShip.vesselType === 'freighter') {
                    // --- GOLDEN FREIGHTER ---
                    // Cargo glow
                    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2);
                    glow.addColorStop(0, 'rgba(255, 215, 0, 0.15)');
                    glow.addColorStop(1, 'transparent');
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(0, 0, s * 2, 0, Math.PI * 2);
                    ctx.fill();

                    // Main hexagonal hull
                    ctx.fillStyle = '#1a1200';
                    ctx.strokeStyle = '#FFD700';
                    ctx.lineWidth = 2 * rScale / safeZoom;
                    ctx.shadowColor = '#FFD700';
                    ctx.shadowBlur = 8;
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
                        const px = Math.cos(a) * s;
                        const py = Math.sin(a) * s * 0.6;
                        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Cargo containers
                    ctx.fillStyle = '#FFD70033';
                    ctx.strokeStyle = '#FFD70077';
                    ctx.lineWidth = 1 * rScale / safeZoom;
                    [-s * 0.4, 0, s * 0.4].forEach(ox => {
                        ctx.strokeRect(ox - s * 0.15, -s * 0.2, s * 0.3, s * 0.4);
                    });

                    // Engine plume
                    ctx.fillStyle = `rgba(255, 160, 0, ${0.5 + 0.5 * Math.sin(now / 80)})`;
                    ctx.beginPath();
                    ctx.moveTo(-s, -s * 0.2);
                    ctx.lineTo(-s - s * 0.6, 0);
                    ctx.lineTo(-s, s * 0.2);
                    ctx.fill();
                    ctx.shadowBlur = 0;

                } else {
                    // --- ESCORT / RIVAL FIGHTER ---
                    const color = aiShip.color || '#ff6600';
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 12;
                    ctx.fillStyle = color + '33';
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1.5 * rScale / safeZoom;

                    // Sleek needle hull
                    ctx.beginPath();
                    ctx.moveTo(s * 1.4, 0);
                    ctx.lineTo(-s * 0.6, -s * 0.7);
                    ctx.lineTo(-s * 1.0, -s * 0.3);
                    ctx.lineTo(-s * 1.0,  s * 0.3);
                    ctx.lineTo(-s * 0.6,  s * 0.7);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Wing detail
                    ctx.strokeStyle = color + '88';
                    ctx.lineWidth = 1 * rScale / safeZoom;
                    ctx.beginPath();
                    ctx.moveTo(s * 0.5, 0);
                    ctx.lineTo(-s * 0.5, -s * 0.5);
                    ctx.moveTo(s * 0.5, 0);
                    ctx.lineTo(-s * 0.5,  s * 0.5);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }

                // === PHASE SHIELD BUBBLE ===
                if (aiShip.maxPhaseShield > 0) {
                    const shieldPct = aiShip.phaseShield / aiShip.maxPhaseShield;
                    if (shieldPct > 0) {
                        const shieldRadius = s * 1.8;
                        const pulse = 0.6 + 0.4 * Math.sin(now / 200);
                        
                        // Color: blue -> purple -> red as depletes
                        const r = Math.round(shieldPct < 0.5 ? 255 : (1 - shieldPct) * 510);
                        const g = 0;
                        const b = Math.round(shieldPct > 0.5 ? 255 : shieldPct * 510);
                        const shieldColor = `rgba(${r}, ${g}, ${b}`;

                        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
                        ctx.shadowBlur = 20;
                        ctx.strokeStyle = `${shieldColor}, ${pulse * shieldPct})`;
                        ctx.lineWidth = 3 * rScale / safeZoom;

                        // Hexagonal shield pattern
                        ctx.beginPath();
                        for (let i = 0; i < 6; i++) {
                            const a = (i / 6) * Math.PI * 2 + (now * 0.0005);
                            const px = Math.cos(a) * shieldRadius;
                            const py = Math.sin(a) * shieldRadius;
                            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                        }
                        ctx.closePath();
                        ctx.stroke();

                        // Inner glow ring
                        ctx.strokeStyle = `${shieldColor}, ${pulse * shieldPct * 0.3})`;
                        ctx.lineWidth = 1 * rScale / safeZoom;
                        ctx.beginPath();
                        ctx.arc(0, 0, shieldRadius * 0.85, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.shadowBlur = 0;

                        // Shield bar above ship
                        const barW = s * 2.5;
                        const barY = -s * 1.8 - 8;
                        ctx.fillStyle = 'rgba(0,0,0,0.5)';
                        ctx.fillRect(-barW / 2, barY, barW, 4);
                        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                        ctx.fillRect(-barW / 2, barY, barW * shieldPct, 4);
                    }
                }

                // Health bar
                if (aiShip.health < aiShip.maxHealth) {
                    const barW = s * 2;
                    const barY = -s * 1.4 - 8;
                    ctx.fillStyle = 'rgba(255,0,0,0.6)';
                    ctx.fillRect(-barW / 2, barY, barW, 3);
                    ctx.fillStyle = '#00ff88';
                    ctx.fillRect(-barW / 2, barY, barW * (aiShip.health / aiShip.maxHealth), 3);
                }

                ctx.restore();
            });
        }

        // === RENDER AI NEEDLE-BEAM PROJECTILES (Phase 5) ===
        if (this.game.aiManager && this.game.aiManager.projectiles.length > 0) {
            this.game.aiManager.projectiles.forEach(p => {
                const rotated = this.game.physicsManager.rotate3D(p.x, p.y, 0, rotCenterX, rotCenterY);
                if (!Number.isFinite(rotated.x) || !Number.isFinite(rotated.y)) return;
                const rScale = rotated.scale;
                const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

                const angle = Math.atan2(p.vy, p.vx);
                const len = (p.length || 18) * rScale / safeZoom;
                const w = (p.width || 1.5) * rScale / safeZoom;

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                ctx.rotate(angle);

                ctx.shadowColor = p.color || '#ff4444';
                ctx.shadowBlur = 12;
                ctx.strokeStyle = p.color || '#ff4444';
                ctx.lineWidth = w;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(-len / 2, 0);
                ctx.lineTo(len / 2, 0);
                ctx.stroke();

                // Bright white core
                ctx.strokeStyle = 'rgba(255,255,255,0.9)';
                ctx.lineWidth = w * 0.25;
                ctx.beginPath();
                ctx.moveTo(-len * 0.3, 0);
                ctx.lineTo(len * 0.4, 0);
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.restore();
            });
        }

        // === RENDER ENEMY BULLETS ===
        this.game.enemyBullets.forEach(b => {
            const sz = b.z || 0;
            const rotated = this.game.physicsManager.rotate3D(b.x, b.y, sz, rotCenterX, rotCenterY);
            const rScale = rotated.scale;
            if (!Number.isFinite(rotated.x) || !Number.isFinite(rotated.y) || !Number.isFinite(rScale) || rScale <= 0) return;
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            ctx.rotate(b.rotation);

            const len = b.length * rotated.scale / safeZoom;
            const w = b.width * rotated.scale / safeZoom;

            // Glow
            ctx.shadowColor = b.color;
            ctx.shadowBlur = 10;
            // Bolt
            ctx.strokeStyle = b.color;
            ctx.lineWidth = w;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(-len / 2, 0);
            ctx.lineTo(len / 2, 0);
            ctx.stroke();
            // Core
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = w * 0.4;
            ctx.beginPath();
            ctx.moveTo(-len / 2, 0);
            ctx.lineTo(len / 2, 0);
            ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.restore();
        });

        // === RENDER BOSS ===
        if (this.game.activeBoss) {
            const boss = this.game.activeBoss;
            const typeDef = BOSS_TYPES[boss.type];
            if (!typeDef) {
                console.warn("Unknown boss type:", boss.type);
                return;
            }

            // 1. DISTANCE CULLING
            const dx_cull = boss.x - ship.x;
            const dy_cull = boss.y - ship.y;
            if (dx_cull*dx_cull + dy_cull*dy_cull > viewDist * 2 * (viewDist * 2)) return;

            const sz = boss.z || 0;
            const rotated = this.game.physicsManager.rotate3D(boss.x, boss.y, sz, rotCenterX, rotCenterY);
            if (rotated.scale < 0.05) return;

            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            ctx.save();

            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const size = typeDef.size * rScale / safeZoom;
            const baseColor = boss.hitFlash > 0 ? '#ffffff' : typeDef.color;

            ctx.translate(rx, ry);
            ctx.rotate(boss.rotation);

            // LOD: Simple icon if very small
            if (size < 15) {
                ctx.fillStyle = baseColor;
                ctx.beginPath();
                ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            // Boss aura / glow
            const auraSize = size * 2.5;
            const aura = this.getGradient(ctx, 'radial', 0, 0, size * 0.5, 0, 0, auraSize, [
                { offset: 0, color: typeDef.glowColor },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = aura;

            ctx.beginPath();
            ctx.arc(0, 0, auraSize, 0, Math.PI * 2);
            ctx.fill();

            // Boss body
            ctx.fillStyle = baseColor;
            ctx.beginPath();
            ctx.moveTo(size * 2, 0);
            ctx.lineTo(size * 0.5, -size * 0.6);
            ctx.lineTo(-size * 1.2, -size * 1.2);
            ctx.lineTo(-size * 0.6, -size * 0.3);
            ctx.lineTo(-size * 0.8, 0);
            ctx.lineTo(-size * 0.6, size * 0.3);
            ctx.lineTo(-size * 1.2, size * 1.2);
            ctx.lineTo(size * 0.5, size * 0.6);
            ctx.closePath();
            ctx.fill();

            // Engine flames
            const fLen = (0.6 + Math.random() * 0.4) * size;
            ctx.fillStyle = 'rgba(255, 100, 50, 0.8)';
            ctx.beginPath();
            ctx.moveTo(-size * 0.7, -size * 0.2);
            ctx.lineTo(-size * 0.7 - fLen, 0);
            ctx.lineTo(-size * 0.7, size * 0.2);
            ctx.closePath();
            ctx.fill();

            // Dreadnought shield arc
            if (boss.type === 'dreadnought') {
                ctx.strokeStyle = boss.phase === 2 ? 'rgba(255,100,100,0.6)' : 'rgba(100,200,255,0.6)';
                ctx.lineWidth = 4 / safeZoom;
                ctx.beginPath();
                ctx.arc(0, 0, size * 2, -Math.PI / 3, Math.PI / 3);
                ctx.stroke();
            }

            // Hive Queen glow
            if (boss.type === 'hivequeen') {
                const pulse = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
                ctx.fillStyle = `rgba(68, 255, 68, ${pulse * 0.3})`;
                ctx.beginPath();
                ctx.arc(0, 0, size * 1.8, 0, Math.PI * 2);
                ctx.fill();
            }

            // Void Reaper tendrils
            if (boss.type === 'voidreaper') {
                const bTime = Date.now() * 0.003;
                ctx.strokeStyle = 'rgba(153, 68, 255, 0.4)';
                ctx.lineWidth = 2 / safeZoom;
                for (let i = 0; i < 4; i++) {
                    const tAngle = bTime + (i * Math.PI / 2);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.quadraticCurveTo(
                        Math.cos(tAngle) * size * 1.5,
                        Math.sin(tAngle) * size * 1.5,
                        Math.cos(tAngle + 0.5) * size * 2.5,
                        Math.sin(tAngle + 0.5) * size * 2.5
                    );
                    ctx.stroke();
                }
            }

            ctx.restore();

            // === BOSS HEALTH BAR ===
            const barWidth = 400;
            const barHeight = 14;
            const barX = (ctx.canvas.width - barWidth) / 2;
            const barY = 20;
            const hpRatio = boss.health / boss.maxHealth;

            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
            const hpColor = hpRatio > 0.5 ? typeDef.color : '#ff4400';
            ctx.fillStyle = hpColor;
            ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);
            ctx.strokeStyle = typeDef.color;
            ctx.lineWidth = 1;
            ctx.strokeRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);

            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Orbitron, monospace';
            ctx.textAlign = 'center';
            const suffix = boss.phase === 2 ? '(ENRAGED)' : '';
            ctx.fillText(`[!] ${typeDef.name.toUpperCase()} ${suffix}`, ctx.canvas.width / 2, barY - 6);
            ctx.fillStyle = '#cccccc';
            ctx.font = '10px Orbitron, monospace';
            ctx.fillText(`${boss.health} / ${boss.maxHealth}`, ctx.canvas.width / 2, barY + barHeight + 14);
            ctx.textAlign = 'left';
        }
    }

    draw(incomingCtx, incomingTime) {
        // Handle both signatures: draw(time) and draw(ctx, time)
        let ctx, time;
        if (incomingCtx && (incomingCtx instanceof CanvasRenderingContext2D || incomingCtx.canvas)) {
            ctx = incomingCtx;
            time = incomingTime;
        } else {
            ctx = this.game.ctx;
            time = incomingCtx; // First arg was time
        }

        if (!ctx || !this.game || !this.game.ready) return;
        const canvas = ctx.canvas;
        
        // Safety: Prevent renderer hang if coordinates explode
        if (!isFinite(this.game.playerShip.x) || !isFinite(this.game.playerShip.y)) {
            console.warn("[Renderer] COORDINATE EXPLOSION DETECTED. Aborting frame.");
            return;
        }

        // Safety: Ensure time is ALWAYS a valid number
        const safeTime = typeof time === 'number' ? time : performance.now();

        // 1. UPDATE CINEMATIC EFFECTS
        if (this.redAlertIntensity > 0) {
            // Decay intensity slowly unless refreshed by BossManager
            this.redAlertIntensity = Math.max(0, this.redAlertIntensity - 0.005);
        }

        try {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "#000000"; // FORCE ABSOLUTE BLACK VOID
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // STABILIZATION: BACKGROUND ELEMENTS TEMPORARILY DISABLED
        if (false && this.game.config.showBackground) {
            const paraX = this.game.camera.x * 0.05;
            const paraY = this.game.camera.y * 0.05;

            try {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
                const time = performance.now() / 1000;

                this.game.staticStars.forEach(s => {
                    // Safety check for required properties
                    if (typeof s.x !== 'number' || typeof s.y !== 'number') return;

                    let sx = (s.x + paraX) % canvas.width;
                    let sy = (s.y + paraY) % canvas.height;
                    if (sx < 0) sx += canvas.width;
                    if (sy < 0) sy += canvas.height;

                    // Ensure we have valid values
                    const vx = typeof s.vx === 'number' ? s.vx : 0;
                    const vy = typeof s.vy === 'number' ? s.vy : 0;
                    const size = s.r || s.size || 1; // Use 'r' if available (matches generation)
                    const starColor = s.color || '#ffffff';

                    // Use pre-calculated RGB if available
                    const r = s.r || 255;
                    const g = s.g || 255;
                    const b = s.b || 255;


                    if (this.game.bgWarpMode && !this.game.bgDriftMode) {
                        // ====== LIGHTSPEED: Moving stars with trailing streaks ======
                        const dx = sx - centerX;
                        const dy = sy - centerY;
                        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

                        if (distFromCenter < 3) return; // Skip center stars

                        // Warp intensity - already curved via setWarpSpeedMultiplier
                        const warpIntensity = this.game.warpSpeed || 0;
                        const sliderValue = this.game.warpSpeedMultiplier || 1;

                        // Streak length varies by depth - deeper stars = longer streaks
                        // Low slider = short rays, high slider = dramatic but not overwhelming
                        const perspFactor = distFromCenter / maxDist;
                        const depthFactor = s.depth || 0.5;
                        // Use sqrt for diminishing returns, depth multiplier for parallax
                        const lengthFactor = Math.sqrt(sliderValue) * 14 * depthFactor;
                        const streakLength = 5 + lengthFactor * (2 + perspFactor * 12);
                        // Cap max streak length - varies by depth
                        const cappedStreak = Math.min(streakLength, 1680 * depthFactor);

                        // Direction OUTWARD from center (streak trails BEHIND moving star)
                        const dirOutX = dx / distFromCenter;
                        const dirOutY = dy / distFromCenter;

                        // HEAD is at current position (leading edge, flying outward)
                        // TAIL is behind (toward center, where star came from)
                        const headX = sx;
                        const headY = sy;
                        const tailX = sx - dirOutX * cappedStreak;
                        const tailY = sy - dirOutY * cappedStreak;

                        // Alpha: cap to prevent white-out, scale with intensity
                        // Lower alpha at high speeds = more visible individual rays
                        const baseAlpha = s.alpha || 0.2;
                        const intensityBoost = Math.min(0.4, warpIntensity * 0.15);
                        const alpha = Math.min(0.65, baseAlpha + intensityBoost);
                        ctx.globalAlpha = alpha;

                        if (cappedStreak > 2) {
                            try {
                                // === GRADIENT: Use star's actual color throughout ===
                                const grad = this.getGradient(ctx, 'linear', tailX, tailY, headX, headY, [
                                    { offset: 0, color: 'transparent' },
                                    { offset: 0.3, color: `rgba(${r}, ${g}, ${b}, 0.2)` },
                                    { offset: 0.6, color: `rgba(${r}, ${g}, ${b}, 0.6)` },
                                    { offset: 1, color: `rgba(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)}, 1)` }
                                ]);

                                // Main streak - line width matches star diameter (size * 2)
                                ctx.strokeStyle = grad;

                                // Base width should be diameter (size * 2). add intensity.
                                const lineW = Math.max(0.6, Math.min(6, size * 2.0 + warpIntensity * 0.06));
                                ctx.lineWidth = lineW;
                                ctx.lineCap = 'round';
                                ctx.beginPath();
                                ctx.moveTo(tailX, tailY);
                                ctx.lineTo(headX, headY);
                                ctx.stroke();

                                // Bright core at head - USE STAR COLOR, not white!
                                if (cappedStreak > 15) {
                                    // Brighter version of star's color for the core
                                    const coreR = Math.min(255, r + 80);
                                    const coreG = Math.min(255, g + 80);
                                    const coreB = Math.min(255, b + 80);
                                    ctx.strokeStyle = `rgba(${coreR}, ${coreG}, ${coreB}, 0.85)`;
                                    ctx.lineWidth = Math.max(0.4, size * 0.3);
                                    ctx.globalAlpha = alpha * 0.9;
                                    ctx.beginPath();
                                    const coreLen = Math.min(cappedStreak * 0.12, 30);
                                    const coreX = headX - dirOutX * coreLen;
                                    const coreY = headY - dirOutY * coreLen;
                                    ctx.moveTo(coreX, coreY);
                                    ctx.lineTo(headX, headY);
                                    ctx.stroke();
                                }
                            } catch (e) {
                                ctx.strokeStyle = starColor;
                                ctx.lineWidth = size;
                                ctx.beginPath();
                                ctx.moveTo(tailX, tailY);
                                ctx.lineTo(headX, headY);
                                ctx.stroke();
                            }
                        }

                        // Bright head point - smaller at high speeds - USE STAR COLOR
                        ctx.globalAlpha = Math.min(0.9, alpha + 0.2);
                        // Use bright version of star's color instead of white
                        const headR = Math.min(255, r + 100);
                        const headG = Math.min(255, g + 100);
                        const headB = Math.min(255, b + 100);
                        ctx.fillStyle = `rgb(${headR}, ${headG}, ${headB})`;
                        ctx.beginPath();
                        const headSize = Math.max(0.5, Math.min(1.2, size * 0.4));
                        ctx.arc(headX, headY, headSize, 0, Math.PI * 2);
                        ctx.fill();


                    } else if (this.game.bgDriftMode && !this.game.bgWarpMode) {
                        // ====== SIMPLE DRIFT - Stars just float gently ======
                        ctx.globalAlpha = s.alpha || 0.5;
                        ctx.fillStyle = starColor;
                        ctx.beginPath();
                        ctx.arc(sx, sy, size, 0, Math.PI * 2);
                        ctx.fill();

                    } else {
                        // === NORMAL MODE: Simple colored dot ===
                        ctx.globalAlpha = s.alpha || 0.5;
                        ctx.fillStyle = starColor;
                        ctx.beginPath();
                        ctx.arc(sx, sy, size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            } catch (renderError) {
                console.error('[BG Error] Star rendering failed:', renderError);
            }

            // ====== SHOOTING STARS (Normal mode only) ======
            if (!this.game.bgWarpMode && !this.game.bgDriftMode) {
                const now = performance.now();

                // Spawn new shooting star every 2-6 seconds
                this.game.lastShootingStarTime = this.game.lastShootingStarTime || 0;
                if (now - this.game.lastShootingStarTime > 2000 + Math.random() * 4000) {
                    this.game.lastShootingStarTime = now;
                    const colors = this.game.starColors || ['#ffffff', '#aaddff', '#ffddaa'];
                    
                    // Safety check for array existence before push
                    if (!this.game.shootingStarsActive) this.game.shootingStarsActive = [];

                    // Start from random edge
                    const edge = Math.floor(Math.random() * 4);
                    let startX, startY, angle;

                    if (edge === 0) { // Top
                        startX = Math.random() * canvas.width;
                        startY = -10;
                        angle = Math.PI * 0.25 + Math.random() * Math.PI * 0.5;
                    } else if (edge === 1) { // Right
                        startX = canvas.width + 10;
                        startY = Math.random() * canvas.height;
                        angle = Math.PI * 0.75 + Math.random() * Math.PI * 0.5;
                    } else if (edge === 2) { // Bottom
                        startX = Math.random() * canvas.width;
                        startY = canvas.height + 10;
                        angle = -Math.PI * 0.25 - Math.random() * Math.PI * 0.5;
                    } else { // Left
                        startX = -10;
                        startY = Math.random() * canvas.height;
                        angle = -Math.PI * 0.25 + Math.random() * Math.PI * 0.5;
                    }

                    this.game.shootingStarsActive.push({
                        x: startX,
                        y: startY,
                        vx: Math.cos(angle) * (8 + Math.random() * 12),
                        vy: Math.sin(angle) * (8 + Math.random() * 12),
                        size: 1.5 + Math.random() * 1.5,
                        tailLength: 30 + Math.random() * 50,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        life: 1.0
                    });
                }

                // Update and draw shooting stars - DEFENSIVE GUARD ADDED
                if (!this.game.shootingStarsActive) this.game.shootingStarsActive = [];
                this.game.shootingStarsActive = this.game.shootingStarsActive.filter(star => {
                    star.x += star.vx;
                    star.y += star.vy;
                    star.life -= 0.01;

                    if (star.life <= 0 || star.x < -100 || star.x > canvas.width + 100 ||
                        star.y < -100 || star.y > canvas.height + 100) {
                        return false; // Remove
                    }

                    // Draw shooting star with tail
                    const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
                    const dirX = -star.vx / speed;
                    const dirY = -star.vy / speed;
                    const tailX = star.x + dirX * star.tailLength;
                    const tailY = star.y + dirY * star.tailLength;

                    ctx.globalAlpha = star.life * 0.8;
                    ctx.strokeStyle = star.color;
                    ctx.lineWidth = star.size;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY);
                    ctx.lineTo(star.x, star.y);
                    ctx.stroke();

                    // Bright head
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 1.2, 0, Math.PI * 2);
                    ctx.fill();

                    return true; // Keep
                });
            }

            ctx.globalAlpha = 1.0;


        }

        // 0. Draw Background Layers with Parallax (DECOUPLED FROM WORLD TRANSFORM)
        // Backgrounds (galaxies, nebulae, faint stars) should move slower than the player
        // and zoom less intensely to create a sense of vast distance.
        const backgroundParallax = 0.02; // 0.02 means moves at 2% of player speed (near static)
        const zoomParallax = 0.1; // 1.0 = full zoom, 0.0 = no zoom effect on backgrounds
        const pZoom = 1 + (this.game.camera.zoom - 1) * zoomParallax;

        ctx.save();
        // Background Field Centering: Always relative to screen center
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(pZoom, pZoom);

        // Apply parallax translation based on SHIP position
        // backgroundParallax (0.98) means it moves at 98% of world speed.
        const driftX = Math.sin(time / 5000) * 20;
        const driftY = Math.cos(time / 7000) * 20;
        ctx.translate(
            -(this.game.playerShip.x * backgroundParallax + driftX),
            -(this.game.playerShip.y * backgroundParallax + driftY)
        );

        // Always draw background stars and nebulae if they exist
        this.drawBackgroundElements();
        ctx.restore();

        // World Transform (For interactive game objects)
        ctx.save();
        ctx.translate(canvas.width / 2 + this.game.camera.x, canvas.height / 2 + this.game.camera.y);
        ctx.scale(this.game.camera.zoom, this.game.camera.zoom);

        // Draw deep space specific elements (galaxies, black holes, planets) in world space
        if (this.game.activeStyles.has('deep-space')) this.drawDeepSpaceSpecific();

        // Calculations & Cluster ID Assignment
        const { lines, clusters } = this.game.refreshClusterAssignments();

        // 1. Draw Grid Lines (Glow Pass + Core Pass) with 3D rotation
        if (lines.length > 0) {
            ctx.lineCap = 'round';
            ctx.shadowBlur = 10;

            // Rotation center - use cached if available (during star placement)
            const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
            const rotCenterX = center.x;
            const rotCenterY = center.y;
            const rotCenterZ = center.z || 0;

            lines.forEach(l => {
                const alpha = Math.max(0, 1 - (l.dist / this.game.config.maxConnectDist));
                const starColor = this.game.getStarColor(l.s1);
                const [r, g, b] = this.game.hexToRgb(starColor);

                // Apply 3D rotation
                const s1z = l.s1.z || 0;
                const s2z = l.s2.z || 0;
                const p1 = this.game.physicsManager.rotate3D(l.s1.x, l.s1.y, s1z, rotCenterX, rotCenterY);
                const p2 = this.game.physicsManager.rotate3D(l.s2.x, l.s2.y, s2z, rotCenterX, rotCenterY);

                ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
                ctx.lineWidth = 3 / this.game.camera.zoom;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            });
            ctx.shadowBlur = 0;

            lines.forEach(l => {
                const alpha = Math.max(0, 1 - (l.dist / this.game.config.maxConnectDist));
                const starColor = this.game.getStarColor(l.s1);

                // Apply 3D rotation
                const s1z = l.s1.z || 0;
                const s2z = l.s2.z || 0;
                const p1 = this.game.physicsManager.rotate3D(l.s1.x, l.s1.y, s1z, rotCenterX, rotCenterY);
                const p2 = this.game.physicsManager.rotate3D(l.s2.x, l.s2.y, s2z, rotCenterX, rotCenterY);

                ctx.strokeStyle = starColor;
                ctx.globalAlpha = alpha * 0.8;
                ctx.lineWidth = 1 / this.game.camera.zoom;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            });
            ctx.globalAlpha = 1.0;
        }

        // 6. Draw Text Labels
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 ${14 / this.game.camera.zoom}px 'Exo 2'`;

        clusters.forEach(c => {
            // Only draw names for clusters that meet the minimum size threshold AND have a generated name
            const name = String(c[0].clusterId);
            if (c.length < this.game.config.minGroupSize || name === String(c[0].id)) return;

            // Centroid Calculation
            let cx = 0, cy = 0;
            c.forEach(s => { cx += s.x; cy += s.y; });
            cx /= c.length; cy /= c.length;

            const avgColor = this.game.getStarColor(c[0]);

            // Draw Text Label
            ctx.fillStyle = avgColor;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 4;
            ctx.fillText(name, cx, cy + (30 / this.game.camera.zoom));
            ctx.shadowBlur = 0;
        });

        // 7. Draw Stars with 3D rotation
        const timeNow = performance.now();
        // Use cached rotation center if available (during star placement), otherwise calculate
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const rotCenterX = center.x;
        const rotCenterY = center.y;
        // Note: we just pass centerX/Y as pivot, Z pivot is implicitly handled by rotate3D logic relative to 0? 
        // Wait, rotate3D logic (let pz = z) rotates AROUND (centerX, centerY, 0).
        // If the constellation center has Z != 0, we should translate Z too?
        // Ideally: let pz = z - (center.z || 0);
        // Let's rely on the definition where we pass Z.

        this.game.stars.forEach(s => {
            if (s.flownOut) return; // Skip if flown out during warp

            ctx.save();

            // Apply disengage warp values
            let wScale = 1.0;
            let wAlpha = 1.0;
            if (this.game.warpDisengaging && s.warpScale !== undefined) {
                wScale = s.warpScale;
                wAlpha = s.warpAlpha !== undefined ? s.warpAlpha : 1.0;
            }

            const isHover = (s === this.game.hoveredStar);

            // Apply 3D rotation
            const sz = s.z || 0;
            const rotated = this.game.physicsManager.rotate3D(s.x, s.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            const twinkle = Math.sin(timeNow * 0.003 + s.phase) * 0.2 + 0.8;
            const scale = isHover ? 1.5 : 1.0;
            const radius = this.game.config.starBaseRad * twinkle * scale * rScale * wScale / this.game.camera.zoom;
            const starColor = this.game.getStarColor(s);
            const [r, g, b] = this.game.hexToRgb(starColor);

            // Apply transparency
            ctx.globalAlpha = wAlpha;

            const radLimit = radius * 6;
            const glowRad = Math.max(0.1, isFinite(radLimit) ? radLimit : 1); 

            // Safety check for non-finite coordinates
            if (!isFinite(rx) || !isFinite(ry) || !isFinite(glowRad)) return;

            const grad = this.getGradient(ctx, 'radial', rx, ry, 0, rx, ry, glowRad, [
                { offset: 0, color: `rgba(255, 255, 255, ${isHover ? 0.9 : 0.6})` },
                { offset: 0.2, color: `rgba(${r}, ${g}, ${b}, 0.3)` },
                { offset: 1, color: "rgba(0,0,0,0)" }
            ]);

            ctx.fillStyle = grad;

            ctx.beginPath();
            ctx.arc(rx, ry, glowRad, 0, Math.PI * 2);
            ctx.fill();

            // Draw Core (Star Shape)
            ctx.fillStyle = starColor;
            this.drawStarShape(ctx, rx, ry, radius);

            ctx.restore();
        });

        // Update HUD
        const statEl = document.getElementById('stats');
        const constellationCount = clusters.filter(c => c.length >= this.game.config.minGroupSize).length;
        if (statEl) {
            const currentMode = (this.game.mode || 'draw').charAt(0).toUpperCase() + (this.game.mode || 'draw').slice(1);
            statEl.innerText = `Mode: ${currentMode} | Stars: ${this.game.stars.length} | Constellations: ${constellationCount} | Zoom: ${this.game.camera.zoom.toFixed(2)} x`;
        }

        // Draw player ship if in flight mode
        // Draw player ship if in flight mode
        if (this.game.flightMode && this.game.playerShip) {
            // console.log('[Spacecraft Debug] Rendering player ship at', this.game.playerShip.x, this.game.playerShip.y);
            this.game.renderSpeedLines(ctx);
            this.game.renderMinerals(ctx, time);
            const viewDist = 5000;
            this.renderHazards(ctx, time); 
            this.renderLegacyEntities(ctx, time, rotCenterX, rotCenterY, this.game.playerShip, viewDist);
            this.renderMegaStructures(ctx, time); // Phase 17-2: Dyson Swarms, Ring Worlds, Warp Gates
            this.renderAIElements(ctx, time); // Phase 17-3: Trade Routes & System Overlay
            this.renderTrainingGates(ctx); // Phase 23: Volumetric Training Simulators
            if (this.game.particleManager) this.game.particleManager.render(ctx);
            this.game.renderProjectiles(ctx);
            this.renderCombatVisuals(ctx);

            // --- CINEMATIC: Chrono-Shift Ghost Trail ---
            if (this.game.chronoShiftActive) {
                // Record current state
                this.ghostTrail.unshift({
                    x: this.game.playerShip.x,
                    y: this.game.playerShip.y,
                    rotation: this.game.playerShip.rotation,
                    pitch: this.game.playerShip.pitch,
                    roll: this.game.playerShip.roll,
                    type: this.game.playerShip.type,
                    time: Date.now()
                });
                // Cap trail length
                if (this.ghostTrail.length > 20) this.ghostTrail.pop();

                // Render ghosts
                this.ghostTrail.forEach((ghost, index) => {
                    const opacity = 0.4 * (1 - index / 20);
                    if (opacity <= 0) return;
                    
                    ctx.save();
                    ctx.translate(ghost.x, ghost.y);
                    ctx.rotate(ghost.rotation);
                    ctx.globalAlpha = opacity;
                    // Draw a simplified silhouette or the ship itself with low alpha
                    this.game.renderPlayerShip(ctx, time, ghost, true); // Added 'isGhost' flag
                    ctx.restore();
                });
            } else if (this.ghostTrail.length > 0) {
                this.ghostTrail = []; // Clear trail when ability ends
            }

            // Damage Effects (Under ship? Or over? Over looks better for smoke)
            this.game.renderPlayerShip(ctx, time);
            this.game.renderDamageEffects(ctx);
            this.game.renderCollectionNotifications(ctx);

            // Update managers and HUD (Phase 17-1)
            if (this.game.warpGateManager) {
                this.game.warpGateManager.update(1.0); // Assume dt=1 for UI checks
                this.game.hudManager.updateWarpUI();
            }

            // HUD Overlays (Absolute Screen Space)
        }

        ctx.restore(); // Close World Transform (Started at 8918)

        // --- PHASE 21: CINEMATIC FINALE (Dimensional Collapse) ---
        if (this.game.collapseFactor > 0) {
            this.renderDimensionalCollapse(ctx, this.game.collapseFactor);
        }
        if (this.game.flashAlpha > 0) {
            this.renderFlashOverlay(ctx, this.game.flashAlpha);
        }

        // Welcome overlay renders on top of everything, regardless of flight mode
        if (this.game.missionManager && this.game.missionManager.renderWelcomeOverlay) {
            this.game.missionManager.renderWelcomeOverlay(ctx);
        }

        // HAZARD EFFECTS RENDER OUTSIDE FLIGHT MODE CHECK
        // This ensures nuclear explosions, black holes etc. always display
        // even when player state changes during the effect

        // --- MOVED: Cyber Matrix Rain (Screen Space Overlay) ---
        // Rendered HERE to ensure it overlays all 3D elements and backgrounds
        if (this.game.activeStyles.has('cyber') && this.game.matrixStreams) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Force screen space

            ctx.textAlign = 'center';
            const speedMult = this.game.matrixSpeedMultiplier || 1.0;
            const lengthMult = this.game.matrixLengthMultiplier || 1.0;

            // Apply angle transform
            if (this.game.matrixAngle !== 0) {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((this.game.matrixAngle * Math.PI) / 180);
                ctx.translate(-canvas.width / 2, -canvas.height / 2);
            }

            // Base visible length: 20 chars at 1x, slider scales from ~4 to ~60 chars
            const baseVisibleLength = 20;
            const rainbowHueOffset = Date.now() * 0.1; // Animate rainbow hue

            this.game.matrixStreams.forEach((stream, streamIndex) => {
                // Update with real-time speed multiplier
                stream.y += stream.baseSpeed * speedMult;

                // Calculate visible length based on slider (independent of array size)
                const visibleLength = Math.max(3, Math.floor(baseVisibleLength * lengthMult));

                if (stream.y - (visibleLength * stream.size) > canvas.height * 1.5) {
                    stream.y = -stream.size * visibleLength; // Reset
                }

                // Draw
                ctx.font = `${stream.size}px monospace, 'Courier New', monospace`;
                ctx.textBaseline = 'middle';

                // Only draw visible characters based on length multiplier
                for (let i = 0; i < visibleLength && i < stream.chars.length; i++) {
                    const char = stream.chars[i];
                    const charY = stream.y - (i * stream.size);
                    if (charY < -stream.size * 2 || charY > canvas.height * 1.5) continue;

                    // Improved visibility: Fade out only near the end of the tail
                    const relativePos = 1 - (i / visibleLength);
                    const alpha = Math.pow(relativePos, 0.5) * stream.opacity;

                    ctx.globalAlpha = alpha;

                    // Rainbow mode: cycle through HSL colors
                    if (this.game.matrixRainbowMode) {
                        const hue = (rainbowHueOffset + streamIndex * 15 + i * 5) % 360;
                        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
                    } else {
                        ctx.fillStyle = stream.color;
                    }
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = stream.color;

                    ctx.fillText(char, stream.x, charY);
                }
            });

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1.0;
            ctx.restore();
        }
        if (this.game.hazardManager && this.game.hazardManager.renderHazardEffect) {
            this.game.hazardManager.renderHazardEffect(ctx, time);
        }

        // --- RENDER PULSE PING (Expanding Ring in World) ---
        if (this.game.activePulsePing) {
            const now = Date.now();
            const elapsed = now - this.game.activePulsePing.startTime;
            if (elapsed < this.game.activePulsePing.duration) {
                const progress = elapsed / this.game.activePulsePing.duration;
                const radius = progress * (this.game.activePulsePing.maxRadius || 3000);

                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.translate(canvas.width / 2, canvas.height / 2);

                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - progress})`;
                ctx.lineWidth = 5 * (1 - progress);
                ctx.beginPath();
                ctx.arc(0, 0, radius * this.game.camera.zoom, 0, Math.PI * 2);
                ctx.stroke();

                // Outer glow
                ctx.lineWidth = 15 * (1 - progress);
                ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - progress) * 0.3})`;
                ctx.stroke();

                ctx.restore();
            } else {
                this.game.activePulsePing = null;
            }
        }

        // --- PHASE 5-B: EDGE SCREEN MARKERS ---
        // Apply Cinematic Depth of Field Proxy
        const dofBlur = (this.game.cinematicMode && this.game.cinematicManager) ? 2 : 0;
        if (dofBlur > 0) ctx.filter = `blur(${dofBlur}px)`;

        if (dofBlur > 0) ctx.filter = 'none';
        
        this.renderEdgeMarkers(ctx);
        
        // Phase 4: SCREEN SHAKE (Tactical)
        if (this.game.screenShakeIntensity > 0.1) {
            const sx = (Math.random() - 0.5) * this.game.screenShakeIntensity;
            const sy = (Math.random() - 0.5) * this.game.screenShakeIntensity;
            ctx.translate(sx, sy);
            this.game.screenShakeIntensity *= 0.9; // Decay
        }

        // Phase 21: TOP-TIER CINEMATIC WARP TUNNEL
        if (this.game.bgWarpMode) {
            this.drawWarpTunnel(ctx, time, this.game.warpIntensity || 1.0);
        }

        // Phase 2: NEBULA HAZARDS (NUCLEAR FILTER: DISABLED)
        /*
        if (this.game.flightMode) {
            this.renderNebulaHazards(ctx, time);
        }
        */


        // Phase 16-3: Final Screen Overlays
        this.renderPostEffects(ctx);
        this.renderTrainingHUD(ctx); // Phase 23: Advanced Tutorial Interface

        // Phase 4: DAMAGE VIGNETTE (Screen Space)
        this.renderDamageVignette(ctx);

        // Phase 7: RED ALERT OVERLAY (Cinematic Boss Encounter)
        if (this.redAlertIntensity > 0.01) {
            this.drawRedAlertOverlay(ctx);
        }

        } catch (drawError) {
            console.error('FATAL RENDER ERROR:', drawError);
        }
    }

    renderDamageVignette(ctx) {
        const ship = this.game.playerShip;
        if (!ship || ship.hullHealth > 40) return;
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Screen Space
        const hHealth = (ship.hullHealth !== undefined && !isNaN(ship.hullHealth)) ? ship.hullHealth : 100;
        const rawIntensity = (40 - hHealth) / 40;
        const intensity = (isFinite(rawIntensity) && rawIntensity > 0) ? rawIntensity : 0;
        const pulse = (Math.sin(Date.now() * 0.005) + 1) / 2;
        
        const grad = ctx.createRadialGradient(
            ctx.canvas.width/2, ctx.canvas.height/2, ctx.canvas.height * 0.3,
            ctx.canvas.width/2, ctx.canvas.height/2, ctx.canvas.height * 0.8
        );
        grad.safeAddColorStop(0, 'transparent');
        const intensityFactor = isFinite(intensity) ? intensity : 0;
        const pulseFactor = isFinite(pulse) ? pulse : 1;
        const intensityAlpha = (intensityFactor * 0.4 * pulseFactor);
        const safeAlpha = isFinite(intensityAlpha) ? Math.max(0, Math.min(0.4, intensityAlpha)) : 0;
        grad.safeAddColorStop(1, `rgba(255, 0, 50, ${safeAlpha})`);
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Chromatic Aberration Simulation (Subtle shift)
        if (intensity > 0.5 && Math.random() < 0.1) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            ctx.fillRect(2, 0, ctx.canvas.width, ctx.canvas.height);
        }
        
        ctx.restore();
    }

    renderNebulaHazards(ctx, time) {
        if (!this.game.loadedSectors) return;
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const ship = this.game.playerShip;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

        for (const sector of this.game.loadedSectors.values()) {
            if (sector.hazards && sector.hazards.nebula) {
                const neb = sector.hazards.nebula;
                const distSq = (ship.x - neb.x) ** 2 + (ship.y - neb.y) ** 2;
                const viewLimit = (neb.radius + 12000) ** 2;
                if (distSq > viewLimit) continue;

                const rotated = this.game.physicsManager.rotate3D(neb.x, neb.y, 0, center.x, center.y);
                const rx = rotated.x;
                const ry = rotated.y;
                const radius = neb.radius * rotated.scale / safeZoom;

                // 1. LAYERED ATMOSPHERIC GLOW
                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                
                // Deep Core
                const coreGrad = this.getGradient(ctx, 'radial', rx, ry, 0, rx, ry, radius * 0.8, [
                    { offset: 0, color: neb.type === 'toxic' ? 'rgba(255, 50, 150, 0.4)' : 'rgba(0, 150, 255, 0.35)' },
                    { offset: 1, color: 'transparent' }
                ]);
                ctx.fillStyle = coreGrad;
                ctx.beginPath();
                ctx.arc(rx, ry, radius * 0.8, 0, Math.PI * 2);
                ctx.fill();

                // Faded Outer Shell
                const shellGrad = this.getGradient(ctx, 'radial', rx, ry, radius * 0.5, rx, ry, radius, [
                    { offset: 0, color: 'transparent' },
                    { offset: 0.5, color: neb.type === 'toxic' ? 'rgba(200, 0, 100, 0.15)' : 'rgba(0, 80, 200, 0.12)' },
                    { offset: 1, color: 'transparent' }
                ]);
                ctx.fillStyle = shellGrad;
                ctx.beginPath();
                ctx.arc(rx, ry, radius, 0, Math.PI * 2);
                ctx.fill();

                // 2. VOLUMETRIC GAS CLOUDS (Subtle Perlin-like variation)
                if (radius > 100) {
                    const cloudCount = Math.min(15, Math.floor(radius / 200));
                    for (let i = 0; i < cloudCount; i++) {
                        const ang = (time * 0.0001 + i * 2.4);
                        const rOffset = Math.sin(time * 0.0005 + i) * (radius * 0.2);
                        const cx = rx + Math.cos(ang) * (radius * 0.4 + rOffset);
                        const cy = ry + Math.sin(ang) * (radius * 0.4 + rOffset);
                        const cSize = (200 + Math.abs(Math.sin(i)) * 400) * rotated.scale / safeZoom;
                        
                        const cloudGrad = this.getGradient(ctx, 'radial', cx, cy, 0, cx, cy, cSize, [
                            { offset: 0, color: neb.type === 'toxic' ? 'rgba(255, 100, 200, 0.1)' : 'rgba(100, 200, 255, 0.08)' },
                            { offset: 1, color: 'transparent' }
                        ]);
                        ctx.fillStyle = cloudGrad;
                        ctx.beginPath();
                        ctx.arc(cx, cy, cSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // 3. CORE INTERFERENCE (Static only)
                if (neb.type === 'static') {
                    // Random Lightning Strikes
                    if (Math.random() < 0.05) {
                        ctx.strokeStyle = '#00f3ff';
                        ctx.lineWidth = 2 / safeZoom;
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = '#00f3ff';
                        ctx.beginPath();
                        ctx.moveTo(rx + (Math.random()-0.5)*radius, ry + (Math.random()-0.5)*radius);
                        for(let j=0; j<5; j++) {
                            ctx.lineTo(rx + (Math.random()-0.5)*radius*1.5, ry + (Math.random()-0.5)*radius*1.5);
                        }
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                    }
                    
                    // Static interference horizontal lines
                    if (Math.random() < 0.4) {
                        ctx.fillStyle = 'rgba(200, 240, 255, 0.2)';
                        const sx = rx + (Math.random() - 0.5) * radius * 1.8;
                        const sy = ry + (Math.random() - 0.5) * radius * 1.8;
                        ctx.fillRect(sx, sy, 50 / safeZoom, 1 / safeZoom);
                    }
                } else if (neb.type === 'toxic') {
                    // Toxic bubbling effect
                    if (Math.random() < 0.1) {
                        const bx = rx + (Math.random()-0.5)*radius*1.2;
                        const by = ry + (Math.random()-0.5)*radius*1.2;
                        ctx.fillStyle = 'rgba(255, 100, 255, 0.3)';
                        ctx.beginPath();
                        ctx.arc(bx, by, (Math.random()*10 + 5) * rotated.scale / safeZoom, 0, Math.PI*2);
                        ctx.fill();
                    }
                }
                
                ctx.restore();
            }
        }
    }

    renderMegaStructures(ctx, time) {
        if (!this.game.warpGateManager) return;
        
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const rotCenterX = center.x;
        const rotCenterY = center.y;
        const ship = this.game.playerShip;

        this.game.warpGateManager.gates.forEach(struct => {
            // Distance culling
            const dx = struct.x - ship.x;
            const dy = struct.y - ship.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 20000 * 20000) return;

            const rotated = this.game.physicsManager.rotate3D(struct.x, struct.y, struct.z || 0, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

            ctx.save();
            ctx.translate(rx, ry);

            if (struct.structType === 'gate') {
                this.drawWarpGate(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'dyson') {
                this.drawDysonSwarm(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'ring') {
                this.drawRingWorld(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'beacon') {
                this.drawGreatBeacon(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'gateway') {
                this.drawAncientGateway(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'outpost') {
                this.drawDeepSpaceOutpost(ctx, struct, time, rScale, safeZoom);
            }

            ctx.restore();
            
            // Label
            ctx.save();
            ctx.translate(rx, ry + (struct.radius || 300) * rScale / safeZoom + 100);
            const labelColors = {
                dyson: '#FFD700',
                ring: '#00FF7F',
                beacon: '#ffffff',
                gateway: '#9300ff',
                outpost: '#00f3ff'
            };
            ctx.fillStyle = labelColors[struct.structType] || '#00f3ff';
            ctx.font = `bold ${14 / safeZoom}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.fillText(`${struct.structType.toUpperCase()}: ${struct.name.toUpperCase()}`, 0, 0);
            ctx.restore();
        });
    }

    drawWarpGate(ctx, gate, time, rScale, safeZoom) {
        const isHero = (gate.x === 0 && gate.y === 0);
        const baseSize = (isHero ? 450 : 300) * rScale / safeZoom;
        const pulse = (Math.sin(time * 0.002) + 1) / 2;
        ctx.rotate(gate.rotation);

        // 1. OUTER ENERGY FIELD (Enhanced for Hero)
        const fieldSize = isHero ? 3.5 : 2.5;
        const grad = this.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, baseSize * 1.5, [
            { offset: 0, color: isHero ? `rgba(0, 243, 255, ${0.6 + pulse * 0.3})` : `rgba(0, 243, 255, ${0.4 + pulse * 0.2})` },
            { offset: 0.5, color: isHero ? 'rgba(0, 150, 255, 0.2)' : 'rgba(0, 100, 255, 0.1)' },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // 2. HERO FEATURE: TRIPLE ENERGY RINGS (Enhanced Polish)
        if (isHero) {
            for (let i = 0; i < 3; i++) {
                ctx.save();
                const rotSpeed = time * 0.001 * (i + 1) * (i % 2 === 0 ? 1 : -1);
                ctx.rotate(rotSpeed);
                const r = baseSize * (1.5 + i * 0.45);
                
                // Ring Glow
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'rgba(0, 243, 255, 0.6)';
                
                const ringGrad = ctx.createLinearGradient(-r, 0, r, 0);
                ringGrad.safeAddColorStop(0, 'rgba(0, 243, 255, 0.9)');
                ringGrad.safeAddColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
                ringGrad.safeAddColorStop(1, 'rgba(0, 243, 255, 0.9)');
                
                ctx.strokeStyle = ringGrad;
                ctx.lineWidth = (6 + i * 2) / safeZoom;
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 1.65);
                ctx.stroke();

                // Secondary Orbitals for "Hero" feel
                ctx.rotate(time * 0.002);
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(r, 0, 5 / safeZoom, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
            
            // Volumetric Field Pulse
            const fieldPulse = Math.sin(time * 0.004) * 0.1 + 0.2;
            const fieldGrad = ctx.createRadialGradient(0, 0, baseSize * 1.2, 0, 0, baseSize * 3);
            fieldGrad.safeAddColorStop(0, 'transparent');
            fieldGrad.safeAddColorStop(0.5, `rgba(0, 243, 255, ${fieldPulse})`);
            fieldGrad.safeAddColorStop(1, 'transparent');
            ctx.fillStyle = fieldGrad;
            ctx.beginPath();
            ctx.arc(0, 0, baseSize * 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // 3. GEOMETRIC SINGULARITY
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 4 / safeZoom;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const r = baseSize * (1.2 + Math.sin(time * 0.005 + i) * 0.1);
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
            ctx.lineTo(Math.cos(angle + Math.PI/3) * r, Math.sin(angle + Math.PI/3) * r);
            ctx.stroke();
        }

        // 4. CORE
        ctx.fillStyle = isHero ? '#fff' : '#fff';
        if (isHero) {
            ctx.shadowBlur = 40 * rScale;
            ctx.shadowColor = '#00f3ff';
        }
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * (isHero ? 0.5 : 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    drawInfinityGate(ctx, gate, time, rScale, safeZoom) {
        const baseSize = 600 * rScale / safeZoom;
        const pulse = (Math.sin(time * 0.004) + 1) / 2;
        ctx.rotate(gate.rotation * 1.2);

        // 1. PRISMATIC SINGULARITY
        let grad;
        if (this.game && this.getGradient) {
            grad = this.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, baseSize * 3, [
                { offset: 0, color: '#fff' },
                { offset: 0.1, color: `hsla(${(time * 0.1) % 360}, 100%, 50%, 0.8)` },
                { offset: 0.4, color: 'rgba(0, 0, 0, 1)' },
                { offset: 1, color: 'transparent' }
            ]);
        } else {
            grad = ctx.createRadialGradient(0, 0, 0, 0, 0, baseSize * 3);
            grad.addColorStop(0, '#fff');
            grad.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 4, 0, Math.PI * 2);
        ctx.fill();

        // 2. COUNTER-ROTATING PRISMATIC RINGS
        for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate(-time * 0.001 * (i + 1));
            const r = baseSize * (1.5 + i * 0.5);
            ctx.strokeStyle = `hsla(${(time * 0.05 + i * 90) % 360}, 100%, 70%, 0.6)`;
            ctx.lineWidth = 15 / safeZoom;
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 1.8);
            ctx.stroke();
            ctx.restore();
        }

        // 3. CORE "MIRROR" EFFECT
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Add "mini stars" inside the core mirror
        ctx.fillStyle = '#fff';
        for(let j=0; j<10; j++) {
            const rx = (Math.random()-0.5) * baseSize;
            const ry = (Math.random()-0.5) * baseSize;
            if (Math.hypot(rx, ry) < baseSize * 0.7) {
                ctx.fillRect(rx, ry, 2/safeZoom, 2/safeZoom);
            }
        }
    }

    drawAncientGateway(ctx, gate, time, rScale, safeZoom) {
        const baseSize = 400 * rScale / safeZoom;
        const pulse = (Math.sin(time * 0.003) + 1) / 2;
        ctx.rotate(gate.rotation * 0.8);

        // 1. VOID EVENT HORIZON
        const grad = this.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, baseSize * 2.5, [
            { offset: 0, color: '#000' },
            { offset: 0.3, color: `rgba(147, 0, 255, ${0.4 + pulse * 0.2})` },
            { offset: 0.7, color: 'rgba(75, 0, 130, 0.1)' },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // 2. ORNATE ANCIENT RINGS
        ctx.strokeStyle = '#DAA520'; // Goldenrod
        ctx.lineWidth = 10 / safeZoom;
        for (let i = 0; i < 3; i++) {
            ctx.save();
            ctx.rotate(time * 0.0005 * (i + 1));
            const r = baseSize * (1.2 + i * 0.3);
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 1.7);
            ctx.stroke();
            ctx.restore();
        }
    }

    drawDeepSpaceOutpost(ctx, outpost, time, rScale, safeZoom) {
        const baseSize = 450 * rScale / safeZoom;
        ctx.rotate(outpost.rotation);

        // 1. ATTACHMENT HUB
        ctx.fillStyle = '#1a1a1a';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 4 / safeZoom;
        ctx.beginPath();
        ctx.rect(-baseSize*0.2, -baseSize*0.2, baseSize*0.4, baseSize*0.4);
        ctx.fill(); ctx.stroke();

        // 2. ROTATING HABITATION RING
        ctx.save();
        ctx.rotate(-time * 0.0003);
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 20 / safeZoom;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        
        // Window lights
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3 / safeZoom;
        ctx.setLineDash([8, 22]);
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    drawDysonSwarm(ctx, swarm, time, rScale, safeZoom) {
        const baseSize = swarm.radius * rScale / safeZoom;
        
        swarm.panels.forEach((p, i) => {
            const rx = Math.cos(p.angle) * p.orbitRadius * rScale / safeZoom;
            const ry = Math.sin(p.angle) * p.orbitRadius * rScale / safeZoom * 0.3; // Elliptical perspective
            
            ctx.save();
            ctx.translate(rx, ry);
            ctx.rotate(p.angle + Math.PI/2 + p.tilt);
            
            // Solar Panel
            ctx.fillStyle = '#FFD700'; // Gold
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FFD700';
            ctx.globalAlpha = 0.8;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
            
            // Energy Ray towards star
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
            ctx.setLineDash([5, 10]);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-rx, -ry);
            ctx.stroke();
            
            ctx.restore();
        });
    }

    drawRingWorld(ctx, ring, time, rScale, safeZoom) {
        const r = ring.radius * rScale / safeZoom;
        const w = ring.width * rScale / safeZoom;
        
        ctx.rotate(ring.rotation);
        
        // 1. MAIN RING STRUCTURE
        ctx.strokeStyle = '#2F4F4F'; // Dark Slate Gray
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // 2. INNER GLOWING CITIES
        ctx.strokeStyle = '#00FF7F'; // Spring Green
        ctx.lineWidth = 4 / safeZoom;
        ctx.setLineDash([20, 40]);
        ctx.lineDashOffset = -time * 0.05;
        ctx.beginPath();
        ctx.ellipse(0, 0, r - w/3, (r - w/3) * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();

        // 3. ATMOSPHERIC EDGE
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.2)';
        ctx.lineWidth = w * 1.2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    drawGreatBeacon(ctx, beacon, time, rScale, safeZoom) {
        const baseSize = 500 * rScale / safeZoom;
        const pulse = (Math.sin(time * 0.003) + 1) / 2;
        const charge = beacon.charge || 0;
        
        ctx.rotate(beacon.rotation);

        // 1. MASSIVE AURA
        const auraGrad = this.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, baseSize * (2 + charge * 3), [
            { offset: 0, color: `rgba(255, 255, 255, ${0.4 + pulse * 0.2 + charge * 0.4})` },
            { offset: 0.5, color: `rgba(0, 243, 255, ${0.1 + charge * 0.2})` },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * (2 + charge * 3), 0, Math.PI * 2);
        ctx.fill();


        // 2. THE BEAM (Vertical Signal)
        const beamWidth = (40 + Math.sin(time * 0.01) * 20 + charge * 60) * rScale / safeZoom;
        const beamHeight = 5000 * rScale / safeZoom;
        const beamGrad = this.getGradient(ctx, 'linear', -beamWidth/2, 0, beamWidth/2, 0, 0, 0, [
            { offset: 0, color: 'transparent' },
            { offset: 0.5, color: `rgba(255, 255, 255, ${0.8 + charge * 0.2})` },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = beamGrad;

        ctx.fillRect(-beamWidth/2, -beamHeight/2, beamWidth, beamHeight);

        // 3. CHARGING RINGS
        if (charge > 0) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = (2 + charge * 5) / safeZoom;
            for (let i = 0; i < 3; i++) {
                const r = baseSize * (0.5 + i * 0.3 + charge * 0.5);
                const a = (1 - (r / (baseSize * 2))) * charge;
                ctx.globalAlpha = a;
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;
        }

        // 4. THE CORE
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 20 * (1 + charge * 2);
        ctx.shadowColor = '#00f3ff';
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 0.2, 0, Math.PI * 2);
        ctx.fill();
    }

    // === AI & SIMULATION RENDERING (Phase 17-3) ===
    renderAIElements(ctx, time) {
        const ai = this.game.aiManager;
        if (!ai) return;

        const center = (this.game.physicsManager && this.game.physicsManager.getConstellationCenter) ? 
                       this.game.physicsManager.getConstellationCenter() : 
                       (this.game._cachedRotationCenter || { x: 0, y: 0 });
                       
        const safeZoom = Math.max(0.01, (this.game.camera && this.game.camera.zoom) ? this.game.camera.zoom : 1);

        // 1. Trade Routes (Between friendly bases)
        if (this.game.spaceBases.length > 1) {
            ctx.save();
            ctx.strokeStyle = 'rgba(0, 255, 170, 0.1)';
            ctx.setLineDash([10, 20]);
            ctx.lineWidth = 1 / safeZoom;
            
            for (let i = 0; i < this.game.spaceBases.length; i++) {
                const b1 = this.game.spaceBases[i];
                for (let j = i + 1; j < this.game.spaceBases.length; j++) {
                    const b2 = this.game.spaceBases[j];
                    const r1 = this.game.physicsManager.rotate3D(b1.x, b1.y, 0, center.x, center.y);
                    const r2 = this.game.physicsManager.rotate3D(b2.x, b2.y, 0, center.x, center.y);
                    
                    ctx.beginPath();
                    ctx.moveTo(r1.x, r1.y);
                    ctx.lineTo(r2.x, r2.y);
                    ctx.stroke();
                }
            }
            ctx.restore();
        }

        // 2. Rival Outposts
        ai.outposts.forEach(outpost => {
            const rotated = this.game.physicsManager.rotate3D(outpost.x, outpost.y, outpost.z || 0, center.x, center.y);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            
            ctx.save();
            ctx.translate(rx, ry);
            
            // Core
            const pulse = (Math.sin(time * 0.003) + 1) / 2;
            const size = 150 * rScale / safeZoom;
            
            const grad = this.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size, [
                { offset: 0, color: outpost.color },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = grad;
            ctx.globalAlpha = 0.6 + pulse * 0.2;
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();

            
            // Label
            ctx.fillStyle = outpost.color;
            ctx.font = `${10 / safeZoom}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.fillText(outpost.name.toUpperCase(), 0, size + 20);
            
            ctx.restore();
        });

        // 3. Rival Ships
        ai.ships.forEach(s => {
            const rotated = this.game.physicsManager.rotate3D(s.x, s.y, 0, center.x, center.y);
            const rScale = rotated.scale;
            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            ctx.rotate(s.rotation);
            
            // Elegant Needle Shape
            const size = (s.size || 25) * rScale / safeZoom;
            ctx.fillStyle = s.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = s.color;
            
            ctx.beginPath();
            ctx.moveTo(size * 0.8, 0); 
            ctx.lineTo(-size * 0.4, size * 0.3);
            ctx.lineTo(-size * 0.2, 0);
            ctx.lineTo(-size * 0.4, -size * 0.3);
            ctx.closePath();
            ctx.fill();
            
            // Engines
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 0.5 + Math.random() * 0.5;
            ctx.beginPath();
            ctx.arc(-size * 0.3, 0, size * 0.15, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });

        // 4. AI Projectiles (Elegant Needle-Beams)
        if (ai.projectiles) {
            ai.projectiles.forEach(p => {
                const rotated = this.game.physicsManager.rotate3D(p.x, p.y, 0, center.x, center.y);
                const rScale = rotated.scale;
                
                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                ctx.rotate(p.rotation);
                
                // Needle beam trail
                const beamLen = 60 * rScale / safeZoom;
                const beamWidth = 2 / safeZoom;
                
                const grad = ctx.createLinearGradient(0, 0, -beamLen, 0);
                grad.safeAddColorStop(0, '#fff');
                grad.safeAddColorStop(0.2, p.color);
                grad.safeAddColorStop(1, 'transparent');
                
                ctx.strokeStyle = grad;
                ctx.lineWidth = beamWidth;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-beamLen, 0);
                ctx.stroke();
                
                // Head glow
                ctx.fillStyle = '#fff';
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
                ctx.beginPath();
                ctx.arc(0, 0, 1.5 / safeZoom, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            });
        }
    }


    renderSectorJumpEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        const progress = effect.progress || 0;
        const canvas = this.game.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // 1. Deep Space Void
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. The Warp Tunnel
        if (effect.phase === 'entrance' || effect.phase === 'tunnel' || effect.phase === 'flash_out') {
            ctx.globalCompositeOperation = 'screen';
            
            const particles = effect.particles || [];
            const tunnelZ = 1000;
            const stretch = effect.warpStretch || 1.0;

            particles.forEach((p, i) => {
                const z = p.z;
                if (z <= 0) return;

                // Perspective projection
                const scale = 500 / z;
                const x = centerX + Math.cos(p.angle) * p.radius * scale;
                const y = centerY + Math.sin(p.angle) * p.radius * scale * 0.8; // Ellipse

                const size = p.size * scale;
                const alpha = Math.min(1, (tunnelZ - z) / 200);
                
                // Draw Streak
                const hue = (p.hue + (effect.hueShift || 0)) % 360;
                const grad = ctx.createLinearGradient(
                    x, y, 
                    x - Math.cos(p.angle) * size * stretch, 
                    y - Math.sin(p.angle) * size * stretch
                );
                this.safeAddColorStop(grad, 0, `hsla(${hue}, 100%, 80%, ${alpha})`);
                this.safeAddColorStop(grad, 1, 'transparent');

                ctx.strokeStyle = grad;
                ctx.lineWidth = Math.max(1, size * 0.2);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x - Math.cos(p.angle) * size * stretch, y - Math.sin(p.angle) * size * stretch);
                ctx.stroke();
            });
            ctx.globalCompositeOperation = 'source-over';
        }

        // 3. Screen Distortion (Chromatic Aberration feel)
        if (effect.phase === 'tunnel') {
            const shift = Math.sin(time * 0.01) * 10;
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = 'rgba(255, 0, 255, 0.1)';
            ctx.fillRect(shift, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
            ctx.fillRect(-shift, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1.0;
        }

        // 4. Whiteout Flash
        if (effect.flashIntensity > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${effect.flashIntensity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.restore();
    }

    renderBlackHoleEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        const progress = effect.progress || 0;
        const canvas = this.game.canvas;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxDim = Math.max(canvas.width, canvas.height);

        // ==========================================
        // CONTINUOUS ZOOM EFFECT
        // Zoom increases throughout pull-in and subatomic phases
        // ==========================================
        let zoomScale = 1;
        if (progress < 0.45) {
            // Phase 1: Progressive zoom into the central atom (1x → 5x)
            const p = progress / 0.45;
            zoomScale = 1 + Math.pow(p, 2) * 4; // Quad curve for smoother start, fast finish
        } else if (progress < 0.6) {
            // Phase 2: Deep zoom into the subatomic nucleus (5x → 12x)
            const p = (progress - 0.45) / 0.15;
            zoomScale = 5 + Math.pow(p, 0.8) * 7;
        } else if (progress < 0.88) {
            // Phase 2.5: Zoom peaks during implosion (12x → 20x)
            const p = (progress - 0.6) / 0.28;
            zoomScale = 12 + p * 8;
        } else {
            // Phase 3-4: Zoom holds then slowly resets
            const p = (progress - 0.88) / 0.12;
            zoomScale = 20 - p * 19; // Returns to 1x
        }

        // Apply zoom by scaling from center
        ctx.translate(centerX, centerY);
        ctx.scale(zoomScale, zoomScale);
        ctx.translate(-centerX, -centerY);

        // ==========================================
        // PHASE 1: BEING SUCKED INTO THE BLACK HOLE (0-45%)
        // Creates immersive feeling of moving toward the black hole
        // ==========================================
        if (progress < 0.45) {
            const p = progress / 0.45;

            // Acceleration curve - starts slow, gets exponentially faster
            const acceleration = Math.pow(p, 1.5);

            // Dark space background with intensifying vignette (tunnel vision effect)
            const vignetteIntensity = 0.3 + p * 0.7; // Gets darker at edges as you're pulled in
            const tunnelBg = this.getGradient(ctx, 'radial', centerX, centerY, 0, centerX, centerY, maxDim, [
                { offset: 0, color: 'rgba(0, 0, 0, 1)' },
                { offset: 0.1 + (1 - p) * 0.2, color: 'rgba(5, 0, 15, 0.98)' },
                { offset: 0.4, color: `rgba(15, 5, 35, ${vignetteIntensity})` },
                { offset: 0.7, color: `rgba(10, 0, 25, ${vignetteIntensity})` },
                { offset: 1, color: 'rgba(0, 0, 0, 1)' }
            ]);
            ctx.fillStyle = tunnelBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // STARS RUSHING PAST (being sucked in with you)
            // Creates the feeling of forward motion
            // ============================================
            const starSpeed = 3 + acceleration * 15; // Accelerates dramatically
            for (let star = 0; star < 200; star++) {
                // Stars originate from edges and rush toward center
                const baseAngle = (star / 200) * Math.PI * 2 + (star * 0.618);
                const starAngle = baseAngle + Math.sin(time * 0.001 + star) * 0.1;

                // Distance cycles inward - creates flowing motion toward center
                const cycleSpeed = (4 + (star % 6) * 1.5) * starSpeed * 0.003;
                const distanceCycle = ((time * cycleSpeed + star * 47) % 100) / 100;
                const starDist = maxDim * (0.1 + distanceCycle * 0.9); // From edges to near center

                // Stars stretch as they accelerate inward (relativistic effect)
                const stretchFactor = 1 + acceleration * 3 * (1 - distanceCycle);
                const trailLength = 10 + stretchFactor * 40 * distanceCycle;

                const x = centerX + Math.cos(starAngle) * starDist;
                const y = centerY + Math.sin(starAngle) * starDist * 0.6; // Elliptical for depth

                // Stars get brighter as they pass by
                const brightness = 0.3 + (1 - distanceCycle) * 0.7;
                const hue = 200 + (star % 60); // Blue-purple spectrum

                // Draw star with motion trail toward center
                const trailEndX = centerX + Math.cos(starAngle) * (starDist - trailLength);
                const trailEndY = centerY + Math.sin(starAngle) * (starDist - trailLength) * 0.6;

                const starGrad = this.getGradient(ctx, 'linear', x, y, trailEndX, trailEndY, [
                    { offset: 0, color: `hsla(${hue}, 80%, 80%, ${brightness * 0.1})` },
                    { offset: 0.3, color: `hsla(${hue}, 90%, 90%, ${brightness * 0.8})` },
                    { offset: 1, color: `hsla(${hue}, 100%, 100%, ${brightness})` }
                ]);
                ctx.strokeStyle = starGrad;

                ctx.lineWidth = 1 + (star % 3) * 0.5;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(trailEndX, trailEndY);
                ctx.stroke();
            }

            // ============================================
            // LIGHT RAYS BENDING INWARD (gravitational lensing)
            // Light curves toward the black hole
            // ============================================
            for (let ray = 0; ray < 24; ray++) {
                const rayAngle = (ray / 24) * Math.PI * 2 + time * 0.0008;
                const rayPulse = 0.6 + Math.sin(time * 0.004 + ray * 0.4) * 0.4;

                // Rays curve inward more as animation progresses
                const curveFactor = p * 0.4;
                const rayStartDist = maxDim * 0.95;
                const rayEndDist = maxDim * (0.3 - p * 0.25); // Gets pulled closer to center

                const startX = centerX + Math.cos(rayAngle) * rayStartDist;
                const startY = centerY + Math.sin(rayAngle) * rayStartDist * 0.5;
                const endX = centerX + Math.cos(rayAngle) * rayEndDist;
                const endY = centerY + Math.sin(rayAngle) * rayEndDist * 0.5;

                // Control point for curve (bends toward center)
                const controlDist = (rayStartDist + rayEndDist) / 2 * (1 - curveFactor);
                const controlX = centerX + Math.cos(rayAngle) * controlDist;
                const controlY = centerY + Math.sin(rayAngle) * controlDist * 0.5;

                const rayGrad = this.getGradient(ctx, 'linear', startX, startY, endX, endY, [
                    { offset: 0, color: 'transparent' },
                    { offset: 0.3, color: `rgba(180, 200, 255, ${0.15 * rayPulse})` },
                    { offset: 0.6, color: `rgba(220, 230, 255, ${0.3 * rayPulse * p})` },
                    { offset: 1, color: `rgba(255, 255, 255, ${0.5 * rayPulse * acceleration})` }
                ]);
                ctx.strokeStyle = rayGrad;

                ctx.lineWidth = 8 + ray % 5;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.quadraticCurveTo(controlX, controlY, endX, endY);
                ctx.stroke();
            }

            // ============================================
            // DEBRIS/MATTER BEING PULLED IN
            // Chunks of matter streaming toward the void
            // ============================================
            for (let debris = 0; debris < 80; debris++) {
                const debrisAngle = (debris / 80) * Math.PI * 2 + debris * 1.3;
                const debrisSpeed = (3 + debris % 5) * starSpeed * 0.004;
                const debrisCycle = ((time * debrisSpeed + debris * 73) % 100) / 100;
                const debrisDist = maxDim * (0.05 + debrisCycle * 0.85);

                const x = centerX + Math.cos(debrisAngle) * debrisDist;
                const y = centerY + Math.sin(debrisAngle) * debrisDist * 0.55;

                // Debris glows hot as it's compressed
                const heat = 0.4 + (1 - debrisCycle) * 0.6;
                const size = 2 + (debris % 4) + acceleration * 3 * (1 - debrisCycle);

                // Hot orange-red debris
                const debrisGrad = this.getGradient(ctx, 'radial', x, y, 0, x, y, size * 2, [
                    { offset: 0, color: `rgba(255, 200, 100, ${heat})` },
                    { offset: 0.4, color: `rgba(255, 120, 50, ${heat * 0.6})` },
                    { offset: 1, color: 'transparent' }
                ]);

                ctx.fillStyle = debrisGrad;

                ctx.beginPath();
                ctx.arc(x, y, size * 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // ============================================
            // ACCRETION DISK (spiraling matter around black hole)
            // ============================================
            for (let ring = 0; ring < 15; ring++) {
                const ringRadius = 50 + ring * 25 * (1 - p * 0.3);
                const ringRotation = time * (0.003 - ring * 0.0002) + ring * 0.5;
                const ringAlpha = (0.5 - ring * 0.025) * Math.min(1, p * 2);

                // Draw multiple arcs for spiral effect
                for (let arc = 0; arc < 3; arc++) {
                    const arcStart = ringRotation + arc * (Math.PI * 2 / 3);
                    const arcEnd = arcStart + Math.PI * 0.8;

                    const arcGrad = this.getGradient(ctx, 'radial', centerX, centerY, ringRadius * 0.8, centerX, centerY, ringRadius * 1.2, [
                        { offset: 0, color: `rgba(255, 150, 50, ${ringAlpha})` },
                        { offset: 0.5, color: `rgba(255, 100, 30, ${ringAlpha * 0.8})` },
                        { offset: 1, color: 'transparent' }
                    ]);
                    ctx.strokeStyle = arcGrad;

                    ctx.lineWidth = 12 - ring * 0.5;
                    ctx.beginPath();
                    ctx.ellipse(centerX, centerY, ringRadius, ringRadius * 0.35, 0, arcStart, arcEnd);
                    ctx.stroke();
                }
            }

            // (Central void removed per user request)

            // ============================================
            // TUNNEL PARTICLES (additional depth) - transitioning to subatomic
            // ============================================
            if (effect.tunnelParticles) {
                for (const particle of effect.tunnelParticles) {
                    // Move particles toward center over time
                    particle.z -= starSpeed * 2;
                    if (particle.z < -500) particle.z = 1500;

                    const perspectiveScale = 550 / (550 + particle.z);
                    const x = centerX + Math.cos(particle.angle) * particle.radius * perspectiveScale;
                    const y = centerY + Math.sin(particle.angle) * particle.radius * perspectiveScale * 0.55;
                    const size = 6 * perspectiveScale * particle.brightness;

                    if (size < 1) continue;

                    // Blue-cyan particles only
                    const particleHue = 180 + (particle.hue % 50);
                    const grad = this.getGradient(ctx, 'radial', x, y, 0, x, y, size * 1.8, [
                        { offset: 0, color: `hsla(${particleHue}, 100%, 85%, ${particle.brightness * perspectiveScale})` },
                        { offset: 0.6, color: `hsla(${particleHue + 15}, 100%, 60%, ${particle.brightness * perspectiveScale * 0.4})` },
                        { offset: 1, color: 'transparent' }
                    ]);
                    ctx.fillStyle = grad;

                    ctx.beginPath();
                    ctx.arc(x, y, size * 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ============================================
            // CENTRALLY PEERING ATOM (Visible from distance)
            // ============================================
            const atomAlpha = Math.pow(p, 2.5); // Emerges as we approach the event horizon
            const atomSize = 40 + p * 10; // Grows to match Phase 2 starting size (50)

            ctx.save();
            ctx.globalAlpha = atomAlpha;
            ctx.fillStyle = this.getGradient(ctx, 'radial', centerX, centerY, 0, centerX, centerY, atomSize, [
                { offset: 0, color: '#fff' },
                { offset: 0.3, color: '#b4e6ff' },
                { offset: 0.6, color: 'rgba(0, 150, 255, 0.3)' },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.beginPath();
            ctx.arc(centerX, centerY, atomSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 2: SUBATOMIC STRUCTURE (45-60%)
        // Seamless transition from being sucked in to penetrating subatomic level
        // Feels like falling into the quantum structure of the black hole
        // ==========================================
        if (progress >= 0.45 && progress < 0.6) {
            const p = (progress - 0.45) / 0.15;
            const atomicSpeed = 1 + p * 2;

            // Deep black void background - we're inside now
            const subatomicBg = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxDim);
            subatomicBg.safeAddColorStop(0, 'rgba(0, 0, 0, 1)');
            subatomicBg.safeAddColorStop(0.4, 'rgba(0, 5, 15, 0.98)');
            subatomicBg.safeAddColorStop(0.8, 'rgba(0, 0, 5, 1)');
            subatomicBg.safeAddColorStop(1, 'rgba(0, 0, 0, 1)');
            ctx.fillStyle = subatomicBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // ELECTRON ORBITAL SHELLS (rushing toward us)
            // Like atoms zooming past at subatomic scale
            // ============================================
            for (let shell = 0; shell < 30; shell++) {
                const shellSpeed = (3 + shell * 0.2) * atomicSpeed;
                const shellZ = ((time * shellSpeed * 0.004 + shell * 60) % 900);
                const perspective = 500 / (500 + shellZ);

                if (perspective < 0.08) continue;

                const orbitalRadius = (100 + shell * 15) * perspective;
                const shellAlpha = (0.5 + Math.sin(time * 0.006 + shell * 0.4) * 0.3) * perspective;

                // Blue-cyan electron shells
                ctx.strokeStyle = `hsla(${190 + shell % 30}, 100%, 70%, ${shellAlpha * 0.5})`;
                ctx.lineWidth = 1.5 + perspective * 3;
                ctx.beginPath();

                // Tilted orbital - more 3D feeling
                const tilt = 0.3 + Math.sin(shell * 0.5) * 0.2;
                ctx.ellipse(
                    centerX + Math.sin(time * 0.001 + shell) * 5 * perspective,
                    centerY,
                    orbitalRadius,
                    orbitalRadius * tilt,
                    time * 0.0005 + shell * 0.2,
                    0, Math.PI * 2
                );
                ctx.stroke();

                // Electrons orbiting on the shell
                const numElectrons = 2 + (shell % 4);
                for (let e = 0; e < numElectrons; e++) {
                    const electronAngle = time * 0.008 * atomicSpeed + (e / numElectrons) * Math.PI * 2 + shell;
                    const ex = centerX + Math.cos(electronAngle) * orbitalRadius;
                    const ey = centerY + Math.sin(electronAngle) * orbitalRadius * tilt;
                    const eSize = 3 + perspective * 4;

                    const eGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, eSize * 2);
                    eGrad.safeAddColorStop(0, `hsla(200, 100%, 90%, ${shellAlpha})`);
                    eGrad.safeAddColorStop(0.5, `hsla(210, 100%, 70%, ${shellAlpha * 0.6})`);
                    eGrad.safeAddColorStop(1, 'transparent');
                    ctx.fillStyle = eGrad;
                    ctx.beginPath();
                    ctx.arc(ex, ey, eSize * 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ============================================
            // ENERGY BONDS (connecting structures)
            // Like chemical bonds between atoms
            // ============================================
            for (let bond = 0; bond < 60; bond++) {
                const bondAngle = (bond / 60) * Math.PI * 2 + time * 0.002;
                const bondSpeed = (4 + bond % 6) * atomicSpeed;
                const bondZ = ((time * bondSpeed * 0.006 + bond * 31) % 700);
                const perspective = 450 / (450 + bondZ);

                if (perspective < 0.12) continue;

                const bondRadius = 80 + (bond % 12) * 25;
                const x1 = centerX + Math.cos(bondAngle) * bondRadius * perspective;
                const y1 = centerY + Math.sin(bondAngle) * bondRadius * perspective * 0.5;
                const x2 = centerX + Math.cos(bondAngle + 0.3) * bondRadius * perspective * 0.6;
                const y2 = centerY + Math.sin(bondAngle + 0.3) * bondRadius * perspective * 0.5 * 0.6;

                const bondAlpha = perspective * (0.4 + Math.sin(time * 0.008 + bond) * 0.2);

                const bondGrad = ctx.createLinearGradient(x1, y1, x2, y2);
                bondGrad.safeAddColorStop(0, `hsla(200, 100%, 80%, ${bondAlpha * 0.3})`);
                bondGrad.safeAddColorStop(0.5, `hsla(190, 100%, 90%, ${bondAlpha * 0.8})`);
                bondGrad.safeAddColorStop(1, `hsla(180, 100%, 85%, ${bondAlpha * 0.4})`);

                ctx.strokeStyle = bondGrad;
                ctx.lineWidth = 1 + perspective * 1.5;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // ============================================
            // CENTRAL NUCLEUS (pulsating core)
            // The heart of the subatomic structure
            // ============================================
            const nucleusSize = 50 + p * 30 + Math.sin(time * 0.01) * 10;
            const nucleusPulse = 0.7 + Math.sin(time * 0.012) * 0.3;

            // Inner glow
            const nucleusGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, nucleusSize);
            nucleusGrad.safeAddColorStop(0, `rgba(255, 255, 255, ${0.9 * nucleusPulse})`);
            nucleusGrad.safeAddColorStop(0.3, `rgba(200, 230, 255, ${0.7 * nucleusPulse})`);
            nucleusGrad.safeAddColorStop(0.6, `rgba(100, 180, 255, ${0.4 * nucleusPulse})`);
            nucleusGrad.safeAddColorStop(1, 'transparent');

            ctx.fillStyle = nucleusGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, nucleusSize, 0, Math.PI * 2);
            ctx.fill();

            // Time dilation text effect (Legacy touch)
            if (Math.floor(time / 2000) % 2 === 0) {
                ctx.fillStyle = `rgba(150, 200, 255, ${0.4 * (1 - p)})`;
                ctx.font = "italic 18px monospace";
                ctx.textAlign = "center";
                ctx.fillText("TRAVERSING SINGULARITY", centerX, centerY - nucleusSize - 40);
                ctx.fillText("TIME DILATION IN EFFECT", centerX, centerY + nucleusSize + 40);
            }

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 2.5: IMPLOSION (60-75%)
        // Everything collapses violently to a singularity
        // ==========================================
        if (progress >= 0.6 && progress < 0.88) {
            const p = (progress - 0.6) / 0.28;
            const implosionIntensity = Math.pow(p, 0.7);

            // Darkening void as everything compresses
            ctx.fillStyle = `rgba(0, 0, 0, ${0.85 + p * 0.15})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // COLLAPSING MATTER SHELL
            // Everything rushing toward center
            // ============================================
            for (let shell = 0; shell < 25; shell++) {
                const collapseProgress = Math.min(1, p * 1.5 + shell * 0.02);
                const shellRadius = maxDim * 0.8 * (1 - Math.pow(collapseProgress, 0.6));

                if (shellRadius < 20) continue;

                const shellAlpha = (1 - collapseProgress) * 0.6;

                // Blue-white collapsing shells
                ctx.strokeStyle = `rgba(180, 220, 255, ${shellAlpha})`;
                ctx.lineWidth = 3 * (1 - collapseProgress * 0.7);
                ctx.beginPath();
                ctx.arc(centerX, centerY, shellRadius, 0, Math.PI * 2);
                ctx.stroke();
            }

            // ============================================
            // STREAKING MATTER (being pulled to center)
            // ============================================
            for (let streak = 0; streak < 80; streak++) {
                const streakAngle = (streak / 80) * Math.PI * 2 + streak * 0.37;
                const collapseP = Math.min(1, p * 1.2);
                const streakDist = maxDim * (1 - collapseP) * (0.2 + (streak % 10) * 0.08);

                if (streakDist < 30) continue;

                const x = centerX + Math.cos(streakAngle) * streakDist;
                const y = centerY + Math.sin(streakAngle) * streakDist * 0.5;
                const trailLength = 40 + implosionIntensity * 80;
                const endX = centerX + Math.cos(streakAngle) * (streakDist - trailLength);
                const endY = centerY + Math.sin(streakAngle) * (streakDist - trailLength) * 0.5;

                const streakAlpha = (1 - p * 0.6) * (0.4 + (streak % 5) * 0.1);

                const streakGrad = ctx.createLinearGradient(x, y, endX, endY);
                streakGrad.safeAddColorStop(0, `rgba(150, 200, 255, ${streakAlpha * 0.2})`);
                streakGrad.safeAddColorStop(0.5, `rgba(200, 230, 255, ${streakAlpha * 0.7})`);
                streakGrad.safeAddColorStop(1, `rgba(255, 255, 255, ${streakAlpha})`);

                ctx.strokeStyle = streakGrad;
                ctx.lineWidth = 2 + (streak % 3);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            // ============================================
            // SINGULARITY CORE (building up to explosion)
            // ============================================
            const coreSize = 30 + implosionIntensity * 100;
            const coreIntensity = 0.5 + implosionIntensity * 0.5;

            // Intensifying central point
            const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
            coreGrad.safeAddColorStop(0, `rgba(255, 255, 255, ${coreIntensity})`);
            coreGrad.safeAddColorStop(0.3, `rgba(220, 240, 255, ${coreIntensity * 0.8})`);
            coreGrad.safeAddColorStop(0.6, `rgba(150, 200, 255, ${coreIntensity * 0.4})`);
            coreGrad.safeAddColorStop(1, 'transparent');

            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 3: WHITE FLASH (88-92%)
        // Violent release of energy - complete white (Now very quick)
        // ==========================================
        if (progress >= 0.88 && progress < 0.92) {
            const p = (progress - 0.88) / 0.04;

            // Sharp ramp to full white
            const whiteIntensity = p < 0.2 ? Math.pow(p / 0.2, 0.5) : 1.0;

            // Complete solid white
            ctx.fillStyle = `rgba(255, 255, 255, ${whiteIntensity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ensure complete obfuscation
            if (whiteIntensity >= 0.8) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 4: WHITE FADES TO REVEAL NEW LOCATION (92-100%)
        // ==========================================
        if (progress >= 0.92) {
            const p = (progress - 0.92) / 0.08;
            const fadeAlpha = Math.pow(1 - p, 1.2);

            // White overlay fading away to reveal the universe
            ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Residual glow at center as transition completes
            if (fadeAlpha > 0.1) {
                const glowSize = maxDim * 0.3 * fadeAlpha;
                const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
                glowGrad.safeAddColorStop(0, `rgba(255, 255, 255, ${fadeAlpha})`);
                glowGrad.safeAddColorStop(0.5, `rgba(200, 220, 255, ${fadeAlpha * 0.5})`);
                glowGrad.safeAddColorStop(1, 'transparent');
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }


    drawBackgroundElements() {
        return; // NUCLEAR SCRUB: DISABLE ALL SECONDARY BACKGROUND LAYERS
        if (!this.game.config.showBackground) return;

        // NUCLEAR RENDER FILTER (Universal Void - Final Phase)
        // Explicitly purge EVERY entity array to ensure zero visual clutter
        this.game.nebulae = [];
        this.game.galaxies = [];
        this.game.planets = [];
        this.game.moons = [];
        this.game.anomalies = [];
        this.game.spaceMines = []; // PURGE THE BLOBS
        this.game.hazardBlackHoles = [];
        this.game.missileBases = [];
        this.game.enemyMissiles = [];
        this.game.enemyShips = [];
        this.game.capitalShips = [];
        this.game.spacecraft = [];
        this.game.ships = [];
        this.game.outposts = [];
        this.game.resourceDeposits = [];
        this.game.blackHoles = [];
        this.game.mines = [];
        this.game.asteroids = [];

        const ctx = this.game.ctx;

        // 1. Background Stars (from all active styles)
        if (this.game.backgroundStars && this.game.backgroundStars.length > 0) {
            this.game.backgroundStars.forEach(s => {
                ctx.fillStyle = s.color || "white";
                ctx.globalAlpha = s.alpha;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }

        // 2. Nebulae (from nebula + deep-space styles)
        if (this.game.nebulae && this.game.nebulae.length > 0) {
            ctx.globalCompositeOperation = 'screen';
            const time = Date.now();
            const activeStorms = (this.game.activeEvents || []).filter(e => e.type === 'storm');

            this.game.nebulae.forEach(n => {
                if (n.flownOut) return;

                let scale = 1.0;
                let alpha = 1.0;
                let color = n.color;

                activeStorms.forEach(storm => {
                    const dx = n.x - (storm.x - this.game.camera.x);
                    const dy = n.y - (storm.y - this.game.camera.y);
                    const dist = Math.hypot(dx, dy);
                    if (dist < storm.radius) {
                        const influence = (1 - dist / storm.radius) * storm.intensity;
                        color = this.lerpColor(color, storm.color, influence * 0.4);
                        alpha *= (1 - influence * 0.15) + Math.sin(time * 0.008) * 0.1 * influence;
                    }
                });

                if (this.game.warpDisengaging && n.warpScale !== undefined) {
                    scale = n.warpScale || 0.01;
                    alpha *= (n.warpAlpha || 0);
                }

                const scaledSize = Math.min(80, Math.max(0.1, n.size * scale));
                const scaledAlpha = n.alpha * alpha;

                const grad = this.getGradient(ctx, 'radial', n.x, n.y, 0, n.x, n.y, scaledSize, [
                    { offset: 0, color: color },
                    { offset: 1, color: 'transparent' }
                ]);

                ctx.globalAlpha = Math.max(0, scaledAlpha);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(n.x, n.y, scaledSize, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
        }

        // 2.2 Supernova Flash (New Cinematic Effect)
        const supernova = (this.game.activeEvents || []).find(e => e.type === 'supernova' && Date.now() >= e.triggerTime && Date.now() < e.triggerTime + e.duration);
        if (supernova) {
            const elapsed = Date.now() - supernova.triggerTime;
            const progress = elapsed / supernova.duration;
            const flashAlpha = progress < 0.1 ? progress / 0.1 : 1 - (progress - 0.1) / 0.9;
            
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = supernova.color;
            ctx.globalAlpha = flashAlpha * 0.7;
            ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            
            const grad = ctx.createRadialGradient(this.game.canvas.width/2, this.game.canvas.height/2, 0, this.game.canvas.width/2, this.game.canvas.height/2, this.game.canvas.width);
            grad.safeAddColorStop(0, '#ffffff');
            grad.safeAddColorStop(0.1, supernova.color);
            grad.safeAddColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.globalAlpha = flashAlpha;
            ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            ctx.restore();
        }

        // 2.5 Moving Cosmic Stars (shooting stars with tails)
        if (this.game.activeStyles.has('deep-space') && this.game.shootingStars && this.game.shootingStars.length > 0) {
            this.game.shootingStars.forEach(s => {
                ctx.save();

                // Draw tail (gradient line in opposite direction of movement)
                const tailX = s.x - s.vx * s.tailLength;
                const tailY = s.y - s.vy * s.tailLength;

                const tailGrad = this.getGradient(ctx, 'linear', tailX, tailY, s.x, s.y, [
                    { offset: 0, color: 'transparent' },
                    { offset: 0.7, color: s.color + '40' },
                    { offset: 1, color: s.color }
                ]);


                ctx.strokeStyle = tailGrad;
                ctx.lineWidth = s.size * 0.8;
                ctx.lineCap = 'round';
                ctx.globalAlpha = s.alpha;

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(s.x, s.y);
                ctx.stroke();

                // Draw star head (bright point)
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.alpha + 0.3;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            });
            ctx.globalAlpha = 1;
        }

        // 3. Spacecraft (from alien style) - ENHANCED RENDERING
        if (this.game.activeStyles.has('alien') && this.game.spacecraft && this.game.spacecraft.length > 0) {
            const time = performance.now() * 0.001;
            this.game.spacecraft.forEach(s => {
                if (s.flownOut) return; // Skip if flown out during warp
                ctx.save();

                // Position comes from flyObject during disengage
                ctx.translate(s.x, s.y);

                // During disengage: use scale and alpha from flyObject
                if (this.game.warpDisengaging && s.warpScale !== undefined) {
                    ctx.scale(s.warpScale, s.warpScale);
                    ctx.globalAlpha = s.warpAlpha || 0;
                }

                // Update rotation for saucers
                if (s.rotationSpeed) s.rotation += s.rotationSpeed;

                const size = s.size;
                const zoom = this.game.camera.zoom;
                const angle = Math.atan2(s.vy, s.vx);

                // Shield effect (drawn first, behind ship)
                if (s.hasShield) {
                    const shieldPulse = Math.sin(time * 2 + s.shieldPhase) * 0.3 + 0.4;
                    ctx.globalAlpha = shieldPulse * 0.4;
                    const shieldGrad = ctx.createRadialGradient(0, 0, size * 0.5, 0, 0, size * 1.5);
                    shieldGrad.safeAddColorStop(0, 'transparent');
                    shieldGrad.safeAddColorStop(0.7, s.shieldColor || 'rgba(100,200,255,0.3)');
                    shieldGrad.safeAddColorStop(1, 'transparent');
                    ctx.fillStyle = shieldGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                // Tractor beam (for saucers)
                if (s.beamActive && s.shipClass === 'saucer') {
                    const beamPulse = Math.sin(time * 5) * 0.2 + 0.6;
                    ctx.globalAlpha = beamPulse * 0.5;
                    const beamGrad = ctx.createLinearGradient(0, size * 0.2, 0, size * 3);
                    beamGrad.safeAddColorStop(0, s.beamColor || '#88ff88');
                    beamGrad.safeAddColorStop(1, 'transparent');
                    ctx.fillStyle = beamGrad;
                    ctx.beginPath();
                    ctx.moveTo(-size * 0.3, size * 0.2);
                    ctx.lineTo(-size * 0.8, size * 3);
                    ctx.lineTo(size * 0.8, size * 3);
                    ctx.lineTo(size * 0.3, size * 0.2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                // Rotate for directional ships (not saucers)
                if (s.shipClass !== 'saucer') {
                    ctx.rotate(angle);
                }

                // Engine trails (for non-saucers)
                if (s.shipClass !== 'saucer' && s.shipClass !== 'probe') {
                    ctx.globalAlpha = 0.7;
                    const trailLength = size * 2;
                    const engineSpacing = size * 0.25;
                    const engineCount = s.engineCount || 2;

                    for (let i = 0; i < engineCount; i++) {
                        const offsetY = (i - (engineCount - 1) / 2) * engineSpacing;
                        const flicker = 0.7 + Math.sin(time * 15 + s.detailSeed + i) * 0.3;
                        const trailGrad = ctx.createLinearGradient(-size * 0.7, offsetY, -size * 0.7 - trailLength * flicker, offsetY);
                        trailGrad.safeAddColorStop(0, s.engineGlow || '#ffffff');
                        trailGrad.safeAddColorStop(0.15, s.engineColor || '#00aaff');
                        trailGrad.safeAddColorStop(1, 'transparent');

                        ctx.fillStyle = trailGrad;
                        ctx.beginPath();
                        ctx.moveTo(-size * 0.65, offsetY - 4);
                        ctx.quadraticCurveTo(-size * 0.7 - trailLength * 0.5 * flicker, offsetY, -size * 0.7 - trailLength * flicker, offsetY);
                        ctx.quadraticCurveTo(-size * 0.7 - trailLength * 0.5 * flicker, offsetY, -size * 0.65, offsetY + 4);
                        ctx.closePath();
                        ctx.fill();
                    }
                    ctx.globalAlpha = 1;
                }

                // Hull gradient
                const hullGrad = ctx.createLinearGradient(0, -size * 0.5, 0, size * 0.5);
                hullGrad.safeAddColorStop(0, s.hullHighlight || '#ccc');
                hullGrad.safeAddColorStop(0.3, s.hullColor || '#888');
                hullGrad.safeAddColorStop(1, s.hullShadow || '#333');
                ctx.fillStyle = hullGrad;
                ctx.strokeStyle = s.hullHighlight || '#ddd';
                ctx.lineWidth = 1.5 / zoom;

                // === SHIP RENDERING: 13 Star Wars-Quality Spacecraft ===
                if (s.shipClass === 'saucer') {
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size, size * 0.25, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    const domeGrad = ctx.createRadialGradient(-size * 0.1, -size * 0.15, 0, 0, -size * 0.05, size * 0.4);
                    domeGrad.safeAddColorStop(0, '#ffffff');
                    domeGrad.safeAddColorStop(0.3, s.domeColor || '#88ffff');
                    domeGrad.safeAddColorStop(1, 'rgba(0,50,50,0.8)');
                    ctx.fillStyle = domeGrad;
                    ctx.beginPath();
                    ctx.ellipse(0, -size * 0.08, size * 0.35, size * 0.25, 0, Math.PI, 0);
                    ctx.fill();
                } else if (s.shipClass === 'star-dreadnought') {
                    ctx.beginPath();
                    ctx.moveTo(size * 1.2, 0);
                    for (let i = 0; i < 6; i++) {
                        const angle = (i / 6) * Math.PI * 2;
                        ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'quantum-scout') {
                    for (let i = 0; i < 3; i++) {
                        ctx.save();
                        ctx.rotate(time * (2 + i) + i);
                        ctx.strokeStyle = '#00aaff';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, size * (0.6 + i * 0.3), size * 0.2, 0, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.restore();
                    }
                } else if (s.shipClass === 'void-fighter') {
                    ctx.beginPath();
                    ctx.moveTo(size * 0.9, 0);
                    ctx.lineTo(size * 0.2, -size * 0.5);
                    ctx.lineTo(-size * 0.6, -size * 0.3);
                    ctx.lineTo(-size * 0.6, size * 0.3);
                    ctx.lineTo(size * 0.2, size * 0.5);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'nebula-cruiser') {
                    // Concorde-style supersonic jet
                    const hullGrad = ctx.createLinearGradient(-size, 0, size, 0);
                    hullGrad.safeAddColorStop(0, '#606080');
                    hullGrad.safeAddColorStop(0.5, '#8080a0');
                    hullGrad.safeAddColorStop(1, '#505070');
                    ctx.fillStyle = hullGrad;
                    // Sleek fuselage with pointed nose
                    ctx.beginPath();
                    ctx.moveTo(size * 1.2, 0);
                    ctx.lineTo(size * 0.7, -size * 0.08);
                    ctx.lineTo(-size * 0.5, -size * 0.12);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size * 0.5, size * 0.12);
                    ctx.lineTo(size * 0.7, size * 0.08);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    // Delta wings
                    ctx.fillStyle = '#7070a0';
                    ctx.beginPath();
                    ctx.moveTo(size * 0.2, 0);
                    ctx.lineTo(-size * 0.3, -size * 0.6);
                    ctx.lineTo(-size * 0.6, -size * 0.4);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(size * 0.2, 0);
                    ctx.lineTo(-size * 0.3, size * 0.6);
                    ctx.lineTo(-size * 0.6, size * 0.4);
                    ctx.closePath();
                    ctx.fill();
                } else if (s.shipClass === 'bio-corvette') {
                    const bioGrad = ctx.createLinearGradient(-size, 0, size, 0);
                    bioGrad.safeAddColorStop(0, '#4a0066');
                    bioGrad.safeAddColorStop(0.5, '#9900cc');
                    bioGrad.safeAddColorStop(1, '#660099');
                    ctx.fillStyle = bioGrad;
                    ctx.beginPath();
                    ctx.moveTo(size * 0.8, 0);
                    ctx.bezierCurveTo(size * 0.6, -size * 0.4, size * 0.2, -size * 0.5, -size * 0.3, -size * 0.3);
                    ctx.bezierCurveTo(-size * 0.7, 0, -size * 0.3, size * 0.3, size * 0.2, size * 0.5);
                    ctx.bezierCurveTo(size * 0.6, size * 0.4, size * 0.8, 0, size * 0.8, 0);
                    ctx.fill();
                } else if (s.shipClass === 'warp-strider') {
                    const hullGrad = ctx.createLinearGradient(-size, 0, size, 0);
                    hullGrad.safeAddColorStop(0, '#606060');
                    hullGrad.safeAddColorStop(0.5, '#a0a0a0');
                    hullGrad.safeAddColorStop(1, '#505050');
                    ctx.fillStyle = hullGrad;
                    ctx.beginPath();
                    ctx.moveTo(size * 0.8, 0);
                    ctx.lineTo(size * 0.3, -size * 0.15);
                    ctx.lineTo(-size * 0.6, -size * 0.15);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size * 0.6, size * 0.15);
                    ctx.lineTo(size * 0.3, size * 0.15);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#707070';
                    ctx.fillRect(-size * 0.7, -size * 0.5, size * 0.4, size * 0.08);
                    ctx.fillRect(-size * 0.7, size * 0.42, size * 0.4, size * 0.08);
                } else if (s.shipClass === 'prism-destroyer') {
                    const hullGrad = ctx.createLinearGradient(-size, -size, size, size);
                    hullGrad.safeAddColorStop(0, '#c0c0c0');
                    hullGrad.safeAddColorStop(0.5, '#e8e8e8');
                    hullGrad.safeAddColorStop(1, '#707070');
                    ctx.fillStyle = hullGrad;
                    ctx.beginPath();
                    ctx.moveTo(size, 0);
                    ctx.lineTo(size * 0.3, -size * 0.6);
                    ctx.lineTo(-size * 0.5, -size * 0.5);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size * 0.5, size * 0.5);
                    ctx.lineTo(size * 0.3, size * 0.6);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'stellar-barge') {
                    const hullGrad = ctx.createLinearGradient(-size, 0, size, 0);
                    hullGrad.safeAddColorStop(0, '#4a3820');
                    hullGrad.safeAddColorStop(0.5, '#8B6F47');
                    hullGrad.safeAddColorStop(1, '#3a2810');
                    ctx.fillStyle = hullGrad;
                    ctx.fillRect(-size * 0.7, -size * 0.35, size * 1.3, size * 0.7);
                    ctx.fillStyle = '#5a4830';
                    ctx.beginPath();
                    ctx.moveTo(size * 0.7, -size * 0.25);
                    ctx.lineTo(size, 0);
                    ctx.lineTo(size * 0.7, size * 0.25);
                    ctx.closePath();
                    ctx.fill();
                } else if (s.shipClass === 'cyber-sentry') {
                    const eyeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.4);
                    eyeGrad.safeAddColorStop(0, '#ff0000');
                    eyeGrad.safeAddColorStop(0.5, '#880000');
                    eyeGrad.safeAddColorStop(1, '#220000');
                    ctx.fillStyle = eyeGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
                    ctx.fill();
                    for (let i = 0; i < 8; i++) {
                        const angle = (i / 8) * Math.PI * 2 + time;
                        ctx.strokeStyle = '#ff0000';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(angle) * size * 0.4, Math.sin(angle) * size * 0.4);
                        ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8);
                        ctx.stroke();
                    }
                } else if (s.shipClass === 'aether-wing') {
                    const grad = ctx.createLinearGradient(-size, 0, size, 0);
                    grad.safeAddColorStop(0, 'rgba(0,100,255,0)');
                    grad.safeAddColorStop(0.5, 'rgba(100,200,255,0.6)');
                    grad.safeAddColorStop(1, 'rgba(0,100,255,0)');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.moveTo(-size * 0.8, -size * 0.6);
                    ctx.lineTo(size * 0.8, 0);
                    ctx.lineTo(-size * 0.8, size * 0.6);
                    ctx.closePath();
                    ctx.fill();
                } else if (s.shipClass === 'death-sphere') {
                    const sphereGrad = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size);
                    sphereGrad.safeAddColorStop(0, '#505050');
                    sphereGrad.safeAddColorStop(0.5, '#303030');
                    sphereGrad.safeAddColorStop(1, '#101010');
                    ctx.fillStyle = sphereGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    const laserGrad = ctx.createRadialGradient(size * 0.4, -size * 0.4, 0, size * 0.4, -size * 0.4, size * 0.12);
                    laserGrad.safeAddColorStop(0, '#00ff00');
                    laserGrad.safeAddColorStop(0.5, '#00aa00');
                    laserGrad.safeAddColorStop(1, 'rgba(0,170,0,0)');
                    ctx.fillStyle = laserGrad;
                    ctx.beginPath();
                    ctx.arc(size * 0.4, -size * 0.4, size * 0.1, 0, Math.PI * 2);
                    ctx.fill();
                } else if (s.shipClass === 'tie-fighter') {
                    const cockpitGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.3);
                    cockpitGrad.safeAddColorStop(0, '#606060');
                    cockpitGrad.safeAddColorStop(0.7, '#303030');
                    cockpitGrad.safeAddColorStop(1, '#101010');
                    ctx.fillStyle = cockpitGrad;
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                        const x = Math.cos(angle) * size * 0.25;
                        const y = Math.sin(angle) * size * 0.25;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    const panelGrad = ctx.createLinearGradient(-size, -size, size, size);
                    panelGrad.safeAddColorStop(0, '#404040');
                    panelGrad.safeAddColorStop(0.5, '#505050');
                    panelGrad.safeAddColorStop(1, '#303030');
                    ctx.fillStyle = panelGrad;
                    ctx.fillRect(-size * 1.2, -size * 0.8, size * 0.8, size * 1.6);
                    ctx.strokeRect(-size * 1.2, -size * 0.8, size * 0.8, size * 1.6);
                    ctx.fillRect(size * 0.4, -size * 0.8, size * 0.8, size * 1.6);
                    ctx.strokeRect(size * 0.4, -size * 0.8, size * 0.8, size * 1.6);
                } else {
                    // Default fallback for any unrecognized ships
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }

                // Navigation lights (for non-probes, non-saucers)
                if (s.shipClass !== 'probe' && s.shipClass !== 'saucer') {
                    const lightPulse = Math.sin(time * 3 + (s.lightPhase || 0)) * 0.5 + 0.5;
                    ctx.fillStyle = s.lightColor || '#ff00ff';
                    ctx.globalAlpha = lightPulse;
                    ctx.beginPath();
                    ctx.arc(size * 0.85, 0, 3 / zoom, 0, Math.PI * 2);
                    ctx.fill();

                    // Wing tip lights
                    ctx.fillStyle = '#00ff00';
                    ctx.beginPath();
                    ctx.arc(-size * 0.5, -size * 0.6, 2 / zoom, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#ff0000';
                    ctx.beginPath();
                    ctx.arc(-size * 0.5, size * 0.6, 2 / zoom, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                ctx.restore();
            });
        }
    }

    renderSupernovaEffect(ctx, time) {
        return; // NUCLEAR SCRUB: DISABLE SUPERNOVA FLASH
        const effect = this.game.hazardEffect;
        if (!effect) return;

        // Debug confirmation
        if (!effect._logged) {
            console.log("[Aether] Triggering High-Intensity Red Supernova Effect");
            effect._logged = true;
        }

        const canvas = this.game.canvas;
        const progress = effect.progress || 0;
        const W = canvas.width;
        const H = canvas.height;
        const cx = W / 2;
        const cy = H / 2;
        const t = time * 0.001;
        const scale = Math.min(W, H) / 800;

        ctx.save();

        // ============ CAMERA SHAKE ============
        if (progress < 0.65) {
            const ramp = Math.min(1, progress / 0.015);
            const decay = 1 - progress / 0.65;
            const intensity = 25 * ramp * decay * scale;
            this.game.camera.shakeX = (Math.sin(t * 47) + Math.sin(t * 23) * 0.5) * intensity;
            this.game.camera.shakeY = (Math.cos(t * 53) + Math.cos(t * 31) * 0.5) * intensity;
        } else {
            this.game.camera.shakeX *= 0.88;
            this.game.camera.shakeY *= 0.88;
        }

        // ============ 1. BLINDING FLASH (0-18%) ============
        if (progress < 0.18) {
            const f = progress < 0.025 ? Math.min(1, progress / 0.025) : Math.max(0, 1 - (progress - 0.025) / 0.155);
            ctx.fillStyle = 'rgba(255,255,255,' + f + ')';
            ctx.fillRect(0, 0, W, H);
            if (f > 0.2) {
                const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 600 * scale);
                cg.safeAddColorStop(0, 'rgba(255,255,255,' + f + ')');
                cg.safeAddColorStop(0.2, 'rgba(255,200,200,' + (f * 0.9) + ')');
                cg.safeAddColorStop(0.5, 'rgba(255,40,40,' + (f * 0.7) + ')');
                cg.safeAddColorStop(0.8, 'rgba(220,0,0,' + (f * 0.4) + ')');
                cg.safeAddColorStop(1, 'rgba(120,0,0,0)');
                ctx.fillStyle = cg;
                ctx.fillRect(0, 0, W, H);
            }
        }

        // ============ 2. SHOCKWAVE + CONDENSATION RING (1-55%) ============
        if (progress > 0.01 && progress < 0.55) {
            const sp = (progress - 0.01) / 0.54;
            const sr = sp * 1100 * scale;
            const sa = Math.max(0, (1 - sp) * 0.95);
            const sw = Math.max(3, (1 - sp) * 40 * scale);
            ctx.strokeStyle = 'rgba(255,200,200,' + sa + ')';
            ctx.lineWidth = sw;
            ctx.beginPath();
            ctx.arc(cx, cy, Math.max(1, sr), 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(255,255,255,' + (sa * 0.9) + ')';
            ctx.lineWidth = Math.max(1, sw * 0.3);
            ctx.beginPath();
            ctx.arc(cx, cy, Math.max(1, sr * 0.94), 0, Math.PI * 2);
            ctx.stroke();
            if (sp > 0.05 && sp < 0.7) {
                const wP = (sp - 0.05) / 0.65;
                const wR = wP * 900 * scale;
                const wA = Math.max(0, (1 - wP) * 0.15);
                const wW = Math.max(30, (1 - wP) * 120) * scale;
                ctx.strokeStyle = 'rgba(200,220,255,' + wA + ')';
                ctx.lineWidth = wW;
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, wR), 0, Math.PI * 2);
                ctx.stroke();
            }
            if (sp > 0.12) {
                const s2p = (sp - 0.12) / 0.88;
                ctx.strokeStyle = 'rgba(255,80,80,' + (sa * 0.4) + ')';
                ctx.lineWidth = Math.max(2, sw * 0.4);
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, s2p * 800 * scale), 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // ============ 3. FIREBALL (2-50%) ============
        if (progress > 0.02 && progress < 0.50) {
            const fp = (progress - 0.02) / 0.48;
            const fr = (120 + fp * 400) * scale;
            const fa = Math.max(0, 1 - fp * 1.3);
            for (let layer = 0; layer < 3; layer++) {
                const lr = fr * (1 - layer * 0.25);
                const la = fa * (1 - layer * 0.15);
                const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, lr));
                if (layer === 0) {
                    fg.safeAddColorStop(0, 'rgba(255,255,255,' + la + ')');
                    fg.safeAddColorStop(0.2, 'rgba(255,180,180,' + (la * 0.95) + ')');
                    fg.safeAddColorStop(0.45, 'rgba(255,20,20,' + (la * 0.8) + ')');
                    fg.safeAddColorStop(0.7, 'rgba(200,0,0,' + (la * 0.6) + ')');
                    fg.safeAddColorStop(1, 'rgba(120,0,0,0)');
                } else if (layer === 1) {
                    fg.safeAddColorStop(0, 'rgba(255,150,150,' + (la * 0.7) + ')');
                    fg.safeAddColorStop(0.5, 'rgba(255,0,0,' + (la * 0.55) + ')');
                    fg.safeAddColorStop(1, 'rgba(100,0,0,0)');
                } else {
                    fg.safeAddColorStop(0, 'rgba(255,50,0,' + (la * 0.4) + ')');
                    fg.safeAddColorStop(1, 'rgba(80,0,0,0)');
                }
                ctx.fillStyle = fg;
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, lr), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ============ 4. MEGA VOLUMETRIC MUSHROOM CLOUD (10-96%) ============
        if (progress > 0.10 && progress < 0.96) {
            const cp = Math.min(1, (progress - 0.10) / 0.45);
            const riseP = Math.max(0, Math.min(1, (progress - 0.25) / 0.55));
            const fadeP = Math.max(0, (progress - 0.72) / 0.24);
            const alpha = Math.max(0, 1 - fadeP);
            const hotness = Math.max(0, 1 - cp * 1.2);
            const rise = riseP * 250 * scale;
            const baseY = cy + 50 * scale;

            ctx.save();
            ctx.translate(cx, baseY - rise);

            // ---- FIRE COLUMN inside stem ----
            if (hotness > 0.1) {
                for (let i = 0; i < 25; i++) {
                    const frac = i / 24;
                    const fy = -frac * (280 + cp * 150) * scale;
                    const fw = (35 + frac * frac * 50 + Math.sin(t * 8 + frac * 10) * 10) * scale * Math.min(1, cp * 3);
                    const ffa = alpha * hotness * (0.7 - frac * 0.3);
                    if (ffa < 0.01) continue;
                    const fcg = ctx.createRadialGradient(0, fy, 0, 0, fy, Math.max(1, fw));
                    fcg.safeAddColorStop(0, 'rgba(255,240,240,' + (ffa * 0.98) + ')');
                    fcg.safeAddColorStop(0.3, 'rgba(255,100,100,' + (ffa * 0.85) + ')');
                    fcg.safeAddColorStop(0.6, 'rgba(255,0,0,' + (ffa * 0.6) + ')');
                    fcg.safeAddColorStop(1, 'rgba(100,0,0,0)');
                    ctx.fillStyle = fcg;
                    ctx.beginPath();
                    ctx.arc(Math.sin(t * 6 + frac * 8) * 6 * scale, fy, Math.max(1, fw), 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ---- STEM: Dense layered smoke column ----
            const stemH = (320 + cp * 180) * scale;
            for (let i = 0; i < 22; i++) {
                const frac = i / 21;
                const sy = -frac * stemH;
                const sw = (60 + frac * frac * 110 + Math.sin(t * 1.8 + frac * 6) * 10) * scale * Math.min(1, cp * 2.5);
                const depth = 0.5 + frac * 0.35;
                let r, g, b;
                if (hotness > 0.3) { r = 255; g = 10 + frac * 40; b = 15; }
                else { r = 70 - frac * 30; g = 15; b = 20; }
                const wobX = Math.sin(t * 1.2 + frac * 4) * 8 * scale;
                const sg = ctx.createRadialGradient(wobX, sy, 0, wobX, sy, Math.max(1, sw * 1.3));
                sg.safeAddColorStop(0, 'rgba(' + (r + 60) + ',' + (g + 20) + ',' + (b + 10) + ',' + (alpha * depth * 0.95) + ')');
                sg.safeAddColorStop(0.5, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * depth * 0.8) + ')');
                sg.safeAddColorStop(1, 'rgba(' + Math.round(r * 0.4) + ',0,0,0)');
                ctx.fillStyle = sg;
                ctx.beginPath();
                ctx.arc(wobX, sy, Math.max(1, sw * 1.3), 0, Math.PI * 2);
                ctx.fill();
            }

            // ---- CAP: Multi-layer volumetric dome ----
            const capY = -stemH;
            const capGrow = Math.max(0, Math.min(1, (cp - 0.1) / 0.45));
            if (capGrow > 0) {
                const capR = (280 + capGrow * 320) * scale;
                const capH = (140 + capGrow * 120) * scale;

                // BACK LAYER - dark depth billows
                for (let i = 0; i < 14; i++) {
                    const angle = (i / 14) * Math.PI * 2 + t * 0.15;
                    const bx = Math.cos(angle) * capR * 0.6;
                    const by = capY + Math.sin(angle * 1.3 + t * 0.2) * capH * 0.4;
                    const br = capR * (0.55 + Math.sin(t * 0.8 + i * 0.5) * 0.1);
                    let r = hotness > 0.2 ? 140 : 40, g = hotness > 0.2 ? 20 : 15, b = hotness > 0.2 ? 20 : 25;
                    const bg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    bg.safeAddColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.65 * capGrow) + ')');
                    bg.safeAddColorStop(0.6, 'rgba(' + Math.round(r * 0.6) + ',' + Math.round(g * 0.4) + ',' + Math.round(b * 0.4) + ',' + (alpha * 0.4 * capGrow) + ')');
                    bg.safeAddColorStop(1, 'rgba(' + Math.round(r * 0.2) + ',' + Math.round(g * 0.1) + ',' + Math.round(b * 0.1) + ',0)');
                    ctx.fillStyle = bg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // MID LAYER - main body
                for (let i = 0; i < 18; i++) {
                    const angle = (i / 18) * Math.PI * 2 + Math.PI / 18 + t * 0.22;
                    const bx = Math.cos(angle) * capR * 0.48 + Math.sin(t * 0.7 + i) * 15 * scale;
                    const by = capY + Math.sin(angle * 0.8 + t * 0.3) * capH * 0.32;
                    const br = capR * (0.48 + Math.sin(t * 1.1 + i * 0.8) * 0.07);
                    let r, g, b;
                    if (hotness > 0.4) { r = 255; g = 10; b = 15; }
                    else if (hotness > 0.15) { r = 180; g = 5; b = 10; }
                    else { r = 100; g = 5; b = 8; }
                    const mg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    mg.safeAddColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.75 * capGrow) + ')');
                    mg.safeAddColorStop(0.4, 'rgba(' + Math.round(r * 0.8) + ',' + Math.round(g * 0.7) + ',' + Math.round(b * 0.75) + ',' + (alpha * 0.5 * capGrow) + ')');
                    mg.safeAddColorStop(0.8, 'rgba(' + Math.round(r * 0.5) + ',' + Math.round(g * 0.3) + ',' + Math.round(b * 0.35) + ',' + (alpha * 0.2 * capGrow) + ')');
                    mg.safeAddColorStop(1, 'rgba(' + Math.round(r * 0.2) + ',' + Math.round(g * 0.1) + ',' + Math.round(b * 0.1) + ',0)');
                    ctx.fillStyle = mg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // FRONT LAYER - bright highlights
                for (let i = 0; i < 12; i++) {
                    const angle = (i / 12) * Math.PI * 2 + t * 0.28;
                    const bx = Math.cos(angle) * capR * 0.35 + Math.sin(t + i * 1.3) * 10 * scale;
                    const by = capY + Math.sin(angle * 1.5 + t * 0.35) * capH * 0.25;
                    const br = capR * (0.3 + Math.sin(t * 1.5 + i) * 0.06);
                    let r, g, b;
                    if (hotness > 0.3) { r = 255; g = 180; b = 180; } else { r = 255; g = 120; b = 120; }
                    const fg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    fg.safeAddColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.6 * capGrow) + ')');
                    fg.safeAddColorStop(0.5, 'rgba(' + Math.round(r * 0.95) + ',' + Math.round(g * 0.8) + ',' + Math.round(b * 0.8) + ',' + (alpha * 0.35 * capGrow) + ')');
                    fg.safeAddColorStop(1, 'rgba(' + Math.round(r * 0.6) + ',' + Math.round(g * 0.2) + ',' + Math.round(b * 0.2) + ',0)');
                    ctx.fillStyle = fg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // BRIGHT CORE
                const ccR = capR * 0.5;
                const ccg2 = ctx.createRadialGradient(0, capY, 0, 0, capY, Math.max(1, ccR));
                if (hotness > 0.2) {
                    ccg2.safeAddColorStop(0, 'rgba(255,240,240,' + (alpha * 0.95 * capGrow) + ')');
                    ccg2.safeAddColorStop(0.3, 'rgba(255,80,80,' + (alpha * 0.7 * capGrow) + ')');
                    ccg2.safeAddColorStop(0.7, 'rgba(255,0,0,' + (alpha * 0.4 * capGrow) + ')');
                    ccg2.safeAddColorStop(1, 'rgba(120,0,0,0)');
                } else {
                    ccg2.safeAddColorStop(0, 'rgba(255,200,200,' + (alpha * 0.7 * capGrow) + ')');
                    ccg2.safeAddColorStop(0.5, 'rgba(200,0,0,' + (alpha * 0.5 * capGrow) + ')');
                    ccg2.safeAddColorStop(1, 'rgba(100,0,0,0)');
                }
                ctx.fillStyle = ccg2;
                ctx.beginPath();
                ctx.arc(0, capY, Math.max(1, ccR), 0, Math.PI * 2);
                ctx.fill();

                // UNDERGLOW from fireball
                if (hotness > 0.05) {
                    const ugR = capR * 0.7;
                    const ugY = capY + capH * 0.4;
                    const ugA = alpha * hotness * 0.5 * capGrow;
                    const ugg = ctx.createRadialGradient(0, ugY, 0, 0, ugY, Math.max(1, ugR));
                    ugg.safeAddColorStop(0, 'rgba(255,255,255,' + ugA + ')');
                    ugg.safeAddColorStop(0.5, 'rgba(255,50,50,' + (ugA * 0.6) + ')');
                    ugg.safeAddColorStop(1, 'rgba(180,0,0,0)');
                    ctx.fillStyle = ugg;
                    ctx.beginPath();
                    ctx.arc(0, ugY, Math.max(1, ugR), 0, Math.PI * 2);
                    ctx.fill();
                }

                // TOROIDAL RING at cap base
                ctx.strokeStyle = 'rgba(255,150,150,' + (alpha * 0.4 * capGrow) + ')';
                ctx.lineWidth = Math.max(2, capH * 0.22);
                ctx.beginPath();
                ctx.ellipse(0, capY + capH * 0.25, Math.max(1, capR * 0.65), Math.max(1, capH * 0.11), 0, 0, Math.PI * 2);
                ctx.stroke();

                // SMOKE TENDRILS from cap edges
                for (let i = 0; i < 8; i++) {
                    const tA = (i / 8) * Math.PI * 2 + t * 0.1;
                    const tLen = (60 + Math.sin(t + i * 2) * 20) * scale * capGrow;
                    const tx = Math.cos(tA) * capR * 0.75;
                    const ty = capY + Math.sin(tA) * capH * 0.3;
                    const tex = tx + Math.cos(tA + 0.5) * tLen;
                    const tey = ty + Math.sin(tA * 0.5 + t * 0.3) * tLen * 0.6 - tLen * 0.3;
                    ctx.strokeStyle = 'rgba(200,100,100,' + (alpha * 0.25 * capGrow) + ')';
                    ctx.lineWidth = Math.max(1, 6 * scale * (1 - progress * 0.5));
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.quadraticCurveTo(tx + (tex - tx) * 0.5, ty - 30 * scale, tex, tey);
                    ctx.stroke();
                }

                // RISING VAPOR above cap
                for (let v = 0; v < 10; v++) {
                    const vy = capY - (60 + v * 40) * scale;
                    const vr = Math.max(1, (35 + v * 15 + Math.sin(t * 2.5 + v * 0.9) * 10) * scale * capGrow);
                    const vx = Math.sin(t * 1.1 + v * 1.7) * 30 * scale;
                    const va = alpha * Math.max(0, 0.35 - v * 0.03) * capGrow;
                    const vg = ctx.createRadialGradient(vx, vy, 0, vx, vy, vr);
                    vg.safeAddColorStop(0, 'rgba(255,245,245,' + va + ')');
                    vg.safeAddColorStop(0.6, 'rgba(220,180,180,' + (va * 0.6) + ')');
                    vg.safeAddColorStop(1, 'rgba(150,140,140,0)');
                    ctx.fillStyle = vg;
                    ctx.beginPath();
                    ctx.arc(vx, vy, vr, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ---- EMBER PARTICLES ----
            if (!effect._embers) {
                effect._embers = [];
                for (let i = 0; i < 60; i++) {
                    const a = Math.random() * Math.PI * 2;
                    const spd = 1 + Math.random() * 4;
                    effect._embers.push({
                        x: 0, y: 0, vx: Math.cos(a) * spd, vy: -2 - Math.random() * 5,
                        size: 1 + Math.random() * 3, life: 0.1 + Math.random() * 0.7, hue: (Math.random() < 0.2 ? 0 : 350 + Math.random() * 10)
                    });
                }
            }
            for (let i = 0; i < effect._embers.length; i++) {
                const e = effect._embers[i];
                if (progress < e.life || progress > e.life + 0.3) continue;
                const ep = (progress - e.life) / 0.3;
                const ex = e.vx * ep * 300 * scale;
                const ey = e.vy * ep * 300 * scale - stemH * 0.5;
                const ea = Math.max(0, (1 - ep) * alpha * 0.9);
                const es = e.size * scale * (1 + ep);
                ctx.fillStyle = 'hsla(' + e.hue + ', 100%, ' + Math.round(60 + (1 - ep) * 30) + '%, ' + ea + ')';
                ctx.beginPath();
                ctx.arc(ex, ey, Math.max(0.5, es), 0, Math.PI * 2);
                ctx.fill();
            }

            // ---- GROUND DEBRIS RING ----
            if (progress < 0.60) {
                const dp = Math.min(1, progress / 0.20);
                const dr = dp * 500 * scale;
                const da = alpha * Math.max(0, 1 - dp) * 0.45;
                const dg = ctx.createRadialGradient(0, 30 * scale, 0, 0, 30 * scale, Math.max(1, dr));
                dg.safeAddColorStop(0, 'rgba(180,30,30,' + da + ')');
                dg.safeAddColorStop(0.4, 'rgba(120,20,20,' + (da * 0.7) + ')');
                dg.safeAddColorStop(0.8, 'rgba(60,10,10,' + (da * 0.3) + ')');
                dg.safeAddColorStop(1, 'rgba(30,0,0,0)');
                ctx.fillStyle = dg;
                ctx.beginPath();
                ctx.arc(0, 30 * scale, Math.max(1, dr), 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        // ============ 5. AMBIENT GLOW ============
        if (progress > 0.02 && progress < 0.88) {
            const ga = Math.max(0, (1 - progress) * 0.3);
            const gg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 800 * scale);
            gg.safeAddColorStop(0, 'rgba(255,100,100,' + ga + ')');
            gg.safeAddColorStop(0.4, 'rgba(255,40,40,' + (ga * 0.7) + ')');
            gg.safeAddColorStop(0.8, 'rgba(180,0,0,' + (ga * 0.3) + ')');
            gg.safeAddColorStop(1, 'rgba(100,0,0,0)');
            ctx.fillStyle = gg;
            ctx.fillRect(0, 0, W, H);
        }

        // ============ 6. SCREEN TINT ============
        if (progress > 0.05 && progress < 0.70) {
            const tintA = Math.max(0, 0.08 * (1 - progress / 0.70));
            ctx.fillStyle = 'rgba(255,50,50,' + tintA + ')';
            ctx.fillRect(0, 0, W, H);
        }

        ctx.restore();

        if (progress >= 0.95) {
            this.game.camera.shakeX = 0;
            this.game.camera.shakeY = 0;
        }
    }


    renderTrainingHUD(ctx) {
        if (!this.game.playerShip) return; // FIX: Boot safety
        if (!this.game.trainingLesson) return;
        if (!this.game.trainingActive && !this.game.trainingBriefing && !this.game.trainingComplete) return;

        const lesson = this.game.trainingLesson;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Screen space

        // --- BRIEFING OVERLAY ---
        if (this.game.trainingBriefing) {
            const elapsed = (performance.now() - this.game.trainingBriefingStart) / 1000;
            const fadeIn = Math.min(1, elapsed / 0.5);

            // Backdrop
            ctx.globalAlpha = fadeIn * 0.75;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            // Briefing card
            ctx.globalAlpha = fadeIn;
            const cardW = Math.min(500, w * 0.8);
            const cardH = 300;
            const cx = (w - cardW) / 2;
            const cy = (h - cardH) / 2;

            // Card background
            ctx.fillStyle = 'rgba(10, 22, 40, 0.95)';
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(cx, cy, cardW, cardH, 12);
            ctx.fill();
            ctx.stroke();

            // Lesson icon + title
            ctx.textAlign = 'center';
            ctx.font = 'bold 32px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00f3ff';
            ctx.fillText(`${lesson.icon} ${lesson.name}`, w / 2, cy + 55);

            // Subtitle
            ctx.shadowBlur = 0;
            ctx.font = '14px "Exo 2", sans-serif';
            ctx.fillStyle = '#8ba';
            ctx.fillText(lesson.subtitle, w / 2, cy + 80);

            // Briefing text
            ctx.font = '15px "Exo 2", sans-serif';
            ctx.fillStyle = '#d0eeff';
            const lines = lesson.briefing.split('\n');
            lines.forEach((line, i) => {
                ctx.fillText(line, w / 2, cy + 120 + i * 24);
            });

            // Key indicators
            const keyY = cy + 120 + lines.length * 24 + 20;
            ctx.font = 'bold 13px "Exo 2", monospace';
            const totalKeysWidth = lesson.keys.length * 100;
            let keyX = w / 2 - totalKeysWidth / 2 + 50;
            lesson.keys.forEach(k => {
                // Key box
                ctx.fillStyle = 'rgba(0,243,255,0.15)';
                ctx.strokeStyle = 'rgba(0,243,255,0.5)';
                ctx.lineWidth = 1.5;
                const boxW = Math.max(40, ctx.measureText(k.key).width + 20);
                ctx.beginPath();
                ctx.roundRect(keyX - boxW / 2, keyY - 12, boxW, 28, 6);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#00f3ff';
                ctx.textAlign = 'center';
                ctx.fillText(k.key, keyX, keyY + 6);

                // Action label
                ctx.font = '11px "Exo 2", sans-serif';
                ctx.fillStyle = '#8ba';
                ctx.fillText(k.action, keyX, keyY + 28);
                ctx.font = 'bold 13px "Exo 2", monospace';

                keyX += 110;
            });

            // "Press any key" hint
            const blinkAlpha = elapsed > 1.5 ? 0.4 + Math.sin(performance.now() * 0.005) * 0.4 : 0;
            ctx.globalAlpha = blinkAlpha;
            ctx.font = '14px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            ctx.textAlign = 'center';
            ctx.fillText('Press W or ENTER to start', w / 2, cy + cardH - 20);

            ctx.restore();
            return; // Don't render other HUD during briefing
        }

        // --- COMPLETION OVERLAY ---
        if (this.game.trainingComplete) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            ctx.globalAlpha = 1.0;
            const medalEmoji = this.game.trainingMedal === 'gold' ? '🥇' : this.game.trainingMedal === 'silver' ? '🥈' : this.game.trainingMedal === 'bronze' ? '🥉' : '✅';
            const medalColor = this.game.trainingMedal === 'gold' ? '#ffd700' : this.game.trainingMedal === 'silver' ? '#c0c0c0' : this.game.trainingMedal === 'bronze' ? '#cd7f32' : '#00ff66';

            ctx.textAlign = 'center';

            // Medal
            ctx.font = '64px sans-serif';
            ctx.fillText(medalEmoji, w / 2, h / 2 - 60);

            // Title
            ctx.font = 'bold 28px "Exo 2", sans-serif';
            ctx.fillStyle = medalColor;
            ctx.shadowBlur = 20;
            ctx.shadowColor = medalColor;
            ctx.fillText('LESSON COMPLETE!', w / 2, h / 2);

            // Stats
            ctx.shadowBlur = 0;
            ctx.font = '18px "Exo 2", sans-serif';
            ctx.fillStyle = '#d0eeff';
            ctx.fillText(`Time: ${this.game.trainingTimer.toFixed(1)}s`, w / 2, h / 2 + 35);

            const reward = this.game.trainingMedal ? lesson.reward[this.game.trainingMedal] : 50;
            ctx.fillStyle = '#ffd700';
            ctx.fillText(`+$${reward}`, w / 2, h / 2 + 60);

            // Gem rewards display
            if (this.game.trainingGemSummary && this.game.trainingGemSummary.length > 0) {
                ctx.font = '13px "Exo 2", sans-serif';
                ctx.fillStyle = '#00f3ff';
                const gemLine = this.game.trainingGemSummary.join('  •  ');
                ctx.fillText(`💎 ${gemLine}`, w / 2, h / 2 + 82);
            }

            // Medal thresholds
            ctx.font = '13px "Exo 2", sans-serif';
            ctx.fillStyle = '#667';
            ctx.fillText(`🥇 <${lesson.medals.gold}s  🥈 <${lesson.medals.silver}s  🥉 <${lesson.medals.bronze}s`, w / 2, h / 2 + 108);

            // Actions
            ctx.font = '15px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            const blinkAlpha = 0.5 + Math.sin(performance.now() * 0.004) * 0.4;
            ctx.globalAlpha = blinkAlpha;
            ctx.fillText('Press ENTER to continue', w / 2, h / 2 + 135);

            // Check for dismiss
            if (this.game.keysPressed['enter'] || this.game.keysPressed[' ']) {
                this.game.trainingComplete = false;
                this.game.trainingLesson = null;
                // Open academy to pick next lesson
                setTimeout(() => this.game.openFlightAcademy(), 300);
            }

            ctx.restore();
            return;
        }

        // --- ACTIVE TRAINING HUD ---
        const time = performance.now() * 0.003;

        // Top-center: Lesson title + timer
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f3ff';
        ctx.globalAlpha = 0.9;
        ctx.fillText(`${lesson.icon} ${lesson.name}`, w / 2, 35);

        // Timer
        ctx.shadowBlur = 0;
        ctx.font = 'bold 22px "Exo 2", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.game.trainingTimer.toFixed(1) + 's', w / 2, 60);

        // Progress bar
        const totalGates = lesson.gates.filter(g => lesson.id !== 'collection' || !g.reached).length;
        const reachedGates = lesson.gates.filter(g => g.reached).length;
        let progressRatio;
        if (lesson.id === 'collection') {
            progressRatio = this.game.trainingGemsCollected / (lesson.collectTarget || lesson.gems.length);
        } else {
            progressRatio = reachedGates / lesson.gates.length;
        }
        const barW = 200;
        const barH = 6;
        const barX = w / 2 - barW / 2;
        const barY = 70;

        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#1a2a3a';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(barX, barY, barW * Math.min(1, progressRatio), barH);

        // Gate/gem counter
        ctx.font = '11px "Exo 2", sans-serif';
        ctx.fillStyle = '#8ba';
        ctx.globalAlpha = 0.8;
        if (lesson.id === 'collection') {
            ctx.fillText(`Gems: ${this.game.trainingGemsCollected}/${lesson.collectTarget || lesson.gems.length}`, w / 2, barY + 20);
        } else {
            ctx.fillText(`Gates: ${reachedGates}/${lesson.gates.length}`, w / 2, barY + 20);
        }

        // --- MISSION OBJECTIVE (always visible) ---
        ctx.globalAlpha = 0.85;
        ctx.font = '13px "Exo 2", sans-serif';
        ctx.fillStyle = '#d0eeff';
        // Show a single-line objective derived from briefing
        const objectiveLines = lesson.briefing.split('\n').filter(l => l.trim());
        const objectiveY = barY + 22;
        objectiveLines.forEach((line, i) => {
            ctx.globalAlpha = Math.max(0.4, 0.85 - i * 0.15);
            ctx.fillText(line, w / 2, objectiveY + 16 + i * 17);
        });

        // Medal thresholds small text
        const medalsY = objectiveY + 16 + objectiveLines.length * 17 + 6;
        ctx.font = '10px "Exo 2", sans-serif';
        ctx.fillStyle = '#445';
        ctx.globalAlpha = 0.6;
        ctx.fillText(`🥇${lesson.medals.gold}s  🥈${lesson.medals.silver}s  🥉${lesson.medals.bronze}s`, w / 2, medalsY);

        // --- Key hints (bottom center) ---
        ctx.globalAlpha = 0.5 + Math.sin(time) * 0.15;
        ctx.font = '12px "Exo 2", monospace';
        ctx.fillStyle = '#00f3ff';
        const hintText = lesson.keys.map(k => `[${k.key}] ${k.action}`).join('   ');
        ctx.fillText(hintText, w / 2, h - 25);

        // --- HUD Arrow to next gate ---
        if (lesson.showArrow && this.game.trainingGateIndex < lesson.gates.length) {
            const gate = lesson.gates[this.game.trainingGateIndex];
            const dx = gate.x - this.game.playerShip.x;
            const dy = gate.y - this.game.playerShip.y;
            const angle = Math.atan2(dy, dx);
            const dist = Math.hypot(dx, dy);

            const indicatorRadius = Math.min(w, h) * 0.15;
            const ix = w / 2 + Math.cos(angle) * indicatorRadius;
            const iy = h / 2 + Math.sin(angle) * indicatorRadius;

            ctx.save();
            ctx.translate(ix, iy);
            ctx.rotate(angle);

            const pulse = 1 + Math.sin(time * 2) * 0.12;

            // Neon arrow
            ctx.beginPath();
            ctx.moveTo(22 * pulse, 0);
            ctx.lineTo(-10 * pulse, -13 * pulse);
            ctx.lineTo(-10 * pulse, 13 * pulse);
            ctx.closePath();
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 18;
            ctx.shadowColor = '#00f3ff';
            ctx.globalAlpha = 0.7 + Math.sin(time * 2) * 0.25;
            ctx.fill();

            // Distance
            ctx.rotate(-angle);
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'black';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px "Exo 2", sans-serif';
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.9;
            ctx.fillText(`${Math.round(dist)}m`, 0, 30);
            ctx.restore();
        }

        // For collection lesson, show arrow to nearest uncollected gem
        if (lesson.id === 'collection' && this.game.trainingGemsCollected < (lesson.collectTarget || lesson.gems.length)) {
            let nearestGem = null;
            let nearestDist = Infinity;
            for (const gem of lesson.gems) {
                if (gem.collected) continue;
                const d = Math.hypot(gem.x - this.game.playerShip.x, gem.y - this.game.playerShip.y);
                if (d < nearestDist) { nearestDist = d; nearestGem = gem; }
            }
            if (nearestGem) {
                const angle = Math.atan2(nearestGem.y - this.game.playerShip.y, nearestGem.x - this.game.playerShip.x);
                const indicatorRadius = Math.min(w, h) * 0.12;
                const ix = w / 2 + Math.cos(angle) * indicatorRadius;
                const iy = h / 2 + Math.sin(angle) * indicatorRadius;

                ctx.save();
                ctx.translate(ix, iy);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(15, 0);
                ctx.lineTo(-7, -9);
                ctx.lineTo(-7, 9);
                ctx.closePath();
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 12;
                ctx.shadowColor = '#ffd700';
                ctx.globalAlpha = 0.6 + Math.sin(time * 3) * 0.3;
                ctx.fill();
                ctx.rotate(-angle);
                ctx.font = '11px "Exo 2", sans-serif';
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#000';
                ctx.textAlign = 'center';
                ctx.fillText(`💎 ${Math.round(nearestDist)}m`, 0, 24);
                ctx.restore();
            }
        }

        // Cancel hint
        ctx.globalAlpha = 0.35;
        ctx.font = '10px "Exo 2", sans-serif';
        ctx.fillStyle = '#ff6666';
        ctx.textAlign = 'right';
        ctx.fillText('ESC to cancel', w - 15, 20);

        ctx.restore();

        // Check ESC to cancel
        if (this.game.keysPressed['escape']) {
            this.game.keysPressed['escape'] = false;
            this.game.cancelTraining();
        }
    }


    renderTrainingGates(ctx) {
        if (!this.game.playerShip) return; // FIX: Boot safety
        if (!this.game.trainingActive && !this.game.trainingComplete) return;
        const lesson = this.game.trainingLesson;
        if (!lesson) return;

        const time = performance.now() * 0.002;

        // Render gates
        lesson.gates.forEach((gate, index) => {
            if (gate.reached && lesson.id !== 'collection') return; // Don't draw reached gates (except finish)

            const isCurrent = index === this.game.trainingGateIndex;
            const isFinish = lesson.id === 'collection' && index === lesson.gates.length - 1;

            ctx.save();
            ctx.translate(gate.x, gate.y);

            const pulse = isCurrent ? 1.0 + Math.sin(time * 2) * 0.08 : 1.0;
            const size = gate.size * pulse;

            // Gate color scheme
            let color, glowColor, alpha;
            if (gate.reached) {
                color = '#00ff66'; glowColor = 'rgba(0,255,100,0.3)'; alpha = 0.3;
            } else if (isCurrent) {
                color = '#00f3ff'; glowColor = 'rgba(0,243,255,0.4)'; alpha = 0.9;
            } else if (isFinish) {
                color = '#ffd700'; glowColor = 'rgba(255,215,0,0.3)'; alpha = 0.6 + Math.sin(time) * 0.2;
            } else {
                color = '#4466aa'; glowColor = 'rgba(68,102,170,0.2)'; alpha = 0.35;
            }

            ctx.globalAlpha = alpha;

            // --- PREMIUM VOLUMETRIC ENERGY RING ---
            ctx.shadowBlur = isCurrent ? 40 : 15;
            ctx.shadowColor = color;

            // Layer 1: Ambient Plasma Glow
            const plasmaGrad = ctx.createRadialGradient(0, 0, size * 0.8, 0, 0, size * 1.2);
            plasmaGrad.safeAddColorStop(0, 'transparent');
            plasmaGrad.safeAddColorStop(0.5, glowColor);
            plasmaGrad.safeAddColorStop(1, 'transparent');
            ctx.fillStyle = plasmaGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.2, 0, Math.PI * 2);
            ctx.fill();

            // Layer 2: Main Structural Ring
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = isCurrent ? 6 : 3;
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.stroke();
            
            // Layer 3: Inner Particle Accelerator (Fast Rotating Segments)
            ctx.setLineDash([20, 10, 5, 10]);
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#ffffff';
            ctx.globalAlpha = alpha * 0.8;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.85, -time * 2, -time * 2 + Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Layer 4: Volumetric Core Field
            if (isCurrent || isFinish) {
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
                grad.safeAddColorStop(0, isCurrent ? 'rgba(0,243,255,0.15)' : 'rgba(255,215,0,0.1)');
                grad.safeAddColorStop(0.5, isCurrent ? 'rgba(0,243,255,0.05)' : 'rgba(255,215,0,0.03)');
                grad.safeAddColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Directional chevrons on current gate (4 arrows pointing inward)
            if (isCurrent) {
                ctx.globalAlpha = 0.5 + Math.sin(time * 3) * 0.3;
                for (let a = 0; a < 4; a++) {
                    const chevAngle = (a * Math.PI / 2) + time * 0.3;
                    ctx.save();
                    ctx.rotate(chevAngle);
                    ctx.translate(size * 1.15, 0);
                    ctx.rotate(Math.PI); // Point inward
                    ctx.beginPath();
                    ctx.moveTo(12, 0);
                    ctx.lineTo(-6, -8);
                    ctx.lineTo(-6, 8);
                    ctx.closePath();
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.restore();
                }
            }

            // Gate number label
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = 0;
            ctx.font = `bold ${isCurrent ? 16 : 12}px "Exo 2", monospace`;
            ctx.textAlign = 'center';
            ctx.fillStyle = color;
            ctx.fillText(isFinish ? 'FINISH' : `G${index + 1}`, 0, size + 22);

            ctx.restore();
        });

        // Render training gems (collectible)
        if (lesson.gems) {
            lesson.gems.forEach(gem => {
                if (gem.collected) return;
                ctx.save();
                ctx.translate(gem.x, gem.y);

                const gemColor = MINERAL_TYPES[gem.type]?.color || '#ffffff';
                const gemSize = 14;
                const pulse = 1 + Math.sin(time * 3 + gem.x * 0.01) * 0.15;

                // Gem glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = gemColor;
                ctx.globalAlpha = 0.8;

                // Diamond shape
                ctx.beginPath();
                ctx.moveTo(0, -gemSize * pulse);
                ctx.lineTo(gemSize * 0.7 * pulse, 0);
                ctx.lineTo(0, gemSize * pulse);
                ctx.lineTo(-gemSize * 0.7 * pulse, 0);
                ctx.closePath();
                ctx.fillStyle = gemColor;
                ctx.fill();

                // Sparkle
                ctx.globalAlpha = 0.4 + Math.sin(time * 5 + gem.y * 0.01) * 0.3;
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            });
        }

        // Render training targets
        if (lesson.targets) {
            lesson.targets.forEach(target => {
                if (target.destroyed) return;
                ctx.save();
                ctx.translate(target.x, target.y);
                
                // Orange pulsing training mine
                const targetPulse = 1 + Math.sin(time * 5 + target.id) * 0.1;
                const r = 25 * targetPulse;
                const rotation = time * 2;
                
                // Cinematic ambient glow
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.5);
                grad.safeAddColorStop(0, 'rgba(255, 106, 0, 0.3)');
                grad.safeAddColorStop(1, 'rgba(255, 106, 0, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, 0, r * 2.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 20;
                ctx.shadowColor = '#ff6600';
                
                // Rotating outer ring with gap
                ctx.save();
                ctx.rotate(rotation);
                ctx.beginPath();
                ctx.strokeStyle = '#ff6600';
                ctx.lineWidth = 3;
                ctx.arc(0, 0, r + 15, 0, Math.PI * 1.5);
                ctx.stroke();
                ctx.restore();
                
                // Static inner ring
                ctx.beginPath();
                ctx.strokeStyle = '#ffa500';
                ctx.lineWidth = 1.5;
                ctx.arc(0, 0, r + 8, 0, Math.PI * 2);
                ctx.stroke();
                
                // Inner core with gradient
                const coreGrad = ctx.createRadialGradient(-r/3, -r/3, r/10, 0, 0, r);
                coreGrad.safeAddColorStop(0, '#fff');
                coreGrad.safeAddColorStop(0.3, '#ffaa00');
                coreGrad.safeAddColorStop(1, '#cc5500');
                ctx.fillStyle = coreGrad;
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.fill();
                
                // Target crosshair
                ctx.beginPath();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.moveTo(-r - 15, 0); ctx.lineTo(r + 15, 0);
                ctx.moveTo(0, -r - 15); ctx.lineTo(0, r + 15);
                ctx.stroke();
                
                ctx.restore();
            });
        }
        
        // Render training hazard zone (Shielding)
        if (lesson.hazardZone) {
            const hz = lesson.hazardZone;
            ctx.save();
            ctx.translate(hz.x, hz.y);
            
            // Pulsing red danger zone
            const zonePulse = 1 + Math.sin(time * 2) * 0.05;
            const r = hz.radius * zonePulse;
            
            ctx.beginPath();
            const grad = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, r);
            grad.safeAddColorStop(0, 'rgba(255, 0, 0, 0.0)');
            grad.safeAddColorStop(0.8, 'rgba(255, 0, 0, 0.2)');
            grad.safeAddColorStop(1, 'rgba(255, 0, 0, 0.5)');
            ctx.fillStyle = grad;
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.fill();
            
            // Warning border
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 50, 50, 0.8)';
            ctx.setLineDash([20, 15]);
            ctx.lineDashOffset = -time * 20;
            ctx.lineWidth = 3;
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // WARNING text rotating around edge
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff0000';
            ctx.font = 'bold 16px "Exo 2", monospace';
            ctx.fillStyle = '#ff5555';
            ctx.textAlign = 'center';
            for (let i = 0; i < 4; i++) {
                ctx.save();
                ctx.rotate(time * 0.5 + i * Math.PI / 2);
                ctx.translate(0, -r - 10);
                ctx.fillText('WARNING: RADIATION ZONE', 0, 0);
                ctx.restore();
            }
            
            ctx.restore();
        }
        
        // Render training hazards (Black holes, mines)
        if (lesson.hazards) {
            lesson.hazards.forEach(h => {
                if (h.x === -99999) return; // Destroyed
                ctx.save();
                       if (h.type === 'blackhole') {
                    // Premium Cinematic Blackhole
                    ctx.save();
                    ctx.translate(h.x, h.y);
                    const r = h.radius || 400;
                    
                    // 1. Accretion Disk (Glow)
                    const g = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
                    g.safeAddColorStop(0, 'rgba(100, 0, 255, 0.6)');
                    g.safeAddColorStop(0.4, 'rgba(50, 0, 150, 0.3)');
                    g.safeAddColorStop(1, 'rgba(0, 0, 0, 0)');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(0, 0, r, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // 2. Rotating Space-Time Swirls
                    ctx.strokeStyle = '#df80ff';
                    ctx.lineWidth = 2;
                    ctx.globalAlpha = 0.5;
                    for (let i = 0; i < 6; i++) {
                        ctx.save();
                        ctx.rotate(time * 0.5 + i * (Math.PI / 3));
                        ctx.beginPath();
                        ctx.ellipse(0, 0, r * 0.3, r, 0, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.restore();
                    }
                    
                    // 3. Central Singularity (Pure Black)
                    ctx.shadowBlur = 40;
                    ctx.shadowColor = '#000';
                    ctx.fillStyle = '#000';
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.restore();
                } else if (h.type === 'mine') {
                    // Premium Nebula Hazard (Mine)
                    ctx.translate(h.x, h.y);
                    
                    // 1. Nebula Blast Radius (Volumetric Red Cloud)
                    const nebulaGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, h.radius);
                    nebulaGrad.safeAddColorStop(0, 'rgba(255, 50, 0, 0.4)');
                    nebulaGrad.safeAddColorStop(0.6, 'rgba(150, 0, 0, 0.1)');
                    nebulaGrad.safeAddColorStop(1, 'transparent');
                    ctx.fillStyle = nebulaGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // 2. High-Frequency Outer Warning Ring
                    ctx.setLineDash([10, 5, 2, 5]);
                    ctx.strokeStyle = 'rgba(255,0,0,0.8)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(0, 0, h.radius, time * 3, time * 3 + Math.PI * 2);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    
                    // 3. Volatile Plasma Core
                    ctx.shadowBlur = 30;
                    ctx.shadowColor = '#ff0000';
                    ctx.beginPath();
                    ctx.fillStyle = '#ff3300';
                    ctx.arc(0, 0, 20 + Math.sin(time*12)*8, 0, Math.PI*2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
                
                ctx.restore();
            });
        }
    }


    animateExpandedMap() {
        if (!this.game.playerShip) return; // FIX: Boot safety
        if (!this.game.expandedMapOpen) return;

        const canvas = document.getElementById('fullscreenMapCanvas');
        if (!canvas) {
            console.error('[Map Debug] Canvas not found');
            return;
        }

        console.log('[Map Debug] Rendering expanded map, zoom:', this.game.expandedMapZoom);

        // Resize if needed (handle dynamic window resizing)
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const zoom = this.game.expandedMapZoom;
        const time = Date.now() * 0.001;

        // --- 1. DEEP SPACE BACKGROUND ---
        // Clear with a deep, rich gradient based on player position (subtle shift)
        const bgGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
        bgGradient.safeAddColorStop(0, '#000810');
        bgGradient.safeAddColorStop(0.6, '#000508');
        bgGradient.safeAddColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(zoom, zoom);
        ctx.translate(this.game.expandedMapOffset.x, this.game.expandedMapOffset.y);

        // --- 2. PARALLAX STARFIELD (Background Layers) ---
        // We generate pseudo-random stars based on world coordinates to create an infinite field
        // Layer 1: Distant, slow moving
        this.game.renderMapStars(ctx, 0.5, 0.5, 5000, 15000, '#445566');
        // Layer 2: Mid-distance
        this.game.renderMapStars(ctx, 0.3, 0.8, 3000, 10000, '#6688aa');

        // --- 3. ZONE ATMOSPHERICS ---
        // Draw large, soft radial glows for each zone to give "territory" feel
        Object.values(GALAXY_ZONES).forEach(zone => {
            const dist = zone.distanceRange.min;
            // Skip if way off screen
            // Simple cull: check distance from center of screen in world space to zone center (0,0)
            // But zones are concentric rings, so we just draw them.

            ctx.beginPath();
            ctx.arc(0, 0, dist, 0, Math.PI * 2);
            ctx.fillStyle = zone.glowColor || zone.color;
            ctx.globalAlpha = 0.03; // Very subtle atmosphere
            ctx.lineWidth = 100; // Wide soft edge
            ctx.fill();

            // Zone Boundary Ring
            ctx.beginPath();
            ctx.arc(0, 0, dist, 0, Math.PI * 2);
            ctx.strokeStyle = zone.color;
            ctx.lineWidth = 2 / zoom; // Keep thin regardless of zoom
            ctx.globalAlpha = 0.2;
            ctx.setLineDash([20, 40]); // Dashed border
            ctx.stroke();
            ctx.setLineDash([]);

            // Zone Label (Floating in space)
            // Place label at the top of the ring
            ctx.fillStyle = zone.color;
            ctx.font = `bold ${64}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.4;
            ctx.fillText(zone.name.toUpperCase(), 0, -dist + 200);
        });

        // --- 4. HOLO-GRID ---
        // A perspective grid. Since this is 2D top-down, we draw a rectangular grid that pans.
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
        ctx.lineWidth = 1 / zoom;
        const gridSize = 1000;

        // Calculate visible range to optimize rendering
        // Visible world center: -this.game.expandedMapOffset.x, -this.game.expandedMapOffset.y
        const worldCx = -this.game.expandedMapOffset.x;
        const worldCy = -this.game.expandedMapOffset.y;
        const visibleW = w / zoom;
        const visibleH = h / zoom;

        const startX = Math.floor((worldCx - visibleW) / gridSize) * gridSize;
        const endX = Math.floor((worldCx + visibleW) / gridSize) * gridSize;
        const startY = Math.floor((worldCy - visibleH) / gridSize) * gridSize;
        const endY = Math.floor((worldCy + visibleH) / gridSize) * gridSize;

        ctx.beginPath();
        for (let x = startX; x <= endX; x += gridSize) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }
        ctx.stroke();

        // --- 5. GALACTIC CARTOGRAPHY (Discovered Sectors) ---
        if (this.game.sectorManager && this.game.sectorManager.visitedSectors) {
            const sectorSize = this.game.sectorSize || 10000;
            const visited = Array.from(this.game.sectorManager.visitedSectors);
            
            // A. Draw Warp Paths (Links)
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)'; // Ethereal teal
            ctx.lineWidth = 3 / zoom;
            ctx.setLineDash([15, 10]);
            
            visited.forEach(key => {
                const coords = key.split(',').map(Number);
                const sx = coords[0];
                const sy = coords[1];
                const neighbors = [
                    `${sx+1},${sy}`, `${sx},${sy+1}`
                ];
                neighbors.forEach(nKey => {
                    if (this.game.sectorManager.visitedSectors.has(nKey)) {
                        const nCoords = nKey.split(',').map(Number);
                        const nsx = nCoords[0];
                        const nsy = nCoords[1];
                        ctx.moveTo(sx * sectorSize + sectorSize/2, sy * sectorSize + sectorSize/2);
                        ctx.lineTo(nsx * sectorSize + sectorSize/2, nsy * sectorSize + sectorSize/2);
                    }
                });
            });
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            // B. Draw Sector Nodes
            visited.forEach(key => {
                const coords = key.split(',').map(Number);
                const sx = coords[0];
                const sy = coords[1];
                const x = sx * sectorSize + sectorSize/2;
                const y = sy * sectorSize + sectorSize/2;
                
                // Discovery Pulsar Effect
                const discoveryPulse = 1 + Math.sin(time * 2 + sx * 0.5) * 0.1;

                // Outer Node Glow
                const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, 150 / zoom);
                nodeGlow.safeAddColorStop(0, 'rgba(0, 243, 255, 0.15)');
                nodeGlow.safeAddColorStop(1, 'transparent');
                ctx.fillStyle = nodeGlow;
                ctx.beginPath();
                ctx.arc(x, y, 150 / zoom, 0, Math.PI * 2);
                ctx.fill();

                // Inner Tech-Node
                ctx.strokeStyle = '#00f3ff';
                ctx.lineWidth = 2 / zoom;
                ctx.beginPath();
                ctx.arc(x, y, 12 / zoom * discoveryPulse, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = '#00f3ff';
                ctx.beginPath();
                ctx.arc(x, y, 4 / zoom, 0, Math.PI * 2);
                ctx.fill();

                // Sector ID label at higher zoom
                if (zoom > 0.4) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    ctx.font = `bold ${14 / zoom}px "Orbitron", sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillText(`SECTOR ${sx}:${sy}`, x, y - 25 / zoom);
                }
            });
        }


        // --- 5. ORBITAL MECHANICS & PLANETS (Cosmetic) ---
        // Procedural planets based on zone
        // We'll use a deterministic random based on index/position
        // (Simplified for now: drawing a few fixed 'planets' per zone would be better but random serves 'world' feel)

        // --- 6. RESOURCE DEPOSITS (Advanced Icons) ---
        this.game.resourceDeposits.forEach(dep => {
            // Pulsing effect
            const pulse = 1 + Math.sin(time * 3 + dep.x * 0.01) * 0.2;

            // Deposit Glow
            const zoneColor = GALAXY_ZONES[dep.zone] ? GALAXY_ZONES[dep.zone].color : '#fff';
            const glowColor = GALAXY_ZONES[dep.zone] ? (GALAXY_ZONES[dep.zone].glowColor || zoneColor) : '#fff';

            // Draw outer glow
            const grad = ctx.createRadialGradient(dep.x, dep.y, 5 * pulse, dep.x, dep.y, 30 * pulse);
            grad.safeAddColorStop(0, glowColor);
            grad.safeAddColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(dep.x, dep.y, 40 * pulse, 0, Math.PI * 2);
            ctx.fill();

            // Draw core icon (Diamond shape)
            ctx.globalAlpha = 1;
            ctx.fillStyle = zoneColor;
            const size = 12;
            ctx.beginPath();
            ctx.moveTo(dep.x, dep.y - size);
            ctx.lineTo(dep.x + size, dep.y);
            ctx.lineTo(dep.x, dep.y + size);
            ctx.lineTo(dep.x - size, dep.y);
            ctx.closePath();
            ctx.fill();

            // Label
            if (zoom > 0.8) {
                ctx.fillStyle = '#fff';
                ctx.font = '14px "Segoe UI", sans-serif'; // Cleaner font
                ctx.textAlign = 'center';
                ctx.fillText(dep.name, dep.x, dep.y + 40);

                ctx.font = '10px "Segoe UI", sans-serif';
                ctx.fillStyle = '#aaa';
                ctx.fillText(`Richness: ${(dep.richness * 100).toFixed(0)}% `, dep.x, dep.y + 55);
            }
        });

        // --- 6.5. MINERALS/GEMS (Navigation Aid) ---
        // Show minerals on the map with proper color coding
        const viewW = w / zoom;
        const viewH = h / zoom;
        this.game.minerals.forEach(mineral => {
            // Viewport Cull to ensure map is blazingly fast even with 3000 gems!
            if (Math.abs(mineral.x + this.game.expandedMapOffset.x) > viewW/2 + 100) return;
            if (Math.abs(mineral.y + this.game.expandedMapOffset.y) > viewH/2 + 100) return;

            const mineralInfo = MINERAL_TYPES[mineral.type];
            if (!mineralInfo) return;

            // Glow effect for visibility
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = mineralInfo.color;
            ctx.beginPath();
            ctx.arc(mineral.x, mineral.y, 8 / zoom, 0, Math.PI * 2);
            ctx.fill();

            // Solid marker
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            ctx.arc(mineral.x, mineral.y, 4 / zoom, 0, Math.PI * 2);
            ctx.fill();

            // Show gem type label at higher zoom
            if (zoom > 1.5) {
                ctx.fillStyle = '#fff';
                ctx.font = `${10 / zoom}px Arial`;
                ctx.textAlign = 'center';
                ctx.fillText(mineralInfo.name, mineral.x, mineral.y - 10 / zoom);
            }
        });
        ctx.globalAlpha = 1.0;

        // --- 6.7. NEBULA HAZARDS (Regional Map) ---
        for (const sector of this.game.loadedSectors.values()) {
            if (sector.hazards && sector.hazards.nebula) {
                const neb = sector.hazards.nebula;
                const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.radius);
                const col = neb.type === 'toxic' ? '255, 0, 100' : '0, 243, 255';
                grad.safeAddColorStop(0, `rgba(${col}, 0.2)`);
                grad.safeAddColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(neb.x, neb.y, neb.radius, 0, Math.PI * 2);
                ctx.fill();

                if (zoom > 0.6) {
                    ctx.fillStyle = `rgba(${col}, 0.6)`;
                    ctx.font = `bold ${12 / zoom}px Orbitron`;
                    ctx.textAlign = 'center';
                    ctx.fillText(`${neb.type.toUpperCase()} NEBULA`, neb.x, neb.y);
                }
            }
        }

        // --- 7. PLAYER SHIP (Detailed HUD Marker) ---
        const shipX = this.game.playerShip.x;
        const shipY = this.game.playerShip.y;

        ctx.translate(shipX, shipY);

        // View Cone (Field of View)
        const fovRadius = 400;
        ctx.rotate(this.game.playerShip.rotation + Math.PI / 2); // Align with ship heading

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, fovRadius, -Math.PI / 6, Math.PI / 6); // 60 degree cone
        ctx.fillStyle = 'rgba(0, 255, 100, 0.1)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 255, 100, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ship Icon (Triangle)
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(14, 14);
        ctx.lineTo(0, 8);
        ctx.lineTo(-14, 14);
        ctx.closePath();
        ctx.fillStyle = '#0f0';
        ctx.shadowColor = '#0f0';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        ctx.restore();

        // --- 8. UI OVERLAYS (Screen Space) ---
        // Coordinates Overlay (Fixed to screen corners)
        ctx.font = '14px Consolas, monospace';
        ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
        ctx.textAlign = 'left';
        ctx.fillText(`SECTOR: [${Math.floor(shipX / 5000)}, ${Math.floor(shipY / 5000)}]`, 20, h - 60);
        ctx.fillText(`COORDS: X ${Math.round(shipX)}  Y ${Math.round(shipY)} `, 20, h - 40);

        // Scale Bar
        const scaleWidth = 200; // pixels
        const scaleDistance = scaleWidth / zoom;
        ctx.beginPath();
        ctx.moveTo(w - 220, h - 40);
        ctx.lineTo(w - 20, h - 40);
        ctx.moveTo(w - 220, h - 45);
        ctx.lineTo(w - 220, h - 35);
        ctx.moveTo(w - 20, h - 45);
        ctx.lineTo(w - 20, h - 35);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(`${Math.round(scaleDistance)} km`, w - 120, h - 50);

        requestAnimationFrame(() => this.animateExpandedMap());
    }



    drawDeepSpaceSpecific() {
        if (!this.game.config.showBackground) return;

        const ctx = this.game.ctx;
        const time = performance.now() * 0.0005;

        // 1. Galaxies
        if (this.game.galaxies && this.game.galaxies.length > 0) {
            this.game.galaxies.forEach(g => {
                if (g.flownOut) return; // Skip if flown out during warp
                ctx.save();
                // Position comes from flyObject during disengage
                ctx.translate(g.x, g.y);

                // During disengage: use scale and alpha from flyObject
                if (this.game.warpDisengaging && g.warpScale !== undefined) {
                    ctx.scale(g.warpScale, g.warpScale);
                    ctx.globalAlpha = g.warpAlpha || 0;
                }

                ctx.rotate(g.angle + time * 0.1);

                const spiralGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, g.size);
                spiralGradient.safeAddColorStop(0, 'rgba(255,255,255,0.8)');
                spiralGradient.safeAddColorStop(0.2, g.color);
                spiralGradient.safeAddColorStop(1, 'transparent');

                ctx.fillStyle = spiralGradient;
                ctx.beginPath();
                for (let i = 0; i < 3; i++) {
                    ctx.rotate(Math.PI * 2 / 3);
                    ctx.ellipse(0, 0, g.size, g.size / 4, 0, 0, Math.PI * 2); // Corrected ellipse center
                }
                ctx.fill();
                ctx.restore();
            });
        }

        // 2. Black Holes
        if (this.game.blackHoles && this.game.blackHoles.length > 0) {
            this.game.blackHoles.forEach(bh => {
                if (bh.flownOut) return; // Skip if flown out during warp
                ctx.save();

                // Position comes from flyObject during disengage
                ctx.translate(bh.x, bh.y);

                // During disengage: use scale and alpha from flyObject
                if (this.game.warpDisengaging && bh.warpScale !== undefined) {
                    ctx.scale(bh.warpScale, bh.warpScale);
                    ctx.globalAlpha = bh.warpAlpha || 0;
                }

                // Accretion disk
                ctx.beginPath();
                ctx.strokeStyle = 'orange';
                ctx.lineWidth = 2;
                ctx.arc(0, 0, bh.size * 1.5, 0, Math.PI * 2);
                ctx.stroke();

                // Event Horizon
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.arc(0, 0, bh.size, 0, Math.PI * 2);
                ctx.fill();

                // Glow
                ctx.shadowColor = 'purple';
                ctx.shadowBlur = 20;
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.restore();
            });
        }

        // 3. Planets (with zoom-based detail and proper Saturn-style rings)
        if (this.game.planets && this.game.planets.length > 0) {
            const zoom = this.game.camera.zoom;
            this.game.planets.forEach(p => {
                if (p.flownOut) return; // Skip if flown out during warp
                ctx.save();

                // Position comes from flyObject during disengage
                ctx.translate(p.x, p.y);

                // During disengage: use scale and alpha from flyObject
                if (this.game.warpDisengaging && p.warpScale !== undefined) {
                    ctx.scale(p.warpScale, p.warpScale);
                    ctx.globalAlpha = p.warpAlpha || 0;
                }

                // Axial rotation over time
                const rotationSpeed = p.rotationSpeed || 0.05;
                ctx.rotate(p.axialTilt + time * rotationSpeed);

                // Size is handled by world scale, but we use effective screen radius for detail tiers
                const screenRadius = p.radius * zoom;
                const detailLevel = Math.min(3, Math.floor(screenRadius / 30)); // 0-3 detail levels

                // === SATURN-STYLE RINGS: Draw back half first ===
                if (p.hasRings) {
                    this.drawPlanetRingsHalf(ctx, p, 'back');
                }

                // Atmospheric glow (outer)
                if (p.hasAtmosphere) {
                    const atmosGrad = ctx.createRadialGradient(0, 0, p.radius * 0.95, 0, 0, p.radius * 1.15);
                    const atmosAlpha = (0.5 + Math.sin(time * 2 + p.textureSeed) * 0.1).toFixed(2);
                    this.safeAddColorStop(atmosGrad, 0, 'transparent');
                    this.safeAddColorStop(atmosGrad, 0.5, p.atmosphereColor + Math.floor(atmosAlpha * 64).toString(16).padStart(2, '0'));
                    this.safeAddColorStop(atmosGrad, 1, 'transparent');
                    ctx.fillStyle = atmosGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, p.radius * 1.15, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Planet body with 3D gradient
                const bodyGrad = ctx.createRadialGradient(
                    -p.radius * 0.3, -p.radius * 0.3, 0,
                    0, 0, p.radius
                );
                this.safeAddColorStop(bodyGrad, 0, p.secondaryColor);
                this.safeAddColorStop(bodyGrad, 0.4, p.baseColor);
                this.safeAddColorStop(bodyGrad, 0.8, p.tertiaryColor);
                this.safeAddColorStop(bodyGrad, 1, '#000000');

                ctx.fillStyle = bodyGrad;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Surface texture (procedural bands/patterns based on zoom)
                if (detailLevel >= 1) {
                    ctx.globalAlpha = 0.3;
                    ctx.strokeStyle = p.tertiaryColor;
                    ctx.lineWidth = 2 / zoom;

                    // Draw bands for gas giants
                    if (p.type === 'gas-giant' || p.type === 'ice-giant') {
                        for (let i = -4; i <= 4; i++) {
                            const bandY = p.radius * (i * 0.15);
                            const bandWidth = Math.sqrt(p.radius * p.radius - bandY * bandY);
                            if (bandWidth > 0) {
                                ctx.beginPath();
                                ctx.ellipse(0, bandY, bandWidth, 3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                        }
                    }

                    // Draw continents for terrestrial/ocean
                    if ((p.type === 'terrestrial' || p.type === 'ocean') && detailLevel >= 2) {
                        ctx.fillStyle = p.type === 'ocean' ? p.baseColor : p.secondaryColor;
                        const seed = p.textureSeed;
                        for (let j = 0; j < 5; j++) {
                            const cx = Math.cos(seed + j * 1.2) * p.radius * 0.5;
                            const cy = Math.sin(seed * 0.7 + j) * p.radius * 0.4;
                            const cr = p.radius * (0.15 + Math.sin(seed + j) * 0.1);
                            ctx.beginPath();
                            ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    ctx.globalAlpha = 1;
                }

                // Shadow side
                const shadowGrad = ctx.createLinearGradient(-p.radius, 0, p.radius, 0);
                this.safeAddColorStop(shadowGrad, 0, 'transparent');
                this.safeAddColorStop(shadowGrad, 0.6, 'transparent');
                this.safeAddColorStop(shadowGrad, 1, 'rgba(0,0,0,0.6)');
                ctx.fillStyle = shadowGrad;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // === SATURN-STYLE RINGS: Draw front half on top ===
                if (p.hasRings) {
                    this.drawPlanetRingsHalf(ctx, p, 'front');
                }

                ctx.restore();
            });
        }
    }

    drawMissileBase(ctx, base, time, damaged = false, meltdowns = 0, rx = null, ry = null, rScale = 1.0) {
        ctx.save();

        // Use provided rotated coordinates or fallback to base (which would be non-rotated)
        const finalX = rx !== null ? rx : base.x;
        const finalY = ry !== null ? ry : base.y;

        ctx.translate(finalX, finalY);

        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const size = (base.size || 40) * rScale / safeZoom;
        const alertPulse = base.alertLevel > 0 ? Math.sin(time * 0.001) * 0.3 + 0.7 : 0.5;

        // Hit Flash Logic
        if (base.hitFlash > 0) {
            base.hitFlash--;
            ctx.globalCompositeOperation = 'source-over';

            // White flash override
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(0, 0, size * 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
            return; // Skip normal drawing if flashing
        }

        // 1. DANGER AURA GLOW (pulsing perimeter)
        const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.8);
        let alertColor;
        if (meltdowns > 0) {
            alertColor = `rgba(150, 255, 50, ${0.4 * meltdowns})`; // Nuclear Green
        } else {
            alertColor = base.alertLevel > 0.5 ? `rgba(255, 0, 0, ${0.3 * alertPulse})` : 'rgba(80, 100, 200, 0.15)';
        }

        this.safeAddColorStop(auraGrad, 0, alertColor);
        this.safeAddColorStop(auraGrad, 0.5, meltdowns > 0 ? 'rgba(50, 150, 50, 0.15)' : 'rgba(40, 40, 120, 0.1)');
        this.safeAddColorStop(auraGrad, 1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(0, 0, size * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // 2. SCANNING LASER (Atmospheric scifi effect)
        if (base.active && !damaged) {
            ctx.save();
            ctx.rotate(base.turretAngle || 0);
            const scanAngle = Math.sin(time * 0.002) * 0.2;
            const scanLen = size * 6;
            const scanGrad = ctx.createLinearGradient(0, 0, scanLen, 0);
            this.safeAddColorStop(scanGrad, 0, `rgba(255, 0, 0, ${0.4 * alertPulse})`);
            this.safeAddColorStop(scanGrad, 1, 'transparent');
            ctx.strokeStyle = scanGrad;
            ctx.lineWidth = 1 / safeZoom;
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(Math.cos(scanAngle) * scanLen, Math.sin(scanAngle) * scanLen);
            ctx.stroke();
            ctx.restore();
        }

        // Base platform (octagonal military structure)
        ctx.save();
        ctx.rotate(base.rotationPhase);

        // Outer ring
        ctx.fillStyle = damaged ? '#2a1a2e' : '#1a1a2e';
        ctx.strokeStyle = meltdowns > 0 ? '#00ff00' : (base.alertLevel > 0.5 ? '#ff3333' : '#4466aa');
        ctx.lineWidth = 3 / safeZoom;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * size * 1.2;
            const y = Math.sin(angle) * size * 1.2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner platform
        ctx.fillStyle = damaged ? '#352545' : '#252545';
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
            const x = Math.cos(angle) * size * 0.8;
            const y = Math.sin(angle) * size * 0.8;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Rotating turret (aims at player)
        ctx.save();
        ctx.rotate(base.turretAngle);

        // Turret base
        ctx.fillStyle = damaged ? '#443355' : '#333355';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // 5. RAILGUN BARREL ASSEMBLY
        const barrelLength = size * (damaged ? (1.6 - meltdowns * 0.3) : 1.8);
        const barrelWidth = size * 0.35;
        const recoil = base.recoil || 0;

        // Left and Right Rail Rails
        ctx.fillStyle = meltdowns > 0 ? '#448844' : '#555566';
        ctx.fillRect(-size * 0.2 - recoil, -barrelWidth / 2, barrelLength, barrelWidth * 0.3);
        ctx.fillRect(-size * 0.3 - recoil, barrelWidth / 2 - barrelWidth * 0.3, barrelLength, barrelWidth * 0.3);

        // Barrel core energy glow (charged look)
        const chargeAlpha = 0.3 + (base.alertLevel > 0.8 ? 0.4 : 0);
        const chargeGrad = ctx.createLinearGradient(0, 0, barrelLength, 0);
        this.safeAddColorStop(chargeGrad, 0, meltdowns > 0 ? '#22ff44' : '#44aaff');
        this.safeAddColorStop(chargeGrad, 1, 'transparent');
        ctx.fillStyle = chargeGrad;
        ctx.globalAlpha = chargeAlpha;
        ctx.fillRect(0 - recoil, -barrelWidth * 0.1, barrelLength, barrelWidth * 0.2);
        ctx.globalAlpha = 1.0;

        // Muzzle Brake / Energy Gates
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = '#222';
            ctx.fillRect(size * 0.5 + i * size * 0.4 - recoil, -barrelWidth * 0.6, size * 0.15, barrelWidth * 1.2);
            
            if (base.alertLevel > 0.6) {
                ctx.fillStyle = `rgba(255, 50, 50, ${alertPulse * 0.8})`;
                ctx.fillRect(size * 0.5 + i * size * 0.4 - recoil + size * 0.05, -barrelWidth * 0.5, size * 0.05, barrelWidth * 1.0);
            }
        }

        ctx.restore();
        ctx.restore();

        // Mutant green viscous sludge layer (rendered on top of the base during meltdown)
        if (meltdowns > 0) {
            ctx.save();
            ctx.translate(base.x, base.y);
            ctx.globalAlpha = 0.6 + Math.sin(time * 0.01) * 0.2;
            ctx.fillStyle = '#22ff44'; // Neon Green Sludge

            // Draw various viscous blobs dripping/coating the base
            for (let i = 0; i < 6; i++) {
                const blobAngle = (i / 6) * Math.PI * 2 + time * 0.002;
                const blobDist = size * (0.6 + Math.sin(time * 0.005 + i) * 0.4);
                const blobSize = size * (0.3 + Math.cos(time * 0.008 + i) * 0.2) * meltdowns;

                const bx = Math.cos(blobAngle) * blobDist;
                const by = Math.sin(blobAngle) * blobDist;

                ctx.beginPath();
                ctx.arc(bx, by, blobSize, 0, Math.PI * 2);
                ctx.fill();

                // Add highlight to blob for "viscous" look
                ctx.fillStyle = '#88ff88';
                ctx.beginPath();
                ctx.arc(bx - blobSize * 0.3, by - blobSize * 0.3, blobSize * 0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#22ff44';
            }

            // Central sludge buildup
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.5 * meltdowns, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    drawPlanetRingsHalf(ctx, planet, half) {
        const p = planet;
        ctx.save();

        // Create clipping region for front or back half
        ctx.beginPath();
        if (half === 'back') {
            // Back half: top portion of ellipse (behind planet)
            ctx.rect(-p.ringOuterRadius * 1.5, -p.ringOuterRadius, p.ringOuterRadius * 3, p.ringOuterRadius);
        } else {
            // Front half: bottom portion of ellipse (in front of planet)
            ctx.rect(-p.ringOuterRadius * 1.5, 0, p.ringOuterRadius * 3, p.ringOuterRadius);
        }
        ctx.clip();

        // Draw the ring bands
        ctx.globalAlpha = half === 'back' ? 0.4 : 0.7; // Back rings dimmer

        // Multiple ring bands with gradient colors
        for (let i = 0; i < 5; i++) {
            const ringR = p.ringInnerRadius + (p.ringOuterRadius - p.ringInnerRadius) * (i / 5 + 0.1);
            const ringThickness = (p.ringOuterRadius - p.ringInnerRadius) * 0.12;

            // Slight color variation per band
            const hueShift = i * 5;
            ctx.strokeStyle = p.ringColor;
            ctx.lineWidth = ringThickness;

            ctx.beginPath();
            ctx.ellipse(0, 0, ringR, ringR * 0.25, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }



    drawStarShape(ctx, x, y, r) {
        ctx.beginPath();
        const pr = r * 0.5;
        ctx.moveTo(x, y - r);
        ctx.lineTo(x + pr, y - pr);
        ctx.lineTo(x + r, y);
        ctx.lineTo(x + pr, y + pr);
        ctx.lineTo(x, y + r);
        ctx.lineTo(x - pr, y + pr);
        ctx.lineTo(x - r, y);
        ctx.lineTo(x - pr, y - pr);
        ctx.closePath();
        ctx.fill();
    }



    renderSpaceBases(ctx, time) {
        const ship = this.game.playerShip;
        const viewDist = 8000;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const center = this.game.getConstellationCenter();

        if (!this.game.spaceBases) return;

        this.game.spaceBases.forEach(base => {
            const dx = base.x - ship.x;
            const dy = base.y - ship.y;
            if (dx*dx+dy*dy > viewDist * viewDist) return;

            const rotated = this.game.physicsManager.rotate3D(base.x, base.y, base.z || 0, center.x, center.y);
            const size = 70 * rotated.scale / safeZoom; // Slightly larger for Phase 16

            // === TRIBUTE BEAM (Phase 16-1) ===
            const isCapital = base.planetName === this.game.baseBuilder?.capitalBaseName;
            const hasLogistics = Object.values(base).some(v => v === 'log');
            if (hasLogistics && !isCapital && this.game.baseBuilder?.capitalBase) {
                const cap = this.game.baseBuilder.capitalBase;
                const capRot = this.game.physicsManager.rotate3D(cap.x, cap.y, 0, center.x, center.y);
                
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(rotated.x, rotated.y);
                ctx.lineTo(capRot.x, capRot.y);
                
                // Pulsing Ion Trail
                const beamPulse = (Math.sin(time * 0.005) + 1) / 2;
                const grad = ctx.createLinearGradient(rotated.x, rotated.y, capRot.x, capRot.y);
                this.safeAddColorStop(grad, 0, `rgba(0, 240, 255, ${0.1 + beamPulse * 0.2})`);
                this.safeAddColorStop(grad, 1, 'rgba(0, 100, 255, 0)');
                
                ctx.strokeStyle = grad;
                ctx.lineWidth = (2 + beamPulse * 3) / safeZoom;
                ctx.setLineDash([20 / safeZoom, 10 / safeZoom]);
                ctx.lineDashOffset = -time * 0.1;
                ctx.stroke();
                ctx.restore();
            }

            ctx.save();
            ctx.translate(rotated.x, rotated.y);

            // Base platform glow
            const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
            this.safeAddColorStop(glow, 0, 'rgba(0, 255, 150, 0.2)');
            this.safeAddColorStop(glow, 1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath(); ctx.arc(0, 0, size * 2, 0, Math.PI * 2); ctx.fill();

            // Structure
            ctx.strokeStyle = '#00ffaa';
            ctx.lineWidth = 2 / safeZoom;
            ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.stroke();

            // Label
            ctx.fillStyle = '#fff';
            ctx.font = `${10 * rotated.scale / safeZoom}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.fillText(base.planetName || "OUTPOST", 0, size + 20);

            // === PLANETARY SHIELD (Phase 16-2) ===
            const hasShield = Object.values(base).some(v => v === 'shield');
            if (hasShield) {
                const shieldRadius = size * 2.5;
                const shieldPulse = (Math.sin(time * 0.003) * 0.1) + 0.9;
                
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, shieldRadius, 0, Math.PI * 2);
                
                // Hex-grid shield effect (simulated with radial gradient and transparency)
                const shieldGrad = ctx.createRadialGradient(0, 0, shieldRadius * 0.8, 0, 0, shieldRadius);
                this.safeAddColorStop(shieldGrad, 0, 'rgba(0, 150, 255, 0.0)');
                this.safeAddColorStop(shieldGrad, 0.5, 'rgba(0, 200, 255, 0.2)');
                this.safeAddColorStop(shieldGrad, 1, 'rgba(0, 255, 255, 0.4)');
                
                ctx.fillStyle = shieldGrad;
                ctx.globalAlpha = shieldPulse;
                ctx.fill();
                
                // Shield Rim
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.lineWidth = 3 / safeZoom;
                ctx.stroke();
                
                // Pulsing hex highlights
                ctx.setLineDash([10 / safeZoom, 20 / safeZoom]);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.stroke();
                ctx.restore();
            }


            // === IMPERIAL CAPITAL CORE (Phase 16-3) ===
            const isCap = base.planetName === this.game.baseBuilder?.capitalBaseName;
            if (isCap) {
                 ctx.save();
                 const crownPulse = Math.sin(time * 0.002) * 0.2 + 1.2;
                 ctx.strokeStyle = '#ffd700';
                 ctx.lineWidth = 4 / safeZoom;
                 ctx.beginPath(); ctx.arc(0, 0, size * crownPulse, 0, Math.PI * 2); ctx.stroke();
                 
                 for (let i = 0; i < 8; i++) {
                     const ang = (i / 8) * Math.PI * 2 + time * 0.01;
                     ctx.beginPath();
                     ctx.moveTo(Math.cos(ang) * size, Math.sin(ang) * size);
                     ctx.lineTo(Math.cos(ang) * size * 1.5, Math.sin(ang) * size * 1.5);
                     ctx.stroke();
                 }
                 ctx.restore();
            }

            ctx.restore();
        });

        this.renderInfluenceGrid(ctx, time);
    }

    renderDrones(ctx, time) {
        if (!this.game.droneManager) return;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const center = this.game.getConstellationCenter();

        if (!this.game.droneManager || !this.game.droneManager.drones) return;

        this.game.droneManager.drones.forEach(drone => {
            const rotated = this.game.physicsManager.rotate3D(drone.x, drone.y, 0, center.x, center.y);
            const size = 12 * rotated.scale / safeZoom;

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            ctx.rotate(drone.rotation);

            // Drone Body (Industrial Yellow)
            ctx.fillStyle = '#ffcc00';
            ctx.beginPath();
            ctx.moveTo(size, 0); ctx.lineTo(-size * 0.5, -size * 0.8); ctx.lineTo(-size * 0.5, size * 0.8);
            ctx.closePath(); ctx.fill();

            // Thruster
            if (Math.random() > 0.3) {
                ctx.fillStyle = '#00ffff';
                ctx.beginPath(); ctx.arc(-size * 0.6, 0, size * 0.4, 0, Math.PI * 2); ctx.fill();
            }

            ctx.restore();
        });

        // === RENDER DEFENSE PLATFORMS (Phase 16-2) ===
        if (this.game.droneManager && this.game.droneManager.platforms) {
            this.game.droneManager.platforms.forEach(p => {
                const rotated = this.game.physicsManager.rotate3D(p.x, p.y, 0, center.x, center.y);
                const size = 15 * rotated.scale / safeZoom;

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                ctx.rotate(p.angle + Math.PI/2); // Point outward

                // Platform Body (Sleek Cyan/Silver)
                ctx.fillStyle = '#00ffaa';
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1 / safeZoom;
                
                // Diamond shape
                ctx.beginPath();
                ctx.moveTo(0, -size);
                ctx.lineTo(size * 0.7, 0);
                ctx.lineTo(0, size);
                ctx.lineTo(-size * 0.7, 0);
                ctx.closePath();
                ctx.fill(); ctx.stroke();
                
                // Power core
                const pulse = (Math.sin(time * 0.01) + 1) / 2;
                ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
                ctx.beginPath(); ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2); ctx.fill();

                ctx.restore();
            });
        }
    }

    flashWhite(durationS = 1.0) {
        this.flashAlpha = 1.0;
        this.flashDuration = durationS * 60; // 60fps
    }

    drawWarpTunnel(ctx, time, intensity) {
        const cx = this.game.canvas.width / 2;
        const cy = this.game.canvas.height / 2;
        const maxDim = Math.max(this.game.canvas.width, this.game.canvas.height);

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Tunnel is screen-space
        ctx.globalCompositeOperation = 'screen';
        
        // 1. NEBULA FLOW STREAKS (Swirling into center)
        const streakCount = 20;
        for (let i = 0; i < streakCount; i++) {
            const speed = 0.002 + i * 0.0001;
            const angle = (time * speed + i * (Math.PI * 2 / streakCount)) % (Math.PI * 2);
            const r = (time * (15 + i) % (maxDim * 1.5));
            const alpha = Math.max(0, (1 - r / (maxDim * 1.5)) * intensity);
            
            ctx.strokeStyle = `hsla(${210 + i * 5}, 80%, 60%, ${alpha * 0.4})`;
            ctx.lineWidth = 15 * intensity;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * (r * 0.4), cy + Math.sin(angle) * (r * 0.4));
            ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
            ctx.stroke();
        }

        // 2. WARP RINGS (Pulse outward)
        const ringCount = 6;
        for (let i = 0; i < ringCount; i++) {
            const p = ((time * 0.003 + i / ringCount) % 1.0);
            const radius = p * maxDim * 1.5;
            const alpha = (1 - p) * 0.5 * intensity;
            
            ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
            ctx.lineWidth = 30 * (1 - p) * intensity;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // "Electric" ring highlight
            if (p < 0.8) {
                ctx.setLineDash([30, 60]);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
                ctx.beginPath();
                ctx.arc(cx, cy, radius * 0.98, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        // 3. PERIPHERAL COLOR SHIFT (Chromatic Aberration simulation)
        if (intensity > 0.5) {
            ctx.globalCompositeOperation = 'overlay';
            const grad = ctx.createRadialGradient(cx, cy, maxDim * 0.4, cx, cy, maxDim * 1.0);
            grad.safeAddColorStop(0, 'rgba(0,0,0,0)');
            grad.safeAddColorStop(1, `rgba(0, 50, 255, ${0.3 * intensity})`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        }

        ctx.restore();
    }

    renderPostEffects(ctx) {
        if (this.flashAlpha > 0) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.flashAlpha})`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
            
            this.flashAlpha -= 1 / (this.flashDuration || 60);
            if (this.flashAlpha < 0) this.flashAlpha = 0;
        }
    }

    renderEdgeMarkers(ctx) {
        if (!this.game.playerShip) return; // FIX: Boot safety
        if (!this.game.flightMode || this.game.hudHidden) return;

        const canvas = ctx.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const margin = 40; // Pixels from edge

        // 1. Gather Targets
        const targets = [];

        // Trade Convoys
        if (this.game.aiManager && this.game.aiManager.ships) {
            this.game.aiManager.ships.forEach(ship => {
                if (ship.vesselType === 'freighter') {
                    targets.push({
                        x: ship.x,
                        y: ship.y,
                        label: 'CONVOY',
                        color: '#FFD700',
                        icon: '🚛'
                    });
                }
            });
        }

        // Active Raids
        if (this.game.spaceBases) {
            this.game.spaceBases.forEach(base => {
                if (base.isRaidActive) {
                    targets.push({
                        x: base.x,
                        y: base.y,
                        label: 'RAID',
                        color: '#ff4444',
                        icon: '🚨',
                        pulse: true
                    });
                }
            });
        }

        if (targets.length === 0) return;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Screen space

        targets.forEach(target => {
            // Project world to screen
            const dx = target.x - this.game.playerShip.x;
            const dy = target.y - this.game.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Screen coords relative to center
            const sx = dx * this.game.camera.zoom;
            const sy = dy * this.game.camera.zoom;

            // Check if on screen
            const isOnScreen = Math.abs(sx) < (canvas.width / 2 - margin) && 
                               Math.abs(sy) < (canvas.height / 2 - margin);

            if (!isOnScreen) {
                // Calculate edge intersection
                const angle = Math.atan2(sy, sx);
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);

                let edgeX, edgeY;
                const aspect = canvas.width / canvas.height;
                const tan = Math.tan(angle);

                if (Math.abs(sx / (canvas.width / 2)) > Math.abs(sy / (canvas.height / 2))) {
                    // Hits left/right
                    edgeX = (sx > 0 ? 1 : -1) * (canvas.width / 2 - margin);
                    edgeY = edgeX * (sy / sx);
                } else {
                    // Hits top/bottom
                    edgeY = (sy > 0 ? 1 : -1) * (canvas.height / 2 - margin);
                    edgeX = edgeY * (sx / sy);
                }

                // Final screen coords
                const rx = centerX + edgeX;
                const ry = centerY + edgeY;

                // Draw Marker
                const alpha = target.pulse ? (0.6 + 0.4 * Math.sin(Date.now() / 150)) : 0.8;
                ctx.globalAlpha = alpha;

                // Pointer Arrow
                ctx.save();
                ctx.translate(rx, ry);
                ctx.rotate(angle);
                
                ctx.fillStyle = target.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = target.color;
                
                ctx.beginPath();
                ctx.moveTo(10, 0);
                ctx.lineTo(-10, -8);
                ctx.lineTo(-6, 0);
                ctx.lineTo(-10, 8);
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                // Label and Distance
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 10px Orbitron';
                ctx.textAlign = edgeX > 0 ? 'right' : 'left';
                ctx.textBaseline = 'middle';
                
                const labelX = rx + (edgeX > 0 ? -20 : 20);
                const distKm = (dist / 1000).toFixed(1) + 'km';
                
                ctx.fillText(`${target.icon} ${target.label}`, labelX, ry - 6);
                ctx.font = '8px monospace';
                ctx.fillStyle = target.color;
                ctx.fillText(distKm, labelX, ry + 6);

                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1.0;
            }
        });

        ctx.restore();
    }

    drawSingularityGuardian(ctx, bh, time, rScale, safeZoom) {
        const radiusOrSize = bh.radius || bh.size || 300;
        const size = radiusOrSize * rScale / safeZoom;
        const boss = (this.game.bossManager && this.game.bossManager.activeBoss) || { phase: 1 };

        // 1. Einstein Ring (Light Bending)
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const ringGrad = this.getGradient(ctx, 'radial', 0, 0, size * 0.35, 0, 0, size * 0.5, [
            { offset: 0, color: 'rgba(255, 200, 50, 0)' },
            { offset: 0.5, color: 'rgba(255, 100, 0, 0.8)' },
            { offset: 0.8, color: 'rgba(255, 255, 255, 1)' },
            { offset: 1, color: 'rgba(255, 150, 0, 0)' }
        ]);
        ctx.strokeStyle = ringGrad;
        ctx.lineWidth = 15 * rScale / safeZoom;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // 2. Event Horizon (Perfect Black)
        ctx.fillStyle = '#000';
        ctx.shadowBlur = 40 * rScale / safeZoom;
        ctx.shadowColor = '#ff4400';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 3. High-Fidelity Accretion Disk
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const ringCount = 12;
        for (let i = 0; i < ringCount; i++) {
            const r = size * (0.5 + i * 0.15);
            const alpha = 0.6 * (1 - i / ringCount);
            const rot = time * (0.002 - i * 0.0001) + i * 0.2;
            
            ctx.strokeStyle = `hsla(${20 + i * 5}, 100%, 60%, ${alpha})`;
            ctx.lineWidth = (4 - i * 0.2) * rScale / safeZoom;
            ctx.beginPath();
            // Einstein distortion: flattened ellipse
            ctx.ellipse(0, 0, r, r * 0.25, rot, 0, Math.PI * 2);
            ctx.stroke();
            
            // Add some "sparks" on the rings
            if (i % 3 === 0) {
                const sparkAngle = rot + time * 0.01;
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(Math.cos(sparkAngle) * r, Math.sin(sparkAngle) * r * 0.25, 2 / safeZoom, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.restore();

        // 4. Dimensional Distortion (Pulse)
        if (boss.phase === 2) { // BEAMS Phase
            ctx.save();
            ctx.globalCompositeOperation = 'overlay';
            const pulse = 1 + Math.sin(time * 0.01) * 0.1;
            const distGrad = this.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size * pulse, [
                { offset: 0, color: 'rgba(0, 243, 255, 0.4)' },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = distGrad;
            ctx.fillRect(-size, -size, size * 2, size * 2);
            ctx.restore();
        }
    }
    drawRedAlertOverlay(ctx) {
        const { canvas } = this.game;
        const time = performance.now();
        const intensity = this.redAlertIntensity;
        
        // 1. Pulsing Red Vignette
        const pulse = (Math.sin(time * 0.005) + 1) * 0.5; // 0..1 pulse
        const alpha = intensity * (0.3 + pulse * 0.4); // Max 0.7 alpha
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        const grad = this.getGradient(ctx, 'radial', 
            canvas.width / 2, canvas.height / 2, 0, 
            canvas.width / 2, canvas.height / 2, canvas.width * 0.8, [
            { offset: 0, color: 'transparent' },
            { offset: 0.6, color: `rgba(255, 0, 0, 0)` },
            { offset: 0.85, color: `rgba(255, 0, 0, ${alpha * 0.5})` },
            { offset: 1.0, color: `rgba(255, 0, 0, ${alpha})` }
        ]);
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 2. HUD Scanline Glitch (Occasional interference)
        if (intensity > 0.5 && Math.random() > 0.95) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            const h = Math.random() * 20;
            const y = Math.random() * canvas.height;
            ctx.fillRect(0, y, canvas.width, h);
        }
        
        ctx.restore();
    }

    renderDimensionalCollapse(ctx, p) {
        const canvas = ctx.canvas;
        
        ctx.save();
        // 1. Radial "Void" Sucking Effect (Center of screen)
        const grad = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 0,
            canvas.width/2, canvas.height/2, canvas.width * 1.5
        );
        grad.safeAddColorStop(0, `rgba(0, 0, 0, ${p * 0.9})`);
        grad.safeAddColorStop(0.5, `rgba(74, 144, 226, ${p * 0.1})`); // Subtle blue 'nexus' tint
        grad.safeAddColorStop(1, 'transparent');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 2. Fragmenting Simulation (Vignette darkening edges)
        const vignette = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, canvas.width * 0.3,
            canvas.width/2, canvas.height/2, canvas.width * 0.8
        );
        vignette.safeAddColorStop(0, 'transparent');
        vignette.safeAddColorStop(1, `rgba(0, 0, 0, ${p * 0.5})`);
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. Glitch Lines (Randomly appearing horizontal streaks)
        if (p > 0.4 && Math.random() > 0.85) {
            ctx.fillStyle = `rgba(255, 255, 255, ${p * 0.3})`;
            const h = Math.random() * 20;
            const y = Math.random() * canvas.height;
            ctx.fillRect(0, y, canvas.width, h);
        }
        
        ctx.restore();
    }

    renderFlashOverlay(ctx, alpha) {
        const canvas = ctx.canvas;
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    renderCombatVisuals(ctx) {
        // 1. Focus Fire Brackets
        if (this.game.combatManager && this.game.combatManager.activeTarget) {
            const target = this.game.combatManager.activeTarget;
            const size = 60;
            ctx.save();
            ctx.strokeStyle = '#ff3300';
            ctx.lineWidth = 2 / this.game.camera.zoom;
            ctx.translate(target.x, target.y);
            
            // Corner Brackets
            for(let i=0; i<4; i++) {
                ctx.rotate(Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(size - 15, size);
                ctx.lineTo(size, size);
                ctx.lineTo(size, size - 15);
                ctx.stroke();
            }
            
            // Pulsing target text
            if (Date.now() % 1000 < 500) {
                ctx.fillStyle = '#ff3300';
                ctx.font = `${14 / this.game.camera.zoom}px Orbitron`;
                ctx.textAlign = 'center';
                ctx.fillText('TARGET LOCKED', 0, -size - 20);
            }
            ctx.restore();
        }

        // 2. Impact Sparks
        this.game.enemyShips.forEach(enemy => {
            if (enemy.hitFlash > 5) {
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                for (let i = 0; i < 4; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const len = (15 + Math.random() * 25) / this.game.camera.zoom;
                    ctx.strokeStyle = '#fff';
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
                    ctx.stroke();
                }
                ctx.restore();
            }
        });
    }

    renderInfluenceGrid(ctx, time) {
        if (!this.game.sectorManager) return;
        const influence = this.game.sectorManager.getPlayerInfluence();
        if (influence < 0.25) return; 

        const ship = this.game.playerShip;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const center = this.game.getConstellationCenter();
        const gridSize = 1500;
        const hexSize = gridSize * 0.6;
        
        ctx.save();
        const alpha = Math.min(0.25, (influence - 0.2) * 0.5);
        ctx.strokeStyle = `rgba(0, 255, 200, ${alpha})`;
        ctx.lineWidth = 1.5 / safeZoom;
        
        // Use a tactical "scanning" pulse
        const scanPulse = (Math.sin(time * 0.002) + 1) * 0.5;
        ctx.setLineDash([20 / safeZoom, 10 / safeZoom]);
        ctx.lineDashOffset = time * 0.05;

        const startX = Math.floor((ship.x - 5000) / gridSize) * gridSize;
        const startY = Math.floor((ship.y - 5000) / (gridSize * 0.75)) * (gridSize * 0.75);
        
        for (let x = startX; x < startX + 10000; x += gridSize) {
            for (let y = startY; y < startY + 10000; y += gridSize * 0.75) {
                const offsetX = (Math.floor(y / (gridSize * 0.75)) % 2) * (gridSize / 2);
                const rx = x + offsetX;
                
                const rot = this.game.physicsManager.rotate3D(rx, y, -200, center.x, center.y);
                if (rot.scale < 0.1) continue;

                // Draw Hexagon silhouette
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const ang = (i / 6) * Math.PI * 2;
                    const hx = rx + Math.cos(ang) * hexSize;
                    const hy = y + Math.sin(ang) * hexSize;
                    const hp = this.game.physicsManager.rotate3D(hx, hy, -200, center.x, center.y);
                    i === 0 ? ctx.moveTo(hp.x, hp.y) : ctx.lineTo(hp.x, hp.y);
                }
                ctx.closePath();
                ctx.stroke();

                // Occasional "data node" highlight
                if (Math.random() < 0.02) {
                    ctx.fillStyle = `rgba(0, 255, 200, ${alpha * scanPulse})`;
                    ctx.fill();
                }
            }
        }
        ctx.restore();
    }

    renderMegaStructures(ctx, time) {
        if (!this.game.warpGateManager) return;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const center = this.game.getConstellationCenter();

        this.game.warpGateManager.gates.forEach(gate => {
            const rotated = this.game.physicsManager.rotate3D(gate.x, gate.y, gate.z || 0, center.x, center.y);
            
            if (gate.structType === 'dyson') {
                this.renderDysonSwarm(ctx, gate, rotated, time, safeZoom);
            } else if (gate.structType === 'ring') {
                this.renderRingWorld(ctx, gate, rotated, time, safeZoom);
            } else if (gate.structType === 'player' || gate.structType === 'warp') {
                this.renderWarpGateVFX(ctx, gate, rotated, time, safeZoom);
            }
        });
    }

    renderDysonSwarm(ctx, gate, rotated, time, safeZoom) {
        ctx.save();
        ctx.translate(rotated.x, rotated.y);
        
        const starBrightness = (Math.sin(time * 0.002) + 1) * 0.5;
        
        gate.panels.forEach(p => {
            const ang = p.angle + (time * 0.0001 * (p.speedMult || 1));
            const px = Math.cos(ang) * p.orbitRadius * rotated.scale;
            const py = Math.sin(ang) * p.orbitRadius * rotated.scale * 0.4; // Orbit Tilt
            
            // Depth sorting (crude: panels with py < 0 are "behind" the star center)
            const isBehind = py < 0;
            if (isBehind) ctx.globalAlpha = 0.3;
            else ctx.globalAlpha = 0.8 + (starBrightness * 0.2);

            const size = p.size * rotated.scale / safeZoom;
            
            // Panel Body
            ctx.fillStyle = p.color || '#ffaa00';
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 0.5 / safeZoom;
            
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(ang + Math.PI/2);
            
            // Draw a trapezoidal solar panel
            ctx.beginPath();
            ctx.moveTo(-size/2, -size/4);
            ctx.lineTo(size/2, -size/4);
            ctx.lineTo(size/1.5, size/2);
            ctx.lineTo(-size/1.5, size/2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // Energy glow on panel
            if (!isBehind) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.fillRect(-size/3, -size/6, size/1.5, size/10);
            }
            
            ctx.restore();
        });
        ctx.restore();
    }

    renderRingWorld(ctx, gate, rotated, time, safeZoom) {
        ctx.save();
        ctx.translate(rotated.x, rotated.y);
        ctx.rotate(gate.rotation + time * 0.00005);
        
        const r = gate.radius * rotated.scale;
        const w = gate.width * rotated.scale;
        
        // 1. Structural Backwash (Outer greebles)
        ctx.strokeStyle = 'rgba(100, 100, 120, 0.5)';
        ctx.lineWidth = (w + 10 * rotated.scale) / safeZoom;
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();

        // 2. Main Habitat Surface
        const habitatGrad = ctx.createLinearGradient(-r, 0, r, 0);
        habitatGrad.addColorStop(0, '#004422'); // Dark green (forests)
        habitatGrad.addColorStop(0.5, '#0066cc'); // Oceans
        habitatGrad.addColorStop(1, '#004422');
        
        ctx.strokeStyle = habitatGrad;
        ctx.lineWidth = w / safeZoom;
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // 3. Atmosphere Glow
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
        ctx.lineWidth = (w + 4 * rotated.scale) / safeZoom;
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();

        // 4. Cloud Tier (Dashed)
        ctx.setLineDash([30 / safeZoom, 150 / safeZoom]);
        ctx.lineDashOffset = time * 0.02;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = (w * 0.8) / safeZoom;
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
    }

    renderWarpGateVFX(ctx, gate, rotated, time, safeZoom) {
        ctx.save();
        ctx.translate(rotated.x, rotated.y);
        const pulse = (Math.sin(time * 0.005) + 1) / 2;
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = (3 + pulse * 2) / safeZoom;
        ctx.beginPath();
        ctx.arc(0, 0, 100 * rotated.scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}
window.RenderManager = RenderManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.RenderManager = RenderManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RenderManager;
}
