import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {size} from 'react-native-responsive-sizes';
export default function OnboardingItem({item}: any) {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Image
        source={item.image}
        style={[
          styles.image,
          {
            width,

            resizeMode: 'contain',
          },
        ]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontSize: size(18),
    width: size(300),
    marginTop: size(-50),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
