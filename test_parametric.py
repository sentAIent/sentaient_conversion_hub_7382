import math

pts = []
for orig_x in range(120, -120, -2):
    # Normalized coordinate: -1 to 1 across the wave zone (-100 to 100)
    t = max(-1.0, min(1.0, orig_x / 80.0))
    
    # We want a smooth bump that transitions into a spiral.
    # Let's use a parametric equation for the cross section:
    # A standard bump: Z = exp(-x^2)
    baseZ = math.exp(-math.pow(t * 2.5, 2.0)) * 60.0
    
    # To make it curl, we map the X coordinate ITSELF to a curve!
    # Let's define the wave as a curve parameterized by 'u', where u goes from 0 to 1 along the wave face.
    # Front face: orig_x from 80 down to 0
    # Back face: orig_x from 0 down to -80
    
    if orig_x >= 0 and orig_x <= 80:
        # Front face parameter: u goes from 0 (at x=80) to 1 (at x=0)
        u = 1.0 - (orig_x / 80.0)
        
        # At u=0, it's flat. At u=1, it's curled.
        # Let's map 'u' to an angle along a circle.
        # A full circle is 2*PI. We want it to curl about 3/4 of a circle (1.5 PI).
        angle = u * 3.14159 * 1.3
        
        # Radius of the barrel
        R = 40.0
        
        # Parametric circle
        # We want the circle to start at the bottom (Z=0) and curl up and over.
        # Center of circle: Z = R, X = 40
        # If angle=0, it should be at Z=0. So sin(-PI/2) = -1.
        # Let's just use:
        cx = 40.0 - R * math.sin(angle)
        cz = R - R * math.cos(angle)
        
        # Blend from flat to circle based on tubeStrength (assume 1.0)
        # But wait, this doesn't map the vertices evenly!
        new_x = cx
        new_z = cz
    else:
        # Back face or flat ocean
        new_x = orig_x
        new_z = baseZ
        
    pts.append((new_x, new_z))

# Plot
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 300 * 119)
    row = int(39 - (z + 20) / 100 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'

for row in grid:
    print(''.join(row))
