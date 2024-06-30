import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../../../module/chat/view/chat-page';
import NewChatPage from '../../../module/chat/view/new-chat-page';
import {ChatStackParamList} from './chat-stack-types';
import {storage} from '../../../constants/app';

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="NewChat" component={NewChatPage} />
    </Stack.Navigator>
  );
};

export default ChatStack;
