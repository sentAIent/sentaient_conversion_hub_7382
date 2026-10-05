import re

with open('src/pages/demo3d/TimelineManager.jsx', 'r') as f:
    content = f.read()

timeline_replacement = """const SCROLL_TIMELINE = [
  // Intro -> MindWave (Center at Z=-1250)
  { p: 0.00, x: 0, y: 0, z: 10, rx: 0, ry: 0 },
  { p: 0.04, x: 0, y: 0, z: -250, rx: 0, ry: 0 },    
  { p: 0.06, x: 0, y: 0, z: -1250, rx: 0, ry: 0 }, // Arrive MindWave (Center)
  { p: 0.10, x: 0, y: 0, z: -1250, rx: 0, ry: 0 }, // PAUSE MindWave (4% gap)
  
  // Plunge straight down into Ice Wormhole (Drop 1)
  { p: 0.12, x: 0, y: 0, z: -1250, rx: -Math.PI / 2, ry: 0 }, // Start dive
  { p: 0.18, x: 0, y: -3000, z: -1250, rx: -Math.PI / 2, ry: 0 }, // Diving
  
  // Pull out of the dive into Icebreaker
  { p: 0.20, x: 0, y: -3980, z: -1750, rx: 0, ry: 0 }, // Level out
  { p: 0.22, x: 0, y: -3980, z: -1900, rx: 0, ry: 0 }, // Stop 1 (Blue People) - farther back
  { p: 0.24, x: 0, y: -3980, z: -1900, rx: 0, ry: 0 }, // PAUSE Stop 1
  { p: 0.26, x: 0, y: -3980, z: -2250, rx: 0, ry: 0 }, // Move to Stop 2 (Fire/Dance)
  { p: 0.27, x: 0, y: -3980, z: -2250, rx: 0, ry: 0 }, // PAUSE Stop 2 (Lock triggers here)
  { p: 0.28, x: 0, y: -3980, z: -2800, rx: 0, ry: 0 }, // Move to Stop 3 (Text Title)
  { p: 0.29, x: 0, y: -3980, z: -2800, rx: 0, ry: 0 }, // PAUSE Stop 3
  { p: 0.30, x: 0, y: -3980, z: -3250, rx: 0, ry: 0 }, // Start entering Wormhole
  
  // Soundwaves Wormhole 
  { p: 0.32, x: 0, y: -3980, z: -4000, rx: 0, ry: 0 },
  { p: 0.36, x: 0, y: -3980, z: -6250, rx: 0, ry: 0 },
  
  // Interstellar (Center at Z=-7550)
  { p: 0.38, x: 0, y: -3980, z: -7150, rx: 0, ry: 0 }, // Arrive Interstellar
  { p: 0.42, x: 0, y: -3980, z: -7150, rx: 0, ry: 0 }, // PAUSE Interstellar
  { p: 0.44, x: 0, y: -3980, z: -8250, rx: 0, ry: 0 }, // Exit Interstellar
  
  // Legal Eagle (Center at Z=-10250)
  { p: 0.46, x: 0, y: -3980, z: -8750, rx: 0, ry: 0 }, 
  { p: 0.48, x: 0, y: -3980, z: -10250, rx: 0, ry: 0 }, // Arrive Legal Eagle
  { p: 0.52, x: 0, y: -3980, z: -10250, rx: 0, ry: 0 }, // PAUSE Legal Eagle
  { p: 0.55, x: 0, y: -3980, z: -11250, rx: 0, ry: 0 }, // Exit Legal Eagle
  
  // Bridge directly to CloveH2O (Center at Z=-16550)
  { p: 0.56, x: 0, y: -4000, z: -11550, rx: 0, ry: 0 }, 
  { p: 0.61, x: 0, y: -4000, z: -14000, rx: 0, ry: 0 }, 
  { p: 0.65, x: 0, y: -4000, z: -16150, rx: 0, ry: 0 }, // Arrive CloveH2O
  { p: 0.72, x: 0, y: -4000, z: -16150, rx: 0, ry: 0 }, // PAUSE CloveH2O
  
  // FantasyQuant Waterslide (Drop straight down from CloveH2O Z=-16550)
  { p: 0.74, x: 0, y: -4500, z: -16550, rx: -1.5, ry: 0 }, // Pitch down and drop
  { p: 0.79, x: 0, y: -12200, z: -16550, rx: -1.5, ry: 0 }, // Reach bottom
  { p: 0.81, x: 0, y: -11750, z: -17175, rx: -0.1, ry: 0 }, // Shoot out into stands
  { p: 0.84, x: 0, y: -11750, z: -17175, rx: -0.1, ry: 0 }, // PAUSE FantasyQuant
  { p: 0.86, x: 0, y: -11750, z: -17800, rx: 0, ry: 0 }, // Exit FantasyQuant

  // Candlesticks Wormhole (Long) -> now leads to Contango
  { p: 0.88, x: 0, y: -11750, z: -18550, rx: 0, ry: 0 }, 
  { p: 0.90, x: 0, y: -11750, z: -22550, rx: 0, ry: 0 }, 

  // Contango (Center at Z=-24200)
  { p: 0.91, x: 0, y: -11750, z: -24200, rx: 0, ry: 0 }, // Arrive Contango
  { p: 0.94, x: 0, y: -11750, z: -24200, rx: 0, ry: 0 }, // PAUSE Contango
  { p: 0.95, x: 0, y: -11750, z: -25200, rx: 0, ry: 0 }, // Exit Contango

  // Sentaient Finale
  { p: 0.97, x: 0, y: -11750, z: -28050, rx: 0, ry: 0 }, 
  { p: 0.98, x: 0, y: -11750, z: -29050, rx: 0, ry: 0 }, // Arrive Sentaient
  { p: 1.00, x: 0, y: -11750, z: -29050, rx: 0, ry: 0 }, // PAUSE Sentaient
];"""

content = re.sub(r"const SCROLL_TIMELINE = \[.*?\];", timeline_replacement, content, flags=re.DOTALL)

with open('src/pages/demo3d/TimelineManager.jsx', 'w') as f:
    f.write(content)
