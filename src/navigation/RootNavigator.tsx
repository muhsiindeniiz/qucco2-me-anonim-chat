import React, {useEffect, useState} from 'react';
import AuthStack from './stack/AuthStack';
import TabNavigator from './tab/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {storage} from '../constants/app';
import SplashScreen from '../components/splash-screen';

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userId = await storage.getString('userId');
      if (userId) {
        setAuthenticated(true);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    checkAuthentication();
  }, []);

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
