import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../components/BackIcon'; 

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    position: 'absolute',
    top: 100,
    left: 20,
  },
  titleContainer: {
    position: 'absolute',
    top: 140, 
    left: 20,
    alignItems: 'flex-start',
  },
  title: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
  },
  inputContainer: {
    marginTop: 200,
  },
  label: {
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(233, 234, 236, 0.80)',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    height: 40,
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
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
  completeButton: {
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
  completeButtonText: {
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
  },
});

export default VerificationCodeScreen;