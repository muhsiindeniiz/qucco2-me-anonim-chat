import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import styles from './email-setting.style';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';
import {useNavigation} from '@react-navigation/native';

const EmailSetting = () => {
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const changeEmail = async () => {
    if (!newEmail || !currentPassword) {
      Alert.alert('Please enter both New Email and Current Password');
      return;
    }

    setIsLoading(true);

    try {
      if (!user) {
        Alert.alert('You are not logged in. Please log in to change email.');
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      await updateEmail(user, newEmail);

      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, {email: newEmail});

      Alert.alert('Email changed successfully!', '', [
        {text: 'OK', onPress: () => navigation.navigate('Setting')},
      ]);
      setNewEmail('');
      setCurrentPassword('');
    } catch (error) {
      console.error('Error changing email:', error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect Current Password');
      } else {
        Alert.alert('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.properties}>
        <View style={[styles.page, styles.borderBottomActive]}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#454D57"
            autoCapitalize="none"
            defaultValue={user?.email ?? ''}
            onChangeText={setNewEmail}
          />
        </View>

        <View style={[styles.page, styles.borderBottomPassive]}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#454D57"
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>
      </View>
      <TouchableHighlight
        underlayColor="#0C223B"
        onPress={changeEmail}
        style={[styles.button, {opacity: isLoading ? 0.5 : 1}]}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.saveText}>Save</Text>
        )}
      </TouchableHighlight>
    </>
  );
};

export default EmailSetting;
