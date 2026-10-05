import math

pts = []
for orig_x in range(120, -120, -1):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    
    baseHeight = 60.0
    cleanZ = baseHeight * envelope
    
    # SPACE TWIST
    # Pivot point for rotation
    pivotX = 0.0
    pivotZ = baseHeight * 0.3
    
    # Relative coords
    dx = orig_x - pivotX
    dz = cleanZ - pivotZ
    
    # Angle depends strictly on cleanZ!
    # Vertices higher up rotate more.
    # Vertices below pivotZ don't rotate.
    normalizedZ = max(0.0, (cleanZ - pivotZ) / (baseHeight - pivotZ))
    
    # To make it plunge, the angle needs to reach past 90 deg (pi/2) to maybe 140 deg.
    angle = normalizedZ * math.pi * 0.8
    
    # Apply rotation
    new_dx = dx * math.cos(angle) + dz * math.sin(angle)
    new_dz = -dx * math.sin(angle) + dz * math.cos(angle)
    
    # But wait, if orig_x is huge, dx is huge, so it sweeps a massive arc!
    # We only want to twist space near the crest.
    # If we apply a mask to the ANGLE based on orig_x, we get the criss-cross again.
    # Instead, we apply a mask to the ROTATION AMOUNT (blending the final position).
    mask = math.exp(-math.pow(orig_x * 0.02, 2.0))
    
    rotated_x = pivotX + new_dx
    rotated_z = pivotZ + new_dz
    
    # Blend
    final_x = orig_x * (1 - mask) + rotated_x * mask
    final_z = cleanZ * (1 - mask) + rotated_z * mask
    
    pts.append((final_x, final_z))

# Plot
print("--- TWIST BARREL ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

