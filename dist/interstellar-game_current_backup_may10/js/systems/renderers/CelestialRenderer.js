/**
 * CelestialRenderer: Phase 18 Exhaustive Restoration
 * Handles rendering for: Deep Space, Nebula, Alien, Matrix
 * 
 * RENDERING LAYERS:
 * - draw() = Screen-space (before camera transform): Stars, Galaxies, Nebulae, Planets, BlackHoles, Matrix
 * - drawEntities() = World-space (after camera transform): Alien artifacts, Shooting stars
 */
class CelestialRenderer {
    constructor(renderManager) {
        this.rm = renderManager;
        this.game = renderManager.game;
    }

    /** Normalize 3-digit hex (#fff) to 6-digit (#ffffff) so alpha suffixes work */
    normHex(color) {
        if (!color || typeof color !== 'string') return '#ffffff';
        if (/^#[0-9a-fA-F]{3}$/.test(color)) {
            return '#' + color[1]+color[1] + color[2]+color[2] + color[3]+color[3];
        }
        return color.startsWith('#') ? color : '#ffffff';
    }

    safeRadialGradient(ctx, x0, y0, r0, x1, y1, r1) {
        // Force all values to be finite and non-negative
        const args = [x0, y0, r0, x1, y1, r1].map(v => isFinite(v) ? v : 0);
        args[2] = Math.max(0.1, args[2]);
        args[5] = Math.max(0.1, args[5]);
        return ctx.createRadialGradient(...args);
    }

    /**
     * Screen-space rendering (called BEFORE camera transform)
     * All background decorations go here so they're always visible
     */
    draw(ctx, time) {
        if (!this.game) return;
        const canvas = this.game.canvas;
        if (!canvas) return;

        // 1. Matrix Style (Screen-Space Rain)
        if (this.game.activeStyles && this.game.activeStyles.has('matrix')) {
            this.renderMatrix(ctx, time);
        }

        // 2. Shooting Stars (Screen-Space)
        if (this.game.shootingStars && this.game.shootingStars.length > 0) {
            this.renderShootingStars(ctx, time);
        }
    }

    drawSector(ctx, sector, time) {
        // Render sector-local background objects
        if (sector.stars) this.renderStars(ctx, sector.stars, time);
        if (sector.planets) this.renderBackgroundPlanets(ctx, sector.planets, time);
        if (sector.nebulae) this.renderNebulaClouds(ctx, sector.nebulae, time);
        if (sector.galaxies) this.renderGalaxies(ctx, sector.galaxies, time);
        if (sector.hazards && sector.hazards.blackHoles) {
            // Some black holes might be "background" vs "interactive"
            // For now render them all in world-space or sector-space
            this.renderBlackHoles(ctx, sector.hazards.blackHoles, time);
        }
    }

    /**
     * World-space rendering (called AFTER camera transform)
     * Only interactive/gameplay entities go here
     */
    drawEntities(ctx, time) {
        if (!this.game) return;

        // Alien Style (World-Space Artifacts - interactive)
        if (this.game.activeStyles && this.game.activeStyles.has('alien')) {
            this.renderAlien(ctx, time);
        }
    }

    safeSize(size, type = 'generic') {
        const canvas = this.game.canvas || { width: 1000, height: 1000 };
        let maxFactor = 2.0;
        
        // --- PHASE 30: TYPE-SPECIFIC CLAMPING ---
        if (type === 'star') maxFactor = 0.03; // Max 3% of screen
        if (type === 'planet') maxFactor = 0.5;
        if (type === 'nebula') maxFactor = 0.8;
        if (type === 'galaxy') maxFactor = 0.8;
        if (type === 'sun') maxFactor = 0.15; // Phase 30: Reduced to prevent giant corona whiteout
        if (type === 'blackhole') maxFactor = 0.5;
        
        const maxSize = Math.min(canvas.width, canvas.height) * maxFactor;
        if (!isFinite(size) || size <= 0) return 0.1;
        return Math.min(size, maxSize);
    }

    /**
     * Helper: Convert world coordinates to screen coordinates with parallax
     * Used by all background renderers for consistent screen-space positioning
     */
    /**
     * worldToScreen: Transforms world coordinates to screen-space for background objects.
     * Includes Phase 30 Infinite Wrapping to ensure persistent backgrounds.
     */
    worldToScreen(worldX, worldY, worldZ, pf = 0.98, range = 10000) {
        const { physicsManager } = this.game;
        const shipX = this.game.playerShip?.x || 0;
        const shipY = this.game.playerShip?.y || 0;

        // Apply Infinite Wrapping: Keep objects within 'range' distance of the player
        const wrappedX = ((worldX - shipX) % range + range) % range + shipX - range/2;
        const wrappedY = ((worldY - shipY) % range + range) % range + shipY - range/2;
        
        // Context is already centered and parallax-shifted (at 0.98) in Renderer.js
        // To achieve a unique parallax factor 'pf', we must draw at a coordinate that,
        // when shifted by -playerShip.x * 0.98, results in (wrappedX - playerShip.x) * pf.
        const zShift = (worldZ || 0) / 50000; // Adjusted Z-depth influence
        const effectivePf = pf + zShift;

        const px = (wrappedX * effectivePf) - (shipX * (effectivePf - 0.98));
        const py = (wrappedY * effectivePf) - (shipY * (effectivePf - 0.98));

        if (!isFinite(px) || !isFinite(py)) return null;

        const rotated = physicsManager.rotate3D(px, py, worldZ || 0, 0, 0);
        if (!isFinite(rotated.x) || !isFinite(rotated.y) || rotated.scale <= 0) return null;
        
        return rotated;
    }

    renderStars(ctx, stars, time) {
        if (!stars || !this.game.canvas) return;

        stars.forEach(s => {
            const pf = s.parallax || 0.99; // Distant stars move very little
            const rotated = this.worldToScreen(s.x, s.y, s.z || 0, pf, 8000);
            if (!rotated) return;

            const baseSize = s.r || 1.5;
            const twinkle = Math.sin(time * 0.004 + (s.seed || 0)) * 0.3 + 0.7;
            const size = this.safeSize((baseSize * rotated.scale * twinkle), 'star');
            const alpha = (s.alpha || 0.5) * rotated.scale;
            
            const spriteSize = size < 4 ? 4 : (size < 8 ? 8 : (size < 16 ? 16 : (size < 32 ? 32 : 64)));
            const spriteName = `${s.spriteType || 'star_white'}_${spriteSize}`;
            const sprite = this.rm.spriteCache.get(spriteName);

            if (sprite) {
                ctx.globalAlpha = alpha;
                ctx.drawImage(sprite, rotated.x - size * 1.25, rotated.y - size * 1.25, size * 2.5, size * 2.5);
                ctx.globalAlpha = 1.0;
            } else {
                ctx.fillStyle = s.color || `rgba(255, 255, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(rotated.x, rotated.y, Math.max(0.1, size), 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    renderAlien(ctx, time) {
        const { alienArtifacts, spacecraft, camera, physicsManager } = this.game;
        const zoom = camera.zoom || 1;
        const center = (physicsManager && physicsManager.getConstellationCenter) ? 
                       physicsManager.getConstellationCenter() : 
                       (this.game._cachedRotationCenter || { x: 0, y: 0 });

        // Alien Artifacts (World-space - inside camera transform)
        if (alienArtifacts && !window.NUCLEAR_FILTER) {
            alienArtifacts.forEach(art => {
                // In drawEntities context, we're already in camera-transformed space
                // Use raw world coordinates since camera transform is already applied
                const dx = art.x;
                const dy = art.y;
                const size = art.size;

                ctx.save();
                ctx.translate(dx, dy);
                ctx.rotate(art.rotation + time * 0.0002);
                const pulse = (Math.sin(time * 0.001 + (art.pulseOffset || 0)) + 1) / 2;
                
                ctx.fillStyle = art.color;
                ctx.globalAlpha = (0.5 + pulse * 0.4);
                ctx.shadowBlur = 20;
                ctx.shadowColor = art.color;
                
                if (art.type === 'monolith') {
                    // Outer shell (Crystalline)
                    ctx.fillStyle = 'rgba(15, 25, 40, 0.95)';
                    ctx.strokeStyle = art.color;
                    ctx.lineWidth = 2;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = art.color;
                    
                    const h = size * 1.5;
                    const w = size * 0.6;
                    
                    ctx.beginPath();
                    ctx.moveTo(0, -h);
                    ctx.lineTo(w, h);
                    ctx.lineTo(-w, h);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Core Glow (Pulsing)
                    const coreSize = size * 0.3 * (0.8 + 0.2 * pulse);
                    const coreGrad = this.safeRadialGradient(ctx, 0, 0, 0, 0, 0, coreSize * 2);

                    coreGrad.addColorStop(0, '#fff');
                    coreGrad.addColorStop(0.4, art.color);
                    coreGrad.addColorStop(1, 'transparent');
                    
                    ctx.fillStyle = coreGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, coreSize * 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Render Geometric Crystal
                    ctx.beginPath();
                    const sides = 6;
                    for (let i = 0; i <= sides; i++) {
                        const ang = (i / sides) * Math.PI * 2;
                        const r = i % 2 === 0 ? size : size * 0.5;
                        ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
                    }
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();
            });
        }

        // Spacecraft (World-space)
        if (spacecraft) {
            spacecraft.forEach(s => {
                const dx = s.x;
                const dy = s.y;
                const size = s.size;
                const angle = Math.atan2(s.vy, s.vx);

                ctx.save();
                ctx.translate(dx, dy);

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
                        const flicker = 0.7 + Math.sin(time * 0.015 + i) * 0.3;
                        
                        // Robustness: Only create gradient if all parameters are finite
                        const x1 = -size * 0.7;
                        const x2 = -size * 0.7 - trailLength * flicker;
                        if (isFinite(x1) && isFinite(x2) && isFinite(offsetY)) {
                            const trailGrad = ctx.createLinearGradient(x1, offsetY, x2, offsetY);
                            trailGrad.addColorStop(0, s.engineGlow || '#ffffff');
                            trailGrad.addColorStop(0.15, s.engineColor || '#00aaff');
                            trailGrad.addColorStop(1, 'transparent');

                            ctx.fillStyle = trailGrad;
                            ctx.beginPath();
                            ctx.moveTo(-size * 0.65, offsetY - 4);
                            ctx.quadraticCurveTo(-size * 0.7 - trailLength * 0.5 * flicker, offsetY, -size * 0.7 - trailLength * flicker, offsetY);
                            ctx.quadraticCurveTo(-size * 0.7 - trailLength * 0.5 * flicker, offsetY, -size * 0.65, offsetY + 4);
                            ctx.closePath();
                            ctx.fill();
                        }
                    }
                    ctx.globalAlpha = 1;
                }

                // Hull gradient
                const hullGrad = ctx.createLinearGradient(0, -size * 0.5, 0, size * 0.5);
                hullGrad.addColorStop(0, s.hullHighlight || '#ccc');
                hullGrad.addColorStop(0.3, s.hullColor || '#888');
                hullGrad.addColorStop(1, s.hullShadow || '#333');
                ctx.fillStyle = hullGrad;
                ctx.strokeStyle = s.hullHighlight || '#ddd';
                ctx.lineWidth = 1.5;

                // === SHIP RENDERING: 13 Star Wars-Quality Spacecraft ===
                if (s.shipClass === 'saucer') {
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size, size * 0.25, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    const domeGrad = ctx.createRadialGradient(-size * 0.1, -size * 0.15, 0, 0, -size * 0.05, size * 0.4);
                    domeGrad.addColorStop(0, '#ffffff');
                    domeGrad.addColorStop(0.3, s.domeColor || '#88ffff');
                    domeGrad.addColorStop(1, 'rgba(0,50,50,0.8)');
                    ctx.fillStyle = domeGrad;
                    ctx.beginPath();
                    ctx.ellipse(0, -size * 0.08, size * 0.35, size * 0.25, 0, Math.PI, 0);
                    ctx.fill();
                } else if (s.shipClass === 'star-dreadnought') {
                    ctx.beginPath();
                    ctx.moveTo(size * 1.5, 0);
                    ctx.lineTo(-size * 1.2, -size * 0.7);
                    ctx.lineTo(-size, 0);
                    ctx.lineTo(-size * 1.2, size * 0.7);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    // Command bridge superstructure
                    ctx.fillStyle = '#444';
                    ctx.fillRect(-size * 0.4, -size * 0.15, size * 0.5, size * 0.3);
                } else if (s.shipClass === 'quantum-scout') {
                    for (let i = 0; i < 3; i++) {
                        ctx.save();
                        ctx.rotate(time * 0.002 * (2 + i) + i);
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
                    // Modular wing-segments
                    ctx.fillStyle = s.hullColor || '#888';
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
                    ctx.beginPath();
                    ctx.moveTo(size * 0.8, 0);
                    ctx.bezierCurveTo(size * 0.6, -size * 0.4, size * 0.2, -size * 0.5, -size * 0.3, -size * 0.3);
                    ctx.bezierCurveTo(-size * 0.7, 0, -size * 0.3, size * 0.3, size * 0.2, size * 0.5);
                    ctx.bezierCurveTo(size * 0.6, size * 0.4, size * 0.8, 0, size * 0.8, 0);
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'warp-strider') {
                    ctx.beginPath();
                    ctx.moveTo(size * 0.8, 0);
                    ctx.lineTo(size * 0.3, -size * 0.2);
                    ctx.lineTo(-size * 0.6, -size * 0.2);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size * 0.6, size * 0.2);
                    ctx.lineTo(size * 0.3, size * 0.2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    // Outboard engine pods
                    ctx.fillStyle = '#444';
                    ctx.fillRect(-size * 0.7, -size * 0.5, size * 0.4, size * 0.1);
                    ctx.fillRect(-size * 0.7, size * 0.4, size * 0.4, size * 0.1);
                } else if (s.shipClass === 'prism-destroyer') {
                    ctx.beginPath();
                    ctx.moveTo(size, 0);
                    ctx.lineTo(size * 0.3, -size * 0.7);
                    ctx.lineTo(-size * 0.5, -size * 0.6);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size * 0.5, size * 0.6);
                    ctx.lineTo(size * 0.3, size * 0.7);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'stellar-barge') {
                    ctx.fillRect(-size * 0.8, -size * 0.4, size * 1.5, size * 0.8);
                    ctx.strokeRect(-size * 0.8, -size * 0.4, size * 1.5, size * 0.8);
                    ctx.beginPath();
                    ctx.moveTo(size * 0.7, -size * 0.3);
                    ctx.lineTo(size * 1.1, 0);
                    ctx.lineTo(size * 0.7, size * 0.3);
                    ctx.fill();
                } else if (s.shipClass === 'cyber-sentry') {
                    const eyeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.4);
                    eyeGrad.addColorStop(0, '#ff0000');
                    eyeGrad.addColorStop(1, '#220000');
                    ctx.fillStyle = eyeGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                    for (let i = 0; i < 8; i++) {
                        const ang = (i / 8) * Math.PI * 2 + time * 0.001;
                        ctx.strokeStyle = '#ff0000';
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(ang) * size * 0.45, Math.sin(ang) * size * 0.45);
                        ctx.lineTo(Math.cos(ang) * size * 0.8, Math.sin(ang) * size * 0.8);
                        ctx.stroke();
                    }
                } else if (s.shipClass === 'aether-wing') {
                    ctx.beginPath();
                    ctx.moveTo(-size * 0.8, -size * 0.6);
                    ctx.lineTo(size * 1.0, 0);
                    ctx.lineTo(-size * 0.8, size * 0.6);
                    ctx.lineTo(-size * 0.4, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'death-sphere') {
                    ctx.beginPath();
                    ctx.arc(0, 0, size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    // Equator trench
                    ctx.strokeStyle = '#222';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(-size, 0);
                    ctx.lineTo(size, 0);
                    ctx.stroke();
                    // Superlaser primary weapon dish
                    ctx.fillStyle = '#00ff00';
                    ctx.beginPath();
                    ctx.arc(size * 0.4, -size * 0.4, size * 0.15, 0, Math.PI * 2);
                    ctx.fill();
                } else if (s.shipClass === 'tie-fighter') {
                    // Spherical central pod
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    // Vertical solar wings
                    ctx.fillRect(-size * 1.2, -size * 0.8, size * 0.2, size * 1.6);
                    ctx.fillRect(size * 1.0, -size * 0.8, size * 0.2, size * 1.6);
                    ctx.strokeRect(-size * 1.2, -size * 0.8, size * 0.2, size * 1.6);
                    ctx.strokeRect(size * 1.0, -size * 0.8, size * 0.2, size * 1.6);
                    // Connecting struts
                    ctx.beginPath();
                    ctx.moveTo(-size * 1.0, 0);
                    ctx.lineTo(size * 1.0, 0);
                    ctx.stroke();
                } else {
                    // Default sleek fighter
                    ctx.beginPath();
                    ctx.moveTo(size, 0);
                    ctx.lineTo(-size * 0.6, size * 0.4);
                    ctx.lineTo(-size * 0.6, -size * 0.4);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }

                // Navigation lights
                if (s.shipClass !== 'probe' && s.shipClass !== 'saucer') {
                    const lightPulse = Math.sin(time * 0.003 + (s.lightPhase || 0)) * 0.5 + 0.5;
                    ctx.fillStyle = s.lightColor || '#ff00ff';
                    ctx.globalAlpha = lightPulse;
                    ctx.beginPath();
                    ctx.arc(size * 0.85, 0, 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#00ff00';
                    ctx.beginPath();
                    ctx.arc(-size * 0.5, -size * 0.6, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#ff0000';
                    ctx.beginPath();
                    ctx.arc(-size * 0.5, size * 0.6, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                ctx.restore();

                s.x += s.vx * 0.5;
                s.y += s.vy * 0.5;
            });
        }
    }

    renderMatrix(ctx, time) {
        const { matrixStreams, cyberNodes, camera, canvas } = this.game;
        if (!canvas) return;
        
        const viewW = canvas.width;
        const viewH = canvas.height;
        const shipX = this.game.playerShip?.x || 0;
        const shipY = this.game.playerShip?.y || 0;

        // Data Nodes
        if (cyberNodes) {
            cyberNodes.forEach(node => {
                const pFact = (node.z / 5000) || 0.95;
                
                // Wrap around viewport with parallax tracking
                let sx = ((node.x - shipX * (1 - pFact)) % viewW + viewW) % viewW - viewW/2;
                let sy = ((node.y - shipY * (1 - pFact)) % viewH + viewH) % viewH - viewH/2;
                
                // Compense for Renderer.js translation
                sx += shipX * 0.98;
                sy += shipY * 0.98;
                
                const size = node.size * (node.scale || 1);

                ctx.save();
                ctx.translate(sx, sy);
                const pulse = (Math.sin(time * 0.002 + (node.pulse || 0)) + 1) / 2;
                ctx.strokeStyle = node.color;
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.3 + pulse * 0.4;
                ctx.beginPath();
                for(let i=0; i<6; i++) {
                    const ang = (i / 6) * Math.PI * 2;
                    ctx.lineTo(Math.cos(ang) * size, Math.sin(ang) * size);
                }
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
            });
        }

        // Matrix Rain Streams: Uses consistent wrapping logic
        if (matrixStreams) {
            matrixStreams.forEach(stream => {
                const pf = 0.99;
                const rotated = this.worldToScreen(stream.x, stream.y, 0, pf, 4000);
                if (!rotated) return;

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                ctx.textAlign = 'center';
                
                const fontSize = stream.size || 14;
                ctx.font = `bold ${fontSize}px monospace`;
                
                const charCount = 20;
                for (let i = 0; i < charCount; i++) {
                    const yOffset = (i * fontSize * 0.9);
                    const char = stream.chars[(Math.floor(time / 100) + i) % stream.chars.length];
                    ctx.fillStyle = i === 0 ? '#ffffff' : stream.color;
                    ctx.globalAlpha = stream.opacity * (1 - i / charCount) * rotated.scale;
                    ctx.fillText(char, 0, yOffset);
                }
                
                // Animation update
                stream.y = (stream.y + (stream.baseSpeed || 2)) % 4000;
                ctx.restore();
            });
        }
    }

    /**
     * Galaxies: Rendered in screen-space with parallax so they're always visible
     * as distant background decorations
     */
    renderGalaxies(ctx, galaxies, time) {
        if (!galaxies) return;

        const zoom = this.game.camera.zoom || 1;
        galaxies.forEach(g => {
            const rotated = this.worldToScreen(g.x, g.y, g.z || 0, 0.75);
            if (!rotated) return;
            
            // Reverted Phase 31: Background decoupled from zoom
            let size = this.safeSize(((g.size || 1000) * rotated.scale), 'galaxy');

            if (!isFinite(size) || size <= 0) return;
            
            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            ctx.rotate(g.rotation + time * 0.0001);
            
            const grad = this.safeRadialGradient(ctx, 0, 0, 0, 0, 0, size);

            grad.addColorStop(0, this.normHex(g.color) + '88');
            grad.addColorStop(0.4, this.normHex(g.color) + '22');
            grad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = grad;
            ctx.scale(1, g.type === 'spiral' ? 0.4 : 0.7);
            ctx.beginPath(); 
            ctx.arc(0, 0, Math.max(1, size), 0, Math.PI * 2); 
            ctx.fill();
            
            // Core Glow
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.3 * rotated.scale;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
            ctx.fill();

            // --- PHASE 30: ZOOM BLOOM ---
            if (zoom > 1.2) {
                const bloomSize = size * (zoom - 1.2) * 0.5;
                const bloomGrad = this.safeRadialGradient(ctx, 0, 0, 0, 0, 0, bloomSize);
                bloomGrad.addColorStop(0, this.normHex(g.color) + '44');
                bloomGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = bloomGrad;
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.arc(0, 0, bloomSize, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        });
    }
    
    /**
     * Suns: High-fidelity stars with plasma coronas and solar flares.
     */
    renderSuns(ctx, time) {
        const { suns } = this.game;
        if (!suns || suns.length === 0) return;

        const zoom = this.game.camera.zoom || 1;
        suns.forEach(sun => {
            const rotated = this.worldToScreen(sun.x, sun.y, sun.z || 0, 0.85);
            if (!rotated) return;

            // Reverted Phase 31: Background decoupled from zoom
            let size = this.safeSize(((sun.size || 500) * rotated.scale), 'sun');
            if (size <= 0) return;

            ctx.save();
            ctx.translate(rotated.x, rotated.y);

            // 1. DYNAMIC CORONA (Volumetric Bloom)
            const pulse = Math.sin(time * 0.001 + (sun.pulseOffset || 0)) * 0.1 + 1.0;
            const coronaGrad = this.safeRadialGradient(ctx, 0, 0, size * 0.4, 0, 0, size * 2.5 * pulse);
            coronaGrad.addColorStop(0, sun.color);
            coronaGrad.addColorStop(0.2, this.normHex(sun.color) + 'aa');
            coronaGrad.addColorStop(0.5, this.normHex(sun.color) + '33');
            coronaGrad.addColorStop(1, 'transparent');
            
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = coronaGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 2.5 * pulse, 0, Math.PI * 2);
            ctx.fill();

            // 2. SOLAR FLARE RAYS (Cinematic energy spikes)
            for (let i = 0; i < 6; i++) {
                const flareAngle = (i / 6) * Math.PI * 2 + time * 0.0003;
                const flarePulse = Math.sin(time * 0.004 + i) * 0.3 + 1.0;
                const flareLen = size * 3.5 * flarePulse;
                
                const flareGrad = ctx.createLinearGradient(0, 0, flareLen, 0);
                flareGrad.addColorStop(0, sun.color);
                flareGrad.addColorStop(0.5, this.normHex(sun.color) + '44');
                flareGrad.addColorStop(1, 'transparent');

                ctx.save();
                ctx.rotate(flareAngle);
                ctx.fillStyle = flareGrad;
                ctx.beginPath();
                ctx.moveTo(size * 0.3, -size * 0.05);
                ctx.lineTo(flareLen, 0);
                ctx.lineTo(size * 0.3, size * 0.05);
                ctx.fill();
                ctx.restore();
            }

            // 3. PHOTOSPHERE (The star's surface)
            ctx.globalCompositeOperation = 'source-over';
            const surfaceGrad = this.safeRadialGradient(ctx, -size * 0.3, -size * 0.3, 0, 0, 0, size);
            surfaceGrad.addColorStop(0, '#ffffff');
            surfaceGrad.addColorStop(0.1, sun.color);
            surfaceGrad.addColorStop(0.8, this.normHex(sun.color) + 'ee');
            surfaceGrad.addColorStop(1, this.normHex(sun.color) + 'cc');
            
            ctx.fillStyle = surfaceGrad;
            ctx.shadowBlur = size * 0.5;
            ctx.shadowColor = sun.color;
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
    }

    /**
     * Nebulae: Rendered in screen-space with slow parallax
     * Creates the volumetric colored clouds effect
     */
    renderNebulaClouds(ctx, nebulae, time) {
        if (!nebulae) return;

        const zoom = this.game.camera.zoom || 1;
        nebulae.forEach(n => {
            const rotated = this.worldToScreen(n.x, n.y, n.z || 0, 0.80);
            if (!rotated) return;
            
            // Reverted Phase 31: Background decoupled from zoom
            let size = this.safeSize(((n.size || 500) * rotated.scale), 'nebula');

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            
            // --- PHASE 30: VOLUMETRIC MULTI-LAYER STACK ---
            const baseAlpha = (n.opacity || 0.2) * rotated.scale;
            ctx.globalAlpha = baseAlpha;
            
            for (let layer = 0; layer < 3; layer++) {
                const layerSize = size * (1 + layer * 0.3);
                const drift = Math.sin(time * 0.0001 + layer) * 20;
                
                const grad = this.safeRadialGradient(ctx, drift, drift, 0, 0, 0, layerSize);
                const color = this.normHex(n.color);
                
                grad.addColorStop(0, color + '55');
                grad.addColorStop(0.4, color + '22');
                grad.addColorStop(0.7, color + '08');
                grad.addColorStop(1, 'transparent');
                
                ctx.save();
                ctx.rotate(time * 0.00005 * (layer + 1) + (n.seed || 0));
                ctx.scale(1.5 + layer * 0.2, 0.7 - layer * 0.1);
                ctx.fillStyle = grad;
                ctx.beginPath(); 
                ctx.arc(0, 0, Math.max(1, layerSize), 0, Math.PI * 2); 
                ctx.fill();
                ctx.restore();
            }
            ctx.restore();
        });
    }

    /**
     * Black Holes: Rendered in screen-space with accretion disk effect
     */
    renderBlackHoles(ctx, blackHoles, time) {
        if (!blackHoles) return;

        const zoom = this.game.camera.zoom || 1;
        blackHoles.forEach(bh => {
            const rotated = this.worldToScreen(bh.x, bh.y, bh.z || 0, 0.70);
            if (!rotated) return;
            // Reverted Phase 31: Background decoupled from zoom
            let size = this.safeSize((bh.size * rotated.scale), 'blackhole');
            if (size <= 0) return;

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            
            // 1. GRAVITATIONAL LENSING (Screen blend aura)
            ctx.globalCompositeOperation = 'screen';
            const lensGrad = this.safeRadialGradient(ctx, 0, 0, size * 0.8, 0, 0, size * 2.5);
            lensGrad.addColorStop(0, 'rgba(100, 150, 255, 0.15)');
            lensGrad.addColorStop(0.5, 'rgba(50, 0, 100, 0.05)');
            lensGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = lensGrad;
            ctx.beginPath(); ctx.arc(0, 0, size * 2.5, 0, Math.PI * 2); ctx.fill();

            // 2. ACCRETION DISK (Glow layer)
            const diskRot = time * 0.001;
            ctx.save();
            ctx.rotate(diskRot);
            ctx.scale(2.0, 0.4);
            const diskGrad = this.safeRadialGradient(ctx, 0, 0, size * 0.4, 0, 0, size * 1.5);
            diskGrad.addColorStop(0, '#ffaa00');
            diskGrad.addColorStop(0.3, '#ff4400');
            diskGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = diskGrad;
            ctx.globalAlpha = 0.6;
            ctx.beginPath(); ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2); ctx.fill();
            ctx.restore();

            // 3. EVENT HORIZON SHADOW
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#000000';
            ctx.shadowBlur = size * 0.2;
            ctx.shadowColor = '#4400aa';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
            ctx.fill();

            // 4. PHOTON RING (Sharp high-energy edge)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = Math.max(1, 3 * rotated.scale);
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.65, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.restore();
        });
    }

    /**
     * Planets: Rendered in screen-space with atmospheric glow and optional rings
     */
    renderBackgroundPlanets(ctx, planets, time) {
        if (!planets || planets.length === 0) return;

        const zoom = this.game.camera.zoom || 1;
        planets.forEach(p => {
            // Background planets use fixed parallax depth (0.82)
            const rotated = this.worldToScreen(p.x, p.y, p.z || 0, 0.82);
            if (!rotated) return;
            
            // Reverted Phase 31: Background decoupled from zoom
            let size = this.safeSize(((p.radius || 200) * rotated.scale), 'planet');
            
            if (!isFinite(size) || size <= 0) return;

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            
            // Axial rotation over time
            const rotationSpeed = p.rotationSpeed || 0.05;
            ctx.rotate((p.axialTilt || 0) + time * rotationSpeed);

            const detailLevel = Math.min(3, Math.floor(size / 30));

            // === SATURN-STYLE RINGS: Draw back half first ===
            if (p.hasRings) {
                this.drawPlanetRingsHalf(ctx, p, 'back', size / (p.radius || 200));
            }

            // Atmospheric Glow (Outer)
            if (p.hasAtmosphere) {
                const safeTime = isFinite(time) ? time : 0;
                const safeSeed = isFinite(p.textureSeed) ? p.textureSeed : 0;
                const atmosGrad = this.safeRadialGradient(ctx, 0, 0, size * 0.95, 0, 0, size * 1.15);
                const atmosAlpha = (0.5 + Math.sin(safeTime * 0.002 + safeSeed) * 0.1);
                
                // Ensure atmosAlpha is valid before converting to hex
                const alphaInt = isFinite(atmosAlpha) ? Math.floor(Math.max(0, atmosAlpha) * 64) : 32;
                const alphaHex = alphaInt.toString(16).padStart(2, '0');
                
                atmosGrad.addColorStop(0, 'transparent');
                atmosGrad.addColorStop(0.5, (p.atmosphereColor || '#87CEEB') + alphaHex);
                atmosGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = atmosGrad;
                ctx.beginPath();
                ctx.arc(0, 0, size * 1.15, 0, Math.PI * 2);
                ctx.fill();
            }

            // Planet body with 3D gradient
            const bodyGrad = this.safeRadialGradient(ctx, 
                -size * 0.3, -size * 0.3, 0,
                0, 0, size
            );
            bodyGrad.addColorStop(0, p.secondaryColor || '#aaddff');
            bodyGrad.addColorStop(0.4, p.baseColor || p.color || '#4488ff');
            bodyGrad.addColorStop(0.8, p.tertiaryColor || '#2244aa');
            bodyGrad.addColorStop(1, '#000000');

            ctx.fillStyle = bodyGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();

            // Surface texture (procedural bands/patterns based on zoom)
            if (detailLevel >= 1) {
                ctx.globalAlpha = 0.3;
                ctx.strokeStyle = p.tertiaryColor || '#112255';
                ctx.lineWidth = 2;

                // Draw bands for gas giants
                if (p.type === 'gas-giant' || p.type === 'ice-giant') {
                    for (let i = -4; i <= 4; i++) {
                        const bandY = size * (i * 0.15);
                        const bandWidth = Math.sqrt(size * size - bandY * bandY);
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
                    const seed = p.textureSeed || 0;
                    for (let j = 0; j < 5; j++) {
                        const cx = Math.cos(seed + j * 1.2) * size * 0.5;
                        const cy = Math.sin(seed * 0.7 + j) * size * 0.4;
                        const cr = size * (0.15 + Math.sin(seed + j) * 0.1);
                        ctx.beginPath();
                        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                ctx.globalAlpha = 1;
            }

            // Shadow side (Simple gradient overlay)
            const shadowGrad = ctx.createLinearGradient(-size, 0, size, 0);
            shadowGrad.addColorStop(0, 'transparent');
            shadowGrad.addColorStop(0.6, 'transparent');
            shadowGrad.addColorStop(1, 'rgba(0,0,0,0.6)');
            ctx.fillStyle = shadowGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();

            // === SATURN-STYLE RINGS: Draw front half on top ===
            if (p.hasRings) {
                this.drawPlanetRingsHalf(ctx, p, 'front', size / (p.radius || 200));
            }

            ctx.restore();
        });
    }

    drawPlanetRingsHalf(ctx, p, half, scale) {
        ctx.save();
        
        const rInner = (p.ringInnerRadius || p.radius * 1.3) * scale;
        const rOuter = (p.ringOuterRadius || p.radius * 2.2) * scale;

        // Create clipping region for front or back half
        ctx.beginPath();
        if (half === 'back') {
            ctx.rect(-rOuter * 1.5, -rOuter, rOuter * 3, rOuter);
        } else {
            ctx.rect(-rOuter * 1.5, 0, rOuter * 3, rOuter);
        }
        ctx.clip();

        // Draw the ring bands
        ctx.globalAlpha = half === 'back' ? 0.4 : 0.7;

        for (let i = 0; i < 5; i++) {
            const ringR = rInner + (rOuter - rInner) * (i / 5 + 0.1);
            const ringThickness = (rOuter - rInner) * 0.12;

            ctx.strokeStyle = p.ringColor || 'rgba(200, 200, 200, 0.5)';
            ctx.lineWidth = ringThickness;

            ctx.beginPath();
            ctx.ellipse(0, 0, ringR, ringR * 0.25, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }


    renderShootingStars(ctx, time) {
        const { shootingStars } = this.game;

        shootingStars.forEach(ss => {
            const rotated = this.worldToScreen(ss.x, ss.y, ss.z || 0, 0.90);
            if (!rotated) return;
            
            const zoom = this.game.camera.zoom || 1;
            const size = 2 * rotated.scale * zoom;
            const length = 40 * rotated.scale * zoom;
            
            // Calculate tail angle
            const angle = Math.atan2(ss.vy, ss.vx);
            
            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            ctx.rotate(angle);
            ctx.globalAlpha = ss.life || 1;
            
            const grad = this.rm.getGradient(ctx, 'linear', 0, 0, -length, 0, [
                { offset: 0, color: ss.color || '#fff' },
                { offset: 1, color: 'transparent' }
            ]);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = size;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-length, 0);
            ctx.stroke();
            
            ctx.restore();
        });
    }
}

window.CelestialRenderer = CelestialRenderer;
