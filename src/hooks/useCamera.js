import { useState, useRef, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { cameraService } from '../services/cameraService';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  
  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  // Toggle flash mode
  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };
  
  // Take a picture
  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: false,
        });
        
        // Enhance image for better OCR
        const enhancedImage = await cameraService.enhanceImage(photo.uri);
        return enhancedImage;
      } catch (error) {
        console.error('Error taking picture:', error);
        throw new Error('Failed to capture image');
      }
    } else {
      throw new Error('Camera is not ready');
    }
  };
  
  // Pick an image from gallery
  const pickImage = async () => {
    try {
      // Request permissions first
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Sorry, we need camera roll permissions to make this work!'
          );
          return null;
        }
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled) {
        // Enhance image for better OCR
        const enhancedImage = await cameraService.enhanceImage(result.assets[0].uri);
        return enhancedImage;
      }
      
      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      throw new Error('Failed to pick image from gallery');
    }
  };
  
  return {
    hasPermission,
    cameraRef,
    flashMode,
    setCameraReady,
    toggleFlash,
    takePicture,
    pickImage,
  };
};