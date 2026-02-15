/**
 * AI Intent Service
 * Maps natural language goals to binaural frequencies and soundscapes.
 */

const MAPPING = {
    focus: {
        keywords: ['focus', 'study', 'work', 'concentrate', 'productivity', 'coding', 'read', 'learn'],
        preset: 'beta',
        soundscapes: ['rain', 'pink'],
        visual: 'matrix',
        insight: 'Focus mode engaged. Beta waves (12-30Hz) synchronized with pink noise and matrix visuals for maximum cognitive throughput.'
    },
    deep_focus: {
        keywords: ['intense', 'deep work', 'deadline', 'flow state', 'absorption'],
        preset: 'gamma',
        soundscapes: ['wind', 'white'],
        visual: 'flow',
        insight: 'Peak awareness activated. Gamma waves (30-100Hz) and flow patterns for high-level information synthesis.'
    },
    sleep: {
        keywords: ['sleep', 'nap', 'insomnia', 'night', 'rest', 'bed', 'tired'],
        preset: 'delta',
        soundscapes: ['brown', 'wind'],
        visual: 'zen',
        insight: 'Sleep cycle initiation. Delta waves (0.5-4Hz) paired with brown noise and zen visuals for deep restorative rest.'
    },
    dream: {
        keywords: ['dream', 'subconscious', 'lucid', 'sleep meditation'],
        preset: 'theta',
        soundscapes: ['ocean'],
        visual: 'sphere',
        insight: 'Dream state activated. Theta waves (4-8Hz) and dimensional spheres for subconscious exploration.'
    },
    relax: {
        keywords: ['relax', 'calm', 'anxiety', 'stress', 'chill', 'peace', 'meditation', 'unwind'],
        preset: 'alpha',
        soundscapes: ['ocean', 'rain'],
        visual: 'ocean',
        insight: 'Restorative calm. Alpha waves (8-12Hz) to bridge the mind between alertness and deep rest.'
    },
    healing: {
        keywords: ['heal', 'pain', 'miracle', 'dna', 'repair', 'physical', 'body'],
        preset: 'heal-528',
        soundscapes: ['strings'],
        visual: 'lava',
        insight: 'Solfeggio 528Hz synchronized with organic lava flows for DNA repair and cellular harmony.'
    },
    creativity: {
        keywords: ['creative', 'brainstorm', 'idea', 'art', 'write', 'draw', 'design', 'inspiration'],
        preset: 'theta',
        soundscapes: ['ocean', 'pink'],
        visual: 'flow',
        insight: 'Flow state unlocked. Theta waves (5Hz) stimulate the bridge between conscious and subconscious creativity.'
    },
    peak_performance: {
        keywords: ['peak', 'performance', 'athlete', 'workout', 'energy', 'vitality', 'strength', 'speed'],
        preset: 'gamma',
        soundscapes: ['wind', 'white'],
        visual: 'matrix',
        insight: 'Hyper-aware state. 40Hz Gamma synchronization for maximum physical and mental coordination.'
    },
    meditation: {
        keywords: ['meditate', 'zen', 'mindful', 'presence', 'here', 'now', 'void'],
        preset: 'alpha',
        soundscapes: ['strings', 'ocean'],
        visual: 'zen',
        insight: 'Deep presence. Alpha waves (10Hz) for relaxed alertness and mindful center.'
    }
};

/**
 * Extracts duration in minutes from text using regex.
 * Supports "10 mins", "20 minutes", "1 hour", etc.
 */
function parseDuration(text) {
    const minMatch = text.match(/(\d+)\s*(min|minute|m)/i);
    const hourMatch = text.match(/(\d+)\s*(hour|hr|h)/i);

    if (hourMatch) return parseInt(hourMatch[1]) * 60;
    if (minMatch) return parseInt(minMatch[1]);

    return null;
}

/**
 * Parses user input and returns the most relevant frequency/soundscape combo.
 * @param {string} text - The user's goal text.
 * @returns {object} - { preset, soundscapes, insight, duration }
 */
export function calculateFrequencyFromGoal(text) {
    if (!text) return null;

    const goal = text.toLowerCase();
    const duration = parseDuration(goal);

    // Check for direct keyword matches
    for (const [key, data] of Object.entries(MAPPING)) {
        if (data.keywords.some(kw => goal.includes(kw))) {
            return {
                preset: data.preset,
                soundscapes: data.soundscapes,
                insight: data.insight,
                duration: duration
            };
        }
    }

    // Default to Alpha if no match found
    return {
        preset: 'alpha',
        soundscapes: ['pink'],
        insight: "I've optimized a balanced Alpha state for your request. Relaxed awareness is the foundation of flow.",
        duration: duration
    };
}

/**
 * Specialized parser for multi-stage goals.
 * Example: "Focus for 10 mins then sleep."
 */
export function parseComplexGoal(text) {
    if (!text) return [];

    const goal = text.toLowerCase();
    const stages = goal.split(/\bthen\b|\band then\b|\bfollowed by\b/);

    if (stages.length <= 1) {
        const single = calculateFrequencyFromGoal(goal);
        return single ? [single] : [];
    }

    return stages.map(s => calculateFrequencyFromGoal(s.trim())).filter(Boolean);
}
