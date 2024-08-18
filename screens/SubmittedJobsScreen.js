import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useSubmittedJobsStore from '../stores/submittedJobsStore';
import CalendarIcon from '../components/CalendarIcon';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const SubmittedJobItem = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(item.favoriteCount || 0);

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

  return (
    <View style={styles.container}>
      <Header handleBack={handleBack} />
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

const Header = ({ handleBack }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={handleBack}>
      <MaterialIcons name="arrow-back-ios" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.pageTitle}>제출한 알바</Text>
    <View style={styles.headerIcons}>
      <TouchableOpacity>
        <MaterialIcons name="search" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="notifications-none" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    marginTop: 40,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: -58,
    fontFamily: 'Pretendard-Bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15, 
  },
  contentContainer: {
    paddingBottom: 100,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 54,
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
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 12,
  },
  centeredView: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobsText: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', 
    marginTop: '50%', 
  },
  coinImageSmall: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
});

export default SubmittedJobsScreen;
