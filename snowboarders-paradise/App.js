import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, Fog, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { fetchMountainWeather } from './services/weatherService';
import { TrackManager } from './components/TrackManager';
import { Physics } from '@react-three/cannon';
import { SkyShader } from './components/SkyShader';
import { Leaderboard } from './components/Leaderboard';
import { VideoStudio } from './components/VideoStudio';
import { GearQuiver } from './components/GearQuiver';
import { SafetyHUD } from './components/SafetyHUD';
import { Player } from './components/Player';
import { UnitProvider, useUnits } from './components/UnitContext';
import { SyncModal } from './components/SyncModal';

// Removed slow CPU SnowParticles

function SnowboardApp() {
  const [activeTab, setActiveTab] = useState('EXPLORE'); // EXPLORE, STUDIO
  const [weather, setWeather] = useState(null);
  const [activeRegion, setActiveRegion] = useState('ALASKA');
  const [syncState, setSyncState] = useState('IDLE'); // IDLE, SYNCED
  const [isSyncModalVisible, setIsSyncModalVisible] = useState(false);
  const [arMode, setArMode] = useState(false); // AR Mode Toggle
  const [studioMountainBg, setStudioMountainBg] = useState(false); // Studio BG toggle
  const [gameStarted, setGameStarted] = useState(false);
  
  // Camera & Gameplay settings
  const [showCameraSettings, setShowCameraSettings] = useState(false);
  const [goggleColor, setGoggleColor] = useState('#ff9900'); // Default Orange tint
  const [camDistance, setCamDistance] = useState(7);
  const [camHeight, setCamHeight] = useState(3);

  const { isMetric, setIsMetric, formatTemp, formatSnowfall } = useUnits();

  useEffect(() => {
    const loadWeather = async () => {
      const data = await fetchMountainWeather();
      if (data) setWeather(data);
    };
    loadWeather();
  }, []);

  // Determine if we should render the 3D Canvas
  // If we are in EXPLORE tab, always true.
  // If we are in STUDIO tab, only true if studioMountainBg is enabled.
  const show3DCanvas = activeTab === 'EXPLORE' || (activeTab === 'STUDIO' && studioMountainBg);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Conditionally Render 3D Cinematic Background */}
      {show3DCanvas && (
        <View style={styles.canvasContainer}>
          <Canvas camera={{ position: [0, 15, 40], fov: 60 }}>
            <Suspense fallback={null}>
              <fog attach="fog" args={['#0b1120', 20, 80]} />
              <ambientLight intensity={0.4} />
              <directionalLight position={[20, 40, -20]} intensity={1.5} castShadow />
              <directionalLight position={[-20, 10, 20]} intensity={0.3} color="#aaddff" />
              
              <SkyShader />
              
              <Physics gravity={[0, -9.81 * 3, 0]}>
                <TrackManager />
                <Player gameStarted={gameStarted} goggleColor={goggleColor} camDistance={camDistance} camHeight={camHeight} />
              </Physics>
              
              <Sparkles count={1500} scale={200} size={4} speed={0.8} opacity={0.4} color="#ffffff" />
              
              <EffectComposer>
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={2.5} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </View>
      )}

      {/* EXPLORE TAB UI */}
      {activeTab === 'EXPLORE' && (
        <>
          {/* Side Drawers */}
          <Leaderboard regionName="Global" />
          <GearQuiver />

          {/* Main Bottom UI Overlay */}
          {!gameStarted ? (
            <View style={styles.overlay}>
              <View style={styles.glassCard}>
                
                {/* Header row with Title and AR Toggle */}
              <View style={styles.cardHeaderRow}>
                <View>
                  <Image source={require('./assets/game_logo.jpg')} style={styles.gameLogo} resizeMode="contain" />
                  <Text style={styles.mountainName}>The Endless Run</Text>
                </View>
                <View style={{alignItems: 'flex-end', gap: 10}}>
                  <TouchableOpacity 
                    style={[styles.arToggleBtn, arMode && styles.arToggleBtnActive]} 
                    onPress={() => setArMode(!arMode)}
                  >
                    <Text style={[styles.arToggleText, arMode && styles.arToggleTextActive]}>
                      AR Mode {arMode ? 'ON' : 'OFF'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.arToggleBtn} 
                    onPress={() => setIsMetric(!isMetric)}
                  >
                    <Text style={styles.arToggleText}>
                      Units: {isMetric ? 'Metric' : 'US'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.arToggleBtn, showCameraSettings && styles.arToggleBtnActive]} 
                    onPress={() => setShowCameraSettings(!showCameraSettings)}
                  >
                    <Text style={[styles.arToggleText, showCameraSettings && styles.arToggleTextActive]}>
                      📷 Settings
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* CAMERA SETTINGS EXPANDABLE PANEL */}
              {showCameraSettings && (
                <View style={styles.cameraSettingsPanel}>
                  <Text style={styles.settingsLabel}>Goggle Tint (Press 'C' to use FPV):</Text>
                  <View style={styles.settingsRow}>
                    {['#ff9900', '#00d0ff', '#ff0055'].map((color) => (
                      <TouchableOpacity 
                        key={color} 
                        style={[styles.colorBubble, { backgroundColor: color }, goggleColor === color && styles.colorBubbleActive]}
                        onPress={() => setGoggleColor(color)}
                      />
                    ))}
                  </View>
                  
                  <Text style={styles.settingsLabel}>3rd Person Camera (Press 'C' to use Action):</Text>
                  <View style={styles.settingsRow}>
                    <TouchableOpacity style={[styles.camBtn, camDistance === 4 && styles.camBtnActive]} onPress={() => {setCamDistance(4); setCamHeight(2)}}>
                      <Text style={styles.camBtnText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.camBtn, camDistance === 7 && styles.camBtnActive]} onPress={() => {setCamDistance(7); setCamHeight(3)}}>
                      <Text style={styles.camBtnText}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.camBtn, camDistance === 12 && styles.camBtnActive]} onPress={() => {setCamDistance(12); setCamHeight(5)}}>
                      <Text style={styles.camBtnText}>Far</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              
              {weather ? (
                <View style={styles.weatherRow}>
                  <Text style={styles.subtitle}>Condition: {weather.condition}</Text>
                  <Text style={styles.stat}>Temp: {formatTemp(weather.temperature)} | Snowfall: {formatSnowfall(weather.snowfall)}</Text>
                </View>
              ) : (
                <Text style={styles.subtitle}>Fetching global weather...</Text>
              )}
              
              <SafetyHUD regionId={activeRegion} />
              
              <View style={styles.divider} />
              
              {/* Sync Button */}
              {syncState === 'IDLE' ? (
                <TouchableOpacity style={styles.syncBtn} onPress={() => setIsSyncModalVisible(true)}>
                  <Text style={styles.syncBtnText}>🔗 Sync Slopes Account</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.syncedContainer}>
                  <Text style={styles.syncedText}>✅ Connected: 14 Recent Runs Imported</Text>
                </View>
              )}
              {/* Start Run Button */}
              <TouchableOpacity 
                style={[styles.syncBtn, { backgroundColor: '#00d0ff', marginTop: 20, shadowColor: '#00d0ff', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 10 }]} 
                onPress={() => setGameStarted(true)}
              >
                <Text style={[styles.syncBtnText, { color: '#0b1120', fontSize: 20, letterSpacing: 2 }]}>DROP IN</Text>
              </TouchableOpacity>
            </View>
          </View>
          ) : (
            <View style={styles.gameOverlay}>
              <TouchableOpacity 
                style={styles.exitBtn} 
                onPress={() => setGameStarted(false)}
              >
                <Text style={styles.exitBtnText}>Pause / Exit</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <SyncModal 
            visible={isSyncModalVisible} 
            onClose={() => setIsSyncModalVisible(false)} 
            onSyncComplete={() => setSyncState('SYNCED')} 
          />
        </>
      )}

      {/* STUDIO TAB UI */}
      {activeTab === 'STUDIO' && (
        <VideoStudio 
          usingMountainBg={studioMountainBg}
          onToggleBackground={() => setStudioMountainBg(!studioMountainBg)}
        />
      )}

      {/* GLOBAL BOTTOM NAV BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navTab}
          onPress={() => setActiveTab('EXPLORE')}
        >
          <Text style={[styles.navTabText, activeTab === 'EXPLORE' && styles.navTabTextActive]}>
            🏔️ EXPLORE
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navTab}
          onPress={() => setActiveTab('STUDIO')}
        >
          <Text style={[styles.navTabText, activeTab === 'STUDIO' && styles.navTabTextActive]}>
            🎬 STUDIO
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default function App() {
  return (
    <UnitProvider>
      <SnowboardApp />
    </UnitProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1120' },
  canvasContainer: { ...StyleSheet.absoluteFillObject },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  regionSelector: {
    position: 'absolute',
    top: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    zIndex: 10,
  },
  regionBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  regionBtnActive: { backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#fff' },
  regionBtnText: { color: 'rgba(255,255,255,0.6)', fontWeight: 'bold' },
  regionBtnTextActive: { color: '#fff' },
  glassCard: {
    backgroundColor: 'rgba(10, 15, 25, 0.4)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 32,
    padding: 28,
    width: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  weatherRow: {
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  arToggleBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  arToggleBtnActive: {
    backgroundColor: '#00d0ff',
    borderColor: '#00d0ff',
  },
  arToggleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  arToggleTextActive: {
    color: '#0b1120',
  },
  gameLogo: { width: 260, height: 90, marginBottom: 10, borderRadius: 12, opacity: 0.95 },
  title: { fontSize: 22, fontWeight: '900', color: '#fff', letterSpacing: 2, marginBottom: 4 },
  mountainName: { fontSize: 14, fontWeight: '800', color: '#00d0ff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 3 },
  subtitle: { fontSize: 14, color: '#aaddff', marginBottom: 4, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  stat: { fontSize: 13, color: '#fff', marginBottom: 0, opacity: 0.8 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', width: '100%', marginBottom: 20 },
  syncBtn: {
    backgroundColor: '#FC4C02', 
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  syncBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  syncingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'center',
  },
  syncingText: {
    color: '#fff',
    fontStyle: 'italic',
  },
  syncedContainer: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 0, 0.5)',
    alignItems: 'center',
  },
  syncedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cameraSettingsPanel: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  settingsLabel: {
    color: '#aaddff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 5,
  },
  settingsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  colorBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorBubbleActive: {
    borderColor: '#fff',
  },
  camBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  camBtnActive: {
    backgroundColor: '#00d0ff',
  },
  camBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  exitBtn: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  exitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gameOverlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#0a0a0c',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1a1a24',
    paddingBottom: 20, // For iPhone home indicator
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  navTabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  navTabTextActive: {
    color: '#00d0ff',
  }
});
