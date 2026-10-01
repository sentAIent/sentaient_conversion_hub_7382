/**
 * AIManager.js
 * Handles simulation of rival factions, trade fleets, and automated galaxy events.
 * Phase 17-3: Galactic Simulation & AI
 */

class AIManager {
    constructor(game) {
        this.game = game;
        this.rivals = [];
        this.factions = {
            XENON: { name: "The Xenon Hive", rating: 0, stance: "NEUTRAL", color: "#FF4500", desc: "Aggressive synthetic intelligence originating from the deep void." },
            TERRAN: { name: "The Terran Assembly", rating: 0, stance: "NEUTRAL", color: "#00CED1", desc: "The fractured remnants of the old Solar federation." }
        };
        this.outposts = [];
        this.ships = [];
        this.projectiles = []; // Phase 19-2: Elegant Needle-Beams
    }

    seedInitialFactions() {
        const planets = this.game.planets || [];
        if (planets.length < 5) return;

        for (let i = 0; i < 2; i++) {
            const p = planets[planets.length - 1 - i];
            this.spawnOutpost(p, "XENON");
        }

        for (let i = 0; i < 2; i++) {
            const p = planets[Math.floor(planets.length / 2) + i];
            this.spawnOutpost(p, "TERRAN");
        }
    }

    spawnOutpost(planet, factionKey) {
        const faction = this.factions[factionKey];
        const outpost = {
            id: `outpost_${Date.now()}_${Math.random()}`,
            name: `${faction.name} Anchor`,
            x: planet.x,
            y: planet.y,
            z: planet.z || 0,
            faction: factionKey,
            color: faction.color,
            radius: planet.radius * 2,
            type: 'outpost',
            alignment: 'rival'
        };
        this.outposts.push(outpost);
        return outpost;
    }

    // --- PHASE 3: ADVANCED NEEDLE-BEAMS ---
    fireNeedleBeam(ship, variant = 'void', target) {
        const finalTarget = target || this.game.playerShip;
        if (!finalTarget) return;

        // Better targeting: Predict where target is going (Lead Targeting)
        const leadFactor = 15;
        const targetX = finalTarget.x + (finalTarget.vx || 0) * leadFactor;
        const targetY = finalTarget.y + (finalTarget.vy || 0) * leadFactor;
        
        const angle = Math.atan2(targetY - ship.y, targetX - ship.x);

        if (variant === 'pulsar') {
            // Triple fire
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    this.projectiles.push({
                        x: ship.x, y: ship.y,
                        vx: Math.cos(angle) * 15,
                        vy: Math.sin(angle) * 15,
                        rotation: angle,
                        life: 60, damage: 4,
                        color: ship.color || '#00f3ff',
                        width: 1.0, length: 12, variant: 'pulsar',
                        sourceShip: ship
                    });
                }, i * 150);
            }
        } else {
            // Heavy Void-Trace
            this.projectiles.push({
                x: ship.x, y: ship.y,
                vx: Math.cos(angle) * 13,
                vy: Math.sin(angle) * 13,
                rotation: angle,
                life: 100, damage: 12,
                color: ship.color || '#9300ff',
                width: 2.0, length: 40, variant: 'void',
                sourceShip: ship
            });
        }
    }

    update(dt) {
        const player = this.game.playerShip;

        // Phase 2: Handle Celestial Events (Safe fallback)
        if (this.handleCelestialEvents) this.handleCelestialEvents(dt);
        if (this.updatePhaseShields) this.updatePhaseShields(dt);

        // 1. AI Ships Update (Patrols & Combat)
        if (player) {
            for (let i = this.ships.length - 1; i >= 0; i--) {
                let ship = this.ships[i];
                if (!ship) continue;
                
                // Safety: Initialize timer if missing
                if (ship.targetUpdateTimer === undefined) ship.targetUpdateTimer = 0;

                // Check alive status
                if (ship.health !== undefined && ship.health <= 0) {
                    if (ship.vesselType === 'freighter') this.dropConvoyLoot(ship);
                    this.ships.splice(i, 1);
                    continue;
                }
                
                // Detection & Engagement
                const dx = player.x - ship.x;
                const dy = player.y - ship.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                const faction = (ship.faction && this.factions[ship.faction]) ? this.factions[ship.faction] : null;
                const isHostile = faction && faction.stance === "HOSTILE";
                
                if (dist < 2500) {
                    // --- NEW: Optimized Inter-Faction AI Targeting ---
                    // Throttle targeting logic: only update if ship has no target or timer is up
                    if (!ship.currentTarget || ship.targetUpdateTimer <= 0) {
                        // Performance: Only search for targets if ships are within a reasonable count
                        // or every few ticks to prevent O(N^2) spikes
                        ship.currentTarget = this.findNearestHostileForShip(ship);
                        ship.targetUpdateTimer = 90 + Math.random() * 60; // 1.5 - 2.5 seconds
                    }
                    ship.targetUpdateTimer -= dt;

                    const target = ship.currentTarget || player;
                    if (!target) continue;

                    const tdx = target.x - ship.x;
                    const tdy = target.y - ship.y;
                    const tdist = Math.sqrt(tdx * tdx + tdy * tdy);

                    // Determine Behavior State
                    if (!ship.behaviorState) ship.behaviorState = 'approach';
                    if (this.updateCombatBehavior) this.updateCombatBehavior(ship, target, tdist, tdx, tdy, dt);
                    
                    // Rotation
                    const targetAngle = (ship.behaviorState === 'break') ? 
                                        Math.atan2(ship.vy || 0, ship.vx || 0) : 
                                        Math.atan2(tdy, tdx);
                    ship.rotation += (targetAngle - ship.rotation) * 0.05 * dt;
                    
                    if (isHostile && tdist < 1200 && this.executeAIFireLogic) {
                        this.executeAIFireLogic(ship, target, tdist);
                    }
                } else {
                    // Normal patrol or Trade logic
                    if (ship.vesselType === 'freighter' && ship.targetOutpost) {
                        const tdx = ship.targetOutpost.x - ship.x;
                        const tdy = ship.targetOutpost.y - ship.y;
                        const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
                        const tAngle = Math.atan2(tdy, tdx);
                        ship.rotation += (tAngle - ship.rotation) * 0.02 * dt;
                        ship.x += Math.cos(ship.rotation) * 4 * dt;
                        ship.y += Math.sin(ship.rotation) * 4 * dt;
                        
                        if (tdist < 200) {
                            ship.targetOutpost = this.outposts[Math.floor(Math.random() * this.outposts.length)];
                        }
                    } else {
                        ship.rotation += 0.005 * dt;
                        const orbitX = ship.homeX + Math.cos(ship.rotation) * 1500;
                        const orbitY = ship.homeY + Math.sin(ship.rotation) * 1500;
                        ship.x += (orbitX - ship.x) * 0.02 * dt;
                        ship.y += (orbitY - ship.y) * 0.02 * dt;
                    }
                }
            }

            // 2. Projectile Physics
            if (this.projectiles && this.projectiles.length > 0) {
                for (let i = this.projectiles.length - 1; i >= 0; i--) {
                    const p = this.projectiles[i];
                    p.x += (p.vx || 0) * dt;
                    p.y += (p.vy || 0) * dt;
                    p.life -= dt;

                    const pdx = player.x - p.x;
                    const pdy = player.y - p.y;
                    if (Math.hypot(pdx, pdy) < (player.size || 30)) {
                        if (this.game.damagePlayer) this.game.damagePlayer(p.damage || 10);
                        if (this.game.createExplosion) this.game.createExplosion(p.x, p.y, 'hit');
                        p.life = 0;
                    }

                    if (p.life <= 0) {
                        this.projectiles.splice(i, 1);
                    }
                }
            }
        }

        if (this.game.frameCounter % 600 === 0) {
            if (this.maintainRivalFleets) this.maintainRivalFleets();
            if (this.maintainTradeRoutes) this.maintainTradeRoutes();
            if (Math.random() < 0.6 && this.spawnSkirmish) this.spawnSkirmish();
        }

        // --- NEW: STABILIZATION RECOVERY ---
        if (this.game.frameCounter % 300 === 0) {
            this.limitAndCullFleets();
        }

        if (this.updateFormations) this.updateFormations(dt);
        if (this.updatePlayerWingmen) this.updatePlayerWingmen(dt);
    }

    limitAndCullFleets() {
        if (!this.game.playerShip) return;
        const player = this.game.playerShip;
        const CULL_DIST = 12000;
        const SHIP_CAP = 40;

        // 1. Distance Culling: Purge ships > 12000 units away
        const beforeCount = this.ships.length;
        this.ships = this.ships.filter(ship => {
            const d = Math.hypot(player.x - ship.x, player.y - ship.y);
            return d < CULL_DIST || ship.isConvoy; // Convoys are persistent
        });

        // 2. Population Cap: If still over cap, remove oldest non-hostile ships first
        if (this.ships.length > SHIP_CAP) {
            console.log(`[AI] Cap reached (${this.ships.length}). Enforcing culling...`);
            // Keep hostiles and player related ships
            const keep = this.ships.filter(s => s.alignment === 'hostile' || s.isConvoy);
            const canDump = this.ships.filter(s => s.alignment !== 'hostile' && !s.isConvoy);
            
            const needed = SHIP_CAP - keep.length;
            this.ships = [...keep, ...canDump.slice(0, Math.max(0, needed))];
        }

        if (beforeCount !== this.ships.length) {
            console.log(`[AI] Population stabilized: ${beforeCount} -> ${this.ships.length}`);
        }
    }
    
    updatePlayerWingmen(dt) {
        const wingmen = this.game.playerWingmen || [];
        const player = this.game.playerShip;
        const command = this.game.fleetCommand || 'defend';
        
        if (wingmen.length === 0 || !player) return;

        // Safety: Clamp DT to prevent massive coordinate leaps
        const safeDt = Math.min(dt, 2.0);

        wingmen.forEach((wingman, index) => {
            // 0. Initialize throttle counter if missing
            if (wingman.targetUpdateCounter === undefined) wingman.targetUpdateCounter = Math.floor(Math.random() * 10);
            wingman.targetUpdateCounter++;

            // 1. Target determination
            if (wingman.targetUpdateCounter % 10 === 0 || !wingman.currentTarget) {
                if (command === 'attack') {
                    wingman.currentTarget = this.ships.find(s => s.alignment === 'rival' || s.alignment === 'hostile');
                } else if (command === 'guard') {
                    wingman.currentTarget = (this.game.warpGateManager?.gates || []).find(g => g.isPlayerNear) || player;
                } else {
                    wingman.currentTarget = player;
                }
            }

            const target = wingman.currentTarget || player;
            const targetX = target.x || 0;
            const targetY = target.y || 0;
            
            // Formation offsets (V-shape)
            let tx = targetX;
            let ty = targetY;
            
            if (target === player) {
                const side = index % 2 === 0 ? 1 : -1;
                const fold = Math.floor(index / 2) + 1;
                const offsetAngle = player.rotation + Math.PI + (0.4 * side * fold);
                const offsetDist = 120 + (fold * 30);
                tx = player.x + Math.cos(offsetAngle) * offsetDist;
                ty = player.y + Math.sin(offsetAngle) * offsetDist;
            }

            // Move towards target/formation spot
            const wanderX = tx - wingman.x;
            const wanderY = ty - wingman.y;
            const wanderDist = Math.hypot(wanderX, wanderY);
            
            if (wanderDist > 20) {
                const moveSpeed = wingman.type === 'striker' ? 6.5 : 4.5;
                const moveAngle = Math.atan2(wanderY, wanderX);
                wingman.x += Math.cos(moveAngle) * moveSpeed * safeDt;
                wingman.y += Math.sin(moveAngle) * moveSpeed * safeDt;
                
                // Rotation learp
                const rotDiff = moveAngle - wingman.rotation;
                wingman.rotation += Math.asin(Math.sin(rotDiff)) * 0.1 * safeDt;
            } else {
                // Match player rotation if in formation
                if (target === player) {
                    const rotDiff = player.rotation - wingman.rotation;
                    wingman.rotation += Math.asin(Math.sin(rotDiff)) * 0.1 * safeDt;
                }
            }

            // Safety check: Reset to player if coordinates explode (NaN recovery)
            if (!isFinite(wingman.x) || !isFinite(wingman.y)) {
                console.warn(`[AIManager] Wingman ${index} coordinate explosion detected. Resetting to player.`);
                wingman.x = player.x;
                wingman.y = player.y;
                wingman.vx = 0;
                wingman.vy = 0;
            }

            // 3. Auto-Combat Logic (Phase 6 - Throttled)
            if (wingman.targetUpdateCounter % 5 === 0 && (command === 'attack' || command === 'defend')) {
                const nearestHostile = this.ships.find(s => (s.alignment === 'rival' || s.alignment === 'hostile') && Math.hypot(s.x - wingman.x, s.y - wingman.y) < 1000);
                if (nearestHostile) {
                    this.executeAIFireLogic(wingman, nearestHostile, Math.hypot(nearestHostile.x - wingman.x, nearestHostile.y - wingman.y));
                }
            }
        });
    }

    updateCombatBehavior(ship, player, dist, dx, dy, dt) {
        if (ship.vesselType === 'freighter') {
            // Freighters just try to keep moving or flee
            const angle = Math.atan2(dy, dx) + Math.PI; // Fly AWAY
            ship.x += Math.cos(angle) * 2 * dt;
            ship.y += Math.sin(angle) * 2 * dt;
            return;
        }

        const angleToPlayer = Math.atan2(dy, dx);
        
        switch (ship.behaviorState) {
            case 'approach':
                // Close distance at high speed
                ship.x += Math.cos(angleToPlayer) * 5 * dt;
                ship.y += Math.sin(angleToPlayer) * 5 * dt;
                if (dist < 600) ship.behaviorState = 'strafing';
                break;
                
            case 'strafing':
                // Fly parallel/tangent to player for a strafing run
                const strafeAngle = angleToPlayer + Math.PI/2;
                ship.x += Math.cos(strafeAngle) * 6 * dt;
                ship.y += Math.sin(strafeAngle) * 6 * dt;
                // Move slightly closer/further during strafe
                ship.x += Math.cos(angleToPlayer) * 1 * dt;
                ship.y += Math.sin(angleToPlayer) * 1 * dt;
                
                if (dist < 300 || Math.random() < 0.01) ship.behaviorState = 'break';
                break;
                
            case 'break':
                // Break away and reset
                const breakAngle = ship.rotation; // Maintain current heading to fly past
                ship.x += Math.cos(breakAngle) * 7 * dt;
                ship.y += Math.sin(breakAngle) * 7 * dt;
                if (dist > 1200) ship.behaviorState = 'approach';
                break;
        }
    }

    updateFormations(dt) {
        const factions = Object.keys(this.factions);
        factions.forEach(fKey => {
            const fShips = this.ships.filter(s => s.faction === fKey && s.vesselType === 'scout');
            if (fShips.length < 2) return;

            const leader = fShips[0];
            for (let i = 1; i < fShips.length; i++) {
                const follower = fShips[i];
                // Target spot: behind and to the side
                const side = i % 2 === 0 ? 1 : -1;
                const offsetDistance = 150;
                const targetX = leader.x - Math.cos(leader.rotation) * offsetDistance + Math.cos(leader.rotation + Math.PI/2) * offsetDistance * side;
                const targetY = leader.y - Math.sin(leader.rotation) * offsetDistance + Math.sin(leader.rotation + Math.PI/2) * offsetDistance * side;
                
                // Soft nudge towards formation spot (only if not in active break maneuver)
                if (follower.behaviorState !== 'break') {
                    follower.x += (targetX - follower.x) * 0.05 * dt;
                    follower.y += (targetY - follower.y) * 0.05 * dt;
                }
            }
        });
    }

    executeAIFireLogic(ship, player, dist) {
        if (!ship.lastShot || Date.now() - ship.lastShot > 1200) {
            // Pick a weapon variant
            const variant = Math.random() < 0.3 ? 'pulsar' : 'void';
            this.fireNeedleBeam(ship, variant);
            ship.lastShot = Date.now();
        }
    }

    maintainTradeRoutes() {
        const freighters = this.ships.filter(s => s.vesselType === 'freighter');
        if (freighters.length < 3 && this.outposts.length >= 2) {
            this.spawnTradeShip();
        }
    }

    spawnTradeShip() {
        const start = this.outposts[Math.floor(Math.random() * this.outposts.length)];
        const target = this.outposts[Math.floor(Math.random() * this.outposts.length)];
        
        const ship = {
            id: `freighter_${Date.now()}`,
            faction: start.faction,
            x: start.x,
            y: start.y,
            homeX: start.x,
            homeY: start.y,
            targetOutpost: target,
            rotation: Math.random() * Math.PI * 2,
            color: '#B8860B', // Dark Goldenrod for trade
            alignment: 'neutral',
            vesselType: 'freighter',
            size: 40
        };
        this.ships.push(ship);
        console.log(`[AI] Trade Route established from ${start.name} to ${target.name}`);
    }

    maintainRivalFleets() {
        this.outposts.forEach(outpost => {
            const factionShips = this.ships.filter(s => s.faction === outpost.faction && s.vesselType !== 'freighter');
            if (factionShips.length < 2) {
                this.spawnRivalShip(outpost);
            }
        });
    }

    spawnRivalShip(outpost) {
        const ship = {
            id: `rival_${Date.now()}`,
            faction: outpost.faction,
            x: outpost.x + 500,
            y: outpost.y + 500,
            homeX: outpost.x,
            homeY: outpost.y,
            rotation: Math.random() * Math.PI * 2,
            color: outpost.color,
            alignment: 'rival',
            vesselType: 'scout',
            size: 25
        };
        this.ships.push(ship);
        console.log(`[AI] ${outpost.faction} deployed ${ship.vesselType} near ${outpost.name}`);
    }

    modifyRelation(factionKey, amount) {
        const f = this.factions[factionKey];
        if (!f) return;
        f.rating += amount;
        
        if (f.rating <= -50) f.stance = "HOSTILE";
        else if (f.rating >= 50) f.stance = "FRIENDLY";
        else f.stance = "NEUTRAL";
        
        this.game.hudManager.showToast(`${f.name} stance: ${f.stance}`, 3000, 'info');
    }

    // --- PHASE 2: CELESTIAL EVENTS ---
    handleCelestialEvents(dt) {
        if (!this.game.activeEvents) return;
        const player = this.game.playerShip;
        const now = Date.now();

        this.game.activeEvents = this.game.activeEvents.filter(ev => {
            // Convoy: spawn entities when player is nearby
            if (ev.type === 'convoy' && !ev.spawned) {
                const dist = Math.hypot(player.x - ev.x, player.y - ev.y);
                if (dist < 3000) {
                    this.spawnConvoyEntities(ev);
                    ev.spawned = true;
                }
            }
            // Storm: expire after duration
            if (ev.type === 'storm') {
                return (now - ev.startTime) < ev.duration;
            }
            // Supernova: trigger flash then expire
            if (ev.type === 'supernova' && now >= ev.triggerTime && !ev.triggered) {
                ev.triggered = true;
                if (this.game.renderer && this.game.renderer.triggerSupernovaFlash) {
                    this.game.renderer.triggerSupernovaFlash(ev);
                }
            }
            return true;
        });
    }

    spawnConvoyEntities(ev) {
        const isHighValue = ev.cargoValue > 10000;
        
        // Main freighter
        this.ships.push({
            id: `convoy_freighter_${Date.now()}`,
            vesselType: 'freighter',
            x: ev.x, y: ev.y,
            homeX: ev.x, homeY: ev.y,
            targetOutpost: { x: ev.targetX, y: ev.targetY },
            rotation: 0,
            color: '#FFD700',
            alignment: 'neutral',
            faction: null,
            size: 50,
            health: isHighValue ? 600 : 300,
            maxHealth: isHighValue ? 600 : 300,
            // Phase 4: Phase Shield for high-value convoys
            phaseShield: isHighValue ? 400 : 0,
            maxPhaseShield: isHighValue ? 400 : 0,
            shieldRegen: 2,
            cargoValue: ev.cargoValue,
            isConvoy: true
        });

        // Escort fighters
        const escortCount = isHighValue ? 3 : 2;
        for (let i = 0; i < escortCount; i++) {
            const angle = (i / escortCount) * Math.PI * 2;
            this.ships.push({
                id: `convoy_escort_${Date.now()}_${i}`,
                vesselType: 'escort',
                x: ev.x + Math.cos(angle) * 200,
                y: ev.y + Math.sin(angle) * 200,
                homeX: ev.x, homeY: ev.y,
                rotation: angle,
                color: '#ff6600',
                alignment: 'hostile',
                faction: 'mauler',
                size: 22,
                health: 200, maxHealth: 200
            });
        }

        if (isHighValue) {
            this.game.hudManager.showToast(`⚠️ HIGH-VALUE CONVOY DETECTED — Cargo: $${ev.cargoValue.toLocaleString()}`, 4000, 'warning');
        }
    }

    dropConvoyLoot(ship) {
        const value = ship.cargoValue || 2000;
        this.game.credits += value;
        if (this.game.hudManager) {
            this.game.hudManager.updateWalletUI();
            this.game.hudManager.showToast(`💰 CONVOY LOOTED: +$${value.toLocaleString()}!`, 4000, 'success');
        }
        // Scatter bonus minerals
        const bonusCount = Math.floor(value / 2000);
        for (let i = 0; i < Math.min(bonusCount, 8); i++) {
            const angle = Math.random() * Math.PI * 2;
            const types = ['emerald', 'sapphire', 'ruby', 'diamond'];
            const type = types[Math.min(Math.floor(Math.random() * types.length), types.length - 1)];
            this.game.minerals.push({
                x: ship.x + Math.cos(angle) * (100 + Math.random() * 300),
                y: ship.y + Math.sin(angle) * (100 + Math.random() * 300),
                type, value: 200 + Math.floor(Math.random() * 800),
                size: 10 + Math.random() * 8,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.05
            });
        }
    }

    // --- PHASE 4: PHASE SHIELD UPDATE ---
    updatePhaseShields(dt) {
        const player = this.game.playerShip;
        const wingmen = this.game.playerWingmen || [];

        this.ships.forEach(ship => {
            if (!ship.phaseShield && ship.phaseShield !== 0) return;

            // Regen shield slowly
            if (ship.phaseShield < ship.maxPhaseShield) {
                ship.phaseShield = Math.min(ship.maxPhaseShield, ship.phaseShield + ship.shieldRegen * dt);
            }

            // Count friendlies attacking this ship
            const nearbyAttackers = wingmen.filter(w =>
                w.state === 'attack' && Math.hypot(w.x - ship.x, w.y - ship.y) < 800
            ).length;

            // Shield hardness: solo damage is 10%, each extra wingman adds 30%
            ship.shieldDamageMultiplier = 0.1 + nearbyAttackers * 0.3;
        });
    }

    findNearestHostileForShip(ship) {
        const player = this.game.playerShip;
        let nearest = null;
        let minDist = 3000;

        // Check player (Safe check)
        if (player) {
            const pDist = Math.hypot(player.x - ship.x, player.y - ship.y);
            const faction = this.factions[ship.faction];
            if (faction && faction.stance === "HOSTILE" && pDist < minDist) {
                nearest = player;
                minDist = pDist;
            }
        }

        // Check other ships (Inter-faction conflict)
        this.ships.forEach(other => {
            if (other === ship || !other) return;
            if (other.faction && other.faction !== ship.faction) {
                const d = Math.hypot(other.x - ship.x, other.y - ship.y);
                if (d < minDist) {
                    nearest = other;
                    minDist = d;
                }
            }
        });

        return nearest;
    }

    spawnSkirmish() {
        const player = this.game.playerShip;
        if (!player) return;

        // Spawn 2 factions fighting near each other but away from player
        const angle = Math.random() * Math.PI * 2;
        const dist = 3000 + Math.random() * 2000;
        const centerX = player.x + Math.cos(angle) * dist;
        const centerY = player.y + Math.sin(angle) * dist;

        const fKeys = Object.keys(this.factions);
        if (fKeys.length < 2) return;

        console.log(`[AI] Skirmish detected: ${fKeys[0]} vs ${fKeys[1]}`);
        this.game.hudManager.showToast("📡 DISTANT SKIRMISH DETECTED", 4000, 'warning');

        for (let i = 0; i < 2; i++) {
            const faction = fKeys[i];
            for (let j = 0; j < 2; j++) {
                this.ships.push({
                    id: `skirmish_${faction}_${Date.now()}_${j}`,
                    faction: faction,
                    x: centerX + (i === 0 ? -500 : 500) + Math.random() * 200,
                    y: centerY + Math.random() * 500,
                    homeX: centerX,
                    homeY: centerY,
                    rotation: Math.random() * Math.PI * 2,
                    color: this.factions[faction].color,
                    alignment: 'rival',
                    vesselType: 'scout',
                    size: 25,
                    health: 200, maxHealth: 200
                });
            }
        }
    }
}

window.AIManager = AIManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.AIManager = AIManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIManager;
}
