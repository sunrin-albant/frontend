import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../components/BackIcon';
import CalendarIcon from '../components/CalendarIcon';

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  const [favoriteCount, setFavoriteCount] = useState(item.favoriteCount);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setFavoriteCount(isFavorite ? favoriteCount - 1 : favoriteCount + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      const parentNavigator = navigation.getParent();
      if (parentNavigator) {
        parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
      }
    }, [navigation])
  );

  const handleBackPress = () => {
    const parentNavigator = navigation.getParent();

    if (parentNavigator) {
      parentNavigator.setOptions({
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: '#FCDC2A',
          borderTopWidth: 2,
          height: 70,
          paddingBottom: 10,
          display: 'flex',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <Image source={{ uri: item.image }} style={styles.backgroundImage} />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
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
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? 'red' : 'black'} 
            />
            <Text style={styles.favoriteCount}>{favoriteCount}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.userContainer}>
          <View style={styles.userIconContainer}>
            <MaterialIcons name="person" size={40} color="#1c1c1c" style={styles.userIcon} />
          </View>
          <View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.location}>소프트웨어과 119기</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.coinInfoContainer}>
              <Image source={require('../assets/Coin.png')} style={styles.smallCoinIcon} />
              <Text style={styles.infoText}>{item.price.toLocaleString()}원</Text>
            </View>
            <View style={styles.dateContainer}>
              <CalendarIcon style={styles.smallCalendarIcon} />
              <Text style={styles.infoText}>{item.date}까지</Text>
            </View>
          </View>
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.tagContainer}>
            {item.tags.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.description}>{item.content}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.chatButton} 
        onPress={() => navigation.navigate('SubmissionScreen', { item })}
      >
        <Text style={styles.chatButtonText}>제출하기</Text>
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
  smallCoinIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
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
  scrollContainer: {
    paddingBottom: 150, 
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
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteCount: {
    ...baseTextStyle,
    fontSize: 16,
    color: 'black',  
    marginLeft: 4,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
    paddingHorizontal: 20,
  },
  userIconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userIcon: {
    borderRadius: 20,
  },
  username: {
    ...baseTextStyle,
    fontSize: 16,
    fontWeight: '600',
    color: '#FCFCFC',
    lineHeight: 20,
    fontStyle: 'normal',
  },
  location: {
    ...baseTextStyle,
    fontSize: 12,
    fontWeight: '600',
    color: '#CCC',
    lineHeight: 16,
    fontStyle: 'normal',
    marginTop: 4,
  },
  infoContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  coinInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  infoText: {
    ...baseTextStyle,
    fontSize: 14,
    color: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  smallCalendarIcon: {
    marginRight: 4,
    width: 20,
    height: 20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#FFD700',
    marginHorizontal: 0,
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 16,
    paddingHorizontal: 20,
  },
  title: {
    ...baseTextStyle,
    fontSize: 17,
    fontWeight: '500',
    color: '#FFF',
    lineHeight: 22,
    fontStyle: 'normal',
    marginBottom: 8,
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
  description: {
    ...baseTextStyle,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chatButton: {
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
    width: '100%', 
    position: 'absolute',
    bottom: 0,
  },
  chatButtonText: {
    ...baseTextStyle,
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40, 
  },
});