import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

export function FilmVault({ onClose, clips, onDelete }) {
  const [playingClip, setPlayingClip] = useState(null);

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>FILM VAULT</Text>

        {playingClip ? (
          <View style={styles.playerContainer}>
             <TouchableOpacity style={styles.backBtn} onPress={() => setPlayingClip(null)}>
               <Text style={styles.backText}>← Back to Gallery</Text>
             </TouchableOpacity>
             <View style={styles.videoWrapper}>
               {Platform.OS === 'web' && (
                 <>
                   <video 
                     src={playingClip.url} 
                     autoPlay 
                     controls 
                     style={{ 
                       width: '100%', height: '100%', objectFit: 'contain',
                       filter: playingClip.aiEdited ? 'contrast(1.5) saturate(1.2) sepia(0.3) hue-rotate(-15deg)' : 'none'
                     }} 
                   />
                   {playingClip.aiEdited && (
                     <div style={{ position: 'absolute', top: 20, left: 20, color: 'red', fontWeight: 'bold', fontSize: 24, letterSpacing: 2, textShadow: '2px 2px 0 #000' }}>
                       ● REC (AI EDIT)
                     </div>
                   )}
                 </>
               )}
             </View>
             {!playingClip.aiEdited && (
               <TouchableOpacity 
                 style={{ backgroundColor: '#00ffff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 }}
                 onPress={() => {
                   // Simulate AI Editing Delay
                   setPlayingClip({...playingClip, aiEdited: true});
                 }}
               >
                 <Text style={{ color: '#000', fontWeight: 'bold' }}>✨ Apply AI Auto-Edit ✨</Text>
               </TouchableOpacity>
             )}
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.gallery}>
            {clips && clips.length > 0 ? clips.map(clip => (
              <View key={clip.id} style={styles.clipCard}>
                <View style={styles.thumbnailPlaceholder}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
                <View style={styles.clipInfo}>
                  <Text style={styles.clipType}>{clip.type.toUpperCase()}</Text>
                  <Text style={styles.clipDate}>{new Date(clip.timestamp).toLocaleDateString()}</Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.cardBtn} onPress={() => setPlayingClip(clip)}>
                    <Text style={styles.cardBtnText}>PLAY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.cardBtn, styles.deleteBtn]} onPress={() => onDelete(clip.id)}>
                    <Text style={styles.deleteBtnText}>DEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )) : (
              <Text style={styles.emptyText}>Vault is empty. Go hit some jumps!</Text>
            )}
          </ScrollView>
        )}
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
    width: 900, maxWidth: '95%', height: '80%',
    backgroundColor: '#0a0a0c',
    borderRadius: 16, padding: 30,
    borderWidth: 1, borderColor: '#333'
  },
  closeBtn: {
    position: 'absolute', top: 20, right: 20, zIndex: 10,
    padding: 10,
  },
  closeText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  title: {
    color: '#fff', fontSize: 28, fontWeight: '900',
    marginBottom: 30, letterSpacing: 2
  },
  gallery: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 20
  },
  clipCard: {
    width: 250, backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  thumbnailPlaceholder: {
    height: 140, backgroundColor: '#111',
    justifyContent: 'center', alignItems: 'center'
  },
  playIcon: {
    color: '#fff', fontSize: 30, opacity: 0.5
  },
  clipInfo: {
    padding: 15
  },
  clipType: {
    color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4
  },
  clipDate: {
    color: 'rgba(255,255,255,0.5)', fontSize: 12
  },
  cardActions: {
    flexDirection: 'row', borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  cardBtn: {
    flex: 1, padding: 12, alignItems: 'center', justifyContent: 'center'
  },
  deleteBtn: {
    borderLeftWidth: 1, borderColor: 'rgba(255,255,255,0.1)', flex: 0.5
  },
  cardBtnText: {
    color: '#fff', fontWeight: 'bold'
  },
  deleteBtnText: {
    color: '#ff4444', fontWeight: 'bold'
  },
  emptyText: {
    color: 'rgba(255,255,255,0.5)', fontSize: 16, marginTop: 50, width: '100%', textAlign: 'center'
  },
  playerContainer: {
    flex: 1,
  },
  backBtn: {
    marginBottom: 15, alignSelf: 'flex-start'
  },
  backText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold'
  },
  videoWrapper: {
    flex: 1, backgroundColor: '#000', borderRadius: 8, overflow: 'hidden'
  }
});
