import React from "react";
import { Text, TextProps, TextStyle, StyleSheet } from "react-native";

interface ATextProps extends TextProps {
  style?: TextStyle;
}

const AText: React.FC<ATextProps> = ({ style, ...rest }) => {
  return <Text style={style} {...rest} />;
};

export default AText;
