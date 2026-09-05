import React, { useEffect, useRef } from 'react';
import { 
  Animated, 
  View, 
  StatusBar, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView, 
  useWindowDimensions, 
  Platform 
} from 'react-native';
import { Text } from 'react-native-paper';
import { AuthCarLogo } from '../components/AuthPartsIllustration';
import { getCurrentUser } from '../services/firebase';
import Svg, { Path, Circle } from 'react-native-svg';

export default function SplashScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const { height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    // Smooth cinematic entry
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();

    // Automatic route navigation after assets initialize
    const timer = setTimeout(() => {
      try {
        const user = getCurrentUser();
        const targetScreen = (user && user.uid) ? 'MainTabs' : 'Auth';
        if (navigation?.reset) {
          navigation.reset({
            index: 0,
            routes: [{ name: targetScreen }],
          });
        } else if (navigation?.replace) {
          navigation.replace(targetScreen);
        } else if (navigation?.navigate) {
          navigation.navigate(targetScreen);
        }
      } catch (e) {
        try {
          navigation?.navigate('Auth');
        } catch (_) {}
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0047BA" translucent={false} />

      {/* Subtle Background Watermark Gears matching AuthScreen */}
      <View style={styles.bgGearsLayer} pointerEvents="none">
        {/* Top-Right Ambient Gear */}
        <View style={styles.gearTopRight}>
          <Svg width="180" height="180" viewBox="0 0 100 100" fill="none">
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
          <Svg width="150" height="150" viewBox="0 0 100 100" fill="none">
            <Path
              d="M 50 15 L 54 15 L 56 22 L 63 25 L 68 20 L 73 24 L 70 31 L 76 37 L 83 35 L 85 41 L 79 46 L 80 54 L 86 58 L 84 65 L 77 64 L 72 70 L 74 77 L 69 81 L 63 76 L 56 79 L 54 86 L 47 86 L 45 79 L 38 76 L 33 81 L 28 77 L 30 70 L 25 64 L 18 65 L 16 58 L 22 54 L 21 46 L 15 41 L 17 35 L 24 37 L 30 31 L 27 24 L 32 20 L 37 25 L 44 22 Z"
              fill="#005EE6"
              opacity="0.25"
            />
            <Circle cx="50" cy="50" r="16" fill="#0047BA" />
          </Svg>
        </View>
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1 }} />

        {/* CENTER EMBLEM & TYPOGRAPHY */}
        <Animated.View 
          style={[
            styles.centerBrandBlock, 
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
          ]}
        >
          {/* Aerodynamic Sportscar Silhouette + Cyan Gear Emblem */}
          <AuthCarLogo size={120} />

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

          {/* Elegant Loading Spinner */}
          <Animated.View style={[styles.loaderBox, { opacity: contentFade }]}>
            <ActivityIndicator size="small" color="#38BDF8" />
            <Text style={styles.loadingText}>Starting Marketplace...</Text>
          </Animated.View>
        </Animated.View>

        <View style={{ flex: 1 }} />

        {/* FOOTER ACCENT: KEEP INDIA MOVING — */}
        <Animated.View style={[styles.footerMovingRow, { opacity: contentFade }]}>
          <Text style={styles.keepMovingText}>KEEP INDIA MOVING</Text>
          <View style={styles.keepMovingLine} />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0047BA', // Unified Royal Blue matching Sign-In Screen
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  bgGearsLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  gearTopRight: {
    position: 'absolute',
    top: -30,
    right: -30,
  },
  gearBottomLeft: {
    position: 'absolute',
    bottom: 60,
    left: -40,
  },
  centerBrandBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  titleAuto: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  titleParts: {
    fontSize: 42,
    fontWeight: '900',
    color: '#38BDF8', // Cyan / Sky Blue accent
    letterSpacing: -0.5,
  },
  indiaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 14,
  },
  lineDivider: {
    width: 52,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  indiaText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 5,
  },
  taglineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E0F2FE',
    marginTop: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  loaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loadingText: {
    color: '#BAE6FD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerMovingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  keepMovingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2.5,
  },
  keepMovingLine: {
    width: 40,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },
});
