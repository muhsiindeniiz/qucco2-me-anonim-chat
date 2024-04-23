import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';

import ChatStack from '../stack/ChatStack';
import StoriesStack from '../stack/StoriesStack';
import ExploreStack from '../stack/ExploreStack';
import ProfileStack from '../stack/ProfileStack';
import TabBar from './TabBar';
import VipStack from '../stack/VIPStack';

const TabNavigator = () => {
  const tab = createBottomTabNavigator();
  return (
    <tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <tab.Screen name="StoriesStack" component={StoriesStack} />
      <tab.Screen name="ChatStack" component={ChatStack} />
      <tab.Screen name="VipStack" component={VipStack} />
      <tab.Screen name="ExploreStack" component={ExploreStack} />
      <tab.Screen name="ProfileStack" component={ProfileStack} />
    </tab.Navigator>
  );
};

export default TabNavigator;
