// components/CoinImage.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const CoinImage = ({ style }) => {
  return (
    <Image
      source={require('../img/Coin.jpg')} // 경로를 맞춰주세요
      style={[styles.coin, style]}
    />
  );
};

const styles = StyleSheet.create({
  coin: {
    width: 24, // 아이콘의 크기에 맞게 조정
    height: 24, // 아이콘의 크기에 맞게 조정
  },
});

export default CoinImage;
