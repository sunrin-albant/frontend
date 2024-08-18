import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../components/BackIcon'; 
import styles from '../styles/MajorAndYearScreenStyles';

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

export default MajorAndYearScreen;
