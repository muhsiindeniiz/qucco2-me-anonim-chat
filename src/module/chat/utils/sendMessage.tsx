import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import {useEffect, useState} from 'react';
import {UserType} from '../../../constants/types';

const database = firebase.database;
const firestore = firebase.firestore;

export const sendMessage = async (
  senderId: string,
  recipientId: string,
  content: string,
) => {
  const chatId = `${senderId}_${recipientId}`;
  const newMessageRef = database().ref(`chats/${chatId}`).push();
  const message = {
    sender: senderId,
    recipient: recipientId,
    content: content,
    date: new Date().toISOString(),
  };
  await newMessageRef.set(message);
};

export const useMessages = (chatId: string) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const messagesRef = database().ref(`chats/${chatId}`);
    const handleData = (snapshot: firebase.database.DataSnapshot) => {
      if (snapshot.exists()) {
        setMessages(Object.values(snapshot.val()));
      } else {
        setMessages([]);
      }
    };
    messagesRef.on('value', handleData);
    return () => {
      messagesRef.off('value', handleData);
    };
  }, [chatId]);

  return messages;
};
type Message = {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  date: string;
};
type ChatListType = {
  id: string;
  user: UserType;
  messages: Message[];
  chatId?: string;
};
export const fetchChatList = async (
  userId: string,
): Promise<ChatListType[]> => {
  const chatsRef = database().ref('chats');

  return new Promise<ChatListType[]>((resolve, reject) => {
    const handleData = async (snapshot: firebase.database.DataSnapshot) => {
      const chatList: ChatListType[] = [];

      const promises: Promise<void>[] = [];

      snapshot.forEach((chat: firebase.database.DataSnapshot) => {
        const chatId = chat.key;
        if (chatId && chatId.includes(userId)) {
          const [senderId, recipientId] = chatId.split('_');
          const otherUserId = senderId === userId ? recipientId : senderId;

          const fetchUserPromise = firestore()
            .collection('users')
            .doc(otherUserId)
            .get()
            .then(doc => {
              if (doc.exists) {
                const user: UserType = {
                  ...(doc.data() as UserType),
                };

                // Fetch messages for this chatId
                const fetchMessagesPromise = chatsRef
                  .child(chatId)
                  .once('value')
                  .then(messagesSnapshot => {
                    const messages: Message[] = [];
                    messagesSnapshot.forEach(message => {
                      const messageId = message.key;
                      if (messageId) {
                        messages.push({
                          id: messageId,
                          ...message.val(),
                        });
                      }
                    });
                    return messages;
                  });

                return fetchMessagesPromise.then(messages => {
                  chatList.push({
                    id: chatId,
                    user,
                    messages,
                  });
                });
              }
              return Promise.resolve(); // Return a resolved promise instead of null
            });

          promises.push(fetchUserPromise);
        }
      });

      Promise.all(promises)
        .then(() => {
          resolve(chatList);
        })
        .catch(error => {
          reject(error);
        });
    };

    chatsRef.on('value', handleData);

    // Return an unsubscribe function
    return () => {
      chatsRef.off('value', handleData);
    };
  });
};
