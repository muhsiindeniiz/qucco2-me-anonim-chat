import {View, SafeAreaView, Animated} from 'react-native';
import React from 'react';
import style from './splash-screen.style';

const SplashScreen = () => {
  const imageScale = new Animated.Value(0.8);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <SafeAreaView style={style.container}>
      <View>
        <Animated.Image
          source={require('../../assets/image/logo.png')}
          style={[style.logo, {transform: [{scale: imageScale}]}]}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
