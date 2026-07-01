import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface StoryModalProps {
  visible: boolean;
  onClose: () => void;
  story: any; // Story data
}

export default function StoryModal({ visible, onClose, story }: StoryModalProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && story) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          onClose();
        }
      });
    } else {
      progress.stopAnimation();
    }
  }, [visible, story]);

  if (!story) return null;

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        {/* Progress bar mock */}
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>

        <View style={styles.header}>
          <View style={styles.userInfo}>
            {story.user.profilePhotoUrl ? (
              <Image source={{ uri: story.user.profilePhotoUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={16} color="#fff" />
              </View>
            )}
            <Text style={styles.username}>{story.user.username}</Text>
            <Text style={styles.timeAgo}>2h</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {['photo', 'video'].includes(story.type) && story.mediaUrl ? (
            <Image source={{ uri: story.mediaUrl }} style={styles.mediaContent} />
          ) : story.type === 'audio' ? (
            <View style={styles.audioContent}>
              <Ionicons name="mic" size={64} color="#ff8a00" />
              <Text style={styles.audioText}>Voice Note</Text>
            </View>
          ) : (
            <View style={styles.textContent}>
              <Text style={styles.textBody}>{story.textBody}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressBarContainer: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginTop: 50,
    marginHorizontal: 10,
    borderRadius: 1,
  },
  progressBarFill: {
    width: '40%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  timeAgo: {
    color: '#aaa',
    fontSize: 14,
  },
  closeBtn: {
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaContent: {
    width: width,
    height: height * 0.7,
    resizeMode: 'contain',
  },
  audioContent: {
    alignItems: 'center',
  },
  audioText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold',
  },
  textContent: {
    padding: 30,
  },
  textBody: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32,
  }
});
