
import React, { useEffect, useRef } from 'react';
import { Animated, View, StatusBar, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import { getCurrentUser } from '../services/firebase';

const { width } = Dimensions.get('window');
const LOGO_WIDTH = Math.min(width * 0.75, 320);

export default function SplashScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();

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
    }, 1600);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050811" />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: LOGO_WIDTH, height: LOGO_WIDTH }}
          resizeMode="contain"
        />
        <ActivityIndicator size="small" color="#0066FF" style={styles.loader} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050811',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: 28,
  },
});


