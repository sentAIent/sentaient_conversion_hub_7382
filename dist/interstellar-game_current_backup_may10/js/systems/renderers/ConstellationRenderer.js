/**
 * ConstellationRenderer: Handles the core interactive star patterns and connection lines.
 * Phase 4 Modularization.
 */
class ConstellationRenderer {
    constructor(renderManager) {
        this.rm = renderManager;
        this.game = renderManager.game;
        this.clusterCount = 0; // Phase 28: Expose cluster count for HUD
    }

    draw(ctx, time) {
        if (!this.game.stars || this.game.stars.length === 0) return;

        const zoom = this.game.camera.zoom || 1;
        const center = (this.game.physicsManager && this.game.physicsManager.getConstellationCenter) ? 
                       this.game.physicsManager.getConstellationCenter() : 
                       (this.game._cachedRotationCenter || { x: 0, y: 0 });

        const stars = this.game.stars;
        const connectDist = (this.game.config?.maxConnectDist || 180);

        // 0. GROUP STARS INTO CLUSTERS (Islands)
        const clusters = this.groupStarsIntoClusters(stars, connectDist);
        this.clusterCount = clusters.filter(c => c.stars.length >= 2).length;

        // 1. DRAW CONNECTION LINES
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.4)';
        ctx.lineWidth = 1.5 / zoom;
        
        for (let i = 0; i < stars.length; i++) {
            const s1 = stars[i];
            const r1 = this.game.physicsManager.rotate3D(s1.x, s1.y, s1.z || 0, center.x, center.y);
            
            for (let j = i + 1; j < stars.length; j++) {
                const s2 = stars[j];
                const dx = s1.x - s2.x;
                const dy = s1.y - s2.y;
                const distSq = dx*dx + dy*dy;

                if (distSq < connectDist * connectDist) {
                    const r2 = this.game.physicsManager.rotate3D(s2.x, s2.y, s2.z || 0, center.x, center.y);
                    const alpha = 1 - (Math.sqrt(distSq) / connectDist);
                    ctx.globalAlpha = alpha * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(r1.x, r1.y);
                    ctx.lineTo(r2.x, r2.y);
                    ctx.stroke();
                }
            }
        }
        ctx.restore();

        // 2. DRAW CLUSTER TITLES (At Centroids)
        clusters.forEach(cluster => {
            if (cluster.stars.length < 2) return; // Only name groups

            // Calculate Centroid (Visual)
            let avgX = 0, avgY = 0;
            cluster.stars.forEach(s => {
                const r = this.game.physicsManager.rotate3D(s.x, s.y, s.z || 0, center.x, center.y);
                avgX += r.x;
                avgY += r.y;
            });
            avgX /= cluster.stars.length;
            avgY /= cluster.stars.length;

            // Generate/Get Persistent Cluster Name
            if (!cluster.stars[0].clusterName) {
                const prefixes = ['The', 'Imperial', 'Ancient', 'Nova', 'Void', 'Radiant', 'Stellar', 'Cyber', 'Neon'];
                const middles = ['Sigma', 'Alpha', 'Delta', 'Gamma', 'Omega', 'Zeta', 'Kappa', 'Iota'];
                const suffixes = ['Nebula Cluster', 'Expanse', 'Reach', 'Frontier', 'Nexus', 'Void-Gate', 'Cradle'];
                
                const p = prefixes[Math.floor(Math.random() * prefixes.length)] || 'Deep';
                const m = middles[Math.floor(Math.random() * middles.length)] || 'Space';
                const s = suffixes[Math.floor(Math.random() * suffixes.length)] || 'Sector';
                
                const name = `${p} ${m} ${s}`;
                cluster.stars.forEach(st => st.clusterName = name);
            }

            const name = cluster.stars[0].clusterName;
            const labelOpacity = Math.min(1, Math.max(0, (zoom - 0.4) * 2));

            ctx.save();
            ctx.translate(avgX, avgY);
            ctx.fillStyle = `rgba(0, 243, 255, ${labelOpacity * 0.9})`;
            ctx.font = `bold ${16 / zoom}px Orbitron, sans-serif`;
            ctx.textAlign = 'center';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';
            ctx.fillText(name.toUpperCase(), 0, -20 / zoom);
            
            // Sub-info
            ctx.fillStyle = `rgba(255, 255, 255, ${labelOpacity * 0.5})`;
            ctx.font = `${10 / zoom}px Orbitron, sans-serif`;
            ctx.fillText(`${cluster.stars.length} STELLAR NODES DETECTED`, 0, -5 / zoom);
            ctx.restore();
        });

        // 3. DRAW INDIVIDUAL STARS
        stars.forEach(s => {
            const rotated = this.game.physicsManager.rotate3D(s.x, s.y, s.z || 0, center.x, center.y);
            const size = (s.r || 3) * rotated.scale / zoom;
            const glowSize = size * 4;

            ctx.save();
            ctx.translate(rotated.x, rotated.y);

            // Pulse effect
            const phase = s.phase || 0;
            const pulse = 1 + 0.2 * Math.sin(time * 0.005 + phase);
            
            // Draw Glow
            const glowRad = Math.max(0.1, size * 6 * pulse);
            if (isFinite(glowRad)) {
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRad);
                let baseColor = s.color || '#ffffff';
                let rgb = [255, 255, 255];
                if (baseColor.startsWith('#')) {
                    const hex = baseColor.replace('#', '');
                    if (hex.length === 3) {
                        rgb = [parseInt(hex[0]+hex[0], 16), parseInt(hex[1]+hex[1], 16), parseInt(hex[2]+hex[2], 16)];
                    } else if (hex.length === 6) {
                        rgb = [parseInt(hex.slice(0,2), 16), parseInt(hex.slice(2,4), 16), parseInt(hex.slice(4,6), 16)];
                    }
                }
                
                this.rm.safeAddColorStop(grad, 0, `rgba(255, 255, 255, 0.6)`);
                this.rm.safeAddColorStop(grad, 0.2, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.3)`);
                this.rm.safeAddColorStop(grad, 1, "transparent");

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, 0, glowRad, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw Core (Star Shape)
            ctx.fillStyle = s.color || '#ffffff';
            this.drawStarShape(ctx, 0, 0, size * pulse);

            ctx.restore();
        });
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

    groupStarsIntoClusters(stars, connectDist) {
        const visited = new Set();
        const clusters = [];
        const distSqThresh = connectDist * connectDist;

        for (let i = 0; i < stars.length; i++) {
            if (visited.has(stars[i])) continue;

            const cluster = { stars: [] };
            const stack = [stars[i]];
            visited.add(stars[i]);

            while (stack.length > 0) {
                const s1 = stack.pop();
                cluster.stars.push(s1);

                for (let j = 0; j < stars.length; j++) {
                    const s2 = stars[j];
                    if (visited.has(s2)) continue;

                    const dx = s1.x - s2.x;
                    const dy = s1.y - s2.y;
                    if (dx*dx + dy*dy < distSqThresh) {
                        visited.add(s2);
                        stack.push(s2);
                    }
                }
            }
            clusters.push(cluster);
        }
        return clusters;
    }
}

window.ConstellationRenderer = ConstellationRenderer;
