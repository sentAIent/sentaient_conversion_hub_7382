import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';

export function VideoStudio({ onToggleBackground, usingMountainBg }) {
  const [editorState, setEditorState] = useState('RAW'); // RAW, ANALYZING, TIMELINE
  const [progress, setProgress] = useState(0);

  const startAutoEdit = () => {
    setEditorState('ANALYZING');
    setProgress(0);
    
    // Simulate AI processing progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setEditorState('TIMELINE'), 500);
      }
    }, 100);
  };

  return (
    <View style={[styles.container, usingMountainBg ? styles.containerTransparent : styles.containerDark]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI STUDIO</Text>
        <TouchableOpacity style={styles.bgToggle} onPress={onToggleBackground}>
          <Text style={styles.bgToggleText}>
            BG: {usingMountainBg ? 'Mountain' : 'Dark Premium'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* RAW CLIPS STATE */}
      {editorState === 'RAW' && (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Raw Footage (6 Clips)</Text>
          <View style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <View key={i} style={styles.clipThumb}>
                <Text style={styles.clipText}>GOPR00{i}.MP4</Text>
                <Text style={styles.clipDur}>00:1{i}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.autoEditBtn} onPress={startAutoEdit}>
            <Text style={styles.autoEditBtnText}>✨ AI AUTO-EDIT TO BEAT</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ANALYZING STATE */}
      {editorState === 'ANALYZING' && (
        <View style={styles.analyzingContainer}>
          <View style={styles.spinnerCore} />
          <Text style={styles.analyzingTitle}>AI ENGINE PROCESSING</Text>
          <Text style={styles.analyzingSub}>Scanning for Face Shots & Jumps...</Text>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      )}

      {/* TIMELINE STATE */}
      {editorState === 'TIMELINE' && (
        <View style={styles.timelineContainer}>
          <View style={styles.previewPlayer}>
            <Text style={styles.previewText}>▶ PLAY MASTER EDIT</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Generated Timeline</Text>
          <ScrollView horizontal style={styles.timelineTracks} showsHorizontalScrollIndicator={false}>
            <View style={styles.trackContainer}>
              {/* Video Track */}
              <View style={styles.track}>
                <View style={styles.trackHeader}><Text style={styles.trackHeaderText}>V1</Text></View>
                <View style={[styles.timelineClip, { width: 120, backgroundColor: '#ff3366' }]}><Text style={styles.clipLabel}>Drop In</Text></View>
                <View style={[styles.timelineClip, { width: 80, backgroundColor: '#33ccff' }]}><Text style={styles.clipLabel}>Pow Spray</Text></View>
                <View style={[styles.timelineClip, { width: 160, backgroundColor: '#ff9933' }]}><Text style={styles.clipLabel}>Cliff Drop (Slow-mo)</Text></View>
                <View style={[styles.timelineClip, { width: 90, backgroundColor: '#33ff99' }]}><Text style={styles.clipLabel}>High-Five</Text></View>
              </View>
              
              {/* Audio Track */}
              <View style={[styles.track, { marginTop: 10 }]}>
                <View style={styles.trackHeader}><Text style={styles.trackHeaderText}>A1</Text></View>
                <View style={styles.audioClip}>
                  {/* Fake Audio Waveform */}
                  {[...Array(30)].map((_, i) => (
                    <View key={i} style={[styles.waveformBar, { height: 10 + Math.random() * 20 }]} />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.exportBtn} onPress={() => setEditorState('RAW')}>
            <Text style={styles.exportBtnText}>EXPORT TO INSTAGRAM</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100, // Make room for bottom nav
  },
  containerDark: {
    backgroundColor: '#0a0a0c', // Very dark, premium gray/black
  },
  containerTransparent: {
    backgroundColor: 'rgba(10, 10, 12, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  bgToggle: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  bgToggleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 40,
  },
  clipThumb: {
    width: '46%',
    height: 100,
    backgroundColor: '#1a1a24',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a35',
    justifyContent: 'flex-end',
    padding: 10,
  },
  clipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  clipDur: {
    color: '#888',
    fontSize: 10,
  },
  autoEditBtn: {
    backgroundColor: '#00d0ff',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#00d0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  autoEditBtnText: {
    color: '#0a0a0c',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(0, 208, 255, 0.2)',
    borderTopColor: '#00d0ff',
    marginBottom: 30,
    // Note: To animate rotation in RN without Animated API takes a bit of setup, 
    // so we keep it static for this minimal mock or use basic CSS if web.
  },
  analyzingTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  analyzingSub: {
    color: '#00d0ff',
    fontSize: 14,
    marginBottom: 40,
  },
  progressBarBg: {
    width: '80%',
    height: 6,
    backgroundColor: '#1a1a24',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00d0ff',
  },
  progressText: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timelineContainer: {
    flex: 1,
  },
  previewPlayer: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  previewText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  timelineTracks: {
    flexGrow: 0,
    height: 150,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  trackContainer: {
    padding: 15,
    paddingRight: 40,
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 6,
  },
  trackHeader: {
    width: 40,
    height: '100%',
    backgroundColor: '#1a1a24',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    marginRight: 10,
  },
  trackHeaderText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 12,
  },
  timelineClip: {
    height: '80%',
    borderRadius: 4,
    marginRight: 2,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  clipLabel: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  audioClip: {
    height: '80%',
    width: 450,
    backgroundColor: '#1a2a3a',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  waveformBar: {
    width: 4,
    backgroundColor: '#00d0ff',
    borderRadius: 2,
  },
  exportBtn: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  exportBtnText: {
    color: '#0a0a0c',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
});
