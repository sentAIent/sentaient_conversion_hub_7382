import { useGameAudio } from "./components/AudioManager";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, Fog, Sparkles, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField, Noise, Vignette, ChromaticAberration, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { fetchMountainWeather } from './services/weatherService';
import { TrackManager } from './components/TrackManager';
import { NPCs } from './components/NPCs';
import { Leaderboard } from './components/Leaderboard';
import { VideoStudio } from './components/VideoStudio';
import { GearQuiver } from './components/GearQuiver';
import { SafetyHUD } from './components/SafetyHUD';
import { Player } from './components/Player';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UnitProvider, useUnits } from './components/UnitContext';
import { SyncModal } from './components/SyncModal';
import { ComplianceGate } from './components/ComplianceGate';
import { Store } from './components/Store';
import { MapModal } from './components/MapModal';
import { QualityProvider, useQuality } from './components/QualityContext';
import { CustomizationProvider, useCustomization } from './components/CustomizationContext';
import { SettingsModal } from './components/SettingsModal';
import { GraphicsTierProvider, useGraphicsTier } from './components/GraphicsTierManager';
import { GhostRiders } from './components/GhostRiders';
import { SolventCoaching } from './components/SolventCoaching';
import { CustomizationStudio } from './components/CustomizationStudio';
import { useClipManager } from './components/ClipManager';
import { FilmVault } from './components/FilmVault';

// Removed slow CPU SnowParticles

if (typeof window !== 'undefined') {
  window.mobileControls = { 
    left: false, right: false, brake: false, skate: false, 
    jump: false, melee: false, throw: false, grab: false, toggleCombat: false 
  };
}

function MobileTouchControls() {
  const setControl = (key, value) => {
    if (window.mobileControls) window.mobileControls[key] = value;
  };

  return (
    
      {/* Left side: D-Pad / Steering */}
      
        <TouchableOpacity 
          style={styles.controlBtn}
          onPressIn={() => setControl('left', true)}
          onPressOut={() => setControl('left', false)}
        >◀
        
        
          <TouchableOpacity 
            style={[styles.controlBtn, { backgroundColor: 'rgba(255,0,0,0.3)' }]}
            onPressIn={() => setControl('brake', true)}
            onPressOut={() => setControl('brake', false)}
          >BRAKE
        

        <TouchableOpacity 
          style={styles.controlBtn}
          onPressIn={() => setControl('right', true)}
          onPressOut={() => setControl('right', false)}
        >▶
      

      {/* Right side: Actions */}
      
        <TouchableOpacity 
          style={[styles.actionBtn, { backgroundColor: 'rgba(0, 208, 255, 0.4)' }]}
          onPressIn={() => setControl('jump', true)}
          onPressOut={() => setControl('jump', false)}
        >JUMP / SPIN
        
        
          <TouchableOpacity 
            style={[styles.actionBtn, { backgroundColor: 'rgba(255, 0, 119, 0.4)' }]}
            onPressIn={() => setControl('melee', true)}
            onPressOut={() => setControl('melee', false)}
          >ATTACK
          
          <TouchableOpacity 
            style={[styles.actionBtn, { backgroundColor: 'rgba(255, 153, 0, 0.4)' }]}
            onPressIn={() => setControl('grab', true)}
            onPressOut={() => setControl('grab', false)}
          >TRICK
        
      
    
  );
}

function SnowboardApp() {
  const graphicsTier = useGraphicsTier();
  const isHigh = graphicsTier === "high";
  const [activeTab, setActiveTab] = useState('EXPLORE'); // EXPLORE, STUDIO
  const [weather, setWeather] = useState(null);
  const [activeRegion, setActiveRegion] = useState('ALASKA');
  const [syncState, setSyncState] = useState('IDLE'); // IDLE, SYNCED
  const [isSyncModalVisible, setIsSyncModalVisible] = useState(false);
  const [arMode, setArMode] = useState(false); // AR Mode Toggle
  const [studioMountainBg, setStudioMountainBg] = useState(false); // Studio BG toggle
  const [gameStarted, setGameStarted] = useState(false);
  useGameAudio({ speed: gameStarted ? 30 : 0, isAirborne: false, isCarving: false }, gameStarted);

  const [showStore, setShowStore] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showQuiver, setShowQuiver] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [showSolventCoaching, setShowSolventCoaching] = useState(false);
  const [showFilmVault, setShowFilmVault] = useState(false);
  
  const canvasRef = useRef(null);
  const { exportedClips, saveHighlight, isRecording } = useClipManager(canvasRef);
  const [recordingSettings, setRecordingSettings] = useState({
    autoRecordTricks: true,
    autoRecordWipeouts: true,
    quality: '1080p'
  });
  
  // Camera & Gameplay settings
  const [showCameraSettings, setShowCameraSettings] = useState(false);
  const [goggleColor, setGoggleColor] = useState('#ff9900'); // Default Orange tint
  const [camDistance, setCamDistance] = useState(4);
  const [camHeight, setCamHeight] = useState(2);

  const { isMetric, setIsMetric, formatTemp, formatSnowfall } = useUnits();
  const qualitySettings = useQuality();
  const { equipGear } = useCustomization();

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
    
      
      {/* Conditionally Render 3D Cinematic Background */}
      {show3DCanvas && (
        
          
            
              
              
              
              
              
                      
              
              
              
              {/* Golden Hour Sunlight */}
              <directionalLight 
                position={[0, 100, -200]} 
                intensity={isHigh ? 1.8 : 1.2} 
                color="#ffdbb5" 
                castShadow={isHigh}
                shadow-mapSize={isHigh ? [4096, 4096] : [1024, 1024]}
                shadow-camera-left={-150}
                shadow-camera-right={150}
                shadow-camera-top={150}
                shadow-camera-bottom={-150}
                shadow-camera-far={500}
                shadow-bias={-0.0005}
              />
              
              
              
              
              
              
              
              {qualitySettings.particles > 0 && (
                
              )}
              
              
            
        
          {/* Cinematic Post-Processing */}
          
          
          
        

          
        
      )}

      
      {/* GLOBAL TOP HEADER BAR */}
      {!gameStarted && (
        
          
          
             setActiveTab('EXPLORE')}>EXPLORE
             setShowMap(true)}>MAP
             setShowSessions(true)}>GLOBAL SESSIONS
             setShowQuiver(true)}>QUIVER
             setShowStore(true)}>STORE
             setActiveTab('STUDIO')}>STUDIO
             setShowCustomization(true)}>GEAR
             setShowFilmVault(true)}>VAULT
             setShowSolventCoaching(true)}>COACH
             setShowSettings(true)}>SETTINGS
          
        
      )}

      {/* Weather and Avalanche in Top Right */}
      {!gameStarted && activeTab === 'EXPLORE' && (
        

              {weather ? (
                
                  Condition: {weather.condition}
                  Temp: {formatTemp(weather.temperature)} | Snowfall: {formatSnowfall(weather.snowfall)}
                
              ) : (
                Fetching global weather...
              )}
              
              

        
      )}

      {/* EXPLORE TAB UI */}
      {activeTab === 'EXPLORE' && (
        
          {/* Side Drawers */}
          

          {/* Main Bottom UI Overlay */}
          {!gameStarted ? (
            
                
                
                
              
              {/* CAMERA SETTINGS EXPANDABLE PANEL */}
              {showCameraSettings && (
                
                  Goggle Tint (Press 'C' to use FPV):
                  
                    {['#ff9900', '#00d0ff', '#ff0055'].map((color) => (
                      <TouchableOpacity 
                        key={color} 
                        style={[styles.colorBubble, { backgroundColor: color }, goggleColor === color && styles.colorBubbleActive]}
                        onPress={() => setGoggleColor(color)}
                      />
                    ))}
                  
                  
                  3rd Person Camera (Press 'C' to use Action):
                  
                     {setCamDistance(4); setCamHeight(2)}}>
                      Close
                    
                     {setCamDistance(7); setCamHeight(3)}}>
                      Normal
                    
                     {setCamDistance(12); setCamHeight(5)}}>
                      Far
                    
                  
                
              )}
                            
              
              
              {/* Start Run Button */}
              <TouchableOpacity 
                style={[styles.syncBtn, { backgroundColor: '#00d0ff', marginTop: 20, boxShadow: '0px 4px 10px rgba(0, 208, 255, 0.5)' }]} 
                onPress={() => setGameStarted(true)}
              >
                DROP IN
              
            
          
          ) : (
            
              
              <TouchableOpacity 
                style={styles.exitBtn} 
                onPress={() => setGameStarted(false)}
              >
                Pause / Exit
              
            
          )}
          
          <SyncModal 
            visible={isSyncModalVisible} 
            onClose={() => setIsSyncModalVisible(false)} 
            onSyncComplete={() => setSyncState('SYNCED')} 
          />
        
      )}

      {/* STUDIO TAB UI */}
      {activeTab === 'STUDIO' && (
        <VideoStudio 
          usingMountainBg={studioMountainBg}
          onToggleBackground={() => setStudioMountainBg(!studioMountainBg)}
        />
      )}

      {/* STORE & SETTINGS UI */}
      {showCustomization &&  setShowCustomization(false)} />}
      {showFilmVault &&  setShowFilmVault(false)} onDelete={(id) => {}} />}
      {showSolventCoaching && (
        <SolventCoaching 
          telemetry={{ score: 1200, crashes: 5, maxCombo: 3, grabs: 12, distance_m: 450 }} 
          onClose={() => setShowSolventCoaching(false)} 
        />
      )}
      {showSessions &&  setShowSessions(false)} />}
      {showQuiver &&  setShowQuiver(false)} />}
      {showStore &&  setShowStore(false)} />}
      {showMap &&  setShowMap(false)} />}

      {/* AR Toggle HUD Element */}
      {activeTab === 'EXPLORE' && (
        
          <TouchableOpacity 
            style={[styles.arToggleBtn, arMode && styles.arToggleBtnActive]} 
            onPress={() => setArMode(!arMode)}
          >
            👁️ AR MAP {arMode ? 'ON' : 'OFF'}
          
        
      )}
  
      {showSettings &&  setShowSettings(false)} settings={recordingSettings} onUpdate={setRecordingSettings} />}

      
    
  );
}


export default function App() {
  return (
    
      
      
        
          
            
          
        
      
    
    
  );
}

const styles = StyleSheet.create({
  topHeaderBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerLogo: {
    width: 140,
    height: 40,
  },
  headerNav: {
    flexDirection: 'row',
    gap: 15,
  },
  topRightInfo: {
    position: 'absolute',
    top: 90,
    right: 20,
    alignItems: 'flex-end',
    zIndex: 90,
    gap: 10,
  },
  weatherBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  weatherText: {
    color: '#00ffff',
    fontFamily: 'Courier',
    fontSize: 12,
    fontWeight: 'bold',
  },
  centerOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 50,
  },
  glassCardClean: {
    backgroundColor: 'rgba(10, 15, 30, 0.7)',
    borderRadius: 16,
    padding: 20,
    width: 300,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 208, 255, 0.3)',
  },

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
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  regionBtnActive: { backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#fff' },
  regionBtnText: { color: 'rgba(255,255,255,0.6)', fontWeight: 'bold' },
  regionBtnTextActive: { color: '#fff' },
  glassCard: {
    backgroundColor: 'rgba(0, 0, 0, 0)', /* removed frosted glass */
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 32,
    padding: 28,
    width: '92%',
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0)',
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
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  arToggleBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  arToggleBtnActive: {
    backgroundColor: '#00ffff',
    borderColor: '#00ffff',
    boxShadow: '0px 0px 20px rgba(0, 255, 255, 1)',
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
    borderWidth: 0,
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
    borderWidth: 0,
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
  },
  mobileControlsContainer: {
    position: 'absolute',
    bottom: 120, // Moved up to avoid iOS home indicator and browser toolbars
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dpad: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dpadCenter: {
    marginHorizontal: 10,
  },
  controlBtn: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  controlText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 10,
  },
  actionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  }
});
