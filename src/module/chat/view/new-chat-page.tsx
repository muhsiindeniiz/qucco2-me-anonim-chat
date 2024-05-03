import {View, Image} from 'react-native';
import React from 'react';
import styles from '../style/styles';
import {ChatStackNavProp} from '../../../navigation/stack/chat-stack/chat-stack-types';
const NewChatPage = ({route, navigation}: ChatStackNavProp<'NewChat'>) => {
  const user = route.params?.item;
  console.log('user', user);
  return (
    <View style={styles.container}>
      <Image source={{uri: user?.photo}} style={styles.profileImage} />
    </View>
  );
};

export default NewChatPage;
