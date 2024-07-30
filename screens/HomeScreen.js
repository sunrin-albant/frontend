import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from '../components/CalendarIcon';
import AddIcon from '../components/AddIcon';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const coinImage = require('../assets/Coin.png'); // Adjust the path as necessary

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([
    { id: 1, username: 'user1', title: 'title1', tags: ['개발', '기타'], date: '2024.07.24', price: 3000, image: '', isFavorite: false },
    { id: 2, username: 'user2', title: 'title2', tags: ['심부름', '디자인'], date: '2024.07.24', price: 3000, image: '', isFavorite: false },
    { id: 3, username: 'user3', title: 'title3', tags: ['심부름', '기타'], date: '2024.07.24', price: 3000, image: '', isFavorite: false },
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
      const firstUnfavoritedIndex = updatedData.findIndex(item => !item.isFavorite);
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
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : prevTags.length < 2 ? [...prevTags, tag] : prevTags
    );
  };

  const filteredData = selectedTags.length > 0
    ? data.filter(item => selectedTags.every(tag => item.tags.includes(tag)))
    : data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.coinContainer}>
          <Image source={coinImage} style={styles.coinImage} />
          <Text style={styles.coinText}>14,000</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MaterialIcons name="search" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <MaterialIcons name="notifications-none" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <FlatList
          horizontal
          contentContainerStyle={styles.tabContentContainer}
          showsHorizontalScrollIndicator={false}
          data={[
            { key: '심부름' },
            { key: '개발' },
            { key: '디자인' },
            { key: '기타' },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTags.includes(item.key) && styles.selectedTab,
              ]}
              onPress={() => handleTagPress(item.key)}
            >
              <Text style={[
                styles.tabText,
                selectedTags.includes(item.key) && styles.selectedTabText,
              ]}>{item.key}</Text>
            </TouchableOpacity>
          )}
          style={styles.tabList}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item)}
          >
            <View style={styles.cardContent}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.cardImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <MaterialIcons name="photo" size={40} color="#666" />
                </View>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.tagContainer}>
                  {item.tags.map((tag, i) => (
                    <Text key={i} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
              <TouchableOpacity onPress={() => handleFavoritePress(index)} style={styles.favoriteIconContainer}>
                <MaterialIcons name={item.isFavorite ? "favorite" : "favorite-border"} size={24} color={item.isFavorite ? "red" : "white"} />
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <View style={styles.dateContainer}>
                <CalendarIcon style={styles.calendarIcon} />
                <Text style={styles.date}> {item.date}까지</Text>
              </View>
              <View style={styles.flexSpacer} />
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
    fontSize: 22, 
    fontWeight: '400', 
    color: 'white',
    marginLeft: 3, 
    fontFamily: 'Pretendard', 
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
    paddingVertical: 8, 
    paddingHorizontal: 8, 
    backgroundColor: '#333',
    borderRadius: 4, 
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: '#FCDC2A',
  },
  tabText: {
    color: '#fff',
  },
  selectedTabText: {
    color: '#000000',
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
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardImage: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 72,
    height: 72,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  username: {
    color: '#FCFCFC',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.64,
    marginBottom: 4,
  },
  title: {
    color: '#FCFCFC',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.64,
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#FFD700',
    paddingVertical: 2, 
    paddingHorizontal: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 4,
  },
  tagText: {
    color: '#171717',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
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
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#FFD700',
    fontSize: 14,
  },
  flexSpacer: {
    flex: 1,
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
