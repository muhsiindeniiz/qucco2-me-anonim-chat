import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../../constants/types';

interface ShuffleState {
  userData: UserType[];
}

const initialState: ShuffleState = {
  userData: [],
};

const authSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType[]>) => {
      state.userData = action.payload;
    },
  },
});

export const {setUserData} = authSlice.actions;
export default authSlice.reducer;
