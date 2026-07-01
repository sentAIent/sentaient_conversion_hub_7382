import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GET_ALERTS = gql`
  query GetAlerts {
    alerts {
      id
      type
      message
      isRead
      createdAt
      actor {
        id
        name
        username
      }
    }
  }
`;

const MARK_READ = gql`
  mutation MarkRead($id: ID!) {
    markAlertRead(id: $id)
  }
`;

export default function AlertsScreen() {
  const { data, loading, error, refetch } = useQuery(GET_ALERTS);
  const [markRead] = useMutation(MARK_READ);
  const router = useRouter();

  const handlePress = async (alert: any) => {
    if (!alert.isRead) {
      await markRead({ variables: { id: alert.id } });
      refetch();
    }
    
    // Navigate based on type
    if (alert.actor) {
      router.push({ pathname: '/user/[id]', params: { id: alert.actor.id } });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'FOLLOW_REQUEST': return <Ionicons name="person-add" size={24} color="#3b82f6" />;
      case 'FOLLOW_ACCEPTED': return <Ionicons name="person-circle" size={24} color="#00E676" />;
      case 'LIKE': return <Ionicons name="heart" size={24} color="#FF1744" />;
      case 'COMMENT': return <Ionicons name="chatbubble" size={24} color="#fff" />;
      default: return <Ionicons name="notifications" size={24} color="#aaa" />;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.loadingText}>Loading alerts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const alerts = data?.alerts || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      
      <FlatList
        data={alerts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="notifications-off" size={48} color="#444" />
            <Text style={styles.emptyText}>No notifications yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.alertCard, !item.isRead && styles.unreadCard]}
            onPress={() => handlePress(item)}
          >
            <View style={styles.iconContainer}>
              {getIcon(item.type)}
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertMessage}>
                {item.actor ? <Text style={styles.actorName}>{item.actor.username} </Text> : null}
                {item.message}
              </Text>
              <Text style={styles.time}>{new Date(parseInt(item.createdAt)).toLocaleDateString()}</Text>
            </View>
            {!item.isRead && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backBtn: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#888',
  },
  list: {
    padding: 15,
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#666',
    marginTop: 10,
    fontSize: 16,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  unreadCard: {
    backgroundColor: '#1a1a2e',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 20,
  },
  actorName: {
    fontWeight: 'bold',
    color: '#fff',
  },
  time: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    marginLeft: 10,
  }
});
