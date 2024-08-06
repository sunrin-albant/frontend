import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';

const UserNameScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  const handleNext = () => {
    if (userName.trim() === '') {
      Alert.alert('경고', '이름을 입력해 주세요.');
    } else {
      navigation.navigate('ProfileImage');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>앱에서 사용할</Text>
        <Text style={styles.title}>이름을 정해주세요!</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름"
          placeholderTextColor="#999"
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      <View style={styles.pageIndicatorContainer}>
        <View style={[styles.circle, styles.activeCircle]} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  title: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  inputContainer: {
    marginTop: 0,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
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
    zIndex: 20,
  },
  nextButtonText: {
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default UserNameScreen;
