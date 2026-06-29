import math

pts = []
for orig_x in range(120, -120, -1):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    
    baseHeight = 60.0
    cleanZ = baseHeight * envelope
    
    # ROTATION BARREL
    # We want to rotate the crest of the wave.
    # The crest is around x=0.
    # The pivot point for the curl should be somewhere inside the barrel.
    # Let's say pivot is at X=0, Z=baseHeight * 0.4
    pivotX = 0.0
    pivotZ = baseHeight * 0.4
    
    # We only rotate vertices that are ABOVE the pivot, and near the crest.
    # Let's calculate an angle based on how high the vertex is and how close to crest.
    # max rotation angle = pi (180 degrees)
    
    # Dist from pivot
    dx = orig_x - pivotX
    dz = cleanZ - pivotZ
    
    # Only curl if we are near the crest.
    # Let's use the envelope as a mask, but we want the curl to pull the whole face forward.
    # If we just blindly rotate, it might tear.
    # We need the rotation angle to be smooth.
    mask = math.exp(-math.pow(orig_x * 0.03, 2.0))
    
    # Angle is based on tubeStrength.
    tubeStrength = 1.0
    
    # But wait, we want the TIP to rotate the most.
    # If the angle is just a constant * mask, it won't curl into a tube, it will just tilt.
    # A tube is formed when the tip rotates 180 deg, middle rotates 90 deg.
    # So angle is proportional to Z!
    normalizedZ = max(0.0, (cleanZ - pivotZ) / (baseHeight - pivotZ))
    
    angle = normalizedZ * mask * tubeStrength * math.pi * 0.9 # almost 180 deg
    
    # Apply rotation
    new_dx = dx * math.cos(angle) + dz * math.sin(angle)
    new_dz = -dx * math.sin(angle) + dz * math.cos(angle)
    
    final_x = pivotX + new_dx
    final_z = pivotZ + new_dz
    
    # If a vertex was below the pivot, its normalizedZ is 0, angle is 0, so final = orig.
    # But if cleanZ < pivotZ, the angle is 0. 
    # Let's check how it blends.
    if cleanZ < pivotZ:
        final_x = orig_x
        final_z = cleanZ
    
    pts.append((final_x, final_z))

# Plot
print("--- ROTATION BARREL ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

