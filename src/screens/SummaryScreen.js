import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  Dimensions,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { shareService } from '../services/shareService';

const { width } = Dimensions.get('window');

const SummaryScreen = ({ route, navigation }) => {
  const { summaryData } = route.params;
  const [activeTab, setActiveTab] = useState('english');
  
  // Animation refs
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: 'clamp',
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });
  
  const titleScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });
  
  const handleShare = async (method) => {
    const content = activeTab === 'english' 
      ? summaryData["English Summary"] 
      : summaryData["Hindi Summary"];
      
    const title = "Medical Report Summary";
    
    switch (method) {
      case 'whatsapp':
        await shareService.shareToWhatsApp(content);
        break;
      case 'email':
        await shareService.shareViaEmail(content, title);
        break;
      case 'copy':
        await shareService.copyToClipboard(content);
        break;
      case 'all':
        await Share.share({
          message: content,
          title: title,
        });
        break;
    }
  };
  
  const renderSummaryContent = () => {
    if (activeTab === 'english') {
      return (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300 }}
          style={styles.summaryContent}
        >
          <Text style={styles.summaryText}>
            {summaryData["English Summary"]}
          </Text>
        </MotiView>
      );
    } else {
      return (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300 }}
          style={styles.summaryContent}
        >
          <Text style={styles.summaryText}>
            {summaryData["Hindi Summary"]}
          </Text>
        </MotiView>
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={styles.gradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            <Animated.View 
              style={[
                styles.titleContainer, 
                { 
                  opacity: headerOpacity,
                  transform: [{ scale: titleScale }] 
                }
              ]}
            >
              <Text style={styles.headerTitle}>AI Summary</Text>
              <Text style={styles.headerSubtitle}>Medical Report Analysis</Text>
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>
      
      {/* Language Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'english' && styles.activeTab]}
          onPress={() => setActiveTab('english')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'english' && styles.activeTabText
            ]}
          >
            English
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'hindi' && styles.activeTab]}
          onPress={() => setActiveTab('hindi')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'hindi' && styles.activeTabText
            ]}
          >
            हिंदी
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Summary Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>
              {activeTab === 'english' ? 'Summary Report' : 'सारांश रिपोर्ट'}
            </Text>
            <View style={styles.divider} />
          </View>
          
          {renderSummaryContent()}
        </View>
      </Animated.ScrollView>
      
      {/* Share Options */}
      <View style={styles.shareContainer}>
        <TouchableOpacity 
          style={styles.shareOption}
          onPress={() => handleShare('whatsapp')}
        >
          <View style={[styles.shareIconBg, { backgroundColor: '#25D366' }]}>
            <MaterialIcons name="whatsapp" size={24} color="white" />
          </View>
          <Text style={styles.shareText}>WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shareOption}
          onPress={() => handleShare('email')}
        >
          <View style={[styles.shareIconBg, { backgroundColor: '#D44638' }]}>
            <MaterialIcons name="email" size={24} color="white" />
          </View>
          <Text style={styles.shareText}>Email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shareOption}
          onPress={() => handleShare('copy')}
        >
          <View style={[styles.shareIconBg, { backgroundColor: '#607D8B' }]}>
            <MaterialIcons name="content-copy" size={24} color="white" />
          </View>
          <Text style={styles.shareText}>Copy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shareOption}
          onPress={() => handleShare('all')}
        >
          <View style={[styles.shareIconBg, { backgroundColor: colors.secondary }]}>
            <MaterialIcons name="share" size={24} color="white" />
          </View>
          <Text style={styles.shareText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    width: '100%',
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    paddingTop: 40,
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  headerTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    color: 'white',
  },
  headerSubtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryHeader: {
    marginBottom: 16,
  },
  summaryTitle: {
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
  summaryContent: {
    marginTop: 8,
  },
  summaryText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.lg,
    color: colors.text,
  },
  shareContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  shareOption: {
    alignItems: 'center',
  },
  shareIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  shareText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
});

export default SummaryScreen;