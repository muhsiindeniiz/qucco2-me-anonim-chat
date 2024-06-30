import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TabbarVisibleState {
  isVisible: boolean;
}

const initialState: TabbarVisibleState = {
  isVisible: false,
};

const tabbarVisibleSlice = createSlice({
  name: 'tabbarVisible',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const {setVisible} = tabbarVisibleSlice.actions;
export default tabbarVisibleSlice.reducer;
