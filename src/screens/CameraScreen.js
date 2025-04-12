import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  StatusBar, 
  SafeAreaView, 
  BackHandler, 
  Platform 
} from 'react-native';
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import DocumentScanner from '../components/camera/DocumentScanner';
import AnimatedLoader from '../components/ui/AnimatedLoader';
import { colors } from '../theme/colors';
import { cameraService } from '../services/cameraService';
import { apiService } from '../services/apiService';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('Processing image...');
  
  // Handle back button press
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (processing) {
          // Prevent going back while processing
          return true;
        }
        return false;
      };
      
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [processing])
  );
  
  // Request camera permission on mount
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const handleCapture = async (photo) => {
    try {
      setProcessing(true);
      setProcessingMessage('Enhancing image...');
      
      // Enhance the captured image
      const enhancedImage = await cameraService.enhanceImage(photo.uri);
      
      setProcessingMessage('Generating summary...');
      
      // In a real app, call the API
      // const summaryData = await apiService.generateSummary(enhancedImage);
      
      // For demo purposes, use mock data
      const summaryData = apiService.getMockSummary();
      
      // Navigate to summary screen
      setTimeout(() => {
        setProcessing(false);
        navigation.navigate('Summary', { summaryData });
      }, 1000);
      
    } catch (error) {
      console.error('Error processing image:', error);
      setProcessing(false);
      // Show error toast or alert
    }
  };
  
  const handleClose = () => {
    navigation.goBack();
  };
  
  if (hasPermission === null) {
    return <View style={styles.container} />;
  }
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView style={styles.safeArea}>
        <DocumentScanner 
          onCapture={handleCapture}
          onClose={handleClose}
        />
        
        <AnimatedLoader 
          visible={processing} 
          message={processingMessage}
          animationSource={require('../assets/lottie/loading-animation.json')}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  safeArea: {
    flex: 1,
  },
});

export default CameraScreen;