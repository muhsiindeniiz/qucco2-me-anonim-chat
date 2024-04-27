import {View, Text, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import styles from './notification-setting.style';
import {doc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';
import {NotificationType} from './notification-setting.type';
import {getNotification} from '../../query/setting';

const NotificationSetting = () => {
  const id = useStayLoggedin();
  const [notification, setNotification] = useState<NotificationType | null>(
    null,
  );

  useEffect(() => {
    if (id) {
      getNotification(id)
        .then(data => {
          setNotification(data as NotificationType);
        })
        .catch(error => {
          console.error('Error setting settings state:', error);
        });
    }
  }, [id]);

  const handleToggle = async (key: keyof NotificationType) => {
    if (!id || !notification) {
      return;
    }

    setNotification({
      ...notification,
      [key]: !notification[key],
    });

    updateFirebaseNotification(key);
  };

  const updateFirebaseNotification = async (
    updatedKey: keyof NotificationType,
  ) => {
    if (!notification) {
      return;
    }

    const updatedNotification = {
      ...notification,
      [updatedKey]: !notification[updatedKey],
    };

    try {
      await updateDoc(doc(firestore, 'settings', id), {
        notification: updatedNotification,
      });
    } catch (error) {
      console.error(`Error updating ${updatedKey}:`, error);
    }
  };

  return (
    <View style={styles.properties}>
      <View style={[styles.page, styles.borderBottomActive]}>
        <Text style={styles.label}>Information</Text>
        <Switch
          style={styles.switch}
          value={notification?.information ?? true}
          onValueChange={() => handleToggle('information')}
        />
      </View>

      <View style={[styles.page, styles.borderBottomActive]}>
        <Text style={styles.label}>Text</Text>
        <Switch
          style={styles.switch}
          value={notification?.text ?? true}
          onValueChange={() => handleToggle('text')}
        />
      </View>

      <View style={[styles.page, styles.borderBottomActive]}>
        <Text style={styles.label}>Audio</Text>
        <Switch
          style={styles.switch}
          value={notification?.audio ?? true}
          onValueChange={() => handleToggle('audio')}
        />
      </View>

      <View style={[styles.page, styles.borderBottomActive]}>
        <Text style={styles.label}>Video</Text>
        <Switch
          style={styles.switch}
          value={notification?.video ?? true}
          onValueChange={() => handleToggle('video')}
        />
      </View>

      <View style={[styles.page, styles.borderBottomActive]}>
        <Text style={styles.label}>Photo</Text>
        <Switch
          style={styles.switch}
          value={notification?.photo ?? true}
          onValueChange={() => handleToggle('photo')}
        />
      </View>

      <View style={[styles.page, styles.borderBottomPassive]}>
        <Text style={styles.label}>Story</Text>
        <Switch
          style={styles.switch}
          value={notification?.story ?? true}
          onValueChange={() => handleToggle('story')}
        />
      </View>
    </View>
  );
};

export default NotificationSetting;
