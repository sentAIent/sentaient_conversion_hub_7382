import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useMutation } from '@apollo/client';

const UPDATE_PROFILE = gql`
  mutation UpdateOpennessProfile($activeColors: [String!]!, $showOnColorMap: Boolean!) {
    updateOpennessProfile(activeColors: $activeColors, showOnColorMap: $showOnColorMap) {
      id
      activeColors
    }
  }
`;

const SIGNALS = [
  { id: 'GREEN', label: 'Networking', color: '#10b981' },
  { id: 'RED', label: 'Dating', color: '#ef4444' },
  { id: 'BLUE', label: 'Friends', color: '#3b82f6' }
];

export default function OnboardingScreen() {
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const router = useRouter();
  
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);

  const toggleSignal = (id: string) => {
    setSelectedSignals(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    try {
      await updateProfile({
        variables: {
          activeColors: selectedSignals.length > 0 ? selectedSignals : ['GREEN'],
          showOnColorMap: true
        }
      });
      router.replace('/(tabs)/network');
    } catch (err) {
      console.error(err);
      // Fallback redirect if network fails, let offline cache handle it later
      router.replace('/(tabs)/network');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BlurView intensity={30} tint="dark" style={styles.glassCard}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>What are you looking for?</Text>
        <Text style={styles.instructions}>Select your signals. This controls your pin color on the map.</Text>

        <View style={styles.signalsContainer}>
          {SIGNALS.map(s => (
            <TouchableOpacity 
              key={s.id} 
              style={[
                styles.signalButton, 
                selectedSignals.includes(s.id) && { borderColor: s.color, backgroundColor: `${s.color}20` }
              ]}
              onPress={() => toggleSignal(s.id)}
            >
              <View style={[styles.colorDot, { backgroundColor: s.color }]} />
              <Text style={styles.signalText}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handleFinish}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Complete Setup</Text>}
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },
  glassCard: {
    padding: 30,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 30,
  },
  signalsContainer: {
    marginBottom: 30,
  },
  signalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 15,
  },
  signalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  }
});
