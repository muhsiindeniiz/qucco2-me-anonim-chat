import React, {useRef, useState} from 'react';
import {View, Animated, TextInput, Text} from 'react-native';
import {height, width} from 'react-native-responsive-sizes';
import styles from '../../style/RegisterScreenStyles';
import {storage} from '../../../../../constants/app';
import strings from '../../../../../locale/locale';

type UsernameBodyProps = {
  handleSetUsername: (username: string) => void;
};
const UsernameBody = ({handleSetUsername}: UsernameBodyProps) => {
  const [username, setUsername] = useState(storage.getString('username') || '');
  const emailBorderBottomWidth = useRef(new Animated.Value(1)).current;
  const _handleSetUsername = (uname: string) => {
    setUsername(uname);
    handleSetUsername(uname);
    storage.set('username', uname);
  };
  const animateBorder = (toValue: number) => {
    Animated.timing(emailBorderBottomWidth, {
      toValue: toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleEmailFocus = () => {
    animateBorder(2.5);
  };

  const handleEmailBlur = () => {
    animateBorder(1);
  };

  return (
    <View style={styles.body}>
      <Animated.View
        style={{
          borderBottomWidth: emailBorderBottomWidth,
          borderColor: 'white',
          zIndex: 1,
          position: 'absolute',
          width: width(90),
          height: height(1),
          top: height(10),
          left: width(5),
        }}
      />
      <TextInput
        placeholder={strings.username}
        placeholderTextColor="#fff"
        value={username}
        autoCapitalize="none"
        onChangeText={text => {
          _handleSetUsername(text);
        }}
        onFocus={handleEmailFocus}
        onBlur={handleEmailBlur}
        style={styles.input}
      />
      <Text style={styles.desc}>{strings.usernameTitle}</Text>
    </View>
  );
};

export default UsernameBody;
