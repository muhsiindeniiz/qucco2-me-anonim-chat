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
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './setting-page.style';
import {useNavigation} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {firestore} from '../../../../db/Firebase/config';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import {deleteDoc, doc, getDoc, updateDoc} from 'firebase/firestore';
import {SettingType} from './setting-page.type';
import {ACCOUNT_SETTING_TYPE} from '../../components/setting-detail-info';
import {getSettings} from '../../query/setting';
import logo from '../../../../assets/image/logo.png';
import {deleteUser, getAuth, signOut} from 'firebase/auth';
import {storage} from '../../../../constants/app';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../../../redux/AuthSlice/authSlice';
import {AuthStackNavProp} from '../../../../navigation/stack/auth-stack/auth-stack-types';

const SettingPage = () => {
  const navigation = useNavigation<AuthStackNavProp>();
  const id = useStayLoggedin();
  const [settings, setSettings] = useState<SettingType | null>(null);
  const auth = getAuth();
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

    const updatedValue = !settings[key];

    setSettings({
      ...settings,
      [key]: updatedValue,
    });

    try {
      const userDocRef = doc(firestore, 'users', id);
      await updateDoc(userDocRef, {
        settings: {
          ...settings,
          [key]: updatedValue,
        },
      });
    } catch (error) {
      console.error(`${key} güncellenirken bir hata oluştu:`, error);
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

  const handleDeactivateAccount = async () => {
    if (!id) {
      return;
    }
    try {
      await updateDoc(doc(firestore, 'users', id), {
        status: false,
      });
      handleLogout();
    } catch (error) {
      console.error('Hesap deaktive edilirken bir hata oluştu:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!auth.currentUser || !id) {
      return;
    }
    try {
      await deleteUser(auth.currentUser);
      await deleteDoc(doc(firestore, 'users', id));
      handleLogout();
    } catch (error) {
      console.error('Hesap silinirken bir hata oluştu:', error);
    }
  };

  return (
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
            onPress={() => {
              Alert.alert('Log Out', 'Are you sure you want to log out?', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'Log Out', onPress: handleLogout},
              ]);
            }}>
            <Text style={styles.accountLabel}>Log Out</Text>
          </Pressable>
        </View>

        <View>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.version}>Version: 0.1</Text>
        </View>

        <View style={styles.properties}>
          <Pressable
            style={[styles.page, styles.borderBottomActive]}
            onPress={() =>
              Alert.alert(
                'Deactivate Account',
                'Are you sure want to Deactivate Account?',
                [
                  {
                    text: 'Cancel',
                  },
                  {
                    text: 'Deactivate',
                    onPress: () => handleDeactivateAccount(),
                  },
                ],
              )
            }>
            <Text style={styles.accountLabel}>Deactivate Account</Text>
          </Pressable>

          <Pressable
            style={[styles.page, styles.borderBottomPassive]}
            onPress={() =>
              Alert.alert('Delete Account', 'Are you sure to Delete Account?', [
                {
                  text: 'Cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => handleDeleteAccount(),
                },
              ])
            }>
            <Text style={styles.accountLabel}>Delete Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingPage;
