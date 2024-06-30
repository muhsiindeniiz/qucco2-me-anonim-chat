import {
  View,
  Text,
  Modal,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import {Badges, UserType} from '../../../../constants/types';
import {getUser} from '../../query/setting';
import {EditProfileModalProps} from './edit-profile-modal.type';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from './edit-profile-modal.style';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FanIcons from 'react-native-vector-icons/FontAwesome6';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {doc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';
import BioDetailModal from '../bio-detail-modal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import EditTagsModal from '../edit-tags-modal';
import ImagePicker, {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { setUserInfo } from '../../../../redux/auth-slice/auth-slice';

const EditProfileModal = ({onClose, isOpen}: EditProfileModalProps) => {
  const id = useStayLoggedin();
  const dispatch = useDispatch();
  const [isShowBirthDate, setIsShowBirthDate] = useState(false);
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const [editBioModalVisible, setEditBioModalVisible] = useState(false);
  const [editTagsModalVisible, setEditTagsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const userData = await getUser(id);
          dispatch(setUserInfo(userData as UserType));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, [dispatch, id]);

  const handleBirthdateUpdate = async (newBirthdate: Date) => {
    try {
      if (!id || !user) {
        return;
      }
      const isoString = newBirthdate.toISOString();
      await updateDoc(doc(firestore, 'users', id), {
        birthdate: isoString,
      });
      dispatch(
        setUserInfo({
          ...user,
          birthdate: newBirthdate,
        }),
      );
    } catch (error) {
      console.error('Error updating user birthdate:', error);
    }
  };

  const handleBadgeUpdate = async (badge: keyof Badges, value: boolean) => {
    try {
      if (!id || !user) {
        return;
      }

      await updateDoc(doc(firestore, 'users', id), {
        badges: {
          ...user.badges,
          [badge]: value,
        },
      });

      const updatedUserData = await getUser(id);

      dispatch(setUserInfo(updatedUserData as UserType));
    } catch (error) {
      console.error('Error updating user badges:', error);
    }
  };

  const renderBadge = (badge: keyof Badges, label: string) => (
    <TouchableOpacity
      style={[
        style.actionContainer,
        user?.badges && user.badges[badge]
          ? style.badgeActive
          : style.badgePassive,
      ]}
      onPress={() => handleBadgeUpdate(badge, !user?.badges[badge])}>
      <View style={[style.icon, style[badge.toLowerCase()]]}>
        {badge === 'FOLLOWERS' ? (
          <FanIcons name="user-plus" size={20} style={style.actionIcon} />
        ) : (
          <IonIcons
            name="chatbubble-sharp"
            size={22}
            style={style.actionIcon}
          />
        )}
      </View>
      <Text style={style.actionValue}>0</Text>
      <Text style={style.actionTitle}>{label}</Text>
    </TouchableOpacity>
  );

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

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      (response: ImagePickerResponse) => {
        if (!response.didCancel) {
          // Kullanıcı fotoğrafı seçtiyse, response.uri değeri kullanılabilir
        }
      },
    );
  };

  const openPhotoLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      (response: ImagePickerResponse) => {
        if (!response.didCancel) {
          // Kullanıcı fotoğrafı seçtiyse, response.uri değeri kullanılabilir
        }
      },
    );
  };

  const handleAddPhoto = () => {
    Alert.alert('Add Photo', 'Select an option', [
      {text: 'Take Photo', onPress: () => takePhoto()},
      {text: 'Photo Library', onPress: () => openPhotoLibrary()},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={() => onClose(false)}>
      <BioDetailModal
        isOpen={editBioModalVisible}
        onClose={setEditBioModalVisible}
        biography={user?.about ?? ''}
      />
      <EditTagsModal
        isOpen={editTagsModalVisible}
        onClose={setEditTagsModalVisible}
        tags={user?.tags ?? []}
      />

      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <Text style={style.title}>Edit</Text>
          <Text style={style.close} onPress={() => onClose(false)}>
            Close
          </Text>
        </View>
        <View style={style.gallery}>
          {Array.from({length: 1}).map((_, i) => (
            <TouchableOpacity
              style={[style.photo, style.addPhoto]}
              onPress={handleAddPhoto}
              key={i}>
              <Text>Add Photo</Text>
            </TouchableOpacity>
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
              {renderBadge('SUPER_MESSAGE', 'Super Messages')}
              {renderBadge('CONVERSATIONS', 'Conversations')}
              {renderBadge('LIKES', 'Likes')}
              {renderBadge('FOLLOWERS', 'Followers')}
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
          <Text
            style={style.bioContent}
            onPress={() => {
              setEditBioModalVisible(true);
            }}>
            {user?.about}
          </Text>
          <Text style={style.bioLimit}>56/300</Text>
        </View>

        <View style={style.section}>
          <Text style={style.headerTitle}>TAGS</Text>
        </View>
        <TouchableOpacity
          onPress={() => setEditTagsModalVisible(true)}
          style={style.tagsContainer}>
          {user?.tags ? (
            user.tags.map(tag => (
              <Text key={tag.id} style={[style.tagText, style.tagBadge]}>
                #{tag.label}
              </Text>
            ))
          ) : (
            <Text style={style.tagText}>Add Tag</Text>
          )}
        </TouchableOpacity>

        <View style={style.section}>
          <Text style={style.headerTitle}>BIRTH DATE</Text>
        </View>
        <View style={style.birthDate}>
          <Text
            style={style.dateContent}
            onPress={() => setIsShowBirthDate(true)}>
            {moment(user?.birthdate, 'DD-MM-YYYY').format('DD-MM-YYYY')}
          </Text>
          <DateTimePickerModal
            isVisible={isShowBirthDate}
            mode="date"
            minimumDate={new Date(1900, 0, 1)}
            maximumDate={maxBirthDate}
            date={moment(user?.birthdate, 'DD-MM-YYYY').toDate()}
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
