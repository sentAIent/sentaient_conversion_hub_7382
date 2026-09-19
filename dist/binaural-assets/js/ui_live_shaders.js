// Live WebGL Shaders for Premium UI Buttons
class UIButtonShader {
    constructor(canvas, shaderType) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl', { alpha: true, antialias: true });
        this.type = shaderType;
        this.init();
    }

    init() {
        const gl = this.gl;
        if (!gl) return;

        const vsSource = `
            attribute vec2 position;
            varying vec2 vUv;
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fsSource = this.getFragmentShader();

        this.program = this.createProgram(vsSource, fsSource);
        
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(this.program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        this.timeLocation = gl.getUniformLocation(this.program, "uTime");
        this.resolutionLocation = gl.getUniformLocation(this.program, "uResolution");
        
        this.startTime = performance.now();
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    getFragmentShader() {
        // Base uniforms and setup
        let base = `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform vec2 uResolution;
            
            vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
                return a + b*cos( 6.28318*(c*t+d) );
            }
        `;

        if (this.type === 'singularity') {
            return base + `
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                vec2 uv0 = uv;
                vec3 finalColor = vec3(0.0);
                
                for(float i = 0.0; i < 4.0; i++) {
                    uv = fract(uv * 1.5) - 0.5;
                    float d = length(uv) * exp(-length(uv0));
                    vec3 col = palette(length(uv0) + i*.4 + uTime*.4, vec3(0.5,0.5,0.5), vec3(0.5,0.5,0.5), vec3(1.0,1.0,1.0), vec3(0.263,0.416,0.557));
                    d = sin(d*8. + uTime)/8.;
                    d = abs(d);
                    d = pow(0.01 / d, 1.2);
                    finalColor += col * d;
                }
                gl_FragColor = vec4(finalColor, 1.0);
            }`;
        } else if (this.type === 'neural') {
            return base + `
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                float t = uTime * 0.5;
                vec3 col = vec3(0.0);
                for(int i = 0; i < 5; i++) {
                    uv = abs(uv) / dot(uv, uv) - vec2(0.5);
                    col += vec3(0.1, 0.4, 0.8) * (0.1 / length(uv + vec2(sin(t), cos(t))*0.1));
                }
                gl_FragColor = vec4(col, 1.0);
            }`;
        } else if (this.type === 'void') {
            return base + `
            mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                uv *= rot(uTime * 0.2);
                float d = length(max(abs(uv) - 0.5, 0.0));
                vec3 col = vec3(0.8, 0.1, 0.9) * smoothstep(0.1, 0.0, abs(sin(d * 20.0 - uTime * 4.0)));
                col += vec3(0.2, 0.1, 0.5) * smoothstep(0.2, 0.0, d);
                gl_FragColor = vec4(col, 1.0);
            }`;
        } else if (this.type === 'omega') {
            return base + `
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                float angle = atan(uv.y, uv.x);
                float radius = length(uv);
                float f = sin(angle * 8.0 + uTime * 2.0) * 0.1 + 0.5;
                vec3 col = vec3(0.9, 0.6, 0.1) * smoothstep(f + 0.05, f - 0.05, radius);
                col += vec3(1.0, 0.2, 0.3) * smoothstep(f, f - 0.1, radius) * 0.5;
                gl_FragColor = vec4(col, 1.0);
            }`;
        } else if (this.type === 'stellar') {
             return base + `
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                float t = uTime * 0.8;
                float r = length(uv);
                float a = atan(uv.y, uv.x);
                float v = sin(r * 15.0 - t * 3.0 + a * 5.0) * 0.5 + 0.5;
                vec3 col = vec3(0.1, 0.8, 0.6) * v;
                col += vec3(0.0, 0.2, 0.4) * (1.0 - v);
                gl_FragColor = vec4(col, 1.0);
            }`;
        } else if (this.type === 'chronos') {
            return base + `
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                float r = length(uv);
                float a = atan(uv.y, uv.x);
                float f = sin(a * 12.0) * cos(r * 20.0 - uTime * 5.0);
                vec3 col = vec3(1.0, 0.1, 0.5) * abs(f);
                col += vec3(0.2, 0.0, 0.8) * (1.0 - abs(f));
                gl_FragColor = vec4(col, 1.0);
            }`;
        } else {
            // Default fractal fallback
             return base + `
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));
                gl_FragColor = vec4(col, 1.0);
            }`;
        }
    }

    createProgram(vsSource, fsSource) {
        const gl = this.gl;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vsSource);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fsSource);
        gl.compileShader(fragmentShader);

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        return program;
    }

    animate() {
        const gl = this.gl;
        const time = (performance.now() - this.startTime) * 0.001;
        
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.program);
        gl.uniform1f(this.timeLocation, time);
        gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(this.animate);
    }
}

// Initialize when DOM loads
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.live-shader-canvas').forEach(canvas => {
        new UIButtonShader(canvas, canvas.dataset.shader);
    });
});
