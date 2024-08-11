import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../components/BackIcon'; 

const MajorAndYearScreen = () => {
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('EmailAndPassword'); 
  };

  const handleBack = () => {
    navigation.goBack(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <BackIcon />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>학과와 기수를</Text>
        <Text style={styles.title}>적어주세요!</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>학과</Text>
        <TextInput
          style={styles.input}
          placeholder="학과를 입력하세요"
          placeholderTextColor="#666"
          value={major}
          onChangeText={setMajor}
        />
        <Text style={[styles.label, styles.spacing]}>기수</Text>
        <TextInput
          style={styles.input}
          placeholder="기수를 입력하세요"
          placeholderTextColor="#666"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.pageIndicatorContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={[styles.circle, styles.activeCircle]} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    paddingHorizontal: 20,
  },
  label: {
    color: 'white',
    marginBottom: 10,
  },
  spacing: {
    marginTop: 20, 
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
    lineHeight: 40,
  },
});

export default MajorAndYearScreen;
