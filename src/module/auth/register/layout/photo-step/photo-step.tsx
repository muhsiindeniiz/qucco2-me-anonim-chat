import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {height, width} from 'react-native-responsive-sizes';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../style/RegisterScreenStyles';
import {storage} from '../../../../../constants/app';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import strings from '../../../../../locale/locale';

type PhotoScreenProps = {
  handleSetPhoto: (photo: string) => void;
  handleSetYourself: (yourself: string) => void;
};
const PhotoScreen = ({handleSetPhoto, handleSetYourself}: PhotoScreenProps) => {
  const [photo, setPhoto] = useState(storage.getString('photo') || '');
  const [yourself, setYourself] = useState<string>(
    storage.getString('about') || '',
  );

  const [open, setOpen] = useState<boolean>(false);
  const emailBorderBottomWidth = useRef(new Animated.Value(1)).current;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const _handleSetPhoto = (photo: string) => {
    setPhoto(photo);
    handleSetPhoto(photo);
    storage.set('photo', photo);
  };
  const _handleSetYourself = (yourself: string) => {
    setYourself(yourself);
    handleSetYourself(yourself);
    storage.set('about', yourself);
  };
  const animateBorder = (borderWidth: Animated.Value, toValue: number) => {
    Animated.timing(borderWidth, {
      toValue: toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };
  const handleAddPhoto = (chooseCamera: boolean) => {
    if (chooseCamera === false) {
      launchCamera(
        {
          mediaType: 'photo',
          includeBase64: false,
          cameraType: 'front',
          saveToPhotos: true,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            _handleSetPhoto(response.assets?.[0]?.uri ?? '');
          }
        },
      );
    } else if (chooseCamera === true) {
      launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            console.log(response.assets?.[0]?.uri);
            _handleSetPhoto(response.assets?.[0]?.uri ?? '');
          }
        },
      );
    }
  };

  const handleEmailFocus = () => {
    animateBorder(emailBorderBottomWidth, 2.5);
  };

  const handleEmailBlur = () => {
    animateBorder(emailBorderBottomWidth, 1);
  };

  return (
    <View style={styles.body}>
      <Text style={styles.addAPhoto}>{strings.addPhoto}</Text>
      <View style={styles.photoContainer}>
        {photo ? (
          <Image source={{uri: photo}} style={styles.photo} />
        ) : (
          <IonIcons name="person" size={height(13)} color="white" />
        )}
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          style={styles.addPhotoButton}>
          <MaterialIcons name="add-a-photo" size={height(2.5)} color="white" />
        </TouchableOpacity>
        {open && (
          <View style={styles.chooseCameraContainer}>
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
                handleAddPhoto(false);
              }}
              style={styles.chooseCameraButton}>
              <Text style={styles.chooseCameraText}>{strings.takePhoto}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
                handleAddPhoto(true);
              }}
              style={styles.chooseCameraButton}>
              <Text style={styles.chooseCameraText}>
                {strings.chooseFromLibrary}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Animated.View
        style={{
          borderBottomWidth: emailBorderBottomWidth,
          borderColor: 'white',
          zIndex: 1,
          position: 'absolute',
          width: width(90),
          height: height(1),
          top: height(33),
          left: width(5),
        }}
      />
      <TextInput
        placeholder={strings.about}
        placeholderTextColor={'#a3a6d8'}
        value={yourself}
        onChangeText={text => {
          _handleSetYourself(text);
        }}
        onFocus={handleEmailFocus}
        onBlur={handleEmailBlur}
        style={[styles.input, {top: height(23)}]}
      />
    </View>
  );
};

export default PhotoScreen;
