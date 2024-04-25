import React from 'react';
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

const ProfileDetailModal = ({onClose, isOpen}: ProfileDetailModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={() => onClose(false)}>
      <SafeAreaView style={style.container}>
        <ImageBackground
          style={style.profile}
          src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D">
          <TouchableOpacity
            onPress={() => onClose(false)}
            style={style.closeAction}>
            <FanIcons name="close" size={24} style={style.close} />
          </TouchableOpacity>
          <View>
            <Text style={style.username}>muhsindeniz</Text>
            <Text style={style.active}>Active a minute ago</Text>
          </View>
        </ImageBackground>

        <View style={style.bioContainer}>
          <Text style={style.biography}>
            Yazılım Mühendisi Kahve Hastası 🚀 ☕️
          </Text>
        </View>
        <Text style={style.createdAt}>Registered: 11.04.2024</Text>
      </SafeAreaView>
    </Modal>
  );
};

export default ProfileDetailModal;
