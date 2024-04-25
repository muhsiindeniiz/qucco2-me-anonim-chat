import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './get-promote.style';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {size} from 'react-native-responsive-sizes';
import { useNavigation } from '@react-navigation/native';

const GetPromote = () => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: size(10),
          alignItems: 'center',
        }}>
        <IonIcons name="rocket" size={20} style={style.rocket} />
        <Text style={style.message}>Get More Messages</Text>
      </View>
      <Text style={style.description}>
        Get Suffle Promote, be on top of the Shuffle List.
      </Text>

      <TouchableOpacity
        style={style.promoteButton}
        onPress={() => navigation.navigate('VipStack')}>
        <Text style={style.text}>Get Suffle Promote!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetPromote;
