import React, {useRef, useState} from 'react';
import {View, Animated, Image, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {height, width} from 'react-native-responsive-sizes';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../style/RegisterScreenStyles';
import { storage } from '../../../../../constants/app';

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
      ImagePicker.openCamera({
        cropping: true,
      }).then(image => {
        console.log(image.path);
        _handleSetPhoto(image.path);
      });
    } else if (chooseCamera === true) {
      ImagePicker.openPicker({
        cropping: true,
      }).then(image => {
        _handleSetPhoto(image.path);
      });
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
      <Text style={styles.addAPhoto}>Add Photo</Text>
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
          <View style={styles.chooseCamerView}>
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
                handleAddPhoto(false);
              }}
              style={styles.chooseCameraButton}>
              <Text style={styles.chooseCamerText}>Fotoğraf Çek</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
                handleAddPhoto(true);
              }}
              style={styles.chooseCameraButton}>
              <Text style={styles.chooseCamerText}>Galeriden Seç</Text>
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
        placeholder="About yourself"
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
