export const curatedScenes = [
  {
    id: 'zen-garden',
    title: 'Kyoto Zen Garden',
    location: 'Ryoan-ji, Kyoto, Japan',
    description: 'A peaceful spring morning in a traditional Japanese rock garden.',
    audioParams: { wind: 0.2, birds: 0.6, water: 0.3, traffic: 0.0, rain: 0.0 },
    visualFilters: { sepia: 0.0, blur: 0.0, brightness: 1.1, hue: 'spring' },
    visualMode: 'video',
    videoId: 'F0B6bU-h_0A' // Placeholder Kyoto walking
  },
  {
    id: 'swiss-alps',
    title: "Snowy Kyoto Sunrise",
    description: "Quiet morning walk through snow-covered shrines",
    location: "Kyoto, Japan",
    speed: "slow",
    visualMode: "video",
    videoId: "jI1K7F1R-x8", 
    audioParams: {
      wind: 0.1,
      rain: 0.0,
      traffic: 0.0,
      birds: 0.6
    }
  },
  {
    id: "manim-sacred-geometry",
    title: "Sacred Geometry Breathing",
    description: "Mathematically perfect infinite mandala (Powered by Manim Engine)",
    location: "Abstract Mathematics",
    speed: "slow",
    visualMode: "manim",
    videoId: null, // Will use the pristine fallback mp4 until dynamic compilation is active
    audioParams: {
      wind: 0.2,
      rain: 0.0,
      traffic: 0.0,
      birds: 0.0
    }
  },
  {
    id: 'rainy-nyc',
    title: 'New York City (Rainy Night)',
    location: 'Times Square, New York, NY',
    description: 'The glowing neon lights reflecting off the wet pavement.',
    speed: 'fast',
    audioParams: { wind: 0.3, birds: 0.0, water: 0.0, traffic: 0.7, rain: 0.9 },
    visualFilters: { sepia: 0.0, blur: 0.1, brightness: 0.8, hue: 'neon' },
    visualMode: 'video',
    videoId: 'lZ_2382q8cM'
  },
  {
    id: 'cyberpunk-city',
    title: 'Cyberpunk Data Grid',
    location: 'Cyber Node Alpha',
    description: 'Abstract neon grid in a simulated reality.',
    speed: 'fast',
    audioParams: { wind: 0.5, birds: 0.0, water: 0.0, traffic: 0.1, rain: 0.0 },
    visualFilters: { sepia: 0.0, blur: 0.0, brightness: 1.0, hue: 'neon' },
    visualMode: '3d'
  },
  {
    id: 'parisian-cafe',
    title: 'Parisian Drive',
    location: 'Montmartre, Paris, France',
    description: 'Simulate driving through Paris in a car with birds chirping and city buzz.',
    speed: 'fast',
    audioParams: { wind: 0.2, birds: 0.7, water: 0.0, traffic: 0.6, rain: 0.0 },
    visualFilters: { sepia: 0.2, blur: 0.0, brightness: 1.0, hue: 'warm' },
    visualMode: 'video',
    videoId: 'Q-PQ2AcieH8'
  }
];
