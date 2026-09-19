/**
 * CymaticArtGenerator — Procedural generative art for every cymatic button.
 * Each button gets a unique, mathematically-driven visual. No two are alike.
 */
class CymaticArtGenerator {
    static PALETTES = [
        [[255,100,220],[80,0,180],[0,220,255]],
        [[255,200,50],[255,80,0],[180,0,120]],
        [[0,255,180],[0,100,255],[200,0,255]],
        [[255,50,80],[255,180,0],[0,255,100]],
        [[100,200,255],[0,50,200],[180,0,255]],
        [[255,220,100],[255,120,200],[100,0,180]],
        [[0,255,220],[80,180,255],[200,100,255]],
        [[255,80,120],[80,255,200],[0,120,255]],
        [[200,255,0],[0,200,180],[120,0,255]],
        [[255,150,50],[200,50,200],[50,200,255]],
        [[220,0,100],[0,180,220],[180,255,0]],
        [[150,0,255],[0,255,150],[255,200,0]],
    ];

    static generate(canvas, index) {
        try {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const W = canvas.width = 200;
            const H = canvas.height = 200;
            const cx = W/2, cy = H/2;
            const pal = this.PALETTES[index % this.PALETTES.length];
            const seed = index * 137.508 + 42;
            const pHash = (x) => Math.sin(x * 127.1 + seed) * 0.5 + 0.5;

            // Black background
            ctx.fillStyle = '#000';
            ctx.fillRect(0,0,W,H);

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

            // Vignette
            const vg = ctx.createRadialGradient(cx,cy,W*0.2,cx,cy,W*0.7);
            vg.addColorStop(0,'rgba(0,0,0,0)');
            vg.addColorStop(1,'rgba(0,0,0,0.7)');
            ctx.fillStyle = vg;
            ctx.fillRect(0,0,W,H);
        } catch (e) {
            console.error('[CymaticArtGenerator] Error rendering idx:', index, e);
        }
    }

    static rgb(c,a=1){ return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
    static lerp(a,b,t){ return a.map((v,i)=>Math.round(v+(b[i]-v)*t)); }

    static drawChladni(ctx,W,H,cx,cy,pal,idx) {
        const n = (idx % 7) + 2;
        const m = ((idx * 3) % 5) + 1;
        const imgData = ctx.createImageData(W,H);
        for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
            const u = x/W, v = y/H;
            const val = Math.cos(n*Math.PI*u)*Math.cos(m*Math.PI*v) - Math.cos(m*Math.PI*u)*Math.cos(n*Math.PI*v);
            const t = Math.abs(val);
            const edge = Math.exp(-t*t*12);
            const c = this.lerp(pal[0],pal[1],t);
            const glow = this.lerp(c,pal[2],edge*0.8);
            const i = (y*W+x)*4;
            imgData.data[i] = glow[0]*edge + c[0]*(1-edge)*0.15;
            imgData.data[i+1] = glow[1]*edge + c[1]*(1-edge)*0.15;
            imgData.data[i+2] = glow[2]*edge + c[2]*(1-edge)*0.15;
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData,0,0);
    }

    static drawPolarRose(ctx,W,H,cx,cy,pal,idx) {
        const petals = (idx % 8) + 3;
        const d = (idx % 3) + 1;
        const k = petals / d;
        ctx.lineWidth = 1.5;
        for (let layer=0;layer<3;layer++) {
            ctx.beginPath();
            const offset = layer * 0.3;
            for (let a=0;a<=Math.PI*2*d;a+=0.005) {
                const r = (W*0.38) * Math.cos(k*a + offset);
                const x = cx + r*Math.cos(a);
                const y = cy + r*Math.sin(a);
                a===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
            }
            ctx.strokeStyle = this.rgb(pal[layer % 3], 0.7 - layer*0.15);
            ctx.stroke();
        }
        // Glow center
        const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,30);
        cg.addColorStop(0,this.rgb(pal[2],0.8));
        cg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = cg;
        ctx.fillRect(0,0,W,H);
    }

    static drawLissajous(ctx,W,H,cx,cy,pal,idx) {
        const a = (idx % 5) + 1;
        const b = ((idx*2) % 7) + 2;
        const delta = (idx * 0.7) % Math.PI;
        ctx.lineWidth = 1.2;
        for (let layer=0;layer<4;layer++) {
            ctx.beginPath();
            const phase = layer * 0.4;
            for (let t=0;t<=Math.PI*2;t+=0.003) {
                const x = cx + (W*0.38)*Math.sin(a*t + delta + phase);
                const y = cy + (H*0.38)*Math.sin(b*t + phase*0.5);
                t===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
            }
            ctx.strokeStyle = this.rgb(pal[layer % 3], 0.6);
            ctx.stroke();
        }
    }

    static drawSpirograph(ctx,W,H,cx,cy,pal,idx) {
        const R = 60 + (idx % 20)*2;
        const r = 15 + (idx % 15);
        const d = 20 + (idx % 30);
        ctx.lineWidth = 0.8;
        for (let layer=0;layer<3;layer++) {
            ctx.beginPath();
            const off = layer*0.5;
            for (let t=0;t<Math.PI*20;t+=0.01) {
                const x = cx + (R-r)*Math.cos(t+off) + d*Math.cos((R-r)/r*t+off);
                const y = cy + (R-r)*Math.sin(t+off) + d*Math.sin((R-r)/r*t+off);
                t===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
            }
            ctx.strokeStyle = this.rgb(pal[layer], 0.5);
            ctx.stroke();
        }
    }

    static drawMandala(ctx,W,H,cx,cy,pal,idx) {
        const segments = (idx % 8) + 6;
        for (let s=0;s<segments;s++) {
            const angle = (s/segments)*Math.PI*2;
            ctx.save();
            ctx.translate(cx,cy);
            ctx.rotate(angle);
            // Draw ornate petal
            for (let r=20;r<W*0.45;r+=8) {
                const wobble = Math.sin(r*0.1 + idx)*5;
                const w = Math.max(0.1, 3 + Math.sin(r*0.05 + idx*0.3)*8);
                ctx.beginPath();
                ctx.arc(wobble, -r, w, 0, Math.PI*2);
                const t = r/(W*0.45);
                ctx.fillStyle = this.rgb(this.lerp(pal[0],pal[2],t), 0.4+t*0.3);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    static drawWaveInterference(ctx,W,H,cx,cy,pal,idx) {
        const sources = [];
        const count = 3 + (idx % 4);
        for (let i=0;i<count;i++) {
            const angle = (i/count)*Math.PI*2 + idx*0.5;
            sources.push({
                x: cx + Math.cos(angle)*W*0.25,
                y: cy + Math.sin(angle)*H*0.25,
                freq: 15 + (idx+i*7)%20
            });
        }
        const imgData = ctx.createImageData(W,H);
        for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
            let val = 0;
            sources.forEach(s => {
                const d = Math.sqrt((x-s.x)**2 + (y-s.y)**2);
                val += Math.sin(d/s.freq*Math.PI*2);
            });
            val = val/count;
            const t = val*0.5+0.5;
            const c = this.lerp(pal[0],pal[1],t);
            const bright = Math.abs(val);
            const i = (y*W+x)*4;
            imgData.data[i] = c[0]*bright;
            imgData.data[i+1] = c[1]*bright;
            imgData.data[i+2] = c[2]*bright;
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData,0,0);
    }

    static drawVoronoi(ctx,W,H,cx,cy,pal,idx) {
        const points = [];
        const count = 12 + (idx % 8);
        for (let i=0;i<count;i++) {
            points.push({
                x: (Math.sin(i*127.1+idx*311.7)*0.5+0.5)*W,
                y: (Math.sin(i*269.5+idx*183.3)*0.5+0.5)*H
            });
        }
        const imgData = ctx.createImageData(W,H);
        for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
            let d1=1e9, d2=1e9, ci=0;
            points.forEach((p,i) => {
                const d = Math.sqrt((x-p.x)**2+(y-p.y)**2);
                if (d<d1) { d2=d1; d1=d; ci=i; }
                else if (d<d2) d2=d;
            });
            const edge = 1 - Math.exp(-(d2-d1)*0.3);
            const c = this.lerp(pal[ci%3], pal[(ci+1)%3], d1/100);
            const i4 = (y*W+x)*4;
            imgData.data[i4] = c[0]*edge*0.7;
            imgData.data[i4+1] = c[1]*edge*0.7;
            imgData.data[i4+2] = c[2]*edge*0.7;
            imgData.data[i4+3] = 255;
        }
        ctx.putImageData(imgData,0,0);
    }

    static drawFractalSpiral(ctx,W,H,cx,cy,pal,idx) {
        const arms = (idx % 5) + 2;
        const twist = 0.15 + (idx % 10)*0.03;
        ctx.lineWidth = 1;
        for (let arm=0;arm<arms;arm++) {
            const baseAngle = (arm/arms)*Math.PI*2;
            ctx.beginPath();
            for (let t=0;t<W*0.48;t+=0.5) {
                const angle = baseAngle + t*twist;
                const x = cx + t*Math.cos(angle);
                const y = cy + t*Math.sin(angle);
                t===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
            }
            const g = ctx.createLinearGradient(0,0,W,H);
            g.addColorStop(0,this.rgb(pal[arm%3],0.8));
            g.addColorStop(1,this.rgb(pal[(arm+1)%3],0.3));
            ctx.strokeStyle = g;
            ctx.stroke();
        }
    }

    static drawReactionDiffusion(ctx,W,H,cx,cy,pal,idx) {
        const imgData = ctx.createImageData(W,H);
        const scale = 0.03 + (idx%10)*0.005;
        const ox = idx*17.3, oy = idx*23.7;
        for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
            let v = 0;
            v += Math.sin((x+ox)*scale)*Math.cos((y+oy)*scale);
            v += Math.sin(((x+ox)*0.7+(y+oy)*1.3)*scale*1.5)*0.5;
            v += Math.cos(((x+ox)*1.1-(y+oy)*0.9)*scale*2.0)*0.25;
            const t = v*0.5+0.5;
            const band = Math.abs(Math.sin(v*Math.PI*3));
            const c = this.lerp(pal[0],pal[1],t);
            const c2 = this.lerp(c,pal[2],band);
            const i = (y*W+x)*4;
            imgData.data[i] = c2[0]*0.7;
            imgData.data[i+1] = c2[1]*0.7;
            imgData.data[i+2] = c2[2]*0.7;
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData,0,0);
    }

    static drawMoire(ctx,W,H,cx,cy,pal,idx) {
        const imgData = ctx.createImageData(W,H);
        const f1 = 8 + (idx%12);
        const f2 = 10 + ((idx*3)%15);
        const offX = (idx%5)*15, offY = (idx%7)*12;
        for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
            const d1 = Math.sqrt((x-cx)**2+(y-cy)**2);
            const d2 = Math.sqrt((x-cx-offX)**2+(y-cy-offY)**2);
            const v1 = Math.sin(d1/f1*Math.PI*2)*0.5+0.5;
            const v2 = Math.sin(d2/f2*Math.PI*2)*0.5+0.5;
            const v = v1*v2;
            const c = this.lerp(pal[0],pal[2],v);
            const i = (y*W+x)*4;
            imgData.data[i] = c[0]; imgData.data[i+1] = c[1];
            imgData.data[i+2] = c[2]; imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData,0,0);
    }

    static drawFlowField(ctx,W,H,cx,cy,pal,idx) {
        const scale = 0.015 + (idx%8)*0.003;
        const lines = 200 + idx*5;
        ctx.lineWidth = 0.8;
        for (let l=0;l<lines;l++) {
            let x = (Math.sin(l*127.1+idx*73.7)*0.5+0.5)*W;
            let y = (Math.cos(l*269.5+idx*37.3)*0.5+0.5)*H;
            ctx.beginPath();
            ctx.moveTo(x,y);
            for (let s=0;s<20;s++) {
                const angle = Math.sin(x*scale)*Math.cos(y*scale)*Math.PI*4 + idx*0.1;
                x += Math.cos(angle)*3;
                y += Math.sin(angle)*3;
                ctx.lineTo(x,y);
            }
            const t = l/lines;
            ctx.strokeStyle = this.rgb(this.lerp(pal[0],pal[2],t), 0.4);
            ctx.stroke();
        }
    }

    static drawKaleidoscope(ctx,W,H,cx,cy,pal,idx) {
        const segments = (idx % 6) + 4;
        const shapes = 15 + (idx % 10);
        for (let seg=0;seg<segments;seg++) {
            ctx.save();
            ctx.translate(cx,cy);
            ctx.rotate((seg/segments)*Math.PI*2);
            for (let s=0;s<shapes;s++) {
                const r = 10 + s*5;
                const size = Math.max(0.1, 3 + Math.sin(s*0.5+idx)*4);
                const wobble = Math.cos(s*0.3+idx*0.7)*8;
                ctx.beginPath();
                ctx.arc(wobble, -r, size, 0, Math.PI*2);
                const t = s/shapes;
                ctx.fillStyle = this.rgb(this.lerp(pal[s%3],pal[(s+1)%3],t), 0.5);
                ctx.fill();
            }
            ctx.restore();
        }
    }
}

// On DOM load, find all buttons with data-cymatic-idx and generate art in batches
document.addEventListener('DOMContentLoaded', () => {
    const canvases = Array.from(document.querySelectorAll('canvas.cymatic-gen-art'));
    let i = 0;
    function renderNextBatch() {
        const batchSize = 6; // render 6 per frame to avoid blocking the main thread
        for (let j = 0; j < batchSize && i < canvases.length; j++, i++) {
            const c = canvases[i];
            const idx = parseInt(c.dataset.idx, 10);
            if (!isNaN(idx)) CymaticArtGenerator.generate(c, idx);
        }
        if (i < canvases.length) {
            requestAnimationFrame(renderNextBatch);
        }
    }
    requestAnimationFrame(renderNextBatch);
});
