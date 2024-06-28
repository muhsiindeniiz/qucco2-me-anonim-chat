import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {useEffect, useState} from 'react';
import {ChatMessage, ChatState, ChatParticipant} from '../constants/types';

const firestore = firebase.firestore();

const getChatId = (user1Id: string, user2Id: string): string => {
  return [user1Id, user2Id].sort().join('_');
};

const getUserInfo = async (userId: string): Promise<ChatParticipant> => {
  const userDoc = await firestore.collection('users').doc(userId).get();
  if (userDoc.exists) {
    const userData = userDoc.data();
    return {
      id: userId,
      userName: userData?.username || '',
      anonNick: userData?.anonNickname || '',
      profileImage: userData?.photo || '',
    };
  }
  return {
    id: userId,
    userName: '',
    anonNick: '',
    profileImage: '',
  };
};

export const sendMessage = async (
  message: string,
  senderId: string,
  recipientId: string,
): Promise<void> => {
  const chatId = getChatId(senderId, recipientId);
  try {
    const chatRef = firestore.collection('chats').doc(chatId);

    const [senderInfo, recipientInfo] = await Promise.all([
      getUserInfo(senderId),
      getUserInfo(recipientId),
    ]);

    await chatRef.set(
      {
        participants: [senderInfo, recipientInfo],
      },
      {merge: true},
    );

    await chatRef.collection('messages').add({
      text: message,
      senderId: senderId,
      recipientId: recipientId,

      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error sending message: ', error);
  }
};

export const useMessages = (
  currentUserId: string,
  recipientId: string,
): ChatMessage[] => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const chatId = getChatId(currentUserId, recipientId);
    const unsubscribe = firestore
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            createdAt: data.createdAt
              ? data.createdAt.toDate().toISOString()
              : new Date().toISOString(),
            senderId: data.senderId,
            recipientId: data.recipientId,

            documents: data.documents,
          } as ChatMessage;
        });
        setMessages(messages);
      });

    return () => unsubscribe();
  }, [currentUserId, recipientId]);

  return messages;
};

export const useChats = (
  currentUserId: string,
): {chats: ChatState; loadingData: boolean; error: any} => {
  const [chats, setChats] = useState<ChatState>({});
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('chats')
      .where('participants', 'array-contains', currentUserId)
      .onSnapshot(
        async querySnapshot => {
          const newChats: ChatState = {};
          const userInfos: {[userId: string]: ChatParticipant} = {};

          const getUserInfoIfNeeded = async (userId: string) => {
            if (!userInfos[userId]) {
              userInfos[userId] = await getUserInfo(userId);
            }
            return userInfos[userId];
          };

          await Promise.all(
            querySnapshot.docs.map(async doc => {
              const chatId = doc.id;
              const data = doc.data();
              const messagesSnapshot = await doc.ref
                .collection('messages')
                .orderBy('createdAt', 'asc')
                .get();
              const messages: {[messageId: string]: ChatMessage} = {};
              await Promise.all(
                messagesSnapshot.docs.map(async messageDoc => {
                  const messageData = messageDoc.data();
                  messages[messageDoc.id] = {
                    id: messageDoc.id,
                    text: messageData.text,
                    createdAt: messageData.createdAt
                      ? messageData.createdAt.toDate().toISOString()
                      : new Date().toISOString(),
                    senderId: messageData.senderId,
                    recipientId: messageData.recipientId,

                    documents: messageData.documents,
                  };
                }),
              );
              const participants = await Promise.all(
                data.participants.map((participantId: string) =>
                  getUserInfoIfNeeded(participantId),
                ),
              );
              newChats[chatId] = {
                participants,
                messages,
              };
            }),
          );

          setChats(newChats);
          setLoadingData(false);
        },
        err => {
          setError(err as any);
          setLoadingData(false);
        },
      );

    return () => unsubscribe();
  }, [currentUserId]);

  return {chats, loadingData, error};
};
