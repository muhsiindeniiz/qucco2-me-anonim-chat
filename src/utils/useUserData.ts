import {useEffect, useState} from 'react';
import {getuserdata} from '../module/explore/util/getuserdata';
import {UserType} from '../constants/types';
import {storage} from '../constants/app';

export const useUserData = () => {
  const [userData, setUserDatas] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  let userId = storage.getString('userId')?.replace(/^"(.*)"$/, '$1');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getuserdata();
      setUserDatas(data.filter(user => user.id !== userId));
      setCurrentUser(data.find(user => user.id === userId) || null);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {userData, currentUser};
};
