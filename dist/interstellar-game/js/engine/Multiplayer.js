export class Multiplayer {
    constructor(engine) {
        this.engine = engine;
        this.remotePlayers = {}; // Store remote players by ID
        this.lastBroadcastTime = 0;
        this.broadcastInterval = 50; // ms between position broadcasts

        // Listen for messages from the React parent
        window.addEventListener('message', (event) => {
            const data = event.data;
            if (data.type === 'REMOTE_PLAYER_UPDATE') {
                this.updateRemotePlayer(data.playerId, data.data);
            } else if (data.type === 'REMOTE_PLAYER_LEAVE') {
                this.removeRemotePlayer(data.playerId);
            } else if (data.type === 'REMOTE_PLAYER_CHAT') {
                this.updateRemotePlayerChat(data.playerId, data.message);
            } else if (data.type === 'LOCAL_PLAYER_CHAT') {
                this.localChat = { message: data.message, time: Date.now() };
            } else if (data.type === 'SERVER_ENEMY_SYNC') {
                this.updateEnemies(data.enemies);
            }
        });

        this.enemies = {}; // Store server authoritative enemies
    }

    update(deltaTime, time) {
        // Broadcast local position if enough time has passed
        if (time - this.lastBroadcastTime > this.broadcastInterval && this.engine.playerShip) {
            this.broadcastLocalPosition();
            this.lastBroadcastTime = time;
        }
        
        // Smooth interpolation of remote players
        const lerpFactor = Math.min(1.0, deltaTime * 0.015);
        for (const id in this.remotePlayers) {
            const p = this.remotePlayers[id];
            
            // Lerp X and Y
            p.x += (p.targetX - p.x) * lerpFactor;
            p.y += (p.targetY - p.y) * lerpFactor;
            
            // Lerp Rotation (handle -PI to PI wrap around)
            let rotDiff = p.targetRotation - p.rotation;
            while (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
            while (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
            p.rotation += rotDiff * lerpFactor;
        }

        // Smooth interpolation of enemies
        for (const id in this.enemies) {
            const e = this.enemies[id];
            e.x += (e.targetX - e.x) * lerpFactor;
            e.y += (e.targetY - e.y) * lerpFactor;
            
            let rotDiff = e.targetRotation - e.rotation;
            while (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
            while (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
            e.rotation += rotDiff * lerpFactor;
        }
    }

    broadcastLocalPosition() {
        if (!this.engine.playerShip) return;
        
        const posData = {
            x: this.engine.playerShip.x,
            y: this.engine.playerShip.y,
            rotation: this.engine.playerShip.rotation,
            color: this.engine.playerShip.color || '#00f3ff',
            isThrusting: this.engine.keys && (this.engine.keys['ArrowUp'] || this.engine.keys['KeyW'])
        };

        window.parent.postMessage({
            type: 'PLAYER_POS_UPDATE',
            data: posData
        }, '*');
    }

    updateRemotePlayer(id, data) {
        if (!this.remotePlayers[id]) {
            // New player joined
            this.remotePlayers[id] = { ...data, targetX: data.x, targetY: data.y, targetRotation: data.rotation };
        } else {
            // Update existing player target for interpolation
            const p = this.remotePlayers[id];
            p.targetX = data.x;
            p.targetY = data.y;
            p.targetRotation = data.rotation;
            p.color = data.color;
            p.isThrusting = data.isThrusting;
        }
    }

    removeRemotePlayer(id) {
        delete this.remotePlayers[id];
    }

    updateRemotePlayerChat(id, message) {
        if (this.remotePlayers[id]) {
            this.remotePlayers[id].chatMessage = message;
            this.remotePlayers[id].chatTime = Date.now();
        }
    }

    updateEnemies(serverEnemies) {
        // Sync enemies from server
        for (const id in serverEnemies) {
            const serverData = serverEnemies[id];
            if (!this.enemies[id]) {
                // New enemy
                this.enemies[id] = { ...serverData, targetX: serverData.x, targetY: serverData.y, targetRotation: serverData.rotation };
            } else {
                // Update target for interpolation
                const e = this.enemies[id];
                e.targetX = serverData.x;
                e.targetY = serverData.y;
                e.targetRotation = serverData.rotation;
                e.health = serverData.health;
            }
        }
        
        // Remove dead/missing enemies
        for (const id in this.enemies) {
            if (!serverEnemies[id]) {
                delete this.enemies[id];
            }
        }
    }

    render(ctx, camera) {
        if (!camera) return;
        
        // Draw all remote players (ctx is assumed to be in World Space)
        for (const id in this.remotePlayers) {
            const p = this.remotePlayers[id];
            
            ctx.save();
            
            // Translate to the player's world position
            ctx.translate(p.x, p.y);
            
            // Un-scale so the ship is a consistent pixel size regardless of zoom
            const safeZoom = Math.max(0.01, camera.zoom || 1);
            const invZoom = 1 / safeZoom;
            ctx.scale(invZoom, invZoom);

            ctx.rotate(p.rotation);

            // Draw thrust flame
            if (p.isThrusting) {
                ctx.beginPath();
                ctx.moveTo(-15, 0);
                ctx.lineTo(-30 - Math.random() * 10, 5);
                ctx.lineTo(-30 - Math.random() * 10, -5);
                ctx.closePath();
                ctx.fillStyle = '#ffaa00';
                ctx.fill();
            }

            // Draw Ship Body
            ctx.beginPath();
            ctx.moveTo(20, 0);
            ctx.lineTo(-15, 10);
            ctx.lineTo(-10, 0);
            ctx.lineTo(-15, -10);
            ctx.closePath();
            
            ctx.fillStyle = '#111';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = p.color;
            ctx.stroke();

            // Draw player name or ID tag
            ctx.rotate(-p.rotation); // un-rotate for text
            ctx.fillStyle = p.color;
            ctx.font = "14px monospace";
            ctx.textAlign = "center";
            ctx.fillText(id.substring(0, 6), 0, -25);

            // Draw chat bubble if exists and is recent (< 5 seconds)
            if (p.chatMessage && Date.now() - p.chatTime < 5000) {
                ctx.font = "12px monospace";
                const textWidth = ctx.measureText(p.chatMessage).width;
                ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                ctx.fillRect(-textWidth/2 - 10, -50, textWidth + 20, 20);
                ctx.fillStyle = "#00ff9d";
                ctx.fillText(p.chatMessage, 0, -36);
            }

            ctx.restore();
        }

        // Draw enemies
        for (const id in this.enemies) {
            const e = this.enemies[id];
            ctx.save();
            ctx.translate(e.x, e.y);
            const safeZoom = Math.max(0.01, camera.zoom || 1);
            const invZoom = 1 / safeZoom;
            ctx.scale(invZoom, invZoom);
            ctx.rotate(e.rotation);

            // Draw Enemy Ship Body (Red and pointy)
            ctx.beginPath();
            ctx.moveTo(25, 0);
            ctx.lineTo(-15, 15);
            ctx.lineTo(-5, 0);
            ctx.lineTo(-15, -15);
            ctx.closePath();
            
            ctx.fillStyle = '#220000';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ff3333';
            ctx.stroke();

            // Health Bar
            ctx.rotate(-e.rotation);
            ctx.fillStyle = 'red';
            ctx.fillRect(-20, -30, 40, 4);
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(-20, -30, 40 * (e.health / 100), 4);
            
            ctx.restore();
        }

        // Draw local player chat
        if (this.localChat && Date.now() - this.localChat.time < 5000 && this.engine.playerShip) {
            ctx.save();
            ctx.translate(this.engine.playerShip.x, this.engine.playerShip.y);
            const safeZoom = Math.max(0.01, camera.zoom || 1);
            const invZoom = 1 / safeZoom;
            ctx.scale(invZoom, invZoom);
            
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            const textWidth = ctx.measureText(this.localChat.message).width;
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(-textWidth/2 - 10, -50, textWidth + 20, 20);
            ctx.fillStyle = "#00ff9d";
            ctx.fillText(this.localChat.message, 0, -36);
            ctx.restore();
        }
    }
}
