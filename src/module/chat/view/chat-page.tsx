import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useChats} from '../utils/sendMessage';
import {ChatStackNavProp} from '../../../navigation/stack/chat-stack/chat-stack-types';
import styles from '../style/styles';

const ChatList = ({navigation}: ChatStackNavProp<'ChatList'>) => {
  const currentUserId = 'currentUserId'; // Bu değişkeni giriş yapan kullanıcının ID'si ile değiştirin
  const {chats, loadingData, error} = useChats(currentUserId);

  if (loadingData) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const chatData = Object.keys(chats).map(chatId => {
    const chat = chats[chatId];
    const participant = chat.participants.find(p => p.id !== currentUserId);
    const isSender =
      chat.messages[Object.keys(chat.messages)[0]].senderId === currentUserId;
    return {
      id: chatId,
      userName: isSender ? participant?.userName : participant?.anonNick,
      photo: isSender ? participant?.profileImage : null,
    };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate('NewChat', {
                item: item,
                currentUser: currentUserId,
              })
            }>
            {item.photo && (
              <Image source={{uri: item.photo}} style={styles.thumbNail} />
            )}
            <Text style={styles.thumbName}>{item.userName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatList;
