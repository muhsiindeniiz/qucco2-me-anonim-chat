import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableHighlight,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import {UserType} from '../../../../constants/types';
import {getUser} from '../../query/setting';
import {EditProfileModalProps} from './edit-profile-modal.type';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from './edit-profile-modal.style';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FanIcons from 'react-native-vector-icons/FontAwesome6';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Auth, updateCurrentUser} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';
import {useNavigation} from '@react-navigation/native';
import {ACCOUNT_SETTING_TYPE} from '../change-account-info';

const EditProfileModal = ({onClose, isOpen}: EditProfileModalProps) => {
  const id = useStayLoggedin();
  const [user, setUser] = useState<UserType | null>(null);
  const [isShowBirthDate, setIsShowBirthDate] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const userData = await getUser(id);
          setUser(userData as UserType);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, [id]);

  const handleBirthdateUpdate = async (newBirthdate: Date) => {
    try {
      if (!id) {
        return;
      }
      const isoString = newBirthdate.toISOString();
      await updateDoc(doc(firestore, 'users', id), {
        birthdate: isoString,
      });
      setUser(prevUser => {
        if (!prevUser) {
          return null;
        }
        return {
          ...prevUser,
          birthdate: newBirthdate,
        };
      });
    } catch (error) {
      console.error('Error updating user birthdate:', error);
    }
  };

  const calculateMaximumBirthDate = () => {
    const today = new Date();
    const maxBirthDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    return maxBirthDate;
  };

  const maxBirthDate = calculateMaximumBirthDate();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={() => onClose(false)}>
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <Text style={style.title}>Edit</Text>
          <Text style={style.close} onPress={() => onClose(false)}>
            Close
          </Text>
        </View>
        <View style={style.gallery}>
          {Array.from({length: 5}).map((_, i) => (
            <View style={[style.photo, style.addPhoto]} key={i}>
              <Text>Add Photo</Text>
            </View>
          ))}
        </View>

        <View style={style.section}>
          <Text style={style.headerTitle}>Badges</Text>
        </View>
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            <View style={style.badgesContainer}>
              <View style={style.actionContainer}>
                <View style={[style.icon, style.conversations]}>
                  <IonIcons
                    name="chatbubble-sharp"
                    size={22}
                    style={style.actionIcon}
                  />
                </View>
                <Text style={style.actionValue}>0</Text>
                <Text style={style.actionTitle}>super messages</Text>
              </View>
              <View style={style.actionContainer}>
                <View style={[style.icon, style.conversations]}>
                  <IonIcons
                    name="chatbubble-sharp"
                    size={22}
                    style={style.actionIcon}
                  />
                </View>
                <Text style={style.actionValue}>5</Text>
                <Text style={style.actionTitle}>conversations</Text>
              </View>
              <View style={style.actionContainer}>
                <View style={[style.icon, style.likes]}>
                  <IonIcons name="heart" size={22} style={style.actionIcon} />
                </View>
                <Text style={style.actionValue}>0</Text>
                <Text style={style.actionTitle}>likes</Text>
              </View>
              <View style={style.actionContainer}>
                <View style={[style.icon, style.followers]}>
                  <FanIcons
                    name="user-plus"
                    size={20}
                    style={style.actionIcon}
                  />
                </View>
                <Text style={style.actionValue}>
                  {user?.followers.length ?? 0}
                </Text>
                <Text style={style.actionTitle}>followers</Text>
              </View>
            </View>
          </ScrollView>
          <Text style={[style.section, style.bedgeDescription]}>
            Top to enable/disable bedges
          </Text>
        </View>

        <View style={style.section}>
          <Text style={style.headerTitle}>BIO</Text>
        </View>
        <View style={style.bioContainer}>
          <Text style={style.bioContent} onPress={() => console.log('BIO')}>
            Merhaba ben bir yazılımsal düşünen bir similasyonum. sdfd ☀️ Merhaba
            ben bir yazılımsal düşünen bir neden olmasın
          </Text>
          <Text style={style.bioLimit}>56/300</Text>
        </View>

        <View style={style.section}>
          <Text style={style.headerTitle}>TAGS</Text>
        </View>
        <TouchableHighlight
          underlayColor="#091523"
          onPress={() => console.log('Tag')}
          style={style.tagsContainer}>
          <Text style={style.tagText}>Add Tag</Text>
        </TouchableHighlight>

        <View style={style.section}>
          <Text style={style.headerTitle}>BIRTH DATE</Text>
        </View>
        <View style={style.birthDate}>
          <Text
            style={style.dateContent}
            onPress={() => setIsShowBirthDate(true)}>
            {moment(user?.birthdate, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format(
              'DD-MM-YYYY',
            )}
          </Text>
          <DateTimePickerModal
            isVisible={isShowBirthDate}
            mode="date"
            minimumDate={new Date(1900, 0, 1)}
            maximumDate={maxBirthDate}
            date={user?.birthdate ? new Date(user.birthdate) : new Date()}
            onConfirm={date => {
              setIsShowBirthDate(false);
              handleBirthdateUpdate(date);
            }}
            onCancel={() => {
              setIsShowBirthDate(false);
            }}
            pickerContainerStyleIOS={
              Platform.OS === 'ios' ? {backgroundColor: '#fff'} : undefined
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default EditProfileModal;
