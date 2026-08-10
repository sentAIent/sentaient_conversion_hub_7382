import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brandTitle}>sentAIent</Text>
          <Text style={styles.subtitle}>Conversion Hub & Intelligence Platform</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Platform: {Platform.OS.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cross-Platform Core</Text>
            <Text style={styles.cardDescription}>
              Unified Expo SDK 51 & React Native 0.74 runtime supporting iOS, Android, and Web platforms natively.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Security & Crypto</Text>
            <Text style={styles.cardDescription}>
              Integrated expo-crypto, expo-secure-store, crypto-js, and JOSE authentication utilities.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Engine Status</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Operational & Ready</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 sentAIent Conversion Hub. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#38bdf8',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 16,
  },
  badgeText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 600,
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '500',
  },
  footer: {
    marginTop: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
  },
});
