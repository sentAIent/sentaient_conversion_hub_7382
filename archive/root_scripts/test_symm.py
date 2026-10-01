import math

pts = []
for orig_x in range(120, -120, -1):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    
    baseHeight = 60.0
    cleanZ = baseHeight * envelope
    
    # SYMMETRIC H FOR HORIZONTAL DISPLACEMENT ONLY
    symmH = math.exp(-math.pow(orig_x * 0.02, 2.0))
    
    # Surge and Tuck based purely on symmH
    forwardSurge = math.pow(symmH, 2.0) * (baseHeight * 1.5)
    tuckBack = math.pow(symmH, 5.0) * (baseHeight * -1.5)
    
    dx = forwardSurge + tuckBack
    
    # Vertical dip based on symmH as well
    dz = math.pow(symmH, 4.0) * -baseHeight
    
    # Wait, if dz pulls cleanZ down, it might go below 0.
    final_z = max(0.0, cleanZ + dz)
    final_x = orig_x + dx
    
    pts.append((final_x, final_z))

# Plot
print("--- SYMMETRIC DISPLACEMENT ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

