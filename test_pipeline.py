import math

waveX = 0
tubeStrength = 1.0

# 1. PUSH FORWARD (X-axis)
pushX = math.exp(-math.pow(waveX + 10.0, 2.0) * 0.0015) * 65.0 * tubeStrength

print(f"pushX at peak: {pushX}")
