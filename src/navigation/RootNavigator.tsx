import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AuthStack from './stack/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './tab/TabNavigator';
import {storage} from '../sections/Auth/Register/RegisterScreen';
import useStayLoggedin from '../utils/useStayLoggedin';
import firebase from 'firebase/compat/app';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

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
