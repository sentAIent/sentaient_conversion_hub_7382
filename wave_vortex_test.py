import math

def generate_wave():
    base_height = 60.0
    points = []
    # from back of wave to front
    for wave_x in range(-150, 150, 2):
        if wave_x < 0:
            envelope = math.exp(-pow(wave_x * 0.012, 2.0))
        else:
            envelope = math.exp(-pow(wave_x * 0.04, 2.0))
        
        orig_z = base_height * envelope
        orig_x = wave_x
        
        # Vortex deformation
        vortex_x = 20.0
        vortex_z = base_height * 0.3
        
        dx = orig_x - vortex_x
        dz = orig_z - vortex_z
        
        r = math.sqrt(dx*dx + dz*dz)
        
        # We only want to rotate points that are somewhat close, and primarily above the water line
        # to prevent the ocean floor from tearing.
        # Actually, let's just make the rotation angle decay with distance squared.
        rot_angle = 1500.0 / (r*r + 100.0) 
        
        # Only curl forward (clockwise)
        # In standard trig, clockwise is negative angle
        rot_angle = rot_angle # positive or negative depending on what we want
        
        current_angle = math.atan2(dz, dx)
        new_angle = current_angle - rot_angle
        
        new_x = vortex_x + r * math.cos(new_angle)
        new_z = vortex_z + r * math.sin(new_angle)
        
        # don't go below ground
        if new_z < 0:
            new_z = 0
            
        points.append((new_x, new_z))
        
    return points

points = generate_wave()

# Render an ascii plot
grid = [[' ' for _ in range(80)] for _ in range(30)]
for x, z in points:
    gx = int((x + 100) / 3)
    gz = int(29 - (z / 3))
    if 0 <= gx < 80 and 0 <= gz < 30:
        grid[gz][gx] = '#'
        
for row in grid:
    print("".join(row))

