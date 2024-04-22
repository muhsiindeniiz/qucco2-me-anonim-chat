import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import vipPage from 'module/vip/view/vip-page';

const VipStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* add screens */}
      <stack.Screen name="VIP" component={vipPage} />
    </stack.Navigator>
  );
};

export default VipStack;
