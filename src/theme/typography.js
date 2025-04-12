import { Platform } from 'react-native';

export const typography = {
  fontFamily: {
    regular: Platform.OS === 'ios' ? 'Poppins-Regular' : 'Poppins-Regular',
    medium: Platform.OS === 'ios' ? 'Poppins-Medium' : 'Poppins-Medium',
    semiBold: Platform.OS === 'ios' ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
    bold: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 18,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 42,
  },
};