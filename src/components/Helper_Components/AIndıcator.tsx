import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import Metrics from '../../constants/Metrics';
import {colors} from '../../constants/colors';
import strings from '../../locales/locale';
type Props = {
  style: ViewStyle;
};
const AIndıcator = (props: Props) => {
  return (
    <View style={props.style}>
      <View
        style={{
          position: 'absolute',
          width: Metrics.measure(130),
          maxWidth: 250,
          height: Metrics.measure(2),
          maxHeight: 10,
          backgroundColor: colors.grey4,
          left: Metrics.height > 900 ? -150 : 0,
        }}
      />
      <Text
        style={{
          position: 'absolute',
          fontSize: Metrics.measure(16),
          color: colors.grey2,
          top: Metrics.height > 900 ? -25 : -9,
          alignSelf: 'center',
          paddingHorizontal: Metrics.measure(8),
        }}>
        {strings.or}
      </Text>
      <View
        style={{
          position: 'absolute',
          width: Metrics.measure(130),
          maxWidth: 250,
          height: Metrics.measure(2),
          maxHeight: 10,
          backgroundColor: colors.grey4,
          right: Metrics.height > 900 ? -150 : 0,
        }}
      />
    </View>
  );
};

export default AIndıcator;
