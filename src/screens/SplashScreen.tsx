// src/screens/SplashScreen.js
import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BETTERSOFTWARE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#80EF80',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: '900',
    color: 'black',
  },
});

export default SplashScreen;