import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import CameraIcon from '../components/CameraIcon'; 
import BackIcon from '../components/BackIcon'; // 백아이콘 추가
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 알림 아이콘 추가
import CoinIcon from '../assets/Coin.png'; // 코인 아이콘 이미지 추가

export default function ProfileEditScreen({ navigation }) {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

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
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height: 70,
              paddingBottom: 10,
              display: 'flex',
            },
          });
        }
      };
    }, [navigation])
  );

  const handleSave = () => {
    navigation.goBack();
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
      {/* 헤더 시작 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.coinContainer}>
          <Image source={CoinIcon} style={styles.coinIcon} />
          <Text style={styles.coinText}>14,000</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="notifications-none" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* 헤더 끝 */}

      <Text style={styles.title}>프로필 수정</Text>
      
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: profileImage }} 
        />
        <TouchableOpacity style={styles.cameraIconContainer} onPress={handleImagePicker}>
          <CameraIcon width={24} height={24} fill="#FCFCFC" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="이름"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="학과"
        placeholderTextColor="#666"
        value={major}
        onChangeText={setMajor}
      />
      <TextInput
        style={styles.input}
        placeholder="기수"
        placeholderTextColor="#666"
        value={year}
        onChangeText={setYear}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const baseTextStyle = {
  fontFamily: 'Pretendard', 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    zIndex: 10,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 'auto',
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  coinText: {
    ...baseTextStyle,
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginLeft: 3,
    lineHeight: 22,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 90, 
    height: 90,
    borderRadius: 75,  
    backgroundColor: '#ccc',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 10,  
    right: 10,  
    width: 40,
    height: 40,
    borderRadius: 20,  
    backgroundColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderColor: '#FCDC2A',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#CCC',
    backgroundColor: '#000',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 10,
  },
  saveButton: {
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
  saveButtonText: {
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
  },
});
