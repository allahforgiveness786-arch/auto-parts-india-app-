import React from 'react';
import { View, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SellPartScreen from '../screens/SellPartScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import SellerProfileScreen from '../screens/SellerProfileScreen';
import AdminScreen from '../screens/AdminScreen';
import SplashScreen from '../screens/SplashScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';
import AllCategoriesScreen from '../screens/AllCategoriesScreen';
import MyAdsScreen from '../screens/MyAdsScreen';
import WishlistScreen from '../screens/WishlistScreen';
import RecentlyViewedScreen from '../screens/RecentlyViewedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CustomSellTabBarButton({ onPress, accessibilityState }: any) {
  const focused = accessibilityState?.selected;
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={tabStyles.customSellButtonTouch}
    >
      <View style={[tabStyles.sellButtonCircle, focused && tabStyles.sellButtonCircleFocused]}>
        <Icon source="plus" color="#FFFFFF" size={28} />
      </View>
      <Text style={[tabStyles.sellButtonLabel, { color: focused ? '#1565FF' : '#64748B' }]}>
        SELL
      </Text>
    </TouchableOpacity>
  );
}

function TabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'android' ? Math.max(insets.bottom, 6) : insets.bottom;
  const tabHeight = 60 + bottomPadding;

  return (
    <Tab.Navigator id="MainTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1565FF',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginBottom: Platform.OS === 'android' ? 4 : 0,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: tabHeight,
          paddingBottom: bottomPadding,
          paddingTop: 6,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon source={focused ? "home" : "home-outline"} color={color} size={24} />
          )
        }}
      />

      <Tab.Screen 
        name="ChatsTab" 
        component={ChatsScreen}
        options={{ 
          title: 'Chats',
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: '800',
            lineHeight: 14,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Icon source={focused ? "message-text" : "message-text-outline"} color={color} size={23} />
          )
        }}
      />

      <Tab.Screen 
        name="SellTab" 
        component={SellPartScreen}
        options={{ 
          title: 'SELL',
          tabBarButton: (props) => <CustomSellTabBarButton {...props} />,
        }}
      />

      <Tab.Screen 
        name="MyAdsTab" 
        component={MyAdsScreen}
        options={{ 
          title: 'My Ads',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon source={focused ? "clipboard-text" : "clipboard-text-outline"} color={color} size={23} />
          )
        }}
      />

      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon source={focused ? "account" : "account-outline"} color={color} size={24} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  customSellButtonTouch: {
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sellButtonCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1565FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1565FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  sellButtonCircleFocused: {
    backgroundColor: '#0D47A1',
    transform: [{ scale: 1.05 }],
  },
  sellButtonLabel: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },
});

export default function AppNavigator({ user }: { user?: any } = {}) {
  return (
    <Stack.Navigator id="MainStack"
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: '#0B1220' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="Auth" 
        component={AuthScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="SellPart" 
        component={SellPartScreen}
        options={{ title: 'Sell Spare Part' }}
      />

      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ title: 'Part Details' }}
      />

      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="SellerProfile" 
        component={SellerProfileScreen}
        options={{ title: 'Seller Profile' }}
      />

      <Stack.Screen 
        name="Admin" 
        component={AdminScreen}
        options={{ title: 'Admin Moderation' }}
      />

      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ title: 'Notifications & Announcements' }}
      />

      <Stack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="AllCategories" 
        component={AllCategoriesScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="WishlistScreen" 
        component={WishlistScreen}
        options={{ title: 'Saved Parts' }}
      />

      <Stack.Screen 
        name="RecentlyViewedScreen" 
        component={RecentlyViewedScreen}
        options={{ title: 'Recently Viewed' }}
      />

      <Stack.Screen 
        name="SettingsScreen" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />

      <Stack.Screen 
        name="HelpSupportScreen" 
        component={HelpSupportScreen}
        options={{ title: 'Help & Support', headerShown: false }}
      />
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  iconBtn: {
    margin: 0,
    padding: 0,
  },
});
