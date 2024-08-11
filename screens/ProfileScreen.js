import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

export default function ProfileScreen({ navigation }) {
  const navigateToProfileEdit = () => {
    navigation.navigate('ProfileEdit');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.profileSection}>
        <ProfileInfo />
        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfileEdit}>
          <Text style={styles.profileButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
      <ActivitySection />
    </View>
  );
}

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.pageTitle}>마이페이지</Text>
    <TouchableOpacity>
      <MaterialIcons name="notifications-none" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const ProfileInfo = () => (
  <View style={styles.profileInfo}>
    <View style={styles.profilePicture} />
    <View style={styles.userInfo}>
      <Text style={styles.name}>이름</Text>
      <Text style={styles.class}>소프트웨어과 119기</Text>
    </View>
    <View style={styles.pointsContainer}>
      <Image source={require('../assets/Coin.png')} style={styles.coinIcon} />
      <Text style={styles.pointsText}>14,000</Text>
    </View>
  </View>
);

const ActivitySection = () => (
  <View style={styles.activitySection}>
    <Text style={styles.activityTitle}>나의 활동</Text>
    <ActivityItem icon="heart-outline" text="관심 목록" />
    <ActivityItem icon="check-circle-outline" text="노동 목록" />
    <ActivityItem icon="clipboard-check-outline" text="고용 목록" />
  </View>
);

const ActivityItem = ({ icon, text }) => (
  <View style={styles.activityItem}>
    <MaterialCommunityIcons name={icon} size={24} color="#fff" /> 
    <Text style={styles.activityText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    marginTop: 40,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: -24,
    fontFamily: 'Pretendard-Bold',
  },
  profileSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingLeft: 0,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    marginRight: 20,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    marginBottom: 5,
    fontFamily: 'Pretendard-Bold',
  },
  class: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Pretendard-Regular',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  pointsText: {
    color: '#FCFCFC',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 22,
  },
  profileButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 24,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Pretendard',
    fontWeight: '700',
  },
  activitySection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  activityTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Pretendard-Bold',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'Pretendard-Regular',
  },
});