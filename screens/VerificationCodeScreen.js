import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../components/BackIcon'; 
import styles from '../styles/VerificationCodeScreenStyles';

const VerificationCodeScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleComplete = () => {
    console.log('인증번호:', code);
    navigation.navigate('Main'); 
  };

  return (
    <View style={styles.container}>
      {}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <BackIcon />
      </TouchableOpacity>

      {}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>이메일로 전송된{'\n'}인증번호를 입력해주세요!</Text>
      </View>

      {}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>인증번호</Text>
        <TextInput
          style={styles.input}
          placeholder="인증번호"
          placeholderTextColor="#666"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          selectionColor="white"
        />
      </View>

      {}
      <View style={styles.pageIndicatorContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={[styles.circle, styles.activeCircle]} />
      </View>

      {}
      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationCodeScreen;