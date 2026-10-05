class PhysicsManager {
    constructor(game) {
        this.game = game;
    }

    rotate3D(x, y, z, centerX, centerY) {
        // Convert degrees to radians
        const radX = this.game.rotationX * Math.PI / 180;
        const radY = this.game.rotationY * Math.PI / 180;
        const radZ = this.game.rotationZ * Math.PI / 180;

        // Translate to origin (center of view)
        let px = x - centerX;
        let py = y - centerY;
        let pz = z;

        // Rotation around X axis
        let y1 = py * Math.cos(radX) - pz * Math.sin(radX);
        let z1 = py * Math.sin(radX) + pz * Math.cos(radX);
        py = y1;
        pz = z1;

        // Rotation around Y axis
        let x1 = px * Math.cos(radY) + pz * Math.sin(radY);
        z1 = -px * Math.sin(radY) + pz * Math.cos(radY);
        px = x1;
        pz = z1;

        // Rotation around Z axis
        x1 = px * Math.cos(radZ) - py * Math.sin(radZ);
        y1 = px * Math.sin(radZ) + py * Math.cos(radZ);
        px = x1;
        py = y1;

        // Simple perspective projection (optional depth effect)
        const fov = 800;
        const den = fov + pz;
        const scale = (Math.abs(den) < 0.001) ? 1000 : fov / den;

        // Translate back
        return {
            x: px * scale + centerX,
            y: py * scale + centerY,
            scale: scale
        };
    }

    inverseRotate3D(x, y, centerX, centerY) {
        // Negate angles for inverse rotation
        const radX = -this.game.rotationX * Math.PI / 180;
        const radY = -this.game.rotationY * Math.PI / 180;
        const radZ = -this.game.rotationZ * Math.PI / 180;

        // Translate to origin
        let px = x - centerX;
        let py = y - centerY;
        let pz = 0; // Assume we are clicking on the plane passing through center

        // Inverse Order: X^-1( Y^-1( Z^-1( P ) ) )
        // Note: Forward was RotZ(RotY(RotX(P))). Inverse is RotXinv(RotYinv(RotZinv(P))).

        // 1. Inverse Z Rotation
        let x1 = px * Math.cos(radZ) - py * Math.sin(radZ);
        let y1 = px * Math.sin(radZ) + py * Math.cos(radZ);
        px = x1;
        py = y1;

        // 2. Inverse Y Rotation
        x1 = px * Math.cos(radY) + pz * Math.sin(radY);
        let z1 = -px * Math.sin(radY) + pz * Math.cos(radY);
        px = x1;
        pz = z1;

        // 3. Inverse X Rotation
        y1 = py * Math.cos(radX) - pz * Math.sin(radX);
        z1 = py * Math.sin(radX) + pz * Math.cos(radX);
        py = y1;
        pz = z1;

        // Translate back
        return {
            x: px + centerX,
            y: py + centerY,
            z: pz
        };
    }

    resetRotation() {
        this.game.rotationX = 0;
        this.game.rotationY = 0;
        this.game.rotationZ = 0;

        const xSlider = document.getElementById('rotXSlider');
        const ySlider = document.getElementById('rotYSlider');
        const zSlider = document.getElementById('rotZSlider');

        if (xSlider) { xSlider.value = 0; document.getElementById('rotXValue').textContent = '0°'; }
        if (ySlider) { ySlider.value = 0; document.getElementById('rotYValue').textContent = '0°'; }
        if (zSlider) { zSlider.value = 0; document.getElementById('rotZValue').textContent = '0°'; }
    }



    calculateGeometry() {
        const lines = [];
        const adj = {};
        // Performance fix: use Map for O(1) star lookups
        const starMap = new Map();
        this.game.stars.forEach(s => {
            adj[s.id] = [];
            starMap.set(s.id, s);
        });

        for (let i = 0; i < this.game.stars.length; i++) {
            for (let j = i + 1; j < this.game.stars.length; j++) {
                const s1 = this.game.stars[i];
                const s2 = this.game.stars[j];
                const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);

                if (dist < this.game.config.maxConnectDist) {
                    lines.push({ s1, s2, dist });
                    adj[s1.id].push(s2.id);
                    adj[s2.id].push(s1.id);
                }
            }
        }

        // BFS for clusters
        const clusters = [];
        const visited = new Set();
        this.game.stars.forEach(star => {
            if (!visited.has(star.id)) {
                const cluster = [];
                const queue = [star.id];
                visited.add(star.id);
                while (queue.length) {
                    const id = queue.shift();
                    const s = starMap.get(id); // O(1) lookup
                    if (s) cluster.push(s);
                    adj[id].forEach(nid => {
                        if (!visited.has(nid)) {
                            visited.add(nid);
                            queue.push(nid);
                        }
                    });
                }
                if (cluster.length > 0) clusters.push(cluster);
            }
        });

        return { lines, clusters };
    }

}
window.PhysicsManager = PhysicsManager;
