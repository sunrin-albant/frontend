import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import UserNameScreen from './screens/UserNameScreen';
import ProfileImageScreen from './screens/ProfileImageScreen';
import MajorAndYearScreen from './screens/MajorAndYearScreen';
import EmailAndPasswordScreen from './screens/EmailAndPasswordScreen';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddCardScreen from './screens/AddCardScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SubmissionScreen from './screens/SubmissionScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SubmittedJobsScreen from './screens/SubmittedJobsScreen';
import SubmissionDetailScreen from './screens/SubmissionDetailScreen';

import HomeIcon from './components/HomeIcon';
import ProfileIcon from './components/ProfileIcon';
import AddIcon from './components/AddIcon';
import usePostsStore from './stores/postsStore';
import AcceptedJobsScreen from './screens/AcceptedJobsScreen';

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
    <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} /> 
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen 
        name="SubmissionScreen" 
        component={SubmissionScreen} 
        options={{ tabBarStyle: { display: 'none' } }} 
      /> 
      <Stack.Screen name="SubmissionDetailScreen" component={SubmissionDetailScreen} /> 
    </Stack.Navigator>
  );
}
function ProfileStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="SubmittedJobsScreen" component={SubmittedJobsScreen} />
      <Stack.Screen name="AcceptedJobsScreen" component={AcceptedJobsScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} /> 
    </Stack.Navigator>
  );
}


function MainTabNavigator({ navigation }) {
  const { posts, setPosts } = usePostsStore();

  const handleAddCard = (newCard) => {
    setPosts([...posts, newCard]);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let IconComponent;
          if (route.name === 'Home') {
            IconComponent = HomeIcon;
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
      <Tab.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                top: -10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('AddCard', { handleAddCard: (newCard) => handleAddCard(newCard) })}
            >
              <View
                style={{
                  marginTop: 30,
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  backgroundColor: 'black',
                  borderColor: '#424242',
                  borderWidth: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AddIcon fill="#424242" width={25} height={25} />
              </View>
            </TouchableOpacity>
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ tabBarLabel: '마이페이지' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserName" component={UserNameScreen} />
        <Stack.Screen name="ProfileImage" component={ProfileImageScreen} />
        <Stack.Screen name="MajorAndYear" component={MajorAndYearScreen} />
        <Stack.Screen name="EmailAndPassword" component={EmailAndPasswordScreen} />
        <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
