import {View, Text, SafeAreaView, TouchableOpacity, Switch} from 'react-native';
import React, {useState} from 'react';
import style from './setting-page.style';
import {useNavigation} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';

const SettingPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <IonIcons name="chevron-back" size={24} style={style.setting} />
        </TouchableOpacity>
        <Text style={style.title}>Settings</Text>
        <View></View>
      </View>

      <View style={style.properties}>
        <View style={style.page}>
          <Text style={style.label}>Theme</Text>
          <Switch ios_backgroundColor="#3e3e3e" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingPage;
