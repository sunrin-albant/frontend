import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../styles/LoginScreenStyles';

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Main');
  };

  const handleSignUp = () => {
    navigation.navigate('UserName');
  };

  return (
    <View style={styles.container}>
      {}
      <Image
        source={require('../assets/logo.png')} 
        style={styles.logoa}
      />
      {}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일"
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>
      {}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="#999"
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      {}
      <TouchableOpacity style={styles.signUpContainer} onPress={handleSignUp}>
        <Text style={styles.signUpText}>회원가입하기</Text>
      </TouchableOpacity>
      {}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
