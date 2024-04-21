import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Stories from '../../sections/Stories/Stories';
import Chat from '../../sections/Chat/Chat';

const ChatStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* add screens */}
      <stack.Screen name="Chat" component={Chat} />
    </stack.Navigator>
  );
};

export default ChatStack;
