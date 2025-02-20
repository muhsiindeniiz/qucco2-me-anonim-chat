import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../../module/profile/view/profile-page';
import {ProfileStackParamList} from './profile-stack-types';

const ProfileStack = () => {
  const stack = createStackNavigator<ProfileStackParamList>();
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
