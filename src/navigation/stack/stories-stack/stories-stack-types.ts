import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type StoriesStackParamList = {
  Stories: undefined;
} & {
  [stackName: string]: {
    screen: string;
    params?: {
      [key: string]: any;
    };
  };
};
export type StoriesStackScreenProps<T extends keyof StoriesStackParamList> =
  StackScreenProps<StoriesStackParamList, T>;
export type StoriesStackNavProp<
  S extends keyof StoriesStackParamList = keyof StoriesStackParamList,
> = StackNavigationProp<StoriesStackParamList, S>;
