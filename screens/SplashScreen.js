import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import * as Font from 'expo-font';

function SplashScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 700,  
            useNativeDriver: true,
          }).start(() => {
            navigation.replace('Login');
          });
        }, 500); 
      });
    }
  }, [fontsLoaded, navigation]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image source={require('../assets/logo1.png')} style={styles.image} />
      <Text style={styles.text}>당신의 알바를 찾아보세요</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Pretendard-Regular',
    fontWeight: '100',
  },
});

export default SplashScreen;