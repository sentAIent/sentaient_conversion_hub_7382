// Extracted Constants

export const equipmentDB = {
            weapons: {
                basic_laser: { name: "Basic Laser", type: "weapon", damage: 10, speed: 20, cooldown: 10, color: "#00f3ff", cost: 0, description: "Standard plasma emitter." },
                plasma_cannon: { name: "Plasma Cannon", type: "weapon", damage: 25, speed: 15, cooldown: 20, color: "#ff00ff", cost: 500, description: "High-damage, slow-firing plasma burst." },
                rapid_blaster: { name: "Rapid Blaster", type: "weapon", damage: 5, speed: 25, cooldown: 5, color: "#ffff00", cost: 1000, description: "High rate of fire, low damage." },
                missile_pod: { name: "Missile Pod", type: "weapon", damage: 40, speed: 10, cooldown: 60, color: "#ff5500", cost: 2500, description: "Fires seeking missiles." }
            },
            engine: {
                basic_engine: { name: "Basic Engine", type: "engine", maxSpeedBonus: 0, accelBonus: 0, cost: 0, description: "Standard propulsion system." },
                ion_thruster: { name: "Ion Thruster", type: "engine", maxSpeedBonus: 20, accelBonus: 0.2, cost: 1500, description: "Increases top speed and acceleration." },
                warp_drive: { name: "Warp Drive", type: "engine", maxSpeedBonus: 50, accelBonus: 0.5, cost: 5000, description: "State of the art propulsion." }
            },
            shield: {
                basic_shield: { name: "Basic Shield", type: "shield", capacity: 100, rechargeRate: 0.1, cost: 0, description: "Standard deflector shield." },
                advanced_shield: { name: "Advanced Shield", type: "shield", capacity: 250, rechargeRate: 0.2, cost: 2000, description: "High-capacity energy shield." },
                fortress_shield: { name: "Fortress Shield", type: "shield", capacity: 500, rechargeRate: 0.5, cost: 8000, description: "Military-grade deflection barrier." }
            },
            wings: {
                basic_wings: { name: "Standard Wings", type: "wings", rotationBonus: 0, cost: 0, description: "Standard aerodynamic wings." },
                delta_wings: { name: "Delta Wings", type: "wings", rotationBonus: 0.05, cost: 1200, description: "Increases turn speed significantly." },
                x_wings: { name: "X-Wings", type: "wings", rotationBonus: 0.1, cost: 3000, description: "Superior maneuverability." }
            },
            radar: {
                basic_radar: { name: "Basic Radar", type: "radar", range: 1500, mapVisibility: false, cost: 0, description: "Standard proximity radar." },
                advanced_radar: { name: "Advanced Radar", type: "radar", range: 3000, mapVisibility: true, cost: 1000, description: "Extended range, shows enemies on Map." },
                deep_space_radar: { name: "Deep Space Radar", type: "radar", range: 6000, mapVisibility: true, cost: 4000, description: "Massive range, full Map awareness." }
            }
        };

export const baseModules = {
            command: { name: 'Command Center', cost: 1000, icon: '🏛️', required: null },
            storage: { name: 'Storage Vault', cost: 500, icon: '📦', required: 'command' },
            research: { name: 'R&D Lab', cost: 2000, icon: '🔬', required: 'command', resourceCost: { quartz: 50 } },
            engineering: { name: 'Engineering Bay', cost: 1500, icon: '🔧', required: 'command', resourceCost: { titanium: 30 } },
            manufacturing: { name: 'Manufacturing', cost: 2500, icon: '🏭', required: 'engineering', resourceCost: { iron: 100 } },
            hydroponics: { name: 'Hydroponics', cost: 1000, icon: '🌱', required: 'command', resourceCost: { silicon: 20 } },
            refinery: { name: 'Refinery', cost: 2000, icon: '⚗️', required: 'manufacturing', resourceCost: { coal: 50 } },
            defense: { name: 'Defense Turret', cost: 1500, icon: '🔫', required: 'command', resourceCost: { copper: 25 } },
            shield: { name: 'Shield Generator', cost: 3000, icon: '🛡️', required: 'engineering', resourceCost: { ruby: 10 } },
            teleport: { name: 'Teleport Pad', cost: 10000, icon: '🌀', required: 'research', resourceCost: { darkmatter: 5 } },
            hangar: { name: 'Hangar Bay', cost: 5000, icon: '🛸', required: 'command', resourceCost: { titanium: 50 } },
            trading: { name: 'Trading Post', cost: 3000, icon: '💱', required: 'command', resourceCost: { gold: 20 } },
        };

export const mineralTypes = {
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

export const galaxyZones = {
            industrial: {
                name: 'Industrial Sector',
                color: '#8B8680',
                glowColor: 'rgba(139, 134, 128, 0.3)',
                elements: ['iron', 'copper', 'coal', 'titanium', 'silicon'],
                concentrationBonus: 3.0,
                defenseLevel: 1,
                distanceRange: { min: 100, max: 800 }
            },
            precious: {
                name: 'Precious Nebula',
                color: '#FFD700',
                glowColor: 'rgba(255, 215, 0, 0.3)',
                elements: ['silver', 'gold', 'platinum', 'palladium'],
                concentrationBonus: 2.5,
                defenseLevel: 2,
                distanceRange: { min: 800, max: 2000 }
            },
            crystal: {
                name: 'Crystal Fields',
                color: '#50C878',
                glowColor: 'rgba(80, 200, 120, 0.3)',
                elements: ['quartz', 'diamond', 'emerald', 'ruby', 'sapphire'],
                concentrationBonus: 2.0,
                defenseLevel: 3,
                distanceRange: { min: 2000, max: 4000 }
            },
            nuclear: {
                name: 'Radiation Belt',
                color: '#4AFF00',
                glowColor: 'rgba(74, 255, 0, 0.4)',
                elements: ['uranium', 'plutonium', 'helium3'],
                concentrationBonus: 1.5,
                defenseLevel: 4,
                distanceRange: { min: 3500, max: 5000 }
            },
            exotic: {
                name: 'Dark Frontier',
                color: '#9D00FF',
                glowColor: 'rgba(157, 0, 255, 0.4)',
                elements: ['neodymium', 'lanthanum', 'darkmatter', 'antimatter'],
                concentrationBonus: 1.0,
                defenseLevel: 5,
                distanceRange: { min: 5000, max: 8000 }
            }
        };

export const hangarShips = [
    { id: 'interceptor', name: 'INTERCEPTOR', model: 'Scout Mark IV', speed: 90, armor: 'Light', power: 'Nimble Dash', desc: 'Standard issue Aether Fleet scout. High visibility, extreme agility.', premium: false },
    { id: 'orion', name: 'ORION', model: 'Cosmos Custom', speed: 100, armor: 'Medium', power: 'Constellation Sync', desc: 'A custom frame built from raw stardust. Adapts to your drawings.', premium: false },
    { id: 'hauler', name: 'MAULER', model: 'Juggernaut-9', speed: 70, armor: 'Heavy+', power: 'Gravity Well', desc: 'Massive armored hull capable of towing stars. Industrial powerhouse.', premium: false },
    { id: 'draco', name: 'DRACO', model: 'Dragon-Wing', speed: 130, armor: 'Light', power: 'Hyper-Cruise', desc: 'Built for pure velocity. The fastest non-pro vessel in the sector.', premium: false },
    { id: 'phoenix', name: 'PHOENIX', model: 'S-77 Firebird', speed: 95, armor: 'Renewable', power: 'Solar Siphon', desc: 'Advanced hull that regenerates from cosmic radiation.', premium: false },
    { id: 'saucer', name: 'SAUCER', model: 'Ancient Disk', speed: 110, armor: 'Shielded', power: 'Inertia Nullifier', desc: 'Mysterious tech from the inner rings. Defies standard physics.', premium: true },
    { id: 'harvester', name: 'STARFIGHTER', model: 'Mk. Infinity', speed: 140, armor: 'Aegis+', power: 'Final Strike', desc: 'The ultimate combat vessel. Apex of Aether engineering.', premium: true },
    { id: 'viper', name: 'VIPER', model: 'V-12 Strike', speed: 120, armor: 'Medium', power: 'Speed Surge', desc: 'Elite interceptor with extreme burst acceleration modules.', premium: true },
    { id: 'bulwark', name: 'BULWARK', model: 'Titan Ward', speed: 60, armor: 'Fortress', power: 'Shield Regen', desc: 'The ultimate defensive platform. Near-impenetrable armor plating.', premium: true },
    { id: 'prospector', name: 'PROSPECTOR', model: 'Mining Rig', speed: 80, armor: 'Reinforced', power: 'Gem Magnet', desc: 'Optimized for resource extraction with powerful magnetic fields.', premium: true },
    { id: 'spectre', name: 'SPECTRE', model: 'Ghost Frame', speed: 105, armor: 'Phase', power: 'Cloak', desc: 'Stealth-first design. Vanish from radar at the touch of a key.', premium: true },
    { id: 'nova', name: 'NOVA', model: 'Supernova S-1', speed: 100, armor: 'Volatile', power: 'Volatile Core', desc: 'Experimental engine that releases energy on structural failure.', premium: true },
    { id: 'siphon', name: 'SIPHON', model: 'Leech V1', speed: 85, armor: 'Energy', power: 'Energy Leech', desc: 'Drains energy from local anomalies to power its specialized systems.', premium: true },
    { id: 'titan', name: 'TITAN', model: 'Colossus', speed: 50, armor: 'Undeath', power: 'Hardened Hull', desc: 'A literal flying mountain. Slow, but effectively indestructible.', premium: true },
    { id: 'pulse', name: 'PULSE', model: 'Radar-Class', speed: 130, armor: 'Sensors', power: 'Pulse Ping', desc: 'Tactical specialist with long-range environmental mapping.', premium: true },
    { id: 'apex', name: 'APEX', model: 'Overclocker', speed: 100, armor: 'Cyber', power: 'Overclock', desc: 'Pushing boundaries of digital integration for peak performance.', premium: true },
    { id: 'valkyrie', name: 'VALKYRIE', model: 'Strike Fighter', speed: 135, armor: 'Aero', power: 'Ion Trail', desc: 'Swept-wing fighter with twin trailing ion engines. Extremely fast.', premium: true },
    { id: 'leviathan', name: 'LEVIATHAN', model: 'Dreadnought', speed: 45, armor: 'Titanium+', power: 'Broadside', desc: 'A massive, blocky heavy cruiser with glowing side-thrusters.', premium: true },
    { id: 'wraith', name: 'WRAITH', model: 'Stealth Bomber', speed: 110, armor: 'Radar-Absorbent', power: 'Invisibility', desc: 'Pitch-black angular stealth craft with glowing red micro-thrusters.', premium: true },
    { id: 'pulsar', name: 'PULSAR', model: 'Energy Frigate', speed: 100, armor: 'Plasma', power: 'EMP Blast', desc: 'A central glowing energy ring flanked by stabilizing nacelles.', premium: true },
    { id: 'nomad', name: 'NOMAD', model: 'Deep Explorer', speed: 90, armor: 'Medium', power: 'Sensor Sweep', desc: 'Modular-looking vessel with distinct command bridge and rotating dishes.', premium: true },
    { id: 'eclipse', name: 'ECLIPSE', model: 'Prototype', speed: 125, armor: 'Nano-Carbon', power: 'Dark Energy', desc: 'Highly curved saucer-like stealth ship with flowing neon light strips.', premium: true },
    { id: 'hyperion', name: 'HYPERION', model: 'Assault Carrier', speed: 75, armor: 'Heavy', power: 'Drone Swarm', desc: 'Wide-bodied aggressive carrier with visible launch bays.', premium: true },
    { id: 'archangel', name: 'ARCHANGEL', model: 'Apex Fighter', speed: 140, armor: 'Hard-Light', power: 'Holy Fire', desc: 'Pure white and gold vessel with sweeping angelic hard-light wings.', premium: true }
];