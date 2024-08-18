import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';;
import BackIcon from '../components/BackIcon'; 
import CameraIcon from '../components/CameraIcon'; 
import styles from '../styles/ProfileEditScreenStyles';

const ProfileImageScreen = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [generation, setGeneration] = useState('');
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const parentNavigator = navigation.getParent();
      if (parentNavigator) {
        parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
      }

      return () => {
        if (parentNavigator) {
          parentNavigator.setOptions({
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopColor: '#FCDC2A',
              borderTopWidth: 2,
              height: 70,
              paddingBottom: 10,
              display: 'flex',
            },
          });
        }
      };
    }, [navigation])
  );

  const handleNext = () => {
    navigation.navigate('ProfileScreen', {
      profileImage,
      name,
      department,
      generation,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleImagePicker = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>프로필 수정</Text>
        </View>
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
          selectionColor="white"
        />
        <Text style={[styles.label, styles.spacing]}>학과</Text>
        <TextInput
          style={[styles.input, styles.secureInput]}
          placeholder="학과"
          placeholderTextColor="#666"
          value={department}
          onChangeText={setDepartment}
        />
        <Text style={[styles.label, styles.spacing]}>기수</Text>
        <TextInput
          style={[styles.input, styles.secureInput]}
          placeholder="기수"
          placeholderTextColor="#666"
          value={generation}
          onChangeText={setGeneration}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>적용하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImageScreen;
