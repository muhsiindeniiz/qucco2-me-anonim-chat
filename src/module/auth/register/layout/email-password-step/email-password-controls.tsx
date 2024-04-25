/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {height, size, width} from 'react-native-responsive-sizes';
import {Text} from 'react-native';
import styles from '../../style/RegisterScreenStyles';

import strings from '../../../../../locale/locale';
import {
  emailNotValidToast,
  hasLetterToast,
  hasNumberToast,
  hasSpecialCharacterToast,
  isLengthValidToast,
} from '../../../../../utils/toasts';

export const checkPassword = (password: string) => {
  const isLengthValid = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /\W/.test(password);

  return {isLengthValid, hasLetter, hasNumber, hasSpecialCharacter};
};
export const emailErrorToast = ({email}: {email: string}) => {
  if (!email.includes('@')) {
    return emailNotValidToast();
  }
  return true;
};
export const passwordErrorToast = ({password}: {password: string}) => {
  const {isLengthValid, hasLetter, hasNumber, hasSpecialCharacter} =
    checkPassword(password);
  if (!isLengthValid) {
    return isLengthValidToast();
  }
  if (!hasLetter) {
    return hasLetterToast();
  }
  if (!hasNumber) {
    return hasNumberToast();
  }
  if (!hasSpecialCharacter) {
    return hasSpecialCharacterToast();
  }
  return true;
};
export const PasswordControls = ({password}: {password: string}) => {
  const {isLengthValid, hasLetter, hasNumber, hasSpecialCharacter} =
    checkPassword(password);
  return (
    <View style={styles.controls}>
      <View style={[styles.controlItem]}>
        <Entypo
          name={isLengthValid ? 'check' : 'cross'}
          style={{
            alignSelf: 'center',
            top: height(-0.4),
            paddingRight: width(2),
          }}
          size={size(15)}
          color={isLengthValid ? '#8ac926' : '#ff595e'}
        />

        <Text
          style={[
            styles.controlText,
            {
              color: isLengthValid ? 'white' : '#adb5bd',
            },
          ]}>
          {strings.eightChar}
        </Text>
      </View>
      <View style={[styles.controlItem]}>
        <Entypo
          name={hasLetter ? 'check' : 'cross'}
          style={{
            alignSelf: 'center',
            top: height(-0.4),
            paddingRight: width(2),
          }}
          size={size(15)}
          color={hasLetter ? '#8ac926' : '#ff595e'}
        />

        <Text
          style={[
            styles.controlText,
            {
              color: hasLetter ? 'white' : '#adb5bd',
            },
          ]}>
          {strings.oneLetter}
        </Text>
      </View>
      <View style={[styles.controlItem]}>
        <Entypo
          name={hasNumber ? 'check' : 'cross'}
          style={{
            alignSelf: 'center',
            top: height(-0.4),
            paddingRight: width(2),
          }}
          size={size(15)}
          color={hasNumber ? '#8ac926' : '#ff595e'}
        />

        <Text
          style={[
            styles.controlText,
            {
              color: hasNumber ? 'white' : '#adb5bd',
            },
          ]}>
          {strings.oneNumber}
        </Text>
      </View>
      <View style={[styles.controlItem]}>
        <Entypo
          name={hasSpecialCharacter ? 'check' : 'cross'}
          style={{
            alignSelf: 'center',
            top: height(-0.4),
            paddingRight: width(2),
          }}
          size={size(15)}
          color={hasSpecialCharacter ? '#8ac926' : '#ff595e'}
        />

        <Text
          style={[
            styles.controlText,
            {
              color: hasSpecialCharacter ? 'white' : '#adb5bd',
            },
          ]}>
          {strings.oneSpecialChar}
        </Text>
      </View>
    </View>
  );
};
