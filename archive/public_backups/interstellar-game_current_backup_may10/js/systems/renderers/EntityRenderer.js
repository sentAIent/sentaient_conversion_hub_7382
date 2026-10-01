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
        // Fallback for global entities if any remain
    }

    drawSector(ctx, sector, time) {
        this.renderMinerals(ctx, sector.minerals, time);
        this.renderSpaceBases(ctx, sector.spaceBases || [], time); // Note: renamed from structures for clarity if needed, or stick to structures
        this.renderDrones(ctx, sector.drones || [], time);
        this.renderMegaStructures(ctx, sector.structures || [], time);
        this.renderAIElements(ctx, sector.aiElements || [], time);
    }

    renderMinerals(ctx, minerals, time) {
        if (!minerals || minerals.length === 0) return;
        const safeZoom = Math.max(0.01, this.game.camera.zoom || 1);
        const ship = this.game.playerShip;
        const center = this.game._cachedRotationCenter || (ship ? { x: ship.x, y: ship.y } : this.game.getConstellationCenter());
        const canvas = this.game.canvas;
        
        const viewHalfW = (canvas.width / safeZoom) / 2 + 100;
        const viewHalfH = (canvas.height / safeZoom) / 2 + 100;
        const camX = (this.game.camera && typeof this.game.camera.x === 'number') ? (-this.game.camera.x / safeZoom) : this.game.playerShip.x;
        const camY = (this.game.camera && typeof this.game.camera.y === 'number') ? (-this.game.camera.y / safeZoom) : this.game.playerShip.y;

        minerals.forEach(m => {
            if (m.type === 'lotus') {
                this.renderLotus(ctx, m, time, center, safeZoom);
                return;
            }

            // Viewport Culling
            if (Math.abs(m.x - camX) > viewHalfW || Math.abs(m.y - camY) > viewHalfH) return;

            const rotated = this.game.physicsManager.rotate3D(m.x, m.y, m.z || 0, center.x, center.y);
            const pulse = Math.sin(time * 0.003 + (m.phase || 0)) * 0.3 + 0.7;
            const size = (m.size || 5) * pulse * rotated.scale;

            if (!isFinite(size) || size <= 0) return;

            ctx.save();
            ctx.translate(rotated.x, rotated.y);
            
            // Glow effect
            const gradient = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size * 2, [
                { offset: 0, color: m.color || '#fff' },
                { offset: 0.5, color: m.color || '#ffffff' },
                { offset: 1, color: 'transparent' }
            ]);

            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(0, 0, size * 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Core - Outer Diamond (Crystalline)
            ctx.fillStyle = '#e8f4ff';
            ctx.globalAlpha = 0.8;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(0, -size * 1.2);
            ctx.lineTo(size * 0.8, 0);
            ctx.lineTo(0, size * 1.2);
            ctx.lineTo(-size * 0.8, 0);
            ctx.closePath();
            ctx.fill();

            // Inner Colored Diamond (The actual mineral core)
            ctx.fillStyle = m.color || '#fff';
            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 5;
            ctx.shadowColor = m.color || '#fff';
            ctx.beginPath();
            ctx.moveTo(0, -size * 0.5);
            ctx.lineTo(size * 0.35, 0);
            ctx.lineTo(0, size * 0.5);
            ctx.lineTo(-size * 0.35, 0);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        });
    }

    renderLotus(ctx, lotus, time, center, safeZoom) {
        const rotated = this.game.physicsManager.rotate3D(lotus.x, lotus.y, lotus.z || 0, center.x, center.y);
        const size = lotus.size * rotated.scale;
        if (!isFinite(size) || size <= 0) return;

        ctx.save();
        ctx.translate(rotated.x, rotated.y);
        const glowPhase = (time * 0.002 + (lotus.phase || 0)) % (Math.PI * 2);
        const glow = 0.5 + Math.sin(glowPhase) * 0.5;

        // Outer Glow
        const grad = this.rm.getGradient(ctx, 'radial', 0, 0, 0, 0, 0, size * 2, [
            { offset: 0, color: `rgba(255, 105, 180, ${0.4 * glow})` },
            { offset: 1, color: 'rgba(255, 105, 180, 0)' }
        ]);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw Mindwave Lotus Image
        if (this.game.lotusImage && this.game.lotusImage.complete) {
            const drawSize = size * 2.5; 
            ctx.drawImage(this.game.lotusImage, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        } else {
            // Fallback: Inner Core Glow
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffb6c1';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }


    renderSpaceBases(ctx, spaceBases, time) {
        const ship = this.game.playerShip;
        const viewDist = 8000;
        const center = (this.game.physicsManager && this.game.physicsManager.getConstellationCenter) ? 
                       this.game.physicsManager.getConstellationCenter() : 
                       (this.game._cachedRotationCenter || { x: 0, y: 0 });

        if (!spaceBases) return;

        spaceBases.forEach(base => {
            const dx = base.x - ship.x;
            const dy = base.y - ship.y;
            if (dx*dx+dy*dy > viewDist * viewDist) return;

            const rotated = this.game.physicsManager.rotate3D(base.x, base.y, 0, center.x, center.y);
            const size = 70 * rotated.scale;

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
                ctx.lineWidth = (2 + beamPulse * 3);
                ctx.setLineDash([20, 10]);
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
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.stroke();

            // Label
            ctx.fillStyle = '#fff';
            ctx.font = `${10 * rotated.scale}px Orbitron`;
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
                ctx.lineWidth = 3;
                ctx.stroke();
                
                ctx.setLineDash([10, 20]);
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
                 ctx.lineWidth = 4;
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

    renderDrones(ctx, drones, time) {
        if (!drones) return;
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();

        drones.forEach(drone => {
                const rotated = this.game.physicsManager.rotate3D(drone.x, drone.y, 0, center.x, center.y);
                const size = 12 * rotated.scale;

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

    renderMegaStructures(ctx, structures, time) {
        if (!structures) return;
        
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();
        const ship = this.game.playerShip;

        structures.forEach(struct => {
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
            ctx.translate(rx, ry + (struct.radius || 300) * rScale + 100);
            const labelColors = {
                dyson: '#FFD700', ring: '#00FF7F', beacon: '#ffffff', gateway: '#9300ff', outpost: '#00f3ff'
            };
            ctx.fillStyle = labelColors[struct.structType] || '#00f3ff';
            ctx.font = `bold ${14}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.fillText(`${struct.structType.toUpperCase()}: ${struct.name.toUpperCase()}`, 0, 0);
            ctx.restore();
        });
    }

    drawWarpGate(ctx, gate, time, rScale, safeZoom) {
        const isHero = (gate.x === 0 && gate.y === 0);
        const baseSize = (isHero ? 450 : 300) * rScale;
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
                ctx.lineWidth = (6 + i * 2);
                ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 1.65); ctx.stroke();
                
                ctx.rotate(time * 0.002);
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(r, 0, 5, 0, Math.PI * 2); ctx.fill();
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
            const rx = Math.cos(p.angle) * p.orbitRadius * rScale;
            const ry = Math.sin(p.angle) * p.orbitRadius * rScale * 0.3;
            
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
        const r = ring.radius * rScale;
        const w = ring.width * rScale;
        ctx.rotate(ring.rotation);
        
        ctx.strokeStyle = '#2F4F4F';
        ctx.lineWidth = w;
        ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2); ctx.stroke();
        
        ctx.strokeStyle = '#00FF7F';
        ctx.lineWidth = 4;
        ctx.setLineDash([20, 40]);
        ctx.lineDashOffset = -time * 0.05;
        ctx.beginPath(); ctx.ellipse(0, 0, r - w/3, (r - w/3) * 0.4, 0, 0, Math.PI * 2); ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 255, 127, 0.2)';
        ctx.lineWidth = w * 1.2;
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2); ctx.stroke();
    }

    drawGreatBeacon(ctx, beacon, time, rScale, safeZoom) {
        const baseSize = 500 * rScale;
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

        const beamWidth = (40 + Math.sin(time * 0.01) * 20 + charge * 60) * rScale;
        const beamHeight = 5000 * rScale;
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

    renderAIElements(ctx, aiElements, time) {
        if (!aiElements) return;
        const center = this.game._cachedRotationCenter || this.game.getConstellationCenter();

        aiElements.forEach(outpost => {
            const rotated = this.game.physicsManager.rotate3D(outpost.x, outpost.y, outpost.z || 0, center.x, center.y);
            const size = 150 * rotated.scale;
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
        const influence = this.game.sectorManager.getPlayerInfluence ? this.game.sectorManager.getPlayerInfluence() : 0.5;
        if (influence < 0.1) return; 

        const canvas = this.game.canvas;
        const camera = this.game.camera;
        const zoom = camera.zoom || 1;
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        const hexSize = 100 * zoom;
        const h = hexSize * Math.sqrt(3);
        const w = hexSize * 2;
        
        const offsetX = (camera.x % (w * 0.75)) + canvas.width / 2;
        const offsetY = (camera.y % h) + canvas.height / 2;
        
        ctx.strokeStyle = `rgba(0, 243, 255, ${influence * 0.03})`;
        ctx.lineWidth = 1;
        
        // Draw a simple staggered grid to represent hexes without heavy math
        for (let x = -w; x < canvas.width + w; x += w * 0.75) {
            for (let y = -h; y < canvas.height + h; y += h) {
                const cx = x + offsetX;
                const cy = y + offsetY + ((x / (w * 0.75)) % 2 === 0 ? 0 : h / 2);
                
                if (cx < -w || cx > canvas.width + w || cy < -h || cy > canvas.height + h) continue;
                
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const ang = (i / 6) * Math.PI * 2;
                    const px = cx + Math.cos(ang) * hexSize;
                    const py = cy + Math.sin(ang) * hexSize;
                    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
        
        ctx.restore();
    }
}

window.EntityRenderer = EntityRenderer;
