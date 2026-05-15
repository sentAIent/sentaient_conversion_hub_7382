class RenderManager {
    constructor(game) {
        this.game = game;
    }


    renderHazards(ctx, time) {
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const rotCenterX = center.x;
        const rotCenterY = center.y;

        // Render space mines - OMINOUS ADVANCED TECHNOLOGY DESIGN
        this.game.spaceMines.forEach(mine => {
            if (mine.flownOut) return;

            // Hit Flash Logic
            if (mine.hitFlash > 0) {
                mine.hitFlash--;
                const sz = mine.z || 0;
                const rotated = this.game.physicsManager.rotate3D(mine.x, mine.y, sz, rotCenterX, rotCenterY);

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
                const size = (mine.size || mine.radius || 30) * rotated.scale / safeZoom;

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

            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const pulse = Math.sin(time * 0.003 + (mine.pulsePhase || mine.pulseOffset || 0)) * 0.15 + 0.85;
            const size = (mine.size || mine.radius || 30) * pulse * rScale / safeZoom;

            // OUTER ELECTROMAGNETIC FIELD (pulsing energy barrier)
            const emPulse = (Math.sin(time * 0.006) + 1) * 0.5;
            for (let ring = 0; ring < 3; ring++) {
                const ringRadius = size * (3.5 + ring * 0.8);
                const ringAlpha = (0.3 - ring * 0.08) * emPulse;
                const ringPhase = time * 0.002 + ring * Math.PI / 3;

                ctx.strokeStyle = `rgba(255, 50, 20, ${ringAlpha})`;
                ctx.lineWidth = (4 - ring) / safeZoom;
                ctx.setLineDash([(10 + ring * 5), (5 + ring * 3)]);
                ctx.lineDashOffset = -time * 0.1 * (ring + 1);
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, ringPhase, ringPhase + Math.PI * 1.8);
                ctx.stroke();
            }
            ctx.setLineDash([]);

            // DANGER AURA (deep red-orange warning glow)
            const dangerPulse = Math.sin(time * 0.008) * 0.4 + 0.6;
            const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 4.5);
            auraGrad.addColorStop(0, `rgba(255, 60, 0, ${0.9 * dangerPulse})`);
            auraGrad.addColorStop(0.2, `rgba(200, 30, 0, ${0.6 * dangerPulse})`);
            auraGrad.addColorStop(0.4, `rgba(150, 0, 0, ${0.3 * dangerPulse})`);
            auraGrad.addColorStop(0.7, `rgba(80, 0, 20, ${0.15 * dangerPulse})`);
            auraGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = auraGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 4.5, 0, Math.PI * 2);
            ctx.fill();

            // ADVANCED TECH OUTER SHELL (hexagonal with rotating segments)
            ctx.save();
            ctx.rotate(time * 0.0008 + (mine.rotation || 0));

            // Outer hexagonal casing
            ctx.fillStyle = '#1a0a0a';
            ctx.strokeStyle = '#660000';
            ctx.lineWidth = 3 / safeZoom;
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

            // Inner rotating triangular segments (tech panels)
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

            // ENERGY SPIKES (radiating outward, threatening appearance)
            const spikeCount = 12;
            for (let i = 0; i < spikeCount; i++) {
                const spikeAngle = (i / spikeCount) * Math.PI * 2 + time * 0.0005;
                const spikePulse = Math.sin(time * 0.008 + i * 0.5) * 0.4 + 0.8;
                const spikeLen = size * (1.2 + spikePulse * 0.8);

                const grad = ctx.createLinearGradient(
                    Math.cos(spikeAngle) * size * 0.6,
                    Math.sin(spikeAngle) * size * 0.6,
                    Math.cos(spikeAngle) * spikeLen,
                    Math.sin(spikeAngle) * spikeLen
                );
                grad.addColorStop(0, 'rgba(255, 150, 50, 0.9)');
                grad.addColorStop(0.5, 'rgba(255, 80, 0, 0.7)');
                grad.addColorStop(1, 'rgba(255, 30, 0, 0.2)');

                ctx.strokeStyle = grad;
                ctx.lineWidth = (4 - i % 2 * 2) / safeZoom;
                ctx.beginPath();
                ctx.moveTo(Math.cos(spikeAngle) * size * 0.6, Math.sin(spikeAngle) * size * 0.6);
                ctx.lineTo(Math.cos(spikeAngle) * spikeLen, Math.sin(spikeAngle) * spikeLen);
                ctx.stroke();
            }

            // REACTOR CORE (pulsing plasma center)
            const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8);
            coreGrad.addColorStop(0, '#ffffff');
            coreGrad.addColorStop(0.15, '#ffffaa');
            coreGrad.addColorStop(0.3, '#ffcc00');
            coreGrad.addColorStop(0.5, '#ff6600');
            coreGrad.addColorStop(0.75, '#cc2200');
            coreGrad.addColorStop(1, '#440000');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
            ctx.fill();

            // INNER PLASMA SWIRL (nuclear reaction visual)
            ctx.save();
            ctx.rotate(-time * 0.003);
            ctx.globalCompositeOperation = 'screen';
            for (let arm = 0; arm < 3; arm++) {
                const armAngle = (arm / 3) * Math.PI * 2;
                const armGrad = ctx.createRadialGradient(
                    Math.cos(armAngle) * size * 0.2,
                    Math.sin(armAngle) * size * 0.2,
                    0,
                    0, 0, size * 0.5
                );
                armGrad.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
                armGrad.addColorStop(0.5, 'rgba(255, 200, 50, 0.4)');
                armGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = armGrad;
                ctx.beginPath();
                ctx.arc(Math.cos(armAngle) * size * 0.2, Math.sin(armAngle) * size * 0.2, size * 0.4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();

            // RADIATION WARNING SYMBOL (trilateral hazard indicator)
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3 / safeZoom;
            ctx.fillStyle = '#ffcc00';

            // Draw 3 radiation sectors
            for (let i = 0; i < 3; i++) {
                const sectAngle = (i / 3) * Math.PI * 2 - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, size * 0.35, sectAngle - 0.4, sectAngle + 0.4);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            // Center dot
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
            ctx.fill();

            // TECH DESIGNATION TEXT (military/sci-fi look)
            ctx.font = `bold ${Math.max(8, 12 / safeZoom)}px monospace`;
            ctx.fillStyle = 'rgba(255, 100, 50, 0.8)';
            ctx.textAlign = 'center';
            ctx.fillText('⚠ XN-7', 0, -size * 2.2);

            ctx.restore();
        });

        // Render hazard black holes - DYNAMIC CENTER WITH FOLDING LIGHT
        this.game.hazardBlackHoles.forEach(bh => {
            if (bh.flownOut) return;

            const sz = bh.z || 0;
            const rotated = this.game.physicsManager.rotate3D(bh.x, bh.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            ctx.save();
            ctx.translate(rx, ry);

            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const size = (bh.size || 100) * rScale / safeZoom;

            // OUTER GRAVITATIONAL DISTORTION (light being warped)
            const distortGrad = ctx.createRadialGradient(0, 0, size * 0.3, 0, 0, size * 2);
            distortGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
            distortGrad.addColorStop(0.3, 'rgba(20, 0, 40, 0.7)');
            distortGrad.addColorStop(0.6, 'rgba(40, 10, 80, 0.3)');
            distortGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = distortGrad;
            ctx.beginPath();
            ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
            ctx.fill();

            // LIGHT TENDRILS BEING PULLED IN (dynamic folding effect)
            ctx.globalCompositeOperation = 'screen';
            for (let tendril = 0; tendril < 16; tendril++) {
                const baseAngle = (tendril / 16) * Math.PI * 2;
                // Spiral effect - light curves inward
                const spiralOffset = Math.sin(time * 0.003 + tendril * 0.5) * 0.5;
                const startAngle = baseAngle + spiralOffset;
                const endAngle = baseAngle + Math.PI * 0.3 + spiralOffset * 2;

                const outerR = size * (1.0 + Math.sin(time * 0.004 + tendril) * 0.2);
                const innerR = size * 0.35;

                const tendrilAlpha = 0.4 + Math.sin(time * 0.005 + tendril * 0.8) * 0.2;
                const hue = 200 + Math.sin(time * 0.002 + tendril) * 40;

                // Draw curved light being pulled toward center
                ctx.beginPath();
                ctx.moveTo(Math.cos(startAngle) * outerR, Math.sin(startAngle) * outerR);

                // Bezier curve simulating gravitational bending
                const ctrl1X = Math.cos(startAngle + 0.2) * outerR * 0.7;
                const ctrl1Y = Math.sin(startAngle + 0.2) * outerR * 0.7;
                const ctrl2X = Math.cos(endAngle - 0.3) * innerR * 1.5;
                const ctrl2Y = Math.sin(endAngle - 0.3) * innerR * 1.5;

                ctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y,
                    Math.cos(endAngle) * innerR, Math.sin(endAngle) * innerR);

                const lineGrad = ctx.createLinearGradient(
                    Math.cos(startAngle) * outerR, Math.sin(startAngle) * outerR,
                    Math.cos(endAngle) * innerR, Math.sin(endAngle) * innerR
                );
                lineGrad.addColorStop(0, `hsla(${hue}, 80%, 70%, ${tendrilAlpha * 0.3})`);
                lineGrad.addColorStop(0.5, `hsla(${hue + 20}, 90%, 60%, ${tendrilAlpha})`);
                lineGrad.addColorStop(1, `hsla(${hue + 40}, 100%, 80%, ${tendrilAlpha * 0.8})`);

                ctx.strokeStyle = lineGrad;
                ctx.lineWidth = (3 + Math.sin(time * 0.008 + tendril) * 2) / safeZoom;
                ctx.stroke();
            }
            ctx.globalCompositeOperation = 'source-over';

            // ACCRETION DISK (enhanced spinning particles)
            ctx.globalCompositeOperation = 'screen';
            bh.particleRings.forEach(p => {
                // Particles accelerate as they get closer (Keplerian motion)
                const accelFactor = 1 + (1 - p.radius) * 2;
                p.angle += p.speed * accelFactor;
                const r = size * p.radius;
                const x = Math.cos(p.angle) * r;
                const y = Math.sin(p.angle) * r * 0.3; // Elliptical orbit

                // Doppler shifting - particles approaching are bluer, receding are redder
                const dopplerShift = Math.cos(p.angle) * 30;
                const particleHue = p.hue + dopplerShift;

                ctx.fillStyle = `hsla(${particleHue}, 100%, ${55 + p.brightness * 25}%, ${p.brightness * 0.9})`;
                ctx.beginPath();
                ctx.arc(x, y, (4 + p.brightness * 2) / safeZoom, 0, Math.PI * 2);
                ctx.fill();

                // Particle trail
                const trailLen = 3 + p.brightness * 2;
                for (let trail = 1; trail <= trailLen; trail++) {
                    const trailAngle = p.angle - trail * p.speed * 3;
                    const trailX = Math.cos(trailAngle) * r;
                    const trailY = Math.sin(trailAngle) * r * 0.3;
                    const trailAlpha = p.brightness * (1 - trail / trailLen) * 0.5;

                    ctx.fillStyle = `hsla(${particleHue}, 100%, 60%, ${trailAlpha})`;
                    ctx.beginPath();
                    ctx.arc(trailX, trailY, (2 + p.brightness) / safeZoom, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            ctx.globalCompositeOperation = 'source-over';

            // EVENT HORIZON (absolute black center)
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.38, 0, Math.PI * 2);
            ctx.fill();

            // DYNAMIC FOLDING CENTER LIGHT (the key improvement)
            ctx.globalCompositeOperation = 'screen';

            // Pulsating core glow that contracts rhythmically
            const corePulse = 0.7 + Math.sin(time * 0.006) * 0.15 + Math.sin(time * 0.011) * 0.1;
            const coreSize = size * 0.32 * corePulse;

            // Spiraling light rays being sucked inward
            for (let ray = 0; ray < 12; ray++) {
                const rayAngle = (ray / 12) * Math.PI * 2 + time * 0.004;
                const raySpeed = time * 0.008 + ray * 0.3;

                // Light folds in on itself - oscillating inward motion
                const foldPhase = (Math.sin(raySpeed) + 1) * 0.5;
                const rayOuterR = coreSize * (0.8 + foldPhase * 0.4);
                const rayInnerR = coreSize * (0.2 + (1 - foldPhase) * 0.3);

                const rayAlpha = 0.5 + Math.sin(time * 0.007 + ray) * 0.3;
                const rayHue = 180 + ray * 5 + Math.sin(time * 0.003) * 20;

                const rayGrad = ctx.createLinearGradient(
                    Math.cos(rayAngle) * rayOuterR, Math.sin(rayAngle) * rayOuterR,
                    Math.cos(rayAngle) * rayInnerR, Math.sin(rayAngle) * rayInnerR
                );
                rayGrad.addColorStop(0, `hsla(${rayHue}, 70%, 80%, ${rayAlpha * 0.2})`);
                rayGrad.addColorStop(0.4, `hsla(${rayHue + 30}, 80%, 70%, ${rayAlpha})`);
                rayGrad.addColorStop(1, `hsla(${rayHue + 60}, 100%, 95%, ${rayAlpha * 1.2})`);

                ctx.strokeStyle = rayGrad;
                ctx.lineWidth = (2 + Math.sin(time * 0.01 + ray * 0.5) * 1.5) / safeZoom;
                ctx.beginPath();
                ctx.moveTo(Math.cos(rayAngle) * rayOuterR, Math.sin(rayAngle) * rayOuterR);
                ctx.lineTo(Math.cos(rayAngle) * rayInnerR, Math.sin(rayAngle) * rayInnerR);
                ctx.stroke();
            }

            // Central pulsing singularity glow
            const singularityPulse = 0.6 + Math.sin(time * 0.008) * 0.2 + Math.cos(time * 0.013) * 0.15;
            const singularityGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreSize * 0.5);
            singularityGrad.addColorStop(0, `rgba(255, 255, 255, ${singularityPulse})`);
            singularityGrad.addColorStop(0.3, `rgba(180, 220, 255, ${singularityPulse * 0.7})`);
            singularityGrad.addColorStop(0.6, `rgba(100, 150, 255, ${singularityPulse * 0.4})`);
            singularityGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = singularityGrad;
            ctx.beginPath();
            ctx.arc(0, 0, coreSize * 0.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalCompositeOperation = 'source-over';

            // Gravitational lensing ring (photon sphere)
            const lensAlpha = 0.4 + Math.sin(time * 0.005) * 0.15;
            ctx.strokeStyle = `rgba(150, 200, 255, ${lensAlpha})`;
            ctx.lineWidth = 3 / safeZoom;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.52, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();
        });

        // === RENDER MISSILE BASES ===
        this.game.missileBases.forEach(base => {
            if (base.flownOut) return;
            const sz = base.z || 0;
            const rotated = this.game.physicsManager.rotate3D(base.x, base.y, sz, rotCenterX, rotCenterY);

            this.drawMissileBase(ctx, base, time, false, 0, rotated.x, rotated.y, rotated.scale);
        });

        // === RENDER HEAT-SEEKING MISSILES ===
        this.game.enemyMissiles.forEach(missile => {
            if (missile.flownOut) return;

            const sz = missile.z || 0;
            const rotated = this.game.physicsManager.rotate3D(missile.x, missile.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            ctx.save();

            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

            // Render trail first (behind missile)
            if (missile.trail) {
                missile.trail.forEach(p => {
                    const trailSZ = p.z || 0;
                    const trailRot = this.game.physicsManager.rotate3D(p.x, p.y, trailSZ, rotCenterX, rotCenterY);
                    const trailAlpha = (p.life / 20) * 0.8;
                    const trailSize = p.size * trailRot.scale / safeZoom;
                    
                    if (!Number.isFinite(trailRot.x) || !Number.isFinite(trailRot.y) || !Number.isFinite(trailSize) || trailSize <= 0) return;

                    const trailGrad = ctx.createRadialGradient(trailRot.x, trailRot.y, 0, trailRot.x, trailRot.y, trailSize);
                    trailGrad.addColorStop(0, `rgba(255, 150, 50, ${trailAlpha})`);
                    trailGrad.addColorStop(0.5, `rgba(255, 80, 0, ${trailAlpha * 0.5})`);
                    trailGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = trailGrad;
                    ctx.beginPath();
                    ctx.arc(trailRot.x, trailRot.y, trailSize, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            ctx.translate(rx, ry);
            ctx.rotate(missile.angle);

            const size = (missile.size || 5) * rScale / safeZoom;
            const lifeRatio = missile.life / missile.maxLife;

            // Missile body
            ctx.fillStyle = '#888899';
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(-size, -size * 0.4);
            ctx.lineTo(-size * 0.5, 0);
            ctx.lineTo(-size, size * 0.4);
            ctx.closePath();
            ctx.fill();

            // Red tip (heat-seeking sensor)
            ctx.fillStyle = '#ff3333';
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(size, -size * 0.25);
            ctx.lineTo(size, size * 0.25);
            ctx.closePath();
            ctx.fill();

            // Fins
            ctx.fillStyle = '#666677';
            // Top fin
            ctx.beginPath();
            ctx.moveTo(-size * 0.8, -size * 0.4);
            ctx.lineTo(-size * 1.2, -size * 0.8);
            ctx.lineTo(-size * 0.3, -size * 0.4);
            ctx.closePath();
            ctx.fill();
            // Bottom fin
            ctx.beginPath();
            ctx.moveTo(-size * 0.8, size * 0.4);
            ctx.lineTo(-size * 1.2, size * 0.8);
            ctx.lineTo(-size * 0.3, size * 0.4);
            ctx.closePath();
            ctx.fill();

            // Engine flame
            const flameFlicker = 0.7 + Math.random() * 0.3;
            const flameGrad = ctx.createLinearGradient(-size, 0, -size * 2.5 * flameFlicker, 0);
            flameGrad.addColorStop(0, `rgba(255, 255, 200, ${lifeRatio})`);
            flameGrad.addColorStop(0.3, `rgba(255, 150, 50, ${lifeRatio * 0.8})`);
            flameGrad.addColorStop(0.6, `rgba(255, 50, 0, ${lifeRatio * 0.5})`);
            flameGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = flameGrad;
            ctx.beginPath();
            ctx.moveTo(-size * 0.5, 0);
            ctx.lineTo(-size, -size * 0.3 * flameFlicker);
            ctx.lineTo(-size * 2.5 * flameFlicker, 0);
            ctx.lineTo(-size, size * 0.3 * flameFlicker);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        });

        // === RENDER DECOY FLARES ===
        this.game.decoyFlares.forEach(flare => {
            const sz = flare.z || 0;
            const rotated = this.game.physicsManager.rotate3D(flare.x, flare.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const size = (8 + Math.random() * 4) * rScale / safeZoom;
            const alpha = Math.min(1, flare.life / 30);

            if (!Number.isFinite(rx) || !Number.isFinite(ry) || !Number.isFinite(size) || size <= 0) return;

            // Inner core
            ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
            ctx.beginPath();
            ctx.arc(rx, ry, size * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Outer glow
            const glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, size * 2);
            glow.addColorStop(0, `rgba(255, 150, 50, ${alpha * 0.8})`);
            glow.addColorStop(0.5, `rgba(255, 80, 0, ${alpha * 0.4})`);
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(rx, ry, size * 2, 0, Math.PI * 2);
            ctx.fill();
        });

        // === RENDER ENEMY SHIPS ===
        this.game.enemyShips.forEach(enemy => {
            const typeDef = ENEMY_TYPES[enemy.type];
            const sz = enemy.z || 0;
            const rotated = this.game.physicsManager.rotate3D(enemy.x, enemy.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            if (!Number.isFinite(rx) || !Number.isFinite(ry) || !Number.isFinite(rScale) || rScale <= 0) return; ctx.save();
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const size = typeDef.size * rScale / safeZoom;

            ctx.translate(rx, ry);
            ctx.rotate(enemy.rotation);

            // === Faction Visuals ===
            const factionTypes = {
                xenon: { color: '#ff0000', glowColor: 'rgba(255, 0, 0, 0.6)' },
                mauler: { color: '#ffaa00', glowColor: 'rgba(255, 170, 0, 0.6)' },
                terran: { color: '#0088ff', glowColor: 'rgba(0, 136, 255, 0.6)' }
            };
            const activeColor = (enemy.faction && factionTypes[enemy.faction]) ? factionTypes[enemy.faction].color : typeDef.color;
            const activeGlow = (enemy.faction && factionTypes[enemy.faction]) ? factionTypes[enemy.faction].glowColor : typeDef.glowColor;

            // Hit flash effect
            const baseColor = enemy.hitFlash > 0 ? '#ffffff' : activeColor;

            // Engine glow
            const glowSize = size * 1.5;
            if (!Number.isFinite(glowSize) || glowSize <= 0) {
                ctx.restore();
                return;
            }
            const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
            glow.addColorStop(0, activeGlow);
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
            ctx.fill();

            // Ship body — aggressive triangle
            ctx.fillStyle = baseColor;
            ctx.shadowColor = activeColor;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);           // Nose
            ctx.lineTo(-size, -size * 0.8);       // Top wing
            ctx.lineTo(-size * 0.4, 0);           // Indent
            ctx.lineTo(-size, size * 0.8);        // Bottom wing
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;

            // Cockpit stripe
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.beginPath();
            ctx.moveTo(size * 0.8, 0);
            ctx.lineTo(size * 0.2, -size * 0.15);
            ctx.lineTo(size * 0.2, size * 0.15);
            ctx.closePath();
            ctx.fill();

            // Engine flame
            const flameLen = (0.5 + Math.random() * 0.4) * size;
            ctx.fillStyle = `rgba(255, 150, 50, 0.8)`;
            ctx.beginPath();
            ctx.moveTo(-size * 0.4, -size * 0.15);
            ctx.lineTo(-size * 0.4 - flameLen, 0);
            ctx.lineTo(-size * 0.4, size * 0.15);
            ctx.closePath();
            ctx.fill();

            ctx.restore();

            // Health bar (above ship, not rotated with ship)
            if (enemy.health < enemy.maxHealth) {
                const barWidth = size * 3;
                const barHeight = 4 / safeZoom;
                const barX = rx - barWidth / 2;
                const barY = ry - size * 2.5;
                const healthRatio = enemy.health / enemy.maxHealth;

                // Background
                ctx.fillStyle = 'rgba(0,0,0,0.6)';
                ctx.fillRect(barX, barY, barWidth, barHeight);
                // Health fill
                const barColor = healthRatio > 0.5 ? '#00ff44' : healthRatio > 0.25 ? '#ffaa00' : '#ff2222';
                ctx.fillStyle = barColor;
                ctx.fillRect(barX, barY, barWidth * healthRatio, barHeight);
                // Border
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.strokeRect(barX, barY, barWidth, barHeight);
            }

            // State indicator (tiny dot above health bar)
            const indicatorY = ry - size * 3;
            ctx.fillStyle = enemy.state === 'attack' ? '#ff0000' :
                enemy.state === 'chase' ? '#ffaa00' :
                    enemy.state === 'flee' ? '#00ffff' : '#44ff44';
            ctx.beginPath();
            ctx.arc(rx, indicatorY, 3 / safeZoom, 0, Math.PI * 2);
            ctx.fill();
        });

        // === RENDER ENEMY BULLETS ===
        this.game.enemyBullets.forEach(b => {
            const sz = b.z || 0;
            const rotated = this.game.physicsManager.rotate3D(b.x, b.y, sz, rotCenterX, rotCenterY);
            const rScale = rotated.scale;
            if (!Number.isFinite(rotated.x) || !Number.isFinite(rotated.y) || !Number.isFinite(rScale) || rScale <= 0) return;
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            ctx.rotate(b.rotation);

            const len = b.length * rotated.scale / safeZoom;
            const w = b.width * rotated.scale / safeZoom;

            // Glow
            ctx.shadowColor = b.color;
            ctx.shadowBlur = 10;
            // Bolt
            ctx.strokeStyle = b.color;
            ctx.lineWidth = w;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(-len / 2, 0);
            ctx.lineTo(len / 2, 0);
            ctx.stroke();
            // Core
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = w * 0.4;
            ctx.beginPath();
            ctx.moveTo(-len / 2, 0);
            ctx.lineTo(len / 2, 0);
            ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.restore();
        });

        // === RENDER BOSS ===
        if (this.game.activeBoss) {
            const boss = this.game.activeBoss;
            const typeDef = BOSS_TYPES[boss.type];
            const sz = boss.z || 0;
            const rotated = this.game.physicsManager.rotate3D(boss.x, boss.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            if (!Number.isFinite(rx) || !Number.isFinite(ry) || !Number.isFinite(rScale) || rScale <= 0) return; ctx.save();
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
            const size = typeDef.size * rScale / safeZoom;
            const baseColor = boss.hitFlash > 0 ? '#ffffff' : typeDef.color;

            ctx.translate(rx, ry);
            ctx.rotate(boss.rotation);

            // Boss aura / glow
            const auraSize = size * 2.5;
            const aura = ctx.createRadialGradient(0, 0, size * 0.5, 0, 0, auraSize);
            aura.addColorStop(0, typeDef.glowColor);
            aura.addColorStop(0.5, typeDef.glowColor.replace('0.7', '0.2'));
            aura.addColorStop(1, 'transparent');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(0, 0, auraSize, 0, Math.PI * 2);
            ctx.fill();

            // Boss body — larger, more angular
            ctx.fillStyle = baseColor;
            ctx.shadowColor = typeDef.color;
            ctx.shadowBlur = 25;
            ctx.beginPath();
            ctx.moveTo(size * 2, 0);                // Nose
            ctx.lineTo(size * 0.5, -size * 0.6);    // Upper hull
            ctx.lineTo(-size * 1.2, -size * 1.2);   // Top wing tip
            ctx.lineTo(-size * 0.6, -size * 0.3);   // Wing joint
            ctx.lineTo(-size * 0.8, 0);             // Rear indent
            ctx.lineTo(-size * 0.6, size * 0.3);    // Wing joint
            ctx.lineTo(-size * 1.2, size * 1.2);    // Bottom wing tip
            ctx.lineTo(size * 0.5, size * 0.6);     // Lower hull
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;

            // Engine flames (twin)
            const fLen = (0.6 + Math.random() * 0.4) * size;
            ctx.fillStyle = 'rgba(255, 100, 50, 0.8)';
            ctx.beginPath();
            ctx.moveTo(-size * 0.7, -size * 0.2);
            ctx.lineTo(-size * 0.7 - fLen, 0);
            ctx.lineTo(-size * 0.7, size * 0.2);
            ctx.closePath();
            ctx.fill();

            // Dreadnought shield arc
            if (boss.type === 'dreadnought') {
                ctx.strokeStyle = boss.phase === 2 ? 'rgba(255,100,100,0.6)' : 'rgba(100,200,255,0.6)';
                ctx.lineWidth = 4 / safeZoom;
                ctx.beginPath();
                ctx.arc(0, 0, size * 2, -Math.PI / 3, Math.PI / 3);
                ctx.stroke();
                // Shield shimmer
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 2 / safeZoom;
                ctx.beginPath();
                ctx.arc(0, 0, size * 2 + 2, -Math.PI / 4, Math.PI / 4);
                ctx.stroke();
            }

            // Hive Queen pulsing organic glow
            if (boss.type === 'hivequeen') {
                const pulse = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
                ctx.fillStyle = `rgba(68, 255, 68, ${pulse * 0.3})`;
                ctx.beginPath();
                ctx.arc(0, 0, size * 1.8, 0, Math.PI * 2);
                ctx.fill();
            }

            // Void Reaper dark energy tendrils
            if (boss.type === 'voidreaper') {
                const time = Date.now() * 0.003;
                ctx.strokeStyle = 'rgba(153, 68, 255, 0.4)';
                ctx.lineWidth = 2 / safeZoom;
                for (let i = 0; i < 4; i++) {
                    const tAngle = time + (i * Math.PI / 2);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.quadraticCurveTo(
                        Math.cos(tAngle) * size * 1.5,
                        Math.sin(tAngle) * size * 1.5,
                        Math.cos(tAngle + 0.5) * size * 2.5,
                        Math.sin(tAngle + 0.5) * size * 2.5
                    );
                    ctx.stroke();
                }
            }

            ctx.restore();

            // === BOSS HEALTH BAR (top of screen) ===
            const barWidth = 400;
            const barHeight = 14;
            const barX = (ctx.canvas.width - barWidth) / 2;
            const barY = 20;
            const hpRatio = boss.health / boss.maxHealth;

            // Background
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
            // Health fill
            const hpColor = hpRatio > 0.5 ? typeDef.color : '#ff4400';
            ctx.fillStyle = hpColor;
            ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);
            // Border
            ctx.strokeStyle = typeDef.color;
            ctx.lineWidth = 1;
            ctx.strokeRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
            // Name
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Orbitron, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`⚠ ${typeDef.name.toUpperCase()} ${boss.phase === 2 ? '(ENRAGED)' : ''}`, ctx.canvas.width / 2, barY - 6);
            // HP text
            ctx.fillStyle = '#cccccc';
            ctx.font = '10px Orbitron, monospace';
            ctx.fillText(`${boss.health} / ${boss.maxHealth}`, ctx.canvas.width / 2, barY + barHeight + 14);
            ctx.textAlign = 'left';
        }

        // Mission tracking is now handled via HTML floating window updateMissionHUD()

    }


    draw(rawTime) {
        const { ctx, canvas } = this;
        // Safety: Ensure time is ALWAYS a valid number to prevent NaN in sin/cos calculations
        const time = typeof rawTime === 'number' ? rawTime : performance.now();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = this.game.config.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Static Background Stars (Screen Space)
        if (this.game.config.showBackground) {
            const paraX = this.game.camera.x * 0.05;
            const paraY = this.game.camera.y * 0.05;

            try {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
                const time = performance.now() / 1000;

                this.game.staticStars.forEach(s => {
                    // Safety check for required properties
                    if (typeof s.x !== 'number' || typeof s.y !== 'number') return;

                    let sx = (s.x + paraX) % canvas.width;
                    let sy = (s.y + paraY) % canvas.height;
                    if (sx < 0) sx += canvas.width;
                    if (sy < 0) sy += canvas.height;

                    // Ensure we have valid values
                    const vx = typeof s.vx === 'number' ? s.vx : 0;
                    const vy = typeof s.vy === 'number' ? s.vy : 0;
                    const size = s.r || s.size || 1; // Use 'r' if available (matches generation)
                    const starColor = s.color || '#ffffff';

                    // Parse star color for gradient manipulation
                    let r = 255, g = 255, b = 255;
                    try {
                        if (starColor.startsWith('#')) {
                            const hex = starColor.slice(1);
                            // Use ?? instead of || to preserve 0 values (0 is valid for RGB!)
                            const parsedR = parseInt(hex.substr(0, 2), 16);
                            const parsedG = parseInt(hex.substr(2, 2), 16);
                            const parsedB = parseInt(hex.substr(4, 2), 16);
                            r = isNaN(parsedR) ? 255 : parsedR;
                            g = isNaN(parsedG) ? 255 : parsedG;
                            b = isNaN(parsedB) ? 255 : parsedB;
                        }
                    } catch (e) { /* use defaults */ }

                    if (this.game.bgWarpMode && !this.game.bgDriftMode) {
                        // ====== LIGHTSPEED: Moving stars with trailing streaks ======
                        const dx = sx - centerX;
                        const dy = sy - centerY;
                        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

                        if (distFromCenter < 3) return; // Skip center stars

                        // Warp intensity - already curved via setWarpSpeedMultiplier
                        const warpIntensity = this.game.warpSpeed || 0;
                        const sliderValue = this.game.warpSpeedMultiplier || 1;

                        // Streak length varies by depth - deeper stars = longer streaks
                        // Low slider = short rays, high slider = dramatic but not overwhelming
                        const perspFactor = distFromCenter / maxDist;
                        const depthFactor = s.depth || 0.5;
                        // Use sqrt for diminishing returns, depth multiplier for parallax
                        const lengthFactor = Math.sqrt(sliderValue) * 14 * depthFactor;
                        const streakLength = 5 + lengthFactor * (2 + perspFactor * 12);
                        // Cap max streak length - varies by depth
                        const cappedStreak = Math.min(streakLength, 1680 * depthFactor);

                        // Direction OUTWARD from center (streak trails BEHIND moving star)
                        const dirOutX = dx / distFromCenter;
                        const dirOutY = dy / distFromCenter;

                        // HEAD is at current position (leading edge, flying outward)
                        // TAIL is behind (toward center, where star came from)
                        const headX = sx;
                        const headY = sy;
                        const tailX = sx - dirOutX * cappedStreak;
                        const tailY = sy - dirOutY * cappedStreak;

                        // Alpha: cap to prevent white-out, scale with intensity
                        // Lower alpha at high speeds = more visible individual rays
                        const baseAlpha = s.alpha || 0.2;
                        const intensityBoost = Math.min(0.4, warpIntensity * 0.15);
                        const alpha = Math.min(0.65, baseAlpha + intensityBoost);
                        ctx.globalAlpha = alpha;

                        if (cappedStreak > 2) {
                            try {
                                // === GRADIENT: Use star's actual color throughout ===
                                const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
                                grad.addColorStop(0, 'transparent'); // Tail fades
                                grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, 0.2)`);
                                grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.6)`);
                                // Bright head - boost luminosity but keep the hue
                                const brightR = Math.min(255, r + 40);
                                const brightG = Math.min(255, g + 40);
                                const brightB = Math.min(255, b + 40);
                                grad.addColorStop(1, `rgba(${brightR}, ${brightG}, ${brightB}, 1)`);

                                // Main streak - line width matches star diameter (size * 2)
                                ctx.strokeStyle = grad;
                                // Base width should be diameter (size * 2). add intensity.
                                const lineW = Math.max(0.6, Math.min(6, size * 2.0 + warpIntensity * 0.06));
                                ctx.lineWidth = lineW;
                                ctx.lineCap = 'round';
                                ctx.beginPath();
                                ctx.moveTo(tailX, tailY);
                                ctx.lineTo(headX, headY);
                                ctx.stroke();

                                // Bright core at head - USE STAR COLOR, not white!
                                if (cappedStreak > 15) {
                                    // Brighter version of star's color for the core
                                    const coreR = Math.min(255, r + 80);
                                    const coreG = Math.min(255, g + 80);
                                    const coreB = Math.min(255, b + 80);
                                    ctx.strokeStyle = `rgba(${coreR}, ${coreG}, ${coreB}, 0.85)`;
                                    ctx.lineWidth = Math.max(0.4, size * 0.3);
                                    ctx.globalAlpha = alpha * 0.9;
                                    ctx.beginPath();
                                    const coreLen = Math.min(cappedStreak * 0.12, 30);
                                    const coreX = headX - dirOutX * coreLen;
                                    const coreY = headY - dirOutY * coreLen;
                                    ctx.moveTo(coreX, coreY);
                                    ctx.lineTo(headX, headY);
                                    ctx.stroke();
                                }
                            } catch (e) {
                                ctx.strokeStyle = starColor;
                                ctx.lineWidth = size;
                                ctx.beginPath();
                                ctx.moveTo(tailX, tailY);
                                ctx.lineTo(headX, headY);
                                ctx.stroke();
                            }
                        }

                        // Bright head point - smaller at high speeds - USE STAR COLOR
                        ctx.globalAlpha = Math.min(0.9, alpha + 0.2);
                        // Use bright version of star's color instead of white
                        const headR = Math.min(255, r + 100);
                        const headG = Math.min(255, g + 100);
                        const headB = Math.min(255, b + 100);
                        ctx.fillStyle = `rgb(${headR}, ${headG}, ${headB})`;
                        ctx.beginPath();
                        const headSize = Math.max(0.5, Math.min(1.2, size * 0.4));
                        ctx.arc(headX, headY, headSize, 0, Math.PI * 2);
                        ctx.fill();


                    } else if (this.game.bgDriftMode && !this.game.bgWarpMode) {
                        // ====== SIMPLE DRIFT - Stars just float gently ======
                        ctx.globalAlpha = s.alpha || 0.5;
                        ctx.fillStyle = starColor;
                        ctx.beginPath();
                        ctx.arc(sx, sy, size, 0, Math.PI * 2);
                        ctx.fill();

                    } else {
                        // === NORMAL MODE: Simple colored dot ===
                        ctx.globalAlpha = s.alpha || 0.5;
                        ctx.fillStyle = starColor;
                        ctx.beginPath();
                        ctx.arc(sx, sy, size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            } catch (renderError) {
                console.error('[BG Error] Star rendering failed:', renderError);
            }

            // ====== SHOOTING STARS (Normal mode only) ======
            if (!this.game.bgWarpMode && !this.game.bgDriftMode) {
                const now = performance.now();

                // Spawn new shooting star every 2-6 seconds
                if (now - this.game.lastShootingStarTime > 2000 + Math.random() * 4000) {
                    this.game.lastShootingStarTime = now;
                    const colors = this.game.starColors || ['#ffffff', '#aaddff', '#ffddaa'];

                    // Start from random edge
                    const edge = Math.floor(Math.random() * 4);
                    let startX, startY, angle;

                    if (edge === 0) { // Top
                        startX = Math.random() * canvas.width;
                        startY = -10;
                        angle = Math.PI * 0.25 + Math.random() * Math.PI * 0.5;
                    } else if (edge === 1) { // Right
                        startX = canvas.width + 10;
                        startY = Math.random() * canvas.height;
                        angle = Math.PI * 0.75 + Math.random() * Math.PI * 0.5;
                    } else if (edge === 2) { // Bottom
                        startX = Math.random() * canvas.width;
                        startY = canvas.height + 10;
                        angle = -Math.PI * 0.25 - Math.random() * Math.PI * 0.5;
                    } else { // Left
                        startX = -10;
                        startY = Math.random() * canvas.height;
                        angle = -Math.PI * 0.25 + Math.random() * Math.PI * 0.5;
                    }

                    this.game.shootingStarsActive.push({
                        x: startX,
                        y: startY,
                        vx: Math.cos(angle) * (8 + Math.random() * 12),
                        vy: Math.sin(angle) * (8 + Math.random() * 12),
                        size: 1.5 + Math.random() * 1.5,
                        tailLength: 30 + Math.random() * 50,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        life: 1.0
                    });
                }

                // Update and draw shooting stars
                this.game.shootingStarsActive = this.game.shootingStarsActive.filter(star => {
                    star.x += star.vx;
                    star.y += star.vy;
                    star.life -= 0.01;

                    if (star.life <= 0 || star.x < -100 || star.x > canvas.width + 100 ||
                        star.y < -100 || star.y > canvas.height + 100) {
                        return false; // Remove
                    }

                    // Draw shooting star with tail
                    const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
                    const dirX = -star.vx / speed;
                    const dirY = -star.vy / speed;
                    const tailX = star.x + dirX * star.tailLength;
                    const tailY = star.y + dirY * star.tailLength;

                    ctx.globalAlpha = star.life * 0.8;
                    ctx.strokeStyle = star.color;
                    ctx.lineWidth = star.size;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY);
                    ctx.lineTo(star.x, star.y);
                    ctx.stroke();

                    // Bright head
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 1.2, 0, Math.PI * 2);
                    ctx.fill();

                    return true; // Keep
                });
            }

            ctx.globalAlpha = 1.0;


        }

        // 0. Draw Background Layers with Parallax (DECOUPLED FROM WORLD TRANSFORM)
        // Backgrounds (galaxies, nebulae, faint stars) should move slower than the player
        // and zoom less intensely to create a sense of vast distance.
        const backgroundParallax = 0.98; // 0.98 means moves at 2% of player speed (near static)
        const zoomParallax = 0.3; // 1.0 = full zoom, 0.0 = no zoom effect on backgrounds
        const pZoom = 1 + (this.game.camera.zoom - 1) * zoomParallax;

        ctx.save();
        // Background Field Centering: Always relative to screen center
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(pZoom, pZoom);

        // Apply parallax translation based on SHIP position
        // backgroundParallax (0.98) means it moves at 98% of world speed.
        const driftX = Math.sin(time / 5000) * 20;
        const driftY = Math.cos(time / 7000) * 20;
        ctx.translate(
            -(this.game.playerShip.x * backgroundParallax + driftX),
            -(this.game.playerShip.y * backgroundParallax + driftY)
        );

        // Always draw background stars and nebulae if they exist
        this.drawBackgroundElements();
        ctx.restore();

        // World Transform (For interactive game objects)
        ctx.save();
        ctx.translate(canvas.width / 2 + this.game.camera.x, canvas.height / 2 + this.game.camera.y);
        ctx.scale(this.game.camera.zoom, this.game.camera.zoom);

        // Draw deep space specific elements (galaxies, black holes, planets) in world space
        if (this.game.activeStyles.has('deep-space')) this.drawDeepSpaceSpecific();

        // Calculations & Cluster ID Assignment
        const { lines, clusters } = this.game.refreshClusterAssignments();

        // 1. Draw Grid Lines (Glow Pass + Core Pass) with 3D rotation
        if (lines.length > 0) {
            ctx.lineCap = 'round';
            ctx.shadowBlur = 10;

            // Rotation center - use cached if available (during star placement)
            const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
            const rotCenterX = center.x;
            const rotCenterY = center.y;
            const rotCenterZ = center.z || 0;

            lines.forEach(l => {
                const alpha = Math.max(0, 1 - (l.dist / this.game.config.maxConnectDist));
                const starColor = this.game.getStarColor(l.s1);
                const [r, g, b] = this.game.hexToRgb(starColor);

                // Apply 3D rotation
                const s1z = l.s1.z || 0;
                const s2z = l.s2.z || 0;
                const p1 = this.game.physicsManager.rotate3D(l.s1.x, l.s1.y, s1z, rotCenterX, rotCenterY);
                const p2 = this.game.physicsManager.rotate3D(l.s2.x, l.s2.y, s2z, rotCenterX, rotCenterY);

                ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
                ctx.lineWidth = 3 / this.game.camera.zoom;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            });
            ctx.shadowBlur = 0;

            lines.forEach(l => {
                const alpha = Math.max(0, 1 - (l.dist / this.game.config.maxConnectDist));
                const starColor = this.game.getStarColor(l.s1);

                // Apply 3D rotation
                const s1z = l.s1.z || 0;
                const s2z = l.s2.z || 0;
                const p1 = this.game.physicsManager.rotate3D(l.s1.x, l.s1.y, s1z, rotCenterX, rotCenterY);
                const p2 = this.game.physicsManager.rotate3D(l.s2.x, l.s2.y, s2z, rotCenterX, rotCenterY);

                ctx.strokeStyle = starColor;
                ctx.globalAlpha = alpha * 0.8;
                ctx.lineWidth = 1 / this.game.camera.zoom;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            });
            ctx.globalAlpha = 1.0;
        }

        // 6. Draw Text Labels
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 ${14 / this.game.camera.zoom}px 'Exo 2'`;

        clusters.forEach(c => {
            // Only draw names for clusters that meet the minimum size threshold AND have a generated name
            const name = String(c[0].clusterId);
            if (c.length < this.game.config.minGroupSize || name === String(c[0].id)) return;

            // Centroid Calculation
            let cx = 0, cy = 0;
            c.forEach(s => { cx += s.x; cy += s.y; });
            cx /= c.length; cy /= c.length;

            const avgColor = this.game.getStarColor(c[0]);

            // Draw Text Label
            ctx.fillStyle = avgColor;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 4;
            ctx.fillText(name, cx, cy + (30 / this.game.camera.zoom));
            ctx.shadowBlur = 0;
        });

        // 7. Draw Stars with 3D rotation
        const timeNow = performance.now();
        // Use cached rotation center if available (during star placement), otherwise calculate
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const rotCenterX = center.x;
        const rotCenterY = center.y;
        // Note: we just pass centerX/Y as pivot, Z pivot is implicitly handled by rotate3D logic relative to 0? 
        // Wait, rotate3D logic (let pz = z) rotates AROUND (centerX, centerY, 0).
        // If the constellation center has Z != 0, we should translate Z too?
        // Ideally: let pz = z - (center.z || 0);
        // Let's rely on the definition where we pass Z.

        this.game.stars.forEach(s => {
            if (s.flownOut) return; // Skip if flown out during warp

            ctx.save();

            // Apply disengage warp values
            let wScale = 1.0;
            let wAlpha = 1.0;
            if (this.game.warpDisengaging && s.warpScale !== undefined) {
                wScale = s.warpScale;
                wAlpha = s.warpAlpha !== undefined ? s.warpAlpha : 1.0;
            }

            const isHover = (s === this.game.hoveredStar);

            // Apply 3D rotation
            const sz = s.z || 0;
            const rotated = this.game.physicsManager.rotate3D(s.x, s.y, sz, rotCenterX, rotCenterY);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;

            const twinkle = Math.sin(timeNow * 0.003 + s.phase) * 0.2 + 0.8;
            const scale = isHover ? 1.5 : 1.0;
            const radius = this.game.config.starBaseRad * twinkle * scale * rScale * wScale / this.game.camera.zoom;
            const starColor = this.game.getStarColor(s);
            const [r, g, b] = this.game.hexToRgb(starColor);

            // Apply transparency
            ctx.globalAlpha = wAlpha;

            // Draw Glow
            const glowRad = Math.max(0.1, radius * 6); // Ensure positive radius
            const grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, glowRad);
            grad.addColorStop(0, `rgba(255, 255, 255, ${isHover ? 0.9 : 0.6})`);
            grad.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.3)`);
            grad.addColorStop(1, "rgba(0,0,0,0)");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(rx, ry, glowRad, 0, Math.PI * 2);
            ctx.fill();

            // Draw Core (Star Shape)
            ctx.fillStyle = starColor;
            this.drawStarShape(ctx, rx, ry, radius);

            ctx.restore();
        });

        // Update HUD
        const statEl = document.getElementById('stats');
        const constellationCount = clusters.filter(c => c.length >= this.game.config.minGroupSize).length;
        if (statEl) statEl.innerText = `Mode: ${this.game.mode.charAt(0).toUpperCase() + this.game.mode.slice(1)} | Stars: ${this.game.stars.length} | Constellations: ${constellationCount} | Zoom: ${this.game.camera.zoom.toFixed(2)} x`;

        // Draw player ship if in flight mode
        // Draw player ship if in flight mode
        if (this.game.flightMode && this.game.playerShip) {
            // console.log('[Spacecraft Debug] Rendering player ship at', this.game.playerShip.x, this.game.playerShip.y);
            this.game.renderSpeedLines(ctx);
            this.game.renderMinerals(ctx, time);
            this.game.renderTutorialWaypoints(ctx); // Render tutorial waypoints in world space
            this.renderHazards(ctx, time);  // Space mines and black holes
            this.game.renderProjectiles(ctx);
            // Damage Effects (Under ship? Or over? Over looks better for smoke)
            this.game.renderPlayerShip(ctx, time);
            this.game.renderDamageEffects(ctx);
            this.game.renderCollectionNotifications(ctx);

            // HUD Overlays (Absolute Screen Space)
            this.game.renderTutorialHUDIndicator(ctx);
        }

        ctx.restore(); // Close World Transform (Started at 8918)

        // Welcome overlay renders on top of everything, regardless of flight mode
        this.game.renderWelcomeOverlay(ctx);

        // HAZARD EFFECTS RENDER OUTSIDE FLIGHT MODE CHECK
        // This ensures nuclear explosions, black holes etc. always display
        // even when player state changes during the effect

        // --- MOVED: Cyber Matrix Rain (Screen Space Overlay) ---
        // Rendered HERE to ensure it overlays all 3D elements and backgrounds
        if (this.game.activeStyles.has('cyber') && this.game.matrixStreams) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Force screen space

            ctx.textAlign = 'center';
            const speedMult = this.game.matrixSpeedMultiplier || 1.0;
            const lengthMult = this.game.matrixLengthMultiplier || 1.0;

            // Apply angle transform
            if (this.game.matrixAngle !== 0) {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((this.game.matrixAngle * Math.PI) / 180);
                ctx.translate(-canvas.width / 2, -canvas.height / 2);
            }

            // Base visible length: 20 chars at 1x, slider scales from ~4 to ~60 chars
            const baseVisibleLength = 20;
            const rainbowHueOffset = Date.now() * 0.1; // Animate rainbow hue

            this.game.matrixStreams.forEach((stream, streamIndex) => {
                // Update with real-time speed multiplier
                stream.y += stream.baseSpeed * speedMult;

                // Calculate visible length based on slider (independent of array size)
                const visibleLength = Math.max(3, Math.floor(baseVisibleLength * lengthMult));

                if (stream.y - (visibleLength * stream.size) > canvas.height * 1.5) {
                    stream.y = -stream.size * visibleLength; // Reset
                }

                // Draw
                ctx.font = `${stream.size}px monospace, 'Courier New', monospace`;
                ctx.textBaseline = 'middle';

                // Only draw visible characters based on length multiplier
                for (let i = 0; i < visibleLength && i < stream.chars.length; i++) {
                    const char = stream.chars[i];
                    const charY = stream.y - (i * stream.size);
                    if (charY < -stream.size * 2 || charY > canvas.height * 1.5) continue;

                    // Improved visibility: Fade out only near the end of the tail
                    const relativePos = 1 - (i / visibleLength);
                    const alpha = Math.pow(relativePos, 0.5) * stream.opacity;

                    ctx.globalAlpha = alpha;

                    // Rainbow mode: cycle through HSL colors
                    if (this.game.matrixRainbowMode) {
                        const hue = (rainbowHueOffset + streamIndex * 15 + i * 5) % 360;
                        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
                        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
                    } else {
                        ctx.fillStyle = stream.color;
                        ctx.shadowColor = stream.color;
                    }
                    ctx.shadowBlur = 4;

                    ctx.fillText(char, stream.x, charY);
                }
            });

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1.0;
            ctx.restore();
        }
        this.game.renderHazardEffect(ctx, time);

        // --- RENDER PULSE PING (Expanding Ring in World) ---
        if (this.game.activePulsePing) {
            const now = Date.now();
            const elapsed = now - this.game.activePulsePing.startTime;
            if (elapsed < this.game.activePulsePing.duration) {
                const progress = elapsed / this.game.activePulsePing.duration;
                const radius = progress * (this.game.activePulsePing.maxRadius || 3000);

                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.translate(canvas.width / 2, canvas.height / 2);

                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - progress})`;
                ctx.lineWidth = 5 * (1 - progress);
                ctx.beginPath();
                ctx.arc(0, 0, radius * this.game.camera.zoom, 0, Math.PI * 2);
                ctx.stroke();

                // Outer glow
                ctx.lineWidth = 15 * (1 - progress);
                ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - progress) * 0.3})`;
                ctx.stroke();

                ctx.restore();
            } else {
                this.game.activePulsePing = null;
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

        // ==========================================
        // CONTINUOUS ZOOM EFFECT
        // Zoom increases throughout pull-in and subatomic phases
        // ==========================================
        let zoomScale = 1;
        if (progress < 0.45) {
            // Phase 1: Progressive zoom into the central atom (1x → 5x)
            const p = progress / 0.45;
            zoomScale = 1 + Math.pow(p, 2) * 4; // Quad curve for smoother start, fast finish
        } else if (progress < 0.6) {
            // Phase 2: Deep zoom into the subatomic nucleus (5x → 12x)
            const p = (progress - 0.45) / 0.15;
            zoomScale = 5 + Math.pow(p, 0.8) * 7;
        } else if (progress < 0.88) {
            // Phase 2.5: Zoom peaks during implosion (12x → 20x)
            const p = (progress - 0.6) / 0.28;
            zoomScale = 12 + p * 8;
        } else {
            // Phase 3-4: Zoom holds then slowly resets
            const p = (progress - 0.88) / 0.12;
            zoomScale = 20 - p * 19; // Returns to 1x
        }

        // Apply zoom by scaling from center
        ctx.translate(centerX, centerY);
        ctx.scale(zoomScale, zoomScale);
        ctx.translate(-centerX, -centerY);

        // ==========================================
        // PHASE 1: BEING SUCKED INTO THE BLACK HOLE (0-45%)
        // Creates immersive feeling of moving toward the black hole
        // ==========================================
        if (progress < 0.45) {
            const p = progress / 0.45;

            // Acceleration curve - starts slow, gets exponentially faster
            const acceleration = Math.pow(p, 1.5);

            // Dark space background with intensifying vignette (tunnel vision effect)
            const tunnelBg = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxDim);
            const vignetteIntensity = 0.3 + p * 0.7; // Gets darker at edges as you're pulled in
            tunnelBg.addColorStop(0, 'rgba(0, 0, 0, 1)');
            tunnelBg.addColorStop(0.1 + (1 - p) * 0.2, 'rgba(5, 0, 15, 0.98)');
            tunnelBg.addColorStop(0.4, `rgba(15, 5, 35, ${vignetteIntensity})`);
            tunnelBg.addColorStop(0.7, `rgba(10, 0, 25, ${vignetteIntensity})`);
            tunnelBg.addColorStop(1, 'rgba(0, 0, 0, 1)');
            ctx.fillStyle = tunnelBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // STARS RUSHING PAST (being sucked in with you)
            // Creates the feeling of forward motion
            // ============================================
            const starSpeed = 3 + acceleration * 15; // Accelerates dramatically
            for (let star = 0; star < 200; star++) {
                // Stars originate from edges and rush toward center
                const baseAngle = (star / 200) * Math.PI * 2 + (star * 0.618);
                const starAngle = baseAngle + Math.sin(time * 0.001 + star) * 0.1;

                // Distance cycles inward - creates flowing motion toward center
                const cycleSpeed = (4 + (star % 6) * 1.5) * starSpeed * 0.003;
                const distanceCycle = ((time * cycleSpeed + star * 47) % 100) / 100;
                const starDist = maxDim * (0.1 + distanceCycle * 0.9); // From edges to near center

                // Stars stretch as they accelerate inward (relativistic effect)
                const stretchFactor = 1 + acceleration * 3 * (1 - distanceCycle);
                const trailLength = 10 + stretchFactor * 40 * distanceCycle;

                const x = centerX + Math.cos(starAngle) * starDist;
                const y = centerY + Math.sin(starAngle) * starDist * 0.6; // Elliptical for depth

                // Stars get brighter as they pass by
                const brightness = 0.3 + (1 - distanceCycle) * 0.7;
                const hue = 200 + (star % 60); // Blue-purple spectrum

                // Draw star with motion trail toward center
                const trailEndX = centerX + Math.cos(starAngle) * (starDist - trailLength);
                const trailEndY = centerY + Math.sin(starAngle) * (starDist - trailLength) * 0.6;

                const starGrad = ctx.createLinearGradient(x, y, trailEndX, trailEndY);
                starGrad.addColorStop(0, `hsla(${hue}, 80%, 80%, ${brightness * 0.1})`);
                starGrad.addColorStop(0.3, `hsla(${hue}, 90%, 90%, ${brightness * 0.8})`);
                starGrad.addColorStop(1, `hsla(${hue}, 100%, 100%, ${brightness})`);

                ctx.strokeStyle = starGrad;
                ctx.lineWidth = 1 + (star % 3) * 0.5;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(trailEndX, trailEndY);
                ctx.stroke();
            }

            // ============================================
            // LIGHT RAYS BENDING INWARD (gravitational lensing)
            // Light curves toward the black hole
            // ============================================
            for (let ray = 0; ray < 24; ray++) {
                const rayAngle = (ray / 24) * Math.PI * 2 + time * 0.0008;
                const rayPulse = 0.6 + Math.sin(time * 0.004 + ray * 0.4) * 0.4;

                // Rays curve inward more as animation progresses
                const curveFactor = p * 0.4;
                const rayStartDist = maxDim * 0.95;
                const rayEndDist = maxDim * (0.3 - p * 0.25); // Gets pulled closer to center

                const startX = centerX + Math.cos(rayAngle) * rayStartDist;
                const startY = centerY + Math.sin(rayAngle) * rayStartDist * 0.5;
                const endX = centerX + Math.cos(rayAngle) * rayEndDist;
                const endY = centerY + Math.sin(rayAngle) * rayEndDist * 0.5;

                // Control point for curve (bends toward center)
                const controlDist = (rayStartDist + rayEndDist) / 2 * (1 - curveFactor);
                const controlX = centerX + Math.cos(rayAngle) * controlDist;
                const controlY = centerY + Math.sin(rayAngle) * controlDist * 0.5;

                const rayGrad = ctx.createLinearGradient(startX, startY, endX, endY);
                rayGrad.addColorStop(0, 'transparent');
                rayGrad.addColorStop(0.3, `rgba(180, 200, 255, ${0.15 * rayPulse})`);
                rayGrad.addColorStop(0.6, `rgba(220, 230, 255, ${0.3 * rayPulse * p})`);
                rayGrad.addColorStop(1, `rgba(255, 255, 255, ${0.5 * rayPulse * acceleration})`);

                ctx.strokeStyle = rayGrad;
                ctx.lineWidth = 8 + ray % 5;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.quadraticCurveTo(controlX, controlY, endX, endY);
                ctx.stroke();
            }

            // ============================================
            // DEBRIS/MATTER BEING PULLED IN
            // Chunks of matter streaming toward the void
            // ============================================
            for (let debris = 0; debris < 80; debris++) {
                const debrisAngle = (debris / 80) * Math.PI * 2 + debris * 1.3;
                const debrisSpeed = (3 + debris % 5) * starSpeed * 0.004;
                const debrisCycle = ((time * debrisSpeed + debris * 73) % 100) / 100;
                const debrisDist = maxDim * (0.05 + debrisCycle * 0.85);

                const x = centerX + Math.cos(debrisAngle) * debrisDist;
                const y = centerY + Math.sin(debrisAngle) * debrisDist * 0.55;

                // Debris glows hot as it's compressed
                const heat = 0.4 + (1 - debrisCycle) * 0.6;
                const size = 2 + (debris % 4) + acceleration * 3 * (1 - debrisCycle);

                // Hot orange-red debris
                const debrisGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
                debrisGrad.addColorStop(0, `rgba(255, 200, 100, ${heat})`);
                debrisGrad.addColorStop(0.4, `rgba(255, 120, 50, ${heat * 0.6})`);
                debrisGrad.addColorStop(1, 'transparent');

                ctx.fillStyle = debrisGrad;
                ctx.beginPath();
                ctx.arc(x, y, size * 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // ============================================
            // ACCRETION DISK (spiraling matter around black hole)
            // ============================================
            for (let ring = 0; ring < 15; ring++) {
                const ringRadius = 50 + ring * 25 * (1 - p * 0.3);
                const ringRotation = time * (0.003 - ring * 0.0002) + ring * 0.5;
                const ringAlpha = (0.5 - ring * 0.025) * Math.min(1, p * 2);

                // Draw multiple arcs for spiral effect
                for (let arc = 0; arc < 3; arc++) {
                    const arcStart = ringRotation + arc * (Math.PI * 2 / 3);
                    const arcEnd = arcStart + Math.PI * 0.8;

                    const arcGrad = ctx.createRadialGradient(centerX, centerY, ringRadius * 0.8, centerX, centerY, ringRadius * 1.2);
                    arcGrad.addColorStop(0, `rgba(255, 150, 50, ${ringAlpha})`);
                    arcGrad.addColorStop(0.5, `rgba(255, 100, 30, ${ringAlpha * 0.8})`);
                    arcGrad.addColorStop(1, 'transparent');

                    ctx.strokeStyle = arcGrad;
                    ctx.lineWidth = 12 - ring * 0.5;
                    ctx.beginPath();
                    ctx.ellipse(centerX, centerY, ringRadius, ringRadius * 0.35, 0, arcStart, arcEnd);
                    ctx.stroke();
                }
            }

            // (Central void removed per user request)

            // ============================================
            // TUNNEL PARTICLES (additional depth) - transitioning to subatomic
            // ============================================
            if (effect.tunnelParticles) {
                for (const particle of effect.tunnelParticles) {
                    // Move particles toward center over time
                    particle.z -= starSpeed * 2;
                    if (particle.z < -500) particle.z = 1500;

                    const perspectiveScale = 550 / (550 + particle.z);
                    const x = centerX + Math.cos(particle.angle) * particle.radius * perspectiveScale;
                    const y = centerY + Math.sin(particle.angle) * particle.radius * perspectiveScale * 0.55;
                    const size = 6 * perspectiveScale * particle.brightness;

                    if (size < 1) continue;

                    // Blue-cyan particles only
                    const particleHue = 180 + (particle.hue % 50);
                    const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 1.8);
                    grad.addColorStop(0, `hsla(${particleHue}, 100%, 85%, ${particle.brightness * perspectiveScale})`);
                    grad.addColorStop(0.6, `hsla(${particleHue + 15}, 100%, 60%, ${particle.brightness * perspectiveScale * 0.4})`);
                    grad.addColorStop(1, 'transparent');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(x, y, size * 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ============================================
            // CENTRALLY PEERING ATOM (Visible from distance)
            // ============================================
            const atomAlpha = Math.pow(p, 2.5); // Emerges as we approach the event horizon
            const atomSize = 40 + p * 10; // Grows to match Phase 2 starting size (50)

            ctx.save();
            ctx.globalAlpha = atomAlpha;
            const atomGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, atomSize);
            atomGrad.addColorStop(0, '#fff');
            atomGrad.addColorStop(0.3, '#b4e6ff');
            atomGrad.addColorStop(0.6, 'rgba(0, 150, 255, 0.3)');
            atomGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = atomGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, atomSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 2: SUBATOMIC STRUCTURE (45-60%)
        // Seamless transition from being sucked in to penetrating subatomic level
        // Feels like falling into the quantum structure of the black hole
        // ==========================================
        if (progress >= 0.45 && progress < 0.6) {
            const p = (progress - 0.45) / 0.15;
            const atomicSpeed = 1 + p * 2;

            // Deep black void background - we're inside now
            const subatomicBg = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxDim);
            subatomicBg.addColorStop(0, 'rgba(0, 0, 0, 1)');
            subatomicBg.addColorStop(0.4, 'rgba(0, 5, 15, 0.98)');
            subatomicBg.addColorStop(0.8, 'rgba(0, 0, 5, 1)');
            subatomicBg.addColorStop(1, 'rgba(0, 0, 0, 1)');
            ctx.fillStyle = subatomicBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // ELECTRON ORBITAL SHELLS (rushing toward us)
            // Like atoms zooming past at subatomic scale
            // ============================================
            for (let shell = 0; shell < 30; shell++) {
                const shellSpeed = (3 + shell * 0.2) * atomicSpeed;
                const shellZ = ((time * shellSpeed * 0.004 + shell * 60) % 900);
                const perspective = 500 / (500 + shellZ);

                if (perspective < 0.08) continue;

                const orbitalRadius = (100 + shell * 15) * perspective;
                const shellAlpha = (0.5 + Math.sin(time * 0.006 + shell * 0.4) * 0.3) * perspective;

                // Blue-cyan electron shells
                ctx.strokeStyle = `hsla(${190 + shell % 30}, 100%, 70%, ${shellAlpha * 0.5})`;
                ctx.lineWidth = 1.5 + perspective * 3;
                ctx.beginPath();

                // Tilted orbital - more 3D feeling
                const tilt = 0.3 + Math.sin(shell * 0.5) * 0.2;
                ctx.ellipse(
                    centerX + Math.sin(time * 0.001 + shell) * 5 * perspective,
                    centerY,
                    orbitalRadius,
                    orbitalRadius * tilt,
                    time * 0.0005 + shell * 0.2,
                    0, Math.PI * 2
                );
                ctx.stroke();

                // Electrons orbiting on the shell
                const numElectrons = 2 + (shell % 4);
                for (let e = 0; e < numElectrons; e++) {
                    const electronAngle = time * 0.008 * atomicSpeed + (e / numElectrons) * Math.PI * 2 + shell;
                    const ex = centerX + Math.cos(electronAngle) * orbitalRadius;
                    const ey = centerY + Math.sin(electronAngle) * orbitalRadius * tilt;
                    const eSize = 3 + perspective * 4;

                    const eGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, eSize * 2);
                    eGrad.addColorStop(0, `hsla(200, 100%, 90%, ${shellAlpha})`);
                    eGrad.addColorStop(0.5, `hsla(210, 100%, 70%, ${shellAlpha * 0.6})`);
                    eGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = eGrad;
                    ctx.beginPath();
                    ctx.arc(ex, ey, eSize * 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ============================================
            // ENERGY BONDS (connecting structures)
            // Like chemical bonds between atoms
            // ============================================
            for (let bond = 0; bond < 60; bond++) {
                const bondAngle = (bond / 60) * Math.PI * 2 + time * 0.002;
                const bondSpeed = (4 + bond % 6) * atomicSpeed;
                const bondZ = ((time * bondSpeed * 0.006 + bond * 31) % 700);
                const perspective = 450 / (450 + bondZ);

                if (perspective < 0.12) continue;

                const bondRadius = 80 + (bond % 12) * 25;
                const x1 = centerX + Math.cos(bondAngle) * bondRadius * perspective;
                const y1 = centerY + Math.sin(bondAngle) * bondRadius * perspective * 0.5;
                const x2 = centerX + Math.cos(bondAngle + 0.3) * bondRadius * perspective * 0.6;
                const y2 = centerY + Math.sin(bondAngle + 0.3) * bondRadius * perspective * 0.5 * 0.6;

                const bondAlpha = perspective * (0.4 + Math.sin(time * 0.008 + bond) * 0.2);

                const bondGrad = ctx.createLinearGradient(x1, y1, x2, y2);
                bondGrad.addColorStop(0, `hsla(200, 100%, 80%, ${bondAlpha * 0.3})`);
                bondGrad.addColorStop(0.5, `hsla(190, 100%, 90%, ${bondAlpha * 0.8})`);
                bondGrad.addColorStop(1, `hsla(180, 100%, 85%, ${bondAlpha * 0.4})`);

                ctx.strokeStyle = bondGrad;
                ctx.lineWidth = 1 + perspective * 1.5;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // ============================================
            // CENTRAL NUCLEUS (pulsating core)
            // The heart of the subatomic structure
            // ============================================
            const nucleusSize = 50 + p * 30 + Math.sin(time * 0.01) * 10;
            const nucleusPulse = 0.7 + Math.sin(time * 0.012) * 0.3;

            // Inner glow
            const nucleusGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, nucleusSize);
            nucleusGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * nucleusPulse})`);
            nucleusGrad.addColorStop(0.3, `rgba(200, 230, 255, ${0.7 * nucleusPulse})`);
            nucleusGrad.addColorStop(0.6, `rgba(100, 180, 255, ${0.4 * nucleusPulse})`);
            nucleusGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = nucleusGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, nucleusSize, 0, Math.PI * 2);
            ctx.fill();

            // Time dilation text effect (Legacy touch)
            if (Math.floor(time / 2000) % 2 === 0) {
                ctx.fillStyle = `rgba(150, 200, 255, ${0.4 * (1 - p)})`;
                ctx.font = "italic 18px monospace";
                ctx.textAlign = "center";
                ctx.fillText("TRAVERSING SINGULARITY", centerX, centerY - nucleusSize - 40);
                ctx.fillText("TIME DILATION IN EFFECT", centerX, centerY + nucleusSize + 40);
            }

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 2.5: IMPLOSION (60-75%)
        // Everything collapses violently to a singularity
        // ==========================================
        if (progress >= 0.6 && progress < 0.88) {
            const p = (progress - 0.6) / 0.28;
            const implosionIntensity = Math.pow(p, 0.7);

            // Darkening void as everything compresses
            ctx.fillStyle = `rgba(0, 0, 0, ${0.85 + p * 0.15})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'screen';

            // ============================================
            // COLLAPSING MATTER SHELL
            // Everything rushing toward center
            // ============================================
            for (let shell = 0; shell < 25; shell++) {
                const collapseProgress = Math.min(1, p * 1.5 + shell * 0.02);
                const shellRadius = maxDim * 0.8 * (1 - Math.pow(collapseProgress, 0.6));

                if (shellRadius < 20) continue;

                const shellAlpha = (1 - collapseProgress) * 0.6;

                // Blue-white collapsing shells
                ctx.strokeStyle = `rgba(180, 220, 255, ${shellAlpha})`;
                ctx.lineWidth = 3 * (1 - collapseProgress * 0.7);
                ctx.beginPath();
                ctx.arc(centerX, centerY, shellRadius, 0, Math.PI * 2);
                ctx.stroke();
            }

            // ============================================
            // STREAKING MATTER (being pulled to center)
            // ============================================
            for (let streak = 0; streak < 80; streak++) {
                const streakAngle = (streak / 80) * Math.PI * 2 + streak * 0.37;
                const collapseP = Math.min(1, p * 1.2);
                const streakDist = maxDim * (1 - collapseP) * (0.2 + (streak % 10) * 0.08);

                if (streakDist < 30) continue;

                const x = centerX + Math.cos(streakAngle) * streakDist;
                const y = centerY + Math.sin(streakAngle) * streakDist * 0.5;
                const trailLength = 40 + implosionIntensity * 80;
                const endX = centerX + Math.cos(streakAngle) * (streakDist - trailLength);
                const endY = centerY + Math.sin(streakAngle) * (streakDist - trailLength) * 0.5;

                const streakAlpha = (1 - p * 0.6) * (0.4 + (streak % 5) * 0.1);

                const streakGrad = ctx.createLinearGradient(x, y, endX, endY);
                streakGrad.addColorStop(0, `rgba(150, 200, 255, ${streakAlpha * 0.2})`);
                streakGrad.addColorStop(0.5, `rgba(200, 230, 255, ${streakAlpha * 0.7})`);
                streakGrad.addColorStop(1, `rgba(255, 255, 255, ${streakAlpha})`);

                ctx.strokeStyle = streakGrad;
                ctx.lineWidth = 2 + (streak % 3);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            // ============================================
            // SINGULARITY CORE (building up to explosion)
            // ============================================
            const coreSize = 30 + implosionIntensity * 100;
            const coreIntensity = 0.5 + implosionIntensity * 0.5;

            // Intensifying central point
            const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
            coreGrad.addColorStop(0, `rgba(255, 255, 255, ${coreIntensity})`);
            coreGrad.addColorStop(0.3, `rgba(220, 240, 255, ${coreIntensity * 0.8})`);
            coreGrad.addColorStop(0.6, `rgba(150, 200, 255, ${coreIntensity * 0.4})`);
            coreGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 3: WHITE FLASH (88-92%)
        // Violent release of energy - complete white (Now very quick)
        // ==========================================
        if (progress >= 0.88 && progress < 0.92) {
            const p = (progress - 0.88) / 0.04;

            // Sharp ramp to full white
            const whiteIntensity = p < 0.2 ? Math.pow(p / 0.2, 0.5) : 1.0;

            // Complete solid white
            ctx.fillStyle = `rgba(255, 255, 255, ${whiteIntensity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ensure complete obfuscation
            if (whiteIntensity >= 0.8) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.globalCompositeOperation = 'source-over';
        }

        // ==========================================
        // PHASE 4: WHITE FADES TO REVEAL NEW LOCATION (92-100%)
        // ==========================================
        if (progress >= 0.92) {
            const p = (progress - 0.92) / 0.08;
            const fadeAlpha = Math.pow(1 - p, 1.2);

            // White overlay fading away to reveal the universe
            ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Residual glow at center as transition completes
            if (fadeAlpha > 0.1) {
                const glowSize = maxDim * 0.3 * fadeAlpha;
                const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
                glowGrad.addColorStop(0, `rgba(255, 255, 255, ${fadeAlpha})`);
                glowGrad.addColorStop(0.5, `rgba(200, 220, 255, ${fadeAlpha * 0.5})`);
                glowGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }


    drawBackgroundElements() {
        if (!this.game.config.showBackground) return;

        const ctx = this.game.ctx;
        const canvas = this.game.canvas;
        const zoom = this.game.camera.zoom || 1;
        const camX = this.game.camera.x || 0;
        const camY = this.game.camera.y || 0;

        // 1. Static Stars (Tiered Parallax + Wrapping)
        if (this.game.staticStars && this.game.staticStars.length > 0) {
            this.game.staticStars.forEach(s => {
                const parallax = s.depth * 0.08 || 0.05;
                const sx = (((s.x || 0) * zoom + (camX * parallax)) % canvas.width + canvas.width) % canvas.width;
                const sy = (((s.y || 0) * zoom + (camY * parallax)) % canvas.height + canvas.height) % canvas.height;
                const size = (s.size || 1) * (0.8 + zoom * 0.2);

                if (Number.isFinite(sx) && Number.isFinite(sy)) {
                    ctx.fillStyle = s.color || 'white';
                    ctx.globalAlpha = s.alpha || 0.5;
                    ctx.beginPath();
                    ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }

        // 2. Galaxies (PHASE 18 RESTORED: SPIRAL + CORE)
        if (this.game.activeStyles.has('deep-space') && this.game.galaxies && this.game.galaxies.length > 0) {
            this.game.galaxies.forEach(g => {
                const parallax = 0.02 + (g.z ? (g.z + 2000) / 40000 : 0);
                const sx = (((g.x || 0) * zoom + (camX * parallax)) % canvas.width + canvas.width) % canvas.width;
                const sy = (((g.y || 0) * zoom + (camY * parallax)) % canvas.height + canvas.height) % canvas.height;
                const size = g.size * zoom;
                
                if (!Number.isFinite(sx) || !Number.isFinite(sy) || size <= 0) return;

                ctx.save();
                ctx.translate(sx, sy);
                ctx.rotate(g.rotation + performance.now() * 0.0001);
                
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
                grad.addColorStop(0, g.color + '66');
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.scale(1, 0.4); 
                ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.fill();
                
                ctx.setTransform(1, 0, 0, 1, sx, sy);
                const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.15);
                coreGrad.addColorStop(0, '#ffffff');
                coreGrad.addColorStop(0.5, g.color);
                coreGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = coreGrad;
                ctx.beginPath(); ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            });
        }

        // 3. Nebulae (PHASE 18 ENHANCED: LAYERED PULSE)
        if (this.game.activeStyles.has('nebula') && this.game.nebulae && this.game.nebulae.length > 0) {
            ctx.globalCompositeOperation = 'screen';
            const time = performance.now();
            this.game.nebulae.forEach(n => {
                const parallax = 0.05 + (n.z ? (n.z + 1500) / 30000 : 0.02);
                const sx = (((n.x || 0) * zoom + (camX * parallax)) % canvas.width + canvas.width) % canvas.width;
                const sy = (((n.y || 0) * zoom + (camY * parallax)) % canvas.height + canvas.height) % canvas.height;
                const size = n.size * zoom;
                
                if (!Number.isFinite(sx) || !Number.isFinite(sy) || size <= 0) return;

                ctx.save();
                ctx.translate(sx, sy);
                const pulse1 = (Math.sin(time * 0.0008 + n.x) + 1) / 2;
                const pulse2 = (Math.cos(time * 0.0012 + n.y) + 1) / 2;
                const alpha = (n.opacity || 0.15) * (0.7 + pulse1 * 0.3);
                
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
                grad.addColorStop(0, n.color);
                grad.addColorStop(0.4, n.color + '44');
                grad.addColorStop(1, 'transparent');

                ctx.globalAlpha = alpha;
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.scale(1.2 + pulse2 * 0.2, 0.8 + pulse1 * 0.2); 
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
        }

        // 4. Black Holes
        if (this.game.activeStyles.has('deep-space') && this.game.blackHoles && this.game.blackHoles.length > 0) {
            this.game.blackHoles.forEach(bh => {
                const parallax = 0.1 + (bh.z ? (bh.z + 2000) / 20000 : 0.05);
                const sx = (((bh.x || 0) * zoom + (camX * parallax)) % canvas.width + canvas.width) % canvas.width;
                const sy = (((bh.y || 0) * zoom + (camY * parallax)) % canvas.height + canvas.height) % canvas.height;
                const size = bh.size * zoom;

                if (!Number.isFinite(sx) || !Number.isFinite(sy) || size <= 0) return;

                ctx.save();
                ctx.translate(sx, sy);
                const lensGrad = ctx.createRadialGradient(0, 0, size * 0.8, 0, 0, size * 2);
                lensGrad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
                lensGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = lensGrad;
                ctx.beginPath(); ctx.arc(0, 0, size * 2, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#000000';
                ctx.beginPath(); ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            });
        }
    }

        // 3. Spacecraft (ALIEN FLEET - HIGH FIDELITY WRAPPING)
        if (this.game.activeStyles.has('alien') && this.game.spacecraft && this.game.spacecraft.length > 0) {
            const time = performance.now();
            this.game.spacecraft.forEach(s => {
                const parallax = 0.12 + (s.z ? (s.z + 1500) / 15000 : 0.05);
                const sx = (((s.x || 0) * zoom + (camX * parallax)) % canvas.width + canvas.width) % canvas.width;
                const sy = (((s.y || 0) * zoom + (camY * parallax)) % canvas.height + canvas.height) % canvas.height;
                const size = s.size * zoom;
                
                if (!Number.isFinite(sx) || !Number.isFinite(sy) || size <= 0) return;

                ctx.save();
                ctx.translate(sx, sy);
                
                // Directional rotation
                if (s.shipClass !== 'saucer' && s.shipClass !== 'monolith') {
                    ctx.rotate(Math.atan2(s.vy, s.vx));
                } else if (s.rotation !== undefined) {
                    ctx.rotate(s.rotation + (s.rotationSpeed || 0) * time * 0.01);
                }

                // --- DETAILED SHIP RENDERING ---
                const h = s.hullColor || '#555';
                const hl = s.hullHighlight || '#aaa';
                const sh = s.hullShadow || '#222';
                const ec = s.engineColor || '#00f3ff';
                const t = time * 0.001;

                // 1. Engine Glow (drawn behind)
                if (s.shipClass !== 'monolith' && s.shipClass !== 'swarm-cluster') {
                    const flicker = 0.8 + Math.sin(t * 20 + (s.detailSeed || 0)) * 0.2;
                    ctx.save();
                    ctx.shadowBlur = 15 * zoom;
                    ctx.shadowColor = ec;
                    ctx.fillStyle = ec;
                    ctx.beginPath();
                    ctx.arc(-size * 0.6, 0, size * 0.2 * flicker, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }

                // 2. Multi-Pass Hull Rendering
                ctx.fillStyle = h;
                ctx.strokeStyle = hl;
                ctx.lineWidth = 1.5;

                switch (s.shipClass) {
                    case 'saucer':
                        // Upper Dome
                        ctx.fillStyle = s.domeColor || '#88ffff';
                        ctx.beginPath(); ctx.ellipse(0, -size * 0.1, size * 0.4, size * 0.3, 0, Math.PI, 0); ctx.fill();
                        // Main Chassis
                        ctx.fillStyle = h;
                        ctx.beginPath(); ctx.ellipse(0, 0, size, size * 0.25, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                        // Ring detail
                        ctx.strokeStyle = ec;
                        ctx.beginPath(); ctx.ellipse(0, 0, size * 0.8, size * 0.1, 0, 0, Math.PI * 2); ctx.stroke();
                        break;

                    case 'star-dreadnought':
                        // Industrial Dagger
                        ctx.beginPath();
                        ctx.moveTo(size * 1.5, 0);
                        ctx.lineTo(-size * 0.4, -size * 0.6);
                        ctx.lineTo(-size * 0.8, -size * 0.3);
                        ctx.lineTo(-size * 1.0, 0);
                        ctx.lineTo(-size * 0.8, size * 0.3);
                        ctx.lineTo(-size * 0.4, size * 0.6);
                        ctx.closePath();
                        ctx.fill(); ctx.stroke();
                        // Command Bridge
                        ctx.fillStyle = hl;
                        ctx.fillRect(-size * 0.4, -size * 0.15, size * 0.3, size * 0.3);
                        break;

                    case 'monolith':
                        // Dark Obelisk
                        ctx.fillStyle = '#050505';
                        ctx.fillRect(-size * 0.2, -size * 1.5, size * 0.4, size * 3);
                        ctx.strokeStyle = s.lightColor || '#00f3ff';
                        ctx.lineWidth = 2;
                        for (let i = 0; i < 6; i++) {
                            const y = -size * 1.2 + (i * size * 0.5) + Math.sin(t + i) * 10;
                            ctx.beginPath(); ctx.moveTo(-size * 0.15, y); ctx.lineTo(size * 0.15, y); ctx.stroke();
                        }
                        break;

                    case 'spire-fortress':
                        // Vertical Platform
                        ctx.rotate(t * 0.5);
                        ctx.fillStyle = h;
                        for (let i = 0; i < 4; i++) {
                            ctx.rotate(Math.PI / 2);
                            ctx.fillRect(size * 0.2, -size * 0.1, size * 0.8, size * 0.2);
                        }
                        ctx.fillStyle = sh;
                        ctx.beginPath(); ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2); ctx.fill();
                        break;

                    case 'swarm-cluster':
                        // Multiple small drones
                        for (let i = 0; i < 5; i++) {
                            const ox = Math.cos(t * 2 + i) * size * 0.5;
                            const oy = Math.sin(t * 3 + i) * size * 0.5;
                            ctx.fillStyle = s.lightColor || '#fff';
                            ctx.beginPath(); ctx.arc(ox, oy, size * 0.15, 0, Math.PI * 2); ctx.fill();
                        }
                        break;

                    case 'crystal-cutter':
                        // Translucent geometric ship
                        ctx.globalAlpha = 0.6;
                        ctx.fillStyle = s.domeColor || '#88ffff';
                        ctx.beginPath();
                        ctx.moveTo(size, 0);
                        ctx.lineTo(0, -size * 0.4);
                        ctx.lineTo(-size * 0.8, 0);
                        ctx.lineTo(0, size * 0.4);
                        ctx.closePath();
                        ctx.fill(); ctx.stroke();
                        ctx.globalAlpha = 1.0;
                        break;

                    default:
                        // Generic Sleek Fighter
                        ctx.beginPath();
                        ctx.moveTo(size * 1.2, 0);
                        ctx.lineTo(-size * 0.6, -size * 0.4);
                        ctx.lineTo(-size * 0.3, 0);
                        ctx.lineTo(-size * 0.6, size * 0.4);
                        ctx.closePath();
                        ctx.fill(); ctx.stroke();
                }

                // 3. Navigation Lights (Final Detail)
                const lightPulse = (Math.sin(t * 8 + (s.detailSeed || 0)) + 1) / 2;
                ctx.fillStyle = s.lightColor || '#ff00ff';
                ctx.globalAlpha = 0.4 + lightPulse * 0.6;
                ctx.beginPath(); ctx.arc(size * 0.8, 0, 2, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = 1.0;

                ctx.restore();
            });
        }
    }

    renderSupernovaEffect(ctx, time) {
        const effect = this.game.hazardEffect;
        if (!effect) return;

        // Debug confirmation
        if (!effect._logged) {
            console.log("[Aether] Triggering High-Intensity Red Supernova Effect");
            effect._logged = true;
        }

        const canvas = this.game.canvas;
        const progress = effect.progress || 0;
        const W = canvas.width;
        const H = canvas.height;
        const cx = W / 2;
        const cy = H / 2;
        const t = time * 0.001;
        const scale = Math.min(W, H) / 800;

        ctx.save();

        // ============ CAMERA SHAKE ============
        if (progress < 0.65) {
            const ramp = Math.min(1, progress / 0.015);
            const decay = 1 - progress / 0.65;
            const intensity = 25 * ramp * decay * scale;
            this.game.camera.shakeX = (Math.sin(t * 47) + Math.sin(t * 23) * 0.5) * intensity;
            this.game.camera.shakeY = (Math.cos(t * 53) + Math.cos(t * 31) * 0.5) * intensity;
        } else {
            this.game.camera.shakeX *= 0.88;
            this.game.camera.shakeY *= 0.88;
        }

        // ============ 1. BLINDING FLASH (0-18%) ============
        if (progress < 0.18) {
            const f = progress < 0.025 ? Math.min(1, progress / 0.025) : Math.max(0, 1 - (progress - 0.025) / 0.155);
            ctx.fillStyle = 'rgba(255,255,255,' + f + ')';
            ctx.fillRect(0, 0, W, H);
            if (f > 0.2) {
                const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 600 * scale);
                cg.addColorStop(0, 'rgba(255,255,255,' + f + ')');
                cg.addColorStop(0.2, 'rgba(255,200,200,' + (f * 0.9) + ')');
                cg.addColorStop(0.5, 'rgba(255,40,40,' + (f * 0.7) + ')');
                cg.addColorStop(0.8, 'rgba(220,0,0,' + (f * 0.4) + ')');
                cg.addColorStop(1, 'rgba(120,0,0,0)');
                ctx.fillStyle = cg;
                ctx.fillRect(0, 0, W, H);
            }
        }

        // ============ 2. SHOCKWAVE + CONDENSATION RING (1-55%) ============
        if (progress > 0.01 && progress < 0.55) {
            const sp = (progress - 0.01) / 0.54;
            const sr = sp * 1100 * scale;
            const sa = Math.max(0, (1 - sp) * 0.95);
            const sw = Math.max(3, (1 - sp) * 40 * scale);
            ctx.strokeStyle = 'rgba(255,200,200,' + sa + ')';
            ctx.lineWidth = sw;
            ctx.beginPath();
            ctx.arc(cx, cy, Math.max(1, sr), 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(255,255,255,' + (sa * 0.9) + ')';
            ctx.lineWidth = Math.max(1, sw * 0.3);
            ctx.beginPath();
            ctx.arc(cx, cy, Math.max(1, sr * 0.94), 0, Math.PI * 2);
            ctx.stroke();
            if (sp > 0.05 && sp < 0.7) {
                const wP = (sp - 0.05) / 0.65;
                const wR = wP * 900 * scale;
                const wA = Math.max(0, (1 - wP) * 0.15);
                const wW = Math.max(30, (1 - wP) * 120) * scale;
                ctx.strokeStyle = 'rgba(200,220,255,' + wA + ')';
                ctx.lineWidth = wW;
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, wR), 0, Math.PI * 2);
                ctx.stroke();
            }
            if (sp > 0.12) {
                const s2p = (sp - 0.12) / 0.88;
                ctx.strokeStyle = 'rgba(255,80,80,' + (sa * 0.4) + ')';
                ctx.lineWidth = Math.max(2, sw * 0.4);
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, s2p * 800 * scale), 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // ============ 3. FIREBALL (2-50%) ============
        if (progress > 0.02 && progress < 0.50) {
            const fp = (progress - 0.02) / 0.48;
            const fr = (120 + fp * 400) * scale;
            const fa = Math.max(0, 1 - fp * 1.3);
            for (let layer = 0; layer < 3; layer++) {
                const lr = fr * (1 - layer * 0.25);
                const la = fa * (1 - layer * 0.15);
                const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, lr));
                if (layer === 0) {
                    fg.addColorStop(0, 'rgba(255,255,255,' + la + ')');
                    fg.addColorStop(0.2, 'rgba(255,180,180,' + (la * 0.95) + ')');
                    fg.addColorStop(0.45, 'rgba(255,20,20,' + (la * 0.8) + ')');
                    fg.addColorStop(0.7, 'rgba(200,0,0,' + (la * 0.6) + ')');
                    fg.addColorStop(1, 'rgba(120,0,0,0)');
                } else if (layer === 1) {
                    fg.addColorStop(0, 'rgba(255,150,150,' + (la * 0.7) + ')');
                    fg.addColorStop(0.5, 'rgba(255,0,0,' + (la * 0.55) + ')');
                    fg.addColorStop(1, 'rgba(100,0,0,0)');
                } else {
                    fg.addColorStop(0, 'rgba(255,50,0,' + (la * 0.4) + ')');
                    fg.addColorStop(1, 'rgba(80,0,0,0)');
                }
                ctx.fillStyle = fg;
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, lr), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ============ 4. MEGA VOLUMETRIC MUSHROOM CLOUD (10-96%) ============
        if (progress > 0.10 && progress < 0.96) {
            const cp = Math.min(1, (progress - 0.10) / 0.45);
            const riseP = Math.max(0, Math.min(1, (progress - 0.25) / 0.55));
            const fadeP = Math.max(0, (progress - 0.72) / 0.24);
            const alpha = Math.max(0, 1 - fadeP);
            const hotness = Math.max(0, 1 - cp * 1.2);
            const rise = riseP * 250 * scale;
            const baseY = cy + 50 * scale;

            ctx.save();
            ctx.translate(cx, baseY - rise);

            // ---- FIRE COLUMN inside stem ----
            if (hotness > 0.1) {
                for (let i = 0; i < 25; i++) {
                    const frac = i / 24;
                    const fy = -frac * (280 + cp * 150) * scale;
                    const fw = (35 + frac * frac * 50 + Math.sin(t * 8 + frac * 10) * 10) * scale * Math.min(1, cp * 3);
                    const ffa = alpha * hotness * (0.7 - frac * 0.3);
                    if (ffa < 0.01) continue;
                    const fcg = ctx.createRadialGradient(0, fy, 0, 0, fy, Math.max(1, fw));
                    fcg.addColorStop(0, 'rgba(255,240,240,' + (ffa * 0.98) + ')');
                    fcg.addColorStop(0.3, 'rgba(255,100,100,' + (ffa * 0.85) + ')');
                    fcg.addColorStop(0.6, 'rgba(255,0,0,' + (ffa * 0.6) + ')');
                    fcg.addColorStop(1, 'rgba(100,0,0,0)');
                    ctx.fillStyle = fcg;
                    ctx.beginPath();
                    ctx.arc(Math.sin(t * 6 + frac * 8) * 6 * scale, fy, Math.max(1, fw), 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ---- STEM: Dense layered smoke column ----
            const stemH = (320 + cp * 180) * scale;
            for (let i = 0; i < 22; i++) {
                const frac = i / 21;
                const sy = -frac * stemH;
                const sw = (60 + frac * frac * 110 + Math.sin(t * 1.8 + frac * 6) * 10) * scale * Math.min(1, cp * 2.5);
                const depth = 0.5 + frac * 0.35;
                let r, g, b;
                if (hotness > 0.3) { r = 255; g = 10 + frac * 40; b = 15; }
                else { r = 70 - frac * 30; g = 15; b = 20; }
                const wobX = Math.sin(t * 1.2 + frac * 4) * 8 * scale;
                const sg = ctx.createRadialGradient(wobX, sy, 0, wobX, sy, Math.max(1, sw * 1.3));
                sg.addColorStop(0, 'rgba(' + (r + 60) + ',' + (g + 20) + ',' + (b + 10) + ',' + (alpha * depth * 0.95) + ')');
                sg.addColorStop(0.5, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * depth * 0.8) + ')');
                sg.addColorStop(1, 'rgba(' + Math.round(r * 0.4) + ',0,0,0)');
                ctx.fillStyle = sg;
                ctx.beginPath();
                ctx.arc(wobX, sy, Math.max(1, sw * 1.3), 0, Math.PI * 2);
                ctx.fill();
            }

            // ---- CAP: Multi-layer volumetric dome ----
            const capY = -stemH;
            const capGrow = Math.max(0, Math.min(1, (cp - 0.1) / 0.45));
            if (capGrow > 0) {
                const capR = (280 + capGrow * 320) * scale;
                const capH = (140 + capGrow * 120) * scale;

                // BACK LAYER - dark depth billows
                for (let i = 0; i < 14; i++) {
                    const angle = (i / 14) * Math.PI * 2 + t * 0.15;
                    const bx = Math.cos(angle) * capR * 0.6;
                    const by = capY + Math.sin(angle * 1.3 + t * 0.2) * capH * 0.4;
                    const br = capR * (0.55 + Math.sin(t * 0.8 + i * 0.5) * 0.1);
                    let r = hotness > 0.2 ? 140 : 40, g = hotness > 0.2 ? 20 : 15, b = hotness > 0.2 ? 20 : 25;
                    const bg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    bg.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.65 * capGrow) + ')');
                    bg.addColorStop(0.6, 'rgba(' + Math.round(r * 0.6) + ',' + Math.round(g * 0.4) + ',' + Math.round(b * 0.4) + ',' + (alpha * 0.4 * capGrow) + ')');
                    bg.addColorStop(1, 'rgba(' + Math.round(r * 0.2) + ',' + Math.round(g * 0.1) + ',' + Math.round(b * 0.1) + ',0)');
                    ctx.fillStyle = bg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // MID LAYER - main body
                for (let i = 0; i < 18; i++) {
                    const angle = (i / 18) * Math.PI * 2 + Math.PI / 18 + t * 0.22;
                    const bx = Math.cos(angle) * capR * 0.48 + Math.sin(t * 0.7 + i) * 15 * scale;
                    const by = capY + Math.sin(angle * 0.8 + t * 0.3) * capH * 0.32;
                    const br = capR * (0.48 + Math.sin(t * 1.1 + i * 0.8) * 0.07);
                    let r, g, b;
                    if (hotness > 0.4) { r = 255; g = 10; b = 15; }
                    else if (hotness > 0.15) { r = 180; g = 5; b = 10; }
                    else { r = 100; g = 5; b = 8; }
                    const mg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    mg.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.75 * capGrow) + ')');
                    mg.addColorStop(0.4, 'rgba(' + Math.round(r * 0.8) + ',' + Math.round(g * 0.7) + ',' + Math.round(b * 0.75) + ',' + (alpha * 0.5 * capGrow) + ')');
                    mg.addColorStop(0.8, 'rgba(' + Math.round(r * 0.5) + ',' + Math.round(g * 0.3) + ',' + Math.round(b * 0.35) + ',' + (alpha * 0.2 * capGrow) + ')');
                    mg.addColorStop(1, 'rgba(' + Math.round(r * 0.2) + ',' + Math.round(g * 0.1) + ',' + Math.round(b * 0.1) + ',0)');
                    ctx.fillStyle = mg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // FRONT LAYER - bright highlights
                for (let i = 0; i < 12; i++) {
                    const angle = (i / 12) * Math.PI * 2 + t * 0.28;
                    const bx = Math.cos(angle) * capR * 0.35 + Math.sin(t + i * 1.3) * 10 * scale;
                    const by = capY + Math.sin(angle * 1.5 + t * 0.35) * capH * 0.25;
                    const br = capR * (0.3 + Math.sin(t * 1.5 + i) * 0.06);
                    let r, g, b;
                    if (hotness > 0.3) { r = 255; g = 180; b = 180; } else { r = 255; g = 120; b = 120; }
                    const fg = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(1, br));
                    fg.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.6 * capGrow) + ')');
                    fg.addColorStop(0.5, 'rgba(' + Math.round(r * 0.95) + ',' + Math.round(g * 0.8) + ',' + Math.round(b * 0.8) + ',' + (alpha * 0.35 * capGrow) + ')');
                    fg.addColorStop(1, 'rgba(' + Math.round(r * 0.6) + ',' + Math.round(g * 0.2) + ',' + Math.round(b * 0.2) + ',0)');
                    ctx.fillStyle = fg;
                    ctx.beginPath();
                    ctx.arc(bx, by, Math.max(1, br), 0, Math.PI * 2);
                    ctx.fill();
                }

                // BRIGHT CORE
                const ccR = capR * 0.5;
                const ccg2 = ctx.createRadialGradient(0, capY, 0, 0, capY, Math.max(1, ccR));
                if (hotness > 0.2) {
                    ccg2.addColorStop(0, 'rgba(255,240,240,' + (alpha * 0.95 * capGrow) + ')');
                    ccg2.addColorStop(0.3, 'rgba(255,80,80,' + (alpha * 0.7 * capGrow) + ')');
                    ccg2.addColorStop(0.7, 'rgba(255,0,0,' + (alpha * 0.4 * capGrow) + ')');
                    ccg2.addColorStop(1, 'rgba(120,0,0,0)');
                } else {
                    ccg2.addColorStop(0, 'rgba(255,200,200,' + (alpha * 0.7 * capGrow) + ')');
                    ccg2.addColorStop(0.5, 'rgba(200,0,0,' + (alpha * 0.5 * capGrow) + ')');
                    ccg2.addColorStop(1, 'rgba(100,0,0,0)');
                }
                ctx.fillStyle = ccg2;
                ctx.beginPath();
                ctx.arc(0, capY, Math.max(1, ccR), 0, Math.PI * 2);
                ctx.fill();

                // UNDERGLOW from fireball
                if (hotness > 0.05) {
                    const ugR = capR * 0.7;
                    const ugY = capY + capH * 0.4;
                    const ugA = alpha * hotness * 0.5 * capGrow;
                    const ugg = ctx.createRadialGradient(0, ugY, 0, 0, ugY, Math.max(1, ugR));
                    ugg.addColorStop(0, 'rgba(255,255,255,' + ugA + ')');
                    ugg.addColorStop(0.5, 'rgba(255,50,50,' + (ugA * 0.6) + ')');
                    ugg.addColorStop(1, 'rgba(180,0,0,0)');
                    ctx.fillStyle = ugg;
                    ctx.beginPath();
                    ctx.arc(0, ugY, Math.max(1, ugR), 0, Math.PI * 2);
                    ctx.fill();
                }

                // TOROIDAL RING at cap base
                ctx.strokeStyle = 'rgba(255,150,150,' + (alpha * 0.4 * capGrow) + ')';
                ctx.lineWidth = Math.max(2, capH * 0.22);
                ctx.beginPath();
                ctx.ellipse(0, capY + capH * 0.25, Math.max(1, capR * 0.65), Math.max(1, capH * 0.11), 0, 0, Math.PI * 2);
                ctx.stroke();

                // SMOKE TENDRILS from cap edges
                for (let i = 0; i < 8; i++) {
                    const tA = (i / 8) * Math.PI * 2 + t * 0.1;
                    const tLen = (60 + Math.sin(t + i * 2) * 20) * scale * capGrow;
                    const tx = Math.cos(tA) * capR * 0.75;
                    const ty = capY + Math.sin(tA) * capH * 0.3;
                    const tex = tx + Math.cos(tA + 0.5) * tLen;
                    const tey = ty + Math.sin(tA * 0.5 + t * 0.3) * tLen * 0.6 - tLen * 0.3;
                    ctx.strokeStyle = 'rgba(200,100,100,' + (alpha * 0.25 * capGrow) + ')';
                    ctx.lineWidth = Math.max(1, 6 * scale * (1 - progress * 0.5));
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.quadraticCurveTo(tx + (tex - tx) * 0.5, ty - 30 * scale, tex, tey);
                    ctx.stroke();
                }

                // RISING VAPOR above cap
                for (let v = 0; v < 10; v++) {
                    const vy = capY - (60 + v * 40) * scale;
                    const vr = Math.max(1, (35 + v * 15 + Math.sin(t * 2.5 + v * 0.9) * 10) * scale * capGrow);
                    const vx = Math.sin(t * 1.1 + v * 1.7) * 30 * scale;
                    const va = alpha * Math.max(0, 0.35 - v * 0.03) * capGrow;
                    const vg = ctx.createRadialGradient(vx, vy, 0, vx, vy, vr);
                    vg.addColorStop(0, 'rgba(255,245,245,' + va + ')');
                    vg.addColorStop(0.6, 'rgba(220,180,180,' + (va * 0.6) + ')');
                    vg.addColorStop(1, 'rgba(150,140,140,0)');
                    ctx.fillStyle = vg;
                    ctx.beginPath();
                    ctx.arc(vx, vy, vr, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ---- EMBER PARTICLES ----
            if (!effect._embers) {
                effect._embers = [];
                for (let i = 0; i < 60; i++) {
                    const a = Math.random() * Math.PI * 2;
                    const spd = 1 + Math.random() * 4;
                    effect._embers.push({
                        x: 0, y: 0, vx: Math.cos(a) * spd, vy: -2 - Math.random() * 5,
                        size: 1 + Math.random() * 3, life: 0.1 + Math.random() * 0.7, hue: (Math.random() < 0.2 ? 0 : 350 + Math.random() * 10)
                    });
                }
            }
            for (let i = 0; i < effect._embers.length; i++) {
                const e = effect._embers[i];
                if (progress < e.life || progress > e.life + 0.3) continue;
                const ep = (progress - e.life) / 0.3;
                const ex = e.vx * ep * 300 * scale;
                const ey = e.vy * ep * 300 * scale - stemH * 0.5;
                const ea = Math.max(0, (1 - ep) * alpha * 0.9);
                const es = e.size * scale * (1 + ep);
                ctx.fillStyle = 'hsla(' + e.hue + ', 100%, ' + Math.round(60 + (1 - ep) * 30) + '%, ' + ea + ')';
                ctx.beginPath();
                ctx.arc(ex, ey, Math.max(0.5, es), 0, Math.PI * 2);
                ctx.fill();
            }

            // ---- GROUND DEBRIS RING ----
            if (progress < 0.60) {
                const dp = Math.min(1, progress / 0.20);
                const dr = dp * 500 * scale;
                const da = alpha * Math.max(0, 1 - dp) * 0.45;
                const dg = ctx.createRadialGradient(0, 30 * scale, 0, 0, 30 * scale, Math.max(1, dr));
                dg.addColorStop(0, 'rgba(180,30,30,' + da + ')');
                dg.addColorStop(0.4, 'rgba(120,20,20,' + (da * 0.7) + ')');
                dg.addColorStop(0.8, 'rgba(60,10,10,' + (da * 0.3) + ')');
                dg.addColorStop(1, 'rgba(30,0,0,0)');
                ctx.fillStyle = dg;
                ctx.beginPath();
                ctx.arc(0, 30 * scale, Math.max(1, dr), 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        // ============ 5. AMBIENT GLOW ============
        if (progress > 0.02 && progress < 0.88) {
            const ga = Math.max(0, (1 - progress) * 0.3);
            const gg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 800 * scale);
            gg.addColorStop(0, 'rgba(255,100,100,' + ga + ')');
            gg.addColorStop(0.4, 'rgba(255,40,40,' + (ga * 0.7) + ')');
            gg.addColorStop(0.8, 'rgba(180,0,0,' + (ga * 0.3) + ')');
            gg.addColorStop(1, 'rgba(100,0,0,0)');
            ctx.fillStyle = gg;
            ctx.fillRect(0, 0, W, H);
        }

        // ============ 6. SCREEN TINT ============
        if (progress > 0.05 && progress < 0.70) {
            const tintA = Math.max(0, 0.08 * (1 - progress / 0.70));
            ctx.fillStyle = 'rgba(255,50,50,' + tintA + ')';
            ctx.fillRect(0, 0, W, H);
        }

        ctx.restore();

        if (progress >= 0.95) {
            this.game.camera.shakeX = 0;
            this.game.camera.shakeY = 0;
        }
    }


    renderTrainingHUD(ctx) {
        if (!this.game.trainingLesson) return;
        if (!this.game.trainingActive && !this.game.trainingBriefing && !this.game.trainingComplete) return;

        const lesson = this.game.trainingLesson;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Screen space

        // --- BRIEFING OVERLAY ---
        if (this.game.trainingBriefing) {
            const elapsed = (performance.now() - this.game.trainingBriefingStart) / 1000;
            const fadeIn = Math.min(1, elapsed / 0.5);

            // Backdrop
            ctx.globalAlpha = fadeIn * 0.75;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            // Briefing card
            ctx.globalAlpha = fadeIn;
            const cardW = Math.min(500, w * 0.8);
            const cardH = 300;
            const cx = (w - cardW) / 2;
            const cy = (h - cardH) / 2;

            // Card background
            ctx.fillStyle = 'rgba(10, 22, 40, 0.95)';
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(cx, cy, cardW, cardH, 12);
            ctx.fill();
            ctx.stroke();

            // Lesson icon + title
            ctx.textAlign = 'center';
            ctx.font = 'bold 32px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00f3ff';
            ctx.fillText(`${lesson.icon} ${lesson.name}`, w / 2, cy + 55);

            // Subtitle
            ctx.shadowBlur = 0;
            ctx.font = '14px "Exo 2", sans-serif';
            ctx.fillStyle = '#8ba';
            ctx.fillText(lesson.subtitle, w / 2, cy + 80);

            // Briefing text
            ctx.font = '15px "Exo 2", sans-serif';
            ctx.fillStyle = '#d0eeff';
            const lines = lesson.briefing.split('\n');
            lines.forEach((line, i) => {
                ctx.fillText(line, w / 2, cy + 120 + i * 24);
            });

            // Key indicators
            const keyY = cy + 120 + lines.length * 24 + 20;
            ctx.font = 'bold 13px "Exo 2", monospace';
            const totalKeysWidth = lesson.keys.length * 100;
            let keyX = w / 2 - totalKeysWidth / 2 + 50;
            lesson.keys.forEach(k => {
                // Key box
                ctx.fillStyle = 'rgba(0,243,255,0.15)';
                ctx.strokeStyle = 'rgba(0,243,255,0.5)';
                ctx.lineWidth = 1.5;
                const boxW = Math.max(40, ctx.measureText(k.key).width + 20);
                ctx.beginPath();
                ctx.roundRect(keyX - boxW / 2, keyY - 12, boxW, 28, 6);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#00f3ff';
                ctx.textAlign = 'center';
                ctx.fillText(k.key, keyX, keyY + 6);

                // Action label
                ctx.font = '11px "Exo 2", sans-serif';
                ctx.fillStyle = '#8ba';
                ctx.fillText(k.action, keyX, keyY + 28);
                ctx.font = 'bold 13px "Exo 2", monospace';

                keyX += 110;
            });

            // "Press any key" hint
            const blinkAlpha = elapsed > 1.5 ? 0.4 + Math.sin(performance.now() * 0.005) * 0.4 : 0;
            ctx.globalAlpha = blinkAlpha;
            ctx.font = '14px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            ctx.textAlign = 'center';
            ctx.fillText('Press W or ENTER to start', w / 2, cy + cardH - 20);

            ctx.restore();
            return; // Don't render other HUD during briefing
        }

        // --- COMPLETION OVERLAY ---
        if (this.game.trainingComplete) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            ctx.globalAlpha = 1.0;
            const medalEmoji = this.game.trainingMedal === 'gold' ? '🥇' : this.game.trainingMedal === 'silver' ? '🥈' : this.game.trainingMedal === 'bronze' ? '🥉' : '✅';
            const medalColor = this.game.trainingMedal === 'gold' ? '#ffd700' : this.game.trainingMedal === 'silver' ? '#c0c0c0' : this.game.trainingMedal === 'bronze' ? '#cd7f32' : '#00ff66';

            ctx.textAlign = 'center';

            // Medal
            ctx.font = '64px sans-serif';
            ctx.fillText(medalEmoji, w / 2, h / 2 - 60);

            // Title
            ctx.font = 'bold 28px "Exo 2", sans-serif';
            ctx.fillStyle = medalColor;
            ctx.shadowBlur = 20;
            ctx.shadowColor = medalColor;
            ctx.fillText('LESSON COMPLETE!', w / 2, h / 2);

            // Stats
            ctx.shadowBlur = 0;
            ctx.font = '18px "Exo 2", sans-serif';
            ctx.fillStyle = '#d0eeff';
            ctx.fillText(`Time: ${this.game.trainingTimer.toFixed(1)}s`, w / 2, h / 2 + 35);

            const reward = this.game.trainingMedal ? lesson.reward[this.game.trainingMedal] : 50;
            ctx.fillStyle = '#ffd700';
            ctx.fillText(`+$${reward}`, w / 2, h / 2 + 60);

            // Gem rewards display
            if (this.game.trainingGemSummary && this.game.trainingGemSummary.length > 0) {
                ctx.font = '13px "Exo 2", sans-serif';
                ctx.fillStyle = '#00f3ff';
                const gemLine = this.game.trainingGemSummary.join('  •  ');
                ctx.fillText(`💎 ${gemLine}`, w / 2, h / 2 + 82);
            }

            // Medal thresholds
            ctx.font = '13px "Exo 2", sans-serif';
            ctx.fillStyle = '#667';
            ctx.fillText(`🥇 <${lesson.medals.gold}s  🥈 <${lesson.medals.silver}s  🥉 <${lesson.medals.bronze}s`, w / 2, h / 2 + 108);

            // Actions
            ctx.font = '15px "Exo 2", sans-serif';
            ctx.fillStyle = '#00f3ff';
            const blinkAlpha = 0.5 + Math.sin(performance.now() * 0.004) * 0.4;
            ctx.globalAlpha = blinkAlpha;
            ctx.fillText('Press ENTER to continue', w / 2, h / 2 + 135);

            // Check for dismiss
            if (this.game.keysPressed['enter'] || this.game.keysPressed[' ']) {
                this.game.trainingComplete = false;
                this.game.trainingLesson = null;
                // Open academy to pick next lesson
                setTimeout(() => this.game.openFlightAcademy(), 300);
            }

            ctx.restore();
            return;
        }

        // --- ACTIVE TRAINING HUD ---
        const time = performance.now() * 0.003;

        // Top-center: Lesson title + timer
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f3ff';
        ctx.globalAlpha = 0.9;
        ctx.fillText(`${lesson.icon} ${lesson.name}`, w / 2, 35);

        // Timer
        ctx.shadowBlur = 0;
        ctx.font = 'bold 22px "Exo 2", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.game.trainingTimer.toFixed(1) + 's', w / 2, 60);

        // Progress bar
        const totalGates = lesson.gates.filter(g => lesson.id !== 'collection' || !g.reached).length;
        const reachedGates = lesson.gates.filter(g => g.reached).length;
        let progressRatio;
        if (lesson.id === 'collection') {
            progressRatio = this.game.trainingGemsCollected / (lesson.collectTarget || lesson.gems.length);
        } else {
            progressRatio = reachedGates / lesson.gates.length;
        }
        const barW = 200;
        const barH = 6;
        const barX = w / 2 - barW / 2;
        const barY = 70;

        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#1a2a3a';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(barX, barY, barW * Math.min(1, progressRatio), barH);

        // Gate/gem counter
        ctx.font = '11px "Exo 2", sans-serif';
        ctx.fillStyle = '#8ba';
        ctx.globalAlpha = 0.8;
        if (lesson.id === 'collection') {
            ctx.fillText(`Gems: ${this.game.trainingGemsCollected}/${lesson.collectTarget || lesson.gems.length}`, w / 2, barY + 20);
        } else {
            ctx.fillText(`Gates: ${reachedGates}/${lesson.gates.length}`, w / 2, barY + 20);
        }

        // --- MISSION OBJECTIVE (always visible) ---
        ctx.globalAlpha = 0.85;
        ctx.font = '13px "Exo 2", sans-serif';
        ctx.fillStyle = '#d0eeff';
        // Show a single-line objective derived from briefing
        const objectiveLines = lesson.briefing.split('\n').filter(l => l.trim());
        const objectiveY = barY + 22;
        objectiveLines.forEach((line, i) => {
            ctx.globalAlpha = Math.max(0.4, 0.85 - i * 0.15);
            ctx.fillText(line, w / 2, objectiveY + 16 + i * 17);
        });

        // Medal thresholds small text
        const medalsY = objectiveY + 16 + objectiveLines.length * 17 + 6;
        ctx.font = '10px "Exo 2", sans-serif';
        ctx.fillStyle = '#445';
        ctx.globalAlpha = 0.6;
        ctx.fillText(`🥇${lesson.medals.gold}s  🥈${lesson.medals.silver}s  🥉${lesson.medals.bronze}s`, w / 2, medalsY);

        // --- Key hints (bottom center) ---
        ctx.globalAlpha = 0.5 + Math.sin(time) * 0.15;
        ctx.font = '12px "Exo 2", monospace';
        ctx.fillStyle = '#00f3ff';
        const hintText = lesson.keys.map(k => `[${k.key}] ${k.action}`).join('   ');
        ctx.fillText(hintText, w / 2, h - 25);

        // --- HUD Arrow to next gate ---
        if (lesson.showArrow && this.game.trainingGateIndex < lesson.gates.length) {
            const gate = lesson.gates[this.game.trainingGateIndex];
            const dx = gate.x - this.game.playerShip.x;
            const dy = gate.y - this.game.playerShip.y;
            const angle = Math.atan2(dy, dx);
            const dist = Math.hypot(dx, dy);

            const indicatorRadius = Math.min(w, h) * 0.15;
            const ix = w / 2 + Math.cos(angle) * indicatorRadius;
            const iy = h / 2 + Math.sin(angle) * indicatorRadius;

            ctx.save();
            ctx.translate(ix, iy);
            ctx.rotate(angle);

            const pulse = 1 + Math.sin(time * 2) * 0.12;

            // Neon arrow
            ctx.beginPath();
            ctx.moveTo(22 * pulse, 0);
            ctx.lineTo(-10 * pulse, -13 * pulse);
            ctx.lineTo(-10 * pulse, 13 * pulse);
            ctx.closePath();
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 18;
            ctx.shadowColor = '#00f3ff';
            ctx.globalAlpha = 0.7 + Math.sin(time * 2) * 0.25;
            ctx.fill();

            // Distance
            ctx.rotate(-angle);
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'black';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px "Exo 2", sans-serif';
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.9;
            ctx.fillText(`${Math.round(dist)}m`, 0, 30);
            ctx.restore();
        }

        // For collection lesson, show arrow to nearest uncollected gem
        if (lesson.id === 'collection' && this.game.trainingGemsCollected < (lesson.collectTarget || lesson.gems.length)) {
            let nearestGem = null;
            let nearestDist = Infinity;
            for (const gem of lesson.gems) {
                if (gem.collected) continue;
                const d = Math.hypot(gem.x - this.game.playerShip.x, gem.y - this.game.playerShip.y);
                if (d < nearestDist) { nearestDist = d; nearestGem = gem; }
            }
            if (nearestGem) {
                const angle = Math.atan2(nearestGem.y - this.game.playerShip.y, nearestGem.x - this.game.playerShip.x);
                const indicatorRadius = Math.min(w, h) * 0.12;
                const ix = w / 2 + Math.cos(angle) * indicatorRadius;
                const iy = h / 2 + Math.sin(angle) * indicatorRadius;

                ctx.save();
                ctx.translate(ix, iy);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(15, 0);
                ctx.lineTo(-7, -9);
                ctx.lineTo(-7, 9);
                ctx.closePath();
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 12;
                ctx.shadowColor = '#ffd700';
                ctx.globalAlpha = 0.6 + Math.sin(time * 3) * 0.3;
                ctx.fill();
                ctx.rotate(-angle);
                ctx.font = '11px "Exo 2", sans-serif';
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#000';
                ctx.textAlign = 'center';
                ctx.fillText(`💎 ${Math.round(nearestDist)}m`, 0, 24);
                ctx.restore();
            }
        }

        // Cancel hint
        ctx.globalAlpha = 0.35;
        ctx.font = '10px "Exo 2", sans-serif';
        ctx.fillStyle = '#ff6666';
        ctx.textAlign = 'right';
        ctx.fillText('ESC to cancel', w - 15, 20);

        ctx.restore();

        // Check ESC to cancel
        if (this.game.keysPressed['escape']) {
            this.game.keysPressed['escape'] = false;
            this.game.cancelTraining();
        }
    }


    renderTrainingGates(ctx) {
        if (!this.game.trainingActive && !this.game.trainingComplete) return;
        const lesson = this.game.trainingLesson;
        if (!lesson) return;

        const time = performance.now() * 0.002;

        // Render gates
        lesson.gates.forEach((gate, index) => {
            if (gate.reached && lesson.id !== 'collection') return; // Don't draw reached gates (except finish)

            const isCurrent = index === this.game.trainingGateIndex;
            const isFinish = lesson.id === 'collection' && index === lesson.gates.length - 1;

            ctx.save();
            ctx.translate(gate.x, gate.y);

            const pulse = isCurrent ? 1.0 + Math.sin(time * 2) * 0.08 : 1.0;
            const size = gate.size * pulse;

            // Gate color scheme
            let color, glowColor, alpha;
            if (gate.reached) {
                color = '#00ff66'; glowColor = 'rgba(0,255,100,0.3)'; alpha = 0.3;
            } else if (isCurrent) {
                color = '#00f3ff'; glowColor = 'rgba(0,243,255,0.4)'; alpha = 0.9;
            } else if (isFinish) {
                color = '#ffd700'; glowColor = 'rgba(255,215,0,0.3)'; alpha = 0.6 + Math.sin(time) * 0.2;
            } else {
                color = '#4466aa'; glowColor = 'rgba(68,102,170,0.2)'; alpha = 0.35;
            }

            ctx.globalAlpha = alpha;

            // Outer glow ring
            ctx.shadowBlur = isCurrent ? 30 : 10;
            ctx.shadowColor = color;

            // Main ring
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = isCurrent ? 8 : 4;
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.stroke();

            // Inner dashed ring (rotating)
            ctx.setLineDash([15, 8]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.globalAlpha = alpha * 0.6;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.75, time * 0.8, time * 0.8 + Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Holographic fill for current gate
            if (isCurrent || isFinish) {
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
                grad.addColorStop(0, isCurrent ? 'rgba(0,243,255,0.08)' : 'rgba(255,215,0,0.06)');
                grad.addColorStop(0.7, isCurrent ? 'rgba(0,243,255,0.03)' : 'rgba(255,215,0,0.02)');
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Directional chevrons on current gate (4 arrows pointing inward)
            if (isCurrent) {
                ctx.globalAlpha = 0.5 + Math.sin(time * 3) * 0.3;
                for (let a = 0; a < 4; a++) {
                    const chevAngle = (a * Math.PI / 2) + time * 0.3;
                    ctx.save();
                    ctx.rotate(chevAngle);
                    ctx.translate(size * 1.15, 0);
                    ctx.rotate(Math.PI); // Point inward
                    ctx.beginPath();
                    ctx.moveTo(12, 0);
                    ctx.lineTo(-6, -8);
                    ctx.lineTo(-6, 8);
                    ctx.closePath();
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.restore();
                }
            }

            // Gate number label
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = 0;
            ctx.font = `bold ${isCurrent ? 16 : 12}px "Exo 2", monospace`;
            ctx.textAlign = 'center';
            ctx.fillStyle = color;
            ctx.fillText(isFinish ? 'FINISH' : `G${index + 1}`, 0, size + 22);

            ctx.restore();
        });

        // Render training gems (collectible)
        if (lesson.gems) {
            lesson.gems.forEach(gem => {
                if (gem.collected) return;
                ctx.save();
                ctx.translate(gem.x, gem.y);

                const gemColor = MINERAL_TYPES[gem.type]?.color || '#ffffff';
                const gemSize = 14;
                const pulse = 1 + Math.sin(time * 3 + gem.x * 0.01) * 0.15;

                // Gem glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = gemColor;
                ctx.globalAlpha = 0.8;

                // Diamond shape
                ctx.beginPath();
                ctx.moveTo(0, -gemSize * pulse);
                ctx.lineTo(gemSize * 0.7 * pulse, 0);
                ctx.lineTo(0, gemSize * pulse);
                ctx.lineTo(-gemSize * 0.7 * pulse, 0);
                ctx.closePath();
                ctx.fillStyle = gemColor;
                ctx.fill();

                // Sparkle
                ctx.globalAlpha = 0.4 + Math.sin(time * 5 + gem.y * 0.01) * 0.3;
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            });
        }

        // Render training targets
        if (lesson.targets) {
            lesson.targets.forEach(target => {
                if (target.destroyed) return;
                ctx.save();
                ctx.translate(target.x, target.y);
                
                // Orange pulsing training mine
                const targetPulse = 1 + Math.sin(time * 5 + target.id) * 0.1;
                const r = 25 * targetPulse;
                
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ff6600';
                
                // Outer ring
                ctx.beginPath();
                ctx.strokeStyle = '#ff6600';
                ctx.lineWidth = 2;
                ctx.arc(0, 0, r + 10, 0, Math.PI * 2);
                ctx.stroke();
                
                // Inner core
                ctx.beginPath();
                ctx.fillStyle = '#ffaa00';
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.fill();
                
                // Target crosshair
                ctx.beginPath();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.moveTo(-r - 15, 0); ctx.lineTo(r + 15, 0);
                ctx.moveTo(0, -r - 15); ctx.lineTo(0, r + 15);
                ctx.stroke();
                
                ctx.restore();
            });
        }
        
        // Render training hazard zone (Shielding)
        if (lesson.hazardZone) {
            const hz = lesson.hazardZone;
            ctx.save();
            ctx.translate(hz.x, hz.y);
            
            // Pulsing red danger zone
            const zonePulse = 1 + Math.sin(time * 2) * 0.05;
            const r = hz.radius * zonePulse;
            
            ctx.beginPath();
            const grad = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, r);
            grad.addColorStop(0, 'rgba(255, 0, 0, 0.0)');
            grad.addColorStop(0.8, 'rgba(255, 0, 0, 0.2)');
            grad.addColorStop(1, 'rgba(255, 0, 0, 0.5)');
            ctx.fillStyle = grad;
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.fill();
            
            // Warning border
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 50, 50, 0.8)';
            ctx.setLineDash([20, 15]);
            ctx.lineDashOffset = -time * 20;
            ctx.lineWidth = 3;
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // WARNING text rotating around edge
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff0000';
            ctx.font = 'bold 16px "Exo 2", monospace';
            ctx.fillStyle = '#ff5555';
            ctx.textAlign = 'center';
            for (let i = 0; i < 4; i++) {
                ctx.save();
                ctx.rotate(time * 0.5 + i * Math.PI / 2);
                ctx.translate(0, -r - 10);
                ctx.fillText('WARNING: RADIATION ZONE', 0, 0);
                ctx.restore();
            }
            
            ctx.restore();
        }
        
        // Render training hazards (Black holes, mines)
        if (lesson.hazards) {
            lesson.hazards.forEach(h => {
                if (h.x === -99999) return; // Destroyed
                ctx.save();
                ctx.translate(h.x, h.y);
                
                if (h.type === 'blackhole') {
                    // Mini training blackhole
                    ctx.beginPath();
                    ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0,0,0,0.8)';
                    ctx.fill();
                    
                    // Event horizon glow
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#aa00ff';
                    ctx.beginPath();
                    ctx.strokeStyle = '#df80ff';
                    ctx.lineWidth = 4;
                    ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    // Swirl lines
                    ctx.strokeStyle = '#aa00ff';
                    ctx.lineWidth = 2;
                    ctx.globalAlpha = 0.6;
                    for (let i = 0; i < 5; i++) {
                        ctx.beginPath();
                        ctx.arc(0, 0, h.radius * (0.2 + (i/5) + Math.sin(time*2)/10), time + i, time + i + Math.PI);
                        ctx.stroke();
                    }
                } else if (h.type === 'mine') {
                    // Training mine blast radius
                    ctx.beginPath();
                    ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255,0,0,0.1)';
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255,0,0,0.5)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    
                    // Mine core
                    ctx.beginPath();
                    ctx.fillStyle = '#ff0000';
                    ctx.arc(0, 0, 20 + Math.sin(time*8)*5, 0, Math.PI*2);
                    ctx.fill();
                }
                
                ctx.restore();
            });
        }
    }


    animateExpandedMap() {
        if (!this.game.expandedMapOpen) return;

        const canvas = document.getElementById('fullscreenMapCanvas');
        if (!canvas) {
            console.error('[Map Debug] Canvas not found');
            return;
        }

        console.log('[Map Debug] Rendering expanded map, zoom:', this.game.expandedMapZoom);

        // Resize if needed (handle dynamic window resizing)
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const zoom = this.game.expandedMapZoom;
        const time = Date.now() * 0.001;

        // --- 1. DEEP SPACE BACKGROUND ---
        // Clear with a deep, rich gradient based on player position (subtle shift)
        const bgGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
        bgGradient.addColorStop(0, '#000810');
        bgGradient.addColorStop(0.6, '#000508');
        bgGradient.addColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(zoom, zoom);
        ctx.translate(this.game.expandedMapOffset.x, this.game.expandedMapOffset.y);

        // --- 2. PARALLAX STARFIELD (Background Layers) ---
        // We generate pseudo-random stars based on world coordinates to create an infinite field
        // Layer 1: Distant, slow moving
        this.game.renderMapStars(ctx, 0.5, 0.5, 5000, 15000, '#445566');
        // Layer 2: Mid-distance
        this.game.renderMapStars(ctx, 0.3, 0.8, 3000, 10000, '#6688aa');

        // --- 3. ZONE ATMOSPHERICS ---
        // Draw large, soft radial glows for each zone to give "territory" feel
        Object.values(GALAXY_ZONES).forEach(zone => {
            const dist = zone.distanceRange.min;
            // Skip if way off screen
            // Simple cull: check distance from center of screen in world space to zone center (0,0)
            // But zones are concentric rings, so we just draw them.

            ctx.beginPath();
            ctx.arc(0, 0, dist, 0, Math.PI * 2);
            ctx.fillStyle = zone.glowColor || zone.color;
            ctx.globalAlpha = 0.03; // Very subtle atmosphere
            ctx.lineWidth = 100; // Wide soft edge
            ctx.fill();

            // Zone Boundary Ring
            ctx.beginPath();
            ctx.arc(0, 0, dist, 0, Math.PI * 2);
            ctx.strokeStyle = zone.color;
            ctx.lineWidth = 2 / zoom; // Keep thin regardless of zoom
            ctx.globalAlpha = 0.2;
            ctx.setLineDash([20, 40]); // Dashed border
            ctx.stroke();
            ctx.setLineDash([]);

            // Zone Label (Floating in space)
            // Place label at the top of the ring
            ctx.fillStyle = zone.color;
            ctx.font = `bold ${64}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.4;
            ctx.fillText(zone.name.toUpperCase(), 0, -dist + 200);
        });

        // --- 4. HOLO-GRID ---
        // A perspective grid. Since this is 2D top-down, we draw a rectangular grid that pans.
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
        ctx.lineWidth = 1 / zoom;
        const gridSize = 1000;

        // Calculate visible range to optimize rendering
        // Visible world center: -this.game.expandedMapOffset.x, -this.game.expandedMapOffset.y
        const worldCx = -this.game.expandedMapOffset.x;
        const worldCy = -this.game.expandedMapOffset.y;
        const visibleW = w / zoom;
        const visibleH = h / zoom;

        const startX = Math.floor((worldCx - visibleW) / gridSize) * gridSize;
        const endX = Math.floor((worldCx + visibleW) / gridSize) * gridSize;
        const startY = Math.floor((worldCy - visibleH) / gridSize) * gridSize;
        const endY = Math.floor((worldCy + visibleH) / gridSize) * gridSize;

        ctx.beginPath();
        for (let x = startX; x <= endX; x += gridSize) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }
        ctx.stroke();


        // --- 5. ORBITAL MECHANICS & PLANETS (Cosmetic) ---
        // Procedural planets based on zone
        // We'll use a deterministic random based on index/position
        // (Simplified for now: drawing a few fixed 'planets' per zone would be better but random serves 'world' feel)

        // --- 6. RESOURCE DEPOSITS (Advanced Icons) ---
        this.game.resourceDeposits.forEach(dep => {
            // Pulsing effect
            const pulse = 1 + Math.sin(time * 3 + dep.x * 0.01) * 0.2;

            // Deposit Glow
            const zoneColor = GALAXY_ZONES[dep.zone] ? GALAXY_ZONES[dep.zone].color : '#fff';
            const glowColor = GALAXY_ZONES[dep.zone] ? (GALAXY_ZONES[dep.zone].glowColor || zoneColor) : '#fff';

            // Draw outer glow
            const grad = ctx.createRadialGradient(dep.x, dep.y, 5 * pulse, dep.x, dep.y, 30 * pulse);
            grad.addColorStop(0, glowColor);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(dep.x, dep.y, 40 * pulse, 0, Math.PI * 2);
            ctx.fill();

            // Draw core icon (Diamond shape)
            ctx.globalAlpha = 1;
            ctx.fillStyle = zoneColor;
            const size = 12;
            ctx.beginPath();
            ctx.moveTo(dep.x, dep.y - size);
            ctx.lineTo(dep.x + size, dep.y);
            ctx.lineTo(dep.x, dep.y + size);
            ctx.lineTo(dep.x - size, dep.y);
            ctx.closePath();
            ctx.fill();

            // Label
            if (zoom > 0.8) {
                ctx.fillStyle = '#fff';
                ctx.font = '14px "Segoe UI", sans-serif'; // Cleaner font
                ctx.textAlign = 'center';
                ctx.fillText(dep.name, dep.x, dep.y + 40);

                ctx.font = '10px "Segoe UI", sans-serif';
                ctx.fillStyle = '#aaa';
                ctx.fillText(`Richness: ${(dep.richness * 100).toFixed(0)}% `, dep.x, dep.y + 55);
            }
        });

        // --- 6.5. MINERALS/GEMS (Navigation Aid) ---
        // Show minerals on the map with proper color coding
        const viewW = w / zoom;
        const viewH = h / zoom;
        this.game.minerals.forEach(mineral => {
            // Viewport Cull to ensure map is blazingly fast even with 3000 gems!
            if (Math.abs(mineral.x + this.game.expandedMapOffset.x) > viewW/2 + 100) return;
            if (Math.abs(mineral.y + this.game.expandedMapOffset.y) > viewH/2 + 100) return;

            const mineralInfo = MINERAL_TYPES[mineral.type];
            if (!mineralInfo) return;

            // Glow effect for visibility
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = mineralInfo.color;
            ctx.beginPath();
            ctx.arc(mineral.x, mineral.y, 8 / zoom, 0, Math.PI * 2);
            ctx.fill();

            // Solid marker
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            ctx.arc(mineral.x, mineral.y, 4 / zoom, 0, Math.PI * 2);
            ctx.fill();

            // Show gem type label at higher zoom
            if (zoom > 1.5) {
                ctx.fillStyle = '#fff';
                ctx.font = `${10 / zoom}px Arial`;
                ctx.textAlign = 'center';
                ctx.fillText(mineralInfo.name, mineral.x, mineral.y - 10 / zoom);
            }
        });
        ctx.globalAlpha = 1.0;

        // --- 7. PLAYER SHIP (Detailed HUD Marker) ---
        const shipX = this.game.playerShip.x;
        const shipY = this.game.playerShip.y;

        ctx.translate(shipX, shipY);

        // View Cone (Field of View)
        const fovRadius = 400;
        ctx.rotate(this.game.playerShip.rotation + Math.PI / 2); // Align with ship heading

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, fovRadius, -Math.PI / 6, Math.PI / 6); // 60 degree cone
        ctx.fillStyle = 'rgba(0, 255, 100, 0.1)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 255, 100, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ship Icon (Triangle)
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(14, 14);
        ctx.lineTo(0, 8);
        ctx.lineTo(-14, 14);
        ctx.closePath();
        ctx.fillStyle = '#0f0';
        ctx.shadowColor = '#0f0';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        ctx.restore();

        // --- 8. UI OVERLAYS (Screen Space) ---
        // Coordinates Overlay (Fixed to screen corners)
        ctx.font = '14px Consolas, monospace';
        ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
        ctx.textAlign = 'left';
        ctx.fillText(`SECTOR: [${Math.floor(shipX / 5000)}, ${Math.floor(shipY / 5000)}]`, 20, h - 60);
        ctx.fillText(`COORDS: X ${Math.round(shipX)}  Y ${Math.round(shipY)} `, 20, h - 40);

        // Scale Bar
        const scaleWidth = 200; // pixels
        const scaleDistance = scaleWidth / zoom;
        ctx.beginPath();
        ctx.moveTo(w - 220, h - 40);
        ctx.lineTo(w - 20, h - 40);
        ctx.moveTo(w - 220, h - 45);
        ctx.lineTo(w - 220, h - 35);
        ctx.moveTo(w - 20, h - 45);
        ctx.lineTo(w - 20, h - 35);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(`${Math.round(scaleDistance)} km`, w - 120, h - 50);

        requestAnimationFrame(() => this.animateExpandedMap());
    }



    drawDeepSpaceSpecific() {
        if (!this.game.config.showBackground) return;

        const ctx = this.game.ctx;
        const time = performance.now() * 0.0005;

        // 1. Galaxies
        if (this.game.galaxies && this.game.galaxies.length > 0) {
            this.game.galaxies.forEach(g => {
                if (g.flownOut) return; // Skip if flown out during warp
                ctx.save();
                // Position comes from flyObject during disengage
                ctx.translate(g.x, g.y);

                // During disengage: use scale and alpha from flyObject
                if (this.game.warpDisengaging && g.warpScale !== undefined) {
                    ctx.scale(g.warpScale, g.warpScale);
                    ctx.globalAlpha = g.warpAlpha || 0;
                }

                ctx.rotate(g.angle + time * 0.1);

                const spiralGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, g.size);
                spiralGradient.addColorStop(0, 'rgba(255,255,255,0.8)');
                spiralGradient.addColorStop(0.2, g.color);
                spiralGradient.addColorStop(1, 'transparent');

                ctx.fillStyle = spiralGradient;
                ctx.beginPath();
                for (let i = 0; i < 3; i++) {
                    ctx.rotate(Math.PI * 2 / 3);
                    ctx.ellipse(0, 0, g.size, g.size / 4, 0, 0, Math.PI * 2); // Corrected ellipse center
                }
                ctx.fill();
                ctx.restore();
            });
        }

        // 2. Black Holes
        if (this.game.blackHoles && this.game.blackHoles.length > 0) {
            this.game.blackHoles.forEach(bh => {
                if (bh.flownOut) return; // Skip if flown out during warp
                ctx.save();

                // Position comes from flyObject during disengage
                ctx.translate(bh.x, bh.y);

                // During disengage: use scale and alpha from flyObject
                if (this.game.warpDisengaging && bh.warpScale !== undefined) {
                    ctx.scale(bh.warpScale, bh.warpScale);
                    ctx.globalAlpha = bh.warpAlpha || 0;
                }

                // Accretion disk
                ctx.beginPath();
                ctx.strokeStyle = 'orange';
                ctx.lineWidth = 2;
                ctx.arc(0, 0, bh.size * 1.5, 0, Math.PI * 2);
                ctx.stroke();

                // Event Horizon
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.arc(0, 0, bh.size, 0, Math.PI * 2);
                ctx.fill();

                // Glow
                ctx.shadowColor = 'purple';
                ctx.shadowBlur = 20;
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.restore();
            });
        }

        // 3. Planets (with zoom-based detail and proper Saturn-style rings)
        if (this.game.planets && this.game.planets.length > 0) {
            const zoom = this.game.camera.zoom;
            this.game.planets.forEach(p => {
                if (p.flownOut) return; // Skip if flown out during warp
                ctx.save();

                // Position comes from flyObject during disengage
                ctx.translate(p.x, p.y);

                // During disengage: use scale and alpha from flyObject
                if (this.game.warpDisengaging && p.warpScale !== undefined) {
                    ctx.scale(p.warpScale, p.warpScale);
                    ctx.globalAlpha = p.warpAlpha || 0;
                }

                // Axial rotation over time
                const rotationSpeed = p.rotationSpeed || 0.05;
                ctx.rotate(p.axialTilt + time * rotationSpeed);

                // Size is handled by world scale, but we use effective screen radius for detail tiers
                const screenRadius = p.radius * zoom;
                const detailLevel = Math.min(3, Math.floor(screenRadius / 30)); // 0-3 detail levels

                // === SATURN-STYLE RINGS: Draw back half first ===
                if (p.hasRings) {
                    this.drawPlanetRingsHalf(ctx, p, 'back');
                }

                // Atmospheric glow (outer)
                if (p.hasAtmosphere) {
                    const atmosGrad = ctx.createRadialGradient(0, 0, p.radius * 0.95, 0, 0, p.radius * 1.15);
                    const atmosAlpha = (0.5 + Math.sin(time * 2 + p.textureSeed) * 0.1).toFixed(2);
                    atmosGrad.addColorStop(0, 'transparent');
                    atmosGrad.addColorStop(0.5, p.atmosphereColor + Math.floor(atmosAlpha * 64).toString(16).padStart(2, '0'));
                    atmosGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = atmosGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, p.radius * 1.15, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Planet body with 3D gradient
                const bodyGrad = ctx.createRadialGradient(
                    -p.radius * 0.3, -p.radius * 0.3, 0,
                    0, 0, p.radius
                );
                bodyGrad.addColorStop(0, p.secondaryColor);
                bodyGrad.addColorStop(0.4, p.baseColor);
                bodyGrad.addColorStop(0.8, p.tertiaryColor);
                bodyGrad.addColorStop(1, '#000000');

                ctx.fillStyle = bodyGrad;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Surface texture (procedural bands/patterns based on zoom)
                if (detailLevel >= 1) {
                    ctx.globalAlpha = 0.3;
                    ctx.strokeStyle = p.tertiaryColor;
                    ctx.lineWidth = 2 / zoom;

                    // Draw bands for gas giants
                    if (p.type === 'gas-giant' || p.type === 'ice-giant') {
                        for (let i = -4; i <= 4; i++) {
                            const bandY = p.radius * (i * 0.15);
                            const bandWidth = Math.sqrt(p.radius * p.radius - bandY * bandY);
                            if (bandWidth > 0) {
                                ctx.beginPath();
                                ctx.ellipse(0, bandY, bandWidth, 3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                        }
                    }

                    // Draw continents for terrestrial/ocean
                    if ((p.type === 'terrestrial' || p.type === 'ocean') && detailLevel >= 2) {
                        ctx.fillStyle = p.type === 'ocean' ? p.baseColor : p.secondaryColor;
                        const seed = p.textureSeed;
                        for (let j = 0; j < 5; j++) {
                            const cx = Math.cos(seed + j * 1.2) * p.radius * 0.5;
                            const cy = Math.sin(seed * 0.7 + j) * p.radius * 0.4;
                            const cr = p.radius * (0.15 + Math.sin(seed + j) * 0.1);
                            ctx.beginPath();
                            ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    ctx.globalAlpha = 1;
                }

                // Shadow side
                const shadowGrad = ctx.createLinearGradient(-p.radius, 0, p.radius, 0);
                shadowGrad.addColorStop(0, 'transparent');
                shadowGrad.addColorStop(0.6, 'transparent');
                shadowGrad.addColorStop(1, 'rgba(0,0,0,0.6)');
                ctx.fillStyle = shadowGrad;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // === SATURN-STYLE RINGS: Draw front half on top ===
                if (p.hasRings) {
                    this.drawPlanetRingsHalf(ctx, p, 'front');
                }

                ctx.restore();
            });
        }
    }

    drawMissileBase(ctx, base, time, damaged = false, meltdowns = 0, rx = null, ry = null, rScale = 1.0) {
        ctx.save();

        // Use provided rotated coordinates or fallback to base (which would be non-rotated)
        const finalX = rx !== null ? rx : base.x;
        const finalY = ry !== null ? ry : base.y;

        ctx.translate(finalX, finalY);

        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const size = (base.size || 40) * rScale / safeZoom;
        const alertPulse = base.alertLevel > 0 ? Math.sin(time * 0.01) * 0.3 + 0.7 : 0.5;

        // Hit Flash Logic
        if (base.hitFlash > 0) {
            base.hitFlash--;
            ctx.globalCompositeOperation = 'source-over';

            // White flash override
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(0, 0, size * 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
            return; // Skip normal drawing if flashing
        }

        // 1. DANGER AURA GLOW (pulsing perimeter)
        const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.8);
        let alertColor;
        if (meltdowns > 0) {
            alertColor = `rgba(150, 255, 50, ${0.4 * meltdowns})`; // Nuclear Green
        } else {
            alertColor = base.alertLevel > 0.5 ? `rgba(255, 0, 0, ${0.3 * alertPulse})` : 'rgba(80, 100, 200, 0.15)';
        }

        auraGrad.addColorStop(0, alertColor);
        auraGrad.addColorStop(0.5, meltdowns > 0 ? 'rgba(50, 150, 50, 0.15)' : 'rgba(40, 40, 120, 0.1)');
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(0, 0, size * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // 2. SCANNING LASER (Atmospheric scifi effect)
        if (base.active && !damaged) {
            ctx.save();
            ctx.rotate(base.turretAngle || 0);
            const scanAngle = Math.sin(time * 0.002) * 0.2;
            const scanLen = size * 6;
            const scanGrad = ctx.createLinearGradient(0, 0, scanLen, 0);
            scanGrad.addColorStop(0, `rgba(255, 0, 0, ${0.4 * alertPulse})`);
            scanGrad.addColorStop(1, 'transparent');
            ctx.strokeStyle = scanGrad;
            ctx.lineWidth = 1 / safeZoom;
            ctx.beginPath();
            ctx.moveTo(size * 1.5, 0);
            ctx.lineTo(Math.cos(scanAngle) * scanLen, Math.sin(scanAngle) * scanLen);
            ctx.stroke();
            ctx.restore();
        }

        // Base platform (octagonal military structure)
        ctx.save();
        ctx.rotate(base.rotationPhase);

        // Outer ring
        ctx.fillStyle = damaged ? '#2a1a2e' : '#1a1a2e';
        ctx.strokeStyle = meltdowns > 0 ? '#00ff00' : (base.alertLevel > 0.5 ? '#ff3333' : '#4466aa');
        ctx.lineWidth = 3 / safeZoom;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * size * 1.2;
            const y = Math.sin(angle) * size * 1.2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner platform
        ctx.fillStyle = damaged ? '#352545' : '#252545';
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
            const x = Math.cos(angle) * size * 0.8;
            const y = Math.sin(angle) * size * 0.8;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Rotating turret (aims at player)
        ctx.save();
        ctx.rotate(base.turretAngle);

        // Turret base
        ctx.fillStyle = damaged ? '#443355' : '#333355';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // 5. RAILGUN BARREL ASSEMBLY
        const barrelLength = size * (damaged ? (1.6 - meltdowns * 0.3) : 1.8);
        const barrelWidth = size * 0.35;
        const recoil = base.recoil || 0;

        // Left and Right Rail Rails
        ctx.fillStyle = meltdowns > 0 ? '#448844' : '#555566';
        ctx.fillRect(-size * 0.2 - recoil, -barrelWidth / 2, barrelLength, barrelWidth * 0.3);
        ctx.fillRect(-size * 0.3 - recoil, barrelWidth / 2 - barrelWidth * 0.3, barrelLength, barrelWidth * 0.3);

        // Barrel core energy glow (charged look)
        const chargeAlpha = 0.3 + (base.alertLevel > 0.8 ? 0.4 : 0);
        const chargeGrad = ctx.createLinearGradient(0, 0, barrelLength, 0);
        chargeGrad.addColorStop(0, meltdowns > 0 ? '#22ff44' : '#44aaff');
        chargeGrad.addColorStop(1, 'transparent');
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
        ctx.restore();

        // Mutant green viscous sludge layer (rendered on top of the base during meltdown)
        if (meltdowns > 0) {
            ctx.save();
            ctx.translate(base.x, base.y);
            ctx.globalAlpha = 0.6 + Math.sin(time * 0.01) * 0.2;
            ctx.fillStyle = '#22ff44'; // Neon Green Sludge

            // Draw various viscous blobs dripping/coating the base
            for (let i = 0; i < 6; i++) {
                const blobAngle = (i / 6) * Math.PI * 2 + time * 0.002;
                const blobDist = size * (0.6 + Math.sin(time * 0.005 + i) * 0.4);
                const blobSize = size * (0.3 + Math.cos(time * 0.008 + i) * 0.2) * meltdowns;

                const bx = Math.cos(blobAngle) * blobDist;
                const by = Math.sin(blobAngle) * blobDist;

                ctx.beginPath();
                ctx.arc(bx, by, blobSize, 0, Math.PI * 2);
                ctx.fill();

                // Add highlight to blob for "viscous" look
                ctx.fillStyle = '#88ff88';
                ctx.beginPath();
                ctx.arc(bx - blobSize * 0.3, by - blobSize * 0.3, blobSize * 0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#22ff44';
            }

            // Central sludge buildup
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.5 * meltdowns, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    drawPlanetRingsHalf(ctx, planet, half) {
        const p = planet;
        ctx.save();

        // Create clipping region for front or back half
        ctx.beginPath();
        if (half === 'back') {
            // Back half: top portion of ellipse (behind planet)
            ctx.rect(-p.ringOuterRadius * 1.5, -p.ringOuterRadius, p.ringOuterRadius * 3, p.ringOuterRadius);
        } else {
            // Front half: bottom portion of ellipse (in front of planet)
            ctx.rect(-p.ringOuterRadius * 1.5, 0, p.ringOuterRadius * 3, p.ringOuterRadius);
        }
        ctx.clip();

        // Draw the ring bands
        ctx.globalAlpha = half === 'back' ? 0.4 : 0.7; // Back rings dimmer

        // Multiple ring bands with gradient colors
        for (let i = 0; i < 5; i++) {
            const ringR = p.ringInnerRadius + (p.ringOuterRadius - p.ringInnerRadius) * (i / 5 + 0.1);
            const ringThickness = (p.ringOuterRadius - p.ringInnerRadius) * 0.12;

            // Slight color variation per band
            const hueShift = i * 5;
            ctx.strokeStyle = p.ringColor;
            ctx.lineWidth = ringThickness;

            ctx.beginPath();
            ctx.ellipse(0, 0, ringR, ringR * 0.25, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }



    drawStarShape(ctx, x, y, r) {
        ctx.beginPath();
        const pr = r * 0.5;
        ctx.moveTo(x, y - r);
        ctx.lineTo(x + pr, y - pr);
        ctx.lineTo(x + r, y);
        ctx.lineTo(x + pr, y + pr);
        ctx.lineTo(x, y + r);
        ctx.lineTo(x - pr, y + pr);
        ctx.lineTo(x - r, y);
        ctx.lineTo(x - pr, y - pr);
        ctx.closePath();
        ctx.fill();
    }

}
window.RenderManager = RenderManager;
