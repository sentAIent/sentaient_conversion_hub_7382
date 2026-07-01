import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreenWeb() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map is not supported on the web yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { color: 'white', fontSize: 18 }
});
