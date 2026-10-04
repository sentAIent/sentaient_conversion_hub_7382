import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { generateDynamicQuest } from '../services/huggingfaceApi';

export function PremiumUI({ token, setToken }) {
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      generateDynamicQuest(token)
        .then(setQuest)
        .catch(e => console.error("Quest gen failed:", e))
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity 
        style={styles.toggleBtn}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.toggleIcon}>{isExpanded ? '×' : '⚡'}</Text>
        {!isExpanded && <Text style={styles.toggleText}>AI Premium</Text>}
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>AI GENERATED QUESTS</Text>
            {token && <View style={styles.activeDot} />}
          </View>
          
          {!token ? (
            <View>
              <Text style={styles.desc}>Unlock infinite procedural bounties powered by AI.</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter Hugging Face Token..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                secureTextEntry
                onSubmitEditing={(e) => setToken(e.nativeEvent.text)}
              />
            </View>
          ) : (
            <View>
              <View style={styles.questContainer}>
                <Text style={styles.questHeader}>DAILY BOUNTY</Text>
                {loading ? (
                  <View style={styles.loaderRow}>
                    <ActivityIndicator color="#ffffff" size="small" />
                    <Text style={styles.desc}>Synthesizing quest...</Text>
                  </View>
                ) : (
                  quest ? (
                    <View>
                      <Text style={styles.questTitle}>{quest.title}</Text>
                      <Text style={styles.questDesc}>{quest.description}</Text>
                      <View style={styles.rewardPill}>
                        <Text style={styles.rewardText}>REWARD: {quest.reward} XP</Text>
                      </View>
                    </View>
                  ) : <Text style={styles.desc}>Failed to load quest.</Text>
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 10,
  },
  toggleBtn: {
    backgroundColor: 'rgba(15, 20, 30, 0.5)',
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  toggleIcon: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
  toggleText: { color: '#ffffff', fontWeight: '600', fontSize: 13, marginLeft: 8 },
  card: {
    marginTop: 15, backgroundColor: 'rgba(15, 20, 30, 0.75)',
    padding: 24, borderRadius: 16, width: 320, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: { color: '#ffffff', fontWeight: '800', fontSize: 13, letterSpacing: 1.5 },
  desc: { fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 20, marginBottom: 15 },
  input: { 
    width: '100%', padding: 14, backgroundColor: 'rgba(0,0,0,0.3)', 
    color: '#fff', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  questContainer: { 
    backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
});
