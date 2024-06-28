import {View, Image, Text, TextInput, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from '../style/styles';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ChatStackNavProp} from '../../../navigation/stack/chat-stack/chat-stack-types';
import {fontSize, height, size, width} from 'react-native-responsive-sizes';
import Entypo from 'react-native-vector-icons/Entypo';
import strings from '../../../locale/locale';
import EmojiPicker from 'rn-emoji-keyboard';
import 'firebase/compat/firestore';
import {sendMessage, useMessages} from '../utils/sendMessage';

const NewChatPage = ({route, navigation}: ChatStackNavProp<'NewChat'>) => {
  const {item: user, currentUser} = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messages = useMessages(currentUser.id, user.id);
  const [emoji, setEmoji] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, currentUser.id, user.id);
      setMessage('');
    }
  };
  const handlePickEmoji = (emojis: any) => {
    setEmoji(emojis.emoji);
    setMessage(message + emoji);
  };
  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <Feather
          style={{position: 'absolute', left: size(10)}}
          name="chevron-left"
          size={fontSize(22)}
          color="white"
          onPress={() => navigation.navigate('Chat')}
        />
        <Image source={{uri: user?.photo}} style={styles.thumbNail} />
        <Text style={styles.thumbName}>
          {user?.username.length > 12
            ? user?.username.substring(0, 12) + '...'
            : user?.username}
        </Text>
        <IonIcons
          name="videocam"
          size={fontSize(22)}
          color="white"
          onPress={() => console.log('video call')}
          style={{position: 'absolute', right: width(25)}}
        />
        <IonIcons
          name="call"
          size={fontSize(20)}
          color="white"
          onPress={() => console.log('call')}
          style={{position: 'absolute', right: width(13)}}
        />
        <Entypo
          name="dots-three-vertical"
          size={fontSize(18)}
          color="white"
          onPress={() => console.log('more')}
          style={{position: 'absolute', right: size(10)}}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: height(0.05),
            backgroundColor: '#f2f2f2',
          }}
        />
      </View>
      {!messages.length ? (
        <>
          <View style={styles.imageContainer}>
            <Image source={{uri: user?.photo}} style={styles.profileImage} />
            <Text
              style={{
                fontSize: fontSize(12.5),
                marginTop: 10,
                color: 'white',
                fontWeight: '500',
              }}>
              {user?.username}
            </Text>
          </View>
          <View style={styles.chatBallon}>
            <Text style={styles.chatBallonText}>
              {currentUser?.anonNickname} {strings.anonChat}
            </Text>
          </View>
        </>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          style={{width: '100%', height: height(80), bottom: height(8)}}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor:
                  item.senderId === currentUser.id ? 'blue' : 'green',
                borderRadius: 5,
                padding: 10,
                margin: 5,
                alignSelf:
                  item.senderId === currentUser.id ? 'flex-end' : 'flex-start',
              }}>
              <Text style={{color: 'white'}}>{item.text}</Text>
            </View>
          )}
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
        />
      )}
      <View style={styles.typeMessageContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.messageInput}
          placeholder={strings.typeMessage}
        />
        <Entypo
          name="emoji-happy"
          size={fontSize(18)}
          color="grey"
          style={{
            position: 'absolute',
            left: width(2.5),
            backgroundColor: 'white',
          }}
          onPress={() => setIsOpen(true)}
        />
        <EmojiPicker
          onEmojiSelected={emojis => handlePickEmoji(emojis)}
          allowMultipleSelections
          selectedEmojis={[]}
          enableCategoryChangeAnimation
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
        <View style={styles.sendButton}>
          <Feather
            name="send"
            size={size(20)}
            color="black"
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </View>
  );
};

export default NewChatPage;
