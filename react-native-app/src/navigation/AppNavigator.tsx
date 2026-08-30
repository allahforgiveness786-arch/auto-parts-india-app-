import React from 'react';
import { View, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();
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
        <Icon source="plus" color="#FFFFFF" size={26} />
      </View>
      <Text style={[tabStyles.sellButtonLabel, { color: focused ? '#0066FF' : '#64748B' }]}>
        Sell
      </Text>
    </TouchableOpacity>
  );
}

function TabNavigator({ user }: { user: any }) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'android' ? Math.max(insets.bottom, 6) : insets.bottom;
  const tabHeight = 60 + bottomPadding;

  return (
    <Tab.Navigator id="MainTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0066FF',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
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
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon source={focused ? "home" : "home-outline"} color={color} size={24} />
          )
        }}
      >
        {(props) => <HomeScreen {...props} user={user} />}
      </Tab.Screen>

      <Tab.Screen 
        name="ChatsTab" 
        options={{ 
          title: 'Chat',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon source={focused ? "message-text" : "message-text-outline"} color={color} size={23} />
          )
        }}
      >
        {(props) => <ChatsScreen {...props} user={user} />}
      </Tab.Screen>

      <Tab.Screen 
        name="SellTab" 
        options={{ 
          title: 'Sell',
          tabBarButton: (props) => <CustomSellTabBarButton {...props} />,
        }}
      >
        {(props) => <SellPartScreen {...props} user={user} />}
      </Tab.Screen>

      <Tab.Screen 
        name="MyAdsTab" 
        options={{ 
          title: 'My Ads',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon source={focused ? "format-list-bulleted-square" : "newspaper-variant-outline"} color={color} size={23} />
          )
        }}
      >
        {(props) => <MyAdsScreen {...props} user={user} />}
      </Tab.Screen>

      <Tab.Screen 
        name="ProfileTab" 
        options={{ 
          title: 'Account',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon source={focused ? "account" : "account-outline"} color={color} size={24} />
          )
        }}
      >
        {(props) => <ProfileScreen {...props} user={user} />}
      </Tab.Screen>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  sellButtonCircleFocused: {
    backgroundColor: '#0052CC',
    transform: [{ scale: 1.05 }],
  },
  sellButtonLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
});

export default function AppNavigator({ user }: { user: any }) {
  return (
    <Stack.Navigator id="MainStack"
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: '#0B1220' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        presentation: 'card',
        animation: 'slide_from_right',
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
        options={{ headerShown: false }}
      >
        {(props) => <TabNavigator {...props} user={user} />}
      </Stack.Screen>

      <Stack.Screen 
        name="Home" 
        options={{ headerShown: false }}
      >
        {(props) => <TabNavigator {...props} user={user} />}
      </Stack.Screen>

      <Stack.Screen 
        name="Chats" 
        options={{ headerShown: false }}
      >
        {(props) => <TabNavigator {...props} user={user} />}
      </Stack.Screen>

      <Stack.Screen 
        name="Sell" 
        options={{ headerShown: false }}
      >
        {(props) => <TabNavigator {...props} user={user} />}
      </Stack.Screen>

      <Stack.Screen 
        name="SellPart" 
        options={{ title: 'Sell Spare Part' }}
      >
        {(props) => <SellPartScreen {...props} user={user} />}
      </Stack.Screen>

      <Stack.Screen 
        name="Profile" 
        options={{ headerShown: false }}
      >
        {(props) => <TabNavigator {...props} user={user} />}
      </Stack.Screen>

      <Stack.Screen 
        name="ProductDetail" 
        options={{ title: 'Part Details' }}
      >
        {(props) => <ProductDetailScreen {...props} user={user} />}
      </Stack.Screen>

      <Stack.Screen 
        name="ChatRoom" 
        options={{ title: 'Conversation' }}
      >
        {(props) => <ChatRoomScreen {...props} user={user} />}
      </Stack.Screen>

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
        name="MyAds" 
        options={{ headerShown: false }}
      >
        {(props) => <MyAdsScreen {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  iconBtn: {
    margin: 0,
    padding: 0,
  },
});
