import re

js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

# Replace the mist block with sun & glare logic
old_mist = """                // Stylized Ukiyo-e Mist Clouds
                float dist = length(vViewPosition);
                float cloudNoise = snoise(vec2(vWorldPosition.x * 0.01 + uTime * 0.02, vWorldPosition.y * 0.005));
                float cloudMask = (1.0 - smoothstep(-10.0, 20.0, vElevation)) * (uMist * 1.5);
                float cloudShape = smoothstep(0.0, 0.8, cloudNoise) * cloudMask;
                
                vec3 cloudColor = vec3(0.98, 0.9, 0.8);
                
                float alpha = 1.0;
                if (uMist > 0.1) {
                    finalColor = mix(finalColor, cloudColor, cloudShape);
                }"""
                
new_sun = """                // Sun & Glare (uMist slider repurposed as Sun Reflection)
                float alpha = 1.0;
                
                if (uMist > 0.05) {
                    // Position of the sun in world space (far away on the horizon)
                    vec3 sunPos = vec3(-50.0, 200.0, 40.0);
                    float sunDist = length(vWorldPosition - sunPos);
                    
                    // Sun Disc
                    float sunRadius = 40.0;
                    float sunCore = 1.0 - smoothstep(sunRadius * 0.8, sunRadius, sunDist);
                    float sunGlow = 1.0 - smoothstep(sunRadius, sunRadius * 4.0, sunDist);
                    
                    vec3 sunColor = vec3(1.0, 0.9, 0.6); // Warm golden sun
                    
                    // Add the physical sun to the sky (only where elevation is high/sky area, 
                    // but we can cheat by just drawing it behind the wave. Since we are on a plane,
                    // we can draw the sun where the plane extends back on the Y axis).
                    if (vWorldPosition.y > 50.0) {
                        float sunMix = max(sunCore, sunGlow * 0.5) * (uMist / 3.0);
                        finalColor = mix(finalColor, sunColor, sunMix);
                    }
                    
                    // Ocean Glare / Specular Reflection
                    // Vector from pixel to sun
                    vec3 lightDir = normalize(sunPos - vWorldPosition);
                    // View vector (roughly down the Y axis for painting perspective)
                    vec3 viewDir = normalize(vViewPosition);
                    
                    // Fake a normal based on the noise/elevation
                    // For a flat ocean, normal is (0,0,1)
                    vec3 normal = vec3(0.0, 0.0, 1.0);
                    // Add some noise to the normal to simulate rippling water for the glare
                    float ripple = snoise(vWorldPosition.xy * 0.1 - vec2(0.0, uTime * 2.0));
                    normal.x += ripple * 0.2;
                    normal.y += ripple * 0.2;
                    normal = normalize(normal);
                    
                    // Blinn-Phong specular
                    vec3 halfVector = normalize(lightDir + viewDir);
                    float spec = pow(max(dot(normal, halfVector), 0.0), 64.0); // Shininess
                    
                    // Add a broad specular highlight on the water
                    float glareMix = spec * (uMist / 1.5) * smoothstep(-20.0, 10.0, vElevation);
                    
                    // Don't add glare on the foam
                    glareMix *= (1.0 - isFoam);
                    
                    finalColor += sunColor * glareMix;
                }"""

if old_mist in js:
    js = js.replace(old_mist, new_sun)
    with open(js_file, "w") as f:
        f.write(js)
    print("Patched Sun Reflection successfully.")
else:
    print("Could not find old_mist bounds.")

