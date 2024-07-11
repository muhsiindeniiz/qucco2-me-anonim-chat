import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from './setting-detail-info.style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ACCOUNT_SETTING_TYPE,
  RootStackParamList,
} from './setting-detail-info.type';
import NotificationSetting from '../notification-setting';
import UsernameSetting from '../username-setting';
import PasswordSetting from '../password-setting';
import EmailSetting from '../email-setting';
import BlockedList from '../blocked-list';
import {AuthStackNavProp} from '../../../../navigation/stack/auth-stack/auth-stack-types';

const ChangeAccountInfo = () => {
  const navigation = useNavigation<AuthStackNavProp>();
  const route = useRoute<RootStackParamList>();
  const {title, type} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <IonIcons name="chevron-back" size={24} style={styles.setting} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text />
      </View>

      <View style={styles.dynamicForm}>
        {type === ACCOUNT_SETTING_TYPE.notification && <NotificationSetting />}
        {type === ACCOUNT_SETTING_TYPE.username && <UsernameSetting />}
        {type === ACCOUNT_SETTING_TYPE.password && <PasswordSetting />}
        {type === ACCOUNT_SETTING_TYPE.email && <EmailSetting />}
        {type === ACCOUNT_SETTING_TYPE.block && <BlockedList />}
      </View>
    </SafeAreaView>
  );
};

export default ChangeAccountInfo;
