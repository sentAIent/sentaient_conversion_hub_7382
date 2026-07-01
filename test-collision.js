const assert = require('assert');

// Simulate the logic
const projectiles = [{ x: 10, y: 10, width: 4, damage: 5 }];
const enemyShips = [{ x: 10, y: 10, type: 'scout', faction: 'xenon', health: 50 }];
const ENEMY_TYPES = { scout: { size: 18, health: 50 } };
const factionRep = { xenon: -20, mauler: -20, terran: 0 };
let hit = false;
let enemy = enemyShips[0];
let p = projectiles[0];

const typeDef = ENEMY_TYPES[enemy.type];
const dist = Math.sqrt(0);

if (dist < typeDef.size + p.width) {
    enemy.health -= (p.damage || 25);
    enemy.hitFlash = 10;
    hit = true;
    
    if (enemy.faction) {
        factionRep[enemy.faction] = Math.max(-100, (factionRep[enemy.faction] || 0) - 2);
        Object.keys(factionRep).forEach(f => {
            if (f !== enemy.faction) factionRep[f] = Math.min(100, (factionRep[f] || 0) + 1);
        });
    }

    if (enemy.health <= 0) {
        console.log("Destroyed!");
    } else {
        console.log("Hit, health is now", enemy.health);
    }
}
