import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, firestore } from '../../../db/Firebase/config';

export const getSettings = async (userId: string) => {
    try {
        const userDocRef = doc(firestore, 'settings', userId);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            return docSnapshot.data();
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const getNotification = async (userId: string) => {
    try {
        const userDocRef = doc(firestore, 'settings', userId);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            return docSnapshot.data().notification;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
