import {useEffect, useState} from 'react';
import {getuserdata} from '../module/explore/util/getuserdata';
import {UserType} from '../constants/types';

export const useUserData = () => {
  const [userData, setUserDatas] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getuserdata();
      setUserDatas(data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return userData;
};
