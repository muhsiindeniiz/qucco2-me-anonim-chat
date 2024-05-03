import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import {StoriesStackNavProp} from '../../../navigation/stack/stories-stack/stories-stack-types';
import useVisible from '../../../utils/tabbarVisible';

const Stories = ({route, navigation}: StoriesStackNavProp) => {
  useVisible(navigation, false);
  return (
    <SafeAreaView>
      <Text>Stories</Text>
    </SafeAreaView>
  );
};

export default Stories;
