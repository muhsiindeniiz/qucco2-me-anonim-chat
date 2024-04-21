import React from 'react';
import {Image, ImageProps, ImageStyle} from 'react-native';

interface AImageProps extends ImageProps {
  style?: ImageStyle;
}

const AImage: React.FC<AImageProps> = ({style, ...rest}) => {
  return <Image style={style} {...rest} />;
};

export default AImage;
