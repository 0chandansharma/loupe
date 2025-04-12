import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  View 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  icon,
  disabled = false,
  style
}) => {
  
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
          gradient: true
        };
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
          gradient: false
        };
      case 'outline':
        return {
          container: styles.outlineContainer,
          text: styles.outlineText,
          gradient: false
        };
      default:
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
          gradient: true
        };
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'medium':
        return styles.mediumButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };
  
  const buttonStyles = getButtonStyles();
  const sizeStyles = getSizeStyles();
  
  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : colors.primary} 
          size="small" 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[buttonStyles.text, sizeStyles.text]}>{title}</Text>
        </View>
      )}
    </>
  );
  
  if (buttonStyles.gradient) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.buttonBase, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[buttonStyles.container, sizeStyles.container, disabled && styles.disabledContainer]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonBase,
        buttonStyles.container, 
        sizeStyles.container,
        disabled && styles.disabledContainer,
        style
      ]}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  primaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: 'white',
    fontFamily: typography.fontFamily.semiBold,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryText: {
    color: 'white',
    fontFamily: typography.fontFamily.semiBold,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.semiBold,
  },
  smallButton: {
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    text: {
      fontSize: typography.fontSize.sm,
    },
  },
  mediumButton: {
    container: {
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    text: {
      fontSize: typography.fontSize.md,
    },
  },
  largeButton: {
    container: {
      paddingVertical: 16,
      paddingHorizontal: 32,
    },
    text: {
      fontSize: typography.fontSize.lg,
    },
  },
  disabledContainer: {
    opacity: 0.6,
  },
});

export default Button;