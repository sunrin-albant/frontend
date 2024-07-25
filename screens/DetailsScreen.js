import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>Item: {item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
