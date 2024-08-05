import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

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
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AddCard" 
        component={AddCardScreen} 
        options={{ presentation: 'modal', headerShown: false }} 
      />
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
              let IconComponent;
              if (route.name === 'Home') {
                IconComponent = HomeIcon;
              } else if (route.name === 'Messages') {
                IconComponent = ChatIcon;
              } else if (route.name === 'Profile') {
                IconComponent = ProfileIcon;
              }

              return <IconComponent fill={focused ? 'white' : '#666'} focused={focused} />;
            },
            tabBarLabel: ({ focused }) => {
              let labelText;
              if (route.name === 'Home') {
                labelText = '홈';
              } else if (route.name === 'Messages') {
                labelText = '채팅';
              } else if (route.name === 'Profile') {
                labelText = '마이페이지';
              }

              return (
                <Text style={{ color: focused ? 'white' : '#666', fontWeight: focused ? 'bold' : 'normal', fontSize: 12 }}>
                  {labelText}
                </Text>
              );
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopColor: '#FCDC2A',
              borderTopWidth: 2,
              height: 70,
              paddingBottom: 10,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              overflow: 'hidden', 
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
