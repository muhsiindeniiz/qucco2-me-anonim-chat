import {View, Text, SafeAreaView, TouchableOpacity, Switch} from 'react-native';
import React from 'react';
import styles from './setting-page.style';
import {useNavigation} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';

const SettingPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <IonIcons name="chevron-back" size={24} style={styles.setting} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.properties}>
        <View style={styles.page}>
          <Text style={styles.label}>Theme</Text>
          <Switch ios_backgroundColor="#3e3e3e" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingPage;
