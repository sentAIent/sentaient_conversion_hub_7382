import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const FootballPlayer = ({ color, number, groupRef, armRef }) => {
  return (
    <group ref={groupRef}>
      {/* Torso/Shoulders */}
      <mesh position={[0, 10, 0]}>
        <cylinderGeometry args={[3.5, 2.5, 8, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.4} />
      </mesh>
      
      {/* Shoulder Pads */}
      <mesh position={[-3.5, 13, 0]} rotation={[0, 0, 0.2]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[3.5, 13, 0]} rotation={[0, 0, -0.2]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} />
      </mesh>

      {/* Helmet with Visor */}
      <group position={[0, 17, 0]}>
        <mesh>
          <sphereGeometry args={[2.8, 32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.5, 2.0]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[3.5, 2, 2]} />
          <meshStandardMaterial color="#000000" metalness={1.0} roughness={0.0} emissive="#002244" />
        </mesh>
      </group>

      {/* Left Arm */}
      <group position={[-4.5, 12, 0]} rotation={[0, 0, 0.3]}>
        <mesh position={[0, -3.5, 0]}>
          <cylinderGeometry args={[1.2, 1.0, 7, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
      </group>
      
      {/* Right Arm (Articulated for Spike) */}
      <group position={[4.5, 12, 0]} rotation={[0, 0, -0.3]} ref={armRef}>
        <mesh position={[0, -3.5, 0]}>
          <cylinderGeometry args={[1.2, 1.0, 7, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[-1.8, 3, 0]}>
        <cylinderGeometry args={[1.6, 1.2, 6, 16]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[1.8, 3, 0]}>
        <cylinderGeometry args={[1.6, 1.2, 6, 16]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Jersey Number */}
      {number && (
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 10, 2.7]} fontSize={3} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#000">
          {number}
        </Text>
      )}
    </group>
  );
};

const FootballPlay = ({ position }) => {
  const qbRef = useRef();
  const wrRef = useRef();
  const wrArmRef = useRef();
  const cbRef = useRef();
  const sRef = useRef();
  const ballRef = useRef();
  
  const startWR = useMemo(() => new THREE.Vector3(100, 0, 0), []); 
  const startCB = useMemo(() => new THREE.Vector3(100, 0, 20), []); 
  const startS = useMemo(() => new THREE.Vector3(30, 0, 100), []); 
  const startQB = useMemo(() => new THREE.Vector3(0, 0, -20), []); 
  const catchPoint = useMemo(() => new THREE.Vector3(20, 0, 220), []); 

  const scratchV1 = useMemo(() => new THREE.Vector3(), []);
  const scratchV2 = useMemo(() => new THREE.Vector3(), []);
  const scratchV3 = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    // Animate the play
    // Animate the play
    const t = (state.clock.elapsedTime) % 6; // 6 second loop
    // Reset arm rotation
    if (wrArmRef.current) {
      wrArmRef.current.rotation.set(0, 0, -0.3);
    }

    if (t < 0.5) {
      if (wrRef.current) wrRef.current.position.copy(startWR);
      if (cbRef.current) cbRef.current.position.copy(startCB);
      if (sRef.current) sRef.current.position.copy(startS);
      if (qbRef.current) qbRef.current.position.copy(startQB);
      if (ballRef.current) ballRef.current.position.copy(startQB).add(scratchV1.set(4.5,12,2)); // in QB hand
    } else if (t < 4.0) {
      const playProgress = (t - 0.5) / 3.5;
      
      if (wrRef.current) {
        if (playProgress < 0.5) {
          wrRef.current.position.lerpVectors(startWR, scratchV1.set(100, 0, 110), playProgress * 2);
        } else {
          wrRef.current.position.lerpVectors(scratchV2.set(100, 0, 110), catchPoint, (playProgress - 0.5) * 2);
        }
      }
      
      if (cbRef.current && wrRef.current) {
        cbRef.current.position.lerpVectors(startCB, scratchV1.set(catchPoint.x + 8, 0, catchPoint.z - 8), playProgress);
      }
      
      if (sRef.current) {
        sRef.current.position.lerpVectors(startS, scratchV1.set(catchPoint.x - 8, 0, catchPoint.z + 8), playProgress);
      }
      
      if (ballRef.current) {
        if (t < 1.5) {
          ballRef.current.position.copy(startQB).add(scratchV1.set(4.5,12,2));
        } else {
          const passProgress = (t - 1.5) / 2.5;
          const arc = Math.sin(passProgress * Math.PI) * 45; 
          ballRef.current.position.lerpVectors(startQB, catchPoint, passProgress);
          ballRef.current.position.y += arc + 18; // +18 height for contested catch
        }
      }
    } else if (t < 5.0) {
      // Landing and running into endzone
      if (wrRef.current) {
        wrRef.current.position.lerpVectors(catchPoint, scratchV1.set(20, 0, 240), (t - 4.0));
      }
      if (ballRef.current && wrRef.current) {
        ballRef.current.position.copy(wrRef.current.position).add(scratchV1.set(0, 12, 3)); 
      }
      if (cbRef.current) cbRef.current.position.y = 0; 
      if (sRef.current) sRef.current.position.y = 0; 
    } else if (t < 5.5) {
      // Raise arm for spike
      if (wrArmRef.current) {
        wrArmRef.current.rotation.set(Math.PI, 0, 0); // arm straight up
      }
      if (ballRef.current && wrRef.current) {
        ballRef.current.position.copy(wrRef.current.position).add(scratchV1.set(4.5, 20, 0)); // ball high in hand
      }
    } else {
      // SPIKE!
      if (wrArmRef.current) {
        wrArmRef.current.rotation.set(-Math.PI / 4, 0, 0); // arm whipped down
      }
      if (ballRef.current && wrRef.current) {
        const bounceTime = t - 5.5;
        // fast hit floor, bounce up
        const bounceY = Math.abs(Math.cos(bounceTime * 8)) * 10;
        ballRef.current.position.copy(wrRef.current.position).add(scratchV1.set(4.5, bounceY, 4));
      }
    }
  });

  return (
    <group position={position}>
      {/* Field / Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 120]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial color="#001100" transparent opacity={0.6} />
      </mesh>
      <gridHelper args={[400, 20, '#00ff00', '#004400']} position={[0, 0.1, 120]} />
      
      {/* Endzone Marker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 220]}>
        <planeGeometry args={[400, 40]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
      </mesh>

      {/* Players */}
      <FootballPlayer color="#0088ff" number="QB" groupRef={qbRef} />
      <FootballPlayer color="#00ffff" number="80" groupRef={wrRef} armRef={wrArmRef} />
      <FootballPlayer color="#ff0044" number="CB" groupRef={cbRef} />
      <FootballPlayer color="#ff0044" number="S" groupRef={sRef} />

      {/* The Ball */}
      <mesh ref={ballRef}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={2} wireframe />
      </mesh>
    </group>
  );
};

const Scoreboard = () => {
  return (
    <group position={[0, 300, -300]} rotation={[0.1, 0, 0]}>
      {/* Main Center Screen */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[800, 300, 20]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 10.1]}>
        <planeGeometry args={[790, 290]} />
        <meshBasicMaterial color="#001100" />
      </mesh>
      
      {/* Left Angled Screen */}
      <mesh position={[-580, 0, 150]} rotation={[0, Math.PI / 6, 0]}>
        <boxGeometry args={[400, 300, 20]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-571, 0, 155]} rotation={[0, Math.PI / 6, 0]}>
        <planeGeometry args={[390, 290]} />
        <meshBasicMaterial color="#001100" />
      </mesh>

      {/* Right Angled Screen */}
      <mesh position={[580, 0, 150]} rotation={[0, -Math.PI / 6, 0]}>
        <boxGeometry args={[400, 300, 20]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[571, 0, 155]} rotation={[0, -Math.PI / 6, 0]}>
        <planeGeometry args={[390, 290]} />
        <meshBasicMaterial color="#001100" />
      </mesh>
      
      {/* Structural framing connecting the screens */}
      <mesh position={[-390, 150, 0]}>
        <boxGeometry args={[20, 20, 20]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[390, 150, 0]}>
        <boxGeometry args={[20, 20, 20]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.3} />
      </mesh>

      {/* Grid overlay for LED effect */}
      <gridHelper args={[800, 80, '#00ff00', '#004400']} position={[0, 0, 11]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Text on Main Screen */}
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 80, 15]} fontSize={70} color="#ffffff" outlineWidth={0.02} outlineColor="#00ff00" anchorX="center" anchorY="middle">FANTASY QUANT</Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 0, 15]} fontSize={35} color="#00ffff" outlineWidth={0.01} outlineColor="#0088ff" anchorX="center" anchorY="middle">PREDICTING: 42 YD PASS {'->'} TOUCHDOWN</Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -60, 15]} fontSize={22} color="#ffffff" maxWidth={750} textAlign="center" lineHeight={1.5} anchorX="center" anchorY="middle">"This is going to Rice, WR #80, post route contested catch in traffic over the safety and cornerback... TOUCHDOWN!!"</Text>

      {/* Stats on Side Screens */}
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[-580, 40, 165]} rotation={[0, Math.PI / 6, 0]} fontSize={32} color="#00ff00" anchorX="center" anchorY="middle">WIN PROB: 94%</Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[-580, -40, 165]} rotation={[0, Math.PI / 6, 0]} fontSize={32} color="#00ff00" anchorX="center" anchorY="middle">EXPECTED PTS: +6.0</Text>
      
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[580, 40, 165]} rotation={[0, -Math.PI / 6, 0]} fontSize={28} color="#00ff00" anchorX="center" anchorY="middle">DEF COVERAGE: COVER 2</Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[580, -40, 165]} rotation={[0, -Math.PI / 6, 0]} fontSize={28} color="#00ff00" anchorX="center" anchorY="middle">MISMATCH DETECTED</Text>
    </group>
  );
};



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
const WorldFantasyQuant = ({ position, rotation, visible }) => {
  const stadiumTex = useLoader(THREE.TextureLoader, '/fantasy_quant_stadium.jpg');
  stadiumTex.colorSpace = THREE.SRGBColorSpace;
  stadiumTex.wrapS = THREE.RepeatWrapping;
  stadiumTex.repeat.set(-1, 1);
  

  return (
    <group visible={visible} position={position} rotation={rotation}>
      {/* Dark stadium background */}
      <mesh>
        <sphereGeometry args={[3000, 32, 32]} />
        <meshBasicMaterial map={stadiumTex} side={THREE.BackSide} />
      </mesh>

      <StadiumCrowd />
      {/* The Play */}
      <FootballPlay position={[0, -200, 100]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} color="#00ff00" />
      <pointLight color="#00ff00" intensity={3} distance={2000} position={[0, 500, 500]} />
      <pointLight color="#0088ff" intensity={2} distance={2000} position={[0, 500, -500]} />

      {/* Massive Jumbotron */}
      <Scoreboard />
    </group>
  );
};

export default WorldFantasyQuant;
