import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../../../db/Firebase/CRUD';
import {UserType} from '../../../constants/types';

export const getuserdata = async () => {
  try {
    const usersQuerySnapshot = await getDocs(
      query(collection(db, 'users'), where('username', '!=', '')),
    );

    const filteredUsers = usersQuerySnapshot.docs
      .map(doc => doc.data() as UserType)
      .filter(userData => userData.settings?.showShuffle);

    return filteredUsers;
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};
