import math

pts = []
for orig_x in range(120, -120, -2):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    cleanZ = 60.0 * envelope
    
    h = max(0.0, min(1.0, cleanZ / 60.0))
    crestMask = 1.0
    if orig_x < 0: crestMask = math.exp(-math.pow(orig_x * 0.03, 2.0))
    
    # Forward surge peaks around h=0.7, tuck applies at h=1.0
    # Let's say h goes 0 -> 1.
    # forward: h^2 * 180 -> 180
    # tuck: h^6 * -120 -> -120
    # Total dx at h=1 is 180 - 120 = 60.
    # Total dx at h=0.8 is (0.64 * 180) - (0.26 * 120) = 115 - 31 = 84.
    # So dx goes from 0 -> 84 (at h=0.8) -> 60 (at h=1.0).
    # Since dx at peak (60) is LESS than dx at mid-face (84), the lip tucks backwards!
    
    forwardSurge = math.pow(h, 2.0) * 160.0
    tuckBack = math.pow(h, 5.0) * -100.0
    
    dx = (forwardSurge + tuckBack) * crestMask
    
    # dz must drop the lip so it doesn't intersect the face
    dz = math.pow(h, 4.0) * -120.0 * crestMask
    
    pts.append((orig_x + dx, cleanZ + dz))

# Plot
print("--- POLYNOMIAL TUCK ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 60) / 180 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

