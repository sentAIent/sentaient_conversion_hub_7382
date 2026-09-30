import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Cloud } from '@react-three/drei';

export default function StreetViewSimulation({ location, speed = 'slow', visualMode = 'video', videoId }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, [location, visualMode, videoId]);

  // YouTube Video Background
  if (visualMode === 'video') {
    return (
      <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-white/70 tracking-widest uppercase text-sm">Buffering Environment...</p>
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-screen bg-blue-900/20 z-0"></div>
        {videoId ? (
          <iframe
            className="w-[120vw] h-[120vh] max-w-none max-h-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Environment Video"
            style={{ filter: 'brightness(0.8) contrast(1.1)' }}
          />
        ) : (
          <div className="text-white/50">No video available for this scene</div>
        )}
      </div>
    );
  }

  // Manim Python Video Background
  if (visualMode === 'manim') {
    // If no specific video URL is provided by the backend, fallback to an abstract geometric placeholder
    // so the app remains perfectly functional before the user runs `setup-manim.sh`.
    const fallbackUrl = "https://cdn.pixabay.com/video/2020/05/25/40141-424844358_large.mp4";
    const srcUrl = videoId && videoId.includes('http') ? videoId : fallbackUrl;
    
    return (
      <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-white/70 tracking-widest uppercase text-sm">Compiling Manim Geometry...</p>
          </div>
        )}
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
          src={srcUrl}
          style={{ filter: 'contrast(1.2) brightness(0.9)' }}
        />
      </div>
    );
  }

  // WebGL 3D Background
  return (
    <div className="w-full h-full bg-[#050505] relative">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-white/70 tracking-widest uppercase text-sm">Generating 3D Environment...</p>
        </div>
      )}
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <fog attach="fog" args={['#050505', 10, 40]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#fa9c7a" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={speed === 'fast' ? 2 : 0.5} />
        
        {/* Simple procedural environment */}
        <group position={[0, -2, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#111" wireframe={location.toLowerCase().includes('cyber')} />
          </mesh>
          
          {/* Moving abstract shapes to simulate motion */}
          <MovingScenery speed={speed} />
        </group>

        <OrbitControls autoRotate autoRotateSpeed={speed === 'fast' ? 4 : 1} enableZoom={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}

// Helper component for 3D motion
function MovingScenery({ speed }) {
  const isFast = speed === 'fast';
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[(Math.random() - 0.5) * 40, Math.random() * 5, (Math.random() - 0.5) * 40]}
        >
          <boxGeometry args={[1, Math.random() * 4 + 1, 1]} />
          <meshStandardMaterial color={isFast ? "#60A9FF" : "#2b4162"} opacity={0.8} transparent />
        </mesh>
      ))}
    </>
  );
}
