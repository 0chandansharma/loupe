import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');
const FRAME_WIDTH = width * 0.85;
const FRAME_HEIGHT = height * 0.5;

const ScanOverlay = ({ scanning, animation }) => {
  // Animation for the scanning line
  const scanLinePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, FRAME_HEIGHT],
  });
  
  return (
    <View style={styles.container}>
      {/* Semi-transparent overlay */}
      <View style={styles.overlay} />
      
      {/* Transparent frame */}
      <View style={styles.frame}>
        {/* Corner indicators */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
        
        {/* Scanning line (only visible during scanning) */}
        {scanning && (
          <Animated.View 
            style={[
              styles.scanLine,
              { transform: [{ translateY: scanLinePosition }] }
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  frame: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.primary,
    borderWidth: 3,
  },
  topLeft: {
    top: -3,
    left: -3,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 10,
  },
  topRight: {
    top: -3,
    right: -3,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
  },
  bottomLeft: {
    bottom: -3,
    left: -3,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 10,
  },
  bottomRight: {
    bottom: -3,
    right: -3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 10,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
});

export default ScanOverlay;