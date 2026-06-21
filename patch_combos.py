import re

JS_FILE = 'binaural-assets/js/state.js'

with open(JS_FILE, 'r') as f:
    js_content = f.read()

# Replace the PRESET_COMBOS entirely to give them unique visuals and add cymatics
new_combos = """export const PRESET_COMBOS = [
    {
        id: 'lofi-rain',
        label: 'Lofi Rain',
        description: 'Chill beats + rain',
        icon: '🌧️',
        preset: 'alpha',
        soundscapes: ['rain'],
        visuals: ['rainforest', 'ocean', 'particles'],
        cymaticClass: 19,
        cymaticVariation: 4,
        atmosVolume: 0.6,
        color: '#6b7280'
    },
    {
        id: 'night-ambient',
        label: 'Night Ambience',
        description: 'Peaceful night sounds',
        icon: '🌙',
        preset: 'delta',
        soundscapes: ['wind'],
        visuals: ['galaxy', 'interstellar', 'particles'],
        cymaticClass: 3,
        cymaticVariation: 1,
        atmosVolume: 0.5,
        color: '#1e3a5f'
    },
    {
        id: 'epic-focus',
        label: 'Epic Focus',
        description: 'Triumphant concentration',
        icon: '⚔️',
        preset: 'beta',
        soundscapes: ['strings', 'brass'],
        visuals: ['dragon', 'matrix', 'lava'],
        cymaticClass: 1,
        cymaticVariation: 0,
        atmosVolume: 0.4,
        color: '#b45309'
    },
    {
        id: 'ocean-drift',
        label: 'Ocean Drift',
        description: 'Deep wave meditation',
        icon: '🌊',
        preset: 'theta',
        soundscapes: ['ocean'],
        visuals: ['ocean', 'flow', 'particles'],
        cymaticClass: 5,
        cymaticVariation: 4,
        atmosVolume: 0.7,
        color: '#0891b2'
    },
    {
        id: 'storm-focus',
        label: 'Storm Focus',
        description: 'Intense productivity',
        icon: '⛈️',
        preset: 'gamma',
        soundscapes: ['rain', 'wind'],
        visuals: ['matrix', 'cyber', 'interstellar'],
        cymaticClass: 17,
        cymaticVariation: 0,
        atmosVolume: 0.5,
        color: '#4b5563'
    },
    {
        id: 'temple-zen',
        label: 'Temple Zen',
        description: 'Spiritual tranquility',
        icon: '🔔',
        preset: 'mu',
        soundscapes: ['bells'],
        visuals: ['zengarden', 'mandala', 'particles'],
        cymaticClass: 22,
        cymaticVariation: 10,
        atmosVolume: 0.4,
        color: '#a855f7'
    },
    {
        id: 'cozy-fireplace',
        label: 'Cozy Fireplace',
        description: 'Warm crackling comfort',
        icon: '🔥',
        preset: 'alpha',
        soundscapes: ['fireplace'],
        visuals: ['fireplace', 'lava', 'sphere'],
        cymaticClass: 14,
        cymaticVariation: 9,
        atmosVolume: 0.6,
        color: '#f97316'
    },
    {
        id: 'forest-retreat',
        label: 'Forest Retreat',
        description: 'Deep nature immersion',
        icon: '🌲',
        preset: 'theta',
        soundscapes: ['winds', 'brown', 'forest_birds'],
        visuals: ['rainforest', 'particles', 'flow'],
        cymaticClass: 20,
        cymaticVariation: 1,
        atmosVolume: 0.5,
        color: '#10b981'
    },
    {
        id: 'mountain-zen',
        label: 'Mountain Zen',
        description: 'Alpine tranquility',
        icon: '🏔️',
        preset: 'alpha',
        soundscapes: ['mountain_wind', 'forest_birds'],
        visuals: ['galaxy', 'sphere', 'interstellar'],
        cymaticClass: 15,
        cymaticVariation: 4,
        atmosVolume: 0.5,
        color: '#94a3b8'
    },
    {
        id: 'river-flow',
        label: 'River Flow',
        description: 'Serene water journey',
        icon: '🛶',
        preset: 'theta',
        soundscapes: ['river', 'forest_birds'],
        visuals: ['ocean', 'particles', 'interstellar'],
        cymaticClass: 8,
        cymaticVariation: 7,
        atmosVolume: 0.7,
        color: '#38bdf8'
    },
    {
        id: 'cosmic-journey',
        label: 'Cosmic Journey',
        description: 'Creative exploration',
        icon: '🌌',
        preset: 'gamma',
        soundscapes: ['strings', 'white'],
        visuals: ['galaxy', 'tesseract', 'matrix'],
        cymaticClass: 4,
        cymaticVariation: 5,
        atmosVolume: 0.45,
        color: '#8b5cf6'
    },
    {
        id: 'morning-clarity',
        label: 'Morning Clarity',
        description: 'Gentle awakening',
        icon: '☀️',
        preset: 'beta',
        soundscapes: ['pink', 'wood'],
        visuals: ['sphere', 'flow', 'particles'],
        cymaticClass: 10,
        cymaticVariation: 2,
        atmosVolume: 0.5,
        color: '#fbbf24'
    }
];"""

js_content = re.sub(r'export const PRESET_COMBOS = \[\s*\{[\s\S]*?\}\s*\];', new_combos, js_content)

with open(JS_FILE, 'w') as f:
    f.write(js_content)
print("Updated PRESET_COMBOS in state.js!")
