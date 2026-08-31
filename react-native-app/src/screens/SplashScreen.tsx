
import React, { useEffect, useRef } from 'react';
import { Animated, View, StatusBar, StyleSheet, ActivityIndicator, Text } from 'react-native';
import BrandLogo from '../components/BrandLogo';
import { getCurrentUser } from '../services/firebase';

export default function SplashScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

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
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <BrandLogo size={110} style={styles.logoImage} />
        <Text style={styles.title}>
          AUTO PARTS <Text style={styles.accent}>INDIA</Text>
        </Text>
        <Text style={styles.subtitle}>
          Direct Spare Parts Marketplace
        </Text>
        <ActivityIndicator size="large" color="#0066FF" style={styles.loader} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  accent: {
    color: '#0066FF',
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  loader: {
    marginTop: 32,
  },
});

