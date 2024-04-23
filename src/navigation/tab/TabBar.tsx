import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const TabBar = ({state, navigation}: any) => {
  const {routes} = state;
  const renderTab = (tabName: string, tabIndex: number) => {
    // const isActive = index === tabIndex;
    // const isAddTab = tabName === 'Add';

    const onPress = () => {
      navigation.navigate(tabName);
    };

    return (
      <TouchableOpacity onPress={onPress} key={tabIndex}>
        <View>
          <Text>{tabName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[
        styles.tabBar,
        // {
        //   display: situation ? 'none' : 'flex',
        // },
      ]}>
      {routes.map((route: any, index: number) => {
        const tabName = route.name;
        return renderTab(tabName, index);
      })}
    </View>
  );
};

export default TabBar;
export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
});
