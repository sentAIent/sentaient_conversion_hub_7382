import math

pts = []
for orig_x in range(120, -120, -1):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    cleanZ = 60.0 * envelope
    
    h = max(0.0, min(1.0, cleanZ / 60.0))
    crestMask = 1.0
    if orig_x < 0: crestMask = math.exp(-math.pow(orig_x * 0.03, 2.0))
    
    forwardSurge = math.pow(h, 2.0) * 120.0
    tuckBack = math.pow(h, 5.0) * -80.0
    
    dx = (forwardSurge + tuckBack) * crestMask
    
    # dz must drop the lip exactly to the water line
    # The max cleanZ is 60. So max drop is -60.
    dz = math.pow(h, 4.0) * -60.0 * crestMask
    
    pts.append((orig_x + dx, cleanZ + dz))

# Plot
print("--- POLYNOMIAL TUCK CORRECTED ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    # Z goes from -20 to 100
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

