const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const newCanvas = `
          <Canvas ref={canvasRef} shadows={isHigh} dpr={isHigh ? [1, 2] : 1} camera={{ position: [0, 15, 40], fov: 50 }} gl={{ preserveDrawingBuffer: true }}>
            <Suspense fallback={null}>
              <color attach="background" args={['#d0e3ff']} />
              <fogExp2 attach="fog" args={['#d0e3ff', 0.002]} />
              
              {/* Golden Hour Lighting */}
              <ambientLight intensity={0.2} color="#88aaff" />
              <directionalLight 
                position={[100, 20, -100]} 
                intensity={3.0} 
                color="#ffccaa"
                castShadow={isHigh} 
                shadow-mapSize={isHigh ? [2048, 2048] : [1024, 1024]} 
                shadow-camera-left={-100}
                shadow-camera-right={100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
                shadow-camera-near={0.1}
                shadow-camera-far={500}
              />
              
              <TrackManager gameStarted={gameStarted} />
              <Player gameStarted={gameStarted} saveHighlight={saveHighlight} goggleColor={goggleColor} camDistance={camDistance} camHeight={camHeight} />
              
              {isHigh && (
                <EffectComposer>
                  <Bloom luminanceThreshold={1.0} intensity={0.8} />
                  <Vignette offset={0.3} darkness={0.8} />
                </EffectComposer>
              )}
            </Suspense>
          </Canvas>
`;

code = code.replace(/<Canvas.*?<\/Canvas>/s, newCanvas.trim());
if (!code.includes('EffectComposer')) {
   code = "import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';\n" + code;
}
fs.writeFileSync('App.js', code);
console.log("Patched App.js");
