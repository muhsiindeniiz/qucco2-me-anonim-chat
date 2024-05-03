import {StackScreenProps} from '@react-navigation/stack';
import {GeneralType, UserType} from '../../../constants/types';

export type ChatStackParamList = {
  Chat: undefined;
  NewChat: {item: UserType};
} & {
  [stackName: string]: {
    screen: string;
    params?: {
      [key: string]: GeneralType;
    };
  };
};
export type ChatStackScreenProps<T extends keyof ChatStackParamList> =
  StackScreenProps<ChatStackParamList, T>;
export type ChatStackNavProp<
  S extends keyof ChatStackParamList = keyof ChatStackParamList,
> = StackScreenProps<ChatStackParamList, S>;
