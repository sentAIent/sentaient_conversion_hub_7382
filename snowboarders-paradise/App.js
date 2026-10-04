import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Sky, Environment, OrbitControls, KeyboardControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { Terrain } from './components/Terrain';
import { Player } from './components/Player';

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
        ]}
      >
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
          <color attach="background" args={['#87CEEB']} />
          <fog attach="fog" args={['#87CEEB', 10, 200]} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 20, -10]} intensity={1} castShadow />
          <Sky sunPosition={[10, 20, -10]} />
          
          <Suspense fallback={null}>
            <Physics gravity={[0, -20, 0]}>
              <Terrain />
              <Player />
            </Physics>
          </Suspense>
          
          <EffectComposer>
            <Bloom intensity={0.15} luminanceThreshold={0.9} />
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
