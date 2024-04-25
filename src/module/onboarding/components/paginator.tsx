import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {height, size} from 'react-native-responsive-sizes';

const Paginator = ({data, scrollX}: any) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row', height: size(64), top: height(-20)}}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
        });
        return (
          <Animated.View
            key={index.toString()}
            style={[styles.dot, {width: dotWidth, opacity: opacity}]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#23374A',
    margin: 4,
  },
});
