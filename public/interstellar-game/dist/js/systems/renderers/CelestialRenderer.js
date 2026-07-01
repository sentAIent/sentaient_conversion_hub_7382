/**
 * CelestialRenderer: Handles deep-space backgrounds, stars, nebulae, and warp tunnels.
 * Phase 4 Modularization.
 */
class CelestialRenderer {
    constructor(renderManager) {
        this.rm = renderManager;
    }

    draw(ctx, time) {
        if (!ctx) return;
        this.game = this.rm.game; // Safety sync
        
        // Phase 21: Nuclear Filter Guard (Suppress background clutter)
        if (window.NUCLEAR_FILTER) return;

        this.drawBackground(ctx, time);
    }

    drawBackground(ctx, time) {
        const { canvas, camera, backgroundStars } = this.game;
        if (!canvas || !camera) return;

        // 1. CLEAR - Deep Void
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. STARLIGHT GUARD: Defensive Star Rendering
        if (!backgroundStars || backgroundStars.length === 0) {
            console.log("📍 [Celestial] Starfield empty. Re-generating deep-space cluster...");
            if (this.game.proceduralManager && typeof this.game.proceduralManager.generateDeepSpaceStyle === 'function') {
                this.game.proceduralManager.generateDeepSpaceStyle();
            }
        }

        if (backgroundStars && backgroundStars.length > 0) {
            ctx.save();
            const zoom = this.game.camera.zoom || 1;
            
            // Group stars by color and alpha (rounded to 1 decimal) for batching
            const groups = new Map();
            backgroundStars.forEach(s => {
                const alpha = Math.round((s.alpha || 0.5) * 10) / 10;
                const color = s.color || '#ffffff';
                const key = `${color}_${alpha}`;
                if (!groups.has(key)) groups.set(key, []);
                groups.get(key).push(s);
            });

            for (const [key, stars] of groups.entries()) {
                const [color, alpha] = key.split('_');
                ctx.globalAlpha = parseFloat(alpha);
                ctx.fillStyle = color;
                ctx.beginPath();
                
                stars.forEach(s => {
                    const parallax = (s.z / 5000) || 0.05;
                    const sx = (((s.x || 0) * zoom + (this.game.camera.x * parallax)) % canvas.width + canvas.width) % canvas.width;
                    const sy = (((s.y || 0) * zoom + (this.game.camera.y * parallax)) % canvas.height + canvas.height) % canvas.height;
                    const size = (s.r || 1) * (0.7 + zoom * 0.3);
                    
                    if (isFinite(sx) && isFinite(sy)) {
                        ctx.moveTo(sx + size, sy);
                        ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    }
                });
                ctx.fill();
            }
            ctx.restore();
        }

        // 3. MATRIX / CYBER STREAMS (Phase 18 Restored)
        if (this.game.matrixStreams && this.game.matrixStreams.length > 0) {
            this.renderMatrix(ctx, time);
        }

        // 3.2 Cyber Nodes & Links
        if (this.game.cyberNodes && this.game.cyberNodes.length > 0) {
            this.renderCyberNodes(ctx, time);
        }

        // 2. Galaxies (PHASE 25 RESTORED)
        if (this.game.galaxies && this.game.galaxies.length > 0) {
            this.renderGalaxies(ctx, time);
        }

        // 3. Nebulae (PHASE 25/28 ENHANCED)
        if (this.game.nebulae && this.game.nebulae.length > 0) {
            this.renderNebulaClouds(ctx, time);
        }

        // 3.5 Black Holes (PHASE 28 NEW)
        if (this.game.blackHoles && this.game.blackHoles.length > 0) {
            this.renderBlackHoles(ctx, time);
        }

        // 3.6 Alien Artifacts
        if (this.game.alienArtifacts && this.game.alienArtifacts.length > 0) {
            this.renderAlienStyle(ctx, time);
        }

        // 4. Sector Hazards (RESTORED)
        if (this.game.loadedSectors) {
            this.renderNebulaHazards(ctx, time);
        }

        // 3. Supernova Flash (DISABLED: Phase 19-3 Stabilization)
        /*
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
            this.rm.safeAddColorStop(grad, 0, '#ffffff');
            this.rm.safeAddColorStop(grad, 0.1, supernova.color);
            this.rm.safeAddColorStop(grad, 1, 'transparent');
            ctx.fillStyle = grad;
            ctx.globalAlpha = flashAlpha;
            ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            ctx.restore();
        }
        */

        // 4. Shooting Stars
        if (this.game.activeStyles.has('deep-space') && this.game.shootingStars && this.game.shootingStars.length > 0) {
            this.game.shootingStars.forEach(s => {
                ctx.save();
                const tailX = s.x - s.vx * s.tailLength;
                const tailY = s.y - s.vy * s.tailLength;

                const tailGrad = this.rm.getGradient(ctx, 'linear', tailX, tailY, s.x, s.y, [
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

                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.alpha + 0.3;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            ctx.globalAlpha = 1;
        }
    }

    renderNebulaHazards(ctx, time) {
        // Implementation migrated from RenderManager
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

                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                
                const coreGrad = this.rm.getGradient(ctx, 'radial', rx, ry, 0, rx, ry, radius * 0.8, [
                    { offset: 0, color: neb.type === 'toxic' ? 'rgba(255, 50, 150, 0.4)' : 'rgba(0, 150, 255, 0.35)' },
                    { offset: 1, color: 'transparent' }
                ]);
                ctx.fillStyle = coreGrad;
                ctx.beginPath();
                ctx.arc(rx, ry, radius * 0.8, 0, Math.PI * 2);
                ctx.fill();

                if (neb.type === 'static' && Math.random() < 0.05) {
                    this.rm.renderLightning(ctx, rx, ry, radius, safeZoom);
                }
                
                ctx.restore();
            }
        }
    }

    renderAlienStyle(ctx, time) {
        this.renderOrganicPulses(ctx, time);
        this.renderAlienArtifacts(ctx, time);
    }

    renderGalaxies(ctx, time) {
        const { galaxies, camera, canvas } = this.game;
        const zoom = camera.zoom || 1;
        galaxies.forEach(g => {
            const parallax = (g.z / 6000) || 0.02;
            const sx = (((g.x || 0) * zoom + (camera.x * parallax)) % canvas.width + canvas.width) % canvas.width;
            const sy = (((g.y || 0) * zoom + (camera.y * parallax)) % canvas.height + canvas.height) % canvas.height;
            const size = g.size * zoom;
            
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(g.rotation + time * 0.0001);
            
            // 1. Galactic Glow (Atmosphere)
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            
            // ATOMIC FIX: Handle HSL colors for gradients
            let glowColor = g.color;
            if (glowColor.includes('hsl')) {
                // If HSL, we use the raw color but rely on globalAlpha or a cleaner conversion if needed
                // For now, we'll assume the browser can handle hsl() in color stops
                this.rm.safeAddColorStop(grad, 0, glowColor.replace(')', ', 0.3)')); // Convert to hsla
            } else {
                this.rm.safeAddColorStop(grad, 0, glowColor + '44');
            }
            this.rm.safeAddColorStop(grad, 1, 'transparent');
            ctx.fillStyle = grad;
            ctx.scale(1, g.type === 'spiral' ? 0.4 : 0.7); 
            ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.fill();
            
            // 2. Structural Layers
            if (g.type === 'spiral') {
                ctx.globalAlpha = 0.25 * (g.density || 1);
                for(let i=0; i<4; i++) {
                    ctx.rotate(Math.PI / 4 + time * 0.00005);
                    ctx.scale(1.1, 0.8);
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size * 0.9, size * 0.25, 0, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Star clusters in arms
                    if (Math.random() < 0.1) {
                        ctx.fillStyle = '#ffffff';
                        ctx.beginPath();
                        ctx.arc(size * 0.6, 0, 2 * zoom, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            } else {
                // Elliptical Galaxy - Core-focused glow
                ctx.globalAlpha = 0.15;
                for(let i=0; i<3; i++) {
                    ctx.scale(0.9, 0.9);
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 3. The Galactic Core (Bright Singularity)
            ctx.setTransform(1, 0, 0, 1, sx, sy); // Reset scale for core
            const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.1);
            this.rm.safeAddColorStop(coreGrad, 0, '#ffffff');
            this.rm.safeAddColorStop(coreGrad, 0.5, g.color);
            this.rm.safeAddColorStop(coreGrad, 1, 'transparent');
            ctx.fillStyle = coreGrad;
            ctx.beginPath(); ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2); ctx.fill();

            ctx.restore();
        });
    }

    renderNebulaClouds(ctx, time) {
        const { nebulae, camera, canvas } = this.game;
        const zoom = camera.zoom || 1;
        nebulae.forEach(n => {
            const parallax = (n.z / 3000) || 0.08;
            const sx = (((n.x || 0) * zoom + (camera.x * parallax)) % canvas.width + canvas.width) % canvas.width;
            const sy = (((n.y || 0) * zoom + (camera.y * parallax)) % canvas.height + canvas.height) % canvas.height;
            const size = (n.r || 100) * Math.max(0.01, zoom);
            if (!isFinite(size) || size <= 0) return;
            
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.translate(sx, sy);
            
            const pulse = (Math.sin(time * (n.pulseSpeed || 0.001)) + 1) / 2;
            ctx.rotate(n.swirl + time * 0.00005);
            
            // Volumetric "Blobs" approach
            const blobCount = 6;
            for(let i=0; i < blobCount; i++) {
                const angle = (i / blobCount) * Math.PI * 2 + time * 0.0001;
                const bx = Math.cos(angle) * size * 0.3;
                const by = Math.sin(angle) * size * 0.3;
                const bSize = size * (0.6 + Math.sin(time * 0.001 + i) * 0.2);
                
                const grad = ctx.createRadialGradient(bx, by, 0, bx, by, bSize);
                const alpha = (0.1 + pulse * 0.1) * (n.density || 1);
                
                // ATOMIC FIX: Safe HSL/Hex Alpha blending
                if (n.color.startsWith('#')) {
                    this.rm.safeAddColorStop(grad, 0, n.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
                } else if (n.color.includes('hsl')) {
                    this.rm.safeAddColorStop(grad, 0, n.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla'));
                } else {
                    this.rm.safeAddColorStop(grad, 0, n.color);
                }
                this.rm.safeAddColorStop(grad, 0.6, 'transparent');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(bx, by, bSize, 0, Math.PI * 2);
                ctx.fill();
            }

            // Central "Heart" of the nebula
            const centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.4);
            this.rm.safeAddColorStop(centerGrad, 0, n.color + '33');
            this.rm.safeAddColorStop(centerGrad, 1, 'transparent');
            ctx.fillStyle = centerGrad;
            ctx.beginPath(); ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2); ctx.fill();

            ctx.restore();
        });
    }

    renderBlackHoles(ctx, time) {
        const { blackHoles, camera, canvas } = this.game;
        const zoom = camera.zoom || 1;
        blackHoles.forEach(bh => {
            const parallax = (bh.z / 4000) || 0.1;
            const sx = (((bh.x || 0) * zoom + (camera.x * parallax)) % canvas.width + canvas.width) % canvas.width;
            const sy = (((bh.y || 0) * zoom + (camera.y * parallax)) % canvas.height + canvas.height) % canvas.height;
            const size = bh.size * zoom;

            ctx.save();
            ctx.translate(sx, sy);
            
            // 1. Gravitational Lensing Aura (Distortion effect)
            const lensGrad = ctx.createRadialGradient(0, 0, size * 0.8, 0, 0, size * 2);
            this.rm.safeAddColorStop(lensGrad, 0, 'rgba(255, 255, 255, 0.1)');
            this.rm.safeAddColorStop(lensGrad, 0.4, 'transparent');
            this.rm.safeAddColorStop(lensGrad, 1, 'transparent');
            ctx.fillStyle = lensGrad;
            ctx.beginPath(); ctx.arc(0, 0, size * 2, 0, Math.PI * 2); ctx.fill();

            // 2. Event Horizon Glow
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.2);
            this.rm.safeAddColorStop(grad, 0, '#000000');
            this.rm.safeAddColorStop(grad, 0.5, '#110022');
            this.rm.safeAddColorStop(grad, 0.8, '#aa00ff22');
            this.rm.safeAddColorStop(grad, 1, 'transparent');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.2, 0, Math.PI * 2);
            ctx.fill();

            // 3. The Singularity (Perfect Black)
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
            ctx.fill();

            // 4. Accretion Disk (Majestic Energy Ring)
            const diskPulse = (Math.sin(time * 0.005) * 0.1) + 1.0;
            const diskGrad = ctx.createLinearGradient(-size * 2, 0, size * 2, 0);
            this.rm.safeAddColorStop(diskGrad, 0, 'transparent');
            this.rm.safeAddColorStop(diskGrad, 0.3, '#ffaa00');
            this.rm.safeAddColorStop(diskGrad, 0.5, '#ffffff');
            this.rm.safeAddColorStop(diskGrad, 0.7, '#ffaa00');
            this.rm.safeAddColorStop(diskGrad, 1, 'transparent');

            ctx.save();
            ctx.rotate(time * 0.002);
            ctx.strokeStyle = diskGrad;
            ctx.lineWidth = size * 0.15 * diskPulse;
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.ellipse(0, 0, size * 2 * diskPulse, size * 0.2, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Energy Sparks in disk
            if (bh.energy > 0.5) {
                ctx.globalAlpha = 0.4;
                for(let i=0; i<3; i++) {
                    ctx.rotate(1);
                    ctx.beginPath();
                    ctx.arc(size * 1.5, 0, 2 * zoom, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();

            ctx.restore();
        });
    }

    drawWarpTunnel(ctx, time, intensity) {
        if (intensity < 0.1) return;
        
        const canvas = this.game.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const count = 40;
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        // Tunnel core glow
        const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.height * 0.8);
        this.rm.safeAddColorStop(grad, 0, `rgba(0, 100, 255, ${intensity * 0.1})`);
        this.rm.safeAddColorStop(grad, 1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Volumetric Streak Particles
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + (time * 0.001);
            const dist = 50 + (Math.sin(time * 0.002 + i) + 1) * 200;
            const x = centerX + Math.cos(angle) * dist;
            const y = centerY + Math.sin(angle) * dist;
            
            const length = 100 + intensity * 20;
            const x2 = centerX + Math.cos(angle) * (dist + length);
            const y2 = centerY + Math.sin(angle) * (dist + length);
            
            ctx.strokeStyle = `rgba(0, 243, 255, ${intensity * 0.3})`;
            ctx.lineWidth = 2 * intensity;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    renderMatrix(ctx, time) {
        const streams = this.game.matrixStreams;
        if (!streams) return;

        const { camera, canvas } = this.game;
        const zoom = camera.zoom || 1;

        ctx.save();
        ctx.textAlign = 'center';

        streams.forEach(s => {
            const parallax = (s.z / 5000) || 0.15;
            const sx = (((s.x || 0) * zoom + (camera.x * parallax)) % canvas.width + canvas.width) % canvas.width;
            const sy = (s.y * zoom + (camera.y * parallax)) % canvas.height; // Vertical flow

            ctx.globalAlpha = s.opacity || 0.8;
            ctx.fillStyle = s.color || '#00ff41';
            
            const fontSize = (s.size || 14) * zoom;
            ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
            
            const charCount = 25;
            const spacing = fontSize * 0.9;
            
            for (let i = 0; i < charCount; i++) {
                const yOffset = i * spacing;
                const yPos = (sy + yOffset) % canvas.height;
                
                // Restrict matrix rendering to the bottom 10% of the screen
                if (yPos < canvas.height * 0.9) continue;

                const char = s.chars[(Math.floor(time / 100) + i) % s.chars.length];
                
                // Head of the stream is brighter
                if (i === 0) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = s.color;
                } else {
                    ctx.fillStyle = s.color;
                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = (s.opacity || 0.8) * (1 - i / charCount);
                }

                ctx.fillText(char, sx, yPos);
            }

            // Update stream position
            s.y += (s.baseSpeed || 2) * (this.game.matrixSpeedMultiplier || 1);
            if (s.y > canvas.height) s.y = 0;
        });
        
        // Random glitch flashes
        if (Math.random() < 0.01) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 10);
        }

        // 3.8 Warp Tunnel Effect (PHASE 30)
        if (this.game.bgWarpMode || this.game.warpDisengaging) {
            this.drawWarpTunnel(ctx, time, this.game.warpIntensity || 0);
        }

        ctx.restore();
    }

    renderCyberNodes(ctx, time) {
        const { cyberNodes, camera, canvas } = this.game;
        if (!cyberNodes || cyberNodes.length === 0) return;

        const zoom = camera.zoom || 1;
        this.renderCyberGrid(ctx, time);

        ctx.save();
        cyberNodes.forEach(node => {
            const parallax = (node.z / 4000) || 0.12;
            const sx = (((node.x || 0) * zoom + (camera.x * parallax)) % canvas.width + canvas.width) % canvas.width;
            const sy = (((node.y || 0) * zoom + (camera.y * parallax)) % canvas.height + canvas.height) % canvas.height;
            const size = node.size * zoom;
            
            ctx.save();
            ctx.translate(sx, sy);
            const pulse = (Math.sin(time * 0.002 + node.pulse) + 1) / 2;
            
            // Hexagon Node
            ctx.strokeStyle = this.game.matrixTheme?.color || '#00ff41';
            ctx.lineWidth = 2 * zoom;
            ctx.globalAlpha = 0.3 + pulse * 0.4;
            
            ctx.beginPath();
            for(let i=0; i<6; i++) {
                const ang = (i / 6) * Math.PI * 2;
                const px = Math.cos(ang) * size * 0.5;
                const py = Math.sin(ang) * size * 0.5;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
            
            // 2. Connections (Actual Links)
            ctx.lineWidth = 1 * zoom;
            ctx.globalAlpha = 0.15;
            ctx.strokeStyle = node.color;
            node.connections.forEach(targetIdx => {
                const target = cyberNodes[targetIdx];
                if (target) {
                    const tp = (target.z / 4000) || 0.12;
                    const tx = (((target.x || 0) * zoom + (camera.x * tp)) % canvas.width + canvas.width) % canvas.width;
                    const ty = (((target.y || 0) * zoom + (camera.y * tp)) % canvas.height + canvas.height) % canvas.height;
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(tx - sx, ty - sy);
                    ctx.stroke();
                }
            });
            
            ctx.restore();
        });
    }

    renderAlienArtifacts(ctx, time) {
        const { alienArtifacts, camera, canvas } = this.game;
        const zoom = camera.zoom || 1;
        alienArtifacts.forEach(art => {
            const parallax = (art.z / 3500) || 0.14;
            const sx = (((art.x || 0) * zoom + (camera.x * parallax)) % canvas.width + canvas.width) % canvas.width;
            const sy = (((art.y || 0) * zoom + (camera.y * parallax)) % canvas.height + canvas.height) % canvas.height;
            const size = art.size * zoom;
            
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(art.rotation + time * 0.0002);
            const pulse = (Math.sin(time * 0.001 + art.pulse) + 1) / 2;
            
            // Monolith / Crystal Shape
            ctx.fillStyle = art.color;
            ctx.globalAlpha = 0.4 + pulse * 0.3;
            ctx.shadowBlur = 20 * zoom;
            ctx.shadowColor = art.color;
            
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size * 0.4, 0);
            ctx.lineTo(0, size);
            ctx.lineTo(-size * 0.4, 0);
            ctx.closePath();
            ctx.fill();
            
            // Internal Glow
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.2 * pulse;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
    }

    drawDiamondStar(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
        ctx.fill();
    }

    /**
     * PHASE 30: Cyber Grid (3D Floor/Ceiling Effect)
     */
    renderCyberGrid(ctx, time) {
        const canvas = this.game.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const zoom = this.game.camera.zoom || 1;
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        const themeColor = this.game.matrixTheme?.color || '#00f3ff';
        ctx.strokeStyle = themeColor;
        ctx.lineWidth = 1;

        const horizonY = centerY;
        const spacing = 100 * zoom;
        const offset = (time * 0.1) % spacing;

        // Perspective lines (Vanishing Point)
        for (let x = -canvas.width; x < canvas.width * 2; x += 150) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, 0);
            ctx.stroke();
        }

        // Horizontal lines (Floor)
        for (let y = 0; y < canvas.height / 2; y += 40) {
            const fy = horizonY + (y * y * 0.01) + (offset * (y / 100));
            if (fy > canvas.height) continue;
            
            ctx.globalAlpha = (fy - horizonY) / (canvas.height - horizonY) * 0.2;
            ctx.beginPath();
            ctx.moveTo(0, fy);
            ctx.lineTo(canvas.width, fy);
            ctx.stroke();
            
            // Ceiling
            const cy = horizonY - (y * y * 0.01) - (offset * (y / 100));
            ctx.beginPath();
            ctx.moveTo(0, cy);
            ctx.lineTo(canvas.width, cy);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    /**
     * PHASE 30: Organic Background Pulses (Alien Style)
     */
    renderOrganicPulses(ctx, time) {
        const canvas = this.game.canvas;
        const pulse = (Math.sin(time * 0.0005) + 1) / 2;
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        const grad = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width * 0.8
        );
        
        this.rm.safeAddColorStop(grad, 0, `rgba(100, 0, 150, ${pulse * 0.15})`);
        this.rm.safeAddColorStop(grad, 1, 'transparent');
        
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = 'screen';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.restore();
    }
}

window.CelestialRenderer = CelestialRenderer;
