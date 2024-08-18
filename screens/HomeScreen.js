import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import * as Font from 'expo-font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from '../components/CalendarIcon';
import CustomLogo from '../components/CustomLogo';
import usePostsStore from '../stores/postsStore';
import styles from '../styles/HomeScreenStyles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const antImage = require('../assets/logo.png'); 
const coinImage = require('../assets/Coin.png'); 

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { posts, setPosts } = usePostsStore();

  const handleFavoritePress = (index) => {
    const updatedData = [...posts];
    if (updatedData[index].favoriteCount === undefined) {
      updatedData[index].favoriteCount = 0;
    }
    updatedData[index].isFavorite = !updatedData[index].isFavorite;
    updatedData[index].favoriteCount += updatedData[index].isFavorite ? 1 : -1;
    setPosts(updatedData); 
  };

  const handleCardPress = (item, index) => {
    navigation.navigate('Details', {
      item,
      index,
      posts,
      setPosts, 
    });
  };
  

  const addNewCard = () => {
    const newCard = {
      id: posts.length + 1,
      image: 'new_image_url',
      username: 'New User',
      title: 'New Title',
      tags: ['new', 'tag'],
      isFavorite: false,
      favoriteCount: 0, 
      date: '2024-08-31',
      price: 1000,
    };
    setPosts([...posts, newCard]);
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
          <View style={{ marginLeft: 4 }}>
            <CustomLogo />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search', { data: posts })}>
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
                        <Text style={styles.tagText}>#{tag}</Text>
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
                <Text style={styles.favoriteCount}>{item.favoriteCount || 0}</Text>
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

export default HomeScreen;
