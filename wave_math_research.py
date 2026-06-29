# Let's model a 1D wave in python to visualize the coordinates
import math

def generate_wave():
    base_height = 60.0
    points = []
    for wave_x in range(-150, 150, 5):
        if wave_x < 0:
            envelope = math.exp(-pow(wave_x * 0.012, 2.0))
        else:
            envelope = math.exp(-pow(wave_x * 0.04, 2.0))
        pos_z = base_height * envelope
        points.append((wave_x, pos_z))
    return points

points = generate_wave()
for x, z in points:
    pass # we can plot or print these to see the shape
