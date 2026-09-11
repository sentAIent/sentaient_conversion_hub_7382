import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { AnimatedButton } from './AnimatedButton';
import { Ionicons } from '@expo/vector-icons';

interface PermissionExplanationProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  title?: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function PermissionExplanation({
  visible,
  onAccept,
  onDecline,
  title = "Location Permission",
  description = "Icebreaker uses your location to connect you with nearby venues, discover local bounties, and show you trending swarms in your city. You can always control your exact visibility in your Privacy settings.",
  icon = "location"
}: PermissionExplanationProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDecline}
    >
      <BlurView intensity={80} tint="dark" style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={40} color="#3b82f6" />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          
          <View style={styles.buttonContainer}>
            <AnimatedButton 
              title="Not Now" 
              onPress={onDecline} 
              variant="secondary"
              style={styles.declineButton}
            />
            <AnimatedButton 
              title="Continue" 
              onPress={onAccept} 
              style={styles.acceptButton}
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(20, 20, 25, 0.95)',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  declineButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  acceptButton: {
    flex: 1,
  }
});
