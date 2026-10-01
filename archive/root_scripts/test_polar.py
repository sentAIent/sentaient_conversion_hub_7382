import math

pts = []
for orig_x in range(120, -120, -1):
    # Standard cleanZ
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    
    baseHeight = 60.0
    cleanZ = baseHeight * envelope
    
    # 1. POLAR CYLINDER
    # Center of barrel
    R = baseHeight * 0.45  # Radius of the tube
    Xc = 0.0
    Zc = R
    
    # Map X distance to angle
    # We want x=0 to be the top of the barrel.
    # As x increases (back of wave), it should map to the back of the cylinder.
    # As x decreases (front of wave), it should wrap around to the front.
    # Wait, the wave moves towards negative X. So the front face is negative X.
    # For negative X, we want to roll OVER and DOWN.
    # If orig_x = -R*pi, we want it to be at Z=0.
    # angle = orig_x / R
    # z_cyl = Zc + R * cos(angle)
    # x_cyl = Xc + R * sin(angle)
    # Let's check:
    # orig_x = 0 -> angle = 0 -> z = 2R, x = 0 (Peak)
    # orig_x = -R*pi/2 -> angle = -pi/2 -> z = R, x = -R (Front face)
    # orig_x = -R*pi -> angle = -pi -> z = 0, x = 0 (Crashing lip!)
    # orig_x = R*pi/2 -> angle = pi/2 -> z = R, x = R (Back of wave)
    
    angle = orig_x / R
    z_cyl = Zc + R * math.cos(angle)
    
    # To make it a true barrel, we need it to pitch forward!
    # A standard cylinder is straight up. We can shift the center Xc dynamically or just shear it.
    x_cyl = Xc + R * math.sin(angle)
    
    # 2. BLEND MASK
    mask = math.exp(-math.pow(orig_x * 0.03, 2.0))
    
    # Mix the original coordinates with the cylinder coordinates
    tubeStrength = 1.0
    
    final_x = orig_x * (1.0 - mask * tubeStrength) + x_cyl * (mask * tubeStrength)
    final_z = cleanZ * (1.0 - mask * tubeStrength) + z_cyl * (mask * tubeStrength)
    
    pts.append((final_x, final_z))

# Plot
print("--- POLAR MAPPING ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

