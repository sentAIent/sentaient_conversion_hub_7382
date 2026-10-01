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
        // Fallback for global entities if any remain
    }

    drawSector(ctx, sector, time) {
        if (sector.hazards) {
            this.renderMines(ctx, sector.hazards.mines || [], time);
            this.renderMissileBases(ctx, sector.hazards.turrets || [], time);
            this.renderStaticBlackHoles(ctx, sector.hazards.blackHoles || [], time);
        }
        
        // Global effects still stay in the main draw loop if they are triggered on the game instance
        if (this.game.hazardEffect) {
            if (this.game.hazardEffect.type === 'blackhole') {
                this.renderBlackHoleEffect(ctx, time);
            } else if (this.game.hazardEffect.type === 'supernova') {
                this.renderSupernovaEffect(ctx, time);
            }
        }
    }

    // renderHazards moved to drawSector logic

    renderMines(ctx, mines, time) {
        if (!mines || mines.length === 0) return;
        const center = this.game._cachedRotationCenter || (this.game.playerShip ? { x: this.game.playerShip.x, y: this.game.playerShip.y } : this.game.getConstellationCenter());
        const rotCenterX = center.x;
        const rotCenterY = center.y;

        mines.forEach(mine => {
            if (mine.flownOut) return;

            if (mine.hitFlash > 0) {
                mine.hitFlash--;
                const sz = mine.z || 0;
                const rotated = this.game.physicsManager.rotate3D(mine.x, mine.y, sz, rotCenterX, rotCenterY);

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                const size = (mine.size || mine.radius || 30) * rotated.scale;

                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            const sz = mine.z || 0;
            const rotated = this.game.physicsManager.rotate3D(mine.x, mine.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            ctx.save();
            ctx.translate(rx, ry);

            const pulse = Math.sin(time * 0.003 + (mine.pulsePhase || mine.pulseOffset || 0)) * 0.15 + 0.85;
            let size = (mine.size || mine.radius || 30) * pulse * rScale;
            
            // --- PHASE 30: RENDER STABILITY CLAMP ---
            const maxSize = Math.min(this.game.canvas.width, this.game.canvas.height) * 0.4;
            size = Math.min(size, maxSize);

            // OUTER ELECTROMAGNETIC FIELD
            const emPulse = (Math.sin(time * 0.006) + 1) * 0.5;
            for (let ring = 0; ring < 3; ring++) {
                const ringRadius = size * (3.5 + ring * 0.8);
                const ringAlpha = (0.3 - ring * 0.08) * emPulse;
                const ringPhase = time * 0.002 + ring * Math.PI / 3;

                ctx.strokeStyle = `rgba(255, 50, 20, ${ringAlpha})`;
                ctx.lineWidth = (4 - ring);
                ctx.setLineDash([(10 + ring * 5), (5 + ring * 3)]);
                ctx.lineDashOffset = -time * 0.1 * (ring + 1);
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, ringPhase, ringPhase + Math.PI * 1.8);
                ctx.stroke();
            }
            ctx.setLineDash([]);

            // DANGER AURA
            const dangerPulse = Math.sin(time * 0.008) * 0.4 + 0.6;
            const auraGrad = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size * 4.5, [
                { offset: 0, color: `rgba(255, 60, 0, ${0.9 * dangerPulse})` },
                { offset: 0.2, color: `rgba(200, 30, 0, ${0.6 * dangerPulse})` },
                { offset: 0.4, color: `rgba(150, 0, 0, ${0.3 * dangerPulse})` },
                { offset: 0.7, color: `rgba(80, 0, 20, ${0.15 * dangerPulse})` },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = auraGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 4.5, 0, Math.PI * 2);
            ctx.fill();

            // ADVANCED TECH OUTER SHELL
            ctx.save();
            ctx.rotate(time * 0.0008 + (mine.rotation || 0));

            ctx.fillStyle = '#1a0a0a';
            ctx.strokeStyle = '#660000';
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * size * 1.8;
                const y = Math.sin(angle) * size * 1.8;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            for (let i = 0; i < 6; i++) {
                const segAngle = (i / 6) * Math.PI * 2 + time * 0.001;
                const segPulse = Math.sin(time * 0.01 + i) * 0.2 + 0.8;

                ctx.fillStyle = `rgba(80, 20, 10, ${segPulse})`;
                ctx.beginPath();
                const innerR = size * 0.9;
                const outerR = size * 1.5;
                ctx.moveTo(Math.cos(segAngle) * innerR, Math.sin(segAngle) * innerR);
                ctx.lineTo(Math.cos(segAngle + 0.3) * outerR, Math.sin(segAngle + 0.3) * outerR);
                ctx.lineTo(Math.cos(segAngle + 0.52) * innerR, Math.sin(segAngle + 0.52) * innerR);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();

            // ENERGY SPIKES
            const spikeCount = 12;
            for (let i = 0; i < spikeCount; i++) {
                const spikeAngle = (i / spikeCount) * Math.PI * 2 + time * 0.0005;
                const spikePulse = Math.sin(time * 0.008 + i * 0.5) * 0.4 + 0.8;
                const spikeLen = size * (1.2 + spikePulse * 0.8);

                const grad = this.rm.getGradient(ctx, 'linear', 
                    Math.cos(spikeAngle) * size * 0.6,
                    Math.sin(spikeAngle) * size * 0.6,
                    Math.cos(spikeAngle) * spikeLen,
                    Math.sin(spikeAngle) * spikeLen, [
                    { offset: 0, color: 'rgba(255, 150, 50, 0.9)' },
                    { offset: 0.5, color: 'rgba(255, 80, 0, 0.7)' },
                    { offset: 1, color: 'rgba(255, 30, 0, 0.2)' }
                ]);

                ctx.strokeStyle = grad;
                ctx.lineWidth = (4 - i % 2 * 2);
                ctx.beginPath();
                ctx.moveTo(Math.cos(spikeAngle) * size * 0.6, Math.sin(spikeAngle) * size * 0.6);
                ctx.lineTo(Math.cos(spikeAngle) * spikeLen, Math.sin(spikeAngle) * spikeLen);
                ctx.stroke();
            }

            // INNER FLUID CORE
            const coreGrad = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size, [
                { offset: 0, color: '#ffffff' },
                { offset: 0.2, color: '#ffcc00' },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });
    }

    renderMissileBases(ctx, missileBases, time) {
        if (!missileBases || missileBases.length === 0) return;
        const center = this.game._cachedRotationCenter || (this.game.playerShip ? { x: this.game.playerShip.x, y: this.game.playerShip.y } : this.game.getConstellationCenter());

        missileBases.forEach(base => {
            const rotated = this.game.physicsManager.rotate3D(base.x, base.y, 0, center.x, center.y);
            let size = (base.size || 40) * rotated.scale;
            
            // --- PHASE 30: RENDER STABILITY CLAMP ---
            const maxSize = Math.min(this.game.canvas.width, this.game.canvas.height) * 0.4;
            size = Math.min(size, maxSize);
            const alertPulse = base.alertLevel > 0 ? Math.sin(time * 0.01) * 0.3 + 0.7 : 0.5;

            ctx.save();
            ctx.translate(rotated.x, rotated.y);

            if (base.hitFlash > 0) {
                base.hitFlash--;
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 30;
                ctx.beginPath();
                ctx.arc(0, 0, size * 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            // DANGER AURA GLOW (pulsing perimeter)
            let alertColor = base.alertLevel > 0.5 ? `rgba(255, 0, 0, ${0.3 * alertPulse})` : 'rgba(80, 100, 200, 0.15)';
            const auraGrad = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size * 2.8, [
                { offset: 0, color: alertColor },
                { offset: 0.5, color: 'rgba(40, 40, 120, 0.1)' },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = auraGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 2.8, 0, Math.PI * 2);
            ctx.fill();

            // SCANNING LASER (Atmospheric scifi effect)
            if (base.active && !base.damaged) {
                ctx.save();
                ctx.rotate(base.turretAngle || 0);
                const scanAngle = Math.sin(time * 0.002) * 0.2;
                const scanLen = size * 6;
                const scanGrad = this.rm.getGradient(ctx, 'linear', 0, 0, scanLen, 0, [
                    { offset: 0, color: `rgba(255, 0, 0, ${0.4 * alertPulse})` },
                    { offset: 1, color: 'transparent' }
                ]);
                ctx.strokeStyle = scanGrad;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(size * 1.5, 0);
                ctx.lineTo(Math.cos(scanAngle) * scanLen, Math.sin(scanAngle) * scanLen);
                ctx.stroke();
                ctx.restore();
            }

            // Base platform (octagonal military structure)
            ctx.save();
            ctx.rotate(base.rotationPhase || 0);

            // Outer ring (Octagon)
            ctx.fillStyle = base.damaged ? '#2a1a2e' : '#1a1a2e';
            ctx.strokeStyle = base.alertLevel > 0.5 ? '#ff3333' : '#4466aa';
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                ctx.lineTo(Math.cos(angle) * size * 1.5, Math.sin(angle) * size * 1.5);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Inner platform (Inner Octagon)
            ctx.fillStyle = base.damaged ? '#352545' : '#252545';
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
                ctx.lineTo(Math.cos(angle) * size * 0.9, Math.sin(angle) * size * 0.9);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Rotating turret (aims at player)
            ctx.save();
            ctx.rotate(base.turretAngle || 0);

            // Turret base
            ctx.fillStyle = base.damaged ? '#443355' : '#333355';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // RAILGUN BARREL ASSEMBLY
            const barrelLength = size * (base.damaged ? 1.4 : 1.8);
            const barrelWidth = size * 0.35;
            const recoil = base.recoil || 0;

            // Rails
            ctx.fillStyle = '#555566';
            ctx.fillRect(-size * 0.2 - recoil, -barrelWidth / 2, barrelLength, barrelWidth * 0.3);
            ctx.fillRect(-size * 0.3 - recoil, barrelWidth / 2 - barrelWidth * 0.3, barrelLength, barrelWidth * 0.3);

            // Barrel core energy glow (charged look)
            const chargeAlpha = 0.3 + (base.alertLevel > 0.8 ? 0.4 : 0);
            const chargeGrad = this.rm.getGradient(ctx, 'linear', 0, 0, barrelLength, 0, [
                { offset: 0, color: '#44aaff' },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = chargeGrad;
            ctx.globalAlpha = chargeAlpha;
            ctx.fillRect(0 - recoil, -barrelWidth * 0.1, barrelLength, barrelWidth * 0.2);
            ctx.globalAlpha = 1.0;

            // Muzzle Brake / Energy Gates
            for (let i = 0; i < 3; i++) {
                ctx.fillStyle = '#222';
                ctx.fillRect(size * 0.5 + i * size * 0.4 - recoil, -barrelWidth * 0.6, size * 0.15, barrelWidth * 1.2);
                // Gate glow
                if (base.alertLevel > 0.6) {
                    ctx.fillStyle = `rgba(255, 50, 50, ${alertPulse * 0.8})`;
                    ctx.fillRect(size * 0.5 + i * size * 0.4 - recoil + size * 0.05, -barrelWidth * 0.5, size * 0.05, barrelWidth * 1.0);
                }
            }

            ctx.restore();

            // Mutant green viscous sludge layer (rendered on top during damage/alert)
            if (base.damaged || base.alertLevel > 0.8) {
                ctx.save();
                const sludgeAlpha = 0.4 + Math.sin(time * 0.01) * 0.2;
                ctx.globalAlpha = sludgeAlpha;
                ctx.fillStyle = '#22ff44'; // Neon Green Sludge

                for (let i = 0; i < 6; i++) {
                    const blobAngle = (i / 6) * Math.PI * 2 + time * 0.002;
                    const blobDist = size * (0.6 + Math.sin(time * 0.005 + i) * 0.4);
                    const blobSize = size * (0.3 + Math.cos(time * 0.008 + i) * 0.2);

                    const bx = Math.cos(blobAngle) * blobDist;
                    const by = Math.sin(blobAngle) * blobDist;

                    ctx.beginPath();
                    ctx.arc(bx, by, blobSize, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Highlight
                    ctx.fillStyle = '#88ff88';
                    ctx.beginPath();
                    ctx.arc(bx - blobSize * 0.3, by - blobSize * 0.3, blobSize * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#22ff44';
                }
                ctx.restore();
            }

            ctx.restore();
        });
    }

    renderStaticBlackHoles(ctx, hazardBlackHoles, time) {
        if (!hazardBlackHoles || hazardBlackHoles.length === 0) return;
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();

        hazardBlackHoles.forEach(bh => {
            const rotated = this.game.physicsManager.rotate3D(bh.x, bh.y, bh.z || 0, center.x, center.y);
            let size = (bh.size || 100) * rotated.scale;
            
            // --- PHASE 30: RENDER STABILITY CLAMP ---
            const maxSize = Math.min(this.game.canvas.width, this.game.canvas.height) * 0.5;
            size = Math.min(size, maxSize);

            ctx.save();
            ctx.translate(rotated.x, rotated.y);

            // 1. OUTER GRAVITATIONAL DISTORTION (warped light aura)
            const distortGrad = this.rm.getGradient(ctx, 'radial', 0, 0, size * 0.3, 0, 0, size * 3.5, [
                { offset: 0, color: 'rgba(255, 255, 255, 0.4)' },
                { offset: 0.5, color: 'rgba(0, 243, 255, 0.1)' },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = distortGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 3.5, 0, Math.PI * 2);
            ctx.fill();

            // 2. PHOTON RING (Sharp bright edge just outside horizon)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.55, 0, Math.PI * 2);
            ctx.stroke();

            // 3. EVENT HORIZON (Absolute black)
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // 4. ACCRETION DISK (Whirling particles and light)
            if (bh.particleRings) {
                bh.particleRings.forEach((ring, i) => {
                    ctx.save();
                    ctx.rotate(time * 0.001 * (ring.speedMult || 1) + i);
                    ctx.scale(1.5, 0.4);
                    
                    const ringGrad = this.rm.getGradient(ctx, 'radial', 0, 0, size * 0.8, 0, 0, size * 1.5, [
                        { offset: 0, color: 'transparent' },
                        { offset: 0.5, color: 'rgba(0, 243, 255, 0.3)' },
                        { offset: 1, color: 'transparent' }
                    ]);
                    ctx.strokeStyle = ringGrad;
                    ctx.lineWidth = (ring.width || 4);
                    ctx.globalAlpha = 0.3 * rotated.scale;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 1.2, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                });
            }

            // 5. LIGHT TENDRILS (Gravitational Lensing / Spiral in-flow)
            ctx.globalCompositeOperation = 'screen';
            for (let tendril = 0; tendril < 12; tendril++) {
                const baseAngle = (tendril / 12) * Math.PI * 2;
                const spiralOffset = Math.sin(time * 0.002 + tendril * 0.5) * 0.5;
                const startAngle = baseAngle + spiralOffset;
                const endAngle = baseAngle + Math.PI * 0.4 + spiralOffset * 2;

                const outerR = size * (1.1 + Math.sin(time * 0.003 + tendril) * 0.2);
                const innerR = size * 0.35;

                const tendrilAlpha = 0.3 + Math.sin(time * 0.004 + tendril * 0.8) * 0.2;
                const hue = 200 + Math.sin(time * 0.001 + tendril) * 40;

                ctx.beginPath();
                ctx.moveTo(Math.cos(startAngle) * outerR, Math.sin(startAngle) * outerR);
                
                const ctrl1X = Math.cos(startAngle + 0.2) * outerR * 0.7;
                const ctrl1Y = Math.sin(startAngle + 0.2) * outerR * 0.7;
                const ctrl2X = Math.cos(endAngle - 0.3) * innerR * 1.5;
                const ctrl2Y = Math.sin(endAngle - 0.3) * innerR * 1.5;

                ctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, Math.cos(endAngle) * innerR, Math.sin(endAngle) * innerR);

                const lineGrad = this.rm.getGradient(ctx, 'linear', 
                    Math.cos(startAngle) * outerR, Math.sin(startAngle) * outerR,
                    Math.cos(endAngle) * innerR, Math.sin(endAngle) * innerR, [
                    { offset: 0, color: `hsla(${hue}, 80%, 70%, ${tendrilAlpha * 0.3})` },
                    { offset: 0.5, color: `hsla(${hue + 20}, 90%, 60%, ${tendrilAlpha})` },
                    { offset: 1, color: `hsla(${hue + 40}, 100%, 80%, ${tendrilAlpha * 0.8})` }
                ]);

                ctx.strokeStyle = lineGrad;
                ctx.lineWidth = (2 + Math.sin(time * 0.006 + tendril) * 2);
                ctx.stroke();
            }

            // 6. ACCRETION DISK (dynamic particles)
            if (bh.particleRings) {
                bh.particleRings.forEach(p => {
                    const accelFactor = 1 + (1 - (p.radius / 2)) * 2;
                    p.angle += p.speed * accelFactor;
                    const r = size * p.radius;
                    const x = Math.cos(p.angle) * r;
                    const y = Math.sin(p.angle) * r * 0.35; // Perspective tilt

                    const dopplerShift = Math.cos(p.angle) * 30;
                    const pHue = p.hue + dopplerShift;

                    ctx.fillStyle = `hsla(${pHue}, 100%, ${60 + p.brightness * 20}%, ${p.brightness * 0.8})`;
                    ctx.beginPath();
                    ctx.arc(x, y, (3 + p.brightness * 3), 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            // 4. EVENT HORIZON (The Blackness)
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // 5. PHOTON RING (Sharp edge of horizon)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();
        });
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

    // The secondary definition of drawSingularityGuardian removed to prevent conflicts
}

window.HazardRenderer = HazardRenderer;
