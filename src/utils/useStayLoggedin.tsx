import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {storage} from '../sections/Auth/Register/RegisterScreen';

const useStayLoggedin = () => {
  const [userId, setUserId] = useState<string | null>('');
  useEffect(() => {
    const id = storage.getString('userId');
    setUserId(id as string | '');
  }, []);

  return userId;
};

export default useStayLoggedin;
