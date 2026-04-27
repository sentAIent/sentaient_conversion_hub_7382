    initCymatics() {
        while(this.cymaticsGroup.children.length > 0) {
            const child = this.cymaticsGroup.children[0];
            this.cymaticsGroup.remove(child);
            if(child.geometry) child.geometry.dispose();
            if(child.material) child.material.dispose();
        }

        // Create dense 3D particle field for TRUE cymatic sand physics rendering
        const geometry = new THREE.PlaneGeometry(45, 45, 256, 256);
        this.cymaticMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uN: { value: this.currentCymaticData.n },
                uM: { value: this.currentCymaticData.m },
                uTime: { value: 0 },
                uIntensity: { value: 0 },
                uColor: { value: new THREE.Color(this.customColor || '#2dd4bf') },
                uPointSize: { value: 2.5 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform float uN;
                uniform float uM;
                uniform float uTime;
                uniform float uIntensity;
                uniform float uPointSize;

                float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
                float noise(vec2 p) {
                    vec2 i = floor(p); vec2 f = fract(p);
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
                }

                float chladni(vec2 uv, float n, float m) {
                    float pi = 3.14159265;
                    return cos(n * pi * uv.x) * cos(m * pi * uv.y) - cos(m * pi * uv.x) * cos(n * pi * uv.y);
                }

                void main() {
                    vUv = uv;
                    vec2 cUv = (uv - 0.5) * 2.0;

                    // Slow planetary rotation of the plate
                    float t = uTime * 0.05;
                    float c = cos(t), s = sin(t);
                    vec2 rUv = vec2(cUv.x * c - cUv.y * s, cUv.x * s + cUv.y * c);

                    // Fluid domain distortion representing energetic fluid shifting under the sand
                    vec2 distUv = rUv + vec2(noise(rUv * 3.0 + uTime), noise(rUv * 3.0 - uTime)) * 0.15 * uIntensity;

                    // Resonance harmonics blending
                    float val = chladni(distUv, uN, uM) + chladni(rUv * 2.0, uN, uM) * (0.3 * uIntensity);

                    // pattern is 0 at nodes (sand collects here) and > 0 at anti-nodes (sand is violently repelled)
                    float pattern = abs(val);
                    
                    // Violent shaking at anti-nodes
                    float bounce = snoise(uv * 10.0 + uTime * 15.0) * pattern * uIntensity * 2.0; 
                    
                    // High elevation at anti-nodes
                    float elevation = pattern * (4.0 + uIntensity * 12.0) + bounce;
                    vElevation = pattern;

                    vec3 newPos = position;
                    newPos.z += elevation;

                    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;

                    // Dynamic Point Size - Large glowing nodes, tiny disappearing anti-nodes
                    float sandDensity = (1.0 - smoothstep(0.0, 0.6, pattern));
                    gl_PointSize = uPointSize * (25.0 / -mvPosition.z) * (1.0 + uIntensity * 2.0) * sandDensity;
                }
                
                // Need snoise function locally inside vertex!
                float snoise(vec2 v){
                    const vec4 C = vec4(0.211324865, 0.366025403, -0.577350269, 0.0243902439);
                    vec2 i  = floor(v + dot(v, C.yy) ); vec2 x0 = v - i + dot(i, C.xx); vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.0);
                    vec3 p = fract(sin(vec3(dot(i.y + vec3(0.0, i1.y, 1.0), vec2(1.0,1.0)), dot(i.x + vec3(0.0, i1.x, 1.0), vec2(1.0,1.0)), 0.0)) * 43758.5453);
                    return fract(p.x * 2.0); // Simple proxy
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform vec3 uColor;
                uniform float uIntensity;

                void main() {
                    // Soft circular sandy particles
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    float r = dot(cxy, cxy);
                    if (r > 1.0) discard;
                    float soften = smoothstep(1.0, 0.5, r);

                    // At node (elevation near 0), sand is highly visible and bright
                    float atNode = smoothstep(0.25, 0.0, vElevation);

                    // Magical Iridescent Colors
                    vec3 nodeColor = uColor * 1.8;
                    vec3 antiNodeColor = uColor * 0.1;
                    
                    // Golden energy flare on peaks of intensity
                    vec3 hotColor = vec3(1.0, 0.9, 0.5); 
                    nodeColor = mix(nodeColor, hotColor, uIntensity * atNode);

                    vec3 finalCol = mix(antiNodeColor, nodeColor, atNode);
                    float alpha = mix(0.0, 1.0, atNode) * soften * (0.6 + uIntensity * 0.4);

                    // Radial fade (plate edge)
                    float dist = length(vUv - 0.5);
                    float vignette = smoothstep(0.5, 0.35, dist);

                    gl_FragColor = vec4(finalCol, alpha * vignette);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        // Use Points instead of Mesh
        const mesh = new THREE.Points(geometry, this.cymaticMaterial);
        
        // Tilt back so it looks like a flat plate of vibrating sand
        mesh.rotation.x = -Math.PI * 0.35; // Tilt back heavily
        mesh.position.y = 0;
        mesh.position.z = -20;

        this.cymaticsGroup.add(mesh);

        // Backdrop Glow Plate
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, 'rgba(255,255,255,0.7)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
        const tex = new THREE.CanvasTexture(canvas);
        
        const glowGeo = new THREE.PlaneGeometry(60, 60);
        const glowMat = new THREE.MeshBasicMaterial({
            color: this.customColor || 0x2dd4bf,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            map: tex
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        glowMesh.position.set(0, -5, -35); // far back
        
        // Expose glow to uniform updates later if we need
        this.cymaticsGlowMesh = glowMesh;
        this.cymaticsGroup.add(glowMesh);

        // Initial pattern
        if (this.cymaticsHistory.length === 0) {
            this.nextCymatic();
        }
    }
