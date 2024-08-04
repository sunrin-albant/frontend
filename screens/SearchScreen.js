import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import BackIcon from '../components/BackIcon';
import CalendarIcon from '../components/CalendarIcon';
import FilterIcon from '../components/FilterIcon';
import FilterModal from '../components/FilterModal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const coinImage = require('../assets/Coin.png');

const SearchScreen = ({ route, navigation }) => {
  const { data: initialData } = route.params;

  const [data, setData] = useState(initialData);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

  const handleCardPress = (item) => {
    navigation.navigate('Details', { item });
  };

  const handleTagPress = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 2) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const filteredData =
    selectedTags.length === 0
      ? data.filter(
          (item) =>
            item.title.includes(searchQuery) ||
            item.username.includes(searchQuery)
        )
      : data
          .filter((item) =>
            selectedTags.every((tag) => item.tags.includes(tag))
          )
          .filter(
            (item) =>
              item.title.includes(searchQuery) ||
              item.username.includes(searchQuery)
          );

  const toggleFilterModal = useCallback(() => {
    setFilterVisible((prev) => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력해주세요."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.customTextContainer}>
        <Text style={styles.customText}>키워드 · 최신순 · 임금</Text>
        <TouchableOpacity onPress={toggleFilterModal}>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item)}
          >
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.tagContainer}>
                  {item.tags.map((tag, i) => (
                    <View key={i} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.profileImageContainer}>
                <Image source={{ uri: item.image }} style={styles.profileImage} />
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.dateContainer}>
                <CalendarIcon style={styles.calendarIcon} />
                <Text style={styles.date}> {item.date}까지</Text>
              </View>
              <View style={styles.flexSpacer} />
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

      <FilterModal
        isVisible={filterVisible}
        onClose={toggleFilterModal}
      />
    </View>
  );
};

SearchScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000000',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    paddingVertical: 8,
  },
  customTextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  customText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    marginRight: 8,
  },
  list: {
    alignSelf: 'center',
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 4,
  },
  date: {
    color: '#FCFCFC',
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImageSmall: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  price: {
    color: '#ffffff',
    fontSize: 14,
  },
  flexSpacer: {
    flex: 1,
  },
  profileImageContainer: {
    width: 64,
    height: 94.933,
    borderRadius: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SearchScreen;
