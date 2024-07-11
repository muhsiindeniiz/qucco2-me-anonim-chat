import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../constants/types';
import { Tag } from '../../components/tag-input';

interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserType | null
  tags: Tag[]
}

export const initialState: AuthState = {
  isLoggedIn: false,
  userInfo: null,
  tags: []
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
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
  },
});

export const { setLoggedIn, setUserInfo, setTags } = authSlice.actions;
export default authSlice.reducer;
