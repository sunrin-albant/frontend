import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmailAndPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleVerify = () => {
    console.log('인증하기');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        이메일과 비밀번호를{'\n'}입력해주세요!
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={[styles.label, styles.spacing]}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={[styles.label, styles.spacing]}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    marginTop: 100,
    marginBottom: 20,
    lineHeight: 28,
  },
  inputContainer: {
    marginTop: 20, 
  },
  label: {
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'transparent',  
    borderWidth: 1,                  
    borderColor: 'rgba(233, 234, 236, 0.80)',  
    color: 'white',                  
    padding: 10,
    borderRadius: 8,
    height: 40,
    marginBottom: 20,
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
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
  },
  nextButtonText: {
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
  },
});

export default EmailAndPasswordScreen;
