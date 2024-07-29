import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from '../components/CalendarIcon';
import AddIcon from '../components/AddIcon';
import HomeIcon from '../components/HomeIcon'; // HomeIcon 컴포넌트 임포트
import ChatIcon from '../components/ChatIcon'; // ChatIcon 컴포넌트 임포트

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([
    { id: 1, username: 'user1', title: 'title1', tags: ['개발', '기타'], date: '2024.07.24', price: 3000, image: '', isFavorite: false },
    { id: 2, username: 'user2', title: 'title2', tags: ['심부름', '디자인'], date: '2024.07.24', price: 3000, image: '', isFavorite: false },
    { id: 3, username: 'user3', title: 'title3', tags: ['심부름', '기타'], date: '2024.07.24', price: 3000, image: '', isFavorite: false },
  ]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('Home');

  const handleFavoritePress = (index) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    setData(newData);
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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <>
            <View style={styles.header}>
              <View style={styles.coinContainer}>
                <MaterialIcons name="attach-money" size={24} color="gold" />
                <Text style={styles.coinText}>14,000</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                  <MaterialIcons name="search" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                  <MaterialIcons name="notifications-none" size={24} color="white" />
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
                    <Text style={styles.price}>🪙 {item.price.toLocaleString()}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.contentContainer}
            />

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddCard', { handleAddCard })}>
              <AddIcon />
            </TouchableOpacity>
          </>
        );
      case 'Messages':
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.screenText}>채팅 화면</Text>
          </View>
        );
      case 'Profile':
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.screenText}>마이페이지 화면</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.navItem}>
          <HomeIcon fill="#FCFCFC" /> {/* 색상을 고정 */}
          <Text style={[styles.navText, currentScreen === 'Home' && styles.activeNavText]}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('Messages')} style={styles.navItem}>
          <ChatIcon fill={currentScreen === 'Messages' ? '#FCFCFC' : 'none'} />
          <Text style={[styles.navText, currentScreen === 'Messages' && styles.activeNavText]}>채팅</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('Profile')} style={styles.navItem}>
          <MaterialIcons name="person-outline" size={24} color={currentScreen === 'Profile' ? 'yellow' : 'white'} />
          <Text style={[styles.navText, currentScreen === 'Profile' && styles.activeNavText]}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000000',
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContainer: {
    backgroundColor: '#000000',
    paddingVertical: 10,
  },
  tabContentContainer: {
    backgroundColor: '#000000',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    marginHorizontal: 4,
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
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: width * 0.9,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  username: {
    color: '#CCC',
    fontSize: 16,
    marginBottom: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tag: {
    backgroundColor: '#FFD700',
    color: '#171717',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginRight: 4,
  },
  favoriteIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 4,
  },
  date: {
    color: '#FCFCFC',
    fontSize: 16,
  },
  price: {
    color: '#FFD700',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: '#FCDC2A',
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#FCDC2A',
    borderTopWidth: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
  activeNavText: {
    color: 'yellow',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    color: 'white',
    fontSize: 20,
  },
});

export default HomeScreen;
