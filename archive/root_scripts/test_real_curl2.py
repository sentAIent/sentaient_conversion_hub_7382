import math

pts = []
for orig_x in range(120, -120, -1):
    if orig_x < 0: envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else: envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
    
    baseHeight = 60.0
    cleanZ = baseHeight * envelope
    
    # REFINED ROTATION
    pivotX = 15.0
    pivotZ = baseHeight * 0.35
    
    # Only curl if Z is above pivot and X is not far behind the wave
    curlFrac = 0.0
    if cleanZ > pivotZ and orig_x > -20.0:
        # Normalize Z to 0-1
        curlFrac = (cleanZ - pivotZ) / (baseHeight - pivotZ)
        # Fade out the curl for the back of the wave smoothly
        backFade = 1.0
        if orig_x < 0.0:
            backFade = max(0.0, 1.0 + orig_x / 20.0)
        curlFrac *= backFade
        
        # Smooth step
        curlFrac = curlFrac * curlFrac * (3.0 - 2.0 * curlFrac)
    
    maxAngle = math.pi * 1.3 # 234 degrees
    theta = curlFrac * maxAngle
    
    dx = orig_x - pivotX
    dz = cleanZ - pivotZ
    
    rot_dx = dx * math.cos(theta) + dz * math.sin(theta)
    rot_dz = -dx * math.sin(theta) + dz * math.cos(theta)
    
    final_x = pivotX + rot_dx
    final_z = pivotZ + rot_dz
    
    if curlFrac == 0.0:
        final_x = orig_x
        final_z = cleanZ
        
    pts.append((final_x, final_z))

# Plot
print("--- REFINED CURL ---")
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'
for row in grid:
    print(''.join(row))

