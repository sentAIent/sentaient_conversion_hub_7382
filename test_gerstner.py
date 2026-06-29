import math

pts = []
for orig_x in range(120, -120, -2):
    
    # A single pulse wave using Gerstner math
    # k = wave number
    k = 0.05
    
    # theta = phase
    theta = orig_x * k
    
    # amplitude drops off away from the center to make it a localized wave
    # Gaussian envelope
    envelope = math.exp(-math.pow(orig_x * 0.02, 2.0))
    A = 50.0 * envelope
    
    # Gerstner displacement
    # Note: Gerstner is typically:
    # x = orig_x - Q * A * sin(kx)
    # z = A * cos(kx)
    Q = 1.5 # Steepness > 1 causes it to loop!
    
    new_x = orig_x - Q * A * math.sin(theta)
    new_z = A * math.cos(theta)
    
    # We want it to be above the water line, so shift it
    # Z goes from -A to A. Shift up by A
    new_z += 50.0 * envelope
    
    pts.append((new_x, new_z))

# Plot
grid = [[' ' for _ in range(120)] for _ in range(40)]
for x, z in pts:
    col = int((x + 120) / 240 * 119)
    row = int(39 - (z + 20) / 120 * 39)
    if 0 <= col < 120 and 0 <= row < 40:
        grid[row][col] = '*'

for row in grid:
    print(''.join(row))

