import re

JS_FILE = 'binaural-assets/js/engine.js'

with open(JS_FILE, 'r') as f:
    content = f.read()

replacement = """export const SWEEP_PRESETS = {
    wakeUp: {
        name: 'Wake Up',
        description: 'Gentle transition from sleep to alertness',
        startFreq: 4,    // Theta
        endFreq: 20,     // Beta
        duration: 300,   // 5 minutes
        icon: '🌅',
        visuals: ['sphere', 'flow', 'particles'],
        cymaticClass: 10,
        cymaticVariation: 2,
        color: '#fbbf24'
    },
    windDown: {
        name: 'Wind Down',
        description: 'Transition from active to relaxed state',
        startFreq: 20,   // Beta
        endFreq: 8,      // Alpha
        duration: 600,   // 10 minutes
        icon: '🌙',
        visuals: ['galaxy', 'ocean', 'zengarden'],
        cymaticClass: 3,
        cymaticVariation: 1,
        color: '#1e3a5f'
    },
    deepSleep: {
        name: 'Deep Sleep Journey',
        description: 'Guide into deep restorative sleep',
        startFreq: 10,   // Alpha
        endFreq: 2,      // Delta
        duration: 1200,  // 20 minutes
        icon: '💤',
        visuals: ['ocean', 'particles', 'flow'],
        cymaticClass: 5,
        cymaticVariation: 4,
        color: '#0891b2'
    },
    focusBuilder: {
        name: 'Focus Builder',
        description: 'Build concentration gradually',
        startFreq: 8,    // Alpha
        endFreq: 18,     // Beta
        duration: 300,   // 5 minutes
        icon: '🎯',
        visuals: ['dragon', 'matrix', 'lava'],
        cymaticClass: 1,
        cymaticVariation: 0,
        color: '#b45309'
    },
    meditation: {
        name: 'Meditation Descent',
        description: 'Journey to the depths of consciousness',
        startFreq: 12,   // Beta/Alpha
        endFreq: 4,      // Theta
        duration: 900,   // 15 minutes
        icon: '🧘',
        visuals: ['zengarden', 'mandala', 'particles'],
        cymaticClass: 22,
        cymaticVariation: 10,
        color: '#a855f7'
    }
};"""

content = re.sub(r'export const SWEEP_PRESETS = \{[\s\S]*?\n\};', replacement, content)

with open(JS_FILE, 'w') as f:
    f.write(content)
print("Updated SWEEP_PRESETS in engine.js!")
