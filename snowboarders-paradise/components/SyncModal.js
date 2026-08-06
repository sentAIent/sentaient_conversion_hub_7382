import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator, Platform } from 'react-native';

export function SyncModal({ visible, onClose, onSyncComplete }) {
  const [activeMethod, setActiveMethod] = useState(null); // 'STRAVA', 'HEALTH', 'GPX'
  const [syncStatus, setSyncStatus] = useState('IDLE'); // 'IDLE', 'SYNCING', 'SUCCESS', 'ERROR'

  const handleSync = (method) => {
    setActiveMethod(method);
    setSyncStatus('SYNCING');
    
    if (method === 'GPX' && Platform.OS === 'web') {
      // Simulate file picker on web
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.gpx';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setTimeout(() => {
            setSyncStatus('SUCCESS');
            setTimeout(() => {
              onSyncComplete();
              onClose();
              setSyncStatus('IDLE');
              setActiveMethod(null);
            }, 1500);
          }, 1500); // Simulate parsing time
        } else {
          setSyncStatus('IDLE');
          setActiveMethod(null);
        }
      };
      input.oncancel = () => {
        setSyncStatus('IDLE');
        setActiveMethod(null);
      };
      input.click();
      return;
    }

    // Simulate network delay for Strava / HealthKit
    setTimeout(() => {
      setSyncStatus('SUCCESS');
      setTimeout(() => {
        onSyncComplete();
        onClose();
        setSyncStatus('IDLE');
        setActiveMethod(null);
      }, 1500);
    }, 2500);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.glassContainer}>
          
          <View style={styles.header}>
            <Text style={styles.title}>SYNC YOUR RUNS</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Import your snowboard data from Slopes. Choose a platform to sync your vertical drops, top speeds, and routes.
          </Text>

          {syncStatus === 'SYNCING' && activeMethod !== 'GPX' ? (
            <View style={styles.loadingState}>
              <ActivityIndicator size="large" color="#00d0ff" />
              <Text style={styles.loadingText}>Connecting to {activeMethod === 'STRAVA' ? 'Strava' : 'Apple Health'}...</Text>
            </View>
          ) : syncStatus === 'SUCCESS' ? (
            <View style={styles.successState}>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successText}>Sync Complete! Imported 14 new runs.</Text>
            </View>
          ) : (
            <View style={styles.optionsContainer}>
              
              <TouchableOpacity 
                style={[styles.optionCard, styles.stravaCard]} 
                onPress={() => handleSync('STRAVA')}
                disabled={syncStatus === 'SYNCING'}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Connect Strava</Text>
                  <Text style={styles.optionDesc}>Automatically sync runs posted to Strava via Slopes.</Text>
                </View>
                <Text style={styles.optionArrow}>→</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.optionCard, styles.healthCard]} 
                onPress={() => handleSync('HEALTH')}
                disabled={syncStatus === 'SYNCING'}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Apple Health / Health Connect</Text>
                  <Text style={styles.optionDesc}>Securely sync on-device fitness data.</Text>
                </View>
                <Text style={styles.optionArrow}>→</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.optionCard, styles.gpxCard]} 
                onPress={() => handleSync('GPX')}
                disabled={syncStatus === 'SYNCING'}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Upload GPX File</Text>
                  <Text style={styles.optionDesc}>Manually import an exported run from the Slopes app.</Text>
                </View>
                <Text style={styles.optionArrow}>→</Text>
              </TouchableOpacity>

            </View>
          )}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassContainer: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: 'rgba(11, 17, 32, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 25,
    padding: 30,
    // Web glassmorphism
    ...Platform.select({
      web: { backdropFilter: 'blur(20px)' }
    })
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 15,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
  },
  stravaCard: {
    backgroundColor: 'rgba(252, 76, 2, 0.1)', // Strava orange tint
    borderColor: 'rgba(252, 76, 2, 0.5)',
  },
  healthCard: {
    backgroundColor: 'rgba(255, 45, 85, 0.1)', // Apple health pink tint
    borderColor: 'rgba(255, 45, 85, 0.5)',
  },
  gpxCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionContent: {
    flex: 1,
    paddingRight: 20,
  },
  optionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionDesc: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
  },
  optionArrow: {
    color: '#fff',
    fontSize: 24,
    opacity: 0.5,
  },
  loadingState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    color: '#00d0ff',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  successState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  successIcon: {
    fontSize: 60,
    color: '#00ff88',
    marginBottom: 20,
  },
  successText: {
    color: '#00ff88',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
