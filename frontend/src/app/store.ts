import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import songReducer from '../features/songSlice';

export const store = configureStore({
  reducer: {
    song: songReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
