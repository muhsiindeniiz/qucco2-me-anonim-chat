import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import styles from './username-setting.style';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';
import {useNavigation} from '@react-navigation/native';
import useStayLoggedin from '../../../../utils/useStayLoggedin';

const UsernameSetting = () => {
  const id = useStayLoggedin();

  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  const changeUsername = async () => {
    if (!newUsername || !currentPassword) {
      Alert.alert('Please enter both New Username and Current Password');
      return;
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;

      if (!user || !user.email || !id) {
        Alert.alert('You are not logged in. Please log in to change username.');
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      await reauthenticateWithCredential(user, credential);

      const userDocRef = doc(firestore, 'users', id);

      await updateDoc(userDocRef, {
        username: newUsername,
      });

      Alert.alert('Username changed successfully!', '', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Setting'),
        },
      ]);

      setNewUsername(''); // Clear input fields after success
      setCurrentPassword('');
    } catch (error) {
      console.error('Error changing username:', error);

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
            placeholder="New Username"
            style={styles.input}
            placeholderTextColor="#454D57"
            autoCapitalize="none"
            value={newUsername}
            onChangeText={setNewUsername}
          />
        </View>

        <View style={[styles.page, styles.borderBottomPassive]}>
          <TextInput
            placeholder="Current Password"
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
        onPress={changeUsername}
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

export default UsernameSetting;
