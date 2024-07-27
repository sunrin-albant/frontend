import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageHeader}>
          <Image source={{ uri: item.image }} style={styles.backgroundImage} />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.coinContainer}>
              <MaterialIcons name="attach-money" size={24} color="gold" />
              <Text style={styles.coinText}>14,000</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="notifications-none" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
            <MaterialIcons name={isFavorite ? "favorite" : "favorite-border"} size={24} color={isFavorite ? "red" : "black"} />
          </TouchableOpacity>
        </View>

        <View style={styles.userContainer}>
          <MaterialIcons name="person" size={40} color="#666" style={styles.userIcon} />
          <View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.location}>소프트웨어과 119기</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>🪙 {item.price.toLocaleString()}원</Text>
            <Text style={styles.infoText}>📅 {item.date}까지</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.tagContainer}>
            {item.tags.map((tag, i) => (
              <Text key={i} style={styles.tag}>{tag}</Text>
            ))}
          </View>
          <Text style={styles.description}>
            구매후 세번정도 착용{'\n'}
            오염없고 하자없음{'\n'}
            집 청소중인데 스타일안맞아서 판매중{'\n'}
            23만정도 주고 삿던거같음{'\n'}
            사이즈는 xxL입니다{'\n'}
            좀작게나와서{'\n'}
            키 184
          </Text>
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
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 1,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 8,
  },
  scrollContainer: {
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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
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
    backgroundColor: '#1c1c1c',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  chatButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
