import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
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

  const handleSubmit = () => {
    if (tags.length > 2) {
      Alert.alert('오류', '태그는 최대 2개까지 선택할 수 있습니다.');
      return;
    }

    const datePattern = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!datePattern.test(date)) {
      Alert.alert('오류', '날짜는 YYYY.MM.DD 형식으로 입력해야 합니다.');
      return;
    }

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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <ImagePickerIcon />
            )}
          </TouchableOpacity>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="제목"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
            editable
          />
          <Text style={styles.label}>본문</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="본문을 입력해 주세요."
            placeholderTextColor="#666"
            value={content}
            onChangeText={setContent}
            multiline
            editable
          />
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
            <View style={styles.inputContainer}>
              <Text style={styles.label}>마감일</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY.MM.DD"
                placeholderTextColor="#666"
                value={date}
                onChangeText={setDate}
                editable
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>포인트</Text>
              <TextInput
                style={styles.input}
                placeholder="포인트"
                placeholderTextColor="#666"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                editable
              />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 16,
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
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginLeft: 3,
    fontFamily: 'Pretendard',
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
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 30,
  },
  textArea: {
    borderColor: '#FCDC2A',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 30,
    color: '#CCC',
    backgroundColor: '#000',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    display: 'flex',
    alignItems: 'flex-start',
    flex: 1,
    alignSelf: 'stretch',
  },
  label: {
    color: '#FCFCFC',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  tag: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  selectedTag: {
    backgroundColor: '#666',
  },
  tagText: {
    color: '#333',
  },
  selectedTagText: {
    color: '#FFD700',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 8,
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
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
