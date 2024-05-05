import {
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './profile-page.style';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FanIcons from 'react-native-vector-icons/FontAwesome6';
import GetPromote from '../layout/get-promote';
import ProfileDetailModal from '../components/profile-detail-modal';
import {useNavigation} from '@react-navigation/native';
import useStayLoggedin from '../../../utils/useStayLoggedin';
import {getUser} from '../query/setting';
import {UserType} from '../../../constants/types';
import EditProfileModal from '../components/edit-profile-modal';
import {AuthStackNavProp} from '../../../navigation/stack/auth-stack/auth-stack-types';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../../redux/ShuffleSlice/shuffleSlice';
import {setUserInfo} from '../../../redux/AuthSlice/authSlice';

const Profile = () => {
  const id = useStayLoggedin();
  const dispatch = useDispatch();
  const [profileDetailModalVisible, setProfileDetailModalVisible] =
    useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const navigation = useNavigation<AuthStackNavProp>();

  useEffect(() => {
    if (id) {
      getUser(id)
        .then(data => {
          setUser(data as UserType);
          dispatch(setUserInfo(data as UserType));
        })
        .catch(error => {
          console.error('Error user state:', error);
        });
    }
  }, [dispatch, id]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        url: 'https://qucco2.me/muhsindeniz',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          false;
        } else {
          await Share.share({
            message: 'https://qucco2.me/muhsindeniz',
          });
        }
      } else if (result.action === Share.dismissedAction) {
        false;
      }
    } catch (error) {}
  };

  return (
    <>
      <ProfileDetailModal
        isOpen={profileDetailModalVisible}
        onClose={setProfileDetailModalVisible}
      />
      <EditProfileModal
        isOpen={editProfileModalVisible}
        onClose={setEditProfileModalVisible}
      />
      <SafeAreaView style={style.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Setting');
          }}
          style={style.header}>
          <IonIcons name="settings" size={24} style={style.setting} />
        </TouchableOpacity>
        <ScrollView>
          <View style={style.profilePicture}>
            <TouchableOpacity
              onPress={() => {
                setProfileDetailModalVisible(true);
              }}>
              <Image
                style={style.picture}
                src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              />
            </TouchableOpacity>
            <Text style={style.username}>{user?.username}</Text>
            <TouchableOpacity
              onPress={() => {
                setProfileDetailModalVisible(true);
              }}>
              <Text style={style.seeProfile}>Tap to see your profile</Text>
            </TouchableOpacity>
          </View>
          <View style={style.infoActions}>
            <View style={style.actionContainer}>
              <View style={[style.icon, style.likes]}>
                <IonIcons name="heart" size={24} style={style.actionIcon} />
              </View>
              <Text style={style.actionValue}>0</Text>
              <Text style={style.actionTitle}>likes</Text>
            </View>
            <View style={style.actionContainer}>
              <View style={[style.icon, style.conversations]}>
                <IonIcons
                  name="chatbubble-sharp"
                  size={24}
                  style={style.actionIcon}
                />
              </View>
              <Text style={style.actionValue}>5</Text>
              <Text style={style.actionTitle}>conversations</Text>
            </View>
            <View style={style.actionContainer}>
              <View style={[style.icon, style.followers]}>
                <FanIcons name="user-plus" size={20} style={style.actionIcon} />
              </View>
              <Text style={style.actionValue}>
                {user?.followers.length ?? 0}
              </Text>
              <Text style={style.actionTitle}>followers</Text>
            </View>
          </View>
          <View style={style.profileActions}>
            <TouchableOpacity style={style.shareProfile} onPress={onShare}>
              <FanIcons
                name="share-from-square"
                size={18}
                style={{
                  color: '#fff',
                }}
              />
              <Text style={style.actionText}>Share Your Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditProfileModalVisible(true);
              }}
              style={style.editProfile}>
              <FanIcons
                name="edit"
                size={18}
                style={{
                  color: '#fff',
                }}
              />
              <Text style={style.actionText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <GetPromote />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Profile;
