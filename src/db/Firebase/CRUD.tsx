import {FIREBASE_AUTH} from './config';
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  where,
  collection,
  query,
} from 'firebase/firestore';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {getStorage, ref, uploadString, getDownloadURL} from 'firebase/storage';

export const db = getFirestore();
const storage = getStorage();
export const checkUsernameExists = async (username: string) => {
  const usernameQuerySnapshot = await getDocs(
    query(collection(db, 'users'), where('username', '==', username)),
  );
  return !usernameQuerySnapshot.empty;
};
export const checkEmailExists = async (email: string) => {
  const emailQuerySnapshot = await getDocs(
    query(collection(db, 'users'), where('email', '==', email)),
  );
  return !emailQuerySnapshot.empty;
};

export const register = async (props: UserType): Promise<string | null> => {
  const {email, password, username, about, photo, birthdate} = props;
  try {
    // Kullanıcıyı Firebase Authentication ile oluştur
    const userCredential = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password,
    );
    const id = userCredential.user.uid;

    // Fotoğrafı storage'a yükle
    const photoRef = ref(storage, `users/${id}/profilePicture.jpg`);
    await uploadString(photoRef, photo);

    // Fotoğraf URI'sini al
    const photoURL = await getDownloadURL(photoRef);

    // Firestore'da kullanıcı bilgilerini kaydet
    await setDoc(doc(db, 'users', id), {
      email,
      username,
      about,
      photo: photoURL,
      createdAt: new Date().toISOString(),
      birthdate,
      biography: '',
      followers: [],
      following: [],
      tags: [],
      gallery: [],
      status: '',
      settings: {
        lastSeen: true,
        notifications: {
          information: true,
          audio: true,
          text: true,
          video: true,
          photo: true,
          story: true,
        },
        showShuffle: true,
        help: '',
      },
      blocked: [
        {
          username: '',
          userId: '',
        },
      ],
    });

    console.log('Kullanıcı başarıyla kaydedildi.');
    return id; // Kullanıcı id'sini döndür
  } catch (error) {
    console.error('Kullanıcı kaydedilirken bir hata oluştu:', error);
    return null; // Hata durumunda null döndür
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<User | null> => {
  try {
    // Kullanıcı adına göre kullanıcıyı bul
    const userQuerySnapshot = await getDocs(
      query(collection(db, 'users'), where('username', '==', username)),
    );
    if (userQuerySnapshot.empty) {
      throw new Error('Kullanıcı bulunamadı.');
    }

    // Kullanıcının email adresini al
    const userDoc = userQuerySnapshot.docs[0];
    const userEmail = userDoc.data().email;

    // Firebase Authentication ile giriş yap
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      userEmail,
      password,
    );
    const user: User = userCredential.user;
    console.log('Kullanıcı başarıyla giriş yaptı.');
    return user;
  } catch (error) {
    console.error('Kullanıcı girişi yapılırken bir hata oluştu:', error);
    return null;
  }
};

import {sendPasswordResetEmail} from 'firebase/auth';
import {UserType} from '../../constants/types';

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(FIREBASE_AUTH, email);
    console.log('Şifre sıfırlama e-postası gönderildi.');
  } catch (error) {
    console.error(
      'Şifre sıfırlama e-postası gönderilirken bir hata oluştu:',
      error,
    );
  }
};
