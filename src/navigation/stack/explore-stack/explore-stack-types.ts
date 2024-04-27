import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type ExploreStackParamList = {
  Explore: undefined;
};
export type ExploreStackScreenProps<T extends keyof ExploreStackParamList> =
  StackScreenProps<ExploreStackParamList, T>;
export type ExploreStackNavProp<
  S extends keyof ExploreStackParamList = keyof ExploreStackParamList,
> = StackNavigationProp<ExploreStackParamList, S>;
