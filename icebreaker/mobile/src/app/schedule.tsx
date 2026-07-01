import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useMutation } from '@apollo/client';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const SEND_REQUEST = gql`
  mutation SendRequest($receiverId: ID!, $proposedTime: String!, $locationName: String!) {
    sendMeetingRequest(receiverId: $receiverId, proposedTime: $proposedTime, locationName: $locationName) {
      id
      status
    }
  }
`;

export default function ScheduleScreen() {
  const { receiverId } = useLocalSearchParams<{ receiverId: string }>();
  const router = useRouter();
  
  const [locationName, setLocationName] = useState('');
  const [hoursFromNow, setHoursFromNow] = useState('1');
  const [sendRequest, { loading }] = useMutation(SEND_REQUEST);

  const handleSend = async () => {
    if (!locationName.trim()) {
      Alert.alert("Required", "Please enter a location name.");
      return;
    }

    const proposedTime = new Date(Date.now() + Number(hoursFromNow) * 60 * 60 * 1000).toISOString();
    
    try {
      await sendRequest({
        variables: {
          receiverId,
          proposedTime,
          locationName
        }
      });
      Alert.alert("Request Sent", "They will receive a notification.");
      router.back();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <BlurView intensity={100} tint="dark" style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.iconCircle}>
          <Ionicons name="calendar" size={32} color="#00D2FF" />
        </View>

        <Text style={styles.title}>Schedule Meeting</Text>
        <Text style={styles.subtitle}>Send request to user {receiverId?.substring(0, 5)}...</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="e.g. Central Park Cafe"
              placeholderTextColor="#666"
              value={locationName}
              onChangeText={setLocationName}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time (Hours from now)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="time-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#666"
              value={hoursFromNow}
              onChangeText={setHoursFromNow}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Request'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()} disabled={loading}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  content: {
    backgroundColor: 'rgba(30, 30, 35, 0.8)',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconCircle: {
    width: 70, height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 210, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.3)'
  },
  title: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#aaa', marginBottom: 30, textAlign: 'center' },
  
  inputGroup: { width: '100%', marginBottom: 20 },
  label: { color: '#ccc', fontSize: 14, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', paddingVertical: 15, fontSize: 16 },
  
  button: { 
    backgroundColor: '#00D2FF', 
    padding: 16, 
    borderRadius: 14, 
    width: '100%', 
    alignItems: 'center', 
    marginTop: 10,
    ...(Platform.OS === 'web' ? { boxShadow: '0px 4px 10px rgba(0, 210, 255, 0.3)' as any } : {
      shadowColor: '#00D2FF',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 }
    })
  },
  buttonText: { color: '#000', fontSize: 18, fontWeight: '800' },
  
  cancelButton: { padding: 15, width: '100%', alignItems: 'center', marginTop: 5 },
  cancelButtonText: { color: '#888', fontSize: 16, fontWeight: '600' }
});
