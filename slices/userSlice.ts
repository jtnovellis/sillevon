import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name?: string;
  email?: string;
  avatar?: string;
  terms?: boolean;
  mode?: string;
  skills?: {
    improvisation: number;
    show: number;
    repertoire: number;
    versatility: number;
    instrumentation: number;
  };
}

const initialState: UserState = {
  name: '',
  email: '',
  avatar: '',
  terms: false,
  mode: '',
  skills: {
    improvisation: 0,
    show: 0,
    repertoire: 0,
    versatility: 0,
    instrumentation: 0,
  },
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
    setUserMode: (state, action: PayloadAction<UserState>) => {
      state.mode = action.payload.mode;
    },
    setSkills: (state, action: PayloadAction<UserState>) => {
      state.skills = action.payload.skills;
    },
  },
});

export const { addUserData, setUserMode, setSkills } = userSlice.actions;

export default userSlice.reducer;
