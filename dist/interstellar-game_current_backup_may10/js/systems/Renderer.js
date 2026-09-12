/**
 * RenderManager (Modular Orchestrator)
 * Delegates specialized rendering tasks to dedicated sub-renderers.
 */
class RenderManager {
    constructor(game) {
        this.game = game;
        this.gradientCache = new Map();
        this.spriteCache = new Map();
        this.frameId = 0;
        this.flashAlpha = 0;
        this.redAlertIntensity = 0; 
        this.ghostTrail = []; 
        this._lastCacheClear = Date.now();
        
        // Helper for defensive sub-renderer instantiation
        const safeInit = (ClassName, label) => {
            if (typeof window[ClassName] === 'function') {
                try {
                    return new window[ClassName](this);
                } catch (e) {
                    console.error(`❌ [Renderer] Failed to initialize ${label}:`, e);
                }
            } else {
                console.error(`❌ [Renderer] Sub-renderer class ${ClassName} not found on window.`);
            }
            return { draw: () => {} }; // Mock to prevent crashes
        };

        // Initialize sub-renderers (Modular Phase 1)
        this.celestial = safeInit('CelestialRenderer', 'Celestial');
        this.combat = safeInit('CombatRenderer', 'Combat');
        this.entity = safeInit('EntityRenderer', 'Entity');
        this.fx = safeInit('FXRenderer', 'FX');
        this.hazard = safeInit('HazardRenderer', 'Hazard');
        this.training = safeInit('TrainingRenderer', 'Training');
        this.constellation = safeInit('ConstellationRenderer', 'Constellation');
        
        this.initGlowSprites();
    }

    initGlowSprites() {
        const colors = {
            'player_bolt': '#00ffff',
            'ai_bolt': '#ff4444',
            'star_white': '#ffffff',
            'star_blue': '#99ccff',
            'star_red': '#ff6666',
            'plasma': '#00ff88',
            'spark': '#ffcc00'
        };
        const sizes = [4, 8, 16, 32, 64];

        for (const [name, color] of Object.entries(colors)) {
            for (const size of sizes) {
                const canvas = document.createElement('canvas');
                canvas.width = size * 2.5; 
                canvas.height = size * 2.5;
                const ctx = canvas.getContext('2d');
                const center = canvas.width / 2;
                const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
                
                // Use instance-level safety utility instead of prototype extension
                this.safeAddColorStop(grad, 0, color);
                this.safeAddColorStop(grad, 0.3, color + 'aa');
                this.safeAddColorStop(grad, 0.7, color + '22');
                this.safeAddColorStop(grad, 1, 'transparent');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(center, center, center, 0, Math.PI * 2);
                ctx.fill();
                this.spriteCache.set(`${name}_${size}`, canvas);
            }
        }
    }

    getGradient(ctx, type, ...params) {
        const stops = params.pop();
        const key = `${type}:${params.map((p, i) => {
            if (typeof p !== 'number') return p;
            return (i === 2 || i === 5) ? Math.round(p) : (Math.round(p * 2) / 2).toFixed(1);
        }).join(',')}:${stops.map(s => s.offset.toFixed(2) + s.color).join('|')}`;
        
        if (this.gradientCache.has(key)) return this.gradientCache.get(key);

        let grad;
        // NaN Sentry: Coerce non-finite parameters to 0 to prevent native method crash
        const safeParams = params.map(p => isFinite(p) ? p : 0);

        if (type === 'radial') {
            const [x0, y0, r0, x1, y1, r1] = safeParams;
            grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        } else {
            const [x0, y0, x1, y1] = safeParams;
            grad = ctx.createLinearGradient(x0, y0, x1, y1);
        }
        stops.forEach(s => this.safeAddColorStop(grad, s.offset, s.color));
        if (this.gradientCache.size > 500 || Date.now() - this._lastCacheClear > 30000) {
            this.gradientCache.clear();
            this._lastCacheClear = Date.now();
        }
        this.gradientCache.set(key, grad);
        return grad;
    }

    safeAddColorStop(grad, offset, color) {
        if (!grad || typeof grad.addColorStop !== 'function') return;
        const safeOffset = isFinite(offset) ? Math.max(0, Math.min(1, offset)) : 0;
        let safeColor = String(color);
        if (safeColor.includes('undefined') || safeColor.includes('NaN')) {
            safeColor = 'transparent';
        }
        try {
            grad.addColorStop(safeOffset, safeColor);
        } catch (e) {
            console.error(`[Renderer] addColorStop failed:`, e);
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

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [255, 255, 255];
    }

    // SUB-RENDERER DELEGATIONS
    renderAtomicShield(ctx, ship, time) { this.combat.renderAtomicShield(ctx, ship, time); }
    renderCombatVisuals(ctx) { this.combat.renderCombatVisuals(ctx); }
    renderSpaceBases(ctx, time) { this.entity.renderSpaceBases(ctx, time); }
    renderDrones(ctx, time) { this.entity.renderDrones(ctx, time); }
    renderMegaStructures(ctx, time) { this.entity.renderMegaStructures(ctx, time); }
    renderAIElements(ctx, time) { this.entity.renderAIElements(ctx, time); }
    renderTrainingGates(ctx) { this.training.renderTrainingGates(ctx, performance.now() * 0.002); }
    renderTrainingHUD(ctx) { this.training.renderTrainingHUD(ctx, performance.now() * 0.003); }
    renderPostEffects(ctx) { this.fx.renderPostEffects(ctx); }
    renderEdgeMarkers(ctx) { this.fx.renderEdgeMarkers(ctx); }
    renderFlashOverlay(ctx, alpha) { this.fx.renderFlashOverlay(ctx, alpha); }
    renderDimensionalCollapse(ctx, p) { this.fx.renderDimensionalCollapse(ctx, p); }
    renderDamageVignette(ctx) { this.fx.renderDamageVignette(ctx); }
    drawBackgroundElements() { /* Now handled by celestial.draw() in screen-space */ }
    renderNebulaHazards(ctx, time) { /* Nebulae now render in screen-space via celestial.draw() */ }
    drawWarpTunnel(ctx, time, intensity) { /* Placeholder for future warp effect */ }

    draw(time) {
        // --- SAFETY RECOVERY (Phase 25) ---
        if (typeof this.flashAlpha !== 'number' || isNaN(this.flashAlpha)) this.flashAlpha = 0;
        this.flashAlpha = Math.max(0, Math.min(1, this.flashAlpha));

        const ctx = this.game.ctx;
        if (!ctx) return;
        const canvas = this.game.canvas;
        if (!canvas) return;
        
        // 1. CLEAR
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. CELESTIAL BACKGROUND (Centered + Parallax)
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Restore Phase 18 Parallax (Distant objects move almost with ship)
        const parallaxFactor = 0.98;
        if (this.game.playerShip) {
            ctx.translate(-this.game.playerShip.x * parallaxFactor, -this.game.playerShip.y * parallaxFactor);
        }

        try {
            this.celestial.draw(ctx, time);
        } catch (e) { console.error("❌ [Renderer] Celestial Draw failure:", e); }
        ctx.restore();
        
        // 3. ENTITIES & EFFECTS (Transformed Space)
        ctx.save();
        const zoom = this.game.camera.zoom || 1;
        ctx.translate(canvas.width / 2 + this.game.camera.x, canvas.height / 2 + this.game.camera.y);
        ctx.scale(zoom, zoom);
        
        try {
            this.celestial.drawEntities(ctx, time);
        } catch (e) {
            console.error("❌ [Renderer] Celestial Entities failure:", e);
        }

        // Iterate through loaded sectors for modular rendering
        for (const sector of this.game.loadedSectors.values()) {
            try { this.entity.drawSector(ctx, sector, time); } catch (e) { console.error("❌ [Renderer] Entity sector failure:", e); }
            try { this.hazard.drawSector(ctx, sector, time); } catch (e) { console.error("❌ [Renderer] Hazard sector failure:", e); }
        }

        try { this.constellation.draw(ctx, time); } catch (e) { console.error("❌ [Renderer] Constellation failure:", e); }
        try { this.combat.draw(ctx, time); } catch (e) { console.error("❌ [Renderer] Combat failure:", e); }
        try { if (this.game.bossManager) this.game.bossManager.render(ctx); } catch (e) { console.error("❌ [Renderer] Boss failure:", e); }
        try { this.training.draw(ctx, time); } catch (e) { console.error("❌ [Renderer] Training failure:", e); }
        
        // 4. PLAYER SHIP (Integrated Phase 25) - Only render if in flight mode
        if (this.game.renderPlayerShip && this.game.flightMode) {
            try {
                // Ensure alpha is reset for the player ship
                ctx.globalAlpha = 1.0;
                this.game.renderPlayerShip(ctx, time);
            } catch (e) {
                console.error("❌ [Renderer] Player ship failure:", e);
            }
        }
        
        ctx.restore();
        
        try {
            this.fx.draw(ctx, time);
        } catch (e) {
            console.error("❌ [Renderer] FX failure:", e);
        }
    }

    drawStarShape(ctx, x, y, radius) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(x + radius * Math.cos(i * 4 * Math.PI / 5), y + radius * Math.sin(i * 4 * Math.PI / 5));
        }
        ctx.closePath();
        ctx.fill();
    }

    drawLightning(ctx, x, y, radius, zoom) {
        ctx.strokeStyle = 'rgba(200, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        let lx = x, ly = y;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        for (let i = 0; i < 5; i++) {
            lx += (Math.random() - 0.5) * radius * 0.4;
            ly += (Math.random() - 0.5) * radius * 0.4;
            ctx.lineTo(lx, ly);
        }
        ctx.stroke();
    }

    renderLegacyEntities(ctx, time, rotCenterX, rotCenterY, ship, viewDist) {
        // Fallback for entities not yet moved to EntityRenderer
        if (this.game.spaceMines) {
            this.game.spaceMines.forEach(mine => {
                if (mine.flownOut) return;
                const rotated = this.game.physicsManager.rotate3D(mine.x, mine.y, mine.z || 0, rotCenterX, rotCenterY);
                if (rotated.scale < 0.1) return;
                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                ctx.fillStyle = mine.hitFlash > 0 ? '#fff' : '#ff3300';
                ctx.beginPath();
                ctx.arc(0, 0, (mine.size || 5) * rotated.scale, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }
    }
    
    renderHazards(ctx, time) {
        this.hazard.draw(ctx, time);
    }
}

window.RenderManager = RenderManager;
