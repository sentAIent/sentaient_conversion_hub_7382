import re

js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

# Fix the exponential curl so it applies to the slider target, not the animation phase
# Restore amplitude by making the tube much taller (ellipse instead of strict circle, or just scale Z)
old_physics = """                // --- TRUE CYLINDER BARREL PHYSICS ---
                // We want the wave to curl completely over itself, forming a hollow tube.
                float curlStartHeight = 15.0; // Where the face of the wave starts bending
                float maxRotation = pow(activeCurl / 4.0, 5.0) * 3.2; // Max uCurl of 4.0 = 3.2 radians (approx 180 degrees, a full half-pipe)
                
                if (pos.z > curlStartHeight) {
                    float heightAbovePivot = pos.z - curlStartHeight;
                    
                    // Bending angle increases the higher up the face you go.
                    // We multiply by envelope so the flat parts of the ocean don't curl.
                    float bendAngle = (heightAbovePivot / baseHeight) * maxRotation * envelope; 
                    
                    // True rotation around the pivot (X, Z)
                    // The pivot is at (originalX, curlStartHeight).
                    // As the wave bends, it pushes forward in X, and arcs down in Z.
                    
                    // A larger radius creates a hollower tube.
                    float tubeRadius = baseHeight * 0.4;
                    
                    // Calculate the new curled position based on circular mapping
                    float currentArcLength = heightAbovePivot;
                    // Angle based on arc length around the tube radius
                    float angle = (currentArcLength / tubeRadius) * maxRotation * envelope;
                    
                    // Apply cylindrical mapping
                    // Sine moves it forward (X), Cosine drops it down (Z)
                    pos.x += sin(angle) * tubeRadius;
                    pos.z = curlStartHeight + tubeRadius - (cos(angle) * tubeRadius);
                }"""
                
new_physics = """                // --- TRUE CYLINDER BARREL PHYSICS ---
                float curlStartHeight = 15.0; 
                
                // The user wants the barrel to only 'complete' in the upper 10% of the slider.
                // We map the slider (0 to 4.0) through a harsh exponential curve to get the TARGET rotation.
                float targetRotation = pow(uCurl / 4.0, 8.0) * 3.2; 
                
                // Then, if the loop is active, we animate smoothly up to that target rotation
                float currentRotation = targetRotation;
                if (uLoopActive > 0.5) {
                    float pitchProgress = smoothstep(0.3, 0.6, phase);
                    // If crashing, collapse the curl
                    float crashProgress = smoothstep(0.85, 0.95, phase);
                    float loopFactor = mix(pitchProgress, 0.0, crashProgress);
                    currentRotation = targetRotation * loopFactor;
                }
                
                if (pos.z > curlStartHeight) {
                    float heightAbovePivot = pos.z - curlStartHeight;
                    
                    // To maintain the MASSIVE amplitude (100-foot pipeline), we stretch the radius 
                    // vertically (forming an elliptical tube) so the wave doesn't lose height when curling.
                    float radiusX = baseHeight * 0.5;
                    float radiusZ = baseHeight * 0.9; // Huge vertical amplitude restored
                    
                    float angle = (heightAbovePivot / baseHeight) * currentRotation * envelope;
                    
                    pos.x += sin(angle) * radiusX;
                    pos.z = curlStartHeight + radiusZ - (cos(angle) * radiusZ);
                }"""

if old_physics in js:
    js = js.replace(old_physics, new_physics)
    with open(js_file, "w") as f:
        f.write(js)
    print("Patched tube physics successfully.")
else:
    print("Could not find old_physics bounds.")

