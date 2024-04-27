import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';

import ChatStack from '../stack/chat-stack/chat-stack';
import StoriesStack from '../stack/stories-stack/stories-stack';
import ExploreStack from '../stack/explore-stack/explore-stack';
import ProfileStack from '../stack/profile-stack/profile-stack';
import TabBar from './TabBar';
import VipStack from '../stack/vıp-stack/vıp-stack';

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
      <tab.Screen name="ExploreStack" component={ExploreStack} />
      <tab.Screen name="VipStack" component={VipStack} />
      <tab.Screen name="ProfileStack" component={ProfileStack} />
    </tab.Navigator>
  );
};

export default TabNavigator;
