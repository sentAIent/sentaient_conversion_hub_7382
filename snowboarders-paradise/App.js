import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, LogBox } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Sky, Environment, OrbitControls, KeyboardControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense } from 'react';

// Suppress known upstream Three.js deprecation warnings caused by newer Three.js versions and older R3F
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string') {
    if (args[0].includes('THREE.Clock') || 
        args[0].includes('THREE.WebGLShadowMap') || 
        args[0].includes('deprecated parameters')) {
      return;
    }
  }
  originalWarn(...args);
};
import { Terrain } from './components/Terrain';
import { Player } from './components/Player';
import { NPCs } from './components/NPCs';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
          { name: "melee", keys: ["m", "M"] },
          { name: "throwProjectile", keys: ["t", "T"] },
        ]}
      >
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
          <color attach="background" args={['#aaccff']} />
          <fog attach="fog" args={['#aaccff', 50, 600]} />
          <ambientLight intensity={0.4} color="#b3d4ff" />
          <directionalLight position={[20, 30, -20]} intensity={1.8} color="#fffcf5" castShadow />
          <Sky sunPosition={[20, 30, -20]} turbidity={0.5} rayleigh={0.5} />
          
          <Suspense fallback={null}>
            <Physics gravity={[0, -20, 0]}>
              <Terrain />
              <Player />
              <NPCs />
            </Physics>
          </Suspense>
          
          <EffectComposer>
            <Bloom intensity={0.5} luminanceThreshold={1.2} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </KeyboardControls>
      <View style={styles.uiOverlay}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  uiOverlay: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }
});
