import {StackScreenProps} from '@react-navigation/stack';

export type ChatStackParamList = {
  Chat: undefined;
};
export type ChatStackScreenProps<T extends keyof ChatStackParamList> =
  StackScreenProps<ChatStackParamList, T>;
export type ChatStackNavProp<
  S extends keyof ChatStackParamList = keyof ChatStackParamList,
> = StackScreenProps<ChatStackParamList, S>;
