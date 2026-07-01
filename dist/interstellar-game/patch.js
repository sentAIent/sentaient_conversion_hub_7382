const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf8');

// Replace drawBackgroundElements
code = code.replace(
    /drawBackgroundElements\(\) \{[\s\S]*?(?=\n    drawDeepSpaceSpecific\(\))/g,
`drawBackgroundElements() {
        if (!this.config.showBackground) return;

        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx_offset = w / 2;
        const cy_offset = h / 2;

        // 1. Background Stars (from all active styles)
        if (this.backgroundStars && this.backgroundStars.length > 0) {
            this.backgroundStars.forEach(s => {
                const para = s.parallax || 0.1;
                let sx = (s.x + this.camera.x * para) % w;
                if (sx < 0) sx += w;
                let sy = (s.y + this.camera.y * para) % h;
                if (sy < 0) sy += h;

                ctx.fillStyle = s.color || "white";
                ctx.globalAlpha = s.alpha;
                ctx.beginPath();
                ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }

        // 2. Nebulae (from nebula + deep-space styles)
        if (this.nebulae && this.nebulae.length > 0) {
            ctx.globalCompositeOperation = 'screen';
            this.nebulae.forEach(n => {
                if (n.flownOut) return;

                let scale = 1.0;
                let alpha = 1.0;
                if (this.warpDisengaging && n.warpScale !== undefined) {
                    scale = n.warpScale || 0.01;
                    alpha = n.warpAlpha || 0;
                }

                const para = n.parallax || 0.2;
                const cx = n.x + this.camera.x * para + cx_offset;
                const cy = n.y + this.camera.y * para + cy_offset;

                const scaledSize = Math.max(0.1, n.size * scale);
                const scaledAlpha = n.alpha * alpha;

                if (cx < -scaledSize || cx > w + scaledSize || cy < -scaledSize || cy > h + scaledSize) return;

                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, scaledSize);
                grad.addColorStop(0, n.color);
                grad.addColorStop(1, 'transparent');

                ctx.globalAlpha = scaledAlpha;
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(cx, cy, scaledSize, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
        }

        // 2.5 Moving Cosmic Stars (shooting stars with tails)
        if (this.activeStyles.has('deep-space') && this.shootingStars && this.shootingStars.length > 0) {
            this.shootingStars.forEach(s => {
                const para = s.parallax || 0.5;
                const cx = s.x + this.camera.x * para + cx_offset;
                const cy = s.y + this.camera.y * para + cy_offset;

                if (cx < -100 || cx > w + 100 || cy < -100 || cy > h + 100) return;

                ctx.save();
                const tailX = cx - s.vx * s.tailLength;
                const tailY = cy - s.vy * s.tailLength;

                const tailGrad = ctx.createLinearGradient(tailX, tailY, cx, cy);
                tailGrad.addColorStop(0, 'transparent');
                tailGrad.addColorStop(0.7, s.color + '40');
                tailGrad.addColorStop(1, s.color);

                ctx.strokeStyle = tailGrad;
                ctx.lineWidth = s.size * 0.8;
                ctx.lineCap = 'round';
                ctx.globalAlpha = s.alpha;

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(cx, cy);
                ctx.stroke();

                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.alpha + 0.3;
                ctx.beginPath();
                ctx.arc(cx, cy, s.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            ctx.globalAlpha = 1;
        }

        // 3. Spacecraft (from alien style) - ENHANCED RENDERING
        if (this.activeStyles.has('alien') && this.spacecraft && this.spacecraft.length > 0) {
            const time = performance.now() * 0.001;
            this.spacecraft.forEach(s => {
                if (s.flownOut) return;

                const para = s.parallax || 0.4;
                const cx = s.x + this.camera.x * para + cx_offset;
                const cy = s.y + this.camera.y * para + cy_offset;

                if (cx < -200 || cx > w + 200 || cy < -200 || cy > h + 200) return;

                ctx.save();
                ctx.translate(cx, cy);

                if (this.warpDisengaging && s.warpScale !== undefined) {
                    ctx.scale(s.warpScale, s.warpScale);
                    ctx.globalAlpha = s.warpAlpha || 0;
                }

                if (s.rotationSpeed) s.rotation += s.rotationSpeed;

                const size = s.size;
                const zoom = this.camera.zoom;
                const angle = Math.atan2(s.vy, s.vx);

                if (s.hasShield) {
                    const shieldPulse = Math.sin(time * 2 + s.shieldPhase) * 0.3 + 0.4;
                    ctx.globalAlpha = shieldPulse * 0.4;
                    const shieldGrad = ctx.createRadialGradient(0, 0, size * 0.5, 0, 0, size * 1.5);
                    shieldGrad.addColorStop(0, 'transparent');
                    shieldGrad.addColorStop(0.7, s.shieldColor || 'rgba(100,200,255,0.3)');
                    shieldGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = shieldGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                if (s.beamActive && s.shipClass === 'saucer') {
                    const beamPulse = Math.sin(time * 5) * 0.2 + 0.6;
                    ctx.globalAlpha = beamPulse * 0.5;
                    const beamGrad = ctx.createLinearGradient(0, size * 0.2, 0, size * 3);
                    beamGrad.addColorStop(0, s.beamColor || '#88ff88');
                    beamGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = beamGrad;
                    ctx.beginPath();
                    ctx.moveTo(-size * 0.3, size * 0.2);
                    ctx.lineTo(-size * 0.8, size * 3);
                    ctx.lineTo(size * 0.8, size * 3);
                    ctx.lineTo(size * 0.3, size * 0.2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                if (s.shipClass !== 'saucer') ctx.rotate(angle);

                if (s.shipClass !== 'saucer' && s.shipClass !== 'probe') {
                    ctx.globalAlpha = 0.7;
                    const trailLength = size * 2;
                    const engineSpacing = size * 0.25;
                    const engineCount = s.engineCount || 2;

                    for (let i = 0; i < engineCount; i++) {
                        const offsetY = (i - (engineCount - 1) / 2) * engineSpacing;
                        const flicker = 0.7 + Math.sin(time * 15 + s.detailSeed + i) * 0.3;
                        const trailGrad = ctx.createLinearGradient(-size * 0.7, offsetY, -size * 0.7 - trailLength * flicker, offsetY);
                        trailGrad.addColorStop(0, s.engineGlow || '#ffffff');
                        trailGrad.addColorStop(0.15, s.engineColor || '#00aaff');
                        trailGrad.addColorStop(1, 'transparent');

                        ctx.fillStyle = trailGrad;
                        ctx.beginPath();
                        ctx.moveTo(-size * 0.65, offsetY - 4);
                        ctx.quadraticCurveTo(-size * 0.7 - trailLength * 0.5 * flicker, offsetY, -size * 0.7 - trailLength * flicker, offsetY);
                        ctx.quadraticCurveTo(-size * 0.7 - trailLength * 0.5 * flicker, offsetY, -size * 0.65, offsetY + 4);
                        ctx.closePath();
                        ctx.fill();
                    }
                    ctx.globalAlpha = 1;
                }

                const hullGrad = ctx.createLinearGradient(0, -size * 0.5, 0, size * 0.5);
                hullGrad.addColorStop(0, s.hullHighlight || '#ccc');
                hullGrad.addColorStop(0.3, s.hullColor || '#888');
                hullGrad.addColorStop(1, s.hullShadow || '#333');
                ctx.fillStyle = hullGrad;
                ctx.strokeStyle = s.hullHighlight || '#ddd';
                ctx.lineWidth = 1.5 / zoom;

                if (s.shipClass === 'saucer') {
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size, size * 0.25, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    const domeGrad = ctx.createRadialGradient(-size * 0.1, -size * 0.15, 0, 0, -size * 0.05, size * 0.4);
                    domeGrad.addColorStop(0, '#ffffff');
                    domeGrad.addColorStop(0.3, s.domeColor || '#88ffff');
                    domeGrad.addColorStop(1, 'rgba(0,50,50,0.8)');
                    ctx.fillStyle = domeGrad;
                    ctx.beginPath();
                    ctx.ellipse(0, -size * 0.08, size * 0.35, size * 0.25, 0, Math.PI, 0);
                    ctx.fill();
                } else if (s.shipClass === 'star-dreadnought') {
                    ctx.beginPath();
                    ctx.moveTo(size * 1.2, 0);
                    for (let i = 0; i < 6; i++) {
                        const angle = (i / 6) * Math.PI * 2;
                        ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'quantum-scout') {
                    for (let i = 0; i < 3; i++) {
                        ctx.save();
                        ctx.rotate(time * (2 + i) + i);
                        ctx.strokeStyle = '#00aaff';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, size * (0.6 + i * 0.3), size * 0.2, 0, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.restore();
                    }
                } else if (s.shipClass === 'void-fighter') {
                    ctx.beginPath();
                    ctx.moveTo(size * 0.9, 0);
                    ctx.lineTo(size * 0.2, -size * 0.5);
                    ctx.lineTo(-size * 0.6, -size * 0.3);
                    ctx.lineTo(-size * 0.6, size * 0.3);
                    ctx.lineTo(size * 0.2, size * 0.5);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'nebula-cruiser') {
                    const hullGrad2 = ctx.createLinearGradient(-size, 0, size, 0);
                    hullGrad2.addColorStop(0, '#606080');
                    hullGrad2.addColorStop(0.5, '#8080a0');
                    hullGrad2.addColorStop(1, '#505070');
                    ctx.fillStyle = hullGrad2;
                    ctx.beginPath();
                    ctx.moveTo(size * 1.2, 0);
                    ctx.lineTo(size * 0.7, -size * 0.08);
                    ctx.lineTo(-size * 0.5, -size * 0.12);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size * 0.5, size * 0.12);
                    ctx.lineTo(size * 0.7, size * 0.08);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    ctx.fillStyle = '#7070a0';
                    ctx.beginPath();
                    ctx.moveTo(size * 0.2, 0);
                    ctx.lineTo(-size * 0.3, -size * 0.6);
                    ctx.lineTo(-size * 0.6, -size * 0.4);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(size * 0.2, 0);
                    ctx.lineTo(-size * 0.3, size * 0.6);
                    ctx.lineTo(-size * 0.6, size * 0.4);
                    ctx.closePath();
                    ctx.fill();
                } else if (s.shipClass === 'bio-corvette') {
                    const bioGrad = ctx.createLinearGradient(-size, 0, size, 0);
                    bioGrad.addColorStop(0, '#4a0066');
                    bioGrad.addColorStop(0.5, '#9900cc');
                    bioGrad.addColorStop(1, '#660099');
                    ctx.fillStyle = bioGrad;
                    ctx.beginPath();
                    ctx.moveTo(size * 0.8, 0);
                    ctx.bezierCurveTo(size * 0.6, -size * 0.4, size * 0.2, -size * 0.5, -size * 0.3, -size * 0.3);
                    ctx.bezierCurveTo(-size * 0.7, 0, -size * 0.3, size * 0.3, size * 0.2, size * 0.5);
                    ctx.bezierCurveTo(size * 0.6, size * 0.4, size * 0.8, 0, size * 0.8, 0);
                    ctx.fill();
                } else if (s.shipClass === 'warp-strider') {
                    const hullGrad2 = ctx.createLinearGradient(-size, 0, size, 0);
                    hullGrad2.addColorStop(0, '#606060');
                    hullGrad2.addColorStop(0.5, '#a0a0a0');
                    hullGrad2.addColorStop(1, '#505050');
                    ctx.fillStyle = hullGrad2;
                    ctx.beginPath();
                    ctx.moveTo(size * 0.8, 0);
                    ctx.lineTo(size * 0.3, -size * 0.15);
                    ctx.lineTo(-size * 0.6, -size * 0.15);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size * 0.6, size * 0.15);
                    ctx.lineTo(size * 0.3, size * 0.15);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#707070';
                    ctx.fillRect(-size * 0.7, -size * 0.5, size * 0.4, size * 0.08);
                    ctx.fillRect(-size * 0.7, size * 0.42, size * 0.4, size * 0.08);
                } else if (s.shipClass === 'prism-destroyer') {
                    const hullGrad2 = ctx.createLinearGradient(-size, -size, size, size);
                    hullGrad2.addColorStop(0, '#c0c0c0');
                    hullGrad2.addColorStop(0.5, '#e8e8e8');
                    hullGrad2.addColorStop(1, '#707070');
                    ctx.fillStyle = hullGrad2;
                    ctx.beginPath();
                    ctx.moveTo(size, 0);
                    ctx.lineTo(size * 0.3, -size * 0.6);
                    ctx.lineTo(-size * 0.5, -size * 0.5);
                    ctx.lineTo(-size * 0.8, 0);
                    ctx.lineTo(-size * 0.5, size * 0.5);
                    ctx.lineTo(size * 0.3, size * 0.6);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else if (s.shipClass === 'stellar-barge') {
                    const hullGrad2 = ctx.createLinearGradient(-size, 0, size, 0);
                    hullGrad2.addColorStop(0, '#4a3820');
                    hullGrad2.addColorStop(0.5, '#8B6F47');
                    hullGrad2.addColorStop(1, '#3a2810');
                    ctx.fillStyle = hullGrad2;
                    ctx.fillRect(-size * 0.7, -size * 0.35, size * 1.3, size * 0.7);
                    ctx.fillStyle = '#5a4830';
                    ctx.beginPath();
                    ctx.moveTo(size * 0.7, -size * 0.25);
                    ctx.lineTo(size, 0);
                    ctx.lineTo(size * 0.7, size * 0.25);
                    ctx.closePath();
                    ctx.fill();
                } else if (s.shipClass === 'cyber-sentry') {
                    const eyeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.4);
                    eyeGrad.addColorStop(0, '#ff0000');
                    eyeGrad.addColorStop(0.5, '#880000');
                    eyeGrad.addColorStop(1, '#220000');
                    ctx.fillStyle = eyeGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
                    ctx.fill();
                    for (let i = 0; i < 8; i++) {
                        const angle = (i / 8) * Math.PI * 2 + time;
                        ctx.strokeStyle = '#ff0000';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(angle) * size * 0.4, Math.sin(angle) * size * 0.4);
                        ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8);
                        ctx.stroke();
                    }
                } else if (s.shipClass === 'aether-wing') {
                    const grad = ctx.createLinearGradient(-size, 0, size, 0);
                    grad.addColorStop(0, 'rgba(0,100,255,0)');
                    grad.addColorStop(0.5, 'rgba(100,200,255,0.6)');
                    grad.addColorStop(1, 'rgba(0,100,255,0)');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.moveTo(-size * 0.8, -size * 0.6);
                    ctx.lineTo(size * 0.8, 0);
                    ctx.lineTo(-size * 0.8, size * 0.6);
                    ctx.closePath();
                    ctx.fill();
                } else if (s.shipClass === 'death-sphere') {
                    const sphereGrad = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size);
                    sphereGrad.addColorStop(0, '#505050');
                    sphereGrad.addColorStop(0.5, '#303030');
                    sphereGrad.addColorStop(1, '#101010');
                    ctx.fillStyle = sphereGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    const laserGrad = ctx.createRadialGradient(size * 0.4, -size * 0.4, 0, size * 0.4, -size * 0.4, size * 0.12);
                    laserGrad.addColorStop(0, '#00ff00');
                    laserGrad.addColorStop(0.5, '#00aa00');
                    laserGrad.addColorStop(1, 'rgba(0,170,0,0)');
                    ctx.fillStyle = laserGrad;
                    ctx.beginPath();
                    ctx.arc(size * 0.4, -size * 0.4, size * 0.1, 0, Math.PI * 2);
                    ctx.fill();
                } else if (s.shipClass === 'tie-fighter') {
                    const cockpitGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.3);
                    cockpitGrad.addColorStop(0, '#606060');
                    cockpitGrad.addColorStop(0.7, '#303030');
                    cockpitGrad.addColorStop(1, '#101010');
                    ctx.fillStyle = cockpitGrad;
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                        const px = Math.cos(angle) * size * 0.25;
                        const py = Math.sin(angle) * size * 0.25;
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    const panelGrad = ctx.createLinearGradient(-size, -size, size, size);
                    panelGrad.addColorStop(0, '#404040');
                    panelGrad.addColorStop(0.5, '#505050');
                    panelGrad.addColorStop(1, '#303030');
                    ctx.fillStyle = panelGrad;
                    ctx.fillRect(-size * 1.2, -size * 0.8, size * 0.8, size * 1.6);
                    ctx.strokeRect(-size * 1.2, -size * 0.8, size * 0.8, size * 1.6);
                    ctx.fillRect(size * 0.4, -size * 0.8, size * 0.8, size * 1.6);
                    ctx.strokeRect(size * 0.4, -size * 0.8, size * 0.8, size * 1.6);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }

                if (s.shipClass !== 'probe' && s.shipClass !== 'saucer') {
                    const lightPulse = Math.sin(time * 3 + (s.lightPhase || 0)) * 0.5 + 0.5;
                    ctx.fillStyle = s.lightColor || '#ff00ff';
                    ctx.globalAlpha = lightPulse;
                    ctx.beginPath();
                    ctx.arc(size * 0.85, 0, 3 / zoom, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#00ff00';
                    ctx.beginPath();
                    ctx.arc(-size * 0.5, -size * 0.6, 2 / zoom, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#ff0000';
                    ctx.beginPath();
                    ctx.arc(-size * 0.5, size * 0.6, 2 / zoom, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
                ctx.restore();
            });
        }
    }`
);

code = code.replace(
    /drawDeepSpaceSpecific\(\) \{[\s\S]*?(?=\n    \/\/ Helper method)/g,
`drawDeepSpaceSpecific() {
        if (!this.config.showBackground) return;

        const ctx = this.ctx;
        const time = performance.now() * 0.0005;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx_offset = w / 2;
        const cy_offset = h / 2;

        // 1. Galaxies
        if (this.galaxies && this.galaxies.length > 0) {
            this.galaxies.forEach(g => {
                if (g.flownOut) return;

                const para = g.parallax || 0.3;
                const cx = g.x + this.camera.x * para + cx_offset;
                const cy = g.y + this.camera.y * para + cy_offset;

                if (cx < -g.size || cx > w + g.size || cy < -g.size || cy > h + g.size) return;

                ctx.save();
                ctx.translate(cx, cy);

                if (this.warpDisengaging && g.warpScale !== undefined) {
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
                    ctx.ellipse(0, 0, g.size, g.size / 4, 0, 0, Math.PI * 2);
                }
                ctx.fill();
                ctx.restore();
            });
        }

        // 2. Black Holes
        if (this.blackHoles && this.blackHoles.length > 0) {
            this.blackHoles.forEach(bh => {
                if (bh.flownOut) return;

                const para = bh.parallax || 0.5;
                const cx = bh.x + this.camera.x * para + cx_offset;
                const cy = bh.y + this.camera.y * para + cy_offset;

                if (cx < -bh.size*2 || cx > w + bh.size*2 || cy < -bh.size*2 || cy > h + bh.size*2) return;

                ctx.save();
                ctx.translate(cx, cy);

                if (this.warpDisengaging && bh.warpScale !== undefined) {
                    ctx.scale(bh.warpScale, bh.warpScale);
                    ctx.globalAlpha = bh.warpAlpha || 0;
                }

                ctx.beginPath();
                ctx.strokeStyle = 'orange';
                ctx.lineWidth = 2;
                ctx.arc(0, 0, bh.size * 1.5, 0, Math.PI * 2);
                ctx.stroke();

                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.arc(0, 0, bh.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowColor = 'purple';
                ctx.shadowBlur = 20;
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.restore();
            });
        }

        // 3. Planets (with zoom-based detail and proper Saturn-style rings)
        if (this.planets && this.planets.length > 0) {
            const zoom = this.camera.zoom;
            this.planets.forEach(p => {
                if (p.flownOut) return;

                const para = p.parallax || 0.8;
                const cx = p.x + this.camera.x * para + cx_offset;
                const cy = p.y + this.camera.y * para + cy_offset;
                
                const screenRadius = p.radius * zoom;
                if (cx < -screenRadius*3 || cx > w + screenRadius*3 || cy < -screenRadius*3 || cy > h + screenRadius*3) return;

                ctx.save();
                ctx.translate(cx, cy);

                if (this.warpDisengaging && p.warpScale !== undefined) {
                    ctx.scale(p.warpScale, p.warpScale);
                    ctx.globalAlpha = p.warpAlpha || 0;
                }

                const rotationSpeed = p.rotationSpeed || 0.05;
                ctx.rotate(p.axialTilt + time * rotationSpeed);

                const detailLevel = Math.min(3, Math.floor(screenRadius / 30));

                if (p.hasRings) {
                    this.drawPlanetRingsHalf(ctx, p, 'back');
                }

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

                if (detailLevel >= 1) {
                    ctx.globalAlpha = 0.3;
                    ctx.strokeStyle = p.tertiaryColor;
                    ctx.lineWidth = 2 / zoom;

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

                    if ((p.type === 'terrestrial' || p.type === 'ocean') && detailLevel >= 2) {
                        ctx.fillStyle = p.type === 'ocean' ? p.baseColor : p.secondaryColor;
                        const seed = p.textureSeed;
                        for (let j = 0; j < 5; j++) {
                            const scx = Math.cos(seed + j * 1.2) * p.radius * 0.5;
                            const scy = Math.sin(seed * 0.7 + j) * p.radius * 0.4;
                            const cr = p.radius * (0.15 + Math.sin(seed + j) * 0.1);
                            ctx.beginPath();
                            ctx.arc(scx, scy, cr, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    ctx.globalAlpha = 1;
                }

                const shadowGrad = ctx.createLinearGradient(-p.radius, 0, p.radius, 0);
                shadowGrad.addColorStop(0, 'transparent');
                shadowGrad.addColorStop(0.6, 'transparent');
                shadowGrad.addColorStop(1, 'rgba(0,0,0,0.6)');
                ctx.fillStyle = shadowGrad;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.fill();

                if (p.hasRings) {
                    this.drawPlanetRingsHalf(ctx, p, 'front');
                }

                ctx.restore();
            });
        }
    }`
);

fs.writeFileSync('script.js', code);
console.log('Script updated successfully.');
