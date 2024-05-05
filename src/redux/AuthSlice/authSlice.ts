import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../constants/types';

interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserType | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserType>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setLoggedIn, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
