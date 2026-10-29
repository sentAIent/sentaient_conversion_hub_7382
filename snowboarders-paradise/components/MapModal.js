import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native-web';

export function MapModal({ onClose }) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>🗺️ TOPOGRAPHIC & LAND MAP</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.mapContainer}>
          <View style={styles.mapGraphic}>
            {/* Fake SVG Map */}
            <svg width="100%" height="400" viewBox="0 0 800 400" style={{ backgroundColor: '#1e293b', borderRadius: 8 }}>
              {/* Topography Lines */}
              <path d="M 0 50 Q 200 150 400 50 T 800 100" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 0 100 Q 200 200 400 100 T 800 150" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 0 150 Q 200 250 400 150 T 800 200" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 0 200 Q 200 300 400 200 T 800 250" fill="none" stroke="#334155" strokeWidth="2" />
              <path d="M 0 250 Q 200 350 400 250 T 800 300" fill="none" stroke="#334155" strokeWidth="2" />

              {/* Public Land Zones (BLM) */}
              <rect x="50" y="50" width="200" height="150" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" />
              <text x="150" y="125" fill="#eab308" fontSize="14" textAnchor="middle" fontWeight="bold">BLM LAND</text>

              {/* National Forest */}
              <rect x="350" y="100" width="300" height="200" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" />
              <text x="500" y="200" fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="bold">NATIONAL FOREST</text>

              {/* Hiking Trails */}
              <path d="M 100 300 L 200 250 L 300 280 L 400 150 L 600 100" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="10,5" />
              <text x="420" y="140" fill="#ef4444" fontSize="12" fontWeight="bold">HIKING TRAIL (SUMMIT)</text>

              {/* Campsites */}
              <circle cx="200" cy="250" r="8" fill="#3b82f6" />
              <text x="200" y="275" fill="#3b82f6" fontSize="12" textAnchor="middle" fontWeight="bold">CAMP 1</text>

              <circle cx="600" cy="100" r="8" fill="#3b82f6" />
              <text x="600" y="125" fill="#3b82f6" fontSize="12" textAnchor="middle" fontWeight="bold">CAMP 2</text>
              
              {/* Player Pos */}
              <circle cx="400" cy="200" r="6" fill="#00d0ff" />
              <circle cx="400" cy="200" r="12" fill="none" stroke="#00d0ff" strokeWidth="2" />
              <text x="400" y="225" fill="#00d0ff" fontSize="12" textAnchor="middle" fontWeight="bold">YOU ARE HERE</text>
            </svg>
          </View>
          
          <View style={styles.legend}>
            <Text style={styles.legendTitle}>Map Legend</Text>
            <View style={styles.legendRow}><View style={[styles.legendBox, {backgroundColor: 'rgba(234, 179, 8, 0.5)'}]} /><Text style={styles.legendText}>Bureau of Land Management (BLM)</Text></View>
            <View style={styles.legendRow}><View style={[styles.legendBox, {backgroundColor: 'rgba(34, 197, 94, 0.5)'}]} /><Text style={styles.legendText}>National Forest / Public Land</Text></View>
            <View style={styles.legendRow}><View style={[styles.legendBox, {backgroundColor: '#ef4444'}]} /><Text style={styles.legendText}>Established Hiking Trails</Text></View>
            <View style={styles.legendRow}><View style={[styles.legendBox, {backgroundColor: '#3b82f6', borderRadius: 10}]} /><Text style={styles.legendText}>Designated Campsites</Text></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { width: '80%', maxWidth: 900, backgroundColor: '#0f172a', borderRadius: 16, border: '1px solid #1e293b', overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
  closeBtn: { width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  mapContainer: { padding: 20, maxHeight: 600 },
  mapGraphic: { width: '100%', marginBottom: 20 },
  legend: { backgroundColor: '#1e293b', padding: 15, borderRadius: 8 },
  legendTitle: { color: '#94a3b8', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  legendBox: { width: 20, height: 20, borderRadius: 4, marginRight: 10 },
  legendText: { color: '#cbd5e1', fontSize: 14 }
});
