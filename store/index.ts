import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import searchSlice from '../slices/searchSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
