import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { gql, useMutation, useQuery } from '@apollo/client';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { triggerHaptic } from '../../utils/haptics';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { AnimatedButton } from '../../components/AnimatedButton';
import { PermissionExplanation } from '../../components/PermissionExplanation';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { Image } from 'expo-image';

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
        profilePhotoUrl
      }
      checkIn {
        id
        fuzzyLatitude
        fuzzyLongitude
      }
    }
    activeBounties(latitude: $lat, longitude: $lng, radiusKm: $radius) {
      id
      title
      reward
      latitude
      longitude
    }
    activeSwarmCampaigns(latitude: $lat, longitude: $lng, radiusKm: $radius) {
      id
      title
      description
      targetCheckIns
      maxDiscount
      latitude
      longitude
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
  const [selectedSwarm, setSelectedSwarm] = useState<any | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  
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
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setShowLocationPrompt(true);
      } else {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    })();
  }, []);

  const requestLocation = async () => {
    setShowLocationPrompt(false);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  };

  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.6);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(4, { duration: 2500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
    pulseOpacity.value = withRepeat(
      withTiming(0, { duration: 2500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
      opacity: pulseOpacity.value,
    };
  });

  const applyFuzzing = (lat: number, lng: number, tier: string) => {
    if (tier === 'exact') return { lat, lng };
    if (tier === 'ghost') return { lat: 0, lng: 0 };
    
    // 1 degree latitude is approx 111km
    const offsetBase = tier === 'neighborhood' ? 0.01 : 0.1; // ~1km or ~11km
    
    const latOffset = (Math.random() * 2 - 1) * offsetBase;
    const lngOffset = (Math.random() * 2 - 1) * offsetBase;
    
    return {
      lat: lat + latOffset,
      lng: lng + lngOffset
    };
  };

  const handleCheckIn = async () => {
    triggerHaptic('heavy');
    if (!location) return;

    const { lat: fuzzedLat, lng: fuzzedLng } = applyFuzzing(
      location.coords.latitude,
      location.coords.longitude,
      selectedTier
    );

    try {
      await checkIn({
        variables: {
          location: {
            latitude: fuzzedLat,
            longitude: fuzzedLng,
            privacyTier: selectedTier
          }
        }
      });
      alert('Checked in securely!');
      if (selectedSwarm) {
        setSelectedSwarm(null);
      }
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

  if (errorMsg) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <SkeletonLoader width={80} height={80} borderRadius={40} style={{ marginBottom: 20 }} />
        <Text style={styles.loadingText}>Locating you securely...</Text>
      </View>
    );
  }

  const nearbyUsers = networkData?.nearbyUsers || [];
  const activeBounties = networkData?.activeBounties || [];
  const activeSwarms = networkData?.activeSwarmCampaigns || [];
  const myId = networkData?.me?.id;

  return (
    <View style={styles.container}>
      <PermissionExplanation
        visible={showLocationPrompt}
        onAccept={requestLocation}
        onDecline={() => {
          setShowLocationPrompt(false);
          setErrorMsg('Location is required for the map feature.');
        }}
      />
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
          zIndex={100}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={[styles.radarPulse, pulseStyle]} />
            <View style={styles.userDot} />
          </View>
        </Marker>

        {nearbyUsers.map((match: any) => {
          if (match.user.id === myId) return null;
          const scoreText = match.matchScore ? `${match.matchScore}% Match` : '';
          return (
            <Marker
              key={match.checkIn.id}
              coordinate={{ latitude: match.checkIn.fuzzyLatitude, longitude: match.checkIn.fuzzyLongitude }}
              onCalloutPress={() => {
                triggerHaptic('light');
                router.push(`/user/${match.user.id}`);
              }}
            >
              <View style={styles.userMarkerContainer}>
                 <Image source={{ uri: match.user.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/png?seed=${match.user.id}` }} style={styles.userAvatar} />
                 {match.matchScore && (
                   <View style={styles.matchBadge}>
                     <Text style={styles.matchBadgeText}>{match.matchScore}%</Text>
                   </View>
                 )}
              </View>
              <Callout tooltip>
                <View style={styles.calloutCard}>
                  <Text style={styles.calloutTitle}>{match.user.name}</Text>
                  {scoreText ? <Text style={styles.calloutSubtitle}>{scoreText}</Text> : null}
                  <Text style={styles.calloutAction}>View Profile ➔</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}

        {activeBounties.map((bounty: any) => (
          <Marker
            key={`bounty-${bounty.id}`}
            coordinate={{ latitude: bounty.latitude, longitude: bounty.longitude }}
            onCalloutPress={() => {
              triggerHaptic('light');
              router.push(`/bounty/${bounty.id}`);
            }}
          >
            <View style={styles.bountyMarker}>
              <Text style={styles.bountyMarkerEmoji}>💰</Text>
            </View>
            <Callout tooltip>
              <View style={styles.calloutCard}>
                <Text style={styles.calloutTitle}>{bounty.title}</Text>
                <Text style={styles.calloutSubtitle}>Reward: ${(bounty.reward / 100).toFixed(2)}</Text>
                <Text style={styles.calloutAction}>Claim Bounty ➔</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {activeSwarms.map((swarm: any) => (
          <Marker
            key={`swarm-${swarm.id}`}
            coordinate={{ latitude: swarm.latitude, longitude: swarm.longitude }}
            onPress={() => {
              triggerHaptic('light');
              setSelectedSwarm(swarm);
            }}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Animated.View style={[styles.radarPulse, { backgroundColor: 'rgba(255, 145, 0, 0.4)' }, pulseStyle]} />
              <View style={styles.swarmMarker}>
                <Text style={styles.swarmMarkerEmoji}>🐝</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      <BlurView intensity={95} tint="dark" style={styles.overlay}>
        <View style={styles.drawerHandle} />
        {selectedSwarm ? (
          <>
            <Text style={styles.overlayTitle}>{selectedSwarm.title}</Text>
            {selectedSwarm.description ? <Text style={styles.swarmDescription}>{selectedSwarm.description}</Text> : null}
            <View style={styles.swarmTargetContainer}>
              <Text style={styles.swarmTargetText}>
                Check in here with <Text style={{ color: '#FF9100', fontWeight: '800' }}>{selectedSwarm.targetCheckIns || 'some'}</Text> people to unlock <Text style={{ color: '#00ffcc', fontWeight: '800' }}>{selectedSwarm.maxDiscount || 'a discount'}</Text>!
              </Text>
            </View>
            <View style={{ marginBottom: 40, marginTop: 10 }}>
              <AnimatedButton
                title={loading ? "Locating..." : "Check In to Swarm"}
                onPress={handleCheckIn}
                variant="primary"
              />
              <TouchableOpacity onPress={() => setSelectedSwarm(null)} style={{ marginTop: 20 }}>
                <Text style={{ color: '#888', textAlign: 'center', fontWeight: '700' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.overlayTitle}>Broadcast Location</Text>
            
            <View style={styles.tierSelector}>
              {PRIVACY_TIERS.map(tier => (
                <TouchableOpacity 
                  key={tier} 
                  style={[styles.tierBtn, selectedTier === tier && styles.tierBtnSelected]}
                  onPress={() => {
                    triggerHaptic('light');
                    setSelectedTier(tier);
                  }}
                >
                  <Text style={[styles.tierText, selectedTier === tier && styles.tierTextSelected]}>
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ marginBottom: 60 }}>
              <AnimatedButton
                title={loading ? "Locating..." : "Check In Here"}
                onPress={handleCheckIn}
                variant="primary"
              />
            </View>
          </>
        )}
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
  userDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#00ffcc', borderWidth: 3, borderColor: '#000', zIndex: 2 },
  radarPulse: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0, 255, 204, 0.4)', zIndex: 1 },
  userMarkerContainer: { alignItems: 'center', justifyContent: 'center' },
  userAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#fff' },
  matchBadge: { position: 'absolute', bottom: -5, backgroundColor: '#ef4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, borderWidth: 1, borderColor: '#fff' },
  matchBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  bountyMarker: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFD700', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  bountyMarkerEmoji: { fontSize: 20 },
  swarmMarker: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FF9100', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  swarmMarkerEmoji: { fontSize: 20 },
  calloutCard: { backgroundColor: 'rgba(25, 25, 25, 0.95)', padding: 15, borderRadius: 16, minWidth: 150, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  calloutTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  calloutSubtitle: { color: '#00ffcc', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  calloutAction: { color: '#3b82f6', fontSize: 13, fontWeight: '700' },
  swarmDescription: { color: '#ccc', fontSize: 14, textAlign: 'center', marginBottom: 15, paddingHorizontal: 10, lineHeight: 20 },
  swarmTargetContainer: { backgroundColor: 'rgba(255, 145, 0, 0.1)', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 145, 0, 0.3)', marginBottom: 20 },
  swarmTargetText: { color: '#fff', fontSize: 15, textAlign: 'center', fontWeight: '600', lineHeight: 22 },
});
