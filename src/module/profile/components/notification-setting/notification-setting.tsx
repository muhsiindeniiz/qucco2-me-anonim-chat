import React, {useEffect, useState} from 'react';
import {View, Text, Switch, ActivityIndicator} from 'react-native';
import styles from './notification-setting.style';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';
import {NotificationType} from './notification-setting.type';
import useStayLoggedin from '../../../../utils/useStayLoggedin';

const NotificationSetting = () => {
  const id = useStayLoggedin();
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationType | null>(
    null,
  );

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        if (!id) {
          return;
        }
        const userDocRef = doc(firestore, 'users', id);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          setNotification(
            docSnapshot.data().settings.notifications as NotificationType,
          );
        } else {
          console.warn('Notification settings not found for user:', id);
        }
      } catch (error) {
        console.error('Error fetching notification settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotification();
  }, [id]);

  const handleToggle = async (key: keyof NotificationType) => {
    if (!id || !notification) {
      return;
    }

    const updatedNotification = {
      ...notification,
      [key]: !notification[key],
    };

    setNotification(updatedNotification);

    try {
      await updateDoc(doc(firestore, 'users', id), {
        'settings.notifications': updatedNotification,
      });
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
    }
  };

  return (
    <View style={styles.properties}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <View style={[styles.page, styles.borderBottomActive]}>
            <Text style={styles.label}>Information</Text>
            <Switch
              style={styles.switch}
              value={notification?.information}
              onValueChange={() => handleToggle('information')}
            />
          </View>

          <View style={[styles.page, styles.borderBottomActive]}>
            <Text style={styles.label}>Text</Text>
            <Switch
              style={styles.switch}
              value={notification?.text}
              onValueChange={() => handleToggle('text')}
            />
          </View>

          <View style={[styles.page, styles.borderBottomActive]}>
            <Text style={styles.label}>Audio</Text>
            <Switch
              style={styles.switch}
              value={notification?.audio}
              onValueChange={() => handleToggle('audio')}
            />
          </View>

          <View style={[styles.page, styles.borderBottomActive]}>
            <Text style={styles.label}>Video</Text>
            <Switch
              style={styles.switch}
              value={notification?.video}
              onValueChange={() => handleToggle('video')}
            />
          </View>

          <View style={[styles.page, styles.borderBottomActive]}>
            <Text style={styles.label}>Photo</Text>
            <Switch
              style={styles.switch}
              value={notification?.photo}
              onValueChange={() => handleToggle('photo')}
            />
          </View>

          <View style={[styles.page, styles.borderBottomPassive]}>
            <Text style={styles.label}>Story</Text>
            <Switch
              style={styles.switch}
              value={notification?.story}
              onValueChange={() => handleToggle('story')}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default NotificationSetting;
