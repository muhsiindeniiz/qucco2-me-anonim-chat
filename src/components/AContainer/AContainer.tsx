import React, {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';

interface AContainerProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const AContainer: React.FC<AContainerProps> = ({children, style}) => {
  return <View style={[style].flat()}>{children}</View>;
};

export default AContainer;
