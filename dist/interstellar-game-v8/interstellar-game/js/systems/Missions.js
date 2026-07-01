class MissionManager {
    constructor(game) {
        this.game = game;
    }

    getTrainingLessons() {
        return [
            {
                id: 'throttle',
                name: 'Throttle Up',
                icon: '🚀',
                subtitle: 'Learn to fly forward and brake',
                briefing: 'Use W to accelerate forward.\nUse S to brake and slow down.\nFly through each gate to proceed.',
                keys: [{ key: 'W', action: 'Accelerate' }, { key: 'S', action: 'Brake' }],
                gates: (() => {
                    // 3 gates in a straight line ahead
                    const g = [];
                    for (let i = 0; i < 3; i++) {
                        g.push({ x: (i + 1) * 800, y: 0, size: 200, reached: false });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 8, silver: 14, bronze: 22 },
                reward: { gold: 1200, silver: 800, bronze: 500 }
            },
            {
                id: 'steering',
                name: 'Steering',
                icon: '🔄',
                subtitle: 'Master turning and curved flight paths',
                briefing: 'Use A to turn left, D to turn right.\nCombine with W to fly curves.\nNavigate the slalom course!',
                keys: [{ key: 'A', action: 'Turn Left' }, { key: 'D', action: 'Turn Right' }, { key: 'W', action: 'Accelerate' }],
                gates: (() => {
                    // 5 gates in an S-curve
                    const g = [];
                    for (let i = 0; i < 5; i++) {
                        const angle = (i * Math.PI) / 4;
                        g.push({
                            x: Math.cos(angle) * (600 + i * 400) + i * 300,
                            y: Math.sin(angle) * (600 + i * 300),
                            size: 180 - i * 10,
                            reached: false
                        });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 15, silver: 25, bronze: 40 },
                reward: { gold: 1800, silver: 1200, bronze: 800 }
            },
            {
                id: 'boost',
                name: 'Boost Control',
                icon: '⚡',
                subtitle: 'Use afterburners for maximum speed',
                briefing: 'Hold SHIFT while flying to boost (2× speed).\nReach the distant gates before time runs out!\nRelease SHIFT to regain control for turns.',
                keys: [{ key: 'SHIFT', action: 'Boost (2×)' }, { key: 'W', action: 'Accelerate' }],
                gates: (() => {
                    // 3 very distant gates — need boost to reach in time
                    return [
                        { x: 2000, y: 0, size: 250, reached: false },
                        { x: 4500, y: -800, size: 220, reached: false },
                        { x: 7000, y: 400, size: 200, reached: false }
                    ];
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 12, silver: 20, bronze: 35 },
                reward: { gold: 2200, silver: 1500, bronze: 1000 }
            },
            {
                id: 'precision',
                name: 'Precision Flying',
                icon: '🎯',
                subtitle: 'Tight maneuvers through small gates',
                briefing: 'Combine all controls for precision flight.\nGates are smaller — aim carefully!\nControl your speed for tight turns.',
                keys: [{ key: 'W/S', action: 'Speed' }, { key: 'A/D', action: 'Steer' }],
                gates: (() => {
                    // 5 small gates in a zigzag
                    const g = [];
                    for (let i = 0; i < 5; i++) {
                        g.push({
                            x: (i + 1) * 600,
                            y: (i % 2 === 0 ? 1 : -1) * (300 + i * 80),
                            size: 120 - i * 8,
                            reached: false
                        });
                    }
                    return g;
                })(),
                gems: [],
                showArrow: true,
                medals: { gold: 18, silver: 30, bronze: 45 },
                reward: { gold: 3000, silver: 2000, bronze: 1200 }
            },
            {
                id: 'collection',
                name: 'Gem Collection',
                icon: '💎',
                subtitle: 'Learn to collect resources while flying',
                briefing: 'Fly near gems to auto-collect them!\nCollect all 8 gems in the training zone.\nYour ship pulls gems in on contact.',
                keys: [{ key: 'FLY', action: 'Near gems to collect' }],
                gates: [
                    { x: 0, y: 0, size: 120, reached: true }, // Start marker (pre-reached)
                    { x: 3000, y: 0, size: 200, reached: false }  // Finish gate
                ],
                gems: (() => {
                    // 8 gems scattered in a path
                    const g = [];
                    const types = ['iron', 'copper', 'gold', 'silver', 'titanium', 'ruby', 'emerald', 'diamond'];
                    for (let i = 0; i < 8; i++) {
                        g.push({
                            x: 300 + i * 330,
                            y: Math.sin(i * 0.8) * 200,
                            type: types[i],
                            collected: false
                        });
                    }
                    return g;
                })(),
                showArrow: false,
                collectTarget: 8,
                medals: { gold: 20, silver: 35, bronze: 50 },
                reward: { gold: 4000, silver: 2500, bronze: 1500 }
            },
            {
                id: 'radar',
                name: 'Radar Navigation',
                icon: '📡',
                subtitle: 'Navigate using instruments only',
                briefing: 'No HUD arrow this time!\nUse the RADAR and MAP panels to find the waypoint.\nThe destination is far away — trust your instruments.',
                keys: [{ key: 'RADAR', action: 'Check bearing' }, { key: 'MAP', action: 'See position' }],
                gates: (() => {
                    // Single far waypoint — player must navigate by radar
                    const angle = Math.random() * Math.PI * 2;
                    return [
                        { x: Math.cos(angle) * 6000, y: Math.sin(angle) * 6000, size: 300, reached: false }
                    ];
                })(),
                gems: [],
                showArrow: false, // No HUD arrow — must use radar!
                medals: { gold: 25, silver: 40, bronze: 60 },
                reward: { gold: 5000, silver: 3500, bronze: 2000 }
            },
            {
                id: 'final',
                name: 'Final Exam',
                icon: '🏆',
                subtitle: 'Full course — prove your skills',
                briefing: 'The ultimate test!\n8 gates with varying sizes and distances.\nCollect gems along the way for bonus time.\nUse everything you\'ve learned!',
                keys: [{ key: 'ALL', action: 'Use every skill' }],
                gates: (() => {
                    // 8-gate course with mixed challenges
                    const g = [];
                    let cx = 0, cy = 0;
                    const angles = [0.2, -0.6, 0.9, -0.3, 1.2, -0.8, 0.5, -0.4];
                    const dists = [1000, 1200, 800, 1500, 900, 2000, 1100, 1400];
                    const sizes = [200, 160, 140, 180, 120, 250, 130, 200];
                    let heading = 0;
                    for (let i = 0; i < 8; i++) {
                        heading += angles[i];
                        cx += Math.cos(heading) * dists[i];
                        cy += Math.sin(heading) * dists[i];
                        g.push({ x: cx, y: cy, size: sizes[i], reached: false });
                    }
                    return g;
                })(),
                gems: (() => {
                    // 5 bonus gems along the course
                    const g = [];
                    const types = ['gold', 'diamond', 'ruby', 'emerald', 'platinum'];
                    let cx = 0, cy = 0;
                    const angles = [0.2, -0.6, 0.9, -0.3, 1.2];
                    const dists = [1000, 1200, 800, 1500, 900];
                    let heading = 0;
                    for (let i = 0; i < 5; i++) {
                        heading += angles[i];
                        cx += Math.cos(heading) * dists[i];
                        cy += Math.sin(heading) * dists[i];
                        g.push({
                            x: cx + (Math.random() - 0.5) * 300,
                            y: cy + (Math.random() - 0.5) * 300,
                            type: types[i],
                            collected: false
                        });
                    }
                    return g;
                })(),
                showArrow: true,
                medals: { gold: 30, silver: 50, bronze: 75 },
                reward: { gold: 8000, silver: 5000, bronze: 2500 }
            },
            {
                id: 'weaponry',
                name: 'Weapon Systems',
                icon: '⚔️',
                subtitle: 'Learn to use your ship lasers',
                briefing: 'Hold SPACE to fire your primary lasers.\nDestroy the target mines to clear a path!\nGates will only open when the nearby mine is destroyed.',
                keys: [{ key: 'SPACE', action: 'Fire Lasers' }, { key: 'W/A/D', action: 'Flight' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 4; i++) {
                        g.push({ x: (i + 1) * 800, y: 0, size: 200, reached: false, targetDestroyed: false });
                    }
                    return g;
                })(),
                targets: (() => {
                    const t = [];
                    for (let i = 0; i < 4; i++) {
                        t.push({ x: (i + 1) * 800, y: (Math.random() - 0.5) * 100, type: 'training_mine', id: i });
                    }
                    return t;
                })(),
                showArrow: true,
                medals: { gold: 15, silver: 25, bronze: 40 },
                reward: { gold: 6000, silver: 4000, bronze: 2000 }
            },
            {
                id: 'shielding',
                name: 'Defense & Shields',
                icon: '🛡️',
                subtitle: 'Learn to manage your ship integrity',
                briefing: 'Your blue bar is your SHIELD. It absorbs damage first.\nThe red bar is your HULL. If it reaches zero, you die!\nFly through the damage zone and watch your shield deplete.',
                keys: [{ key: 'W/A/D', action: 'Maneuver' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 3; i++) {
                        g.push({ x: (i + 1) * 1000, y: Math.sin(i) * 300, size: 250, reached: false });
                    }
                    return g;
                })(),
                hazardZone: { x: 1500, y: 0, radius: 1000, damage: 0.2 },
                showArrow: true,
                medals: { gold: 20, silver: 35, bronze: 55 },
                reward: { gold: 6500, silver: 4500, bronze: 2500 }
            },
            {
                id: 'hazards',
                name: 'Hazard Navigation',
                icon: '🌀',
                subtitle: 'Evasive maneuvers near anomalies',
                briefing: 'Black Holes pull you in! Stay away from the event horizon.\nSpace Mines have a large blast radius.\nNavigate the hazard-filled course safely.',
                keys: [{ key: 'SHIFT', action: 'Boost to escape pull' }],
                gates: (() => {
                    const g = [];
                    for (let i = 0; i < 4; i++) {
                        g.push({ x: (i + 1) * 1200, y: (i % 2 === 0 ? 400 : -400), size: 180, reached: false });
                    }
                    return g;
                })(),
                hazards: [
                    { x: 1200, y: 0, type: 'blackhole', radius: 400 },
                    { x: 2400, y: 0, type: 'mine', radius: 150 },
                    { x: 3600, y: 0, type: 'blackhole', radius: 500 }
                ],
                showArrow: true,
                medals: { gold: 25, silver: 45, bronze: 70 },
                reward: { gold: 7500, silver: 5000, bronze: 3000 }
            }
        ];
    }

    updateTraining() {
        if (!this.game.trainingActive || !this.game.trainingLesson) return;

        // During briefing, check for any key press to dismiss
        if (this.game.trainingBriefing) {
            const timeSinceBriefing = performance.now() - this.game.trainingBriefingStart;
            if (timeSinceBriefing > 1500) { // Minimum 1.5s display
                // Check if any movement key is pressed
                const keys = this.game.keysPressed;
                if (keys['w'] || keys['a'] || keys['s'] || keys['d'] || keys[' '] || keys['enter']) {
                    this.game.dismissTrainingBriefing();
                }
            }
            return; // Don't update game logic during briefing
        }

        // Update timer
        this.game.trainingTimer = (performance.now() - this.game.trainingStartTime) / 1000;

        const lesson = this.game.trainingLesson;
        const ship = this.game.playerShip;

        // --- Check gem collection for lessons with gems ---
        if (lesson.gems && lesson.gems.length > 0) {
            for (const gem of lesson.gems) {
                if (gem.collected) continue;
                const dx = ship.x - gem.x;
                const dy = ship.y - gem.y;
                const dist = Math.hypot(dx, dy);
                if (dist < ship.size + 20) {
                    gem.collected = true;
                    this.game.trainingGemsCollected++;
                    // Add to actual inventory
                    if (!this.game.playerInventory[gem.type]) this.game.playerInventory[gem.type] = 0;
                    this.game.playerInventory[gem.type]++;
                    this.game.saveInventory();
                    this.game.collectionNotifications.push({
                        text: `+ ${MINERAL_TYPES[gem.type]?.name || gem.type}`,
                        color: MINERAL_TYPES[gem.type]?.color || '#fff',
                        time: Date.now()
                    });
                }
            }
        }

        // --- Check weaponry targets ---
        if (lesson.id === 'weaponry' && lesson.targets) {
            this.game.bullets.forEach(bullet => {
                lesson.targets.forEach(target => {
                    if (target.destroyed) return;
                    const dx = bullet.x - target.x;
                    const dy = bullet.y - target.y;
                    if (Math.hypot(dx, dy) < 40) {
                        target.destroyed = true;
                        bullet.life = 0;
                        this.game.hudManager.showToast('💥 Target Destroyed!');
                        // Mark associated gate as targetDestroyed
                        if (lesson.gates[target.id]) {
                            lesson.gates[target.id].targetDestroyed = true;
                        }
                    }
                });
            });
        }

        // --- Check shielding hazard zone ---
        if (lesson.id === 'shielding' && lesson.hazardZone) {
            const hz = lesson.hazardZone;
            const dist = Math.hypot(ship.x - hz.x, ship.y - hz.y);
            if (dist < hz.radius) {
                // Apply damage using standard damage system
                const dmg = hz.damage || 0.1;
                this.game.damagePlayer(dmg);
            }
        }

        // --- Check hazard navigation ---
        if (lesson.id === 'hazards' && lesson.hazards) {
            lesson.hazards.forEach(h => {
                const dist = Math.hypot(ship.x - h.x, ship.y - h.y);
                if (h.type === 'blackhole' && dist < h.radius) {
                    const pull = (1 - dist / h.radius) * 1.5;
                    const angle = Math.atan2(h.y - ship.y, h.x - ship.x);
                    ship.vx += Math.cos(angle) * pull;
                    ship.vy += Math.sin(angle) * pull;
                    if (dist < 50) {
                        this.game.hudManager.showToast('🌀 Sucked into the void! Restarting...');
                        this.game.startTraining(this.game.trainingLessonIndex);
                    }
                } else if (h.type === 'mine' && dist < h.radius) {
                    this.game.hudManager.showToast('💣 MINE DETONATED!');
                    this.game.damagePlayer(20);
                    h.x = -99999; // Move away
                }
            });
        }

        // --- Check gate progression ---
        if (lesson.id === 'collection') {
            // Collection lesson: need all gems first, then fly to finish gate
            if (this.game.trainingGemsCollected >= (lesson.collectTarget || lesson.gems.length)) {
                const finishGate = lesson.gates[lesson.gates.length - 1];
                const dx = ship.x - finishGate.x;
                const dy = ship.y - finishGate.y;
                if (Math.hypot(dx, dy) < finishGate.size * 1.2) {
                    finishGate.reached = true;
                    this.game.completeTrainingLesson();
                }
            }
        } else {
            // Standard gate progression
            const gate = lesson.gates[this.game.trainingGateIndex];
            if (gate) {
                // For weaponry, must destroy target first
                if (lesson.id === 'weaponry' && !gate.targetDestroyed) {
                    // Do nothing, wait for target
                } else {
                    const dx = ship.x - gate.x;
                    const dy = ship.y - gate.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < gate.size * 1.2) {
                        gate.reached = true;
                        this.game.trainingGateIndex++;
                        if (this.game.trainingGateIndex >= lesson.gates.length) {
                            this.game.completeTrainingLesson();
                        } else {
                            const total = lesson.gates.length;
                            const current = this.game.trainingGateIndex;
                            this.game.hudManager.showToast(`✅ Gate ${current}/${total} — Keep going!`);
                        }
                    }
                }
            }
        }
    }


    showMissionCompleteOverlay(mission) {
        // Remove any existing overlay
        const existing = document.getElementById('missionCompleteOverlay');
        if (existing) existing.remove();

        // Determine performance rank
        const elapsed = (Date.now() - mission.startTime) / 1000;
        let rank, rankColor, rankGlow;
        if (elapsed < 30) { rank = 'S'; rankColor = '#ffd700'; rankGlow = 'rgba(255,215,0,0.8)'; }
        else if (elapsed < 60) { rank = 'A'; rankColor = '#00ff88'; rankGlow = 'rgba(0,255,136,0.6)'; }
        else if (elapsed < 120) { rank = 'B'; rankColor = '#00ccff'; rankGlow = 'rgba(0,204,255,0.5)'; }
        else { rank = 'C'; rankColor = '#aaaaaa'; rankGlow = 'rgba(170,170,170,0.4)'; }

        // Build the overlay
        const overlay = document.createElement('div');
        overlay.id = 'missionCompleteOverlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 99999; pointer-events: none;
            display: flex; align-items: center; justify-content: center;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%);
            animation: mco-fadein 0.3s ease-out;
        `;

        // Particle canvas for celebration effects
        const particleCanvas = document.createElement('canvas');
        particleCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
        overlay.appendChild(particleCanvas);

        // Central achievement card
        const card = document.createElement('div');
        card.style.cssText = `
            position: relative; z-index: 2;
            background: linear-gradient(145deg, rgba(10,20,40,0.95), rgba(5,10,25,0.98));
            border: 2px solid ${rankColor};
            border-radius: 16px; padding: 40px 60px;
            text-align: center; font-family: 'Orbitron', 'Exo 2', monospace;
            box-shadow: 0 0 60px ${rankGlow}, 0 0 120px ${rankGlow}, inset 0 0 40px rgba(0,0,0,0.5);
            animation: mco-card-enter 0.6s cubic-bezier(0.2,0.8,0.2,1.2);
            max-width: 480px; min-width: 360px;
        `;

        // Mission type icon
        let typeIcon = '🎯';
        if (mission.type === 'kill' || mission.type === 'kill_any') typeIcon = '⚔️';
        else if (mission.type === 'boss') typeIcon = '👑';
        else if (mission.type === 'collect') typeIcon = '💎';
        else if (mission.type === 'survive') typeIcon = '🛡️';

        card.innerHTML = `
            <div style="font-size: 12px; color: #555; letter-spacing: 6px; margin-bottom: 8px; text-transform: uppercase;">Mission Complete</div>
            <div style="font-size: 48px; margin-bottom: 4px; filter: drop-shadow(0 0 10px ${rankGlow});">${typeIcon}</div>
            <div style="font-size: 22px; color: #fff; font-weight: 900; letter-spacing: 2px; margin-bottom: 4px;
                text-shadow: 0 0 20px rgba(255,255,255,0.3);">${mission.name}</div>
            <div style="font-size: 13px; color: #aaa; margin-bottom: 20px; font-style: italic;">${mission.desc}</div>

            <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px;">
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">RANK</div>
                    <div id="mco-rank" style="font-size: 42px; font-weight: 900; color: ${rankColor};
                        text-shadow: 0 0 30px ${rankGlow}, 0 0 60px ${rankGlow};
                        animation: mco-rank-pulse 1s ease-in-out infinite alternate;
                        opacity: 0; transform: scale(3);">${rank}</div>
                </div>
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">REWARD</div>
                    <div style="font-size: 32px; color: #ffd700; font-weight: bold;
                        text-shadow: 0 0 20px rgba(255,215,0,0.5);">
                        💎 <span id="mco-gem-counter">0</span>
                    </div>
                </div>
                <div>
                    <div style="font-size: 10px; color: #556; letter-spacing: 3px; margin-bottom: 4px;">TIME</div>
                    <div style="font-size: 22px; color: #8af; font-weight: bold;">${elapsed.toFixed(1)}s</div>
                </div>
            </div>

            <div style="height: 3px; background: linear-gradient(90deg, transparent, ${rankColor}, transparent);
                margin: 15px auto; width: 80%; border-radius: 2px;"></div>

            <div style="font-size: 11px; color: #667; letter-spacing: 2px; margin-top: 8px;">
                TOTAL MISSIONS: ${this.game.missionsCompleted}
            </div>
        `;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Inject keyframe animations
        if (!document.getElementById('mco-styles')) {
            const style = document.createElement('style');
            style.id = 'mco-styles';
            style.textContent = `
                @keyframes mco-fadein { from { opacity: 0; } to { opacity: 1; } }
                @keyframes mco-fadeout { from { opacity: 1; } to { opacity: 0; } }
                @keyframes mco-card-enter {
                    0% { opacity: 0; transform: scale(0.5) translateY(40px); }
                    60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
                    100% { transform: scale(1) translateY(0); }
                }
                @keyframes mco-rank-pulse {
                    from { text-shadow: 0 0 20px currentColor; }
                    to { text-shadow: 0 0 40px currentColor, 0 0 80px currentColor; }
                }
                @keyframes mco-rank-slam {
                    0% { opacity: 0; transform: scale(3); }
                    50% { opacity: 1; transform: scale(0.8); }
                    70% { transform: scale(1.15); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        // Animate rank letter slam-in after 0.5s
        setTimeout(() => {
            const rankEl = document.getElementById('mco-rank');
            if (rankEl) {
                rankEl.style.animation = 'mco-rank-slam 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards, mco-rank-pulse 1s ease-in-out infinite alternate 0.5s';
            }
        }, 500);

        // Animate gem counter tick-up
        const gemTarget = mission.reward;
        let gemCurrent = 0;
        const gemInterval = setInterval(() => {
            gemCurrent += Math.ceil(gemTarget / 30);
            if (gemCurrent >= gemTarget) {
                gemCurrent = gemTarget;
                clearInterval(gemInterval);
            }
            const counter = document.getElementById('mco-gem-counter');
            if (counter) counter.textContent = gemCurrent;
        }, 40);

        // Particle celebration system on canvas
        const resizeCanvas = () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        };
        resizeCanvas();

        const particles = [];
        const pCtx = particleCanvas.getContext('2d');
        const sparkColors = ['#ffd700', '#ff6b9d', '#00ff88', '#00ccff', '#ff44ff', '#ffaa00'];

        // Burst particles from center
        for (let i = 0; i < 120; i++) {
            const angle = (Math.PI * 2 * i) / 120 + (Math.random() - 0.5) * 0.5;
            const speed = 3 + Math.random() * 8;
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
                life: 1.0,
                decay: 0.008 + Math.random() * 0.012,
                gravity: 0.05 + Math.random() * 0.05,
                type: Math.random() > 0.5 ? 'spark' : 'star'
            });
        }

        // Side confetti streams
        for (let i = 0; i < 60; i++) {
            const side = Math.random() > 0.5 ? 0 : window.innerWidth;
            particles.push({
                x: side,
                y: window.innerHeight * Math.random() * 0.6,
                vx: (side === 0 ? 1 : -1) * (2 + Math.random() * 4),
                vy: -1 + Math.random() * 3,
                size: 3 + Math.random() * 5,
                color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
                life: 1.0,
                decay: 0.006 + Math.random() * 0.008,
                gravity: 0.08,
                type: 'confetti',
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.3
            });
        }

        let animFrame;
        const animateParticles = () => {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.vy += p.gravity;
                p.y += p.vy;
                p.life -= p.decay;
                if (p.rotation !== undefined) p.rotation += p.rotSpeed;

                if (p.life <= 0) { particles.splice(i, 1); continue; }

                pCtx.globalAlpha = p.life;

                if (p.type === 'spark') {
                    pCtx.beginPath();
                    pCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    pCtx.fillStyle = p.color;
                    pCtx.shadowBlur = 15;
                    pCtx.shadowColor = p.color;
                    pCtx.fill();
                    pCtx.shadowBlur = 0;
                } else if (p.type === 'star') {
                    pCtx.save();
                    pCtx.translate(p.x, p.y);
                    pCtx.fillStyle = p.color;
                    pCtx.shadowBlur = 10;
                    pCtx.shadowColor = p.color;
                    pCtx.font = `${p.size * 3}px serif`;
                    pCtx.fillText('✦', 0, 0);
                    pCtx.restore();
                    pCtx.shadowBlur = 0;
                } else if (p.type === 'confetti') {
                    pCtx.save();
                    pCtx.translate(p.x, p.y);
                    pCtx.rotate(p.rotation);
                    pCtx.fillStyle = p.color;
                    pCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                    pCtx.restore();
                }
            }
            pCtx.globalAlpha = 1;

            if (particles.length > 0) {
                animFrame = requestAnimationFrame(animateParticles);
            }
        };
        animateParticles();

        // Auto-dismiss after 5 seconds with fade-out
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.animation = 'mco-fadeout 0.8s ease-in forwards';
                setTimeout(() => {
                    cancelAnimationFrame(animFrame);
                    overlay.remove();
                }, 800);
            }
        }, 5000);
    }

    renderWelcomeOverlay(ctx) {
        // Version Indicator (Proof of Life)
        ctx.save();
        ctx.fillStyle = 'rgba(255, 105, 180, 0.9)';
        ctx.font = 'bold 14px Orbitron, sans-serif';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff69b4';
        ctx.fillText('🌸 LOTUS ENGINE V3.1 ACTIVE 🌸', 30, 40);
        ctx.restore();

        if (!this.game.showWelcomeOverlay) return;

        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const elapsed = (performance.now() - this.game.welcomeOverlayStart) / 1000;
        const fadeIn = Math.min(1, elapsed / 0.6);

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Backdrop
        ctx.globalAlpha = fadeIn * 0.8;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        // Card
        ctx.globalAlpha = fadeIn;
        const cardW = Math.min(520, w * 0.85);
        const cardH = 360;
        const cx = (w - cardW) / 2;
        const cy = (h - cardH) / 2;

        // Card background with gradient border
        ctx.fillStyle = 'rgba(5, 15, 30, 0.97)';
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#00f3ff';
        ctx.beginPath();
        ctx.roundRect(cx, cy, cardW, cardH, 16);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Welcome title
        ctx.textAlign = 'center';
        ctx.font = 'bold 36px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#00f3ff';
        ctx.fillText('🚀 Welcome, Pilot!', w / 2, cy + 55);
        ctx.shadowBlur = 0;

        // Subtitle
        ctx.font = '16px "Exo 2", sans-serif';
        ctx.fillStyle = '#8ba';
        ctx.fillText('Your journey through the cosmos begins here', w / 2, cy + 85);

        // Info lines
        ctx.font = '14px "Exo 2", sans-serif';
        ctx.fillStyle = '#d0eeff';
        const infoLines = [
            'Complete Flight Academy lessons to master piloting skills.',
            'Each lesson awards credits 💰 and precious elements 💎',
            'Higher medals earn rarer gems — from Iron to Emeralds!',
            'Complete all 7 lessons for a massive bonus reward.'
        ];
        infoLines.forEach((line, i) => {
            ctx.fillText(line, w / 2, cy + 120 + i * 26);
        });

        // Reward preview
        ctx.font = 'bold 13px "Exo 2", monospace';
        ctx.fillStyle = '#ffd700';
        const rewardY = cy + 120 + infoLines.length * 26 + 15;
        ctx.fillText('🏆 COMPLETION BONUS: $2,000 + Sapphire + Uranium', w / 2, rewardY);

        // Call to action button
        const btnW = 220;
        const btnH = 42;
        const btnX = w / 2 - btnW / 2;
        const btnY = rewardY + 30;
        const pulse = 1 + Math.sin(performance.now() * 0.004) * 0.08;

        ctx.fillStyle = 'rgba(0, 243, 255, 0.15)';
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15 * pulse;
        ctx.shadowColor = '#00f3ff';
        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnW, btnH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.font = 'bold 16px "Exo 2", sans-serif';
        ctx.fillStyle = '#00f3ff';
        ctx.fillText('🎓 BEGIN TRAINING', w / 2, btnY + 27);

        // Skip option
        const skipAlpha = elapsed > 2 ? 0.4 + Math.sin(performance.now() * 0.003) * 0.2 : 0;
        ctx.globalAlpha = skipAlpha;
        ctx.font = '12px "Exo 2", sans-serif';
        ctx.fillStyle = '#667788';
        ctx.fillText('Press ESC to skip', w / 2, btnY + btnH + 25);

        ctx.restore();

        // Handle input
        if (elapsed > 1) {
            if (this.game.keysPressed['enter'] || this.game.keysPressed['w'] || this.game.keysPressed[' ']) {
                this.game.dismissWelcomeOverlay(true);
            } else if (this.game.keysPressed['escape']) {
                this.game.dismissWelcomeOverlay(false);
            }
        }
    }



    updateMap() {
        // Render to both floating map and inline map
        const canvases = [
            document.getElementById('mapCanvas'),
            document.getElementById('inlineMapCanvas')
        ].filter(c => c);

        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            const w = canvas.width, h = canvas.height;
            const cx = w / 2, cy = h / 2;

            const mapRadius = 50000; // Increased to show entire universe
            const scale = (Math.min(w, h) / 2) / mapRadius;

            // Clear
            ctx.fillStyle = 'rgba(0,5,20,0.95)';
            ctx.fillRect(0, 0, w, h);

            // Offset to center on player
            const offsetX = -this.game.playerShip.x;
            const offsetY = -this.game.playerShip.y;

            // Draw Zones (centered at origin) - REDUCED OPACITY
            Object.values(GALAXY_ZONES).forEach(zone => {
                const r = zone.distanceRange.min * scale;
                ctx.beginPath();
                ctx.arc(cx + offsetX * scale, cy + offsetY * scale, r, 0, Math.PI * 2);
                ctx.strokeStyle = zone.color;
                ctx.globalAlpha = 0.08; // Much more subtle
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Draw Minerals (gems) - FILTERED
            // Only draw minerals if zoomed in or if they are high value to reduce noise
            ctx.globalAlpha = 0.5;
            this.game.minerals.forEach(mineral => {
                const dx = (mineral.x + offsetX) * scale;
                const dy = (mineral.y + offsetY) * scale;

                // Skip if off screen
                if (Math.abs(dx) > w / 2 || Math.abs(dy) > h / 2) return;

                // Skip low value minerals on zoomed out map
                if (scale < 0.0005 && ['quartz', 'iron'].includes(mineral.type)) return;

                ctx.fillStyle = mineral.color;
                ctx.fillRect(cx + dx - 1, cy + dy - 1, 2, 2); // fillRect is 100x faster than arc()
            });
            ctx.globalAlpha = 1;

            // Draw training gates on map (pulsing cyan markers)
            if (this.game.trainingActive && this.game.trainingLesson && this.game.trainingLesson.gates) {
                this.game.trainingLesson.gates.forEach((gate, i) => {
                    if (gate.reached) return;
                    const dx = (gate.x + offsetX) * scale;
                    const dy = (gate.y + offsetY) * scale;
                    if (Math.abs(dx) > w / 2 || Math.abs(dy) > h / 2) {
                        // Draw edge indicator if off-screen
                        const angle = Math.atan2(dy, dx);
                        const edgeR = Math.min(w, h) / 2 - 6;
                        const ex = cx + Math.cos(angle) * edgeR;
                        const ey = cy + Math.sin(angle) * edgeR;
                        ctx.fillStyle = '#00f3ff';
                        ctx.globalAlpha = 0.6 + Math.sin(Date.now() * 0.004 + i) * 0.3;
                        ctx.beginPath();
                        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        return;
                    }
                    const pulse = 1 + Math.sin(Date.now() * 0.004 + i) * 0.3;
                    // Outer glow
                    ctx.fillStyle = '#00f3ff';
                    ctx.globalAlpha = 0.25;
                    ctx.beginPath();
                    ctx.arc(cx + dx, cy + dy, 6 * pulse, 0, Math.PI * 2);
                    ctx.fill();
                    // Inner marker
                    ctx.globalAlpha = 0.9;
                    ctx.beginPath();
                    ctx.arc(cx + dx, cy + dy, 3, 0, Math.PI * 2);
                    ctx.fill();
                    // Gate label
                    ctx.font = 'bold 8px sans-serif';
                    ctx.fillStyle = '#00f3ff';
                    ctx.textAlign = 'center';
                    ctx.fillText(`G${i + 1}`, cx + dx, cy + dy - 7);
                    ctx.globalAlpha = 1;
                });
            }

            // Draw Deposits LAST - larger, foreground layer (CLUSTERS)
            this.game.resourceDeposits.forEach(dep => {
                const dx = (dep.x + offsetX) * scale;
                const dy = (dep.y + offsetY) * scale;

                if (Math.abs(dx) > w / 2 || Math.abs(dy) > h / 2) return;

                // Tier-based colors
                let color, glowColor, label, labelText;
                switch (dep.tier) {
                    case 1: color = '#4488ff'; glowColor = '#6699ff'; label = 'C'; labelText = 'Common'; break;
                    case 2: color = '#ff66ff'; glowColor = '#ff88ff'; label = 'R'; labelText = 'Rich'; break;
                    case 3: color = '#ffaa00'; glowColor = '#ffcc44'; label = 'E'; labelText = 'Epic'; break;
                    case 4: color = '#ff4400'; glowColor = '#ff6644'; label = 'L'; labelText = 'Legendary'; break;
                    case 5: color = '#ff00ff'; glowColor = '#ff44ff'; label = 'M'; labelText = 'Mythic'; break;
                    case 6: color = '#00ffff'; glowColor = '#44ffff'; label = 'G'; labelText = 'Galaxy'; break;
                    default: color = '#00f'; glowColor = '#44f'; label = '?'; labelText = 'Unknown'; break;
                }

                // Pulsing glow - Subtle now
                const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.2;

                // Outer glow
                ctx.fillStyle = glowColor;
                ctx.globalAlpha = 0.3;
                ctx.beginPath();
                ctx.arc(cx + dx, cy + dy, (4 + dep.tier) * pulse, 0, Math.PI * 2);
                ctx.fill();

                // Solid Core Icon (Diamond)
                ctx.globalAlpha = 1;
                ctx.fillStyle = color;
                const size = 3 + dep.tier; // Scaled by importance
                ctx.beginPath();
                ctx.moveTo(cx + dx, cy + dy - size);
                ctx.lineTo(cx + dx + size, cy + dy);
                ctx.lineTo(cx + dx, cy + dy + size);
                ctx.lineTo(cx + dx - size, cy + dy);
                ctx.closePath();
                ctx.fill();

                // Label - Only show text if nearby or high tier
                // Simplified logic: show full text only on hover-ish distance or high tier
                // For now, just show single Letter code unless really important
                ctx.fillStyle = '#fff';
                ctx.font = '10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, cx + dx, cy + dy);
            });
            ctx.globalAlpha = 1;

            // Draw Player (now always at center) - PROMINENT
            const px = cx;
            const py = cy;

            // Strong Glow for visibility over everything
            ctx.save();
            ctx.translate(px, py);

            // Pulsing outer ring
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 10 + Math.sin(Date.now() * 0.005) * 2, 0, Math.PI * 2);
            ctx.stroke();

            // Player Arrow
            ctx.rotate(this.game.playerShip.rotation + Math.PI / 2);
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            // Larger size (approx 3x previous size)
            ctx.moveTo(0, -12);
            ctx.lineTo(8, 8);
            ctx.lineTo(0, 4);
            ctx.lineTo(-8, 8);
            ctx.fill();
            ctx.restore();
            ctx.stroke();
        }); // End canvases.forEach
    }




    updateRadar() {
        const canvas = document.getElementById('radarCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        const cx = w / 2, cy = h / 2;

        // Clear
        ctx.clearRect(0, 0, w, h);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(0,255,100,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
        ctx.moveTo(0, cy); ctx.lineTo(w, cy);
        ctx.arc(cx, cy, 20, 0, Math.PI * 2);
        ctx.arc(cx, cy, 35, 0, Math.PI * 2);
        ctx.stroke();

        // Draw player (center)
        ctx.fillStyle = '#0f0';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw Pulse Ping Ring on Radar
        if (this.game.activePulsePing) {
            const now = Date.now();
            const elapsed = now - this.game.activePulsePing.startTime;
            if (elapsed < this.game.activePulsePing.duration) {
                const ringProgress = elapsed / this.game.activePulsePing.duration;
                ctx.strokeStyle = 'rgba(0, 255, 255, ' + (1 - ringProgress) + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(cx, cy, ringProgress * 35, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Draw nearby minerals as dots
        let radarRange = 2000;
        if (this.game.activePulsePing) {
            const now = Date.now();
            if (now - this.game.activePulsePing.startTime < this.game.activePulsePing.duration) {
                radarRange = this.game.activePulsePing.maxRadius || 3000;
            }
        }
        this.game.minerals.forEach(m => {
            const dx = m.x - this.game.playerShip.x;
            const dy = m.y - this.game.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radarRange) {
                const rx = cx + (dx / radarRange) * 35;
                const ry = cy + (dy / radarRange) * 35;
                ctx.fillStyle = m.color || '#f0f';
                ctx.beginPath();
                ctx.arc(rx, ry, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Draw space mines (Red triangles)
        this.game.spaceMines.forEach(m => {
            const dx = m.x - this.game.playerShip.x;
            const dy = m.y - this.game.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radarRange) {
                const rx = cx + (dx / radarRange) * 35;
                const ry = cy + (dy / radarRange) * 35;
                ctx.fillStyle = '#ff3333';
                ctx.beginPath();
                ctx.moveTo(rx, ry - 3);
                ctx.lineTo(rx + 3, ry + 3);
                ctx.lineTo(rx - 3, ry + 3);
                ctx.closePath();
                ctx.fill();
            }
        });

        // Draw turrets (Yellow squares)
        this.game.missileBases.forEach(t => {
            const dx = t.x - this.game.playerShip.x;
            const dy = t.y - this.game.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // PULSE: Radar Ping
            const isPulse = this.game.playerShip.type === 'pulse';
            if (dist < radarRange || isPulse) {
                const displayRange = isPulse ? Math.max(radarRange, 6000) : radarRange;
                let rx = cx + (dx / displayRange) * 35;
                let ry = cy + (dy / displayRange) * 35;

                if (isPulse && dist >= radarRange) {
                    const rdx = rx - cx, rdy = ry - cy;
                    const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                    if (rDist > 33) { // Clamp slightly inside edge
                        rx = cx + (rdx / rDist) * 33;
                        ry = cy + (rdy / rDist) * 33;
                    }
                }

                ctx.fillStyle = '#ffcc00';
                ctx.fillRect(rx - 2, ry - 2, 4, 4);
            }
        });

        // Draw black holes (Purple/Black circles)
        this.game.hazardBlackHoles.forEach(bh => {
            const dx = bh.x - this.game.playerShip.x;
            const dy = bh.y - this.game.playerShip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // PULSE: Radar Ping
            const isPulse = this.game.playerShip.type === 'pulse';
            if (dist < radarRange || isPulse) {
                const displayRange = isPulse ? Math.max(radarRange, 6000) : radarRange;
                let rx = cx + (dx / displayRange) * 35;
                let ry = cy + (dy / displayRange) * 35;

                if (isPulse && dist >= radarRange) {
                    const rdx = rx - cx, rdy = ry - cy;
                    const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                    if (rDist > 33) {
                        rx = cx + (rdx / rDist) * 33;
                        ry = cy + (rdy / rDist) * 33;
                    }
                }

                ctx.strokeStyle = '#aa00ff';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(rx, ry, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Draw Mission Targets (high visibility orange crosshairs)
        if (this.game.activeMission) {
            const m = this.game.activeMission;
            const targetColor = '#ff8800';

            let targets = [];
            if (m.type === 'kill' || m.type === 'kill_any') {
                targets = this.game.enemyShips.filter(e => m.type === 'kill_any' || e.type === m.targetType);
            } else if (m.type === 'mine') {
                targets = this.game.minerals;
            }

            targets.forEach(t => {
                const dx = t.x - this.game.playerShip.x;
                const dy = t.y - this.game.playerShip.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Show mission targets way farther out on radar
                const effectiveRange = Math.max(radarRange, 10000); 
                const rx = cx + (dx / effectiveRange) * 35;
                const ry = cy + (dy / effectiveRange) * 35;
                
                // Clamp to edge of radar
                const rdx = rx - cx, rdy = ry - cy;
                const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                let finalX = rx, finalY = ry;
                if (rDist > 34) {
                    finalX = cx + (rdx / rDist) * 34;
                    finalY = cy + (rdy / rDist) * 34;
                }

                // Pulsing crosshair
                const pulse = 1 + Math.sin(Date.now() * 0.008) * 0.3;
                const sz = 3 * pulse;
                ctx.strokeStyle = targetColor;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(finalX - sz, finalY);
                ctx.lineTo(finalX + sz, finalY);
                ctx.moveTo(finalX, finalY - sz);
                ctx.lineTo(finalX, finalY + sz);
                ctx.stroke();
            });
        }

        // Draw training gates (cyan diamonds) — essential for Lesson 6 radar navigation
        if (this.game.trainingActive && this.game.trainingLesson && this.game.trainingLesson.gates) {
            this.game.trainingLesson.gates.forEach((gate, i) => {
                if (gate.reached) return;
                const dx = gate.x - this.game.playerShip.x;
                const dy = gate.y - this.game.playerShip.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Extended range so far gates still show at edge
                const effectiveRange = Math.max(radarRange, 8000);
                const rx = cx + (dx / effectiveRange) * 35;
                const ry = cy + (dy / effectiveRange) * 35;
                // Clamp to radar circle
                const rdx = rx - cx, rdy = ry - cy;
                const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                let finalX = rx, finalY = ry;
                if (rDist > 34) {
                    finalX = cx + (rdx / rDist) * 34;
                    finalY = cy + (rdy / rDist) * 34;
                }
                // Pulsing cyan diamond
                const pulse = 1 + Math.sin(Date.now() * 0.005 + i) * 0.3;
                const sz = 4 * pulse;
                ctx.fillStyle = '#00f3ff';
                ctx.globalAlpha = 0.9;
                ctx.beginPath();
                ctx.moveTo(finalX, finalY - sz);
                ctx.lineTo(finalX + sz, finalY);
                ctx.lineTo(finalX, finalY + sz);
                ctx.lineTo(finalX - sz, finalY);
                ctx.closePath();
                ctx.fill();
                // Gate number label
                ctx.font = 'bold 7px sans-serif';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';
                ctx.fillText(`G${i + 1}`, finalX, finalY + sz + 8);
                ctx.globalAlpha = 1;
            });
        }
    }

}
window.MissionManager = MissionManager;
