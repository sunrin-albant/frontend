import React, { useState, useEffect } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../components/BackIcon';
import CalendarIcon from '../components/CalendarIcon';
import FilterIcon from '../components/FilterIcon';
import FilterModal from '../components/FilterModal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const coinImage = require('../assets/Coin.png');

const SearchScreen = ({ route, navigation }) => {
  const { data: initialData = [] } = route.params || {}; // 기본값으로 빈 배열 설정

  const [data, setData] = useState(initialData);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    selectedTags: [],
    minPoints: '',
    maxPoints: '',
  });

  const handleCardPress = (item) => {
    navigation.navigate('Details', { item });
  };

  const handleFavoritePress = (index) => {
    const updatedData = [...data];
    updatedData[index].isFavorite = !updatedData[index].isFavorite;
    updatedData[index].favoriteCount += updatedData[index].isFavorite ? 1 : -1;
    setData(updatedData);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredData = data.filter((item) => {
    const tagMatch =
      (filters.selectedTags && filters.selectedTags.length === 0) ||
      (filters.selectedTags || []).every((tag) => (item.tags || []).includes(tag));

    const searchMatch =
      item.title.includes(searchQuery) || item.username.includes(searchQuery);

    const { startDate, endDate } = filters;
    const itemDate = new Date(item.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateMatch =
      (!startDate || itemDate >= start) && (!endDate || itemDate <= end);

    const { minPoints, maxPoints } = filters;
    const pointsMatch =
      (!minPoints || item.price >= parseInt(minPoints, 10)) &&
      (!maxPoints || item.price <= parseInt(maxPoints, 10));

    return tagMatch && searchMatch && dateMatch && pointsMatch;
  });

  const toggleFilterModal = () => {
    setFilterVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력해주세요"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={toggleFilterModal}>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item)}
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
                <TouchableOpacity
                  style={styles.favoriteIconContainer}
                  onPress={() => handleFavoritePress(index)}
                >
                  <MaterialIcons
                    name={item.isFavorite ? 'favorite' : 'favorite-border'}
                    size={24}
                    color={item.isFavorite ? '#F00' : '#FFF'}
                  />
                </TouchableOpacity>
                <Text style={styles.favoriteCount}>{item.favoriteCount}</Text>
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
        onFilterChange={applyFilters}
      />
    </View>
  );
};

export default SearchScreen;
