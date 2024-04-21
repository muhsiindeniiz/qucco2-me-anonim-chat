import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Stories from '../../sections/Stories/Stories';
import Explore from '../../sections/Explore/Explore';
import VIP from '../../sections/VIP/VIP';

const VIPStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* add screens */}
      <stack.Screen name="VIP" component={VIP} />
    </stack.Navigator>
  );
};

export default VIPStack;
