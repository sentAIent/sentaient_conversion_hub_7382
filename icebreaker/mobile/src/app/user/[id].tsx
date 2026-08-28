import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeBack } from '../../hooks/useSafeBack';

import { Ionicons, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { gql, useQuery, useMutation } from '@apollo/client';
import { triggerHaptic } from '../../utils/haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Video, ResizeMode } from 'expo-av';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { AnimatedButton } from '../../components/AnimatedButton';

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

const USER_PROFILE_QUERY = gql`
  query GetUserProfile($userId: ID!) {
    userProfile(userId: $userId) {
      user {
        id
        username
        name
        profilePhotoUrl
      }
      contents {
        id
        type
        mediaUrl
        textBody
        createdAt
        likesCount
        commentsCount
        hasLiked
        user {
          id
          username
          profilePhotoUrl
        }
      }
    }
  }
`;

const LIKE_MUTATION = gql`
  mutation LikeContent($contentId: ID!) {
    likeContent(contentId: $contentId)
  }
`;
const UNLIKE_MUTATION = gql`
  mutation UnlikeContent($contentId: ID!) {
    unlikeContent(contentId: $contentId)
  }
`;

const BLOCK_USER = gql`
  mutation BlockUser($blockedId: ID!) {
    blockUser(blockedId: $blockedId)
  }
`;

export default function UserProfileScreen() {
  const safeBack = useSafeBack();

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: statusData, refetch: refetchStatus } = useQuery(FOLLOW_STATUS, { variables: { userId: id } });
  const { data: profileData, loading, refetch: refetchProfile } = useQuery(USER_PROFILE_QUERY, { variables: { userId: id } });
  
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);
  const [likeContent] = useMutation(LIKE_MUTATION);
  const [unlikeContent] = useMutation(UNLIKE_MUTATION);
  const [blockUser] = useMutation(BLOCK_USER);

  const status = statusData?.followStatus || 'NONE';
  const profile = profileData?.userProfile?.user;
  const contents = profileData?.userProfile?.contents || [];

  const handleFollowToggle = async () => {
    triggerHaptic('medium');
    try {
      if (status !== 'NONE') {
        await unfollowUser({ variables: { userId: id } });
      } else {
        await followUser({ variables: { userId: id } });
      }
      refetchStatus();
    } catch (e) {
      console.error(e);
    }
  };

  const handleBlockUser = () => {
    Alert.alert(
      'Block User',
      'Are you sure you want to block this user? They will no longer be able to interact with you.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: async () => {
            try {
              await blockUser({ variables: { blockedId: id } });
              Alert.alert('User Blocked', 'You will no longer see content from this user.');
              safeBack();
            } catch (e) {
              console.error(e);
              Alert.alert('Error', 'Failed to block user.');
            }
          }
        }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      <BlurView intensity={20} tint="dark" style={styles.card}>
        <View style={styles.avatar}>
          {profile?.profilePhotoUrl ? (
            <Image source={{ uri: profile.profilePhotoUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          ) : (
            <Ionicons name="person" size={40} color="#fff" />
          )}
        </View>
        <Text style={styles.name}>{profile?.name || profile?.username || `User ${id}`}</Text>
        <Text style={styles.bio}>@{profile?.username || 'user'}</Text>

        <AnimatedButton 
          style={[
            styles.followButton, 
            status !== 'NONE' && styles.followingButton
          ]}
          onPress={handleFollowToggle}
          hapticType="success"
        >
          <Text style={[
            styles.followButtonText, 
            status !== 'NONE' && styles.followingButtonText,
            status === 'PENDING' && styles.pendingButtonText
          ]}>
            {status === 'ACCEPTED' ? 'Following' : status === 'PENDING' ? 'Requested' : 'Follow'}
          </Text>
        </AnimatedButton>
      </BlurView>
      <Text style={styles.sectionTitle}>Recent Posts</Text>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => {
    const isMedia = ['photo', 'video'].includes(item.type);
    
    return (
      <View style={feedStyles.postCard}>
        <View style={feedStyles.postHeader}>
          <View style={feedStyles.avatar}>
            {item.user.profilePhotoUrl ? (
              <Image source={{ uri: item.user.profilePhotoUrl }} style={feedStyles.avatarImg} />
            ) : (
              <Ionicons name="person" size={20} color="#666" />
            )}
          </View>
          <View>
            <Text style={feedStyles.username}>{item.user.username}</Text>
          </View>
        </View>
        
        {isMedia && item.mediaUrl && (
          item.type === 'video' ? (
            <View style={feedStyles.postImageContainer}>
              <Video
                source={{ uri: item.mediaUrl }}
                style={feedStyles.postImageInside}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
              />
            </View>
          ) : (
            <PostImage 
              url={item.mediaUrl} 
              onLike={async () => {
                if (!item.hasLiked) {
                  await likeContent({ variables: { contentId: item.id } });
                  refetchProfile();
                }
              }} 
            />
          )
        )}
        {item.type === 'text' && item.textBody && (
          <View style={feedStyles.textContainer}>
            <Text style={feedStyles.postText}>{item.textBody}</Text>
          </View>
        )}

        <View style={feedStyles.engagementRow}>
          <View style={feedStyles.leftActionGroup}>
            <AnimatedButton 
              onPress={async () => {
                if (item.hasLiked) {
                  await unlikeContent({ variables: { contentId: item.id } });
                } else {
                  await likeContent({ variables: { contentId: item.id } });
                }
                refetchProfile();
              }} 
              style={feedStyles.actionIcon}
              hapticType="light"
            >
              <Feather name="heart" size={24} color={item.hasLiked ? "#ff3b30" : "#fff"} />
            </AnimatedButton>
            <AnimatedButton style={feedStyles.actionIcon} hapticType="light">
              <Feather name="message-circle" size={24} color="#fff" />
            </AnimatedButton>
            <AnimatedButton style={feedStyles.actionIcon} hapticType="light">
              <Feather name="send" size={24} color="#fff" />
            </AnimatedButton>
          </View>
        </View>
        
        <View style={feedStyles.postFooter}>
          <Text style={feedStyles.likesCount}>{(item.likesCount || 0).toLocaleString()} likes</Text>
          {isMedia && item.textBody && (
            <Text style={feedStyles.captionText}>
              <Text style={feedStyles.captionUsername}>{item.user.username}</Text> {item.textBody}
            </Text>
          )}
          {(item.commentsCount || 0) > 0 && (
             <TouchableOpacity style={{ marginTop: 5 }}>
               <Text style={{ color: '#aaa', fontSize: 14 }}>View all {item.commentsCount} comments</Text>
             </TouchableOpacity>
          )}
          <Text style={feedStyles.postDate}>
            {new Date(parseInt(item.createdAt)).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AnimatedButton style={styles.backButton} onPress={() => {
          if (router.canGoBack()) {
            safeBack();
          } else {
            router.replace('/(tabs)/feed');
          }
        }} hapticType="light">
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </AnimatedButton>
        <Text style={styles.headerTitle}>{profile?.username || 'User Profile'}</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleBlockUser}>
          <Feather name="more-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <View style={[styles.card, { width: '100%' }]}>
            <SkeletonLoader width={100} height={100} borderRadius={50} style={{ marginBottom: 20 }} />
            <SkeletonLoader width={200} height={28} style={{ marginBottom: 10 }} />
            <SkeletonLoader width={120} height={16} style={{ marginBottom: 25 }} />
            <SkeletonLoader width="100%" height={50} borderRadius={16} />
          </View>
        </View>
      ) : (
        <FlatList
          data={contents}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
}

const PostImage: React.FC<{ url: string, onLike?: () => void }> = ({ url, onLike }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const doubleTapRef = useRef(null);

  const onDoubleTap = useCallback((event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      triggerHaptic('heavy');
      scale.value = withSpring(1, { damping: 12 });
      opacity.value = withSpring(1);
      if (onLike) onLike();
      setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 });
        scale.value = withDelay(300, withTiming(0));
      }, 1000);
    }
  }, [onLike]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
    opacity: opacity.value,
  }));

  return (
    <TapGestureHandler ref={doubleTapRef} onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
      <Animated.View style={feedStyles.postImageContainer}>
        <Image source={{ uri: url }} style={feedStyles.postImageInside} />
        <Animated.View style={[animatedStyle, { position: 'absolute', zIndex: 10, alignSelf: 'center', top: '50%', marginTop: -50 }]}>
          <Ionicons name="heart" size={100} color="#ff3b30" />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
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
  moreButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  profileHeader: {
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const feedStyles = StyleSheet.create({
  postCard: {
    backgroundColor: '#111',
    marginBottom: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#222',
    paddingBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  postImageContainer: {
    width: '100%',
    aspectRatio: 4 / 5,
    backgroundColor: '#000',
  },
  postImageInside: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 15,
    paddingTop: 0,
  },
  postText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  leftActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  actionIcon: {
    padding: 5,
  },
  postFooter: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  likesCount: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  captionText: {
    color: '#fff',
    lineHeight: 20,
  },
  captionUsername: {
    fontWeight: 'bold',
  },
  postDate: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
});
