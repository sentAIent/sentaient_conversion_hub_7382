import math

def get_poly_pts():
    pts = []
    for orig_x in range(120, -120, -2):
        if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
        else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        cleanZ = 60.0 * envelope
        
        h = max(0.0, min(1.0, cleanZ / 60.0))
        crestMask = 1.0
        if orig_x < 0: crestMask = math.exp(-math.pow(orig_x * 0.03, 2.0))
        
        dx = math.pow(h, 3.0) * 160.0 * crestMask
        dz = math.pow(h, 5.0) * -110.0 * crestMask
        
        pts.append((orig_x + dx, cleanZ + dz))
    return pts

def get_bezier_pts():
    pts = []
    for orig_x in range(120, -120, -2):
        if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
        else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        cleanZ = 60.0 * envelope
        
        if -60 <= orig_x <= 40:
            t = (40.0 - orig_x) / 100.0
            u = 1.0 - t
            dx = (3.0 * u * u * t * 150.0) + (3.0 * u * t * t * -50.0)
            dz = (3.0 * u * u * t * 40.0) + (3.0 * u * t * t * -120.0)
            pts.append((orig_x + dx, cleanZ + dz))
        else:
            pts.append((orig_x, cleanZ))
    return pts

def plot(pts, title):
    print(f"--- {title} ---")
    grid = [[' ' for _ in range(120)] for _ in range(40)]
    for x, z in pts:
        col = int((x + 120) / 240 * 119)
        row = int(39 - (z + 60) / 180 * 39)
        if 0 <= col < 120 and 0 <= row < 40:
            grid[row][col] = '*'
    for row in grid:
        print(''.join(row))

plot(get_poly_pts(), "POLYNOMIAL SHEAR (Original, users says it doesn't curl)")
plot(get_bezier_pts(), "BEZIER (Current, user says not even close)")

