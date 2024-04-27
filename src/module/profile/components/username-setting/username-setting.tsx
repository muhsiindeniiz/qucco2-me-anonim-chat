import {
  View,
  TextInput,
  Touchable,
  TouchableHighlight,
  Text,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import styles from './username-setting.style';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';

const UsernameSetting = () => {
  const id = useStayLoggedin();

  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const auth = getAuth();

  const changeUsername = async () => {
    if (!newUsername || !currentPassword) {
      Alert.alert('Please enter both New Username and Current Password');
      return;
    }

    try {
      const user = auth.currentUser;

      // Check if user is logged in
      if (!user) {
        Alert.alert('You are not logged in. Please log in to change username.');
        return;
      }

      // Reauthenticate with current password for security
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      // Update username in Firestore
      const userDocRef = doc(firestore, 'users', user.uid); // Use user's uid for path
      await updateDoc(userDocRef, {username: newUsername});

      Alert.alert('Username changed successfully!');
      setNewUsername(''); // Clear input fields after success
      setCurrentPassword('');
    } catch (error) {
      console.error('Error changing username:', error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect Current Password');
      } else {
        Alert.alert('An error occurred. Please try again later.');
      }
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
        style={styles.button}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableHighlight>
    </>
  );
};

export default UsernameSetting;
