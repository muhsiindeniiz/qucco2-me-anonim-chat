import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {width, fontSize} from 'react-native-responsive-sizes';
import styles from './RegisterScreenStyles';
import UsernameBody from './UsernameBody';
import EmailPasswordBody from './EmailPasswordBody';
import GenderDateBody from './GenderDateBody';
import PhotoScreen from './PhotoScreen';
import {ControlTexts} from './Controller';
import {MMKV} from 'react-native-mmkv';
import {register} from '../../../db/Firebase/CRUD';
import {useNavigation} from '@react-navigation/native';

export const storage = new MMKV();
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    date: new Date(),
    gender: '',
    photo: '',
    about: '',
  });
  const bodies = [
    <UsernameBody
      handleSetUsername={username => setData({...data, username})}
    />,
    <EmailPasswordBody
      handleSetEmail={email => setData({...data, email})}
      handleSetPassword={password => setData({...data, password})}
    />,
    <GenderDateBody
      handleSetDate={date => setData({...data, date})}
      handleSetGender={gender => setData({...data, gender})}
    />,
    <PhotoScreen
      handleSetPhoto={photo => setData({...data, photo})}
      handleSetYourself={about => setData({...data, about})}
    />,
  ];
  const [currentBodyIndex, setCurrentBodyIndex] = useState(0);
  const [slideAnim] = useState(new Animated.Value(0));

  const animateToIndex = (index: number) => {
    const direction = index > currentBodyIndex ? -1 : 1;
    Animated.timing(slideAnim, {
      toValue: width(100) * direction,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentBodyIndex(index);
      slideAnim.setValue(width(100) * -direction);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    });
  };

  const onNextPressed = async () => {
    if (currentBodyIndex !== bodies.length - 1) {
      const isDataValid = ControlTexts(data, currentBodyIndex);
      if (isDataValid && currentBodyIndex < bodies.length - 1) {
        animateToIndex(currentBodyIndex + 1);
      }
    } else {
      const isDataValid = ControlTexts(data, currentBodyIndex);
      if (isDataValid) {
        await register(
          data.email,
          data.password,
          data.username,
          data.about,
          data.photo,
        ).then(() => navigation.navigate('LoginScreen'));
      }
    }
  };

  const onPreviousPressed = () => {
    if (currentBodyIndex > 0) {
      animateToIndex(currentBodyIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {currentBodyIndex > 0 && (
          <Entypo
            style={{
              position: 'absolute',
              left: width(2),
            }}
            name="chevron-left"
            size={20}
            color="white"
            onPress={onPreviousPressed}
          />
        )}
        <Text style={styles.headerText}>
          {data.username === '' ? 'Register' : data.username}
        </Text>
      </View>
      <Animated.View
        style={[
          styles.body,
          {
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          },
        ]}>
        {bodies[currentBodyIndex]}
      </Animated.View>
      <View style={styles.bottom}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.next}
          onPress={onNextPressed}>
          <Feather name="arrow-right" size={fontSize(30)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
