import math

def bezier_1d(t, p0, p1, p2, p3):
    u = 1.0 - t
    return (u*u*u * p0) + (3 * u*u * t * p1) + (3 * u * t*t * p2) + (t*t*t * p3)

pts = []
for orig_x in range(120, -120, -2):
    
    # Default base ocean
    if orig_x < 0:
        envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else:
        envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        
    baseZ = 60.0 * envelope
    
    # We want to replace the wave zone (-40 to 40) with a Bezier curve
    if -40 <= orig_x <= 40:
        # Map orig_x to t (0 to 1)
        # orig_x = 40 is the front base (t=0)
        # orig_x = -40 is the back base (t=1)
        t = (40.0 - orig_x) / 80.0
        
        # Bezier Control Points for X
        # P0: Start at base (40)
        # P1: Bulge forward (80)
        # P2: Throw lip forward (100)
        # P3: Tuck lip back (-20)
        p0x = 40.0
        p1x = 80.0
        p2x = 100.0
        p3x = -20.0
        
        # Bezier Control Points for Z
        # P0: Start at water level (0)
        # P1: Ramp up (40)
        # P2: Peak (80)
        # P3: Crash down (0)
        p0z = 0.0
        p1z = 40.0
        p2z = 80.0
        p3z = 0.0
        
        new_x = bezier_1d(t, p0x, p1x, p2x, p3x)
        new_z = bezier_1d(t, p0z, p1z, p2z, p3z)
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

