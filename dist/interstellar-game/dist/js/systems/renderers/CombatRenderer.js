/**
 * CombatRenderer: Handles shields, projectiles, combat visuals, and damage overlays.
 * Phase 4 Modularization.
 */
class CombatRenderer {
    constructor(renderManager) {
        this.rm = renderManager;
        this.game = renderManager.game;
    }

    draw(ctx, time) {
        const ship = this.game.playerShip;
        if (ship) {
            this.renderAtomicShield(ctx, ship, time);
        }
        this.renderCombatVisuals(ctx);
        this.renderRedAlert(ctx);
    }

    renderAtomicShield(ctx, ship, time) {
        const sz = ship.z || 0;
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const rotated = this.game.physicsManager.rotate3D(ship.x, ship.y, sz, center.x, center.y);
        const rScale = rotated.scale;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        
        const shieldPct = ship.atomicShield / (ship.maxAtomicShield || 500);
        const radius = (65 * rScale) / safeZoom;
        const now = time || performance.now();
        const pulse = 0.8 + 0.2 * Math.sin(now * 0.005);

        ctx.save();
        ctx.translate(rotated.x, rotated.y);
        
        // 1. UNDER-GLOW (Radioactive Field)
        const glow = this.rm.getGradient(ctx, 'radial', 0, 0, radius * 0.8, 0, 0, radius * 1.5, [
            { offset: 0, color: `rgba(0, 255, 100, ${0.4 * shieldPct * pulse})` },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // 2. HEXAGONAL GRID PATTERN
        ctx.strokeStyle = `rgba(180, 255, 180, ${0.8 * shieldPct * pulse})`;
        ctx.lineWidth = 2 / safeZoom;
        
        for (let layer = 0; layer < 2; layer++) {
            const rot = (now * 0.0005) * (layer === 0 ? 1 : -1);
            const r = radius * (layer === 0 ? 1 : 0.85);
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2 + rot;
                const px = Math.cos(a) * r;
                const py = Math.sin(a) * r;
                i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
            
            // Internal Cross-beams
            ctx.globalAlpha = 0.3 * shieldPct;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2 + rot;
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            ctx.stroke();
            ctx.globalAlpha = 1.0;
        }

        // 3. CHROMATIC EDGE (Nuclear Distort)
        if (shieldPct > 0.8) {
            ctx.strokeStyle = `rgba(255, 100, 255, ${0.3 * pulse})`;
            ctx.lineWidth = 1 / safeZoom;
            ctx.beginPath();
            ctx.arc(Math.sin(now*0.01)*2, 0, radius * 1.1, 0, Math.PI * 2);
            ctx.stroke();
        }

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
            
            for(let i=0; i<4; i++) {
                ctx.rotate(Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(size - 15, size);
                ctx.lineTo(size, size);
                ctx.lineTo(size, size - 15);
                ctx.stroke();
            }
            
            if (Date.now() % 1000 < 500) {
                ctx.fillStyle = '#ff3300';
                ctx.font = `${14 / this.game.camera.zoom}px Orbitron`;
                ctx.textAlign = 'center';
                ctx.fillText('TARGET LOCKED', 0, -size - 20);
            }
            ctx.restore();
        }

        // 2. Impact Sparks
        if (this.game.enemyShips) {
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
    }

    renderRedAlert(ctx) {
        if (!this.rm.redAlertIntensity || this.rm.redAlertIntensity <= 0) return;
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const alpha = this.rm.redAlertIntensity * (0.1 + 0.1 * Math.sin(Date.now() * 0.01));
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
}

window.CombatRenderer = CombatRenderer;
