import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileImage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>이곳은 프로필 이미지 페이지입니다!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProfileImage;
