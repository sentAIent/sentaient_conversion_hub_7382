import re

with open('src/pages/demo3d/TimelineManager.jsx', 'r') as f:
    content = f.read()

# Fix Icebreaker camera
# Change Z from -1900 to -1750 (pull back by 150 units)
content = re.sub(r'\{ p: 0.22, x: 0, y: -3980, z: -1900, rx: 0, ry: 0 \}, // Stop 1 \(Blue People\) - farther back',
                 r'{ p: 0.22, x: 0, y: -3980, z: -1750, rx: 0, ry: 0 }, // Stop 1 (Blue People) - farther back', content)
content = re.sub(r'\{ p: 0.24, x: 0, y: -3980, z: -1900, rx: 0, ry: 0 \}, // PAUSE Icebreaker',
                 r'{ p: 0.24, x: 0, y: -3980, z: -1750, rx: 0, ry: 0 }, // PAUSE Icebreaker', content)

# Fix Legal Eagle framing
# Change Z from -10250 to -9950 (pull back by 300 units)
content = re.sub(r'\{ p: 0.48, x: 0, y: -3980, z: -10250, rx: 0, ry: 0 \}, // Arrive Legal Eagle',
                 r'{ p: 0.48, x: 0, y: -3980, z: -9950, rx: 0, ry: 0 }, // Arrive Legal Eagle', content)
content = re.sub(r'\{ p: 0.52, x: 0, y: -3980, z: -10250, rx: 0, ry: 0 \}, // PAUSE Legal Eagle',
                 r'{ p: 0.52, x: 0, y: -3980, z: -9950, rx: 0, ry: 0 }, // PAUSE Legal Eagle', content)

# Remove Orbital Command and Drone Swarm, but keep Autopilot inline? 
# Wait, the straight-line flow usually means removing the lateral branches. Let's see how I did it before.
# Let's just remove Orbital Command, Drone Swarm entirely, and place Autopilot inline.
# Actually, the user says "the autopilot world is completely new so you didnt restore that as you said"
# It means Autopilot WAS NOT restored. But now I have restored Autopilot to the `2507133e` version!
