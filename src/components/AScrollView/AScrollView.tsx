import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

interface AScrollViewProps extends ScrollViewProps {}

function AScrollView({ style, ...rest }: AScrollViewProps) {
  return <ScrollView style={style} {...rest} />;
}

export default AScrollView;
