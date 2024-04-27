import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Explore from '../../../module/explore/view/explore-page';
import {ExploreStackParamList} from './explore-stack-types';

const ExploreStack = () => {
  const stack = createStackNavigator<ExploreStackParamList>();
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
