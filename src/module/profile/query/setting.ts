import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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

export const getUser = async (userId: string) => {
    try {
        const userDocRef = doc(firestore, 'users', userId);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            return docSnapshot.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Ayarlar alınırken bir hata oluştu:', error);
        return null;
    }
};

export const getTags = async () => {
    try {
        const tagsCollectionRef = collection(firestore, 'tags');
        const querySnapshot = await getDocs(tagsCollectionRef);
        const tags: { id: string, label: string; }[] = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data && data.label) {
                tags.push({ id: doc.id, label: data.label.toLowerCase() });
            }
        });
        return tags;
    } catch (error) {
        console.error('Tags alınırken bir hata oluştu:', error);
        return null;
    }
};