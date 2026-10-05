import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const channel = supabase.channel('room:global-space');

// Game State
const enemies = {};
const ENEMY_COUNT = 5;

function spawnEnemy(id) {
    enemies[id] = {
        id,
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        rotation: Math.random() * Math.PI * 2,
        health: 100,
        type: 'scout',
        targetX: (Math.random() - 0.5) * 2000,
        targetY: (Math.random() - 0.5) * 2000,
        speed: 100 // pixels per second
    };
}

// Initial Spawn
for (let i = 0; i < ENEMY_COUNT; i++) {
    spawnEnemy(`enemy_${i}`);
}

// Game Loop
const TICK_RATE = 50; // ms
let lastTime = Date.now();

function gameLoop() {
    const now = Date.now();
    const dt = (now - lastTime) / 1000; // seconds
    lastTime = now;

    let stateChanged = false;

    // Update AI
    for (const id in enemies) {
        const e = enemies[id];
        
        // Simple wandering logic
        const dx = e.targetX - e.x;
        const dy = e.targetY - e.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 50) {
            // Pick a new random target
            e.targetX = (Math.random() - 0.5) * 2000;
            e.targetY = (Math.random() - 0.5) * 2000;
        } else {
            // Move towards target
            const moveX = (dx / dist) * e.speed * dt;
            const moveY = (dy / dist) * e.speed * dt;
            e.x += moveX;
            e.y += moveY;
            e.rotation = Math.atan2(dy, dx);
            stateChanged = true;
        }
    }

    // Broadcast state
    if (stateChanged && channel.state === 'joined') {
        channel.send({
            type: 'broadcast',
            event: 'enemy_sync',
            payload: enemies
        });
    }
}

channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
        console.log('Server connected to room:global-space');
        setInterval(gameLoop, TICK_RATE);
    }
});

// Render requires Web Services to bind to a port
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Interstellar Game Server is running.\n');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Dummy HTTP server listening on port ${PORT} to satisfy Render health checks.`);
});

console.log('Interstellar game server starting...');
