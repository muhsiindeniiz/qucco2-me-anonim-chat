import {View, Image, Text, TextInput} from 'react-native';
import React from 'react';
import styles from '../style/styles';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ChatStackNavProp} from '../../../navigation/stack/chat-stack/chat-stack-types';
import {fontSize, height, size, width} from 'react-native-responsive-sizes';
import Entypo from 'react-native-vector-icons/Entypo';
import strings from '../../../locale/locale';
import EmojiPicker from 'rn-emoji-keyboard';
const NewChatPage = ({route, navigation}: ChatStackNavProp<'NewChat'>) => {
  const user = route.params?.item;
  const currentUser = route.params?.currentUser;
  const [isOpen, setIsOpen] = React.useState(false);

  console.log('user', user);
  const [messages, setMessages] = React.useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <Feather
          style={{
            position: 'absolute',
            left: size(10),
          }}
          name="chevron-left"
          size={fontSize(22)}
          color="white"
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
          style={{
            position: 'absolute',
            right: width(25),
          }}
        />
        <IonIcons
          name="call"
          size={fontSize(20)}
          color="white"
          onPress={() => console.log('call')}
          style={{
            position: 'absolute',
            right: width(13),
          }}
        />
        <Entypo
          name="dots-three-vertical"
          size={fontSize(18)}
          color="white"
          onPress={() => console.log('more')}
          style={{
            position: 'absolute',
            right: size(10),
          }}
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
      {!messages ? (
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
      ) : null}

      <View style={styles.typeMessageContainer}>
        <TextInput
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
          onEmojiSelected={text => console.log(text.emoji)}
          open={isOpen}
          allowMultipleSelections
          enableSearchBar
          onClose={() => setIsOpen(false)}
        />
      </View>
    </View>
  );
};

export default NewChatPage;
