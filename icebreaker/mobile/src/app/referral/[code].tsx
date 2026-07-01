import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { gql, useMutation } from '@apollo/client';
import * as Haptics from 'expo-haptics';

const REDEEM_REFERRAL = gql`
  mutation RedeemReferralCode($code: String!) {
    redeemReferralCode(code: $code) {
      id
      proStatus
    }
  }
`;

export default function ReferralScreen() {
  const { code: urlCode } = useLocalSearchParams();
  const [code, setCode] = useState(typeof urlCode === 'string' ? urlCode : '');
  const [redeem, { loading, error }] = useMutation(REDEEM_REFERRAL);
  const router = useRouter();

  const handleRedeem = async () => {
    if (!code) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await redeem({ variables: { code: code.toUpperCase() } });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)');
    } catch (err) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Have an invite code?</Text>
        <Text style={styles.subtitle}>
          Enter a friend's invite code to unlock 7 days of Icebreaker Pro Status for both of you!
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ENTER CODE"
          placeholderTextColor="#666"
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
          maxLength={10}
        />

        {error && <Text style={styles.errorText}>{error.message}</Text>}

        <TouchableOpacity 
          style={[styles.button, !code && styles.buttonDisabled]} 
          onPress={handleRedeem}
          disabled={!code || loading}
        >
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Redeem Code</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f13',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    marginBottom: 20,
    letterSpacing: 4,
  },
  button: {
    backgroundColor: '#00E676',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 15,
    alignItems: 'center',
  },
  skipText: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF1744',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  }
});
