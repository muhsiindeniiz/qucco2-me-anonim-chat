import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../../../db/Firebase/CRUD';
import {UserType} from '../../../constants/types';

export const getuserdata = async () => {
  try {
    const usersQuerySnapshot = await getDocs(
      query(collection(db, 'users'), where('username', '!=', '')),
    );

    const promises = usersQuerySnapshot.docs.map(async doc => {
      const userData = doc.data() as UserType;
      const settingsQuerySnapshot = await getDocs(
        query(
          collection(db, 'settings'),
          where('userId', '==', doc.id),
          where('showShuffle', '==', true),
        ),
      );
      if (settingsQuerySnapshot.size > 0) {
        return userData;
      }
      return null;
    });

    const result = await Promise.all(promises);
    const users = result.filter(user => user !== null) as UserType[];
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};
