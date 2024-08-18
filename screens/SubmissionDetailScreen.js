import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackIcon from '../components/BackIcon';
import ImagePickerIcon from '../components/ImagePickerIcon';
import { useFocusEffect } from '@react-navigation/native';
import useSubmittedJobsStore from '../stores/submittedJobsStore';
import styles from '../styles/SubmissionDetailScreenStyles';

export default function SubmissionDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [inputErrors, setInputErrors] = useState({});
  const addSubmittedJob = useSubmittedJobsStore((state) => state.addSubmittedJob);

  useFocusEffect(
    React.useCallback(() => {
      const parentNavigator = navigation.getParent();

      if (parentNavigator) {
        parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
      }
    }, [navigation])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInputs = () => {
    const errors = {};
    if (!content) errors.content = '본문을 입력해주세요.';
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const newJob = {
        ...item,
        content: content,
        image: image || item.image,
        submittedDate: new Date().toLocaleDateString(),
        deadline: item.deadline,
      };

      addSubmittedJob(newJob);
      Alert.alert('성공', '제출되었습니다.');
      navigation.goBack();
    } else {
      Alert.alert('오류', '모든 필드를 올바르게 입력해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.coinContainer}>
          <Image source={require('../assets/Coin.png')} style={styles.coinIcon} />
          <Text style={styles.coinText}>14,000</Text>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <ImagePickerIcon />
              )}
            </TouchableOpacity>
            <TextInput
              style={[styles.input, styles.textArea, inputErrors.content && styles.inputError]}
              placeholder="글을 입력해 주세요"
              placeholderTextColor="#666"
              value={content}
              onChangeText={setContent}
              multiline
            />
            {inputErrors.content && <Text style={styles.errorText}>{inputErrors.content}</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>채택하기</Text>
      </TouchableOpacity>
    </View>
  );
}