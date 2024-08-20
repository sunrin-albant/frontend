import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useSubmittedJobsStore from '../stores/submittedJobsStore';
import CalendarIcon from '../components/CalendarIcon';
import styles from '../styles/SubmittedJobsScreenStyles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const SubmittedJobItem = ({ item }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [favoriteCount, setFavoriteCount] = React.useState(item.favoriteCount || 0);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavoriteCount(favoriteCount - 1);
    } else {
      setFavoriteCount(favoriteCount + 1);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JobDetails', { item })}>
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
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteContainer}>
          <MaterialIcons name={isFavorite ? "favorite" : "favorite-border"} size={24} color={isFavorite ? "#F00" : "#FFF"} />
          <Text style={styles.favoriteCount}>{favoriteCount}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <CalendarIcon style={styles.calendarIcon} />
          <Text style={styles.date}> {item.date}까지</Text>
        </View>
        <View style={styles.priceContainer}>
          <Image source={require('../assets/Coin.png')} style={styles.coinImageSmall} />
          <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SubmittedJobsScreen = () => {
  const navigation = useNavigation();
  const submittedJobs = useSubmittedJobsStore((state) => state.submittedJobs);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen', { data: submittedJobs });
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotificationsScreen');
  };

  return (
    <View style={styles.container}>
      <Header handleBack={handleBack} navigation={navigation} onSearchPress={handleSearchPress} onNotificationPress={handleNotificationPress} />
      {submittedJobs.length > 0 ? (
        <FlatList
          data={submittedJobs}
          renderItem={({ item }) => <SubmittedJobItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
          style={styles.list}
        />
      ) : (
        <View style={styles.centeredView}>
          <Text style={styles.noJobsText}>제출한 알바가 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

const Header = ({ handleBack, navigation, onSearchPress, onNotificationPress }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={handleBack}>
      <MaterialIcons name="arrow-back-ios" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.pageTitle}>제출한 알바</Text>
    <View style={styles.headerIcons}>
      <TouchableOpacity onPress={onSearchPress}>
        <MaterialIcons name="search" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNotificationPress}>
        <MaterialIcons name="notifications-none" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

export default SubmittedJobsScreen;
