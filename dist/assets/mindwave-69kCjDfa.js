var I=Object.defineProperty;var T=(y,t,e)=>t in y?I(y,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):y[t]=e;var w=(y,t,e)=>T(y,typeof t!="symbol"?t+"":t,e);import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main_vFINAL-xbg5uDPf.js";import"./persistence-2_wyzSkG.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";class P{static generate(t,e){try{const o=t.getContext("2d");if(!o)return;const l=t.width=200,h=t.height=200,r=l/2,s=h/2,c=this.PALETTES[e%this.PALETTES.length],g=e*137.508+42,v=i=>Math.sin(i*127.1+g)*.5+.5;o.fillStyle="#000",o.fillRect(0,0,l,h);const a=e%12;a===0?this.drawChladni(o,l,h,r,s,c,e):a===1?this.drawPolarRose(o,l,h,r,s,c,e):a===2?this.drawLissajous(o,l,h,r,s,c,e):a===3?this.drawSpirograph(o,l,h,r,s,c,e):a===4?this.drawMandala(o,l,h,r,s,c,e):a===5?this.drawWaveInterference(o,l,h,r,s,c,e):a===6?this.drawVoronoi(o,l,h,r,s,c,e):a===7?this.drawFractalSpiral(o,l,h,r,s,c,e):a===8?this.drawReactionDiffusion(o,l,h,r,s,c,e):a===9?this.drawMoire(o,l,h,r,s,c,e):a===10?this.drawFlowField(o,l,h,r,s,c,e):this.drawKaleidoscope(o,l,h,r,s,c,e);const n=o.createRadialGradient(r,s,l*.2,r,s,l*.7);n.addColorStop(0,"rgba(0,0,0,0)"),n.addColorStop(1,"rgba(0,0,0,0.7)"),o.fillStyle=n,o.fillRect(0,0,l,h)}catch(o){console.error("[CymaticArtGenerator] Error rendering idx:",e,o)}}static rgb(t,e=1){return`rgba(${t[0]},${t[1]},${t[2]},${e})`}static lerp(t,e,o){return t.map((l,h)=>Math.round(l+(e[h]-l)*o))}static drawChladni(t,e,o,l,h,r,s){const c=s%7+2,g=s*3%5+1,v=t.createImageData(e,o);for(let a=0;a<o;a++)for(let n=0;n<e;n++){const i=n/e,f=a/o,d=Math.cos(c*Math.PI*i)*Math.cos(g*Math.PI*f)-Math.cos(g*Math.PI*i)*Math.cos(c*Math.PI*f),m=Math.abs(d),u=Math.exp(-m*m*12),M=this.lerp(r[0],r[1],m),p=this.lerp(M,r[2],u*.8),b=(a*e+n)*4;v.data[b]=p[0]*u+M[0]*(1-u)*.15,v.data[b+1]=p[1]*u+M[1]*(1-u)*.15,v.data[b+2]=p[2]*u+M[2]*(1-u)*.15,v.data[b+3]=255}t.putImageData(v,0,0)}static drawPolarRose(t,e,o,l,h,r,s){const c=s%8+3,g=s%3+1,v=c/g;t.lineWidth=1.5;for(let n=0;n<3;n++){t.beginPath();const i=n*.3;for(let f=0;f<=Math.PI*2*g;f+=.005){const d=e*.38*Math.cos(v*f+i),m=l+d*Math.cos(f),u=h+d*Math.sin(f);f===0?t.moveTo(m,u):t.lineTo(m,u)}t.strokeStyle=this.rgb(r[n%3],.7-n*.15),t.stroke()}const a=t.createRadialGradient(l,h,0,l,h,30);a.addColorStop(0,this.rgb(r[2],.8)),a.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=a,t.fillRect(0,0,e,o)}static drawLissajous(t,e,o,l,h,r,s){const c=s%5+1,g=s*2%7+2,v=s*.7%Math.PI;t.lineWidth=1.2;for(let a=0;a<4;a++){t.beginPath();const n=a*.4;for(let i=0;i<=Math.PI*2;i+=.003){const f=l+e*.38*Math.sin(c*i+v+n),d=h+o*.38*Math.sin(g*i+n*.5);i===0?t.moveTo(f,d):t.lineTo(f,d)}t.strokeStyle=this.rgb(r[a%3],.6),t.stroke()}}static drawSpirograph(t,e,o,l,h,r,s){const c=60+s%20*2,g=15+s%15,v=20+s%30;t.lineWidth=.8;for(let a=0;a<3;a++){t.beginPath();const n=a*.5;for(let i=0;i<Math.PI*20;i+=.01){const f=l+(c-g)*Math.cos(i+n)+v*Math.cos((c-g)/g*i+n),d=h+(c-g)*Math.sin(i+n)+v*Math.sin((c-g)/g*i+n);i===0?t.moveTo(f,d):t.lineTo(f,d)}t.strokeStyle=this.rgb(r[a],.5),t.stroke()}}static drawMandala(t,e,o,l,h,r,s){const c=s%8+6;for(let g=0;g<c;g++){const v=g/c*Math.PI*2;t.save(),t.translate(l,h),t.rotate(v);for(let a=20;a<e*.45;a+=8){const n=Math.sin(a*.1+s)*5,i=Math.max(.1,3+Math.sin(a*.05+s*.3)*8);t.beginPath(),t.arc(n,-a,i,0,Math.PI*2);const f=a/(e*.45);t.fillStyle=this.rgb(this.lerp(r[0],r[2],f),.4+f*.3),t.fill()}t.restore()}}static drawWaveInterference(t,e,o,l,h,r,s){const c=[],g=3+s%4;for(let a=0;a<g;a++){const n=a/g*Math.PI*2+s*.5;c.push({x:l+Math.cos(n)*e*.25,y:h+Math.sin(n)*o*.25,freq:15+(s+a*7)%20})}const v=t.createImageData(e,o);for(let a=0;a<o;a++)for(let n=0;n<e;n++){let i=0;c.forEach(M=>{const p=Math.sqrt((n-M.x)**2+(a-M.y)**2);i+=Math.sin(p/M.freq*Math.PI*2)}),i=i/g;const f=i*.5+.5,d=this.lerp(r[0],r[1],f),m=Math.abs(i),u=(a*e+n)*4;v.data[u]=d[0]*m,v.data[u+1]=d[1]*m,v.data[u+2]=d[2]*m,v.data[u+3]=255}t.putImageData(v,0,0)}static drawVoronoi(t,e,o,l,h,r,s){const c=[],g=12+s%8;for(let a=0;a<g;a++)c.push({x:(Math.sin(a*127.1+s*311.7)*.5+.5)*e,y:(Math.sin(a*269.5+s*183.3)*.5+.5)*o});const v=t.createImageData(e,o);for(let a=0;a<o;a++)for(let n=0;n<e;n++){let i=1e9,f=1e9,d=0;c.forEach((p,b)=>{const S=Math.sqrt((n-p.x)**2+(a-p.y)**2);S<i?(f=i,i=S,d=b):S<f&&(f=S)});const m=1-Math.exp(-(f-i)*.3),u=this.lerp(r[d%3],r[(d+1)%3],i/100),M=(a*e+n)*4;v.data[M]=u[0]*m*.7,v.data[M+1]=u[1]*m*.7,v.data[M+2]=u[2]*m*.7,v.data[M+3]=255}t.putImageData(v,0,0)}static drawFractalSpiral(t,e,o,l,h,r,s){const c=s%5+2,g=.15+s%10*.03;t.lineWidth=1;for(let v=0;v<c;v++){const a=v/c*Math.PI*2;t.beginPath();for(let i=0;i<e*.48;i+=.5){const f=a+i*g,d=l+i*Math.cos(f),m=h+i*Math.sin(f);i===0?t.moveTo(d,m):t.lineTo(d,m)}const n=t.createLinearGradient(0,0,e,o);n.addColorStop(0,this.rgb(r[v%3],.8)),n.addColorStop(1,this.rgb(r[(v+1)%3],.3)),t.strokeStyle=n,t.stroke()}}static drawReactionDiffusion(t,e,o,l,h,r,s){const c=t.createImageData(e,o),g=.03+s%10*.005,v=s*17.3,a=s*23.7;for(let n=0;n<o;n++)for(let i=0;i<e;i++){let f=0;f+=Math.sin((i+v)*g)*Math.cos((n+a)*g),f+=Math.sin(((i+v)*.7+(n+a)*1.3)*g*1.5)*.5,f+=Math.cos(((i+v)*1.1-(n+a)*.9)*g*2)*.25;const d=f*.5+.5,m=Math.abs(Math.sin(f*Math.PI*3)),u=this.lerp(r[0],r[1],d),M=this.lerp(u,r[2],m),p=(n*e+i)*4;c.data[p]=M[0]*.7,c.data[p+1]=M[1]*.7,c.data[p+2]=M[2]*.7,c.data[p+3]=255}t.putImageData(c,0,0)}static drawMoire(t,e,o,l,h,r,s){const c=t.createImageData(e,o),g=8+s%12,v=10+s*3%15,a=s%5*15,n=s%7*12;for(let i=0;i<o;i++)for(let f=0;f<e;f++){const d=Math.sqrt((f-l)**2+(i-h)**2),m=Math.sqrt((f-l-a)**2+(i-h-n)**2),u=Math.sin(d/g*Math.PI*2)*.5+.5,M=Math.sin(m/v*Math.PI*2)*.5+.5,p=u*M,b=this.lerp(r[0],r[2],p),S=(i*e+f)*4;c.data[S]=b[0],c.data[S+1]=b[1],c.data[S+2]=b[2],c.data[S+3]=255}t.putImageData(c,0,0)}static drawFlowField(t,e,o,l,h,r,s){const c=.015+s%8*.003,g=200+s*5;t.lineWidth=.8;for(let v=0;v<g;v++){let a=(Math.sin(v*127.1+s*73.7)*.5+.5)*e,n=(Math.cos(v*269.5+s*37.3)*.5+.5)*o;t.beginPath(),t.moveTo(a,n);for(let f=0;f<20;f++){const d=Math.sin(a*c)*Math.cos(n*c)*Math.PI*4+s*.1;a+=Math.cos(d)*3,n+=Math.sin(d)*3,t.lineTo(a,n)}const i=v/g;t.strokeStyle=this.rgb(this.lerp(r[0],r[2],i),.4),t.stroke()}}static drawKaleidoscope(t,e,o,l,h,r,s){const c=s%6+4,g=15+s%10;for(let v=0;v<c;v++){t.save(),t.translate(l,h),t.rotate(v/c*Math.PI*2);for(let a=0;a<g;a++){const n=10+a*5,i=Math.max(.1,3+Math.sin(a*.5+s)*4),f=Math.cos(a*.3+s*.7)*8;t.beginPath(),t.arc(f,-n,i,0,Math.PI*2);const d=a/g;t.fillStyle=this.rgb(this.lerp(r[a%3],r[(a+1)%3],d),.5),t.fill()}t.restore()}}}w(P,"PALETTES",[[[255,100,220],[80,0,180],[0,220,255]],[[255,200,50],[255,80,0],[180,0,120]],[[0,255,180],[0,100,255],[200,0,255]],[[255,50,80],[255,180,0],[0,255,100]],[[100,200,255],[0,50,200],[180,0,255]],[[255,220,100],[255,120,200],[100,0,180]],[[0,255,220],[80,180,255],[200,100,255]],[[255,80,120],[80,255,200],[0,120,255]],[[200,255,0],[0,200,180],[120,0,255]],[[255,150,50],[200,50,200],[50,200,255]],[[220,0,100],[0,180,220],[180,255,0]],[[150,0,255],[0,255,150],[255,200,0]]]);document.addEventListener("DOMContentLoaded",()=>{const y=Array.from(document.querySelectorAll("canvas.cymatic-gen-art"));let t=0;function e(){for(let l=0;l<6&&t<y.length;l++,t++){const h=y[t],r=parseInt(h.dataset.idx,10);isNaN(r)||P.generate(h,r)}t<y.length&&requestAnimationFrame(e)}requestAnimationFrame(e)});class A{constructor(t,e){this.canvas=t,this.gl=t.getContext("webgl",{alpha:!0,antialias:!0}),this.type=e,this.init()}init(){const t=this.gl;if(!t)return;const e=`
            attribute vec2 position;
            varying vec2 vUv;
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `,o=this.getFragmentShader();this.program=this.createProgram(e,o);const l=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),h=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,h),t.bufferData(t.ARRAY_BUFFER,l,t.STATIC_DRAW);const r=t.getAttribLocation(this.program,"position");t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0),this.timeLocation=t.getUniformLocation(this.program,"uTime"),this.resolutionLocation=t.getUniformLocation(this.program,"uResolution"),this.startTime=performance.now(),this.animate=this.animate.bind(this),requestAnimationFrame(this.animate)}getFragmentShader(){let t=`
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform vec2 uResolution;
            
            vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
                return a + b*cos( 6.28318*(c*t+d) );
            }
        `;return this.type==="singularity"?t+`
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
            }`:this.type==="neural"?t+`
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                float t = uTime * 0.5;
                vec3 col = vec3(0.0);
                for(int i = 0; i < 5; i++) {
                    uv = abs(uv) / dot(uv, uv) - vec2(0.5);
                    col += vec3(0.1, 0.4, 0.8) * (0.1 / length(uv + vec2(sin(t), cos(t))*0.1));
                }
                gl_FragColor = vec4(col, 1.0);
            }`:this.type==="void"?t+`
            mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                uv *= rot(uTime * 0.2);
                float d = length(max(abs(uv) - 0.5, 0.0));
                vec3 col = vec3(0.8, 0.1, 0.9) * smoothstep(0.1, 0.0, abs(sin(d * 20.0 - uTime * 4.0)));
                col += vec3(0.2, 0.1, 0.5) * smoothstep(0.2, 0.0, d);
                gl_FragColor = vec4(col, 1.0);
            }`:this.type==="omega"?t+`
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                float angle = atan(uv.y, uv.x);
                float radius = length(uv);
                float f = sin(angle * 8.0 + uTime * 2.0) * 0.1 + 0.5;
                vec3 col = vec3(0.9, 0.6, 0.1) * smoothstep(f + 0.05, f - 0.05, radius);
                col += vec3(1.0, 0.2, 0.3) * smoothstep(f, f - 0.1, radius) * 0.5;
                gl_FragColor = vec4(col, 1.0);
            }`:this.type==="stellar"?t+`
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                float t = uTime * 0.8;
                float r = length(uv);
                float a = atan(uv.y, uv.x);
                float v = sin(r * 15.0 - t * 3.0 + a * 5.0) * 0.5 + 0.5;
                vec3 col = vec3(0.1, 0.8, 0.6) * v;
                col += vec3(0.0, 0.2, 0.4) * (1.0 - v);
                gl_FragColor = vec4(col, 1.0);
            }`:this.type==="chronos"?t+`
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                float r = length(uv);
                float a = atan(uv.y, uv.x);
                float f = sin(a * 12.0) * cos(r * 20.0 - uTime * 5.0);
                vec3 col = vec3(1.0, 0.1, 0.5) * abs(f);
                col += vec3(0.2, 0.0, 0.8) * (1.0 - abs(f));
                gl_FragColor = vec4(col, 1.0);
            }`:t+`
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));
                gl_FragColor = vec4(col, 1.0);
            }`}createProgram(t,e){const o=this.gl,l=o.createShader(o.VERTEX_SHADER);o.shaderSource(l,t),o.compileShader(l);const h=o.createShader(o.FRAGMENT_SHADER);o.shaderSource(h,e),o.compileShader(h);const r=o.createProgram();return o.attachShader(r,l),o.attachShader(r,h),o.linkProgram(r),r}animate(){const t=this.gl,e=(performance.now()-this.startTime)*.001;t.viewport(0,0,this.canvas.width,this.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(this.program),t.uniform1f(this.timeLocation,e),t.uniform2f(this.resolutionLocation,this.canvas.width,this.canvas.height),t.drawArrays(t.TRIANGLES,0,6),requestAnimationFrame(this.animate)}}window.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".live-shader-canvas").forEach(y=>{new A(y,y.dataset.shader)})});
//# sourceMappingURL=mindwave-69kCjDfa.js.map
