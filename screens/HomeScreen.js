import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import * as Font from 'expo-font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from '../components/CalendarIcon';
import CustomLogo from '../components/CustomLogo';
import usePostsStore from '../stores/postsStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const antImage = require('../assets/logo.png'); 
const coinImage = require('../assets/Coin.png'); 

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { posts, setPosts } = usePostsStore();

  const handleFavoritePress = (index) => {
    const updatedData = [...posts];
    updatedData[index].isFavorite = !updatedData[index].isFavorite;
    updatedData[index].favoriteCount += updatedData[index].isFavorite ? 1 : -1;
    setData(updatedData);
  };

  const handleCardPress = (item) => {
    navigation.navigate('Details', { item });
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
        'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
        'SangjuGgotgamche': require('../assets/fonts/SANGJU Gotgam.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.coinContainer}>
          <Image source={antImage} style={styles.coinImage} />
          <View style={{marginLeft:4}}>
            <CustomLogo/>
          </View>
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

      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <View style={styles.cardContent}>
              <View style={styles.textAndImageContainer}>
                <Image source={{ uri: item.image }} style={styles.profileImage} />
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
              </View>
              <View style={styles.favoriteContainer}>
                <TouchableOpacity
                  style={styles.favoriteIconContainer}
                  onPress={() => handleFavoritePress(index)}
                >
                  <MaterialIcons
                    name={item.isFavorite ? 'favorite' : 'favorite-border'}
                    size={24}
                    color={item.isFavorite ? '#F00' : '#FFF'}
                  />
                </TouchableOpacity>
                <Text style={styles.favoriteCount}>{item.favoriteCount}</Text>
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
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'SangjuGgotgamche',
    marginLeft: 3,
  },
  coinImage: {
    width: 40,
    height: 40,
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
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.32,
    marginLeft: 20,
    marginBottom: 20,
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.09)',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    padding: 16,
    marginBottom: 24,
    width: CARD_WIDTH,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textAndImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    color: '#CCC',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: -0.28,
    marginBottom: 4,
  },
  title: {
    color: '#FCFCFC',
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
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
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
  },
  favoriteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteCount: {
    color: '#FFF',
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    marginTop: 4,
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
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
  flexSpacer: {
    flex: 1,
  },
  profileImageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 12,
  },
});

export default HomeScreen;
