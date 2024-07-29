import React from 'react';
import { Image, StyleSheet } from 'react-native';

const CoinImage = ({ style }) => {
  return (
    <Image
      source={require('../img/Coin.jpg')}
      style={[styles.coin, style]}
    />
  );
};

const styles = StyleSheet.create({
  coin: {
    width: 24,
    height: 24, 
  },
});

export default CoinImage;
