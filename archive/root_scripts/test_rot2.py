import math

pts = []
for orig_x in range(60, -80, -2):
    if orig_x < 0:
        envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else:
        envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        
    cleanZ = 60.0 * envelope
    
    pivot_x = 40.0
    pivot_z = 30.0
    
    h = max(0.0, min(1.0, (cleanZ - 10.0) / 50.0))
    crestMask = max(0.0, min(1.0, (orig_x + 60.0) / 120.0))
    
    angle = math.pow(h, 1.5) * 3.45 * crestMask
    
    if angle > 0:
        rx = orig_x - pivot_x
        rz = cleanZ - pivot_z
        
        cosA = math.cos(-angle)
        sinA = math.sin(-angle)
        
        nx = rx * cosA - rz * sinA
        nz = rx * sinA + rz * cosA
        
        new_x = nx + pivot_x
        new_z = nz + pivot_z
    else:
        new_x = orig_x
        new_z = cleanZ
        
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

