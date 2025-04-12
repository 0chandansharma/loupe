import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  TouchableOpacity,
  Text
} from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import ScanOverlay from './ScanOverlay';
import CaptureButton from './CaptureButton';

const { width, height } = Dimensions.get('window');

const DocumentScanner = ({ onCapture, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [scanning, setScanning] = useState(false);
  
  const cameraRef = useRef(null);
  const scanAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const toggleFlash = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };
  
  const takePicture = async () => {
    if (cameraRef.current) {
      setScanning(true);
      
      // Animate scanning effect
      Animated.timing(scanAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
      
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
          skipProcessing: false,
        });
        
        setTimeout(() => {
          setScanning(false);
          onCapture(photo);
        }, 1000);
        
      } catch (error) {
        console.error('Error taking picture:', error);
        setScanning(false);
      }
    }
  };
  
  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <LottieView
          source={require('../../assets/lottie/loading-animation.json')}
          autoPlay
          loop
          style={styles.lottieLoading}
        />
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons name="no-photography" size={64} color={colors.error} />
        <Text style={styles.permissionText}>
          Camera access is required to scan documents
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={onClose}>
          <Text style={styles.permissionButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        flashMode={flash}
        autoFocus={Camera.Constants.AutoFocus.on}
        ratio="4:3"
      >
        <ScanOverlay scanning={scanning} animation={scanAnimation} />
        
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <MaterialIcons 
              name={flash === Camera.Constants.FlashMode.off ? "flash-off" : "flash-on"} 
              size={28} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomControls}>
          <CaptureButton 
            onPress={takePicture} 
            disabled={scanning} 
            scanning={scanning} 
          />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: 'white',
  },
  lottieLoading: {
    width: 120,
    height: 120,
  },
});

export default DocumentScanner;