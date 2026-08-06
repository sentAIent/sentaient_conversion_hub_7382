import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { useUnits } from './UnitContext';

const MOCK_LEADERBOARD = [
  { id: 1, name: 'Travis Rice', high_score: 846587 },
  { id: 2, name: 'Marcus Kleveland', high_score: 745275 },
  { id: 3, name: 'Chloe Kim', high_score: 641010 },
  { id: 4, name: 'You (Synced)', high_score: 530840 },
  { id: 5, name: 'Mark McMorris', high_score: 429199 },
];

export function Leaderboard({ regionName }) {
  const [viewState, setViewState] = useState('DRAWER');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatElevation } = useUnits();

  useEffect(() => {
    async function fetchLeaderboard() {
      let dataToFormat = [];
      if (!isSupabaseConfigured()) {
        // Fallback to mock data if no Supabase keys provided
        dataToFormat = MOCK_LEADERBOARD;
      } else {
        try {
          const { data, error } = await supabase
            .from('riders')
            .select('*')
            .order('high_score', { ascending: false })
            .limit(10);

          if (error) throw error;
          dataToFormat = data.map(rider => ({
            id: rider.id,
            name: rider.username,
            high_score: rider.high_score
          }));
        } catch (err) {
          console.error('Error fetching leaderboard:', err);
          dataToFormat = MOCK_LEADERBOARD; // Fallback on error
        }
      }
      
      // Map database/mock schema to frontend format
      const formattedData = dataToFormat.map(rider => ({
        id: rider.id,
        name: rider.name,
        metric: rider.high_score.toLocaleString(),
        title: 'Trick Score'
      }));
      
      setLeaderboardData(formattedData);
      setLoading(false);
    }

    fetchLeaderboard();
  }, [formatElevation]);

  if (viewState === 'HIDDEN') {
    return (
      <TouchableOpacity 
        style={styles.openBtn} 
        onPress={() => setViewState('DRAWER')}
      >
        <Text style={styles.btnText}>🏆 Leaderboard</Text>
      </TouchableOpacity>
    );
  }

  const isMaximized = viewState === 'MAXIMIZED';

  return (
    <View style={[styles.container, isMaximized ? styles.maximized : styles.drawer]}>
      {/* Header controls */}
      <View style={styles.header}>
        <Text style={styles.title}>🏆 {regionName} Sessions</Text>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => setViewState(isMaximized ? 'DRAWER' : 'MAXIMIZED')} style={styles.iconBtn}>
            <Text style={styles.iconText}>{isMaximized ? '🗗' : '🗖'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setViewState('HIDDEN')} style={styles.iconBtn}>
            <Text style={styles.iconText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtitle}>Top Riders this Week {loading && '(Loading...)'}</Text>

      {/* Leaderboard List */}
      <ScrollView style={styles.list}>
        {leaderboardData.map((rider, index) => (
          <View key={rider.id} style={[styles.row, rider.name === 'You (Synced)' && styles.highlightRow]}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>{index + 1}</Text>
            </View>
            <Text style={styles.riderName}>{rider.name}</Text>
            <View style={styles.metricContainer}>
              <Text style={styles.metricVal}>{rider.metric}</Text>
              <Text style={styles.metricTitle}>{rider.title}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  openBtn: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    zIndex: 20,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(20, 30, 50, 0.4)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    zIndex: 20,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    top: 120,
    right: 20,
    width: 350,
    height: 500,
    borderRadius: 20,
    padding: 20,
  },
  maximized: {
    top: 40,
    left: 20,
    right: 20,
    bottom: 40,
    borderRadius: 30,
    padding: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    gap: 15,
  },
  iconBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
  },
  iconText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    color: '#aaddff',
    fontSize: 14,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  highlightRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: -10,
  },
  rankContainer: {
    width: 30,
    alignItems: 'center',
  },
  rank: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  riderName: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  metricContainer: {
    alignItems: 'flex-end',
  },
  metricVal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  metricTitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
  }
});
