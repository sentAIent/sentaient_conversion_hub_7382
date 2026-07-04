import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, RefreshControl, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useCart } from '../../context/CartContext';
import StoryModal from '../../components/StoryModal';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { AnimatedButton } from '../../components/AnimatedButton';
import { useVideoPlayer, VideoView } from 'expo-video';

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
        productTags {
          id
          product {
            id
            name
            price
            imageUrl
          }
        }
        likesCount
        commentsCount
        hasLiked
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
        productTags {
          id
          product {
            id
            name
            price
            imageUrl
          }
        }
        likesCount
        commentsCount
        hasLiked
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

const COMMENT_MUTATION = gql`
  mutation CommentContent($contentId: ID!, $text: String!) {
    commentContent(contentId: $contentId, text: $text) {
      id
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($receiverId: ID!, $sharedContentId: ID!) {
    sendMessage(receiverId: $receiverId, sharedContentId: $sharedContentId) {
      id
    }
  }
`;

const GET_FOLLOWING = gql`
  query GetFollowingUsers {
    followerFeed {
      __typename
      ... on Content {
        user {
          id
          name
          username
          profilePhotoUrl
        }
      }
    }
  }
`;

const { width } = Dimensions.get('window');

export default function FeedScreen() {
  const router = useRouter();
  const { cartCount } = useCart();
  const [showPromo, setShowPromo] = useState(true);
  const [selectedPostToShare, setSelectedPostToShare] = useState<any>(null);
  const [selectedPostToComment, setSelectedPostToComment] = useState<any>(null);

  const { data: followingData } = useQuery(GET_FOLLOWING, { fetchPolicy: 'cache-first' });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { data, loading, error, refetch } = useQuery(FOLLOWER_FEED_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  
  const [likeContent] = useMutation(LIKE_MUTATION);
  const [unlikeContent] = useMutation(UNLIKE_MUTATION);
  const [commentContent] = useMutation(COMMENT_MUTATION);

  const [activeTab, setActiveTab] = useState<'following' | 'explore'>('explore');
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
          <TouchableOpacity style={styles.avatar} onPress={() => router.push(`/user/${item.user.id}`)}>
            {item.user.profilePhotoUrl ? (
              <Image source={{ uri: item.user.profilePhotoUrl }} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={20} color="#666" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/user/${item.user.id}`)}>
            <Text style={styles.username}>{item.user.username}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreOptionsBtn}>
            <Feather name="more-horizontal" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        {isMedia && item.mediaUrl && (
          item.type === 'video' ? (
            <View style={styles.postImageContainer}>
              <FeedVideo url={item.mediaUrl} />
            </View>
          ) : (
            <PostImage 
              url={item.mediaUrl} 
              onLike={async () => {
                if (!item.hasLiked) {
                  await likeContent({ variables: { contentId: item.id } });
                  refetch();
                }
              }} 
            />
          )
        )}
        {item.type === 'text' && item.textBody && (
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
        
        {item.productTags && item.productTags.length > 0 && (
          <ShoppableTags tags={item.productTags} />
        )}

        <View style={styles.engagementRow}>
          <View style={styles.leftActionGroup}>
            <AnimatedButton 
              onPress={async () => {
                if (item.hasLiked) {
                  await unlikeContent({ variables: { contentId: item.id } });
                } else {
                  await likeContent({ variables: { contentId: item.id } });
                }
                refetch();
              }} 
              style={styles.actionIcon}
              hapticType="success"
            >
              <Feather name="heart" size={24} color={item.hasLiked ? "#ff3b30" : "#fff"} />
            </AnimatedButton>
            <AnimatedButton style={styles.actionIcon} onPress={() => setSelectedPostToComment(item)} hapticType="light">
              <Feather name="message-circle" size={24} color="#fff" />
            </AnimatedButton>
            <AnimatedButton style={styles.actionIcon} onPress={() => setSelectedPostToShare(item)} hapticType="light">
              <Feather name="send" size={24} color="#fff" />
            </AnimatedButton>
          </View>
          <AnimatedButton style={styles.actionIconRight} hapticType="light">
            <Feather name="bookmark" size={24} color="#fff" />
          </AnimatedButton>
        </View>

        <View style={styles.postFooter}>
          <Text style={styles.likesCount}>{(item.likesCount || 0).toLocaleString()} likes</Text>
          {isMedia && item.textBody && (
            <Text style={styles.captionText}>
              <Text style={styles.captionUsername}>{item.user.username}</Text> {item.textBody}
            </Text>
          )}
          {(item.commentsCount || 0) > 0 && (
             <TouchableOpacity style={{ marginTop: 5 }} onPress={() => setSelectedPostToComment(item)}>
               <Text style={{ color: '#aaa', fontSize: 14 }}>View all {item.commentsCount} comments</Text>
             </TouchableOpacity>
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
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.alertIcon} onPress={() => router.push('/cart')}>
            <Ionicons name="cart-outline" size={28} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.alertIcon} onPress={() => router.push('/alerts')}>
            <Ionicons name="notifications-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {showPromo && (
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Ionicons name="flash" size={20} color="#FFD700" />
            <Text style={styles.promoText}>Flash Sale: 20% off all tagged items today!</Text>
          </View>
          <TouchableOpacity onPress={() => setShowPromo(false)}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

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
        <View style={styles.listContent}>
          {[1,2,3].map(i => (
             <View key={i} style={styles.postCard}>
                <View style={styles.postHeader}>
                   <SkeletonLoader width={32} height={32} borderRadius={16} />
                   <SkeletonLoader width={120} height={14} style={{ marginLeft: 10 }} />
                </View>
                <SkeletonLoader width="100%" height={300} borderRadius={0} />
             </View>
          ))}
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
        
      <ShareModal 
        visible={!!selectedPostToShare} 
        onClose={() => setSelectedPostToShare(null)} 
        post={selectedPostToShare}
        followingData={followingData}
        sendMessage={sendMessage}
      />
      
      <CommentModal 
        visible={!!selectedPostToComment} 
        onClose={() => setSelectedPostToComment(null)} 
        post={selectedPostToComment}
        commentContent={commentContent}
        refetch={refetch}
      />
    </SafeAreaView>
  );
}

const PostImage: React.FC<{ url: string, onLike?: () => void }> = ({ url, onLike }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const doubleTapRef = useRef(null);

  const onDoubleTap = useCallback((event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      scale.value = withSpring(1, { damping: 12 });
      opacity.value = withSpring(1);
      
      if (onLike) {
        onLike();
      }
      
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
      <Animated.View style={styles.postImageContainer}>
        <Image source={{ uri: url }} style={styles.postImageInside} />
        <Animated.View style={[animatedStyle, { position: 'absolute', zIndex: 10, alignSelf: 'center', top: '50%', marginTop: -50 }]}>
          <Ionicons name="heart" size={100} color="#ff3b30" />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
}

const FeedVideo: React.FC<{ url: string }> = ({ url }) => {
  const player = useVideoPlayer(url, player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });
  
  return (
    <VideoView 
      player={player} 
      style={styles.postImageInside} 
      nativeControls={false}
      contentFit="cover"
    />
  );
};

const ShoppableTags: React.FC<{ tags: any[] }> = ({ tags }) => {
  const { addToCart } = useCart();

  const handleShop = (item: any) => {
    addToCart(item);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    alert('Added to Cart!');
  };

  return (
    <View style={styles.shoppableContainer}>
      <View style={styles.shoppableHeader}>
        <Ionicons name="pricetag" size={16} color="#FFD700" />
        <Text style={styles.shoppableTitle}>Shop this Post</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tags}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.shoppableCard}>
            {item.product.imageUrl ? (
              <Image source={{ uri: item.product.imageUrl }} style={styles.shoppableImage} />
            ) : (
              <View style={[styles.shoppableImage, styles.shoppableImagePlaceholder]}>
                <Ionicons name="image-outline" size={24} color="#666" />
              </View>
            )}
            <View style={styles.shoppableInfo}>
              <Text style={styles.shoppableName} numberOfLines={1}>{item.product.name}</Text>
              <Text style={styles.shoppablePrice}>${(item.product.price / 100).toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton} onPress={() => handleShop(item)}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

function ShareModal({ visible, onClose, post, followingData, sendMessage }: any) {
  if (!visible) return null;
  
  const usersToShare = React.useMemo(() => {
    if (!followingData?.followerFeed) return [];
    const userMap = new Map();
    followingData.followerFeed.forEach((f: any) => {
      if (f.user && f.__typename === 'Content' && !userMap.has(f.user.id)) {
        userMap.set(f.user.id, f.user);
      }
    });
    return Array.from(userMap.values());
  }, [followingData]);

  const handleSend = async (userId: string) => {
    try {
      await sendMessage({ variables: { receiverId: userId, sharedContentId: post.id } });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Send to...</Text>
            <TouchableOpacity onPress={onClose}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
          </View>
          <FlatList
            data={usersToShare}
            keyExtractor={(u: any) => u.id}
            renderItem={({ item }) => (
              <View style={styles.shareUserRow}>
                <View style={styles.shareUserInfo}>
                  <View style={styles.shareUserAvatar}>
                    <Ionicons name="person" size={20} color="#666" />
                  </View>
                  <View>
                    <Text style={styles.shareUserName}>{item.name || item.username}</Text>
                    <Text style={styles.shareUserHandle}>@{item.username}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.btnSendShare} onPress={() => handleSend(item.id)}>
                  <Text style={styles.btnSendShareText}>Send</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>No friends found</Text>}
          />
        </View>
      </View>
    </Modal>
  );
}

function CommentModal({ visible, onClose, post, commentContent, refetch }: any) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!visible || !post) return null;

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await commentContent({ variables: { contentId: post.id, text } });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setText('');
      refetch();
      onClose();
    } catch (e) {
      console.error(e);
      alert('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView 
        style={styles.modalOverlay} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.modalContent, { height: '50%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Comments</Text>
            <TouchableOpacity onPress={onClose}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
          </View>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="#888"
              value={text}
              onChangeText={setText}
              multiline
              autoFocus
            />
            <TouchableOpacity 
              style={[styles.btnSendShare, { opacity: !text.trim() || submitting ? 0.5 : 1 }]} 
              onPress={handleSubmit}
              disabled={!text.trim() || submitting}
            >
              <Text style={styles.btnSendShareText}>{submitting ? '...' : 'Post'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
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
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#1c1c1e',
    borderRadius: 24,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
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
    paddingBottom: 120, // Increased to prevent overlap with bottom tabs
    paddingTop: 8,
  },
  postCard: {
    backgroundColor: '#111',
    marginHorizontal: 12,
    marginBottom: 24,
    borderRadius: 20, // softer rounding
    borderWidth: 1,
    borderColor: '#222',
    paddingBottom: 16, // more breathing room at bottom
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
      }
    }),
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
  postImageContainer: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  postImageInside: {
    width: '100%',
    height: '100%',
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
  },
  shoppableContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  shoppableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
    gap: 5,
  },
  shoppableTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  shoppableCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E24',
    borderRadius: 12,
    padding: 8,
    marginLeft: 12,
    marginRight: 4,
    minWidth: 200,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  shoppableImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 10,
  },
  shoppableImagePlaceholder: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shoppableInfo: {
    flex: 1,
  },
  shoppableName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  shoppablePrice: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  buyButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#332a00',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#665400',
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promoText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1c1c1e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '60%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  shareUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shareUserName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  shareUserHandle: {
    color: '#888',
    fontSize: 13,
  },
  btnSendShare: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  btnSendShareText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 16,
    gap: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 40,
    maxHeight: 120,
  }
});
