import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeBack } from '../hooks/useSafeBack';

import { gql, useMutation } from '@apollo/client';
import * as Haptics from 'expo-haptics';

const CREATE_CONTENT = gql`
  mutation CreateContent($type: String!, $textBody: String, $venueId: ID) {
    createContent(type: $type, textBody: $textBody, venueId: $venueId) {
      id
    }
  }
`;

const AUTO_MONETIZE_CONTENT = gql`
  mutation AutoMonetizeContent($contentId: ID!, $venueId: ID!) {
    autoMonetizeContent(contentId: $contentId, venueId: $venueId) {
      id
      product {
        id
        name
        price
      }
    }
  }
`;

const ENHANCE_TEXT = gql`
  mutation EnhanceText($text: String!) {
    enhanceText(text: $text)
  }
`;

export default function CreatePostScreen() {
  const safeBack = useSafeBack();

  const router = useRouter();
  const [description, setDescription] = useState('');
  const [venueId, setVenueId] = useState('');
  
  // We'll simulate finding a venue by asking the user to just paste a valid business User ID (venueId)
  // In a real app, this would be a map/location picker.
  
  const [createContent, { loading: creating }] = useMutation(CREATE_CONTENT);
  const [autoMonetize, { loading: monetizing }] = useMutation(AUTO_MONETIZE_CONTENT);
  const [enhanceText, { loading: enhancing }] = useMutation(ENHANCE_TEXT);
  
  const [tags, setTags] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEnhance = async () => {
    if (!description.trim()) {
      setErrorMsg('Please enter some text to enhance.');
      return;
    }
    setErrorMsg('');
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const res = await enhanceText({ variables: { text: description } });
      setDescription(res.data.enhanceText);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to enhance text.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleSimulatePost = async () => {
    if (!description || !venueId) {
      setErrorMsg('Please enter a description and a Venue ID.');
      return;
    }
    setErrorMsg('');
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      // Step 1: Create Content
      const contentRes = await createContent({
        variables: {
          type: 'text', // Simulate image/video via text description
          textBody: description,
          venueId: venueId
        }
      });
      const contentId = contentRes.data.createContent.id;

      // Step 2: Auto-Monetize (AI Tagging)
      const monetizeRes = await autoMonetize({
        variables: {
          contentId,
          venueId
        }
      });
      
      const newTags = monetizeRes.data.autoMonetizeContent;
      setTags(newTags);
      setSuccess(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
    } catch (err: any) {
      setErrorMsg(err.message);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router.canGoBack() ? safeBack() : router.replace('/(tabs)/feed'))} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Simulate Post</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.explainer}>
          Type a description of what your video/image would show. Our AI will analyze this text and automatically tag products from the Venue's Storefront.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Venue ID</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Paste a Venue's User ID..."
            placeholderTextColor="#666"
            value={venueId}
            onChangeText={setVenueId}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Content Description (Video/Image)</Text>
          <TextInput 
            style={[styles.input, { height: 100, paddingTop: 15 }]} 
            placeholder="e.g. Drinking a delicious iced latte here!"
            placeholderTextColor="#666"
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity 
            style={styles.enhanceBtn} 
            onPress={handleEnhance}
            disabled={enhancing}
          >
            {enhancing ? (
              <ActivityIndicator color="#00D2FF" size="small" />
            ) : (
              <>
                <Ionicons name="sparkles" size={16} color="#00D2FF" />
                <Text style={styles.enhanceBtnText}>Enhance with AI (Pro)</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        {success ? (
          <BlurView intensity={20} tint="dark" style={styles.successCard}>
            <View style={styles.successHeader}>
              <Ionicons name="checkmark-circle" size={28} color="#00E676" />
              <Text style={styles.successTitle}>Content Monetized!</Text>
            </View>
            <Text style={styles.successDesc}>
              The AI analyzed your post and successfully tagged the following products:
            </Text>
            
            {tags.length > 0 ? (
              tags.map(tag => (
                <View key={tag.id} style={tagItem}>
                  <Ionicons name="pricetag" size={16} color="#FFD700" />
                  <Text style={tagText}>{tag.product.name} - ${(tag.product.price / 100).toFixed(2)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noTagsText}>The AI couldn't find any matching products in this venue's storefront.</Text>
            )}
            
            <TouchableOpacity style={styles.doneBtn} onPress={() => (router.canGoBack() ? safeBack() : router.replace('/(tabs)/feed'))}>
              <Text style={styles.doneBtnText}>Awesome</Text>
            </TouchableOpacity>
          </BlurView>
        ) : (
          <TouchableOpacity 
            style={[styles.postBtn, (creating || monetizing) && { opacity: 0.7 }]} 
            onPress={handleSimulatePost}
            disabled={creating || monetizing}
          >
            {creating || monetizing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.postBtnText}>Post & Auto-Tag</Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const tagItem = { flexDirection: 'row' as 'row', alignItems: 'center' as 'center', backgroundColor: '#222', padding: 10, borderRadius: 8, marginTop: 10, gap: 10 };
const tagText = { color: '#fff', fontSize: 16, fontWeight: '600' as '600' };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f13' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  scrollContent: { padding: 20 },
  explainer: { color: '#aaa', fontSize: 15, lineHeight: 22, marginBottom: 30 },
  inputGroup: { marginBottom: 25 },
  label: { color: '#eee', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: { backgroundColor: '#1E1E24', borderRadius: 12, padding: 15, color: '#fff', fontSize: 16 },
  postBtn: { backgroundColor: '#00D2FF', padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 10 },
  postBtnText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  errorText: { color: '#FF1744', marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
  
  successCard: { backgroundColor: 'rgba(30, 30, 35, 0.6)', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#00E676' },
  successHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  successTitle: { color: '#00E676', fontSize: 20, fontWeight: 'bold' },
  successDesc: { color: '#ddd', fontSize: 15, lineHeight: 22, marginBottom: 10 },
  noTagsText: { color: '#FF9100', fontSize: 14, fontStyle: 'italic', marginTop: 10 },
  doneBtn: { backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  doneBtnText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  enhanceBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', marginTop: 10, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12, backgroundColor: 'rgba(0, 210, 255, 0.1)' },
  enhanceBtnText: { color: '#00D2FF', fontSize: 14, fontWeight: 'bold' }
});
