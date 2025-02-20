import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {width, fontSize} from 'react-native-responsive-sizes';
import UsernameBody from '../../layout/username-step/username-step';
import EmailPasswordBody from '../../layout/email-password-step/email-password-step';
import GenderDateBody from '../../layout/gender-date-step/gender-date-step';
import PhotoScreen from '../../layout/photo-step/photo-step';
import {ControlTexts} from '../../forms/Controller';
import styles from '../../style/RegisterScreenStyles';
import {
  checkEmailExists,
  checkUsernameExists,
  register,
} from '../../../../../db/Firebase/CRUD';
import {
  emailErrorToast,
  passwordErrorToast,
} from '../../layout/email-password-step/email-password-controls';
import {
  emailAlreadyExistsToast,
  usernameAlreadyExistsToast,
} from '../../../../../utils/toasts';
import {storage} from '../../../../../constants/app';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../../../../redux/auth-slice/auth-slice';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavProp} from '../../../../../navigation/stack/auth-stack/auth-stack-types';
import {UserType} from '../../../../../constants/types';

const RegisterScreen = () => {
  const navigation = useNavigation<AuthStackNavProp>();
  const dispatch = useDispatch();
  const [data, setData] = useState<UserType>({
    id: '',
    name: '',
    email: '',
    password: '',
    username: '',
    gender: '',
    photo: '',
    about: '',
    createdAt: '',
    birthdate: new Date(),
    biography: '',
    followers: [],
    following: [],
    tags: [],
    gallery: [],
    status: '',
    location: {
      city: '',
      country: '',
    },
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
      handleSetDate={birthdate => setData({...data, birthdate})}
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
      if (currentBodyIndex === 0) {
        const exists = await checkUsernameExists(data.username);
        if (exists) {
          return usernameAlreadyExistsToast();
        }
      }
      if (currentBodyIndex === 1) {
        const exists = await checkEmailExists(data.email);
        const emailToast = emailErrorToast({email: data.email});
        const passwordToast = passwordErrorToast({password: data.password});
        if (passwordToast !== true || emailToast !== true) {
          return;
        }
        if (exists) {
          return emailAlreadyExistsToast();
        }
      }
      const isDataValid = ControlTexts(data, currentBodyIndex);
      if (isDataValid && currentBodyIndex < bodies.length - 1) {
        animateToIndex(currentBodyIndex + 1);
      }
    } else {
      const isDataValid = ControlTexts(data, currentBodyIndex);
      if (isDataValid) {
        await register(data).then(id => {
          if (id !== null) {
            storage.set('userId', JSON.stringify(id));
            dispatch(setLoggedIn(true));
          }
        });
      }
    }
  };

  const onPreviousPressed = () => {
    if (currentBodyIndex > 0) {
      animateToIndex(currentBodyIndex - 1);
    } else if (currentBodyIndex === 0) {
      navigation.navigate('OnboardingScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo
          style={{
            position: 'absolute',
            left: width(2),
          }}
          name="chevron-left"
          size={32}
          color="white"
          onPress={onPreviousPressed}
        />

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
