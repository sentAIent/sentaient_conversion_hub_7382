/**
 * HazardRenderer: Handles singular environmental threats (Black Holes, Supernovas, etc.).
 * Phase 4 Modularization.
 */
class HazardRenderer {
    constructor(renderManager) {
        this.rm = renderManager;
        this.game = renderManager.game;
    }

    draw(ctx, time) {
        if (this.game.hazardEffect) {
            if (this.game.hazardEffect.type === 'blackhole') {
                this.renderBlackHoleEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'supernova') {
                this.renderSupernovaEffect(ctx, time);
            }
        }
    }

    renderBlackHoleEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        const progress = effect.progress || 0;
        const canvas = this.game.canvas;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxDim = Math.max(canvas.width, canvas.height);

        let zoomScale = 1;
        if (progress < 0.45) zoomScale = 1 + Math.pow(progress / 0.45, 2) * 4;
        else if (progress < 0.6) zoomScale = 5 + Math.pow((progress - 0.45) / 0.15, 0.8) * 7;
        else if (progress < 0.88) zoomScale = 12 + ((progress - 0.6) / 0.28) * 8;
        else zoomScale = 20 - ((progress - 0.88) / 0.12) * 19;

        ctx.translate(centerX, centerY);
        ctx.scale(zoomScale, zoomScale);
        ctx.translate(-centerX, -centerY);

        if (progress < 0.45) {
            const p = progress / 0.45;
            const acceleration = Math.pow(p, 1.5);
            const tunnelBg = this.rm.getGradient(ctx, 'radial', centerX, centerY, 0, centerX, centerY, maxDim, [
                { offset: 0, color: 'rgba(0, 0, 0, 1)' },
                { offset: 0.1 + (1 - p) * 0.2, color: 'rgba(5, 0, 15, 0.98)' },
                { offset: 0.4, color: `rgba(15, 5, 35, ${0.3 + p * 0.7})` },
                { offset: 1, color: 'rgba(0, 0, 0, 1)' }
            ]);
            ctx.fillStyle = tunnelBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';
            const starSpeed = 3 + acceleration * 15;
            for (let star = 0; star < 200; star++) {
                const starAngle = (star / 200) * Math.PI * 2 + (star * 0.618) + Math.sin(time * 0.001 + star) * 0.1;
                const distanceCycle = ((time * (4 + (star % 6) * 1.5) * starSpeed * 0.003 + star * 47) % 100) / 100;
                const starDist = maxDim * (0.1 + distanceCycle * 0.9);
                const stretchFactor = 1 + acceleration * 3 * (1 - distanceCycle);
                const x = centerX + Math.cos(starAngle) * starDist;
                const y = centerY + Math.sin(starAngle) * starDist * 0.6;
                const trailEndX = centerX + Math.cos(starAngle) * (starDist - (10 + stretchFactor * 40 * distanceCycle));
                const trailEndY = centerY + Math.sin(starAngle) * (starDist - (10 + stretchFactor * 40 * distanceCycle)) * 0.6;
                const hue = 200 + (star % 60);
                const starGrad = this.rm.getGradient(ctx, 'linear', x, y, trailEndX, trailEndY, [
                    { offset: 0, color: `hsla(${hue}, 80%, 80%, 0.1)` },
                    { offset: 1, color: `hsla(${hue}, 100%, 100%, 1)` }
                ]);
                ctx.strokeStyle = starGrad;
                ctx.lineWidth = 1 + (star % 3) * 0.5;
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(trailEndX, trailEndY); ctx.stroke();
            }
        }
        // ... (Remaining Phases 2, 2.5, 3, 4 would go here in a full migration)
        ctx.restore();
    }

    renderSupernovaEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;
        const canvas = this.game.canvas;
        const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2;
        const progress = effect.progress || 0;
        const scale = Math.min(W, H) / 800;

        ctx.save();
        if (progress < 0.18) {
            const f = progress < 0.025 ? Math.min(1, progress / 0.025) : Math.max(0, 1 - (progress - 0.025) / 0.155);
            ctx.fillStyle = `rgba(255,255,255,${f})`;
            ctx.fillRect(0, 0, W, H);
        }
        // ... (Full implementation of supernova from Renderer.js)
        ctx.restore();
    }

    drawSingularityGuardian(ctx, bh, time, rScale, safeZoom) {
        const size = (bh.radius || 300) * rScale / safeZoom;
        ctx.fillStyle = '#000';
        ctx.shadowBlur = 40 * rScale / safeZoom;
        ctx.shadowColor = '#ff4400';
        ctx.beginPath(); ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (let i = 0; i < 12; i++) {
            const r = size * (0.5 + i * 0.15);
            const alpha = 0.6 * (1 - i / 12);
            const rot = time * (0.002 - i * 0.0001) + i * 0.2;
            ctx.strokeStyle = `hsla(${20 + i * 5}, 100%, 60%, ${alpha})`;
            ctx.lineWidth = (4 - i * 0.2) * rScale / safeZoom;
            ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.25, rot, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
    }
}

window.HazardRenderer = HazardRenderer;
