/**
 * FXRenderer: Handles post-processing, screen overlays, edge markers, and anomalies.
 * Phase 4 Modularization.
 */
class FXRenderer {
    constructor(renderManager) {
        this.rm = renderManager;
        this.game = renderManager.game;
    }

    draw(ctx, time) {
        this.renderDamageVignette(ctx);
        this.renderEdgeMarkers(ctx);
        this.renderPostEffects(ctx);
        
        if (this.game.collapseFactor > 0) {
            this.renderDimensionalCollapse(ctx, this.game.collapseFactor);
        }
        
        if (this.game.flashAlpha > 0) {
            this.renderFlashOverlay(ctx, this.game.flashAlpha);
        }

        this.drawHolographicOverlay(ctx, ctx.canvas, time);
    }

    renderDamageVignette(ctx) {
        const ship = this.game.playerShip;
        if (!ship || (ship.hullHealth !== undefined && ship.hullHealth > 40)) return;
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const hHealth = (ship.hullHealth !== undefined && !isNaN(ship.hullHealth)) ? ship.hullHealth : 100;
        const rawIntensity = (40 - hHealth) / 40;
        const intensity = (isFinite(rawIntensity) && rawIntensity > 0) ? rawIntensity : 0;
        const pulse = (Math.sin(Date.now() * 0.005) + 1) / 2;
        
        const grad = ctx.createRadialGradient(
            ctx.canvas.width/2, ctx.canvas.height/2, ctx.canvas.height * 0.3,
            ctx.canvas.width/2, ctx.canvas.height/2, ctx.canvas.height * 0.8
        );
        this.rm.safeAddColorStop(grad, 0, 'transparent');
        const intensityAlpha = (intensity * 0.4 * pulse);
        this.rm.safeAddColorStop(grad, 1, `rgba(255, 0, 50, ${intensityAlpha})`);
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        if (intensity > 0.5 && Math.random() < 0.1) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            ctx.fillRect(2, 0, ctx.canvas.width, ctx.canvas.height);
        }
        ctx.restore();
    }

    renderPostEffects(ctx) {
        if (this.rm.flashAlpha > 0) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.rm.flashAlpha})`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
            
            this.rm.flashAlpha -= 1 / (this.rm.flashDuration || 60);
            if (this.rm.flashAlpha < 0) this.rm.flashAlpha = 0;
        }
    }

    renderEdgeMarkers(ctx) {
        if (!this.game.playerShip || !this.game.flightMode || this.game.hudHidden) return;

        const canvas = ctx.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const margin = 40;
        const targets = [];

        if (this.game.aiManager && this.game.aiManager.ships) {
            this.game.aiManager.ships.forEach(ship => {
                if (ship.vesselType === 'freighter') {
                    targets.push({ x: ship.x, y: ship.y, label: 'CONVOY', color: '#FFD700', icon: '🚛' });
                }
            });
        }

        if (this.game.spaceBases) {
            this.game.spaceBases.forEach(base => {
                if (base.isRaidActive) {
                    targets.push({ x: base.x, y: base.y, label: 'RAID', color: '#ff4444', icon: '🚨', pulse: true });
                }
            });
        }

        if (targets.length === 0) return;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        targets.forEach(target => {
            const dx = target.x - this.game.playerShip.x;
            const dy = target.y - this.game.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const sx = dx * this.game.camera.zoom;
            const sy = dy * this.game.camera.zoom;

            const isOnScreen = Math.abs(sx) < (canvas.width / 2 - margin) && 
                               Math.abs(sy) < (canvas.height / 2 - margin);

            if (!isOnScreen) {
                const angle = Math.atan2(sy, sx);
                let edgeX, edgeY;

                if (Math.abs(sx / (canvas.width / 2)) > Math.abs(sy / (canvas.height / 2))) {
                    edgeX = (sx > 0 ? 1 : -1) * (canvas.width / 2 - margin);
                    edgeY = edgeX * (sy / sx);
                } else {
                    edgeY = (sy > 0 ? 1 : -1) * (canvas.height / 2 - margin);
                    edgeX = edgeY * (sx / sy);
                }

                const rx = centerX + edgeX;
                const ry = centerY + edgeY;

                ctx.save();
                ctx.translate(rx, ry);
                ctx.rotate(angle);
                ctx.fillStyle = target.color;
                ctx.beginPath();
                ctx.moveTo(10, 0); ctx.lineTo(-10, -8); ctx.lineTo(-6, 0); ctx.lineTo(-10, 8);
                ctx.closePath(); ctx.fill();
                ctx.restore();

                ctx.fillStyle = '#fff';
                ctx.font = 'bold 10px Orbitron';
                ctx.textAlign = edgeX > 0 ? 'right' : 'left';
                const labelX = rx + (edgeX > 0 ? -20 : 20);
                ctx.fillText(`${target.icon} ${target.label}`, labelX, ry - 6);
                ctx.restore();
            }
        });
        ctx.restore();
    }

    renderDimensionalCollapse(ctx, p) {
        const canvas = ctx.canvas;
        ctx.save();
        const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width * 1.5);
        this.rm.safeAddColorStop(grad, 0, `rgba(0, 0, 0, ${p * 0.9})`);
        this.rm.safeAddColorStop(grad, 0.5, `rgba(74, 144, 226, ${p * 0.1})`);
        this.rm.safeAddColorStop(grad, 1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    renderFlashOverlay(ctx, alpha) {
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }

    drawHolographicOverlay(ctx, canvas, time) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (Math.random() > 0.985) {
            ctx.fillStyle = 'rgba(255,255,255,0.015)';
            for (let i = 0; i < 30; i++) {
                ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
            }
        }
        const scanY = (time * 0.1) % canvas.height;
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.04)';
        ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(canvas.width, scanY); ctx.stroke();
        ctx.restore();
    }
}

window.FXRenderer = FXRenderer;
