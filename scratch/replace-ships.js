const fs = require('fs');
const file = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/script.js';
let lines = fs.readFileSync(file, 'utf8').split('\n');

const startIdx = 14264; // Line 14265 (0-indexed)
const endIdx = 14608; // Line 14608 (0-indexed, so we delete up to line 14608)

const newShipsStr = `
    drawNewScout(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        const pulse = Math.sin(time * 0.008) * 0.3 + 0.7;
        
        // Sleek manta-ray wings
        ctx.fillStyle = '#181822';
        ctx.strokeStyle = '#334';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(size * 1.8, 0); // nose
        ctx.quadraticCurveTo(size * 0.2, size * 0.8, -size * 0.5, size * 1.5); // wingtip
        ctx.quadraticCurveTo(-size * 0.2, size * 0.4, -size * 0.8, 0); // tail indent
        ctx.quadraticCurveTo(-size * 0.2, -size * 0.4, -size * 0.5, -size * 1.5);
        ctx.quadraticCurveTo(size * 0.2, -size * 0.8, size * 1.8, 0);
        ctx.fill();
        ctx.stroke();

        // Internal glowing veins
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10 * pulse;
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-size * 0.6, 0);
        ctx.lineTo(size * 0.8, 0);
        ctx.moveTo(-size * 0.2, 0);
        ctx.quadraticCurveTo(0, size * 0.5, -size * 0.3, size * 1.2);
        ctx.moveTo(-size * 0.2, 0);
        ctx.quadraticCurveTo(0, -size * 0.5, -size * 0.3, -size * 1.2);
        ctx.stroke();

        // Cockpit/Sensor eye
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 20 * pulse;
        ctx.beginPath();
        ctx.ellipse(size * 1.0, 0, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawNewFighter(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        const pulse = Math.sin(time * 0.005) * 0.5 + 0.5;

        // Heavy Carapace
        ctx.fillStyle = '#221111';
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(size * 1.2, size * 0.3); // right mandible
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.lineTo(-size * 0.8, size * 1.2); // wing
        ctx.lineTo(-size * 1.2, size * 0.8);
        ctx.lineTo(-size * 0.8, 0); // rear
        ctx.lineTo(-size * 1.2, -size * 0.8);
        ctx.lineTo(-size * 0.8, -size * 1.2);
        ctx.lineTo(size * 0.4, -size * 0.4);
        ctx.lineTo(size * 1.2, -size * 0.3); // left mandible
        ctx.lineTo(size * 0.6, 0); // inner mouth
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Core Energy
        ctx.fillStyle = glowColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 15;
        ctx.globalAlpha = 0.8 + 0.2 * pulse;
        ctx.beginPath();
        ctx.arc(-size * 0.2, 0, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Armor plating lines
        ctx.strokeStyle = '#442222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-size * 0.8, 0);
        ctx.lineTo(size * 0.6, 0);
        ctx.moveTo(-size * 0.4, size * 0.6);
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.moveTo(-size * 0.4, -size * 0.6);
        ctx.lineTo(size * 0.4, -size * 0.4);
        ctx.stroke();

        ctx.restore();
    }

    drawNewCruiser(ctx, size, baseColor, glowColor, time) {
        ctx.save();
        
        // Central Monolith Core
        ctx.fillStyle = '#0a0a0a';
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(size * 1.6, 0);
        ctx.lineTo(size * 0.8, size * 0.6);
        ctx.lineTo(-size * 1.4, size * 0.6);
        ctx.lineTo(-size * 1.4, -size * 0.6);
        ctx.lineTo(size * 0.8, -size * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Floating Ring / Field Generators
        ctx.save();
        ctx.rotate(time * 0.002);
        ctx.strokeStyle = \`rgba(0, 255, 255, 0.4)\`;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.4, 0, Math.PI * 2);
        ctx.stroke();
        
        // Nodes on the ring
        for(let i=0; i<3; i++) {
            let angle = (i/3) * Math.PI * 2;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * size * 1.4, Math.sin(angle) * size * 1.4, size * 0.15, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Side Pontoons/Engines
        ctx.fillStyle = '#111';
        ctx.fillRect(-size * 1.2, size * 0.7, size * 1.8, size * 0.4);
        ctx.fillRect(-size * 1.2, -size * 1.1, size * 1.8, size * 0.4);
        
        ctx.strokeStyle = '#333';
        ctx.strokeRect(-size * 1.2, size * 0.7, size * 1.8, size * 0.4);
        ctx.strokeRect(-size * 1.2, -size * 1.1, size * 1.8, size * 0.4);

        // Energy ports
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 15;
        ctx.fillRect(-size * 1.0, size * 0.8, size * 0.4, size * 0.2);
        ctx.fillRect(-size * 1.0, -size * 1.0, size * 0.4, size * 0.2);

        ctx.restore();
    }
`;

lines.splice(startIdx, endIdx - startIdx, newShipsStr);

fs.writeFileSync(file, lines.join('\n'));
console.log('Ships replaced successfully.');
