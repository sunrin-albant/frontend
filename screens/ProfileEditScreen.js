import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';;
import BackIcon from '../components/BackIcon'; 
import CameraIcon from '../components/CameraIcon'; 

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
          <Text style={styles.title}>프로필 수정하기</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
    marginTop: 160,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    backgroundColor: '#444',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
  },
  label: {
    color: 'white',
    marginBottom: 10,
  },
  spacing: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'rgba(233, 234, 236, 0.80)',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    height: 40,
  },
  secureInput: {
    backgroundColor: 'black',
    color: 'white',
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