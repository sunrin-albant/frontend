import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import CloseIcon from './CloseIcon'; 

const FilterModal = ({ isVisible, onClose, onFilterChange }) => {
  const sheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(isVisible);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [minPoints, setMinPoints] = useState('');
  const [maxPoints, setMaxPoints] = useState('');

  const [isStartDateFocused, setIsStartDateFocused] = useState(false);
  const [isEndDateFocused, setIsEndDateFocused] = useState(false);
  const [isMinPointsFocused, setIsMinPointsFocused] = useState(false);
  const [isMaxPointsFocused, setIsMaxPointsFocused] = useState(false);

  const availableTags = ['전체', '심부름', '개발', '디자인', '기타'];

  const theme = {
    secondary: '#171717', 
    selectedTagBackground: '#FFD700',
    selectedTagTextColor: '#111111',
    unselectedTagTextColor: '#FFFFFF',
    highlight: '#FFD700', 
  };

  const snapPoints = useMemo(() => ['30%', '50%'], []);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        sheetRef.current?.close();
        setModalVisible(false); 
      };
    }, [])
  );

  useEffect(() => {
    if (modalVisible) {
      sheetRef.current?.snapToIndex(1);
    } else {
      sheetRef.current?.close();
    }
  }, [modalVisible]);

  const handleClose = () => {
    setModalVisible(false);
    onClose(); 
  };

  const handleFilterChange = (changes) => {
    onFilterChange({
      startDate,
      endDate,
      selectedTags,
      minPoints,
      maxPoints,
      ...changes,
    });
  };

  const toggleTag = (tag) => {
    let updatedTags = [...selectedTags];

    if (tag === '전체') {
      updatedTags = selectedTags.includes('전체') ? [] : ['전체'];
    } else {
      if (selectedTags.includes('전체')) {
        updatedTags = [tag];
      } else if (updatedTags.includes(tag)) {
        updatedTags = updatedTags.filter((t) => t !== tag);
      } else {
        if (updatedTags.length < 2) {
          updatedTags.push(tag);
        }
      }
    }

    setSelectedTags(updatedTags);
    handleFilterChange({ selectedTags: updatedTags });
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      onChange={(index) => {
        if (index === 0) {
          handleClose();
        }
      }}
      backgroundStyle={styles.bottomSheetBackground}
      handleComponent={() => (
        <View style={styles.topBar}>
          <View style={styles.yellowLine} />
        </View>
      )}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>필터</Text>
        <ScrollView>
          {}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>키워드</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.keywordContainer}
            >
              {availableTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.keywordButton,
                    selectedTags.includes(tag) && styles.keywordButtonSelected,
                  ]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text
                    style={[
                      styles.keywordText,
                      selectedTags.includes(tag) && styles.keywordTextSelected,
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>마감일</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={[
                  styles.dateInput,
                  isStartDateFocused && styles.focusedInput, 
                ]}
                placeholder="YYYY.MM.DD"
                placeholderTextColor="#888"
                value={startDate}
                onChangeText={(value) => {
                  setStartDate(value);
                  handleFilterChange({ startDate: value });
                }}
                onFocus={() => setIsStartDateFocused(true)}
                onBlur={() => setIsStartDateFocused(false)}
              />
              <Text style={styles.toText}>~</Text>
              <TextInput
                style={[
                  styles.dateInput,
                  isEndDateFocused && styles.focusedInput, 
                ]}
                placeholder="YYYY.MM.DD"
                placeholderTextColor="#888"
                value={endDate}
                onChangeText={(value) => {
                  setEndDate(value);
                  handleFilterChange({ endDate: value });
                }}
                onFocus={() => setIsEndDateFocused(true)}
                onBlur={() => setIsEndDateFocused(false)}
              />
            </View>
          </View>

          {}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>포인트</Text>
            <View style={styles.pointInputContainer}>
              <TextInput
                style={[
                  styles.pointInput,
                  isMinPointsFocused && styles.focusedInput, 
                ]}
                placeholder="최소"
                placeholderTextColor="#888"
                value={minPoints}
                onChangeText={(value) => {
                  setMinPoints(value);
                  handleFilterChange({ minPoints: value });
                }}
                onFocus={() => setIsMinPointsFocused(true)}
                onBlur={() => setIsMinPointsFocused(false)}
              />
              <Text style={styles.toText}>~</Text>
              <TextInput
                style={[
                  styles.pointInput,
                  isMaxPointsFocused && styles.focusedInput,
                ]}
                placeholder="최대"
                placeholderTextColor="#888"
                value={maxPoints}
                onChangeText={(value) => {
                  setMaxPoints(value);
                  handleFilterChange({ maxPoints: value });
                }}
                onFocus={() => setIsMaxPointsFocused(true)}
                onBlur={() => setIsMaxPointsFocused(false)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#000000', 
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12, 
    borderTopWidth: 2, 
    borderTopColor: '#FCDC2A', 
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: {
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    color: '#FFFFFF',
    fontSize: 12, 
    width: '40%',
    borderColor: '#7C7C7C', 
    borderWidth: 2,
  },
  pointInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointInput: {
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingVertical: 6, 
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontSize: 12, 
    width: '40%', 
    borderColor: '#7C7C7C', 
    borderWidth: 2, 
  },
  toText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    color: '#FFFFFF',
    fontSize: 12, 
    borderColor: '#7C7C7C', 
    borderWidth: 2, 
  },
  focusedInput: {
    borderColor: '#FCFCFC',
  },
  keywordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingHorizontal: 10,
  },
  keywordButton: {
    display: 'flex',
    height: 28,
    paddingVertical: 8,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#171717', 
    marginHorizontal: 4,
  },
  keywordButtonSelected: {
    backgroundColor: '#FFD700',
  },
  keywordText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  keywordTextSelected: {
    color: '#111111', 
  },
});

export default FilterModal;
