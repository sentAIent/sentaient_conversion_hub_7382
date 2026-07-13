import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useRouter } from 'expo-router';

export default function ScanScreen() {
  const router = useRouter();
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (scanned) return;
      if (codes.length > 0) {
        const value = codes[0].value;
        if (value && value.includes('icebreaker://pay')) {
          setScanned(true);
          // e.g. icebreaker://pay?venueId=xyz
          const params = new URLSearchParams(value.split('?')[1]);
          const venueId = params.get('venueId');
          if (venueId) {
            router.push(`/pay/${venueId}`);
          }
        }
      }
    }
  });

  if (!hasPermission) return <View style={styles.container}><Text style={{color:'white'}}>No Camera Permission</Text></View>;
  if (device == null) return <View style={styles.container}><Text style={{color:'white'}}>No Camera Device</Text></View>;

  return (
    <View style={styles.container}>
      {scanned ? (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      ) : (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      )}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Scan Venue QR to Pay</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  overlay: { position: 'absolute', bottom: 50, backgroundColor: 'rgba(0,0,0,0.6)', padding: 15, borderRadius: 10 },
  overlayText: { color: '#00ffcc', fontWeight: 'bold', fontSize: 16 }
});
