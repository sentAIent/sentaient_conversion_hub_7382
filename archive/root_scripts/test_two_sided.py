import math

pts = []
for orig_x in range(120, -120, -1):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    
    baseHeight = 60.0 * 1.3
    cleanZ = baseHeight * envelope
    h = envelope
    
    # TWO-SIDED CREST MASK!
    crestMask = math.exp(-math.pow(orig_x * 0.03, 2.0))
    
    forwardSurge = math.pow(h, 2.0) * (baseHeight * 2.0)
    tuckBack = math.pow(h, 5.0) * (baseHeight * -1.333)
    
    dx = (forwardSurge + tuckBack) * crestMask
    dz = math.pow(h, 4.0) * -baseHeight * crestMask
    
    pts.append((orig_x + dx, cleanZ + dz))

# Plot
print("--- TWO SIDED CREST MASK ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

