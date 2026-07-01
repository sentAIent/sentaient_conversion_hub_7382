/**
 * TrainingRenderer: Handles Phase 23 Volumetric Training Simulator visuals.
 * Phase 4 Modularization.
 */
class TrainingRenderer {
    constructor(renderManager) {
        this.rm = renderManager;
        this.game = renderManager.game;
    }

    draw(ctx, time) {
        this.renderTrainingGates(ctx, time);
        this.renderTrainingHUD(ctx, time);
    }

    renderTrainingHUD(ctx, time) {
        if (!this.game.playerShip || !this.game.trainingLesson) return;
        if (!this.game.trainingActive && !this.game.trainingBriefing && !this.game.trainingComplete) return;

        const lesson = this.game.trainingLesson;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        if (this.game.trainingBriefing) {
            this.drawBriefing(ctx, lesson, w, h);
            ctx.restore();
            return;
        }

        if (this.game.trainingComplete) {
            this.drawCompletion(ctx, lesson, w, h);
            ctx.restore();
            return;
        }

        // Active HUD
        this.drawActiveTrainingHUD(ctx, lesson, w, h, time);
        ctx.restore();
    }

    drawBriefing(ctx, lesson, w, h) {
        const elapsed = (performance.now() - this.game.trainingBriefingStart) / 1000;
        const fadeIn = Math.min(1, elapsed / 0.5);

        ctx.globalAlpha = fadeIn * 0.75;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        ctx.globalAlpha = fadeIn;
        const cardW = Math.min(500, w * 0.8);
        const cardH = 300;
        const cx = (w - cardW) / 2;
        const cy = (h - cardH) / 2;

        ctx.fillStyle = 'rgba(10, 22, 40, 0.95)';
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx, cy, cardW, cardH, 12);
        else ctx.rect(cx, cy, cardW, cardH);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = 'bold 32px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00f3ff';
        ctx.fillText(`${lesson.icon} ${lesson.name}`, w / 2, cy + 55);
        ctx.shadowBlur = 0;
        
        ctx.font = '15px "Exo 2", sans-serif';
        ctx.fillStyle = '#d0eeff';
        const lines = lesson.briefing.split('\n');
        lines.forEach((line, i) => {
            ctx.fillText(line, w / 2, cy + 120 + i * 24);
        });
    }

    drawCompletion(ctx, lesson, w, h) {
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1.0;

        const medalEmoji = this.game.trainingMedal === 'gold' ? '🥇' : this.game.trainingMedal === 'silver' ? '🥈' : '🥉';
        const medalColor = this.game.trainingMedal === 'gold' ? '#ffd700' : this.game.trainingMedal === 'silver' ? '#c0c0c0' : '#cd7f32';

        ctx.textAlign = 'center';
        ctx.font = '64px sans-serif';
        ctx.fillText(medalEmoji, w / 2, h / 2 - 60);

        ctx.font = 'bold 28px "Exo 2", sans-serif';
        ctx.fillStyle = medalColor;
        ctx.fillText('LESSON COMPLETE!', w / 2, h / 2);
    }

    drawActiveTrainingHUD(ctx, lesson, w, h, time) {
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.globalAlpha = 0.9;
        ctx.fillText(`${lesson.icon} ${lesson.name}`, w / 2, 35);

        ctx.font = 'bold 22px "Exo 2", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.game.trainingTimer.toFixed(1) + 's', w / 2, 60);
    }

    renderTrainingGates(ctx, time) {
        if (!this.game.playerShip || !this.game.trainingLesson) return;
        if (!this.game.trainingActive && !this.game.trainingComplete) return;
        const lesson = this.game.trainingLesson;

        lesson.gates.forEach((gate, index) => {
            if (gate.reached && lesson.id !== 'collection') return;

            const isCurrent = index === this.game.trainingGateIndex;
            ctx.save();
            ctx.translate(gate.x, gate.y);

            const pulse = isCurrent ? 1.0 + Math.sin(time * 0.05) * 0.08 : 1.0;
            const size = gate.size * pulse;

            let color = isCurrent ? '#00f3ff' : '#4466aa';
            let glowColor = isCurrent ? 'rgba(0,243,255,0.4)' : 'rgba(68,102,170,0.2)';

            ctx.globalAlpha = isCurrent ? 0.9 : 0.35;
            ctx.strokeStyle = color;
            ctx.lineWidth = isCurrent ? 6 : 3;
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.stroke();

            if (isCurrent) {
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
                this.rm.safeAddColorStop(grad, 0, 'rgba(0,243,255,0.15)');
                this.rm.safeAddColorStop(grad, 1, 'transparent');
                ctx.fillStyle = grad;
                ctx.fill();
            }

            ctx.font = `bold ${isCurrent ? 16 : 12}px "Exo 2", monospace`;
            ctx.textAlign = 'center';
            ctx.fillStyle = color;
            ctx.fillText(`G${index + 1}`, 0, size + 22);

            ctx.restore();
        });
    }
}

window.TrainingRenderer = TrainingRenderer;
