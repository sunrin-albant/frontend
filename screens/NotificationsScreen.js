import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as Font from 'expo-font';
import BackIcon from '../components/BackIcon';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../styles/NotificationsScreenStyles';

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

export default NotificationsScreen;
