export class SpatialEngine {
    constructor(ctx, destination) {
        this.ctx = ctx;
        this.destination = destination;
        
        // Ensure listener is set up (needed for HRTF)
        const listener = this.ctx.listener;
        if (listener.positionX) {
            listener.positionX.value = 0;
            listener.positionY.value = 0;
            listener.positionZ.value = 0;
            listener.forwardX.value = 0;
            listener.forwardY.value = 0;
            listener.forwardZ.value = -1;
            listener.upX.value = 0;
            listener.upY.value = 1;
            listener.upZ.value = 0;
        } else {
            listener.setPosition(0, 0, 0);
            listener.setOrientation(0, 0, -1, 0, 1, 0);
        }

        this.orbitActive = false;
        this.orbitSpeed = 0.3; // Radians per second (slower, more meditative orbit)
        this.orbitRadius = 3; // Distance from listener
        
        this.panners = new Set();
        this.lastTime = 0;
        this.angle = 0;
        this.animationFrameId = null;

        this._orbitLoop = this._orbitLoop.bind(this);
    }

    createSpatialNode() {
        const panner = this.ctx.createPanner();
        panner.panningModel = 'HRTF';
        panner.distanceModel = 'inverse';
        panner.refDistance = 1;
        panner.maxDistance = 10000;
        panner.rolloffFactor = 1;
        panner.coneInnerAngle = 360;
        panner.coneOuterAngle = 0;
        panner.coneOuterGain = 0;

        // Start in front
        if (panner.positionX) {
            panner.positionX.value = 0;
            panner.positionY.value = 0;
            panner.positionZ.value = -this.orbitRadius;
        } else {
            panner.setPosition(0, 0, -this.orbitRadius);
        }

        panner.connect(this.destination);
        this.panners.add(panner);
        return panner;
    }

    removeSpatialNode(panner) {
        if (this.panners.has(panner)) {
            panner.disconnect();
            this.panners.delete(panner);
        }
    }

    setOrbitActive(active) {
        if (this.orbitActive === active) return;
        this.orbitActive = active;
        
        if (active) {
            this.lastTime = performance.now();
            this._orbitLoop(this.lastTime);
        } else {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            this._resetPositions();
        }
    }

    _orbitLoop(time) {
        if (!this.orbitActive) return;

        const dt = (time - this.lastTime) / 1000;
        this.lastTime = time;
        
        this.angle += this.orbitSpeed * dt;
        
        const x = Math.sin(this.angle) * this.orbitRadius;
        const z = -Math.cos(this.angle) * this.orbitRadius;
        
        this.panners.forEach(panner => {
            if (panner.positionX) {
                // Using AudioParam smoothing
                panner.positionX.setTargetAtTime(x, this.ctx.currentTime, 0.05);
                panner.positionZ.setTargetAtTime(z, this.ctx.currentTime, 0.05);
            } else {
                panner.setPosition(x, 0, z);
            }
        });

        this.animationFrameId = requestAnimationFrame(this._orbitLoop);
    }

    _resetPositions() {
        this.panners.forEach((panner, index) => {
            // Distribute them evenly or just reset to center
            const x = (index % 2 === 0 ? -1 : 1) * ((index%3) * 0.5);
            if (panner.positionX) {
                panner.positionX.setTargetAtTime(x, this.ctx.currentTime, 1.0);
                panner.positionZ.setTargetAtTime(-this.orbitRadius, this.ctx.currentTime, 1.0);
            } else {
                panner.setPosition(x, 0, -this.orbitRadius);
            }
        });
    }
}
