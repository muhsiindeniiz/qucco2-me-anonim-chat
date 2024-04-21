import Toast from 'react-native-toast-message';
type ControlTextsProps = {
  username: string;
  email: string;
  password: string;
  date: Date;
  gender: string;
  photo: string;
  about: string;
};
export const ControlTexts = (
  {username, email, password, date, gender, photo, about}: ControlTextsProps,
  index: number,
) => {
  if (index === 0 && username === '') {
    Toast.show({
      visibilityTime: 1000,
      type: 'error',
      text1: 'Error',
      text2: 'Please enter a username',
      position: 'bottom',
    });
    return false; // Hata durumunda false dön
  } else if (index === 1 && email === '') {
    Toast.show({
      visibilityTime: 1000,
      type: 'error',
      text1: 'Error',
      text2: 'Please enter an email',
      position: 'bottom',
    });
    return false; // Hata durumunda false dön
  } else if (index === 1 && password === '') {
    Toast.show({
      visibilityTime: 1000,
      type: 'error',
      text1: 'Error',
      text2: 'Please enter a password',
      position: 'bottom',
    });
    return false; // Hata durumunda false dön
  } else if (index === 2 && date === new Date()) {
    Toast.show({
      visibilityTime: 1000,
      type: 'error',
      text1: 'Error',
      text2: 'Please enter a date of birth',
      position: 'bottom',
    });
    return false; // Hata durumunda false dön
  } else if (index === 2 && gender === '') {
    Toast.show({
      visibilityTime: 1000,
      type: 'error',
      text1: 'Error',
      text2: 'Please select gender',
      position: 'bottom',
    });
    return false; // Hata durumunda false dön
  } else if (index === 3 && photo === '') {
    Toast.show({
      visibilityTime: 1000,
      type: 'error',
      text1: 'Error',
      text2: 'Please select a photo',
      position: 'bottom',
    });
    return false; // Hata durumunda false dön
  } else if (index === 3 && about === '') {
    Toast.show({
      visibilityTime: 1000,
      type: 'error',
      text1: 'Error',
      text2: 'Please enter a description',
      position: 'bottom',
    });
    return false; // Hata durumunda false dön
  }
  return true; // Hata yoksa true dön
};
