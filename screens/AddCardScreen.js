import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AddCardScreen({ route, navigation }) {
  const { handleAddCard } = route.params;

  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.coinContainer}>
          <MaterialIcons name="attach-money" size={24} color="gold" />
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
          <MaterialIcons name="photo-camera" size={40} color="#666" />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="제목"
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="본문을 입력해 주세요."
        placeholderTextColor="#666"
        value={content}
        onChangeText={setContent}
        multiline
      />
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
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>업로드하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#1c1c1c',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  imagePicker: {
    width: 80,
    height: 80,
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  input: {
    height: 48,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: 'white',
    backgroundColor: '#1c1c1c',
  },
  textArea: {
    height: 100,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
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
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    color: 'white',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
