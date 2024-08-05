import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import CloseIcon from './CloseIcon'; // CloseIcon 컴포넌트를 import

const FilterModal = ({ isVisible, onClose }) => {
  const sheetRef = useRef(null);

  // 모달 상태를 제어하는 상태 값 추가
  const [modalVisible, setModalVisible] = React.useState(isVisible);

  const snapPoints = useMemo(() => ['1%', '50%'], []);

  // useFocusEffect로 화면 포커스 상태 관리
  useFocusEffect(
    useCallback(() => {
      // 화면 포커스를 잃을 때 실행되는 코드
      return () => {
        sheetRef.current?.close(); // 화면 포커스를 잃으면 모달을 닫습니다.
      };
    }, [])
  );

  // isVisible prop의 변경에 따라 모달 상태 업데이트
  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (modalVisible) {
      sheetRef.current?.snapToIndex(1);
    } else {
      sheetRef.current?.close();
    }
  }, [modalVisible]);

  const handleClose = () => {
    setModalVisible(false);
    onClose(); // 부모 컴포넌트의 onClose 콜백 호출
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
      handleComponent={null} // 핸들 컴포넌트를 null로 설정하여 바를 제거합니다.
    >
      <View style={styles.container}>
        {/* X 버튼을 상단에 배치 */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <CloseIcon />
        </TouchableOpacity>

        <Text style={styles.headerText}>필터</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>키워드</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagContainer}>
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
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>기타</Text>
            </TouchableOpacity>
          </ScrollView>
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1, // 다른 컴포넌트 위에 오도록 설정
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // 제목을 가운데 정렬
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
    paddingBottom: 10, // Add some padding to ensure a smooth scroll
  },
  tagButton: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10, // Adds space between buttons for better visibility
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
