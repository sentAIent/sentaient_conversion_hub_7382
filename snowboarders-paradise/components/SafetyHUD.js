import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const AVALANCHE_DATA = {
  ALASKA: { level: 4, text: '4 - HIGH', color: '#ff3366' },      // Red
  JAPAN: { level: 3, text: '3 - CONSIDERABLE', color: '#ff9933' }, // Orange
  ZERMATT: { level: 2, text: '2 - MODERATE', color: '#facc15' },   // Yellow
};

export function SafetyHUD({ regionId }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const data = AVALANCHE_DATA[regionId] || AVALANCHE_DATA.ZERMATT;
  const isDangerous = data.level >= 4;

  useEffect(() => {
    if (isDangerous) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isDangerous, pulseAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>AVY DANGER:</Text>
      <Animated.View 
        style={[
          styles.badge, 
          { backgroundColor: data.color },
          isDangerous && { opacity: pulseAnim }
        ]}
      >
        <Text style={styles.badgeText}>{data.text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'center', // Center inside the glass card
  },
  label: {
    color: '#aaddff',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#0b1120',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
