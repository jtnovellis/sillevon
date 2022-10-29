import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  avatar: string;
  terms: boolean;
}

const initialState: UserState = {
  name: '',
  email: '',
  avatar: '',
  terms: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<UserState>) => {
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.terms = action.payload.terms;
      state.name = action.payload.name;
    },
  },
});

export const { addUserData } = userSlice.actions;

export default userSlice.reducer;
