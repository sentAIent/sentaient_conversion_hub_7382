import math

def smoothstep(edge0, edge1, x):
    if x <= edge0: return 0.0
    if x >= edge1: return 1.0
    t = (x - edge0) / (edge1 - edge0)
    return t * t * (3.0 - 2.0 * t)

pts = []
for x in range(20, -20, -2):
    if x < 0:
        envelope = math.exp(-math.pow(x * 0.012, 2.0))
    else:
        envelope = math.exp(-math.pow(x * 0.04, 2.0))
        
    cleanZ = 60.0 * envelope
    h = max(0.0, min(1.0, cleanZ / 60.0))
    crestMask = smoothstep(-40.0, 20.0, x)
    
    theta = math.pow(h, 1.5) * 3.77 * crestMask
    dx = math.sin(theta) * 70.0
    dz = (math.cos(theta) - 1.0) * 70.0 * 0.85
    
    new_x = x + dx
    new_z = cleanZ + dz
    print(f"orig_x: {x:4}, cleanZ: {cleanZ:5.1f}, h: {h:4.2f}, crestMask: {crestMask:4.2f}, theta: {theta:4.2f}, dx: {dx:5.1f}, dz: {dz:5.1f}, new_x: {new_x:5.1f}, new_z: {new_z:5.1f}")
