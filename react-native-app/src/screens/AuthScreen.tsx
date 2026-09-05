import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  useWindowDimensions,
  Platform,
  Animated,
  Image
} from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { signInWithGoogleNative } from '../services/googleAuth';
import { AutoPartsIcon } from '../components/BrandLogo';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

export default function AuthScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);
  const { height: screenHeight } = useWindowDimensions();

  // Entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtle breathing pulse on the primary action button
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    return () => pulseLoop.stop();
  }, []);

  // Google Sign-In Native (Real Firebase Auth)
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const user = await signInWithGoogleNative();
      if (!user || !user.uid) {
        throw new Error('Unable to complete sign-in. Please try again.');
      }
      if (navigation?.canGoBack && navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }
    } catch (err: any) {
      console.warn('[AuthScreen] Google Sign-In failed:', err);
      const msg = err?.message || 'Unable to sign in with Google. Please check your network and try again.';
      setErrorMessage(msg);
      Alert.alert('Sign In', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F1D" translucent={false} />

      {/* Futuristic Background Atmospheric Glows */}
      <View style={styles.bgEffects} pointerEvents="none">
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="topCyanGlow" cx="50%" cy="10%" r="60%">
              <Stop offset="0%" stopColor="#0066FF" stopOpacity="0.32" />
              <Stop offset="60%" stopColor="#003399" stopOpacity="0.08" />
              <Stop offset="100%" stopColor="#0A0F1D" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="bottomBlueGlow" cx="50%" cy="85%" r="50%">
              <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.15" />
              <Stop offset="70%" stopColor="#0A0F1D" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="#0A0F1D" />
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#topCyanGlow)" />
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#bottomBlueGlow)" />
        </Svg>
      </View>

      {/* Top Left Close/Back Button */}
      {navigation?.canGoBack && navigation.canGoBack() && (
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon source="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { minHeight: screenHeight - (Platform.OS === 'android' ? 24 : 44) }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* HEADER & BRANDING CARD */}
          <Animated.View 
            style={[
              styles.headerSection, 
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            {/* Verified Market Badge */}
            <View style={styles.badgePill}>
              <View style={styles.greenDot} />
              <Text style={styles.badgeText}>INDIA'S #1 AUTO PARTS MARKETPLACE</Text>
            </View>

            {/* Premium Vector Emblem: Auto Parts AP Shield Icon */}
            <View style={styles.logoWrapper}>
              <AutoPartsIcon size={92} />
            </View>

            {/* Main App Title */}
            <View style={styles.titleRow}>
              <Text style={styles.brandTitleWhite}>AUTO</Text>
              <Text style={styles.brandTitleCyan}>PARTS</Text>
            </View>

            {/* Subtle Tricolor INDIA Badge */}
            <View style={styles.indiaBadgePill}>
              <View style={styles.tricolorMicro}>
                <View style={[styles.flagBarSmall, { backgroundColor: '#FF9933' }]} />
                <View style={[styles.flagBarSmall, { backgroundColor: '#FFFFFF' }]} />
                <View style={[styles.flagBarSmall, { backgroundColor: '#138808' }]} />
              </View>
              <Text style={styles.indiaBadgeText}>INDIA</Text>
            </View>

            <Text style={styles.brandSubtitle}>
              India's #1 Genuine Automotive Spares Marketplace
            </Text>
          </Animated.View>

          {/* ERROR ALERT BANNER */}
          {errorMessage && (
            <Animated.View style={styles.errorCard}>
              <Icon source="alert-circle" size={20} color="#F87171" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </Animated.View>
          )}

          {/* MAIN INTERACTIVE CARD: GOOGLE SIGN-IN */}
          <Animated.View 
            style={[
              styles.authCard, 
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeading}>Fast 1-Tap Sign In</Text>
              <Text style={styles.cardSubheading}>Instant access to listings, direct chat, and saved parts</Text>
            </View>

            {/* Official Google Sign-In Button */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }], width: '100%' }}>
              <TouchableOpacity
                style={[styles.googleButton, loading && styles.btnDisabled]}
                onPress={handleGoogleSignIn}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <View style={styles.googleBtnInner}>
                    <ActivityIndicator color="#0F172A" size="small" />
                    <Text style={styles.googleBtnText}>Connecting to Google...</Text>
                  </View>
                ) : (
                  <View style={styles.googleBtnInner}>
                    {/* Official Google 'G' Multi-Color SVG Logo */}
                    <Svg width={24} height={24} viewBox="0 0 24 24">
                      <Path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <Path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <Path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <Path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </Svg>
                    <Text style={styles.googleBtnText}>Continue with Google</Text>
                    <Icon source="arrow-right" size={18} color="#0F172A" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* 3 TRUST VALUE PILLARS (Clean, high-credibility cards) */}
          <View style={styles.trustGrid}>
            <View style={styles.trustItem}>
              <View style={[styles.trustIconCircle, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                <Icon source="shield-check" size={20} color="#38BDF8" />
              </View>
              <Text style={styles.trustTitle}>100% Genuine</Text>
              <Text style={styles.trustSub}>OEM & Aftermarket</Text>
            </View>

            <View style={styles.trustItem}>
              <View style={[styles.trustIconCircle, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
                <Icon source="phone-in-talk" size={20} color="#22C55E" />
              </View>
              <Text style={styles.trustTitle}>Direct Seller</Text>
              <Text style={styles.trustSub}>Call & Live Chat</Text>
            </View>

            <View style={styles.trustItem}>
              <View style={[styles.trustIconCircle, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                <Icon source="truck-fast" size={20} color="#F59E0B" />
              </View>
              <Text style={styles.trustTitle}>Pan-India</Text>
              <Text style={styles.trustSub}>All States & Cities</Text>
            </View>
          </View>

          {/* FOOTER & LEGAL LINKS */}
          <View style={styles.footerSection}>
            <View style={styles.securityTag}>
              <Icon source="lock-check" size={14} color="#64748B" />
              <Text style={styles.securityText}>256-Bit Encrypted & Verified Cloud</Text>
            </View>

            <View style={styles.legalRow}>
              <TouchableOpacity onPress={() => setLegalModal('terms')}>
                <Text style={styles.legalLink}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.legalDot}>•</Text>
              <TouchableOpacity onPress={() => setLegalModal('privacy')}>
                <Text style={styles.legalLink}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>

        </SafeAreaView>
      </ScrollView>

      {/* Terms / Privacy Modal */}
      <Modal
        visible={legalModal !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLegalModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {legalModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </Text>
              <TouchableOpacity onPress={() => setLegalModal(null)} style={styles.closeBtn}>
                <Icon source="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalText}>
                {legalModal === 'terms' ? (
                  `Welcome to AutoParts India Marketplace.\n\n1. Marketplace Platform: AutoParts India connects automobile owners, workshops, and scrap dealers with verified spare parts sellers.\n\n2. Genuine Spare Parts: Sellers are responsible for providing authentic part numbers, accurate condition descriptions (Brand New, OEM Genuine, Refurbished, or Tested Used), and genuine photography.\n\n3. Safe Dealings: Always verify spare part compatibility (Make, Model, Year, Engine code) before making transactions.`
                ) : (
                  `AutoParts India Privacy & Protection\n\n1. Information Collection: Your Google sign-in details (Name, Email, Profile Picture) are securely stored to authenticate and sync your chat messages, favorites, and posted listings.\n\n2. Security: We never sell your personal data. All conversations and transactions are protected under high-grade encryption.`
                )}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D', // Deep midnight carbon navy
  },
  bgEffects: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 16 : 48,
    left: 16,
    zIndex: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 12,
    paddingHorizontal: 12,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
    gap: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  badgeText: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  brandTitleWhite: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandTitleCyan: {
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#38BDF8',
    letterSpacing: -0.5,
    marginLeft: 6,
  },
  indiaBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F1F38',
    borderColor: '#0052CC',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
  },
  tricolorMicro: {
    flexDirection: 'row',
    gap: 2,
  },
  flagBarSmall: {
    width: 3,
    height: 10,
    borderRadius: 1,
  },
  indiaBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#38BDF8',
    letterSpacing: 1.5,
  },
  indiaTag: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  indiaTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 6,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginVertical: 12,
    marginHorizontal: 12,
    gap: 10,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  authCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 24,
    alignItems: 'center',
    marginVertical: 18,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 10,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  cardSubheading: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  googleButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  googleBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  googleBtnText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
  },
  guestPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  guestPillText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
  },
  trustGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 380,
    gap: 8,
    marginVertical: 12,
  },
  trustItem: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  trustIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  trustTitle: {
    color: '#F1F5F9',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  trustSub: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 8,
    paddingBottom: 8,
  },
  securityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  securityText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legalLink: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  legalDot: {
    color: '#475569',
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    maxHeight: '75%',
    padding: 22,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    paddingBottom: 24,
  },
  modalText: {
    color: '#94A3B8',
    lineHeight: 22,
    fontSize: 13,
  },
});
