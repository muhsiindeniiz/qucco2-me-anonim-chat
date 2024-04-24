import React, {useRef, useState} from 'react';
import {View, Animated, TextInput, TouchableOpacity} from 'react-native';
import {height, width} from 'react-native-responsive-sizes';
import styles from '../../style/RegisterScreenStyles';
import Feather from 'react-native-vector-icons/Feather';
import {EmailPasswordStepProps} from './email-password-step.type';
import {storage} from '../../../../../constants/app';

const EmailPasswordBody = ({
  handleSetEmail,
  handleSetPassword,
}: EmailPasswordStepProps) => {
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
      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        autoCapitalize="none"
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
      <TextInput
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        onChangeText={text => {
          _handleSetPassword(text);
        }}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
        style={styles.input}
      />
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};

export default EmailPasswordBody;
