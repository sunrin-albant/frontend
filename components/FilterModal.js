
import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const FilterModal = ({ isVisible, onClose }) => {
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['1%', '50%'], []);

  useEffect(() => {
    if (isVisible) {
      sheetRef.current?.snapToIndex(1); 
    } else {
      sheetRef.current?.close(); 
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true} 
      onChange={(index) => {
        if (index === 0) { 
          onClose(); 
        }
      }}
      backgroundStyle={styles.bottomSheetBackground} 
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>필터</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>키워드</Text>
          <View style={styles.tagContainer}>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>전체</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>심부름</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>개발</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>디자인</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>마감일</Text>
          <View style={styles.dateInputContainer}>
            <TextInput style={styles.dateInput} placeholder="YYYY.MM.DD" placeholderTextColor="#888" />
            <Text style={styles.toText}>~</Text>
            <TextInput style={styles.dateInput} placeholder="YYYY.MM.DD" placeholderTextColor="#888" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>포인트</Text>
          <View style={styles.dateInputContainer}>
            <TextInput style={styles.dateInput} placeholder="0p" placeholderTextColor="#888" />
            <Text style={styles.toText}>~</Text>
            <TextInput style={styles.dateInput} placeholder="9999p" placeholderTextColor="#888" />
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#222', 
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagButton: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#FFF',
    fontSize: 14,
    width: '45%',
  },
  toText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default FilterModal;