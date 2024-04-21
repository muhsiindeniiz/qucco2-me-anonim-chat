import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Stories from '../../sections/Stories/Stories';

const StoriesStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* add screens */}
      <stack.Screen name="Stories" component={Stories} />
    </stack.Navigator>
  );
};

export default StoriesStack;
