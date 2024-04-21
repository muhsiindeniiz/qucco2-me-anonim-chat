import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface ATouchableProps
  extends TouchableOpacityProps,
    TouchableHighlightProps {
  style?: ViewStyle;
  useHighlight?: boolean;
}

const ATouchable: React.FC<ATouchableProps> = ({
  style,
  useHighlight = false,
  children,
  ...rest
}) => {
  if (useHighlight) {
    return (
      <TouchableHighlight style={style} {...rest}>
        {children}
      </TouchableHighlight>
    );
  }

  return (
    <TouchableOpacity style={style} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default ATouchable;
