import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';
import styles from '../styles/UserNameScreenStyles';

const UserNameScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleNext = () => {
    if (userName.trim() === '') {
      setIsInputEmpty(true);
      Alert.alert('경고', '이름을 입력해 주세요.');
    } else {
      setIsInputEmpty(false);
      navigation.navigate('ProfileImage', { userName }); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>앱에서 사용할</Text>
        <Text style={styles.title}>이름을 정해주세요!</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={[styles.input, isInputEmpty && styles.inputError]}
          placeholder="이름"
          placeholderTextColor="#999"
          value={userName}
          onChangeText={text => {
            setUserName(text);
            if (text.trim() !== '') {
              setIsInputEmpty(false);
            }
          }}
        />
        {isInputEmpty && <Text style={styles.errorText}>이름을 입력해주세요</Text>}
      </View>

      <View style={styles.pageIndicatorContainer}>
        <View style={[styles.circle, styles.activeCircle]} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserNameScreen;
