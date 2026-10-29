import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCustomization } from './CustomizationContext';

const SWATCHES = ['#ffffff', '#000000', '#222222', '#444444', '#ff0000', '#ff0077', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#aa00ff'];

export function CustomizationStudio({ onClose }) {
  const { colors, updateColor } = useCustomization();

  const renderColorPicker = (label, itemKey) => (
    <View key={itemKey} style={styles.pickerRow}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.swatchList}>
        {SWATCHES.map(hex => (
          <TouchableOpacity 
            key={hex} 
            style={[styles.swatch, { backgroundColor: hex }, colors[itemKey] === hex && styles.swatchActive]} 
            onPress={() => updateColor(itemKey, hex)}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>CUSTOMIZATION STUDIO</Text>
          <TouchableOpacity onPress={onClose}><Text style={styles.closeBtn}>✕</Text></TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContent}>
          {renderColorPicker('Snowboard', 'snowboard')}
          {renderColorPicker('Jacket', 'jacket')}
          {renderColorPicker('Pants', 'pants')}
          {renderColorPicker('Boots', 'boots')}
          {renderColorPicker('Bindings', 'bindings')}
          {renderColorPicker('Beanie', 'beanie')}
          {renderColorPicker('Goggles', 'goggles')}
          {renderColorPicker('Face Guard', 'faceGuard')}
          {renderColorPicker('Earmuffs', 'earmuffs')}
          {renderColorPicker('Backpack', 'backpack')}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
  container: { width: 500, height: 600, backgroundColor: 'rgba(11, 17, 32, 0.95)', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 255, 255, 0.3)' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 10 },
  title: { color: '#00ffff', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 },
  closeBtn: { color: '#fff', fontSize: 20 },
  scrollContent: { flex: 1 },
  pickerRow: { marginBottom: 20 },
  label: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  swatchList: { flexDirection: 'row' },
  swatch: { width: 30, height: 30, borderRadius: 15, marginHorizontal: 5, borderWidth: 2, borderColor: 'transparent' },
  swatchActive: { borderColor: '#fff' }
});
