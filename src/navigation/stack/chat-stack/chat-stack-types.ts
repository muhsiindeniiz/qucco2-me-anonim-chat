import {StackScreenProps} from '@react-navigation/stack';
import {GeneralType, UserType} from '../../../constants/types';

export type ChatStackParamList = {
  ChatList:undefined;
  NewChat: {item: UserType; currentUser: UserType};
  ChatDetail: {chatId: string; currentUser: UserType; recipient: UserType}; // Yeni ChatDetail ekranı
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
