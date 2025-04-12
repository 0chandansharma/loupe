import React from 'react';
import { 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  Animated, 
  Easing 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const CaptureButton = ({ onPress, disabled, scanning }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  
  React.useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [scanning, pulseAnim]);
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.outerCircle,
          { transform: [{ scale: pulseAnim }] }
        ]}
      />
      
      <View style={styles.innerCircle}>
        {scanning ? (
          <MaterialIcons name="hourglass-top" size={30} color="white" />
        ) : (
          <View style={styles.captureCircle} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  outerCircle: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 112, 67, 0.3)',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  captureCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
  },
});

export default CaptureButton;