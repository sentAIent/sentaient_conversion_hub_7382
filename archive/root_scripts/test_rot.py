import math

pts = []
for orig_x in range(60, -60, -2):
    if orig_x < 0:
        envelope = math.exp(-math.pow(orig_x * 0.012, 2.0))
    else:
        envelope = math.exp(-math.pow(orig_x * 0.04, 2.0))
        
    cleanZ = 60.0 * envelope
    
    # Pivot point is in front of the wave
    pivot_x = orig_x + 40.0
    pivot_z = 30.0
    
    # Calculate angle based on height so it smoothly blends
    # Only rotate upper part of wave (cleanZ > 10)
    angle_factor = max(0.0, min(1.0, (cleanZ - 10.0) / 50.0))
    
    # We only want to rotate the FRONT lip!
    # Wait, if we rotate the back of the wave by the same angle, the whole bump rotates into a circle?
    # Yes, if we want a hollow tube, the back of the wave must become the roof!
    
    angle = math.pow(angle_factor, 1.5) * 3.14159 * 1.1 # 1.1 Pi to tuck it in
    
    if angle > 0:
        # Translate to pivot
        rx = orig_x - 30.0 # pivot is at X=30
        rz = cleanZ - 30.0 # pivot is at Z=30
        
        # Rotate
        cos_a = math.cos(-angle) # -angle to rotate forward/down
        sin_a = math.sin(-angle)
        
        nx = rx * cos_a - rz * sin_a
        nz = rx * sin_a + rz * cos_a
        
        # Translate back
        new_x = nx + 30.0
        new_z = nz + 30.0
    else:
        new_x = orig_x
        new_z = cleanZ
        
    pts.append((new_x, new_z))

# Plot
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 60) / 200 * 119)
    row = int(39 - (z + 20) / 100 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'

for row in grid:
    print(''.join(row))

