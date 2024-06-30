import React, {useEffect, useState} from 'react';
import AuthStack from './stack/auth-stack/auth-stack';
import TabNavigator from './tab/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {storage} from '../constants/app';
import SplashScreen from '../components/splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useUserData} from '../utils/useUserData';
import {
  setCurrentUser,
  setUserData,
} from '../redux/shuffle-slice/shuffle-slice';

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userId = storage.getString('userId') ?? ''; // Provide a default value for userId
  const cleanedUserId = userId.replace(/"/g, ''); // Tırnakları temizle
  const dispatch = useDispatch();
  const {userData, currentUser} = useUserData();

  

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isLoggedIn === true || userId) {
        if (userId) {
          setAuthenticated(true);
          dispatch(setUserData(userData));
          if (currentUser) {
            dispatch(setCurrentUser(currentUser));
          }
        }
        if (userData && userData.length > 0) {
          setTimeout(() => {
            setLoading(false);
          }, 300);
        }
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    checkAuthentication();
  }, [isLoggedIn, userId, dispatch, userData, currentUser]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {authenticated ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
