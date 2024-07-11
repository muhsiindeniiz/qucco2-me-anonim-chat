import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProfileDetailModalProps} from './profile-detail-modal.type';
import style from './profile-detail-modal.style';
import FanIcons from 'react-native-vector-icons/FontAwesome';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import {UserType} from '../../../../constants/types';
import {getUser} from '../../query/setting';
moment.locale();
import moment from 'moment';

const ProfileDetailModal = ({onClose, isOpen}: ProfileDetailModalProps) => {
  const id = useStayLoggedin();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (id) {
      getUser(id)
        .then(data => {
          setUser(data as UserType);
        })
        .catch(error => {
          console.error('Error user state:', error);
        });
    }
  }, [id]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={() => onClose(false)}>
      <SafeAreaView style={style.container}>
        <ImageBackground style={style.profile} src={user?.photo}>
          <TouchableOpacity
            onPress={() => onClose(false)}
            style={style.closeAction}>
            <FanIcons name="close" size={24} style={style.close} />
          </TouchableOpacity>
          <View>
            <Text style={style.username}>{user?.username}</Text>
            <Text style={style.active}>Active a minute ago</Text>
          </View>
        </ImageBackground>

        <View style={style.bioContainer}>
          <Text style={style.biography}>{user?.about}</Text>
        </View>
        <Text style={style.createdAt}>
          Registered:{' '}
          {moment(user?.createdAt, 'DD-MM-YYYY').format('DD-MM-YYYY')}
        </Text>
      </SafeAreaView>
    </Modal>
  );
};

export default ProfileDetailModal;
