import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import loginScreen from '../../module/auth/login/view/login-screen';
import RegisterScreen from '../../module/auth/register/view/register-screen/register-screen';
import ForgotPassword from '../../module/auth/login/view/forgot-screen/view/forgot-screen';

const AuthStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="RegisterScreen">
      <stack.Screen name="LoginScreen" component={loginScreen} />
      <stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
    </stack.Navigator>
  );
};

export default AuthStack;
