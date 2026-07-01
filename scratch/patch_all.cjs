const fs = require('fs');
let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// 1. Fix white blowout by caching the Mindwave Sun
if (!code.includes('getMindwaveSunCache')) {
    code = code.replace(`    drawMindwaveSun(ctx, color, radius, isBlackHole = false) {`,
`    getMindwaveSunCache(color, isBlackHole = false) {
        this.sunCache = this.sunCache || {};
        const cacheKey = color + (isBlackHole ? '_bh' : '');
        if (this.sunCache[cacheKey]) return this.sunCache[cacheKey];
        
        const c = document.createElement('canvas');
        const s = 150; // Cache size
        c.width = s * 2;
        c.height = s * 2;
        const ctx = c.getContext('2d');
        
        ctx.translate(s, s);
        const scale = s / 42;
        ctx.scale(scale, scale);

        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = color;
        ctx.shadowBlur = isBlackHole ? 10 : 20; // Reduced to prevent white-box blowout
        ctx.fillStyle = color;
        
        for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.rotate(i * Math.PI / 4);
            ctx.beginPath();
            ctx.moveTo(-4, -15);
            ctx.lineTo(4, -15);
            ctx.lineTo(0, -42);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.rotate(i * Math.PI / 4 + Math.PI / 8);
            ctx.beginPath();
            ctx.moveTo(-2, -15);
            ctx.lineTo(2, -15);
            ctx.lineTo(0, -32);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        ctx.beginPath();
        if (isBlackHole) {
            ctx.fillStyle = 'black';
            ctx.arc(0, 0, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = 'purple';
            ctx.shadowBlur = 10;
        } else {
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.stroke();

        this.sunCache[cacheKey] = c;
        return c;
    }

    drawMindwaveSun(ctx, color, radius, isBlackHole = false) {`);
}

// Update drawMindwaveSun to use the cache
if (!code.includes('const cachedSun = this.getMindwaveSunCache(color, isBlackHole);')) {
    code = code.replace(/    drawMindwaveSun[\s\S]*?ctx\.restore\(\);\n    \}/, 
`    drawMindwaveSun(ctx, color, radius, isBlackHole = false) {
        const cachedSun = this.getMindwaveSunCache(color, isBlackHole);
        ctx.drawImage(cachedSun, -radius, -radius, radius * 2, radius * 2);
    }`);
}

// 2. Galaxies culling and wrapping
code = code.replace(/const wrapRadius = 60000;/, 'const wrapRadius = Math.max(15000, 60000 / Math.max(1, Math.pow(zoom, 0.6)));');
// Remove strict old culling from galaxies
code = code.replace(/const distToCamX = cx - \(-this\.camera\.x \/ zoom\);\n                const distToCamY = cy - \(-this\.camera\.y \/ zoom\);\n                const buffer = Math\.max\(g\.size \* 5, 4000 \/ zoom\);\n                if \(Math\.abs\(distToCamX\) > buffer \|\| Math\.abs\(distToCamY\) > buffer\) return;/, '');

// 3. Black holes wrapping and culling
code = code.replace(/const wrapRadius = 40000;/, 'const wrapRadius = Math.max(10000, 40000 / Math.max(1, Math.pow(zoom, 0.6)));');
// The old code didn't wrap black holes, but my diff showed it did? Let's check if it exists
if (!code.includes('while (dx > wrapRadius) dx -= wrapRadius * 2')) {
    code = code.replace(/const cx = bh\.x \+ this\.playerShip\.x \* para;\n                const cy = bh\.y \+ this\.playerShip\.y \* para;/, 
`                let dx = bh.x - this.playerShip.x;
                let dy = bh.y - this.playerShip.y;
                if (!this.bgWarpMode) {
                    while (dx > wrapRadius) dx -= wrapRadius * 2;
                    while (dx < -wrapRadius) dx += wrapRadius * 2;
                    while (dy > wrapRadius) dy -= wrapRadius * 2;
                    while (dy < -wrapRadius) dy += wrapRadius * 2;
                }
                const cx = this.playerShip.x + dx;
                const cy = this.playerShip.y + dy;`);
}
code = code.replace(/const screenX = w\/2 \+ this\.camera\.x \+ cx \* zoom;[\s\S]*?if \(screenX < -buffer.*return;/, '');

// 4. Nebulae wrapping and culling
code = code.replace(/const wrapRadius = 80000;/, 'const wrapRadius = Math.max(20000, 80000 / Math.max(1, Math.pow(zoom, 0.6)));');
// old nebulae culling:
code = code.replace(/const screenX = w\/2 \+ this\.camera\.x \+ cx \* zoom;[\s\S]*?if \(screenX < -buffer.*return;/, '');

// 5. Alien Ships size
code = code.replace(/const para = s\.parallax \|\| 0\.4;\n                \n                let dx = s\.x - this\.playerShip\.x \* para;/, 
`const para = s.parallax || 0.4;
                const bgZoom = Math.pow(this.camera.zoom, 0.4);
                const size = s.size * bgZoom * 0.4;
                const zoom = this.camera.zoom;
                
                let dx = s.x - this.playerShip.x * para;`);
code = code.replace(/const size = s\.size;\n                const zoom = this\.camera\.zoom;/, '');

// 6. Matrix Float (if Math.floor exists, remove it, else it's already using float)
code = code.replace(/Math\.floor\(stream\.y - \(i \* stream\.size\)\)/g, '(stream.y - (i * stream.size))');

fs.writeFileSync('public/interstellar-game/script.js', code);
console.log("Patched successfully!");
