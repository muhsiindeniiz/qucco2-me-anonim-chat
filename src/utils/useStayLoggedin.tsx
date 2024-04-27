import {useEffect, useState} from 'react';
import {storage} from '../constants/app';

const useStayLoggedin = () => {
  const [userId, setUserId] = useState<string | null>('');
  useEffect(() => {
    const id = storage.getString('userId');
    setUserId(id as string | '');
  }, []);

  return userId?.replaceAll('"', '');
};

export default useStayLoggedin;
