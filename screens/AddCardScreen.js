import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import CoinIcon from '../assets/Coin.png';
import BackIcon from '../components/BackIcon';
import ImagePickerIcon from '../components/ImagePickerIcon';

export default function AddCardScreen({ route, navigation }) {
  const { handleAddCard } = route.params;

  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [inputErrors, setInputErrors] = useState({});

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

  const handleTagPress = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      if (tags.length < 2) {
        setTags([...tags, tag]);
      } else {
        Alert.alert('오류', '태그는 최대 2개까지 선택할 수 있습니다.');
      }
    }
  };

  const validateInputs = () => {
    const errors = {};
    if (!title) errors.title = '제목을 입력해주세요.';
    if (!content) errors.content = '본문을 입력해주세요.';
    if (tags.length > 2) errors.tags = '태그는 최대 2개까지 선택할 수 있습니다.';
    const datePattern = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!datePattern.test(date)) errors.date = '날짜는 YYYY.MM.DD 형식으로 입력해야 합니다.';
    if (!price) errors.price = '포인트를 입력해주세요.';
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const newErrors = { ...inputErrors };
    if (value) {
      delete newErrors[field];
    } else {
      newErrors[field] = `올바른 ${field}를 입력해주세요.`;
    }
    setInputErrors(newErrors);
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'content':
        setContent(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'price':
        setPrice(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const newCard = {
        id: Date.now().toString(),
        username,
        title,
        content,
        tags,
        date,
        price: parseInt(price, 10),
        image,
      };

      handleAddCard(newCard);
      navigation.goBack();
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
              placeholder="제목"
              placeholderTextColor="#666"
              value={title}
              onChangeText={(value) => handleInputChange('title', value)}
              editable
            />
            {inputErrors.title && <Text style={styles.errorText}>{inputErrors.title}</Text>}
            <Text style={styles.label}>본문</Text>
            <TextInput
              style={[styles.input, styles.textArea, inputErrors.content && styles.inputError]}
              placeholder="본문을 입력해 주세요."
              placeholderTextColor="#666"
              value={content}
              onChangeText={(value) => handleInputChange('content', value)}
              multiline
              editable
            />
            {inputErrors.content && <Text style={styles.errorText}>{inputErrors.content}</Text>}
            <Text style={styles.label}>태그</Text>
            <View style={styles.tagContainer}>
              {['심부름', '개발', '디자인', '기타'].map(tag => (
                <TouchableOpacity
                  key={tag}
                  style={[styles.tag, tags.includes(tag) && styles.selectedTag]}
                  onPress={() => handleTagPress(tag)}
                >
                  <Text style={[styles.tagText, tags.includes(tag) && styles.selectedTagText]}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>마감일</Text>
                <TextInput
                  style={[styles.input, styles.inputReducedWidth, inputErrors.date && styles.inputError]}
                  placeholder="YYYY.MM.DD"
                  placeholderTextColor="#666"
                  value={date}
                  onChangeText={(value) => handleInputChange('date', value)}
                  editable
                />
                {inputErrors.date && <Text style={styles.errorText}>{inputErrors.date}</Text>}
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
                  editable
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
    width: 80,
    height: 80,
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
    height: 48,
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
    color: '#CCC',
    ...baseTextStyle,
    fontSize: 16, 
    fontWeight: '500',
    lineHeight: 20, 
  },
  inputReducedWidth: {
    width: '90%',
    paddingHorizontal: 10,
  },
  textArea: {
    borderColor: '#FCDC2A',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#CCC',
    backgroundColor: '#000',
    ...baseTextStyle,
    fontSize: 16, 
    fontWeight: '500',
    lineHeight: 20, 
    display: 'flex',
    alignItems: 'flex-start',
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: 200,
  },
  label: {
    color: '#FCFCFC',
    ...baseTextStyle,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  tag: {
    backgroundColor: '#FFD700',
    borderRadius: 4,
    marginRight: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 32,
    paddingHorizontal: 8,
  },
  selectedTag: {
    backgroundColor: '#666',
  },
  tagText: {
    ...baseTextStyle,
    color: 'var(--secondary, #171717)',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  selectedTagText: {
    color: '#999999',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
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
  buttonText: {
    ...baseTextStyle,
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
