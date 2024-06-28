import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../../constants/types';
interface UserState {
  chatData: UserType[];
  error: string;
}
const initialState: UserState = {
  chatData: [],
  error: '',
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserMessageData: (state, action: PayloadAction<UserType[]>) => {
      state.chatData = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {setUserMessageData, setError} = userSlice.actions;

export default userSlice.reducer;
