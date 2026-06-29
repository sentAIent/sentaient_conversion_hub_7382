import math

pts = []
for orig_x in range(120, -120, -2):
    
    if orig_x < 0:
        envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else:
        envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        
    baseZ = 60.0 * envelope
    
    # We want to bend the wave.
    # The "bend zone" starts at x = 60 and goes backwards.
    # It bends the wave up and over itself.
    bend_start_x = 60.0
    
    if orig_x <= bend_start_x:
        # Distance into the bend zone
        dist = bend_start_x - orig_x
        
        # Bend radius
        R = 30.0
        
        # Angle of bend
        theta = dist / R
        
        # To avoid curling forever, limit theta to 1.5 PI
        theta = min(theta, 3.14159 * 1.5)
        
        # Pivot point for the bend (the cylinder axis)
        cx = bend_start_x
        cz = R
        
        # We roll the sheet UP and OVER.
        # At theta=0, the point is at (cx, 0).
        # We want the surface to have radius (R + baseZ).
        # Actually, baseZ is the height. If we bend the flat ground (Z=0), it should be at radius R.
        # But wait, we want to roll the flat ground UP, so the axis is ABOVE the ground.
        # If axis is at Z=R, then the ground is at Z=0 (radius R).
        # A point with height baseZ is closer to the axis? Or further?
        # A wave is a bump on the water. The bump goes UP. So it gets closer to the axis!
        # Radius for this vertex = R - baseZ
        
        r_vert = R - baseZ
        
        # Calculate rotated position
        # theta=0 means pointing straight down (-Z).
        # As theta increases, it rotates forward (+X), then up (+Z).
        # We want it to roll forward.
        nx = cx - r_vert * math.sin(theta)
        nz = cz - r_vert * math.cos(theta)
        
        new_x = nx
        new_z = nz
    else:
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

