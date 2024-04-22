import {FIREBASE_AUTH} from './config';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {getStorage, ref, uploadString, getDownloadURL} from 'firebase/storage';

const db = getFirestore();
const storage = getStorage();

export const register = async (
  email: string,
  password: string,
  username: string,
  about: string,
  photo: string,
) => {
  try {
    // Firebase Authentication ile kullanıcı oluştur
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
    });

    console.log('Kullanıcı başarıyla kaydedildi.');
  } catch (error) {
    console.error('Kullanıcı kaydedilirken bir hata oluştu:', error);
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
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
