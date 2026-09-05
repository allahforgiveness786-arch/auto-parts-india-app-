import React, { useState } from 'react';
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
  Platform
} from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { AuthCarLogo, AuthPartsShowcase } from '../components/AuthPartsIllustration';
import { signInWithGoogleNative } from '../services/googleAuth';
import Svg, { Path, Circle, G } from 'react-native-svg';

export default function AuthScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);
  const { height: screenHeight } = useWindowDimensions();

  // Google Sign-In Native (Pure Real Firebase Auth)
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
      const msg = err?.message || 'Unable to sign in with Google. Please check your internet connection and try again.';
      setErrorMessage(msg);
      Alert.alert('Sign In', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestContinue = () => {
    if (navigation?.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0047BA" translucent={false} />

      {/* Subtle Background Watermark Gears */}
      <View style={styles.bgGearsLayer} pointerEvents="none">
        {/* Top-Right Ambient Gear */}
        <View style={styles.gearTopRight}>
          <Svg width="160" height="160" viewBox="0 0 100 100" fill="none">
            <Path
              d="M 50 15 L 54 15 L 56 22 L 63 25 L 68 20 L 73 24 L 70 31 L 76 37 L 83 35 L 85 41 L 79 46 L 80 54 L 86 58 L 84 65 L 77 64 L 72 70 L 74 77 L 69 81 L 63 76 L 56 79 L 54 86 L 47 86 L 45 79 L 38 76 L 33 81 L 28 77 L 30 70 L 25 64 L 18 65 L 16 58 L 22 54 L 21 46 L 15 41 L 17 35 L 24 37 L 30 31 L 27 24 L 32 20 L 37 25 L 44 22 Z"
              fill="#005EE6"
              opacity="0.3"
            />
            <Circle cx="50" cy="50" r="18" fill="#0047BA" />
            <Circle cx="50" cy="50" r="10" fill="#003899" />
          </Svg>
        </View>

        {/* Lower-Left Ambient Gear */}
        <View style={styles.gearBottomLeft}>
          <Svg width="140" height="140" viewBox="0 0 100 100" fill="none">
            <Path
              d="M 50 15 L 54 15 L 56 22 L 63 25 L 68 20 L 73 24 L 70 31 L 76 37 L 83 35 L 85 41 L 79 46 L 80 54 L 86 58 L 84 65 L 77 64 L 72 70 L 74 77 L 69 81 L 63 76 L 56 79 L 54 86 L 47 86 L 45 79 L 38 76 L 33 81 L 28 77 L 30 70 L 25 64 L 18 65 L 16 58 L 22 54 L 21 46 L 15 41 L 17 35 L 24 37 L 30 31 L 27 24 L 32 20 L 37 25 L 44 22 Z"
              fill="#005EE6"
              opacity="0.25"
            />
            <Circle cx="50" cy="50" r="16" fill="#0047BA" />
          </Svg>
        </View>
      </View>

      {/* Top Left Close/Back Button */}
      {navigation?.canGoBack && navigation.canGoBack() && (
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon source="close" size={22} color="#FFFFFF" />
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
          {/* TOP SECTION: BRAND EMBLEM & TYPOGRAPHY */}
          <View style={styles.brandingWrapper}>
            {/* Aerodynamic Sportscar Silhouette + Cyan Gear Emblem */}
            <AuthCarLogo size={95} />

            {/* Title: Auto (White) + Parts (Sky Blue) */}
            <View style={styles.titleRow}>
              <Text style={styles.titleAuto}>Auto</Text>
              <Text style={styles.titleParts}> Parts</Text>
            </View>

            {/* — INDIA — with sleek lines */}
            <View style={styles.indiaRow}>
              <View style={styles.lineDivider} />
              <Text style={styles.indiaText}>I N D I A</Text>
              <View style={styles.lineDivider} />
            </View>

            {/* Subtitle / Tagline */}
            <Text style={styles.taglineText}>
              Buy. Sell. Find. Auto Parts Across India
            </Text>
          </View>

          {/* Error Banner if any */}
          {errorMessage && (
            <View style={styles.errorBox}>
              <Icon source="alert-circle-outline" size={18} color="#FCA5A5" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* CENTER SECTION: HIGH-CONTRAST "SIGN IN →" PILL BUTTON */}
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              style={[styles.signInPillBtn, loading && styles.btnDisabled]}
              onPress={handleGoogleSignIn}
              disabled={loading}
              activeOpacity={0.88}
            >
              {loading ? (
                <View style={styles.pillContent}>
                  <ActivityIndicator color="#0047BA" size="small" />
                  <Text style={styles.signInBtnText}>Connecting securely...</Text>
                </View>
              ) : (
                <View style={styles.pillContent}>
                  <Text style={styles.signInBtnText}>Sign In</Text>
                  <Icon source="arrow-right" size={20} color="#0047BA" />
                </View>
              )}
            </TouchableOpacity>

            {/* Secondary Guest Option */}
            <TouchableOpacity
              style={styles.guestBtn}
              onPress={handleGuestContinue}
              activeOpacity={0.7}
            >
              <Text style={styles.guestBtnText}>Explore as Guest</Text>
            </TouchableOpacity>
          </View>

          {/* BOTTOM SECTION: 3D AUTO SPARE PARTS CLUSTER */}
          <View style={styles.showcaseWrapper}>
            <AuthPartsShowcase />

            {/* Bottom Footer Accent: KEEP INDIA MOVING — */}
            <View style={styles.footerMovingRow}>
              <Text style={styles.keepMovingText}>KEEP INDIA MOVING</Text>
              <View style={styles.keepMovingLine} />
            </View>

            {/* Discreet Legal Links */}
            <View style={styles.legalRow}>
              <TouchableOpacity onPress={() => setLegalModal('terms')}>
                <Text style={styles.legalLink}>Terms</Text>
              </TouchableOpacity>
              <Text style={styles.legalDot}>•</Text>
              <TouchableOpacity onPress={() => setLegalModal('privacy')}>
                <Text style={styles.legalLink}>Privacy</Text>
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
                <Icon source="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalText}>
                {legalModal === 'terms' ? (
                  `Welcome to Auto Parts India.\n\n1. Acceptance of Terms: By accessing or using this app, you agree to be bound by these terms.\n\n2. Marketplace Platform: Auto Parts India connects buyers and sellers of automotive components across India.\n\n3. Verified Listings: Sellers must ensure accurate descriptions, genuine condition ratings, and fair pricing for all automobile components.`
                ) : (
                  `Auto Parts India Privacy Policy\n\n1. Information We Collect: Basic account information provided during Sign-In to connect buyers and sellers.\n\n2. Data Security: Your profile and transactions are secured with industry-standard encryption protocols.`
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
    backgroundColor: '#0047BA', // Vibrant Royal Blue matching reference image
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  bgGearsLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  gearTopRight: {
    position: 'absolute',
    top: -20,
    right: -20,
  },
  gearBottomLeft: {
    position: 'absolute',
    bottom: 120,
    left: -30,
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 16 : 50,
    left: 16,
    zIndex: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandingWrapper: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 24 : 16,
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  titleAuto: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  titleParts: {
    fontSize: 38,
    fontWeight: '900',
    color: '#38BDF8', // Cyan / Sky Blue accent
    letterSpacing: -0.5,
  },
  indiaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 12,
  },
  lineDivider: {
    width: 48,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  indiaText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  taglineText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E0F2FE',
    marginTop: 10,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.25)',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 24,
    marginTop: 12,
    gap: 8,
  },
  errorText: {
    color: '#FEE2E2',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  actionWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 24,
    marginBottom: 8,
    zIndex: 10,
  },
  signInPillBtn: {
    width: '100%',
    maxWidth: 320,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  btnDisabled: {
    opacity: 0.75,
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signInBtnText: {
    color: '#0047BA',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  guestBtn: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  guestBtnText: {
    color: '#BFDBFE',
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  showcaseWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerMovingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: -8,
    marginBottom: 6,
  },
  keepMovingText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  keepMovingLine: {
    width: 36,
    height: 1.2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  legalLink: {
    color: '#93C5FD',
    fontSize: 11,
    fontWeight: '600',
  },
  legalDot: {
    color: '#93C5FD',
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    paddingBottom: 20,
  },
  modalText: {
    color: '#334155',
    lineHeight: 22,
    fontSize: 14,
  },
});
