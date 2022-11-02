import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FileWithPath } from '@mantine/dropzone';

export interface UserState {
  name?: string;
  email?: string;
  avatar?: FileWithPath | null;
  background?: FileWithPath | null;
  terms?: boolean;
  mode?: string;
  city?: string;
  imagesDone?: {
    avatar: string;
    background: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
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
  avatar: null,
  background: null,
  terms: false,
  mode: '',
  city: '',
  imagesDone: {
    avatar: '',
    background: '',
  },
  location: {
    lat: 0,
    lng: 0,
  },
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
    setCity: (state, action: PayloadAction<UserState>) => {
      state.city = action.payload.city;
    },
    setLocation: (state, action: PayloadAction<UserState>) => {
      state.location = action.payload.location;
    },
    setAvatar: (state, action: PayloadAction<UserState>) => {
      state.avatar = action.payload.avatar;
    },
    setBackground: (state, action: PayloadAction<UserState>) => {
      state.background = action.payload.background;
    },
    setImages: (state, action: PayloadAction<UserState>) => {
      state.imagesDone = action.payload.imagesDone;
    },
  },
});

export const {
  addUserData,
  setUserMode,
  setSkills,
  setCity,
  setLocation,
  setImages,
  setAvatar,
  setBackground,
} = userSlice.actions;

export default userSlice.reducer;
