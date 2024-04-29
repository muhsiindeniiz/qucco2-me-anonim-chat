import React, {useState, useRef} from 'react';
import {View, Text, TextInput, Animated, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {width, height, fontSize} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styles from './login-screen.style';
import {login} from '../../../../../db/Firebase/CRUD';
import {storage} from '../../../../../constants/app';
import {setLoggedIn} from '../../../../../redux/AuthSlice/authSlice';
import {emptyFieldToast, wrongLoginToast} from '../../../../../utils/toasts';
import {AuthStackNavProp} from '../../../../../navigation/stack/auth-stack/auth-stack-types';

const LoginScreen = () => {
  const navigation = useNavigation<AuthStackNavProp>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
  const _handleLogin = async () => {
    if (email === '' || password === '') {
      return emptyFieldToast();
    }
    await login(email, password).then(user => {
      if (user !== null) {
        storage.set('userId', JSON.stringify(user.uid));
        dispatch(setLoggedIn(true));
      } else {
        return wrongLoginToast();
      }
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
        <Text style={styles.headerText}>Login</Text>
        <Entypo
          name="chevron-left"
          size={fontSize(30)}
          color="white"
          onPress={() => navigation.navigate('OnboardingScreen')}
          style={{
            position: 'absolute',
            left: width(2),
          }}
        />
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
            top: height(4),
            left: width(5),
          }}
        />
        <TextInput
          placeholder="UserName"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
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
          autoCapitalize="none"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
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
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
          style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            _handleLogin();
          }}
          activeOpacity={0.8}
          style={styles.next}>
          <Feather name="arrow-right" size={fontSize(30)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
