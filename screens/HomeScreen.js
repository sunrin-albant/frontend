import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import * as Font from 'expo-font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from '../components/CalendarIcon';
import AddIcon from '../components/AddIcon';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const antImage = require('../assets/logo.png'); 
const coinImage = require('../assets/Coin.png'); 

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      username: 'user1',
      title: 'title',
      tags: ['심부름', '노동'],
      date: '2024.07.24',
      price: 3000,
      image: 'https://via.placeholder.com/150', 
      isFavorite: false,
    },
    {
      id: 2,
      username: 'user2',
      title: 'title2',
      tags: ['심부름', '디자인'],
      date: '2024.07.24',
      price: 3000,
      image: 'https://via.placeholder.com/150',
      isFavorite: false,
    },
    {
      id: 3,
      username: 'user3',
      title: 'title3',
      tags: ['심부름', '기타'],
      date: '2024.07.24',
      price: 3000,
      image: 'https://via.placeholder.com/150', 
      isFavorite: false,
    },
  ]);
  
  const [selectedTags, setSelectedTags] = useState([]);

  const handleFavoritePress = (index) => {
    const updatedData = [...data];
    updatedData[index].isFavorite = !updatedData[index].isFavorite;

    if (updatedData[index].isFavorite) {
      const [movedItem] = updatedData.splice(index, 1);
      updatedData.unshift(movedItem);
    } else {
      const [movedItem] = updatedData.splice(index, 1);
      const firstUnfavoritedIndex = updatedData.findIndex((item) => !item.isFavorite);
      if (firstUnfavoritedIndex === -1) {
        updatedData.push(movedItem);
      } else {
        updatedData.splice(firstUnfavoritedIndex, 0, movedItem);
      }
    }

    setData(updatedData);
  };

  const handleCardPress = (item) => {
    navigation.navigate('Details', { item });
  };

  const handleAddCard = (newCard) => {
    setData([...data, { ...newCard, id: data.length + 1, isFavorite: false }]);
  };

  const handleTagPress = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : prevTags.length < 2 ? [...prevTags, tag] : prevTags
    );
  };

  const filteredData =
    selectedTags.length > 0
      ? selectedTags.includes('전체')
        ? data 
        : data.filter((item) => selectedTags.every((tag) => item.tags.includes(tag)))
      : data;

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'), // Pretendard Regular
        'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'), // Pretendard Bold
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지 아무것도 표시하지 않음
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.coinContainer}>
          <Image source={antImage} style={styles.coinImage} />
          <Text style={styles.coinText}>선린천국</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search', { data })}>
            <MaterialIcons name="search" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <MaterialIcons name="notifications-none" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.titleText}>현재 인기 많은 알바!</Text>

      <View style={styles.tabContainer}>
        <FlatList
          horizontal
          contentContainerStyle={styles.tabContentContainer}
          showsHorizontalScrollIndicator={false}
          data={[
            { key: '전체' }, 
            { key: '심부름' },
            { key: '개발' },
            { key: '디자인' },
            { key: '기타' },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tab, selectedTags.includes(item.key) && styles.selectedTab]}
              onPress={() => handleTagPress(item.key)}
            >
              <Text style={[styles.tabText, selectedTags.includes(item.key) && styles.selectedTabText]}>{item.key}</Text>
            </TouchableOpacity>
          )}
          style={styles.tabList}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.tagContainer}>
                  {item.tags.map((tag, i) => (
                    <View key={i} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.profileImageContainer}>
                <Image source={{ uri: item.image }} style={styles.profileImage} />
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.dateContainer}>
                <CalendarIcon style={styles.calendarIcon} />
                <Text style={styles.date}> {item.date}까지</Text>
              </View>
              <View style={styles.priceContainer}>
                <Image source={coinImage} style={styles.coinImageSmall} />
                <Text style={styles.price}>{item.price.toLocaleString()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddCard', { handleAddCard })}>
        <AddIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000000',
    marginBottom: 20,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 16,
    fontWeight: '700', // Adjusted to match the weight
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 22, // 137.5% equivalent
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
    marginLeft: 3,
  },
  coinImage: {
    width: 30,
    height: 30,
    marginRight: 3,
  },
  coinImageSmall: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 12,
  },
  titleText: {
    color: '#FCFCFC',
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    letterSpacing: -0.32,
    marginLeft: 20,
    marginBottom: 20,
  },
  tabContainer: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingLeft: 20,
    marginBottom: 20,
  },
  tabContentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tabList: {
    alignSelf: 'flex-start',
  },
  tab: {
    display: 'flex',
    paddingVertical: 6,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    borderRadius: 8, 
    marginRight: 8,
  },
  selectedTab: {
    backgroundColor: '#FCDC2A', 
    borderRadius: 8, 
  },
  tabText: {
    color: '#fff',
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
  },
  selectedTabText: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
  },
  contentContainer: {
    paddingBottom: 100,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  card: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 20,
    marginBottom: 32,
    width: CARD_WIDTH,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.09)',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 12,
    height: 94.933,
  },
  username: {
    color: '#CCC',
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    letterSpacing: -0.28,
    marginBottom: 4,
  },
  title: {
    color: '#FCFCFC',
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.64,
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    display: 'flex',
    paddingVertical: 3,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(252, 220, 42, 0.20)',
    marginRight: 4,
  },
  tagText: {
    color: '#FCDC2A',
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
  },
  favoriteIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 2,
  },
  date: {
    color: '#FCFCFC',
    fontSize: 16,
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#FFD700',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular', // Pretendard Regular 적용
  },
  flexSpacer: {
    flex: 1,
  },
  profileImageContainer: {
    width: 64,
    height: 94.933,
    borderRadius: 8,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    backgroundColor: '#FCDC2A',
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
