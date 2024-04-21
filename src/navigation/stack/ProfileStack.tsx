import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Stories from '../../sections/Stories/Stories';
import Profile from '../../sections/Profile/Profile';

const ProfileStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* add screens */}
      <stack.Screen name="Profile" component={Profile} />
    </stack.Navigator>
  );
};

export default ProfileStack;
