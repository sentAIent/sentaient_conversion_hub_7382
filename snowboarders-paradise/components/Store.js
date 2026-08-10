import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MockBackend } from '../utils/mockBackend';

export function Store({ onClose }) {
  const [coins, setCoins] = useState(0);
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    MockBackend.loadProgression().then(data => {
      setCoins(data.coins || 0);
      setUnlocked(data.unlocked || []);
    });
  }, []);

  const buyItem = async (id, price) => {
    if (coins >= price && !unlocked.includes(id)) {
      const newCoins = coins - price;
      const newUnlocked = [...unlocked, id];
      setCoins(newCoins);
      setUnlocked(newUnlocked);
      await MockBackend.saveProgression({ coins: newCoins, unlocked: newUnlocked });
    }
  };

  const items = [
    { id: 'titanium_board', name: 'Titanium Board', desc: '2x Melee Damage', price: 1000 },
    { id: 'double_jump', name: 'Double Jump', desc: 'Jump again in mid-air', price: 2500 },
    { id: 'magnetic_coins', name: 'Magnetism', desc: 'Pull coins from further away', price: 5000 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NEON UPGRADES</Text>
        <Text style={styles.balance}>🪙 {coins} Coins</Text>
      </View>

      <ScrollView style={styles.list}>
        {items.map(item => {
          const isOwned = unlocked.includes(item.id);
          const canAfford = coins >= item.price;
          return (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.buyBtn, isOwned ? styles.buyBtnOwned : (canAfford ? styles.buyBtnCanAfford : styles.buyBtnDisabled)]}
                onPress={() => buyItem(item.id, item.price)}
                disabled={isOwned || !canAfford}
              >
                <Text style={styles.buyText}>{isOwned ? 'OWNED' : `🪙 ${item.price}`}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeBtnText}>BACK TO SLOPES</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 5, 20, 0.95)',
    zIndex: 1000,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#00ffff',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00ffff',
    letterSpacing: 2,
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffdd00',
  },
  list: {
    flex: 1,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  itemDesc: { fontSize: 14, color: '#aaa' },
  buyBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 15,
  },
  buyBtnCanAfford: { backgroundColor: '#00ffff' },
  buyBtnDisabled: { backgroundColor: 'rgba(255,255,255,0.1)' },
  buyBtnOwned: { backgroundColor: '#ff0077' },
  buyText: { color: '#01010a', fontWeight: '900', fontSize: 14 },
  closeBtn: {
    backgroundColor: '#ff0077',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  closeBtnText: { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 2 }
});
