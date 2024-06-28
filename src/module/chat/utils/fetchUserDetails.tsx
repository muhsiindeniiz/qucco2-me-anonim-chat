import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {UserType} from '../../../constants/types';

const firestore = firebase.firestore();

export const fetchUserDetails = async (
  chatId: string,
  currentUserId: string,
): Promise<{
  username: string;
  anonNickname?: string;
  photo?: string;
} | null> => {
  if (!chatId || !currentUserId) {
    console.error('chatId or currentUserId is empty');
    return null;
  }

  const [userId1, userId2] = chatId.split('_');

  if (!userId1 || !userId2) {
    console.error('chatId is not in the correct format');
    return null;
  }

  const otherUserId = userId1 === currentUserId ? userId2 : userId1;

  if (!otherUserId) {
    console.error('otherUserId is empty');
    return null;
  }

  try {
    const otherUserRef = firestore.collection('users').doc(otherUserId);
    const otherUserDoc = await otherUserRef.get();

    if (!otherUserDoc.exists) {
      console.error('User not found');
      return null;
    }

    const otherUserData = otherUserDoc.data() as UserType;

    if (userId1 === currentUserId) {
      console.log('User data: ', otherUserData);
      return {
        username: otherUserData.username,
        photo: otherUserData.photo,
      };
    } else {
      return {
        username: otherUserData.username,
        anonNickname: otherUserData.anonNickname,
      };
    }
  } catch (error) {
    console.error('Error fetching user details: ', error);
    return null;
  }
};
