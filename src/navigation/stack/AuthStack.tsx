import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import loginScreen from '../../module/auth/login/view/login-screen';
import RegisterScreen from '../../module/auth/register/view/register-screen/register-screen';
import ForgotPassword from '../../module/auth/login/view/forgot-screen/view/forgot-screen';
import Onboarding from '../../module/onboarding/view/onboarding';

const AuthStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        transitionSpec: {
          open: {animation: 'timing', config: {duration: 300}},
          close: {animation: 'timing', config: {duration: 300}},

          // Ekranın sağdan gelmesini sağlar
        },
      }}
      initialRouteName="OnboardingScreen">
      <stack.Screen name="OnboardingScreen" component={Onboarding} />
      <stack.Screen name="LoginScreen" component={loginScreen} />
      <stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
    </stack.Navigator>
  );
};

export default AuthStack;
