import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import CoinIcon from '../assets/Coin.png';
import BackIcon from '../components/BackIcon';
import ImagePickerIcon from '../components/ImagePickerIcon';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddCardScreen({ route, navigation }) {
  const { handleAddCard } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(null);
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [inputErrors, setInputErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const parentNavigator = navigation.getParent();
      if (parentNavigator) {
        parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
      }

      return () => {
        if (parentNavigator) {
          parentNavigator.setOptions({
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopColor: '#FCDC2A',
              borderTopWidth: 2,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height: 70,
              paddingBottom: 10,
              display: 'flex',
            },
          });
        }
      };
    }, [navigation])
  );

  const validateInputs = () => {
    const errors = {};
    if (!title) errors.title = '제목을 입력해주세요.';
    if (!content) errors.content = '본문을 입력해주세요.';
    if (!tags) errors.tags = '해시태그를 입력해주세요.';
    if (!date) errors.date = '마감일을 선택해주세요.';
    if (!price || isNaN(price) || parseInt(price) <= 0) errors.price = '올바른 포인트를 입력해주세요.';
    
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const newErrors = { ...inputErrors };
    switch (field) {
      case 'title':
        if (!value) {
          newErrors.title = '제목을 입력해주세요.';
        } else {
          delete newErrors.title;
        }
        setTitle(value);
        break;
      case 'content':
        if (!value) {
          newErrors.content = '올바른 본문을 입력해주세요.';
        } else {
          delete newErrors.content;
        }
        setContent(value);
        break;
      case 'tags':
        if (!value) {
          newErrors.tags = '해시태그를 입력해주세요.';
        } else if (value.split(',').filter(tag => tag.trim().length > 0).length > 2) {
          newErrors.tags = '태그는 최대 2개까지 입력할 수 있습니다.';
        } else {
          delete newErrors.tags;
        }
        setTags(value);
        break;
      case 'price':
        if (!value || isNaN(value) || parseInt(value) <= 0) {
          newErrors.price = '올바른 포인트를 입력해주세요.';
        } else {
          delete newErrors.price;
        }
        setPrice(value);
        break;
      default:
        break;
    }
    setInputErrors(newErrors);
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const newCard = {
        id: Date.now().toString(),
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        date: date ? date.toISOString().split('T')[0] : '',
        price: parseInt(price, 10),
        image,
      };

      handleAddCard(newCard);
      navigation.navigate('HomeScreen');

      setTitle('');
      setContent('');
      setTags('');
      setDate(null);
      setPrice('');
      setImage(null);
      setInputErrors({});
    } else {
      Alert.alert('오류', '모든 필드를 올바르게 입력해주세요.');
    }
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.coinContainer}>
          <Image source={CoinIcon} style={styles.coinIcon} />
          <Text style={styles.coinText}>14,000</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="notifications-none" size={24} color="white" />
        </TouchableOpacity>
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
            <Text style={styles.label}>제목</Text>
            <TextInput
              style={[styles.input, styles.titleInput, inputErrors.title && styles.inputError]}
              placeholder="제목을 입력하세요"
              placeholderTextColor="#666"
              value={title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
            {inputErrors.title && <Text style={styles.errorText}>{inputErrors.title}</Text>}

            <Text style={styles.label}>본문</Text>
            <TextInput
              style={[styles.input, styles.textArea, inputErrors.content && styles.inputError]}
              placeholder="본문"
              placeholderTextColor="#666"
              value={content}
              onChangeText={(value) => handleInputChange('content', value)}
              multiline
            />
            {inputErrors.content && <Text style={styles.errorText}>{inputErrors.content}</Text>}

            <Text style={styles.label}>해시태그</Text>
            <TextInput
              style={[styles.input, styles.tagInput, inputErrors.tags && styles.inputError]}
              placeholder="해시태그 (최대 2개, 쉼표로 구분)"
              placeholderTextColor="#666"
              value={tags}
              onChangeText={(value) => handleInputChange('tags', value)}
            />
            {inputErrors.tags && <Text style={styles.errorText}>{inputErrors.tags}</Text>}

            <View style={styles.rowContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>마감일</Text>
                <TouchableOpacity
                  style={[
                    styles.input,
                    styles.inputReducedWidth,
                    inputErrors.date && styles.inputError,
                    { paddingHorizontal: 16, paddingVertical: 10 }
                  ]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={{
                    color: date ? '#CCC' : '#666',
                    fontSize: 16,
                    fontWeight: '500',
                    textAlignVertical: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 0
                  }}>
                    {date ? date.toISOString().split('T')[0].replace(/-/g, '.') : 'YYYY.MM.DD'}
                  </Text>
                </TouchableOpacity>
                {inputErrors.date && <Text style={styles.errorText}>{inputErrors.date}</Text>}
                {showDatePicker && (
                  <View style={styles.datePickerContainer}>
                    <DateTimePicker
                      value={date || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          setDate(selectedDate);
                        }
                      }}
                      textColor="#FFF"
                    />
                  </View>
                )}
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>포인트</Text>
                <TextInput
                  style={[styles.input, styles.inputReducedWidth, inputErrors.price && styles.inputError]}
                  placeholder="포인트"
                  placeholderTextColor="#666"
                  value={price}
                  onChangeText={(value) => handleInputChange('price', value)}
                  keyboardType="numeric"
                />
                {inputErrors.price && <Text style={styles.errorText}>{inputErrors.price}</Text>}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>업로드하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const baseTextStyle = {
  fontFamily: 'Pretendard',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  avoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    zIndex: 10,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 'auto',
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  coinText: {
    ...baseTextStyle,
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginLeft: 3,
    lineHeight: 22,
    textAlign: 'center',
  },
  imagePicker: {
    width: '100%',
    height: 300,
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  input: {
    borderColor: '#FCDC2A',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#CCC',
    backgroundColor: '#000',
    ...baseTextStyle,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  titleInput: {
    height: 40, 
  },
  textArea: {
    height: 300,
    color: '#CCC',
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 15,
    ...baseTextStyle,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    alignSelf: 'stretch',
    textAlignVertical: 'top',
  },
  tagInput: {
    color: '#CCC',
    ...baseTextStyle,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    height: 50,
    paddingVertical: 10,
    borderColor: '#FCDC2A',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    marginBottom: 10,
  },
  inputReducedWidth: {
    width: '100%',
    paddingHorizontal: 10,
    height: 50,
    paddingVertical: 10,
  },
  label: {
    color: '#FCFCFC',
    ...baseTextStyle,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
    position: 'relative',
  },
  button: {
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
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  buttonText: {
    ...baseTextStyle,
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  datePickerContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 5,
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    zIndex: 1,
  },
});
