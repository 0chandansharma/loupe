import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const AnimatedLoader = ({ 
  visible = true, 
  message = 'Processing...', 
  animationSource,
  overlayColor = 'rgba(0,0,0,0.7)' 
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacity]);
  
  if (!visible) return null;
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor: overlayColor, opacity }
      ]}
    >
      <View style={styles.loaderContainer}>
        <LottieView
          source={animationSource || require('../../assets/lottie/loading-animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loaderContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  animation: {
    width: 120,
    height: 120,
  },
  message: {
    marginTop: 16,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    textAlign: 'center',
  },
});

export default AnimatedLoader;