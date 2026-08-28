import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeBack } from '../../hooks/useSafeBack';

import { gql, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';

const CLAIM_BOUNTY = gql`
  mutation ClaimBounty($bountyId: ID!, $contentId: ID!) {
    claimBounty(bountyId: $bountyId, contentId: $contentId)
  }
`;

const CREATE_CONTENT = gql`
  mutation CreateContent($type: String!, $textBody: String, $venueId: ID) {
    createContent(type: $type, textBody: $textBody, venueId: $venueId) {
      id
    }
  }
`;

export default function BountyScreen() {
  const safeBack = useSafeBack();

  const { id, venueId } = useLocalSearchParams();
  const router = useRouter();
  
  const [proofUrl, setProofUrl] = useState('');
  const [createContent] = useMutation(CREATE_CONTENT);
  const [claim, { loading: claimLoading, error }] = useMutation(CLAIM_BOUNTY);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClaim = async () => {
    try {
      if (!proofUrl.trim()) {
        alert('Please provide a proof URL or simulated media path');
        return;
      }
      setIsSubmitting(true);
      
      const contentRes = await createContent({
        variables: {
          type: "ugc",
          textBody: "Bounty claim - " + proofUrl,
          venueId: venueId || "1"
        }
      });
      
      const newContentId = contentRes.data?.createContent?.id;
      if (!newContentId) {
        throw new Error('Failed to create content');
      }

      await claim({ variables: { bountyId: id, contentId: newContentId } });
      setSuccess(true);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loading = claimLoading || isSubmitting;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router.canGoBack() ? safeBack() : router.replace('/(tabs)/feed'))} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Claim Bounty</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {success ? (
          <View style={styles.successBox}>
            <Ionicons name="time-outline" size={80} color="#00E676" />
            <Text style={styles.successTitle}>Pending Review</Text>
            <Text style={styles.successDesc}>Your submission has been received and is pending review.</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/feed')}>
              <Text style={styles.buttonText}>Back to Feed</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formBox}>
            <Text style={styles.title}>Submit your content</Text>
            <Text style={styles.desc}>To claim this bounty, upload the required content.</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Simulated Media URL / Text"
              placeholderTextColor="#666"
              value={proofUrl}
              onChangeText={setProofUrl}
            />

            <TouchableOpacity 
              style={[styles.button, (!proofUrl || loading) && { opacity: 0.5 }]} 
              onPress={handleClaim}
              disabled={loading || !proofUrl}
            >
              {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Submit Proof</Text>}
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
