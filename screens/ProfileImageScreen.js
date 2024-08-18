import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import BackIcon from '../components/BackIcon'; 
import CameraIcon from '../components/CameraIcon'; 
import styles from '../styles/ProfileImageScreenStyles';

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

export default ProfileImageScreen;
