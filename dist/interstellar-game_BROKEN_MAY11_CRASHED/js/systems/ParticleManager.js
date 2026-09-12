/**
 * ParticleManager.js
 * High-performance, pooled particle system for the Interstellar Engine.
 * Supports specialized behaviors: gravity, drag, flicker, bloom, and multi-color gradients.
 */

class ParticleManager {
    constructor(game) {
        this.game = game;
        this.particles = [];
        this.pool = [];
        this.maxParticles = 5000;
        
        // Configuration for standard types
        this.TYPES = {
            FIRE: { size: [2, 8], life: [40, 80], color: ['#ff8800', '#ff4400', '#222222'], alpha: [0.8, 0], drag: 0.98, gravity: -0.05 },
            SMOKE: { size: [10, 30], life: [100, 200], color: ['#444444', '#222222', '#111111'], alpha: [0.6, 0], drag: 0.95, gravity: -0.02 },
            SPARK: { size: [1, 3], life: [20, 40], color: ['#ffffff', '#ffff00', '#ff8800'], alpha: [1, 0], drag: 0.92, gravity: 0.1 },
            BLOOM: { size: [40, 100], life: [60, 120], color: ['#00ccff', '#0044ff', 'transparent'], alpha: [0.3, 0], drag: 0.9, gravity: 0 },
            PLASMA: { size: [5, 15], life: [30, 60], color: ['#00ff88', '#00ccff', '#004488'], alpha: [0.9, 0], drag: 0.97, gravity: 0 }
        };
    }

    init() {
        console.log("✨ [Visuals] Particle Engine v2.0 Initialized (Pooled).");
    }

    /**
     * Spawns a single particle (from pool if available)
     */
    spawn(config) {
        if (this.particles.length >= this.maxParticles) return null;

        const p = this.pool.length > 0 ? this.pool.pop() : {};
        
        p.x = config.x || 0;
        p.y = config.y || 0;
        p.vx = config.vx || 0;
        p.vy = config.vy || 0;
        p.size = config.size || 5;
        p.startSize = p.size;
        p.life = config.life || 60;
        p.maxLife = p.life;
        p.color = config.color || '#fff';
        p.colors = config.colors || null; // Array for transition
        p.type = config.type || 'generic';
        p.alpha = config.alpha !== undefined ? config.alpha : 1.0;
        p.drag = config.drag || 0.98;
        p.gravity = config.gravity || 0;
        p.bloom = config.bloom || false;
        p.rotation = Math.random() * Math.PI * 2;
        p.rv = (Math.random() - 0.5) * 0.1;

        this.particles.push(p);
        return p;
    }

    /**
     * Spawns an explosion burst of particles
     */
    burst(x, y, count, typeKey, speedRange = [2, 10]) {
        const config = this.TYPES[typeKey] || this.TYPES.SPARK;
        
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
            const size = config.size[0] + Math.random() * (config.size[1] - config.size[0]);
            const life = config.life[0] + Math.random() * (config.life[1] - config.life[0]);
            
            this.spawn({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size,
                life,
                color: config.color[0],
                colors: config.color,
                drag: config.drag,
                gravity: config.gravity,
                alpha: config.alpha[0],
                bloom: typeKey === 'BLOOM'
            });
        }
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.life -= dt;
            if (p.life <= 0) {
                this.pool.push(this.particles.splice(i, 1)[0]);
                continue;
            }

            // Physics
            p.vx *= Math.pow(p.drag, dt);
            p.vy *= Math.pow(p.drag, dt);
            p.vy += p.gravity * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rotation += p.rv * dt;

            // Property Transitions
            const progress = 1 - (p.life / p.maxLife);
            
            if (p.colors && p.colors.length > 1) {
                const colorIdx = Math.floor(progress * (p.colors.length - 1));
                p.color = p.colors[colorIdx];
            }

            // Soften alpha near end of life
            if (p.type === 'FIRE' || p.type === 'SMOKE') {
                p.alpha = (1 - progress) * (p.type === 'FIRE' ? 0.8 : 0.6);
                p.size = p.startSize * (1 + progress);
            } else {
                p.alpha = 1 - progress;
            }
        }
    }

    render(ctx) {
        const cam = this.game.camera || { x: 0, y: 0, zoom: 1 };
        const canvas = this.game.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        
        this.particles.forEach(p => {
            // Screen space conversion
            const sx = centerX + (p.x - cam.x) * cam.zoom;
            const sy = centerY + (p.y - cam.y) * cam.zoom;
            const size = p.size * cam.zoom;

            // Culling
            if (sx < -size || sx > canvas.width + size || sy < -size || sy > canvas.height + size) return;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;

            if (p.bloom) {
                ctx.shadowBlur = 15 * cam.zoom;
                ctx.shadowColor = p.color;
            }

            if (p.type === 'SPARK') {
                // Render as lines (motion blur)
                ctx.strokeStyle = p.color;
                ctx.lineWidth = size;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx - p.vx * 2 * cam.zoom, sy - p.vy * 2 * cam.zoom);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
                ctx.fill();
            }

            if (p.bloom) {
                ctx.shadowBlur = 0;
            }
        });

        ctx.restore();
    }
}

window.ParticleManager = ParticleManager;
