import {View, Text, Modal, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BioDetailModalProps} from './bio-detail-modal.type';
import style from './bio-detail-modal.style';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {doc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';
import {getUser} from '../../query/setting';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../../../../redux/AuthSlice/authSlice';
import {UserType} from '../../../../constants/types';

const BioDetailModal = ({onClose, isOpen, biography}: BioDetailModalProps) => {
  const id = useStayLoggedin();

  const [bio, setBio] = useState<string>(biography);
  const dispatch = useDispatch();

  const fetchUser = () => {
    if (id) {
      getUser(id)
        .then(data => {
          dispatch(setUserInfo(data as UserType));
        })
        .catch(error => {
          console.error('Error user state:', error);
        });
    }
  };

  const contentControl = bio.length < 1;
  const updateBio = async () => {
    try {
      if (!id) {
        return;
      }
      await updateDoc(doc(firestore, 'users', id), {
        about: bio,
      });
      fetchUser();
      onClose(false);
    } catch (error) {
      console.error('Error updating user birthdate:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={() => onClose(false)}>
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => onClose(false)}>
            <IonIcons name="chevron-back" size={24} style={style.active} />
          </TouchableOpacity>
          <Text
            disabled={contentControl}
            style={[
              style.close,
              contentControl ? style.disabled : style.active,
            ]}
            onPress={() => updateBio()}>
            Save
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
          }}>
          <Text style={style.bioLimit}>{300 - Number(bio?.length)}/300</Text>
          <TextInput
            defaultValue={biography}
            editable
            placeholder="Enter your bio"
            multiline
            maxLength={300}
            numberOfLines={20}
            placeholderTextColor="#bbb"
            style={style.bioInput}
            onChangeText={text => setBio(text)}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BioDetailModal;
