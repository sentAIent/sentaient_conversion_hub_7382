import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useMutation } from '@apollo/client';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const SUBMIT_RATING = gql`
  mutation SubmitRating($targetUserId: ID!, $rating: Float!) {
    submitMeetingRating(targetUserId: $targetUserId, rating: $rating) {
      id
      trustScore
    }
  }
`;

export default function RatingScreen() {
  const { targetUserId } = useLocalSearchParams<{ targetUserId: string }>();
  const router = useRouter();
  
  const [rating, setRating] = useState<number>(0);
  const [submitRating, { loading }] = useMutation(SUBMIT_RATING);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Required", "Please select a rating.");
      return;
    }

    try {
      await submitRating({
        variables: {
          targetUserId,
          rating
        }
      });
      Alert.alert("Success", "Thanks for your feedback! Trust Score updated.");
      router.back();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons 
            name={i <= rating ? "star" : "star-outline"} 
            size={40} 
            color={i <= rating ? "#FFD700" : "#666"} 
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  return (
    <BlurView intensity={100} tint="dark" style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Rate Your Meeting</Text>
        <Text style={styles.subtitle}>How was your interaction with {targetUserId?.substring(0, 5)}...?</Text>
        
        {renderStars()}
        <Text style={styles.helperText}>{rating} out of 5 stars</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit Feedback'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()} disabled={loading}>
          <Text style={styles.cancelButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  content: {
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 30, textAlign: 'center' },
  starsContainer: { flexDirection: 'row', marginBottom: 15 },
  helperText: { color: '#ccc', fontSize: 16, marginBottom: 30 },
  button: { backgroundColor: '#6200ea', padding: 15, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cancelButton: { padding: 10 },
  cancelButtonText: { color: '#888', fontSize: 16 }
});
