export const JOURNEYS = [
    {
        id: 'deep_sleep_cyberpunk',
        title: 'Cyberpunk Rainstorm (Deep Sleep)',
        description: 'A guided transition from a busy mind (Theta) down to restorative deep sleep (Delta).',
        category: 'sleep',
        duration: 1200, // 20 minutes
        timeline: [
            { time: 0, action: 'set_frequency', baseFreq: 136.1, beatFreq: 7.0 },
            { time: 0, action: 'set_visual', visualMode: 'waves' },
            { time: 2, action: 'speak', text: "Welcome. Let's leave the noise of the city behind. Take a deep breath in... and let it out." },
            { time: 15, action: 'speak', text: "The rain is washing against the glass. Your mind is beginning to slow down." },
            { time: 30, action: 'set_frequency', baseFreq: 136.1, beatFreq: 6.0 }, // Slower theta
            { time: 60, action: 'speak', text: "Feel the tension melting from your shoulders. We are drifting deeper." },
            { time: 120, action: 'set_frequency', baseFreq: 136.1, beatFreq: 4.0 }, // Entering Delta
            { time: 300, action: 'speak', text: "You are safe. You are resting. Let the frequencies guide you down." },
            { time: 600, action: 'set_frequency', baseFreq: 136.1, beatFreq: 2.5 }, // Deep Delta
            { time: 900, action: 'speak', text: "Nothing left to do but sleep." },
            { time: 1100, action: 'set_frequency', baseFreq: 136.1, beatFreq: 1.5 }, // Bottom of Delta
        ]
    },
    {
        id: 'hyper_focus_sprint',
        title: 'Hyper-Focus Sprint',
        description: 'A 25-minute Pomodoro session designed to lock you into a flow state.',
        category: 'focus',
        duration: 1500, // 25 minutes
        timeline: [
            { time: 0, action: 'set_frequency', baseFreq: 200, beatFreq: 18.0 }, // Low Beta
            { time: 0, action: 'set_visual', visualMode: 'cyber' },
            { time: 2, action: 'speak', text: "Let's lock in. 25 minutes of deep work starts now. Clear your distractions." },
            { time: 60, action: 'set_frequency', baseFreq: 200, beatFreq: 22.0 }, // Mid Beta
            { time: 300, action: 'speak', text: "You are doing great. Stay focused on the task at hand." },
            { time: 600, action: 'set_frequency', baseFreq: 200, beatFreq: 40.0 }, // Gamma
            { time: 1200, action: 'speak', text: "Five minutes left. Push through to the finish line." },
            { time: 1500, action: 'speak', text: "Time is up. Great work. Take a short break." },
            { time: 1505, action: 'set_frequency', baseFreq: 200, beatFreq: 10.0 } // Relax back to Alpha
        ]
    },
    {
        id: 'restorative_alpha',
        title: 'Restorative Break',
        description: 'A quick 10-minute reset to clear brain fog and prevent burnout.',
        category: 'relax',
        duration: 600, // 10 minutes
        timeline: [
            { time: 0, action: 'set_frequency', baseFreq: 174, beatFreq: 10.0 }, // Alpha
            { time: 0, action: 'set_visual', visualMode: 'snowflake' },
            { time: 2, action: 'speak', text: "It's time to recharge. Unclench your jaw, and let your eyes rest." },
            { time: 60, action: 'speak', text: "Breathe in deeply... and release." },
            { time: 300, action: 'speak', text: "Halfway there. Your energy is restoring." },
            { time: 580, action: 'speak', text: "We are coming back now. Slowly open your eyes." },
            { time: 600, action: 'set_frequency', baseFreq: 174, beatFreq: 14.0 } // Low Beta
        ]
    }
];

export const INTENT_GREETINGS = {
    focus: [
        "Welcome back. Let's get locked in.",
        "Ready for some deep work? I've set the frequencies for high focus."
    ],
    sleep: [
        "Good evening. Let's wind down and get you to sleep.",
        "It's time to rest. I'm preparing a deep delta wave for you."
    ],
    relax: [
        "Welcome. Let's wash away the stress of the day.",
        "Take a deep breath. We're going to relax now."
    ],
    meditate: [
        "Welcome to your meditation space. Let's begin.",
        "Find a comfortable position. It's time to turn inward."
    ],
    default: [
        "Welcome back to MindWave.",
        "Hello. I'm ready when you are."
    ]
};
