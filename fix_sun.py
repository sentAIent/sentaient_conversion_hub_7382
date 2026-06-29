import re

js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

# Fix the normal for the reflection
old_glare = """                    // Fake a normal based on the noise/elevation
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

new_glare = """                    // The ocean plane is rotated -90 on X, so "up" is World Y (0,1,0)
                    vec3 normal = vec3(0.0, 1.0, 0.0);
                    float ripple = snoise(vWorldPosition.xz * 0.05 - vec2(0.0, uTime * 2.0));
                    normal.x += ripple * 0.15;
                    normal.z += ripple * 0.15;
                    normal = normalize(normal);
                    
                    vec3 halfVector = normalize(lightDir + viewDir);
                    float spec = pow(max(dot(normal, halfVector), 0.0), 32.0); // Broader shininess
                    
                    // Allow the glare to wash over the flat ocean too (vElevation near 0)
                    float glareMix = spec * (uMist * 1.2); 
                    
                    // Don't add glare on the foam
                    glareMix *= (1.0 - isFoam);
                    
                    finalColor += sunColor * glareMix;
                }"""

if old_glare in js:
    js = js.replace(old_glare, new_glare)
    print("Replaced glare logic")
else:
    print("Could not find glare logic")

# Remove the broken sun drawing from the wave shader
old_sun = """                    // Add the physical sun to the sky (only where elevation is high/sky area, 
                    // but we can cheat by just drawing it behind the wave. Since we are on a plane,
                    // we can draw the sun where the plane extends back on the Y axis).
                    if (vWorldPosition.y > 50.0) {
                        float sunMix = max(sunCore, sunGlow * 0.5) * (uMist / 3.0);
                        finalColor = mix(finalColor, sunColor, sunMix);
                    }"""
if old_sun in js:
    js = js.replace(old_sun, "")
    print("Removed old sun drawing")

# Add a dedicated Sun Mesh
old_mesh = """        this.tsunamiGroup.add(mesh);
    }"""

new_mesh = """        this.tsunamiGroup.add(mesh);
        
        // Create a physical Sun mesh in the sky
        const sunGeo = new THREE.PlaneGeometry(80, 80);
        const sunMat = new THREE.ShaderMaterial({
            uniforms: {
                uMist: uniforms.uMist,
                uColor: { value: new THREE.Color(1.0, 0.9, 0.6) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uMist;
                uniform vec3 uColor;
                varying vec2 vUv;
                void main() {
                    vec2 center = vUv - 0.5;
                    float dist = length(center);
                    float alpha = (1.0 - smoothstep(0.1, 0.5, dist)) * (uMist / 3.0);
                    float core = 1.0 - smoothstep(0.1, 0.15, dist);
                    vec3 finalColor = mix(uColor, vec3(1.0), core);
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        const sunMesh = new THREE.Mesh(sunGeo, sunMat);
        // Position it far away on the horizon, matching the sunPos in the shader
        sunMesh.position.set(-50, 40, -180);
        this.tsunamiGroup.add(sunMesh);
    }"""

if old_mesh in js:
    js = js.replace(old_mesh, new_mesh)
    print("Added sun mesh")
    
with open(js_file, "w") as f:
    f.write(js)

