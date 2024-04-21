import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Stories from '../../sections/Stories/Stories';
import Explore from '../../sections/Explore/Explore';

const ExploreStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* add screens */}
      <stack.Screen name="Explore" component={Explore} />
    </stack.Navigator>
  );
};

export default ExploreStack;
