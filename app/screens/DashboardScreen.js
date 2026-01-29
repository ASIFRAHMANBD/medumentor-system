import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, 
  Dimensions, Animated, Modal, StatusBar, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Menu, X, Video, FileText, ClipboardList, CreditCard, 
  User, Settings, Star, HelpCircle, LogOut, Zap, 
  ChevronRight, PlayCircle, BookOpen, Crown, Activity
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export default function DashboardScreen({ navigation, route }) {
  const user = route.params?.user || { name: 'Future Doctor' };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  // Drawer Animation
  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: isDrawerOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  const MENU_ITEMS = [
    { icon: <User size={20} color={COLORS.white} />, label: 'Profile' },
    { icon: <CreditCard size={20} color={COLORS.white} />, label: 'Payment' },
    { icon: <Star size={20} color={COLORS.white} />, label: 'Ratings' },
    { icon: <Settings size={20} color={COLORS.white} />, label: 'Settings' },
    { icon: <Zap size={20} color={COLORS.white} />, label: 'Study Mode' },
    { icon: <HelpCircle size={20} color={COLORS.white} />, label: 'Help & Support' },
  ];

  return (
    <LinearGradient colors={[COLORS.deep, COLORS.base]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={toggleDrawer}
        />
      )}

      {/* Custom Drawer */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
        <LinearGradient
          colors={[COLORS.deep, COLORS.base]}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={styles.drawerContent}>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.drawerAvatarText}>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              <Text style={styles.drawerName}>{user.name}</Text>
              <Text style={styles.drawerEmail}>{user.email || 'student@medumentor.com'}</Text>
            </View>

            <View style={styles.drawerItems}>
              {MENU_ITEMS.map((item, index) => (
                <TouchableOpacity key={index} style={styles.drawerItem}>
                  {item.icon}
                  <Text style={styles.drawerItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color={COLORS.white} />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      {/* Main Content */}
      <SafeAreaView style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Menu size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerGreeting}>Hello, {user.name?.split(' ')[0]}</Text>
            <Text style={styles.headerSubtitle}>Ready to learn?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.headerAvatar}>
               <Text style={styles.headerAvatarText}>
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Banner */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.deep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>Ongoing Course</Text>
              </View>
              <Text style={styles.heroTitle}>Upper Limb Anatomy</Text>
              <Text style={styles.heroSubtitle}>3 Modules • 12 Lectures Remaining</Text>
              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Continue</Text>
                <ChevronRight size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.heroIcon}>
              <Activity size={80} color="rgba(255,255,255,0.2)" />
            </View>
          </LinearGradient>

          {/* Feature Grid */}
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.gridContainer}>
            <TouchableOpacity 
              style={styles.gridCard}
              onPress={() => navigation.navigate('Lectures')}
            >
              <View style={[styles.gridIcon, { backgroundColor: '#FFF0F3' }]}>
                <Video size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.gridTitle}>Lectures</Text>
              <Text style={styles.gridSubtitle}>500+ Videos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard}>
              <View style={[styles.gridIcon, { backgroundColor: '#F0F9FF' }]}>
                <ClipboardList size={24} color="#0EA5E9" />
              </View>
              <Text style={styles.gridTitle}>QBank</Text>
              <Text style={styles.gridSubtitle}>Practice Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.gridCard}
              onPress={() => navigation.navigate('Notes')}
            >
              <View style={[styles.gridIcon, { backgroundColor: '#F0FDF4' }]}>
                <BookOpen size={24} color="#16A34A" />
              </View>
              <Text style={styles.gridTitle}>Notes</Text>
              <Text style={styles.gridSubtitle}>High Yield</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard}>
              <View style={[styles.gridIcon, { backgroundColor: '#FEFCE8' }]}>
                <Crown size={24} color="#CA8A04" />
              </View>
              <Text style={styles.gridTitle}>Premium</Text>
              <Text style={styles.gridSubtitle}>Subscription</Text>
            </TouchableOpacity>
          </View>

          {/* Motivational / Daily Tips */}
          <Text style={styles.sectionTitle}>Daily Dose</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.motivationScroll}>
            <View style={[styles.motivationCard, { backgroundColor: COLORS.white }]}>
              <View style={styles.quoteIcon}>
                <Text style={{ fontSize: 24 }}>💡</Text>
              </View>
              <Text style={styles.motivationText}>
                "The art of medicine consists of amusing the patient while nature cures the disease."
              </Text>
              <Text style={styles.motivationAuthor}>— Voltaire</Text>
            </View>

            <View style={[styles.motivationCard, { backgroundColor: COLORS.white }]}>
               <View style={styles.quoteIcon}>
                <Text style={{ fontSize: 24 }}>🩺</Text>
              </View>
              <Text style={styles.motivationText}>
                Clinical Tip: Always check the pulse deficit in atrial fibrillation cases.
              </Text>
              <Text style={styles.motivationAuthor}>— Cardiology Dept</Text>
            </View>
             <View style={{ width: 20 }} />
          </ScrollView>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
    marginLeft: -8,
  },
  headerGreeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  profileButton: {
    marginLeft: 'auto',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Hero Banner
  heroCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
    height: 180,
    justifyContent: 'center',
  },
  heroContent: {
    zIndex: 1,
    maxWidth: '80%',
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  heroBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginRight: 4,
    fontSize: 14,
  },
  heroIcon: {
    position: 'absolute',
    right: -20,
    bottom: -20,
  },

  // Grid
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  gridCard: {
    width: (width - 56) / 2, // (screen width - padding - gap) / 2
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    shadowColor: COLORS.base,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gridIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.base,
    marginBottom: 4,
  },
  gridSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },

  // Motivation
  motivationScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  motivationCard: {
    width: 280,
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    shadowColor: COLORS.base,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  quoteIcon: {
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 14,
    color: COLORS.base,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 12,
  },
  motivationAuthor: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'right',
  },

  // Drawer Styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    zIndex: 101,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 8,
  },
  drawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  drawerAvatarText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  drawerEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  drawerItems: {
    padding: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 4,
    borderRadius: 8,
  },
  drawerItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 'auto',
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '600',
  },
});
