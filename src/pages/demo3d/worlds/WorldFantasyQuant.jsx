import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import DataVisualizer3D from './DataVisualizer3D';

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


const WorldFantasyQuant = ({ position, rotation, visible }) => {
  const stadiumTex = useLoader(THREE.TextureLoader, '/fantasy_quant_stadium.jpg');
  stadiumTex.colorSpace = THREE.SRGBColorSpace;
  stadiumTex.wrapS = THREE.RepeatWrapping;
  stadiumTex.repeat.set(-1, 1); // Flip horizontally so it renders correctly on BackSide

  return (
    <group visible={visible} position={position} rotation={rotation}>
      {/* Photorealistic Stadium Background */}
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[2500, 64, 64]} />
        <meshBasicMaterial map={stadiumTex} side={THREE.BackSide} />
      </mesh>

      {/* The Play - Rotated -90 degrees so the camera sees it from the sidelines (left-to-right pass). Centered so it's directly in front of the camera. */}
      <FootballPlay position={[0, -125, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} color="#00ffaa" />
      <pointLight color="#00ffff" intensity={3} distance={2000} position={[0, 500, 500]} />
      <pointLight color="#ff00aa" intensity={2} distance={2000} position={[0, 500, -500]} />

    </group>
  );
};

export default WorldFantasyQuant;
