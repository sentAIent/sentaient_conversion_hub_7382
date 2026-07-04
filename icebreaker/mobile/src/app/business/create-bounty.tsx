import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, TextInput, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { gql, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const CREATE_BOUNTY = gql`
  mutation CreateBounty($title: String!, $description: String!, $reward: Int!, $totalBudget: Int!, $latitude: Float!, $longitude: Float!) {
    createBounty(title: $title, description: $description, reward: $reward, totalBudget: $totalBudget, latitude: $latitude, longitude: $longitude) {
      id
      title
    }
  }
`;

export default function CreateBountyScreen() {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('10');
  const [totalBudget, setTotalBudget] = useState('100');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  const [createBounty, { loading }] = useMutation(CREATE_BOUNTY);

  const handleSubmit = async () => {
    try {
      if (!title || !description || !reward || !totalBudget) {
        alert('Please fill out all fields');
        return;
      }

      let lat = 0;
      let lng = 0;

      if (useCurrentLocation) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Location permission required for current location');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        lat = loc.coords.latitude;
        lng = loc.coords.longitude;
      } else {
        // Default to some random offset for demo if not using current
        lat = 37.7749;
        lng = -122.4194;
      }

      await createBounty({
        variables: {
          title,
          description,
          reward: parseInt(reward) * 100, // to cents
          totalBudget: parseInt(totalBudget) * 100, // to cents
          latitude: lat,
          longitude: lng
        }
      });

      alert('Bounty created successfully!');
      (router.canGoBack() ? router.back() : router.replace('/(tabs)/feed'));
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
        <Text style={styles.headerTitle}>Drop a Bounty</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.premiumBanner}>
          <Ionicons name="diamond" size={24} color="#FFD700" style={{marginRight: 10}} />
          <Text style={styles.premiumText}>Pro Business Tool</Text>
        </View>

        <Text style={styles.label}>Bounty Title</Text>
        <TextInput style={styles.input} placeholder="e.g. Best outfit at our pop-up" placeholderTextColor="#666" value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Description & Requirements</Text>
        <TextInput 
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
          placeholder="What do creators need to do? Mention tags, specific product placements, etc." 
          placeholderTextColor="#666" 
          multiline 
          value={description} 
          onChangeText={setDescription} 
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Reward (USD)</Text>
            <TextInput style={styles.input} placeholder="10" placeholderTextColor="#666" keyboardType="numeric" value={reward} onChangeText={setReward} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.label}>Total Budget (USD)</Text>
            <TextInput style={styles.input} placeholder="100" placeholderTextColor="#666" keyboardType="numeric" value={totalBudget} onChangeText={setTotalBudget} />
          </View>
        </View>

        <View style={styles.locationRow}>
          <Text style={styles.label}>Use Current Location</Text>
          <Switch value={useCurrentLocation} onValueChange={setUseCurrentLocation} trackColor={{ true: '#00E676', false: '#333' }} />
        </View>
        <Text style={styles.subtext}>
          {useCurrentLocation ? 'The bounty will be dropped exactly where you are standing right now.' : 'A map picker will be available here soon to drop it remotely.'}
        </Text>

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.5 }]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Launch Bounty</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#222' },
  backButton: { padding: 4 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 20 },
  premiumBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a00', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#333' },
  premiumText: { color: '#FFD700', fontWeight: 'bold', fontSize: 16 },
  label: { color: '#ddd', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#222' },
  row: { flexDirection: 'row' },
  locationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subtext: { color: '#666', fontSize: 12, marginBottom: 30 },
  button: { backgroundColor: '#FFD700', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 40 },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' }
});
