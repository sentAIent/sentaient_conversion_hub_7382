import math

pts = []
for orig_x in range(120, -120, -1):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    
    baseHeight = 60.0
    cleanZ = baseHeight * envelope
    
    # REAL CURL PHYSICS
    # Pivot point inside the barrel
    pivotX = 20.0  # Slightly forward
    pivotZ = baseHeight * 0.4
    
    # We only curl the upper portion of the wave
    # curlFrac goes from 0 (at pivotZ) to 1 (at baseHeight)
    curlFrac = 0.0
    if cleanZ > pivotZ:
        curlFrac = (cleanZ - pivotZ) / (baseHeight - pivotZ)
        # Smooth it
        curlFrac = curlFrac * curlFrac * (3.0 - 2.0 * curlFrac)
    
    # We also only want to curl the front face and crest, not the far back.
    # So we use a mask on the X axis.
    xMask = math.exp(-math.pow(orig_x * 0.02, 2.0))
    
    # The actual angle of rotation
    # At the very tip (curlFrac=1, xMask=1), it rotates by pi (180 degrees)
    maxAngle = math.pi * 1.2
    theta = curlFrac * xMask * maxAngle
    
    # Apply rotation around pivot
    dx = orig_x - pivotX
    dz = cleanZ - pivotZ
    
    rot_dx = dx * math.cos(theta) + dz * math.sin(theta)
    rot_dz = -dx * math.sin(theta) + dz * math.cos(theta)
    
    final_x = pivotX + rot_dx
    final_z = pivotZ + rot_dz
    
    # If it wasn't rotated, it stays the same
    if curlFrac == 0.0:
        final_x = orig_x
        final_z = cleanZ
        
    pts.append((final_x, final_z))

# Plot
print("--- REAL CURL ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

