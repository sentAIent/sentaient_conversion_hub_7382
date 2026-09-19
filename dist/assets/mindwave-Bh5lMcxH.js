var F=Object.defineProperty;var C=(b,t,a)=>t in b?F(b,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):b[t]=a;var A=(b,t,a)=>C(b,typeof t!="symbol"?t+"":t,a);import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main_vFINAL-rByYUqSJ.js";import"./persistence-baI65jC4.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";class D{static generate(t,a){try{const o=t.getContext("2d");if(!o)return;const l=t.width=200,f=t.height=200,c=l/2,r=f/2,n=this.PALETTES[a%this.PALETTES.length],g=a*137.508+42,h=s=>Math.sin(s*127.1+g)*.5+.5;if(o.fillStyle="#000",o.fillRect(0,0,l,f),a>=59&&a<=63)this.drawPixelStardust(o,l,f,c,r,n,a);else if(a>=64&&a<=68)this.drawHarmonicGradient(o,l,f,c,r,n,a);else{const s=a%12;s===0?this.drawChladni(o,l,f,c,r,n,a):s===1?this.drawPolarRose(o,l,f,c,r,n,a):s===2?this.drawLissajous(o,l,f,c,r,n,a):s===3?this.drawSpirograph(o,l,f,c,r,n,a):s===4?this.drawMandala(o,l,f,c,r,n,a):s===5?this.drawWaveInterference(o,l,f,c,r,n,a):s===6?this.drawVoronoi(o,l,f,c,r,n,a):s===7?this.drawFractalSpiral(o,l,f,c,r,n,a):s===8?this.drawReactionDiffusion(o,l,f,c,r,n,a):s===9?this.drawMoire(o,l,f,c,r,n,a):s===10?this.drawFlowField(o,l,f,c,r,n,a):this.drawKaleidoscope(o,l,f,c,r,n,a)}const e=o.createRadialGradient(c,r,l*.2,c,r,l*.7);e.addColorStop(0,"rgba(0,0,0,0)"),e.addColorStop(1,"rgba(0,0,0,0.7)"),o.fillStyle=e,o.fillRect(0,0,l,f)}catch(o){console.error("[CymaticArtGenerator] Error rendering idx:",a,o)}}static drawPixelStardust(t,a,o,l,f,c,r){const n=t.createImageData(a,o),g=r*1.5,h=10+r%15,e=5+r%10,s=[[0,255,255],[255,0,255],[255,215,0],[138,43,226],[57,255,20]];for(let i=0;i<o;i++)for(let v=0;v<a;v++){const d=v/a,M=i/o,m=Math.cos(h*Math.PI*d)*Math.cos(e*Math.PI*M)-Math.cos(e*Math.PI*d)*Math.cos(h*Math.PI*M),u=Math.abs(m),p=Math.floor(d*120),y=Math.floor(M*120),P=Math.abs(Math.sin(p*12.9898+y*78.233+g))*.5+.5,S=u*P*1.5;let I=Math.floor(P*4.99);I<0&&(I=0),I>4&&(I=4);const T=s[I],w=(i*a+v)*4;n.data[w]=Math.min(255,T[0]*S),n.data[w+1]=Math.min(255,T[1]*S),n.data[w+2]=Math.min(255,T[2]*S),n.data[w+3]=255}t.putImageData(n,0,0)}static drawHarmonicGradient(t,a,o,l,f,c,r){const n=t.createImageData(a,o),g=8+r%8,h=12+r%6,e=[[20,0,40],[0,255,255],[255,215,0],[0,0,0]];for(let s=0;s<o;s++)for(let i=0;i<a;i++){const v=i/a,d=s/o,M=Math.cos(g*Math.PI*v)*Math.cos(h*Math.PI*d)-Math.cos(h*Math.PI*v)*Math.cos(g*Math.PI*d),m=Math.abs(M);let u;if(m<.3){const y=m/.3;u=this.lerp(e[0],e[1],y)}else if(m<.6){const y=(m-.3)/.3;u=this.lerp(e[1],e[2],y)}else{const y=(m-.6)/.4;u=this.lerp(e[2],e[3],y)}const p=(s*a+i)*4;n.data[p]=u[0],n.data[p+1]=u[1],n.data[p+2]=u[2],n.data[p+3]=255}t.putImageData(n,0,0)}static rgb(t,a=1){return`rgba(${t[0]},${t[1]},${t[2]},${a})`}static lerp(t,a,o){return t.map((l,f)=>Math.round(l+(a[f]-l)*o))}static drawChladni(t,a,o,l,f,c,r){const n=r%7+2,g=r*3%5+1,h=t.createImageData(a,o);for(let e=0;e<o;e++)for(let s=0;s<a;s++){const i=s/a,v=e/o,d=Math.cos(n*Math.PI*i)*Math.cos(g*Math.PI*v)-Math.cos(g*Math.PI*i)*Math.cos(n*Math.PI*v),M=Math.abs(d),m=Math.exp(-M*M*12),u=this.lerp(c[0],c[1],M),p=this.lerp(u,c[2],m*.8),y=(e*a+s)*4;h.data[y]=p[0]*m+u[0]*(1-m)*.15,h.data[y+1]=p[1]*m+u[1]*(1-m)*.15,h.data[y+2]=p[2]*m+u[2]*(1-m)*.15,h.data[y+3]=255}t.putImageData(h,0,0)}static drawPolarRose(t,a,o,l,f,c,r){const n=r%8+3,g=r%3+1,h=n/g;t.lineWidth=1.5;for(let s=0;s<3;s++){t.beginPath();const i=s*.3;for(let v=0;v<=Math.PI*2*g;v+=.005){const d=a*.38*Math.cos(h*v+i),M=l+d*Math.cos(v),m=f+d*Math.sin(v);v===0?t.moveTo(M,m):t.lineTo(M,m)}t.strokeStyle=this.rgb(c[s%3],.7-s*.15),t.stroke()}const e=t.createRadialGradient(l,f,0,l,f,30);e.addColorStop(0,this.rgb(c[2],.8)),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,a,o)}static drawLissajous(t,a,o,l,f,c,r){const n=r%5+1,g=r*2%7+2,h=r*.7%Math.PI;t.lineWidth=1.2;for(let e=0;e<4;e++){t.beginPath();const s=e*.4;for(let i=0;i<=Math.PI*2;i+=.003){const v=l+a*.38*Math.sin(n*i+h+s),d=f+o*.38*Math.sin(g*i+s*.5);i===0?t.moveTo(v,d):t.lineTo(v,d)}t.strokeStyle=this.rgb(c[e%3],.6),t.stroke()}}static drawSpirograph(t,a,o,l,f,c,r){const n=60+r%20*2,g=15+r%15,h=20+r%30;t.lineWidth=.8;for(let e=0;e<3;e++){t.beginPath();const s=e*.5;for(let i=0;i<Math.PI*20;i+=.01){const v=l+(n-g)*Math.cos(i+s)+h*Math.cos((n-g)/g*i+s),d=f+(n-g)*Math.sin(i+s)+h*Math.sin((n-g)/g*i+s);i===0?t.moveTo(v,d):t.lineTo(v,d)}t.strokeStyle=this.rgb(c[e],.5),t.stroke()}}static drawMandala(t,a,o,l,f,c,r){const n=r%8+6;for(let g=0;g<n;g++){const h=g/n*Math.PI*2;t.save(),t.translate(l,f),t.rotate(h);for(let e=20;e<a*.45;e+=8){const s=Math.sin(e*.1+r)*5,i=Math.max(.1,3+Math.sin(e*.05+r*.3)*8);t.beginPath(),t.arc(s,-e,i,0,Math.PI*2);const v=e/(a*.45);t.fillStyle=this.rgb(this.lerp(c[0],c[2],v),.4+v*.3),t.fill()}t.restore()}}static drawWaveInterference(t,a,o,l,f,c,r){const n=[],g=3+r%4;for(let e=0;e<g;e++){const s=e/g*Math.PI*2+r*.5;n.push({x:l+Math.cos(s)*a*.25,y:f+Math.sin(s)*o*.25,freq:15+(r+e*7)%20})}const h=t.createImageData(a,o);for(let e=0;e<o;e++)for(let s=0;s<a;s++){let i=0;n.forEach(u=>{const p=Math.sqrt((s-u.x)**2+(e-u.y)**2);i+=Math.sin(p/u.freq*Math.PI*2)}),i=i/g;const v=i*.5+.5,d=this.lerp(c[0],c[1],v),M=Math.abs(i),m=(e*a+s)*4;h.data[m]=d[0]*M,h.data[m+1]=d[1]*M,h.data[m+2]=d[2]*M,h.data[m+3]=255}t.putImageData(h,0,0)}static drawVoronoi(t,a,o,l,f,c,r){const n=[],g=12+r%8;for(let e=0;e<g;e++)n.push({x:(Math.sin(e*127.1+r*311.7)*.5+.5)*a,y:(Math.sin(e*269.5+r*183.3)*.5+.5)*o});const h=t.createImageData(a,o);for(let e=0;e<o;e++)for(let s=0;s<a;s++){let i=1e9,v=1e9,d=0;n.forEach((p,y)=>{const P=Math.sqrt((s-p.x)**2+(e-p.y)**2);P<i?(v=i,i=P,d=y):P<v&&(v=P)});const M=1-Math.exp(-(v-i)*.3),m=this.lerp(c[d%3],c[(d+1)%3],i/100),u=(e*a+s)*4;h.data[u]=m[0]*M*.7,h.data[u+1]=m[1]*M*.7,h.data[u+2]=m[2]*M*.7,h.data[u+3]=255}t.putImageData(h,0,0)}static drawFractalSpiral(t,a,o,l,f,c,r){const n=r%5+2,g=.15+r%10*.03;t.lineWidth=1;for(let h=0;h<n;h++){const e=h/n*Math.PI*2;t.beginPath();for(let i=0;i<a*.48;i+=.5){const v=e+i*g,d=l+i*Math.cos(v),M=f+i*Math.sin(v);i===0?t.moveTo(d,M):t.lineTo(d,M)}const s=t.createLinearGradient(0,0,a,o);s.addColorStop(0,this.rgb(c[h%3],.8)),s.addColorStop(1,this.rgb(c[(h+1)%3],.3)),t.strokeStyle=s,t.stroke()}}static drawReactionDiffusion(t,a,o,l,f,c,r){const n=t.createImageData(a,o),g=.03+r%10*.005,h=r*17.3,e=r*23.7;for(let s=0;s<o;s++)for(let i=0;i<a;i++){let v=0;v+=Math.sin((i+h)*g)*Math.cos((s+e)*g),v+=Math.sin(((i+h)*.7+(s+e)*1.3)*g*1.5)*.5,v+=Math.cos(((i+h)*1.1-(s+e)*.9)*g*2)*.25;const d=v*.5+.5,M=Math.abs(Math.sin(v*Math.PI*3)),m=this.lerp(c[0],c[1],d),u=this.lerp(m,c[2],M),p=(s*a+i)*4;n.data[p]=u[0]*.7,n.data[p+1]=u[1]*.7,n.data[p+2]=u[2]*.7,n.data[p+3]=255}t.putImageData(n,0,0)}static drawMoire(t,a,o,l,f,c,r){const n=t.createImageData(a,o),g=8+r%12,h=10+r*3%15,e=r%5*15,s=r%7*12;for(let i=0;i<o;i++)for(let v=0;v<a;v++){const d=Math.sqrt((v-l)**2+(i-f)**2),M=Math.sqrt((v-l-e)**2+(i-f-s)**2),m=Math.sin(d/g*Math.PI*2)*.5+.5,u=Math.sin(M/h*Math.PI*2)*.5+.5,p=m*u,y=this.lerp(c[0],c[2],p),P=(i*a+v)*4;n.data[P]=y[0],n.data[P+1]=y[1],n.data[P+2]=y[2],n.data[P+3]=255}t.putImageData(n,0,0)}static drawFlowField(t,a,o,l,f,c,r){const n=.015+r%8*.003,g=200+r*5;t.lineWidth=.8;for(let h=0;h<g;h++){let e=(Math.sin(h*127.1+r*73.7)*.5+.5)*a,s=(Math.cos(h*269.5+r*37.3)*.5+.5)*o;t.beginPath(),t.moveTo(e,s);for(let v=0;v<20;v++){const d=Math.sin(e*n)*Math.cos(s*n)*Math.PI*4+r*.1;e+=Math.cos(d)*3,s+=Math.sin(d)*3,t.lineTo(e,s)}const i=h/g;t.strokeStyle=this.rgb(this.lerp(c[0],c[2],i),.4),t.stroke()}}static drawKaleidoscope(t,a,o,l,f,c,r){const n=r%6+4,g=15+r%10;for(let h=0;h<n;h++){t.save(),t.translate(l,f),t.rotate(h/n*Math.PI*2);for(let e=0;e<g;e++){const s=10+e*5,i=Math.max(.1,3+Math.sin(e*.5+r)*4),v=Math.cos(e*.3+r*.7)*8;t.beginPath(),t.arc(v,-s,i,0,Math.PI*2);const d=e/g;t.fillStyle=this.rgb(this.lerp(c[e%3],c[(e+1)%3],d),.5),t.fill()}t.restore()}}}A(D,"PALETTES",[[[255,100,220],[80,0,180],[0,220,255]],[[255,200,50],[255,80,0],[180,0,120]],[[0,255,180],[0,100,255],[200,0,255]],[[255,50,80],[255,180,0],[0,255,100]],[[100,200,255],[0,50,200],[180,0,255]],[[255,220,100],[255,120,200],[100,0,180]],[[0,255,220],[80,180,255],[200,100,255]],[[255,80,120],[80,255,200],[0,120,255]],[[200,255,0],[0,200,180],[120,0,255]],[[255,150,50],[200,50,200],[50,200,255]],[[220,0,100],[0,180,220],[180,255,0]],[[150,0,255],[0,255,150],[255,200,0]]]);document.addEventListener("DOMContentLoaded",()=>{const b=Array.from(document.querySelectorAll("canvas.cymatic-gen-art"));let t=0;function a(){for(let l=0;l<6&&t<b.length;l++,t++){const f=b[t],c=parseInt(f.dataset.idx,10);isNaN(c)||D.generate(f,c)}t<b.length&&requestAnimationFrame(a)}requestAnimationFrame(a)});class R{constructor(t,a){this.canvas=t,this.gl=t.getContext("webgl",{alpha:!0,antialias:!0}),this.type=a,this.init()}init(){const t=this.gl;if(!t)return;const a=`
            attribute vec2 position;
            varying vec2 vUv;
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `,o=this.getFragmentShader();this.program=this.createProgram(a,o);const l=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),f=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,l,t.STATIC_DRAW);const c=t.getAttribLocation(this.program,"position");t.enableVertexAttribArray(c),t.vertexAttribPointer(c,2,t.FLOAT,!1,0,0),this.timeLocation=t.getUniformLocation(this.program,"uTime"),this.resolutionLocation=t.getUniformLocation(this.program,"uResolution"),this.startTime=performance.now(),this.animate=this.animate.bind(this),requestAnimationFrame(this.animate)}getFragmentShader(){let t=`
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
            }`}createProgram(t,a){const o=this.gl,l=o.createShader(o.VERTEX_SHADER);o.shaderSource(l,t),o.compileShader(l);const f=o.createShader(o.FRAGMENT_SHADER);o.shaderSource(f,a),o.compileShader(f);const c=o.createProgram();return o.attachShader(c,l),o.attachShader(c,f),o.linkProgram(c),c}animate(){const t=this.gl,a=(performance.now()-this.startTime)*.001;t.viewport(0,0,this.canvas.width,this.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(this.program),t.uniform1f(this.timeLocation,a),t.uniform2f(this.resolutionLocation,this.canvas.width,this.canvas.height),t.drawArrays(t.TRIANGLES,0,6),requestAnimationFrame(this.animate)}}window.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".live-shader-canvas").forEach(b=>{new R(b,b.dataset.shader)})});
//# sourceMappingURL=mindwave-Bh5lMcxH.js.map
