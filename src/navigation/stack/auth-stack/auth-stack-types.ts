import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type AuthStackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
};
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;
export type AuthStackNavProp<
  S extends keyof AuthStackParamList = keyof AuthStackParamList,
> = StackNavigationProp<AuthStackParamList, S>;
