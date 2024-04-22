import React, {useState, useRef} from 'react';
import {View, Text, TextInput, Animated, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {width, height, fontSize} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import styles from './forgot-screen.style';
import {sendPasswordReset} from '../../../../../../db/Firebase/CRUD';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const emailBorderBottomWidth = useRef<Animated.Value>(
    new Animated.Value(1),
  ).current;
  const passwordBorderBottomWidth = useRef<Animated.Value>(
    new Animated.Value(1),
  ).current;

  const handleFocus = (type: 'email' | 'password') => {
    const borderBottomWidth =
      type === 'email' ? emailBorderBottomWidth : passwordBorderBottomWidth;
    Animated.timing(borderBottomWidth, {
      toValue: 2.5,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };
  const _handleReset = async () => {
    await sendPasswordReset(email).then(() => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password reset email sent.',
      });
      navigation.goBack();
      setEmail('');
    });
  };
  const handleBlur = (type: 'email' | 'password') => {
    const borderBottomWidth =
      type === 'email' ? emailBorderBottomWidth : passwordBorderBottomWidth;
    Animated.timing(borderBottomWidth, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: width(2),
          }}>
          <Entypo name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      <View style={styles.body}>
        <Animated.View
          style={{
            borderBottomWidth: emailBorderBottomWidth,
            borderColor: 'white',
            zIndex: 1,
            position: 'absolute',
            width: width(90),
            height: height(1),
            top: height(9),
            left: width(5),
          }}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={'#a3a6d8'}
          value={email}
          onChangeText={setEmail}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
          style={styles.input}
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={_handleReset}
          activeOpacity={0.8}
          style={styles.next}>
          <Feather name="arrow-right" size={fontSize(30)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
