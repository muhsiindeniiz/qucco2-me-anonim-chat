import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type VıpStackParamList = {
  Vıp: undefined;
};
export type VıpStackScreenProps<T extends keyof VıpStackParamList> =
  StackScreenProps<VıpStackParamList, T>;
export type VıpStackNavProp<
  S extends keyof VıpStackParamList = keyof VıpStackParamList,
> = StackNavigationProp<VıpStackParamList, S>;
