import math

def bezier_1d(t, p0, p1, p2, p3):
    u = 1.0 - t
    return (u*u*u * p0) + (3 * u*u * t * p1) + (3 * u * t*t * p2) + (t*t*t * p3)

pts = []
for orig_x in range(120, -120, -2):
    
    # Base bump
    if orig_x < 0:
        envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else:
        envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        
    baseZ = 60.0 * envelope
    
    # Bezier Displacement Zone: -60 to 40
    # The wave travels +X. 
    # front is 40. back is -60.
    if -60 <= orig_x <= 40:
        t = (40.0 - orig_x) / 100.0
        
        # P0 and P3 are 0 to guarantee seamless blending
        
        # X displacement: push forward, then tuck back
        dx = bezier_1d(t, 0.0, 150.0, -50.0, 0.0)
        
        # Z displacement: lift up, then crash down
        dz = bezier_1d(t, 0.0, 40.0, -120.0, 0.0)
        
        # Apply
        new_x = orig_x + dx
        new_z = baseZ + dz
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

