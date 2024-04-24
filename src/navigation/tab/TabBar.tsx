import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBar = ({state, navigation}: any) => {
  const {routes} = state;

  const renderIcon = (routeName: string, iconName: string, size: number) => {
    const isActive = state.routes[state.index].name === routeName;
    const color = isActive ? '#FFFFFF' : '#808080';
    const onPress = () => {
      navigation.navigate(routeName);
    };

    return (
      <TouchableOpacity onPress={onPress} key={routeName}>
        <View
          style={{
            height: 50,
          }}>
          <Icon name={iconName} size={size} color={color} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tabBar}>
      {routes.map((route: any) => {
        let iconName = '';
        let size = 28;
        switch (route.name) {
          case 'StoriesStack':
            iconName = 'albums';
            break;
          case 'ChatStack':
            iconName = 'chatbubble-sharp';
            break;
          case 'ExploreStack':
            iconName = 'shuffle';
            size = 32;
            break;
          case 'VipStack':
            iconName = 'rocket-sharp';
            break;
          case 'ProfileStack':
            iconName = 'person';
            break;
          default:
            iconName = 'help';
            break;
        }
        return renderIcon(route.name, iconName, size);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#06101B',
  },
});

export default TabBar;
