const fs = require('fs');
let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

code = code.replace(
`                const para = 0.0;
                let dx = bh.x - this.playerShip.x;
                let dy = bh.y - this.playerShip.y;
                if (!this.bgWarpMode) {
                    while (dx > wrapRadius) dx -= wrapRadius * 2;
                    while (dx < -wrapRadius) dx += wrapRadius * 2;
                    while (dy > wrapRadius) dy -= wrapRadius * 2;
                    while (dy < -wrapRadius) dy += wrapRadius * 2;
                }
                const cx = this.playerShip.x + dx;
                const cy = this.playerShip.y + dy;

                

                ctx.save();
                
                // Reset transform to native screen resolution to prevent blurry radial gradients
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.translate(screenX, screenY);`,
`                const para = 0.0;
                let dx = bh.x - this.playerShip.x;
                let dy = bh.y - this.playerShip.y;
                
                const wrapRadius = Math.max(10000, 40000 / Math.max(1, Math.pow(zoom, 0.6)));
                if (!this.bgWarpMode) {
                    while (dx > wrapRadius) dx -= wrapRadius * 2;
                    while (dx < -wrapRadius) dx += wrapRadius * 2;
                    while (dy > wrapRadius) dy -= wrapRadius * 2;
                    while (dy < -wrapRadius) dy += wrapRadius * 2;
                }
                const cx = this.playerShip.x + dx;
                const cy = this.playerShip.y + dy;

                const screenX = w/2 + this.camera.x + cx * zoom;
                const screenY = h/2 + this.camera.y + cy * zoom;

                ctx.save();
                
                // Reset transform to native screen resolution to prevent blurry radial gradients
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.translate(screenX, screenY);`);

// For galaxies, since they use translate(cx, cy) and don't reset transform, it's fine.
// BUT WAIT, for Black Holes I did: `code.replace(/const cx = bh\.x.../)`.
// But my regex for black hole replacement was: `code = code.replace(/const cx = bh\.x \+ this\.playerShip\.x \* para;\n                const cy = bh\.y \+ this\.playerShip\.y \* para;/, ...)`
// Let's just fix the whole Black Holes block up to translate.

fs.writeFileSync('public/interstellar-game/script.js', code);
console.log("Patched BH!");
