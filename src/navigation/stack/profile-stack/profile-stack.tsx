import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../../module/profile/view/profile-page';
import {ProfileStackParamList} from './profile-stack-types';
import SettingPage from '../../../module/profile/layout/setting-page/setting-page';
import ChangeAccountInfo from '../../../module/profile/components/change-account-info/change-account-info';
import UsernameSetting from '../../../module/profile/components/username-setting/username-setting';

const ProfileStack = () => {
  const stack = createStackNavigator<ProfileStackParamList>();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* add screens */}
      <stack.Screen name="Profile" component={Profile} />
      <stack.Screen name="Setting" component={SettingPage} />
      <stack.Screen name="ChangeAccountInfo" component={ChangeAccountInfo} />
      <stack.Screen name="UsernameSetting" component={UsernameSetting} />
    </stack.Navigator>
  );
};

export default ProfileStack;
