import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../styles/ProfileScreenStyles';  

export default function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    profileImage = 'https://via.placeholder.com/150', 
    name,
    department,
    generation
  } = route.params || {};  

  const displayName = name ? name : '이름';
  const displayDepartment = department ? department : '학과';
  const displayGeneration = generation ? generation : '기수';

  const navigateToProfileEdit = () => {
    navigation.navigate('ProfileEditScreen');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.profileSection}>
        <ProfileInfo 
          profileImage={profileImage} 
          name={displayName} 
          department={displayDepartment} 
          generation={displayGeneration} 
        />
        
        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfileEdit}>
          <Text style={styles.profileButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>

      <ActivitySection navigation={navigation} />

      <View style={styles.accountSection}>
        <Text style={styles.accountTitle}>계정</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#fff" />
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.pageTitle}>마이페이지</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <MaterialIcons name="notifications-none" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
    </View>
  );
};

const ProfileInfo = ({ profileImage, name, department, generation }) => (
  <View style={styles.profileInfo}>
    <Image 
      source={{ uri: profileImage }} 
      style={styles.profilePicture} 
    />
    <View style={styles.userInfo}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.class}>{`${department} ${generation}`}</Text>
    </View>
    <View style={styles.pointsContainer}>
      <Image source={require('../assets/Coin.png')} style={styles.coinIcon} />
      <Text style={styles.pointsText}>14,000</Text>
    </View>
  </View>
);

const ActivitySection = ({ navigation }) => (
  <View style={styles.activitySection}>
    <Text style={styles.activityTitle}>나의 활동</Text>
    <ActivityItem 
      icon="heart-outline" 
      text="관심 목록" 
      navigateTo={() => navigation.navigate('FavoritesScreen', { favoriteCards: [] })}
    />
    <ActivityItem 
      icon="check-circle-outline" 
      text="제출한 알바" 
      navigateTo={() => navigation.navigate('SubmittedJobsScreen', { submittedJobs : [] })}
    />
    <ActivityItem 
      icon="clipboard-check-outline" 
      text="채택된 알바" 
      navigateTo={() => console.log('채택된 알바 화면으로 이동')}
    />
  </View>
);

const ActivityItem = ({ icon, text, navigateTo }) => (
  <TouchableOpacity style={styles.activityItem} onPress={navigateTo}>
    <MaterialCommunityIcons name={icon} size={24} color="#fff" /> 
    <Text style={styles.activityText}>{text}</Text>
  </TouchableOpacity>
);
