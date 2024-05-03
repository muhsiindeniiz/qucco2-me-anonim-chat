import {Text, TextInput, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import strings from '../../../locale/locale';
import {fontSize, height, size, width} from 'react-native-responsive-sizes';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../style/styles';

const Chat = () => {
  const [chats, setChats] = React.useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{strings.chats}</Text>
      </View>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={size(20)}
          color="black"
          style={{position: 'absolute', left: size(30), zIndex: 1}}
        />
        <TextInput
          style={{
            width: '90%',
            height: height(5),
            borderWidth: size(1),
            borderRadius: size(25),
            borderColor: 'grey',
            backgroundColor: 'white',
            alignSelf: 'center',
            paddingLeft: size(40),
          }}
          placeholder={strings.search}
        />
      </View>
      <View style={styles.chatContainer}>
        {chats.length > 0 ? null : (
          <Text
            style={{
              textAlign: 'center',
              marginBottom: height(8),
              fontSize: fontSize(16),
              width: width(57),
            }}>
            {strings.noChats}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
