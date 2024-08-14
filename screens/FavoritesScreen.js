import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import usePostsStore from '../stores/postsStore';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { posts } = usePostsStore();

  const favoriteCards = posts.filter(post => post.isFavorite);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cardContainer} 
      onPress={() => navigation.navigate('CardDetail', { card: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.tagContainer}>
          {item.tags.map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <MaterialIcons name="date-range" size={14} color="#FFF" />
            <Text style={styles.date}> {item.date}까지</Text>
          </View>
          <View style={styles.priceContainer}>
            <Image source={require('../assets/Coin.png')} style={styles.coinImageSmall} />
            <Text style={styles.price}>{item.price.toLocaleString()}</Text>
          </View>
        </View>
      </View>
      <View style={styles.favoriteContainer}>
        <MaterialIcons name="favorite" size={24} color="#F00" />
        <Text style={styles.favoriteCount}>{item.favoriteCount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>관심 목록</Text>
      {favoriteCards.length > 0 ? (
        <FlatList
          data={favoriteCards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noFavoritesText}>관심 목록이 비어 있습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Pretendard-Bold',
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#171717',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  username: {
    color: '#CCC',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#574F2A',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 5,
  },
  tagText: {
    color: '#FCDC2A',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
  },
  coinImageSmall: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  favoriteContainer: {
    alignItems: 'center',
  },
  favoriteCount: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    marginTop: 4,
  },
  noFavoritesText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
  },
});

export default FavoritesScreen;
