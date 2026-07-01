import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { gql, useMutation, useQuery } from '@apollo/client';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const GET_NETWORK_DATA = gql`
  query GetNetworkData($lat: Float!, $lng: Float!, $radius: Float!) {
    me {
      id
    }
    nearbyUsers(latitude: $lat, longitude: $lng, radiusKm: $radius) {
      matchScore
      user {
        id
        name
      }
      checkIn {
        id
        fuzzyLatitude
        fuzzyLongitude
      }
    }
  }
`;

const CREATE_CHECK_IN = gql`
  mutation CreateCheckIn($location: LocationInput!) {
    createOrUpdateCheckIn(location: $location) {
      id
      privacyTier
      fuzzyLatitude
      fuzzyLongitude
    }
  }
`;

const PRIVACY_TIERS = ['exact', 'neighborhood', 'city', 'ghost'];

export default function MapScreen() {
  const [location, setLocation] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState('exact');
  
  const { data: networkData } = useQuery(GET_NETWORK_DATA, { 
    variables: { 
      lat: location?.coords?.latitude || 0, 
      lng: location?.coords?.longitude || 0, 
      radius: 10 
    },
    skip: !location,
    pollInterval: 10000 
  });
  const [checkIn, { loading }] = useMutation(CREATE_CHECK_IN);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const handleCheckIn = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!location) return;
    try {
      await checkIn({
        variables: {
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            privacyTier: selectedTier
          }
        }
      });
      alert('Checked in securely!');
    } catch (e: any) {
      alert(e.message);
    }
  };

  const darkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
    { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] }
  ];

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.loadingText}>Locating you securely...</Text>
      </View>
    );
  }

  const nearbyUsers = networkData?.nearbyUsers || [];
  const myId = networkData?.me?.id;

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        customMapStyle={darkMapStyle}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
          title="You"
          pinColor="#00ffcc"
        />

        {nearbyUsers.map((match: any) => {
          if (match.user.id === myId) return null;
          const scoreText = match.matchScore ? ` - ${match.matchScore}% Match` : '';
          return (
            <Marker
              key={match.checkIn.id}
              coordinate={{ latitude: match.checkIn.fuzzyLatitude, longitude: match.checkIn.fuzzyLongitude }}
              title={`Tap to connect${scoreText}`}
              pinColor="#ef4444"
              onCalloutPress={() => {
                router.push({ pathname: '/schedule', params: { receiverId: match.user.id } });
              }}
            />
          );
        })}
      </MapView>

      <BlurView intensity={95} tint="dark" style={styles.overlay}>
        <View style={styles.drawerHandle} />
        <Text style={styles.overlayTitle}>Broadcast Location</Text>
        
        <View style={styles.tierSelector}>
          {PRIVACY_TIERS.map(tier => (
            <TouchableOpacity 
              key={tier} 
              style={[styles.tierBtn, selectedTier === tier && styles.tierBtnSelected]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedTier(tier);
              }}
            >
              <Text style={[styles.tierText, selectedTier === tier && styles.tierTextSelected]}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.checkInBtn} 
          onPress={handleCheckIn}
          disabled={loading}
        >
          {loading ? (
             <ActivityIndicator color="#000" />
          ) : (
             <Text style={styles.checkInBtnText}>Check In Here</Text>
          )}
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loadingContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#00ffcc', marginTop: 15, fontSize: 16, fontWeight: '600' },
  map: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  drawerHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  overlayTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 20, textAlign: 'center', letterSpacing: 0.5 },
  tierSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  tierBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  tierBtnSelected: { backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
  tierText: { color: '#888', fontSize: 13, fontWeight: '600' },
  tierTextSelected: { color: '#fff', fontWeight: '800' },
  checkInBtn: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? { boxShadow: '0px 0px 10px rgba(255,255,255,0.2)' as any } : {
      shadowColor: '#fff',
      shadowOpacity: 0.2,
      shadowRadius: 10,
    }),
    marginBottom: 60, // Give space for floating tab bar
  },
  checkInBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  }
});
