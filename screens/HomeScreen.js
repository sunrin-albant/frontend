import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoriteIcon from '../components/FavoriteIcon';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([
    { id: 1, username: 'user1', title: 'title1', tags: ['심부름', '기타'], date: '2024.07.24', price: 3000, image: 'https://example.com/image1.jpg' },
    { id: 2, username: 'user2', title: 'title2', tags: ['심부름', '기타'], date: '2024.07.24', price: 3000, image: 'https://example.com/image2.jpg' },
    { id: 3, username: 'user3', title: 'title3', tags: ['심부름', '기타'], date: '2024.07.24', price: 3000, image: 'https://example.com/image3.jpg' },
  ]);

  const handleFavoritePress = (index) => {
    const item = data[index];
    const newData = data.filter((_, i) => i !== index);
    setData([item, ...newData]);
  };

  const handleCardPress = (item) => {
    navigation.navigate('Details', { item });
  };

  const handleAddCard = (newCard) => {
    setData([...data, { ...newCard, id: data.length + 1 }]);
  };

  return (
    <View style={styles.container}>
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
            { key: '테스트1' },
            { key: '테스트2' },
            { key: '테스트3' },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>{item.key}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item)}
          >
            <View style={styles.cardLeft}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.imagePlaceholder} />
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
                <Text style={styles.date}>📅 {item.date}까지</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.price}>🪙 {item.price.toLocaleString()}</Text>
              <FavoriteIcon onPress={() => handleFavoritePress(index)} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddCard', { handleAddCard })}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    backgroundColor: '#1c1c1c',
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
    backgroundColor: '#1c1c1c',
    paddingVertical: 10,
  },
  tabContentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
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
  tabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#424242',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '90%', 
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80, 
    height: 80, 
    backgroundColor: '#666',
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#FFD700',
    color: '#333333',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 4,
  },
  date: {
    fontSize: 12,
    color: '#B3B3B3',
    marginBottom: 4,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: '#FFD700',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    color: 'white',
    fontSize: 24,
  },
});
