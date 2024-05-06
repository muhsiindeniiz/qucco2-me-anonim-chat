import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../../constants/types';

interface ShuffleState {
  userData: UserType[];
  currentUser: UserType | null;
}

const initialState: ShuffleState = {
  userData: [],
  currentUser: null,
};

const authSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType[]>) => {
      state.userData = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
    },
  },
});

export const {setUserData, setCurrentUser} = authSlice.actions;
export default authSlice.reducer;
