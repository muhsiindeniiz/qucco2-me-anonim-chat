import React, {useRef, useState} from 'react';
import {View, Animated} from 'react-native';
import {height, width} from 'react-native-responsive-sizes';
import styles from './RegisterScreenStyles';
import {AInput, ATouchable} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import {storage} from './RegisterScreen';
type EmailPasswordBodyProps = {
  handleSetEmail: (email: string) => void;
  handleSetPassword: (password: string) => void;
};
const EmailPasswordBody = ({
  handleSetEmail,
  handleSetPassword,
}: EmailPasswordBodyProps) => {
  const [email, setEmail] = useState(storage.getString('email') || '');
  const [password, setPassword] = useState(storage.getString('password') || '');
  const [showPassword, setShowPassword] = useState(false);
  const emailBorderBottomWidth = useRef(new Animated.Value(1)).current;
  const passwordBorderBottomWidth = useRef(new Animated.Value(1)).current;
  const _handleSetEmail = (email: string) => {
    setEmail(email);
    handleSetEmail(email);
    storage.set('email', email);
  };
  const _handleSetPassword = (password: string) => {
    setPassword(password);
    handleSetPassword(password);
    storage.set('password', password);
  };
  const animateBorder = (borderWidth: Animated.Value, toValue: number) => {
    Animated.timing(borderWidth, {
      toValue: toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleEmailFocus = () => {
    animateBorder(emailBorderBottomWidth, 2.5);
  };

  const handleEmailBlur = () => {
    animateBorder(emailBorderBottomWidth, 1);
  };

  const handlePasswordFocus = () => {
    animateBorder(passwordBorderBottomWidth, 2.5);
  };

  const handlePasswordBlur = () => {
    animateBorder(passwordBorderBottomWidth, 1);
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
          top: height(4),
          left: width(5),
        }}
      />
      <AInput
        placeholder="Email"
        placeholderTextColor={'#a3a6d8'}
        value={email}
        onChangeText={text => {
          _handleSetEmail(text);
        }}
        onFocus={handleEmailFocus}
        onBlur={handleEmailBlur}
        style={styles.input}
      />

      <Animated.View
        style={{
          borderBottomWidth: passwordBorderBottomWidth,
          borderColor: 'white',
          zIndex: 1,
          position: 'absolute',
          width: width(90),
          height: height(1),
          top: height(15),
          left: width(5),
        }}
      />
      <AInput
        placeholder="Password"
        placeholderTextColor={'#a3a6d8'}
        value={password}
        secureTextEntry={!showPassword}
        onChangeText={text => {
          _handleSetPassword(text);
        }}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
        style={styles.input}
      />
      <ATouchable
        onPress={() => setShowPassword(!showPassword)}
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          right: width(8),
          top: height(12),
        }}>
        <Feather
          name={!showPassword ? 'eye-off' : 'eye'}
          size={20}
          color="white"
        />
      </ATouchable>
    </View>
  );
};

export default EmailPasswordBody;
