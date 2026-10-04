import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Button, StyleSheet } from 'react-native';
import { LocalLLM } from './src/services/LocalLLM';
import { SyncService } from './src/services/SyncService';

// The IP of your Home Server on the Tailscale Network (100.x.y.z)
const TAILSCALE_HOME_IP = '100.101.102.103'; 

export default function App() {
  const [status, setStatus] = useState('Initializing...');
  const [network, setNetwork] = useState('OFFLINE');

  useEffect(() => {
    async function setup() {
      await LocalLLM.init();
      setStatus('Sphinx Mobile Ready');
      // In production, we would use NetInfo to track true connectivity
      setNetwork('TAILSCALE_LINK_ACTIVE');
    }
    setup();
  }, []);

  const simulateOfflineThreat = async () => {
    setNetwork('OFFLINE (LOCAL AI)');
    const assessment = await LocalLLM.evaluateThreat("Suspicious person detected near vehicle.");
    
    // Cache the event offline since we have no network
    await SyncService.logOfflineEvent('Phone Camera', { threat: "Suspicious person" }, assessment);
    setStatus(`Latest Assessment: ${assessment}`);
  };

  const attemptHomeSync = async () => {
    setStatus('Attempting Tailscale Sync...');
    await SyncService.syncWithHomeBase(TAILSCALE_HOME_IP);
    setNetwork('TAILSCALE_LINK_ACTIVE');
    setStatus('Sphinx Mobile Ready');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hud}>
        <Text style={styles.title}>SPHINX: MOBILE EDGE</Text>
        <Text style={styles.network}>LINK STATUS: {network}</Text>
        <Text style={styles.status}>{status}</Text>
        
        <View style={styles.controls}>
          <Button title="Simulate Offline Threat" color="#ff0000" onPress={simulateOfflineThreat} />
          <Button title="Sync to Home Base" color="#00ff00" onPress={attemptHomeSync} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 20 },
  hud: { backgroundColor: 'rgba(0, 50, 50, 0.5)', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#00ffff' },
  title: { color: '#00ffff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  network: { color: '#ffcc00', fontSize: 16, textAlign: 'center', marginBottom: 10 },
  status: { color: '#fff', fontSize: 14, textAlign: 'center', marginVertical: 20 },
  controls: { marginTop: 20, gap: 10 }
});
