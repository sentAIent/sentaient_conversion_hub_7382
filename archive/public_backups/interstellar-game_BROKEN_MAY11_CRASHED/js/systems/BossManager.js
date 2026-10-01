/**
 * BossManager.js
 * Handles the "Singularity Guardian" Black Hole Boss encounter.
 * Part of the Interstellar Marketing Expansion.
 */

class BossManager {
    constructor(game) {
        this.game = game;
        this.activeBoss = null;
        this.warningActive = false;
        this.warningTimer = 0;
        this.phases = {
            IDLE: 0,
            STORM: 1,      // Gravitational pull + Debris
            BEAMS: 2,      // Precision Accretion Beams
            COLLAPSE: 3    // Final explosion Sequence
        };
    }

    spawnBoss(x, y) {
        if (this.activeBoss) return; // Only one boss at a time

        console.log("[BossManager] Singularity Guardian Spawning at", x, y);
        this.activeBoss = {
            x: x,
            y: y,
            radius: 300,
            health: 2500, // Increased health for Phase 7
            maxHealth: 2500,
            phase: this.phases.STORM,
            phaseTimer: 0,
            rotation: 0,
            beams: [],
            debris: []
        };
        
        // Initialize Debris for Phase 1
        for(let i=0; i<30; i++) {
            this.activeBoss.debris.push({
                angle: Math.random() * Math.PI * 2,
                dist: 500 + Math.random() * 600,
                speed: 0.01 + Math.random() * 0.02,
                size: 8 + Math.random() * 20
            });
        }

        this.triggerWarningSequence();
    }

    triggerWarningSequence() {
        this.warningActive = true;
        this.warningTimer = 5000; // 5 seconds of cinematic dread
        
        // 1. HUD Effects
        if (this.game.hudManager) {
            this.game.hudManager.showToast("⚠️ EXTREME GRAVITATIONAL ANOMALY DETECTED", 5000, 'error');
        }

        // 2. Renderer Effects
        if (this.game.renderer) {
            this.game.renderer.redAlertIntensity = 1.0;
            this.game.screenShakeIntensity = 25;
        }

        // 3. Audio (if engine exists)
        if (window.AudioEngine) {
            window.AudioEngine.play('alarm_heavy'); // Handled by script.js audio hooks
        }
    }

    update(dt) {
        if (!this.activeBoss) return;

        const boss = this.activeBoss;
        boss.phaseTimer += dt;
        boss.rotation += 0.01;

        // 1. Gravitational Pull (Always active)
        const dx = boss.x - this.game.playerShip.x;
        const dy = boss.y - this.game.playerShip.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 2000) {
            const force = (1 - dist / 2000) * 0.5;
            this.game.playerShip.vx += (dx / dist) * force;
            this.game.playerShip.vy += (dy / dist) * force;
        }

        // 2. Phase-Specific Logic
        switch (boss.phase) {
            case this.phases.STORM:
                this.updatePhaseStorm(boss, dt);
                if (boss.phaseTimer > 10000) this.transitionPhase(this.phases.BEAMS);
                break;
            case this.phases.BEAMS:
                this.updatePhaseBeams(boss, dt);
                // Phase 20: Screen Shake during intense beam phase
                if (Math.random() > 0.8) {
                    this.game.camera.x += (Math.random() - 0.5) * 10;
                    this.game.camera.y += (Math.random() - 0.5) * 10;
                }
                if (boss.phaseTimer > 15000) this.transitionPhase(this.phases.STORM);
                break;
            case this.phases.COLLAPSE:
                this.updatePhaseCollapse(boss, dt);
                break;
        }

        // Check for "Damage" (If player stays close to event horizon without dying)
        if (dist < 400 && boss.phase !== this.phases.COLLAPSE) {
            boss.health -= 0.1;
            if (boss.health <= 0) this.transitionPhase(this.phases.COLLAPSE);
        }
    }

    transitionPhase(newPhase) {
        const boss = this.activeBoss;
        boss.phase = newPhase;
        boss.phaseTimer = 0;
        console.log("[BossManager] Boss Transition to Phase:", newPhase);
        
        if (newPhase === this.phases.BEAMS) {
            this.game.hudManager.showToast("⚠️ EVENT HORIZON DESTABILIZING — ACCRETION DISK CHARGING", 4000, 'error');
            this.game.screenShakeIntensity = 15;
            this.game.renderer.redAlertIntensity = 1.0;
        } else if (newPhase === this.phases.COLLAPSE) {
            this.game.hudManager.showToast("✨ REALITY COLLAPSE INITIATED", 5000, 'success');
            this.game.renderer.flashAlpha = 1.0; // White out flash
            this.game.screenShakeIntensity = 40;
        }
    }

    updatePhaseStorm(boss, dt) {
        boss.debris.forEach(d => {
            d.angle += d.speed;
            // Spiral inwards slightly
            d.dist -= 0.2;
            if (d.dist < 250) d.dist = 800;
        });
    }

    updatePhaseBeams(boss, dt) {
        // Fire precision needle beams at the player every 1.5 seconds (was 2s)
        if (Math.floor(boss.phaseTimer / 100) % 15 === 0) {
            const angle = Math.atan2(this.game.playerShip.y - boss.y, this.game.playerShip.x - boss.x);
            boss.beams.push({
                x: boss.x + Math.cos(angle) * boss.radius,
                y: boss.y + Math.sin(angle) * boss.radius,
                tx: this.game.playerShip.x,
                ty: this.game.playerShip.y,
                life: 1.2,
                maxLife: 1.2,
                width: 2 + Math.random() * 6 // Variable thickness
            });
            this.game.screenShakeIntensity = 2;
        }

        boss.beams.forEach((b, i) => {
            b.life -= 0.03;
            if (b.life <= 0) boss.beams.splice(i, 1);
            
            // Damage player if life is high (active beam phase)
            if (b.life > 0.8) {
                const distToBeam = this.getDistToBeam(this.game.playerShip.x, this.game.playerShip.y, b);
                if (distToBeam < 50) {
                    this.game.playerShip.takeDamage(0.5); // Damage via ship method
                }
            }
        });
    }

    getDistToBeam(px, py, beam) {
        const dx = beam.tx - beam.x;
        const dy = beam.ty - beam.y;
        const lenSq = dx * dx + dy * dy;
        const t = Math.max(0, Math.min(1, ((px - beam.x) * dx + (py - beam.y) * dy) / lenSq));
        const projX = beam.x + t * dx;
        const projY = beam.y + t * dy;
        return Math.hypot(px - projX, py - projY);
    }

    updatePhaseCollapse(boss, dt) {
        if (boss.phaseTimer > 5000) {
            // Spawn Exotic Matter Loot
            this.spawnLoot(boss.x, boss.y);
            this.activeBoss = null;
            this.game.hudManager.showToast("✨ GUARDIAN NEUTRALIZED. EXOTIC MATTER DETECTED.", 5000, 'success');
        }
    }

    spawnLoot(x, y) {
        // Reward player with premium gems/matter
        if (this.game.playerInventory) {
            this.game.playerInventory.exotic_matter = (this.game.playerInventory.exotic_matter || 0) + 1;
            this.game.playerInventory.diamond = (this.game.playerInventory.diamond || 0) + 5;
            this.game.hudManager.showPreciousToast("Diamond x5", "EXOTIC MATTER UNLOCKED");
        }
    }

    render(ctx) {
        if (!this.activeBoss) return;
        const boss = this.activeBoss;

        // Renderer.js will handle the core Black Hole rendering.
        // BossManager handles the "Extra" combat visuals.
        
        // Render Beams (Enhanced Accretion Beams)
        ctx.save();
        boss.beams.forEach(b => {
            const alpha = Math.min(1, b.life * 1.5);
            const intensity = b.life > 0.8 ? 1.0 : b.life / 0.8;
            
            // 1. OUTER GLOW
            ctx.strokeStyle = `rgba(0, 243, 255, ${alpha * 0.3})`;
            ctx.lineWidth = b.width * 10 * intensity;
            ctx.shadowBlur = 20 * intensity;
            ctx.shadowColor = '#00f3ff';
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.tx, b.ty);
            ctx.stroke();

            // 2. INNER CORE
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = b.width * 0.5 * intensity;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.tx, b.ty);
            ctx.stroke();
        });
        ctx.restore();

        // Render Debris
        boss.debris.forEach(d => {
            const dx = boss.x + Math.cos(d.angle) * d.dist;
            const dy = boss.y + Math.sin(d.angle) * d.dist;
            
            ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
            ctx.beginPath();
            ctx.arc(dx, dy, d.size / this.game.camera.zoom, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }
}

window.BossManager = BossManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.BossManager = BossManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BossManager;
}
