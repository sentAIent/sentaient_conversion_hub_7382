import math

pts = []
for orig_x in range(120, -120, -2):
    
    # We have a flat sheet of water (Z = 0)
    # We want to roll a section of it (from X=0 to X=80) into a cylinder.
    # X=0 is the base of the barrel. X=80 is the lip.
    
    if 0 <= orig_x <= 80:
        # Map X to an angle. 80 units of length needs to wrap around a cylinder of circumference C.
        # Let's say we want it to wrap 3/4 of a circle (1.5 PI).
        # Angle goes from 0 (at X=0) to 1.5 PI (at X=80).
        angle = (orig_x / 80.0) * 3.14159 * 1.5
        
        # Radius of cylinder
        R = 80.0 / (3.14159 * 1.5) # R = L / Theta = 80 / 4.71 = 17
        
        # We want the barrel to start at Z=0, and roll FORWARD (towards +X).
        # Center of cylinder should be at X=0, Z=R.
        # But wait, if X goes from 0 to 80, the sheet rolls UP and OVER.
        # At X=0 (angle=0), it should be at Z=0, X=0.
        cx = 0.0 + R * math.sin(angle)
        cz = R - R * math.cos(angle)
        
        new_x = cx
        new_z = cz
    elif orig_x < 0:
        # Behind the wave
        new_x = orig_x
        new_z = 0
    else:
        # In front of the lip (X > 80)
        # It's physically rolled up into the barrel, but the mesh continues.
        # This is where a mesh "split" happens naturally if we just leave it flat.
        # But we need a continuous mesh.
        # A real plunging wave is NOT a rolled up flat sheet. It's a bump that leans over.
        new_x = orig_x
        new_z = 0
        
    pts.append((new_x, new_z))

# Plot
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 60 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'

for row in grid:
    print(''.join(row))

