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
        this.drawBackground(ctx, time);
    }

    drawBackground(ctx, time) {
        const { canvas, camera, backgroundStars } = this.game;
        if (!canvas || !camera) return;

        // 1. CLEAR - Deep Void (Redundant but safe)
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
            backgroundStars.forEach(s => {
                // ATOMIC SAFETY: Ensure all values are finite before drawing
                // Use larger modulo to prevent cluster 'jumping'
                const spreadX = 8000;
                const spreadY = 8000;
                
                // Parallax shift based on camera
                const parallax = (s.z / 5000) || 0.05;
                const sx = ((s.x || 0) + (this.game.camera.x * parallax) + canvas.width) % canvas.width;
                const sy = ((s.y || 0) + (this.game.camera.y * parallax) + canvas.height) % canvas.height;
                const size = s.r || 1;
                const alpha = s.alpha || 0.5;

                if (isFinite(sx) && isFinite(sy) && isFinite(size) && isFinite(alpha)) {
                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = s.color || '#ffffff';
                    ctx.beginPath();
                    ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            ctx.restore();
        }

        // 2. Nebulae (DISABLED: Phase 19-3 Stabilization)
        /*
        if (!isNuclear && this.game.nebulae && this.game.nebulae.length > 0) { ... }
        */

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

    drawWarpTunnel(ctx, time, intensity) {
        /* 
        const pulse = Math.sin(time * 0.01) * 0.2 + 0.8;
        const grad = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, 1000 * intensity, [
            { offset: 0, color: '#fff' },
            { offset: 0.2, color: `rgba(0, 243, 255, ${0.8 * pulse})` },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = grad;
        ctx.fillRect(-10000, -10000, 20000, 20000);
        */
    }
}

window.CelestialRenderer = CelestialRenderer;
