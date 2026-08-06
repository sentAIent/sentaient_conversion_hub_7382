import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const MOCK_GEAR = [
  { 
    id: 1, 
    type: 'Board', 
    name: 'Jones Flagship 161', 
    daysRidden: 24, 
    lifespan: 100, 
    needsService: true, // Needs wax
    serviceMsg: 'Needs Wax!' 
  },
  { 
    id: 2, 
    type: 'Bindings', 
    name: 'Burton Step On X', 
    daysRidden: 45, 
    lifespan: 150, 
    needsService: false 
  },
  { 
    id: 3, 
    type: 'Boots', 
    name: 'Vans Infuse', 
    daysRidden: 85, 
    lifespan: 100, 
    needsService: true, // Getting worn out
    serviceMsg: 'Pack out imminent' 
  },
];

export function GearQuiver() {
  const [isOpen, setIsOpen] = useState(false);
  const [gearData, setGearData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGear = async () => {
    if (!isSupabaseConfigured()) {
      setGearData(MOCK_GEAR);
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('gear')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedData = data.map(item => {
        const needsService = item.days_ridden > (item.lifespan * 0.85); // Needs service at 85% life
        return {
          id: item.id,
          type: item.type,
          name: `${item.brand} ${item.model}`,
          daysRidden: item.days_ridden,
          lifespan: item.lifespan,
          needsService: needsService,
          serviceMsg: needsService ? 'Check conditions!' : ''
        };
      });
      
      setGearData(formattedData);
    } catch (err) {
      console.error('Error fetching gear:', err);
      setGearData(MOCK_GEAR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchGear();
    }
  }, [isOpen]);

  const handleAddNewGear = async () => {
    if (!isSupabaseConfigured()) {
      alert("Please configure Supabase first to add live gear!");
      return;
    }
    
    try {
      const { error } = await supabase.from('gear').insert([{
        brand: 'Capita',
        model: 'Mercury',
        type: 'Board',
        days_ridden: 0,
        lifespan: 120
      }]);
      
      if (error) throw error;
      
      // Refresh list
      fetchGear();
    } catch (err) {
      console.error('Error adding gear:', err);
      alert('Error adding gear');
    }
  };

  if (!isOpen) {
    return (
      <TouchableOpacity 
        style={styles.openBtn} 
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.btnText}>🏂 Gear</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.drawer}>
      <View style={styles.header}>
        <Text style={styles.title}>🏂 My Quiver</Text>
        <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.iconBtn}>
          <Text style={styles.iconText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Gear Health & Tracking {loading && '(Loading...)'}</Text>

      <ScrollView style={styles.list}>
        {gearData.map((item) => {
          const healthPercent = Math.max(0, 100 - (item.daysRidden / item.lifespan) * 100);
          
          let healthColor = '#33ff99'; // Green
          if (healthPercent < 40 || item.needsService) healthColor = '#ff9933'; // Orange
          if (healthPercent < 15) healthColor = '#ff3366'; // Red

          return (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemType}>{item.type}</Text>
                <Text style={styles.itemDays}>{item.daysRidden} Days Ridden</Text>
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
              
              <View style={styles.healthBarContainer}>
                <View style={[styles.healthBarFill, { width: `${healthPercent}%`, backgroundColor: healthColor }]} />
              </View>

              {item.needsService && (
                <Text style={[styles.serviceText, { color: healthColor }]}>⚠️ {item.serviceMsg}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.addBtn} onPress={handleAddNewGear}>
        <Text style={styles.addBtnText}>+ ADD NEW GEAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  openBtn: {
    position: 'absolute',
    top: 180, // Placed below the Leaderboard button
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    zIndex: 20,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  drawer: {
    position: 'absolute',
    top: 180, // Offset below the leaderboard area or over it
    right: 20,
    width: 350,
    height: 480,
    backgroundColor: 'rgba(11, 17, 32, 0.8)', // Deep glassmorphism
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    zIndex: 25,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
    marginBottom: 15,
  },
  list: {
    flex: 1,
  },
  itemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemType: {
    color: '#888',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  itemDays: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthBarContainer: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  healthBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  serviceText: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addBtn: {
    marginTop: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
