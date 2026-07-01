/**
 * EntityRenderer: Handles physical world objects (Bases, Drones, Mega-Structures).
 * Phase 4 Modularization.
 */
class EntityRenderer {
    constructor(renderManager) {
        this.rm = renderManager;
        this.game = renderManager.game;
    }

    draw(ctx, time) {
        this.renderSpaceBases(ctx, time);
        this.renderDrones(ctx, time);
        this.renderMegaStructures(ctx, time);
        this.renderAIElements(ctx, time);
    }

    renderSpaceBases(ctx, time) {
        const ship = this.game.playerShip;
        const viewDist = 8000;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const center = (this.game.physicsManager && this.game.physicsManager.getConstellationCenter) ? 
                       this.game.physicsManager.getConstellationCenter() : 
                       (this.game._cachedRotationCenter || { x: 0, y: 0 });

        if (!this.game.spaceBases) return;

        this.game.spaceBases.forEach(base => {
            const dx = base.x - ship.x;
            const dy = base.y - ship.y;
            if (dx*dx+dy*dy > viewDist * viewDist) return;

            const rotated = this.game.physicsManager.rotate3D(base.x, base.y, base.z || 0, center.x, center.y);
            const size = 70 * rotated.scale / safeZoom;

            // TRIBUTE BEAM (Phase 16-1)
            const isCapital = base.planetName === this.game.baseBuilder?.capitalBaseName;
            const hasLogistics = Object.values(base).some(v => v === 'log');
            if (hasLogistics && !isCapital && this.game.baseBuilder?.capitalBase) {
                const cap = this.game.baseBuilder.capitalBase;
                const capRot = this.game.physicsManager.rotate3D(cap.x, cap.y, 0, center.x, center.y);
                
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(rotated.x, rotated.y);
                ctx.lineTo(capRot.x, capRot.y);
                
                const beamPulse = (Math.sin(time * 0.005) + 1) / 2;
                const grad = ctx.createLinearGradient(rotated.x, rotated.y, capRot.x, capRot.y);
                this.rm.safeAddColorStop(grad, 0, `rgba(0, 240, 255, ${0.1 + beamPulse * 0.2})`);
                this.rm.safeAddColorStop(grad, 1, 'rgba(0, 100, 255, 0)');
                
                ctx.strokeStyle = grad;
                ctx.lineWidth = (2 + beamPulse * 3) / safeZoom;
                ctx.setLineDash([20 / safeZoom, 10 / safeZoom]);
                ctx.lineDashOffset = -time * 0.1;
                ctx.stroke();
                ctx.restore();
            }

            ctx.save();
            ctx.translate(rotated.x, rotated.y);

            // Base platform glow
            const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
            this.rm.safeAddColorStop(glow, 0, 'rgba(0, 255, 150, 0.2)');
            this.rm.safeAddColorStop(glow, 1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath(); ctx.arc(0, 0, size * 2, 0, Math.PI * 2); ctx.fill();

            // Structure
            ctx.strokeStyle = '#00ffaa';
            ctx.lineWidth = 2 / safeZoom;
            ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.stroke();

            // Label
            ctx.fillStyle = '#fff';
            ctx.font = `${10 * rotated.scale / safeZoom}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.fillText(base.planetName || "OUTPOST", 0, size + 20);

            // PLANETARY SHIELD (Phase 16-2)
            const hasShield = Object.values(base).some(v => v === 'shield');
            if (hasShield) {
                const shieldRadius = size * 2.5;
                const shieldPulse = (Math.sin(time * 0.003) * 0.1) + 0.9;
                
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, shieldRadius, 0, Math.PI * 2);
                
                const shieldGrad = ctx.createRadialGradient(0, 0, shieldRadius * 0.8, 0, 0, shieldRadius);
                this.rm.safeAddColorStop(shieldGrad, 0, 'rgba(0, 150, 255, 0.0)');
                this.rm.safeAddColorStop(shieldGrad, 0.5, 'rgba(0, 200, 255, 0.2)');
                this.rm.safeAddColorStop(shieldGrad, 1, 'rgba(0, 255, 255, 0.4)');
                
                ctx.fillStyle = shieldGrad;
                ctx.globalAlpha = shieldPulse;
                ctx.fill();
                
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.lineWidth = 3 / safeZoom;
                ctx.stroke();
                
                ctx.setLineDash([10 / safeZoom, 20 / safeZoom]);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.stroke();
                ctx.restore();
            }

            // IMPERIAL CAPITAL CORE (Phase 16-3)
            const isCap = base.planetName === this.game.baseBuilder?.capitalBaseName;
            if (isCap) {
                 ctx.save();
                 const crownPulse = Math.sin(time * 0.002) * 0.2 + 1.2;
                 ctx.strokeStyle = '#ffd700';
                 ctx.lineWidth = 4 / safeZoom;
                 ctx.beginPath(); ctx.arc(0, 0, size * crownPulse, 0, Math.PI * 2); ctx.stroke();
                 
                 for (let i = 0; i < 8; i++) {
                     const ang = (i / 8) * Math.PI * 2 + time * 0.01;
                     ctx.beginPath();
                     ctx.moveTo(Math.cos(ang) * size, Math.sin(ang) * size);
                     ctx.lineTo(Math.cos(ang) * size * 1.5, Math.sin(ang) * size * 1.5);
                     ctx.stroke();
                 }
                 ctx.restore();
            }

            ctx.restore();
        });

        this.renderInfluenceGrid(ctx, time);
    }

    renderDrones(ctx, time) {
        if (!this.game.droneManager) return;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();

        if (this.game.droneManager.drones) {
            this.game.droneManager.drones.forEach(drone => {
                const rotated = this.game.physicsManager.rotate3D(drone.x, drone.y, 0, center.x, center.y);
                const size = 12 * rotated.scale / safeZoom;

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                ctx.rotate(drone.rotation);

                ctx.fillStyle = '#ffcc00';
                ctx.beginPath();
                ctx.moveTo(size, 0); ctx.lineTo(-size * 0.5, -size * 0.8); ctx.lineTo(-size * 0.5, size * 0.8);
                ctx.closePath(); ctx.fill();

                if (Math.random() > 0.3) {
                    ctx.fillStyle = '#00ffff';
                    ctx.beginPath(); ctx.arc(-size * 0.6, 0, size * 0.4, 0, Math.PI * 2); ctx.fill();
                }

                ctx.restore();
            });
        }

        if (this.game.droneManager.platforms) {
            this.game.droneManager.platforms.forEach(p => {
                const rotated = this.game.physicsManager.rotate3D(p.x, p.y, 0, center.x, center.y);
                const size = 15 * rotated.scale / safeZoom;

                ctx.save();
                ctx.translate(rotated.x, rotated.y);
                ctx.rotate(p.angle + Math.PI/2);

                ctx.fillStyle = '#00ffaa';
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1 / safeZoom;
                
                ctx.beginPath();
                ctx.moveTo(0, -size);
                ctx.lineTo(size * 0.7, 0);
                ctx.lineTo(0, size);
                ctx.lineTo(-size * 0.7, 0);
                ctx.closePath();
                ctx.fill(); ctx.stroke();
                
                const pulse = (Math.sin(time * 0.01) + 1) / 2;
                ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
                ctx.beginPath(); ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2); ctx.fill();

                ctx.restore();
            });
        }
    }

    renderMegaStructures(ctx, time) {
        if (!this.game.warpGateManager) return;
        
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const ship = this.game.playerShip;

        this.game.warpGateManager.gates.forEach(struct => {
            const dx = struct.x - ship.x;
            const dy = struct.y - ship.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 20000 * 20000) return;

            const rotated = this.game.physicsManager.rotate3D(struct.x, struct.y, struct.z || 0, center.x, center.y);
            const rx = rotated.x;
            const ry = rotated.y;
            const rScale = rotated.scale;
            const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

            ctx.save();
            ctx.translate(rx, ry);

            if (struct.structType === 'gate') {
                this.drawWarpGate(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'dyson') {
                this.drawDysonSwarm(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'ring') {
                this.drawRingWorld(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'beacon') {
                this.drawGreatBeacon(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'gateway') {
                this.drawAncientGateway(ctx, struct, time, rScale, safeZoom);
            } else if (struct.structType === 'outpost') {
                this.drawDeepSpaceOutpost(ctx, struct, time, rScale, safeZoom);
            }

            ctx.restore();
            
            ctx.save();
            ctx.translate(rx, ry + (struct.radius || 300) * rScale / safeZoom + 100);
            const labelColors = {
                dyson: '#FFD700', ring: '#00FF7F', beacon: '#ffffff', gateway: '#9300ff', outpost: '#00f3ff'
            };
            ctx.fillStyle = labelColors[struct.structType] || '#00f3ff';
            ctx.font = `bold ${14 / safeZoom}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.fillText(`${struct.structType.toUpperCase()}: ${struct.name.toUpperCase()}`, 0, 0);
            ctx.restore();
        });
    }

    drawWarpGate(ctx, gate, time, rScale, safeZoom) {
        const isHero = (gate.x === 0 && gate.y === 0);
        const baseSize = (isHero ? 450 : 300) * rScale / safeZoom;
        const pulse = (Math.sin(time * 0.002) + 1) / 2;
        ctx.rotate(gate.rotation);

        const fieldSize = isHero ? 3.5 : 2.5;
        const grad = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, baseSize * 1.5, [
            { offset: 0, color: isHero ? `rgba(0, 243, 255, ${0.6 + pulse * 0.3})` : `rgba(0, 243, 255, ${0.4 + pulse * 0.2})` },
            { offset: 0.5, color: isHero ? 'rgba(0, 150, 255, 0.2)' : 'rgba(0, 100, 255, 0.1)' },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (isHero) {
            for (let i = 0; i < 3; i++) {
                ctx.save();
                const rotSpeed = time * 0.001 * (i + 1) * (i % 2 === 0 ? 1 : -1);
                ctx.rotate(rotSpeed);
                const r = baseSize * (1.5 + i * 0.45);
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'rgba(0, 243, 255, 0.6)';
                
                const ringGrad = ctx.createLinearGradient(-r, 0, r, 0);
                this.rm.safeAddColorStop(ringGrad, 0, 'rgba(0, 243, 255, 0.9)');
                this.rm.safeAddColorStop(ringGrad, 0.5, 'rgba(255, 255, 255, 0.5)');
                this.rm.safeAddColorStop(ringGrad, 1, 'rgba(0, 243, 255, 0.9)');
                
                ctx.strokeStyle = ringGrad;
                ctx.lineWidth = (6 + i * 2) / safeZoom;
                ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 1.65); ctx.stroke();
                
                ctx.rotate(time * 0.002);
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(r, 0, 5 / safeZoom, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
        }

        ctx.fillStyle = '#fff';
        if (isHero) {
            ctx.shadowBlur = 40 * rScale;
            ctx.shadowColor = '#00f3ff';
        }
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * (isHero ? 0.5 : 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    drawDysonSwarm(ctx, swarm, time, rScale, safeZoom) {
        swarm.panels.forEach((p, i) => {
            const rx = Math.cos(p.angle) * p.orbitRadius * rScale / safeZoom;
            const ry = Math.sin(p.angle) * p.orbitRadius * rScale / safeZoom * 0.3;
            
            ctx.save();
            ctx.translate(rx, ry);
            ctx.rotate(p.angle + Math.PI/2 + p.tilt);
            
            ctx.fillStyle = '#FFD700';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FFD700';
            ctx.globalAlpha = 0.8;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
            
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
            ctx.setLineDash([5, 10]);
            ctx.beginPath();
            ctx.moveTo(0, 0); ctx.lineTo(-rx, -ry); ctx.stroke();
            ctx.restore();
        });
    }

    drawRingWorld(ctx, ring, time, rScale, safeZoom) {
        const r = ring.radius * rScale / safeZoom;
        const w = ring.width * rScale / safeZoom;
        ctx.rotate(ring.rotation);
        
        ctx.strokeStyle = '#2F4F4F';
        ctx.lineWidth = w;
        ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2); ctx.stroke();
        
        ctx.strokeStyle = '#00FF7F';
        ctx.lineWidth = 4 / safeZoom;
        ctx.setLineDash([20, 40]);
        ctx.lineDashOffset = -time * 0.05;
        ctx.beginPath(); ctx.ellipse(0, 0, r - w/3, (r - w/3) * 0.4, 0, 0, Math.PI * 2); ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 255, 127, 0.2)';
        ctx.lineWidth = w * 1.2;
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2); ctx.stroke();
    }

    drawGreatBeacon(ctx, beacon, time, rScale, safeZoom) {
        const baseSize = 500 * rScale / safeZoom;
        const pulse = (Math.sin(time * 0.003) + 1) / 2;
        const charge = beacon.charge || 0;
        ctx.rotate(beacon.rotation);

        const auraGrad = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, baseSize * (2 + charge * 3), [
            { offset: 0, color: `rgba(255, 255, 255, ${0.4 + pulse * 0.2 + charge * 0.4})` },
            { offset: 0.5, color: `rgba(0, 243, 255, ${0.1 + charge * 0.2})` },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = auraGrad;
        ctx.beginPath(); ctx.arc(0, 0, baseSize * (2 + charge * 3), 0, Math.PI * 2); ctx.fill();

        const beamWidth = (40 + Math.sin(time * 0.01) * 20 + charge * 60) * rScale / safeZoom;
        const beamHeight = 5000 * rScale / safeZoom;
        const beamGrad = this.rm.getGradient(ctx, 'linear', -beamWidth/2, 0, beamWidth/2, 0, 0, 0, [
            { offset: 0, color: 'transparent' },
            { offset: 0.5, color: `rgba(255, 255, 255, ${0.8 + charge * 0.2})` },
            { offset: 1, color: 'transparent' }
        ]);
        ctx.fillStyle = beamGrad;
        ctx.fillRect(-beamWidth/2, -beamHeight/2, beamWidth, beamHeight);

        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 20 * (1 + charge * 2);
        ctx.shadowColor = '#00f3ff';
        ctx.beginPath(); ctx.arc(0, 0, baseSize * 0.2, 0, Math.PI * 2); ctx.fill();
    }

    renderAIElements(ctx, time) {
        if (!this.game.aiManager) return;
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);

        this.game.aiManager.outposts.forEach(outpost => {
            const rotated = this.game.physicsManager.rotate3D(outpost.x, outpost.y, outpost.z || 0, center.x, center.y);
            const size = 150 * rotated.scale / safeZoom;
            const pulse = (Math.sin(time * 0.003) + 1) / 2;
            
            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            const grad = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size, [
                { offset: 0, color: outpost.color },
                { offset: 1, color: 'transparent' }
            ]);
            ctx.fillStyle = grad;
            ctx.globalAlpha = 0.6 + pulse * 0.2;
            ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });
    }

    renderInfluenceGrid(ctx, time) {
        if (!this.game.sectorManager) return;
        const influence = this.game.sectorManager.getPlayerInfluence();
        if (influence < 0.25) return; 
        // ... (Hex grid logic can be moved here if needed)
    }
}

window.EntityRenderer = EntityRenderer;
