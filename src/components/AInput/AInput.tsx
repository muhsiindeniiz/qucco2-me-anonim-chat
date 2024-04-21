import React from "react";
import { TextInput, TextInputProps, ViewStyle, StyleSheet } from "react-native";

interface AInputProps extends TextInputProps {
  style?: ViewStyle;
}

const AInput: React.FC<AInputProps> = ({ style, ...rest }) => {
  return <TextInput style={style} {...rest} />;
};

export default AInput;
