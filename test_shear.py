import math

pts = []
for orig_x in range(60, -60, -2):
    if orig_x < 0:
        envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else:
        envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        
    cleanZ = 60.0 * envelope
    
    # Normalized height
    h = max(0.0, min(1.0, cleanZ / 60.0))
    
    # We only want to curl the front face of the wave!
    crestMask = max(0.0, min(1.0, (orig_x + 30.0) / 60.0))
    if orig_x > 30.0:
        crestMask = 1.0 - max(0.0, min(1.0, (orig_x - 30.0) / 30.0))
    
    # Non-linear shear forward
    dx = math.pow(h, 3.0) * 150.0 * crestMask
    
    # Non-linear drop downward
    # We want it to drop ONLY at the very tip (h > 0.8)
    dz = math.pow(h, 5.0) * -80.0 * crestMask
    
    new_x = orig_x + dx
    new_z = cleanZ + dz
    pts.append((new_x, new_z))

# Plot
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 60) / 200 * 119)
    row = int(39 - (z + 20) / 100 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'

for row in grid:
    print(''.join(row))

