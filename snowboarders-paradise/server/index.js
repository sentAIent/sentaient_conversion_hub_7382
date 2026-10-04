const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy to the Solvent Agent framework for AI Coaching
app.post('/api/solvent-coaching', async (req, res) => {
  try {
    const { telemetry } = req.body;
    // We create a mock job for the Solvent Agent
    const job = {
      id: "JOB_" + Date.now(),
      topic: "Snowboarders Paradise Telemetry Analysis",
      context: "Telemetry: " + JSON.stringify(telemetry),
      customer_email: "player@snowboarders.local",
      budget_cents: 499
    };
    
    // Attempt to hit the locally running Solvent Agent API (if running)
    let report = "Offline mode: AI Coaching analysis based on your telemetry...\n\n";
    try {
      const solventRes = await fetch('http://127.0.0.1:8787/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      });
      // In a real flow, this creates a job, then we wait for checkout, then fulfillment.
      // For this demo integration, we'll just mock the completed text.
      report += "Your telemetry shows room for improvement on landing angles. Try to align your board with the terrain normal before hitting the ground. You had 5 crashes that could have been avoided!";
    } catch(e) {
      report += "Your telemetry shows room for improvement on landing angles. Try to align your board with the terrain normal before hitting the ground. Keep pushing the combo multiplier!";
    }
    
    res.json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const players = {};

// Initialize 5 NPCs
const npcs = Array.from({ length: 5 }).map((_, i) => ({
  id: `npc_${i}`,
  x: (Math.random() - 0.5) * 100,
  z: -100 - Math.random() * 500,
  velocity: { x: 0, y: 0, z: -(10 + Math.random() * 15) },
  speed: 10 + Math.random() * 15,
  knockedOut: false,
  knockoutVelocity: { x: 0, y: 0, z: 0 },
  knockoutRotation: { x: 0, y: 0, z: 0 }
}));

const TICK_RATE = 20; // 20 times per second
const delta = 1 / TICK_RATE;

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  players[socket.id] = {
    id: socket.id,
    x: 0,
    y: 50,
    z: 0,
    rotation: 0,
    animState: {
      carving: 0,
      inAir: false,
      grabbing: false,
      boosting: false,
      melee: false,
      weapon: 'none',
      vehicle: 'snowboard'
    }
  };

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    delete players[socket.id];
  });

  socket.on('player_update', (data) => {
    if (players[socket.id]) {
      players[socket.id] = { ...players[socket.id], ...data };
    }
  });

  socket.on('hit_npc', (npcId) => {
    const npc = npcs.find(n => n.id === npcId);
    if (npc && !npc.knockedOut) {
      npc.knockedOut = true;
      npc.knockoutVelocity = {
        x: (Math.random() - 0.5) * 10,
        y: 15 + Math.random() * 10,
        z: (Math.random() - 0.5) * 10
      };
      npc.knockoutRotation = {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 10
      };
      console.log(`NPC ${npcId} knocked out!`);
    }
  });
});

// Authoritative Game Loop
setInterval(() => {
  // Update NPCs
  npcs.forEach(npc => {
    if (npc.knockedOut) {
      // Simplified ragdoll on server
      npc.knockoutVelocity.y -= 30 * delta;
      npc.x += npc.knockoutVelocity.x * delta;
      npc.z += npc.knockoutVelocity.z * delta;
      
      // We don't have terrain height on server without importing it,
      // so we'll let the clients handle the exact ground snapping for dead NPCs.
      // But we simulate basic gravity here.
    } else {
      // Basic boids/flocking
      let separationX = 0;
      let separationZ = 0;
      
      npcs.forEach(other => {
        if (other.id !== npc.id && !other.knockedOut) {
          const dx = npc.x - other.x;
          const dz = npc.z - other.z;
          const dist = Math.hypot(dx, dz);
          if (dist > 0 && dist < 20) {
            separationX += (dx / dist);
            separationZ += (dz / dist);
          }
        }
      });

      // Avoid nearest player
      let nearestPlayerDist = Infinity;
      let playerSeekX = 0;
      let playerSeekZ = -1; // Default downward
      
      Object.values(players).forEach(p => {
        const dist = Math.hypot(npc.x - p.x, npc.z - p.z);
        if (dist < 50 && dist < nearestPlayerDist) {
          nearestPlayerDist = dist;
          playerSeekX = p.x - npc.x;
          playerSeekZ = p.z - npc.z;
        }
      });
      
      // Normalize player seek
      if (nearestPlayerDist < 50) {
        playerSeekX = (playerSeekX / nearestPlayerDist) * 3.0;
        playerSeekZ = (playerSeekZ / nearestPlayerDist) * 3.0;
      }

      npc.velocity.x += (separationX * 1.5) + playerSeekX;
      npc.velocity.z += (separationZ * 1.5) + playerSeekZ;
      
      // Normalize velocity to speed
      const velMag = Math.hypot(npc.velocity.x, npc.velocity.z) || 1;
      npc.velocity.x = (npc.velocity.x / velMag) * npc.speed;
      npc.velocity.z = (npc.velocity.z / velMag) * npc.speed;

      npc.x += npc.velocity.x * delta;
      npc.z += npc.velocity.z * delta;

      // Wrap around logic to keep NPCs near players
      const playerVals = Object.values(players);
      if (playerVals.length > 0) {
        let avgZ = 0;
        playerVals.forEach(p => avgZ += p.z);
        avgZ /= playerVals.length;

        if (npc.z < avgZ - 300 || npc.z > avgZ + 100) {
          npc.z = avgZ + (Math.random() * 50);
          npc.x = (Math.random() - 0.5) * 100;
          npc.velocity.z = -(10 + Math.random() * 15);
        }
      }
    }
  });

  // Broadcast state to all clients
  io.emit('game_state', {
    players,
    npcs
  });

}, 1000 / TICK_RATE);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
