import React, {useEffect, useState} from 'react';
import AuthStack from './stack/AuthStack';
import TabNavigator from './tab/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {storage} from '../constants/app';
import SplashScreen from '../components/splash-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const isloggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userId = storage.getString('userId');
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isloggedIn === true || userId) {
        const userId = await storage.getString('userId');
        if (userId) {
          setAuthenticated(true);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    checkAuthentication();
  }, [isloggedIn, userId]);

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
