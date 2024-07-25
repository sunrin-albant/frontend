import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddCardScreen({ route, navigation }) {
  const { handleAddCard } = route.params;

  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    const newTags = tags.split(',').map(tag => tag.trim());
    if (newTags.length > 3) {
      Alert.alert('오류', '태그는 최대 3개까지 입력할 수 있습니다.');
      return;
    }

    const datePattern = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!datePattern.test(date)) {
      Alert.alert('오류', '날짜는 YYYY.MM.DD 형식으로 입력해야 합니다.');
      return;
    }

    const newCard = {
      username,
      title,
      tags: newTags,
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
      <Text style={styles.header}>새 카드 추가</Text>
      <TextInput
        style={styles.input}
        placeholder="사용자 이름"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="태그 (쉼표로 구분, 최대 3개)"
        value={tags}
        onChangeText={setTags}
      />
      <TextInput
        style={styles.input}
        placeholder="날짜 (YYYY.MM.DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="가격"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>갤러리에서 이미지 선택</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>카드 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  imagePicker: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
