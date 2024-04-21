import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../sections/Auth/Login/LoginScreen';
import RegisterScreen from '../../sections/Auth/Register/RegisterScreen';
import ForgotPassword from '../../sections/Auth/Login/ForgotPassword';

const AuthStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="RegisterScreen">
      <stack.Screen name="LoginScreen" component={LoginScreen} />
      <stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
    </stack.Navigator>
  );
};

export default AuthStack;
