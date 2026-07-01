import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView, Dimensions } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const GET_NETWORK_DATA = gql`
  query GetNetworkData {
    me {
      id
      name
      trustScore
    }
    activeCheckIns {
      id
      userId
      privacyTier
      fuzzyLatitude
      fuzzyLongitude
    }
    myMeetingRequests {
      id
      senderId
      receiverId
      status
      proposedTime
      locationName
    }
    pendingFollowRequests {
      id
      name
      username
      profilePhotoUrl
    }
  }
`;

const RESPOND_MEETING = gql`
  mutation RespondMeeting($requestId: ID!, $status: String!) {
    respondToMeetingRequest(requestId: $requestId, status: $status) {
      id
      status
    }
  }
`;

const APPROVE_REQUEST = gql`
  mutation ApproveFollowRequest($userId: ID!) {
    approveFollowRequest(userId: $userId)
  }
`;

const REJECT_REQUEST = gql`
  mutation RejectFollowRequest($userId: ID!) {
    rejectFollowRequest(userId: $userId)
  }
`;

const { width } = Dimensions.get('window');

export default function NetworkScreen() {
  const { data, loading, error, refetch } = useQuery(GET_NETWORK_DATA);
  const [respond] = useMutation(RESPOND_MEETING);
  const [approveFollowRequest] = useMutation(APPROVE_REQUEST);
  const [rejectFollowRequest] = useMutation(REJECT_REQUEST);
  const router = useRouter();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Syncing Network...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Connection lost.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const checkIns = data?.activeCheckIns || [];
  const myId = data?.me?.id;
  const requests = data?.myMeetingRequests || [];
  const followRequests = data?.pendingFollowRequests || [];

  const handleRespond = async (id: string, status: string) => {
    try {
      await respond({ variables: { requestId: id, status } });
      Alert.alert("Status Updated", `Meeting ${status.toLowerCase()}`);
      refetch();
    } catch (e) {
      Alert.alert("Error", "Failed to respond");
    }
  };

  const handleApproveFollow = async (userId: string) => {
    await approveFollowRequest({ variables: { userId } });
    refetch();
  };

  const handleRejectFollow = async (userId: string) => {
    await rejectFollowRequest({ variables: { userId } });
    refetch();
  };

  const handleUserTap = (userId: string) => {
    router.push({ pathname: '/schedule', params: { receiverId: userId } });
  };

  const renderRequest = ({ item }: any) => {
    const isReceived = item.receiverId === myId;
    const isPending = item.status === 'PENDING';
    
    // Add logic to show rating button if accepted and past time (simplified)
    const isAccepted = item.status === 'ACCEPTED';
    const targetUserId = isReceived ? item.senderId : item.receiverId;

    return (
      <BlurView intensity={20} tint="dark" style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name={isReceived ? "arrow-down-circle" : "arrow-up-circle"} size={24} color={isReceived ? "#00D2FF" : "#9D50BB"} />
          <Text style={styles.cardTitle}>{isReceived ? 'Incoming Request' : 'Sent Request'}</Text>
        </View>
        
        <View style={styles.cardBody}>
          <Text style={styles.detailText}><Ionicons name="location" size={14} color="#aaa"/> {item.locationName}</Text>
          <Text style={styles.detailText}><Ionicons name="time" size={14} color="#aaa"/> {new Date(Number(item.proposedTime)).toLocaleString([], {month:'short', day:'numeric', hour: '2-digit', minute:'2-digit'})}</Text>
          <Text style={styles.statusText(item.status)}>{item.status}</Text>
        </View>
        
        {isReceived && isPending && (
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.btnAccept} onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              handleRespond(item.id, 'ACCEPTED');
            }}>
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDecline} onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
              handleRespond(item.id, 'DECLINED');
            }}>
              <Text style={styles.btnText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}

        {isAccepted && (
           <TouchableOpacity 
             style={styles.btnRate} 
             onPress={() => router.push({ pathname: '/rating', params: { targetUserId } })}
           >
             <Ionicons name="star" size={16} color="#fff" style={{marginRight: 6}} />
             <Text style={styles.btnText}>Leave Feedback</Text>
           </TouchableOpacity>
        )}
      </BlurView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Messages</Text>
      
      <FlatList
        data={requests}
        keyExtractor={item => item.id}
        renderItem={renderRequest}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <>
            {followRequests.length > 0 && (
              <View style={styles.followRequestsContainer}>
                <View style={styles.followRequestsHeader}>
                  <Ionicons name="person-add" size={20} color="#fff" />
                  <Text style={styles.followRequestsTitle}>Follow Requests</Text>
                </View>
                {followRequests.map((req: any) => (
                  <View key={req.id} style={styles.followRequestRow}>
                    <View style={styles.followRequestInfo}>
                      <View style={styles.followRequestAvatar}>
                        <Ionicons name="person" size={20} color="#666" />
                      </View>
                      <View>
                        <Text style={styles.followRequestName}>{req.name}</Text>
                        <Text style={styles.followRequestUsername}>@{req.username}</Text>
                      </View>
                    </View>
                    <View style={styles.followRequestActions}>
                      <TouchableOpacity style={styles.actionBtnApproveSmall} onPress={() => handleApproveFollow(req.id)}>
                        <Text style={styles.actionBtnTextSmall}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionBtnRejectSmall} onPress={() => handleRejectFollow(req.id)}>
                        <Ionicons name="close" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
            <Text style={styles.sectionHeaderTitle}>Meeting Requests</Text>
          </>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="mail-open-outline" size={48} color="#444" />
            <Text style={styles.emptyText}>No meeting requests yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f13' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageTitle: { fontSize: 32, fontWeight: '800', color: '#fff', marginLeft: 20, marginTop: 20, marginBottom: 10, letterSpacing: 0.5 },
  sectionHeaderTitle: { fontSize: 18, fontWeight: '700', color: '#ccc', marginBottom: 15, marginTop: 10 },
  listContainer: { padding: 20, paddingBottom: 100 },
  loadingText: { color: '#888', fontSize: 16 },
  errorText: { color: '#ff4444', fontSize: 16 },
  emptyContainer: { alignItems: 'center', marginTop: 100, opacity: 0.5 },
  emptyText: { color: '#fff', marginTop: 10, fontSize: 16 },
  
  card: { 
    borderRadius: 16, 
    marginBottom: 16, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(30, 30, 35, 0.6)'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginLeft: 10 },
  cardBody: { padding: 16 },
  detailText: { color: '#ccc', fontSize: 15, marginBottom: 8 },
  statusText: (status: string) => ({
    color: status === 'ACCEPTED' ? '#00E676' : status === 'DECLINED' ? '#FF1744' : '#FFD600',
    fontWeight: '700',
    marginTop: 5,
    fontSize: 14,
    letterSpacing: 1
  }),
  actionRow: { flexDirection: 'row', padding: 16, paddingTop: 0, gap: 10 },
  btnAccept: { flex: 1, backgroundColor: 'rgba(0, 230, 118, 0.2)', borderWidth: 1, borderColor: '#00E676', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnDecline: { flex: 1, backgroundColor: 'rgba(255, 23, 68, 0.2)', borderWidth: 1, borderColor: '#FF1744', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnRate: { 
    flexDirection: 'row',
    backgroundColor: 'rgba(157, 80, 187, 0.3)', 
    borderWidth: 1, 
    borderColor: '#9D50BB', 
    padding: 12, 
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    marginTop: 0
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  followRequestsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  followRequestsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  followRequestsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  followRequestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  followRequestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  followRequestAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  followRequestName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  followRequestUsername: {
    color: '#aaa',
    fontSize: 13,
  },
  followRequestActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnApproveSmall: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionBtnRejectSmall: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 6,
    borderRadius: 6,
  },
  actionBtnTextSmall: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  }
});
