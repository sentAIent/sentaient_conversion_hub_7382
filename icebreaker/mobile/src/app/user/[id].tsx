import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { gql, useMutation } from '@apollo/client';
import * as Haptics from 'expo-haptics';

const FOLLOW_USER = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId)
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: ID!) {
    unfollowUser(userId: $userId)
  }
`;

const FOLLOW_STATUS = gql`
  query GetFollowStatus($userId: ID!) {
    followStatus(userId: $userId)
  }
`;

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: statusData, refetch } = useQuery(FOLLOW_STATUS, { variables: { userId: id } });
  
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const status = statusData?.followStatus || 'NONE';

  const handleFollowToggle = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      if (status !== 'NONE') {
        await unfollowUser({ variables: { userId: id } });
      } else {
        await followUser({ variables: { userId: id } });
      }
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <Text style={styles.name}>User {id}</Text>
          <Text style={styles.bio}>This user joined via a deep link.</Text>

          <View style={styles.tagsContainer}>
            <View style={[styles.tag, { backgroundColor: '#00E67620', borderColor: '#00E676' }]}>
              <Text style={[styles.tagText, { color: '#00E676' }]}>Networking</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#FFD60020', borderColor: '#FFD600' }]}>
              <Text style={[styles.tagText, { color: '#FFD600' }]}>Socializing</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Send Meeting Request</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.followButton, 
              status !== 'NONE' && styles.followingButton
            ]}
            onPress={handleFollowToggle}
          >
            <Text style={[
              styles.followButtonText, 
              status !== 'NONE' && styles.followingButtonText,
              status === 'PENDING' && styles.pendingButtonText
            ]}>
              {status === 'ACCEPTED' ? 'Following' : status === 'PENDING' ? 'Requested' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f13' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 25,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontWeight: 'bold',
  },
  connectButton: {
    backgroundColor: '#00D2FF',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  followButton: {
    backgroundColor: '#3b82f6',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  followingButtonText: {
    color: '#3b82f6',
  },
  pendingButtonText: {
    color: '#FF9100',
  }
});
