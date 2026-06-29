import math

pts = []
for orig_x in range(120, -120, -2):
    
    if orig_x < 0:
        envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else:
        envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        
    baseZ = 60.0 * envelope
    
    # We want to curl the front face (0 to 60)
    if 0 <= orig_x <= 60:
        # t goes from 0 (at base, 60) to 1 (at lip, 0)
        t = 1.0 - (orig_x / 60.0)
        
        # We need a smooth transition. Use smoothstep for t.
        # This makes the base blend seamlessly.
        t_smooth = t * t * (3.0 - 2.0 * t)
        
        # Angle goes from 0 to 1.3 PI (curls past vertical, tucks in)
        angle = t_smooth * 3.14159 * 1.3
        
        # Radius of the barrel
        radius = 60.0
        
        # dx pushes forward, then pulls back
        dx = math.sin(angle) * radius
        
        # dz drops down
        dz = (math.cos(angle) - 1.0) * radius * 0.9
        
        new_x = orig_x + dx
        new_z = baseZ + dz
    elif orig_x < 0:
        # Back of the wave stays flat, no displacement
        new_x = orig_x
        new_z = baseZ
    else:
        # Front of the wave (flat ocean)
        new_x = orig_x
        new_z = baseZ
        
    pts.append((new_x, new_z))

# Plot
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 100 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'

for row in grid:
    print(''.join(row))

