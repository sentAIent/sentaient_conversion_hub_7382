import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

const JudgeLogo = ({ position }) => {
  const meshRef = useRef();
  const [logoTex, setLogoTex] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load('/legal_eagle_logo.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setLogoTex(tex);
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Very slow, authoritative hovering
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 1.5;
    }
  });

  if (!logoTex) return null;

  return (
    <group position={position}>
      {/* The Logo */}
      <mesh ref={meshRef}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial map={logoTex} transparent={true} opacity={1} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#ffffff" intensity={2} distance={100} position={[0, 0, 20]} />
    </group>
  );
};

const CourtroomBackground = () => {
  const [bgTex, setBgTex] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load('/legal_eagle_courtroom_bg.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setBgTex(tex);
    });
  }, []);

  if (!bgTex) return null;

  return (
    <mesh position={[0, 0, -600]}>
      <planeGeometry args={[1600, 900]} />
      <meshBasicMaterial map={bgTex} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
};

const HolographicFeatureText = ({ position, text, color }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 2.0;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]}
        fontSize={12}
        color={color}
        maxWidth={120}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </Text>
      <pointLight color={color} intensity={1} distance={100} />
    </group>
  );
};

const HighSpeedDocumentStream = () => {
  const documentCount = 50;
  const docRefs = useRef([]);
  const canvasRef = useRef(document.createElement('canvas'));
  
  // Create a highly detailed holographic blueprint texture
  const docTex = useMemo(() => {
    canvasRef.current.width = 512;
    canvasRef.current.height = 1024;
    const ctx = canvasRef.current.getContext('2d');
    
    // Deep blue background
    ctx.fillStyle = '#010a15';
    ctx.fillRect(0, 0, 512, 1024);
    
    // Grid
    ctx.strokeStyle = '#004488';
    ctx.lineWidth = 2;
    for(let i=0; i<1024; i+=32) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
      if(i<512) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke(); }
    }
    
    // Headers and redacted text blocks
    ctx.fillStyle = '#0088ff';
    ctx.fillRect(40, 40, 432, 60); // Header
    
    ctx.fillStyle = '#00ffff';
    ctx.font = '24px monospace';
    ctx.fillText("CLASSIFIED // AI REVIEW", 60, 78);
    
    ctx.fillStyle = '#003366';
    for(let i=0; i<30; i++) {
        let y = 140 + i * 28;
        ctx.fillRect(40, y, 432 - (Math.random() * 200), 12);
    }
    
    // Red seal
    ctx.strokeStyle = '#ff0033';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(400, 850, 60, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(400, 850, 50, 0, Math.PI*2); ctx.stroke();
    
    const tex = new THREE.CanvasTexture(canvasRef.current);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const documentData = useMemo(() => {
    return Array.from({ length: documentCount }).map((_, i) => ({
      delay: i * 0.08, 
      state: 'waiting', 
      x: 3000,
      y: (Math.random() - 0.5) * 150 - 50,
      z: -400 + (Math.random() * 200)
    }));
  }, [documentCount]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    documentData.forEach((doc, i) => {
      const ref = docRefs.current[i];
      if (!ref) return;

      if (time > doc.delay) {
        if (doc.state === 'waiting') doc.state = 'approaching';
        
        if (doc.state === 'approaching') {
          doc.x -= 8000 * delta; // move incredibly fast
          if (doc.x <= 0) {
            doc.x = 0;
            doc.state = 'scanning';
            doc.scanTimer = time;
          }
        }
        
        if (doc.state === 'scanning') {
          if (time - doc.scanTimer > 0.05) { // ultra-fast 50ms scan
            doc.state = 'approved';
          }
        }
        
        if (doc.state === 'approved') {
          doc.x -= 8000 * delta; // zip away
          if (doc.x < -3000) {
            // Reset for continuous loop
            doc.x = 3000 + (Math.random() * 500);
            doc.state = 'approaching';
            doc.y = (Math.random() - 0.5) * 150 - 50;
          }
        }
      }

      ref.position.set(doc.x, doc.y, doc.z);
      
      // Dynamic rotation snapping
      if (doc.state === 'scanning') {
        ref.rotation.set(0, 0, 0); // Face judge directly
        ref.scale.setScalar(1.2); // slight pop
      } else if (doc.state === 'approved') {
        ref.rotation.set(0, 0.4, 0);
        ref.scale.setScalar(1.0);
      } else {
        ref.rotation.set(0, -0.4, 0);
        ref.scale.setScalar(1.0);
      }
      
      // Color tint based on state
      if (doc.state === 'scanning') {
        ref.color.set('#ffffff'); // flash bright white
      } else if (doc.state === 'approved') {
        ref.color.set('#00ff66'); // green
      } else {
        ref.color.set('#0088ff'); // deep blue approach
      }
    });
  });

  return (
    <Instances limit={documentCount} range={documentCount}>
      <planeGeometry args={[100, 200]} />
      <meshBasicMaterial map={docTex} side={THREE.DoubleSide} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      {documentData.map((data, i) => (
        <Instance key={i} ref={(el) => (docRefs.current[i] = el)} position={[data.x, data.y, data.z]} />
      ))}
    </Instances>
  );
};


const WorldLegalEagle = ({ position, rotation, visible }) => {
  return (
    <group position={position} rotation={rotation} visible={visible}>
      <ambientLight intensity={0.2} />
      
      {/* Breathtaking AI Generated Background */}
      <CourtroomBackground />
      <HighSpeedDocumentStream />

      {/* The Judge Logo floating gracefully in the center */}
      <JudgeLogo position={[0, 20, -200]} />

      {/* App Feature Holograms */}
      <HolographicFeatureText position={[-140, -20, -100]} text="AI Contract\nCreation" color="#00ffcc" />
      <HolographicFeatureText position={[140, -20, -100]} text="Intelligent\nContract Review" color="#ff00ff" />
      <HolographicFeatureText position={[0, -50, -50]} text="Real-Time\nEdits & Formatting" color="#d4af37" />
    </group>
  );
};

export default WorldLegalEagle;
