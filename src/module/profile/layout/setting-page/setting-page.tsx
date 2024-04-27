import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Linking,
  Pressable,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './setting-page.style';
import {useNavigation} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {firestore} from '../../../../db/Firebase/config';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {SettingType} from './setting-page.type';
import {ACCOUNT_SETTING_TYPE} from '../../components/change-account-info';
import {getSettings} from '../../query/setting';
import logo from '../../../../assets/image/logo.png';
import {getAuth, signOut} from 'firebase/auth';
import {storage} from '../../../../constants/app';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../../../../redux/AuthSlice/authSlice';
import {RootState} from '../../../../redux/store';

const SettingPage = () => {
  const navigation = useNavigation();
  const id = useStayLoggedin();
  const [settings, setSettings] = useState<SettingType | null>(null);
  const auth = getAuth();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getSettings(id)
        .then(data => {
          setSettings(data as SettingType);
        })
        .catch(error => {
          console.error('Error setting settings state:', error);
        });
    }
  }, [id]);

  const handleToggle = async (key: keyof SettingType) => {
    if (!id || !settings) {
      return;
    }

    setSettings({
      ...settings,
      [key]: !settings?.[key],
    });

    const updatedSettings = {
      ...settings,
      [key]: !settings?.[key],
    };

    try {
      await updateDoc(doc(firestore, 'settings', id), updatedSettings);
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
    }
  };

  const handleHelpPress = () => {
    if (settings && settings.help) {
      Linking.openURL(settings.help);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      storage.delete('userId');
      dispatch(setLoggedIn(false));
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const isloggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  console.log(isloggedIn);
  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);
    handleLogout();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLogoutModalVisible}
        onRequestClose={() => setIsLogoutModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsLogoutModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleConfirmLogout}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <IonIcons name="chevron-back" size={24} style={styles.setting} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <Text />
        </View>
        <ScrollView>
          <View style={styles.properties}>
            <View style={[styles.page, styles.borderBottomActive]}>
              <Text style={styles.label}>Last Seen</Text>
              <Switch
                style={styles.switch}
                value={settings?.lastSeen}
                onValueChange={() => handleToggle('lastSeen')}
              />
            </View>

            <View style={[styles.page, styles.borderBottomActive]}>
              <Text style={styles.label}>Show My Profile on Shuffle</Text>
              <Switch
                style={styles.switch}
                value={settings?.showShuffle}
                onValueChange={() => handleToggle('showShuffle')}
              />
            </View>

            <Pressable
              style={[styles.page, styles.borderBottomActive]}
              onPress={() =>
                navigation.navigate('ChangeAccountInfo', {
                  title: 'Notification',
                  type: ACCOUNT_SETTING_TYPE.notification,
                })
              }>
              <Text style={styles.label}>Notification</Text>
            </Pressable>

            <Pressable
              style={[styles.page, styles.borderBottomActive]}
              onPress={() =>
                navigation.navigate('ChangeAccountInfo', {
                  title: 'Change Username',
                  type: ACCOUNT_SETTING_TYPE.username,
                })
              }>
              <Text style={styles.label}>Change Username</Text>
            </Pressable>

            <Pressable
              style={[styles.page, styles.borderBottomActive]}
              onPress={() =>
                navigation.navigate('ChangeAccountInfo', {
                  title: 'Change Password',
                  type: ACCOUNT_SETTING_TYPE.password,
                })
              }>
              <Text style={styles.label}>Change Password</Text>
            </Pressable>

            <Pressable
              style={[styles.page, styles.borderBottomActive]}
              onPress={() =>
                navigation.navigate('ChangeAccountInfo', {
                  title: 'Change Email',
                  type: ACCOUNT_SETTING_TYPE.email,
                })
              }>
              <Text style={styles.label}>Change Email</Text>
            </Pressable>

            <Pressable
              style={[styles.page, styles.borderBottomPassive]}
              onPress={() =>
                navigation.navigate('ChangeAccountInfo', {
                  title: 'Block List',
                  type: ACCOUNT_SETTING_TYPE.block,
                })
              }>
              <Text style={styles.label}>Block List</Text>
            </Pressable>
          </View>

          <View style={styles.properties}>
            <Pressable
              style={[styles.page, styles.borderBottomActive]}
              onPress={handleHelpPress}>
              <Text style={styles.label}>Help</Text>
            </Pressable>

            <Pressable
              style={[styles.page, styles.borderBottomPassive]}
              onPress={() => setIsLogoutModalVisible(true)}>
              <Text style={styles.accountLabel}>Log Out</Text>
            </Pressable>
          </View>

          <View>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.version}>Version: 0.1</Text>
          </View>

          <View style={styles.properties}>
            <Pressable style={[styles.page, styles.borderBottomActive]}>
              <Text style={styles.accountLabel}>Deactivate Account</Text>
            </Pressable>

            <Pressable style={[styles.page, styles.borderBottomPassive]}>
              <Text style={styles.accountLabel}>Delete Account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SettingPage;
