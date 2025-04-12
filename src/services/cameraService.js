import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

export const cameraService = {
  enhanceImage: async (imageUri) => {
    try {
      // Apply image enhancements for better OCR results
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          { resize: { width: 1200 } },
          { contrast: 1.2 },
          { sharpen: 0.5 },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      return manipResult.uri;
    } catch (error) {
      console.error('Error enhancing image:', error);
      // Return original image if enhancement fails
      return imageUri;
    }
  },
  
  saveImageToGallery: async (imageUri) => {
    try {
      // Request permissions first
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        throw new Error('Gallery permission not granted');
      }
      
      // Save the image
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      
      // Create an album if needed
      const album = await MediaLibrary.getAlbumAsync('DEECOGS');
      
      if (album === null) {
        await MediaLibrary.createAlbumAsync('DEECOGS', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      
      return asset;
    } catch (error) {
      console.error('Error saving image to gallery:', error);
      throw error;
    }
  },
  
  getImageInfo: async (imageUri) => {
    try {
      const info = await ImageManipulator.manipulateAsync(
        imageUri,
        [],
        { base64: false }
      );
      
      return {
        width: info.width,
        height: info.height,
        uri: info.uri
      };
    } catch (error) {
      console.error('Error getting image info:', error);
      return null;
    }
  }
};