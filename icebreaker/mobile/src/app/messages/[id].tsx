import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { SkeletonLoader } from '../../components/SkeletonLoader';

const GET_MESSAGES = gql`
  query GetConversationMessages($userId: ID!) {
    conversationMessages(userId: $userId) {
      id
      text
      createdAt
      isRead
      senderId
      receiverId
      sender {
        id
        name
        username
      }
      sharedContent {
        id
        textBody
        mediaUrl
        user {
          username
        }
      }
    }
    userProfile(userId: $userId) {
      user {
        id
        name
        username
        profilePhotoUrl
      }
    }
    me {
      id
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($receiverId: ID!, $text: String!) {
    sendMessage(receiverId: $receiverId, text: $text) {
      id
      text
      createdAt
      isRead
      senderId
    }
  }
`;

const MARK_READ = gql`
  mutation MarkConversationRead($userId: ID!) {
    markConversationRead(userId: $userId)
  }
`;

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const { data, loading, error, refetch } = useQuery(GET_MESSAGES, {
    variables: { userId: id as string },
    // Remove pollInterval, relying on Firestore for real-time
  });

  const client = useApolloClient();

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [markRead] = useMutation(MARK_READ);

  useEffect(() => {
    if (data?.conversationMessages) {
      const hasUnread = data.conversationMessages.some((msg: any) => msg.receiverId === data.me?.id && !msg.isRead);
      if (hasUnread) {
        markRead({ variables: { userId: id as string } }).catch(console.error);
      }
    }
  }, [data, id, markRead]);

  useEffect(() => {
    const myId = data?.me?.id;
    const otherId = id as string;
    if (!myId || !otherId) return;
    
    const chatId = [myId, otherId].sort().join('_');
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef);
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newMsg = change.doc.data();
          
          const formattedMsg = {
            __typename: "Message",
            id: newMsg.id,
            text: newMsg.text,
            createdAt: newMsg.createdAt,
            isRead: newMsg.isRead,
            senderId: newMsg.senderId,
            receiverId: newMsg.receiverId,
            sender: {
               __typename: "User",
               id: newMsg.sender.id,
               name: newMsg.sender.name,
               username: null
            },
            sharedContent: null
          };
          
          const existing = client.readQuery<any>({
            query: GET_MESSAGES,
            variables: { userId: otherId }
          });
          
          if (existing && existing.conversationMessages) {
             const exists = existing.conversationMessages.find((m: any) => m.id === newMsg.id);
             if (!exists) {
                client.writeQuery({
                  query: GET_MESSAGES,
                  variables: { userId: otherId },
                  data: {
                    ...existing,
                    conversationMessages: [formattedMsg, ...existing.conversationMessages]
                  }
                });
             }
          }
        }
      });
    });
    
    return () => unsubscribe();
  }, [data?.me?.id, id, client]);

  if (loading && !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20 }}>
          <SkeletonLoader width="70%" height={45} borderRadius={20} style={{ alignSelf: 'flex-start', marginBottom: 15 }} />
          <SkeletonLoader width="60%" height={45} borderRadius={20} style={{ alignSelf: 'flex-end', marginBottom: 15 }} />
          <SkeletonLoader width="80%" height={45} borderRadius={20} style={{ alignSelf: 'flex-start', marginBottom: 15 }} />
          <SkeletonLoader width="50%" height={45} borderRadius={20} style={{ alignSelf: 'flex-end', marginBottom: 15 }} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/feed'))} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={{ color: '#ff4444' }}>Failed to load messages.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const messages = data?.conversationMessages || [];
  const otherUser = data?.userProfile?.user;
  const myId = data?.me?.id;

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const textToSend = inputText.trim();
    setInputText('');
    
    try {
      await sendMessage({ 
        variables: { receiverId: id as string, text: textToSend },
        update: (cache, { data: { sendMessage } }) => {
          const existing = cache.readQuery<any>({
            query: GET_MESSAGES,
            variables: { userId: id as string }
          });
          
          if (existing && existing.conversationMessages) {
            cache.writeQuery({
              query: GET_MESSAGES,
              variables: { userId: id as string },
              data: {
                ...existing,
                conversationMessages: [sendMessage, ...existing.conversationMessages]
              }
            });
          }
        }
      });
    } catch (e) {
      console.error('Failed to send message', e);
      setInputText(textToSend); // restore on fail
    }
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isMe = item.senderId === myId;

    return (
      <View style={[styles.messageBubbleContainer, isMe ? styles.messageBubbleContainerRight : styles.messageBubbleContainerLeft]}>
        {!isMe && (
          <View style={styles.messageAvatar}>
            <Ionicons name="person" size={16} color="#666" />
          </View>
        )}
        <View style={[styles.messageBubble, isMe ? styles.messageBubbleRight : styles.messageBubbleLeft]}>
          
          {item.sharedContent && (
            <TouchableOpacity 
              style={styles.sharedContentContainer}
              onPress={() => router.push('/')} // Ideally go to the specific post
            >
              <Text style={styles.sharedContentHeader}>
                <Ionicons name="share-social" size={12} color="#ccc" /> Post by @{item.sharedContent.user.username}
              </Text>
              {item.sharedContent.mediaUrl && (
                <Image source={{ uri: item.sharedContent.mediaUrl }} style={styles.sharedImage} contentFit="cover" />
              )}
              {item.sharedContent.textBody && (
                <Text style={styles.sharedText} numberOfLines={2}>{item.sharedContent.textBody}</Text>
              )}
            </TouchableOpacity>
          )}

          {item.text && <Text style={styles.messageText}>{item.text}</Text>}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/feed'))} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerUserInfo} onPress={() => router.push(`/user/${otherUser?.id}`)}>
          <View style={styles.headerAvatar}>
            <Ionicons name="person" size={20} color="#666" />
          </View>
          <Text style={styles.headerTitle}>{otherUser?.name || otherUser?.username || 'User'}</Text>
        </TouchableOpacity>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          inverted={true}
          contentContainerStyle={styles.listContainer}
        />
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Message..."
              placeholderTextColor="#666"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            {inputText.trim().length > 0 && (
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#000',
    zIndex: 10
  },
  backButton: { padding: 5 },
  headerUserInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },
  headerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  
  keyboardAvoid: { flex: 1 },
  listContainer: { paddingHorizontal: 15, paddingVertical: 20 },
  
  messageBubbleContainer: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  messageBubbleContainerLeft: { justifyContent: 'flex-start' },
  messageBubbleContainerRight: { justifyContent: 'flex-end' },
  
  messageAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  
  messageBubble: { maxWidth: '75%', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  messageBubbleLeft: { backgroundColor: '#262626', borderBottomLeftRadius: 4 },
  messageBubbleRight: { backgroundColor: '#3797F0', borderBottomRightRadius: 4 },
  
  messageText: { color: '#fff', fontSize: 15, lineHeight: 20 },
  
  sharedContentContainer: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 10, marginBottom: 8, width: 200 },
  sharedContentHeader: { color: '#ccc', fontSize: 12, marginBottom: 6, fontWeight: '600' },
  sharedImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 6 },
  sharedText: { color: '#fff', fontSize: 13 },
  
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#000'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 24,
    minHeight: 44,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 10,
  },
  sendButton: { paddingHorizontal: 10, paddingVertical: 10 },
  sendButtonText: { color: '#3797F0', fontWeight: 'bold', fontSize: 16 }
});
