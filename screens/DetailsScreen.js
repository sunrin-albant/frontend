import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../components/BackIcon';
import CalendarIcon from '../components/CalendarIcon';
import styles from '../styles/DetailsScreenStyles';

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

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');  
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
          <TouchableOpacity onPress={handleNotificationPress}>
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