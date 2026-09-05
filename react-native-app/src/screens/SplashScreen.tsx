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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../services/firebase';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

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
          duration: 450,
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

    // Check persistent login state: if already signed in, enter MainTabs; otherwise show Auth
    const checkAuthAndNavigate = async () => {
      try {
        let user = getCurrentUser();
        if (!user || (!user.uid && !user.id)) {
          const rawStored = await AsyncStorage.getItem('@autoparts_current_user');
          if (rawStored) {
            try {
              user = JSON.parse(rawStored);
            } catch (_) {}
          }
        }

        const targetScreen = (user && (user.uid || user.id)) ? 'MainTabs' : 'Auth';

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
    };

    const timer = setTimeout(() => {
      checkAuthAndNavigate();
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F1D" translucent={false} />

      {/* Atmospheric Radial Glows matching AuthScreen */}
      <View style={styles.bgEffects} pointerEvents="none">
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="splashGlow" cx="50%" cy="45%" r="60%">
              <Stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
              <Stop offset="60%" stopColor="#002966" stopOpacity="0.1" />
              <Stop offset="100%" stopColor="#0A0F1D" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="#0A0F1D" />
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#splashGlow)" />
        </Svg>
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
          {/* New Modern Vector Auto Parts India Automotive Symbol */}
          <Svg width={140} height={140} viewBox="0 0 200 200">
            <Defs>
              <LinearGradient id="splashBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#0F1F38" />
                <Stop offset="50%" stopColor="#0A1526" />
                <Stop offset="100%" stopColor="#050B14" />
              </LinearGradient>

              <LinearGradient id="splashRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#38BDF8" />
                <Stop offset="40%" stopColor="#0066FF" />
                <Stop offset="80%" stopColor="#003B95" />
                <Stop offset="100%" stopColor="#0284C7" />
              </LinearGradient>

              <LinearGradient id="splashCarStream" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#38BDF8" />
                <Stop offset="50%" stopColor="#FFFFFF" />
                <Stop offset="100%" stopColor="#60A5FA" />
              </LinearGradient>

              <LinearGradient id="splashGearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#38BDF8" />
                <Stop offset="50%" stopColor="#0066FF" />
                <Stop offset="100%" stopColor="#003B95" />
              </LinearGradient>
            </Defs>

            {/* Outer Rounded Shield */}
            <Rect x="8" y="8" width="184" height="184" rx="42" fill="url(#splashBgGrad)" stroke="url(#splashRimGrad)" strokeWidth="3.5" />

            {/* Concentric Mechanical Track */}
            <G opacity="0.25">
              <Circle cx="100" cy="100" r="76" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 6" />
              <Circle cx="100" cy="100" r="58" fill="none" stroke="#1E293B" strokeWidth="1" />
            </G>

            {/* Core Automotive Symbol: Modern Car Silhouette + Minimal Gear & Wrench */}
            <G transform="translate(10, 8)">
              {/* Gear (Spare Parts Core) */}
              <G transform="translate(68, 108)" fill="url(#splashGearGrad)">
                <Path d="M -6,-28 L 6,-28 L 5,-22 C 8,-21 11,-19 14,-17 L 19,-20 L 27,-12 L 24,-7 C 26,-4 28,-1 29,2 L 35,3 L 35,15 L 29,16 C 28,19 26,22 24,25 L 27,30 L 19,38 L 14,35 C 11,37 8,39 5,40 L 6,46 L -6,46 L -5,40 C -8,39 -11,37 -14,35 L -19,38 L -27,30 L -24,25 C -26,22 -28,19 -29,16 L -35,15 L -35,3 L -29,2 C -28,-1 -26,-4 -24,-7 L -27,-12 L -19,-20 L -14,-17 C -11,-19 -8,-21 -5,-22 Z" opacity="0.95" />
                <Circle cx="0" cy="9" r="14" fill="#0A1526" stroke="#38BDF8" strokeWidth="2.5" />
                <Circle cx="0" cy="9" r="6" fill="#38BDF8" />
              </G>

              {/* Wrench (Mechanical Spare Parts Accent) */}
              <G transform="translate(132, 117) rotate(35)">
                <Path d="M -16,-6 L -42,-6 C -44,-6 -46,-4 -46,-2 L -46,2 C -46,4 -44,6 -42,6 L -16,6 C -14,12 -8,16 0,16 C 9,16 16,9 16,0 C 16,-9 9,-16 0,-16 C -8,-16 -14,-12 -16,-6 Z M 0,-8 C 4.4,-8 8,-4.4 8,0 C 8,4.4 4.4,8 0,8 C -3,8 -5.6,6.3 -6.9,3.8 L 3,3.8 L 3,-3.8 L -6.9,-3.8 C -5.6,-6.3 -3,-8 0,-8 Z" fill="#60A5FA" opacity="0.9" />
              </G>

              {/* Car Silhouette */}
              <Path d="M 22 104 C 32 94, 46 64, 76 52 C 102 42, 130 46, 154 78 C 160 86, 168 96, 172 104 C 174 108, 166 110, 158 108 C 138 104, 114 96, 86 96 C 58 96, 38 102, 22 104 Z" fill="url(#splashCarStream)" />
              <Path d="M 48 88 C 70 62, 106 56, 142 80" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              <Path d="M 80 78 L 94 62 C 108 60, 120 62, 128 76 Z" fill="#0A1526" stroke="#38BDF8" strokeWidth="1.2" />
              <Path d="M 132 76 C 138 72, 144 74, 148 78 L 136 80 Z" fill="#0A1526" stroke="#38BDF8" strokeWidth="1.2" />
              <Path d="M 158 98 L 174 102 L 160 106 Z" fill="#38BDF8" opacity="0.95" />
              <Path d="M 18 116 L 38 116" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <Path d="M 102 126 L 166 126" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            </G>
          </Svg>

          {/* Title: AUTO PARTS */}
          <View style={styles.titleRow}>
            <Text style={styles.titleAuto}>AUTO</Text>
            <Text style={styles.titleParts}>PARTS</Text>
          </View>

          {/* Micro INDIA Badge with subtle Tricolor */}
          <View style={styles.indiaBadgeRow}>
            <View style={styles.tricolorPill}>
              <View style={[styles.flagBar, { backgroundColor: '#FF9933' }]} />
              <View style={[styles.flagBar, { backgroundColor: '#FFFFFF' }]} />
              <View style={[styles.flagBar, { backgroundColor: '#138808' }]} />
            </View>
            <Text style={styles.titleIndia}>INDIA</Text>
          </View>

          {/* Subtitle / Tagline */}
          <Text style={styles.taglineText}>
            GENUINE AUTOMOTIVE SPARES MARKETPLACE
          </Text>

          {/* Clean Loading Indicator */}
          <Animated.View style={[styles.loaderBox, { opacity: contentFade }]}>
            <ActivityIndicator size="small" color="#38BDF8" />
            <Text style={styles.loadingText}>Initializing Marketplace...</Text>
          </Animated.View>
        </Animated.View>

        <View style={{ flex: 1 }} />

        {/* FOOTER ACCENT */}
        <Animated.View style={[styles.footerMovingRow, { opacity: contentFade }]}>
          <Text style={styles.keepMovingText}>GENUINE OEM & AFTERMARKET PARTS</Text>
        </Animated.View>
      </SafeAreaView>
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
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  centerBrandBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    gap: 8,
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
    fontStyle: 'italic',
    color: '#38BDF8',
    letterSpacing: -0.5,
  },
  indiaBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0F1F38',
    borderColor: '#0052CC',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 6,
  },
  tricolorPill: {
    flexDirection: 'row',
    gap: 2,
  },
  flagBar: {
    width: 3.5,
    height: 12,
    borderRadius: 1,
  },
  titleIndia: {
    fontSize: 12,
    fontWeight: '900',
    color: '#38BDF8',
    letterSpacing: 2,
  },
  taglineText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 10,
    textAlign: 'center',
    letterSpacing: 2.5,
  },
  loaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    paddingHorizontal: 18,
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
    marginBottom: 8,
  },
  keepMovingText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
