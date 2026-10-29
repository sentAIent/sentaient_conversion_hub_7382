import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { MockBackend } from '../utils/mockBackend';

export function SettingsModal({ onClose, settings, onUpdate }) {
  const toggleSetting = (key) => {
    onUpdate({ ...settings, [key]: !settings[key] });
  };

  const setQuality = (q) => {
    onUpdate({ ...settings, quality: q });
  };

  const handleDeleteData = async () => {
    if (typeof window !== 'undefined' && window.confirm) {
      const confirmed = window.confirm("Are you sure you want to permanently delete your account and all data? This cannot be undone.");
      if (confirmed) {
        await MockBackend.deleteUserData();
        window.location.reload();
      }
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SETTINGS</Text>

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Auto-Record Epic Tricks</Text>
            <Text style={styles.settingDesc}>Capture big air and massive combos</Text>
          </View>
          <Switch 
            value={settings.autoRecordTricks} 
            onValueChange={() => toggleSetting('autoRecordTricks')}
            trackColor={{ false: '#333', true: '#ffffff' }}
            thumbColor={settings.autoRecordTricks ? '#000' : '#888'}
          />
        </View>

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Auto-Record Wipeouts</Text>
            <Text style={styles.settingDesc}>Capture massive crashes and bails</Text>
          </View>
          <Switch 
            value={settings.autoRecordWipeouts} 
            onValueChange={() => toggleSetting('autoRecordWipeouts')}
            trackColor={{ false: '#333', true: '#ffffff' }}
            thumbColor={settings.autoRecordWipeouts ? '#000' : '#888'}
          />
        </View>

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Recording Quality</Text>
            <Text style={styles.settingDesc}>Higher quality uses more resources</Text>
          </View>
          <View style={styles.qualitySelector}>
            {['480p', '720p', '1080p'].map(q => (
              <TouchableOpacity 
                key={q} 
                style={[styles.qualityBtn, settings.quality === q && styles.qualityBtnActive]}
                onPress={() => setQuality(q)}
              >
                <Text style={[styles.qualityText, settings.quality === q && styles.qualityTextActive]}>{q}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data Privacy Section */}
        <View style={[styles.settingRow, { marginTop: 20, borderColor: 'rgba(255, 50, 50, 0.3)' }]}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            <Text style={[styles.settingTitle, { color: '#ff4444' }]}>Delete Account & Data</Text>
            <Text style={styles.settingDesc}>Permanently erase all progression, cloud saves, compliance logs, and recorded clips.</Text>
          </View>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteData}>
            <Text style={styles.deleteBtnText}>DELETE</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modalContent: {
    width: 500, maxWidth: '90%',
    backgroundColor: '#0a0a0c',
    borderRadius: 16, padding: 30,
    borderWidth: 1, borderColor: '#333'
  },
  closeBtn: {
    position: 'absolute', top: 20, right: 20,
    padding: 10,
  },
  closeText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  title: {
    color: '#fff', fontSize: 24, fontWeight: '900',
    marginBottom: 30, letterSpacing: 2
  },
  settingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20, borderRadius: 12, marginBottom: 15,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  settingTitle: {
    color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4
  },
  settingDesc: {
    color: 'rgba(255,255,255,0.5)', fontSize: 13
  },
  qualitySelector: {
    flexDirection: 'row', gap: 10
  },
  qualityBtn: {
    paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1, borderColor: 'transparent'
  },
  qualityBtnActive: {
    backgroundColor: '#fff'
  },
  qualityText: {
    color: '#fff', fontWeight: 'bold', fontSize: 12
  },
  deleteBtn: { backgroundColor: "rgba(255, 50, 50, 0.2)", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, borderWidth: 1, borderColor: "#ff4444" },
  deleteBtnText: { color: "#ff4444", fontWeight: "900", letterSpacing: 1 },
  qualityTextActive: {
    color: '#000'
  }
});
