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
        this.renderEnemyShips(ctx, time);
        this.renderProjectiles(ctx, time);
        this.renderCombatVisuals(ctx);
        this.renderRedAlert(ctx);
    }

    renderEnemyShips(ctx, time) {
        if (!this.game.enemyShips || this.game.enemyShips.length === 0) return;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();

        this.game.enemyShips.forEach(enemy => {
            const rotated = this.game.physicsManager.rotate3D(enemy.x, enemy.y, 0, center.x, center.y);
            const size = (enemy.size || 30) * rotated.scale;

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            ctx.rotate(enemy.rotation || 0);

            // Ship Body - Integrated 13 Star Wars-Quality Classes
            const sc = enemy.shipClass || 'interceptor';
            ctx.fillStyle = enemy.hitFlash > 0 ? '#fff' : (enemy.color || '#ff4444');
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;

            if (sc === 'saucer') {
                ctx.beginPath();
                ctx.ellipse(0, 0, size, size * 0.25, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            } else if (sc === 'star-dreadnought') {
                ctx.beginPath();
                ctx.moveTo(size * 1.5, 0);
                ctx.lineTo(-size * 1.2, -size * 0.7);
                ctx.lineTo(-size, 0);
                ctx.lineTo(-size * 1.2, size * 0.7);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            } else if (sc === 'void-fighter') {
                ctx.beginPath();
                ctx.moveTo(size * 0.9, 0);
                ctx.lineTo(size * 0.2, -size * 0.5);
                ctx.lineTo(-size * 0.6, -size * 0.3);
                ctx.lineTo(-size * 0.6, size * 0.3);
                ctx.lineTo(size * 0.2, size * 0.5);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            } else if (sc === 'nebula-cruiser') {
                ctx.beginPath();
                ctx.moveTo(size * 1.2, 0);
                ctx.lineTo(size * 0.7, -size * 0.1);
                ctx.lineTo(-size * 0.5, -size * 0.15);
                ctx.lineTo(-size * 0.8, 0);
                ctx.lineTo(-size * 0.5, size * 0.15);
                ctx.lineTo(size * 0.7, size * 0.1);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            } else if (sc === 'tie-fighter') {
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillRect(-size * 1.2, -size * 0.8, size * 0.2, size * 1.6);
                ctx.fillRect(size * 1.0, -size * 0.8, size * 0.2, size * 1.6);
            } else {
                // Default Interceptor
                ctx.beginPath();
                ctx.moveTo(size, 0);
                ctx.lineTo(-size * 0.6, -size * 0.7);
                ctx.lineTo(-size * 0.4, 0);
                ctx.lineTo(-size * 0.6, size * 0.7);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            // Engine Glow
            const enginePulse = 0.5 + 0.5 * Math.sin(time * 0.02);
            ctx.fillStyle = `rgba(255, 100, 0, ${enginePulse})`;
            ctx.beginPath();
            ctx.arc(-size * 0.5, 0, size * 0.3, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });
    }

    renderProjectiles(ctx, time) {
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();

        // 1. Player Bullets
        if (this.game.projectiles) {
            ctx.fillStyle = '#00ffff';
            this.game.projectiles.forEach(p => {
                const rotated = this.game.physicsManager.rotate3D(p.x, p.y, 0, center.x, center.y);
                const size = 3 * rotated.scale;
                ctx.beginPath();
                ctx.arc(rotated.x, rotated.y, size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // 2. Enemy Bullets (Standard & Needle-Beams)
        if (this.game.enemyBullets) {
            this.game.enemyBullets.forEach(b => {
                const rotated = this.game.physicsManager.rotate3D(b.x, b.y, 0, center.x, center.y);
                if (rotated.scale < 0.1) return;

                if (b.variant === 'void' || b.variant === 'pulsar') {
                    // Phase 19 Needle-Beam Rendering
                    ctx.save();
                    ctx.translate(rotated.x, rotated.y);
                    ctx.rotate(b.rotation || 0);
                    
                    ctx.strokeStyle = b.color || '#ff4444';
                    ctx.lineWidth = (b.width || 2) * rotated.scale;
                    ctx.lineCap = 'round';
                    
                    ctx.beginPath();
                    ctx.moveTo(-(b.length || 20) * rotated.scale, 0);
                    ctx.lineTo(0, 0);
                    ctx.stroke();
                    
                    // Add core glow
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = (b.width || 2) * 0.3 * rotated.scale;
                    ctx.beginPath();
                    ctx.moveTo(-(b.length || 20) * 0.8 * rotated.scale, 0);
                    ctx.lineTo(0, 0);
                    ctx.stroke();
                    
                    ctx.restore();
                } else {
                    // Default Dot
                    ctx.fillStyle = b.color || '#ff4444';
                    const size = (b.size || 3) * rotated.scale;
                    ctx.beginPath();
                    ctx.arc(rotated.x, rotated.y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }

        // 3. Enemy Missiles (The "Nuclear Missiles")
        if (this.game.enemyMissiles) {
            this.game.enemyMissiles.forEach(m => {
                const rotated = this.game.physicsManager.rotate3D(m.x, m.y, 0, center.x, center.y);
                const size = 6 * rotated.scale;

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                ctx.rotate(m.angle);

                // Missile Body
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-size, -size/3, size * 2, size * 0.6);
                
                // Nuclear Tip
                ctx.fillStyle = '#ff4400';
                ctx.beginPath();
                ctx.arc(size, 0, size * 0.4, 0, Math.PI * 2);
                ctx.fill();

                // Trail
                if (m.trail) {
                    ctx.globalAlpha = 0.4;
                    m.trail.forEach(t => {
                        ctx.fillStyle = `rgba(255, 100, 0, ${t.life / 20})`;
                        ctx.beginPath();
                        ctx.arc(t.x - m.x, t.y - m.y, t.size * rotated.scale, 0, Math.PI * 2);
                        ctx.fill();
                    });
                }

                ctx.restore();
            });
        }
    }

    renderAtomicShield(ctx, ship, time) {
        const sz = ship.z || 0;
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const rotated = this.game.physicsManager.rotate3D(ship.x, ship.y, sz, center.x, center.y);
        const rScale = rotated.scale;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        
        const shieldPct = ship.atomicShield / (ship.maxAtomicShield || 500);
        const radius = (65 * rScale);
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
        ctx.lineWidth = 2;
        
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
            ctx.lineWidth = 1;
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
            ctx.lineWidth = 2;
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
                ctx.font = `14px Orbitron`;
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
                        const len = (15 + Math.random() * 25);
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
