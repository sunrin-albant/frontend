import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../components/BackIcon';
import styles from '../styles/EmailAndPasswordScreenStyles';

const EmailAndPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleVerify = () => {
    console.log('인증하기 버튼 눌림');
    console.log('입력된 이메일:', email);
    console.log('입력된 비밀번호:', password);
    
    navigation.navigate('VerificationCode');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <BackIcon />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          이메일과 비밀번호를{'\n'}입력해주세요!
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          selectionColor="white"  
        />
        <Text style={[styles.label, styles.spacing]}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          selectionColor="white"
        />
        <Text style={[styles.label, styles.spacing]}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          selectionColor="white"  
        />
      </View>
      <View style={styles.pageIndicatorContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={[styles.circle, styles.activeCircle]} />
        <View style={styles.circle} />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleVerify}>
        <Text style={styles.nextButtonText}>인증하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailAndPasswordScreen;