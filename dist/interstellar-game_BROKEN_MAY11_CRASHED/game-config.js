// ============================================================
// GAME CONFIG — game-config.js
// Centralised game data, extracted from script.js (Phase 8)
// ============================================================

const MINERAL_TYPES = {
    // ============ INDUSTRIAL ZONE (50% spawn rate in industrial galaxies) ============
    iron: { name: 'Iron', value: 10, color: '#8B8680', rarity: 'common', size: 15, zone: 'industrial', use: 'Basic construction' },
    copper: { name: 'Copper', value: 25, color: '#B87333', rarity: 'common', size: 15, zone: 'industrial', use: 'Wiring, conductors' },
    coal: { name: 'Coal', value: 15, color: '#36454F', rarity: 'common', size: 12, zone: 'industrial', use: 'Fuel source' },
    titanium: { name: 'Titanium', value: 80, color: '#878681', rarity: 'common', size: 16, zone: 'industrial', use: 'Armor plating' },
    silicon: { name: 'Silicon', value: 45, color: '#A0A0A0', rarity: 'common', size: 14, zone: 'industrial', use: 'Electronics, circuits' },
    // ============ PRECIOUS ZONE (25% spawn rate in precious galaxies) ============
    silver: { name: 'Silver', value: 150, color: '#C0C0C0', rarity: 'uncommon', size: 18, zone: 'precious', use: 'Currency, conductors' },
    gold: { name: 'Gold', value: 400, color: '#FFD700', rarity: 'uncommon', size: 20, zone: 'precious', use: 'Electronics, currency' },
    platinum: { name: 'Platinum', value: 500, color: '#E5E4E2', rarity: 'uncommon', size: 20, zone: 'precious', use: 'Catalysts, jewelry' },
    palladium: { name: 'Palladium', value: 600, color: '#CED0DD', rarity: 'uncommon', size: 19, zone: 'precious', use: 'Fuel cells, catalysts' },
    // ============ CRYSTAL ZONE (15% spawn rate in crystal galaxies) ============
    quartz: { name: 'Quartz', value: 800, color: '#F5F5F5', rarity: 'rare', size: 22, zone: 'crystal', use: 'Optics, sensors' },
    diamond: { name: 'Diamond', value: 2500, color: '#B9F2FF', rarity: 'rare', size: 25, zone: 'crystal', use: 'Cutting tools, lasers' },
    emerald: { name: 'Emerald', value: 3000, color: '#50C878', rarity: 'rare', size: 25, zone: 'crystal', use: 'Energy focusing' },
    ruby: { name: 'Ruby', value: 2800, color: '#E0115F', rarity: 'rare', size: 25, zone: 'crystal', use: 'Laser amplification' },
    sapphire: { name: 'Sapphire', value: 3200, color: '#0F52BA', rarity: 'rare', size: 25, zone: 'crystal', use: 'Shield technology' },
    // ============ NUCLEAR ZONE (7% spawn rate near black holes) ============
    uranium: { name: 'Uranium', value: 8000, color: '#4AFF00', rarity: 'epic', size: 28, zone: 'nuclear', use: 'Nuclear reactors' },
    plutonium: { name: 'Plutonium', value: 12000, color: '#00FF7F', rarity: 'epic', size: 28, zone: 'nuclear', use: 'Advanced power' },
    helium3: { name: 'Helium-3', value: 15000, color: '#87CEEB', rarity: 'epic', size: 26, zone: 'nuclear', use: 'Fusion reactors' },
    // ============ EXOTIC ZONE (3% spawn rate - edge of space) ============
    neodymium: { name: 'Neodymium', value: 25000, color: '#FF6EC7', rarity: 'legendary', size: 30, zone: 'exotic', use: 'Magnet tech' },
    lanthanum: { name: 'Lanthanum', value: 30000, color: '#9D00FF', rarity: 'legendary', size: 32, zone: 'exotic', use: 'Hybrid engines' },
    darkmatter: { name: 'Dark Matter', value: 100000, color: '#1a0033', rarity: 'mythic', size: 35, zone: 'exotic', use: 'Warp drives' },
    antimatter: { name: 'Antimatter', value: 150000, color: '#FF00FF', rarity: 'mythic', size: 35, zone: 'exotic', use: 'Annihilation power' },
    lotus: { name: 'Mindwave Lotus', value: 500000, color: '#ff69b4', rarity: 'transcendental', size: 40, zone: 'all', use: 'Ultimate Enlightenment' }
};

const SUPPLY_TYPES = {
    food: { name: 'Ration Pack', cost: 100, desc: 'Essential for surface survival', color: '#ffcc00', icon: '🍞' },
    repairs: { name: 'Nanite Repair Kit', cost: 500, desc: 'Repairs 25 hull health', color: '#00ccff', icon: '🔧' },
    oxygen: { name: 'Oxygen Canister', cost: 200, desc: 'Required for high-altitude flight', color: '#ffffff', icon: '💨' }
};
window.SUPPLY_TYPES = SUPPLY_TYPES;

const GALAXY_ZONES = {
    industrial: { name: 'Industrial Sector', color: '#8B8680', glowColor: 'rgba(139, 134, 128, 0.3)', elements: ['iron', 'copper', 'coal', 'titanium', 'silicon'], concentrationBonus: 3.0, defenseLevel: 1, distanceRange: { min: 100, max: 800 } },
    precious: { name: 'Precious Nebula', color: '#FFD700', glowColor: 'rgba(255, 215, 0, 0.3)', elements: ['silver', 'gold', 'platinum', 'palladium'], concentrationBonus: 2.5, defenseLevel: 2, distanceRange: { min: 800, max: 2000 } },
    crystal: { name: 'Crystal Fields', color: '#50C878', glowColor: 'rgba(80, 200, 120, 0.3)', elements: ['quartz', 'diamond', 'emerald', 'ruby', 'sapphire'], concentrationBonus: 2.0, defenseLevel: 3, distanceRange: { min: 2000, max: 4000 } },
    nuclear: { name: 'Radiation Belt', color: '#4AFF00', glowColor: 'rgba(74, 255, 0, 0.4)', elements: ['uranium', 'plutonium', 'helium3'], concentrationBonus: 1.5, defenseLevel: 4, distanceRange: { min: 3500, max: 5000 } },
    exotic: { name: 'Dark Frontier', color: '#9D00FF', glowColor: 'rgba(157, 0, 255, 0.4)', elements: ['neodymium', 'lanthanum', 'darkmatter', 'antimatter'], concentrationBonus: 1.0, defenseLevel: 5, distanceRange: { min: 5000, max: 8000 } }
};

// Make available globally for backward compat
window.MINERAL_TYPES = MINERAL_TYPES;
window.GALAXY_ZONES = GALAXY_ZONES;

// --- Enemy Ship Types ---
const ENEMY_TYPES = {
        scout: {
            name: 'Scout',
            health: 50,
            maxSpeed: 3.0,
            acceleration: 0.08,
            fireRate: 1200, // Faster firing
            aggroRange: 600,
            attackRange: 400,
            bulletSpeed: 12, // Faster bullets
            bulletDamage: 10,
            gemDrop: 5,
            color: '#ff4444',
            glowColor: 'rgba(255, 68, 68, 0.6)',
            size: 18
        },
        fighter: {
            name: 'Fighter',
            health: 100,
            maxSpeed: 2.5,
            acceleration: 0.06,
            fireRate: 1000, // Faster firing
            aggroRange: 800,
            attackRange: 500,
            bulletSpeed: 14, // Faster bullets
            bulletDamage: 15,
            gemDrop: 15,
            color: '#ff8800',
            glowColor: 'rgba(255, 136, 0, 0.6)',
            size: 24
        },
        cruiser: {
            name: 'Cruiser',
            health: 200,
            maxSpeed: 1.5,
            acceleration: 0.03,
            fireRate: 2000, // Faster firing
            aggroRange: 1000,
            attackRange: 600,
            bulletSpeed: 10, // Faster bullets
            bulletDamage: 25,
            gemDrop: 40,
            burstCount: 3,
            burstDelay: 200,
            color: '#aa44ff',
            glowColor: 'rgba(170, 68, 255, 0.6)',
            size: 32
        },
        void_echo: {
            name: 'Void Echo',
            health: 300,
            maxSpeed: 4.0,
            acceleration: 0.1,
            fireRate: 800,
            aggroRange: 1500,
            attackRange: 800,
            bulletSpeed: 20,
            bulletDamage: 40,
            gemDrop: 50,
            color: '#ff00ff',
            glowColor: 'rgba(255, 0, 255, 0.8)',
            size: 28,
            isVoid: true // Special flag for void mechanics
        }
    };
window.ENEMY_TYPES = ENEMY_TYPES;

// --- Boss Types ---
const BOSS_TYPES = {
        dreadnought: {
            name: 'Dreadnought',
            health: 500,
            size: 50,
            speed: 1.2,
            acceleration: 0.02,
            fireRate: 1500,
            bulletSpeed: 6,
            bulletDamage: 20,
            gemReward: 100,
            color: '#ff2222',
            glowColor: 'rgba(255, 34, 34, 0.7)',
            mechanic: 'shield_arc' // Frontal shield, attack from behind
        },
        hivequeen: {
            name: 'Hive Queen',
            health: 400,
            size: 45,
            speed: 1.0,
            acceleration: 0.015,
            fireRate: 2500,
            bulletSpeed: 5,
            bulletDamage: 15,
            gemReward: 150,
            color: '#44ff44',
            glowColor: 'rgba(68, 255, 68, 0.7)',
            mechanic: 'spawn_swarm' // Spawns scouts every 5s
        },
        voidreaper: {
            name: 'Void Reaper',
            health: 600,
            size: 55,
            speed: 2.0,
            acceleration: 0.04,
            fireRate: 2000,
            bulletSpeed: 5,
            bulletDamage: 30,
            gemReward: 200,
            color: '#9944ff',
            glowColor: 'rgba(153, 68, 255, 0.7)',
            mechanic: 'teleport' // Teleports when hit, fires homing bolts
        }
    };
window.BOSS_TYPES = BOSS_TYPES;

// --- Weapon Types ---
const WEAPON_TYPES = {
    pulse_laser: {
        id: 'pulse_laser',
        name: 'Pulse Laser',
        description: 'Standard rapid-fire laser system.',
        damage: 25,
        fireRate: 200,
        speed: 25,
        color: '#00ffcc',
        width: 4,
        length: 40,
        cost: 0,
        unlocked: true
    },
    ion_cannon: {
        id: 'ion_cannon',
        name: 'Ion Cannon',
        description: 'Heavy energy blasts that disrupt enemy shields.',
        damage: 60,
        fireRate: 500,
        speed: 20,
        color: '#00aaff',
        width: 8,
        length: 50,
        cost: 5000,
        unlocked: false
    },
    heavy_railgun: {
        id: 'heavy_railgun',
        name: 'Heavy Railgun',
        description: 'Kinetic penetrator with massive stopping power.',
        damage: 150,
        fireRate: 1200,
        speed: 35,
        color: '#ff4400',
        width: 10,
        length: 70,
        cost: 15000,
        unlocked: false
    },
    photon_repeater: {
        id: 'photon_repeater',
        name: 'Photon Repeater',
        description: 'Experimental ultra-high rate of fire beam.',
        damage: 15,
        fireRate: 80,
        speed: 30,
        color: '#00ffff',
        width: 2,
        length: 30,
        cost: 25000,
        unlocked: false
    }
};
window.WEAPON_TYPES = WEAPON_TYPES;

// --- Mission Templates ---
const MISSION_TEMPLATES = [
        // TIER 1: BASICS — Teach the player how to exist in the game
        {
            type: 'collect', name: 'First Steps', tier: 1,
            desc: 'Fly into {goal} glowing gems floating nearby',
            briefing: 'See those colorful crystals floating around you? Those are gems! Just fly your ship into them to pick them up — no buttons needed, just touch them. Use W to go forward, A/D to turn, SHIFT to go faster.',
            hint: '💡 Just fly INTO the gems • W = forward • A/D = turn • SHIFT = fast',
            goal: 5, reward: 500
        },
        {
            type: 'collect', name: 'Resource Expedition', tier: 1,
            desc: 'Pick up {goal} gems — fly further out for rarer ones',
            briefing: 'Gems come in different types: common ones are dull, rare ones glow brighter and are worth more. Fly away from where you started to find better gems. Check your Radar (circle in top-left) to see gem dots nearby.',
            hint: '💡 Fly further from start = better gems • Radar shows nearby gems',
            goal: 15, reward: 750
        },
        {
            type: 'survive', name: 'Stay Alive', tier: 1,
            desc: 'Fly around for {goal} seconds without dying',
            briefing: 'Your ship can be destroyed! Red triangles on your radar are space mines — avoid them. If you see red dots moving toward you, those are enemies — fly away for now. Your health bar is in the Ship Status window. Timer starts when you accept this mission.',
            hint: '🛡️ Red triangles = mines (avoid!) • Red dots = enemies • SHIFT = escape fast',
            goal: 30, reward: 600
        },

        // TIER 2: COMBAT — Teach the player how to fight
        {
            type: 'kill', name: 'Weapons Training', tier: 2, targetType: 'scout',
            desc: 'Press SPACE to shoot and destroy {goal} Scout ships',
            briefing: 'Your ship has guns! Hold SPACE to fire lasers. When you accept this mission, Scout ships will spawn nearby — look for red dots on your radar. Fly toward them and hold SPACE to shoot. Scouts are weak and die in a few hits.',
            hint: '⚔️ Hold SPACE to shoot! • Red dots on radar = enemies • Fly toward them',
            goal: 3, reward: 1500
        },
        {
            type: 'kill', name: 'Fighter Patrol', tier: 2, targetType: 'fighter',
            desc: 'Destroy {goal} Fighters — they shoot back!',
            briefing: 'Fighters are tougher than Scouts and will fire at you! Keep your ship moving while shooting (hold W + SPACE together). If your health drops low, fly away with SHIFT to boost. Destroyed enemies drop bonus gems!',
            hint: '⚔️ W + SPACE = fly and shoot • SHIFT = escape if low health',
            goal: 3, reward: 2000
        },
        {
            type: 'kill_any', name: 'Space Cleaner', tier: 2,
            desc: 'Destroy {goal} enemies of any kind (SPACE to fire)',
            briefing: 'Kill any enemies you find — Scouts, Fighters, anything counts. Enemies appear as red dots on your radar. After killing enemies, spend your gems on upgrades! Click the 🛠️ UPGRADES button in the menu bar to make your ship stronger.',
            hint: '⚔️ Any enemy counts • SPACE = fire • 🛠️ UPGRADES button = power up your ship',
            goal: 8, reward: 2500
        },
        {
            type: 'sabotage', name: 'Operation: Sabotage', tier: 2,
            desc: 'Clear {goal} Space Mines from the sector',
            briefing: 'Space mines (red triangles) are drifting everywhere. Use your lasers (SPACE) to detonate them from a safe distance. This clears the way for our freighters. Be careful: their explosion radius is large!',
            hint: '💣 Shoot red triangles • Stay back! • Large explosion radius',
            goal: 10, reward: 1800
        },

        // TIER 3: ADVANCED — Challenge the player
        {
            type: 'collect', name: 'Deep Mining', tier: 3,
            desc: 'Collect {goal} gems — explore far from spawn',
            briefing: 'You need a lot of gems for this one. Press M to open your Galaxy Map and see the full universe. Fly far from center to find richer gem fields. Pro tip: the Hauler ship (in Hangar 🚀) has a Tractor Beam that magnetically pulls gems toward you!',
            hint: '💎 M = Galaxy Map • Hauler ship = magnet for gems • Fly far out',
            goal: 30, reward: 5000
        },
        {
            type: 'survive', name: 'Endurance Run', tier: 3,
            desc: 'Stay alive for {goal} seconds — things get dangerous',
            briefing: 'The further you fly from where you started, the more dangerous space gets — more mines, turrets, and enemies appear. For this mission, just survive! You can dodge with R/F (pitch up/down) and Z/X (barrel roll). Timer runs from when you accept.',
            hint: '🛡️ R/F = pitch • Z/X = barrel roll • Fly away from danger • Stay alive!',
            goal: 60, reward: 6000
        },
        {
            type: 'siege', name: 'Operation: Fortress Siege', tier: 3,
            desc: 'Destroy {goal} Missile Launch Bases',
            briefing: 'Standard enemy patrols are one thing, but their stationary Missile Bases are the real threat. They fire long-range heat-seeking missiles. Destroy the bases to weaken their hold on this sector. Use SHIFT to outrun the missiles!',
            hint: '🛡️ Destroy red circular bases • Outrun missiles with SHIFT • High reward',
            goal: 2, reward: 8000
        },
        {
            type: 'defense', name: 'Operation: Citadel Guard', tier: 3,
            desc: 'Protect your Planetary Base from Mauler Siege Fleet',
            briefing: 'Enemy forces have located your base! A squadron of armored Maulers is moving in to dismantle your structures. Return to your base coordinates immediately and hold the line. Use your base turrets for support!',
            hint: '🛡️ Defend your Base • Maulers are slow but tough • Look for base icon on radar',
            goal: 4, reward: 7500
        },

        // TIER 4: BOSS FIGHTS — The ultimate challenge
        {
            type: 'boss', name: 'Boss: Dreadnought', tier: 4, bossType: 'dreadnought',
            desc: 'A massive warship spawns — destroy it! (SPACE to fire)',
            briefing: 'When you accept, a Dreadnought boss will spawn near you. It has front shields — fly BEHIND it to deal damage! Hold SPACE to fire. Use SHIFT to boost past its missiles. This is a real fight — make sure your ship is upgraded first!',
            hint: '👑 Fly BEHIND it! • Front shields block shots • SHIFT dodges missiles',
            goal: 1, reward: 18000
        },
        {
            type: 'boss', name: 'Boss: Hive Queen', tier: 4, bossType: 'hivequeen',
            desc: 'A giant alien queen spawns — destroy it!',
            briefing: 'The Hive Queen spawns swarms of small drones. Kill the drones first (SPACE to fire), then focus on the Queen. She moves unpredictably so be patient. Reward: 150 gems — the biggest payout yet!',
            hint: '👑 Kill drones first • Then focus the Queen • Be patient!',
            goal: 1, reward: 22000
        },
        {
            type: 'boss', name: 'Boss: Void Reaper', tier: 4, bossType: 'voidreaper',
            desc: 'The deadliest boss in the game — can you beat it?',
            briefing: 'The Void Reaper teleports and fires devastating energy beams. Keep your distance and only attack during its cooldown windows. This is the hardest fight in the game. Reward: 200 gems!',
            hint: '👑 It teleports! • Attack during cooldowns only • Hardest boss!',
            goal: 1, reward: 30000
        },
        {
            type: 'kill_any', name: 'Legendary Rampage', tier: 4,
            desc: 'Destroy {goal} enemies — try different ships from the Hangar!',
            briefing: 'All-out war. Destroy everything. Each ship in the Hangar (🚀 SHIP button) has a unique special ability — try them all! The Viper has speed boost, the Titan has armor, the Flux can phase through damage. Pick your favorite and dominate!',
            hint: '⚔️ 🚀 SHIP button = switch ships • Each ship has a unique ability!',
            goal: 15, reward: 15000
        },
        // TIER 3/4: LOGISTICS MISSIONS (Phase 10)
        {
            type: 'patrol', name: 'Deep Space Patrol', tier: 3,
            desc: 'Patrol outer rim for {goal}s',
            briefing: 'High-altitude patrol requires oxygen reserves. Ensure you have at least 2 Oxygen Canisters before departure.',
            hint: '💨 Requires 2 Oxygen • Survival mission in deep space',
            goal: 90, reward: 9000,
            requiredSupplies: { oxygen: 2 }
        },
        {
            type: 'delivery', name: 'Colony Supply Run', tier: 2,
            desc: 'Deliver vital supplies to frontier outpost',
            briefing: 'Our distant colonies are in dire need of rations. Carry 3 Ration Packs to the coordinates marked on your radar.',
            hint: '🍞 Requires 3 Food • Head to the orange diamond on radar',
            goal: 1, reward: 4000,
            requiredSupplies: { food: 3 }
        },
        {
            type: 'salvage', name: 'Combat Salvage Recon', tier: 3,
            desc: 'Recover data from derelict in hostile space',
            briefing: 'A research vessel was downed in a minefield. You will need at least 2 Nanite Repair Kits to stabilize your hull during extraction.',
            hint: '🔧 Requires 2 Repairs • Navigating heavy minefields',
            goal: 1, reward: 7500,
            requiredSupplies: { repairs: 2 }
        }
    ];
window.MISSION_TEMPLATES = MISSION_TEMPLATES;
