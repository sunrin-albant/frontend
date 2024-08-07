import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Text } from 'react-native';

import LoginScreen from './screens/LoginScreen'; 
import UserNameScreen from './screens/UserNameScreen';
import ProfileImageScreen from './screens/ProfileImageScreen';
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

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          focus: () => {
            const parentNavigator = navigation.getParent();
            if (parentNavigator) {
              parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
            }
          },
          blur: () => {
            const parentNavigator = navigation.getParent();
            if (parentNavigator) {
              parentNavigator.setOptions({
                tabBarStyle: {
                  backgroundColor: 'black',
                  borderTopColor: '#FCDC2A',
                  borderTopWidth: 2,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  height: 70,
                  paddingBottom: 10,
                  display: 'flex',
                },
              });
            }
          },
        })}
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

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let IconComponent;
          if (route.name === 'Home') {
            IconComponent = HomeIcon;
          } else if (route.name === 'Messages') {
            IconComponent = ChatIcon;
          } else if (route.name === 'Profile') {
            IconComponent = ProfileIcon;
          }

          return IconComponent ? (
            <IconComponent fill={focused ? 'white' : '#666'} focused={focused} />
          ) : null;
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
            <Text
              style={{
                color: focused ? 'black' : '#000000',
                fontWeight: focused ? 'bold' : 'normal',
                fontSize: 12,
              }}
            >
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
  );
}

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Login"  
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS, 
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserName" component={UserNameScreen} />
        <Stack.Screen name="ProfileImage" component={ProfileImageScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
