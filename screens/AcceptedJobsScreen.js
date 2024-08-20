import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from '../components/CalendarIcon';
import styles from '../styles/AcceptedJobsScreenStyles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const AcceptedJobsScreen = () => {
  const navigation = useNavigation();

  const [acceptedJobs, setAcceptedJobs] = useState([]);

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen', { data: acceptedJobs });
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotificationsScreen');  
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('JobDetails', { item })} 
    >
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
          <MaterialIcons name="check-circle" size={24} color="#00F" />
          <Text style={styles.favoriteCount}>{item.favoriteCount}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <CalendarIcon style={styles.calendarIcon} />
          <Text style={styles.date}>{item.date}까지</Text>
        </View>
        <View style={styles.priceContainer}>
          <Image source={require('../assets/Coin.png')} style={styles.coinImageSmall} />
          <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>채택된 알바</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleSearchPress}>
            <MaterialIcons name="search" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotificationPress}>
            <MaterialIcons name="notifications-none" size={24} color="white" style={styles.icon} /> 
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.pageTitle}></Text>
      {acceptedJobs.length > 0 ? (
        <FlatList
          data={acceptedJobs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noFavoritesText}>채택된 알바가 없습니다.</Text>
      )}
    </View>
  );
};

export default AcceptedJobsScreen;
