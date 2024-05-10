import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {EditTagsModalProps} from './edit-tags-modal.type';
import style from './edit-tags-modal.style';
import IonIcons from 'react-native-vector-icons/Ionicons';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import TagInput, {Tag} from '../../../../components/tag-input';
import {collection, doc, getDocs, setDoc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../../../db/Firebase/config';
import generateUniqueAnonymousName from '../../../../utils/uniqueNameCreator';
import {getTags, getUser} from '../../query/setting';
import {setTags, setUserInfo} from '../../../../redux/AuthSlice/authSlice';
import {useDispatch} from 'react-redux';
import {UserType} from '../../../../constants/types';

const EditTagsModal = ({onClose, isOpen, tags}: EditTagsModalProps) => {
  const id = useStayLoggedin();
  const [tagData, setTagData] = useState(tags ?? []);
  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    if (id) {
      try {
        const userData = await getUser(id);
        dispatch(setUserInfo(userData as UserType));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [dispatch, id]);

  const fetchTags = useCallback(async () => {
    if (id) {
      try {
        const tagsData = await getTags();
        if (tagsData) {
          const lowerCaseTags = tagsData.map(tag => ({
            ...tag,
            label: tag.label.toLowerCase(),
          }));
          dispatch(setTags(lowerCaseTags as Tag[]));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [dispatch, id]);

  useEffect(() => {
    fetchTags();
    fetchUser();
  }, [fetchTags, fetchUser]);

  const saveTagsToFirestore = async () => {
    const userDocRef = doc(firestore, `users/${id}`);
    const uniqueTags = tagData.map(tag => ({
      ...tag,
      id: generateUniqueAnonymousName(),
    }));
    await updateDoc(userDocRef, {tags: uniqueTags});
    const tagsSnapshot = await getDocs(collection(firestore, 'tags'));
    const existingTags = tagsSnapshot.docs.map(doc => doc.data().label);
    uniqueTags.forEach(async tag => {
      if (!existingTags.includes(tag.label)) {
        await setDoc(doc(firestore, 'tags', tag.id), tag);
      }
    });
    fetchTags();
    fetchUser();
    onClose(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={() => onClose(false)}>
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => onClose(false)}>
            <IonIcons name="chevron-back" size={24} style={style.active} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => saveTagsToFirestore()}>
            <Text style={style.close}>Save</Text>
          </TouchableOpacity>
        </View>
        <TagInput onChange={newTags => setTagData(newTags)} tags={tags} />
      </SafeAreaView>
    </Modal>
  );
};

export default EditTagsModal;
