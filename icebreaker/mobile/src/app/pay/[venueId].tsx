import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useMutation } from '@apollo/client';
import * as Haptics from 'expo-haptics';
import Animated, { ZoomIn } from 'react-native-reanimated';

const PAY_VENUE_MUTATION = gql`
  mutation PayVenue($venueId: String!, $amount: Int!) {
    payVenue(venueId: $venueId, amount: $amount)
  }
`;

export default function PayScreen() {
  const { venueId } = useLocalSearchParams();
  const router = useRouter();
  const [amountStr, setAmountStr] = useState('');
  const [payVenue, { loading, error }] = useMutation(PAY_VENUE_MUTATION);
  const [success, setSuccess] = useState(false);

  const handlePay = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const amount = Math.round(parseFloat(amountStr) * 100);
      if (amount <= 0 || isNaN(amount)) return;
      await payVenue({ variables: { venueId, amount } });
      setSuccess(true);
      setTimeout(() => router.back(), 2000);
    } catch (e) {
      console.error(e);
      alert('Payment failed');
    }
  };

  if (success) {
    return (
      <View style={styles.container}>
        <Animated.View entering={ZoomIn.duration(500)} style={{ alignItems: 'center' }}>
          <Text style={styles.successText}>Payment Successful! 🎉</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay Venue</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount ($)"
        placeholderTextColor="#666"
        keyboardType="decimal-pad"
        value={amountStr}
        onChangeText={setAmountStr}
      />
      <TouchableOpacity style={styles.payButton} onPress={handlePay} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.payButtonText}>Swipe to Pay</Text>}
      </TouchableOpacity>
      {error && <Text style={{ color: 'red', marginTop: 10 }}>Error processing payment.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  input: { width: '100%', height: 60, backgroundColor: '#111', color: '#fff', borderRadius: 10, paddingHorizontal: 15, fontSize: 20, marginBottom: 20 },
  payButton: { width: '100%', height: 60, backgroundColor: '#00ffcc', borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  payButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  successText: { fontSize: 28, fontWeight: 'bold', color: '#00ffcc' }
});
