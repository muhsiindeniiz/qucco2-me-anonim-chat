import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from 'module/chat/view/chat-page';

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
