import re

with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'r') as f:
    content = f.read()

# 1. Update point distribution to form discrete rows (tiers)
new_dist = """
      // Cylindrical/Colosseum distribution in distinct rows
      const theta = Math.random() * Math.PI * 2;
      const tier = Math.floor(Math.random() * 25); // 25 rows of seats
      const radius = 700 + tier * 60; 
      const y = (tier * 40) - 100;
"""
content = re.sub(r'      // Cylindrical/Colosseum distribution.*?const y =.*? - 100;', new_dist.strip('\n'), content, flags=re.DOTALL)

# 2. Update shader point size and brightness
new_vert = """
            vAlpha = 0.2 + wave * 0.2 + flash * 0.6;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (8.0 * aRandom + 4.0) * (1000.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
"""
content = re.sub(r'            vAlpha = 0\.4 \+ wave \* 0\.3 \+ flash \* 0\.8;.*?gl_Position = projectionMatrix \* mvPosition;', new_vert.strip('\n'), content, flags=re.DOTALL)

# Let's also add physical ring meshes for the concrete stands so it looks grounded!
concrete_rings = """
  // Custom points geometry for a stadium bowl
"""
# Actually, I won't add physical rings yet because they have the stadium texture. If they can see the texture, it will be fine.
# Let's just fix the point sizes so they don't blow out the background.

with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'w') as f:
    f.write(content)

print("Stadium patched.")
