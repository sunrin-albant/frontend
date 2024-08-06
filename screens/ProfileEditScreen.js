import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

/**
 * ProfileEdit component allows users to edit their profile information.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.navigation - The navigation object to handle navigation actions.
 * @returns {JSX.Element} A React component that renders the profile edit screen.
 */
export default function ProfileEdit({ navigation }) {
  
  const [name, setName] = useState('권지원');
  const [department, setDepartment] = useState('소프트웨어과');
  const [classYear, setClassYear] = useState('1기');

  const handleSave = () => {
    
    console.log('Profile Saved:', { name, department, classYear });
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>프로필 수정</Text>
      </View>

      {}
      <View style={styles.profileImageContainer}>
        <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/150' }} />
        <TouchableOpacity style={styles.cameraIconContainer}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.form}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="이름"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>학과</Text>
        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
          placeholder="학과"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>기수</Text>
        <TextInput
          style={styles.input}
          value={classYear}
          onChangeText={setClassYear}
          placeholder="기수"
          placeholderTextColor="#888"
        />
      </View>

      {}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Pretendard-Bold',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#666',
    borderRadius: 15,
    padding: 5,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Pretendard-Regular',
  },
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#fff',
    marginBottom: 15,
    fontFamily: 'Pretendard-Regular',
  },
  saveButton: {
    height: 50,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
  },
});
