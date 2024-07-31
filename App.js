import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddCardScreen from './screens/AddCardScreen';
import HomeIcon from './components/HomeIcon';
import ChatIcon from './components/ChatIcon';
import ProfileIcon from './components/ProfileIcon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddCard" component={AddCardScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}

function MessagesStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
    </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
              if (route.name === 'Home') {
                return <HomeIcon fill={focused ? 'white' : color} focused={focused} />;
              } else if (route.name === 'Messages') {
                return <ChatIcon fill={focused ? 'white' : color} focused={focused} />;
              } else if (route.name === 'Profile') {
                return <ProfileIcon fill={focused ? 'white' : color} focused={focused} />;
              }
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopColor: '#FCDC2A',
              borderTopWidth: 2,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height: 70,
              paddingBottom: 10,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarLabel: '홈' }} />
          <Tab.Screen name="Messages" component={MessagesStackScreen} options={{ tabBarLabel: '채팅' }} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ tabBarLabel: '마이페이지' }} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
