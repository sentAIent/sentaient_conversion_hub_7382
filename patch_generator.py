with open('binaural-assets/js/cymatic_art_gen.js', 'r') as f:
    js = f.read()

# Replace the generate switch logic to account for indices 59-68
old_switch = '''            const typeIdx = index % 12;

            if (typeIdx === 0) this.drawChladni(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 1) this.drawPolarRose(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 2) this.drawLissajous(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 3) this.drawSpirograph(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 4) this.drawMandala(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 5) this.drawWaveInterference(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 6) this.drawVoronoi(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 7) this.drawFractalSpiral(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 8) this.drawReactionDiffusion(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 9) this.drawMoire(ctx,W,H,cx,cy,pal,index);
            else if (typeIdx === 10) this.drawFlowField(ctx,W,H,cx,cy,pal,index);
            else this.drawKaleidoscope(ctx,W,H,cx,cy,pal,index);'''

new_switch = '''            if (index >= 59 && index <= 63) {
                this.drawPixelStardust(ctx,W,H,cx,cy,pal,index);
            } else if (index >= 64 && index <= 68) {
                this.drawHarmonicGradient(ctx,W,H,cx,cy,pal,index);
            } else {
                const typeIdx = index % 12;
                if (typeIdx === 0) this.drawChladni(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 1) this.drawPolarRose(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 2) this.drawLissajous(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 3) this.drawSpirograph(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 4) this.drawMandala(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 5) this.drawWaveInterference(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 6) this.drawVoronoi(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 7) this.drawFractalSpiral(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 8) this.drawReactionDiffusion(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 9) this.drawMoire(ctx,W,H,cx,cy,pal,index);
                else if (typeIdx === 10) this.drawFlowField(ctx,W,H,cx,cy,pal,index);
                else this.drawKaleidoscope(ctx,W,H,cx,cy,pal,index);
            }'''

js = js.replace(old_switch, new_switch)

# Add the two new methods to the class
methods = '''    static drawPixelStardust(ctx, W, H, cx, cy, pal, idx) {
        const imgData = ctx.createImageData(W,H);
        const seed = idx * 1.5;
        const n = 10 + (idx % 15);
        const m = 5 + (idx % 10);
        const cPalette = [
            [0, 255, 255], [255, 0, 255], [255, 215, 0], [138, 43, 226], [57, 255, 20]
        ];
        for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
            const u = x/W, v = y/H;
            const val = Math.cos(n*Math.PI*u)*Math.cos(m*Math.PI*v) - Math.cos(m*Math.PI*u)*Math.cos(n*Math.PI*v);
            const macro = Math.abs(val);
            
            const gridX = Math.floor(u * 120);
            const gridY = Math.floor(v * 120);
            const h = Math.abs(Math.sin(gridX * 12.9898 + gridY * 78.233 + seed)) * 0.5 + 0.5;
            
            const edge = macro * h * 1.5;
            let ci = Math.floor(h * 4.99);
            if(ci < 0) ci = 0; if(ci > 4) ci = 4;
            const c = cPalette[ci];
            
            const i = (y*W+x)*4;
            imgData.data[i] = Math.min(255, c[0] * edge);
            imgData.data[i+1] = Math.min(255, c[1] * edge);
            imgData.data[i+2] = Math.min(255, c[2] * edge);
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData,0,0);
    }

    static drawHarmonicGradient(ctx, W, H, cx, cy, pal, idx) {
        const imgData = ctx.createImageData(W,H);
        const n = 8 + (idx % 8);
        const m = 12 + (idx % 6);
        const cPalette = [
            [20, 0, 40], [0, 255, 255], [255, 215, 0], [0, 0, 0]
        ];
        for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
            const u = x/W, v = y/H;
            const val = Math.cos(n*Math.PI*u)*Math.cos(m*Math.PI*v) - Math.cos(m*Math.PI*u)*Math.cos(n*Math.PI*v);
            const t = Math.abs(val);
            
            let c;
            if (t < 0.3) {
                const s = t / 0.3;
                c = this.lerp(cPalette[0], cPalette[1], s);
            } else if (t < 0.6) {
                const s = (t - 0.3) / 0.3;
                c = this.lerp(cPalette[1], cPalette[2], s);
            } else {
                const s = (t - 0.6) / 0.4;
                c = this.lerp(cPalette[2], cPalette[3], s);
            }
            
            const i = (y*W+x)*4;
            imgData.data[i] = c[0];
            imgData.data[i+1] = c[1];
            imgData.data[i+2] = c[2];
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData,0,0);
    }

    static rgb(c,a=1){ return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
'''

js = js.replace('    static rgb(c,a=1){ return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }', methods)

with open('binaural-assets/js/cymatic_art_gen.js', 'w') as f:
    f.write(js)

print("Patched cymatic_art_gen.js")
