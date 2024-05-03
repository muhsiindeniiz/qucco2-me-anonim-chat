import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from '../../../module/chat/view/chat-page';
import {ChatStackParamList} from './chat-stack-types';
import NewChatPage from '../../../module/chat/view/new-chat-page';

const ChatStack = () => {
  const Stack = createStackNavigator<ChatStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* add screens */}
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="NewChat" component={NewChatPage} />
    </Stack.Navigator>
  );
};

export default ChatStack;
