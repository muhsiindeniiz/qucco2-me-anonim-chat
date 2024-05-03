import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import styles from './password-setting.style';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

const PasswordSetting = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  const changePassword = async () => {
    if (!newPassword || !confirmPassword || !currentPassword) {
      Alert.alert('Please enter all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('New passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        Alert.alert('You are not logged in. Please log in to change password.');
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      Alert.alert('Password changed successfully!', '', [
        {text: 'OK', onPress: () => navigation.navigate('Setting')},
      ]);

      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (error) {
      console.error('Error changing password:', error);

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
        <View style={[styles.page, styles.borderBottomPassive]}>
          <TextInput
            placeholder="Current Password"
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="#454D57"
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>
      </View>

      <View style={styles.properties}>
        <View style={[styles.page, styles.borderBottomActive]}>
          <TextInput
            placeholder="New Password"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#454D57"
            autoCapitalize="none"
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>
        <View style={[styles.page, styles.borderBottomPassive]}>
          <TextInput
            placeholder="Confirm New Password"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#454D57"
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <TouchableHighlight
        underlayColor="#0C223B"
        onPress={changePassword}
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

export default PasswordSetting;
