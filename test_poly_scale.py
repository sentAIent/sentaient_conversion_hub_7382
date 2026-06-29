import math

pts = []
pts_small = []

def get_wave(activeAmp):
    wave_pts = []
    maxHeight = 60.0 * activeAmp
    for orig_x in range(120, -120, -1):
        if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
        else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        cleanZ = maxHeight * envelope
        
        h = max(0.0, min(1.0, cleanZ / maxHeight))
        crestMask = 1.0
        if orig_x < 0: crestMask = math.exp(-math.pow(orig_x * 0.03, 2.0))
        
        forwardSurge = math.pow(h, 2.0) * (maxHeight * 2.0)
        tuckBack = math.pow(h, 5.0) * (maxHeight * -1.333)
        
        dx = (forwardSurge + tuckBack) * crestMask
        dz = math.pow(h, 4.0) * -maxHeight * crestMask
        
        wave_pts.append((orig_x + dx, cleanZ + dz))
    return wave_pts

def plot(pts, title):
    print(f"--- {title} ---")
    grid = [[' ' for _ in range(120)] for _ in range(40)]
    for x, z in pts:
        col = int((x + 120) / 240 * 119)
        # Z goes from -20 to 100
        row = int(39 - (z + 20) / 120 * 39)
        if 0 <= col < 120 and 0 <= row < 40:
            grid[row][col] = '*'
    for row in grid:
        print(''.join(row))

plot(get_wave(1.0), "MAX AMP (1.0)")
plot(get_wave(0.5), "HALF AMP (0.5)")

