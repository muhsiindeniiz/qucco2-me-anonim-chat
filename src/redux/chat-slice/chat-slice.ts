import {createSlice} from '@reduxjs/toolkit';
import {ChatState} from '../../module/chat/constants/types';

interface ChatsState {
  chat: ChatState[];
  chatUserData: {
    username?: string;
    photo?: string;
    anonNickname?: string;
  };
  error: string;
  loading: boolean;
}
const initialState: ChatsState = {
  chat: [],
  error: '',
  loading: true,
  chatUserData: {
    username: '',
    photo: '',
    anonNickname: '',
  },
};

const chatslice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setChatUserData: (state, action) => {
      state.chatUserData = action.payload;
      state.loading = false;
    },
  },
});
export const {setChat, setError, setChatUserData} = chatslice.actions;
export default chatslice.reducer;
