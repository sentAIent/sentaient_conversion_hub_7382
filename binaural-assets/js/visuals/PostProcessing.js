import * as THREE from '../vendor/three.module.js';

export class PostProcessor {
    constructor(renderer, width, height) {
        this.renderer = renderer;
        
        // Setup Render Target
        this.renderTarget = new THREE.WebGLRenderTarget(width, height, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            type: THREE.HalfFloatType // Better for bloom/HDR
        });

        // Setup Fullscreen Quad for Post-Processing
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.geometry = new THREE.BufferGeometry();
        
        // Define standard full-screen quad geometry
        const vertices = new Float32Array([
            -1.0, -1.0, 0.0,
             1.0, -1.0, 0.0,
            -1.0,  1.0, 0.0,
             1.0,  1.0, 0.0
        ]);
        const uvs = new Float32Array([
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0
        ]);
        const indices = [
            0, 1, 2,
            2, 1, 3
        ];
        this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        this.geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        this.geometry.setIndex(indices);
        
        this.mesh = new THREE.Mesh(this.geometry, null);
        
        // Custom Shader Material for Bloom + Chromatic Aberration
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: { value: this.renderTarget.texture },
                uResolution: { value: new THREE.Vector2(width, height) },
                uAberration: { value: 0.0 }, // Chromatic aberration intensity
                uBloomIntensity: { value: 0.0 },
                uTime: { value: 0.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform vec2 uResolution;
                uniform float uAberration;
                uniform float uBloomIntensity;
                uniform float uTime;
                varying vec2 vUv;

                // Simple 9-tap Gaussian Blur for Bloom
                vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
                    vec4 color = vec4(0.0);
                    vec2 off1 = vec2(1.3846153846) * direction;
                    vec2 off2 = vec2(3.2307692308) * direction;
                    
                    color += texture2D(image, uv) * 0.2270270270;
                    color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
                    color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
                    color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
                    color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
                    return color;
                }

                void main() {
                    // Base color + Chromatic Aberration
                    vec2 rOffset = vec2(uAberration, 0.0) / uResolution;
                    vec2 bOffset = vec2(-uAberration, 0.0) / uResolution;
                    
                    float r = texture2D(tDiffuse, vUv + rOffset).r;
                    float g = texture2D(tDiffuse, vUv).g;
                    float b = texture2D(tDiffuse, vUv + bOffset).b;
                    vec4 baseColor = vec4(r, g, b, texture2D(tDiffuse, vUv).a);

                    // Optional: Bloom
                    vec4 bloom = vec4(0.0);
                    if (uBloomIntensity > 0.0) {
                        bloom += blur(tDiffuse, vUv, uResolution, vec2(1.0, 0.0));
                        bloom += blur(tDiffuse, vUv, uResolution, vec2(0.0, 1.0));
                        bloom *= 0.5; // Average
                    }

                    // Additive blend with a slight soft-knee thresholding conceptually built into intensity
                    gl_FragColor = baseColor + (bloom * uBloomIntensity);
                }
            `,
            depthWrite: false,
            depthTest: false,
            transparent: true
        });

        this.mesh.material = this.material;
        
        // Single object scene for the quad
        this.scene = new THREE.Scene();
        this.scene.add(this.mesh);
    }

    resize(width, height) {
        this.renderTarget.setSize(width, height);
        this.material.uniforms.uResolution.value.set(width, height);
    }

    render(scene, camera, deltaTime, audioLevel) {
        // Render main scene to texture
        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.clear();
        this.renderer.render(scene, camera);

        // Update post-processing uniforms
        this.material.uniforms.uTime.value += deltaTime;
        
        // Audio-reactive chromatic aberration (only kicks in heavily during peaks)
        const peakCutoff = Math.max(0, audioLevel - 0.7) * 3.0; // 0 to ~1.0
        this.material.uniforms.uAberration.value = 5.0 * peakCutoff; // Pixel offset
        
        // Audio-reactive bloom
        this.material.uniforms.uBloomIntensity.value = 0.5 + (audioLevel * 1.5);

        // Render quad to screen
        this.renderer.setRenderTarget(null);
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        this.renderTarget.dispose();
        this.geometry.dispose();
        this.material.dispose();
    }
}
