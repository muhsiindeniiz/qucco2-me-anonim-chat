import React, {useState, useEffect} from 'react';
import {fetchChatList} from '../utils/sendMessage';
import {storage} from '../../../constants/app';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../style/styles';
import {UserType} from '../../../constants/types';
import {useNavigation} from '@react-navigation/native';
import {ChatStackNavProp} from '../../../navigation/stack/chat-stack/chat-stack-types';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {size} from 'react-native-responsive-sizes';

type ChatListType = {
  id: string;
  senderId: string;
  recipientId: string;
  user: UserType;
  lastMessage: any; // Buraya uygun mesaj veri yapısını tanımlamanız gerekiyor
};

const ChatList = () => {
  const navigation = useNavigation<ChatStackNavProp['navigation']>();
  const userId = storage.getString('userId') || '';
  const cleanedUserId = userId.replace(/"/g, ''); // Tırnakları temizle
  const [chats, setChats] = useState<ChatListType[]>([]);
  const currentUser = useSelector(
    (state: RootState) => state.shuffle.currentUser,
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchedChats = await fetchChatList(cleanedUserId);
      const chatsWithLastMessage: ChatListType[] = fetchedChats.map(chat => ({
        id: chat.id,
        senderId: chat.id.split('_')[0],
        recipientId: chat.id.split('_')[1],
        user: chat.user,
        lastMessage:
          chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]
            : null,
      }));
      setChats(chatsWithLastMessage);
    };
    fetchData();
  }, [cleanedUserId]);

  console.log(chats);

  const renderItem = ({item}: {item: ChatListType}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('NewChat', {item: item.user, currentUser})
      }>
      {item.senderId === cleanedUserId ? (
        <>
          <Image source={{uri: item.user.photo}} style={styles.avatar} />
          <Text style={styles.userText}>{item.user.username}</Text>
        </>
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.userText}>{item.user.anonNickname}</Text>
        </View>
      )}
      {item.lastMessage && (
        <Text style={styles.lastMessage}>{item.lastMessage.content}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Chat List</Text>
      </View>
      {chats.length === 0 ? (
        <Text>No chats available</Text>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{width: '95%', top: size(100)}}
        />
      )}
    </View>
  );
};

export default ChatList;
