import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';

const CLAIM_BOUNTY = gql`
  mutation ClaimBounty($bountyId: ID!, $contentId: ID!) {
    claimBounty(bountyId: $bountyId, contentId: $contentId)
  }
`;

export default function BountyScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [contentId, setContentId] = useState('');
  const [claim, { loading, error }] = useMutation(CLAIM_BOUNTY);
  const [success, setSuccess] = useState(false);

  const handleClaim = async () => {
    try {
      if (!contentId.trim()) {
        alert('Please provide a content ID (mock)');
        return;
      }
      await claim({ variables: { bountyId: id, contentId } });
      setSuccess(true);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/feed'))} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Claim Bounty</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {success ? (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={80} color="#00E676" />
            <Text style={styles.successTitle}>Bounty Claimed!</Text>
            <Text style={styles.successDesc}>The reward has been added to your wallet.</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/wallet')}>
              <Text style={styles.buttonText}>View Wallet</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formBox}>
            <Text style={styles.title}>Submit your content</Text>
            <Text style={styles.desc}>To claim this bounty, upload the required content (mock implementation).</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Content ID (mock)"
              placeholderTextColor="#666"
              value={contentId}
              onChangeText={setContentId}
            />

            <TouchableOpacity 
              style={[styles.button, (!contentId || loading) && { opacity: 0.5 }]} 
              onPress={handleClaim}
              disabled={loading || !contentId}
            >
              {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Submit Claim</Text>}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#222' },
  backButton: { padding: 4 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  successBox: { alignItems: 'center' },
  successTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  successDesc: { color: '#aaa', fontSize: 16, textAlign: 'center', marginBottom: 30 },
  formBox: { backgroundColor: '#111', padding: 20, borderRadius: 16 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  desc: { color: '#aaa', fontSize: 15, marginBottom: 20 },
  input: { backgroundColor: '#222', color: '#fff', padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#00E676', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' }
});
