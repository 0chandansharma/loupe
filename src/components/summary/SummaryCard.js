import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const SummaryCard = ({ title, content, language }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.divider} />
      </View>
      
      <Text style={styles.content}>{content}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.language}>{language}</Text>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
  },
  divider: {
    height: 2,
    backgroundColor: colors.primary,
    width: 40,
    marginTop: 8,
  },
  content: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.lg,
    color: colors.text,
  },
  footer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  language: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
});

export default SummaryCard;