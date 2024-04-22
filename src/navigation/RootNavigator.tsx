import React, {useEffect} from 'react';
import AuthStack from './stack/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './tab/TabNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import { storage } from '../constants/app';

const RootNavigator = () => {
  const userId = storage.getString('userId');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn !== false) {
      console.log('isLoggedIn', isLoggedIn);
    }
  }, [isLoggedIn, userId]);

  return (
    <NavigationContainer>
      {userId !== undefined ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
