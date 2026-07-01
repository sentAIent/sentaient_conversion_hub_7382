import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, RefreshControl, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import StoryModal from '../../components/StoryModal';

const FOLLOWER_FEED_QUERY = gql`
  query GetFollowerFeed {
    followerFeed {
      __typename
      ... on Content {
        id
        type
        mediaUrl
        textBody
        createdAt
        user {
          id
          name
          username
          profilePhotoUrl
        }
      }
      ... on CheckIn {
        id
        privacyTier
        fuzzyLatitude
        fuzzyLongitude
        createdAt
        user {
          id
          name
          username
          profilePhotoUrl
        }
      }
    }
    exploreFeed {
      __typename
      ... on Content {
        id
        type
        mediaUrl
        textBody
        createdAt
        user {
          id
          name
          username
          profilePhotoUrl
        }
      }
      ... on CheckIn {
        id
        privacyTier
        fuzzyLatitude
        fuzzyLongitude
        createdAt
        user {
          id
          name
          username
          profilePhotoUrl
        }
      }
    }
    followerStories {
      id
      type
      mediaUrl
      textBody
      createdAt
      user {
        id
        username
        profilePhotoUrl
      }
    }
  }
`;

const { width } = Dimensions.get('window');

export default function FeedScreen() {
  const { data, loading, error, refetch } = useQuery(FOLLOWER_FEED_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  
  const [activeTab, setActiveTab] = useState<'following' | 'explore'>('following');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const items = activeTab === 'following' ? (data?.followerFeed || []) : (data?.exploreFeed || []);
  const stories = data?.followerStories || [];

  const renderStory = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.storyBubble} onPress={() => setSelectedStory(item)}>
      <View style={styles.storyAvatarRing}>
        {item.user.profilePhotoUrl ? (
          <Image source={{ uri: item.user.profilePhotoUrl }} style={styles.storyAvatarImg} />
        ) : (
          <Ionicons name="person" size={24} color="#666" />
        )}
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>{item.user.username}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: any }) => {
    const isCheckIn = item.__typename === 'CheckIn';
    const isText = item.__typename === 'Content' && item.type === 'text';
    const isMedia = item.__typename === 'Content' && ['photo', 'video'].includes(item.type);
    const isAudio = item.__typename === 'Content' && item.type === 'audio';

    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.avatar}>
            {item.user.profilePhotoUrl ? (
              <Image source={{ uri: item.user.profilePhotoUrl }} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={20} color="#666" />
            )}
          </View>
          <View>
            <Text style={styles.username}>{item.user.username}</Text>
          </View>
          <TouchableOpacity style={styles.moreOptionsBtn}>
            <Feather name="more-horizontal" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {isMedia && item.mediaUrl && (
          <PostImage url={item.mediaUrl} />
        )}

        {isText && item.textBody && (
          <View style={styles.textContainer}>
            <Text style={styles.postText}>{item.textBody}</Text>
          </View>
        )}

        {isAudio && item.mediaUrl && (
          <View style={styles.audioContainer}>
            <TouchableOpacity style={styles.playBtn}>
              <Ionicons name="play" size={20} color="#fff" />
            </TouchableOpacity>
            <View style={styles.audioWaveform}>
              {[...Array(20)].map((_, i) => (
                <View key={i} style={[styles.waveLine, { height: 10 + Math.random() * 20 }]} />
              ))}
            </View>
            <Text style={styles.audioDuration}>0:12</Text>
          </View>
        )}

        {isCheckIn && (
          <View style={styles.checkInContainer}>
            <View style={styles.checkInIconWrap}>
              <Ionicons name="location-sharp" size={24} color="#00E676" />
            </View>
            <View>
              <Text style={styles.checkInText}>Checked in nearby</Text>
              <Text style={styles.checkInSubtext}>{item.privacyTier.toUpperCase()} Precision</Text>
            </View>
          </View>
        )}

        <View style={styles.engagementRow}>
          <View style={styles.leftActionGroup}>
            <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} style={styles.actionIcon}>
              <Feather name="heart" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <Feather name="message-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <Feather name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.actionIconRight}>
            <Feather name="bookmark" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.postFooter}>
          <Text style={styles.likesCount}>24 likes</Text>
          {isMedia && item.textBody && (
            <Text style={styles.captionText}>
              <Text style={styles.captionUsername}>{item.user.username}</Text> {item.textBody}
            </Text>
          )}
          <Text style={styles.postDate}>
            {new Date(parseInt(item.createdAt)).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Icebreaker</Text>
        <TouchableOpacity style={styles.alertIcon} onPress={() => router.push('/alerts')}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'following' && styles.activeTabButton]}
          onPress={() => { setActiveTab('following'); Haptics.selectionAsync(); }}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'explore' && styles.activeTabButton]}
          onPress={() => { setActiveTab('explore'); Haptics.selectionAsync(); }}
        >
          <Text style={[styles.tabText, activeTab === 'explore' && styles.activeTabText]}>Explore</Text>
        </TouchableOpacity>
      </View>
      
      {loading && !refreshing && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error loading feed</Text>
        </View>
      )}

      {!loading && !error && items.length === 0 && (
        <View style={styles.center}>
          <Ionicons name="people-outline" size={64} color="#444" />
          <Text style={styles.emptyText}>Your feed is empty.</Text>
          <Text style={styles.subEmptyText}>Follow some people to see their posts here!</Text>
        </View>
      )}

      {(items.length > 0 || stories.length > 0) && !error && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
          }
          ListHeaderComponent={
            stories.length > 0 ? (
              <View style={styles.storiesContainer}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={stories}
                  keyExtractor={item => item.id}
                  renderItem={renderStory}
                  contentContainerStyle={styles.storiesList}
                />
              </View>
            ) : null
          }
        />
      )}

      <StoryModal 
        visible={!!selectedStory} 
        story={selectedStory} 
        onClose={() => setSelectedStory(null)} 
      />
    </SafeAreaView>
  );
}

// Separate component for double-tap-to-like logic
function PostImage({ url }: { url: string }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const doubleTapRef = useRef(null);

  const onDoubleTap = useCallback((event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      scale.value = withSpring(1, { damping: 12 });
      opacity.value = withSpring(1);
      
      setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 });
        scale.value = withDelay(300, withTiming(0));
      }, 1000);
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
    opacity: opacity.value,
  }));

  return (
    <TapGestureHandler ref={doubleTapRef} onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
      <Animated.View style={{ width, height: width, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: url }} style={StyleSheet.absoluteFillObject} />
        <Animated.View style={[animatedStyle, { position: 'absolute', zIndex: 10 }]}>
          <Ionicons name="heart" size={100} color="#ff3b30" />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  alertIcon: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  activeTabButton: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    color: '#999',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: '#000',
    marginBottom: 10,
  },
  storiesList: {
    paddingHorizontal: 10,
  },
  storyBubble: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 68,
  },
  storyAvatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#ff8a00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 4,
  },
  storyAvatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#333',
  },
  storyUsername: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subEmptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: '#000',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden'
  },
  avatarImg: {
    width: '100%',
    height: '100%'
  },
  username: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  moreOptionsBtn: {
    marginLeft: 'auto',
  },
  postImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  postText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  engagementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionIcon: {
    justifyContent: 'center',
  },
  actionIconRight: {
    justifyContent: 'center',
  },
  postFooter: {
    paddingHorizontal: 12,
  },
  likesCount: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },
  captionText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  captionUsername: {
    fontWeight: '700',
  },
  postDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  audioWaveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  waveLine: {
    width: 3,
    backgroundColor: '#555',
    borderRadius: 2,
  },
  audioDuration: {
    color: '#888',
    fontSize: 12,
    marginLeft: 12,
  },
  checkInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#112211',
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  checkInIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,230,118,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkInText: {
    color: '#00E676',
    fontWeight: 'bold',
    fontSize: 15,
  },
  checkInSubtext: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  }
});
