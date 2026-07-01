import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Share, Image, Modal, TextInput, Platform } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const GET_ME = gql`
  query GetMeProfile {
    me {
      id
      name
      username
      bio
      profilePhotoUrl
      trustScore
      streakCount
      referralCode
      proStatus
      proExpiresAt
      privacy
    }
  }
`;

const UPDATE_USER_DETAILS = gql`
  mutation UpdateUserDetails($name: String, $username: String, $bio: String, $profilePhotoUrl: String) {
    updateUserDetails(name: $name, username: $username, bio: $bio, profilePhotoUrl: $profilePhotoUrl) {
      id
      name
      username
      bio
      profilePhotoUrl
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($activeColors: [String!]!, $showOnColorMap: Boolean!) {
    updateOpennessProfile(activeColors: $activeColors, showOnColorMap: $showOnColorMap) {
      activeColors
      showOnColorMap
    }
  }
`;

const UPDATE_PRIVACY = gql`
  mutation UpdatePrivacy($isPrivate: Boolean!) {
    updatePrivacy(isPrivate: $isPrivate) {
      id
      privacy
    }
  }
`;

const COLORS = [
  { id: 'GREEN', label: 'Networking', hex: '#00E676', icon: 'briefcase' },
  { id: 'RED', label: 'Do Not Disturb', hex: '#FF1744', icon: 'remove-circle' },
  { id: 'ELECTRIC_BLUE', label: 'Dating', hex: '#00D2FF', icon: 'heart' },
  { id: 'ORANGE', label: 'Looking for Co-founder', hex: '#FF9100', icon: 'people' },
  { id: 'YELLOW', label: 'Socializing', hex: '#FFD600', icon: 'cafe' },
  { id: 'PURPLE', label: 'Hiring', hex: '#D500F9', icon: 'megaphone' },
  { id: 'PINK', label: 'Looking for Job', hex: '#F50057', icon: 'search' },
  { id: 'DARK_BLUE', label: 'Selling', hex: '#2962FF', icon: 'pricetag' },
];

export default function ProfileScreen() {
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [showOnMap, setShowOnMap] = useState(true);
  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');

  const { data: meData, refetch } = useQuery(GET_ME, {
    onCompleted: (data) => {
      if (data?.me) {
        setEditName(data.me.name || '');
        setEditUsername(data.me.username || '');
        setEditBio(data.me.bio || '');
        setEditPhotoUrl(data.me.profilePhotoUrl || '');
        setActiveColors(data.me.opennessProfile?.activeColors || []);
        setShowOnMap(data.me.opennessProfile?.showOnColorMap ?? true);
      }
    }
  });
  
  const [updateUserDetails, { loading: savingDetails }] = useMutation(UPDATE_USER_DETAILS);
  const [updateProfile, { loading: savingColors }] = useMutation(UPDATE_PROFILE);
  const [updatePrivacy] = useMutation(UPDATE_PRIVACY);

  const toggleColor = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveColors(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSaveColors = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    updateProfile({
      variables: {
        activeColors,
        showOnColorMap: showOnMap
      }
    });
  };

  const handleSaveDetails = async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await updateUserDetails({
        variables: {
          name: editName,
          username: editUsername,
          bio: editBio,
          profilePhotoUrl: editPhotoUrl
        }
      });
      setIsEditModalVisible(false);
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const code = meData?.me?.referralCode || '';
      await Share.share({
        message: `Join me on Icebreaker! Use my invite code: ${code}\n\nicebreaker://referral/${code}`,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getTier = (score: number) => {
    if (score < 3.0) return { name: 'Warning', color: '#FF1744' };
    if (score < 4.0) return { name: 'Bronze', color: '#CD7F32' };
    if (score < 4.5) return { name: 'Silver', color: '#C0C0C0' };
    if (score < 4.8) return { name: 'Gold', color: '#FFD700' };
    return { name: 'Platinum', color: '#E5E4E2' };
  };

  const me = meData?.me;
  const tier = me ? getTier(me.trustScore) : null;
  const isPrivate = me?.privacy === 'private';

  const handlePrivacyToggle = async (val: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await updatePrivacy({ variables: { isPrivate: val } });
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerUsername}>{me?.username || 'Profile'}</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="menu-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Info Row (Insta-style) */}
        <View style={styles.profileInfoRow}>
          <View style={styles.avatarContainer}>
            {me?.profilePhotoUrl ? (
              <Image source={{ uri: me.profilePhotoUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="person" size={40} color="#555" />
              </View>
            )}
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{me?.streakCount || 0}</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{me?.trustScore.toFixed(1) || '0.0'}</Text>
              <Text style={styles.statLabel}>Trust</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{me?.referralCount || 0}</Text>
              <Text style={styles.statLabel}>Invites</Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.bioName}>{me?.name || 'Your Name'}</Text>
          {me?.bio ? <Text style={styles.bioText}>{me.bio}</Text> : null}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => setIsEditModalVisible(true)}>
            <Text style={styles.actionButtonText}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Text style={styles.actionButtonText}>Share profile</Text>
          </TouchableOpacity>
        </View>

        {/* Tier & Gamification */}
        {me && (
          <BlurView intensity={20} tint="dark" style={styles.gamificationSection}>
            <View style={styles.gamificationHeader}>
              <View>
                <Text style={styles.gamificationTitle}>Trust Tier</Text>
                <Text style={[styles.tierName, { color: tier?.color }]}>{tier?.name}</Text>
              </View>
              <View style={styles.streakBadge}>
                <Text style={styles.streakIcon}>🔥</Text>
                <Text style={styles.streakCount}>{me.streakCount}</Text>
              </View>
            </View>

            <View style={styles.referralBox}>
              <Text style={styles.referralTitle}>Invite Friends, Get Pro</Text>
              <Text style={styles.referralDesc}>Share your code and you both get 7 days of Pro Status.</Text>
              <View style={styles.codeRow}>
                <Text style={styles.referralCode}>{me.referralCode}</Text>
                <TouchableOpacity style={styles.shareSmallButton} onPress={handleShare}>
                  <Text style={styles.shareSmallText}>Share</Text>
                </TouchableOpacity>
              </View>
              {me.proStatus && (
                <Text style={styles.proStatusText}>
                  ✨ PRO ACTIVE (Expires: {new Date(me.proExpiresAt).toLocaleDateString()})
                </Text>
              )}
            </View>
          </BlurView>
        )}

        {/* Settings & Privacy */}
        <BlurView intensity={20} tint="dark" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="eye" size={24} color="#fff" />
            <Text style={styles.sectionTitle}>Visibility</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Private Account</Text>
            <Switch 
              value={isPrivate} 
              onValueChange={handlePrivacyToggle} 
              trackColor={{ false: '#333', true: '#FF1744' }}
              thumbColor={isPrivate ? '#fff' : '#f4f3f4'}
            />
          </View>
          <Text style={[styles.subtitle, {marginTop: 5, marginBottom: 15}]}>If private, users must request to follow you.</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Show me on the Color Map</Text>
            <Switch 
              value={showOnMap} 
              onValueChange={(val) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setShowOnMap(val);
              }} 
              trackColor={{ false: '#333', true: '#00D2FF' }}
              thumbColor={showOnMap ? '#fff' : '#f4f3f4'}
            />
          </View>
        </BlurView>

        {/* Signals */}
        <View style={styles.sectionHeaderFlex}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="color-palette" size={24} color="#fff" />
            <Text style={styles.sectionTitle}>My Active Signals</Text>
          </View>
          <TouchableOpacity onPress={handleSaveColors} disabled={savingColors}>
            {savingColors ? <ActivityIndicator color="#00D2FF" size="small"/> : <Text style={styles.saveActionText}>Save</Text>}
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Select the colors that represent what you are open to right now.</Text>
        
        <View style={styles.grid}>
          {COLORS.map(color => {
            const isActive = activeColors.includes(color.id);
            return (
              <TouchableOpacity 
                key={color.id} 
                style={[styles.colorButton, isActive && { backgroundColor: `${color.hex}20`, borderColor: color.hex }]}
                onPress={() => toggleColor(color.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: isActive ? color.hex : '#333' }]}>
                  <Ionicons name={color.icon as any} size={20} color={isActive ? '#fff' : '#888'} />
                </View>
                <Text style={[styles.colorLabel, isActive && { color: color.hex, fontWeight: 'bold' }]}>{color.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModalVisible} animationType="slide" presentationStyle="formSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSaveDetails} disabled={savingDetails}>
              {savingDetails ? <ActivityIndicator color="#00D2FF" size="small"/> : <Text style={styles.modalDoneText}>Done</Text>}
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalForm}>
            <View style={styles.modalAvatarSection}>
              {editPhotoUrl ? (
                <Image source={{ uri: editPhotoUrl }} style={styles.modalAvatar} />
              ) : (
                <View style={[styles.modalAvatar, styles.avatarPlaceholder]}>
                  <Ionicons name="person" size={40} color="#555" />
                </View>
              )}
              <Text style={styles.modalEditPhotoText}>Provide Image URL below</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput 
                style={styles.input} 
                value={editName} 
                onChangeText={setEditName} 
                placeholder="Name" 
                placeholderTextColor="#666" 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput 
                style={styles.input} 
                value={editUsername} 
                onChangeText={setEditUsername} 
                placeholder="Username" 
                placeholderTextColor="#666" 
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput 
                style={[styles.input, { height: 80 }]} 
                value={editBio} 
                onChangeText={setEditBio} 
                placeholder="Bio" 
                placeholderTextColor="#666" 
                multiline
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Profile Photo URL</Text>
              <TextInput 
                style={styles.input} 
                value={editPhotoUrl} 
                onChangeText={setEditPhotoUrl} 
                placeholder="https://..." 
                placeholderTextColor="#666" 
                autoCapitalize="none"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f13' },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  headerUsername: { fontSize: 24, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  headerIcon: { padding: 5 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  
  profileInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatarContainer: { marginRight: 25 },
  avatar: { width: 85, height: 85, borderRadius: 45, borderWidth: 2, borderColor: '#333' },
  avatarPlaceholder: { backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 13, color: '#aaa', marginTop: 2 },

  bioSection: { marginBottom: 20 },
  bioName: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  bioText: { fontSize: 15, color: '#eee', lineHeight: 20 },

  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  actionButton: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  gamificationSection: {
    backgroundColor: 'rgba(30, 30, 35, 0.6)', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
    overflow: 'hidden'
  },
  gamificationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  gamificationTitle: { fontSize: 14, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 },
  tierName: { fontSize: 28, fontWeight: '900', marginTop: 4, marginBottom: 2 },
  streakBadge: { backgroundColor: 'rgba(255,69,0,0.2)', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 5 },
  streakIcon: { fontSize: 20 },
  streakCount: { fontSize: 20, fontWeight: 'bold', color: '#ff4500' },
  
  referralBox: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 15 },
  referralTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  referralDesc: { fontSize: 14, color: '#aaa', marginBottom: 15, lineHeight: 20 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#000', borderRadius: 8, padding: 10 },
  referralCode: { fontSize: 18, fontWeight: 'bold', color: '#00E676', letterSpacing: 2 },
  shareSmallButton: { backgroundColor: '#2962FF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6 },
  shareSmallText: { color: '#fff', fontWeight: 'bold' },
  proStatusText: { color: '#FFD700', fontWeight: 'bold', marginTop: 15, fontSize: 13, textAlign: 'center' },

  section: { 
    backgroundColor: 'rgba(30, 30, 35, 0.6)', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden'
  },
  sectionHeaderFlex: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingHorizontal: 5 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 10 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 14, color: '#aaa', marginBottom: 25, paddingHorizontal: 5 },
  saveActionText: { color: '#00D2FF', fontWeight: 'bold', fontSize: 16 },
  
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, color: '#ddd' },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  colorButton: { 
    width: '48%',
    backgroundColor: 'rgba(30, 30, 35, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  colorLabel: { fontSize: 15, color: '#aaa', fontWeight: '600' },

  modalContainer: { flex: 1, backgroundColor: '#111' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#222' },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalCancelText: { color: '#fff', fontSize: 16 },
  modalDoneText: { color: '#00D2FF', fontSize: 16, fontWeight: 'bold' },
  modalForm: { padding: 20 },
  modalAvatarSection: { alignItems: 'center', marginBottom: 30 },
  modalAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  modalEditPhotoText: { color: '#00D2FF', fontSize: 15, fontWeight: 'bold' },
  inputGroup: { marginBottom: 20 },
  inputLabel: { color: '#888', marginBottom: 8, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: '#222', color: '#fff', padding: 15, borderRadius: 10, fontSize: 16 }
});
