import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

export function ReviewClipsModal({ onClose, clips, onApprove }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!clips || clips.length === 0) {
    return null;
  }

  const currentClip = clips[currentIndex];

  const handleNext = () => {
    if (currentIndex < clips.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const approve = async () => {
    await onApprove({ ...currentClip, id: Date.now() + Math.random().toString() });
    handleNext();
  };

  const reject = () => {
    handleNext();
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>SESSION REVIEW ({currentIndex + 1}/{clips.length})</Text>
        
        <View style={styles.videoContainer}>
           {Platform.OS === 'web' ? (
             <video 
               src={currentClip.url} 
               autoPlay 
               loop 
               controls 
               style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} 
             />
           ) : (
             <Text style={{color: '#fff'}}>Video playback only supported on web</Text>
           )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.clipType}>{currentClip.type.toUpperCase()}</Text>
          <Text style={styles.clipDate}>{new Date(currentClip.timestamp).toLocaleTimeString()}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]} onPress={reject}>
            <Text style={styles.rejectText}>REJECT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]} onPress={approve}>
            <Text style={styles.approveText}>SAVE TO VAULT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center', alignItems: 'center', zIndex: 1100
  },
  modalContent: {
    width: 800, maxWidth: '95%',
    backgroundColor: '#0a0a0c',
    borderRadius: 16, padding: 30,
    borderWidth: 1, borderColor: '#333'
  },
  title: {
    color: '#fff', fontSize: 24, fontWeight: '900',
    marginBottom: 20, letterSpacing: 2, textAlign: 'center'
  },
  videoContainer: {
    height: 400, backgroundColor: '#000',
    borderRadius: 8, marginBottom: 20,
    justifyContent: 'center', alignItems: 'center'
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20
  },
  clipType: {
    color: '#fff', fontSize: 18, fontWeight: 'bold'
  },
  clipDate: {
    color: 'rgba(255,255,255,0.5)', fontSize: 14
  },
  actionRow: {
    flexDirection: 'row', gap: 20
  },
  actionBtn: {
    flex: 1, paddingVertical: 18, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1
  },
  rejectBtn: {
    backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.2)'
  },
  rejectText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1
  },
  approveBtn: {
    backgroundColor: '#fff', borderColor: '#fff'
  },
  approveText: {
    color: '#000', fontWeight: 'bold', fontSize: 16, letterSpacing: 1
  }
});
