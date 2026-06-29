import math

def get_z(x):
    return math.exp(-math.pow(x, 2.0) * 0.001) * 60.0

def smoothstep(edge0, edge1, x):
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)

pts = []
for orig_x in range(-60, 100, 3):
    z = get_z(orig_x)
    h = max(0.0, min(1.0, z / 60.0))
    
    crestMask = smoothstep(-30.0, 40.0, orig_x)
    
    # 3.77 is PI * 1.2, enough to curl past vertical!
    theta = math.pow(h, 1.5) * 3.77 * crestMask
    
    radius = 70.0
    
    dx = math.sin(theta) * radius
    dz = (math.cos(theta) - 1.0) * radius * 0.85
    
    new_x = orig_x + dx
    new_z = z + dz
    pts.append((new_x, new_z))

grid = [[' ' for _ in range(100)] for _ in range(40)]
for x, z in pts:
    col = int((x + 60) / 260 * 99)
    row = int(39 - (z + 40) / 120 * 39)
    if 0 <= col < 100 and 0 <= row < 40:
        grid[row][col] = '*'

for row in grid:
    print(''.join(row))

