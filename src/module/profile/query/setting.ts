import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../db/Firebase/config';

export const getSettings = async (userId: string) => {
    try {
        const userDocRef = doc(firestore, 'users', userId);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            return docSnapshot.data().settings;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Ayarlar alınırken bir hata oluştu:', error);
        return null;
    }
};

export const getNotification = async (userId: string) => {
    try {
        const userDocRef = doc(firestore, 'users', userId);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            return docSnapshot.data().settings.notifications;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Bildirim alınırken bir hata oluştu:', error);
        return null;
    }
};