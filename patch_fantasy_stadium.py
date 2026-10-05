import re

with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'r') as f:
    content = f.read()

stadium_crowd = """
const StadiumCrowd = () => {
  const count = 50000;
  
  // Custom points geometry for a stadium bowl
  const { positions, randoms, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    const colorChoices = [
      new THREE.Color('#ff0044'),
      new THREE.Color('#0044ff'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#00ff00'),
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical/Colosseum distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 600 + Math.pow(Math.random(), 1.5) * 1400; 
      const y = (radius - 600) * 0.6 + (Math.random() * 50) - 100;
      
      // Cut out a slice for the Jumbotron
      if (theta > Math.PI * 1.3 && theta < Math.PI * 1.7 && y > 100) {
        positions[i * 3 + 0] = 0;
        positions[i * 3 + 1] = -10000; // hide
        positions[i * 3 + 2] = 0;
      } else {
        positions[i * 3 + 0] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(theta) * radius;
      }
      
      randoms[i] = Math.random();
      
      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, randoms, colors };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={count} array={randoms} itemSize={1} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial 
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          attribute float aRandom;
          attribute vec3 color;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = color;
            float angle = atan(position.z, position.x);
            float wave = sin(angle * 3.0 - uTime * 2.0) * 0.5 + 0.5;
            
            vec3 pos = position;
            pos.y += wave * 20.0 * aRandom;
            
            float flash = step(0.99, fract(aRandom * 123.456 + uTime * 1.5));
            if(flash > 0.5) {
                vColor = vec3(1.0, 1.0, 1.0);
            }
            
            vAlpha = 0.4 + wave * 0.3 + flash * 0.8;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (20.0 * aRandom + 10.0) * (1000.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if(d > 0.5) discard;
            float strength = (0.5 - d) * 2.0;
            gl_FragColor = vec4(vColor, strength * vAlpha);
          }
        `}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
      />
    </points>
  );
};
"""

# Replace CheeringFans with StadiumCrowd
content = re.sub(r'const CheeringFans = \(\) => \{.*?(?=const WorldFantasyQuant =)', stadium_crowd, content, flags=re.DOTALL)
content = content.replace('<CheeringFans />', '<StadiumCrowd />')

with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'w') as f:
    f.write(content)

print("Fantasy Quant patched.")
