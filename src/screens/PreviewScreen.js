import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  StatusBar, 
  SafeAreaView, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Button from '../components/ui/Button';
import AnimatedLoader from '../components/ui/AnimatedLoader';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { apiService } from '../services/apiService';

const PreviewScreen = ({ route, navigation }) => {
  const { imageUri } = route.params;
  const [processing, setProcessing] = useState(false);
  
  const handleRetake = () => {
    navigation.goBack();
  };
  
  const handleProcess = async () => {
    try {
      setProcessing(true);
      
      // In a real app, call the API
      // const summaryData = await apiService.generateSummary(imageUri);
      
      // For demo purposes, use mock data after a delay
      setTimeout(() => {
        const summaryData = apiService.getMockSummary();
        setProcessing(false);
        navigation.navigate('Summary', { summaryData });
      }, 2000);
      
    } catch (error) {
      console.error('Error processing image:', error);
      setProcessing(false);
      // Show error toast or alert
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
      
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleRetake}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Preview</Text>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 500 }}
        style={styles.previewContainer}
      >
        <Image 
          source={{ uri: imageUri }} 
          style={styles.previewImage}
          resizeMode="contain"
        />
      </MotiView>
      
      <View style={styles.footer}>
        <Button 
          title="Retake"
          variant="outline"
          onPress={handleRetake}
          style={styles.retakeButton}
        />
        
        <Button 
          title="Generate Summary"
          onPress={handleProcess}
          style={styles.processButton}
          icon={<MaterialIcons name="check-circle" size={20} color="white" />}
        />
      </View>
      
      <AnimatedLoader 
        visible={processing} 
        message="Generating summary..."
        animationSource={require('../assets/lottie/loading-animation.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 100,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: 'white',
  },
  previewContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  retakeButton: {
    flex: 1,
    marginRight: 8,
  },
  processButton: {
    flex: 2,
    marginLeft: 8,
  },
});

export default PreviewScreen;