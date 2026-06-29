import math

def get_z(x):
    return math.exp(-math.pow(x, 2.0) * 0.001) * 60.0

def smoothstep(edge0, edge1, x):
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)

pts = []
for orig_x in range(-60, 100, 5):
    z = get_z(orig_x)
    h = max(0.0, min(1.0, z / 60.0))
    
    # We need a full spiral. 
    # If we map height h to an angle, we can rotate the top.
    # But since it's parametric displacement, let's just make the top curl back.
    # To curl back, X must throw forward, then pull back!
    # dz pushes down. If dz drops below z=0, the lip crashes.
    # Let's adjust the X displacement so that at the very tip (h=1), it doesn't just go forward, it arcs.
    
    crestMask = smoothstep(-40.0, 20.0, orig_x)
    dropMask = smoothstep(-20.0, 50.0, orig_x)
    
    # Massive forward push
    dx = math.pow(h, 2.0) * 180.0 * crestMask
    
    # Massive drop
    dz = math.pow(h, 3.0) * -160.0 * dropMask
    
    # To make it 'curl fully', the tip needs to tuck backwards (-X) as it falls.
    # So if it drops a lot (h is very close to 1), we pull X back.
    # This forms the "O" shape of a plunging barrel.
    tuckBack = math.pow(h, 5.0) * -80.0 * crestMask
    
    new_x = orig_x + dx + tuckBack
    new_z = z + dz
    pts.append((new_x, new_z))

grid = [[' ' for _ in range(80)] for _ in range(30)]
for x, z in pts:
    col = int((x + 60) / 260 * 79)
    row = int(29 - (z + 40) / 120 * 29)
    if 0 <= col < 80 and 0 <= row < 30:
        grid[row][col] = '*'

for row in grid:
    print(''.join(row))

