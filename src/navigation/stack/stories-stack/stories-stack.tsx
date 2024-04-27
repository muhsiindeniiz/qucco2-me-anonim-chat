import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Stories from '../../../module/stories/view/stories-page';
import {StoriesStackParamList} from './stories-stack-types';

const StoriesStack = () => {
  const stack = createStackNavigator<StoriesStackParamList>();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="Stories" component={Stories} />
    </stack.Navigator>
  );
};

export default StoriesStack;
