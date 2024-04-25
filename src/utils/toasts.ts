import Toast from 'react-native-toast-message';
import strings from '../locale/locale';
export const emailNotValidToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.emailInvalidToastTitle,
    text2: strings.emailInvalidToastDesc,

    position: 'bottom',
    visibilityTime: 1000,
  });
};

export const isLengthValidToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.passwordInvalidToastTitle,
    text2: strings.passwordInvalidToast8Char,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const hasLetterToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.passwordInvalidToastTitle,
    text2: strings.passwordInvalidToast1Letter,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const hasNumberToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.passwordInvalidToastTitle,
    text2: strings.passwordInvalidToast1Number,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const hasSpecialCharacterToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.passwordInvalidToastTitle,
    text2: strings.passwordInvalidToast1SpecialChar,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const ageErrorToast = () => {
  return Toast.show({
    type: 'error',
    position: 'bottom',
    text1: strings.date18YearsOld,
    text2: strings.date18YearsOldDesc,
  });
};
export const resetEmailSuccessToast = () => {
  return Toast.show({
    type: 'success',
    text1: strings.resetEmailSuccessToastTitle,
    text2: strings.resetEmailSuccessToastDesc,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const usernameAlreadyExistsToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.usernameAllreadyTaken,
    text2: strings.chooseAnotherUsername,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const emailAlreadyExistsToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.emailAllreadyTaken,
    text2: strings.chooseAnotherEmail,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const wrongUsernameToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.wrongUsername,
    text2: strings.wrongUsernameDesc,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const wrongPasswordToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.wrongpassword,
    text2: strings.wrongpasswordDesc,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const wrongLoginToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.wrongLogin,
    text2: strings.wrongLoginDesc,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
export const emptyFieldToast = () => {
  return Toast.show({
    type: 'error',
    text1: strings.emptyField,
    text2: strings.emptyFieldDesc,
    position: 'bottom',
    visibilityTime: 1000,
  });
};
