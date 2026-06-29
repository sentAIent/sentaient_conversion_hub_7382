import math

pts = []
for orig_x in range(120, -120, -1):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    
    baseHeight = 60.0
    cleanZ = baseHeight * envelope
    
    # POLAR CYLINDER
    R = baseHeight * 0.45
    Xc = 0.0
    Zc = R
    
    angle = orig_x / R
    z_cyl = Zc + R * math.cos(angle)
    
    # Surge forward at the top
    surge = math.pow(max(0, z_cyl) / (2*R), 2.0) * (baseHeight * 1.8)
    
    x_cyl = Xc + R * math.sin(angle) + surge
    
    # We only apply polar mapping strictly to the crest.
    # If orig_x is far from 0, it behaves like normal.
    mask = math.exp(-math.pow(orig_x * 0.03, 2.0))
    tubeStrength = 1.0
    
    dx = (x_cyl - orig_x) * mask * tubeStrength
    dz = (z_cyl - cleanZ) * mask * tubeStrength
    
    pts.append((orig_x + dx, cleanZ + dz))

# Plot
print("--- SHEARED POLAR MAPPING ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

