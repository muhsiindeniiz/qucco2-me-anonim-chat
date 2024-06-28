import React, {useEffect, useState} from 'react';
import AuthStack from './stack/auth-stack/auth-stack';
import TabNavigator from './tab/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {storage} from '../constants/app';
import SplashScreen from '../components/splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useUserData} from '../utils/useUserData';
import {useChats} from '../module/chat/utils/sendMessage';
import {
  setCurrentUser,
  setUserData,
} from '../redux/shuffle-slice/shuffle-slice';
import {
  setChat,
  setChatUserData,
  setError,
} from '../redux/chat-slice/chat-slice';
import {fetchUserDetails} from '../module/chat/utils/fetchUserDetails';

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [chatId, setChatId] = useState(''); // Add this line
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userId = storage.getString('userId') ?? ''; // Provide a default value for userId
  const cleanedUserId = userId.replace(/"/g, ''); // Tırnakları temizle
  const dispatch = useDispatch();
  const {userData, currentUser} = useUserData();
  const [data, setData] = useState<unknown | null>();

  const {chats, error} = useChats(cleanedUserId || '');

  const getUserInfo = async () => {
    const data = await fetchUserDetails(chatId, cleanedUserId);
    setData(data);
    return data;
  };
  useEffect(() => {
    if (chats) {
      Object.keys(chats).forEach(chatId => {
        setChatId(chatId);
      });
      if (chatId) {
        getUserInfo();
      }
      if (data) {
        dispatch(setChatUserData(data));
      }
      dispatch(setChat(chats));
    }
    if (error) {
      dispatch(setError(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, error, cleanedUserId, dispatch, chatId, data]);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isLoggedIn === true || userId) {
        if (userId) {
          setAuthenticated(true);
          dispatch(setUserData(userData));
          if (currentUser) {
            dispatch(setCurrentUser(currentUser));
          }
        }
        if (userData && userData.length > 0) {
          setTimeout(() => {
            setLoading(false);
          }, 300);
        }
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    checkAuthentication();
  }, [isLoggedIn, userId, dispatch, userData, currentUser]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {authenticated ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
