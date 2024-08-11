import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import BackIcon from '../components/BackIcon'; 
import CameraIcon from '../components/CameraIcon'; 

const ProfileImageScreen = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('MajorAndYear'); 
  };

  const handleBack = () => {
    navigation.navigate('UserName');
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setProfileImage(uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <BackIcon />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>프로필 사진을</Text>
        <Text style={styles.title}>골라주세요!</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: profileImage }} 
        />
        <TouchableOpacity style={styles.cameraIconContainer} onPress={handleImagePicker}>
          <CameraIcon width={24} height={24} fill="#FCFCFC" />
        </TouchableOpacity>
      </View>
      <View style={styles.pageIndicatorContainer}>
        <View style={styles.circle} />
        <View style={[styles.circle, styles.activeCircle]} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    position: 'absolute',
    top: 100,
    left: 20,
  },
  titleContainer: {
    position: 'absolute',
    top: 140, 
    left: 20,
    alignItems: 'flex-start', 
  },
  title: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 20, 
    fontWeight: '700',
    textAlign: 'left', 
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
    marginTop: 180, 
    alignItems: 'center',
  },
  profileImage: {
    width: 135,
    height: 135,
    borderRadius: 75,
    backgroundColor: '#444',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#444',
    marginHorizontal: 4,
  },
  activeCircle: {
    backgroundColor: '#FCDC2A',
  },
  nextButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFD700',
    height: 70,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#000',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  nextButtonText: {
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
  },
});

export default ProfileImageScreen;
