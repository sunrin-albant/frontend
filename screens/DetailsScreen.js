import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CoinIcon from '../assets/Coin.png';
import BackIcon from '../components/BackIcon';
import FavoriteIcon from '../components/FavoriteIcon'; 
import CalendarIcon from '../components/CalendarIcon'; 

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <Image source={{ uri: item.image }} style={styles.backgroundImage} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.coinContainer}>
            <Image source={require('../assets/Coin.png')} style={styles.coinIcon} />
            <Text style={styles.coinText}>14,000</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.favoriteIcon}>
          <FavoriteIcon onPress={toggleFavorite} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.userContainer}>
          <MaterialIcons name="person" size={40} color="#666" style={styles.userIcon} />
          <View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.location}>소프트웨어과 119기</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>🪙 {item.price.toLocaleString()}원</Text>
            <View style={styles.dateContainer}>
              <CalendarIcon style={styles.calendarIcon} />
              <Text style={styles.infoText}>{item.date}까지</Text>
            </View>
          </View>
        </View>
        <View style={styles.separatorLine} /> {}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.tagContainer}>
            {item.tags.map((tag, i) => (
              <Text key={i} style={styles.tag}>{tag}</Text>
            ))}
          </View>
          <Text style={styles.description}>{item.content}</Text>
        </View>
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>채팅하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 10,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  imageHeader: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
  },
  userIcon: {
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  location: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  infoContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  infoText: {
    fontSize: 14,
    color: '#FFD700',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 4,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#FFD700',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#FFD700',
    color: '#333',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 4,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  chatButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
