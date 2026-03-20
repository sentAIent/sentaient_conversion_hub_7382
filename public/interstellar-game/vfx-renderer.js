console.log("🛡️ [VFX-Renderer@V7.1] Initialized with Extreme Safety Layers.");

export function setupVfxRenderer(EngineClass) {
    Object.assign(EngineClass.prototype, {
        renderProjectiles(ctx) {
            ctx.save();
            this.projectiles.forEach(p => {
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
                ctx.rotate(-p.rotation);
                ctx.translate(-p.x, -p.y);
            });
            ctx.restore();
        },

        renderDamageEffects(ctx) {
            if (this.damageParticles.length === 0) return;

            this.damageParticles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                if (p.rot !== undefined) ctx.rotate(p.rot);

                const alpha = p.life / p.maxLife;
                ctx.globalAlpha = p.type === 'spark' ? alpha * 1.5 : alpha * 0.9;

                const drawSize = p.size / this.camera.zoom;

                if (p.type === 'spark') {
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = 1.5 / this.camera.zoom;
                    ctx.beginPath();
                    ctx.moveTo(-drawSize, 0);
                    ctx.lineTo(drawSize, 0);
                    ctx.stroke();
                } else {
                    let chunkColor = p.color;
                    if (alpha > 0.8) {
                        ctx.fillStyle = '#ff6600'; 
                        ctx.shadowColor = '#ff3300';
                        ctx.shadowBlur = 5 / this.camera.zoom;
                    } else if (alpha > 0.6) {
                        ctx.fillStyle = '#cc4400';
                    } else {
                        ctx.fillStyle = chunkColor;
                    }

                    ctx.beginPath();
                    const edges = p.polyEdges || 3;
                    for (let i = 0; i < edges; i++) {
                        const a = (i / edges) * Math.PI * 2;
                        const r = drawSize * (0.5 + 0.5 * (i % 2 === 0 ? 1 : 0.6));
                        const px = Math.cos(a) * r;
                        const py = Math.sin(a) * r;
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.fill();

                    if (alpha <= 0.6) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                        ctx.lineWidth = 0.5 / this.camera.zoom;
                        ctx.stroke();
                    }
                }
                ctx.restore();
            });
        },

        renderSpeedLines(ctx) {
            const isWarping = this.warpSpeed > 0.1;

            this.speedLines.forEach(line => {
                ctx.save();
                ctx.translate(line.x, line.y);

                const lifeAlpha = line.life * 0.5;
                const warpMult = isWarping ? 10 : 3;
                ctx.globalAlpha = isWarping ? 0.8 : lifeAlpha;
                ctx.strokeStyle = isWarping ? '#ffffff' : '#88ccff';
                ctx.lineWidth = (isWarping ? 3 : 2) / this.camera.zoom;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-line.vx * warpMult, -line.vy * warpMult);
                ctx.stroke();

                ctx.restore();
            });

            this.engineParticles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life * 0.6;
                ctx.beginPath();
                ctx.arc(0, 0, p.size / (this.camera.zoom || 1), 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        },

        // ==========================================
        // HIGH-QUALITY HAZARD EFFECTS (VFX)
        // ==========================================

        renderHazardEffect(ctx, time) {
            // V7.2 AGGRESSIVE SIGNALING: Flag that we are rendering on the engine instance.
            // This prevents the Effects Engine from resetting the animation timer.
            this._hasRenderedFrame = true;

            if (!this.hazardEffect || !this.hazardEffect.active) return;
            const h = this.hazardEffect;
            
            const type = h.type;
            
            // Dispatcher for specific hazard types
            switch(type) {
                case 'supernova':
                    this.renderSupernovaEffect(ctx, time);
                    break;
                case 'planet_impact':
                    this.renderPlanetImpactEffect(ctx, time);
                    break;
                case 'missile_hit':
                    this.renderMissileHitEffect(ctx, time);
                    break;
                case 'missile_base_destruction':
                    this.renderMissileBaseDestructionEffect(ctx, time);
                    break;
                case 'blackhole':
                    this.renderBlackHoleEffect(ctx, time);
                    break;
                case 'player_death':
                    this.renderPlayerDeathEffect(ctx, time);
                    break;
            }
        },

        renderMissileHitEffect(ctx, time) {
            const effect = this.hazardEffect;
            const progress = effect.progress;
            const canvas = this.canvas;
            
            // Fast white flash that fades out
            const alpha = Math.max(0, 1 - progress * 4); 
            if (alpha > 0) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
            }

            // Impact sparks at center
            if (progress < 0.5) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                for (let i = 0; i < 10; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = progress * 200 * Math.random();
                    ctx.fillStyle = '#ffcc00';
                    ctx.beginPath();
                    ctx.arc(centerX + Math.cos(angle) * dist, centerY + Math.sin(angle) * dist, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        },

        renderPlanetImpactEffect(ctx, time) {
             const effect = this.hazardEffect;
             const progress = effect.progress;
             
             // 1. Screen Shake (Internal parameters handled by physics)
             
             // 2. Fragmenting Debris (Planet Chunks - IRREGULAR POLYGONS)
             // We are ALREADY in world-space (centered at 0,0 for the world origin)
             // We need to translate to the IMPACT SITE (effect.x, effect.y)
             ctx.save();
             ctx.translate(effect.x, effect.y);

             if (!effect.debris) {
                 effect.debris = [];
                 const chunkCount = 150; // MASSIVE QUANTITY
                 for (let i = 0; i < chunkCount; i++) {
                     // Tightened Directional Plume (OUTWARD)
                     const sprayAngle = effect.impactAngle + (Math.random() - 0.5) * Math.PI * 0.4;
                     const speed = (20 + Math.random() * 80); 
                     
                     const vertCount = 3 + Math.floor(Math.random() * 3);
                     const verts = [];
                     const size = 4 + Math.random() * 12;
                     for(let v=0; v<vertCount; v++) {
                         const a = (v/vertCount) * Math.PI * 2;
                         const r = size * (0.6 + Math.random() * 0.4);
                         verts.push({x: Math.cos(a) * r, y: Math.sin(a) * r});
                     }

                     effect.debris.push({
                         x: 0, y: 0,
                         vx: Math.cos(sprayAngle) * speed,
                         vy: Math.sin(sprayAngle) * speed,
                         verts: verts,
                         color: `hsl(0, 0%, ${15 + Math.random() * 40}%)`, // Pure Dark Stone Grey
                         rot: Math.random() * Math.PI * 2,
                         vr: (Math.random() - 0.5) * 0.6
                     });
                 }
             }

             effect.debris.forEach(d => {
                 // Animation logic here (or in effects-engine)
                 ctx.save();
                 ctx.translate(d.x, d.y);
                 ctx.rotate(d.rot);
                 ctx.fillStyle = d.color;
                 ctx.globalAlpha = Math.max(0, 1 - progress);
                 
                 ctx.beginPath();
                 ctx.moveTo(d.verts[0].x, d.verts[0].y);
                 for(let i=1; i<d.verts.length; i++) {
                     ctx.lineTo(d.verts[i].x, d.verts[i].y);
                 }
                 ctx.closePath();
                 ctx.fill();
                 ctx.restore();
             });

             ctx.restore();
        },

        renderSupernovaEffect(ctx, time, overrideProgress = null) {
            try {
                const effect = this.hazardEffect;
                if (!effect) return;

                const canvas = this.canvas;
                const progress = overrideProgress !== null ? overrideProgress : (effect.progress || 0);
                ctx.save();
                // Supernova is a SCREEN SPACE effect (full screen whiteout/flash)
                ctx.setTransform(1, 0, 0, 1, 0, 0);

                const W = canvas.width;
                const H = canvas.height;
                const cx = W / 2;
                const cy = H / 2;
                const t = time * 0.001;
                const scale = Math.min(W, H) / 800;

                ctx.save();

                // ============ 0. PRE-DETONATION / WARNING (0-18%) ============
                // Increased duration and intensity for better "dread" build-up
                if (progress < 0.18) {
                    const p = progress / 0.18;
                    const pulse = Math.sin(t * 60 * p) * 0.5 + 0.5; // Faster pulsing frequency
                    
                    // Dangerous Pulsing Core
                    const coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140 * scale * (1 - p * 0.3));
                    coreG.addColorStop(0, `rgba(255, 0, 0, ${pulse * 0.9})`);
                    coreG.addColorStop(0.4, `rgba(255, 50, 0, ${pulse * 0.5})`);
                    coreG.addColorStop(0.7, `rgba(100, 0, 0, ${pulse * 0.2})`);
                    coreG.addColorStop(1, 'transparent');
                    ctx.fillStyle = coreG;
                    ctx.beginPath();
                    ctx.arc(cx, cy, 200 * scale, 0, Math.PI * 2);
                    ctx.fill();

                    // Lightning / Arc Containment
                    ctx.strokeStyle = `rgba(255, 230, 200, ${pulse * 0.8})`;
                    ctx.lineWidth = 2 * scale;
                    for(let i=0; i<8; i++) {
                        const angle = t * 12 + i * Math.PI/4;
                        const r = 100 * scale * (1.2 - p * 0.6);
                        ctx.beginPath();
                        ctx.arc(cx, cy, r, angle, angle + Math.PI/3);
                        ctx.stroke();
                    }

                    // High-frequency "Death Rattle" shake
                    this.camera.shakeX = (Math.random() - 0.5) * 35 * p * scale;
                    this.camera.shakeY = (Math.random() - 0.5) * 35 * p * scale;
                    
                    ctx.restore();
                    return; 
                }

                // ============ 1. THE "PINCH" / IMPLOSION (18-28%) ============
                // Longer "silent" implosion phase for maximum impact
                if (progress >= 0.18 && progress < 0.28) {
                    const p = (progress - 0.18) / 0.10;
                    const pinch = 1 - Math.pow(p, 5); // Sharper curve
                    
                    // Void Core (Sizing down space)
                    ctx.fillStyle = '#000';
                    ctx.beginPath();
                    ctx.arc(cx, cy, 150 * scale * pinch, 0, Math.PI * 2);
                    ctx.fill();

                    // Distorted Light Ring (Sucking in)
                    ctx.strokeStyle = `rgba(255, 255, 255, ${p * 1.0})`;
                    ctx.lineWidth = 25 * scale * (1-p);
                    ctx.beginPath();
                    ctx.arc(cx, cy, 220 * scale * pinch, 0, Math.PI * 2);
                    ctx.stroke();

                    // Inward Energy Streaks
                    ctx.strokeStyle = `rgba(180, 220, 255, ${p * 0.6})`;
                    ctx.lineWidth = 1 * scale;
                    for (let i = 0; i < 12; i++) {
                        const ang = i * Math.PI/6 + t * 2;
                        const r1 = 300 * scale * pinch;
                        const r2 = 100 * scale * pinch;
                        ctx.beginPath();
                        ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
                        ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
                        ctx.stroke();
                    }
                    
                    ctx.restore();
                    return;
                }

                // ============ 2. THE NUCLEAR FLASH (28-45%) ============
                const expP = Math.max(0, (progress - 0.28) / 0.72);

                if (expP < 0.25) {
                    const flashP = expP / 0.25;
                    const alpha = Math.sin(Math.PI * flashP);
                    
                    ctx.save();
                    ctx.globalAlpha = alpha;
                    
                    // ENHANCED CHROMATIC ABERRATION (Professional RGB Split)
                    const shift = 150 * alpha * scale;
                    ctx.globalCompositeOperation = 'screen';
                    
                    // Red Channel
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                    ctx.fillRect(-shift, -shift/2, W + shift, H + shift);
                    
                    // Cyan Channel
                    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
                    ctx.fillRect(shift, shift/2, W + shift, H + shift);
                    
                    // White Core Flash
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fillRect(0, 0, W, H);
                    
                    ctx.restore();

                    // Massive Bloom with Flare Elements
                    const bloomRadius = 2200 * scale * Math.pow(alpha, 0.3);
                    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, bloomRadius);
                    cg.addColorStop(0, '#fff');
                    cg.addColorStop(0.1, 'rgba(200, 240, 255, 1)');
                    cg.addColorStop(0.3, 'rgba(255, 150, 50, 0.6)');
                    cg.addColorStop(0.6, 'rgba(150, 50, 255, 0.2)');
                    cg.addColorStop(1, 'transparent');
                    ctx.fillStyle = cg;
                    ctx.fillRect(0, 0, W, H);
                }

                // ============ 3. SEISMIC SHOCKWAVE RING (35-75%) ============
                if (expP > 0.08 && expP < 0.75) {
                    const sp = (expP - 0.08) / 0.67;
                    const sr = Math.pow(sp, 0.45) * 2800 * scale; 
                    const thickness = (1 - sp) * 120 * scale;
                    const alpha = (1 - sp) * 0.95;
                    
                    ctx.save();
                    ctx.globalCompositeOperation = 'lighter';
                    // Plasma Ring (Horizontal)
                    ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
                    ctx.lineWidth = thickness;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, sr, sr * 0.35, 0, 0, Math.PI * 2); 
                    ctx.stroke();

                    // Hot Inner Edge
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
                    ctx.lineWidth = thickness * 0.4;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, sr * 0.98, sr * 0.35 * 0.98, 0, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }

                // ============ 4. DEBRIS SHARDS & TRAILS (30-98%) ============
                if (!effect.debrisShards && expP > 0.05) {
                    effect.debrisShards = [];
                    for(let i=0; i<50; i++) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = (10 + Math.random() * 35) * scale;
                        effect.debrisShards.push({
                            x: 0, y: 0,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed * 0.4,
                            size: 4 + Math.random() * 8,
                            life: 1.0,
                            decay: 0.003 + Math.random() * 0.01,
                            trail: []
                        });
                    }
                }

                if (effect.debrisShards) {
                    ctx.save();
                    ctx.translate(cx, cy);
                    effect.debrisShards.forEach(s => {
                        s.x += s.vx; s.y += s.vy;
                        s.life -= s.decay;
                        if (s.life <= 0) return;

                        if (Math.random() < 0.7) s.trail.push({x: s.x, y: s.y, life: 1.0});
                        s.trail = s.trail.filter(tr => {
                            tr.life -= 0.035;
                            ctx.fillStyle = `rgba(160, 150, 140, ${tr.life * 0.6})`;
                            ctx.beginPath(); ctx.arc(tr.x, tr.y, s.size * tr.life * 1.8, 0, Math.PI*2); ctx.fill();
                            return tr.life > 0;
                        });

                        ctx.fillStyle = `rgba(255, 240, 200, ${s.life})`;
                        ctx.shadowBlur = 25 * s.life; ctx.shadowColor = '#f66';
                        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill();
                    });
                    ctx.restore();
                }

                // ============ 5. MUSHROOM CLOUD / FIREBALL (40-99%) ============
                if (expP > 0.18) {
                    const mp = (expP - 0.18) / 0.81;
                    const rise = mp * 800 * scale;
                    const alpha = Math.max(0, 1 - Math.pow(mp, 2));
                    const baseY = cy + 220 * scale;

                    ctx.save();
                    ctx.translate(cx, baseY - rise);
                    
                    const gSize = (250 + mp * 700) * scale;
                    const cloudG = ctx.createRadialGradient(0, 0, 0, 0, 0, gSize);
                    cloudG.addColorStop(0, `rgba(255, 180, 100, ${alpha * 0.95})`);
                    cloudG.addColorStop(0.2, `rgba(255, 100, 40, ${alpha * 0.8})`);
                    cloudG.addColorStop(0.5, `rgba(100, 50, 20, ${alpha * 0.6})`);
                    cloudG.addColorStop(0.8, `rgba(30, 15, 5, ${alpha * 0.4})`);
                    cloudG.addColorStop(1, 'transparent');
                    
                    ctx.fillStyle = cloudG;
                    for(let i=0; i<18; i++) {
                        const ang = i * Math.PI/9 + t * 0.5;
                        const bx = Math.cos(ang) * gSize * 0.7;
                        const by = Math.sin(ang) * gSize * 0.4;
                        ctx.beginPath(); ctx.arc(bx, by, gSize * 0.6, 0, Math.PI*2); ctx.fill();
                    }
                    ctx.restore();
                }

                // ============ 6. CAMERA SHAKE & ERROR (DIGITAL GLITCH) ============
                if (expP < 0.85) {
                    const intensity = (1 - expP) * scale;
                    
                    // Violent shaking during peak
                    const shakeAmt = 60 * intensity;
                    this.camera.shakeX = (Math.sin(t * 70) + Math.cos(t * 43)) * shakeAmt;
                    this.camera.shakeY = (Math.cos(t * 86) + Math.sin(t * 21)) * shakeAmt;
                    
                    // AGGRESSIVE DIGITAL GLITCHING
                    if (Math.random() < 0.5 * intensity) {
                        ctx.save();
                        ctx.setTransform(1,0,0,1,0,0);
                        
                        // Screen Offset / Jitter
                        const offset = (Math.random() - 0.5) * 30 * intensity;
                        ctx.translate(offset, 0);

                        // Scanline Bars
                        ctx.fillStyle = (Math.random() > 0.5) ? 'rgba(0, 255, 255, 0.4)' : 'rgba(255, 0, 255, 0.4)';
                        for(let i=0; i<8; i++) {
                            const h = Math.random() * 8 * scale;
                            ctx.fillRect(0, Math.random() * H, W, h);
                        }

                        // Block Artifacts (Digital noise)
                        if (Math.random() < 0.3) {
                            for(let i=0; i<5; i++) {
                                const bx = Math.random() * W;
                                const by = Math.random() * H;
                                const bw = (50 + Math.random() * 100) * scale;
                                const bh = (20 + Math.random() * 40) * scale;
                                ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * intensity})`;
                                ctx.fillRect(bx, by, bw, bh);
                            }
                        }
                        
                        ctx.restore();
                    }
                }

                ctx.restore();
            } catch (e) {
                console.error("[VFX] Professional Supernova error:", e);
                ctx.restore();
            }
        },


        renderMissileBaseDestructionEffect(ctx, time) {
            try {
                const effect = this.hazardEffect;
                if (!effect) return;

                const progress = effect.progress || 0;
                const canvas = this.canvas;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const t = time * 0.001;

                ctx.save();
                // Render in SCREEN SPACE - reset any world transform
                ctx.setTransform(1, 0, 0, 1, 0, 0);

                // Calculate screen position of the effect source
                const zoom = Math.max(0.01, this.camera.zoom || 1);
                const sx = centerX + (effect.x - this.playerShip.x) * zoom + (this.camera.x || 0) * zoom;
                const sy = centerY + (effect.y - this.playerShip.y) * zoom + (this.camera.y || 0) * zoom;

                // Use a fixed screen-relative scale so the effect doesn't grow/shrink with zoom
                const screenScale = Math.min(canvas.width, canvas.height) / 800;

            // 1. CHROMA GLITCH (Technical failure feel)
            if (progress < 0.3) {
                const glitch = Math.sin(t * 50) * 10 * (1 - progress / 0.3);
                ctx.translate(glitch, 0);
            }

            // 1.5. INITIAL WHITEOUT FLASH (full screen)
            if (progress < 0.15) {
                const whiteAlpha = 1.0 - (progress / 0.15);
                ctx.fillStyle = `rgba(255, 255, 255, ${whiteAlpha})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // 1.8. VIOLENT CHAIN REACTION (V7.0 - Pre-detonation pops)
            if (progress < 0.4) {
                if (Math.random() < 0.4) {
                    const popX = sx + (Math.random() - 0.5) * 200 * screenScale;
                    const popY = sy + (Math.random() - 0.5) * 200 * screenScale;
                    const r = (20 + Math.random() * 60) * screenScale;
                    
                    const g = ctx.createRadialGradient(popX, popY, 0, popX, popY, r);
                    g.addColorStop(0, '#fff');
                    g.addColorStop(0.2, '#ffaa00');
                    g.addColorStop(1, 'transparent');
                    
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(popX, popY, r, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Gas Venting Strokes (Decompression)
                    ctx.strokeStyle = '#00ff66';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(popX, popY);
                    ctx.lineTo(popX + (Math.random()-0.5)*150*screenScale, popY + (Math.random()-0.5)*150*screenScale);
                    ctx.stroke();

                    // Massive Screen Jitter
                    ctx.translate((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25);
                }
            }

            // 2. PRIMARY COLLAPSE DETONATION (Extreme)
            if (progress >= 0.3 && progress < 0.85) {
                const detP = (progress - 0.3) / 0.55;
                // Scale relative to screen size, NOT camera zoom
                const size = (100 + detP * 800) * screenScale;
                const alpha = Math.max(0, 1 - Math.pow(detP, 0.5));
                
                const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, size);
                g.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
                g.addColorStop(0.05, `rgba(255, 255, 150, ${alpha * 0.9})`);
                g.addColorStop(0.15, `rgba(0, 255, 100, ${alpha * 0.6})`);
                g.addColorStop(1, 'transparent');
                
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // 3. EXTREME STRUCTURAL DEBRIS
            if (!effect._heavyDebris) {
                effect._heavyDebris = [];
                for (let i = 0; i < 35; i++) {
                    const ang = Math.random() * Math.PI * 2;
                    const spd = 6 + Math.random() * 20;
                    effect._heavyDebris.push({
                        ang, spd,
                        rot: Math.random() * Math.PI * 2,
                        rotV: (Math.random() - 0.5) * 0.5,
                        size: (20 + Math.random() * 50) * screenScale,
                        color: Math.random() > 0.5 ? '#111' : '#222'
                    });
                }
            }

            if (progress > 0.25) {
                const dp = (progress - 0.25) / 0.75;
                effect._heavyDebris.forEach(d => {
                    const dist = d.spd * dp * 600 * screenScale;
                    const dx = sx + Math.cos(d.ang) * dist;
                    const dy = sy + Math.sin(d.ang) * dist;
                    const rot = d.rot + d.rotV * dp * 80;

                    ctx.save();
                    ctx.translate(dx, dy);
                    ctx.rotate(rot);
                    
                    ctx.fillStyle = d.color;
                    ctx.strokeStyle = '#00ff66';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    const s = d.size;
                    ctx.moveTo(-s, -s * 0.4);
                    ctx.lineTo(s * 0.6, -s);
                    ctx.lineTo(s, s * 0.9);
                    ctx.lineTo(-s * 0.7, s * 0.6);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Hot Glowing Core of fragment
                    if (dp < 0.7) {
                        ctx.fillStyle = `rgba(255, 200, 0, ${1 - dp})`;
                        ctx.beginPath();
                        ctx.arc(0, 0, s * 0.3 * (1 - dp), 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                });
            }

            // 4. CHEMICAL SLUDGE
            for (const s of (effect.sludge || [])) {
                const px = sx + (s.x - effect.x) * screenScale;
                const py = sy + (s.y - effect.y) * screenScale;
                ctx.fillStyle = `rgba(50, 255, 0, ${s.life * 0.5})`;
                ctx.beginPath();
                ctx.arc(px, py, s.size * screenScale, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();

            // Screen shake
            if (progress < 0.5) {
                this.camera.shakeX = (Math.random() - 0.5) * 30 * (1 - progress / 0.5);
                this.camera.shakeY = (Math.random() - 0.5) * 30 * (1 - progress / 0.5);
            }
            } catch (e) {
                console.warn("⚠️ Missile Base effect render failure:", e);
                ctx.restore();
            }
        },

        renderBlackHoleEffect(ctx, time) {
            try {
                const effect = this.hazardEffect;
                if (!effect) return;

                const progress = effect.progress || 0;
                const canvas = this.canvas;
                const W = canvas.width;
                const H = canvas.height;
                const t = time * 0.001;
                
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                const centerX = W / 2;
                const centerY = H / 2;
                const maxDim = Math.max(W, H);

            // ==========================================
            // 1. CINEMATIC ZOOM & SCALE
            // ==========================================
            let zoomScale = 1;
            if (progress < 0.1) { // Pull
                zoomScale = 1 + Math.pow(progress / 0.1, 2) * 1.5;
            } else if (progress < 0.6) { // Deep Tunnel
                const p = (progress - 0.1) / 0.5;
                zoomScale = 2.5 + Math.pow(p, 3) * 12;
            } else if (progress < 0.9) { // Event Horizon Collapse
                const p = (progress - 0.6) / 0.3;
                zoomScale = 14.5 + p * 80;
            } else { // Trans-dimensional Emerge
                const p = (progress - 0.9) / 0.1;
                zoomScale = 100 - p * 99;
            }

            ctx.translate(centerX, centerY);
            ctx.scale(zoomScale, zoomScale);
            ctx.translate(-centerX, -centerY);

            // ==========================================
            // 2. TOTAL BACKGROUND BLACKOUT (Interstellar-style)
            // ==========================================
            // First pass: screen-space blackout BEFORE zoom transform
            // This ensures the game background completely vanishes early
            {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                // Rapid fade: fully opaque by progress ~0.15 (crossing event horizon)
                // 0.00 = 0%, 0.05 = 33%, 0.10 = 67%, 0.15 = 100%
                const blackoutAlpha = Math.min(1.0, progress * 6.67);
                ctx.fillStyle = `rgba(0, 0, 0, ${blackoutAlpha})`;
                ctx.fillRect(0, 0, W, H);
                ctx.restore();
            }

            // Second pass: zoomed darkness layer (catches any artifacts from zoom scaling)
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1.0, progress * 5)})`;
            ctx.fillRect(0, 0, W, H);

            // ==========================================
            // 3. CHROMATIC ABERRATION (relativistic edge distortion)
            // ==========================================
            if (progress > 0.05 && progress < 0.85) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                const abIntensity = Math.pow(Math.min(1, progress * 1.5), 2);
                const abOffset = abIntensity * 15;
                
                // Red channel shift (left)
                ctx.globalCompositeOperation = 'screen';
                const redGrad = ctx.createLinearGradient(0, 0, W * 0.15, 0);
                redGrad.addColorStop(0, `rgba(255, 0, 0, ${abIntensity * 0.25})`);
                redGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = redGrad;
                ctx.fillRect(0, 0, W * 0.15, H);
                
                // Blue channel shift (right)
                const blueGrad = ctx.createLinearGradient(W, 0, W * 0.85, 0);
                blueGrad.addColorStop(0, `rgba(0, 80, 255, ${abIntensity * 0.25})`);
                blueGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = blueGrad;
                ctx.fillRect(W * 0.85, 0, W * 0.15, H);
                
                // Top/bottom fringe
                const topGrad = ctx.createLinearGradient(0, 0, 0, H * 0.1);
                topGrad.addColorStop(0, `rgba(200, 0, 255, ${abIntensity * 0.15})`);
                topGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = topGrad;
                ctx.fillRect(0, 0, W, H * 0.1);
                
                const botGrad = ctx.createLinearGradient(0, H, 0, H * 0.9);
                botGrad.addColorStop(0, `rgba(200, 0, 255, ${abIntensity * 0.15})`);
                botGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = botGrad;
                ctx.fillRect(0, H * 0.9, W, H * 0.1);
                
                ctx.globalCompositeOperation = 'source-over';
                ctx.restore();
            }

            // ==========================================
            // 4. ACCRETION DISK FLYTHROUGH (concentric rings rushing past)
            // ==========================================
            if (progress > 0.08 && progress < 0.7) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.globalCompositeOperation = 'screen';
                
                const diskPhase = (progress - 0.08) / 0.62;
                const numRings = 8;
                for (let ring = 0; ring < numRings; ring++) {
                    // Rings rush outward from center simulating flying through the disk
                    const ringPhase = (diskPhase * 3 + ring / numRings) % 1.0;
                    const ringRadius = ringPhase * maxDim * 0.8;
                    const ringAlpha = Math.sin(ringPhase * Math.PI) * 0.35 * (1 - diskPhase * 0.7);
                    
                    if (ringAlpha <= 0.01) continue;
                    
                    // Doppler-shifted ring color
                    const ringHue = 200 + Math.sin(ring * 1.5 + t) * 40;
                    
                    ctx.strokeStyle = `hsla(${ringHue}, 90%, 70%, ${ringAlpha})`;
                    ctx.lineWidth = 2 + ringPhase * 4;
                    ctx.beginPath();
                    // Tilted ellipse to simulate viewing angle
                    ctx.ellipse(centerX, centerY, ringRadius, ringRadius * 0.25, 
                        Math.sin(t * 0.5) * 0.1, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    // Inner bright edge
                    ctx.strokeStyle = `hsla(${ringHue + 30}, 100%, 85%, ${ringAlpha * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.ellipse(centerX, centerY, ringRadius * 0.97, ringRadius * 0.25 * 0.97,
                        Math.sin(t * 0.5) * 0.1, 0, Math.PI * 2);
                    ctx.stroke();
                }
                
                ctx.globalCompositeOperation = 'source-over';
                ctx.restore();
            }

            // ==========================================
            // 5. SPIRAL TUNNEL PARTICLES
            // ==========================================
            if (effect.phase === 'tunnel' || effect.phase === 'collapse' || effect.phase === 'void') {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0); 
                
                effect.tunnelParticles.forEach(p => {
                    if (p.z <= 0) return;
                    
                    const screenScale = 600 / p.z;
                    // SPIRAL: particles follow logarithmic spiral path instead of linear radial
                    const spiralTightening = 1 + (1500 - p.z) * 0.002; // Tighter spiral closer to camera
                    const spiralAngle = p.angle + (1500 - p.z) * 0.003 * spiralTightening;
                    const px = centerX + Math.cos(spiralAngle) * p.radius * screenScale;
                    const py = centerY + Math.sin(spiralAngle) * p.radius * screenScale;
                    const pSize = (3 + (1200 - p.z) * 0.025) * screenScale;
                    
                    if (px < -100 || px > W + 100 || py < -100 || py > H + 100) return;

                    const alpha = Math.min(0.85, (1500 - p.z) / 900);
                    ctx.fillStyle = p.color.replace('0.8', alpha.toString());
                    
                    // Spiral motion trail (curved, not straight)
                    ctx.beginPath();
                    const trailLen = p.speed * 1800 * (1 / p.z) * screenScale;
                    const trailAngle = spiralAngle - p.speed * 0.15; // Slightly behind on the spiral
                    const tx = centerX + Math.cos(trailAngle) * p.radius * screenScale * 0.92;
                    const ty = centerY + Math.sin(trailAngle) * p.radius * screenScale * 0.92;
                    
                    const grad = ctx.createLinearGradient(px, py, tx, ty);
                    grad.addColorStop(0, p.color);
                    grad.addColorStop(1, 'transparent');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = pSize;
                    ctx.lineCap = 'round';
                    ctx.moveTo(px, py);
                    ctx.lineTo(tx, ty);
                    ctx.stroke();

                    // Glowing particle core
                    ctx.beginPath();
                    ctx.arc(px, py, Math.max(0.1, pSize * 0.8), 0, Math.PI * 2);
                    ctx.fill();
                });
                ctx.restore();
            }

            // ==========================================
            // 6. GRAVITATIONAL LENSING
            // ==========================================
            const lensIntensity = progress < 0.9 ? Math.pow(progress, 2) * 50 : 0;
            if (lensIntensity > 1) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.applyGravitationalLensing(ctx, centerX, centerY, lensIntensity);
                ctx.restore();
            }

            // ==========================================
            // 7. QUANTUM DISTORTION (increasing vibration)
            // ==========================================
            if (effect.phase === 'tunnel') {
                const dist = effect.distortionStrength || 1.0;
                const vibration = dist * (1 + progress * 3); // Stronger vibration deeper in
                ctx.translate((Math.random() - 0.5) * 10 * vibration, (Math.random() - 0.5) * 10 * vibration);
            }

            // ==========================================
            // 8. TIME DILATION VIGNETTE (darkening edges, pulsing faster)
            // ==========================================
            if (progress > 0.1 && progress < 0.92) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                
                const vignetteProgress = (progress - 0.1) / 0.82;
                // Pulse frequency increases as you approach singularity (time dilation)
                const pulseFreq = 2 + vignetteProgress * 25;
                const pulseMod = 0.5 + Math.sin(t * pulseFreq) * 0.3;
                const vignetteAlpha = (0.3 + vignetteProgress * 0.6) * pulseMod;
                const vignetteRadius = maxDim * (0.5 - vignetteProgress * 0.35);
                
                const vigGrad = ctx.createRadialGradient(centerX, centerY, 
                    Math.max(0, vignetteRadius * 0.3), centerX, centerY, Math.max(1, maxDim * 0.8));
                vigGrad.addColorStop(0, 'transparent');
                vigGrad.addColorStop(0.4, `rgba(5, 0, 15, ${vignetteAlpha * 0.3})`);
                vigGrad.addColorStop(0.7, `rgba(10, 0, 25, ${vignetteAlpha * 0.6})`);
                vigGrad.addColorStop(1, `rgba(0, 0, 0, ${vignetteAlpha})`);
                
                ctx.fillStyle = vigGrad;
                ctx.fillRect(0, 0, W, H);
                ctx.restore();
            }

            // ==========================================
            // 9. SINGULARITY COLLAPSE (Fade to Absolute Black)
            // ==========================================
            if (progress > 0.65 && progress < 0.95) {
                const darkP = (progress - 0.65) / 0.25;
                const radius = (1 - darkP) * W * 1.2;
                
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                const g = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(1, radius));
                g.addColorStop(0, 'rgba(0, 0, 0, 1)');
                g.addColorStop(0.5, 'rgba(10, 0, 20, 0.8)');
                g.addColorStop(1, 'transparent');
                
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(centerX, centerY, W * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // ==========================================
            // 10. SPAGHETTIFICATION (Enhanced with spiral twist)
            // ==========================================
            if (progress > 0.3 && progress < 0.98) {
                const intensity = (progress - 0.3) / 0.68;
                
                if (this.playerShip && !this.playerShip.dead && progress < 0.92) {
                    ctx.save();
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.translate(centerX, centerY);
                    
                    const stretchFactor = 1 + Math.pow(intensity, 3) * 120;
                    const shipW = 40 * (1 - intensity * 0.8);
                    const shipH = 40 * stretchFactor;
                    
                    // Twisted gradient with spiral color bands
                    const grad = ctx.createLinearGradient(0, 0, 0, -shipH);
                    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                    grad.addColorStop(0.15, `rgba(255, 100, 50, ${0.6 * intensity})`);  // Red-shifted base
                    grad.addColorStop(0.35, `rgba(0, 255, 255, ${0.9 * intensity})`);   // Cyan mid
                    grad.addColorStop(0.55, `rgba(138, 43, 226, ${0.7 * intensity})`);  // Purple
                    grad.addColorStop(0.75, `rgba(0, 100, 255, ${0.5 * intensity})`);   // Blue-shifted
                    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    
                    ctx.fillStyle = grad;
                    const ang = Math.atan2(this.playerShip.y - effect.y, this.playerShip.x - effect.x) + Math.PI/2;
                    // Add spiral twist that increases with intensity
                    ctx.rotate(ang + Math.sin(t * 8) * intensity * 0.3);
                    ctx.fillRect(-shipW/2, 0, shipW, -shipH);
                    
                    // Energy sparks along the stretch
                    if (intensity > 0.3) {
                        for (let i = 0; i < 8; i++) {
                            const sparkY = -Math.random() * shipH;
                            const sparkX = (Math.random() - 0.5) * shipW * 1.5;
                            const sparkHue = 180 + Math.random() * 80;
                            ctx.fillStyle = `hsla(${sparkHue}, 100%, 85%, ${0.8 * (1 - Math.abs(sparkY) / shipH)})`;
                            ctx.fillRect(sparkX, sparkY, 1.5, 8 + Math.random() * 25);
                        }
                    }
                    ctx.restore();
                }
            }

            ctx.restore();
            } catch (e) {
                console.warn("⚠️ Black Hole effect render failure:", e);
                if (ctx) ctx.restore();
            }
        },

        applyGravitationalLensing(ctx, cx, cy, intensity) {
            const canvas = this.canvas;
            if (!canvas) return;
            
            ctx.save();
            ctx.globalCompositeOperation = 'source-over';
            
            // Create a lensing "ring" that warps whatever is behind it
            // Since we can't easily do per-pixel distortion in 2D Canvas without getImageData (slow),
            // we'll use multiple layered circles with varying transparency and slight offsets
            // to simulate "bent" light.
            
            for (let i = 0; i < 5; i++) {
                const r = (100 + i * 50) + intensity * 2;
                const alpha = 0.15 / (i + 1);
                
                const g = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.2);
                g.addColorStop(0, 'transparent');
                g.addColorStop(0.5, `rgba(255, 255, 255, ${alpha})`);
                g.addColorStop(1, 'transparent');
                
                ctx.strokeStyle = g;
                ctx.lineWidth = 15;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.restore();
        },

        renderPlayerDeathEffect(ctx, time) {
            try {
                const effect = this.hazardEffect;
                if (!effect) return;
            // SCORCHED EARTH: Only return early if it's EXPLICITLY a silent planet impact.
            // All other deaths (Supernova, Missile, Black Hole) should render their dramatic visuals.
            if (!effect || (effect.silent && effect.type === 'planet_impact') || effect.type === 'planet') {
                if (effect && effect.type === 'planet_impact') {
                    this.camera.shakeX = 0; 
                    this.camera.shakeY = 0;
                    return;
                }
            }

            const canvas = this.canvas;
            const progress = effect.progress || 0;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            if (effect.cameraShake > 0) {
                this.camera.shakeX = (Math.random() - 0.5) * effect.cameraShake;
                this.camera.shakeY = (Math.random() - 0.5) * effect.cameraShake;
            }

            // 1. Hull Breaches & Venting
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

                    const safeSize = Math.max(1, p.size || 1);
                    const grad = ctx.createRadialGradient(vx, vy, 0, vx, vy, safeSize);
                    grad.addColorStop(0, `rgba(255, 200, 50, ${alpha})`);
                    grad.addColorStop(0.5, `rgba(255, 100, 0, ${alpha * 0.5})`);
                    grad.addColorStop(1, 'transparent');

                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(vx, vy, p.size, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            // 2. Structural Failure (Cracks)
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

            // 3. Final Explosion
            if (effect.phase === 'explosion') {
                const expSize = Math.max(1, (progress - 0.5) / 0.2 * canvas.width * 1.5);
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

            // 4. Critical Warning Flash
            if (effect.flashIntensity > 0) {
                const color = effect.phase === 'critical' ? '255, 0, 0' : '255, 255, 255';
                ctx.fillStyle = `rgba(${color}, ${effect.flashIntensity})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            
            ctx.restore();
            } catch (e) {
                console.error("[VFX] renderPlayerDeathEffect failed:", e);
            }
        },

        renderSolarFlareOverlay(ctx) {
            if (!this.solarFlare || this.solarFlare.active <= 0) return;
            const sf = this.solarFlare;
            const intensity = sf.active / (60 * 8);
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            const alpha = Math.min(0.7, intensity * 0.8 + Math.random() * 0.1);
            ctx.fillStyle = `rgba(255, ${100 + Math.random() * 50}, 0, ${alpha})`;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.restore();
        },

        renderAbilityEffects(ctx, time) {
            const ship = this.playerShip;
            if (!ship) return;

            // 1. Check Standard Abilities (Q)
            if (this.abilityActive) {
                const id = this.abilityActive.id;
                switch(id) {
                    case 'bulwark': this.renderShieldWall(ctx, ship, time); break;
                    case 'phoenix': this.renderSolarSiphon(ctx, ship, time); break;
                    case 'hauler': this.renderGravityWell(ctx, ship, time); break;
                    case 'flux': this.renderPhaseShift(ctx, ship, time); break;
                    case 'interceptor': this.renderDashEffect(ctx, ship, time); break;
                    case 'apex': this.renderOverclock(ctx, ship, time); break;
                    case 'draco': 
                    case 'viper': this.renderBoostEffect(ctx, ship, time); break;
                }
            }

            // 2. Check Ultimates (E)
            if (this.ultimateActive) {
                const id = this.ultimateActive.id;
                switch(id) {
                    case 'harvester': this.renderOmegaBeam(ctx, ship, time); break;
                    case 'bulwark': this.renderFortressMode(ctx, ship, time); break;
                    case 'prospector': this.renderMotherLode(ctx, ship, time); break;
                }
            }
        },

        renderShieldWall(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            
            const pulse = 1 + Math.sin(time * 0.01) * 0.05;
            const radius = 60 * pulse;
            
            // Hexagonal Grid Shield
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            grad.addColorStop(0, 'rgba(0, 243, 255, 0.1)');
            grad.addColorStop(0.8, 'rgba(0, 243, 255, 0.3)');
            grad.addColorStop(1, 'rgba(0, 243, 255, 0.8)');
            
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = 'rgba(0, 243, 255, 1)';
            ctx.lineWidth = 3 / this.camera.zoom;
            ctx.stroke();
            
            // Inner "energy" lines
            ctx.globalAlpha = 0.5;
            for (let i = 0; i < 3; i++) {
                ctx.rotate(time * 0.001);
                ctx.beginPath();
                ctx.arc(0, 0, radius * 0.7, 0, Math.PI / 2);
                ctx.stroke();
            }
            
            ctx.restore();
        },

        renderSolarSiphon(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            
            const radius = 80 + Math.sin(time * 0.005) * 15;
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            grad.addColorStop(0, 'rgba(255, 200, 0, 0.6)');
            grad.addColorStop(0.5, 'rgba(255, 100, 0, 0.3)');
            grad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Solar flares
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2 + time * 0.002;
                const len = radius * (1.2 + Math.sin(time * 0.01 + i) * 0.2);
                ctx.strokeStyle = 'rgba(255, 150, 0, 0.8)';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(Math.cos(angle) * radius * 0.6, Math.sin(angle) * radius * 0.6);
                ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
                ctx.stroke();
            }
            
            ctx.restore();
        },

        renderGravityWell(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            ctx.rotate(time * 0.01);
            
            const radius = 150;
            ctx.strokeStyle = 'rgba(138, 43, 226, 0.6)';
            ctx.lineWidth = 2;
            
            for (let i = 0; i < 4; i++) {
                const r = radius * (1 - ((time * 0.05 + i * 25) % 100) / 100);
                ctx.beginPath();
                ctx.arc(0, 0, Math.max(1, r), 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Suction lines
            ctx.beginPath();
            for (let i = 0; i < 12; i++) {
                const a = (i / 12) * Math.PI * 2;
                ctx.moveTo(Math.cos(a) * radius, Math.sin(a) * radius);
                ctx.lineTo(0, 0);
            }
            ctx.stroke();
            
            ctx.restore();
        },

        renderPhaseShift(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = 0.6;
            
            // Draw ghost ship Offset
            const ox = Math.sin(time * 0.02) * 10;
            const oy = Math.cos(time * 0.02) * 10;
            
            // Cyan ghost
            ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
            ctx.fillRect(-20 + ox, -20 + oy, 40, 40); // Placeholder for actual ship shape
            
            // Magenta ghost
            ctx.fillStyle = 'rgba(255, 0, 255, 0.5)';
            ctx.fillRect(-20 - ox, -20 - oy, 40, 40);
            
            ctx.restore();
        },

        renderOmegaBeam(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            ctx.rotate(ship.angle || 0);
            
            const beamLen = 2000;
            const beamWidth = 40 + Math.sin(time * 0.05) * 10;
            
            const grad = ctx.createLinearGradient(0, 0, beamLen, 0);
            grad.addColorStop(0, 'rgba(255, 0, 255, 0.9)');
            grad.addColorStop(0.5, 'rgba(100, 0, 255, 0.7)');
            grad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = grad;
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#ff00ff';
            
            ctx.beginPath();
            ctx.rect(0, -beamWidth / 2, beamLen, beamWidth);
            ctx.fill();
            
            // Core white beam
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.rect(0, -beamWidth / 6, beamLen, beamWidth / 3);
            ctx.fill();
            
            ctx.restore();
        },

        renderFortressMode(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            
            const radius = 100;
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            grad.addColorStop(0, 'rgba(255, 215, 0, 0.2)');
            grad.addColorStop(0.9, 'rgba(255, 215, 0, 0.4)');
            grad.addColorStop(1, 'rgba(255, 215, 0, 0.9)');
            
            ctx.fillStyle = grad;
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#ffd700';
            
            // Draw heavy octagonal shield
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            ctx.restore();
        },

        renderDashEffect(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            ctx.rotate(ship.angle || 0);

            // Speed lines trailing back
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.4)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 5; i++) {
                const ox = -Math.random() * 100;
                const oy = (Math.random() - 0.5) * 40;
                ctx.beginPath();
                ctx.moveTo(ox, oy);
                ctx.lineTo(ox - 50, oy);
                ctx.stroke();
            }
            ctx.restore();
        },

        renderOverclock(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            
            // Pulsing red/orange aura
            const pulse = 1 + Math.sin(time * 0.02) * 0.1;
            const radius = 50 * pulse;
            
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            grad.addColorStop(0, 'rgba(255, 50, 0, 0.5)');
            grad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Heat waves
            ctx.strokeStyle = 'rgba(255, 100, 0, 0.3)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                const r = radius * (1.1 + i * 0.2);
                ctx.beginPath();
                ctx.arc(0, 0, r, time * 0.01 + i, time * 0.01 + i + Math.PI / 4);
                ctx.stroke();
            }
            ctx.restore();
        },

        renderBoostEffect(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            ctx.rotate(ship.angle || 0);
            
            // Electric blue trails
            ctx.strokeStyle = '#00f3ff';
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';
            
            for (let i = 0; i < 3; i++) {
                const y = (i - 1) * 15;
                const len = 100 + Math.random() * 50;
                ctx.beginPath();
                ctx.moveTo(-20, y);
                ctx.lineTo(-20 - len, y + (Math.random() - 0.5) * 10);
                ctx.stroke();
            }
            ctx.restore();
        },

        renderMotherLode(ctx, ship, time) {
            ctx.save();
            ctx.translate(ship.x, ship.y);
            
            // Golden blast
            const radius = 300 * ((Math.sin(time * 0.01) + 1) / 2);
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            grad.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
            grad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        },

        // === CYBER MATRIX RAIN EFFECT (migrated from special-effects.js) ===
        renderCyberEffect(ctx) {
            if (!this.activeStyles.has('cyber') || !this.matrixStreams) return;

            const canvas = this.canvas;
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.textAlign = 'center';

            const speedMult = this.matrixSpeedMultiplier || 1.0;
            const lengthMult = this.matrixLengthMultiplier || 1.0;

            if (this.matrixAngle !== 0) {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((this.matrixAngle * Math.PI) / 180);
                ctx.translate(-canvas.width / 2, -canvas.height / 2);
            }

            const baseVisibleLength = 20;
            const rainbowHueOffset = Date.now() * 0.1;

            this.matrixStreams.forEach((stream, streamIndex) => {
                stream.y += stream.baseSpeed * speedMult;
                const visibleLength = Math.max(3, Math.floor(baseVisibleLength * lengthMult));
                if (stream.y - (visibleLength * stream.size) > canvas.height * 1.5) {
                    stream.y = -stream.size * visibleLength;
                }

                ctx.font = `${stream.size}px monospace`;
                ctx.textBaseline = 'middle';

                for (let i = 0; i < visibleLength && i < stream.chars.length; i++) {
                    const char = stream.chars[i];
                    const charY = stream.y - (i * stream.size);
                    if (charY < -stream.size * 2 || charY > canvas.height * 1.5) continue;

                    const relativePos = 1 - (i / visibleLength);
                    const alpha = Math.pow(relativePos, 0.5) * stream.opacity;
                    ctx.globalAlpha = alpha;

                    if (this.matrixRainbowMode) {
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
        },

        // === PULSE PING EFFECT (migrated from special-effects.js) ===
        renderPulsePing(ctx) {
            if (!this.activePulsePing) return;

            const canvas = this.canvas;
            const now = Date.now();
            const elapsed = now - this.activePulsePing.startTime;

            if (elapsed < this.activePulsePing.duration) {
                const progress = elapsed / this.activePulsePing.duration;
                const radius = progress * (this.activePulsePing.maxRadius || 3000);

                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.translate(canvas.width / 2, canvas.height / 2);

                ctx.strokeStyle = `rgba(0, 243, 255, ${1 - progress})`;
                ctx.lineWidth = 5 * (1 - progress);
                ctx.beginPath();
                ctx.arc(0, 0, radius * this.camera.zoom, 0, Math.PI * 2);
                ctx.stroke();

                ctx.lineWidth = 15 * (1 - progress);
                ctx.strokeStyle = `rgba(0, 243, 255, ${(1 - progress) * 0.3})`;
                ctx.stroke();
                ctx.restore();
            } else {
                this.activePulsePing = null;
            }
        }
    });
}
