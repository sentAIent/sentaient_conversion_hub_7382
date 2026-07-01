import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { gql, useMutation } from '@apollo/client';

const GET_UPLOAD_URL = gql`
  mutation GetUploadUrl($contentType: String!) {
    getPresignedUploadUrl(contentType: $contentType) {
      uploadUrl
      fileKey
    }
  }
`;

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [getUploadUrl] = useMutation(GET_UPLOAD_URL);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const handleCaptureAndUpload = async () => {
    if (!cameraRef.current) return;
    
    try {
      setIsUploading(true);
      
      // 1. Capture the photo in-app
      const photo = await cameraRef.current.takePhoto({
        flash: 'off'
      });
      
      const fileUri = `file://${photo.path}`;
      const contentType = 'image/jpeg';
      
      // 2. Get Presigned URL from Backend
      const { data } = await getUploadUrl({ variables: { contentType } });
      const { uploadUrl, fileKey } = data.getPresignedUploadUrl;
      
      // 3. Upload directly to Cloudflare R2
      const response = await fetch(fileUri);
      const blob = await response.blob();
      
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body: blob,
      });

      // 4. (Future) Save Content record in DB with the fileKey
      
      Alert.alert("Success", "Moment captured and uploaded securely!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to upload.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!hasPermission) return <View style={styles.container}><Text style={styles.text}>Requesting camera permission...</Text></View>;
  if (device == null) return <View style={styles.container}><ActivityIndicator size="large" color="#fff" /><Text style={styles.text}>No Camera Device</Text></View>;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={!isUploading}
        photo={true}
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCaptureAndUpload} disabled={isUploading}>
          {isUploading && <ActivityIndicator color="#000" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, color: '#fff' },
  overlay: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center'
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
