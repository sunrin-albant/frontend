import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as Font from 'expo-font';
import BackIcon from '../components/BackIcon';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const data = [
  {
    id: '1',
    text: "username님이 본인의 '책 잃어버렸...' 글에 양식을 제출했습니다.",
    time: '3분 전',
    type: '제출 알림', 
  },
  {
    id: '2',
    text: "username님이 본인의 '책 잃어버렸...' 글에 양식을 제출했습니다.",
    time: '3분 전',
    type: '제출 알림', 
  },
  {
    id: '3',
    text: "'책 잃어버렸...' 글에 제출한 내용이 채택되었습니다.",
    time: '3분 전',
    type: '채택 알림', 
  },
];

const NotificationsScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('제출 알림');
  const navigation = useNavigation();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
        'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
        'SangjuGgotgamche': require('../assets/fonts/SANGJU Gotgam.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const parentNavigator = navigation.getParent();

      if (parentNavigator) {
        parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
      }

    }, [navigation])
  );

  const handleBack = () => {
    const parentNavigator = navigation.getParent();

    if (parentNavigator) {
      parentNavigator.setOptions({
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: '#FCDC2A',
          borderTopWidth: 2,
          height: 70,
          paddingBottom: 10,
          display: 'flex',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      });
    }

    navigation.goBack();
  };

  const handleNotificationPress = (item) => {
    const parentNavigator = navigation.getParent();
    if (parentNavigator) {
      parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
    }

    navigation.navigate('SubmissionDetailScreen', { submissionId: item.id });
  };

  if (!fontsLoaded) {
    return null;
  }

  const filteredData = data.filter(item => item.type === activeTab);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.notificationContainer} 
      onPress={() => handleNotificationPress(item)} 
    >
      <View style={[styles.icon, item.id === '3' && styles.squareIcon]} /> 
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{item.text}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>알림</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('제출 알림')}
        >
          <Text style={[styles.tabText, activeTab === '제출 알림' && styles.activeTabText]}>제출 알림</Text>
          {activeTab === '제출 알림' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('채택 알림')}
        >
          <Text style={[styles.tabText, activeTab === '채택 알림' && styles.activeTabText]}>채택 알림</Text>
          {activeTab === '채택 알림' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 10,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 160,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabText: {
    color: '#666',
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
    fontFamily: 'Pretendard-Bold',
    fontWeight: '700',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    backgroundColor: '#CCC', 
    marginRight: 12,
  },
  squareIcon: {
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    color: '#FFF',
    fontFamily: 'Pretendard-Regular',
  },
  timeText: {
    color: '#AAA',
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    marginTop: 4, 
    alignSelf: 'flex-start', 
  },
});

export default NotificationsScreen;
