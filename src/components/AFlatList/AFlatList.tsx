import React from "react";
import { FlatList, FlatListProps, StyleSheet } from "react-native";

interface AFlatListProps<ItemT> extends FlatListProps<ItemT> {}

function AFlatList<ItemT>({ style, ...rest }: AFlatListProps<ItemT>) {
  return <FlatList style={style} {...rest} />;
}

export default AFlatList;
