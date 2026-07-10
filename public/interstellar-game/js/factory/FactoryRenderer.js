export class FactoryRenderer {
    constructor(factory, canvasId) {
        this.factory = factory;
        this.canvas = document.getElementById(canvasId);
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
        }
        
        this.animationFrame = null;
        this.time = 0;
    }
    
    start() {
        if (!this.canvas) return;
        this.time = 0;
        this.animate();
    }
    
    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    animate() {
        this.time += 0.05;
        this.render();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    render() {
        if (!this.ctx) return;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        
        // Clear
        this.ctx.clearRect(0, 0, w, h);
        
        const chassis = this.factory.getChassisData(this.factory.currentChassis);
        if (!chassis) return;
        
        // Draw glow aura
        const pulse = Math.sin(this.time) * 0.2 + 0.8;
        const gradient = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
        gradient.addColorStop(0, chassis.color + '44'); // 44 is hex alpha for ~25%
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, w, h);
        
        // Set up holographic drawing style
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Slowly rotate ship
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(Math.sin(this.time * 0.2) * 0.1);
        
        // Draw Chassis Base
        this.drawChassis(chassis.id, chassis.color, pulse);
        
        // Draw Equipments
        if (this.factory.equipped.engines) {
            this.drawAttachment(this.factory.equipped.engines, 'engines');
        }
        if (this.factory.equipped.weapons) {
            this.drawAttachment(this.factory.equipped.weapons, 'weapons');
        }
        if (this.factory.equipped.shields) {
            this.drawAttachment(this.factory.equipped.shields, 'shields');
        }
        
        this.ctx.restore();
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    drawChassis(id, color, pulse) {
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color + '22'; // slight fill
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 15;
        
        this.ctx.beginPath();
        if (id === 'interceptor') {
            this.ctx.moveTo(0, -80);
            this.ctx.lineTo(40, 40);
            this.ctx.lineTo(0, 20);
            this.ctx.lineTo(-40, 40);
        } else if (id === 'cruiser') {
            this.ctx.moveTo(0, -100);
            this.ctx.lineTo(60, 60);
            this.ctx.lineTo(20, 40);
            this.ctx.lineTo(-20, 40);
            this.ctx.lineTo(-60, 60);
        } else if (id === 'carrier') {
            this.ctx.moveTo(0, -120);
            this.ctx.lineTo(80, 80);
            this.ctx.lineTo(40, 80);
            this.ctx.lineTo(0, 60);
            this.ctx.lineTo(-40, 80);
            this.ctx.lineTo(-80, 80);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        // Engine glow core
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10 + (pulse * 5), 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.shadowBlur = 30 * pulse;
        this.ctx.fill();
    }
    
    drawAttachment(itemId, category) {
        // Just generic placeholder drawing for attachments based on category
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 20;
        
        let color = '#fff';
        if (category === 'weapons') color = '#ff0055';
        if (category === 'engines') color = '#00f3ff';
        if (category === 'shields') color = '#00ff66';
        
        this.ctx.strokeStyle = color;
        this.ctx.shadowColor = color;
        
        this.ctx.beginPath();
        if (category === 'weapons') {
            // Draw dual blasters
            this.ctx.moveTo(-50, -20);
            this.ctx.lineTo(-50, -60);
            this.ctx.moveTo(50, -20);
            this.ctx.lineTo(50, -60);
        } else if (category === 'engines') {
            // Draw thruster flares
            const flare = Math.random() * 20;
            this.ctx.moveTo(-20, 40);
            this.ctx.lineTo(-20, 80 + flare);
            this.ctx.moveTo(20, 40);
            this.ctx.lineTo(20, 80 + flare);
        } else if (category === 'shields') {
            // Draw energy bubble
            this.ctx.arc(0, -10, 120, 0, Math.PI * 2);
        }
        this.ctx.stroke();
    }
}
