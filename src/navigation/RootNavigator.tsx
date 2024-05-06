import React, {useEffect, useState} from 'react';
import AuthStack from './stack/auth-stack/auth-stack';
import TabNavigator from './tab/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {storage} from '../constants/app';
import SplashScreen from '../components/splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useUserData} from '../utils/useUserData';
import {setCurrentUser, setUserData} from '../redux/ShuffleSlice/shuffleSlice';

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const isloggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userId = storage.getString('userId');
  const dispatch = useDispatch();
  const {userData, currentUser} = useUserData();
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isloggedIn === true || userId) {
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
  }, [isloggedIn, userId, dispatch, userData, currentUser]);

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
